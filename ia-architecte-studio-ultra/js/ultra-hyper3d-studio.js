// ══════════════════════════════════════════════════════════════════════════════
// IA ARCHITECTE STUDIO ULTRA — 3D/4D HYPER-MODEL SCULPTOR & CODE ENGINE (v5.0 Ultra Pro)
// UltraHyper3DStudio (modal-hyper3d-studio)
// 100% Client-Side Procedural Geometry & 4D Projection · Zero External Dependencies
// 15 Procedural Masterpieces · Quantum Shatter · 4D W-Slice · Director Cam · Triple Export · Voice
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
      console.log('[UltraHyper3D]', msg);
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
  // 4D MATHEMATICAL PROJECTION HELPERS
  // ══════════════════════════════════════════════════════════════════════════════
  const TESSERACT_VERTICES_4D = [];
  const TESSERACT_EDGES_4D = [];

  for (let i = 0; i < 16; i++) {
    TESSERACT_VERTICES_4D.push([
      (i & 1) ? 1 : -1,
      (i & 2) ? 1 : -1,
      (i & 4) ? 1 : -1,
      (i & 8) ? 1 : -1
    ]);
  }

  for (let i = 0; i < 16; i++) {
    for (let j = i + 1; j < 16; j++) {
      const diff = i ^ j;
      if (diff === 1 || diff === 2 || diff === 4 || diff === 8) {
        TESSERACT_EDGES_4D.push([i, j]);
      }
    }
  }

  // 4D 24-Cell Octaplex (24 Vertices, 96 Edges)
  const OCTAPLEX_VERTICES_4D = [];
  for (let i = 0; i < 4; i++) {
    for (let s of [-2, 2]) {
      const v = [0, 0, 0, 0];
      v[i] = s;
      OCTAPLEX_VERTICES_4D.push(v);
    }
  }
  for (let i = 0; i < 16; i++) {
    OCTAPLEX_VERTICES_4D.push([
      (i & 1) ? 1 : -1,
      (i & 2) ? 1 : -1,
      (i & 4) ? 1 : -1,
      (i & 8) ? 1 : -1
    ]);
  }
  const OCTAPLEX_EDGES_4D = [];
  for (let i = 0; i < OCTAPLEX_VERTICES_4D.length; i++) {
    for (let j = i + 1; j < OCTAPLEX_VERTICES_4D.length; j++) {
      let d2 = 0;
      for (let k = 0; k < 4; k++) {
        const diff = OCTAPLEX_VERTICES_4D[i][k] - OCTAPLEX_VERTICES_4D[j][k];
        d2 += diff * diff;
      }
      if (Math.abs(d2 - 4) < 1e-5) {
        OCTAPLEX_EDGES_4D.push([i, j]);
      }
    }
  }

  // Rotate 4D vector and project into 3D with W-slice support
  function project4Dto3D(v, thetaXW, thetaYW, thetaZW, d = 2.4, wSlice = 0) {
    let [x, y, z, w] = v;

    const cXW = Math.cos(thetaXW), sXW = Math.sin(thetaXW);
    const x1 = x * cXW - w * sXW;
    const w1 = x * sXW + w * cXW;

    const cYW = Math.cos(thetaYW), sYW = Math.sin(thetaYW);
    const y2 = y * cYW - w1 * sYW;
    const w2 = y * sYW + w1 * cYW;

    const cZW = Math.cos(thetaZW), sZW = Math.sin(thetaZW);
    const z3 = z * cZW - w2 * sZW;
    const w3 = z * sZW + w2 * cZW;

    const scale = 2.0 / Math.max(0.18, (d - (w3 + wSlice * 0.5)));
    return { x: x1 * scale, y: y2 * scale, z: z3 * scale };
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // CORE ENGINE OBJECT
  // ══════════════════════════════════════════════════════════════════════════════
  window.UltraHyper3DStudio = {
    state: {
      activeModel: 'tesseract',     // 15 models: tesseract, clifford, gyroscope, dna, crystal, mobius, hopf, blob, blackhole, lotus, octaplex, neural, klein, calabi, lorenz
      activeMaterial: 'hologram',   // hologram, gold, glass, points
      rotSpeed: 1.0,
      hyperSpeed: 1.0,
      explode: 0.0,                 // 0.0 to 2.5 (Quantum Hyper-Inflation / Bulge)
      realDeform: 0.0,              // 0.0 to 2.0 (Real Geometric Twist / Wave / Pinch / Vortex)
      realDeformMode: 'twist',      // twist, wave, pinch, vortex
      wSlice: 0.0,                  // -2.0 to +2.0
      morphTarget: 'clifford',      // target model for quantum morphing
      morphProgress: 0.0,           // 0.0 to 1.0
      morphAutoCycle: false,        // continuous organic morphing loop
      stardustActive: false,        // 5000 GPU cosmic stardust particles
      stardustMode: 'kepler',       // kepler, vortex, repulse
      stardustCount: 5000,
      spatialSynthActive: false,    // generative geometry-to-sound synth
      camMode: 'orbit',             // orbit, flyby, matrix, spiral
      density: 1.0,
      wireframe: false,
      audioReactive: false,
      cursorWarp: false,
      fxScanlines: false,
      fxChromatic: false,
      fxBloom: false,
      isVoiceActive: false,
      primaryColor: '#38bdf8',
      secondaryColor: '#a855f7',
      isInitialized: false,
      animating: false,
      thetaXW: 0,
      thetaYW: 0,
      thetaZW: 0
    },

    threeData: {
      renderer: null,
      scene: null,
      camera: null,
      activeGroup: null,
      orbit: { isDragging: false, prevX: 0, prevY: 0, rotX: 0.2, rotY: 0.3, distance: 7 },
      cursorPos: { x: 0, y: 0 },
      tesseractNodes: [],
      tesseractLines: [],
      octaplexNodes: [],
      octaplexLines: [],
      hopfRings: [],
      blobData: null,
      blackHoleDisk: null,
      lotusPetals: [],
      neuralData: null,
      lorenzData: null,
      stardustPoints: null,
      stardustPositions: null,
      stardustBaseData: null,
      audioCtx: null,
      synthNodes: null,
      isRecordingWebm: false,
      animId: null,
      recognition: null
    },

    modelsMeta: {
      tesseract: {
        nameEn: '4D Tesseract Hypercube',
        nameFr: 'Hypercube Tesseract 4D',
        icon: '🔷',
        formula: 'P_{3D}(x,y,z,w) = \\frac{2.0}{d - (w + W_{slice})} \\cdot R_{4D}(XW, YW, ZW) \\begin{pmatrix} \\pm 1 \\\\ \\pm 1 \\\\ \\pm 1 \\\\ \\pm 1 \\end{pmatrix}',
        descEn: '16 vertices and 32 edges dynamically rotated in 4D Euclidean space and stereographically projected into 3D.',
        descFr: '16 sommets et 32 arêtes tournant dans l\'espace 4D euclidien et projetés en temps réel dans l\'espace 3D.'
      },
      clifford: {
        nameEn: '4D Clifford Hyper-Torus',
        nameFr: 'Hyper-Tor de Clifford 4D',
        icon: '🌀',
        formula: '(x,y,z,w) = (r\\cos u, r\\sin u, R\\cos v, R\\sin v) \\subset \\mathbb{S}^3 \\to \\mathbb{R}^3',
        descEn: 'Flat torus embedding in 4-space with neon particle flux traversing hyper-curved geodesics.',
        descFr: 'Plongement de tore plat dans l\'espace 4D avec flux de particules néon suivant les géodésiques.'
      },
      gyroscope: {
        nameEn: 'Quantum Fusion Gyroscope',
        nameFr: 'Gyroscope à Fusion Quantique',
        icon: '⚛️',
        formula: '\\sum_{k=1}^3 R_k(\\theta_k) \\oplus \\text{Core}(\\omega t) \\oplus \\text{Orbitals}(N=400)',
        descEn: '3 concentric nested gimbal rings with independent multi-axis rotation and pulsating plasma core.',
        descFr: '3 anneaux cardan imbriqués tournant sur des axes indépendants avec un cœur de plasma pulsant.'
      },
      dna: {
        nameEn: 'Parametric DNA Double Helix',
        nameFr: 'Double Hélice ADN Paramétrique',
        icon: '🧬',
        formula: 'H(t) = \\left(R\\cos t, pitch \\cdot t - \\frac{H}{2}, R\\sin t\\right) \\cup \\left(R\\cos(t+\\pi), \\dots\\right)',
        descEn: 'Procedural twin sinusoidal strands linked by base pair hydrogen rungs and glowing nucleotides.',
        descFr: 'Brins jumeaux sinusoïdaux procéduraux reliés par des ponts hydrogène et des nucléotides lumineux.'
      },
      crystal: {
        nameEn: 'Cyber Polyhedral Geode Crystal',
        nameFr: 'Cristal Géode Polyédrique Cyber',
        icon: '💎',
        formula: 'Icosahedron(V=12, F=20, Subdiv=1) \\oplus WireframeEdges(NodeBeacons)',
        descEn: 'Faceted geometric crystal core with caustic refractions and illuminated outer wireframe cage.',
        descFr: 'Cristal géométrique facetté avec réfractions caustiques et cage fil de fer extérieure illuminée.'
      },
      mobius: {
        nameEn: 'Endless Möbius Ribbon',
        nameFr: 'Ruban de Möbius Infini',
        icon: '♾️',
        formula: 'M(u,v) = \\left(R + v\\cos\\frac{u}{2}\\right) \\begin{pmatrix} \\cos u \\\\ \\sin u \\end{pmatrix} \\oplus v\\sin\\frac{u}{2} \\hat{k}',
        descEn: 'Single-boundary non-orientable topological manifold with continuous traveling neon pulses.',
        descFr: 'Variété topologique non orientable à bord unique avec impulsions lumineuses néon infinies.'
      },
      hopf: {
        nameEn: '4D Hopf Fibration',
        nameFr: 'Fibration de Hopf 4D',
        icon: '🌐',
        formula: '\\pi: \\mathbb{S}^3 \\to \\mathbb{S}^2, \\quad \\psi \\mapsto (z_1, z_2) = (\\cos\\frac{\\theta}{2} e^{i(\\psi+\\frac{\\phi}{2})}, \\sin\\frac{\\theta}{2} e^{i(\\psi-\\frac{\\phi}{2})})',
        descEn: '16 nested Villarceau fiber circles linking in 4-space, stereographically projected into interlocking 3D rings.',
        descFr: '16 cercles de fibres Villarceau entrelacés dans l\'espace 4D, projetés stéréographiquement en anneaux 3D.'
      },
      blob: {
        nameEn: 'Morphing Cyber Fluid Blob',
        nameFr: 'Goutte Cyber-Fluide Morphique',
        icon: '🫧',
        formula: 'r(\\theta,\\phi,t) = R_0 + \\sum_{k=1}^3 A_k \\sin(\\mathbf{k} \\cdot \\mathbf{x} + \\omega_k t) \\cdot \\mathbf{n}',
        descEn: 'High-resolution organic icosahedral mesh displaced in real time along surface normals with harmonic 3D waveforms.',
        descFr: 'Maillage icosaédrique organique déformé en temps réel selon les normales de surface par ondes harmoniques 3D.'
      },
      blackhole: {
        nameEn: 'Quantum Relativistic Black Hole',
        nameFr: 'Trou Noir Quantique Relativiste',
        icon: '🕳️',
        formula: 'R_s = \\frac{2GM}{c^2}, \\quad v(r) = \\sqrt{\\frac{GM}{r}}, \\quad \\frac{\\Delta\\lambda}{\\lambda} = \\sqrt{\\frac{1-v/c}{1+v/c}} - 1',
        descEn: 'Schwarzschild event horizon, Doppler-shifted Keplerian accretion disk, and bipolar relativistic laser jets.',
        descFr: 'Horizon des événements de Schwarzschild, disque d\'accrétion de Kepler avec effet Doppler et jets laser relativistes bipolaires.'
      },
      lotus: {
        nameEn: 'Kinetic Fibonacci Phyllotaxis Lotus',
        nameFr: 'Lotus Cinétique Fibonacci Phyllotaxie',
        icon: '🪷',
        formula: '\\theta_n = n \\times 137.5077^\\circ, \\quad r_n = c\\sqrt{n}, \\quad \\psi(t) = \\alpha_0 + A\\sin(\\omega t + n\\delta)',
        descEn: '42 parametric golden-ratio spiral petals breathing and blooming in synchronized kinetic harmonic rhythm.',
        descFr: '42 pétales en spirale dorée de Fibonacci s\'ouvrant et se fermant en rythme cinétique harmonique synchronisé.'
      },
      octaplex: {
        nameEn: '4D 24-Cell Octaplex Hyper-Diamond',
        nameFr: 'Hyper-Diamant 4D 24-Cellules Octaplex',
        icon: '💠',
        formula: 'V = \\{(\\pm 2, 0, 0, 0)_{\\text{perm}}\\} \\cup \\{(\\pm 1, \\pm 1, \\pm 1, \\pm 1)\\}, \\quad |V|=24, \\quad |E|=96',
        descEn: 'Self-dual 4D regular polychoron with 24 vertices and 96 edges rotating across 4-dimensional hyperplanes.',
        descFr: 'Polychore régulier 4D auto-dual à 24 sommets et 96 arêtes tournant à travers les hyperplans 4D.'
      },
      neural: {
        nameEn: 'Living Bionic Neural Synapses',
        nameFr: 'Réseau Synaptique Bionique Vivant',
        icon: '🧠',
        formula: '\\nabla^2 V - \\frac{1}{v^2}\\frac{\\partial^2 V}{\\partial t^2} = f(V), \\quad \\text{Action Potential Solitons}',
        descEn: 'Dual-lobe organic soma neurons connected by synaptic axons with traveling photon action potentials.',
        descFr: 'Neurones somas organiques à deux lobes reliés par des axones synaptiques traversés par des potentiels d\'action photoniques.'
      },
      klein: {
        nameEn: '4D Non-Orientable Klein Bottle',
        nameFr: 'Bouteille de Klein 4D Non-Orientable',
        icon: '🍷',
        formula: '(x,y,z,w) = ((R+r\\cos v)\\cos u, (R+r\\cos v)\\sin u, r\\sin v\\cos\\frac{u}{2}, r\\sin v\\sin\\frac{u}{2}) \\subset \\mathbb{R}^4 \\to \\mathbb{R}^3',
        descEn: 'True 4-dimensional non-intersecting topological immersion of the one-sided Klein bottle stereographically projected into 3D.',
        descFr: 'Plongement topologique 4D sans auto-intersection de la bouteille de Klein unilatérale projetée en 3D.'
      },
      calabi: {
        nameEn: '6D Calabi-Yau String Manifold',
        nameFr: 'Variété Calabi-Yau 6D Théorie des Cordes',
        icon: '📐',
        formula: 'Z = \\{ z_1^5 + z_2^5 + z_3^5 + z_4^5 + z_5^5 = 0 \\} \\subset \\mathbb{CP}^4 \\implies \\text{Ricci-Flat 6-Manifold Cross-Section}',
        descEn: 'Cross-section of the 6-dimensional Ricci-flat Calabi-Yau quintic compactification manifold from Superstring Theory.',
        descFr: 'Coupe transversale de la variété compactifiée Calabi-Yau à 6 dimensions à courbure de Ricci nulle de la Théorie des Cordes.'
      },
      lorenz: {
        nameEn: 'Lorenz Chaotic Strange Attractor',
        nameFr: 'Attracteur Étrange Chaotique de Lorenz',
        icon: '🦋',
        formula: '\\frac{dx}{dt} = \\sigma(y - x), \\quad \\frac{dy}{dt} = x(\\rho - z) - y, \\quad \\frac{dz}{dt} = xy - \\beta z \\quad (\\sigma=10, \\rho=28, \\beta=8/3)',
        descEn: 'Deterministic chaos butterfly attractor with 2,400 continuous trajectory steps and orbiting photon solitons.',
        descFr: 'Attracteur papillon du chaos déterministe avec 2400 étapes de trajectoire et solitons photoniques orbitaux.'
      }
    },

    open: function() {
      const modal = document.getElementById('modal-hyper3d-studio');
      if (modal) {
        modal.classList.add('show', 'active');
        _sound('click');
        setTimeout(() => {
          this.initThree();
          this.resizeCanvas();
          this.applyDeformation();
          this.updateUi();
        }, 60);
      }
    },

    resizeCanvas: function() {
      const container = document.getElementById('hyper3d-canvas-container');
      if (!container || !this.threeData.renderer || !this.threeData.camera) return;
      const w = container.clientWidth || 500;
      const h = container.clientHeight || 380;
      this.threeData.camera.aspect = w / h;
      this.threeData.camera.updateProjectionMatrix();
      this.threeData.renderer.setSize(w, h);
    },

    close: function() {
      const modal = document.getElementById('modal-hyper3d-studio');
      if (modal) {
        modal.classList.remove('show', 'active');
        this.pauseLoop();
      }
    },

    initThree: function() {
      const container = document.getElementById('hyper3d-canvas-container');
      if (!container) return;

      const THREE = (typeof window.THREE !== 'undefined') ? window.THREE : null;
      if (!THREE) {
        console.error('[UltraHyper3D] THREE.js is not loaded.');
        return;
      }

      const w = container.clientWidth || 480;
      const h = container.clientHeight || 420;

      if (!this.threeData.renderer) {
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
        renderer.setSize(w, h);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
        camera.position.set(0, 0, this.threeData.orbit.distance);

        const ambLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambLight);

        const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 1.2);
        dirLight1.position.set(5, 10, 7);
        scene.add(dirLight1);

        const dirLight2 = new THREE.DirectionalLight(0xa855f7, 0.8);
        dirLight2.position.set(-5, -10, -7);
        scene.add(dirLight2);

        const pointLight = new THREE.PointLight(0xffffff, 1.5, 20);
        pointLight.position.set(0, 0, 4);
        scene.add(pointLight);

        const activeGroup = new THREE.Group();
        scene.add(activeGroup);

        this.threeData.renderer = renderer;
        this.threeData.scene = scene;
        this.threeData.camera = camera;
        this.threeData.activeGroup = activeGroup;

        this.setupOrbit(container);

        window.addEventListener('resize', () => {
          if (!container.clientWidth || !this.threeData.renderer) return;
          const nw = container.clientWidth;
          const nh = container.clientHeight;
          this.threeData.camera.aspect = nw / nh;
          this.threeData.camera.updateProjectionMatrix();
          this.threeData.renderer.setSize(nw, nh);
        });
      }

      this.buildCurrentModel();
      this.startLoop();
    },

    setupOrbit: function(elem) {
      const orbit = this.threeData.orbit;
      const self = this;

      elem.addEventListener('mousedown', (e) => {
        if (self.state.camMode !== 'orbit') return;
        orbit.isDragging = true;
        orbit.prevX = e.clientX;
        orbit.prevY = e.clientY;
      });

      elem.addEventListener('mousemove', (e) => {
        const rect = elem.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        self.threeData.cursorPos = { x: normX, y: normY };
      });

      window.addEventListener('mousemove', (e) => {
        if (!orbit.isDragging || self.state.camMode !== 'orbit') return;
        const dx = e.clientX - orbit.prevX;
        const dy = e.clientY - orbit.prevY;
        orbit.rotY += dx * 0.008;
        orbit.rotX += dy * 0.008;
        orbit.rotX = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, orbit.rotX));
        orbit.prevX = e.clientX;
        orbit.prevY = e.clientY;
      });

      window.addEventListener('mouseup', () => {
        orbit.isDragging = false;
      });

      elem.addEventListener('wheel', (e) => {
        e.preventDefault();
        orbit.distance += e.deltaY * 0.005;
        orbit.distance = Math.max(2.5, Math.min(18, orbit.distance));
      }, { passive: false });

      elem.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1 && self.state.camMode === 'orbit') {
          orbit.isDragging = true;
          orbit.prevX = e.touches[0].clientX;
          orbit.prevY = e.touches[0].clientY;
        }
      });

      elem.addEventListener('touchmove', (e) => {
        if (!orbit.isDragging || e.touches.length !== 1 || self.state.camMode !== 'orbit') return;
        const dx = e.touches[0].clientX - orbit.prevX;
        const dy = e.touches[0].clientY - orbit.prevY;
        orbit.rotY += dx * 0.008;
        orbit.rotX += dy * 0.008;
        orbit.prevX = e.touches[0].clientX;
        orbit.prevY = e.touches[0].clientY;
      });

      elem.addEventListener('touchend', () => {
        orbit.isDragging = false;
      });
    },

    getMaterial: function(isWireframe, opacity = 1.0, colorOverride = null) {
      const THREE = window.THREE;
      const matType = this.state.activeMaterial;

      if (matType === 'gold') {
        return new THREE.MeshStandardMaterial({
          color: colorOverride || 0xf59e0b,
          roughness: 0.15,
          metalness: 0.9,
          wireframe: isWireframe || this.state.wireframe
        });
      } else if (matType === 'glass') {
        return new THREE.MeshPhysicalMaterial({
          color: colorOverride || 0x10b981,
          roughness: 0.1,
          metalness: 0.1,
          transmission: 0.85,
          transparent: true,
          opacity: 0.75,
          wireframe: isWireframe || this.state.wireframe
        });
      } else if (matType === 'points') {
        return new THREE.PointsMaterial({
          color: colorOverride || this.state.primaryColor,
          size: 0.06,
          transparent: true,
          opacity: 0.9
        });
      } else {
        return new THREE.MeshStandardMaterial({
          color: colorOverride || this.state.primaryColor,
          emissive: colorOverride || this.state.secondaryColor,
          emissiveIntensity: 0.6,
          roughness: 0.25,
          metalness: 0.4,
          wireframe: isWireframe || this.state.wireframe,
          transparent: true,
          opacity: opacity
        });
      }
    },

    buildCurrentModel: function() {
      const THREE = window.THREE;
      const group = this.threeData.activeGroup;
      if (!group || !THREE) return;

      while (group.children.length > 0) {
        const obj = group.children[0];
        group.remove(obj);
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
      }

      this.threeData.tesseractNodes = [];
      this.threeData.tesseractLines = [];
      this.threeData.octaplexNodes = [];
      this.threeData.octaplexLines = [];
      this.threeData.hopfRings = [];
      this.threeData.blobData = null;
      this.threeData.blackHoleDisk = null;
      this.threeData.lotusPetals = [];
      this.threeData.neuralData = null;
      this.threeData.lorenzData = null;

      const m = this.state.activeModel;

      if (m === 'tesseract') {
        this.buildTesseract();
      } else if (m === 'clifford') {
        this.buildCliffordTorus();
      } else if (m === 'gyroscope') {
        this.buildGyroscope();
      } else if (m === 'dna') {
        this.buildDnaHelix();
      } else if (m === 'crystal') {
        this.buildCrystal();
      } else if (m === 'mobius') {
        this.buildMobius();
      } else if (m === 'hopf') {
        this.buildHopf();
      } else if (m === 'blob') {
        this.buildBlob();
      } else if (m === 'blackhole') {
        this.buildBlackHole();
      } else if (m === 'lotus') {
        this.buildLotus();
      } else if (m === 'octaplex') {
        this.buildOctaplex();
      } else if (m === 'neural') {
        this.buildNeural();
      } else if (m === 'klein') {
        this.buildKleinBottle();
      } else if (m === 'calabi') {
        this.buildCalabiYau();
      } else if (m === 'lorenz') {
        this.buildLorenzAttractor();
      }

      // Capture original positions, normals, and base locations across entire hierarchy
      group.traverse(child => {
        if (child.position) {
          child.userData.basePos = child.position.clone();
        }
        if (child.geometry && child.geometry.attributes && child.geometry.attributes.position) {
          const pos = child.geometry.attributes.position;
          child.geometry.userData.origPositions = new Float32Array(pos.array);
          if (child.geometry.attributes.normal) {
            child.geometry.userData.origNormals = new Float32Array(child.geometry.attributes.normal.array);
          } else if (child.isMesh && child.geometry.computeVertexNormals) {
            child.geometry.computeVertexNormals();
            if (child.geometry.attributes.normal) {
              child.geometry.userData.origNormals = new Float32Array(child.geometry.attributes.normal.array);
            }
          }
        }
      });

      this.applyDeformation();
    },

    // 🔮 Parametric Coordinate Sampler for Universal Quantum Shape Morphing
    _getParametricPoint: function(modelName, t, i) {
      let x = 0, y = 0, z = 0;
      if (modelName === 'tesseract') {
        const edge = Math.floor(t * 32);
        const frac = (t * 32) % 1;
        x = (((edge & 1) ? 1.4 : -1.4) * (1 - frac) + ((edge & 2) ? 1.4 : -1.4) * frac);
        y = (((edge & 4) ? 1.4 : -1.4) * (1 - frac) + ((edge & 8) ? 1.4 : -1.4) * frac);
        z = (((edge & 16) ? 1.4 : -1.4) * (1 - frac) + ((edge & 2) ? -1.4 : 1.4) * frac);
      } else if (modelName === 'clifford') {
        const u = t * Math.PI * 8, v = t * Math.PI * 4;
        const R = 1.7, r = 0.65;
        x = (R + r * Math.cos(v)) * Math.cos(u);
        y = (R + r * Math.cos(v)) * Math.sin(u);
        z = r * Math.sin(v) * 1.35;
      } else if (modelName === 'gyroscope') {
        const ring = Math.floor(t * 3);
        const a = (t * 3 % 1) * Math.PI * 2;
        const r = 1.35 + ring * 0.4;
        if (ring === 0) { x = Math.cos(a) * r; y = Math.sin(a) * r; z = 0; }
        else if (ring === 1) { x = Math.cos(a) * r; y = 0; z = Math.sin(a) * r; }
        else { x = 0; y = Math.cos(a) * r; z = Math.sin(a) * r; }
      } else if (modelName === 'dna') {
        const u = (t - 0.5) * Math.PI * 6;
        const strand = (i % 2 === 0) ? 0 : Math.PI;
        x = Math.cos(u + strand) * 1.25;
        y = (t - 0.5) * 4.0;
        z = Math.sin(u + strand) * 1.25;
      } else if (modelName === 'crystal') {
        const phi = (1 + Math.sqrt(5)) / 2;
        const icos = [
          [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
          [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
          [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
        ];
        const p = icos[i % 12];
        x = p[0] * 1.2; y = p[1] * 1.2; z = p[2] * 1.2;
      } else if (modelName === 'mobius') {
        const u = t * Math.PI * 2;
        const v = ((i % 5) / 4 - 0.5) * 0.85;
        const R = 1.75;
        x = (R + v * Math.cos(u * 0.5)) * Math.cos(u);
        y = (R + v * Math.cos(u * 0.5)) * Math.sin(u);
        z = v * Math.sin(u * 0.5) * 1.5;
      } else if (modelName === 'hopf') {
        const fiber = (i % 16) / 16 * Math.PI * 2;
        const u = (t * 16 % 1) * Math.PI * 2;
        x = Math.cos(u) * Math.cos(fiber) * 1.85;
        y = Math.sin(u) * 1.85;
        z = Math.cos(u) * Math.sin(fiber) * 1.85;
      } else if (modelName === 'blob') {
        const u = t * Math.PI * 4;
        const v = (t * 7 % 1) * Math.PI - Math.PI / 2;
        const rad = 1.55 + Math.sin(u * 3) * 0.3 + Math.cos(v * 4) * 0.22;
        x = rad * Math.cos(v) * Math.cos(u);
        y = rad * Math.sin(v);
        z = rad * Math.cos(v) * Math.sin(u);
      } else if (modelName === 'blackhole') {
        const ring = t * 3.0 + 0.45;
        const a = t * Math.PI * 18;
        x = Math.cos(a) * ring;
        y = Math.sin(ring * 4) * 0.18;
        z = Math.sin(a) * ring;
      } else if (modelName === 'lotus') {
        const theta = i * 2.39996;
        const r = Math.sqrt(t) * 2.2;
        x = Math.cos(theta) * r;
        y = Math.sin(r * 2.5) * 0.6;
        z = Math.sin(theta) * r;
      } else if (modelName === 'octaplex') {
        const u = t * Math.PI * 2;
        const v = t * Math.PI * 4;
        x = Math.cos(u) * 1.75;
        y = Math.sin(u) * Math.cos(v) * 1.75;
        z = Math.sin(v) * 1.75;
      } else if (modelName === 'neural') {
        const u = (t - 0.5) * 3.4;
        const lobe = (i % 2 === 0) ? -1.25 : 1.25;
        x = lobe + Math.sin(t * 18) * 0.35;
        y = u + Math.cos(t * 14) * 0.35;
        z = Math.sin(t * 26) * 0.45;
      } else if (modelName === 'klein') {
        const u = t * Math.PI * 2;
        const v = (t * 5 % 1) * Math.PI * 2;
        const r = 4 * (1 - Math.cos(u) / 2);
        if (u < Math.PI) {
          x = (6 * Math.cos(u) * (1 + Math.sin(u)) + r * Math.cos(u) * Math.cos(v)) * 0.18;
          y = (16 * Math.sin(u) + r * Math.sin(u) * Math.cos(v)) * 0.18;
        } else {
          x = (6 * Math.cos(u) * (1 + Math.sin(u)) + r * Math.cos(v + Math.PI)) * 0.18;
          y = (16 * Math.sin(u)) * 0.18;
        }
        z = r * Math.sin(v) * 0.18;
      } else if (modelName === 'calabi') {
        const u = (t * 2 - 1) * Math.PI;
        const v = (t * 8 % 1) * 2 - 1;
        x = Math.cos(u) * (Math.cosh(v) * 0.75) * 1.15;
        y = Math.sin(u) * (Math.sinh(v) * 0.75) * 1.15;
        z = Math.sin(u * 5) * 0.65;
      } else {
        // lorenz
        const a = t * Math.PI * 6;
        x = Math.sin(a) * (1.4 + Math.cos(a * 2) * 0.45);
        y = Math.cos(a) * (1.4 + Math.cos(a * 2) * 0.45);
        z = Math.sin(a * 3) * 1.1;
      }
      return { x, y, z };
    },

    // 💥 Dynamic Real Geometric Deformer (Twist/Wave/Pinch/Vortex) & Quantum Hyper-Inflation (Bulge)
    applyDeformation: function() {
      const group = this.threeData.activeGroup;
      if (!group) return;

      const exp = this.state.explode;
      const realDef = this.state.realDeform || 0;
      const defMode = this.state.realDeformMode || 'twist';
      const wSlice = this.state.wSlice;
      const hasExp = exp > 0.001;
      const hasDef = realDef > 0.001;
      const hasW = Math.abs(wSlice) > 0.001;

      group.traverse(child => {
        // 1. Separate composite parts radially
        if (child.userData && child.userData.basePos) {
          const bp = child.userData.basePos;
          const dist = Math.hypot(bp.x, bp.y, bp.z);
          if (dist > 0.04) {
            let pos = bp.clone();
            const dir = bp.clone().normalize();
            if (hasExp) pos.addScaledVector(dir, exp * 1.5);
            if (hasDef) {
              if (defMode === 'twist') {
                const th = bp.y * (realDef * 1.25);
                const c = Math.cos(th), s = Math.sin(th);
                pos.x = bp.x * c - bp.z * s;
                pos.z = bp.x * s + bp.z * c;
              } else if (defMode === 'wave') {
                pos.y += Math.sin(dist * 3.5) * (realDef * 0.55);
              } else if (defMode === 'pinch') {
                const f = Math.max(0.1, 1.0 - (1.0 / (1.0 + bp.y * bp.y * 1.5)) * (realDef * 0.65));
                pos.x *= f; pos.z *= f;
              } else {
                const th = bp.y * (realDef * 0.9);
                const c = Math.cos(th), s = Math.sin(th);
                pos.x = bp.x * c - bp.z * s;
                pos.z = bp.x * s + bp.z * c;
              }
            }
            child.position.copy(pos);
          } else {
            child.position.copy(bp);
          }
        }

        // 2. Vertex-Level Real Geometric Deformation & Quantum Bulging & Shape Morphing
        if (child.geometry && child.geometry.userData && child.geometry.userData.origPositions) {
          const orig = child.geometry.userData.origPositions;
          const norms = child.geometry.userData.origNormals;
          const posAttr = child.geometry.attributes.position;
          const pos = posAttr.array;
          const count = orig.length / 3;
          const morphP = this.state.morphProgress || 0;
          const hasMorph = morphP > 0.001;
          const morphTgt = this.state.morphTarget || 'clifford';

          if (!hasExp && !hasDef && !hasW && !hasMorph) {
            for (let i = 0; i < orig.length; i++) {
              pos[i] = orig[i];
            }
          } else {
            for (let i = 0; i < count; i++) {
              const i3 = i * 3;
              let x = orig[i3];
              let y = orig[i3 + 1];
              let z = orig[i3 + 2];

              // 🌀 Quantum Continuous Shape Morphing
              if (hasMorph) {
                const t = count > 1 ? (i / (count - 1)) : 0;
                const tp = this._getParametricPoint(morphTgt, t, i);
                x = x * (1.0 - morphP) + tp.x * morphP;
                y = y * (1.0 - morphP) + tp.y * morphP;
                z = z * (1.0 - morphP) + tp.z * morphP;
              }

              // A. Real Geometric Deformation (Twist / Wave / Pinch / Vortex)
              if (hasDef) {
                if (defMode === 'twist') {
                  const theta = y * (realDef * 1.25);
                  const c = Math.cos(theta), s = Math.sin(theta);
                  const rx = x * c - z * s;
                  const rz = x * s + z * c;
                  x = rx;
                  z = rz;
                } else if (defMode === 'wave') {
                  const r = Math.hypot(x, z);
                  const dy = Math.sin(r * 3.5) * (realDef * 0.55) + Math.cos(x * 2.5) * (realDef * 0.25);
                  const dx = Math.sin(y * 3.0) * (realDef * 0.35);
                  const dz = Math.cos(y * 3.0) * (realDef * 0.35);
                  x += dx;
                  y += dy;
                  z += dz;
                } else if (defMode === 'pinch') {
                  const factor = Math.max(0.1, 1.0 - (1.0 / (1.0 + y * y * 1.5)) * (realDef * 0.65));
                  x *= factor;
                  z *= factor;
                  y *= (1.0 + realDef * 0.25);
                } else {
                  // vortex
                  const r = Math.hypot(x, z);
                  const theta = y * (realDef * 0.9) + Math.sin(r * 2.0) * (realDef * 0.45);
                  const c = Math.cos(theta), s = Math.sin(theta);
                  const rx = x * c - z * s;
                  const rz = x * s + z * c;
                  const pinch = Math.max(0.15, 1.0 + Math.sin(y * 2.2) * (realDef * 0.35));
                  x = rx * pinch;
                  z = rz * pinch;
                  y += Math.cos(rx * 2.0) * (realDef * 0.25);
                }
              }

              // B. Quantum Hyper-Inflation / Bulge (Normal Displacement)
              if (hasExp) {
                let nx, ny, nz;
                if (norms && norms.length > i3 + 2) {
                  nx = norms[i3]; ny = norms[i3 + 1]; nz = norms[i3 + 2];
                } else {
                  const l = Math.hypot(x, y, z) || 1;
                  nx = x / l; ny = y / l; nz = z / l;
                }
                const jitter = Math.sin(i * 37.11 + x * 15.7) * 0.22;
                const factor = exp * (1.2 + jitter);
                x += nx * factor;
                y += ny * factor;
                z += nz * factor;
              }

              // C. 4D Tomographic W-Slice
              if (hasW) {
                const phase = Math.sin(x * 1.4 + y * 1.4 + wSlice * 2.2);
                const wFactor = 1.0 + phase * (wSlice * 0.35);
                x *= wFactor;
                y *= wFactor;
                z += Math.cos(z * 1.4 + wSlice * 2.5) * (wSlice * 0.35);
              }

              pos[i3] = x;
              pos[i3 + 1] = y;
              pos[i3 + 2] = z;
            }
          }
          posAttr.needsUpdate = true;
          if (child.isMesh && child.geometry.computeVertexNormals) {
            child.geometry.computeVertexNormals();
          }
        }
      });
    },

    // 1. 4D Tesseract Hypercube
    buildTesseract: function() {
      const THREE = window.THREE;
      const group = this.threeData.activeGroup;

      const nodeMat = new THREE.MeshStandardMaterial({
        color: this.state.primaryColor,
        emissive: this.state.secondaryColor,
        emissiveIntensity: 0.9,
        roughness: 0.2
      });

      this.threeData.tesseractNodes = [];
      for (let i = 0; i < 16; i++) {
        const sphereGeo = new THREE.SphereGeometry(0.08, 16, 16);
        const mesh = new THREE.Mesh(sphereGeo, nodeMat);
        group.add(mesh);
        this.threeData.tesseractNodes.push(mesh);
      }

      this.threeData.tesseractLines = [];
      const lineMat = new THREE.LineBasicMaterial({
        color: this.state.primaryColor,
        transparent: true,
        opacity: 0.85,
        linewidth: 2
      });

      for (let i = 0; i < TESSERACT_EDGES_4D.length; i++) {
        const [a, b] = TESSERACT_EDGES_4D[i];
        const lineGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(6);
        lineGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const line = new THREE.Line(lineGeo, lineMat);
        group.add(line);
        this.threeData.tesseractLines.push({ line, a, b });
      }
    },

    // 2. 4D Clifford Torus
    buildCliffordTorus: function() {
      const THREE = window.THREE;
      const group = this.threeData.activeGroup;

      const uSteps = 48, vSteps = 24;
      const geom = new THREE.BufferGeometry();
      const pos = [];

      for (let i = 0; i <= uSteps; i++) {
        const u = (i / uSteps) * Math.PI * 2;
        for (let j = 0; j <= vSteps; j++) {
          const v = (j / vSteps) * Math.PI * 2;
          const x4 = Math.cos(u), y4 = Math.sin(u), z4 = Math.cos(v), w4 = Math.sin(v);
          const p = project4Dto3D([x4, y4, z4, w4], 0.4, 0.4, 0.4, 2.5, this.state.wSlice);
          pos.push(p.x, p.y, p.z);
        }
      }

      geom.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));

      const ptsMat = new THREE.PointsMaterial({
        color: this.state.primaryColor,
        size: 0.05,
        transparent: true,
        opacity: 0.85
      });
      const points = new THREE.Points(geom, ptsMat);
      group.add(points);

      const torusGeom = new THREE.TorusKnotGeometry(1.8, 0.45, 128, 32, 2, 3);
      const torusMesh = new THREE.Mesh(torusGeom, this.getMaterial(true, 0.6));
      group.add(torusMesh);
    },

    // 3. Quantum Fusion Gyroscope
    buildGyroscope: function() {
      const THREE = window.THREE;
      const group = this.threeData.activeGroup;

      const ring1Geom = new THREE.TorusGeometry(2.4, 0.07, 16, 64);
      const ring2Geom = new THREE.TorusGeometry(1.8, 0.06, 16, 64);
      const ring3Geom = new THREE.TorusGeometry(1.2, 0.05, 16, 64);

      const r1 = new THREE.Mesh(ring1Geom, this.getMaterial(false, 0.9, this.state.primaryColor));
      const r2 = new THREE.Mesh(ring2Geom, this.getMaterial(false, 0.9, this.state.secondaryColor));
      const r3 = new THREE.Mesh(ring3Geom, this.getMaterial(false, 0.9, '#f59e0b'));

      r1.name = 'ring1';
      r2.name = 'ring2';
      r3.name = 'ring3';
      group.add(r1);
      group.add(r2);
      group.add(r3);

      const coreGeo = new THREE.IcosahedronGeometry(0.55, 3);
      const coreMat = new THREE.MeshStandardMaterial({
        color: '#ffffff',
        emissive: this.state.primaryColor,
        emissiveIntensity: 1.2,
        roughness: 0.1
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      core.name = 'plasmaCore';
      group.add(core);

      const pCount = 300;
      const pGeo = new THREE.BufferGeometry();
      const pPos = [];
      for (let i = 0; i < pCount; i++) {
        const rad = 0.8 + Math.random() * 2.0;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        pPos.push(
          rad * Math.sin(phi) * Math.cos(theta),
          rad * Math.sin(phi) * Math.sin(theta),
          rad * Math.cos(phi)
        );
      }
      pGeo.setAttribute('position', new THREE.Float32BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({
        color: this.state.primaryColor,
        size: 0.04,
        transparent: true,
        opacity: 0.8
      });
      const pCloud = new THREE.Points(pGeo, pMat);
      pCloud.name = 'orbitalCloud';
      group.add(pCloud);
    },

    // 4. Parametric DNA Helix
    buildDnaHelix: function() {
      const THREE = window.THREE;
      const group = this.threeData.activeGroup;

      const pairs = 36;
      const radius = 1.3;
      const height = 4.5;
      const stepH = height / pairs;
      const pitch = (Math.PI * 4) / pairs;

      const sphereMatA = new THREE.MeshStandardMaterial({ color: this.state.primaryColor, emissive: this.state.primaryColor, emissiveIntensity: 0.5 });
      const sphereMatB = new THREE.MeshStandardMaterial({ color: this.state.secondaryColor, emissive: this.state.secondaryColor, emissiveIntensity: 0.5 });
      const rungMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3, metalness: 0.6 });

      const nodeGeom = new THREE.SphereGeometry(0.09, 16, 16);

      for (let i = 0; i < pairs; i++) {
        const angle = i * pitch;
        const y = (i * stepH) - (height / 2);

        const xA = Math.cos(angle) * radius;
        const zA = Math.sin(angle) * radius;
        const xB = Math.cos(angle + Math.PI) * radius;
        const zB = Math.sin(angle + Math.PI) * radius;

        const nA = new THREE.Mesh(nodeGeom, sphereMatA);
        nA.position.set(xA, y, zA);
        group.add(nA);

        const nB = new THREE.Mesh(nodeGeom, sphereMatB);
        nB.position.set(xB, y, zB);
        group.add(nB);

        const rungGeo = new THREE.CylinderGeometry(0.03, 0.03, radius * 2, 8);
        const rung = new THREE.Mesh(rungGeo, rungMat);
        rung.position.set(0, y, 0);
        rung.rotation.z = Math.PI / 2;
        rung.rotation.y = -angle;
        group.add(rung);
      }
    },

    // 5. Cyber Crystal Geode
    buildCrystal: function() {
      const THREE = window.THREE;
      const group = this.threeData.activeGroup;

      const solidGeo = new THREE.IcosahedronGeometry(1.8, 1);
      const solidMesh = new THREE.Mesh(solidGeo, this.getMaterial(false, 0.85));
      group.add(solidMesh);

      const wireGeo = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.9, 1));
      const wireMat = new THREE.LineBasicMaterial({
        color: this.state.secondaryColor,
        transparent: true,
        opacity: 0.9,
        linewidth: 2
      });
      const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
      wireMesh.name = 'outerCage';
      group.add(wireMesh);
    },

    // 6. Endless Möbius Ribbon
    buildMobius: function() {
      const THREE = window.THREE;
      const group = this.threeData.activeGroup;

      const uSteps = 60, vSteps = 12;
      const geom = new THREE.BufferGeometry();
      const pos = [];
      const R = 1.9, width = 0.85;

      for (let i = 0; i <= uSteps; i++) {
        const u = (i / uSteps) * Math.PI * 2;
        for (let j = 0; j <= vSteps; j++) {
          const v = ((j / vSteps) - 0.5) * width;
          const x = (R + v * Math.cos(u / 2)) * Math.cos(u);
          const y = (R + v * Math.cos(u / 2)) * Math.sin(u);
          const z = v * Math.sin(u / 2);
          pos.push(x, y, z);
        }
      }

      geom.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));

      const indices = [];
      for (let i = 0; i < uSteps; i++) {
        for (let j = 0; j < vSteps; j++) {
          const a = i * (vSteps + 1) + j;
          const b = (i + 1) * (vSteps + 1) + j;
          const c = (i + 1) * (vSteps + 1) + (j + 1);
          const d = i * (vSteps + 1) + (j + 1);
          indices.push(a, b, d);
          indices.push(b, c, d);
        }
      }
      geom.setIndex(indices);
      geom.computeVertexNormals();

      const mat = this.getMaterial(false, 0.9);
      mat.side = THREE.DoubleSide;
      const mesh = new THREE.Mesh(geom, mat);
      group.add(mesh);
    },

    // 7. 4D Hopf Fibration (Interlocking Villarceau Fiber Rings)
    buildHopf: function() {
      const THREE = window.THREE;
      const group = this.threeData.activeGroup;
      this.threeData.hopfRings = [];

      const ringCount = 16;
      for (let k = 0; k < ringCount; k++) {
        const theta = (k / ringCount) * Math.PI;
        const phi = (k / ringCount) * Math.PI * 2;
        const ringRadius = 1.45 + 0.25 * Math.sin(theta);
        const tubeRadius = 0.035;
        const ringGeo = new THREE.TorusGeometry(ringRadius, tubeRadius, 16, 64);
        const col = (k % 2 === 0) ? this.state.primaryColor : this.state.secondaryColor;
        const mat = this.getMaterial(false, 0.85, col);
        const ringMesh = new THREE.Mesh(ringGeo, mat);

        ringMesh.rotation.x = theta;
        ringMesh.rotation.y = phi;
        ringMesh.rotation.z = k * (Math.PI / 8);
        ringMesh.userData = { speed: 0.015 + (k % 4) * 0.005 };

        group.add(ringMesh);
        this.threeData.hopfRings.push(ringMesh);
      }

      const pCount = 200;
      const pGeo = new THREE.BufferGeometry();
      const pPos = [];
      for (let i = 0; i < pCount; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        const p = project4Dto3D([Math.cos(u), Math.sin(u), Math.cos(v), Math.sin(v)], 0.5, 0.5, 0.5, 2.4, this.state.wSlice);
        pPos.push(p.x, p.y, p.z);
      }
      pGeo.setAttribute('position', new THREE.Float32BufferAttribute(pPos, 3));
      const pPts = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: this.state.primaryColor, size: 0.045, transparent: true, opacity: 0.7 }));
      group.add(pPts);
    },

    // 8. Morphing Cyber Fluid Blob
    buildBlob: function() {
      const THREE = window.THREE;
      const group = this.threeData.activeGroup;

      const geo = new THREE.IcosahedronGeometry(1.8, 4);
      const basePos = Float32Array.from(geo.attributes.position.array);
      this.threeData.blobData = {
        geometry: geo,
        basePositions: basePos
      };

      const mat = this.getMaterial(false, 0.9);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.name = 'cyberBlobMesh';
      group.add(mesh);

      const wireMat = new THREE.MeshBasicMaterial({
        color: this.state.secondaryColor,
        wireframe: true,
        transparent: true,
        opacity: 0.25
      });
      const wireMesh = new THREE.Mesh(geo, wireMat);
      wireMesh.name = 'cyberBlobWire';
      group.add(wireMesh);
    },

    // 9. Relativistic Quantum Black Hole
    buildBlackHole: function() {
      const THREE = window.THREE;
      const group = this.threeData.activeGroup;

      const sphereGeo = new THREE.SphereGeometry(1.05, 32, 32);
      const blackMat = new THREE.MeshBasicMaterial({ color: 0x020205 });
      const eventHorizon = new THREE.Mesh(sphereGeo, blackMat);
      eventHorizon.name = 'eventHorizon';
      group.add(eventHorizon);

      const ringGeo = new THREE.RingGeometry(1.08, 1.26, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: this.state.primaryColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9
      });
      const lensingRing = new THREE.Mesh(ringGeo, ringMat);
      lensingRing.name = 'lensingRing';
      group.add(lensingRing);

      // Accretion disk solid geometry ring (exported to 3D OBJ with solid faces)
      const diskRingGeo = new THREE.RingGeometry(1.35, 3.8, 64, 4);
      const diskRingMat = new THREE.MeshStandardMaterial({
        color: this.state.primaryColor,
        emissive: '#f59e0b',
        emissiveIntensity: 0.8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
      });
      const diskRing = new THREE.Mesh(diskRingGeo, diskRingMat);
      diskRing.name = 'accretionDiskSurface';
      group.add(diskRing);

      const diskCount = 750;
      const diskGeo = new THREE.BufferGeometry();
      const diskPos = [];
      const diskColors = [];
      const pCol1 = new THREE.Color(this.state.primaryColor);
      const pCol2 = new THREE.Color('#f59e0b');
      const diskMeta = [];

      for (let i = 0; i < diskCount; i++) {
        const r = 1.35 + Math.pow(Math.random(), 1.5) * 2.8;
        const angle = Math.random() * Math.PI * 2;
        const speed = (2.2 / Math.sqrt(r)) * (0.8 + Math.random() * 0.4);
        const yOff = (Math.random() - 0.5) * 0.12 * (r / 2);
        diskPos.push(r * Math.cos(angle), yOff, r * Math.sin(angle));
        diskMeta.push({ r, angle, speed, yOff });

        const c = pCol1.clone().lerp(pCol2, Math.random() * 0.8);
        diskColors.push(c.r, c.g, c.b);
      }

      diskGeo.setAttribute('position', new THREE.Float32BufferAttribute(diskPos, 3));
      diskGeo.setAttribute('color', new THREE.Float32BufferAttribute(diskColors, 3));

      const diskMat = new THREE.PointsMaterial({
        size: 0.065,
        vertexColors: true,
        transparent: true,
        opacity: 0.85
      });
      const accretionDisk = new THREE.Points(diskGeo, diskMat);
      accretionDisk.name = 'accretionDisk';
      group.add(accretionDisk);
      this.threeData.blackHoleDisk = { mesh: accretionDisk, meta: diskMeta };

      const jetGeo = new THREE.CylinderGeometry(0.04, 0.28, 4.2, 16, 1, true);
      const jetMat = new THREE.MeshStandardMaterial({
        color: this.state.secondaryColor,
        emissive: this.state.primaryColor,
        emissiveIntensity: 2.0,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
      });
      const jetTop = new THREE.Mesh(jetGeo, jetMat);
      jetTop.position.y = 2.2;
      jetTop.name = 'jetTop';
      const jetBottom = new THREE.Mesh(jetGeo, jetMat);
      jetBottom.position.y = -2.2;
      jetBottom.rotation.z = Math.PI;
      jetBottom.name = 'jetBottom';

      group.add(jetTop);
      group.add(jetBottom);
    },

    // 10. Kinetic Fibonacci Phyllotaxis Lotus
    buildLotus: function() {
      const THREE = window.THREE;
      const group = this.threeData.activeGroup;
      this.threeData.lotusPetals = [];

      const petalCount = 42;
      const goldenAngle = 2.399963;

      const petalGeo = new THREE.ConeGeometry(0.24, 1.2, 5);
      petalGeo.scale(1.0, 1.0, 0.22);
      petalGeo.translate(0, 0.6, 0);

      for (let i = 0; i < petalCount; i++) {
        const angle = i * goldenAngle;
        const progress = i / petalCount;
        const radius = 0.25 + Math.sqrt(progress) * 1.55;
        const y = progress * 0.6 - 0.3;

        const petalMat = this.getMaterial(
          false,
          0.88,
          (i % 2 === 0) ? this.state.primaryColor : this.state.secondaryColor
        );
        const petal = new THREE.Mesh(petalGeo, petalMat);

        petal.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
        petal.rotation.y = -angle - Math.PI / 2;
        const baseTilt = 0.35 + progress * 0.85;
        petal.rotation.z = baseTilt;
        petal.userData = { baseTilt, index: i };

        group.add(petal);
        this.threeData.lotusPetals.push(petal);
      }

      const coreGeo = new THREE.SphereGeometry(0.32, 16, 16);
      const coreMat = new THREE.MeshStandardMaterial({
        color: '#f59e0b',
        emissive: '#f59e0b',
        emissiveIntensity: 0.8
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      coreMesh.position.y = -0.25;
      group.add(coreMesh);
    },

    // 11. 4D 24-Cell Octaplex Hyper-Diamond
    buildOctaplex: function() {
      const THREE = window.THREE;
      const group = this.threeData.activeGroup;

      const nodeMat = new THREE.MeshStandardMaterial({
        color: this.state.secondaryColor,
        emissive: this.state.primaryColor,
        emissiveIntensity: 1.0,
        roughness: 0.15
      });

      this.threeData.octaplexNodes = [];
      for (let i = 0; i < 24; i++) {
        const sphereGeo = new THREE.SphereGeometry(0.09, 16, 16);
        const mesh = new THREE.Mesh(sphereGeo, nodeMat);
        group.add(mesh);
        this.threeData.octaplexNodes.push(mesh);
      }

      this.threeData.octaplexLines = [];
      const lineMat = new THREE.LineBasicMaterial({
        color: this.state.secondaryColor,
        transparent: true,
        opacity: 0.8,
        linewidth: 1.5
      });

      for (let i = 0; i < OCTAPLEX_EDGES_4D.length; i++) {
        const [a, b] = OCTAPLEX_EDGES_4D[i];
        const lineGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(6);
        lineGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const line = new THREE.Line(lineGeo, lineMat);
        group.add(line);
        this.threeData.octaplexLines.push({ line, a, b });
      }
    },

    // 12. Living Bionic Neural Synapse Network
    buildNeural: function() {
      const THREE = window.THREE;
      const group = this.threeData.activeGroup;

      const nodeCount = 28;
      const nodes = [];
      const nodeGeo = new THREE.SphereGeometry(0.11, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: this.state.primaryColor,
        emissive: this.state.primaryColor,
        emissiveIntensity: 0.7,
        roughness: 0.2
      });

      for (let i = 0; i < nodeCount; i++) {
        const side = (i % 2 === 0) ? 1 : -1;
        const phi = Math.random() * Math.PI * 2;
        const theta = Math.random() * Math.PI;
        const r = 1.0 + Math.random() * 1.3;
        const x = side * (0.5 + Math.abs(Math.sin(theta) * Math.cos(phi) * r));
        const y = Math.cos(theta) * r * 0.8;
        const z = Math.sin(theta) * Math.sin(phi) * r;

        const mesh = new THREE.Mesh(nodeGeo, nodeMat.clone());
        mesh.position.set(x, y, z);
        mesh.userData = { baseEmissive: 0.7 };
        group.add(mesh);
        nodes.push({ mesh, x, y, z });
      }

      const edges = [];
      const lineMat = new THREE.LineBasicMaterial({
        color: this.state.primaryColor,
        transparent: true,
        opacity: 0.45
      });

      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dz = nodes[i].z - nodes[j].z;
          const dist = Math.hypot(dx, dy, dz);
          if (dist < 1.75) {
            const lineGeo = new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(nodes[i].x, nodes[i].y, nodes[i].z),
              new THREE.Vector3(nodes[j].x, nodes[j].y, nodes[j].z)
            ]);
            const line = new THREE.Line(lineGeo, lineMat);
            group.add(line);
            edges.push({ a: i, b: j, dist });
          }
        }
      }

      const pulseCount = 18;
      const pulseGeo = new THREE.SphereGeometry(0.045, 8, 8);
      const pulseMat = new THREE.MeshBasicMaterial({ color: '#ffffff' });
      const pulses = [];

      for (let i = 0; i < pulseCount; i++) {
        const edge = edges[Math.floor(Math.random() * edges.length)];
        const pMesh = new THREE.Mesh(pulseGeo, pulseMat);
        group.add(pMesh);
        pulses.push({
          mesh: pMesh,
          edge: edge,
          progress: Math.random(),
          speed: 0.015 + Math.random() * 0.02
        });
      }

      this.threeData.neuralData = { nodes, edges, pulses };
    },

    // 13. 4D Klein Bottle (True 4D Immersion stereographically projected into 3D)
    buildKleinBottle: function() {
      const THREE = window.THREE;
      const group = this.threeData.activeGroup;

      const uSteps = 48, vSteps = 24;
      const geom = new THREE.BufferGeometry();
      const pos = [];
      const R = 1.8, r = 0.75;

      for (let i = 0; i <= uSteps; i++) {
        const u = (i / uSteps) * Math.PI * 2;
        for (let j = 0; j <= vSteps; j++) {
          const v = (j / vSteps) * Math.PI * 2;
          const x4 = (R + r * Math.cos(v)) * Math.cos(u);
          const y4 = (R + r * Math.cos(v)) * Math.sin(u);
          const z4 = r * Math.sin(v) * Math.cos(u / 2);
          const w4 = r * Math.sin(v) * Math.sin(u / 2);

          const p = project4Dto3D([x4, y4, z4, w4], 0.4, 0.4, 0.4, 2.6, this.state.wSlice);
          pos.push(p.x * 0.75, p.y * 0.75, p.z * 0.75);
        }
      }

      geom.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));

      const indices = [];
      for (let i = 0; i < uSteps; i++) {
        for (let j = 0; j < vSteps; j++) {
          const a = i * (vSteps + 1) + j;
          const b = (i + 1) * (vSteps + 1) + j;
          const c = (i + 1) * (vSteps + 1) + (j + 1);
          const d = i * (vSteps + 1) + (j + 1);
          indices.push(a, b, d);
          indices.push(b, c, d);
        }
      }
      geom.setIndex(indices);
      geom.computeVertexNormals();

      const mat = this.getMaterial(false, 0.88);
      mat.side = THREE.DoubleSide;
      const mesh = new THREE.Mesh(geom, mat);
      mesh.name = 'kleinMesh';
      group.add(mesh);
    },

    // 14. 6D Calabi-Yau Quintic String Theory Cross-Section
    buildCalabiYau: function() {
      const THREE = window.THREE;
      const group = this.threeData.activeGroup;

      const n = 5;
      const uSteps = 32, vSteps = 16;
      const geom = new THREE.BufferGeometry();
      const pos = [];
      const indices = [];

      let vertCount = 0;
      for (let k = 0; k < n; k++) {
        const alpha = (k / n) * Math.PI * 2;
        const sheetStart = vertCount;

        for (let i = 0; i <= uSteps; i++) {
          const u = (i / uSteps) * Math.PI * 2 - Math.PI;
          for (let j = 0; j <= vSteps; j++) {
            const v = (j / vSteps) * Math.PI - Math.PI / 2;
            const x = 1.7 * (Math.cos(u)*Math.cos(v)*Math.cos(alpha) - Math.sin(u)*Math.sin(v)*Math.sin(alpha)) * Math.cos(2*u/5);
            const y = 1.7 * (Math.cos(u)*Math.cos(v)*Math.sin(alpha) + Math.sin(u)*Math.sin(v)*Math.cos(alpha)) * Math.sin(2*u/5);
            const z = 1.7 * Math.sin(u)*Math.cos(v) * Math.cos(3*v/5);
            pos.push(x, y, z);
            vertCount++;
          }
        }

        for (let i = 0; i < uSteps; i++) {
          for (let j = 0; j < vSteps; j++) {
            const a = sheetStart + i * (vSteps + 1) + j;
            const b = sheetStart + (i + 1) * (vSteps + 1) + j;
            const c = sheetStart + (i + 1) * (vSteps + 1) + (j + 1);
            const d = sheetStart + i * (vSteps + 1) + (j + 1);
            indices.push(a, b, d);
            indices.push(b, c, d);
          }
        }
      }

      geom.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      geom.setIndex(indices);
      geom.computeVertexNormals();

      const mat = this.getMaterial(false, 0.82);
      mat.side = THREE.DoubleSide;
      const mesh = new THREE.Mesh(geom, mat);
      mesh.name = 'calabiMesh';
      group.add(mesh);
    },

    // 15. Lorenz Chaotic Strange Attractor
    buildLorenzAttractor: function() {
      const THREE = window.THREE;
      const group = this.threeData.activeGroup;

      let x = 0.1, y = 0, z = 0;
      const sigma = 10, rho = 28, beta = 8/3;
      const dt = 0.007;
      const stepCount = 2400;
      const pos = [];
      const colors = [];

      const col1 = new THREE.Color(this.state.primaryColor);
      const col2 = new THREE.Color(this.state.secondaryColor);

      for (let i = 0; i < stepCount; i++) {
        const dx = sigma * (y - x);
        const dy = x * (rho - z) - y;
        const dz = x * y - beta * z;
        x += dx * dt;
        y += dy * dt;
        z += dz * dt;

        pos.push(x * 0.08, (z - 25) * 0.08, y * 0.08);

        const c = col1.clone().lerp(col2, (i / stepCount));
        colors.push(c.r, c.g, c.b);
      }

      const geom = new THREE.BufferGeometry();
      geom.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      geom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

      const lineMat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        linewidth: 2
      });
      const attractorLine = new THREE.Line(geom, lineMat);
      attractorLine.name = 'lorenzLine';
      group.add(attractorLine);

      // Soliton photon tracer
      const sGeo = new THREE.SphereGeometry(0.08, 16, 16);
      const sMat = new THREE.MeshStandardMaterial({
        color: '#ffffff',
        emissive: this.state.primaryColor,
        emissiveIntensity: 2.5
      });
      const tracer = new THREE.Mesh(sGeo, sMat);
      tracer.name = 'lorenzTracer';
      group.add(tracer);

      this.threeData.lorenzData = { positions: pos, step: 0, count: stepCount, tracer };
    },

    startLoop: function() {
      if (this.state.animating) return;
      this.state.animating = true;

      const render = () => {
        if (!this.state.animating) return;
        this.threeData.animId = requestAnimationFrame(render);
        this.updateAnimation();
      };
      render();
    },

    pauseLoop: function() {
      this.state.animating = false;
      if (this.threeData.animId) {
        cancelAnimationFrame(this.threeData.animId);
        this.threeData.animId = null;
      }
    },

    updateAnimation: function() {
      const { renderer, scene, camera, activeGroup, orbit, tesseractNodes, tesseractLines } = this.threeData;
      if (!renderer || !scene || !camera || !activeGroup) return;

      const time = performance.now() * 0.001;

      // 🌀 Continuous Auto-Morphing Cycle
      if (this.state.morphAutoCycle) {
        const cycleProgress = (Math.sin(time * 0.6) + 1.0) * 0.5;
        this.state.morphProgress = cycleProgress;
        const slider = document.getElementById('hyper3d-slider-morph');
        if (slider) slider.value = cycleProgress;
        const lbl = document.getElementById('hyper3d-val-morph');
        if (lbl) lbl.textContent = Math.round(cycleProgress * 100) + '%';
        if (cycleProgress < 0.02 && !this._morphTargetShiftLock) {
          this._morphTargetShiftLock = true;
          const modelKeys = Object.keys(this.modelsMeta);
          const nextIdx = (modelKeys.indexOf(this.state.morphTarget) + 1) % modelKeys.length;
          this.state.morphTarget = modelKeys[nextIdx];
        } else if (cycleProgress > 0.05) {
          this._morphTargetShiftLock = false;
        }
      }

      // 🌌 GPU Cosmic Stardust Particles Motion
      if (this.state.stardustActive) {
        this.updateStardust(time);
      }

      // 🎹 Generative Geometry Audio Synth Modulation
      if (this.state.spatialSynthActive) {
        this.updateSpatialSynth(time);
      }
      const rotSpd = this.state.rotSpeed * 0.008;
      const hyperSpd = this.state.hyperSpeed * 0.015;

      // 🎬 Director Flight Cam Engine
      const camMode = this.state.camMode;
      if (camMode === 'flyby') {
        const t = time * 0.7;
        camera.position.x = Math.sin(t) * 5.2;
        camera.position.y = Math.cos(t * 0.6) * 3.4;
        camera.position.z = Math.cos(t) * 5.2 + Math.sin(t * 1.5) * 1.6;
        camera.lookAt(Math.sin(t * 0.5) * 0.4, 0, Math.cos(t * 0.5) * 0.4);
      } else if (camMode === 'matrix') {
        const t = time * 0.3;
        camera.position.x = Math.cos(t) * 6.8;
        camera.position.y = Math.sin(time * 0.7) * 2.0 + 0.8;
        camera.position.z = Math.sin(t) * 6.8;
        camera.lookAt(0, 0.1, 0);
      } else if (camMode === 'spiral') {
        const t = time * 0.5;
        const rad = 4.2 + Math.sin(t * 0.5) * 2.2;
        camera.position.x = Math.cos(t * 2) * rad;
        camera.position.y = Math.sin(t * 1.2) * 2.6;
        camera.position.z = Math.sin(t * 2) * rad;
        camera.lookAt(0, 0, 0);
      } else {
        // Orbit mode
        if (!orbit.isDragging) {
          orbit.rotY += rotSpd;
        }
        camera.position.x = orbit.distance * Math.sin(orbit.rotY) * Math.cos(orbit.rotX);
        camera.position.y = orbit.distance * Math.sin(orbit.rotX);
        camera.position.z = orbit.distance * Math.cos(orbit.rotY) * Math.cos(orbit.rotX);
        camera.lookAt(0, 0, 0);
      }

      // 🧲 Magnetic Cursor Warp
      if (this.state.cursorWarp && this.threeData.cursorPos) {
        const targetRotX = this.threeData.cursorPos.y * 0.45;
        const targetRotY = this.threeData.cursorPos.x * 0.45;
        activeGroup.rotation.x += (targetRotX - activeGroup.rotation.x) * 0.08;
        activeGroup.rotation.z += (targetRotY * 0.4 - activeGroup.rotation.z) * 0.08;
      }

      // 🎵 Audio-Reactive Pulse
      let audioScale = 1.0;
      if (this.state.audioReactive) {
        const beat = Math.pow(Math.sin(time * 6.702), 10) * 0.18 + Math.pow(Math.sin(time * 3.351), 16) * 0.28;
        audioScale = 1.0 + beat;
      }

      // 💥 Quantum Shatter & 4D Hypersurface Slicing Engine
      this.applyDeformation();

      activeGroup.scale.set(audioScale, audioScale, audioScale);

      // Model-specific procedural animation
      const m = this.state.activeModel;

      if (m === 'tesseract') {
        this.state.thetaXW += hyperSpd;
        this.state.thetaYW += hyperSpd * 0.7;
        this.state.thetaZW += hyperSpd * 0.4;

        const projected = [];
        for (let i = 0; i < 16; i++) {
          let p = project4Dto3D(TESSERACT_VERTICES_4D[i], this.state.thetaXW, this.state.thetaYW, this.state.thetaZW, 2.5, this.state.wSlice);
          if (this.state.morphProgress > 0.001) {
            const tp = this._getParametricPoint(this.state.morphTarget, i / 15, i);
            const mp = this.state.morphProgress;
            p = { x: p.x * (1 - mp) + tp.x * mp, y: p.y * (1 - mp) + tp.y * mp, z: p.z * (1 - mp) + tp.z * mp };
          }
          if (this.state.realDeform > 0.001) {
            const rd = this.state.realDeform, rm = this.state.realDeformMode;
            if (rm === 'twist') {
              const th = p.y * (rd * 1.25), c = Math.cos(th), s = Math.sin(th);
              p = { x: p.x * c - p.z * s, y: p.y, z: p.x * s + p.z * c };
            } else if (rm === 'wave') {
              p.y += Math.sin(Math.hypot(p.x, p.z) * 3.5) * (rd * 0.55);
            } else if (rm === 'pinch') {
              const f = Math.max(0.1, 1.0 - (1.0 / (1.0 + p.y * p.y * 1.5)) * (rd * 0.65));
              p.x *= f; p.z *= f;
            } else {
              const th = p.y * (rd * 0.9), c = Math.cos(th), s = Math.sin(th);
              p = { x: p.x * c - p.z * s, y: p.y + Math.cos(p.x * 2.0) * (rd * 0.25), z: p.x * s + p.z * c };
            }
          }
          if (this.state.explode > 0.001) {
            const l = Math.hypot(p.x, p.y, p.z) || 1;
            p.x += (p.x / l) * (this.state.explode * 1.3);
            p.y += (p.y / l) * (this.state.explode * 1.3);
            p.z += (p.z / l) * (this.state.explode * 1.3);
          }
          projected.push(p);
          if (tesseractNodes[i]) {
            tesseractNodes[i].position.set(p.x, p.y, p.z);
          }
        }

        for (let i = 0; i < tesseractLines.length; i++) {
          const { line, a, b } = tesseractLines[i];
          const pos = line.geometry.attributes.position.array;
          const pA = projected[a], pB = projected[b];
          pos[0] = pA.x; pos[1] = pA.y; pos[2] = pA.z;
          pos[3] = pB.x; pos[4] = pB.y; pos[5] = pB.z;
          line.geometry.attributes.position.needsUpdate = true;
        }
      } else if (m === 'gyroscope') {
        const r1 = activeGroup.getObjectByName('ring1');
        const r2 = activeGroup.getObjectByName('ring2');
        const r3 = activeGroup.getObjectByName('ring3');
        const core = activeGroup.getObjectByName('plasmaCore');
        const cloud = activeGroup.getObjectByName('orbitalCloud');

        if (r1) r1.rotation.z += 0.02 * this.state.rotSpeed;
        if (r2) r2.rotation.y += 0.028 * this.state.rotSpeed;
        if (r3) r3.rotation.x += 0.035 * this.state.rotSpeed;
        if (core) {
          const pulse = 1.0 + Math.sin(time * 5) * 0.12;
          core.scale.set(pulse, pulse, pulse);
        }
        if (cloud) {
          cloud.rotation.y -= 0.015 * this.state.rotSpeed;
          cloud.rotation.x += 0.008 * this.state.rotSpeed;
        }
      } else if (m === 'dna') {
        activeGroup.rotation.y += 0.012 * this.state.rotSpeed;
      } else if (m === 'crystal') {
        activeGroup.rotation.y += 0.015 * this.state.rotSpeed;
        activeGroup.rotation.x = Math.sin(time * 0.8) * 0.3;
        const cage = activeGroup.getObjectByName('outerCage');
        if (cage) cage.rotation.y -= 0.018 * this.state.rotSpeed;
      } else if (m === 'mobius') {
        activeGroup.rotation.z += 0.01 * this.state.rotSpeed;
        activeGroup.rotation.x += 0.007 * this.state.rotSpeed;
      } else if (m === 'clifford') {
        activeGroup.rotation.y += 0.015 * this.state.rotSpeed;
        activeGroup.rotation.x = Math.cos(time * 0.6) * 0.2;
      } else if (m === 'hopf') {
        activeGroup.rotation.y += 0.008 * this.state.rotSpeed;
        const rings = this.threeData.hopfRings || [];
        for (let i = 0; i < rings.length; i++) {
          const r = rings[i];
          r.rotation.z += r.userData.speed * this.state.rotSpeed;
        }
      } else if (m === 'blob' && this.threeData.blobData) {
        const { geometry, basePositions } = this.threeData.blobData;
        const pos = geometry.attributes.position;
        const arr = pos.array;
        const t = time * 2.2;
        for (let i = 0; i < pos.count; i++) {
          const bx = basePositions[i * 3];
          const by = basePositions[i * 3 + 1];
          const bz = basePositions[i * 3 + 2];
          const w1 = Math.sin(bx * 2.0 + t) * Math.cos(by * 1.8 + t * 0.8);
          const w2 = Math.sin(bz * 2.2 + t * 1.2) * Math.cos(bx * 1.6 - t * 0.6);
          const disp = 1.0 + (w1 + w2) * 0.22 + exp * 0.3;
          arr[i * 3] = bx * disp;
          arr[i * 3 + 1] = by * disp;
          arr[i * 3 + 2] = bz * disp;
        }
        pos.needsUpdate = true;
        geometry.computeVertexNormals();
        activeGroup.rotation.y += 0.008 * this.state.rotSpeed;
      } else if (m === 'blackhole') {
        activeGroup.rotation.x = 0.45;
        activeGroup.rotation.y += 0.005 * this.state.rotSpeed;
        if (this.threeData.blackHoleDisk) {
          const { mesh, meta } = this.threeData.blackHoleDisk;
          const pos = mesh.geometry.attributes.position.array;
          for (let i = 0; i < meta.length; i++) {
            const item = meta[i];
            item.angle += item.speed * 0.012 * this.state.rotSpeed;
            pos[i * 3] = item.r * Math.cos(item.angle);
            pos[i * 3 + 1] = item.yOff + Math.sin(time * 3 + item.r) * 0.03;
            pos[i * 3 + 2] = item.r * Math.sin(item.angle);
          }
          mesh.geometry.attributes.position.needsUpdate = true;
        }
        const lens = activeGroup.getObjectByName('lensingRing');
        if (lens) {
          const sc = 1.0 + Math.sin(time * 4) * 0.04;
          lens.scale.set(sc, sc, sc);
          lens.lookAt(camera.position);
        }
      } else if (m === 'lotus') {
        activeGroup.rotation.y += 0.01 * this.state.rotSpeed;
        const petals = this.threeData.lotusPetals || [];
        for (let i = 0; i < petals.length; i++) {
          const p = petals[i];
          const breathe = Math.sin(time * 2.2 + p.userData.index * 0.14) * 0.22;
          p.rotation.z = p.userData.baseTilt + breathe + exp * 0.4;
        }
      } else if (m === 'octaplex') {
        this.state.thetaXW += hyperSpd;
        this.state.thetaYW += hyperSpd * 0.8;
        this.state.thetaZW += hyperSpd * 0.5;

        const projected = [];
        for (let i = 0; i < 24; i++) {
          const p = project4Dto3D(OCTAPLEX_VERTICES_4D[i], this.state.thetaXW, this.state.thetaYW, this.state.thetaZW, 3.2, this.state.wSlice);
          projected.push(p);
          if (this.threeData.octaplexNodes && this.threeData.octaplexNodes[i]) {
            this.threeData.octaplexNodes[i].position.set(p.x, p.y, p.z);
          }
        }

        const lines = this.threeData.octaplexLines || [];
        for (let i = 0; i < lines.length; i++) {
          const { line, a, b } = lines[i];
          const pos = line.geometry.attributes.position.array;
          const pA = projected[a], pB = projected[b];
          pos[0] = pA.x; pos[1] = pA.y; pos[2] = pA.z;
          pos[3] = pB.x; pos[4] = pB.y; pos[5] = pB.z;
          line.geometry.attributes.position.needsUpdate = true;
        }
        activeGroup.rotation.y += 0.005 * this.state.rotSpeed;
      } else if (m === 'neural' && this.threeData.neuralData) {
        activeGroup.rotation.y += 0.008 * this.state.rotSpeed;
        const { nodes, edges, pulses } = this.threeData.neuralData;
        for (let i = 0; i < pulses.length; i++) {
          const p = pulses[i];
          p.progress += p.speed * this.state.rotSpeed;
          if (p.progress >= 1.0) {
            p.progress = 0;
            const destNode = nodes[p.edge.b];
            if (destNode && destNode.mesh.material) {
              destNode.mesh.material.emissiveIntensity = 2.4;
            }
            const nextEdges = edges.filter(e => e.a === p.edge.b || e.b === p.edge.b);
            if (nextEdges.length > 0) {
              p.edge = nextEdges[Math.floor(Math.random() * nextEdges.length)];
            }
          }
          const nA = nodes[p.edge.a], nB = nodes[p.edge.b];
          if (nA && nB) {
            p.mesh.position.lerpVectors(nA.mesh.position, nB.mesh.position, p.progress);
          }
        }

        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          if (n.mesh.material && n.mesh.material.emissiveIntensity > 0.7) {
            n.mesh.material.emissiveIntensity = Math.max(0.7, n.mesh.material.emissiveIntensity - 0.04);
          }
        }
      } else if (m === 'klein') {
        activeGroup.rotation.y += 0.012 * this.state.rotSpeed;
        activeGroup.rotation.x = Math.sin(time * 0.5) * 0.25;
      } else if (m === 'calabi') {
        activeGroup.rotation.y += 0.008 * this.state.rotSpeed;
        activeGroup.rotation.z += 0.006 * this.state.rotSpeed;
      } else if (m === 'lorenz' && this.threeData.lorenzData) {
        activeGroup.rotation.y += 0.01 * this.state.rotSpeed;
        const ld = this.threeData.lorenzData;
        ld.step = (ld.step + 3) % ld.count;
        if (ld.tracer) {
          ld.tracer.position.set(
            ld.positions[ld.step * 3],
            ld.positions[ld.step * 3 + 1],
            ld.positions[ld.step * 3 + 2]
          );
        }
      }

      renderer.render(scene, camera);
    },

    setModel: function(modelKey) {
      if (!this.modelsMeta[modelKey]) return;
      this.state.activeModel = modelKey;
      _sound('click');
      this.buildCurrentModel();
      this.updateUi();
    },

    setMaterial: function(matKey) {
      this.state.activeMaterial = matKey;
      _sound('click');
      this.buildCurrentModel();
      this.updateUi();
    },

    setRotSpeed: function(val) {
      this.state.rotSpeed = parseFloat(val);
      const lbl = document.getElementById('hyper3d-val-rot');
      if (lbl) lbl.textContent = parseFloat(val).toFixed(1) + 'x';
    },

    setHyperSpeed: function(val) {
      this.state.hyperSpeed = parseFloat(val);
      const lbl = document.getElementById('hyper3d-val-hyper');
      if (lbl) lbl.textContent = parseFloat(val).toFixed(1) + 'x';
    },

    setExplode: function(val) {
      this.state.explode = parseFloat(val);
      const lbl = document.getElementById('hyper3d-val-explode');
      if (lbl) lbl.textContent = Math.round(parseFloat(val) * 40) + '%';
      this.applyDeformation();
    },

    setRealDeform: function(val) {
      this.state.realDeform = parseFloat(val);
      const lbl = document.getElementById('hyper3d-val-realdeform');
      if (lbl) lbl.textContent = Math.round(parseFloat(val) * 50) + '%';
      this.applyDeformation();
    },

    setRealDeformMode: function(mode) {
      this.state.realDeformMode = mode;
      _sound('click');
      this.updateUi();
      this.applyDeformation();
    },

    setWSlice: function(val) {
      this.state.wSlice = parseFloat(val);
      const lbl = document.getElementById('hyper3d-val-wslice');
      if (lbl) lbl.textContent = (parseFloat(val) >= 0 ? '+' : '') + parseFloat(val).toFixed(1);
      this.applyDeformation();
    },

    setCamMode: function(mode) {
      this.state.camMode = mode;
      _sound('click');
      this.updateUi();
    },

    toggleFxScanlines: function() {
      this.state.fxScanlines = !this.state.fxScanlines;
      _sound('click');
      const container = document.getElementById('hyper3d-canvas-container');
      let overlay = document.getElementById('hyper3d-scanlines-overlay');
      if (this.state.fxScanlines) {
        if (!overlay && container) {
          overlay = document.createElement('div');
          overlay.id = 'hyper3d-scanlines-overlay';
          overlay.style.cssText = 'position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(0deg,rgba(0,0,0,0.22),rgba(0,0,0,0.22) 2px,transparent 2px,transparent 4px);z-index:5';
          container.appendChild(overlay);
        }
      } else {
        if (overlay) overlay.remove();
      }
      this.updateUi();
    },

    toggleFxChromatic: function() {
      this.state.fxChromatic = !this.state.fxChromatic;
      _sound('click');
      const container = document.getElementById('hyper3d-canvas-container');
      if (container) {
        container.style.filter = this.state.fxChromatic ? 'drop-shadow(-2px 0 0 rgba(236,72,153,0.5)) drop-shadow(2px 0 0 rgba(56,189,248,0.5))' : 'none';
      }
      this.updateUi();
    },

    toggleFxBloom: function() {
      this.state.fxBloom = !this.state.fxBloom;
      _sound('click');
      const { scene } = this.threeData;
      if (scene) {
        scene.traverse(child => {
          if (child.isPointLight) {
            child.intensity = this.state.fxBloom ? 3.5 : 1.5;
          }
        });
      }
      this.updateUi();
    },

    toggleWireframe: function() {
      this.state.wireframe = !this.state.wireframe;
      _sound('click');
      this.buildCurrentModel();
      this.updateUi();
    },

    toggleAudioPulse: function() {
      this.state.audioReactive = !this.state.audioReactive;
      _sound('click');
      const isFr = _isFr();
      this.updateUi();
      _toast(this.state.audioReactive
        ? (isFr ? '🎵 Pulsation Audio-Réactive activée (128 BPM Sub-Bass) !' : '🎵 Audio-Reactive Pulse activated (128 BPM Sub-Bass)!')
        : (isFr ? 'Audio-Réactif désactivé.' : 'Audio-Reactive disabled.')
      );
    },

    toggleCursorWarp: function() {
      this.state.cursorWarp = !this.state.cursorWarp;
      _sound('click');
      const isFr = _isFr();
      this.updateUi();
      _toast(this.state.cursorWarp
        ? (isFr ? '🧲 Déformation Curseur Magnétique activée !' : '🧲 Magnetic Cursor Warp activated!')
        : (isFr ? 'Déformation Curseur désactivée.' : 'Magnetic Cursor Warp disabled.')
      );
    },

    toggleVoiceControl: function() {
      const isFr = _isFr();
      const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!Speech) {
        _toast(isFr ? 'Reconnaissance vocale non supportée par votre navigateur.' : 'Speech recognition not supported in this browser.', 'warning');
        return;
      }

      if (this.state.isVoiceActive) {
        if (this.threeData.recognition) {
          try { this.threeData.recognition.stop(); } catch(e){}
        }
        this.state.isVoiceActive = false;
        this.updateUi();
        _toast(isFr ? '🎙️ Contrôle vocal désactivé.' : '🎙️ Voice control stopped.');
        return;
      }

      const rec = new Speech();
      rec.continuous = true;
      rec.interimResults = false;
      rec.lang = isFr ? 'fr-FR' : 'en-US';

      rec.onstart = () => {
        this.state.isVoiceActive = true;
        this.updateUi();
        _toast(isFr ? '🎙️ Écoute vocale active... Dites le nom d\'un modèle ou matériau !' : '🎙️ Voice sculpting listening... Say a model or material name!');
      };

      rec.onresult = (event) => {
        const last = event.results.length - 1;
        const text = event.results[last][0].transcript.toLowerCase().trim();
        console.log('[VoiceSculptor Heard]', text);

        // Command matching
        if (text.includes('stardust') || text.includes('etoile') || text.includes('étoile')) this.toggleStardust();
        else if (text.includes('synth') || text.includes('son') || text.includes('sound')) this.toggleSpatialSynth();
        else if (text.includes('morph') || text.includes('forme')) this.toggleMorphAutoCycle();
        else if (text.includes('record') || text.includes('enregistre') || text.includes('video')) this.recordWebM();
        else if (text.includes('glb')) this.exportGLB();
        else if (text.includes('twist') || text.includes('torsion')) this.setRealDeformMode('twist');
        else if (text.includes('wave') || text.includes('onde')) this.setRealDeformMode('wave');
        else if (text.includes('pinch') || text.includes('pincement')) this.setRealDeformMode('pinch');
        else if (text.includes('vortex')) this.setRealDeformMode('vortex');
        else if (text.includes('deform') || text.includes('déforme')) {
          this.setRealDeform(1.4);
          const sld = document.getElementById('hyper3d-slider-realdeform');
          if (sld) sld.value = 1.4;
        } else if (text.includes('tesseract')) this.setModel('tesseract');
        else if (text.includes('torus') || text.includes('tore')) this.setModel('clifford');
        else if (text.includes('gyroscope')) this.setModel('gyroscope');
        else if (text.includes('dna') || text.includes('adn')) this.setModel('dna');
        else if (text.includes('crystal') || text.includes('cristal')) this.setModel('crystal');
        else if (text.includes('mobius') || text.includes('ruban')) this.setModel('mobius');
        else if (text.includes('hopf')) this.setModel('hopf');
        else if (text.includes('blob') || text.includes('fluide')) this.setModel('blob');
        else if (text.includes('black hole') || text.includes('trou noir')) this.setModel('blackhole');
        else if (text.includes('lotus')) this.setModel('lotus');
        else if (text.includes('octaplex')) this.setModel('octaplex');
        else if (text.includes('neural') || text.includes('synapse')) this.setModel('neural');
        else if (text.includes('klein')) this.setModel('klein');
        else if (text.includes('calabi')) this.setModel('calabi');
        else if (text.includes('lorenz')) this.setModel('lorenz');
        else if (text.includes('gold') || text.includes('or')) this.setMaterial('gold');
        else if (text.includes('glass') || text.includes('verre')) this.setMaterial('glass');
        else if (text.includes('hologram') || text.includes('hologramme')) this.setMaterial('hologram');
        else if (text.includes('points') || text.includes('point cloud')) this.setMaterial('points');
        else if (text.includes('wireframe') || text.includes('fil de fer')) this.toggleWireframe();
        else if (text.includes('explode') || text.includes('explose')) {
          this.setExplode(1.8);
          const sld = document.getElementById('hyper3d-slider-explode');
          if (sld) sld.value = 1.8;
        } else if (text.includes('reassemble') || text.includes('rassemble')) {
          this.setExplode(0.0);
          const sld = document.getElementById('hyper3d-slider-explode');
          if (sld) sld.value = 0.0;
        } else if (text.includes('flyby')) this.setCamMode('flyby');
        else if (text.includes('matrix')) this.setCamMode('matrix');
        else if (text.includes('spiral')) this.setCamMode('spiral');
        else if (text.includes('orbit')) this.setCamMode('orbit');
        else if (text.includes('audio')) this.toggleAudioPulse();
        else if (text.includes('warp')) this.toggleCursorWarp();

        _sound('click');
        _toast((isFr ? '🎙️ Reconnu : "' : '🎙️ Heard: "') + text + '"', 'info');
      };

      rec.onerror = (e) => {
        console.error('[VoiceSculptor Error]', e);
        this.state.isVoiceActive = false;
        this.updateUi();
      };

      rec.onend = () => {
        if (this.state.isVoiceActive) {
          try { rec.start(); } catch(e){}
        }
      };

      try {
        rec.start();
        this.threeData.recognition = rec;
      } catch(e) {
        console.error(e);
      }
    },

    setPrimaryColor: function(hex) {
      this.state.primaryColor = hex;
      this.buildCurrentModel();
    },

    setSecondaryColor: function(hex) {
      this.state.secondaryColor = hex;
      this.buildCurrentModel();
    },

    updateUi: function() {
      const isFr = _isFr();
      const meta = this.modelsMeta[this.state.activeModel];

      document.querySelectorAll('.hyper3d-model-btn').forEach(btn => {
        if (!btn || !btn.style) return;
        const m = btn.getAttribute ? btn.getAttribute('data-model') : null;
        if (m === this.state.activeModel) {
          btn.style.background = 'linear-gradient(135deg,#38bdf8,#a855f7)';
          btn.style.color = '#fff';
          btn.style.borderColor = '#38bdf8';
        } else {
          btn.style.background = 'rgba(255,255,255,0.04)';
          btn.style.color = '#cbd5e1';
          btn.style.borderColor = 'rgba(255,255,255,0.1)';
        }
      });

      document.querySelectorAll('.hyper3d-mat-btn').forEach(btn => {
        if (!btn || !btn.style) return;
        const mat = btn.getAttribute ? btn.getAttribute('data-mat') : null;
        if (mat === this.state.activeMaterial) {
          btn.style.background = 'rgba(56,189,248,0.2)';
          btn.style.borderColor = '#38bdf8';
          btn.style.color = '#38bdf8';
        } else {
          btn.style.background = 'rgba(255,255,255,0.04)';
          btn.style.borderColor = 'rgba(255,255,255,0.1)';
          btn.style.color = '#94a3b8';
        }
      });

      // Update real deform mode buttons
      document.querySelectorAll('.hyper3d-deform-btn').forEach(btn => {
        if (!btn || !btn.style) return;
        const d = btn.getAttribute ? btn.getAttribute('data-deform') : null;
        if (d === this.state.realDeformMode) {
          btn.style.background = 'rgba(236,72,153,0.25)';
          btn.style.borderColor = '#ec4899';
          btn.style.color = '#f472b6';
        } else {
          btn.style.background = 'rgba(255,255,255,0.04)';
          btn.style.borderColor = 'rgba(255,255,255,0.1)';
          btn.style.color = '#94a3b8';
        }
      });

      // Update real deform mode buttons
      document.querySelectorAll('.hyper3d-deform-btn').forEach(btn => {
        if (!btn || !btn.style) return;
        const d = btn.getAttribute ? btn.getAttribute('data-deform') : null;
        if (d === this.state.realDeformMode) {
          btn.style.background = 'rgba(236,72,153,0.25)';
          btn.style.borderColor = '#ec4899';
          btn.style.color = '#f472b6';
        } else {
          btn.style.background = 'rgba(255,255,255,0.04)';
          btn.style.borderColor = 'rgba(255,255,255,0.1)';
          btn.style.color = '#94a3b8';
        }
      });

      // Update stardust mode buttons
      document.querySelectorAll('.hyper3d-stardust-btn').forEach(btn => {
        if (!btn || !btn.style) return;
        const mode = btn.getAttribute ? btn.getAttribute('data-stardust') : null;
        if (mode === this.state.stardustMode && this.state.stardustActive) {
          btn.style.background = 'rgba(56,189,248,0.25)';
          btn.style.borderColor = '#38bdf8';
          btn.style.color = '#38bdf8';
        } else {
          btn.style.background = 'rgba(255,255,255,0.04)';
          btn.style.borderColor = 'rgba(255,255,255,0.1)';
          btn.style.color = '#94a3b8';
        }
      });

      const sBtn = document.getElementById('hyper3d-btn-stardust');
      if (sBtn) {
        sBtn.style.borderColor = this.state.stardustActive ? '#38bdf8' : 'rgba(56,189,248,0.3)';
        sBtn.style.color = this.state.stardustActive ? '#38bdf8' : '#94a3b8';
        sBtn.style.background = this.state.stardustActive ? 'rgba(56,189,248,0.15)' : 'transparent';
      }

      const synthBtn = document.getElementById('hyper3d-btn-synth');
      if (synthBtn) {
        synthBtn.style.borderColor = this.state.spatialSynthActive ? '#10b981' : 'rgba(16,185,129,0.3)';
        synthBtn.style.color = this.state.spatialSynthActive ? '#10b981' : '#94a3b8';
        synthBtn.style.background = this.state.spatialSynthActive ? 'rgba(16,185,129,0.15)' : 'transparent';
      }

      const mcBtn = document.getElementById('hyper3d-btn-morphcycle');
      if (mcBtn) {
        mcBtn.style.borderColor = this.state.morphAutoCycle ? '#c084fc' : 'rgba(168,85,247,0.4)';
        mcBtn.style.color = this.state.morphAutoCycle ? '#c084fc' : '#94a3b8';
        mcBtn.style.background = this.state.morphAutoCycle ? 'rgba(168,85,247,0.2)' : 'transparent';
      }

      // Update camera mode buttons
      document.querySelectorAll('.hyper3d-cam-btn').forEach(btn => {
        if (!btn || !btn.style) return;
        const c = btn.getAttribute ? btn.getAttribute('data-cam') : null;
        if (c === this.state.camMode) {
          btn.style.background = 'rgba(168,85,247,0.25)';
          btn.style.borderColor = '#c084fc';
          btn.style.color = '#e9d5ff';
        } else {
          btn.style.background = 'rgba(255,255,255,0.04)';
          btn.style.borderColor = 'rgba(255,255,255,0.1)';
          btn.style.color = '#94a3b8';
        }
      });

      // Update wireframe button
      const wireBtn = document.getElementById('hyper3d-btn-wireframe');
      if (wireBtn && wireBtn.style) {
        wireBtn.style.background = this.state.wireframe ? 'rgba(56,189,248,0.25)' : 'rgba(255,255,255,0.04)';
        wireBtn.style.borderColor = this.state.wireframe ? '#38bdf8' : 'rgba(255,255,255,0.1)';
        wireBtn.style.color = this.state.wireframe ? '#38bdf8' : '#94a3b8';
      }

      // Update Audio Reactive button
      const audioBtn = document.getElementById('hyper3d-btn-audio');
      if (audioBtn && audioBtn.style) {
        audioBtn.style.background = this.state.audioReactive ? 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(56,189,248,0.25))' : 'rgba(255,255,255,0.04)';
        audioBtn.style.borderColor = this.state.audioReactive ? '#10b981' : 'rgba(255,255,255,0.1)';
        audioBtn.style.color = this.state.audioReactive ? '#34d399' : '#94a3b8';
      }

      // Update Cursor Warp button
      const warpBtn = document.getElementById('hyper3d-btn-warp');
      if (warpBtn && warpBtn.style) {
        warpBtn.style.background = this.state.cursorWarp ? 'linear-gradient(135deg, rgba(236,72,153,0.25), rgba(168,85,247,0.25))' : 'rgba(255,255,255,0.04)';
        warpBtn.style.borderColor = this.state.cursorWarp ? '#ec4899' : 'rgba(255,255,255,0.1)';
        warpBtn.style.color = this.state.cursorWarp ? '#f472b6' : '#94a3b8';
      }

      // Update Voice button
      const voiceBtn = document.getElementById('hyper3d-btn-voice');
      if (voiceBtn && voiceBtn.style) {
        voiceBtn.style.background = this.state.isVoiceActive ? 'linear-gradient(135deg, rgba(239,68,68,0.35), rgba(249,115,22,0.35))' : 'rgba(255,255,255,0.04)';
        voiceBtn.style.borderColor = this.state.isVoiceActive ? '#ef4444' : 'rgba(255,255,255,0.1)';
        voiceBtn.style.color = this.state.isVoiceActive ? '#fca5a5' : '#94a3b8';
      }

      // Update FX buttons
      const crtBtn = document.getElementById('hyper3d-btn-crt');
      if (crtBtn && crtBtn.style) {
        crtBtn.style.borderColor = this.state.fxScanlines ? '#38bdf8' : 'rgba(255,255,255,0.1)';
        crtBtn.style.color = this.state.fxScanlines ? '#38bdf8' : '#94a3b8';
      }
      const chroBtn = document.getElementById('hyper3d-btn-chroma');
      if (chroBtn && chroBtn.style) {
        chroBtn.style.borderColor = this.state.fxChromatic ? '#ec4899' : 'rgba(255,255,255,0.1)';
        chroBtn.style.color = this.state.fxChromatic ? '#ec4899' : '#94a3b8';
      }
      const bloomBtn = document.getElementById('hyper3d-btn-bloom');
      if (bloomBtn && bloomBtn.style) {
        bloomBtn.style.borderColor = this.state.fxBloom ? '#f59e0b' : 'rgba(255,255,255,0.1)';
        bloomBtn.style.color = this.state.fxBloom ? '#f59e0b' : '#94a3b8';
      }

      const fElem = document.getElementById('hyper3d-formula-display');
      if (fElem && meta) {
        fElem.textContent = meta.formula;
      }

      const dElem = document.getElementById('hyper3d-desc-display');
      if (dElem && meta) {
        dElem.textContent = isFr ? meta.descFr : meta.descEn;
      }
    },

    // 💾 EXPORT 1: Full Wavefront 3D OBJ (Polygonal Faces, Normals, Matrices)
    exportOBJ: function() {
      const isFr = _isFr();
      const modelName = this.state.activeModel;
      const group = this.threeData.activeGroup;
      if (!group) return;

      if (group.updateMatrixWorld) {
        group.updateMatrixWorld(true);
      }

      let objContent = `# IA Architecte Studio ULTRA — Procedural 3D OBJ Exporter\n# Model: ${modelName}\n# Exported: ${new Date().toISOString()}\n# Geometry: Polygonal Mesh with Normals & Faces\n\no ultra_${modelName}\n\n`;

      let vertexOffset = 0;
      let normalOffset = 0;
      let totalFaces = 0;
      let totalVertices = 0;
      let totalLines = 0;

      group.traverse(child => {
        if (!child.visible) return;

        if (child.isMesh && child.geometry) {
          const geom = child.geometry;
          const posAttr = geom.attributes.position;
          const normAttr = geom.attributes.normal;
          if (!posAttr || posAttr.count === 0) return;

          const gName = (child.name || 'mesh_' + (vertexOffset + 1)).replace(/\s+/g, '_');
          objContent += `g ${gName}\n`;

          const vCount = posAttr.count;
          const matrixWorld = child.matrixWorld;

          for (let i = 0; i < vCount; i++) {
            let x = posAttr.getX(i);
            let y = posAttr.getY(i);
            let z = posAttr.getZ(i);

            if (matrixWorld) {
              const e = matrixWorld.elements;
              const wx = e[0] * x + e[4] * y + e[8] * z + e[12];
              const wy = e[1] * x + e[5] * y + e[9] * z + e[13];
              const wz = e[2] * x + e[6] * y + e[10] * z + e[14];
              x = wx; y = wy; z = wz;
            }
            objContent += `v ${x.toFixed(4)} ${y.toFixed(4)} ${z.toFixed(4)}\n`;
            totalVertices++;
          }

          let hasNormals = false;
          if (normAttr && normAttr.count > 0) {
            hasNormals = true;
            for (let i = 0; i < normAttr.count; i++) {
              let nx = normAttr.getX(i);
              let ny = normAttr.getY(i);
              let nz = normAttr.getZ(i);

              if (matrixWorld) {
                const e = matrixWorld.elements;
                const wnx = e[0] * nx + e[4] * ny + e[8] * nz;
                const wny = e[1] * nx + e[5] * ny + e[9] * nz;
                const wnz = e[2] * nx + e[6] * ny + e[10] * nz;
                const len = Math.hypot(wnx, wny, wnz) || 1;
                nx = wnx / len; ny = wny / len; nz = wnz / len;
              }
              objContent += `vn ${nx.toFixed(4)} ${ny.toFixed(4)} ${nz.toFixed(4)}\n`;
            }
          }

          if (geom.index) {
            const idx = geom.index;
            for (let i = 0; i < idx.count; i += 3) {
              const a = idx.getX(i) + 1 + vertexOffset;
              const b = idx.getX(i + 1) + 1 + vertexOffset;
              const c = idx.getX(i + 2) + 1 + vertexOffset;

              if (hasNormals) {
                const na = idx.getX(i) + 1 + normalOffset;
                const nb = idx.getX(i + 1) + 1 + normalOffset;
                const nc = idx.getX(i + 2) + 1 + normalOffset;
                objContent += `f ${a}//${na} ${b}//${nb} ${c}//${nc}\n`;
              } else {
                objContent += `f ${a} ${b} ${c}\n`;
              }
              totalFaces++;
            }
          } else {
            for (let i = 0; i < vCount; i += 3) {
              const a = i + 1 + vertexOffset;
              const b = i + 2 + vertexOffset;
              const c = i + 3 + vertexOffset;

              if (hasNormals) {
                const na = i + 1 + normalOffset;
                const nb = i + 2 + normalOffset;
                const nc = i + 3 + normalOffset;
                objContent += `f ${a}//${na} ${b}//${nb} ${c}//${nc}\n`;
              } else {
                objContent += `f ${a} ${b} ${c}\n`;
              }
              totalFaces++;
            }
          }

          vertexOffset += vCount;
          if (hasNormals) normalOffset += normAttr.count;
          objContent += `\n`;
        } else if ((child.isLine || child.isLineSegments) && child.geometry) {
          const geom = child.geometry;
          const posAttr = geom.attributes.position;
          if (!posAttr || posAttr.count === 0) return;

          const gName = (child.name || 'line_' + (vertexOffset + 1)).replace(/\s+/g, '_');
          objContent += `g ${gName}\n`;

          const vCount = posAttr.count;
          const matrixWorld = child.matrixWorld;

          for (let i = 0; i < vCount; i++) {
            let x = posAttr.getX(i), y = posAttr.getY(i), z = posAttr.getZ(i);
            if (matrixWorld) {
              const e = matrixWorld.elements;
              const wx = e[0] * x + e[4] * y + e[8] * z + e[12];
              const wy = e[1] * x + e[5] * y + e[9] * z + e[13];
              const wz = e[2] * x + e[6] * y + e[10] * z + e[14];
              x = wx; y = wy; z = wz;
            }
            objContent += `v ${x.toFixed(4)} ${y.toFixed(4)} ${z.toFixed(4)}\n`;
            totalVertices++;
          }

          if (geom.index) {
            const idx = geom.index;
            for (let i = 0; i < idx.count; i += 2) {
              const a = idx.getX(i) + 1 + vertexOffset;
              const b = idx.getX(i + 1) + 1 + vertexOffset;
              objContent += `l ${a} ${b}\n`;
              totalLines++;
            }
          } else {
            for (let i = 0; i < vCount; i += 2) {
              const a = i + 1 + vertexOffset;
              const b = i + 2 + vertexOffset;
              objContent += `l ${a} ${b}\n`;
              totalLines++;
            }
          }

          vertexOffset += vCount;
          objContent += `\n`;
        }
      });

      if (totalVertices === 0) {
        if (modelName === 'octaplex') {
          for (let i = 0; i < 24; i++) {
            const p = project4Dto3D(OCTAPLEX_VERTICES_4D[i], this.state.thetaXW, this.state.thetaYW, this.state.thetaZW, 3.2, this.state.wSlice);
            objContent += `v ${p.x.toFixed(4)} ${p.y.toFixed(4)} ${p.z.toFixed(4)}\n`;
          }
        } else {
          for (let i = 0; i < 16; i++) {
            const p = project4Dto3D(TESSERACT_VERTICES_4D[i], this.state.thetaXW, this.state.thetaYW, this.state.thetaZW, 2.5, this.state.wSlice);
            objContent += `v ${p.x.toFixed(4)} ${p.y.toFixed(4)} ${p.z.toFixed(4)}\n`;
          }
        }
      }

      const blob = new Blob([objContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ultra_3d_${modelName}.obj`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      _sound('celebrate');
      _toast(isFr
        ? `💾 Modèle 3D .OBJ exporté avec succès (${totalVertices} sommets, ${totalFaces} faces) !`
        : `💾 3D .OBJ model exported successfully (${totalVertices} vertices, ${totalFaces} faces)!`,
        'success'
      );
    },

    // 💾 EXPORT 2: Standalone Self-Contained Offline .HTML 3D App
    exportHTML: function() {
      const isFr = _isFr();
      const model = this.state.activeModel;
      const modelUpper = model.toUpperCase();
      const meta = this.modelsMeta[model];
      const title = meta ? (isFr ? meta.nameFr : meta.nameEn) : modelUpper;

      const { setupCode, animCode } = this._getModelSnippetCode(
        model, this.state.activeMaterial, this.state.primaryColor, this.state.secondaryColor,
        this.state.rotSpeed, this.state.hyperSpeed, this.state.wireframe, this.state.audioReactive, this.state.cursorWarp,
        this.state.explode, this.state.wSlice, this.state.camMode, this.state.fxScanlines, this.state.fxChromatic, this.state.fxBloom,
        this.state.realDeform, this.state.realDeformMode
      );

      const htmlContent = `<!DOCTYPE html>
<html lang="${isFr ? 'fr' : 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IA Architecte Studio ULTRA — ${title}</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; background: radial-gradient(circle at 50% 50%, #0f172a 0%, #020617 100%); color: #fff; font-family: system-ui, -apple-system, sans-serif; height: 100vh; overflow: hidden; display: flex; flex-direction: column; }
    header { position: absolute; top: 20px; left: 24px; z-index: 10; pointer-events: none; }
    h1 { margin: 0; font-size: 1.4rem; font-weight: 900; background: linear-gradient(135deg, #38bdf8, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    p { margin: 4px 0 0 0; font-size: 0.8rem; color: #94a3b8; }
    #canvas-container { width: 100vw; height: 100vh; position: absolute; inset: 0; cursor: grab; }
    #canvas-container:active { cursor: grabbing; }
    .badge { position: absolute; bottom: 20px; right: 24px; z-index: 10; font-size: 0.75rem; color: #64748b; background: rgba(15,23,42,0.85); backdrop-filter: blur(10px); padding: 6px 14px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.08); }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
</head>
<body>
  <header>
    <h1>${title}</h1>
    <p>Procedural WebGL 3D/4D Mathematical Kinetic Sculptor · IA Architecte Studio ULTRA</p>
  </header>
  <div id="canvas-container"></div>
  <div class="badge">🖱️ Drag to Orbit · Wheel to Zoom · 60fps WebGL</div>
  <script>
  (function() {
    const container = document.getElementById('canvas-container');
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 7.0;

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dLight1 = new THREE.DirectionalLight(0x38bdf8, 1.4);
    dLight1.position.set(5, 8, 6);
    scene.add(dLight1);

    const dLight2 = new THREE.DirectionalLight(0xa855f7, 0.9);
    dLight2.position.set(-5, -6, -4);
    scene.add(dLight2);

    ${setupCode}

    // Interactive orbit controls
    let isDragging = false, prevX = 0, prevY = 0, rotX = 0.2, rotY = 0.3, distance = 7.0;
    container.addEventListener('mousedown', e => { isDragging = true; prevX = e.clientX; prevY = e.clientY; });
    window.addEventListener('mousemove', e => {
      if (!isDragging) return;
      rotY += (e.clientX - prevX) * 0.008;
      rotX += (e.clientY - prevY) * 0.008;
      rotX = Math.max(-Math.PI/2.2, Math.min(Math.PI/2.2, rotX));
      prevX = e.clientX; prevY = e.clientY;
    });
    window.addEventListener('mouseup', () => { isDragging = false; });
    container.addEventListener('wheel', e => {
      e.preventDefault();
      distance += e.deltaY * 0.005;
      distance = Math.max(2.5, Math.min(18, distance));
    }, { passive: false });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    function anim() {
      requestAnimationFrame(anim);
      if (!isDragging) rotY += 0.006;
      camera.position.x = distance * Math.sin(rotY) * Math.cos(rotX);
      camera.position.y = distance * Math.sin(rotX);
      camera.position.z = distance * Math.cos(rotY) * Math.cos(rotX);
      camera.lookAt(0, 0, 0);

      ${animCode}
      renderer.render(scene, camera);
    }
    anim();
  })();
  </script>
</body>
</html>`;

      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ultra_3d_${model}_app.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      _sound('celebrate');
      _toast(isFr ? `🌐 Mini-site 3D autonome .HTML exporté avec succès (${model}) !` : `🌐 Standalone 3D .HTML app exported successfully (${model})!`, 'success');
    },

    // 💾 EXPORT 3: Architectural Vectorial .SVG Blueprint
    exportSVG: function() {
      const isFr = _isFr();
      const model = this.state.activeModel;
      const group = this.threeData.activeGroup;
      const camera = this.threeData.camera;
      if (!group || !camera) return;

      const W = 960, H = 720;
      let svgLines = '';
      let svgCircles = '';
      let elementCount = 0;

      const THREE = window.THREE;
      const vA = new THREE.Vector3();
      const vB = new THREE.Vector3();

      group.updateMatrixWorld(true);

      group.traverse(child => {
        if (!child.visible) return;

        if (child.isMesh && child.geometry && child.geometry.attributes.position) {
          const pos = child.geometry.attributes.position;
          const idx = child.geometry.index;
          const matrixWorld = child.matrixWorld;

          if (idx) {
            for (let i = 0; i < Math.min(idx.count, 600); i += 3) {
              const i1 = idx.getX(i), i2 = idx.getX(i + 1);
              vA.set(pos.getX(i1), pos.getY(i1), pos.getZ(i1)).applyMatrix4(matrixWorld).project(camera);
              vB.set(pos.getX(i2), pos.getY(i2), pos.getZ(i2)).applyMatrix4(matrixWorld).project(camera);

              const x1 = ((vA.x + 1) * W / 2).toFixed(1);
              const y1 = ((-vA.y + 1) * H / 2).toFixed(1);
              const x2 = ((vB.x + 1) * W / 2).toFixed(1);
              const y2 = ((-vB.y + 1) * H / 2).toFixed(1);

              svgLines += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#38bdf8" stroke-width="0.8" opacity="0.65"/>\n`;
              elementCount++;
            }
          }
        } else if ((child.isLine || child.isLineSegments) && child.geometry) {
          const pos = child.geometry.attributes.position;
          const matrixWorld = child.matrixWorld;
          for (let i = 0; i < pos.count; i += 2) {
            vA.set(pos.getX(i), pos.getY(i), pos.getZ(i)).applyMatrix4(matrixWorld).project(camera);
            vB.set(pos.getX(i + 1), pos.getY(i + 1), pos.getZ(i + 1)).applyMatrix4(matrixWorld).project(camera);

            const x1 = ((vA.x + 1) * W / 2).toFixed(1);
            const y1 = ((-vA.y + 1) * H / 2).toFixed(1);
            const x2 = ((vB.x + 1) * W / 2).toFixed(1);
            const y2 = ((-vB.y + 1) * H / 2).toFixed(1);

            svgLines += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#a855f7" stroke-width="1.2" opacity="0.85"/>\n`;
            svgCircles += `<circle cx="${x1}" cy="${y1}" r="2" fill="#38bdf8"/>\n`;
            elementCount += 2;
          }
        }
      });

      const svgContent = `<?xml version="1.0" standalone="no"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="background:#090d16">
  <!-- Architectural Grid Blueprint -->
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(56,189,248,0.06)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>

  <!-- Title & Blueprint Specs -->
  <text x="32" y="44" fill="#38bdf8" font-family="system-ui,sans-serif" font-size="18" font-weight="900" letter-spacing="1">IA ARCHITECTE STUDIO ULTRA — 3D BLUEPRINT</text>
  <text x="32" y="68" fill="#64748b" font-family="system-ui,sans-serif" font-size="11">MODEL: ${model.toUpperCase()} · SCALE: 1:1 · PERSPECTIVE CAD PROJECTION</text>

  <g transform="translate(0, 0)">
    ${svgLines}
    ${svgCircles}
  </g>

  <!-- Technical Marks -->
  <circle cx="${W/2}" cy="${H/2}" r="4" fill="none" stroke="#ec4899" stroke-width="1.5"/>
  <line x1="${W/2 - 12}" y1="${H/2}" x2="${W/2 + 12}" y2="${H/2}" stroke="#ec4899" stroke-width="1"/>
  <line x1="${W/2}" y1="${H/2 - 12}" x2="${W/2}" y2="${H/2 + 12}" stroke="#ec4899" stroke-width="1"/>
  <text x="32" y="${H - 24}" fill="#64748b" font-family="system-ui,sans-serif" font-size="10">© IA ARCHITECTE STUDIO ULTRA · AUTONOMOUS PROCEDURAL GEOMETRY</text>
</svg>`;

      const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ultra_blueprint_${model}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      _sound('celebrate');
      _toast(isFr ? `📐 Blueprint vectoriel .SVG exporté (${elementCount} éléments) !` : `📐 Vectorial .SVG blueprint exported (${elementCount} elements)!`, 'success');
    },


    // 🌌 GPU Cosmic Stardust Gravitational Field
    initStardust: function() {
      const THREE = window.THREE;
      if (!THREE || !this.threeData.scene) return;

      if (this.threeData.stardustPoints) {
        this.threeData.scene.remove(this.threeData.stardustPoints);
        this.threeData.stardustPoints.geometry.dispose();
        this.threeData.stardustPoints.material.dispose();
        this.threeData.stardustPoints = null;
      }

      const count = this.state.stardustCount || 5000;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const baseData = [];

      const pCol = new THREE.Color(this.state.primaryColor || '#38bdf8');
      const sCol = new THREE.Color(this.state.secondaryColor || '#a855f7');
      const goldCol = new THREE.Color(0xf59e0b);

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const radius = 1.4 + Math.random() * 4.8;
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * Math.PI * 0.9;

        const x = radius * Math.cos(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi);
        const z = radius * Math.cos(phi) * Math.sin(theta);

        positions[i3] = x;
        positions[i3 + 1] = y;
        positions[i3 + 2] = z;

        const mix = Math.random();
        const col = (mix < 0.45) ? pCol : (mix < 0.85 ? sCol : goldCol);
        colors[i3] = col.r;
        colors[i3 + 1] = col.g;
        colors[i3 + 2] = col.b;

        baseData.push({
          radius: radius,
          theta: theta,
          phi: phi,
          speed: (0.3 + Math.random() * 0.7) * (Math.random() > 0.5 ? 1 : -1),
          verticalFreq: 1.0 + Math.random() * 3.0,
          drift: (Math.random() - 0.5) * 0.02
        });
      }

      const geom = new THREE.BufferGeometry();
      geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const mat = new THREE.PointsMaterial({
        size: 0.045,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const points = new THREE.Points(geom, mat);
      this.threeData.scene.add(points);
      this.threeData.stardustPoints = points;
      this.threeData.stardustPositions = positions;
      this.threeData.stardustBaseData = baseData;
    },

    updateStardust: function(time) {
      if (!this.threeData.stardustPoints || !this.threeData.stardustBaseData) return;
      const positions = this.threeData.stardustPositions;
      const baseData = this.threeData.stardustBaseData;
      const mode = this.state.stardustMode;
      const count = baseData.length;
      const cursor = this.threeData.cursorPos || { x: 0, y: 0 };
      const rot = this.state.rotSpeed * 0.01;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const b = baseData[i];

        if (mode === 'vortex') {
          // Inward logarithmic spiral suction towards singularity
          b.radius -= 0.012;
          b.theta += 0.035 * b.speed;
          if (b.radius < 0.25) {
            b.radius = 5.2 + Math.random() * 1.0;
          }
          positions[i3] = b.radius * Math.cos(b.phi) * Math.cos(b.theta);
          positions[i3 + 1] = b.radius * Math.sin(b.phi) + Math.sin(time * b.verticalFreq + i) * 0.15;
          positions[i3 + 2] = b.radius * Math.cos(b.phi) * Math.sin(b.theta);
        } else if (mode === 'repulse') {
          // Magnetic repulsion from 2D/3D cursor projection
          b.theta += b.speed * 0.015;
          let px = b.radius * Math.cos(b.phi) * Math.cos(b.theta);
          let py = b.radius * Math.sin(b.phi);
          let pz = b.radius * Math.cos(b.phi) * Math.sin(b.theta);

          const dx = px - cursor.x * 2.5;
          const dy = py - cursor.y * 2.5;
          const dist = Math.hypot(dx, dy);
          if (dist < 1.6) {
            const push = (1.6 - dist) * 0.9;
            px += (dx / (dist || 1)) * push;
            py += (dy / (dist || 1)) * push;
          }
          positions[i3] = px;
          positions[i3 + 1] = py;
          positions[i3 + 2] = pz;
        } else {
          // Keplerian orbital motion: angular velocity inversely proportional to sqrt(radius)
          const omega = (0.02 / Math.sqrt(b.radius)) * b.speed + rot;
          b.theta += omega;
          positions[i3] = b.radius * Math.cos(b.phi) * Math.cos(b.theta);
          positions[i3 + 1] = b.radius * Math.sin(b.phi) + Math.sin(time * b.verticalFreq) * 0.12;
          positions[i3 + 2] = b.radius * Math.cos(b.phi) * Math.sin(b.theta);
        }
      }
      this.threeData.stardustPoints.geometry.attributes.position.needsUpdate = true;
    },

    toggleStardust: function() {
      this.state.stardustActive = !this.state.stardustActive;
      if (this.state.stardustActive && !this.threeData.stardustPoints) {
        this.initStardust();
      } else if (this.threeData.stardustPoints) {
        this.threeData.stardustPoints.visible = this.state.stardustActive;
      }
      _sound('click');
      this.updateUi();
      _toast(_isFr()
        ? (this.state.stardustActive ? '✨ Champ de poussière stellaire activé !' : '✨ Champ de poussière stellaire désactivé.')
        : (this.state.stardustActive ? '✨ Cosmic stardust field activated!' : '✨ Cosmic stardust field deactivated.'),
        'info'
      );
    },

    setStardustMode: function(mode) {
      this.state.stardustMode = mode;
      if (!this.state.stardustActive) {
        this.toggleStardust();
      }
      _sound('click');
      this.updateUi();
    },

    // 🎹 Generative Geometry Audio Synthesizer (Web Audio API)
    toggleSpatialSynth: function() {
      this.state.spatialSynthActive = !this.state.spatialSynthActive;
      const isFr = _isFr();

      if (this.state.spatialSynthActive) {
        try {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (!this.threeData.audioCtx) {
            this.threeData.audioCtx = new AudioContext();
          }
          if (this.threeData.audioCtx.state === 'suspended') {
            this.threeData.audioCtx.resume();
          }

          const ctx = this.threeData.audioCtx;
          const now = ctx.currentTime;

          const masterGain = ctx.createGain();
          masterGain.gain.setValueAtTime(0.001, now);
          masterGain.gain.exponentialRampToValueAtTime(0.16, now + 0.5);

          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(450, now);
          filter.Q.setValueAtTime(3.5, now);

          let panner = null;
          if (ctx.createStereoPanner) {
            panner = ctx.createStereoPanner();
            panner.pan.setValueAtTime(0, now);
          }

          // Osc 1: Deep cosmic fundamental drone (A2 110Hz)
          const osc1 = ctx.createOscillator();
          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(108, now);

          // Osc 2: Warm fifth overtone with soft vibrato
          const osc2 = ctx.createOscillator();
          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(216, now);

          // Osc 3: Ethereal high harmonic shimmer
          const osc3 = ctx.createOscillator();
          osc3.type = 'sine';
          osc3.frequency.setValueAtTime(432, now);

          const osc1Gain = ctx.createGain(); osc1Gain.gain.value = 0.5;
          const osc2Gain = ctx.createGain(); osc2Gain.gain.value = 0.35;
          const osc3Gain = ctx.createGain(); osc3Gain.gain.value = 0.25;

          osc1.connect(osc1Gain);
          osc2.connect(osc2Gain);
          osc3.connect(osc3Gain);

          osc1Gain.connect(filter);
          osc2Gain.connect(filter);
          osc3Gain.connect(filter);

          if (panner) {
            filter.connect(panner);
            panner.connect(masterGain);
          } else {
            filter.connect(masterGain);
          }

          masterGain.connect(ctx.destination);

          osc1.start(now);
          osc2.start(now);
          osc3.start(now);

          this.threeData.synthNodes = { masterGain, filter, panner, osc1, osc2, osc3 };
          _toast(isFr ? '🎹 Synthé audio géométrique en direct !' : '🎹 Geometry audio synth live!', 'success');
        } catch(e) {
          console.warn('[UltraHyper3D] Web Audio failed:', e);
          this.state.spatialSynthActive = false;
        }
      } else {
        if (this.threeData.synthNodes && this.threeData.audioCtx) {
          const now = this.threeData.audioCtx.currentTime;
          this.threeData.synthNodes.masterGain.gain.linearRampToValueAtTime(0.001, now + 0.3);
          setTimeout(() => {
            try {
              this.threeData.synthNodes.osc1.stop();
              this.threeData.synthNodes.osc2.stop();
              this.threeData.synthNodes.osc3.stop();
            } catch(e){}
          }, 350);
        }
        _toast(isFr ? '🔇 Synthé audio désactivé.' : '🔇 Geometry audio synth muted.', 'info');
      }
      this.updateUi();
    },

    updateSpatialSynth: function(time) {
      if (!this.threeData.synthNodes || !this.threeData.audioCtx) return;
      const { filter, panner, osc3 } = this.threeData.synthNodes;
      const rot = this.threeData.orbit ? this.threeData.orbit.rotY : 0;
      const def = this.state.realDeform || 0;
      const w = Math.abs(this.state.wSlice || 0);

      // Stereo panning tracks visual orbit in space
      if (panner && panner.pan) {
        panner.pan.value = Math.sin(rot) * 0.75;
      }

      // Filter cutoff sweeps with rotation speed and real geometric deformation
      if (filter && filter.frequency) {
        const targetFreq = 260 + (this.state.rotSpeed * 220) + (def * 450) + Math.sin(time * 1.5) * 60;
        filter.frequency.value = targetFreq;
      }

      // High harmonic overtone tracks deformation and 4D W-slice
      if (osc3 && osc3.frequency) {
        osc3.frequency.value = 432 + (def * 130) + (w * 90);
      }
    },

    // 🌀 Quantum Shape Morphing Setters
    setMorphTarget: function(target) {
      this.state.morphTarget = target;
      _sound('click');
      this.applyDeformation();
      this.updateUi();
    },

    setMorphProgress: function(val) {
      this.state.morphProgress = parseFloat(val);
      const lbl = document.getElementById('hyper3d-val-morph');
      if (lbl) lbl.textContent = Math.round(parseFloat(val) * 100) + '%';
      this.applyDeformation();
    },

    toggleMorphAutoCycle: function() {
      this.state.morphAutoCycle = !this.state.morphAutoCycle;
      _sound('click');
      this.updateUi();
      _toast(_isFr()
        ? (this.state.morphAutoCycle ? '🌀 Cycle auto-morphing activé !' : '🌀 Cycle auto-morphing en pause.')
        : (this.state.morphAutoCycle ? '🌀 Auto-morph cycle activated!' : '🌀 Auto-morph cycle paused.'),
        'info'
      );
    },

    // 📦 EXPORT 4: Pure Procedural Binary glTF 2.0 (.GLB) Exporter
    exportGLB: function() {
      const isFr = _isFr();
      const modelName = this.state.activeModel;
      const group = this.threeData.activeGroup;
      if (!group) return;

      if (group.updateMatrixWorld) group.updateMatrixWorld(true);

      const allVerts = [];
      const allNorms = [];
      const allIndices = [];
      let indexOffset = 0;

      group.traverse(child => {
        if (!child.visible || !child.isMesh || !child.geometry) return;
        const geom = child.geometry;
        const pos = geom.attributes.position;
        const norm = geom.attributes.normal;
        if (!pos || pos.count === 0) return;

        const matWorld = child.matrixWorld;
        const count = pos.count;

        for (let i = 0; i < count; i++) {
          let x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
          if (matWorld) {
            const e = matWorld.elements;
            const wx = e[0] * x + e[4] * y + e[8] * z + e[12];
            const wy = e[1] * x + e[5] * y + e[9] * z + e[13];
            const wz = e[2] * x + e[6] * y + e[10] * z + e[14];
            x = wx; y = wy; z = wz;
          }
          allVerts.push(x, y, z);

          if (norm && norm.count > i) {
            let nx = norm.getX(i), ny = norm.getY(i), nz = norm.getZ(i);
            if (matWorld) {
              const e = matWorld.elements;
              const wnx = e[0] * nx + e[4] * ny + e[8] * nz;
              const wny = e[1] * nx + e[5] * ny + e[9] * nz;
              const wnz = e[2] * nx + e[6] * ny + e[10] * nz;
              const len = Math.hypot(wnx, wny, wnz) || 1;
              nx = wnx / len; ny = wny / len; nz = wnz / len;
            }
            allNorms.push(nx, ny, nz);
          } else {
            const l = Math.hypot(x, y, z) || 1;
            allNorms.push(x / l, y / l, z / l);
          }
        }

        if (geom.index) {
          const idx = geom.index;
          for (let i = 0; i < idx.count; i++) {
            allIndices.push(idx.getX(i) + indexOffset);
          }
        } else {
          for (let i = 0; i < count; i++) {
            allIndices.push(i + indexOffset);
          }
        }
        indexOffset += count;
      });

      if (allVerts.length === 0) {
        _toast(isFr ? 'Aucune géométrie de maillage à exporter en .GLB.' : 'No mesh geometry available to export as .GLB.', 'warning');
        return;
      }

      const vertices = new Float32Array(allVerts);
      const normals = new Float32Array(allNorms);
      const indices = new Uint32Array(allIndices);

      const vCount = vertices.length / 3;
      const iCount = indices.length;

      let minX = Infinity, minY = Infinity, minZ = Infinity;
      let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
      for (let i = 0; i < vCount; i++) {
        const x = vertices[i * 3], y = vertices[i * 3 + 1], z = vertices[i * 3 + 2];
        if (x < minX) minX = x; if (x > maxX) maxX = x;
        if (y < minY) minY = y; if (y > maxY) maxY = y;
        if (z < minZ) minZ = z; if (z > maxZ) maxZ = z;
      }

      const posByteLength = vertices.byteLength;
      const normByteLength = normals.byteLength;
      const idxByteLength = indices.byteLength;

      const posOffset = 0;
      const normOffset = posByteLength;
      const idxOffset = normOffset + normByteLength;
      const totalBinLength = idxOffset + idxByteLength;
      const paddedBinLength = (totalBinLength + 3) & ~3;

      const binBuffer = new Uint8Array(paddedBinLength);
      binBuffer.set(new Uint8Array(vertices.buffer, vertices.byteOffset, posByteLength), posOffset);
      binBuffer.set(new Uint8Array(normals.buffer, normals.byteOffset, normByteLength), normOffset);
      binBuffer.set(new Uint8Array(indices.buffer, indices.byteOffset, idxByteLength), idxOffset);

      const colHex = (this.state.primaryColor || '#38bdf8').replace('#', '');
      const cInt = parseInt(colHex, 16) || 0x38bdf8;
      const cr = ((cInt >> 16) & 255) / 255;
      const cg = ((cInt >> 8) & 255) / 255;
      const cb = (cInt & 255) / 255;

      const gltfJson = {
        asset: { version: '2.0', generator: 'IA Architecte Studio ULTRA — GLB Exporter v5.0' },
        scenes: [{ nodes: [0] }],
        scene: 0,
        nodes: [{ mesh: 0, name: 'ultra_' + modelName }],
        meshes: [{
          primitives: [{
            attributes: { POSITION: 0, NORMAL: 1 },
            indices: 2,
            material: 0
          }],
          name: modelName
        }],
        materials: [{
          pbrMetallicRoughness: {
            baseColorFactor: [cr, cg, cb, 1.0],
            metallicFactor: 0.75,
            roughnessFactor: 0.25
          },
          name: 'UltraMaterial',
          doubleSided: true
        }],
        accessors: [
          {
            bufferView: 0, byteOffset: 0, componentType: 5126,
            count: vCount, type: 'VEC3', min: [minX, minY, minZ], max: [maxX, maxY, maxZ]
          },
          {
            bufferView: 1, byteOffset: 0, componentType: 5126,
            count: vCount, type: 'VEC3'
          },
          {
            bufferView: 2, byteOffset: 0, componentType: 5125,
            count: iCount, type: 'SCALAR'
          }
        ],
        bufferViews: [
          { buffer: 0, byteOffset: posOffset, byteLength: posByteLength, target: 34962 },
          { buffer: 0, byteOffset: normOffset, byteLength: normByteLength, target: 34962 },
          { buffer: 0, byteOffset: idxOffset, byteLength: idxByteLength, target: 34963 }
        ],
        buffers: [{ byteLength: paddedBinLength }]
      };

      const jsonStr = JSON.stringify(gltfJson);
      const enc = new TextEncoder();
      const jsonBytes = enc.encode(jsonStr);
      const jsonByteLength = jsonBytes.length;
      const paddedJsonLength = (jsonByteLength + 3) & ~3;
      const jsonPadding = paddedJsonLength - jsonByteLength;

      const totalGlbLength = 12 + 8 + paddedJsonLength + 8 + paddedBinLength;
      const glbBuffer = new ArrayBuffer(totalGlbLength);
      const dataView = new DataView(glbBuffer);
      const uint8 = new Uint8Array(glbBuffer);

      // 12-byte header
      dataView.setUint32(0, 0x46546C67, true); // 'glTF'
      dataView.setUint32(4, 2, true);          // Version 2
      dataView.setUint32(8, totalGlbLength, true);

      // Chunk 0: JSON
      dataView.setUint32(12, paddedJsonLength, true);
      dataView.setUint32(16, 0x4E4F534A, true); // 'JSON'
      uint8.set(jsonBytes, 20);
      for (let p = 0; p < jsonPadding; p++) {
        uint8[20 + jsonByteLength + p] = 0x20; // space
      }

      // Chunk 1: BIN
      const binHeaderOffset = 20 + paddedJsonLength;
      dataView.setUint32(binHeaderOffset, paddedBinLength, true);
      dataView.setUint32(binHeaderOffset + 4, 0x004E4942, true); // 'BIN '
      uint8.set(binBuffer, binHeaderOffset + 8);

      const blob = new Blob([glbBuffer], { type: 'model/gltf-binary' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ultra_3d_${modelName}.glb`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      _sound('celebrate');
      _toast(isFr
        ? `📦 Modèle 3D .GLB binar exporté avec succès (${vCount} sommets) !`
        : `📦 Binary 3D .GLB model exported successfully (${vCount} vertices)!`,
        'success'
      );
    },

    // 🎥 EXPORT 5: 60fps Video Recorder (.WebM)
    recordWebM: function() {
      const isFr = _isFr();
      if (this.threeData.isRecordingWebm) {
        _toast(isFr ? 'Enregistrement vidéo déjà en cours...' : 'Video recording already in progress...', 'warning');
        return;
      }

      const canvas = this.threeData.renderer ? this.threeData.renderer.domElement : null;
      if (!canvas || !canvas.captureStream) {
        _toast(isFr ? 'CaptureStream non supporté par ce navigateur.' : 'Canvas captureStream is not supported by your browser.', 'error');
        return;
      }

      try {
        const stream = canvas.captureStream(60);
        let mimeType = 'video/webm;codecs=vp9';
        if (typeof MediaRecorder !== 'undefined' && !MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = 'video/webm';
        }

        const MR = (typeof MediaRecorder !== 'undefined' ? MediaRecorder : (typeof window !== 'undefined' ? window.MediaRecorder : null));
        const recorder = new MR(stream, { mimeType });
        const chunks = [];

        recorder.ondataavailable = e => {
          if (e.data && e.data.size > 0) chunks.push(e.data);
        };

        const recBtn = document.getElementById('hyper3d-btn-record');
        const origText = recBtn ? recBtn.innerHTML : '';
        const modelName = this.state.activeModel;

        recorder.onstop = () => {
          this.threeData.isRecordingWebm = false;
          if (recBtn) recBtn.innerHTML = origText;

          const blob = new Blob(chunks, { type: 'video/webm' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `ultra_3d_${modelName}_60fps.webm`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);

          _sound('celebrate');
          _toast(isFr
            ? `🎥 Vidéo 60fps .WebM enregistrée et téléchargée (${modelName}) !`
            : `🎥 60fps .WebM video recorded and downloaded (${modelName})!`,
            'success'
          );
        };

        this.threeData.isRecordingWebm = true;
        recorder.start();

        let remainingSec = 5;
        if (recBtn) recBtn.innerHTML = '🔴 ' + (isFr ? 'Enregistrement ' : 'Recording ') + remainingSec + 's...';

        const timer = setInterval(() => {
          remainingSec--;
          if (remainingSec > 0 && recBtn) {
            recBtn.innerHTML = '🔴 ' + (isFr ? 'Enregistrement ' : 'Recording ') + remainingSec + 's...';
          } else {
            clearInterval(timer);
          }
        }, 1000);

        setTimeout(() => {
          if (recorder.state === 'recording') {
            recorder.stop();
          }
        }, 5100);

        _sound('click');
        _toast(isFr ? '🔴 Enregistrement 60fps en cours (5 secondes)...' : '🔴 Recording 60fps video (5 seconds)...', 'info');
      } catch(err) {
        console.error('[UltraHyper3D] Recording error:', err);
        this.threeData.isRecordingWebm = false;
        _toast(isFr ? 'Erreur lors de l\'enregistrement vidéo.' : 'Failed to record video.', 'error');
      }
    },

    _getModelSnippetCode: function(model, matType, pColor, sColor, rot, hyper, wireframe, audioReactive, cursorWarp, explode = 0, wSlice = 0, camMode = 'orbit', fxScanlines = false, fxChromatic = false, fxBloom = false, realDeform = 0, realDeformMode = 'twist') {
      let setupCode = '';
      let animCode = '';

      const matCode = (matType === 'gold')
        ? `new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.15, metalness: 0.9, wireframe: ${wireframe} })`
        : (matType === 'glass')
        ? `new THREE.MeshPhysicalMaterial({ color: 0x10b981, roughness: 0.1, metalness: 0.1, transmission: 0.85, transparent: true, opacity: 0.75, wireframe: ${wireframe} })`
        : (matType === 'points')
        ? `new THREE.PointsMaterial({ color: '${pColor}', size: 0.06, transparent: true, opacity: 0.9 })`
        : `new THREE.MeshStandardMaterial({ color: '${pColor}', emissive: '${sColor}', emissiveIntensity: 0.6, roughness: 0.25, metalness: 0.4, wireframe: ${wireframe}, transparent: true, opacity: 0.85 })`;

      if (model === 'tesseract') {
        setupCode = `
  const group = new THREE.Group();
  scene.add(group);
  const verts4D = [];
  for (let i = 0; i < 16; i++) {
    verts4D.push([(i&1)?1:-1, (i&2)?1:-1, (i&4)?1:-1, (i&8)?1:-1]);
  }
  const edges4D = [];
  for (let i = 0; i < 16; i++) {
    for (let j = i + 1; j < 16; j++) {
      const d = i ^ j;
      if (d === 1 || d === 2 || d === 4 || d === 8) edges4D.push([i, j]);
    }
  }
  function project4D(v, tx, ty, tz) {
    let [x,y,z,w] = v;
    let cx = Math.cos(tx), sx = Math.sin(tx), x1 = x*cx - w*sx, w1 = x*sx + w*cx;
    let cy = Math.cos(ty), sy = Math.sin(ty), y2 = y*cy - w1*sy, w2 = y*sy + w1*cy;
    let cz = Math.cos(tz), sz = Math.sin(tz), z3 = z*cz - w2*sz, w3 = z*sz + w2*cz;
    let sc = 2.0 / Math.max(0.2, (2.5 - w3));
    return { x: x1 * sc, y: y2 * sc, z: z3 * sc };
  }
  const nodeMat = new THREE.MeshStandardMaterial({ color: '${pColor}', emissive: '${sColor}', emissiveIntensity: 0.9 });
  const nodeGeo = new THREE.SphereGeometry(0.08, 16, 16);
  const nodes = [];
  for (let i = 0; i < 16; i++) {
    const n = new THREE.Mesh(nodeGeo, nodeMat);
    group.add(n);
    nodes.push(n);
  }
  const lines = [];
  const lineMat = new THREE.LineBasicMaterial({ color: '${pColor}', transparent: true, opacity: 0.85 });
  for (let i = 0; i < edges4D.length; i++) {
    const [a, b] = edges4D[i];
    const lg = new THREE.BufferGeometry();
    lg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
    const line = new THREE.Line(lg, lineMat);
    group.add(line);
    lines.push({ line, a, b });
  }
  let thXW = 0, thYW = 0, thZW = 0;
`;
        animCode = `
    thXW += 0.015 * ${hyper};
    thYW += 0.010 * ${hyper};
    thZW += 0.006 * ${hyper};
    group.rotation.y += 0.008 * ${rot};
    const proj = [];
    for (let i = 0; i < 16; i++) {
      const p = project4D(verts4D[i], thXW, thYW, thZW);
      proj.push(p);
      nodes[i].position.set(p.x, p.y, p.z);
    }
    for (let i = 0; i < lines.length; i++) {
      const { line, a, b } = lines[i];
      const pos = line.geometry.attributes.position.array;
      pos[0] = proj[a].x; pos[1] = proj[a].y; pos[2] = proj[a].z;
      pos[3] = proj[b].x; pos[4] = proj[b].y; pos[5] = proj[b].z;
      line.geometry.attributes.position.needsUpdate = true;
    }
`;
      } else if (model === 'clifford') {
        setupCode = `
  const group = new THREE.Group();
  scene.add(group);
  const uSteps = 48, vSteps = 24, pos = [];
  for (let i = 0; i <= uSteps; i++) {
    const u = (i / uSteps) * Math.PI * 2;
    for (let j = 0; j <= vSteps; j++) {
      const v = (j / vSteps) * Math.PI * 2;
      const x4 = Math.cos(u), y4 = Math.sin(u), z4 = Math.cos(v), w4 = Math.sin(v);
      const sc = 2.0 / Math.max(0.2, 2.5 - w4);
      pos.push(x4 * sc, y4 * sc, z4 * sc);
    }
  }
  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  const pts = new THREE.Points(geom, new THREE.PointsMaterial({ color: '${pColor}', size: 0.06, transparent: true, opacity: 0.85 }));
  group.add(pts);
`;
        animCode = `
    group.rotation.y += 0.012 * ${rot};
    group.rotation.x += 0.006 * ${rot};
`;
      } else if (model === 'gyroscope') {
        setupCode = `
  const group = new THREE.Group();
  scene.add(group);
  const mat1 = ${matCode};
  const mat2 = new THREE.MeshStandardMaterial({ color: '${sColor}', roughness: 0.2, metalness: 0.8, wireframe: ${wireframe} });
  const mat3 = new THREE.MeshStandardMaterial({ color: '#f59e0b', roughness: 0.2, metalness: 0.8, wireframe: ${wireframe} });
  const r1 = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.07, 16, 64), mat1);
  const r2 = new THREE.Mesh(new THREE.TorusGeometry(1.65, 0.06, 16, 64), mat2);
  const r3 = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.05, 16, 64), mat3);
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5, 3), new THREE.MeshStandardMaterial({ color: '#fff', emissive: '${pColor}', emissiveIntensity: 1.2 }));
  group.add(r1, r2, r3, core);
