// ==========================================
// 🌊 SVG Shaper - Blob & Wave Generator
// IA Architecte - Premium Studio
// ==========================================
(function() {
  const origRenderTab = window.renderTab;
  window.renderTab = function(tab) {
    if (tab !== 'svgshaper') { if (origRenderTab) origRenderTab(tab); return; }
    window.activeTab = 'svgshaper';
    document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById('tab-svgshaper');
    if (btn) btn.classList.add('active');

    const lang = window.appLang || 'en';
    const isFr = lang === 'fr';

    document.getElementById('left-body').innerHTML = `
      <div style="display:flex;flex-direction:column;height:100%;background:linear-gradient(135deg,#022c22,#0d1a2e);color:#fff;overflow:hidden;">
        <div style="padding:16px 16px 10px;border-bottom:1px solid rgba(34,197,94,0.3);flex-shrink:0;">
          <div style="font-size:15px;font-weight:900;color:#4ade80;">🌊 SVG Shaper</div>
          <div style="font-size:10px;color:#94a3b8;margin-top:2px;">${isFr ? 'Générateur de Blobs et Vagues SVG' : 'SVG Blob & Wave Generator'}</div>
        </div>
        <div style="flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:12px;">

          <!-- Mode tabs -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
            <button id="svg-mode-blob" onclick="svgSetMode('blob')" style="padding:9px;border-radius:8px;font-size:11px;font-weight:bold;cursor:pointer;background:rgba(34,197,94,0.2);border:2px solid #22c55e;color:#4ade80;">🫧 Blob</button>
            <button id="svg-mode-wave" onclick="svgSetMode('wave')" style="padding:9px;border-radius:8px;font-size:11px;font-weight:bold;cursor:pointer;background:transparent;border:2px solid #334155;color:#64748b;">🌊 Wave</button>
          </div>

          <!-- Preview -->
          <div style="background:#0f172a;border-radius:12px;overflow:hidden;border:1px solid rgba(34,197,94,0.2);min-height:130px;display:flex;align-items:center;justify-content:center;">
            <div id="svg-preview" style="width:100%;text-align:center;"></div>
          </div>

          <!-- Controls -->
          <div id="svg-controls-blob" style="display:flex;flex-direction:column;gap:8px;">
            <div><div style="display:flex;justify-content:space-between;font-size:10px;color:#94a3b8;margin-bottom:2px;"><span>${isFr ? 'Complexité' : 'Complexity'}</span><span id="lbl-blob-pts">6</span></div>
              <input type="range" id="blob-pts" min="3" max="12" value="6" style="width:100%;accent-color:#22c55e;" oninput="document.getElementById('lbl-blob-pts').innerText=this.value;svgGenerate()"></div>
            <div><div style="display:flex;justify-content:space-between;font-size:10px;color:#94a3b8;margin-bottom:2px;"><span>${isFr ? 'Douceur' : 'Smoothness'}</span><span id="lbl-blob-smooth">0.4</span></div>
              <input type="range" id="blob-smooth" min="0.1" max="0.9" step="0.01" value="0.4" style="width:100%;accent-color:#22c55e;" oninput="document.getElementById('lbl-blob-smooth').innerText=parseFloat(this.value).toFixed(2);svgGenerate()"></div>
            <div style="display:flex;justify-content:space-between;align-items:center;font-size:10px;color:#94a3b8;">
              <span>${isFr ? 'Couleur' : 'Color'}</span>
              <input type="color" id="blob-color" value="#22c55e" oninput="svgGenerate()" style="width:32px;height:24px;border:none;border-radius:4px;cursor:pointer;background:transparent;">
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;font-size:10px;color:#94a3b8;">
              <span>${isFr ? '2ème Couleur (Gradient)' : '2nd Color (Gradient)'}</span>
              <input type="color" id="blob-color2" value="#06b6d4" oninput="svgGenerate()" style="width:32px;height:24px;border:none;border-radius:4px;cursor:pointer;background:transparent;">
            </div>
            <button onclick="svgRandomize()" style="width:100%;padding:8px;background:rgba(34,197,94,0.15);border:1px solid #22c55e;color:#4ade80;border-radius:6px;cursor:pointer;font-size:11px;font-weight:bold;">🎲 ${isFr ? 'Aléatoire' : 'Randomize'}</button>
          </div>

          <div id="svg-controls-wave" style="display:none;flex-direction:column;gap:8px;">
            <div><div style="display:flex;justify-content:space-between;font-size:10px;color:#94a3b8;margin-bottom:2px;"><span>Amplitude</span><span id="lbl-wave-amp">30</span></div>
              <input type="range" id="wave-amp" min="5" max="80" value="30" style="width:100%;accent-color:#22c55e;" oninput="document.getElementById('lbl-wave-amp').innerText=this.value;svgGenerate()"></div>
            <div><div style="display:flex;justify-content:space-between;font-size:10px;color:#94a3b8;margin-bottom:2px;"><span>${isFr ? 'Fréquence' : 'Frequency'}</span><span id="lbl-wave-freq">3</span></div>
              <input type="range" id="wave-freq" min="1" max="8" value="3" style="width:100%;accent-color:#22c55e;" oninput="document.getElementById('lbl-wave-freq').innerText=this.value;svgGenerate()"></div>
            <div style="display:flex;justify-content:space-between;align-items:center;font-size:10px;color:#94a3b8;">
              <span>${isFr ? 'Couleur' : 'Color'}</span>
              <input type="color" id="wave-color" value="#22c55e" oninput="svgGenerate()" style="width:32px;height:24px;border:none;border-radius:4px;cursor:pointer;background:transparent;">
            </div>
          </div>

          <!-- Output -->
          <div>
            <div style="font-size:10px;color:#22c55e;font-weight:bold;margin-bottom:4px;">SVG Code</div>
            <textarea id="svg-code-out" readonly style="width:100%;height:100px;background:rgba(0,0,0,0.5);border:1px solid rgba(34,197,94,0.3);color:#4ade80;font-family:monospace;font-size:9px;padding:8px;border-radius:6px;resize:none;box-sizing:border-box;"></textarea>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <button onclick="svgCopy()" style="padding:10px;background:rgba(34,197,94,0.1);border:1px solid #22c55e;color:#4ade80;border-radius:8px;cursor:pointer;font-size:11px;font-weight:bold;">📋 ${isFr ? 'Copier' : 'Copy SVG'}</button>
            <button onclick="svgInject()" style="padding:10px;background:linear-gradient(90deg,#15803d,#22c55e);border:none;color:#fff;border-radius:8px;cursor:pointer;font-size:11px;font-weight:bold;">⬇️ ${isFr ? 'Injecter' : 'Inject'}</button>
          </div>
        </div>
      </div>`;

    let svgMode = 'blob';

    window.svgSetMode = function(mode) {
      svgMode = mode;
      document.getElementById('svg-controls-blob').style.display = mode === 'blob' ? 'flex' : 'none';
      document.getElementById('svg-controls-wave').style.display = mode === 'wave' ? 'flex' : 'none';
      document.getElementById('svg-mode-blob').style.borderColor = mode === 'blob' ? '#22c55e' : '#334155';
      document.getElementById('svg-mode-blob').style.color = mode === 'blob' ? '#4ade80' : '#64748b';
      document.getElementById('svg-mode-wave').style.borderColor = mode === 'wave' ? '#22c55e' : '#334155';
      document.getElementById('svg-mode-wave').style.color = mode === 'wave' ? '#4ade80' : '#64748b';
      svgGenerate();
    };

    function generateBlob(pts, smooth, color1, color2) {
      const W = 200, H = 150, cx = W/2, cy = H/2;
      const rx = 70, ry = 55;
      const angles = Array.from({length: pts}, (_, i) => (i / pts) * Math.PI * 2);
      const radii  = angles.map(() => 0.7 + Math.random() * 0.6);
      const points = angles.map((a, i) => ({
        x: cx + Math.cos(a) * rx * radii[i],
        y: cy + Math.sin(a) * ry * radii[i]
      }));

      let d = '';
      for (let i = 0; i < points.length; i++) {
        const p0 = points[(i - 1 + points.length) % points.length];
        const p1 = points[i];
        const p2 = points[(i + 1) % points.length];
        const cp1x = p1.x + (p2.x - p0.x) * smooth;
        const cp1y = p1.y + (p2.y - p0.y) * smooth;
        const cp2x = p2.x - (points[(i + 2) % points.length].x - p1.x) * smooth;
        const cp2y = p2.y - (points[(i + 2) % points.length].y - p1.y) * smooth;
        if (i === 0) d += `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} `;
        d += `C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)} `;
      }
      d += 'Z';

      const gid = 'bg' + Math.random().toString(36).substr(2,4);
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <linearGradient id="${gid}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color1}"/>
      <stop offset="100%" style="stop-color:${color2}"/>
    </linearGradient>
  </defs>
  <path d="${d}" fill="url(#${gid})"/>
</svg>`;
    }

    function generateWave(amp, freq, color) {
      const W = 300, H = 100;
      let path = `M 0 ${H} L 0 ${H/2} `;
      for (let x = 0; x <= W; x += 2) {
        const y = H/2 - Math.sin((x / W) * Math.PI * 2 * freq) * amp;
        path += `L ${x} ${y.toFixed(1)} `;
      }
      path += `L ${W} ${H} Z`;
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" preserveAspectRatio="none">
  <path d="${path}" fill="${color}" opacity="0.85"/>
</svg>`;
    }

    window.svgGenerate = function() {
      let svgCode = '';
      if (svgMode === 'blob') {
        const pts = parseInt(document.getElementById('blob-pts').value);
        const smooth = parseFloat(document.getElementById('blob-smooth').value);
        const c1 = document.getElementById('blob-color').value;
        const c2 = document.getElementById('blob-color2').value;
        svgCode = generateBlob(pts, smooth, c1, c2);
      } else {
        const amp  = parseInt(document.getElementById('wave-amp').value);
        const freq = parseInt(document.getElementById('wave-freq').value);
        const color = document.getElementById('wave-color').value;
        svgCode = generateWave(amp, freq, color);
      }
      document.getElementById('svg-preview').innerHTML = svgCode;
      document.getElementById('svg-code-out').value = svgCode;
    };

    window.svgRandomize = function() {
      document.getElementById('blob-pts').value = 3 + Math.floor(Math.random() * 9);
      document.getElementById('lbl-blob-pts').innerText = document.getElementById('blob-pts').value;
      document.getElementById('blob-smooth').value = (0.1 + Math.random() * 0.7).toFixed(2);
      document.getElementById('lbl-blob-smooth').innerText = document.getElementById('blob-smooth').value;
      const rndColor = () => '#' + Math.floor(Math.random()*0xffffff).toString(16).padStart(6,'0');
      document.getElementById('blob-color').value = rndColor();
      document.getElementById('blob-color2').value = rndColor();
      svgGenerate();
    };

    window.svgCopy = function() { navigator.clipboard.writeText(document.getElementById('svg-code-out').value); if(window.showToast) window.showToast('SVG Copied!'); };

    window.svgInject = function() {
      const code = document.getElementById('svg-code-out').value;
      if (!code || !window.editor) return;
      const cur = window.editor.getValue();
      window.editor.setValue(cur.includes('</body>') ? cur.replace('</body>', '\n' + code + '\n</body>') : cur + '\n' + code);
      if (window.showToast) window.showToast('Injected!');
    };

    setTimeout(() => { svgSetMode('blob'); }, 50);
  };
})();
