// ==========================================
// WebXR & AR Studio Module
// IA Architecte - Premium Phase 3
// ==========================================

(function() {
  const originalRenderTab = window.renderTab;

  window.renderTab = function(tab) {
    if (tab === 'webxr') {
      window.activeTab = 'webxr';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('tab-webxr');
      if(btn) btn.classList.add('active');

      const content = document.getElementById('left-body');
      
      const lang = window.appLang || 'en';
      const t = {
        title: lang === 'fr' ? 'Studio WebXR & AR' : 'WebXR & AR Studio',
        subtitle: lang === 'fr' ? 'Proiectează modele 3D în AR cu FX' : 'Project 3D models into AR with FX',
        modelUrl: lang === 'fr' ? 'URL Modèle 3D (.glb)' : '3D Model URL (.glb)',
        presets: lang === 'fr' ? 'Modèles Inclus' : 'Included Models',
        config: lang === 'fr' ? 'Configuration AR' : 'AR Configuration',
        autoRotate: lang === 'fr' ? 'Rotation Auto' : 'Auto Rotate',
        shadows: lang === 'fr' ? 'Ombres' : 'Shadows',
        envMap: lang === 'fr' ? 'Environnement HDRI' : 'HDRI Environment',
        scanQr: lang === 'fr' ? 'Scanner pour AR' : 'Scan for AR',
        qrSub: lang === 'fr' ? '(Même réseau WiFi)' : '(Same WiFi network)',
        arBtnTxt: lang === 'fr' ? "Voir dans l'espace" : 'View in your space',
        importBtn: lang === 'fr' ? '📁 Importer .GLB' : '📁 Import .GLB',
        catChars: lang === 'fr' ? 'Personnages' : 'Characters',
        catAnimals: lang === 'fr' ? 'Animaux' : 'Animals',
        catObjects: lang === 'fr' ? 'Objets' : 'Objects',
        catSciFi: lang === 'fr' ? 'Sci-Fi' : 'Sci-Fi',
        injCode: lang === 'fr' ? '💻 Injecter le Code' : '💻 Inject HTML Code',
        injLive: lang === 'fr' ? '👁️ Injecter le Modèle (Live)' : '👁️ Inject Live Model',
        animTitle: lang === 'fr' ? 'Animations du Modèle :' : 'Model Animations :',
        bgTitle: lang === 'fr' ? 'Effets de Fond :' : 'Background Effects :'
      };

      content.innerHTML = `
        <div class="glass-panel" style="display:flex; flex-direction:column; height:100%; color:#fff; background:linear-gradient(135deg, #020617, #0f172a);">
          
          <!-- Header -->
          <div style="padding:15px; border-bottom:1px solid rgba(255,255,255,0.05); display:flex; justify-content:space-between; align-items:center;">
            <div>
              <h2 style="margin:0; font-size:20px; color:#38bdf8; display:flex; align-items:center; gap:8px;">
                🕶️ ${t.title}
              </h2>
              <p style="margin:4px 0 0; color:#94a3b8; font-size:12px;">${t.subtitle}</p>
            </div>
          </div>

          <!-- Main Layout -->
          <div style="display:flex; flex-direction:column; overflow-y:auto; overflow-x:hidden; flex:1;">
            
            <!-- Top Preview Area -->
            <div id="ar-bg-container" style="width:100%; height:260px; min-height:260px; position:relative; background:#000; display:flex; justify-content:center; align-items:center; border-bottom:1px solid rgba(255,255,255,0.05); overflow:hidden;">
              <div id="ar-fx-overlay" style="position:absolute; inset:0; pointer-events:none; z-index:0;"></div>
              
              <div id="ar-preview-container" style="width:100%; height:100%; display:flex; justify-content:center; align-items:center; z-index:1;">
              </div>
              
              <div style="position:absolute; top:10px; right:10px; display:flex; gap:10px; z-index:2;">
                <div style="background:rgba(0,0,0,0.6); backdrop-filter:blur(10px); padding:4px 8px; border-radius:6px; font-size:9px; border:1px solid rgba(255,255,255,0.1); pointer-events:none; color:#4ade80;">
                  ● WebGL Active
                </div>
              </div>
            </div>

            <!-- Controls -->
            <div style="padding:15px;">

              <!-- BG FX Buttons -->
              <div style="margin-bottom:15px;">
                <label style="display:block; margin-bottom:8px; font-weight:bold; color:#cbd5e1; font-size:11px; text-transform:uppercase; letter-spacing:1px;">${t.bgTitle}</label>
                <div style="display:flex; gap:6px; overflow-x:auto; padding-bottom:5px;">
                  <button onclick="setArBg('none')" class="ar-fx-btn">🌌 Void</button>
                  <button onclick="setArBg('cosmos')" class="ar-fx-btn">✨ Cosmos</button>
                  <button onclick="setArBg('storm')" class="ar-fx-btn">⚡ Storm</button>
                  <button onclick="setArBg('rain')" class="ar-fx-btn">🌧️ Rain</button>
                  <button onclick="setArBg('snow')" class="ar-fx-btn">❄️ Snow</button>
                  <button onclick="setArBg('hologram')" class="ar-fx-btn">💠 Hologram</button>
                </div>
              </div>

              <!-- Anim Buttons -->
              <div style="margin-bottom:15px; min-height:50px;">
                <label style="display:block; margin-bottom:8px; font-weight:bold; color:#cbd5e1; font-size:11px; text-transform:uppercase; letter-spacing:1px;">${t.animTitle}</label>
                <div id="ar-anim-buttons" style="display:flex; gap:6px; overflow-x:auto; padding-bottom:5px;">
                  <span style="font-size:11px; color:#64748b; font-style:italic;">Loading animations...</span>
                </div>
              </div>

              <div style="margin-bottom:15px;">
                <label style="display:block; margin-bottom:8px; font-weight:bold; color:#cbd5e1; font-size:11px; text-transform:uppercase; letter-spacing:1px;">${t.presets}</label>
                
                <div style="display:flex; gap:4px; margin-bottom:10px; overflow-x:auto; padding-bottom:5px;">
                  <button class="ar-cat-btn active" onclick="filterArLib('all', this)">All</button>
                  <button class="ar-cat-btn" onclick="filterArLib('char', this)">${t.catChars}</button>
                  <button class="ar-cat-btn" onclick="filterArLib('anim', this)">${t.catAnimals}</button>
                  <button class="ar-cat-btn" onclick="filterArLib('sci', this)">${t.catSciFi}</button>
                </div>

                <div id="ar-model-grid" style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px; max-height:200px; overflow-y:auto; padding-right:4px;">
                  <!-- Characters -->
                  <button class="ar-preset-btn c-char" data-cat="char" onclick="setArModel('https://modelviewer.dev/shared-assets/models/Astronaut.glb')">👨‍🚀 Ast.</button>
                  <button class="ar-preset-btn c-char" data-cat="char" onclick="setArModel('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMan/glTF-Binary/CesiumMan.glb')">🏃 Run.</button>
                  <button class="ar-preset-btn c-char" data-cat="char" onclick="setArModel('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/RiggedFigure/glTF-Binary/RiggedFigure.glb')">🧍 Fig.</button>
                  
                  <!-- Animals -->
                  <button class="ar-preset-btn c-anim" data-cat="anim" onclick="setArModel('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Fox/glTF-Binary/Fox.glb')">🦊 Fox</button>
                  <button class="ar-preset-btn c-anim" data-cat="anim" onclick="setArModel('https://modelviewer.dev/shared-assets/models/Horse.glb')">🐎 Horse</button>
                  <button class="ar-preset-btn c-anim" data-cat="anim" onclick="setArModel('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Flamingo/glTF-Binary/Flamingo.glb')">🦩 Flam.</button>
                  <button class="ar-preset-btn c-anim" data-cat="anim" onclick="setArModel('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb')">🦆 Duck</button>
                  <button class="ar-preset-btn c-anim" data-cat="anim" onclick="setArModel('https://modelviewer.dev/shared-assets/models/Shiba.glb')">🐕 Shiba</button>
                  <button class="ar-preset-btn c-anim" data-cat="anim" onclick="setArModel('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/MosquitoInAmber/glTF-Binary/MosquitoInAmber.glb')">🦟 Insect</button>
                  <button class="ar-preset-btn c-anim" data-cat="anim" onclick="setArModel('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BarramundiFish/glTF-Binary/BarramundiFish.glb')">🐟 Fish</button>
                  
                  <!-- Sci-Fi / Robots -->
                  <button class="ar-preset-btn c-sci" data-cat="sci" onclick="setArModel('https://modelviewer.dev/shared-assets/models/RobotExpressive.glb')">🤖 Robot</button>
                  <button class="ar-preset-btn c-sci" data-cat="sci" onclick="setArModel('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BrainStem/glTF-Binary/BrainStem.glb')">👽 Alien</button>
                  <button class="ar-preset-btn c-sci" data-cat="sci" onclick="setArModel('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/DamagedHelmet/glTF-Binary/DamagedHelmet.glb')">🛡️ Helm.</button>
                  <button class="ar-preset-btn c-sci" data-cat="sci" onclick="setArModel('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SciFiHelmet/glTF-Binary/SciFiHelmet.glb')">🪖 SciFi</button>
                  <button class="ar-preset-btn c-sci" data-cat="sci" onclick="setArModel('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Suzanne/glTF-Binary/Suzanne.glb')">🐵 Suzan.</button>
                  <button class="ar-preset-btn c-sci" data-cat="sci" onclick="setArModel('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxAnimated/glTF-Binary/BoxAnimated.glb')">📦 Box</button>
                  
                  <!-- Objects -->
                  <button class="ar-preset-btn c-obj" data-cat="obj" onclick="setArModel('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb')">👟 Shoe</button>
                  <button class="ar-preset-btn c-obj" data-cat="obj" onclick="setArModel('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/ToyCar/glTF-Binary/ToyCar.glb')">🚗 Car</button>
                  <button class="ar-preset-btn c-obj" data-cat="obj" onclick="setArModel('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Buggy/glTF-Binary/Buggy.glb')">🏎️ Buggy</button>
                  <button class="ar-preset-btn c-obj" data-cat="obj" onclick="setArModel('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/AntiqueCamera/glTF-Binary/AntiqueCamera.glb')">📷 Cam.</button>
                  <button class="ar-preset-btn c-obj" data-cat="obj" onclick="setArModel('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMilkTruck/glTF-Binary/CesiumMilkTruck.glb')">🚐 Truck</button>
                  <button class="ar-preset-btn c-obj" data-cat="obj" onclick="setArModel('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/WaterBottle/glTF-Binary/WaterBottle.glb')">💧 Bottle</button>
                  <button class="ar-preset-btn c-obj" data-cat="obj" onclick="setArModel('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DragonAttenuation/glTF-Binary/DragonAttenuation.glb')">🐉 Dragon</button>
                  <button class="ar-preset-btn c-obj" data-cat="obj" onclick="setArModel('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF-Binary/Avocado.glb')">🥑 Avoc.</button>
                </div>
              </div>

              <!-- Configuration -->
              <div style="margin-bottom:15px; display:flex; gap:15px;">
                <label style="display:flex; align-items:center; cursor:pointer; font-size:11px; color:#cbd5e1;">
                  <input type="checkbox" id="ar-autorotate" checked style="margin-right:6px; accent-color:#38bdf8;" onchange="updateArView()">
                  ${t.autoRotate}
                </label>
                <label style="display:flex; align-items:center; cursor:pointer; font-size:11px; color:#cbd5e1;">
                  <input type="checkbox" id="ar-shadows" checked style="margin-right:6px; accent-color:#38bdf8;" onchange="updateArView()">
                  ${t.shadows}
                </label>
              </div>

              <input type="hidden" id="ar-url" value="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Fox/glTF-Binary/Fox.glb">
              <input type="hidden" id="ar-current-anim" value="">
              <input type="hidden" id="ar-current-bg" value="none">

              <!-- Action Buttons -->
              <div style="display:flex; flex-direction:column; gap:10px; margin-top:20px;">
                <div style="display:flex; gap:10px;">
                  <button onclick="injectArCode()" style="flex:1; background:linear-gradient(90deg, #6366f1, #4f46e5); color:white; border:none; padding:13px; border-radius:8px; font-weight:900; font-size:12px; cursor:pointer; box-shadow:0 4px 15px rgba(99,102,241,0.4); transition:0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                    ${t.injCode}
                  </button>
                  <button onclick="injectArLive()" style="flex:1; background:linear-gradient(90deg, #10b981, #059669); color:white; border:none; padding:13px; border-radius:8px; font-weight:900; font-size:12px; cursor:pointer; box-shadow:0 4px 15px rgba(16,185,129,0.4); transition:0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                    ${t.injLive}
                  </button>
                </div>
                <button onclick="document.getElementById('ar-file-input').click()" style="background:rgba(255,255,255,0.05); color:#94a3b8; border:1px solid rgba(255,255,255,0.1); padding:9px; border-radius:8px; font-weight:bold; font-size:11px; cursor:pointer;">
                  ${t.importBtn}
                </button>
                <input type="file" id="ar-file-input" accept=".glb" style="display:none" onchange="handleArFile(event)">
              </div>

              <!-- QR Codes - Large like originals -->
              <div style="display:flex; gap:12px; margin-top:18px;">
                <!-- QR Live AR -->
                <div style="flex:1; background:rgba(56,189,248,0.08); border:1px solid rgba(56,189,248,0.35); border-radius:14px; padding:14px; text-align:center;">
                  <div style="font-weight:bold; margin-bottom:8px; color:#38bdf8; font-size:12px;">📱 ${lang === 'fr' ? 'Voir en AR' : 'Scan to view in AR'}</div>
                  <div style="background:white; padding:6px; border-radius:8px; display:inline-block;">
                    <img id="ar-qr" src="" alt="QR AR" style="width:130px; height:130px; display:block;">
                  </div>
                  <div id="ar-qr-status" style="font-size:9px; color:#4ade80; margin-top:6px; font-weight:bold;">✅ ${lang === 'fr' ? 'Ouvre directement en AR' : 'Always opens in AR'}</div>
                  <div style="font-size:9px; color:#94a3b8; margin-top:2px;">📱 Android: AR direct · iOS: Share → AR Quick Look</div>
                </div>
                <!-- QR Download Offline -->
                <div style="flex:1; background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.35); border-radius:14px; padding:14px; text-align:center;">
                  <div style="font-weight:bold; margin-bottom:8px; color:#34d399; font-size:12px;">⬇️ ${lang === 'fr' ? 'Télécharger sur téléphone' : 'Download to Phone'}</div>
                  <div style="background:white; padding:6px; border-radius:8px; display:inline-block;">
                    <img id="ar-dl-qr" src="" alt="QR Download" style="width:130px; height:130px; display:block;">
                  </div>
                  <div style="font-size:9px; color:#4ade80; margin-top:6px; font-weight:bold;">✅ ${lang === 'fr' ? 'Fonctionne sans internet' : 'Works without internet'}</div>
                  <div style="font-size:9px; color:#94a3b8; margin-top:2px;">🤖 Google Files → tap → AR · 🍎 Files → Quick Look AR</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      // CSS Styles
      const style = document.createElement('style');
      style.innerHTML = `
        .ar-cat-btn { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#94a3b8; padding:4px 10px; border-radius:12px; font-size:9px; white-space:nowrap; cursor:pointer; font-weight:bold; text-transform:uppercase; transition:0.2s; }
        .ar-cat-btn.active { background:rgba(56,189,248,0.2); border-color:#38bdf8; color:white; }
        
        .ar-fx-btn { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#94a3b8; padding:4px 10px; border-radius:12px; font-size:10px; white-space:nowrap; cursor:pointer; font-weight:bold; transition:0.2s; }
        .ar-fx-btn:hover { border-color:#cbd5e1; color:#fff; }
        .ar-fx-btn.active { background:rgba(139,92,246,0.2); border-color:#a78bfa; color:#fff; box-shadow:0 0 10px rgba(167,139,250,0.3); }

        .ar-anim-btn { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#94a3b8; padding:4px 10px; border-radius:12px; font-size:10px; white-space:nowrap; cursor:pointer; font-weight:bold; transition:0.2s; }
        .ar-anim-btn:hover { border-color:#34d399; color:#fff; }
        .ar-anim-btn.active { background:rgba(16,185,129,0.2); border-color:#34d399; color:#fff; }

        .ar-preset-btn { border:1px solid rgba(255,255,255,0.1); padding:6px; border-radius:6px; cursor:pointer; font-size:10px; font-weight:900; transition:0.2s; text-align:left; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .ar-preset-btn:hover { transform:scale(1.05); }
        .c-char { background:rgba(236,72,153,0.15); color:#f472b6; border-color:rgba(236,72,153,0.3); }
        .c-anim { background:rgba(245,158,11,0.15); color:#fbbf24; border-color:rgba(245,158,11,0.3); }
        .c-sci  { background:rgba(56,189,248,0.15); color:#7dd3fc; border-color:rgba(56,189,248,0.3); }
        .c-obj  { background:rgba(16,185,129,0.15); color:#6ee7b7; border-color:rgba(16,185,129,0.3); }

        /* Background Effects CSS */
        @keyframes stars { 0% { background-position: 0 0; } 100% { background-position: 0 1000px; } }
        .bg-cosmos { background: transparent url('data:image/svg+xml;utf8,<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="1" fill="white"/><circle cx="150" cy="80" r="1.5" fill="white"/><circle cx="80" cy="150" r="0.5" fill="white"/><circle cx="180" cy="180" r="2" fill="white"/></svg>') repeat; animation: stars 20s linear infinite; }
        
        @keyframes rain { 0% { background-position: 0 0; } 100% { background-position: 20px 1000px; } }
        .bg-rain { background: transparent url('data:image/svg+xml;utf8,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><line x1="10" y1="0" x2="5" y2="15" stroke="rgba(255,255,255,0.4)" stroke-width="1"/><line x1="60" y1="40" x2="55" y2="55" stroke="rgba(255,255,255,0.3)" stroke-width="1"/></svg>') repeat; animation: rain 1s linear infinite; }
        
        @keyframes snow { 0% { background-position: 0 0, 0 0; } 100% { background-position: 200px 1000px, -200px 1000px; } }
        .bg-snow { background: transparent url('data:image/svg+xml;utf8,<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="2" fill="white" opacity="0.8"/><circle cx="120" cy="120" r="3" fill="white" opacity="0.6"/></svg>'), transparent url('data:image/svg+xml;utf8,<svg width="150" height="150" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="60" r="1.5" fill="white" opacity="0.9"/><circle cx="100" cy="30" r="2.5" fill="white" opacity="0.7"/></svg>'); animation: snow 10s linear infinite; }

        @keyframes stormFlash { 0%, 95%, 100% { background-color: transparent; } 96%, 98% { background-color: rgba(255,255,255,0.2); } }
        .bg-storm { background: transparent url('data:image/svg+xml;utf8,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><line x1="10" y1="0" x2="5" y2="20" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/><line x1="60" y1="40" x2="55" y2="60" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/></svg>') repeat; animation: rain 0.6s linear infinite, stormFlash 5s infinite; }

        @keyframes holoScan { 0% { top: -10%; } 100% { top: 110%; } }
        .bg-hologram::after { content:''; position:absolute; left:0; right:0; height:10%; background:linear-gradient(to bottom, transparent, rgba(56,189,248,0.4), transparent); animation: holoScan 3s linear infinite; pointer-events:none; }
      `;
      content.appendChild(style);

      // Helper functions
      window.setArModel = function(url) {
        document.getElementById('ar-url').value = url;
        document.getElementById('ar-current-anim').value = '';
        window.isLocalFile = false;
        updateArView();
      };

      window.handleArFile = function(event) {
        const file = event.target.files[0];
        if (!file) return;
        const blobUrl = URL.createObjectURL(file);
        // Store real blob URL for preview AND injection
        window.currentLocalUrl = blobUrl;
        window.currentLocalFileName = file.name;
        window.isLocalFile = true;
        // Store blob URL directly — works in local preview
        document.getElementById('ar-url').value = blobUrl;
        document.getElementById('ar-current-anim').value = '';
        updateArView();
        if(typeof window.showToast === 'function') {
          window.showToast('✅ ' + file.name + ' loaded!');
        }
      };

      window.filterArLib = function(cat, btn) {
        document.querySelectorAll('.ar-cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        document.querySelectorAll('.ar-preset-btn').forEach(card => {
          if (cat === 'all' || card.getAttribute('data-cat') === cat) card.style.display = 'block';
          else card.style.display = 'none';
        });
      };

      window.setArBg = function(bg) {
        document.getElementById('ar-current-bg').value = bg;
        document.querySelectorAll('.ar-fx-btn').forEach(b => b.classList.remove('active'));
        event.target.classList.add('active');

        const overlay = document.getElementById('ar-fx-overlay');
        overlay.className = '';
        if(bg !== 'none' && bg !== 'hologram') overlay.classList.add('bg-' + bg);
        
        const container = document.getElementById('ar-bg-container');
        container.className = '';
        if(bg === 'hologram') container.classList.add('bg-hologram');
      };

      window.playArAnim = function(animName, btn) {
        document.getElementById('ar-current-anim').value = animName;
        document.querySelectorAll('.ar-anim-btn').forEach(b => b.classList.remove('active'));
        if(btn) btn.classList.add('active');
        
        const mv = document.querySelector('#ar-preview-container model-viewer');
        if(mv) {
          if(animName) {
            mv.animationName = animName;
            mv.play();
          } else {
            mv.pause();
          }
        }
      };

      window.updateArView = function() {
        let url = document.getElementById('ar-url').value;
        const auto = document.getElementById('ar-autorotate').checked;
        const shadows = document.getElementById('ar-shadows').checked;
        const currentAnim = document.getElementById('ar-current-anim').value;

        if (window.isLocalFile && window.currentLocalUrl) url = window.currentLocalUrl;

        if (!document.getElementById('model-viewer-script')) {
          const script = document.createElement('script');
          script.id = 'model-viewer-script';
          script.type = 'module';
          script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
          document.head.appendChild(script);
        }

        const container = document.getElementById('ar-preview-container');
        let mv = container.querySelector('model-viewer');
        
        if (!mv) {
          mv = document.createElement('model-viewer');
          mv.setAttribute('ar', '');
          mv.setAttribute('ar-modes', 'webxr scene-viewer quick-look');
          mv.setAttribute('camera-controls', '');
          mv.setAttribute('crossorigin', 'anonymous');
          mv.style.width = '100%';
          mv.style.height = '100%';
          container.appendChild(mv);

          // Listen for load to get animations
          mv.addEventListener('load', () => {
            const anims = mv.availableAnimations;
            const btnContainer = document.getElementById('ar-anim-buttons');
            btnContainer.innerHTML = '';
            
            if(anims && anims.length > 0) {
              anims.forEach((a, i) => {
                const btn = document.createElement('button');
                btn.className = 'ar-anim-btn' + (i === 0 && !currentAnim ? ' active' : '');
                btn.innerText = '▶ ' + a;
                btn.onclick = (e) => playArAnim(a, e.target);
                btnContainer.appendChild(btn);
              });
              // Auto play first if none selected
              if(!currentAnim) playArAnim(anims[0], btnContainer.firstChild);
            } else {
              btnContainer.innerHTML = '<span style="font-size:11px; color:#64748b;">No animations available</span>';
            }
          });
        }

        mv.setAttribute('src', url);
        if(auto) mv.setAttribute('auto-rotate', ''); else mv.removeAttribute('auto-rotate');
        if(shadows) mv.setAttribute('shadow-intensity', '1'); else mv.setAttribute('shadow-intensity', '0');
        if(currentAnim) {
          mv.setAttribute('animation-name', currentAnim);
          mv.play();
        }

        // Update QR
        const qrImg = document.getElementById('ar-qr');
        const qrDlImg = document.getElementById('ar-dl-qr');
        if (window.isLocalFile) {
          if (qrImg) qrImg.style.opacity = '0.2';
          if (qrDlImg) qrDlImg.style.opacity = '0.2';
        } else {
          if (qrImg) {
            qrImg.style.opacity = '1';
            const sceneViewerUrl = 'https://arvr.google.com/scene-viewer/1.0?file=' + encodeURIComponent(url) + '&mode=ar_preferred&title=AR';
            qrImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent(sceneViewerUrl);
          }
          if (qrDlImg) {
            qrDlImg.style.opacity = '1';
            qrDlImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent(url);
          }
        }
      };

      // 1. INJECT CODE INTO EDITOR (full HTML page, local files embedded as base64)
      window.injectArCode = function() {
        const auto = document.getElementById('ar-autorotate').checked;
        const shadows = document.getElementById('ar-shadows').checked;
        const bg = document.getElementById('ar-current-bg').value;
        const anim = document.getElementById('ar-current-anim').value;
        const lang = window.appLang || 'en';

        function buildAndInject(modelSrc) {
          let attrs = 'src="' + modelSrc + '" ar ar-modes="webxr scene-viewer quick-look" camera-controls';
          if(auto) attrs += ' auto-rotate';
          if(shadows) attrs += ' shadow-intensity="1"';
          if(anim) attrs += ' autoplay animation-name="' + anim + '"';

          let css = '';
          let wrapperClass = '';
          if(bg === 'cosmos') { css = "@keyframes s { 0% { background-position: 0 0; } 100% { background-position: 0 1000px; } } .ar-bg { background: #000 url('data:image/svg+xml;utf8,<svg width=\"200\" height=\"200\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"20\" cy=\"20\" r=\"1\" fill=\"white\"/><circle cx=\"150\" cy=\"80\" r=\"1.5\" fill=\"white\"/></svg>') repeat; animation: s 20s linear infinite; }"; wrapperClass = 'ar-bg'; }
          if(bg === 'rain') { css = "@keyframes r { 0% { background-position: 0 0; } 100% { background-position: 20px 1000px; } } .ar-bg { background: #1e293b url('data:image/svg+xml;utf8,<svg width=\"100\" height=\"100\" xmlns=\"http://www.w3.org/2000/svg\"><line x1=\"10\" y1=\"0\" x2=\"5\" y2=\"15\" stroke=\"rgba(255,255,255,0.4)\" stroke-width=\"1\"/></svg>') repeat; animation: r 1s linear infinite; }"; wrapperClass = 'ar-bg'; }
          if(bg === 'snow') { css = "@keyframes sn { 0% { background-position: 0 0; } 100% { background-position: 200px 1000px; } } .ar-bg { background: #0f172a url('data:image/svg+xml;utf8,<svg width=\"200\" height=\"200\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"40\" cy=\"40\" r=\"2\" fill=\"white\" opacity=\"0.8\"/></svg>'); animation: sn 10s linear infinite; }"; wrapperClass = 'ar-bg'; }
          if(bg === 'hologram') { css = "@keyframes h { 0% { top:-10%; } 100% { top:110%; } } .ar-bg { position:relative; background:#000; overflow:hidden; } .ar-bg::after { content:''; position:absolute; left:0; right:0; height:10%; background:linear-gradient(to bottom, transparent, rgba(56,189,248,0.4), transparent); animation: h 3s linear infinite; pointer-events:none; }"; wrapperClass = 'ar-bg'; }

          const pageTitle = lang === 'fr' ? 'Modèle AR' : 'AR Model';
          const finalCode =
'<!DOCTYPE html>\n' +
'<html lang="' + lang + '">\n' +
'<head>\n' +
'  <meta charset="UTF-8">\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'  <title>' + pageTitle + '</title>\n' +
'  <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"><\/script>\n' +
(css ? '  <style>\n    ' + css + '\n  </style>\n' : '') +
'  <style>\n    body { margin: 0; background: #111; display: flex; justify-content: center; align-items: center; min-height: 100vh; }\n    model-viewer { width: 100vw; height: 100vh; }\n  </style>\n' +
'</head>\n' +
'<body>\n' +
'  <div class="' + wrapperClass + '" style="width:100%; height:100vh;">\n' +
'    <model-viewer ' + attrs + '></model-viewer>\n' +
'  </div>\n' +
'</body>\n' +
'</html>';

          const injector = window.injectCode || (window.parent && window.parent.injectCode);
          if(typeof injector === 'function') {
            injector(finalCode);
            if(typeof window.showToast === 'function') window.showToast(lang === 'fr' ? '✅ Code AR complet injecté!' : '✅ Full AR Code injected!');
          } else {
            if(navigator.clipboard) navigator.clipboard.writeText(finalCode);
            alert(lang === 'fr' ? 'Code copié dans le presse-papiers!' : 'Code copied to clipboard!');
          }
        }

        // For local files: convert blob to base64 so HTML works standalone
        if (window.isLocalFile && window.currentLocalUrl) {
          const toastMsg = lang === 'fr' ? '⏳ Conversion en Base64...' : '⏳ Converting to Base64...';
          if(typeof window.showToast === 'function') window.showToast(toastMsg);

          fetch(window.currentLocalUrl)
            .then(function(r) { return r.blob(); })
            .then(function(blob) {
              const reader = new FileReader();
              reader.onloadend = function() {
                // reader.result = "data:model/gltf-binary;base64,..."
                buildAndInject(reader.result);
              };
              reader.readAsDataURL(blob);
            })
            .catch(function(err) {
              console.error('Base64 conversion failed:', err);
              // Fallback: use blob URL anyway
              buildAndInject(window.currentLocalUrl);
            });
        } else {
          // Remote URL: use directly
          const url = document.getElementById('ar-url').value;
          buildAndInject(url);
        }
      };

      // 2. INJECT MODEL CODE INTO EXISTING EDITOR CODE + show in preview
      window.injectArLive = function() {
        const url = document.getElementById('ar-url').value;
        const auto = document.getElementById('ar-autorotate').checked;
        const shadows = document.getElementById('ar-shadows').checked;
        const anim = document.getElementById('ar-current-anim').value;
        const lang = window.appLang || 'en';

        // Use blob URL for local files
        const effectiveUrl = (window.isLocalFile && window.currentLocalUrl) ? window.currentLocalUrl : url;

        let attrs = 'src="' + effectiveUrl + '" ar ar-modes="webxr scene-viewer quick-look" camera-controls';
        if(auto) attrs += ' auto-rotate';
        if(shadows) attrs += ' shadow-intensity="1"';
        if(anim) attrs += ' autoplay animation-name="' + anim + '"';

        // Build just the model-viewer snippet to insert into existing code
        const mvScript = '<script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"><\/script>';
        const mvTag = '<model-viewer ' + attrs + ' style="width:100%; height:500px; display:block;"></model-viewer>';
        const snippet = mvScript + '\n' + mvTag;

        const injector = window.injectCode || (window.parent && window.parent.injectCode);
        if (typeof injector === 'function') {
          // Get current editor code and append model-viewer before </body>
          const existing = window.editor ? window.editor.getValue() : '';
          let newCode;
          if (existing && /<\/body>/i.test(existing)) {
            newCode = existing.replace(/<\/body>/i, '\n' + snippet + '\n</body>');
          } else if (existing && existing.trim()) {
            newCode = existing + '\n' + snippet;
          } else {
            // No existing code — create minimal page
            newCode = '<!DOCTYPE html>\n<html>\n<head><meta charset="UTF-8"><title>AR Model</title></head>\n<body style="margin:0;background:#000;">\n' + snippet + '\n</body>\n</html>';
          }
          injector(newCode);
          if(typeof window.showToast === 'function') window.showToast(lang === 'fr' ? '✅ Modèle AR injecté dans le code!' : '✅ AR Model injected into code!');
        }

        // Also show floating model in preview iframe
        const previewFrame = document.getElementById('preview-iframe');
        if (previewFrame && previewFrame.contentDocument && previewFrame.contentDocument.body) {
          const doc = previewFrame.contentDocument;
          if (!doc.getElementById('mv-script')) {
            const script = doc.createElement('script');
            script.id = 'mv-script'; script.type = 'module';
            script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
            doc.head.appendChild(script);
          }
          const existing2 = doc.getElementById('ar-live-overlay');
          if(existing2) existing2.remove();
          const wrapper = doc.createElement('div');
          wrapper.id = 'ar-live-overlay';
          wrapper.style.cssText = 'position:fixed; top:10px; right:10px; width:260px; height:260px; z-index:999999; border-radius:15px; box-shadow:0 10px 30px rgba(0,0,0,0.7); overflow:hidden; border:2px solid rgba(56,189,248,0.6); cursor:move; resize:both;';
          wrapper.innerHTML = '<div style="position:absolute;top:5px;right:5px;z-index:2;cursor:pointer;background:rgba(239,68,68,0.9);color:white;width:22px;height:22px;text-align:center;line-height:22px;border-radius:50%;font-weight:bold;font-size:12px;" onclick="this.parentElement.remove()">✕</div><model-viewer ' + attrs + ' style="width:100%;height:100%;"></model-viewer>';
          let ox=0,oy=0,ix=0,iy=0,dragging=false;
          wrapper.addEventListener('mousedown', function(e){if(e.target===wrapper||e.target.tagName==='MODEL-VIEWER'){ix=e.clientX-ox;iy=e.clientY-oy;dragging=true;}});
          doc.addEventListener('mousemove', function(e){if(dragging){ox=e.clientX-ix;oy=e.clientY-iy;wrapper.style.transform='translate('+ox+'px,'+oy+'px)';}});
          doc.addEventListener('mouseup', function(){dragging=false;});
          doc.body.appendChild(wrapper);
        }
      };

      setTimeout(updateArView, 100);

    } else if (originalRenderTab) {
      originalRenderTab(tab);
    }
  };
})();
