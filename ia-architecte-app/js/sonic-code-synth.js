(function() {
  'use strict';

  const T = {
    en: {
      title: "🎵 Sonic Code Synthesizer",
      desc: "Generates custom lo-fi programming soundtracks and reactive keypress sounds connected to Monaco.",
      beatToggle: "Background Beat",
      beatOn: "🔊 Ambient Beat On",
      beatOff: "🔇 Mute Beat",
      instrument: "Typewriter Sound",
      visualizer: "Oscilloscope Output",
      bpm: "Tempo (BPM)",
      volume: "Synth Volume",
      activeChord: "Active Progression Chord",
      syntaxState: "Acoustic Code Integrity",
      syntaxOk: "🟢 Harmonious (Major Key)",
      syntaxError: "🔴 Alerting (Minor Detuned Key)",
      instLoFi: "🎹 Lo-Fi Bell",
      instCyber: "⚡ Cyber Pluck",
      inst8Bit: "🕹️ 8-Bit Laser",
      glowingKeys: "Interactive Keypad",
      startAudio: "🔌 Initialize Audio Driver"
    },
    fr: {
      title: "🎵 Synthétiseur de Code Sonore",
      desc: "Génère des pistes de fond lo-fi et des sons réactifs aux touches connectés à Monaco.",
      beatToggle: "Rhythme de Fond",
      beatOn: "🔊 Rythme Activé",
      beatOff: "🔇 Couper le Rythme",
      instrument: "Son du Clavier",
      visualizer: "Visualisation Oscilloscope",
      bpm: "Tempo (BPM)",
      volume: "Volume Synthé",
      activeChord: "Accord Actif Progression",
      syntaxState: "Intégrité Acoustique Code",
      syntaxOk: "🟢 Harmonieux (Majeur)",
      syntaxError: "🔴 Alerte (Mineur Désaccordé)",
      instLoFi: "🎹 Cloche Lo-Fi",
      instCyber: "⚡ Pluck Cyber",
      inst8Bit: "🕹️ Laser 8-Bit",
      glowingKeys: "Clavier Interactif",
      startAudio: "🔌 Activer le Driver Audio"
    }
  };

  function gl() {
    return window.lang || window.appLang || 'en';
  }

  function t(key) {
    const lang = gl();
    return T[lang] && T[lang][key] ? T[lang][key] : (T['en'][key] || key);
  }

  // Audio state
  let audioCtx = null;
  let synthVolume = null;
  let analyser = null;
  let isBeatPlaying = false;
  let bpm = 90;
  let activeInstrument = 'lofi';

  // Sequencer Variables
  let nextNoteTime = 0.0;
  let current16thNote = 0;
  let activeChordIdx = 0;
  const lookahead = 25.0; // ms
  const scheduleAheadTime = 0.1; // sec
  let schedulerTimer = null;

  // Chord Progression Definitions
  const CHORDS_MAJOR = [
    { name: "C Major", bass: 65.41, notes: [261.63, 293.66, 329.63, 392.00, 440.00] }, // C4, D4, E4, G4, A4
    { name: "G Major", bass: 97.99, notes: [293.66, 329.63, 392.00, 440.00, 493.88] }, // D4, E4, G4, A4, B4
    { name: "A Minor", bass: 110.00, notes: [220.00, 261.63, 293.66, 329.63, 392.00] }, // A3, C4, D4, E4, G4
    { name: "F Major", bass: 87.31, notes: [261.63, 349.23, 392.00, 440.00, 523.25] }  // C4, F4, G4, A4, C5
  ];

  const CHORDS_MINOR = [
    { name: "A Minor", bass: 110.00, notes: [220.00, 261.63, 293.66, 329.63, 392.00] }, // A minor
    { name: "E Minor", bass: 82.41, notes: [246.94, 293.66, 329.63, 392.00, 440.00] },  // E minor
    { name: "F Major", bass: 87.31, notes: [261.63, 349.23, 392.00, 440.00, 523.25] },  // F Major
    { name: "D Minor", bass: 73.42, notes: [293.66, 349.23, 440.00, 523.25, 587.33] }   // D minor
  ];

  // Helper to determine active chord list based on code syntax
  function getActiveChords() {
    // Check if index.html or bug-fixer has detected errors
    const errorBadge = document.getElementById('status-errors') || document.querySelector('.error-count');
    const hasErrors = errorBadge ? (parseInt(errorBadge.textContent) > 0) : false;
    return hasErrors ? CHORDS_MINOR : CHORDS_MAJOR;
  }

  // Audio Driver Initialization
  function initAudio() {
    if (audioCtx) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
      synthVolume = audioCtx.createGain();
      synthVolume.gain.setValueAtTime(0.3, audioCtx.currentTime);
      
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;

      synthVolume.connect(analyser);
      analyser.connect(audioCtx.destination);

      // Start animation loop
      requestAnimationFrame(drawVisualizer);
      
      const startBtn = document.getElementById('init-audio-btn');
      if (startBtn) startBtn.style.display = 'none';
      const controlsDiv = document.getElementById('synth-controls-area');
      if (controlsDiv) controlsDiv.style.display = 'block';
    } catch(e) {
      console.error("Web Audio API failed to load", e);
    }
  }

  // Visualizer Animation
  function drawVisualizer() {
    if (!analyser) return;
    const canvas = document.getElementById('synth-visualizer');
    if (!canvas) {
      requestAnimationFrame(drawVisualizer);
      return;
    }
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);

    ctx.fillStyle = '#0b0f19';
    ctx.fillRect(0, 0, width, height);

    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    ctx.lineWidth = 3;
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, '#06b6d4');
    gradient.addColorStop(0.5, '#d946ef');
    gradient.addColorStop(1, '#6366f1');
    ctx.strokeStyle = gradient;

    ctx.beginPath();
    const sliceWidth = width * 1.0 / bufferLength;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = v * height / 2;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      x += sliceWidth;
    }
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    requestAnimationFrame(drawVisualizer);
  }

  // --- Drum Synthesizers ---
  function playKick(time) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(synthVolume);

    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.35);

    gain.gain.setValueAtTime(1.0, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);

    osc.start(time);
    osc.stop(time + 0.36);
  }

  function playSnare(time) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.connect(gain);
    gain.connect(synthVolume);

    osc.frequency.setValueAtTime(180, time);
    osc.frequency.linearRampToValueAtTime(90, time + 0.2);

    gain.gain.setValueAtTime(0.6, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);

    osc.start(time);
    osc.stop(time + 0.21);

    // Noise sizzle for snare
    try {
      const bufferSize = audioCtx.sampleRate * 0.15;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;
      const noiseGain = audioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.3, time);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
      noise.connect(noiseGain);
      noiseGain.connect(synthVolume);
      noise.start(time);
      noise.stop(time + 0.16);
    } catch(e) {}
  }

  function playHiHat(time) {
    if (!audioCtx) return;
    try {
      const bufferSize = audioCtx.sampleRate * 0.04;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;
      const noiseGain = audioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.18, time);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);
      noise.connect(noiseGain);
      noiseGain.connect(synthVolume);
      noise.start(time);
      noise.stop(time + 0.05);
    } catch(e) {}
  }

  function playPluck(freq, duration, waveType = 'triangle', time = 0) {
    if (!audioCtx) return;
    const playTime = time || audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = waveType;
    osc.frequency.setValueAtTime(freq, playTime);
    
    // Add micro-vibrato
    if (waveType === 'sine') {
      osc.frequency.linearRampToValueAtTime(freq + 4, playTime + duration * 0.5);
    }

    osc.connect(gain);
    gain.connect(synthVolume);

    gain.gain.setValueAtTime(activeInstrument === 'chiptune' ? 0.8 : 0.4, playTime);
    gain.gain.exponentialRampToValueAtTime(0.001, playTime + duration);

    osc.start(playTime);
    osc.stop(playTime + duration + 0.05);
  }

  // --- Typing Hook ---
  function playTypingSound() {
    if (!audioCtx) return;
    // Keep it responsive & throttle just in case
    const chords = getActiveChords();
    const activeChord = chords[activeChordIdx];
    const notes = activeChord.notes;
    
    // Pick note from pentatonic list depending on typed characters
    const rndNote = notes[Math.floor(Math.random() * notes.length)];
    
    // Trigger audio visualizer element glowing in sidebar
    const keyboardKey = document.getElementById(`synth-key-${Math.floor(Math.random() * 5)}`);
    if (keyboardKey) {
      keyboardKey.style.background = 'rgba(236, 72, 153, 0.4)';
      setTimeout(() => { keyboardKey.style.background = ''; }, 100);
    }

    const type = activeInstrument === 'lofi' ? 'sine' : activeInstrument === 'cyber' ? 'triangle' : 'square';
    const dur = activeInstrument === 'chiptune' ? 0.12 : 0.35;
    
    playPluck(rndNote, dur, type);
  }

  // Connect Monaco
  setTimeout(() => {
    if (window.editor) {
      window.editor.onDidChangeModelContent(() => {
        playTypingSound();
      });
    }
  }, 1000);

  // --- Sequencer Clock ---
  function nextNote() {
    const secondsPerBeat = 60.0 / bpm;
    nextNoteTime += 0.25 * secondsPerBeat; // 16th note step
    current16thNote = (current16thNote + 1) % 16;
    if (current16thNote === 0) {
      activeChordIdx = (activeChordIdx + 1) % 4;
    }
  }

  function scheduleNote(step, time) {
    // 1. Kick on 0, 4, 8, 12
    if (step % 4 === 0) {
      playKick(time);
    }
    // 2. Snare on 4, 12
    if (step % 8 === 4) {
      playSnare(time);
    }
    // 3. Hi-Hat on 2, 6, 10, 14 (and micro syncopation on odds)
    if (step % 2 === 1) {
      playHiHat(time);
    }
    // 4. Bass Line sync to active Chord
    if (step % 8 === 0) {
      const chords = getActiveChords();
      const bassFreq = chords[activeChordIdx].bass;
      playPluck(bassFreq, 0.6, 'sine', time);
    }
  }

  function scheduler() {
    while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime) {
      scheduleNote(current16thNote, nextNoteTime);
      nextNote();
    }
    schedulerTimer = setTimeout(scheduler, lookahead);
    updateUiStatus();
  }

  function toggleBeat() {
    if (!audioCtx) initAudio();
    isBeatPlaying = !isBeatPlaying;
    const btn = document.getElementById('synth-beat-toggle');
    
    if (isBeatPlaying) {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      nextNoteTime = audioCtx.currentTime;
      current16thNote = 0;
      scheduler();
      if (btn) {
        btn.textContent = t('beatOff');
        btn.className = "sm-btn red-btn";
      }
    } else {
      clearTimeout(schedulerTimer);
      if (btn) {
        btn.textContent = t('beatOn');
        btn.className = "sm-btn green-btn";
      }
    }
  }

  function updateUiStatus() {
    const chords = getActiveChords();
    const chordNameEl = document.getElementById('synth-active-chord');
    if (chordNameEl) chordNameEl.textContent = chords[activeChordIdx].name;

    const integrityEl = document.getElementById('synth-syntax-state');
    if (integrityEl) {
      const errorBadge = document.getElementById('status-errors') || document.querySelector('.error-count');
      const hasErrors = errorBadge ? (parseInt(errorBadge.textContent) > 0) : false;
      integrityEl.textContent = hasErrors ? t('syntaxError') : t('syntaxOk');
      integrityEl.style.color = hasErrors ? '#f87171' : '#34d399';
    }
  }

  // --- Rendering UI inside Left Body ---
  window.renderSonicSynth = function(container) {
    if (!container) return;

    container.innerHTML = `
      <div style="padding: 10px 4px; font-family: 'Inter', sans-serif; color: #f1f5f9; display: flex; flex-direction: column; gap: 16px;">
        <div>
          <h2 style="font-size: 18px; font-weight: 900; background: linear-gradient(135deg, #d946ef, #6366f1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0 0 8px 0; display: flex; align-items: center; gap: 10px;">
            ${t('title')}
          </h2>
          <p style="font-size: 12px; color: #94a3b8; line-height: 1.6; margin: 0;">
            ${t('desc')}
          </p>
        </div>

        <!-- 🔌 Driver Loader (if ctx is not booted) -->
        <button id="init-audio-btn" class="sm-btn blue-btn" style="width:100%; font-weight:800; padding:14px; font-size:13px; display: ${audioCtx ? 'none' : 'block'};">
          ${t('startAudio')}
        </button>

        <div id="synth-controls-area" style="display: ${audioCtx ? 'block' : 'none'};">
          <div style="display: flex; flex-direction: column; gap: 20px;">
            
            <!-- 📺 Live Oscilloscope Visualizer -->
            <div style="background: #0b0f19; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; padding: 6px; display: flex; flex-direction: column; gap: 8px;">
              <canvas id="synth-visualizer" width="340" height="120" style="width: 100%; height: auto; aspect-ratio: 340 / 120; display: block; border-radius: 8px;"></canvas>
            </div>

            <!-- ⚙️ Controls Section -->
            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 18px; display: flex; flex-direction: column; gap: 16px;">
              
              <!-- Ambient Beat Toggle -->
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size:12px; font-weight:700;">${t('beatToggle')}</span>
                <button id="synth-beat-toggle" class="sm-btn ${isBeatPlaying ? 'red-btn' : 'green-btn'}" style="font-weight: 800; padding: 8px 16px;">
                  ${isBeatPlaying ? t('beatOff') : t('beatOn')}
                </button>
              </div>

              <!-- BPM Slider -->
              <div style="display: flex; flex-direction: column; gap: 6px;">
                <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 600;">
                  <span>${t('bpm')}</span>
                  <span id="synth-bpm-val" style="color: #d946ef;">${bpm}</span>
                </div>
                <input type="range" id="synth-bpm" min="60" max="160" value="${bpm}" style="width: 100%; accent-color: #d946ef;" />
              </div>

              <!-- Volume Slider -->
              <div style="display: flex; flex-direction: column; gap: 6px;">
                <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 600;">
                  <span>${t('volume')}</span>
                  <span id="synth-vol-val" style="color: #6366f1;">${synthVolume ? Math.round(synthVolume.gain.value * 100) : 30}%</span>
                </div>
                <input type="range" id="synth-volume" min="0" max="100" value="${synthVolume ? synthVolume.gain.value * 100 : 30}" style="width: 100%; accent-color: #6366f1;" />
              </div>

              <!-- Instrument Select -->
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <span style="font-size: 12px; font-weight: 700;">${t('instrument')}</span>
                <div style="display: flex; gap: 8px;">
                  <button id="inst-lofi" class="sm-btn ${activeInstrument === 'lofi' ? 'blue-btn' : 'glass-btn'}" style="flex:1; font-size:10px; padding:6px 0;">${t('instLoFi')}</button>
                  <button id="inst-cyber" class="sm-btn ${activeInstrument === 'cyber' ? 'blue-btn' : 'glass-btn'}" style="flex:1; font-size:10px; padding:6px 0;">${t('instCyber')}</button>
                  <button id="inst-chiptune" class="sm-btn ${activeInstrument === 'chiptune' ? 'blue-btn' : 'glass-btn'}" style="flex:1; font-size:10px; padding:6px 0;">${t('inst8Bit')}</button>
                </div>
              </div>
            </div>

            <!-- 🔬 Dynamic Audio Feedback Metrics -->
            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 18px; display: flex; flex-direction: column; gap: 12px; font-size:12px;">
              <div style="display: flex; justify-content: space-between;">
                <span style="color:#64748b; font-weight:700;">${t('activeChord')}:</span>
                <span id="synth-active-chord" style="font-weight:900; color:#c084fc;">-</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color:#64748b; font-weight:700;">${t('syntaxState')}:</span>
                <span id="synth-syntax-state" style="font-weight:900; color:#34d399;">-</span>
              </div>
            </div>

            <!-- 🎹 Interactive Keypad visualizer -->
            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 18px; display: flex; flex-direction: column; gap: 10px;">
              <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em;">
                🎹 ${t('glowingKeys')}
              </div>
              <div style="display:flex; gap:8px;">
                <div id="synth-key-0" style="flex:1; height: 35px; border:1px solid rgba(255,255,255,0.08); border-radius:6px; transition: background 0.1s;"></div>
                <div id="synth-key-1" style="flex:1; height: 35px; border:1px solid rgba(255,255,255,0.08); border-radius:6px; transition: background 0.1s;"></div>
                <div id="synth-key-2" style="flex:1; height: 35px; border:1px solid rgba(255,255,255,0.08); border-radius:6px; transition: background 0.1s;"></div>
                <div id="synth-key-3" style="flex:1; height: 35px; border:1px solid rgba(255,255,255,0.08); border-radius:6px; transition: background 0.1s;"></div>
                <div id="synth-key-4" style="flex:1; height: 35px; border:1px solid rgba(255,255,255,0.08); border-radius:6px; transition: background 0.1s;"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;

    // Hook listeners
    document.getElementById('init-audio-btn').onclick = function() {
      initAudio();
    };

    if (audioCtx) {
      document.getElementById('synth-beat-toggle').onclick = function() {
        toggleBeat();
      };
      document.getElementById('synth-bpm').oninput = function(e) {
        bpm = parseInt(e.target.value);
        document.getElementById('synth-bpm-val').textContent = bpm;
      };
      document.getElementById('synth-volume').oninput = function(e) {
        const val = parseInt(e.target.value) / 100.0;
        synthVolume.gain.setValueAtTime(val, audioCtx.currentTime);
        document.getElementById('synth-vol-val').textContent = e.target.value + '%';
      };

      // Instruments
      const setInst = (inst) => {
        activeInstrument = inst;
        document.querySelectorAll('[id^="inst-"]').forEach(btn => {
          btn.className = "sm-btn glass-btn";
        });
        document.getElementById(`inst-${inst}`).className = "sm-btn blue-btn";
      };
      document.getElementById('inst-lofi').onclick = () => setInst('lofi');
      document.getElementById('inst-cyber').onclick = () => setInst('cyber');
      document.getElementById('inst-chiptune').onclick = () => setInst('chiptune');
      
      updateUiStatus();
    }
  };

  // Standard Tab Router Decorator
  const originalRenderTab = window.renderTab;
  window.renderTab = function(tab) {
    if (tab === 'sonicsynth') {
      window.renderSonicSynth(document.getElementById('left-body'));
    } else {
      if (originalRenderTab) originalRenderTab(tab);
    }
  };

})();
