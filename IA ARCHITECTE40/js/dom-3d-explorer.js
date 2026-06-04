// ==========================================
// DOM Metropolis (3D DOM Explorer)
// IA Architecte - Premium Phase 4
// ==========================================

(function() {
  const originalRenderTab = window.renderTab;

  window.renderTab = function(tab) {
    if (tab === 'dom3d') {
      window.activeTab = 'dom3d';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('tab-dom3d');
      if(btn) btn.classList.add('active');

      const content = document.getElementById('left-body');
      
      const lang = window.appLang || 'en';
      const t = {
        title: lang === 'fr' ? 'DOM Metropolis 3D' : 'DOM Metropolis 3D',
        subtitle: lang === 'fr' ? 'Explorez l\'architecture DOM en 3D' : 'Explore the DOM architecture in 3D',
        zSpacing: lang === 'fr' ? 'Espacement Z (Profondeur)' : 'Z-Spacing (Depth)',
        rotX: lang === 'fr' ? 'Rotation X' : 'Rotation X',
        rotY: lang === 'fr' ? 'Rotation Y' : 'Rotation Y',
        enable3D: lang === 'fr' ? '🌆 Activer Vue 3D' : '🌆 Enable 3D View',
        disable3D: lang === 'fr' ? '🔙 Revenir à la normale' : '🔙 Revert to Normal',
        wireframe: lang === 'fr' ? 'Mode Wireframe (Bordures)' : 'Wireframe Mode (Borders)'
      };

      content.innerHTML = `
        <div class="glass-panel" style="display:flex; flex-direction:column; height:100%; color:#fff; background:linear-gradient(135deg, #0f172a, #0c4a6e);">
          
          <!-- Header -->
          <div style="padding:20px; border-bottom:1px solid rgba(255,255,255,0.1);">
            <h2 style="margin:0; font-size:20px; color:#38bdf8; display:flex; align-items:center; gap:10px;">
              🏙️ ${t.title}
            </h2>
            <p style="margin:5px 0 0; color:#94a3b8; font-size:12px;">${t.subtitle}</p>
          </div>

          <!-- Main Layout -->
          <div style="padding:20px; overflow-y:auto; flex:1;">
            
            <div style="background:rgba(0,0,0,0.3); border-radius:12px; padding:15px; margin-bottom:20px; border:1px solid rgba(56,189,248,0.2);">
              <p style="font-size:11px; color:#cbd5e1; margin-top:0; line-height:1.4;">
                ${lang === 'fr' ? 'Cette vue injecte des transformations CSS 3D directement dans l\'aperçu (Live Preview) pour révéler la superposition des calques (z-index) et la structure parent-enfant.' : 'This view injects CSS 3D transforms directly into the Live Preview to reveal layer stacking (z-index) and parent-child structures.'}
              </p>
            </div>

            <!-- Controls -->
            <div style="margin-bottom:20px;">
              <label style="display:flex; justify-content:space-between; font-size:12px; color:#e2e8f0; margin-bottom:8px;">
                ${t.zSpacing} <span id="lbl-zval" style="color:#38bdf8; font-weight:bold;">15px</span>
              </label>
              <input type="range" id="dom3d-z" min="0" max="50" value="15" style="width:100%; accent-color:#38bdf8;" oninput="document.getElementById('lbl-zval').innerText=this.value+'px'; updateDom3D()">
            </div>

            <div style="margin-bottom:20px;">
              <label style="display:flex; justify-content:space-between; font-size:12px; color:#e2e8f0; margin-bottom:8px;">
                ${t.rotX} <span id="lbl-rxval" style="color:#38bdf8; font-weight:bold;">60°</span>
              </label>
              <input type="range" id="dom3d-rx" min="0" max="90" value="60" style="width:100%; accent-color:#38bdf8;" oninput="document.getElementById('lbl-rxval').innerText=this.value+'°'; updateDom3D()">
            </div>

            <div style="margin-bottom:20px;">
              <label style="display:flex; justify-content:space-between; font-size:12px; color:#e2e8f0; margin-bottom:8px;">
                ${t.rotY} <span id="lbl-ryval" style="color:#38bdf8; font-weight:bold;">0°</span>
              </label>
              <input type="range" id="dom3d-ry" min="-90" max="90" value="0" style="width:100%; accent-color:#38bdf8;" oninput="document.getElementById('lbl-ryval').innerText=this.value+'°'; updateDom3D()">
            </div>

            <div style="margin-bottom:25px;">
              <label style="display:flex; align-items:center; cursor:pointer; font-size:12px; color:#e2e8f0;">
                <input type="checkbox" id="dom3d-wireframe" checked style="margin-right:10px; accent-color:#38bdf8;" onchange="updateDom3D()">
                ${t.wireframe}
              </label>
            </div>

            <button id="btn-toggle-3d" onclick="toggleDom3D()" style="width:100%; background:linear-gradient(90deg, #0ea5e9, #2563eb); color:white; border:none; padding:14px; border-radius:8px; font-weight:bold; cursor:pointer; box-shadow:0 4px 15px rgba(14,165,233,0.3); transition:0.2s;">
              ${t.enable3D}
            </button>
            <button onclick="resetDom3D()" style="width:100%; background:rgba(255,255,255,0.1); color:#cbd5e1; border:1px solid rgba(255,255,255,0.2); padding:10px; border-radius:8px; margin-top:10px; cursor:pointer; font-size:12px; transition:0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">
              ${t.disable3D}
            </button>
          </div>
        </div>
      `;

      window.isDom3DActive = false;

      window.toggleDom3D = function() {
        window.isDom3DActive = !window.isDom3DActive;
        const btn = document.getElementById('btn-toggle-3d');
        if(window.isDom3DActive) {
          btn.style.background = 'linear-gradient(90deg, #ef4444, #b91c1c)';
          btn.style.boxShadow = '0 4px 15px rgba(239,68,68,0.3)';
          btn.innerText = lang === 'fr' ? '🛑 Désactiver 3D' : '🛑 Disable 3D';
          updateDom3D();
        } else {
          btn.style.background = 'linear-gradient(90deg, #0ea5e9, #2563eb)';
          btn.style.boxShadow = '0 4px 15px rgba(14,165,233,0.3)';
          btn.innerText = t.enable3D;
          resetDom3D();
        }
      };

      window.updateDom3D = function() {
        if(!window.isDom3DActive) return;
        
        const z = document.getElementById('dom3d-z').value;
        const rx = document.getElementById('dom3d-rx').value;
        const ry = document.getElementById('dom3d-ry').value;
        const wire = document.getElementById('dom3d-wireframe').checked;

        const iframe = document.getElementById('preview-iframe');
        if(!iframe) return;

        const css = `
          html {
            height: 100%;
            overflow: hidden !important;
            perspective: 3000px !important;
            background: #0f172a radial-gradient(circle at center, #1e293b 0%, #0f172a 100%) !important;
          }
          body {
            transform: rotateX(${rx}deg) rotateY(${ry}deg) !important;
            transform-origin: center 50vh !important;
            transform-style: preserve-3d !important;
            transition: transform 0.5s ease-out !important;
            min-height: 100vh !important;
            background: rgba(255,255,255,0.02) !important;
            border: 2px dashed rgba(56, 189, 248, 0.3) !important;
            box-shadow: 0 0 50px rgba(56, 189, 248, 0.1) !important;
          }
          body div, body section, body header, body footer, body main, body nav, body ul, body form, body article {
            transform-style: preserve-3d !important;
            transform: translateZ(${z}px) !important;
            transition: transform 0.3s ease-out, box-shadow 0.3s !important;
            ${wire ? 'box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.8) !important;' : ''}
            ${wire ? 'background-color: rgba(255, 255, 255, 0.1) !important;' : ''}
            ${wire ? 'color: #fff !important;' : ''}
          }
          body div:hover, body section:hover {
            ${wire ? 'box-shadow: 0 0 0 2px rgba(244, 114, 182, 1), 0 10px 30px rgba(244, 114, 182, 0.3) !important;' : ''}
            transform: translateZ(${parseInt(z) + 20}px) scale(1.02) !important;
          }
        `;

        try {
          const doc = iframe.contentWindow.document;
          let style = doc.getElementById('dom3d-style');
          if(!style) {
            style = doc.createElement('style');
            style.id = 'dom3d-style';
            doc.head.appendChild(style);
          }
          style.innerHTML = css;
        } catch(e) {
          console.warn("Cross-origin or iframe not ready.");
        }
      };

      window.resetDom3D = function() {
        window.isDom3DActive = false;
        const iframe = document.getElementById('preview-iframe');
        if(!iframe) return;
        try {
          const doc = iframe.contentWindow.document;
          const style = doc.getElementById('dom3d-style');
          if(style) style.remove();
        } catch(e) {}
      };

      // Cleanup on tab switch
      const tabBtns = document.querySelectorAll('.ltab');
      tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          if (e.currentTarget.getAttribute('data-tab') !== 'dom3d') {
            resetDom3D();
          }
        });
      });

    } else if (originalRenderTab) {
      originalRenderTab(tab);
    }
  };
})();
