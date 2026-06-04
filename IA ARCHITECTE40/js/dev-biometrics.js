(function(){
'use strict';
const TX={
  en:{
    title:'DEV BIOMETRICS & STRESS MONITOR',sub:'Real-Time Visual Bio-Feedback',
    copied:'Copied!',injected:'Injected!',
    desc:'Monitor developer cognitive fatigue, focus levels, and eye-strain indexes. Use bio-feedback sensors to trigger eye fatigue protection styles or ambient relaxing audio synth systems in Monaco.',
    calibrateBtn:'⚡ Calibrate Sensors',
    injectShieldBtn:'🛡️ Inject Cyber-Emerald Shield',
    injectSynthBtn:'🎵 Inject Soothing Audio Synth',
    stressLabel:'Stress Level',
    fatigueSliderLabel:'Simulation Stress Mode',
    statusLabel:'Sensor Diagnostics',
    heartRateLabel:'Simulated Heart Rate',
    focusLabel:'Attention Span',
    calibrating:'Syncing biometric bands...',
    calibrated:'All systems calibrated & synced!',
    states:['Flow State (Relaxed)','Hyper-Focus (Active)','High Stress (Debugging)','System Burnout (Danger!)']
  },
  fr:{
    title:'BIOMÉTRIE DÉVELOPPEUR & MONITEUR DE STRESS',sub:'Bio-Rétroaction Visuelle en Temps Réel',
    copied:'Copié!',injected:'Injecté!',
    desc:'Surveillez la fatigue cognitive, l\'indice d\'attention et la tension oculaire. Utilisez les capteurs de bio-rétroaction pour appliquer des styles de protection oculaire ou un synthétiseur audio relaxant dans Monaco.',
    calibrateBtn:'⚡ Calibrer les Capteurs',
    injectShieldBtn:'🛡️ Injecter le Bouclier Cyber-Émeraude',
    injectSynthBtn:'🎵 Injecter le Synthé Apaisant',
    stressLabel:'Niveau de Stress',
    fatigueSliderLabel:'Mode de Stress Simulé',
    statusLabel:'Diagnostic des Capteurs',
    heartRateLabel:'Pouls Cardiaque Simulé',
    focusLabel:'Indice d\'Attention',
    calibrating:'Synchronisation des bracelets biométriques...',
    calibrated:'Capteurs calibrés et synchronisés !',
    states:['État de Flow (Relaxé)','Hyper-Focus (Actif)','Stress Élevé (Débogage)','Burnout Système (Danger !)']
  }
};

function gl(){return window.appLang||'en';}

const _o=window.renderTab;
window.renderTab=function(tab){
  if(tab==='devbiometrics'){
    window.activeTab='devbiometrics';
    document.querySelectorAll('.ltab').forEach(b=>b.classList.remove('active'));
    const b=document.getElementById('tab-devbiometrics');if(b)b.classList.add('active');
    window.initDevBiometrics(gl());return;
  }
  if(typeof _o==='function')_o(tab);
};

window.initDevBiometrics=function(lang){
  const el=document.getElementById('left-body');if(!el)return;
  const t=TX[lang]||TX.en;
  
  el.innerHTML=`
<div style="padding:15px;font-family:Inter,sans-serif;height:100%;box-sizing:border-box;background:#020617;overflow-y:auto;scrollbar-width:thin;display:flex;flex-direction:column;gap:12px;">
  <div style="background:linear-gradient(135deg,rgba(34,197,94,0.12),rgba(16,185,129,0.08));border-radius:14px;padding:16px;border:1px solid rgba(34,197,94,0.35);display:flex;align-items:center;gap:12px;">
    <span style="font-size:32px;filter:drop-shadow(0 0 12px #22c55e);">💚</span>
    <div>
      <h2 style="margin:0;color:#22c55e;font-size:15px;font-weight:900;">${t.title}</h2>
      <p style="margin:3px 0 0;color:#94a3b8;font-size:10px;">${t.sub}</p>
    </div>
  </div>
  <p style="color:#64748b;font-size:10.5px;margin:0;line-height:1.5;">${t.desc}</p>

  <!-- ECG Pulse Canvas Area -->
  <div style="background:#0f172a;border:1px solid rgba(34,197,94,0.15);border-radius:10px;padding:12px;display:flex;flex-direction:column;gap:8px;">
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <span style="font-size:10px;color:#64748b;font-weight:700;text-transform:uppercase;">Live Bio-Feed ECG</span>
      <span id="biometrics-state-text" style="font-size:10px;color:#22c55e;font-weight:800;transition:all 0.3s;">${t.states[0]}</span>
    </div>
    
    <div style="height:80px;background:#020617;border-radius:8px;border:1px solid rgba(255,255,255,0.04);position:relative;overflow:hidden;">
      <svg style="position:absolute;inset:0;width:100%;height:100%;">
        <path id="ecg-wave-path" d="" fill="none" stroke="#22c55e" stroke-width="2" style="transition: stroke 0.5s;"></path>
      </svg>
      <div style="position:absolute;bottom:6px;right:10px;display:flex;gap:12px;">
        <span style="font-size:9px;color:#64748b;">BPM: <strong id="biometrics-bpm-val" style="color:#fff;">72</strong></span>
        <span style="font-size:9px;color:#64748b;">O2: <strong style="color:#fff;">98%</strong></span>
      </div>
    </div>
  </div>

  <!-- Stress Simulation Control -->
  <div style="background:#0f172a;border:1px solid rgba(255,255,255,0.04);border-radius:10px;padding:12px;display:flex;flex-direction:column;gap:8px;">
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <span style="color:#64748b;font-size:10px;font-weight:700;text-transform:uppercase;">${t.fatigueSliderLabel}</span>
      <span id="biometrics-stress-val" style="color:#22c55e;font-size:11px;font-weight:800;">${t.states[0]}</span>
    </div>
    <input type="range" id="biometrics-stress-slider" min="0" max="3" value="0" oninput="window.updateBiometricsStress(parseInt(this.value))" style="width:100%;accent-color:#22c55e;cursor:pointer;" />
  </div>

  <button onclick="window.calibrateBiometrics()" id="biometrics-trigger" style="width:100%;padding:12px;border-radius:8px;background:linear-gradient(135deg,#22c55e,#16a34a);border:none;color:#fff;font-weight:900;font-size:12px;cursor:pointer;box-shadow:0 0 14px rgba(34,197,94,0.4);transition:all 0.2s;">${t.calibrateBtn}</button>

  <div style="background:#0f172a;border:1px solid rgba(34,197,94,0.15);border-radius:10px;padding:12px;display:flex;flex-direction:column;gap:8px;">
    <div style="font-size:10px;color:#64748b;font-weight:700;text-transform:uppercase;">${t.statusLabel}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
      <div style="background:#020617;border-radius:6px;padding:8px;border:1px solid rgba(255,255,255,0.02);display:flex;flex-direction:column;">
        <span style="color:#64748b;font-size:9px;">${t.focusLabel}</span>
        <span id="biometrics-stat-focus" style="color:#22c55e;font-size:14px;font-weight:900;">94%</span>
      </div>
      <div style="background:#020617;border-radius:6px;padding:8px;border:1px solid rgba(255,255,255,0.02);display:flex;flex-direction:column;">
        <span style="color:#64748b;font-size:9px;">${t.stressLabel}</span>
        <span id="biometrics-stat-load" style="color:#22c55e;font-size:14px;font-weight:900;">Low (20%)</span>
      </div>
    </div>
  </div>

  <div style="display:flex;flex-direction:column;gap:6px;">
    <button onclick="window.biometricsInjectShield()" style="width:100%;padding:10px;border-radius:8px;background:#22c55e;border:none;color:#000;font-weight:900;font-size:11px;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.opacity=0.9" onmouseout="this.style.opacity=1">${t.injectShieldBtn}</button>
    <button onclick="window.biometricsInjectSynth()" style="width:100%;padding:10px;border-radius:8px;background:#052e16;border:none;color:#22c55e;font-weight:900;font-size:11px;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.opacity=0.9" onmouseout="this.style.opacity=1">${t.injectSynthBtn}</button>
  </div>
</div>`;

  window._biometricsStress=0;
  window._biometricsBPM=72;
  window._biometricsLang=lang;
  window._biometricsRunning=true;
  
  window.startECGLoop();
};

// ECG wave loop using simple mathematical sine-peak equation
window.startECGLoop=function(){
  const path = document.getElementById('ecg-wave-path');
  if(!path) return;

  let x = 0;
  let animId = null;
  const width = 300; // approximation of container size
  const height = 80;
  const points = [];

  function draw() {
    if(!window._biometricsRunning || window.activeTab !== 'devbiometrics') {
      cancelAnimationFrame(animId);
      return;
    }

    x += 1.8 + (window._biometricsStress * 0.9); // speed shifts with stress
    if(x > width) x = 0;

    // Calculate dynamic coordinates
    // We want a standard ECG wave shape: flat line with a P-wave, QRS complex, and T-wave.
    const cy = height / 2;
    let y = cy;

    const pulseInterval = 100 - (window._biometricsStress * 18);
    const mod = Math.floor(x) % Math.floor(pulseInterval);

    if (mod > 10 && mod < 16) {
      // P wave (small bump)
      y = cy - Math.sin((mod - 10) * Math.PI / 5) * 4;
    } else if (mod >= 16 && mod < 19) {
      // Q drop
      y = cy + (mod - 16) * 4;
    } else if (mod >= 19 && mod < 22) {
      // R spike
      y = cy - 25 - (window._biometricsStress * 8);
    } else if (mod >= 22 && mod < 25) {
      // S drop
      y = cy + 12 + (window._biometricsStress * 3);
    } else if (mod >= 25 && mod < 32) {
      // T wave
      y = cy - Math.sin((mod - 25) * Math.PI / 7) * 8;
    }

    points.push({ x: x, y: y });
    if(points.length > 90) points.shift();

    let d = '';
    points.forEach((p, idx) => {
      // Adjust standard coordinates dynamically to render shifting values
      d += (idx === 0) ? `M ${p.x} ${p.y}` : ` L ${p.x} ${p.y}`;
    });

    path.setAttribute('d', d);
    
    // Live noise to simulate raw sensor feedback
    const bpmVal = document.getElementById('biometrics-bpm-val');
    if(bpmVal && Math.random() > 0.95) {
      const noise = Math.floor(Math.random() * 5) - 2;
      bpmVal.textContent = window._biometricsBPM + noise;
    }

    animId = requestAnimationFrame(draw);
  }

  draw();
};

window.updateBiometricsStress=function(val){
  window._biometricsStress = val;
  const lang = window._biometricsLang || 'en';
  const t = TX[lang] || TX.en;

  const stressVal = document.getElementById('biometrics-stress-val');
  const stateText = document.getElementById('biometrics-state-text');
  const path = document.getElementById('ecg-wave-path');
  const focusStat = document.getElementById('biometrics-stat-focus');
  const loadStat = document.getElementById('biometrics-stat-load');
  const trigger = document.getElementById('biometrics-trigger');

  if(stressVal) stressVal.textContent = t.states[val];
  if(stateText) {
    stateText.textContent = t.states[val];
    if(val === 0) stateText.style.color = '#22c55e';
    else if(val === 1) stateText.style.color = '#38bdf8';
    else if(val === 2) stateText.style.color = '#f59e0b';
    else stateText.style.color = '#f43f5e';
  }

  if(path) {
    if(val === 0) path.setAttribute('stroke', '#22c55e');
    else if(val === 1) path.setAttribute('stroke', '#38bdf8');
    else if(val === 2) path.setAttribute('stroke', '#f59e0b');
    else path.setAttribute('stroke', '#f43f5e');
  }

  // Update stats based on stress level
  if(val === 0) {
    window._biometricsBPM = 70;
    if(focusStat) focusStat.textContent = '96%';
    if(loadStat) { loadStat.textContent = 'Low (15%)'; loadStat.style.color = '#22c55e'; }
  } else if(val === 1) {
    window._biometricsBPM = 85;
    if(focusStat) focusStat.textContent = '99%';
    if(loadStat) { loadStat.textContent = 'Medium (38%)'; loadStat.style.color = '#38bdf8'; }
  } else if(val === 2) {
    window._biometricsBPM = 110;
    if(focusStat) focusStat.textContent = '72%';
    if(loadStat) { loadStat.textContent = 'High (68%)'; loadStat.style.color = '#f59e0b'; }
  } else {
    window._biometricsBPM = 135;
    if(focusStat) focusStat.textContent = '35%';
    if(loadStat) { loadStat.textContent = 'Critical (92%)'; loadStat.style.color = '#f43f5e'; }
  }

  const bpmVal = document.getElementById('biometrics-bpm-val');
  if(bpmVal) bpmVal.textContent = window._biometricsBPM;
};

window.calibrateBiometrics=function(){
  const lang = window._biometricsLang || 'en';
  const t = TX[lang] || TX.en;
  
  const trigger = document.getElementById('biometrics-trigger');
  if(trigger) {
    trigger.textContent = t.calibrating;
    trigger.style.pointerEvents = 'none';
    trigger.style.opacity = '0.6';
  }

  setTimeout(() => {
    if(trigger) {
      trigger.textContent = t.calibrateBtn;
      trigger.style.pointerEvents = 'all';
      trigger.style.opacity = '1';
    }
    if(window.showToast) window.showToast(t.calibrated);
  }, 1200);
};

window.biometricsInjectShield=function(){
  const lang = window._biometricsLang || 'en';
  const t = TX[lang] || TX.en;

  const code = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Cyber-Emerald Eye Shield Mode</title>
  <style>
    body {
      background: #020617;
      color: #34d399;
      font-family: 'Inter', sans-serif;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      /* Soothing Cyber-Emerald Color Shield Overlay */
      filter: contrast(0.92) sepia(0.1) hue-rotate(15deg);
    }
    
    .shield-panel {
      padding: 30px;
      border-radius: 16px;
      background: rgba(16, 185, 129, 0.08);
      border: 1.5px solid rgba(52, 211, 153, 0.4);
      box-shadow: 0 0 25px rgba(16, 185, 129, 0.15), inset 0 0 15px rgba(16, 185, 129, 0.05);
      text-align: center;
      max-width: 400px;
    }

    h1 {
      margin: 0 0 10px 0;
      font-size: 22px;
      color: #34d399;
      text-shadow: 0 0 8px rgba(52, 211, 153, 0.5);
    }

    p {
      color: #a7f3d0;
      font-size: 13px;
      line-height: 1.6;
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="shield-panel">
    <h1>🛡️ Eye-Strain Shield Active</h1>
    <p>This layout injects professional cyber-emerald custom visual styling tokens designed to minimize blue light emission and optimize deep concentration states during long development cycles.</p>
  </div>
</body>
</html>`;

  if(window.editor) {
    window.editor.setValue(code);
    if(window.runPreview) window.runPreview();
  }
  if(window.showToast) window.showToast(t.injected);
};

window.biometricsInjectSynth=function(){
  const lang = window._biometricsLang || 'en';
  const t = TX[lang] || TX.en;

  const code = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Ambient Binaural Oscillator Synth</title>
  <style>
    body {
      background: #020617;
      color: #fff;
      font-family: 'Inter', sans-serif;
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0;
    }

    .synth-box {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 30px;
      text-align: center;
      box-shadow: 0 8px 32px rgba(0,0,0,0.5);
      max-width: 320px;
    }

    h3 { margin: 0 0 10px 0; color: #4ade80; }
    p { font-size: 12px; color: #94a3b8; line-height: 1.5; margin-bottom: 20px; }

    button {
      padding: 12px 24px;
      border-radius: 8px;
      border: none;
      background: #22c55e;
      color: #000;
      font-weight: 800;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(34, 197, 94, 0.3);
      transition: all 0.2s;
    }
    button:active { transform: scale(0.95); }
  </style>
</head>
<body>
  <div class="synth-box">
    <h3>🎵 Ambient Synth Restore</h3>
    <p>A Web Audio API frequency oscillator generator configured at a relaxing 432Hz binaural node structure to re-align concentration.</p>
    <button id="synth-play-btn" onclick="toggleSynth()">▶ Start Ambient Tone</button>
  </div>

  <script>
    let audioCtx = null;
    let osc1 = null;
    let osc2 = null;
    let gainNode = null;
    let playing = false;

    function toggleSynth() {
      const btn = document.getElementById('synth-play-btn');
      if (playing) {
        if (osc1) osc1.stop();
        if (osc2) osc2.stop();
        playing = false;
        btn.textContent = "▶ Start Ambient Tone";
        btn.style.background = "#22c55e";
        return;
      }

      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      
      // Node 1: Primary fundamental pitch (432Hz)
      osc1 = audioCtx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(432, audioCtx.currentTime);

      // Node 2: Harmonious offset pitch (216Hz)
      osc2 = audioCtx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(216, audioCtx.currentTime);

      gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime); // keep it soft

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc1.start();
      osc2.start();

      playing = true;
      btn.textContent = "⏹ Stop Ambient Tone";
      btn.style.background = "#ef4444";
      btn.style.color = "#fff";
      btn.style.boxShadow = "0 4px 14px rgba(239, 68, 68, 0.3)";
    }
  </script>
</body>
</html>`;

  if(window.editor) {
    window.editor.setValue(code);
    if(window.runPreview) window.runPreview();
  }
  if(window.showToast) window.showToast(t.injected);
};

const _oa=window.applyLang;
window.applyLang=function(){
  if(typeof _oa==='function')_oa();
  const l=document.getElementById('lbl-tab-devbiometrics');
  if(l)l.textContent=gl()==='fr'?'Biométrie Dev':'Dev Biometrics';
  if(window.activeTab==='devbiometrics')window.initDevBiometrics(gl());
};

console.log('💚 Dev Biometrics loaded!');
})();
