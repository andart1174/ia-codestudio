(function() {
    'use strict';
    
    var _prevRenderTab = window.renderTab;
    window.renderTab = function(tab) {
        if (tab === 'digital-book') {
            window.activeTab = tab;
            document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
            var btn = document.getElementById('tab-' + tab);
            if (btn) btn.classList.add('active');
            
            document.querySelectorAll('.center-panel, .right-panel, .workspace').forEach(el => el.style.display = 'none');
            var ws = document.getElementById(tab + '-workspace');
            if (ws) ws.style.display = 'flex';
            
            var c = document.getElementById('dbs-center');
            var r = document.getElementById('dbs-right');
            if(c) c.style.display = 'flex';
            if(r) r.style.display = 'block';
            
            if(!window.dbsInitialized) {
                buildUI();
                window.dbsInitialized = true;
            } else {
                renderPreview();
            }
            return;
        }
        if (_prevRenderTab) _prevRenderTab(tab);
    };

    var state = {
        pages: [
            {
                id: 'cover',
                bgImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
                bgColor: '#111',
                items: [
                    { id: 'i1', type: 'text', content: 'MY DIGITAL BOOK', x: 40, y: 150, size: 50, color: '#ffffff', font: 'Georgia', bold: true, dropCap: false },
                    { id: 'i2', type: 'text', content: 'The Interactive Experience', x: 40, y: 220, size: 20, color: '#cccccc', font: 'Arial', bold: false, dropCap: false }
                ]
            },
            {
                id: 'p1',
                bgImage: '',
                bgColor: '#fdfbf7',
                items: [
                    { id: 'i3', type: 'text', content: 'Chapter 1: The Beginning', x: 40, y: 80, size: 30, color: '#333333', font: 'Georgia', bold: true, dropCap: false },
                    { id: 'i4', type: 'text', content: 'Write your story here... Double click to edit.', x: 40, y: 140, size: 16, color: '#555555', font: 'Arial', bold: false, dropCap: true }
                ]
            }
        ],
        coverSettings: {
            binding: 'leather',
            frame: 'solid',
            barcode: false
        },
        currentPageIndex: 0,
        selectedItemId: null
    };

    var isDragging = false;
    var currentEl = null;
    var startX, startY, initialX, initialY;

    function buildUI() {
        var c = document.getElementById('dbs-center');
        var r = document.getElementById('dbs-right');
        if(!c || !r) return;

        c.innerHTML = `
            <div id="dbs-canvas-container" style="display:flex;flex-direction:column;align-items:center;height:100%;width:100%;overflow-y:auto;padding:20px;box-sizing:border-box;">
                <div id="dbs-page-controls" style="margin-bottom:20px;display:flex;gap:15px;align-items:center;background:#1e293b;padding:10px 20px;border-radius:20px;box-shadow:0 10px 30px rgba(0,0,0,0.5);">
                    <button id="dbs-btn-prev" style="background:none;border:none;color:#fff;cursor:pointer;font-weight:bold;font-size:14px;padding:5px 10px;">◀ Prev</button>
                    <span id="dbs-page-indicator" style="color:#a855f7;font-weight:bold;min-width:60px;text-align:center;font-size:14px;">Cover</span>
                    <button id="dbs-btn-next" style="background:none;border:none;color:#fff;cursor:pointer;font-weight:bold;font-size:14px;padding:5px 10px;">Next ▶</button>
                </div>
                <div id="dbs-canvas" style="width:450px; height:650px; background:#fff; position:relative; overflow:hidden; cursor:grab; flex-shrink:0; margin-bottom:40px;">
                    <!-- Content rendered dynamically -->
                </div>
            </div>
        `;

        r.innerHTML = `
            <div style="color:white;font-family:sans-serif;">
                <h2 style="margin:0 0 5px;color:#a855f7;font-size:18px;">📖 Book Studio</h2>
                <p style="margin:0 0 15px;font-size:11px;color:#94a3b8;">Create interactive digital books</p>

                <div style="background:#1e293b;padding:10px;border-radius:6px;margin-bottom:15px;">
                    <h3 style="margin:0 0 10px;font-size:13px;color:#fef08a;">Page Settings</h3>
                    <div style="display:flex;gap:10px;margin-bottom:10px;">
                        <button id="dbs-add-page" style="flex:1;background:#334155;color:#fff;border:none;padding:6px;border-radius:4px;cursor:pointer;font-size:11px;">+ Add Page</button>
                        <button id="dbs-del-page" style="flex:1;background:#ef4444;color:#fff;border:none;padding:6px;border-radius:4px;cursor:pointer;font-size:11px;">🗑 Delete Page</button>
                    </div>
                    <label style="font-size:11px;color:#94a3b8;display:block;margin-bottom:5px;">Background Color:</label>
                    <input type="color" id="dbs-page-bg-color" style="width:100%;height:30px;border:none;background:none;cursor:pointer;margin-bottom:10px;">
                    <label style="font-size:11px;color:#94a3b8;display:block;margin-bottom:5px;">Background Image (Cover):</label>
                    <input type="file" id="dbs-page-bg-img" accept="image/*" style="width:100%;font-size:11px;color:#94a3b8;">
                    <button id="dbs-clear-bg-img" style="margin-top:5px;background:none;border:1px solid #94a3b8;color:#94a3b8;padding:4px 8px;border-radius:4px;cursor:pointer;font-size:10px;">Clear Image</button>
                </div>

                <div id="dbs-cover-props" style="background:#1e293b;padding:10px;border-radius:6px;margin-bottom:15px;display:none;">
                    <h3 style="margin:0 0 10px;font-size:13px;color:#fef08a;">Premium Cover Settings</h3>
                    
                    <label style="font-size:11px;color:#94a3b8;display:block;margin-bottom:5px;">Book Binding Texture:</label>
                    <select id="dbs-cover-binding" style="width:100%;margin-bottom:10px;background:#0f172a;color:#fff;border:1px solid #334155;padding:6px;border-radius:4px;">
                        <option value="none">None</option>
                        <option value="leather">Premium Leather</option>
                        <option value="canvas">Classic Canvas</option>
                    </select>

                    <label style="font-size:11px;color:#94a3b8;display:block;margin-bottom:5px;">Cover Border Frame:</label>
                    <select id="dbs-cover-frame" style="width:100%;margin-bottom:10px;background:#0f172a;color:#fff;border:1px solid #334155;padding:6px;border-radius:4px;">
                        <option value="none">None</option>
                        <option value="solid">Solid White Border</option>
                        <option value="double">Double Luxury Gold</option>
                    </select>

                    <label style="font-size:11px;cursor:pointer;display:block;margin-bottom:5px;">
                        <input type="checkbox" id="dbs-cover-barcode"> Show Barcode / ISBN
                    </label>
                </div>

                <div style="background:#1e293b;padding:10px;border-radius:6px;margin-bottom:15px;">
                    <h3 style="margin:0 0 10px;font-size:13px;color:#fef08a;">✨ Magic Auto-Pagination</h3>
                    <p style="font-size:10px;color:#94a3b8;margin-bottom:5px;">Paste a full story. We will auto-split it into pages!</p>
                    <textarea id="dbs-magic-text" style="width:100%;height:60px;margin-bottom:5px;background:#0f172a;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;" placeholder="Once upon a time..."></textarea>
                    <button id="dbs-btn-magic" style="width:100%;background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff;border:none;padding:8px;border-radius:4px;cursor:pointer;font-size:12px;font-weight:bold;">🪄 Auto-Generate Pages</button>
                </div>

                <div style="background:#1e293b;padding:10px;border-radius:6px;margin-bottom:15px;">
                    <h3 style="margin:0 0 10px;font-size:13px;color:#fef08a;">Add Elements</h3>
                    <div style="display:flex;gap:10px;">
                        <button id="dbs-add-text" style="flex:1;background:#3b82f6;color:#fff;border:none;padding:8px;border-radius:4px;cursor:pointer;font-size:12px;">+ Text</button>
                        <button id="dbs-add-img" style="flex:1;background:#10b981;color:#fff;border:none;padding:8px;border-radius:4px;cursor:pointer;font-size:12px;" onclick="document.getElementById('dbs-add-img-file').click()">+ Photo</button>
                        <input type="file" id="dbs-add-img-file" accept="image/*" style="display:none;">
                    </div>
                </div>

                <div id="dbs-item-props" style="background:#1e293b;padding:10px;border-radius:6px;margin-bottom:15px;display:none;">
                    <h3 style="margin:0 0 10px;font-size:13px;color:#38bdf8;">Item Properties</h3>
                    
                    <div id="dbs-text-props">
                        <textarea id="dbs-item-content" style="width:100%;height:60px;margin-bottom:10px;background:#0f172a;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;"></textarea>
                        
                        <div style="display:flex;gap:10px;margin-bottom:10px;">
                            <div style="flex:1;">
                                <label style="font-size:10px;color:#94a3b8;">Size</label>
                                <input type="number" id="dbs-item-size" style="width:100%;background:#0f172a;color:#fff;border:1px solid #334155;padding:4px;border-radius:4px;">
                            </div>
                            <div style="flex:1;">
                                <label style="font-size:10px;color:#94a3b8;">Color</label>
                                <input type="color" id="dbs-item-color" style="width:100%;height:24px;border:none;background:none;cursor:pointer;">
                            </div>
                        </div>

                        <div style="margin-bottom:10px;">
                            <label style="font-size:10px;color:#94a3b8;">Font</label>
                            <select id="dbs-item-font" style="width:100%;background:#0f172a;color:#fff;border:1px solid #334155;padding:4px;border-radius:4px;">
                                <option value="Arial">Arial (Modern)</option>
                                <option value="Georgia">Georgia (Classic)</option>
                                <option value="'Courier New', Courier, monospace">Courier (Typewriter)</option>
                                <option value="'Times New Roman', Times, serif">Times New Roman</option>
                            </select>
                        </div>
                        
                        <div style="display:flex;gap:10px;margin-bottom:10px;">
                            <label style="font-size:11px;cursor:pointer;flex:1;">
                                <input type="checkbox" id="dbs-item-bold"> Bold Text
                            </label>
                            <label style="font-size:11px;cursor:pointer;flex:1;">
                                <input type="checkbox" id="dbs-item-dropcap"> Drop Cap (Inițială)
                            </label>
                        </div>
                    </div>

                    <div id="dbs-img-props" style="display:none;margin-bottom:10px;">
                        <label style="font-size:10px;color:#94a3b8;">Width</label>
                        <input type="range" id="dbs-item-width" min="50" max="400" style="width:100%;">
                    </div>

                    <button id="dbs-del-item" style="width:100%;background:#ef4444;color:#fff;border:none;padding:8px;border-radius:4px;cursor:pointer;font-size:12px;">Delete Item</button>
                </div>

                <button id="dbs-btn-export" style="width:100%;background:linear-gradient(135deg,#8b5cf6,#a855f7);color:#fff;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;box-shadow:0 4px 15px rgba(168,85,247,0.3);transition:transform 0.2s;margin-bottom:10px;">✨ Export 3D Flipbook HTML</button>
                <button id="dbs-btn-zip" style="width:100%;background:linear-gradient(135deg,#3b82f6,#2563eb);color:#fff;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;box-shadow:0 4px 15px rgba(59,130,246,0.3);transition:transform 0.2s;">📦 Export Pages as ZIP (PNGs)</button>
            </div>
        `;

        setupListeners();
        renderPreview();
    }

    function generateId() {
        return 'id_' + Math.random().toString(36).substr(2, 9);
    }

    function setupListeners() {
        var canvas = document.getElementById('dbs-canvas');
        
        // Pagination
        document.getElementById('dbs-btn-prev').addEventListener('click', () => {
            if(state.currentPageIndex > 0) {
                state.currentPageIndex--;
                state.selectedItemId = null;
                renderPreview();
            }
        });
        document.getElementById('dbs-btn-next').addEventListener('click', () => {
            if(state.currentPageIndex < state.pages.length - 1) {
                state.currentPageIndex++;
                state.selectedItemId = null;
                renderPreview();
            }
        });

        // Page Actions
        document.getElementById('dbs-add-page').addEventListener('click', () => {
            state.pages.push({
                id: generateId(),
                bgImage: '',
                bgColor: '#ffffff',
                items: []
            });
            state.currentPageIndex = state.pages.length - 1;
            state.selectedItemId = null;
            renderPreview();
        });
        document.getElementById('dbs-del-page').addEventListener('click', () => {
            if(state.pages.length <= 1) return alert("You must have at least one page.");
            state.pages.splice(state.currentPageIndex, 1);
            if(state.currentPageIndex >= state.pages.length) state.currentPageIndex = state.pages.length - 1;
            state.selectedItemId = null;
            renderPreview();
        });

        // Page BG
        document.getElementById('dbs-page-bg-color').addEventListener('input', e => {
            state.pages[state.currentPageIndex].bgColor = e.target.value;
            renderPreview();
        });
        document.getElementById('dbs-page-bg-img').addEventListener('change', e => {
            var file = e.target.files[0];
            if(file) {
                var r = new FileReader();
                r.onload = ev => { state.pages[state.currentPageIndex].bgImage = ev.target.result; renderPreview(); };
                r.readAsDataURL(file);
            }
        });
        document.getElementById('dbs-clear-bg-img').addEventListener('click', () => {
            state.pages[state.currentPageIndex].bgImage = '';
            document.getElementById('dbs-page-bg-img').value = '';
            renderPreview();
        });

        // Cover props
        document.getElementById('dbs-cover-binding').addEventListener('change', e => { state.coverSettings.binding = e.target.value; renderPreview(); });
        document.getElementById('dbs-cover-frame').addEventListener('change', e => { state.coverSettings.frame = e.target.value; renderPreview(); });
        document.getElementById('dbs-cover-barcode').addEventListener('change', e => { state.coverSettings.barcode = e.target.checked; renderPreview(); });

        // Add Items
        document.getElementById('dbs-add-text').addEventListener('click', () => {
            var newItem = { id: generateId(), type: 'text', content: 'New Text Block', x: 50, y: 50, size: 24, color: '#000000', font: 'Arial', bold: false, dropCap: false };
            state.pages[state.currentPageIndex].items.push(newItem);
            state.selectedItemId = newItem.id;
            renderPreview();
        });
        document.getElementById('dbs-add-img-file').addEventListener('change', e => {
            var file = e.target.files[0];
            if(file) {
                var r = new FileReader();
                r.onload = ev => {
                    var newItem = { id: generateId(), type: 'image', url: ev.target.result, x: 50, y: 50, w: 200 };
                    state.pages[state.currentPageIndex].items.push(newItem);
                    state.selectedItemId = newItem.id;
                    renderPreview();
                };
                r.readAsDataURL(file);
            }
        });

        // Item Properties update
        document.getElementById('dbs-item-content').addEventListener('input', e => updateItem('content', e.target.value));
        document.getElementById('dbs-item-size').addEventListener('input', e => updateItem('size', parseInt(e.target.value)));
        document.getElementById('dbs-item-color').addEventListener('input', e => updateItem('color', e.target.value));
        document.getElementById('dbs-item-font').addEventListener('change', e => updateItem('font', e.target.value));
        document.getElementById('dbs-item-bold').addEventListener('change', e => updateItem('bold', e.target.checked));
        document.getElementById('dbs-item-dropcap').addEventListener('change', e => updateItem('dropCap', e.target.checked));
        document.getElementById('dbs-item-width').addEventListener('input', e => updateItem('w', parseInt(e.target.value)));

        document.getElementById('dbs-del-item').addEventListener('click', () => {
            if(state.selectedItemId) {
                var p = state.pages[state.currentPageIndex];
                p.items = p.items.filter(i => i.id !== state.selectedItemId);
                state.selectedItemId = null;
                renderPreview();
            }
        });

        // Canvas dragging
        canvas.addEventListener('mousedown', function(e) {
            var itemEl = e.target.closest('.dbs-item');
            if(itemEl) {
                isDragging = true;
                currentEl = itemEl;
                startX = e.clientX;
                startY = e.clientY;
                initialX = parseInt(currentEl.style.left, 10) || 0;
                initialY = parseInt(currentEl.style.top, 10) || 0;
                state.selectedItemId = currentEl.dataset.id;
                renderPreview(); // Update selection UI
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
                var p = state.pages[state.currentPageIndex];
                var item = p.items.find(i => i.id === id);
                if(item) {
                    item.x = parseInt(currentEl.style.left, 10);
                    item.y = parseInt(currentEl.style.top, 10);
                }
                currentEl = null;
            }
        });

        document.getElementById('dbs-btn-export').addEventListener('click', exportFlipbookHTML);
        document.getElementById('dbs-btn-zip').addEventListener('click', exportZIP);

        document.getElementById('dbs-btn-magic').addEventListener('click', () => {
            var fullText = document.getElementById('dbs-magic-text').value.trim();
            if(!fullText) return alert('Please paste some text first!');
            
            // Characters per page (approx 1200 chars for a 450x650 page with size 16)
            var charsPerPage = 1200;
            var words = fullText.split(' ');
            var pagesNeeded = [];
            var currentPageText = '';
            
            for(var i=0; i<words.length; i++) {
                if((currentPageText.length + words[i].length) > charsPerPage) {
                    pagesNeeded.push(currentPageText);
                    currentPageText = words[i] + ' ';
                } else {
                    currentPageText += words[i] + ' ';
                }
            }
            if(currentPageText.trim().length > 0) pagesNeeded.push(currentPageText);

            if(confirm(`This will generate ${pagesNeeded.length} new pages automatically. Continue?`)) {
                pagesNeeded.forEach((textChunk, idx) => {
                    var newPage = {
                        id: generateId(),
                        bgImage: '',
                        bgColor: '#fdfbf7', // nice cream book paper color
                        items: [
                            { id: generateId(), type: 'text', content: textChunk.trim(), x: 40, y: 50, size: 16, color: '#333333', font: 'Georgia', bold: false, dropCap: idx === 0 }
                        ]
                    };
                    state.pages.push(newPage);
                });
                state.currentPageIndex = state.pages.length - pagesNeeded.length; // Jump to first generated page
                document.getElementById('dbs-magic-text').value = '';
                renderPreview();
                alert(`Success! Generated ${pagesNeeded.length} pages.`);
            }
        });
    }

    function updateItem(prop, value) {
        if(!state.selectedItemId) return;
        var p = state.pages[state.currentPageIndex];
        var item = p.items.find(i => i.id === state.selectedItemId);
        if(item) {
            item[prop] = value;
            renderPreview();
        }
    }

    function renderPreview() {
        var canvas = document.getElementById('dbs-canvas');
        var page = state.pages[state.currentPageIndex];

        // Update page controls
        document.getElementById('dbs-page-indicator').innerText = state.currentPageIndex === 0 ? 'Cover' : 'Page ' + state.currentPageIndex;
        document.getElementById('dbs-page-bg-color').value = page.bgColor || '#ffffff';

        // Render Background
        canvas.style.backgroundColor = page.bgColor;
        if(page.bgImage) {
            canvas.style.backgroundImage = `url('${page.bgImage}')`;
            canvas.style.backgroundSize = 'cover';
            canvas.style.backgroundPosition = 'center';
        } else {
            canvas.style.backgroundImage = 'none';
        }

        // Cover Settings UI & 3D Hardcover Styling
        if(state.currentPageIndex === 0) {
            document.getElementById('dbs-cover-props').style.display = 'block';
            document.getElementById('dbs-cover-binding').value = state.coverSettings.binding;
            document.getElementById('dbs-cover-frame').value = state.coverSettings.frame;
            document.getElementById('dbs-cover-barcode').checked = state.coverSettings.barcode;
            
            // Premium Hardcover 3D Edge styling
            canvas.style.boxShadow = 'inset -5px 0 10px rgba(0,0,0,0.5), inset 0 0 50px rgba(0,0,0,0.5), 10px 20px 40px rgba(0,0,0,0.8)';
            canvas.style.borderRadius = '3px 15px 15px 3px';
        } else {
            document.getElementById('dbs-cover-props').style.display = 'none';
            // Normal page styling
            canvas.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
            canvas.style.borderRadius = '0';
        }

        // Render Items
        var html = '';
        page.items.forEach(item => {
            var isSelected = item.id === state.selectedItemId;
            var border = isSelected ? 'border:1px dashed #3b82f6;' : 'border:1px dashed transparent;';
            
            if(item.type === 'text') {
                var fw = item.bold ? 'bold' : 'normal';
                var content = (item.content || '').replace(/\n/g, '<br>');
                html += `<div class="dbs-item" data-id="${item.id}" style="position:absolute; left:${item.x}px; top:${item.y}px; font-size:${item.size}px; color:${item.color}; font-family:${item.font}; font-weight:${fw}; ${border} padding:2px; cursor:move; user-select:none; max-width:400px; line-height:1.2;">${content}</div>`;
            } else if(item.type === 'image') {
                html += `<img class="dbs-item" data-id="${item.id}" src="${item.url}" style="position:absolute; left:${item.x}px; top:${item.y}px; width:${item.w}px; height:auto; ${border} cursor:move; user-select:none; pointer-events:none;">`;
            }
        });
        canvas.innerHTML = html;

        // Make images clickable by wrapping them or disabling pointer events on img and using wrapper.
        // Actually, we added pointer-events:none to img, so clicks fall through? No, if we do that we can't drag it.
        // Let's render image differently to allow dragging:
        canvas.innerHTML = '';
        page.items.forEach(item => {
            var isSelected = item.id === state.selectedItemId;
            var border = isSelected ? 'border:1px dashed #3b82f6;' : 'border:1px dashed transparent;';
            var el = document.createElement('div');
            el.className = 'dbs-item';
            el.dataset.id = item.id;
            el.style.position = 'absolute';
            el.style.left = item.x + 'px';
            el.style.top = item.y + 'px';
            el.style.cursor = 'move';
            el.style.border = isSelected ? '1px dashed #3b82f6' : '1px dashed transparent';
            
            if(item.type === 'text') {
                el.style.fontSize = item.size + 'px';
                el.style.color = item.color;
                el.style.fontFamily = item.font;
                el.style.fontWeight = item.bold ? 'bold' : 'normal';
                el.style.padding = '2px';
                el.style.maxWidth = '370px';
                el.style.lineHeight = '1.4';
                
                let contentHTML = (item.content || '').replace(/\n/g, '<br>');
                if(item.dropCap && item.content && item.content.length > 0) {
                    let firstChar = item.content.charAt(0);
                    let rest = item.content.slice(1).replace(/\n/g, '<br>');
                    contentHTML = `<span style="float:left; font-size: 3.5em; line-height: 0.8; padding-right: 8px; padding-top: 5px; font-family: 'Georgia', serif; font-weight: bold; color: ${item.color};">${firstChar}</span>${rest}`;
                }
                
                el.innerHTML = contentHTML;
            } else if(item.type === 'image') {
                el.innerHTML = `<img src="${item.url}" style="width:${item.w}px; height:auto; display:block; pointer-events:none;">`;
            }
            canvas.appendChild(el);

            // Double click to edit text inline (just focus the right panel)
            el.addEventListener('dblclick', function(e) {
                if(item.type === 'text') {
                    document.getElementById('dbs-item-content').focus();
                }
            });
        });

        if(state.currentPageIndex === 0) {
            // Add a beautiful 3D cylindrical lighting overlay over the whole cover
            let lighting = document.createElement('div');
            lighting.style.cssText = "position:absolute;left:0;top:0;width:100%;height:100%;background:linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(255,255,255,0.2) 5%, rgba(0,0,0,0.4) 8%, transparent 15%, rgba(255,255,255,0.1) 60%, rgba(0,0,0,0.5) 100%); pointer-events:none; z-index:89;";
            canvas.appendChild(lighting);

            if(state.coverSettings.binding === 'leather') {
                let d = document.createElement('div');
                d.style.cssText = "position:absolute;left:0;top:0;width:35px;height:100%;background:linear-gradient(to right, #1a1a1a, #2a2a2a 10%, #111 20%, #2a2a2a 30%, #111 80%, #1a1a1a);border-right:2px solid rgba(0,0,0,0.5);pointer-events:none;z-index:90;";
                canvas.appendChild(d);
            } else if(state.coverSettings.binding === 'canvas') {
                let d = document.createElement('div');
                d.style.cssText = "position:absolute;left:0;top:0;width:40px;height:100%;background-color:#444;background-image:radial-gradient(#333 15%, transparent 16%), radial-gradient(#333 15%, transparent 16%);background-size:4px 4px;background-position:0 0, 2px 2px;border-right:1px solid rgba(0,0,0,0.3);pointer-events:none;z-index:90;";
                canvas.appendChild(d);
            }

            if(state.coverSettings.frame === 'solid') {
                let d = document.createElement('div');
                d.style.cssText = "position:absolute;left:15px;top:15px;right:15px;bottom:15px;border:3px solid #fff;pointer-events:none;z-index:91;";
                canvas.appendChild(d);
            } else if(state.coverSettings.frame === 'double') {
                let d = document.createElement('div');
                d.style.cssText = "position:absolute;left:20px;top:20px;right:20px;bottom:20px;border:4px double #d4af37;pointer-events:none;z-index:91;";
                canvas.appendChild(d);
            }

            if(state.coverSettings.barcode) {
                let d = document.createElement('div');
                d.style.cssText = "position:absolute;right:20px;bottom:20px;background:#fff;padding:5px;z-index:92;pointer-events:none;";
                d.innerHTML = `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/UPC-A-036000291452.svg/1200px-UPC-A-036000291452.svg.png" style="height:35px;width:auto;display:block;">`;
                canvas.appendChild(d);
            }
        }

        // Update Properties Panel
        var propsPanel = document.getElementById('dbs-item-props');
        if(state.selectedItemId) {
            propsPanel.style.display = 'block';
            var selItem = page.items.find(i => i.id === state.selectedItemId);
            if(selItem) {
                if(selItem.type === 'text') {
                    document.getElementById('dbs-text-props').style.display = 'block';
                    document.getElementById('dbs-img-props').style.display = 'none';
                    document.getElementById('dbs-item-content').value = selItem.content;
                    document.getElementById('dbs-item-size').value = selItem.size;
                    document.getElementById('dbs-item-color').value = selItem.color;
                    document.getElementById('dbs-item-font').value = selItem.font;
                    document.getElementById('dbs-item-bold').checked = selItem.bold;
                    document.getElementById('dbs-item-dropcap').checked = selItem.dropCap || false;
                } else {
                    document.getElementById('dbs-text-props').style.display = 'none';
                    document.getElementById('dbs-img-props').style.display = 'block';
                    document.getElementById('dbs-item-width').value = selItem.w;
                }
            }
        } else {
            propsPanel.style.display = 'none';
        }
    }

    function exportFlipbookHTML() {
        // Generate pages HTML
        var pagesHTML = '';
        var zIndex = state.pages.length * 10;
        
        state.pages.forEach((page, i) => {
            var bgStyle = `background-color: ${page.bgColor};`;
            if(page.bgImage) {
                bgStyle += `background-image: url('${page.bgImage}'); background-size: cover; background-position: center;`;
            }

            var itemsHTML = '';
            page.items.forEach(item => {
                if(item.type === 'text') {
                    var fw = item.bold ? 'bold' : 'normal';
                    var contentHTML = (item.content || '').replace(/\n/g, '<br>');
                    if(item.dropCap && item.content && item.content.length > 0) {
                        let firstChar = item.content.charAt(0);
                        let rest = item.content.slice(1).replace(/\n/g, '<br>');
                        contentHTML = `<span style="float:left; font-size: 3.5em; line-height: 0.8; padding-right: 8px; padding-top: 5px; font-family: 'Georgia', serif; font-weight: bold; color: ${item.color};">${firstChar}</span>${rest}`;
                    }
                    itemsHTML += `<div style="position:absolute; left:${item.x}px; top:${item.y}px; font-size:${item.size}px; color:${item.color}; font-family:${item.font}; font-weight:${fw}; max-width:370px; line-height:1.4;">${contentHTML}</div>`;
                } else if(item.type === 'image') {
                    itemsHTML += `<img src="${item.url}" style="position:absolute; left:${item.x}px; top:${item.y}px; width:${item.w}px; height:auto;">`;
                }
            });

            if(i === 0) {
                if(state.coverSettings.binding === 'leather') {
                    itemsHTML += `<div style="position:absolute;left:0;top:0;width:35px;height:100%;background:linear-gradient(to right, #1a1a1a, #2a2a2a 10%, #111 20%, #2a2a2a 30%, #111 80%, #1a1a1a);border-right:2px solid rgba(0,0,0,0.5);pointer-events:none;z-index:90;"></div>`;
                } else if(state.coverSettings.binding === 'canvas') {
                    itemsHTML += `<div style="position:absolute;left:0;top:0;width:40px;height:100%;background-color:#444;background-image:radial-gradient(#333 15%, transparent 16%), radial-gradient(#333 15%, transparent 16%);background-size:4px 4px;background-position:0 0, 2px 2px;border-right:1px solid rgba(0,0,0,0.3);pointer-events:none;z-index:90;"></div>`;
                }
                if(state.coverSettings.frame === 'solid') {
                    itemsHTML += `<div style="position:absolute;left:15px;top:15px;right:15px;bottom:15px;border:3px solid #fff;pointer-events:none;z-index:91;"></div>`;
                } else if(state.coverSettings.frame === 'double') {
                    itemsHTML += `<div style="position:absolute;left:20px;top:20px;right:20px;bottom:20px;border:4px double #d4af37;pointer-events:none;z-index:91;"></div>`;
                }
                if(state.coverSettings.barcode) {
                    itemsHTML += `<div style="position:absolute;right:20px;bottom:20px;background:#fff;padding:5px;z-index:92;pointer-events:none;"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/UPC-A-036000291452.svg/1200px-UPC-A-036000291452.svg.png" style="height:35px;width:auto;display:block;"></div>`;
                }
            }

            // zIndex ensures first page is on top
            pagesHTML += `
                <div class="book-page" id="page-${i}" style="z-index: ${zIndex - i}; ${bgStyle}">
                    ${itemsHTML}
                    <div class="page-number">${i === 0 ? '' : i}</div>
                </div>
            `;
        });

        var htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Digital Book</title>
    <style>
        * { box-sizing: border-box; }
        body { margin:0; padding:0; min-height:100vh; background:#1e293b; display:flex; flex-direction:column; justify-content:center; align-items:center; font-family:-apple-system, sans-serif; overflow:hidden; perspective: 1500px; }
        
        .scene {
            width: 450px;
            height: 650px;
            position: relative;
            transform-style: preserve-3d;
            transform: rotateX(5deg);
        }

        .book-page {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0; left: 0;
            transform-origin: left center;
            transition: transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
            box-shadow: inset 0 0 20px rgba(0,0,0,0.1), 5px 5px 15px rgba(0,0,0,0.3);
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            overflow: hidden;
            backface-visibility: hidden; /* Only see the front */
            cursor: pointer;
        }

        .book-page.flipped {
            transform: rotateY(-180deg);
        }

        .page-number {
            position: absolute;
            bottom: 15px;
            right: 20px;
            font-size: 12px;
            color: rgba(0,0,0,0.5);
            font-family: monospace;
        }

        /* Add a spine shadow */
        .book-page::before {
            content: '';
            position: absolute;
            top:0; left:0;
            width: 30px; height: 100%;
            background: linear-gradient(to right, rgba(0,0,0,0.3), transparent);
            z-index: 100;
        }

        .controls {
            margin-top: 40px;
            display: flex;
            gap: 20px;
        }

        button {
            background: #8b5cf6;
            color: #fff;
            border: none;
            padding: 10px 20px;
            border-radius: 20px;
            cursor: pointer;
            font-weight: bold;
            font-size: 14px;
            box-shadow: 0 4px 10px rgba(139, 92, 246, 0.4);
            transition: transform 0.1s;
        }
        button:active { transform: scale(0.95); }
        button:disabled { background: #475569; cursor: not-allowed; box-shadow:none; }

        @media (max-width: 500px) {
            .scene { transform: scale(0.7); }
        }
    </style>
</head>
<body>

    <div class="scene">
        ${pagesHTML}
    </div>

    <div class="controls">
        <button id="btn-prev" disabled>◀ Previous</button>
        <button id="btn-next">Next ▶</button>
    </div>

    <script>
        const pages = document.querySelectorAll('.book-page');
        let currentPage = 0;
        const btnPrev = document.getElementById('btn-prev');
        const btnNext = document.getElementById('btn-next');
        
        // Base64 Paper Flip Sound
        const flipSound = new Audio('data:audio/mp3;base64,//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
        function playFlip() {
            try {
                flipSound.currentTime = 0;
                flipSound.play().catch(e=>{});
            } catch(e){}
        }

        function updateState() {
            pages.forEach((page, index) => {
                if(index < currentPage) {
                    page.classList.add('flipped');
                } else {
                    page.classList.remove('flipped');
                }
            });

            btnPrev.disabled = currentPage === 0;
            btnNext.disabled = currentPage === pages.length;
        }

        btnNext.addEventListener('click', () => {
            if(currentPage < pages.length) {
                currentPage++;
                updateState();
                playFlip();
            }
        });

        btnPrev.addEventListener('click', () => {
            if(currentPage > 0) {
                currentPage--;
                updateState();
                playFlip();
            }
        });

        // Click on right side of book to go next, left side to go prev
        pages.forEach((page, index) => {
            page.addEventListener('click', (e) => {
                const rect = page.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                if(clickX > rect.width / 2) {
                    if(currentPage < pages.length) { currentPage++; updateState(); playFlip(); }
                } else {
                    if(currentPage > 0) { currentPage--; updateState(); playFlip(); }
                }
            });
        });

        updateState();
    </script>
</body>
</html>`;

        var blob = new Blob([htmlContent], {type: 'text/html'});
        var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'digital-book-3d.html'; a.click();
    }

    async function exportZIP() {
        var btn = document.getElementById('dbs-btn-zip');
        var oldText = btn.innerText;
        btn.innerText = "📦 Generating ZIP...";
        btn.disabled = true;

        var zip = new JSZip();
        var canvasEl = document.getElementById('dbs-canvas');
        var originalPage = state.currentPageIndex;
        var originalSelected = state.selectedItemId;
        
        state.selectedItemId = null; // deselect border

        for(let i = 0; i < state.pages.length; i++) {
            state.currentPageIndex = i;
            renderPreview();
            
            // Allow DOM to update and images to load
            await new Promise(r => setTimeout(r, 150));
            
            let c = await html2canvas(canvasEl, { scale: 3, useCORS: true, backgroundColor: state.pages[i].bgColor || '#ffffff' });
            let data = c.toDataURL('image/png').split(',')[1];
            let name = i === 0 ? '00_Cover.png' : `Page_${i.toString().padStart(2, '0')}.png`;
            zip.file(name, data, {base64: true});
        }

        // Restore state
        state.currentPageIndex = originalPage;
        state.selectedItemId = originalSelected;
        renderPreview();

        zip.generateAsync({type:"blob"}).then(function(content) {
            var a = document.createElement('a');
            a.href = URL.createObjectURL(content);
            a.download = 'digital-book-pages.zip';
            a.click();
            btn.innerText = oldText;
            btn.disabled = false;
        });
    }
})();
