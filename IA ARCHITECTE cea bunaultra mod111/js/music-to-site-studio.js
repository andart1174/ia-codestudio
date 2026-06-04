
/* ============================================================
   🎵 MUSIC → WEBSITE GENERATOR  |  Tab ID: musictosite
   IA Architecte Studio — Module v1.0
   Analyzes audio via Web Audio API → generates themed websites
   ============================================================ */
(function () {
  'use strict';

  // ── i18n ────────────────────────────────────────────────────
  const T = {
    en: {
      tabTitle: '🎵 Music → Website Generator',
      uploadLabel: 'Drop an audio file here or click to browse',
      uploadHint: 'Supports MP3 · WAV · OGG',
      analyzeBtn: 'Analyze Audio',
      analyzing: 'Analyzing…',
      resultsTitle: 'Audio Analysis',
      bpm: 'Estimated BPM',
      energy: 'Energy Level',
      dominant: 'Dominant Band',
      mood: 'Detected Mood',
      bass: 'BASS',
      mid: 'MID',
      treble: 'TREBLE',
      energetic: 'ENERGETIC',
      melancholic: 'MELANCHOLIC',
      epic: 'EPIC',
      chill: 'CHILL',
      aggressive: 'AGGRESSIVE',
      generating: 'Generating website…',
      previewTitle: 'Generated Website Preview',
      loadEditor: '📂 Load to Editor',
      loadStandalone: '🚀 Load Full Standalone App',
      noFile: 'Please upload an audio file first.',
      doneToast: '✅ Music→Site studio initialized.',
      generatedToast: '🎨 Website generated from audio mood!',
      oscilloscope: 'Oscilloscope',
      spectrum: 'Spectrum',
      moodDesc: {
        ENERGETIC:   'High BPM + strong bass → dynamic, electric design.',
        MELANCHOLIC: 'Slow tempo + rich mids → emotional, moody design.',
        EPIC:        'High energy across full spectrum → grand, cinematic design.',
        CHILL:       'Low BPM + low energy → serene, minimal design.',
        AGGRESSIVE:  'Very high BPM + distorted peaks → raw, intense design.',
      },
    },
    fr: {
      tabTitle: '🎵 Musique → Générateur de site',
      uploadLabel: 'Déposez un fichier audio ici ou cliquez pour parcourir',
      uploadHint: 'Formats acceptés : MP3 · WAV · OGG',
      analyzeBtn: 'Analyser l\'audio',
      analyzing: 'Analyse en cours…',
      resultsTitle: 'Analyse audio',
      bpm: 'BPM estimé',
      energy: 'Niveau d\'énergie',
      dominant: 'Bande dominante',
      mood: 'Ambiance détectée',
      bass: 'BASSES',
      mid: 'MÉDIUMS',
      treble: 'AIGUS',
      energetic: 'ÉNERGIQUE',
      melancholic: 'MÉLANCOLIQUE',
      epic: 'ÉPIQUE',
      chill: 'CALME',
      aggressive: 'AGRESSIF',
      generating: 'Génération du site…',
      previewTitle: 'Aperçu du site généré',
      loadEditor: '📂 Charger dans l\'éditeur',
      loadStandalone: '🚀 Charger l\'app standalone',
      noFile: 'Veuillez d\'abord importer un fichier audio.',
      doneToast: '✅ Studio Musique→Site initialisé.',
      generatedToast: '🎨 Site généré depuis l\'ambiance musicale !',
      oscilloscope: 'Oscilloscope',
      spectrum: 'Spectre',
      moodDesc: {
        ENERGETIC:   'BPM élevé + basses fortes → design dynamique et électrique.',
        MELANCHOLIC: 'Tempo lent + médiums riches → design émotionnel et sombre.',
        EPIC:        'Haute énergie sur tout le spectre → design cinématographique.',
        CHILL:       'BPM faible + faible énergie → design serein et minimaliste.',
        AGGRESSIVE:  'BPM très élevé + pics distordus → design brut et intense.',
      },
    },
  };

  function lang() { return (window.appLang || 'en') === 'fr' ? T.fr : T.en; }

  // ── Mood → theme palettes ────────────────────────────────────
  const MOOD_THEMES = {
    ENERGETIC: {
      bg: '#0a0014',
      accent1: '#ff2d78',
      accent2: '#ff6a00',
      accent3: '#ffe600',
      text: '#ffffff',
      font: "'Orbitron', 'Exo 2', sans-serif",
      animSpeed: '0.4s',
      bgStyle: 'linear-gradient(135deg,#0a0014 0%,#1a0030 50%,#0d0010 100%)',
      glowColor: 'rgba(255,45,120,0.6)',
      particleColor: '#ff2d78',
      className: 'energetic',
    },
    MELANCHOLIC: {
      bg: '#04080f',
      accent1: '#4fc3f7',
      accent2: '#7b68ee',
      accent3: '#90caf9',
      text: '#cfd8dc',
      font: "'Playfair Display', Georgia, serif",
      animSpeed: '1.8s',
      bgStyle: 'linear-gradient(160deg,#04080f 0%,#0d1b2a 60%,#040810 100%)',
      glowColor: 'rgba(79,195,247,0.4)',
      particleColor: '#4fc3f7',
      className: 'melancholic',
    },
    EPIC: {
      bg: '#080010',
      accent1: '#d4af37',
      accent2: '#c0392b',
      accent3: '#f39c12',
      text: '#f5f5f5',
      font: "'Cinzel', 'Trajan Pro', serif",
      animSpeed: '0.8s',
      bgStyle: 'linear-gradient(140deg,#080010 0%,#1a0800 40%,#001020 100%)',
      glowColor: 'rgba(212,175,55,0.55)',
      particleColor: '#d4af37',
      className: 'epic',
    },
    CHILL: {
      bg: '#020d12',
      accent1: '#00e5cc',
      accent2: '#26c6da',
      accent3: '#b2ebf2',
      text: '#e0f7fa',
      font: "'Nunito', 'Quicksand', sans-serif",
      animSpeed: '2.5s',
      bgStyle: 'linear-gradient(160deg,#020d12 0%,#011520 55%,#02100d 100%)',
      glowColor: 'rgba(0,229,204,0.35)',
      particleColor: '#00e5cc',
      className: 'chill',
    },
    AGGRESSIVE: {
      bg: '#0c0000',
      accent1: '#ff1a1a',
      accent2: '#ff6600',
      accent3: '#ffffff',
      text: '#ffeeee',
      font: "'Black Ops One', 'Impact', sans-serif",
      animSpeed: '0.2s',
      bgStyle: 'linear-gradient(150deg,#0c0000 0%,#1a0000 50%,#0a0400 100%)',
      glowColor: 'rgba(255,26,26,0.7)',
      particleColor: '#ff1a1a',
      className: 'aggressive',
    },
  };

  // ── State ────────────────────────────────────────────────────
  let state = {
    file: null,
    audioBuffer: null,
    analysisResult: null,
    generatedHTML: null,
    animFrame: null,
    vizMode: 'spectrum', // 'spectrum' | 'oscilloscope'
  };

  // ── Classify mood ────────────────────────────────────────────
  function classifyMood(bpm, energy, dominantBand) {
    // energy: 0–100
    if (bpm > 150 && energy > 65) return 'AGGRESSIVE';
    if (bpm > 120 && dominantBand === 'BASS' && energy > 50) return 'ENERGETIC';
    if (energy > 70 && dominantBand !== 'BASS') return 'EPIC';
    if (bpm < 85 && dominantBand === 'MID') return 'MELANCHOLIC';
    if (bpm < 100 && energy < 45) return 'CHILL';
    if (bpm >= 100 && energy >= 45) return 'ENERGETIC';
    return 'CHILL';
  }

  // ── Web Audio Analysis ───────────────────────────────────────
  async function analyzeAudio(arrayBuffer, onProgress) {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    onProgress && onProgress(10);

    let audioBuffer;
    try {
      audioBuffer = await ctx.decodeAudioData(arrayBuffer.slice(0));
    } catch (e) {
      ctx.close();
      throw new Error('Failed to decode audio: ' + e.message);
    }
    onProgress && onProgress(30);

    const channelData = audioBuffer.getChannelData(0);
    const sampleRate  = audioBuffer.sampleRate;
    const duration    = audioBuffer.duration;

    // ── RMS energy (sampled at windows) ─────────────────────
    const windowSize = Math.floor(sampleRate * 0.05); // 50 ms
    let sumSq = 0;
    for (let i = 0; i < channelData.length; i++) sumSq += channelData[i] * channelData[i];
    const rms = Math.sqrt(sumSq / channelData.length);
    const energyPct = Math.min(100, Math.round(rms * 400));

    onProgress && onProgress(50);

    // ── FFT via OfflineAudioContext for frequency analysis ──
    const offlineCtx = new OfflineAudioContext(1, channelData.length, sampleRate);
    const offlineSource = offlineCtx.createBufferSource();
    offlineSource.buffer = audioBuffer;
    const offlineAnalyser = offlineCtx.createAnalyser();
    offlineAnalyser.fftSize = 2048;
    offlineSource.connect(offlineAnalyser);
    offlineAnalyser.connect(offlineCtx.destination);
    offlineSource.start();

    // We'll use the real-time AudioContext for frequency data instead
    // (OfflineAudioContext doesn't expose getFloatFrequencyData during rendering)
    // So: use a quick real-time analysis pass of ~2 seconds of audio
    const analyserCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = analyserCtx.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.8;
    const freqData = new Uint8Array(analyser.frequencyBinCount);

    const tempSource = analyserCtx.createBufferSource();
    tempSource.buffer = audioBuffer;
    tempSource.connect(analyser);
    analyser.connect(analyserCtx.destination);
    tempSource.start(0, Math.min(10, duration * 0.3)); // start from 30% mark for chorus

    // Wait 300ms then sample
    await new Promise(r => setTimeout(r, 350));
    analyser.getByteFrequencyData(freqData);
    tempSource.stop();
    analyserCtx.close();

    onProgress && onProgress(70);

    // Bin ranges (for 44100 Hz, 1024 bins)
    const nyquist = sampleRate / 2;
    const binHz   = nyquist / analyser.frequencyBinCount;
    const bassEnd    = Math.floor(250  / binHz);
    const midEnd     = Math.floor(4000 / binHz);

    let bassSum = 0, midSum = 0, trebleSum = 0;
    for (let i = 0; i < freqData.length; i++) {
      if (i <= bassEnd)        bassSum   += freqData[i];
      else if (i <= midEnd)    midSum    += freqData[i];
      else                     trebleSum += freqData[i];
    }
    const bassAvg   = bassSum   / (bassEnd + 1);
    const midAvg    = midSum    / (midEnd - bassEnd);
    const trebleAvg = trebleSum / (freqData.length - midEnd);

    let dominantBand = 'MID';
    if (bassAvg >= midAvg && bassAvg >= trebleAvg)     dominantBand = 'BASS';
    else if (trebleAvg >= midAvg && trebleAvg > bassAvg) dominantBand = 'TREBLE';

    onProgress && onProgress(80);

    // ── BPM detection via onset/peak analysis ───────────────
    const bpm = estimateBPM(channelData, sampleRate);

    onProgress && onProgress(95);

    ctx.close();

    return { bpm, energyPct, dominantBand, bassAvg, midAvg, trebleAvg, duration: Math.round(duration) };
  }

  function estimateBPM(channelData, sampleRate) {
    // Energy-based onset detection over ~60s
    const HOP      = Math.floor(sampleRate * 0.01); // 10ms hop
    const WIN      = Math.floor(sampleRate * 0.05); // 50ms window
    const maxSamps = Math.min(channelData.length, sampleRate * 60);
    const energies = [];

    for (let i = 0; i < maxSamps - WIN; i += HOP) {
      let e = 0;
      for (let j = i; j < i + WIN; j++) e += channelData[j] * channelData[j];
      energies.push(e / WIN);
    }

    // Smooth
    const smoothed = energies.map((v, i) => {
      let s = 0, cnt = 0;
      for (let k = Math.max(0, i - 4); k <= Math.min(energies.length - 1, i + 4); k++) { s += energies[k]; cnt++; }
      return s / cnt;
    });

    // Find peaks (local maxima above mean)
    const mean = smoothed.reduce((a, b) => a + b, 0) / smoothed.length;
    const threshold = mean * 1.5;
    const peaks = [];
    for (let i = 1; i < smoothed.length - 1; i++) {
      if (smoothed[i] > smoothed[i - 1] && smoothed[i] > smoothed[i + 1] && smoothed[i] > threshold) {
        peaks.push(i);
      }
    }

    if (peaks.length < 4) return 120; // default

    // Compute inter-peak intervals → BPM
    const intervals = [];
    for (let i = 1; i < Math.min(peaks.length, 200); i++) {
      const diffSecs = (peaks[i] - peaks[i - 1]) * HOP / sampleRate;
      if (diffSecs > 0.2 && diffSecs < 2.5) intervals.push(diffSecs);
    }

    if (intervals.length === 0) return 120;
    intervals.sort((a, b) => a - b);
    const med = intervals[Math.floor(intervals.length / 2)];
    let bpm = Math.round(60 / med);

    // Octave correction
    if (bpm < 60)  bpm *= 2;
    if (bpm > 200) bpm = Math.round(bpm / 2);
    return Math.max(40, Math.min(220, bpm));
  }

  // ── Website Generator ────────────────────────────────────────
  function generateWebsite(analysis, mood, t) {
    const theme = MOOD_THEMES[mood];
    const moodLabel = t[mood.toLowerCase()] || mood;
    const moodDesc  = t.moodDesc[mood] || '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${moodLabel} — Music-Generated Site</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cinzel:wght@400;700&family=Nunito:wght@300;400;600&family=Black+Ops+One&family=Exo+2:wght@300;700&display=swap" rel="stylesheet"/>
<style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  :root{
    --bg:${theme.bg};
    --a1:${theme.accent1};
    --a2:${theme.accent2};
    --a3:${theme.accent3};
    --txt:${theme.text};
    --glow:${theme.glowColor};
    --spd:${theme.animSpeed};
  }
  html,body{min-height:100vh;background:var(--bg);color:var(--txt);font-family:${theme.font};overflow-x:hidden;}
  body{background:${theme.bgStyle};}

  /* Particles canvas */
  #particles{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;}

  /* Nav */
  nav{position:relative;z-index:10;display:flex;justify-content:space-between;align-items:center;
      padding:1.2rem 2.5rem;border-bottom:1px solid color-mix(in srgb,var(--a1) 25%,transparent);
      backdrop-filter:blur(8px);background:color-mix(in srgb,var(--bg) 70%,transparent);}
  nav .logo{font-size:1.35rem;font-weight:700;color:var(--a1);
             text-shadow:0 0 14px var(--glow),0 0 28px var(--glow);letter-spacing:0.08em;}
  nav ul{list-style:none;display:flex;gap:2rem;}
  nav ul a{color:var(--txt);text-decoration:none;font-size:0.9rem;letter-spacing:0.05em;
            transition:color var(--spd),text-shadow var(--spd);}
  nav ul a:hover{color:var(--a1);text-shadow:0 0 10px var(--glow);}

  /* Hero */
  .hero{position:relative;z-index:5;min-height:90vh;display:flex;flex-direction:column;
        justify-content:center;align-items:center;text-align:center;padding:4rem 2rem;}
  .hero-badge{display:inline-block;padding:0.35rem 1.1rem;border:1px solid var(--a1);
               border-radius:2rem;font-size:0.78rem;letter-spacing:0.18em;text-transform:uppercase;
               color:var(--a1);margin-bottom:1.8rem;animation:pulseGlow var(--spd) ease-in-out infinite alternate;}
  .hero h1{font-size:clamp(2.4rem,6vw,5rem);font-weight:900;line-height:1.1;
            background:linear-gradient(135deg,var(--a1),var(--a2),var(--a3));
            -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
            animation:shimmer 3s linear infinite;background-size:200% auto;}
  .hero p{margin-top:1.5rem;max-width:600px;line-height:1.75;font-size:1.05rem;
           color:color-mix(in srgb,var(--txt) 75%,transparent);}
  .hero-cta{margin-top:2.5rem;display:flex;gap:1.2rem;flex-wrap:wrap;justify-content:center;}
  .btn{padding:0.85rem 2.2rem;border-radius:0.5rem;font-size:0.95rem;font-weight:700;
       cursor:pointer;letter-spacing:0.05em;transition:all calc(var(--spd) * 0.5);}
  .btn-primary{background:var(--a1);color:#000;border:none;
                box-shadow:0 0 18px var(--glow),0 0 36px var(--glow);}
  .btn-primary:hover{transform:translateY(-3px) scale(1.04);box-shadow:0 0 30px var(--glow),0 0 60px var(--glow);}
  .btn-outline{background:transparent;color:var(--a1);border:2px solid var(--a1);}
  .btn-outline:hover{background:color-mix(in srgb,var(--a1) 15%,transparent);transform:translateY(-3px);}

  /* Stats */
  .stats{position:relative;z-index:5;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
          gap:1.5rem;padding:3rem 2.5rem;max-width:1100px;margin:0 auto;}
  .stat-card{background:color-mix(in srgb,var(--a1) 5%,#ffffff08);border:1px solid color-mix(in srgb,var(--a1) 20%,transparent);
              border-radius:1rem;padding:2rem;text-align:center;backdrop-filter:blur(6px);
              transition:transform var(--spd),box-shadow var(--spd);}
  .stat-card:hover{transform:translateY(-6px);box-shadow:0 0 20px var(--glow);}
  .stat-val{font-size:2.8rem;font-weight:900;color:var(--a1);
             text-shadow:0 0 12px var(--glow);}
  .stat-lbl{font-size:0.82rem;letter-spacing:0.1em;text-transform:uppercase;
             margin-top:0.4rem;color:color-mix(in srgb,var(--txt) 60%,transparent);}

  /* Visualizer section */
  .viz-section{position:relative;z-index:5;max-width:900px;margin:0 auto 4rem;padding:0 2rem;}
  .viz-section h2{text-align:center;font-size:1.8rem;color:var(--a1);margin-bottom:1.5rem;
                   text-shadow:0 0 14px var(--glow);}
  #vizCanvas{width:100%;height:180px;border-radius:1rem;
              border:1px solid color-mix(in srgb,var(--a1) 30%,transparent);
              background:#000;display:block;}

  /* Upload section */
  .upload-section{position:relative;z-index:5;max-width:600px;margin:0 auto 5rem;padding:0 2rem;text-align:center;}
  .upload-section h2{font-size:1.6rem;color:var(--a2);margin-bottom:1rem;text-shadow:0 0 10px var(--glow);}
  .drop-zone{border:2px dashed color-mix(in srgb,var(--a1) 50%,transparent);border-radius:1rem;
              padding:2.5rem;cursor:pointer;transition:all 0.3s;
              background:color-mix(in srgb,var(--a1) 4%,#ffffff05);}
  .drop-zone:hover,.drop-zone.drag-over{border-color:var(--a1);background:color-mix(in srgb,var(--a1) 10%,#ffffff08);
                                         box-shadow:0 0 20px var(--glow);}
  .drop-zone input{display:none;}
  .drop-zone p{margin-top:0.5rem;color:color-mix(in srgb,var(--txt) 60%,transparent);font-size:0.9rem;}
  #analyzeBtn2{margin-top:1.5rem;width:100%;}

  /* Features */
  .features{position:relative;z-index:5;max-width:1100px;margin:0 auto 5rem;padding:0 2.5rem;}
  .features h2{text-align:center;font-size:2rem;margin-bottom:2.5rem;
                background:linear-gradient(90deg,var(--a1),var(--a2));-webkit-background-clip:text;
                -webkit-text-fill-color:transparent;background-clip:text;}
  .features-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.5rem;}
  .feat-card{background:color-mix(in srgb,var(--a2) 5%,#ffffff06);border:1px solid color-mix(in srgb,var(--a2) 20%,transparent);
              border-radius:1rem;padding:1.8rem;transition:all var(--spd);}
  .feat-card:hover{transform:translateY(-5px);border-color:var(--a2);box-shadow:0 0 16px color-mix(in srgb,var(--a2) 40%,transparent);}
  .feat-icon{font-size:2.2rem;margin-bottom:1rem;}
  .feat-card h3{font-size:1.05rem;font-weight:700;color:var(--a2);margin-bottom:0.5rem;}
  .feat-card p{font-size:0.88rem;line-height:1.65;color:color-mix(in srgb,var(--txt) 70%,transparent);}

  /* Footer */
  footer{position:relative;z-index:5;text-align:center;padding:2.5rem;
          border-top:1px solid color-mix(in srgb,var(--a1) 15%,transparent);
          font-size:0.82rem;color:color-mix(in srgb,var(--txt) 40%,transparent);}
  footer span{color:var(--a1);}

  /* Animations */
  @keyframes pulseGlow{
    from{box-shadow:0 0 6px var(--glow);border-color:var(--a1);}
    to{box-shadow:0 0 22px var(--glow),0 0 40px var(--glow);border-color:var(--a3);}
  }
  @keyframes shimmer{
    0%{background-position:0% center;}
    100%{background-position:200% center;}
  }
  @keyframes floatUp{
    0%{transform:translateY(0) scale(1);opacity:0.8;}
    100%{transform:translateY(-120vh) scale(0.2);opacity:0;}
  }
</style>
</head>
<body>
<canvas id="particles"></canvas>

<nav>
  <div class="logo">♪ ${moodLabel}</div>
  <ul>
    <li><a href="#stats">Stats</a></li>
    <li><a href="#visualizer">Visualizer</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#upload">Upload</a></li>
  </ul>
</nav>

<section class="hero">
  <div class="hero-badge">🎵 Music-Generated Design · ${moodLabel}</div>
  <h1>Feel the ${moodLabel} Vibe</h1>
  <p>${moodDesc} Your audio shaped every color, font, and animation in this page.</p>
  <div class="hero-cta">
    <button class="btn btn-primary" onclick="document.getElementById('upload').scrollIntoView({behavior:'smooth'})">Upload Your Track</button>
    <button class="btn btn-outline" onclick="document.getElementById('visualizer').scrollIntoView({behavior:'smooth'})">See Visualizer</button>
  </div>
</section>

<section class="stats" id="stats">
  <div class="stat-card">
    <div class="stat-val">${analysis.bpm}</div>
    <div class="stat-lbl">BPM</div>
  </div>
  <div class="stat-card">
    <div class="stat-val">${analysis.energyPct}%</div>
    <div class="stat-lbl">Energy</div>
  </div>
  <div class="stat-card">
    <div class="stat-val">${analysis.dominantBand}</div>
    <div class="stat-lbl">Dominant Band</div>
  </div>
  <div class="stat-card">
    <div class="stat-val">${analysis.duration}s</div>
    <div class="stat-lbl">Duration</div>
  </div>
</section>

<section class="viz-section" id="visualizer">
  <h2>🎚 Live Audio Visualizer</h2>
  <canvas id="vizCanvas" width="860" height="180"></canvas>
  <p style="text-align:center;margin-top:0.8rem;font-size:0.82rem;color:color-mix(in srgb,var(--txt) 50%,transparent);">
    Upload a track below and press Analyze to see live frequency spectrum.
  </p>
</section>

<section class="features" id="features">
  <h2>What This Design Reflects</h2>
  <div class="features-grid">
    <div class="feat-card">
      <div class="feat-icon">🎨</div>
      <h3>Mood-Driven Palette</h3>
      <p>Every color was chosen algorithmically based on your audio's energy, BPM, and frequency profile.</p>
    </div>
    <div class="feat-card">
      <div class="feat-icon">✍️</div>
      <h3>Tempo Typography</h3>
      <p>Font choice reflects the emotional weight of your music — from energetic sans-serif to melancholic serif.</p>
    </div>
    <div class="feat-card">
      <div class="feat-icon">⚡</div>
      <h3>Animation Speed</h3>
      <p>All transitions are calibrated to your track's BPM, so fast music gets snappy UI and slow music gets fluid transitions.</p>
    </div>
    <div class="feat-card">
      <div class="feat-icon">🌌</div>
      <h3>Reactive Particles</h3>
      <p>The particle field density and speed mirror your audio's bass frequency strength and overall energy level.</p>
    </div>
  </div>
</section>

<section class="upload-section" id="upload">
  <h2>Analyze Your Own Track</h2>
  <div class="drop-zone" id="dropZone2" onclick="document.getElementById('audioFile2').click()">
    <div style="font-size:2.5rem;">🎵</div>
    <p>Drop an MP3 / WAV / OGG here or click to browse</p>
    <input type="file" id="audioFile2" accept=".mp3,.wav,.ogg,audio/*"/>
  </div>
  <p id="fileName2" style="margin-top:0.8rem;font-size:0.85rem;color:var(--a1);"></p>
  <button class="btn btn-primary" id="analyzeBtn2" style="margin-top:1.2rem;width:100%;">Analyze Audio</button>
  <div id="analyzeResult2" style="margin-top:1.5rem;font-size:0.9rem;color:var(--txt);"></div>
</section>

<footer>
  Generated by <span>Music → Website Generator</span> · IA Architecte Studio · Mood: <span>${moodLabel}</span>
</footer>

<' + 'script>
  // Particles
  (function(){
    const canvas=document.getElementById('particles');
    const ctx=canvas.getContext('2d');
    const color='${theme.particleColor}';
    const speedMult=${mood === 'AGGRESSIVE' ? 3.5 : mood === 'ENERGETIC' ? 2.5 : mood === 'EPIC' ? 1.8 : mood === 'MELANCHOLIC' ? 0.6 : 0.9};
    let particles=[];
    function resize(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;}
    resize();window.addEventListener('resize',resize);
    for(let i=0;i<${mood === 'CHILL' ? 30 : mood === 'MELANCHOLIC' ? 40 : mood === 'EPIC' ? 70 : 80};i++){
      particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,
        r:Math.random()*2.5+0.5,vx:(Math.random()-0.5)*speedMult,vy:-(Math.random()*speedMult+0.2),
        alpha:Math.random()*0.6+0.2});
    }
    function draw(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      particles.forEach(p=>{
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=color+Math.round(p.alpha*255).toString(16).padStart(2,'0');
        ctx.fill();
        p.x+=p.vx;p.y+=p.vy;
        if(p.y<-5){p.y=canvas.height+5;p.x=Math.random()*canvas.width;}
        if(p.x<-5||p.x>canvas.width+5){p.vx*=-1;}
      });
      requestAnimationFrame(draw);
    }
    draw();
  })();

  // Visualizer in standalone
  (function(){
    const file2=document.getElementById('audioFile2');
    const dz2=document.getElementById('dropZone2');
    const fn2=document.getElementById('fileName2');
    const btn2=document.getElementById('analyzeBtn2');
    const res2=document.getElementById('analyzeResult2');
    const vizCanvas=document.getElementById('vizCanvas');
    const vizCtx=vizCanvas.getContext('2d');
    let audioCtx2,analyser2,source2,rafId;
    let currentFile=null;

    file2.addEventListener('change',e=>{if(e.target.files[0]){currentFile=e.target.files[0];fn2.textContent='📁 '+currentFile.name;}});
    dz2.addEventListener('dragover',e=>{e.preventDefault();dz2.classList.add('drag-over');});
    dz2.addEventListener('dragleave',()=>dz2.classList.remove('drag-over'));
    dz2.addEventListener('drop',e=>{e.preventDefault();dz2.classList.remove('drag-over');
      if(e.dataTransfer.files[0]){currentFile=e.dataTransfer.files[0];fn2.textContent='📁 '+currentFile.name;}});

    btn2.addEventListener('click',async ()=>{
      if(!currentFile){res2.textContent='Please upload a file first.';return;}
      btn2.textContent='Analyzing…';btn2.disabled=true;
      if(source2){try{source2.stop();}catch(e){}};
      if(audioCtx2)audioCtx2.close();
      if(rafId)cancelAnimationFrame(rafId);
      audioCtx2=new(window.AudioContext||window.webkitAudioContext)();
      analyser2=audioCtx2.createAnalyser();
      analyser2.fftSize=2048;analyser2.smoothingTimeConstant=0.8;
      const ab=await currentFile.arrayBuffer();
      const buf=await audioCtx2.decodeAudioData(ab);
      source2=audioCtx2.createBufferSource();
      source2.buffer=buf;source2.connect(analyser2);analyser2.connect(audioCtx2.destination);
      source2.start();
      source2.onended=()=>{btn2.textContent='Analyze Audio';btn2.disabled=false;};
      const freqArr=new Uint8Array(analyser2.frequencyBinCount);
      const col='${theme.accent1}';
      function drawViz(){
        rafId=requestAnimationFrame(drawViz);
        analyser2.getByteFrequencyData(freqArr);
        vizCtx.fillStyle='rgba(0,0,0,0.25)';vizCtx.fillRect(0,0,vizCanvas.width,vizCanvas.height);
        const bw=vizCanvas.width/freqArr.length*2.5;
        for(let i=0;i<freqArr.length;i++){
          const h=(freqArr[i]/255)*vizCanvas.height;
          const hue=i/freqArr.length*60;
          vizCtx.fillStyle=col;vizCtx.globalAlpha=0.7+freqArr[i]/1500;
          vizCtx.fillRect(i*bw,vizCanvas.height-h,bw-1,h);
        }
        vizCtx.globalAlpha=1;
      }
      drawViz();
      res2.innerHTML='<span style="color:${theme.accent1}">▶ Playing & visualizing your audio!</span>';
      btn2.textContent='Analyze Audio';btn2.disabled=false;
    });
  })();
</' + 'script>
</body>
</html>`;
  }

  // ── Canvas Visualizer (in-module) ────────────────────────────
  let vizAudioCtx = null, vizAnalyser = null, vizSource = null, vizRaf = null;

  function startVisualizer(canvas, audioBuffer) {
    if (vizRaf) cancelAnimationFrame(vizRaf);
    if (vizAudioCtx) { try { vizAudioCtx.close(); } catch(e) {} }

    vizAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    vizAnalyser  = vizAudioCtx.createAnalyser();
    vizAnalyser.fftSize = 2048;
    vizAnalyser.smoothingTimeConstant = 0.8;

    vizSource = vizAudioCtx.createBufferSource();
    vizSource.buffer = audioBuffer;
    vizSource.connect(vizAnalyser);
    vizAnalyser.connect(vizAudioCtx.destination);
    vizSource.loop = true;
    vizSource.start();

    drawViz(canvas, state.vizMode);
  }

  function stopVisualizer() {
    if (vizRaf) cancelAnimationFrame(vizRaf);
    if (vizSource) { try { vizSource.stop(); } catch(e) {} }
    if (vizAudioCtx) { try { vizAudioCtx.close(); } catch(e) {} }
    vizAudioCtx = vizAnalyser = vizSource = vizRaf = null;
  }

  function drawViz(canvas, mode) {
    if (!vizAnalyser) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;

    function frame() {
      vizRaf = requestAnimationFrame(frame);
      ctx.fillStyle = 'rgba(2,6,23,0.3)';
      ctx.fillRect(0, 0, W, H);

      if (mode === 'spectrum') {
        const data = new Uint8Array(vizAnalyser.frequencyBinCount);
        vizAnalyser.getByteFrequencyData(data);
        const bw = W / (data.length / 2);
        for (let i = 0; i < data.length / 2; i++) {
          const v = data[i] / 255;
          const h = v * H;
          const hue = (i / (data.length / 2)) * 240 + 160;
          ctx.fillStyle = `hsl(${hue},100%,${40 + v * 40}%)`;
          ctx.fillRect(i * bw, H - h, bw - 1, h);
          // glow top
          ctx.fillStyle = `hsla(${hue},100%,80%,0.6)`;
          ctx.fillRect(i * bw, H - h - 3, bw - 1, 3);
        }
      } else {
        // oscilloscope
        const data = new Uint8Array(vizAnalyser.fftSize);
        vizAnalyser.getByteTimeDomainData(data);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#00e5ff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00e5ff';
        ctx.beginPath();
        const sliceW = W / data.length;
        let x = 0;
        for (let i = 0; i < data.length; i++) {
          const v = data[i] / 128 - 1;
          const y = H / 2 + v * (H / 2.5);
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          x += sliceW;
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    }
    frame();
  }

  // ── Render ───────────────────────────────────────────────────
  function render() {
    const t = lang();
    const lb = document.getElementById('left-body');
    if (!lb) return;

    lb.innerHTML = '';
    lb.style.cssText = 'overflow:auto;height:100%;background:#020617;font-family:Inter,sans-serif;';

    const root = document.createElement('div');
    root.style.cssText = 'min-height:100%;padding:1.5rem;color:#e2e8f0;';
    root.innerHTML = `
<style>
  #mts-root *{box-sizing:border-box;}
  #mts-root{font-family:'Inter',sans-serif;color:#e2e8f0;}
  .mts-header{display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem;}
  .mts-header h1{font-size:1.4rem;font-weight:800;background:linear-gradient(90deg,#a855f7,#ec4899,#f97316);
                  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
  .mts-card{background:#0f172a;border:1px solid #1e293b;border-radius:0.875rem;padding:1.25rem;margin-bottom:1.25rem;}
  .mts-card h2{font-size:0.95rem;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;
                color:#94a3b8;margin-bottom:1rem;}
  .mts-drop{border:2px dashed #334155;border-radius:0.75rem;padding:2.2rem;text-align:center;
             cursor:pointer;transition:all 0.25s;background:#0a1628;}
  .mts-drop:hover,.mts-drop.drag-over{border-color:#a855f7;background:rgba(168,85,247,0.06);
                                       box-shadow:0 0 20px rgba(168,85,247,0.15);}
  .mts-drop input{display:none;}
  .mts-drop-icon{font-size:2.4rem;margin-bottom:0.5rem;}
  .mts-drop-text{font-size:0.9rem;color:#64748b;margin-bottom:0.3rem;}
  .mts-drop-hint{font-size:0.78rem;color:#475569;}
  .mts-filename{margin-top:0.6rem;font-size:0.85rem;color:#a855f7;font-weight:600;}
  .mts-btn{padding:0.7rem 1.5rem;border-radius:0.5rem;font-size:0.88rem;font-weight:700;
            cursor:pointer;border:none;transition:all 0.2s;letter-spacing:0.03em;}
  .mts-btn-primary{background:linear-gradient(135deg,#a855f7,#ec4899);color:#fff;}
  .mts-btn-primary:hover{transform:translateY(-2px);box-shadow:0 0 20px rgba(168,85,247,0.4);}
  .mts-btn-primary:disabled{opacity:0.5;cursor:not-allowed;transform:none;}
  .mts-btn-secondary{background:#1e293b;color:#94a3b8;border:1px solid #334155;}
  .mts-btn-secondary:hover{background:#263147;color:#e2e8f0;}
  .mts-btn-green{background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;}
  .mts-btn-green:hover{transform:translateY(-2px);box-shadow:0 0 16px rgba(16,185,129,0.4);}
  .mts-btn-orange{background:linear-gradient(135deg,#f97316,#ef4444);color:#fff;}
  .mts-btn-orange:hover{transform:translateY(-2px);box-shadow:0 0 16px rgba(249,115,22,0.4);}
  .mts-progress-bar{height:6px;border-radius:3px;background:#1e293b;margin-top:0.8rem;overflow:hidden;}
  .mts-progress-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,#a855f7,#ec4899);
                      transition:width 0.3s;width:0%;}
  .mts-results-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:0.9rem;}
  .mts-result-card{background:#0a1628;border:1px solid #1e293b;border-radius:0.65rem;padding:1rem;text-align:center;}
  .mts-result-val{font-size:1.9rem;font-weight:800;}
  .mts-result-lbl{font-size:0.72rem;letter-spacing:0.1em;text-transform:uppercase;color:#475569;margin-top:0.2rem;}
  .mts-mood-banner{display:flex;align-items:center;gap:1rem;padding:1rem 1.4rem;border-radius:0.75rem;
                    border-left:4px solid;margin-bottom:1rem;}
  .mts-mood-label{font-size:1.5rem;font-weight:900;letter-spacing:0.1em;}
  .mts-mood-desc{font-size:0.82rem;color:#94a3b8;margin-top:0.2rem;}
  .mts-viz-toolbar{display:flex;gap:0.6rem;margin-bottom:0.75rem;align-items:center;}
  .mts-viz-toolbar button.active{background:rgba(168,85,247,0.2);border-color:#a855f7;color:#a855f7;}
  #mts-viz-canvas{width:100%;border-radius:0.65rem;border:1px solid #1e293b;background:#000;display:block;}
  .mts-preview-frame{width:100%;height:480px;border:none;border-radius:0.65rem;margin-top:0.75rem;
                      border:1px solid #1e293b;}
  .mts-action-row{display:flex;gap:0.75rem;flex-wrap:wrap;margin-top:1rem;}
  .mts-hidden{display:none;}
  .mts-spin{display:inline-block;animation:mts-spin 0.8s linear infinite;}
  @keyframes mts-spin{to{transform:rotate(360deg);}}
</style>
<div id="mts-root">
  <div class="mts-header">
    <span style="font-size:1.6rem;">🎵</span>
    <h1>${t.tabTitle}</h1>
  </div>

  <!-- Upload -->
  <div class="mts-card">
    <h2>1 · ${t.uploadLabel.split(' or ')[0]}</h2>
    <div class="mts-drop" id="mts-drop" onclick="document.getElementById('mts-file').click()">
      <div class="mts-drop-icon">🎵</div>
      <div class="mts-drop-text">${t.uploadLabel}</div>
      <div class="mts-drop-hint">${t.uploadHint}</div>
      <input type="file" id="mts-file" accept=".mp3,.wav,.ogg,audio/*"/>
    </div>
    <div class="mts-filename mts-hidden" id="mts-filename"></div>
    <div style="display:flex;gap:0.75rem;margin-top:1rem;flex-wrap:wrap;">
      <button class="mts-btn mts-btn-primary" id="mts-analyze-btn" disabled>${t.analyzeBtn}</button>
    </div>
    <div class="mts-progress-bar mts-hidden" id="mts-progress-bar">
      <div class="mts-progress-fill" id="mts-progress-fill"></div>
    </div>
  </div>

  <!-- Visualizer -->
  <div class="mts-card" id="mts-viz-card">
    <h2>2 · Live Visualizer</h2>
    <div class="mts-viz-toolbar">
      <button class="mts-btn mts-btn-secondary active" id="mts-btn-spectrum" style="padding:0.4rem 1rem;font-size:0.8rem;">${t.spectrum}</button>
      <button class="mts-btn mts-btn-secondary" id="mts-btn-osc" style="padding:0.4rem 1rem;font-size:0.8rem;">${t.oscilloscope}</button>
      <span style="font-size:0.78rem;color:#475569;margin-left:auto;" id="mts-viz-status"></span>
    </div>
    <canvas id="mts-viz-canvas" width="800" height="160"></canvas>
  </div>

  <!-- Analysis Results -->
  <div class="mts-card mts-hidden" id="mts-results-card">
    <h2>3 · ${t.resultsTitle}</h2>
    <div class="mts-mood-banner" id="mts-mood-banner">
      <div>
        <div class="mts-mood-label" id="mts-mood-label"></div>
        <div class="mts-mood-desc" id="mts-mood-desc"></div>
      </div>
    </div>
    <div class="mts-results-grid" id="mts-results-grid"></div>
  </div>

  <!-- Preview -->
  <div class="mts-card mts-hidden" id="mts-preview-card">
    <h2>4 · ${t.previewTitle}</h2>
    <div class="mts-action-row">
      <button class="mts-btn mts-btn-green" id="mts-load-editor">${t.loadEditor}</button>
      <button class="mts-btn mts-btn-orange" id="mts-load-standalone">${t.loadStandalone}</button>
    </div>
    <iframe class="mts-preview-frame" id="mts-preview-frame" sandbox="allow-scripts allow-same-origin"></iframe>
  </div>
</div>`;

    root.id = 'mts-module-root';
    lb.appendChild(root);

    bindEvents(t);
  }

  // ── Event bindings ───────────────────────────────────────────
  function bindEvents(t) {
    const fileInput  = document.getElementById('mts-file');
    const dropZone   = document.getElementById('mts-drop');
    const fileName   = document.getElementById('mts-filename');
    const analyzeBtn = document.getElementById('mts-analyze-btn');
    const progressBar = document.getElementById('mts-progress-bar');
    const progressFill = document.getElementById('mts-progress-fill');
    const resultsCard  = document.getElementById('mts-results-card');
    const moodBanner   = document.getElementById('mts-mood-banner');
    const moodLabel    = document.getElementById('mts-mood-label');
    const moodDesc     = document.getElementById('mts-mood-desc');
    const resultsGrid  = document.getElementById('mts-results-grid');
    const previewCard  = document.getElementById('mts-preview-card');
    const previewFrame = document.getElementById('mts-preview-frame');
    const loadEditor   = document.getElementById('mts-load-editor');
    const loadStandalone = document.getElementById('mts-load-standalone');
    const vizCanvas    = document.getElementById('mts-viz-canvas');
    const vizStatus    = document.getElementById('mts-viz-status');
    const btnSpectrum  = document.getElementById('mts-btn-spectrum');
    const btnOsc       = document.getElementById('mts-btn-osc');

    // File selection
    function handleFile(file) {
      if (!file || !file.type.startsWith('audio/')) return;
      state.file = file;
      state.audioBuffer = null;
      state.analysisResult = null;
      state.generatedHTML = null;
      fileName.textContent = '📁 ' + file.name;
      fileName.classList.remove('mts-hidden');
      analyzeBtn.disabled = false;
      resultsCard.classList.add('mts-hidden');
      previewCard.classList.add('mts-hidden');
      stopVisualizer();
    }

    fileInput.addEventListener('change', e => handleFile(e.target.files[0]));
    dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('drag-over'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
    dropZone.addEventListener('drop', e => {
      e.preventDefault();
      dropZone.classList.remove('drag-over');
      handleFile(e.dataTransfer.files[0]);
    });

    // Visualizer mode buttons
    btnSpectrum.addEventListener('click', () => {
      state.vizMode = 'spectrum';
      btnSpectrum.classList.add('active');
      btnOsc.classList.remove('active');
      if (vizAnalyser) drawViz(vizCanvas, 'spectrum');
    });
    btnOsc.addEventListener('click', () => {
      state.vizMode = 'oscilloscope';
      btnOsc.classList.add('active');
      btnSpectrum.classList.remove('active');
      if (vizAnalyser) drawViz(vizCanvas, 'oscilloscope');
    });

    // Analyze
    analyzeBtn.addEventListener('click', async () => {
      if (!state.file) {
        if (window.showToast) window.showToast('⚠️ ' + t.noFile);
        return;
      }

      analyzeBtn.disabled = true;
      analyzeBtn.innerHTML = `<span class="mts-spin">⏳</span> ${t.analyzing}`;
      progressBar.classList.remove('mts-hidden');
      progressFill.style.width = '0%';
      resultsCard.classList.add('mts-hidden');
      previewCard.classList.add('mts-hidden');
      stopVisualizer();

      try {
        const arrayBuffer = await state.file.arrayBuffer();

        // Decode for visualizer playback
        const actxForViz = new (window.AudioContext || window.webkitAudioContext)();
        const bufForViz = await actxForViz.decodeAudioData(arrayBuffer.slice(0));
        actxForViz.close();
        state.audioBuffer = bufForViz;

        progressFill.style.width = '5%';

        // Analyze
        const result = await analyzeAudio(arrayBuffer, pct => {
          progressFill.style.width = pct + '%';
        });
        progressFill.style.width = '100%';
        state.analysisResult = result;

        const mood = classifyMood(result.bpm, result.energyPct, result.dominantBand);
        result.mood = mood;

        // Show results
        const theme = MOOD_THEMES[mood];
        const moodKey = mood.toLowerCase();
        moodBanner.style.cssText = `display:flex;align-items:center;gap:1rem;padding:1rem 1.4rem;
          border-radius:0.75rem;border-left:4px solid ${theme.accent1};margin-bottom:1rem;
          background:${theme.accent1}18;`;
        moodLabel.textContent = t[moodKey] || mood;
        moodLabel.style.color = theme.accent1;
        moodDesc.textContent = t.moodDesc[mood] || '';

        const bands = { BASS: t.bass, MID: t.mid, TREBLE: t.treble };
        resultsGrid.innerHTML = `
          <div class="mts-result-card">
            <div class="mts-result-val" style="color:${theme.accent1};">${result.bpm}</div>
            <div class="mts-result-lbl">${t.bpm}</div>
          </div>
          <div class="mts-result-card">
            <div class="mts-result-val" style="color:${theme.accent2};">${result.energyPct}%</div>
            <div class="mts-result-lbl">${t.energy}</div>
          </div>
          <div class="mts-result-card">
            <div class="mts-result-val" style="color:${theme.accent3};font-size:1.3rem;">${bands[result.dominantBand] || result.dominantBand}</div>
            <div class="mts-result-lbl">${t.dominant}</div>
          </div>
          <div class="mts-result-card">
            <div class="mts-result-val" style="color:#94a3b8;font-size:1.3rem;">${result.duration}s</div>
            <div class="mts-result-lbl">Duration</div>
          </div>`;

        resultsCard.classList.remove('mts-hidden');

        // Generate website
        if (window.showToast) window.showToast('🎨 ' + t.generating);
        const html = generateWebsite(result, mood, t);
        state.generatedHTML = html;

        // Inject into preview
        previewFrame.srcdoc = html;
        previewCard.classList.remove('mts-hidden');

        if (window.showToast) window.showToast(t.generatedToast);

        // Start visualizer with decoded buffer
        vizStatus.textContent = '▶ ' + state.file.name;
        startVisualizer(vizCanvas, state.audioBuffer);

        setTimeout(() => progressBar.classList.add('mts-hidden'), 1000);
      } catch (err) {
        if (window.showToast) window.showToast('❌ Analysis failed: ' + err.message);
        console.error('[MusicToSite]', err);
      } finally {
        analyzeBtn.disabled = false;
        analyzeBtn.textContent = t.analyzeBtn;
      }
    });

    // Load to editor
    loadEditor.addEventListener('click', () => {
      if (!state.generatedHTML) return;
      if (window.editor) {
        window.editor.setValue(state.generatedHTML);
        if (window.runPreview) window.runPreview();
        if (window.showToast) window.showToast(T[window.appLang || 'en'].doneToast || 'HTML loaded into editor.');
      } else {
        if (window.showToast) window.showToast('⚠️ Editor not found.');
      }
    });

    // Load standalone
    loadStandalone.addEventListener('click', () => {
      if (window.editor) {
        window.editor.setValue(STANDALONE_TEMPLATE);
        if (window.runPreview) window.runPreview();
        if (window.showToast) window.showToast('🚀 Standalone app loaded!');
      }
    });
  }

  // ── Standalone Template ──────────────────────────────────────
  const STANDALONE_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>🎵 Music → Website Generator</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cinzel:wght@400;700&family=Nunito:wght@300;400;600&family=Black+Ops+One&display=swap" rel="stylesheet"/>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{min-height:100vh;background:#020617;color:#e2e8f0;font-family:'Inter',sans-serif;overflow-x:hidden;}
#particles{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;}
.wrap{position:relative;z-index:5;max-width:960px;margin:0 auto;padding:2rem 1.5rem;}
header{text-align:center;padding:3rem 1rem 2rem;position:relative;z-index:5;}
header h1{font-family:'Orbitron',sans-serif;font-size:clamp(1.8rem,4vw,3rem);font-weight:900;
           background:linear-gradient(90deg,#a855f7,#ec4899,#f97316);-webkit-background-clip:text;
           -webkit-text-fill-color:transparent;background-clip:text;}
header p{margin-top:0.8rem;color:#64748b;font-size:1rem;}
.card{background:#0f172a;border:1px solid #1e293b;border-radius:1rem;padding:1.5rem;margin-bottom:1.5rem;}
.card h2{font-size:0.9rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;margin-bottom:1.1rem;}
.drop-zone{border:2px dashed #334155;border-radius:0.8rem;padding:2.5rem;text-align:center;
            cursor:pointer;transition:all 0.25s;background:#0a1628;}
.drop-zone:hover,.drop-zone.active{border-color:#a855f7;background:rgba(168,85,247,0.07);
                                    box-shadow:0 0 24px rgba(168,85,247,0.18);}
.drop-zone input{display:none;}
.drop-icon{font-size:3rem;margin-bottom:0.6rem;}
.drop-text{font-size:0.95rem;color:#64748b;}
.drop-hint{font-size:0.8rem;color:#475569;margin-top:0.3rem;}
.filename{margin-top:0.75rem;font-size:0.88rem;color:#a855f7;font-weight:600;display:none;}
.btn{padding:0.75rem 1.8rem;border-radius:0.55rem;font-size:0.9rem;font-weight:700;cursor:pointer;
      border:none;transition:all 0.2s;letter-spacing:0.03em;}
.btn-primary{background:linear-gradient(135deg,#a855f7,#ec4899);color:#fff;width:100%;margin-top:1rem;}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 0 22px rgba(168,85,247,0.45);}
.btn-primary:disabled{opacity:0.45;cursor:not-allowed;transform:none;}
.btn-sm{padding:0.5rem 1.1rem;font-size:0.82rem;}
.btn-green{background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;}
.btn-orange{background:linear-gradient(135deg,#f97316,#ef4444);color:#fff;}
.progress{height:6px;border-radius:3px;background:#1e293b;margin-top:1rem;overflow:hidden;display:none;}
.progress-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,#a855f7,#ec4899);width:0%;transition:width 0.3s;}
/* Visualizer */
.viz-toolbar{display:flex;gap:0.6rem;margin-bottom:0.75rem;}
.viz-btn{padding:0.4rem 1rem;font-size:0.8rem;border-radius:0.4rem;border:1px solid #334155;
          background:#1e293b;color:#94a3b8;cursor:pointer;transition:all 0.2s;}
.viz-btn.active{border-color:#a855f7;color:#a855f7;background:rgba(168,85,247,0.12);}
#vizCanvas{width:100%;height:160px;border-radius:0.65rem;border:1px solid #1e293b;background:#000;display:block;}
/* Results */
.results-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:1rem;margin-top:1rem;}
.result-card{background:#0a1628;border:1px solid #1e293b;border-radius:0.65rem;padding:1.1rem;text-align:center;}
.result-val{font-size:2rem;font-weight:800;}
.result-lbl{font-size:0.72rem;letter-spacing:0.1em;text-transform:uppercase;color:#475569;margin-top:0.25rem;}
.mood-banner{display:flex;align-items:center;gap:1rem;padding:1rem 1.4rem;border-radius:0.75rem;
              border-left:4px solid #a855f7;background:rgba(168,85,247,0.08);margin-bottom:1rem;}
.mood-name{font-size:1.5rem;font-weight:900;letter-spacing:0.1em;}
.mood-desc{font-size:0.82rem;color:#94a3b8;margin-top:0.2rem;}
/* Preview */
.preview-frame{width:100%;height:520px;border:none;border-radius:0.75rem;border:1px solid #1e293b;margin-top:1rem;}
.action-row{display:flex;gap:0.75rem;flex-wrap:wrap;margin-top:0.75rem;}
.hidden{display:none;}
.spin{display:inline-block;animation:spin 0.8s linear infinite;}
@keyframes spin{to{transform:rotate(360deg);}}
.log{font-size:0.8rem;color:#64748b;margin-top:0.5rem;min-height:1.2rem;}
</style>
</head>
<body>
<canvas id="particles"></canvas>
<header>
  <h1>🎵 Music → Website Generator</h1>
  <p>Upload any audio file · AI analyzes its mood · Generates a themed website</p>
</header>
<div class="wrap">
  <!-- Upload -->
  <div class="card">
    <h2>Step 1 — Upload Your Audio</h2>
    <div class="drop-zone" id="dropZone" onclick="document.getElementById('audioFile').click()">
      <div class="drop-icon">🎵</div>
      <div class="drop-text">Drop an MP3 / WAV / OGG here or click to browse</div>
      <div class="drop-hint">Supports MP3 · WAV · OGG</div>
      <input type="file" id="audioFile" accept=".mp3,.wav,.ogg,audio/*"/>
    </div>
    <div class="filename" id="fileName"></div>
    <button class="btn btn-primary" id="analyzeBtn" disabled>🔍 Analyze Audio</button>
    <div class="progress" id="progressBar"><div class="progress-fill" id="progressFill"></div></div>
    <div class="log" id="logMsg"></div>
  </div>

  <!-- Visualizer -->
  <div class="card">
    <h2>Step 2 — Live Visualizer</h2>
    <div class="viz-toolbar">
      <button class="viz-btn active" id="btnSpectrum">Spectrum</button>
      <button class="viz-btn" id="btnOsc">Oscilloscope</button>
      <span id="vizStatus" style="margin-left:auto;font-size:0.78rem;color:#475569;align-self:center;"></span>
    </div>
    <canvas id="vizCanvas" width="800" height="160"></canvas>
  </div>

  <!-- Results -->
  <div class="card hidden" id="resultsCard">
    <h2>Step 3 — Analysis Results</h2>
    <div class="mood-banner" id="moodBanner">
      <div>
        <div class="mood-name" id="moodName"></div>
        <div class="mood-desc" id="moodDescEl"></div>
      </div>
    </div>
    <div class="results-grid" id="resultsGrid"></div>
  </div>

  <!-- Preview -->
  <div class="card hidden" id="previewCard">
    <h2>Step 4 — Generated Website</h2>
    <div class="action-row">
      <button class="btn btn-sm btn-green" id="btnRegenerate">🔄 Regenerate</button>
      <button class="btn btn-sm btn-orange" id="btnDownload">⬇️ Download HTML</button>
    </div>
    <iframe class="preview-frame" id="previewFrame" sandbox="allow-scripts allow-same-origin"></iframe>
  </div>
</div>

<${'script'}>
'use strict';

// ── Particles ─────────────────────────────────────────────────
(function(){
  const c=document.getElementById('particles');
  const ctx=c.getContext('2d');
  let pts=[];
  function resize(){c.width=innerWidth;c.height=innerHeight;}
  resize();addEventListener('resize',resize);
  for(let i=0;i<60;i++)pts.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,
    r:Math.random()*2+0.5,vx:(Math.random()-0.5)*0.5,vy:-Math.random()*0.5-0.1,a:Math.random()*0.4+0.1});
  function draw(){
    ctx.clearRect(0,0,c.width,c.height);
    pts.forEach(p=>{
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle='rgba(168,85,247,'+p.a+')';ctx.fill();
      p.x+=p.vx;p.y+=p.vy;
      if(p.y<-5){p.y=c.height+5;p.x=Math.random()*c.width;}
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// ── State ─────────────────────────────────────────────────────
let currentFile=null,currentBuffer=null,generatedHTML='';
let audioCtx=null,analyserNode=null,sourceNode=null,vizRaf=null,vizMode='spectrum';

const MOOD_THEMES={
  ENERGETIC:{bg:'#0a0014',a1:'#ff2d78',a2:'#ff6a00',a3:'#ffe600',txt:'#ffffff',glow:'rgba(255,45,120,0.6)',font:"'Orbitron',sans-serif",spd:'0.4s',part:'#ff2d78',particleCount:80},
  MELANCHOLIC:{bg:'#04080f',a1:'#4fc3f7',a2:'#7b68ee',a3:'#90caf9',txt:'#cfd8dc',glow:'rgba(79,195,247,0.4)',font:"'Playfair Display',Georgia,serif",spd:'1.8s',part:'#4fc3f7',particleCount:40},
  EPIC:{bg:'#080010',a1:'#d4af37',a2:'#c0392b',a3:'#f39c12',txt:'#f5f5f5',glow:'rgba(212,175,55,0.55)',font:"'Cinzel',serif",spd:'0.8s',part:'#d4af37',particleCount:70},
  CHILL:{bg:'#020d12',a1:'#00e5cc',a2:'#26c6da',a3:'#b2ebf2',txt:'#e0f7fa',glow:'rgba(0,229,204,0.35)',font:"'Nunito',sans-serif",spd:'2.5s',part:'#00e5cc',particleCount:30},
  AGGRESSIVE:{bg:'#0c0000',a1:'#ff1a1a',a2:'#ff6600',a3:'#ffffff',txt:'#ffeeee',glow:'rgba(255,26,26,0.7)',font:"'Black Ops One','Impact',sans-serif",spd:'0.2s',part:'#ff1a1a',particleCount:90},
};

const MOOD_DESCS={
  ENERGETIC:'High BPM + strong bass → dynamic electric design.',
  MELANCHOLIC:'Slow tempo + rich mids → emotional moody design.',
  EPIC:'High energy full spectrum → grand cinematic design.',
  CHILL:'Low BPM + low energy → serene minimal design.',
  AGGRESSIVE:'Very high BPM + distorted peaks → raw intense design.',
};

// ── UI refs ────────────────────────────────────────────────────
const dropZone=document.getElementById('dropZone');
const audioFile=document.getElementById('audioFile');
const fileNameEl=document.getElementById('fileName');
const analyzeBtn=document.getElementById('analyzeBtn');
const progressBar=document.getElementById('progressBar');
const progressFill=document.getElementById('progressFill');
const logMsg=document.getElementById('logMsg');
const resultsCard=document.getElementById('resultsCard');
const moodBanner=document.getElementById('moodBanner');
const moodName=document.getElementById('moodName');
const moodDescEl=document.getElementById('moodDescEl');
const resultsGrid=document.getElementById('resultsGrid');
const previewCard=document.getElementById('previewCard');
const previewFrame=document.getElementById('previewFrame');
const btnRegen=document.getElementById('btnRegenerate');
const btnDownload=document.getElementById('btnDownload');
const vizCanvas=document.getElementById('vizCanvas');
const vizCtx=vizCanvas.getContext('2d');
const btnSpectrum=document.getElementById('btnSpectrum');
const btnOsc=document.getElementById('btnOsc');
const vizStatus=document.getElementById('vizStatus');

// ── File handling ─────────────────────────────────────────────
function handleFile(f){
  if(!f||!f.type.startsWith('audio/'))return;
  currentFile=f;currentBuffer=null;generatedHTML='';
  fileNameEl.style.display='block';fileNameEl.textContent='📁 '+f.name;
  analyzeBtn.disabled=false;
  resultsCard.classList.add('hidden');previewCard.classList.add('hidden');
  stopViz();logMsg.textContent='';
}
audioFile.addEventListener('change',e=>handleFile(e.target.files[0]));
dropZone.addEventListener('dragover',e=>{e.preventDefault();dropZone.classList.add('active');});
dropZone.addEventListener('dragleave',()=>dropZone.classList.remove('active'));
dropZone.addEventListener('drop',e=>{e.preventDefault();dropZone.classList.remove('active');handleFile(e.dataTransfer.files[0]);});

// ── Visualizer ─────────────────────────────────────────────────
function stopViz(){
  if(vizRaf)cancelAnimationFrame(vizRaf);
  if(sourceNode){try{sourceNode.stop();}catch(e){}}
  if(audioCtx){try{audioCtx.close();}catch(e){}}
  audioCtx=analyserNode=sourceNode=vizRaf=null;
}

function startViz(buffer){
  stopViz();
  audioCtx=new(window.AudioContext||window.webkitAudioContext)();
  analyserNode=audioCtx.createAnalyser();
  analyserNode.fftSize=2048;analyserNode.smoothingTimeConstant=0.8;
  sourceNode=audioCtx.createBufferSource();
  sourceNode.buffer=buffer;sourceNode.loop=true;
  sourceNode.connect(analyserNode);analyserNode.connect(audioCtx.destination);
  sourceNode.start();
  drawLoop();
}

function drawLoop(){
  if(!analyserNode)return;
  const W=vizCanvas.width,H=vizCanvas.height;
  vizCtx.fillStyle='rgba(0,0,0,0.25)';vizCtx.fillRect(0,0,W,H);
  if(vizMode==='spectrum'){
    const d=new Uint8Array(analyserNode.frequencyBinCount);
    analyserNode.getByteFrequencyData(d);
    const bw=W/(d.length/2.2);
    for(let i=0;i<d.length/2;i++){
      const v=d[i]/255,h=v*H;
      const hue=i/(d.length/2)*240+160;
      vizCtx.fillStyle='hsl('+hue+',100%,'+(40+v*40)+'%)';
      vizCtx.fillRect(i*bw,H-h,bw-1,h);
      vizCtx.fillStyle='hsla('+hue+',100%,85%,0.7)';
      vizCtx.fillRect(i*bw,H-h-3,bw-1,3);
    }
  } else {
    const d=new Uint8Array(analyserNode.fftSize);
    analyserNode.getByteTimeDomainData(d);
    vizCtx.lineWidth=2;vizCtx.strokeStyle='#00e5ff';
    vizCtx.shadowBlur=10;vizCtx.shadowColor='#00e5ff';
    vizCtx.beginPath();
    const sw=W/d.length;let x=0;
    for(let i=0;i<d.length;i++){
      const v=d[i]/128-1,y=H/2+v*H/2.5;
      if(i===0)vizCtx.moveTo(x,y);else vizCtx.lineTo(x,y);x+=sw;
    }
    vizCtx.stroke();vizCtx.shadowBlur=0;
  }
  vizRaf=requestAnimationFrame(drawLoop);
}

btnSpectrum.addEventListener('click',()=>{vizMode='spectrum';btnSpectrum.classList.add('active');btnOsc.classList.remove('active');});
btnOsc.addEventListener('click',()=>{vizMode='oscilloscope';btnOsc.classList.add('active');btnSpectrum.classList.remove('active');});

// ── Analysis ──────────────────────────────────────────────────
function setProgress(p){progressFill.style.width=p+'%';}
function setLog(msg){logMsg.textContent=msg;}

function estimateBPM(channelData,sr){
  const HOP=Math.floor(sr*0.01),WIN=Math.floor(sr*0.05);
  const maxS=Math.min(channelData.length,sr*60);
  const en=[];
  for(let i=0;i<maxS-WIN;i+=HOP){let e=0;for(let j=i;j<i+WIN;j++)e+=channelData[j]*channelData[j];en.push(e/WIN);}
  const sm=en.map((v,i)=>{let s=0,c=0;for(let k=Math.max(0,i-4);k<=Math.min(en.length-1,i+4);k++){s+=en[k];c++;}return s/c;});
  const mean=sm.reduce((a,b)=>a+b,0)/sm.length,thr=mean*1.5;
  const peaks=[];
  for(let i=1;i<sm.length-1;i++)if(sm[i]>sm[i-1]&&sm[i]>sm[i+1]&&sm[i]>thr)peaks.push(i);
  if(peaks.length<4)return 120;
  const intervals=[];
  for(let i=1;i<Math.min(peaks.length,200);i++){const d=(peaks[i]-peaks[i-1])*HOP/sr;if(d>0.2&&d<2.5)intervals.push(d);}
  if(!intervals.length)return 120;
  intervals.sort((a,b)=>a-b);const med=intervals[Math.floor(intervals.length/2)];
  let bpm=Math.round(60/med);
  if(bpm<60)bpm*=2;if(bpm>200)bpm=Math.round(bpm/2);
  return Math.max(40,Math.min(220,bpm));
}

function classifyMood(bpm,energy,band){
  if(bpm>150&&energy>65)return'AGGRESSIVE';
  if(bpm>120&&band==='BASS'&&energy>50)return'ENERGETIC';
  if(energy>70&&band!=='BASS')return'EPIC';
  if(bpm<85&&band==='MID')return'MELANCHOLIC';
  if(bpm<100&&energy<45)return'CHILL';
  if(bpm>=100&&energy>=45)return'ENERGETIC';
  return'CHILL';
}

async function analyzeAudio(arrayBuffer){
  setProgress(5);setLog('Decoding audio…');
  const decCtx=new(window.AudioContext||window.webkitAudioContext)();
  let buf;
  try{buf=await decCtx.decodeAudioData(arrayBuffer.slice(0));}
  catch(e){decCtx.close();throw new Error('Decode failed: '+e.message);}
  decCtx.close();
  currentBuffer=buf;
  const cd=buf.getChannelData(0),sr=buf.sampleRate;
  setProgress(30);setLog('Computing RMS energy…');
  let sq=0;for(let i=0;i<cd.length;i++)sq+=cd[i]*cd[i];
  const rms=Math.sqrt(sq/cd.length);
  const energyPct=Math.min(100,Math.round(rms*400));
  setProgress(50);setLog('Sampling frequency spectrum…');
  const aCtx=new(window.AudioContext||window.webkitAudioContext)();
  const an=aCtx.createAnalyser();an.fftSize=2048;an.smoothingTimeConstant=0.8;
  const fd=new Uint8Array(an.frequencyBinCount);
  const s2=aCtx.createBufferSource();s2.buffer=buf;s2.connect(an);an.connect(aCtx.destination);
  s2.start(0,Math.min(10,buf.duration*0.3));
  await new Promise(r=>setTimeout(r,350));
  an.getByteFrequencyData(fd);s2.stop();aCtx.close();
  const nyq=sr/2,binHz=nyq/an.frequencyBinCount;
  const be=Math.floor(250/binHz),me=Math.floor(4000/binHz);
  let bs=0,ms=0,ts=0;
  for(let i=0;i<fd.length;i++){if(i<=be)bs+=fd[i];else if(i<=me)ms+=fd[i];else ts+=fd[i];}
  const ba=bs/(be+1),ma=ms/(me-be),ta=ts/(fd.length-me);
  let dom='MID';if(ba>=ma&&ba>=ta)dom='BASS';else if(ta>=ma&&ta>ba)dom='TREBLE';
  setProgress(80);setLog('Detecting BPM…');
  const bpm=estimateBPM(cd,sr);
  setProgress(100);setLog('Done!');
  return{bpm,energyPct,dominantBand:dom,duration:Math.round(buf.duration)};
}

// ── Website generator ─────────────────────────────────────────
function generateSite(analysis,mood){
  const th=MOOD_THEMES[mood];
  const moodLabel=mood;
  const desc=MOOD_DESCS[mood]||'';
  const spd=parseFloat(th.spd);
  const pCount=th.particleCount;
  return'<!DOCTYPE html>\\n<html lang="en">\\n<head>\\n<meta charset="UTF-8"/>\\n<meta name="viewport" content="width=device-width,initial-scale=1.0"/>\\n<title>'+moodLabel+' — Music Site</title>\\n<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Playfair+Display:ital,wght@0,400;0,700&family=Cinzel:wght@400;700&family=Nunito:wght@300;400;600&family=Black+Ops+One&display=swap" rel="stylesheet"/>\\n<style>\\n*{box-sizing:border-box;margin:0;padding:0;}\\nbody{min-height:100vh;background:'+th.bg+';color:'+th.txt+';font-family:'+th.font+';overflow-x:hidden;}\\n#bg-canvas{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;}\\nnav{position:relative;z-index:10;display:flex;justify-content:space-between;align-items:center;padding:1.2rem 2.5rem;border-bottom:1px solid '+th.a1+'30;backdrop-filter:blur(8px);background:'+th.bg+'b0;}\\nnav .logo{font-size:1.3rem;font-weight:700;color:'+th.a1+';text-shadow:0 0 14px '+th.glow+';}\\nnav ul{list-style:none;display:flex;gap:2rem;}\\nnav ul a{color:'+th.txt+';text-decoration:none;font-size:0.88rem;transition:color '+th.spd+';}\\nnav ul a:hover{color:'+th.a1+';}\\n.hero{position:relative;z-index:5;min-height:88vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:4rem 2rem;}\\n.badge{display:inline-block;padding:0.3rem 1rem;border:1px solid '+th.a1+';border-radius:2rem;font-size:0.76rem;letter-spacing:0.15em;text-transform:uppercase;color:'+th.a1+';margin-bottom:1.8rem;animation:pg '+th.spd+' ease-in-out infinite alternate;}\\nh1{font-size:clamp(2.2rem,6vw,5rem);font-weight:900;line-height:1.1;background:linear-gradient(135deg,'+th.a1+','+th.a2+','+th.a3+');-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:sh 3s linear infinite;background-size:200%;}\\n.hero p{margin-top:1.4rem;max-width:580px;line-height:1.75;font-size:1rem;color:'+th.txt+'aa;}\\n.cta{margin-top:2.2rem;display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;}\\n.btn{padding:0.85rem 2rem;border-radius:0.5rem;font-size:0.92rem;font-weight:700;cursor:pointer;letter-spacing:0.04em;border:none;transition:all '+th.spd+';}\\n.btn-p{background:'+th.a1+';color:#000;box-shadow:0 0 18px '+th.glow+';}\\n.btn-p:hover{transform:translateY(-3px) scale(1.04);box-shadow:0 0 32px '+th.glow+';}\\n.btn-o{background:transparent;color:'+th.a1+';border:2px solid '+th.a1+';}\\n.btn-o:hover{background:'+th.a1+'22;transform:translateY(-3px);}\\n.stats{position:relative;z-index:5;display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1.2rem;padding:3rem 2.5rem;max-width:1000px;margin:0 auto;}\\n.sc{background:'+th.a1+'0a;border:1px solid '+th.a1+'30;border-radius:1rem;padding:1.8rem;text-align:center;transition:transform '+th.spd+',box-shadow '+th.spd+';}\\n.sc:hover{transform:translateY(-5px);box-shadow:0 0 18px '+th.glow+';}\\n.sv{font-size:2.5rem;font-weight:900;color:'+th.a1+';text-shadow:0 0 12px '+th.glow+';}\\n.sl{font-size:0.78rem;letter-spacing:0.1em;text-transform:uppercase;margin-top:0.4rem;color:'+th.txt+'70;}\\n.features{position:relative;z-index:5;max-width:1000px;margin:0 auto 4rem;padding:0 2rem;}\\n.features h2{text-align:center;font-size:1.8rem;margin-bottom:2rem;background:linear-gradient(90deg,'+th.a1+','+th.a2+');-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}\\n.fg{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.2rem;}\\n.fc{background:'+th.a2+'0a;border:1px solid '+th.a2+'25;border-radius:1rem;padding:1.6rem;transition:all '+th.spd+';}\\n.fc:hover{transform:translateY(-4px);border-color:'+th.a2+';box-shadow:0 0 14px '+th.a2+'40;}\\n.fi{font-size:2rem;margin-bottom:0.8rem;}\\n.fc h3{font-size:1rem;color:'+th.a2+';margin-bottom:0.4rem;}\\n.fc p{font-size:0.84rem;line-height:1.65;color:'+th.txt+'70;}\\n.viz-sec{position:relative;z-index:5;max-width:860px;margin:0 auto 4rem;padding:0 2rem;}\\n.viz-sec h2{text-align:center;font-size:1.6rem;color:'+th.a1+';margin-bottom:1.2rem;text-shadow:0 0 12px '+th.glow+';}\\n#vc{width:100%;height:160px;border-radius:1rem;border:1px solid '+th.a1+'30;background:#000;display:block;}\\nfooter{position:relative;z-index:5;text-align:center;padding:2rem;border-top:1px solid '+th.a1+'20;font-size:0.8rem;color:'+th.txt+'50;}\\nfooter span{color:'+th.a1+';}\\n@keyframes pg{from{box-shadow:0 0 6px '+th.glow+';}to{box-shadow:0 0 20px '+th.glow+',0 0 40px '+th.glow+';}}\\n@keyframes sh{0%{background-position:0%}100%{background-position:200%}}\\n</style>\\n</head>\\n<body>\\n<canvas id="bg-canvas"></canvas>\\n<nav><div class="logo">♪ '+moodLabel+'</div><ul><li><a href=\\"#stats\\">Stats</a></li><li><a href=\\"#viz\\">Visualizer</a></li><li><a href=\\"#features\\">Features</a></li></ul></nav>\\n<section class="hero"><div class="badge">🎵 Music-Generated · '+moodLabel+'</div><h1>Feel the '+moodLabel+' Vibe</h1><p>'+desc+' Every color, font, and animation was shaped by your audio.</p><div class="cta"><button class="btn btn-p">Play Your Track</button><button class="btn btn-o">Explore Design</button></div></section>\\n<section class="stats" id="stats"><div class="sc"><div class="sv">'+analysis.bpm+'</div><div class="sl">BPM</div></div><div class="sc"><div class="sv">'+analysis.energyPct+'%</div><div class="sl">Energy</div></div><div class="sc"><div class="sv">'+analysis.dominantBand+'</div><div class="sl">Dominant Band</div></div><div class="sc"><div class="sv">'+analysis.duration+'s</div><div class="sl">Duration</div></div></section>\\n<section class="viz-sec" id="viz"><h2>🎚 Frequency Visualizer</h2><canvas id="vc" width="800" height="160"></canvas></section>\\n<section class="features" id="features"><h2>What Your Music Shaped</h2><div class="fg"><div class="fc"><div class="fi">🎨</div><h3>Mood-Driven Palette</h3><p>Colors chosen algorithmically from BPM, energy, and frequency profile.</p></div><div class="fc"><div class="fi">✍️</div><h3>Tempo Typography</h3><p>Font reflects emotional weight — energetic sans to melancholic serif.</p></div><div class="fc"><div class="fi">⚡</div><h3>Animation Speed</h3><p>All transitions calibrated to your track BPM: fast music = snappy UI.</p></div><div class="fc"><div class="fi">🌌</div><h3>Reactive Particles</h3><p>Particle density and speed mirror bass frequency and overall energy.</p></div></div></section>\\n<footer>Generated by <span>Music → Website Generator</span> · Mood: <span>'+moodLabel+'</span></footer>\\n<'+'script>\\n(function(){\\nconst c=document.getElementById(\\"bg-canvas\\"),ctx=c.getContext(\\"2d\\");\\nlet pts=[];\\nfunction resize(){c.width=innerWidth;c.height=innerHeight;}resize();addEventListener(\\"resize\\",resize);\\nfor(let i=0;i<'+pCount+';i++)pts.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*2.5+0.5,vx:(Math.random()-0.5)*'+spd.toFixed(2)+',vy:-(Math.random()*'+spd.toFixed(2)+'+0.15),a:Math.random()*0.5+0.15});\\nfunction draw(){ctx.clearRect(0,0,c.width,c.height);pts.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=\\"'+th.part+'\\"+(Math.round(p.a*255)).toString(16).padStart(2,\\"0\\");ctx.fill();p.x+=p.vx;p.y+=p.vy;if(p.y<-5){p.y=c.height+5;p.x=Math.random()*c.width;}if(p.x<-5||p.x>c.width+5)p.vx*=-1;});requestAnimationFrame(draw);}draw();\\n})();\\n(function(){\\nconst vc=document.getElementById(\\"vc\\");if(!vc)return;\\nconst vctx=vc.getContext(\\"2d\\");\\nlet aCtx,an,src,raf;\\nfunction tryAutoPlay(){\\naCtx=new(window.AudioContext||window.webkitAudioContext)();\\nan=aCtx.createAnalyser();an.fftSize=2048;an.smoothingTimeConstant=0.8;\\nconst osc=aCtx.createOscillator();osc.connect(an);an.connect(aCtx.destination);osc.start();setTimeout(()=>{try{osc.stop();}catch(e){}},50);\\nfunction frame(){raf=requestAnimationFrame(frame);const W=vc.width,H=vc.height;vctx.fillStyle=\\"rgba(0,0,0,0.2)\\";vctx.fillRect(0,0,W,H);const d=new Uint8Array(an.frequencyBinCount);an.getByteFrequencyData(d);const bw=W/(d.length/2.2);for(let i=0;i<d.length/2;i++){const v=d[i]/255,h=v*H,hue=i/(d.length/2)*60+'+Math.round(Math.random()*180)+';vctx.fillStyle=\\"hsl(\\"+hue+\\",100%,\\"+(40+v*40)+\\"%)\\";;vctx.fillRect(i*bw,H-h,bw-1,h);}}frame();}\\ntryAutoPlay();\\n})();\\n</'+'script>\\n</body>\\n</html>';
}

// ── Analyze button ─────────────────────────────────────────────
analyzeBtn.addEventListener('click',async()=>{
  if(!currentFile){setLog('Please upload a file first.');return;}
  analyzeBtn.disabled=true;analyzeBtn.innerHTML='<span class="spin">⏳</span> Analyzing…';
  progressBar.style.display='block';setProgress(0);
  resultsCard.classList.add('hidden');previewCard.classList.add('hidden');
  stopViz();
  try{
    const ab=await currentFile.arrayBuffer();
    const result=await analyzeAudio(ab);
    const mood=classifyMood(result.bpm,result.energyPct,result.dominantBand);
    result.mood=mood;
    const th=MOOD_THEMES[mood];

    moodBanner.style.cssText='display:flex;align-items:center;gap:1rem;padding:1rem 1.4rem;border-radius:0.75rem;border-left:4px solid '+th.a1+';background:'+th.a1+'14;margin-bottom:1rem;';
    moodName.textContent=mood;moodName.style.color=th.a1;
    moodDescEl.textContent=MOOD_DESCS[mood]||'';
    resultsGrid.innerHTML='<div class="result-card"><div class="result-val" style="color:'+th.a1+'">'+result.bpm+'</div><div class="result-lbl">BPM</div></div><div class="result-card"><div class="result-val" style="color:'+th.a2+'">'+result.energyPct+'%</div><div class="result-lbl">Energy</div></div><div class="result-card"><div class="result-val" style="color:'+th.a3+';font-size:1.4rem;">'+result.dominantBand+'</div><div class="result-lbl">Dominant Band</div></div><div class="result-card"><div class="result-val" style="color:#94a3b8;font-size:1.4rem;">'+result.duration+'s</div><div class="result-lbl">Duration</div></div>';
    resultsCard.classList.remove('hidden');

    setLog('Generating website…');
    generatedHTML=generateSite(result,mood);
    previewFrame.srcdoc=generatedHTML;
    previewCard.classList.remove('hidden');
    setLog('✅ Done! Mood: '+mood);

    vizStatus.textContent='▶ '+currentFile.name;
    startViz(currentBuffer);

    setTimeout(()=>{progressBar.style.display='none';},1200);
  }catch(err){
    setLog('❌ Error: '+err.message);console.error(err);
  }finally{
    analyzeBtn.disabled=false;analyzeBtn.textContent='🔍 Analyze Audio';
  }
});

btnRegen.addEventListener('click',()=>{if(generatedHTML)previewFrame.srcdoc=generatedHTML;});
btnDownload.addEventListener('click',()=>{
  if(!generatedHTML)return;
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([generatedHTML],{type:'text/html'}));
  a.download='music-generated-site.html';a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),5000);
});
</${'script'}>
</body>
</html>`;

  // ── renderTab hook ───────────────────────────────────────────
  const _origRenderTab = window.renderTab;
  window.renderTab = function (tabId) {
    if (typeof _origRenderTab === 'function') _origRenderTab(tabId);
    if (tabId === 'musictosite') {
      stopVisualizer(); // clean up previous session
      render();
      if (window.editor) {
        window.editor.setValue(STANDALONE_TEMPLATE);
        if (window.runPreview) window.runPreview();
      }
      if (window.showToast) window.showToast(lang().doneToast);
    }
  };

  // ── Auto-init if tab already active ─────────────────────────
  (function tryInit() {
    const active = document.querySelector('.tab-btn.active');
    if (active && active.dataset && active.dataset.tab === 'musictosite') {
      render();
      if (window.showToast) window.showToast(lang().doneToast);
    }
  })();

})();
