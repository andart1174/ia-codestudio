(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════
  // 🎹 WEB AUDIO SYNTHESIZER — Real Subtractive Synth & Keyboard
  // ═══════════════════════════════════════════════════════════

  const STANDALONE_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cyberpunk Web Audio Synthesizer</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #020617;
      --card-bg: #0b1329;
      --card-border: #1e293b;
      --accent: #06b6d4;
      --accent-secondary: #ec4899;
      --text: #f8fafc;
      --text-muted: #94a3b8;
    }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      box-sizing: border-box;
      overflow-x: hidden;
    }
    .container {
      width: 100%;
      max-width: 900px;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 24px;
      padding: 32px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(10px);
    }
    h1 {
      margin: 0 0 6px 0;
      font-size: 26px;
      font-weight: 900;
      background: linear-gradient(90deg, var(--accent), var(--accent-secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: -0.5px;
    }
    p.sub {
      margin: 0 0 28px 0;
      font-size: 14px;
      color: var(--text-muted);
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 24px;
      margin-bottom: 24px;
    }
    @media (min-width: 768px) {
      .grid {
        grid-template-columns: 1fr 1fr;
      }
    }
    .visualizer-card {
      background: #000;
      border: 1px solid var(--card-border);
      border-radius: 16px;
      overflow: hidden;
      position: relative;
      height: 180px;
      box-shadow: inset 0 4px 20px rgba(0, 0, 0, 0.9);
    }
    canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
    .panel {
      background: rgba(255,255,255,0.01);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    h3 {
      margin: 0;
      font-size: 11px;
      text-transform: uppercase;
      color: var(--accent);
      letter-spacing: 0.8px;
      font-weight: 800;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    label {
      font-size: 11px;
      color: var(--text-muted);
      font-weight: 600;
      display: flex;
      justify-content: space-between;
    }
    select, input[type="range"] {
      background: #020617;
      border: 1px solid var(--card-border);
      color: var(--text);
      border-radius: 8px;
      padding: 6px 10px;
      font-family: inherit;
      font-size: 13px;
      outline: none;
    }
    input[type="range"] {
      padding: 0;
      height: 5px;
      -webkit-appearance: none;
      background: #1e293b;
      cursor: pointer;
    }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--accent-secondary);
    }
    .keyboard-wrapper {
      background: #020617;
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 16px;
      margin-bottom: 24px;
      display: flex;
      justify-content: center;
      position: relative;
    }
    .keyboard {
      display: flex;
      position: relative;
      user-select: none;
    }
    .key {
      width: 44px;
      height: 140px;
      background: #f8fafc;
      border: 1px solid #000;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      position: relative;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0,0,0,0.3);
      transition: background 0.1s, box-shadow 0.1s;
      z-index: 1;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 12px;
      color: #475569;
      font-size: 11px;
      font-weight: 800;
      box-sizing: border-box;
    }
    .key:active, .key.active {
      background: #cbd5e1;
      box-shadow: inset 0 6px 10px rgba(0,0,0,0.4);
    }
    .key.black {
      width: 28px;
      height: 85px;
      background: #0f172a;
      border: 1px solid #000;
      margin-left: -14px;
      margin-right: -14px;
      z-index: 2;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      color: #94a3b8;
      font-size: 9px;
      padding-bottom: 6px;
    }
    .key.black:active, .key.black.active {
      background: #334155;
    }
    button.btn-primary {
      font-family: inherit;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 900;
      cursor: pointer;
      padding: 12px;
      outline: none;
      border: none;
      background: linear-gradient(90deg, var(--accent), var(--accent-secondary));
      color: #000;
      box-shadow: 0 4px 15px rgba(6,182,212,0.25);
    }
    .export-card {
      background: rgba(255,255,255,0.02);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 20px;
    }
    .toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(90deg, var(--accent), var(--accent-secondary));
      color: #000;
      padding: 12px 24px;
      border-radius: 30px;
      font-size: 13px;
      font-weight: 800;
      display: none;
      z-index: 100;
      box-shadow: 0 10px 25px rgba(6,182,212,0.4);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎹 Cyberpunk Web Audio Synthesizer</h1>
    <p class="sub">Modular subtractive sound synthesis engine with real-time spectrum visualizer</p>

    <div class="grid">
      <!-- Left side: Visualizer and Keyboard Controls -->
      <div style="display:flex;flex-direction:column;gap:18px;">
        <div class="visualizer-card">
          <canvas id="synthCanvas"></canvas>
        </div>

        <div class="keyboard-wrapper">
          <div class="keyboard" id="pianoKeyboard">
            <div class="key" data-note="C4" data-key="A">A</div>
            <div class="key black" data-note="C#4" data-key="W">W</div>
            <div class="key" data-note="D4" data-key="S">S</div>
            <div class="key black" data-note="D#4" data-key="E">E</div>
            <div class="key" data-note="E4" data-key="D">D</div>
            <div class="key" data-note="F4" data-key="F">F</div>
            <div class="key black" data-note="F#4" data-key="T">T</div>
            <div class="key" data-note="G4" data-key="G">G</div>
            <div class="key black" data-note="G#4" data-key="Y">Y</div>
            <div class="key" data-note="A4" data-key="H">H</div>
            <div class="key black" data-note="A#4" data-key="U">U</div>
            <div class="key" data-note="B4" data-key="J">J</div>
            <div class="key" data-note="C5" data-key="K">K</div>
          </div>
        </div>
      </div>

      <!-- Right side: Controls -->
      <div class="panel">
        <h3>⚙️ Synthesizer Engine</h3>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <div class="form-group">
            <label>Waveform Type</label>
            <select id="oscSelect">
              <option value="sawtooth">Sawtooth / Dent de scie</option>
              <option value="sine">Sine / Sinusoïdal</option>
              <option value="square">Square / Carré</option>
              <option value="triangle">Triangle</option>
            </select>
          </div>

          <div class="form-group">
            <label><span>Filter Freq</span><span id="filterVal">1500Hz</span></label>
            <input type="range" id="filterSlider" min="150" max="4000" step="50" value="1500">
          </div>
        </div>

        <h3>⏳ Sound Envelope (ADSR)</h3>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <div class="form-group">
            <label><span>Attack (A)</span><span id="attackVal">0.05s</span></label>
            <input type="range" id="attackSlider" min="0.01" max="1.5" step="0.05" value="0.05">
          </div>
          <div class="form-group">
            <label><span>Decay (D)</span><span id="decayVal">0.15s</span></label>
            <input type="range" id="decaySlider" min="0.01" max="1.5" step="0.05" value="0.15">
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <div class="form-group">
            <label><span>Sustain (S)</span><span id="sustainVal">0.7</span></label>
            <input type="range" id="sustainSlider" min="0.0" max="1.0" step="0.05" value="0.7">
          </div>
          <div class="form-group">
            <label><span>Release (R)</span><span id="releaseVal">0.40s</span></label>
            <input type="range" id="releaseSlider" min="0.05" max="3.0" step="0.05" value="0.40">
          </div>
        </div>
      </div>
    </div>

    <!-- Export section -->
    <div class="export-card">
      <h3>📦 Export Synth Component</h3>
      <p style="font-size:11px;color:var(--text-muted);margin:4px 0 12px 0;">Copy the full synthesized keyboard snippet. Ideal for embedding premium sound boards or games.</p>
      <button class="btn-primary" id="copyCodeBtn" style="width:100%;">📋 Copy Self-Contained Synth Code</button>
    </div>
  </div>

  <div class="toast" id="toast"></div>

  <script>
    const canvas = document.getElementById('synthCanvas');
    const ctx = canvas.getContext('2d');
    const keyboard = document.getElementById('pianoKeyboard');
    const oscSelect = document.getElementById('oscSelect');
    const filterSlider = document.getElementById('filterSlider');
    const filterVal = document.getElementById('filterVal');
    const attackSlider = document.getElementById('attackSlider');
    const attackVal = document.getElementById('attackVal');
    const decaySlider = document.getElementById('decaySlider');
    const decayVal = document.getElementById('decayVal');
    const sustainSlider = document.getElementById('sustainSlider');
    const sustainVal = document.getElementById('sustainVal');
    const releaseSlider = document.getElementById('releaseSlider');
    const releaseVal = document.getElementById('releaseVal');
    const copyCodeBtn = document.getElementById('copyCodeBtn');
    const toast = document.getElementById('toast');

    // Frequency Mapping
    const FREQUENCIES = {
      "C4": 261.63, "C#4": 277.18, "D4": 293.66, "D#4": 311.13,
      "E4": 329.63, "F4": 349.23, "F#4": 369.99, "G4": 392.00,
      "G#4": 415.30, "A4": 440.00, "A#4": 466.16, "B4": 493.88, "C5": 523.25
    };

    const KEY_MAP = {
      "a": "C4", "w": "C#4", "s": "D4", "e": "D#4", "d": "E4",
      "f": "F4", "t": "F#4", "g": "G4", "y": "G#4", "h": "A4",
      "u": "A#4", "j": "B4", "k": "C5"
    };

    let audioCtx = null;
    let analyserNode = null;
    let mainGain = null;
    let activeOscillators = {};

    function showToast(msg) {
      toast.textContent = msg;
      toast.style.display = 'block';
      setTimeout(() => { toast.style.display = 'none'; }, 2200);
    }

    function initAudio() {
      if (audioCtx) return;
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      analyserNode = audioCtx.createAnalyser();
      analyserNode.fftSize = 256;
      mainGain = audioCtx.createGain();
      mainGain.gain.value = 0.5;

      mainGain.connect(analyserNode);
      analyserNode.connect(audioCtx.destination);

      // Start spectrum loop
      drawSpectrum();
    }

    function playNote(noteName) {
      initAudio();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      // If already playing, release it first
      if (activeOscillators[noteName]) {
        stopNote(noteName);
      }

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc.type = oscSelect.value;
      osc.frequency.value = FREQUENCIES[noteName];

      filter.type = 'lowpass';
      filter.frequency.value = parseFloat(filterSlider.value);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(mainGain);

      // Apply ADSR Envelope
      const now = audioCtx.currentTime;
      const attack = parseFloat(attackSlider.value);
      const decay = parseFloat(decaySlider.value);
      const sustain = parseFloat(sustainSlider.value);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.8, now + attack);
      gain.gain.exponentialRampToValueAtTime(sustain * 0.8 || 0.001, now + attack + decay);

      osc.start(now);

      activeOscillators[noteName] = {
        oscillator: osc,
        gainNode: gain,
        filterNode: filter
      };

      // Add visual key feedback
      const keyEl = keyboard.querySelector(\`[data-note="\${noteName}"]\`);
      if (keyEl) keyEl.classList.add('active');
    }

    function stopNote(noteName) {
      if (!activeOscillators[noteName]) return;

      const { oscillator, gainNode } = activeOscillators[noteName];
      const now = audioCtx.currentTime;
      const release = parseFloat(releaseSlider.value);

      try {
        gainNode.gain.cancelScheduledValues(now);
        gainNode.gain.setValueAtTime(gainNode.gain.value, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + release);
        oscillator.stop(now + release);
      } catch (e) {
        oscillator.stop(now);
      }

      delete activeOscillators[noteName];

      // Remove visual feedback
      const keyEl = keyboard.querySelector(\`[data-note="\${noteName}"]\`);
      if (keyEl) keyEl.classList.remove('active');
    }

    // Spectrum viz loop
    function drawSpectrum() {
      requestAnimationFrame(drawSpectrum);
      if (!analyserNode) {
        ctx.fillStyle = '#020617';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return;
      }

      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      const bufferLength = analyserNode.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyserNode.getByteTimeDomainData(dataArray);

      ctx.fillStyle = 'rgba(2, 6, 23, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 3;
      ctx.strokeStyle = '#06b6d4';
      ctx.shadowColor = '#ec4899';
      ctx.shadowBlur = 10;
      ctx.beginPath();

      const sliceWidth = canvas.width * 1.0 / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * canvas.height / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Event Bindings
    keyboard.querySelectorAll('.key').forEach(key => {
      key.addEventListener('mousedown', (e) => {
        const note = e.target.getAttribute('data-note');
        playNote(note);
      });
      key.addEventListener('mouseup', (e) => {
        const note = e.target.getAttribute('data-note');
        stopNote(note);
      });
      key.addEventListener('mouseleave', (e) => {
        const note = e.target.getAttribute('data-note');
        stopNote(note);
      });

      // Touch events support
      key.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const note = e.target.getAttribute('data-note');
        playNote(note);
      });
      key.addEventListener('touchend', (e) => {
        e.preventDefault();
        const note = e.target.getAttribute('data-note');
        stopNote(note);
      });
    });

    // Keyboard bindings
    window.addEventListener('keydown', (e) => {
      if (e.repeat) return;
      const key = e.key.toLowerCase();
      if (KEY_MAP[key]) {
        playNote(KEY_MAP[key]);
      }
    });

    window.addEventListener('keyup', (e) => {
      const key = e.key.toLowerCase();
      if (KEY_MAP[key]) {
        stopNote(KEY_MAP[key]);
      }
    });

    // Sliders display bindings
    filterSlider.addEventListener('input', (e) => {
      filterVal.textContent = e.target.value + 'Hz';
      Object.keys(activeOscillators).forEach(k => {
        activeOscillators[k].filterNode.frequency.value = parseFloat(e.target.value);
      });
    });

    attackSlider.addEventListener('input', (e) => { attackVal.textContent = e.target.value + 's'; });
    decaySlider.addEventListener('input', (e) => { decayVal.textContent = e.target.value + 's'; });
    sustainSlider.addEventListener('input', (e) => { sustainVal.textContent = e.target.value; });
    releaseSlider.addEventListener('input', (e) => { releaseVal.textContent = e.target.value + 's'; });

    // Initial silent visualization
    drawSpectrum();

    // Copy Synthesizer code
    copyCodeBtn.addEventListener('click', () => {
      const currentOsc = oscSelect.value;
      const currentFilter = parseFloat(filterSlider.value);
      const attack = parseFloat(attackSlider.value);
      const decay = parseFloat(decaySlider.value);
      const sustain = parseFloat(sustainSlider.value);
      const release = parseFloat(releaseSlider.value);

      const componentCode = [
        '<!-- Standalone Synth Player Web Component -->',
        '<div class="synth-box" style="width: 320px; background: #0b1329; border: 1px solid #1e293b; border-radius: 16px; padding: 16px; font-family: sans-serif; color: #fff;">',
        '  <h3 style="margin: 0 0 10px 0; font-size: 13px; color: #06b6d4; text-transform: uppercase;">🎹 Live Subtractive Synth</h3>',
        '  <canvas id="embedSynthCanvas" style="width: 100%; height: 60px; background: #000; border-radius: 8px; margin-bottom: 12px; display: block;"></canvas>',
        '  <div class="piano-board" id="embedBoard" style="display: flex; justify-content: center; position: relative;">',
        '    <div class="piano-key" data-note="C4" style="width:28px; height:80px; background:#fff; border:1px solid #000; display:flex; align-items:flex-end; justify-content:center; color:#333; font-size:9px; font-weight:bold; cursor:pointer;">A</div>',
        '    <div class="piano-key black-k" data-note="C#4" style="width:18px; height:50px; background:#111; border:1px solid #000; color:#aaa; font-size:8px; margin-left:-9px; margin-right:-9px; z-index:2; display:flex; align-items:flex-end; justify-content:center; cursor:pointer;">W</div>',
        '    <div class="piano-key" data-note="D4" style="width:28px; height:80px; background:#fff; border:1px solid #000; display:flex; align-items:flex-end; justify-content:center; color:#333; font-size:9px; font-weight:bold; cursor:pointer;">S</div>',
        '    <div class="piano-key black-k" data-note="D#4" style="width:18px; height:50px; background:#111; border:1px solid #000; color:#aaa; font-size:8px; margin-left:-9px; margin-right:-9px; z-index:2; display:flex; align-items:flex-end; justify-content:center; cursor:pointer;">E</div>',
        '    <div class="piano-key" data-note="E4" style="width:28px; height:80px; background:#fff; border:1px solid #000; display:flex; align-items:flex-end; justify-content:center; color:#333; font-size:9px; font-weight:bold; cursor:pointer;">D</div>',
        '    <div class="piano-key" data-note="F4" style="width:28px; height:80px; background:#fff; border:1px solid #000; display:flex; align-items:flex-end; justify-content:center; color:#333; font-size:9px; font-weight:bold; cursor:pointer;">F</div>',
        '    <div class="piano-key black-k" data-note="F#4" style="width:18px; height:50px; background:#111; border:1px solid #000; color:#aaa; font-size:8px; margin-left:-9px; margin-right:-9px; z-index:2; display:flex; align-items:flex-end; justify-content:center; cursor:pointer;">T</div>',
        '    <div class="piano-key" data-note="G4" style="width:28px; height:80px; background:#fff; border:1px solid #000; display:flex; align-items:flex-end; justify-content:center; color:#333; font-size:9px; font-weight:bold; cursor:pointer;">G</div>',
        '    <div class="piano-key black-k" data-note="G#4" style="width:18px; height:50px; background:#111; border:1px solid #000; color:#aaa; font-size:8px; margin-left:-9px; margin-right:-9px; z-index:2; display:flex; align-items:flex-end; justify-content:center; cursor:pointer;">Y</div>',
        '    <div class="piano-key" data-note="A4" style="width:28px; height:80px; background:#fff; border:1px solid #000; display:flex; align-items:flex-end; justify-content:center; color:#333; font-size:9px; font-weight:bold; cursor:pointer;">H</div>',
        '    <div class="piano-key black-k" data-note="A#4" style="width:18px; height:50px; background:#111; border:1px solid #000; color:#aaa; font-size:8px; margin-left:-9px; margin-right:-9px; z-index:2; display:flex; align-items:flex-end; justify-content:center; cursor:pointer;">U</div>',
        '    <div class="piano-key" data-note="B4" style="width:28px; height:80px; background:#fff; border:1px solid #000; display:flex; align-items:flex-end; justify-content:center; color:#333; font-size:9px; font-weight:bold; cursor:pointer;">J</div>',
        '    <div class="piano-key" data-note="C5" style="width:28px; height:80px; background:#fff; border:1px solid #000; display:flex; align-items:flex-end; justify-content:center; color:#333; font-size:9px; font-weight:bold; cursor:pointer;">K</div>',
        '  </div>',
        '</div>',
        '',
        '<' + 'script>',
        '(function() {',
        '  const FREQS = { "C4":261.6, "C#4":277.2, "D4":293.7, "D#4":311.1, "E4":329.6, "F4":349.2, "F#4":370.0, "G4":392.0, "G#4":415.3, "A4":440.0, "A#4":466.2, "B4":493.9, "C5":523.3 };',
        '  const KM = { "a":"C4","w":"C#4","s":"D4","e":"D#4","d":"E4","f":"F4","t":"F#4","g":"G4","y":"G#4","h":"A4","u":"A#4","j":"B4","k":"C5" };',
        '  let ac = null, analyser = null, gain = null, active = {};',
        '  ',
        '  function init() {',
        '    if(ac) return;',
        '    ac = new(window.AudioContext||window.webkitAudioContext)();',
        '    analyser = ac.createAnalyser(); analyser.fftSize = 128;',
        '    gain = ac.createGain(); gain.gain.value = 0.5;',
        '    gain.connect(analyser); analyser.connect(ac.destination);',
        '    viz();',
        '  }',
        '',
        '  function play(note) {',
        '    init();',
        '    if(ac.state === "suspended") ac.resume();',
        '    if(active[note]) stop(note);',
        '    const osc = ac.createOscillator();',
        '    const gn = ac.createGain();',
        '    const flt = ac.createBiquadFilter();',
        '    osc.type = "' + currentOsc + '";',
        '    osc.frequency.value = FREQS[note];',
        '    flt.type = "lowpass"; flt.frequency.value = ' + currentFilter + ';',
        '    osc.connect(flt); flt.connect(gn); gn.connect(gain);',
        '    const now = ac.currentTime;',
        '    gn.gain.setValueAtTime(0, now);',
        '    gn.gain.linearRampToValueAtTime(0.7, now + ' + attack + ');',
        '    gn.gain.exponentialRampToValueAtTime(' + sustain + '*0.7||0.001, now + ' + attack + ' + ' + decay + ');',
        '    osc.start(now);',
        '    active[note] = { o: osc, g: gn };',
        '  }',
        '',
        '  function stop(note) {',
        '    if(!active[note]) return;',
        '    const { o, g } = active[note];',
        '    const now = ac.currentTime;',
        '    try {',
        '      g.gain.cancelScheduledValues(now);',
        '      g.gain.setValueAtTime(g.gain.value, now);',
        '      g.gain.exponentialRampToValueAtTime(0.0001, now + ' + release + ');',
        '      o.stop(now + ' + release + ');',
        '    } catch(e){ o.stop(now); }',
        '    delete active[note];',
        '  }',
        '',
        '  const board = document.getElementById("embedBoard");',
        '  board.querySelectorAll(".piano-key").forEach(k => {',
        '    k.addEventListener("mousedown", () => play(k.getAttribute("data-note")));',
        '    k.addEventListener("mouseup", () => stop(k.getAttribute("data-note")));',
        '    k.addEventListener("mouseleave", () => stop(k.getAttribute("data-note")));',
        '  });',
        '  window.addEventListener("keydown", (e) => {',
        '    if(e.repeat) return;',
        '    const note = KM[e.key.toLowerCase()];',
        '    if(note) play(note);',
        '  });',
        '  window.addEventListener("keyup", (e) => {',
        '    const note = KM[e.key.toLowerCase()];',
        '    if(note) stop(note);',
        '  });',
        '',
        '  const cv = document.getElementById("embedSynthCanvas");',
        '  const c = cv.getContext("2d");',
        '  function viz() {',
        '    requestAnimationFrame(viz);',
        '    if(!analyser) return;',
        '    const bl = analyser.frequencyBinCount;',
        '    const da = new Uint8Array(bl);',
        '    analyser.getByteTimeDomainData(da);',
        '    c.fillStyle = "#000"; c.fillRect(0,0,cv.width,cv.height);',
        '    c.lineWidth = 2; c.strokeStyle = "#06b6d4"; c.beginPath();',
        '    let sw = cv.width*1.0/bl, x = 0;',
        '    for(let i=0; i<bl; i++) {',
        '      let y = (da[i]/128.0)*cv.height/2;',
        '      if(i===0) c.moveTo(x,y); else c.lineTo(x,y);',
        '      x += sw;',
        '    }',
        '    c.lineTo(cv.width, cv.height/2); c.stroke();',
        '  }',
        '})();',
        '</' + 'script>'
      ].join('\\n');

      navigator.clipboard.writeText(componentCode).then(() => {
        showToast("📋 Code Copied to Clipboard!");
      }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = componentCode;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast("📋 Code Copied! (Fallback)");
      });
    });
  </script>
</body>
</html>`;

  const TX = {
    en: {
      title: '🎹 NEON SUBTRACTIVE AUDIO SYNTHESIZER',
      sub: 'Web Audio API multi-wave synthesizer panel and dynamic oscilliscope',
      loadFullApp: '🚀 Load Full Standalone App',
      loadSuccess: '🚀 Audio Synthesizer loaded into editor!',
      settingsHdr: '⚙️ Synthesizer Engine',
      oscType: 'Waveform Type',
      filterFreq: 'Filter Cutoff Freq',
      envelopeHdr: '⏳ Sound Envelope (ADSR)',
      attack: 'Attack (A)',
      decay: 'Decay (D)',
      sustain: 'Sustain (S)',
      release: 'Release (R)',
      exportHdr: '📦 Export Synth Component',
      exportDesc: 'Copy the full synthesized keyboard snippet. Ideal for embedding premium sound boards or games.',
      exportBtn: '📋 Copy Self-Contained Synth Code',
      copied: '📋 Synthesizer component code copied to clipboard!'
    },
    fr: {
      title: '🎹 SYNTHÉTISEUR AUDIO SOUSTRACTIF NEON',
      sub: 'Synthétiseur Web Audio multi-ondes et oscilloscope graphique dynamique',
      loadFullApp: '🚀 Charger l\'appli complète',
      loadSuccess: '🚀 Synthétiseur audio chargé dans l\'éditeur !',
      settingsHdr: '⚙️ Moteur de Synthèse',
      oscType: 'Forme de l\'onde',
      filterFreq: 'Coupure du Filtre',
      envelopeHdr: '⏳ Enveloppe de Son (ADSR)',
      attack: 'Attaque (A)',
      decay: 'Décroissance (D)',
      sustain: 'Soutien (S)',
      release: 'Relâchement (R)',
      exportHdr: '📦 Exporter le Composant Synth',
      exportDesc: 'Copiez le code complet du clavier synthétiseur. Parfait pour les boîtes à sons ou jeux.',
      exportBtn: '📋 Copier le Composant Synth Autonome',
      copied: '📋 Code du synthétiseur copié dans le presse-papiers !'
    }
  };

  const FREQUENCIES = {
    "C4": 261.63, "C#4": 277.18, "D4": 293.66, "D#4": 311.13,
    "E4": 329.63, "F4": 349.23, "F#4": 369.99, "G4": 392.00,
    "G#4": 415.30, "A4": 440.00, "A#4": 466.16, "B4": 493.88, "C5": 523.25
  };

  const KEY_MAP = {
    "a": "C4", "w": "C#4", "s": "D4", "e": "D#4", "d": "E4",
    "f": "F4", "t": "F#4", "g": "G4", "y": "G#4", "h": "A4",
    "u": "A#4", "j": "B4", "k": "C5"
  };

  function gl() { return window.appLang || 'en'; }

  const _origRenderTab = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'audiosynth') {
      window.activeTab = 'audiosynth';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('tab-audiosynth');
      if (btn) btn.classList.add('active');
      initAudioSynth(gl());
      return;
    }
    if (typeof _origRenderTab === 'function') _origRenderTab(tab);
  };

  function initAudioSynth(lang) {
    const el = document.getElementById('left-body');
    if (!el) return;
    const T = TX[lang] || TX.en;

    el.innerHTML = `
      <div id="synth-root" style="padding:14px;font-family:'Inter',sans-serif;overflow-y:auto;height:100%;box-sizing:border-box;background:#020617;color:#f8fafc;">
        
        <!-- Header banner -->
        <div style="background:linear-gradient(135deg,rgba(6,182,212,0.15),rgba(236,72,153,0.1));border-radius:14px;padding:14px;border:1px solid rgba(6,182,212,0.35);margin-bottom:12px;display:flex;align-items:center;gap:12px;">
          <span style="font-size:28px;filter:drop-shadow(0 0 10px #06b6d4);">🎹</span>
          <div>
            <h2 style="margin:0;color:#22d3ee;font-size:15px;font-weight:900;letter-spacing:0.4px;">${T.title}</h2>
            <p style="margin:3px 0 0;color:#94a3b8;font-size:10px;">${T.sub}</p>
          </div>
        </div>

        <!-- Load Full App -->
        <button id="synth-load-full-app" style="width:100%;background:linear-gradient(90deg,#06b6d4,#ec4899);border:none;color:#000;padding:10px;border-radius:8px;font-weight:900;font-size:11px;cursor:pointer;margin-bottom:14px;box-shadow:0 0 15px rgba(6,182,212,0.25);transition:transform 0.1s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">${T.loadFullApp}</button>

        <!-- Oscilloscope canvas -->
        <div id="synth-viz-wrap" style="background:#000;border:1px solid #1e293b;border-radius:12px;overflow:hidden;position:relative;height:130px;margin-bottom:14px;box-shadow:inset 0 4px 10px rgba(0,0,0,0.8);">
          <canvas id="synth-preview-canvas" style="width:100%;height:100%;display:block;"></canvas>
        </div>

        <!-- Keyboard UI wrapper -->
        <div style="background:#020617;border:1px solid #1e293b;border-radius:12px;padding:10px;margin-bottom:14px;display:flex;justify-content:center;position:relative;">
          <div id="synth-keyboard" style="display:flex;position:relative;user-select:none;">
            <div class="s-key" data-note="C4" style="width:24px; height:80px; background:#fff; border:1px solid #000; border-bottom-left-radius:4px; border-bottom-right-radius:4px; display:flex; align-items:flex-end; justify-content:center; color:#333; font-size:8px; font-weight:bold; cursor:pointer;">A</div>
            <div class="s-key s-black" data-note="C#4" style="width:16px; height:50px; background:#111; border:1px solid #000; border-bottom-left-radius:3px; border-bottom-right-radius:3px; color:#aaa; font-size:7px; margin-left:-8px; margin-right:-8px; z-index:2; display:flex; align-items:flex-end; justify-content:center; cursor:pointer;">W</div>
            <div class="s-key" data-note="D4" style="width:24px; height:80px; background:#fff; border:1px solid #000; border-bottom-left-radius:4px; border-bottom-right-radius:4px; display:flex; align-items:flex-end; justify-content:center; color:#333; font-size:8px; font-weight:bold; cursor:pointer;">S</div>
            <div class="s-key s-black" data-note="D#4" style="width:16px; height:50px; background:#111; border:1px solid #000; border-bottom-left-radius:3px; border-bottom-right-radius:3px; color:#aaa; font-size:7px; margin-left:-8px; margin-right:-8px; z-index:2; display:flex; align-items:flex-end; justify-content:center; cursor:pointer;">E</div>
            <div class="s-key" data-note="E4" style="width:24px; height:80px; background:#fff; border:1px solid #000; border-bottom-left-radius:4px; border-bottom-right-radius:4px; display:flex; align-items:flex-end; justify-content:center; color:#333; font-size:8px; font-weight:bold; cursor:pointer;">D</div>
            <div class="s-key" data-note="F4" style="width:24px; height:80px; background:#fff; border:1px solid #000; border-bottom-left-radius:4px; border-bottom-right-radius:4px; display:flex; align-items:flex-end; justify-content:center; color:#333; font-size:8px; font-weight:bold; cursor:pointer;">F</div>
            <div class="s-key s-black" data-note="F#4" style="width:16px; height:50px; background:#111; border:1px solid #000; border-bottom-left-radius:3px; border-bottom-right-radius:3px; color:#aaa; font-size:7px; margin-left:-8px; margin-right:-8px; z-index:2; display:flex; align-items:flex-end; justify-content:center; cursor:pointer;">T</div>
            <div class="s-key" data-note="G4" style="width:24px; height:80px; background:#fff; border:1px solid #000; border-bottom-left-radius:4px; border-bottom-right-radius:4px; display:flex; align-items:flex-end; justify-content:center; color:#333; font-size:8px; font-weight:bold; cursor:pointer;">G</div>
            <div class="s-key s-black" data-note="G#4" style="width:16px; height:50px; background:#111; border:1px solid #000; border-bottom-left-radius:3px; border-bottom-right-radius:3px; color:#aaa; font-size:7px; margin-left:-8px; margin-right:-8px; z-index:2; display:flex; align-items:flex-end; justify-content:center; cursor:pointer;">Y</div>
            <div class="s-key" data-note="A4" style="width:24px; height:80px; background:#fff; border:1px solid #000; border-bottom-left-radius:4px; border-bottom-right-radius:4px; display:flex; align-items:flex-end; justify-content:center; color:#333; font-size:8px; font-weight:bold; cursor:pointer;">H</div>
            <div class="s-key s-black" data-note="A#4" style="width:16px; height:50px; background:#111; border:1px solid #000; border-bottom-left-radius:3px; border-bottom-right-radius:3px; color:#aaa; font-size:7px; margin-left:-8px; margin-right:-8px; z-index:2; display:flex; align-items:flex-end; justify-content:center; cursor:pointer;">U</div>
            <div class="s-key" data-note="B4" style="width:24px; height:80px; background:#fff; border:1px solid #000; border-bottom-left-radius:4px; border-bottom-right-radius:4px; display:flex; align-items:flex-end; justify-content:center; color:#333; font-size:8px; font-weight:bold; cursor:pointer;">J</div>
            <div class="s-key" data-note="C5" style="width:24px; height:80px; background:#fff; border:1px solid #000; border-bottom-left-radius:4px; border-bottom-right-radius:4px; display:flex; align-items:flex-end; justify-content:center; color:#333; font-size:8px; font-weight:bold; cursor:pointer;">K</div>
          </div>
        </div>

        <!-- Controls panel -->
        <div style="background:#0f172a;border:1px solid #1e293b;border-radius:12px;padding:14px;margin-bottom:14px;display:flex;flex-direction:column;gap:12px;">
          <h3 style="margin:0;font-size:11px;color:#22d3ee;text-transform:uppercase;">${T.settingsHdr}</h3>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <div style="display:flex;flex-direction:column;gap:4px;">
              <label style="font-size:9px;color:#94a3b8;font-weight:700;">${T.oscType}</label>
              <select id="synth-osc" style="background:#020617;border:1px solid #1e293b;color:#fff;font-size:11px;padding:6px;border-radius:6px;outline:none;">
                <option value="sawtooth">Sawtooth</option>
                <option value="sine">Sine</option>
                <option value="square">Square</option>
                <option value="triangle">Triangle</option>
              </select>
            </div>
            <div style="display:flex;flex-direction:column;gap:4px;">
              <div style="display:flex;justify-content:between;font-size:9px;color:#94a3b8;font-weight:700;">
                <span>Filter Freq</span>
                <span id="synth-filter-val">1500Hz</span>
              </div>
              <input type="range" id="synth-filter-slider" min="150" max="4000" step="50" value="1500" style="width:100%;height:4px;background:#334155;border-radius:2px;-webkit-appearance:none;cursor:pointer;">
            </div>
          </div>

          <h3 style="margin:4px 0 0 0;font-size:11px;color:#22d3ee;text-transform:uppercase;">${T.envelopeHdr}</h3>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <div style="display:flex;flex-direction:column;gap:4px;">
              <div style="display:flex;justify-content:between;font-size:9px;color:#94a3b8;font-weight:700;">
                <span>${T.attack}</span>
                <span id="synth-a-val">0.05s</span>
              </div>
              <input type="range" id="synth-a-slider" min="0.01" max="1.5" step="0.05" value="0.05" style="width:100%;height:4px;background:#334155;border-radius:2px;-webkit-appearance:none;cursor:pointer;">
            </div>
            <div style="display:flex;flex-direction:column;gap:4px;">
              <div style="display:flex;justify-content:between;font-size:9px;color:#94a3b8;font-weight:700;">
                <span>${T.decay}</span>
                <span id="synth-d-val">0.15s</span>
              </div>
              <input type="range" id="synth-d-slider" min="0.01" max="1.5" step="0.05" value="0.15" style="width:100%;height:4px;background:#334155;border-radius:2px;-webkit-appearance:none;cursor:pointer;">
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <div style="display:flex;flex-direction:column;gap:4px;">
              <div style="display:flex;justify-content:between;font-size:9px;color:#94a3b8;font-weight:700;">
                <span>${T.sustain}</span>
                <span id="synth-s-val">0.7</span>
              </div>
              <input type="range" id="synth-s-slider" min="0.0" max="1.0" step="0.05" value="0.7" style="width:100%;height:4px;background:#334155;border-radius:2px;-webkit-appearance:none;cursor:pointer;">
            </div>
            <div style="display:flex;flex-direction:column;gap:4px;">
              <div style="display:flex;justify-content:between;font-size:9px;color:#94a3b8;font-weight:700;">
                <span>${T.release}</span>
                <span id="synth-r-val">0.40s</span>
              </div>
              <input type="range" id="synth-r-slider" min="0.05" max="3.0" step="0.05" value="0.40" style="width:100%;height:4px;background:#334155;border-radius:2px;-webkit-appearance:none;cursor:pointer;">
            </div>
          </div>
        </div>

        <!-- Export -->
        <div style="background:#0f172a;border:1px solid #1e293b;border-radius:12px;padding:14px;">
          <h3 style="margin:0 0 4px 0;font-size:11px;color:#22d3ee;text-transform:uppercase;">${T.exportHdr}</h3>
          <p style="font-size:9px;color:#94a3b8;margin:0 0 10px 0;">${T.exportDesc}</p>
          <button id="synth-copy-code" style="width:100%;background:#1e293b;border:1px solid #334155;color:#fff;padding:8px;border-radius:6px;font-size:10px;font-weight:700;cursor:pointer;">${T.exportBtn}</button>
        </div>

        <div id="synth-toast" style="display:none;text-align:center;background:rgba(6,182,212,0.15);border:1px solid rgba(6,182,212,0.4);border-radius:8px;padding:8px;margin-top:10px;color:#22d3ee;font-size:11px;font-weight:700;"></div>
      </div>
    `;

    // Cache elements
    const canvas = document.getElementById('synth-preview-canvas');
    const ctx = canvas.getContext('2d');
    const wrap = document.getElementById('synth-viz-wrap');
    const board = document.getElementById('synth-keyboard');
    const oscSel = document.getElementById('synth-osc');
    const fltSl = document.getElementById('synth-filter-slider');
    const fltVal = document.getElementById('synth-filter-val');
    const aSl = document.getElementById('synth-a-slider');
    const dSl = document.getElementById('synth-d-slider');
    const sSl = document.getElementById('synth-s-slider');
    const rSl = document.getElementById('synth-r-slider');
    const aVal = document.getElementById('synth-a-val');
    const dVal = document.getElementById('synth-d-val');
    const sVal = document.getElementById('synth-s-val');
    const rVal = document.getElementById('synth-r-val');
    const copyBtn = document.getElementById('synth-copy-code');
    const toast = document.getElementById('synth-toast');

    let audioCtx = null;
    let analyserNode = null;
    let mainGain = null;
    let activeOscillators = {};
    let isDrawing = false;

    function resize() {
      if (!canvas) return;
      const rect = wrap.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
    resize();
    setTimeout(resize, 100);

    function showToast(msg) {
      toast.textContent = msg;
      toast.style.display = 'block';
      setTimeout(() => { toast.style.display = 'none'; }, 2200);
    }

    function initAudio() {
      if (audioCtx) return;
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      analyserNode = audioCtx.createAnalyser();
      analyserNode.fftSize = 256;
      mainGain = audioCtx.createGain();
      mainGain.gain.value = 0.5;

      mainGain.connect(analyserNode);
      analyserNode.connect(audioCtx.destination);

      drawSpectrum();
    }

    function playNote(noteName) {
      initAudio();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      if (activeOscillators[noteName]) {
        stopNote(noteName);
      }

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc.type = oscSel.value;
      osc.frequency.value = FREQUENCIES[noteName];

      filter.type = 'lowpass';
      filter.frequency.value = parseFloat(fltSl.value);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(mainGain);

      const now = audioCtx.currentTime;
      const attack = parseFloat(aSl.value);
      const decay = parseFloat(dSl.value);
      const sustain = parseFloat(sSl.value);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.8, now + attack);
      gain.gain.exponentialRampToValueAtTime(sustain * 0.8 || 0.001, now + attack + decay);

      osc.start(now);

      activeOscillators[noteName] = {
        oscillator: osc,
        gainNode: gain,
        filterNode: filter
      };

      const keyEl = board.querySelector(`[data-note="${noteName}"]`);
      if (keyEl) {
        keyEl.style.background = keyEl.classList.contains('s-black') ? '#334155' : '#cbd5e1';
      }
    }

    function stopNote(noteName) {
      if (!activeOscillators[noteName]) return;

      const { oscillator, gainNode } = activeOscillators[noteName];
      const now = audioCtx.currentTime;
      const release = parseFloat(rSl.value);

      try {
        gainNode.gain.cancelScheduledValues(now);
        gainNode.gain.setValueAtTime(gainNode.gain.value, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + release);
        oscillator.stop(now + release);
      } catch (e) {
        oscillator.stop(now);
      }

      delete activeOscillators[noteName];

      const keyEl = board.querySelector(`[data-note="${noteName}"]`);
      if (keyEl) {
        keyEl.style.background = keyEl.classList.contains('s-black') ? '#111' : '#fff';
      }
    }

    function drawSpectrum() {
      if (!canvas) return;
      requestAnimationFrame(drawSpectrum);

      if (!analyserNode) {
        ctx.fillStyle = '#020617';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return;
      }

      const bufferLength = analyserNode.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyserNode.getByteTimeDomainData(dataArray);

      ctx.fillStyle = 'rgba(2, 6, 23, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#06b6d4';
      ctx.beginPath();

      const sliceWidth = canvas.width * 1.0 / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * canvas.height / 2;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    }

    // Bind board events
    board.querySelectorAll('.s-key').forEach(key => {
      key.addEventListener('mousedown', (e) => {
        playNote(e.target.getAttribute('data-note'));
      });
      key.addEventListener('mouseup', (e) => {
        stopNote(e.target.getAttribute('data-note'));
      });
      key.addEventListener('mouseleave', (e) => {
        stopNote(e.target.getAttribute('data-note'));
      });

      // Touch
      key.addEventListener('touchstart', (e) => {
        e.preventDefault();
        playNote(e.target.getAttribute('data-note'));
      });
      key.addEventListener('touchend', (e) => {
        e.preventDefault();
        stopNote(e.target.getAttribute('data-note'));
      });
    });

    // Keyboard bindings listener
    const keydownHandler = (e) => {
      if (e.repeat) return;
      if (window.activeTab !== 'audiosynth') return;
      const k = e.key.toLowerCase();
      if (KEY_MAP[k]) playNote(KEY_MAP[k]);
    };

    const keyupHandler = (e) => {
      if (window.activeTab !== 'audiosynth') return;
      const k = e.key.toLowerCase();
      if (KEY_MAP[k]) stopNote(KEY_MAP[k]);
    };

    window.removeEventListener('keydown', window._synthKeyDown);
    window.removeEventListener('keyup', window._synthKeyUp);

    window._synthKeyDown = keydownHandler;
    window._synthKeyUp = keyupHandler;

    window.addEventListener('keydown', keydownHandler);
    window.addEventListener('keyup', keyupHandler);

    // Sliders
    fltSl.addEventListener('input', (e) => {
      fltVal.textContent = e.target.value + 'Hz';
      Object.keys(activeOscillators).forEach(k => {
        activeOscillators[k].filterNode.frequency.value = parseFloat(e.target.value);
      });
    });

    aSl.addEventListener('input', (e) => aVal.textContent = e.target.value + 's');
    dSl.addEventListener('input', (e) => dVal.textContent = e.target.value + 's');
    sSl.addEventListener('input', (e) => sVal.textContent = e.target.value);
    rSl.addEventListener('input', (e) => rVal.textContent = e.target.value + 's');

    drawSpectrum();

    copyBtn.addEventListener('click', () => {
      const osc = oscSel.value;
      const filter = parseFloat(fltSl.value);
      const attack = parseFloat(aSl.value);
      const decay = parseFloat(dSl.value);
      const sustain = parseFloat(sSl.value);
      const release = parseFloat(rSl.value);

      const compCode = `<!-- Standalone Synth Player Web Component -->
<div class="synth-box" style="width: 320px; background: #0b1329; border: 1px solid #1e293b; border-radius: 16px; padding: 16px; font-family: sans-serif; color: #fff;">
  <h3 style="margin: 0 0 10px 0; font-size: 13px; color: #06b6d4; text-transform: uppercase;">🎹 Live Subtractive Synth</h3>
  <canvas id="embedSynthCanvas" style="width: 100%; height: 60px; background: #000; border-radius: 8px; margin-bottom: 12px; display: block;"></canvas>
  <div class="piano-board" id="embedBoard" style="display: flex; justify-content: center; position: relative;">
    <div class="piano-key" data-note="C4" style="width:28px; height:80px; background:#fff; border:1px solid #000; display:flex; align-items:flex-end; justify-content:center; color:#333; font-size:9px; font-weight:bold; cursor:pointer;">A</div>
    <div class="piano-key black-k" data-note="C#4" style="width:18px; height:50px; background:#111; border:1px solid #000; color:#aaa; font-size:8px; margin-left:-9px; margin-right:-9px; z-index:2; display:flex; align-items:flex-end; justify-content:center; cursor:pointer;">W</div>
    <div class="piano-key" data-note="D4" style="width:28px; height:80px; background:#fff; border:1px solid #000; display:flex; align-items:flex-end; justify-content:center; color:#333; font-size:9px; font-weight:bold; cursor:pointer;">S</div>
    <div class="piano-key black-k" data-note="D#4" style="width:18px; height:50px; background:#111; border:1px solid #000; color:#aaa; font-size:8px; margin-left:-9px; margin-right:-9px; z-index:2; display:flex; align-items:flex-end; justify-content:center; cursor:pointer;">E</div>
    <div class="piano-key" data-note="E4" style="width:28px; height:80px; background:#fff; border:1px solid #000; display:flex; align-items:flex-end; justify-content:center; color:#333; font-size:9px; font-weight:bold; cursor:pointer;">D</div>
    <div class="piano-key" data-note="F4" style="width:28px; height:80px; background:#fff; border:1px solid #000; display:flex; align-items:flex-end; justify-content:center; color:#333; font-size:9px; font-weight:bold; cursor:pointer;">F</div>
    <div class="piano-key black-k" data-note="F#4" style="width:18px; height:50px; background:#111; border:1px solid #000; color:#aaa; font-size:8px; margin-left:-9px; margin-right:-9px; z-index:2; display:flex; align-items:flex-end; justify-content:center; cursor:pointer;">T</div>
    <div class="piano-key" data-note="G4" style="width:28px; height:80px; background:#fff; border:1px solid #000; display:flex; align-items:flex-end; justify-content:center; color:#333; font-size:9px; font-weight:bold; cursor:pointer;">G</div>
    <div class="piano-key black-k" data-note="G#4" style="width:18px; height:50px; background:#111; border:1px solid #000; color:#aaa; font-size:8px; margin-left:-9px; margin-right:-9px; z-index:2; display:flex; align-items:flex-end; justify-content:center; cursor:pointer;">Y</div>
    <div class="piano-key" data-note="A4" style="width:28px; height:80px; background:#fff; border:1px solid #000; display:flex; align-items:flex-end; justify-content:center; color:#333; font-size:9px; font-weight:bold; cursor:pointer;">H</div>
    <div class="piano-key black-k" data-note="A#4" style="width:18px; height:50px; background:#111; border:1px solid #000; color:#aaa; font-size:8px; margin-left:-9px; margin-right:-9px; z-index:2; display:flex; align-items:flex-end; justify-content:center; cursor:pointer;">U</div>
    <div class="piano-key" data-note="B4" style="width:28px; height:80px; background:#fff; border:1px solid #000; display:flex; align-items:flex-end; justify-content:center; color:#333; font-size:9px; font-weight:bold; cursor:pointer;">J</div>
    <div class="piano-key" data-note="C5" style="width:28px; height:80px; background:#fff; border:1px solid #000; display:flex; align-items:flex-end; justify-content:center; color:#333; font-size:9px; font-weight:bold; cursor:pointer;">K</div>
  </div>
</div>
<script>
(function() {
  const FREQS = { "C4":261.6, "C#4":277.2, "D4":293.7, "D#4":311.1, "E4":329.6, "F4":349.2, "F#4":370.0, "G4":392.0, "G#4":415.3, "A4":440.0, "A#4":466.2, "B4":493.9, "C5":523.3 };
  const KM = { "a":"C4","w":"C#4","s":"D4","e":"D#4","d":"E4","f":"F4","t":"F#4","g":"G4","y":"G#4","h":"A4","u":"A#4","j":"B4","k":"C5" };
  let ac = null, analyser = null, gain = null, active = {};
  
  function init() {
    if(ac) return;
    ac = new(window.AudioContext||window.webkitAudioContext)();
    analyser = ac.createAnalyser(); analyser.fftSize = 128;
    gain = ac.createGain(); gain.gain.value = 0.5;
    gain.connect(analyser); analyser.connect(ac.destination);
    viz();
  }

  function play(note) {
    init();
    if(ac.state === "suspended") ac.resume();
    if(active[note]) stop(note);
    const osc = ac.createOscillator();
    const gn = ac.createGain();
    const flt = ac.createBiquadFilter();
    osc.type = "${osc}";
    osc.frequency.value = FREQS[note];
    flt.type = "lowpass"; flt.frequency.value = ${filter};
    osc.connect(flt); flt.connect(gn); gn.connect(gain);
    const now = ac.currentTime;
    gn.gain.setValueAtTime(0, now);
    gn.gain.linearRampToValueAtTime(0.7, now + ${attack});
    gn.gain.exponentialRampToValueAtTime(${sustain}*0.7||0.001, now + ${attack} + ${decay});
    osc.start(now);
    active[note] = { o: osc, g: gn };
  }

  function stop(note) {
    if(!active[note]) return;
    const { o, g } = active[note];
    const now = ac.currentTime;
    try {
      g.gain.cancelScheduledValues(now);
      g.gain.setValueAtTime(g.gain.value, now);
      g.gain.exponentialRampToValueAtTime(0.0001, now + ${release});
      o.stop(now + ${release});
    } catch(e){ o.stop(now); }
    delete active[note];
  }

  const board = document.getElementById("embedBoard");
  board.querySelectorAll(".piano-key").forEach(k => {
    k.addEventListener("mousedown", () => play(k.getAttribute("data-note")));
    k.addEventListener("mouseup", () => stop(k.getAttribute("data-note")));
    k.addEventListener("mouseleave", () => stop(k.getAttribute("data-note")));
  });
  window.addEventListener("keydown", (e) => {
    if(e.repeat) return;
    const note = KM[e.key.toLowerCase()];
    if(note) play(note);
  });
  window.addEventListener("keyup", (e) => {
    const note = KM[e.key.toLowerCase()];
    if(note) stop(note);
  });

  const cv = document.getElementById("embedSynthCanvas");
  const c = cv.getContext("2d");
  function viz() {
    requestAnimationFrame(viz);
    if(!analyser) return;
    const bl = analyser.frequencyBinCount;
    const da = new Uint8Array(bl);
    analyser.getByteTimeDomainData(da);
    c.fillStyle = "#000"; c.fillRect(0,0,cv.width,cv.height);
    c.lineWidth = 2; c.strokeStyle = "#06b6d4"; c.beginPath();
    let sw = cv.width*1.0/bl, x = 0;
    for(let i=0; i<bl; i++) {
      let y = (da[i]/128.0)*cv.height/2;
      if(i===0) c.moveTo(x,y); else c.lineTo(x,y);
      x += sw;
    }
    c.lineTo(cv.width, cv.height/2); c.stroke();
  }
})();
<\/script>`;

      navigator.clipboard.writeText(compCode).then(() => {
        showToast(T.copied);
      }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = compCode; document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); document.body.removeChild(ta);
        showToast(T.copied);
      });
    });

    document.getElementById('synth-load-full-app').addEventListener('click', () => {
      if (window.editor) {
        window.editor.setValue(STANDALONE_TEMPLATE);
        if (window.runPreview) window.runPreview();
        showToast(T.loadSuccess);
      }
    });

    if (window.showToast) window.showToast('✅ Audio Synthesizer initialized.');
  }
})();