`;
        animCode = `
    r1.rotation.z += 0.02 * ${rot};
    r2.rotation.y += 0.028 * ${rot};
    r3.rotation.x += 0.035 * ${rot};
    const pulse = 1.0 + Math.sin(performance.now() * 0.005) * 0.12;
    core.scale.set(pulse, pulse, pulse);
`;
      } else if (model === 'dna') {
        setupCode = `
  const group = new THREE.Group();
  scene.add(group);
  const pairs = 32, radius = 1.2, height = 4.2, stepH = height / pairs, pitch = (Math.PI * 4) / pairs;
  const sphereMatA = new THREE.MeshStandardMaterial({ color: '${pColor}', emissive: '${pColor}', emissiveIntensity: 0.6 });
  const sphereMatB = new THREE.MeshStandardMaterial({ color: '${sColor}', emissive: '${sColor}', emissiveIntensity: 0.6 });
  const rungMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3, metalness: 0.6 });
  const nodeGeo = new THREE.SphereGeometry(0.08, 16, 16);
  for (let i = 0; i < pairs; i++) {
    const angle = i * pitch, y = (i * stepH) - (height / 2);
    const nA = new THREE.Mesh(nodeGeo, sphereMatA);
    nA.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
    const nB = new THREE.Mesh(nodeGeo, sphereMatB);
    nB.position.set(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius);
    const rung = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, radius * 2, 8), rungMat);
    rung.position.set(0, y, 0); rung.rotation.z = Math.PI / 2; rung.rotation.y = -angle;
    group.add(nA, nB, rung);
  }
