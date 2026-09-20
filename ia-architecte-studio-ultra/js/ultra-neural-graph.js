// ══════════════════════════════════════════════════════════════════════════════
// IA ARCHITECTE STUDIO ULTRA — NEURAL GRAPH & 3D ARCHITECTURE MIND-MAP (v1.0)
// UltraNeuralGraphStudio (modal-neural-graph-studio)
// 100% Client-Side Three.js WebGL & 3D Force Synapse Engine
// Volumetric 3D Software Architecture Nodes with Flowing Laser Synapses
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
      console.log('[UltraNeuralGraphStudio]', msg);
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
          ? `✨ ${label || 'Graphe Neuronal 3D'} injecté dans votre projet avec succès !`
          : `✨ ${label || '3D Neural Graph'} successfully injected into your project!`,
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

  const UltraNeuralGraphStudio = {
    isOpen: false,
    currentTheme: 'cyan',
    currentPreset: 'transformer',
    activeNodeId: 'input_emb',
    pulseSpeed: 1.0,

    scene: null,
    camera: null,
    renderer: null,
    animFrameId: null,
    graphGroup: null,
    laserLines: [],
    synapseParticles: [],
    nodeMeshes: {},
    animTime: 0,

    themeColors: {
      cyan: { hex: 0x00f3ff, css: '#00f3ff' },
      purple: { hex: 0xa855f7, css: '#a855f7' },
      emerald: { hex: 0x10b981, css: '#10b981' },
      amber: { hex: 0xf59e0b, css: '#f59e0b' }
    },

    nodes: [
      { id: 'ui', name: 'UI & DOM Viewports', type: 'Client Interface', col: 0x38bdf8, pos: [0, 1.8, 0], desc: 'Reactive WebGL + Canvas + HTML5 Component Tree' },
      { id: 'auth', name: 'Security Vault & Auth', type: 'Zero-Trust Gate', col: 0xef4444, pos: [-2.2, 0.9, -0.6], desc: 'WebAuthn, Cryptographic Signatures & JWT Sessions' },
      { id: 'db', name: 'Visual Data Engine', type: 'Persistent Store', col: 0x10b981, pos: [2.2, 0.9, -0.4], desc: 'LocalStorage, IndexedDB & Virtual JSON Collections' },
      { id: 'pay', name: 'Fintech & Checkout', type: 'Monetization Rail', col: 0xf59e0b, pos: [-1.8, -1.2, 0.5], desc: 'Stripe Simulator, 3D Card Engine & Escrow Verification' },
      { id: 'api', name: 'External Cloud APIs', type: 'Telemetry Bridge', col: 0x8b5cf6, pos: [1.8, -1.2, 0.6], desc: 'Live Weather Radar, Crypto Cointickers & Currency Rates' },
      { id: 'audio', name: 'Procedural Web Audio', type: 'Sonic Layer', col: 0xec4899, pos: [0, -1.9, -0.8], desc: 'Synthesizer, 32-Band Spectrum & Spatial Soundscapes' },
      { id: 'ai', name: 'Neural AI Core', type: 'Cognitive Engine', col: 0x06b6d4, pos: [0, 0, 0], desc: 'Autonomous Code Synthesizer, Speech AI & Co-Pilot' }
    ],

    links: [
      { from: 'ui', to: 'ai' },
      { from: 'ui', to: 'auth' },
      { from: 'ui', to: 'db' },
      { from: 'ai', to: 'db' },
      { from: 'ai', to: 'api' },
      { from: 'ai', to: 'audio' },
      { from: 'pay', to: 'auth' },
      { from: 'pay', to: 'db' },
      { from: 'api', to: 'db' },
      { from: 'ui', to: 'audio' }
    ],

    open() {
      const modal = document.getElementById('modal-neural-graph-studio');
      if (!modal) {
        console.error('[UltraNeuralGraphStudio] modal-neural-graph-studio not found');
        return;
      }
      this.isOpen = true;
      modal.classList.add('show', 'active');
      modal.style.display = 'flex';
      _sound('open');

      if (!this.currentPreset) this.currentPreset = 'transformer';
      this.loadPreset(this.currentPreset);

      setTimeout(() => {
        this.initThree();
        if (this.nodes && this.nodes.length > 0) this.selectNode(this.nodes[0].id);
      }, 60);

      _toast(_isFr() ? '🌌 Studio Graphe Neuronal 3D activé !' : '🌌 3D Neural Architecture Mind-Graph Studio activated!', 'info');
    },

    close() {
      const modal = document.getElementById('modal-neural-graph-studio');
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

    initThree() {
      const container = document.getElementById('neural-graph-viewport');
      if (!container) return;

      if (this.renderer) {
        try {
          if (container.contains(this.renderer.domElement)) container.removeChild(this.renderer.domElement);
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
      this.camera = new THREE_LIB.PerspectiveCamera(50, w / h, 0.1, 100);
      this.camera.position.set(0, 0, 6.2);

      this.renderer = new THREE_LIB.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(w, h);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(this.renderer.domElement);

      this.scene.add(new THREE_LIB.AmbientLight(0xffffff, 0.85));
      const pLight = new THREE_LIB.PointLight(0x38bdf8, 3.2, 14);
      pLight.position.set(3, 4, 5);
      this.scene.add(pLight);

      this.graphGroup = new THREE_LIB.Group();
      this.scene.add(this.graphGroup);

      this.buildGraph();
      this.setupInteractionHandlers(container);

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
        self.animTime += 0.016 * self.pulseSpeed;

        if (self.graphGroup && !self.isMouseDown) {
          self.graphGroup.rotation.y += 0.003;
          self.graphGroup.rotation.x = Math.sin(self.animTime * 0.4) * 0.08;
        }

        // Animate particles flowing along links
        if (self.synapseParticles && self.synapseParticles.length > 0) {
          self.synapseParticles.forEach((sp) => {
            sp.prog = (sp.prog + 0.008 * self.pulseSpeed) % 1;
            const p1 = sp.p1, p2 = sp.p2;
            sp.mesh.position.set(
              p1[0] + (p2[0] - p1[0]) * sp.prog,
              p1[1] + (p2[1] - p1[1]) * sp.prog,
              p1[2] + (p2[2] - p1[2]) * sp.prog
            );
          });
        }

        self.renderer.render(self.scene, self.camera);
      }
      loop();
    },

    buildGraph() {
      const THREE_LIB = (typeof THREE !== 'undefined' ? THREE : (window.parent && window.parent.THREE) ? window.parent.THREE : null);
      if (!THREE_LIB || !this.graphGroup) return;

      while (this.graphGroup.children.length > 0) {
        this.graphGroup.remove(this.graphGroup.children[0]);
      }
      this.laserLines = [];
      this.synapseParticles = [];
      this.nodeMeshes = {};

      // 1. Build Nodes
      this.nodes.forEach((n) => {
        const nGroup = new THREE_LIB.Group();
        nGroup.position.set(n.pos[0], n.pos[1], n.pos[2]);

        const isAi = (n.id === 'ai');
        const r = isAi ? 0.45 : 0.32;
        const sphereGeo = new THREE_LIB.SphereGeometry(r, 24, 24);
        const sphereMat = new THREE_LIB.MeshStandardMaterial({
          color: 0x0a1024,
          emissive: n.col,
          emissiveIntensity: 0.5,
          metalness: 0.85,
          roughness: 0.2
        });
        const mesh = new THREE_LIB.Mesh(sphereGeo, sphereMat);
        nGroup.add(mesh);

        // Outer wireframe halo
        const haloGeo = new THREE_LIB.IcosahedronGeometry(r * 1.3, 1);
        const haloMat = new THREE_LIB.MeshBasicMaterial({ color: n.col, wireframe: true, transparent: true, opacity: 0.35 });
        nGroup.add(new THREE_LIB.Mesh(haloGeo, haloMat));

        // Node Glow Ring
        const ringGeo = new THREE_LIB.TorusGeometry(r * 1.5, 0.015, 8, 32);
        const ringMat = new THREE_LIB.MeshBasicMaterial({ color: n.col, transparent: true, opacity: 0.8 });
        const ring = new THREE_LIB.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        nGroup.add(ring);

        // 3D Text Label Sprite
        try {
          const canvas = document.createElement('canvas');
          canvas.width = 256; canvas.height = 64;
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = 'rgba(15,23,42,0.8)';
          ctx.strokeStyle = '#' + (n.col || 0x38bdf8).toString(16).padStart(6, '0');
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect ? ctx.roundRect(4, 4, 248, 56, 12) : ctx.rect(4, 4, 248, 56);
          ctx.fill(); ctx.stroke();
          ctx.font = 'bold 24px system-ui, sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(n.name || n.label || n.id, 128, 32);
          const texture = new THREE_LIB.CanvasTexture(canvas);
          const spriteMat = new THREE_LIB.SpriteMaterial({ map: texture, transparent: true });
          const sprite = new THREE_LIB.Sprite(spriteMat);
          sprite.position.set(0, r + 0.35, 0);
          sprite.scale.set(1.4, 0.35, 1);
          nGroup.add(sprite);
        } catch(e){}

        nGroup.userData = { id: n.id };
        this.graphGroup.add(nGroup);
        this.nodeMeshes[n.id] = nGroup;
      });

      // 2. Build Synapse Laser Links & Flowing Data Packets
      this.links.forEach((l) => {
        const n1 = this.nodes.find(x => x.id === l.from);
        const n2 = this.nodes.find(x => x.id === l.to);
        if (!n1 || !n2) return;

        const pts = [
          new THREE_LIB.Vector3(n1.pos[0], n1.pos[1], n1.pos[2]),
          new THREE_LIB.Vector3(n2.pos[0], n2.pos[1], n2.pos[2])
        ];
        const lineGeo = new THREE_LIB.BufferGeometry().setFromPoints(pts);
        const lineMat = new THREE_LIB.LineBasicMaterial({
          color: 0x38bdf8,
          transparent: true,
          opacity: 0.35,
          linewidth: 1
        });
        const line = new THREE_LIB.Line(lineGeo, lineMat);
        this.graphGroup.add(line);
        this.laserLines.push(line);

        // 2 Data flow energy packets per link
        for (let k = 0; k < 2; k++) {
          const pGeo = new THREE_LIB.SphereGeometry(0.045, 8, 8);
          const pMat = new THREE_LIB.MeshBasicMaterial({ color: 0xffffff });
          const pMesh = new THREE_LIB.Mesh(pGeo, pMat);
          this.graphGroup.add(pMesh);
          this.synapseParticles.push({
            mesh: pMesh,
            p1: n1.pos,
            p2: n2.pos,
            prog: Math.random()
          });
        }
      });
    },

    setupInteractionHandlers(container) {
      const self = this;
      let isDown = false, px = 0, py = 0;
      let rx = 0, ry = 0;

      container.addEventListener('mousedown', (e) => {
        isDown = true;
        self.isMouseDown = true;
        px = e.clientX;
        py = e.clientY;
        container.style.cursor = 'grabbing';
      });

      window.addEventListener('mousemove', (e) => {
        if (!isDown || !self.isOpen) return;
        const dx = e.clientX - px;
        const dy = e.clientY - py;
        if (self.graphGroup) {
          self.graphGroup.rotation.y += dx * 0.008;
          self.graphGroup.rotation.x += dy * 0.008;
        }
        px = e.clientX;
        py = e.clientY;
      });

      window.addEventListener('mouseup', () => {
        isDown = false;
        self.isMouseDown = false;
        container.style.cursor = 'grab';
      });

      container.addEventListener('wheel', (e) => {
        e.preventDefault();
        self.camera.position.z += e.deltaY * 0.005;
        self.camera.position.z = Math.max(3.0, Math.min(12.0, self.camera.position.z));
      }, { passive: false });

      // Click to pick node via raycaster
      container.addEventListener('click', (e) => {
        const THREE_LIB = (typeof THREE !== 'undefined' ? THREE : (window.parent && window.parent.THREE) ? window.parent.THREE : null);
        if (!THREE_LIB || !self.camera || !self.graphGroup) return;

        const rect = container.getBoundingClientRect();
        const mouse = new THREE_LIB.Vector2(
          ((e.clientX - rect.left) / rect.width) * 2 - 1,
          -((e.clientY - rect.top) / rect.height) * 2 + 1
        );
        const raycaster = new THREE_LIB.Raycaster();
        raycaster.setFromCamera(mouse, self.camera);

        const hits = raycaster.intersectObjects(self.graphGroup.children, true);
        if (hits.length > 0) {
          let p = hits[0].object;
          while (p && p.parent !== self.graphGroup && p.parent !== self.scene) {
            p = p.parent;
          }
          if (p && p.userData && p.userData.id) {
            self.selectNode(p.userData.id);
          }
        }
      });
    },

    loadPreset(preset) {
      this.currentPreset = preset;
      if (typeof document !== 'undefined') {
        document.querySelectorAll('.neural-preset-btn').forEach(btn => {
          btn.classList.toggle('active', btn.getAttribute('data-preset') === preset);
        });
      }
      if (preset === 'transformer') {
        this.nodes = [
          { id: 'input_emb', name: 'Input Embeddings', type: 'Token Embedding (d=512)', col: 0x38bdf8, pos: [-2.2, 0, 0], desc: 'High-dimensional token representations projected into vector space.' },
          { id: 'q_proj', name: 'Query Head', type: 'Attention Subspace', col: 0x8b5cf6, pos: [-0.8, 1.4, 0.4], desc: 'Calculates dynamic queries for cross-token contextual lookup.' },
          { id: 'k_proj', name: 'Key Head', type: 'Attention Subspace', col: 0xec4899, pos: [-0.8, 0, -0.6], desc: 'Stores key vectors matched against queries via dot-product.' },
          { id: 'v_proj', name: 'Value Head', type: 'Attention Subspace', col: 0x10b981, pos: [-0.8, -1.4, 0.4], desc: 'Contains semantic content aggregated into attention output.' },
          { id: 'scaled_dp', name: 'Scaled Dot-Product', type: 'Attention Matrix', col: 0x00f3ff, pos: [0.8, 0.6, 0], desc: 'Computes softmax attention weights scaling with sqrt(d_k).' },
          { id: 'multihead', name: 'Multi-Head FFN', type: 'FeedForward Layer', col: 0xf59e0b, pos: [2.2, 0, 0], desc: 'Combines 8 attention heads with GeLU non-linear activation.' }
        ];
        this.links = [
          { from: 'input_emb', to: 'q_proj' },
          { from: 'input_emb', to: 'k_proj' },
          { from: 'input_emb', to: 'v_proj' },
          { from: 'q_proj', to: 'scaled_dp' },
          { from: 'k_proj', to: 'scaled_dp' },
          { from: 'v_proj', to: 'multihead' },
          { from: 'scaled_dp', to: 'multihead' }
        ];
      } else if (preset === 'microservices') {
        this.nodes = [
          { id: 'api_gateway', name: 'Edge API Gateway', type: 'Envoy Reverse Proxy', col: 0x38bdf8, pos: [-2.2, 0.8, 0], desc: 'Global TLS 1.3 termination, rate limiter, and JWT router.' },
          { id: 'auth_service', name: 'Auth & Key Vault', type: 'Zero-Trust Gate', col: 0xef4444, pos: [-0.8, 1.6, -0.5], desc: 'Ed25519 token signatures & RBAC permission broker.' },
          { id: 'compute_worker', name: 'AI Inference Mesh', type: 'Async GPU Worker', col: 0x8b5cf6, pos: [0.6, 1.2, 0.5], desc: 'Kubernetes cluster running generative model inferences.' },
          { id: 'vector_db', name: 'HNSW Vector DB', type: 'Vector Database', col: 0x10b981, pos: [2.2, 0, -0.3], desc: 'High-throughput nearest-neighbor embedding index.' },
          { id: 'event_bus', name: 'Kafka Event Stream', type: 'Streaming Backbone', col: 0xf59e0b, pos: [0, -1.5, 0], desc: 'Persistent append-only distributed event stream.' }
        ];
        this.links = [
          { from: 'api_gateway', to: 'auth_service' },
          { from: 'api_gateway', to: 'compute_worker' },
          { from: 'compute_worker', to: 'vector_db' },
          { from: 'compute_worker', to: 'event_bus' },
          { from: 'api_gateway', to: 'event_bus' },
          { from: 'auth_service', to: 'event_bus' }
        ];
      } else {
        this.nodes = [
          { id: 'dist_node_a', name: 'Leader (Montreal)', type: 'Raft Master Node', col: 0x00f3ff, pos: [-2.0, 1.0, 0], desc: 'Consensus coordinator syncing state across planetary nodes.' },
          { id: 'dist_node_b', name: 'Replica (Frankfurt)', type: 'Sync Follower Peer', col: 0x38bdf8, pos: [0, 1.6, -0.6], desc: 'Sub-15ms European replication peer.' },
          { id: 'dist_node_c', name: 'Edge (Tokyo)', type: 'Accelerator Cache', col: 0x10b981, pos: [2.0, 0.6, 0.4], desc: 'APAC localized cache and model weights mirror.' },
          { id: 'dist_node_d', name: 'Sensor (Sydney)', type: 'Telemetry Health Probe', col: 0xf59e0b, pos: [0.5, -1.4, 0], desc: 'Global latency health monitor and packet inspector.' }
        ];
        this.links = [
          { from: 'dist_node_a', to: 'dist_node_b' },
          { from: 'dist_node_b', to: 'dist_node_c' },
          { from: 'dist_node_a', to: 'dist_node_c' },
          { from: 'dist_node_a', to: 'dist_node_d' },
          { from: 'dist_node_c', to: 'dist_node_d' }
        ];
      }
      if (this.isOpen) {
        this.buildGraph();
        if (this.nodes.length > 0) this.selectNode(this.nodes[0].id);
      }
      _toast(_isFr() ? ("Topology '" + preset + "' chargée") : ("Topology '" + preset + "' loaded"), 'info');
    },

    triggerPulse() {
      this.pulseSpeed = (this.pulseSpeed || 1) * 2.5;
      setTimeout(() => { this.pulseSpeed = Math.max(1, this.pulseSpeed / 2.5); }, 1800);
      _toast(_isFr() ? '⚡ Impulsion synaptique déclenchée !' : '⚡ Synaptic pulse triggered!', 'success');
    },

    selectNode(id) {
      if (!id && this.nodes && this.nodes.length > 0) id = this.nodes[0].id;
      this.activeNodeId = id;
      _sound('click');
      const n = (this.nodes || []).find(x => x.id === id) || (this.nodes && this.nodes[0]);
      if (!n) return;

      const titleEl = document.getElementById('neural-node-title');
      const typeEl = document.getElementById('neural-node-type');
      const descEl = document.getElementById('neural-node-desc');
      const connsEl = document.getElementById('neural-node-connections');

      if (titleEl) titleEl.textContent = n.name;
      if (typeEl) typeEl.textContent = n.type;
      if (descEl) descEl.textContent = n.desc;

      if (connsEl) {
        const conns = this.links.filter(l => l.from === id || l.to === id);
        connsEl.innerHTML = conns.map(c => {
          const otherId = (c.from === id ? c.to : c.from);
          const other = this.nodes.find(x => x.id === otherId);
          return '<span style="display:inline-block;padding:3px 8px;border-radius:10px;background:rgba(56,189,248,0.15);border:1px solid rgba(56,189,248,0.4);font-size:0.68rem;color:#38bdf8;margin:2px">⚡ ' + (other ? other.name : otherId) + '</span>';
        }).join(' ');
      }

      if (this.nodeMeshes) {
        Object.keys(this.nodeMeshes).forEach(key => {
          const grp = this.nodeMeshes[key];
          if (grp) {
            const isMatch = (key === n.id);
            grp.scale.set(isMatch ? 1.25 : 1.0, isMatch ? 1.25 : 1.0, isMatch ? 1.25 : 1.0);
          }
        });
      }

      _toast(_isFr() ? `Synapse active : ${n.name}` : `Active Synapse: ${n.name}`, 'info');
    },

    setPulseSpeed(s) {
      this.pulseSpeed = s;
      _sound('click');
      _toast(_isFr() ? `Vitesse Synaptique: ${s}x` : `Synapse Speed: ${s}x`, 'info');
    },

    // ══════════════════════════════════════════════════════════════════════════
    // 1-CLICK INJECT (LA DORINȚĂ / OPTIONAL)
    // ══════════════════════════════════════════════════════════════════════════
    inject() {
      _sound('sparkle');
      const activePreset = this.currentPreset || 'transformer';

      const snippet = '<!-- ═══════════════════════════════════════════════════════════════════ -->\n' +
'<!-- ULTRA NEURAL ARCHITECTURE MIND-GRAPH (100% Client-Side WebGL 3D)   -->\n' +
'<!-- ═══════════════════════════════════════════════════════════════════ -->\n' +
'<div id="ultra-neural-graph-card" style="margin:24px 0;background:linear-gradient(135deg,rgba(9,14,28,0.96) 0%,rgba(6,10,23,0.98) 100%);border:1.5px solid rgba(236,72,153,0.4);border-radius:20px;padding:20px;box-shadow:0 16px 48px rgba(0,0,0,0.6), 0 0 24px rgba(236,72,153,0.2);font-family:system-ui,-apple-system,sans-serif;color:#fff;position:relative;overflow:hidden">\n' +
'  <!-- Header Bar -->\n' +
'  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:12px;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:12px">\n' +
'    <div style="display:flex;align-items:center;gap:10px">\n' +
'      <span style="font-size:1.5rem">🧠</span>\n' +
'      <div>\n' +
'        <h4 style="margin:0;font-size:1.1rem;font-weight:900;background:linear-gradient(135deg,#ec4899,#8b5cf6,#38bdf8);-webkit-background-clip:text;-webkit-text-fill-color:transparent">3D Neural Architecture Mind-Graph</h4>\n' +
'        <p style="margin:2px 0 0 0;font-size:0.75rem;color:#94a3b8">Interactive Volumetric Force-Directed WebGL Mind-Graph · Click Nodes to Inspect Telemetry</p>\n' +
'      </div>\n' +
'    </div>\n' +
'    <!-- Interactive Controls: Presets & Synaptic Pulse -->\n' +
'    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">\n' +
'      <div style="display:flex;background:rgba(15,23,42,0.8);border:1px solid rgba(255,255,255,0.12);border-radius:12px;padding:3px;gap:4px">\n' +
'        <button class="injected-neural-preset-btn" data-preset="transformer" style="background:' + (activePreset === 'transformer' ? 'rgba(236,72,153,0.3)' : 'transparent') + ';border:1px solid ' + (activePreset === 'transformer' ? '#ec4899' : 'transparent') + ';color:' + (activePreset === 'transformer' ? '#fff' : '#94a3b8') + ';border-radius:8px;padding:4px 10px;font-size:0.72rem;font-weight:700;cursor:pointer;transition:all 0.2s">🧬 Transformer</button>\n' +
'        <button class="injected-neural-preset-btn" data-preset="microservices" style="background:' + (activePreset === 'microservices' ? 'rgba(236,72,153,0.3)' : 'transparent') + ';border:1px solid ' + (activePreset === 'microservices' ? '#ec4899' : 'transparent') + ';color:' + (activePreset === 'microservices' ? '#fff' : '#94a3b8') + ';border-radius:8px;padding:4px 10px;font-size:0.72rem;font-weight:700;cursor:pointer;transition:all 0.2s">🌐 Microservices</button>\n' +
'        <button class="injected-neural-preset-btn" data-preset="distributed" style="background:' + (activePreset === 'distributed' ? 'rgba(236,72,153,0.3)' : 'transparent') + ';border:1px solid ' + (activePreset === 'distributed' ? '#ec4899' : 'transparent') + ';color:' + (activePreset === 'distributed' ? '#fff' : '#94a3b8') + ';border-radius:8px;padding:4px 10px;font-size:0.72rem;font-weight:700;cursor:pointer;transition:all 0.2s">⚡ Pipeline</button>\n' +
'      </div>\n' +
'      <button id="injected-neural-pulse-btn" style="background:linear-gradient(135deg,rgba(236,72,153,0.25),rgba(139,92,246,0.25));border:1px solid rgba(236,72,153,0.6);color:#f472b6;border-radius:10px;padding:6px 14px;font-size:0.75rem;font-weight:800;cursor:pointer;transition:all 0.2s" title="Trigger Synaptic Energy Wave">⚡ Synaptic Pulse</button>\n' +
'    </div>\n' +
'  </div>\n' +
'\n' +
'  <!-- Main Viewport + Integrated Floating Inspector -->\n' +
'  <div style="position:relative;width:100%;height:440px;border-radius:16px;overflow:hidden;background:#03050c;border:1px solid rgba(56,189,248,0.25)">\n' +
'    <!-- 3D Three.js Viewport -->\n' +
'    <div id="injected-neural-graph-viewport" style="width:100%;height:100%;position:relative;cursor:grab"></div>\n' +
'\n' +
'    <!-- Live Synapse Inspector HUD (Floating Glass Card) -->\n' +
'    <div id="injected-neural-hud" style="position:absolute;top:14px;left:14px;width:280px;background:rgba(15,23,42,0.9);backdrop-filter:blur(14px);border:1px solid rgba(56,189,248,0.4);border-radius:14px;padding:14px;box-shadow:0 8px 24px rgba(0,0,0,0.6);pointer-events:auto;z-index:20;transition:all 0.3s">\n' +
'      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">\n' +
'        <span style="font-size:0.68rem;color:#38bdf8;font-weight:800;text-transform:uppercase;letter-spacing:0.05em">SYNAPSE INSPECTOR</span>\n' +
'        <span id="injected-neural-status-pill" style="font-size:0.62rem;color:#34d399;font-weight:700;background:rgba(52,211,153,0.15);padding:2px 6px;border-radius:6px;border:1px solid rgba(52,211,153,0.3)">● ACTIVE</span>\n' +
'      </div>\n' +
'      <div id="injected-neural-node-title" style="font-size:1.05rem;color:#fff;font-weight:900;margin-bottom:2px">-</div>\n' +
'      <div id="injected-neural-node-type" style="font-size:0.75rem;color:#f472b6;font-weight:700;margin-bottom:6px">-</div>\n' +
'      <div id="injected-neural-node-desc" style="font-size:0.72rem;color:#cbd5e1;line-height:1.4;margin-bottom:8px">-</div>\n' +
'      <div style="font-size:0.65rem;color:#94a3b8;font-weight:700;text-transform:uppercase;margin-bottom:4px">Connected Synapses</div>\n' +
'      <div id="injected-neural-node-conns" style="display:flex;flex-wrap:wrap;gap:4px"></div>\n' +
'    </div>\n' +
'\n' +
'    <!-- Bottom Hint -->\n' +
'    <div style="position:absolute;bottom:12px;left:14px;right:14px;display:flex;justify-content:center;pointer-events:none;z-index:20">\n' +
'      <div style="background:rgba(15,23,42,0.85);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.1);padding:5px 14px;border-radius:20px;font-size:0.72rem;color:#94a3b8">\n' +
'        🖱️ Drag 360° to rotate · Scroll to zoom · Click nodes to inspect telemetry\n' +
'      </div>\n' +
'    </div>\n' +
'  </div>\n' +
'</div>\n' +
'\n' +
'<script>\n' +
'(function() {\n' +
'  const container = document.getElementById("injected-neural-graph-viewport");\n' +
'  if (!container) return;\n' +
'\n' +
'  const presets = {\n' +
'    transformer: {\n' +
'      name: "Transformer Attention Graph",\n' +
'      nodes: [\n' +
'        { id: "input_emb", name: "Input Embeddings", type: "Token Embedding (d=512)", col: 0x38bdf8, pos: [-2.2, 0, 0], desc: "High-dimensional token representations projected into vector space." },\n' +
'        { id: "q_proj", name: "Query Head", type: "Attention Subspace", col: 0x8b5cf6, pos: [-0.8, 1.4, 0.4], desc: "Calculates dynamic queries for cross-token contextual lookup." },\n' +
'        { id: "k_proj", name: "Key Head", type: "Attention Subspace", col: 0xec4899, pos: [-0.8, 0, -0.6], desc: "Stores key vectors matched against queries via dot-product." },\n' +
'        { id: "v_proj", name: "Value Head", type: "Attention Subspace", col: 0x10b981, pos: [-0.8, -1.4, 0.4], desc: "Contains semantic content aggregated into attention output." },\n' +
'        { id: "scaled_dp", name: "Scaled Dot-Product", type: "Attention Matrix", col: 0x00f3ff, pos: [0.8, 0.6, 0], desc: "Computes softmax attention weights scaling with sqrt(d_k)." },\n' +
'        { id: "multihead", name: "Multi-Head FFN", type: "FeedForward Layer", col: 0xf59e0b, pos: [2.2, 0, 0], desc: "Combines 8 attention heads with GeLU non-linear activation." }\n' +
'      ],\n' +
'      links: [\n' +
'        { from: "input_emb", to: "q_proj" },\n' +
'        { from: "input_emb", to: "k_proj" },\n' +
'        { from: "input_emb", to: "v_proj" },\n' +
'        { from: "q_proj", to: "scaled_dp" },\n' +
'        { from: "k_proj", to: "scaled_dp" },\n' +
'        { from: "v_proj", to: "multihead" },\n' +
'        { from: "scaled_dp", to: "multihead" }\n' +
'      ]\n' +
'    },\n' +
'    microservices: {\n' +
'      name: "Cloud Microservices Mesh",\n' +
'      nodes: [\n' +
'        { id: "api_gateway", name: "Edge API Gateway", type: "Envoy Reverse Proxy", col: 0x38bdf8, pos: [-2.2, 0.8, 0], desc: "Global TLS 1.3 termination, rate limiter, and JWT router." },\n' +
'        { id: "auth_service", name: "Auth & Key Vault", type: "Zero-Trust Gate", col: 0xef4444, pos: [-0.8, 1.6, -0.5], desc: "Ed25519 token signatures & RBAC permission broker." },\n' +
'        { id: "compute_worker", name: "AI Inference Mesh", type: "Async GPU Worker", col: 0x8b5cf6, pos: [0.6, 1.2, 0.5], desc: "Kubernetes cluster running generative model inferences." },\n' +
'        { id: "vector_db", name: "HNSW Vector DB", type: "Vector Database", col: 0x10b981, pos: [2.2, 0, -0.3], desc: "High-throughput nearest-neighbor embedding index." },\n' +
'        { id: "event_bus", name: "Kafka Event Stream", type: "Streaming Backbone", col: 0xf59e0b, pos: [0, -1.5, 0], desc: "Persistent append-only distributed event stream." }\n' +
'      ],\n' +
'      links: [\n' +
'        { from: "api_gateway", to: "auth_service" },\n' +
'        { from: "api_gateway", to: "compute_worker" },\n' +
'        { from: "compute_worker", to: "vector_db" },\n' +
'        { from: "compute_worker", to: "event_bus" },\n' +
'        { from: "api_gateway", to: "event_bus" },\n' +
'        { from: "auth_service", to: "event_bus" }\n' +
'      ]\n' +
'    },\n' +
'    distributed: {\n' +
'      name: "Distributed Neural Pipeline",\n' +
'      nodes: [\n' +
'        { id: "dist_node_a", name: "Leader (Montreal)", type: "Raft Master Node", col: 0x00f3ff, pos: [-2.0, 1.0, 0], desc: "Consensus coordinator syncing state across planetary nodes." },\n' +
'        { id: "dist_node_b", name: "Replica (Frankfurt)", type: "Sync Follower Peer", col: 0x38bdf8, pos: [0, 1.6, -0.6], desc: "Sub-15ms European replication peer." },\n' +
'        { id: "dist_node_c", name: "Edge (Tokyo)", type: "Accelerator Cache", col: 0x10b981, pos: [2.0, 0.6, 0.4], desc: "APAC localized cache and model weights mirror." },\n' +
'        { id: "dist_node_d", name: "Sensor (Sydney)", type: "Telemetry Health Probe", col: 0xf59e0b, pos: [0.5, -1.4, 0], desc: "Global latency health monitor and packet inspector." }\n' +
'      ],\n' +
'      links: [\n' +
'        { from: "dist_node_a", to: "dist_node_b" },\n' +
'        { from: "dist_node_b", to: "dist_node_c" },\n' +
'        { from: "dist_node_a", to: "dist_node_c" },\n' +
'        { from: "dist_node_a", to: "dist_node_d" },\n' +
'        { from: "dist_node_c", to: "dist_node_d" }\n' +
'      ]\n' +
'    }\n' +
'  };\n' +
'\n' +
'  let curPresetKey = "' + activePreset + '";\n' +
'  if (!presets[curPresetKey]) curPresetKey = "transformer";\n' +
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
'    const w = container.clientWidth || 640;\n' +
'    const h = container.clientHeight || 440;\n' +
'    const scene = new T.Scene();\n' +
'    const camera = new T.PerspectiveCamera(50, w / h, 0.1, 100);\n' +
'    camera.position.set(0, 0, 6.2);\n' +
'\n' +
'    const renderer = new T.WebGLRenderer({ antialias: true, alpha: true });\n' +
'    renderer.setSize(w, h);\n' +
'    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));\n' +
'    container.appendChild(renderer.domElement);\n' +
'\n' +
'    scene.add(new T.AmbientLight(0xffffff, 0.85));\n' +
'    const pLight = new T.PointLight(0x38bdf8, 3.2, 16);\n' +
'    pLight.position.set(3, 4, 5);\n' +
'    scene.add(pLight);\n' +
'    const rimLight = new T.PointLight(0xec4899, 2.5, 12);\n' +
'    rimLight.position.set(-3, -2, -2);\n' +
'    scene.add(rimLight);\n' +
'\n' +
'    const grp = new T.Group();\n' +
'    scene.add(grp);\n' +
'\n' +
'    let nodeMeshes = {};\n' +
'    let synapseParticles = [];\n' +
'    let pulseSpeed = 1.0;\n' +
'    let animTime = 0;\n' +
'    let activeNodeId = "";\n' +
'\n' +
'    const titleEl = document.getElementById("injected-neural-node-title");\n' +
'    const typeEl = document.getElementById("injected-neural-node-type");\n' +
'    const descEl = document.getElementById("injected-neural-node-desc");\n' +
'    const connsEl = document.getElementById("injected-neural-node-conns");\n' +
'\n' +
'    function makeTextSprite(text, colorHex) {\n' +
'      const cvs = document.createElement("canvas");\n' +
'      cvs.width = 256; cvs.height = 64;\n' +
'      const ctx = cvs.getContext("2d");\n' +
'      ctx.fillStyle = "rgba(15,23,42,0.88)";\n' +
'      const colStr = "#" + (colorHex || 0x38bdf8).toString(16).padStart(6, "0");\n' +
'      ctx.strokeStyle = colStr;\n' +
'      ctx.lineWidth = 2.5;\n' +
'      if (ctx.roundRect) ctx.roundRect(4, 4, 248, 56, 12); else ctx.rect(4, 4, 248, 56);\n' +
'      ctx.fill(); ctx.stroke();\n' +
'      ctx.font = "bold 22px system-ui, sans-serif";\n' +
'      ctx.fillStyle = "#ffffff";\n' +
'      ctx.textAlign = "center";\n' +
'      ctx.textBaseline = "middle";\n' +
'      ctx.fillText(text, 128, 32);\n' +
'      const texture = new T.CanvasTexture(cvs);\n' +
'      const spriteMat = new T.SpriteMaterial({ map: texture, transparent: true });\n' +
'      const sprite = new T.Sprite(spriteMat);\n' +
'      sprite.scale.set(1.4, 0.35, 1);\n' +
'      return sprite;\n' +
'    }\n' +
'\n' +
'    function buildTopology(presetKey) {\n' +
'      while (grp.children.length > 0) grp.remove(grp.children[0]);\n' +
'      nodeMeshes = {};\n' +
'      synapseParticles = [];\n' +
'      const data = presets[presetKey] || presets.transformer;\n' +
'\n' +
'      // 1. Build Nodes\n' +
'      data.nodes.forEach((n) => {\n' +
'        const nGroup = new T.Group();\n' +
'        nGroup.position.set(n.pos[0], n.pos[1], n.pos[2]);\n' +
'        const r = 0.35;\n' +
'        const sphere = new T.Mesh(\n' +
'          new T.SphereGeometry(r, 24, 24),\n' +
'          new T.MeshStandardMaterial({ color: 0x0a1024, emissive: n.col, emissiveIntensity: 0.55, metalness: 0.85, roughness: 0.2 })\n' +
'        );\n' +
'        nGroup.add(sphere);\n' +
'        const halo = new T.Mesh(\n' +
'          new T.IcosahedronGeometry(r * 1.3, 1),\n' +
'          new T.MeshBasicMaterial({ color: n.col, wireframe: true, transparent: true, opacity: 0.35 })\n' +
'        );\n' +
'        nGroup.add(halo);\n' +
'        const ring = new T.Mesh(\n' +
'          new T.TorusGeometry(r * 1.5, 0.016, 8, 32),\n' +
'          new T.MeshBasicMaterial({ color: n.col, transparent: true, opacity: 0.85 })\n' +
'        );\n' +
'        ring.rotation.x = Math.PI / 2;\n' +
'        nGroup.add(ring);\n' +
'        const sprite = makeTextSprite(n.name, n.col);\n' +
'        sprite.position.set(0, r + 0.38, 0);\n' +
'        nGroup.add(sprite);\n' +
'        nGroup.userData = { id: n.id };\n' +
'        grp.add(nGroup);\n' +
'        nodeMeshes[n.id] = nGroup;\n' +
'      });\n' +
'\n' +
'      // 2. Build Synaptic Laser Links & Flowing Photons\n' +
'      data.links.forEach((l) => {\n' +
'        const n1 = data.nodes.find(x => x.id === l.from);\n' +
'        const n2 = data.nodes.find(x => x.id === l.to);\n' +
'        if (!n1 || !n2) return;\n' +
'        const pts = [new T.Vector3(...n1.pos), new T.Vector3(...n2.pos)];\n' +
'        const line = new T.Line(\n' +
'          new T.BufferGeometry().setFromPoints(pts),\n' +
'          new T.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.35 })\n' +
'        );\n' +
'        grp.add(line);\n' +
'        for (let k = 0; k < 2; k++) {\n' +
'          const pMesh = new T.Mesh(new T.SphereGeometry(0.045, 8, 8), new T.MeshBasicMaterial({ color: 0xffffff }));\n' +
'          grp.add(pMesh);\n' +
'          synapseParticles.push({\n' +
'            mesh: pMesh,\n' +
'            p1: n1.pos,\n' +
'            p2: n2.pos,\n' +
'            prog: Math.random()\n' +
'          });\n' +
'        }\n' +
'      });\n' +
'\n' +
'      if (data.nodes.length > 0) selectNode(data.nodes[0].id);\n' +
'    }\n' +
'\n' +
'    function selectNode(id) {\n' +
'      const data = presets[curPresetKey] || presets.transformer;\n' +
'      const n = data.nodes.find(x => x.id === id) || data.nodes[0];\n' +
'      if (!n) return;\n' +
'      activeNodeId = n.id;\n' +
'      Object.keys(nodeMeshes).forEach((k) => {\n' +
'        const grpNode = nodeMeshes[k];\n' +
'        if (grpNode) {\n' +
'          const isMatch = (k === n.id);\n' +
'          grpNode.scale.set(isMatch ? 1.25 : 1.0, isMatch ? 1.25 : 1.0, isMatch ? 1.25 : 1.0);\n' +
'        }\n' +
'      });\n' +
'      if (titleEl) titleEl.textContent = n.name;\n' +
'      if (typeEl) {\n' +
'        typeEl.textContent = n.type;\n' +
'        typeEl.style.color = "#" + (n.col || 0xf472b6).toString(16).padStart(6, "0");\n' +
'      }\n' +
'      if (descEl) descEl.textContent = n.desc;\n' +
'      if (connsEl) {\n' +
'        const conns = data.links.filter(l => l.from === n.id || l.to === n.id);\n' +
'        connsEl.innerHTML = conns.map((c) => {\n' +
'          const otherId = (c.from === n.id ? c.to : c.from);\n' +
'          const other = data.nodes.find(x => x.id === otherId);\n' +
'          return \'<button class="injected-conn-pill" data-nid="\' + otherId + \'" style="background:rgba(56,189,248,0.15);border:1px solid rgba(56,189,248,0.4);color:#38bdf8;border-radius:8px;padding:3px 8px;font-size:0.68rem;cursor:pointer;margin:2px;transition:all 0.2s">⚡ \' + (other ? other.name : otherId) + \'</button>\';\n' +
'        }).join("");\n' +
'        connsEl.querySelectorAll(".injected-conn-pill").forEach((b) => {\n' +
'          b.addEventListener("click", (ev) => {\n' +
'            ev.stopPropagation();\n' +
'            selectNode(b.getAttribute("data-nid"));\n' +
'          });\n' +
'        });\n' +
'      }\n' +
'    }\n' +
'\n' +
'    buildTopology(curPresetKey);\n' +
'\n' +
'    // 360° Drag Rotation\n' +
'    let isDown = false, px = 0, py = 0;\n' +
'    container.addEventListener("mousedown", (e) => {\n' +
'      isDown = true;\n' +
'      px = e.clientX;\n' +
'      py = e.clientY;\n' +
'      container.style.cursor = "grabbing";\n' +
'    });\n' +
'    window.addEventListener("mousemove", (e) => {\n' +
'      if (!isDown) return;\n' +
'      grp.rotation.y += (e.clientX - px) * 0.008;\n' +
'      grp.rotation.x += (e.clientY - py) * 0.008;\n' +
'      px = e.clientX;\n' +
'      py = e.clientY;\n' +
'    });\n' +
'    window.addEventListener("mouseup", () => {\n' +
'      isDown = false;\n' +
'      container.style.cursor = "grab";\n' +
'    });\n' +
'    container.addEventListener("wheel", (e) => {\n' +
'      e.preventDefault();\n' +
'      camera.position.z += e.deltaY * 0.005;\n' +
'      camera.position.z = Math.max(3.0, Math.min(12.0, camera.position.z));\n' +
'    }, { passive: false });\n' +
'\n' +
'    // Click Raycasting Node Selection\n' +
'    container.addEventListener("click", (e) => {\n' +
'      const rect = container.getBoundingClientRect();\n' +
'      const mouse = new T.Vector2(\n' +
'        ((e.clientX - rect.left) / rect.width) * 2 - 1,\n' +
'        -((e.clientY - rect.top) / rect.height) * 2 + 1\n' +
'      );\n' +
'      const raycaster = new T.Raycaster();\n' +
'      raycaster.setFromCamera(mouse, camera);\n' +
'      const hits = raycaster.intersectObjects(grp.children, true);\n' +
'      if (hits.length > 0) {\n' +
'        let p = hits[0].object;\n' +
'        while (p && p.parent !== grp && p.parent !== scene) p = p.parent;\n' +
'        if (p && p.userData && p.userData.id) selectNode(p.userData.id);\n' +
'      }\n' +
'    });\n' +
'\n' +
'    // Synaptic Pulse Button\n' +
'    const pulseBtn = document.getElementById("injected-neural-pulse-btn");\n' +
'    if (pulseBtn) {\n' +
'      pulseBtn.addEventListener("click", () => {\n' +
'        pulseSpeed = 2.5;\n' +
'        pulseBtn.style.transform = "scale(1.06)";\n' +
'        setTimeout(() => {\n' +
'          pulseSpeed = 1.0;\n' +
'          pulseBtn.style.transform = "scale(1)";\n' +
'        }, 1800);\n' +
'      });\n' +
'    }\n' +
'\n' +
'    // Preset Buttons in Header\n' +
'    document.querySelectorAll(".injected-neural-preset-btn").forEach((btn) => {\n' +
'      btn.addEventListener("click", () => {\n' +
'        const p = btn.getAttribute("data-preset");\n' +
'        if (!presets[p]) return;\n' +
'        curPresetKey = p;\n' +
'        document.querySelectorAll(".injected-neural-preset-btn").forEach((b) => {\n' +
'          const active = (b.getAttribute("data-preset") === p);\n' +
'          b.style.background = active ? "rgba(236,72,153,0.3)" : "transparent";\n' +
'          b.style.borderColor = active ? "#ec4899" : "transparent";\n' +
'          b.style.color = active ? "#fff" : "#94a3b8";\n' +
'        });\n' +
'        buildTopology(p);\n' +
'      });\n' +
'    });\n' +
'\n' +
'    // Responsive Viewport Resize\n' +
'    window.addEventListener("resize", () => {\n' +
'      const rw = container.clientWidth || 640;\n' +
'      const rh = container.clientHeight || 440;\n' +
'      camera.aspect = rw / rh;\n' +
'      camera.updateProjectionMatrix();\n' +
'      renderer.setSize(rw, rh);\n' +
'    });\n' +
'\n' +
'    // Render Loop with Flowing Data Photons\n' +
'    function loop() {\n' +
'      requestAnimationFrame(loop);\n' +
'      animTime += 0.016 * pulseSpeed;\n' +
'      if (!isDown) {\n' +
'        grp.rotation.y += 0.003;\n' +
'        grp.rotation.x = Math.sin(animTime * 0.4) * 0.08;\n' +
'      }\n' +
'      synapseParticles.forEach((sp) => {\n' +
'        sp.prog = (sp.prog + 0.008 * pulseSpeed) % 1;\n' +
'        sp.mesh.position.set(\n' +
'          sp.p1[0] + (sp.p2[0] - sp.p1[0]) * sp.prog,\n' +
'          sp.p1[1] + (sp.p2[1] - p1[1]) * sp.prog,\n' +
'          sp.p1[2] + (sp.p2[2] - p1[2]) * sp.prog\n' +
'        );\n' +
'      });\n' +
'      renderer.render(scene, camera);\n' +
'    }\n' +
'    loop();\n' +
'  });\n' +
'})();\n' +
'<' + '/script>';

      _injectCodeToActiveApp(snippet, /<!-- ULTRA NEURAL ARCHITECTURE GRAPH[\s\S]*?<\/script>/g, '3D Neural Graph');
    },

    // ══════════════════════════════════════════════════════════════════════════
    // STANDALONE HTML EXPORT
    // ══════════════════════════════════════════════════════════════════════════
    exportStandalone() {
      if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Export 3D Neural Mind-Graph')) return;
      _sound('download');
      const activePreset = this.currentPreset || 'transformer';

      const html = '<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'  <meta charset="UTF-8">\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'  <title>3D Neural Architecture Mind-Graph</title>\n' +
'  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><' + '/script>\n' +
'  <style>\n' +
'    * { margin:0; padding:0; box-sizing:border-box; }\n' +
'    body { background:#03050c; color:#fff; font-family:system-ui,-apple-system,sans-serif; overflow:hidden; width:100vw; height:100vh; display:flex; flex-direction:column; }\n' +
'    #canvas-container { flex:1; width:100%; height:100%; position:relative; cursor:grab; }\n' +
'    .hud-bar { position:absolute; top:16px; left:16px; right:16px; display:flex; justify-content:space-between; align-items:center; z-index:20; pointer-events:none; }\n' +
'    .hud-card { background:rgba(15,23,42,0.88); backdrop-filter:blur(14px); border:1px solid rgba(56,189,248,0.4); border-radius:14px; padding:10px 18px; pointer-events:auto; display:flex; align-items:center; gap:12px; box-shadow:0 8px 24px rgba(0,0,0,0.5); }\n' +
'    .hud-btn { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.18); color:#fff; padding:6px 12px; border-radius:10px; font-size:0.75rem; cursor:pointer; font-weight:700; transition:all 0.2s; }\n' +
'    .hud-btn:hover, .hud-btn.active { background:rgba(236,72,153,0.3); border-color:#ec4899; color:#fff; }\n' +
'    #inspector-card { position:absolute; bottom:24px; left:24px; width:300px; background:rgba(15,23,42,0.9); backdrop-filter:blur(16px); border:1px solid rgba(56,189,248,0.4); border-radius:16px; padding:16px; z-index:20; pointer-events:auto; box-shadow:0 12px 32px rgba(0,0,0,0.6); }\n' +
'    .bottom-hint { position:absolute; bottom:24px; left:50%; transform:translateX(-50%); background:rgba(15,23,42,0.85); backdrop-filter:blur(8px); border:1px solid rgba(255,255,255,0.1); border-radius:20px; padding:6px 18px; font-size:0.75rem; color:#94a3b8; pointer-events:none; z-index:15; }\n' +
'  </style>\n' +
'</head>\n' +
'<body>\n' +
'  <div class="hud-bar">\n' +
'    <div class="hud-card">\n' +
'      <span style="font-size:1.4rem">🧠</span>\n' +
'      <div>\n' +
'        <div style="font-weight:900;font-size:0.95rem;background:linear-gradient(135deg,#ec4899,#8b5cf6,#38bdf8);-webkit-background-clip:text;-webkit-text-fill-color:transparent">3D Neural Architecture Mind-Graph</div>\n' +
'        <div style="font-size:0.7rem;color:#94a3b8">Volumetric Synapse Engine · Zero-G WebGL Force Graph</div>\n' +
'      </div>\n' +
'    </div>\n' +
'    <div class="hud-card">\n' +
'      <button class="hud-btn active" id="btn-preset-trans" onclick="switchPreset(\'transformer\')">🧬 Transformer</button>\n' +
'      <button class="hud-btn" id="btn-preset-micro" onclick="switchPreset(\'microservices\')">🌐 Microservices</button>\n' +
'      <button class="hud-btn" id="btn-preset-dist" onclick="switchPreset(\'distributed\')">⚡ Pipeline</button>\n' +
'      <button class="hud-btn" onclick="triggerPulse()" style="color:#f472b6;border-color:rgba(236,72,153,0.5)">⚡ Pulse</button>\n' +
'      <button class="hud-btn" onclick="toggleFullscreen()">⛶ Fullscreen</button>\n' +
'    </div>\n' +
'  </div>\n' +
'  <div id="canvas-container"></div>\n' +
'  <div id="inspector-card">\n' +
'    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">\n' +
'      <span style="font-size:0.68rem;color:#38bdf8;font-weight:800;text-transform:uppercase;letter-spacing:0.05em">SYNAPSE INSPECTOR</span>\n' +
'      <span style="font-size:0.62rem;color:#34d399;font-weight:700;background:rgba(52,211,153,0.15);padding:2px 6px;border-radius:6px;border:1px solid rgba(52,211,153,0.3)">● ACTIVE</span>\n' +
'    </div>\n' +
'    <div id="sa-node-title" style="font-size:1.1rem;color:#fff;font-weight:900;margin-bottom:2px">-</div>\n' +
'    <div id="sa-node-type" style="font-size:0.78rem;color:#f472b6;font-weight:700;margin-bottom:6px">-</div>\n' +
'    <div id="sa-node-desc" style="font-size:0.75rem;color:#cbd5e1;line-height:1.4;margin-bottom:8px">-</div>\n' +
'    <div style="font-size:0.65rem;color:#94a3b8;font-weight:700;text-transform:uppercase;margin-bottom:4px">Connected Synapses</div>\n' +
'    <div id="sa-node-conns" style="display:flex;flex-wrap:wrap;gap:4px"></div>\n' +
'  </div>\n' +
'  <div class="bottom-hint">🖱️ Drag 360° to Explore · Scroll to Zoom · Click Nodes to Inspect Telemetry</div>\n' +
'  <script>\n' +
'    const presets = {\n' +
'      transformer: {\n' +
'        nodes: [\n' +
'          { id: "input_emb", name: "Input Embeddings", type: "Token Embedding (d=512)", col: 0x38bdf8, pos: [-2.2, 0, 0], desc: "High-dimensional token representations projected into vector space." },\n' +
'          { id: "q_proj", name: "Query Head", type: "Attention Subspace", col: 0x8b5cf6, pos: [-0.8, 1.4, 0.4], desc: "Calculates dynamic queries for cross-token contextual lookup." },\n' +
'          { id: "k_proj", name: "Key Head", type: "Attention Subspace", col: 0xec4899, pos: [-0.8, 0, -0.6], desc: "Stores key vectors matched against queries via dot-product." },\n' +
'          { id: "v_proj", name: "Value Head", type: "Attention Subspace", col: 0x10b981, pos: [-0.8, -1.4, 0.4], desc: "Contains semantic content aggregated into attention output." },\n' +
'          { id: "scaled_dp", name: "Scaled Dot-Product", type: "Attention Matrix", col: 0x00f3ff, pos: [0.8, 0.6, 0], desc: "Computes softmax attention weights scaling with sqrt(d_k)." },\n' +
'          { id: "multihead", name: "Multi-Head FFN", type: "FeedForward Layer", col: 0xf59e0b, pos: [2.2, 0, 0], desc: "Combines 8 attention heads with GeLU non-linear activation." }\n' +
'        ],\n' +
'        links: [\n' +
'          { from: "input_emb", to: "q_proj" },\n' +
'          { from: "input_emb", to: "k_proj" },\n' +
'          { from: "input_emb", to: "v_proj" },\n' +
'          { from: "q_proj", to: "scaled_dp" },\n' +
'          { from: "k_proj", to: "scaled_dp" },\n' +
'          { from: "v_proj", to: "multihead" },\n' +
'          { from: "scaled_dp", to: "multihead" }\n' +
'        ]\n' +
'      },\n' +
'      microservices: {\n' +
'        nodes: [\n' +
'          { id: "api_gateway", name: "Edge API Gateway", type: "Envoy Reverse Proxy", col: 0x38bdf8, pos: [-2.2, 0.8, 0], desc: "Global TLS 1.3 termination, rate limiter, and JWT router." },\n' +
'          { id: "auth_service", name: "Auth & Key Vault", type: "Zero-Trust Gate", col: 0xef4444, pos: [-0.8, 1.6, -0.5], desc: "Ed25519 token signatures & RBAC permission broker." },\n' +
'          { id: "compute_worker", name: "AI Inference Mesh", type: "Async GPU Worker", col: 0x8b5cf6, pos: [0.6, 1.2, 0.5], desc: "Kubernetes cluster running generative model inferences." },\n' +
'          { id: "vector_db", name: "HNSW Vector DB", type: "Vector Database", col: 0x10b981, pos: [2.2, 0, -0.3], desc: "High-throughput nearest-neighbor embedding index." },\n' +
'          { id: "event_bus", name: "Kafka Event Stream", type: "Streaming Backbone", col: 0xf59e0b, pos: [0, -1.5, 0], desc: "Persistent append-only distributed event stream." }\n' +
'        ],\n' +
'        links: [\n' +
'          { from: "api_gateway", to: "auth_service" },\n' +
'          { from: "api_gateway", to: "compute_worker" },\n' +
'          { from: "compute_worker", to: "vector_db" },\n' +
'          { from: "compute_worker", to: "event_bus" },\n' +
'          { from: "api_gateway", to: "event_bus" },\n' +
'          { from: "auth_service", to: "event_bus" }\n' +
'        ]\n' +
'      },\n' +
'      distributed: {\n' +
'        nodes: [\n' +
'          { id: "dist_node_a", name: "Leader (Montreal)", type: "Raft Master Node", col: 0x00f3ff, pos: [-2.0, 1.0, 0], desc: "Consensus coordinator syncing state across planetary nodes." },\n' +
'          { id: "dist_node_b", name: "Replica (Frankfurt)", type: "Sync Follower Peer", col: 0x38bdf8, pos: [0, 1.6, -0.6], desc: "Sub-15ms European replication peer." },\n' +
'          { id: "dist_node_c", name: "Edge (Tokyo)", type: "Accelerator Cache", col: 0x10b981, pos: [2.0, 0.6, 0.4], desc: "APAC localized cache and model weights mirror." },\n' +
'          { id: "dist_node_d", name: "Sensor (Sydney)", type: "Telemetry Health Probe", col: 0xf59e0b, pos: [0.5, -1.4, 0], desc: "Global latency health monitor and packet inspector." }\n' +
'        ],\n' +
'        links: [\n' +
'          { from: "dist_node_a", to: "dist_node_b" },\n' +
'          { from: "dist_node_b", to: "dist_node_c" },\n' +
'          { from: "dist_node_a", to: "dist_node_c" },\n' +
'          { from: "dist_node_a", to: "dist_node_d" },\n' +
'          { from: "dist_node_c", to: "dist_node_d" }\n' +
'        ]\n' +
'      }\n' +
'    };\n' +
'\n' +
'    let curPreset = "' + activePreset + '";\n' +
'    if (!presets[curPreset]) curPreset = "transformer";\n' +
'\n' +
'    const container = document.getElementById("canvas-container");\n' +
'    const scene = new THREE.Scene();\n' +
'    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);\n' +
'    camera.position.set(0, 0, 6.2);\n' +
'    const renderer = new THREE.WebGLRenderer({ antialias: true });\n' +
'    renderer.setSize(window.innerWidth, window.innerHeight);\n' +
'    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));\n' +
'    container.appendChild(renderer.domElement);\n' +
'\n' +
'    scene.add(new THREE.AmbientLight(0xffffff, 0.85));\n' +
'    const pLight = new THREE.PointLight(0x38bdf8, 3.2, 16);\n' +
'    pLight.position.set(3, 4, 5);\n' +
'    scene.add(pLight);\n' +
'    const rimLight = new THREE.PointLight(0xec4899, 2.5, 12);\n' +
'    rimLight.position.set(-3, -2, -2);\n' +
'    scene.add(rimLight);\n' +
'\n' +
'    const grp = new THREE.Group();\n' +
'    scene.add(grp);\n' +
'\n' +
'    let nodeMeshes = {};\n' +
'    let synapseParticles = [];\n' +
'    let pulseSpeed = 1.0;\n' +
'    let animTime = 0;\n' +
'\n' +
'    const titleEl = document.getElementById("sa-node-title");\n' +
'    const typeEl = document.getElementById("sa-node-type");\n' +
'    const descEl = document.getElementById("sa-node-desc");\n' +
'    const connsEl = document.getElementById("sa-node-conns");\n' +
'\n' +
'    function makeTextSprite(text, colorHex) {\n' +
'      const cvs = document.createElement("canvas");\n' +
'      cvs.width = 256; cvs.height = 64;\n' +
'      const ctx = cvs.getContext("2d");\n' +
'      ctx.fillStyle = "rgba(15,23,42,0.88)";\n' +
'      const colStr = "#" + (colorHex || 0x38bdf8).toString(16).padStart(6, "0");\n' +
'      ctx.strokeStyle = colStr;\n' +
'      ctx.lineWidth = 2.5;\n' +
'      if (ctx.roundRect) ctx.roundRect(4, 4, 248, 56, 12); else ctx.rect(4, 4, 248, 56);\n' +
'      ctx.fill(); ctx.stroke();\n' +
'      ctx.font = "bold 22px system-ui, sans-serif";\n' +
'      ctx.fillStyle = "#ffffff";\n' +
'      ctx.textAlign = "center";\n' +
'      ctx.textBaseline = "middle";\n' +
'      ctx.fillText(text, 128, 32);\n' +
'      const texture = new THREE.CanvasTexture(cvs);\n' +
'      const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true });\n' +
'      const sprite = new THREE.Sprite(spriteMat);\n' +
'      sprite.scale.set(1.4, 0.35, 1);\n' +
'      return sprite;\n' +
'    }\n' +
'\n' +
'    function build(presetKey) {\n' +
'      while (grp.children.length > 0) grp.remove(grp.children[0]);\n' +
'      nodeMeshes = {};\n' +
'      synapseParticles = [];\n' +
'      const data = presets[presetKey] || presets.transformer;\n' +
'      data.nodes.forEach((n) => {\n' +
'        const nGroup = new THREE.Group();\n' +
'        nGroup.position.set(n.pos[0], n.pos[1], n.pos[2]);\n' +
'        const r = 0.35;\n' +
'        const sphere = new THREE.Mesh(\n' +
'          new THREE.SphereGeometry(r, 24, 24),\n' +
'          new THREE.MeshStandardMaterial({ color: 0x0a1024, emissive: n.col, emissiveIntensity: 0.55, metalness: 0.85, roughness: 0.2 })\n' +
'        );\n' +
'        nGroup.add(sphere);\n' +
'        const halo = new THREE.Mesh(\n' +
'          new THREE.IcosahedronGeometry(r * 1.3, 1),\n' +
'          new THREE.MeshBasicMaterial({ color: n.col, wireframe: true, transparent: true, opacity: 0.35 })\n' +
'        );\n' +
'        nGroup.add(halo);\n' +
'        const ring = new THREE.Mesh(\n' +
'          new THREE.TorusGeometry(r * 1.5, 0.016, 8, 32),\n' +
'          new THREE.MeshBasicMaterial({ color: n.col, transparent: true, opacity: 0.85 })\n' +
'        );\n' +
'        ring.rotation.x = Math.PI / 2;\n' +
'        nGroup.add(ring);\n' +
'        const sprite = makeTextSprite(n.name, n.col);\n' +
'        sprite.position.set(0, r + 0.38, 0);\n' +
'        nGroup.add(sprite);\n' +
'        nGroup.userData = { id: n.id };\n' +
'        grp.add(nGroup);\n' +
'        nodeMeshes[n.id] = nGroup;\n' +
'      });\n' +
'      data.links.forEach((l) => {\n' +
'        const n1 = data.nodes.find(x => x.id === l.from);\n' +
'        const n2 = data.nodes.find(x => x.id === l.to);\n' +
'        if (!n1 || !n2) return;\n' +
'        const pts = [new THREE.Vector3(...n1.pos), new THREE.Vector3(...n2.pos)];\n' +
'        grp.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.35 })));\n' +
'        for (let k = 0; k < 2; k++) {\n' +
'          const pMesh = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));\n' +
'          grp.add(pMesh);\n' +
'          synapseParticles.push({\n' +
'            mesh: pMesh,\n' +
'            p1: n1.pos,\n' +
'            p2: n2.pos,\n' +
'            prog: Math.random()\n' +
'          });\n' +
'        }\n' +
'      });\n' +
'      if (data.nodes.length > 0) selectNode(data.nodes[0].id);\n' +
'    }\n' +
'\n' +
'    function selectNode(id) {\n' +
'      const data = presets[curPreset] || presets.transformer;\n' +
'      const n = data.nodes.find(x => x.id === id) || data.nodes[0];\n' +
'      if (!n) return;\n' +
'      Object.keys(nodeMeshes).forEach((k) => {\n' +
'        const grpNode = nodeMeshes[k];\n' +
'        if (grpNode) {\n' +
'          const isMatch = (k === n.id);\n' +
'          grpNode.scale.set(isMatch ? 1.25 : 1.0, isMatch ? 1.25 : 1.0, isMatch ? 1.25 : 1.0);\n' +
'        }\n' +
'      });\n' +
'      if (titleEl) titleEl.textContent = n.name;\n' +
'      if (typeEl) {\n' +
'        typeEl.textContent = n.type;\n' +
'        typeEl.style.color = "#" + (n.col || 0xf472b6).toString(16).padStart(6, "0");\n' +
'      }\n' +
'      if (descEl) descEl.textContent = n.desc;\n' +
'      if (connsEl) {\n' +
'        const conns = data.links.filter(l => l.from === n.id || l.to === n.id);\n' +
'        connsEl.innerHTML = conns.map((c) => {\n' +
'          const otherId = (c.from === n.id ? c.to : c.from);\n' +
'          const other = data.nodes.find(x => x.id === otherId);\n' +
'          return \'<button class="sa-conn-pill" data-nid="\' + otherId + \'" style="background:rgba(56,189,248,0.15);border:1px solid rgba(56,189,248,0.4);color:#38bdf8;border-radius:8px;padding:3px 8px;font-size:0.68rem;cursor:pointer;margin:2px;transition:all 0.2s">⚡ \' + (other ? other.name : otherId) + \'</button>\';\n' +
'        }).join("");\n' +
'        connsEl.querySelectorAll(".sa-conn-pill").forEach((b) => {\n' +
'          b.addEventListener("click", (ev) => {\n' +
'            ev.stopPropagation();\n' +
'            selectNode(b.getAttribute("data-nid"));\n' +
'          });\n' +
'        });\n' +
'      }\n' +
'    }\n' +
'\n' +
'    build(curPreset);\n' +
'\n' +
'    let isDown = false, px = 0, py = 0;\n' +
'    container.addEventListener("mousedown", (e) => { isDown = true; px = e.clientX; py = e.clientY; container.style.cursor = "grabbing"; });\n' +
'    window.addEventListener("mousemove", (e) => {\n' +
'      if (!isDown) return;\n' +
'      grp.rotation.y += (e.clientX - px) * 0.008;\n' +
'      grp.rotation.x += (e.clientY - py) * 0.008;\n' +
'      px = e.clientX; py = e.clientY;\n' +
'    });\n' +
'    window.addEventListener("mouseup", () => { isDown = false; container.style.cursor = "grab"; });\n' +
'    container.addEventListener("wheel", (e) => {\n' +
'      e.preventDefault();\n' +
'      camera.position.z += e.deltaY * 0.005;\n' +
'      camera.position.z = Math.max(3.0, Math.min(12.0, camera.position.z));\n' +
'    }, { passive: false });\n' +
'\n' +
'    container.addEventListener("click", (e) => {\n' +
'      const rect = container.getBoundingClientRect();\n' +
'      const mouse = new THREE.Vector2(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);\n' +
'      const raycaster = new THREE.Raycaster();\n' +
'      raycaster.setFromCamera(mouse, camera);\n' +
'      const hits = raycaster.intersectObjects(grp.children, true);\n' +
'      if (hits.length > 0) {\n' +
'        let p = hits[0].object;\n' +
'        while (p && p.parent !== grp && p.parent !== scene) p = p.parent;\n' +
'        if (p && p.userData && p.userData.id) selectNode(p.userData.id);\n' +
'      }\n' +
'    });\n' +
'\n' +
'    window.switchPreset = (p) => {\n' +
'      if (!presets[p]) return;\n' +
'      curPreset = p;\n' +
'      document.getElementById("btn-preset-trans").classList.toggle("active", p === "transformer");\n' +
'      document.getElementById("btn-preset-micro").classList.toggle("active", p === "microservices");\n' +
'      document.getElementById("btn-preset-dist").classList.toggle("active", p === "distributed");\n' +
'      build(p);\n' +
'    };\n' +
'\n' +
'    window.triggerPulse = () => {\n' +
'      pulseSpeed = 2.5;\n' +
'      setTimeout(() => { pulseSpeed = 1.0; }, 1800);\n' +
'    };\n' +
'\n' +
'    window.toggleFullscreen = () => {\n' +
'      if (!document.fullscreenElement) document.documentElement.requestFullscreen(); else document.exitFullscreen();\n' +
'    };\n' +
'\n' +
'    window.addEventListener("resize", () => {\n' +
'      camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix();\n' +
'      renderer.setSize(window.innerWidth, window.innerHeight);\n' +
'    });\n' +
'\n' +
'    function loop() {\n' +
'      requestAnimationFrame(loop);\n' +
'      animTime += 0.016 * pulseSpeed;\n' +
'      if (!isDown) {\n' +
'        grp.rotation.y += 0.003;\n' +
'        grp.rotation.x = Math.sin(animTime * 0.4) * 0.08;\n' +
'      }\n' +
'      synapseParticles.forEach((sp) => {\n' +
'        sp.prog = (sp.prog + 0.008 * pulseSpeed) % 1;\n' +
'        sp.mesh.position.set(\n' +
'          sp.p1[0] + (sp.p2[0] - sp.p1[0]) * sp.prog,\n' +
'          sp.p1[1] + (sp.p2[1] - sp.p1[1]) * sp.prog,\n' +
'          sp.p1[2] + (sp.p2[2] - sp.p1[2]) * sp.prog\n' +
'        );\n' +
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
      a.download = 'ultra-neural-graph-standalone.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);

      _toast(_isFr() ? '💾 Export HTML Graphe Neuronal téléchargé !' : '💾 Standalone Neural Graph HTML exported!', 'success');
    }
  };

  if (typeof window !== 'undefined') {
    window.UltraNeuralGraphStudio = UltraNeuralGraphStudio;
  }
})();
