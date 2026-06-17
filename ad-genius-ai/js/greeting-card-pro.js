(function() {
    'use strict';
    
    var _prevRenderTab = window.renderTab;
    window.renderTab = function(tab) {
        if (tab === 'greeting-card') {
            window.activeTab = tab;
            document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
            var btn = document.getElementById('tab-' + tab);
            if (btn) btn.classList.add('active');
            
            document.querySelectorAll('.center-panel, .right-panel, .workspace').forEach(el => el.style.display = 'none');
            var ws = document.getElementById(tab + '-workspace');
            if (ws) ws.style.display = 'flex';
            
            var c = document.getElementById('gcs-center');
            var r = document.getElementById('gcs-right');
            if(c) c.style.display = 'flex';
            if(r) r.style.display = 'block';
            
            if(!window.gcsInitialized) {
                buildUI();
                window.gcsInitialized = true;
            } else {
                renderPreview();
            }
            return;
        }
        if (_prevRenderTab) _prevRenderTab(tab);
    };

    var state = {
        theme: 'birthday',
        format: 'portrait',
        bgColor: '#fdfbf7',
        bgImage: '',
        foilEffect: true,
        items: [
            { id: 'i1', type: 'text', content: 'Happy Birthday!', x: 50, y: 50, size: 40, color: '#e11d48', font: 'Georgia', bold: true }
        ],
        selectedItemId: null
    };

    var isDragging = false;
    var currentEl = null;
    var startX, startY, initialX, initialY;

    function buildUI() {
        var c = document.getElementById('gcs-center');
        var r = document.getElementById('gcs-right');
        if(!c || !r) return;

        c.innerHTML = `
            <div id="gcs-canvas-container" style="display:flex;align-items:center;justify-content:center;height:100%;width:100%;overflow:auto;padding:20px;box-sizing:border-box;">
                <div id="gcs-canvas" style="background:#fff; position:relative; overflow:hidden; box-shadow:0 15px 35px rgba(0,0,0,0.3); cursor:grab; flex-shrink:0;">
                    <!-- Content -->
                </div>
            </div>
        `;

        r.innerHTML = `
            <div style="color:white;font-family:sans-serif;">
                <h2 style="margin:0 0 5px;color:#ff69b4;font-size:18px;">🎁 Greeting Card Studio</h2>
                <p style="margin:0 0 15px;font-size:11px;color:#94a3b8;">Create unique, magical e-cards</p>

                <div style="background:#1e293b;padding:10px;border-radius:6px;margin-bottom:15px;">
                    <h3 style="margin:0 0 10px;font-size:13px;color:#fef08a;">✨ Magic Presets (1-Click)</h3>
                    <div style="display:flex;gap:5px;flex-wrap:wrap;">
                        <button id="gcs-preset-bday" style="flex:1;background:#e11d48;color:#fff;border:none;padding:6px;border-radius:4px;cursor:pointer;font-size:11px;">🎂 Birthday</button>
                        <button id="gcs-preset-wed" style="flex:1;background:#fbcfe8;color:#831843;border:none;padding:6px;border-radius:4px;cursor:pointer;font-size:11px;">💍 Wedding</button>
                        <button id="gcs-preset-ny" style="flex:1;background:#fbbf24;color:#78350f;border:none;padding:6px;border-radius:4px;cursor:pointer;font-size:11px;">🥂 New Year</button>
                    </div>
                </div>

                <div style="background:#1e293b;padding:10px;border-radius:6px;margin-bottom:15px;">
                    <h3 style="margin:0 0 10px;font-size:13px;color:#fef08a;">Card Settings</h3>
                    
                    <label style="font-size:11px;color:#94a3b8;display:block;margin-bottom:5px;">Magic Theme (HTML Export Effects):</label>
                    <select id="gcs-theme" style="width:100%;margin-bottom:10px;background:#0f172a;color:#fff;border:1px solid #334155;padding:6px;border-radius:4px;">
                        <option value="birthday">🎉 Birthday (Confetti)</option>
                        <option value="christmas">❄️ Christmas (Snow)</option>
                        <option value="newyear">🎆 New Year (Fireworks)</option>
                        <option value="wedding">💖 Wedding / Love (Hearts)</option>
                    </select>

                    <label style="font-size:11px;color:#94a3b8;display:block;margin-bottom:5px;">Format Shape:</label>
                    <select id="gcs-format" style="width:100%;margin-bottom:10px;background:#0f172a;color:#fff;border:1px solid #334155;padding:6px;border-radius:4px;">
                        <option value="portrait">Portrait (400x600)</option>
                        <option value="landscape">Landscape (600x400)</option>
                        <option value="square">Square (500x500)</option>
                    </select>

                    <label style="font-size:11px;color:#94a3b8;display:block;margin-bottom:5px;">Background Color:</label>
                    <input type="color" id="gcs-bg-color" style="width:100%;height:30px;border:none;background:none;cursor:pointer;margin-bottom:10px;">
                    <label style="font-size:11px;color:#94a3b8;display:block;margin-bottom:5px;">Background Image:</label>
                    <input type="file" id="gcs-bg-img" accept="image/*" style="width:100%;font-size:11px;color:#94a3b8;">
                    <button id="gcs-clear-bg-img" style="margin-top:5px;background:none;border:1px solid #94a3b8;color:#94a3b8;padding:4px 8px;border-radius:4px;cursor:pointer;font-size:10px;">Clear Background Image</button>
                    
                    <label style="font-size:11px;cursor:pointer;display:block;margin-top:10px;color:#fef08a;">
                        <input type="checkbox" id="gcs-foil-effect" checked> 💎 Premium 3D Foil & Tilt (HTML Export)
                    </label>
                </div>

                <div style="background:#1e293b;padding:10px;border-radius:6px;margin-bottom:15px;">
                    <h3 style="margin:0 0 10px;font-size:13px;color:#fef08a;">Add Elements</h3>
                    <div style="display:flex;gap:10px;">
                        <button id="gcs-add-text" style="flex:1;background:#3b82f6;color:#fff;border:none;padding:8px;border-radius:4px;cursor:pointer;font-size:12px;">+ Text</button>
                        <button id="gcs-add-img" style="flex:1;background:#10b981;color:#fff;border:none;padding:8px;border-radius:4px;cursor:pointer;font-size:12px;" onclick="document.getElementById('gcs-add-img-file').click()">+ Photo</button>
                        <input type="file" id="gcs-add-img-file" accept="image/*" style="display:none;">
                    </div>
                    <button id="gcs-add-scratch" style="width:100%;margin-top:10px;background:linear-gradient(135deg, #94a3b8, #475569);color:#fff;border:none;padding:8px;border-radius:4px;cursor:pointer;font-size:12px;font-weight:bold;box-shadow:0 2px 5px rgba(0,0,0,0.3);">🪙 + Add Interactive Scratch-Off Zone</button>
                </div>

                <div id="gcs-item-props" style="background:#1e293b;padding:10px;border-radius:6px;margin-bottom:15px;display:none;">
                    <h3 style="margin:0 0 10px;font-size:13px;color:#38bdf8;">Item Properties</h3>
                    
                    <div id="gcs-text-props">
                        <textarea id="gcs-item-content" style="width:100%;height:60px;margin-bottom:10px;background:#0f172a;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;"></textarea>
                        
                        <div style="display:flex;gap:10px;margin-bottom:10px;">
                            <div style="flex:1;">
                                <label style="font-size:10px;color:#94a3b8;">Size</label>
                                <input type="number" id="gcs-item-size" style="width:100%;background:#0f172a;color:#fff;border:1px solid #334155;padding:4px;border-radius:4px;">
                            </div>
                            <div style="flex:1;">
                                <label style="font-size:10px;color:#94a3b8;">Color</label>
                                <input type="color" id="gcs-item-color" style="width:100%;height:24px;border:none;background:none;cursor:pointer;">
                            </div>
                        </div>

                        <div style="margin-bottom:10px;">
                            <label style="font-size:10px;color:#94a3b8;">Font</label>
                            <select id="gcs-item-font" style="width:100%;background:#0f172a;color:#fff;border:1px solid #334155;padding:4px;border-radius:4px;">
                                <option value="Arial">Arial (Modern)</option>
                                <option value="'Brush Script MT', cursive">Brush Script (Elegant)</option>
                                <option value="Georgia">Georgia (Classic)</option>
                                <option value="'Courier New', Courier, monospace">Courier (Typewriter)</option>
                                <option value="'Comic Sans MS', cursive, sans-serif">Comic Sans (Fun)</option>
                            </select>
                        </div>
                        
                        <label style="font-size:11px;cursor:pointer;display:block;margin-bottom:10px;">
                            <input type="checkbox" id="gcs-item-bold"> Bold Text
                        </label>
                    </div>

                    <div id="gcs-img-props" style="display:none;margin-bottom:10px;">
                        <label style="font-size:10px;color:#94a3b8;">Width</label>
                        <input type="range" id="gcs-item-width" min="50" max="500" style="width:100%;margin-bottom:10px;">
                        
                        <label style="font-size:10px;color:#94a3b8;">Mask Shape</label>
                        <select id="gcs-item-mask" style="width:100%;background:#0f172a;color:#fff;border:1px solid #334155;padding:4px;border-radius:4px;">
                            <option value="none">None (Rectangle)</option>
                            <option value="circle">Perfect Circle</option>
                            <option value="rounded">Rounded Corners</option>
                            <option value="star">Magic Star</option>
                        </select>
                    </div>

                    <div id="gcs-scratch-props" style="display:none;margin-bottom:10px;">
                        <p style="font-size:10px;color:#fef08a;margin-bottom:10px;">This zone will be scratchable in HTML. Enter the secret message hidden underneath!</p>
                        
                        <textarea id="gcs-scratch-text" style="width:100%;height:40px;margin-bottom:10px;background:#0f172a;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;" placeholder="Secret message..."></textarea>
                        
                        <div style="display:flex;gap:10px;margin-bottom:10px;">
                            <div style="flex:1;">
                                <label style="font-size:10px;color:#94a3b8;">Text Size</label>
                                <input type="number" id="gcs-scratch-tsize" style="width:100%;background:#0f172a;color:#fff;border:1px solid #334155;padding:4px;border-radius:4px;">
                            </div>
                            <div style="flex:1;">
                                <label style="font-size:10px;color:#94a3b8;">Text Color</label>
                                <input type="color" id="gcs-scratch-tcolor" style="width:100%;height:24px;border:none;background:none;cursor:pointer;">
                            </div>
                        </div>

                        <div style="display:flex;gap:10px;">
                            <div style="flex:1;">
                                <label style="font-size:10px;color:#94a3b8;">Zone Width</label>
                                <input type="number" id="gcs-scratch-w" style="width:100%;background:#0f172a;color:#fff;border:1px solid #334155;padding:4px;border-radius:4px;">
                            </div>
                            <div style="flex:1;">
                                <label style="font-size:10px;color:#94a3b8;">Zone Height</label>
                                <input type="number" id="gcs-scratch-h" style="width:100%;background:#0f172a;color:#fff;border:1px solid #334155;padding:4px;border-radius:4px;">
                            </div>
                        </div>
                    </div>

                    <button id="gcs-del-item" style="width:100%;background:#ef4444;color:#fff;border:none;padding:8px;border-radius:4px;cursor:pointer;font-size:12px;margin-top:10px;">🗑 Delete Item</button>
                </div>

                <button id="gcs-btn-export-html" style="width:100%;background:linear-gradient(135deg,#ff69b4,#ff1493);color:#fff;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;box-shadow:0 4px 15px rgba(255,105,180,0.3);transition:transform 0.2s;margin-bottom:10px;">✨ Export Magic HTML E-Card</button>
                <button id="gcs-btn-export-png" style="width:100%;background:linear-gradient(135deg,#10b981,#059669);color:#fff;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;box-shadow:0 4px 15px rgba(16,185,129,0.3);transition:transform 0.2s;">🖼 Export HQ PNG Photo</button>
            </div>
        `;

        setupListeners();
        renderPreview();
    }

    function generateId() {
        return 'id_' + Math.random().toString(36).substr(2, 9);
    }

    function setupListeners() {
        var canvas = document.getElementById('gcs-canvas');
        
        // Settings
        document.getElementById('gcs-theme').addEventListener('change', e => { state.theme = e.target.value; renderPreview(); });
        document.getElementById('gcs-format').addEventListener('change', e => { state.format = e.target.value; renderPreview(); });
        document.getElementById('gcs-bg-color').addEventListener('input', e => { state.bgColor = e.target.value; renderPreview(); });
        document.getElementById('gcs-foil-effect').addEventListener('change', e => { state.foilEffect = e.target.checked; renderPreview(); });

        // Presets
        document.getElementById('gcs-preset-bday').addEventListener('click', () => {
            state.theme = 'birthday'; state.format = 'portrait'; state.bgColor = '#ffedd5'; state.bgImage = '';
            state.items = [
                { id: generateId(), type: 'text', content: 'HAPPY\nBIRTHDAY!', x: 40, y: 80, size: 48, color: '#ea580c', font: 'Georgia', bold: true },
                { id: generateId(), type: 'text', content: 'Make a wish...', x: 40, y: 220, size: 24, color: '#9a3412', font: 'Arial', bold: false },
                { id: generateId(), type: 'scratch', x: 40, y: 300, w: 320, h: 100, secretText: 'YOU GOT A \nNEW CAR! 🚗', secretSize: 28, secretColor: '#e11d48' }
            ];
            state.selectedItemId = null; renderPreview();
        });
        document.getElementById('gcs-preset-wed').addEventListener('click', () => {
            state.theme = 'wedding'; state.format = 'portrait'; state.bgColor = '#fdf2f8'; state.bgImage = '';
            state.items = [
                { id: generateId(), type: 'text', content: 'You are Invited', x: 80, y: 80, size: 36, color: '#831843', font: "'Brush Script MT', cursive", bold: false },
                { id: generateId(), type: 'text', content: 'To the wedding of\nRomeo & Juliet', x: 40, y: 150, size: 24, color: '#be185d', font: 'Georgia', bold: true },
                { id: generateId(), type: 'scratch', x: 40, y: 260, w: 320, h: 150, secretText: 'Location: Paris\nDate: 14 Feb', secretSize: 24, secretColor: '#831843' }
            ];
            state.selectedItemId = null; renderPreview();
        });
        document.getElementById('gcs-preset-ny').addEventListener('click', () => {
            state.theme = 'newyear'; state.format = 'landscape'; state.bgColor = '#0f172a'; state.bgImage = '';
            state.items = [
                { id: generateId(), type: 'text', content: 'HAPPY NEW YEAR', x: 120, y: 80, size: 42, color: '#fbbf24', font: 'Arial', bold: true },
                { id: generateId(), type: 'scratch', x: 150, y: 180, w: 300, h: 80, secretText: '2027 WILL BE EPIC!', secretSize: 24, secretColor: '#fcd34d' }
            ];
            state.selectedItemId = null; renderPreview();
        });

        document.getElementById('gcs-bg-img').addEventListener('change', e => {
            var file = e.target.files[0];
            if(file) {
                var r = new FileReader();
                r.onload = ev => { state.bgImage = ev.target.result; renderPreview(); };
                r.readAsDataURL(file);
            }
        });
        document.getElementById('gcs-clear-bg-img').addEventListener('click', () => {
            state.bgImage = '';
            document.getElementById('gcs-bg-img').value = '';
            renderPreview();
        });

        // Add Items
        document.getElementById('gcs-add-text').addEventListener('click', () => {
            var newItem = { id: generateId(), type: 'text', content: 'New Wish', x: 100, y: 100, size: 30, color: '#000000', font: 'Arial', bold: false };
            state.items.push(newItem);
            state.selectedItemId = newItem.id;
            renderPreview();
        });
        document.getElementById('gcs-add-img-file').addEventListener('change', e => {
            var file = e.target.files[0];
            if(file) {
                var r = new FileReader();
                r.onload = ev => {
                    var newItem = { id: generateId(), type: 'image', url: ev.target.result, x: 50, y: 50, w: 200, mask: 'none' };
                    state.items.push(newItem);
                    state.selectedItemId = newItem.id;
                    renderPreview();
                };
                r.readAsDataURL(file);
            }
        });

        document.getElementById('gcs-add-scratch').addEventListener('click', () => {
            var newItem = { id: generateId(), type: 'scratch', x: 50, y: 150, w: 250, h: 80, secretText: 'YOU WON!', secretSize: 24, secretColor: '#e11d48' };
            state.items.push(newItem);
            state.selectedItemId = newItem.id;
            renderPreview();
        });

        // Properties update
        document.getElementById('gcs-item-content').addEventListener('input', e => updateItem('content', e.target.value));
        document.getElementById('gcs-item-size').addEventListener('input', e => updateItem('size', parseInt(e.target.value)));
        document.getElementById('gcs-item-color').addEventListener('input', e => updateItem('color', e.target.value));
        document.getElementById('gcs-item-font').addEventListener('change', e => updateItem('font', e.target.value));
        document.getElementById('gcs-item-bold').addEventListener('change', e => updateItem('bold', e.target.checked));
        
        document.getElementById('gcs-item-width').addEventListener('input', e => updateItem('w', parseInt(e.target.value)));
        document.getElementById('gcs-item-mask').addEventListener('change', e => updateItem('mask', e.target.value));

        document.getElementById('gcs-scratch-w').addEventListener('input', e => updateItem('w', parseInt(e.target.value)));
        document.getElementById('gcs-scratch-h').addEventListener('input', e => updateItem('h', parseInt(e.target.value)));
        document.getElementById('gcs-scratch-text').addEventListener('input', e => updateItem('secretText', e.target.value));
        document.getElementById('gcs-scratch-tsize').addEventListener('input', e => updateItem('secretSize', parseInt(e.target.value)));
        document.getElementById('gcs-scratch-tcolor').addEventListener('input', e => updateItem('secretColor', e.target.value));

        document.getElementById('gcs-del-item').addEventListener('click', () => {
            if(state.selectedItemId) {
                state.items = state.items.filter(i => i.id !== state.selectedItemId);
                state.selectedItemId = null;
                renderPreview();
            }
        });

        // Dragging
        canvas.addEventListener('mousedown', function(e) {
            var itemEl = e.target.closest('.gcs-item');
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

        document.getElementById('gcs-btn-export-html').addEventListener('click', exportHTML);
        document.getElementById('gcs-btn-export-png').addEventListener('click', exportPNG);
    }

    function updateItem(prop, value) {
        if(!state.selectedItemId) return;
        var item = state.items.find(i => i.id === state.selectedItemId);
        if(item) {
            item[prop] = value;
            renderPreview();
        }
    }

    function renderPreview() {
        var canvas = document.getElementById('gcs-canvas');
        
        // Sync UI
        document.getElementById('gcs-theme').value = state.theme;
        document.getElementById('gcs-format').value = state.format;
        document.getElementById('gcs-bg-color').value = state.bgColor;
        document.getElementById('gcs-foil-effect').checked = state.foilEffect;

        // Apply format
        if(state.format === 'portrait') { canvas.style.width = '400px'; canvas.style.height = '600px'; }
        else if(state.format === 'landscape') { canvas.style.width = '600px'; canvas.style.height = '400px'; }
        else if(state.format === 'square') { canvas.style.width = '500px'; canvas.style.height = '500px'; }

        // Background
        canvas.style.backgroundColor = state.bgColor;
        if(state.bgImage) {
            canvas.style.backgroundImage = `url('${state.bgImage}')`;
            canvas.style.backgroundSize = 'cover';
            canvas.style.backgroundPosition = 'center';
        } else {
            canvas.style.backgroundImage = 'none';
        }

        canvas.innerHTML = '';
        state.items.forEach(item => {
            var isSelected = item.id === state.selectedItemId;
            var el = document.createElement('div');
            el.className = 'gcs-item';
            el.dataset.id = item.id;
            el.style.position = 'absolute';
            el.style.left = item.x + 'px';
            el.style.top = item.y + 'px';
            el.style.cursor = 'move';
            el.style.border = isSelected ? '1px dashed #ff69b4' : '1px dashed transparent';
            
            if(item.type === 'text') {
                el.style.fontSize = item.size + 'px';
                el.style.color = item.color;
                el.style.fontFamily = item.font;
                el.style.fontWeight = item.bold ? 'bold' : 'normal';
                el.style.padding = '2px';
                el.style.maxWidth = (parseInt(canvas.style.width) - 40) + 'px';
                el.style.lineHeight = '1.3';
                el.innerHTML = (item.content || '').replace(/\n/g, '<br>');
            } else if(item.type === 'image') {
                let maskStyle = '';
                if(item.mask === 'circle') maskStyle = 'border-radius: 50%; object-fit: cover; aspect-ratio: 1/1;';
                else if(item.mask === 'rounded') maskStyle = 'border-radius: 15px;';
                else if(item.mask === 'star') maskStyle = 'clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%); aspect-ratio: 1/1; object-fit:cover;';
                
                
                el.innerHTML = `<img src="${item.url}" style="width:${item.w}px; height:auto; display:block; pointer-events:none; ${maskStyle}">`;
            } else if(item.type === 'scratch') {
                el.style.width = item.w + 'px';
                el.style.height = item.h + 'px';
                el.style.background = isSelected ? 'rgba(255,255,255,0.9)' : 'repeating-linear-gradient(45deg, #b0b0b0, #b0b0b0 10px, #a0a0a0 10px, #a0a0a0 20px)';
                el.style.boxShadow = isSelected ? '0 4px 15px rgba(0,0,0,0.2)' : 'inset 0 0 10px rgba(0,0,0,0.2)';
                el.style.zIndex = '50';
                el.style.display = 'flex';
                el.style.alignItems = 'center';
                el.style.justifyContent = 'center';
                el.style.color = isSelected ? item.secretColor : '#333';
                el.style.fontWeight = 'bold';
                el.style.fontSize = isSelected ? (item.secretSize + 'px') : '14px';
                el.style.textShadow = isSelected ? 'none' : '0 1px 0 rgba(255,255,255,0.5)';
                el.style.textAlign = 'center';
                el.style.padding = '10px';
                el.style.boxSizing = 'border-box';
                el.innerHTML = isSelected ? (item.secretText || '').replace(/\n/g, '<br>') : `SCRATCH ME`;
            }
            canvas.appendChild(el);

            el.addEventListener('dblclick', function(e) {
                if(item.type === 'text') {
                    document.getElementById('gcs-item-content').focus();
                }
            });
        });

        // Update Properties Panel
        var propsPanel = document.getElementById('gcs-item-props');
        if(state.selectedItemId) {
            propsPanel.style.display = 'block';
            var selItem = state.items.find(i => i.id === state.selectedItemId);
            if(selItem) {
                if(selItem.type === 'text') {
                    document.getElementById('gcs-text-props').style.display = 'block';
                    document.getElementById('gcs-img-props').style.display = 'none';
                    document.getElementById('gcs-scratch-props').style.display = 'none';
                    document.getElementById('gcs-item-content').value = selItem.content;
                    document.getElementById('gcs-item-size').value = selItem.size;
                    document.getElementById('gcs-item-color').value = selItem.color;
                    document.getElementById('gcs-item-font').value = selItem.font;
                    document.getElementById('gcs-item-bold').checked = selItem.bold;
                } else if(selItem.type === 'image') {
                    document.getElementById('gcs-text-props').style.display = 'none';
                    document.getElementById('gcs-img-props').style.display = 'block';
                    document.getElementById('gcs-scratch-props').style.display = 'none';
                    document.getElementById('gcs-item-width').value = selItem.w;
                    document.getElementById('gcs-item-mask').value = selItem.mask || 'none';
                } else if(selItem.type === 'scratch') {
                    document.getElementById('gcs-text-props').style.display = 'none';
                    document.getElementById('gcs-img-props').style.display = 'none';
                    document.getElementById('gcs-scratch-props').style.display = 'block';
                    document.getElementById('gcs-scratch-w').value = selItem.w;
                    document.getElementById('gcs-scratch-h').value = selItem.h;
                    document.getElementById('gcs-scratch-text').value = selItem.secretText || '';
                    document.getElementById('gcs-scratch-tsize').value = selItem.secretSize || 24;
                    document.getElementById('gcs-scratch-tcolor').value = selItem.secretColor || '#000000';
                }
            }
        } else {
            propsPanel.style.display = 'none';
        }
    }

    async function exportPNG() {
        var btn = document.getElementById('gcs-btn-export-png');
        var oldText = btn.innerText;
        btn.innerText = "🖼 Generating PNG...";
        btn.disabled = true;

        var originalSelected = state.selectedItemId;
        state.selectedItemId = null;
        renderPreview();
        await new Promise(r => setTimeout(r, 100));

        var canvasEl = document.getElementById('gcs-canvas');
        let c = await html2canvas(canvasEl, { scale: 3, useCORS: true, backgroundColor: state.bgColor });
        
        var a = document.createElement('a');
        a.href = c.toDataURL('image/png');
        a.download = `Greeting_Card_${state.theme}.png`;
        a.click();

        state.selectedItemId = originalSelected;
        renderPreview();
        btn.innerText = oldText;
        btn.disabled = false;
    }

    function exportHTML() {
        // Generate Magic HTML with effects based on theme
        var w = state.format === 'portrait' ? 400 : (state.format === 'landscape' ? 600 : 500);
        var h = state.format === 'portrait' ? 600 : (state.format === 'landscape' ? 400 : 500);
        
        var itemsHTML = '';
        state.items.forEach(item => {
            if(item.type === 'text') {
                var fw = item.bold ? 'bold' : 'normal';
                var content = (item.content || '').replace(/\n/g, '<br>');
                itemsHTML += `<div style="position:absolute; left:${item.x}px; top:${item.y}px; font-size:${item.size}px; color:${item.color}; font-family:${item.font}; font-weight:${fw}; line-height:1.3;">${content}</div>`;
            } else if(item.type === 'image') {
                let maskStyle = '';
                if(item.mask === 'circle') maskStyle = 'border-radius: 50%; object-fit: cover; aspect-ratio: 1/1;';
                else if(item.mask === 'rounded') maskStyle = 'border-radius: 15px;';
                else if(item.mask === 'star') maskStyle = 'clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%); aspect-ratio: 1/1; object-fit:cover;';
                
                itemsHTML += `<img src="${item.url}" style="position:absolute; left:${item.x}px; top:${item.y}px; width:${item.w}px; height:auto; display:block; ${maskStyle}">`;
            } else if(item.type === 'scratch') {
                var secretText = (item.secretText || '').replace(/\n/g, '<br>');
                // The secret text underneath
                itemsHTML += `<div style="position:absolute; left:${item.x}px; top:${item.y}px; width:${item.w}px; height:${item.h}px; font-size:${item.secretSize}px; color:${item.secretColor}; font-family:Arial; font-weight:bold; display:flex; align-items:center; justify-content:center; text-align:center; padding:10px; box-sizing:border-box; z-index:49; user-select:none; -webkit-user-select:none;">${secretText}</div>`;
                // The scratch canvas on top
                itemsHTML += `<canvas id="scratch_${item.id}" draggable="false" style="position:absolute; left:${item.x}px; top:${item.y}px; width:${item.w}px; height:${item.h}px; z-index:50; touch-action:none; user-select:none; -webkit-user-select:none; border-radius:4px; box-shadow:0 4px 10px rgba(0,0,0,0.2); cursor:crosshair;"></canvas>`;
            }
        });

        var bgStyle = `background-color: ${state.bgColor};`;
        if(state.bgImage) bgStyle += `background-image: url('${state.bgImage}'); background-size: cover; background-position: center;`;

        // CSS Effects based on Theme
        var effectsCSS = '';
        var effectsHTML = '';
        
        if(state.theme === 'birthday') {
            effectsCSS = `
                .confetti { position: absolute; width: 10px; height: 10px; background-color: #f00; opacity: 0; animation: fall linear infinite; }
                @keyframes fall { 0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(360deg); opacity: 1; } }
            `;
            for(let i=0; i<50; i++) {
                let left = Math.random() * 100;
                let animDur = Math.random() * 3 + 2;
                let animDel = Math.random() * 5;
                let colors = ['#fce18a', '#ff726d', '#b48def', '#f4306d', '#58d3f7'];
                let col = colors[Math.floor(Math.random()*colors.length)];
                effectsHTML += `<div class="confetti" style="left:${left}vw; background-color:${col}; animation-duration:${animDur}s; animation-delay:${animDel}s;"></div>`;
            }
        } else if(state.theme === 'christmas') {
            effectsCSS = `
                .snow { position: absolute; background: white; border-radius: 50%; opacity: 0.8; animation: snowFall linear infinite; }
                @keyframes snowFall { 0% { transform: translateY(-100vh); } 100% { transform: translateY(100vh); } }
            `;
            for(let i=0; i<80; i++) {
                let left = Math.random() * 100;
                let size = Math.random() * 5 + 2;
                let animDur = Math.random() * 5 + 5;
                let animDel = Math.random() * 5;
                effectsHTML += `<div class="snow" style="left:${left}vw; width:${size}px; height:${size}px; animation-duration:${animDur}s; animation-delay:${animDel}s;"></div>`;
            }
        } else if(state.theme === 'wedding') {
            effectsCSS = `
                .heart { position: absolute; font-size:24px; color: rgba(255,105,180,0.5); animation: floatUp linear infinite; }
                @keyframes floatUp { 0% { transform: translateY(100vh) scale(0.5); opacity:0; } 50% { opacity:1; } 100% { transform: translateY(-100vh) scale(1.5); opacity:0; } }
            `;
            for(let i=0; i<30; i++) {
                let left = Math.random() * 100;
                let animDur = Math.random() * 8 + 4;
                let animDel = Math.random() * 10;
                effectsHTML += `<div class="heart" style="left:${left}vw; animation-duration:${animDur}s; animation-delay:${animDel}s;">❤</div>`;
            }
        } else if(state.theme === 'newyear') {
            effectsCSS = `
                body { background: #000 !important; }
                .firework { position: absolute; font-size:30px; animation: pop cubic-bezier(0.1, 0.9, 0.2, 1) infinite; opacity:0; }
                @keyframes pop { 0% { transform: scale(0.1); opacity:1; } 100% { transform: scale(2); opacity:0; } }
            `;
            for(let i=0; i<20; i++) {
                let left = Math.random() * 90;
                let top = Math.random() * 50;
                let animDur = Math.random() * 2 + 1;
                let animDel = Math.random() * 5;
                effectsHTML += `<div class="firework" style="left:${left}vw; top:${top}vh; animation-duration:${animDur}s; animation-delay:${animDel}s;">🎆</div>`;
            }
        }

        var htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Magical E-Card</title>
    <style>
        body { margin:0; padding:0; min-height:100vh; background:#111827; display:flex; justify-content:center; align-items:center; font-family:-apple-system, sans-serif; overflow:hidden; }
        
        /* Particle Effects */
        #effects-container { position:fixed; top:0; left:0; width:100vw; height:100vh; pointer-events:none; z-index:0; overflow:hidden; }
        ${effectsCSS}

        /* Card Container */
        .card-container {
            width: ${w}px;
            height: ${h}px;
            position: relative;
            z-index: 10;
            perspective: 1500px;
            transform: scale(0.1);
            opacity: 0;
            transition: all 1.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .card-container.open {
            transform: scale(1);
            opacity: 1;
        }

        .card {
            width: 100%;
            height: 100%;
            position: relative;
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
            overflow: hidden;
            border-radius: 4px;
            ${state.foilEffect ? 'transform-style: preserve-3d; transition: transform 0.1s ease-out;' : ''}
            ${bgStyle}
        }

        ${state.foilEffect ? `
        .card::after {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%);
            z-index: 100;
            pointer-events: none;
            mix-blend-mode: overlay;
        }
        ` : ''}

        .envelope {
            position: absolute;
            z-index: 20;
            cursor: pointer;
            text-align: center;
            color: #fff;
            animation: float 3s ease-in-out infinite;
        }
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-20px); } 100% { transform: translateY(0px); } }

        .btn-open {
            background: linear-gradient(135deg, #ff69b4, #ff1493);
            color: white;
            border: none;
            padding: 15px 40px;
            font-size: 20px;
            border-radius: 30px;
            cursor: pointer;
            box-shadow: 0 10px 20px rgba(255,20,147,0.4);
            font-weight: bold;
            transition: transform 0.2s;
        }
        .btn-open:hover { transform: scale(1.1); }

        @media (max-width: 700px) {
            .card-container { transform: scale(0.6) !important; }
            .card-container.open { transform: scale(0.8) !important; }
        }
    </style>
</head>
<body>

    <div id="effects-container" style="display:none;">
        ${effectsHTML}
    </div>

    <div class="envelope" id="envelope">
        <h1 style="font-family:'Brush Script MT', cursive; font-size:48px; margin-bottom:30px; text-shadow: 0 4px 10px rgba(0,0,0,0.5);">You've received a Magical Card!</h1>
        <button class="btn-open" id="btn-open">Tap to Open 💌</button>
    </div>

    <div class="card-container" id="card-container">
        <div class="card">
            ${itemsHTML}
        </div>
    </div>

    <script>
        document.getElementById('btn-open').addEventListener('click', function() {
            document.getElementById('envelope').style.display = 'none';
            document.getElementById('effects-container').style.display = 'block';
            
            // Pop the card open
            setTimeout(() => {
                document.getElementById('card-container').classList.add('open');
            }, 100);
        });

        ${state.foilEffect ? `
        // 3D Foil & Tilt Mouse Tracking
        const cardInner = document.querySelector('.card');
        document.getElementById('card-container').addEventListener('mousemove', (e) => {
            const rect = document.getElementById('card-container').getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const rotX = ((y / rect.height) - 0.5) * -15; // Max 15 deg
            const rotY = ((x / rect.width) - 0.5) * 15;
            
            cardInner.style.transform = \`perspective(1000px) rotateX(\${rotX}deg) rotateY(\${rotY}deg) scale3d(1.02, 1.02, 1.02)\`;
            
            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;
            cardInner.style.setProperty('--glare-x', \`\${glareX}%\`);
            cardInner.style.setProperty('--glare-y', \`\${glareY}%\`);
        });

        document.getElementById('card-container').addEventListener('mouseleave', () => {
            cardInner.style.transform = \`perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)\`;
            cardInner.style.setProperty('--glare-x', \`50%\`);
            cardInner.style.setProperty('--glare-y', \`50%\`);
        });
        ` : ''}

        // Setup Scratch-off canvases
        const scratchCanvases = document.querySelectorAll('canvas[id^="scratch_"]');
        scratchCanvases.forEach(canvas => {
            const ctx = canvas.getContext('2d');
            const w = canvas.offsetWidth || parseInt(canvas.style.width) || 200;
            const h = canvas.offsetHeight || parseInt(canvas.style.height) || 80;
            canvas.width = w; 
            canvas.height = h;
            
            // Fill with silver scratch material
            ctx.fillStyle = '#b0b0b0';
            ctx.fillRect(0, 0, w, h);
            
            // Add pattern text
            ctx.font = 'bold 20px Arial';
            ctx.fillStyle = '#808080';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('SCRATCH TO REVEAL', w/2, h/2);

            let isDrawing = false;
            
            function scratch(e) {
                const rect = canvas.getBoundingClientRect();
                const clientX = e.touches ? e.touches[0].clientX : (e.clientX || 0);
                const clientY = e.touches ? e.touches[0].clientY : (e.clientY || 0);
                
                const x = (clientX - rect.left) * (canvas.width / rect.width);
                const y = (clientY - rect.top) * (canvas.height / rect.height);

                ctx.globalCompositeOperation = 'destination-out';
                ctx.beginPath();
                ctx.arc(x, y, 20, 0, Math.PI * 2);
                ctx.fill();
            }

            canvas.addEventListener('mousedown', (e) => { e.preventDefault(); isDrawing = true; scratch(e); });
            canvas.addEventListener('mousemove', (e) => { if(isDrawing) scratch(e); });
            window.addEventListener('mouseup', () => { isDrawing = false; });
            
            canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); }, {passive:false});
            canvas.addEventListener('touchmove', (e) => { e.preventDefault(); if(isDrawing) scratch(e); }, {passive:false});
            window.addEventListener('touchend', () => { isDrawing = false; });
        });
    </script>
</body>
</html>`;

        var blob = new Blob([htmlContent], {type: 'text/html'});
        var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `Magical_Card_${state.theme}.html`; a.click();
    }
})();