`;
        animCode = `
    group.rotation.y += 0.012 * ${rot};
`;
      } else if (model === 'crystal') {
        setupCode = `
  const group = new THREE.Group();
  scene.add(group);
  const solidMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.8, 1), ${matCode});
  const wireMesh = new THREE.LineSegments(
    new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.9, 1)),
    new THREE.LineBasicMaterial({ color: '${sColor}', transparent: true, opacity: 0.9 })
  );
  group.add(solidMesh, wireMesh);
`;
        animCode = `
    group.rotation.y += 0.015 * ${rot};
    wireMesh.rotation.y -= 0.018 * ${rot};
`;
      } else if (model === 'mobius') {
        setupCode = `
  const group = new THREE.Group();
  scene.add(group);
  const uSteps = 50, vSteps = 10, pos = [], R = 1.8, width = 0.8;
  for (let i = 0; i <= uSteps; i++) {
    const u = (i / uSteps) * Math.PI * 2;
    for (let j = 0; j <= vSteps; j++) {
      const v = ((j / vSteps) - 0.5) * width;
      pos.push((R + v * Math.cos(u / 2)) * Math.cos(u), (R + v * Math.cos(u / 2)) * Math.sin(u), v * Math.sin(u / 2));
    }
  }
  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  const indices = [];
  for (let i = 0; i < uSteps; i++) {
    for (let j = 0; j < vSteps; j++) {
      const a = i * (vSteps + 1) + j, b = (i + 1) * (vSteps + 1) + j, c = (i + 1) * (vSteps + 1) + (j + 1), d = i * (vSteps + 1) + (j + 1);
      indices.push(a, b, d, b, c, d);
    }
  }
  geom.setIndex(indices);
  geom.computeVertexNormals();
  const mat = ${matCode};
  mat.side = THREE.DoubleSide;
  const mesh = new THREE.Mesh(geom, mat);
  group.add(mesh);
