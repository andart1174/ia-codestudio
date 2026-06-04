/**
 * 🔊 Code Sonar & Audio Health Deck v1.0
 * IA Architecte — Code Studio Pro | EN/FR Bilingual
 * Fully decoupled script using decorator pattern
 */
(function() {
'use strict';

const TX = {
  en: {
    tab: 'Code Sonar',
    title: '🔊 Code Sonar & Audio Health Deck',
    sub: 'Analyze code structures and health through audio synthesis',
    desc: 'Starts a live synthesizer sequence mapped to your workspace code. Clean files play harmonious ambient chords, while syntax warnings or high nesting complexity trigger tension alarms.',
    btnPlay: '▶ Start Sonar Loop',
    btnStop: '■ Stop Sonar Loop',
    btnScan: '⚡ Diagnostic Chime',
    btnMute: 'Mute',
    btnUnmute: 'Unmute',
    lblVol: 'Volume',
    lblBpm: 'Tempo (BPM)',
    lblWave: 'Oscillator Waveform',
    lblMetrics: 'Code Audio Diagnostics',
    lblLines: 'Lines of Code',
    lblNesting: 'Nesting Complexity',
    lblComments: 'Comment Ratio',
    lblSyntax: 'Syntax Health',
    lblKey: 'Musical Harmony',
    syntaxValid: '🟢 Valid / Clean',
    syntaxError: '🔴 Alert / Mismatch Detected',
    keyMajor: 'C Major Pentatonic (Harmonious Ambient)',
    keyMinor: 'D# Dissonant Tritone (Alert Tension)',
    keyEmpty: 'Silence (No Code Detected)',
    btnLoadApp: '🚀 Load Standalone Synth in Editor',
    injected: '✅ Code Sonar Standalone App loaded into Monaco Editor!',
    noEditor: '⚠️ Monaco Editor is not ready.',
    waveTypes: { sine: 'Sine Wave (Mellow)', square: 'Square Wave (Retro)', sawtooth: 'Sawtooth (Buzz)', triangle: 'Triangle (Flute)' }
  },
  fr: {
    tab: 'Sonar de Code',
    title: '🔊 Sonar de Code & Audio Health Deck',
    sub: 'Analysez la santé et la structure du code par synthèse sonore',
    desc: 'Démarre une séquence synthétique en direct basée sur le code de l\'éditeur. Un code propre émet des accords ambiants harmonieux, tandis que les erreurs ou la complexité imbriquée déclenchent des alarmes de tension.',
    btnPlay: '▶ Démarrer le Sonar',
    btnStop: '■ Arrêter le Sonar',
    btnScan: '⚡ Carillon Diagnostic',
    btnMute: 'Sourdine',
    btnUnmute: 'Activer le Son',
    lblVol: 'Volume',
    lblBpm: 'Tempo (BPM)',
    lblWave: 'Onde de l\'Oscillateur',
    lblMetrics: 'Diagnostics Audio du Code',
    lblLines: 'Lignes de Code',
    lblNesting: 'Complexité d\'Imbrication',
    lblComments: 'Ratio de Commentaires',
    lblSyntax: 'Santé de la Syntaxe',
    lblKey: 'Harmonie Musicale',
    syntaxValid: '🟢 Valide / Propre',
    syntaxError: '🔴 Alerte / Mismatches Détectés',
    keyMajor: 'Do Majeur Pentatonique (Ambiance Harmonieuse)',
    keyMinor: 'Ré# Tritone Dissonant (Alerte de Tension)',
    keyEmpty: 'Silence (Aucun Code Détecté)',
    btnLoadApp: '🚀 Charger le Synthé Autonome',
    injected: '✅ Synthétiseur Sonar autonome chargé dans l\'Éditeur Monaco !',
    noEditor: '⚠️ L\'Éditeur Monaco n\'est pas prêt.',
    waveTypes: { sine: 'Onde Sinusoïdale (Doux)', square: 'Onde Carrée (Rétro)', sawtooth: 'Onde Dent de Scie (Brut)', triangle: 'Onde Triangulaire (Flûte)' }
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

// Synthesizer State
let audioCtx = null;
let mainGainNode = null;
let analyserNode = null;
let seqInterval = null;
let currentStep = 0;
let isPlaying = false;
let isMuted = false;
let volumeVal = 0.3;
let bpmVal = 100;
let waveTypeVal = 'sine';
let animationFrameId = null;

// Scale Definition: C Major Pentatonic (Clean Code)
const PENTATONIC_SCALE = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];
// Dissonant warnings for high nesting/errors
const DISSONANT_INTERVALS = [82.41, 110.00, 155.56, 196.00, 220.00, 311.13, 415.30, 466.16];

function initAudio() {
  if (audioCtx) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AudioContext();
  
  analyserNode = audioCtx.createAnalyser();
  analyserNode.fftSize = 256;
  
  mainGainNode = audioCtx.createGain();
  mainGainNode.gain.setValueAtTime(isMuted ? 0 : volumeVal, audioCtx.currentTime);
  
  analyserNode.connect(mainGainNode);
  mainGainNode.connect(audioCtx.destination);
}

function stopAudio() {
  if (seqInterval) {
    clearInterval(seqInterval);
    seqInterval = null;
  }
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  isPlaying = false;
  currentStep = 0;
  updateUIState();
}

function analyzeWorkspaceCode() {
  const code = window.editor ? window.editor.getValue() : '';
  if (!code.trim()) {
    return { lines: 0, nesting: 0, comments: 0, hasError: false, isEmpty: true };
  }

  const lines = code.split('\n');
  const totalLines = lines.length;
  
  // Calculate maximum curly braces nesting or element nesting
  let nestingLevel = 0;
  let maxNesting = 0;
  for (let i = 0; i < code.length; i++) {
    if (code[i] === '{' || code[i] === '(' || (code[i] === '<' && code[i+1] !== '/' && code[i+1] !== '!')) {
      nestingLevel++;
      if (nestingLevel > maxNesting) maxNesting = nestingLevel;
    }
    if (code[i] === '}' || code[i] === ')' || (code[i] === '<' && code[i+1] === '/')) {
      nestingLevel = Math.max(0, nestingLevel - 1);
    }
  }

  // Calculate comments (JS, CSS, HTML comment lines)
  let commentLines = 0;
  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*') || trimmed.startsWith('<!--') || trimmed.endsWith('-->')) {
      commentLines++;
    }
  });
  const commentRatio = Math.round((commentLines / totalLines) * 100);

  // Mismatched check (parentheses, brackets, curly braces)
  let braces = 0, brackets = 0, parens = 0;
  for (let i = 0; i < code.length; i++) {
    if (code[i] === '{') braces++;
    if (code[i] === '}') braces--;
    if (code[i] === '[') brackets++;
    if (code[i] === ']') brackets--;
    if (code[i] === '(') parens++;
    if (code[i] === ')') parens--;
  }
  const hasError = braces !== 0 || brackets !== 0 || parens !== 0;

  return {
    lines: totalLines,
    nesting: Math.min(maxNesting, 12),
    comments: commentRatio,
    hasError: hasError,
    isEmpty: false
  };
}

