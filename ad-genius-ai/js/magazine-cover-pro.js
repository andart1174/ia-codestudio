(function() {
    'use strict';
    
    var _prevRenderTab = window.renderTab;
    window.renderTab = function(tab) {
        if (tab === 'magazine-cover') {
            window.activeTab = tab;
            document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
            var btn = document.getElementById('tab-' + tab);
            if (btn) btn.classList.add('active');
            
            document.querySelectorAll('.center-panel, .right-panel, .workspace').forEach(el => el.style.display = 'none');
            var ws = document.getElementById(tab + '-workspace');
            if (ws) ws.style.display = 'flex';
            
            var c = document.getElementById('mcs-center');
            var r = document.getElementById('mcs-right');
            if(c) c.style.display = 'flex';
            if(r) r.style.display = 'block';
            
            if(!window.mcsInitialized) {
                buildUI();
                window.mcsInitialized = true;
            }
            return;
        }
        if (_prevRenderTab) _prevRenderTab(tab);
    };

    var state = {
        bgImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
        magazineName: 'FORBES',
        magColor: '#ffffff',
        magBehind: false,
        headline: 'THE NEW ERA OF BUSINESS',
        headColor: '#ffea00',
        subtext: 'How one entrepreneur is changing everything. Exclusive interview inside.',
        subColor: '#ffffff',
        barcode: true
    };

    var isDragging = false;
    var currentEl = null;
    var startX, startY, initialX, initialY;
    var elementsPos = {
        magTitle: {x: 50, y: 50},
        headline: {x: 30, y: 500},
        subtext: {x: 30, y: 580}
    };

    function buildUI() {
        var c = document.getElementById('mcs-center');
        var r = document.getElementById('mcs-right');
        if(!c || !r) return;

        c.innerHTML = `
            <div id="mcs-canvas" style="width:500px; height:700px; background:#111; position:relative; overflow:hidden; box-shadow:0 20px 50px rgba(0,0,0,0.5); cursor:grab;">
                <div id="mcs-bg" style="position:absolute;top:0;left:0;width:100%;height:100%;background-size:cover;background-position:center;"></div>
                
                <!-- Border Effect -->
                <div style="position:absolute;top:15px;left:15px;right:15px;bottom:15px;border:4px solid #fff;pointer-events:none;z-index:2;"></div>
                
                <div id="mcs-el-magTitle" class="mcs-drag" style="position:absolute;font-family:'Times New Roman', Times, serif;font-size:100px;font-weight:900;text-transform:uppercase;letter-spacing:-2px;line-height:0.8;text-shadow:0 5px 15px rgba(0,0,0,0.5);z-index:10;user-select:none;"></div>
                <div id="mcs-el-headline" class="mcs-drag" style="position:absolute;font-family:-apple-system, sans-serif;font-size:46px;font-weight:900;text-transform:uppercase;line-height:1;text-shadow:0 2px 10px rgba(0,0,0,0.8);z-index:11;user-select:none;max-width:440px;"></div>
                <div id="mcs-el-subtext" class="mcs-drag" style="position:absolute;font-family:-apple-system, sans-serif;font-size:18px;font-weight:500;line-height:1.4;text-shadow:0 2px 5px rgba(0,0,0,0.8);z-index:12;user-select:none;max-width:300px;"></div>
                
                <div id="mcs-barcode" style="position:absolute;bottom:25px;right:25px;background:#fff;padding:5px;z-index:15;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/UPC-A-036000291452.svg/1200px-UPC-A-036000291452.svg.png" style="height:40px;width:auto;display:block;">
                </div>
            </div>
        `;

        r.innerHTML = `
            <div style="color:white;font-family:sans-serif;">
                <h2 style="margin:0 0 5px;color:#ff0032;font-size:18px;">📰 Magazine Cover</h2>
                <p style="margin:0 0 15px;font-size:11px;color:#94a3b8;">Drag & Drop text to design covers</p>
                
                <label style="font-size:11px;color:#fef08a;">Cover Image (Person/Product):</label>
                <input type="file" id="mcs-bg-file" accept="image/*" style="width:100%;font-size:11px;margin-bottom:15px;color:#94a3b8;">

                <div style="margin-bottom:10px;">
                    <label style="font-size:11px;color:#fef08a;">Magazine Name:</label>
                    <input type="text" id="inp-mcs-mag" value="${state.magazineName}" style="width:100%;margin-bottom:5px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                    <div style="display:flex;gap:10px;align-items:center;">
                        <input type="color" id="col-mcs-mag" value="${state.magColor}" style="width:40px;height:30px;border:none;background:none;cursor:pointer;">
                        <label style="font-size:11px;cursor:pointer;"><input type="checkbox" id="chk-mcs-behind"> Send to Back (Behind Border)</label>
                    </div>
                </div>
                
                <div style="margin-bottom:10px;">
                    <label style="font-size:11px;color:#fef08a;">Main Headline:</label>
                    <textarea id="inp-mcs-head" style="width:100%;height:60px;margin-bottom:5px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">${state.headline}</textarea>
                    <input type="color" id="col-mcs-head" value="${state.headColor}" style="width:100%;height:30px;border:none;background:none;cursor:pointer;">
                </div>

                <div style="margin-bottom:15px;">
                    <label style="font-size:11px;color:#fef08a;">Subtext / Details:</label>
                    <textarea id="inp-mcs-sub" style="width:100%;height:60px;margin-bottom:5px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">${state.subtext}</textarea>
                    <input type="color" id="col-mcs-sub" value="${state.subColor}" style="width:100%;height:30px;border:none;background:none;cursor:pointer;">
                </div>
                
                <label style="font-size:11px;cursor:pointer;display:block;margin-bottom:15px;">
                    <input type="checkbox" id="chk-mcs-barcode" checked> Show Barcode
                </label>

                <button id="mcs-btn-img" style="width:100%;background:linear-gradient(135deg,#ff0032,#ff3278);color:#fff;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;margin-bottom:10px;box-shadow:0 4px 15px rgba(255,0,50,0.3);transition:transform 0.2s;">📸 Export High-Res PNG</button>
                <button id="mcs-btn-html" style="width:100%;background:linear-gradient(135deg,#00d2ff,#3a7bd5);color:#fff;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;box-shadow:0 4px 15px rgba(0,210,255,0.3);transition:transform 0.2s;">✨ Export 3D Interactive HTML</button>
            </div>
        `;

        setupListeners();
        initDraggable();
        renderPreview();
    }

    function setupListeners() {
        document.getElementById('inp-mcs-mag').addEventListener('input', e => { state.magazineName = e.target.value; renderPreview(); });
        document.getElementById('col-mcs-mag').addEventListener('input', e => { state.magColor = e.target.value; renderPreview(); });
        document.getElementById('chk-mcs-behind').addEventListener('change', e => { state.magBehind = e.target.checked; renderPreview(); });
        
        document.getElementById('inp-mcs-head').addEventListener('input', e => { state.headline = e.target.value; renderPreview(); });
        document.getElementById('col-mcs-head').addEventListener('input', e => { state.headColor = e.target.value; renderPreview(); });
        
        document.getElementById('inp-mcs-sub').addEventListener('input', e => { state.subtext = e.target.value; renderPreview(); });
        document.getElementById('col-mcs-sub').addEventListener('input', e => { state.subColor = e.target.value; renderPreview(); });
        
        document.getElementById('chk-mcs-barcode').addEventListener('change', e => { state.barcode = e.target.checked; renderPreview(); });

        document.getElementById('mcs-bg-file').addEventListener('change', e => {
            var file = e.target.files[0];
            if(file) {
                var r = new FileReader();
                r.onload = ev => { state.bgImage = ev.target.result; renderPreview(); };
                r.readAsDataURL(file);
            }
        });

        document.getElementById('mcs-btn-img').addEventListener('click', exportImage);
        document.getElementById('mcs-btn-html').addEventListener('click', exportHTML);
    }

    function renderPreview() {
        var bg = document.getElementById('mcs-bg');
        if(bg) bg.style.backgroundImage = `url('${state.bgImage}')`;

        var magEl = document.getElementById('mcs-el-magTitle');
        if(magEl) {
            magEl.innerText = state.magazineName;
            magEl.style.color = state.magColor;
            magEl.style.zIndex = state.magBehind ? 1 : 10;
            magEl.style.left = elementsPos.magTitle.x + 'px';
            magEl.style.top = elementsPos.magTitle.y + 'px';
        }

        var headEl = document.getElementById('mcs-el-headline');
        if(headEl) {
            headEl.innerHTML = state.headline.replace(/\n/g, '<br>');
            headEl.style.color = state.headColor;
            headEl.style.left = elementsPos.headline.x + 'px';
            headEl.style.top = elementsPos.headline.y + 'px';
        }

        var subEl = document.getElementById('mcs-el-subtext');
        if(subEl) {
            subEl.innerHTML = state.subtext.replace(/\n/g, '<br>');
            subEl.style.color = state.subColor;
            subEl.style.left = elementsPos.subtext.x + 'px';
            subEl.style.top = elementsPos.subtext.y + 'px';
        }

        var bc = document.getElementById('mcs-barcode');
        if(bc) bc.style.display = state.barcode ? 'block' : 'none';
    }

    function initDraggable() {
        var canvas = document.getElementById('mcs-canvas');
        var els = document.querySelectorAll('.mcs-drag');
        
        els.forEach(el => {
            el.addEventListener('mousedown', function(e) {
                isDragging = true;
                currentEl = el;
                startX = e.clientX;
                startY = e.clientY;
                initialX = parseInt(el.style.left, 10) || 0;
                initialY = parseInt(el.style.top, 10) || 0;
                canvas.style.cursor = 'grabbing';
                e.stopPropagation();
            });
        });

        canvas.addEventListener('mousemove', function(e) {
            if(isDragging && currentEl) {
                var dx = e.clientX - startX;
                var dy = e.clientY - startY;
                currentEl.style.left = (initialX + dx) + 'px';
                currentEl.style.top = (initialY + dy) + 'px';
            }
        });

        canvas.addEventListener('mouseup', function(e) {
            if(isDragging && currentEl) {
                isDragging = false;
                var id = currentEl.id.replace('mcs-el-', '');
                elementsPos[id].x = parseInt(currentEl.style.left, 10);
                elementsPos[id].y = parseInt(currentEl.style.top, 10);
                currentEl = null;
                canvas.style.cursor = 'grab';
            }
        });
        
        canvas.addEventListener('mouseleave', function(e) {
            if(isDragging && currentEl) {
                isDragging = false;
                var id = currentEl.id.replace('mcs-el-', '');
                elementsPos[id].x = parseInt(currentEl.style.left, 10);
                elementsPos[id].y = parseInt(currentEl.style.top, 10);
                currentEl = null;
                canvas.style.cursor = 'grab';
            }
        });
    }

    function exportImage() {
        var canvas = document.getElementById('mcs-canvas');
        html2canvas(canvas, { scale: 3, useCORS: true, backgroundColor: '#111' }).then(c => {
            var a = document.createElement('a');
            a.download = 'magazine_cover.png';
            a.href = c.toDataURL('image/png');
            a.click();
        });
    }

    function exportHTML() {
        var htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${state.magazineName} | Digital Cover</title>
    <style>
        * { box-sizing: border-box; }
        body { margin:0; padding:0; min-height:100vh; background:#000; display:flex; justify-content:center; align-items:center; font-family:-apple-system, sans-serif; perspective: 1200px; overflow:hidden; }
        
        .mag-container {
            width: 500px;
            height: 700px;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.1s ease;
            box-shadow: 0 30px 60px rgba(0,0,0,0.8), 0 0 50px rgba(255,255,255,0.1);
            border-radius: 4px;
        }

        .mag-bg {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background-image: url('${state.bgImage}');
            background-size: cover;
            background-position: center;
            transform: translateZ(0px);
            border-radius: 4px;
            overflow: hidden;
        }

        .mag-border {
            position: absolute; top: 15px; left: 15px; right: 15px; bottom: 15px;
            border: 4px solid #fff;
            pointer-events: none;
            z-index: 2;
            transform: translateZ(10px);
        }

        .mag-title {
            position: absolute;
            font-family: 'Times New Roman', Times, serif;
            font-size: 100px; font-weight: 900; text-transform: uppercase; letter-spacing: -2px; line-height: 0.8;
            color: ${state.magColor};
            text-shadow: 0 5px 15px rgba(0,0,0,0.5);
            z-index: ${state.magBehind ? 1 : 10};
            left: ${elementsPos.magTitle.x}px;
            top: ${elementsPos.magTitle.y}px;
            transform: translateZ(20px);
            animation: slideDown 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity:0;
            white-space: nowrap;
        }

        .mag-headline {
            position: absolute;
            font-size: 46px; font-weight: 900; text-transform: uppercase; line-height: 1;
            color: ${state.headColor};
            text-shadow: 0 2px 10px rgba(0,0,0,0.8);
            z-index: 11; max-width: 440px;
            left: ${elementsPos.headline.x}px;
            top: ${elementsPos.headline.y}px;
            transform: translateZ(40px);
            animation: slideRight 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
            opacity:0;
        }

        .mag-subtext {
            position: absolute;
            font-size: 18px; font-weight: 500; line-height: 1.4;
            color: ${state.subColor};
            text-shadow: 0 2px 5px rgba(0,0,0,0.8);
            z-index: 12; max-width: 300px;
            left: ${elementsPos.subtext.x}px;
            top: ${elementsPos.subtext.y}px;
            transform: translateZ(50px);
            animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards;
            opacity:0;
        }

        .mag-barcode {
            position: absolute;
            bottom: 25px; right: 25px;
            background: #fff; padding: 5px; z-index: 15;
            display: ${state.barcode ? 'block' : 'none'};
            transform: translateZ(30px);
            animation: fadeIn 1s ease 1s forwards;
            opacity:0;
        }

        .gloss-effect {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.4) 25%, transparent 30%);
            z-index: 20; pointer-events: none;
            background-size: 200% 200%;
            background-position: 100% 100%;
            transition: background-position 0.1s ease;
            transform: translateZ(60px);
            border-radius: 4px;
        }

        @keyframes slideDown { from { transform: translateZ(20px) translateY(-50px); opacity:0; } to { transform: translateZ(20px) translateY(0); opacity:1; } }
        @keyframes slideRight { from { transform: translateZ(40px) translateX(-50px); opacity:0; } to { transform: translateZ(40px) translateX(0); opacity:1; } }
        @keyframes slideUp { from { transform: translateZ(50px) translateY(50px); opacity:0; } to { transform: translateZ(50px) translateY(0); opacity:1; } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

        /* Responsive scale */
        @media (max-width: 600px) {
            .mag-container { transform: scale(0.65) !important; }
        }
    </style>
</head>
<body>

    <div class="mag-container" id="card">
        <div class="mag-bg"></div>
        <div class="mag-border"></div>
        <div class="mag-title">${state.magazineName}</div>
        <div class="mag-headline">${state.headline.replace(/\n/g, '<br>')}</div>
        <div class="mag-subtext">${state.subtext.replace(/\n/g, '<br>')}</div>
        <div class="mag-barcode">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/UPC-A-036000291452.svg/1200px-UPC-A-036000291452.svg.png" style="height:40px;width:auto;display:block;">
        </div>
        <div class="gloss-effect" id="gloss"></div>
    </div>

    <script>
        const card = document.getElementById('card');
        const gloss = document.getElementById('gloss');

        document.addEventListener('mousemove', (e) => {
            if(window.innerWidth <= 600) return; // Disable on small screens
            let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            card.style.transform = \`rotateY(\${xAxis}deg) rotateX(\${yAxis}deg)\`;
            
            // Adjust gloss
            let percX = (e.pageX / window.innerWidth) * 100;
            let percY = (e.pageY / window.innerHeight) * 100;
            gloss.style.backgroundPosition = \`\${percX}% \${percY}%\`;
        });

        document.addEventListener('mouseleave', () => {
            if(window.innerWidth <= 600) return;
            card.style.transform = 'rotateY(0deg) rotateX(0deg)';
            card.style.transition = 'transform 0.5s ease';
            setTimeout(() => { card.style.transition = 'transform 0.1s ease'; }, 500);
        });
    </script>
</body>
</html>`;

        var blob = new Blob([htmlContent], {type: 'text/html'});
        var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'magazine-interactive-3d.html'; a.click();
    }
})();
