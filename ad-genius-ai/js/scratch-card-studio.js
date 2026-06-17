(function() {
    'use strict';

    var _prevRenderTab = window.renderTab;
    window.renderTab = function(tab) {
        if (tab === 'scratch-card') {
            window.activeTab = tab;
            document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
            var btn = document.getElementById('tab-' + tab);
            if (btn) btn.classList.add('active');
            
            document.querySelectorAll('.center-panel, .right-panel, .workspace').forEach(el => el.style.display = 'none');
            var ws = document.getElementById('scratch-card-workspace');
            if (ws) ws.style.display = 'flex';
            
            var c = document.getElementById('sc-center');
            var r = document.getElementById('sc-right');
            if(c) c.style.display = 'flex';
            if(r) r.style.display = 'block';
            
            buildUI();
            return;
        }
        if (_prevRenderTab) _prevRenderTab(tab);
    };

    var S = {
        offerHead: '30% OFF',
        offerSub: 'PROMO CODE: ADGENIUS30',
        btnText: 'Claim Coupon',
        btnUrl: 'https://ia-codestudio.com',
        coverType: 'silver', // silver, gold, custom
        coverColor: '#718096',
        coverText: 'Scratch to Reveal!',
        bgColor: '#1e293b',
        textColor: '#ffffff',
        accentColor: '#fbbf24',
        brushSize: 30,
        
        // Internal variables
        scratched: false
    };

    function buildUI() {
        var r = document.getElementById('sc-right');
        var c = document.getElementById('sc-center');
        if(!r || !c) return;

        var fr = window.lang === 'fr';

        if (fr && S.coverText === 'Scratch to Reveal!') {
            S.coverText = 'Grattez pour révéler !';
            S.offerHead = '30% DE RÉDUCTION';
            S.btnText = 'Profiter de l\'offre';
        } else if (!fr && S.coverText === 'Grattez pour révéler !') {
            S.coverText = 'Scratch to Reveal!';
            S.offerHead = '30% OFF';
            S.btnText = 'Claim Coupon';
        }

        // Setup center panel layout
        c.innerHTML = `
            <div class="scratch-card-preview-container">
                <!-- Under card showing coupon info -->
                <div class="scratch-card-under" style="background:${S.bgColor}; color:${S.textColor}; border-color:${S.accentColor}30;">
                    <div style="font-size:36px; font-weight:800; margin-bottom:10px; color:${S.accentColor}; font-family:'Outfit',sans-serif;">${S.offerHead}</div>
                    <div style="font-size:14px; font-weight:500; margin-bottom:25px; opacity:0.8; font-family:'Inter',sans-serif; letter-spacing:0.5px;">${S.offerSub}</div>
                    <a href="${S.btnUrl}" target="_blank" style="display:inline-block; background:${S.accentColor}; color:#000; font-weight:bold; font-size:13px; text-decoration:none; padding:10px 24px; border-radius:30px; box-shadow:0 4px 12px ${S.accentColor}40; pointer-events:auto; font-family:'Inter',sans-serif; transition:transform 0.2s;">${S.btnText}</a>
                </div>
                <!-- Scratch canvas on top -->
                <canvas id="scratch-canvas" class="scratch-card-canvas" width="320" height="460"></canvas>
            </div>
        `;

        // Controls
        var labelHead = fr ? "Titre de l'Offre :" : "Offer Headline:";
        var labelSub = fr ? "Sous-titre / Code :" : "Sub-headline / Code:";
        var labelCtaText = fr ? "Texte du Bouton :" : "Button Text:";
        var labelCtaUrl = fr ? "Lien de Destination :" : "Destination Link:";
        var labelCoverStyle = fr ? "Style de la Couverture :" : "Cover Layer Style:";
        var labelCoverText = fr ? "Texte d'Incitation :" : "Cover Text Prompt:";
        var labelBrushSize = fr ? "Taille du Pinceau :" : "Scratch Brush Size:";
        var labelColors = fr ? "Esthétique du Coupon :" : "Coupon Design Colors:";
        var labelBg = fr ? "Fond" : "Background";
        var labelTxt = fr ? "Texte" : "Text";
        var labelAcc = fr ? "Accent" : "Accent";
        
        var optSilver = fr ? "Argent Métallisé" : "Metallic Silver";
        var optGold = fr ? "Or Métallisé" : "Metallic Gold";
        var optCustom = fr ? "Couleur Unie" : "Custom Solid Color";
        
        var btnExportHtml = fr ? "Exporter Carte à Gratter HTML" : "Export Scratch Card HTML";
        var btnReset = fr ? "Réinitialiser la Carte" : "Reset Scratch Card";

        r.innerHTML = `
            <div style="color:white;font-family:sans-serif;padding-bottom:20px;">
                <h2 style="margin:0 0 5px;color:#ffd700;font-size:18px;">🎟️ Scratch Card Studio</h2>
                <p style="margin:0 0 15px;font-size:11px;color:#94a3b8;">Interactive Lead Generation Banners</p>
                
                <div style="display:flex;flex-direction:column;gap:12px;">
                    <div>
                        <label style="font-size:11px;color:#fef08a;display:block;margin-bottom:4px;">${labelHead}</label>
                        <input type="text" id="sc-inp-head" value="${S.offerHead}" style="width:100%;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                    </div>

                    <div>
                        <label style="font-size:11px;color:#fef08a;display:block;margin-bottom:4px;">${labelSub}</label>
                        <input type="text" id="sc-inp-sub" value="${S.offerSub}" style="width:100%;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                    </div>

                    <div>
                        <label style="font-size:11px;color:#fef08a;display:block;margin-bottom:4px;">${labelCtaText}</label>
                        <input type="text" id="sc-inp-cta" value="${S.btnText}" style="width:100%;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                    </div>

                    <div>
                        <label style="font-size:11px;color:#fef08a;display:block;margin-bottom:4px;">${labelCtaUrl}</label>
                        <input type="text" id="sc-inp-url" value="${S.btnUrl}" style="width:100%;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                    </div>

                    <hr style="border:0;border-top:1px solid #334155;margin:8px 0;">

                    <div>
                        <label style="font-size:11px;color:#fbcfe8;display:block;margin-bottom:4px;">${labelCoverStyle}</label>
                        <select id="sc-cover-type" style="width:100%;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;margin-bottom:5px;">
                            <option value="silver">${optSilver}</option>
                            <option value="gold">${optGold}</option>
                            <option value="custom">${optCustom}</option>
                        </select>
                        <input type="color" id="sc-cover-color" value="${S.coverColor}" style="width:100%;height:25px;border:none;background:transparent;cursor:pointer;display:none;">
                    </div>

                    <div>
                        <label style="font-size:11px;color:#fbcfe8;display:block;margin-bottom:4px;">${labelCoverText}</label>
                        <input type="text" id="sc-inp-cover-text" value="${S.coverText}" style="width:100%;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                    </div>

                    <div>
                        <label style="font-size:11px;color:#fbcfe8;display:block;margin-bottom:4px;">${labelBrushSize} (<span id="sc-val-brush">${S.brushSize}px</span>)</label>
                        <input type="range" id="sc-brush" min="15" max="60" value="${S.brushSize}" style="width:100%;">
                    </div>

                    <hr style="border:0;border-top:1px solid #334155;margin:8px 0;">

                    <label style="font-size:11px;color:#93c5fd;font-weight:bold;margin-bottom:-4px;">${labelColors}</label>

                    <div style="display:flex;gap:5px;">
                        <div style="flex:1;">
                            <span style="font-size:9px;color:#94a3b8;display:block;">${labelBg}</span>
                            <input type="color" id="sc-col-bg" value="${S.bgColor}" style="width:100%;height:30px;border:none;background:transparent;cursor:pointer;">
                        </div>
                        <div style="flex:1;">
                            <span style="font-size:9px;color:#94a3b8;display:block;">${labelTxt}</span>
                            <input type="color" id="sc-col-txt" value="${S.textColor}" style="width:100%;height:30px;border:none;background:transparent;cursor:pointer;">
                        </div>
                        <div style="flex:1;">
                            <span style="font-size:9px;color:#94a3b8;display:block;">${labelAcc}</span>
                            <input type="color" id="sc-col-acc" value="${S.accentColor}" style="width:100%;height:30px;border:none;background:transparent;cursor:pointer;">
                        </div>
                    </div>

                    <hr style="border:0;border-top:1px solid #334155;margin:8px 0;">

                    <button id="sc-btn-html" style="width:100%;background:linear-gradient(135deg,#f59e0b,#d97706);color:#000;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;box-shadow:0 4px 10px rgba(245,158,11,0.2);">🌐 ${btnExportHtml}</button>
                    <button id="sc-btn-reset" style="width:100%;background:#334155;color:#fff;border:1px solid #475569;padding:10px;border-radius:6px;font-weight:bold;cursor:pointer;">🔄 ${btnReset}</button>
                </div>
            </div>
        `;

        setupListeners();
        initCanvas();
    }

    function setupListeners() {
        document.getElementById('sc-inp-head').oninput = e => {
            S.offerHead = e.target.value;
            buildUI();
        };
        document.getElementById('sc-inp-sub').oninput = e => {
            S.offerSub = e.target.value;
            buildUI();
        };
        document.getElementById('sc-inp-cta').oninput = e => {
            S.btnText = e.target.value;
            buildUI();
        };
        document.getElementById('sc-inp-url').oninput = e => {
            S.btnUrl = e.target.value;
            buildUI();
        };
        document.getElementById('sc-inp-cover-text').oninput = e => {
            S.coverText = e.target.value;
            initCanvas(); // redraw cover text
        };
        document.getElementById('sc-brush').oninput = e => {
            S.brushSize = parseInt(e.target.value, 10);
            document.getElementById('sc-val-brush').textContent = S.brushSize + 'px';
        };

        var typeSel = document.getElementById('sc-cover-type');
        var colInp = document.getElementById('sc-cover-color');
        typeSel.value = S.coverType;
        if(S.coverType === 'custom') colInp.style.display = 'block';

        typeSel.onchange = e => {
            S.coverType = e.target.value;
            if (S.coverType === 'custom') {
                colInp.style.display = 'block';
            } else {
                colInp.style.display = 'none';
            }
            initCanvas();
        };
        colInp.oninput = e => {
            S.coverColor = e.target.value;
            initCanvas();
        };

        document.getElementById('sc-col-bg').oninput = e => { S.bgColor = e.target.value; buildUI(); };
        document.getElementById('sc-col-txt').oninput = e => { S.textColor = e.target.value; buildUI(); };
        document.getElementById('sc-col-acc').oninput = e => { S.accentColor = e.target.value; buildUI(); };

        document.getElementById('sc-btn-reset').onclick = function() {
            S.scratched = false;
            initCanvas();
        };
        document.getElementById('sc-btn-html').onclick = exportHTML;
    }

    function initCanvas() {
        var cvs = document.getElementById('scratch-canvas');
        if(!cvs) return;
        var ctx = cvs.getContext('2d');
        
        ctx.globalCompositeOperation = 'source-over';
        ctx.clearRect(0, 0, cvs.width, cvs.height);

        // Fill Cover Layer
        if (S.coverType === 'silver') {
            var grad = ctx.createLinearGradient(0, 0, cvs.width, cvs.height);
            grad.addColorStop(0, '#bdc3c7');
            grad.addColorStop(0.5, '#eaedf1');
            grad.addColorStop(1, '#95a5a6');
            ctx.fillStyle = grad;
        } else if (S.coverType === 'gold') {
            var grad = ctx.createLinearGradient(0, 0, cvs.width, cvs.height);
            grad.addColorStop(0, '#d4af37');
            grad.addColorStop(0.5, '#f3e5ab');
            grad.addColorStop(1, '#aa771c');
            ctx.fillStyle = grad;
        } else {
            ctx.fillStyle = S.coverColor;
        }
        ctx.fillRect(0, 0, cvs.width, cvs.height);

        // Detect fingerprinting protection
        var isFingerprintProtected = false;
        try {
            var testPixel = ctx.getImageData(0, 0, 1, 1).data;
            if (testPixel[3] === 0) {
                isFingerprintProtected = true;
            }
        } catch (e) {
            isFingerprintProtected = true;
        }

        // Draw Cover Texture/Dots
        ctx.fillStyle = 'rgba(255,255,255,0.06)';
        for(var i=0; i<300; i++) {
            ctx.beginPath();
            ctx.arc(Math.random()*cvs.width, Math.random()*cvs.height, Math.random()*2 + 1, 0, Math.PI*2);
            ctx.fill();
        }

        // Draw cover text prompt
        ctx.font = "bold 20px 'Inter', sans-serif";
        ctx.textAlign = 'center';
        ctx.fillStyle = S.coverType === 'silver' ? '#555555' : (S.coverType === 'gold' ? '#4a3600' : '#ffffff');
        ctx.fillText(S.coverText, cvs.width / 2, cvs.height / 2);

        // Enable Scratch Logic
        var isDrawing = false;
        var scratchDistance = 0;
        var lastX = null, lastY = null;
        
        function getCoords(e) {
            var rect = cvs.getBoundingClientRect();
            var x, y;
            if(e.touches) {
                x = e.touches[0].clientX - rect.left;
                y = e.touches[0].clientY - rect.top;
            } else {
                x = e.clientX - rect.left;
                y = e.clientY - rect.top;
            }
            return {
                x: x * (cvs.width / rect.width),
                y: y * (cvs.height / rect.height)
            };
        }

        function scratch(x, y) {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, S.brushSize, 0, Math.PI*2);
            ctx.fill();

            if (lastX !== null && lastY !== null) {
                var dx = x - lastX;
                var dy = y - lastY;
                scratchDistance += Math.sqrt(dx*dx + dy*dy);
            }
            lastX = x;
            lastY = y;
        }

        function handleStart(e) {
            isDrawing = true;
            var c = getCoords(e);
            lastX = c.x;
            lastY = c.y;
            scratch(c.x, c.y);
            e.preventDefault();
        }

        function handleMove(e) {
            if(!isDrawing) return;
            var c = getCoords(e);
            scratch(c.x, c.y);
            e.preventDefault();
        }

        function handleEnd() {
            if(!isDrawing) return;
            isDrawing = false;
            lastX = null;
            lastY = null;
            checkScratchedPercent();
        }

        cvs.addEventListener('mousedown', handleStart);
        cvs.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseup', handleEnd);

        cvs.addEventListener('touchstart', handleStart);
        cvs.addEventListener('touchmove', handleMove);
        window.addEventListener('touchend', handleEnd);

        function checkScratchedPercent() {
            if(S.scratched) return;

            if (isFingerprintProtected) {
                if (scratchDistance > 400) {
                    S.scratched = true;
                    cvs.style.opacity = '0';
                    cvs.style.pointerEvents = 'none';
                }
                return;
            }

            try {
                var imgData = ctx.getImageData(0, 0, cvs.width, cvs.height);
                var pixels = imgData.data;
                var total = pixels.length / 4;
                var cleared = 0;
                for(var i=3; i<pixels.length; i+=40) { // step through to optimize performance
                    if(pixels[i] === 0) cleared++;
                }
                
                // Privacy protection safeguard: if canvas read returns all-zeros but user hasn't scratched
                if (cleared > (total / 10) * 0.9 && scratchDistance < 100) {
                    isFingerprintProtected = true;
                    return;
                }

                var ratio = (cleared / (total / 10)); // scaled ratio
                if(ratio > 0.45) {
                    S.scratched = true;
                    cvs.style.opacity = '0';
                    cvs.style.pointerEvents = 'none';
                }
            } catch (err) {
                isFingerprintProtected = true;
                if (scratchDistance > 400) {
                    S.scratched = true;
                    cvs.style.opacity = '0';
                    cvs.style.pointerEvents = 'none';
                }
            }
        }
    }

    function exportHTML() {
        var fillCode = '';
        if (S.coverType === 'silver') {
            fillCode = 'var grad = ctx.createLinearGradient(0, 0, cvs.width, cvs.height); grad.addColorStop(0, "#bdc3c7"); grad.addColorStop(0.5, "#eaedf1"); grad.addColorStop(1, "#95a5a6"); ctx.fillStyle = grad;';
        } else if (S.coverType === 'gold') {
            fillCode = 'var grad = ctx.createLinearGradient(0, 0, cvs.width, cvs.height); grad.addColorStop(0, "#d4af37"); grad.addColorStop(0.5, "#f3e5ab"); grad.addColorStop(1, "#aa771c"); ctx.fillStyle = grad;';
        } else {
            fillCode = 'ctx.fillStyle = "' + S.coverColor + '";';
        }

        var textCol = S.coverType === 'silver' ? '#555555' : (S.coverType === 'gold' ? '#4a3600' : '#ffffff');

        var css = `
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { background: #0b0f19; overflow: hidden; font-family: 'Inter', system-ui, sans-serif; height: 100vh; display: flex; align-items: center; justify-content: center; }
            .container { width: 320px; height: 460px; position: relative; user-select: none; -webkit-user-select: none; }
            canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 16px; cursor: crosshair; z-index: 10; transition: opacity 0.5s ease; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
            .card { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: ${S.bgColor}; color: ${S.textColor}; border-radius: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 30px; box-sizing: border-box; text-align: center; border: 2px solid rgba(255, 255, 255, 0.1); z-index: 1; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
            h1 { font-family: 'Outfit', sans-serif; font-size: 34px; font-weight: 800; margin-bottom: 10px; color: ${S.accentColor}; }
            p { font-size: 14px; opacity: 0.8; margin-bottom: 25px; }
            a { display: inline-block; background: ${S.accentColor}; color: #000; font-weight: bold; font-size: 13px; text-decoration: none; padding: 12px 28px; border-radius: 30px; box-shadow: 0 4px 12px ${S.accentColor}40; transition: transform 0.2s; }
            a:hover { transform: scale(1.05); }
        `;

        var js = `
            var cvs = document.getElementById('scratch');
            var ctx = cvs.getContext('2d');
            var isDrawing = false;
            var scratched = false;
            var isFingerprintProtected = false;
            var scratchDistance = 0;
            var lastX = null, lastY = null;

            function init() {
                ctx.globalCompositeOperation = 'source-over';
                ${fillCode}
                ctx.fillRect(0, 0, cvs.width, cvs.height);
                
                // Test if fingerprinting protection is active
                try {
                    var testPixel = ctx.getImageData(0, 0, 1, 1).data;
                    if (testPixel[3] === 0) {
                        isFingerprintProtected = true;
                    }
                } catch (e) {
                    isFingerprintProtected = true;
                }

                ctx.fillStyle = 'rgba(255,255,255,0.06)';
                for(var i=0; i<300; i++) {
                    ctx.beginPath();
                    ctx.arc(Math.random()*cvs.width, Math.random()*cvs.height, Math.random()*2 + 1, 0, Math.PI*2);
                    ctx.fill();
                }
                ctx.font = "bold 20px 'Inter', sans-serif";
                ctx.textAlign = 'center';
                ctx.fillStyle = "${textCol}";
                ctx.fillText("${S.coverText}", cvs.width / 2, cvs.height / 2);
            }
            init();

            function getCoords(e) {
                var rect = cvs.getBoundingClientRect();
                var x = e.touches ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
                var y = e.touches ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
                return { x: x * (cvs.width / rect.width), y: y * (cvs.height / rect.height) };
            }

            function scratch(x, y) {
                ctx.globalCompositeOperation = 'destination-out';
                ctx.beginPath();
                ctx.arc(x, y, ${S.brushSize}, 0, Math.PI*2);
                ctx.fill();

                if (lastX !== null && lastY !== null) {
                    var dx = x - lastX;
                    var dy = y - lastY;
                    scratchDistance += Math.sqrt(dx*dx + dy*dy);
                }
                lastX = x;
                lastY = y;
            }

            cvs.addEventListener('mousedown', function(e) { 
                isDrawing = true; 
                var c = getCoords(e); 
                lastX = c.x;
                lastY = c.y;
                scratch(c.x, c.y); 
            });
            cvs.addEventListener('mousemove', function(e) { 
                if(isDrawing) { 
                    var c = getCoords(e); 
                    scratch(c.x, c.y); 
                } 
            });
            window.addEventListener('mouseup', function() { 
                if(isDrawing) { 
                    isDrawing = false; 
                    lastX = null;
                    lastY = null;
                    check(); 
                } 
            });

            cvs.addEventListener('touchstart', function(e) { 
                isDrawing = true; 
                var c = getCoords(e); 
                lastX = c.x;
                lastY = c.y;
                scratch(c.x, c.y); 
                e.preventDefault(); 
            });
            cvs.addEventListener('touchmove', function(e) { 
                if(isDrawing) { 
                    var c = getCoords(e); 
                    scratch(c.x, c.y); 
                    e.preventDefault(); 
                } 
            });
            window.addEventListener('touchend', function() { 
                if(isDrawing) { 
                    isDrawing = false; 
                    lastX = null;
                    lastY = null;
                    check(); 
                } 
            });

            function check() {
                if(scratched) return;

                if (isFingerprintProtected) {
                    if (scratchDistance > 400) {
                        scratched = true;
                        cvs.style.opacity = '0';
                        cvs.style.pointerEvents = 'none';
                    }
                    return;
                }

                try {
                    var imgData = ctx.getImageData(0, 0, cvs.width, cvs.height);
                    var pixels = imgData.data;
                    var total = pixels.length / 4;
                    var cleared = 0;
                    for(var i=3; i<pixels.length; i+=40) {
                        if(pixels[i] === 0) cleared++;
                    }
                    
                    // Privacy protection safeguard: if canvas read returns all-zeros but user hasn't scratched
                    if (cleared > (total / 10) * 0.9 && scratchDistance < 100) {
                        isFingerprintProtected = true;
                        return;
                    }

                    if((cleared / (total / 10)) > 0.45) {
                        scratched = true;
                        cvs.style.opacity = '0';
                        cvs.style.pointerEvents = 'none';
                    }
                } catch (err) {
                    isFingerprintProtected = true;
                    if (scratchDistance > 400) {
                        scratched = true;
                        cvs.style.opacity = '0';
                        cvs.style.pointerEvents = 'none';
                    }
                }
            }
        `;

        var html = '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Scratch Card Ad</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Outfit:wght@800&display=swap" rel="stylesheet"><style>' + css + '</style></head><body>';
        html += '<div class="container">';
        html += '<div class="card"><h1>' + S.offerHead + '</h1><p>' + S.offerSub + '</p><a href="' + S.btnUrl + '" target="_blank">' + S.btnText + '</a></div>';
        html += '<canvas id="scratch" width="320" height="460"></canvas>';
        html += '</div>';
        html += '<script>' + js + '</script></body></html>';

        var blob = new Blob([html], { type: 'text/html' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'scratch-card.html';
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 2000);
    }
})();
