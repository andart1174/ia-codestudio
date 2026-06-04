(function(){
'use strict';
const TX={
  en:{
    title:'NEURO-SYMBOLIC UI DREAMER',sub:'Aesthetic Genetic Style Breeding Lab',back:'<- Back',
    copied:'Copied!',injected:'Injected!',
    desc:'Select two parent UI paradigms and watch artificial neural synapses breed, cross-over, and mutate CSS tokens to synthesize state-of-the-art hybrid layouts.',
    dreamBtn:'⚡ Breed Style (Dream)',injectBtn:'Inject CSS App',copyBtn:'Copy CSS',
    parent1:'Parent Style A',parent2:'Parent Style B',
    mutationLabel:'Mutation Entropy',complexityLabel:'Synaptic Depth',
    themes:{
      glass:'🔮 Glassmorphism',
      neon:'⚡ Cyber Neon',
      brutalist:'📦 Neo-Brutalism',
      minimal:'🍎 Apple Minimal'
    },
    status_idle:'Standing by. Choose parent genomes and begin.',
    status_running:'Breeding CSS alleles...',
    status_done:'Morphed genome compiled!'
  },
  fr:{
    title:'DREAMER D\'INTERFACES NEURONAL',sub:'Laboratoire d\'Hybridation Esthétique CSS',back:'<- Retour',
    copied:'Copié!',injected:'Injecté!',
    desc:'Sélectionnez deux paradigmes d\'interface parents et observez les synapses artificielles croiser et muter les tokens CSS pour synthétiser des designs hybrides uniques.',
    dreamBtn:'⚡ Fusionner le Style (Rêver)',injectBtn:'Injecter l\'App CSS',copyBtn:'Copier CSS',
    parent1:'Stile Parent A',parent2:'Stile Parent B',
    mutationLabel:'Entropie de Mutation',complexityLabel:'Profondeur Synaptique',
    themes:{
      glass:'🔮 Glassmorphisme',
      neon:'⚡ Cyber Néon',
      brutalist:'📦 Néo-Brutalisme',
      minimal:'🍎 Apple Minimal'
    },
    status_idle:'En attente. Choisissez les génomes parents.',
    status_running:'Croisement des allèles CSS...',
    status_done:'Génome hybride compilé !'
  }
};

function gl(){return window.appLang||'en';}

const _o=window.renderTab;
window.renderTab=function(tab){
  if(tab==='uidreamer'){
    window.activeTab='uidreamer';
    document.querySelectorAll('.ltab').forEach(b=>b.classList.remove('active'));
    const b=document.getElementById('tab-uidreamer');if(b)b.classList.add('active');
    window.initUIDreamer(gl());return;
  }
  if(typeof _o==='function')_o(tab);
};

window.initUIDreamer=function(lang){
  const el=document.getElementById('left-body');if(!el)return;
  const t=TX[lang]||TX.en;
  
  el.innerHTML=`
<div style="padding:15px;font-family:Inter,sans-serif;height:100%;box-sizing:border-box;background:#020617;overflow-y:auto;scrollbar-width:thin;display:flex;flex-direction:column;gap:12px;">
  <div style="background:linear-gradient(135deg,rgba(236,72,153,0.12),rgba(219,39,119,0.08));border-radius:14px;padding:16px;border:1px solid rgba(236,72,153,0.35);display:flex;align-items:center;gap:12px;">
    <span style="font-size:32px;filter:drop-shadow(0 0 12px #f472b6);">🎨</span>
    <div>
      <h2 style="margin:0;color:#f472b6;font-size:15px;font-weight:900;">${t.title}</h2>
      <p style="margin:3px 0 0;color:#94a3b8;font-size:10px;">${t.sub}</p>
    </div>
  </div>
  <p style="color:#64748b;font-size:10.5px;margin:0;line-height:1.5;">${t.desc}</p>

  <div style="background:#0f172a;border:1px solid rgba(236,72,153,0.15);border-radius:10px;padding:12px;display:flex;flex-direction:column;gap:8px;">
    <label style="color:#64748b;font-size:10px;font-weight:700;text-transform:uppercase;">${t.parent1}</label>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
      ${Object.entries(t.themes).map(([k,v])=>`<button onclick="window.setDreamParent('A','${k}')" id="dream-parentA-${k}" style="padding:8px 4px;border-radius:6px;border:1px solid rgba(255,255,255,0.08);background:transparent;color:#94a3b8;font-size:10px;font-weight:700;cursor:pointer;">${v}</button>`).join('')}
    </div>
  </div>

  <div style="background:#0f172a;border:1px solid rgba(236,72,153,0.15);border-radius:10px;padding:12px;display:flex;flex-direction:column;gap:8px;">
    <label style="color:#64748b;font-size:10px;font-weight:700;text-transform:uppercase;">${t.parent2}</label>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
      ${Object.entries(t.themes).map(([k,v])=>`<button onclick="window.setDreamParent('B','${k}')" id="dream-parentB-${k}" style="padding:8px 4px;border-radius:6px;border:1px solid rgba(255,255,255,0.08);background:transparent;color:#94a3b8;font-size:10px;font-weight:700;cursor:pointer;">${v}</button>`).join('')}
    </div>
  </div>

  <div style="background:#0f172a;border:1px solid rgba(255,255,255,0.04);border-radius:10px;padding:12px;display:flex;flex-direction:column;gap:8px;">
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <span style="color:#64748b;font-size:10px;font-weight:700;text-transform:uppercase;">${t.mutationLabel}</span>
      <span id="dream-mutation-val" style="color:#f472b6;font-size:11px;font-weight:800;">40%</span>
    </div>
    <input type="range" id="dream-mutation" min="10" max="90" value="40" oninput="document.getElementById('dream-mutation-val').innerText=this.value+'%'" style="width:100%;accent-color:#f472b6;cursor:pointer;" />
  </div>

  <button onclick="window.dreamBreed()" id="dream-trigger" style="width:100%;padding:12px;border-radius:8px;background:linear-gradient(135deg,#ec4899,#f43f5e);border:none;color:#fff;font-weight:900;font-size:12px;cursor:pointer;box-shadow:0 0 14px rgba(236,72,153,0.4);transition:all 0.2s;">${t.dreamBtn}</button>

  <div style="background:#0f172a;border:1px solid rgba(236,72,153,0.15);border-radius:10px;padding:12px;display:flex;flex-direction:column;gap:10px;">
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <span style="font-size:10px;color:#64748b;font-weight:700;text-transform:uppercase;">Synapse Synthesis</span>
      <span id="dream-status-badge" style="font-size:10px;color:#cbd5e1;font-weight:800;">${t.status_idle}</span>
    </div>
    <div style="height:60px;background:#020617;border-radius:8px;border:1px solid rgba(255,255,255,0.04);overflow:hidden;position:relative;">
      <svg id="dream-svg-mesh" style="position:absolute;inset:0;width:100%;height:100%;">
        <!-- Render 4 horizontal/vertical grid synapse points -->
        <circle cx="40" cy="15" r="4" fill="#6366f1" style="transition: all 0.3s;"></circle>
        <circle cx="120" cy="15" r="4" fill="#a78bfa" style="transition: all 0.3s;"></circle>
        <circle cx="200" cy="15" r="4" fill="#f472b6" style="transition: all 0.3s;"></circle>
        
        <circle cx="40" cy="45" r="4" fill="#3b82f6" style="transition: all 0.3s;"></circle>
        <circle cx="120" cy="45" r="4" fill="#10b981" style="transition: all 0.3s;"></circle>
        <circle cx="200" cy="45" r="4" fill="#fbbf24" style="transition: all 0.3s;"></circle>
        
        <!-- Synthesising links -->
        <line x1="40" y1="15" x2="120" y2="45" stroke="rgba(255,255,255,0.06)" stroke-dasharray="2,2" id="dream-synA"></line>
        <line x1="120" y1="15" x2="200" y2="45" stroke="rgba(255,255,255,0.06)" stroke-dasharray="2,2" id="dream-synB"></line>
        <line x1="200" y1="15" x2="120" y2="45" stroke="rgba(255,255,255,0.06)" stroke-dasharray="2,2" id="dream-synC"></line>
      </svg>
    </div>
  </div>

  <div style="background:#0f172a;border:1px solid rgba(255,255,255,0.04);border-radius:10px;padding:12px;height:90px;display:flex;flex-direction:column;gap:8px;">
    <div style="font-size:10px;color:#f472b6;font-weight:800;letter-spacing:0.5px;text-transform:uppercase;">🧬 Genetic Style Crossover Log</div>
    <div id="dream-log" style="flex:1;overflow-y:auto;font-family:JetBrains Mono,monospace;font-size:9.5px;color:#94a3b8;display:flex;flex-direction:column;gap:4px;scrollbar-width:none;">
      <div style="color:#334155;text-align:center;padding-top:15px;">— Waiting to synthesize CSS state —</div>
    </div>
  </div>

  <div style="display:flex;gap:6px;">
    <button onclick="window.dreamInject()" style="flex:1;padding:10px;border-radius:8px;background:#f472b6;border:none;color:#000;font-weight:900;font-size:11px;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.opacity=0.9" onmouseout="this.style.opacity=1">${t.injectBtn}</button>
    <button onclick="window.dreamCopy()" style="flex:1;padding:10px;border-radius:8px;background:#881337;border:none;color:#f472b6;font-weight:900;font-size:11px;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.opacity=0.9" onmouseout="this.style.opacity=1">${t.copyBtn}</button>
  </div>
</div>`;

  window._dreamParentA='glass';
  window._dreamParentB='neon';
  window._dreamRunning=false;
  window._dreamLang=lang;
  window._dreamCSS='';
  
  window.setDreamParent('A','glass');
  window.setDreamParent('B','neon');
};

window.setDreamParent=function(type,key){
  const t=TX[window._dreamLang||'en']||TX.en;
  if(type==='A'){
    window._dreamParentA=key;
    Object.keys(t.themes).forEach(k=>{
      const b=document.getElementById(`dream-parentA-${k}`);
      if(b){
        b.style.background=(k===key)?'rgba(236,72,153,0.18)':'transparent';
        b.style.borderColor=(k===key)?'#f472b6':'rgba(255,255,255,0.08)';
        b.style.color=(k===key)?'#f472b6':'#94a3b8';
      }
    });
  } else {
    window._dreamParentB=key;
    Object.keys(t.themes).forEach(k=>{
      const b=document.getElementById(`dream-parentB-${k}`);
      if(b){
        b.style.background=(k===key)?'rgba(236,72,153,0.18)':'transparent';
        b.style.borderColor=(k===key)?'#f472b6':'rgba(255,255,255,0.08)';
        b.style.color=(k===key)?'#f472b6':'#94a3b8';
      }
    });
  }
};

window.dreamBreed=function(){
  if(window._dreamRunning)return;
  window._dreamRunning=true;
  
  const lang=window._dreamLang||'en';
  const t=TX[lang]||TX.en;
  
  const badge=document.getElementById('dream-status-badge');if(badge)badge.textContent=t.status_running;
  const log=document.getElementById('dream-log');if(log)log.innerHTML='';
  
  const lineA=document.getElementById('dream-synA');
  const lineB=document.getElementById('dream-synB');
  const lineC=document.getElementById('dream-synC');
  
  // Highlight synapses visually
  if(lineA)lineA.setAttribute('stroke','#ec4899');
  if(lineB)lineB.setAttribute('stroke','#8b5cf6');
  if(lineC)lineC.setAttribute('stroke','#0ea5e9');
  
  const breedLogs = [
    { en: 'Synthesizing parent design vector maps...', fr: 'Synthèse des cartes vectorielles parentes...' },
    { en: 'Extracting theme A HSL saturation levels...', fr: 'Extraction de la saturation HSL du style A...' },
    { en: 'Crossover: Blending backing borders & filters...', fr: 'Crossover : Mélange des bordures et filtres de fond...' },
    { en: 'Mutating font typography weight matrix...', fr: 'Mutation de la typographie et de sa graisse...' },
    { en: 'Solving fluid margin layouts under stress...', fr: 'Résolution des marges fluides sous contrainte...' },
    { en: 'Morphed design successfully compiled!', fr: 'Design hybride compilé avec succès !' }
  ];
  
  let currentLogIdx=0;
  
  function step(){
    if(!window._dreamRunning)return;
    
    if(currentLogIdx>=breedLogs.length){
      // Compile CSS
      window.compileMorphedCSS();
      window._dreamRunning=false;
      if(badge)badge.textContent=t.status_done;
      
      // Stop glowing synapses
      if(lineA)lineA.setAttribute('stroke','rgba(255,255,255,0.06)');
      if(lineB)lineB.setAttribute('stroke','rgba(255,255,255,0.06)');
      if(lineC)lineC.setAttribute('stroke','rgba(255,255,255,0.06)');
      return;
    }
    
    const row=document.createElement('div');
    row.style.padding='2px 0';
    row.style.borderBottom='1px solid rgba(255,255,255,0.02)';
    row.textContent=`▶ ${breedLogs[currentLogIdx][lang]}`;
    if(log){
      log.appendChild(row);
      log.scrollTop=log.scrollHeight;
    }
    
    currentLogIdx++;
    setTimeout(step, 500);
  }
  
  step();
};

window.compileMorphedCSS=function(){
  const A=window._dreamParentA;
  const B=window._dreamParentB;
  
  let styles='';
  
  // Custom CSS Generator based on parents
  const themesCSS={
    glass:`
    backdrop-filter: blur(16px) saturate(180%);
    background: rgba(15, 23, 42, 0.7);
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow: 0 8px 32px 0 rgba(0,0,0,0.3);`,
    neon:`
    background: #020617;
    border: 1.5px solid #ec4899;
    box-shadow: 0 0 15px rgba(236,72,153,0.4), inset 0 0 10px rgba(236,72,153,0.2);
    text-shadow: 0 0 6px #f472b6;`,
    brutalist:`
    background: #fff;
    color: #000;
    border: 3px solid #000;
    box-shadow: 6px 6px 0px #000;
    font-weight: 800;`,
    minimal:`
    background: #f5f5f7;
    color: #1d1d1f;
    border: 1px solid rgba(0,0,0,0.05);
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.02);`
  };
  
  const cssA=themesCSS[A];
  const cssB=themesCSS[B];
  
  window._dreamCSS=`
  /* Synthesized Neuro-Symbolic UI Dream Style */
  /* Parent A: ${A} | Parent B: ${B} */
  
  .morphed-card {
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    padding: 24px;
    border-radius: 14px;
    font-family: 'Inter', sans-serif;
    
    /* Crossover Styling Genes */
    ${A===B ? cssA : cssA.trim()+'\n'+cssB.trim()}
  }
  
  .morphed-card:hover {
    transform: translateY(-5px);
  }
  `;
};

window.dreamInject=function(){
  const lang=window._dreamLang||'en';
  const t=TX[lang]||TX.en;
  if(!window._dreamCSS) window.compileMorphedCSS();
  
  const code=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Neuro-Symbolic UI</title>
  <style>
    body {
      background: #020617;
      color: #fff;
      font-family: 'Inter', sans-serif;
      display: flex;
      height: 100vh;
      align-items: center;
      justify-content: center;
      margin: 0;
    }
    
    ${window._dreamCSS}
    
    h3 {
      margin: 0 0 10px 0;
      font-size: 20px;
      font-weight: 900;
      letter-spacing: -0.5px;
    }
    p {
      color: #94a3b8;
      margin: 0;
      font-size: 13px;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div class="morphed-card">
    <h3>🎨 Synthesized Layout</h3>
    <p>This box displays the cross-bred genes of parent CSS models. It combines border formulas, backdrop blur vectors, and box shadow parameters perfectly.</p>
  </div>
</body>
</html>`;

  if(window.editor){
    window.editor.setValue(code);
    if(window.runPreview)window.runPreview();
  }
  if(window.showToast)window.showToast(t.injected);
};

window.dreamCopy=function(){
  const lang=window._dreamLang||'en';
  const t=TX[lang]||TX.en;
  if(!window._dreamCSS) window.compileMorphedCSS();
  navigator.clipboard.writeText(window._dreamCSS).then(()=>{if(window.showToast)window.showToast(t.copied);});
};

const _oa=window.applyLang;
window.applyLang=function(){
  if(typeof _oa==='function')_oa();
  const l=document.getElementById('lbl-tab-uidreamer');
  if(l)l.textContent=gl()==='fr'?'Dreamer d\'UI':'UI Dreamer';
  if(window.activeTab==='uidreamer')window.initUIDreamer(gl());
};

console.log('🎨 UI Dreamer loaded!');
})();