function playNote(freq, type, duration, release, isDissonant) {
  if (!audioCtx) initAudio();
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const osc = audioCtx.createOscillator();
  const filter = audioCtx.createBiquadFilter();
  const nodeGain = audioCtx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

  // Set filter sweeps
  filter.type = isDissonant ? 'bandpass' : 'lowpass';
  filter.frequency.setValueAtTime(isDissonant ? 1200 : 3000, audioCtx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(isDissonant ? 300 : 800, audioCtx.currentTime + duration);

  // Envelope logic
  nodeGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
  nodeGain.gain.exponentialRampToValueAtTime(0.2, audioCtx.currentTime + 0.02);
  nodeGain.gain.exponentialRampToValueAtTime(0.1, audioCtx.currentTime + duration);
  nodeGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration + release);

  osc.connect(filter);
  filter.connect(nodeGain);
  nodeGain.connect(analyserNode);

  osc.start();
  osc.stop(audioCtx.currentTime + duration + release + 0.05);
}

function executeSonificationTick() {
  const codeStats = analyzeWorkspaceCode();
  updateStatsDisplay(codeStats);

  if (codeStats.isEmpty) {
    return; // Silence
  }

  currentStep = (currentStep + 1) % 8;

  // Visual highlight in sequencer grid
  const cells = document.querySelectorAll('.seq-cell');
  cells.forEach((cell, idx) => {
    if (idx === currentStep) {
      cell.style.background = 'rgba(16,185,129,0.7)';
      cell.style.boxShadow = '0 0 10px rgba(16,185,129,0.5)';
    } else {
      cell.style.background = 'rgba(255,255,255,0.05)';
      cell.style.boxShadow = 'none';
    }
  });

  const duration = 0.15;
  const release = codeStats.comments > 30 ? 1.2 : 0.2; // Comments add warm ambient decay

  if (codeStats.hasError) {
    // Alert siren sound pattern
    if (currentStep % 2 === 0) {
      playNote(110, 'sawtooth', 0.25, 0.1, true); // Low buzz warning
    } else {
      playNote(220, 'square', 0.1, 0.05, true); // Sharp tick
    }
    return;
  }

  // Play normal melodies based on scaling complexity
  // Map current step and nesting complexity to scale indexes
  const scale = codeStats.nesting > 4 ? DISSONANT_INTERVALS : PENTATONIC_SCALE;
  const isDissonant = codeStats.nesting > 4;

  let noteIndex = (currentStep + Math.round(codeStats.nesting)) % scale.length;
  // Make arpeggios jump around based on lines count
  if (currentStep % 3 === 0) {
    noteIndex = (noteIndex + Math.round(codeStats.lines / 10)) % scale.length;
  }

  const freq = scale[noteIndex];
  playNote(freq, waveTypeVal, duration, release, isDissonant);
}

