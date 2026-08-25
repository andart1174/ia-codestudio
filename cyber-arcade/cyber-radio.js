/**
 * ══════════════════════════════════════════════════════════════════════
 * 📻 CYBER RADIO 3D — MASTER 8-GENRE SYNTHWAVE & MUSIC ENGINE (V34)
 * ══════════════════════════════════════════════════════════════════════
 * 8 Fully Distinct Procedural Musical Genres (Synthwave, Darksynth,
 * Lo-Fi Chill, Drum & Bass, 8-Bit Chiptune, Drift Phonk, Synth-Pop Disco,
 * and Epic Cinematic Battle).
 */

class CyberRadioEngine {
    constructor() {
        this.audioCtx = null;
        this.isPlaying = false;
        this.currentStationIndex = 0;
        this.volume = 0.4;
        this.masterGain = null;
        this.analyser = null;
        this.freqData = null;
        this.stepIndex = 0;
        this.timer = null;
        this.beatPulseValue = 0;

        this.stations = [
            {
                id: 'neon-drift',
                name: '1. NEON DRIFT FM',
                genre: '80s Classic Synthwave',
                icon: '🌌',
                bpm: 120,
                color: '#00f2fe',
                scale: [220, 261.63, 293.66, 329.63, 392, 440, 523.25, 587.33],
                bassNotes: [55, 55, 65.41, 73.42, 55, 55, 82.41, 73.42],
                leadPattern: [0, 2, 4, 2, 7, 5, 4, 2, 0, 3, 5, 3, 7, 6, 4, 2],
                style: 'synthwave'
            },
            {
                id: 'cyberpunk-darksynth',
                name: '2. CYBERPUNK 2077',
                genre: 'Industrial Darksynth & Bass',
                icon: '⚡',
                bpm: 134,
                color: '#ff007f',
                scale: [196, 207.65, 233.08, 261.63, 293.66, 311.13, 349.23],
                bassNotes: [49, 49, 51.91, 58.27, 49, 49, 65.41, 58.27],
                leadPattern: [0, 1, 3, 1, 4, 3, 1, 0, 5, 4, 3, 1, 6, 5, 4, 3],
                style: 'darksynth'
            },
            {
                id: 'cosmic-sunset',
                name: '3. COSMIC RETRO SUNSET',
                genre: 'Lo-Fi Chillwave & Space',
                icon: '🌅',
                bpm: 88,
                color: '#ffb703',
                scale: [261.63, 293.66, 329.63, 392, 440, 523.25, 659.25],
                bassNotes: [65.41, 65.41, 87.31, 87.31, 98, 98, 73.42, 73.42],
                leadPattern: [0, 2, 4, 6, 4, 2, 1, 3, 5, 4, 2, 0, 4, 5, 6, 4],
                style: 'chill'
            },
            {
                id: 'hyper-nitro-dnb',
                name: '4. HYPER NITRO RUSH',
                genre: 'Cyber Drum & Bass',
                icon: '🔥',
                bpm: 165,
                color: '#00ffcc',
                scale: [246.94, 277.18, 293.66, 329.63, 369.99, 440, 493.88],
                bassNotes: [61.74, 61.74, 73.42, 82.41, 61.74, 61.74, 92.50, 82.41],
                leadPattern: [0, 3, 2, 5, 4, 6, 5, 3, 0, 2, 4, 6, 5, 3, 2, 1],
                style: 'dnb'
            },
            {
                id: '8bit-arcade-retro',
                name: '5. 8-BIT ARCADE 1989',
                genre: 'Retro Chiptune GameBoy',
                icon: '🕹️',
                bpm: 130,
                color: '#38ef7d',
                scale: [293.66, 329.63, 369.99, 392, 440, 493.88, 587.33, 659.25],
                bassNotes: [73.42, 73.42, 98, 98, 110, 110, 73.42, 87.31],
                leadPattern: [0, 2, 4, 7, 4, 2, 5, 7, 0, 4, 7, 9, 7, 4, 2, 0],
                style: 'chiptune'
            },
            {
                id: 'drift-phonk-arena',
                name: '6. TITAN DRIFT PHONK',
                genre: 'Memphis Cowbell Trap',
                icon: '🥋',
                bpm: 142,
                color: '#9d4edd',
                scale: [587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.50], // High Cowbell Freqs
                bassNotes: [36.71, 36.71, 43.65, 43.65, 36.71, 36.71, 54.87, 48.87], // Heavy 808s
                leadPattern: [0, 0, 3, 2, 0, 0, 4, 3, 0, 0, 5, 4, 2, 3, 1, 0],
                style: 'phonk'
            },
            {
                id: 'synthpop-disco-80s',
                name: '7. SYNTH-POP DISCO',
                genre: '80s Funk Wave & Dance',
                icon: '🌊',
                bpm: 124,
                color: '#ff758c',
                scale: [329.63, 369.99, 392, 440, 493.88, 554.37, 659.25],
                bassNotes: [82.41, 82.41, 110, 110, 123.47, 123.47, 98, 98],
                leadPattern: [0, 2, 4, 6, 7, 6, 4, 2, 1, 3, 5, 7, 6, 4, 3, 1],
                style: 'disco'
            },
            {
                id: 'epic-cinematic-raid',
                name: '8. DREADNOUGHT CINEMATIC',
                genre: 'Epic Sci-Fi Battle Trailer',
                icon: '🚀',
                bpm: 104,
                color: '#ff3b30',
                scale: [130.81, 146.83, 155.56, 174.61, 196, 207.65, 233.08, 261.63],
                bassNotes: [32.70, 32.70, 38.89, 38.89, 43.65, 43.65, 32.70, 48.99],
                leadPattern: [0, 0, 2, 3, 0, 0, 4, 3, 0, 0, 5, 6, 4, 3, 2, 0],
                style: 'cinematic'
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
        const stationSelect = document.getElementById('radio-station-select');

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

        if (stationSelect) {
            stationSelect.addEventListener('change', (e) => {
                this.selectStation(parseInt(e.target.value, 10));
            });
        }

        if (sliderVolume) {
            sliderVolume.addEventListener('input', (e) => {
                this.setVolume(parseFloat(e.target.value));
            });
        }

        this.renderStationOptions();
        this.updateUI();
        this.startVisualizerLoop();
    }

    renderStationOptions() {
        const stationSelect = document.getElementById('radio-station-select');
        if (stationSelect) {
            stationSelect.innerHTML = this.stations.map((st, idx) => `
                <option value="${idx}">${st.icon} ${st.name} — ${st.genre}</option>
            `).join('');
            stationSelect.value = this.currentStationIndex;
        }
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

    selectStation(idx) {
        if (idx >= 0 && idx < this.stations.length) {
            this.currentStationIndex = idx;
            this.stepIndex = 0;
            this.updateUI();
            if (window.arcadeEngine) window.arcadeEngine.playSFX('respawn');
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

        // 🥁 DRUMS & RHYTHMS ADAPTED TO EXACT GENRE
        if (station.style === 'phonk') {
            // Phonk 808 Kick & Snare
            if (this.stepIndex % 8 === 0 || this.stepIndex === 6) this.play808Kick(now);
            if (this.stepIndex % 8 === 4) this.playTrapSnare(now);
            if (this.stepIndex % 2 === 0 || this.stepIndex % 3 === 0) this.playHiHat(now, false);
            // Phonk Memphis Cowbell
            const bellNote = station.scale[station.leadPattern[this.stepIndex % station.leadPattern.length] % station.scale.length];
            this.playPhonkCowbell(now, bellNote, stepInterval * 0.9);
            // Heavy 808 Glide Bass
            if (this.stepIndex % 4 === 0) {
                const bassFreq = station.bassNotes[Math.floor(this.stepIndex / 4) % station.bassNotes.length];
                this.play808SubBass(now, bassFreq, stepInterval * 3.8);
            }
        } else if (station.style === 'chiptune') {
            // 8-Bit Chiptune Arcade Style
            if (this.stepIndex % 4 === 0) this.playChipKick(now);
            if (this.stepIndex % 8 === 4) this.playChipSnare(now);
            this.playChipArpLead(now, station.scale[station.leadPattern[this.stepIndex % station.leadPattern.length] % station.scale.length], stepInterval * 0.8);
            if (this.stepIndex % 2 === 0) {
                const bFreq = station.bassNotes[Math.floor(this.stepIndex / 2) % station.bassNotes.length];
                this.playChipBass(now, bFreq, stepInterval * 1.5);
            }
        } else if (station.style === 'dnb') {
            // Fast Drum & Bass Breakbeat
            if (this.stepIndex === 0 || this.stepIndex === 10) this.playKick(now);
            if (this.stepIndex === 4 || this.stepIndex === 12) this.playSnare(now);
            this.playHiHat(now, this.stepIndex % 2 === 1);
            const freq = station.scale[station.leadPattern[this.stepIndex % station.leadPattern.length] % station.scale.length];
            this.playDnBLead(now, freq, stepInterval * 1.2);
            if (this.stepIndex % 4 === 0) {
                const bFreq = station.bassNotes[Math.floor(this.stepIndex / 4) % station.bassNotes.length];
                this.playSynthBass(now, bFreq, stepInterval * 3.6);
            }
        } else if (station.style === 'disco') {
            // 80s Disco / Funk Pop
            if (this.stepIndex % 4 === 0) this.playKick(now);
            if (this.stepIndex % 8 === 4) this.playSnare(now);
            if (this.stepIndex % 2 === 1) this.playHiHat(now, true); // Open hats on upbeats
            const freq = station.scale[station.leadPattern[this.stepIndex % station.leadPattern.length] % station.scale.length];
            this.playDiscoStab(now, freq, stepInterval * 1.1);
            const bFreq = station.bassNotes[Math.floor(this.stepIndex / 2) % station.bassNotes.length];
            this.playFunkSlapBass(now, bFreq, stepInterval * 1.4);
        } else if (station.style === 'cinematic') {
            // Epic Dreadnought Battle
            if (this.stepIndex === 0 || this.stepIndex === 8) {
                this.playCinematicDrum(now);
                this.beatPulseValue = 1.0;
            }
            if (this.stepIndex % 4 === 0) {
                const freq = station.scale[station.leadPattern[this.stepIndex % station.leadPattern.length] % station.scale.length];
                this.playBrassHorn(now, freq, stepInterval * 3.5);
                const bFreq = station.bassNotes[Math.floor(this.stepIndex / 4) % station.bassNotes.length];
                this.play808SubBass(now, bFreq, stepInterval * 4);
            }
        } else if (station.style === 'chill') {
            // Lo-Fi Space Chill
            if (this.stepIndex % 8 === 0) this.playSoftKick(now);
            if (this.stepIndex % 8 === 4) this.playRimshot(now);
            if (this.stepIndex % 4 === 2) this.playHiHat(now, false);
            const freq = station.scale[station.leadPattern[this.stepIndex % station.leadPattern.length] % station.scale.length];
            this.playRhodesLead(now, freq, stepInterval * 2.2);
            if (this.stepIndex % 4 === 0) {
                const bFreq = station.bassNotes[Math.floor(this.stepIndex / 4) % station.bassNotes.length];
                this.playSoftBass(now, bFreq, stepInterval * 3.5);
            }
        } else {
            // Classic Synthwave & Darksynth
            if (this.stepIndex % 4 === 0) {
                this.playKick(now);
                this.beatPulseValue = 1.0;
            }
            if (this.stepIndex % 8 === 4) this.playSnare(now);
            if (this.stepIndex % 2 === 0) this.playHiHat(now, this.stepIndex % 4 === 2);
            
            const bassNote = station.bassNotes[Math.floor(this.stepIndex / 2) % station.bassNotes.length];
            this.playSynthBass(now, bassNote, stepInterval * 1.8);

            const noteIndex = station.leadPattern[this.stepIndex % station.leadPattern.length];
            const freq = station.scale[noteIndex % station.scale.length];
            if (this.stepIndex % 2 === 0 || Math.random() > 0.3) {
                this.playSynthLead(now, freq, stepInterval * 1.5);
            }
        }

        this.stepIndex = (this.stepIndex + 1) % 16;
        this.timer = setTimeout(() => this.scheduleBeat(), stepInterval * 1000);
    }

    // 🎹 GENRE-SPECIFIC SYNTHESIS METHODS
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

    play808Kick(time) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(160, time);
        osc.frequency.exponentialRampToValueAtTime(38, time + 0.28);
        gain.gain.setValueAtTime(0.85, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.28);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(time);
        osc.stop(time + 0.29);
    }

    play808SubBass(time, freq, dur) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq * 1.05, time);
        osc.frequency.exponentialRampToValueAtTime(freq, time + 0.08);
        gain.gain.setValueAtTime(0.65, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + dur);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(time);
        osc.stop(time + dur + 0.02);
    }

    playPhonkCowbell(time, freq, dur) {
        const osc1 = this.audioCtx.createOscillator();
        const osc2 = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc1.type = 'square';
        osc2.type = 'triangle';
        osc1.frequency.setValueAtTime(freq, time);
        osc2.frequency.setValueAtTime(freq * 1.5, time);
        gain.gain.setValueAtTime(0.22, time);
        gain.gain.exponentialRampToValueAtTime(0.005, time + dur);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.masterGain);
        osc1.start(time);
        osc2.start(time);
        osc1.stop(time + dur + 0.02);
        osc2.stop(time + dur + 0.02);
    }