`;
        animCode = `
    group.rotation.z += 0.01 * ${rot};
    group.rotation.x += 0.007 * ${rot};
`;
      } else if (model === 'hopf') {
        setupCode = `
  const group = new THREE.Group();
  scene.add(group);
  const rings = [];
  for (let k = 0; k < 14; k++) {
    const th = (k / 14) * Math.PI;
    const ph = (k / 14) * Math.PI * 2;
    const rGeo = new THREE.TorusGeometry(1.4 + 0.25 * Math.sin(th), 0.035, 16, 64);
    const rMat = new THREE.MeshStandardMaterial({ color: (k%2===0)?'${pColor}':'${sColor}', roughness: 0.2, metalness: 0.5 });
    const rMesh = new THREE.Mesh(rGeo, rMat);
    rMesh.rotation.x = th; rMesh.rotation.y = ph; rMesh.rotation.z = k * 0.4;
    group.add(rMesh);
    rings.push({ mesh: rMesh, spd: 0.015 + (k%3)*0.005 });
  }
`;
        animCode = `
    group.rotation.y += 0.008 * ${rot};
    for (let i = 0; i < rings.length; i++) {
      rings[i].mesh.rotation.z += rings[i].spd * ${rot};
    }
`;
      } else if (model === 'blob') {
        setupCode = `
  const group = new THREE.Group();
  scene.add(group);
  const bGeo = new THREE.IcosahedronGeometry(1.8, 3);
  const basePos = Float32Array.from(bGeo.attributes.position.array);
  const bMesh = new THREE.Mesh(bGeo, ${matCode});
  const bWire = new THREE.Mesh(bGeo, new THREE.MeshBasicMaterial({ color: '${sColor}', wireframe: true, transparent: true, opacity: 0.3 }));
  group.add(bMesh, bWire);