function startSequencer() {
  initAudio();
  if (isPlaying) return;
  isPlaying = true;
  updateUIState();
  
  const tickDuration = (60 / bpmVal) * 1000 * 0.5; // 8th notes approximation
  seqInterval = setInterval(executeSonificationTick, tickDuration);
  
  // Start drawing to Canvas
  drawOscilloscope();
}

function playDiagnosticChime() {
  initAudio();
  const codeStats = analyzeWorkspaceCode();
  updateStatsDisplay(codeStats);
  
  if (codeStats.isEmpty) {
    playNote(261.63, 'sine', 0.5, 0.5, false); // Basic C tone
    return;
  }
  
  if (codeStats.hasError) {
    // Dissonant tritone alarm chord
    playNote(146.83, 'sawtooth', 0.4, 0.2, true);
    playNote(207.65, 'sawtooth', 0.4, 0.2, true);
  } else {
    // Harmonious major arpeggio sweep
    const scale = PENTATONIC_SCALE;
    const baseIdx = Math.min(codeStats.nesting, 5);
    playNote(scale[baseIdx], 'sine', 0.2, 0.4, false);
    setTimeout(() => playNote(scale[baseIdx + 2], 'sine', 0.2, 0.4, false), 80);
    setTimeout(() => playNote(scale[baseIdx + 4], 'sine', 0.3, 0.8, false), 160);
  }
}

function drawOscilloscope() {
  const canvas = document.getElementById('sonar-scope');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  
  const bufferLength = analyserNode.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  
  function draw() {
    if (!isPlaying) {
      // Clear with soft gradient
      ctx.fillStyle = '#090f1d';
      ctx.fillRect(0, 0, width, height);
      return;
    }
    
    animationFrameId = requestAnimationFrame(draw);
    analyserNode.getByteTimeDomainData(dataArray);
    
    ctx.fillStyle = 'rgba(9, 15, 29, 0.3)'; // Trail effect
    ctx.fillRect(0, 0, width, height);
    
    // Draw neon scanner grid
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.05)';
    ctx.lineWidth = 1;
    for(let i=0; i<width; i+=20) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, height); ctx.stroke();
    }
    for(let j=0; j<height; j+=20) {
      ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(width, j); ctx.stroke();
    }
    
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#10b981';
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(16, 185, 129, 0.6)';
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
    ctx.shadowBlur = 0; // reset
  }
  
  draw();
}

function updateUIState() {
  const btn = document.getElementById('btn-sonar-toggle');
  if (!btn) return;
  if (isPlaying) {
    btn.textContent = t('btnStop');
    btn.style.background = 'linear-gradient(135deg, #ef4444, #b91c1c)';
  } else {
    btn.textContent = t('btnPlay');
    btn.style.background = 'linear-gradient(135deg, #10b981, #047857)';
  }
}

function updateStatsDisplay(stats) {
  const dLines = document.getElementById('stat-sonar-lines');
  const dNesting = document.getElementById('stat-sonar-nesting');
  const dComments = document.getElementById('stat-sonar-comments');
  const dSyntax = document.getElementById('stat-sonar-syntax');
  const dKey = document.getElementById('stat-sonar-key');
  
  if (!dLines) return;
  
  dLines.textContent = stats.isEmpty ? '0' : stats.lines;
  dNesting.textContent = stats.isEmpty ? '0' : stats.nesting;
  dComments.textContent = stats.isEmpty ? '0%' : stats.comments + '%';
  
  if (stats.isEmpty) {
    dSyntax.textContent = 'Silence';
    dSyntax.style.color = '#64748b';
    dKey.textContent = t('keyEmpty');
  } else if (stats.hasError) {
    dSyntax.textContent = t('syntaxError');
    dSyntax.style.color = '#f87171';
    dKey.textContent = t('keyMinor');
  } else {
    dSyntax.textContent = t('syntaxValid');
    dSyntax.style.color = '#34d399';
    dKey.textContent = stats.nesting > 4 ? t('keyMinor') : t('keyMajor');
  }
}

