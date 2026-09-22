(function() {
  'use strict';

  const T = {
    en: {
      title: "🧠 Neuro-UX Debugger",
      desc: "Simulate cognitive response, attention span, and stress levels of users interacting with your code structures.",
      metricsTitle: "Neuro-Cognitive Metrics",
      focus: "Focus & Attention",
      stress: "Cognitive Stress",
      load: "Visual Load",
      suggestions: "Neuro-UX Audit Suggestions",
      brainwaves: "Electroencephalogram (EEG) Waves",
      eegAlpha: "Alpha (Calm/Focus)",
      eegBeta: "Beta (Active Stress)",
      eegTheta: "Theta (Learning)",
      statusClean: "🟢 Perfect cognitive flow. Low stress detected.",
      statusWarn: "🟡 High cognitive load! Code contains accessibility/contrast issues.",
      runAudit: "🔍 Audit Layout Cognitive Load",
      auditComplete: "Audit complete!",
      noIssues: "✓ Your layout is clean! Stress metrics resolved."
    },
    fr: {
      title: "🧠 Débugger Neuro-UX",
      desc: "Simulez la réponse cognitive, l'attention et le stress des utilisateurs qui lisent vos structures de code.",
      metricsTitle: "Métriques Neuro-Cognitives",
      focus: "Focus & Attention",
      stress: "Stress Cognitif",
      load: "Charge Visuelle",
      suggestions: "Suggestions d'Audit Neuro-UX",
      brainwaves: "Ondes Électroencéphalogramme (EEG)",
      eegAlpha: "Alpha (Calme/Focus)",
      eegBeta: "Beta (Stress Actif)",
      eegTheta: "Theta (Apprentissage)",
      statusClean: "🟢 Flux cognitif parfait. Stress bas détecté.",
      statusWarn: "🟡 Charge cognitive élevée! Le code contient des soucis d'accessibilité/contraste.",
      runAudit: "🔍 Auditer la Charge Cognitive",
      auditComplete: "Audit terminé !",
      noIssues: "✓ Vos layouts sont propres ! Stress résolu."
    }
  };

  function gl() {
    return window.lang || window.appLang || 'en';
  }

  function t(key) {
    const lang = gl();
    return T[lang] && T[lang][key] ? T[lang][key] : (T['en'][key] || key);
  }

  // 3D Brain Particles Generator
  const brainPoints = [];
  function generateBrainModel() {
    brainPoints.length = 0;
    // Generate left & right hemisphere lobes
    for (let i = 0; i < 220; i++) {
      const angle = Math.random() * Math.PI * 2;
      const u = Math.random() * 2 - 1;
      
      // Make it look like a human brain: ellipsoid with wrinkles
      const r = 42 + Math.sin(angle * 4.5) * 6 + Math.cos(u * Math.PI * 2) * 3;
      
      let x = r * Math.sqrt(1 - u*u) * Math.cos(angle);
      let y = r * u * 1.25;
      let z = r * Math.sqrt(1 - u*u) * Math.sin(angle);
      
      // Separate lobes (temporal indentation)
      if (Math.abs(y) < 15) {
        x *= 0.85;
        z *= 0.85;
      }
      
      brainPoints.push({ x, y, z });
    }
  }
  generateBrainModel();

  // Simulated metrics state
  let focusVal = 82;
  let stressVal = 18;
  let loadVal = 32;
  let suggestionsList = [];
  let animFrameId = null;
  let wavePhase = 0;

  // Code analyzer
  function auditCode() {
    suggestionsList = [];
    const code = window.editor ? window.editor.getValue() : '';
    
    if (!code) {
      stressVal = 15;
      focusVal = 90;
      loadVal = 10;
      return;
    }

    // 1. Accessibility Checks
    if (code.includes('<img') && !code.includes('alt=')) {
      suggestionsList.push(gl() === 'fr' 
        ? "⚠️ Image(s) sans balise 'alt'. Cela bloque l'accessibilité des liseurs d'écran (Stress +15%)." 
        : "⚠️ Image(s) missing 'alt' attribute. Blocks screen-reader accessibility (Stress +15%)."
      );
    }

    // 2. Headings hierarchy
    if (code.includes('<h1>') && code.includes('<h3>') && !code.includes('<h2>')) {
      suggestionsList.push(gl() === 'fr'
        ? "⚠️ Structure de titres incohérente. Saut direct de H1 à H3 (Charge cognitive +10%)."
        : "⚠️ Broken heading hierarchy. Skipped H2 and went straight to H3 (Visual Load +10%)."
      );
    }

    // 3. Inline style bloat
    const styleCount = (code.match(/style\s*=/gi) || []).length;
    if (styleCount > 6) {
      suggestionsList.push(gl() === 'fr'
        ? `⚠️ Trop de styles inline (${styleCount} trouvés). Utilisez des classes CSS pour garder le code propre.`
        : `⚠️ Excessive inline style declarations (${styleCount} found). Use CSS classes instead.`
      );
    }

    // 4. Low Contrast check (heuristic search for bad combinations)
    if (code.includes('color:#94a3b8') && code.includes('background:#0f172a') || code.includes('color:#888')) {
      suggestionsList.push(gl() === 'fr'
        ? "⚠️ Combinaisons de couleurs à faible contraste détectées. Risque de fatigue oculaire."
        : "⚠️ Low-contrast color combinations detected. Risks visual fatigue for users."
      );
    }

    // Adjust metrics based on suggestions
    if (suggestionsList.length > 0) {
      stressVal = Math.min(95, 20 + suggestionsList.length * 20);
      focusVal = Math.max(35, 80 - suggestionsList.length * 15);
      loadVal = Math.min(95, 25 + suggestionsList.length * 18);
    } else {
      stressVal = 15;
      focusVal = 88;
      loadVal = 20;
    }

    updateUiMetrics();
  }

  function updateUiMetrics() {
    const focusEl = document.getElementById('nr-focus-bar');
    const focusValEl = document.getElementById('nr-focus-val');
    if (focusEl && focusValEl) {
      focusEl.style.width = focusVal + '%';
      focusValEl.textContent = focusVal + '%';
    }

    const stressEl = document.getElementById('nr-stress-bar');
    const stressValEl = document.getElementById('nr-stress-val');
    if (stressEl && stressValEl) {
      stressEl.style.width = stressVal + '%';
      stressValEl.textContent = stressVal + '%';
      stressEl.style.background = stressVal > 50 ? 'linear-gradient(90deg, #ef4444, #f97316)' : 'linear-gradient(90deg, #3b82f6, #06b6d4)';
    }

    const loadEl = document.getElementById('nr-load-bar');
    const loadValEl = document.getElementById('nr-load-val');
    if (loadEl && loadValEl) {
      loadEl.style.width = loadVal + '%';
      loadValEl.textContent = loadVal + '%';
    }

    const listEl = document.getElementById('nr-suggestions-list');
    if (listEl) {
      if (suggestionsList.length === 0) {
        listEl.innerHTML = `<div style="color: #34d399; font-size: 11px; font-weight: 700;">${t('noIssues')}</div>`;
      } else {
        listEl.innerHTML = suggestionsList.map(s => `
          <div style="font-size: 11px; background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.15); border-radius: 8px; padding: 10px; color: #f87171; line-height: 1.5; margin-bottom: 8px;">
            ${s}
          </div>
        `).join('');
      }
    }

    const statusEl = document.getElementById('nr-status-state');
    if (statusEl) {
      statusEl.textContent = stressVal > 40 ? t('statusWarn') : t('statusClean');
      statusEl.style.color = stressVal > 40 ? '#f87171' : '#34d399';
    }
  }

  // Visualizer Loops
  function startVisualizerLoop() {
    const brainCanvas = document.getElementById('neuro-brain-canvas');
    const wavesCanvas = document.getElementById('neuro-waves-canvas');
    if (!brainCanvas || !wavesCanvas) return;

    const bCtx = brainCanvas.getContext('2d');
    const wCtx = wavesCanvas.getContext('2d');

    const loop = () => {
      // 1. Draw Rotating 3D Brain
      const bW = brainCanvas.width;
      const bH = brainCanvas.height;
      bCtx.fillStyle = '#0b0f19';
      bCtx.fillRect(0, 0, bW, bH);

      const time = Date.now() * 0.0008;
      const cosY = Math.cos(time);
      const sinY = Math.sin(time);

      const cosX = Math.cos(0.3); // Fixed tilt
      const sinX = Math.sin(0.3);

      // Determine active color depending on stress
      let activeColor = '#60a5fa'; // Blue (Relaxed)
      if (stressVal > 60) {
        activeColor = '#ef4444'; // Red (Stressed)
      } else if (stressVal > 30) {
        activeColor = '#fb923c'; // Orange (Medium Load)
      }

      // Draw connection lines for close points
      bCtx.lineWidth = 0.3;
      bCtx.strokeStyle = activeColor + '1a';
      for(let i=0; i < brainPoints.length; i += 6) {
        const p1 = brainPoints[i];
        for(let j=i+1; j < brainPoints.length; j += 18) {
          const p2 = brainPoints[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y, p1.z - p2.z);
          if (dist < 22) {
            // Transform & Rotate p1
            const x1_r1 = p1.x * cosY - p1.z * sinY;
            const z1_r1 = p1.x * sinY + p1.z * cosY;
            const y1_r2 = p1.y * cosX - z1_r1 * sinX;
            const z1_r2 = p1.y * sinX + z1_r1 * cosX;
            const sc1 = 150 / (150 + z1_r2);
            
            // Transform & Rotate p2
            const x2_r1 = p2.x * cosY - p2.z * sinY;
            const z2_r1 = p2.x * sinY + p2.z * cosY;
            const y2_r2 = p2.y * cosX - z2_r1 * sinX;
            const z2_r2 = p2.y * sinX + z2_r1 * cosX;
            const sc2 = 150 / (150 + z2_r2);

            bCtx.beginPath();
            bCtx.moveTo(bW/2 + x1_r1 * sc1 * 1.5, bH/2 + y1_r2 * sc1 * 1.5);
            bCtx.lineTo(bW/2 + x2_r1 * sc2 * 1.5, bH/2 + y2_r2 * sc2 * 1.5);
            bCtx.stroke();
          }
        }
      }

      // Draw Brain Particles
      brainPoints.forEach(p => {
        // Rotate Y axis
        const x_rotY = p.x * cosY - p.z * sinY;
        const z_rotY = p.x * sinY + p.z * cosY;
        
        // Rotate X axis (pitch tilt)
        const y_rot = p.y * cosX - z_rotY * sinX;
        const z_rot = p.y * sinX + z_rotY * cosX;

        // Perspective scaling factor
        const scale = 140 / (140 + z_rot);
        const screenX = bW / 2 + x_rotY * scale * 1.5;
        const screenY = bH / 2 + y_rot * scale * 1.5;

        // Render point
        bCtx.beginPath();
        bCtx.arc(screenX, screenY, 1.8 * scale, 0, Math.PI * 2);
        bCtx.fillStyle = activeColor;
        bCtx.fill();
      });

      // 2. Draw EEG Waves
      const wW = wavesCanvas.width;
      const wH = wavesCanvas.height;
      wCtx.fillStyle = '#0b0f19';
      wCtx.fillRect(0, 0, wW, wH);

      wavePhase += 0.08;

      const drawWave = (color, freqMult, amp, offset) => {
        wCtx.strokeStyle = color;
        wCtx.lineWidth = 1.5;
        wCtx.beginPath();
        for (let x = 0; x < wW; x++) {
          const y = wH / 2 + offset + Math.sin(x * 0.04 * freqMult + wavePhase) * amp;
          if (x === 0) wCtx.moveTo(x, y);
          else wCtx.lineTo(x, y);
        }
        wCtx.stroke();
      };

      // Alpha: steady, wide waves
      drawWave('#38bdf8', 1, 10 + (100 - focusVal) * 0.15, -20);
      // Beta: high frequency, alert waves
      drawWave('#f472b6', 2.8, 5 + stressVal * 0.28, 5);
      // Theta: slow waves
      drawWave('#34d399', 0.5, 8 + loadVal * 0.1, 25);

      animFrameId = requestAnimationFrame(loop);
    };

    loop();
  }

  // Connect Monaco
  setTimeout(() => {
    if (window.editor) {
      window.editor.onDidChangeModelContent(() => {
        auditCode();
      });
    }
  }, 1000);

  // Render UI
  window.renderNeuroUx = function(container) {
    if (!container) return;

    container.innerHTML = `
      <div style="padding: 10px 4px; font-family: 'Inter', sans-serif; color: #f1f5f9; display: flex; flex-direction: column; gap: 16px;">
        <div>
          <h2 style="font-size: 18px; font-weight: 900; background: linear-gradient(135deg, #a78bfa, #38bdf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0 0 8px 0; display: flex; align-items: center; gap: 10px;">
            ${t('title')}
          </h2>
          <p style="font-size: 12px; color: #94a3b8; line-height: 1.6; margin: 0;">
            ${t('desc')}
          </p>
        </div>

        <!-- 3D Brain & Wave EEG Side-by-Side -->
        <div style="display: flex; flex-direction: column; gap: 14px; background: #0b0f19; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; overflow: hidden; padding: 12px;">
          <canvas id="neuro-brain-canvas" width="340" height="150" style="width: 100%; height: auto; aspect-ratio: 340 / 150; display: block; border-radius: 8px;"></canvas>
          
          <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #64748b; padding: 4px 6px;">
            📊 ${t('brainwaves')}
          </div>
          <canvas id="neuro-waves-canvas" width="340" height="90" style="width: 100%; height: auto; aspect-ratio: 340 / 90; display: block; border-radius: 8px;"></canvas>
        </div>

        <!-- 📋 BCI Cognitive Metrics -->
        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 18px; display: flex; flex-direction: column; gap: 16px;">
          <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em; margin-bottom: 4px;">
            📊 ${t('metricsTitle')}
          </div>

          <!-- Focus bar -->
          <div style="display: flex; flex-direction: column; gap: 6px;">
            <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 600;">
              <span>${t('focus')}</span>
              <span id="nr-focus-val" style="color: #38bdf8;">${focusVal}%</span>
            </div>
            <div style="width: 100%; height: 6px; background: rgba(255, 255, 255, 0.05); border-radius: 3px; overflow: hidden;">
              <div id="nr-focus-bar" style="width: ${focusVal}%; height: 100%; background: linear-gradient(90deg, #38bdf8, #818cf8); transition: width 0.3s;"></div>
            </div>
          </div>

          <!-- Stress bar -->
          <div style="display: flex; flex-direction: column; gap: 6px;">
            <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 600;">
              <span>${t('stress')}</span>
              <span id="nr-stress-val" style="color: #f472b6;">${stressVal}%</span>
            </div>
            <div style="width: 100%; height: 6px; background: rgba(255, 255, 255, 0.05); border-radius: 3px; overflow: hidden;">
              <div id="nr-stress-bar" style="width: ${stressVal}%; height: 100%; background: linear-gradient(90deg, #f472b6, #ef4444); transition: width 0.3s;"></div>
            </div>
          </div>

          <!-- Load bar -->
          <div style="display: flex; flex-direction: column; gap: 6px;">
            <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 600;">
              <span>${t('load')}</span>
              <span id="nr-load-val" style="color: #34d399;">${loadVal}%</span>
            </div>
            <div style="width: 100%; height: 6px; background: rgba(255, 255, 255, 0.05); border-radius: 3px; overflow: hidden;">
              <div id="nr-load-bar" style="width: ${loadVal}%; height: 100%; background: linear-gradient(90deg, #34d399, #059669); transition: width 0.3s;"></div>
            </div>
          </div>
        </div>

        <!-- 📡 Actionable Suggestions & Status -->
        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 18px; display: flex; flex-direction: column; gap: 14px;">
          <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em;">
            📋 ${t('suggestions')}
          </div>
          
          <div id="nr-status-state" style="font-size: 11px; font-weight: 700; margin-bottom: 6px;">-</div>

          <div id="nr-suggestions-list">
            <!-- Dynamically populated -->
          </div>

          <button id="nr-run-audit-btn" class="sm-btn blue-btn" style="width: 100%; font-weight: 800; padding: 10px; margin-top: 6px;">
            ${t('runAudit')}
          </button>
        </div>
      </div>
    `;

    // Hook button
    document.getElementById('nr-run-audit-btn').onclick = function() {
      auditCode();
      if (window.showToast) window.showToast(t('auditComplete'));
    };

    // Cancel existing loop
    if (animFrameId) cancelAnimationFrame(animFrameId);
    // Start animation loop
    setTimeout(startVisualizerLoop, 100);

    // Initial audit
    auditCode();
  };

  // Tab Decorator
  const originalRenderTab = window.renderTab;
  window.renderTab = function(tab) {
    if (tab === 'neuroux') {
      window.renderNeuroUx(document.getElementById('left-body'));
    } else {
      if (originalRenderTab) originalRenderTab(tab);
    }
  };

})();
