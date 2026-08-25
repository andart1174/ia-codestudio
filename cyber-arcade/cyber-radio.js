/**
 * ══════════════════════════════════════════════════════════════════════
 * 📻 CYBER RADIO 3D — MASTER SYNTHWAVE & RETROWAVE AUDIO ENGINE (V32)
 * ══════════════════════════════════════════════════════════════════════
 * Procedural Web Audio Synthwave Sequencer with 4 Retro Stations,
 * Real-Time Visualizer Equalizer, Beat Sync & Zero Dependencies.
 */

class CyberRadioEngine {
    constructor() {
        this.audioCtx = null;
        this.isPlaying = false;
        this.currentStationIndex = 0;
        this.volume = 0.35;
        this.masterGain = null;
        this.analyser = null;
        this.freqData = null;
        this.stepIndex = 0;
        this.timer = null;
        this.beatPulseValue = 0;

        this.stations = [
            {
                id: 'neon-drift',
                name: 'NEON DRIFT FM 80s',
                genre: 'Retro Synthwave',
                bpm: 120,
                color: '#00f2fe',
                scale: [220, 261.63, 293.66, 329.63, 392, 440, 523.25, 587.33], // A minor
                bassNotes: [55, 55, 65.41, 73.42, 55, 55, 82.41, 73.42],
                leadPattern: [0, 2, 4, 2, 7, 5, 4, 2, 0, 3, 5, 3, 7, 6, 4, 2]
            },
            {
                id: 'cyberpunk-darksynth',
                name: 'CYBERPUNK 2077 DARKSYNTH',
                genre: 'Industrial Electro',
                bpm: 132,
                color: '#ff007f',
                scale: [196, 207.65, 233.08, 261.63, 293.66, 311.13, 349.23], // G Phrygian
                bassNotes: [49, 49, 51.91, 58.27, 49, 49, 65.41, 58.27],
                leadPattern: [0, 1, 3, 1, 4, 3, 1, 0, 5, 4, 3, 1, 6, 5, 4, 3]
            },
            {
                id: 'cosmic-sunset',
                name: 'COSMIC SUNSET LO-FI',
                genre: 'Chillwave & Space',
                bpm: 96,
                color: '#ffb703',
                scale: [261.63, 293.66, 329.63, 392, 440, 523.25, 659.25], // C Major Pentatonic
                bassNotes: [65.41, 65.41, 87.31, 87.31, 98, 98, 73.42, 73.42],
                leadPattern: [0, 2, 4, 6, 4, 2, 1, 3, 5, 4, 2, 0, 4, 5, 6, 4]
            },
            {
                id: 'hyper-nitro',
                name: 'HYPER-SPEED NITRO',
                genre: 'Cyber Drum & Bass',
                bpm: 145,
                color: '#00ffcc',
                scale: [246.94, 277.18, 293.66, 329.63, 369.99, 440, 493.88], // B Minor
                bassNotes: [61.74, 61.74, 73.42, 82.41, 61.74, 61.74, 92.50, 82.41],
                leadPattern: [0, 3, 2, 5, 4, 6, 5, 3, 0, 2, 4, 6, 5, 3, 2, 1]
            }
        ];

        this.initDOM();
    }

