(function() {
    'use strict';
    
    var _prevRenderTab = window.renderTab;
    window.renderTab = function(tab) {
        if (tab === 'certificate-studio') {
            window.activeTab = tab;
            document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
            var btn = document.getElementById('tab-' + tab);
            if (btn) btn.classList.add('active');
            
            document.querySelectorAll('.center-panel, .right-panel, .workspace').forEach(el => el.style.display = 'none');
            var ws = document.getElementById(tab + '-workspace');
            if (ws) ws.style.display = 'flex';
            
            var c = document.getElementById('cert-center');
            var r = document.getElementById('cert-right');
            if(c) c.style.display = 'flex';
            if(r) r.style.display = 'block';
            
            if(!window.certInitialized) {
                buildUI();
                window.certInitialized = true;
            } else {
                renderPreview();
            }
            return;
        }
        if (_prevRenderTab) _prevRenderTab(tab);
    };

    var state = {
        theme: 'gold', 
        bgColor: '#fdfbf7', 
        items: [
            { id: 'i1', type: 'text', content: 'CERTIFICATE', x: 230, y: 70, size: 48, color: '#b8860b', font: 'Georgia', bold: true, foil: true },
            { id: 'i2', type: 'text', content: 'OF ACHIEVEMENT', x: 290, y: 130, size: 20, color: '#daa520', font: 'Arial', bold: true, foil: false },
            { id: 'i3', type: 'text', content: 'This is proudly presented to', x: 300, y: 190, size: 16, color: '#555555', font: 'Georgia', bold: false, foil: false },
            { id: 'i4', type: 'text', content: 'John Doe', x: 280, y: 240, size: 60, color: '#111111', font: "'Brush Script MT', cursive", bold: false, foil: false },
            { id: 'i5', type: 'line', w: 400, x: 200, y: 320, color: '#333333' },
            { id: 'i6', type: 'text', content: 'For outstanding performance and dedication.', x: 230, y: 340, size: 18, color: '#444444', font: 'Georgia', bold: false, foil: false },
            { id: 'i7', type: 'line', w: 200, x: 550, y: 440, color: '#333333' },
            { id: 'i8', type: 'text', content: 'Signature', x: 615, y: 450, size: 14, color: '#555555', font: 'Arial', bold: false, foil: false },
            { id: 'i9', type: 'wax_seal', text: 'OFFICIAL SEAL OF EXCELLENCE • ', innerText: '★', x: 100, y: 380, size: 140, color: '#b30000', img: null }
        ],
        selectedItemId: null
    };

    var isDragging = false;
    var currentEl = null;
    var startX, startY, initialX, initialY;

    function buildUI() {
        var c = document.getElementById('cert-center');
        var r = document.getElementById('cert-right');
        if(!c || !r) return;

        c.innerHTML = `
            <div id="cert-canvas-container" style="display:flex;align-items:center;justify-content:center;height:100%;width:100%;overflow:auto;padding:40px;box-sizing:border-box;">
                <div id="cert-canvas" style="width:800px; height:565px; background:#fff; position:relative; box-shadow:0 15px 35px rgba(0,0,0,0.3); flex-shrink:0; overflow:hidden;">
                    <!-- Content -->
                </div>
            </div>
        `;

        r.innerHTML = `
            <div style="color:white;font-family:sans-serif;">
                <h2 style="margin:0 0 5px;color:#ffd700;font-size:18px;">🎓 Certificate Studio Pro</h2>
                <p style="margin:0 0 15px;font-size:11px;color:#94a3b8;">Generate Premium Awards & Diplomas</p>

                <div style="background:#1e293b;padding:10px;border-radius:6px;margin-bottom:15px;">
                    <h3 style="margin:0 0 10px;font-size:13px;color:#fef08a;">1. Certificate Style</h3>
                    
                    <label style="font-size:11px;color:#94a3b8;display:block;margin-bottom:5px;">Border Style:</label>
                    <select id="cert-theme" style="width:100%;margin-bottom:10px;background:#0f172a;color:#fff;border:1px solid #334155;padding:6px;border-radius:4px;">
                        <option value="gold">🥇 Royal Gold (Classic)</option>
                        <option value="silver">🥈 Sterling Silver</option>
                        <option value="dark">🏛️ Executive Dark</option>
                        <option value="guilloche">🔣 Guilloche (Security Pattern)</option>
                        <option value="none">No Border (Minimalist)</option>
                    </select>

                    <label style="font-size:11px;color:#94a3b8;display:block;margin-bottom:5px;">Paper Color:</label>
                    <input type="color" id="cert-bg-color" style="width:100%;height:30px;border:none;background:none;cursor:pointer;margin-bottom:10px;">
                </div>

                <div style="background:#1e293b;padding:10px;border-radius:6px;margin-bottom:15px;">
                    <h3 style="margin:0 0 10px;font-size:13px;color:#fef08a;">2. Add Elements</h3>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;">
                        <button id="cert-add-text" style="background:#3b82f6;color:#fff;border:none;padding:8px;border-radius:4px;cursor:pointer;font-size:11px;">+ Text</button>
                        <button id="cert-add-line" style="background:#8b5cf6;color:#fff;border:none;padding:8px;border-radius:4px;cursor:pointer;font-size:11px;">+ Signature Line</button>
                        <button id="cert-add-img" style="grid-column:1 / -1;background:#10b981;color:#fff;border:none;padding:8px;border-radius:4px;cursor:pointer;font-size:11px;" onclick="document.getElementById('cert-add-img-file').click()">+ Photo/Logo</button>
                        <input type="file" id="cert-add-img-file" accept="image/*" style="display:none;">
                    </div>
                    <button id="cert-add-seal" style="width:100%;margin-top:10px;background:linear-gradient(135deg, #dc2626, #991b1b);color:#fff;border:none;padding:8px;border-radius:4px;cursor:pointer;font-size:12px;font-weight:bold;box-shadow:0 2px 5px rgba(220,38,38,0.4);">🔥 + Add 3D Wax Seal</button>
                </div>

                <div id="cert-item-props" style="background:#1e293b;padding:10px;border-radius:6px;margin-bottom:15px;display:none;">
                    <h3 style="margin:0 0 10px;font-size:13px;color:#38bdf8;">Element Properties</h3>
                    
                    <!-- Text Props -->
                    <div id="cert-text-props">
                        <textarea id="cert-item-content" style="width:100%;height:60px;margin-bottom:10px;background:#0f172a;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;"></textarea>
                        
                        <div style="display:flex;gap:10px;margin-bottom:10px;">
                            <div style="flex:1;">
                                <label style="font-size:10px;color:#94a3b8;">Size</label>
                                <input type="number" id="cert-item-size" style="width:100%;background:#0f172a;color:#fff;border:1px solid #334155;padding:4px;border-radius:4px;">
                            </div>
                            <div style="flex:1;">
                                <label style="font-size:10px;color:#94a3b8;">Color</label>
                                <input type="color" id="cert-item-color" style="width:100%;height:24px;border:none;background:none;cursor:pointer;">
                            </div>
                        </div>

                        <div style="margin-bottom:10px;">
                            <label style="font-size:10px;color:#94a3b8;">Font</label>
                            <select id="cert-item-font" style="width:100%;background:#0f172a;color:#fff;border:1px solid #334155;padding:4px;border-radius:4px;">
                                <option value="Georgia">Georgia (Classic Serif)</option>
                                <option value="'Brush Script MT', cursive">Brush Script (Signature)</option>
                                <option value="'Times New Roman', Times, serif">Times New Roman</option>
                                <option value="Arial">Arial (Modern)</option>
                            </select>
                        </div>
                        
                        <div style="display:flex;gap:15px;margin-bottom:10px;">
                            <label style="font-size:11px;cursor:pointer;"><input type="checkbox" id="cert-item-bold"> Bold</label>
                            <label style="font-size:11px;cursor:pointer;"><input type="checkbox" id="cert-item-foil"> ✨ Gold/Silver Foil Effect</label>
                        </div>
                    </div>

                    <!-- Line Props -->
                    <div id="cert-line-props" style="display:none;margin-bottom:10px;">
                        <label style="font-size:10px;color:#94a3b8;">Line Width</label>
                        <input type="range" id="cert-line-width" min="50" max="600" style="width:100%;margin-bottom:10px;">
                        <label style="font-size:10px;color:#94a3b8;">Line Color</label>
                        <input type="color" id="cert-line-color" style="width:100%;height:24px;border:none;background:none;cursor:pointer;">
                    </div>

                    <!-- Image Props -->
                    <div id="cert-img-props" style="display:none;margin-bottom:10px;">
                        <label style="font-size:10px;color:#94a3b8;">Image Width</label>
                        <input type="range" id="cert-item-width" min="30" max="400" style="width:100%;">
                    </div>
                    
                    <!-- Seal Props -->
                    <div id="cert-seal-props" style="display:none;margin-bottom:10px;">
                        <label style="font-size:10px;color:#94a3b8;">Outer Circular Text</label>
                        <input type="text" id="cert-seal-text" style="width:100%;margin-bottom:10px;background:#0f172a;color:#fff;border:1px solid #334155;padding:4px;border-radius:4px;">
                        
                        <label style="font-size:10px;color:#94a3b8;">Center Text (Icon/Year)</label>
                        <input type="text" id="cert-seal-inner" style="width:100%;margin-bottom:10px;background:#0f172a;color:#fff;border:1px solid #334155;padding:4px;border-radius:4px;">
                        
                        <div style="display:flex;gap:5px;margin-bottom:10px;">
                            <div style="flex:1;">
                                <label style="font-size:10px;color:#94a3b8;">Color</label>
                                <input type="color" id="cert-seal-color" style="width:100%;height:24px;border:none;background:none;cursor:pointer;">
                            </div>
                            <div style="flex:1;">
                                <label style="font-size:10px;color:#94a3b8;">Size</label>
                                <input type="range" id="cert-seal-size" min="80" max="250" style="width:100%;">
                            </div>
                        </div>

                        <label style="font-size:10px;color:#94a3b8;">Center Photo/Logo</label>
                        <button onclick="document.getElementById('cert-seal-img-file').click()" style="width:100%;background:#475569;color:#fff;border:none;padding:4px;border-radius:4px;cursor:pointer;font-size:10px;">Upload Center Image</button>
                        <input type="file" id="cert-seal-img-file" accept="image/*" style="display:none;">
                    </div>

                    <button id="cert-del-item" style="width:100%;background:#ef4444;color:#fff;border:none;padding:8px;border-radius:4px;cursor:pointer;font-size:12px;margin-top:10px;">🗑 Delete Element</button>
                </div>

                <div style="display:flex;gap:10px;margin-top:20px;">
                    <button id="cert-btn-png" style="flex:1;background:linear-gradient(135deg,#ffd700,#daa520);color:#000;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;box-shadow:0 4px 15px rgba(255,215,0,0.3);">📷 PNG</button>
                    <button id="cert-btn-html" style="flex:2;background:linear-gradient(135deg,#00ff96,#00b368);color:#000;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;box-shadow:0 4px 15px rgba(0,255,150,0.3);">🌐 Export Interactive HTML</button>
                </div>
            </div>
        `;

        setupListeners();
    }

    function generateId() {
        return 'id_' + Math.random().toString(36).substr(2, 9);
    }

    function setupListeners() {
        var canvas = document.getElementById('cert-canvas');
        
        // Settings
        document.getElementById('cert-theme').addEventListener('change', e => { state.theme = e.target.value; renderPreview(); });
        document.getElementById('cert-bg-color').addEventListener('input', e => { state.bgColor = e.target.value; renderPreview(); });

        // Add Items
        document.getElementById('cert-add-text').addEventListener('click', () => {
            var newItem = { id: generateId(), type: 'text', content: 'New Text', x: 350, y: 250, size: 24, color: '#000000', font: 'Georgia', bold: false, foil: false };
            state.items.push(newItem);
            state.selectedItemId = newItem.id;
            renderPreview();
        });
        document.getElementById('cert-add-line').addEventListener('click', () => {
            var newItem = { id: generateId(), type: 'line', w: 200, color: '#333333', x: 300, y: 300 };
            state.items.push(newItem);
            state.selectedItemId = newItem.id;
            renderPreview();
        });
        document.getElementById('cert-add-img-file').addEventListener('change', e => {
            var file = e.target.files[0];
            if(file) {
                var r = new FileReader();
                r.onload = ev => {
                    var newItem = { id: generateId(), type: 'image', url: ev.target.result, x: 350, y: 200, w: 150 };
                    state.items.push(newItem);
                    state.selectedItemId = newItem.id;
                    renderPreview();
                };
                r.readAsDataURL(file);
            }
        });
        document.getElementById('cert-add-seal').addEventListener('click', () => {
            var newItem = { id: generateId(), type: 'wax_seal', text: 'OFFICIAL SEAL OF EXCELLENCE • ', innerText: '★', color: '#b30000', x: 350, y: 200, size: 140, img: null };
            state.items.push(newItem);
            state.selectedItemId = newItem.id;
            renderPreview();
        });
        document.getElementById('cert-seal-img-file').addEventListener('change', e => {
            var file = e.target.files[0];
            if(file && state.selectedItemId) {
                var item = state.items.find(i => i.id === state.selectedItemId);
                if(item && item.type === 'wax_seal') {
                    var r = new FileReader();
                    r.onload = ev => { item.img = ev.target.result; renderPreview(); };
                    r.readAsDataURL(file);
                }
            }
        });

        // Properties update
        document.getElementById('cert-item-content').addEventListener('input', e => updateItem('content', e.target.value));
        document.getElementById('cert-item-size').addEventListener('input', e => updateItem('size', parseInt(e.target.value)));
        document.getElementById('cert-item-color').addEventListener('input', e => updateItem('color', e.target.value));
        document.getElementById('cert-item-font').addEventListener('change', e => updateItem('font', e.target.value));
        document.getElementById('cert-item-bold').addEventListener('change', e => updateItem('bold', e.target.checked));
        document.getElementById('cert-item-foil').addEventListener('change', e => updateItem('foil', e.target.checked));
        
        document.getElementById('cert-line-width').addEventListener('input', e => updateItem('w', parseInt(e.target.value)));
        document.getElementById('cert-line-color').addEventListener('input', e => updateItem('color', e.target.value));

        document.getElementById('cert-item-width').addEventListener('input', e => updateItem('w', parseInt(e.target.value)));
        
        document.getElementById('cert-seal-text').addEventListener('input', e => updateItem('text', e.target.value));
        document.getElementById('cert-seal-inner').addEventListener('input', e => updateItem('innerText', e.target.value));
        document.getElementById('cert-seal-size').addEventListener('input', e => updateItem('size', parseInt(e.target.value)));
        document.getElementById('cert-seal-color').addEventListener('input', e => updateItem('color', e.target.value));

        document.getElementById('cert-del-item').addEventListener('click', () => {
            if(state.selectedItemId) {
                state.items = state.items.filter(i => i.id !== state.selectedItemId);
                state.selectedItemId = null;
                renderPreview();
            }
        });

        // Dragging
        canvas.addEventListener('mousedown', function(e) {
            var itemEl = e.target.closest('.cert-item');
            if(itemEl) {
                isDragging = true;
                currentEl = itemEl;
                startX = e.clientX;
                startY = e.clientY;
                initialX = parseInt(currentEl.style.left, 10) || 0;
                initialY = parseInt(currentEl.style.top, 10) || 0;
                state.selectedItemId = currentEl.dataset.id;
                renderPreview(); 
                e.stopPropagation();
            } else {
                state.selectedItemId = null;
                renderPreview();
            }
        });

        document.addEventListener('mousemove', function(e) {
            if(isDragging && currentEl) {
                var dx = e.clientX - startX;
                var dy = e.clientY - startY;
                currentEl.style.left = (initialX + dx) + 'px';
                currentEl.style.top = (initialY + dy) + 'px';
            }
        });

        document.addEventListener('mouseup', function(e) {
            if(isDragging && currentEl) {
                isDragging = false;
                var id = currentEl.dataset.id;
                var item = state.items.find(i => i.id === id);
                if(item) {
                    item.x = parseInt(currentEl.style.left, 10);
                    item.y = parseInt(currentEl.style.top, 10);
                }
                currentEl = null;
            }
        });

        document.getElementById('cert-btn-png').addEventListener('click', exportPNG);
        document.getElementById('cert-btn-html').addEventListener('click', exportHTML);
    }

    function updateItem(key, val) {
        if(!state.selectedItemId) return;
        var item = state.items.find(i => i.id === state.selectedItemId);
        if(item) {
            item[key] = val;
            renderPreview();
        }
    }

    function renderPreview() {
        var canvas = document.getElementById('cert-canvas');
        if(!canvas) return;

        canvas.style.backgroundColor = state.bgColor;
        canvas.innerHTML = '';

        // Border rendering
        var borderHTML = '';
        if(state.theme === 'gold') {
            borderHTML = `
                <div style="position:absolute; inset:15px; border:2px solid #daa520; pointer-events:none;"></div>
                <div style="position:absolute; inset:20px; border:6px solid #ffd700; pointer-events:none;"></div>
                <div style="position:absolute; inset:28px; border:1px solid #b8860b; pointer-events:none;"></div>
            `;
        } else if(state.theme === 'silver') {
            borderHTML = `
                <div style="position:absolute; inset:15px; border:2px solid #94a3b8; pointer-events:none;"></div>
                <div style="position:absolute; inset:20px; border:6px solid #cbd5e1; pointer-events:none;"></div>
                <div style="position:absolute; inset:28px; border:1px solid #64748b; pointer-events:none;"></div>
            `;
        } else if(state.theme === 'dark') {
            borderHTML = `
                <div style="position:absolute; inset:15px; border:4px solid #1e293b; pointer-events:none;"></div>
                <div style="position:absolute; inset:22px; border:1px solid #0f172a; pointer-events:none;"></div>
            `;
        } else if(state.theme === 'guilloche') {
            // SVG Guilloche pattern
            var svgData = `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs><pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 20 0 Q 40 20 20 40 Q 0 20 20 0" fill="none" stroke="#b8860b" stroke-width="0.5" opacity="0.4"/>
                <circle cx="20" cy="20" r="10" fill="none" stroke="#b8860b" stroke-width="0.3" opacity="0.4"/>
                </pattern></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`;
            var b64 = btoa(svgData);
            borderHTML = `
                <div style="position:absolute; inset:0; background:url('data:image/svg+xml;base64,${b64}'); pointer-events:none;"></div>
                <div style="position:absolute; inset:30px; border:2px solid #b8860b; pointer-events:none; background:${state.bgColor}; z-index:0;"></div>
            `;
        }
        canvas.innerHTML = borderHTML;

        // Custom foil animation
        var styleEl = document.createElement('style');
        styleEl.innerHTML = `
            @keyframes foilShine {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
            }
            .foil-text {
                background: linear-gradient(120deg, #b8860b 0%, #ffd700 25%, #fff8dc 50%, #ffd700 75%, #b8860b 100%);
                background-size: 200% auto;
                color: transparent !important;
                -webkit-background-clip: text;
                background-clip: text;
                animation: foilShine 4s linear infinite;
            }
            .cert-item { position:absolute; z-index:1; }
        `;
        canvas.appendChild(styleEl);

        state.items.forEach(item => {
            var el = document.createElement('div');
            el.className = 'cert-item';
            el.dataset.id = item.id;
            var isSelected = (item.id === state.selectedItemId);
            
            el.style.left = item.x + 'px';
            el.style.top = item.y + 'px';
            el.style.cursor = 'move';
            el.style.border = isSelected ? '1px dashed rgba(0,0,0,0.3)' : '1px dashed transparent';
            
            if(item.type === 'text') {
                el.style.fontSize = item.size + 'px';
                el.style.color = item.color;
                el.style.fontFamily = item.font;
                el.style.fontWeight = item.bold ? 'bold' : 'normal';
                el.style.padding = '2px';
                el.style.lineHeight = '1.2';
                el.style.whiteSpace = 'pre';
                el.innerHTML = (item.content || '').replace(/\\n/g, '<br>');
                if(item.foil) el.classList.add('foil-text');
            } else if(item.type === 'line') {
                el.style.width = item.w + 'px';
                el.style.height = '2px';
                el.style.backgroundColor = item.color;
                el.style.marginTop = '10px';
                el.style.marginBottom = '10px';
            } else if(item.type === 'image') {
                el.innerHTML = `<img src="${item.url}" style="width:${item.w}px; height:auto; display:block; pointer-events:none;">`;
            } else if(item.type === 'wax_seal') {
                var size = item.size;
                el.style.width = size + 'px';
                el.style.height = size + 'px';
                el.style.borderRadius = '50%';
                
                // Advanced Wax Seal Styling
                el.style.background = `radial-gradient(circle at 30% 30%, ${lightenColor(item.color, 40)}, ${item.color})`;
                el.style.boxShadow = '0 8px 15px rgba(0,0,0,0.4), inset 0 0 ' + (size*0.1) + 'px rgba(0,0,0,0.8), inset 0 0 2px rgba(255,255,255,0.5)';
                el.style.display = 'flex';
                el.style.alignItems = 'center';
                el.style.justifyContent = 'center';
                el.style.color = lightenColor(item.color, 60);
                el.style.border = (size * 0.03) + 'px solid ' + darkenColor(item.color, 20);
                
                // SVG for circular text
                var svgText = '';
                if(item.text) {
                    var r = size/2 - (size*0.15); // radius for text path
                    var cx = size/2;
                    var cy = size/2;
                    // Path for text: two semi-circles to make a full circle
                    var pathD = `M ${cx}, ${cy-r} A ${r},${r} 0 1,1 ${cx},${cy+r} A ${r},${r} 0 1,1 ${cx},${cy-r}`;
                    var fontSize = size * 0.1;
                    
                    svgText = `
                    <svg width="${size}" height="${size}" style="position:absolute;inset:0;pointer-events:none;">
                        <defs>
                            <path id="sealPath_${item.id}" d="${pathD}" />
                        </defs>
                        <text font-size="${fontSize}" fill="${lightenColor(item.color, 40)}" font-family="Georgia, serif" font-weight="bold" letter-spacing="2">
                            <textPath href="#sealPath_${item.id}" startOffset="0%">${item.text.repeat(3)}</textPath>
                        </text>
                    </svg>`;
                }

                var innerContent = '';
                if(item.img) {
                    var imgSize = size * 0.5;
                    innerContent = `<div style="width:${imgSize}px; height:${imgSize}px; border-radius:50%; background:url('${item.img}') center/cover; box-shadow: inset 0 2px 5px rgba(0,0,0,0.5); z-index:2; position:relative;"></div>`;
                } else if(item.innerText) {
                    var innerSize = size * 0.3;
                    innerContent = `<div style="font-size:${innerSize}px; font-weight:bold; font-family:Georgia; text-shadow: -1px -1px 2px rgba(0,0,0,0.6), 1px 1px 2px rgba(255,255,255,0.2); z-index:2; position:relative;">${item.innerText}</div>`;
                }

                // Inner embossed ring
                var innerRing = `<div style="position:absolute; inset:${size*0.2}px; border-radius:50%; border:1px solid ${darkenColor(item.color, 30)}; box-shadow: inset 0 1px 3px rgba(0,0,0,0.5), 0 1px 2px rgba(255,255,255,0.3); pointer-events:none;"></div>`;

                el.innerHTML = svgText + innerRing + innerContent;
            }
            canvas.appendChild(el);

            if(item.type === 'text') {
                el.addEventListener('dblclick', function(e) {
                    document.getElementById('cert-item-content').focus();
                });
            }
        });

        // Update Properties Panel
        var propsPanel = document.getElementById('cert-item-props');
        if(state.selectedItemId) {
            propsPanel.style.display = 'block';
            var selItem = state.items.find(i => i.id === state.selectedItemId);
            if(selItem) {
                document.getElementById('cert-text-props').style.display = 'none';
                document.getElementById('cert-img-props').style.display = 'none';
                document.getElementById('cert-seal-props').style.display = 'none';
                document.getElementById('cert-line-props').style.display = 'none';

                if(selItem.type === 'text') {
                    document.getElementById('cert-text-props').style.display = 'block';
                    document.getElementById('cert-item-content').value = selItem.content;
                    document.getElementById('cert-item-size').value = selItem.size;
                    document.getElementById('cert-item-color').value = selItem.color;
                    document.getElementById('cert-item-font').value = selItem.font;
                    document.getElementById('cert-item-bold').checked = selItem.bold;
                    document.getElementById('cert-item-foil').checked = selItem.foil;
                } else if(selItem.type === 'line') {
                    document.getElementById('cert-line-props').style.display = 'block';
                    document.getElementById('cert-line-width').value = selItem.w;
                    document.getElementById('cert-line-color').value = selItem.color;
                } else if(selItem.type === 'image') {
                    document.getElementById('cert-img-props').style.display = 'block';
                    document.getElementById('cert-item-width').value = selItem.w;
                } else if(selItem.type === 'wax_seal') {
                    document.getElementById('cert-seal-props').style.display = 'block';
                    document.getElementById('cert-seal-text').value = selItem.text || '';
                    document.getElementById('cert-seal-inner').value = selItem.innerText || '';
                    document.getElementById('cert-seal-size').value = selItem.size;
                    document.getElementById('cert-seal-color').value = selItem.color || '#b30000';
                }
            }
        } else {
            propsPanel.style.display = 'none';
        }
    }

    // Helper color functions
    function lightenColor(col, amt) {
        return adjustColor(col, amt);
    }
    function darkenColor(col, amt) {
        return adjustColor(col, -amt);
    }
    function adjustColor(col, amt) {
        var usePound = false;
        if(col[0] == "#") { col = col.slice(1); usePound = true; }
        if(col.length == 3) col = col[0]+col[0]+col[1]+col[1]+col[2]+col[2];
        var num = parseInt(col, 16);
        var r = (num >> 16) + amt;
        if(r > 255) r = 255; else if(r < 0) r = 0;
        var b = ((num >> 8) & 0x00FF) + amt;
        if(b > 255) b = 255; else if(b < 0) b = 0;
        var g = (num & 0x0000FF) + amt;
        if(g > 255) g = 255; else if(g < 0) g = 0;
        return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
    }

    async function exportPNG() {
        var btn = document.getElementById('cert-btn-png');
        var oldText = btn.innerText;
        btn.innerText = "🖼 Generating Print-Ready PNG...";
        btn.disabled = true;

        var originalSelected = state.selectedItemId;
        state.selectedItemId = null;
        renderPreview();
        await new Promise(r => setTimeout(r, 100));

        var canvasEl = document.getElementById('cert-canvas');
        let c = await html2canvas(canvasEl, { scale: 3, useCORS: true, backgroundColor: state.bgColor });
        
        var a = document.createElement('a');
        a.href = c.toDataURL('image/png');
        a.download = `Certificate_Premium.png`;
        a.click();

        state.selectedItemId = originalSelected;
        renderPreview();
        btn.innerText = oldText;
        btn.disabled = false;
    }

    function exportHTML() {
        var originalSelected = state.selectedItemId;
        state.selectedItemId = null;
        renderPreview();
        
        var canvasEl = document.getElementById('cert-canvas');
        var htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Premium Certificate</title>
    <style>
        body { margin:0; display:flex; justify-content:center; align-items:center; min-height:100vh; background:#1e293b; font-family:sans-serif; }
        .cert-container { 
            width: 800px; 
            height: 565px; 
            background: ${state.bgColor}; 
            position: relative; 
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); 
            overflow: hidden;
            transform-origin: center;
            animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(0.5deg); }
            100% { transform: translateY(0px) rotate(0deg); }
        }
    </style>
</head>
<body>
    <div class="cert-container">
        ${canvasEl.innerHTML}
    </div>
</body>
</html>`;

        var blob = new Blob([htmlContent], { type: 'text/html' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'Premium_Certificate.html';
        a.click();
        
        state.selectedItemId = originalSelected;
        renderPreview();
    }
})();