    playChipKick(time) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(180, time);
        osc.frequency.exponentialRampToValueAtTime(40, time + 0.08);
        gain.gain.setValueAtTime(0.5, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.08);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(time);
        osc.stop(time + 0.09);
    }

    playChipSnare(time) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, time);
        osc.frequency.exponentialRampToValueAtTime(100, time + 0.09);
        gain.gain.setValueAtTime(0.3, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.09);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(time);
        osc.stop(time + 0.1);
    }

    playChipArpLead(time, freq, dur) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, time);
        gain.gain.setValueAtTime(0.16, time);
        gain.gain.exponentialRampToValueAtTime(0.005, time + dur);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(time);
        osc.stop(time + dur + 0.01);
    }

    playChipBass(time, freq, dur) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, time);
        gain.gain.setValueAtTime(0.35, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + dur);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(time);
        osc.stop(time + dur + 0.01);
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

    playTrapSnare(time) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(350, time);
        osc.frequency.exponentialRampToValueAtTime(140, time + 0.12);
        gain.gain.setValueAtTime(0.45, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.12);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(time);
        osc.stop(time + 0.13);
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

    playSoftKick(time) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(90, time);
        osc.frequency.exponentialRampToValueAtTime(35, time + 0.18);
        gain.gain.setValueAtTime(0.45, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.18);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(time);
        osc.stop(time + 0.19);
    }

    playRimshot(time) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(450, time);
        gain.gain.setValueAtTime(0.2, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.05);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(time);
        osc.stop(time + 0.06);
    }

    playRhodesLead(time, freq, dur) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);
        gain.gain.setValueAtTime(0.25, time);
        gain.gain.exponentialRampToValueAtTime(0.005, time + dur);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(time);
        osc.stop(time + dur + 0.02);
    }

    playSoftBass(time, freq, dur) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);
        gain.gain.setValueAtTime(0.4, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + dur);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(time);
        osc.stop(time + dur + 0.02);
    }

    playSynthBass(time, freq, dur) {
        const osc = this.audioCtx.createOscillator();
        const filter = this.audioCtx.createBiquadFilter();
        const gain = this.audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, time);
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(480, time);
        filter.frequency.exponentialRampToValueAtTime(180, time + dur);
        gain.gain.setValueAtTime(0.35, time);
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
        gain.gain.setValueAtTime(0.2, time);
        gain.gain.exponentialRampToValueAtTime(0.005, time + dur);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(time);
        osc.stop(time + dur + 0.02);
    }

    playDnBLead(time, freq, dur) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, time);
        gain.gain.setValueAtTime(0.18, time);
        gain.gain.exponentialRampToValueAtTime(0.005, time + dur);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(time);
        osc.stop(time + dur + 0.01);
    }

    playDiscoStab(time, freq, dur) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, time);
        gain.gain.setValueAtTime(0.22, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + dur);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(time);
        osc.stop(time + dur + 0.02);
    }

    playFunkSlapBass(time, freq, dur) {
        const osc = this.audioCtx.createOscillator();
        const filter = this.audioCtx.createBiquadFilter();
        const gain = this.audioCtx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, time);
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, time);
        filter.frequency.exponentialRampToValueAtTime(200, time + dur);
        gain.gain.setValueAtTime(0.35, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + dur);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        osc.start(time);
        osc.stop(time + dur + 0.02);
    }

    playCinematicDrum(time) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(110, time);
        osc.frequency.exponentialRampToValueAtTime(24, time + 0.45);
        gain.gain.setValueAtTime(0.9, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.45);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(time);
        osc.stop(time + 0.46);
    }

    playBrassHorn(time, freq, dur) {
        const osc = this.audioCtx.createOscillator();
        const filter = this.audioCtx.createBiquadFilter();
        const gain = this.audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, time);
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, time);
        gain.gain.setValueAtTime(0.28, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + dur);
        osc.connect(filter);
        filter.connect(gain);
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
        const stationSelect = document.getElementById('radio-station-select');

        if (nameEl) nameEl.textContent = `${station.icon} ${station.name}`;
        if (genreEl) genreEl.textContent = station.genre;
        if (bpmEl) bpmEl.textContent = station.bpm + ' BPM';

        if (stationSelect) stationSelect.value = this.currentStationIndex;

        if (playBtn) {
            playBtn.innerHTML = this.isPlaying ? '<i class="fa-solid fa-pause"></i> PAUSE' : '<i class="fa-solid fa-play"></i> PLAY';
            playBtn.classList.toggle('playing', this.isPlaying);
        }

        if (headerRadioBtn) {
            headerRadioBtn.classList.toggle('radio-active', this.isPlaying);
        }

        if (headerRadioText) {
            headerRadioText.textContent = this.isPlaying ? `${station.icon} ${station.name}` : 'CYBER RADIO 📻';
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