`;
        animCode = `
    group.rotation.y += 0.008 * ${rot};
    const t = performance.now() * 0.002;
    const pos = bGeo.attributes.position;
    const arr = pos.array;
    for (let i = 0; i < pos.count; i++) {
      const bx = basePos[i*3], by = basePos[i*3+1], bz = basePos[i*3+2];
      const w1 = Math.sin(bx * 2.0 + t) * Math.cos(by * 1.8 + t * 0.8);
      const w2 = Math.sin(bz * 2.2 + t * 1.2) * Math.cos(bx * 1.6 - t * 0.6);
      const disp = 1.0 + (w1 + w2) * 0.22;
      arr[i*3] = bx * disp; arr[i*3+1] = by * disp; arr[i*3+2] = bz * disp;
    }
    pos.needsUpdate = true;
    bGeo.computeVertexNormals();
`;
      } else if (model === 'blackhole') {
        setupCode = `
  const group = new THREE.Group();
  scene.add(group);
  const horizon = new THREE.Mesh(new THREE.SphereGeometry(1.05, 32, 32), new THREE.MeshBasicMaterial({ color: 0x000000 }));
  const lens = new THREE.Mesh(new THREE.RingGeometry(1.08, 1.25, 64), new THREE.MeshBasicMaterial({ color: '${pColor}', side: THREE.DoubleSide }));
  const diskMesh = new THREE.Mesh(new THREE.RingGeometry(1.35, 3.8, 64, 4), new THREE.MeshStandardMaterial({ color: '${pColor}', emissive: '#f59e0b', emissiveIntensity: 0.8, side: THREE.DoubleSide, transparent: true, opacity: 0.7 }));
  group.add(horizon, lens, diskMesh);
  const jetTop = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.25, 4.0, 16), new THREE.MeshStandardMaterial({ color: '${sColor}', emissive: '${pColor}', emissiveIntensity: 2 }));
  jetTop.position.y = 2.0;
  const jetBot = jetTop.clone(); jetBot.position.y = -2.0; jetBot.rotation.z = Math.PI;
  group.add(jetTop, jetBot);
  group.rotation.x = 0.45;
