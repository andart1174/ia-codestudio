/**
 * 🎹 CYBER BEAT MAKER & FULL SYNTHWAVE STUDIO ENGINE V3
 * 4-Pattern Song Arranger + DJ Lowpass Filter Sweep + Complete Full Song WAV Exporter.
 */
class BeatMakerEngine {
    constructor() {
        this.audioCtx = null;
        this.isPlaying = false;
        this.bpm = 120;
        this.currentStep = 0;
        this.currentPatternIndex = 0; // 0: Pattern 1, 1: Pattern 2, 2: Pattern 3, 3: Pattern 4
        this.timer = null;
        this.filterCutoff = 2000;
        
        // 4 Separate Patterns for Full Song Composition
        this.patterns = [
            this.createDefaultTracks('intro'),
            this.createDefaultTracks('verse'),
            this.createDefaultTracks('drop'),
            this.createDefaultTracks('outro')
        ];

        this.notes = [
            { note: 'C4', freq: 261.63, key: 'A' },
            { note: 'D4', freq: 293.66, key: 'S' },
            { note: 'E4', freq: 329.63, key: 'D' },
            { note: 'F4', freq: 349.23, key: 'F' },
            { note: 'G4', freq: 392.00, key: 'G' },
            { note: 'A4', freq: 440.00, key: 'H' },
            { note: 'B4', freq: 493.88, key: 'J' },
            { note: 'C5', freq: 523.25, key: 'K' }
        ];

        // 🌟 New Supercharged State
        this.masterBus = null;
        this.analyser = null;
        this.visualizerCanvas = null;
        this.visualizerCtx = null;
        this.isVisualizing = false;
        this.isTapeStopping = false;
        this.isBeatRolling = false;
        this.activeChordPreset = 'none';
        this.playMode = 'song'; // 'song' (Full 4-Part Arrangement) or 'pattern' (Single Loop)
        this.patternLoopCount = 0;
        this.loopsPerSection = 2; // 2 loops of 16 steps = 32 steps per section (~16s per section = 64s full song)

        // 🌟 5 Ultimate Features State
        this.pianoMode = 'single'; // 'single', 'chord', 'arp'
        // 🎧 FEATURE 5: 8D Spatial Binaural Audio State
        this.is8DEnabled = false;
        this.spatial8DAngle = 0;
        this.panner8D = null;

        // 🎛️ FEATURE 6: Holographic DJ Deck & Live Stems FX State
        this.stemMutes = { drums: false, bass: false, synths: false, vocals: false };
        this.isReversed = false;
        this.isDubDelayActive = false;
        this.dubDelayNode = null;
        this.dubDelayInput = null;

        // 🎤 FEATURE 4: Melodic Robot Vocoder State
        this.vocoderMelodyScale = 'aminor';
        this.stepCount = 0;
        this.vinylAngle = 0;
        this.isScratching = false;
        this.lastScratchAngle = 0;
        this.scratchCanvas = null;
        this.scratchCtx = null;
        this.kaossCanvas = null;
        this.kaossCtx = null;
        this.kaossTouch = { active: false, x: 0.5, y: 0.5 };
        this.injectedVocal = { text: '', style: 'daft', triggerMode: 'drop', enabled: false };
        this.masteringProfile = 'radio';
        this.masteringNodes = null;
        this.tapHistory = [];

        // 📁 AI Audio Lab & Innovations State
        this.uploadedAudioBuffer = null;
        this.uploadedAudioStats = null;
        this.sampleSlices = [];
        this.is3DViz = false;
        this.dnaMorphValue = 50;
        this.isRecordingBeatbox = false;
        this.originalAudioSource = null;
        this.isPlayingOriginalAudio = false;
        this.originalAudioStartTime = 0;
        this.originalAudioPauseOffset = 0;

        // 🏛️ Cyber Music Vault State
        this.vaultPreviewTimeouts = [];
        this.activePreviewTrackId = null;
        this.vaultPreviewGain = null;
        this.builtInVault = this.createBuiltInVault();

        this.init();
    }

