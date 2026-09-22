(function(){
'use strict';

const TX = {
  en: {
    title: 'AESTHETIC GENOME THEME BREEDER',
    sub: 'Genetic UI Evolution & Crossover Laboratory',
    desc: 'Breed premium UI theme "organisms" by crossing styling genomes. Choose two parent phenotypes, adjust mutation entropy, and evolve new styling generations. Injected themes transform Monaco Editor previews into state-of-the-art dashboards.',
    entropyLabel: 'Mutation Entropy (Chaos)',
    evolveBtn: '🧬 Evolve Next Generation',
    injectBtn: 'Infect Monaco with Theme',
    copyBtn: 'Copy Theme CSS',
    parentA: 'Parent Genome Alpha',
    parentB: 'Parent Genome Beta',
    parentEmpty: 'Click any card to select parent',
    logTitle: '🧬 Genetic Crossover Logger',
    copied: 'CSS Theme copied to clipboard!',
    injected: 'Bred Theme CSS injected into Monaco Editor!',
    status_idle: 'Breeding chamber empty. Select parents to start.',
    status_running: 'Mating alleles & splitting chromosomes...',
    status_done: 'New generation successfully synthesized!',
    cardLabelA: 'Parent Alpha',
    cardLabelB: 'Parent Beta',
    cardSetA: 'Set as Parent A',
    cardSetB: 'Set as Parent B',
    cardWinning: 'Select Theme as Winner',
    presets: {
      glass: '🔮 Glassmorphism Preset',
      neon: '⚡ Cyber Neon Preset',
      brutalist: '📦 Neo-Brutalisme Preset',
      minimal: '🍎 Apple Minimal Preset'
    }
  },
  fr: {
    title: 'GÉNÉTIQUE ESTHÉTIQUE DES THÈMES',
    sub: 'Laboratoire de Croisement et d\'Évolution UI',
    desc: 'Élevez des "organismes" de thèmes d\'interface premium en croisant des génomes de style. Choisissez deux phénotypes parents, ajustez l\'entropie de mutation et générez de nouvelles allèles CSS injectables dans Monaco Editor.',
    entropyLabel: 'Entropie de Mutation (Chaos)',
    evolveBtn: '🧬 Croiser la Génération Suivante',
    injectBtn: 'Infecter Monaco avec le Thème',
    copyBtn: 'Copier le Code CSS',
    parentA: 'Génome Parent Alpha',
    parentB: 'Génome Parent Bêta',
    parentEmpty: 'Cliquez sur une carte pour choisir',
    logTitle: '🧬 Journal de Croisement Génétique',
    copied: 'Code CSS copié dans le presse-papiers !',
    injected: 'Thème hybride injecté dans Monaco Editor !',
    status_idle: 'Chambre de croisement en veille. Sélectionnez des parents.',
    status_running: 'Hybridation des allèles et division chromosomique...',
    status_done: 'Nouvelle génération synthétisée avec succès !',
    cardLabelA: 'Parent Alpha',
    cardLabelB: 'Parent Bêta',
    cardSetA: 'Définir comme Parent A',
    cardSetB: 'Définir comme Parent B',
    cardWinning: 'Sélectionner comme Vainqueur',
    presets: {
      glass: '🔮 Préréglage Glassmorphic',
      neon: '⚡ Préréglage Cyber Néon',
      brutalist: '📦 Préréglage Néo-Brutaliste',
      minimal: '🍎 Préréglage Apple Minimal'
    }
  }
};

function gl() { return window.appLang || 'en'; }

const presets = {
  glass: { hueA: 280, hueB: 320, saturation: 80, lightness: 35, borderRadius: 16, glassBlur: 16, bgOpacity: 0.15, neonGlow: 10, fontWeight: 500, borderWidth: 1, speed: 0.35, textShadow: 0 },
  neon: { hueA: 320, hueB: 195, saturation: 95, lightness: 45, borderRadius: 8, glassBlur: 0, bgOpacity: 0.85, neonGlow: 22, fontWeight: 800, borderWidth: 2, speed: 0.25, textShadow: 4 },
  brutalist: { hueA: 50, hueB: 50, saturation: 100, lightness: 85, borderRadius: 0, glassBlur: 0, bgOpacity: 0.95, neonGlow: 0, fontWeight: 900, borderWidth: 3.5, speed: 0.15, textShadow: 0 },
  minimal: { hueA: 210, hueB: 210, saturation: 10, lightness: 96, borderRadius: 24, glassBlur: 20, bgOpacity: 0.6, neonGlow: 4, fontWeight: 400, borderWidth: 0.8, speed: 0.45, textShadow: 0 }
};

// Global breeder state
window._breederState = {
  parentA: JSON.parse(JSON.stringify(presets.glass)),
  parentB: JSON.parse(JSON.stringify(presets.neon)),
  parentAName: 'Glassmorphism',
  parentBName: 'Cyber Neon',
  entropy: 20,
  offspring: [],
  selectedWinnerIdx: 0,
  running: false
};

const _o = window.renderTab;
window.renderTab = function(tab) {
  if (tab === 'themebreeder') {
    window.activeTab = 'themebreeder';
    document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
    const b = document.getElementById('tab-themebreeder');
    if (b) b.classList.add('active');
    window.initThemeBreeder(gl());
    return;
  }
  if (typeof _o === 'function') _o(tab);
};

window.initThemeBreeder = function(lang) {
  const el = document.getElementById('left-body');
  if (!el) return;
  const t = TX[lang] || TX.en;

  el.innerHTML = `
<div style="padding:15px;font-family:Inter,sans-serif;height:100%;box-sizing:border-box;background:#020617;overflow-y:auto;scrollbar-width:thin;display:flex;flex-direction:column;gap:12px;position:relative;">
  
  <!-- Synaptic Canvas Overlay Behind Content -->
  <canvas id="theme-breeder-synapse-canvas" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;"></canvas>

  <!-- Title Panel -->
  <div style="background:linear-gradient(135deg,rgba(236,72,153,0.12),rgba(168,85,247,0.08));border-radius:14px;padding:16px;border:1px solid rgba(236,72,153,0.35);display:flex;align-items:center;gap:12px;position:relative;z-index:2;">
    <span style="font-size:32px;filter:drop-shadow(0 0 12px #f472b6);">🧬</span>
    <div>
      <h2 style="margin:0;color:#f472b6;font-size:14px;font-weight:900;">${t.title}</h2>
      <p style="margin:3px 0 0;color:#94a3b8;font-size:10px;">${t.sub}</p>
    </div>
  </div>
  <p style="color:#64748b;font-size:10px;margin:0;line-height:1.5;position:relative;z-index:2;">${t.desc}</p>

  <!-- Parent Selection Slots -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;position:relative;z-index:2;">
    <!-- Parent A Slot -->
    <div id="slot-parentA" style="background:#0f172a;border:1.5px solid rgba(236,72,153,0.3);border-radius:10px;padding:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;min-height:75px;transition:all 0.3s;box-shadow:0 0 10px rgba(236,72,153,0.05);">
      <div style="font-size:9px;color:#f472b6;font-weight:800;text-transform:uppercase;">🧬 Parent Alpha</div>
      <div id="slot-parentA-ball" style="width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,#ec4899,#8b5cf6);box-shadow:0 0 10px rgba(236,72,153,0.5);"></div>
      <span id="slot-parentA-name" style="color:#e2e8f0;font-size:10px;font-weight:700;">${window._breederState.parentAName}</span>
    </div>

    <!-- Parent B Slot -->
    <div id="slot-parentB" style="background:#0f172a;border:1.5px solid rgba(168,85,247,0.3);border-radius:10px;padding:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;min-height:75px;transition:all 0.3s;box-shadow:0 0 10px rgba(168,85,247,0.05);">
      <div style="font-size:9px;color:#c084fc;font-weight:800;text-transform:uppercase;">🧬 Parent Beta</div>
      <div id="slot-parentB-ball" style="width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,#a78bfa,#3b82f6);box-shadow:0 0 10px rgba(168,85,247,0.5);"></div>
      <span id="slot-parentB-name" style="color:#e2e8f0;font-size:10px;font-weight:700;">${window._breederState.parentBName}</span>
    </div>
  </div>

  <!-- Entropy Config -->
  <div style="background:#0f172a;border:1px solid rgba(255,255,255,0.04);border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:8px;position:relative;z-index:2;">
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <span style="color:#64748b;font-size:9.5px;font-weight:800;text-transform:uppercase;">${t.entropyLabel}</span>
      <span id="breeder-entropy-val" style="color:#f472b6;font-size:11px;font-weight:800;">${window._breederState.entropy}%</span>
    </div>
    <input type="range" id="breeder-entropy-slider" min="0" max="50" value="${window._breederState.entropy}" oninput="window._breederState.entropy=parseInt(this.value);document.getElementById('breeder-entropy-val').innerText=this.value+'%'" style="width:100%;accent-color:#f472b6;cursor:pointer;" />
  </div>

  <!-- Evolve Generation Trigger -->
  <button onclick="window.evolveThemeGeneration()" id="breeder-trigger" style="position:relative;z-index:2;width:100%;padding:12px;border-radius:10px;background:linear-gradient(135deg,#ec4899,#a78bfa);border:none;color:#fff;font-weight:900;font-size:12px;cursor:pointer;box-shadow:0 0 15px rgba(236,72,153,0.35);transition:all 0.2s;">${t.evolveBtn}</button>

  <!-- Dynamic Offspring Phenotype Grid -->
  <div style="display:flex;flex-direction:column;gap:6px;position:relative;z-index:2;">
    <span style="font-size:10px;color:#64748b;font-weight:800;text-transform:uppercase;">Offspring Grid (Real Visual Phenotypes)</span>
    <div id="breeder-offspring-container" style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
      <!-- Renders 4 children cards dynamically -->
    </div>
  </div>

  <!-- Genetic Crossover Logger -->
  <div style="background:#0f172a;border:1px solid rgba(255,255,255,0.04);border-radius:10px;padding:12px;height:120px;display:flex;flex-direction:column;gap:8px;position:relative;z-index:2;">
    <div style="font-size:10px;color:#f472b6;font-weight:800;letter-spacing:0.5px;text-transform:uppercase;">${t.logTitle}</div>
    <div id="breeder-log" style="flex:1;overflow-y:auto;font-family:JetBrains Mono,monospace;font-size:9.5px;color:#94a3b8;display:flex;flex-direction:column;gap:4px;scrollbar-width:none;">
      <div style="color:#334155;text-align:center;padding-top:25px;">— Mating chamber waiting for crossover —</div>
    </div>
  </div>

  <!-- Actions -->
  <div style="display:flex;gap:6px;position:relative;z-index:2;">
    <button onclick="window.breederInject()" style="flex:1.2;padding:11px;border-radius:8px;background:#f472b6;border:none;color:#000;font-weight:900;font-size:11px;cursor:pointer;transition:all 0.2s;box-shadow:0 4px 10px rgba(236,72,153,0.25);" onmouseover="this.style.opacity=0.9" onmouseout="this.style.opacity=1">${t.injectBtn}</button>
    <button onclick="window.breederCopy()" style="flex:1;padding:11px;border-radius:8px;background:#3b0764;border:none;color:#d8b4fe;font-weight:800;font-size:11px;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.opacity=0.9" onmouseout="this.style.opacity=1">${t.copyBtn}</button>
  </div>
</div>`;

  // Start Canvas Synapse rendering loop
  window.initBreederCanvas();

  // Populate first offspring generation if empty
  if (window._breederState.offspring.length === 0) {
    window.evolveThemeGeneration(true); // silent initial load
  } else {
    window.renderBreederOffspring();
  }
};

window.initBreederCanvas = function() {
  const canvas = document.getElementById('theme-breeder-synapse-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  let animParticles = [];

  window._breederTriggerPulse = function(parentASlot, parentBSlot, childElements) {
    animParticles = [];
    const parentA_rect = parentASlot.getBoundingClientRect();
    const parentB_rect = parentBSlot.getBoundingClientRect();
    const canvas_rect = canvas.getBoundingClientRect();

    const startA = {
      x: parentA_rect.left + parentA_rect.width / 2 - canvas_rect.left,
      y: parentA_rect.top + parentA_rect.height / 2 - canvas_rect.top
    };
    const startB = {
      x: parentB_rect.left + parentB_rect.width / 2 - canvas_rect.left,
      y: parentB_rect.top + parentB_rect.height / 2 - canvas_rect.top
    };

    const mergeNode = {
      x: canvas_rect.width / 2,
      y: (startA.y + startB.y) / 2 + 50
    };

    // Spawns pulse vectors traveling to the merging node
    animParticles.push({ sx: startA.x, sy: startA.y, tx: mergeNode.x, ty: mergeNode.y, progress: 0, color: '#ec4899', size: 5, stage: 1 });
    animParticles.push({ sx: startB.x, sy: startB.y, tx: mergeNode.x, ty: mergeNode.y, progress: 0, color: '#a78bfa', size: 5, stage: 1 });

    function tick() {
      ctx.clearRect(0, 0, canvas_rect.width, canvas_rect.height);

      // Draw background static connections
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.beginPath();
      ctx.moveTo(startA.x, startA.y);
      ctx.bezierCurveTo(startA.x, mergeNode.y, mergeNode.x, startA.y, mergeNode.x, mergeNode.y);
      ctx.moveTo(startB.x, startB.y);
      ctx.bezierCurveTo(startB.x, mergeNode.y, mergeNode.x, startB.y, mergeNode.x, mergeNode.y);
      ctx.stroke();

      let activeCount = 0;

      animParticles.forEach((p, idx) => {
        if (p.progress >= 1.0) {
          if (p.stage === 1) {
            p.stage = 2;
            p.progress = 0;
            // Spawn 4 offspring curves from the merge center to child elements
            childElements.forEach((el, cidx) => {
              const el_rect = el.getBoundingClientRect();
              const destX = el_rect.left + el_rect.width / 2 - canvas_rect.left;
              const destY = el_rect.top + el_rect.height / 2 - canvas_rect.top;
              animParticles.push({
                sx: mergeNode.x,
                sy: mergeNode.y,
                tx: destX,
                ty: destY,
                progress: 0,
                color: cidx === window._breederState.selectedWinnerIdx ? '#22c55e' : '#ec4899',
                size: 4,
                stage: 2
              });
            });
            animParticles.splice(idx, 1); // remove parents
          } else {
            // End path
            animParticles.splice(idx, 1);
          }
          return;
        }

        p.progress += p.stage === 1 ? 0.05 : 0.04;
        activeCount++;

        // Interpolate along Quadratic or Linear line
        const cx = p.sx + (p.tx - p.sx) * p.progress;
        const cy = p.sy + (p.ty - p.sy) * p.progress;

        // Draw glowing particle
        ctx.beginPath();
        ctx.arc(cx, cy, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      if (activeCount > 0) {
        requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, canvas_rect.width, canvas_rect.height);
      }
    }

    tick();
  };
};

window.evolveThemeGeneration = function(silent = false) {
  if (window._breederState.running) return;
  window._breederState.running = true;

  const lang = gl();
  const t = TX[lang] || TX.en;

  const log = document.getElementById('breeder-log');
  if (log && !silent) {
    log.innerHTML = '';
  }

  // Algorithm: crossover parent A & B + mutation offsets
  const A = window._breederState.parentA;
  const B = window._breederState.parentB;
  const ent = window._breederState.entropy;

  const nextOffspring = [];

  // Child 0: Uniform blend (Balanced mix)
  nextOffspring.push(window.breederCrossover(A, B, ent, 0.5));
  // Child 1: Weighted heavily towards A
  nextOffspring.push(window.breederCrossover(A, B, ent, 0.25));
  // Child 2: Weighted heavily towards B
  nextOffspring.push(window.breederCrossover(A, B, ent, 0.75));
  // Child 3: Heavy wildcard mutation (Genetic drift)
  nextOffspring.push(window.breederCrossover(A, B, Math.min(ent * 2, 80), 0.5));

  window._breederState.offspring = nextOffspring;
  window._breederState.selectedWinnerIdx = 0;

  if (silent) {
    window._breederState.running = false;
    window.renderBreederOffspring();
    return;
  }

  // Trigger animations and synaptic pulses
  const parentA_slot = document.getElementById('slot-parentA');
  const parentB_slot = document.getElementById('slot-parentB');
  const trigger = document.getElementById('breeder-trigger');

  if (trigger) {
    trigger.textContent = t.status_running;
    trigger.style.pointerEvents = 'none';
  }

  const logs = [
    { en: 'Loading Parent CSS allele vectors...', fr: 'Chargement des vecteurs d\'allèles parents...' },
    { en: 'Crossing chromatin fibers at center locus...', fr: 'Croisement des fibres de chromatine...' },
    { en: 'Applying weighted mutation filters (entropy active)...', fr: 'Application des filtres de mutation (entropie active)...' },
    { en: 'Computing offspring visual phenotypes...', fr: 'Calcul des phénotypes visuels de la génération...' },
    { en: 'Offspring synth success! Select winning style.', fr: 'Synthèse accomplie ! Sélectionnez le style vainqueur.' }
  ];

  let logIdx = 0;
  function logStep() {
    if (logIdx >= logs.length) {
      window._breederState.running = false;
      if (trigger) {
        trigger.textContent = t.evolveBtn;
        trigger.style.pointerEvents = 'all';
      }
      window.renderBreederOffspring();

      // Synapse canvas animation
      const children_elements = document.querySelectorAll('.breeder-child-card');
      if (parentA_slot && parentB_slot && children_elements.length > 0) {
        window._breederTriggerPulse(parentA_slot, parentB_slot, Array.from(children_elements));
      }
      return;
    }

    const div = document.createElement('div');
    div.style.padding = '1px 0';
    div.style.borderBottom = '1px solid rgba(255,255,255,0.01)';
    div.textContent = `▶ ${logs[logIdx][lang]}`;
    if (logIdx === 4) {
      div.style.color = '#4ade80';
    } else if (logIdx === 2) {
      div.style.color = '#fbbf24';
    }
    
    if (log) {
      log.appendChild(div);
      log.scrollTop = log.scrollHeight;
    }
    logIdx++;
    setTimeout(logStep, 250);
  }

  logStep();
};

window.breederCrossover = function(parentA, parentB, entropy, weight = 0.5) {
  const child = {};
  const keys = ['hueA', 'hueB', 'saturation', 'lightness', 'borderRadius', 'glassBlur', 'bgOpacity', 'neonGlow', 'fontWeight', 'borderWidth', 'speed', 'textShadow'];
  
  keys.forEach(k => {
    let val;
    const r = Math.random();
    if (r < (weight - 0.1)) {
      val = parentA[k];
    } else if (r < (weight + 0.1)) {
      val = parentB[k];
    } else {
      // Linear interpolation
      val = parentA[k] * (1 - weight) + parentB[k] * weight;
    }
    
    // Mutation step
    if (Math.random() < 0.6) {
      const limits = {
        hueA: [0, 360], hueB: [0, 360],
        saturation: [40, 100], lightness: [15, 60],
        borderRadius: [0, 30], glassBlur: [0, 25],
        bgOpacity: [0.05, 0.85], neonGlow: [0, 30],
        fontWeight: [300, 900], borderWidth: [0.5, 4],
        speed: [0.1, 0.8], textShadow: [0, 8]
      };
      
      const range = limits[k][1] - limits[k][0];
      const maxMutation = range * (entropy / 100);
      const delta = (Math.random() * 2 - 1) * maxMutation;
      val += delta;
      
      // Clamp
      val = Math.max(limits[k][0], Math.min(limits[k][1], val));
    }
    
    // Round logically
    if (k === 'fontWeight') {
      child[k] = Math.round(val / 100) * 100;
    } else if (['hueA', 'hueB', 'saturation', 'lightness', 'borderRadius', 'glassBlur', 'neonGlow', 'textShadow'].includes(k)) {
      child[k] = Math.round(val);
    } else {
      child[k] = parseFloat(val.toFixed(2));
    }
  });
  
  return child;
};

window.renderBreederOffspring = function() {
  const container = document.getElementById('breeder-offspring-container');
  if (!container) return;
  container.innerHTML = '';

  const names = ['Aero-Glow #01', 'Quantum-Edge #14', 'Brutal-Force #49', 'Wild-Drift #92'];
  const t = TX[gl()] || TX.en;

  window._breederState.offspring.forEach((g, idx) => {
    const isWinner = idx === window._breederState.selectedWinnerIdx;
    
    const card = document.createElement('div');
    card.className = 'breeder-child-card';
    card.id = `breeder-child-${idx}`;
    card.setAttribute('style', `
      --hueA: ${g.hueA};
      --hueB: ${g.hueB};
      --sat: ${g.saturation}%;
      --light: ${g.lightness}%;
      --radius: ${g.borderRadius}px;
      --blur: ${g.glassBlur}px;
      --opacity: ${g.bgOpacity};
      --glow: ${g.neonGlow}px;
      --fontW: ${g.fontWeight};
      --borderW: ${g.borderWidth}px;
      --speed: ${g.speed}s;
      --tshadow: ${g.textShadow}px;
      cursor: pointer;
      box-sizing: border-box;
      transition: all var(--speed) ease;
      border-radius: var(--radius);
      border: var(--borderW) solid ${isWinner ? '#22c55e' : 'hsl(var(--hueA), var(--sat), var(--light))'};
      backdrop-filter: blur(var(--blur));
      background: hsla(var(--hueA), var(--sat), 8%, var(--opacity));
      box-shadow: ${isWinner ? '0 0 16px rgba(34, 197, 94, 0.45)' : '0 0 var(--glow) hsla(var(--hueA), var(--sat), var(--light), 0.25)'};
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      position: relative;
      overflow: hidden;
      min-height: 125px;
    `);

    // Inner details demonstrating font weighting, gradients
    card.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;width:100%;">
        <span style="font-size:9.5px;color:#cbd5e1;font-weight:800;font-family:sans-serif;">${names[idx]}</span>
        ${isWinner ? '<span style="font-size:9px;color:#22c55e;font-weight:900;">👑 WINNER</span>' : ''}
      </div>
      <div style="flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:3px;text-align:center;">
        <span style="font-size:12px;font-weight:var(--fontW);color:hsl(var(--hueB),var(--sat),var(--light));text-shadow:0 0 var(--tshadow) hsla(var(--hueB),var(--sat),var(--light),0.5);">GENOME CSS</span>
        <span style="font-size:8px;color:#64748b;font-family:monospace;">H:${g.hueA} R:${g.borderRadius}</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;width:100%;z-index:3;">
        <button onclick="event.stopPropagation();window.setBreederParent('A',${idx},'${names[idx]}')" style="padding:4px 0;background:rgba(236,72,153,0.15);border:1px solid rgba(236,72,153,0.3);border-radius:4px;color:#f472b6;font-size:7.5px;font-weight:800;cursor:pointer;">Parent A</button>
        <button onclick="event.stopPropagation();window.setBreederParent('B',${idx},'${names[idx]}')" style="padding:4px 0;background:rgba(168,85,247,0.15);border:1px solid rgba(168,85,247,0.3);border-radius:4px;color:#d8b4fe;font-size:7.5px;font-weight:800;cursor:pointer;">Parent B</button>
      </div>
    `;

    card.onclick = function() {
      window._breederState.selectedWinnerIdx = idx;
      window.renderBreederOffspring();
    };

    container.appendChild(card);
  });
};

window.setBreederParent = function(slot, offspringIdx, originalName) {
  const g = window._breederState.offspring[offspringIdx];
  const targetObj = JSON.parse(JSON.stringify(g));

  const log = document.getElementById('breeder-log');

  if (slot === 'A') {
    window._breederState.parentA = targetObj;
    window._breederState.parentAName = originalName;
    const nameEl = document.getElementById('slot-parentA-name');
    if (nameEl) nameEl.textContent = originalName;
    
    // update preview slot circle styling
    const ball = document.getElementById('slot-parentA-ball');
    if (ball) {
      ball.style.background = `linear-gradient(135deg, hsl(${g.hueA}, ${g.saturation}%, ${g.lightness}%), hsl(${g.hueB}, ${g.saturation}%, ${g.lightness}%))`;
      ball.style.borderRadius = `${g.borderRadius}px`;
      ball.style.boxShadow = `0 0 10px hsla(${g.hueA}, ${g.saturation}%, ${g.lightness}%, 0.5)`;
    }

    if (log) {
      const row = document.createElement('div');
      row.style.color = '#ec4899';
      row.textContent = `🧬 Parent Alpha updated to: ${originalName}`;
      log.appendChild(row);
      log.scrollTop = log.scrollHeight;
    }
  } else {
    window._breederState.parentB = targetObj;
    window._breederState.parentBName = originalName;
    const nameEl = document.getElementById('slot-parentB-name');
    if (nameEl) nameEl.textContent = originalName;

    const ball = document.getElementById('slot-parentB-ball');
    if (ball) {
      ball.style.background = `linear-gradient(135deg, hsl(${g.hueA}, ${g.saturation}%, ${g.lightness}%), hsl(${g.hueB}, ${g.saturation}%, ${g.lightness}%))`;
      ball.style.borderRadius = `${g.borderRadius}px`;
      ball.style.boxShadow = `0 0 10px hsla(${g.hueA}, ${g.saturation}%, ${g.lightness}%, 0.5)`;
    }

    if (log) {
      const row = document.createElement('div');
      row.style.color = '#c084fc';
      row.textContent = `🧬 Parent Beta updated to: ${originalName}`;
      log.appendChild(row);
      log.scrollTop = log.scrollHeight;
    }
  }
};

window.breederInject = function() {
  const winnerG = window._breederState.offspring[window._breederState.selectedWinnerIdx];
  if (!winnerG) return;

  const t = TX[gl()] || TX.en;

  const cssText = window.genomeToCSSText(winnerG);
  const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Aesthetic Genome UI System</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    body {
      background: #020617;
      color: #fff;
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }

    ${cssText}

    .demo-container {
      width: 90%;
      max-width: 480px;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .showcase-header {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .badge {
      font-size: 9px;
      font-weight: 800;
      text-transform: uppercase;
      padding: 3px 8px;
      border-radius: 9999px;
      background: hsla(var(--hueA), var(--saturation), var(--lightness), 0.2);
      border: 1px solid hsl(var(--hueA), var(--saturation), var(--lightness));
      color: hsl(var(--hueB), var(--saturation), var(--lightness));
      box-shadow: 0 0 10px hsla(var(--hueB), var(--saturation), var(--lightness), 0.2);
    }

    .btn {
      width: 100%;
      padding: 12px;
      border: none;
      font-weight: 800;
      font-size: 12px;
      font-family: inherit;
      cursor: pointer;
      outline: none;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all var(--anim-speed) ease;
    }
  </style>
</head>
<body>
  <div class="demo-container">
    <div class="showcase-header">
      <span style="font-size: 24px;">🧬</span>
      <div>
        <h2 style="margin: 0; font-size: 15px; font-weight: 900; color: hsl(var(--hueA), var(--saturation), var(--lightness)); text-shadow: 0 0 var(--txt-shadow) hsl(var(--hueA), var(--saturation), var(--lightness));">Bred UI Organism Showcase</h2>
        <p style="margin: 2px 0 0; font-size: 10.5px; color: #64748b;">Generated via Aesthetic Crossover Algorithm</p>
      </div>
    </div>

    <!-- The Morphed Card Phenotype -->
    <div class="morphed-genome-card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <span style="font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase;">Active Alleles</span>
        <span class="badge">BRED-V41</span>
      </div>
      <h3 style="margin: 0 0 6px 0; font-size: 18px; font-weight: var(--font-weight); color: #fff;">Premium Component</h3>
      <p style="margin: 0; font-size: 12px; color: #94a3b8; line-height: 1.5; font-weight: 400;">
        This custom interface component live-renders styling genes cross-bred dynamically inside the genetic breeder tab. Click the interactive action button below to trigger dynamic micro-animations.
      </p>
    </div>

    <!-- Primary Trigger Button Phenotype -->
    <button class="btn morphed-genome-card" onclick="alert('Genetic Theme System Active!')">
      ⚡ Execute Genome Operations
    </button>
  </div>
</body>
</html>`;

  if (window.editor) {
    window.editor.setValue(htmlTemplate);
    if (window.runPreview) window.runPreview();
  }
  if (window.showToast) window.showToast(t.injected);
};

window.breederCopy = function() {
  const winnerG = window._breederState.offspring[window._breederState.selectedWinnerIdx];
  if (!winnerG) return;

  const t = TX[gl()] || TX.en;
  const cssText = window.genomeToCSSText(winnerG);

  navigator.clipboard.writeText(cssText).then(() => {
    if (window.showToast) window.showToast(t.copied);
  });
};

window.genomeToCSSText = function(g) {
  return `
    /* Aesthetic Genome Bred CSS Tokens */
    :root {
      --hueA: ${g.hueA};
      --hueB: ${g.hueB};
      --saturation: ${g.saturation}%;
      --lightness: ${g.lightness}%;
      --border-radius: ${g.borderRadius}px;
      --glass-blur: ${g.glassBlur}px;
      --bg-opacity: ${g.bgOpacity};
      --neon-glow: ${g.neonGlow}px;
      --font-weight: ${g.fontWeight};
      --border-width: ${g.borderWidth}px;
      --anim-speed: ${g.speed}s;
      --txt-shadow: ${g.textShadow}px;
    }

    .morphed-genome-card {
      box-sizing: border-box;
      border-radius: var(--border-radius);
      border: var(--border-width) solid hsl(var(--hueA), var(--saturation), var(--lightness));
      backdrop-filter: blur(var(--glass-blur));
      -webkit-backdrop-filter: blur(var(--glass-blur));
      background: hsla(var(--hueA), var(--saturation), 10%, var(--bg-opacity));
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4), 0 0 var(--neon-glow) hsla(var(--hueA), var(--saturation), var(--lightness), 0.25);
      transition: all var(--anim-speed) cubic-bezier(0.16, 1, 0.3, 1);
      color: #fff;
    }

    .morphed-genome-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5), 0 0 calc(var(--neon-glow) * 1.5) hsla(var(--hueB), var(--saturation), var(--lightness), 0.35);
      border-color: hsl(var(--hueB), var(--saturation), var(--lightness));
    }
  `;
};

const _oa = window.applyLang;
window.applyLang = function() {
  if (typeof _oa === 'function') _oa();
  const l = document.getElementById('lbl-tab-themebreeder');
  if (l) l.textContent = gl() === 'fr' ? 'Éleveur Thème' : 'Theme Breeder';
  if (window.activeTab === 'themebreeder') window.initThemeBreeder(gl());
};

console.log('🧬 Theme Breeder loaded!');
})();