// 📦 Standalone App code bundle
const STANDALONE_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bilingual Audio Code Sonar & Synth Lab</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #090f1d;
      --panel: #111827;
      --border: rgba(255, 255, 255, 0.08);
      --primary: #10b981;
      --glow: rgba(16, 185, 129, 0.35);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: #e2e8f0;
      font-family: 'Inter', sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .synth-card {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 30px;
      width: 100%;
      max-width: 680px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    }
    h1 {
      font-size: 20px;
      font-weight: 900;
      margin-bottom: 5px;
      background: linear-gradient(135deg, #10b981, #6366f1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .sub { font-size: 11px; color: #94a3b8; margin-bottom: 20px; }
    .display-box {
      background: #020617;
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 15px;
      margin-bottom: 20px;
    }
    canvas {
      width: 100%;
      height: 120px;
      background: #020617;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.05);
      display: block;
    }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
    .col { display: flex; flex-direction: column; gap: 6px; }
    label { font-size: 10px; font-weight: 800; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em; }
    select, input[type="range"] {
      width: 100%;
      background: #1e293b;
      border: 1px solid var(--border);
      color: #fff;
      padding: 10px;
      border-radius: 8px;
      outline: none;
      font-size: 12px;
    }
    textarea {
      width: 100%;
      height: 120px;
      background: #020617;
      border: 1px solid var(--border);
      color: #34d399;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      padding: 12px;
      border-radius: 8px;
      resize: none;
      outline: none;
      margin-bottom: 20px;
    }
    .btn-row { display: flex; gap: 10px; }
    button {
      flex: 1;
      padding: 12px;
      border-radius: 8px;
      border: none;
      font-weight: 800;
      font-size: 12px;
      color: #fff;
      cursor: pointer;
      font-family: inherit;
      transition: all 0.2s;
    }
    .btn-play { background: linear-gradient(135deg, #10b981, #059669); box-shadow: 0 4px 14px var(--glow); }
    .btn-play:hover { transform: translateY(-1px); }
    .btn-sec { background: rgba(255,255,255,0.06); border: 1px solid var(--border); }
    .btn-sec:hover { background: rgba(255,255,255,0.1); }
    .stats-table { font-size: 11px; width: 100%; margin-top: 15px; border-collapse: collapse; }
    .stats-table td { padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.03); }
    .stats-table td:last-child { text-align: right; font-weight: 800; color: #10b981; }
    .lang-row { display: flex; justify-content: flex-end; gap: 10px; margin-bottom: 15px; }
    .lang-btn { flex: none; width: 34px; height: 24px; padding: 0; background: transparent; border: 1px solid var(--border); color: #64748b; font-size: 10px; line-height: 22px; text-align: center; border-radius: 4px; }
    .lang-btn.active { color: #fff; border-color: var(--primary); background: rgba(16,185,129,0.1); }
  </style>
</head>
<body>

<div class="synth-card">
  <div class="lang-row">
    <button class="lang-btn active" onclick="setLang('en')">EN</button>
    <button class="lang-btn" onclick="setLang('fr')">FR</button>
  </div>
  
  <h1 id="txt-title">Bilingual Code Sonar Deck</h1>
  <div class="sub" id="txt-sub">Visual & audio feedback synthesizer dashboard</div>

  <textarea id="txt-code" placeholder="Paste some HTML or JS code here to sonify it..." oninput="analyzeCode()">
function calculateFactorial(n) {
  if (n === 0 || n === 1) {
    return 1; // Base case
  } else {
    // Nested recursion loop
    return n * calculateFactorial(n - 1);
  }
}
  </textarea>

  <div class="display-box">
    <canvas id="scope"></canvas>
    <table class="stats-table">
      <tr><td id="txt-lbl-lines">Lines Count</td><td id="val-lines">0</td></tr>
      <tr><td id="txt-lbl-nesting">Nesting Depth</td><td id="val-nesting">0</td></tr>
      <tr><td id="txt-lbl-comments">Comments Ratio</td><td id="val-comments">0%</td></tr>
      <tr><td id="txt-lbl-syntax">Syntax status</td><td id="val-syntax">Clean</td></tr>
      <tr><td id="txt-lbl-harmony">Harmonic scale</td><td id="val-harmony">C Major</td></tr>
    </table>
  </div>

  <div class="grid">
    <div class="col">
      <label id="txt-lbl-wave">Oscillator type</label>
      <select id="sel-wave" onchange="waveType = this.value">
        <option value="sine">Sine Wave</option>
        <option value="triangle" selected>Triangle Wave</option>
        <option value="square">Square Wave</option>
        <option value="sawtooth">Sawtooth Wave</option>
      </select>
    </div>
    <div class="col">
      <label id="txt-lbl-bpm">Tempo (BPM)</label>
      <input type="range" id="rng-bpm" min="60" max="180" value="100" oninput="bpm = this.value; document.getElementById('lbl-bpm-val').textContent = this.value + ' BPM'">
      <div id="lbl-bpm-val" style="font-size: 9px; text-align: right; color:#64748b; margin-top:2px;">100 BPM</div>
    </div>
  </div>

  <div class="btn-row">
    <button class="btn-play" id="btn-toggle" onclick="togglePlay()">Start Sonar Loop</button>
    <button class="btn-sec" id="btn-chime" onclick="triggerScan()">Diagnostic Chime</button>
  </div>
</div>

<script>
  let lang = 'en';
  const T = {
    en: {
      title: 'Bilingual Code Sonar Deck', sub: 'Visual & audio feedback synthesizer dashboard',
      btnPlay: 'Start Sonar Loop', btnStop: 'Stop Sonar Loop', btnChime: 'Diagnostic Chime',
      lblLines: 'Lines Count', lblNesting: 'Nesting Depth', lblComments: 'Comments Ratio',
      lblSyntax: 'Syntax status', lblHarmony: 'Harmonic scale', lblWave: 'Oscillator type', lblBpm: 'Tempo (BPM)',
      synValid: '🟢 Valid / Clean', synErr: '🔴 Alert / Mismatched Tags',
      keyMajor: 'C Major Pentatonic (Harmonious)', keyMinor: 'D# Dissonant Tritone (Tension Alert)', keyEmpty: 'Silence'
    },
    fr: {
      title: 'Sonar de Code Bilingue', sub: 'Tableau de bord de synthèse sonore et visuelle',
      btnPlay: 'Démarrer le Sonar', btnStop: 'Arrêter le Sonar', btnChime: 'Carillon Diagnostic',
      lblLines: 'Nombre de Lignes', lblNesting: 'Niveau d\\'Imbrication', lblComments: 'Ratio Commentaires',
      lblSyntax: 'Statut Syntaxe', lblHarmony: 'Gamme Harmonique', lblWave: 'Type d\\'Oscillateur', lblBpm: 'Tempo (BPM)',
      synValid: '🟢 Valide / Propre', synErr: '🔴 Alerte / Mismatch Balise',
      keyMajor: 'Do Majeur Pentatonique (Harmonieux)', keyMinor: 'Ré# Dissonant Tritone (Tension Alerte)', keyEmpty: 'Silence'
    }
  };

  function setLang(l) {
    lang = l;
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById('txt-title').textContent = T[lang].title;
    document.getElementById('txt-sub').textContent = T[lang].sub;
    document.getElementById('btn-toggle').textContent = isPlaying ? T[lang].btnStop : T[lang].btnPlay;
    document.getElementById('btn-chime').textContent = T[lang].btnChime;
    document.getElementById('txt-lbl-lines').textContent = T[lang].lblLines;
    document.getElementById('txt-lbl-nesting').textContent = T[lang].lblNesting;
    document.getElementById('txt-lbl-comments').textContent = T[lang].lblComments;
    document.getElementById('txt-lbl-syntax').textContent = T[lang].lblSyntax;
    document.getElementById('txt-lbl-harmony').textContent = T[lang].lblHarmony;
    document.getElementById('txt-lbl-wave').textContent = T[lang].lblWave;
    document.getElementById('txt-lbl-bpm').textContent = T[lang].lblBpm;
    analyzeCode();
  }

  // Audio Logic
  let audioCtx = null;
  let gainNode = null;
  let analyser = null;
  let isPlaying = false;
  let loopTimer = null;
  let currentStep = 0;
  let bpm = 100;
  let waveType = 'triangle';

  const SCALE = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
  const ALARM_SCALE = [82.41, 110.00, 155.56, 311.13];

  function initAudio() {
    if(audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 128;
    gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
    analyser.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    drawOscilloscope();
  }

  function playNote(freq, type, duration, release, isDissonant) {
    if(!audioCtx) initAudio();
    if(audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const nodeGain = audioCtx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    nodeGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    nodeGain.gain.exponentialRampToValueAtTime(0.15, audioCtx.currentTime + 0.02);
    nodeGain.gain.exponentialRampToValueAtTime(0.05, audioCtx.currentTime + duration);
    nodeGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration + release);
    
    osc.connect(nodeGain);
    nodeGain.connect(analyser);
    osc.start();
    osc.stop(audioCtx.currentTime + duration + release + 0.1);
  }

  function analyzeCode() {
    const code = document.getElementById('txt-code').value;
    const lines = code.split('\\n');
    const lineCount = lines.length;
    
    let nesting = 0, maxNest = 0;
    for(let i=0; i<code.length; i++) {
      if(code[i] === '{' || code[i] === '(') { nesting++; if(nesting > maxNest) maxNest = nesting; }
      if(code[i] === '}' || code[i] === ')') nesting = Math.max(0, nesting - 1);
    }
    
    let comments = 0;
    lines.forEach(l => {
      const t = l.trim();
      if(t.startsWith('//') || t.startsWith('/*') || t.startsWith('*') || t.startsWith('<!--')) comments++;
    });
    const cRatio = Math.round((comments / Math.max(lineCount, 1)) * 100);

    let braces=0, brackets=0, parens=0;
    for(let i=0; i<code.length; i++) {
      if(code[i]==='{') braces++; if(code[i]==='}') braces--;
      if(code[i]==='[') brackets++; if(code[i]===']') brackets--;
      if(code[i]==='(') parens++; if(code[i]===')') parens--;
    }
    const hasError = braces !== 0 || brackets !== 0 || parens !== 0;

    document.getElementById('val-lines').textContent = lineCount;
    document.getElementById('val-nesting').textContent = maxNest;
    document.getElementById('val-comments').textContent = cRatio + '%';
    
    const valSyntax = document.getElementById('val-syntax');
    const valHarmony = document.getElementById('val-harmony');
    
    if(hasError) {
      valSyntax.textContent = T[lang].synErr;
      valSyntax.style.color = '#f87171';
      valHarmony.textContent = T[lang].keyMinor;
    } else {
      valSyntax.textContent = T[lang].synValid;
      valSyntax.style.color = '#34d399';
      valHarmony.textContent = T[lang].keyMajor;
    }

    return { lines: lineCount, nesting: maxNest, comments: cRatio, hasError };
  }

  function loopTick() {
    const stats = analyzeCode();
    currentStep = (currentStep + 1) % 8;
    
    const release = stats.comments > 30 ? 1.0 : 0.15;
    if(stats.hasError) {
      // Alarm sound tick
      playNote(currentStep % 2 === 0 ? 90 : 130, 'sawtooth', 0.15, 0.05, true);
    } else {
      const targetScale = stats.nesting > 4 ? ALARM_SCALE : SCALE;
      let noteIdx = (currentStep + stats.nesting) % targetScale.length;
      playNote(targetScale[noteIdx], waveType, 0.12, release, stats.nesting > 4);
    }
    
    // schedule next tick
    const tickTime = (60 / bpm) * 1000 * 0.5;
    loopTimer = setTimeout(loopTick, tickTime);
  }

  function togglePlay() {
    initAudio();
    const btn = document.getElementById('btn-toggle');
    if(isPlaying) {
      clearTimeout(loopTimer);
      isPlaying = false;
      btn.textContent = T[lang].btnPlay;
      btn.classList.remove('btn-sec');
      btn.classList.add('btn-play');
    } else {
      isPlaying = true;
      btn.textContent = T[lang].btnStop;
      btn.classList.remove('btn-play');
      btn.classList.add('btn-sec');
      loopTick();
    }
  }

  function triggerScan() {
    initAudio();
    const stats = analyzeCode();
    if(stats.hasError) {
      playNote(110, 'sawtooth', 0.4, 0.1, true);
      playNote(155.56, 'sawtooth', 0.4, 0.1, true);
    } else {
      playNote(261.63, 'sine', 0.15, 0.3, false);
      setTimeout(() => playNote(329.63, 'sine', 0.15, 0.3, false), 80);
      setTimeout(() => playNote(523.25, 'sine', 0.3, 0.6, false), 160);
    }
  }

  function drawOscilloscope() {
    const canvas = document.getElementById('scope');
    const ctx = canvas.getContext('2d');
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    function draw() {
      requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);
      
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#10b981';
      ctx.beginPath();
      
      const sliceWidth = canvas.width * 1.0 / bufferLength;
      let x = 0;
      
      for(let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * canvas.height / 2;
        if(i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }
      
      ctx.lineTo(canvas.width, canvas.height/2);
      ctx.stroke();
    }
    draw();
  }

  // Init stats
  analyzeCode();
</script>
</body>
</html>`;

function injectStandaloneApp() {
  if (!window.editor) {
    if(window.showToast) window.showToast(t('noEditor'));
    return;
  }
  window.editor.setValue(STANDALONE_TEMPLATE);
  if(window.runPreview) window.runPreview();
  if(window.showToast) window.showToast(t('injected'));
}

function renderSonarTab() {
  const parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  
  const wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0f172a;';

  const hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(16,185,129,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#10b981;">' + t('title') + '</div>' +
                  '<div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  const body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:12px;min-height:0;scrollbar-width:thin;';

  // Canvas visualizer block
  const canvasContainer = document.createElement('div');
  canvasContainer.style = 'background:#020617;border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:5px;position:relative;';
  const canvas = document.createElement('canvas');
  canvas.id = 'sonar-scope';
  canvas.width = 240;
  canvas.height = 90;
  canvas.style = 'width:100%;height:90px;background:#020617;border-radius:6px;display:block;';
  canvasContainer.appendChild(canvas);
  
  // Sequencer beat feedback line
  const seqFeedback = document.createElement('div');
  seqFeedback.style = 'display:flex;gap:4px;justify-content:center;margin-top:6px;';
  for(let i=0; i<8; i++) {
     const cell = document.createElement('div');
     cell.className = 'seq-cell';
     cell.style = 'width:8px;height:8px;background:rgba(255,255,255,0.05);border-radius:50%;transition:all 0.1s;';
     seqFeedback.appendChild(cell);
  }
  canvasContainer.appendChild(seqFeedback);
  body.appendChild(canvasContainer);

  // Play / Stop & Scan Action controls
  const mainBtnRow = document.createElement('div');
  mainBtnRow.style = 'display:grid;grid-template-columns:1.5fr 1fr;gap:6px;';
  
  const playBtn = document.createElement('button');
  playBtn.id = 'btn-sonar-toggle';
  playBtn.textContent = isPlaying ? t('btnStop') : t('btnPlay');
  playBtn.style = 'background:' + (isPlaying ? 'linear-gradient(135deg, #ef4444, #b91c1c)' : 'linear-gradient(135deg, #10b981, #047857)') +
                   ';color:#fff;border:none;border-radius:8px;padding:12px;font-weight:900;font-size:11px;cursor:pointer;';
  playBtn.onclick = function() {
    if (isPlaying) stopAudio();
    else startSequencer();
  };
  
  const scanBtn = document.createElement('button');
  scanBtn.textContent = t('btnScan');
  scanBtn.style = 'background:rgba(255,255,255,0.05);color:#94a3b8;border:1px solid rgba(255,255,255,0.15);border-radius:8px;padding:12px;font-weight:700;font-size:10px;cursor:pointer;';
  scanBtn.onclick = playDiagnosticChime;

  mainBtnRow.appendChild(playBtn);
  mainBtnRow.appendChild(scanBtn);
  body.appendChild(mainBtnRow);

  // Sound Config Controls
  const ctrlCard = document.createElement('div');
  ctrlCard.style = 'background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:8px;';
  
  // Waveform
  const waveLabel = document.createElement('label');
  waveLabel.style = 'font-size:9px;font-weight:800;color:#64748b;text-transform:uppercase;';
  waveLabel.textContent = t('lblWave');
  const waveSelect = document.createElement('select');
  waveSelect.style = 'background:#1e293b;color:#e2e8f0;border:1px solid rgba(255,255,255,0.08);padding:6px 8px;border-radius:6px;font-size:11px;outline:none;';
  const waveOpts = t('waveTypes');
  Object.keys(waveOpts).forEach(k => {
     const opt = document.createElement('option');
     opt.value = k; opt.textContent = waveOpts[k];
     if (k === waveTypeVal) opt.selected = true;
     waveSelect.appendChild(opt);
  });
  waveSelect.onchange = function() { waveTypeVal = this.value; };
  ctrlCard.appendChild(waveLabel);
  ctrlCard.appendChild(waveSelect);

  // BPM
  const bpmLabel = document.createElement('div');
  bpmLabel.style = 'display:flex;justify-content:space-between;font-size:9px;font-weight:800;color:#64748b;text-transform:uppercase;';
  bpmLabel.innerHTML = '<span>' + t('lblBpm') + '</span><span id="lbl-sonar-bpm-val" style="color:#10b981;">' + bpmVal + '</span>';
  const bpmRange = document.createElement('input');
  bpmRange.type = 'range';
  bpmRange.min = '60'; bpmRange.max = '180'; bpmRange.value = bpmVal;
  bpmRange.style = 'width:100%;cursor:pointer;';
  bpmRange.oninput = function() {
    bpmVal = parseInt(this.value);
    document.getElementById('lbl-sonar-bpm-val').textContent = bpmVal;
    if (isPlaying) {
      stopAudio();
      startSequencer();
    }
  };
  ctrlCard.appendChild(bpmLabel);
  ctrlCard.appendChild(bpmRange);

  // Volume
  const volLabel = document.createElement('div');
  volLabel.style = 'display:flex;justify-content:space-between;font-size:9px;font-weight:800;color:#64748b;text-transform:uppercase;';
  volLabel.innerHTML = '<span>' + t('lblVol') + '</span><span id="lbl-sonar-vol-val" style="color:#10b981;">' + Math.round(volumeVal*100) + '%</span>';
  const volRange = document.createElement('input');
  volRange.type = 'range';
  volRange.min = '0'; volRange.max = '100'; volRange.value = volumeVal * 100;
  volRange.style = 'width:100%;cursor:pointer;';
  volRange.oninput = function() {
    volumeVal = parseInt(this.value) / 100.0;
    document.getElementById('lbl-sonar-vol-val').textContent = Math.round(volumeVal*100) + '%';
    if (mainGainNode) {
       mainGainNode.gain.setValueAtTime(isMuted ? 0 : volumeVal, audioCtx.currentTime);
    }
  };
  ctrlCard.appendChild(volLabel);
  ctrlCard.appendChild(volRange);
  
  body.appendChild(ctrlCard);

  // Metrics Display
  const metricsCard = document.createElement('div');
  metricsCard.style = 'background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:10px;';
  
  const mTitle = document.createElement('div');
  mTitle.style = 'font-size:9px;font-weight:900;color:#94a3b8;text-transform:uppercase;margin-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:4px;';
  mTitle.textContent = t('lblMetrics');
  metricsCard.appendChild(mTitle);

  const stats = [
    { id: 'lines', label: t('lblLines'), val: '0' },
    { id: 'nesting', label: t('lblNesting'), val: '0' },
    { id: 'comments', label: t('lblComments'), val: '0%' },
    { id: 'syntax', label: t('lblSyntax'), val: 'Silence', style: 'color:#64748b;font-weight:800;' },
    { id: 'key', label: t('lblKey'), val: t('keyEmpty'), style: 'color:#34d399;' }
  ];

  stats.forEach(s => {
    const row = document.createElement('div');
    row.style = 'display:flex;justify-content:space-between;padding:4px 0;font-size:10.5px;border-bottom:1px solid rgba(255,255,255,0.03);';
    const lbl = document.createElement('span');
    lbl.style = 'color:#64748b;';
    lbl.textContent = s.label;
    
    const val = document.createElement('span');
    val.id = 'stat-sonar-' + s.id;
    val.textContent = s.val;
    if(s.style) val.style = s.style;
    
    row.appendChild(lbl);
    row.appendChild(val);
    metricsCard.appendChild(row);
  });
  body.appendChild(metricsCard);

  // Load Standalone
  const loadBtn = document.createElement('button');
  loadBtn.textContent = t('btnLoadApp');
  loadBtn.style = 'background:linear-gradient(135deg, #10b981, #6366f1);color:#fff;border:none;border-radius:8px;padding:12px;font-weight:800;font-size:11px;cursor:pointer;margin-top:5px;box-shadow:0 4px 15px rgba(16,185,129,0.2);';
  loadBtn.onclick = injectStandaloneApp;
  body.appendChild(loadBtn);

  wrap.appendChild(body);
  parent.appendChild(wrap);
  
  // Set initial numbers
  const initialStats = analyzeWorkspaceCode();
  updateStatsDisplay(initialStats);
  
  if (isPlaying) {
     drawOscilloscope();
  }
}

// Hook tab triggers
document.addEventListener('DOMContentLoaded', function() {
  const oAL = window.applyLang;
  window.applyLang = function() {
    if (typeof oAL === 'function') oAL();
    const el = document.getElementById('lbl-tab-codesonar');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'codesonar') renderSonarTab();
  };

  const oRT = window.renderTab;
  window.renderTab = function(tab) {
    if (tab === 'codesonar') {
      window.activeTab = 'codesonar';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('tab-codesonar');
      if (btn) btn.classList.add('active');
      renderSonarTab();
      return;
    }
    // Make sure we stop audio if navigating away from Codesonar tab
    if (window.activeTab === 'codesonar' && tab !== 'codesonar') {
      stopAudio();
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
