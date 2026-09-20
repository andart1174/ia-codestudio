// ══════════════════════════════════════════════════════════════════════════════
// IA ARCHITECTE STUDIO ULTRA — PROCEDURAL SOUND FX & AUDIO SYNTHESIZER LAB (v1.0)
// UltraAudioLab (modal-audio-lab)
// 100% Client-Side Pure Web Audio API · Zero MP3/WAV Samples · 0 KB Download
// 12 Procedural UI Sounds · Ambient Drone Generator · In-Memory .WAV Exporter · 1-Click Injection
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
      console.log('[UltraAudioLab]', msg);
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
  // PROCEDURAL AUDIO LAB CORE OBJECT
  // ══════════════════════════════════════════════════════════════════════════════
  window.UltraAudioLab = {
    state: {
      activeSound: 'laser',
      pitchMultiplier: 1.0,
      durationMultiplier: 1.0,
      decayTime: 0.3,
      isAmbientPlaying: false
    },

    audioData: {
      ctx: null,
      ambientNodes: null,
      analyser: null,
      canvas: null,
      animId: null
    },

    soundsMeta: {
      laser:        { nameEn: 'Futuristic Sci-Fi Laser',      nameFr: 'Laser Sci-Fi Futuriste',       icon: '🔫', category: 'sfx' },
      blip:         { nameEn: 'Tactile Micro Blip',           nameFr: 'Micro-Blip Tactile',           icon: '🔘', category: 'sfx' },
      click:        { nameEn: 'Mechanical Switch Click',      nameFr: 'Clic Interrupteur Mécanique',  icon: '🖱️', category: 'sfx' },
      chime:        { nameEn: 'Harmonic Success Chime',       nameFr: 'Carillon Harmonique Succès',   icon: '🔔', category: 'sfx' },
      thud:         { nameEn: 'Sub-Bass Error Thud',          nameFr: 'Choc Sub-Basse Erreur',        icon: '💥', category: 'sfx' },
      whoosh:       { nameEn: 'Cyber Air Whoosh Transition',  nameFr: 'Balayage d\'Air Cyber Whoosh', icon: '💨', category: 'sfx' },
      hum:          { nameEn: 'Electromagnetic Reactor Hum',  nameFr: 'Bourdonnement Réacteur Électro', icon: '⚡', category: 'sfx' },
      coin:         { nameEn: '8-Bit Retro Coin Pick',        nameFr: 'Pièce Rétro Arcade 8-Bit',     icon: '🪙', category: 'sfx' },
      powerup:      { nameEn: 'Chromatic Quantum Power-Up',   nameFr: 'Montée en Puissance Quantique', icon: '🚀', category: 'sfx' },
      glass:        { nameEn: 'Crystalline Glass Resonance',  nameFr: 'Résonance Verre Cristallin',   icon: '🥂', category: 'sfx' },
      warp:         { nameEn: 'Relativistic Warp Jump Burst', nameFr: 'Saut d\'Espace Relativiste',   icon: '🌀', category: 'sfx' },
      ping:         { nameEn: 'Ethereal Notification Ping',   nameFr: 'Ping de Notification Éthéré',  icon: '📍', category: 'sfx' }
    },

    open: function() {
      const modal = document.getElementById('modal-audio-lab');
      if (modal) {
        modal.classList.add('show', 'active');
        _sound('click');
        setTimeout(() => {
          this.initAudioContext();
          this.initVisualizer();
          this.updateUi();
        }, 60);
      }
    },

    close: function() {
      const modal = document.getElementById('modal-audio-lab');
      if (modal) {
        modal.classList.remove('show', 'active');
        if (this.state.isAmbientPlaying) this.toggleAmbient();
        if (this.audioData.animId) {
          cancelAnimationFrame(this.audioData.animId);
          this.audioData.animId = null;
        }
      }
    },

    initAudioContext: function() {
      if (!this.audioData.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC) {
          this.audioData.ctx = new AC();
          this.audioData.analyser = this.audioData.ctx.createAnalyser();
          this.audioData.analyser.fftSize = 128;
          this.audioData.analyser.connect(this.audioData.ctx.destination);
        }
      }
      if (this.audioData.ctx && this.audioData.ctx.state === 'suspended') {
        this.audioData.ctx.resume();
      }
    },

    initVisualizer: function() {
      const cv = document.getElementById('audio-visualizer-canvas');
      if (!cv) return;
      this.audioData.canvas = cv;
      const ctx2d = cv.getContext('2d');

      const render = () => {
        this.audioData.animId = requestAnimationFrame(render);
        const w = cv.clientWidth || 400;
        const h = cv.clientHeight || 180;
        if (cv.width !== w || cv.height !== h) {
          cv.width = w;
          cv.height = h;
        }

        ctx2d.fillStyle = '#050814';
        ctx2d.fillRect(0, 0, w, h);

        let dataArray = null;
        let bufferLength = 0;
        let totalEnergy = 0;

        if (this.audioData.analyser) {
          bufferLength = this.audioData.analyser.frequencyBinCount;
          dataArray = new Uint8Array(bufferLength);
          this.audioData.analyser.getByteFrequencyData(dataArray);
          for (let i = 0; i < bufferLength; i++) totalEnergy += dataArray[i];
        }

        // Draw frequency bars if audio is playing
        if (dataArray && totalEnergy > 10) {
          const barWidth = (w / bufferLength) * 1.8;
          let x = 0;
          for (let i = 0; i < bufferLength; i++) {
            const barHeight = (dataArray[i] / 255) * h * 0.85;
            if (barHeight > 2) {
              const grad = ctx2d.createLinearGradient(0, h, 0, h - barHeight);
              grad.addColorStop(0, '#38bdf8');
              grad.addColorStop(0.6, '#a855f7');
              grad.addColorStop(1, '#ec4899');
              ctx2d.fillStyle = grad;
              ctx2d.fillRect(x, h - barHeight, Math.max(1, barWidth - 1), barHeight);
            }
            x += barWidth;
          }
        }

        // Draw active or idle oscilloscope waveform (never pitch black!)
        const waveTime = performance.now() * 0.003;
        const hasSignal = totalEnergy > 50;
        ctx2d.lineWidth = hasSignal ? 2.5 : 1.8;
        ctx2d.strokeStyle = hasSignal ? '#ec4899' : 'rgba(56,189,248,0.7)';
        ctx2d.shadowColor = hasSignal ? '#ec4899' : '#38bdf8';
        ctx2d.shadowBlur = hasSignal ? 12 : 6;
        ctx2d.beginPath();
        for (let ix = 0; ix < w; ix += 3) {
          const normX = ix / w;
          const amp = hasSignal ? 28 : 10;
          const idleWave = Math.sin(normX * 9 + waveTime) * Math.cos(normX * 4 - waveTime * 0.6) * amp;
          const y = h / 2 + idleWave;
          if (ix === 0) ctx2d.moveTo(ix, y); else ctx2d.lineTo(ix, y);
        }
        ctx2d.stroke();
        ctx2d.shadowBlur = 0;
      };
      render();
    },

    // ══════════════════════════════════════════════════════════════════════════════
    // SYNTHESIZER ENGINE (Pure Web Audio Mathematical Recipes)
    // ══════════════════════════════════════════════════════════════════════════════
    playSound: function(soundKey) {
      this.initAudioContext();
      const ctx = this.audioData.ctx;
      const dest = this.audioData.analyser || ctx.destination;
      if (!ctx) return;

      const k = soundKey || this.state.activeSound;
      const pMod = this.state.pitchMultiplier;
      const dMod = this.state.durationMultiplier;
      const now = ctx.currentTime;

      if (k === 'laser') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880 * pMod, now);
        osc.frequency.exponentialRampToValueAtTime(60 * pMod, now + 0.22 * dMod);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.22 * dMod);
        osc.connect(gain); gain.connect(dest);
        osc.start(now); osc.stop(now + 0.24 * dMod);
      } else if (k === 'blip') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(650 * pMod, now);
        osc.frequency.exponentialRampToValueAtTime(1100 * pMod, now + 0.06 * dMod);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.07 * dMod);
        osc.connect(gain); gain.connect(dest);
        osc.start(now); osc.stop(now + 0.08 * dMod);
      } else if (k === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1200 * pMod, now);
        osc.frequency.exponentialRampToValueAtTime(200 * pMod, now + 0.03 * dMod);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.04 * dMod);
        osc.connect(gain); gain.connect(dest);
        osc.start(now); osc.stop(now + 0.05 * dMod);
      } else if (k === 'chime') {
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq * pMod, now + i * 0.05);
          gain.gain.setValueAtTime(0.001, now + i * 0.05);
          gain.gain.linearRampToValueAtTime(0.18, now + i * 0.05 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.6 * dMod);
          osc.connect(gain); gain.connect(dest);
          osc.start(now + i * 0.05); osc.stop(now + i * 0.05 + 0.65 * dMod);
        });
      } else if (k === 'thud') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(160 * pMod, now);
        osc.frequency.exponentialRampToValueAtTime(30 * pMod, now + 0.35 * dMod);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35 * dMod);
        osc.connect(gain); gain.connect(dest);
        osc.start(now); osc.stop(now + 0.38 * dMod);
      } else if (k === 'whoosh') {
        // Filtered noise
        const bufferSize = ctx.sampleRate * 0.35 * dMod;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) output[i] = Math.random() * 2 - 1;

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(200 * pMod, now);
        filter.frequency.exponentialRampToValueAtTime(2400 * pMod, now + 0.15 * dMod);
        filter.frequency.exponentialRampToValueAtTime(200 * pMod, now + 0.35 * dMod);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.3, now + 0.15 * dMod);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.35 * dMod);

        whiteNoise.connect(filter); filter.connect(gain); gain.connect(dest);
        whiteNoise.start(now);
      } else if (k === 'coin') {
        const osc1 = ctx.createOscillator(), osc2 = ctx.createOscillator();
        const gain1 = ctx.createGain(), gain2 = ctx.createGain();
        osc1.type = 'square'; osc2.type = 'square';
        osc1.frequency.setValueAtTime(987.77 * pMod, now); // B5
        osc2.frequency.setValueAtTime(1318.51 * pMod, now + 0.08 * dMod); // E6
        gain1.gain.setValueAtTime(0.12, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.08 * dMod);
        gain2.gain.setValueAtTime(0.14, now + 0.08 * dMod);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45 * dMod);
        osc1.connect(gain1); gain1.connect(dest);
        osc2.connect(gain2); gain2.connect(dest);
        osc1.start(now); osc1.stop(now + 0.09 * dMod);
        osc2.start(now + 0.08 * dMod); osc2.stop(now + 0.48 * dMod);
      } else if (k === 'powerup') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220 * pMod, now);
        osc.frequency.exponentialRampToValueAtTime(1760 * pMod, now + 0.45 * dMod);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.45 * dMod);
        osc.connect(gain); gain.connect(dest);
        osc.start(now); osc.stop(now + 0.48 * dMod);
      } else if (k === 'glass') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(2349.32 * pMod, now); // D7
        gain.gain.setValueAtTime(0.28, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85 * dMod);
        osc.connect(gain); gain.connect(dest);
        osc.start(now); osc.stop(now + 0.9 * dMod);
      } else if (k === 'warp') {
        const osc = ctx.createOscillator();
        const mod = ctx.createOscillator();
        const modGain = ctx.createGain();
        const gain = ctx.createGain();

        osc.type = 'sine';
        mod.type = 'sawtooth';
        mod.frequency.value = 35 * pMod;
        modGain.gain.value = 400;

        osc.frequency.setValueAtTime(300 * pMod, now);
        osc.frequency.linearRampToValueAtTime(1200 * pMod, now + 0.4 * dMod);

        mod.connect(modGain);
        modGain.connect(osc.frequency);

        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45 * dMod);

        osc.connect(gain); gain.connect(dest);
        osc.start(now); mod.start(now);
        osc.stop(now + 0.48 * dMod); mod.stop(now + 0.48 * dMod);
      } else {
        // Ping
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1760 * pMod, now);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5 * dMod);
        osc.connect(gain); gain.connect(dest);
        osc.start(now); osc.stop(now + 0.52 * dMod);
      }
    },

    toggleAmbient: function() {
      this.initAudioContext();
      const ctx = this.audioData.ctx;
      const dest = this.audioData.analyser || ctx.destination;
      if (!ctx) return;

      this.state.isAmbientPlaying = !this.state.isAmbientPlaying;
      const isFr = _isFr();

      if (this.state.isAmbientPlaying) {
        const now = ctx.currentTime;
        const master = ctx.createGain();
        master.gain.setValueAtTime(0.001, now);
        master.gain.exponentialRampToValueAtTime(0.12, now + 1.0);

        // Binaural Drone Chords
        const freqs = [108, 162, 216, 324];
        const oscs = freqs.map((f, i) => {
          const osc = ctx.createOscillator();
          const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
          osc.type = i % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(f, now);
          if (panner) {
            panner.pan.value = (i % 2 === 0) ? -0.5 : 0.5;
            osc.connect(panner); panner.connect(master);
          } else {
            osc.connect(master);
          }
          osc.start(now);
          return osc;
        });

        master.connect(dest);
        this.audioData.ambientNodes = { master, oscs };
        _toast(isFr ? '🎵 Musique d\'ambiance cosmique activée !' : '🎵 Ambient cosmic soundscape playing!', 'success');
      } else {
        if (this.audioData.ambientNodes) {
          const now = ctx.currentTime;
          this.audioData.ambientNodes.master.gain.linearRampToValueAtTime(0.001, now + 0.8);
          setTimeout(() => {
            try {
              this.audioData.ambientNodes.oscs.forEach(o => o.stop());
              this.audioData.ambientNodes = null;
            } catch(e){}
          }, 850);
        }
        _toast(isFr ? '🔇 Musique d\'ambiance désactivée.' : '🔇 Ambient soundscape stopped.', 'info');
      }
      this.updateUi();
    },

    selectSound: function(k) {
      this.state.activeSound = k;
      this.playSound(k);
      this.updateUi();
    },

    setPitch: function(val) {
      this.state.pitchMultiplier = parseFloat(val);
      const lbl = document.getElementById('audio-val-pitch');
      if (lbl) lbl.textContent = parseFloat(val).toFixed(2) + 'x';
    },

    setDuration: function(val) {
      this.state.durationMultiplier = parseFloat(val);
      const lbl = document.getElementById('audio-val-dur');
      if (lbl) lbl.textContent = parseFloat(val).toFixed(2) + 'x';
    },

    updateUi: function() {
      const isFr = _isFr();
      const meta = this.soundsMeta[this.state.activeSound];

      document.querySelectorAll('.audio-preset-btn').forEach(btn => {
        const k = btn.getAttribute('data-sound');
        if (k === this.state.activeSound) {
          btn.style.background = 'linear-gradient(135deg, rgba(56,189,248,0.25), rgba(168,85,247,0.25))';
          btn.style.borderColor = '#38bdf8';
          btn.style.color = '#fff';
        } else {
          btn.style.background = 'rgba(255,255,255,0.04)';
          btn.style.borderColor = 'rgba(255,255,255,0.08)';
          btn.style.color = '#94a3b8';
        }
      });

      const titleEl = document.getElementById('audio-name-display');
      if (titleEl && meta) titleEl.textContent = (meta.icon || '🎛️') + ' ' + (isFr ? meta.nameFr : meta.nameEn);

      const ambBtn = document.getElementById('audio-btn-ambient');
      if (ambBtn) {
        ambBtn.style.borderColor = this.state.isAmbientPlaying ? '#10b981' : 'rgba(16,185,129,0.3)';
        ambBtn.style.color = this.state.isAmbientPlaying ? '#34d399' : '#94a3b8';
        ambBtn.style.background = this.state.isAmbientPlaying ? 'rgba(16,185,129,0.15)' : 'transparent';
      }
    },

    // ══════════════════════════════════════════════════════════════════════════════
    // PROCEDURAL WAV FILE GENERATOR (16-Bit PCM Binary Exporter)
    // ══════════════════════════════════════════════════════════════════════════════
    exportWAV: function() {
      const isFr = _isFr();
      const sampleRate = 44100;
      const numChannels = 1;
      const duration = 0.5 * this.state.durationMultiplier;
      const numSamples = Math.floor(sampleRate * duration);
      const pMod = this.state.pitchMultiplier;
      const soundKey = this.state.activeSound;

      const samples = new Float32Array(numSamples);

      for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        let s = 0;
        if (soundKey === 'laser') {
          const freq = 880 * pMod * Math.exp(-t * 12);
          s = Math.sin(2 * Math.PI * freq * t) * (1 - t / duration);
        } else if (soundKey === 'coin') {
          const freq = (t < 0.08) ? 987.77 * pMod : 1318.51 * pMod;
          s = Math.sin(2 * Math.PI * freq * t) * (1 - t / duration);
        } else {
          const freq = 650 * pMod;
          s = Math.sin(2 * Math.PI * freq * t) * Math.exp(-t * 8);
        }
        samples[i] = Math.max(-1, Math.min(1, s));
      }

      // Build 44-byte WAV Header + PCM Data
      const byteRate = sampleRate * numChannels * 2;
      const blockAlign = numChannels * 2;
      const dataSize = numSamples * 2;
      const buffer = new ArrayBuffer(44 + dataSize);
      const view = new DataView(buffer);

      function writeString(view, offset, str) {
        for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
      }

      writeString(view, 0, 'RIFF');
      view.setUint32(4, 36 + dataSize, true);
      writeString(view, 8, 'WAVE');
      writeString(view, 12, 'fmt ');
      view.setUint32(16, 16, true);
      view.setUint16(20, 1, true); // PCM
      view.setUint16(22, numChannels, true);
      view.setUint32(24, sampleRate, true);
      view.setUint32(28, byteRate, true);
      view.setUint16(32, blockAlign, true);
      view.setUint16(34, 16, true); // bits per sample
      writeString(view, 36, 'data');
      view.setUint32(40, dataSize, true);

      let offset = 44;
      for (let i = 0; i < numSamples; i++) {
        const s = Math.max(-1, Math.min(1, samples[i]));
        view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        offset += 2;
      }

      const blob = new Blob([buffer], { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ultra_sound_${soundKey}.wav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      _sound('celebrate');
      _toast(isFr ? `💾 Fichier .WAV haute fidélité exporté (${soundKey}) !` : `💾 High-fidelity .WAV exported successfully (${soundKey})!`, 'success');
    },

    // ══════════════════════════════════════════════════════════════════════════════
    // CODE GENERATION & INJECTION
    // ══════════════════════════════════════════════════════════════════════════════
    getStandaloneSnippet: function() {
      const k = this.state.activeSound;
      const pMod = this.state.pitchMultiplier;
      return `<!-- Ultra Procedural UI Sound Generator (${k}) -->
<script>
function playUltraSound_${k}() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  const ctx = new AC();
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(880 * ${pMod}, now);
  osc.frequency.exponentialRampToValueAtTime(60 * ${pMod}, now + 0.22);
  gain.gain.setValueAtTime(0.25, now);
  gain.gain.linearRampToValueAtTime(0.001, now + 0.22);
  osc.connect(gain); gain.connect(ctx.destination);
  osc.start(now); osc.stop(now + 0.24);
}
</script>`;
    },

    inject: function(type) {
      if (type === 'pack') {
        const activePreset = this.state.activeSound || 'laser';
        const pMod = this.state.pitchMultiplier;
        const dMod = this.state.durationMultiplier;

        const snippet = `<!-- Ultra Procedural UI Sound Pack & Floating Audio Controller HUD -->
<div id="ultra-sound-hud" style="position:fixed;bottom:16px;right:16px;z-index:999999;background:rgba(15,23,42,0.94);backdrop-filter:blur(10px);border:1px solid rgba(56,189,248,0.35);box-shadow:0 8px 30px rgba(0,0,0,0.65);border-radius:10px;padding:8px 12px;display:flex;align-items:center;gap:8px;font-family:system-ui,sans-serif;font-size:0.75rem;color:#e2e8f0;user-select:none">
  <span style="font-weight:700;color:#38bdf8;display:flex;align-items:center;gap:4px">
    <span>🔊</span> UI Sound:
  </span>
  <select id="ultra-sound-preset-select" style="background:#090e1c;border:1px solid rgba(56,189,248,0.5);color:#38bdf8;font-size:0.72rem;font-weight:700;padding:3px 6px;border-radius:4px;cursor:pointer;outline:none">
    <option value="laser"${activePreset === 'laser' ? ' selected' : ''}>🔫 Laser</option>
    <option value="coin"${activePreset === 'coin' ? ' selected' : ''}>🪙 8-Bit Coin</option>
    <option value="powerup"${activePreset === 'powerup' ? ' selected' : ''}>🚀 Power-Up</option>
    <option value="chime"${activePreset === 'chime' ? ' selected' : ''}>🔔 Chime</option>
    <option value="thud"${activePreset === 'thud' ? ' selected' : ''}>💥 Bass Thud</option>
    <option value="whoosh"${activePreset === 'whoosh' ? ' selected' : ''}>💨 Whoosh</option>
    <option value="glass"${activePreset === 'glass' ? ' selected' : ''}>🥂 Glass Ring</option>
    <option value="warp"${activePreset === 'warp' ? ' selected' : ''}>🌀 Warp Burst</option>
    <option value="ping"${activePreset === 'ping' ? ' selected' : ''}>📍 Ethereal Ping</option>
    <option value="hum"${activePreset === 'hum' ? ' selected' : ''}>⚡ Reactor Hum</option>
    <option value="blip"${activePreset === 'blip' ? ' selected' : ''}>🔘 Tactile Blip</option>
    <option value="click"${activePreset === 'click' ? ' selected' : ''}>🖱️ Click</option>
  </select>
  <button id="ultra-sound-test-btn" style="background:linear-gradient(135deg,rgba(56,189,248,0.25),rgba(168,85,247,0.25));border:1px solid #38bdf8;color:#38bdf8;font-size:0.7rem;font-weight:800;padding:4px 9px;border-radius:4px;cursor:pointer">Test Sound</button>
  <button id="ultra-sound-mute-btn" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#94a3b8;font-size:0.7rem;padding:4px 8px;border-radius:4px;cursor:pointer">Mute</button>
</div>
<script>
(function() {
  const AC = window.AudioContext || window.webkitAudioContext;
  let ctx = null;
  let muted = false;
  let currentSound = "${activePreset}";
  const pMod = ${pMod};
  const dMod = ${dMod};

  function getCtx() {
    if (!ctx && AC) ctx = new AC();
    if (ctx && ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function synthesizeSound(soundKey) {
    if (muted) return;
    const c = getCtx();
    if (!c) return;
    const now = c.currentTime;
    const k = soundKey || currentSound;

    if (k === 'laser') {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880 * pMod, now);
      osc.frequency.exponentialRampToValueAtTime(60 * pMod, now + 0.22 * dMod);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.22 * dMod);
      osc.connect(gain); gain.connect(c.destination);
      osc.start(now); osc.stop(now + 0.24 * dMod);
    } else if (k === 'coin') {
      const o1 = c.createOscillator(), o2 = c.createOscillator();
      const g1 = c.createGain(), g2 = c.createGain();
      o1.type = 'square'; o2.type = 'square';
      o1.frequency.setValueAtTime(987.77 * pMod, now);
      o2.frequency.setValueAtTime(1318.51 * pMod, now + 0.08 * dMod);
      g1.gain.setValueAtTime(0.16, now);
      g1.gain.exponentialRampToValueAtTime(0.001, now + 0.08 * dMod);
      g2.gain.setValueAtTime(0.18, now + 0.08 * dMod);
      g2.gain.exponentialRampToValueAtTime(0.001, now + 0.42 * dMod);
      o1.connect(g1); g1.connect(c.destination);
      o2.connect(g2); g2.connect(c.destination);
      o1.start(now); o1.stop(now + 0.09 * dMod);
      o2.start(now + 0.08 * dMod); o2.stop(now + 0.45 * dMod);
    } else if (k === 'powerup') {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220 * pMod, now);
      osc.frequency.exponentialRampToValueAtTime(1760 * pMod, now + 0.45 * dMod);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.45 * dMod);
      osc.connect(gain); gain.connect(c.destination);
      osc.start(now); osc.stop(now + 0.48 * dMod);
    } else if (k === 'chime') {
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq * pMod, now + i * 0.06);
        gain.gain.setValueAtTime(0.001, now + i * 0.06);
        gain.gain.linearRampToValueAtTime(0.2, now + i * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.5 * dMod);
        osc.connect(gain); gain.connect(c.destination);
        osc.start(now + i * 0.06); osc.stop(now + i * 0.06 + 0.55 * dMod);
      });
    } else if (k === 'thud') {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(160 * pMod, now);
      osc.frequency.exponentialRampToValueAtTime(30 * pMod, now + 0.35 * dMod);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35 * dMod);
      osc.connect(gain); gain.connect(c.destination);
      osc.start(now); osc.stop(now + 0.38 * dMod);
    } else if (k === 'glass') {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2349.32 * pMod, now);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.75 * dMod);
      osc.connect(gain); gain.connect(c.destination);
      osc.start(now); osc.stop(now + 0.8 * dMod);
    } else if (k === 'whoosh') {
      const bSize = Math.floor(c.sampleRate * 0.3 * dMod);
      const b = c.createBuffer(1, bSize, c.sampleRate);
      const d = b.getChannelData(0);
      for (let i = 0; i < bSize; i++) d[i] = Math.random() * 2 - 1;
      const src = c.createBufferSource();
      src.buffer = b;
      const f = c.createBiquadFilter();
      f.type = 'bandpass';
      f.frequency.setValueAtTime(300 * pMod, now);
      f.frequency.exponentialRampToValueAtTime(2400 * pMod, now + 0.15 * dMod);
      f.frequency.exponentialRampToValueAtTime(200 * pMod, now + 0.3 * dMod);
      const g = c.createGain();
      g.gain.setValueAtTime(0.01, now);
      g.gain.linearRampToValueAtTime(0.32, now + 0.15 * dMod);
      g.gain.linearRampToValueAtTime(0.001, now + 0.3 * dMod);
      src.connect(f); f.connect(g); g.connect(c.destination);
      src.start(now);
    } else if (k === 'warp') {
      const osc = c.createOscillator();
      const mod = c.createOscillator();
      const mg = c.createGain();
      const g = c.createGain();
      osc.type = 'sine'; mod.type = 'sawtooth';
      mod.frequency.value = 35 * pMod; mg.gain.value = 400;
      osc.frequency.setValueAtTime(300 * pMod, now);
      osc.frequency.linearRampToValueAtTime(1400 * pMod, now + 0.35 * dMod);
      g.gain.setValueAtTime(0.28, now);
      g.gain.linearRampToValueAtTime(0.001, now + 0.35 * dMod);
      mod.connect(mg); mg.connect(osc.frequency);
      osc.connect(g); g.connect(c.destination);
      mod.start(now); osc.start(now);
      mod.stop(now + 0.38 * dMod); osc.stop(now + 0.38 * dMod);
    } else if (k === 'ping') {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1760 * pMod, now);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6 * dMod);
      osc.connect(gain); gain.connect(c.destination);
      osc.start(now); osc.stop(now + 0.65 * dMod);
    } else if (k === 'blip') {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(650 * pMod, now);
      osc.frequency.exponentialRampToValueAtTime(1200 * pMod, now + 0.07 * dMod);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.08 * dMod);
      osc.connect(gain); gain.connect(c.destination);
      osc.start(now); osc.stop(now + 0.09 * dMod);
    } else {
      // click / default
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200 * pMod, now);
      osc.frequency.exponentialRampToValueAtTime(200 * pMod, now + 0.04 * dMod);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.05 * dMod);
      osc.connect(gain); gain.connect(c.destination);
      osc.start(now); osc.stop(now + 0.06 * dMod);
    }
  }

  // Global helper accessible everywhere
  window.playUltraSound = function(name) {
    synthesizeSound(name || currentSound);
  };

  // Wire UI Sound HUD Controls
  const sel = document.getElementById('ultra-sound-preset-select');
  if (sel) {
    sel.addEventListener('change', function() {
      currentSound = this.value;
      synthesizeSound(currentSound);
    });
  }

  const testBtn = document.getElementById('ultra-sound-test-btn');
  if (testBtn) {
    testBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      synthesizeSound(currentSound);
    });
  }

  const muteBtn = document.getElementById('ultra-sound-mute-btn');
  if (muteBtn) {
    muteBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      muted = !muted;
      muteBtn.textContent = muted ? 'Unmute' : 'Mute';
      muteBtn.style.color = muted ? '#ef4444' : '#94a3b8';
    });
  }

  // Intercept clicks globally on buttons, links, tabs, and cards
  document.addEventListener('click', function(e) {
    if (e.target.closest('#ultra-sound-hud')) return;
    getCtx();
    const isInteractive = e.target.closest('button, .btn, a, [role="button"], input[type="submit"], input[type="button"], .card, [class*="nav"], [class*="tab"]');
    if (isInteractive) {
      synthesizeSound(currentSound);
    }
  }, true);

  document.addEventListener('touchstart', function() { getCtx(); }, { capture: true, passive: true });
})();
<\/script>`;
        _injectCodeToActiveApp(snippet, /<!-- Ultra Procedural UI Sound Pack[\s\S]*?<\/script>/g, 'UI Sound FX Pack');
      } else {
        const snippet = this.getStandaloneSnippet();
        _injectCodeToActiveApp(snippet, /<!-- Ultra Procedural UI Sound Generator[\s\S]*?<\/script>/g, 'Procedural Sound Function');
      }
    },

    copySnippet: function() {
      const code = this.getStandaloneSnippet();
      _copyCode(code, 'Audio JS Function');
    }
  };

  console.log('🎛️ Ultra Procedural Sound FX & Audio Synthesizer Lab v1.0 initialized.');
})();