    createDefaultTracks(style) {
        return [
            { id: 'kick', nameKey: 'inst_kick', icon: '🥁', type: 'drum', volume: 1.0, isMuted: false, isSolo: false, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
            { id: 'snare', nameKey: 'inst_snare', icon: '💥', type: 'drum', volume: 1.0, isMuted: false, isSolo: false, steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0] },
            { id: 'hihat_c', nameKey: 'inst_hihat_c', icon: '🪙', type: 'drum', volume: 1.0, isMuted: false, isSolo: false, steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
            { id: 'hihat_o', nameKey: 'inst_hihat_o', icon: '✨', type: 'drum', volume: 1.0, isMuted: false, isSolo: false, steps: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0] },
            { id: 'cowbell', nameKey: 'inst_cowbell', icon: '🔔', type: 'drum', volume: 1.0, isMuted: false, isSolo: false, steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
            { id: 'clap', nameKey: 'inst_clap', icon: '👏', type: 'drum', volume: 1.0, isMuted: false, isSolo: false, steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0] },
            { id: 'bass', nameKey: 'inst_bass', icon: '🎸', type: 'melody', volume: 1.0, isMuted: false, isSolo: false, freq: 55, steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
            { id: 'lead_high', nameKey: 'inst_lead_high', icon: '⚡', type: 'melody', volume: 1.0, isMuted: false, isSolo: false, freq: 523.25, steps: [0,0,1,0, 0,0,0,1, 0,0,1,0, 0,1,0,0] },
            { id: 'lead_mid', nameKey: 'inst_lead_mid', icon: '🎹', type: 'melody', volume: 1.0, isMuted: false, isSolo: false, freq: 392.00, steps: [1,0,0,1, 0,1,0,0, 1,0,0,1, 0,0,1,0] },
            { id: 'lead_low', nameKey: 'inst_lead_low', icon: '🎵', type: 'melody', volume: 1.0, isMuted: false, isSolo: false, freq: 261.63, steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0] },
            { id: 'sfx_laser', nameKey: 'inst_sfx_laser', icon: '🔫', type: 'sfx', volume: 1.0, isMuted: false, isSolo: false, steps: [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
            { id: 'sfx_impact', nameKey: 'inst_sfx_impact', icon: '🌌', type: 'sfx', volume: 1.0, isMuted: false, isSolo: false, steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
        ];
    }

    get activeTracks() {
        return this.patterns[this.currentPatternIndex];
    }

    init() {
        this.renderGrid();
        this.renderPianoKeys();
        this.setupDOMBindings();
        this.initMusicVault();
    }

    initAudioContext() {
        if (!this.audioCtx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.audioCtx = new AudioCtx();
                try {
                    this.masterBus = this.audioCtx.createGain();
                    this.masterBus.gain.value = 1.0;
                    this.analyser = this.audioCtx.createAnalyser();
                    this.analyser.fftSize = 64;
                    this.analyser.smoothingTimeConstant = 0.8;
                    this.initMasteringRack();
                    if (this.masteringNodes) {
                        this.masterBus.connect(this.masteringNodes.input);
                        this.masteringNodes.output.connect(this.analyser);
                    } else {
                        this.masterBus.connect(this.analyser);
                    }
                    if (!this.panner8D && typeof this.audioCtx.createStereoPanner === 'function') {
                        this.panner8D = this.audioCtx.createStereoPanner();
                    }
                    if (this.panner8D) {
                        this.analyser.connect(this.panner8D);
                        this.panner8D.connect(this.audioCtx.destination);
                    } else {
                        this.analyser.connect(this.audioCtx.destination);
                    }
                    this.initVisualizer();
                } catch (e) {
                    console.warn('Audio analyser init error:', e);
                }
            }
        }
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }
    }

    getMasterOutput() {
        return this.masterBus || (this.audioCtx ? this.audioCtx.destination : null);
    }

    setupDOMBindings() {
        const btnPlay = document.getElementById('btn-beat-play');
        const btnClear = document.getElementById('btn-beat-clear');
        const btnAIGen = document.getElementById('btn-beat-ai-gen');
        const btnExport = document.getElementById('btn-beat-export');
        const sliderBpm = document.getElementById('beat-bpm-slider');
        const bpmVal = document.getElementById('beat-bpm-val');
        const sliderFilter = document.getElementById('beat-filter-slider');
        const selectGenre = document.getElementById('beat-select-genre');
        const selectPlayMode = document.getElementById('beat-select-play-mode');
        const btnHitSong = document.getElementById('btn-beat-hit-song');
        const btnRemix = document.getElementById('btn-beat-remix');
        const selectRemix = document.getElementById('beat-select-remix');
        // ✨ AI Infinite Melody Maestro Bindings
        const btnAiSong = document.getElementById('btn-ai-infinite-song');
        const btnAiRoll = document.getElementById('btn-ai-roll-melody');
        const btnAiMutate = document.getElementById('btn-ai-mutate-melody');
        const selectAiMood = document.getElementById('ai-select-mood');
        const selectAiDensity = document.getElementById('ai-select-density');

        if (btnAiSong) {
            btnAiSong.addEventListener('click', () => {
                const mood = selectAiMood ? selectAiMood.value : 'surprise';
                const density = selectAiDensity ? selectAiDensity.value : 'balanced';
                this.generateInfiniteUniqueSong(mood, density);
            });
        }

        if (btnAiRoll) {
            btnAiRoll.addEventListener('click', () => {
                const mood = selectAiMood ? selectAiMood.value : 'surprise';
                const density = selectAiDensity ? selectAiDensity.value : 'balanced';
                this.rollUniqueMelody(mood, density);
            });
        }

        if (btnAiMutate) {
            btnAiMutate.addEventListener('click', () => {
                this.mutateCurrentMelody();
            });
        }

        // 💬 AI Prompt-to-Song Composer
        const btnPromptCompose = document.getElementById('btn-ai-prompt-compose');
        const inputPrompt = document.getElementById('ai-prompt-input');
        if (btnPromptCompose) {
            btnPromptCompose.addEventListener('click', () => {
                const text = inputPrompt ? inputPrompt.value.trim() : '';
                if (text) this.composeFromTextPrompt(text);
            });
        }
        if (inputPrompt) {
            inputPrompt.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const text = inputPrompt.value.trim();
                    if (text) this.composeFromTextPrompt(text);
                }
            });
        }
        document.querySelectorAll('.prompt-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const promptText = chip.getAttribute('data-prompt');
                if (inputPrompt) inputPrompt.value = promptText;
                this.composeFromTextPrompt(promptText);
            });
        });

        // 💥 AI Buildup & Drop
        const btnBuildup = document.getElementById('btn-ai-buildup');
        if (btnBuildup) {
            btnBuildup.addEventListener('click', () => {
                this.generateBuildupAndDrop();
            });
        }

        // 🥁 AI Tap-to-Rhythm
        const btnTap = document.getElementById('btn-ai-tap-rhythm');
        if (btnTap) {
            btnTap.addEventListener('click', () => {
                this.recordTapRhythm();
            });
        }
        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                const beatSection = document.getElementById('module-beat');
                if (beatSection && beatSection.classList.contains('active')) {
                    e.preventDefault();
                    this.recordTapRhythm();
                }
            }
        });

        // 🎛️ AI Studio Auto-Mastering Dropdown
        const selMastering = document.getElementById('beat-select-mastering');
        if (selMastering) {
            selMastering.addEventListener('change', () => {
                this.applyMasteringProfile(selMastering.value);
            });
        }

        // 🌐 3D Cyber Visualizer Toggle
        const btn3DViz = document.getElementById('btn-toggle-3d-viz');
        if (btn3DViz) {
            btn3DViz.addEventListener('click', () => {
                this.is3DViz = !this.is3DViz;
                btn3DViz.classList.toggle('active', this.is3DViz);
                btn3DViz.style.background = this.is3DViz ? 'var(--accent-pink)' : 'rgba(15, 23, 42, 0.85)';
                btn3DViz.style.color = this.is3DViz ? '#050714' : 'var(--accent-cyan)';
            });
        }

        // 📁 AI Audio Lab File Dropzone & Input
        const dropzone = document.getElementById('audio-dropzone');
        const fileInput = document.getElementById('audio-file-input');
        if (dropzone && fileInput) {
            dropzone.addEventListener('click', () => fileInput.click());
            dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('dragover'); });
            dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
            dropzone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropzone.classList.remove('dragover');
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    this.loadAndAnalyzeAudioFile(e.dataTransfer.files[0]);
                }
            });
            fileInput.addEventListener('change', (e) => {
                if (e.target.files && e.target.files[0]) {
                    this.loadAndAnalyzeAudioFile(e.target.files[0]);
                }
            });
        }

        // ▶ Play Original Audio Button
        const btnPlayOriginal = document.getElementById('btn-play-original-audio');
        if (btnPlayOriginal) {
            btnPlayOriginal.addEventListener('click', () => {
                this.togglePlayOriginalAudio();
            });
        }

        // ✨ AI Remake Button
        const btnRemakeAudio = document.getElementById('btn-ai-remake-audio');
        const selectRemakeGenre = document.getElementById('audio-select-remake-genre');
        if (btnRemakeAudio) {
            btnRemakeAudio.addEventListener('click', () => {
                const genre = selectRemakeGenre ? selectRemakeGenre.value : 'synthwave';
                this.remakeSongFromAudio(genre);
            });
        }

        // 🎛️ 4-Pad Live Audio Sampler Click & Key Bindings
        for (let i = 0; i < 4; i++) {
            const pad = document.getElementById('sampler-pad-' + (i + 1));
            if (pad) {
                pad.addEventListener('click', () => this.triggerAudioSampleSlice(i));
            }
        }
        window.addEventListener('keydown', (e) => {
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                if (['1', '2', '3', '4'].includes(e.key)) {
                    const idx = parseInt(e.key, 10) - 1;
                    this.triggerAudioSampleSlice(idx);
                }
            }
        });

        // 🧬 DNA Morph Slider
        const sliderDna = document.getElementById('slider-dna-morph');
        if (sliderDna) {
            sliderDna.addEventListener('input', () => {
                this.applyDnaMorph(parseInt(sliderDna.value, 10));
            });
        }

        // 🎤 Mic Beatbox-to-Beat
        const btnBeatbox = document.getElementById('btn-ai-mic-beatbox');
        if (btnBeatbox) {
            btnBeatbox.addEventListener('click', () => {
                this.recordAndTranscribeBeatbox();
            });
        }

                // 🎵 FEATURE 4: Melodic Robot Vocoder (Auto-Tune Singing)
        const btnVocoderSing = document.getElementById('btn-vocoder-sing');
        const selectVocoderScale = document.getElementById('vocoder-melody-scale');
        if (btnVocoderSing) {
            btnVocoderSing.addEventListener('click', () => {
                const text = inputVocoder ? inputVocoder.value.trim() : 'CYBER ARENA ASCENSION';
                const scale = selectVocoderScale ? selectVocoderScale.value : 'aminor';
                this.singMelodicVocoder(text, scale);
            });
        }
        if (selectVocoderScale) {
            selectVocoderScale.addEventListener('change', (e) => {
                this.vocoderMelodyScale = e.target.value;
            });
        }

        // 🎧 FEATURE 5: 8D Spatial Binaural Audio Toggle
        const toggle8D = document.getElementById('toggle-8d-audio');
        if (toggle8D) {
            toggle8D.addEventListener('click', () => this.toggle8DAudio());
        }

        // 🎛️ FEATURE 6: Holographic DJ Deck & Live Stems
        const btnTapeStop = document.getElementById('btn-dj-tapestop');
        if (btnTapeStop) btnTapeStop.addEventListener('click', () => this.triggerTapeStop());

        const btnReverse = document.getElementById('btn-dj-reverse');
        if (btnReverse) btnReverse.addEventListener('click', () => this.toggleReverse());

        const btnDubDelay = document.getElementById('btn-dj-dubdelay');
        if (btnDubDelay) btnDubDelay.addEventListener('click', () => this.toggleDubDelay());

        // Live Stems Mute / Solo Buttons
        ['drums', 'bass', 'synths', 'vocals'].forEach(stem => {
            const stemBtn = document.getElementById('btn-stem-' + stem);
            if (stemBtn) {
                stemBtn.addEventListener('click', () => this.toggleStem(stem));
            }
        });

        const btnVocoder = document.getElementById('btn-vocoder-inject');
        const inputVocoder = document.getElementById('vocoder-custom-text');
        const selectVocoderStyle = document.getElementById('vocoder-voice-style');

        if (btnRemix) {
            btnRemix.addEventListener('click', () => {
                const targetGenre = selectRemix ? selectRemix.value : 'phonk';
                this.instantRemixGenre(targetGenre);
            });
        }

        if (btnVocoder) {
            btnVocoder.addEventListener('click', () => {
                const text = inputVocoder ? inputVocoder.value.trim() : '';
                const style = selectVocoderStyle ? selectVocoderStyle.value : 'daft';
                const triggerSel = document.getElementById('vocoder-trigger-mode');
                const triggerMode = (triggerSel && triggerSel.value !== 'none') ? triggerSel.value : 'drop';
                const finalText = text || 'Cyber Studio Activate';

                this.injectedVocal = { text: finalText, style, triggerMode, enabled: true };
                this.setVocoderEnabled(true, false);

                this.speakCustomVocoder(finalText, style);
                this.showToast(window.I18N.t('msg_vocal_injected'));
            });
        }

        // 🎤 Vocoder Master Toggle Switch & Mute Handlers
        const toggleVocoder = document.getElementById('vocoder-toggle-enable');
        if (toggleVocoder) {
            toggleVocoder.addEventListener('change', (e) => {
                this.setVocoderEnabled(e.target.checked, true);
            });
        }

        const triggerSelVocoder = document.getElementById('vocoder-trigger-mode');
        if (triggerSelVocoder) {
            triggerSelVocoder.addEventListener('change', (e) => {
                if (e.target.value === 'none') {
                    this.setVocoderEnabled(false, true);
                } else {
                    this.injectedVocal.triggerMode = e.target.value;
                    this.setVocoderEnabled(true, false);
                }
            });
        }

        const badgeVocoder = document.getElementById('vocoder-status-badge');
        if (badgeVocoder) {
            badgeVocoder.addEventListener('click', () => {
                this.setVocoderEnabled(false, true);
            });
        }

        // Piano Mode switcher
        document.querySelectorAll('.piano-mode-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.piano-mode-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.pianoMode = btn.dataset.mode || 'single';
            });
        });

        // Initialize Scratch Wheel & Kaoss Pad
        setTimeout(() => {
            this.initScratchWheel();
            this.initKaossPad();
        }, 100);

        if (selectPlayMode) {
            selectPlayMode.addEventListener('change', (e) => {
                this.playMode = e.target.value;
                this.patternLoopCount = 0;
            });
        }

        if (btnHitSong) {
            btnHitSong.addEventListener('click', () => {
                const genre = selectGenre ? selectGenre.value : 'darksynth';
                this.generateCompleteHitSong(genre);
            });
        }

        if (btnPlay) btnPlay.addEventListener('click', () => this.togglePlay());
        if (btnClear) btnClear.addEventListener('click', () => this.clearGrid());
        if (btnAIGen) btnAIGen.addEventListener('click', () => this.aiAutoGenerateFullSong());
        if (btnExport) btnExport.addEventListener('click', () => this.exportFullSongWAV());

        // 🎲 Evolve Beat Button
        const btnEvolve = document.getElementById('btn-beat-evolve');
        if (btnEvolve) btnEvolve.addEventListener('click', () => this.evolveBeatPattern());

        // 🪄 Smart Chords Dropdown & Apply Button
        const selectChord = document.getElementById('beat-select-chord');
        const btnApplyChord = document.getElementById('btn-apply-chord');
        if (selectChord) {
            selectChord.addEventListener('change', (e) => {
                this.activeChordPreset = e.target.value;
                if (e.target.value !== 'none') this.applyChordProgression(e.target.value);
            });
        }
        if (btnApplyChord) {
            btnApplyChord.addEventListener('click', () => {
                const val = selectChord ? selectChord.value : 'dark_cyber';
                this.applyChordProgression(val);
            });
        }

        // 🎛️ Live DJ Kaoss FX Pads
        document.querySelectorAll('.dj-fx-pad').forEach(pad => {
            const fxType = pad.dataset.fx;
            pad.addEventListener('click', () => {
                pad.classList.add('active');
                this.triggerDJFX(fxType);
                setTimeout(() => pad.classList.remove('active'), 500);
            });
        });

        // 🎙️ Cyber Vocal Hooks
        document.querySelectorAll('.cyber-vocal-btn').forEach(btn => {
            const vocalType = btn.dataset.vocal;
            btn.addEventListener('click', () => {
                this.playVocalHook(vocalType);
            });
        });

        // Pattern Switcher
        document.querySelectorAll('.pattern-tab').forEach((tab, idx) => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.pattern-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.currentPatternIndex = idx;
                this.renderGrid();
            });
        });

        if (sliderBpm) {
            sliderBpm.addEventListener('input', (e) => {
                this.bpm = parseInt(e.target.value, 10);
                if (bpmVal) bpmVal.textContent = this.bpm;
            });
        }

        if (sliderFilter) {
            sliderFilter.addEventListener('input', (e) => {
                this.filterCutoff = parseInt(e.target.value, 10);
            });
        }

        if (selectGenre) {
            selectGenre.addEventListener('change', (e) => this.applyGenrePreset(e.target.value));
        }

        window.addEventListener('keydown', (e) => {
            const k = e.key.toUpperCase();
            const noteObj = this.notes.find(n => n.key === k);
            if (noteObj) {
                this.initAudioContext();
                this.playSynthNote(this.audioCtx.currentTime, noteObj.freq, 0.4);
                const btn = document.querySelector(`[data-note="${noteObj.note}"]`);
                if (btn) {
                    btn.classList.add('pressed');
                    setTimeout(() => btn.classList.remove('pressed'), 180);
                }
            }
        });
    }

    renderGrid() {
        const grid = document.getElementById('sequencer-grid');
        if (!grid) return;

        grid.innerHTML = '';
        let lastType = '';

        this.activeTracks.forEach((track, tIdx) => {
            if (track.type !== lastType) {
                const divider = document.createElement('div');
                divider.className = 'seq-section-divider';
                divider.textContent = track.type === 'drum' ? '🥁 DRUMS SECTION' : (track.type === 'melody' ? '🎹 BASS & SYNTH MELODIES' : '🚀 SFX & IMPACTS');
                grid.appendChild(divider);
                lastType = track.type;
            }

            const row = document.createElement('div');
            row.className = 'seq-track-row';

            const label = document.createElement('div');
            label.className = 'track-label' + (track.type === 'melody' ? ' melody-label' : (track.type === 'sfx' ? ' sfx-label' : ''));
            label.innerHTML = `<span>${track.icon}</span> <span data-i18n="${track.nameKey}">${window.I18N.t(track.nameKey)}</span>`;

            // 🎛️ Stem Mixer Controls (Mute, Solo, Volume)
            const mixerBox = document.createElement('div');
            mixerBox.className = 'track-mixer-controls';

            const muteBtn = document.createElement('button');
            muteBtn.type = 'button';
            muteBtn.className = 'track-mute-btn' + (track.isMuted ? ' active' : '');
            muteBtn.textContent = 'M';
            muteBtn.title = window.I18N.t('tooltip_mute');
            muteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                track.isMuted = !track.isMuted;
                muteBtn.classList.toggle('active', track.isMuted);
            });

            const soloBtn = document.createElement('button');
            soloBtn.type = 'button';
            soloBtn.className = 'track-solo-btn' + (track.isSolo ? ' active' : '');
            soloBtn.textContent = 'S';
            soloBtn.title = window.I18N.t('tooltip_solo');
            soloBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                track.isSolo = !track.isSolo;
                soloBtn.classList.toggle('active', track.isSolo);
            });

            const volSlider = document.createElement('input');
            volSlider.type = 'range';
            volSlider.className = 'track-vol-slider';
            volSlider.min = '0';
            volSlider.max = '1';
            volSlider.step = '0.05';
            volSlider.value = (track.volume !== undefined) ? track.volume : '1';
            volSlider.addEventListener('input', (e) => {
                track.volume = parseFloat(e.target.value);
            });

            mixerBox.appendChild(muteBtn);
            mixerBox.appendChild(soloBtn);
            mixerBox.appendChild(volSlider);
            label.appendChild(mixerBox);
            row.appendChild(label);

            for (let s = 0; s < 16; s++) {
                const pad = document.createElement('button');
                pad.type = 'button';
                const activeClass = track.steps[s] ? (track.type === 'melody' ? ' active-melody' : (track.type === 'sfx' ? ' active-sfx' : ' active')) : '';
                pad.className = 'step-pad' + activeClass + (s % 4 === 0 ? ' beat-group' : '');
                pad.dataset.track = tIdx;
                pad.dataset.step = s;

                pad.addEventListener('click', () => {
                    this.initAudioContext();
                    track.steps[s] = track.steps[s] ? 0 : 1;
                    pad.classList.toggle(track.type === 'melody' ? 'active-melody' : (track.type === 'sfx' ? 'active-sfx' : 'active'), track.steps[s] === 1);
                    if (track.steps[s]) this.playInstrument(track, this.audioCtx.currentTime);
                });

                row.appendChild(pad);
            }
            grid.appendChild(row);
        });
    }

    renderPianoKeys() {
        const container = document.getElementById('piano-keys-wrapper');
        if (!container) return;

        container.innerHTML = '';
        this.notes.forEach(note => {
            const keyBtn = document.createElement('button');
            keyBtn.type = 'button';
            keyBtn.className = 'piano-key';
            keyBtn.dataset.note = note.note;
            keyBtn.innerHTML = `${note.note}<span class="key-bind">[${note.key}]</span>`;

            keyBtn.addEventListener('mousedown', () => {
                this.initAudioContext();
                const now = this.audioCtx.currentTime;
                if (this.pianoMode === 'chord') {
                    // Rich Major/Minor Harmonic Triad (Root, 3rd, 5th)
                    this.renderSynthVoice(now, note.freq, 0.55, 0.7);
                    this.renderSynthVoice(now, note.freq * 1.2599, 0.55, 0.6); // Major 3rd
                    this.renderSynthVoice(now, note.freq * 1.4983, 0.55, 0.6); // 5th
                } else if (this.pianoMode === 'arp') {
                    // Fast 1/16 Arpeggio Cascade
                    const stepDur = (60 / this.bpm) / 4;
                    const arpNotes = [note.freq, note.freq * 1.2599, note.freq * 1.4983, note.freq * 2.0];
                    arpNotes.forEach((f, idx) => {
                        this.renderSynthVoice(now + idx * stepDur, f, 0.22, 0.75);
                    });
                } else {
                    this.playSynthNote(now, note.freq, 0.4);
                }
            });

            container.appendChild(keyBtn);
        });
    }

    togglePlay() {
        this.initAudioContext();
        this.isPlaying = !this.isPlaying;

        const btn = document.getElementById('btn-beat-play');
        if (btn) {
            btn.innerHTML = this.isPlaying ? '<i class="fa-solid fa-pause"></i> ' + window.I18N.t('btn_pause_beat') : '<i class="fa-solid fa-play"></i> ' + window.I18N.t('btn_play_beat');
        }

        if (this.isPlaying) {
            this.currentStep = 0;
            this.step();
        } else {
            if (this.timer) clearTimeout(this.timer);
            this.clearPlayheadCursors();
        }
    }

    step() {
        if (!this.isPlaying || !this.audioCtx) return;

        const stepTime = (60 / this.bpm) / 4;
        const now = this.audioCtx.currentTime;
        this.stepCount++;

        // ⏪ Reverse playback step mapping
        const effectiveStep = this.isReversed ? (15 - this.currentStep) : this.currentStep;

        this.updatePlayheadCursor(effectiveStep);

        this.activeTracks.forEach(track => {
            if (track.steps[effectiveStep]) {
                this.playInstrument(track, now);
            }
        });

        // 🎧 8D Spatial Binaural Orbit Modulation
        if (this.is8DEnabled && this.panner8D && this.audioCtx) {
            this.spatial8DAngle += 0.35;
            this.panner8D.pan.setValueAtTime(Math.sin(this.spatial8DAngle), now);
        }

        // ⚡ FEATURE 7: AUDOREACTIVE ARENA REACTOR BRIDGE
        const stepData = { kick: false, snare: false, hihat: false, bass: false, synths: false };
        this.activeTracks.forEach(track => {
            if (track.steps[effectiveStep]) {
                const id = (track.id || '').toLowerCase();
                const name = (track.name || '').toLowerCase();
                if (id === 'kick') stepData.kick = true;
                else if (id === 'snare' || id === 'clap') stepData.snare = true;
                else if (id.includes('hihat')) stepData.hihat = true;
                else if (name.includes('bass') || id.includes('bass')) stepData.bass = true;
                else stepData.synths = true;
            }
        });
        if (window.introEngine && typeof window.introEngine.reactToAudioStep === 'function') {
            window.introEngine.reactToAudioStep(stepData);
        }

        // 🎙️ Auto-Drop Injected Custom Vocoder Lyrics during Song Playback
        if (this.injectedVocal && this.injectedVocal.enabled && this.injectedVocal.text && this.currentStep === 0) {
            let shouldTrigger = false;
            const mode = this.injectedVocal.triggerMode || 'drop';
            if (this.playMode === 'song') {
                if (mode === 'drop' && this.currentPatternIndex === 2 && this.patternLoopCount === 0) {
                    shouldTrigger = true;
                } else if (mode === 'verse_drop' && (this.currentPatternIndex === 1 || this.currentPatternIndex === 2) && this.patternLoopCount === 0) {
                    shouldTrigger = true;
                } else if (mode === 'all' && this.patternLoopCount === 0) {
                    shouldTrigger = true;
                }
            } else {
                if (this.patternLoopCount % 2 === 0) {
                    shouldTrigger = true;
                }
            }

            if (shouldTrigger) {
                this.speakCustomVocoder(this.injectedVocal.text, this.injectedVocal.style);
            }
        }

        if (this.currentStep === 15) {
            if (this.playMode === 'song') {
                this.patternLoopCount++;
                if (this.patternLoopCount >= this.loopsPerSection) {
                    this.patternLoopCount = 0;
                    this.currentPatternIndex = (this.currentPatternIndex + 1) % 4;
                    document.querySelectorAll('.pattern-tab').forEach((t, i) => {
                        t.classList.toggle('active', i === this.currentPatternIndex);
                    });
                    this.renderGrid();
                }
            }
            this.currentStep = 0;
        } else {
            this.currentStep++;
        }
        this.timer = setTimeout(() => this.step(), stepTime * 1000);
    }

    updatePlayheadCursor(stepIdx) {
        document.querySelectorAll('.step-pad').forEach(pad => {
            const padStep = parseInt(pad.dataset.step, 10);
            pad.classList.toggle('playing-cursor', padStep === stepIdx);
        });
    }

    clearPlayheadCursors() {
        document.querySelectorAll('.step-pad').forEach(pad => pad.classList.remove('playing-cursor'));
    }

    clearGrid() {
        this.activeTracks.forEach(track => track.steps.fill(0));
        this.renderGrid();
    }

    aiAutoGenerateFullSong() {
        this.activeTracks.forEach(track => {
            track.steps.fill(0);
            if (track.id === 'kick') {
                track.steps[0] = 1; track.steps[4] = 1; track.steps[8] = 1; track.steps[12] = 1;
            } else if (track.id === 'snare') {
                track.steps[4] = 1; track.steps[12] = 1;
            } else if (track.id === 'hihat_c') {
                for (let i = 0; i < 16; i += 2) track.steps[i] = 1;
            } else if (track.id === 'hihat_o') {
                track.steps[2] = 1; track.steps[6] = 1; track.steps[10] = 1; track.steps[14] = 1;
            } else if (track.id === 'bass') {
                for (let i = 0; i < 16; i += 2) track.steps[i] = 1;
            } else if (track.id === 'lead_high') {
                track.steps[2] = 1; track.steps[7] = 1; track.steps[10] = 1; track.steps[14] = 1;
            } else if (track.id === 'lead_mid') {
                track.steps[0] = 1; track.steps[4] = 1; track.steps[8] = 1; track.steps[12] = 1;
            } else if (track.id === 'sfx_laser') {
                track.steps[8] = 1;
            } else if (track.id === 'sfx_impact') {
                track.steps[0] = 1;
            }
        });
        this.renderGrid();
        if (this.audioCtx) this.playInstrument(this.activeTracks[0], this.audioCtx.currentTime);
    }


    // ══════════════════════════════════════════════════════════════════════
    // 🌐 12 ICONIC MUSIC GENRE MODELS & COMPLETE HIT SONG GENERATOR
    // ══════════════════════════════════════════════════════════════════════

    applyGenreModel(genreKey) {
        this.initAudioContext();
        const sliderBpm = document.getElementById('beat-bpm-slider');
        const bpmVal = document.getElementById('beat-bpm-val');
        const sliderFilter = document.getElementById('beat-filter-slider');

        // Note frequencies for rich melodic step sequencing
        // C3: 130.81, D3: 146.83, Eb3: 155.56, F3: 174.61, G3: 196.00, Ab3: 207.65, Bb3: 233.08
        // C4: 261.63, D4: 293.66, Eb4: 311.13, F4: 349.23, G4: 392.00, Ab4: 415.30, Bb4: 466.16
        const genreDefs = {
            darksynth: {
                bpm: 134, filter: 2200,
                kick: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0],
                snare: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
                hihat_c: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1],
                hihat_o: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0],
                clap: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
                cowbell: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
                bass: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0],
                bassFreqs: [65.41,65.41,65.41,65.41, 51.91,51.91,51.91,51.91, 58.27,58.27,58.27,58.27, 49.00,49.00,49.00,49.00],
                lead_high: [0,0,1,0, 0,0,0,1, 0,0,1,0, 0,1,0,0],
                highFreqs: [523.25,523.25,466.16,523.25, 415.30,415.30,523.25,415.30, 466.16,466.16,523.25,466.16, 392.00,392.00,466.16,392.00],
                lead_mid: [1,0,0,1, 0,1,0,0, 1,0,0,1, 0,0,1,0],
                midFreqs: [311.13,311.13,349.23,311.13, 261.63,261.63,311.13,261.63, 293.66,293.66,349.23,293.66, 246.94,246.94,293.66,246.94],
                lead_low: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0],
                sfx_laser: [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],
                sfx_impact: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0]
            },
            synthwave: {
                bpm: 120, filter: 2600,
                kick: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0],
                snare: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
                hihat_c: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0],
                hihat_o: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0],
                clap: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
                cowbell: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
                bass: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0],
                bassFreqs: [55.00,55.00,55.00,55.00, 43.65,43.65,43.65,43.65, 65.41,65.41,65.41,65.41, 49.00,49.00,49.00,49.00],
                lead_high: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,1],
                highFreqs: [440,440,523.25,440, 349.23,349.23,440,349.23, 523.25,523.25,659.25,523.25, 392,392,440,392],
                lead_mid: [1,0,0,1, 0,1,0,0, 1,0,0,1, 0,1,0,0],
                midFreqs: [220,220,261.63,220, 174.61,174.61,220,174.61, 261.63,261.63,329.63,261.63, 196,196,220,196],
                lead_low: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],
                sfx_laser: [0,0,0,0, 0,0,0,0, 0,0,1,0, 0,0,0,0],
                sfx_impact: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0]
            },
            phonk: {
                bpm: 142, filter: 2800,
                kick: [1,0,0,0, 0,0,1,0, 1,0,0,0, 0,0,1,0],
                snare: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
                hihat_c: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1],
                hihat_o: [0,0,1,0, 0,0,0,0, 0,0,1,0, 0,0,0,0],
                clap: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
                cowbell: [1,0,0,1, 0,1,0,0, 1,0,1,0, 0,1,0,0],
                bass: [1,0,0,0, 0,0,1,0, 1,0,0,0, 0,0,1,0],
                bassFreqs: [46.25,46.25,46.25,46.25, 73.42,73.42,73.42,73.42, 69.30,69.30,69.30,69.30, 41.20,41.20,41.20,41.20],
                lead_high: [0,0,1,0, 1,0,0,1, 0,0,1,0, 1,0,0,1],
                highFreqs: [554.37,554.37,440,554.37, 587.33,587.33,440,587.33, 554.37,554.37,440,554.37, 493.88,493.88,440,493.88],
                lead_mid: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
                lead_low: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],
                sfx_laser: [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],
                sfx_impact: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0]
            },
            electro_house: {
                bpm: 126, filter: 3200,
                kick: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0],
                snare: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
                hihat_c: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0],
                hihat_o: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0],
                clap: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
                cowbell: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
                bass: [0,1,0,1, 0,1,0,1, 0,1,0,1, 0,1,0,1],
                bassFreqs: [65.41,65.41,65.41,65.41, 65.41,65.41,65.41,65.41, 58.27,58.27,58.27,58.27, 49.00,49.00,49.00,49.00],
                lead_high: [1,0,0,1, 0,1,0,0, 1,0,0,1, 0,1,1,0],
                highFreqs: [523.25,523.25,587.33,523.25, 659.25,659.25,523.25,659.25, 587.33,587.33,523.25,587.33, 493.88,493.88,523.25,493.88],
                lead_mid: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0],
                lead_low: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0],
                sfx_laser: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
                sfx_impact: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0]
            },
            cinematic: {
                bpm: 105, filter: 1800,
                kick: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],
                snare: [0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0],
                hihat_c: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0],
                hihat_o: [0,0,0,0, 0,0,1,0, 0,0,0,0, 0,0,1,0],
                clap: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
                cowbell: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
                bass: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0],
                bassFreqs: [43.65,43.65,43.65,43.65, 51.91,51.91,51.91,51.91, 58.27,58.27,58.27,58.27, 49.00,49.00,49.00,49.00],
                lead_high: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,1],
                highFreqs: [349.23,349.23,440,349.23, 415.30,415.30,523.25,415.30, 466.16,466.16,523.25,466.16, 392,392,440,392],
                lead_mid: [1,0,0,0, 0,1,0,0, 1,0,0,0, 0,1,0,0],
                lead_low: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],
                sfx_laser: [0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0],
                sfx_impact: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0]
            },
            dnb: {
                bpm: 170, filter: 3500,
                kick: [1,0,0,0, 0,0,0,0, 0,0,1,0, 0,0,0,0],
                snare: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
                hihat_c: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1],
                hihat_o: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0],
                clap: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
                cowbell: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
                bass: [1,0,0,1, 0,0,1,0, 0,1,0,0, 1,0,0,0],
                bassFreqs: [55,55,55,55, 65.41,65.41,65.41,65.41, 58.27,58.27,58.27,58.27, 49,49,49,49],
                lead_high: [0,0,1,0, 1,0,0,1, 0,0,1,0, 1,0,0,1],
                highFreqs: [440,440,523.25,440, 523.25,523.25,659.25,523.25, 466.16,466.16,523.25,466.16, 392,392,440,392],
                lead_mid: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
                lead_low: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],
                sfx_laser: [0,0,0,0, 0,0,1,0, 0,0,0,0, 0,0,1,0],
                sfx_impact: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0]
            },
            techno: {
                bpm: 132, filter: 2000,
                kick: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0],
                snare: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
                hihat_c: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1],
                hihat_o: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0],
                clap: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
                cowbell: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
                bass: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0],
                bassFreqs: [49,49,49,49, 49,49,49,49, 58.27,58.27,58.27,58.27, 49,49,49,49],
                lead_high: [0,0,0,0, 0,1,0,0, 0,0,0,0, 0,1,0,0],
                highFreqs: [392,392,392,392, 392,392,392,392, 466.16,466.16,466.16,466.16, 392,392,392,392],
                lead_mid: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0],
                lead_low: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0],
                sfx_laser: [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],
                sfx_impact: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0]
            },
            lofi: {
                bpm: 88, filter: 1400,
                kick: [1,0,0,0, 0,0,1,0, 0,1,0,0, 0,0,1,0],
                snare: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
                hihat_c: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0],
                hihat_o: [0,0,0,0, 0,0,1,0, 0,0,0,0, 0,0,1,0],
                clap: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
                cowbell: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
                bass: [1,0,0,0, 0,0,1,0, 1,0,0,0, 0,0,1,0],
                bassFreqs: [65.41,65.41,65.41,65.41, 51.91,51.91,51.91,51.91, 58.27,58.27,58.27,58.27, 49,49,49,49],
                lead_high: [0,0,1,0, 0,0,0,1, 0,0,1,0, 0,1,0,0],
                highFreqs: [523.25,523.25,466.16,523.25, 415.30,415.30,523.25,415.30, 466.16,466.16,523.25,466.16, 392,392,466.16,392],
                lead_mid: [1,0,0,0, 0,1,0,0, 1,0,0,0, 0,1,0,0],
                lead_low: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],
                sfx_laser: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
                sfx_impact: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0]
            },
            chiptune: {
                bpm: 140, filter: 4500,
                kick: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0],
                snare: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
                hihat_c: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1],
                hihat_o: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0],
                clap: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
                cowbell: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0],
                bass: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0],
                bassFreqs: [65.41,65.41,65.41,65.41, 73.42,73.42,73.42,73.42, 58.27,58.27,58.27,58.27, 49,49,49,49],
                lead_high: [1,0,1,1, 0,1,1,0, 1,0,1,1, 0,1,1,0],
                highFreqs: [523.25,587.33,659.25,523.25, 587.33,659.25,783.99,587.33, 466.16,523.25,587.33,466.16, 392,440,493.88,392],
                lead_mid: [0,1,0,1, 1,0,1,0, 0,1,0,1, 1,0,1,0],
                lead_low: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0],
                sfx_laser: [0,0,1,0, 0,0,0,0, 0,0,1,0, 0,0,0,0],
                sfx_impact: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0]
            },
            trap: {
                bpm: 138, filter: 2400,
                kick: [1,0,0,0, 0,0,1,0, 1,0,0,0, 0,0,1,0],
                snare: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
                hihat_c: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1],
                hihat_o: [0,0,0,0, 0,0,1,0, 0,0,0,0, 0,0,1,0],
                clap: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
                cowbell: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
                bass: [1,0,0,0, 0,0,1,0, 1,0,0,0, 0,0,1,0],
                bassFreqs: [41.20,41.20,41.20,41.20, 46.25,46.25,46.25,46.25, 41.20,41.20,41.20,41.20, 55,55,55,55],
                lead_high: [0,0,1,0, 1,0,0,1, 0,0,1,0, 1,0,0,1],
                highFreqs: [440,440,493.88,440, 523.25,523.25,440,523.25, 440,440,493.88,440, 587.33,587.33,523.25,587.33],
                lead_mid: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
                lead_low: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],
                sfx_laser: [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],
                sfx_impact: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0]
            },
            ambient: {
                bpm: 72, filter: 1200,
                kick: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],
                snare: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
                hihat_c: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0],
                hihat_o: [0,0,0,0, 0,0,1,0, 0,0,0,0, 0,0,1,0],
                clap: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
                cowbell: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
                bass: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],
                bassFreqs: [41.20,41.20,41.20,41.20, 49,49,49,49, 55,55,55,55, 41.20,41.20,41.20,41.20],
                lead_high: [0,0,1,0, 0,0,0,0, 0,0,1,0, 0,0,0,0],
                highFreqs: [329.63,329.63,392,329.63, 392,392,440,392, 440,440,523.25,440, 329.63,329.63,392,329.63],
                lead_mid: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],
                lead_low: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],
                sfx_laser: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
                sfx_impact: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0]
            },
            metal: {
                bpm: 150, filter: 3000,
                kick: [1,1,0,0, 1,1,0,0, 1,1,0,0, 1,1,0,0],
                snare: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
                hihat_c: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0],
                hihat_o: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0],
                clap: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
                cowbell: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
                bass: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1],
                bassFreqs: [41.20,41.20,41.20,41.20, 41.20,41.20,46.25,41.20, 49,49,49,49, 41.20,41.20,46.25,41.20],
                lead_high: [1,0,0,1, 0,1,0,0, 1,0,0,1, 0,1,1,0],
                highFreqs: [329.63,329.63,369.99,329.63, 392,392,369.99,392, 440,440,392,440, 329.63,329.63,369.99,329.63],
                lead_mid: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0],
                lead_low: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0],
                sfx_laser: [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],
                sfx_impact: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0]
            }
        };

        const def = genreDefs[genreKey] || genreDefs.darksynth;
        this.bpm = def.bpm;
        this.filterCutoff = def.filter;

        if (sliderBpm) sliderBpm.value = this.bpm;
        if (bpmVal) bpmVal.textContent = this.bpm;
        if (sliderFilter) sliderFilter.value = this.filterCutoff;

        this.activeTracks.forEach(track => {
            if (def[track.id]) {
                track.steps = [...def[track.id]];
            }
            if (track.id === 'bass' && def.bassFreqs) {
                track.stepFreqs = [...def.bassFreqs];
                track.freq = def.bassFreqs[0];
            }
            if (track.id === 'lead_high' && def.highFreqs) {
                track.stepFreqs = [...def.highFreqs];
                track.freq = def.highFreqs[0];
            }
            if (track.id === 'lead_mid' && def.midFreqs) {
                track.stepFreqs = [...def.midFreqs];
                track.freq = def.midFreqs[0];
            }
        });

        this.renderGrid();
        if (this.audioCtx) this.playInstrument(this.activeTracks[0], this.audioCtx.currentTime);
        this.showToast('🎵 ' + genreKey.toUpperCase() + ' Groove Loaded!');
    }

    generateCompleteHitSong(genreKey = 'darksynth') {
        this.initAudioContext();
        this.applyGenreModel(genreKey);

        const baseDef = this.activeTracks;

        // 🎼 Create authentic musical progression across all 4 patterns:
        // Pattern 0: INTRO - Ambient, sparse drums, filtering in
        this.patterns[0].forEach(track => {
            track.steps = track.steps.map((s, i) => {
                if (track.id === 'kick') return (i === 0 || i === 8) ? 1 : 0;
                if (track.id === 'hihat_c') return (i % 4 === 0) ? 1 : 0;
                if (track.id === 'hihat_o') return (i === 14) ? 1 : 0;
                if (track.id === 'snare' || track.id === 'clap') return 0;
                if (track.id === 'bass') return (i === 0 || i === 8) ? 1 : 0;
                if (track.id === 'lead_mid') return (i === 0 || i === 4 || i === 8 || i === 12) ? 1 : 0;
                if (track.id === 'sfx_impact') return i === 0 ? 1 : 0;
                return 0;
            });
            if (baseDef.find(t => t.id === track.id)?.stepFreqs) {
                track.stepFreqs = [...baseDef.find(t => t.id === track.id).stepFreqs];
            }
        });

        // Pattern 1: VERSE - Full groove establishes, bass walks, melody sings
        this.patterns[1].forEach(track => {
            const masterTrack = baseDef.find(t => t.id === track.id);
            if (masterTrack) {
                track.steps = [...masterTrack.steps];
                if (masterTrack.stepFreqs) track.stepFreqs = [...masterTrack.stepFreqs];
            }
        });

        // Pattern 2: EPIC DROP / REFREN - Maximum energy! Full drums, claps, leads, cowbells, lasers
        this.patterns[2].forEach(track => {
            const masterTrack = baseDef.find(t => t.id === track.id);
            if (masterTrack) {
                track.steps = [...masterTrack.steps];
                if (masterTrack.stepFreqs) track.stepFreqs = [...masterTrack.stepFreqs];
            }
            if (track.id === 'kick') track.steps = [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0];
            if (track.id === 'clap') track.steps = [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0];
            if (track.id === 'hihat_c') track.steps = [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1];
            if (track.id === 'hihat_o') track.steps = [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0];
            if (track.id === 'sfx_laser') track.steps[12] = 1;
            if (track.id === 'sfx_impact') track.steps[0] = 1;
        });

        // Pattern 3: OUTRO - Resolution, echo fade out, sparse beats
        this.patterns[3].forEach(track => {
            track.steps = track.steps.map((s, i) => {
                if (track.id === 'kick') return (i === 0 || i === 8) ? 1 : 0;
                if (track.id === 'snare') return i === 4 ? 1 : 0;
                if (track.id === 'hihat_c') return (i % 2 === 0) ? 1 : 0;
                if (track.id === 'lead_high') return (i === 0 || i === 6 || i === 12) ? 1 : 0;
                if (track.id === 'lead_low') return (i === 0 || i === 8) ? 1 : 0;
                if (track.id === 'sfx_laser') return i === 14 ? 1 : 0;
                return 0;
            });
            if (baseDef.find(t => t.id === track.id)?.stepFreqs) {
                track.stepFreqs = [...baseDef.find(t => t.id === track.id).stepFreqs];
            }
        });

        // Set to Pattern 0 (Intro), enable Song Mode
        this.playMode = 'song';
        this.currentPatternIndex = 0;
        this.patternLoopCount = 0;

        const selectPlayMode = document.getElementById('beat-select-play-mode');
        if (selectPlayMode) selectPlayMode.value = 'song';

        document.querySelectorAll('.pattern-tab').forEach((t, i) => {
            t.classList.toggle('active', i === 0);
        });

        this.renderGrid();
        this.playVocalHook('drop_bass');
        this.showToast('👑 COMPLETE HIT SONG ARRANGED (Intro ➔ Verse ➔ Drop ➔ Outro)!');
    }


    playInstrument(track, time) {
        if (!this.audioCtx) return;

        // Check Solo status across tracks
        const hasSolo = this.activeTracks.some(t => t.isSolo);
        if (hasSolo && !track.isSolo) return;
        if (track.isMuted) return;
        const id = track.id;

        // 🎛️ Stem Muting Check
        let stemCat = 'synths';
        if (['kick', 'snare', 'hihat_c', 'hihat_o', 'cowbell', 'clap'].includes(id)) {
            stemCat = 'drums';
        } else if ((track.name && track.name.toLowerCase().includes('bass')) || id.includes('bass')) {
            stemCat = 'bass';
        } else if (track.type === 'vocal' || id.includes('vocal')) {
            stemCat = 'vocals';
        }
        if (this.stemMutes && this.stemMutes[stemCat]) return;

        if (id === 'kick') this.playKick(time);
        else if (id === 'snare') this.playSnare(time);
        else if (id === 'hihat_c') this.playHiHat(time, false);
        else if (id === 'hihat_o') this.playHiHat(time, true);
        else if (id === 'cowbell') this.playCowbell(time);
        else if (id === 'clap') this.playClap(time);
        else if (track.type === 'melody') {
            const noteFreq = (track.stepFreqs && track.stepFreqs[this.currentStep]) || track.freq;
            this.playSynthNote(time, noteFreq, 0.35);
        }
        else if (id === 'sfx_laser') this.playLaserSFX(time);
        else if (id === 'sfx_impact') this.playImpactSFX(time);
    }

    playKick(time) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, time);
        osc.frequency.exponentialRampToValueAtTime(32, time + 0.15);
        gain.gain.setValueAtTime(0.85, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.15);
        osc.connect(gain);
        gain.connect(this.getMasterOutput());
        osc.start(time);
        osc.stop(time + 0.16);
    }

    playSnare(time) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(240, time);
        osc.frequency.exponentialRampToValueAtTime(80, time + 0.15);
        gain.gain.setValueAtTime(0.5, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.15);
        osc.connect(gain);
        gain.connect(this.getMasterOutput());
        osc.start(time);
        osc.stop(time + 0.16);
    }

    playHiHat(time, isOpen) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(8000, time);
        osc.frequency.exponentialRampToValueAtTime(3000, time + (isOpen ? 0.1 : 0.04));
        gain.gain.setValueAtTime(isOpen ? 0.2 : 0.09, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + (isOpen ? 0.1 : 0.04));
        osc.connect(gain);
        gain.connect(this.getMasterOutput());
        osc.start(time);
        osc.stop(time + (isOpen ? 0.11 : 0.05));
    }

    playCowbell(time) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, time);
        gain.gain.setValueAtTime(0.35, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.12);
        osc.connect(gain);
        gain.connect(this.getMasterOutput());
        osc.start(time);
        osc.stop(time + 0.13);
    }

    playClap(time) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(450, time);
        gain.gain.setValueAtTime(0.4, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.14);
        osc.connect(gain);
        gain.connect(this.getMasterOutput());
        osc.start(time);
        osc.stop(time + 0.15);
    }

    playSynthNote(time, freq, dur = 0.35) {
        if (!this.audioCtx) return;
        this.renderSynthVoice(time, freq, dur);
    }

    renderSynthVoice(time, freq, dur = 0.35, volScale = 1.0) {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const filter = this.audioCtx.createBiquadFilter();
        const gain = this.audioCtx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, time);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(this.filterCutoff, time);
        filter.frequency.exponentialRampToValueAtTime(Math.max(200, this.filterCutoff * 0.4), time + dur);

        gain.gain.setValueAtTime(0.35, time);
        gain.gain.exponentialRampToValueAtTime(0.005, time + dur);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.getMasterOutput());

        osc.start(time);
        osc.stop(time + dur + 0.02);
    }

    playLaserSFX(time) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(950, time);
        osc.frequency.exponentialRampToValueAtTime(100, time + 0.18);
        gain.gain.setValueAtTime(0.3, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.18);
        osc.connect(gain);
        gain.connect(this.getMasterOutput());
        osc.start(time);
        osc.stop(time + 0.19);
    }

    playImpactSFX(time) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(120, time);
        osc.frequency.exponentialRampToValueAtTime(25, time + 0.6);
        gain.gain.setValueAtTime(0.9, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.6);
        osc.connect(gain);
        gain.connect(this.getMasterOutput());
        osc.start(time);
        osc.stop(time + 0.62);
    }

    
    // ══════════════════════════════════════════════════════════════════════
    // 🌊 NEON OSCILLOSCOPE & AUDIO SPECTRUM VISUALIZER
    // ══════════════════════════════════════════════════════════════════════

    initVisualizer() {
        if (this.isVisualizing) return;
        this.visualizerCanvas = document.getElementById('beat-visualizer-canvas');
        if (!this.visualizerCanvas) return;
        this.visualizerCtx = this.visualizerCanvas.getContext('2d');
        this.isVisualizing = true;
        this.drawVisualizer();
    }

    drawVisualizer() {
        if (!this.isVisualizing || !this.visualizerCanvas || !this.visualizerCtx) return;
        requestAnimationFrame(() => this.drawVisualizer());

        const canvas = this.visualizerCanvas;
        const ctx = this.visualizerCtx;
        const w = canvas.width = canvas.clientWidth || 600;
        const h = canvas.height = canvas.clientHeight || 60;

        ctx.fillStyle = '#050714';
        ctx.fillRect(0, 0, w, h);

        if (!this.analyser) return;

        const bufferLength = this.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        this.analyser.getByteFrequencyData(dataArray);

        if (this.is3DViz) {
            const timeArray = new Uint8Array(bufferLength);
            this.analyser.getByteTimeDomainData(timeArray);
            this.render3DCyberVisualizer(ctx, dataArray, timeArray, w, h);
            return;
        }

        // 1. Neon Spectrum Bars
        const barWidth = (w / bufferLength) * 2.2;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            const barHeight = (dataArray[i] / 255) * (h * 0.85);
            const grad = ctx.createLinearGradient(0, h, 0, h - barHeight);
            grad.addColorStop(0, '#ff007f');
            grad.addColorStop(0.6, '#00f2fe');
            grad.addColorStop(1, '#ffb703');

            ctx.fillStyle = grad;
            ctx.fillRect(x, h - barHeight, barWidth - 2, barHeight);
            x += barWidth;
        }

        // 2. Central Oscilloscope Neon Wave
        const timeArray = new Uint8Array(bufferLength);
        this.analyser.getByteTimeDomainData(timeArray);

        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#00f2fe';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00f2fe';
        ctx.beginPath();

        const sliceWidth = w / bufferLength;
        let waveX = 0;

        for (let i = 0; i < bufferLength; i++) {
            const v = timeArray[i] / 128.0;
            const y = (v * (h / 2));
            if (i === 0) ctx.moveTo(waveX, y);
            else ctx.lineTo(waveX, y);
            waveX += sliceWidth;
        }

        ctx.lineTo(w, h / 2);
        ctx.stroke();
        ctx.shadowBlur = 0; // Reset shadow
    }

    // ══════════════════════════════════════════════════════════════════════
    // 🪄 SMART CHORD & HARMONY PROGRESSION ENGINE
    // ══════════════════════════════════════════════════════════════════════

    applyChordProgression(presetKey) {
        this.initAudioContext();
        if (presetKey === 'none') return;

        // Frequencies for chord roots and melody anchors
        const progressions = {
            dark_cyber: {
                name: 'Dark Cyberpunk',
                chords: [
                    { root: 65.41, noteLow: 261.63, noteMid: 311.13, noteHigh: 392.00 }, // Cm
                    { root: 51.91, noteLow: 207.65, noteMid: 261.63, noteHigh: 311.13 }, // Ab
                    { root: 58.27, noteLow: 233.08, noteMid: 293.66, noteHigh: 349.23 }, // Bb
                    { root: 49.00, noteLow: 196.00, noteMid: 246.94, noteHigh: 293.66 }  // Gm
                ]
            },
            neon_drive: {
                name: 'Neon Night Drive',
                chords: [
                    { root: 55.00, noteLow: 220.00, noteMid: 261.63, noteHigh: 329.63 }, // Am
                    { root: 43.65, noteLow: 174.61, noteMid: 220.00, noteHigh: 261.63 }, // F
                    { root: 65.41, noteLow: 261.63, noteMid: 329.63, noteHigh: 392.00 }, // C
                    { root: 49.00, noteLow: 196.00, noteMid: 246.94, noteHigh: 293.66 }  // G
                ]
            },
            titan_phonk: {
                name: 'Titan Phonk',
                chords: [
                    { root: 46.25, noteLow: 185.00, noteMid: 220.00, noteHigh: 277.18 }, // F#m
                    { root: 73.42, noteLow: 293.66, noteMid: 369.99, noteHigh: 440.00 }, // D
                    { root: 69.30, noteLow: 277.18, noteMid: 329.63, noteHigh: 415.30 }, // C#m
                    { root: 41.20, noteLow: 164.81, noteMid: 196.00, noteHigh: 246.94 }  // Em
                ]
            },
            heroic_anthem: {
                name: 'Heroic Anthem',
                chords: [
                    { root: 73.42, noteLow: 293.66, noteMid: 349.23, noteHigh: 440.00 }, // Dm
                    { root: 58.27, noteLow: 233.08, noteMid: 293.66, noteHigh: 349.23 }, // Bb
                    { root: 43.65, noteLow: 174.61, noteMid: 220.00, noteHigh: 261.63 }, // F
                    { root: 65.41, noteLow: 261.63, noteMid: 329.63, noteHigh: 392.00 }  // C
                ]
            },
            dreamwave: {
                name: 'Dreamwave Ethereal',
                chords: [
                    { root: 41.20, noteLow: 164.81, noteMid: 196.00, noteHigh: 246.94 }, // Em
                    { root: 65.41, noteLow: 261.63, noteMid: 329.63, noteHigh: 392.00 }, // C
                    { root: 49.00, noteLow: 196.00, noteMid: 246.94, noteHigh: 293.66 }, // G
                    { root: 73.42, noteLow: 293.66, noteMid: 369.99, noteHigh: 440.00 }  // D
                ]
            }
        };

        const prog = progressions[presetKey] || progressions.dark_cyber;
        const bassTrack = this.activeTracks.find(t => t.id === 'bass');
        const leadHigh = this.activeTracks.find(t => t.id === 'lead_high');
        const leadMid = this.activeTracks.find(t => t.id === 'lead_mid');
        const leadLow = this.activeTracks.find(t => t.id === 'lead_low');

        if (bassTrack) {
            bassTrack.steps = [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0];
            bassTrack.freq = prog.chords[0].root;
        }
        if (leadMid) {
            leadMid.steps = [1,0,0,1, 0,1,0,0, 1,0,0,1, 0,1,0,0];
            leadMid.freq = prog.chords[0].noteMid;
        }
        if (leadHigh) {
            leadHigh.steps = [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,1];
            leadHigh.freq = prog.chords[0].noteHigh;
        }
        if (leadLow) {
            leadLow.steps = [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0];
            leadLow.freq = prog.chords[0].noteLow;
        }

        this.renderGrid();
        if (this.audioCtx) this.playSynthNote(this.audioCtx.currentTime, prog.chords[0].noteHigh, 0.45);
        this.showToast('🪄 ' + prog.name + ' Harmony Applied!');
    }

    // ══════════════════════════════════════════════════════════════════════
    // 🎲 SMART BEAT MUTATOR ("EVOLVE & HUMANIZE")
    // ══════════════════════════════════════════════════════════════════════

    evolveBeatPattern() {
        this.initAudioContext();
        const hihatC = this.activeTracks.find(t => t.id === 'hihat_c');
        const hihatO = this.activeTracks.find(t => t.id === 'hihat_o');
        const snare = this.activeTracks.find(t => t.id === 'snare');
        const laser = this.activeTracks.find(t => t.id === 'sfx_laser');
        const clap = this.activeTracks.find(t => t.id === 'clap');

        // Subtly inject ghost notes & rhythmic roll into steps 11-15
        if (hihatC) {
            hihatC.steps[13] = 1;
            hihatC.steps[14] = 1;
            hihatC.steps[15] = 1;
        }
        if (hihatO) {
            hihatO.steps[14] = 1;
        }
        if (snare) {
            snare.steps[11] = snare.steps[11] ? 0 : 1; // Toggle ghost snare
            snare.steps[15] = 1;
        }
        if (clap) {
            clap.steps[10] = clap.steps[10] ? 0 : 1;
        }
        if (laser) {
            laser.steps[12] = 1;
        }

        this.renderGrid();
        if (this.audioCtx) this.playSnare(this.audioCtx.currentTime);
        this.showToast('🎲 Beat Evolved: Ghost hits & rolls injected!');
    }

    // ══════════════════════════════════════════════════════════════════════
    // 🎛️ LIVE DJ KAOSS FX PADS
    // ══════════════════════════════════════════════════════════════════════

    triggerDJFX(fxType) {
        this.initAudioContext();
        if (!this.audioCtx || !this.masterBus) return;

        const now = this.audioCtx.currentTime;

        if (fxType === 'tape') {
            // Vinyl Tape Stop: frequency drop + master gain dive and recovery
            this.isTapeStopping = true;
            this.masterBus.gain.setValueAtTime(1.0, now);
            this.masterBus.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
            this.masterBus.gain.setValueAtTime(0.01, now + 0.6);
            this.masterBus.gain.exponentialRampToValueAtTime(1.0, now + 0.85);
            this.showToast('📼 DJ TAPE STOP!');
        } else if (fxType === 'stutter') {
            // 1/16 Beat Stutter Roll
            const origStep = this.currentStep;
            let stutterCount = 0;
            const stutterInt = setInterval(() => {
                stutterCount++;
                this.activeTracks.forEach(t => {
                    if (t.steps[origStep]) this.playInstrument(t, this.audioCtx.currentTime);
                });
                if (stutterCount > 6) clearInterval(stutterInt);
            }, 80);
            this.showToast('🔁 1/16 BEAT ROLL!');
        } else if (fxType === 'reverb') {
            // Space Reverb Wash: high-feedback delay burst
            const delay = this.audioCtx.createDelay(1.0);
            delay.delayTime.value = 0.35;
            const feedback = this.audioCtx.createGain();
            feedback.gain.value = 0.72;
            const filter = this.audioCtx.createBiquadFilter();
            filter.type = 'highpass';
            filter.frequency.value = 800;

            this.masterBus.connect(delay);
            delay.connect(feedback);
            feedback.connect(filter);
            filter.connect(delay);
            delay.connect(this.audioCtx.destination);

            setTimeout(() => {
                feedback.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 1.2);
            }, 800);
            this.showToast('🌌 SPACE REVERB WASH!');
        } else if (fxType === 'crush') {
            // 8-Bit Bitcrush distortion burst
            const shaper = this.audioCtx.createWaveShaper();
            const n = 256;
            const curve = new Float32Array(n);
            for (let i = 0; i < n; i++) {
                const x = (i * 2) / n - 1;
                curve[i] = Math.round(x * 4) / 4; // Quantize amplitudes
            }
            shaper.curve = curve;
            this.masterBus.connect(shaper);
            shaper.connect(this.audioCtx.destination);
            setTimeout(() => {
                try { shaper.disconnect(); } catch (e) {}
            }, 1200);
            this.showToast('⚡ 8-BIT CRUNCH!');
        }
    }

    // ══════════════════════════════════════════════════════════════════════
    // 🎙️ CYBER VOCAL CHOPS & HOOKS
    // ══════════════════════════════════════════════════════════════════════

    playVocalHook(vocalType) {
        this.initAudioContext();
        const hooks = {
            drop_bass: 'Drop the bass!',
            cyber_arena: 'Cyber Arena!',
            system_overload: 'System Overload!',
            genius_ia: 'Genius I A!',
            pump_it: 'Pump it!'
        };

        const phrase = hooks[vocalType] || 'Drop the bass!';
        this.injectedVocal = { text: phrase, style: 'daft', triggerMode: 'drop', enabled: true };
        const badge = document.getElementById('vocoder-status-badge');
        if (badge) badge.style.display = 'inline-flex';

        this.speakCustomVocoder(phrase, 'daft', false);
    }

    showToast(msg) {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container';
            if (document.body) document.body.appendChild(container);
        }
        const toast = document.createElement('div');
        toast.className = 'toast-msg';
        toast.innerHTML = msg;
        if (container) container.appendChild(toast);
        setTimeout(() => {
            if (toast.style) {
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(-20px)';
                toast.style.transition = 'all 0.3s ease';
            }
            setTimeout(() => { if (toast.remove) toast.remove(); }, 300);
        }, 2500);
    }


    // ══════════════════════════════════════════════════════════════════════
    // 💽 INTERACTIVE DJ VINYL SCRATCH WHEEL
    // ══════════════════════════════════════════════════════════════════════

    initScratchWheel() {
        this.scratchCanvas = document.getElementById('vinyl-scratch-canvas');
        if (!this.scratchCanvas || !this.scratchCanvas.getContext) return;
        this.scratchCtx = this.scratchCanvas.getContext('2d');

        const canvas = this.scratchCanvas;
        let isDragging = false;
        let startAngle = 0;

        const getAngle = (e) => {
            const rect = canvas.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return Math.atan2(clientY - cy, clientX - cx);
        };

        const onStart = (e) => {
            isDragging = true;
            startAngle = getAngle(e);
            this.isScratching = true;
            this.initAudioContext();
        };

        const onMove = (e) => {
            if (!isDragging) return;
            const curAngle = getAngle(e);
            const delta = curAngle - startAngle;
            startAngle = curAngle;
            this.vinylAngle += delta;

            // Trigger scratch sound effect when spun rapidly
            if (Math.abs(delta) > 0.08) {
                this.playScratchSFX(delta);
            }
            this.drawVinyl();
        };

        const onEnd = () => {
            isDragging = false;
            this.isScratching = false;
        };

        canvas.addEventListener('mousedown', onStart);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onEnd);
        canvas.addEventListener('touchstart', onStart, { passive: true });
        window.addEventListener('touchmove', onMove, { passive: true });
        window.addEventListener('touchend', onEnd);

        this.animateVinyl();
    }

    animateVinyl() {
        requestAnimationFrame(() => this.animateVinyl());
        if (this.isPlaying && !this.isScratching) {
            this.vinylAngle += 0.035;
        }
        this.drawVinyl();
    }

    drawVinyl() {
        if (!this.scratchCanvas || !this.scratchCtx) return;
        const ctx = this.scratchCtx;
        const w = this.scratchCanvas.width;
        const h = this.scratchCanvas.height;
        const cx = w / 2;
        const cy = h / 2;
        const r = w / 2 - 4;

        ctx.clearRect(0, 0, w, h);

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(this.vinylAngle);

        // 1. Vinyl Body (Deep Black / Carbon)
        ctx.fillStyle = '#0a0d18';
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fill();

        // 2. Grooves
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
        ctx.lineWidth = 1.2;
        for (let gr = r * 0.45; gr < r * 0.92; gr += 7) {
            ctx.beginPath();
            ctx.arc(0, 0, gr, 0, Math.PI * 2);
            ctx.stroke();
        }

        // 3. Center Label (Neon Gold)
        const labelGrad = ctx.createLinearGradient(-r * 0.35, -r * 0.35, r * 0.35, r * 0.35);
        labelGrad.addColorStop(0, '#ffb703');
        labelGrad.addColorStop(1, '#ff007f');
        ctx.fillStyle = labelGrad;
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.35, 0, Math.PI * 2);
        ctx.fill();

        // 4. Center Spindle
        ctx.fillStyle = '#050714';
        ctx.beginPath();
        ctx.arc(0, 0, 7, 0, Math.PI * 2);
        ctx.fill();

        // 5. Marker Stripe for Scratch Feedback
        ctx.fillStyle = '#00f2fe';
        ctx.fillRect(r * 0.36, -3, r * 0.55, 6);

        ctx.restore();
    }

    playScratchSFX(delta) {
        if (!this.audioCtx) return;
        const now = this.audioCtx.currentTime;

        if (this.uploadedAudioBuffer) {
            try {
                const src = this.audioCtx.createBufferSource();
                src.buffer = this.uploadedAudioBuffer;
                const rate = Math.min(3, Math.max(0.2, Math.abs(delta) * 15));
                src.playbackRate.setValueAtTime(delta > 0 ? rate : rate * 0.8, now);

                const gain = this.audioCtx.createGain();
                gain.gain.setValueAtTime(0.85, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

                const filter = this.audioCtx.createBiquadFilter();
                filter.type = 'bandpass';
                filter.frequency.value = 1200;

                src.connect(filter);
                filter.connect(gain);
                gain.connect(this.getMasterOutput());

                const dur = this.uploadedAudioBuffer.duration || 1;
                const offset = Math.max(0, (Math.abs(this.vinylAngle) % dur));
                src.start(now, offset, 0.12);
                return;
            } catch (err) {}
        }

        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const filter = this.audioCtx.createBiquadFilter();

        osc.type = 'sawtooth';
        const speed = Math.min(3, Math.abs(delta) * 12);
        const baseFreq = delta > 0 ? 320 : 180;
        osc.frequency.setValueAtTime(baseFreq * speed, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.09);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(800 * speed, now);
        filter.Q.value = 4.0;

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.getMasterOutput());

        osc.start(now);
        osc.stop(now + 0.1);
    }

    // ══════════════════════════════════════════════════════════════════════
    // 🎯 XY KAOSS FILTER & REVERB TOUCH PAD
    // ══════════════════════════════════════════════════════════════════════

    initKaossPad() {
        this.kaossCanvas = document.getElementById('kaoss-pad-canvas');
        if (!this.kaossCanvas || !this.kaossCanvas.getContext) return;
        this.kaossCtx = this.kaossCanvas.getContext('2d');

        const canvas = this.kaossCanvas;
        const handleKaoss = (e) => {
            const rect = canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
            const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));

            this.kaossTouch = { active: true, x, y };

            // Map X to Filter Cutoff (300Hz to 5500Hz)
            this.filterCutoff = Math.round(300 + x * 5200);
            const filterSlider = document.getElementById('beat-filter-slider');
            if (filterSlider) filterSlider.value = this.filterCutoff;

            // Map Y to Space Reverb Wash when dragged into upper half
            if (y < 0.45 && Math.random() < 0.15) {
                this.triggerDJFX('reverb');
            }

            this.drawKaossPad();
        };

        canvas.addEventListener('mousedown', (e) => {
            this.initAudioContext();
            handleKaoss(e);
            const onMove = (mv) => handleKaoss(mv);
            const onUp = () => {
                window.removeEventListener('mousemove', onMove);
                window.removeEventListener('mouseup', onUp);
                this.kaossTouch.active = false;
                this.drawKaossPad();
            };
            window.addEventListener('mousemove', onMove);
            window.addEventListener('mouseup', onUp);
        });

        canvas.addEventListener('touchmove', (e) => {
            this.initAudioContext();
            handleKaoss(e);
        }, { passive: true });

        canvas.addEventListener('touchend', () => {
            this.kaossTouch.active = false;
            this.drawKaossPad();
        });

        this.drawKaossPad();
    }

    drawKaossPad() {
        if (!this.kaossCanvas || !this.kaossCtx) return;
        const ctx = this.kaossCtx;
        const w = this.kaossCanvas.width = this.kaossCanvas.clientWidth || 280;
        const h = this.kaossCanvas.height = this.kaossCanvas.clientHeight || 180;

        ctx.fillStyle = '#050714';
        ctx.fillRect(0, 0, w, h);

        // Cyber Grid Lines
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.12)';
        ctx.lineWidth = 1;
        for (let x = 0; x < w; x += 35) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
        }
        for (let y = 0; y < h; y += 30) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
        }

        // Touch Crosshair
        const tx = this.kaossTouch.x * w;
        const ty = this.kaossTouch.y * h;

        ctx.strokeStyle = this.kaossTouch.active ? '#ff007f' : 'rgba(0, 242, 254, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(tx, 0); ctx.lineTo(tx, h);
        ctx.moveTo(0, ty); ctx.lineTo(w, ty);
        ctx.stroke();

        // Touch Neon Dot
        ctx.fillStyle = this.kaossTouch.active ? '#00f2fe' : '#ffb703';
        ctx.shadowBlur = this.kaossTouch.active ? 15 : 6;
        ctx.shadowColor = ctx.fillStyle;
        ctx.beginPath();
        ctx.arc(tx, ty, this.kaossTouch.active ? 9 : 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    // ══════════════════════════════════════════════════════════════════════
    // 🪄 AI INSTANT REMIX ENGINE ("GENRE FUSION")
    // ══════════════════════════════════════════════════════════════════════

    instantRemixGenre(targetGenre) {
        this.initAudioContext();

        // 1. Cache the existing melodic notes, bassline & frequencies
        const melodyCache = this.activeTracks
            .filter(t => t.type === 'melody')
            .map(t => ({ id: t.id, steps: [...t.steps], stepFreqs: t.stepFreqs ? [...t.stepFreqs] : null, freq: t.freq }));

        // 2. Apply new genre drum patterns and BPM
        this.applyGenreModel(targetGenre);

        // 3. Restore user's custom melody and harmonic progression
        melodyCache.forEach(saved => {
            const targetTrack = this.activeTracks.find(t => t.id === saved.id);
            if (targetTrack) {
                targetTrack.steps = [...saved.steps];
                if (saved.stepFreqs) targetTrack.stepFreqs = [...saved.stepFreqs];
                targetTrack.freq = saved.freq;
            }
        });

        this.renderGrid();
        this.triggerDJFX('tape');
        this.showToast('🔥 REMIXED AS ' + targetGenre.toUpperCase() + ' (Melody preserved)!');
    }

    // ══════════════════════════════════════════════════════════════════════
    // 🎙️ CUSTOM TEXT-TO-CYBER-VOCODER
    // ══════════════════════════════════════════════════════════════════════


    // ══════════════════════════════════════════════════════════════════════
    // ✨ CYBER AI MUSIC MAESTRO: INFINITE PROCEDURAL COMPOSER
    // ══════════════════════════════════════════════════════════════════════


    // ══════════════════════════════════════════════════════════════════════
    // 🎛️ AI STUDIO AUTO-MASTERING RACK
    // ══════════════════════════════════════════════════════════════════════


    // ══════════════════════════════════════════════════════════════════════
    // 📁 AI AUDIO LAB, SPECTRAL ANALYZER & REMAKER
    // ══════════════════════════════════════════════════════════════════════

    async loadAndAnalyzeAudioFile(file) {
        this.initAudioContext();
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
            await this.audioCtx.resume();
        }
        if (!file) return;

        this.showToast('⏳ Reading & decoding ' + file.name + '...');

        try {
            const arrayBuffer = await file.arrayBuffer();

            // Decode audio safely with Promise + callback fallback and buffer copy
            const audioBuffer = await new Promise((resolve, reject) => {
                const copyBuf = arrayBuffer.slice(0);
                try {
                    const res = this.audioCtx.decodeAudioData(copyBuf, (decoded) => {
                        resolve(decoded);
                    }, (err) => {
                        reject(err || new Error('Decode error'));
                    });
                    if (res && typeof res.then === 'function') {
                        res.then(resolve).catch(reject);
                    }
                } catch (e) {
                    reject(e);
                }
            });

            this.uploadedAudioBuffer = audioBuffer;
            if (this.isPlayingOriginalAudio) {
                this.stopOriginalAudio();
            }

            // Real spectral and transient analysis
            this.showToast('🔬 Extracting tempo, rhythm, and melodic DNA...');
            const analysis = this.analyzeAudioBufferDeep(audioBuffer);
            this.uploadedAudioStats = analysis;

            const durationSec = Math.round(audioBuffer.duration);
            const mins = Math.floor(durationSec / 60);
            const secs = (durationSec % 60).toString().padStart(2, '0');
            this.uploadedAudioStats.duration = `${mins}:${secs}`;

            // Update UI
            const panel = document.getElementById('audio-analysis-panel');
            const statBpm = document.getElementById('stat-audio-bpm');
            const statKey = document.getElementById('stat-audio-key');
            const statDur = document.getElementById('stat-audio-duration');

            if (panel) panel.style.display = 'flex';
            if (statBpm) statBpm.textContent = analysis.bpm + ' BPM';
            if (statKey) statKey.textContent = analysis.key;
            if (statDur) statDur.textContent = `${mins}:${secs}`;

            // Draw Waveform and prepare 4 sample slices
            this.drawAudioWaveform();
            this.createAudioSampleSlices();

            this.showToast(window.I18N.t('msg_audio_analyzed') + `${analysis.bpm} BPM, ${analysis.key}!`);
        } catch (err) {
            console.error('Audio load/decode error:', err);
            this.showToast('❌ Could not decode audio: ' + (err.message || 'Format error'));
        }
    }

    analyzeAudioBufferDeep(audioBuffer) {
        const sampleRate = audioBuffer.sampleRate;
        const channelData = audioBuffer.getChannelData(0);
        const totalSamples = channelData.length;

        // 1. Transient Energy Envelope (20ms frames)
        const frameSize = Math.floor(sampleRate * 0.02);
        const numFrames = Math.min(Math.floor(totalSamples / frameSize), 1500); // Analyze up to 30s
        const lowEnergy = new Float32Array(numFrames);
        const midEnergy = new Float32Array(numFrames);
        const highEnergy = new Float32Array(numFrames);

        for (let f = 0; f < numFrames; f++) {
            const start = f * frameSize;
            let low = 0, mid = 0, high = 0;
            let prev = 0;

            for (let i = 0; i < frameSize; i += 2) {
                const val = channelData[start + i] || 0;
                const delta = Math.abs(val - prev);
                const abs = Math.abs(val);

                // Low frequencies: smooth envelope
                low += abs;
                // High frequencies: rapid delta transitions
                if (delta > 0.08) high += delta;
                else mid += abs;

                prev = val;
            }

            lowEnergy[f] = low / (frameSize / 2);
            midEnergy[f] = mid / (frameSize / 2);
            highEnergy[f] = high / (frameSize / 2);
        }

        // 2. Real BPM Autocorrelation across low energy peaks
        const peaks = [];
        let avgLow = 0;
        for (let f = 0; f < numFrames; f++) avgLow += lowEnergy[f];
        avgLow /= numFrames;

        const threshold = Math.max(0.04, avgLow * 1.25);
        for (let f = 2; f < numFrames - 2; f++) {
            if (lowEnergy[f] > threshold &&
                lowEnergy[f] > lowEnergy[f - 1] &&
                lowEnergy[f] > lowEnergy[f + 1] &&
                lowEnergy[f] > lowEnergy[f - 2] &&
                lowEnergy[f] > lowEnergy[f + 2]) {
                peaks.push(f);
            }
        }

        const intervals = {};
        for (let i = 1; i < peaks.length; i++) {
            const delta = peaks[i] - peaks[i - 1];
            // Delta corresponds to frames of 20ms (10 frames = 200ms -> 300 BPM, 60 frames = 1200ms -> 50 BPM)
            if (delta >= 12 && delta <= 55) {
                intervals[delta] = (intervals[delta] || 0) + 1;
            }
        }

        let bestDelta = 25;
        let maxCount = 0;
        for (const [delta, count] of Object.entries(intervals)) {
            if (count > maxCount) {
                maxCount = count;
                bestDelta = parseInt(delta, 10);
            }
        }

        const secondsPerBeat = bestDelta * 0.02;
        let detectedBPM = Math.round(60 / secondsPerBeat);
        while (detectedBPM < 78) detectedBPM *= 2;
        while (detectedBPM > 175) detectedBPM = Math.round(detectedBPM / 2);
        if (!detectedBPM || isNaN(detectedBPM)) detectedBPM = 124;

        // 3. Musical Key & Pitch Contour Estimation
        const ROOT_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const pitchFrequencies = [
            130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185.00, 196.00, 207.65, 220.00, 233.08, 246.94,
            261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392.00, 415.30, 440.00, 466.16, 493.88
        ];

        // 16-step rhythmic slice envelopes for drum placement
        const step16Length = Math.floor(totalSamples / 16);
        const step16Low = [];
        const step16Mid = [];
        const step16High = [];
        const step16Pitches = [];

        for (let s = 0; s < 16; s++) {
            const start = s * step16Length;
            const end = start + Math.min(step16Length, sampleRate * 1.5);
            let sLow = 0, sMid = 0, sHigh = 0;
            let zeroCross = 0;
            let prev = 0;

            for (let i = start; i < end; i += 4) {
                const val = channelData[i] || 0;
                if ((val >= 0 && prev < 0) || (val < 0 && prev >= 0)) zeroCross++;
                const abs = Math.abs(val);
                sLow += abs;
                prev = val;
            }

            const frameCount = (end - start) / 4;
            step16Low.push(sLow / frameCount);
            step16Mid.push(zeroCross / frameCount);

            // Estimate pitch of this step
            const estimatedFreq = (zeroCross / 2) * (sampleRate / (end - start));
            let mappedFreq = 220;
            if (estimatedFreq > 60 && estimatedFreq < 1200) {
                // Find closest chromatic note in pool
                mappedFreq = pitchFrequencies.reduce((prev, curr) => 
                    Math.abs(curr - estimatedFreq) < Math.abs(prev - estimatedFreq) ? curr : prev
                );
            } else {
                mappedFreq = pitchFrequencies[s % pitchFrequencies.length];
            }
            step16Pitches.push(mappedFreq);
        }

        // Dominant root note
        const dominantFreq = step16Pitches[0] || 220;
        const midi = Math.round(69 + 12 * Math.log2(dominantFreq / 440));
        const rootIndex = ((midi % 12) + 12) % 12;
        const detectedKey = ROOT_NAMES[rootIndex] + ' Minor';

        return {
            bpm: detectedBPM,
            key: detectedKey,
            rootName: ROOT_NAMES[rootIndex],
            step16Low,
            step16Mid,
            step16Pitches
        };
    }

    // ══════════════════════════════════════════════════════════════════════
    // ▶ ORIGINAL AUDIO PLAYBACK & WAVEFORM SCRUBBING
    // ══════════════════════════════════════════════════════════════════════

    togglePlayOriginalAudio() {
        if (!this.uploadedAudioBuffer) {
            this.showToast('Please upload an audio file first!');
            return;
        }
        this.initAudioContext();

        if (this.isPlayingOriginalAudio) {
            this.stopOriginalAudio();
        } else {
            this.playOriginalAudio();
        }
    }

    playOriginalAudio() {
        if (!this.uploadedAudioBuffer || !this.audioCtx) return;
        this.stopOriginalAudio();

        const src = this.audioCtx.createBufferSource();
        src.buffer = this.uploadedAudioBuffer;

        const gain = this.audioCtx.createGain();
        gain.gain.value = 0.9;

        src.connect(gain);
        gain.connect(this.getMasterOutput());

        const offset = this.originalAudioPauseOffset % this.uploadedAudioBuffer.duration;
        src.start(0, offset);

        this.originalAudioSource = src;
        this.originalAudioStartTime = this.audioCtx.currentTime - offset;
        this.isPlayingOriginalAudio = true;

        src.onended = () => {
            if (this.isPlayingOriginalAudio) {
                this.stopOriginalAudio(true);
            }
        };

        const btn = document.getElementById('btn-play-original-audio');
        if (btn) btn.innerHTML = '<i class="fa-solid fa-pause"></i> ' + (window.I18N.t('btn_pause_audio_file') || '⏸ PAUSE');
        this.showToast('▶ Playing original uploaded track');
    }

    stopOriginalAudio(resetOffset = false) {
        if (this.originalAudioSource) {
            try { this.originalAudioSource.stop(); } catch (e) {}
            this.originalAudioSource = null;
        }
        if (resetOffset) {
            this.originalAudioPauseOffset = 0;
        } else if (this.audioCtx && this.isPlayingOriginalAudio) {
            this.originalAudioPauseOffset = this.audioCtx.currentTime - this.originalAudioStartTime;
        }
        this.isPlayingOriginalAudio = false;

        const btn = document.getElementById('btn-play-original-audio');
        if (btn) btn.innerHTML = '<i class="fa-solid fa-play"></i> ' + (window.I18N.t('btn_play_audio_file') || '▶ PLAY MP3');
    }

    drawAudioWaveform() {
        const canvas = document.getElementById('audio-waveform-canvas');
        if (!canvas || !this.uploadedAudioBuffer) return;
        const ctx = canvas.getContext('2d');
        const w = canvas.width = canvas.clientWidth || 300;
        const h = canvas.height = canvas.clientHeight || 55;

        ctx.fillStyle = '#050714';
        ctx.fillRect(0, 0, w, h);

        const data = this.uploadedAudioBuffer.getChannelData(0);
        const step = Math.ceil(data.length / w);
        const amp = h / 2;

        ctx.strokeStyle = '#00f2fe';
        ctx.lineWidth = 1.5;
        ctx.beginPath();

        for (let i = 0; i < w; i++) {
            let min = 1.0, max = -1.0;
            for (let j = 0; j < step; j++) {
                const datum = data[(i * step) + j] || 0;
                if (datum < min) min = datum;
                if (datum > max) max = datum;
            }
            ctx.moveTo(i, (1 + min) * amp);
            ctx.lineTo(i, (1 + max) * amp);
        }
        ctx.stroke();
    }

    // ══════════════════════════════════════════════════════════════════════
    // ✨ TRUE AI REMAKE FROM UPLOADED AUDIO DNA
    // ══════════════════════════════════════════════════════════════════════

    remakeSongFromAudio(targetGenre = 'synthwave') {
        if (!this.uploadedAudioStats || !this.uploadedAudioStats.step16Low) {
            this.showToast('Please upload an MP3/WAV file first!');
            return;
        }

        this.initAudioContext();
        const stats = this.uploadedAudioStats;

        // 1. Generate the base stylistic arrangement for the selected genre
        this.generateInfiniteUniqueSong(targetGenre, 'balanced');

        // 2. Lock in the exact detected BPM from uploaded audio
        this.bpm = stats.bpm;
        const sliderBpm = document.getElementById('beat-bpm-slider');
        const bpmVal = document.getElementById('beat-bpm-val');
        if (sliderBpm) sliderBpm.value = this.bpm;
        if (bpmVal) bpmVal.textContent = this.bpm;

        // 3. OVERWRITE Pattern 1 (Verse) & Pattern 2 (Drop) with the REAL EXTRACTED AUDIO DNA!
        const patternsToRemake = [1, 2]; // Verse and Drop
        patternsToRemake.forEach(pIdx => {
            const tracks = this.patterns[pIdx];
            const kick = tracks.find(t => t.id === 'kick');
            const snare = tracks.find(t => t.id === 'snare');
            const hatC = tracks.find(t => t.id === 'hihat_c');
            const lead = tracks.find(t => t.id === 'lead');
            const bass = tracks.find(t => t.id === 'bass');

            if (kick && snare && stats.step16Low) {
                // Compute median low energy
                const avgLow = stats.step16Low.reduce((a, b) => a + b, 0) / 16;
                const avgMid = stats.step16Mid.reduce((a, b) => a + b, 0) / 16;

                for (let s = 0; s < 16; s++) {
                    // Real Kick placement where low energy is highest
                    kick.steps[s] = stats.step16Low[s] > (avgLow * 1.1) ? 1 : 0;

                    // Real Snare placement where mid energy/crunch is highest
                    snare.steps[s] = (s % 4 === 2 || (s % 8 === 4 && stats.step16Mid[s] > avgMid)) ? 1 : 0;

                    // Real Hat rhythmic pulse
                    if (hatC) hatC.steps[s] = (s % 2 === 0 || stats.step16Low[s] > avgLow) ? 1 : 0;

                    // Real Lead Synth: transfer the exact detected pitch of each step!
                    if (lead) {
                        lead.steps[s] = (s % 2 === 0 || stats.step16Low[s] > (avgLow * 0.9)) ? 1 : 0;
                        if (!lead.stepFreqs) lead.stepFreqs = new Array(16).fill(220);
                        lead.stepFreqs[s] = stats.step16Pitches[s] || 220;
                    }

                    // Bass follows root of pitch an octave lower
                    if (bass) {
                        bass.steps[s] = (kick.steps[s] === 1 || s % 4 === 0) ? 1 : 0;
                        if (!bass.stepFreqs) bass.stepFreqs = new Array(16).fill(110);
                        bass.stepFreqs[s] = (stats.step16Pitches[s] || 220) / 2;
                    }
                }

                // Guarantee solid anchor beats
                kick.steps[0] = 1;
                snare.steps[4] = 1;
                snare.steps[12] = 1;
            }
        });

        // Inject vocal drop phrase matching genre
        this.injectedVocal = {
            text: targetGenre.toUpperCase() + ' ' + stats.rootName + ' REMIX',
            style: 'daft',
            triggerMode: 'drop',
            enabled: true
        };
        const badge = document.getElementById('vocoder-status-badge');
        if (badge) badge.style.display = 'inline-flex';

        this.renderGrid();
        if (!this.isPlaying) this.togglePlay();

        this.showToast(window.I18N.t('msg_audio_remade') + ` (${stats.bpm} BPM, ${stats.key})`);
    }

    // ══════════════════════════════════════════════════════════════════════
    // 🎛️ 4-PAD LIVE AUDIO SAMPLER
    // ══════════════════════════════════════════════════════════════════════

    createAudioSampleSlices() {
        if (!this.uploadedAudioBuffer) return;
        const dur = this.uploadedAudioBuffer.duration;
        this.sampleSlices = [
            { start: 0, length: 1.2, name: 'Intro' },
            { start: Math.max(0, dur * 0.25), length: 1.2, name: 'Hook' },
            { start: Math.max(0, dur * 0.50), length: 1.5, name: 'Drop' },
            { start: Math.max(0, dur * 0.75), length: 1.2, name: 'Vocal' }
        ];
    }

    triggerAudioSampleSlice(index) {
        this.initAudioContext();
        if (!this.audioCtx) return;
        const now = this.audioCtx.currentTime;

        // Visual flash on pad
        const pad = document.getElementById('sampler-pad-' + (index + 1));
        if (pad) {
            pad.classList.add('flash');
            setTimeout(() => pad.classList.remove('flash'), 200);
        }

        // IF USER LOADED AN MP3: Play the slice from the MP3!
        if (this.uploadedAudioBuffer && this.sampleSlices[index]) {
            try {
                const slice = this.sampleSlices[index];
                const src = this.audioCtx.createBufferSource();
                src.buffer = this.uploadedAudioBuffer;

                const gain = this.audioCtx.createGain();
                gain.gain.setValueAtTime(1.0, now);
                gain.gain.setValueAtTime(1.0, now + slice.length - 0.08);
                gain.gain.exponentialRampToValueAtTime(0.01, now + slice.length);

                src.connect(gain);
                gain.connect(this.getMasterOutput());

                src.start(now, slice.start, slice.length);
                this.showToast(window.I18N.t('msg_sampler_ready') + ` [Slice ${index + 1}]`);
                return;
            } catch (e) {
                console.warn('Buffer slice error:', e);
            }
        }

        // IF NO MP3 LOADED YET: Play awesome synthesized cyber demo sample!
        try {
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            const filter = this.audioCtx.createBiquadFilter();

            if (index === 0) {
                // Pad 1: Seismic Sub Drop
                osc.type = 'sine';
                osc.frequency.setValueAtTime(160, now);
                osc.frequency.exponentialRampToValueAtTime(35, now + 0.35);
                gain.gain.setValueAtTime(0.9, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
            } else if (index === 1) {
                // Pad 2: Synth Brass Chord Stab
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(330, now);
                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(3200, now);
                filter.frequency.exponentialRampToValueAtTime(400, now + 0.3);
                gain.gain.setValueAtTime(0.7, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            } else if (index === 2) {
                // Pad 3: Reverse Cyber Laser Riser
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(80, now);
                osc.frequency.exponentialRampToValueAtTime(1200, now + 0.28);
                gain.gain.setValueAtTime(0.6, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
            } else {
                // Pad 4: Robotic Voice Zap
                osc.type = 'square';
                osc.frequency.setValueAtTime(440, now);
                osc.frequency.setValueAtTime(880, now + 0.08);
                osc.frequency.setValueAtTime(220, now + 0.16);
                gain.gain.setValueAtTime(0.5, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
            }

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.getMasterOutput());

            osc.start(now);
            osc.stop(now + 0.4);

            this.showToast(window.I18N.t('msg_sampler_demo') || '⚡ Demo Sample triggered! (Upload an MP3 to sample your song)');
        } catch (err) {
            console.error('Demo sample error:', err);
        }
    }

    // ══════════════════════════════════════════════════════════════════════
    // 🧬 REAL AUDIO DNA MORPH
    // ══════════════════════════════════════════════════════════════════════

    applyDnaMorph(value) {
        this.dnaMorphValue = Math.max(0, Math.min(100, value));
        const valDna = document.getElementById('dna-morph-val');
        if (valDna) {
            if (this.dnaMorphValue < 35) valDna.textContent = `${this.dnaMorphValue}% Raw MP3 Groove`;
            else if (this.dnaMorphValue > 65) valDna.textContent = `${this.dnaMorphValue}% Cyber Synth Overdrive`;
            else valDna.textContent = `${this.dnaMorphValue}% Balanced Hybrid`;
        }

        // Morph filter and synth resonance live
        const norm = this.dnaMorphValue / 100;
        this.filterCutoff = Math.round(1200 + norm * 3500);
        const sliderFilter = document.getElementById('beat-filter-slider');
        if (sliderFilter) sliderFilter.value = this.filterCutoff;

        // If playing original MP3 in background, crossfade volume smoothly
        if (this.originalAudioSource && this.originalAudioSource.gainNode) {
            this.originalAudioSource.gainNode.gain.value = (1 - norm) * 0.9;
        }
    }

    // ══════════════════════════════════════════════════════════════════════
    // 🎤 BULLETPROOF MIC BEATBOX-TO-BEAT (PCM SCRIPT PROCESSOR)
    // ══════════════════════════════════════════════════════════════════════

    async recordAndTranscribeBeatbox() {
        this.initAudioContext();
        if (this.isRecordingBeatbox) return;

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            this.showToast('❌ Microphone API not available.');
            return;
        }

        const btn = document.getElementById('btn-ai-mic-beatbox');
        this.isRecordingBeatbox = true;
        this.showToast('🔴 Recording 3s of beatbox... (Make sounds into your mic now!)');

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const sampleRate = this.audioCtx.sampleRate;
            const targetDuration = 3.0;
            const totalSamplesNeeded = Math.floor(sampleRate * targetDuration);
            const recordedData = new Float32Array(totalSamplesNeeded);
            let recordedCount = 0;

            const micSource = this.audioCtx.createMediaStreamSource(stream);
            // Use standard ScriptProcessorNode: 100% works across all browsers without codecs!
            const processor = this.audioCtx.createScriptProcessor(2048, 1, 1);

            let remainingSec = 3;
            if (btn) btn.innerHTML = `<i class="fa-solid fa-circle" style="color:#ff0055;"></i> RECORDING (${remainingSec}s)...`;

            const countdownInterval = setInterval(() => {
                remainingSec--;
                if (remainingSec > 0 && btn) {
                    btn.innerHTML = `<i class="fa-solid fa-circle" style="color:#ff0055;"></i> RECORDING (${remainingSec}s)...`;
                }
            }, 1000);

            processor.onaudioprocess = (e) => {
                const input = e.inputBuffer.getChannelData(0);
                for (let i = 0; i < input.length && recordedCount < totalSamplesNeeded; i++) {
                    recordedData[recordedCount++] = input[i];
                }

                if (recordedCount >= totalSamplesNeeded) {
                    clearInterval(countdownInterval);
                    processor.disconnect();
                    micSource.disconnect();
                    stream.getTracks().forEach(t => t.stop());
                    this.isRecordingBeatbox = false;
                    if (btn) btn.innerHTML = '<i class="fa-solid fa-microphone"></i> ' + (window.I18N.t('btn_mic_beatbox') || '🎤 MIC BEATBOX');

                    // Transcribe the raw PCM data directly!
                    this.transcribeBeatboxPCM(recordedData, sampleRate);
                }
            };

            micSource.connect(processor);
            processor.connect(this.audioCtx.destination);
        } catch (err) {
            console.error('Microphone error:', err);
            this.isRecordingBeatbox = false;
            if (btn) btn.innerHTML = '<i class="fa-solid fa-microphone"></i> ' + (window.I18N.t('btn_mic_beatbox') || '🎤 MIC BEATBOX');
            this.showToast('❌ Microphone error: ' + (err.message || 'Permission denied'));
        }
    }

    transcribeBeatboxPCM(channel, sampleRate) {
        if (!channel || channel.length === 0) return;

        const samplesPerStep = Math.floor(channel.length / 16);
        const kick = this.activeTracks.find(t => t.id === 'kick');
        const snare = this.activeTracks.find(t => t.id === 'snare');
        const hat = this.activeTracks.find(t => t.id === 'hihat_c');

        if (kick) kick.steps.fill(0);
        if (snare) snare.steps.fill(0);
        if (hat) hat.steps.fill(0);

        let kickCount = 0;
        let snareCount = 0;
        let hatCount = 0;

        for (let s = 0; s < 16; s++) {
            const start = s * samplesPerStep;
            const end = start + samplesPerStep;

            let energy = 0;
            let zeroCross = 0;
            let prev = 0;

            for (let i = start; i < end; i += 2) {
                const val = channel[i] || 0;
                if ((val >= 0 && prev < 0) || (val < 0 && prev >= 0)) zeroCross++;
                energy += Math.abs(val);
                prev = val;
            }

            const stepCount = (end - start) / 2;
            const avgEnergy = energy / stepCount;
            const zcRatio = zeroCross / stepCount;

            // Classify based on energy and spectral zero-crossing density
            if (avgEnergy > 0.02) {
                if (zcRatio < 0.18) {
                    // Low boom / thud -> Kick
                    if (kick) { kick.steps[s] = 1; kickCount++; }
                } else if (zcRatio >= 0.18 && zcRatio < 0.42) {
                    // Mid-frequency crunch -> Snare
                    if (snare) { snare.steps[s] = 1; snareCount++; }
                } else {
                    // High hiss -> Hi-Hat
                    if (hat) { hat.steps[s] = 1; hatCount++; }
                }
            }
        }

        // Guarantee solid rhythmic structure if quiet
        if (kickCount === 0 && kick) { kick.steps[0] = 1; kick.steps[8] = 1; kickCount = 2; }
        if (snareCount === 0 && snare) { snare.steps[4] = 1; snare.steps[12] = 1; snareCount = 2; }

        this.renderGrid();
        if (!this.isPlaying) this.togglePlay();
        this.showToast(window.I18N.t('msg_beatbox_quantized') + ` (${kickCount} Kicks, ${snareCount} Snares, ${hatCount} Hats)`);
    }

    // ══════════════════════════════════════════════════════════════════════
    // 🌐 3D HOLOGRAPHIC CYBER TUNNEL VISUALIZER
    // ══════════════════════════════════════════════════════════════════════

    render3DCyberVisualizer(ctx, dataArray, timeArray, w, h) {
        ctx.fillStyle = 'rgba(5, 7, 20, 0.75)';
        ctx.fillRect(0, 0, w, h);

        const centerX = w / 2;
        const centerY = h / 2;
        const bassLevel = (dataArray[0] + dataArray[1] + dataArray[2]) / (3 * 255);
        const midLevel = (dataArray[10] + dataArray[11] + dataArray[12]) / (3 * 255);

        // 1. Vanishing Point 3D Tunnel Grid Lines
        ctx.strokeStyle = `rgba(0, 242, 254, ${0.25 + midLevel * 0.4})`;
        ctx.lineWidth = 1;
        const numRays = 14;

        for (let i = 0; i < numRays; i++) {
            const angle = (i / numRays) * Math.PI * 2 + (Date.now() * 0.0004);
            const edgeX = centerX + Math.cos(angle) * (w * 0.9);
            const edgeY = centerY + Math.sin(angle) * (h * 0.9);

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(edgeX, edgeY);
            ctx.stroke();
        }

        // 2. Pulsing Concentric Cyber Tunnel Rings
        const ringTime = (Date.now() * 0.08) % 100;
        for (let r = ringTime; r < w * 0.7; r += 28) {
            const ringAlpha = (1 - (r / (w * 0.7))) * (0.3 + bassLevel * 0.7);
            ctx.strokeStyle = (r % 56 < 28) ? `rgba(255, 0, 127, ${ringAlpha})` : `rgba(0, 242, 254, ${ringAlpha})`;
            ctx.lineWidth = 1.5;

            ctx.beginPath();
            ctx.ellipse(centerX, centerY, r, r * 0.45, 0, 0, Math.PI * 2);
            ctx.stroke();
        }

        // 3. Central Holographic Audio Core Sphere
        const coreRadius = Math.max(8, 12 + bassLevel * 24);
        const grad = ctx.createRadialGradient(centerX, centerY, 2, centerX, centerY, coreRadius * 2);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.3, '#ff007f');
        grad.addColorStop(0.7, '#00f2fe');
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, coreRadius * 1.8, 0, Math.PI * 2);
        ctx.fill();

        // 4. Equalizer Pillars on the Sides
        const pillarCount = 8;
        const pillarW = 6;
        for (let p = 0; p < pillarCount; p++) {
            const val = (dataArray[p * 3] / 255) * (h * 0.4);
            ctx.fillStyle = '#00f2fe';
            ctx.fillRect(15 + p * 9, (centerY - val), pillarW, val * 2);
            ctx.fillStyle = '#ff007f';
            ctx.fillRect(w - 15 - p * 9 - pillarW, (centerY - val), pillarW, val * 2);
        }
    }

            initMasteringRack() {
        if (!this.audioCtx) return;
        const lowShelf = this.audioCtx.createBiquadFilter();
        lowShelf.type = 'lowshelf';
        lowShelf.frequency.value = 100;
        lowShelf.gain.value = 1.5;

        const highShelf = this.audioCtx.createBiquadFilter();
        highShelf.type = 'highshelf';
        highShelf.frequency.value = 9000;
        highShelf.gain.value = 3.0;

        const comp = this.audioCtx.createDynamicsCompressor();
        comp.threshold.value = -24;
        comp.knee.value = 12;
        comp.ratio.value = 8;
        comp.attack.value = 0.003;
        comp.release.value = 0.25;

        lowShelf.connect(highShelf);
        highShelf.connect(comp);

        this.masteringNodes = {
            input: lowShelf,
            output: comp,
            lowShelf,
            highShelf,
            comp
        };

        this.applyMasteringProfile(this.masteringProfile || 'radio');
    }

    applyMasteringProfile(profile) {
        this.masteringProfile = profile;
        if (!this.masteringNodes || !this.audioCtx) return;
        const { lowShelf, highShelf, comp } = this.masteringNodes;

        if (profile === 'radio') {
            lowShelf.frequency.value = 100;
            lowShelf.gain.value = 1.5;
            highShelf.frequency.value = 9000;
            highShelf.gain.value = 3.0;
            comp.threshold.value = -24;
            comp.ratio.value = 8;
            comp.attack.value = 0.003;
            comp.release.value = 0.25;
        } else if (profile === 'club') {
            lowShelf.frequency.value = 75;
            lowShelf.gain.value = 5.5; // Seismic sub boost
            highShelf.frequency.value = 8000;
            highShelf.gain.value = 1.5;
            comp.threshold.value = -20;
            comp.ratio.value = 6;
            comp.attack.value = 0.005;
            comp.release.value = 0.3;
        } else if (profile === 'imax') {
            lowShelf.frequency.value = 90;
            lowShelf.gain.value = 2.0;
            highShelf.frequency.value = 10500;
            highShelf.gain.value = 4.5; // Space shimmer
            comp.threshold.value = -18;
            comp.ratio.value = 4;
            comp.attack.value = 0.01;
            comp.release.value = 0.35;
        } else if (profile === 'tape') {
            lowShelf.frequency.value = 120;
            lowShelf.gain.value = 3.0; // Warm analog body
            highShelf.frequency.value = 6500;
            highShelf.gain.value = -3.5; // Warm analog high rolloff
            comp.threshold.value = -16;
            comp.ratio.value = 3.5;
            comp.attack.value = 0.008;
            comp.release.value = 0.2;
        } else {
            // Off / Clean bypass
            lowShelf.gain.value = 0;
            highShelf.gain.value = 0;
            comp.threshold.value = 0;
            comp.ratio.value = 1;
        }

        const sel = document.getElementById('beat-select-mastering');
        if (sel) sel.value = profile;
        this.showToast(window.I18N.t('msg_mastering_applied') + profile.toUpperCase());
    }

    // ══════════════════════════════════════════════════════════════════════
    // 💬 AI PROMPT-TO-SONG COMPOSER
    // ══════════════════════════════════════════════════════════════════════

    composeFromTextPrompt(promptText) {
        if (!promptText) return;
        this.initAudioContext();

        const p = promptText.toLowerCase();
        let mood = 'cyberpunk';
        let vocalPhrase = 'CYBER ACTIVATED';

        if (p.includes('tokyo') || p.includes('drift') || p.includes('race') || p.includes('car') || p.includes('phonk')) {
            mood = 'phonk';
            vocalPhrase = 'TOKYO NIGHT DRIFT';
        } else if (p.includes('dungeon') || p.includes('arcade') || p.includes('16-bit') || p.includes('8-bit') || p.includes('pixel') || p.includes('game')) {
            mood = 'club';
            vocalPhrase = '16 BIT POWER LEVEL MAXIMUM';
        } else if (p.includes('space') || p.includes('cosmic') || p.includes('galaxy') || p.includes('star') || p.includes('deep') || p.includes('ambient')) {
            mood = 'cinema';
            vocalPhrase = 'DEEP SPACE TELEMETRY ACTIVE';
        } else if (p.includes('miami') || p.includes('sunset') || p.includes('1984') || p.includes('retro') || p.includes('synthwave') || p.includes('beach')) {
            mood = 'synthwave';
            vocalPhrase = 'MIAMI HORIZON 1984';
        } else if (p.includes('battle') || p.includes('boss') || p.includes('fight') || p.includes('war') || p.includes('mainframe')) {
            mood = 'cyberpunk';
            vocalPhrase = 'SYSTEM OVERRIDE ACTIVATED';
        } else {
            mood = 'surprise';
            vocalPhrase = promptText.slice(0, 32).toUpperCase();
        }

        // Generate full song using AI Maestro
        this.generateInfiniteUniqueSong(mood, 'balanced');

        // Automatically inject matching lyrics into Drop
        this.injectedVocal = { text: vocalPhrase, style: 'daft', triggerMode: 'drop', enabled: true };
        const badge = document.getElementById('vocoder-status-badge');
        if (badge) badge.style.display = 'inline-flex';

        const vocoderInput = document.getElementById('custom-vocoder-text');
        if (vocoderInput) vocoderInput.value = vocalPhrase;

        this.showToast(window.I18N.t('msg_prompt_composed') + '"' + promptText + '"');
    }

    // ══════════════════════════════════════════════════════════════════════
    // 💥 AI BUILDUP & DROP GENERATOR
    // ══════════════════════════════════════════════════════════════════════

    generateBuildupAndDrop() {
        this.initAudioContext();

        // 1. Build tension on Pattern 1 (Verse / Buildup)
        const verseTracks = this.patterns[1];
        const snare = verseTracks.find(t => t.id === 'snare');
        const kick = verseTracks.find(t => t.id === 'kick');
        const laser = verseTracks.find(t => t.id === 'sfx_laser');
        const hihatC = verseTracks.find(t => t.id === 'hihat_c');

        if (snare) {
            // Accelerating snare crescendo: 8 (quarter), 10, 11 (eighths), 12, 13, 14 (sixteenths!)
            snare.steps[8] = 1;
            snare.steps[10] = 1; snare.steps[11] = 1;
            snare.steps[12] = 1; snare.steps[13] = 1; snare.steps[14] = 1;
            snare.steps[15] = 0; // Dramatic silence before drop
        }

        if (kick) {
            kick.steps[0] = 1; kick.steps[4] = 1; kick.steps[8] = 1; kick.steps[10] = 1; kick.steps[12] = 1; kick.steps[14] = 1;
            kick.steps[15] = 0; // Cut on 15
        }

        if (laser) {
            laser.steps[8] = 1; laser.steps[12] = 1; laser.steps[14] = 1;
            laser.steps[15] = 0;
        }

        if (hihatC) {
            hihatC.steps[15] = 0;
        }

        // Mute bass & leads on step 15 of Pattern 1 for maximum dramatic punch
        const bass = verseTracks.find(t => t.id === 'bass');
        if (bass) bass.steps[15] = 0;
        const leadHigh = verseTracks.find(t => t.id === 'lead_high');
        if (leadHigh) leadHigh.steps[15] = 0;

        // 2. Ensure Pattern 2 (Drop) explodes with maximum energy
        const dropTracks = this.patterns[2];
        const dropKick = dropTracks.find(t => t.id === 'kick');
        const dropClap = dropTracks.find(t => t.id === 'clap');
        const dropImpact = dropTracks.find(t => t.id === 'sfx_impact');
        const dropBass = dropTracks.find(t => t.id === 'bass');

        if (dropKick) {
            dropKick.steps[0] = 1; dropKick.steps[4] = 1; dropKick.steps[8] = 1; dropKick.steps[12] = 1;
        }
        if (dropClap) {
            dropClap.steps[4] = 1; dropClap.steps[12] = 1;
        }
        if (dropImpact) {
            dropImpact.steps[0] = 1;
        }
        if (dropBass) {
            dropBass.steps[0] = 1; dropBass.steps[2] = 1; dropBass.steps[4] = 1; dropBass.steps[6] = 1;
        }

        // 3. Inject "3, 2, 1, DROP!" vocoder countdown
        this.injectedVocal = { text: 'THREE TWO ONE DROP THE BASS', style: 'daft', triggerMode: 'drop', enabled: true };
        const badge = document.getElementById('vocoder-status-badge');
        if (badge) badge.style.display = 'inline-flex';

        // Switch to Pattern 1 and trigger live
        this.currentPatternIndex = 1;
        this.currentStep = 0;
        this.playMode = 'song';
        document.querySelectorAll('.pattern-tab').forEach((t, i) => {
            t.classList.toggle('active', i === 1);
        });

        this.renderGrid();
        if (!this.isPlaying) this.togglePlay();
        this.showToast(window.I18N.t('msg_buildup_created'));
    }

    // ══════════════════════════════════════════════════════════════════════
    // 🥁 AI TAP-TO-RHYTHM & SMART QUANTIZER
    // ══════════════════════════════════════════════════════════════════════

    recordTapRhythm() {
        this.initAudioContext();
        const now = Date.now();

        // Reset if inactive for more than 2.5 seconds
        if (this.tapHistory.length > 0 && (now - this.tapHistory[this.tapHistory.length - 1]) > 2500) {
            this.tapHistory = [];
        }

        this.tapHistory.push(now);

        // Sound a crisp click feedback blip
        if (this.audioCtx) {
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            osc.frequency.setValueAtTime(880, this.audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(440, this.audioCtx.currentTime + 0.05);
            gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.05);
            osc.connect(gain);
            gain.connect(this.masterBus || this.audioCtx.destination);
            osc.start();
            osc.stop(this.audioCtx.currentTime + 0.05);
        }

        const badge = document.getElementById('tap-bpm-counter');

        if (this.tapHistory.length >= 2) {
            const deltas = [];
            for (let i = 1; i < this.tapHistory.length; i++) {
                deltas.push(this.tapHistory[i] - this.tapHistory[i - 1]);
            }
            const avgDelta = deltas.reduce((a, b) => a + b, 0) / deltas.length;
            const computedBPM = Math.round(60000 / avgDelta);
            const clampedBPM = Math.min(180, Math.max(70, computedBPM));

            this.bpm = clampedBPM;
            const sliderBpm = document.getElementById('beat-bpm-slider');
            const bpmVal = document.getElementById('beat-bpm-val');
            if (sliderBpm) sliderBpm.value = this.bpm;
            if (bpmVal) bpmVal.textContent = this.bpm;

            if (badge) badge.textContent = this.bpm + ' BPM';

            if (this.tapHistory.length >= 4) {
                // Quantize tap rhythm into active Kick & Snare tracks
                this.quantizeTapsToBeat(deltas, avgDelta);
                this.tapHistory = [];
            }
        } else {
            if (badge) badge.textContent = 'TAP ' + this.tapHistory.length + '/4';
        }
    }

    quantizeTapsToBeat(deltas, avgDelta) {
        const kick = this.activeTracks.find(t => t.id === 'kick');
        const snare = this.activeTracks.find(t => t.id === 'snare');
        if (!kick) return;

        kick.steps.fill(0);
        if (snare) snare.steps.fill(0);

        // Map four tap intervals into standard 16-step grid
        kick.steps[0] = 1;
        if (snare) snare.steps[4] = 1;
        kick.steps[8] = 1;
        if (snare) snare.steps[12] = 1;

        // If fast taps detected, add syncopated ghost hits
        if (deltas.length > 2 && deltas[1] < avgDelta * 0.8) {
            kick.steps[6] = 1;
            if (snare) snare.steps[14] = 1;
        }

        this.renderGrid();
        this.showToast(window.I18N.t('msg_rhythm_quantized') + ' (' + this.bpm + ' BPM)');
    }

        getScaleFrequencies(rootKey, scaleType) {
        const ROOT_SEMITONES = {
            'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5,
            'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11
        };

        const SCALES = {
            aeolian: [0, 2, 3, 5, 7, 8, 10],       // Natural minor
            dorian: [0, 2, 3, 5, 7, 9, 10],        // Futuristic sci-fi funk
            phrygian: [0, 1, 3, 5, 7, 8, 10],      // Dark aggressive cyber
            phonk_penta: [0, 3, 5, 7, 10],         // Memphis drift phonk
            lydian_major: [0, 2, 4, 6, 7, 9, 11],  // Uplifting heroic major
            ambient_space: [0, 2, 4, 7, 9]         // Cosmic open pentatonic
        };

        const rootSemi = ROOT_SEMITONES[rootKey] !== undefined ? ROOT_SEMITONES[rootKey] : 9; // Default A
        const intervals = SCALES[scaleType] || SCALES.aeolian;

        // Base C1 = 32.703 Hz
        const baseC1 = 32.703;
        const rootC1 = baseC1 * Math.pow(2, rootSemi / 12);

        // Generate frequencies across 4 octaves (Bass: Octave 1, Mid: Octave 2-3, Lead: Octave 3-4)
        const scalePool = [];
        for (let oct = 0; oct < 4; oct++) {
            intervals.forEach(semi => {
                const freq = rootC1 * Math.pow(2, oct + semi / 12);
                scalePool.push(Math.round(freq * 100) / 100);
            });
        }
        return scalePool;
    }

    generateInfiniteUniqueSong(mood = 'surprise', density = 'balanced') {
        this.initAudioContext();

        const ROOT_KEYS = ['C', 'D', 'D#', 'E', 'F', 'F#', 'G', 'A', 'A#'];
        const root = ROOT_KEYS[Math.floor(Math.random() * ROOT_KEYS.length)];

        let chosenMood = mood;
        if (mood === 'surprise') {
            const moods = ['cyberpunk', 'synthwave', 'phonk', 'cinema', 'club'];
            chosenMood = moods[Math.floor(Math.random() * moods.length)];
        }

        const MOOD_CONFIGS = {
            cyberpunk: { scale: 'phrygian', bpms: [130, 134, 138], filter: 2800 },
            synthwave: { scale: 'aeolian', bpms: [118, 120, 124], filter: 2600 },
            phonk: { scale: 'phonk_penta', bpms: [138, 142, 145], filter: 3000 },
            cinema: { scale: 'dorian', bpms: [95, 105, 112], filter: 2100 },
            club: { scale: 'dorian', bpms: [126, 128, 132], filter: 3400 }
        };

        const config = MOOD_CONFIGS[chosenMood] || MOOD_CONFIGS.synthwave;
        this.bpm = config.bpms[Math.floor(Math.random() * config.bpms.length)];
        this.filterCutoff = config.filter;

        const sliderBpm = document.getElementById('beat-bpm-slider');
        const bpmVal = document.getElementById('beat-bpm-val');
        const sliderFilter = document.getElementById('beat-filter-slider');
        if (sliderBpm) sliderBpm.value = this.bpm;
        if (bpmVal) bpmVal.textContent = this.bpm;
        if (sliderFilter) sliderFilter.value = this.filterCutoff;

        // Generate coherent musical scale pool
        const scalePool = this.getScaleFrequencies(root, config.scale);

        // Pick 4 harmonic progression chord roots for the 4 measures
        const numDegrees = config.scale === 'phonk_penta' || config.scale === 'ambient_space' ? 5 : 7;
        const progOptions = [
            [0, Math.floor(numDegrees * 0.7), Math.floor(numDegrees * 0.5), Math.floor(numDegrees * 0.85)],
            [0, Math.floor(numDegrees * 0.5), Math.floor(numDegrees * 0.7), 0],
            [0, 2 % numDegrees, 4 % numDegrees, Math.floor(numDegrees * 0.7)],
            [0, Math.floor(numDegrees * 0.85), Math.floor(numDegrees * 0.7), Math.floor(numDegrees * 0.5)]
        ];
        const progression = progOptions[Math.floor(Math.random() * progOptions.length)];

        // Generate 4 cohesive sections: Intro (0), Verse (1), Drop (2), Outro (3)
        [0, 1, 2, 3].forEach(pIdx => {
            const tracks = this.patterns[pIdx];
            tracks.forEach(t => t.steps.fill(0));

            const isIntro = (pIdx === 0);
            const isVerse = (pIdx === 1);
            const isDrop = (pIdx === 2);
            const isOutro = (pIdx === 3);

            // 1. Kick Rhythm
            const kick = tracks.find(t => t.id === 'kick');
            if (kick) {
                if (isIntro) {
                    kick.steps[0] = 1; kick.steps[8] = 1;
                } else if (isDrop) {
                    // Full 4-on-the-floor festival drive
                    kick.steps[0] = 1; kick.steps[4] = 1; kick.steps[8] = 1; kick.steps[12] = 1;
                    if (chosenMood === 'phonk' || chosenMood === 'cyberpunk') {
                        kick.steps[2] = 1; kick.steps[10] = 1;
                    }
                } else if (isVerse) {
                    kick.steps[0] = 1; kick.steps[6] = 1; kick.steps[8] = 1;
                } else {
                    kick.steps[0] = 1;
                }
            }

            // 2. Snare / Clap
            const snare = tracks.find(t => t.id === 'snare');
            const clap = tracks.find(t => t.id === 'clap');
            if (snare && (isVerse || isDrop)) {
                snare.steps[4] = 1; snare.steps[12] = 1;
                if (isDrop && Math.random() > 0.4) { snare.steps[14] = 1; snare.steps[15] = 1; } // Snare roll
            }
            if (clap && isDrop) {
                clap.steps[4] = 1; clap.steps[12] = 1;
            }

            // 3. Hi-Hats
            const hihatC = tracks.find(t => t.id === 'hihat_c');
            const hihatO = tracks.find(t => t.id === 'hihat_o');
            if (hihatC) {
                if (isIntro) {
                    for (let s = 2; s < 16; s += 4) hihatC.steps[s] = 1;
                } else {
                    const stepInterval = (density === 'virtuoso' || chosenMood === 'phonk') ? 1 : 2;
                    for (let s = 0; s < 16; s += stepInterval) hihatC.steps[s] = 1;
                }
            }
            if (hihatO && (isVerse || isDrop)) {
                hihatO.steps[2] = 1; hihatO.steps[6] = 1; hihatO.steps[10] = 1; hihatO.steps[14] = 1;
            }

            // 4. Bass Line (Octave 1 scale tones mapped across progression)
            const bass = tracks.find(t => t.id === 'bass');
            if (bass) {
                bass.stepFreqs = new Array(16);
                for (let m = 0; m < 4; m++) {
                    const rootDeg = progression[m];
                    const bassFreq = scalePool[rootDeg] || scalePool[0];
                    for (let s = 0; s < 4; s++) {
                        const stepIdx = m * 4 + s;
                        bass.stepFreqs[stepIdx] = bassFreq;
                        if (!isIntro) {
                            if (isDrop || s === 0 || s === 2) bass.steps[stepIdx] = 1;
                        } else if (s === 0) {
                            bass.steps[stepIdx] = 1;
                        }
                    }
                }
            }

            // 5. Lead High & Mid Melodies (Procedural Call & Response Contours)
            const leadHigh = tracks.find(t => t.id === 'lead_high');
            const leadMid = tracks.find(t => t.id === 'lead_mid');
            if (leadHigh) {
                leadHigh.stepFreqs = new Array(16);
                const leadOctaveStart = numDegrees * 2;
                for (let m = 0; m < 4; m++) {
                    const chordRoot = progression[m];
                    const chordNotes = [
                        scalePool[leadOctaveStart + chordRoot] || scalePool[leadOctaveStart],
                        scalePool[leadOctaveStart + ((chordRoot + 2) % numDegrees)] || scalePool[leadOctaveStart + 2],
                        scalePool[leadOctaveStart + ((chordRoot + 4) % numDegrees)] || scalePool[leadOctaveStart + 4],
                        scalePool[leadOctaveStart + numDegrees] || scalePool[leadOctaveStart]
                    ];

                    for (let s = 0; s < 4; s++) {
                        const stepIdx = m * 4 + s;
                        const noteChoice = chordNotes[s % chordNotes.length];
                        leadHigh.stepFreqs[stepIdx] = noteChoice;

                        if (isDrop) {
                            // High energy melody on drop
                            if (density === 'virtuoso' || s === 0 || s === 2 || (s === 3 && m % 2 === 1)) {
                                leadHigh.steps[stepIdx] = 1;
                            }
                        } else if (isVerse && (s === 1 || s === 3)) {
                            leadHigh.steps[stepIdx] = 1;
                        } else if (isIntro && s === 2 && m % 2 === 0) {
                            leadHigh.steps[stepIdx] = 1;
                        }
                    }
                }
            }

            if (leadMid && (isVerse || isDrop)) {
                leadMid.stepFreqs = new Array(16);
                const midOctaveStart = numDegrees;
                for (let m = 0; m < 4; m++) {
                    const chordRoot = progression[m];
                    const chordTone = scalePool[midOctaveStart + ((chordRoot + 2) % numDegrees)] || scalePool[midOctaveStart];
                    for (let s = 0; s < 4; s++) {
                        const stepIdx = m * 4 + s;
                        leadMid.stepFreqs[stepIdx] = chordTone;
                        if (s === 0 || s === 2) leadMid.steps[stepIdx] = 1;
                    }
                }
            }

            // 6. SFX Lasers and Impacts
            const laser = tracks.find(t => t.id === 'sfx_laser');
            const impact = tracks.find(t => t.id === 'sfx_impact');
            if (impact && (isIntro || isDrop)) impact.steps[0] = 1;
            if (laser && isDrop) { laser.steps[8] = 1; laser.steps[14] = 1; }
        });

        // Set to Intro and refresh display
        this.currentPatternIndex = 0;
        this.currentStep = 0;
        this.patternLoopCount = 0;
        this.playMode = 'song';

        const playModeSel = document.getElementById('beat-select-play-mode');
        if (playModeSel) playModeSel.value = 'song';

        document.querySelectorAll('.pattern-tab').forEach((t, i) => {
            t.classList.toggle('active', i === 0);
        });

        this.renderGrid();
        this.showToast(window.I18N.t('msg_ai_song_generated') + ' (' + root + ' ' + config.scale.toUpperCase() + ')');
    }

    rollUniqueMelody(mood = 'surprise', density = 'balanced') {
        this.initAudioContext();
        const ROOT_KEYS = ['C', 'D', 'D#', 'E', 'F', 'F#', 'G', 'A', 'A#'];
        const root = ROOT_KEYS[Math.floor(Math.random() * ROOT_KEYS.length)];
        const scalePool = this.getScaleFrequencies(root, 'aeolian');
        const numDegrees = 7;

        const bass = this.activeTracks.find(t => t.id === 'bass');
        const leadHigh = this.activeTracks.find(t => t.id === 'lead_high');
        const leadMid = this.activeTracks.find(t => t.id === 'lead_mid');

        const prog = [0, Math.floor(Math.random() * 5), Math.floor(Math.random() * 6), Math.floor(Math.random() * 4)];

        if (bass) {
            bass.steps.fill(0);
            bass.stepFreqs = new Array(16);
            for (let m = 0; m < 4; m++) {
                const f = scalePool[prog[m]] || scalePool[0];
                for (let s = 0; s < 4; s++) {
                    bass.stepFreqs[m * 4 + s] = f;
                    if (s === 0 || s === 2) bass.steps[m * 4 + s] = 1;
                }
            }
        }

        if (leadHigh) {
            leadHigh.steps.fill(0);
            leadHigh.stepFreqs = new Array(16);
            for (let m = 0; m < 4; m++) {
                const rootDeg = prog[m];
                for (let s = 0; s < 4; s++) {
                    const stepIdx = m * 4 + s;
                    const deg = (rootDeg + (s % 2 === 0 ? 0 : 2) + Math.floor(Math.random() * 3)) % numDegrees;
                    leadHigh.stepFreqs[stepIdx] = scalePool[numDegrees * 2 + deg] || scalePool[numDegrees * 2];
                    if (Math.random() > 0.35) leadHigh.steps[stepIdx] = 1;
                }
            }
        }

        if (leadMid) {
            leadMid.steps.fill(0);
            leadMid.stepFreqs = new Array(16);
            for (let m = 0; m < 4; m++) {
                const chordNote = scalePool[numDegrees + ((prog[m] + 4) % numDegrees)];
                for (let s = 0; s < 4; s++) {
                    leadMid.stepFreqs[m * 4 + s] = chordNote;
                    if (s === 0) leadMid.steps[m * 4 + s] = 1;
                }
            }
        }

        this.renderGrid();
        this.showToast(window.I18N.t('msg_ai_melody_rolled'));
    }

    mutateCurrentMelody() {
        this.initAudioContext();
        let mutatedCount = 0;
        this.activeTracks.filter(t => t.type === 'melody').forEach(track => {
            for (let s = 0; s < 16; s++) {
                if (Math.random() < 0.25) {
                    track.steps[s] = track.steps[s] ? 0 : 1;
                    if (track.stepFreqs && track.stepFreqs[s]) {
                        // Shift frequency up or down by 3rd or octave
                        const shift = Math.random() > 0.5 ? 1.2599 : 0.8408;
                        track.stepFreqs[s] = Math.round(track.stepFreqs[s] * shift * 100) / 100;
                    }
                    mutatedCount++;
                }
            }
        });
        this.renderGrid();
        this.showToast(window.I18N.t('msg_ai_melody_mutated'));
    }

        async getVocalAudioBuffer(text, style = 'daft') {
        if (!text) return null;
        if (typeof generateSpeech !== 'function') {
            try {
                await new Promise((resolve) => {
                    const script = document.createElement('script');
                    script.src = 'speakGenerator.js';
                    script.onload = () => resolve();
                    script.onerror = () => resolve();
                    document.head.appendChild(script);
                });
            } catch (e) {}
        }

        if (typeof generateSpeech !== 'function') return null;

        try {
            let pitch = 44;
            let speed = 135;
            if (style === 'phonk') { pitch = 22; speed = 115; }
            else if (style === 'cyborg') { pitch = 66; speed = 158; }
            else if (style === 'angel') { pitch = 78; speed = 125; }
            else { pitch = 46; speed = 138; } // daft

            const wavData = generateSpeech(text, { amplitude: 95, pitch, speed, wordgap: 0 });
            if (!wavData) return null;
            const u8 = new Uint8Array(wavData);
            const arrayBuf = u8.buffer.slice(u8.byteOffset, u8.byteOffset + u8.byteLength);

            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            const tempCtx = this.audioCtx || new AudioCtx();
            return await tempCtx.decodeAudioData(arrayBuf);
        } catch (err) {
            console.warn('Vocal buffer synthesis error:', err);
            return null;
        }
    }

    async speakCustomVocoder(text, style = 'daft', isAutoDrop = false) {
        this.initAudioContext();
        if (!text) return;

        const now = this.audioCtx ? this.audioCtx.currentTime : 0;

        // Accompanying punchy sonic blast
        if (this.audioCtx) {
            this.playImpactSFX(now);
            if (style === 'cyborg' || style === 'daft') this.playLaserSFX(now + 0.08);
            if (style === 'angel') this.triggerDJFX('reverb');
        }

        let playedViaBuffer = false;
        try {
            const buf = await this.getVocalAudioBuffer(text, style);
            if (buf && this.audioCtx) {
                const src = this.audioCtx.createBufferSource();
                src.buffer = buf;
                const gain = this.audioCtx.createGain();
                gain.gain.value = 1.3;
                src.connect(gain);
                gain.connect(this.getMasterOutput());
                src.start(now);
                playedViaBuffer = true;
            }
        } catch (e) {
            console.warn('Buffer playback error, fallback to speech synthesis:', e);
        }

        if (!playedViaBuffer && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utt = new SpeechSynthesisUtterance(text);
            if (style === 'phonk') { utt.pitch = 0.35; utt.rate = 0.85; }
            else if (style === 'cyborg') { utt.pitch = 1.35; utt.rate = 1.35; }
            else if (style === 'angel') { utt.pitch = 1.6; utt.rate = 0.95; }
            else { utt.pitch = 0.65; utt.rate = 1.1; }
            try { window.speechSynthesis.speak(utt); } catch (e) {}
        }

        if (!isAutoDrop) {
            this.showToast('🗣️ VOCODER: "' + text.toUpperCase() + '"');
        }
    }


    // ══════════════════════════════════════════════════════════════════════
    // 🎤 FEATURE 4: MELODIC ROBOT VOCODER (AUTO-TUNE SINGING)
    // ══════════════════════════════════════════════════════════════════════
    singMelodicVocoder(text = 'CYBER ARENA ASCENSION', scaleKey = 'aminor') {
        this.initAudioContext();
        if (!this.audioCtx) return;

        const scales = {
            aminor: [220, 246.94, 261.63, 293.66, 329.63, 349.23, 392.00, 440],
            cmajor: [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25],
            dminor: [293.66, 329.63, 349.23, 392.00, 440.00, 466.16, 523.25, 587.33],
            fmajor: [349.23, 392.00, 440.00, 466.16, 523.25, 587.33, 659.25, 698.46],
            pentatonic: [220, 261.63, 293.66, 329.63, 392.00, 440, 523.25]
        };

        const notes = scales[scaleKey] || scales.aminor;
        const words = (text || 'CYBER ARENA').split(/\s+/).filter(Boolean);
        const now = this.audioCtx.currentTime;
        const noteDuration = 0.32;

        for (let i = 0; i < Math.max(words.length, 6); i++) {
            const freq = notes[i % notes.length];
            const noteTime = now + (i * noteDuration);

            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            const formantFilter = this.audioCtx.createBiquadFilter();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, noteTime);

            formantFilter.type = 'bandpass';
            formantFilter.frequency.setValueAtTime(freq * 1.8, noteTime);
            formantFilter.Q.setValueAtTime(4.0, noteTime);

            const vibrato = this.audioCtx.createOscillator();
            const vibratoGain = this.audioCtx.createGain();
            vibrato.frequency.value = 5.5;
            vibratoGain.gain.value = 4.0;
            vibrato.connect(osc.frequency);
            vibrato.start(noteTime);
            vibrato.stop(noteTime + noteDuration);

            gain.gain.setValueAtTime(0.001, noteTime);
            gain.gain.linearRampToValueAtTime(0.35, noteTime + 0.04);
            gain.gain.exponentialRampToValueAtTime(0.001, noteTime + noteDuration);

            osc.connect(formantFilter);
            formantFilter.connect(gain);
            gain.connect(this.getMasterOutput());

            osc.start(noteTime);
            osc.stop(noteTime + noteDuration);
        }

        // Voice speech backing
        this.speakCustomVocoder(text, 'daft', false);

        // Inject melody notes into active pattern synth lead
        if (this.activeTracks) {
            const leadTrack = this.activeTracks.find(t => t.type === 'melody');
            if (leadTrack) {
                if (!leadTrack.stepFreqs) leadTrack.stepFreqs = [];
                for (let s = 0; s < 16; s++) {
                    if (s % 2 === 0) {
                        leadTrack.steps[s] = 1;
                        leadTrack.stepFreqs[s] = notes[(s / 2) % notes.length];
                    }
                }
                this.renderGrid();
            }
        }

        this.showToast('🎵 AUTO-TUNE: "' + (text || 'CYBER ARENA') + '" (' + scaleKey.toUpperCase() + ')');
    }

    // ══════════════════════════════════════════════════════════════════════
    // 🎧 FEATURE 5: 8D SPATIAL BINAURAL AUDIO
    // ══════════════════════════════════════════════════════════════════════
    toggle8DAudio() {
        this.initAudioContext();
        this.is8DEnabled = !this.is8DEnabled;
        const btn = document.getElementById('toggle-8d-audio');
        const label = document.getElementById('label-8d-status');

        if (btn) btn.classList.toggle('active', this.is8DEnabled);
        if (label) label.textContent = this.is8DEnabled ? '8D ON' : '8D OFF';

        if (!this.is8DEnabled && this.panner8D && this.audioCtx) {
            this.panner8D.pan.setValueAtTime(0, this.audioCtx.currentTime);
        }

        this.showToast(window.I18N.t('msg_8d_audio_toggled') + ': ' + (this.is8DEnabled ? 'ACTIVATED' : 'OFF'));
    }

    // ══════════════════════════════════════════════════════════════════════
    // 🎛️ FEATURE 6: HOLOGRAPHIC DJ DECK & LIVE STEMS
    // ══════════════════════════════════════════════════════════════════════
    triggerTapeStop() {
        this.initAudioContext();
        if (!this.audioCtx) return;
        const now = this.audioCtx.currentTime;

        const sliderFilter = document.getElementById('beat-filter-slider');
        const origFilterVal = sliderFilter ? parseFloat(sliderFilter.value) : 2500;

        if (this.filterNode) {
            this.filterNode.frequency.cancelScheduledValues(now);
            this.filterNode.frequency.setValueAtTime(this.filterNode.frequency.value, now);
            this.filterNode.frequency.exponentialRampToValueAtTime(80, now + 0.85);
            this.filterNode.frequency.exponentialRampToValueAtTime(origFilterVal, now + 1.2);
        }

        try {
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(140, now);
            osc.frequency.exponentialRampToValueAtTime(20, now + 0.85);
            gain.gain.setValueAtTime(0.35, now);
            gain.gain.linearRampToValueAtTime(0.001, now + 0.85);
            osc.connect(gain);
            gain.connect(this.getMasterOutput());
            osc.start(now);
            osc.stop(now + 0.85);
        } catch (e) {}

        this.showToast('📼 TAPE STOP ACTIVATED');
    }

    toggleReverse() {
        this.isReversed = !this.isReversed;
        const btn = document.getElementById('btn-dj-reverse');
        if (btn) btn.classList.toggle('active', this.isReversed);
        this.showToast('⏪ REVERSE BEAT: ' + (this.isReversed ? 'ON (16➔1)' : 'OFF (1➔16)'));
    }

    toggleDubDelay() {
        this.initAudioContext();
        this.isDubDelayActive = !this.isDubDelayActive;
        const btn = document.getElementById('btn-dj-dubdelay');
        if (btn) btn.classList.toggle('active', this.isDubDelayActive);

        if (this.isDubDelayActive && this.audioCtx) {
            if (!this.dubDelayNode) {
                const delay = this.audioCtx.createDelay(1.0);
                delay.delayTime.value = 0.375;
                const feedback = this.audioCtx.createGain();
                feedback.gain.value = 0.6;
                const filter = this.audioCtx.createBiquadFilter();
                filter.type = 'bandpass';
                filter.frequency.value = 1200;

                delay.connect(filter);
                filter.connect(feedback);
                feedback.connect(delay);
                filter.connect(this.getMasterOutput());

                this.dubDelayInput = delay;
                this.dubDelayNode = delay;
            }
            if (this.masterBus) this.masterBus.connect(this.dubDelayInput);
        } else {
            if (this.masterBus && this.dubDelayInput) {
                try { this.masterBus.disconnect(this.dubDelayInput); } catch (e) {}
            }
        }

        this.showToast('🌌 DUB DELAY: ' + (this.isDubDelayActive ? 'ON' : 'OFF'));
    }

    toggleStem(stemName) {
        if (!this.stemMutes) this.stemMutes = { drums: false, bass: false, synths: false, vocals: false };
        this.stemMutes[stemName] = !this.stemMutes[stemName];

        const btn = document.getElementById('btn-stem-' + stemName);
        if (btn) {
            const isMuted = this.stemMutes[stemName];
            btn.classList.toggle('active', !isMuted);
            btn.classList.toggle('muted', isMuted);
            const labelSpan = btn.querySelector('span');
            if (labelSpan) {
                labelSpan.textContent = stemName.toUpperCase() + (isMuted ? ' [MUTED]' : ' [ON]');
            }
        }

        this.showToast('🎛️ STEM ' + stemName.toUpperCase() + ': ' + (this.stemMutes[stemName] ? 'MUTED' : 'ACTIVE'));
    }

    async exportFullSongWAV() {
        if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Export Full Song WAV')) return;
        const btnExport = document.getElementById('btn-beat-export');
        if (btnExport) btnExport.textContent = window.I18N.t('btn_exporting_audio');

        const OfflineAudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
        if (!OfflineAudioContext) {
            this.showToast('❌ OfflineAudioContext not supported by your browser.');
            if (btnExport) btnExport.innerHTML = '<i class="fa-solid fa-file-audio"></i> ' + window.I18N.t('btn_export_audio');
            return;
        }

        try {
            const isFullSong = (this.playMode === 'song');
            const patternsToRender = isFullSong ? [0, 1, 2, 3] : [this.currentPatternIndex];
            const loopsPerPat = isFullSong ? 2 : 4;
            const totalLoops = patternsToRender.length * loopsPerPat;
            const duration = Math.max(1, (60 / this.bpm) * 4 * totalLoops + 1.0);
            const sampleRate = 44100;
            const offlineCtx = new OfflineAudioContext(2, Math.ceil(sampleRate * duration), sampleRate);

            // 🎛️ Mirror AI Studio Auto-Mastering in Offline Render
            let offlineMasterDest = offlineCtx.destination;
            if (typeof offlineCtx.createDynamicsCompressor === 'function' && typeof offlineCtx.createBiquadFilter === 'function') {
                try {
                    const offlineLow = offlineCtx.createBiquadFilter();
                    offlineLow.type = 'lowshelf';
                    const offlineHigh = offlineCtx.createBiquadFilter();
                    offlineHigh.type = 'highshelf';
                    const offlineComp = offlineCtx.createDynamicsCompressor();

                    const profile = this.masteringProfile || 'radio';
                    if (profile === 'radio') {
                        offlineLow.frequency.value = 100; offlineLow.gain.value = 1.5;
                        offlineHigh.frequency.value = 9000; offlineHigh.gain.value = 3.0;
                        offlineComp.threshold.value = -24; offlineComp.ratio.value = 8;
                    } else if (profile === 'club') {
                        offlineLow.frequency.value = 75; offlineLow.gain.value = 5.5;
                        offlineHigh.frequency.value = 8000; offlineHigh.gain.value = 1.5;
                        offlineComp.threshold.value = -20; offlineComp.ratio.value = 6;
                    } else if (profile === 'imax') {
                        offlineLow.frequency.value = 90; offlineLow.gain.value = 2.0;
                        offlineHigh.frequency.value = 10500; offlineHigh.gain.value = 4.5;
                        offlineComp.threshold.value = -18; offlineComp.ratio.value = 4;
                    } else if (profile === 'tape') {
                        offlineLow.frequency.value = 120; offlineLow.gain.value = 3.0;
                        offlineHigh.frequency.value = 6500; offlineHigh.gain.value = -3.5;
                        offlineComp.threshold.value = -16; offlineComp.ratio.value = 3.5;
                    } else {
                        offlineLow.gain.value = 0; offlineHigh.gain.value = 0;
                        offlineComp.threshold.value = 0; offlineComp.ratio.value = 1;
                    }

                    offlineLow.connect(offlineHigh);
                    offlineHigh.connect(offlineComp);
                    offlineComp.connect(offlineCtx.destination);
                    offlineMasterDest = offlineLow;
                } catch (e) {
                    console.warn('Offline mastering rack setup warning:', e);
                }
            }
            const stepTime = (60 / this.bpm) / 4;

            // 🎙️ Pre-synthesize vocal AudioBuffer for offline export mix
            let vocalBuffer = null;
            if (this.injectedVocal && this.injectedVocal.enabled && this.injectedVocal.text) {
                vocalBuffer = await this.getVocalAudioBuffer(this.injectedVocal.text, this.injectedVocal.style);
            }

            let globalStep = 0;
            patternsToRender.forEach(pIdx => {
                const patternTracks = this.patterns[pIdx];
                for (let loop = 0; loop < loopsPerPat; loop++) {
                    // Inject vocal audio buffer at the trigger section (e.g. Drop)
                    if (vocalBuffer && loop === 0) {
                        let shouldDropVocal = false;
                        const mode = this.injectedVocal.triggerMode || 'drop';
                        if (isFullSong) {
                            if (mode === 'drop' && pIdx === 2) shouldDropVocal = true;
                            else if (mode === 'verse_drop' && (pIdx === 1 || pIdx === 2)) shouldDropVocal = true;
                            else if (mode === 'all') shouldDropVocal = true;
                        } else {
                            shouldDropVocal = true;
                        }

                        if (shouldDropVocal) {
                            const vocalTime = globalStep * stepTime;
                            const vSrc = offlineCtx.createBufferSource();
                            vSrc.buffer = vocalBuffer;
                            const vGain = offlineCtx.createGain();
                            vGain.gain.value = 1.35; // Crystal clear vocal in exported WAV
                            vSrc.connect(vGain);
                            vGain.connect(offlineCtx.destination);
                            vSrc.start(vocalTime);
                        }
                    }

                    for (let step = 0; step < 16; step++) {
                        const t = globalStep * stepTime;
                        patternTracks.forEach(track => {
                            if (track.steps[step]) {
                                const freq = (track.stepFreqs && track.stepFreqs[step]) || track.freq;
                                this.renderOfflineInstrument(offlineCtx, track, t, freq);
                            }
                        });
                        globalStep++;
                    }
                }
            });

            offlineCtx.startRendering().then(renderedBuffer => {
                const wavBlob = this.bufferToWave(renderedBuffer, renderedBuffer.length);
                const url = URL.createObjectURL(wavBlob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'CyberBeat-MasterTrack-' + Date.now() + '.wav';
                if (document.body) document.body.appendChild(a);
                a.click();
                setTimeout(() => { if (a.remove) a.remove(); }, 1000);

                if (btnExport) btnExport.innerHTML = '<i class="fa-solid fa-file-audio"></i> ' + window.I18N.t('btn_export_audio');
                this.showToast('💾 HD WAV Song Exported Successfully!');
            }).catch(err => {
                console.error('Rendering error:', err);
                if (btnExport) btnExport.innerHTML = '<i class="fa-solid fa-file-audio"></i> ' + window.I18N.t('btn_export_audio');
                this.showToast('❌ Export failed: ' + err.message);
            });
        } catch (err) {
            console.error('Export buffer error:', err);
            if (btnExport) btnExport.innerHTML = '<i class="fa-solid fa-file-audio"></i> ' + window.I18N.t('btn_export_audio');
            this.showToast('❌ Export setup failed: ' + err.message);
        }
    }

    renderOfflineInstrument(offlineCtx, tr, t, freq) {
        const id = tr.id;
        if (id === 'kick') {
            const osc = offlineCtx.createOscillator();
            const gain = offlineCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(150, t);
            osc.frequency.exponentialRampToValueAtTime(32, t + 0.15);
            gain.gain.setValueAtTime(0.85, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
            osc.connect(gain);
            gain.connect(offlineCtx.destination);
            osc.start(t);
            osc.stop(t + 0.16);
        } else if (id === 'snare') {
            const osc = offlineCtx.createOscillator();
            const gain = offlineCtx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(240, t);
            osc.frequency.exponentialRampToValueAtTime(80, t + 0.15);
            gain.gain.setValueAtTime(0.5, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
            osc.connect(gain);
            gain.connect(offlineCtx.destination);
            osc.start(t);
            osc.stop(t + 0.16);
        } else if (id === 'hihat_c') {
            const osc = offlineCtx.createOscillator();
            const gain = offlineCtx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(8000, t);
            osc.frequency.exponentialRampToValueAtTime(3000, t + 0.04);
            gain.gain.setValueAtTime(0.09, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
            osc.connect(gain);
            gain.connect(offlineCtx.destination);
            osc.start(t);
            osc.stop(t + 0.05);
        } else if (id === 'hihat_o') {
            const osc = offlineCtx.createOscillator();
            const gain = offlineCtx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(8000, t);
            osc.frequency.exponentialRampToValueAtTime(3000, t + 0.1);
            gain.gain.setValueAtTime(0.2, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
            osc.connect(gain);
            gain.connect(offlineCtx.destination);
            osc.start(t);
            osc.stop(t + 0.11);
        } else if (id === 'cowbell') {
            const osc = offlineCtx.createOscillator();
            const gain = offlineCtx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(800, t);
            gain.gain.setValueAtTime(0.35, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.12);
            osc.connect(gain);
            gain.connect(offlineCtx.destination);
            osc.start(t);
            osc.stop(t + 0.13);
        } else if (id === 'clap') {
            const osc = offlineCtx.createOscillator();
            const gain = offlineCtx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(450, t);
            gain.gain.setValueAtTime(0.4, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.14);
            osc.connect(gain);
            gain.connect(offlineCtx.destination);
            osc.start(t);
            osc.stop(t + 0.15);
        } else if (tr.type === 'melody') {
            const osc = offlineCtx.createOscillator();
            const filter = offlineCtx.createBiquadFilter();
            const gain = offlineCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq || tr.freq || 261.63, t);
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(this.filterCutoff || 2500, t);
            filter.frequency.exponentialRampToValueAtTime(Math.max(200, (this.filterCutoff || 2500) * 0.4), t + 0.35);
            gain.gain.setValueAtTime(0.4, t);
            gain.gain.exponentialRampToValueAtTime(0.005, t + 0.35);
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(offlineCtx.destination);
            osc.start(t);
            osc.stop(t + 0.37);
        } else if (id === 'sfx_laser') {
            const osc = offlineCtx.createOscillator();
            const gain = offlineCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(950, t);
            osc.frequency.exponentialRampToValueAtTime(100, t + 0.18);
            gain.gain.setValueAtTime(0.3, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.18);
            osc.connect(gain);
            gain.connect(offlineCtx.destination);
            osc.start(t);
            osc.stop(t + 0.19);
        } else if (id === 'sfx_impact') {
            const osc = offlineCtx.createOscillator();
            const gain = offlineCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(120, t);
            osc.frequency.exponentialRampToValueAtTime(25, t + 0.6);
            gain.gain.setValueAtTime(0.9, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.6);
            osc.connect(gain);
            gain.connect(offlineCtx.destination);
            osc.start(t);
            osc.stop(t + 0.62);
        }
    }

    bufferToWave(abuffer, len) {
        let numOfChan = abuffer.numberOfChannels,
            length = len * numOfChan * 2 + 44,
            buffer = new ArrayBuffer(length),
            view = new DataView(buffer),
            channels = [], i, sample,
            offset = 0,
            pos = 0;

        function setUint16(data) { view.setUint16(pos, data, true); pos += 2; }
        function setUint32(data) { view.setUint32(pos, data, true); pos += 4; }

        setUint32(0x46464952);
        setUint32(length - 8);
        setUint32(0x45564157);
        setUint32(0x20746d66);
        setUint32(16);
        setUint16(1);
        setUint16(numOfChan);
        setUint32(abuffer.sampleRate);
        setUint32(abuffer.sampleRate * 2 * numOfChan);
        setUint16(numOfChan * 2);
        setUint16(16);
        setUint32(0x61746164);
        setUint32(length - pos - 4);

        for (i = 0; i < abuffer.numberOfChannels; i++) channels.push(abuffer.getChannelData(i));

        while (pos < length) {
            for (i = 0; i < numOfChan; i++) {
                sample = Math.max(-1, Math.min(1, channels[i][offset]));
                sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
                view.setInt16(pos, sample, true);
                pos += 2;
            }
            offset++;
        }
        return new Blob([buffer], { type: 'audio/wav' });
    }

    /* ══════════════════════════════════════════════════════════════ */
    /* 🏛️ CYBER MUSIC VAULT & AI HIT DATABASE METHODS                 */
    /* ══════════════════════════════════════════════════════════════ */

    createBuiltInVault() {
        return [
            // 🏎️ Track 1: TOKYO GHOST PROTOCOL (Titan Drift Phonk - 142 BPM, D Minor)
            {
                id: 1,
                titleKey: 'vault_track_1_title',
                descKey: 'vault_track_1_desc',
                title: 'TOKYO GHOST PROTOCOL',
                genre: 'phonk',
                bpm: 142,
                key: 'D Minor',
                filterCutoff: 6500,
                vocoderText: 'TOKYO DRIFT CYBER TITAN OVERDRIVE',
                vocoderVoice: 'phonk',
                vocoderScale: 'dminor',
                masteringProfile: 'club',
                arenaSync: {
                    preset: 'cyberpunk',
                    robotHost: 'titan_prime',
                    cataclysm: 'matrixblizzard',
                    primaryColor: '#00f2fe',
                    secondaryColor: '#ff007f'
                },
                patterns: [
                    // Pattern 0: INTRO - Deep atmospheric sub drone, sparse cowbell, tape intro
                    [
                        { id: 'kick', steps: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'hihat_c', steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'hihat_o', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,1,0] },
                        { id: 'cowbell', steps: [0,0,1,0, 0,0,0,1, 0,0,1,0, 0,1,0,0] },
                        { id: 'clap', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'bass', freq: 73.42, stepFreqs: [73.42,0,0,0, 73.42,0,0,0, 87.31,0,0,0, 98.00,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_high', freq: 587.33, stepFreqs: [587.33,0,523.25,0, 440.00,0,392.00,0, 440.00,0,523.25,0, 587.33,0,0,0], steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,0,0] },
                        { id: 'lead_mid', freq: 293.66, steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'lead_low', freq: 146.83, steps: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,1,0] },
                        { id: 'sfx_impact', steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 1: VERSE - Phonk cowbell groove, sliding 808 bass, tight hi-hats
                    [
                        { id: 'kick', steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'hihat_c', steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'hihat_o', steps: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0] },
                        { id: 'cowbell', steps: [1,0,1,1, 0,1,0,1, 1,0,1,0, 1,1,0,1] },
                        { id: 'clap', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'bass', freq: 73.42, stepFreqs: [73.42,73.42,0,87.31, 73.42,0,110.00,0, 73.42,73.42,0,98.00, 73.42,0,65.41,0], steps: [1,1,0,1, 1,0,1,0, 1,1,0,1, 1,0,1,0] },
                        { id: 'lead_high', freq: 587.33, stepFreqs: [587.33,0,523.25,440.00, 0,523.25,0,587.33, 587.33,0,440.00,0, 523.25,0,392.00,0], steps: [1,0,1,1, 0,1,0,1, 1,0,1,0, 1,0,1,0] },
                        { id: 'lead_mid', freq: 293.66, steps: [0,0,1,0, 0,0,0,1, 0,0,1,0, 0,1,0,0] },
                        { id: 'lead_low', freq: 146.83, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'sfx_impact', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 2: DROP - MAXIMUM AGGRESSION! Distorted 808, syncopated cowbell rolls, double claps, laser stabs
                    [
                        { id: 'kick', steps: [1,0,0,1, 1,0,0,0, 1,0,0,1, 1,0,1,0] },
                        { id: 'snare', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,1] },
                        { id: 'hihat_c', steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'hihat_o', steps: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,1,1,0] },
                        { id: 'cowbell', steps: [1,1,0,1, 1,0,1,1, 1,1,0,1, 1,1,1,1] },
                        { id: 'clap', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,1,0] },
                        { id: 'bass', freq: 73.42, stepFreqs: [73.42,73.42,87.31,73.42, 110.00,0,98.00,73.42, 73.42,87.31,73.42,130.81, 110.00,98.00,87.31,73.42], steps: [1,1,1,1, 1,0,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'lead_high', freq: 587.33, stepFreqs: [587.33,587.33,523.25,440.00, 587.33,0,523.25,587.33, 698.46,587.33,523.25,440.00, 523.25,440.00,392.00,293.66], steps: [1,1,1,1, 1,0,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'lead_mid', freq: 293.66, steps: [1,0,0,1, 0,1,0,0, 1,0,0,1, 0,1,0,1] },
                        { id: 'lead_low', freq: 146.83, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,1] },
                        { id: 'sfx_impact', steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 3: OUTRO - Drift tail fade out, echoing cowbell, tape stop decay
                    [
                        { id: 'kick', steps: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'hihat_c', steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'hihat_o', steps: [0,0,0,0, 0,0,1,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'cowbell', steps: [1,0,0,1, 0,0,1,0, 0,0,1,0, 0,0,0,0] },
                        { id: 'clap', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'bass', freq: 73.42, stepFreqs: [73.42,0,0,0, 73.42,0,0,0, 87.31,0,0,0, 73.42,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_high', freq: 587.33, stepFreqs: [587.33,0,523.25,0, 440.00,0,0,0, 392.00,0,0,0, 293.66,0,0,0], steps: [1,0,1,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_mid', freq: 293.66, steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'lead_low', freq: 146.83, steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'sfx_impact', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ]
                ]
            },

            // 🤖 Track 2: CHRONO TITAN AWAKENING (Mecha Cyber Metal / Darksynth - 140 BPM, A Minor)
            {
                id: 2,
                titleKey: 'vault_track_2_title',
                descKey: 'vault_track_2_desc',
                title: 'CHRONO TITAN AWAKENING',
                genre: 'darksynth',
                bpm: 140,
                key: 'A Minor',
                filterCutoff: 7800,
                vocoderText: 'TITAN AWAKENING SYSTEMS OVERLOAD',
                vocoderVoice: 'cyborg',
                vocoderScale: 'aminor',
                masteringProfile: 'radio',
                arenaSync: {
                    preset: 'titan',
                    robotHost: 'robot3',
                    cataclysm: 'solarflare',
                    primaryColor: '#ffb703',
                    secondaryColor: '#ff007f'
                },
                patterns: [
                    // Pattern 0: INTRO - Industrial pulse, heartbeat kick, mechanical clock
                    [
                        { id: 'kick', steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'hihat_c', steps: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0] },
                        { id: 'hihat_o', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'cowbell', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'clap', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'bass', freq: 55.00, stepFreqs: [55.00,0,0,0, 55.00,0,0,0, 55.00,0,0,0, 65.41,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_high', freq: 440.00, stepFreqs: [440.00,0,0,0, 440.00,0,0,0, 523.25,0,0,0, 392.00,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_mid', freq: 220.00, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_low', freq: 110.00, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'sfx_impact', steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 1: VERSE - Heavy four-on-the-floor, gated metallic snares, sawtooth lead
                    [
                        { id: 'kick', steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'hihat_c', steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'hihat_o', steps: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0] },
                        { id: 'cowbell', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 0,1,0,0] },
                        { id: 'clap', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'bass', freq: 55.00, stepFreqs: [55.00,55.00,55.00,55.00, 65.41,65.41,65.41,65.41, 73.42,73.42,73.42,73.42, 82.41,82.41,73.42,65.41], steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'lead_high', freq: 440.00, stepFreqs: [440.00,0,440.00,0, 523.25,0,440.00,0, 659.25,0,523.25,0, 440.00,0,392.00,0], steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'lead_mid', freq: 220.00, steps: [1,0,0,1, 0,1,0,0, 1,0,0,1, 0,1,0,0] },
                        { id: 'lead_low', freq: 110.00, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'sfx_impact', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 2: DROP - CYBER APOCALYPSE! Fast 16th bassline, dual claps, blazing arpeggios, laser barrage
                    [
                        { id: 'kick', steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,1,0] },
                        { id: 'snare', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,1] },
                        { id: 'hihat_c', steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'hihat_o', steps: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,1] },
                        { id: 'cowbell', steps: [0,0,1,0, 1,0,0,1, 0,0,1,0, 1,1,0,1] },
                        { id: 'clap', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,1,0] },
                        { id: 'bass', freq: 55.00, stepFreqs: [55.00,55.00,65.41,55.00, 73.42,55.00,82.41,55.00, 55.00,65.41,73.42,82.41, 98.00,82.41,73.42,65.41], steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'lead_high', freq: 440.00, stepFreqs: [440.00,523.25,659.25,880.00, 659.25,523.25,440.00,523.25, 440.00,523.25,659.25,880.00, 987.77,880.00,659.25,523.25], steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'lead_mid', freq: 220.00, steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,1] },
                        { id: 'lead_low', freq: 110.00, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,1,0] },
                        { id: 'sfx_impact', steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 3: OUTRO - Systems cooling down, slow sub pulse, warning laser
                    [
                        { id: 'kick', steps: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'hihat_c', steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'hihat_o', steps: [0,0,1,0, 0,0,0,0, 0,0,1,0, 0,0,0,0] },
                        { id: 'cowbell', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'clap', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'bass', freq: 55.00, stepFreqs: [55.00,0,0,0, 55.00,0,0,0, 65.41,0,0,0, 55.00,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_high', freq: 440.00, stepFreqs: [440.00,0,0,0, 523.25,0,0,0, 440.00,0,0,0, 329.63,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_mid', freq: 220.00, steps: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'lead_low', freq: 110.00, steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'sfx_impact', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ]
                ]
            },

            // 🌅 Track 3: NEON HORIZON 1984 (80s Synthwave Outrun - 120 BPM, C Major)
            {
                id: 3,
                titleKey: 'vault_track_3_title',
                descKey: 'vault_track_3_desc',
                title: 'NEON HORIZON 1984',
                genre: 'synthwave',
                bpm: 120,
                key: 'C Major',
                filterCutoff: 5000,
                vocoderText: 'NEON HIGHWAY MIDNIGHT RUN',
                vocoderVoice: 'daft',
                vocoderScale: 'cmajor',
                masteringProfile: 'tape',
                arenaSync: {
                    preset: 'sunset',
                    robotHost: 'robot2',
                    cataclysm: 'none',
                    primaryColor: '#ff007f',
                    secondaryColor: '#00f2fe'
                },
                patterns: [
                    // Pattern 0: INTRO - Lush analog chords, warm filtered pad, opening arp
                    [
                        { id: 'kick', steps: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'hihat_c', steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'hihat_o', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,1,0] },
                        { id: 'cowbell', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'clap', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'bass', freq: 65.41, stepFreqs: [65.41,0,0,0, 82.41,0,0,0, 98.00,0,0,0, 110.00,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_high', freq: 523.25, stepFreqs: [523.25,0,659.25,0, 783.99,0,659.25,0, 523.25,0,659.25,0, 783.99,0,0,0], steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,0,0] },
                        { id: 'lead_mid', freq: 261.63, steps: [1,0,0,0, 0,1,0,0, 1,0,0,0, 0,1,0,0] },
                        { id: 'lead_low', freq: 130.81, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'sfx_impact', steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 1: VERSE - Classic gated snare on 2 and 4, rolling 8th bassline, synth lead
                    [
                        { id: 'kick', steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'hihat_c', steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'hihat_o', steps: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0] },
                        { id: 'cowbell', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'clap', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'bass', freq: 65.41, stepFreqs: [65.41,65.41,65.41,65.41, 82.41,82.41,82.41,82.41, 98.00,98.00,98.00,98.00, 110.00,110.00,98.00,82.41], steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'lead_high', freq: 523.25, stepFreqs: [523.25,0,523.25,0, 659.25,0,523.25,0, 783.99,0,659.25,0, 523.25,0,440.00,0], steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'lead_mid', freq: 261.63, steps: [1,0,0,1, 0,1,0,0, 1,0,0,1, 0,1,0,0] },
                        { id: 'lead_low', freq: 130.81, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'sfx_impact', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 2: DROP - PEAK SUNSET CRUISE! Sparkling high arpeggio, driving drums, gated clap chorus
                    [
                        { id: 'kick', steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'hihat_c', steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'hihat_o', steps: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0] },
                        { id: 'cowbell', steps: [0,0,1,0, 0,0,0,1, 0,0,1,0, 0,1,0,0] },
                        { id: 'clap', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,1,0] },
                        { id: 'bass', freq: 65.41, stepFreqs: [65.41,65.41,130.81,65.41, 82.41,82.41,164.81,82.41, 98.00,98.00,196.00,98.00, 110.00,98.00,82.41,65.41], steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'lead_high', freq: 523.25, stepFreqs: [523.25,659.25,783.99,1046.50, 783.99,659.25,523.25,659.25, 523.25,659.25,783.99,1046.50, 1174.66,1046.50,783.99,659.25], steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'lead_mid', freq: 261.63, steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'lead_low', freq: 130.81, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,1] },
                        { id: 'sfx_impact', steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 3: OUTRO - Cruise into the neon horizon, mellow arp, warm sunset fade
                    [
                        { id: 'kick', steps: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'hihat_c', steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,0,0] },
                        { id: 'hihat_o', steps: [0,0,0,0, 0,0,1,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'cowbell', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'clap', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'bass', freq: 65.41, stepFreqs: [65.41,0,0,0, 82.41,0,0,0, 65.41,0,0,0, 65.41,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_high', freq: 523.25, stepFreqs: [523.25,0,0,0, 659.25,0,0,0, 523.25,0,0,0, 392.00,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_mid', freq: 261.63, steps: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'lead_low', freq: 130.81, steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'sfx_impact', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ]
                ]
            },

            // ⚡ Track 4: QUANTUM WARP VORTEX (Hyper Drum & Bass - 172 BPM, E Minor)
            {
                id: 4,
                titleKey: 'vault_track_4_title',
                descKey: 'vault_track_4_desc',
                title: 'QUANTUM WARP VORTEX',
                genre: 'dnb',
                bpm: 172,
                key: 'E Minor',
                filterCutoff: 9000,
                vocoderText: 'QUANTUM WARP MAXIMUM VELOCITY',
                vocoderVoice: 'cyborg',
                vocoderScale: 'aminor',
                masteringProfile: 'club',
                arenaSync: {
                    preset: 'hyperspace',
                    robotHost: 'trio',
                    cataclysm: 'blackhole',
                    primaryColor: '#00ff88',
                    secondaryColor: '#00f2fe'
                },
                patterns: [
                    // Pattern 0: INTRO - Ambient warp drone, rolling sub bass, snare builds
                    [
                        { id: 'kick', steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'hihat_c', steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'hihat_o', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,1,0] },
                        { id: 'cowbell', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'clap', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'bass', freq: 41.20, stepFreqs: [41.20,0,0,0, 41.20,0,0,0, 49.00,0,0,0, 61.74,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_high', freq: 329.63, stepFreqs: [329.63,0,0,0, 392.00,0,0,0, 493.88,0,0,0, 329.63,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_mid', freq: 164.81, steps: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'lead_low', freq: 82.41, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'sfx_impact', steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 1: VERSE - Classic DnB 2-step breakbeat (Kick on 1 & 11, Snare on 5 & 13)
                    [
                        { id: 'kick', steps: [1,0,0,0, 0,0,0,0, 0,0,1,0, 0,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'hihat_c', steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'hihat_o', steps: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0] },
                        { id: 'cowbell', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'clap', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'bass', freq: 41.20, stepFreqs: [41.20,0,41.20,0, 49.00,0,41.20,0, 61.74,0,49.00,0, 41.20,0,36.71,0], steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'lead_high', freq: 329.63, stepFreqs: [329.63,0,392.00,0, 493.88,0,392.00,0, 329.63,0,493.88,0, 587.33,0,493.88,0], steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'lead_mid', freq: 164.81, steps: [1,0,0,1, 0,1,0,0, 1,0,0,1, 0,1,0,0] },
                        { id: 'lead_low', freq: 82.41, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'sfx_impact', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 2: DROP - HYPERDRIVE! Amen syncopation, screaming Reese bass modulation, rapid laser triggers
                    [
                        { id: 'kick', steps: [1,0,0,0, 0,0,1,0, 0,0,1,0, 0,0,0,1] },
                        { id: 'snare', steps: [0,0,0,0, 1,0,0,0, 0,1,0,0, 1,0,1,0] },
                        { id: 'hihat_c', steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'hihat_o', steps: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,1,1,1] },
                        { id: 'cowbell', steps: [0,0,1,0, 0,1,0,0, 1,0,0,1, 0,1,0,1] },
                        { id: 'clap', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,1,0] },
                        { id: 'bass', freq: 41.20, stepFreqs: [41.20,41.20,49.00,41.20, 61.74,49.00,41.20,73.42, 82.41,61.74,49.00,41.20, 49.00,61.74,82.41,98.00], steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'lead_high', freq: 329.63, stepFreqs: [329.63,392.00,493.88,659.25, 493.88,392.00,329.63,493.88, 659.25,783.99,659.25,493.88, 392.00,329.63,293.66,246.94], steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'lead_mid', freq: 164.81, steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,1] },
                        { id: 'lead_low', freq: 82.41, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 1,0,0,0, 0,0,1,0, 1,0,1,1] },
                        { id: 'sfx_impact', steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 3: OUTRO - Breakbeat dissipating into hyperspace trail, slow sub frequency decay
                    [
                        { id: 'kick', steps: [1,0,0,0, 0,0,0,0, 0,0,1,0, 0,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'hihat_c', steps: [1,0,1,0, 1,0,1,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'hihat_o', steps: [0,0,1,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'cowbell', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'clap', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'bass', freq: 41.20, stepFreqs: [41.20,0,0,0, 41.20,0,0,0, 49.00,0,0,0, 41.20,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_high', freq: 329.63, stepFreqs: [329.63,0,0,0, 392.00,0,0,0, 329.63,0,0,0, 246.94,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_mid', freq: 164.81, steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'lead_low', freq: 82.41, steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'sfx_impact', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ]
                ]
            },

            // 🚀 Track 5: DAFT CYBER REVOLUTION (French Electro House - 126 BPM, F Major)
            {
                id: 5,
                titleKey: 'vault_track_5_title',
                descKey: 'vault_track_5_desc',
                title: 'DAFT CYBER REVOLUTION',
                genre: 'electro_house',
                bpm: 126,
                key: 'F Major',
                filterCutoff: 6000,
                vocoderText: 'CYBER REVOLUTION AROUND THE WORLD',
                vocoderVoice: 'daft',
                vocoderScale: 'fmajor',
                masteringProfile: 'radio',
                arenaSync: {
                    preset: 'cosmic',
                    robotHost: 'robot1',
                    cataclysm: 'solarflare',
                    primaryColor: '#ffb703',
                    secondaryColor: '#00f2fe'
                },
                patterns: [
                    // Pattern 0: INTRO - Filtered disco sweep, muffled 4x4 kick, rising phaser
                    [
                        { id: 'kick', steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'hihat_c', steps: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0] },
                        { id: 'hihat_o', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'cowbell', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'clap', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'bass', freq: 87.31, stepFreqs: [87.31,0,0,0, 87.31,0,0,0, 110.00,0,0,0, 130.81,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_high', freq: 349.23, stepFreqs: [349.23,0,440.00,0, 523.25,0,440.00,0, 349.23,0,440.00,0, 523.25,0,0,0], steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,0,0] },
                        { id: 'lead_mid', freq: 174.61, steps: [1,0,0,0, 0,1,0,0, 1,0,0,0, 0,1,0,0] },
                        { id: 'lead_low', freq: 87.31, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,1,0] },
                        { id: 'sfx_impact', steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 1: VERSE - French touch groove, syncopated slap bass, offbeat open hats
                    [
                        { id: 'kick', steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'hihat_c', steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'hihat_o', steps: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0] },
                        { id: 'cowbell', steps: [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,1,0] },
                        { id: 'clap', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'bass', freq: 87.31, stepFreqs: [87.31,0,87.31,0, 110.00,0,87.31,0, 130.81,0,110.00,0, 174.61,0,130.81,0], steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'lead_high', freq: 349.23, stepFreqs: [349.23,0,440.00,0, 523.25,0,440.00,0, 698.46,0,523.25,0, 440.00,0,349.23,0], steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'lead_mid', freq: 174.61, steps: [1,0,0,1, 0,1,0,0, 1,0,0,1, 0,1,0,0] },
                        { id: 'lead_low', freq: 87.31, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'sfx_impact', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 2: DROP - FULL DISCO ODYSSEY! Wide open filter, funk brass stabs, double claps, French punch
                    [
                        { id: 'kick', steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'hihat_c', steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'hihat_o', steps: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0] },
                        { id: 'cowbell', steps: [0,0,1,0, 0,0,1,0, 1,0,1,0, 0,1,0,1] },
                        { id: 'clap', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,1,0] },
                        { id: 'bass', freq: 87.31, stepFreqs: [87.31,87.31,110.00,87.31, 130.81,87.31,110.00,87.31, 174.61,130.81,110.00,87.31, 110.00,130.81,174.61,220.00], steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'lead_high', freq: 349.23, stepFreqs: [349.23,440.00,523.25,698.46, 523.25,440.00,349.23,440.00, 349.23,440.00,523.25,698.46, 880.00,698.46,523.25,440.00], steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'lead_mid', freq: 174.61, steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'lead_low', freq: 87.31, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,1] },
                        { id: 'sfx_impact', steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 3: OUTRO - Filter sweeping down, fading kick and hihats, funk guitar decay
                    [
                        { id: 'kick', steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'hihat_c', steps: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,0,0] },
                        { id: 'hihat_o', steps: [0,0,1,0, 0,0,0,0, 0,0,1,0, 0,0,0,0] },
                        { id: 'cowbell', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'clap', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'bass', freq: 87.31, stepFreqs: [87.31,0,0,0, 110.00,0,0,0, 87.31,0,0,0, 87.31,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_high', freq: 349.23, stepFreqs: [349.23,0,0,0, 440.00,0,0,0, 349.23,0,0,0, 261.63,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_mid', freq: 174.61, steps: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'lead_low', freq: 87.31, steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'sfx_impact', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ]
                ]
            },

            // 🌌 Track 6: DEEP COSMIC ODYSSEY (Sci-Fi Cinematic Ambient - 92 BPM, G Minor)
            {
                id: 6,
                titleKey: 'vault_track_6_title',
                descKey: 'vault_track_6_desc',
                title: 'DEEP COSMIC ODYSSEY',
                genre: 'cinematic',
                bpm: 92,
                key: 'G Minor',
                filterCutoff: 4000,
                vocoderText: 'DEEP SPACE HORIZON TRANSMISSION RECEIVED',
                vocoderVoice: 'angel',
                vocoderScale: 'dminor',
                masteringProfile: 'scifi',
                arenaSync: {
                    preset: 'cosmic',
                    robotHost: 'duo',
                    cataclysm: 'blackhole',
                    primaryColor: '#7928ca',
                    secondaryColor: '#00f2fe'
                },
                patterns: [
                    // Pattern 0: INTRO - Deep space sub drone, stardust clicks, ethereal choir pads
                    [
                        { id: 'kick', steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'hihat_c', steps: [0,0,1,0, 0,0,0,0, 0,0,1,0, 0,0,0,0] },
                        { id: 'hihat_o', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,1,0] },
                        { id: 'cowbell', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'clap', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'bass', freq: 49.00, stepFreqs: [49.00,0,0,0, 58.27,0,0,0, 73.42,0,0,0, 87.31,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_high', freq: 392.00, stepFreqs: [392.00,0,0,0, 466.16,0,0,0, 587.33,0,0,0, 392.00,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_mid', freq: 196.00, steps: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'lead_low', freq: 98.00, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,1,0] },
                        { id: 'sfx_impact', steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 1: VERSE - Slow cinematic pulse, sub-bass movement, celestial melodic chimes
                    [
                        { id: 'kick', steps: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'hihat_c', steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'hihat_o', steps: [0,0,0,0, 0,0,1,0, 0,0,0,0, 0,0,1,0] },
                        { id: 'cowbell', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'clap', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'bass', freq: 49.00, stepFreqs: [49.00,0,49.00,0, 58.27,0,58.27,0, 73.42,0,73.42,0, 87.31,0,58.27,0], steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'lead_high', freq: 392.00, stepFreqs: [392.00,0,466.16,0, 587.33,0,466.16,0, 392.00,0,587.33,0, 783.99,0,587.33,0], steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'lead_mid', freq: 196.00, steps: [1,0,0,1, 0,1,0,0, 1,0,0,1, 0,1,0,0] },
                        { id: 'lead_low', freq: 98.00, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'sfx_impact', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 2: DROP - COSMIC HORIZON REVEAL! Deep cinematic boom, sweeping bells, huge atmospheric impact
                    [
                        { id: 'kick', steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,1] },
                        { id: 'hihat_c', steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'hihat_o', steps: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0] },
                        { id: 'cowbell', steps: [0,0,0,0, 0,0,1,0, 0,0,0,0, 0,1,0,0] },
                        { id: 'clap', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,1,0] },
                        { id: 'bass', freq: 49.00, stepFreqs: [49.00,49.00,58.27,49.00, 73.42,49.00,87.31,49.00, 98.00,73.42,58.27,49.00, 58.27,73.42,87.31,98.00], steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'lead_high', freq: 392.00, stepFreqs: [392.00,466.16,587.33,783.99, 587.33,466.16,392.00,466.16, 392.00,466.16,587.33,783.99, 932.33,783.99,587.33,466.16], steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'lead_mid', freq: 196.00, steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'lead_low', freq: 98.00, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,1,0] },
                        { id: 'sfx_impact', steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 3: OUTRO - Drifting into the infinite void, solitary chime, reverberant fading echo
                    [
                        { id: 'kick', steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'hihat_c', steps: [1,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'hihat_o', steps: [0,0,1,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'cowbell', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'clap', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'bass', freq: 49.00, stepFreqs: [49.00,0,0,0, 58.27,0,0,0, 49.00,0,0,0, 49.00,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_high', freq: 392.00, stepFreqs: [392.00,0,0,0, 466.16,0,0,0, 392.00,0,0,0, 293.66,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_mid', freq: 196.00, steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'lead_low', freq: 98.00, steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'sfx_impact', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ]
                ]
            },

            // 🥋 Track 7: RIO CYBER GHOST (Brazilian Phonk - 138 BPM, A Minor)
            {
                id: 7,
                titleKey: 'vault_track_7_title',
                descKey: 'vault_track_7_desc',
                title: 'RIO CYBER GHOST',
                genre: 'phonk',
                bpm: 138,
                key: 'A Minor',
                filterCutoff: 7000,
                vocoderText: 'BRAZILIAN DRIFT CYBER OVERKILL',
                vocoderVoice: 'phonk',
                vocoderScale: 'aminor',
                masteringProfile: 'club',
                arenaSync: {
                    preset: 'cyberpunk',
                    robotHost: 'titan_prime',
                    cataclysm: 'matrixblizzard',
                    primaryColor: '#ff007f',
                    secondaryColor: '#00f2fe'
                },
                patterns: [
                    // Pattern 0: INTRO
                    [
                        { id: 'kick', steps: [1,0,0,0, 0,0,1,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'hihat_c', steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'hihat_o', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,1,0] },
                        { id: 'cowbell', steps: [1,0,0,1, 0,1,0,0, 1,0,0,1, 0,0,1,0] },
                        { id: 'clap', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'bass', freq: 55.00, stepFreqs: [55.00,0,0,0, 55.00,0,0,0, 65.41,0,0,0, 55.00,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_high', freq: 440.00, stepFreqs: [440.00,0,523.25,0, 440.00,0,392.00,0, 440.00,0,523.25,0, 659.25,0,0,0], steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,0,0] },
                        { id: 'lead_mid', freq: 220.00, steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'lead_low', freq: 110.00, steps: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,1,0] },
                        { id: 'sfx_impact', steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 1: VERSE
                    [
                        { id: 'kick', steps: [1,0,0,0, 0,0,1,0, 1,0,0,0, 0,0,1,0] },
                        { id: 'snare', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'hihat_c', steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'hihat_o', steps: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0] },
                        { id: 'cowbell', steps: [1,1,0,1, 0,1,1,0, 1,0,1,1, 0,1,1,1] },
                        { id: 'clap', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'bass', freq: 55.00, stepFreqs: [55.00,55.00,0,65.41, 55.00,0,73.42,0, 55.00,55.00,0,82.41, 55.00,0,49.00,0], steps: [1,1,0,1, 1,0,1,0, 1,1,0,1, 1,0,1,0] },
                        { id: 'lead_high', freq: 440.00, stepFreqs: [440.00,0,440.00,523.25, 0,440.00,0,659.25, 523.25,0,440.00,0, 392.00,0,329.63,0], steps: [1,0,1,1, 0,1,0,1, 1,0,1,0, 1,0,1,0] },
                        { id: 'lead_mid', freq: 220.00, steps: [0,0,1,0, 0,0,0,1, 0,0,1,0, 0,1,0,0] },
                        { id: 'lead_low', freq: 110.00, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'sfx_impact', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 2: DROP
                    [
                        { id: 'kick', steps: [1,0,0,1, 0,0,1,0, 1,0,0,1, 0,1,1,0] },
                        { id: 'snare', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,1] },
                        { id: 'hihat_c', steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'hihat_o', steps: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,1,1,0] },
                        { id: 'cowbell', steps: [1,1,1,1, 1,0,1,1, 1,1,1,1, 1,1,0,1] },
                        { id: 'clap', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,1,0] },
                        { id: 'bass', freq: 55.00, stepFreqs: [55.00,55.00,65.41,55.00, 73.42,55.00,82.41,55.00, 55.00,65.41,73.42,82.41, 98.00,82.41,73.42,55.00], steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'lead_high', freq: 440.00, stepFreqs: [440.00,440.00,523.25,659.25, 523.25,440.00,523.25,659.25, 783.99,659.25,523.25,440.00, 523.25,440.00,392.00,329.63], steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'lead_mid', freq: 220.00, steps: [1,0,0,1, 0,1,0,0, 1,0,0,1, 0,1,0,1] },
                        { id: 'lead_low', freq: 110.00, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,1] },
                        { id: 'sfx_impact', steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 3: OUTRO
                    [
                        { id: 'kick', steps: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'hihat_c', steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'hihat_o', steps: [0,0,0,0, 0,0,1,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'cowbell', steps: [1,0,0,1, 0,0,1,0, 0,0,1,0, 0,0,0,0] },
                        { id: 'clap', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'bass', freq: 55.00, stepFreqs: [55.00,0,0,0, 55.00,0,0,0, 65.41,0,0,0, 55.00,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_high', freq: 440.00, stepFreqs: [440.00,0,523.25,0, 440.00,0,0,0, 392.00,0,0,0, 329.63,0,0,0], steps: [1,0,1,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_mid', freq: 220.00, steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'lead_low', freq: 110.00, steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'sfx_impact', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ]
                ]
            },

            // 🌌 Track 8: QUANTUM SINGULARITY (Interstellar Epic Bass - 112 BPM, D Minor)
            {
                id: 8,
                titleKey: 'vault_track_8_title',
                descKey: 'vault_track_8_desc',
                title: 'QUANTUM SINGULARITY',
                genre: 'cinematic',
                bpm: 112,
                key: 'D Minor',
                filterCutoff: 5500,
                vocoderText: 'GRAVITY REVERSED INITIATE SINGULARITY',
                vocoderVoice: 'angel',
                vocoderScale: 'dminor',
                masteringProfile: 'scifi',
                arenaSync: {
                    preset: 'cosmic',
                    robotHost: 'trio',
                    cataclysm: 'blackhole',
                    primaryColor: '#ffb703',
                    secondaryColor: '#00f2fe'
                },
                patterns: [
                    // Pattern 0: INTRO - Ticking clock, ambient space drone
                    [
                        { id: 'kick', steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'hihat_c', steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'hihat_o', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,1,0] },
                        { id: 'cowbell', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'clap', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'bass', freq: 73.42, stepFreqs: [73.42,0,0,0, 87.31,0,0,0, 98.00,0,0,0, 110.00,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_high', freq: 587.33, stepFreqs: [587.33,0,0,0, 523.25,0,0,0, 440.00,0,0,0, 392.00,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_mid', freq: 293.66, steps: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'lead_low', freq: 146.83, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,1,0] },
                        { id: 'sfx_impact', steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 1: VERSE
                    [
                        { id: 'kick', steps: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'hihat_c', steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'hihat_o', steps: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0] },
                        { id: 'cowbell', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'clap', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'bass', freq: 73.42, stepFreqs: [73.42,0,73.42,0, 87.31,0,87.31,0, 98.00,0,98.00,0, 110.00,0,87.31,0], steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'lead_high', freq: 587.33, stepFreqs: [587.33,0,523.25,0, 440.00,0,523.25,0, 587.33,0,698.46,0, 587.33,0,440.00,0], steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'lead_mid', freq: 293.66, steps: [1,0,0,1, 0,1,0,0, 1,0,0,1, 0,1,0,0] },
                        { id: 'lead_low', freq: 146.83, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'sfx_impact', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 2: DROP - Zimmer Singularity Drop
                    [
                        { id: 'kick', steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,1,0] },
                        { id: 'snare', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,1] },
                        { id: 'hihat_c', steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'hihat_o', steps: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0] },
                        { id: 'cowbell', steps: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,1,0,1] },
                        { id: 'clap', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,1,0] },
                        { id: 'bass', freq: 73.42, stepFreqs: [73.42,73.42,87.31,73.42, 98.00,73.42,110.00,73.42, 130.81,110.00,98.00,87.31, 87.31,98.00,110.00,146.83], steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'lead_high', freq: 587.33, stepFreqs: [587.33,587.33,698.46,880.00, 698.46,587.33,523.25,587.33, 587.33,698.46,880.00,1046.50, 880.00,698.46,587.33,440.00], steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'lead_mid', freq: 293.66, steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'lead_low', freq: 146.83, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,1] },
                        { id: 'sfx_impact', steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 3: OUTRO
                    [
                        { id: 'kick', steps: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'hihat_c', steps: [1,0,1,0, 1,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'hihat_o', steps: [0,0,1,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'cowbell', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'clap', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'bass', freq: 73.42, stepFreqs: [73.42,0,0,0, 87.31,0,0,0, 73.42,0,0,0, 73.42,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_high', freq: 587.33, stepFreqs: [587.33,0,0,0, 523.25,0,0,0, 440.00,0,0,0, 392.00,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_mid', freq: 293.66, steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'lead_low', freq: 146.83, steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'sfx_impact', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ]
                ]
            },

            // 🌆 Track 9: NEURAL OVERRIDE (Midtempo Cyberpunk Bass - 100 BPM, E Minor)
            {
                id: 9,
                titleKey: 'vault_track_9_title',
                descKey: 'vault_track_9_desc',
                title: 'NEURAL OVERRIDE',
                genre: 'darksynth',
                bpm: 100,
                key: 'E Minor',
                filterCutoff: 6500,
                vocoderText: 'NEURAL NETWORK COMPROMISED SYSTEM SHUTDOWN',
                vocoderVoice: 'cyborg',
                vocoderScale: 'aminor',
                masteringProfile: 'radio',
                arenaSync: {
                    preset: 'titan',
                    robotHost: 'robot3',
                    cataclysm: 'solarflare',
                    primaryColor: '#00ff88',
                    secondaryColor: '#ff007f'
                },
                patterns: [
                    // Pattern 0: INTRO
                    [
                        { id: 'kick', steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'hihat_c', steps: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0] },
                        { id: 'hihat_o', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'cowbell', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'clap', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'bass', freq: 41.20, stepFreqs: [41.20,0,0,0, 41.20,0,0,0, 49.00,0,0,0, 61.74,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_high', freq: 329.63, stepFreqs: [329.63,0,0,0, 392.00,0,0,0, 493.88,0,0,0, 329.63,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_mid', freq: 164.81, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_low', freq: 82.41, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'sfx_impact', steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 1: VERSE - Heavy 100 BPM Industrial Chug
                    [
                        { id: 'kick', steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'hihat_c', steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'hihat_o', steps: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0] },
                        { id: 'cowbell', steps: [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'clap', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'bass', freq: 41.20, stepFreqs: [41.20,41.20,41.20,41.20, 49.00,49.00,49.00,49.00, 61.74,61.74,61.74,61.74, 49.00,49.00,41.20,36.71], steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'lead_high', freq: 329.63, stepFreqs: [329.63,0,329.63,0, 392.00,0,329.63,0, 493.88,0,392.00,0, 329.63,0,246.94,0], steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'lead_mid', freq: 164.81, steps: [1,0,0,1, 0,1,0,0, 1,0,0,1, 0,1,0,0] },
                        { id: 'lead_low', freq: 82.41, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'sfx_impact', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 2: DROP - Midtempo Glitch Destruction
                    [
                        { id: 'kick', steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,1,0] },
                        { id: 'snare', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,1] },
                        { id: 'hihat_c', steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'hihat_o', steps: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,1] },
                        { id: 'cowbell', steps: [0,0,1,0, 1,0,0,1, 0,0,1,0, 1,1,0,1] },
                        { id: 'clap', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,1,0] },
                        { id: 'bass', freq: 41.20, stepFreqs: [41.20,41.20,49.00,41.20, 61.74,41.20,73.42,41.20, 41.20,49.00,61.74,73.42, 82.41,73.42,61.74,49.00], steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'lead_high', freq: 329.63, stepFreqs: [329.63,392.00,493.88,659.25, 493.88,392.00,329.63,392.00, 329.63,392.00,493.88,659.25, 783.99,659.25,493.88,392.00], steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'lead_mid', freq: 164.81, steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,1] },
                        { id: 'lead_low', freq: 82.41, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,1,0] },
                        { id: 'sfx_impact', steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 3: OUTRO
                    [
                        { id: 'kick', steps: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'hihat_c', steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'hihat_o', steps: [0,0,1,0, 0,0,0,0, 0,0,1,0, 0,0,0,0] },
                        { id: 'cowbell', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'clap', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'bass', freq: 41.20, stepFreqs: [41.20,0,0,0, 41.20,0,0,0, 49.00,0,0,0, 41.20,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_high', freq: 329.63, stepFreqs: [329.63,0,0,0, 392.00,0,0,0, 329.63,0,0,0, 246.94,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_mid', freq: 164.81, steps: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'lead_low', freq: 82.41, steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'sfx_impact', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ]
                ]
            },

            // 🏎️ Track 10: SUPERSONIC NIGHT RUN (Initial Drift Eurobeat - 156 BPM, C Major)
            {
                id: 10,
                titleKey: 'vault_track_10_title',
                descKey: 'vault_track_10_desc',
                title: 'SUPERSONIC NIGHT RUN',
                genre: 'synthwave',
                bpm: 156,
                key: 'C Major',
                filterCutoff: 8500,
                vocoderText: 'RUNNING IN THE CYBER LIGHTS TONIGHT',
                vocoderVoice: 'daft',
                vocoderScale: 'cmajor',
                masteringProfile: 'tape',
                arenaSync: {
                    preset: 'sunset',
                    robotHost: 'robot2',
                    cataclysm: 'none',
                    primaryColor: '#ff007f',
                    secondaryColor: '#ffb703'
                },
                patterns: [
                    // Pattern 0: INTRO - Eurobeat synth arp rising
                    [
                        { id: 'kick', steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'hihat_c', steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'hihat_o', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,1,0] },
                        { id: 'cowbell', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'clap', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'bass', freq: 65.41, stepFreqs: [65.41,0,0,0, 82.41,0,0,0, 98.00,0,0,0, 110.00,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_high', freq: 523.25, stepFreqs: [523.25,659.25,783.99,1046.50, 783.99,659.25,523.25,659.25, 523.25,659.25,783.99,1046.50, 1174.66,1046.50,783.99,659.25], steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'lead_mid', freq: 261.63, steps: [1,0,0,0, 0,1,0,0, 1,0,0,0, 0,1,0,0] },
                        { id: 'lead_low', freq: 130.81, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'sfx_impact', steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 1: VERSE
                    [
                        { id: 'kick', steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'hihat_c', steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'hihat_o', steps: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0] },
                        { id: 'cowbell', steps: [0,0,1,0, 0,0,0,1, 0,0,1,0, 0,1,0,0] },
                        { id: 'clap', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'bass', freq: 65.41, stepFreqs: [65.41,65.41,65.41,65.41, 82.41,82.41,82.41,82.41, 98.00,98.00,98.00,98.00, 110.00,110.00,98.00,82.41], steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'lead_high', freq: 523.25, stepFreqs: [523.25,0,523.25,0, 659.25,0,523.25,0, 783.99,0,659.25,0, 523.25,0,440.00,0], steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'lead_mid', freq: 261.63, steps: [1,0,0,1, 0,1,0,0, 1,0,0,1, 0,1,0,0] },
                        { id: 'lead_low', freq: 130.81, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'sfx_impact', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 2: DROP - Maximum Initial D Energy
                    [
                        { id: 'kick', steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'hihat_c', steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'hihat_o', steps: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0] },
                        { id: 'cowbell', steps: [0,0,1,0, 0,0,1,0, 1,0,1,0, 0,1,0,1] },
                        { id: 'clap', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,1,0] },
                        { id: 'bass', freq: 65.41, stepFreqs: [65.41,65.41,130.81,65.41, 82.41,82.41,164.81,82.41, 98.00,98.00,196.00,98.00, 110.00,98.00,82.41,65.41], steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'lead_high', freq: 523.25, stepFreqs: [523.25,659.25,783.99,1046.50, 783.99,659.25,523.25,659.25, 523.25,659.25,783.99,1046.50, 1174.66,1046.50,783.99,659.25], steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'lead_mid', freq: 261.63, steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'lead_low', freq: 130.81, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,1] },
                        { id: 'sfx_impact', steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 3: OUTRO
                    [
                        { id: 'kick', steps: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'hihat_c', steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,0,0] },
                        { id: 'hihat_o', steps: [0,0,0,0, 0,0,1,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'cowbell', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'clap', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'bass', freq: 65.41, stepFreqs: [65.41,0,0,0, 82.41,0,0,0, 65.41,0,0,0, 65.41,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_high', freq: 523.25, stepFreqs: [523.25,0,0,0, 659.25,0,0,0, 523.25,0,0,0, 392.00,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_mid', freq: 261.63, steps: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'lead_low', freq: 130.81, steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'sfx_impact', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ]
                ]
            },

            // 🏙️ Track 11: GOTHAM PROTOCOL (Cyber Drill 2088 - 142 BPM, G Minor)
            {
                id: 11,
                titleKey: 'vault_track_11_title',
                descKey: 'vault_track_11_desc',
                title: 'GOTHAM PROTOCOL',
                genre: 'trap',
                bpm: 142,
                key: 'G Minor',
                filterCutoff: 7500,
                vocoderText: 'GOTHAM PROTOCOL ENGAGED LOCK THE CITY',
                vocoderVoice: 'phonk',
                vocoderScale: 'dminor',
                masteringProfile: 'radio',
                arenaSync: {
                    preset: 'cyberpunk',
                    robotHost: 'duo',
                    cataclysm: 'matrixblizzard',
                    primaryColor: '#7928ca',
                    secondaryColor: '#00f2fe'
                },
                patterns: [
                    // Pattern 0: INTRO - Ominous gothic bell, sub rumble
                    [
                        { id: 'kick', steps: [1,0,0,0, 0,0,0,0, 0,0,1,0, 0,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'hihat_c', steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'hihat_o', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,1,0] },
                        { id: 'cowbell', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'clap', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'bass', freq: 49.00, stepFreqs: [49.00,0,0,0, 58.27,0,0,0, 73.42,0,0,0, 87.31,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_high', freq: 392.00, stepFreqs: [392.00,0,0,0, 466.16,0,0,0, 587.33,0,0,0, 392.00,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_mid', freq: 196.00, steps: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'lead_low', freq: 98.00, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,1,0] },
                        { id: 'sfx_impact', steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 1: VERSE - Sliding 808 Drill Groove
                    [
                        { id: 'kick', steps: [1,0,0,0, 0,0,0,0, 0,0,1,0, 0,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'hihat_c', steps: [1,1,1,0, 1,1,0,1, 1,1,1,1, 1,0,1,1] },
                        { id: 'hihat_o', steps: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0] },
                        { id: 'cowbell', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'clap', steps: [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'bass', freq: 49.00, stepFreqs: [49.00,0,98.00,0, 58.27,0,116.54,0, 73.42,0,146.83,0, 87.31,0,58.27,0], steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'lead_high', freq: 392.00, stepFreqs: [392.00,0,466.16,0, 587.33,0,466.16,0, 392.00,0,587.33,0, 783.99,0,587.33,0], steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'lead_mid', freq: 196.00, steps: [1,0,0,1, 0,1,0,0, 1,0,0,1, 0,1,0,0] },
                        { id: 'lead_low', freq: 98.00, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'sfx_impact', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 2: DROP - Extreme 808 Glides & Drill Stutters
                    [
                        { id: 'kick', steps: [1,0,0,0, 0,0,1,0, 0,0,1,0, 0,1,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,1] },
                        { id: 'hihat_c', steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'hihat_o', steps: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,1,1,0] },
                        { id: 'cowbell', steps: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,1,0,1] },
                        { id: 'clap', steps: [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,1,0] },
                        { id: 'bass', freq: 49.00, stepFreqs: [49.00,98.00,49.00,116.54, 58.27,116.54,49.00,146.83, 73.42,146.83,87.31,174.61, 98.00,73.42,58.27,49.00], steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'lead_high', freq: 392.00, stepFreqs: [392.00,466.16,587.33,783.99, 587.33,466.16,392.00,466.16, 392.00,466.16,587.33,783.99, 932.33,783.99,587.33,466.16], steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'lead_mid', freq: 196.00, steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'lead_low', freq: 98.00, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,1] },
                        { id: 'sfx_impact', steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 3: OUTRO
                    [
                        { id: 'kick', steps: [1,0,0,0, 0,0,0,0, 0,0,1,0, 0,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'hihat_c', steps: [1,0,1,0, 1,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'hihat_o', steps: [0,0,1,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'cowbell', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'clap', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'bass', freq: 49.00, stepFreqs: [49.00,0,0,0, 58.27,0,0,0, 49.00,0,0,0, 49.00,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_high', freq: 392.00, stepFreqs: [392.00,0,0,0, 466.16,0,0,0, 392.00,0,0,0, 293.66,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_mid', freq: 196.00, steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'lead_low', freq: 98.00, steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'sfx_impact', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ]
                ]
            },

            // ⚔️ Track 12: KATANA OF LIGHT (Samurai Cybertech Dubstep - 130 BPM, D Minor)
            {
                id: 12,
                titleKey: 'vault_track_12_title',
                descKey: 'vault_track_12_desc',
                title: 'KATANA OF LIGHT',
                genre: 'dnb',
                bpm: 130,
                key: 'D Minor',
                filterCutoff: 8000,
                vocoderText: 'CYBER BLADE IGNITED HONOR AND STEEL',
                vocoderVoice: 'cyborg',
                vocoderScale: 'pentatonic',
                masteringProfile: 'club',
                arenaSync: {
                    preset: 'hyperspace',
                    robotHost: 'titan_prime',
                    cataclysm: 'solarflare',
                    primaryColor: '#ff007f',
                    secondaryColor: '#00f2fe'
                },
                patterns: [
                    // Pattern 0: INTRO - Japanese Koto Pentatonic Melody
                    [
                        { id: 'kick', steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'hihat_c', steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'hihat_o', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,1,0] },
                        { id: 'cowbell', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'clap', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'bass', freq: 73.42, stepFreqs: [73.42,0,0,0, 87.31,0,0,0, 98.00,0,0,0, 110.00,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_high', freq: 587.33, stepFreqs: [587.33,0,698.46,0, 783.99,0,880.00,0, 1046.50,0,880.00,0, 783.99,0,698.46,0], steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'lead_mid', freq: 293.66, steps: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'lead_low', freq: 146.83, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,1,0] },
                        { id: 'sfx_impact', steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 1: VERSE - Trap Beat with Koto
                    [
                        { id: 'kick', steps: [1,0,0,0, 0,0,1,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'hihat_c', steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'hihat_o', steps: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0] },
                        { id: 'cowbell', steps: [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,1,0] },
                        { id: 'clap', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'bass', freq: 73.42, stepFreqs: [73.42,73.42,0,87.31, 73.42,0,98.00,0, 73.42,73.42,0,110.00, 73.42,0,65.41,0], steps: [1,1,0,1, 1,0,1,0, 1,1,0,1, 1,0,1,0] },
                        { id: 'lead_high', freq: 587.33, stepFreqs: [587.33,0,698.46,0, 783.99,0,880.00,0, 1046.50,0,880.00,0, 783.99,0,587.33,0], steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'lead_mid', freq: 293.66, steps: [1,0,0,1, 0,1,0,0, 1,0,0,1, 0,1,0,0] },
                        { id: 'lead_low', freq: 146.83, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'sfx_impact', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 2: DROP - Heavyweight Samurai Dubstep Drop
                    [
                        { id: 'kick', steps: [1,0,0,0, 0,0,0,0, 1,0,0,1, 0,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,1] },
                        { id: 'hihat_c', steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'hihat_o', steps: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,1,1,0] },
                        { id: 'cowbell', steps: [0,0,1,0, 0,0,1,0, 1,0,1,0, 0,1,0,1] },
                        { id: 'clap', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,1,0] },
                        { id: 'bass', freq: 73.42, stepFreqs: [73.42,73.42,87.31,73.42, 110.00,73.42,98.00,73.42, 146.83,110.00,98.00,87.31, 110.00,146.83,174.61,220.00], steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'lead_high', freq: 587.33, stepFreqs: [587.33,698.46,783.99,880.00, 1046.50,880.00,783.99,880.00, 587.33,698.46,783.99,880.00, 1046.50,1174.66,1046.50,880.00], steps: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1] },
                        { id: 'lead_mid', freq: 293.66, steps: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0] },
                        { id: 'lead_low', freq: 146.83, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,1] },
                        { id: 'sfx_impact', steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ],
                    // Pattern 3: OUTRO
                    [
                        { id: 'kick', steps: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'snare', steps: [0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'hihat_c', steps: [1,0,1,0, 1,0,0,0, 1,0,0,0, 0,0,0,0] },
                        { id: 'hihat_o', steps: [0,0,1,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'cowbell', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'clap', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'bass', freq: 73.42, stepFreqs: [73.42,0,0,0, 87.31,0,0,0, 73.42,0,0,0, 73.42,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_high', freq: 587.33, stepFreqs: [587.33,0,0,0, 698.46,0,0,0, 587.33,0,0,0, 440.00,0,0,0], steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
                        { id: 'lead_mid', freq: 293.66, steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'lead_low', freq: 146.83, steps: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
                        { id: 'sfx_laser', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0] },
                        { id: 'sfx_impact', steps: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] }
                    ]
                ]
            }
        ];
    }

    setVocoderEnabled(enabled, showToast = false) {
        if (!this.injectedVocal) {
            this.injectedVocal = { text: 'Cyber Studio Activate', style: 'daft', triggerMode: 'drop', enabled: false };
        }
        this.injectedVocal.enabled = !!enabled;

        const toggle = document.getElementById('vocoder-toggle-enable');
        const label = document.getElementById('vocoder-toggle-label');
        const badge = document.getElementById('vocoder-status-badge');
        const triggerSel = document.getElementById('vocoder-trigger-mode');

        if (toggle) toggle.checked = this.injectedVocal.enabled;

        if (this.injectedVocal.enabled) {
            if (label) {
                label.textContent = window.I18N ? window.I18N.t('vocoder_toggle_on') : '🎤 VOCAL ACTIVE';
                label.style.color = 'var(--accent-cyan)';
            }
            if (badge) badge.style.display = 'inline-flex';
            if (triggerSel && triggerSel.value === 'none') {
                triggerSel.value = 'drop';
                this.injectedVocal.triggerMode = 'drop';
            }
            if (showToast) this.showToast(window.I18N ? window.I18N.t('msg_vocal_enabled') : '✔ Vocal enabled in song playback!');
        } else {
            if (label) {
                label.textContent = window.I18N ? window.I18N.t('vocoder_toggle_off') : '🚫 VOCAL MUTED';
                label.style.color = 'var(--text-muted)';
            }
            if (badge) badge.style.display = 'none';
            if (triggerSel && triggerSel.value !== 'none') {
                triggerSel.value = 'none';
                this.injectedVocal.triggerMode = 'none';
            }
            if (showToast) this.showToast(window.I18N ? window.I18N.t('msg_vocal_muted') : '🚫 Vocal disabled in song playback!');
        }
    }

    initMusicVault() {
        // Wire Built-in Preview Buttons
        document.querySelectorAll('.btn-vault-preview').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(btn.dataset.vaultId, 10);
                this.previewVaultSong(id);
            });
        });

        // Wire Built-in Load to Studio Buttons
        document.querySelectorAll('.btn-vault-load').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(btn.dataset.vaultId, 10);
                this.loadVaultSong(id, false);
            });
        });

        // Wire Built-in 3D Arena Sync Buttons
        document.querySelectorAll('.btn-vault-sync').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(btn.dataset.vaultId, 10);
                this.syncVaultSongTo3DIntro(id);
            });
        });

        // Wire Save Active Beat to Personal Vault
        const btnSave = document.getElementById('btn-save-to-vault');
        if (btnSave) {
            btnSave.addEventListener('click', () => this.saveCurrentSongToVault());
        }

        // Render User Vault Cards
        this.renderUserVaultTracks();
    }

    renderUserVaultTracks() {
        const container = document.getElementById('user-vault-grid');
        if (!container) return;

        let userTracks = [];
        try {
            const raw = localStorage.getItem('cyber_music_vault_user');
            if (raw) userTracks = JSON.parse(raw);
        } catch (e) {
            console.warn('Error reading user vault:', e);
        }

        container.innerHTML = '';

        if (!userTracks || userTracks.length === 0) {
            const emptyNotice = document.createElement('div');
            emptyNotice.className = 'vault-empty-notice';
            emptyNotice.setAttribute('data-i18n', 'vault_empty_user');
            emptyNotice.textContent = window.I18N ? window.I18N.t('vault_empty_user') : 'No custom saved tracks yet. Create a beat and click "Save Active Beat to Vault"!';
            container.appendChild(emptyNotice);
            return;
        }

        userTracks.forEach((track, idx) => {
            const card = document.createElement('div');
            card.className = 'vault-track-card';
            card.setAttribute('data-user-vault-id', track.id);

            const numStr = 'U' + String(idx + 1).padStart(2, '0');
            const genreBadge = (track.genre || 'custom').toUpperCase();

            card.innerHTML = `
                <div class="vault-card-header">
                    <div class="vault-track-num" style="color:var(--accent-gold); border-color:var(--accent-gold);">${numStr}</div>
                    <div class="vault-track-info">
                        <h4>${track.title || 'Untitled Beat'}</h4>
                        <div class="vault-badges-row">
                            <span class="vault-badge badge-genre" style="background:rgba(255,183,3,0.2); border-color:var(--accent-gold); color:var(--accent-gold);">💾 ${genreBadge}</span>
                            <span class="vault-badge badge-bpm">${track.bpm || 120} BPM</span>
                            <span class="vault-badge badge-parts">4 PARTS</span>
                        </div>
                    </div>
                </div>
                <p class="vault-track-desc" style="font-size:0.75rem; color:#94a3b8;">
                    Saved on ${new Date(track.createdAt || Date.now()).toLocaleDateString()}
                    ${track.vocoderText ? ' • Vocal: "' + track.vocoderText.substring(0, 20) + '..."' : ''}
                </p>
                <div class="vault-actions-row">
                    <button type="button" class="action-btn-glow btn-user-vault-load" data-user-id="${track.id}" style="background:linear-gradient(135deg, #00f260, #0575e6); color:#050714; font-weight:800;">
                        <i class="fa-solid fa-bolt"></i> <span data-i18n="btn_load_vault_song">${window.I18N ? window.I18N.t('btn_load_vault_song') : '⚡ LOAD TO STUDIO'}</span>
                    </button>
                    <button type="button" class="action-btn-glow btn-vault-delete btn-user-vault-delete" data-user-id="${track.id}" title="Delete Track">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `;

            // Bind buttons
            const btnLoad = card.querySelector('.btn-user-vault-load');
            if (btnLoad) {
                btnLoad.addEventListener('click', () => this.loadVaultSong(track.id, true));
            }
            const btnDel = card.querySelector('.btn-user-vault-delete');
            if (btnDel) {
                btnDel.addEventListener('click', () => this.deleteUserVaultSong(track.id));
            }

            container.appendChild(card);
        });
    }

    loadVaultSong(trackId, isUser = false) {
        this.stopVaultPreview();

        let songDef = null;
        if (isUser) {
            try {
                const userTracks = JSON.parse(localStorage.getItem('cyber_music_vault_user') || '[]');
                songDef = userTracks.find(t => t.id === trackId);
            } catch (e) {
                console.warn('Error finding user track:', e);
            }
        } else {
            songDef = this.builtInVault.find(t => t.id === trackId);
        }

        if (!songDef || !songDef.patterns) {
            console.warn('Song definition not found for id:', trackId);
            return;
        }

        // Deep copy all 4 patterns into this.patterns
        const defaultTracksTemplate = this.createDefaultTracks('verse');

        this.patterns = songDef.patterns.map(p => {
            return p.map(t => {
                const def = defaultTracksTemplate.find(dt => dt.id === t.id) || t;
                return {
                    id: t.id,
                    nameKey: t.nameKey || def.nameKey,
                    icon: t.icon || def.icon,
                    type: t.type || def.type,
                    volume: t.volume !== undefined ? t.volume : 1.0,
                    isMuted: false,
                    isSolo: false,
                    freq: t.freq || def.freq || 220,
                    steps: [...t.steps],
                    stepFreqs: t.stepFreqs ? [...t.stepFreqs] : null
                };
            });
        });

        // Set BPM and Filter
        this.bpm = songDef.bpm || 120;
        this.filterCutoff = songDef.filterCutoff || 6000;

        const sliderBpm = document.getElementById('beat-slider-bpm');
        const bpmVal = document.getElementById('beat-bpm-val');
        const sliderFilter = document.getElementById('beat-slider-filter');
        const selectGenre = document.getElementById('beat-select-genre');

        if (sliderBpm) sliderBpm.value = this.bpm;
        if (bpmVal) bpmVal.textContent = this.bpm;
        if (sliderFilter) sliderFilter.value = this.filterCutoff;
        if (selectGenre && songDef.genre) selectGenre.value = songDef.genre;

        // Vocoder settings
        if (songDef.vocoderText) {
            const inputVoc = document.getElementById('vocoder-custom-text');
            const selectVoice = document.getElementById('vocoder-voice-style');
            const selectScale = document.getElementById('vocoder-melody-scale');
            if (inputVoc) inputVoc.value = songDef.vocoderText;
            if (selectVoice && songDef.vocoderVoice) selectVoice.value = songDef.vocoderVoice;
            if (selectScale && songDef.vocoderScale) selectScale.value = songDef.vocoderScale;

            this.injectedVocal = {
                text: songDef.vocoderText,
                style: songDef.vocoderVoice || 'daft',
                triggerMode: 'drop',
                enabled: true
            };
            this.setVocoderEnabled(true, false);
        }

        // Set to Pattern 0 (Intro)
        this.currentPatternIndex = 0;
        this.patternLoopCount = 0;
        this.playMode = 'song';

        const selectPlayMode = document.getElementById('beat-select-play-mode');
        if (selectPlayMode) selectPlayMode.value = 'song';

        document.querySelectorAll('.pattern-tab').forEach((tab, i) => {
            tab.classList.toggle('active', i === 0);
        });

        this.renderGrid();
        this.showToast(window.I18N ? window.I18N.t('msg_vault_song_loaded') : '⚡ Loaded track into 4-pattern studio sequencer!');
    }

    previewVaultSong(trackId) {
        if (this.activePreviewTrackId === trackId) {
            this.stopVaultPreview();
            return;
        }

        this.stopVaultPreview();

        const trackDef = this.builtInVault.find(t => t.id === trackId);
        if (!trackDef) return;

        this.activePreviewTrackId = trackId;

        // Visual updates
        const card = document.querySelector(`[data-vault-id="${trackId}"]`);
        if (card) card.classList.add('vault-playing');

        const btn = document.querySelector(`.btn-vault-preview[data-vault-id="${trackId}"]`);
        if (btn) {
            btn.classList.add('playing');
            btn.innerHTML = `<i class="fa-solid fa-square"></i> <span>${window.I18N ? window.I18N.t('btn_stop_preview') : '⏹ STOP'}</span>`;
        }

        this.initAudioContext();
        if (!this.audioCtx) return;

        this.vaultPreviewGain = this.audioCtx.createGain();
        this.vaultPreviewGain.gain.setValueAtTime(0.85, this.audioCtx.currentTime);
        this.vaultPreviewGain.connect(this.analyser || this.audioCtx.destination);

        // Schedule 2 loops of Pattern 2 (Drop - 32 steps)
        const dropPattern = trackDef.patterns[2];
        const stepDuration = 60 / trackDef.bpm / 4;
        const totalSteps = 32;

        for (let s = 0; s < totalSteps; s++) {
            const stepIdx = s % 16;
            const schedTime = this.audioCtx.currentTime + (s * stepDuration);

            const tid = setTimeout(() => {
                if (this.activePreviewTrackId === trackId && this.audioCtx) {
                    this.playVaultPreviewStep(dropPattern, stepIdx, schedTime, this.vaultPreviewGain);
                }
            }, s * stepDuration * 1000);

            this.vaultPreviewTimeouts.push(tid);
        }

        // Auto-stop after preview completes
        const stopTid = setTimeout(() => {
            if (this.activePreviewTrackId === trackId) {
                this.stopVaultPreview();
            }
        }, totalSteps * stepDuration * 1000 + 400);

        this.vaultPreviewTimeouts.push(stopTid);
    }

    stopVaultPreview() {
        this.vaultPreviewTimeouts.forEach(tid => clearTimeout(tid));
        this.vaultPreviewTimeouts = [];

        if (this.vaultPreviewGain && this.audioCtx) {
            try {
                this.vaultPreviewGain.gain.linearRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.1);
                setTimeout(() => {
                    if (this.vaultPreviewGain) {
                        this.vaultPreviewGain.disconnect();
                        this.vaultPreviewGain = null;
                    }
                }, 120);
            } catch (e) {
                // Ignore audio context disconnect warnings
            }
        }

        document.querySelectorAll('.vault-track-card').forEach(card => card.classList.remove('vault-playing'));
        document.querySelectorAll('.btn-vault-preview').forEach(btn => {
            btn.classList.remove('playing');
            btn.innerHTML = `<i class="fa-solid fa-play"></i> <span>${window.I18N ? window.I18N.t('btn_preview_vault_song') : '▶ PREVIEW'}</span>`;
        });

        this.activePreviewTrackId = null;
    }

    playVaultPreviewStep(patternTracks, stepIdx, triggerTime, outputGain) {
        if (!patternTracks || !outputGain || !this.audioCtx) return;

        patternTracks.forEach(track => {
            if (track.steps && track.steps[stepIdx] === 1) {
                const noteFreq = (track.stepFreqs && track.stepFreqs[stepIdx]) || track.freq || 220;
                if (track.type === 'drum' || track.id === 'kick' || track.id === 'snare' || track.id === 'hihat_c' || track.id === 'hihat_o' || track.id === 'cowbell' || track.id === 'clap') {
                    this.playVaultPreviewDrum(track.id, triggerTime, outputGain);
                } else {
                    this.playVaultPreviewSynth(noteFreq, triggerTime, track.id, outputGain);
                }
            }
        });
    }

    playVaultPreviewDrum(drumType, t, outputGain) {
        if (!this.audioCtx || !outputGain) return;
        const ctx = this.audioCtx;

        if (drumType === 'kick') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.setValueAtTime(140, t);
            osc.frequency.exponentialRampToValueAtTime(32, t + 0.15);
            gain.gain.setValueAtTime(1.0, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.18);
            osc.connect(gain);
            gain.connect(outputGain);
            osc.start(t);
            osc.stop(t + 0.2);
        } else if (drumType === 'snare' || drumType === 'clap') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(200, t);
            osc.frequency.exponentialRampToValueAtTime(80, t + 0.1);
            gain.gain.setValueAtTime(0.8, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
            osc.connect(gain);
            gain.connect(outputGain);
            osc.start(t);
            osc.stop(t + 0.16);
        } else if (drumType === 'hihat_c') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(7000, t);
            gain.gain.setValueAtTime(0.25, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.04);
            osc.connect(gain);
            gain.connect(outputGain);
            osc.start(t);
            osc.stop(t + 0.05);
        } else if (drumType === 'hihat_o') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(6500, t);
            gain.gain.setValueAtTime(0.3, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
            osc.connect(gain);
            gain.connect(outputGain);
            osc.start(t);
            osc.stop(t + 0.22);
        } else if (drumType === 'cowbell') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(820, t);
            gain.gain.setValueAtTime(0.5, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
            osc.connect(gain);
            gain.connect(outputGain);
            osc.start(t);
            osc.stop(t + 0.12);
        }
    }

    playVaultPreviewSynth(freq, t, trackId, outputGain) {
        if (!this.audioCtx || !outputGain || !freq) return;
        const ctx = this.audioCtx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        if (trackId === 'bass') {
            osc.type = 'sawtooth';
            gain.gain.setValueAtTime(0.5, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.22);
        } else {
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.35, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.18);
        }

        osc.frequency.setValueAtTime(freq, t);
        osc.connect(gain);
        gain.connect(outputGain);
        osc.start(t);
        osc.stop(t + 0.25);
    }

    saveCurrentSongToVault() {
        const defaultTitle = 'Cyber Hit #' + Math.floor(100 + Math.random() * 900);
        const promptMsg = window.I18N ? window.I18N.t('prompt_enter_track_title') : 'Enter title for your custom vault track:';
        const userTitle = window.prompt(promptMsg, defaultTitle);

        if (userTitle === null) return; // User cancelled
        const finalTitle = userTitle.trim() || defaultTitle;

        // Clone current patterns
        const clonedPatterns = this.patterns.map(p => {
            return p.map(t => ({
                id: t.id,
                nameKey: t.nameKey,
                icon: t.icon,
                type: t.type,
                volume: t.volume ?? 1.0,
                freq: t.freq || 220,
                steps: [...t.steps],
                stepFreqs: t.stepFreqs ? [...t.stepFreqs] : null
            }));
        });

        const selectGenre = document.getElementById('beat-select-genre');
        const genre = selectGenre ? selectGenre.value : 'synthwave';

        const newTrack = {
            id: 'user_' + Date.now(),
            title: finalTitle,
            genre: genre,
            bpm: this.bpm,
            filterCutoff: this.filterCutoff,
            patterns: clonedPatterns,
            vocoderText: this.injectedVocal ? this.injectedVocal.text : '',
            vocoderVoice: this.injectedVocal ? this.injectedVocal.style : 'daft',
            createdAt: new Date().toISOString()
        };

        let userTracks = [];
        try {
            const raw = localStorage.getItem('cyber_music_vault_user');
            if (raw) userTracks = JSON.parse(raw);
        } catch (e) {
            userTracks = [];
        }

        userTracks.unshift(newTrack);

        try {
            localStorage.setItem('cyber_music_vault_user', JSON.stringify(userTracks));
        } catch (e) {
            console.error('Failed to save to localStorage:', e);
        }

        this.renderUserVaultTracks();
        this.showToast(window.I18N ? window.I18N.t('msg_vault_song_saved') : '💾 Saved beat to your personal Cyber Music Vault!');
    }

    deleteUserVaultSong(trackId) {
        let userTracks = [];
        try {
            const raw = localStorage.getItem('cyber_music_vault_user');
            if (raw) userTracks = JSON.parse(raw);
        } catch (e) {
            userTracks = [];
        }

        userTracks = userTracks.filter(t => t.id !== trackId);

        try {
            localStorage.setItem('cyber_music_vault_user', JSON.stringify(userTracks));
        } catch (e) {
            console.error('Failed to update localStorage:', e);
        }

        this.renderUserVaultTracks();
        this.showToast(window.I18N ? window.I18N.t('msg_vault_song_deleted') : '🗑️ Track removed from personal vault.');
    }

    syncVaultSongTo3DIntro(trackId) {
        this.loadVaultSong(trackId, false);

        const songDef = this.builtInVault.find(t => t.id === trackId);
        if (!songDef || !songDef.arenaSync) return;

        const sync = songDef.arenaSync;

        // Bridge to 3D Intro Engine if present
        if (window.introEngine) {
            const selectPreset = document.getElementById('intro-select-preset');
            if (selectPreset && sync.preset) {
                selectPreset.value = sync.preset;
                window.introEngine.currentPreset = sync.preset;
                if (typeof window.introEngine.buildScene === 'function') {
                    window.introEngine.buildScene();
                }
            }

            const selectHost = document.getElementById('robot-select-host');
            if (selectHost && sync.robotHost) {
                selectHost.value = sync.robotHost;
                if (typeof window.introEngine.setRobotHostMode === 'function') {
                    window.introEngine.setRobotHostMode(sync.robotHost);
                }
            }

            const selectCataclysm = document.getElementById('intro-select-cataclysm');
            if (selectCataclysm && sync.cataclysm) {
                selectCataclysm.value = sync.cataclysm;
                if (typeof window.introEngine.setCataclysm === 'function') {
                    window.introEngine.setCataclysm(sync.cataclysm);
                }
            }

            if (sync.primaryColor) {
                const picker1 = document.getElementById('intro-color-primary');
                if (picker1) picker1.value = sync.primaryColor;
                window.introEngine.primaryColor = parseInt(sync.primaryColor.replace('#', '0x'), 16);
            }

            if (sync.secondaryColor) {
                const picker2 = document.getElementById('intro-color-secondary');
                if (picker2) picker2.value = sync.secondaryColor;
                window.introEngine.secondaryColor = parseInt(sync.secondaryColor.replace('#', '0x'), 16);
            }

            if (typeof window.introEngine.updateColors === 'function') {
                window.introEngine.updateColors();
            }
        }

        // Switch to Module 1 Tab (3D Intro)
        const tabIntro = document.querySelector('[data-tab="intro"]');
        if (tabIntro) {
            tabIntro.click();
        }

        this.showToast(window.I18N ? window.I18N.t('msg_vault_synced_3d') : '🎬 Synchronized music theme with 3D Arena!');
    }

}

window.BeatMaker = BeatMakerEngine;
