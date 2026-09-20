// ══════════════════════════════════════════════════════════════════════════════
// IA ARCHITECTE STUDIO ULTRA — GLOBAL SATELLITE & 3D EARTH TELEMETRY (v1.0)
// UltraGlobalSatelliteDeck (modal-global-satellite-deck)
// 100% Client-Side Three.js WebGL 3D Earth, Orbiting Satellites & Edge Ping Radar
// Planetary CDN Simulator, Subsea Cable Failover & Live Latency Matrix
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
      console.log('[UltraGlobalSatelliteDeck]', msg);
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
          ? `✨ ${label || 'Télémetrie Satellite 3D'} injectée dans votre projet avec succès !`
          : `✨ ${label || '3D Global Satellite Deck'} successfully injected into your project!`,
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

  
  function _createEarthTexture() {
    const cvs = document.createElement('canvas');
    cvs.width = 1024; cvs.height = 512;
    const ctx = cvs.getContext('2d');

    // Deep oceanic background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 512);
    bgGrad.addColorStop(0, '#020617');
    bgGrad.addColorStop(0.5, '#040d21');
    bgGrad.addColorStop(1, '#020617');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 512);

    // Subtle latitude & longitude coordinate graticule
    ctx.strokeStyle = 'rgba(56,189,248,0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= 1024; x += 64) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 512); ctx.stroke();
    }
    for (let y = 0; y <= 512; y += 42) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1024, y); ctx.stroke();
    }

    // Equator neon line
    ctx.strokeStyle = 'rgba(0,243,255,0.2)';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, 256); ctx.lineTo(1024, 256); ctx.stroke();

    // Continent Landmasses (True Geographical Polygons)
    const continents = [
      // North America (Canada, USA, Mexico, Central America)
      [[34,71],[57,54],[114,57],[156,43],[242,28],[284,43],[341,71],[356,100],[327,128],[313,136],[299,156],[284,185],[279,190],[262,196],[264,216],[276,228],[293,233],[284,233],[276,228],[256,213],[236,205],[213,190],[199,171],[179,162],[159,142],[156,117],[142,99],[114,85],[85,85],[57,91],[43,85],[34,71]],
      // South America (Brazil, Argentina, Andes, Colombia)
      [[293,233],[307,225],[341,228],[370,256],[412,270],[412,284],[404,293],[398,319],[384,324],[370,341],[356,356],[327,384],[318,410],[302,407],[299,384],[307,356],[313,313],[296,296],[284,270],[281,256],[293,233]],
      // Europe (Western & Central Europe, Scandinavia, Mediterranean)
      [[486,154],[486,134],[509,125],[498,119],[518,111],[535,99],[540,94],[546,99],[526,85],[540,74],[555,63],[583,54],[597,57],[626,63],[654,71],[683,85],[654,114],[626,128],[597,128],[586,142],[569,151],[555,148],[555,139],[546,131],[526,134],[520,136],[512,142],[498,154],[486,154]],
      // Great Britain & Ireland
      [[484,111],[495,100],[495,91],[503,91],[515,97],[515,108],[498,114],[484,111]],
      // Africa (North, West, Central, Horn, South)
      [[464,213],[464,196],[475,176],[498,154],[540,151],[583,165],[603,168],[609,176],[626,199],[657,222],[640,242],[626,270],[626,299],[612,324],[603,336],[586,353],[563,353],[555,336],[546,307],[538,270],[538,242],[520,239],[498,242],[470,225],[464,213]],
      // Asia (Eurasia, Siberia, China, Southeast Asia)
      [[683,85],[711,51],[740,48],[796,37],[853,45],[910,51],[996,65],[1024,71],[996,85],[967,99],[939,88],[910,108],[882,136],[859,148],[859,171],[848,193],[819,205],[811,228],[796,245],[808,253],[796,213],[774,196],[762,193],[740,210],[740,233],[725,228],[711,199],[702,185],[683,185],[668,179],[654,171],[640,142],[654,114],[683,85]],
      // India & Subcontinent
      [[705,188],[717,196],[728,213],[731,233],[740,228],[740,210],[760,193],[762,193],[731,176],[705,188]],
      // Japan
      [[882,165],[890,159],[907,156],[913,148],[913,134],[924,131],[913,139],[902,154],[888,162],[882,165]],
      // Australia
      [[836,319],[839,353],[853,356],[882,347],[905,356],[910,364],[933,364],[947,336],[939,319],[924,299],[916,287],[899,290],[882,293],[865,302],[859,307],[836,319]],
      // New Zealand
      [[984,387],[996,378],[1007,373],[1010,358],[1018,364],[1010,375],[996,387],[984,387]]
    ];

    ctx.fillStyle = '#0a1d3d';
    ctx.strokeStyle = '#00f3ff';
    ctx.lineWidth = 1.5;

    continents.forEach(pts => {
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    });

    // Cyber particle dots representing network density on landmasses
    ctx.fillStyle = '#38bdf8';
    for (let i = 0; i < 280; i++) {
      const rx = Math.random() * 1024;
      const ry = Math.random() * 512;
      ctx.fillRect(rx, ry, 1.8, 1.8);
    }

    return cvs;
  }

  const UltraGlobalSatelliteDeck = {
    isOpen: false,
    activeNodeId: 'yul',
    isFailoverSimulated: false,

    scene: null,
    camera: null,
    renderer: null,
    animFrameId: null,
    earthGroup: null,
    satellites: [],
    arcBeams: [],
    animTime: 0,

    edgeNodes: [
      { id: 'YUL', code: 'yul', aliases: ['yul', 'montreal'], name: 'Montreal Edge (YUL)', city: 'Montreal', lat: 45.50, lon: -73.57, ping: 12, col: 0x38bdf8 },
      { id: 'JFK', code: 'nyc', aliases: ['nyc', 'jfk', 'new york'], name: 'New York Edge (JFK)', city: 'New York', lat: 40.71, lon: -74.00, ping: 16, col: 0x60a5fa },
      { id: 'LHR', code: 'lon', aliases: ['lon', 'lhr', 'london'], name: 'London Edge (LHR)', city: 'London', lat: 51.50, lon: -0.12, ping: 78, col: 0xa855f7 },
      { id: 'FRA', code: 'fra', aliases: ['fra', 'frankfurt'], name: 'Frankfurt Core (FRA)', city: 'Frankfurt', lat: 50.11, lon: 8.68, ping: 84, col: 0x10b981 },
      { id: 'HND', code: 'hnd', aliases: ['hnd', 'tokyo'], name: 'Tokyo Edge (HND)', city: 'Tokyo', lat: 35.68, lon: 139.69, ping: 142, col: 0xf59e0b },
      { id: 'SIN', code: 'sin', aliases: ['sin', 'singapore'], name: 'Singapore Hub (SIN)', city: 'Singapore', lat: 1.35, lon: 103.82, ping: 185, col: 0xec4899 },
      { id: 'SYD', code: 'syd', aliases: ['syd', 'sydney'], name: 'Sydney Pacific (SYD)', city: 'Sydney', lat: -33.86, lon: 151.20, ping: 210, col: 0x06b6d4 },
      { id: 'GRU', code: 'gru', aliases: ['gru', 'sao paulo'], name: 'Sao Paulo Edge (GRU)', city: 'São Paulo', lat: -23.55, lon: -46.63, ping: 125, col: 0x34d399 }
    ],

    open() {
      const modal = document.getElementById('modal-global-satellite-deck');
      if (!modal) {
        console.error('[UltraGlobalSatelliteDeck] modal-global-satellite-deck not found');
        return;
      }
      this.isOpen = true;
      modal.classList.add('show', 'active');
      modal.style.display = 'flex';
      _sound('open');

      setTimeout(() => {
        this.initThree();
        this.selectNode('YUL');
      }, 60);

      _toast(_isFr() ? '🛰️ Deck Satellite & Télémetrie Planétaire activé !' : '🛰️ 3D Global Satellite & Telemetry Deck activated!', 'info');
    },

    close() {
      const modal = document.getElementById('modal-global-satellite-deck');
      if (modal) {
        modal.classList.remove('show', 'active');
        modal.style.display = 'none';
      }
      this.isOpen = false;
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

    latLonToVector3(lat, lon, radius) {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return [
        -(radius * Math.sin(phi) * Math.cos(theta)),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      ];
    },

    initThree() {
      const container = document.getElementById('satellite-deck-viewport');
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
      this.camera.position.set(0, 0.8, 5.4);

      this.renderer = new THREE_LIB.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(w, h);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(this.renderer.domElement);

      this.scene.add(new THREE_LIB.AmbientLight(0xffffff, 0.9));
      const dirLight = new THREE_LIB.DirectionalLight(0x38bdf8, 2.5);
      dirLight.position.set(4, 3, 5);
      this.scene.add(dirLight);

      this.earthGroup = new THREE_LIB.Group();
      this.scene.add(this.earthGroup);

      this.buildGlobe();
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

      function loop() {
        if (!self.isOpen) return;
        self.animFrameId = requestAnimationFrame(loop);
        self.animTime += 0.016;

        if (self.targetRotation && self.earthGroup) {
          self.earthGroup.rotation.y += (self.targetRotation.y - self.earthGroup.rotation.y) * 0.08;
          self.earthGroup.rotation.x += (self.targetRotation.x - self.earthGroup.rotation.x) * 0.08;
          if (Math.abs(self.targetRotation.y - self.earthGroup.rotation.y) < 0.005) {
            self.targetRotation = null;
          }
        } else if (self.earthGroup && !self.isInteracting) {
          self.earthGroup.rotation.y += 0.002;
        }

        // Orbit satellites
        if (self.satellites && self.satellites.length > 0) {
          const orbitMult = self.orbitsActive ? 2.5 : 1.0;
          self.satellites.forEach(s => {
            s.angle += s.speed * orbitMult;
            s.mesh.position.set(
              Math.cos(s.angle) * s.dist,
              Math.sin(s.angle * 1.4) * (s.dist * 0.4),
              Math.sin(s.angle) * s.dist
            );
          });
        }

        self.renderer.render(self.scene, self.camera);
      }
      loop();
    },

    buildGlobe() {
      const THREE_LIB = (typeof THREE !== 'undefined' ? THREE : (window.parent && window.parent.THREE) ? window.parent.THREE : null);
      if (!THREE_LIB || !this.earthGroup) return;

      while (this.earthGroup.children.length > 0) {
        this.earthGroup.remove(this.earthGroup.children[0]);
      }
      this.satellites = [];
      this.arcBeams = [];

      const R = 1.7;

      // 1. Earth Core Sphere with Photorealistic Cyber Earth Texture
      const earthCvs = _createEarthTexture();
      const earthTex = new THREE_LIB.CanvasTexture(earthCvs);
      const earthGeo = new THREE_LIB.SphereGeometry(R, 48, 48);
      const earthMat = new THREE_LIB.MeshStandardMaterial({
        map: earthTex,
        roughness: 0.65,
        metalness: 0.25,
        emissive: 0x051326,
        emissiveIntensity: 0.4
      });
      const earth = new THREE_LIB.Mesh(earthGeo, earthMat);
      this.earthGroup.add(earth);

      // Load Photorealistic NASA Blue Marble Earth Texture
      try {
        const texLoader = new THREE_LIB.TextureLoader();
        texLoader.setCrossOrigin('anonymous');
        const applyTex = (tex) => {
          tex.needsUpdate = true;
          earthMat.map = tex;
          earthMat.needsUpdate = true;
        };
        texLoader.load(
          'img/earth_atmos_2048.jpg',
          applyTex,
          undefined,
          () => {
            texLoader.load(
              'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
              applyTex
            );
          }
        );
      } catch(e) {}

      // 2. Atmosphere Glow Halo
      const haloGeo = new THREE_LIB.SphereGeometry(R * 1.12, 32, 32);
      const haloMat = new THREE_LIB.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.15, side: THREE_LIB.BackSide });
      this.earthGroup.add(new THREE_LIB.Mesh(haloGeo, haloMat));

      // 3. 8 Edge Datacenter Neon Beacons & 3D Text Labels
      this.edgeNodes.forEach(node => {
        const [x, y, z] = this.latLonToVector3(node.lat, node.lon, R * 1.015);
        const nodeGrp = new THREE_LIB.Group();
        nodeGrp.position.set(x, y, z);

        // Ground Ripple Disc
        const discGeo = new THREE_LIB.RingGeometry(0.02, 0.065, 16);
        const discMat = new THREE_LIB.MeshBasicMaterial({ color: node.col, side: THREE_LIB.DoubleSide });
        const disc = new THREE_LIB.Mesh(discGeo, discMat);
        disc.lookAt(new THREE_LIB.Vector3(x * 2, y * 2, z * 2));
        nodeGrp.add(disc);

        // Glowing Beacon Sphere
        const pinGeo = new THREE_LIB.SphereGeometry(0.045, 12, 12);
        const pinMat = new THREE_LIB.MeshBasicMaterial({ color: node.col });
        const pin = new THREE_LIB.Mesh(pinGeo, pinMat);
        pin.position.set(0, 0, 0.04);
        nodeGrp.add(pin);

        // 3D Text Sprite (e.g. "🇨🇦 YUL")
        try {
          const lCvs = document.createElement('canvas');
          lCvs.width = 160; lCvs.height = 48;
          const lCtx = lCvs.getContext('2d');
          lCtx.fillStyle = 'rgba(6,12,28,0.85)';
          lCtx.strokeStyle = '#' + node.col.toString(16).padStart(6, '0');
          lCtx.lineWidth = 2;
          lCtx.beginPath();
          lCtx.roundRect ? lCtx.roundRect(4, 4, 152, 40, 8) : lCtx.rect(4, 4, 152, 40);
          lCtx.fill(); lCtx.stroke();
          lCtx.font = 'bold 20px system-ui, sans-serif';
          lCtx.fillStyle = '#ffffff';
          lCtx.textAlign = 'center';
          lCtx.textBaseline = 'middle';
          lCtx.fillText((node.city || node.name.split(' ')[0]) + ' ' + (node.id || '').toUpperCase(), 80, 24);

          const sprTex = new THREE_LIB.CanvasTexture(lCvs);
          const spr = new THREE_LIB.Sprite(new THREE_LIB.SpriteMaterial({ map: sprTex, transparent: true }));
          spr.position.set(0, 0.14, 0.06);
          spr.scale.set(0.45, 0.14, 1);
          nodeGrp.add(spr);
        } catch(e){}

        nodeGrp.userData = { id: node.id, name: node.name };
        this.earthGroup.add(nodeGrp);
      });

      // 4. Subsea Cable Arcs (Great Circle)
      const cablePairs = [
        ['YUL', 'LHR'], // Transatlantic
        ['LHR', 'FRA'], // Euro Fiber
        ['LHR', 'SIN'], // Eurasia
        ['SIN', 'HND'], // Asia Edge
        ['HND', 'SYD'], // Transpacific
        ['JFK', 'GRU']  // Pan-American
      ];

      cablePairs.forEach(([idA, idB]) => {
        const nA = this.edgeNodes.find(n => n.id.toUpperCase() === idA.toUpperCase());
        const nB = this.edgeNodes.find(n => n.id.toUpperCase() === idB.toUpperCase());
        if (!nA || !nB) return;

        const pA = new THREE_LIB.Vector3(...this.latLonToVector3(nA.lat, nA.lon, R * 1.02));
        const pB = new THREE_LIB.Vector3(...this.latLonToVector3(nB.lat, nB.lon, R * 1.02));
        const mid = pA.clone().add(pB).multiplyScalar(0.5);
        mid.normalize().multiplyScalar(R * 1.25);

        const isAtlantic = (idA === 'YUL' && idB === 'LHR');
        const curve = new THREE_LIB.QuadraticBezierCurve3(pA, mid, pB);
        const pts = curve.getPoints(36);
        const lineGeo = new THREE_LIB.BufferGeometry().setFromPoints(pts);
        const lineMat = new THREE_LIB.LineBasicMaterial({
          color: (isAtlantic && this.isFailoverSimulated) ? 0xef4444 : 0x00f3ff,
          transparent: true,
          opacity: 0.75,
          linewidth: 2
        });
        const line = new THREE_LIB.Line(lineGeo, lineMat);
        line.userData = { isAtlantic: isAtlantic };
        this.earthGroup.add(line);
        this.arcBeams.push(line);
      });

      // Orbital Laser Reroute Beam when Subsea Cable is severed
      if (this.isFailoverSimulated) {
        const nYul = this.edgeNodes.find(n => n.id === 'YUL');
        const nLhr = this.edgeNodes.find(n => n.id === 'LHR');
        if (nYul && nLhr) {
          const pY = new THREE_LIB.Vector3(...this.latLonToVector3(nYul.lat, nYul.lon, R * 1.02));
          const pL = new THREE_LIB.Vector3(...this.latLonToVector3(nLhr.lat, nLhr.lon, R * 1.02));
          const pSat = new THREE_LIB.Vector3(0, R * 1.48 * 0.75, R * 1.48 * 0.75);
          const c1 = new THREE_LIB.QuadraticBezierCurve3(pY, pSat, pSat);
          const c2 = new THREE_LIB.QuadraticBezierCurve3(pSat, pSat, pL);
          const orbPts = [...c1.getPoints(18), ...c2.getPoints(18)];
          const orbGeo = new THREE_LIB.BufferGeometry().setFromPoints(orbPts);
          const orbMat = new THREE_LIB.LineBasicMaterial({ color: 0xf59e0b, linewidth: 2.5, transparent: true, opacity: 0.95 });
          const orbLine = new THREE_LIB.Line(orbGeo, orbMat);
          this.earthGroup.add(orbLine);
          this.arcBeams.push(orbLine);
        }
      }

      // 5. 3 Orbiting Satellites with Solar Panels
      const satDefs = [
        { name: 'Starlink-V2', dist: R * 1.45, speed: 0.008, inc: 0.6, col: 0x38bdf8 },
        { name: 'Galileo-X', dist: R * 1.65, speed: -0.006, inc: -0.8, col: 0x10b981 },
        { name: 'Quantum-Relay', dist: R * 1.85, speed: 0.005, inc: 0.3, col: 0xf59e0b }
      ];

      satDefs.forEach(sd => {
        const satGrp = new THREE_LIB.Group();

        // Satellite Body
        const bGeo = new THREE_LIB.BoxGeometry(0.08, 0.08, 0.12);
        const bMat = new THREE_LIB.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9 });
        satGrp.add(new THREE_LIB.Mesh(bGeo, bMat));

        // Solar Panels
        const pGeo = new THREE_LIB.BoxGeometry(0.24, 0.02, 0.07);
        const pMat = new THREE_LIB.MeshBasicMaterial({ color: sd.col });
        const panels = new THREE_LIB.Mesh(pGeo, pMat);
        panels.position.set(0, 0, 0);
        satGrp.add(panels);

        // Orbital Ring Guide
        const orbGeo = new THREE_LIB.RingGeometry(sd.dist - 0.005, sd.dist + 0.005, 64);
        const orbMat = new THREE_LIB.MeshBasicMaterial({ color: sd.col, side: THREE_LIB.DoubleSide, transparent: true, opacity: 0.18 });
        const orb = new THREE_LIB.Mesh(orbGeo, orbMat);
        orb.rotation.x = Math.PI / 2 + sd.inc;
        this.earthGroup.add(orb);

        this.earthGroup.add(satGrp);
        this.satellites.push({
          mesh: satGrp,
          dist: sd.dist,
          speed: sd.speed,
          inc: sd.inc,
          angle: Math.random() * Math.PI * 2
        });
      });
    },

    setupInteraction(container) {
      const self = this;
      let isDown = false, px = 0, py = 0;
      let hasMoved = false;

      container.addEventListener('mousedown', e => {
        isDown = true;
        hasMoved = false;
        self.isInteracting = true;
        px = e.clientX; py = e.clientY;
        container.style.cursor = 'grabbing';
      });

      window.addEventListener('mousemove', e => {
        if (!isDown || !self.isOpen) return;
        const dx = e.clientX - px;
        const dy = e.clientY - py;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved = true;
        if (self.earthGroup) {
          self.earthGroup.rotation.y += dx * 0.008;
          self.earthGroup.rotation.x += dy * 0.008;
        }
        px = e.clientX; py = e.clientY;
      });

      window.addEventListener('mouseup', () => {
        isDown = false;
        self.isInteracting = false;
        container.style.cursor = 'grab';
      });

      container.addEventListener('wheel', e => {
        e.preventDefault();
        self.camera.position.z += e.deltaY * 0.005;
        self.camera.position.z = Math.max(3.2, Math.min(10.0, self.camera.position.z));
      }, { passive: false });

      container.addEventListener('click', e => {
        if (hasMoved) return;
        const THREE_LIB = (typeof THREE !== 'undefined' ? THREE : (window.parent && window.parent.THREE) ? window.parent.THREE : null);
        if (!THREE_LIB || !self.camera || !self.earthGroup) return;
        const rect = container.getBoundingClientRect();
        const mouse = new THREE_LIB.Vector2(
          ((e.clientX - rect.left) / rect.width) * 2 - 1,
          -((e.clientY - rect.top) / rect.height) * 2 + 1
        );
        const raycaster = new THREE_LIB.Raycaster();
        raycaster.setFromCamera(mouse, self.camera);
        const hits = raycaster.intersectObjects(self.earthGroup.children, true);
        for (let hit of hits) {
          let p = hit.object;
          while (p && p !== self.earthGroup) {
            if (p.userData && p.userData.id) {
              self.selectNode(p.userData.id);
              return;
            }
            p = p.parent;
          }
        }
      });
    },

    selectNode(rawId) {
      if (!rawId) rawId = 'YUL';
      const q = String(rawId).toLowerCase().trim();
      const node = this.edgeNodes.find(x =>
        x.id.toLowerCase() === q ||
        (x.code && x.code.toLowerCase() === q) ||
        (x.aliases && x.aliases.includes(q))
      ) || this.edgeNodes[0];
      if (!node) return;

      this.activeNodeId = node.id;
      _sound('click');

      if (typeof document !== 'undefined') {
        document.querySelectorAll('.sat-node-btn').forEach(btn => {
          const btnNode = (btn.getAttribute('data-node') || '').toLowerCase();
          btn.classList.toggle('active', btnNode === node.id.toLowerCase() || (node.aliases && node.aliases.includes(btnNode)));
        });
      }

      const nameEl = document.getElementById('sat-node-name');
      const pingEl = document.getElementById('sat-node-ping');
      const statusEl = document.getElementById('sat-node-status');
      const geoEl = document.getElementById('sat-node-geo');

      if (nameEl) nameEl.textContent = node.name;
      if (pingEl) pingEl.textContent = (this.isFailoverSimulated && (node.id === 'LHR' || node.id === 'FRA') ? '48 ms (Orbital)' : node.ping + ' ms');
      if (statusEl) statusEl.textContent = this.isFailoverSimulated && (node.id === 'LHR' || node.id === 'FRA') ? '⚠️ REROUTED' : '🟢 ACTIVE ZERO-G';
      if (geoEl) geoEl.textContent = 'LAT: ' + node.lat.toFixed(2) + '° · LON: ' + node.lon.toFixed(2) + '°';

      // Smoothly rotate globe to face the selected datacenter
      const targetRotY = -(node.lon * Math.PI / 180) - Math.PI / 2;
      const targetRotX = (node.lat * Math.PI / 180) * 0.4;
      this.targetRotation = { y: targetRotY, x: targetRotX };

      _toast(_isFr() ? `Nœud Edge: ${node.name} (${node.ping}ms)` : `Edge Node: ${node.name} (${node.ping}ms)`, 'info');
    },

    toggleFailover() {
      return this.toggleFailoverSimulation();
    },

    toggleOrbits() {
      this.orbitsActive = this.orbitsActive === undefined ? false : !this.orbitsActive;
      _toast(_isFr() ? (this.orbitsActive ? '🛰️ Dynamique orbitale accélérée' : '🛰️ Orbites synchronisées') : (this.orbitsActive ? '🛰️ Orbital dynamics accelerated' : '🛰️ Satellite orbits synchronized'), 'info');
    },

    toggleFailoverSimulation() {
      this.isFailoverSimulated = !this.isFailoverSimulated;
      _sound('warn');
      const isFr = _isFr();

      const btn = document.getElementById('sat-btn-failover');
      const statusEl = document.getElementById('sat-node-status');
      const pingEl = document.getElementById('sat-node-ping');

      if (this.isFailoverSimulated) {
        if (btn) {
          btn.innerHTML = isFr ? '🔄 Restaurer Câble Transatlantique' : '🔄 Restore Subsea Transatlantic Cable';
          btn.style.borderColor = '#10b981';
          btn.style.color = '#34d399';
          btn.style.background = 'rgba(16,185,129,0.15)';
        }
        if (statusEl) {
          statusEl.textContent = isFr ? '⚠️ Défaillance Câble Sous-Marin · Routage Orbital Starlink Actif' : '⚠️ Subsea Cable Severed · Rerouted via Starlink Orbital Relay';
          statusEl.style.color = '#f59e0b';
        }
        if (pingEl) pingEl.textContent = '48 ms (Orbital)';
        _toast(isFr ? '⚡ Câble Atlantique sectionné ! Trafic rerouté vers la constellation satellite.' : '⚡ Atlantic Subsea Cable severed! Telemetry rerouted to satellite orbit.', 'warning');
      } else {
        if (btn) {
          btn.innerHTML = isFr ? '⚡ Sectionner Câble Atlantique & Router vers Orbite' : '⚡ Sever Atlantic Cable & Route to Orbit';
          btn.style.borderColor = 'rgba(239,68,68,0.5)';
          btn.style.color = '#f87171';
          btn.style.background = 'rgba(239,68,68,0.1)';
        }
        if (statusEl) {
          statusEl.textContent = isFr ? 'Optimal (Fibre Optique Sous-Marine)' : 'Optimal (Subsea Fiber 100Gbps)';
          statusEl.style.color = '#38bdf8';
        }
        if (pingEl) pingEl.textContent = '12 ms';
        _toast(isFr ? '✅ Câble sous-marin restauré. Latenza minimale rétablie.' : '✅ Subsea cable restored. Ultra-low latency online.', 'success');
      }

      this.buildGlobe();
      this.selectNode(this.activeNodeId);
    },

    // ══════════════════════════════════════════════════════════════════════════
    // 1-CLICK INJECT (LA DORINȚĂ / OPTIONAL)
    // ══════════════════════════════════════════════════════════════════════════
    inject() {
      _sound('sparkle');
      const snippet = '<!-- ═══════════════════════════════════════════════════════════════════ -->\n' +
'<!-- ULTRA 3D GLOBAL SATELLITE & PLANETARY TELEMETRY (100% Client-Side) -->\n' +
'<!-- ═══════════════════════════════════════════════════════════════════ -->\n' +
'<div id="ultra-global-satellite-card" style="margin:24px 0;background:linear-gradient(135deg,rgba(9,14,28,0.96) 0%,rgba(6,10,23,0.98) 100%);border:1.5px solid rgba(14,165,233,0.4);border-radius:20px;padding:20px;box-shadow:0 16px 48px rgba(0,0,0,0.6),0 0 24px rgba(14,165,233,0.25);font-family:system-ui,-apple-system,sans-serif;color:#fff;position:relative;overflow:hidden">\n' +
'  <style>\n' +
'    .inj-sat-btn { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.12); color:#cbd5e1; padding:7px 10px; border-radius:8px; font-size:0.72rem; font-weight:700; cursor:pointer; text-align:left; transition:all 0.2s; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }\n' +
'    .inj-sat-btn:hover { background:rgba(14,165,233,0.18); border-color:#38bdf8; color:#38bdf8; }\n' +
'    .inj-sat-btn.active { background:rgba(14,165,233,0.28) !important; border-color:#0ea5e9 !important; color:#38bdf8 !important; box-shadow:0 0 12px rgba(14,165,233,0.35); }\n' +
'  </style>\n' +
'  <!-- Header Bar -->\n' +
'  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:12px;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:14px">\n' +
'    <div style="display:flex;align-items:center;gap:10px">\n' +
'      <span style="font-size:1.6rem">🛰️</span>\n' +
'      <div>\n' +
'        <h4 style="margin:0;font-size:1.15rem;font-weight:900;background:linear-gradient(135deg,#38bdf8,#818cf8,#c084fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent">3D Global Satellite &amp; Planetary Telemetry</h4>\n' +
'        <p style="margin:2px 0 0 0;font-size:0.75rem;color:#94a3b8">Interactive 3D Earth Globe, Planetary Edge Datacenters, Live Orbital Satellite Relays &amp; Cable Failover Simulation</p>\n' +
'      </div>\n' +
'    </div>\n' +
'    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">\n' +
'      <button id="inj-sat-btn-orbits" style="background:rgba(14,165,233,0.12);border:1px solid rgba(14,165,233,0.4);color:#38bdf8;padding:6px 14px;border-radius:10px;font-size:0.75rem;font-weight:700;cursor:pointer;transition:all 0.2s">🛰️ Orbit Dynamics</button>\n' +
'      <span id="inj-sat-header-badge" style="font-size:0.72rem;font-weight:800;color:#34d399;background:rgba(16,185,129,0.15);padding:5px 12px;border-radius:14px;border:1px solid rgba(16,185,129,0.3)">● 12ms GLOBAL EDGE</span>\n' +
'    </div>\n' +
'  </div>\n' +
'  <!-- Main Content: Side-by-side Layout -->\n' +
'  <div style="display:flex;gap:16px;flex-wrap:wrap">\n' +
'    <!-- Left Panel: Edge Nodes & Failover Controls -->\n' +
'    <div style="flex:1;min-width:280px;max-width:340px;display:flex;flex-direction:column;gap:12px">\n' +
'      <!-- Edge Datacenter Nodes -->\n' +
'      <div style="background:rgba(15,23,42,0.7);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:8px">\n' +
'        <span style="font-size:0.72rem;color:#38bdf8;font-weight:800;text-transform:uppercase;letter-spacing:0.05em">Planetary Edge Network</span>\n' +
'        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">\n' +
'          <button class="inj-sat-btn active" data-node="YUL">🇨🇦 YUL (Montreal)</button>\n' +
'          <button class="inj-sat-btn" data-node="JFK">🇺🇸 JFK (New York)</button>\n' +
'          <button class="inj-sat-btn" data-node="LHR">🇬🇧 LHR (London)</button>\n' +
'          <button class="inj-sat-btn" data-node="FRA">🇩🇪 FRA (Frankfurt)</button>\n' +
'          <button class="inj-sat-btn" data-node="HND">🇯🇵 HND (Tokyo)</button>\n' +
'          <button class="inj-sat-btn" data-node="SIN">🇸🇬 SIN (Singapore)</button>\n' +
'          <button class="inj-sat-btn" data-node="SYD">🇦🇺 SYD (Sydney)</button>\n' +
'          <button class="inj-sat-btn" data-node="GRU">🇧🇷 GRU (São Paulo)</button>\n' +
'        </div>\n' +
'      </div>\n' +
'      <!-- Node Live Telemetry -->\n' +
'      <div style="background:rgba(15,23,42,0.7);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:8px">\n' +
'        <span style="font-size:0.72rem;color:#34d399;font-weight:800;text-transform:uppercase;letter-spacing:0.05em">Node Live Telemetry</span>\n' +
'        <div style="display:flex;flex-direction:column;gap:6px">\n' +
'          <div style="display:flex;justify-content:space-between;align-items:center">\n' +
'            <span style="font-size:0.68rem;color:#94a3b8">Active Node:</span>\n' +
'            <span id="inj-sat-node-name" style="font-size:0.8rem;color:#fff;font-weight:700">Montreal Edge (YUL)</span>\n' +
'          </div>\n' +
'          <div style="display:flex;justify-content:space-between;align-items:center">\n' +
'            <span style="font-size:0.68rem;color:#94a3b8">Edge Latency:</span>\n' +
'            <span id="inj-sat-node-ping" style="font-size:0.8rem;color:#34d399;font-family:monospace;font-weight:800">12 ms</span>\n' +
'          </div>\n' +
'          <div style="display:flex;justify-content:space-between;align-items:center">\n' +
'            <span style="font-size:0.68rem;color:#94a3b8">Network Health:</span>\n' +
'            <span id="inj-sat-node-status" style="font-size:0.72rem;color:#38bdf8;font-weight:700">Optimal (Subsea Fiber)</span>\n' +
'          </div>\n' +
'          <div style="display:flex;justify-content:space-between;align-items:center">\n' +
'            <span style="font-size:0.68rem;color:#94a3b8">Coordinates:</span>\n' +
'            <span id="inj-sat-node-geo" style="font-size:0.7rem;color:#94a3b8;font-family:monospace">LAT: 45.50° · LON: -73.57°</span>\n' +
'          </div>\n' +
'        </div>\n' +
'      </div>\n' +
'      <!-- Subsea Cable Resiliency Simulation -->\n' +
'      <div style="background:rgba(15,23,42,0.7);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:8px">\n' +
'        <span style="font-size:0.72rem;color:#ef4444;font-weight:800;text-transform:uppercase;letter-spacing:0.05em">Subsea Cable Resiliency Simulation</span>\n' +
'        <button id="inj-sat-btn-failover" style="padding:9px;font-size:0.74rem;font-weight:800;border-radius:8px;cursor:pointer;border:1px solid rgba(239,68,68,0.5);background:rgba(239,68,68,0.12);color:#f87171;transition:all 0.2s">\n' +
'          ⚡ Sever Atlantic Cable &amp; Route to Orbit\n' +
'        </button>\n' +
'      </div>\n' +
'    </div>\n' +
'    <!-- Right Panel: 3D Globe Viewport -->\n' +
'    <div style="flex:2;min-width:320px;height:480px;position:relative;border-radius:14px;overflow:hidden;background:#03050c;border:1px solid rgba(14,165,233,0.3)">\n' +
'      <div id="injected-satellite-viewport" style="width:100%;height:100%;position:relative;cursor:grab"></div>\n' +
'      <div style="position:absolute;bottom:12px;left:12px;right:12px;display:flex;justify-content:center;pointer-events:none;z-index:20">\n' +
'        <div style="background:rgba(15,23,42,0.85);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.1);padding:5px 14px;border-radius:20px;font-size:0.7rem;color:#94a3b8">\n' +
'          🌍 Drag to rotate 360° · 🔍 Scroll to zoom · Click datacenters or toggle satellite orbits &amp; failover\n' +
'        </div>\n' +
'      </div>\n' +
'    </div>\n' +
'  </div>\n' +
'</div>\n\n' +
'<script>\n' +
'(function() {\n' +
'  const container = document.getElementById("injected-satellite-viewport");\n' +
'  if (!container) return;\n' +
'  function loadThree(cb) {\n' +
'    if (typeof THREE !== "undefined") return cb(window.THREE);\n' +
'    const s = document.createElement("script");\n' +
'    s.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";\n' +
'    s.onload = () => cb(window.THREE);\n' +
'    document.head.appendChild(s);\n' +
'  }\n' +
'  loadThree((T) => {\n' +
'    const nodes = [\n' +
'      { id: "YUL", name: "Montreal Edge (YUL)", city: "Montreal", lat: 45.50, lon: -73.57, ping: 12, col: 0x38bdf8 },\n' +
'      { id: "JFK", name: "New York Edge (JFK)", city: "New York", lat: 40.71, lon: -74.00, ping: 16, col: 0x60a5fa },\n' +
'      { id: "LHR", name: "London Edge (LHR)", city: "London", lat: 51.50, lon: -0.12, ping: 78, col: 0xa855f7 },\n' +
'      { id: "FRA", name: "Frankfurt Core (FRA)", city: "Frankfurt", lat: 50.11, lon: 8.68, ping: 84, col: 0x10b981 },\n' +
'      { id: "HND", name: "Tokyo Edge (HND)", city: "Tokyo", lat: 35.68, lon: 139.69, ping: 142, col: 0xf59e0b },\n' +
'      { id: "SIN", name: "Singapore Hub (SIN)", city: "Singapore", lat: 1.35, lon: 103.82, ping: 185, col: 0xec4899 },\n' +
'      { id: "SYD", name: "Sydney Pacific (SYD)", city: "Sydney", lat: -33.86, lon: 151.20, ping: 210, col: 0x06b6d4 },\n' +
'      { id: "GRU", name: "Sao Paulo Edge (GRU)", city: "São Paulo", lat: -23.55, lon: -46.63, ping: 125, col: 0x34d399 }\n' +
'    ];\n' +
'    function latLonToVec(lat, lon, r) {\n' +
'      const phi = (90 - lat) * (Math.PI / 180);\n' +
'      const theta = (lon + 180) * (Math.PI / 180);\n' +
'      return [-(r * Math.sin(phi) * Math.cos(theta)), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta)];\n' +
'    }\n' +
'    let isFailover = false, orbitsFast = false, activeNodeId = "YUL", targetRotation = null;\n' +
'    const w = container.clientWidth || 600, h = container.clientHeight || 480;\n' +
'    const scene = new T.Scene();\n' +
'    const camera = new T.PerspectiveCamera(45, w / h, 0.1, 100);\n' +
'    camera.position.set(0, 0.8, 5.4);\n' +
'    const renderer = new T.WebGLRenderer({ antialias: true, alpha: true });\n' +
'    renderer.setSize(w, h);\n' +
'    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));\n' +
'    container.appendChild(renderer.domElement);\n' +
'    scene.add(new T.AmbientLight(0xffffff, 0.9));\n' +
'    const dL = new T.DirectionalLight(0x38bdf8, 2.5); dL.position.set(4, 3, 5); scene.add(dL);\n' +
'    const earthGroup = new T.Group(); scene.add(earthGroup);\n' +
'    let satellites = [];\n' +
'    const R = 1.7;\n' +
'    function buildGlobe() {\n' +
'      while (earthGroup.children.length > 0) earthGroup.remove(earthGroup.children[0]);\n' +
'      satellites = [];\n' +
'      const cvs = document.createElement("canvas"); cvs.width = 1024; cvs.height = 512;\n' +
'      const ctx = cvs.getContext("2d");\n' +
'      const bgGrad = ctx.createLinearGradient(0,0,0,512);\n' +
'      bgGrad.addColorStop(0,"#020617"); bgGrad.addColorStop(0.5,"#040d21"); bgGrad.addColorStop(1,"#020617");\n' +
'      ctx.fillStyle = bgGrad; ctx.fillRect(0,0,1024,512);\n' +
'      ctx.strokeStyle = "rgba(56,189,248,0.08)"; ctx.lineWidth = 1;\n' +
'      for(let x=0;x<=1024;x+=64){ ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,512); ctx.stroke(); }\n' +
'      for(let y=0;y<=512;y+=42){ ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(1024,y); ctx.stroke(); }\n' +
'      ctx.strokeStyle = "rgba(0,243,255,0.2)"; ctx.lineWidth = 1.5;\n' +
'      ctx.beginPath(); ctx.moveTo(0,256); ctx.lineTo(1024,256); ctx.stroke();\n' +
'      const polys = [\n' +
'        [[34,71],[57,54],[114,57],[156,43],[242,28],[284,43],[341,71],[356,100],[327,128],[313,136],[299,156],[284,185],[279,190],[262,196],[264,216],[276,228],[293,233],[284,233],[276,228],[256,213],[236,205],[213,190],[199,171],[179,162],[159,142],[156,117],[142,99],[114,85],[85,85],[57,91],[43,85],[34,71]],\n' +
'        [[293,233],[307,225],[341,228],[370,256],[412,270],[412,284],[404,293],[398,319],[384,324],[370,341],[356,356],[327,384],[318,410],[302,407],[299,384],[307,356],[313,313],[296,296],[284,270],[281,256],[293,233]],\n' +
'        [[486,154],[486,134],[509,125],[498,119],[518,111],[535,99],[540,94],[546,99],[526,85],[540,74],[555,63],[583,54],[597,57],[626,63],[654,71],[683,85],[654,114],[626,128],[597,128],[586,142],[569,151],[555,148],[555,139],[546,131],[526,134],[520,136],[512,142],[498,154],[486,154]],\n' +
'        [[484,111],[495,100],[495,91],[503,91],[515,97],[515,108],[498,114],[484,111]],\n' +
'        [[464,213],[464,196],[475,176],[498,154],[540,151],[583,165],[603,168],[609,176],[626,199],[657,222],[640,242],[626,270],[626,299],[612,324],[603,336],[586,353],[563,353],[555,336],[546,307],[538,270],[538,242],[520,239],[498,242],[470,225],[464,213]],\n' +
'        [[683,85],[711,51],[740,48],[796,37],[853,45],[910,51],[996,65],[1024,71],[996,85],[967,99],[939,88],[910,108],[882,136],[859,148],[859,171],[848,193],[819,205],[811,228],[796,245],[808,253],[796,213],[774,196],[762,193],[740,210],[740,233],[725,228],[711,199],[702,185],[683,185],[668,179],[654,171],[640,142],[654,114],[683,85]],\n' +
'        [[705,188],[717,196],[728,213],[731,233],[740,228],[740,210],[760,193],[762,193],[731,176],[705,188]],\n' +
'        [[882,165],[890,159],[907,156],[913,148],[913,134],[924,131],[913,139],[902,154],[888,162],[882,165]],\n' +
'        [[836,319],[839,353],[853,356],[882,347],[905,356],[910,364],[933,364],[947,336],[939,319],[924,299],[916,287],[899,290],[882,293],[865,302],[859,307],[836,319]],\n' +
'        [[984,387],[996,378],[1007,373],[1010,358],[1018,364],[1010,375],[996,387],[984,387]]\n' +
'      ];\n' +
'      ctx.fillStyle = "#0a1d3d"; ctx.strokeStyle = "#00f3ff"; ctx.lineWidth = 1.5;\n' +
'      polys.forEach(p => {\n' +
'        ctx.beginPath(); ctx.moveTo(p[0][0], p[0][1]);\n' +
'        for(let i=1;i<p.length;i++) ctx.lineTo(p[i][0], p[i][1]);\n' +
'        ctx.closePath(); ctx.fill(); ctx.stroke();\n' +
'      });\n' +
'      const earthTex = new T.CanvasTexture(cvs);\n' +
'      const earthMat = new T.MeshStandardMaterial({ map: earthTex, roughness: 0.65, metalness: 0.25, emissive: 0x051326, emissiveIntensity: 0.4 });\n' +
'      const earth = new T.Mesh(new T.SphereGeometry(R, 48, 48), earthMat);\n' +
'      earthGroup.add(earth);\n' +
'      try {\n' +
'        const loader = new T.TextureLoader(); loader.setCrossOrigin("anonymous");\n' +
'        const onL = (t) => { t.needsUpdate = true; earthMat.map = t; earthMat.needsUpdate = true; };\n' +
'        loader.load("img/earth_atmos_2048.jpg", onL, undefined, () => {\n' +
'          loader.load("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg", onL);\n' +
'        });\n' +
'      } catch(e) {}\n' +
'      const halo = new T.Mesh(new T.SphereGeometry(R * 1.12, 32, 32), new T.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.15, side: T.BackSide }));\n' +
'      earthGroup.add(halo);\n' +
'      nodes.forEach(n => {\n' +
'        const [x, y, z] = latLonToVec(n.lat, n.lon, R * 1.015);\n' +
'        const grp = new T.Group(); grp.position.set(x, y, z);\n' +
'        const disc = new T.Mesh(new T.RingGeometry(0.02, 0.065, 16), new T.MeshBasicMaterial({ color: n.col, side: T.DoubleSide }));\n' +
'        disc.lookAt(new T.Vector3(x * 2, y * 2, z * 2)); grp.add(disc);\n' +
'        const pin = new T.Mesh(new T.SphereGeometry(0.045, 12, 12), new T.MeshBasicMaterial({ color: n.col }));\n' +
'        pin.position.set(0, 0, 0.04); grp.add(pin);\n' +
'        try {\n' +
'          const lCvs = document.createElement("canvas"); lCvs.width = 160; lCvs.height = 48;\n' +
'          const lCtx = lCvs.getContext("2d");\n' +
'          lCtx.fillStyle = "rgba(6,12,28,0.85)"; lCtx.strokeStyle = "#" + n.col.toString(16).padStart(6, "0"); lCtx.lineWidth = 2;\n' +
'          lCtx.beginPath(); lCtx.roundRect ? lCtx.roundRect(4, 4, 152, 40, 8) : lCtx.rect(4, 4, 152, 40); lCtx.fill(); lCtx.stroke();\n' +
'          lCtx.font = "bold 20px system-ui, sans-serif"; lCtx.fillStyle = "#ffffff"; lCtx.textAlign = "center"; lCtx.textBaseline = "middle";\n' +
'          lCtx.fillText(n.city + " " + n.id, 80, 24);\n' +
'          const spr = new T.Sprite(new T.SpriteMaterial({ map: new T.CanvasTexture(lCvs), transparent: true }));\n' +
'          spr.position.set(0, 0.14, 0.06); spr.scale.set(0.45, 0.14, 1); grp.add(spr);\n' +
'        } catch(e) {}\n' +
'        grp.userData = { id: n.id, name: n.name };\n' +
'        earthGroup.add(grp);\n' +
'      });\n' +
'      const pairs = [["YUL","LHR"],["LHR","FRA"],["LHR","SIN"],["SIN","HND"],["HND","SYD"],["JFK","GRU"]];\n' +
'      pairs.forEach(([idA, idB]) => {\n' +
'        const nA = nodes.find(x => x.id === idA), nB = nodes.find(x => x.id === idB);\n' +
'        if (!nA || !nB) return;\n' +
'        const pA = new T.Vector3(...latLonToVec(nA.lat, nA.lon, R * 1.02));\n' +
'        const pB = new T.Vector3(...latLonToVec(nB.lat, nB.lon, R * 1.02));\n' +
'        const mid = pA.clone().add(pB).multiplyScalar(0.5).normalize().multiplyScalar(R * 1.25);\n' +
'        const curve = new T.QuadraticBezierCurve3(pA, mid, pB);\n' +
'        const pts = curve.getPoints(36);\n' +
'        const isAtl = (idA === "YUL" && idB === "LHR");\n' +
'        const line = new T.Line(new T.BufferGeometry().setFromPoints(pts), new T.LineBasicMaterial({ color: (isAtl && isFailover) ? 0xef4444 : 0x00f3ff, transparent: true, opacity: 0.75, linewidth: 2 }));\n' +
'        earthGroup.add(line);\n' +
'      });\n' +
'      if (isFailover) {\n' +
'        const nY = nodes.find(x => x.id === "YUL"), nL = nodes.find(x => x.id === "LHR");\n' +
'        if (nY && nL) {\n' +
'          const pY = new T.Vector3(...latLonToVec(nY.lat, nY.lon, R * 1.02));\n' +
'          const pL = new T.Vector3(...latLonToVec(nL.lat, nL.lon, R * 1.02));\n' +
'          const pSat = new T.Vector3(0, R * 1.48 * 0.75, R * 1.48 * 0.75);\n' +
'          const c1 = new T.QuadraticBezierCurve3(pY, pSat, pSat);\n' +
'          const c2 = new T.QuadraticBezierCurve3(pSat, pSat, pL);\n' +
'          const orbPts = [...c1.getPoints(18), ...c2.getPoints(18)];\n' +
'          const orbLine = new T.Line(new T.BufferGeometry().setFromPoints(orbPts), new T.LineBasicMaterial({ color: 0xf59e0b, linewidth: 2.5, transparent: true, opacity: 0.95 }));\n' +
'          earthGroup.add(orbLine);\n' +
'        }\n' +
'      }\n' +
'      const satDefs = [\n' +
'        { name: "Starlink-V2", dist: R * 1.45, speed: 0.008, inc: 0.6, col: 0x38bdf8 },\n' +
'        { name: "Galileo-X", dist: R * 1.65, speed: -0.006, inc: -0.8, col: 0x10b981 },\n' +
'        { name: "Quantum-Relay", dist: R * 1.85, speed: 0.005, inc: 0.3, col: 0xf59e0b }\n' +
'      ];\n' +
'      satDefs.forEach(sd => {\n' +
'        const satGrp = new T.Group();\n' +
'        const b = new T.Mesh(new T.BoxGeometry(0.08, 0.08, 0.12), new T.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9 }));\n' +
'        satGrp.add(b);\n' +
'        const p = new T.Mesh(new T.BoxGeometry(0.24, 0.02, 0.07), new T.MeshBasicMaterial({ color: sd.col }));\n' +
'        satGrp.add(p);\n' +
'        const orb = new T.Mesh(new T.RingGeometry(sd.dist - 0.005, sd.dist + 0.005, 64), new T.MeshBasicMaterial({ color: sd.col, side: T.DoubleSide, transparent: true, opacity: 0.18 }));\n' +
'        orb.rotation.x = Math.PI / 2 + sd.inc;\n' +
'        earthGroup.add(orb); earthGroup.add(satGrp);\n' +
'        satellites.push({ mesh: satGrp, dist: sd.dist, speed: sd.speed, inc: sd.inc, angle: Math.random() * Math.PI * 2 });\n' +
'      });\n' +
'    }\n' +
'    buildGlobe();\n' +
'    function selectNode(id) {\n' +
'      const node = nodes.find(x => x.id === id) || nodes[0];\n' +
'      activeNodeId = node.id;\n' +
'      document.querySelectorAll("#ultra-global-satellite-card .inj-sat-btn").forEach(btn => {\n' +
'        btn.classList.toggle("active", btn.getAttribute("data-node") === node.id);\n' +
'      });\n' +
'      const nameEl = document.getElementById("inj-sat-node-name");\n' +
'      const pingEl = document.getElementById("inj-sat-node-ping");\n' +
'      const statusEl = document.getElementById("inj-sat-node-status");\n' +
'      const geoEl = document.getElementById("inj-sat-node-geo");\n' +
'      if (nameEl) nameEl.textContent = node.name;\n' +
'      if (pingEl) pingEl.textContent = (isFailover && (node.id === "LHR" || node.id === "FRA" || node.id === "YUL") ? "48 ms (Orbital)" : node.ping + " ms");\n' +
'      if (statusEl) statusEl.textContent = (isFailover && (node.id === "LHR" || node.id === "FRA" || node.id === "YUL") ? "⚠️ REROUTED VIA ORBIT" : "🟢 ACTIVE ZERO-G");\n' +
'      if (geoEl) geoEl.textContent = "LAT: " + node.lat.toFixed(2) + "° · LON: " + node.lon.toFixed(2) + "°";\n' +
'      const targetRotY = -(node.lon * Math.PI / 180) - Math.PI / 2;\n' +
'      const targetRotX = (node.lat * Math.PI / 180) * 0.4;\n' +
'      targetRotation = { y: targetRotY, x: targetRotX };\n' +
'    }\n' +
'    document.querySelectorAll("#ultra-global-satellite-card .inj-sat-btn").forEach(btn => {\n' +
'      btn.addEventListener("click", () => selectNode(btn.getAttribute("data-node")));\n' +
'    });\n' +
'    const failoverBtn = document.getElementById("inj-sat-btn-failover");\n' +
'    if (failoverBtn) {\n' +
'      failoverBtn.addEventListener("click", () => {\n' +
'        isFailover = !isFailover;\n' +
'        const headerBadge = document.getElementById("inj-sat-header-badge");\n' +
'        if (isFailover) {\n' +
'          failoverBtn.innerHTML = "🔄 Restore Subsea Transatlantic Cable";\n' +
'          failoverBtn.style.borderColor = "#10b981"; failoverBtn.style.color = "#34d399"; failoverBtn.style.background = "rgba(16,185,129,0.15)";\n' +
'          if (headerBadge) { headerBadge.textContent = "⚠️ 48ms ORBITAL FAILOVER"; headerBadge.style.color = "#f59e0b"; headerBadge.style.background = "rgba(245,158,11,0.15)"; headerBadge.style.borderColor = "rgba(245,158,11,0.3)"; }\n' +
'        } else {\n' +
'          failoverBtn.innerHTML = "⚡ Sever Atlantic Cable & Route to Orbit";\n' +
'          failoverBtn.style.borderColor = "rgba(239,68,68,0.5)"; failoverBtn.style.color = "#f87171"; failoverBtn.style.background = "rgba(239,68,68,0.12)";\n' +
'          if (headerBadge) { headerBadge.textContent = "● 12ms GLOBAL EDGE"; headerBadge.style.color = "#34d399"; headerBadge.style.background = "rgba(16,185,129,0.15)"; headerBadge.style.borderColor = "rgba(16,185,129,0.3)"; }\n' +
'        }\n' +
'        buildGlobe();\n' +
'        selectNode(activeNodeId);\n' +
'      });\n' +
'    }\n' +
'    const orbitsBtn = document.getElementById("inj-sat-btn-orbits");\n' +
'    if (orbitsBtn) {\n' +
'      orbitsBtn.addEventListener("click", () => {\n' +
'        orbitsFast = !orbitsFast;\n' +
'        orbitsBtn.style.borderColor = orbitsFast ? "#10b981" : "rgba(14,165,233,0.4)";\n' +
'        orbitsBtn.style.color = orbitsFast ? "#34d399" : "#38bdf8";\n' +
'      });\n' +
'    }\n' +
'    let isDown = false, px = 0, py = 0, hasMoved = false;\n' +
'    container.addEventListener("mousedown", e => { isDown = true; hasMoved = false; px = e.clientX; py = e.clientY; container.style.cursor = "grabbing"; });\n' +
'    window.addEventListener("mousemove", e => {\n' +
'      if (!isDown) return;\n' +
'      const dx = e.clientX - px, dy = e.clientY - py;\n' +
'      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved = true;\n' +
'      earthGroup.rotation.y += dx * 0.008; earthGroup.rotation.x += dy * 0.008;\n' +
'      px = e.clientX; py = e.clientY;\n' +
'    });\n' +
'    window.addEventListener("mouseup", () => { isDown = false; container.style.cursor = "grab"; });\n' +
'    container.addEventListener("wheel", e => {\n' +
'      e.preventDefault();\n' +
'      camera.position.z += e.deltaY * 0.005;\n' +
'      camera.position.z = Math.max(3.2, Math.min(10.0, camera.position.z));\n' +
'    }, { passive: false });\n' +
'    container.addEventListener("click", e => {\n' +
'      if (hasMoved) return;\n' +
'      const rect = container.getBoundingClientRect();\n' +
'      const mouse = new T.Vector2(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);\n' +
'      const raycaster = new T.Raycaster();\n' +
'      raycaster.setFromCamera(mouse, camera);\n' +
'      const hits = raycaster.intersectObjects(earthGroup.children, true);\n' +
'      for (let hit of hits) {\n' +
'        let p = hit.object;\n' +
'        while (p && p !== earthGroup) {\n' +
'          if (p.userData && p.userData.id) { selectNode(p.userData.id); return; }\n' +
'          p = p.parent;\n' +
'        }\n' +
'      }\n' +
'    });\n' +
'    window.addEventListener("resize", () => {\n' +
'      const rw = container.clientWidth || 600, rh = container.clientHeight || 480;\n' +
'      camera.aspect = rw / rh; camera.updateProjectionMatrix(); renderer.setSize(rw, rh);\n' +
'    });\n' +
'    function loop() {\n' +
'      requestAnimationFrame(loop);\n' +
'      if (targetRotation) {\n' +
'        earthGroup.rotation.y += (targetRotation.y - earthGroup.rotation.y) * 0.08;\n' +
'        earthGroup.rotation.x += (targetRotation.x - earthGroup.rotation.x) * 0.08;\n' +
'        if (Math.abs(targetRotation.y - earthGroup.rotation.y) < 0.005) targetRotation = null;\n' +
'      } else if (!isDown) {\n' +
'        earthGroup.rotation.y += 0.002;\n' +
'      }\n' +
'      const speedMult = orbitsFast ? 2.5 : 1.0;\n' +
'      satellites.forEach(s => {\n' +
'        s.angle += s.speed * speedMult;\n' +
'        s.mesh.position.set(Math.cos(s.angle) * s.dist, Math.sin(s.angle * 1.4) * (s.dist * 0.4), Math.sin(s.angle) * s.dist);\n' +
'      });\n' +
'      renderer.render(scene, camera);\n' +
'    }\n' +
'    loop();\n' +
'  });\n' +
'})();\n' +
'<' + '/script>';

      _injectCodeToActiveApp(snippet, /(?:<!-- ═+ -->\s*)?<!-- ULTRA 3D GLOBAL SATELLITE & PLANETARY TELEMETRY[\s\S]*?<\/script>/g, 'Global Satellite Deck');
    },

    exportStandalone() {
      if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Export Global Satellite Deck')) return;
      _sound('download');
      const html = '<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'  <meta charset="UTF-8">\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'  <title>3D Global Satellite &amp; Planetary Telemetry Deck</title>\n' +
'  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><' + '/script>\n' +
'  <style>\n' +
'    * { margin:0; padding:0; box-sizing:border-box; }\n' +
'    body { background:#03050c; color:#fff; font-family:system-ui,-apple-system,sans-serif; overflow:hidden; width:100vw; height:100vh; display:flex; flex-direction:column; }\n' +
'    .top-bar { padding:14px 20px; border-bottom:1px solid rgba(255,255,255,0.08); background:#090e1c; display:flex; justify-content:space-between; align-items:center; flex-shrink:0; }\n' +
'    .main-body { flex:1; min-height:0; display:flex; gap:16px; padding:16px; }\n' +
'    .hud-panel { width:340px; flex-shrink:0; display:flex; flex-direction:column; gap:12px; overflow-y:auto; }\n' +
'    .hud-card { background:rgba(15,23,42,0.8); border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:14px; display:flex; flex-direction:column; gap:8px; }\n' +
'    .node-btn { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.12); color:#cbd5e1; padding:7px 10px; border-radius:8px; font-size:0.72rem; font-weight:700; cursor:pointer; text-align:left; transition:all 0.2s; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }\n' +
'    .node-btn:hover { background:rgba(14,165,233,0.18); border-color:#38bdf8; color:#38bdf8; }\n' +
'    .node-btn.active { background:rgba(14,165,233,0.28) !important; border-color:#0ea5e9 !important; color:#38bdf8 !important; box-shadow:0 0 12px rgba(14,165,233,0.35); }\n' +
'    .viewport-box { flex:1; position:relative; border-radius:16px; overflow:hidden; border:1px solid rgba(14,165,233,0.3); background:#020617; }\n' +
'    #canvas-container { width:100%; height:100%; position:relative; cursor:grab; }\n' +
'    .hint-bar { position:absolute; bottom:14px; left:14px; right:14px; display:flex; justify-content:center; pointer-events:none; z-index:20; }\n' +
'    .hint-pill { background:rgba(15,23,42,0.85); backdrop-filter:blur(8px); border:1px solid rgba(255,255,255,0.1); padding:6px 16px; border-radius:20px; font-size:0.72rem; color:#94a3b8; }\n' +
'  </style>\n' +
'</head>\n' +
'<body>\n' +
'  <div class="top-bar">\n' +
'    <div style="display:flex;align-items:center;gap:10px">\n' +
'      <span style="font-size:1.6rem">🛰️</span>\n' +
'      <div>\n' +
'        <h2 style="margin:0;font-size:1.15rem;font-weight:900;background:linear-gradient(135deg,#38bdf8,#818cf8,#c084fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent">3D Global Satellite &amp; Planetary Telemetry Deck</h2>\n' +
'        <p style="margin:2px 0 0 0;font-size:0.75rem;color:#94a3b8">Interactive 3D Earth Globe, Planetary Edge Datacenters, Live Orbital Satellite Relays &amp; Cable Failover Simulation</p>\n' +
'      </div>\n' +
'    </div>\n' +
'    <div style="display:flex;align-items:center;gap:10px">\n' +
'      <button id="btn-orbits" style="background:rgba(14,165,233,0.12);border:1px solid rgba(14,165,233,0.4);color:#38bdf8;padding:6px 14px;border-radius:10px;font-size:0.75rem;font-weight:700;cursor:pointer;transition:all 0.2s">🛰️ Orbit Dynamics</button>\n' +
'      <button onclick="resetOrbit()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.18);color:#fff;padding:6px 12px;border-radius:10px;font-size:0.75rem;cursor:pointer;font-weight:700">↺ Reset</button>\n' +
'      <button onclick="toggleFullscreen()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.18);color:#fff;padding:6px 12px;border-radius:10px;font-size:0.75rem;cursor:pointer;font-weight:700">⛶ Fullscreen</button>\n' +
'      <span id="header-badge" style="font-size:0.72rem;font-weight:800;color:#34d399;background:rgba(16,185,129,0.15);padding:5px 12px;border-radius:14px;border:1px solid rgba(16,185,129,0.3)">● 12ms GLOBAL EDGE</span>\n' +
'    </div>\n' +
'  </div>\n' +
'  <div class="main-body">\n' +
'    <div class="hud-panel">\n' +
'      <div class="hud-card">\n' +
'        <span style="font-size:0.72rem;color:#38bdf8;font-weight:800;text-transform:uppercase;letter-spacing:0.05em">Planetary Edge Network</span>\n' +
'        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">\n' +
'          <button class="node-btn active" data-node="YUL">🇨🇦 YUL (Montreal)</button>\n' +
'          <button class="node-btn" data-node="JFK">🇺🇸 JFK (New York)</button>\n' +
'          <button class="node-btn" data-node="LHR">🇬🇧 LHR (London)</button>\n' +
'          <button class="node-btn" data-node="FRA">🇩🇪 FRA (Frankfurt)</button>\n' +
'          <button class="node-btn" data-node="HND">🇯🇵 HND (Tokyo)</button>\n' +
'          <button class="node-btn" data-node="SIN">🇸🇬 SIN (Singapore)</button>\n' +
'          <button class="node-btn" data-node="SYD">🇦🇺 SYD (Sydney)</button>\n' +
'          <button class="node-btn" data-node="GRU">🇧🇷 GRU (São Paulo)</button>\n' +
'        </div>\n' +
'      </div>\n' +
'      <div class="hud-card">\n' +
'        <span style="font-size:0.72rem;color:#34d399;font-weight:800;text-transform:uppercase;letter-spacing:0.05em">Node Live Telemetry</span>\n' +
'        <div style="display:flex;flex-direction:column;gap:6px">\n' +
'          <div style="display:flex;justify-content:space-between;align-items:center">\n' +
'            <span style="font-size:0.68rem;color:#94a3b8">Active Node:</span>\n' +
'            <span id="node-name" style="font-size:0.8rem;color:#fff;font-weight:700">Montreal Edge (YUL)</span>\n' +
'          </div>\n' +
'          <div style="display:flex;justify-content:space-between;align-items:center">\n' +
'            <span style="font-size:0.68rem;color:#94a3b8">Edge Latency:</span>\n' +
'            <span id="node-ping" style="font-size:0.8rem;color:#34d399;font-family:monospace;font-weight:800">12 ms</span>\n' +
'          </div>\n' +
'          <div style="display:flex;justify-content:space-between;align-items:center">\n' +
'            <span style="font-size:0.68rem;color:#94a3b8">Network Health:</span>\n' +
'            <span id="node-status" style="font-size:0.72rem;color:#38bdf8;font-weight:700">Optimal (Subsea Fiber)</span>\n' +
'          </div>\n' +
'          <div style="display:flex;justify-content:space-between;align-items:center">\n' +
'            <span style="font-size:0.68rem;color:#94a3b8">Coordinates:</span>\n' +
'            <span id="node-geo" style="font-size:0.7rem;color:#94a3b8;font-family:monospace">LAT: 45.50° · LON: -73.57°</span>\n' +
'          </div>\n' +
'        </div>\n' +
'      </div>\n' +
'      <div class="hud-card">\n' +
'        <span style="font-size:0.72rem;color:#ef4444;font-weight:800;text-transform:uppercase;letter-spacing:0.05em">Subsea Cable Resiliency Simulation</span>\n' +
'        <button id="btn-failover" style="padding:9px;font-size:0.74rem;font-weight:800;border-radius:8px;cursor:pointer;border:1px solid rgba(239,68,68,0.5);background:rgba(239,68,68,0.12);color:#f87171;transition:all 0.2s">\n' +
'          ⚡ Sever Atlantic Cable &amp; Route to Orbit\n' +
'        </button>\n' +
'      </div>\n' +
'    </div>\n' +
'    <div class="viewport-box">\n' +
'      <div id="canvas-container"></div>\n' +
'      <div class="hint-bar">\n' +
'        <div class="hint-pill">🌍 Drag to rotate 360° · 🔍 Scroll to zoom · Click datacenters or toggle satellite orbits &amp; failover</div>\n' +
'      </div>\n' +
'    </div>\n' +
'  </div>\n' +
'  <script>\n' +
'    const container = document.getElementById("canvas-container");\n' +
'    const nodes = [\n' +
'      { id: "YUL", name: "Montreal Edge (YUL)", city: "Montreal", lat: 45.50, lon: -73.57, ping: 12, col: 0x38bdf8 },\n' +
'      { id: "JFK", name: "New York Edge (JFK)", city: "New York", lat: 40.71, lon: -74.00, ping: 16, col: 0x60a5fa },\n' +
'      { id: "LHR", name: "London Edge (LHR)", city: "London", lat: 51.50, lon: -0.12, ping: 78, col: 0xa855f7 },\n' +
'      { id: "FRA", name: "Frankfurt Core (FRA)", city: "Frankfurt", lat: 50.11, lon: 8.68, ping: 84, col: 0x10b981 },\n' +
'      { id: "HND", name: "Tokyo Edge (HND)", city: "Tokyo", lat: 35.68, lon: 139.69, ping: 142, col: 0xf59e0b },\n' +
'      { id: "SIN", name: "Singapore Hub (SIN)", city: "Singapore", lat: 1.35, lon: 103.82, ping: 185, col: 0xec4899 },\n' +
'      { id: "SYD", name: "Sydney Pacific (SYD)", city: "Sydney", lat: -33.86, lon: 151.20, ping: 210, col: 0x06b6d4 },\n' +
'      { id: "GRU", name: "Sao Paulo Edge (GRU)", city: "São Paulo", lat: -23.55, lon: -46.63, ping: 125, col: 0x34d399 }\n' +
'    ];\n' +
'    function latLonToVec(lat, lon, r) {\n' +
'      const phi = (90 - lat) * (Math.PI / 180);\n' +
'      const theta = (lon + 180) * (Math.PI / 180);\n' +
'      return [-(r * Math.sin(phi) * Math.cos(theta)), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta)];\n' +
'    }\n' +
'    let isFailover = false, orbitsFast = false, activeNodeId = "YUL", targetRotation = null;\n' +
'    const scene = new THREE.Scene();\n' +
'    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);\n' +
'    camera.position.set(0, 0.8, 5.4);\n' +
'    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });\n' +
'    renderer.setSize(container.clientWidth, container.clientHeight);\n' +
'    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));\n' +
'    container.appendChild(renderer.domElement);\n' +
'    scene.add(new THREE.AmbientLight(0xffffff, 0.9));\n' +
'    const dL = new THREE.DirectionalLight(0x38bdf8, 2.5); dL.position.set(4, 3, 5); scene.add(dL);\n' +
'    const earthGroup = new THREE.Group(); scene.add(earthGroup);\n' +
'    let satellites = [];\n' +
'    const R = 1.7;\n' +
'    function buildGlobe() {\n' +
'      while (earthGroup.children.length > 0) earthGroup.remove(earthGroup.children[0]);\n' +
'      satellites = [];\n' +
'      const cvs = document.createElement("canvas"); cvs.width = 1024; cvs.height = 512;\n' +
'      const ctx = cvs.getContext("2d");\n' +
'      const bgGrad = ctx.createLinearGradient(0,0,0,512);\n' +
'      bgGrad.addColorStop(0,"#020617"); bgGrad.addColorStop(0.5,"#040d21"); bgGrad.addColorStop(1,"#020617");\n' +
'      ctx.fillStyle = bgGrad; ctx.fillRect(0,0,1024,512);\n' +
'      ctx.strokeStyle = "rgba(56,189,248,0.08)"; ctx.lineWidth = 1;\n' +
'      for(let x=0;x<=1024;x+=64){ ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,512); ctx.stroke(); }\n' +
'      for(let y=0;y<=512;y+=42){ ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(1024,y); ctx.stroke(); }\n' +
'      ctx.strokeStyle = "rgba(0,243,255,0.2)"; ctx.lineWidth = 1.5;\n' +
'      ctx.beginPath(); ctx.moveTo(0,256); ctx.lineTo(1024,256); ctx.stroke();\n' +
'      const polys = [\n' +
'        [[34,71],[57,54],[114,57],[156,43],[242,28],[284,43],[341,71],[356,100],[327,128],[313,136],[299,156],[284,185],[279,190],[262,196],[264,216],[276,228],[293,233],[284,233],[276,228],[256,213],[236,205],[213,190],[199,171],[179,162],[159,142],[156,117],[142,99],[114,85],[85,85],[57,91],[43,85],[34,71]],\n' +
'        [[293,233],[307,225],[341,228],[370,256],[412,270],[412,284],[404,293],[398,319],[384,324],[370,341],[356,356],[327,384],[318,410],[302,407],[299,384],[307,356],[313,313],[296,296],[284,270],[281,256],[293,233]],\n' +
'        [[486,154],[486,134],[509,125],[498,119],[518,111],[535,99],[540,94],[546,99],[526,85],[540,74],[555,63],[583,54],[597,57],[626,63],[654,71],[683,85],[654,114],[626,128],[597,128],[586,142],[569,151],[555,148],[555,139],[546,131],[526,134],[520,136],[512,142],[498,154],[486,154]],\n' +
'        [[484,111],[495,100],[495,91],[503,91],[515,97],[515,108],[498,114],[484,111]],\n' +
'        [[464,213],[464,196],[475,176],[498,154],[540,151],[583,165],[603,168],[609,176],[626,199],[657,222],[640,242],[626,270],[626,299],[612,324],[603,336],[586,353],[563,353],[555,336],[546,307],[538,270],[538,242],[520,239],[498,242],[470,225],[464,213]],\n' +
'        [[683,85],[711,51],[740,48],[796,37],[853,45],[910,51],[996,65],[1024,71],[996,85],[967,99],[939,88],[910,108],[882,136],[859,148],[859,171],[848,193],[819,205],[811,228],[796,245],[808,253],[796,213],[774,196],[762,193],[740,210],[740,233],[725,228],[711,199],[702,185],[683,185],[668,179],[654,171],[640,142],[654,114],[683,85]],\n' +
'        [[705,188],[717,196],[728,213],[731,233],[740,228],[740,210],[760,193],[762,193],[731,176],[705,188]],\n' +
'        [[882,165],[890,159],[907,156],[913,148],[913,134],[924,131],[913,139],[902,154],[888,162],[882,165]],\n' +
'        [[836,319],[839,353],[853,356],[882,347],[905,356],[910,364],[933,364],[947,336],[939,319],[924,299],[916,287],[899,290],[882,293],[865,302],[859,307],[836,319]],\n' +
'        [[984,387],[996,378],[1007,373],[1010,358],[1018,364],[1010,375],[996,387],[984,387]]\n' +
'      ];\n' +
'      ctx.fillStyle = "#0a1d3d"; ctx.strokeStyle = "#00f3ff"; ctx.lineWidth = 1.5;\n' +
'      polys.forEach(p => {\n' +
'        ctx.beginPath(); ctx.moveTo(p[0][0], p[0][1]);\n' +
'        for(let i=1;i<p.length;i++) ctx.lineTo(p[i][0], p[i][1]);\n' +
'        ctx.closePath(); ctx.fill(); ctx.stroke();\n' +
'      });\n' +
'      const earthTex = new THREE.CanvasTexture(cvs);\n' +
'      const earthMat = new THREE.MeshStandardMaterial({ map: earthTex, roughness: 0.65, metalness: 0.25, emissive: 0x051326, emissiveIntensity: 0.4 });\n' +
'      const earth = new THREE.Mesh(new THREE.SphereGeometry(R, 48, 48), earthMat);\n' +
'      earthGroup.add(earth);\n' +
'      try {\n' +
'        const loader = new THREE.TextureLoader(); loader.setCrossOrigin("anonymous");\n' +
'        const onL = (t) => { t.needsUpdate = true; earthMat.map = t; earthMat.needsUpdate = true; };\n' +
'        loader.load("img/earth_atmos_2048.jpg", onL, undefined, () => {\n' +
'          loader.load("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg", onL);\n' +
'        });\n' +
'      } catch(e) {}\n' +
'      const halo = new THREE.Mesh(new THREE.SphereGeometry(R * 1.12, 32, 32), new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.15, side: THREE.BackSide }));\n' +
'      earthGroup.add(halo);\n' +
'      nodes.forEach(n => {\n' +
'        const [x, y, z] = latLonToVec(n.lat, n.lon, R * 1.015);\n' +
'        const grp = new THREE.Group(); grp.position.set(x, y, z);\n' +
'        const disc = new THREE.Mesh(new THREE.RingGeometry(0.02, 0.065, 16), new THREE.MeshBasicMaterial({ color: n.col, side: THREE.DoubleSide }));\n' +
'        disc.lookAt(new THREE.Vector3(x * 2, y * 2, z * 2)); grp.add(disc);\n' +
'        const pin = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), new THREE.MeshBasicMaterial({ color: n.col }));\n' +
'        pin.position.set(0, 0, 0.04); grp.add(pin);\n' +
'        try {\n' +
'          const lCvs = document.createElement("canvas"); lCvs.width = 160; lCvs.height = 48;\n' +
'          const lCtx = lCvs.getContext("2d");\n' +
'          lCtx.fillStyle = "rgba(6,12,28,0.85)"; lCtx.strokeStyle = "#" + n.col.toString(16).padStart(6, "0"); lCtx.lineWidth = 2;\n' +
'          lCtx.beginPath(); lCtx.roundRect ? lCtx.roundRect(4, 4, 152, 40, 8) : lCtx.rect(4, 4, 152, 40); lCtx.fill(); lCtx.stroke();\n' +
'          lCtx.font = "bold 20px system-ui, sans-serif"; lCtx.fillStyle = "#ffffff"; lCtx.textAlign = "center"; lCtx.textBaseline = "middle";\n' +
'          lCtx.fillText(n.city + " " + n.id, 80, 24);\n' +
'          const spr = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(lCvs), transparent: true }));\n' +
'          spr.position.set(0, 0.14, 0.06); spr.scale.set(0.45, 0.14, 1); grp.add(spr);\n' +
'        } catch(e) {}\n' +
'        grp.userData = { id: n.id, name: n.name };\n' +
'        earthGroup.add(grp);\n' +
'      });\n' +
'      const pairs = [["YUL","LHR"],["LHR","FRA"],["LHR","SIN"],["SIN","HND"],["HND","SYD"],["JFK","GRU"]];\n' +
'      pairs.forEach(([idA, idB]) => {\n' +
'        const nA = nodes.find(x => x.id === idA), nB = nodes.find(x => x.id === idB);\n' +
'        if (!nA || !nB) return;\n' +
'        const pA = new THREE.Vector3(...latLonToVec(nA.lat, nA.lon, R * 1.02));\n' +
'        const pB = new THREE.Vector3(...latLonToVec(nB.lat, nB.lon, R * 1.02));\n' +
'        const mid = pA.clone().add(pB).multiplyScalar(0.5).normalize().multiplyScalar(R * 1.25);\n' +
'        const curve = new THREE.QuadraticBezierCurve3(pA, mid, pB);\n' +
'        const pts = curve.getPoints(36);\n' +
'        const isAtl = (idA === "YUL" && idB === "LHR");\n' +
'        const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: (isAtl && isFailover) ? 0xef4444 : 0x00f3ff, transparent: true, opacity: 0.75, linewidth: 2 }));\n' +
'        earthGroup.add(line);\n' +
'      });\n' +
'      if (isFailover) {\n' +
'        const nY = nodes.find(x => x.id === "YUL"), nL = nodes.find(x => x.id === "LHR");\n' +
'        if (nY && nL) {\n' +
'          const pY = new THREE.Vector3(...latLonToVec(nY.lat, nY.lon, R * 1.02));\n' +
'          const pL = new THREE.Vector3(...latLonToVec(nL.lat, nL.lon, R * 1.02));\n' +
'          const pSat = new THREE.Vector3(0, R * 1.48 * 0.75, R * 1.48 * 0.75);\n' +
'          const c1 = new THREE.QuadraticBezierCurve3(pY, pSat, pSat);\n' +
'          const c2 = new THREE.QuadraticBezierCurve3(pSat, pSat, pL);\n' +
'          const orbPts = [...c1.getPoints(18), ...c2.getPoints(18)];\n' +
'          const orbLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(orbPts), new THREE.LineBasicMaterial({ color: 0xf59e0b, linewidth: 2.5, transparent: true, opacity: 0.95 }));\n' +
'          earthGroup.add(orbLine);\n' +
'        }\n' +
'      }\n' +
'      const satDefs = [\n' +
'        { name: "Starlink-V2", dist: R * 1.45, speed: 0.008, inc: 0.6, col: 0x38bdf8 },\n' +
'        { name: "Galileo-X", dist: R * 1.65, speed: -0.006, inc: -0.8, col: 0x10b981 },\n' +
'        { name: "Quantum-Relay", dist: R * 1.85, speed: 0.005, inc: 0.3, col: 0xf59e0b }\n' +
'      ];\n' +
'      satDefs.forEach(sd => {\n' +
'        const satGrp = new THREE.Group();\n' +
'        const b = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.12), new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9 }));\n' +
'        satGrp.add(b);\n' +
'        const p = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.02, 0.07), new THREE.MeshBasicMaterial({ color: sd.col }));\n' +
'        satGrp.add(p);\n' +
'        const orb = new THREE.Mesh(new THREE.RingGeometry(sd.dist - 0.005, sd.dist + 0.005, 64), new THREE.MeshBasicMaterial({ color: sd.col, side: THREE.DoubleSide, transparent: true, opacity: 0.18 }));\n' +
'        orb.rotation.x = Math.PI / 2 + sd.inc;\n' +
'        earthGroup.add(orb); earthGroup.add(satGrp);\n' +
'        satellites.push({ mesh: satGrp, dist: sd.dist, speed: sd.speed, inc: sd.inc, angle: Math.random() * Math.PI * 2 });\n' +
'      });\n' +
'    }\n' +
'    buildGlobe();\n' +
'    function selectNode(id) {\n' +
'      const node = nodes.find(x => x.id === id) || nodes[0];\n' +
'      activeNodeId = node.id;\n' +
'      document.querySelectorAll(".node-btn").forEach(btn => {\n' +
'        btn.classList.toggle("active", btn.getAttribute("data-node") === node.id);\n' +
'      });\n' +
'      const nameEl = document.getElementById("node-name");\n' +
'      const pingEl = document.getElementById("node-ping");\n' +
'      const statusEl = document.getElementById("node-status");\n' +
'      const geoEl = document.getElementById("node-geo");\n' +
'      if (nameEl) nameEl.textContent = node.name;\n' +
'      if (pingEl) pingEl.textContent = (isFailover && (node.id === "LHR" || node.id === "FRA" || node.id === "YUL") ? "48 ms (Orbital)" : node.ping + " ms");\n' +
'      if (statusEl) statusEl.textContent = (isFailover && (node.id === "LHR" || node.id === "FRA" || node.id === "YUL") ? "⚠️ REROUTED VIA ORBIT" : "🟢 ACTIVE ZERO-G");\n' +
'      if (geoEl) geoEl.textContent = "LAT: " + node.lat.toFixed(2) + "° · LON: " + node.lon.toFixed(2) + "°";\n' +
'      const targetRotY = -(node.lon * Math.PI / 180) - Math.PI / 2;\n' +
'      const targetRotX = (node.lat * Math.PI / 180) * 0.4;\n' +
'      targetRotation = { y: targetRotY, x: targetRotX };\n' +
'    }\n' +
'    document.querySelectorAll(".node-btn").forEach(btn => {\n' +
'      btn.addEventListener("click", () => selectNode(btn.getAttribute("data-node")));\n' +
'    });\n' +
'    const failoverBtn = document.getElementById("btn-failover");\n' +
'    if (failoverBtn) {\n' +
'      failoverBtn.addEventListener("click", () => {\n' +
'        isFailover = !isFailover;\n' +
'        const headerBadge = document.getElementById("header-badge");\n' +
'        if (isFailover) {\n' +
'          failoverBtn.innerHTML = "🔄 Restore Subsea Transatlantic Cable";\n' +
'          failoverBtn.style.borderColor = "#10b981"; failoverBtn.style.color = "#34d399"; failoverBtn.style.background = "rgba(16,185,129,0.15)";\n' +
'          if (headerBadge) { headerBadge.textContent = "⚠️ 48ms ORBITAL FAILOVER"; headerBadge.style.color = "#f59e0b"; headerBadge.style.background = "rgba(245,158,11,0.15)"; headerBadge.style.borderColor = "rgba(245,158,11,0.3)"; }\n' +
'        } else {\n' +
'          failoverBtn.innerHTML = "⚡ Sever Atlantic Cable & Route to Orbit";\n' +
'          failoverBtn.style.borderColor = "rgba(239,68,68,0.5)"; failoverBtn.style.color = "#f87171"; failoverBtn.style.background = "rgba(239,68,68,0.12)";\n' +
'          if (headerBadge) { headerBadge.textContent = "● 12ms GLOBAL EDGE"; headerBadge.style.color = "#34d399"; headerBadge.style.background = "rgba(16,185,129,0.15)"; headerBadge.style.borderColor = "rgba(16,185,129,0.3)"; }\n' +
'        }\n' +
'        buildGlobe();\n' +
'        selectNode(activeNodeId);\n' +
'      });\n' +
'    }\n' +
'    const orbitsBtn = document.getElementById("btn-orbits");\n' +
'    if (orbitsBtn) {\n' +
'      orbitsBtn.addEventListener("click", () => {\n' +
'        orbitsFast = !orbitsFast;\n' +
'        orbitsBtn.style.borderColor = orbitsFast ? "#10b981" : "rgba(14,165,233,0.4)";\n' +
'        orbitsBtn.style.color = orbitsFast ? "#34d399" : "#38bdf8";\n' +
'      });\n' +
'    }\n' +
'    let isDown = false, px = 0, py = 0, hasMoved = false;\n' +
'    container.addEventListener("mousedown", e => { isDown = true; hasMoved = false; px = e.clientX; py = e.clientY; container.style.cursor = "grabbing"; });\n' +
'    window.addEventListener("mousemove", e => {\n' +
'      if (!isDown) return;\n' +
'      const dx = e.clientX - px, dy = e.clientY - py;\n' +
'      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved = true;\n' +
'      earthGroup.rotation.y += dx * 0.008; earthGroup.rotation.x += dy * 0.008;\n' +
'      px = e.clientX; py = e.clientY;\n' +
'    });\n' +
'    window.addEventListener("mouseup", () => { isDown = false; container.style.cursor = "grab"; });\n' +
'    container.addEventListener("wheel", e => {\n' +
'      e.preventDefault();\n' +
'      camera.position.z += e.deltaY * 0.005;\n' +
'      camera.position.z = Math.max(3.2, Math.min(10.0, camera.position.z));\n' +
'    }, { passive: false });\n' +
'    container.addEventListener("click", e => {\n' +
'      if (hasMoved) return;\n' +
'      const rect = container.getBoundingClientRect();\n' +
'      const mouse = new THREE.Vector2(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);\n' +
'      const raycaster = new THREE.Raycaster();\n' +
'      raycaster.setFromCamera(mouse, camera);\n' +
'      const hits = raycaster.intersectObjects(earthGroup.children, true);\n' +
'      for (let hit of hits) {\n' +
'        let p = hit.object;\n' +
'        while (p && p !== earthGroup) {\n' +
'          if (p.userData && p.userData.id) { selectNode(p.userData.id); return; }\n' +
'          p = p.parent;\n' +
'        }\n' +
'      }\n' +
'    });\n' +
'    window.addEventListener("resize", () => {\n' +
'      camera.aspect = container.clientWidth / container.clientHeight;\n' +
'      camera.updateProjectionMatrix();\n' +
'      renderer.setSize(container.clientWidth, container.clientHeight);\n' +
'    });\n' +
'    window.resetOrbit = () => { earthGroup.rotation.set(0,0,0); targetRotation = null; };\n' +
'    window.toggleFullscreen = () => {\n' +
'      if (!document.fullscreenElement) document.documentElement.requestFullscreen(); else document.exitFullscreen();\n' +
'    };\n' +
'    function loop() {\n' +
'      requestAnimationFrame(loop);\n' +
'      if (targetRotation) {\n' +
'        earthGroup.rotation.y += (targetRotation.y - earthGroup.rotation.y) * 0.08;\n' +
'        earthGroup.rotation.x += (targetRotation.x - earthGroup.rotation.x) * 0.08;\n' +
'        if (Math.abs(targetRotation.y - earthGroup.rotation.y) < 0.005) targetRotation = null;\n' +
'      } else if (!isDown) {\n' +
'        earthGroup.rotation.y += 0.002;\n' +
'      }\n' +
'      const speedMult = orbitsFast ? 2.5 : 1.0;\n' +
'      satellites.forEach(s => {\n' +
'        s.angle += s.speed * speedMult;\n' +
'        s.mesh.position.set(Math.cos(s.angle) * s.dist, Math.sin(s.angle * 1.4) * (s.dist * 0.4), Math.sin(s.angle) * s.dist);\n' +
'      });\n' +
'      renderer.render(scene, camera);\n' +
'    }\n' +
'    loop();\n' +
'  <' + '/script>\n' +
'</body>\n' +
'</html>';

      const blob = new Blob([html], { type: 'text/html' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'ultra-global-satellite-standalone.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);

      _toast(_isFr() ? '💾 Export HTML Satellite téléchargé !' : '💾 Standalone Satellite HTML exported!', 'success');
    }
  };

  if (typeof window !== 'undefined') {
    window.UltraGlobalSatelliteDeck = UltraGlobalSatelliteDeck;
  }
})();