`;
        animCode = `
    group.rotation.y += 0.005 * ${rot};
`;
      } else if (model === 'lotus') {
        setupCode = `
  const group = new THREE.Group();
  scene.add(group);
  const petals = [];
  const pGeo = new THREE.ConeGeometry(0.24, 1.2, 5);
  pGeo.scale(1.0, 1.0, 0.22);
  pGeo.translate(0, 0.6, 0);
  for (let i = 0; i < 40; i++) {
    const ang = i * 2.39996;
    const prog = i / 40;
    const r = 0.25 + Math.sqrt(prog) * 1.5;
    const y = prog * 0.6 - 0.3;
    const pMat = new THREE.MeshStandardMaterial({ color: (i%2===0)?'${pColor}':'${sColor}', roughness: 0.3, metalness: 0.5 });
    const p = new THREE.Mesh(pGeo, pMat);
    p.position.set(Math.cos(ang)*r, y, Math.sin(ang)*r);
    p.rotation.y = -ang - Math.PI/2;
    const baseTilt = 0.35 + prog * 0.85;
    p.rotation.z = baseTilt;
    group.add(p);
    petals.push({ mesh: p, baseTilt, idx: i });
  }
`;
        animCode = `
    group.rotation.y += 0.01 * ${rot};
    const t = performance.now() * 0.002;
    for (let i = 0; i < petals.length; i++) {
      petals[i].mesh.rotation.z = petals[i].baseTilt + Math.sin(t * 2 + petals[i].idx * 0.14) * 0.22;
    }
