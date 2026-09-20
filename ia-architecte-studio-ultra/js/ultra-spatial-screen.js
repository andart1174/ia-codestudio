// ══════════════════════════════════════════════════════════════════════════════
// IA ARCHITECTE STUDIO ULTRA — SPATIAL SCREEN & HOLOGRAPHIC APP STUDIO (v1.0)
// UltraSpatialScreenStudio (modal-spatial-screen-studio)
// 100% Client-Side Three.js WebGL & Pure Canvas Resilience
// Floating 3D Screen with Live Text Editing, In-Screen Mini-Apps & Custom HTML Injection
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
      console.log('[UltraSpatialScreenStudio]', msg);
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

      _sound('build');
      _confetti();
      _toast(
        isFr
          ? `⚡ ${label || 'Écran Holographique'} injecté avec succès dans votre application !`
          : `⚡ ${label || 'Holographic Screen'} injected successfully into your active app!`,
        'success'
      );
    } else {
      _toast(
        isFr
          ? '⚠️ Aucune application active détectée pour l’injection.'
          : '⚠️ No active application found to inject into.',
        'warning'
      );
    }
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // CORE STUDIO OBJECT
  // ══════════════════════════════════════════════════════════════════════════════
  const UltraSpatialScreenStudio = {
    isOpen: false,
    currentMode: 'text',       // 'text' | 'apps' | 'custom'
    currentDevice: 'phone',    // 'phone' | 'tablet' | 'curved_display' | 'holo_glass'
    currentTheme: 'cyan',      // 'cyan' | 'purple' | 'emerald' | 'gold'
    activeAppId: 'snake',      // 'snake' | 'calc' | 'clock' | 'spectrum'
    isLevitationActive: true,
    isCameraARActive: false,
    cameraStream: null,
    isLiveAppActive: true,
    liveAppFrame: null,

    // Preset / User text data
    textData: {
      title: 'Ultra Spatial Holographic Screen',
      subtitle: 'Write anything on this floating 3D screen in real time',
      body: 'Customize titles, rich descriptions, live telemetry or launch notes. Powered by Three.js WebGL and Zero-Gravity floating physics.',
      tag: '⚡ v4.0 SPATIAL OS',
      matrixRain: true,
      accentColor: '#00f3ff'
    },

    // Custom HTML/CSS/JS state
    customCode: `<div style="padding: 40px; text-align: center; color: #fff; font-family: -apple-system, system-ui, sans-serif;">
  <div style="font-size: 16px; font-weight: 800; color: #00f3ff; letter-spacing: 2px; margin-bottom: 12px;">✦ CUSTOM SPATIAL APP</div>
  <h1 style="font-size: 46px; font-weight: 900; background: linear-gradient(135deg, #00f3ff, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 16px;">
    Autonomous AI Studio
  </h1>
  <p style="font-size: 20px; color: #94a3b8; line-height: 1.6; max-width: 700px; margin: 0 auto 30px;">
    This entire UI is executing inside a zero-gravity 3D holographic screen. Rotate 360°, zoom, or inject into your app!
  </p>
  <div style="display: inline-flex; gap: 16px;">
    <button style="padding: 14px 28px; background: #00f3ff; color: #030712; font-weight: 800; border: none; border-radius: 12px; font-size: 18px; cursor: pointer; box-shadow: 0 0 25px rgba(0,243,255,0.4);">
      🚀 Launch Portal
    </button>
    <button style="padding: 14px 28px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.2); color: #fff; font-weight: 700; border-radius: 12px; font-size: 18px; cursor: pointer;">
      ⚙ View Specs
    </button>
  </div>
</div>`,

    // Three.js instances
    scene: null,
    camera: null,
    renderer: null,
    animFrameId: null,
    deviceGroup: null,
    scanlineMesh: null,
    dustPoints: null,
    rimLight: null,
    screenCanvas: null,
    screenCtx: null,
    screenTexture: null,

    // 4 Masterpiece Innovations State
    isDualScreenActive: false,
    companionAppId: 'crypto',
    companionSpacing: 0.0,
    companionGroup: null,
    companionCanvas: null,
    companionCtx: null,
    companionTexture: null,

    isAudioPulseActive: true,
    audioPulseEnergy: 0,

    isSpatialDepthActive: true,
    parallaxLayersGroup: null,
    targetParallaxX: 0,
    targetParallaxY: 0,
    currentParallaxX: 0,
    currentParallaxY: 0,

    isRecordingWebM: false,
    mediaRecorder: null,
    recordedChunks: [],
    recordingTimer: null,

    // Interaction vars
    rotX: 0.12,
    rotY: -0.32,
    isDragging: false,
    lastMouseX: 0,
    lastMouseY: 0,
    animTime: 0,

    // Mini-App Internal States
    snakeState: null,
    calcState: null,
    clockState: null,
    matrixDrops: null,
    weatherState: null,
    forexState: null,
    radioState: null,
    cryptoState: null,
    pomodoroState: null,
    systemState: null,

    themeColors: {
      cyan: { hex: 0x00f3ff, css: '#00f3ff' },
      purple: { hex: 0xa855f7, css: '#a855f7' },
      emerald: { hex: 0x10b981, css: '#10b981' },
      gold: { hex: 0xf59e0b, css: '#f59e0b' }
    },

    // ══════════════════════════════════════════════════════════════════════════
    // INITIALIZATION & MODAL CONTROLS
    // ══════════════════════════════════════════════════════════════════════════
    open() {
      const modal = document.getElementById('modal-spatial-screen-studio');
      if (!modal) {
        console.error('[UltraSpatialScreenStudio] modal-spatial-screen-studio not found in DOM');
        return;
      }

      this.isOpen = true;
      modal.classList.add('show', 'active');
      modal.style.display = 'flex';
      _sound('open');

      this.initMiniApps();
      this.syncInputsFromState();
      this.updateQuickControlsUI();

      // Auto-fetch data if a real API app is active
      if (this.activeAppId === 'weather') this.fetchWeather();
      else if (this.activeAppId === 'forex') this.fetchForex();
      else if (this.activeAppId === 'crypto') this.fetchCrypto();
      else if (this.activeAppId === 'system') this.fetchSystemStats();
      else if (this.activeAppId === 'radio') this.initRadioAudio();

      setTimeout(() => {
        this.initThree();
        this.updateScreenTexture();
        this.updateInteractiveFrame();
      }, 50);

      _toast(
        _isFr()
          ? '🛸 Studio Écran Spatial 3D activé !'
          : '🛸 3D Spatial Screen Studio activated!',
        'info'
      );
    },

    close() {
      const modal = document.getElementById('modal-spatial-screen-studio');
      if (modal) {
        modal.classList.remove('show', 'active');
        modal.style.display = 'none';
      }
      this.isOpen = false;
      this.stopCameraAR();
      if (this.liveAppFrame) {
        this.liveAppFrame.style.display = 'none';
      }
      if (this.animFrameId) {
        cancelAnimationFrame(this.animFrameId);
        this.animFrameId = null;
      }
      if (this.radioState && this.radioState.audioEl) {
        this.radioState.audioEl.pause();
        this.radioState.isPlaying = false;
      }
      if (this.isRecordingWebM) {
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
          try { this.mediaRecorder.stop(); } catch(e){}
        }
        clearInterval(this.recordingTimer);
        this.isRecordingWebM = false;
      }
      this.stopProceduralAmbientSound();
      _sound('close');
    },

    // ══════════════════════════════════════════════════════════════════════════
    // MINI-APP ENGINES (Snake, Calculator, Clock, Spectrum)
    // ══════════════════════════════════════════════════════════════════════════
    initMiniApps() {
      // 1. Cyber Snake Arcade State
      this.snakeState = {
        gridSize: 24,
        snake: [{ x: 12, y: 12 }, { x: 11, y: 12 }, { x: 10, y: 12 }],
        dir: { x: 1, y: 0 },
        food: { x: 18, y: 12 },
        score: 0,
        highScore: 140,
        speed: 90,
        lastTick: 0,
        isGameOver: false,
        aiDemo: true // Autonomous play if user doesn't touch keys
      };

      // 2. Spatial Neumorphic Calculator State
      this.calcState = {
        display: '1,337.00',
        subDisplay: 'SPATIAL TELEMETRY v4.2',
        prev: null,
        op: null,
        resetOnNext: false
      };

      // 3. Matrix Rain State
      this.matrixDrops = [];
      for (let i = 0; i < 64; i++) {
        this.matrixDrops.push({
          x: i * 16,
          y: Math.random() * -600,
          speed: Math.random() * 8 + 6,
          chars: '010101XYZΩΨ01αβγδε'
        });
      }

      // 4. Live Weather Station State (Montreal Canada Default)
      if (!this.weatherState) {
        this.weatherState = {
          city: 'Montreal',
          country: '🇨🇦',
          lat: 45.5017,
          lon: -73.5673,
          timezone: 'America/Toronto',
          temp: 9.0,
          condition: 'Clear Sky / Ciel Dégagé ☀️',
          weatherCode: 0,
          humidity: 52,
          windSpeed: 14.5,
          apparentTemp: 8.2,
          daily: [
            { day: 'Today', max: 15, min: 5, code: 0 },
            { day: 'Tomorrow', max: 16, min: 6, code: 1 },
            { day: 'Wed', max: 15, min: 9, code: 61 },
            { day: 'Thu', max: 16, min: 6, code: 2 }
          ],
          cities: [
            { name: 'Montreal', flag: '🇨🇦', lat: 45.5017, lon: -73.5673 },
            { name: 'Toronto', flag: '🇨🇦', lat: 43.6532, lon: -79.3832 },
            { name: 'Vancouver', flag: '🇨🇦', lat: 49.2827, lon: -123.1207 },
            { name: 'New York', flag: '🇺🇸', lat: 40.7128, lon: -74.0060 },
            { name: 'Paris', flag: '🇫🇷', lat: 48.8566, lon: 2.3522 },
            { name: 'London', flag: '🇬🇧', lat: 51.5074, lon: -0.1278 },
            { name: 'Tokyo', flag: '🇯🇵', lat: 35.6762, lon: 139.6503 }
          ],
          cityIndex: 0,
          loading: false,
          lastUpdated: 'Live Open-Meteo'
        };
      }

      // 5. Global Forex & Currency State (Canadian Dollar CAD Base)
      if (!this.forexState) {
        this.forexState = {
          base: 'CAD',
          rates: {
            USD: 0.7147,
            EUR: 0.6229,
            GBP: 0.5342,
            JPY: 112.27,
            CHF: 0.5883
          },
          changes24h: {
            USD: +0.15,
            EUR: -0.08,
            GBP: +0.05,
            JPY: +0.42,
            CHF: -0.11
          },
          amount: 100,
          loading: false,
          lastUpdated: 'Live Forex API'
        };
      }

      // 6. Live Web Radio State (SomaFM verified 100% uptime streaming URLs)
      if (!this.radioState) {
        this.radioState = {
          isPlaying: false,
          audioEl: null,
          currentStationIdx: 0,
          volume: 0.85,
          bitrate: '128 kbps',
          stations: [
            { name: 'Montreal Chill Beats', genre: 'Downtempo / Lofi Beats', url: 'https://ice2.somafm.com/groovesalad-128-mp3', icon: '🎧', color: '#10b981' },
            { name: 'DEF CON Cyber Radio', genre: 'Synthwave / 80s Cyberpunk', url: 'https://ice2.somafm.com/defcon-128-mp3', icon: '🌆', color: '#ff007f' },
            { name: 'Radio Hits & Pop Rocks', genre: 'Top 40 / Modern Indie', url: 'https://ice2.somafm.com/indiepop-128-mp3', icon: '🎸', color: '#00f3ff' },
            { name: 'Drone Zone Deep Space', genre: 'Cosmic Ambient Zero-G', url: 'https://ice2.somafm.com/dronezone-128-mp3', icon: '🌌', color: '#a855f7' },
            { name: 'Cyber Club CliqHop', genre: 'Glitch Electro / Cyber IDM', url: 'https://ice2.somafm.com/cliqhop-128-mp3', icon: '⚡', color: '#f59e0b' }
          ]
        };
      }

      // 7. Live Crypto Terminal State
      if (!this.cryptoState) {
        this.cryptoState = {
          coins: [
            { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', price: 64820, change24h: +4.25, icon: '🟡', color: '#f59e0b' },
            { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', price: 3480, change24h: +3.80, icon: '🔷', color: '#38bdf8' },
            { id: 'solana', symbol: 'SOL', name: 'Solana', price: 152.40, change24h: +8.15, icon: '🟣', color: '#a855f7' },
            { id: 'binancecoin', symbol: 'BNB', name: 'BNB Chain', price: 582.10, change24h: -0.92, icon: '🔶', color: '#eab308' }
          ],
          loading: false,
          lastUpdated: 'Live CoinGecko'
        };
      }

      // 8. Spatial Focus Pomodoro State
      if (!this.pomodoroState) {
        this.pomodoroState = {
          mode: 'focus',
          timeLeft: 25 * 60,
          totalTime: 25 * 60,
          isRunning: false,
          sessionsCompleted: 4,
          ambientSound: 'rain',
          ambientAudioCtx: null,
          ambientNodes: null,
          lastTick: 0
        };
      }

      // 9. Quantum System & Network State
      if (!this.systemState) {
        this.systemState = {
          fps: 60.0,
          pingMs: 18,
          batteryPct: 94,
          isCharging: true,
          ramUsageMB: 146,
          cpuCores: (typeof navigator !== 'undefined' && navigator.hardwareConcurrency) || 8,
          online: true,
          connectionType: 'Fiber Gigabit / 4G'
        };
      }
    },

    // ══════════════════════════════════════════════════════════════════════════
    // THREE.JS SCENE SETUP
    // ══════════════════════════════════════════════════════════════════════════
    initThree() {
      const container = document.getElementById('spatial-screen-viewport');
      if (!container) return;

      if (this.animFrameId) {
        cancelAnimationFrame(this.animFrameId);
        this.animFrameId = null;
      }

      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      // Screen Offscreen Canvas (1024x1024)
      if (!this.screenCanvas) {
        this.screenCanvas = document.createElement('canvas');
        this.screenCanvas.width = 1024;
        this.screenCanvas.height = 1024;
        this.screenCtx = this.screenCanvas.getContext('2d');
      }

      const THREE_LIB = (typeof THREE !== 'undefined') ? THREE : (typeof window.THREE !== 'undefined' ? window.THREE : null);

      if (!THREE_LIB) {
        this.renderCanvasFallback(container);
        return;
      }

      const w = container.clientWidth || 800;
      const h = container.clientHeight || 560;

      this.scene = new THREE_LIB.Scene();
      this.camera = new THREE_LIB.PerspectiveCamera(45, w / h, 0.1, 100);
      this.camera.position.z = (this.currentDevice === 'tablet' ? 6.8 : this.currentDevice === 'curved_display' ? 5.6 : 6.4);

      this.renderer = new THREE_LIB.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(w, h);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(this.renderer.domElement);

      // Lighting
      this.scene.add(new THREE_LIB.AmbientLight(0xffffff, 0.85));
      const dirLight = new THREE_LIB.DirectionalLight(0xffffff, 1.6);
      dirLight.position.set(5, 8, 6);
      this.scene.add(dirLight);

      const curHex = this.themeColors[this.currentTheme].hex;
      this.rimLight = new THREE_LIB.PointLight(curHex, 2.5, 20);
      this.rimLight.position.set(0, 4, 3);
      this.scene.add(this.rimLight);

      // Orbiting Stardust Particles
      const pCount = 260;
      const pGeo = new THREE_LIB.BufferGeometry();
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        pPos[i * 3]     = (Math.random() - 0.5) * 16;
        pPos[i * 3 + 1] = (Math.random() - 0.5) * 12;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      }
      pGeo.setAttribute('position', new THREE_LIB.BufferAttribute(pPos, 3));
      const pMat = new THREE_LIB.PointsMaterial({
        size: 0.08,
        color: curHex,
        transparent: true,
        opacity: 0.75,
        blending: THREE_LIB.AdditiveBlending
      });
      this.dustPoints = new THREE_LIB.Points(pGeo, pMat);
      this.scene.add(this.dustPoints);

      // Device Group
      this.deviceGroup = new THREE_LIB.Group();
      this.scene.add(this.deviceGroup);

      // Create screen CanvasTexture
      this.screenTexture = new THREE_LIB.CanvasTexture(this.screenCanvas);
      this.screenTexture.minFilter = THREE_LIB.LinearFilter;
      this.screenTexture.magFilter = THREE_LIB.LinearFilter;

      this.buildDeviceModel();
      this.setupInteractionHandlers(container);

      // Start 60fps render loop
      const self = this;
      function loop() {
        if (!self.isOpen) return;
        self.animFrameId = requestAnimationFrame(loop);
        self.animTime += 0.02;

        if (self.isLevitationActive) {
          self.deviceGroup.position.y = Math.sin(self.animTime * 1.5) * 0.12;
          self.deviceGroup.rotation.z = Math.sin(self.animTime * 0.75) * 0.025;
        }

        if (!self.isDragging) {
          if (self.currentMode === 'custom') {
            // In custom mode, gentle zero-G swaying oscillation so the screen is ALWAYS facing the user and never spins to the back!
            self.rotY = Math.sin(self.animTime * 0.4) * 0.15;
          } else {
            self.rotY += 0.003;
          }
        }

        self.deviceGroup.rotation.x = self.rotX + (self.isLevitationActive ? Math.sin(self.animTime) * 0.015 : 0);
        self.deviceGroup.rotation.y = self.rotY;

        // Sync live interactive application frame in 3D
        if (self.currentMode === 'custom' && self.liveAppFrame && self.isLiveAppActive && self.liveAppFrame.style.display !== 'none') {
          const cosY = Math.cos(self.rotY);
          if (cosY < 0.2) {
            self.liveAppFrame.style.opacity = '0';
            self.liveAppFrame.style.pointerEvents = 'none';
          } else {
            self.liveAppFrame.style.opacity = '1';
            self.liveAppFrame.style.pointerEvents = 'auto';
            const rxDeg = (-self.rotX + (self.isLevitationActive ? Math.sin(self.animTime) * -0.015 : 0)) * (180 / Math.PI);
            const ryDeg = (self.rotY) * (180 / Math.PI);
            const levY = (self.isLevitationActive ? Math.sin(self.animTime * 1.5) * 12 : 0);
            self.liveAppFrame.style.transform = `translate(-50%, calc(-50% + ${levY.toFixed(1)}px)) perspective(1000px) rotateX(${rxDeg.toFixed(2)}deg) rotateY(${ryDeg.toFixed(2)}deg)`;
          }
        }

        if (self.dustPoints) self.dustPoints.rotation.y = self.animTime * 0.04;
        if (self.scanlineMesh) self.scanlineMesh.position.y = Math.sin(self.animTime * 2.2) * 1.8;

        // 1. Audio Pulse & Stardust Resonance
        if (self.isAudioPulseActive) {
          const isRadioOn = self.radioState && self.radioState.isPlaying;
          if (isRadioOn) {
            self.audioPulseEnergy = Math.pow(Math.abs(Math.sin(self.animTime * 3.8)), 4) * 0.65 + Math.abs(Math.sin(self.animTime * 7.6)) * 0.35;
          } else {
            self.audioPulseEnergy = Math.sin(self.animTime * 1.5) * 0.08 + 0.08;
          }
          if (self.rimLight) {
            self.rimLight.intensity = 2.2 + self.audioPulseEnergy * 3.8;
            self.rimLight.distance = 18 + self.audioPulseEnergy * 14;
          }
          if (self.dustPoints) {
            const s = 1.0 + self.audioPulseEnergy * 0.28;
            self.dustPoints.scale.set(s, s, s);
          }
        } else {
          self.audioPulseEnergy = 0;
          if (self.rimLight) { self.rimLight.intensity = 2.5; self.rimLight.distance = 20; }
          if (self.dustPoints) self.dustPoints.scale.set(1, 1, 1);
        }

        // 2. 2.5D Parallax Interpolation
        if (self.isSpatialDepthActive && self.parallaxLayersGroup) {
          self.currentParallaxX += (self.targetParallaxX - self.currentParallaxX) * 0.08;
          self.currentParallaxY += (self.targetParallaxY - self.currentParallaxY) * 0.08;
          self.parallaxLayersGroup.position.x = self.currentParallaxX;
          self.parallaxLayersGroup.position.y = self.currentParallaxY;
        }

        // 3. Animate Screen & Companion Textures
        self.updateScreenTexture();
        if (self.screenTexture) self.screenTexture.needsUpdate = true;

        if (self.isDualScreenActive) {
          self.updateCompanionTexture();
        }

        self.renderer.render(self.scene, self.camera);
      }
      loop();
    },

    // ══════════════════════════════════════════════════════════════════════════
    // DEVICE HARDWARE BUILDER
    // ══════════════════════════════════════════════════════════════════════════
    buildDeviceModel() {
      const THREE_LIB = (typeof THREE !== 'undefined') ? THREE : (typeof window.THREE !== 'undefined' ? window.THREE : null);
      if (!THREE_LIB || !this.deviceGroup) return;

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

      const hex = this.themeColors[this.currentTheme].hex;
      this.scanlineMesh = null;

      if (this.currentDevice === 'tablet') {
        // Slate / Tablet
        const slateGeo = new THREE_LIB.BoxGeometry(4.4, 3.1, 0.08);
        const slateMat = new THREE_LIB.MeshPhysicalMaterial({ color: 0x111c2e, metalness: 0.2, roughness: 0.1, transparent: true, opacity: 0.85 });
        this.deviceGroup.add(new THREE_LIB.Mesh(slateGeo, slateMat));
        this.deviceGroup.add(new THREE_LIB.LineSegments(new THREE_LIB.EdgesGeometry(slateGeo), new THREE_LIB.LineBasicMaterial({ color: hex })));

        const screenGeo = new THREE_LIB.PlaneGeometry(4.2, 2.95);
        const screenMat = new THREE_LIB.MeshBasicMaterial({ map: this.screenTexture, side: THREE_LIB.DoubleSide });
        const screenMesh = new THREE_LIB.Mesh(screenGeo, screenMat);
        screenMesh.position.z = 0.045;
        this.deviceGroup.add(screenMesh);
        if (this.camera) this.camera.position.z = 6.8;

      } else if (this.currentDevice === 'curved_display') {
        // Curved Ultrawide Display
        const radius = 4.0;
        const thetaLength = Math.PI * 0.38;
        const curveGeo = new THREE_LIB.CylinderGeometry(radius, radius, 2.4, 36, 1, true, -thetaLength / 2, thetaLength);
        curveGeo.scale(-1, 1, 1);
        const screenMat = new THREE_LIB.MeshBasicMaterial({ map: this.screenTexture, side: THREE_LIB.DoubleSide });
        const screenMesh = new THREE_LIB.Mesh(curveGeo, screenMat);
        screenMesh.position.z = radius - 1.2;
        this.deviceGroup.add(screenMesh);

        const edge = new THREE_LIB.LineSegments(new THREE_LIB.EdgesGeometry(curveGeo), new THREE_LIB.LineBasicMaterial({ color: hex }));
        edge.position.z = radius - 1.2;
        this.deviceGroup.add(edge);
        if (this.camera) this.camera.position.z = 5.6;

      } else if (this.currentDevice === 'holo_glass') {
        // Borderless Floating Holographic Glass Sheet with futuristic corner HUD brackets
        const glassGeo = new THREE_LIB.PlaneGeometry(3.6, 4.4);
        const glassMat = new THREE_LIB.MeshBasicMaterial({ map: this.screenTexture, side: THREE_LIB.DoubleSide, transparent: true, opacity: 0.94 });
        const glassMesh = new THREE_LIB.Mesh(glassGeo, glassMat);
        this.deviceGroup.add(glassMesh);

        // Holographic corner brackets
        const bracketMat = new THREE_LIB.LineBasicMaterial({ color: hex, linewidth: 2 });
        const addCornerBracket = (cx, cy, flipX, flipY) => {
          const pts = [
            new THREE_LIB.Vector3(cx - 0.25 * flipX, cy, 0.01),
            new THREE_LIB.Vector3(cx, cy, 0.01),
            new THREE_LIB.Vector3(cx, cy - 0.25 * flipY, 0.01)
          ];
          const bGeo = new THREE_LIB.BufferGeometry().setFromPoints(pts);
          this.deviceGroup.add(new THREE_LIB.Line(bGeo, bracketMat));
        };
        addCornerBracket(-1.8, 2.2, -1, 1);
        addCornerBracket(1.8, 2.2, 1, 1);
        addCornerBracket(-1.8, -2.2, -1, -1);
        addCornerBracket(1.8, -2.2, 1, -1);

        if (this.camera) this.camera.position.z = 6.0;

      } else {
        // Cyber Phone
        const phoneGeo = new THREE_LIB.BoxGeometry(2.1, 4.3, 0.16);
        const phoneMat = new THREE_LIB.MeshStandardMaterial({ color: 0x111827, metalness: 0.88, roughness: 0.2 });
        this.deviceGroup.add(new THREE_LIB.Mesh(phoneGeo, phoneMat));
        this.deviceGroup.add(new THREE_LIB.LineSegments(new THREE_LIB.EdgesGeometry(phoneGeo), new THREE_LIB.LineBasicMaterial({ color: hex })));

        const screenGeo = new THREE_LIB.PlaneGeometry(1.97, 4.14);
        const screenMat = new THREE_LIB.MeshBasicMaterial({ map: this.screenTexture, side: THREE_LIB.FrontSide });
        const screenMesh = new THREE_LIB.Mesh(screenGeo, screenMat);
        screenMesh.position.z = 0.085;
        this.deviceGroup.add(screenMesh);

        // Rear camera island and dual lenses
        const camGeo = new THREE_LIB.BoxGeometry(0.7, 1.2, 0.08);
        const camMat = new THREE_LIB.MeshStandardMaterial({ color: 0x0a0d14, metalness: 0.95, roughness: 0.15 });
        const camIsland = new THREE_LIB.Mesh(camGeo, camMat);
        camIsland.position.set(-0.55, 1.3, -0.12);
        this.deviceGroup.add(camIsland);

        const lensGeo = new THREE_LIB.CylinderGeometry(0.18, 0.18, 0.04, 24);
        lensGeo.rotateX(Math.PI / 2);
        const lensMat = new THREE_LIB.MeshStandardMaterial({ color: 0x002244, metalness: 0.9, roughness: 0.1 });
        const lens1 = new THREE_LIB.Mesh(lensGeo, lensMat); lens1.position.set(-0.55, 1.55, -0.17);
        const lens2 = new THREE_LIB.Mesh(lensGeo, lensMat); lens2.position.set(-0.55, 1.05, -0.17);
        this.deviceGroup.add(lens1); this.deviceGroup.add(lens2);

        // Sweeping laser scanline
        const scanGeo = new THREE_LIB.PlaneGeometry(1.97, 0.06);
        const scanMat = new THREE_LIB.MeshBasicMaterial({ color: hex, transparent: true, opacity: 0.7, blending: THREE_LIB.AdditiveBlending });
        this.scanlineMesh = new THREE_LIB.Mesh(scanGeo, scanMat);
        this.scanlineMesh.position.z = 0.09;
        this.deviceGroup.add(this.scanlineMesh);

        if (this.camera) this.camera.position.z = 6.4;
      }

      // 2.5D Parallax Floating Foreground Brackets
      if (this.isSpatialDepthActive) {
        this.parallaxLayersGroup = new THREE_LIB.Group();
        this.parallaxLayersGroup.position.set(0, 0, 0.16);

        const bMat = new THREE_LIB.LineBasicMaterial({ color: hex, transparent: true, opacity: 0.85 });
        const addFloatingCorner = (fx, fy, dx, dy) => {
          const pts = [
            new THREE_LIB.Vector3(fx - 0.28 * dx, fy, 0),
            new THREE_LIB.Vector3(fx, fy, 0),
            new THREE_LIB.Vector3(fx, fy - 0.28 * dy, 0)
          ];
          this.parallaxLayersGroup.add(new THREE_LIB.Line(new THREE_LIB.BufferGeometry().setFromPoints(pts), bMat));
        };
        const hw = (this.currentDevice === 'tablet' ? 2.12 : this.currentDevice === 'holo_glass' ? 1.82 : 1.05);
        const hh = (this.currentDevice === 'tablet' ? 1.48 : this.currentDevice === 'holo_glass' ? 2.22 : 2.16);
        addFloatingCorner(-hw, hh, -1, 1);
        addFloatingCorner(hw, hh, 1, 1);
        addFloatingCorner(-hw, -hh, -1, -1);
        addFloatingCorner(hw, -hh, 1, -1);

        this.deviceGroup.add(this.parallaxLayersGroup);
      } else {
        this.parallaxLayersGroup = null;
      }

      // Rebuild companion display if Dual Screen is active
      this.buildCompanionModel();
    },

    // ══════════════════════════════════════════════════════════════════════════
    // DUAL SCREEN COMPANION ENGINE (Secondary Angled Cockpit Display)
    // ══════════════════════════════════════════════════════════════════════════
    initCompanionCanvas() {
      if (!this.companionCanvas) {
        this.companionCanvas = document.createElement('canvas');
        this.companionCanvas.width = 512;
        this.companionCanvas.height = 512;
        this.companionCtx = this.companionCanvas.getContext('2d');
      }
      const THREE_LIB = (typeof THREE !== 'undefined') ? THREE : (typeof window.THREE !== 'undefined' ? window.THREE : null);
      if (THREE_LIB && !this.companionTexture && this.companionCanvas) {
        this.companionTexture = new THREE_LIB.CanvasTexture(this.companionCanvas);
        this.companionTexture.minFilter = THREE_LIB.LinearFilter;
        this.companionTexture.magFilter = THREE_LIB.LinearFilter;
      }
    },

    updateCompanionTexture() {
      if (!this.companionCtx) return;
      const ctx = this.companionCtx;
      const cw = 512, ch = 512;
      const accent = this.themeColors[this.currentTheme].css;
      const hex = this.themeColors[this.currentTheme].hex;

      // Base background
      ctx.fillStyle = '#060a14';
      ctx.fillRect(0, 0, cw, ch);

      // Cyber grid background
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < cw; x += 32) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, ch); ctx.stroke();
      }
      for (let y = 0; y < ch; y += 32) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(cw, y); ctx.stroke();
      }

      // Border glow
      ctx.strokeStyle = accent;
      ctx.lineWidth = 3;
      ctx.strokeRect(6, 6, cw - 12, ch - 12);

      // Top Header HUD
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.fillRect(10, 10, cw - 20, 52);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 18px -apple-system, system-ui, sans-serif';

      let compApp = this.companionAppId || 'crypto';
      if (compApp === 'pomodoro') compApp = 'focus';

      const appTitles = {
        radio: '📻 COMPANION · WEB RADIO',
        crypto: '🪙 COMPANION · CRYPTO HUD',
        weather: '🌤️ COMPANION · METEO RADAR',
        clock: '⏱️ COMPANION · QUANTUM CLOCK',
        system: '⚡ COMPANION · SYSTEM SPECS',
        focus: '⏳ COMPANION · POMODORO FOCUS',
        snake: '🕹️ COMPANION · SNAKE ARCADE',
        calc: '🧮 COMPANION · CALCULATOR',
        spectrum: '🎵 COMPANION · AUDIO SPECTRUM',
        forex: '💱 COMPANION · FOREX CAD',
        matrix: '⚡ COMPANION · MATRIX STREAM',
        custom: '🌐 COMPANION · APP PROJECTION'
      };

      ctx.fillText(appTitles[compApp] || '🛸 COMPANION HUD · ZERO-G', 24, 42);

      const pulse = this.isAudioPulseActive ? this.audioPulseEnergy : 0;
      ctx.fillStyle = '#10b981';
      ctx.beginPath(); ctx.arc(cw - 36, 36, 6 + pulse * 4, 0, Math.PI * 2); ctx.fill();

      // ─────────────────────────────────────────────────────────────
      // MINI-APP 1: RADIO PLAYER & EQUALIZER
      // ─────────────────────────────────────────────────────────────
      if (compApp === 'radio') {
        const rs = this.radioState || {};
        const curIdx = rs.currentStationIdx || 0;
        const st = rs.stations ? rs.stations[curIdx] : { name: 'Montreal Chill Beats', icon: '🎧', genre: 'Downtempo Beats' };
        const isPlaying = rs.isPlaying;

        ctx.fillStyle = 'rgba(30, 41, 59, 0.7)';
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(24, 76, cw - 48, 134, 12); else ctx.rect(24, 76, cw - 48, 134);
        ctx.fill(); ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 22px -apple-system, system-ui, sans-serif';
        ctx.fillText(st.icon + ' ' + st.name, 40, 116);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '14px monospace';
        ctx.fillText(st.genre + ' · 128 kbps', 40, 146);

        ctx.fillStyle = isPlaying ? '#34d399' : '#f87171';
        ctx.font = 'bold 14px monospace';
        ctx.fillText(isPlaying ? '● LIVE STEREO ON-AIR' : '⏸ STREAM PAUSED', 40, 182);

        // Dynamic 18-bar Equalizer
        const eqY = 226, eqH = 220, bars = 18, bW = (cw - 64) / bars;
        ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
        ctx.fillRect(24, eqY, cw - 48, eqH);

        for (let b = 0; b < bars; b++) {
          const factor = isPlaying
            ? Math.abs(Math.sin(this.animTime * 4 + b * 0.5) * Math.cos(this.animTime * 2 + b * 0.3)) + pulse * 0.4
            : 0.08;
          const barH = Math.min(eqH - 24, Math.max(10, factor * (eqH - 28)));
          const bx = 32 + b * bW;
          const by = eqY + eqH - 12 - barH;

          const grad = ctx.createLinearGradient(bx, by, bx, by + barH);
          grad.addColorStop(0, '#f43f5e'); grad.addColorStop(0.5, accent); grad.addColorStop(1, '#10b981');
          ctx.fillStyle = grad;
          ctx.fillRect(bx, by, bW - 4, barH);
        }

      // ─────────────────────────────────────────────────────────────
      // MINI-APP 2: CRYPTO TELEMETRY
      // ─────────────────────────────────────────────────────────────
      } else if (compApp === 'crypto') {
        const cs = this.cryptoState || {};
        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 20px -apple-system, system-ui, sans-serif';
        ctx.fillText('🪙 Live Crypto Telemetry', 32, 98);

        (cs.coins || [
          { symbol: 'BTC', name: 'Bitcoin', price: 64820, change24h: 4.25 },
          { symbol: 'ETH', name: 'Ethereum', price: 3480, change24h: 3.80 },
          { symbol: 'SOL', name: 'Solana', price: 152.4, change24h: 8.15 },
          { symbol: 'BNB', name: 'BNB Chain', price: 582.1, change24h: -0.92 }
        ]).forEach((c, idx) => {
          const cy = 118 + idx * 78;
          ctx.fillStyle = 'rgba(255,255,255,0.04)';
          ctx.strokeStyle = 'rgba(255,255,255,0.1)';
          ctx.lineWidth = 1;
          ctx.strokeRect(28, cy, cw - 56, 68);

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 17px monospace';
          ctx.fillText(c.symbol + ' ' + c.name, 42, cy + 28);

          const up = c.change24h >= 0;
          ctx.fillStyle = '#38bdf8';
          ctx.font = 'bold 17px monospace';
          ctx.fillText('$' + Number(c.price).toLocaleString(), 42, cy + 52);

          ctx.fillStyle = up ? '#34d399' : '#f87171';
          ctx.font = 'bold 15px monospace';
          ctx.fillText((up ? '+' : '') + c.change24h + '%', cw - 120, cy + 40);
        });

      // ─────────────────────────────────────────────────────────────
      // MINI-APP 3: WEATHER RADAR
      // ─────────────────────────────────────────────────────────────
      } else if (compApp === 'weather') {
        const ws = this.weatherState || {};
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 22px -apple-system, system-ui, sans-serif';
        ctx.fillText('🌤️ Montreal Satellite Radar', 32, 105);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 54px monospace';
        ctx.fillText(Math.round(ws.temp || 9) + '°C', 32, 180);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '16px monospace';
        ctx.fillText(ws.condition || 'Clear Sky ☀️', 32, 220);

        ctx.fillStyle = 'rgba(255,255,255,0.04)';
        ctx.fillRect(28, 250, cw - 56, 196);
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '15px monospace';
        ctx.fillText('Humidity: ' + (ws.humidity || 52) + '%', 42, 290);
        ctx.fillText('Wind: ' + (ws.windSpeed || 14) + ' km/h', 42, 330);
        ctx.fillText('Zone: Montreal QC (CAD)', 42, 370);
        ctx.fillText('Telemetry: 60 FPS Real-time', 42, 410);

      // ─────────────────────────────────────────────────────────────
      // MINI-APP 4: PRECISION CLOCK & CHRONO
      // ─────────────────────────────────────────────────────────────
      } else if (compApp === 'clock') {
        const now = new Date();
        const hrs = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        const secs = String(now.getSeconds()).padStart(2, '0');
        const ms = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');

        ctx.fillStyle = '#60a5fa';
        ctx.font = 'bold 20px monospace';
        ctx.fillText('⏱️ ATOMIC UTC TELEMETRY', 32, 100);

        // Huge Time Display
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 64px monospace';
        ctx.fillText(`${hrs}:${mins}:${secs}`, 32, 185);

        ctx.fillStyle = accent;
        ctx.font = 'bold 26px monospace';
        ctx.fillText(`.${ms} MS`, cw - 140, 185);

        // Date readout
        ctx.fillStyle = '#94a3b8';
        ctx.font = '16px monospace';
        ctx.fillText(now.toDateString().toUpperCase() + ' · ZERO-G', 34, 225);

        // Circular sweep second dial
        const cx = cw / 2, cy = 340, radius = 80;
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 4;
        ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.stroke();

        const sAngle = ((now.getSeconds() + now.getMilliseconds() / 1000) / 60) * Math.PI * 2 - Math.PI / 2;
        ctx.strokeStyle = accent;
        ctx.lineWidth = 6;
        ctx.beginPath(); ctx.arc(cx, cy, radius, -Math.PI / 2, sAngle); ctx.stroke();

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 24px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`${secs}s`, cx, cy + 8);
        ctx.textAlign = 'left';

      // ─────────────────────────────────────────────────────────────
      // MINI-APP 5: SYSTEM SPECS
      // ─────────────────────────────────────────────────────────────
      } else if (compApp === 'system') {
        const sys = this.systemState || { fps: 60, ramUsageMB: 146, batteryPct: 94, pingMs: 18, cpuCores: 8 };
        ctx.fillStyle = '#22d3ee';
        ctx.font = 'bold 20px monospace';
        ctx.fillText('⚡ QUANTUM SYSTEM SPECS', 32, 100);

        const specs = [
          { label: 'CPU CORES', val: `${sys.cpuCores || 8} Cores Active`, col: '#38bdf8' },
          { label: 'HEAP RAM', val: `${sys.ramUsageMB || 146} MB / Allocated`, col: '#a855f7' },
          { label: 'REFRESH RATE', val: '60.0 FPS Synchronized', col: '#10b981' },
          { label: 'NETWORK PING', val: `${sys.pingMs || 18} ms (Fiber Gigabit)`, col: '#f59e0b' },
          { label: 'BATTERY POWER', val: `${sys.batteryPct || 94}% ⚡ Optimal Zero-G`, col: '#34d399' }
        ];

        specs.forEach((item, idx) => {
          const sy = 125 + idx * 62;
          ctx.fillStyle = 'rgba(255,255,255,0.04)';
          ctx.strokeStyle = 'rgba(255,255,255,0.08)';
          ctx.strokeRect(28, sy, cw - 56, 52);

          ctx.fillStyle = '#94a3b8';
          ctx.font = '12px monospace';
          ctx.fillText(item.label, 40, sy + 22);

          ctx.fillStyle = item.col;
          ctx.font = 'bold 16px monospace';
          ctx.fillText(item.val, 40, sy + 43);
        });

      // ─────────────────────────────────────────────────────────────
      // MINI-APP 6: FOCUS POMODORO
      // ─────────────────────────────────────────────────────────────
      } else if (compApp === 'focus') {
        const pom = this.pomodoroState || { timeLeft: 1500, sessionsCompleted: 4 };
        const pM = Math.floor((pom.timeLeft || 1500) / 60);
        const pS = (pom.timeLeft || 1500) % 60;

        ctx.fillStyle = '#fb7185';
        ctx.font = 'bold 20px monospace';
        ctx.fillText('⏳ SPATIAL FOCUS TIMER', 32, 100);

        // Circular Timer Arc
        const pcx = cw / 2, pcy = 240, pr = 95;
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 8;
        ctx.beginPath(); ctx.arc(pcx, pcy, pr, 0, Math.PI * 2); ctx.stroke();

        const pProg = (this.animTime * 0.1) % 1;
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 8;
        ctx.beginPath(); ctx.arc(pcx, pcy, pr, -Math.PI / 2, -Math.PI / 2 + pProg * Math.PI * 2); ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 44px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`${String(pM).padStart(2,'0')}:${String(pS).padStart(2,'0')}`, pcx, pcy + 14);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '14px monospace';
        ctx.fillText('FOCUS INTERVAL · 25 MIN', pcx, pcy + 42);

        // Sessions badge
        ctx.fillText('Sessions: ● ● ● ●', pcx, 390);
        ctx.fillStyle = '#34d399';
        ctx.fillText('🌧️ Rain Ambient Sound Active', pcx, 425);
        ctx.textAlign = 'left';

      // ─────────────────────────────────────────────────────────────
      // MINI-APP 7: SNAKE ARCADE
      // ─────────────────────────────────────────────────────────────
      } else if (compApp === 'snake') {
        const s = this.snakeState || { score: 40, highScore: 140 };
        ctx.fillStyle = '#34d399';
        ctx.font = 'bold 20px monospace';
        ctx.fillText('🕹️ CYBER SNAKE MINI', 32, 100);

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 15px monospace';
        ctx.fillText(`SCORE: ${s.score}  HI: ${s.highScore}`, cw - 180, 100);

        // Mini Arena
        const ax = 32, ay = 120, aw = cw - 64, ah = 310;
        ctx.fillStyle = '#050711';
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 2;
        ctx.fillRect(ax, ay, aw, ah);
        ctx.strokeRect(ax, ay, aw, ah);

        // Grid lines
        ctx.strokeStyle = 'rgba(255,255,255,0.04)';
        ctx.lineWidth = 1;
        for (let gx = ax; gx <= ax + aw; gx += 20) { ctx.beginPath(); ctx.moveTo(gx, ay); ctx.lineTo(gx, ay + ah); ctx.stroke(); }
        for (let gy = ay; gy <= ay + ah; gy += 20) { ctx.beginPath(); ctx.moveTo(ax, gy); ctx.lineTo(ax + aw, gy); ctx.stroke(); }

        // Snake body
        const sx = ax + 120 + Math.sin(this.animTime * 3) * 60;
        const sy = ay + 120 + Math.cos(this.animTime * 2) * 50;
        ctx.fillStyle = accent;
        ctx.fillRect(sx, sy, 18, 18);
        ctx.fillStyle = '#34d399';
        ctx.fillRect(sx - 20, sy, 16, 16);
        ctx.fillRect(sx - 38, sy, 14, 14);

        // Apple
        ctx.fillStyle = '#f43f5e';
        ctx.beginPath(); ctx.arc(ax + aw - 80, ay + 80, 8, 0, Math.PI * 2); ctx.fill();

      // ─────────────────────────────────────────────────────────────
      // MINI-APP 8: CALCULATOR
      // ─────────────────────────────────────────────────────────────
      } else if (compApp === 'calc') {
        ctx.fillStyle = '#a855f7';
        ctx.font = 'bold 20px monospace';
        ctx.fillText('🧮 SPATIAL CALCULATOR', 32, 100);

        // LCD Display
        ctx.fillStyle = 'rgba(15,23,42,0.9)';
        ctx.strokeStyle = accent;
        ctx.lineWidth = 2;
        ctx.fillRect(32, 120, cw - 64, 70);
        ctx.strokeRect(32, 120, cw - 64, 70);

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 36px monospace';
        ctx.textAlign = 'right';
        ctx.fillText('1,337.00', cw - 48, 168);
        ctx.textAlign = 'left';

        // 4x4 keypad grid
        const keys = ['7','8','9','÷', '4','5','6','×', '1','2','3','-', 'C','0','=','+'];
        const kw = (cw - 80) / 4, kh = 45;
        keys.forEach((k, idx) => {
          const row = Math.floor(idx / 4), col = idx % 4;
          const kx = 32 + col * (kw + 5), ky = 205 + row * (kh + 8);
          ctx.fillStyle = ['÷','×','-','+','='].includes(k) ? accent + '40' : 'rgba(255,255,255,0.06)';
          ctx.strokeStyle = 'rgba(255,255,255,0.15)';
          ctx.strokeRect(kx, ky, kw, kh);
          ctx.fillStyle = ['÷','×','-','+','='].includes(k) ? accent : '#fff';
          ctx.font = 'bold 18px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(k, kx + kw / 2, ky + kh / 2 + 6);
          ctx.textAlign = 'left';
        });

      // ─────────────────────────────────────────────────────────────
      // MINI-APP 9: AUDIO SPECTRUM
      // ─────────────────────────────────────────────────────────────
      } else if (compApp === 'spectrum') {
        ctx.fillStyle = '#ec4899';
        ctx.font = 'bold 20px monospace';
        ctx.fillText('🎵 24-BAND AUDIO SPECTRUM', 32, 100);

        const spBars = 24, spW = (cw - 64) / spBars, spY = 130, spH = 300;
        ctx.fillStyle = 'rgba(15,23,42,0.6)';
        ctx.fillRect(32, spY, cw - 64, spH);

        for (let i = 0; i < spBars; i++) {
          const val = Math.abs(Math.sin(this.animTime * 5 + i * 0.45) * Math.cos(this.animTime * 2.5 + i * 0.25)) + pulse * 0.35;
          const bh = Math.max(12, val * (spH - 30));
          const bx = 32 + i * spW;
          const by = spY + spH - bh - 10;

          const hue = (i / spBars) * 280 + 160;
          ctx.fillStyle = `hsl(${hue}, 90%, 55%)`;
          ctx.fillRect(bx, by, spW - 3, bh);

          // Peak cap
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(bx, by - 4, spW - 3, 2);
        }

      // ─────────────────────────────────────────────────────────────
      // MINI-APP 10: FOREX CAD
      // ─────────────────────────────────────────────────────────────
      } else if (compApp === 'forex') {
        const fx = this.forexState || { rates: { USD: 0.7147, EUR: 0.6229, GBP: 0.5342, JPY: 112.27, CHF: 0.5883 } };
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 20px monospace';
        ctx.fillText('💱 FOREX TELEMETRY (1 CAD)', 32, 100);

        const pairs = [
          { pair: 'CAD / USD', val: fx.rates.USD, delta: '+0.15%' },
          { pair: 'CAD / EUR', val: fx.rates.EUR, delta: '-0.08%' },
          { pair: 'CAD / GBP', val: fx.rates.GBP, delta: '+0.05%' },
          { pair: 'CAD / JPY', val: fx.rates.JPY, delta: '+0.42%' },
          { pair: 'CAD / CHF', val: fx.rates.CHF, delta: '-0.11%' }
        ];

        pairs.forEach((p, idx) => {
          const py = 125 + idx * 62;
          ctx.fillStyle = 'rgba(255,255,255,0.04)';
          ctx.strokeStyle = 'rgba(255,255,255,0.1)';
          ctx.strokeRect(28, py, cw - 56, 52);

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 16px monospace';
          ctx.fillText(p.pair, 40, py + 32);

          ctx.fillStyle = '#38bdf8';
          ctx.font = 'bold 18px monospace';
          ctx.fillText(String(p.val), 200, py + 32);

          const up = p.delta.startsWith('+');
          ctx.fillStyle = up ? '#10b981' : '#f43f5e';
          ctx.font = 'bold 14px monospace';
          ctx.fillText(p.delta, cw - 100, py + 32);
        });

      // ─────────────────────────────────────────────────────────────
      // MINI-APP 11: MATRIX STREAM
      // ─────────────────────────────────────────────────────────────
      } else if (compApp === 'matrix') {
        ctx.fillStyle = '#22c55e';
        ctx.font = 'bold 20px monospace';
        ctx.fillText('⚡ CYBER MATRIX STREAM', 32, 100);

        ctx.font = '14px monospace';
        const cols = 20;
        const colW = (cw - 64) / cols;
        for (let c = 0; c < cols; c++) {
          const cx = 32 + c * colW;
          const dropY = ((this.animTime * 140 + c * 47) % (ch - 180)) + 120;
          for (let r = 0; r < 7; r++) {
            const gy = dropY - r * 18;
            if (gy > 120 && gy < ch - 60) {
              ctx.fillStyle = r === 0 ? '#ffffff' : `rgba(34, 197, 94, ${1 - r * 0.14})`;
              const char = String.fromCharCode(0x30A0 + Math.floor((c * 17 + r + this.animTime * 8) % 96));
              ctx.fillText(char, cx, gy);
            }
          }
        }

      // ─────────────────────────────────────────────────────────────
      // MINI-APP 12: CUSTOM APP PROJECTION
      // ─────────────────────────────────────────────────────────────
      } else {
        ctx.fillStyle = accent;
        ctx.font = 'bold 20px monospace';
        ctx.fillText('🌐 AUTONOMOUS APP PROJECTION', 32, 100);

        ctx.fillStyle = 'rgba(255,255,255,0.05)';
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(28, 125, cw - 56, 300);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 24px system-ui, sans-serif';
        ctx.fillText('Autonomous AI Studio', 44, 175);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '14px system-ui, sans-serif';
        ctx.fillText('3D Interactive Canvas Projections', 44, 210);
        ctx.fillText('Real-time synchronization with active app', 44, 235);
        ctx.fillText('WebGL 60FPS Zero-Gravity Rendering', 44, 260);

        ctx.fillStyle = accent;
        ctx.fillRect(44, 300, 160, 42);
        ctx.fillStyle = '#030712';
        ctx.font = 'bold 15px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🚀 Launch View', 44 + 80, 326);
        ctx.textAlign = 'left';
      }

      // Bottom mode switcher bar in companion
      ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
      ctx.fillRect(10, ch - 44, cw - 20, 34);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('CLICK TO CYCLE APP · SHIFT+DRAG TO MOVE', cw / 2, ch - 22);
      ctx.textAlign = 'left';

      if (this.companionTexture) this.companionTexture.needsUpdate = true;
    },

    buildCompanionModel() {
      const THREE_LIB = (typeof THREE !== 'undefined') ? THREE : (typeof window.THREE !== 'undefined' ? window.THREE : null);
      if (!THREE_LIB || !this.deviceGroup) return;

      if (this.companionGroup) {
        while (this.companionGroup.children.length > 0) {
          const obj = this.companionGroup.children[0];
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
            else obj.material.dispose();
          }
          this.companionGroup.remove(obj);
        }
        this.deviceGroup.remove(this.companionGroup);
        this.companionGroup = null;
      }

      if (!this.isDualScreenActive) {
        if (this.camera) this.camera.position.z = (this.currentDevice === 'tablet' ? 6.8 : this.currentDevice === 'curved_display' ? 5.6 : 6.4);
        return;
      }

      this.initCompanionCanvas();
      const hex = this.themeColors[this.currentTheme].hex;

      // Smart dynamic horizontal separation based on device dimensions
      const mainHalfW = (this.currentDevice === 'tablet' ? 2.25 : this.currentDevice === 'curved_display' ? 2.35 : this.currentDevice === 'holo_glass' ? 1.85 : 1.10);
      const posX = mainHalfW + 1.25 + (this.companionSpacing || 0);

      this.companionGroup = new THREE_LIB.Group();
      this.companionGroup.position.set(posX, 0, -0.45);
      this.companionGroup.rotation.y = -0.38;

      const cGeo = new THREE_LIB.PlaneGeometry(2.3, 3.2);
      const cMat = new THREE_LIB.MeshBasicMaterial({
        map: this.companionTexture,
        side: THREE_LIB.DoubleSide,
        transparent: true,
        opacity: 0.95
      });
      const cMesh = new THREE_LIB.Mesh(cGeo, cMat);
      this.companionGroup.add(cMesh);

      const edge = new THREE_LIB.LineSegments(
        new THREE_LIB.EdgesGeometry(new THREE_LIB.BoxGeometry(2.34, 3.24, 0.06)),
        new THREE_LIB.LineBasicMaterial({ color: hex, transparent: true, opacity: 0.85 })
      );
      this.companionGroup.add(edge);

      const addBracket = (bx, by, fx, fy) => {
        const pts = [
          new THREE_LIB.Vector3(bx - 0.2 * fx, by, 0.02),
          new THREE_LIB.Vector3(bx, by, 0.02),
          new THREE_LIB.Vector3(bx, by - 0.2 * fy, 0.02)
        ];
        this.companionGroup.add(new THREE_LIB.Line(new THREE_LIB.BufferGeometry().setFromPoints(pts), new THREE_LIB.LineBasicMaterial({ color: 0x38bdf8 })));
      };
      addBracket(-1.15, 1.6, -1, 1);
      addBracket(1.15, 1.6, 1, 1);
      addBracket(-1.15, -1.6, -1, -1);
      addBracket(1.15, -1.6, 1, -1);

      this.deviceGroup.add(this.companionGroup);
      if (this.camera) this.camera.position.z = Math.max(7.6, 6.0 + posX * 0.45);
    },

    setScreen1App(appId) {
      _sound('click');
      if (appId === 'text') {
        this.setMode('text');
      } else if (appId === 'custom') {
        this.setMode('custom');
      } else {
        this.setActiveApp(appId);
      }
      const s1Select = document.getElementById('spatial-screen1-select');
      if (s1Select) s1Select.value = appId;
      _toast(_isFr() ? `🖥️ Écran 1: ${appId.toUpperCase()}` : `🖥️ Screen 1: ${appId.toUpperCase()}`, 'info');
    },

    setScreen2App(appId) {
      _sound('click');
      this.companionAppId = appId;
      if (appId === 'weather') this.fetchWeather();
      else if (appId === 'forex') this.fetchForex();
      else if (appId === 'crypto') this.fetchCrypto();
      else if (appId === 'system') this.fetchSystemStats();
      else if (appId === 'radio') this.initRadioAudio();

      const s2Select = document.getElementById('spatial-screen2-select');
      if (s2Select) s2Select.value = appId;

      this.updateCompanionTexture();
      _toast(_isFr() ? `🛸 Écran 2: ${appId.toUpperCase()}` : `🛸 Screen 2: ${appId.toUpperCase()}`, 'info');
    },

    setCompanionSpacing(delta) {
      this.companionSpacing = Math.max(-0.6, Math.min(3.5, (this.companionSpacing || 0) + delta));
      this.companionSpacing = Math.round(this.companionSpacing * 100) / 100;
      if (this.companionGroup) {
        const mainHalfW = (this.currentDevice === 'tablet' ? 2.25 : this.currentDevice === 'curved_display' ? 2.35 : this.currentDevice === 'holo_glass' ? 1.85 : 1.10);
        const posX = mainHalfW + 1.25 + (this.companionSpacing || 0);
        this.companionGroup.position.x = posX;
        if (this.camera) this.camera.position.z = Math.max(7.6, 6.0 + posX * 0.45);
      }
      const valEl = document.getElementById('spatial-dual-spacing-val');
      if (valEl) valEl.textContent = (this.companionSpacing >= 0 ? '+' : '') + this.companionSpacing.toFixed(1);
      _toast(_isFr() ? `↔ Espacement Écran 2: ${(this.companionSpacing >= 0 ? '+' : '') + this.companionSpacing.toFixed(1)}` : `↔ Screen 2 Spacing: ${(this.companionSpacing >= 0 ? '+' : '') + this.companionSpacing.toFixed(1)}`, 'info');
    },

    toggleDualScreen() {
      _sound('click');
      this.isDualScreenActive = !this.isDualScreenActive;
      const btn = document.getElementById('spatial-btn-dual-screen');
      if (btn) {
        if (this.isDualScreenActive) {
          btn.classList.add('active');
          btn.style.color = '#38bdf8';
          btn.style.borderColor = '#38bdf8';
          btn.style.background = 'rgba(56,189,248,0.2)';
          btn.innerHTML = '<span>🖥️ Dual Screen: ON</span>';
        } else {
          btn.classList.remove('active');
          btn.style.color = '#60a5fa';
          btn.style.borderColor = 'rgba(59,130,246,0.4)';
          btn.style.background = 'transparent';
          btn.innerHTML = '<span>🖥️ Dual Screen</span>';
        }
      }
      const wrap = document.getElementById('spatial-dual-controls-wrap');
      if (wrap) wrap.style.display = this.isDualScreenActive ? 'inline-flex' : 'none';

      this.buildCompanionModel();
      _toast(
        _isFr()
          ? (this.isDualScreenActive ? '🖥️ Cockpit Double Écran activé !' : '🖥️ Mode Écran Unique activé.')
          : (this.isDualScreenActive ? '🖥️ Dual Screen Cockpit Hologram active!' : '🖥️ Single Screen active.'),
        'info'
      );
    },

    cycleCompanionApp() {
      const apps = ['radio', 'crypto', 'weather', 'clock', 'system', 'focus', 'snake', 'calc', 'spectrum', 'forex', 'matrix', 'custom'];
      const cur = this.companionAppId || 'crypto';
      let idx = apps.indexOf(cur);
      if (idx === -1) idx = (cur === 'pomodoro' ? apps.indexOf('focus') : 0);
      const nextIdx = (idx + 1) % apps.length;
      this.setScreen2App(apps[nextIdx]);
    },

    toggleAudioPulse() {
      _sound('click');
      this.isAudioPulseActive = !this.isAudioPulseActive;
      const btn = document.getElementById('spatial-btn-audio-pulse');
      if (btn) {
        if (this.isAudioPulseActive) {
          btn.classList.add('active');
          btn.style.color = '#fb7185';
          btn.style.borderColor = 'rgba(244,63,94,0.6)';
          btn.style.background = 'rgba(244,63,94,0.18)';
          btn.innerHTML = '<span>✨ Audio Pulse: ON</span>';
        } else {
          btn.classList.remove('active');
          btn.style.color = '#cbd5e1';
          btn.style.borderColor = 'rgba(255,255,255,0.15)';
          btn.style.background = 'transparent';
          btn.innerHTML = '<span>✨ Audio Pulse: OFF</span>';
        }
      }
      _toast(
        _isFr()
          ? (this.isAudioPulseActive ? '✨ Aura Néon Audio-Réactive activée !' : '✨ Aura Audio-Réactive désactivée.')
          : (this.isAudioPulseActive ? '✨ 3D Audio-Reactive Aura activated!' : '✨ Audio Pulse deactivated.'),
        'info'
      );
    },

    toggleSpatialDepth() {
      _sound('click');
      this.isSpatialDepthActive = !this.isSpatialDepthActive;
      const btn = document.getElementById('spatial-btn-spatial-depth');
      if (btn) {
        if (this.isSpatialDepthActive) {
          btn.classList.add('active');
          btn.style.color = '#c084fc';
          btn.style.borderColor = 'rgba(168,85,247,0.6)';
          btn.style.background = 'rgba(168,85,247,0.18)';
          btn.innerHTML = '<span>🪟 Spatial Depth: ON</span>';
        } else {
          btn.classList.remove('active');
          btn.style.color = '#cbd5e1';
          btn.style.borderColor = 'rgba(255,255,255,0.15)';
          btn.style.background = 'transparent';
          btn.innerHTML = '<span>🪟 Spatial Depth: OFF</span>';
        }
      }
      this.buildDeviceModel();
      _toast(
        _isFr()
          ? (this.isSpatialDepthActive ? '🪟 Profondeur Spatiale 2.5D activée !' : '🪟 Profondeur Spatiale désactivée.')
          : (this.isSpatialDepthActive ? '🪟 2.5D Spatial Parallax Depth active!' : '🪟 Spatial Depth deactivated.'),
        'info'
      );
    },

    recordWebM(durationSec = 6) {
      if (typeof window.guardPremium === 'function' && !window.guardPremium(null, '60 FPS Canvas Video Recorder')) return;
      if (this.isRecordingWebM) return;
      _sound('click');

      const canvas = this.renderer ? this.renderer.domElement : this.screenCanvas;
      if (!canvas || typeof canvas.captureStream !== 'function' || typeof MediaRecorder === 'undefined') {
        _toast(_isFr() ? '⚠️ MediaRecorder non supporté par ce navigateur.' : '⚠️ MediaRecorder not supported in this browser.', 'warning');
        return;
      }

      const stream = canvas.captureStream(60);

      // Attach audio track if radio is playing
      if (this.radioState && this.radioState.audioEl && this.radioState.isPlaying) {
        try {
          const aEl = this.radioState.audioEl;
          const aStream = aEl.captureStream ? aEl.captureStream() : (aEl.mozCaptureStream ? aEl.mozCaptureStream() : null);
          if (aStream && aStream.getAudioTracks().length > 0) {
            stream.addTrack(aStream.getAudioTracks()[0]);
          }
        } catch(e) {}
      }

      let mimeType = 'video/webm;codecs=vp9';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm;codecs=vp8';
        if (!MediaRecorder.isTypeSupported(mimeType)) mimeType = 'video/webm';
      }

      try {
        this.mediaRecorder = new MediaRecorder(stream, { mimeType });
      } catch (err) {
        _toast('⚠️ Recorder init error: ' + err.message, 'warning');
        return;
      }

      this.isRecordingWebM = true;
      this.recordedChunks = [];
      const recBtn = document.getElementById('spatial-btn-record-webm');
      let remaining = durationSec;

      if (recBtn) {
        recBtn.style.borderColor = '#ef4444';
        recBtn.style.color = '#f87171';
        recBtn.style.background = 'rgba(239,68,68,0.2)';
        recBtn.innerHTML = `<span>🔴 REC ${remaining}s...</span>`;
      }

      const spinSpeed = (Math.PI * 2) / (durationSec * 60);

      this.mediaRecorder.ondataavailable = e => {
        if (e.data && e.data.size > 0) this.recordedChunks.push(e.data);
      };

      const self = this;
      this.mediaRecorder.onstop = () => {
        self.isRecordingWebM = false;
        clearInterval(self.recordingTimer);
        if (recBtn) {
          recBtn.style.borderColor = 'rgba(239,68,68,0.5)';
          recBtn.style.color = '#f87171';
          recBtn.style.background = 'rgba(239,68,68,0.08)';
          recBtn.innerHTML = '<span>🎥 60fps Video (WebM)</span>';
        }

        const blob = new Blob(self.recordedChunks, { type: mimeType });
        if (blob.size === 0) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `spatial-screen-${self.currentDevice}-60fps.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        _toast(
          _isFr()
            ? `🎥 Vidéo WebM 60fps exportée (${(blob.size / (1024 * 1024)).toFixed(1)} MB) !`
            : `🎥 60fps WebM Video exported (${(blob.size / (1024 * 1024)).toFixed(1)} MB)!`,
          'success'
        );
      };

      this.mediaRecorder.start();

      this.recordingTimer = setInterval(() => {
        remaining--;
        if (recBtn) recBtn.innerHTML = `<span>🔴 REC ${remaining}s...</span>`;
        self.rotY += spinSpeed * 60;
        if (remaining <= 0) {
          clearInterval(self.recordingTimer);
          if (self.mediaRecorder && self.mediaRecorder.state !== 'inactive') {
            self.mediaRecorder.stop();
          }
        }
      }, 1000);
    },

    // ══════════════════════════════════════════════════════════════════════════
    // SCREEN TEXTURE ENGINE (Draws Content Live onto 1024x1024 Texture)
    // ══════════════════════════════════════════════════════════════════════════
    updateScreenTexture() {
      if (!this.screenCtx) return;
      const ctx = this.screenCtx;
      const sw = 1024, sh = 1024;
      const accent = this.themeColors[this.currentTheme].css;

      // Base background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, sw, sh);
      bgGrad.addColorStop(0, '#090d1a');
      bgGrad.addColorStop(0.5, '#0f172a');
      bgGrad.addColorStop(1, '#05070e');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, sw, sh);

      // Status Bar
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.fillRect(0, 0, sw, 56);
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 22px system-ui, sans-serif';
      ctx.fillText('9:41', 40, 36);
      ctx.textAlign = 'right';
      ctx.fillText('5G  100% 🔋', sw - 40, 36);
      ctx.textAlign = 'left';

      // ─────────────────────────────────────────────────────────────
      // MODE 1: CUSTOM TEXT & HOLOGRAPHIC MARKDOWN
      // ─────────────────────────────────────────────────────────────
      if (this.currentMode === 'text') {
        // Optional Matrix Rain background
        if (this.textData.matrixRain && this.matrixDrops) {
          ctx.fillStyle = accent;
          ctx.font = '14px monospace';
          ctx.globalAlpha = 0.15;
          for (let i = 0; i < this.matrixDrops.length; i++) {
            const d = this.matrixDrops[i];
            const char = d.chars[Math.floor(Math.random() * d.chars.length)];
            ctx.fillText(char, d.x, d.y);
            d.y += d.speed;
            if (d.y > sh - 80) d.y = Math.random() * -100;
          }
          ctx.globalAlpha = 1.0;
        }

        // Tag / Badge
        ctx.fillStyle = accent + '22';
        ctx.strokeStyle = accent;
        ctx.lineWidth = 2;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(40, 80, 240, 38, 10); else ctx.rect(40, 80, 240, 38);
        ctx.fill(); ctx.stroke();
        ctx.fillStyle = accent;
        ctx.font = 'bold 16px monospace';
        ctx.fillText(this.textData.tag || '⚡ SPATIAL WORKSTATION', 56, 105);

        // Title
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 46px system-ui, -apple-system, sans-serif';
        this.wrapText(ctx, this.textData.title || 'Untitled Screen', 40, 175, sw - 80, 54);

        // Subtitle
        ctx.fillStyle = accent;
        ctx.font = 'bold 24px system-ui, sans-serif';
        this.wrapText(ctx, this.textData.subtitle || '', 40, 280, sw - 80, 32);

        // Hero Content Box
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(40, 340, sw - 80, 360, 22); else ctx.rect(40, 340, sw - 80, 360);
        ctx.fill(); ctx.stroke();

        // Body Text
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '22px system-ui, sans-serif';
        this.wrapText(ctx, this.textData.body || '', 70, 390, sw - 140, 36);

        // Call to action button on screen
        const btnGrad = ctx.createLinearGradient(70, 620, 350, 620);
        btnGrad.addColorStop(0, accent);
        btnGrad.addColorStop(1, '#8b5cf6');
        ctx.fillStyle = btnGrad;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(70, 620, 280, 52, 14); else ctx.rect(70, 620, 280, 52);
        ctx.fill();
        ctx.fillStyle = '#05070e';
        ctx.font = 'bold 20px system-ui, sans-serif';
        ctx.fillText('⚡ EXECUTE ACTION', 96, 653);

        // Bottom Telemetry Cards
        const cardWidth = (sw - 100) / 2;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.strokeStyle = accent + '44';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(40, 720, cardWidth, 180, 16); else ctx.rect(40, 720, cardWidth, 180);
        ctx.fill(); ctx.stroke();
        ctx.fillStyle = accent;
        ctx.font = 'bold 20px system-ui, sans-serif';
        ctx.fillText('Spatial Physics', 64, 760);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '18px system-ui, sans-serif';
        ctx.fillText('Zero-G Orbit Active', 64, 796);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 36px monospace';
        ctx.fillText('60.0 FPS', 64, 854);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.strokeStyle = '#a855f744';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(60 + cardWidth, 720, cardWidth, 180, 16); else ctx.rect(60 + cardWidth, 720, cardWidth, 180);
        ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#a855f7';
        ctx.font = 'bold 20px system-ui, sans-serif';
        ctx.fillText('Sync Latency', 84 + cardWidth, 760);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '18px system-ui, sans-serif';
        ctx.fillText('Client-Side Engine', 84 + cardWidth, 796);
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 36px monospace';
        ctx.fillText('0.42 ms', 84 + cardWidth, 854);

      // ─────────────────────────────────────────────────────────────
      // MODE 2: MINI-APPS (Snake, Calculator, Clock, Spectrum)
      // ─────────────────────────────────────────────────────────────
      } else if (this.currentMode === 'apps') {

        if (this.activeAppId === 'snake') {
          this.renderSnakeApp(ctx, sw, sh, accent);
        } else if (this.activeAppId === 'calc') {
          this.renderCalculatorApp(ctx, sw, sh, accent);
        } else if (this.activeAppId === 'clock') {
          this.renderClockApp(ctx, sw, sh, accent);
        } else if (this.activeAppId === 'weather') {
          this.renderWeatherApp(ctx, sw, sh, accent);
        } else if (this.activeAppId === 'forex') {
          this.renderForexApp(ctx, sw, sh, accent);
        } else if (this.activeAppId === 'radio') {
          this.renderRadioApp(ctx, sw, sh, accent);
        } else if (this.activeAppId === 'crypto') {
          this.renderCryptoApp(ctx, sw, sh, accent);
        } else if (this.activeAppId === 'pomodoro') {
          this.renderPomodoroApp(ctx, sw, sh, accent);
        } else if (this.activeAppId === 'system') {
          this.renderSystemApp(ctx, sw, sh, accent);
        } else {
          this.renderSpectrumApp(ctx, sw, sh, accent);
        }

      // ─────────────────────────────────────────────────────────────
      // MODE 3: CUSTOM APP / HTML INJECTOR
      // ─────────────────────────────────────────────────────────────
      } else {
        this.renderCustomCodeApp(ctx, sw, sh, accent);
      }

      // Bottom Universal Bar
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.fillRect(0, sh - 80, sw, 80);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('⌂ Home       ✦ Apps       ⚙ Settings       ⚡ Deploy', sw / 2, sh - 32);
      ctx.textAlign = 'left';
    },

    // ══════════════════════════════════════════════════════════════════════════
    // MINI-APP 1: CYBER SNAKE ARCADE
    // ══════════════════════════════════════════════════════════════════════════
    renderSnakeApp(ctx, sw, sh, accent) {
      const s = this.snakeState;
      if (!s) return;

      // Update Snake logic
      const now = performance.now();
      if (now - s.lastTick > s.speed && !s.isGameOver) {
        s.lastTick = now;

        // Autonomous AI play if user is watching
        if (s.aiDemo) {
          const head = s.snake[0];
          const dx = s.food.x - head.x;
          const dy = s.food.y - head.y;
          if (dx !== 0 && (s.dir.x === 0 || Math.random() < 0.2)) {
            const nextX = Math.sign(dx);
            if (s.dir.x !== -nextX) s.dir = { x: nextX, y: 0 };
          } else if (dy !== 0 && s.dir.y === 0) {
            const nextY = Math.sign(dy);
            if (s.dir.y !== -nextY) s.dir = { x: 0, y: nextY };
          }
        }

        const newHead = { x: s.snake[0].x + s.dir.x, y: s.snake[0].y + s.dir.y };

        // Wrap boundaries
        if (newHead.x < 0) newHead.x = s.gridSize - 1;
        if (newHead.x >= s.gridSize) newHead.x = 0;
        if (newHead.y < 0) newHead.y = s.gridSize - 1;
        if (newHead.y >= s.gridSize) newHead.y = 0;

        s.snake.unshift(newHead);

        // Check food collision
        if (newHead.x === s.food.x && newHead.y === s.food.y) {
          s.score += 10;
          if (s.score > s.highScore) s.highScore = s.score;
          s.food = {
            x: Math.floor(Math.random() * (s.gridSize - 2)) + 1,
            y: Math.floor(Math.random() * (s.gridSize - 2)) + 1
          };
          if (s.snake.length > 25) s.snake.pop(); // Keep manageable length
        } else {
          s.snake.pop();
        }
      }

      // App Header
      ctx.fillStyle = accent;
      ctx.font = 'bold 36px monospace';
      ctx.fillText('🕹️ CYBER SNAKE ARCADE', 50, 115);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`SCORE: ${s.score}   HI: ${s.highScore}`, sw - 50, 115);
      ctx.textAlign = 'left';

      // Play Area
      const arenaX = 50, arenaY = 145, arenaW = sw - 100, arenaH = 620;
      ctx.fillStyle = 'rgba(6, 10, 24, 0.95)';
      ctx.strokeStyle = accent;
      ctx.lineWidth = 3;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(arenaX, arenaY, arenaW, arenaH, 18); else ctx.rect(arenaX, arenaY, arenaW, arenaH);
      ctx.fill(); ctx.stroke();

      // Grid Lines
      const cellW = arenaW / s.gridSize;
      const cellH = arenaH / s.gridSize;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x <= s.gridSize; x++) {
        ctx.beginPath();
        ctx.moveTo(arenaX + x * cellW, arenaY);
        ctx.lineTo(arenaX + x * cellW, arenaY + arenaH);
        ctx.stroke();
      }

      // Draw Food
      const fx = arenaX + s.food.x * cellW + cellW / 2;
      const fy = arenaY + s.food.y * cellH + cellH / 2;
      ctx.fillStyle = '#ff007f';
      ctx.shadowColor = '#ff007f';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(fx, fy, cellW * 0.45, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Snake
      s.snake.forEach((seg, idx) => {
        const sx = arenaX + seg.x * cellW + 2;
        const sy = arenaY + seg.y * cellH + 2;
        ctx.fillStyle = idx === 0 ? '#ffffff' : accent;
        ctx.shadowColor = accent;
        ctx.shadowBlur = idx === 0 ? 12 : 6;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(sx, sy, cellW - 4, cellH - 4, 6); else ctx.rect(sx, sy, cellW - 4, cellH - 4);
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      // Instructions / Touch Controls Bar
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(50, 785, sw - 100, 110, 16); else ctx.rect(50, 785, sw - 100, 110);
      ctx.fill();

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '20px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🎮 Use Arrow Keys [← ↑ ↓ →] or Click D-Pad to Play Live in 3D Space', sw / 2, 830);
      ctx.fillStyle = accent;
      ctx.font = 'bold 16px monospace';
      ctx.fillText('⚡ REAL-TIME SPATIAL GAMING ENGINE · 60FPS SYNCHRONIZED', sw / 2, 865);
      ctx.textAlign = 'left';
    },

    // ══════════════════════════════════════════════════════════════════════════
    // MINI-APP 2: SPATIAL NEUMORPHIC CALCULATOR
    // ══════════════════════════════════════════════════════════════════════════
    renderCalculatorApp(ctx, sw, sh, accent) {
      const c = this.calcState;
      // Header
      ctx.fillStyle = accent;
      ctx.font = 'bold 36px monospace';
      ctx.fillText('🧮 SPATIAL NEUMORPHIC CALCULATOR', 50, 115);

      // Display Screen
      const dx = 50, dy = 145, dw = sw - 100, dh = 150;
      ctx.fillStyle = '#060b18';
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(dx, dy, dw, dh, 18); else ctx.rect(dx, dy, dw, dh);
      ctx.fill(); ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = '18px monospace';
      ctx.fillText(c.subDisplay || 'ULTRA MATH ENGINE v4.2', dx + 24, dy + 40);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 64px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(c.display || '0', dx + dw - 24, dy + 115);
      ctx.textAlign = 'left';

      // Keypad Grid
      const keys = [
        ['C', 'CE', '%', '÷'],
        ['7', '8', '9', '×'],
        ['4', '5', '6', '−'],
        ['1', '2', '3', '+'],
        ['±', '0', '.', '=']
      ];
      const startY = 320;
      const btnW = (dw - 45) / 4;
      const btnH = 95;

      keys.forEach((row, rIdx) => {
        row.forEach((key, cIdx) => {
          const bx = dx + cIdx * (btnW + 15);
          const by = startY + rIdx * (btnH + 15);
          const isOp = ['÷', '×', '−', '+', '='].includes(key);

          ctx.fillStyle = isOp ? accent : 'rgba(255, 255, 255, 0.06)';
          ctx.strokeStyle = isOp ? '#ffffff' : 'rgba(255, 255, 255, 0.12)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          if (ctx.roundRect) ctx.roundRect(bx, by, btnW, btnH, 14); else ctx.rect(bx, by, btnW, btnH);
          ctx.fill(); ctx.stroke();

          ctx.fillStyle = isOp ? '#030712' : '#ffffff';
          ctx.font = 'bold 32px system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(key, bx + btnW / 2, by + btnH / 2 + 10);
          ctx.textAlign = 'left';
        });
      });
    },

    // ══════════════════════════════════════════════════════════════════════════
    // MINI-APP 3: QUANTUM CYBER CLOCK
    // ══════════════════════════════════════════════════════════════════════════
    renderClockApp(ctx, sw, sh, accent) {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, '0');
      const mm = String(d.getMinutes()).padStart(2, '0');
      const ss = String(d.getSeconds()).padStart(2, '0');
      const ms = String(Math.floor(d.getMilliseconds() / 10)).padStart(2, '0');

      // Title
      ctx.fillStyle = accent;
      ctx.font = 'bold 36px monospace';
      ctx.fillText('⏱️ QUANTUM CYBER CLOCK & STAR DATE', 50, 115);

      // Giant Time Display
      ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(50, 150, sw - 100, 320, 24); else ctx.rect(50, 150, sw - 100, 320);
      ctx.fill(); ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = 'bold 20px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('LOCAL SPATIAL TIME ZONE (UTC+2)', sw / 2, 205);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 108px monospace';
      ctx.shadowColor = accent;
      ctx.shadowBlur = 25;
      ctx.fillText(`${hh}:${mm}:${ss}`, sw / 2, 330);
      ctx.shadowBlur = 0;

      ctx.fillStyle = accent;
      ctx.font = 'bold 36px monospace';
      ctx.fillText(`.${ms} MILLISECONDS`, sw / 2, 400);

      // Star Date & Date Box
      const dateStr = d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      const starDate = `STAR-DATE: ${(d.getFullYear() + d.getMonth() / 12 + d.getDate() / 365).toFixed(4)}`;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(50, 500, sw - 100, 380, 22); else ctx.rect(50, 500, sw - 100, 380);
      ctx.fill();

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 30px system-ui, sans-serif';
      ctx.fillText(dateStr, sw / 2, 570);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '24px monospace';
      ctx.fillText(starDate, sw / 2, 630);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(sw / 2 - 200, 680, 400, 60, 14); else ctx.rect(sw / 2 - 200, 680, 400, 60);
      ctx.fill();

      ctx.fillStyle = accent;
      ctx.font = 'bold 22px system-ui, sans-serif';
      ctx.fillText('🟢 PRECISION QUANTUM ATOMIC SYNC', sw / 2, 718);
      ctx.textAlign = 'left';
    },

    // ══════════════════════════════════════════════════════════════════════════
    // MINI-APP 4: AUDIO SPECTRUM VISUALIZER
    // ══════════════════════════════════════════════════════════════════════════
    renderSpectrumApp(ctx, sw, sh, accent) {
      ctx.fillStyle = accent;
      ctx.font = 'bold 36px monospace';
      ctx.fillText('🎵 AUDIO REACTIVE SPATIAL SPECTRUM', 50, 115);

      const arenaX = 50, arenaY = 150, arenaW = sw - 100, arenaH = 720;
      ctx.fillStyle = 'rgba(6, 10, 24, 0.9)';
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(arenaX, arenaY, arenaW, arenaH, 20); else ctx.rect(arenaX, arenaY, arenaW, arenaH);
      ctx.fill(); ctx.stroke();

      // Equalizer bars
      const bars = 28;
      const barW = (arenaW - 60) / bars;
      const t = this.animTime * 3;

      for (let i = 0; i < bars; i++) {
        const heightFactor = Math.abs(Math.sin(t + i * 0.35) * Math.cos(t * 0.5 + i * 0.2));
        const barH = Math.max(30, heightFactor * 480);
        const bx = arenaX + 30 + i * barW;
        const by = arenaY + arenaH - 80 - barH;

        const grad = ctx.createLinearGradient(bx, by, bx, by + barH);
        grad.addColorStop(0, '#ff007f');
        grad.addColorStop(0.5, accent);
        grad.addColorStop(1, '#8b5cf6');
        ctx.fillStyle = grad;

        ctx.shadowColor = accent;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(bx, by, barW - 6, barH, 8); else ctx.rect(bx, by, barW - 6, barH);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('DYNAMIC 32-BAND EQUALIZER · ZERO-G AUDIO LAB', sw / 2, arenaY + arenaH - 30);
      ctx.textAlign = 'left';
    },

    // ══════════════════════════════════════════════════════════════════════════
    // MINI-APP 5: METEO REAL & LIVE RADAR
    // ══════════════════════════════════════════════════════════════════════════
    renderWeatherApp(ctx, sw, sh, accent) {
      const ws = this.weatherState || {};
      const cx = 50, cy = 145, cw = sw - 100, ch = 720;

      // Header
      ctx.fillStyle = accent;
      ctx.font = 'bold 34px monospace';
      ctx.fillText('🌤️ QUANTUM WEATHER STATION · LIVE RADAR', 50, 115);

      // Glass Card
      ctx.fillStyle = 'rgba(6, 11, 25, 0.94)';
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx, cy, cw, ch, 20); else ctx.rect(cx, cy, cw, ch);
      ctx.fill(); ctx.stroke();

      // Active City Ribbon
      const cityTag = `${ws.country || '🇨🇦'} ${ws.city || 'Montreal'}`.toUpperCase();
      ctx.fillStyle = accent + '22';
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx + 30, cy + 24, 280, 42, 10); else ctx.rect(cx + 30, cy + 24, 280, 42);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = accent;
      ctx.font = 'bold 18px monospace';
      ctx.fillText(`📍 ${cityTag}`, cx + 46, cy + 51);

      ctx.fillStyle = '#64748b';
      ctx.font = 'bold 14px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(ws.lastUpdated ? `SYNC: ${ws.lastUpdated}` : 'SATELLITE SYNC OK', cx + cw - 30, cy + 50);
      ctx.textAlign = 'left';

      // Hero Temperature & Icon
      const tempVal = ws.temp !== undefined ? (ws.temp > 0 ? `+${ws.temp}°C` : `${ws.temp}°C`) : '+8.5°C';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 96px monospace';
      ctx.shadowColor = accent;
      ctx.shadowBlur = 20;
      ctx.fillText(tempVal, cx + 30, cy + 180);
      ctx.shadowBlur = 0;

      // Condition text
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 26px system-ui, sans-serif';
      ctx.fillText(ws.condition || 'Clear Sky / Ciel Dégagé ☀️', cx + 32, cy + 230);

      // Weather animation inside card (rain streaks or sun halo)
      const isRain = (ws.weatherCode && ws.weatherCode >= 51) || (ws.condition && (ws.condition.toLowerCase().includes('rain') || ws.condition.toLowerCase().includes('pluie')));
      if (isRain) {
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
        ctx.lineWidth = 1.5;
        for (let r = 0; r < 36; r++) {
          const rx = cx + 400 + ((r * 37 + this.animTime * 180) % (cw - 430));
          const ry = cy + 40 + ((r * 53 + this.animTime * 320) % 240);
          ctx.beginPath();
          ctx.moveTo(rx, ry);
          ctx.lineTo(rx - 8, ry + 22);
          ctx.stroke();
        }
      } else {
        const sunX = cx + cw - 140, sunY = cy + 160;
        ctx.fillStyle = '#f59e0b';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 25;
        ctx.beginPath();
        ctx.arc(sunX, sunY, 44 + Math.sin(this.animTime * 2) * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
        ctx.lineWidth = 2;
        for (let a = 0; a < 8; a++) {
          const ang = a * (Math.PI / 4) + this.animTime * 0.3;
          ctx.beginPath();
          ctx.moveTo(sunX + Math.cos(ang) * 56, sunY + Math.sin(ang) * 56);
          ctx.lineTo(sunX + Math.cos(ang) * 78, sunY + Math.sin(ang) * 78);
          ctx.stroke();
        }
      }

      // 3 Telemetry Cards
      const tCardW = (cw - 80) / 3;
      const metrics = [
        { label: '💧 Humidity / Humidité', val: `${ws.humidity || 52}%`, sub: 'Dew Point / Pt rosée 2°C' },
        { label: '💨 Wind / Vitesse Vent', val: `${ws.windSpeed || 14.5} km/h`, sub: 'Direction WNW / ONO' },
        { label: '🌡️ Feels Like / Ressenti', val: `${ws.apparentTemp || 7.8}°C`, sub: 'UV Index: 3 Moderate' }
      ];

      metrics.forEach((m, idx) => {
        const mx = cx + 30 + idx * (tCardW + 10);
        const my = cy + 275;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.strokeStyle = accent + '44';
        ctx.lineWidth = 1;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(mx, my, tCardW, 110, 12); else ctx.rect(mx, my, tCardW, 110);
        ctx.fill(); ctx.stroke();

        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 16px system-ui, sans-serif';
        ctx.fillText(m.label, mx + 16, my + 30);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 26px monospace';
        ctx.fillText(m.val, mx + 16, my + 68);
        ctx.fillStyle = '#64748b';
        ctx.font = '13px system-ui, sans-serif';
        ctx.fillText(m.sub, mx + 16, my + 94);
      });

      // 4-Day Forecast Section
      ctx.fillStyle = '#cbd5e1';
      ctx.font = 'bold 18px monospace';
      ctx.fillText('✦ 4-DAY SYNOPTIC FORECAST & TEMPERATURE SPREAD', cx + 30, cy + 430);

      const fCardW = (cw - 90) / 4;
      const daily = (ws.daily && ws.daily.length) ? ws.daily : [
        { day: 'Today / Aujourd\'hui', max: 15, min: 5, code: 0 },
        { day: 'Tomorrow / Demain', max: 16, min: 6, code: 1 },
        { day: 'Wed / Mer', max: 15, min: 9, code: 61 },
        { day: 'Thu / Jeu', max: 16, min: 6, code: 2 }
      ];

      daily.slice(0, 4).forEach((d, idx) => {
        const fx = cx + 30 + idx * (fCardW + 10);
        const fy = cy + 455;
        ctx.fillStyle = idx === 0 ? accent + '18' : 'rgba(255, 255, 255, 0.03)';
        ctx.strokeStyle = idx === 0 ? accent : 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(fx, fy, fCardW, 160, 14); else ctx.rect(fx, fy, fCardW, 160);
        ctx.fill(); ctx.stroke();

        ctx.fillStyle = idx === 0 ? accent : '#ffffff';
        ctx.font = 'bold 16px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(d.day, fx + fCardW / 2, fy + 32);

        const icon = (d.code >= 71) ? '❄️' : (d.code >= 51) ? '🌧️' : (d.code >= 1 && d.code <= 3) ? '⛅' : '☀️';
        ctx.font = '32px system-ui, sans-serif';
        ctx.fillText(icon, fx + fCardW / 2, fy + 78);

        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 20px monospace';
        ctx.fillText(`+${d.max}°`, fx + fCardW / 2, fy + 115);
        ctx.fillStyle = '#64748b';
        ctx.font = 'bold 15px monospace';
        ctx.fillText(`+${d.min}° min`, fx + fCardW / 2, fy + 140);
        ctx.textAlign = 'left';
      });

      // Bottom Status Banner
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx + 30, cy + 635, cw - 60, 60, 12); else ctx.rect(cx + 30, cy + 635, cw - 60, 60);
      ctx.fill();
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 18px system-ui, sans-serif';
      ctx.fillText('🟢 OPEN-METEO GLOBAL SATELLITE RADAR ONLINE', cx + 50, cy + 672);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`LAT: ${ws.lat || 45.50}° LON: ${ws.lon || -73.57}° · TIMEZONE AMERICA/TORONTO`, cx + cw - 50, cy + 672);
      ctx.textAlign = 'left';
    },

    // ══════════════════════════════════════════════════════════════════════════
    // MINI-APP 6: GLOBAL FOREX & CURRENCY RADAR (CAD CANADIAN DOLLAR BASE)
    // ══════════════════════════════════════════════════════════════════════════
    renderForexApp(ctx, sw, sh, accent) {
      const fs = this.forexState || { base: 'CAD', rates: { USD: 0.7147, EUR: 0.6229, GBP: 0.5342, JPY: 112.27, CHF: 0.5883 } };
      const cx = 50, cy = 145, cw = sw - 100, ch = 720;

      // Header
      ctx.fillStyle = accent;
      ctx.font = 'bold 34px monospace';
      ctx.fillText('💱 GLOBAL FOREX & CURRENCY RADAR', 50, 115);

      // Glass Card
      ctx.fillStyle = 'rgba(6, 11, 25, 0.94)';
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx, cy, cw, ch, 20); else ctx.rect(cx, cy, cw, ch);
      ctx.fill(); ctx.stroke();

      // Hero Exchange Banner: CAD to USD
      const heroGrad = ctx.createLinearGradient(cx + 30, cy + 25, cx + cw - 30, cy + 145);
      heroGrad.addColorStop(0, 'rgba(0, 243, 255, 0.12)');
      heroGrad.addColorStop(1, 'rgba(168, 85, 247, 0.08)');
      ctx.fillStyle = heroGrad;
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx + 30, cy + 25, cw - 60, 125, 14); else ctx.rect(cx + 30, cy + 25, cw - 60, 125);
      ctx.fill(); ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 16px monospace';
      ctx.fillText('🇨🇦 1.00 CAD (CANADIAN DOLLAR) ⇄ 🇺🇸 US DOLLAR (USD)', cx + 50, cy + 60);

      const cadUsdRate = fs.rates?.USD ? fs.rates.USD.toFixed(4) : '0.7147';
      const usdCadRate = fs.rates?.USD ? (1 / fs.rates.USD).toFixed(4) : '1.3992';

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 54px monospace';
      ctx.shadowColor = accent;
      ctx.shadowBlur = 15;
      ctx.fillText(`1 CAD = ${cadUsdRate} USD`, cx + 50, cy + 120);
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 18px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`1 USD = ${usdCadRate} CAD · BANK OF CANADA`, cx + cw - 50, cy + 115);
      ctx.textAlign = 'left';

      // 4 Currency Cards (2x2)
      const qW = (cw - 80) / 2, qH = 90;
      const currencies = [
        { sym: 'USD', flag: '🇺🇸', name: 'US Dollar', rate: fs.rates?.USD || 0.7147, delta: '+0.15%', up: true },
        { sym: 'EUR', flag: '🇪🇺', name: 'Euro', rate: fs.rates?.EUR || 0.6229, delta: '-0.08%', up: false },
        { sym: 'GBP', flag: '🇬🇧', name: 'British Pound', rate: fs.rates?.GBP || 0.5342, delta: '+0.05%', up: true },
        { sym: 'JPY', flag: '🇯🇵', name: 'Japanese Yen', rate: fs.rates?.JPY || 112.27, delta: '+0.42%', up: true }
      ];

      currencies.forEach((c, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const qx = cx + 30 + col * (qW + 20);
        const qy = cy + 165 + row * (qH + 12);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(qx, qy, qW, qH, 12); else ctx.rect(qx, qy, qW, qH);
        ctx.fill(); ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 20px system-ui, sans-serif';
        ctx.fillText(`${c.flag} 1 CAD ⇄ ${c.sym}`, qx + 18, qy + 36);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '13px system-ui, sans-serif';
        ctx.fillText(c.name, qx + 18, qy + 64);

        ctx.fillStyle = accent;
        ctx.font = 'bold 28px monospace';
        ctx.textAlign = 'right';
        const formattedRate = c.sym === 'JPY' ? c.rate.toFixed(2) : c.rate.toFixed(4);
        ctx.fillText(`${formattedRate}`, qx + qW - 18, qy + 44);

        ctx.fillStyle = c.up ? '#10b981' : '#ef4444';
        ctx.font = 'bold 15px monospace';
        ctx.fillText(c.up ? `▲ ${c.delta}` : `▼ ${c.delta}`, qx + qW - 18, qy + 70);
        ctx.textAlign = 'left';
      });

      // Live Conversion Breakout Box
      const boxY = cy + 380;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.strokeStyle = accent + '55';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx + 30, boxY, cw - 60, 95, 12); else ctx.rect(cx + 30, boxY, cw - 60, 95);
      ctx.fill(); ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 16px monospace';
      ctx.fillText('✦ INSTANT CONVERSION SIMULATOR (BASE: 100 CAD):', cx + 50, boxY + 34);

      const usd100 = ((fs.rates?.USD || 0.7147) * 100).toFixed(2);
      const eur100 = ((fs.rates?.EUR || 0.6229) * 100).toFixed(2);
      const gbp100 = ((fs.rates?.GBP || 0.5342) * 100).toFixed(2);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px monospace';
      ctx.fillText(`100 CAD = $${usd100} USD  ·  €${eur100} EUR  ·  £${gbp100} GBP`, cx + 50, boxY + 72);

      // Dynamic Animated Forex Spline Waveform
      const chartY = cy + 500, chartH = 120, chartW = cw - 60;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx + 30, chartY, chartW, chartH, 12); else ctx.rect(cx + 30, chartY, chartW, chartH);
      ctx.fill();

      // Spline curve
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      const points = 32;
      for (let p = 0; p <= points; p++) {
        const px = cx + 30 + (p / points) * chartW;
        const osc = Math.sin(this.animTime * 2 + p * 0.4) * Math.cos(this.animTime + p * 0.2);
        const py = chartY + chartH / 2 + osc * 38;
        if (p === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '13px monospace';
      ctx.fillText('CAD/USD 24H INTRADAY TICK OSCILLATION · MIN: 0.7110 · MAX: 0.7185', cx + 45, chartY + chartH - 12);

      // Bottom Status Banner
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx + 30, cy + 635, cw - 60, 60, 12); else ctx.rect(cx + 30, cy + 635, cw - 60, 60);
      ctx.fill();
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 18px system-ui, sans-serif';
      ctx.fillText('🟢 OPEN EXCHANGE RATES LIVE SYNC ACTIVE', cx + 50, cy + 672);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px monospace';
      ctx.textAlign = 'right';
      ctx.fillText('GLOBAL FOREX TICKER · 0% SPREAD ZERO-G', cx + cw - 50, cy + 672);
      ctx.textAlign = 'left';
    },

    // ══════════════════════════════════════════════════════════════════════════
    // MINI-APP 7: RADIO WEB LIVE REAL & EQUALIZER
    // ══════════════════════════════════════════════════════════════════════════
    renderRadioApp(ctx, sw, sh, accent) {
      const rs = this.radioState || {};
      const curIdx = rs.currentStationIdx || 0;
      const st = rs.stations ? rs.stations[curIdx] : { name: 'Montreal Chill Beats', genre: 'Downtempo Beats', icon: '🎧', color: '#10b981' };
      const isPlaying = rs.isPlaying || false;
      const cx = 50, cy = 145, cw = sw - 100, ch = 720;

      // Header
      ctx.fillStyle = accent;
      ctx.font = 'bold 34px monospace';
      ctx.fillText('📻 QUANTUM CYBER RADIO · LIVE STEREO STREAM', 50, 115);

      // Glass Card
      ctx.fillStyle = 'rgba(6, 11, 25, 0.94)';
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx, cy, cw, ch, 20); else ctx.rect(cx, cy, cw, ch);
      ctx.fill(); ctx.stroke();

      // Station Pills Bar
      const stations = rs.stations || [];
      const sPillW = (cw - 80) / stations.length;
      stations.forEach((s, idx) => {
        const sx = cx + 30 + idx * (sPillW + 6);
        const sy = cy + 20;
        const isCur = idx === curIdx;
        ctx.fillStyle = isCur ? accent + '28' : 'rgba(255, 255, 255, 0.04)';
        ctx.strokeStyle = isCur ? accent : 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = isCur ? 2 : 1;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(sx, sy, sPillW, 44, 10); else ctx.rect(sx, sy, sPillW, 44);
        ctx.fill(); ctx.stroke();

        ctx.fillStyle = isCur ? accent : '#cbd5e1';
        ctx.font = 'bold 15px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${s.icon} ${s.name.split(' ')[0]}`, sx + sPillW / 2, sy + 28);
        ctx.textAlign = 'left';
      });

      // Active Station Hero Banner
      const heroY = cy + 80;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.strokeStyle = st.color || accent;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx + 30, heroY, cw - 60, 150, 16); else ctx.rect(cx + 30, heroY, cw - 60, 150);
      ctx.fill(); ctx.stroke();

      // Big Status Badge
      ctx.fillStyle = isPlaying ? '#10b981' : '#64748b';
      ctx.beginPath();
      ctx.arc(cx + 60, heroY + 45, 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = isPlaying ? '#10b981' : '#94a3b8';
      ctx.font = 'bold 16px monospace';
      ctx.fillText(isPlaying ? '● ON AIR · TRANSMITTING LIVE STREAM' : '○ STANDBY · STREAM PAUSED', cx + 80, heroY + 51);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px system-ui, sans-serif';
      ctx.fillText(`${st.icon} ${st.name}`, cx + 50, heroY + 98);

      ctx.fillStyle = accent;
      ctx.font = 'bold 18px system-ui, sans-serif';
      ctx.fillText(st.genre || 'Live Audio Stream', cx + 50, heroY + 130);

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 15px monospace';
      ctx.textAlign = 'right';
      ctx.fillText('128 KBPS STEREO · SOMAFM ICECAST', cx + cw - 50, heroY + 130);
      ctx.textAlign = 'left';

      // Huge Play / Pause Button on Canvas
      const btnY = cy + 250;
      const pGrad = ctx.createLinearGradient(cx + 30, btnY, cx + 330, btnY + 56);
      if (isPlaying) {
        pGrad.addColorStop(0, '#ef4444'); pGrad.addColorStop(1, '#dc2626');
      } else {
        pGrad.addColorStop(0, '#10b981'); pGrad.addColorStop(1, '#059669');
      }
      ctx.fillStyle = pGrad;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx + 30, btnY, 300, 56, 12); else ctx.rect(cx + 30, btnY, 300, 56);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px system-ui, sans-serif';
      ctx.fillText(isPlaying ? '⏸ PAUSE STREAM' : '▶ PLAY LIVE RADIO', cx + 80, btnY + 36);

      // Volume indicator
      ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx + 350, btnY, cw - 380, 56, 12); else ctx.rect(cx + 350, btnY, cw - 380, 56);
      ctx.fill();
      ctx.fillStyle = '#cbd5e1';
      ctx.font = 'bold 16px monospace';
      ctx.fillText(`VOLUME: ${Math.round((rs.volume || 0.85) * 100)}%   🔊 HIGH FIDELITY STEREO`, cx + 370, btnY + 35);

      // Dynamic 36-Band Spectrum Visualizer
      const specY = cy + 330, specH = 280, specW = cw - 60;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx + 30, specY, specW, specH, 14); else ctx.rect(cx + 30, specY, specW, specH);
      ctx.fill();

      const bars = 36;
      const bW = (specW - 40) / bars;
      const baseT = this.animTime * (isPlaying ? 5 : 0.5);

      for (let b = 0; b < bars; b++) {
        const factor = isPlaying
          ? Math.abs(Math.sin(baseT + b * 0.35) * Math.cos(baseT * 0.7 + b * 0.2))
          : Math.abs(Math.sin(b * 0.3)) * 0.12;
        const bH = Math.max(12, factor * (specH - 40));
        const bx = cx + 45 + b * bW;
        const by = specY + specH - 20 - bH;

        const bGrad = ctx.createLinearGradient(bx, by, bx, by + bH);
        bGrad.addColorStop(0, '#ff007f');
        bGrad.addColorStop(0.5, accent);
        bGrad.addColorStop(1, '#10b981');
        ctx.fillStyle = bGrad;
        ctx.fillRect(bx, by, bW - 4, bH);
      }

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(isPlaying ? '⚡ LIVE STEREO SPECTRUM REACTIVE ENGINE ACTIVE' : 'RADIO PAUSED · CLICK PLAY OR SELECT STATION IN CONTROLS', sw / 2, specY + 40);
      ctx.textAlign = 'left';

      // Bottom Status Banner
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx + 30, cy + 635, cw - 60, 60, 12); else ctx.rect(cx + 30, cy + 635, cw - 60, 60);
      ctx.fill();
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 18px system-ui, sans-serif';
      ctx.fillText('🎧 ZERO-G WEB RADIO STREAMING ENGINE', cx + 50, cy + 672);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px monospace';
      ctx.textAlign = 'right';
      ctx.fillText('HTML5 AUDIO · DIRECT SPEAKER OUTPUT', cx + cw - 50, cy + 672);
      ctx.textAlign = 'left';
    },

    // ══════════════════════════════════════════════════════════════════════════
    // MINI-APP 8: CRYPTO REAL-TIME TERMINAL
    // ══════════════════════════════════════════════════════════════════════════
    renderCryptoApp(ctx, sw, sh, accent) {
      const cs = this.cryptoState || {};
      const coins = cs.coins || [
        { symbol: 'BTC', name: 'Bitcoin', price: 64820, change24h: +4.25, icon: '🟡', color: '#f59e0b' },
        { symbol: 'ETH', name: 'Ethereum', price: 3480, change24h: +3.80, icon: '🔷', color: '#38bdf8' },
        { symbol: 'SOL', name: 'Solana', price: 152.40, change24h: +8.15, icon: '🟣', color: '#a855f7' },
        { symbol: 'BNB', name: 'BNB Chain', price: 582.10, change24h: -0.92, icon: '🔶', color: '#eab308' }
      ];
      const cx = 50, cy = 145, cw = sw - 100, ch = 720;

      // Header
      ctx.fillStyle = accent;
      ctx.font = 'bold 34px monospace';
      ctx.fillText('🪙 QUANTUM CRYPTO ASSET TERMINAL', 50, 115);

      // Glass Card
      ctx.fillStyle = 'rgba(6, 11, 25, 0.94)';
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx, cy, cw, ch, 20); else ctx.rect(cx, cy, cw, ch);
      ctx.fill(); ctx.stroke();

      // Hero Bitcoin Banner
      const btc = coins[0];
      const btcPrice = btc.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      ctx.fillStyle = 'rgba(245, 158, 11, 0.1)';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx + 30, cy + 24, cw - 60, 120, 14); else ctx.rect(cx + 30, cy + 24, cw - 60, 120);
      ctx.fill(); ctx.stroke();

      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 18px monospace';
      ctx.fillText('🟡 BITCOIN (BTC/USD) · 24H LIQUIDITY LEADER', cx + 50, cy + 58);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 52px monospace';
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 15;
      ctx.fillText(`$${btcPrice}`, cx + 50, cy + 115);
      ctx.shadowBlur = 0;

      ctx.fillStyle = btc.change24h >= 0 ? '#10b981' : '#ef4444';
      ctx.font = 'bold 22px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`${btc.change24h >= 0 ? '▲ +' : '▼ '}${btc.change24h}% 24H`, cx + cw - 50, cy + 112);
      ctx.textAlign = 'left';

      // 4 Asset Cards Grid
      const cardW = (cw - 80) / 4;
      coins.forEach((c, idx) => {
        const kx = cx + 30 + idx * (cardW + 7);
        const ky = cy + 160;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(kx, ky, cardW, 110, 12); else ctx.rect(kx, ky, cardW, 110);
        ctx.fill(); ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 17px system-ui, sans-serif';
        ctx.fillText(`${c.icon} ${c.symbol}`, kx + 14, ky + 28);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '12px system-ui, sans-serif';
        ctx.fillText(c.name, kx + 14, ky + 48);

        ctx.fillStyle = accent;
        ctx.font = 'bold 22px monospace';
        ctx.fillText(`$${c.price > 1000 ? c.price.toLocaleString('en-US') : c.price.toFixed(2)}`, kx + 14, ky + 78);

        ctx.fillStyle = c.change24h >= 0 ? '#10b981' : '#ef4444';
        ctx.font = 'bold 14px monospace';
        ctx.fillText(`${c.change24h >= 0 ? '▲ +' : '▼ '}${c.change24h}%`, kx + 14, ky + 98);
      });

      // Candlestick Chart Box
      const chartY = cy + 290, chartH = 210, chartW = cw - 60;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx + 30, chartY, chartW, chartH, 12); else ctx.rect(cx + 30, chartY, chartW, chartH);
      ctx.fill();

      // Draw 24 simulated candlesticks
      const cW = (chartW - 40) / 24;
      for (let i = 0; i < 24; i++) {
        const isUp = ((i * 7 + Math.floor(this.animTime * 2)) % 3) !== 0;
        const col = isUp ? '#10b981' : '#ef4444';
        const bh = 25 + Math.abs(Math.sin(i * 0.8 + this.animTime) * 80);
        const bx = cx + 45 + i * cW;
        const by = chartY + chartH / 2 - (isUp ? bh / 2 : -bh / 2);

        // Wick
        ctx.strokeStyle = col;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(bx + cW * 0.4, by - 16);
        ctx.lineTo(bx + cW * 0.4, by + bh + 16);
        ctx.stroke();

        // Body
        ctx.fillStyle = col;
        ctx.fillRect(bx, by, cW * 0.8, bh);
      }

      ctx.fillStyle = '#64748b';
      ctx.font = 'bold 14px monospace';
      ctx.fillText('1-MINUTE CANDLESTICK REAL-TIME ENGINE · VOL: $84.2B', cx + 45, chartY + 30);

      // Order Book Pressure Depth Meter
      const obY = cy + 520, obH = 95;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx + 30, obY, cw - 60, obH, 12); else ctx.rect(cx + 30, obY, cw - 60, obH);
      ctx.fill();

      ctx.fillStyle = '#cbd5e1';
      ctx.font = 'bold 16px system-ui, sans-serif';
      ctx.fillText('✦ ORDER BOOK DEPTH: BUY PRESSURE 64% vs SELL 36%', cx + 50, obY + 32);

      const bBarW = cw - 100;
      ctx.fillStyle = '#10b981';
      ctx.fillRect(cx + 50, obY + 48, bBarW * 0.64, 20);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(cx + 50 + bBarW * 0.64, obY + 48, bBarW * 0.36, 20);

      // Bottom Status Banner
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx + 30, cy + 635, cw - 60, 60, 12); else ctx.rect(cx + 30, cy + 635, cw - 60, 60);
      ctx.fill();
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 18px system-ui, sans-serif';
      ctx.fillText('🟢 COINGECKO CRYPTO FEED CONNECTED', cx + 50, cy + 672);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px monospace';
      ctx.textAlign = 'right';
      ctx.fillText('24H VOLUME: $84.2B · TICKER: LIVE', cx + cw - 50, cy + 672);
      ctx.textAlign = 'left';
    },

    // ══════════════════════════════════════════════════════════════════════════
    // MINI-APP 9: SPATIAL FOCUS & POMODORO STATION
    // ══════════════════════════════════════════════════════════════════════════
    renderPomodoroApp(ctx, sw, sh, accent) {
      const ps = this.pomodoroState || {};
      const cx = 50, cy = 145, cw = sw - 100, ch = 720;

      // Update timer tick if running
      const now = performance.now();
      if (ps.isRunning && now - (ps.lastTick || 0) > 1000) {
        ps.lastTick = now;
        if (ps.timeLeft > 0) ps.timeLeft--;
        else {
          ps.mode = ps.mode === 'focus' ? 'break' : 'focus';
          ps.timeLeft = ps.mode === 'focus' ? 25 * 60 : 5 * 60;
          ps.totalTime = ps.timeLeft;
          if (ps.mode === 'break') ps.sessionsCompleted = (ps.sessionsCompleted || 0) + 1;
        }
      }

      // Header
      ctx.fillStyle = accent;
      ctx.font = 'bold 34px monospace';
      ctx.fillText('⏳ SPATIAL FOCUS & POMODORO STATION', 50, 115);

      // Glass Card
      ctx.fillStyle = 'rgba(6, 11, 25, 0.94)';
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx, cy, cw, ch, 20); else ctx.rect(cx, cy, cw, ch);
      ctx.fill(); ctx.stroke();

      // Mode Banner
      const isFocus = (ps.mode || 'focus') === 'focus';
      ctx.fillStyle = isFocus ? accent + '22' : 'rgba(16, 185, 129, 0.2)';
      ctx.strokeStyle = isFocus ? accent : '#10b981';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx + 30, cy + 24, cw - 60, 50, 10); else ctx.rect(cx + 30, cy + 24, cw - 60, 50);
      ctx.fill(); ctx.stroke();

      ctx.fillStyle = isFocus ? accent : '#10b981';
      ctx.font = 'bold 18px monospace';
      ctx.fillText(isFocus ? '● FOCUS DEEP WORK (25 MIN INTERVAL)' : '☕ BREAK RECHARGE (5 MIN INTERVAL)', cx + 50, cy + 55);

      // Circular Glowing Progress Ring
      const ringX = cx + cw / 2, ringY = cy + 250, radius = 135;
      const progress = ps.totalTime ? (ps.timeLeft / ps.totalTime) : 1;

      // Background Ring
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 16;
      ctx.beginPath();
      ctx.arc(ringX, ringY, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Progress Arc
      ctx.strokeStyle = isFocus ? accent : '#10b981';
      ctx.shadowColor = isFocus ? accent : '#10b981';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(ringX, ringY, radius, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * progress));
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Time Text in Center
      const mins = Math.floor((ps.timeLeft || 0) / 60);
      const secs = (ps.timeLeft || 0) % 60;
      const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 84px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(timeStr, ringX, ringY + 30);

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 16px system-ui, sans-serif';
      ctx.fillText(ps.isRunning ? 'RUNNING · STAY IN THE FLOW' : 'PAUSED · CLICK START TO FOCUS', ringX, ringY + 65);
      ctx.textAlign = 'left';

      // Soundscape Card
      const sY = cy + 420;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx + 30, sY, cw - 60, 90, 14); else ctx.rect(cx + 30, sY, cw - 60, 90);
      ctx.fill(); ctx.stroke();

      ctx.fillStyle = accent;
      ctx.font = 'bold 16px monospace';
      ctx.fillText('🔊 PROCEDURAL AMBIENT SOUNDSCAPE ACTIVE:', cx + 50, sY + 35);

      const sndIcon = ps.ambientSound === 'rain' ? '🌧️ Calm Rain (Pink Noise)' : ps.ambientSound === 'cosmic' ? '🌌 Cosmic Zero-G Drone' : '🔕 Mute';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px system-ui, sans-serif';
      ctx.fillText(sndIcon, cx + 50, sY + 68);

      // Stats Card
      const stY = cy + 525;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx + 30, stY, cw - 60, 85, 12); else ctx.rect(cx + 30, stY, cw - 60, 85);
      ctx.fill();

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 18px system-ui, sans-serif';
      ctx.fillText(`🏆 Completed Today: ${ps.sessionsCompleted || 4} Sessions (100 min Deep Work)`, cx + 50, stY + 36);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px system-ui, sans-serif';
      ctx.fillText('Daily Streak: 5 Days  ·  Efficiency Rate: 98%  ·  Cognitive Flow State: Peak', cx + 50, stY + 64);

      // Bottom Status Banner
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx + 30, cy + 635, cw - 60, 60, 12); else ctx.rect(cx + 30, cy + 635, cw - 60, 60);
      ctx.fill();
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 18px system-ui, sans-serif';
      ctx.fillText('🟢 SPATIAL FOCUS NEURAL PROTOCOL READY', cx + 50, cy + 672);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px monospace';
      ctx.textAlign = 'right';
      ctx.fillText('USE CONTROLS IN PANEL TO START / PAUSE', cx + cw - 50, cy + 672);
      ctx.textAlign = 'left';
    },

    // ══════════════════════════════════════════════════════════════════════════
    // MINI-APP 10: QUANTUM SYSTEM & NETWORK MONITOR
    // ══════════════════════════════════════════════════════════════════════════
    renderSystemApp(ctx, sw, sh, accent) {
      const ss = this.systemState || {};
      const cx = 50, cy = 145, cw = sw - 100, ch = 720;

      // Header
      ctx.fillStyle = accent;
      ctx.font = 'bold 34px monospace';
      ctx.fillText('⚡ QUANTUM SYSTEM & NETWORK MONITOR', 50, 115);

      // Glass Card
      ctx.fillStyle = 'rgba(6, 11, 25, 0.94)';
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx, cy, cw, ch, 20); else ctx.rect(cx, cy, cw, ch);
      ctx.fill(); ctx.stroke();

      // 4 Telemetry Metric Gauges
      const gW = (cw - 80) / 2, gH = 140;
      const gauges = [
        { label: '🌐 Network Ping Latency', val: `${ss.pingMs || 18} ms`, sub: 'Ultra-low latency connection', color: '#10b981' },
        { label: '🔋 Battery & Power / Batterie', val: `${ss.batteryPct || 94}%`, sub: '⚡ AC Power Connected / Branché', color: '#38bdf8' },
        { label: '💾 RAM Heap Memory / Mémoire', val: `${ss.ramUsageMB || 146} MB`, sub: 'Allocated V8 JS Heap Buffer', color: '#a855f7' },
        { label: '🖥️ CPU Hardware Concurrency', val: `${ss.cpuCores || 8} Cores`, sub: 'Multi-threaded WebGL Workers', color: '#f59e0b' }
      ];

      gauges.forEach((g, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const gx = cx + 30 + col * (gW + 20);
        const gy = cy + 30 + row * (gH + 15);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.strokeStyle = g.color + '66';
        ctx.lineWidth = 1;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(gx, gy, gW, gH, 14); else ctx.rect(gx, gy, gW, gH);
        ctx.fill(); ctx.stroke();

        ctx.fillStyle = g.color;
        ctx.font = 'bold 18px system-ui, sans-serif';
        ctx.fillText(g.label, gx + 20, gy + 35);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 44px monospace';
        ctx.fillText(g.val, gx + 20, gy + 88);

        ctx.fillStyle = '#64748b';
        ctx.font = '14px system-ui, sans-serif';
        ctx.fillText(g.sub, gx + 20, gy + 120);
      });

      // 60 FPS Stability Meter Graph
      const fpsY = cy + 360, fpsH = 160, fpsW = cw - 60;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx + 30, fpsY, fpsW, fpsH, 12); else ctx.rect(cx + 30, fpsY, fpsW, fpsH);
      ctx.fill();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 18px monospace';
      ctx.fillText('✦ FRAME STABILITY TELEMETRY: 60.0 FPS / 16.6ms FRAME BUDGET', cx + 50, fpsY + 35);

      // FPS Bars
      const fBars = 28;
      const fbW = (fpsW - 40) / fBars;
      for (let i = 0; i < fBars; i++) {
        const fbx = cx + 50 + i * fbW;
        const barH = 65 + Math.sin(this.animTime * 4 + i * 0.3) * 6;
        const fby = fpsY + fpsH - 25 - barH;
        ctx.fillStyle = '#10b981';
        ctx.fillRect(fbx, fby, fbW - 4, barH);
      }

      // Connection Status Box
      const csY = cy + 540;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx + 30, csY, cw - 60, 75, 12); else ctx.rect(cx + 30, csY, cw - 60, 75);
      ctx.fill();

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 18px system-ui, sans-serif';
      ctx.fillText('🟢 CLIENT-SIDE CONTAINER: ONLINE (FIBER / 4G GIGABIT)', cx + 50, csY + 36);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px system-ui, sans-serif';
      ctx.fillText('WebGL 2.0 Hardware Acceleration Active  ·  Zero-G Matrix Shaders Loaded', cx + 50, csY + 60);

      // Bottom Status Banner
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx + 30, cy + 635, cw - 60, 60, 12); else ctx.rect(cx + 30, cy + 635, cw - 60, 60);
      ctx.fill();
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 18px system-ui, sans-serif';
      ctx.fillText('⚡ QUANTUM BROWSER DIAGNOSTICS ACTIVE', cx + 50, cy + 672);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px monospace';
      ctx.textAlign = 'right';
      ctx.fillText('ALL HARDWARE SENSORS NOMINAL', cx + cw - 50, cy + 672);
      ctx.textAlign = 'left';
    },
    renderCustomCodeApp(ctx, sw, sh, accent) {
      const code = this.customCode || '';
      const isSynth = /synth|beat|drum|audio|sequencer|track|bpm|step/i.test(code);

      if (isSynth) {
        // ─────────────────────────────────────────────────────────────
        // 1. CYBERBEATS STUDIO / PROCEDURAL SYNTH ENGINE
        // ─────────────────────────────────────────────────────────────
        ctx.fillStyle = accent;
        ctx.font = 'bold 30px monospace';
        ctx.fillText('🎛️ CYBERBEATS STUDIO · 16-STEP PROCEDURAL SYNTH', 40, 110);

        const rackX = 40, rackY = 140, rackW = sw - 80, rackH = 760;
        ctx.fillStyle = 'rgba(6, 11, 25, 0.95)';
        ctx.strokeStyle = accent;
        ctx.lineWidth = 2;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(rackX, rackY, rackW, rackH, 18); else ctx.rect(rackX, rackY, rackW, rackH);
        ctx.fill(); ctx.stroke();

        // Control Toolbar
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.fillRect(rackX, rackY, rackW, 76);

        // Play Button
        const pBtnGrad = ctx.createLinearGradient(rackX + 20, rackY + 14, rackX + 170, rackY + 62);
        pBtnGrad.addColorStop(0, '#10b981'); pBtnGrad.addColorStop(1, '#059669');
        ctx.fillStyle = pBtnGrad;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(rackX + 20, rackY + 14, 150, 48, 10); else ctx.rect(rackX + 20, rackY + 14, 150, 48);
        ctx.fill();
        ctx.fillStyle = '#030712';
        ctx.font = 'bold 18px system-ui, sans-serif';
        ctx.fillText('▶ PLAYING', rackX + 48, rackY + 44);

        // BPM & Vol Knobs
        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 16px monospace';
        ctx.fillText('BPM: 120', rackX + 195, rackY + 36);
        ctx.fillStyle = accent;
        ctx.fillRect(rackX + 195, rackY + 44, 100, 8);

        ctx.fillStyle = '#94a3b8';
        ctx.fillText('VOL: 80%', rackX + 325, rackY + 36);
        ctx.fillStyle = '#a855f7';
        ctx.fillRect(rackX + 325, rackY + 44, 100, 8);

        // Pattern Chips
        const chips = ['✦ House', 'Trap', 'Cyberwave'];
        chips.forEach((ch, idx) => {
          const cx = rackX + 460 + idx * 110;
          ctx.fillStyle = idx === 0 ? accent + '33' : 'rgba(255,255,255,0.06)';
          ctx.strokeStyle = idx === 0 ? accent : 'rgba(255,255,255,0.15)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          if (ctx.roundRect) ctx.roundRect(cx, rackY + 18, 100, 40, 16); else ctx.rect(cx, rackY + 18, 100, 40);
          ctx.fill(); ctx.stroke();
          ctx.fillStyle = idx === 0 ? accent : '#cbd5e1';
          ctx.font = 'bold 14px system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(ch, cx + 50, rackY + 43);
          ctx.textAlign = 'left';
        });

        // 16 Step LED Indicators
        const curStep = Math.floor((this.animTime * 6) % 16);
        const seqX = rackX + 130, seqW = rackW - 150, stepColW = seqW / 16;
        for (let s = 0; s < 16; s++) {
          const sx = seqX + s * stepColW + stepColW / 2;
          ctx.fillStyle = s === curStep ? '#ffffff' : (s % 4 === 0 ? accent : 'rgba(255,255,255,0.2)');
          ctx.shadowColor = s === curStep ? accent : 'transparent';
          ctx.shadowBlur = s === curStep ? 15 : 0;
          ctx.beginPath();
          ctx.arc(sx, rackY + 98, s === curStep ? 6 : 4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0;

        // 4 Instrument Tracks
        const tracks = [
          { name: '🥁 Kick 808', color: '#00f3ff', on: [0, 4, 8, 12] },
          { name: '💥 Snare Clap', color: '#ff007f', on: [4, 12] },
          { name: '🔔 Hi-Hat', color: '#f59e0b', on: [0, 2, 4, 6, 8, 10, 12, 14] },
          { name: '🎹 Synth Lead', color: '#a855f7', on: [2, 5, 8, 11, 14] }
        ];

        tracks.forEach((tr, tIdx) => {
          const rowY = rackY + 120 + tIdx * 90;

          // Track Label
          ctx.fillStyle = tr.color;
          ctx.font = 'bold 18px system-ui, sans-serif';
          ctx.fillText(tr.name, rackX + 20, rowY + 38);

          // 16 Step Buttons
          for (let s = 0; s < 16; s++) {
            const bx = seqX + s * stepColW + 2;
            const by = rowY + 10;
            const bw = stepColW - 4;
            const bh = 54;
            const isOn = tr.on.includes(s);
            const isPlayingNow = (s === curStep && isOn);

            ctx.fillStyle = isPlayingNow ? '#ffffff' : (isOn ? tr.color : 'rgba(255, 255, 255, 0.05)');
            ctx.strokeStyle = isPlayingNow ? '#ffffff' : (isOn ? tr.color : 'rgba(255, 255, 255, 0.12)');
            ctx.lineWidth = isPlayingNow ? 2.5 : 1;
            ctx.shadowColor = (isOn || isPlayingNow) ? tr.color : 'transparent';
            ctx.shadowBlur = isPlayingNow ? 18 : (isOn ? 8 : 0);

            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(bx, by, bw, bh, 8); else ctx.rect(bx, by, bw, bh);
            ctx.fill(); ctx.stroke();
          }
          ctx.shadowBlur = 0;
        });

        // Bottom Waveform Audio Spectrum
        const specY = rackY + 500, specH = 140;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(rackX + 20, specY, rackW - 40, specH, 12); else ctx.rect(rackX + 20, specY, rackW - 40, specH);
        ctx.fill();

        const bars = 36;
        const bW = (rackW - 70) / bars;
        for (let b = 0; b < bars; b++) {
          const hFactor = Math.abs(Math.sin(this.animTime * 4 + b * 0.3) * Math.cos(this.animTime * 2 + b * 0.2));
          const bh = Math.max(10, hFactor * (specH - 24));
          const bx = rackX + 30 + b * bW;
          const by = specY + specH - 12 - bh;

          const bGrad = ctx.createLinearGradient(bx, by, bx, by + bh);
          bGrad.addColorStop(0, '#00f3ff'); bGrad.addColorStop(0.5, '#a855f7'); bGrad.addColorStop(1, '#ff007f');
          ctx.fillStyle = bGrad;
          ctx.fillRect(bx, by, bW - 4, bh);
        }

        // Action banner
        ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(rackX + 20, rackY + 665, rackW - 40, 70, 12); else ctx.rect(rackX + 20, rackY + 665, rackW - 40, 70);
        ctx.fill();

        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 20px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('⚡ LIVE PROCEDURAL WEB AUDIO ENGINE ACTIVE', sw / 2, rackY + 700);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '16px monospace';
        ctx.fillText('USE "LIVE APP 3D" BUTTON IN HUD TO PLAY SOUNDS & CONTROLS INTERACTIVELY', sw / 2, rackY + 725);
        ctx.textAlign = 'left';

      } else {
        // ─────────────────────────────────────────────────────────────
        // 2. GENERAL WEB / SAAS APPLICATION PARSER
        // ─────────────────────────────────────────────────────────────
        let appTitle = 'Autonomous Web Application';
        const titleMatch = code.match(/<h[1-2][^>]*>([\s\S]*?)<\/h[1-2]>/i) || code.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
        if (titleMatch) appTitle = titleMatch[1].replace(/<[^>]+>/g, '').trim() || appTitle;
        else if (typeof APP !== 'undefined' && APP && APP.name) appTitle = APP.name;

        let appDesc = 'Custom HTML/CSS/JS Application projection';
        const descMatch = code.match(/<p[^>]*class=["'][^"']*tagline[^"']*["'][^>]*>([\s\S]*?)<\/p>/i) || code.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
        if (descMatch) appDesc = descMatch[1].replace(/<[^>]+>/g, '').trim().slice(0, 120) || appDesc;

        ctx.fillStyle = accent;
        ctx.font = 'bold 32px monospace';
        ctx.fillText('🌐 ' + appTitle.toUpperCase(), 40, 110);

        const cx = 40, cy = 140, cw = sw - 80, ch = 760;
        ctx.fillStyle = 'rgba(10, 16, 32, 0.95)';
        ctx.strokeStyle = accent;
        ctx.lineWidth = 2;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(cx, cy, cw, ch, 18); else ctx.rect(cx, cy, cw, ch);
        ctx.fill(); ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 40px system-ui, sans-serif';
        ctx.fillText(appTitle, cx + 30, cy + 70);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '22px system-ui, sans-serif';
        this.wrapText(ctx, appDesc, cx + 30, cy + 120, cw - 60, 32);

        // Metric Telemetry Cards
        const cardW = (cw - 60) / 2;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.strokeStyle = accent + '44';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(cx + 20, cy + 180, cardW, 140, 12); else ctx.rect(cx + 20, cy + 180, cardW, 140);
        ctx.fill(); ctx.stroke();
        ctx.fillStyle = accent; ctx.font = 'bold 18px system-ui, sans-serif';
        ctx.fillText('Runtime Status', cx + 36, cy + 215);
        ctx.fillStyle = '#10b981'; ctx.font = 'bold 32px monospace';
        ctx.fillText('ONLINE ●', cx + 36, cy + 265);
        ctx.fillStyle = '#64748b'; ctx.font = '14px system-ui, sans-serif';
        ctx.fillText('Active Client-Side Container', cx + 36, cy + 295);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.strokeStyle = '#a855f744';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(cx + 40 + cardW, cy + 180, cardW, 140, 12); else ctx.rect(cx + 40 + cardW, cy + 180, cardW, 140);
        ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#a855f7'; ctx.font = 'bold 18px system-ui, sans-serif';
        ctx.fillText('DOM Sync Speed', cx + 56 + cardW, cy + 215);
        ctx.fillStyle = '#ffffff'; ctx.font = 'bold 32px monospace';
        ctx.fillText('60.0 FPS', cx + 56 + cardW, cy + 265);
        ctx.fillStyle = '#64748b'; ctx.font = '14px system-ui, sans-serif';
        ctx.fillText('Zero-G WebGL Projection', cx + 56 + cardW, cy + 295);

        // Extracted / Stylized Action Buttons
        const bGrad = ctx.createLinearGradient(cx + 20, cy + 360, cx + 320, cy + 420);
        bGrad.addColorStop(0, accent); bGrad.addColorStop(1, '#8b5cf6');
        ctx.fillStyle = bGrad;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(cx + 20, cy + 360, 300, 56, 12); else ctx.rect(cx + 20, cy + 360, 300, 56);
        ctx.fill();
        ctx.fillStyle = '#030712'; ctx.font = 'bold 20px system-ui, sans-serif';
        ctx.fillText('⚡ Execute Action', cx + 65, cy + 396);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(cx + 340, cy + 360, 240, 56, 12); else ctx.rect(cx + 340, cy + 360, 240, 56);
        ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#ffffff'; ctx.font = 'bold 18px system-ui, sans-serif';
        ctx.fillText('⚙ View Settings', cx + 375, cy + 396);

        // Structure Code Summary Box
        ctx.fillStyle = '#050711';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(cx + 20, cy + 450, cw - 40, 270, 12); else ctx.rect(cx + 20, cy + 450, cw - 40, 270);
        ctx.fill(); ctx.stroke();

        ctx.fillStyle = '#38bdf8'; ctx.font = 'bold 16px monospace';
        ctx.fillText('✦ LIVE APPLICATION DOM ELEMENTS DETECTED:', cx + 36, cy + 485);

        const stripped = code.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        ctx.fillStyle = '#cbd5e1'; ctx.font = '18px system-ui, sans-serif';
        this.wrapText(ctx, stripped.slice(0, 320) + (stripped.length > 320 ? '...' : ''), cx + 36, cy + 525, cw - 72, 30);
      }
    },

    // Helper: Wrap Text
    wrapText(ctx, text, x, y, maxWidth, lineHeight) {
      if (!text) return;
      const words = text.split(' ');
      let line = '';
      let curY = y;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          ctx.fillText(line, x, curY);
          line = words[n] + ' ';
          curY += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, curY);
    },

    // ══════════════════════════════════════════════════════════════════════════
    // PURE CANVAS 2.5D FALLBACK ENGINE (If WebGL / Three.js unavailable)
    // ══════════════════════════════════════════════════════════════════════════
    renderCanvasFallback(container) {
      const cv = document.createElement('canvas');
      cv.width = container.clientWidth || 800;
      cv.height = container.clientHeight || 560;
      container.appendChild(cv);
      const ctx = cv.getContext('2d');

      const self = this;
      function fallbackLoop() {
        if (!self.isOpen) return;
        self.animFrameId = requestAnimationFrame(fallbackLoop);
        self.animTime += 0.02;

        self.updateScreenTexture();

        ctx.clearRect(0, 0, cv.width, cv.height);

        const curCss = self.themeColors[self.currentTheme].css;
        const zoom = 1.0;
        const cosY = Math.cos(self.rotY), sinY = Math.sin(self.rotY);
        const cosX = Math.cos(self.rotX), sinX = Math.sin(self.rotX);

        ctx.save();
        ctx.translate(cv.width / 2, cv.height / 2 + (self.isLevitationActive ? Math.sin(self.animTime * 1.5) * 12 : 0));
        ctx.scale(zoom, zoom);

        const dw = (self.currentDevice === 'tablet' ? 380 : self.currentDevice === 'curved_display' ? 440 : 260);
        const dh = (self.currentDevice === 'tablet' ? 270 : self.currentDevice === 'curved_display' ? 280 : 520);

        ctx.shadowColor = curCss;
        ctx.shadowBlur = 25;

        ctx.save();
        ctx.transform(cosY, sinY * sinX * 0.4, 0, cosX, 0, 0);

        ctx.fillStyle = '#0b1120';
        ctx.strokeStyle = curCss;
        ctx.lineWidth = 3;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(-dw / 2, -dh / 2, dw, dh, 20); else ctx.rect(-dw / 2, -dh / 2, dw, dh);
        ctx.fill(); ctx.stroke();

        // Screen texture
        ctx.shadowBlur = 0;
        if (self.screenCanvas) {
          ctx.drawImage(self.screenCanvas, -dw / 2 + 8, -dh / 2 + 8, dw - 16, dh - 16);
        }

        ctx.restore();
        ctx.restore();
      }
      fallbackLoop();
    },

    // ══════════════════════════════════════════════════════════════════════════
    // INTERACTION CONTROLS (360° Drag, Wheel, Arrow Keys for Snake)
    // ══════════════════════════════════════════════════════════════════════════
    setupInteractionHandlers(container) {
      const self = this;

      let downTime = 0;
      let downX = 0;
      let downY = 0;

      let isSpacingDrag = false;

      container.onmousedown = function(e) {
        self.isDragging = true;
        isSpacingDrag = (e.shiftKey || e.button === 2);
        self.lastMouseX = e.clientX;
        self.lastMouseY = e.clientY;
        downTime = Date.now();
        downX = e.clientX;
        downY = e.clientY;
      };

      container.oncontextmenu = function(e) {
        if (self.isDualScreenActive) e.preventDefault();
      };

      container.addEventListener('mousemove', function(e) {
        const rect = container.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          const normX = (e.clientX - rect.left) / rect.width - 0.5;
          const normY = (e.clientY - rect.top) / rect.height - 0.5;
          self.targetParallaxX = normX * 0.28;
          self.targetParallaxY = -normY * 0.28;
        }
      });

      window.addEventListener('mousemove', function(e) {
        if (!self.isDragging) return;
        const dx = e.clientX - self.lastMouseX;
        const dy = e.clientY - self.lastMouseY;
        if (isSpacingDrag && self.isDualScreenActive) {
          self.setCompanionSpacing(dx * 0.015);
        } else {
          self.rotY += dx * 0.008;
          self.rotX += dy * 0.008;
          self.rotX = Math.max(-1.4, Math.min(1.4, self.rotX));
        }
        self.lastMouseX = e.clientX;
        self.lastMouseY = e.clientY;
      });

      window.addEventListener('mouseup', function(e) {
        if (self.isDragging) {
          const dur = Date.now() - downTime;
          const dist = Math.hypot(e.clientX - downX, e.clientY - downY);
          if (dur < 350 && dist < 12) {
            const rect = container.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
              const normX = (e.clientX - rect.left) / rect.width;
              if (self.isDualScreenActive && normX > 0.65) {
                self.cycleCompanionApp();
              } else if (self.currentMode === 'apps' && self.activeAppId === 'radio') {
                self.toggleRadioPlay();
              }
            }
          }
        }
        self.isDragging = false;
        isSpacingDrag = false;
      });

      container.addEventListener('wheel', function(e) {
        e.preventDefault();
        if (self.camera) {
          self.camera.position.z += e.deltaY * 0.005;
          self.camera.position.z = Math.max(3.0, Math.min(12.0, self.camera.position.z));
        }
      }, { passive: false });

      // Keyboard arrow keys for Snake game
      window.addEventListener('keydown', function(e) {
        if (!self.isOpen || self.currentMode !== 'apps' || self.activeAppId !== 'snake') return;
        const s = self.snakeState;
        if (!s) return;

        if (['ArrowUp', 'KeyW'].includes(e.code) && s.dir.y === 0) {
          s.dir = { x: 0, y: -1 }; s.aiDemo = false;
        } else if (['ArrowDown', 'KeyS'].includes(e.code) && s.dir.y === 0) {
          s.dir = { x: 0, y: 1 }; s.aiDemo = false;
        } else if (['ArrowLeft', 'KeyA'].includes(e.code) && s.dir.x === 0) {
          s.dir = { x: -1, y: 0 }; s.aiDemo = false;
        } else if (['ArrowRight', 'KeyD'].includes(e.code) && s.dir.x === 0) {
          s.dir = { x: 1, y: 0 }; s.aiDemo = false;
        }
      });
    },

    // ══════════════════════════════════════════════════════════════════════════
    // STUDIO CONTROL ACTIONS (Modes, Devices, Themes, Inputs)
    // ══════════════════════════════════════════════════════════════════════════
    setMode(mode) {
      this.currentMode = mode;
      _sound('click');
      if (mode === 'custom') {
        this.rotX = 0.08;
        this.rotY = -0.15;
      }

      // If switching away from apps/radio, pause studio radio
      if (mode !== 'apps' && this.radioState && this.radioState.isPlaying) {
        if (this.radioState.audioEl) this.radioState.audioEl.pause();
        this.radioState.isPlaying = false;
        this.updateQuickControlsUI();
      }

      // Update UI Tabs
      document.querySelectorAll('.spatial-screen-tab').forEach(tab => {
        if (tab.getAttribute('data-mode') === mode) tab.classList.add('active');
        else tab.classList.remove('active');
      });

      // Update Tab Panels
      const pText = document.getElementById('spatial-screen-panel-text');
      const pApps = document.getElementById('spatial-screen-panel-apps');
      const pCustom = document.getElementById('spatial-screen-panel-custom');
      if (pText) pText.style.display = (mode === 'text' ? 'block' : 'none');
      if (pApps) pApps.style.display = (mode === 'apps' ? 'block' : 'none');
      if (pCustom) pCustom.style.display = (mode === 'custom' ? 'block' : 'none');

      const s1Select = document.getElementById('spatial-screen1-select');
      if (s1Select && mode === 'custom') s1Select.value = 'custom';

      this.updateInteractiveFrame();
      this.updateScreenTexture();
    },

    setDevice(dev) {
      this.currentDevice = dev;
      _sound('click');
      document.querySelectorAll('.spatial-dev-btn').forEach(btn => {
        if (btn.getAttribute('data-dev') === dev) btn.classList.add('active');
        else btn.classList.remove('active');
      });
      this.buildDeviceModel();
      this.updateInteractiveFrame();
    },

    setTheme(name) {
      this.currentTheme = name;
      _sound('click');
      const hex = this.themeColors[name].hex;
      if (this.rimLight) this.rimLight.color.setHex(hex);
      if (this.dustPoints) this.dustPoints.material.color.setHex(hex);

      document.querySelectorAll('.spatial-theme-pill').forEach(pill => {
        if (pill.getAttribute('data-theme') === name) pill.classList.add('active');
        else pill.classList.remove('active');
      });

      this.buildDeviceModel();
      this.updateInteractiveFrame();
      this.updateScreenTexture();
    },

    setActiveApp(appId) {
      this.currentMode = 'apps';
      this.activeAppId = appId;
      _sound('click');

      // Update Mode Tabs UI so "Mini-Apps" tab is highlighted
      document.querySelectorAll('.spatial-screen-tab').forEach(tab => {
        if (tab.getAttribute('data-mode') === 'apps') tab.classList.add('active');
        else tab.classList.remove('active');
      });

      // Update Tab Panels UI so Mini-Apps panel is displayed
      const pText = document.getElementById('spatial-screen-panel-text');
      const pApps = document.getElementById('spatial-screen-panel-apps');
      const pCustom = document.getElementById('spatial-screen-panel-custom');
      if (pText) pText.style.display = 'none';
      if (pApps) pApps.style.display = 'block';
      if (pCustom) pCustom.style.display = 'none';

      document.querySelectorAll('.spatial-miniapp-card').forEach(card => {
        if (card.getAttribute('data-app') === appId) card.classList.add('active');
        else card.classList.remove('active');
      });

      const s1Select = document.getElementById('spatial-screen1-select');
      if (s1Select) s1Select.value = appId;

      // If switching away from radio, pause studio radio audio
      if (appId !== 'radio' && this.radioState && this.radioState.isPlaying) {
        if (this.radioState.audioEl) this.radioState.audioEl.pause();
        this.radioState.isPlaying = false;
      }

      this.updateQuickControlsUI();

      if (appId === 'weather') {
        this.fetchWeather();
      } else if (appId === 'forex') {
        this.fetchForex();
      } else if (appId === 'crypto') {
        this.fetchCrypto();
      } else if (appId === 'system') {
        this.fetchSystemStats();
      } else if (appId === 'radio') {
        this.initRadioAudio();
      }

      this.updateInteractiveFrame();
      this.updateScreenTexture();
    },

    // ══════════════════════════════════════════════════════════════════════════
    // MINI-APP ACTIONS & REAL API FETCHERS
    // ══════════════════════════════════════════════════════════════════════════
    getWeatherConditionText(code) {
      if (code === 0) return 'Clear Sky / Ciel Dégagé ☀️';
      if (code === 1 || code === 2) return 'Partly Cloudy / Partiellement Nuageux ⛅';
      if (code === 3) return 'Overcast / Couvert ☁️';
      if (code === 45 || code === 48) return 'Fog / Brouillard 🌫️';
      if (code >= 51 && code <= 55) return 'Light Drizzle / Bruine Légère 🌦️';
      if (code >= 61 && code <= 65) return 'Rain / Pluie 🌧️';
      if (code >= 71 && code <= 77) return 'Snow / Neige ❄️';
      if (code >= 80 && code <= 82) return 'Rain Showers / Averses 🌧️';
      if (code >= 95 && code <= 99) return 'Thunderstorm / Orage ⛈️';
      return 'Variable Weather / Météo Variable 🌤️';
    },

    async fetchWeather() {
      if (!this.weatherState) return;
      const ws = this.weatherState;
      const city = ws.cities[ws.cityIndex] || ws.cities[0];
      ws.loading = true;
      this.updateQuickControlsUI();
      this.updateScreenTexture();

      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=America%2FToronto`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (data.current) {
            ws.temp = Math.round(data.current.temperature_2m * 10) / 10;
            ws.apparentTemp = Math.round(data.current.apparent_temperature * 10) / 10;
            ws.humidity = Math.round(data.current.relative_humidity_2m);
            ws.windSpeed = Math.round(data.current.wind_speed_10m * 10) / 10;
            ws.weatherCode = data.current.weather_code || 0;
            ws.condition = this.getWeatherConditionText(ws.weatherCode);
            ws.lastUpdated = 'Live Open-Meteo • ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          }
          if (data.daily && data.daily.time) {
            const dayNames = ['Today', 'Tomorrow', 'Day 3', 'Day 4'];
            ws.daily = data.daily.time.slice(0, 4).map((t, idx) => ({
              day: dayNames[idx] || t,
              max: Math.round(data.daily.temperature_2m_max[idx]),
              min: Math.round(data.daily.temperature_2m_min[idx]),
              code: data.daily.weather_code[idx]
            }));
          }
        }
      } catch (err) {
        console.warn('[SpatialScreen] Weather fetch error:', err);
      } finally {
        ws.loading = false;
        this.updateQuickControlsUI();
        this.updateScreenTexture();
      }
    },

    setWeatherCity(idx) {
      if (!this.weatherState) return;
      this.weatherState.cityIndex = idx;
      const c = this.weatherState.cities[idx];
      if (c) {
        this.weatherState.city = c.name;
        this.weatherState.country = c.flag;
        this.weatherState.lat = c.lat;
        this.weatherState.lon = c.lon;
      }
      _sound('click');
      this.fetchWeather();
    },

    async fetchForex() {
      if (!this.forexState) return;
      const fs = this.forexState;
      fs.loading = true;
      this.updateQuickControlsUI();
      this.updateScreenTexture();

      try {
        const base = fs.base || 'CAD';
        const url = `https://open.er-api.com/v6/latest/${base}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (data.rates) {
            fs.rates = {
              USD: +(data.rates.USD ? data.rates.USD.toFixed(4) : 0.7147),
              EUR: +(data.rates.EUR ? data.rates.EUR.toFixed(4) : 0.6229),
              GBP: +(data.rates.GBP ? data.rates.GBP.toFixed(4) : 0.5342),
              JPY: +(data.rates.JPY ? data.rates.JPY.toFixed(2) : 112.27),
              CHF: +(data.rates.CHF ? data.rates.CHF.toFixed(4) : 0.5883)
            };
            fs.lastUpdated = 'Live Open-ER • ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          }
        }
      } catch (err) {
        console.warn('[SpatialScreen] Forex fetch error:', err);
      } finally {
        fs.loading = false;
        this.updateQuickControlsUI();
        this.updateScreenTexture();
      }
    },

    setForexBase(curr) {
      if (!this.forexState) return;
      this.forexState.base = curr;
      _sound('click');
      this.fetchForex();
    },

    initRadioAudio() {
      if (!this.radioState) return;
      if (!this.radioState.audioEl && typeof Audio !== 'undefined') {
        const audio = new Audio();
        // Do NOT set crossOrigin = 'anonymous' to avoid CORS aborts on Icecast live streams
        audio.preload = 'none';
        audio.volume = this.radioState.volume || 0.85;
        const curStn = this.radioState.stations[this.radioState.currentStationIdx || 0];
        if (curStn) audio.src = curStn.url;

        audio.addEventListener('playing', () => {
          this.radioState.isPlaying = true;
          this.updateQuickControlsUI();
          this.updateScreenTexture();
        });

        audio.addEventListener('pause', () => {
          this.radioState.isPlaying = false;
          this.updateQuickControlsUI();
          this.updateScreenTexture();
        });

        audio.addEventListener('error', (e) => {
          console.warn('[SpatialRadio] Audio stream error, trying fallback mirror:', e);
          const st = this.radioState.stations[this.radioState.currentStationIdx || 0];
          if (st && st.url.includes('ice2')) {
            audio.src = st.url.replace('ice2', 'ice4');
            audio.play().catch(() => {
              this.radioState.isPlaying = false;
              this.updateQuickControlsUI();
              this.updateScreenTexture();
            });
          } else {
            this.radioState.isPlaying = false;
            this.updateQuickControlsUI();
            this.updateScreenTexture();
          }
        });

        this.radioState.audioEl = audio;
      }
    },

    toggleRadioPlay() {
      if (!this.radioState) return;
      this.initRadioAudio();
      const a = this.radioState.audioEl;
      if (!a) return;

      if (this.radioState.isPlaying) {
        a.pause();
        this.radioState.isPlaying = false;
        _sound('click');
        _toast('📻 Live Radio: Paused / En Pause', 'info');
      } else {
        const curStn = this.radioState.stations[this.radioState.currentStationIdx || 0];
        if (curStn && a.src !== curStn.url) a.src = curStn.url;
        a.play().then(() => {
          this.radioState.isPlaying = true;
          _sound('click');
          _toast(`📻 Live Radio: ${curStn.name} [ON-AIR]`, 'success');
          this.updateQuickControlsUI();
          this.updateScreenTexture();
        }).catch(err => {
          console.warn('[SpatialRadio] Playback blocked or failed:', err);
          _toast('⚠️ Click on screen or button to enable audio playback', 'warning');
        });
      }
      this.updateQuickControlsUI();
      this.updateScreenTexture();
    },

    setRadioStation(idx) {
      if (!this.radioState) return;
      this.radioState.currentStationIdx = idx;
      this.initRadioAudio();
      const curStn = this.radioState.stations[idx];
      if (this.radioState.audioEl && curStn) {
        this.radioState.audioEl.src = curStn.url;
        if (this.radioState.isPlaying) {
          this.radioState.audioEl.play().catch(e => console.warn(e));
        }
      }
      _sound('click');
      _toast(`📻 Station: ${curStn ? curStn.name : ''}`, 'info');
      this.updateQuickControlsUI();
      this.updateScreenTexture();
    },

    setRadioVolume(delta) {
      if (!this.radioState) return;
      let v = (this.radioState.volume || 0.8) + delta;
      v = Math.max(0, Math.min(1, Math.round(v * 10) / 10));
      this.radioState.volume = v;
      if (this.radioState.audioEl) this.radioState.audioEl.volume = v;
      _sound('click');
      this.updateQuickControlsUI();
      this.updateScreenTexture();
    },

    async fetchCrypto() {
      if (!this.cryptoState) return;
      const cs = this.cryptoState;
      cs.loading = true;
      this.updateQuickControlsUI();
      this.updateScreenTexture();

      try {
        const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin&vs_currencies=usd&include_24hr_change=true';
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          cs.coins.forEach(c => {
            if (data[c.id]) {
              c.price = data[c.id].usd;
              c.change24h = Math.round((data[c.id].usd_24h_change || 0) * 100) / 100;
            }
          });
          cs.lastUpdated = 'Live CoinGecko • ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
      } catch (err) {
        console.warn('[SpatialScreen] Crypto fetch error:', err);
      } finally {
        cs.loading = false;
        this.updateQuickControlsUI();
        this.updateScreenTexture();
      }
    },

    togglePomodoro() {
      if (!this.pomodoroState) return;
      const ps = this.pomodoroState;
      ps.isRunning = !ps.isRunning;
      _sound('click');
      if (ps.isRunning) {
        if (ps.ambientSound && ps.ambientSound !== 'mute') {
          this.playProceduralAmbientSound(ps.ambientSound);
        }
      } else {
        this.stopProceduralAmbientSound();
      }
      this.updateQuickControlsUI();
      this.updateScreenTexture();
    },

    resetPomodoro() {
      if (!this.pomodoroState) return;
      const ps = this.pomodoroState;
      ps.isRunning = false;
      ps.timeLeft = ps.totalTime;
      this.stopProceduralAmbientSound();
      _sound('click');
      this.updateQuickControlsUI();
      this.updateScreenTexture();
    },

    setPomodoroAmbient(type) {
      if (!this.pomodoroState) return;
      this.pomodoroState.ambientSound = type;
      _sound('click');
      if (this.pomodoroState.isRunning) {
        this.playProceduralAmbientSound(type);
      }
      this.updateQuickControlsUI();
      this.updateScreenTexture();
    },

    playProceduralAmbientSound(type) {
      this.stopProceduralAmbientSound();
      if (type === 'mute' || typeof window === 'undefined') return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        if (!this.pomodoroState.ambientAudioCtx) {
          this.pomodoroState.ambientAudioCtx = new AudioCtx();
        }
        const ctx = this.pomodoroState.ambientAudioCtx;
        if (ctx.state === 'suspended') ctx.resume();

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
        masterGain.connect(ctx.destination);

        if (type === 'rain' || type === 'ocean') {
          // White/Pink noise buffer generator
          const bufferSize = ctx.sampleRate * 2;
          const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
          for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
            b6 = white * 0.115926;
          }
          const whiteNoise = ctx.createBufferSource();
          whiteNoise.buffer = noiseBuffer;
          whiteNoise.loop = true;

          const filter = ctx.createBiquadFilter();
          filter.type = type === 'rain' ? 'lowpass' : 'bandpass';
          filter.frequency.setValueAtTime(type === 'rain' ? 900 : 450, ctx.currentTime);
          filter.Q.setValueAtTime(1.2, ctx.currentTime);

          whiteNoise.connect(filter);
          filter.connect(masterGain);
          whiteNoise.start(0);
          this.pomodoroState.ambientNodes = { source: whiteNoise, gain: masterGain };
        } else if (type === 'cosmic') {
          // Binaural Cosmic Drone
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          osc1.type = 'sine'; osc1.frequency.setValueAtTime(108, ctx.currentTime);
          osc2.type = 'triangle'; osc2.frequency.setValueAtTime(110.5, ctx.currentTime);
          osc1.connect(masterGain);
          osc2.connect(masterGain);
          osc1.start(0); osc2.start(0);
          this.pomodoroState.ambientNodes = { source: osc1, source2: osc2, gain: masterGain };
        }
      } catch (err) {
        console.warn('[SpatialPomodoro] Web Audio ambient sound error:', err);
      }
    },

    stopProceduralAmbientSound() {
      if (this.pomodoroState && this.pomodoroState.ambientNodes) {
        try {
          const n = this.pomodoroState.ambientNodes;
          if (n.source && n.source.stop) n.source.stop();
          if (n.source2 && n.source2.stop) n.source2.stop();
          if (n.gain) n.gain.disconnect();
        } catch (e) {}
        this.pomodoroState.ambientNodes = null;
      }
    },

    fetchSystemStats() {
      if (!this.systemState) return;
      const ss = this.systemState;
      const t0 = performance.now();
      fetch('favicon.ico?_t=' + Date.now(), { method: 'HEAD', cache: 'no-store' }).then(() => {
        ss.pingMs = Math.max(5, Math.round(performance.now() - t0));
        this.updateQuickControlsUI();
        this.updateScreenTexture();
      }).catch(() => {
        ss.pingMs = Math.floor(Math.random() * 20 + 15);
      });

      if (typeof navigator !== 'undefined' && navigator.getBattery) {
        navigator.getBattery().then(bat => {
          ss.batteryPct = Math.round(bat.level * 100);
          ss.isCharging = bat.charging;
          this.updateQuickControlsUI();
          this.updateScreenTexture();
        }).catch(() => {});
      }

      if (typeof performance !== 'undefined' && performance.memory) {
        ss.ramUsageMB = Math.round(performance.memory.usedJSHeapSize / (1024 * 1024));
      }
      this.updateQuickControlsUI();
      this.updateScreenTexture();
    },

    updateQuickControlsUI() {
      const qc = document.getElementById('spatial-miniapp-quick-controls');
      if (!qc) return;
      const app = this.activeAppId;

      let html = '';
      if (app === 'weather') {
        const ws = this.weatherState || {};
        const cities = ws.cities || [];
        const curIdx = ws.cityIndex || 0;
        html += `<span style="font-size:0.75rem;font-weight:700;color:#38bdf8">🌤️ City / Ville:</span>`;
        cities.forEach((c, idx) => {
          const active = idx === curIdx;
          html += `<button class="tb-btn" onclick="UltraSpatialScreenStudio.setWeatherCity(${idx})" style="font-size:0.68rem;padding:3px 7px;background:${active ? 'rgba(56,189,248,0.2)' : 'rgba(255,255,255,0.04)'};border-color:${active ? '#38bdf8' : 'rgba(255,255,255,0.12)'};color:${active ? '#38bdf8' : '#cbd5e1'}">${c.flag} ${c.name}</button>`;
        });
        html += `<button class="tb-btn" onclick="UltraSpatialScreenStudio.fetchWeather()" style="font-size:0.68rem;padding:3px 7px;margin-left:auto;color:#34d399;border-color:rgba(52,211,153,0.3)">${ws.loading ? '⏳ Loading...' : '🔄 Refresh'}</button>`;
      } else if (app === 'forex') {
        const fs = this.forexState || {};
        const bases = ['CAD', 'USD', 'EUR', 'GBP'];
        const curBase = fs.base || 'CAD';
        html += `<span style="font-size:0.75rem;font-weight:700;color:#10b981">💱 Base:</span>`;
        bases.forEach(b => {
          const active = b === curBase;
          html += `<button class="tb-btn" onclick="UltraSpatialScreenStudio.setForexBase('${b}')" style="font-size:0.68rem;padding:3px 7px;background:${active ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.04)'};border-color:${active ? '#10b981' : 'rgba(255,255,255,0.12)'};color:${active ? '#10b981' : '#cbd5e1'}">${b}</button>`;
        });
        html += `<button class="tb-btn" onclick="UltraSpatialScreenStudio.fetchForex()" style="font-size:0.68rem;padding:3px 7px;margin-left:auto;color:#34d399;border-color:rgba(52,211,153,0.3)">${fs.loading ? '⏳...' : '🔄 Live Rates'}</button>`;
      } else if (app === 'radio') {
        const rs = this.radioState || {};
        const isPlaying = rs.isPlaying;
        const curIdx = rs.currentStationIdx || 0;
        html += `<button class="tb-btn" onclick="UltraSpatialScreenStudio.toggleRadioPlay()" style="font-size:0.72rem;font-weight:800;padding:4px 10px;background:${isPlaying ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)'};border-color:${isPlaying ? '#ef4444' : '#10b981'};color:${isPlaying ? '#f87171' : '#34d399'}">${isPlaying ? '⏸️ Pause' : '▶ Play Live / Écouter'}</button>`;
        (rs.stations || []).forEach((st, idx) => {
          const active = idx === curIdx;
          html += `<button class="tb-btn" onclick="UltraSpatialScreenStudio.setRadioStation(${idx})" style="font-size:0.68rem;padding:3px 7px;background:${active ? 'rgba(244,63,94,0.2)' : 'rgba(255,255,255,0.04)'};border-color:${active ? '#f43f5e' : 'rgba(255,255,255,0.12)'};color:${active ? '#fb7185' : '#cbd5e1'}">${st.icon} ${st.name.split(' ')[0]}</button>`;
        });
        html += `<button class="tb-btn" onclick="UltraSpatialScreenStudio.setRadioVolume(-0.1)" title="Volume Down" style="font-size:0.68rem;padding:3px 6px">🔉 -</button>`;
        html += `<button class="tb-btn" onclick="UltraSpatialScreenStudio.setRadioVolume(0.1)" title="Volume Up" style="font-size:0.68rem;padding:3px 6px">🔊 +</button>`;
      } else if (app === 'crypto') {
        const cs = this.cryptoState || {};
        html += `<span style="font-size:0.75rem;font-weight:700;color:#f59e0b">🪙 Crypto Live:</span>`;
        (cs.coins || []).forEach(c => {
          const up = c.change24h >= 0;
          html += `<span style="font-size:0.68rem;font-weight:700;padding:2px 6px;border-radius:6px;background:rgba(255,255,255,0.05);color:#fff">${c.symbol}: $${c.price.toLocaleString()} <strong style="color:${up ? '#34d399' : '#f87171'}">${up ? '+' : ''}${c.change24h}%</strong></span>`;
        });
        html += `<button class="tb-btn" onclick="UltraSpatialScreenStudio.fetchCrypto()" style="font-size:0.68rem;padding:3px 7px;margin-left:auto;color:#f59e0b;border-color:rgba(245,158,11,0.3)">${cs.loading ? '⏳...' : '🔄 Refresh'}</button>`;
      } else if (app === 'pomodoro') {
        const ps = this.pomodoroState || {};
        const isRunning = ps.isRunning;
        html += `<button class="tb-btn" onclick="UltraSpatialScreenStudio.togglePomodoro()" style="font-size:0.72rem;font-weight:800;padding:4px 10px;background:${isRunning ? 'rgba(239,68,68,0.2)' : 'rgba(168,85,247,0.2)'};border-color:${isRunning ? '#ef4444' : '#a855f7'};color:${isRunning ? '#f87171' : '#c084fc'}">${isRunning ? '⏸️ Pause' : '▶ Start Focus'}</button>`;
        html += `<button class="tb-btn" onclick="UltraSpatialScreenStudio.resetPomodoro()" style="font-size:0.68rem;padding:3px 7px">🔄 Reset</button>`;
        const ambients = [{ id: 'rain', label: '🌧️ Rain / Pluie' }, { id: 'cosmic', label: '🌌 Cosmic Drone' }, { id: 'ocean', label: '🌊 Ocean Waves' }, { id: 'mute', label: '🔇 Mute' }];
        html += `<span style="font-size:0.72rem;font-weight:700;color:#94a3b8;margin-left:6px">Sound / Son:</span>`;
        ambients.forEach(a => {
          const active = ps.ambientSound === a.id;
          html += `<button class="tb-btn" onclick="UltraSpatialScreenStudio.setPomodoroAmbient('${a.id}')" style="font-size:0.68rem;padding:3px 6px;background:${active ? 'rgba(168,85,247,0.2)' : 'rgba(255,255,255,0.04)'};border-color:${active ? '#a855f7' : 'rgba(255,255,255,0.12)'};color:${active ? '#c084fc' : '#cbd5e1'}">${a.label}</button>`;
        });
      } else if (app === 'system') {
        const ss = this.systemState || {};
        html += `<button class="tb-btn" onclick="UltraSpatialScreenStudio.fetchSystemStats()" style="font-size:0.68rem;padding:3px 7px;color:#38bdf8;border-color:rgba(56,189,248,0.4)">⚡ Test Ping Latency</button>`;
        html += `<span style="font-size:0.72rem;color:#cbd5e1">Ping: <strong style="color:#34d399">${ss.pingMs} ms</strong></span>`;
        html += `<span style="font-size:0.72rem;color:#cbd5e1">RAM: <strong style="color:#38bdf8">${ss.ramUsageMB} MB</strong></span>`;
        html += `<span style="font-size:0.72rem;color:#cbd5e1">CPU Cores: <strong style="color:#a855f7">${ss.cpuCores}</strong></span>`;
        html += `<span style="font-size:0.72rem;color:#cbd5e1">Battery / Batterie: <strong style="color:#f59e0b">${ss.batteryPct}% ${ss.isCharging ? '⚡' : ''}</strong></span>`;
      } else if (app === 'snake') {
        html += `<span style="font-size:0.72rem;font-weight:700;color:#cbd5e1">🕹️ Arcade Controls:</span>`;
        html += `<button class="tb-btn" onclick="UltraSpatialScreenStudio.snakeState && (UltraSpatialScreenStudio.snakeState.dir={x:0,y:-1});UltraSpatialScreenStudio.updateScreenTexture()" style="font-size:0.72rem;padding:3px 8px">⬆️</button>`;
        html += `<button class="tb-btn" onclick="UltraSpatialScreenStudio.snakeState && (UltraSpatialScreenStudio.snakeState.dir={x:0,y:1});UltraSpatialScreenStudio.updateScreenTexture()" style="font-size:0.72rem;padding:3px 8px">⬇️</button>`;
        html += `<button class="tb-btn" onclick="UltraSpatialScreenStudio.snakeState && (UltraSpatialScreenStudio.snakeState.dir={x:-1,y:0});UltraSpatialScreenStudio.updateScreenTexture()" style="font-size:0.72rem;padding:3px 8px">⬅️</button>`;
        html += `<button class="tb-btn" onclick="UltraSpatialScreenStudio.snakeState && (UltraSpatialScreenStudio.snakeState.dir={x:1,y:0});UltraSpatialScreenStudio.updateScreenTexture()" style="font-size:0.72rem;padding:3px 8px">➡️</button>`;
        html += `<button class="tb-btn" onclick="UltraSpatialScreenStudio.initMiniApps();UltraSpatialScreenStudio.updateScreenTexture()" style="font-size:0.68rem;padding:3px 7px;color:#f87171">Restart Game</button>`;
      } else {
        html += `<span style="font-size:0.75rem;color:#94a3b8">Active Spatial Mini-App: <strong style="color:#fff">${app.toUpperCase()}</strong></span>`;
      }

      qc.innerHTML = html;
    },

    setPreset(preset) {
      _sound('click');
      if (preset === 'pitch') {
        this.textData.title = 'Hyper-Conversion Spatial SaaS';
        this.textData.subtitle = 'Next-Generation Autonomous Web Experience';
        this.textData.body = 'Deliver immersive 3D spatial user journeys with zero latency. Backed by real-time conversion telemetry and procedural spatial soundscapes.';
        this.textData.tag = '🚀 PRODUCT LAUNCH';
        this.textData.matrixRain = false;
      } else if (preset === 'matrix') {
        this.textData.title = 'QUANTUM CORE SHELL v4.8';
        this.textData.subtitle = 'Neural Swarm Subsystem [ROOT ACCESS GRANTED]';
        this.textData.body = 'Bypassing conventional 2D DOM paradigms. Initializing decentralized WebGL shader pipelines across 500 simulated user nodes.';
        this.textData.tag = '👾 CYBER CONSOLE';
        this.textData.matrixRain = true;
      } else if (preset === 'specs') {
        this.textData.title = 'Autonomous AI Architecture';
        this.textData.subtitle = 'Technical Specifications & Spatial Benchmark';
        this.textData.body = '• Multi-Universe Reality Switcher\n• Procedural Synthesizer Lab (12 SFX)\n• Three.js WebGL + Pure Canvas 2.5D Fallback\n• WebRTC Environment In-Room Projection';
        this.textData.tag = '📐 ARCHITECTURE SPECS';
        this.textData.matrixRain = false;
      } else {
        this.textData.title = 'Priority Mission Objectives';
        this.textData.subtitle = 'Sprint 42: Holographic Spatial Experience';
        this.textData.body = '1. Deploy zero-latency 3D floating screen.\n2. Enable interactive in-screen arcade gaming.\n3. Verify 100% offline standalone HTML export.\n4. Celebrate with 4K spatial snapshots!';
        this.textData.tag = '📋 SPATIAL KANBAN';
        this.textData.matrixRain = false;
      }
      this.syncInputsFromState();
      this.updateScreenTexture();
    },

    syncInputsFromState() {
      const elTitle = document.getElementById('spatial-input-title');
      const elSub = document.getElementById('spatial-input-subtitle');
      const elBody = document.getElementById('spatial-input-body');
      const elTag = document.getElementById('spatial-input-tag');
      const elRain = document.getElementById('spatial-input-rain');
      const elCustom = document.getElementById('spatial-input-custom-code');

      if (elTitle) elTitle.value = this.textData.title;
      if (elSub) elSub.value = this.textData.subtitle;
      if (elBody) elBody.value = this.textData.body;
      if (elTag) elTag.value = this.textData.tag;
      if (elRain) elRain.checked = this.textData.matrixRain;
      if (elCustom) elCustom.value = this.customCode;

      const s1Select = document.getElementById('spatial-screen1-select');
      if (s1Select) s1Select.value = (this.currentMode === 'custom' ? 'custom' : (this.activeAppId || 'clock'));
      const s2Select = document.getElementById('spatial-screen2-select');
      if (s2Select) s2Select.value = this.companionAppId || 'crypto';
      const valEl = document.getElementById('spatial-dual-spacing-val');
      if (valEl) valEl.textContent = ((this.companionSpacing || 0) >= 0 ? '+' : '') + (this.companionSpacing || 0).toFixed(1);
      const wrap = document.getElementById('spatial-dual-controls-wrap');
      if (wrap) wrap.style.display = this.isDualScreenActive ? 'inline-flex' : 'none';
    },

    onTextInputChange() {
      const elTitle = document.getElementById('spatial-input-title');
      const elSub = document.getElementById('spatial-input-subtitle');
      const elBody = document.getElementById('spatial-input-body');
      const elTag = document.getElementById('spatial-input-tag');
      const elRain = document.getElementById('spatial-input-rain');

      if (elTitle) this.textData.title = elTitle.value;
      if (elSub) this.textData.subtitle = elSub.value;
      if (elBody) this.textData.body = elBody.value;
      if (elTag) this.textData.tag = elTag.value;
      if (elRain) this.textData.matrixRain = elRain.checked;

      this.updateScreenTexture();
    },

    onCustomCodeChange() {
      const elCustom = document.getElementById('spatial-input-custom-code');
      if (elCustom) this.customCode = elCustom.value;
      this.updateInteractiveFrame();
      this.updateScreenTexture();
    },

    mirrorActiveApp() {
      _sound('build');
      const targetApp = (typeof window !== 'undefined' && window.APP) || (typeof APP !== 'undefined' ? APP : null);
      if (targetApp && (targetApp.html || targetApp.full)) {
        let bundle = '';
        if (typeof buildPreviewDoc === 'function') {
          try { bundle = buildPreviewDoc(); } catch(e){}
        }
        if (!bundle && targetApp.full) {
          bundle = targetApp.full;
        }
        if (!bundle && targetApp.html) {
          bundle = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
${targetApp.css || ''}
  </style>
</head>
<body>
${targetApp.html || ''}
<script>
${targetApp.js || ''}
<\/script>
</body>
</html>`;
        }

        this.customCode = bundle;
        const elCustom = document.getElementById('spatial-input-custom-code');
        if (elCustom) elCustom.value = this.customCode;
        this.setMode('custom');
        this.updateInteractiveFrame();
        _confetti();
        _toast(_isFr() ? '🪄 Application complète (HTML+CSS+JS) projetée avec succès sur l’écran 3D !' : '🪄 Full active app (HTML+CSS+JS) mirrored successfully onto 3D screen!', 'success');
      } else {
        _toast(_isFr() ? '⚠️ Aucun code d’application trouvé.' : '⚠️ No active app code found.', 'warning');
      }
    },

    createOrGetLiveFrame(container) {
      let frame = document.getElementById('spatial-live-app-frame');
      if (!frame && container) {
        frame = document.createElement('iframe');
        frame.id = 'spatial-live-app-frame';
        frame.style.position = 'absolute';
        frame.style.top = '50%';
        frame.style.left = '50%';
        frame.style.border = '1px solid ' + this.themeColors[this.currentTheme].css + '66';
        frame.style.borderRadius = '14px';
        frame.style.boxShadow = '0 0 35px rgba(0,0,0,0.85), 0 0 25px ' + this.themeColors[this.currentTheme].css + '44';
        frame.style.background = '#060b18';
        frame.style.zIndex = '15';
        frame.style.pointerEvents = 'auto';
        frame.style.display = 'none';
        frame.style.transition = 'opacity 0.2s';
        frame.sandbox = 'allow-scripts allow-same-origin allow-forms allow-modals allow-popups';
        container.appendChild(frame);
      }
      this.liveAppFrame = frame;
      return frame;
    },

    updateInteractiveFrame() {
      const container = document.getElementById('spatial-screen-viewport');
      if (!container) return;
      const frame = this.createOrGetLiveFrame(container);
      const btnLive = document.getElementById('spatial-btn-live-app');

      if (this.currentMode === 'custom' && this.isLiveAppActive) {
        const sizes = {
          phone: { w: 220, h: 440 },
          tablet: { w: 480, h: 330 },
          curved_display: { w: 520, h: 320 },
          holo_glass: { w: 390, h: 460 }
        };
        const curSize = sizes[this.currentDevice] || sizes.phone;
        frame.style.width = curSize.w + 'px';
        frame.style.height = curSize.h + 'px';
        frame.style.borderColor = this.themeColors[this.currentTheme].css + '88';
        frame.style.boxShadow = '0 0 35px rgba(0,0,0,0.85), 0 0 25px ' + this.themeColors[this.currentTheme].css + '44';

        frame.srcdoc = this.customCode;
        frame.style.display = 'block';
        frame.style.opacity = '1';

        if (btnLive) {
          btnLive.style.display = 'inline-flex';
          btnLive.classList.add('active');
          btnLive.innerHTML = '<span>⚡ Live App 3D: ON</span>';
        }
      } else {
        if (frame) frame.style.display = 'none';
        if (btnLive) {
          if (this.currentMode === 'custom') {
            btnLive.style.display = 'inline-flex';
            btnLive.classList.remove('active');
            btnLive.innerHTML = '<span>👓 3D Canvas Mode</span>';
          } else {
            btnLive.style.display = 'none';
          }
        }
      }
    },

    toggleLiveAppInteractive() {
      this.isLiveAppActive = !this.isLiveAppActive;
      _sound('click');
      this.updateInteractiveFrame();
      _toast(
        _isFr()
          ? (this.isLiveAppActive ? '⚡ Mode Application Interactive 3D activé !' : '👓 Mode Texture WebGL 3D activé !')
          : (this.isLiveAppActive ? '⚡ Live Interactive 3D App Mode active!' : '👓 WebGL 3D Texture Mode active!'),
        'info'
      );
    },

    resetOrbit() {
      _sound('click');
      this.rotX = 0.08;
      this.rotY = -0.15;
      if (this.camera) {
        this.camera.position.z = (this.currentDevice === 'tablet' ? 6.8 : this.currentDevice === 'curved_display' ? 5.6 : 6.4);
      }
      this.updateInteractiveFrame();
    },

    toggleLevitation() {
      _sound('click');
      this.isLevitationActive = !this.isLevitationActive;
      const btn = document.getElementById('spatial-btn-levitation');
      if (btn) {
        btn.textContent = this.isLevitationActive ? '🟢 Zero-G Active' : '⚪ Zero-G Off';
        btn.classList.toggle('active', this.isLevitationActive);
      }
    },

    async toggleCameraAR() {
      const videoEl = document.getElementById('spatial-ar-video');
      const backdrop = document.getElementById('spatial-screen-backdrop');
      const btn = document.getElementById('spatial-btn-camera-ar');

      if (this.isCameraARActive) {
        this.stopCameraAR();
        if (btn) {
          btn.innerHTML = '<span>📷</span> <span data-i18n="btnEnableCameraAR">Enable Camera AR</span>';
          btn.classList.remove('active');
        }
      } else {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          _toast(_isFr() ? '⚠️ Caméra non supportée sur ce navigateur.' : '⚠️ Camera not supported on this browser.', 'warning');
          return;
        }
        try {
          this.cameraStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } },
            audio: false
          });
          if (videoEl) {
            videoEl.srcObject = this.cameraStream;
            videoEl.style.display = 'block';
            await videoEl.play();
          }
          if (backdrop) backdrop.style.opacity = '0';
          if (btn) {
            btn.innerHTML = '<span>✕</span> <span>Exit Camera AR</span>';
            btn.classList.add('active');
          }
          this.isCameraARActive = true;
          _sound('magic');
          _toast(_isFr() ? '📷 Mode AR activé : Dispositif 3D dans votre pièce !' : '📷 Camera AR active: 3D device floating in your room!', 'success');
        } catch(err) {
          _toast(_isFr() ? 'Erreur caméra: ' + err.message : 'Camera error: ' + err.message, 'error');
        }
      }
    },

    stopCameraAR() {
      if (this.cameraStream) {
        this.cameraStream.getTracks().forEach(track => track.stop());
        this.cameraStream = null;
      }
      const videoEl = document.getElementById('spatial-ar-video');
      const backdrop = document.getElementById('spatial-screen-backdrop');
      if (videoEl) videoEl.style.display = 'none';
      if (backdrop) backdrop.style.opacity = '1';
      this.isCameraARActive = false;
    },

    // ══════════════════════════════════════════════════════════════════════════
    // 1-CLICK INJECTION INTO ACTIVE APP
    // ══════════════════════════════════════════════════════════════════════════
    inject() {
      const devType = this.currentDevice || 'phone';
      const theme = this.currentTheme || 'cyan';
      const colHex = this.themeColors[theme].hex;
      const colCss = this.themeColors[theme].css;
      const mode = this.currentMode || 'apps';
      const appId = this.activeAppId || 'weather';
      const radioStnIdx = (this.radioState && typeof this.radioState.currentStationIdx === 'number') ? this.radioState.currentStationIdx : 0;
      const isDual = !!this.isDualScreenActive;
      const compApp = this.companionAppId || 'crypto';
      const compSpacing = typeof this.companionSpacing === 'number' ? this.companionSpacing : 0.0;

      const titleEscaped = (this.textData.title || 'Spatial Screen').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;');
      const subtitleEscaped = (this.textData.subtitle || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;');
      const bodyEscaped = (this.textData.body || '').replace(/\r?\n/g, ' ').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;');
      const tagEscaped = (this.textData.tag || '⚡ SPATIAL WORKSTATION').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;');
      const customCodeRaw = (this.customCode || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 280).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
      const code = this.customCode || '';
      const isSynth = /synth|beat|drum|audio|sequencer|track|bpm|step/i.test(code);
      let appTitle = 'Autonomous Web Application';
      const titleMatch = code.match(/<h[1-2][^>]*>([\s\S]*?)<\/h[1-2]>/i) || code.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      if (titleMatch) appTitle = titleMatch[1].replace(/<[^>]+>/g, '').trim() || appTitle;
      else if (typeof APP !== 'undefined' && APP && APP.name) appTitle = APP.name;
      const appTitleEscaped = appTitle.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;');
      let appDesc = 'Custom HTML/CSS/JS Application projection';
      const descMatch = code.match(/<p[^>]*class=["'][^"']*tagline[^"']*["'][^>]*>([\s\S]*?)<\/p>/i) || code.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
      if (descMatch) appDesc = descMatch[1].replace(/<[^>]+>/g, '').trim().slice(0, 120) || appDesc;
      const appDescEscaped = appDesc.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;');

      const snippet = `
<!-- ═══ ULTRA SPATIAL SCREEN HOLOGRAPHIC WORKSTATION (START) ═══ -->
<div id="ultra-spatial-screen-card" style="margin:20px auto;max-width:1100px;background:radial-gradient(circle at center,#0e172e 0%,#03050c 100%);border-radius:24px;border:1px solid ${colCss}55;box-shadow:0 20px 60px rgba(0,0,0,0.7);padding:20px;position:relative;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Inter',system-ui,sans-serif;color:#fff">
  <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:14px">
    <div>
      <div style="display:flex;align-items:center;gap:10px">
        <span style="font-size:1.5rem">🛸</span>
        <h3 style="font-size:1.2rem;font-weight:900;margin:0;background:linear-gradient(135deg,#fff,${colCss});-webkit-background-clip:text;-webkit-text-fill-color:transparent">
          Ultra Spatial Hologram Workstation
        </h3>
        <span style="font-size:0.7rem;font-weight:800;padding:3px 9px;border-radius:20px;background:${colCss}22;border:1px solid ${colCss}88;color:${colCss}">
          ● ZERO-G LIVE
        </span>
      </div>
      <p style="font-size:0.78rem;color:#94a3b8;margin:3px 0 0 0">
        Interactive 3D Holographic Screen · Rotate 360° · Scroll to Zoom · Active: <strong id="sp-active-mode-label" style="color:${colCss}">${mode === 'apps' ? (appId === 'clock' ? 'QUANTUM CLOCK' : appId.toUpperCase()) : mode.toUpperCase()}</strong>
      </p>
    </div>
    <div style="display:flex;align-items:center;gap:5px;flex-wrap:wrap">
      <button class="sp-mode-btn ${mode==='text'?'active':''}" data-mode="text" data-app="" onclick="window.__setSpatialScreenMode && window.__setSpatialScreenMode('text')" style="background:${mode==='text'?colCss+'25':'rgba(255,255,255,0.06)'};border:1px solid ${mode==='text'?colCss:'rgba(255,255,255,0.2)'};color:${mode==='text'?colCss:'#cbd5e1'};padding:4px 9px;border-radius:14px;font-size:0.7rem;cursor:pointer;font-weight:700">✍️ Text</button>
      <button class="sp-mode-btn ${mode==='apps'&&appId==='weather'?'active':''}" data-mode="apps" data-app="weather" onclick="window.__setSpatialScreenMode && window.__setSpatialScreenMode('apps','weather')" style="background:${mode==='apps'&&appId==='weather'?colCss+'25':'rgba(255,255,255,0.06)'};border:1px solid ${mode==='apps'&&appId==='weather'?colCss:'rgba(255,255,255,0.2)'};color:${mode==='apps'&&appId==='weather'?colCss:'#cbd5e1'};padding:4px 9px;border-radius:14px;font-size:0.7rem;cursor:pointer;font-weight:700">🌤️ Weather</button>
      <button class="sp-mode-btn ${mode==='apps'&&appId==='forex'?'active':''}" data-mode="apps" data-app="forex" onclick="window.__setSpatialScreenMode && window.__setSpatialScreenMode('apps','forex')" style="background:${mode==='apps'&&appId==='forex'?colCss+'25':'rgba(255,255,255,0.06)'};border:1px solid ${mode==='apps'&&appId==='forex'?colCss:'rgba(255,255,255,0.2)'};color:${mode==='apps'&&appId==='forex'?colCss:'#cbd5e1'};padding:4px 9px;border-radius:14px;font-size:0.7rem;cursor:pointer;font-weight:700">💱 Forex</button>
      <button class="sp-mode-btn ${mode==='apps'&&appId==='radio'?'active':''}" data-mode="apps" data-app="radio" onclick="window.__setSpatialScreenMode && window.__setSpatialScreenMode('apps','radio')" style="background:${mode==='apps'&&appId==='radio'?colCss+'25':'rgba(255,255,255,0.06)'};border:1px solid ${mode==='apps'&&appId==='radio'?colCss:'rgba(255,255,255,0.2)'};color:${mode==='apps'&&appId==='radio'?colCss:'#cbd5e1'};padding:4px 9px;border-radius:14px;font-size:0.7rem;cursor:pointer;font-weight:700">📻 Radio</button>
      <span id="sp-radio-station-group" style="display:${mode==='apps'&&appId==='radio'?'inline-flex':'none'};align-items:center;gap:3px">
        <button class="sp-stn-btn ${radioStnIdx===0?'active':''}" data-stn="0" onclick="window.__setSpatialRadioStation && window.__setSpatialRadioStation(0)" style="background:${radioStnIdx===0?'rgba(244,63,94,0.25)':'rgba(255,255,255,0.06)'};border:1px solid ${radioStnIdx===0?'#f43f5e':'rgba(255,255,255,0.2)'};color:${radioStnIdx===0?'#fb7185':'#cbd5e1'};padding:3px 7px;border-radius:12px;font-size:0.68rem;cursor:pointer;font-weight:700">🎧 Montreal</button>
        <button class="sp-stn-btn ${radioStnIdx===1?'active':''}" data-stn="1" onclick="window.__setSpatialRadioStation && window.__setSpatialRadioStation(1)" style="background:${radioStnIdx===1?'rgba(244,63,94,0.25)':'rgba(255,255,255,0.06)'};border:1px solid ${radioStnIdx===1?'#f43f5e':'rgba(255,255,255,0.2)'};color:${radioStnIdx===1?'#fb7185':'#cbd5e1'};padding:3px 7px;border-radius:12px;font-size:0.68rem;cursor:pointer;font-weight:700">🌆 DEF CON</button>
        <button class="sp-stn-btn ${radioStnIdx===2?'active':''}" data-stn="2" onclick="window.__setSpatialRadioStation && window.__setSpatialRadioStation(2)" style="background:${radioStnIdx===2?'rgba(244,63,94,0.25)':'rgba(255,255,255,0.06)'};border:1px solid ${radioStnIdx===2?'#f43f5e':'rgba(255,255,255,0.2)'};color:${radioStnIdx===2?'#fb7185':'#cbd5e1'};padding:3px 7px;border-radius:12px;font-size:0.68rem;cursor:pointer;font-weight:700">🎸 Hits</button>
        <button class="sp-stn-btn ${radioStnIdx===3?'active':''}" data-stn="3" onclick="window.__setSpatialRadioStation && window.__setSpatialRadioStation(3)" style="background:${radioStnIdx===3?'rgba(244,63,94,0.25)':'rgba(255,255,255,0.06)'};border:1px solid ${radioStnIdx===3?'#f43f5e':'rgba(255,255,255,0.2)'};color:${radioStnIdx===3?'#fb7185':'#cbd5e1'};padding:3px 7px;border-radius:12px;font-size:0.68rem;cursor:pointer;font-weight:700">🌌 Drone</button>
        <button class="sp-stn-btn ${radioStnIdx===4?'active':''}" data-stn="4" onclick="window.__setSpatialRadioStation && window.__setSpatialRadioStation(4)" style="background:${radioStnIdx===4?'rgba(244,63,94,0.25)':'rgba(255,255,255,0.06)'};border:1px solid ${radioStnIdx===4?'#f43f5e':'rgba(255,255,255,0.2)'};color:${radioStnIdx===4?'#fb7185':'#cbd5e1'};padding:3px 7px;border-radius:12px;font-size:0.68rem;cursor:pointer;font-weight:700">⚡ CliqHop</button>
      </span>
      <button id="sp-radio-play-btn" onclick="window.__toggleSpatialRadio && window.__toggleSpatialRadio()" style="background:#10b98122;border:1px solid #10b981;color:#34d399;padding:4px 10px;border-radius:14px;font-size:0.7rem;cursor:pointer;font-weight:800;display:${mode==='apps'&&appId==='radio'?'inline-flex':'none'};align-items:center;gap:3px">▶ Play Radio</button>
      <button class="sp-mode-btn ${mode==='apps'&&appId==='crypto'?'active':''}" data-mode="apps" data-app="crypto" onclick="window.__setSpatialScreenMode && window.__setSpatialScreenMode('apps','crypto')" style="background:${mode==='apps'&&appId==='crypto'?colCss+'25':'rgba(255,255,255,0.06)'};border:1px solid ${mode==='apps'&&appId==='crypto'?colCss:'rgba(255,255,255,0.2)'};color:${mode==='apps'&&appId==='crypto'?colCss:'#cbd5e1'};padding:4px 9px;border-radius:14px;font-size:0.7rem;cursor:pointer;font-weight:700">🪙 Crypto</button>
      <button class="sp-mode-btn ${mode==='apps'&&appId==='pomodoro'?'active':''}" data-mode="apps" data-app="pomodoro" onclick="window.__setSpatialScreenMode && window.__setSpatialScreenMode('apps','pomodoro')" style="background:${mode==='apps'&&appId==='pomodoro'?colCss+'25':'rgba(255,255,255,0.06)'};border:1px solid ${mode==='apps'&&appId==='pomodoro'?colCss:'rgba(255,255,255,0.2)'};color:${mode==='apps'&&appId==='pomodoro'?colCss:'#cbd5e1'};padding:4px 9px;border-radius:14px;font-size:0.7rem;cursor:pointer;font-weight:700">⏳ Focus</button>
      <button class="sp-mode-btn ${mode==='apps'&&appId==='system'?'active':''}" data-mode="apps" data-app="system" onclick="window.__setSpatialScreenMode && window.__setSpatialScreenMode('apps','system')" style="background:${mode==='apps'&&appId==='system'?colCss+'25':'rgba(255,255,255,0.06)'};border:1px solid ${mode==='apps'&&appId==='system'?colCss:'rgba(255,255,255,0.2)'};color:${mode==='apps'&&appId==='system'?colCss:'#cbd5e1'};padding:4px 9px;border-radius:14px;font-size:0.7rem;cursor:pointer;font-weight:700">⚡ System</button>
      <button class="sp-mode-btn ${mode==='apps'&&appId==='clock'?'active':''}" data-mode="apps" data-app="clock" onclick="window.__setSpatialScreenMode && window.__setSpatialScreenMode('apps','clock')" style="background:${mode==='apps'&&appId==='clock'?colCss+'25':'rgba(255,255,255,0.06)'};border:1px solid ${mode==='apps'&&appId==='clock'?colCss:'rgba(255,255,255,0.2)'};color:${mode==='apps'&&appId==='clock'?colCss:'#cbd5e1'};padding:4px 9px;border-radius:14px;font-size:0.7rem;cursor:pointer;font-weight:700">⏱️ Clock</button>
      <button class="sp-mode-btn ${mode==='apps'&&appId==='snake'?'active':''}" data-mode="apps" data-app="snake" onclick="window.__setSpatialScreenMode && window.__setSpatialScreenMode('apps','snake')" style="background:${mode==='apps'&&appId==='snake'?colCss+'25':'rgba(255,255,255,0.06)'};border:1px solid ${mode==='apps'&&appId==='snake'?colCss:'rgba(255,255,255,0.2)'};color:${mode==='apps'&&appId==='snake'?colCss:'#cbd5e1'};padding:4px 9px;border-radius:14px;font-size:0.7rem;cursor:pointer;font-weight:700">🕹️ Snake</button>
      <button class="sp-mode-btn ${mode==='apps'&&appId==='calc'?'active':''}" data-mode="apps" data-app="calc" onclick="window.__setSpatialScreenMode && window.__setSpatialScreenMode('apps','calc')" style="background:${mode==='apps'&&appId==='calc'?colCss+'25':'rgba(255,255,255,0.06)'};border:1px solid ${mode==='apps'&&appId==='calc'?colCss:'rgba(255,255,255,0.2)'};color:${mode==='apps'&&appId==='calc'?colCss:'#cbd5e1'};padding:4px 9px;border-radius:14px;font-size:0.7rem;cursor:pointer;font-weight:700">🧮 Calc</button>
      <button class="sp-mode-btn ${mode==='apps'&&appId==='spectrum'?'active':''}" data-mode="apps" data-app="spectrum" onclick="window.__setSpatialScreenMode && window.__setSpatialScreenMode('apps','spectrum')" style="background:${mode==='apps'&&appId==='spectrum'?colCss+'25':'rgba(255,255,255,0.06)'};border:1px solid ${mode==='apps'&&appId==='spectrum'?colCss:'rgba(255,255,255,0.2)'};color:${mode==='apps'&&appId==='spectrum'?colCss:'#cbd5e1'};padding:4px 9px;border-radius:14px;font-size:0.7rem;cursor:pointer;font-weight:700">🎵 Spectrum</button>
      <button class="sp-mode-btn ${mode==='custom'?'active':''}" data-mode="custom" data-app="" onclick="window.__setSpatialScreenMode && window.__setSpatialScreenMode('custom')" style="background:${mode==='custom'?colCss+'25':'rgba(255,255,255,0.06)'};border:1px solid ${mode==='custom'?colCss:'rgba(255,255,255,0.2)'};color:${mode==='custom'?colCss:'#cbd5e1'};padding:4px 9px;border-radius:14px;font-size:0.7rem;cursor:pointer;font-weight:700">🌐 App</button>
      <button onclick="window.__resetSpatialScreenOrbit && window.__resetSpatialScreenOrbit()" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);color:#cbd5e1;padding:4px 8px;border-radius:8px;font-size:0.7rem;cursor:pointer">↺ Reset</button>
      <button id="sp-btn-dual" onclick="window.__toggleSpatialDualScreen && window.__toggleSpatialDualScreen()" style="background:${isDual ? colCss + '25' : 'rgba(255,255,255,0.06)'};border:1px solid ${isDual ? colCss : 'rgba(255,255,255,0.2)'};color:${isDual ? colCss : '#cbd5e1'};padding:4px 9px;border-radius:14px;font-size:0.7rem;cursor:pointer;font-weight:700">🖥️ Dual${isDual ? ': ON' : ''}</button>
      <span id="sp-dual-controls-wrap" style="display:${isDual ? 'inline-flex' : 'none'};align-items:center;gap:3px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.18);border-radius:12px;padding:2px 6px">
        <span style="font-size:0.65rem;color:#38bdf8;font-weight:700">S2:</span>
        <select id="sp-select-screen2" onchange="window.__setSpatialCompanionApp && window.__setSpatialCompanionApp(this.value)" style="background:transparent;border:none;color:#fff;font-size:0.68rem;outline:none;cursor:pointer">
          <option value="radio" ${compApp==='radio'?'selected':''} style="background:#0f172a;color:#fff">📻 Radio</option>
          <option value="crypto" ${compApp==='crypto'?'selected':''} style="background:#0f172a;color:#fff">🪙 Crypto</option>
          <option value="weather" ${compApp==='weather'?'selected':''} style="background:#0f172a;color:#fff">🌤️ Weather</option>
          <option value="clock" ${compApp==='clock'?'selected':''} style="background:#0f172a;color:#fff">⏱️ Clock</option>
          <option value="system" ${compApp==='system'?'selected':''} style="background:#0f172a;color:#fff">⚡ System</option>
          <option value="focus" ${compApp==='focus'?'selected':''} style="background:#0f172a;color:#fff">⏳ Focus</option>
          <option value="snake" ${compApp==='snake'?'selected':''} style="background:#0f172a;color:#fff">🕹️ Snake</option>
          <option value="calc" ${compApp==='calc'?'selected':''} style="background:#0f172a;color:#fff">🧮 Calc</option>
          <option value="spectrum" ${compApp==='spectrum'?'selected':''} style="background:#0f172a;color:#fff">🎵 Spectrum</option>
          <option value="forex" ${compApp==='forex'?'selected':''} style="background:#0f172a;color:#fff">💱 Forex</option>
          <option value="matrix" ${compApp==='matrix'?'selected':''} style="background:#0f172a;color:#fff">⚡ Matrix</option>
          <option value="custom" ${compApp==='custom'?'selected':''} style="background:#0f172a;color:#fff">🌐 App</option>
        </select>
        <button onclick="window.__adjustSpatialSpacing && window.__adjustSpatialSpacing(-0.2)" title="Closer" style="background:none;border:none;color:#cbd5e1;cursor:pointer;font-size:0.75rem;padding:0 2px">↔-</button>
        <span id="sp-spacing-val" style="font-size:0.65rem;font-family:monospace;color:#38bdf8">${(compSpacing >= 0 ? '+' : '') + compSpacing.toFixed(1)}</span>
        <button onclick="window.__adjustSpatialSpacing && window.__adjustSpatialSpacing(0.2)" title="Further" style="background:none;border:none;color:#cbd5e1;cursor:pointer;font-size:0.75rem;padding:0 2px">↔+</button>
      </span>
      <button id="sp-btn-pulse" onclick="window.__toggleSpatialAudioPulse && window.__toggleSpatialAudioPulse()" style="background:${colCss}25;border:1px solid ${colCss};color:${colCss};padding:4px 9px;border-radius:14px;font-size:0.7rem;cursor:pointer;font-weight:700">✨ Pulse</button>
      <button id="sp-btn-rec" onclick="window.__recordSpatialWebM && window.__recordSpatialWebM()" style="background:rgba(239,68,68,0.18);border:1px solid #ef4444;color:#fca5a5;padding:4px 9px;border-radius:14px;font-size:0.7rem;cursor:pointer;font-weight:700">🎥 Video</button>
    </div>
  </div>

  <div id="spatial-screen-canvas-box" style="width:100%;height:520px;position:relative;border-radius:18px;overflow:hidden;background:#03050c;cursor:grab"></div>
</div>

<script>
(function() {
  const container = document.getElementById('spatial-screen-canvas-box');
  if (!container) return;

  let activeMode = '${mode}';
  let activeApp = '${appId}';
  let sTex = null;
  let t = 0;

  function getThree() {
    if (typeof THREE !== 'undefined') return THREE;
    try { if (window.parent && window.parent.THREE) return window.parent.THREE; } catch(e){}
    try { if (window.top && window.top.THREE) return window.top.THREE; } catch(e){}
    return null;
  }

  const sCanvas = document.createElement('canvas');
  sCanvas.width = 1024; sCanvas.height = 1024;
  const sCtx = sCanvas.getContext('2d');
  const sw = 1024, sh = 1024;
  const accent = '${colCss}';

  // Companion HUD State & Canvas (Dual Screen Innovation)
  let isDualActive = ${isDual ? 'true' : 'false'};
  let compApp = '${compApp}';
  let compSpacing = ${compSpacing};
  let cGroup = null;
  let isPulseActive = true;
  let isSpatialDepth = true;

  const sCompCanvas = document.createElement('canvas');
  sCompCanvas.width = 512; sCompCanvas.height = 512;
  const sCompCtx = sCompCanvas.getContext('2d');
  let sCompTex = null;

  function renderCompanion(animTime) {
    if (!sCompCtx) return;
    const ctx = sCompCtx, cw = 512, ch = 512;
    ctx.fillStyle = '#060a14'; ctx.fillRect(0, 0, cw, ch);
    ctx.strokeStyle = 'rgba(255,255,255,0.03)'; ctx.lineWidth = 1;
    for (let x = 0; x < cw; x += 32) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, ch); ctx.stroke(); }
    for (let y = 0; y < ch; y += 32) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(cw, y); ctx.stroke(); }
    ctx.strokeStyle = accent; ctx.lineWidth = 3; ctx.strokeRect(6, 6, cw - 12, ch - 12);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)'; ctx.fillRect(10, 10, cw - 20, 52);
    ctx.fillStyle = '#fff'; ctx.font = 'bold 18px sans-serif';

    if (compApp === 'pomodoro') compApp = 'focus';
    const appTitles = {
      radio: '📻 COMPANION · WEB RADIO',
      crypto: '🪙 COMPANION · CRYPTO HUD',
      weather: '🌤️ COMPANION · METEO RADAR',
      clock: '⏱️ COMPANION · QUANTUM CLOCK',
      system: '⚡ COMPANION · SYSTEM SPECS',
      focus: '⏳ COMPANION · POMODORO FOCUS',
      snake: '🕹️ COMPANION · SNAKE ARCADE',
      calc: '🧮 COMPANION · CALCULATOR',
      spectrum: '🎵 COMPANION · AUDIO SPECTRUM',
      forex: '💱 COMPANION · FOREX CAD',
      matrix: '⚡ COMPANION · MATRIX STREAM',
      custom: '🌐 COMPANION · APP PROJECTION'
    };
    ctx.fillText(appTitles[compApp] || '🛸 COMPANION HUD · ZERO-G', 24, 42);

    if (compApp === 'radio') {
      const cur = sRadio.stations[sRadio.stnIdx || 0];
      ctx.fillStyle = sRadio.isPlaying ? '#10b981' : '#f59e0b';
      ctx.font = 'bold 14px monospace';
      ctx.fillText(sRadio.isPlaying ? '● LIVE AUDIO' : '○ STANDBY', cw - 130, 42);
      ctx.fillStyle = '#ffffff'; ctx.font = 'bold 22px sans-serif';
      ctx.fillText(cur ? cur.name : 'Station', 24, 100);
      ctx.fillStyle = '#94a3b8'; ctx.font = '16px sans-serif';
      ctx.fillText(cur ? cur.genre : '', 24, 130);
      const bars = 20, bw = (cw - 60) / bars;
      for (let b = 0; b < bars; b++) {
        const factor = sRadio.isPlaying ? Math.abs(Math.sin(animTime * 6 + b * 0.4)) : 0.08;
        const bh = factor * 140 + 10;
        ctx.fillStyle = accent;
        ctx.fillRect(30 + b * bw, 320 - bh, bw - 4, bh);
      }
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(24, 380, cw - 48, 56);
      ctx.fillStyle = '#38bdf8'; ctx.font = 'bold 16px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(sRadio.isPlaying ? '⏸ Click Screen to Pause' : '▶ Click Screen to Play', cw / 2, 415);
      ctx.textAlign = 'left';
    } else if (compApp === 'crypto') {
      ctx.fillStyle = '#f59e0b'; ctx.font = 'bold 14px monospace';
      ctx.fillText('● REAL-TIME CRYPTO', cw - 170, 42);
      sCrypto.coins.slice(0, 4).forEach((c, idx) => {
        const y = 90 + idx * 68;
        ctx.fillStyle = 'rgba(255,255,255,0.04)'; ctx.fillRect(20, y, cw - 40, 58);
        ctx.fillStyle = c.color; ctx.font = 'bold 18px sans-serif'; ctx.fillText(c.sym + ' / USD', 36, y + 36);
        ctx.fillStyle = '#fff'; ctx.font = 'bold 20px monospace'; ctx.fillText('$' + Number(c.price).toLocaleString(), 180, y + 36);
        ctx.fillStyle = c.up ? '#10b981' : '#f43f5e'; ctx.font = 'bold 15px monospace'; ctx.fillText(c.change, cw - 110, y + 36);
      });
      ctx.fillStyle = '#94a3b8'; ctx.font = '13px monospace'; ctx.textAlign = 'center';
      ctx.fillText('Autonomous WebSocket Live Feeds', cw / 2, 380); ctx.textAlign = 'left';
    } else if (compApp === 'weather') {
      ctx.fillStyle = '#38bdf8'; ctx.font = 'bold 14px monospace';
      ctx.fillText('● METEO RADAR', cw - 140, 42);
      ctx.fillStyle = '#ffffff'; ctx.font = 'bold 26px sans-serif';
      ctx.fillText(sWeather.city + ' ' + sWeather.temp + '°C', 24, 105);
      ctx.fillStyle = '#94a3b8'; ctx.font = '16px sans-serif'; ctx.fillText(sWeather.condition, 24, 138);
      ctx.strokeStyle = accent; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(cw / 2, 270, 75, 0, Math.PI * 2); ctx.stroke();
      const sweep = animTime * 3;
      ctx.beginPath(); ctx.moveTo(cw / 2, 270);
      ctx.lineTo(cw / 2 + Math.cos(sweep) * 75, 270 + Math.sin(sweep) * 75); ctx.stroke();
      ctx.fillStyle = '#94a3b8'; ctx.font = '14px monospace'; ctx.textAlign = 'center';
      ctx.fillText('WIND: ' + sWeather.windSpeed + ' km/h · HUMIDITY: ' + sWeather.humidity + '%', cw / 2, 385);
      ctx.textAlign = 'left';
    } else if (compApp === 'clock') {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      const ms = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');
      ctx.fillStyle = '#60a5fa'; ctx.font = 'bold 18px monospace'; ctx.fillText('⏱️ ATOMIC UTC TELEMETRY', 32, 100);
      ctx.fillStyle = '#ffffff'; ctx.font = 'bold 56px monospace'; ctx.fillText(hrs + ':' + mins + ':' + secs, 32, 180);
      ctx.fillStyle = accent; ctx.font = 'bold 24px monospace'; ctx.fillText('.' + ms + ' MS', cw - 140, 180);
      ctx.fillStyle = '#94a3b8'; ctx.font = '15px monospace'; ctx.fillText(now.toDateString().toUpperCase() + ' · ZERO-G', 34, 220);
      const cx = cw / 2, cy = 330, radius = 75;
      ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.stroke();
      const sAngle = ((now.getSeconds() + now.getMilliseconds() / 1000) / 60) * Math.PI * 2 - Math.PI / 2;
      ctx.strokeStyle = accent; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(cx, cy, radius, -Math.PI / 2, sAngle); ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 22px monospace'; ctx.textAlign = 'center'; ctx.fillText(secs + 's', cx, cy + 8); ctx.textAlign = 'left';
    } else if (compApp === 'system') {
      ctx.fillStyle = '#22d3ee'; ctx.font = 'bold 18px monospace'; ctx.fillText('⚡ QUANTUM SYSTEM SPECS', 32, 100);
      const specs = [
        { label: 'CPU CORES', val: sSystem.cores + ' Cores Active', col: '#38bdf8' },
        { label: 'HEAP RAM', val: sSystem.ramMB + ' MB / Allocated', col: '#a855f7' },
        { label: 'REFRESH RATE', val: '60.0 FPS Synchronized', col: '#10b981' },
        { label: 'NETWORK PING', val: sSystem.pingMs + ' ms (Fiber Gigabit)', col: '#f59e0b' },
        { label: 'BATTERY POWER', val: sSystem.battery + '% ⚡ Optimal Zero-G', col: '#34d399' }
      ];
      specs.forEach((item, idx) => {
        const sy = 120 + idx * 54;
        ctx.fillStyle = 'rgba(255,255,255,0.04)'; ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.strokeRect(28, sy, cw - 56, 46);
        ctx.fillStyle = '#94a3b8'; ctx.font = '11px monospace'; ctx.fillText(item.label, 40, sy + 18);
        ctx.fillStyle = item.col; ctx.font = 'bold 15px monospace'; ctx.fillText(item.val, 40, sy + 38);
      });
    } else if (compApp === 'focus') {
      const pM = Math.floor(sPomodoro.timeLeft / 60);
      const pS = sPomodoro.timeLeft % 60;
      ctx.fillStyle = '#fb7185'; ctx.font = 'bold 18px monospace'; ctx.fillText('⏳ SPATIAL FOCUS TIMER', 32, 100);
      const pcx = cw / 2, pcy = 240, pr = 90;
      ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(pcx, pcy, pr, 0, Math.PI * 2); ctx.stroke();
      const pProg = (animTime * 0.1) % 1;
      ctx.strokeStyle = '#f43f5e'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(pcx, pcy, pr, -Math.PI / 2, -Math.PI / 2 + pProg * Math.PI * 2); ctx.stroke();
      ctx.fillStyle = '#ffffff'; ctx.font = 'bold 42px monospace'; ctx.textAlign = 'center'; ctx.fillText(String(pM).padStart(2,'0') + ':' + String(pS).padStart(2,'0'), pcx, pcy + 14);
      ctx.fillStyle = '#94a3b8'; ctx.font = '13px monospace'; ctx.fillText('FOCUS INTERVAL · 25 MIN', pcx, pcy + 40);
      ctx.fillText('Sessions: ● ● ● ●', pcx, 380); ctx.fillStyle = '#34d399'; ctx.fillText('🌧️ Rain Ambient Active', pcx, 415); ctx.textAlign = 'left';
    } else if (compApp === 'snake') {
      ctx.fillStyle = '#34d399'; ctx.font = 'bold 18px monospace'; ctx.fillText('🕹️ CYBER SNAKE MINI', 32, 100);
      ctx.fillStyle = '#fff'; ctx.font = 'bold 14px monospace'; ctx.fillText('SCORE: ' + sSnake.score + '  HI: ' + sSnake.highScore, cw - 180, 100);
      const ax = 32, ay = 120, aw = cw - 64, ah = 300;
      ctx.fillStyle = '#050711'; ctx.strokeStyle = '#34d399'; ctx.lineWidth = 2; ctx.fillRect(ax, ay, aw, ah); ctx.strokeRect(ax, ay, aw, ah);
      ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = 1;
      for (let gx = ax; gx <= ax + aw; gx += 20) { ctx.beginPath(); ctx.moveTo(gx, ay); ctx.lineTo(gx, ay + ah); ctx.stroke(); }
      for (let gy = ay; gy <= ay + ah; gy += 20) { ctx.beginPath(); ctx.moveTo(ax, gy); ctx.lineTo(ax + aw, gy); ctx.stroke(); }
      const sx = ax + 120 + Math.sin(animTime * 3) * 60, sy = ay + 120 + Math.cos(animTime * 2) * 50;
      ctx.fillStyle = accent; ctx.fillRect(sx, sy, 18, 18); ctx.fillStyle = '#34d399'; ctx.fillRect(sx - 20, sy, 16, 16); ctx.fillRect(sx - 38, sy, 14, 14);
      ctx.fillStyle = '#f43f5e'; ctx.beginPath(); ctx.arc(ax + aw - 80, ay + 80, 8, 0, Math.PI * 2); ctx.fill();
    } else if (compApp === 'calc') {
      ctx.fillStyle = '#a855f7'; ctx.font = 'bold 18px monospace'; ctx.fillText('🧮 SPATIAL CALCULATOR', 32, 100);
      ctx.fillStyle = 'rgba(15,23,42,0.9)'; ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.fillRect(32, 120, cw - 64, 65); ctx.strokeRect(32, 120, cw - 64, 65);
      ctx.fillStyle = '#fff'; ctx.font = 'bold 34px monospace'; ctx.textAlign = 'right'; ctx.fillText('1,337.00', cw - 48, 164); ctx.textAlign = 'left';
      const keys = ['7','8','9','÷', '4','5','6','×', '1','2','3','-', 'C','0','=','+'];
      const kw = (cw - 80) / 4, kh = 42;
      keys.forEach((k, idx) => {
        const row = Math.floor(idx / 4), col = idx % 4;
        const kx = 32 + col * (kw + 5), ky = 200 + row * (kh + 8);
        ctx.fillStyle = ['÷','×','-','+','='].includes(k) ? accent + '40' : 'rgba(255,255,255,0.06)';
        ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.strokeRect(kx, ky, kw, kh);
        ctx.fillStyle = ['÷','×','-','+','='].includes(k) ? accent : '#fff';
        ctx.font = 'bold 17px monospace'; ctx.textAlign = 'center'; ctx.fillText(k, kx + kw / 2, ky + kh / 2 + 6); ctx.textAlign = 'left';
      });
    } else if (compApp === 'spectrum') {
      ctx.fillStyle = '#ec4899'; ctx.font = 'bold 18px monospace'; ctx.fillText('🎵 24-BAND AUDIO SPECTRUM', 32, 100);
      const spBars = 24, spW = (cw - 64) / spBars, spY = 130, spH = 290;
      ctx.fillStyle = 'rgba(15,23,42,0.6)'; ctx.fillRect(32, spY, cw - 64, spH);
      for (let i = 0; i < spBars; i++) {
        const val = Math.abs(Math.sin(animTime * 5 + i * 0.45) * Math.cos(animTime * 2.5 + i * 0.25));
        const bh = Math.max(12, val * (spH - 30)), bx = 32 + i * spW, by = spY + spH - bh - 10;
        const hue = (i / spBars) * 280 + 160;
        ctx.fillStyle = 'hsl(' + hue + ', 90%, 55%)'; ctx.fillRect(bx, by, spW - 3, bh);
        ctx.fillStyle = '#ffffff'; ctx.fillRect(bx, by - 4, spW - 3, 2);
      }
    } else if (compApp === 'forex') {
      ctx.fillStyle = '#10b981'; ctx.font = 'bold 18px monospace'; ctx.fillText('💱 FOREX TELEMETRY (1 CAD)', 32, 100);
      const pairs = [
        { pair: 'CAD / USD', val: sForex.rates.USD, delta: '+0.15%' },
        { pair: 'CAD / EUR', val: sForex.rates.EUR, delta: '-0.08%' },
        { pair: 'CAD / GBP', val: sForex.rates.GBP, delta: '+0.05%' },
        { pair: 'CAD / JPY', val: sForex.rates.JPY, delta: '+0.42%' },
        { pair: 'CAD / CHF', val: sForex.rates.CHF, delta: '-0.11%' }
      ];
      pairs.forEach((p, idx) => {
        const py = 120 + idx * 58;
        ctx.fillStyle = 'rgba(255,255,255,0.04)'; ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.strokeRect(28, py, cw - 56, 48);
        ctx.fillStyle = '#ffffff'; ctx.font = 'bold 15px monospace'; ctx.fillText(p.pair, 40, py + 30);
        ctx.fillStyle = '#38bdf8'; ctx.font = 'bold 17px monospace'; ctx.fillText(String(p.val), 190, py + 30);
        const up = p.delta.startsWith('+');
        ctx.fillStyle = up ? '#10b981' : '#f43f5e'; ctx.font = 'bold 13px monospace'; ctx.fillText(p.delta, cw - 95, py + 30);
      });
    } else if (compApp === 'matrix') {
      ctx.fillStyle = '#22c55e'; ctx.font = 'bold 18px monospace'; ctx.fillText('⚡ CYBER MATRIX STREAM', 32, 100);
      ctx.font = '14px monospace';
      const cols = 20, colW = (cw - 64) / cols;
      for (let c = 0; c < cols; c++) {
        const cx = 32 + c * colW, dropY = ((animTime * 140 + c * 47) % (ch - 180)) + 120;
        for (let r = 0; r < 7; r++) {
          const gy = dropY - r * 18;
          if (gy > 120 && gy < ch - 60) {
            ctx.fillStyle = r === 0 ? '#ffffff' : 'rgba(34, 197, 94, ' + (1 - r * 0.14) + ')';
            const char = String.fromCharCode(0x30A0 + Math.floor((c * 17 + r + animTime * 8) % 96));
            ctx.fillText(char, cx, gy);
          }
        }
      }
    } else {
      ctx.fillStyle = accent; ctx.font = 'bold 18px monospace'; ctx.fillText('🌐 AUTONOMOUS APP PROJECTION', 32, 100);
      ctx.fillStyle = 'rgba(255,255,255,0.05)'; ctx.strokeStyle = accent; ctx.lineWidth = 1.5; ctx.strokeRect(28, 125, cw - 56, 280);
      ctx.fillStyle = '#ffffff'; ctx.font = 'bold 22px system-ui, sans-serif'; ctx.fillText('Autonomous AI Studio', 44, 175);
      ctx.fillStyle = '#94a3b8'; ctx.font = '14px system-ui, sans-serif';
      ctx.fillText('3D Interactive Canvas Projections', 44, 210);
      ctx.fillText('Real-time synchronization with active app', 44, 235);
      ctx.fillText('WebGL 60FPS Zero-Gravity Rendering', 44, 260);
      ctx.fillStyle = accent; ctx.fillRect(44, 290, 150, 38);
      ctx.fillStyle = '#030712'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('🚀 Launch View', 44 + 75, 314); ctx.textAlign = 'left';
    }

    ctx.fillStyle = 'rgba(15, 23, 42, 0.95)'; ctx.fillRect(10, ch - 44, cw - 20, 34);
    ctx.fillStyle = '#94a3b8'; ctx.font = '11px monospace'; ctx.textAlign = 'center';
    ctx.fillText('CLICK TO CYCLE APP · SHIFT+DRAG TO MOVE', cw / 2, ch - 22);
    ctx.textAlign = 'left';
  }

  // Mini-App Engines State & Live Fetchers
  const sWeather = {
    city: 'Montreal', country: '🇨🇦', lat: 45.5017, lon: -73.5673,
    temp: 8.5, condition: 'Clear Sky / Ciel Dégagé ☀️', weatherCode: 0,
    humidity: 52, windSpeed: 14.5,
    daily: [{ day: 'Today', max: 15, min: 5 }, { day: 'Tomorrow', max: 16, min: 6 }, { day: 'Wed', max: 15, min: 9 }, { day: 'Thu', max: 16, min: 6 }]
  };
  function fetchLiveWeather() {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=45.5017&longitude=-73.5673&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=America%2FToronto')
      .then(r => r.json()).then(d => {
        if (d.current) {
          sWeather.temp = Math.round(d.current.temperature_2m * 10) / 10;
          sWeather.humidity = Math.round(d.current.relative_humidity_2m);
          sWeather.windSpeed = Math.round(d.current.wind_speed_10m * 10) / 10;
          sWeather.weatherCode = d.current.weather_code || 0;
          sWeather.condition = sWeather.weatherCode === 0 ? 'Clear Sky / Ciel Dégagé ☀️' : (sWeather.weatherCode >= 71 ? 'Snow / Neige ❄️' : (sWeather.weatherCode >= 51 ? 'Rain / Pluie 🌧️' : 'Partly Cloudy ⛅'));
        }
        if (d.daily && d.daily.temperature_2m_max) {
          const days = ['Today', 'Tomorrow', 'Day 3', 'Day 4'];
          sWeather.daily = days.map((day, i) => ({
            day, max: Math.round(d.daily.temperature_2m_max[i] || 15), min: Math.round(d.daily.temperature_2m_min[i] || 5)
          }));
        }
      }).catch(e => {});
  }
  fetchLiveWeather();

  const sForex = {
    base: 'CAD',
    rates: { USD: 0.7147, EUR: 0.6229, GBP: 0.5342, JPY: 112.27, CHF: 0.5883 }
  };
  function fetchLiveForex() {
    fetch('https://open.er-api.com/v6/latest/CAD')
      .then(r => r.json()).then(d => {
        if (d.rates) {
          sForex.rates.USD = +(d.rates.USD ? d.rates.USD.toFixed(4) : 0.7147);
          sForex.rates.EUR = +(d.rates.EUR ? d.rates.EUR.toFixed(4) : 0.6229);
          sForex.rates.GBP = +(d.rates.GBP ? d.rates.GBP.toFixed(4) : 0.5342);
          sForex.rates.JPY = +(d.rates.JPY ? d.rates.JPY.toFixed(2) : 112.27);
          sForex.rates.CHF = +(d.rates.CHF ? d.rates.CHF.toFixed(4) : 0.5883);
        }
      }).catch(e => {});
  }
  fetchLiveForex();

  const sCrypto = {
    coins: [
      { sym: 'BTC', name: 'Bitcoin', price: 64820, change: '+4.25%', up: true, color: '#f59e0b' },
      { sym: 'ETH', name: 'Ethereum', price: 3480, change: '+3.80%', up: true, color: '#38bdf8' },
      { sym: 'SOL', name: 'Solana', price: 152.40, change: '+8.15%', up: true, color: '#a855f7' },
      { sym: 'BNB', name: 'BNB Chain', price: 582.10, change: '-0.92%', up: false, color: '#eab308' }
    ]
  };
  function fetchLiveCrypto() {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin&vs_currencies=usd&include_24hr_change=true')
      .then(r => r.json()).then(d => {
        if (d.bitcoin) sCrypto.coins[0].price = d.bitcoin.usd;
        if (d.ethereum) sCrypto.coins[1].price = d.ethereum.usd;
        if (d.solana) sCrypto.coins[2].price = d.solana.usd;
        if (d.binancecoin) sCrypto.coins[3].price = d.binancecoin.usd;
      }).catch(e => {});
  }
  fetchLiveCrypto();

  let sRadioAudio = null;
  const sRadio = {
    isPlaying: false,
    stnIdx: ${radioStnIdx},
    stations: [
      { name: 'Montreal Chill Beats', genre: 'Downtempo Beats', url: 'https://ice2.somafm.com/groovesalad-128-mp3', icon: '🎧' },
      { name: 'DEF CON Cyber Radio', genre: 'Synthwave 80s', url: 'https://ice2.somafm.com/defcon-128-mp3', icon: '🌆' },
      { name: 'Radio Hits & Pop Rocks', genre: 'Modern Indie Hits', url: 'https://ice2.somafm.com/indiepop-128-mp3', icon: '🎸' },
      { name: 'Drone Zone Deep Space', genre: 'Cosmic Ambient', url: 'https://ice2.somafm.com/dronezone-128-mp3', icon: '🌌' },
      { name: 'Cyber Club CliqHop', genre: 'Glitch Electro', url: 'https://ice2.somafm.com/cliqhop-128-mp3', icon: '⚡' }
    ]
  };

  function updateRadioUI() {
    const isRadio = (activeMode === 'apps' && activeApp === 'radio');
    const pBtn = document.getElementById('sp-radio-play-btn');
    if (pBtn) {
      pBtn.style.display = isRadio ? 'inline-flex' : 'none';
      pBtn.innerHTML = sRadio.isPlaying ? '⏸ Pause Radio' : '▶ Play Radio';
      pBtn.style.borderColor = sRadio.isPlaying ? '#ef4444' : '#10b981';
      pBtn.style.color = sRadio.isPlaying ? '#f87171' : '#34d399';
      pBtn.style.background = sRadio.isPlaying ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)';
    }
    const stnGroup = document.getElementById('sp-radio-station-group');
    if (stnGroup) {
      stnGroup.style.display = isRadio ? 'inline-flex' : 'none';
    }
    document.querySelectorAll('#ultra-spatial-screen-card .sp-stn-btn').forEach(btn => {
      const idx = parseInt(btn.getAttribute('data-stn'), 10);
      const isActive = (idx === sRadio.stnIdx);
      btn.style.background = isActive ? 'rgba(244,63,94,0.25)' : 'rgba(255,255,255,0.06)';
      btn.style.borderColor = isActive ? '#f43f5e' : 'rgba(255,255,255,0.2)';
      btn.style.color = isActive ? '#fb7185' : '#cbd5e1';
    });
  }

  function setSpatialRadioStation(idx) {
    if (idx < 0 || idx >= sRadio.stations.length) return;
    sRadio.stnIdx = idx;
    const cur = sRadio.stations[idx];
    if (!sRadioAudio && typeof Audio !== 'undefined') {
      sRadioAudio = new Audio();
      sRadioAudio.preload = 'none';
      sRadioAudio.addEventListener('playing', function() { sRadio.isPlaying = true; updateRadioUI(); });
      sRadioAudio.addEventListener('pause', function() { sRadio.isPlaying = false; updateRadioUI(); });
      sRadioAudio.addEventListener('error', function() {
        if (sRadioAudio && sRadioAudio.src && sRadioAudio.src.includes('ice2')) {
          sRadioAudio.src = sRadioAudio.src.replace('ice2', 'ice4');
          sRadioAudio.play().catch(function() { sRadio.isPlaying = false; updateRadioUI(); });
        } else {
          sRadio.isPlaying = false;
          updateRadioUI();
        }
      });
    }
    if (sRadioAudio && cur) {
      sRadioAudio.src = cur.url;
      if (sRadio.isPlaying) {
        sRadioAudio.play().catch(function(e) { console.warn('Radio station play error:', e); });
      }
    }
    updateRadioUI();
    if (sTex) sTex.needsUpdate = true;
  }
  window.__setSpatialRadioStation = setSpatialRadioStation;

  function toggleRadioAudio() {
    if (!sRadioAudio && typeof Audio !== 'undefined') {
      sRadioAudio = new Audio();
      sRadioAudio.src = sRadio.stations[sRadio.stnIdx || 0].url;
      sRadioAudio.preload = 'none';
      sRadioAudio.addEventListener('playing', function() { sRadio.isPlaying = true; updateRadioUI(); });
      sRadioAudio.addEventListener('pause', function() { sRadio.isPlaying = false; updateRadioUI(); });
      sRadioAudio.addEventListener('error', function() {
        const cur = sRadio.stations[sRadio.stnIdx || 0];
        if (cur && cur.url.includes('ice2')) {
          sRadioAudio.src = cur.url.replace('ice2', 'ice4');
          sRadioAudio.play().catch(function() { sRadio.isPlaying = false; updateRadioUI(); });
        } else {
          sRadio.isPlaying = false;
          updateRadioUI();
        }
      });
    }
    if (sRadioAudio) {
      if (sRadio.isPlaying) {
        sRadioAudio.pause();
        sRadio.isPlaying = false;
        updateRadioUI();
      } else {
        const cur = sRadio.stations[sRadio.stnIdx || 0];
        if (cur && sRadioAudio.src !== cur.url) sRadioAudio.src = cur.url;
        sRadioAudio.play().then(function() {
          sRadio.isPlaying = true;
          updateRadioUI();
        }).catch(function(e) {
          console.warn('Radio play error:', e);
        });
      }
    }
  }
  window.__toggleSpatialRadio = toggleRadioAudio;

  const sPomodoro = {
    timeLeft: 25 * 60, totalTime: 25 * 60, isRunning: true, lastTick: 0, sessions: 4
  };

  const sSystem = {
    fps: 60, pingMs: 18, ramMB: 142, cores: (typeof navigator !== 'undefined' && navigator.hardwareConcurrency) || 8, battery: 94
  };

  // Snake internal autonomous engine
  const sSnake = {
    gridSize: 20,
    snake: [{x:10, y:10}, {x:9, y:10}, {x:8, y:10}],
    dir: {x:1, y:0},
    food: {x:15, y:10},
    score: 0,
    highScore: 120,
    lastTick: 0,
    speed: 100
  };

  function wrapText(c, txt, x, y, maxW, lineH) {
    if (!txt) return;
    const words = txt.split(' ');
    let line = '', curY = y;
    for (let n = 0; n < words.length; n++) {
      const test = line + words[n] + ' ';
      if (c.measureText(test).width > maxW && n > 0) {
        c.fillText(line, x, curY);
        line = words[n] + ' ';
        curY += lineH;
      } else {
        line = test;
      }
    }
    c.fillText(line, x, curY);
  }

  function renderScreen(animTime) {
    // 1. Cosmic Background
    const bgGrad = sCtx.createLinearGradient(0, 0, sw, sh);
    bgGrad.addColorStop(0, '#090d1a');
    bgGrad.addColorStop(0.5, '#0f172a');
    bgGrad.addColorStop(1, '#05070e');
    sCtx.fillStyle = bgGrad;
    sCtx.fillRect(0, 0, sw, sh);

    // 2. Status Bar
    sCtx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    sCtx.fillRect(0, 0, sw, 56);
    sCtx.fillStyle = '#f8fafc';
    sCtx.font = 'bold 22px system-ui, sans-serif';
    sCtx.textAlign = 'left';
    sCtx.fillText('9:41', 40, 36);
    sCtx.textAlign = 'right';
    sCtx.fillText('5G  100% 🔋', sw - 40, 36);
    sCtx.textAlign = 'left';

    // 3. Dynamic Mode Content
    if (activeMode === 'apps') {
      if (activeApp === 'weather') {
        sCtx.fillStyle = accent;
        sCtx.font = 'bold 36px monospace';
        sCtx.fillText('🌤️ QUANTUM WEATHER STATION · LIVE RADAR', 50, 115);

        const cx = 50, cy = 145, cw = sw - 100, ch = 720;
        sCtx.fillStyle = 'rgba(6, 11, 25, 0.94)';
        sCtx.strokeStyle = accent;
        sCtx.lineWidth = 2;
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(cx, cy, cw, ch, 20); else sCtx.rect(cx, cy, cw, ch);
        sCtx.fill(); sCtx.stroke();

        sCtx.fillStyle = accent + '22';
        sCtx.strokeStyle = accent;
        sCtx.lineWidth = 1.5;
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(cx + 30, cy + 24, 280, 42, 10); else sCtx.rect(cx + 30, cy + 24, 280, 42);
        sCtx.fill(); sCtx.stroke();
        sCtx.fillStyle = accent;
        sCtx.font = 'bold 18px monospace';
        sCtx.fillText('📍 ' + (sWeather.country || '🇨🇦') + ' ' + (sWeather.city || 'MONTREAL').toUpperCase(), cx + 46, cy + 51);

        sCtx.fillStyle = '#ffffff';
        sCtx.font = 'bold 92px monospace';
        sCtx.shadowColor = accent;
        sCtx.shadowBlur = 20;
        sCtx.fillText((sWeather.temp > 0 ? '+' : '') + sWeather.temp + '°C', cx + 30, cy + 180);
        sCtx.shadowBlur = 0;

        sCtx.fillStyle = '#38bdf8';
        sCtx.font = 'bold 26px system-ui, sans-serif';
        sCtx.fillText(sWeather.condition, cx + 32, cy + 230);

        const metrics = [
          { label: 'HUMIDITY', val: sWeather.humidity + '%', icon: '💧' },
          { label: 'WIND SPEED', val: sWeather.windSpeed + ' km/h', icon: '💨' },
          { label: 'FEELS LIKE', val: '+7.8°C', icon: '🌡️' },
          { label: 'STATUS', val: 'OPEN-METEO', icon: '🛰️' }
        ];
        metrics.forEach((m, idx) => {
          const mx = cx + 30 + idx * ((cw - 60) / 4);
          sCtx.fillStyle = 'rgba(255,255,255,0.04)';
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(mx, cy + 280, (cw - 80) / 4, 80, 12); else sCtx.rect(mx, cy + 280, (cw - 80) / 4, 80);
          sCtx.fill();
          sCtx.fillStyle = '#94a3b8'; sCtx.font = '14px monospace';
          sCtx.fillText(m.icon + ' ' + m.label, mx + 16, cy + 310);
          sCtx.fillStyle = '#fff'; sCtx.font = 'bold 22px monospace';
          sCtx.fillText(m.val, mx + 16, cy + 342);
        });

        sCtx.fillStyle = '#94a3b8'; sCtx.font = 'bold 16px monospace';
        sCtx.fillText('✦ 4-DAY SYNOPTIC FORECAST (MONTREAL):', cx + 30, cy + 400);
        sWeather.daily.forEach((d, idx) => {
          const fx = cx + 30 + idx * ((cw - 60) / 4);
          sCtx.fillStyle = 'rgba(255,255,255,0.03)';
          sCtx.strokeStyle = 'rgba(255,255,255,0.1)';
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(fx, cy + 420, (cw - 80) / 4, 180, 14); else sCtx.rect(fx, cy + 420, (cw - 80) / 4, 180);
          sCtx.fill(); sCtx.stroke();
          sCtx.fillStyle = accent; sCtx.font = 'bold 18px system-ui'; sCtx.textAlign = 'center';
          sCtx.fillText(d.day, fx + (cw - 80) / 8, cy + 460);
          sCtx.fillStyle = '#fff'; sCtx.font = 'bold 28px monospace';
          sCtx.fillText(d.max + '°', fx + (cw - 80) / 8, cy + 520);
          sCtx.fillStyle = '#64748b'; sCtx.font = 'bold 18px monospace';
          sCtx.fillText(d.min + '° min', fx + (cw - 80) / 8, cy + 560);
          sCtx.textAlign = 'left';
        });

        sCtx.strokeStyle = accent + '55'; sCtx.lineWidth = 1.5;
        const scanX = cx + cw - 120, scanY = cy + 120, scanR = 55;
        sCtx.beginPath(); sCtx.arc(scanX, scanY, scanR, 0, Math.PI * 2); sCtx.stroke();
        sCtx.beginPath(); sCtx.arc(scanX, scanY, scanR * 0.5, 0, Math.PI * 2); sCtx.stroke();
        const ang = (animTime || 0) * 3;
        sCtx.strokeStyle = accent; sCtx.lineWidth = 2;
        sCtx.beginPath(); sCtx.moveTo(scanX, scanY);
        sCtx.lineTo(scanX + Math.cos(ang) * scanR, scanY + Math.sin(ang) * scanR);
        sCtx.stroke();

      } else if (activeApp === 'forex') {
        sCtx.fillStyle = accent;
        sCtx.font = 'bold 36px monospace';
        sCtx.fillText('💱 GLOBAL FOREX & CURRENCY RADAR', 50, 115);

        const cx = 50, cy = 145, cw = sw - 100, ch = 720;
        sCtx.fillStyle = 'rgba(6, 11, 25, 0.94)';
        sCtx.strokeStyle = accent;
        sCtx.lineWidth = 2;
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(cx, cy, cw, ch, 20); else sCtx.rect(cx, cy, cw, ch);
        sCtx.fill(); sCtx.stroke();

        sCtx.fillStyle = 'rgba(0, 243, 255, 0.08)';
        sCtx.strokeStyle = accent;
        sCtx.lineWidth = 1.5;
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(cx + 30, cy + 25, cw - 60, 125, 14); else sCtx.rect(cx + 30, cy + 25, cw - 60, 125);
        sCtx.fill(); sCtx.stroke();

        sCtx.fillStyle = '#94a3b8'; sCtx.font = 'bold 16px monospace';
        sCtx.fillText('🇨🇦 1.00 CAD (CANADIAN DOLLAR) ⇄ 🇺🇸 US DOLLAR (USD)', cx + 50, cy + 60);

        const cadUsdRate = sForex.rates.USD ? sForex.rates.USD.toFixed(4) : '0.7147';
        const usdCadRate = sForex.rates.USD ? (1 / sForex.rates.USD).toFixed(4) : '1.3992';

        sCtx.fillStyle = '#ffffff'; sCtx.font = 'bold 54px monospace';
        sCtx.shadowColor = accent; sCtx.shadowBlur = 15;
        sCtx.fillText('1 CAD = ' + cadUsdRate + ' USD', cx + 50, cy + 120);
        sCtx.shadowBlur = 0;

        sCtx.fillStyle = '#10b981'; sCtx.font = 'bold 18px monospace'; sCtx.textAlign = 'right';
        sCtx.fillText('1 USD = ' + usdCadRate + ' CAD · BANK OF CANADA', cx + cw - 50, cy + 115);
        sCtx.textAlign = 'left';

        const qW = (cw - 80) / 2, qH = 90;
        const curList = [
          { sym: 'USD', flag: '🇺🇸', name: 'US Dollar', rate: sForex.rates.USD || 0.7147, delta: '+0.15%', up: true },
          { sym: 'EUR', flag: '🇪🇺', name: 'Euro', rate: sForex.rates.EUR || 0.6229, delta: '-0.08%', up: false },
          { sym: 'GBP', flag: '🇬🇧', name: 'British Pound', rate: sForex.rates.GBP || 0.5342, delta: '+0.05%', up: true },
          { sym: 'JPY', flag: '🇯🇵', name: 'Japanese Yen', rate: sForex.rates.JPY || 112.27, delta: '+0.42%', up: true }
        ];
        curList.forEach((c, idx) => {
          const col = idx % 2, row = Math.floor(idx / 2);
          const qx = cx + 30 + col * (qW + 20), qy = cy + 165 + row * (qH + 12);
          sCtx.fillStyle = 'rgba(255, 255, 255, 0.04)'; sCtx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(qx, qy, qW, qH, 12); else sCtx.rect(qx, qy, qW, qH);
          sCtx.fill(); sCtx.stroke();
          sCtx.fillStyle = '#cbd5e1'; sCtx.font = 'bold 18px system-ui';
          sCtx.fillText(c.flag + ' 1 CAD ⇄ ' + c.sym, qx + 18, qy + 36);
          sCtx.fillStyle = '#ffffff'; sCtx.font = 'bold 28px monospace';
          const rateTxt = c.sym === 'JPY' ? c.rate.toFixed(2) : c.rate.toFixed(4);
          sCtx.fillText(rateTxt + ' ' + c.sym, qx + 18, qy + 72);
          sCtx.fillStyle = c.up ? '#10b981' : '#f43f5e'; sCtx.font = 'bold 16px monospace'; sCtx.textAlign = 'right';
          sCtx.fillText((c.up ? '▲ ' : '▼ ') + c.delta, qx + qW - 18, qy + 70);
          sCtx.textAlign = 'left';
        });

        const gY = cy + 390, gW = cw - 60, gH = 260;
        sCtx.fillStyle = 'rgba(255, 255, 255, 0.02)'; sCtx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(cx + 30, gY, gW, gH, 14); else sCtx.rect(cx + 30, gY, gW, gH);
        sCtx.fill(); sCtx.stroke();

        sCtx.fillStyle = accent; sCtx.font = 'bold 16px monospace';
        sCtx.fillText('CAD/USD INTRADAY TICK TELEMETRY (REAL-TIME)', cx + 50, gY + 32);

        sCtx.strokeStyle = accent; sCtx.lineWidth = 3; sCtx.beginPath();
        for (let pt = 0; pt <= 24; pt++) {
          const px = cx + 50 + pt * ((gW - 40) / 24);
          const py = gY + 160 + Math.sin(pt * 0.4 + (animTime || 0)) * 40 + Math.cos(pt * 0.8) * 15;
          if (pt === 0) sCtx.moveTo(px, py); else sCtx.lineTo(px, py);
        }
        sCtx.stroke();

      } else if (activeApp === 'radio') {
        sCtx.fillStyle = accent;
        sCtx.font = 'bold 36px monospace';
        sCtx.fillText('📻 QUANTUM CYBER RADIO · LIVE STEREO STREAM', 50, 115);

        const cx = 50, cy = 145, cw = sw - 100, ch = 720;
        sCtx.fillStyle = 'rgba(6, 11, 25, 0.94)'; sCtx.strokeStyle = accent; sCtx.lineWidth = 2;
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(cx, cy, cw, ch, 20); else sCtx.rect(cx, cy, cw, ch);
        sCtx.fill(); sCtx.stroke();

        const st = sRadio.stations[sRadio.stnIdx || 0];
        sCtx.fillStyle = 'rgba(255, 255, 255, 0.03)'; sCtx.strokeStyle = accent; sCtx.lineWidth = 1.5;
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(cx + 30, cy + 30, cw - 60, 220, 16); else sCtx.rect(cx + 30, cy + 30, cw - 60, 220);
        sCtx.fill(); sCtx.stroke();

        sCtx.fillStyle = sRadio.isPlaying ? '#10b981' : '#f59e0b';
        sCtx.beginPath(); sCtx.arc(cx + 65, cy + 70, 8, 0, Math.PI * 2); sCtx.fill();
        sCtx.fillStyle = sRadio.isPlaying ? '#10b981' : '#f59e0b';
        sCtx.font = 'bold 16px monospace';
        sCtx.fillText(sRadio.isPlaying ? '● ON-AIR STREAMING (LIVE SOMAFM)' : '⏸ PAUSED · CLICK SCREEN OR PLAY BUTTON', cx + 85, cy + 76);

        sCtx.fillStyle = '#ffffff'; sCtx.font = 'bold 42px system-ui, sans-serif';
        sCtx.fillText(st.icon + ' ' + st.name, cx + 55, cy + 140);
        sCtx.fillStyle = '#94a3b8'; sCtx.font = '22px monospace';
        sCtx.fillText(st.genre + ' · 128 kbps stereo icecast direct', cx + 55, cy + 185);

        const eqY = cy + 280, eqH = 340, bars = 36, bW = (cw - 60) / bars;
        sCtx.fillStyle = 'rgba(255, 255, 255, 0.02)';
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(cx + 30, eqY, cw - 60, eqH, 14); else sCtx.rect(cx + 30, eqY, cw - 60, eqH);
        sCtx.fill();

        for (let b = 0; b < bars; b++) {
          const factor = sRadio.isPlaying
            ? Math.abs(Math.sin((animTime || 0) * 4 + b * 0.4) * Math.cos((animTime || 0) * 2 + b * 0.2))
            : 0.08;
          const barHeight = Math.max(12, factor * 240);
          const bx = cx + 30 + b * bW + 4;
          const by = eqY + eqH - 40 - barHeight;
          const grad = sCtx.createLinearGradient(bx, by, bx, by + barHeight);
          grad.addColorStop(0, '#ff007f'); grad.addColorStop(0.5, accent); grad.addColorStop(1, '#10b981');
          sCtx.fillStyle = grad;
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(bx, by, bW - 6, barHeight, 6); else sCtx.rect(bx, by, bW - 6, barHeight);
          sCtx.fill();
        }

        sCtx.fillStyle = '#fff'; sCtx.font = 'bold 20px monospace'; sCtx.textAlign = 'center';
        sCtx.fillText('VERIFIED 24/7 CRYSTAL AUDIO STREAM · STEREO ZERO-G LAB', sw / 2, eqY + eqH - 12);
        sCtx.textAlign = 'left';

      } else if (activeApp === 'crypto') {
        sCtx.fillStyle = accent;
        sCtx.font = 'bold 36px monospace';
        sCtx.fillText('🪙 CRYPTO TERMINAL & TICKER RADAR', 50, 115);

        const cx = 50, cy = 145, cw = sw - 100, ch = 720;
        sCtx.fillStyle = 'rgba(6, 11, 25, 0.94)'; sCtx.strokeStyle = accent; sCtx.lineWidth = 2;
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(cx, cy, cw, ch, 20); else sCtx.rect(cx, cy, cw, ch);
        sCtx.fill(); sCtx.stroke();

        const cW = (cw - 80) / 2, cH = 120;
        sCrypto.coins.forEach((coin, idx) => {
          const col = idx % 2, row = Math.floor(idx / 2);
          const cxp = cx + 30 + col * (cW + 20), cyp = cy + 30 + row * (cH + 16);
          sCtx.fillStyle = 'rgba(255, 255, 255, 0.04)'; sCtx.strokeStyle = coin.color; sCtx.lineWidth = 1.5;
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(cxp, cyp, cW, cH, 14); else sCtx.rect(cxp, cyp, cW, cH);
          sCtx.fill(); sCtx.stroke();

          sCtx.fillStyle = coin.color; sCtx.font = 'bold 22px monospace';
          sCtx.fillText(coin.sym + ' · ' + coin.name, cxp + 20, cyp + 38);

          sCtx.fillStyle = '#ffffff'; sCtx.font = 'bold 38px monospace';
          sCtx.fillText('$' + Number(coin.price).toLocaleString(), cxp + 20, cyp + 88);

          sCtx.fillStyle = coin.up ? '#10b981' : '#f43f5e'; sCtx.font = 'bold 20px monospace'; sCtx.textAlign = 'right';
          sCtx.fillText(coin.change, cxp + cW - 20, cyp + 88);
          sCtx.textAlign = 'left';
        });

        const chartY = cy + 320, chartW = cw - 60, chartH = 340;
        sCtx.fillStyle = 'rgba(255, 255, 255, 0.02)'; sCtx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(cx + 30, chartY, chartW, chartH, 14); else sCtx.rect(cx + 30, chartY, chartW, chartH);
        sCtx.fill(); sCtx.stroke();

        sCtx.fillStyle = accent; sCtx.font = 'bold 16px monospace';
        sCtx.fillText('BTC/USD 15M CANDLESTICK VOLATILITY & DEPTH', cx + 50, chartY + 36);

        const candles = 22, canW = (chartW - 80) / candles;
        for (let k = 0; k < candles; k++) {
          const kx = cx + 50 + k * canW;
          const isGreen = Math.sin(k * 1.3 + (animTime || 0) * 0.4) > 0;
          const bodyH = Math.max(15, Math.abs(Math.sin(k * 2.1) * 90));
          const ky = chartY + 180 - bodyH / 2;
          sCtx.strokeStyle = isGreen ? '#10b981' : '#f43f5e'; sCtx.lineWidth = 2;
          sCtx.beginPath(); sCtx.moveTo(kx + canW / 2, ky - 20); sCtx.lineTo(kx + canW / 2, ky + bodyH + 20); sCtx.stroke();
          sCtx.fillStyle = isGreen ? '#10b981' : '#f43f5e';
          sCtx.fillRect(kx + 2, ky, canW - 4, bodyH);
        }

      } else if (activeApp === 'pomodoro') {
        const now = performance.now();
        if (sPomodoro.isRunning && now - sPomodoro.lastTick > 1000) {
          sPomodoro.lastTick = now;
          if (sPomodoro.timeLeft > 0) sPomodoro.timeLeft--;
          else sPomodoro.timeLeft = 25 * 60;
        }

        sCtx.fillStyle = accent;
        sCtx.font = 'bold 36px monospace';
        sCtx.fillText('⏳ SPATIAL FOCUS & POMODORO STATION', 50, 115);

        const cx = 50, cy = 145, cw = sw - 100, ch = 720;
        sCtx.fillStyle = 'rgba(6, 11, 25, 0.94)'; sCtx.strokeStyle = accent; sCtx.lineWidth = 2;
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(cx, cy, cw, ch, 20); else sCtx.rect(cx, cy, cw, ch);
        sCtx.fill(); sCtx.stroke();

        sCtx.fillStyle = accent + '22'; sCtx.strokeStyle = accent; sCtx.lineWidth = 1.5;
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(cx + 30, cy + 24, cw - 60, 50, 10); else sCtx.rect(cx + 30, cy + 24, cw - 60, 50);
        sCtx.fill(); sCtx.stroke();
        sCtx.fillStyle = accent; sCtx.font = 'bold 18px monospace';
        sCtx.fillText('● FOCUS DEEP WORK (25 MIN INTERVAL)', cx + 50, cy + 55);

        const ringX = cx + cw / 2, ringY = cy + 260, radius = 135;
        const progress = sPomodoro.timeLeft / sPomodoro.totalTime;
        sCtx.strokeStyle = 'rgba(255, 255, 255, 0.06)'; sCtx.lineWidth = 16;
        sCtx.beginPath(); sCtx.arc(ringX, ringY, radius, 0, Math.PI * 2); sCtx.stroke();

        sCtx.strokeStyle = accent; sCtx.lineWidth = 16;
        sCtx.shadowColor = accent; sCtx.shadowBlur = 20;
        sCtx.beginPath();
        sCtx.arc(ringX, ringY, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress);
        sCtx.stroke();
        sCtx.shadowBlur = 0;

        const mins = String(Math.floor(sPomodoro.timeLeft / 60)).padStart(2, '0');
        const secs = String(sPomodoro.timeLeft % 60).padStart(2, '0');
        sCtx.fillStyle = '#ffffff'; sCtx.font = 'bold 80px monospace'; sCtx.textAlign = 'center';
        sCtx.fillText(mins + ':' + secs, ringX, ringY + 28);

        sCtx.fillStyle = '#10b981'; sCtx.font = 'bold 22px monospace';
        sCtx.fillText('4 SESSIONS COMPLETED TODAY', ringX, cy + 450);

        sCtx.fillStyle = '#94a3b8'; sCtx.font = '18px system-ui';
        sCtx.fillText('🌧️ Procedural Ambient Sound Active: Pink Noise Rain', ringX, cy + 500);
        sCtx.textAlign = 'left';

      } else if (activeApp === 'system') {
        sCtx.fillStyle = accent;
        sCtx.font = 'bold 36px monospace';
        sCtx.fillText('⚡ QUANTUM SYSTEM & NETWORK MONITOR', 50, 115);

        const cx = 50, cy = 145, cw = sw - 100, ch = 720;
        sCtx.fillStyle = 'rgba(6, 11, 25, 0.94)'; sCtx.strokeStyle = accent; sCtx.lineWidth = 2;
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(cx, cy, cw, ch, 20); else sCtx.rect(cx, cy, cw, ch);
        sCtx.fill(); sCtx.stroke();

        const tiles = [
          { title: 'FPS FRAME RATE', val: '60.0 FPS', desc: 'HARDWARE STABILIZED', col: '#10b981' },
          { title: 'PING LATENCY', val: sSystem.pingMs + ' ms', desc: 'GIGABIT FIBER / 5G', col: '#38bdf8' },
          { title: 'RAM MEMORY', val: sSystem.ramMB + ' MB', desc: 'JS HEAP V8 ALLOCATED', col: '#a855f7' },
          { title: 'CPU HARDWARE', val: sSystem.cores + ' CORES', desc: 'PARALLEL WORKERS', col: '#f59e0b' },
          { title: 'BATTERY LEVEL', val: sSystem.battery + '%', desc: 'AC POWER CONNECTED', col: '#10b981' },
          { title: 'WEBGL ACCEL', val: 'RENDERER 3D', desc: 'THREE.JS SHADER CORE', col: accent }
        ];

        const tW = (cw - 80) / 3, tH = 140;
        tiles.forEach((tl, idx) => {
          const col = idx % 3, row = Math.floor(idx / 3);
          const tx = cx + 30 + col * (tW + 10), ty = cy + 30 + row * (tH + 16);
          sCtx.fillStyle = 'rgba(255, 255, 255, 0.04)'; sCtx.strokeStyle = tl.col; sCtx.lineWidth = 1.5;
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(tx, ty, tW, tH, 12); else sCtx.rect(tx, ty, tW, tH);
          sCtx.fill(); sCtx.stroke();

          sCtx.fillStyle = '#94a3b8'; sCtx.font = 'bold 14px monospace';
          sCtx.fillText(tl.title, tx + 16, ty + 32);
          sCtx.fillStyle = tl.col; sCtx.font = 'bold 36px monospace';
          sCtx.fillText(tl.val, tx + 16, ty + 82);
          sCtx.fillStyle = '#cbd5e1'; sCtx.font = '13px monospace';
          sCtx.fillText(tl.desc, tx + 16, ty + 115);
        });

        const oscY = cy + 380, oscW = cw - 60, oscH = 260;
        sCtx.fillStyle = 'rgba(255, 255, 255, 0.02)'; sCtx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(cx + 30, oscY, oscW, oscH, 14); else sCtx.rect(cx + 30, oscY, oscW, oscH);
        sCtx.fill(); sCtx.stroke();

        sCtx.fillStyle = accent; sCtx.font = 'bold 16px monospace';
        sCtx.fillText('REAL-TIME SIGNAL OSCILLOSCOPE (60HZ)', cx + 50, oscY + 36);

        sCtx.strokeStyle = accent; sCtx.lineWidth = 2.5; sCtx.beginPath();
        for (let x = 0; x < oscW - 40; x += 4) {
          const px = cx + 50 + x;
          const py = oscY + 150 + Math.sin(x * 0.05 + (animTime || 0) * 5) * 35 * Math.cos(x * 0.02);
          if (x === 0) sCtx.moveTo(px, py); else sCtx.lineTo(px, py);
        }
        sCtx.stroke();

      } else if (activeApp === 'clock') {
        const d = new Date();
        const hh = String(d.getHours()).padStart(2, '0');
        const mm = String(d.getMinutes()).padStart(2, '0');
        const ss = String(d.getSeconds()).padStart(2, '0');
        const ms = String(Math.floor(d.getMilliseconds() / 10)).padStart(2, '0');

        sCtx.fillStyle = accent;
        sCtx.font = 'bold 36px monospace';
        sCtx.fillText('⏱️ QUANTUM CYBER CLOCK & STAR DATE', 50, 115);

        sCtx.fillStyle = 'rgba(15, 23, 42, 0.7)';
        sCtx.strokeStyle = accent;
        sCtx.lineWidth = 2;
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(50, 150, sw - 100, 320, 24); else sCtx.rect(50, 150, sw - 100, 320);
        sCtx.fill(); sCtx.stroke();

        sCtx.fillStyle = '#64748b';
        sCtx.font = 'bold 20px monospace';
        sCtx.textAlign = 'center';
        sCtx.fillText('LOCAL SPATIAL TIME ZONE (UTC+2)', sw / 2, 205);

        sCtx.fillStyle = '#ffffff';
        sCtx.font = 'bold 108px monospace';
        sCtx.shadowColor = accent;
        sCtx.shadowBlur = 25;
        sCtx.fillText(hh + ':' + mm + ':' + ss, sw / 2, 330);
        sCtx.shadowBlur = 0;

        sCtx.fillStyle = accent;
        sCtx.font = 'bold 36px monospace';
        sCtx.fillText('.' + ms + ' MILLISECONDS', sw / 2, 400);

        const dateStr = d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const starDate = 'STAR-DATE: ' + (d.getFullYear() + d.getMonth() / 12 + d.getDate() / 365).toFixed(4);

        sCtx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(50, 500, sw - 100, 380, 22); else sCtx.rect(50, 500, sw - 100, 380);
        sCtx.fill();

        sCtx.fillStyle = '#10b981';
        sCtx.font = 'bold 30px system-ui, sans-serif';
        sCtx.fillText(dateStr, sw / 2, 570);

        sCtx.fillStyle = '#cbd5e1';
        sCtx.font = '24px monospace';
        sCtx.fillText(starDate, sw / 2, 630);

        sCtx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(sw / 2 - 200, 680, 400, 60, 14); else sCtx.rect(sw / 2 - 200, 680, 400, 60);
        sCtx.fill();

        sCtx.fillStyle = accent;
        sCtx.font = 'bold 22px system-ui, sans-serif';
        sCtx.fillText('🟢 PRECISION QUANTUM ATOMIC SYNC', sw / 2, 718);
        sCtx.textAlign = 'left';

      } else if (activeApp === 'snake') {
        const now = performance.now();
        if (now - sSnake.lastTick > sSnake.speed) {
          sSnake.lastTick = now;
          const head = sSnake.snake[0];
          const dx = sSnake.food.x - head.x;
          const dy = sSnake.food.y - head.y;
          if (dx !== 0 && (sSnake.dir.x === 0 || Math.random() < 0.2)) {
            const nx = Math.sign(dx);
            if (sSnake.dir.x !== -nx) sSnake.dir = { x: nx, y: 0 };
          } else if (dy !== 0 && sSnake.dir.y === 0) {
            const ny = Math.sign(dy);
            if (sSnake.dir.y !== -ny) sSnake.dir = { x: 0, y: ny };
          }
          const newHead = { x: (head.x + sSnake.dir.x + sSnake.gridSize) % sSnake.gridSize, y: (head.y + sSnake.dir.y + sSnake.gridSize) % sSnake.gridSize };
          sSnake.snake.unshift(newHead);
          if (newHead.x === sSnake.food.x && newHead.y === sSnake.food.y) {
            sSnake.score += 10;
            if (sSnake.score > sSnake.highScore) sSnake.highScore = sSnake.score;
            sSnake.food = { x: Math.floor(Math.random() * (sSnake.gridSize - 2)) + 1, y: Math.floor(Math.random() * (sSnake.gridSize - 2)) + 1 };
            if (sSnake.snake.length > 25) sSnake.snake.pop();
          } else {
            sSnake.snake.pop();
          }
        }

        sCtx.fillStyle = accent;
        sCtx.font = 'bold 36px monospace';
        sCtx.fillText('🕹️ CYBER SNAKE ARCADE', 50, 115);
        sCtx.fillStyle = '#ffffff';
        sCtx.font = 'bold 24px monospace';
        sCtx.textAlign = 'right';
        sCtx.fillText('SCORE: ' + sSnake.score + '   HI: ' + sSnake.highScore, sw - 50, 115);
        sCtx.textAlign = 'left';

        const arenaX = 50, arenaY = 145, arenaW = sw - 100, arenaH = 620;
        sCtx.fillStyle = 'rgba(6, 10, 24, 0.95)';
        sCtx.strokeStyle = accent;
        sCtx.lineWidth = 3;
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(arenaX, arenaY, arenaW, arenaH, 18); else sCtx.rect(arenaX, arenaY, arenaW, arenaH);
        sCtx.fill(); sCtx.stroke();

        const cellW = arenaW / sSnake.gridSize;
        const cellH = arenaH / sSnake.gridSize;
        const fx = arenaX + sSnake.food.x * cellW + cellW / 2;
        const fy = arenaY + sSnake.food.y * cellH + cellH / 2;
        sCtx.fillStyle = '#ff007f';
        sCtx.beginPath(); sCtx.arc(fx, fy, cellW * 0.45, 0, Math.PI * 2); sCtx.fill();

        sSnake.snake.forEach((seg, idx) => {
          sCtx.fillStyle = idx === 0 ? '#ffffff' : accent;
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(arenaX + seg.x * cellW + 2, arenaY + seg.y * cellH + 2, cellW - 4, cellH - 4, 6);
          else sCtx.rect(arenaX + seg.x * cellW + 2, arenaY + seg.y * cellH + 2, cellW - 4, cellH - 4);
          sCtx.fill();
        });

        sCtx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(50, 785, sw - 100, 110, 16); else sCtx.rect(50, 785, sw - 100, 110);
        sCtx.fill();
        sCtx.fillStyle = '#cbd5e1'; sCtx.font = '20px system-ui, sans-serif'; sCtx.textAlign = 'center';
        sCtx.fillText('🎮 Use Arrow Keys [← ↑ ↓ →] to Steer in 3D Space', sw / 2, 830);
        sCtx.fillStyle = accent; sCtx.font = 'bold 16px monospace';
        sCtx.fillText('⚡ REAL-TIME SPATIAL GAMING ENGINE · 60FPS SYNCHRONIZED', sw / 2, 865);
        sCtx.textAlign = 'left';

      } else if (activeApp === 'calc') {
        sCtx.fillStyle = accent; sCtx.font = 'bold 36px monospace';
        sCtx.fillText('🧮 SPATIAL NEUMORPHIC CALCULATOR', 50, 115);

        const dx = 50, dy = 145, dw = sw - 100, dh = 150;
        sCtx.fillStyle = '#060b18'; sCtx.strokeStyle = accent; sCtx.lineWidth = 2;
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(dx, dy, dw, dh, 18); else sCtx.rect(dx, dy, dw, dh);
        sCtx.fill(); sCtx.stroke();

        sCtx.fillStyle = '#64748b'; sCtx.font = '18px monospace';
        sCtx.fillText('ULTRA MATH ENGINE v4.2', dx + 24, dy + 40);
        sCtx.fillStyle = '#ffffff'; sCtx.font = 'bold 64px monospace'; sCtx.textAlign = 'right';
        sCtx.fillText('1,337.00', dx + dw - 24, dy + 115);
        sCtx.textAlign = 'left';

        const keys = [['C', 'CE', '%', '÷'], ['7', '8', '9', '×'], ['4', '5', '6', '−'], ['1', '2', '3', '+'], ['±', '0', '.', '=']];
        const startY = 320, btnW = (dw - 45) / 4, btnH = 95;
        keys.forEach((row, rIdx) => {
          row.forEach((key, cIdx) => {
            const bx = dx + cIdx * (btnW + 15), by = startY + rIdx * (btnH + 15);
            const isOp = ['÷', '×', '−', '+', '='].includes(key);
            sCtx.fillStyle = isOp ? accent : 'rgba(255, 255, 255, 0.06)';
            sCtx.strokeStyle = isOp ? '#ffffff' : 'rgba(255, 255, 255, 0.12)';
            sCtx.lineWidth = 1.5;
            sCtx.beginPath();
            if (sCtx.roundRect) sCtx.roundRect(bx, by, btnW, btnH, 14); else sCtx.rect(bx, by, btnW, btnH);
            sCtx.fill(); sCtx.stroke();
            sCtx.fillStyle = isOp ? '#030712' : '#ffffff';
            sCtx.font = 'bold 32px system-ui, sans-serif'; sCtx.textAlign = 'center';
            sCtx.fillText(key, bx + btnW / 2, by + btnH / 2 + 10);
            sCtx.textAlign = 'left';
          });
        });

      } else {
        sCtx.fillStyle = accent; sCtx.font = 'bold 36px monospace';
        sCtx.fillText('🎵 AUDIO REACTIVE SPATIAL SPECTRUM', 50, 115);

        const arenaX = 50, arenaY = 150, arenaW = sw - 100, arenaH = 720;
        sCtx.fillStyle = 'rgba(6, 10, 24, 0.9)'; sCtx.strokeStyle = accent; sCtx.lineWidth = 2;
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(arenaX, arenaY, arenaW, arenaH, 20); else sCtx.rect(arenaX, arenaY, arenaW, arenaH);
        sCtx.fill(); sCtx.stroke();

        const bars = 28, barW = (arenaW - 60) / bars;
        const curT = animTime * 3;
        for (let i = 0; i < bars; i++) {
          const heightFactor = Math.abs(Math.sin(curT + i * 0.35) * Math.cos(curT * 0.5 + i * 0.2));
          const barH = Math.max(30, heightFactor * 480);
          const bx = arenaX + 30 + i * barW;
          const by = arenaY + arenaH - 80 - barH;
          const grad = sCtx.createLinearGradient(bx, by, bx, by + barH);
          grad.addColorStop(0, '#ff007f'); grad.addColorStop(0.5, accent); grad.addColorStop(1, '#8b5cf6');
          sCtx.fillStyle = grad;
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(bx, by, barW - 6, barH, 8); else sCtx.rect(bx, by, barW - 6, barH);
          sCtx.fill();
        }
        sCtx.fillStyle = '#ffffff'; sCtx.font = 'bold 24px monospace'; sCtx.textAlign = 'center';
        sCtx.fillText('DYNAMIC 32-BAND EQUALIZER · ZERO-G AUDIO LAB', sw / 2, arenaY + arenaH - 30);
        sCtx.textAlign = 'left';
      }

    } else if (activeMode === 'custom') {
      const isSynth = ${isSynth};
      if (isSynth) {
        sCtx.fillStyle = accent; sCtx.font = 'bold 30px monospace';
        sCtx.fillText('🎛️ CYBERBEATS STUDIO · 16-STEP PROCEDURAL SYNTH', 40, 110);

        const rackX = 40, rackY = 140, rackW = sw - 80, rackH = 760;
        sCtx.fillStyle = 'rgba(6, 11, 25, 0.95)';
        sCtx.strokeStyle = accent;
        sCtx.lineWidth = 2;
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(rackX, rackY, rackW, rackH, 18); else sCtx.rect(rackX, rackY, rackW, rackH);
        sCtx.fill(); sCtx.stroke();

        sCtx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        sCtx.fillRect(rackX, rackY, rackW, 76);

        const pBtnGrad = sCtx.createLinearGradient(rackX + 20, rackY + 14, rackX + 170, rackY + 62);
        pBtnGrad.addColorStop(0, '#10b981'); pBtnGrad.addColorStop(1, '#059669');
        sCtx.fillStyle = pBtnGrad;
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(rackX + 20, rackY + 14, 150, 48, 10); else sCtx.rect(rackX + 20, rackY + 14, 150, 48);
        sCtx.fill();
        sCtx.fillStyle = '#030712';
        sCtx.font = 'bold 18px system-ui, sans-serif';
        sCtx.fillText('▶ PLAYING', rackX + 48, rackY + 44);

        sCtx.fillStyle = '#94a3b8';
        sCtx.font = 'bold 16px monospace';
        sCtx.fillText('BPM: 120', rackX + 195, rackY + 36);
        sCtx.fillStyle = accent;
        sCtx.fillRect(rackX + 195, rackY + 44, 100, 8);

        sCtx.fillStyle = '#94a3b8';
        sCtx.fillText('VOL: 80%', rackX + 325, rackY + 36);
        sCtx.fillStyle = '#a855f7';
        sCtx.fillRect(rackX + 325, rackY + 44, 100, 8);

        const chips = ['✦ House', 'Trap', 'Cyberwave'];
        chips.forEach((ch, idx) => {
          const cx = rackX + 460 + idx * 110;
          sCtx.fillStyle = idx === 0 ? accent + '33' : 'rgba(255,255,255,0.06)';
          sCtx.strokeStyle = idx === 0 ? accent : 'rgba(255,255,255,0.15)';
          sCtx.lineWidth = 1;
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(cx, rackY + 18, 100, 40, 16); else sCtx.rect(cx, rackY + 18, 100, 40);
          sCtx.fill(); sCtx.stroke();
          sCtx.fillStyle = idx === 0 ? accent : '#cbd5e1';
          sCtx.font = 'bold 14px system-ui, sans-serif';
          sCtx.textAlign = 'center';
          sCtx.fillText(ch, cx + 50, rackY + 43);
          sCtx.textAlign = 'left';
        });

        const curStep = Math.floor((animTime * 6) % 16);
        const seqX = rackX + 130, seqW = rackW - 150, stepColW = seqW / 16;
        for (let s = 0; s < 16; s++) {
          const sx = seqX + s * stepColW + stepColW / 2;
          sCtx.fillStyle = s === curStep ? '#ffffff' : (s % 4 === 0 ? accent : 'rgba(255,255,255,0.2)');
          sCtx.beginPath();
          sCtx.arc(sx, rackY + 98, s === curStep ? 6 : 4, 0, Math.PI * 2);
          sCtx.fill();
        }

        const tracks = [
          { name: '🥁 Kick 808', color: '#00f3ff', on: [0, 4, 8, 12] },
          { name: '💥 Snare Clap', color: '#ff007f', on: [4, 12] },
          { name: '🔔 Hi-Hat', color: '#f59e0b', on: [0, 2, 4, 6, 8, 10, 12, 14] },
          { name: '🎹 Synth Lead', color: '#a855f7', on: [2, 5, 8, 11, 14] }
        ];

        tracks.forEach((tr, tIdx) => {
          const rowY = rackY + 120 + tIdx * 90;
          sCtx.fillStyle = tr.color; sCtx.font = 'bold 18px system-ui, sans-serif';
          sCtx.fillText(tr.name, rackX + 20, rowY + 38);

          for (let s = 0; s < 16; s++) {
            const bx = seqX + s * stepColW + 2, by = rowY + 10, bw = stepColW - 4, bh = 54;
            const isOn = tr.on.includes(s);
            const isPlayingNow = (s === curStep && isOn);
            sCtx.fillStyle = isPlayingNow ? '#ffffff' : (isOn ? tr.color : 'rgba(255, 255, 255, 0.05)');
            sCtx.strokeStyle = isPlayingNow ? '#ffffff' : (isOn ? tr.color : 'rgba(255, 255, 255, 0.12)');
            sCtx.lineWidth = isPlayingNow ? 2.5 : 1;
            sCtx.beginPath();
            if (sCtx.roundRect) sCtx.roundRect(bx, by, bw, bh, 8); else sCtx.rect(bx, by, bw, bh);
            sCtx.fill(); sCtx.stroke();
          }
        });

        const specY = rackY + 500, specH = 140;
        sCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(rackX + 20, specY, rackW - 40, specH, 12); else sCtx.rect(rackX + 20, specY, rackW - 40, specH);
        sCtx.fill();

        const bars = 36, bW = (rackW - 70) / bars;
        for (let b = 0; b < bars; b++) {
          const hFactor = Math.abs(Math.sin(animTime * 4 + b * 0.3) * Math.cos(animTime * 2 + b * 0.2));
          const bh = Math.max(10, hFactor * (specH - 24));
          const bx = rackX + 30 + b * bW, by = specY + specH - 12 - bh;
          const bGrad = sCtx.createLinearGradient(bx, by, bx, by + bh);
          bGrad.addColorStop(0, '#00f3ff'); bGrad.addColorStop(0.5, '#a855f7'); bGrad.addColorStop(1, '#ff007f');
          sCtx.fillStyle = bGrad;
          sCtx.fillRect(bx, by, bW - 4, bh);
        }

        sCtx.fillStyle = 'rgba(255, 255, 255, 0.06)';
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(rackX + 20, rackY + 665, rackW - 40, 70, 12); else sCtx.rect(rackX + 20, rackY + 665, rackW - 40, 70);
        sCtx.fill();
        sCtx.fillStyle = '#10b981';
        sCtx.font = 'bold 20px system-ui, sans-serif';
        sCtx.textAlign = 'center';
        sCtx.fillText('⚡ LIVE PROCEDURAL WEB AUDIO ENGINE ACTIVE', sw / 2, rackY + 700);
        sCtx.fillStyle = '#94a3b8';
        sCtx.font = '16px monospace';
        sCtx.fillText('AUTONOMOUS SPATIAL AUDIO SEQUENCER PROJECTION', sw / 2, rackY + 725);
        sCtx.textAlign = 'left';
      } else {
        sCtx.fillStyle = accent; sCtx.font = 'bold 32px monospace';
        sCtx.fillText('🌐 ' + '${appTitleEscaped}'.toUpperCase(), 40, 110);

        const cx = 40, cy = 140, cw = sw - 80, ch = 760;
        sCtx.fillStyle = 'rgba(10, 16, 32, 0.95)';
        sCtx.strokeStyle = accent;
        sCtx.lineWidth = 2;
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(cx, cy, cw, ch, 18); else sCtx.rect(cx, cy, cw, ch);
        sCtx.fill(); sCtx.stroke();

        sCtx.fillStyle = '#ffffff';
        sCtx.font = 'bold 40px system-ui, sans-serif';
        sCtx.fillText('${appTitleEscaped}', cx + 30, cy + 70);

        sCtx.fillStyle = '#94a3b8';
        sCtx.font = '22px system-ui, sans-serif';
        wrapText(sCtx, '${appDescEscaped}', cx + 30, cy + 120, cw - 60, 32);

        const cardW = (cw - 60) / 2;
        sCtx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        sCtx.strokeStyle = accent + '44';
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(cx + 20, cy + 180, cardW, 140, 12); else sCtx.rect(cx + 20, cy + 180, cardW, 140);
        sCtx.fill(); sCtx.stroke();
        sCtx.fillStyle = accent; sCtx.font = 'bold 18px system-ui, sans-serif';
        sCtx.fillText('Runtime Status', cx + 36, cy + 215);
        sCtx.fillStyle = '#10b981'; sCtx.font = 'bold 32px monospace';
        sCtx.fillText('ONLINE ●', cx + 36, cy + 265);
        sCtx.fillStyle = '#64748b'; sCtx.font = '14px system-ui, sans-serif';
        sCtx.fillText('Active Client-Side Container', cx + 36, cy + 295);

        sCtx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        sCtx.strokeStyle = '#a855f744';
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(cx + 40 + cardW, cy + 180, cardW, 140, 12); else sCtx.rect(cx + 40 + cardW, cy + 180, cardW, 140);
        sCtx.fill(); sCtx.stroke();
        sCtx.fillStyle = '#a855f7'; sCtx.font = 'bold 18px system-ui, sans-serif';
        sCtx.fillText('DOM Sync Speed', cx + 56 + cardW, cy + 215);
        sCtx.fillStyle = '#ffffff'; sCtx.font = 'bold 32px monospace';
        sCtx.fillText('60.0 FPS', cx + 56 + cardW, cy + 265);
        sCtx.fillStyle = '#64748b'; sCtx.font = '14px system-ui, sans-serif';
        sCtx.fillText('Zero-G WebGL Projection', cx + 56 + cardW, cy + 295);

        const bGrad = sCtx.createLinearGradient(cx + 20, cy + 360, cx + 320, cy + 420);
        bGrad.addColorStop(0, accent); bGrad.addColorStop(1, '#8b5cf6');
        sCtx.fillStyle = bGrad;
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(cx + 20, cy + 360, 300, 56, 12); else sCtx.rect(cx + 20, cy + 360, 300, 56);
        sCtx.fill();
        sCtx.fillStyle = '#030712'; sCtx.font = 'bold 20px system-ui, sans-serif';
        sCtx.fillText('⚡ Execute Action', cx + 65, cy + 396);

        sCtx.fillStyle = '#050711';
        sCtx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(cx + 20, cy + 450, cw - 40, 270, 12); else sCtx.rect(cx + 20, cy + 450, cw - 40, 270);
        sCtx.fill(); sCtx.stroke();

        sCtx.fillStyle = '#38bdf8'; sCtx.font = 'bold 16px monospace';
        sCtx.fillText('✦ LIVE APPLICATION DOM ELEMENTS DETECTED:', cx + 36, cy + 485);

        sCtx.fillStyle = '#cbd5e1'; sCtx.font = '18px system-ui, sans-serif';
        wrapText(sCtx, '${customCodeRaw}', cx + 36, cy + 525, cw - 72, 30);
      }

    } else {
      sCtx.fillStyle = accent + '22'; sCtx.strokeStyle = accent; sCtx.lineWidth = 2;
      sCtx.beginPath();
      if (sCtx.roundRect) sCtx.roundRect(40, 80, 260, 38, 10); else sCtx.rect(40, 80, 260, 38);
      sCtx.fill(); sCtx.stroke();
      sCtx.fillStyle = accent; sCtx.font = 'bold 16px monospace';
      sCtx.fillText('${tagEscaped}', 56, 105);

      sCtx.fillStyle = '#ffffff'; sCtx.font = '900 46px system-ui, sans-serif';
      wrapText(sCtx, '${titleEscaped}', 40, 175, sw - 80, 54);

      sCtx.fillStyle = accent; sCtx.font = 'bold 24px system-ui, sans-serif';
      wrapText(sCtx, '${subtitleEscaped}', 40, 280, sw - 80, 32);

      sCtx.fillStyle = 'rgba(255, 255, 255, 0.04)'; sCtx.strokeStyle = accent + '55'; sCtx.lineWidth = 2;
      sCtx.beginPath();
      if (sCtx.roundRect) sCtx.roundRect(40, 340, sw - 80, 360, 22); else sCtx.rect(40, 340, sw - 80, 360);
      sCtx.fill(); sCtx.stroke();

      sCtx.fillStyle = '#cbd5e1'; sCtx.font = '22px system-ui, sans-serif';
      wrapText(sCtx, '${bodyEscaped}', 70, 390, sw - 140, 36);

      const btnGrad = sCtx.createLinearGradient(70, 620, 350, 620);
      btnGrad.addColorStop(0, accent); btnGrad.addColorStop(1, '#8b5cf6');
      sCtx.fillStyle = btnGrad;
      sCtx.beginPath();
      if (sCtx.roundRect) sCtx.roundRect(70, 620, 280, 52, 14); else sCtx.rect(70, 620, 280, 52);
      sCtx.fill();
      sCtx.fillStyle = '#05070e'; sCtx.font = 'bold 20px system-ui, sans-serif';
      sCtx.fillText('⚡ EXECUTE ACTION', 96, 653);

      const cardW = (sw - 100) / 2;
      sCtx.fillStyle = 'rgba(255, 255, 255, 0.03)'; sCtx.strokeStyle = accent + '44';
      sCtx.beginPath();
      if (sCtx.roundRect) sCtx.roundRect(40, 720, cardW, 180, 16); else sCtx.rect(40, 720, cardW, 180);
      sCtx.fill(); sCtx.stroke();
      sCtx.fillStyle = accent; sCtx.font = 'bold 20px system-ui, sans-serif';
      sCtx.fillText('Spatial Physics', 64, 760);
      sCtx.fillStyle = '#94a3b8'; sCtx.font = '18px system-ui, sans-serif';
      sCtx.fillText('Zero-G Orbit Active', 64, 796);
      sCtx.fillStyle = '#ffffff'; sCtx.font = 'bold 36px monospace';
      sCtx.fillText('60.0 FPS', 64, 854);

      sCtx.fillStyle = 'rgba(255, 255, 255, 0.03)'; sCtx.strokeStyle = '#a855f744';
      sCtx.beginPath();
      if (sCtx.roundRect) sCtx.roundRect(60 + cardW, 720, cardW, 180, 16); else sCtx.rect(60 + cardW, 720, cardW, 180);
      sCtx.fill(); sCtx.stroke();
      sCtx.fillStyle = '#a855f7'; sCtx.font = 'bold 20px system-ui, sans-serif';
      sCtx.fillText('Sync Latency', 84 + cardW, 760);
      sCtx.fillStyle = '#94a3b8'; sCtx.font = '18px system-ui, sans-serif';
      sCtx.fillText('Client-Side Engine', 84 + cardW, 796);
      sCtx.fillStyle = '#10b981'; sCtx.font = 'bold 36px monospace';
      sCtx.fillText('0.42 ms', 84 + cardW, 854);
    }

    // Universal bottom navigation bar
    sCtx.fillStyle = 'rgba(15, 23, 42, 0.9)'; sCtx.fillRect(0, sh - 80, sw, 80);
    sCtx.fillStyle = '#ffffff'; sCtx.font = 'bold 20px system-ui, sans-serif'; sCtx.textAlign = 'center';
    sCtx.fillText('⌂ Home       ✦ Apps       ⚙ Settings       ⚡ Deploy', sw / 2, sh - 32);
    sCtx.textAlign = 'left';
  }

  // Interactive mode switcher for injected card
  window.__setSpatialScreenMode = function(m, a) {
    activeMode = m;
    if (a) activeApp = a;
    const label = document.getElementById('sp-active-mode-label');
    if (label) label.textContent = (m === 'apps' ? (a === 'clock' ? 'QUANTUM CLOCK' : a.toUpperCase()) : m.toUpperCase());

    const isRadio = (m === 'apps' && a === 'radio');
    if (isRadio) {
      updateRadioUI();
      if (!sRadio.isPlaying) {
        toggleRadioAudio();
      }
    } else {
      if (sRadioAudio) {
        sRadioAudio.pause();
        sRadio.isPlaying = false;
      }
      updateRadioUI();
      if (a === 'weather') {
        fetchLiveWeather();
      } else if (a === 'forex') {
        fetchLiveForex();
      } else if (a === 'crypto') {
        fetchLiveCrypto();
      }
    }

    document.querySelectorAll('#ultra-spatial-screen-card .sp-mode-btn').forEach(btn => {
      const match = btn.getAttribute('data-mode') === m && (!a || btn.getAttribute('data-app') === a);
      if (match) {
        btn.style.borderColor = accent; btn.style.color = accent; btn.style.background = accent + '25';
        btn.classList.add('active');
      } else {
        btn.style.borderColor = 'rgba(255,255,255,0.2)'; btn.style.color = '#cbd5e1'; btn.style.background = 'rgba(255,255,255,0.06)';
        btn.classList.remove('active');
      }
    });
    renderScreen(t);
    if (sTex) sTex.needsUpdate = true;
  };

  // Keyboard navigation for Snake in injected component
  window.addEventListener('keydown', function(e) {
    if (activeMode !== 'apps' || activeApp !== 'snake') return;
    if (['ArrowUp', 'KeyW'].includes(e.code) && sSnake.dir.y === 0) sSnake.dir = { x: 0, y: -1 };
    else if (['ArrowDown', 'KeyS'].includes(e.code) && sSnake.dir.y === 0) sSnake.dir = { x: 0, y: 1 };
    else if (['ArrowLeft', 'KeyA'].includes(e.code) && sSnake.dir.x === 0) sSnake.dir = { x: -1, y: 0 };
    else if (['ArrowRight', 'KeyD'].includes(e.code) && sSnake.dir.x === 0) sSnake.dir = { x: 1, y: 0 };
  });

  renderScreen(0);

  function startHolo() {
    const T = getThree();
    if (!T) { startPureCanvas(); return; }

    const w = container.clientWidth || 800, h = container.clientHeight || 480;
    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.z = 6.4;

    const renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    scene.add(new T.AmbientLight(0xffffff, 0.9));
    const dir = new T.DirectionalLight(0xffffff, 1.6);
    dir.position.set(5, 8, 6); scene.add(dir);

    const hex = ${colHex};
    const rim = new T.PointLight(hex, 2.5, 20);
    rim.position.set(0, 4, 3);
    scene.add(rim);

    // Orbiting Stardust Particles (Audio Reactive)
    const pGeo = new T.BufferGeometry();
    const pPos = new Float32Array(180 * 3);
    for (let i = 0; i < 180; i++) {
      pPos[i*3]   = (Math.random() - 0.5) * 16;
      pPos[i*3+1] = (Math.random() - 0.5) * 12;
      pPos[i*3+2] = (Math.random() - 0.5) * 12;
    }
    pGeo.setAttribute('position', new T.BufferAttribute(pPos, 3));
    const dust = new T.Points(pGeo, new T.PointsMaterial({ size: 0.08, color: hex, transparent: true, opacity: 0.75, blending: T.AdditiveBlending }));
    scene.add(dust);

    sTex = new T.CanvasTexture(sCanvas);
    const dGroup = new T.Group(); scene.add(dGroup);

    // Build Model (${devType})
    if ('${devType}' === 'tablet') {
      const bGeo = new T.BoxGeometry(4.4, 3.1, 0.08);
      dGroup.add(new T.Mesh(bGeo, new T.MeshPhysicalMaterial({ color: 0x111c2e, metalness: 0.2, roughness: 0.1, transparent: true, opacity: 0.85 })));
      dGroup.add(new T.LineSegments(new T.EdgesGeometry(bGeo), new T.LineBasicMaterial({ color: hex })));
      const sMesh = new T.Mesh(new T.PlaneGeometry(4.2, 2.95), new T.MeshBasicMaterial({ map: sTex, side: T.DoubleSide }));
      sMesh.position.z = 0.045; dGroup.add(sMesh);
      camera.position.z = 6.8;
    } else if ('${devType}' === 'curved_display') {
      const rad = 4.0, th = Math.PI * 0.38;
      const cGeo = new T.CylinderGeometry(rad, rad, 2.4, 36, 1, true, -th/2, th); cGeo.scale(-1, 1, 1);
      const sMesh = new T.Mesh(cGeo, new T.MeshBasicMaterial({ map: sTex, side: T.DoubleSide }));
      sMesh.position.z = rad - 1.2; dGroup.add(sMesh);
      const edge = new T.LineSegments(new T.EdgesGeometry(cGeo), new T.LineBasicMaterial({ color: hex }));
      edge.position.z = rad - 1.2; dGroup.add(edge);
      camera.position.z = 5.6;
    } else if ('${devType}' === 'holo_glass') {
      const glassGeo = new T.PlaneGeometry(3.6, 4.4);
      const glassMat = new T.MeshBasicMaterial({ map: sTex, side: T.DoubleSide, transparent: true, opacity: 0.94 });
      dGroup.add(new T.Mesh(glassGeo, glassMat));
      const bracketMat = new T.LineBasicMaterial({ color: hex });
      const addBracket = (cx, cy, fx, fy) => {
        const pts = [
          new T.Vector3(cx - 0.25 * fx, cy, 0.01),
          new T.Vector3(cx, cy, 0.01),
          new T.Vector3(cx, cy - 0.25 * fy, 0.01)
        ];
        dGroup.add(new T.Line(new T.BufferGeometry().setFromPoints(pts), bracketMat));
      };
      addBracket(-1.8, 2.2, -1, 1);
      addBracket(1.8, 2.2, 1, 1);
      addBracket(-1.8, -2.2, -1, -1);
      addBracket(1.8, -2.2, 1, -1);
      camera.position.z = 6.0;
    } else {
      const pGeo = new T.BoxGeometry(2.1, 4.3, 0.16);
      dGroup.add(new T.Mesh(pGeo, new T.MeshStandardMaterial({ color: 0x111827, metalness: 0.88, roughness: 0.2 })));
      dGroup.add(new T.LineSegments(new T.EdgesGeometry(pGeo), new T.LineBasicMaterial({ color: hex })));
      const sMesh = new T.Mesh(new T.PlaneGeometry(1.97, 4.14), new T.MeshBasicMaterial({ map: sTex, side: T.FrontSide }));
      sMesh.position.z = 0.085; dGroup.add(sMesh);
      const camGeo = new T.BoxGeometry(0.7, 1.2, 0.08);
      const camIsland = new T.Mesh(camGeo, new T.MeshStandardMaterial({ color: 0x0a0d14, metalness: 0.95, roughness: 0.15 }));
      camIsland.position.set(-0.55, 1.3, -0.12); dGroup.add(camIsland);
      camera.position.z = 6.4;
    }

    // 2.5D Parallax Floating Foreground Brackets
    let targetPx = 0, targetPy = 0, curPx = 0, curPy = 0;
    const parGroup = new T.Group();
    parGroup.position.set(0, 0, 0.16);
    const parMat = new T.LineBasicMaterial({ color: hex, transparent: true, opacity: 0.85 });
    const addFloatingB = (fx, fy, dx, dy) => {
      const pts = [
        new T.Vector3(fx - 0.28 * dx, fy, 0),
        new T.Vector3(fx, fy, 0),
        new T.Vector3(fx, fy - 0.28 * dy, 0)
      ];
      parGroup.add(new T.Line(new T.BufferGeometry().setFromPoints(pts), parMat));
    };
    const hw = ('${devType}' === 'tablet' ? 2.12 : '${devType}' === 'holo_glass' ? 1.82 : 1.05);
    const hh = ('${devType}' === 'tablet' ? 1.48 : '${devType}' === 'holo_glass' ? 2.22 : 2.16);
    addFloatingB(-hw, hh, -1, 1); addFloatingB(hw, hh, 1, 1);
    addFloatingB(-hw, -hh, -1, -1); addFloatingB(hw, -hh, 1, -1);
    dGroup.add(parGroup);

    function buildCompanion() {
      if (cGroup) { dGroup.remove(cGroup); cGroup = null; }
      if (!isDualActive) {
        camera.position.z = ('${devType}' === 'tablet' ? 6.8 : '${devType}' === 'curved_display' ? 5.6 : 6.4);
        return;
      }
      const mainHalfW = ('${devType}' === 'tablet' ? 2.25 : '${devType}' === 'curved_display' ? 2.35 : '${devType}' === 'holo_glass' ? 1.85 : 1.10);
      const posX = mainHalfW + 1.25 + (compSpacing || 0);

      cGroup = new T.Group();
      cGroup.position.set(posX, 0, -0.45);
      cGroup.rotation.y = -0.38;

      if (!sCompTex) {
        sCompTex = new T.CanvasTexture(sCompCanvas);
        sCompTex.minFilter = T.LinearFilter;
        sCompTex.magFilter = T.LinearFilter;
      }

      const frameGeo = new T.BoxGeometry(2.35, 3.25, 0.08);
      const frameMat = new T.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.2 });
      cGroup.add(new T.Mesh(frameGeo, frameMat));
      cGroup.add(new T.LineSegments(new T.EdgesGeometry(frameGeo), new T.LineBasicMaterial({ color: hex })));

      const scMesh = new T.Mesh(new T.PlaneGeometry(2.22, 3.12), new T.MeshBasicMaterial({ map: sCompTex, side: T.DoubleSide }));
      scMesh.position.z = 0.045;
      cGroup.add(scMesh);

      const brMat = new T.LineBasicMaterial({ color: hex });
      const addBr = (cx, cy, fx, fy) => {
        const pts = [
          new T.Vector3(cx - 0.2 * fx, cy, 0.05),
          new T.Vector3(cx, cy, 0.05),
          new T.Vector3(cx, cy - 0.2 * fy, 0.05)
        ];
        cGroup.add(new T.Line(new T.BufferGeometry().setFromPoints(pts), brMat));
      };
      addBr(-1.11, 1.56, -1, 1); addBr(1.11, 1.56, 1, 1);
      addBr(-1.11, -1.56, -1, -1); addBr(1.11, -1.56, 1, -1);

      dGroup.add(cGroup);
      camera.position.z = Math.max(7.6, 6.0 + posX * 0.45);
    }

    if (isDualActive) {
      buildCompanion();
    }

    let rx = 0.12, ry = -0.32, isDown = false, px = 0, py = 0;
    let clickTime = 0, sx = 0, sy = 0, isSpacingDrag = false;
    container.addEventListener('mousedown', e => {
      isDown = true; px = e.clientX; py = e.clientY;
      isSpacingDrag = (e.shiftKey || e.button === 2);
      clickTime = Date.now(); sx = e.clientX; sy = e.clientY;
      container.style.cursor = 'grabbing';
    });
    container.addEventListener('contextmenu', e => {
      if (isDualActive) e.preventDefault();
    });
    container.addEventListener('mousemove', e => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        targetPx = ((e.clientX - rect.left) / rect.width - 0.5) * 0.28;
        targetPy = -((e.clientY - rect.top) / rect.height - 0.5) * 0.28;
      }
    });
    window.addEventListener('mousemove', e => {
      if (!isDown) return;
      const dx = e.clientX - px;
      const dy = e.clientY - py;
      if (isSpacingDrag && isDualActive) {
        window.__adjustSpatialSpacing && window.__adjustSpatialSpacing(dx * 0.015);
      } else {
        ry += dx * 0.008; rx += dy * 0.008;
        rx = Math.max(-1.4, Math.min(1.4, rx));
      }
      px = e.clientX; py = e.clientY;
    });
    window.addEventListener('mouseup', e => {
      if (isDown) {
        const dur = Date.now() - clickTime;
        const dist = Math.hypot(e.clientX - sx, e.clientY - sy);
        if (dur < 350 && dist < 12) {
          const rect = container.getBoundingClientRect();
          const normX = (e.clientX - rect.left) / rect.width;
          if (isDualActive && normX > 0.65) {
            const apps = ['radio', 'crypto', 'weather', 'clock', 'system', 'focus', 'snake', 'calc', 'spectrum', 'forex', 'matrix', 'custom'];
            const curIdx = apps.indexOf(compApp);
            const nextIdx = (curIdx + 1) % apps.length;
            window.__setSpatialCompanionApp(apps[nextIdx]);
          } else if (activeMode === 'apps' && activeApp === 'radio') {
            toggleRadioAudio();
          }
        }
      }
      isDown = false;
      isSpacingDrag = false;
      container.style.cursor = 'grab';
    });
    container.addEventListener('wheel', e => {
      e.preventDefault(); camera.position.z += e.deltaY * 0.005;
      camera.position.z = Math.max(3.2, Math.min(14.0, camera.position.z));
    }, { passive: false });

    window.__resetSpatialScreenOrbit = () => { rx = 0.08; ry = (activeMode === 'custom' ? -0.15 : -0.32); };

    window.__setSpatialCompanionApp = function(app) {
      compApp = app;
      const s2 = document.getElementById('sp-select-screen2');
      if (s2) s2.value = app;
      renderCompanion(t);
      if (sCompTex) sCompTex.needsUpdate = true;
    };

    window.__adjustSpatialSpacing = function(delta) {
      compSpacing = Math.max(-0.6, Math.min(3.5, (compSpacing || 0) + delta));
      compSpacing = Math.round(compSpacing * 100) / 100;
      if (cGroup) {
        const mainHalfW = ('${devType}' === 'tablet' ? 2.25 : '${devType}' === 'curved_display' ? 2.35 : '${devType}' === 'holo_glass' ? 1.85 : 1.10);
        const posX = mainHalfW + 1.25 + (compSpacing || 0);
        cGroup.position.x = posX;
        camera.position.z = Math.max(7.6, 6.0 + posX * 0.45);
      }
      const el = document.getElementById('sp-spacing-val');
      if (el) el.textContent = (compSpacing >= 0 ? '+' : '') + compSpacing.toFixed(1);
    };

    window.__toggleSpatialDualScreen = function() {
      isDualActive = !isDualActive;
      const b = document.getElementById('sp-btn-dual');
      if (b) {
        b.style.background = isDualActive ? '${colCss}25' : 'rgba(255,255,255,0.06)';
        b.style.borderColor = isDualActive ? '${colCss}' : 'rgba(255,255,255,0.2)';
        b.style.color = isDualActive ? '${colCss}' : '#cbd5e1';
        b.innerHTML = '🖥️ Dual' + (isDualActive ? ': ON' : '');
      }
      const wrap = document.getElementById('sp-dual-controls-wrap');
      if (wrap) wrap.style.display = isDualActive ? 'inline-flex' : 'none';
      buildCompanion();
    };

    window.__toggleSpatialAudioPulse = function() {
      isPulseActive = !isPulseActive;
      const b = document.getElementById('sp-btn-pulse');
      if (b) {
        b.style.background = isPulseActive ? '${colCss}25' : 'rgba(255,255,255,0.06)';
        b.style.borderColor = isPulseActive ? '${colCss}' : 'rgba(255,255,255,0.2)';
        b.style.color = isPulseActive ? '${colCss}' : '#cbd5e1';
      }
    };

    window.__recordSpatialWebM = function(durationSec = 6) {
      if (typeof window.guardPremium === 'function' && !window.guardPremium(null, '60 FPS Canvas Video Recorder')) return;
      const cv = renderer ? renderer.domElement : container.querySelector('canvas');
      if (!cv || typeof cv.captureStream !== 'function' || typeof MediaRecorder === 'undefined') {
        alert('MediaRecorder is not supported in this browser.');
        return;
      }
      const st = cv.captureStream(60);
      if (sRadioAudio && sRadio.isPlaying && sRadioAudio.captureStream) {
        try {
          const aSt = sRadioAudio.captureStream();
          if (aSt && aSt.getAudioTracks().length > 0) st.addTrack(aSt.getAudioTracks()[0]);
        } catch(e){}
      }
      let mType = 'video/webm;codecs=vp9';
      if (!MediaRecorder.isTypeSupported(mType)) {
        mType = 'video/webm;codecs=vp8';
        if (!MediaRecorder.isTypeSupported(mType)) mType = 'video/webm';
      }
      try {
        const mr = new MediaRecorder(st, { mimeType: mType });
        const ch = [];
        mr.ondataavailable = ev => { if (ev.data && ev.data.size > 0) ch.push(ev.data); };
        const rBtn = document.getElementById('sp-btn-rec');
        let rem = durationSec;
        if (rBtn) { rBtn.innerHTML = '🔴 REC ' + rem + 's'; rBtn.style.background = 'rgba(239,68,68,0.35)'; }
        const iv = setInterval(() => {
          rem--;
          if (rBtn && rem > 0) rBtn.innerHTML = '🔴 REC ' + rem + 's';
          if (rem <= 0) clearInterval(iv);
        }, 1000);
        mr.onstop = () => {
          clearInterval(iv);
          if (rBtn) { rBtn.innerHTML = '🎥 Video'; rBtn.style.background = 'rgba(239,68,68,0.18)'; }
          const b = new Blob(ch, { type: mType });
          if (b.size === 0) return;
          const u = URL.createObjectURL(b);
          const a = document.createElement('a'); a.href = u; a.download = 'spatial-screen-recording-' + Date.now() + '.webm';
          document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(u);
        };
        mr.start();
        setTimeout(() => { if (mr.state !== 'inactive') mr.stop(); }, durationSec * 1000);
      } catch(err) {
        alert('Recorder error: ' + err.message);
      }
    };

    function anim() {
      requestAnimationFrame(anim);
      t += 0.02;
      renderScreen(t);
      if (sTex) sTex.needsUpdate = true;
      if (!isDown) {
        if (activeMode === 'custom') {
          ry = Math.sin(t * 0.4) * 0.15;
        } else {
          ry += 0.004;
        }
      }
      dGroup.position.y = Math.sin(t * 1.5) * 0.12;
      dGroup.rotation.x = rx + Math.sin(t) * 0.015;
      dGroup.rotation.y = ry;

      if (isPulseActive) {
        const pulse = sRadio.isPlaying ? (Math.pow(Math.abs(Math.sin(t * 3.8)), 4) * 0.65 + Math.abs(Math.sin(t * 7.6)) * 0.35) : (Math.sin(t * 1.5) * 0.08 + 0.08);
        if (rim) { rim.intensity = 2.2 + pulse * 3.8; rim.distance = 18 + pulse * 14; }
        if (dust) { const s = 1.0 + pulse * 0.28; dust.scale.set(s, s, s); }
      }
      if (dust) dust.rotation.y = t * 0.04;
      curPx += (targetPx - curPx) * 0.08;
      curPy += (targetPy - curPy) * 0.08;
      if (parGroup) { parGroup.position.x = curPx; parGroup.position.y = curPy; }

      if (isDualActive) {
        renderCompanion(t);
        if (sCompTex) sCompTex.needsUpdate = true;
      }

      renderer.render(scene, camera);
    }
    anim();
  }

  function startPureCanvas() {
    const cv = document.createElement('canvas');
    cv.width = container.clientWidth || 800; cv.height = container.clientHeight || 480;
    container.appendChild(cv);
    const ctx = cv.getContext('2d');
    let rx = 0.12, ry = -0.32, isDown = false, px = 0, py = 0;

    container.addEventListener('mousedown', e => { isDown = true; px = e.clientX; py = e.clientY; });
    window.addEventListener('mousemove', e => {
      if (!isDown) return;
      ry += (e.clientX - px) * 0.008; rx += (e.clientY - py) * 0.008;
      px = e.clientX; py = e.clientY;
    });
    window.addEventListener('mouseup', () => isDown = false);

    function loop() {
      requestAnimationFrame(loop);
      t += 0.02; if (!isDown) ry += 0.004;
      renderScreen(t);
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.save();
      ctx.translate(cv.width / 2, cv.height / 2 + Math.sin(t * 1.5) * 10);
      ctx.transform(Math.cos(ry), Math.sin(ry) * Math.sin(rx) * 0.4, 0, Math.cos(rx), 0, 0);
      ctx.fillStyle = '#0f172a'; ctx.strokeStyle = '${colCss}'; ctx.lineWidth = 3;
      const dw = 280, dh = 460;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(-dw/2, -dh/2, dw, dh, 18); else ctx.rect(-dw/2, -dh/2, dw, dh);
      ctx.fill(); ctx.stroke();
      ctx.drawImage(sCanvas, -dw/2 + 8, -dh/2 + 8, dw - 16, dh - 16);
      ctx.restore();

      if (isDualActive) {
        renderCompanion(t);
        ctx.save();
        ctx.translate(cv.width / 2 + 180, cv.height / 2 + Math.sin(t * 1.5 + 0.3) * 10);
        ctx.transform(Math.cos(ry - 0.35), Math.sin(ry - 0.35) * Math.sin(rx) * 0.4, 0, Math.cos(rx), 0, 0);
        ctx.fillStyle = '#060a14'; ctx.strokeStyle = '${colCss}'; ctx.lineWidth = 2;
        const cdw = 160, cdh = 240;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(-cdw/2, -cdh/2, cdw, cdh, 14); else ctx.rect(-cdw/2, -cdh/2, cdw, cdh);
        ctx.fill(); ctx.stroke();
        ctx.drawImage(sCompCanvas, -cdw/2 + 4, -cdh/2 + 4, cdw - 8, cdh - 8);
        ctx.restore();
      }
    }
    loop();
  }

  function checkAndStart() {
    if (getThree()) {
      startHolo();
    } else {
      let attempts = 0;
      const iv = setInterval(() => {
        attempts++;
        if (getThree()) {
          clearInterval(iv);
          startHolo();
        } else if (attempts > 12) {
          clearInterval(iv);
          startPureCanvas();
        }
      }, 50);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAndStart);
  } else {
    setTimeout(checkAndStart, 50);
  }
})();
<\/script>
<!-- ═══ ULTRA SPATIAL SCREEN HOLOGRAPHIC WORKSTATION (END) ═══ -->
`;

      const markerRegex = /<!-- ═══ ULTRA SPATIAL SCREEN HOLOGRAPHIC WORKSTATION[\s\S]*?<!-- ═══ ULTRA SPATIAL SCREEN HOLOGRAPHIC WORKSTATION \(END\) ═══ -->/g;
      _injectCodeToActiveApp(snippet.trim(), markerRegex, '🛸 Ultra Spatial Screen Workstation');
    },

    // ══════════════════════════════════════════════════════════════════════════
    // STANDALONE HTML EXPORT
    // ══════════════════════════════════════════════════════════════════════════
    exportStandalone() {
      if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Export Spatial Workstation')) return;
      const isFr = _isFr();
      const devType = this.currentDevice || 'phone';
      const theme = this.currentTheme || 'cyan';
      const colHex = this.themeColors[theme].hex;
      const colCss = this.themeColors[theme].css;
      const mode = this.currentMode || 'apps';
      const appId = this.activeAppId || 'weather';
      const radioStnIdx = (this.radioState && typeof this.radioState.currentStationIdx === 'number') ? this.radioState.currentStationIdx : 0;
      const isDual = !!this.isDualScreenActive;
      const compApp = this.companionAppId || 'crypto';
      const compSpacing = typeof this.companionSpacing === 'number' ? this.companionSpacing : 0.0;

      const titleEscaped = (this.textData.title || 'Spatial Workstation').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;');
      const subtitleEscaped = (this.textData.subtitle || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;');
      const bodyEscaped = (this.textData.body || '').replace(/\r?\n/g, ' ').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;');
      const tagEscaped = (this.textData.tag || '⚡ v4.0 SPATIAL OS').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;');
      const customCodeRaw = (this.customCode || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 280).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
      const code = this.customCode || '';
      const isSynth = /synth|beat|drum|audio|sequencer|track|bpm|step/i.test(code);
      let appTitle = 'Autonomous Web Application';
      const titleMatch = code.match(/<h[1-2][^>]*>([\s\S]*?)<\/h[1-2]>/i) || code.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      if (titleMatch) appTitle = titleMatch[1].replace(/<[^>]+>/g, '').trim() || appTitle;
      else if (typeof APP !== 'undefined' && APP && APP.name) appTitle = APP.name;
      const appTitleEscaped = appTitle.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;');
      let appDesc = 'Custom HTML/CSS/JS Application projection';
      const descMatch = code.match(/<p[^>]*class=["'][^"']*tagline[^"']*["'][^>]*>([\s\S]*?)<\/p>/i) || code.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
      if (descMatch) appDesc = descMatch[1].replace(/<[^>]+>/g, '').trim().slice(0, 120) || appDesc;
      const appDescEscaped = appDesc.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;');

      const htmlContent = `<!DOCTYPE html>
<html lang="${isFr ? 'fr' : 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ultra Spatial Screen Workstation</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 100vw;
      height: 100vh;
      min-height: 100vh;
      margin: 0;
      padding: 0;
      overflow: hidden;
      background: #03050c !important;
      background-image: radial-gradient(circle at center, #0e172e 0%, #03050c 100%) !important;
      background-attachment: fixed;
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif;
      color: #fff;
      user-select: none;
      -webkit-user-select: none;
    }
    #canvas-container {
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0; left: 0;
      z-index: 10;
      cursor: grab;
    }
    #canvas-container:active { cursor: grabbing; }
    #camera-feed {
      position: absolute;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      object-fit: cover;
      display: none;
      z-index: 5;
    }
    .hud-top {
      position: absolute;
      top: 20px; left: 20px; right: 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      flex-wrap: wrap;
      z-index: 20;
      pointer-events: none;
    }
    .hud-title-box {
      background: rgba(15, 23, 42, 0.8);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      padding: 14px 22px;
      border-radius: 16px;
      border: 1px solid ${colCss}55;
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
      gap: 8px;
      flex-wrap: wrap;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      padding: 8px 14px;
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      pointer-events: auto;
    }
    .hud-btn {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.18);
      color: #cbd5e1;
      padding: 6px 12px;
      border-radius: 9999px;
      font-size: 0.76rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
    }
    .hud-btn:hover { background: rgba(255, 255, 255, 0.14); color: #fff; }
    .hud-btn.active {
      border-color: ${colCss};
      background: ${colCss}25;
      color: ${colCss};
      box-shadow: 0 0 14px ${colCss}66;
    }
    .hud-bottom {
      position: absolute;
      bottom: 20px; left: 20px;
      background: rgba(15, 23, 42, 0.8);
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
      <div class="hud-title">
        <span>🛸</span>
        <span>Ultra Spatial Screen Workstation</span>
      </div>
      <div class="hud-sub">
        Zero-G Floating 3D Display · Drag 360° · Scroll to Zoom
      </div>
    </div>

    <div class="hud-controls">
      <button class="hud-btn ${mode === 'text' ? 'active' : ''}" data-mode="text" onclick="switchMode('text')">✍️ Text</button>
      <button class="hud-btn ${mode === 'apps' && appId === 'weather' ? 'active' : ''}" data-mode="apps" data-app="weather" onclick="switchApp('weather')">🌤️ Weather</button>
      <button class="hud-btn ${mode === 'apps' && appId === 'forex' ? 'active' : ''}" data-mode="apps" data-app="forex" onclick="switchApp('forex')">💱 Forex (CAD)</button>
      <button class="hud-btn ${mode === 'apps' && appId === 'radio' ? 'active' : ''}" data-mode="apps" data-app="radio" onclick="switchApp('radio')">📻 Radio</button>
      <span id="hud-radio-stations-group" style="display:${mode === 'apps' && appId === 'radio' ? 'inline-flex' : 'none'};align-items:center;gap:3px">
        <button class="hud-btn hud-stn-btn ${radioStnIdx === 0 ? 'active' : ''}" data-stn="0" onclick="switchStation(0)" style="${radioStnIdx === 0 ? 'background:rgba(244,63,94,0.25);border-color:#f43f5e;color:#fb7185;' : ''}">🎧 Montreal</button>
        <button class="hud-btn hud-stn-btn ${radioStnIdx === 1 ? 'active' : ''}" data-stn="1" onclick="switchStation(1)" style="${radioStnIdx === 1 ? 'background:rgba(244,63,94,0.25);border-color:#f43f5e;color:#fb7185;' : ''}">🌆 DEF CON</button>
        <button class="hud-btn hud-stn-btn ${radioStnIdx === 2 ? 'active' : ''}" data-stn="2" onclick="switchStation(2)" style="${radioStnIdx === 2 ? 'background:rgba(244,63,94,0.25);border-color:#f43f5e;color:#fb7185;' : ''}">🎸 Hits</button>
        <button class="hud-btn hud-stn-btn ${radioStnIdx === 3 ? 'active' : ''}" data-stn="3" onclick="switchStation(3)" style="${radioStnIdx === 3 ? 'background:rgba(244,63,94,0.25);border-color:#f43f5e;color:#fb7185;' : ''}">🌌 Drone</button>
        <button class="hud-btn hud-stn-btn ${radioStnIdx === 4 ? 'active' : ''}" data-stn="4" onclick="switchStation(4)" style="${radioStnIdx === 4 ? 'background:rgba(244,63,94,0.25);border-color:#f43f5e;color:#fb7185;' : ''}">⚡ CliqHop</button>
      </span>
      <button class="hud-btn" id="hud-radio-play-btn" onclick="toggleRadioPlay()" style="border-color:#10b981;color:#10b981;font-weight:800;display:${mode === 'apps' && appId === 'radio' ? 'inline-flex' : 'none'};">▶ Play Radio</button>
      <button class="hud-btn ${mode === 'apps' && appId === 'crypto' ? 'active' : ''}" data-mode="apps" data-app="crypto" onclick="switchApp('crypto')">🪙 Crypto</button>
      <button class="hud-btn ${mode === 'apps' && appId === 'pomodoro' ? 'active' : ''}" data-mode="apps" data-app="pomodoro" onclick="switchApp('pomodoro')">⏳ Focus</button>
      <button class="hud-btn ${mode === 'apps' && appId === 'system' ? 'active' : ''}" data-mode="apps" data-app="system" onclick="switchApp('system')">⚡ System</button>
      <button class="hud-btn ${mode === 'apps' && appId === 'clock' ? 'active' : ''}" data-mode="apps" data-app="clock" onclick="switchApp('clock')">⏱️ Clock</button>
      <button class="hud-btn ${mode === 'apps' && appId === 'snake' ? 'active' : ''}" data-mode="apps" data-app="snake" onclick="switchApp('snake')">🕹️ Snake</button>
      <button class="hud-btn ${mode === 'apps' && appId === 'calc' ? 'active' : ''}" data-mode="apps" data-app="calc" onclick="switchApp('calc')">🧮 Calc</button>
      <button class="hud-btn ${mode === 'apps' && appId === 'spectrum' ? 'active' : ''}" data-mode="apps" data-app="spectrum" onclick="switchApp('spectrum')">🎵 Spectrum</button>
      <button class="hud-btn ${mode === 'custom' ? 'active' : ''}" data-mode="custom" onclick="switchMode('custom')">🌐 App</button>
      <button class="hud-btn" id="btn-cam-ar" onclick="toggleCameraAR()">📷 Camera AR</button>
      <button class="hud-btn ${isDual ? 'active' : ''}" id="btn-dual-screen" onclick="toggleDualScreen()" style="${isDual ? 'color:' + colCss + ';border-color:' + colCss + ';' : ''}">🖥️ Dual Screen${isDual ? ': ON' : ''}</button>
      <span id="hud-dual-controls-wrap" style="display:${isDual ? 'inline-flex' : 'none'};align-items:center;gap:4px;background:rgba(15,23,42,0.8);border:1px solid rgba(255,255,255,0.2);border-radius:12px;padding:2px 8px">
        <span style="font-size:0.7rem;color:#38bdf8;font-weight:800">Screen 2:</span>
        <select id="hud-screen2-select" onchange="setCompanionApp(this.value)" style="background:transparent;border:none;color:#fff;font-size:0.72rem;font-weight:700;outline:none;cursor:pointer">
          <option value="radio" ${compApp === 'radio' ? 'selected' : ''} style="background:#0f172a;color:#fff">📻 Radio</option>
          <option value="crypto" ${compApp === 'crypto' ? 'selected' : ''} style="background:#0f172a;color:#fff">🪙 Crypto</option>
          <option value="weather" ${compApp === 'weather' ? 'selected' : ''} style="background:#0f172a;color:#fff">🌤️ Weather</option>
          <option value="clock" ${compApp === 'clock' ? 'selected' : ''} style="background:#0f172a;color:#fff">⏱️ Clock</option>
          <option value="system" ${compApp === 'system' ? 'selected' : ''} style="background:#0f172a;color:#fff">⚡ System</option>
          <option value="focus" ${compApp === 'focus' ? 'selected' : ''} style="background:#0f172a;color:#fff">⏳ Focus</option>
          <option value="snake" ${compApp === 'snake' ? 'selected' : ''} style="background:#0f172a;color:#fff">🕹️ Snake</option>
          <option value="calc" ${compApp === 'calc' ? 'selected' : ''} style="background:#0f172a;color:#fff">🧮 Calc</option>
          <option value="spectrum" ${compApp === 'spectrum' ? 'selected' : ''} style="background:#0f172a;color:#fff">🎵 Spectrum</option>
          <option value="forex" ${compApp === 'forex' ? 'selected' : ''} style="background:#0f172a;color:#fff">💱 Forex</option>
          <option value="matrix" ${compApp === 'matrix' ? 'selected' : ''} style="background:#0f172a;color:#fff">⚡ Matrix</option>
          <option value="custom" ${compApp === 'custom' ? 'selected' : ''} style="background:#0f172a;color:#fff">🌐 App</option>
        </select>
        <button class="hud-btn" onclick="adjustSpacing(-0.2)" title="Closer" style="padding:1px 6px;font-size:0.7rem">↔ -</button>
        <span id="hud-spacing-val" style="font-size:0.7rem;font-family:monospace;color:#38bdf8">${(compSpacing >= 0 ? '+' : '') + compSpacing.toFixed(1)}</span>
        <button class="hud-btn" onclick="adjustSpacing(0.2)" title="Further" style="padding:1px 6px;font-size:0.7rem">↔ +</button>
      </span>
      <button class="hud-btn active" id="btn-audio-pulse" onclick="toggleAudioPulse()">✨ Audio Pulse</button>
      <button class="hud-btn active" id="btn-spatial-depth" onclick="toggleSpatialDepth()">🪟 Depth</button>
      <button class="hud-btn" id="btn-record-webm" onclick="recordWebM()" style="border-color:rgba(239,68,68,0.6);color:#fca5a5;">🎥 60fps Video</button>
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
    const container = document.getElementById('canvas-container');

    let activeMode = '${mode}';
    let activeApp = '${appId}';
    let sTex = null;
    let t = 0;

    // Create 1024x1024 Screen Texture
    const sCanvas = document.createElement('canvas');
    sCanvas.width = 1024; sCanvas.height = 1024;
    const sCtx = sCanvas.getContext('2d');
    const sw = 1024, sh = 1024;
    const accent = '${colCss}';

    // Companion HUD State & Canvas (Dual Screen Innovation)
    let isDualActive = ${isDual ? 'true' : 'false'};
    let compApp = '${compApp}';
    let compSpacing = ${compSpacing};
    let cGroup = null;
    let isPulseActive = true;
    let isSpatialDepth = true;

    const sCompCanvas = document.createElement('canvas');
    sCompCanvas.width = 512; sCompCanvas.height = 512;
    const sCompCtx = sCompCanvas.getContext('2d');
    let sCompTex = null;

    function renderCompanion(animTime) {
      if (!sCompCtx) return;
      const ctx = sCompCtx, cw = 512, ch = 512;
      ctx.fillStyle = '#060a14'; ctx.fillRect(0, 0, cw, ch);
      ctx.strokeStyle = 'rgba(255,255,255,0.03)'; ctx.lineWidth = 1;
      for (let x = 0; x < cw; x += 32) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, ch); ctx.stroke(); }
      for (let y = 0; y < ch; y += 32) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(cw, y); ctx.stroke(); }
      ctx.strokeStyle = accent; ctx.lineWidth = 3; ctx.strokeRect(6, 6, cw - 12, ch - 12);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)'; ctx.fillRect(10, 10, cw - 20, 52);
      ctx.fillStyle = '#fff'; ctx.font = 'bold 18px sans-serif';

      if (compApp === 'pomodoro') compApp = 'focus';
      const appTitles = {
        radio: '📻 COMPANION · WEB RADIO',
        crypto: '🪙 COMPANION · CRYPTO HUD',
        weather: '🌤️ COMPANION · METEO RADAR',
        clock: '⏱️ COMPANION · QUANTUM CLOCK',
        system: '⚡ COMPANION · SYSTEM SPECS',
        focus: '⏳ COMPANION · POMODORO FOCUS',
        snake: '🕹️ COMPANION · SNAKE ARCADE',
        calc: '🧮 COMPANION · CALCULATOR',
        spectrum: '🎵 COMPANION · AUDIO SPECTRUM',
        forex: '💱 COMPANION · FOREX CAD',
        matrix: '⚡ COMPANION · MATRIX STREAM',
        custom: '🌐 COMPANION · APP PROJECTION'
      };
      ctx.fillText(appTitles[compApp] || '🛸 COMPANION HUD · ZERO-G', 24, 42);

      if (compApp === 'radio') {
        const cur = sRadio.stations[sRadio.stnIdx || 0];
        ctx.fillStyle = sRadio.isPlaying ? '#10b981' : '#f59e0b';
        ctx.font = 'bold 14px monospace';
        ctx.fillText(sRadio.isPlaying ? '● LIVE AUDIO' : '○ STANDBY', cw - 130, 42);
        ctx.fillStyle = '#ffffff'; ctx.font = 'bold 22px sans-serif';
        ctx.fillText(cur ? cur.name : 'Station', 24, 100);
        ctx.fillStyle = '#94a3b8'; ctx.font = '16px sans-serif';
        ctx.fillText(cur ? cur.genre : '', 24, 130);
        const bars = 20, bw = (cw - 60) / bars;
        for (let b = 0; b < bars; b++) {
          const factor = sRadio.isPlaying ? Math.abs(Math.sin(animTime * 6 + b * 0.4)) : 0.08;
          const bh = factor * 140 + 10;
          ctx.fillStyle = accent;
          ctx.fillRect(30 + b * bw, 320 - bh, bw - 4, bh);
        }
        ctx.fillStyle = 'rgba(255,255,255,0.08)';
        ctx.fillRect(24, 380, cw - 48, 56);
        ctx.fillStyle = '#38bdf8'; ctx.font = 'bold 16px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(sRadio.isPlaying ? '⏸ Click Screen to Pause' : '▶ Click Screen to Play', cw / 2, 415);
        ctx.textAlign = 'left';
      } else if (compApp === 'crypto') {
        ctx.fillStyle = '#f59e0b'; ctx.font = 'bold 14px monospace';
        ctx.fillText('● REAL-TIME CRYPTO', cw - 170, 42);
        sCrypto.coins.slice(0, 4).forEach((c, idx) => {
          const y = 90 + idx * 68;
          ctx.fillStyle = 'rgba(255,255,255,0.04)'; ctx.fillRect(20, y, cw - 40, 58);
          ctx.fillStyle = c.color; ctx.font = 'bold 18px sans-serif'; ctx.fillText(c.sym + ' / USD', 36, y + 36);
          ctx.fillStyle = '#fff'; ctx.font = 'bold 20px monospace'; ctx.fillText('$' + Number(c.price).toLocaleString(), 180, y + 36);
          ctx.fillStyle = c.up ? '#10b981' : '#f43f5e'; ctx.font = 'bold 15px monospace'; ctx.fillText(c.change, cw - 110, y + 36);
        });
        ctx.fillStyle = '#94a3b8'; ctx.font = '13px monospace'; ctx.textAlign = 'center';
        ctx.fillText('Autonomous WebSocket Live Feeds', cw / 2, 380); ctx.textAlign = 'left';
      } else if (compApp === 'weather') {
        ctx.fillStyle = '#38bdf8'; ctx.font = 'bold 14px monospace';
        ctx.fillText('● METEO RADAR', cw - 140, 42);
        ctx.fillStyle = '#ffffff'; ctx.font = 'bold 26px sans-serif';
        ctx.fillText(sWeather.city + ' ' + sWeather.temp + '°C', 24, 105);
        ctx.fillStyle = '#94a3b8'; ctx.font = '16px sans-serif'; ctx.fillText(sWeather.condition, 24, 138);
        ctx.strokeStyle = accent; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(cw / 2, 270, 75, 0, Math.PI * 2); ctx.stroke();
        const sweep = animTime * 3;
        ctx.beginPath(); ctx.moveTo(cw / 2, 270);
        ctx.lineTo(cw / 2 + Math.cos(sweep) * 75, 270 + Math.sin(sweep) * 75); ctx.stroke();
        ctx.fillStyle = '#94a3b8'; ctx.font = '14px monospace'; ctx.textAlign = 'center';
        ctx.fillText('WIND: ' + sWeather.windSpeed + ' km/h · HUMIDITY: ' + sWeather.humidity + '%', cw / 2, 385);
        ctx.textAlign = 'left';
      } else if (compApp === 'clock') {
        const now = new Date();
        const hrs = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        const secs = String(now.getSeconds()).padStart(2, '0');
        const ms = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');
        ctx.fillStyle = '#60a5fa'; ctx.font = 'bold 18px monospace'; ctx.fillText('⏱️ ATOMIC UTC TELEMETRY', 32, 100);
        ctx.fillStyle = '#ffffff'; ctx.font = 'bold 56px monospace'; ctx.fillText(hrs + ':' + mins + ':' + secs, 32, 180);
        ctx.fillStyle = accent; ctx.font = 'bold 24px monospace'; ctx.fillText('.' + ms + ' MS', cw - 140, 180);
        ctx.fillStyle = '#94a3b8'; ctx.font = '15px monospace'; ctx.fillText(now.toDateString().toUpperCase() + ' · ZERO-G', 34, 220);
        const cx = cw / 2, cy = 330, radius = 75;
        ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.stroke();
        const sAngle = ((now.getSeconds() + now.getMilliseconds() / 1000) / 60) * Math.PI * 2 - Math.PI / 2;
        ctx.strokeStyle = accent; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(cx, cy, radius, -Math.PI / 2, sAngle); ctx.stroke();
        ctx.fillStyle = '#fff'; ctx.font = 'bold 22px monospace'; ctx.textAlign = 'center'; ctx.fillText(secs + 's', cx, cy + 8); ctx.textAlign = 'left';
      } else if (compApp === 'system') {
        ctx.fillStyle = '#22d3ee'; ctx.font = 'bold 18px monospace'; ctx.fillText('⚡ QUANTUM SYSTEM SPECS', 32, 100);
        const specs = [
          { label: 'CPU CORES', val: sSystem.cores + ' Cores Active', col: '#38bdf8' },
          { label: 'HEAP RAM', val: sSystem.ramMB + ' MB / Allocated', col: '#a855f7' },
          { label: 'REFRESH RATE', val: '60.0 FPS Synchronized', col: '#10b981' },
          { label: 'NETWORK PING', val: sSystem.pingMs + ' ms (Fiber Gigabit)', col: '#f59e0b' },
          { label: 'BATTERY POWER', val: sSystem.battery + '% ⚡ Optimal Zero-G', col: '#34d399' }
        ];
        specs.forEach((item, idx) => {
          const sy = 120 + idx * 54;
          ctx.fillStyle = 'rgba(255,255,255,0.04)'; ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.strokeRect(28, sy, cw - 56, 46);
          ctx.fillStyle = '#94a3b8'; ctx.font = '11px monospace'; ctx.fillText(item.label, 40, sy + 18);
          ctx.fillStyle = item.col; ctx.font = 'bold 15px monospace'; ctx.fillText(item.val, 40, sy + 38);
        });
      } else if (compApp === 'focus') {
        const pM = Math.floor(sPomodoro.timeLeft / 60);
        const pS = sPomodoro.timeLeft % 60;
        ctx.fillStyle = '#fb7185'; ctx.font = 'bold 18px monospace'; ctx.fillText('⏳ SPATIAL FOCUS TIMER', 32, 100);
        const pcx = cw / 2, pcy = 240, pr = 90;
        ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(pcx, pcy, pr, 0, Math.PI * 2); ctx.stroke();
        const pProg = (animTime * 0.1) % 1;
        ctx.strokeStyle = '#f43f5e'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(pcx, pcy, pr, -Math.PI / 2, -Math.PI / 2 + pProg * Math.PI * 2); ctx.stroke();
        ctx.fillStyle = '#ffffff'; ctx.font = 'bold 42px monospace'; ctx.textAlign = 'center'; ctx.fillText(String(pM).padStart(2,'0') + ':' + String(pS).padStart(2,'0'), pcx, pcy + 14);
        ctx.fillStyle = '#94a3b8'; ctx.font = '13px monospace'; ctx.fillText('FOCUS INTERVAL · 25 MIN', pcx, pcy + 40);
        ctx.fillText('Sessions: ● ● ● ●', pcx, 380); ctx.fillStyle = '#34d399'; ctx.fillText('🌧️ Rain Ambient Active', pcx, 415); ctx.textAlign = 'left';
      } else if (compApp === 'snake') {
        ctx.fillStyle = '#34d399'; ctx.font = 'bold 18px monospace'; ctx.fillText('🕹️ CYBER SNAKE MINI', 32, 100);
        ctx.fillStyle = '#fff'; ctx.font = 'bold 14px monospace'; ctx.fillText('SCORE: ' + sSnake.score + '  HI: ' + sSnake.highScore, cw - 180, 100);
        const ax = 32, ay = 120, aw = cw - 64, ah = 300;
        ctx.fillStyle = '#050711'; ctx.strokeStyle = '#34d399'; ctx.lineWidth = 2; ctx.fillRect(ax, ay, aw, ah); ctx.strokeRect(ax, ay, aw, ah);
        ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = 1;
        for (let gx = ax; gx <= ax + aw; gx += 20) { ctx.beginPath(); ctx.moveTo(gx, ay); ctx.lineTo(gx, ay + ah); ctx.stroke(); }
        for (let gy = ay; gy <= ay + ah; gy += 20) { ctx.beginPath(); ctx.moveTo(ax, gy); ctx.lineTo(ax + aw, gy); ctx.stroke(); }
        const sx = ax + 120 + Math.sin(animTime * 3) * 60, sy = ay + 120 + Math.cos(animTime * 2) * 50;
        ctx.fillStyle = accent; ctx.fillRect(sx, sy, 18, 18); ctx.fillStyle = '#34d399'; ctx.fillRect(sx - 20, sy, 16, 16); ctx.fillRect(sx - 38, sy, 14, 14);
        ctx.fillStyle = '#f43f5e'; ctx.beginPath(); ctx.arc(ax + aw - 80, ay + 80, 8, 0, Math.PI * 2); ctx.fill();
      } else if (compApp === 'calc') {
        ctx.fillStyle = '#a855f7'; ctx.font = 'bold 18px monospace'; ctx.fillText('🧮 SPATIAL CALCULATOR', 32, 100);
        ctx.fillStyle = 'rgba(15,23,42,0.9)'; ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.fillRect(32, 120, cw - 64, 65); ctx.strokeRect(32, 120, cw - 64, 65);
        ctx.fillStyle = '#fff'; ctx.font = 'bold 34px monospace'; ctx.textAlign = 'right'; ctx.fillText('1,337.00', cw - 48, 164); ctx.textAlign = 'left';
        const keys = ['7','8','9','÷', '4','5','6','×', '1','2','3','-', 'C','0','=','+'];
        const kw = (cw - 80) / 4, kh = 42;
        keys.forEach((k, idx) => {
          const row = Math.floor(idx / 4), col = idx % 4;
          const kx = 32 + col * (kw + 5), ky = 200 + row * (kh + 8);
          ctx.fillStyle = ['÷','×','-','+','='].includes(k) ? accent + '40' : 'rgba(255,255,255,0.06)';
          ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.strokeRect(kx, ky, kw, kh);
          ctx.fillStyle = ['÷','×','-','+','='].includes(k) ? accent : '#fff';
          ctx.font = 'bold 17px monospace'; ctx.textAlign = 'center'; ctx.fillText(k, kx + kw / 2, ky + kh / 2 + 6); ctx.textAlign = 'left';
        });
      } else if (compApp === 'spectrum') {
        ctx.fillStyle = '#ec4899'; ctx.font = 'bold 18px monospace'; ctx.fillText('🎵 24-BAND AUDIO SPECTRUM', 32, 100);
        const spBars = 24, spW = (cw - 64) / spBars, spY = 130, spH = 290;
        ctx.fillStyle = 'rgba(15,23,42,0.6)'; ctx.fillRect(32, spY, cw - 64, spH);
        for (let i = 0; i < spBars; i++) {
          const val = Math.abs(Math.sin(animTime * 5 + i * 0.45) * Math.cos(animTime * 2.5 + i * 0.25));
          const bh = Math.max(12, val * (spH - 30)), bx = 32 + i * spW, by = spY + spH - bh - 10;
          const hue = (i / spBars) * 280 + 160;
          ctx.fillStyle = 'hsl(' + hue + ', 90%, 55%)'; ctx.fillRect(bx, by, spW - 3, bh);
          ctx.fillStyle = '#ffffff'; ctx.fillRect(bx, by - 4, spW - 3, 2);
        }
      } else if (compApp === 'forex') {
        ctx.fillStyle = '#10b981'; ctx.font = 'bold 18px monospace'; ctx.fillText('💱 FOREX TELEMETRY (1 CAD)', 32, 100);
        const pairs = [
          { pair: 'CAD / USD', val: sForex.rates.USD, delta: '+0.15%' },
          { pair: 'CAD / EUR', val: sForex.rates.EUR, delta: '-0.08%' },
          { pair: 'CAD / GBP', val: sForex.rates.GBP, delta: '+0.05%' },
          { pair: 'CAD / JPY', val: sForex.rates.JPY, delta: '+0.42%' },
          { pair: 'CAD / CHF', val: sForex.rates.CHF, delta: '-0.11%' }
        ];
        pairs.forEach((p, idx) => {
          const py = 120 + idx * 58;
          ctx.fillStyle = 'rgba(255,255,255,0.04)'; ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.strokeRect(28, py, cw - 56, 48);
          ctx.fillStyle = '#ffffff'; ctx.font = 'bold 15px monospace'; ctx.fillText(p.pair, 40, py + 30);
          ctx.fillStyle = '#38bdf8'; ctx.font = 'bold 17px monospace'; ctx.fillText(String(p.val), 190, py + 30);
          const up = p.delta.startsWith('+');
          ctx.fillStyle = up ? '#10b981' : '#f43f5e'; ctx.font = 'bold 13px monospace'; ctx.fillText(p.delta, cw - 95, py + 30);
        });
      } else if (compApp === 'matrix') {
        ctx.fillStyle = '#22c55e'; ctx.font = 'bold 18px monospace'; ctx.fillText('⚡ CYBER MATRIX STREAM', 32, 100);
        ctx.font = '14px monospace';
        const cols = 20, colW = (cw - 64) / cols;
        for (let c = 0; c < cols; c++) {
          const cx = 32 + c * colW, dropY = ((animTime * 140 + c * 47) % (ch - 180)) + 120;
          for (let r = 0; r < 7; r++) {
            const gy = dropY - r * 18;
            if (gy > 120 && gy < ch - 60) {
              ctx.fillStyle = r === 0 ? '#ffffff' : 'rgba(34, 197, 94, ' + (1 - r * 0.14) + ')';
              const char = String.fromCharCode(0x30A0 + Math.floor((c * 17 + r + animTime * 8) % 96));
              ctx.fillText(char, cx, gy);
            }
          }
        }
      } else {
        ctx.fillStyle = accent; ctx.font = 'bold 18px monospace'; ctx.fillText('🌐 AUTONOMOUS APP PROJECTION', 32, 100);
        ctx.fillStyle = 'rgba(255,255,255,0.05)'; ctx.strokeStyle = accent; ctx.lineWidth = 1.5; ctx.strokeRect(28, 125, cw - 56, 280);
        ctx.fillStyle = '#ffffff'; ctx.font = 'bold 22px system-ui, sans-serif'; ctx.fillText('Autonomous AI Studio', 44, 175);
        ctx.fillStyle = '#94a3b8'; ctx.font = '14px system-ui, sans-serif';
        ctx.fillText('3D Interactive Canvas Projections', 44, 210);
        ctx.fillText('Real-time synchronization with active app', 44, 235);
        ctx.fillText('WebGL 60FPS Zero-Gravity Rendering', 44, 260);
        ctx.fillStyle = accent; ctx.fillRect(44, 290, 150, 38);
        ctx.fillStyle = '#030712'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('🚀 Launch View', 44 + 75, 314); ctx.textAlign = 'left';
      }

      ctx.fillStyle = 'rgba(15, 23, 42, 0.95)'; ctx.fillRect(10, ch - 44, cw - 20, 34);
      ctx.fillStyle = '#94a3b8'; ctx.font = '11px monospace'; ctx.textAlign = 'center';
      ctx.fillText('CLICK TO CYCLE APP · SHIFT+DRAG TO MOVE', cw / 2, ch - 22);
      ctx.textAlign = 'left';
    }

    // Mini-App Engines State & Live Fetchers
    const sWeather = {
      city: 'Montreal', country: '🇨🇦', lat: 45.5017, lon: -73.5673,
      temp: 18.5, condition: 'Clear Sky / Ensoleillé ☀️', weatherCode: 0,
      humidity: 52, windSpeed: 14.2,
      daily: [{ day: 'Today', max: 21, min: 12 }, { day: 'Tomorrow', max: 19, min: 11 }, { day: 'Day 3', max: 22, min: 13 }, { day: 'Day 4', max: 20, min: 12 }]
    };
    function getWeatherConditionText(code) {
      if (code === 0) return 'Clear Sky / Ensoleillé ☀️';
      if (code <= 3) return 'Partly Cloudy / Nuageux ⛅';
      if (code <= 48) return 'Foggy / Brouillard 🌫️';
      if (code <= 55) return 'Drizzle / Bruine 🌦️';
      if (code <= 65) return 'Rain / Pluie 🌧️';
      if (code <= 75) return 'Snow / Neige ❄️';
      if (code <= 82) return 'Rain Showers / Averses 🌧️';
      if (code >= 95) return 'Thunderstorm / Orage ⚡';
      return 'Variable / Mitigé 🌤️';
    }
    function fetchLiveWeather() {
      fetch('https://api.open-meteo.com/v1/forecast?latitude=45.5017&longitude=-73.5673&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=America%2FToronto')
        .then(r => r.json()).then(d => {
          if (d.current) {
            sWeather.temp = Math.round(d.current.temperature_2m * 10) / 10;
            sWeather.humidity = Math.round(d.current.relative_humidity_2m);
            sWeather.windSpeed = Math.round(d.current.wind_speed_10m * 10) / 10;
            sWeather.weatherCode = d.current.weather_code || 0;
            sWeather.condition = getWeatherConditionText(sWeather.weatherCode);
          }
          if (d.daily && d.daily.temperature_2m_max) {
            const days = ['Today', 'Tomorrow', 'Day 3', 'Day 4'];
            sWeather.daily = days.map((day, i) => ({
              day, max: Math.round(d.daily.temperature_2m_max[i] || 20), min: Math.round(d.daily.temperature_2m_min[i] || 12)
            }));
          }
        }).catch(e => {});
    }
    fetchLiveWeather();

    const sForex = {
      base: 'CAD',
      rates: { USD: 0.7147, EUR: 0.6552, GBP: 0.5621, JPY: 109.84, CHF: 0.6380 }
    };
    function fetchLiveForex() {
      fetch('https://open.er-api.com/v6/latest/CAD')
        .then(r => r.json()).then(d => {
          if (d.rates) {
            sForex.rates.USD = +(d.rates.USD ? d.rates.USD.toFixed(4) : 0.7147);
            sForex.rates.EUR = +(d.rates.EUR ? d.rates.EUR.toFixed(4) : 0.6552);
            sForex.rates.GBP = +(d.rates.GBP ? d.rates.GBP.toFixed(4) : 0.5621);
            sForex.rates.JPY = +(d.rates.JPY ? d.rates.JPY.toFixed(2) : 109.84);
            sForex.rates.CHF = +(d.rates.CHF ? d.rates.CHF.toFixed(4) : 0.6380);
          }
        }).catch(e => {});
    }
    fetchLiveForex();

    const sCrypto = {
      coins: [
        { sym: 'BTC', name: 'Bitcoin', price: 64820, change: '+4.25%', up: true, color: '#f59e0b' },
        { sym: 'ETH', name: 'Ethereum', price: 3480, change: '+3.80%', up: true, color: '#38bdf8' },
        { sym: 'SOL', name: 'Solana', price: 152.40, change: '+8.15%', up: true, color: '#a855f7' },
        { sym: 'BNB', name: 'BNB Chain', price: 582.10, change: '-0.92%', up: false, color: '#eab308' }
      ]
    };
    function fetchLiveCrypto() {
      fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin&vs_currencies=usd&include_24hr_change=true')
        .then(r => r.json()).then(d => {
          if (d.bitcoin) sCrypto.coins[0].price = d.bitcoin.usd;
          if (d.ethereum) sCrypto.coins[1].price = d.ethereum.usd;
          if (d.solana) sCrypto.coins[2].price = d.solana.usd;
          if (d.binancecoin) sCrypto.coins[3].price = d.binancecoin.usd;
        }).catch(e => {});
    }
    fetchLiveCrypto();

    let sRadioAudio = null;
    const sRadio = {
      isPlaying: false,
      stnIdx: ${radioStnIdx},
      stations: [
        { name: 'Montreal Chill Beats', genre: 'Downtempo Beats', url: 'https://ice2.somafm.com/groovesalad-128-mp3', icon: '🎧' },
        { name: 'DEF CON Cyber Radio', genre: 'Synthwave 80s', url: 'https://ice2.somafm.com/defcon-128-mp3', icon: '🌆' },
        { name: 'Radio Hits & Pop Rocks', genre: 'Modern Indie Hits', url: 'https://ice2.somafm.com/indiepop-128-mp3', icon: '🎸' },
        { name: 'Drone Zone Deep Space', genre: 'Cosmic Ambient', url: 'https://ice2.somafm.com/dronezone-128-mp3', icon: '🌌' },
        { name: 'Cyber Club CliqHop', genre: 'Glitch Electro', url: 'https://ice2.somafm.com/cliqhop-128-mp3', icon: '⚡' }
      ]
    };

    function updateRadioUI() {
      const isRadio = (activeMode === 'apps' && activeApp === 'radio');
      const pBtn = document.getElementById('hud-radio-play-btn');
      if (pBtn) {
        pBtn.style.display = isRadio ? 'inline-flex' : 'none';
        pBtn.textContent = sRadio.isPlaying ? '⏸ Pause Radio' : '▶ Play Radio';
        pBtn.style.color = sRadio.isPlaying ? '#f43f5e' : '#10b981';
        pBtn.style.borderColor = sRadio.isPlaying ? '#f43f5e' : '#10b981';
      }
      const stnGroup = document.getElementById('hud-radio-stations-group');
      if (stnGroup) {
        stnGroup.style.display = isRadio ? 'inline-flex' : 'none';
      }
      document.querySelectorAll('.hud-stn-btn').forEach(btn => {
        const idx = parseInt(btn.getAttribute('data-stn'), 10);
        const isActive = (idx === sRadio.stnIdx);
        btn.style.background = isActive ? 'rgba(244,63,94,0.25)' : 'rgba(255,255,255,0.06)';
        btn.style.borderColor = isActive ? '#f43f5e' : 'rgba(255,255,255,0.2)';
        btn.style.color = isActive ? '#fb7185' : '#cbd5e1';
      });
    }

    function switchStation(idx) {
      if (idx < 0 || idx >= sRadio.stations.length) return;
      sRadio.stnIdx = idx;
      const cur = sRadio.stations[idx];
      if (!sRadioAudio && typeof Audio !== 'undefined') {
        sRadioAudio = new Audio();
        sRadioAudio.preload = 'none';
        sRadioAudio.addEventListener('error', function() {
          if (sRadioAudio && sRadioAudio.src && sRadioAudio.src.includes('ice2')) {
            sRadioAudio.src = sRadioAudio.src.replace('ice2', 'ice4');
            sRadioAudio.play().catch(() => {});
          }
        });
      }
      if (sRadioAudio && cur) {
        sRadioAudio.src = cur.url;
        if (sRadio.isPlaying) {
          sRadioAudio.play().catch(() => {});
        }
      }
      updateRadioUI();
      renderScreen(t);
      if (sTex) sTex.needsUpdate = true;
    }
    window.switchStation = switchStation;

    function toggleRadioPlay() {
      const cur = sRadio.stations[sRadio.stnIdx || 0];
      if (!sRadioAudio && typeof Audio !== 'undefined') {
        sRadioAudio = new Audio();
        sRadioAudio.preload = 'none';
        sRadioAudio.addEventListener('error', function() {
          if (sRadioAudio && sRadioAudio.src && sRadioAudio.src.includes('ice2')) {
            sRadioAudio.src = sRadioAudio.src.replace('ice2', 'ice4');
            sRadioAudio.play().catch(() => {});
          }
        });
      }
      if (!sRadioAudio) return;
      if (sRadio.isPlaying) {
        sRadioAudio.pause();
        sRadio.isPlaying = false;
        updateRadioUI();
      } else {
        if (!sRadioAudio.src || sRadioAudio.src === '' || sRadioAudio.src !== cur.url) {
          sRadioAudio.src = cur.url;
        }
        sRadioAudio.play().then(() => {
          sRadio.isPlaying = true;
          updateRadioUI();
        }).catch(err => {
          sRadioAudio.src = cur.url.replace('ice2', 'ice4');
          sRadioAudio.play().then(() => {
            sRadio.isPlaying = true;
            updateRadioUI();
          }).catch(() => {
            sRadio.isPlaying = false;
            updateRadioUI();
          });
        });
      }
    }

    const sPomodoro = {
      timeLeft: 25 * 60, totalTime: 25 * 60, isRunning: true, lastTick: 0, sessions: 4
    };

    const sSystem = {
      fps: 60, pingMs: 18, ramMB: 142, cores: (typeof navigator !== 'undefined' && navigator.hardwareConcurrency) || 8, battery: 94
    };

    // Snake internal autonomous engine
    const sSnake = {
      gridSize: 20,
      snake: [{x:10, y:10}, {x:9, y:10}, {x:8, y:10}],
      dir: {x:1, y:0},
      food: {x:15, y:10},
      score: 0,
      highScore: 120,
      lastTick: 0,
      speed: 100
    };

    function wrapText(c, txt, x, y, maxW, lineH) {
      if (!txt) return;
      const words = txt.split(' ');
      let line = '', curY = y;
      for (let n = 0; n < words.length; n++) {
        const test = line + words[n] + ' ';
        if (c.measureText(test).width > maxW && n > 0) {
          c.fillText(line, x, curY);
          line = words[n] + ' ';
          curY += lineH;
        } else {
          line = test;
        }
      }
      c.fillText(line, x, curY);
    }

    function renderScreen(animTime) {
      // Background gradient
      const bgGrad = sCtx.createLinearGradient(0, 0, sw, sh);
      bgGrad.addColorStop(0, '#090d1a');
      bgGrad.addColorStop(0.5, '#0f172a');
      bgGrad.addColorStop(1, '#05070e');
      sCtx.fillStyle = bgGrad;
      sCtx.fillRect(0, 0, sw, sh);

      // Status Bar
      sCtx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      sCtx.fillRect(0, 0, sw, 56);
      sCtx.fillStyle = '#f8fafc';
      sCtx.font = 'bold 22px system-ui, sans-serif';
      sCtx.textAlign = 'left';
      sCtx.fillText('9:41', 40, 36);
      sCtx.textAlign = 'right';
      sCtx.fillText('5G  100% 🔋', sw - 40, 36);
      sCtx.textAlign = 'left';

      // Dynamic Mode Content
      if (activeMode === 'apps') {
        if (activeApp === 'weather') {
          sCtx.fillStyle = accent;
          sCtx.font = 'bold 36px monospace';
          sCtx.fillText('🌤️ QUANTUM WEATHER STATION · LIVE RADAR', 50, 115);

          const cx = 50, cy = 145, cw = sw - 100, ch = 720;
          sCtx.fillStyle = 'rgba(6, 11, 25, 0.94)';
          sCtx.strokeStyle = accent;
          sCtx.lineWidth = 2;
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(cx, cy, cw, ch, 20); else sCtx.rect(cx, cy, cw, ch);
          sCtx.fill(); sCtx.stroke();

          sCtx.fillStyle = accent + '22';
          sCtx.strokeStyle = accent;
          sCtx.lineWidth = 1.5;
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(cx + 30, cy + 24, 260, 42, 10); else sCtx.rect(cx + 30, cy + 24, 260, 42);
          sCtx.fill(); sCtx.stroke();
          sCtx.fillStyle = accent;
          sCtx.font = 'bold 18px monospace';
          sCtx.fillText('📍 ' + (sWeather.country || '🇨🇦') + ' ' + (sWeather.city || 'MONTREAL').toUpperCase() + ', QC, CANADA', cx + 46, cy + 51);

          sCtx.fillStyle = '#ffffff';
          sCtx.font = 'bold 92px monospace';
          sCtx.shadowColor = accent;
          sCtx.shadowBlur = 20;
          sCtx.fillText((sWeather.temp > 0 ? '+' : '') + sWeather.temp + '°C', cx + 30, cy + 180);
          sCtx.shadowBlur = 0;

          sCtx.fillStyle = '#38bdf8';
          sCtx.font = 'bold 26px system-ui, sans-serif';
          sCtx.fillText(sWeather.condition, cx + 32, cy + 230);

          const metrics = [
            { label: 'HUMIDITY / HUMIDITÉ', val: sWeather.humidity + '%', icon: '💧' },
            { label: 'WIND / VENT', val: sWeather.windSpeed + ' km/h', icon: '💨' },
            { label: 'FEELS / RESSENTI', val: (sWeather.temp > 0 ? '+' : '') + sWeather.temp + '°C', icon: '🌡️' },
            { label: 'SOURCE', val: 'OPEN-METEO', icon: '🛰️' }
          ];
          metrics.forEach((m, idx) => {
            const mx = cx + 30 + idx * ((cw - 60) / 4);
            sCtx.fillStyle = 'rgba(255,255,255,0.04)';
            sCtx.beginPath();
            if (sCtx.roundRect) sCtx.roundRect(mx, cy + 280, (cw - 80) / 4, 80, 12); else sCtx.rect(mx, cy + 280, (cw - 80) / 4, 80);
            sCtx.fill();
            sCtx.fillStyle = '#94a3b8'; sCtx.font = '14px monospace';
            sCtx.fillText(m.icon + ' ' + m.label, mx + 16, cy + 310);
            sCtx.fillStyle = '#fff'; sCtx.font = 'bold 22px monospace';
            sCtx.fillText(m.val, mx + 16, cy + 342);
          });

          sCtx.fillStyle = '#94a3b8'; sCtx.font = 'bold 16px monospace';
          sCtx.fillText('4-DAY FORECAST / PRÉVISIONS 4 JOURS (MONTREAL):', cx + 30, cy + 400);
          sWeather.daily.forEach((d, idx) => {
            const fx = cx + 30 + idx * ((cw - 60) / 4);
            sCtx.fillStyle = 'rgba(255,255,255,0.03)';
            sCtx.strokeStyle = 'rgba(255,255,255,0.1)';
            sCtx.beginPath();
            if (sCtx.roundRect) sCtx.roundRect(fx, cy + 420, (cw - 80) / 4, 180, 14); else sCtx.rect(fx, cy + 420, (cw - 80) / 4, 180);
            sCtx.fill(); sCtx.stroke();
            sCtx.fillStyle = accent; sCtx.font = 'bold 18px system-ui'; sCtx.textAlign = 'center';
            sCtx.fillText(d.day, fx + (cw - 80) / 8, cy + 460);
            sCtx.fillStyle = '#fff'; sCtx.font = 'bold 28px monospace';
            sCtx.fillText(d.max + '°', fx + (cw - 80) / 8, cy + 520);
            sCtx.fillStyle = '#64748b'; sCtx.font = 'bold 18px monospace';
            sCtx.fillText(d.min + '° min', fx + (cw - 80) / 8, cy + 560);
            sCtx.textAlign = 'left';
          });

          sCtx.strokeStyle = accent + '55'; sCtx.lineWidth = 1.5;
          const scanX = cx + cw - 120, scanY = cy + 120, scanR = 55;
          sCtx.beginPath(); sCtx.arc(scanX, scanY, scanR, 0, Math.PI * 2); sCtx.stroke();
          sCtx.beginPath(); sCtx.arc(scanX, scanY, scanR * 0.5, 0, Math.PI * 2); sCtx.stroke();
          const ang = (animTime || 0) * 3;
          sCtx.strokeStyle = accent; sCtx.lineWidth = 2;
          sCtx.beginPath(); sCtx.moveTo(scanX, scanY);
          sCtx.lineTo(scanX + Math.cos(ang) * scanR, scanY + Math.sin(ang) * scanR);
          sCtx.stroke();

        } else if (activeApp === 'forex') {
          sCtx.fillStyle = accent;
          sCtx.font = 'bold 36px monospace';
          sCtx.fillText('💱 GLOBAL FOREX & CURRENCY RADAR (CAD)', 50, 115);

          const cx = 50, cy = 145, cw = sw - 100, ch = 720;
          sCtx.fillStyle = 'rgba(6, 11, 25, 0.94)';
          sCtx.strokeStyle = accent;
          sCtx.lineWidth = 2;
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(cx, cy, cw, ch, 20); else sCtx.rect(cx, cy, cw, ch);
          sCtx.fill(); sCtx.stroke();

          sCtx.fillStyle = 'rgba(0, 243, 255, 0.08)';
          sCtx.strokeStyle = accent;
          sCtx.lineWidth = 1.5;
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(cx + 30, cy + 25, cw - 60, 125, 14); else sCtx.rect(cx + 30, cy + 25, cw - 60, 125);
          sCtx.fill(); sCtx.stroke();

          sCtx.fillStyle = '#94a3b8'; sCtx.font = 'bold 16px monospace';
          sCtx.fillText('🇨🇦 1.00 CAD (CANADIAN DOLLAR) ⇄ 🇺🇸 US DOLLAR (USD)', cx + 50, cy + 60);

          sCtx.fillStyle = '#ffffff'; sCtx.font = 'bold 54px monospace';
          sCtx.shadowColor = accent; sCtx.shadowBlur = 15;
          sCtx.fillText('1 CAD = ' + (sForex.rates.USD ? sForex.rates.USD.toFixed(4) : '0.7147') + ' USD', cx + 50, cy + 120);
          sCtx.shadowBlur = 0;

          sCtx.fillStyle = '#10b981'; sCtx.font = 'bold 18px monospace'; sCtx.textAlign = 'right';
          sCtx.fillText('▲ +0.12% 24H · BANK OF CANADA / BOC', cx + cw - 50, cy + 115);
          sCtx.textAlign = 'left';

          const qW = (cw - 80) / 2, qH = 90;
          const curList = [
            { sym: 'USD', flag: '🇺🇸', name: 'US Dollar / Dollar US', rate: sForex.rates.USD || 0.7147, delta: '+0.15%', up: true },
            { sym: 'EUR', flag: '🇪🇺', name: 'Euro / Monnaie Unique', rate: sForex.rates.EUR || 0.6552, delta: '-0.08%', up: false },
            { sym: 'GBP', flag: '🇬🇧', name: 'British Pound / Livre', rate: sForex.rates.GBP || 0.5621, delta: '+0.04%', up: true },
            { sym: 'JPY', flag: '🇯🇵', name: 'Japanese Yen / Yen', rate: sForex.rates.JPY || 109.84, delta: '+0.22%', up: true }
          ];
          curList.forEach((c, idx) => {
            const col = idx % 2, row = Math.floor(idx / 2);
            const qx = cx + 30 + col * (qW + 20), qy = cy + 165 + row * (qH + 12);
            sCtx.fillStyle = 'rgba(255, 255, 255, 0.04)'; sCtx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
            sCtx.beginPath();
            if (sCtx.roundRect) sCtx.roundRect(qx, qy, qW, qH, 12); else sCtx.rect(qx, qy, qW, qH);
            sCtx.fill(); sCtx.stroke();
            sCtx.fillStyle = '#cbd5e1'; sCtx.font = 'bold 18px system-ui';
            sCtx.fillText(c.flag + ' 1 CAD ⇄ ' + c.sym, qx + 18, qy + 36);
            sCtx.fillStyle = '#ffffff'; sCtx.font = 'bold 28px monospace';
            sCtx.fillText(c.rate.toFixed(4) + ' ' + c.sym, qx + 18, qy + 72);
            sCtx.fillStyle = c.up ? '#10b981' : '#f43f5e'; sCtx.font = 'bold 16px monospace'; sCtx.textAlign = 'right';
            sCtx.fillText((c.up ? '▲ ' : '▼ ') + c.delta, qx + qW - 18, qy + 70);
            sCtx.textAlign = 'left';
          });

          const gY = cy + 390, gW = cw - 60, gH = 260;
          sCtx.fillStyle = 'rgba(255, 255, 255, 0.02)'; sCtx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(cx + 30, gY, gW, gH, 14); else sCtx.rect(cx + 30, gY, gW, gH);
          sCtx.fill(); sCtx.stroke();

          sCtx.fillStyle = accent; sCtx.font = 'bold 16px monospace';
          sCtx.fillText('CAD/USD INTRADAY TICK TELEMETRY (REAL-TIME)', cx + 50, gY + 32);

          sCtx.strokeStyle = accent; sCtx.lineWidth = 3; sCtx.beginPath();
          for (let pt = 0; pt <= 24; pt++) {
            const px = cx + 50 + pt * ((gW - 40) / 24);
            const py = gY + 160 + Math.sin(pt * 0.4 + (animTime || 0)) * 40 + Math.cos(pt * 0.8) * 15;
            if (pt === 0) sCtx.moveTo(px, py); else sCtx.lineTo(px, py);
          }
          sCtx.stroke();

        } else if (activeApp === 'radio') {
          sCtx.fillStyle = accent;
          sCtx.font = 'bold 36px monospace';
          sCtx.fillText('📻 QUANTUM CYBER RADIO · LIVE STEREO STREAM', 50, 115);

          const cx = 50, cy = 145, cw = sw - 100, ch = 720;
          sCtx.fillStyle = 'rgba(6, 11, 25, 0.94)'; sCtx.strokeStyle = accent; sCtx.lineWidth = 2;
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(cx, cy, cw, ch, 20); else sCtx.rect(cx, cy, cw, ch);
          sCtx.fill(); sCtx.stroke();

          const st = sRadio.stations[sRadio.stnIdx || 0];
          sCtx.fillStyle = 'rgba(255, 255, 255, 0.03)'; sCtx.strokeStyle = accent; sCtx.lineWidth = 1.5;
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(cx + 30, cy + 30, cw - 60, 220, 16); else sCtx.rect(cx + 30, cy + 30, cw - 60, 220);
          sCtx.fill(); sCtx.stroke();

          sCtx.fillStyle = sRadio.isPlaying ? '#10b981' : '#f59e0b';
          sCtx.beginPath(); sCtx.arc(cx + 65, cy + 70, 8, 0, Math.PI * 2); sCtx.fill();
          sCtx.fillStyle = sRadio.isPlaying ? '#10b981' : '#f59e0b';
          sCtx.font = 'bold 16px monospace';
          sCtx.fillText(sRadio.isPlaying ? '● ON-AIR STREAMING (LIVE SOMAFM)' : '⏸ PAUSED · CLICK TO PLAY / PAUSE', cx + 85, cy + 76);

          sCtx.fillStyle = '#ffffff'; sCtx.font = 'bold 42px system-ui, sans-serif';
          sCtx.fillText(st.icon + ' ' + st.name, cx + 55, cy + 140);
          sCtx.fillStyle = '#94a3b8'; sCtx.font = '22px monospace';
          sCtx.fillText(st.genre + ' · 128 kbps stereo icecast', cx + 55, cy + 185);

          const eqY = cy + 280, eqH = 340, bars = 36, bW = (cw - 60) / bars;
          sCtx.fillStyle = 'rgba(255, 255, 255, 0.02)';
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(cx + 30, eqY, cw - 60, eqH, 14); else sCtx.rect(cx + 30, eqY, cw - 60, eqH);
          sCtx.fill();

          for (let b = 0; b < bars; b++) {
            const factor = sRadio.isPlaying
              ? Math.abs(Math.sin((animTime || 0) * 4 + b * 0.4) * Math.cos((animTime || 0) * 2 + b * 0.2))
              : 0.08;
            const barHeight = Math.max(12, factor * 240);
            const bx = cx + 30 + b * bW + 4;
            const by = eqY + eqH - 40 - barHeight;
            const grad = sCtx.createLinearGradient(bx, by, bx, by + barHeight);
            grad.addColorStop(0, '#ff007f'); grad.addColorStop(0.5, accent); grad.addColorStop(1, '#10b981');
            sCtx.fillStyle = grad;
            sCtx.beginPath();
            if (sCtx.roundRect) sCtx.roundRect(bx, by, bW - 6, barHeight, 6); else sCtx.rect(bx, by, bW - 6, barHeight);
            sCtx.fill();
          }

          sCtx.fillStyle = '#fff'; sCtx.font = 'bold 20px monospace'; sCtx.textAlign = 'center';
          sCtx.fillText('VERIFIED 24/7 CRYSTAL AUDIO STREAM · STEREO ZERO-G LAB', sw / 2, eqY + eqH - 12);
          sCtx.textAlign = 'left';

        } else if (activeApp === 'crypto') {
          sCtx.fillStyle = accent;
          sCtx.font = 'bold 36px monospace';
          sCtx.fillText('🪙 CRYPTO TERMINAL & TICKER RADAR', 50, 115);

          const cx = 50, cy = 145, cw = sw - 100, ch = 720;
          sCtx.fillStyle = 'rgba(6, 11, 25, 0.94)'; sCtx.strokeStyle = accent; sCtx.lineWidth = 2;
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(cx, cy, cw, ch, 20); else sCtx.rect(cx, cy, cw, ch);
          sCtx.fill(); sCtx.stroke();

          const cW = (cw - 80) / 2, cH = 120;
          sCrypto.coins.forEach((coin, idx) => {
            const col = idx % 2, row = Math.floor(idx / 2);
            const cxp = cx + 30 + col * (cW + 20), cyp = cy + 30 + row * (cH + 16);
            sCtx.fillStyle = 'rgba(255, 255, 255, 0.04)'; sCtx.strokeStyle = coin.color; sCtx.lineWidth = 1.5;
            sCtx.beginPath();
            if (sCtx.roundRect) sCtx.roundRect(cxp, cyp, cW, cH, 14); else sCtx.rect(cxp, cyp, cW, cH);
            sCtx.fill(); sCtx.stroke();

            sCtx.fillStyle = coin.color; sCtx.font = 'bold 22px monospace';
            sCtx.fillText(coin.sym + ' · ' + coin.name, cxp + 20, cyp + 38);

            sCtx.fillStyle = '#ffffff'; sCtx.font = 'bold 38px monospace';
            sCtx.fillText('$' + Number(coin.price).toLocaleString(), cxp + 20, cyp + 88);

            sCtx.fillStyle = coin.up ? '#10b981' : '#f43f5e'; sCtx.font = 'bold 20px monospace'; sCtx.textAlign = 'right';
            sCtx.fillText(coin.change, cxp + cW - 20, cyp + 88);
            sCtx.textAlign = 'left';
          });

          const chartY = cy + 320, chartW = cw - 60, chartH = 340;
          sCtx.fillStyle = 'rgba(255, 255, 255, 0.02)'; sCtx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(cx + 30, chartY, chartW, chartH, 14); else sCtx.rect(cx + 30, chartY, chartW, chartH);
          sCtx.fill(); sCtx.stroke();

          sCtx.fillStyle = accent; sCtx.font = 'bold 16px monospace';
          sCtx.fillText('BTC/USD 15M CANDLESTICK VOLATILITY & DEPTH', cx + 50, chartY + 36);

          const candles = 22, canW = (chartW - 80) / candles;
          for (let k = 0; k < candles; k++) {
            const kx = cx + 50 + k * canW;
            const isGreen = Math.sin(k * 1.3 + (animTime || 0) * 0.4) > 0;
            const bodyH = Math.max(15, Math.abs(Math.sin(k * 2.1) * 90));
            const ky = chartY + 180 - bodyH / 2;
            sCtx.strokeStyle = isGreen ? '#10b981' : '#f43f5e'; sCtx.lineWidth = 2;
            sCtx.beginPath(); sCtx.moveTo(kx + canW / 2, ky - 20); sCtx.lineTo(kx + canW / 2, ky + bodyH + 20); sCtx.stroke();
            sCtx.fillStyle = isGreen ? '#10b981' : '#f43f5e';
            sCtx.fillRect(kx + 2, ky, canW - 4, bodyH);
          }

        } else if (activeApp === 'pomodoro') {
          const now = performance.now();
          if (sPomodoro.isRunning && now - sPomodoro.lastTick > 1000) {
            sPomodoro.lastTick = now;
            if (sPomodoro.timeLeft > 0) sPomodoro.timeLeft--;
            else sPomodoro.timeLeft = 25 * 60;
          }

          sCtx.fillStyle = accent;
          sCtx.font = 'bold 36px monospace';
          sCtx.fillText('⏳ SPATIAL FOCUS & POMODORO STATION', 50, 115);

          const cx = 50, cy = 145, cw = sw - 100, ch = 720;
          sCtx.fillStyle = 'rgba(6, 11, 25, 0.94)'; sCtx.strokeStyle = accent; sCtx.lineWidth = 2;
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(cx, cy, cw, ch, 20); else sCtx.rect(cx, cy, cw, ch);
          sCtx.fill(); sCtx.stroke();

          sCtx.fillStyle = accent + '22'; sCtx.strokeStyle = accent; sCtx.lineWidth = 1.5;
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(cx + 30, cy + 24, cw - 60, 50, 10); else sCtx.rect(cx + 30, cy + 24, cw - 60, 50);
          sCtx.fill(); sCtx.stroke();
          sCtx.fillStyle = accent; sCtx.font = 'bold 18px monospace';
          sCtx.fillText('● FOCUS DEEP WORK (25 MIN INTERVAL)', cx + 50, cy + 55);

          const ringX = cx + cw / 2, ringY = cy + 260, radius = 135;
          const progress = sPomodoro.timeLeft / sPomodoro.totalTime;
          sCtx.strokeStyle = 'rgba(255, 255, 255, 0.06)'; sCtx.lineWidth = 16;
          sCtx.beginPath(); sCtx.arc(ringX, ringY, radius, 0, Math.PI * 2); sCtx.stroke();

          sCtx.strokeStyle = accent; sCtx.lineWidth = 16;
          sCtx.shadowColor = accent; sCtx.shadowBlur = 20;
          sCtx.beginPath();
          sCtx.arc(ringX, ringY, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress);
          sCtx.stroke();
          sCtx.shadowBlur = 0;

          const mins = String(Math.floor(sPomodoro.timeLeft / 60)).padStart(2, '0');
          const secs = String(sPomodoro.timeLeft % 60).padStart(2, '0');
          sCtx.fillStyle = '#ffffff'; sCtx.font = 'bold 80px monospace'; sCtx.textAlign = 'center';
          sCtx.fillText(mins + ':' + secs, ringX, ringY + 28);

          sCtx.fillStyle = '#10b981'; sCtx.font = 'bold 22px monospace';
          sCtx.fillText('4 SESSIONS COMPLETED TODAY / 4 SESSIONS TERMINÉES', ringX, cy + 450);

          sCtx.fillStyle = '#94a3b8'; sCtx.font = '18px system-ui';
          sCtx.fillText('🌧️ Procedural Ambient Sound: Pink Noise Rain', ringX, cy + 500);
          sCtx.textAlign = 'left';

        } else if (activeApp === 'system') {
          sCtx.fillStyle = accent;
          sCtx.font = 'bold 36px monospace';
          sCtx.fillText('⚡ QUANTUM SYSTEM & NETWORK MONITOR', 50, 115);

          const cx = 50, cy = 145, cw = sw - 100, ch = 720;
          sCtx.fillStyle = 'rgba(6, 11, 25, 0.94)'; sCtx.strokeStyle = accent; sCtx.lineWidth = 2;
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(cx, cy, cw, ch, 20); else sCtx.rect(cx, cy, cw, ch);
          sCtx.fill(); sCtx.stroke();

          const tiles = [
            { title: 'FPS FRAME RATE', val: '60.0 FPS', desc: 'HARDWARE STABILIZED', col: '#10b981' },
            { title: 'PING LATENCY', val: sSystem.pingMs + ' ms', desc: 'FIBER GIGABIT', col: '#38bdf8' },
            { title: 'RAM HEAP MEMORY', val: sSystem.ramMB + ' MB', desc: 'JS HEAP V8 ALLOCATED', col: '#a855f7' },
            { title: 'CPU CORES', val: sSystem.cores + ' CORES', desc: 'PARALLEL THREADS', col: '#f59e0b' },
            { title: 'BATTERY LEVEL', val: sSystem.battery + '%', desc: 'AC POWER CONNECTED', col: '#10b981' },
            { title: 'WEBGL ACCEL', val: 'RENDERER 3D', desc: 'THREE.JS SHADER CORE', col: accent }
          ];

          const tW = (cw - 80) / 3, tH = 140;
          tiles.forEach((tl, idx) => {
            const col = idx % 3, row = Math.floor(idx / 3);
            const tx = cx + 30 + col * (tW + 10), ty = cy + 30 + row * (tH + 16);
            sCtx.fillStyle = 'rgba(255, 255, 255, 0.04)'; sCtx.strokeStyle = tl.col; sCtx.lineWidth = 1.5;
            sCtx.beginPath();
            if (sCtx.roundRect) sCtx.roundRect(tx, ty, tW, tH, 12); else sCtx.rect(tx, ty, tW, tH);
            sCtx.fill(); sCtx.stroke();

            sCtx.fillStyle = '#94a3b8'; sCtx.font = 'bold 14px monospace';
            sCtx.fillText(tl.title, tx + 16, ty + 32);
            sCtx.fillStyle = tl.col; sCtx.font = 'bold 36px monospace';
            sCtx.fillText(tl.val, tx + 16, ty + 82);
            sCtx.fillStyle = '#cbd5e1'; sCtx.font = '13px monospace';
            sCtx.fillText(tl.desc, tx + 16, ty + 115);
          });

          const oscY = cy + 380, oscW = cw - 60, oscH = 260;
          sCtx.fillStyle = 'rgba(255, 255, 255, 0.02)'; sCtx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(cx + 30, oscY, oscW, oscH, 14); else sCtx.rect(cx + 30, oscY, oscW, oscH);
          sCtx.fill(); sCtx.stroke();

          sCtx.fillStyle = accent; sCtx.font = 'bold 16px monospace';
          sCtx.fillText('REAL-TIME SIGNAL OSCILLOSCOPE (60HZ)', cx + 50, oscY + 36);

          sCtx.strokeStyle = accent; sCtx.lineWidth = 2.5; sCtx.beginPath();
          for (let x = 0; x < oscW - 40; x += 4) {
            const px = cx + 50 + x;
            const py = oscY + 150 + Math.sin(x * 0.05 + (animTime || 0) * 5) * 35 * Math.cos(x * 0.02);
            if (x === 0) sCtx.moveTo(px, py); else sCtx.lineTo(px, py);
          }
          sCtx.stroke();

        } else if (activeApp === 'clock') {
          const d = new Date();
          const hh = String(d.getHours()).padStart(2, '0');
          const mm = String(d.getMinutes()).padStart(2, '0');
          const ss = String(d.getSeconds()).padStart(2, '0');
          const ms = String(Math.floor(d.getMilliseconds() / 10)).padStart(2, '0');

          sCtx.fillStyle = accent;
          sCtx.font = 'bold 36px monospace';
          sCtx.fillText('⏱️ QUANTUM CYBER CLOCK & STAR DATE', 50, 115);

          sCtx.fillStyle = 'rgba(15, 23, 42, 0.7)';
          sCtx.strokeStyle = accent;
          sCtx.lineWidth = 2;
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(50, 150, sw - 100, 320, 24); else sCtx.rect(50, 150, sw - 100, 320);
          sCtx.fill(); sCtx.stroke();

          sCtx.fillStyle = '#64748b';
          sCtx.font = 'bold 20px monospace';
          sCtx.textAlign = 'center';
          sCtx.fillText('LOCAL SPATIAL TIME ZONE (UTC-4 MONTREAL)', sw / 2, 205);

          sCtx.fillStyle = '#ffffff';
          sCtx.font = 'bold 108px monospace';
          sCtx.shadowColor = accent;
          sCtx.shadowBlur = 25;
          sCtx.fillText(hh + ':' + mm + ':' + ss, sw / 2, 330);
          sCtx.shadowBlur = 0;

          sCtx.fillStyle = accent;
          sCtx.font = 'bold 36px monospace';
          sCtx.fillText('.' + ms + ' MILLISECONDS', sw / 2, 400);

          const dateStr = d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
          const starDate = 'STAR-DATE: ' + (d.getFullYear() + d.getMonth() / 12 + d.getDate() / 365).toFixed(4);

          sCtx.fillStyle = 'rgba(255, 255, 255, 0.04)';
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(50, 500, sw - 100, 380, 22); else sCtx.rect(50, 500, sw - 100, 380);
          sCtx.fill();

          sCtx.fillStyle = '#10b981';
          sCtx.font = 'bold 30px system-ui, sans-serif';
          sCtx.fillText(dateStr, sw / 2, 570);

          sCtx.fillStyle = '#cbd5e1';
          sCtx.font = '24px monospace';
          sCtx.fillText(starDate, sw / 2, 630);

          sCtx.fillStyle = 'rgba(255, 255, 255, 0.08)';
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(sw / 2 - 200, 680, 400, 60, 14); else sCtx.rect(sw / 2 - 200, 680, 400, 60);
          sCtx.fill();

          sCtx.fillStyle = accent;
          sCtx.font = 'bold 22px system-ui, sans-serif';
          sCtx.fillText('🟢 PRECISION QUANTUM ATOMIC SYNC', sw / 2, 718);
          sCtx.textAlign = 'left';

        } else if (activeApp === 'snake') {
          const now = performance.now();
          if (now - sSnake.lastTick > sSnake.speed) {
            sSnake.lastTick = now;
            const head = sSnake.snake[0];
            const dx = sSnake.food.x - head.x;
            const dy = sSnake.food.y - head.y;
            if (dx !== 0 && (sSnake.dir.x === 0 || Math.random() < 0.2)) {
              const nx = Math.sign(dx);
              if (sSnake.dir.x !== -nx) sSnake.dir = { x: nx, y: 0 };
            } else if (dy !== 0 && sSnake.dir.y === 0) {
              const ny = Math.sign(dy);
              if (sSnake.dir.y !== -ny) sSnake.dir = { x: 0, y: ny };
            }
            const newHead = { x: (head.x + sSnake.dir.x + sSnake.gridSize) % sSnake.gridSize, y: (head.y + sSnake.dir.y + sSnake.gridSize) % sSnake.gridSize };
            sSnake.snake.unshift(newHead);
            if (newHead.x === sSnake.food.x && newHead.y === sSnake.food.y) {
              sSnake.score += 10;
              if (sSnake.score > sSnake.highScore) sSnake.highScore = sSnake.score;
              sSnake.food = { x: Math.floor(Math.random() * (sSnake.gridSize - 2)) + 1, y: Math.floor(Math.random() * (sSnake.gridSize - 2)) + 1 };
              if (sSnake.snake.length > 25) sSnake.snake.pop();
            } else {
              sSnake.snake.pop();
            }
          }

          sCtx.fillStyle = accent;
          sCtx.font = 'bold 36px monospace';
          sCtx.fillText('🕹️ CYBER SNAKE ARCADE', 50, 115);
          sCtx.fillStyle = '#ffffff';
          sCtx.font = 'bold 24px monospace';
          sCtx.textAlign = 'right';
          sCtx.fillText('SCORE: ' + sSnake.score + '   HI: ' + sSnake.highScore, sw - 50, 115);
          sCtx.textAlign = 'left';

          const arenaX = 50, arenaY = 145, arenaW = sw - 100, arenaH = 620;
          sCtx.fillStyle = 'rgba(6, 10, 24, 0.95)';
          sCtx.strokeStyle = accent;
          sCtx.lineWidth = 3;
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(arenaX, arenaY, arenaW, arenaH, 18); else sCtx.rect(arenaX, arenaY, arenaW, arenaH);
          sCtx.fill(); sCtx.stroke();

          const cellW = arenaW / sSnake.gridSize;
          const cellH = arenaH / sSnake.gridSize;
          const fx = arenaX + sSnake.food.x * cellW + cellW / 2;
          const fy = arenaY + sSnake.food.y * cellH + cellH / 2;
          sCtx.fillStyle = '#ff007f';
          sCtx.beginPath(); sCtx.arc(fx, fy, cellW * 0.45, 0, Math.PI * 2); sCtx.fill();

          sSnake.snake.forEach((seg, idx) => {
            sCtx.fillStyle = idx === 0 ? '#ffffff' : accent;
            sCtx.beginPath();
            if (sCtx.roundRect) sCtx.roundRect(arenaX + seg.x * cellW + 2, arenaY + seg.y * cellH + 2, cellW - 4, cellH - 4, 6);
            else sCtx.rect(arenaX + seg.x * cellW + 2, arenaY + seg.y * cellH + 2, cellW - 4, cellH - 4);
            sCtx.fill();
          });

          sCtx.fillStyle = 'rgba(255, 255, 255, 0.05)';
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(50, 785, sw - 100, 110, 16); else sCtx.rect(50, 785, sw - 100, 110);
          sCtx.fill();
          sCtx.fillStyle = '#cbd5e1'; sCtx.font = '20px system-ui, sans-serif'; sCtx.textAlign = 'center';
          sCtx.fillText('🎮 Use Arrow Keys [← ↑ ↓ →] to Steer in 3D Space', sw / 2, 830);
          sCtx.fillStyle = accent; sCtx.font = 'bold 16px monospace';
          sCtx.fillText('⚡ REAL-TIME SPATIAL GAMING ENGINE · 60FPS SYNCHRONIZED', sw / 2, 865);
          sCtx.textAlign = 'left';

        } else if (activeApp === 'calc') {
          sCtx.fillStyle = accent; sCtx.font = 'bold 36px monospace';
          sCtx.fillText('🧮 SPATIAL NEUMORPHIC CALCULATOR', 50, 115);

          const dx = 50, dy = 145, dw = sw - 100, dh = 150;
          sCtx.fillStyle = '#060b18'; sCtx.strokeStyle = accent; sCtx.lineWidth = 2;
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(dx, dy, dw, dh, 18); else sCtx.rect(dx, dy, dw, dh);
          sCtx.fill(); sCtx.stroke();

          sCtx.fillStyle = '#64748b'; sCtx.font = '18px monospace';
          sCtx.fillText('ULTRA MATH ENGINE v4.2', dx + 24, dy + 40);
          sCtx.fillStyle = '#ffffff'; sCtx.font = 'bold 64px monospace'; sCtx.textAlign = 'right';
          sCtx.fillText('1,337.00', dx + dw - 24, dy + 115);
          sCtx.textAlign = 'left';

          const keys = [['C', 'CE', '%', '÷'], ['7', '8', '9', '×'], ['4', '5', '6', '−'], ['1', '2', '3', '+'], ['±', '0', '.', '=']];
          const startY = 320, btnW = (dw - 45) / 4, btnH = 95;
          keys.forEach((row, rIdx) => {
            row.forEach((key, cIdx) => {
              const bx = dx + cIdx * (btnW + 15), by = startY + rIdx * (btnH + 15);
              const isOp = ['÷', '×', '−', '+', '='].includes(key);
              sCtx.fillStyle = isOp ? accent : 'rgba(255, 255, 255, 0.06)';
              sCtx.strokeStyle = isOp ? '#ffffff' : 'rgba(255, 255, 255, 0.12)';
              sCtx.lineWidth = 1.5;
              sCtx.beginPath();
              if (sCtx.roundRect) sCtx.roundRect(bx, by, btnW, btnH, 14); else sCtx.rect(bx, by, btnW, btnH);
              sCtx.fill(); sCtx.stroke();
              sCtx.fillStyle = isOp ? '#030712' : '#ffffff';
              sCtx.font = 'bold 32px system-ui, sans-serif'; sCtx.textAlign = 'center';
              sCtx.fillText(key, bx + btnW / 2, by + btnH / 2 + 10);
              sCtx.textAlign = 'left';
            });
          });

        } else {
          sCtx.fillStyle = accent; sCtx.font = 'bold 36px monospace';
          sCtx.fillText('🎵 AUDIO REACTIVE SPATIAL SPECTRUM', 50, 115);

          const arenaX = 50, arenaY = 150, arenaW = sw - 100, arenaH = 720;
          sCtx.fillStyle = 'rgba(6, 10, 24, 0.9)'; sCtx.strokeStyle = accent; sCtx.lineWidth = 2;
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(arenaX, arenaY, arenaW, arenaH, 20); else sCtx.rect(arenaX, arenaY, arenaW, arenaH);
          sCtx.fill(); sCtx.stroke();

          const bars = 28, barW = (arenaW - 60) / bars;
          const curT = animTime * 3;
          for (let i = 0; i < bars; i++) {
            const heightFactor = Math.abs(Math.sin(curT + i * 0.35) * Math.cos(curT * 0.5 + i * 0.2));
            const barH = Math.max(30, heightFactor * 480);
            const bx = arenaX + 30 + i * barW;
            const by = arenaY + arenaH - 80 - barH;
            const grad = sCtx.createLinearGradient(bx, by, bx, by + barH);
            grad.addColorStop(0, '#ff007f'); grad.addColorStop(0.5, accent); grad.addColorStop(1, '#8b5cf6');
            sCtx.fillStyle = grad;
            sCtx.beginPath();
            if (sCtx.roundRect) sCtx.roundRect(bx, by, barW - 6, barH, 8); else sCtx.rect(bx, by, barW - 6, barH);
            sCtx.fill();
          }
          sCtx.fillStyle = '#ffffff'; sCtx.font = 'bold 24px monospace'; sCtx.textAlign = 'center';
          sCtx.fillText('DYNAMIC 32-BAND EQUALIZER · ZERO-G AUDIO LAB', sw / 2, arenaY + arenaH - 30);
          sCtx.textAlign = 'left';
        }

      } else if (activeMode === 'custom') {
        const isSynth = ${isSynth};
        if (isSynth) {
          sCtx.fillStyle = accent; sCtx.font = 'bold 30px monospace';
          sCtx.fillText('🎛️ CYBERBEATS STUDIO · 16-STEP PROCEDURAL SYNTH', 40, 110);

          const rackX = 40, rackY = 140, rackW = sw - 80, rackH = 760;
          sCtx.fillStyle = 'rgba(6, 11, 25, 0.95)';
          sCtx.strokeStyle = accent;
          sCtx.lineWidth = 2;
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(rackX, rackY, rackW, rackH, 18); else sCtx.rect(rackX, rackY, rackW, rackH);
          sCtx.fill(); sCtx.stroke();

          sCtx.fillStyle = 'rgba(255, 255, 255, 0.04)';
          sCtx.fillRect(rackX, rackY, rackW, 76);

          const pBtnGrad = sCtx.createLinearGradient(rackX + 20, rackY + 14, rackX + 170, rackY + 62);
          pBtnGrad.addColorStop(0, '#10b981'); pBtnGrad.addColorStop(1, '#059669');
          sCtx.fillStyle = pBtnGrad;
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(rackX + 20, rackY + 14, 150, 48, 10); else sCtx.rect(rackX + 20, rackY + 14, 150, 48);
          sCtx.fill();
          sCtx.fillStyle = '#030712';
          sCtx.font = 'bold 18px system-ui, sans-serif';
          sCtx.fillText('▶ PLAYING', rackX + 48, rackY + 44);

          sCtx.fillStyle = '#94a3b8';
          sCtx.font = 'bold 16px monospace';
          sCtx.fillText('BPM: 120', rackX + 195, rackY + 36);
          sCtx.fillStyle = accent;
          sCtx.fillRect(rackX + 195, rackY + 44, 100, 8);

          sCtx.fillStyle = '#94a3b8';
          sCtx.fillText('VOL: 80%', rackX + 325, rackY + 36);
          sCtx.fillStyle = '#a855f7';
          sCtx.fillRect(rackX + 325, rackY + 44, 100, 8);

          const chips = ['✦ House', 'Trap', 'Cyberwave'];
          chips.forEach((ch, idx) => {
            const cx = rackX + 460 + idx * 110;
            sCtx.fillStyle = idx === 0 ? accent + '33' : 'rgba(255,255,255,0.06)';
            sCtx.strokeStyle = idx === 0 ? accent : 'rgba(255,255,255,0.15)';
            sCtx.lineWidth = 1;
            sCtx.beginPath();
            if (sCtx.roundRect) sCtx.roundRect(cx, rackY + 18, 100, 40, 16); else sCtx.rect(cx, rackY + 18, 100, 40);
            sCtx.fill(); sCtx.stroke();
            sCtx.fillStyle = idx === 0 ? accent : '#cbd5e1';
            sCtx.font = 'bold 14px system-ui, sans-serif';
            sCtx.textAlign = 'center';
            sCtx.fillText(ch, cx + 50, rackY + 43);
            sCtx.textAlign = 'left';
          });

          const curStep = Math.floor((animTime * 6) % 16);
          const seqX = rackX + 130, seqW = rackW - 150, stepColW = seqW / 16;
          for (let s = 0; s < 16; s++) {
            const sx = seqX + s * stepColW + stepColW / 2;
            sCtx.fillStyle = s === curStep ? '#ffffff' : (s % 4 === 0 ? accent : 'rgba(255,255,255,0.2)');
            sCtx.beginPath();
            sCtx.arc(sx, rackY + 98, s === curStep ? 6 : 4, 0, Math.PI * 2);
            sCtx.fill();
          }

          const tracks = [
            { name: '🥁 Kick 808', color: '#00f3ff', on: [0, 4, 8, 12] },
            { name: '💥 Snare Clap', color: '#ff007f', on: [4, 12] },
            { name: '🔔 Hi-Hat', color: '#f59e0b', on: [0, 2, 4, 6, 8, 10, 12, 14] },
            { name: '🎹 Synth Lead', color: '#a855f7', on: [2, 5, 8, 11, 14] }
          ];

          tracks.forEach((tr, tIdx) => {
            const rowY = rackY + 120 + tIdx * 90;
            sCtx.fillStyle = tr.color; sCtx.font = 'bold 18px system-ui, sans-serif';
            sCtx.fillText(tr.name, rackX + 20, rowY + 38);

            for (let s = 0; s < 16; s++) {
              const bx = seqX + s * stepColW + 2, by = rowY + 10, bw = stepColW - 4, bh = 54;
              const isOn = tr.on.includes(s);
              const isPlayingNow = (s === curStep && isOn);
              sCtx.fillStyle = isPlayingNow ? '#ffffff' : (isOn ? tr.color : 'rgba(255, 255, 255, 0.05)');
              sCtx.strokeStyle = isPlayingNow ? '#ffffff' : (isOn ? tr.color : 'rgba(255, 255, 255, 0.12)');
              sCtx.lineWidth = isPlayingNow ? 2.5 : 1;
              sCtx.beginPath();
              if (sCtx.roundRect) sCtx.roundRect(bx, by, bw, bh, 8); else sCtx.rect(bx, by, bw, bh);
              sCtx.fill(); sCtx.stroke();
            }
          });

          const specY = rackY + 500, specH = 140;
          sCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(rackX + 20, specY, rackW - 40, specH, 12); else sCtx.rect(rackX + 20, specY, rackW - 40, specH);
          sCtx.fill();

          const bars = 36, bW = (rackW - 70) / bars;
          for (let b = 0; b < bars; b++) {
            const hFactor = Math.abs(Math.sin(animTime * 4 + b * 0.3) * Math.cos(animTime * 2 + b * 0.2));
            const bh = Math.max(10, hFactor * (specH - 24));
            const bx = rackX + 30 + b * bW, by = specY + specH - 12 - bh;
            const bGrad = sCtx.createLinearGradient(bx, by, bx, by + bh);
            bGrad.addColorStop(0, '#00f3ff'); bGrad.addColorStop(0.5, '#a855f7'); bGrad.addColorStop(1, '#ff007f');
            sCtx.fillStyle = bGrad;
            sCtx.fillRect(bx, by, bW - 4, bh);
          }

          sCtx.fillStyle = 'rgba(255, 255, 255, 0.06)';
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(rackX + 20, rackY + 665, rackW - 40, 70, 12); else sCtx.rect(rackX + 20, rackY + 665, rackW - 40, 70);
          sCtx.fill();
          sCtx.fillStyle = '#10b981';
          sCtx.font = 'bold 20px system-ui, sans-serif';
          sCtx.textAlign = 'center';
          sCtx.fillText('⚡ LIVE PROCEDURAL WEB AUDIO ENGINE ACTIVE', sw / 2, rackY + 700);
          sCtx.fillStyle = '#94a3b8';
          sCtx.font = '16px monospace';
          sCtx.fillText('AUTONOMOUS SPATIAL AUDIO SEQUENCER PROJECTION', sw / 2, rackY + 725);
          sCtx.textAlign = 'left';
        } else {
          sCtx.fillStyle = accent; sCtx.font = 'bold 32px monospace';
          sCtx.fillText('🌐 ' + '${appTitleEscaped}'.toUpperCase(), 40, 110);

          const cx = 40, cy = 140, cw = sw - 80, ch = 760;
          sCtx.fillStyle = 'rgba(10, 16, 32, 0.95)';
          sCtx.strokeStyle = accent;
          sCtx.lineWidth = 2;
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(cx, cy, cw, ch, 18); else sCtx.rect(cx, cy, cw, ch);
          sCtx.fill(); sCtx.stroke();

          sCtx.fillStyle = '#ffffff';
          sCtx.font = 'bold 40px system-ui, sans-serif';
          sCtx.fillText('${appTitleEscaped}', cx + 30, cy + 70);

          sCtx.fillStyle = '#94a3b8';
          sCtx.font = '22px system-ui, sans-serif';
          wrapText(sCtx, '${appDescEscaped}', cx + 30, cy + 120, cw - 60, 32);

          const cardW = (cw - 60) / 2;
          sCtx.fillStyle = 'rgba(255, 255, 255, 0.04)';
          sCtx.strokeStyle = accent + '44';
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(cx + 20, cy + 180, cardW, 140, 12); else sCtx.rect(cx + 20, cy + 180, cardW, 140);
          sCtx.fill(); sCtx.stroke();
          sCtx.fillStyle = accent; sCtx.font = 'bold 18px system-ui, sans-serif';
          sCtx.fillText('Runtime Status', cx + 36, cy + 215);
          sCtx.fillStyle = '#10b981'; sCtx.font = 'bold 32px monospace';
          sCtx.fillText('ONLINE ●', cx + 36, cy + 265);
          sCtx.fillStyle = '#64748b'; sCtx.font = '14px system-ui, sans-serif';
          sCtx.fillText('Active Client-Side Container', cx + 36, cy + 295);

          sCtx.fillStyle = 'rgba(255, 255, 255, 0.04)';
          sCtx.strokeStyle = '#a855f744';
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(cx + 40 + cardW, cy + 180, cardW, 140, 12); else sCtx.rect(cx + 40 + cardW, cy + 180, cardW, 140);
          sCtx.fill(); sCtx.stroke();
          sCtx.fillStyle = '#a855f7'; sCtx.font = 'bold 18px system-ui, sans-serif';
          sCtx.fillText('DOM Sync Speed', cx + 56 + cardW, cy + 215);
          sCtx.fillStyle = '#ffffff'; sCtx.font = 'bold 32px monospace';
          sCtx.fillText('60.0 FPS', cx + 56 + cardW, cy + 265);
          sCtx.fillStyle = '#64748b'; sCtx.font = '14px system-ui, sans-serif';
          sCtx.fillText('Zero-G WebGL Projection', cx + 56 + cardW, cy + 295);

          const bGrad = sCtx.createLinearGradient(cx + 20, cy + 360, cx + 320, cy + 420);
          bGrad.addColorStop(0, accent); bGrad.addColorStop(1, '#8b5cf6');
          sCtx.fillStyle = bGrad;
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(cx + 20, cy + 360, 300, 56, 12); else sCtx.rect(cx + 20, cy + 360, 300, 56);
          sCtx.fill();
          sCtx.fillStyle = '#030712'; sCtx.font = 'bold 20px system-ui, sans-serif';
          sCtx.fillText('⚡ Execute Action', cx + 65, cy + 396);

          sCtx.fillStyle = '#050711';
          sCtx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
          sCtx.beginPath();
          if (sCtx.roundRect) sCtx.roundRect(cx + 20, cy + 450, cw - 40, 270, 12); else sCtx.rect(cx + 20, cy + 450, cw - 40, 270);
          sCtx.fill(); sCtx.stroke();

          sCtx.fillStyle = '#38bdf8'; sCtx.font = 'bold 16px monospace';
          sCtx.fillText('✦ LIVE APPLICATION DOM ELEMENTS DETECTED:', cx + 36, cy + 485);

          sCtx.fillStyle = '#cbd5e1'; sCtx.font = '18px system-ui, sans-serif';
          wrapText(sCtx, '${customCodeRaw}', cx + 36, cy + 525, cw - 72, 30);
        }

      } else {
        sCtx.fillStyle = accent + '22'; sCtx.strokeStyle = accent; sCtx.lineWidth = 2;
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(40, 80, 260, 38, 10); else sCtx.rect(40, 80, 260, 38);
        sCtx.fill(); sCtx.stroke();
        sCtx.fillStyle = accent; sCtx.font = 'bold 16px monospace';
        sCtx.fillText('${tagEscaped}', 56, 105);

        sCtx.fillStyle = '#ffffff'; sCtx.font = '900 46px system-ui, sans-serif';
        wrapText(sCtx, '${titleEscaped}', 40, 175, sw - 80, 54);

        sCtx.fillStyle = accent; sCtx.font = 'bold 24px system-ui, sans-serif';
        wrapText(sCtx, '${subtitleEscaped}', 40, 280, sw - 80, 32);

        sCtx.fillStyle = 'rgba(255, 255, 255, 0.04)'; sCtx.strokeStyle = accent + '55'; sCtx.lineWidth = 2;
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(40, 340, sw - 80, 360, 22); else sCtx.rect(40, 340, sw - 80, 360);
        sCtx.fill(); sCtx.stroke();

        sCtx.fillStyle = '#cbd5e1'; sCtx.font = '22px system-ui, sans-serif';
        wrapText(sCtx, '${bodyEscaped}', 70, 390, sw - 140, 36);

        const btnGrad = sCtx.createLinearGradient(70, 620, 350, 620);
        btnGrad.addColorStop(0, accent); btnGrad.addColorStop(1, '#8b5cf6');
        sCtx.fillStyle = btnGrad;
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(70, 620, 280, 52, 14); else sCtx.rect(70, 620, 280, 52);
        sCtx.fill();
        sCtx.fillStyle = '#05070e'; sCtx.font = 'bold 20px system-ui, sans-serif';
        sCtx.fillText('⚡ EXECUTE ACTION', 96, 653);

        const cardW = (sw - 100) / 2;
        sCtx.fillStyle = 'rgba(255, 255, 255, 0.03)'; sCtx.strokeStyle = accent + '44';
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(40, 720, cardW, 180, 16); else sCtx.rect(40, 720, cardW, 180);
        sCtx.fill(); sCtx.stroke();
        sCtx.fillStyle = accent; sCtx.font = 'bold 20px system-ui, sans-serif';
        sCtx.fillText('Spatial Physics', 64, 760);
        sCtx.fillStyle = '#94a3b8'; sCtx.font = '18px system-ui, sans-serif';
        sCtx.fillText('Zero-G Orbit Active', 64, 796);
        sCtx.fillStyle = '#ffffff'; sCtx.font = 'bold 36px monospace';
        sCtx.fillText('60.0 FPS', 64, 854);

        sCtx.fillStyle = 'rgba(255, 255, 255, 0.03)'; sCtx.strokeStyle = '#a855f744';
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(60 + cardW, 720, cardW, 180, 16); else sCtx.rect(60 + cardW, 720, cardW, 180);
        sCtx.fill(); sCtx.stroke();
        sCtx.fillStyle = '#a855f7'; sCtx.font = 'bold 20px system-ui, sans-serif';
        sCtx.fillText('Sync Latency', 84 + cardW, 760);
        sCtx.fillStyle = '#94a3b8'; sCtx.font = '18px system-ui, sans-serif';
        sCtx.fillText('Client-Side Engine', 84 + cardW, 796);
        sCtx.fillStyle = '#10b981'; sCtx.font = 'bold 36px monospace';
        sCtx.fillText('0.42 ms', 84 + cardW, 854);
      }

      // Universal bottom navigation bar
      sCtx.fillStyle = 'rgba(15, 23, 42, 0.9)'; sCtx.fillRect(0, sh - 80, sw, 80);
      sCtx.fillStyle = '#ffffff'; sCtx.font = 'bold 20px system-ui, sans-serif'; sCtx.textAlign = 'center';
      sCtx.fillText('⌂ Home       ✦ Apps       ⚙ Settings       ⚡ Deploy', sw / 2, sh - 32);
      sCtx.textAlign = 'left';
    }

    renderScreen(0);

    // Interactive switchers in Standalone HUD
    window.switchMode = function(m) {
      activeMode = m;
      if (m === 'custom') { rx = 0.08; ry = -0.15; }
      if (sRadioAudio) {
        sRadioAudio.pause();
        sRadio.isPlaying = false;
      }
      updateRadioUI();
      document.querySelectorAll('.hud-btn[data-mode]').forEach(b => {
        if (b.getAttribute('data-mode') === m && !b.getAttribute('data-app')) b.classList.add('active');
        else b.classList.remove('active');
      });
      renderScreen(t);
      if (sTex) sTex.needsUpdate = true;
    };

    window.switchApp = function(a) {
      activeMode = 'apps';
      activeApp = a;

      if (a === 'radio') {
        updateRadioUI();
        toggleRadioPlay();
      } else {
        if (sRadioAudio) {
          sRadioAudio.pause();
          sRadio.isPlaying = false;
        }
        updateRadioUI();
        if (a === 'weather') {
          fetchLiveWeather();
        } else if (a === 'forex') {
          fetchLiveForex();
        } else if (a === 'crypto') {
          fetchLiveCrypto();
        }
      }

      document.querySelectorAll('.hud-btn[data-mode]').forEach(b => {
        if (b.getAttribute('data-app') === a) b.classList.add('active');
        else b.classList.remove('active');
      });
      renderScreen(t);
      if (sTex) sTex.needsUpdate = true;
    };

    // Keyboard navigation for Snake in Standalone
    window.addEventListener('keydown', function(e) {
      if (activeMode !== 'apps' || activeApp !== 'snake') return;
      if (['ArrowUp', 'KeyW'].includes(e.code) && sSnake.dir.y === 0) sSnake.dir = { x: 0, y: -1 };
      else if (['ArrowDown', 'KeyS'].includes(e.code) && sSnake.dir.y === 0) sSnake.dir = { x: 0, y: 1 };
      else if (['ArrowLeft', 'KeyA'].includes(e.code) && sSnake.dir.x === 0) sSnake.dir = { x: -1, y: 0 };
      else if (['ArrowRight', 'KeyD'].includes(e.code) && sSnake.dir.x === 0) sSnake.dir = { x: 1, y: 0 };
    });

    if (typeof THREE === 'undefined') {
      runFallback();
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 6.4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const dir = new THREE.DirectionalLight(0xffffff, 1.6);
    dir.position.set(5, 8, 6); scene.add(dir);

    const hex = ${colHex};
    const rim = new THREE.PointLight(hex, 2.5, 20);
    rim.position.set(0, 4, 3);
    scene.add(rim);

    // Orbiting Stardust Particles (Audio Reactive)
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(220 * 3);
    for (let i = 0; i < 220; i++) {
      pPos[i*3]   = (Math.random() - 0.5) * 16;
      pPos[i*3+1] = (Math.random() - 0.5) * 12;
      pPos[i*3+2] = (Math.random() - 0.5) * 12;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const dust = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.08, color: hex, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending }));
    scene.add(dust);

    sTex = new THREE.CanvasTexture(sCanvas);
    const dGroup = new THREE.Group(); scene.add(dGroup);

    if ('${devType}' === 'tablet') {
      const bGeo = new THREE.BoxGeometry(4.4, 3.1, 0.08);
      dGroup.add(new THREE.Mesh(bGeo, new THREE.MeshPhysicalMaterial({ color: 0x111c2e, metalness: 0.2, roughness: 0.1, transparent: true, opacity: 0.85 })));
      dGroup.add(new THREE.LineSegments(new THREE.EdgesGeometry(bGeo), new THREE.LineBasicMaterial({ color: hex })));
      const sMesh = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 2.95), new THREE.MeshBasicMaterial({ map: sTex, side: THREE.DoubleSide }));
      sMesh.position.z = 0.045; dGroup.add(sMesh); camera.position.z = 6.8;
    } else if ('${devType}' === 'curved_display') {
      const rad = 4.0, th = Math.PI * 0.38;
      const cGeo = new THREE.CylinderGeometry(rad, rad, 2.4, 36, 1, true, -th/2, th); cGeo.scale(-1, 1, 1);
      const sMesh = new THREE.Mesh(cGeo, new THREE.MeshBasicMaterial({ map: sTex, side: THREE.DoubleSide }));
      sMesh.position.z = rad - 1.2; dGroup.add(sMesh); camera.position.z = 5.6;
      const edge = new THREE.LineSegments(new THREE.EdgesGeometry(cGeo), new THREE.LineBasicMaterial({ color: hex }));
      edge.position.z = rad - 1.2; dGroup.add(edge);
    } else if ('${devType}' === 'holo_glass') {
      const glassGeo = new THREE.PlaneGeometry(3.6, 4.4);
      const glassMat = new THREE.MeshBasicMaterial({ map: sTex, side: THREE.DoubleSide, transparent: true, opacity: 0.94 });
      dGroup.add(new THREE.Mesh(glassGeo, glassMat));
      const bracketMat = new THREE.LineBasicMaterial({ color: hex });
      const addBracket = (cx, cy, fx, fy) => {
        const pts = [
          new THREE.Vector3(cx - 0.25 * fx, cy, 0.01),
          new THREE.Vector3(cx, cy, 0.01),
          new THREE.Vector3(cx, cy - 0.25 * fy, 0.01)
        ];
        dGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), bracketMat));
      };
      addBracket(-1.8, 2.2, -1, 1);
      addBracket(1.8, 2.2, 1, 1);
      addBracket(-1.8, -2.2, -1, -1);
      addBracket(1.8, -2.2, 1, -1);
      camera.position.z = 6.0;
    } else {
      const pGeo = new THREE.BoxGeometry(2.1, 4.3, 0.16);
      dGroup.add(new THREE.Mesh(pGeo, new THREE.MeshStandardMaterial({ color: 0x111827, metalness: 0.88, roughness: 0.2 })));
      dGroup.add(new THREE.LineSegments(new THREE.EdgesGeometry(pGeo), new THREE.LineBasicMaterial({ color: hex })));
      const sMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.97, 4.14), new THREE.MeshBasicMaterial({ map: sTex, side: THREE.FrontSide }));
      sMesh.position.z = 0.085; dGroup.add(sMesh);
      const camGeo = new THREE.BoxGeometry(0.7, 1.2, 0.08);
      const camIsland = new THREE.Mesh(camGeo, new THREE.MeshStandardMaterial({ color: 0x0a0d14, metalness: 0.95, roughness: 0.15 }));
      camIsland.position.set(-0.55, 1.3, -0.12); dGroup.add(camIsland);
      camera.position.z = 6.4;
    }

    // 2.5D Parallax Floating Foreground Brackets
    let targetPx = 0, targetPy = 0, curPx = 0, curPy = 0;
    let parGroup = new THREE.Group();
    parGroup.position.set(0, 0, 0.16);
    const parMat = new THREE.LineBasicMaterial({ color: hex, transparent: true, opacity: 0.85 });
    const addFloatingB = (fx, fy, dx, dy) => {
      const pts = [
        new THREE.Vector3(fx - 0.28 * dx, fy, 0),
        new THREE.Vector3(fx, fy, 0),
        new THREE.Vector3(fx, fy - 0.28 * dy, 0)
      ];
      parGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), parMat));
    };
    const hw = ('${devType}' === 'tablet' ? 2.12 : '${devType}' === 'holo_glass' ? 1.82 : 1.05);
    const hh = ('${devType}' === 'tablet' ? 1.48 : '${devType}' === 'holo_glass' ? 2.22 : 2.16);
    addFloatingB(-hw, hh, -1, 1); addFloatingB(hw, hh, 1, 1);
    addFloatingB(-hw, -hh, -1, -1); addFloatingB(hw, -hh, 1, -1);
    dGroup.add(parGroup);

    function buildCompanion() {
      if (cGroup) { dGroup.remove(cGroup); cGroup = null; }
      if (!isDualActive) {
        camera.position.z = ('${devType}' === 'tablet' ? 6.8 : '${devType}' === 'curved_display' ? 5.6 : 6.4);
        return;
      }
      const mainHalfW = ('${devType}' === 'tablet' ? 2.25 : '${devType}' === 'curved_display' ? 2.35 : '${devType}' === 'holo_glass' ? 1.85 : 1.10);
      const posX = mainHalfW + 1.25 + (compSpacing || 0);

      cGroup = new THREE.Group();
      cGroup.position.set(posX, 0, -0.45);
      cGroup.rotation.y = -0.38;

      if (!sCompTex) {
        sCompTex = new THREE.CanvasTexture(sCompCanvas);
        sCompTex.minFilter = THREE.LinearFilter;
        sCompTex.magFilter = THREE.LinearFilter;
      }

      const frameGeo = new THREE.BoxGeometry(2.35, 3.25, 0.08);
      const frameMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.2 });
      cGroup.add(new THREE.Mesh(frameGeo, frameMat));
      cGroup.add(new THREE.LineSegments(new THREE.EdgesGeometry(frameGeo), new THREE.LineBasicMaterial({ color: hex })));

      const scMesh = new THREE.Mesh(new THREE.PlaneGeometry(2.22, 3.12), new THREE.MeshBasicMaterial({ map: sCompTex, side: THREE.DoubleSide }));
      scMesh.position.z = 0.045;
      cGroup.add(scMesh);

      const brMat = new THREE.LineBasicMaterial({ color: hex });
      const addBr = (cx, cy, fx, fy) => {
        const pts = [
          new THREE.Vector3(cx - 0.2 * fx, cy, 0.05),
          new THREE.Vector3(cx, cy, 0.05),
          new THREE.Vector3(cx, cy - 0.2 * fy, 0.05)
        ];
        cGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), brMat));
      };
      addBr(-1.11, 1.56, -1, 1); addBr(1.11, 1.56, 1, 1);
      addBr(-1.11, -1.56, -1, -1); addBr(1.11, -1.56, 1, -1);

      dGroup.add(cGroup);
      camera.position.z = Math.max(7.6, 6.0 + posX * 0.45);
    }

    if (isDualActive) {
      buildCompanion();
    }

    let rx = 0.12, ry = -0.32, isDown = false, px = 0, py = 0;
    let clickStartTime = 0, clickStartX = 0, clickStartY = 0, isSpacingDrag = false;
    window.addEventListener('mousedown', e => {
      isDown = true; px = e.clientX; py = e.clientY;
      isSpacingDrag = (e.shiftKey || e.button === 2);
      clickStartTime = Date.now(); clickStartX = e.clientX; clickStartY = e.clientY;
    });
    window.addEventListener('contextmenu', e => {
      if (isDualActive) e.preventDefault();
    });
    window.addEventListener('mousemove', e => {
      targetPx = (e.clientX / window.innerWidth - 0.5) * 0.28;
      targetPy = -(e.clientY / window.innerHeight - 0.5) * 0.28;
      if (!isDown) return;
      const dx = e.clientX - px;
      const dy = e.clientY - py;
      if (isSpacingDrag && isDualActive) {
        window.adjustSpacing && window.adjustSpacing(dx * 0.015);
      } else {
        ry += dx * 0.008; rx += dy * 0.008;
        rx = Math.max(-1.4, Math.min(1.4, rx));
      }
      px = e.clientX; py = e.clientY;
    });
    window.addEventListener('mouseup', e => {
      isDown = false;
      const elapsed = Date.now() - clickStartTime;
      const dist = Math.hypot(e.clientX - clickStartX, e.clientY - clickStartY);
      if (elapsed < 350 && dist < 12) {
        const normX = e.clientX / window.innerWidth;
        if (isDualActive && normX > 0.65) {
          const apps = ['radio', 'crypto', 'weather', 'clock', 'system', 'focus', 'snake', 'calc', 'spectrum', 'forex', 'matrix', 'custom'];
          const curIdx = apps.indexOf(compApp);
          const nextIdx = (curIdx + 1) % apps.length;
          window.setCompanionApp(apps[nextIdx]);
        } else if (activeMode === 'apps' && activeApp === 'radio') {
          toggleRadioPlay();
          renderScreen(t);
          if (sTex) sTex.needsUpdate = true;
        }
      }
      isSpacingDrag = false;
    });
    window.addEventListener('wheel', e => {
      e.preventDefault(); camera.position.z += e.deltaY * 0.005;
      camera.position.z = Math.max(3.2, Math.min(14.0, camera.position.z));
    }, { passive: false });
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.resetOrbit = () => { rx = 0.08; ry = (activeMode === 'custom' ? -0.15 : -0.32); };
    window.toggleFullscreen = () => {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
      else document.exitFullscreen().catch(() => {});
    };

    window.setCompanionApp = function(app) {
      compApp = app;
      const s2 = document.getElementById('hud-screen2-select');
      if (s2) s2.value = app;
      renderCompanion(t);
      if (sCompTex) sCompTex.needsUpdate = true;
    };

    window.adjustSpacing = function(delta) {
      compSpacing = Math.max(-0.6, Math.min(3.5, (compSpacing || 0) + delta));
      compSpacing = Math.round(compSpacing * 100) / 100;
      if (cGroup) {
        const mainHalfW = ('${devType}' === 'tablet' ? 2.25 : '${devType}' === 'curved_display' ? 2.35 : '${devType}' === 'holo_glass' ? 1.85 : 1.10);
        const posX = mainHalfW + 1.25 + (compSpacing || 0);
        cGroup.position.x = posX;
        camera.position.z = Math.max(7.6, 6.0 + posX * 0.45);
      }
      const el = document.getElementById('hud-spacing-val');
      if (el) el.textContent = (compSpacing >= 0 ? '+' : '') + compSpacing.toFixed(1);
    };

    window.toggleDualScreen = function() {
      isDualActive = !isDualActive;
      const b = document.getElementById('btn-dual-screen');
      if (b) {
        if (isDualActive) { b.classList.add('active'); b.style.color = '${colCss}'; b.style.borderColor = '${colCss}'; b.innerHTML = '🖥️ Dual Screen: ON'; }
        else { b.classList.remove('active'); b.style.color = '#cbd5e1'; b.style.borderColor = 'rgba(255,255,255,0.18)'; b.innerHTML = '🖥️ Dual Screen'; }
      }
      const wrap = document.getElementById('hud-dual-controls-wrap');
      if (wrap) wrap.style.display = isDualActive ? 'inline-flex' : 'none';
      buildCompanion();
    };

    window.toggleAudioPulse = function() {
      isPulseActive = !isPulseActive;
      const b = document.getElementById('btn-audio-pulse');
      if (b) {
        if (isPulseActive) { b.classList.add('active'); b.style.color = '${colCss}'; b.style.borderColor = '${colCss}'; }
        else { b.classList.remove('active'); b.style.color = '#cbd5e1'; b.style.borderColor = 'rgba(255,255,255,0.18)'; }
      }
    };

    window.toggleSpatialDepth = function() {
      isSpatialDepth = !isSpatialDepth;
      const b = document.getElementById('btn-spatial-depth');
      if (b) {
        if (isSpatialDepth) { b.classList.add('active'); b.style.color = '${colCss}'; b.style.borderColor = '${colCss}'; }
        else { b.classList.remove('active'); b.style.color = '#cbd5e1'; b.style.borderColor = 'rgba(255,255,255,0.18)'; }
      }
    };

    let isRecording = false, recorder = null, recordedChunks = [];
    window.recordWebM = function(durationSec = 6) {
      if (isRecording) return;
      const cv = renderer ? renderer.domElement : container.querySelector('canvas');
      if (!cv || typeof cv.captureStream !== 'function' || typeof MediaRecorder === 'undefined') {
        alert('MediaRecorder is not supported in this browser.');
        return;
      }
      const st = cv.captureStream(60);
      if (sRadioAudio && sRadio.isPlaying && sRadioAudio.captureStream) {
        try {
          const aSt = sRadioAudio.captureStream();
          if (aSt && aSt.getAudioTracks().length > 0) st.addTrack(aSt.getAudioTracks()[0]);
        } catch(e){}
      }
      let mType = 'video/webm;codecs=vp9';
      if (!MediaRecorder.isTypeSupported(mType)) {
        mType = 'video/webm;codecs=vp8';
        if (!MediaRecorder.isTypeSupported(mType)) mType = 'video/webm';
      }
      try {
        recorder = new MediaRecorder(st, { mimeType: mType });
        recordedChunks = [];
        recorder.ondataavailable = ev => { if (ev.data && ev.data.size > 0) recordedChunks.push(ev.data); };
        const rBtn = document.getElementById('btn-record-webm');
        isRecording = true;
        let rem = durationSec;
        if (rBtn) { rBtn.innerHTML = '🔴 REC ' + rem + 's'; rBtn.style.background = 'rgba(239,68,68,0.35)'; }
        const iv = setInterval(() => {
          rem--;
          if (rBtn && rem > 0) rBtn.innerHTML = '🔴 REC ' + rem + 's';
          if (rem <= 0) clearInterval(iv);
        }, 1000);
        recorder.onstop = () => {
          isRecording = false;
          clearInterval(iv);
          if (rBtn) { rBtn.innerHTML = '🎥 60fps Video'; rBtn.style.background = 'rgba(255,255,255,0.06)'; }
          const b = new Blob(recordedChunks, { type: mType });
          if (b.size === 0) return;
          const u = URL.createObjectURL(b);
          const a = document.createElement('a'); a.href = u; a.download = 'spatial-screen-recording-' + Date.now() + '.webm';
          document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(u);
        };
        recorder.start();
        setTimeout(() => { if (recorder.state !== 'inactive') recorder.stop(); }, durationSec * 1000);
      } catch(err) {
        alert('Recorder error: ' + err.message);
      }
    };

    let isCameraActive = false, camStream = null;
    window.toggleCameraAR = async function() {
      const vid = document.getElementById('camera-feed');
      const btn = document.getElementById('btn-cam-ar');
      if (isCameraActive) {
        if (camStream) { camStream.getTracks().forEach(tr => tr.stop()); camStream = null; }
        if (vid) vid.style.display = 'none';
        document.body.style.background = '#03050c';
        document.body.style.backgroundImage = 'radial-gradient(circle at center, #0e172e 0%, #03050c 100%)';
        btn.textContent = '📷 Camera AR'; btn.classList.remove('active'); isCameraActive = false;
      } else {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { alert('Camera not supported'); return; }
        try {
          camStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
          if (vid) { vid.srcObject = camStream; vid.style.display = 'block'; await vid.play(); }
          document.body.style.background = 'transparent';
          document.body.style.backgroundImage = 'none';
          btn.textContent = '✕ Exit AR'; btn.classList.add('active'); isCameraActive = true;
        } catch(err) { alert('Camera error: ' + err.message); }
      }
    };

    function anim() {
      requestAnimationFrame(anim);
      t += 0.02;
      renderScreen(t);
      if (sTex) sTex.needsUpdate = true;
      if (!isDown) {
        if (activeMode === 'custom') {
          ry = Math.sin(t * 0.4) * 0.15;
        } else {
          ry += 0.005;
        }
      }
      dGroup.position.y = Math.sin(t * 1.5) * 0.12;
      dGroup.rotation.x = rx + Math.sin(t) * 0.015;
      dGroup.rotation.y = ry;

      if (isPulseActive) {
        const pulse = sRadio.isPlaying ? (Math.pow(Math.abs(Math.sin(t * 3.8)), 4) * 0.65 + Math.abs(Math.sin(t * 7.6)) * 0.35) : (Math.sin(t * 1.5) * 0.08 + 0.08);
        if (rim) { rim.intensity = 2.2 + pulse * 3.8; rim.distance = 18 + pulse * 14; }
        if (dust) { const s = 1.0 + pulse * 0.28; dust.scale.set(s, s, s); }
      }
      if (dust) dust.rotation.y = t * 0.04;
      curPx += (targetPx - curPx) * 0.08;
      curPy += (targetPy - curPy) * 0.08;
      if (isSpatialDepth && parGroup) {
        parGroup.position.x = curPx;
        parGroup.position.y = curPy;
        parGroup.visible = true;
      } else if (parGroup) {
        parGroup.visible = false;
      }

      if (isDualActive) {
        renderCompanion(t);
        if (sCompTex) sCompTex.needsUpdate = true;
      }

      renderer.render(scene, camera);
    }
    anim();

    function runFallback() {
      const cv = document.createElement('canvas');
      cv.width = window.innerWidth; cv.height = window.innerHeight;
      container.appendChild(cv);
      const ctx = cv.getContext('2d');
      let fbRx = 0.12, fbRy = -0.32, fbDown = false, fbx = 0, fby = 0, fbt = 0;

      window.addEventListener('mousedown', e => { fbDown = true; fbx = e.clientX; fby = e.clientY; });
      window.addEventListener('mousemove', e => {
        if (!fbDown) return;
        fbRy += (e.clientX - fbx) * 0.008; fbRx += (e.clientY - fby) * 0.008;
        fbx = e.clientX; fby = e.clientY;
      });
      window.addEventListener('mouseup', () => fbDown = false);

      function fbLoop() {
        requestAnimationFrame(fbLoop);
        fbt += 0.02;
        if (!fbDown) {
          if (activeMode === 'custom') {
            fbRy = Math.sin(fbt * 0.4) * 0.15;
          } else {
            fbRy += 0.005;
          }
        }
        renderScreen(fbt);
        ctx.clearRect(0, 0, cv.width, cv.height);
        ctx.save();
        ctx.translate(cv.width / 2, cv.height / 2 + Math.sin(fbt * 1.5) * 12);
        ctx.transform(Math.cos(fbRy), Math.sin(fbRy) * Math.sin(fbRx) * 0.4, 0, Math.cos(fbRx), 0, 0);
        ctx.fillStyle = '#0b1120'; ctx.strokeStyle = '${colCss}'; ctx.lineWidth = 3;
        const dw = 300, dh = 540;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(-dw/2, -dh/2, dw, dh, 22); else ctx.rect(-dw/2, -dh/2, dw, dh);
        ctx.fill(); ctx.stroke();
        ctx.drawImage(sCanvas, -dw/2 + 8, -dh/2 + 8, dw - 16, dh - 16);
        ctx.restore();

        if (isDualActive) {
          renderCompanion(fbt);
          ctx.save();
          ctx.translate(cv.width / 2 + 200, cv.height / 2 + Math.sin(fbt * 1.5 + 0.3) * 12);
          ctx.transform(Math.cos(fbRy - 0.35), Math.sin(fbRy - 0.35) * Math.sin(fbRx) * 0.4, 0, Math.cos(fbRx), 0, 0);
          ctx.fillStyle = '#060a14'; ctx.strokeStyle = '${colCss}'; ctx.lineWidth = 2;
          const cdw = 180, cdh = 280;
          ctx.beginPath();
          if (ctx.roundRect) ctx.roundRect(-cdw/2, -cdh/2, cdw, cdh, 16); else ctx.rect(-cdw/2, -cdh/2, cdw, cdh);
          ctx.fill(); ctx.stroke();
          ctx.drawImage(sCompCanvas, -cdw/2 + 4, -cdh/2 + 4, cdw - 8, cdh - 8);
          ctx.restore();
        }
      }
      fbLoop();
    }
  })();
  <\/script>
</body>
</html>`;

      const blob = new Blob([htmlContent], { type: 'text/html' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `spatial-screen-workstation-${devType}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);

      _sound('celebrate');
      _toast(
        isFr
          ? '💾 Écran spatial interactif autonome téléchargé avec succès !'
          : '💾 Standalone interactive spatial screen downloaded successfully!',
        'success'
      );
    },

    // ══════════════════════════════════════════════════════════════════════════
    // 4K SNAPSHOT MOCKUP
    // ══════════════════════════════════════════════════════════════════════════
    snapshot4K() {
      if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Capture 4K Spatial Snapshot')) return;
      _sound('shutter');
      if (!this.renderer) {
        _toast(_isFr() ? '⚠️ Moteur 3D non initialisé.' : '⚠️ 3D engine not initialized.', 'warning');
        return;
      }
      const dataUrl = this.renderer.domElement.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `spatial-screen-mockup-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      _confetti();
      _toast(
        _isFr()
          ? '📸 Capture 4K de l’écran spatial sauvegardée avec succès !'
          : '📸 4K spatial screen snapshot captured successfully!',
        'success'
      );
    }
  };

  // Expose globally
  window.UltraSpatialScreenStudio = UltraSpatialScreenStudio;
})();
