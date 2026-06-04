(function(){
'use strict';
const TX={
  en:{
    title:'4D HYPER-MODEL SYNTH LAB',sub:'Multi-Dimensional Generative Art Studio',
    copied:'Copied!',injected:'Injected!',
    desc:'Synthesize and project complex 4-dimensional mathematical structures directly into your website layouts. Choose a dimension genome and warp time-space coordinates.',
    modelSelectLabel:'Active 4D Hyper-Mesh',
    synthBtn:'⚡ Synthesize 4D Model',
    injectBtn:'Inject 4D Asset',
    copyBtn:'Copy Asset Code',
    warpLabel:'Dimensional Warp W',
    phaseLabel:'Temporal Phase Speed',
    densityLabel:'Symmetric Tessellation',
    status_idle:'Standing by. Choose dimension genome.',
    status_running:'Calculating hyper-spatial projections...',
    status_done:'4D Model synthesized successfully!',
    logTitle:'🌀 Hyper-Spatial Projection Log',
    soundToggle:'🔊 Cosmic Drone Resonance',
    presetsLabel:'Quantum Presets',
    presetKerr:'🌀 Kerr Black Hole',
    presetAdS:'🌌 AdS Space Warp',
    presetCalabi:'📦 Super-String 6-D',
    copyCSSBtn:'Copy Pure CSS Loop SVG',
    models:{
      calabi:'🌌 Calabi-Yau Manifold',
      portal:'🌀 Non-Euclidean Portal',
      tesseract:'📦 4D Tesseract Extruder'
    }
  },
  fr:{
    title:'LABORATOIRE DE SYNTHÈSE HYPER-MODÈLE 4D',sub:'Studio Génératif d\'Art Multi-Dimensionnel',
    copied:'Copié!',injected:'Injecté!',
    desc:'Synthétisez et projetez des structures mathématiques complexes à 4 dimensions dans vos pages web. Choisissez un génome dimensionnel et déformez l\'espace-temps.',
    modelSelectLabel:'Hiper-Mesh 4D Actif',
    synthBtn:'⚡ Synthétiser le Modèle 4D',
    injectBtn:'Injecter l\'Asset 4D',
    copyBtn:'Copier le Code',
    warpLabel:'Déformation Dimensionnelle W',
    phaseLabel:'Déphasage Temporel T',
    densityLabel:'Tessellation Symétrique',
    status_idle:'En attente. Choisissez un génome.',
    status_running:'Calcul des projections hyper-spatiales...',
    status_done:'Modèle 4D synthétisé avec succès !',
    logTitle:'🌀 Log de Projection Hyper-Spatiale',
    soundToggle:'🔊 Résonance du Drone Cosmique',
    presetsLabel:'Préréglages Quantiques',
    presetKerr:'🌀 Trou Noir Kerr',
    presetAdS:'🌌 Courbe AdS',
    presetCalabi:'📦 Super-Corde 6-D',
    copyCSSBtn:'Copier le Loop SVG CSS Pur',
    models:{
      calabi:'🌌 Variété Calabi-Yau 4D',
      portal:'🌀 Portail Non-Euclidien',
      tesseract:'📦 Extrudeur Tesseract 4D'
    }
  }
};

function gl(){return window.appLang||'en';}

const _o=window.renderTab;
window.renderTab=function(tab){
  if(tab==='hyper4d'){
    window.activeTab='hyper4d';
    document.querySelectorAll('.ltab').forEach(b=>b.classList.remove('active'));
    const b=document.getElementById('tab-hyper4d');if(b)b.classList.add('active');
    window.initHyper4D(gl());return;
  }
  if(typeof _o==='function')_o(tab);
};

window.initHyper4D=function(lang){
  const el=document.getElementById('left-body');if(!el)return;
  const t=TX[lang]||TX.en;
  
  el.innerHTML=`
<div style="padding:15px;font-family:Inter,sans-serif;height:100%;box-sizing:border-box;background:#020617;overflow-y:auto;scrollbar-width:thin;display:flex;flex-direction:column;gap:12px;">
  <!-- Header -->
  <div style="background:linear-gradient(135deg,rgba(168,85,247,0.12),rgba(124,58,237,0.08));border-radius:14px;padding:16px;border:1px solid rgba(168,85,247,0.35);display:flex;align-items:center;gap:12px;">
    <span style="font-size:32px;filter:drop-shadow(0 0 12px #a855f7);">🌀</span>
    <div>
      <h2 style="margin:0;color:#c084fc;font-size:14px;font-weight:900;">${t.title}</h2>
      <p style="margin:3px 0 0;color:#94a3b8;font-size:10px;">${t.sub}</p>
    </div>
  </div>
  <p style="color:#64748b;font-size:10.5px;margin:0;line-height:1.5;">${t.desc}</p>

  <!-- Model Selection Grid -->
  <div style="background:#0f172a;border:1px solid rgba(168,85,247,0.15);border-radius:10px;padding:12px;display:flex;flex-direction:column;gap:8px;">
    <label style="color:#64748b;font-size:10px;font-weight:700;text-transform:uppercase;">${t.modelSelectLabel}</label>
    <div style="display:flex;flex-direction:column;gap:6px;">
      ${Object.entries(t.models).map(([k,v])=>`
        <button onclick="window.setHyper4DModel('${k}')" id="hyper-model-${k}" style="width:100%;padding:10px;text-align:left;border-radius:6px;border:1px solid rgba(255,255,255,0.08);background:transparent;color:#94a3b8;font-size:10.5px;font-weight:700;cursor:pointer;transition:all 0.2s;">${v}</button>
      `).join('')}
    </div>
  </div>

  <!-- Presets Grid -->
  <div style="background:#0f172a;border:1px solid rgba(255,255,255,0.04);border-radius:10px;padding:12px;display:flex;flex-direction:column;gap:8px;">
    <label style="color:#64748b;font-size:10px;font-weight:700;text-transform:uppercase;">${t.presetsLabel}</label>
    <div style="display:flex;flex-wrap:wrap;gap:6px;">
      <button onclick="window.applyHyperPreset('kerr')" style="flex:1;min-width:90px;padding:6px;border-radius:6px;border:1px solid rgba(168,85,247,0.25);background:rgba(168,85,247,0.05);color:#c084fc;font-size:9.5px;font-weight:700;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.background='rgba(168,85,247,0.15)'" onmouseout="this.style.background='rgba(168,85,247,0.05)'">${t.presetKerr}</button>
      <button onclick="window.applyHyperPreset('ads')" style="flex:1;min-width:90px;padding:6px;border-radius:6px;border:1px solid rgba(168,85,247,0.25);background:rgba(168,85,247,0.05);color:#c084fc;font-size:9.5px;font-weight:700;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.background='rgba(168,85,247,0.15)'" onmouseout="this.style.background='rgba(168,85,247,0.05)'">${t.presetAdS}</button>
      <button onclick="window.applyHyperPreset('calabi6d')" style="flex:1;min-width:90px;padding:6px;border-radius:6px;border:1px solid rgba(168,85,247,0.25);background:rgba(168,85,247,0.05);color:#c084fc;font-size:9.5px;font-weight:700;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.background='rgba(168,85,247,0.15)'" onmouseout="this.style.background='rgba(168,85,247,0.05)'">${t.presetCalabi}</button>
    </div>
  </div>

  <!-- Sliders -->
  <div style="background:#0f172a;border:1px solid rgba(255,255,255,0.04);border-radius:10px;padding:12px;display:flex;flex-direction:column;gap:10px;">
    <!-- Slider 1 -->
    <div style="display:flex;flex-direction:column;gap:4px;">
      <div style="display:flex;justify-content:space-between;">
        <span style="color:#64748b;font-size:10px;font-weight:700;text-transform:uppercase;">${t.warpLabel}</span>
        <span id="hyper-warp-val" style="color:#a855f7;font-size:11px;font-weight:800;">50%</span>
      </div>
      <input type="range" id="hyper-warp" min="10" max="90" value="50" oninput="document.getElementById('hyper-warp-val').innerText=this.value+'%'; if(window.updateHyperAudioNode)window.updateHyperAudioNode();" style="width:100%;accent-color:#a855f7;cursor:pointer;" />
    </div>

    <!-- Slider 2 -->
    <div style="display:flex;flex-direction:column;gap:4px;">
      <div style="display:flex;justify-content:space-between;">
        <span style="color:#64748b;font-size:10px;font-weight:700;text-transform:uppercase;">${t.phaseLabel}</span>
        <span id="hyper-phase-val" style="color:#a855f7;font-size:11px;font-weight:800;">60%</span>
      </div>
      <input type="range" id="hyper-phase" min="10" max="90" value="60" oninput="document.getElementById('hyper-phase-val').innerText=this.value+'%'; if(window.updateHyperAudioNode)window.updateHyperAudioNode();" style="width:100%;accent-color:#a855f7;cursor:pointer;" />
    </div>

    <!-- Slider 3 -->
    <div style="display:flex;flex-direction:column;gap:4px;">
      <div style="display:flex;justify-content:space-between;">
        <span style="color:#64748b;font-size:10px;font-weight:700;text-transform:uppercase;">${t.densityLabel}</span>
        <span id="hyper-density-val" style="color:#a855f7;font-size:11px;font-weight:800;">40%</span>
      </div>
      <input type="range" id="hyper-density" min="20" max="80" value="40" oninput="document.getElementById('hyper-density-val').innerText=this.value+'%'" style="width:100%;accent-color:#a855f7;cursor:pointer;" />
    </div>
  </div>

  <!-- Audio Toggle -->
  <div style="background:#0f172a;border:1px solid rgba(255,255,255,0.04);border-radius:10px;padding:10px 12px;display:flex;justify-content:space-between;align-items:center;">
    <span style="color:#64748b;font-size:10px;font-weight:700;text-transform:uppercase;">${t.soundToggle}</span>
    <button id="hyper-audio-toggle" onclick="window.toggleHyperAudio()" style="padding:6px 12px;border-radius:20px;border:1px solid #64748b;background:transparent;color:#94a3b8;font-size:10px;font-weight:800;cursor:pointer;transition:all 0.2s;">OFF</button>
  </div>

  <button onclick="window.runHyper4DSynth()" id="hyper-trigger" style="width:100%;padding:12px;border-radius:8px;background:linear-gradient(135deg,#a855f7,#7c3aed);border:none;color:#fff;font-weight:900;font-size:12px;cursor:pointer;box-shadow:0 0 14px rgba(168,85,247,0.4);transition:all 0.2s;">${t.synthBtn}</button>

  <!-- Dynamic SVG Math Preview -->
  <div style="background:#0f172a;border:1px solid rgba(168,85,247,0.15);border-radius:10px;padding:12px;display:flex;flex-direction:column;gap:10px;">
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <span style="font-size:10px;color:#64748b;font-weight:700;text-transform:uppercase;">Hyper-Spatial Mesh Visualizer</span>
      <span id="hyper-status-badge" style="font-size:10px;color:#cbd5e1;font-weight:800;">${t.status_idle}</span>
    </div>
    
    <div style="height:100px;background:#020617;border-radius:8px;border:1px solid rgba(255,255,255,0.04);overflow:hidden;position:relative;display:flex;align-items:center;justify-content:center;">
      <svg id="hyper-svg-canvas" style="width:100%;height:100%;position:absolute;inset:0;">
        <path id="hyper-svg-path" d="" fill="none" stroke="#a855f7" stroke-width="1.5" style="transition: stroke 0.3s;"></path>
        <path id="hyper-svg-path-secondary" d="" fill="none" stroke="rgba(192,132,252,0.3)" stroke-width="1" style="transition: stroke 0.3s;"></path>
      </svg>
    </div>
  </div>

  <!-- Operational log -->
  <div style="background:#0f172a;border:1px solid rgba(255,255,255,0.04);border-radius:10px;padding:12px;height:95px;display:flex;flex-direction:column;gap:8px;">
    <div style="font-size:10px;color:#c084fc;font-weight:800;letter-spacing:0.5px;text-transform:uppercase;">${t.logTitle}</div>
    <div id="hyper-log" style="flex:1;overflow-y:auto;font-family:JetBrains Mono,monospace;font-size:9.5px;color:#94a3b8;display:flex;flex-direction:column;gap:4px;scrollbar-width:none;">
      <div style="color:#334155;text-align:center;padding-top:20px;">— Waiting to synthesize hyper-dimensions —</div>
    </div>
  </div>

  <!-- Action Buttons -->
  <div style="display:flex;flex-direction:column;gap:6px;">
    <div style="display:flex;gap:6px;">
      <button onclick="window.hyper4DInject()" style="flex:1;padding:10px;border-radius:8px;background:#a855f7;border:none;color:#000;font-weight:900;font-size:11px;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.opacity=0.9" onmouseout="this.style.opacity=1">${t.injectBtn}</button>
      <button onclick="window.hyper4DCopy()" style="flex:1;padding:10px;border-radius:8px;background:#3b0764;border:none;color:#c084fc;font-weight:900;font-size:11px;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.opacity=0.9" onmouseout="this.style.opacity=1">${t.copyBtn}</button>
    </div>
    <button onclick="window.hyper4DCopyCSSLoop()" style="width:100%;padding:10px;border-radius:8px;background:linear-gradient(135deg,rgba(168,85,247,0.1),rgba(124,58,237,0.1));border:1px solid rgba(168,85,247,0.4);color:#c084fc;font-weight:900;font-size:11px;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.background='rgba(168,85,247,0.25)'" onmouseout="this.style.background='rgba(168,85,247,0.1)'">${t.copyCSSBtn}</button>
  </div>
</div>`;

  window._hyperModel='calabi';
  window._hyperRunning=false;
  window._hyperLang=lang;
  window._hyperActiveLoop=true;
  
  window.setHyper4DModel('calabi');
  window.startHyperSVGAnimate();
};

let audioCtx = null;
let osc1 = null;
let osc2 = null;
let filter = null;
let lfo = null;
let lfoGain = null;
let gainNode = null;
window._hyperAudioActive = false;

window.toggleHyperAudio = function(){
  const btn = document.getElementById('hyper-audio-toggle');
  const lang = window._hyperLang || 'en';
  const t = TX[lang] || TX.en;
  if(!window._hyperAudioActive){
    if(!audioCtx){
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContextClass();
        osc1 = audioCtx.createOscillator();
        osc2 = audioCtx.createOscillator();
        osc1.type = 'triangle';
        osc2.type = 'sawtooth';
        
        osc1.frequency.setValueAtTime(55, audioCtx.currentTime); // A1 note
        osc2.frequency.setValueAtTime(55.4, audioCtx.currentTime); // detuned
        
        filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(250, audioCtx.currentTime);
        filter.Q.setValueAtTime(4, audioCtx.currentTime);
        
        lfo = audioCtx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(1.5, audioCtx.currentTime);
        
        lfoGain = audioCtx.createGain();
        lfoGain.gain.setValueAtTime(80, audioCtx.currentTime);
        
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        
        gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
        
        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc1.start();
        osc2.start();
        lfo.start();
      } catch(e) {
        console.error('Web Audio failed:', e);
        return;
      }
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    window._hyperAudioActive = true;
    if(btn){
      btn.style.borderColor = '#a855f7';
      btn.style.background = '#a855f7';
      btn.style.color = '#000';
      btn.textContent = 'ON';
    }
    const log = document.getElementById('hyper-log');
    if(log){
      const row = document.createElement('div');
      row.style.padding = '2px 0';
      row.textContent = lang === 'fr' ? '▶ 🔊 Drone audio quantique initialisé à 55Hz.' : '▶ 🔊 Quantum audio drone initialized at 55Hz.';
      row.style.color = '#a855f7';
      log.appendChild(row);
      log.scrollTop = log.scrollHeight;
    }
    window.updateHyperAudioNode();
  } else {
    if(audioCtx && audioCtx.state === 'running'){
      audioCtx.suspend();
    }
    window._hyperAudioActive = false;
    if(btn){
      btn.style.borderColor = '#64748b';
      btn.style.background = 'transparent';
      btn.style.color = '#94a3b8';
      btn.textContent = 'OFF';
    }
  }
};

window.updateHyperAudioNode = function() {
  if (!window._hyperAudioActive || !audioCtx || !filter || !lfo || !lfoGain) return;
  const warpVal = parseInt(document.getElementById('hyper-warp')?.value || '50') / 50;
  const phaseVal = parseInt(document.getElementById('hyper-phase')?.value || '60') / 60;
  const baseFreq = 120 + warpVal * 150;
  filter.frequency.setTargetAtTime(baseFreq, audioCtx.currentTime, 0.1);
  const lfoSpeed = phaseVal * 2.5;
  lfo.frequency.setTargetAtTime(lfoSpeed, audioCtx.currentTime, 0.1);
  lfoGain.gain.setTargetAtTime(50 + warpVal * 60, audioCtx.currentTime, 0.1);
};

window.applyHyperPreset = function(type){
  const wInput = document.getElementById('hyper-warp');
  const pInput = document.getElementById('hyper-phase');
  const dInput = document.getElementById('hyper-density');
  if(!wInput || !pInput || !dInput) return;
  
  let wVal=50, pVal=60, dVal=40;
  let label = '';
  
  if(type === 'kerr'){
    wVal = 80; pVal = 75; dVal = 50;
    label = window._hyperLang === 'fr' ? 'Trou Noir Kerr' : 'Kerr Black Hole';
  } else if(type === 'ads'){
    wVal = 30; pVal = 40; dVal = 80;
    label = window._hyperLang === 'fr' ? 'Courbe AdS' : 'AdS Space Curve';
  } else if(type === 'calabi6d'){
    wVal = 55; pVal = 90; dVal = 35;
    label = window._hyperLang === 'fr' ? 'Super-Corde 6-D' : 'Super-String 6-D';
  }
  
  wInput.value = wVal;
  pInput.value = pVal;
  dInput.value = dVal;
  
  document.getElementById('hyper-warp-val').innerText = wVal + '%';
  document.getElementById('hyper-phase-val').innerText = pVal + '%';
  document.getElementById('hyper-density-val').innerText = dVal + '%';
  
  window.updateHyperAudioNode();
  
  const log = document.getElementById('hyper-log');
  if(log){
    const row = document.createElement('div');
    row.style.padding = '2px 0';
    row.textContent = window._hyperLang === 'fr' 
      ? `▶ Préréglage activé: ${label} [W:${wVal}% P:${pVal}% D:${dVal}%]` 
      : `▶ Preset loaded: ${label} [W:${wVal}% P:${pVal}% D:${dVal}%]`;
    row.style.color = '#c084fc';
    log.appendChild(row);
    log.scrollTop = log.scrollHeight;
  }
};

window.setHyper4DModel=function(key){
  window._hyperModel=key;
  const lang=window._hyperLang||'en';
  const t=TX[lang]||TX.en;
  
  Object.keys(t.models).forEach(k=>{
    const b=document.getElementById(`hyper-model-${k}`);
    if(b){
      b.style.background=(k===key)?'rgba(168,85,247,0.18)':'transparent';
      b.style.borderColor=(k===key)?'#a855f7':'rgba(255,255,255,0.08)';
      b.style.color=(k===key)?'#a855f7':'#94a3b8';
    }
  });

  const pathSec=document.getElementById('hyper-svg-path-secondary');
  if(pathSec){
    pathSec.style.display=(key==='calabi' || key==='tesseract')?'block':'none';
  }
};

window.startHyperSVGAnimate=function(){
  const path=document.getElementById('hyper-svg-path');
  const pathSec=document.getElementById('hyper-svg-path-secondary');
  const svgCanvas=document.getElementById('hyper-svg-canvas');
  if(!path)return;

  let frame=0;
  const cx=150, cy=50; // SVG center coordinates
  let svgMouse = { x: cx, y: cy };
  
  if(svgCanvas){
    svgCanvas.addEventListener('mousemove', (e) => {
      const rect = svgCanvas.getBoundingClientRect();
      svgMouse.x = e.clientX - rect.left;
      svgMouse.y = e.clientY - rect.top;
    });
    svgCanvas.addEventListener('mouseleave', () => {
      svgMouse.x = cx;
      svgMouse.y = cy;
    });
  }
  
  function warpPoint(px, py, mX, mY, radius, strength) {
    const dx = px - mX;
    const dy = py - mY;
    const dist = Math.hypot(dx, dy);
    if(dist < radius){
      const factor = (1.0 - dist / radius) * strength;
      px -= (dx / (dist + 0.1)) * factor;
      py -= (dy / (dist + 0.1)) * factor;
    }
    return { x: px, y: py };
  }
  
  function draw(){
    if(!window._hyperActiveLoop || window.activeTab !== 'hyper4d'){
      return;
    }

    frame++;
    const model=window._hyperModel;
    const warpVal=parseInt(document.getElementById('hyper-warp')?.value||'50')/50;
    const phaseVal=parseInt(document.getElementById('hyper-phase')?.value||'60')/60;
    const densityVal=parseInt(document.getElementById('hyper-density')?.value||'40');

    if(model==='calabi'){
      // Parametric multi-dimensional polar rose folding
      let d1='', d2='';
      const pts=densityVal;
      for(let i=0; i<=pts; i++){
        const theta=(i/pts)*Math.PI*2;
        const phase=frame*0.02*phaseVal;
        
        // Multi-frequency wave overlap
        const r=35*(Math.sin(theta*3 + phase)*0.4 + Math.cos(theta*2 - phase*0.5)*0.6)*warpVal;
        let x1_orig=cx + r*Math.cos(theta);
        let y1_orig=cy + r*Math.sin(theta);
        
        let p1 = warpPoint(x1_orig, y1_orig, svgMouse.x, svgMouse.y, 45, 12);
        d1+=(i===0)?`M ${p1.x} ${p1.y}`:` L ${p1.x} ${p1.y}`;

        // Secondary inner dimension mapping
        const r2=r*0.6*Math.sin(theta*4+phase);
        let x2_orig=cx + r2*Math.cos(theta*2);
        let y2_orig=cy + r2*Math.sin(theta*2);
        
        let p2 = warpPoint(x2_orig, y2_orig, svgMouse.x, svgMouse.y, 45, 12);
        d2+=(i===0)?`M ${p2.x} ${p2.y}`:` L ${p2.x} ${p2.y}`;
      }
      path.setAttribute('d', d1);
      path.setAttribute('stroke', '#c084fc');
      if(pathSec){
        pathSec.setAttribute('d', d2);
        pathSec.setAttribute('stroke', 'rgba(168,85,247,0.35)');
      }
    } else if(model==='portal'){
      // Nested swirling vortex
      let d='';
      const phase=frame*0.04*phaseVal;
      const rings=4;
      for(let r=1; r<=rings; r++){
        const radius=r*10*warpVal;
        const segments=24;
        for(let s=0; s<=segments; s++){
          const theta=(s/segments)*Math.PI*2 + (r*0.2) + (phase*(r%2===0?1:-1));
          const wave=Math.sin(theta*4 + phase)*2;
          let x_orig=cx + (radius+wave)*Math.cos(theta);
          let y_orig=cy + (radius+wave)*Math.sin(theta);
          
          let p = warpPoint(x_orig, y_orig, svgMouse.x, svgMouse.y, 45, 12);
          if(s===0) d+=` M ${p.x} ${p.y}`;
          else d+=` L ${p.x} ${p.y}`;
        }
      }
      path.setAttribute('d', d);
      path.setAttribute('stroke', '#a855f7');
    } else if(model==='tesseract'){
      // 4D Wireframe Tesseract projected cube rotation
      const t=frame*0.015*phaseVal;
      
      // Simple 4D projection calculation for two nested rotating cubes
      const s1 = 20 + 8*Math.sin(t)*warpVal;
      const s2 = 40 - 8*Math.sin(t)*warpVal;
      
      // Compute projected lines for cubes, warping each corner locally
      let c1_tl = warpPoint(cx-s1, cy-s1/2, svgMouse.x, svgMouse.y, 45, 12);
      let c1_tr = warpPoint(cx+s1, cy-s1/2, svgMouse.x, svgMouse.y, 45, 12);
      let c1_br = warpPoint(cx+s1, cy+s1/2, svgMouse.x, svgMouse.y, 45, 12);
      let c1_bl = warpPoint(cx-s1, cy+s1/2, svgMouse.x, svgMouse.y, 45, 12);
      
      let c2_tl = warpPoint(cx-s2, cy-s2/2, svgMouse.x, svgMouse.y, 45, 12);
      let c2_tr = warpPoint(cx+s2, cy-s2/2, svgMouse.x, svgMouse.y, 45, 12);
      let c2_br = warpPoint(cx+s2, cy+s2/2, svgMouse.x, svgMouse.y, 45, 12);
      let c2_bl = warpPoint(cx-s2, cy+s2/2, svgMouse.x, svgMouse.y, 45, 12);
      
      let d1=`M ${c1_tl.x} ${c1_tl.y} L ${c1_tr.x} ${c1_tr.y} L ${c1_br.x} ${c1_br.y} L ${c1_bl.x} ${c1_bl.y} Z`;
      let d2=`M ${c2_tl.x} ${c2_tl.y} L ${c2_tr.x} ${c2_tr.y} L ${c2_br.x} ${c2_br.y} L ${c2_bl.x} ${c2_bl.y} Z`;
      
      path.setAttribute('d', d1);
      path.setAttribute('stroke', '#e9d5ff');
      if(pathSec) {
        pathSec.setAttribute('d', d2);
        pathSec.setAttribute('stroke', '#c084fc');
      }
    }

    requestAnimationFrame(draw);
  }
  
  draw();
};

window.runHyper4DSynth=function(){
  if(window._hyperRunning)return;
  window._hyperRunning=true;
  
  const lang=window._hyperLang||'en';
  const t=TX[lang]||TX.en;
  const badge=document.getElementById('hyper-status-badge');if(badge)badge.textContent=t.status_running;
  const log=document.getElementById('hyper-log');if(log)log.innerHTML='';
  
  const operations={
    calabi:[
      { en: 'Loading string equations...', fr: 'Chargement des équations de cordes...' },
      { en: 'Projecting 6D curling vectors into 4D manifolds...', fr: 'Projection des vecteurs 6D dans les variétés 4D...' },
      { en: 'Extracting trigonometric phase curves...', fr: 'Extraction des courbes de phase trigonométriques...' },
      { en: 'Manifold synthesis complete. Quantum seed stable!', fr: 'Synthèse de variété complète. Graine quantique stable !' }
    ],
    portal:[
      { en: 'Compiling non-Euclidean vertex shaders...', fr: 'Compilation des vertex shaders non-euclidiens...' },
      { en: 'Mapping polar coordinate space deformers...', fr: 'Cartographie des déformeurs d\'espace polaire...' },
      { en: 'Solving pixel depth folding index over mouse vectors...', fr: 'Résolution de la pliure des pixels selon les vecteurs souris...' },
      { en: 'Portal viewport active. Shader compiled!', fr: 'Viseur de portail actif. Shader compilé !' }
    ],
    tesseract:[
      { en: 'Initializing 4D rotation matrix equations...', fr: 'Initialisation des équations de matrices de rotation 4D...' },
      { en: 'Projecting 16 vertices of hypercube to XW plane...', fr: 'Projection de 16 vertex de l\'hypercube sur le plan XW...' },
      { en: 'Configuring Three.js wireframe geometry layout...', fr: 'Configuration de la géométrie fil de fer Three.js...' },
      { en: '4D Tesseract Extruder active and responsive!', fr: 'Extrudeur Tesseract 4D actif et réactif !' }
    ]
  };

  const currentOpList = operations[window._hyperModel] || operations.calabi;
  let currentLogIdx=0;
  
  function step(){
    if(!window._hyperRunning)return;
    
    if(currentLogIdx>=currentOpList.length){
      window._hyperRunning=false;
      if(badge)badge.textContent=t.status_done;
      if(window.showToast)window.showToast(t.status_done);
      return;
    }
    
    const row=document.createElement('div');
    row.style.padding='2px 0';
    row.style.borderBottom='1px solid rgba(255,255,255,0.02)';
    row.textContent=`▶ ${currentOpList[currentLogIdx][lang]}`;
    row.style.color = '#c084fc';
    
    if(log){
      log.appendChild(row);
      log.scrollTop=log.scrollHeight;
    }

    currentLogIdx++;
    setTimeout(step, 550);
  }
  
  step();
};

window.hyper4DInject=function(){
  const lang=window._hyperLang||'en';
  const t=TX[lang]||TX.en;
  
  const warpVal=parseInt(document.getElementById('hyper-warp')?.value||'50')/50;
  const phaseVal=parseInt(document.getElementById('hyper-phase')?.value||'60')/60;
  const densityVal=parseInt(document.getElementById('hyper-density')?.value||'40');
  
  let code='';

  if(window._hyperModel==='calabi'){
    code=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>🌌 Calabi-Yau 4D Quantum Space</title>
  <style>
    body {
      background: #020617;
      margin: 0;
      overflow: hidden;
    }
    canvas { width: 100vw; height: 100vh; display: block; }
  </style>
</head>
<body>
  <canvas id="calabi-canvas"></canvas>

  <script>
    const canvas = document.getElementById('calabi-canvas');
    const ctx = canvas.getContext('2d');
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const mouse = { x: -1000, y: -1000 };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    let frame = 0;
    const warpFactor = ${warpVal};
    const phaseFactor = ${phaseVal};
    const pointsCount = ${densityVal * 4};

    function warpPoint(px, py) {
      const dx = px - mouse.x;
      const dy = py - mouse.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 150) {
        const factor = (1.0 - dist / 150) * 45;
        px -= (dx / (dist + 0.1)) * factor;
        py -= (dy / (dist + 0.1)) * factor;
      }
      return { x: px, y: py };
    }

    function draw() {
      frame++;
      ctx.fillStyle = 'rgba(2, 6, 23, 0.08)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const scale = Math.min(width, height) * 0.28;

      ctx.beginPath();
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 1.2;

      for (let i = 0; i <= pointsCount; i++) {
        const theta = (i / pointsCount) * Math.PI * 4;
        const phase = frame * 0.012 * phaseFactor;
        
        // Calabi-Yau 4D projection equations
        const r1 = Math.sin(theta * 3 + phase) * 0.3;
        const r2 = Math.cos(theta * 5 - phase * 0.7) * 0.4 * warpFactor;
        const r = scale * (1.0 + r1 + r2);
        
        const x = cx + r * Math.cos(theta) * Math.sin(phase * 0.2);
        const y = cy + r * Math.sin(theta) * Math.cos(phase * 0.3);

        const pt = warpPoint(x, y);

        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();

      // Inner dimensional resonance mesh
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.22)';
      for (let i = 0; i <= pointsCount; i++) {
        const theta = (i / pointsCount) * Math.PI * 4;
        const phase = frame * 0.012 * phaseFactor;
        
        const r = scale * 0.5 * (Math.sin(theta * 2 + phase) + 1.2);
        const x = cx + r * Math.cos(theta * 2);
        const y = cy + r * Math.sin(theta * 2);

        const pt = warpPoint(x, y);

        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();

      requestAnimationFrame(draw);
    }
    draw();
  </script>
</body>
</html>`;
  } else if(window._hyperModel==='portal'){
    code=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>🌀 Non-Euclidean Portal Shader</title>
  <style>
    body {
      background: #020617;
      margin: 0;
      overflow: hidden;
    }
    canvas {
      display: block;
      width: 100vw;
      height: 100vh;
    }
  </style>
</head>
<body>
  <canvas id="portal-canvas"></canvas>

  <script>
    const canvas = document.getElementById('portal-canvas');
    const gl = canvas.getContext('webgl');
    if (!gl) {
      canvas.style.background = 'radial-gradient(circle, #3b0764, #020617)';
    }

    const mouse = { x: 0.5, y: 0.5, prevX: 0.5, prevY: 0.5 };
    let velocity = 0.0;
    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = 1.0 - (e.clientY - rect.top) / rect.height;
      
      const dx = mouse.x - mouse.prevX;
      const dy = mouse.y - mouse.prevY;
      const dist = Math.hypot(dx, dy);
      velocity = Math.min(1.0, velocity * 0.92 + dist * 0.6);
      
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
    });

    const vs = \`
      attribute vec2 position;
      varying vec2 uv;
      void main() {
        uv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    \`;

    const fs = \`
      precision mediump float;
      varying vec2 uv;
      uniform float time;
      uniform vec2 u_mouse;
      uniform float u_velocity;
      
      void main() {
        vec2 center = u_mouse;
        vec2 d = uv - center;
        float r = length(d);
        float theta = atan(d.y, d.x);

        // Fold space polar warp with speed/velocity reaction
        float warp = sin(r * 15.0 - time * ${phaseVal * 2.0}) * (${warpVal * 0.15} + u_velocity * 0.25);
        float new_r = r + warp;
        float new_theta = theta + time * 0.2 / (r + 0.1);

        vec2 new_uv = center + vec2(cos(new_theta), sin(new_theta)) * new_r;
        
        // Generate beautiful neon grid lines
        float lines = sin(new_uv.x * 25.0) * sin(new_uv.y * 25.0);
        float mask = smoothstep(0.48, 0.5, lines);

        vec3 color = vec3(0.66, 0.33, 0.98) * (1.0 - r) * 1.5;
        color += vec3(0.0, 0.6, 0.8) * mask * 0.5;
        
        gl_FragColor = vec4(color, 1.0);
      }
    \`;

    function compileShader(src, type) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const prog = gl.createProgram();
    gl.attachShader(prog, compileShader(vs, gl.VERTEX_SHADER));
    gl.attachShader(prog, compileShader(fs, gl.FRAGMENT_FRAGMENT_SHADER || gl.FRAGMENT_SHADER));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const posLoc = gl.getAttribLocation(prog, 'position');
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(prog, 'time');
    const mouseLoc = gl.getUniformLocation(prog, 'u_mouse');
    const velLoc = gl.getUniformLocation(prog, 'u_velocity');

    let start = null;
    function render(now) {
      if (!start) start = now;
      const t = (now - start) * 0.001;

      // Ensure canvas is high-res
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);

      velocity *= 0.96; // decay slow-down effect

      gl.uniform1f(timeLoc, t);
      gl.uniform2f(mouseLoc, mouse.x, mouse.y);
      gl.uniform1f(velLoc, velocity);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  </script>
</body>
</html>`;
  } else {
    code=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>📦 4D Tesseract Extruder WebGL</title>
  <style>
    body {
      background: #020617;
      margin: 0;
      overflow: hidden;
      height: 100vh;
    }
    #canvas-container { width: 100vw; height: 100vh; }
  </style>
</head>
<body>
  <div id="canvas-container"></div>

  <!-- Three.js loaded locally inside current app sandbox -->
  <script src="js/three.min.js"></script>
  <script>
    const container = document.getElementById('canvas-container');
    
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.015);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Setup 16 vertices of a 4D Hypercube
    const tVertices = [];
    for(let x of [-1, 1]) {
      for(let y of [-1, 1]) {
        for(let z of [-1, 1]) {
          for(let w of [-1, 1]) {
            tVertices.push({ x, y, z, w });
          }
        }
      }
    }

    // Build connections (edges between vertices that differ by only one dimension coordinate)
    const tEdges = [];
    for(let i=0; i<16; i++) {
      for(let j=i+1; j<16; j++) {
        let diffs = 0;
        if(tVertices[i].x !== tVertices[j].x) diffs++;
        if(tVertices[i].y !== tVertices[j].y) diffs++;
        if(tVertices[i].z !== tVertices[j].z) diffs++;
        if(tVertices[i].w !== tVertices[j].w) diffs++;
        if(diffs === 1) {
          tEdges.push([i, j]);
        }
      }
    }

    // Create line segments for rendering
    const material = new THREE.LineBasicMaterial({ color: 0xc084fc, linewidth: 2 });
    const geometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(tEdges.length * 2 * 3);
    geometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(geometry, material);
    scene.add(lines);

    // Track mouse coordinates converted to 3D space
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    window.addEventListener('mousemove', (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    let angle = 0;
    const warpVal = ${warpVal};
    const phaseVal = ${phaseVal};

    function animate() {
      requestAnimationFrame(animate);
      angle += 0.01 * phaseVal;

      // Smooth mouse tracking
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // 4D Rotation Equations around the XW and ZW planes
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const cosB = Math.cos(angle * 0.7);
      const sinB = Math.sin(angle * 0.7);

      const pullTarget = new THREE.Vector3(mouse.x * 3.5, mouse.y * 3.5, 0);

      const projected3D = tVertices.map(v => {
        // Rotate in 4D space
        // XW plane rotation
        let x1 = v.x * cosA - v.w * sinA;
        let w1 = v.x * sinA + v.w * cosA;

        // ZW plane rotation
        let z1 = v.z * cosB - w1 * sinB;
        let w2 = v.z * sinB + w1 * cosB;

        // Project from 4D [x1, v.y, z1, w2] down to 3D [x3, y3, z3]
        // w-depth acts as a perspective divisor
        const div = 1.0 - (w2 * 0.45 * warpVal);
        const p3d = new THREE.Vector3(
          (x1 / div) * 2.2,
          (v.y / div) * 2.2,
          (z1 / div) * 2.2
        );

        // Gravity warp: pull projected vertex towards mouse 3D target
        const dist = p3d.distanceTo(pullTarget);
        if(dist < 4.0) {
          const factor = (1.0 - dist / 4.0) * 0.45;
          p3d.lerp(pullTarget, factor);
        }
        return p3d;
      });

      // Update positions buffer
      const pos = geometry.attributes.position.array;
      let ptr = 0;
      tEdges.forEach(edge => {
        const vA = projected3D[edge[0]];
        const vB = projected3D[edge[1]];
        pos[ptr++] = vA.x; pos[ptr++] = vA.y; pos[ptr++] = vA.z;
        pos[ptr++] = vB.x; pos[ptr++] = vB.y; pos[ptr++] = vB.z;
      });
      geometry.attributes.position.needsUpdate = true;

      // Gentle parent 3D rotation modulated by mouse
      lines.rotation.y += 0.005 + mouse.x * 0.015;
      lines.rotation.x += 0.003 + mouse.y * 0.015;

      renderer.render(scene, camera);
    }
    animate();
  </script>
</body>
</html>`;
  }

  if(window.editor){
    window.editor.setValue(code);
    if(window.runPreview)window.runPreview();
  }
  if(window.showToast)window.showToast(t.injected);
};

window.hyper4DCopyCSSLoop = function(){
  const lang=window._hyperLang||'en';
  const t=TX[lang]||TX.en;
  
  const warpVal=parseInt(document.getElementById('hyper-warp')?.value||'50')/50;
  const phaseVal=parseInt(document.getElementById('hyper-phase')?.value||'60')/60;
  const densityVal=parseInt(document.getElementById('hyper-density')?.value||'40');
  
  const generatePath = (f) => {
    let d = '';
    const pts = 48;
    const cx = 100, cy = 100;
    const scale = 50;
    for (let i = 0; i <= pts; i++) {
      const theta = (i / pts) * Math.PI * 4;
      const r = scale * (1.0 + Math.sin(theta * 3 + f) * 0.25 + Math.cos(theta * 5 - f * 0.7) * 0.35 * warpVal);
      const x = cx + r * Math.cos(theta);
      const y = cy + r * Math.sin(theta);
      if (i === 0) d += `M ${x.toFixed(1)} ${y.toFixed(1)}`;
      else d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    return d + ' Z';
  };

  const p0 = generatePath(0);
  const p1 = generatePath(Math.PI * 0.6);
  const p2 = generatePath(Math.PI * 1.2);
  const p3 = generatePath(Math.PI * 1.8);
  const p4 = p0;

  const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%" style="background:#020617;">
  <defs>
    <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#c084fc" />
      <stop offset="100%" stop-color="#7c3aed" />
    </linearGradient>
    <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="5" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
  <style>
    .morph-path {
      fill: none;
      stroke: url(#glowGrad);
      stroke-width: 2;
      filter: url(#neonGlow);
      transform-origin: center;
      animation: morph 8s infinite linear, spin 24s infinite linear;
    }
    .secondary-path {
      fill: none;
      stroke: rgba(168, 85, 247, 0.2);
      stroke-width: 1;
      transform-origin: center;
      animation: spin-reverse 30s infinite linear;
    }
    @keyframes morph {
      0% { d: path('${p0}'); }
      25% { d: path('${p1}'); }
      50% { d: path('${p2}'); }
      75% { d: path('${p3}'); }
      100% { d: path('${p4}'); }
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes spin-reverse {
      from { transform: rotate(360deg); }
      to { transform: rotate(0deg); }
    }
  </style>
  <path class="morph-path" d="${p0}" />
  <circle class="secondary-path" cx="100" cy="100" r="75" stroke-dasharray="8, 6" />
</svg>`;

  navigator.clipboard.writeText(svgCode).then(()=>{
    if(window.showToast) window.showToast(t.copied);
  });
};

window.hyper4DCopy=function(){
  const lang=window._hyperLang||'en';
  const t=TX[lang]||TX.en;
  
  const warpVal=parseInt(document.getElementById('hyper-warp')?.value||'50')/50;
  const phaseVal=parseInt(document.getElementById('hyper-phase')?.value||'60')/60;
  const densityVal=parseInt(document.getElementById('hyper-density')?.value||'40');
  
  let code='';
  if(window._hyperModel==='calabi') {
    code = `/* Calabi-Yau 4D Math projection */
const warpFactor = ${warpVal};
const phaseFactor = ${phaseVal};
const pts = ${densityVal};
for (let i = 0; i <= pts; i++) {
  const theta = (i / pts) * Math.PI * 4;
  const r = 200 * (1.0 + Math.sin(theta*3 + phase)*0.3 + Math.cos(theta*5 - phase*0.7)*0.4*warpFactor);
  const x = cx + r * Math.cos(theta);
  const y = cy + r * Math.sin(theta);
}`;
  } else if(window._hyperModel==='portal') {
    code = `/* Fragment Shader polar warping equation */
float warp = sin(r * 15.0 - time * ${phaseVal * 2.0}) * ${warpVal * 0.15};
float new_r = r + warp;
float new_theta = theta + time * 0.2 / (r + 0.1);
vec2 new_uv = center + vec2(cos(new_theta), sin(new_theta)) * new_r;`;
  } else {
    code = `/* 4D to 3D perspective divisor equation */
const div = 1.0 - (w2 * 0.45 * ${warpVal});
const x3d = x1 / div;
const y3d = y1 / div;
const z3d = z1 / div;`;
  }

  navigator.clipboard.writeText(code).then(()=>{if(window.showToast)window.showToast(t.copied);});
};

const _oa=window.applyLang;
window.applyLang=function(){
  if(typeof _oa==='function')_oa();
  const l=document.getElementById('lbl-tab-hyper4d');
  if(l)l.textContent=gl()==='fr'?'Synthé 4D':'4D Synth Lab';
  if(window.activeTab==='hyper4d')window.initHyper4D(gl());
};

console.log('🌀 4D Hyper-Model Synth Lab loaded!');
})();