    initAudioContext() {
        if (!this.audioCtx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.audioCtx = new AudioCtx();
                this.analyser = this.audioCtx.createAnalyser();
                this.analyser.fftSize = 64;
                this.freqData = new Uint8Array(this.analyser.frequencyBinCount);

                this.masterGain = this.audioCtx.createGain();
                this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
                this.masterGain.connect(this.analyser);
                this.analyser.connect(this.audioCtx.destination);
            }
        }
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }
    }

    initDOM() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupDOMBindings());
        } else {
            this.setupDOMBindings();
        }
    }

    setupDOMBindings() {
        const btnToggleRadio = document.getElementById('btn-toggle-radio');
        const btnCloseRadio = document.getElementById('btn-close-radio-panel');
        const btnPrevStation = document.getElementById('btn-radio-prev');
        const btnNextStation = document.getElementById('btn-radio-next');
        const btnPlayRadio = document.getElementById('btn-radio-play');
        const sliderVolume = document.getElementById('radio-volume-slider');

        if (btnToggleRadio) {
            btnToggleRadio.addEventListener('click', () => this.toggleRadioPopup());
        }

        if (btnCloseRadio) {
            btnCloseRadio.addEventListener('click', () => this.toggleRadioPopup());
        }

        if (btnPlayRadio) {
            btnPlayRadio.addEventListener('click', () => this.togglePlay());
        }

        if (btnPrevStation) {
            btnPrevStation.addEventListener('click', () => this.prevStation());
        }

        if (btnNextStation) {
            btnNextStation.addEventListener('click', () => this.nextStation());
        }

        if (sliderVolume) {
            sliderVolume.addEventListener('input', (e) => {
                this.setVolume(parseFloat(e.target.value));
            });
        }

        this.updateUI();
        this.startVisualizerLoop();
    }

    toggleRadioPopup() {
        const popup = document.getElementById('cyber-radio-widget-panel');
        if (popup) {
            const isHidden = popup.style.display === 'none' || !popup.style.display;
            popup.style.display = isHidden ? 'block' : 'none';
        }
    }

    togglePlay() {
        this.initAudioContext();
        this.isPlaying = !this.isPlaying;

        if (this.isPlaying) {
            this.stepIndex = 0;
            this.scheduleBeat();
        } else {
            if (this.timer) clearTimeout(this.timer);
        }

        this.updateUI();
        if (window.arcadeEngine) {
            window.arcadeEngine.playSFX('laser');
        }
    }

    prevStation() {
        this.currentStationIndex = (this.currentStationIndex - 1 + this.stations.length) % this.stations.length;
        this.stepIndex = 0;
        this.updateUI();
        if (window.arcadeEngine) window.arcadeEngine.playSFX('respawn');
    }

    nextStation() {
        this.currentStationIndex = (this.currentStationIndex + 1) % this.stations.length;
        this.stepIndex = 0;
        this.updateUI();
        if (window.arcadeEngine) window.arcadeEngine.playSFX('respawn');
    }

    setVolume(val) {
        this.volume = Math.max(0, Math.min(1, val));
        if (this.masterGain && this.audioCtx) {
            this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
        }
    }

    scheduleBeat() {
        if (!this.isPlaying || !this.audioCtx) return;

        const station = this.stations[this.currentStationIndex];
        const stepInterval = (60 / station.bpm) / 4; // 16th note in seconds
        const now = this.audioCtx.currentTime;

        // 1. Kick Drum (Steps 0, 4, 8, 12)
        if (this.stepIndex % 4 === 0) {
            this.playKick(now);
            this.beatPulseValue = 1.0;
        }

        // 2. Snare / Clack (Steps 4, 12)
        if (this.stepIndex % 8 === 4) {
            this.playSnare(now);
        }

        // 3. Hi-Hat (Every 2nd step)
        if (this.stepIndex % 2 === 0) {
            this.playHiHat(now, this.stepIndex % 4 === 2);
        }

        // 4. Synthwave Bass Arpeggio
        const bassNote = station.bassNotes[Math.floor(this.stepIndex / 2) % station.bassNotes.length];
        this.playSynthBass(now, bassNote, stepInterval * 1.8);

        // 5. Retro Neon Lead Melody
        const noteIndex = station.leadPattern[this.stepIndex % station.leadPattern.length];
        const freq = station.scale[noteIndex % station.scale.length];
        if (this.stepIndex % 2 === 0 || Math.random() > 0.4) {
            this.playSynthLead(now, freq, stepInterval * 1.5);
        }

        this.stepIndex = (this.stepIndex + 1) % 16;
        this.timer = setTimeout(() => this.scheduleBeat(), stepInterval * 1000);
    }

    playKick(time) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, time);
        osc.frequency.exponentialRampToValueAtTime(32, time + 0.12);

        gain.gain.setValueAtTime(0.7, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.12);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(time);
        osc.stop(time + 0.13);
    }

    playSnare(time) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, time);
        osc.frequency.exponentialRampToValueAtTime(80, time + 0.15);

        gain.gain.setValueAtTime(0.4, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.15);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(time);
        osc.stop(time + 0.16);
    }

    playHiHat(time, isOpen = false) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(7000, time);
        osc.frequency.exponentialRampToValueAtTime(2000, time + (isOpen ? 0.08 : 0.03));

        gain.gain.setValueAtTime(isOpen ? 0.12 : 0.06, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + (isOpen ? 0.08 : 0.03));

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(time);
        osc.stop(time + (isOpen ? 0.09 : 0.04));
    }

    playSynthBass(time, freq, dur) {
        const osc = this.audioCtx.createOscillator();
        const filter = this.audioCtx.createBiquadFilter();
        const gain = this.audioCtx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, time);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, time);
        filter.frequency.exponentialRampToValueAtTime(180, time + dur);

        gain.gain.setValueAtTime(0.32, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + dur);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(time);
        osc.stop(time + dur + 0.02);
    }

    playSynthLead(time, freq, dur) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, time);
        osc.frequency.linearRampToValueAtTime(freq * 1.01, time + dur);

        gain.gain.setValueAtTime(0.18, time);
        gain.gain.exponentialRampToValueAtTime(0.005, time + dur);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(time);
        osc.stop(time + dur + 0.02);
    }

    updateUI() {
        const station = this.stations[this.currentStationIndex];
        const nameEl = document.getElementById('radio-station-name');
        const genreEl = document.getElementById('radio-station-genre');
        const bpmEl = document.getElementById('radio-station-bpm');
        const playBtn = document.getElementById('btn-radio-play');
        const headerRadioBtn = document.getElementById('btn-toggle-radio');
        const headerRadioText = document.getElementById('header-radio-status-text');

        if (nameEl) nameEl.textContent = station.name;
        if (genreEl) genreEl.textContent = station.genre;
        if (bpmEl) bpmEl.textContent = station.bpm + ' BPM';

        if (playBtn) {
            playBtn.innerHTML = this.isPlaying ? '<i class="fa-solid fa-pause"></i> PAUSE' : '<i class="fa-solid fa-play"></i> PLAY';
            playBtn.classList.toggle('playing', this.isPlaying);
        }

        if (headerRadioBtn) {
            headerRadioBtn.classList.toggle('radio-active', this.isPlaying);
        }

        if (headerRadioText) {
            headerRadioText.textContent = this.isPlaying ? station.name : 'CYBER RADIO 📻';
        }
    }

    startVisualizerLoop() {
        const bars = document.querySelectorAll('.eq-bar');
        
        const render = () => {
            if (this.isPlaying && this.analyser && this.freqData) {
                this.analyser.getByteFrequencyData(this.freqData);
                
                bars.forEach((bar, idx) => {
                    const val = this.freqData[idx * 3] || 0;
                    const heightPercent = Math.max(15, (val / 255) * 100);
                    bar.style.height = heightPercent + '%';
                });

                // Beat decay for 3D visual pulse
                this.beatPulseValue *= 0.92;
            } else {
                bars.forEach((bar) => { bar.style.height = '20%'; });
            }
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
    }
}

// Global Radio Engine instance
window.cyberRadio = new CyberRadioEngine();
