// ══════════════════════════════════════════════════════════════════════════════
// COSMIC ODYSSEY: DEEP SPACE COMMANDER — v3.0 Ultimate Edition
// Real Solar System · Alien Invasion Waves · 6 Weapons · Warp Drive · Bilingual
// Built with Three.js for IA Architecte Studio ULTRA
// ══════════════════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ─────────────────────────────────────────────────────────────────────────────
  // WEB AUDIO ENGINE — Procedural SFX
  // ─────────────────────────────────────────────────────────────────────────────
  const AudioEngine = {
    ctx: null,
    muted: false,
    engineOsc: null,
    engineGain: null,

    init() {
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC) { this.ctx = new AC(); this._initEngineHum(); }
      }
      if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
    },

    _initEngineHum() {
      if (!this.ctx) return;
      try {
        this.engineOsc = this.ctx.createOscillator();
        this.engineGain = this.ctx.createGain();
        this.engineOsc.type = 'sawtooth';
        this.engineOsc.frequency.setValueAtTime(42, this.ctx.currentTime);
        this.engineGain.gain.setValueAtTime(0, this.ctx.currentTime);
        const f = this.ctx.createBiquadFilter();
        f.type = 'lowpass'; f.frequency.setValueAtTime(130, this.ctx.currentTime);
        this.engineOsc.connect(f); f.connect(this.engineGain);
        this.engineGain.connect(this.ctx.destination);
        this.engineOsc.start();
      } catch (e) {}
    },

    updateEngine(throttle) {
      if (this.muted || !this.engineGain || !this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        this.engineGain.gain.setTargetAtTime(throttle > 0.05 ? 0.07 * throttle : 0.01, now, 0.1);
        this.engineOsc.frequency.setTargetAtTime(38 + throttle * 48, now, 0.1);
      } catch (e) {}
    },

    playLaser(type) {
      if (this.muted || !this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const o = this.ctx.createOscillator(), g = this.ctx.createGain();
        o.connect(g); g.connect(this.ctx.destination);
        if (type === 'scatter') {
          o.type = 'triangle'; o.frequency.setValueAtTime(750, now);
          o.frequency.exponentialRampToValueAtTime(140, now + 0.12);
          g.gain.setValueAtTime(0.18, now); g.gain.linearRampToValueAtTime(0.01, now + 0.12);
          o.start(now); o.stop(now + 0.12);
        } else if (type === 'railgun') {
          o.type = 'sawtooth'; o.frequency.setValueAtTime(1200, now);
          o.frequency.exponentialRampToValueAtTime(60, now + 0.3);
          g.gain.setValueAtTime(0.3, now); g.gain.linearRampToValueAtTime(0.01, now + 0.3);
          o.start(now); o.stop(now + 0.3);
        } else if (type === 'singularity') {
          o.type = 'sine'; o.frequency.setValueAtTime(320, now);
          o.frequency.exponentialRampToValueAtTime(40, now + 0.5);
          g.gain.setValueAtTime(0.32, now); g.gain.linearRampToValueAtTime(0.01, now + 0.5);
          o.start(now); o.stop(now + 0.5);
        } else if (type === 'missile') {
          o.type = 'sawtooth'; o.frequency.setValueAtTime(200, now);
          o.frequency.exponentialRampToValueAtTime(60, now + 0.6);
          g.gain.setValueAtTime(0.22, now); g.gain.linearRampToValueAtTime(0.01, now + 0.6);
          o.start(now); o.stop(now + 0.6);
        } else if (type === 'torpedo') {
          o.type = 'square'; o.frequency.setValueAtTime(80, now);
          o.frequency.exponentialRampToValueAtTime(30, now + 0.8);
          g.gain.setValueAtTime(0.4, now); g.gain.linearRampToValueAtTime(0.01, now + 0.8);
          o.start(now); o.stop(now + 0.8);
        } else {
          o.type = 'sawtooth'; o.frequency.setValueAtTime(920, now);
          o.frequency.exponentialRampToValueAtTime(180, now + 0.09);
          g.gain.setValueAtTime(0.2, now); g.gain.linearRampToValueAtTime(0.01, now + 0.09);
          o.start(now); o.stop(now + 0.09);
        }
      } catch (e) {}
    },

    playAlienLaser() {
      if (this.muted || !this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const o = this.ctx.createOscillator(), g = this.ctx.createGain();
        o.connect(g); g.connect(this.ctx.destination);
        o.type = 'square'; o.frequency.setValueAtTime(380, now);
        o.frequency.exponentialRampToValueAtTime(90, now + 0.14);
        g.gain.setValueAtTime(0.1, now); g.gain.linearRampToValueAtTime(0.01, now + 0.14);
        o.start(now); o.stop(now + 0.14);
      } catch (e) {}
    },

    playExplosion(isLarge) {
      if (this.muted || !this.ctx) return;
      try {
        const now = this.ctx.currentTime, dur = isLarge ? 0.9 : 0.35;
        const len = Math.floor(this.ctx.sampleRate * dur);
        const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (len * 0.3));
        const noise = this.ctx.createBufferSource();
        noise.buffer = buf;
        const f = this.ctx.createBiquadFilter(); f.type = 'lowpass';
        f.frequency.setValueAtTime(isLarge ? 340 : 540, now);
        f.frequency.exponentialRampToValueAtTime(40, now + dur);
        const g = this.ctx.createGain();
        g.gain.setValueAtTime(isLarge ? 0.5 : 0.25, now);
        g.gain.linearRampToValueAtTime(0.01, now + dur);
        noise.connect(f); f.connect(g); g.connect(this.ctx.destination);
        noise.start(now);
      } catch (e) {}
    },

    playShieldHit() {
      if (this.muted || !this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const o = this.ctx.createOscillator(), g = this.ctx.createGain();
        o.connect(g); g.connect(this.ctx.destination);
        o.type = 'sine'; o.frequency.setValueAtTime(640, now);
        o.frequency.exponentialRampToValueAtTime(200, now + 0.2);
        g.gain.setValueAtTime(0.22, now); g.gain.linearRampToValueAtTime(0.01, now + 0.2);
        o.start(now); o.stop(now + 0.2);
      } catch (e) {}
    },

    playEMP() {
      if (this.muted || !this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const o = this.ctx.createOscillator(), g = this.ctx.createGain();
        o.connect(g); g.connect(this.ctx.destination);
        o.type = 'sawtooth'; o.frequency.setValueAtTime(100, now);
        o.frequency.exponentialRampToValueAtTime(1600, now + 0.35);
        o.frequency.exponentialRampToValueAtTime(80, now + 0.85);
        g.gain.setValueAtTime(0.4, now); g.gain.linearRampToValueAtTime(0.01, now + 0.85);
        o.start(now); o.stop(now + 0.85);
      } catch (e) {}
    },

    playScan() {
      if (this.muted || !this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
          const o = this.ctx.createOscillator(), g = this.ctx.createGain();
          o.connect(g); g.connect(this.ctx.destination);
          o.type = 'sine'; o.frequency.setValueAtTime(f, now + i * 0.08);
          g.gain.setValueAtTime(0.14, now + i * 0.08);
          g.gain.linearRampToValueAtTime(0.01, now + i * 0.08 + 0.18);
          o.start(now + i * 0.08); o.stop(now + i * 0.08 + 0.18);
        });
      } catch (e) {}
    },

    playWarp() {
      if (this.muted || !this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const o = this.ctx.createOscillator(), g = this.ctx.createGain();
        o.connect(g); g.connect(this.ctx.destination);
        o.type = 'sine'; o.frequency.setValueAtTime(80, now);
        o.frequency.exponentialRampToValueAtTime(3200, now + 0.6);
        o.frequency.exponentialRampToValueAtTime(120, now + 1.2);
        g.gain.setValueAtTime(0.5, now); g.gain.linearRampToValueAtTime(0.01, now + 1.4);
        o.start(now); o.stop(now + 1.4);
      } catch (e) {}
    },

    playAlarm() {
      if (this.muted || !this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        [0, 0.15, 0.3].forEach(t => {
          const o = this.ctx.createOscillator(), g = this.ctx.createGain();
          o.connect(g); g.connect(this.ctx.destination);
          o.type = 'square'; o.frequency.setValueAtTime(880, now + t);
          g.gain.setValueAtTime(0.12, now + t); g.gain.linearRampToValueAtTime(0, now + t + 0.12);
          o.start(now + t); o.stop(now + t + 0.12);
        });
      } catch (e) {}
    },

    playLootPickup() {
      if (this.muted || !this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        [660, 880, 1174, 1568].forEach((f, i) => {
          const o = this.ctx.createOscillator(), g = this.ctx.createGain();
          o.connect(g); g.connect(this.ctx.destination);
          o.type = 'sine'; o.frequency.setValueAtTime(f, now + i * 0.05);
          g.gain.setValueAtTime(0.15, now + i * 0.05);
          g.gain.linearRampToValueAtTime(0.01, now + i * 0.05 + 0.12);
          o.start(now + i * 0.05); o.stop(now + i * 0.05 + 0.12);
        });
      } catch (e) {}
    },

    playLockOn() {
      if (this.muted || !this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const o = this.ctx.createOscillator(), g = this.ctx.createGain();
        o.connect(g); g.connect(this.ctx.destination);
        o.type = 'triangle'; o.frequency.setValueAtTime(1400, now);
        o.frequency.setValueAtTime(1850, now + 0.06);
        g.gain.setValueAtTime(0.12, now); g.gain.linearRampToValueAtTime(0.01, now + 0.12);
        o.start(now); o.stop(now + 0.12);
      } catch (e) {}
    },

    playBoost() {
      if (this.muted || !this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const o = this.ctx.createOscillator(), g = this.ctx.createGain();
        o.connect(g); g.connect(this.ctx.destination);
        o.type = 'sawtooth'; o.frequency.setValueAtTime(90, now);
        o.frequency.exponentialRampToValueAtTime(280, now + 0.3);
        g.gain.setValueAtTime(0.2, now); g.gain.linearRampToValueAtTime(0.02, now + 0.35);
        o.start(now); o.stop(now + 0.35);
      } catch (e) {}
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // PROCEDURAL TEXTURE GENERATOR
  // ─────────────────────────────────────────────────────────────────────────────
  const TexGen = {
    star() {
      const c = document.createElement('canvas'); c.width = c.height = 64;
      const x = c.getContext('2d');
      const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, 'rgba(255,255,255,1)');
      g.addColorStop(0.2, 'rgba(165,243,252,0.85)');
      g.addColorStop(0.5, 'rgba(56,189,248,0.35)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      x.fillStyle = g; x.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(c);
    },

    nebula(c1, c2) {
      const c = document.createElement('canvas'); c.width = c.height = 256;
      const x = c.getContext('2d');
      const g = x.createRadialGradient(128, 128, 10, 128, 128, 128);
      g.addColorStop(0, c1); g.addColorStop(0.45, c2); g.addColorStop(1, 'rgba(0,0,0,0)');
      x.fillStyle = g; x.fillRect(0, 0, 256, 256);
      return new THREE.CanvasTexture(c);
    },

    sun() {
      const c = document.createElement('canvas'); c.width = c.height = 512;
      const x = c.getContext('2d');
      const g = x.createRadialGradient(256, 256, 0, 256, 256, 256);
      g.addColorStop(0, '#fff9c4');
      g.addColorStop(0.25, '#ffd54f');
      g.addColorStop(0.55, '#ff8f00');
      g.addColorStop(0.8, '#e65100');
      g.addColorStop(1, '#b71c1c');
      x.fillStyle = g; x.fillRect(0, 0, 512, 512);
      // surface turbulence
      for (let i = 0; i < 60; i++) {
        const rx = 30 + Math.random() * 220, ry = 30 + Math.random() * 450;
        const r = 8 + Math.random() * 20;
        x.fillStyle = `rgba(255,${Math.floor(160+Math.random()*95)},0,0.18)`;
        x.beginPath(); x.arc(rx, ry, r, 0, Math.PI * 2); x.fill();
      }
      const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
    },

    earthLike() {
      const c = document.createElement('canvas'); c.width = 1024; c.height = 512;
      const x = c.getContext('2d');
      const og = x.createLinearGradient(0, 0, 0, 512);
      og.addColorStop(0, '#0b1d3a'); og.addColorStop(0.5, '#0d3268'); og.addColorStop(1, '#0b1d3a');
      x.fillStyle = og; x.fillRect(0, 0, 1024, 512);
      x.fillStyle = '#1e3a29';
      for (let i = 0; i < 32; i++) {
        const px = (Math.sin(i * 1.9) * 0.5 + 0.5) * 1024;
        const py = 80 + (Math.cos(i * 2.3) * 0.5 + 0.5) * 350;
        const r = 40 + (i % 5) * 22;
        x.beginPath(); x.arc(px, py, r, 0, Math.PI * 2); x.fill();
        x.fillStyle = '#2d6a4f';
        x.beginPath(); x.arc(px + 12, py - 10, r * 0.7, 0, Math.PI * 2); x.fill();
        x.fillStyle = '#b79257';
        x.beginPath(); x.arc(px - 15, py + 15, r * 0.35, 0, Math.PI * 2); x.fill();
        x.fillStyle = '#1e3a29';
      }
      x.fillStyle = 'rgba(240,249,255,0.9)';
      x.fillRect(0, 0, 1024, 40); x.fillRect(0, 472, 1024, 40);
      const t = new THREE.CanvasTexture(c); t.wrapS = THREE.RepeatWrapping; return t;
    },

    clouds() {
      const c = document.createElement('canvas'); c.width = 1024; c.height = 512;
      const x = c.getContext('2d'); x.clearRect(0, 0, 1024, 512);
      x.fillStyle = 'rgba(255,255,255,0.72)';
      for (let i = 0; i < 70; i++) {
        const px = Math.random() * 1024, py = 50 + Math.random() * 412;
        x.beginPath(); x.ellipse(px, py, 35 + Math.random() * 65, 12 + Math.random() * 22,
          Math.random() * 0.3 - 0.15, 0, Math.PI * 2); x.fill();
      }
      const t = new THREE.CanvasTexture(c); t.wrapS = THREE.RepeatWrapping; return t;
    },

    gasGiant(hue) {
      const c = document.createElement('canvas'); c.width = 1024; c.height = 512;
      const x = c.getContext('2d');
      const bands = hue === 'blue'
        ? ['#1a237e','#283593','#0d47a1','#1565c0','#1976d2','#1e88e5','#0b3d91','#1a237e']
        : ['#d97706','#fef3c7','#92400e','#b45309','#fef08a','#78350f','#d97706','#fef3c7'];
      const bh = 512 / bands.length;
      bands.forEach((col, i) => { x.fillStyle = col; x.fillRect(0, i * bh, 1024, bh + 2); });
      const v = x.createRadialGradient(380, 290, 5, 380, 290, 65);
      v.addColorStop(0, hue === 'blue' ? '#e53935' : '#f43f5e');
      v.addColorStop(0.7, hue === 'blue' ? '#b71c1c' : '#be123c');
      v.addColorStop(1, 'rgba(190,18,60,0)');
      x.fillStyle = v; x.beginPath(); x.ellipse(380, 290, 65, 38, 0, 0, Math.PI * 2); x.fill();
      const t = new THREE.CanvasTexture(c); t.wrapS = THREE.RepeatWrapping; return t;
    },

    rings() {
      const c = document.createElement('canvas'); c.width = 512; c.height = 64;
      const x = c.getContext('2d');
      const g = x.createLinearGradient(0, 0, 512, 0);
      g.addColorStop(0, 'rgba(251,191,36,0)'); g.addColorStop(0.15, 'rgba(251,191,36,0.6)');
      g.addColorStop(0.35, 'rgba(245,158,11,0.85)'); g.addColorStop(0.5, 'rgba(0,0,0,0.05)');
      g.addColorStop(0.65, 'rgba(251,191,36,0.7)'); g.addColorStop(0.9, 'rgba(217,119,6,0.4)');
      g.addColorStop(1, 'rgba(217,119,6,0)');
      x.fillStyle = g; x.fillRect(0, 0, 512, 64);
      return new THREE.CanvasTexture(c);
    },

    volcanic() {
      const c = document.createElement('canvas'); c.width = 1024; c.height = 512;
      const x = c.getContext('2d');
      x.fillStyle = '#1c1917'; x.fillRect(0, 0, 1024, 512);
      x.strokeStyle = '#ea580c'; x.lineWidth = 4;
      for (let i = 0; i < 40; i++) {
        let px = Math.random() * 1024, py = Math.random() * 512;
        x.beginPath(); x.moveTo(px, py);
        for (let s = 0; s < 5; s++) { px += (Math.random() - 0.5) * 80; py += (Math.random() - 0.5) * 50; x.lineTo(px, py); }
        x.stroke();
      }
      x.strokeStyle = '#fef08a'; x.lineWidth = 1.5;
      for (let i = 0; i < 20; i++) {
        let px = Math.random() * 1024, py = Math.random() * 512;
        x.beginPath(); x.moveTo(px, py);
        px += (Math.random() - 0.5) * 60; py += (Math.random() - 0.5) * 40; x.lineTo(px, py); x.stroke();
      }
      const t = new THREE.CanvasTexture(c); t.wrapS = THREE.RepeatWrapping; return t;
    },

    ice() {
      const c = document.createElement('canvas'); c.width = 1024; c.height = 512;
      const x = c.getContext('2d');
      x.fillStyle = '#e0f2fe'; x.fillRect(0, 0, 1024, 512);
      x.strokeStyle = '#0284c7'; x.lineWidth = 2.5;
      for (let i = 0; i < 45; i++) {
        let px = Math.random() * 1024, py = Math.random() * 512;
        x.beginPath(); x.moveTo(px, py);
        for (let s = 0; s < 4; s++) { px += (Math.random() - 0.5) * 90; py += (Math.random() - 0.5) * 70; x.lineTo(px, py); }
        x.stroke();
      }
      const t = new THREE.CanvasTexture(c); t.wrapS = THREE.RepeatWrapping; return t;
    },

    desert() {
      const c = document.createElement('canvas'); c.width = 1024; c.height = 512;
      const x = c.getContext('2d');
      const g = x.createLinearGradient(0, 0, 0, 512);
      g.addColorStop(0, '#c2410c'); g.addColorStop(0.4, '#ea580c'); g.addColorStop(0.7, '#d97706'); g.addColorStop(1, '#92400e');
      x.fillStyle = g; x.fillRect(0, 0, 1024, 512);
      for (let i = 0; i < 55; i++) {
        const px = Math.random() * 1024, py = Math.random() * 512;
        x.fillStyle = `rgba(${Math.floor(180 + Math.random() * 75)},${Math.floor(80 + Math.random() * 40)},${Math.floor(20 + Math.random() * 30)},0.3)`;
        x.beginPath(); x.arc(px, py, 20 + Math.random() * 50, 0, Math.PI * 2); x.fill();
      }
      const t = new THREE.CanvasTexture(c); t.wrapS = THREE.RepeatWrapping; return t;
    },

    moon() {
      const c = document.createElement('canvas'); c.width = 512; c.height = 512;
      const x = c.getContext('2d');
      x.fillStyle = '#9ca3af'; x.fillRect(0, 0, 512, 512);
      for (let i = 0; i < 30; i++) {
        const px = Math.random() * 512, py = Math.random() * 512, r = 8 + Math.random() * 28;
        x.fillStyle = '#6b7280'; x.beginPath(); x.arc(px, py, r, 0, Math.PI * 2); x.fill();
        x.fillStyle = '#d1d5db'; x.beginPath(); x.arc(px - r * 0.25, py - r * 0.25, r * 0.35, 0, Math.PI * 2); x.fill();
      }
      const t = new THREE.CanvasTexture(c); t.wrapS = THREE.RepeatWrapping; return t;
    },

    asteroid() {
      const c = document.createElement('canvas'); c.width = c.height = 256;
      const x = c.getContext('2d');
      x.fillStyle = '#475569'; x.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 24; i++) {
        const px = Math.random() * 256, py = Math.random() * 256, r = 6 + Math.random() * 16;
        x.fillStyle = '#1e293b'; x.beginPath(); x.arc(px, py, r, 0, Math.PI * 2); x.fill();
        x.strokeStyle = '#94a3b8'; x.lineWidth = 2;
        x.beginPath(); x.arc(px, py, r, Math.PI * 0.2, Math.PI * 1.2); x.stroke();
      }
      return new THREE.CanvasTexture(c);
    },

    comet() {
      const c = document.createElement('canvas'); c.width = 128; c.height = 128;
      const x = c.getContext('2d');
      const g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
      g.addColorStop(0, 'rgba(200,230,255,1)');
      g.addColorStop(0.3, 'rgba(100,200,255,0.6)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      x.fillStyle = g; x.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(c);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // MAIN GAME ENGINE
  // ─────────────────────────────────────────────────────────────────────────────
  const Game = {
    // Core
    container: null, canvas: null, renderer: null,
    scene: null, camera: null,
    running: false, paused: false, animId: null,
    cameraMode: 'chase', // 'chase' | 'cockpit'

    // Player
    player: {
      group: null,
      shipModel: null, // inner group for roll/banking tilt
      hull: 250, maxHull: 250,
      shield: 300, maxShield: 300,
      energy: 200, maxEnergy: 200,
      heat: 0, maxHeat: 100,
      score: 0, credits: 0,
      speed: 4.5, baseCruiseSpeed: 4.5, maxSpeed: 10.5, boostSpeed: 20.0, accel: 0.16,
      bankAngle: 0, targetBankAngle: 0,
      turnVelocity: { yaw: 0, pitch: 0, roll: 0 },
      weapon: 'pulse',
      empReady: true, empCooldown: 0,
      invulnTimer: 180,
      damageCooldown: 0,
      emergencyRepairUsed: false,
      thrusterLight: null,
      flames: [], reactorCore: null,
      shieldMesh: null, shieldFlash: 0,
      warpActive: false, warpTimer: 0, warpTarget: null,
      warpParticles: [],
      damageFlash: 0, // screen edge flash
      overdriveTimer: 0, // temporary hyper-weapon overdrive
      // Upgrades
      upgrades: { hullMax: 0, shieldMax: 0, energyMax: 0, fireRate: 0, engineBoost: 0 }
    },

    // Input
    keys: {},
    mouse: { down: false, lastX: 0, lastY: 0 },

    // Scene objects
    sun: null,
    sunLight: null,
    sunCorona: null,
    planets: [],
    moons: [],
    asteroids: [],
    comets: [],
    enemies: [],
    playerLasers: [],
    alienLasers: [],
    particles: [],
    shockwaves: [],
    missileTrails: [],
    lootDrops: [],         // magnetic floating salvage
    spaceDust: null,       // high-speed 3D cosmic dust stream
    spaceDustGeo: null,
    spaceDustPos: null,
    tacticalHudEl: null,
    lastLockBeep: 0,

    // Game state
    wave: 1,
    waveEnemiesLeft: 0,
    waveInProgress: false,
    waveTimer: 0,
    bossActive: false,
    discoveredPlanets: [],
    leaderboard: [],

    // Camera dynamics
    cameraShake: 0,
    cameraShakeVel: new THREE.Vector3(),
    currentFov: 65,

    // Timers
    lastTime: 0,
    elapsedTime: 0,
    cometSpawnTimer: 400,


    // ── INIT ─────────────────────────────────────────────────────────────────
    init() {
      if (this.renderer) return;
      this.canvas = document.getElementById('cosmic-canvas');
      if (!this.canvas) return;
      this.container = this.canvas.parentElement;
      const w = this.container.clientWidth || window.innerWidth;
      const h = this.container.clientHeight || window.innerHeight;

      // Renderer
      this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
      this.renderer.setSize(w, h);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 2.5; // much brighter


      // Scene
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.FogExp2(0x010209, 0.000018); // much lighter fog
      this.camera = new THREE.PerspectiveCamera(65, w / h, 0.5, 80000);

      // Ambient — much brighter so everything is visible
      const amb = new THREE.AmbientLight(0x334466, 1.8);
      this.scene.add(amb);

      // Strong fill light from front-top (always illuminates the player area)
      const fillLight = new THREE.DirectionalLight(0xfff8e7, 2.2);
      fillLight.position.set(500, 800, 2000);
      this.scene.add(fillLight);

      // Secondary fill from below-left for depth
      const fillLight2 = new THREE.DirectionalLight(0x4488cc, 1.0);
      fillLight2.position.set(-800, -400, 1500);
      this.scene.add(fillLight2);


      // Build world
      this._buildStarfield();
      this._buildSpaceDust();
      this._buildNebulae();
      this._buildSun();
      this._buildSolarSystem();
      this._buildAsteroidBelt();
      this._buildPlayerShip();
      this._bindEvents();
      this._loadLeaderboard();

      this.tacticalHudEl = document.getElementById('cosmic-tactical-hud');

      window.addEventListener('resize', () => this.onResize());
    },

    // ── STARFIELD ────────────────────────────────────────────────────────────
    _buildStarfield() {
      const count = 8000;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      const palette = [new THREE.Color(0xa5f3fc), new THREE.Color(0xffffff),
                       new THREE.Color(0xfef08a), new THREE.Color(0xfca5a5),
                       new THREE.Color(0xc4b5fd), new THREE.Color(0x7dd3fc)];
      for (let i = 0; i < count; i++) {
        // Stars at 3000-25000 units — much closer so they're visible
        const r = 3000 + Math.random() * 22000;
        const t = Math.random() * Math.PI * 2;
        const p = Math.acos(Math.random() * 2 - 1);
        pos[i*3]   = r * Math.sin(p) * Math.cos(t);
        pos[i*3+1] = r * Math.sin(p) * Math.sin(t);
        pos[i*3+2] = r * Math.cos(p);
        const c = palette[Math.floor(Math.random() * palette.length)];
        col[i*3] = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b;
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      const mat = new THREE.PointsMaterial({
        size: 90, vertexColors: true, map: TexGen.star(),
        transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
        sizeAttenuation: true
      });
      this.scene.add(new THREE.Points(geo, mat));
    },

    // ── SPACE DUST & SPEED WARP STREAM ───────────────────────────────────────
    _buildSpaceDust() {
      const count = 1500;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        pos[i * 3]     = (Math.random() - 0.5) * 800;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 600;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 1000;

        const isCyan = Math.random() < 0.65;
        col[i * 3]     = isCyan ? 0.25 : 1.0;
        col[i * 3 + 1] = isCyan ? 0.85 : 0.95;
        col[i * 3 + 2] = 1.0;
      }

      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

      const mat = new THREE.PointsMaterial({
        size: 8.0,
        vertexColors: true,
        map: TexGen.star(),
        transparent: true,
        opacity: 0.88,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      this.spaceDust = new THREE.Points(geo, mat);
      this.spaceDustGeo = geo;
      this.spaceDustPos = pos;
      this.scene.add(this.spaceDust);
    },

    _updateSpaceDust() {
      if (!this.spaceDust || !this.player.group) return;
      const pg = this.player.group;
      const pos = this.spaceDustPos;
      const fwd = new THREE.Vector3(0, 0, 1).applyQuaternion(pg.quaternion).normalize();
      const spd = Math.max(1.5, Math.abs(this.player.speed));
      const moveFactor = spd * 3.2;

      this.spaceDust.position.copy(pg.position);

      const fwdX = fwd.x * moveFactor, fwdY = fwd.y * moveFactor, fwdZ = fwd.z * moveFactor;
      for (let i = 0; i < pos.length; i += 3) {
        pos[i]     -= fwdX;
        pos[i + 1] -= fwdY;
        pos[i + 2] -= fwdZ;

        if (pos[i] > 400) pos[i] -= 800;
        else if (pos[i] < -400) pos[i] += 800;

        if (pos[i + 1] > 300) pos[i + 1] -= 600;
        else if (pos[i + 1] < -300) pos[i + 1] += 600;

        if (pos[i + 2] < -450) pos[i + 2] += 950;
        else if (pos[i + 2] > 500) pos[i + 2] -= 950;
      }
      this.spaceDustGeo.attributes.position.needsUpdate = true;

      // Stretch & glow on boost
      if (this.keys['shift']) {
        this.spaceDust.material.size = 18.0;
        this.spaceDust.material.opacity = 1.0;
      } else {
        this.spaceDust.material.size = 8.0;
        this.spaceDust.material.opacity = 0.88;
      }
    },



    // ── NEBULAE ──────────────────────────────────────────────────────────────
    _buildNebulae() {
      [
        { c1:'rgba(124,58,237,0.4)', c2:'rgba(59,130,246,0.2)',  p:[12000,2000,-16000], s:5500 },
        { c1:'rgba(236,72,153,0.35)',c2:'rgba(139,92,246,0.18)', p:[-14000,-1500,-13000],s:6000 },
        { c1:'rgba(6,182,212,0.35)', c2:'rgba(16,185,129,0.18)',p:[8000,-3000,14000],   s:5000 },
        { c1:'rgba(245,158,11,0.3)',c2:'rgba(239,68,68,0.15)',  p:[-10000,4000,12000],  s:5800 },
        { c1:'rgba(52,211,153,0.3)',c2:'rgba(16,185,129,0.12)', p:[18000,-2000,2000],   s:6500 }
      ].forEach(cfg => {
        const geo = new THREE.PlaneGeometry(cfg.s, cfg.s);
        const mat = new THREE.MeshBasicMaterial({
          map: TexGen.nebula(cfg.c1, cfg.c2), transparent: true,
          blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide
        });
        const m = new THREE.Mesh(geo, mat);
        m.position.set(...cfg.p); m.lookAt(0, 0, 0);
        this.scene.add(m);
      });
    },

    // ── SUN ──────────────────────────────────────────────────────────────────
    _buildSun() {
      const group = new THREE.Group();

      // Sun sphere
      const sunGeo = new THREE.SphereGeometry(850, 48, 48);
      const sunMat = new THREE.MeshBasicMaterial({ map: TexGen.sun() });
      const sunMesh = new THREE.Mesh(sunGeo, sunMat);
      group.add(sunMesh);

      // Outer corona glow
      const coronaGeo = new THREE.SphereGeometry(970, 32, 32);
      const coronaMat = new THREE.MeshBasicMaterial({
        color: 0xff8c00, transparent: true, opacity: 0.18,
        side: THREE.BackSide, blending: THREE.AdditiveBlending
      });
      group.add(new THREE.Mesh(coronaGeo, coronaMat));

      // Second corona layer
      const corona2Geo = new THREE.SphereGeometry(1100, 32, 32);
      const corona2Mat = new THREE.MeshBasicMaterial({
        color: 0xff6600, transparent: true, opacity: 0.07,
        side: THREE.BackSide, blending: THREE.AdditiveBlending
      });
      this.sunCorona = new THREE.Mesh(corona2Geo, corona2Mat);
      group.add(this.sunCorona);

      // Sun position — closer so it illuminates the scene properly
      group.position.set(0, 0, -5500);
      this.scene.add(group);
      this.sun = group;

      // Primary sun light — very powerful, reaches player area
      const sunLight = new THREE.PointLight(0xfff4e0, 4.5, 0, 0.4); // decay 0 = reaches everywhere
      sunLight.position.set(0, 0, -5500);
      this.scene.add(sunLight);
      this.sunLight = sunLight;

      // Strong directional sun ray from sun direction
      const sunDir = new THREE.DirectionalLight(0xffeedd, 2.8);
      sunDir.position.set(0, 500, -5500);
      sunDir.target.position.set(0, 0, 0);
      this.scene.add(sunDir);
      this.scene.add(sunDir.target);

      // Rim fill
      const rimLight = new THREE.DirectionalLight(0x3366bb, 0.6);
      rimLight.position.set(-1000, -800, 5000);
      this.scene.add(rimLight);

    },

    // ── SOLAR SYSTEM ─────────────────────────────────────────────────────────
    _buildSolarSystem() {
      const defs = [
        {
          name: 'Aethelgard Prime', type: 'Habitable Terrestrial / Terrestre habitable',
          r: 280, orbitR: 1200, orbitSpeed: 0.00022, axialTilt: 0.41,
          tex: () => TexGen.earthLike(), clouds: true, atmColor: 0x38bdf8,
          data: { atm:'Nitrogen-Oxygen 1.02 atm', temp:'19°C', bio:'Flora & Aquatic Life', min:'Titanium, Rare Silicates' },
          hasMoon: true, moonR: 65, moonOrbitR: 420
        },
        {
          name: 'Kronos-IV', type: 'Gas Giant / Géante gazeuse',
          r: 480, orbitR: 2200, orbitSpeed: 0.00012, axialTilt: 0.12,
          tex: () => TexGen.gasGiant('amber'), clouds: false, hasRings: true, atmColor: 0xf59e0b,
          data: { atm:'Hydrogen-Helium-Methane', temp:'-148°C', bio:'No organic traces', min:'Deuterium, Methane' }
        },
        {
          name: 'Pyros-Beta', type: 'Volcanic World / Monde volcanique',
          r: 230, orbitR: 1600, orbitSpeed: 0.00018, axialTilt: 0.08,
          tex: () => TexGen.volcanic(), clouds: false, atmColor: 0xf97316,
          data: { atm:'Sulfur Dioxide Heavy', temp:'820°C', bio:'Pyro-bacteria traces', min:'Magma Core, Obsidian' }
        },
        {
          name: 'Glacies-9', type: 'Cryo World / Monde cryogénique',
          r: 220, orbitR: 3000, orbitSpeed: 0.000085, axialTilt: 0.55,
          tex: () => TexGen.ice(), clouds: false, atmColor: 0xa5f3fc,
          data: { atm:'Sub-Zero Argon', temp:'-215°C', bio:'Cryo-spores detected', min:'Superconducting Crystals' },
          hasMoon: true, moonR: 55, moonOrbitR: 340
        },
        {
          name: 'Xandar Reach', type: 'Desert World / Monde désertique',
          r: 255, orbitR: 1900, orbitSpeed: 0.00015, axialTilt: 0.25,
          tex: () => TexGen.desert(), clouds: false, atmColor: 0xfb923c,
          data: { atm:'Thin CO2 & Dust', temp:'78°C', bio:'No biosignatures', min:'Iron Oxide, Silicon' }
        },
        {
          name: 'Nebulos Major', type: 'Blue Gas Giant / Géante bleue',
          r: 420, orbitR: 4000, orbitSpeed: 0.000065, axialTilt: 0.87,
          tex: () => TexGen.gasGiant('blue'), clouds: false, atmColor: 0x60a5fa,
          data: { atm:'Ammonia & Hydrogen', temp:'-195°C', bio:'Atmospheric microbes?', min:'Liquid Metallic Hydrogen' }
        },
        {
          name: 'Mordas Prime', type: 'Dead Rock / Roche morte',
          r: 185, orbitR: 700, orbitSpeed: 0.00038, axialTilt: 0.02,
          tex: () => TexGen.moon(), clouds: false, atmColor: 0x78716c,
          data: { atm:'Vacuum', temp:'-80°C', bio:'None', min:'Iron, Nickel, Helium-3' }
        },
        {
          name: 'Solaris Rex', type: 'Super Earth / Super-Terre',
          r: 320, orbitR: 2600, orbitSpeed: 0.00010, axialTilt: 0.35,
          tex: () => TexGen.earthLike(), clouds: true, atmColor: 0x34d399,
          data: { atm:'Dense Oxygen-Nitrogen', temp:'32°C', bio:'Rich Biosphere', min:'Gold, Diamonds, Crystals' }
        }
      ];


      defs.forEach((def, idx) => {
        const group = new THREE.Group();
        const angle = (idx / defs.length) * Math.PI * 2;

        // Orbit position (relative to sun at 0,0,-5500)
        const ox = Math.cos(angle) * def.orbitR;
        const oz = -5500 + Math.sin(angle) * def.orbitR;
        group.position.set(ox, (Math.random() - 0.5) * 200, oz);
        group.rotation.z = def.axialTilt;

        // Planet sphere
        const geo = new THREE.SphereGeometry(def.r, 48, 48);
        const mat = new THREE.MeshStandardMaterial({ map: def.tex(), roughness: 0.7, metalness: 0.1 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.castShadow = true; mesh.receiveShadow = true;
        group.add(mesh);

        // Clouds
        let cloudMesh = null;
        if (def.clouds) {
          const cg = new THREE.SphereGeometry(def.r + 5, 48, 48);
          const cm = new THREE.MeshStandardMaterial({ map: TexGen.clouds(), transparent: true, opacity: 0.6, depthWrite: false });
          cloudMesh = new THREE.Mesh(cg, cm);
          group.add(cloudMesh);
        }

        // Rings
        if (def.hasRings) {
          const rg = new THREE.RingGeometry(def.r * 1.4, def.r * 2.4, 64);
          const rm = new THREE.MeshBasicMaterial({ map: TexGen.rings(), side: THREE.DoubleSide, transparent: true, opacity: 0.82 });
          const ring = new THREE.Mesh(rg, rm);
          ring.rotation.x = Math.PI * 0.42; ring.rotation.y = Math.PI * 0.12;
          group.add(ring);
        }

        // Atmosphere halo
        const hg = new THREE.SphereGeometry(def.r * 1.06, 32, 32);
        const hm = new THREE.MeshBasicMaterial({
          color: def.atmColor, transparent: true, opacity: 0.16,
          side: THREE.BackSide, blending: THREE.AdditiveBlending
        });
        group.add(new THREE.Mesh(hg, hm));

        // Orbit ring guide (subtle)
        const orbitGeo = new THREE.RingGeometry(def.orbitR - 1, def.orbitR + 1, 128);
        const orbitMat = new THREE.MeshBasicMaterial({ color: 0x1e3a5f, transparent: true, opacity: 0.12, side: THREE.DoubleSide });
        const orbitRing = new THREE.Mesh(orbitGeo, orbitMat);
        orbitRing.rotation.x = Math.PI * 0.5;
        orbitRing.position.set(0, group.position.y, -5500);
        this.scene.add(orbitRing);

        this.scene.add(group);

        const planetData = {
          name: def.name, type: def.type, data: def.data,
          group, mesh, cloudMesh,
          radius: def.r, orbitRadius: def.orbitR,
          orbitSpeed: def.orbitSpeed, orbitAngle: angle,
          orbitY: group.position.y,
          scanned: false
        };
        this.planets.push(planetData);

        // Moon
        if (def.hasMoon) {
          const mg = new THREE.SphereGeometry(def.moonR, 24, 24);
          const mm = new THREE.MeshStandardMaterial({ map: TexGen.moon(), roughness: 0.9, metalness: 0.05 });
          const moonMesh = new THREE.Mesh(mg, mm);
          group.add(moonMesh);
          this.moons.push({
            mesh: moonMesh, parentPlanet: planetData,
            orbitAngle: Math.random() * Math.PI * 2,
            orbitRadius: def.moonOrbitR,
            orbitSpeed: 0.0008 + Math.random() * 0.001
          });
        }
      });
    },

    // ── ASTEROID BELT ────────────────────────────────────────────────────────
    _buildAsteroidBelt() {
      const rockTex = TexGen.asteroid();
      const rockMat = new THREE.MeshStandardMaterial({ map: rockTex, roughness: 0.92, metalness: 0.15 });

      for (let i = 0; i < 220; i++) {
        const r = 18 + Math.random() * 32;
        const geo = new THREE.DodecahedronGeometry(r, 1);
        const pa = geo.attributes.position;
        for (let v = 0; v < pa.count; v++) {
          const noise = 0.78 + Math.random() * 0.44;
          pa.setXYZ(v, pa.getX(v) * noise, pa.getY(v) * noise, pa.getZ(v) * noise);
        }
        geo.computeVertexNormals();

        const mesh = new THREE.Mesh(geo, rockMat);
        mesh.castShadow = true; mesh.receiveShadow = true;

        // Belt around 3200-4800 units from player start (0,0,0)
        const beltR = 3200 + Math.random() * 1600;
        const angle = Math.random() * Math.PI * 2;
        const elev = (Math.random() - 0.5) * 650;
        mesh.position.set(Math.cos(angle) * beltR, elev, Math.sin(angle) * beltR);
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        this.scene.add(mesh);

        this.asteroids.push({
          mesh, r,
          hp: Math.ceil(r * 1.8), maxHp: Math.ceil(r * 1.8),
          rotVel: new THREE.Vector3((Math.random()-0.5)*0.014,(Math.random()-0.5)*0.018,(Math.random()-0.5)*0.012),
          orbitAngle: angle, orbitRadius: beltR, orbitSpeed: 0.000015 + Math.random() * 0.00001, orbitY: elev
        });
      }
    },

    // ── PLAYER SHIP ─────────────────────────────────────────────────────────
    _buildPlayerShip() {
      const group = new THREE.Group();
      const model = new THREE.Group();
      group.add(model);
      this.player.shipModel = model;

      const hullMat    = new THREE.MeshStandardMaterial({ color: 0x334466, metalness: 0.78, roughness: 0.30 });
      const armorMat   = new THREE.MeshStandardMaterial({ color: 0x1e3a5f, metalness: 0.82, roughness: 0.25 });
      const glassMat   = new THREE.MeshStandardMaterial({ color: 0x06b6d4, metalness: 0.90, roughness: 0.06, emissive: 0x0e7490, emissiveIntensity: 0.8 });
      const cyanMat    = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
      const greenMat   = new THREE.MeshBasicMaterial({ color: 0x00ff88 });
      const reactorMat = new THREE.MeshBasicMaterial({ color: 0x7c3aed, blending: THREE.AdditiveBlending });

      // ─ Main fuselage
      const bodyGeo = new THREE.CylinderGeometry(0.65, 1.6, 7.0, 8);
      bodyGeo.rotateX(Math.PI * 0.5);
      const body = new THREE.Mesh(bodyGeo, hullMat);
      body.scale.set(1.45, 0.62, 1.0); model.add(body);

      // Dorsal spine
      const spineGeo = new THREE.BoxGeometry(0.28, 0.55, 5.5);
      const spine = new THREE.Mesh(spineGeo, armorMat);
      spine.position.set(0, 0.42, 0.3); model.add(spine);

      // ─ Nose cone (sharpened)
      const noseGeo = new THREE.ConeGeometry(0.95, 3.8, 6);
      noseGeo.rotateX(-Math.PI * 0.5);
      const nose = new THREE.Mesh(noseGeo, armorMat);
      nose.position.set(0, 0, 5.0); nose.scale.set(1.3, 0.48, 1.0); model.add(nose);

      // ─ Cockpit canopy
      const canoGeo = new THREE.CylinderGeometry(0.32, 0.52, 2.8, 6);
      canoGeo.rotateX(Math.PI * 0.5);
      const cano = new THREE.Mesh(canoGeo, glassMat);
      cano.position.set(0, 0.48, 1.6); cano.scale.set(1.1, 0.68, 1.0); model.add(cano);

      // ─ Swept delta wings
      const ws = new THREE.Shape();
      ws.moveTo(0, 0); ws.lineTo(5.2, -2.0); ws.lineTo(4.9, -3.5); ws.lineTo(0.5, -2.6); ws.closePath();
      const extCfg = { depth: 0.16, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.05, bevelThickness: 0.05 };
      const wingGeo = new THREE.ExtrudeGeometry(ws, extCfg);
      wingGeo.rotateX(Math.PI * 0.5);
      const rw = new THREE.Mesh(wingGeo, armorMat); rw.position.set(0.5, 0.04, 1.0); model.add(rw);
      const lw = new THREE.Mesh(wingGeo, armorMat); lw.scale.set(-1,1,1); lw.position.set(-0.5, 0.04, 1.0); model.add(lw);

      // Winglet stabilizers
      const wletGeo = new THREE.BoxGeometry(0.1, 1.2, 1.5);
      const rwl = new THREE.Mesh(wletGeo, hullMat); rwl.position.set(5.5, 0.5, -1.6); rwl.rotation.z = -0.28; model.add(rwl);
      const lwl = new THREE.Mesh(wletGeo, hullMat); lwl.position.set(-5.5, 0.5, -1.6); lwl.rotation.z = 0.28; model.add(lwl);

      // ─ Twin dorsal fins
      const finGeo = new THREE.BoxGeometry(0.09, 1.5, 2.4);
      const rf = new THREE.Mesh(finGeo, armorMat); rf.position.set(0.7, 1.0, -1.9); rf.rotation.z = -0.28; model.add(rf);
      const lf = new THREE.Mesh(finGeo, armorMat); lf.position.set(-0.7, 1.0, -1.9); lf.rotation.z = 0.28; model.add(lf);

      // ─ Four engine nacelles
      const nacGeo = new THREE.CylinderGeometry(0.42, 0.52, 2.8, 12);
      nacGeo.rotateX(Math.PI * 0.5);
      [[-1.55, 0.25], [1.55, 0.25], [-0.65, -0.3], [0.65, -0.3]].forEach(([x, y]) => {
        const n = new THREE.Mesh(nacGeo, armorMat); n.position.set(x, y, -2.6); model.add(n);
      });

      // ─ Engine flame cones (4)
      const flameGeo = new THREE.ConeGeometry(0.38, 3.5, 12);
      flameGeo.rotateX(-Math.PI * 0.5);
      const flames = [];
      [[-1.55, 0.25], [1.55, 0.25], [-0.65, -0.3], [0.65, -0.3]].forEach(([x, y]) => {
        const fm = new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.88, blending: THREE.AdditiveBlending });
        const fl = new THREE.Mesh(flameGeo.clone(), fm);
        fl.position.set(x, y, -5.5); model.add(fl); flames.push(fl);
      });
      this.player.flames = flames;

      // Thruster point light
      const tLight = new THREE.PointLight(0x00e5ff, 3.0, 30);
      tLight.position.set(0, 0, -4.5); model.add(tLight);
      this.player.thrusterLight = tLight;

      // ─ Reactor core (center belly — pulsing purple orb)
      const rcGeo = new THREE.SphereGeometry(0.45, 16, 16);
      const rcMesh = new THREE.Mesh(rcGeo, reactorMat);
      rcMesh.position.set(0, -0.5, -0.5); model.add(rcMesh);
      this.player.reactorCore = rcMesh;
      const rcLight = new THREE.PointLight(0x7c3aed, 1.5, 12);
      rcLight.position.set(0, -0.5, -0.5); model.add(rcLight);

      // ─ Wingtip cannons (4)
      const canGeo = new THREE.CylinderGeometry(0.1, 0.14, 3.0, 8);
      canGeo.rotateX(Math.PI * 0.5);
      [5.1, -5.1, 3.4, -3.4].forEach(x => {
        const can = new THREE.Mesh(canGeo, hullMat); can.position.set(x, -0.18, -0.4); model.add(can);
        // Muzzle tip glow
        const tip = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), cyanMat);
        tip.position.set(x, -0.18, 1.1); model.add(tip);
      });

      // ─ Cyan accent stripes
      const trimGeo = new THREE.BoxGeometry(0.07, 0.07, 4.2);
      [1.6, -1.6].forEach(x => {
        const t = new THREE.Mesh(trimGeo, cyanMat); t.position.set(x, 0.22, -0.3); model.add(t);
      });
      // Green sensor strip on nose
      const sensGeo = new THREE.BoxGeometry(0.5, 0.06, 0.4);
      const sens = new THREE.Mesh(sensGeo, greenMat); sens.position.set(0, -0.36, 4.9); model.add(sens);

      // ─ Shield bubble (stays on main group)
      const shGeo = new THREE.SphereGeometry(6.8, 24, 24);
      const shMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
      const shMesh = new THREE.Mesh(shGeo, shMat); group.add(shMesh);
      this.player.shieldMesh = shMesh;

      this.scene.add(group);
      this.player.group = group;
      group.position.set(0, 0, 0);
    },

    // ── EVENTS ───────────────────────────────────────────────────────────────
    _bindEvents() {
      window.addEventListener('keydown', e => {
        this.keys[e.key.toLowerCase()] = true;
        this.keys[e.code] = true;
        if (e.key === ' ' || e.code === 'Space') { e.preventDefault(); this.triggerEMP(); }
        if (e.key === 'e' || e.key === 'E') this.triggerScan();
        if (e.key === 'c' || e.key === 'C') this.toggleCam();
        if (e.key === 'Tab') { e.preventDefault(); this.triggerWarp(); }
        if (e.key === '1') this.setWeapon('pulse');
        if (e.key === '2') this.setWeapon('scatter');
        if (e.key === '3') this.setWeapon('railgun');
        if (e.key === '4') this.setWeapon('singularity');
        if (e.key === '5') this.setWeapon('missile');
        if (e.key === '6') this.setWeapon('torpedo');
        if (e.key === 'p' || e.key === 'P') this.togglePause();
        if (e.key === 'u' || e.key === 'U') this.toggleUpgradeShop();
        if (e.key === 'l' || e.key === 'L') this.toggleLeaderboard();
      });

      window.addEventListener('keyup', e => {
        this.keys[e.key.toLowerCase()] = false;
        this.keys[e.code] = false;
      });

      this.canvas.addEventListener('mousemove', e => {
        if (!this.running || this.paused) return;
        const dx = e.movementX || 0, dy = e.movementY || 0;
        this.mouse.lastX = e.clientX; this.mouse.lastY = e.clientY;
        if (Math.abs(dx) > 0.4) this.player.turnVelocity.yaw  -= dx * 0.0015;
        if (Math.abs(dy) > 0.4) this.player.turnVelocity.pitch += dy * 0.0013;
      });

      this.canvas.addEventListener('mousedown', e => {
        if (e.button === 0) {
          AudioEngine.init(); this.mouse.down = true;
          this.mouse.lastX = e.clientX; this.mouse.lastY = e.clientY;
          this.firePlayerWeapon();
        }
      });
      window.addEventListener('mouseup', e => { if (e.button === 0) this.mouse.down = false; });

      this.canvas.addEventListener('touchstart', e => {
        AudioEngine.init();
        if (e.touches.length > 0) { this.mouse.lastX = e.touches[0].clientX; this.mouse.lastY = e.touches[0].clientY; this.mouse.down = true; this.firePlayerWeapon(); }
      }, { passive: true });
      this.canvas.addEventListener('touchmove', e => {
        if (e.touches.length > 0) {
          const dx = e.touches[0].clientX - this.mouse.lastX, dy = e.touches[0].clientY - this.mouse.lastY;
          this.mouse.lastX = e.touches[0].clientX; this.mouse.lastY = e.touches[0].clientY;
          this.player.turnVelocity.yaw -= dx * 0.002;
          this.player.turnVelocity.pitch += dy * 0.0018;
        }
      }, { passive: true });
      this.canvas.addEventListener('touchend', () => { this.mouse.down = false; }, { passive: true });
    },

    // ── FIRE WEAPON ──────────────────────────────────────────────────────────
    firePlayerWeapon() {
      if (!this.running || this.paused || !this.player.group) return;
      if (this.player.warpActive) return;
      if (this.player.energy < 4) return;
      if (this.player.heat >= this.player.maxHeat) { this._showToast('⚠️ WEAPONS OVERHEATED! / SURCHAUFFE!'); return; }

      const pg = this.player.group;
      const fwd   = new THREE.Vector3(0, 0, 1).applyQuaternion(pg.quaternion).normalize();
      const right = new THREE.Vector3(1, 0, 0).applyQuaternion(pg.quaternion).normalize();

      AudioEngine.playLaser(this.player.weapon);
      const heatCost = { pulse: 5, scatter: 12, railgun: 18, singularity: 28, missile: 15, torpedo: 35 };
      this.player.heat = Math.min(this.player.maxHeat, this.player.heat + (heatCost[this.player.weapon] || 8));

      switch (this.player.weapon) {
        case 'scatter':
          this.player.energy = Math.max(0, this.player.energy - 9);
          [-0.14, -0.07, 0, 0.07, 0.14].forEach(sp => {
            const dir = fwd.clone().add(right.clone().multiplyScalar(sp)).normalize();
            this._spawnPlayerLaser(pg.position.clone(), dir, 0x10b981, 16, 22);
          });
          break;
        case 'railgun':
          this.player.energy = Math.max(0, this.player.energy - 16);
          this._spawnPlayerLaser(pg.position.clone(), fwd, 0xc084fc, 26, 90, true);
          break;
        case 'singularity':
          this.player.energy = Math.max(0, this.player.energy - 26);
          this._spawnSingularity(pg.position.clone().add(fwd.clone().multiplyScalar(7)), fwd);
          break;
        case 'missile':
          this.player.energy = Math.max(0, this.player.energy - 14);
          this._spawnMissile(pg.position.clone().add(fwd.clone().multiplyScalar(6)));
          break;
        case 'torpedo':
          this.player.energy = Math.max(0, this.player.energy - 32);
          this._spawnTorpedo(pg.position.clone().add(fwd.clone().multiplyScalar(5)), fwd);
          break;
        default: // pulse
          this.player.energy = Math.max(0, this.player.energy - 5);
          const lp = pg.position.clone().add(right.clone().multiplyScalar(-5.1)).add(fwd.clone().multiplyScalar(1.5));
          const rp = pg.position.clone().add(right.clone().multiplyScalar(5.1)).add(fwd.clone().multiplyScalar(1.5));
          this._spawnPlayerLaser(lp, fwd, 0x00f0ff, 18, 32);
          this._spawnPlayerLaser(rp, fwd, 0x00f0ff, 18, 32);
      }
      this.updateHUD();
    },

    _spawnPlayerLaser(pos, dir, color, speed, dmg, isBeam) {
      const geo = new THREE.CylinderGeometry(isBeam ? 0.3 : 0.15, isBeam ? 0.3 : 0.15, isBeam ? 20 : 7, 8);
      geo.rotateX(Math.PI * 0.5);
      const mat = new THREE.MeshBasicMaterial({ color, blending: THREE.AdditiveBlending });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(pos);
      mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir);
      this.scene.add(mesh);
      this.playerLasers.push({ mesh, dir, speed, damage: dmg, life: 80, isBeam: !!isBeam });
    },

    _spawnSingularity(pos, dir) {
      const group = new THREE.Group(); group.position.copy(pos);
      const core = new THREE.Mesh(new THREE.SphereGeometry(1.8, 16, 16), new THREE.MeshBasicMaterial({ color: 0x0f0b24 }));
      group.add(core);
      const ring = new THREE.Mesh(new THREE.RingGeometry(2.2, 4.0, 24),
        new THREE.MeshBasicMaterial({ color: 0x818cf8, side: THREE.DoubleSide, transparent: true, opacity: 0.82, blending: THREE.AdditiveBlending }));
      group.add(ring);
      this.scene.add(group);
      this.playerLasers.push({ mesh: group, ringMesh: ring, dir, speed: 5.5, damage: 160, life: 100, isSingularity: true });
    },

    _spawnMissile(pos) {
      // Find nearest enemy
      let target = null, minD = Infinity;
      this.enemies.forEach(en => {
        const d = en.group.position.distanceTo(pos);
        if (d < minD) { minD = d; target = en; }
      });

      const group = new THREE.Group(); group.position.copy(pos);
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 2.5, 8),
        new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.9, roughness: 0.2 }));
      body.rotateX(Math.PI * 0.5); group.add(body);
      const tip = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.8, 8),
        new THREE.MeshBasicMaterial({ color: 0xf43f5e }));
      tip.rotation.x = -Math.PI * 0.5; tip.position.z = 1.65; group.add(tip);
      const engLight = new THREE.PointLight(0xff8800, 2.0, 12);
      engLight.position.z = -1.5; group.add(engLight);

      const dir = this.player.group ? new THREE.Vector3(0, 0, 1).applyQuaternion(this.player.group.quaternion).normalize() : new THREE.Vector3(0, 0, 1);
      group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir);
      this.scene.add(group);

      this.playerLasers.push({ mesh: group, dir: dir.clone(), speed: 14, damage: 95, life: 140, isMissile: true, target, engLight });
    },

    _spawnTorpedo(pos, dir) {
      const group = new THREE.Group(); group.position.copy(pos);
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 3.5, 12),
        new THREE.MeshStandardMaterial({ color: 0x4ade80, metalness: 0.85, roughness: 0.15, emissive: 0x052e16, emissiveIntensity: 0.5 }));
      body.rotateX(Math.PI * 0.5); group.add(body);
      const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.1, 8, 24),
        new THREE.MeshBasicMaterial({ color: 0x4ade80, blending: THREE.AdditiveBlending }));
      group.add(ring1);
      group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir);
      this.scene.add(group);
      this.playerLasers.push({ mesh: group, ringMesh: ring1, dir, speed: 7, damage: 280, life: 200, isTorpedo: true });
    },

    // ── SPAWN ALIEN SHIP (4 UNIQUE ILLUMINATED TYPES) ────────────────────────
    _spawnAlienShip(type, formation) {
      const group = new THREE.Group();
      let hp, scoreVal, speed, radius, alienType, name;
      let wingL = null, wingR = null, shards = [], accretion = null, shieldMesh = null;

      if (type === 'boss') {
        alienType = 'mothership'; name = 'VOID SOVEREIGN (BOSS)'; hp = 950; scoreVal = 4000; speed = 1.6; radius = 45;

        // Central Singularity Core (Black hole with accretion disk)
        const coreGeo = new THREE.SphereGeometry(7, 24, 24);
        const coreMat = new THREE.MeshBasicMaterial({ color: 0x05010a });
        const core = new THREE.Mesh(coreGeo, coreMat); group.add(core);

        // Glowing spinning accretion disk
        const accGeo = new THREE.TorusGeometry(14, 2.2, 16, 40);
        const accMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending });
        accretion = new THREE.Mesh(accGeo, accMat); group.add(accretion);

        // Core Red Eye
        const eye = new THREE.Mesh(new THREE.SphereGeometry(3.5, 16, 16), new THREE.MeshBasicMaterial({ color: 0xff0055, blending: THREE.AdditiveBlending }));
        eye.position.z = 7; group.add(eye);
        const eyeLight = new THREE.PointLight(0xff0055, 6.0, 120);
        eyeLight.position.z = 7; group.add(eyeLight);

        // 8 Bio-Mechanical Dread Tentacles
        for (let i = 0; i < 8; i++) {
          const ang = (i / 8) * Math.PI * 2;
          const armGeo = new THREE.CylinderGeometry(0.8, 2.2, 28, 8);
          armGeo.rotateZ(Math.PI * 0.5);
          const arm = new THREE.Mesh(armGeo, new THREE.MeshStandardMaterial({ color: 0x1e1035, metalness: 0.95, roughness: 0.15 }));
          arm.position.set(Math.cos(ang) * 20, Math.sin(ang) * 20, -2);
          arm.rotation.z = ang;
          group.add(arm);

          // Glowing energy conduit node
          const node = new THREE.Mesh(new THREE.SphereGeometry(1.5, 8, 8), new THREE.MeshBasicMaterial({ color: 0x38bdf8, blending: THREE.AdditiveBlending }));
          node.position.set(Math.cos(ang) * 32, Math.sin(ang) * 32, -2);
          group.add(node);
        }

        // Tractor beam cone
        const tractor = new THREE.Mesh(new THREE.ConeGeometry(12, 35, 16),
          new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending }));
        tractor.rotation.x = -Math.PI * 0.5; tractor.position.z = -30; group.add(tractor);

      } else if (type === 'cruiser' || type === 'dreadnought') {
        alienType = 'dreadnought'; name = 'CYBER-GOLIATH'; hp = 220; scoreVal = 600; speed = 2.4; radius = 18;

        // Heavy dark titanium dreadnought chassis (32 units long, multi-deck)
        const bodyGeo = new THREE.BoxGeometry(14.0, 4.5, 26.0);
        const bodyMat = new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.92, roughness: 0.2 });
        const body = new THREE.Mesh(bodyGeo, bodyMat); group.add(body);

        // Crimson armor spine
        const spineGeo = new THREE.BoxGeometry(4.0, 2.2, 20.0);
        const spineMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, metalness: 0.85, roughness: 0.3 });
        const spine = new THREE.Mesh(spineGeo, spineMat); spine.position.y = 2.4; group.add(spine);

        // Magma core
        const core = new THREE.Mesh(new THREE.SphereGeometry(2.2, 16, 16), new THREE.MeshBasicMaterial({ color: 0xef4444, blending: THREE.AdditiveBlending }));
        core.position.set(0, 1.2, 2); group.add(core);

        // Dual heavy rail cannons
        const turGeo = new THREE.CylinderGeometry(0.6, 0.7, 12.0, 8);
        turGeo.rotateX(Math.PI * 0.5);
        [-6.5, 6.5].forEach(x => {
          const t = new THREE.Mesh(turGeo, bodyMat); t.position.set(x, 0, 6.0); group.add(t);
          const muzzle = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 8), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
          muzzle.position.set(x, 0, 12.0); group.add(muzzle);
        });

        // Twin magma engine nozzles
        [-4.5, 4.5].forEach(x => {
          const eng = new THREE.Mesh(new THREE.ConeGeometry(1.2, 4.0, 8), new THREE.MeshBasicMaterial({ color: 0xff3b00, blending: THREE.AdditiveBlending }));
          eng.rotation.x = Math.PI * 0.5; eng.position.set(x, 0, -14.0); group.add(eng);
        });

        // Glowing red deflector shield
        const shGeo = new THREE.SphereGeometry(18, 16, 16);
        const shMat = new THREE.MeshBasicMaterial({ color: 0xef4444, wireframe: true, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending });
        shieldMesh = new THREE.Mesh(shGeo, shMat); group.add(shieldMesh);

        const clight = new THREE.PointLight(0xef4444, 4.0, 50);
        clight.position.set(0, 2.0, 0); group.add(clight);

      } else if (type === 'chrono_shard') {
        alienType = 'chrono_shard'; name = 'CHRONO-SHARD'; hp = 110; scoreVal = 380; speed = 3.8; radius = 12;

        // Central glowing faceted amethyst crystal core
        const coreGeo = new THREE.OctahedronGeometry(4.5, 0);
        const coreMat = new THREE.MeshStandardMaterial({ color: 0xd946ef, metalness: 0.2, roughness: 0.1, emissive: 0x701a75, emissiveIntensity: 0.8 });
        const core = new THREE.Mesh(coreGeo, coreMat); group.add(core);

        // 4 floating orbiting diamond shards
        const shardGeo = new THREE.OctahedronGeometry(1.8, 0);
        const shardMat = new THREE.MeshBasicMaterial({ color: 0xf472b6, wireframe: false });
        for (let i = 0; i < 4; i++) {
          const sh = new THREE.Mesh(shardGeo, shardMat);
          const a = (i / 4) * Math.PI * 2;
          sh.position.set(Math.cos(a) * 8.5, Math.sin(a * 2) * 2.5, Math.sin(a) * 8.5);
          group.add(sh);
          shards.push(sh);
        }

        // Concentric glowing halo ring
        const ringGeo = new THREE.TorusGeometry(8.5, 0.25, 8, 32);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0xa855f7, blending: THREE.AdditiveBlending });
        const ring = new THREE.Mesh(ringGeo, ringMat); group.add(ring);

        const plight = new THREE.PointLight(0xd946ef, 4.5, 42);
        group.add(plight);

      } else {
        // Bio-organic Swarmer ('bio_swarmer' / 'predator')
        alienType = 'bio_swarmer'; name = 'XENO-SWARMER'; hp = 65; scoreVal = 220; speed = 5.2; radius = 8.5;

        // Needle carapace
        const hullGeo = new THREE.ConeGeometry(2.0, 10.0, 6);
        hullGeo.rotateX(-Math.PI * 0.5);
        const hullMat = new THREE.MeshStandardMaterial({ color: 0x111827, metalness: 0.88, roughness: 0.25 });
        const hull = new THREE.Mesh(hullGeo, hullMat); hull.scale.set(1.1, 0.45, 1.0); group.add(hull);

        // Glowing toxic bioluminescent abdomen sac
        const sacGeo = new THREE.SphereGeometry(2.2, 12, 12);
        const sacMat = new THREE.MeshBasicMaterial({ color: 0x10b981, blending: THREE.AdditiveBlending });
        const sac = new THREE.Mesh(sacGeo, sacMat); sac.position.set(0, 0.3, -4.5); group.add(sac);

        // 2 Animated scythe wings (flapping)
        const wGeo = new THREE.BoxGeometry(6.5, 0.12, 2.5);
        const wMat = new THREE.MeshStandardMaterial({ color: 0x064e3b, metalness: 0.8, roughness: 0.3 });
        wingL = new THREE.Mesh(wGeo, wMat); wingL.position.set(-3.5, 0.2, 0); group.add(wingL);
        wingR = new THREE.Mesh(wGeo, wMat); wingR.position.set(3.5, 0.2, 0); group.add(wingR);

        // Glowing venom eye cluster
        const eye = new THREE.Mesh(new THREE.SphereGeometry(0.8, 8, 8), new THREE.MeshBasicMaterial({ color: 0x4ade80 }));
        eye.position.set(0, 0.3, 4.2); group.add(eye);

        const elight = new THREE.PointLight(0x10b981, 3.5, 32);
        elight.position.set(0, 0.5, 1.0); group.add(elight);
      }

      // Safe, visible spawn in front/near player (280 to 520 units)
      const pPos = this.player.group.position;
      const fwd = new THREE.Vector3(0, 0, 1).applyQuaternion(this.player.group.quaternion).normalize();
      const right = new THREE.Vector3(1, 0, 0).applyQuaternion(this.player.group.quaternion).normalize();

      const fwdDist = (alienType === 'mothership') ? 500 : (280 + Math.random() * 220);
      const sideDist = (Math.random() - 0.5) * (alienType === 'mothership' ? 140 : 380);
      const elev = (Math.random() - 0.5) * 120;

      const spawnPos = pPos.clone()
        .addScaledVector(fwd, fwdDist)
        .addScaledVector(right, sideDist)
        .add(new THREE.Vector3(0, elev, 0));

      group.position.copy(spawnPos);
      group.lookAt(pPos);

      // Warp flash on arrival
      this.createExplosion(spawnPos, false, alienType === 'bio_swarmer' ? 0x10b981 : (alienType === 'chrono_shard' ? 0xd946ef : 0xef4444));

      this.scene.add(group);
      this.enemies.push({
        group, type: alienType, name, hp, maxHp: hp, scoreVal,
        fireCooldown: 50 + Math.random() * 60,
        speed, radius,
        wingL, wingR, shards, accretion, shieldMesh,
        tractorActive: false
      });
    },

    // ── MAGNETIC LOOT DROPS ──────────────────────────────────────────────────
    _spawnLoot(pos) {
      const types = [
        { type: 'repair', label: '💚 Nano-Repair', color: 0x4ade80, glow: 0x22c55e },
        { type: 'credits', label: '💳 Scrap Cache', color: 0xfbbf24, glow: 0xf59e0b },
        { type: 'overdrive', label: '⚡ Hyper Overdrive', color: 0xc084fc, glow: 0xa855f7 },
        { type: 'fuel', label: '🌀 Warp Fuel', color: 0x38bdf8, glow: 0x0284c7 }
      ];
      const cfg = types[Math.floor(Math.random() * types.length)];

      const group = new THREE.Group(); group.position.copy(pos);
      const geo = new THREE.OctahedronGeometry(2.4, 0);
      const mat = new THREE.MeshBasicMaterial({ color: cfg.color });
      group.add(new THREE.Mesh(geo, mat));

      const auraGeo = new THREE.SphereGeometry(3.5, 8, 8);
      const auraMat = new THREE.MeshBasicMaterial({ color: cfg.glow, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending });
      group.add(new THREE.Mesh(auraGeo, auraMat));

      const light = new THREE.PointLight(cfg.color, 2.5, 28);
      group.add(light);

      this.scene.add(group);
      this.lootDrops.push({
        mesh: group, type: cfg.type, label: cfg.label,
        life: 1400, rotSpeed: 0.04 + Math.random() * 0.03
      });
    },

    _updateLoot() {
      if (!this.player.group) return;
      const pPos = this.player.group.position;

      for (let i = this.lootDrops.length - 1; i >= 0; i--) {
        const loot = this.lootDrops[i];
        loot.life--;
        loot.mesh.rotation.y += loot.rotSpeed;
        loot.mesh.rotation.x += loot.rotSpeed * 0.7;

        const toPlayer = pPos.clone().sub(loot.mesh.position);
        const dist = toPlayer.length();

        // Magnetic tractor pull within 130 units!
        if (dist < 130) {
          const pull = toPlayer.normalize().multiplyScalar(Math.min(12, 180 / Math.max(10, dist)));
          loot.mesh.position.add(pull);
        }

        // Collected!
        if (dist < 14) {
          AudioEngine.playLootPickup();
          this.createExplosion(loot.mesh.position, false, 0x38bdf8);

          if (loot.type === 'repair') {
            this.player.shield = Math.min(this.player.maxShield, this.player.shield + 70);
            this.player.hull = Math.min(this.player.maxHull, this.player.hull + 45);
            this._showToast('💚 SHIELDS & HULL RESTORED! / BOUCLIERS & COQUE RÉPARÉS!');
          } else if (loot.type === 'credits') {
            const gain = 80 + Math.floor(Math.random() * 140);
            this.player.credits += gain;
            this.player.score += gain * 2;
            this._showToast(`💳 +${gain} CREDITS SALVAGED! / CRÉDITS RÉCUPÉRÉS!`);
          } else if (loot.type === 'overdrive') {
            this.player.overdriveTimer = 360;
            this.player.heat = 0;
            this._showToast('⚡ HYPER OVERDRIVE ACTIVE! ZERO HEAT & RAPID FIRE!');
          } else if (loot.type === 'fuel') {
            this.player.energy = Math.min(this.player.maxEnergy, this.player.energy + 70);
            this._showToast('🌀 WARP FUEL CHARGED! / SAUT SPATIAL CHARGÉ!');
          }

          this.updateHUD();
          this.scene.remove(loot.mesh);
          this.lootDrops.splice(i, 1);
          continue;
        }

        if (loot.life <= 0) {
          this.scene.remove(loot.mesh);
          this.lootDrops.splice(i, 1);
        }
      }
    },


    // ── COMET ────────────────────────────────────────────────────────────────
    _spawnComet() {
      const geo = new THREE.SphereGeometry(22, 12, 12);
      const mat = new THREE.MeshStandardMaterial({ color: 0xbfdbfe, metalness: 0.3, roughness: 0.7 });
      const mesh = new THREE.Mesh(geo, mat);

      // Spawn far away, aim through play area
      const startAngle = Math.random() * Math.PI * 2;
      const startDist = 8000;
      mesh.position.set(Math.cos(startAngle) * startDist, (Math.random()-0.5)*2000, Math.sin(startAngle) * startDist);

      // Direction toward origin with some spread
      const dir = new THREE.Vector3(-Math.cos(startAngle), (Math.random()-0.5)*0.1, -Math.sin(startAngle)).normalize();

      // Tail (particle trail)
      const tailGeo = new THREE.CylinderGeometry(6, 0, 180, 8);
      tailGeo.rotateX(Math.PI * 0.5);
      const tailMat = new THREE.MeshBasicMaterial({ color: 0xa5f3fc, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending });
      const tail = new THREE.Mesh(tailGeo, tailMat);
      tail.position.z = -90;
      mesh.add(tail);
      mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir);
      this.scene.add(mesh);

      this.comets.push({ mesh, dir, speed: 28 + Math.random() * 12, life: 400 });
    },

    // ── WARP DRIVE ───────────────────────────────────────────────────────────
    triggerWarp() {
      if (!this.player.group || this.player.warpActive) return;
      if (this.player.energy < 80) { this._showToast('⚡ Not enough energy for Warp! / Énergie insuffisante!'); return; }

      // Find nearest planet
      let nearest = null, minD = Infinity;
      const pPos = this.player.group.position;
      this.planets.forEach(p => {
        const d = p.group.position.distanceTo(pPos);
        if (d < minD) { minD = d; nearest = p; }
      });
      if (!nearest) return;

      this.player.energy -= 80;
      this.player.warpActive = true;
      this.player.warpTimer = 90; // frames
      this.player.warpTarget = nearest.group.position.clone().add(new THREE.Vector3(0, 0, nearest.radius * 3.5));
      AudioEngine.playWarp();
      this._showToast(`🌀 Warp to ${nearest.name}! / Saut vers ${nearest.name}!`);

      // Spawn warp streak particles
      for (let i = 0; i < 80; i++) {
        const geo = new THREE.CylinderGeometry(0.15, 0.15, 35 + Math.random() * 80, 4);
        geo.rotateX(Math.PI * 0.5);
        const mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending });
        const mesh = new THREE.Mesh(geo, mat);
        const spread = 18;
        mesh.position.set((Math.random()-0.5)*spread, (Math.random()-0.5)*spread, 0);
        this.camera.add(mesh);
        this.player.warpParticles.push({ mesh, life: 90, speed: 6 + Math.random() * 4 });
      }
      if (!this.scene.children.includes(this.camera)) this.scene.add(this.camera);

      this._updateWarpBtn(true);
    },

    _updateWarpBtn(active) {
      const btn = document.getElementById('cosmic-warp-btn');
      if (!btn) return;
      if (active) { btn.style.opacity = '0.5'; btn.textContent = '🌀 Warping... / Saut...'; }
      else { btn.style.opacity = '1'; btn.textContent = '🌀 [Tab] Warp'; }
    },

    // ── EMP ──────────────────────────────────────────────────────────────────
    triggerEMP() {
      if (!this.player.empReady || !this.player.group) return;
      this.player.empReady = false;
      this.player.empCooldown = 280;
      AudioEngine.playEMP();

      const empGeo = new THREE.SphereGeometry(10, 24, 24);
      const empMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.88, blending: THREE.AdditiveBlending });
      const empSphere = new THREE.Mesh(empGeo, empMat);
      empSphere.position.copy(this.player.group.position);
      this.scene.add(empSphere);
      this.shockwaves.push({ mesh: empSphere, isEMP: true, scale: 1, maxScale: 80, opacity: 0.88 });

      this.alienLasers.forEach(al => this.scene.remove(al.mesh));
      this.alienLasers = [];

      const pPos = this.player.group.position;
      this.enemies.forEach(en => {
        if (en.group.position.distanceTo(pPos) < 600) {
          en.hp -= 100; this.createExplosion(en.group.position, false, 0x38bdf8);
        }
      });

      const btn = document.getElementById('cosmic-emp-btn');
      if (btn) { btn.style.opacity = '0.4'; btn.textContent = '⚡ EMP Charging / Rechargement...'; }
    },

    // ── PLANET SCAN ──────────────────────────────────────────────────────────
    triggerScan() {
      if (!this.player.group) return;
      const pPos = this.player.group.position;
      let nearest = null, minD = Infinity;
      this.planets.forEach(p => { const d = p.group.position.distanceTo(pPos); if (d < minD) { minD = d; nearest = p; } });
      if (!nearest) return;
      if (minD > 3000) { this._showToast('Planet out of range (>3000 ls). Approach closer! / Trop loin!'); return; }
      AudioEngine.playScan();
      nearest.scanned = true;
      if (!this.discoveredPlanets.includes(nearest.name)) {
        this.discoveredPlanets.push(nearest.name);
        this.player.score += 600; this.player.credits += 200;
        this.updateHUD();
      }
      this._displayPlanetaryTelemetry(nearest, minD);
    },

    _displayPlanetaryTelemetry(planet, dist) {
      const modal = document.getElementById('cosmic-codex-modal');
      const list = document.getElementById('cosmic-codex-list');
      if (!modal || !list) return;
      list.innerHTML = `
        <div style="background:rgba(56,189,248,0.08);border:1px solid rgba(56,189,248,0.3);border-radius:12px;padding:16px;margin-bottom:12px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
            <div><span style="font-size:1.5rem">🪐</span><strong style="color:#fff;font-size:1.1rem;margin-left:8px">${planet.name}</strong></div>
            <span style="background:rgba(16,185,129,0.2);color:#34d399;font-size:0.75rem;padding:3px 9px;border-radius:12px;font-weight:700">SCANNED ✓</span>
          </div>
          <div style="color:#94a3b8;font-size:0.82rem;line-height:1.6">
            <strong>Class / Classe:</strong> ${planet.type}<br>
            <strong>Atmosphere / Atmosphère:</strong> ${planet.data.atm}<br>
            <strong>Temperature / Température:</strong> ${planet.data.temp}<br>
            <strong>Biosphere / Biosphère:</strong> ${planet.data.bio}<br>
            <strong>Minerals / Minéraux:</strong> ${planet.data.min}
          </div>
          <div style="color:#38bdf8;font-size:0.78rem;font-weight:700;margin-top:8px">
            Distance: ${Math.round(dist)} ls · Research Points / Points: +600 · Credits: +200
          </div>
        </div>`;
      modal.style.display = 'flex';
    },

    // ── CAMERA ───────────────────────────────────────────────────────────────
    toggleCam() {
      this.cameraMode = this.cameraMode === 'chase' ? 'cockpit' : 'chase';
      if (this.player.group) this.player.group.visible = (this.cameraMode === 'chase');
      const btn = document.getElementById('cosmic-cam-btn');
      if (btn) btn.textContent = this.cameraMode === 'chase' ? '🎥 [C] Chase Cam' : '🪟 [C] Cockpit';
    },

    setWeapon(type) {
      this.player.weapon = type;
      document.querySelectorAll('.cosmic-wep-btn').forEach(b => b.classList.toggle('active', b.dataset.wep === type));
    },

    togglePause() {
      this.paused = !this.paused;
      const o = document.getElementById('cosmic-pause-overlay');
      if (o) o.style.display = this.paused ? 'flex' : 'none';
    },

    toggleCodex() {
      const c = document.getElementById('cosmic-codex-modal');
      if (!c) return;
      const open = c.style.display === 'flex';
      c.style.display = open ? 'none' : 'flex';
      if (!open) {
        const list = document.getElementById('cosmic-codex-list');
        if (list) {
          if (!this.discoveredPlanets.length) {
            list.innerHTML = '<div style="padding:28px;text-align:center;color:#64748b">No planets scanned yet.<br>Aucune planète scannée.<br><br>Fly near a planet and press [E] / Approchez et appuyez [E]</div>';
          } else {
            list.innerHTML = this.planets.filter(p => p.scanned).map(p => `
              <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(56,189,248,0.25);border-radius:10px;padding:12px;margin-bottom:8px">
                <div style="color:#38bdf8;font-weight:700;font-size:0.95rem;margin-bottom:4px">🪐 ${p.name}</div>
                <div style="color:#94a3b8;font-size:0.8rem">${p.type} · Temp: ${p.data.temp}</div>
              </div>`).join('');
          }
        }
      }
    },

    toggleUpgradeShop() {
      const s = document.getElementById('cosmic-upgrade-shop');
      if (!s) return;
      const open = s.style.display === 'flex';
      s.style.display = open ? 'none' : 'flex';
      if (!open) this._refreshUpgradeShop();
    },

    _refreshUpgradeShop() {
      const list = document.getElementById('cosmic-upgrade-list');
      if (!list) return;
      const upgrades = [
        { key: 'hullMax',    name: 'Hull Armor / Blindage',        desc: '+50 max hull per level',    cost: 300, max: 4 },
        { key: 'shieldMax',  name: 'Shield Matrix / Boucliers',    desc: '+60 max shield per level',   cost: 250, max: 4 },
        { key: 'energyMax',  name: 'Energy Core / Énergie',        desc: '+40 max energy per level',   cost: 200, max: 4 },
        { key: 'fireRate',   name: 'Weapon Cooling / Armes',       desc: '-20% heat per level',        cost: 350, max: 3 },
        { key: 'engineBoost',name: 'Engine Boost / Moteurs',       desc: '+2 max speed per level',     cost: 400, max: 3 }
      ];
      list.innerHTML = upgrades.map(u => {
        const lvl = this.player.upgrades[u.key] || 0;
        const canBuy = lvl < u.max && this.player.credits >= u.cost;
        return `<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(99,102,241,0.3);border-radius:10px;padding:12px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center">
          <div>
            <div style="color:#c4b5fd;font-weight:700;font-size:0.9rem">${u.name}</div>
            <div style="color:#64748b;font-size:0.78rem">${u.desc} · Level ${lvl}/${u.max}</div>
          </div>
          <button onclick="CosmicOdyssey.upgrade('${u.key}')" style="background:${canBuy ? 'linear-gradient(135deg,#7c3aed,#4f46e5)' : 'rgba(255,255,255,0.05)'};color:${canBuy ? '#fff' : '#475569'};border:none;padding:6px 14px;border-radius:8px;font-weight:700;cursor:${canBuy ? 'pointer' : 'default'};font-size:0.78rem">
            ${lvl >= u.max ? 'MAX' : `⬆️ ${u.cost}💳`}
          </button>
        </div>`;
      }).join('') + `<div style="color:#64748b;font-size:0.8rem;margin-top:10px;text-align:center">Credits / Crédits: <strong style="color:#fbbf24">${this.player.credits}</strong></div>`;
    },

    upgrade(key) {
      const costs = { hullMax: 300, shieldMax: 250, energyMax: 200, fireRate: 350, engineBoost: 400 };
      const maxLvl = { hullMax: 4, shieldMax: 4, energyMax: 4, fireRate: 3, engineBoost: 3 };
      const lvl = this.player.upgrades[key] || 0;
      const cost = costs[key];
      if (lvl >= maxLvl[key]) return;
      if (this.player.credits < cost) { this._showToast('Not enough credits! / Crédits insuffisants!'); return; }
      this.player.credits -= cost;
      this.player.upgrades[key] = lvl + 1;
      // Apply effect
      if (key === 'hullMax')    { this.player.maxHull   += 50; this.player.hull   += 50; }
      if (key === 'shieldMax')  { this.player.maxShield += 60; this.player.shield += 60; }
      if (key === 'energyMax')  { this.player.maxEnergy += 40; this.player.energy += 40; }
      if (key === 'engineBoost') this.player.boostSpeed += 2;
      this.updateHUD();
      this._refreshUpgradeShop();
      this._showToast(`✅ Upgrade applied! / Amélioration appliquée!`);
    },

    toggleLeaderboard() {
      const lb = document.getElementById('cosmic-leaderboard');
      if (!lb) return;
      const open = lb.style.display === 'flex';
      lb.style.display = open ? 'none' : 'flex';
      if (!open) this._refreshLeaderboard();
    },

    _refreshLeaderboard() {
      const list = document.getElementById('cosmic-lb-list');
      if (!list) return;
      list.innerHTML = this.leaderboard.length === 0
        ? '<div style="color:#64748b;text-align:center;padding:20px">No scores yet! / Aucun score encore!</div>'
        : this.leaderboard.map((e, i) => `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:rgba(255,255,255,0.04);border-radius:8px;margin-bottom:6px">
              <span style="color:${i===0?'#fbbf24':i===1?'#94a3b8':i===2?'#cd7c3a':'#64748b'};font-weight:700">#${i+1} ${i===0?'🥇':i===1?'🥈':i===2?'🥉':''}</span>
              <span style="color:#fff;font-weight:600">${e.score.toLocaleString()}</span>
              <span style="color:#64748b;font-size:0.78rem">Wave ${e.wave} · ${e.planets}🪐</span>
            </div>`).join('');
    },

    _loadLeaderboard() {
      try { this.leaderboard = JSON.parse(localStorage.getItem('cosmic_leaderboard_v3') || '[]'); } catch(e) { this.leaderboard = []; }
    },

    _saveScore() {
      this.leaderboard.push({ score: this.player.score, wave: this.wave, planets: this.discoveredPlanets.length });
      this.leaderboard.sort((a,b) => b.score - a.score);
      this.leaderboard = this.leaderboard.slice(0, 10);
      try { localStorage.setItem('cosmic_leaderboard_v3', JSON.stringify(this.leaderboard)); } catch(e) {}
    },

    // ── EXPLOSION ────────────────────────────────────────────────────────────
    createExplosion(pos, isLarge, color) {
      AudioEngine.playExplosion(isLarge);
      const col = color || (isLarge ? 0xf59e0b : 0xef4444);
      const count = isLarge ? 40 : 18;

      const mat = new THREE.MeshBasicMaterial({ color: col, blending: THREE.AdditiveBlending });
      for (let i = 0; i < count; i++) {
        const sz = (isLarge ? 0.9 : 0.4) + Math.random() * (isLarge ? 1.6 : 0.8);
        const geo = new THREE.DodecahedronGeometry(sz, 0);
        const mesh = new THREE.Mesh(geo, mat); mesh.position.copy(pos);
        const vel = new THREE.Vector3((Math.random()-0.5)*(isLarge?5.5:3.0),(Math.random()-0.5)*(isLarge?5.5:3.0),(Math.random()-0.5)*(isLarge?5.5:3.0));
        this.scene.add(mesh);
        this.particles.push({ mesh, vel, rotVel: new THREE.Vector3(Math.random()*0.22,Math.random()*0.22,Math.random()*0.22), life: 50+Math.random()*35, maxLife: 85 });
      }

      // Shockwave ring
      const rg = new THREE.RingGeometry(0.5, 2.5, 32);
      const rm = new THREE.MeshBasicMaterial({ color: col, side: THREE.DoubleSide, transparent: true, opacity: 0.92, blending: THREE.AdditiveBlending });
      const ring = new THREE.Mesh(rg, rm); ring.position.copy(pos); ring.lookAt(this.camera.position);
      this.scene.add(ring);
      this.shockwaves.push({ mesh: ring, scale: 1, maxScale: isLarge ? 40 : 20, opacity: 0.92 });
    },

    // ── MAIN UPDATE ──────────────────────────────────────────────────────────
    update(dt) {
      if (!this.running || this.paused || !this.player.group) return;

      this.elapsedTime += dt;
      const pg = this.player.group;
      pg.visible = (this.cameraMode === 'chase');

      // Timers
      if (this.player.invulnTimer > 0) this.player.invulnTimer--;
      if (this.player.damageCooldown > 0) this.player.damageCooldown--;

      // ── 1. FLIGHT & AERODYNAMICS ─────────────────────────────────────────
      if (!this.player.warpActive) {
        let throttle = 0;
        if (this.keys['w'] || this.keys['keyw'] || this.keys['arrowup']) throttle = 1.0;
        if (this.keys['s'] || this.keys['keys'] || this.keys['arrowdown']) throttle = -0.6;
        const boost = this.keys['shift'];

        // Cruising speed ensures the ship has constant forward momentum in space
        let tgtSpeed = this.player.baseCruiseSpeed;
        if (throttle > 0) {
          tgtSpeed = boost ? this.player.boostSpeed : this.player.maxSpeed;
        } else if (throttle < 0) {
          tgtSpeed = 1.2; // airbrake / reverse thrusters
        }

        this.player.speed += (tgtSpeed - this.player.speed) * (boost ? 0.22 : this.player.accel);
        AudioEngine.updateEngine(Math.abs(this.player.speed) / this.player.boostSpeed);

        const tp = 0.034;
        let steeringYaw = 0;
        if (this.keys['a'] || this.keys['keya'] || this.keys['arrowleft'])  { this.player.turnVelocity.yaw  += tp; steeringYaw += 1; }
        if (this.keys['d'] || this.keys['keyd'] || this.keys['arrowright']) { this.player.turnVelocity.yaw  -= tp; steeringYaw -= 1; }
        if (this.keys['q'] || this.keys['keyq'])                             this.player.turnVelocity.roll += tp * 1.15;
        if (this.keys['z'] || this.keys['keyz'])                             this.player.turnVelocity.roll -= tp * 1.15;

        // Dynamic Fighter Banking & Aerodynamic Tilt (rolls into turns like a real starfighter)
        this.player.targetBankAngle = (steeringYaw * 0.48) - (this.player.turnVelocity.yaw * 14.0);
        this.player.bankAngle += (this.player.targetBankAngle - this.player.bankAngle) * 0.15;
        if (this.player.shipModel) {
          this.player.shipModel.rotation.z = this.player.bankAngle;
          this.player.shipModel.rotation.x = -this.player.turnVelocity.pitch * 3.2;
        }

        pg.rotateY(this.player.turnVelocity.yaw);
        pg.rotateX(this.player.turnVelocity.pitch);
        pg.rotateZ(this.player.turnVelocity.roll);
        this.player.turnVelocity.yaw   *= 0.78;
        this.player.turnVelocity.pitch *= 0.78;
        this.player.turnVelocity.roll  *= 0.82;

        const fwdVec = new THREE.Vector3(0, 0, 1).applyQuaternion(pg.quaternion).normalize();
        pg.position.addScaledVector(fwdVec, this.player.speed);

        // Continuous fire
        const fireChance = (this.player.overdriveTimer > 0) ? 0.65 : 0.28;
        if (this.mouse.down && Math.random() < fireChance) this.firePlayerWeapon();

        // Warp trigger on Tab
        if (this.keys['tab']) { this.keys['tab'] = false; this.triggerWarp(); }
      } else {
        // WARP TRANSITION
        this.player.warpTimer--;
        const frac = Math.max(0, this.player.warpTimer / 90);
        if (this.player.warpTarget) {
          pg.position.lerp(this.player.warpTarget, 1 - frac * 0.94);
        }
        if (this.player.warpTimer <= 0) {
          this.player.warpActive = false;
          this.player.warpParticles.forEach(wp => { this.camera.remove(wp.mesh); });
          this.player.warpParticles = [];
          this._updateWarpBtn(false);
        }
        this.player.warpParticles.forEach(wp => { wp.mesh.position.z -= wp.speed; wp.life--; wp.mesh.material.opacity = wp.life / 90; });
        this.player.warpParticles = this.player.warpParticles.filter(wp => { if (wp.life <= 0) { this.camera.remove(wp.mesh); return false; } return true; });
      }

      // ── SPACE DUST SPEED STREAM ──────────────────────────────────────────
      this._updateSpaceDust();

      // ── 2. ENGINE FX ─────────────────────────────────────────────────────
      const fwdV = new THREE.Vector3(0, 0, 1).applyQuaternion(pg.quaternion).normalize();
      const speedRatio = Math.max(0, this.player.speed) / this.player.boostSpeed;
      const flameScale = 0.55 + speedRatio * 2.8;
      this.player.flames.forEach(fl => {
        fl.scale.set(1, flameScale, 1);
        fl.material.opacity = 0.45 + Math.random() * 0.55;
        fl.material.color.setHex(this.player.warpActive ? 0x7c3aed : (this.player.overdriveTimer > 0 ? 0xd946ef : 0x00e5ff));
      });
      if (this.player.thrusterLight) this.player.thrusterLight.intensity = 1.8 + flameScale * 2.2;

      // Reactor pulse
      if (this.player.reactorCore) {
        const pulse = 0.9 + Math.sin(this.elapsedTime * 6) * 0.3;
        this.player.reactorCore.scale.setScalar(pulse);
      }

      // ── 3. SHIELD ────────────────────────────────────────────────────────
      if (this.player.shieldMesh) {
        if (this.player.shieldFlash > 0) {
          this.player.shieldFlash -= dt * 3.8;
          this.player.shieldMesh.material.opacity = Math.max(0, this.player.shieldFlash * 0.55);
          this.player.shieldMesh.rotation.y += 0.08;
          this.player.shieldMesh.rotation.x += 0.04;
        } else {
          this.player.shieldMesh.material.opacity = 0;
        }
      }

      // ── 4. RECHARGE, OVERDRIVE & SYSTEMS ─────────────────────────────────
      this.player.energy = Math.min(this.player.maxEnergy, this.player.energy + 0.52);
      if (this.player.damageCooldown <= 0) this.player.shield = Math.min(this.player.maxShield, this.player.shield + 0.32);

      // Overdrive logic
      if (this.player.overdriveTimer > 0) {
        this.player.overdriveTimer--;
        this.player.heat = 0;
      } else {
        this.player.heat = Math.max(0, this.player.heat - 0.9);
      }

      if (!this.player.empReady) {
        this.player.empCooldown--;
        if (this.player.empCooldown <= 0) {
          this.player.empReady = true;
          const btn = document.getElementById('cosmic-emp-btn');
          if (btn) { btn.style.opacity = '1'; btn.textContent = '⚡ [Space] EMP Blast'; }
        }
      }
      if (this.player.hull < 75 && !this.player.emergencyRepairUsed) {
        this.player.emergencyRepairUsed = true;
        this.player.hull = 120;
        this.player.shield = 180;
        this._showToast('⚠️ EMERGENCY REPAIR ACTIVATED / RÉPARATION D\'URGENCE!');
      }

      // Damage flash decay
      if (this.player.damageFlash > 0) this.player.damageFlash -= dt * 2.5;
      this._updateDamageFlash();

      // ── 5. CAMERA DYNAMICS & ELASTIC TRACKING ────────────────────────────
      if (this.cameraMode === 'cockpit') {
        this.camera.position.copy(pg.position).add(new THREE.Vector3(0,0.6,0).applyQuaternion(pg.quaternion)).addScaledVector(fwdV, 2.2);
        this.camera.quaternion.copy(pg.quaternion);
        this.camera.fov = 75;
      } else {
        const camDist = 16 + speedRatio * 4.8;
        const camOffset = new THREE.Vector3(0, 4.4, -camDist).applyQuaternion(pg.quaternion);
        this.camera.position.lerp(pg.position.clone().add(camOffset), 0.12);

        // Dynamic FOV (widens to 81 on boost for hyperspace speed rush)
        const targetFov = 65 + speedRatio * 16;
        this.camera.fov += (targetFov - this.camera.fov) * 0.12;

        // Camera shake on explosion or firing
        if (this.cameraShake > 0) {
          this.camera.position.x += (Math.random() - 0.5) * this.cameraShake;
          this.camera.position.y += (Math.random() - 0.5) * this.cameraShake;
          this.camera.position.z += (Math.random() - 0.5) * this.cameraShake;
          this.cameraShake *= 0.88;
          if (this.cameraShake < 0.05) this.cameraShake = 0;
        }

        const lookTarget = pg.position.clone().add(fwdV.clone().multiplyScalar(45));
        this.camera.lookAt(lookTarget);

        // Subtle camera roll into banked turns
        this.camera.rotation.z += this.player.bankAngle * 0.16;
      }
      this.camera.updateProjectionMatrix();

      // ── MAGNETIC LOOT UPDATE ─────────────────────────────────────────────
      this._updateLoot();


      // ── 6. SOLAR SYSTEM ORBITAL MECHANICS ───────────────────────────────
      this.planets.forEach(p => {
        p.orbitAngle += p.orbitSpeed;
        const ox = Math.cos(p.orbitAngle) * p.orbitRadius;
        const oz = -5500 + Math.sin(p.orbitAngle) * p.orbitRadius;
        p.group.position.set(ox, p.orbitY, oz);
        if (p.mesh) p.mesh.rotation.y += 0.0006;
        if (p.cloudMesh) p.cloudMesh.rotation.y += 0.0014;
      });

      // Moon orbits
      this.moons.forEach(m => {
        m.orbitAngle += m.orbitSpeed;
        const parentPos = m.parentPlanet.group.position;
        m.mesh.position.set(
          Math.cos(m.orbitAngle) * m.orbitRadius,
          Math.sin(m.orbitAngle * 0.3) * m.orbitRadius * 0.2,
          Math.sin(m.orbitAngle) * m.orbitRadius
        );
      });

      // Sun rotation
      if (this.sun) this.sun.children[0] && (this.sun.children[0].rotation.y += 0.0003);
      if (this.sunCorona) this.sunCorona.scale.setScalar(1 + Math.sin(this.elapsedTime * 0.8) * 0.05);

      // ── 7. ASTEROIDS ─────────────────────────────────────────────────────
      this.asteroids.forEach(ast => {
        ast.mesh.rotation.x += ast.rotVel.x;
        ast.mesh.rotation.y += ast.rotVel.y;
        ast.mesh.rotation.z += ast.rotVel.z;
        // Slow orbital drift
        ast.orbitAngle += ast.orbitSpeed;
        const nx = Math.cos(ast.orbitAngle) * ast.orbitRadius;
        const nz = Math.sin(ast.orbitAngle) * ast.orbitRadius;
        ast.mesh.position.set(nx, ast.orbitY, nz);

        // Collision
        const dAst = ast.mesh.position.distanceTo(pg.position);
        if (dAst < ast.r + 4.2 && this.player.invulnTimer <= 0 && this.player.damageCooldown <= 0) {
          this.damagePlayer(10); this.player.damageCooldown = 35;
          this.createExplosion(pg.position, false);
          this.player.speed = -3.5;
          const pushDir = pg.position.clone().sub(ast.mesh.position).normalize();
          pg.position.copy(ast.mesh.position).addScaledVector(pushDir, ast.r + 5.5);
        }
      });

      // ── 8. COMETS ────────────────────────────────────────────────────────
      this.cometSpawnTimer--;
      if (this.cometSpawnTimer <= 0) { this.cometSpawnTimer = 700 + Math.random() * 600; this._spawnComet(); }
      for (let i = this.comets.length - 1; i >= 0; i--) {
        const cm = this.comets[i];
        cm.mesh.position.addScaledVector(cm.dir, cm.speed);
        cm.life--;
        if (cm.life <= 0 || cm.mesh.position.length() > 16000) { this.scene.remove(cm.mesh); this.comets.splice(i, 1); }
        // Comet hit player
        if (cm.mesh.position.distanceTo(pg.position) < 32 && this.player.invulnTimer <= 0) {
          this.damagePlayer(25); this.createExplosion(cm.mesh.position, true, 0xa5f3fc);
          this.scene.remove(cm.mesh); this.comets.splice(i, 1);
        }
      }

      // ── 9. PLAYER LASERS ─────────────────────────────────────────────────
      for (let i = this.playerLasers.length - 1; i >= 0; i--) {
        const laser = this.playerLasers[i];
        laser.life--;

        if (laser.isMissile) {
          // Homing toward target
          if (laser.target && laser.target.group) {
            const toTarget = laser.target.group.position.clone().sub(laser.mesh.position).normalize();
            laser.dir.lerp(toTarget, 0.06).normalize();
          }
          laser.mesh.position.addScaledVector(laser.dir, laser.speed);
          laser.mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), laser.dir);
          // Missile trail particle
          if (Math.random() < 0.7) {
            const tp = new THREE.Mesh(new THREE.SphereGeometry(0.3, 4, 4), new THREE.MeshBasicMaterial({ color: 0xff8800, blending: THREE.AdditiveBlending }));
            tp.position.copy(laser.mesh.position).addScaledVector(laser.dir, -2);
            this.scene.add(tp);
            this.particles.push({ mesh: tp, vel: new THREE.Vector3((Math.random()-0.5)*0.5,(Math.random()-0.5)*0.5,(Math.random()-0.5)*0.5), rotVel: new THREE.Vector3(), life: 18, maxLife: 18 });
          }
        } else if (laser.isTorpedo) {
          laser.mesh.position.addScaledVector(laser.dir, laser.speed);
          if (laser.ringMesh) laser.ringMesh.rotation.z += 0.08;
        } else if (laser.isSingularity) {
          laser.mesh.position.addScaledVector(laser.dir, laser.speed);
          if (laser.ringMesh) laser.ringMesh.rotation.z += 0.14;
          // Gravitational pull on nearby enemies
          this.enemies.forEach(en => {
            const d = en.group.position.distanceTo(laser.mesh.position);
            if (d < 200) { const pull = laser.mesh.position.clone().sub(en.group.position).normalize().multiplyScalar(2.8); en.group.position.add(pull); }
          });
        } else {
          laser.mesh.position.addScaledVector(laser.dir, laser.speed);
        }

        let hit = false;

        // vs Asteroids
        for (let a = this.asteroids.length - 1; a >= 0; a--) {
          const ast = this.asteroids[a];
          const hitR = laser.isTorpedo ? ast.r + 50 : ast.r + 3;
          if (laser.mesh.position.distanceTo(ast.mesh.position) < hitR) {
            ast.hp -= laser.damage; hit = true;
            this.createExplosion(laser.mesh.position, false);
            if (ast.hp <= 0) {
              const credGain = Math.ceil(ast.r * 2.5);
              this.player.score += 90; this.player.credits += credGain;
              this.createExplosion(ast.mesh.position, true);
              if (Math.random() < 0.45) this._spawnLoot(ast.mesh.position.clone());
              this.scene.remove(ast.mesh);
              this.asteroids.splice(a, 1);
              // Chance to fragment
              if (ast.r > 26 && Math.random() < 0.45) this._fragmentAsteroid(ast);
            } else {
              // Mining flash
              if (ast.r > 22) this._showMineTooltip(ast);
            }
            if (!laser.isBeam) break;
          }
        }

        // vs Enemies
        if (!hit || laser.isBeam) {
          for (let e = this.enemies.length - 1; e >= 0; e--) {
            const en = this.enemies[e];
            const hitR = laser.isTorpedo ? en.radius + 50 : en.radius + 4.0;
            if (laser.mesh.position.distanceTo(en.group.position) < hitR) {
              en.hp -= laser.damage; hit = true;
              this.createExplosion(laser.mesh.position, false, 0x00f0ff);
              if (en.hp <= 0) {
                const expColor = en.type === 'mothership' ? 0xff00ff : (en.type === 'chrono_shard' ? 0xd946ef : (en.type === 'bio_swarmer' ? 0x10b981 : 0xef4444));
                this.createExplosion(en.group.position, true, expColor);
                if (en.type === 'mothership') {
                  this.bossActive = false;
                  this._showToast('🏆 MOTHERSHIP DESTROYED! / VAISSEAU-MÈRE DÉTRUIT! +4000');
                }
                // Spawn magnetic loot drop!
                this._spawnLoot(en.group.position.clone());
                this.scene.remove(en.group);
                this.player.score += en.scoreVal;
                this.player.credits += Math.floor(en.scoreVal / 4);
                this.enemies.splice(e, 1);
                this.waveEnemiesLeft = Math.max(0, this.waveEnemiesLeft - 1);
              }
              if (!laser.isBeam) break;
            }
          }
        }

        if ((hit && !laser.isBeam) || laser.life <= 0) { this.scene.remove(laser.mesh); this.playerLasers.splice(i, 1); }
      }

      // ── 10. WAVE & ALIEN SPAWNING ─────────────────────────────────────────
      this._updateWaves();

      // ── 11. ALIEN AI & DYNAMIC DOGFIGHTING ─────────────────────────────────
      for (let i = this.enemies.length - 1; i >= 0; i--) {
        const en = this.enemies[i];
        const toPl = pg.position.clone().sub(en.group.position);
        const dist = toPl.length();
        en.group.lookAt(pg.position);

        if (en.type === 'mothership') {
          // Boss: Leviathan Sovereign
          if (en.accretion) en.accretion.rotation.z += 0.05;
          const orbitDist = 450;
          if (dist > orbitDist + 80) en.group.translateZ(en.speed * 1.2);
          else if (dist < orbitDist - 80) en.group.translateZ(-en.speed * 0.7);
          else { en.group.translateX(en.speed * 0.8); en.group.rotateY(0.006); }

          // Gravity Tractor Pull
          if (dist < 550 && Math.random() < 0.008) {
            const tractorDir = pg.position.clone().sub(en.group.position).normalize().multiplyScalar(-0.6);
            pg.position.add(tractorDir);
            this._showToast('⚠️ GRAVITY WELL DETECTED! / PUITS GRAVITATIONNEL!');
          }

          // 4-Way Multi-shot Barrage
          en.fireCooldown--;
          if (en.fireCooldown <= 0 && dist < 700) {
            en.fireCooldown = 40;
            for (let k = 0; k < 4; k++) {
              const spread = toPl.clone().normalize().add(new THREE.Vector3((Math.random()-0.5)*0.2,(Math.random()-0.5)*0.2,(Math.random()-0.5)*0.2)).normalize();
              this._spawnAlienLaser(en.group.position.clone(), spread, 0xff00aa, 13);
            }
            AudioEngine.playAlienLaser();
          }

        } else if (en.type === 'dreadnought' || en.type === 'cruiser') {
          // Cyber-Goliath Heavy Battleship
          if (en.shieldMesh) { en.shieldMesh.rotation.y += 0.025; en.shieldMesh.rotation.x += 0.015; }
          if (dist > 220) en.group.translateZ(en.speed);
          else if (dist < 120) en.group.translateZ(-en.speed * 0.6);
          else en.group.translateX(en.speed * 0.75);

          en.fireCooldown--;
          if (en.fireCooldown <= 0 && dist < 500) {
            en.fireCooldown = 65;
            AudioEngine.playAlienLaser();
            const dir = toPl.clone().normalize();
            this._spawnAlienLaser(en.group.position.clone().add(new THREE.Vector3(4,0,0)), dir, 0xef4444, 12);
            this._spawnAlienLaser(en.group.position.clone().add(new THREE.Vector3(-4,0,0)), dir, 0xef4444, 12);
          }

        } else if (en.type === 'chrono_shard') {
          // Chrono-Shard: Crystalline Entity
          if (en.shards) {
            en.shards.forEach((sh, idx) => { sh.rotation.x += 0.05; sh.rotation.y += 0.07; });
          }
          // Micro-phase teleportation burst
          if (Math.random() < 0.008 && dist < 450) {
            en.group.position.x += (Math.random() - 0.5) * 50;
            en.group.position.y += (Math.random() - 0.5) * 30;
            this.createExplosion(en.group.position, false, 0xd946ef);
          }

          if (dist > 180) en.group.translateZ(en.speed);
          else if (dist < 100) en.group.translateZ(-en.speed * 0.7);
          else en.group.translateX(en.speed * 0.85);

          en.fireCooldown--;
          if (en.fireCooldown <= 0 && dist < 480) {
            en.fireCooldown = 55;
            AudioEngine.playAlienLaser();
            const dir = toPl.clone().normalize();
            this._spawnAlienLaser(en.group.position.clone(), dir, 0xd946ef, 15);
          }

        } else {
          // Bio-organic Swarmer: Erratic Flybys & Flapping Wings
          const flap = Math.sin(this.elapsedTime * 14 + i) * 0.45;
          if (en.wingL) en.wingL.rotation.z = -0.2 - flap;
          if (en.wingR) en.wingR.rotation.z = 0.2 + flap;

          if (dist > 140) en.group.translateZ(en.speed * 1.15);
          else if (dist < 60) en.group.translateZ(-en.speed * 0.8);
          else {
            en.group.translateX((Math.sin(this.elapsedTime * 4 + i) > 0 ? 1 : -1) * en.speed * 0.9);
          }

          en.fireCooldown--;
          if (en.fireCooldown <= 0 && dist < 380) {
            en.fireCooldown = 45 + Math.random() * 30;
            AudioEngine.playAlienLaser();
            const dir = toPl.clone().normalize().add(new THREE.Vector3((Math.random()-0.5)*0.1,(Math.random()-0.5)*0.1,(Math.random()-0.5)*0.1)).normalize();
            this._spawnAlienLaser(en.group.position.clone(), dir, 0x10b981, 14);
          }
        }
      }

      // ── 12. ALIEN LASERS ─────────────────────────────────────────────────
      for (let i = this.alienLasers.length - 1; i >= 0; i--) {
        const al = this.alienLasers[i];
        al.mesh.position.addScaledVector(al.dir, al.speed);
        al.life--;
        if (al.mesh.position.distanceTo(pg.position) < 6.0) {
          if (this.player.invulnTimer <= 0 && this.player.damageCooldown <= 0) {
            this.damagePlayer(8); this.player.damageCooldown = 22;
          }
          this.scene.remove(al.mesh); this.alienLasers.splice(i, 1); continue;
        }
        if (al.life <= 0) { this.scene.remove(al.mesh); this.alienLasers.splice(i, 1); }
      }

      // ── 13. PARTICLES & SHOCKWAVES ───────────────────────────────────────
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.mesh.position.add(p.vel); p.mesh.rotation.x += p.rotVel.x; p.mesh.rotation.y += p.rotVel.y;
        p.life--; p.mesh.scale.multiplyScalar(0.965);
        if (p.life <= 0) { this.scene.remove(p.mesh); this.particles.splice(i, 1); }
      }
      for (let i = this.shockwaves.length - 1; i >= 0; i--) {
        const sw = this.shockwaves[i];
        sw.scale += (sw.maxScale - sw.scale) * 0.11;
        sw.mesh.scale.set(sw.scale, sw.scale, sw.scale);
        sw.opacity *= 0.91; sw.mesh.material.opacity = sw.opacity;
        if (sw.opacity < 0.02) { this.scene.remove(sw.mesh); this.shockwaves.splice(i, 1); }
      }

      // ── 14. RADAR MINIMAP & TACTICAL 3D HUD ──────────────────────────────
      this._drawRadar();
      this._updateTacticalHUD();

      // ── 15. HUD ──────────────────────────────────────────────────────────
      this.updateHUD();
    },

    // ── WAVE SYSTEM ─────────────────────────────────────────────────────────
    _updateWaves() {
      if (this.waveInProgress) {
        if (this.waveEnemiesLeft <= 0 && this.enemies.length === 0) {
          this.waveInProgress = false;
          this.waveTimer = 480; // 8 seconds between waves
          this.wave++;
          this._showWaveAlert(`WAVE ${this.wave} INCOMING! / VAGUE ${this.wave} EN APPROCHE!`);
          this.player.score += this.wave * 200; this.player.credits += this.wave * 50;
          this.updateHUD();
        }
      } else {
        this.waveTimer--;
        if (this.waveTimer <= 0) {
          this.waveInProgress = true;
          this._launchWave(this.wave);
        }
      }
    },

    _launchWave(wave) {
      const isBossWave = (wave % 5 === 0);
      AudioEngine.playAlarm();

      if (isBossWave && !this.bossActive) {
        this.bossActive = true;
        this.waveEnemiesLeft = 3;
        this._spawnAlienShip('boss');
        setTimeout(() => { if (this.running) this._spawnAlienShip('bio_swarmer'); }, 700);
        setTimeout(() => { if (this.running) this._spawnAlienShip('chrono_shard'); }, 1400);
        this._showWaveAlert(`⚠️ BOSS WAVE! VOID SOVEREIGN DETECTED! / VAISSEAU-MÈRE EN APPROCHE!`);
      } else {
        const swarmerCount = 2 + Math.min(6, wave);
        const shardCount = Math.floor(wave / 2);
        const goliathCount = wave >= 3 ? Math.floor((wave - 1) / 2) : 0;
        this.waveEnemiesLeft = swarmerCount + shardCount + goliathCount;

        for (let i = 0; i < swarmerCount; i++) {
          const formAngle = (i / swarmerCount) * Math.PI * 2;
          setTimeout(() => { if(this.running) this._spawnAlienShip('bio_swarmer', formAngle); }, i * 280);
        }
        for (let i = 0; i < shardCount; i++) {
          setTimeout(() => { if(this.running) this._spawnAlienShip('chrono_shard'); }, swarmerCount * 280 + i * 360);
        }
        for (let i = 0; i < goliathCount; i++) {
          setTimeout(() => { if(this.running) this._spawnAlienShip('dreadnought'); }, (swarmerCount + shardCount) * 280 + i * 460);
        }
      }
    },

    _showWaveAlert(msg) {
      const el = document.getElementById('cosmic-wave-alert');
      if (!el) return;
      el.textContent = msg; el.style.opacity = '1';
      setTimeout(() => { el.style.opacity = '0'; }, 4000);
    },

    // ── SPAWN ALIEN LASER ────────────────────────────────────────────────────
    _spawnAlienLaser(pos, dir, color, speed) {
      const geo = new THREE.SphereGeometry(0.6, 8, 8);
      const mat = new THREE.MeshBasicMaterial({ color: color || 0xef4444, blending: THREE.AdditiveBlending });
      const mesh = new THREE.Mesh(geo, mat); mesh.position.copy(pos);
      // Glow aura
      const glowGeo = new THREE.SphereGeometry(1.2, 8, 8);
      const glowMat = new THREE.MeshBasicMaterial({ color: color || 0xef4444, transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending });
      mesh.add(new THREE.Mesh(glowGeo, glowMat));
      this.scene.add(mesh);
      this.alienLasers.push({ mesh, dir, speed: speed || 12, life: 90 });
    },

    // ── FRAGMENT ASTEROID ────────────────────────────────────────────────────
    _fragmentAsteroid(ast) {
      const rockTex = TexGen.asteroid();
      for (let i = 0; i < 3; i++) {
        const newR = ast.r * 0.45;
        const geo = new THREE.DodecahedronGeometry(newR, 0);
        const mat = new THREE.MeshStandardMaterial({ map: rockTex, roughness: 0.9, metalness: 0.15 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(ast.mesh.position).add(new THREE.Vector3((Math.random()-0.5)*ast.r*2,(Math.random()-0.5)*ast.r*2,(Math.random()-0.5)*ast.r*2));
        this.scene.add(mesh);
        this.asteroids.push({
          mesh, r: newR, hp: Math.ceil(newR * 1.8), maxHp: Math.ceil(newR * 1.8),
          rotVel: new THREE.Vector3((Math.random()-0.5)*0.02,(Math.random()-0.5)*0.02,(Math.random()-0.5)*0.02),
          orbitAngle: Math.random()*Math.PI*2, orbitRadius: ast.orbitRadius + (Math.random()-0.5)*200,
          orbitSpeed: ast.orbitSpeed * (0.9+Math.random()*0.2), orbitY: ast.orbitY + (Math.random()-0.5)*80
        });
      }
    },

    _showMineTooltip(ast) {
      // Brief flash tooltip — not persistent
    },

    // ── RADAR MINIMAP ────────────────────────────────────────────────────────
    _drawRadar() {
      const radarCanvas = document.getElementById('cosmic-radar');
      if (!radarCanvas || !this.player.group) return;
      const ctx = radarCanvas.getContext('2d');
      const W = radarCanvas.width, H = radarCanvas.height;
      const cx = W / 2, cy = H / 2, range = 4000;

      ctx.clearRect(0, 0, W, H);

      // Background
      ctx.fillStyle = 'rgba(3,6,17,0.85)';
      ctx.beginPath(); ctx.arc(cx, cy, cx-1, 0, Math.PI*2); ctx.fill();

      // Rings
      ctx.strokeStyle = 'rgba(56,189,248,0.18)';
      [0.33, 0.66, 1.0].forEach(f => { ctx.beginPath(); ctx.arc(cx, cy, (cx-2)*f, 0, Math.PI*2); ctx.stroke(); });

      // Grid cross
      ctx.strokeStyle = 'rgba(56,189,248,0.1)';
      ctx.beginPath(); ctx.moveTo(cx,2); ctx.lineTo(cx,H-2); ctx.moveTo(2,cy); ctx.lineTo(W-2,cy); ctx.stroke();

      const pPos = this.player.group.position;
      const toRadar = (worldPos) => {
        const dx = worldPos.x - pPos.x, dz = worldPos.z - pPos.z;
        return { x: cx + (dx / range) * (cx-4), y: cy + (dz / range) * (cy-4) };
      };

      // Planets (cyan dots)
      this.planets.forEach(p => {
        const r = toRadar(p.group.position);
        if (r.x < 2 || r.x > W-2 || r.y < 2 || r.y > H-2) return;
        ctx.fillStyle = '#38bdf8'; ctx.beginPath(); ctx.arc(r.x, r.y, 3.5, 0, Math.PI*2); ctx.fill();
      });

      // Asteroids (gray dots)
      this.asteroids.forEach(ast => {
        const r = toRadar(ast.mesh.position);
        if (r.x < 2 || r.x > W-2 || r.y < 2 || r.y > H-2) return;
        ctx.fillStyle = '#475569'; ctx.beginPath(); ctx.arc(r.x, r.y, 1.5, 0, Math.PI*2); ctx.fill();
      });

      // Enemies (red triangles)
      // Enemies (red / purple / orange triangles)
      this.enemies.forEach(en => {
        const r = toRadar(en.group.position);
        if (r.x < 2 || r.x > W-2 || r.y < 2 || r.y > H-2) return;
        ctx.fillStyle = en.type === 'mothership' ? '#ff00ff' : (en.type === 'dreadnought' ? '#fb923c' : (en.type === 'chrono_shard' ? '#e879f9' : '#ef4444'));
        ctx.beginPath();
        ctx.moveTo(r.x, r.y - 5); ctx.lineTo(r.x + 4, r.y + 3); ctx.lineTo(r.x - 4, r.y + 3);
        ctx.closePath(); ctx.fill();
      });

      // Loot drops (yellow / green glowing pips)
      this.lootDrops.forEach(loot => {
        const r = toRadar(loot.mesh.position);
        if (r.x < 2 || r.x > W-2 || r.y < 2 || r.y > H-2) return;
        ctx.fillStyle = loot.type === 'repair' ? '#4ade80' : (loot.type === 'overdrive' ? '#c084fc' : '#fbbf24');
        ctx.beginPath(); ctx.arc(r.x, r.y, 2.5, 0, Math.PI*2); ctx.fill();
      });

      // Sun (yellow)
      const sunRadar = toRadar(new THREE.Vector3(0, 0, -5500));
      if (sunRadar.x >= 0 && sunRadar.x <= W && sunRadar.y >= 0 && sunRadar.y <= H) {
        ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(sunRadar.x, sunRadar.y, 5, 0, Math.PI*2); ctx.fill();
      }

      // Player (white arrow pointing ship direction)
      const fwd = new THREE.Vector3(0, 0, 1).applyQuaternion(this.player.group.quaternion);
      const ang = Math.atan2(fwd.x, fwd.z);
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(ang);
      ctx.fillStyle = '#ffffff';
      ctx.beginPath(); ctx.moveTo(0,-7); ctx.lineTo(5,5); ctx.lineTo(0,2); ctx.lineTo(-5,5); ctx.closePath(); ctx.fill();
      ctx.restore();

      // Border
      ctx.strokeStyle = 'rgba(56,189,248,0.4)'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(cx, cy, cx-1, 0, Math.PI*2); ctx.stroke();

      // Label
      ctx.fillStyle = 'rgba(56,189,248,0.55)'; ctx.font = '9px monospace';
      ctx.fillText('RADAR', 4, 14);
    },

    // ── TACTICAL 3D TARGETING & ALIEN TRACKING HUD ───────────────────────────
    _updateTacticalHUD() {
      if (!this.tacticalHudEl || !this.camera || !this.container) return;
      const W = this.container.clientWidth;
      const H = this.container.clientHeight;
      if (!W || !H) return;

      const pPos = this.player.group ? this.player.group.position : new THREE.Vector3();
      const fwd = this.player.group ? new THREE.Vector3(0, 0, 1).applyQuaternion(this.player.group.quaternion).normalize() : new THREE.Vector3(0, 0, 1);

      let html = '';
      let bestLock = null;
      const lockThreshold = 0.94; // Tight cone for target lock-on

      // 1. Enemies tracking
      for (let i = 0; i < this.enemies.length; i++) {
        const en = this.enemies[i];
        const enPos = en.group.position.clone();
        const dist = enPos.distanceTo(pPos);
        if (dist > 1800) continue;

        const toEn = enPos.clone().sub(pPos).normalize();
        const dot = fwd.dot(toEn);
        if (dot < 0.12) continue; // Behind camera

        const projected = enPos.clone().project(this.camera);
        if (projected.z >= 1.0) continue;

        const sx = (projected.x * 0.5 + 0.5) * W;
        const sy = (-projected.y * 0.5 + 0.5) * H;
        if (sx < 12 || sx > W - 12 || sy < 12 || sy > H - 12) continue;

        const isAimLocked = (dot > lockThreshold);
        if (isAimLocked && (!bestLock || dot > bestLock.dot)) {
          bestLock = { en, dot };
        }

        const hpPct = Math.max(0, Math.min(100, (en.hp / en.maxHp) * 100));
        const color = isAimLocked ? '#f43f5e' : (en.type === 'mothership' ? '#c084fc' : (en.type === 'dreadnought' ? '#fb923c' : (en.type === 'chrono_shard' ? '#e879f9' : '#4ade80')));
        const boxSize = Math.max(28, Math.min(68, Math.floor(6500 / dist)));

        html += `
          <div style="position:absolute;left:${Math.round(sx)}px;top:${Math.round(sy)}px;transform:translate(-50%,-50%);pointer-events:none">
            <div style="width:${boxSize}px;height:${boxSize}px;border:1.5px ${isAimLocked ? 'solid #f43f5e' : 'dashed ' + color};position:relative;box-shadow:0 0 10px ${color}55">
              ${isAimLocked ? '<div style="position:absolute;inset:-4px;border:1px solid #f43f5e;opacity:0.85"></div>' : ''}
              <div style="position:absolute;top:-18px;left:50%;transform:translateX(-50%);font-size:0.65rem;font-weight:800;color:${color};white-space:nowrap;text-shadow:0 0 4px #000;letter-spacing:0.5px">
                ${en.name || en.type.toUpperCase()} · ${Math.round(dist)}ls
              </div>
              <div style="position:absolute;bottom:-8px;left:50%;transform:translateX(-50%);width:100%;height:3px;background:rgba(255,255,255,0.15);border-radius:2px;overflow:hidden">
                <div style="width:${hpPct}%;height:100%;background:${color};transition:width .1s"></div>
              </div>
            </div>
          </div>
        `;
      }

      if (bestLock && (performance.now() - this.lastLockBeep > 450)) {
        this.lastLockBeep = performance.now();
        AudioEngine.playLockOn();
      }

      // 2. Floating Loot Drops tracking
      for (let i = 0; i < this.lootDrops.length; i++) {
        const loot = this.lootDrops[i];
        const lPos = loot.mesh.position.clone();
        const dist = lPos.distanceTo(pPos);
        if (dist > 1200) continue;

        const toLoot = lPos.clone().sub(pPos).normalize();
        if (fwd.dot(toLoot) < 0.12) continue;

        const projected = lPos.clone().project(this.camera);
        if (projected.z >= 1.0) continue;

        const sx = (projected.x * 0.5 + 0.5) * W;
        const sy = (-projected.y * 0.5 + 0.5) * H;
        if (sx < 15 || sx > W - 15 || sy < 15 || sy > H - 15) continue;

        const col = loot.type === 'repair' ? '#4ade80' : (loot.type === 'overdrive' ? '#c084fc' : (loot.type === 'fuel' ? '#38bdf8' : '#fbbf24'));
        html += `
          <div style="position:absolute;left:${Math.round(sx)}px;top:${Math.round(sy)}px;transform:translate(-50%,-50%);pointer-events:none">
            <div style="width:18px;height:18px;border:1.5px solid ${col};transform:rotate(45deg);box-shadow:0 0 10px ${col}"></div>
            <div style="position:absolute;top:-16px;left:50%;transform:translateX(-50%);font-size:0.62rem;font-weight:700;color:${col};white-space:nowrap;text-shadow:0 0 4px #000">
              ${loot.label} (${Math.round(dist)}ls)
            </div>
          </div>
        `;
      }

      this.tacticalHudEl.innerHTML = html;
    },


    // ── DAMAGE FLASH OVERLAY ────────────────────────────────────────────────
    _updateDamageFlash() {
      const overlay = document.getElementById('cosmic-damage-flash');
      if (!overlay) return;
      const opacity = Math.max(0, this.player.damageFlash * 0.6);
      overlay.style.opacity = opacity;
    },

    // ── DAMAGE PLAYER ───────────────────────────────────────────────────────
    damagePlayer(dmg) {
      if (this.player.invulnTimer > 0) return;
      AudioEngine.playShieldHit();
      this.player.shieldFlash = 0.65;
      this.player.damageFlash = 1.0;
      const fireRateBonus = this.player.upgrades.fireRate * 0.1;
      if (this.player.shield > 0) {
        this.player.shield -= dmg * (1 - fireRateBonus * 0.5);
        if (this.player.shield < 0) { this.player.hull += this.player.shield; this.player.shield = 0; }
      } else {
        this.player.hull -= dmg;
      }
      if (this.player.hull <= 0) { this.player.hull = 0; this.gameOver(); }
      this.updateHUD();
    },

    // ── GAME OVER ───────────────────────────────────────────────────────────
    gameOver() {
      this.running = false;
      this.createExplosion(this.player.group.position, true, 0xf43f5e);
      this._saveScore();
      const el = document.getElementById('cosmic-game-over');
      const sc = document.getElementById('cosmic-final-score');
      const dc = document.getElementById('cosmic-final-disc');
      const wv = document.getElementById('cosmic-final-wave');
      if (sc) sc.textContent = this.player.score.toLocaleString();
      if (dc) dc.textContent = this.discoveredPlanets.length;
      if (wv) wv.textContent = this.wave;
      if (el) el.style.display = 'flex';
    },

    // ── HUD UPDATE ──────────────────────────────────────────────────────────
    updateHUD() {
      const hp  = Math.max(0, (this.player.hull   / this.player.maxHull)   * 100);
      const shp = Math.max(0, (this.player.shield / this.player.maxShield) * 100);
      const enp = Math.max(0, (this.player.energy / this.player.maxEnergy) * 100);
      const htp = Math.max(0, (this.player.heat   / this.player.maxHeat)   * 100);

      const set = (id, v) => { const e = document.getElementById(id); if (e) e.style.width = v + '%'; };
      set('cosmic-hull-bar', hp); set('cosmic-shield-bar', shp);
      set('cosmic-energy-bar', enp); set('cosmic-heat-bar', htp);

      // Heat bar color
      const hb = document.getElementById('cosmic-heat-bar');
      if (hb) hb.style.background = htp > 80 ? '#ef4444' : htp > 55 ? '#f97316' : '#fbbf24';

      const setText = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
      setText('cosmic-score', this.player.score.toLocaleString());
      setText('cosmic-credits', this.player.credits.toLocaleString());
      setText('cosmic-disc-count', this.discoveredPlanets.length);
      setText('cosmic-wave-num', this.wave);
      const spd = Math.abs(this.player.speed) * 3.6;
      setText('cosmic-hud-speed', spd.toFixed(1));

      // Target lock reticle
      const reticle = document.getElementById('cosmic-hud-reticle');
      if (reticle && this.player.group) {
        const fwd = new THREE.Vector3(0, 0, 1).applyQuaternion(this.player.group.quaternion).normalize();
        let locked = false;
        for (const en of this.enemies) {
          const toEn = en.group.position.clone().sub(this.player.group.position);
          if (toEn.length() < 600 && fwd.dot(toEn.normalize()) > 0.87) { locked = true; break; }
        }
        const inner = reticle.firstElementChild;
        if (inner) {
          if (locked) { inner.style.borderColor = '#f43f5e'; inner.style.boxShadow = '0 0 22px rgba(244,63,94,0.75)'; inner.style.transform = 'translate(-50%,-50%) scale(1.15)'; }
          else { inner.style.borderColor = 'rgba(56,189,248,0.45)'; inner.style.boxShadow = '0 0 15px rgba(56,189,248,0.25)'; inner.style.transform = 'translate(-50%,-50%) scale(1.0)'; }
        }
      }

      // EMP cooldown indicator
      const empBar = document.getElementById('cosmic-emp-cooldown');
      if (empBar) {
        const pct = this.player.empReady ? 100 : Math.max(0, 100 - (this.player.empCooldown / 280) * 100);
        empBar.style.width = pct + '%';
      }

      // Warp energy indicator
      const warpBar = document.getElementById('cosmic-warp-energy-bar');
      if (warpBar) {
        const hasFuel = this.player.energy >= 80;
        warpBar.style.background = hasFuel ? '#7c3aed' : '#374151';
        warpBar.style.width = Math.min(100, (this.player.energy / 80) * 100) + '%';
      }
    },

    // ── SHOW TOAST ──────────────────────────────────────────────────────────
    _showToast(msg) {
      if (typeof showToast === 'function') { showToast(msg, 'info'); return; }
      const el = document.getElementById('cosmic-toast');
      if (!el) return;
      el.textContent = msg; el.style.opacity = '1';
      clearTimeout(this._toastTimer);
      this._toastTimer = setTimeout(() => { el.style.opacity = '0'; }, 3500);
    },

    // ── START / RESTART ─────────────────────────────────────────────────────
    start() {
      this.init();
      if (this.animId) { cancelAnimationFrame(this.animId); this.animId = null; }

      // Clear entities
      [...this.playerLasers, ...this.alienLasers].forEach(l => this.scene.remove(l.mesh));
      [...this.enemies].forEach(e => this.scene.remove(e.group));
      [...this.particles, ...this.shockwaves].forEach(p => this.scene.remove(p.mesh));
      this.player.warpParticles.forEach(wp => this.camera.remove(wp.mesh));
      this.lootDrops.forEach(l => this.scene.remove(l.mesh));
      this.playerLasers = []; this.alienLasers = []; this.enemies = []; this.particles = []; this.shockwaves = []; this.comets = [];
      this.player.warpParticles = []; this.lootDrops = [];

      // Reset player
      Object.assign(this.player, {
        hull: 250, maxHull: 250, shield: 300, maxShield: 300,
        energy: 200, maxEnergy: 200, heat: 0,
        score: 0, credits: 0,
        speed: 4.5, baseCruiseSpeed: 4.5, maxSpeed: 10.5, boostSpeed: 20.0,
        bankAngle: 0, targetBankAngle: 0, overdriveTimer: 0,
        turnVelocity: { yaw: 0, pitch: 0, roll: 0 },
        weapon: 'pulse', empReady: true, empCooldown: 0,
        invulnTimer: 180, damageCooldown: 0, emergencyRepairUsed: false,
        shieldFlash: 0, damageFlash: 0, warpActive: false, warpTimer: 0, warpTarget: null,
        upgrades: { hullMax: 0, shieldMax: 0, energyMax: 0, fireRate: 0, engineBoost: 0 }
      });

      // Reset wave
      this.wave = 1; this.waveEnemiesLeft = 0; this.waveInProgress = false;
      this.waveTimer = 90; // First wave begins in 1.5 seconds!
      this.bossActive = false;
      this.discoveredPlanets = [];
      this.elapsedTime = 0; this.cometSpawnTimer = 400;
      this.cameraShake = 0;

      if (this.player.group) { this.player.group.position.set(0, 0, 0); this.player.group.rotation.set(0, 0, 0); }
      if (this.player.shipModel) { this.player.shipModel.rotation.set(0, 0, 0); }
      if (this.player.shieldMesh) this.player.shieldMesh.material.opacity = 0;
      if (this.tacticalHudEl) this.tacticalHudEl.innerHTML = '';


      // UI reset
      const hide = id => { const e = document.getElementById(id); if (e) e.style.display = 'none'; };
      hide('cosmic-game-over'); hide('cosmic-pause-overlay'); hide('cosmic-codex-modal');
      hide('cosmic-upgrade-shop'); hide('cosmic-leaderboard');
      const empBtn = document.getElementById('cosmic-emp-btn');
      if (empBtn) { empBtn.style.opacity = '1'; empBtn.textContent = '⚡ [Space] EMP Blast'; }
      this._updateWarpBtn(false);
      document.querySelectorAll('.cosmic-wep-btn').forEach(b => b.classList.toggle('active', b.dataset.wep === 'pulse'));

      this.running = true; this.paused = false;
      this.updateHUD();
      this.lastTime = performance.now();
      this._animate();
    },

    // ── ANIMATE LOOP ────────────────────────────────────────────────────────
    _animate() {
      if (!this.running) return;
      this.animId = requestAnimationFrame(() => this._animate());
      const now = performance.now();
      const dt = Math.min((now - this.lastTime) / 1000, 0.1);
      this.lastTime = now;
      this.update(dt);
      if (this.renderer && this.scene && this.camera) this.renderer.render(this.scene, this.camera);
    },

    onResize() {
      if (!this.container || !this.renderer || !this.camera) return;
      const w = this.container.clientWidth || window.innerWidth;
      const h = this.container.clientHeight || window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    }
  };

  // ── PUBLIC API ─────────────────────────────────────────────────────────────
  window.CosmicOdyssey = {
    open()          { const m=document.getElementById('modal-cosmic-odyssey'); if(!m)return; m.classList.add('show'); setTimeout(()=>{Game.init();Game.start();Game.onResize();},80); },
    close()         { const m=document.getElementById('modal-cosmic-odyssey'); if(m)m.classList.remove('show'); Game.running=false; if(Game.animId){cancelAnimationFrame(Game.animId);Game.animId=null;} },
    restart()       { Game.start(); },
    scan()          { Game.triggerScan(); },
    emp()           { Game.triggerEMP(); },
    warp()          { Game.triggerWarp(); },
    setWeapon(t)    { Game.setWeapon(t); },
    toggleCam()     { Game.toggleCam(); },
    toggleMute()    { AudioEngine.muted=!AudioEngine.muted; const b=document.getElementById('cosmic-mute-btn'); if(b)b.textContent=AudioEngine.muted?'🔇':'🔊'; },
    toggleCodex()   { Game.toggleCodex(); },
    togglePause()   { Game.togglePause(); },
    toggleUpgrades(){ Game.toggleUpgradeShop(); },
    toggleLeaderboard(){ Game.toggleLeaderboard(); },
    upgrade(k)      { Game.upgrade(k); }
  };

})();
