// ==========================================
// 📐 Grid Builder - CSS Grid Matrix Visual
// IA Architecte - Premium Studio
// ==========================================
(function() {
  const origRenderTab = window.renderTab;
  window.renderTab = function(tab) {
    if (tab !== 'gridbuilder') { if (origRenderTab) origRenderTab(tab); return; }
    window.activeTab = 'gridbuilder';
    document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById('tab-gridbuilder');
    if (btn) btn.classList.add('active');

    const lang = window.appLang || 'en';
    const isFr = lang === 'fr';

    // Default 4x4 grid state
    let rows = 4, cols = 4;
    let cellAreas = []; // which area name each cell belongs to
    let areas = {}; // area name -> color
    let currentArea = '';
    let areaCounter = 0;
    const areaColors = ['#f87171','#fb923c','#fbbf24','#4ade80','#38bdf8','#a78bfa','#f472b6','#34d399'];
    const areaNames = ['header','sidebar','main','footer','hero','nav','aside','section'];
    let isPainting = false;

    function initGrid() {
      cellAreas = Array(rows * cols).fill('');
      areas = {};
      areaCounter = 0;
      currentArea = '';
      renderAll();
    }

    document.getElementById('left-body').innerHTML = `
      <div style="display:flex;flex-direction:column;height:100%;background:linear-gradient(135deg,#1a1005,#0d1a1a);color:#fff;overflow:hidden;">
        <div style="padding:16px 16px 10px;border-bottom:1px solid rgba(251,146,60,0.3);flex-shrink:0;">
          <div style="font-size:15px;font-weight:900;color:#fb923c;">📐 CSS Grid Builder</div>
          <div style="font-size:10px;color:#94a3b8;margin-top:2px;">${isFr ? 'Dessinez votre layout CSS Grid visuellement' : 'Draw your CSS Grid layout visually'}</div>
        </div>
        <div style="flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:12px;">

          <!-- Grid size -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div>
              <div style="font-size:10px;color:#94a3b8;margin-bottom:3px;">${isFr ? 'Colonnes' : 'Columns'}: <span id="lbl-cols">4</span></div>
              <input type="range" id="grid-cols" min="1" max="6" value="4" style="width:100%;accent-color:#fb923c;" oninput="document.getElementById('lbl-cols').innerText=this.value;gridResize()">
            </div>
            <div>
              <div style="font-size:10px;color:#94a3b8;margin-bottom:3px;">${isFr ? 'Lignes' : 'Rows'}: <span id="lbl-rows">4</span></div>
              <input type="range" id="grid-rows" min="1" max="6" value="4" style="width:100%;accent-color:#fb923c;" oninput="document.getElementById('lbl-rows').innerText=this.value;gridResize()">
            </div>
          </div>

          <!-- Area Toolbar -->
          <div>
            <div style="font-size:10px;color:#fb923c;font-weight:bold;margin-bottom:6px;">${isFr ? '1. Créez une Zone, puis peignez sur la grille' : '1. Create a Zone, then paint on the grid'}</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;" id="area-toolbar">
              <button onclick="gridNewArea()" style="padding:6px 10px;background:linear-gradient(90deg,#ea580c,#fb923c);border:none;color:#fff;border-radius:6px;cursor:pointer;font-size:10px;font-weight:bold;">+ ${isFr ? 'Nouvelle Zone' : 'New Zone'}</button>
            </div>
          </div>

          <!-- Visual Grid -->
          <div>
            <div style="font-size:10px;color:#94a3b8;margin-bottom:6px;">${isFr ? '2. Peignez les cellules (clic + glisser)' : '2. Paint cells (click + drag)'}</div>
            <div id="grid-canvas" style="border:1px solid rgba(251,146,60,0.3);border-radius:8px;overflow:hidden;user-select:none;touch-action:none;"></div>
          </div>

          <!-- Actions -->
          <button onclick="gridClear()" style="padding:8px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.4);color:#f87171;border-radius:6px;cursor:pointer;font-size:10px;">🗑 ${isFr ? 'Effacer Tout' : 'Clear All'}</button>

          <!-- CSS Output -->
          <div>
            <div style="font-size:10px;color:#fb923c;font-weight:bold;margin-bottom:4px;">Generated CSS</div>
            <textarea id="grid-css-out" readonly style="width:100%;height:150px;background:rgba(0,0,0,0.5);border:1px solid rgba(251,146,60,0.3);color:#fdba74;font-family:monospace;font-size:9px;padding:8px;border-radius:6px;resize:none;box-sizing:border-box;"></textarea>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <button onclick="gridCopyCss()" style="padding:10px;background:rgba(251,146,60,0.1);border:1px solid #fb923c;color:#fdba74;border-radius:8px;cursor:pointer;font-size:11px;font-weight:bold;">📋 ${isFr ? 'Copier' : 'Copy CSS'}</button>
            <button onclick="gridInject()" style="padding:10px;background:linear-gradient(90deg,#c2410c,#fb923c);border:none;color:#fff;border-radius:8px;cursor:pointer;font-size:11px;font-weight:bold;">⬇️ ${isFr ? 'Injecter' : 'Inject'}</button>
          </div>
        </div>
      </div>`;

    function renderGridCanvas() {
      const canvas = document.getElementById('grid-canvas');
      if (!canvas) return;
      canvas.innerHTML = '';
      canvas.style.display = 'grid';
      canvas.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
      canvas.style.gap = '2px';
      canvas.style.padding = '4px';
      canvas.style.background = '#0f172a';

      for (let i = 0; i < rows * cols; i++) {
        const cell = document.createElement('div');
        const areaName = cellAreas[i];
        const color = areaName && areas[areaName] ? areas[areaName].color : 'rgba(255,255,255,0.05)';
        cell.style.cssText = `height:36px;border-radius:4px;background:${color};border:1px solid rgba(255,255,255,0.1);cursor:crosshair;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:bold;color:rgba(0,0,0,0.7);transition:opacity 0.1s;`;
        cell.textContent = areaName || '';
        cell.dataset.idx = i;

        cell.addEventListener('mousedown', () => { isPainting = true; paintCell(i); });
        cell.addEventListener('mouseenter', () => { if (isPainting) paintCell(i); });
        cell.addEventListener('mouseup', () => { isPainting = false; });

        canvas.appendChild(cell);
      }
      document.addEventListener('mouseup', () => { isPainting = false; });
      generateGridCss();
    }

    function paintCell(idx) {
      if (!currentArea) return;
      cellAreas[idx] = currentArea;
      renderGridCanvas();
    }

    function generateGridCss() {
      const areaNames2D = [];
      for (let r = 0; r < rows; r++) {
        const rowNames = [];
        for (let c = 0; c < cols; c++) {
          rowNames.push(cellAreas[r * cols + c] || '.');
        }
        areaNames2D.push('"' + rowNames.join(' ') + '"');
      }

      const areaList = [...new Set(cellAreas.filter(a => a))];
      const childCss = areaList.map(name => `.${name} { grid-area: ${name}; }`).join('\n');

      const css = `.grid-layout {\n  display: grid;\n  grid-template-columns: repeat(${cols}, 1fr);\n  grid-template-rows: repeat(${rows}, 1fr);\n  grid-template-areas:\n    ${areaNames2D.join('\n    ')};\n  gap: 16px;\n  min-height: 100vh;\n}\n\n${childCss}`;

      const out = document.getElementById('grid-css-out');
      if (out) out.value = css;
    }

    function renderAreaToolbar() {
      const toolbar = document.getElementById('area-toolbar');
      if (!toolbar) return;
      toolbar.innerHTML = `<button onclick="gridNewArea()" style="padding:6px 10px;background:linear-gradient(90deg,#ea580c,#fb923c);border:none;color:#fff;border-radius:6px;cursor:pointer;font-size:10px;font-weight:bold;">+ ${isFr ? 'Nouvelle Zone' : 'New Zone'}</button>`;
      Object.entries(areas).forEach(([name, info]) => {
        const btn = document.createElement('button');
        btn.style.cssText = `padding:6px 10px;background:${info.color};border:2px solid ${currentArea === name ? '#fff' : 'transparent'};color:#000;border-radius:6px;cursor:pointer;font-size:10px;font-weight:bold;`;
        btn.textContent = name;
        btn.onclick = () => { currentArea = name; renderAreaToolbar(); };
        toolbar.appendChild(btn);
      });
    }

    function renderAll() { renderAreaToolbar(); renderGridCanvas(); }

    window.gridNewArea = function() {
      const name = areaNames[areaCounter % areaNames.length] + (areaCounter >= areaNames.length ? Math.floor(areaCounter / areaNames.length) + 1 : '');
      areas[name] = { color: areaColors[areaCounter % areaColors.length] };
      currentArea = name;
      areaCounter++;
      renderAll();
    };

    window.gridResize = function() {
      cols = parseInt(document.getElementById('grid-cols').value);
      rows = parseInt(document.getElementById('grid-rows').value);
      cellAreas = Array(rows * cols).fill('');
      renderAll();
    };

    window.gridClear = function() { cellAreas = Array(rows * cols).fill(''); renderGridCanvas(); };

    window.gridCopyCss = function() {
      navigator.clipboard.writeText(document.getElementById('grid-css-out').value);
      if (window.showToast) window.showToast('CSS Copied!');
    };

    window.gridInject = function() {
      const css = document.getElementById('grid-css-out').value;
      if (!css || !window.editor) return;
      const areaList = [...new Set(cellAreas.filter(a => a))];
      const divs = areaList.map(n => `  <div class="${n}">${n}</div>`).join('\n');
      const snippet = `\n<style>\n${css}\n</style>\n<div class="grid-layout">\n${divs}\n</div>\n`;
      const cur = window.editor.getValue();
      window.editor.setValue(cur.includes('</body>') ? cur.replace('</body>', snippet + '</body>') : cur + snippet);
      if (window.showToast) window.showToast('Grid Injected!');
    };

    setTimeout(initGrid, 50);
  };
})();