`;
      } else if (model === 'octaplex') {
        setupCode = `
  const group = new THREE.Group();
  scene.add(group);
  const octVerts = [];
  for (let i = 0; i < 4; i++) {
    for (let s of [-2, 2]) { const v = [0,0,0,0]; v[i] = s; octVerts.push(v); }
  }
  for (let i = 0; i < 16; i++) {
    octVerts.push([(i&1)?1:-1, (i&2)?1:-1, (i&4)?1:-1, (i&8)?1:-1]);
  }
  const octEdges = [];
  for (let i = 0; i < octVerts.length; i++) {
    for (let j = i + 1; j < octVerts.length; j++) {
      let d2 = 0;
      for (let k = 0; k < 4; k++) { const df = octVerts[i][k] - octVerts[j][k]; d2 += df * df; }
      if (Math.abs(d2 - 4) < 1e-5) octEdges.push([i, j]);
    }
  }
  function projectOct(v, tx, ty, tz) {
    let [x,y,z,w] = v;
    let cx = Math.cos(tx), sx = Math.sin(tx), x1 = x*cx - w*sx, w1 = x*sx + w*cx;
    let cy = Math.cos(ty), sy = Math.sin(ty), y2 = y*cy - w1*sy, w2 = y*sy + w1*cy;
    let cz = Math.cos(tz), sz = Math.sin(tz), z3 = z*cz - w2*sz, w3 = z*sz + w2*cz;
    let sc = 2.0 / Math.max(0.2, (3.2 - w3));
    return { x: x1 * sc, y: y2 * sc, z: z3 * sc };
  }
  const nMat = new THREE.MeshStandardMaterial({ color: '${sColor}', emissive: '${pColor}', emissiveIntensity: 1.0 });
  const nGeo = new THREE.SphereGeometry(0.08, 16, 16);
  const octNodes = [];
  for (let i = 0; i < 24; i++) {
    const m = new THREE.Mesh(nGeo, nMat);
    group.add(m);
    octNodes.push(m);
  }
  const octLines = [];
  const lMat = new THREE.LineBasicMaterial({ color: '${sColor}', transparent: true, opacity: 0.8 });
  for (let i = 0; i < octEdges.length; i++) {
    const [a, b] = octEdges[i];
    const lg = new THREE.BufferGeometry();
    lg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
    const line = new THREE.Line(lg, lMat);
    group.add(line);
    octLines.push({ line, a, b });
  }
  let oXW = 0, oYW = 0, oZW = 0;
`;
        animCode = `
    oXW += 0.015 * ${hyper};
    oYW += 0.012 * ${hyper};
    oZW += 0.008 * ${hyper};
    group.rotation.y += 0.005 * ${rot};
    const prj = [];
    for (let i = 0; i < 24; i++) {
      const p = projectOct(octVerts[i], oXW, oYW, oZW);
      prj.push(p);
      octNodes[i].position.set(p.x, p.y, p.z);
    }
    for (let i = 0; i < octLines.length; i++) {
      const { line, a, b } = octLines[i];
      const pos = line.geometry.attributes.position.array;
      pos[0] = prj[a].x; pos[1] = prj[a].y; pos[2] = prj[a].z;
      pos[3] = prj[b].x; pos[4] = prj[b].y; pos[5] = prj[b].z;
      line.geometry.attributes.position.needsUpdate = true;
    }
`;
      } else if (model === 'neural') {
        setupCode = `
  const group = new THREE.Group();
  scene.add(group);
  const nNodes = [], nEdges = [];
  const sGeo = new THREE.SphereGeometry(0.1, 16, 16);
  const sMat = new THREE.MeshStandardMaterial({ color: '${pColor}', emissive: '${pColor}', emissiveIntensity: 0.8 });
  for (let i = 0; i < 26; i++) {
    const side = (i%2===0)?1:-1;
    const th = Math.random() * Math.PI, ph = Math.random() * Math.PI * 2, r = 1.0 + Math.random() * 1.2;
    const x = side * (0.5 + Math.abs(Math.sin(th)*Math.cos(ph)*r));
    const y = Math.cos(th)*r*0.8, z = Math.sin(th)*Math.sin(ph)*r;
    const m = new THREE.Mesh(sGeo, sMat.clone());
    m.position.set(x, y, z);
    group.add(m);
    nNodes.push({ mesh: m, x, y, z });
  }
  const lMat = new THREE.LineBasicMaterial({ color: '${pColor}', transparent: true, opacity: 0.4 });
  for (let i = 0; i < nNodes.length; i++) {
    for (let j = i + 1; j < nNodes.length; j++) {
      const d = Math.hypot(nNodes[i].x-nNodes[j].x, nNodes[i].y-nNodes[j].y, nNodes[i].z-nNodes[j].z);
      if (d < 1.7) {
        const bg = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(nNodes[i].x, nNodes[i].y, nNodes[i].z),
          new THREE.Vector3(nNodes[j].x, nNodes[j].y, nNodes[j].z)
        ]);
        group.add(new THREE.Line(bg, lMat));
        nEdges.push({ a: i, b: j });
      }
    }
  }
  const pulses = [];
  const pGeo = new THREE.SphereGeometry(0.045, 8, 8);
  const pMat = new THREE.MeshBasicMaterial({ color: '#ffffff' });
  for (let i = 0; i < 16; i++) {
    const ed = nEdges[Math.floor(Math.random() * nEdges.length)];
    const pm = new THREE.Mesh(pGeo, pMat);
    group.add(pm);
    pulses.push({ mesh: pm, edge: ed, prog: Math.random(), spd: 0.015 + Math.random()*0.02 });
  }
`;
        animCode = `
    group.rotation.y += 0.008 * ${rot};
    for (let i = 0; i < pulses.length; i++) {
      const p = pulses[i];
      p.prog += p.spd * ${rot};
      if (p.prog >= 1.0) {
        p.prog = 0;
        nNodes[p.edge.b].mesh.material.emissiveIntensity = 2.4;
      }
      p.mesh.position.lerpVectors(nNodes[p.edge.a].mesh.position, nNodes[p.edge.b].mesh.position, p.prog);
    }
`;
      } else if (model === 'klein') {
        setupCode = `
  const group = new THREE.Group();
  scene.add(group);
  const uSteps = 40, vSteps = 20, pos = [], R = 1.8, r = 0.75;
  for (let i = 0; i <= uSteps; i++) {
    const u = (i / uSteps) * Math.PI * 2;
    for (let j = 0; j <= vSteps; j++) {
      const v = (j / vSteps) * Math.PI * 2;
      const x4 = (R + r * Math.cos(v)) * Math.cos(u);
      const y4 = (R + r * Math.cos(v)) * Math.sin(u);
      const z4 = r * Math.sin(v) * Math.cos(u / 2);
      const w4 = r * Math.sin(v) * Math.sin(u / 2);
      const sc = 2.0 / Math.max(0.18, 2.6 - w4);
      pos.push(x4 * sc * 0.75, y4 * sc * 0.75, z4 * sc * 0.75);
    }
  }
  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  const indices = [];
  for (let i = 0; i < uSteps; i++) {
    for (let j = 0; j < vSteps; j++) {
      const a = i * (vSteps + 1) + j, b = (i + 1) * (vSteps + 1) + j, c = (i + 1) * (vSteps + 1) + (j + 1), d = i * (vSteps + 1) + (j + 1);
      indices.push(a, b, d, b, c, d);
    }
  }
  geom.setIndex(indices);
  geom.computeVertexNormals();
  const mat = ${matCode};
  mat.side = THREE.DoubleSide;
  group.add(new THREE.Mesh(geom, mat));
`;
        animCode = `
    group.rotation.y += 0.012 * ${rot};
`;
      } else if (model === 'calabi') {
        setupCode = `
  const group = new THREE.Group();
  scene.add(group);
  const n = 5, uSteps = 24, vSteps = 12, pos = [], indices = [];
  let vc = 0;
  for (let k = 0; k < n; k++) {
    const alpha = (k / n) * Math.PI * 2, start = vc;
    for (let i = 0; i <= uSteps; i++) {
      const u = (i / uSteps) * Math.PI * 2 - Math.PI;
      for (let j = 0; j <= vSteps; j++) {
        const v = (j / vSteps) * Math.PI - Math.PI / 2;
        const x = 1.6 * (Math.cos(u)*Math.cos(v)*Math.cos(alpha) - Math.sin(u)*Math.sin(v)*Math.sin(alpha)) * Math.cos(2*u/5);
        const y = 1.6 * (Math.cos(u)*Math.cos(v)*Math.sin(alpha) + Math.sin(u)*Math.sin(v)*Math.cos(alpha)) * Math.sin(2*u/5);
        const z = 1.6 * Math.sin(u)*Math.cos(v) * Math.cos(3*v/5);
        pos.push(x, y, z);
        vc++;
      }
    }
    for (let i = 0; i < uSteps; i++) {
      for (let j = 0; j < vSteps; j++) {
        const a = start + i * (vSteps + 1) + j, b = start + (i + 1) * (vSteps + 1) + j, c = start + (i + 1) * (vSteps + 1) + (j + 1), d = start + i * (vSteps + 1) + (j + 1);
        indices.push(a, b, d, b, c, d);
      }
    }
  }
  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geom.setIndex(indices);
  geom.computeVertexNormals();
  const mat = ${matCode};
  mat.side = THREE.DoubleSide;
  group.add(new THREE.Mesh(geom, mat));
`;
        animCode = `
    group.rotation.y += 0.008 * ${rot};
    group.rotation.z += 0.006 * ${rot};
`;
      } else if (model === 'lorenz') {
        setupCode = `
  const group = new THREE.Group();
  scene.add(group);
  let lx = 0.1, ly = 0, lz = 0;
  const pos = [], cols = [], c1 = new THREE.Color('${pColor}'), c2 = new THREE.Color('${sColor}');
  for (let i = 0; i < 2000; i++) {
    lx += 10 * (ly - lx) * 0.007;
    ly += (lx * (28 - lz) - ly) * 0.007;
    lz += (lx * ly - (8/3) * lz) * 0.007;
    pos.push(lx * 0.08, (lz - 25) * 0.08, ly * 0.08);
    const c = c1.clone().lerp(c2, i / 2000);
    cols.push(c.r, c.g, c.b);
  }
  const lGeo = new THREE.BufferGeometry();
  lGeo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  lGeo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
  group.add(new THREE.Line(lGeo, new THREE.LineBasicMaterial({ vertexColors: true, linewidth: 2 })));
`;
        animCode = `
    group.rotation.y += 0.01 * ${rot};
