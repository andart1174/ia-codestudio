(function(){
'use strict';
const TX={
  en:{
    title:'QUANTUM STATE DEBUGGER',sub:'Multi-Universe Superposition Runner',
    copied:'Copied!',injected:'Injected!',
    desc:'Debug your application across multiple concurrent parallel universes. Set up quantum fallback loops to guarantee logic completion even if standard physics rules or API calls collapse in one timeline.',
    runBtn:'⚡ Run Superposition',injectBtn:'Inject Quantum Fallback',copyBtn:'Copy Code',
    statusLabel:'Superposition Waveform',
    logTitle:'⚛️ Quantum Chronology Log',
    universeLabel:'Universe Timeline',
    status_idle:'Superposition standing by. Calibrate vectors.',
    status_running:'Collapsing wave function...',
    status_done:'Quantum coherence achieved!',
    healthy:'Running (Coherent)',
    collapsed:'⚠️ Collapse (Error 0x4F)',
    collapsed_desc:'Logic collapsed due to unexpected cosmic ray error.'
  },
  fr:{
    title:'DÉBOGUEUR D\'ÉTAT QUANTIQUE',sub:'Exécuteur de Superposition Multi-Univers',
    copied:'Copié!',injected:'Injecté!',
    desc:'Déboguez votre application à travers plusieurs univers parallèles concurrents. Configurez des boucles de repli quantique pour garantir l\'exécution de votre logique même si la physique ou vos APIs s\'effondrent dans une ligne temporelle.',
    runBtn:'⚡ Lancer la Superposition',injectBtn:'Injecter le Repli Quantique',copyBtn:'Copier le Code',
    statusLabel:'Forme d\'Onde de Superposition',
    logTitle:'⚛️ Chronologie Quantique',
    universeLabel:'Ligne Temporelle Univers',
    status_idle:'Superposition en attente. Calibrez les vecteurs.',
    status_running:'Effondrement de la fonction d\'onde...',
    status_done:'Cohérence quantique atteinte !',
    healthy:'En cours (Cohérent)',
    collapsed:'⚠️ Collapsus (Erreur 0x4F)',
    collapsed_desc:'Effondrement logique causé par une interférence cosmique.'
  }
};

function gl(){return window.appLang||'en';}

const _o=window.renderTab;
window.renderTab=function(tab){
  if(tab==='quantumdebugger'){
    window.activeTab='quantumdebugger';
    document.querySelectorAll('.ltab').forEach(b=>b.classList.remove('active'));
    const b=document.getElementById('tab-quantumdebugger');if(b)b.classList.add('active');
    window.initQuantumDebugger(gl());return;
  }
  if(typeof _o==='function')_o(tab);
};

window.initQuantumDebugger=function(lang){
  const el=document.getElementById('left-body');if(!el)return;
  const t=TX[lang]||TX.en;
  
  el.innerHTML=`
<div style="padding:15px;font-family:Inter,sans-serif;height:100%;box-sizing:border-box;background:#020617;overflow-y:auto;scrollbar-width:thin;display:flex;flex-direction:column;gap:12px;">
  <div style="background:linear-gradient(135deg,rgba(56,189,248,0.12),rgba(14,165,233,0.08));border-radius:14px;padding:16px;border:1px solid rgba(56,189,248,0.35);display:flex;align-items:center;gap:12px;">
    <span style="font-size:32px;filter:drop-shadow(0 0 12px #38bdf8);">⚛️</span>
    <div>
      <h2 style="margin:0;color:#38bdf8;font-size:15px;font-weight:900;">${t.title}</h2>
      <p style="margin:3px 0 0;color:#94a3b8;font-size:10px;">${t.sub}</p>
    </div>
  </div>
  <p style="color:#64748b;font-size:10.5px;margin:0;line-height:1.5;">${t.desc}</p>

  <div style="background:#0f172a;border:1px solid rgba(56,189,248,0.15);border-radius:10px;padding:12px;display:flex;flex-direction:column;gap:10px;">
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <span style="font-size:10px;color:#64748b;font-weight:700;text-transform:uppercase;">${t.statusLabel}</span>
      <span id="quantum-status-badge" style="font-size:10px;color:#cbd5e1;font-weight:800;">${t.status_idle}</span>
    </div>
    
    <!-- 5 Horizontal Neon Universe Timelines -->
    <div style="display:flex;flex-direction:column;gap:8px;" id="quantum-universes-container">
      ${['Alpha-1','Beta-2','Gamma-3','Delta-4','Epsilon-5'].map((name, i) => `
        <div style="background:#020617;border-radius:6px;padding:8px;border:1px solid rgba(255,255,255,0.03);position:relative;overflow:hidden;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;z-index:2;position:relative;">
            <span style="color:#94a3b8;font-size:9.5px;font-weight:800;">🌌 Universe ${name}</span>
            <span id="quantum-state-${i}" style="color:#38bdf8;font-size:9.5px;font-weight:900;">Standby</span>
          </div>
          <div style="height:4px;background:rgba(255,255,255,0.05);border-radius:2px;overflow:hidden;position:relative;">
            <div id="quantum-bar-${i}" style="height:100%;width:100%;background:#38bdf8;transition:all 0.5s;transform:scaleX(0);transform-origin:left;"></div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>

  <button onclick="window.runQuantumSimulation()" id="quantum-trigger" style="width:100%;padding:12px;border-radius:8px;background:linear-gradient(135deg,#38bdf8,#0284c7);border:none;color:#fff;font-weight:900;font-size:12px;cursor:pointer;box-shadow:0 0 14px rgba(56,189,248,0.4);transition:all 0.2s;">${t.runBtn}</button>

  <div style="background:#0f172a;border:1px solid rgba(255,255,255,0.04);border-radius:10px;padding:12px;height:100px;display:flex;flex-direction:column;gap:8px;">
    <div style="font-size:10px;color:#38bdf8;font-weight:800;letter-spacing:0.5px;text-transform:uppercase;">${t.logTitle}</div>
    <div id="quantum-log" style="flex:1;overflow-y:auto;font-family:JetBrains Mono,monospace;font-size:9.5px;color:#94a3b8;display:flex;flex-direction:column;gap:4px;scrollbar-width:none;">
      <div style="color:#334155;text-align:center;padding-top:20px;">— Waiting to observe superposition —</div>
    </div>
  </div>

  <div style="display:flex;gap:6px;">
    <button onclick="window.quantumInject()" style="flex:1;padding:10px;border-radius:8px;background:#38bdf8;border:none;color:#000;font-weight:900;font-size:11px;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.opacity=0.9" onmouseout="this.style.opacity=1">${t.injectBtn}</button>
    <button onclick="window.quantumCopy()" style="flex:1;padding:10px;border-radius:8px;background:#0c4a6e;border:none;color:#38bdf8;font-weight:900;font-size:11px;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.opacity=0.9" onmouseout="this.style.opacity=1">${t.copyBtn}</button>
  </div>
</div>`;

  window._quantumRunning=false;
  window._quantumLang=lang;
  window._quantumCode=window.generateQuantumFallbackScript();
};

window.generateQuantumFallbackScript=function(){
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Quantum Superposition Runner</title>
  <style>
    body {
      background: #020617;
      color: #38bdf8;
      font-family: 'Inter', sans-serif;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      overflow: hidden;
    }
    .harness-panel {
      padding: 24px;
      border-radius: 16px;
      background: rgba(14, 165, 233, 0.05);
      border: 1.5px solid rgba(56, 189, 248, 0.4);
      box-shadow: 0 0 35px rgba(56, 189, 248, 0.15), inset 0 0 15px rgba(56, 189, 248, 0.05);
      width: 90%;
      max-width: 440px;
      box-sizing: border-box;
      backdrop-filter: blur(10px);
    }
    h2 {
      margin: 0 0 8px 0;
      font-size: 16px;
      font-weight: 900;
      color: #38bdf8;
      text-shadow: 0 0 8px rgba(56, 189, 248, 0.5);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    p {
      color: #94a3b8;
      font-size: 10.5px;
      line-height: 1.5;
      margin: 0 0 16px 0;
    }
    .console-box {
      background: #020617;
      border: 1px solid rgba(255,255,255,0.04);
      border-radius: 8px;
      padding: 12px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 9.5px;
      height: 120px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 5px;
      color: #38bdf8;
      scrollbar-width: none;
    }
    .btn {
      width: 100%;
      margin-top: 14px;
      padding: 11px;
      border-radius: 8px;
      border: none;
      background: #38bdf8;
      color: #000;
      font-weight: 800;
      font-size: 11px;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(56, 189, 248, 0.3);
      font-family: sans-serif;
      transition: all 0.2s;
    }
    .btn:active {
      transform: scale(0.98);
    }
  </style>
</head>
<body>
  <div class="harness-panel">
    <h2>⚛️ Quantum Execution Harness</h2>
    <p>This page runs real concurrent promises simulating parallel universe threads. If a timeline collapses due to error or latency, the fallback recovers the logical outcome instantly.</p>
    
    <div class="console-box" id="harness-logs">
      <div style="color: #475569; text-align: center; margin-top: 40px;">— Standing by to run Promise.race fallback —</div>
    </div>
    
    <button class="btn" id="harness-run-btn" onclick="executeHarnessSim()">⚡ Run Fallback Simulation</button>
  </div>

  <script>
    // Asynchronous parallel universe promise racer
    async function executeQuantumSuperposition(actions, timeoutMs = 4000, logCallback) {
      const controller = new AbortController();
      const { signal } = controller;

      const tasks = actions.map((action, index) => {
        return (async () => {
          try {
            logCallback(\`🌌 Universe Q-\${index + 1}: Executing logic pipeline...\`, '#38bdf8');
            const result = await action(signal);
            logCallback(\`✅ Universe Q-\${index + 1}: Stable result achieved!\`, '#4ade80');
            return { index: index + 1, data: result };
          } catch (err) {
            logCallback(\`⚠️ Universe Q-\${index + 1} collapsed: \` + err.message, '#f43f5e');
            throw err;
          }
        })();
      });

      const timelineDecay = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeline Decay: Timeout achieved.")), timeoutMs)
      );

      try {
        const winner = await Promise.race([...tasks, timelineDecay]);
        controller.abort();
        return winner;
      } catch (error) {
        controller.abort();
        throw error;
      }
    }

    function addLog(text, color) {
      const logs = document.getElementById('harness-logs');
      if (logs) {
        if (logs.innerText.includes('Standing by')) {
          logs.innerHTML = '';
        }
        const div = document.createElement('div');
        div.style.color = color || '#38bdf8';
        div.textContent = '▶ ' + text;
        logs.appendChild(div);
        logs.scrollTop = logs.scrollHeight;
      }
    }

    function executeHarnessSim() {
      const btn = document.getElementById('harness-run-btn');
      if (btn) {
        btn.disabled = true;
        btn.style.opacity = '0.6';
      }
      
      const logs = document.getElementById('harness-logs');
      if (logs) logs.innerHTML = '';
      
      addLog('Calibrating quantum timelines...', '#38bdf8');
      
      const actions = [
        async (signal) => new Promise((_, rej) => setTimeout(() => rej(new Error("0x4F Universe Collapse")), 800)),
        async (signal) => new Promise((res) => setTimeout(() => res("Stable Seed Payload"), 1500)),
        async (signal) => new Promise((res) => setTimeout(() => res("Backup Payload Stable"), 2500))
      ];

      setTimeout(() => {
        executeQuantumSuperposition(actions, 4000, addLog)
          .then(winner => {
            addLog(\`🏆 Superposition race won by Universe Q-\${winner.index}!\`, '#4ade80');
            addLog('Aborted trailing timeline execution paths safely.', '#94a3b8');
            if (btn) {
              btn.disabled = false;
              btn.style.opacity = '1';
            }
          })
          .catch(err => {
            addLog(\`❌ Total system collapse: \` + err.message, '#f43f5e');
            if (btn) {
              btn.disabled = false;
              btn.style.opacity = '1';
            }
          });
      }, 500);
    }
  </script>
</body>
</html>`;
};

window.runQuantumSimulation=function(){
  if(window._quantumRunning)return;
  window._quantumRunning=true;
  
  const lang=window._quantumLang||'en';
  const t=TX[lang]||TX.en;
  
  const badge=document.getElementById('quantum-status-badge');if(badge)badge.textContent=t.status_running;
  const log=document.getElementById('quantum-log');if(log)log.innerHTML='';
  
  const universes = [
    { name: 'Alpha-1', delay: 1200, status: 'healthy' },
    { name: 'Beta-2', delay: 2200, status: 'healthy' },
    { name: 'Gamma-3', delay: 1800, status: 'collapsed' },
    { name: 'Delta-4', delay: 3200, status: 'healthy' },
    { name: 'Epsilon-5', delay: 2600, status: 'collapsed' }
  ];

  universes.forEach((univ, i) => {
    const bar = document.getElementById(`quantum-bar-${i}`);
    const state = document.getElementById(`quantum-state-${i}`);
    if(bar) {
      bar.style.transform = 'scaleX(0)';
      bar.style.background = '#38bdf8';
    }
    if(state) {
      state.textContent = 'Spinning up...';
      state.style.color = '#38bdf8';
    }
  });

  const stepLogs = [
    { en: 'Initiating quantum superposition state...', fr: 'Initialisation de la superposition quantique...' },
    { en: 'Universe Alpha-1 executing primary logic pipeline...', fr: 'L\'univers Alpha-1 exécute le pipeline logique principal...' },
    { en: 'Universe Gamma-3 logic collapse detected (Cosmic interference)!', fr: 'Effondrement logique de l\'univers Gamma-3 (Interférence cosmique) !' },
    { en: 'Timeline Gamma-3 error recorded: 0x4F Memory Leak.', fr: 'Erreur temporelle Gamma-3 enregistrée : fuite mémoire 0x4F.' },
    { en: 'Universe Beta-2 reports logical consistency, racing completion...', fr: 'L\'univers Beta-2 signale une cohérence logique, course finale...' },
    { en: 'Universe Epsilon-5 collapsed! Quantum fallback successfully recovered state.', fr: 'L\'univers Epsilon-5 s\'est effondré ! Le repli quantique a récupéré l\'état.' },
    { en: 'Quantum coherent outcome extracted. System stable.', fr: 'Résultat quantique cohérent extrait. Système stable.' }
  ];

  let currentLogIdx=0;
  
  function step(){
    if(!window._quantumRunning)return;
    
    if(currentLogIdx>=stepLogs.length){
      window._quantumRunning=false;
      if(badge)badge.textContent=t.status_done;
      return;
    }
    
    const row=document.createElement('div');
    row.style.padding='2px 0';
    row.style.borderBottom='1px solid rgba(255,255,255,0.02)';
    row.textContent=`▶ ${stepLogs[currentLogIdx][lang]}`;
    if(stepLogs[currentLogIdx].en.includes('collapse') || stepLogs[currentLogIdx].en.includes('collapsed')) {
      row.style.color = '#f43f5e';
    } else if(stepLogs[currentLogIdx].en.includes('stable') || stepLogs[currentLogIdx].en.includes('coherent')) {
      row.style.color = '#4ade80';
    }
    
    if(log){
      log.appendChild(row);
      log.scrollTop=log.scrollHeight;
    }

    // Trigger visual progress and collapses
    if (currentLogIdx === 1) {
      updateUnivUI(0, 0.9, '#38bdf8', 'Coherent');
    } else if (currentLogIdx === 2) {
      updateUnivUI(2, 0.4, '#f43f5e', t.collapsed);
    } else if (currentLogIdx === 4) {
      updateUnivUI(1, 1.0, '#4ade80', 'Stable (Winner)');
      updateUnivUI(3, 0.8, '#38bdf8', 'Coherent');
    } else if (currentLogIdx === 5) {
      updateUnivUI(4, 0.3, '#f43f5e', t.collapsed);
    }

    currentLogIdx++;
    setTimeout(step, 650);
  }

  function updateUnivUI(idx, scale, color, txt) {
    const bar = document.getElementById(`quantum-bar-${idx}`);
    const state = document.getElementById(`quantum-state-${idx}`);
    if(bar) {
      bar.style.transform = `scaleX(${scale})`;
      bar.style.background = color;
    }
    if(state) {
      state.textContent = txt;
      state.style.color = color;
    }
  }
  
  step();
};

window.quantumInject=function(){
  const lang=window._quantumLang||'en';
  const t=TX[lang]||TX.en;
  if(window.editor){
    window.editor.setValue(window._quantumCode);
    if(window.runPreview)window.runPreview();
  }
  if(window.showToast)window.showToast(t.injected);
};

window.quantumCopy=function(){
  const lang=window._quantumLang||'en';
  const t=TX[lang]||TX.en;
  navigator.clipboard.writeText(window._quantumCode).then(()=>{if(window.showToast)window.showToast(t.copied);});
};

const _oa=window.applyLang;
window.applyLang=function(){
  if(typeof _oa==='function')_oa();
  const l=document.getElementById('lbl-tab-quantumdebugger');
  if(l)l.textContent=gl()==='fr'?'Débogueur Quantique':'Quantum Debugger';
  if(window.activeTab==='quantumdebugger')window.initQuantumDebugger(gl());
};

console.log('⚛️ Quantum Debugger loaded!');
})();
