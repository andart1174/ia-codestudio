// ==========================================
// Asset Vault (WASM Image Compressor & Base64)
// IA Architecte - Premium Phase 4
// ==========================================

(function() {
  const originalRenderTab = window.renderTab;

  window.renderTab = function(tab) {
    if (tab === 'assetvault') {
      window.activeTab = 'assetvault';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('tab-assetvault');
      if(btn) btn.classList.add('active');

      const content = document.getElementById('left-body');
      
      const lang = window.appLang || 'en';
      const t = {
        title: lang === 'fr' ? 'Asset Vault (Base64)' : 'Asset Vault (Base64)',
        subtitle: lang === 'fr' ? 'Compressez et intégrez vos images directement dans le code.' : 'Compress and embed images directly into code.',
        dragDrop: lang === 'fr' ? 'Glissez une image ici ou cliquez' : 'Drag an image here or click',
        quality: lang === 'fr' ? 'Qualité de compression (WebP)' : 'Compression Quality (WebP)',
        resize: lang === 'fr' ? 'Redimensionnement Max (px)' : 'Max Resize (px)',
        compressBtn: lang === 'fr' ? '⚙️ Compresser & Convertir' : '⚙️ Compress & Convert',
        injectHtml: lang === 'fr' ? 'Injecter comme <img>' : 'Inject as <img>',
        injectCss: lang === 'fr' ? 'Injecter comme CSS bg' : 'Inject as CSS bg'
      };

      content.innerHTML = `
        <div class="glass-panel" style="display:flex; flex-direction:column; height:100%; color:#fff; background:linear-gradient(135deg, #422006, #1a2e05);">
          
          <div style="padding:20px; border-bottom:1px solid rgba(255,255,255,0.1);">
            <h2 style="margin:0; font-size:20px; color:#facc15; display:flex; align-items:center; gap:10px;">
              🗜️ ${t.title}
            </h2>
            <p style="margin:5px 0 0; color:#cbd5e1; font-size:12px;">${t.subtitle}</p>
          </div>

          <div style="padding:20px; overflow-y:auto; flex:1;">
            
            <div id="vault-dropzone" style="border:2px dashed rgba(250,204,21,0.4); border-radius:12px; padding:30px 20px; text-align:center; cursor:pointer; background:rgba(0,0,0,0.2); transition:0.3s; margin-bottom:20px;">
              <span style="font-size:30px; display:block; margin-bottom:10px;">🖼️</span>
              <span id="vault-drop-text" style="color:#fde047; font-size:13px; font-weight:bold;">${t.dragDrop}</span>
              <input type="file" id="vault-file" accept="image/*" style="display:none;">
            </div>

            <div style="margin-bottom:15px; display:grid; grid-template-columns:1fr 1fr; gap:10px;">
              <div>
                <label style="display:block; font-size:12px; margin-bottom:5px; color:#a1a1aa;">${t.quality} <span id="lbl-vq">0.7</span></label>
                <input type="range" id="vault-q" min="0.1" max="1" step="0.1" value="0.7" style="width:100%; accent-color:#facc15;" oninput="document.getElementById('lbl-vq').innerText=this.value">
              </div>
              <div>
                <label style="display:block; font-size:12px; margin-bottom:5px; color:#a1a1aa;">${t.resize}</label>
                <input type="number" id="vault-size" value="800" style="width:100%; padding:6px; border-radius:6px; background:rgba(0,0,0,0.3); border:1px solid rgba(250,204,21,0.3); color:white; font-size:12px;">
              </div>
            </div>

            <button id="btn-vault-process" style="width:100%; background:linear-gradient(90deg, #ca8a04, #eab308); color:#000; border:none; padding:12px; border-radius:8px; font-weight:bold; cursor:pointer; box-shadow:0 4px 15px rgba(234,179,8,0.3); transition:0.2s; margin-bottom:20px;">
              ${t.compressBtn}
            </button>

            <div id="vault-result" style="display:none; background:rgba(0,0,0,0.3); padding:15px; border-radius:8px; border:1px solid rgba(255,255,255,0.1);">
              <div style="display:flex; justify-content:space-between; font-size:11px; color:#94a3b8; margin-bottom:10px;">
                <span id="vault-old-size">Old: -</span>
                <span id="vault-new-size" style="color:#4ade80; font-weight:bold;">New: -</span>
              </div>
              <img id="vault-preview" style="max-width:100%; max-height:150px; border-radius:6px; margin-bottom:15px; object-fit:contain; display:block; margin:0 auto 15px;">
              
              <textarea id="vault-base64" readonly style="width:100%; height:60px; background:rgba(0,0,0,0.5); border:1px solid #4ade80; color:#4ade80; font-size:10px; padding:5px; border-radius:4px; margin-bottom:10px; resize:none;"></textarea>
              
              <div style="display:flex; gap:10px;">
                <button onclick="injectVault('img')" style="flex:1; background:rgba(56,189,248,0.2); color:#38bdf8; border:1px solid #38bdf8; padding:8px; border-radius:6px; cursor:pointer; font-size:11px;">${t.injectHtml}</button>
                <button onclick="injectVault('css')" style="flex:1; background:rgba(236,72,153,0.2); color:#f472b6; border:1px solid #f472b6; padding:8px; border-radius:6px; cursor:pointer; font-size:11px;">${t.injectCss}</button>
              </div>
            </div>

          </div>
        </div>
      `;

      // Logic
      let currentFile = null;
      let currentBase64 = null;

      const dz = document.getElementById('vault-dropzone');
      const fi = document.getElementById('vault-file');
      
      dz.addEventListener('click', () => fi.click());
      
      dz.addEventListener('dragover', (e) => {
        e.preventDefault();
        dz.style.background = 'rgba(250,204,21,0.2)';
      });
      dz.addEventListener('dragleave', () => {
        dz.style.background = 'rgba(0,0,0,0.2)';
      });
      dz.addEventListener('drop', (e) => {
        e.preventDefault();
        dz.style.background = 'rgba(0,0,0,0.2)';
        if(e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]);
      });
      fi.addEventListener('change', (e) => {
        if(e.target.files.length > 0) handleFile(e.target.files[0]);
      });

      function handleFile(file) {
        if(!file.type.startsWith('image/')) {
          if(typeof window.showToast === 'function') window.showToast("Please upload an image.", "error");
          return;
        }
        currentFile = file;
        document.getElementById('vault-drop-text').innerText = file.name + ' (' + (file.size/1024).toFixed(1) + ' KB)';
      }

      document.getElementById('btn-vault-process').addEventListener('click', () => {
        if(!currentFile) return;
        
        const q = parseFloat(document.getElementById('vault-q').value);
        const maxS = parseInt(document.getElementById('vault-size').value);
        
        const reader = new FileReader();
        reader.onload = function(e) {
          const img = new Image();
          img.onload = function() {
            const canvas = document.createElement('canvas');
            let w = img.width;
            let h = img.height;
            if(w > maxS) { h *= maxS / w; w = maxS; }
            if(h > maxS) { w *= maxS / h; h = maxS; }
            
            canvas.width = w; canvas.height = h;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, w, h);
            
            const webpData = canvas.toDataURL('image/webp', q);
            currentBase64 = webpData;
            
            document.getElementById('vault-result').style.display = 'block';
            document.getElementById('vault-preview').src = webpData;
            document.getElementById('vault-base64').value = webpData;
            document.getElementById('vault-old-size').innerText = 'Old: ' + (currentFile.size/1024).toFixed(1) + ' KB';
            // approx base64 size back to binary
            const newSize = Math.round((webpData.length - 22) * 3 / 4);
            document.getElementById('vault-new-size').innerText = 'New: ' + (newSize/1024).toFixed(1) + ' KB (WebP)';
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(currentFile);
      });

      window.injectVault = function(type) {
        if(!currentBase64) return;
        if(window.editor) {
          const cur = window.editor.getValue();
          let snippet = '';
          if(type === 'img') {
            snippet = `\n<img src="${currentBase64}" alt="Asset" style="max-width:100%;">\n`;
          } else {
            const cName = 'bg-asset-' + Math.random().toString(36).substr(2,4);
            snippet = `\n<style>\n.${cName} {\n  background-image: url("${currentBase64}");\n  background-size: cover;\n  background-position: center;\n}\n</style>\n<div class="${cName}" style="width:200px; height:200px;"></div>\n`;
          }
          
          if (cur.includes('</body>')) {
             window.editor.setValue(cur.replace('</body>', snippet + '</body>'));
          } else {
             window.editor.setValue(cur + snippet);
          }
          
          if(typeof window.showToast === 'function') window.showToast(lang === 'fr' ? 'Asset injecté!' : 'Asset Injected!');
        }
      };

    } else if (originalRenderTab) {
      originalRenderTab(tab);
    }
  };
})();