`;
      }

      // Append full vertex deformation routines to injected snippet setupCode
      setupCode += `
  // Capture base vertex positions for dynamic deformation
  group.traverse(child => {
    if (child.position) child.userData.basePos = child.position.clone();
    if (child.geometry && child.geometry.attributes && child.geometry.attributes.position) {
      child.geometry.userData.origPositions = new Float32Array(child.geometry.attributes.position.array);
      if (child.geometry.attributes.normal) {
        child.geometry.userData.origNormals = new Float32Array(child.geometry.attributes.normal.array);
      } else if (child.isMesh && child.geometry.computeVertexNormals) {
        child.geometry.computeVertexNormals();
        if (child.geometry.attributes.normal) child.geometry.userData.origNormals = new Float32Array(child.geometry.attributes.normal.array);
      }
    }
  });

  let currentExp = ${explode.toFixed(2)};
  let currentRealDef = ${realDeform.toFixed(2)};
  let currentDefMode = '${realDeformMode}';
  let currentWSlice = ${wSlice.toFixed(2)};

  function applyDeform(exp, realDef, defMode, wSlice) {
    const hasExp = exp > 0.001;
    const hasDef = realDef > 0.001;
    const hasW = Math.abs(wSlice) > 0.001;
    group.traverse(child => {
      if (child.userData && child.userData.basePos) {
        const bp = child.userData.basePos;
        const dist = Math.hypot(bp.x, bp.y, bp.z);
        if (dist > 0.04) {
          let pos = bp.clone();
          const dir = bp.clone().normalize();
          if (hasExp) pos.addScaledVector(dir, exp * 1.5);
          if (hasDef) {
            if (defMode === 'twist') {
              const th = bp.y * (realDef * 1.25);
              const c = Math.cos(th), s = Math.sin(th);
              pos.x = bp.x * c - bp.z * s;
              pos.z = bp.x * s + bp.z * c;
            } else if (defMode === 'wave') {
              pos.y += Math.sin(dist * 3.5) * (realDef * 0.55);
            } else if (defMode === 'pinch') {
              const f = Math.max(0.1, 1.0 - (1.0 / (1.0 + bp.y * bp.y * 1.5)) * (realDef * 0.65));
              pos.x *= f; pos.z *= f;
            } else {
              const th = bp.y * (realDef * 0.9);
              const c = Math.cos(th), s = Math.sin(th);
              pos.x = bp.x * c - bp.z * s;
              pos.z = bp.x * s + bp.z * c;
            }
          }
          child.position.copy(pos);
        } else {
          child.position.copy(bp);
        }
      }
      if (child.geometry && child.geometry.userData && child.geometry.userData.origPositions) {
        const orig = child.geometry.userData.origPositions;
        const norms = child.geometry.userData.origNormals;
        const posAttr = child.geometry.attributes.position;
        const pos = posAttr.array;
        const count = orig.length / 3;
        if (!hasExp && !hasDef && !hasW) {
          for (let i = 0; i < orig.length; i++) pos[i] = orig[i];
        } else {
          for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            let x = orig[i3], y = orig[i3 + 1], z = orig[i3 + 2];

            // A. Real Geometric Deformation (Twist / Wave / Pinch / Vortex)
            if (hasDef) {
              if (defMode === 'twist') {
                const theta = y * (realDef * 1.25);
                const c = Math.cos(theta), s = Math.sin(theta);
                const rx = x * c - z * s;
                const rz = x * s + z * c;
                x = rx; z = rz;
              } else if (defMode === 'wave') {
                const r = Math.hypot(x, z);
                const dy = Math.sin(r * 3.5) * (realDef * 0.55) + Math.cos(x * 2.5) * (realDef * 0.25);
                const dx = Math.sin(y * 3.0) * (realDef * 0.35);
                const dz = Math.cos(y * 3.0) * (realDef * 0.35);
                x += dx; y += dy; z += dz;
              } else if (defMode === 'pinch') {
                const factor = Math.max(0.1, 1.0 - (1.0 / (1.0 + y * y * 1.5)) * (realDef * 0.65));
                x *= factor; z *= factor;
                y *= (1.0 + realDef * 0.25);
              } else {
                const r = Math.hypot(x, z);
                const theta = y * (realDef * 0.9) + Math.sin(r * 2.0) * (realDef * 0.45);
                const c = Math.cos(theta), s = Math.sin(theta);
                const rx = x * c - z * s;
                const rz = x * s + z * c;
                const pinch = Math.max(0.15, 1.0 + Math.sin(y * 2.2) * (realDef * 0.35));
                x = rx * pinch; z = rz * pinch;
                y += Math.cos(rx * 2.0) * (realDef * 0.25);
              }
            }

            // B. Quantum Hyper-Inflation / Bulge
            if (hasExp) {
              let nx, ny, nz;
              if (norms && norms.length > i3 + 2) {
                nx = norms[i3]; ny = norms[i3 + 1]; nz = norms[i3 + 2];
              } else {
                const l = Math.hypot(x, y, z) || 1;
                nx = x / l; ny = y / l; nz = z / l;
              }
              const jitter = Math.sin(i * 37.11 + x * 15.7) * 0.22;
              const factor = exp * (1.2 + jitter);
              x += nx * factor; y += ny * factor; z += nz * factor;
            }

            // C. 4D Tomographic W-Slice
            if (hasW) {
              const phase = Math.sin(x * 1.4 + y * 1.4 + wSlice * 2.2);
              const wFactor = 1.0 + phase * (wSlice * 0.35);
              x *= wFactor; y *= wFactor;
              z += Math.cos(z * 1.4 + wSlice * 2.5) * (wSlice * 0.35);
            }

            pos[i3] = x; pos[i3 + 1] = y; pos[i3 + 2] = z;
          }
        }
        posAttr.needsUpdate = true;
        if (child.isMesh && child.geometry.computeVertexNormals) child.geometry.computeVertexNormals();
      }
    });
  }

  // Apply active deformation state
  applyDeform(currentExp, currentRealDef, currentDefMode, currentWSlice);
`;

      if (camMode === 'flyby') {
        animCode += `
    const tFly = performance.now() * 0.0007;
    camera.position.x = Math.sin(tFly) * 5.2;
    camera.position.y = Math.cos(tFly * 0.6) * 3.4;
    camera.position.z = Math.cos(tFly) * 5.2 + Math.sin(tFly * 1.5) * 1.6;
    camera.lookAt(0, 0, 0);
`;
      } else if (camMode === 'matrix') {
        animCode += `
    const tMat = performance.now() * 0.0003;
    camera.position.x = Math.cos(tMat) * 6.8;
    camera.position.y = Math.sin(performance.now() * 0.0007) * 2.0 + 0.8;
    camera.position.z = Math.sin(tMat) * 6.8;
    camera.lookAt(0, 0, 0);
`;
      } else if (camMode === 'spiral') {
        animCode += `
    const tSp = performance.now() * 0.0005;
    const radSp = 4.2 + Math.sin(tSp * 0.5) * 2.2;
    camera.position.x = Math.cos(tSp * 2) * radSp;
    camera.position.y = Math.sin(tSp * 1.2) * 2.6;
    camera.position.z = Math.sin(tSp * 2) * radSp;
    camera.lookAt(0, 0, 0);
`;
      }

      if (audioReactive) {
        animCode += `
    const beat = Math.pow(Math.sin(performance.now() * 0.006702), 10) * 0.18;
    group.scale.set(1.0 + beat, 1.0 + beat, 1.0 + beat);
`;
      }

      return { setupCode, animCode };
    },

    generateStandaloneSnippet: function(mode = 'hero') {
      const model = this.state.activeModel;
      const matType = this.state.activeMaterial;
      const pColor = this.state.primaryColor;
      const sColor = this.state.secondaryColor;
      const rot = this.state.rotSpeed;
      const hyper = this.state.hyperSpeed;
      const wireframe = this.state.wireframe;
      const audioReactive = this.state.audioReactive;
      const cursorWarp = this.state.cursorWarp;
      const explode = this.state.explode;
      const wSlice = this.state.wSlice;
      const camMode = this.state.camMode;
      const fxScanlines = this.state.fxScanlines;
      const fxChromatic = this.state.fxChromatic;
      const fxBloom = this.state.fxBloom;
      const modelUpper = model.toUpperCase();
      const uid = Math.random().toString(36).slice(2, 7);

      const realDeform = this.state.realDeform || 0;
      const realDeformMode = this.state.realDeformMode || 'twist';
      const { setupCode, animCode } = this._getModelSnippetCode(
        model, matType, pColor, sColor, rot, hyper, wireframe, audioReactive, cursorWarp,
        explode, wSlice, camMode, fxScanlines, fxChromatic, fxBloom, realDeform, realDeformMode
      );

      const scanlineStyle = fxScanlines
        ? 'position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(0deg,rgba(0,0,0,0.22),rgba(0,0,0,0.22) 2px,transparent 2px,transparent 4px);z-index:5;'
        : '';
      const chromaticFilter = fxChromatic
        ? 'filter:drop-shadow(-2px 0 0 rgba(236,72,153,0.5)) drop-shadow(2px 0 0 rgba(56,189,248,0.5));'
        : '';

      if (mode === 'badge') {
        return `<!-- ─── ULTRA 3D/4D PROCEDURAL FLOATING BADGE: START ─── -->
<div id="ultra-3d-floating-badge-${uid}" style="position:fixed;bottom:24px;left:24px;width:220px;height:230px;z-index:9998;border-radius:20px;background:rgba(15,23,42,0.88);backdrop-filter:blur(14px);border:1px solid rgba(56,189,248,0.4);box-shadow:0 15px 45px rgba(0,0,0,0.7);overflow:hidden;display:flex;flex-direction:column;cursor:pointer;${chromaticFilter}" title="Click to Explode / Reassemble 3D Geometry">
  <div style="display:flex;justify-content:space-between;align-items:center;padding:7px 12px;background:rgba(255,255,255,0.06);border-bottom:1px solid rgba(255,255,255,0.08)">
    <span style="font-size:0.72rem;font-weight:800;color:#38bdf8;font-family:system-ui,sans-serif;letter-spacing:0.5px">🌌 3D ${modelUpper}</span>
    <button onclick="event.stopPropagation();document.getElementById('ultra-3d-floating-badge-${uid}').style.display='none'" style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:0.85rem">✕</button>
  </div>
  <div id="ultra-3d-badge-canvas-${uid}" style="flex:1;width:100%;height:100%;position:relative">${fxScanlines ? `<div style="${scanlineStyle}"></div>` : ''}</div>
  <div style="padding:4px 10px;background:rgba(0,0,0,0.4);display:flex;justify-content:space-between;align-items:center;font-size:0.65rem;color:#94a3b8">
    <span>💥 Click to Shatter</span>
    <span id="ultra-badge-status-${uid}" style="color:#38bdf8;font-weight:700">${Math.round(explode * 40)}%</span>
  </div>
</div>
<script>
(function() {
  function initUltraBadge() {
    const THREE = (typeof window.THREE !== 'undefined') ? window.THREE : ((typeof window.parent !== 'undefined' && window.parent.THREE) ? window.parent.THREE : null);
    if (!THREE) {
      if (!window._loadingUltraThree) {
        window._loadingUltraThree = true;
        const scr = document.createElement('script');
        scr.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        scr.onload = function() { initUltraBadge(); };
        document.head.appendChild(scr);
      } else {
        setTimeout(initUltraBadge, 100);
      }
      return;
    }
    const container = document.getElementById('ultra-3d-badge-canvas-${uid}');
    if (!container) return;
    const w = container.clientWidth || 220, h = container.clientHeight || 170;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 50);
    camera.position.z = 6.2;
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const pLight = new THREE.PointLight(0x38bdf8, ${fxBloom ? 3.5 : 2.0}, 20);
    pLight.position.set(3, 4, 5);
    scene.add(pLight);
    ${setupCode}
    let isBadgeExploded = (${explode} > 0.1);
    const badgeWrap = document.getElementById('ultra-3d-floating-badge-${uid}');
    const badgeStatus = document.getElementById('ultra-badge-status-${uid}');
    if (badgeWrap) {
      badgeWrap.addEventListener('click', () => {
        isBadgeExploded = !isBadgeExploded;
        const target = isBadgeExploded ? 1.6 : 0.0;
        applyDeform(target, currentWSlice);
        if (badgeStatus) badgeStatus.textContent = isBadgeExploded ? '100%' : '0%';
      });
    }
    function anim() {
      requestAnimationFrame(anim);
      ${animCode}
      renderer.render(scene, camera);
    }
    anim();
  }
  initUltraBadge();
})();
</script>
<!-- ─── ULTRA 3D/4D PROCEDURAL FLOATING BADGE: END ─── -->`;
      } else if (mode === 'showcase') {
        return `<!-- ─── ULTRA 3D/4D INTERACTIVE SHOWCASE CARD: START ─── -->
<div id="ultra-3d-showcase-card-${uid}" style="max-width:460px;margin:28px auto;border-radius:24px;background:linear-gradient(145deg,rgba(15,23,42,0.9),rgba(30,41,59,0.95));border:1px solid rgba(56,189,248,0.3);box-shadow:0 25px 60px rgba(0,0,0,0.5);overflow:hidden;font-family:system-ui,sans-serif;color:#fff;${chromaticFilter}">
  <div style="padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.08);display:flex;justify-content:space-between;align-items:center">
    <div>
      <div style="font-size:0.72rem;color:#38bdf8;font-weight:800;letter-spacing:1px;text-transform:uppercase">Procedural 3D/4D Sculptor</div>
      <h3 style="margin:4px 0 0 0;font-size:1.2rem;font-weight:900">Quantum ${modelUpper}</h3>
    </div>
    <span style="font-size:1.4rem">🌌</span>
  </div>
  <div id="ultra-3d-showcase-viewport-${uid}" style="width:100%;height:280px;position:relative;background:radial-gradient(circle at 50% 50%,#0f172a 0%,#020617 100%)">${fxScanlines ? `<div style="${scanlineStyle}"></div>` : ''}</div>
  <div style="padding:10px 18px;background:rgba(15,23,42,0.92);border-top:1px solid rgba(255,255,255,0.08);display:flex;flex-direction:column;gap:6px">
    <div style="display:flex;align-items:center;gap:10px">
      <span style="font-size:0.72rem;color:#ec4899;font-weight:700">🌪️ Real Deform:</span>
      <input type="range" min="0" max="2.0" step="0.05" value="${realDeform.toFixed(2)}" oninput="if(window['ultraRealDef_${uid}'])window['ultraRealDef_${uid}'](this.value)" style="flex:1;accent-color:#ec4899;cursor:pointer">
      <span id="ultra-val-realdef-${uid}" style="font-size:0.72rem;color:#f472b6;font-weight:700">${Math.round(realDeform * 50)}%</span>
    </div>
    <div style="display:flex;align-items:center;gap:10px">
      <span style="font-size:0.72rem;color:#f59e0b;font-weight:700">🎈 Hyper-Bulge:</span>
      <input type="range" min="0" max="2.5" step="0.05" value="${explode.toFixed(2)}" oninput="if(window['ultraDeform_${uid}'])window['ultraDeform_${uid}'](this.value)" style="flex:1;accent-color:#f59e0b;cursor:pointer">
      <span id="ultra-val-deform-${uid}" style="font-size:0.72rem;color:#fcd34d;font-weight:700">${Math.round(explode * 40)}%</span>
    </div>
    <div style="display:flex;gap:4px">
      <button onclick="if(window['ultraDefMode_${uid}'])window['ultraDefMode_${uid}']('twist')" style="font-size:0.65rem;padding:2px 7px;background:rgba(236,72,153,0.2);border:1px solid #ec4899;color:#f472b6;border-radius:4px;cursor:pointer">🌪️ Twist</button>
      <button onclick="if(window['ultraDefMode_${uid}'])window['ultraDefMode_${uid}']('wave')" style="font-size:0.65rem;padding:2px 7px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#94a3b8;border-radius:4px;cursor:pointer">🌊 Wave</button>
      <button onclick="if(window['ultraDefMode_${uid}'])window['ultraDefMode_${uid}']('pinch')" style="font-size:0.65rem;padding:2px 7px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#94a3b8;border-radius:4px;cursor:pointer">⏳ Pinch</button>
      <button onclick="if(window['ultraDefMode_${uid}'])window['ultraDefMode_${uid}']('vortex')" style="font-size:0.65rem;padding:2px 7px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#94a3b8;border-radius:4px;cursor:pointer">🌀 Vortex</button>
    </div>
  </div>
  <div style="padding:12px 20px;background:rgba(0,0,0,0.3);display:flex;justify-content:space-between;align-items:center">
    <div style="font-size:0.72rem;color:#94a3b8">Procedural 60fps WebGL</div>
    <span style="font-size:0.72rem;color:#38bdf8;font-weight:700">● Live Dynamic Hyper-Geometry</span>
  </div>
</div>
<script>
(function() {
  function initUltraShowcase() {
    const THREE = (typeof window.THREE !== 'undefined') ? window.THREE : ((typeof window.parent !== 'undefined' && window.parent.THREE) ? window.parent.THREE : null);
    if (!THREE) {
      if (!window._loadingUltraThree) {
        window._loadingUltraThree = true;
        const scr = document.createElement('script');
        scr.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        scr.onload = function() { initUltraShowcase(); };
        document.head.appendChild(scr);
      } else {
        setTimeout(initUltraShowcase, 100);
      }
      return;
    }
    const container = document.getElementById('ultra-3d-showcase-viewport-${uid}');
    if (!container) return;
    const w = container.clientWidth || 440, h = 280;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 50);
    camera.position.z = 6.2;
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dirLight = new THREE.DirectionalLight(0x38bdf8, ${fxBloom ? 2.5 : 1.5});
    dirLight.position.set(4, 5, 6);
    scene.add(dirLight);
    ${setupCode}
    window['ultraDeform_${uid}'] = function(val) {
      currentExp = parseFloat(val);
      applyDeform(currentExp, currentRealDef, currentDefMode, currentWSlice);
      const lbl = document.getElementById('ultra-val-deform-${uid}');
      if (lbl) lbl.textContent = Math.round(currentExp * 40) + '%';
    };
    window['ultraRealDef_${uid}'] = function(val) {
      currentRealDef = parseFloat(val);
      applyDeform(currentExp, currentRealDef, currentDefMode, currentWSlice);
      const lbl = document.getElementById('ultra-val-realdef-${uid}');
      if (lbl) lbl.textContent = Math.round(currentRealDef * 50) + '%';
    };
    window['ultraDefMode_${uid}'] = function(m) {
      currentDefMode = m;
      applyDeform(currentExp, currentRealDef, currentDefMode, currentWSlice);
    };
    function anim() {
      requestAnimationFrame(anim);
      ${animCode}
      renderer.render(scene, camera);
    }
    anim();
  }
  initUltraShowcase();
})();
</script>
<!-- ─── ULTRA 3D/4D INTERACTIVE SHOWCASE CARD: END ─── -->`;
      } else {
        return `<!-- ─── ULTRA 3D/4D PROCEDURAL HERO BACKGROUND: START ─── -->
<div id="ultra-3d-hero-bg-${uid}" style="position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:0;opacity:0.42;overflow:hidden;${chromaticFilter}">${fxScanlines ? `<div style="${scanlineStyle}"></div>` : ''}</div>
<div id="ultra-3d-bg-badge-${uid}" style="position:fixed;bottom:16px;left:16px;z-index:9999;display:flex;align-items:center;gap:10px;background:rgba(15,23,42,0.85);backdrop-filter:blur(10px);border:1px solid rgba(56,189,248,0.3);border-radius:20px;padding:5px 14px;font-family:system-ui,sans-serif;font-size:0.75rem;color:#38bdf8;box-shadow:0 10px 25px rgba(0,0,0,0.5)">
  <span>🌌 3D/4D ${modelUpper} Background (${Math.round(explode * 40)}% Exploded)</span>
  <button onclick="var b=document.getElementById('ultra-3d-hero-bg-${uid}');var c=document.getElementById('ultra-3d-bg-badge-${uid}');if(b)b.remove();if(c)c.remove();" style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:0.85rem;padding:0 0 0 4px" title="Remove 3D Background">✕</button>
</div>
<script>
(function() {
  function initUltraHero() {
    const THREE = (typeof window.THREE !== 'undefined') ? window.THREE : ((typeof window.parent !== 'undefined' && window.parent.THREE) ? window.parent.THREE : null);
    if (!THREE) {
      if (!window._loadingUltraThree) {
        window._loadingUltraThree = true;
        const scr = document.createElement('script');
        scr.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        scr.onload = function() { initUltraHero(); };
        document.head.appendChild(scr);
      } else {
        setTimeout(initUltraHero, 100);
      }
      return;
    }
    const container = document.getElementById('ultra-3d-hero-bg-${uid}');
    if (!container) return;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 7.5;
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dLight = new THREE.DirectionalLight(0x38bdf8, ${fxBloom ? 2.2 : 1.2});
    dLight.position.set(5, 10, 7);
    scene.add(dLight);
    ${setupCode}
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
    // Interactive mouse deformation on background
    window.addEventListener('mousemove', (e) => {
      const norm = (e.clientY / window.innerHeight) * 0.4;
      applyDeform(currentExp + norm, currentWSlice);
    });
    function anim() {
      requestAnimationFrame(anim);
      ${animCode}
      renderer.render(scene, camera);
    }
    anim();
  }
  initUltraHero();
})();
</script>
<!-- ─── ULTRA 3D/4D PROCEDURAL HERO BACKGROUND: END ─── -->`;
      }
    },

    inject: function(mode = 'hero') {
      const snippet = this.generateStandaloneSnippet(mode);
      const marker = /<!-- ─── ULTRA 3D\/4D PROCEDURAL [^>]+: START ─── -->[\s\S]*?<!-- ─── ULTRA 3D\/4D PROCEDURAL [^>]+: END ─── -->/g;
      const label = mode === 'badge' ? 'Floating 3D Badge' : (mode === 'showcase' ? '3D Showcase Card' : '3D Hero Background');
      _injectCodeToActiveApp(snippet, marker, label);
    },

    copySnippet: function(mode = 'hero') {
      const snippet = this.generateStandaloneSnippet(mode);
      const label = mode === 'badge' ? '3D Floating Badge' : (mode === 'showcase' ? '3D Showcase Card' : '3D Hero Background');
      _copyCode(snippet, label);
    }
  };

  console.log('🌌 Ultra 3D/4D Hyper-Model Sculptor & Code Engine v2.0 (15 Models + Shatter + W-Slice + Flight Cam + Triple Export) loaded.');
})();
