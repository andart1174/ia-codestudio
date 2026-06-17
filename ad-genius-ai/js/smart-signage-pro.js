(function() {
    'use strict';

    var _prevRenderTab = window.renderTab;
    window.renderTab = function(tab) {
        if (tab === 'smart-signage') {
            window.activeTab = tab;
            document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
            var btn = document.getElementById('tab-' + tab);
            if (btn) btn.classList.add('active');
            
            document.querySelectorAll('.center-panel, .right-panel, .workspace').forEach(el => el.style.display = 'none');
            var ws = document.getElementById(tab + '-workspace');
            if (ws) ws.style.display = 'flex';
            
            var c = document.getElementById('ssp-center');
            var r = document.getElementById('ssp-right');
            if(c) c.style.display = 'flex';
            if(r) r.style.display = 'block';
            
            buildUI();
            initDraggable();
            return;
        }
        if (_prevRenderTab) _prevRenderTab(tab);
    };

    var fr = window.lang === 'fr';
    var defaultStamp = fr ? 'VENDU' : 'SOLD';
    var defaultQrLink = 'https://your-site.com';
    var defaultTitle = fr ? 'À VENDRE' : 'FOR SALE';
    var defaultDetails = fr ? 'Maison 4 Pièces • 120m²' : '4 Room House • 120m²';

    var state = {
        shape: 'portrait',
        bgType: 'glass',
        bgImage: '',
        title: defaultTitle,
        titleSize: 40,
        titleColor: '#ffffff',
        titleAnim: 'none',
        titlePos: {x: 50, y: 50},
        
        price: '350.000 €',
        priceSize: 30,
        priceColor: '#ffd700',
        priceAnim: 'pulse',
        pricePos: {x: 50, y: 150},
        
        details: defaultDetails,
        detailsSize: 18,
        detailsColor: '#e2e8f0',
        detailsAnim: 'none',
        detailsPos: {x: 50, y: 250},
        
        contact: '📞 06 12 34 56 78',
        contactSize: 22,
        contactColor: '#ffffff',
        contactAnim: 'bounce',
        contactPos: {x: 50, y: 350},
        
        stamp: defaultStamp,
        stampColor: '#ef4444',
        stampPos: {x: 250, y: 50},
        showQR: true,
        qrPos: {x: 50, y: 450},
        qrLink: defaultQrLink,
        showShine: true
    };

    function buildUI() {
        var c = document.getElementById('ssp-center');
        var r = document.getElementById('ssp-right');
        if(!c || !r) return;

        // Center Panel Canvas
        c.innerHTML = `
            <div id="ssp-placard" style="width:400px; height:600px; background-color:#1e293b; background-size:cover; background-position:center; position:relative; overflow:hidden; border-radius:10px; box-shadow:0 10px 30px rgba(0,0,0,0.5);">
                <div id="ssp-overlay" style="position:absolute; top:0; left:0; right:0; bottom:0; pointer-events:none;"></div>
                <div id="ssp-el-title" class="drag-el" style="position:absolute; cursor:move; white-space:nowrap; font-weight:bold; text-shadow:0 2px 4px rgba(0,0,0,0.5); z-index:10;"></div>
                <div id="ssp-el-price" class="drag-el" style="position:absolute; cursor:move; white-space:nowrap; font-weight:bold; text-shadow:0 2px 4px rgba(0,0,0,0.5); z-index:10;"></div>
                <div id="ssp-el-details" class="drag-el" style="position:absolute; cursor:move; white-space:nowrap; text-shadow:0 2px 4px rgba(0,0,0,0.5); z-index:10;"></div>
                <div id="ssp-el-contact" class="drag-el" style="position:absolute; cursor:move; white-space:nowrap; font-weight:bold; text-shadow:0 2px 4px rgba(0,0,0,0.5); z-index:10;"></div>
                <div id="ssp-el-qr" class="drag-el" style="position:absolute; cursor:move; z-index:11; background:#fff; padding:5px; border-radius:5px; box-shadow:0 2px 5px rgba(0,0,0,0.5);">
                    <img id="ssp-qr-img" src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(state.qrLink)}" width="80" height="80" style="display:block; pointer-events:none;">
                </div>
                <div id="ssp-el-stamp" class="drag-el" style="position:absolute; cursor:move; z-index:12; font-weight:900; font-size:28px; text-transform:uppercase; border:4px solid; padding:5px 15px; border-radius:10px; transform:rotate(-15deg); box-shadow:0 4px 10px rgba(0,0,0,0.3); background:rgba(255,255,255,0.1); backdrop-filter:blur(5px);"></div>
                <div id="ssp-shine" style="position:absolute; top:0; left:-100%; width:50%; height:100%; background:linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%); transform:skewX(-25deg); pointer-events:none; animation:shine 4s infinite; z-index:15;"></div>
            </div>
            <style>
                .drag-el { user-select: none; }
                .anim-pulse { animation: pulse 2s infinite; }
                .anim-bounce { animation: bounce 2s infinite; }
                @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
                @keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-10px); } 60% { transform: translateY(-5px); } }
                @keyframes shine { 0% { left: -100%; } 20% { left: 200%; } 100% { left: 200%; } }
                
                .style-glass #ssp-overlay { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); border: 2px solid rgba(255, 255, 255, 0.3); border-radius: 10px; }
                .style-brutalist #ssp-overlay { background: #ffea00; border: 8px solid #000; }
                .style-3dfloat #ssp-overlay { background: linear-gradient(145deg, rgba(30,41,59,0.8), rgba(15,23,42,0.9)); border: 2px solid #334155; border-radius: 10px; }
                .style-cyber #ssp-overlay { background: rgba(0,0,0,0.4); border: 4px solid #0ff; box-shadow: 0 0 15px #0ff; }
                .style-holo #ssp-overlay { background: linear-gradient(135deg, rgba(255,0,128,0.2) 0%, rgba(0,255,255,0.2) 100%); border: 2px solid rgba(255,255,255,0.5); border-radius: 10px; }
                .style-neon #ssp-overlay { background: rgba(10,10,15,0.8); border: 3px solid #ff007f; border-radius: 10px; box-shadow: 0 0 10px #ff007f, inset 0 0 10px #ff007f; }
                .style-badge #ssp-overlay { background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.7) 100%); border: 10px solid #fff; border-radius: 200px; }
                .style-grunge { border-radius: 0 !important; }
                .style-grunge #ssp-overlay { background: rgba(0,0,0,0.6); border: 4px dashed #fff; outline: 15px solid #000; outline-offset: -15px; }
            </style>
        `;

        var fr = window.lang === 'fr';
        var labelPreset = fr ? "Preset / Type d'annonce :" : "Preset / Ad Type:";
        var labelShape = fr ? "Format de l'affiche :" : "Placard Shape:";
        var optLandscape = fr ? "▭ Horizontal (600x400)" : "▭ Horizontal (600x400)";
        var optSquare = fr ? "□ Carré (500x500)" : "□ Square (500x500)";
        var optCircle = fr ? "◯ Cercle" : "◯ Circle";
        var optTriangle = fr ? "△ Triangle" : "△ Triangle";
        var optHexagon = fr ? "⬡ Hexagone" : "⬡ Hexagon";
        var labelStyle = fr ? "Style de l'affiche :" : "Placard Style:";
        var labelBg = fr ? "Image de fond (Fond) :" : "Background Image:";
        var labelTitle = fr ? "Titre (Title) :" : "Title:";
        var labelPrice = fr ? "Prix (Price) :" : "Price:";
        var labelDetails = fr ? "Détails :" : "Details:";
        var labelStamp = fr ? "Tampon / Badge :" : "Stamp / Badge:";
        var labelShowQr = fr ? "+ Afficher QR" : "+ Show QR";
        var labelShowShine = fr ? "+ Reflet/Brillance" : "+ Shine / Reflection";
        var labelQrLink = fr ? "Lien du Code QR :" : "QR Code URL:";
        var labelUrban = fr ? "🌆 Scène urbaine :" : "🌆 Urban Mockup Scene:";
        var optNoMockup = fr ? "— Aperçu uniquement" : "— Preview only (no mockup)";

        r.innerHTML = `
            <div style="color:white;font-family:sans-serif;">
                <h2 style="margin:0 0 5px;color:#ffd700;font-size:18px;">🏢 Smart Signage Pro</h2>
                <p style="margin:0 0 15px;font-size:11px;color:#94a3b8;">Interactive Ads & Posters</p>
                
                <label style="font-size:11px;color:#fef08a;">${labelPreset}</label>
                <select id="ssp-preset" style="width:100%;margin-bottom:15px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                    <option value="avendre">🏠 À Vendre (For Sale)</option>
                    <option value="alouer">🔑 À Louer (For Rent)</option>
                    <option value="recherche">🔍 Recherche (Looking For)</option>
                    <option value="promo">🛍️ Promo Flash (Discount)</option>
                </select>

                <label style="font-size:11px;color:#fef08a;">${labelShape}</label>
                <select id="ssp-shape" style="width:100%;margin-bottom:15px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                    <option value="portrait">▯ Vertical (400x600)</option>
                    <option value="landscape">${optLandscape}</option>
                    <option value="square">${optSquare}</option>
                    <option value="circle">${optCircle}</option>
                    <option value="triangle">${optTriangle}</option>
                    <option value="hexagon">${optHexagon}</option>
                </select>

                <label style="font-size:11px;color:#fef08a;">${labelStyle}</label>
                <select id="ssp-style" style="width:100%;margin-bottom:15px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                    <option value="none">Simple / Image Only</option>
                    <option value="glass">Glassmorphism (Elegant)</option>
                    <option value="brutalist">Brutalist (Impact)</option>
                    <option value="3dfloat">Dark Modern (Overlay)</option>
                    <option value="cyber">Cyberpunk (Tech)</option>
                    <option value="holo">Holographic (Foil)</option>
                    <option value="neon">Neon Nights (Glow)</option>
                    <option value="badge">Round Badge (Pill)</option>
                    <option value="grunge">Street Grunge (Rough)</option>
                </select>

                <label style="font-size:11px;color:#fef08a;">${labelBg}</label>
                <input type="file" id="ssp-bg-file" accept="image/*" style="width:100%;font-size:11px;margin-bottom:15px;color:#94a3b8;">

                <hr style="border:0;border-top:1px solid #334155;margin:15px 0;">

                <div style="margin-bottom:10px;">
                    <label style="font-size:11px;color:#fef08a;">${labelTitle}</label>
                    <input type="text" id="inp-title" value="${state.title}" style="width:100%;margin-bottom:5px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                    <div style="display:flex;gap:5px;">
                        <input type="color" id="col-title" value="${state.titleColor}" style="width:40px;height:30px;border:none;background:none;cursor:pointer;">
                        <input type="range" id="size-title" min="10" max="100" value="${state.titleSize}" style="flex:1;">
                    </div>
                </div>

                <div style="margin-bottom:10px;">
                    <label style="font-size:11px;color:#fef08a;">${labelPrice}</label>
                    <input type="text" id="inp-price" value="${state.price}" style="width:100%;margin-bottom:5px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                    <div style="display:flex;gap:5px;">
                        <input type="color" id="col-price" value="${state.priceColor}" style="width:40px;height:30px;border:none;background:none;cursor:pointer;">
                        <input type="range" id="size-price" min="10" max="100" value="${state.priceSize}" style="flex:1;">
                    </div>
                </div>

                <div style="margin-bottom:10px;">
                    <label style="font-size:11px;color:#fef08a;">${labelDetails}</label>
                    <input type="text" id="inp-details" value="${state.details}" style="width:100%;margin-bottom:5px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                    <div style="display:flex;gap:5px;">
                        <input type="color" id="col-details" value="${state.detailsColor}" style="width:40px;height:30px;border:none;background:none;cursor:pointer;">
                        <input type="range" id="size-details" min="10" max="100" value="${state.detailsSize}" style="flex:1;">
                    </div>
                </div>

                <div style="margin-bottom:15px;">
                    <label style="font-size:11px;color:#fef08a;">Contact:</label>
                    <input type="text" id="inp-contact" value="${state.contact}" style="width:100%;margin-bottom:5px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                    <div style="display:flex;gap:5px;">
                        <input type="color" id="col-contact" value="${state.contactColor}" style="width:40px;height:30px;border:none;background:none;cursor:pointer;">
                        <input type="range" id="size-contact" min="10" max="100" value="${state.contactSize}" style="flex:1;">
                    </div>
                </div>

                <div style="margin-bottom:10px;">
                    <label style="font-size:11px;color:#fef08a;">${labelStamp}</label>
                    <div style="display:flex;gap:5px;margin-bottom:5px;">
                        <input type="text" id="inp-stamp" value="${state.stamp}" style="flex:1;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                        <input type="color" id="col-stamp" value="${state.stampColor}" style="width:40px;height:35px;border:none;background:none;cursor:pointer;">
                    </div>
                </div>

                <div style="margin-bottom:15px; background:#1e293b; padding:10px; border-radius:4px; border:1px solid #334155;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                        <label style="font-size:11px;color:#fef08a;display:flex;align-items:center;gap:5px;cursor:pointer;">
                            <input type="checkbox" id="ssp-show-qr" ${state.showQR ? 'checked' : ''}> ${labelShowQr}
                        </label>
                        <label style="font-size:11px;color:#fef08a;display:flex;align-items:center;gap:5px;cursor:pointer;">
                            <input type="checkbox" id="ssp-show-shine" ${state.showShine ? 'checked' : ''}> ${labelShowShine}
                        </label>
                    </div>
                    <label style="font-size:11px;color:#94a3b8;display:block;margin-bottom:5px;">${labelQrLink}</label>
                    <input type="text" id="inp-qr-link" value="${state.qrLink}" placeholder="https://..." style="width:100%;background:#0f172a;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                </div>

                <button id="ssp-btn-html" style="width:100%;background:linear-gradient(135deg,#ffd700,#f59e0b);color:#000;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;margin-bottom:10px;">🌐 Export HTML (Animation)</button>
                <button id="ssp-btn-img" style="width:100%;background:#334155;color:#fff;border:1px solid #475569;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;margin-bottom:10px;">📸 Export Photo (High-Res)</button>

                <hr style="border:0;border-top:1px solid #334155;margin:12px 0;">
                <label style="font-size:11px;color:#fef08a;">${labelUrban}</label>
                <div style="display:flex;gap:5px;">
                    <select id="ssp-urban" style="flex:1;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                        <option value="none">${optNoMockup}</option>
                        <option value="billboard">Billboard</option>
                        <option value="busstop">Bus Stop</option>
                        <option value="kiosk">Kiosk</option>
                        <option value="subway">Subway</option>
                    </select>
                    <button id="ssp-btn-urban" style="background:#ffd700;color:#000;border:none;padding:8px;border-radius:4px;cursor:pointer;font-weight:bold;">Set</button>
                </div>
            </div>
        `;

        setupListeners();
        renderPreview();
    }

    function setupListeners() {
        var fields = ['title', 'price', 'details', 'contact', 'stamp'];
        fields.forEach(f => {
            var elI = document.getElementById('inp-'+f);
            var elC = document.getElementById('col-'+f);
            var elS = document.getElementById('size-'+f);
            if(elI) elI.addEventListener('input', e => { state[f] = e.target.value; renderPreview(); });
            if(elC) elC.addEventListener('input', e => { state[f+'Color'] = e.target.value; renderPreview(); });
            if(elS) elS.addEventListener('input', e => { state[f+'Size'] = e.target.value; renderPreview(); });
        });

        document.getElementById('ssp-show-qr').addEventListener('change', e => { state.showQR = e.target.checked; renderPreview(); });
        document.getElementById('ssp-show-shine').addEventListener('change', e => { state.showShine = e.target.checked; renderPreview(); });
        var elQRLink = document.getElementById('inp-qr-link');
        if(elQRLink) elQRLink.addEventListener('input', e => { state.qrLink = e.target.value; renderPreview(); });

        document.getElementById('ssp-style').value = state.bgType;
        document.getElementById('ssp-style').addEventListener('change', e => { state.bgType = e.target.value; renderPreview(); });
        document.getElementById('ssp-shape').value = state.shape;
        document.getElementById('ssp-shape').addEventListener('change', e => { state.shape = e.target.value; renderPreview(); });
        
        document.getElementById('ssp-preset').addEventListener('change', e => {
            var val = e.target.value;
            var fr = window.lang === 'fr';
            if(val === 'alouer') {
                state.title = fr ? 'À LOUER' : 'FOR RENT'; state.titleColor = '#60a5fa'; state.bgType = 'glass'; state.price = fr ? '850 € / mois' : '850 € / month'; state.details = fr ? 'Appartement T2 • Centre-Ville' : '2 Room Apartment • City Center';
            } else if (val === 'recherche') {
                state.title = fr ? 'RECHERCHE URGENT' : 'URGENT WANTED'; state.titleColor = '#ef4444'; state.bgType = 'brutalist'; state.price = fr ? 'Budget: 50.000 €' : 'Budget: 50,000 €'; state.details = fr ? 'Terrain constructible > 500m²' : 'Building Land > 500m²';
            } else if (val === 'promo') {
                state.title = fr ? 'SOLDES -50%' : 'SALE -50%'; state.titleColor = '#facc15'; state.bgType = 'cyber'; state.price = '19.99 €'; state.details = fr ? 'Stock Limité ! Achetez maintenant.' : 'Limited Stock! Buy Now.';
            } else {
                state.title = fr ? 'À VENDRE' : 'FOR SALE'; state.titleColor = '#ffffff'; state.bgType = 'glass'; state.price = '350.000 €'; state.details = fr ? 'Maison 4 Pièces • 120m²' : '4 Room House • 120m²';
            }
            // Update UI
            fields.forEach(f => {
                var el = document.getElementById('inp-'+f);
                if (el) el.value = state[f];
                var elCol = document.getElementById('col-'+f);
                if (elCol) elCol.value = state[f+'Color'];
            });
            document.getElementById('ssp-style').value = state.bgType;
            renderPreview();
        });

        document.getElementById('ssp-bg-file').addEventListener('change', e => {
            var file = e.target.files[0];
            if(file) {
                var r = new FileReader();
                r.onload = ev => { state.bgImage = ev.target.result; renderPreview(); };
                r.readAsDataURL(file);
            }
        });

        document.getElementById('ssp-btn-html').addEventListener('click', exportHTML);
        document.getElementById('ssp-btn-img').addEventListener('click', exportImage);
        document.getElementById('ssp-btn-urban').addEventListener('click', function() {
            var env = document.getElementById('ssp-urban').value;
            if (env === 'none') { window.showToast && window.showToast('Select a scene first!'); return; }
            showUrbanMockup(env);
        });
    }

    function renderPreview() {
        var placard = document.getElementById('ssp-placard');
        if(!placard) return;

        if(state.bgImage) {
            placard.style.backgroundImage = `url('${state.bgImage}')`;
        } else {
            placard.style.backgroundImage = 'none';
            placard.style.backgroundColor = '#1e293b';
        }

        // Apply Shape
        if(state.shape === 'portrait') {
            placard.style.width = '400px'; placard.style.height = '600px'; placard.style.borderRadius = '10px'; placard.style.clipPath = 'none';
        } else if(state.shape === 'landscape') {
            placard.style.width = '600px'; placard.style.height = '400px'; placard.style.borderRadius = '10px'; placard.style.clipPath = 'none';
        } else if(state.shape === 'square') {
            placard.style.width = '500px'; placard.style.height = '500px'; placard.style.borderRadius = '10px'; placard.style.clipPath = 'none';
        } else if(state.shape === 'circle') {
            placard.style.width = '500px'; placard.style.height = '500px'; placard.style.borderRadius = '50%'; placard.style.clipPath = 'none';
        } else if(state.shape === 'triangle') {
            placard.style.width = '500px'; placard.style.height = '500px'; placard.style.borderRadius = '0'; placard.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
        } else if(state.shape === 'hexagon') {
            placard.style.width = '500px'; placard.style.height = '500px'; placard.style.borderRadius = '0'; placard.style.clipPath = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
        }

        placard.className = 'style-' + state.bgType;

        var fields = ['title', 'price', 'details', 'contact'];
        fields.forEach(f => {
            var el = document.getElementById('ssp-el-'+f);
            if(!el) return;
            el.innerText = state[f];
            el.style.fontSize = state[f+'Size'] + 'px';
            el.style.color = state[f+'Color'];
            el.style.left = state[f+'Pos'].x + 'px';
            el.style.top = state[f+'Pos'].y + 'px';
            
            if(state.bgType === 'brutalist' && state[f+'Color'] === '#ffffff') {
                el.style.color = '#000000';
                var colEl = document.getElementById('col-'+f);
                if(colEl) colEl.value = '#000000';
                state[f+'Color'] = '#000000';
            }
        });
        
        var priceEl = document.getElementById('ssp-el-price');
        var contactEl = document.getElementById('ssp-el-contact');
        if(priceEl) priceEl.className = 'drag-el anim-' + state.priceAnim;
        if(contactEl) contactEl.className = 'drag-el anim-' + state.contactAnim;

        var stampEl = document.getElementById('ssp-el-stamp');
        if(stampEl) {
            stampEl.innerText = state.stamp;
            stampEl.style.color = state.stampColor;
            stampEl.style.borderColor = state.stampColor;
            stampEl.style.left = state.stampPos.x + 'px';
            stampEl.style.top = state.stampPos.y + 'px';
            stampEl.style.display = state.stamp ? 'block' : 'none';
        }

        var qrEl = document.getElementById('ssp-el-qr');
        if(qrEl) {
            qrEl.style.left = state.qrPos.x + 'px';
            qrEl.style.top = state.qrPos.y + 'px';
            qrEl.style.display = state.showQR ? 'block' : 'none';
            var img = document.getElementById('ssp-qr-img');
            if(img && state.qrLink) {
                img.src = 'https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=' + encodeURIComponent(state.qrLink);
            }
        }

        var shineEl = document.getElementById('ssp-shine');
        if(shineEl) {
            shineEl.style.display = state.showShine ? 'block' : 'none';
        }
    }

    function initDraggable() {
        var isDragging = false;
        var currentEl = null;
        var startX, startY, initialX, initialY;

        var placard = document.getElementById('ssp-placard');
        if(!placard) return;

        placard.addEventListener('mousedown', function(e) {
            if(e.target.classList.contains('drag-el')) {
                isDragging = true;
                currentEl = e.target;
                startX = e.clientX;
                startY = e.clientY;
                initialX = parseInt(currentEl.style.left || 0, 10);
                initialY = parseInt(currentEl.style.top || 0, 10);
            }
        });

        document.addEventListener('mousemove', function(e) {
            if(isDragging && currentEl) {
                var dx = e.clientX - startX;
                var dy = e.clientY - startY;
                var newX = initialX + dx;
                var newY = initialY + dy;
                currentEl.style.left = newX + 'px';
                currentEl.style.top = newY + 'px';
            }
        });

        document.addEventListener('mouseup', function(e) {
            if(isDragging && currentEl) {
                isDragging = false;
                var id = currentEl.id.replace('ssp-el-', '');
                state[id+'Pos'].x = parseInt(currentEl.style.left, 10);
                state[id+'Pos'].y = parseInt(currentEl.style.top, 10);
                currentEl = null;
            }
        });
        
        // Handle leaving the placard area
        placard.addEventListener('mouseleave', function(e) {
            if(isDragging && currentEl) {
                isDragging = false;
                var id = currentEl.id.replace('ssp-el-', '');
                if(state[id+'Pos']) {
                    state[id+'Pos'].x = parseInt(currentEl.style.left, 10);
                    state[id+'Pos'].y = parseInt(currentEl.style.top, 10);
                }
                currentEl = null;
            }
        });
    }

    function getShapeCSS(scale) {
        var w, h, br, cp;
        if(state.shape === 'portrait') { w = 400; h = 600; br = '10px'; cp = 'none'; }
        else if(state.shape === 'landscape') { w = 600; h = 400; br = '10px'; cp = 'none'; }
        else if(state.shape === 'square') { w = 500; h = 500; br = '10px'; cp = 'none'; }
        else if(state.shape === 'circle') { w = 500; h = 500; br = '50%'; cp = 'none'; }
        else if(state.shape === 'triangle') { w = 500; h = 500; br = '0'; cp = 'polygon(50% 0%, 0% 100%, 100% 100%)'; }
        else if(state.shape === 'hexagon') { w = 500; h = 500; br = '0'; cp = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'; }
        return `width:${w * scale}px; height:${h * scale}px; border-radius:${br === '50%' ? '50%' : (parseInt(br) * scale) + 'px'}; clip-path:${cp};`;
    }

    function generateCSS() {
        return `
            body { margin:0; display:flex; align-items:center; justify-content:center; height:100vh; background:#0f172a; font-family:sans-serif; overflow:hidden; }
            .placard { background-color:#1e293b; background-size:cover; background-position:center; position:absolute; overflow:hidden; display:flex; cursor:grab; box-shadow:0 20px 50px rgba(0,0,0,0.5); transition:transform 0.1s; }
            .placard:active { cursor:grabbing; transform:scale(1.02); }
            .overlay { position:absolute; top:0; left:0; right:0; bottom:0; pointer-events:none; }
            .el { position:absolute; white-space:nowrap; text-shadow:0 2px 4px rgba(0,0,0,0.5); font-weight:bold; z-index:10; }
            .qr-code { position:absolute; z-index:11; background:#fff; padding:5px; border-radius:5px; box-shadow:0 2px 5px rgba(0,0,0,0.5); }
            .stamp { position:absolute; z-index:12; font-weight:900; text-transform:uppercase; border:4px solid; padding:5px 15px; border-radius:10px; transform:rotate(-15deg); box-shadow:0 4px 10px rgba(0,0,0,0.3); background:rgba(255,255,255,0.1); backdrop-filter:blur(5px); }
            .shine { position:absolute; top:0; left:-100%; width:50%; height:100%; background:linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%); transform:skewX(-25deg); pointer-events:none; animation:shine 4s infinite; z-index:15; }
            .anim-pulse { animation: pulse 2s infinite; }
            .anim-bounce { animation: bounce 2s infinite; }
            @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
            @keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-10px); } 60% { transform: translateY(-5px); } }
            @keyframes shine { 0% { left: -100%; } 20% { left: 200%; } 100% { left: 200%; } }
            
            .style-glass .overlay { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border: 2px solid rgba(255, 255, 255, 0.3); border-radius: 10px; }
            .style-brutalist .overlay { background: #ffea00; border: 8px solid #000; border-radius: 0; }
            .style-brutalist { border-radius: 0 !important; }
            .style-3dfloat .overlay { background: linear-gradient(145deg, rgba(30,41,59,0.8), rgba(15,23,42,0.9)); border: 2px solid #334155; border-radius: 10px; }
            .style-cyber .overlay { background: rgba(0,0,0,0.4); border: 4px solid #0ff; box-shadow: 0 0 15px #0ff; border-radius: 0; }
            .style-cyber { border-radius: 0 !important; }
            .style-none .overlay { background: transparent; border: none; }
            .style-holo .overlay { background: linear-gradient(125deg, rgba(255,0,0,0.2), rgba(255,255,0,0.2), rgba(0,255,0,0.2), rgba(0,255,255,0.2), rgba(0,0,255,0.2), rgba(255,0,255,0.2)); border: 2px solid rgba(255,255,255,0.8); border-radius: 15px; box-shadow: inset 0 0 30px rgba(255,255,255,0.5); }
            .style-neon .overlay { background: rgba(10,10,10,0.85); border: 4px solid #ff00ff; box-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, inset 0 0 15px #ff00ff; border-radius: 10px; }
            .style-badge { border-radius: 200px !important; }
            .style-badge .overlay { background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.7) 100%); border: 10px solid #fff; border-radius: 200px; }
            .style-grunge { border-radius: 0 !important; }
            .style-grunge .overlay { background: rgba(0,0,0,0.6); border: 4px dashed #fff; outline: 15px solid #000; outline-offset: -15px; }
        `;
    }

    function exportHTML() {
        var scale = 2; // Exporting at 2x scale from the 400x600 preview (so 800x1200)
        var html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smart Signage</title>
    <style>${generateCSS()}</style>
</head>
<body>
    <div class="placard style-${state.bgType}" id="widget" style="${getShapeCSS(1)} background-image:url('${state.bgImage || ''}');">
        <div class="overlay"></div>
        ${state.showShine ? '<div class="shine"></div>' : ''}
        <div class="el" style="left:${state.titlePos.x}px; top:${state.titlePos.y}px; font-size:${state.titleSize}px; color:${state.titleColor};">${state.title}</div>
        <div class="el anim-${state.priceAnim}" style="left:${state.pricePos.x}px; top:${state.pricePos.y}px; font-size:${state.priceSize}px; color:${state.priceColor};">${state.price}</div>
        <div class="el" style="left:${state.detailsPos.x}px; top:${state.detailsPos.y}px; font-size:${state.detailsSize}px; color:${state.detailsColor}; font-weight:normal;">${state.details}</div>
        <div class="el anim-${state.contactAnim}" style="left:${state.contactPos.x}px; top:${state.contactPos.y}px; font-size:${state.contactSize}px; color:${state.contactColor};">${state.contact}</div>
        
        ${state.showQR ? `<div class="qr-code" style="left:${state.qrPos.x}px; top:${state.qrPos.y}px;"><img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(state.qrLink)}" width="80" height="80" style="display:block; pointer-events:none;"></div>` : ''}
        
        ${state.stamp ? `<div class="stamp" style="left:${state.stampPos.x}px; top:${state.stampPos.y}px; color:${state.stampColor}; border-color:${state.stampColor}; font-size:28px;">${state.stamp}</div>` : ''}
    </div>
    
    <script>
        var widget = document.getElementById('widget');
        var isDragging = false, startX, startY, initialX, initialY;
        
        widget.addEventListener('mousedown', function(e) {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            var rect = widget.getBoundingClientRect();
            // Store position relative to viewport center or top/left
            initialX = rect.left;
            initialY = rect.top;
            widget.style.margin = '0'; // clear flex centering
            widget.style.left = initialX + 'px';
            widget.style.top = initialY + 'px';
        });

        document.addEventListener('mousemove', function(e) {
            if(isDragging) {
                var dx = e.clientX - startX;
                var dy = e.clientY - startY;
                widget.style.left = (initialX + dx) + 'px';
                widget.style.top = (initialY + dy) + 'px';
            }
        });

        document.addEventListener('mouseup', function() { isDragging = false; });
    </script>
</body>
</html>`;
        var blob = new Blob([html], {type: 'text/html'});
        var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'smart-signage.html'; a.click();
    }

    /* ══════════════════════════════════════════════════
       URBAN MOCKUP SIMULATOR
       ══════════════════════════════════════════════════ */
    var urbanAnim = null;

    function showUrbanMockup(envType) {
        // Build fullscreen overlay
        var old = document.getElementById('ssp-urban-overlay');
        if (old) old.remove();

        var overlay = document.createElement('div');
        overlay.id = 'ssp-urban-overlay';
        overlay.style.cssText = `
            position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;
            background:#000;display:flex;align-items:center;justify-content:center;
            flex-direction:column;
        `;

        // Canvas for city background
        var cvs = document.createElement('canvas');
        cvs.id = 'urban-canvas';
        cvs.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;';
        cvs.width = window.innerWidth;
        cvs.height = window.innerHeight;
        overlay.appendChild(cvs);

        // The actual poster – CSS 3D perspective-transformed
        var posterWrap = document.createElement('div');
        posterWrap.style.cssText = `
            position:absolute;
            perspective:1200px;
            z-index:10;
        `;

        var poster = document.createElement('div');
        poster.id = 'urban-poster';
        // Clone the current placard content
        var origPlacard = document.getElementById('ssp-placard');
        if (origPlacard) {
            poster.innerHTML = origPlacard.outerHTML.replace(/id="ssp-/g, 'id="up-');
            // Re-apply styles
            var clonedPlacard = poster.querySelector('[id^="up-placard"]') || poster.firstChild;
            if (clonedPlacard) {
                clonedPlacard.style.cssText = origPlacard.style.cssText;
                clonedPlacard.style.pointerEvents = 'none';
            }
        }

        // Perspective 3D transform based on scene
        var transforms = {
            subway: 'rotateY(-12deg) rotateX(4deg) scale(0.88)',
            tokyo:  'rotateY(8deg) rotateX(-3deg) scale(0.92) translateX(60px)',
            times:  'rotateY(-5deg) rotateX(6deg) scale(1.05) translateY(-30px)',
            mall:   'rotateY(15deg) rotateX(2deg) scale(0.85) translateX(-40px)'
        };
        poster.style.cssText = `
            transform-style: preserve-3d;
            transform: ${transforms[envType] || 'none'};
            filter: drop-shadow(0 20px 60px rgba(0,0,0,0.8));
            transition: transform 0.5s ease;
        `;

        posterWrap.appendChild(poster);
        overlay.appendChild(posterWrap);

        // Close button
        var closeBtn = document.createElement('button');
        closeBtn.textContent = '✕ Close';
        closeBtn.style.cssText = `
            position:fixed;top:16px;right:16px;z-index:10001;
            background:rgba(0,0,0,0.7);color:#fff;border:1px solid #475569;
            padding:8px 16px;border-radius:6px;cursor:pointer;font-size:13px;
        `;
        closeBtn.onclick = function() {
            if (urbanAnim) cancelAnimationFrame(urbanAnim);
            overlay.remove();
        };
        overlay.appendChild(closeBtn);

        // Scene label
        var labels = { subway:'🚇 Subway Station', tokyo:'🏮 Tokyo Neon Street', times:'🗽 Times Square, NYC', mall:'🛍️ Shopping Mall' };
        var sceneLabel = document.createElement('div');
        sceneLabel.style.cssText = 'position:fixed;top:18px;left:20px;z-index:10001;color:#94a3b8;font-size:12px;font-family:sans-serif;';
        sceneLabel.textContent = labels[envType] || '';
        overlay.appendChild(sceneLabel);

        document.body.appendChild(overlay);
        runUrbanScene(cvs, envType);
    }

    function runUrbanScene(cvs, envType) {
        var ctx = cvs.getContext('2d');
        var W = cvs.width, H = cvs.height;
        var particles = [];
        var t = 0;

        // Init particles per scene
        function initParticles() {
            particles = [];
            if (envType === 'subway') {
                for (var i = 0; i < 80; i++) particles.push({ x: Math.random()*W, y: Math.random()*H, vx: -2-Math.random()*2, vy: 0, r: 0.5+Math.random(), type:'dust' });
            } else if (envType === 'tokyo') {
                for (var i = 0; i < 120; i++) particles.push({ x: Math.random()*W, y: Math.random()*H, vy: 4+Math.random()*4, vx: -1, r: 1+Math.random(), type:'rain' });
            } else if (envType === 'times') {
                for (var i = 0; i < 60; i++) particles.push({ x: Math.random()*W, y: Math.random()*H, vx: (Math.random()-0.5)*1.5, vy: -0.5-Math.random(), r: 2+Math.random()*3, type:'confetti', c: ['#ff0','#f0f','#0ff','#f80','#0f8'][Math.floor(Math.random()*5)], rot: Math.random()*Math.PI*2, rotV: (Math.random()-0.5)*0.2 });
            } else if (envType === 'mall') {
                for (var i = 0; i < 40; i++) particles.push({ x: Math.random()*W, y: H*0.5+Math.random()*H*0.5, vx: (Math.random()-0.5)*0.5, vy: 0, r: 1+Math.random()*2, type:'bokeh', a: Math.random() });
            }
        }
        initParticles();

        function drawSubway() {
            // Dark tunnel gradient
            var g = ctx.createLinearGradient(0,0,0,H);
            g.addColorStop(0,'#0a0a0a'); g.addColorStop(0.6,'#111'); g.addColorStop(1,'#1a1010');
            ctx.fillStyle=g; ctx.fillRect(0,0,W,H);

            // Platform floor
            ctx.fillStyle='#1c1c1c'; ctx.fillRect(0, H*0.72, W, H*0.28);
            ctx.fillStyle='#2a2a2a'; ctx.fillRect(0, H*0.72, W, 4);

            // Tiles on wall
            ctx.strokeStyle='#222'; ctx.lineWidth=1;
            for (var x=0;x<W;x+=40) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H*0.72); ctx.stroke(); }
            for (var y=0;y<H*0.72;y+=30) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

            // Fluorescent lights strip
            var lightFlicker = Math.random() > 0.98 ? 0.4 : 1.0;
            for (var lx=60; lx<W; lx+=180) {
                ctx.save();
                ctx.globalAlpha = 0.15 * lightFlicker;
                ctx.fillStyle='#e0f0ff';
                ctx.fillRect(lx-30, 0, 60, 8);
                ctx.shadowColor='#c0e0ff'; ctx.shadowBlur=40;
                ctx.fillRect(lx-30, 0, 60, 8);
                ctx.restore();
            }

            // Pillar columns
            [W*0.15, W*0.5, W*0.85].forEach(function(px) {
                ctx.fillStyle='#1a1a1a';
                ctx.fillRect(px-15, 0, 30, H*0.72);
                ctx.strokeStyle='#333'; ctx.lineWidth=2;
                ctx.strokeRect(px-15, 0, 30, H*0.72);
            });

            // Signage board slot (left side — where poster will go)
            ctx.save();
            ctx.fillStyle='rgba(255,255,255,0.03)';
            ctx.fillRect(W*0.05, H*0.1, W*0.38, H*0.55);
            ctx.strokeStyle='#444'; ctx.lineWidth=3;
            ctx.strokeRect(W*0.05, H*0.1, W*0.38, H*0.55);
            ctx.restore();

            // Overhead track indicator strip
            ctx.fillStyle='#ff4444';
            ctx.fillRect(0, H*0.04, W, 6);
            ctx.fillStyle='#222';
            ctx.font='bold 14px monospace';
            ctx.fillStyle='#fff';
            ctx.textAlign='center';
            ctx.fillText('● LIGNE 4   ▶ GARE DU NORD  ●', W/2, H*0.025);

            // Dust particles
            particles.forEach(function(p) {
                p.x += p.vx; p.y += p.vy;
                if(p.x<0) p.x=W;
                ctx.globalAlpha=0.4+Math.random()*0.3;
                ctx.fillStyle='#888';
                ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
            });
            ctx.globalAlpha=1;
        }

        function drawTokyo() {
            // Night sky
            ctx.fillStyle='#03001a'; ctx.fillRect(0,0,W,H);

            // Buildings silhouette
            [[0,0.3,0.15],[0.15,0.1,0.2],[0.35,0.25,0.18],[0.53,0.05,0.15],[0.68,0.2,0.2],[0.88,0.1,0.12]].forEach(function(b) {
                ctx.fillStyle='#080808';
                ctx.fillRect(b[0]*W, H*(1-b[1]-b[2]), b[2]*W*1.2, H*(b[1]+b[2]));
            });

            // Neon signs (animated flicker)
            var neonSigns = [
                {x:0.05*W, y:0.15*H, w:120, h:30, text:'ラーメン', color:'#ff00aa', fl: Math.random()>0.05},
                {x:0.55*W, y:0.2*H, w:100, h:25, text:'OPEN 24H', color:'#00ffff', fl: Math.random()>0.02},
                {x:0.7*W, y:0.12*H, w:80, h:20, text:'ビール', color:'#ff8800', fl: Math.random()>0.04},
                {x:0.1*W, y:0.38*H, w:140, h:28, text:'KARAOKE', color:'#ff00ff', fl: Math.random()>0.03},
            ];
            neonSigns.forEach(function(ns) {
                if(!ns.fl) return;
                ctx.save();
                ctx.shadowColor=ns.color; ctx.shadowBlur=25;
                ctx.strokeStyle=ns.color; ctx.lineWidth=2;
                ctx.strokeRect(ns.x, ns.y, ns.w, ns.h);
                ctx.fillStyle=ns.color; ctx.font='bold 14px sans-serif'; ctx.textAlign='left';
                ctx.fillText(ns.text, ns.x+6, ns.y+ns.h-8);
                ctx.restore();
            });

            // Road with reflections
            ctx.fillStyle='#0a0a0a'; ctx.fillRect(0, H*0.68, W, H*0.32);
            // Wet road reflections
            var refG = ctx.createLinearGradient(0,H*0.68,0,H);
            refG.addColorStop(0,'rgba(0,200,255,0.08)'); refG.addColorStop(1,'rgba(255,0,150,0.05)');
            ctx.fillStyle=refG; ctx.fillRect(0,H*0.68,W,H*0.32);

            // Rain
            ctx.strokeStyle='rgba(180,200,255,0.5)'; ctx.lineWidth=1;
            particles.forEach(function(p) {
                p.x+=p.vx; p.y+=p.vy;
                if(p.y>H){p.y=0; p.x=Math.random()*W;}
                ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(p.x-2,p.y+14); ctx.stroke();
            });
        }

        function drawTimes() {
            // Dark night bg
            ctx.fillStyle='#050508'; ctx.fillRect(0,0,W,H);

            // LED billboard panels
            var panels = [
                {x:0, y:0, w:W*0.4, h:H*0.55, colors:['#ff1744','#ff9100']},
                {x:W*0.45, y:0, w:W*0.35, h:H*0.45, colors:['#2979ff','#00e5ff']},
                {x:W*0.82, y:0, w:W*0.18, h:H*0.6, colors:['#00e676','#69f0ae']},
                {x:0, y:H*0.6, w:W*0.55, h:H*0.2, colors:['#ffea00','#ff6d00']},
            ];
            panels.forEach(function(p, idx) {
                var pg = ctx.createLinearGradient(p.x, p.y, p.x+p.w, p.y+p.h);
                var phase = (t * 0.5 + idx) % 1;
                pg.addColorStop(0, p.colors[0]+'44');
                pg.addColorStop(phase, p.colors[1]+'88');
                pg.addColorStop(1, p.colors[0]+'22');
                ctx.fillStyle=pg;
                ctx.fillRect(p.x, p.y, p.w, p.h);
                ctx.strokeStyle=p.colors[1]+'88'; ctx.lineWidth=2;
                ctx.strokeRect(p.x+1,p.y+1,p.w-2,p.h-2);
            });

            // Scrolling text ticker
            ctx.fillStyle='rgba(0,0,0,0.9)'; ctx.fillRect(0,H*0.55,W,30);
            ctx.fillStyle='#ff0'; ctx.font='bold 16px monospace'; ctx.textAlign='left';
            var tickerX = W - (t*60)%(W+1200);
            ctx.fillText('★ NEW COLLECTION JUST DROPPED  ●  SHOP NOW AT 50% OFF  ●  LIMITED TIME OFFER  ★  EXCLUSIVE DEALS TODAY  ●', tickerX, H*0.55+20);

            // Street below
            ctx.fillStyle='#0a0a0a'; ctx.fillRect(0, H*0.75, W, H*0.25);
            // Cab lights
            ctx.fillStyle='#ffcc00';
            for (var i=0; i<3; i++) {
                var cx2 = ((t*80 + i*300) % (W+200)) - 100;
                ctx.fillRect(cx2, H*0.8, 80, 25);
                ctx.shadowColor='#ffcc00'; ctx.shadowBlur=20;
                ctx.fillRect(cx2+5, H*0.82, 6, 8);
                ctx.fillRect(cx2+68, H*0.82, 6, 8);
                ctx.shadowBlur=0;
            }

            // Confetti
            particles.forEach(function(p) {
                p.x+=p.vx; p.y+=p.vy; p.rot+=p.rotV;
                if(p.y<0){p.y=H;p.x=Math.random()*W;}
                ctx.save();
                ctx.translate(p.x,p.y); ctx.rotate(p.rot);
                ctx.fillStyle=p.c; ctx.globalAlpha=0.8;
                ctx.fillRect(-p.r,-p.r*0.5,p.r*2,p.r);
                ctx.restore();
            });
        }

        function drawMall() {
            // Marble floor tiles
            var mg = ctx.createLinearGradient(0,0,0,H);
            mg.addColorStop(0,'#e8e8e8'); mg.addColorStop(0.5,'#f5f5f5'); mg.addColorStop(1,'#d0d0d0');
            ctx.fillStyle=mg; ctx.fillRect(0,0,W,H);

            // Floor tiles grid
            ctx.strokeStyle='rgba(200,200,210,0.7)'; ctx.lineWidth=1;
            for(var x=0;x<W;x+=80){ ctx.beginPath();ctx.moveTo(x,H*0.6);ctx.lineTo(x+200,H);ctx.stroke(); }
            for(var x=0;x<W;x+=80){ ctx.beginPath();ctx.moveTo(x,H*0.6);ctx.lineTo(x-200,H);ctx.stroke(); }

            // Ceiling
            ctx.fillStyle='#f8f8ff'; ctx.fillRect(0,0,W,H*0.08);
            // Recessed lighting
            for(var lx=80;lx<W;lx+=160){
                var rg = ctx.createRadialGradient(lx,H*0.04,0,lx,H*0.04,120);
                rg.addColorStop(0,'rgba(255,250,230,0.6)'); rg.addColorStop(1,'rgba(255,250,230,0)');
                ctx.fillStyle=rg; ctx.fillRect(lx-120,0,240,H*0.5);
            }

            // Store fronts
            [[0,0.2],[0.6,0.25],[0.8,0.15]].forEach(function(sf,i){
                ctx.fillStyle='rgba(240,240,255,0.5)';
                ctx.fillRect(sf[0]*W, H*0.08, sf[1]*W, H*0.52);
                ctx.strokeStyle='#ccc'; ctx.lineWidth=2;
                ctx.strokeRect(sf[0]*W, H*0.08, sf[1]*W, H*0.52);
                ctx.fillStyle='#888'; ctx.font='bold 14px sans-serif'; ctx.textAlign='center';
                ctx.fillText(['ZARA', 'H&M', 'GUCCI'][i], (sf[0]+sf[1]/2)*W, H*0.15);
            });

            // Bokeh lights
            particles.forEach(function(p) {
                p.a += 0.02; if(p.a>Math.PI*2) p.a=0;
                var alpha = 0.3 + Math.sin(p.a)*0.2;
                ctx.save();
                ctx.globalAlpha=alpha;
                var pg2 = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*8);
                pg2.addColorStop(0,'rgba(255,240,180,0.8)'); pg2.addColorStop(1,'rgba(255,240,180,0)');
                ctx.fillStyle=pg2;
                ctx.beginPath(); ctx.arc(p.x,p.y,p.r*8,0,Math.PI*2); ctx.fill();
                ctx.restore();
            });
        }

        function frame() {
            urbanAnim = requestAnimationFrame(frame);
            t += 0.016;
            if(envType==='subway') drawSubway();
            else if(envType==='tokyo') drawTokyo();
            else if(envType==='times') drawTimes();
            else if(envType==='mall') drawMall();
        }
        frame();
    }

    /* ══════════════════════════════════════════════════
       EXPORT IMAGE
       ══════════════════════════════════════════════════ */
    function exportImage() {
        var tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.left = '-9999px';
        tempDiv.style.top = '0';
        tempDiv.style.width = '800px';
        tempDiv.style.height = '1200px';
        
        var bgUrl = state.bgImage || '';
        tempDiv.innerHTML = `
            <style>
                .placard { ${getShapeCSS(2)} background-color:#1e293b; background-size:cover; background-position:center; position:relative; overflow:hidden; display:flex; }
                .overlay { position:absolute; top:0; left:0; right:0; bottom:0; pointer-events:none; }
                .el { position:absolute; white-space:nowrap; text-shadow:0 2px 4px rgba(0,0,0,0.5); font-weight:bold; z-index:10; }
                .qr-code { position:absolute; z-index:11; background:#fff; padding:10px; border-radius:10px; box-shadow:0 4px 10px rgba(0,0,0,0.5); }
                .stamp { position:absolute; z-index:12; font-weight:900; text-transform:uppercase; border:8px solid; padding:10px 30px; border-radius:20px; transform:rotate(-15deg); box-shadow:0 8px 20px rgba(0,0,0,0.3); background:rgba(255,255,255,0.1); }
                .style-glass .overlay { background: rgba(255, 255, 255, 0.1); border: 4px solid rgba(255, 255, 255, 0.3); border-radius: 20px; }
                .style-brutalist .overlay { background: #ffea00; border: 16px solid #000; border-radius: 0; }
                .style-brutalist { border-radius: 0 !important; }
                .style-3dfloat .overlay { background: linear-gradient(145deg, rgba(30,41,59,0.8), rgba(15,23,42,0.9)); border: 4px solid #334155; border-radius: 20px; }
                .style-cyber .overlay { background: rgba(0,0,0,0.4); border: 8px solid #0ff; border-radius: 0; }
                .style-cyber { border-radius: 0 !important; }
                .style-holo .overlay { background: linear-gradient(125deg, rgba(255,0,0,0.2), rgba(255,255,0,0.2), rgba(0,255,0,0.2), rgba(0,255,255,0.2), rgba(0,0,255,0.2), rgba(255,0,255,0.2)); border: 4px solid rgba(255,255,255,0.8); border-radius: 30px; }
                .style-neon .overlay { background: rgba(10,10,10,0.85); border: 8px solid #ff00ff; border-radius: 20px; }
                .style-badge { border-radius: 400px !important; }
                .style-badge .overlay { background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.7) 100%); border: 20px solid #fff; border-radius: 400px; }
                .style-grunge { border-radius: 0 !important; }
                .style-grunge .overlay { background: rgba(0,0,0,0.6); border: 8px dashed #fff; outline: 30px solid #000; outline-offset: -30px; }
            </style>
            <div class="placard style-${state.bgType}" style="background-image:url('${bgUrl}');">
                <div class="overlay"></div>
                <div class="el" style="left:${state.titlePos.x * 2}px; top:${state.titlePos.y * 2}px; font-size:${state.titleSize * 2}px; color:${state.titleColor};">${state.title}</div>
                <div class="el" style="left:${state.pricePos.x * 2}px; top:${state.pricePos.y * 2}px; font-size:${state.priceSize * 2}px; color:${state.priceColor};">${state.price}</div>
                <div class="el" style="left:${state.detailsPos.x * 2}px; top:${state.detailsPos.y * 2}px; font-size:${state.detailsSize * 2}px; color:${state.detailsColor}; font-weight:normal;">${state.details}</div>
                <div class="el" style="left:${state.contactPos.x * 2}px; top:${state.contactPos.y * 2}px; font-size:${state.contactSize * 2}px; color:${state.contactColor};">${state.contact}</div>
                
                ${state.showQR ? `<div class="qr-code" style="left:${state.qrPos.x * 2}px; top:${state.qrPos.y * 2}px;"><img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(state.qrLink)}" width="160" height="160" style="display:block; pointer-events:none;"></div>` : ''}
                
                ${state.stamp ? `<div class="stamp" style="left:${state.stampPos.x * 2}px; top:${state.stampPos.y * 2}px; color:${state.stampColor}; border-color:${state.stampColor}; font-size:56px;">${state.stamp}</div>` : ''}
            </div>
        `;
        document.body.appendChild(tempDiv);

        if (typeof html2canvas === 'undefined') {
            alert("Vă rugăm să așteptați o secundă. Motorul foto se încarcă...");
            return;
        }

        setTimeout(function() {
            var placard = tempDiv.querySelector('.placard');
            html2canvas(placard, { useCORS: true, scale: 2, backgroundColor: null }).then(function(canvas) {
                var a = document.createElement('a');
                a.href = canvas.toDataURL('image/png', 1.0);
                a.download = 'smart-signage-hq.png';
                a.click();
                document.body.removeChild(tempDiv);
            }).catch(function(err) {
                alert("Eroare la exportul foto. Încercați o imagine mai mică de fundal.");
                document.body.removeChild(tempDiv);
            });
        }, 500);
    }
})();
