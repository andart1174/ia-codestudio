// ==========================================
// 🧊 UI Forge - Glassmorphism & Neumorphism
// IA Architecte - Premium Studio
// ==========================================
(function() {
  const origRenderTab = window.renderTab;
  window.renderTab = function(tab) {
    if (tab !== 'uiforge') { if (origRenderTab) origRenderTab(tab); return; }
    window.activeTab = 'uiforge';
    document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById('tab-uiforge');
    if (btn) btn.classList.add('active');

    const lang = window.appLang || 'en';
    const isFr = lang === 'fr';

    document.getElementById('left-body').innerHTML = `
      <div style="display:flex;flex-direction:column;height:100%;background:linear-gradient(135deg,#1a0533,#0d1b2a);color:#fff;overflow:hidden;">
        <div style="padding:16px 16px 10px;border-bottom:1px solid rgba(168,85,247,0.3);flex-shrink:0;">
          <div style="font-size:15px;font-weight:900;color:#c084fc;">🧊 UI Forge</div>
          <div style="font-size:10px;color:#94a3b8;margin-top:2px;">${isFr ? 'Générateur Glassmorphism & Neumorphism' : 'Glassmorphism & Neumorphism Generator'}</div>
        </div>

        <div style="flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:12px;">

          <!-- Style Mode -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
            <button id="uif-mode-glass" onclick="uifSetMode('glass')" style="padding:10px;border-radius:8px;font-size:11px;font-weight:bold;cursor:pointer;background:linear-gradient(135deg,rgba(255,255,255,0.15),rgba(255,255,255,0.05));border:2px solid #a855f7;color:#c084fc;backdrop-filter:blur(10px);">🧊 Glassmorphism</button>
            <button id="uif-mode-neu" onclick="uifSetMode('neu')" style="padding:10px;border-radius:8px;font-size:11px;font-weight:bold;cursor:pointer;background:#1e293b;border:2px solid #334155;color:#64748b;">🪨 Neumorphism</button>
          </div>

          <!-- Live Preview -->
          <div style="background:linear-gradient(135deg,#667eea,#764ba2);border-radius:12px;padding:20px;min-height:140px;display:flex;align-items:center;justify-content:center;">
            <div id="uif-preview" style="width:180px;height:110px;border-radius:16px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;font-size:13px;font-weight:bold;transition:all 0.3s;background:rgba(255,255,255,0.15);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,0.3);box-shadow:0 8px 32px rgba(0,0,0,0.3);color:#fff;">
              <span style="font-size:24px;">✨</span>
              <span>UI Element</span>
              <div style="width:60px;height:6px;border-radius:3px;background:rgba(255,255,255,0.4);"></div>
            </div>
          </div>

          <!-- Sliders -->
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div id="uif-controls-glass">
              ${slider('uif-blur','Blur (px)','14','0','40','uifUpdate()')}
              ${slider('uif-opacity','Opacity','0.15','0','1','uifUpdate()',true)}
              ${slider('uif-border','Border Opacity','0.3','0','1','uifUpdate()',true)}
              ${slider('uif-radius','Border Radius (px)','16','0','50','uifUpdate()')}
              ${slider('uif-shadow','Shadow Depth','30','0','60','uifUpdate()')}
              ${colorPicker('uif-bg-color','${isFr?"Couleur de fond":"Background Color"}','#667eea')}
            </div>
            <div id="uif-controls-neu" style="display:none;">
              ${slider('uif-neu-radius','Border Radius (px)','20','0','50','uifUpdate()')}
              ${slider('uif-neu-depth','Shadow Depth','20','5','50','uifUpdate()')}
              ${colorPicker('uif-neu-bg','${isFr?"Couleur Base":"Base Color"}','#1e293b')}
            </div>
          </div>

          <!-- Generated CSS -->
          <div>
            <div style="font-size:10px;color:#a855f7;font-weight:bold;margin-bottom:5px;">Generated CSS</div>
            <textarea id="uif-css-out" readonly style="width:100%;height:120px;background:rgba(0,0,0,0.5);border:1px solid rgba(168,85,247,0.4);color:#c084fc;font-family:monospace;font-size:10px;padding:8px;border-radius:6px;resize:none;box-sizing:border-box;"></textarea>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <button onclick="uifCopyCss()" style="padding:10px;background:rgba(168,85,247,0.2);border:1px solid #a855f7;color:#c084fc;border-radius:8px;cursor:pointer;font-size:11px;font-weight:bold;">📋 ${isFr ? 'Copier CSS' : 'Copy CSS'}</button>
            <button onclick="uifInject()" style="padding:10px;background:linear-gradient(90deg,#7c3aed,#a855f7);border:none;color:#fff;border-radius:8px;cursor:pointer;font-size:11px;font-weight:bold;">⬇️ ${isFr ? 'Injecter' : 'Inject'}</button>
          </div>
        </div>
      </div>`;

    function slider(id, label, val, min, max, oninput, isFloat=false) {
      const step = isFloat ? '0.01' : '1';
      return `<div>
        <div style="display:flex;justify-content:space-between;font-size:10px;color:#94a3b8;margin-bottom:3px;">
          <span>${label}</span><span id="lbl-${id}">${val}</span>
        </div>
        <input type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${val}" style="width:100%;accent-color:#a855f7;" oninput="document.getElementById('lbl-${id}').innerText=this.value;${oninput}">
      </div>`;
    }
    function colorPicker(id, label, val) {
      return `<div style="display:flex;justify-content:space-between;align-items:center;font-size:10px;color:#94a3b8;">
        <span>${label}</span>
        <input type="color" id="${id}" value="${val}" oninput="uifUpdate()" style="width:32px;height:24px;border:none;border-radius:4px;cursor:pointer;background:transparent;">
      </div>`;
    }

    let currentMode = 'glass';

    window.uifSetMode = function(mode) {
      currentMode = mode;
      document.getElementById('uif-controls-glass').style.display = mode === 'glass' ? 'flex' : 'none';
      document.getElementById('uif-controls-glass').style.flexDirection = 'column';
      document.getElementById('uif-controls-glass').style.gap = '10px';
      document.getElementById('uif-controls-neu').style.display = mode === 'neu' ? 'flex' : 'none';
      document.getElementById('uif-controls-neu').style.flexDirection = 'column';
      document.getElementById('uif-controls-neu').style.gap = '10px';

      const glassBtn = document.getElementById('uif-mode-glass');
      const neuBtn = document.getElementById('uif-mode-neu');
      if (mode === 'glass') {
        glassBtn.style.border = '2px solid #a855f7'; glassBtn.style.color = '#c084fc';
        neuBtn.style.border = '2px solid #334155'; neuBtn.style.color = '#64748b';
      } else {
        neuBtn.style.border = '2px solid #a855f7'; neuBtn.style.color = '#c084fc';
        glassBtn.style.border = '2px solid #334155'; glassBtn.style.color = '#64748b';
      }
      uifUpdate();
    };

    window.uifUpdate = function() {
      const preview = document.getElementById('uif-preview');
      const out = document.getElementById('uif-css-out');
      if (!preview || !out) return;

      if (currentMode === 'glass') {
        const blur = document.getElementById('uif-blur').value;
        const op = document.getElementById('uif-opacity').value;
        const bop = document.getElementById('uif-border').value;
        const rad = document.getElementById('uif-radius').value;
        const sha = document.getElementById('uif-shadow').value;
        const bg = document.getElementById('uif-bg-color').value;

        const hex2rgb = hex => { const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16); return `${r},${g},${b}`; };
        const rgb = hex2rgb(bg);

        const css = `background: rgba(${rgb}, ${op});
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border-radius: ${rad}px;
border: 1px solid rgba(255, 255, 255, ${bop});
box-shadow: 0 8px ${sha}px rgba(0, 0, 0, 0.37);`;

        preview.style.cssText = `width:180px;height:110px;border-radius:${rad}px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;font-size:13px;font-weight:bold;transition:all 0.3s;background:rgba(${rgb},${op});backdrop-filter:blur(${blur}px);border:1px solid rgba(255,255,255,${bop});box-shadow:0 8px ${sha}px rgba(0,0,0,0.37);color:#fff;`;
        out.value = `.glass-element {\n  ${css}\n}`;

      } else {
        const rad = document.getElementById('uif-neu-radius').value;
        const dep = document.getElementById('uif-neu-depth').value;
        const bgHex = document.getElementById('uif-neu-bg').value;

        const lighten = (hex, amt) => { let r = Math.min(255, parseInt(hex.slice(1,3),16)+amt), g = Math.min(255, parseInt(hex.slice(3,5),16)+amt), b = Math.min(255, parseInt(hex.slice(5,7),16)+amt); return `rgb(${r},${g},${b})`; };
        const darken  = (hex, amt) => { let r = Math.max(0, parseInt(hex.slice(1,3),16)-amt), g = Math.max(0, parseInt(hex.slice(3,5),16)-amt), b = Math.max(0, parseInt(hex.slice(5,7),16)-amt); return `rgb(${r},${g},${b})`; };

        const light = lighten(bgHex, 30);
        const dark  = darken(bgHex, 30);
        const d = parseInt(dep);

        preview.style.cssText = `width:180px;height:110px;border-radius:${rad}px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;font-size:13px;font-weight:bold;transition:all 0.3s;background:${bgHex};box-shadow:${d}px ${d}px ${d*2}px ${dark},-${d}px -${d}px ${d*2}px ${light};color:#94a3b8;`;

        out.value = `.neu-element {\n  background: ${bgHex};\n  border-radius: ${rad}px;\n  box-shadow: ${d}px ${d}px ${d*2}px ${dark},\n              -${d}px -${d}px ${d*2}px ${light};\n}`;
      }
    };

    window.uifCopyCss = function() {
      const txt = document.getElementById('uif-css-out').value;
      navigator.clipboard.writeText(txt);
      if (window.showToast) window.showToast(isFr ? 'CSS Copié!' : 'CSS Copied!');
    };

    window.uifInject = function() {
      const css = document.getElementById('uif-css-out').value;
      if (!css || !window.editor) return;
      const cur = window.editor.getValue();
      const className = currentMode === 'glass' ? 'glass-element' : 'neu-element';
      const snippet = `\n<style>\n${css}\n</style>\n<div class="${className}">\n  <!-- Your content here -->\n</div>\n`;
      window.editor.setValue(cur.includes('</body>') ? cur.replace('</body>', snippet + '</body>') : cur + snippet);
      if (window.showToast) window.showToast(isFr ? 'Injecté dans le code!' : 'Injected into code!');
    };

    // Initial render
    setTimeout(() => { uifSetMode('glass'); }, 50);
  };
})();
