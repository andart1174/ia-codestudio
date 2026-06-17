(function() {
    'use strict';
    
    var _prevRenderTab = window.renderTab;
    window.renderTab = function(tab) {
        if (tab === 'digital-menu') {
            window.activeTab = tab;
            document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
            var btn = document.getElementById('tab-' + tab);
            if (btn) btn.classList.add('active');
            
            document.querySelectorAll('.center-panel, .right-panel, .workspace').forEach(el => el.style.display = 'none');
            var ws = document.getElementById(tab + '-workspace');
            if (ws) ws.style.display = 'flex';
            
            var c = document.getElementById('dmp-center');
            var r = document.getElementById('dmp-right');
            if(c) c.style.display = 'flex';
            if(r) r.style.display = 'block';
            
            buildUI();
            return;
        }
        if (_prevRenderTab) _prevRenderTab(tab);
    };

    var state = {
        restaurantName: 'Le Petit Bistro',
        subtitle: 'Authentic French Cuisine',
        currency: '€',
        theme: 'luxury-gold',
        shape: 'phone',
        logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
        items: [
            { category: 'Entrées', name: "Soupe à l'Oignon", desc: 'Classic onion soup with melted gruyère', price: '12' },
            { category: 'Entrées', name: 'Escargots de Bourgogne', desc: 'Snails in garlic-herb butter', price: '16' },
            { category: 'Plats Principaux', name: 'Coq au Vin', desc: 'Chicken braised with wine, lardoons, and mushrooms', price: '28' },
            { category: 'Plats Principaux', name: 'Steak Frites', desc: 'Ribeye steak with herb butter and french fries', price: '34' }
        ]
    };

    function buildUI() {
        var c = document.getElementById('dmp-center');
        var r = document.getElementById('dmp-right');
        if(!c || !r) return;

        c.innerHTML = `
            <div id="dmp-preview-wrapper" style="width:100%; height:100%; display:flex; justify-content:center; align-items:center; background:#0f172a; overflow-y:auto; padding:20px;">
                <iframe id="dmp-iframe" style="width:100%; height:100%; border:none; transition:all 0.4s cubic-bezier(0.16, 1, 0.3, 1);"></iframe>
            </div>
        `;

        r.innerHTML = `
            <div style="color:white;font-family:sans-serif;">
                <h2 style="margin:0 0 5px;color:#ff9600;font-size:18px;">🧾 Digital Menu Pro</h2>
                <p style="margin:0 0 15px;font-size:11px;color:#94a3b8;">Interactive Price List / Restaurant Menu</p>
                
                <label style="font-size:11px;color:#fef08a;">Export Shape / Format:</label>
                <select id="dmp-shape" style="width:100%;margin-bottom:10px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                    <option value="phone">📱 Phone / Téléphone</option>
                    <option value="tablet">💊 Tablet / Tablette</option>
                    <option value="desktop">🖥️ Desktop 4K / Écran 4K</option>
                    <option value="full">🌐 Full Page / Pleine Page</option>
                </select>

                <label style="font-size:11px;color:#fef08a;">Theme (Design):</label>
                <select id="dmp-theme" style="width:100%;margin-bottom:15px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                    <option value="luxury-gold">Luxury Gold (Dark & Gold)</option>
                    <option value="minimal-clean">Minimal Clean (White & Black)</option>
                    <option value="cafe-vibe">Café Vibe (Warm & Cozy)</option>
                    <option value="neon-nights">Neon Nights (Cyberpunk)</option>
                </select>

                <label style="font-size:11px;color:#fef08a;">Cover Photo / Logo:</label>
                <input type="file" id="dmp-logo-file" accept="image/*" style="width:100%;font-size:11px;margin-bottom:15px;color:#94a3b8;">

                <div style="margin-bottom:10px;">
                    <label style="font-size:11px;color:#fef08a;">Business Name:</label>
                    <input type="text" id="inp-dmp-name" value="${state.restaurantName}" style="width:100%;margin-bottom:5px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                </div>
                
                <div style="margin-bottom:10px;">
                    <label style="font-size:11px;color:#fef08a;">Subtitle / Tagline:</label>
                    <input type="text" id="inp-dmp-subtitle" value="${state.subtitle}" style="width:100%;margin-bottom:5px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                </div>

                <div style="margin-bottom:15px;">
                    <label style="font-size:11px;color:#fef08a;">Currency Symbol:</label>
                    <input type="text" id="inp-dmp-currency" value="${state.currency}" style="width:100%;margin-bottom:5px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                </div>

                <hr style="border:0;border-top:1px solid #334155;margin:15px 0;">
                <label style="font-size:11px;color:#fef08a;margin-bottom:5px;display:block;">Menu Items:</label>
                <div id="dmp-items-container" style="max-height:300px;overflow-y:auto;padding-right:5px;margin-bottom:10px;"></div>
                <button id="dmp-add-item" style="width:100%;background:#334155;color:#fff;border:1px dashed #94a3b8;padding:8px;border-radius:4px;cursor:pointer;margin-bottom:15px;font-size:12px;transition:background 0.2s;">+ Add Menu Item</button>

                <button id="dmp-btn-html" style="width:100%;background:linear-gradient(135deg,#ff9600,#ff6a00);color:#fff;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;margin-bottom:10px;box-shadow:0 4px 15px rgba(255,150,0,0.3);transition:transform 0.2s;">🚀 Export Menu HTML</button>
            </div>
        `;

        setupListeners();
        renderItemsUI();
        renderPreview();
    }

    function renderItemsUI() {
        var container = document.getElementById('dmp-items-container');
        container.innerHTML = '';
        state.items.forEach((item, index) => {
            var div = document.createElement('div');
            div.style.cssText = 'background:#0f172a; padding:10px; border-radius:5px; margin-bottom:10px; border:1px solid #334155; position:relative;';
            div.innerHTML = `
                <button class="dmp-del-item" data-index="${index}" style="position:absolute;top:5px;right:5px;background:red;color:white;border:none;border-radius:3px;cursor:pointer;font-size:10px;padding:2px 5px;z-index:10;">X</button>
                <input type="text" class="dmp-i-cat" data-index="${index}" value="${item.category}" placeholder="Category (e.g. Drinks)" style="width:100%;background:#1e293b;color:#a3e635;border:1px solid #334155;padding:5px;border-radius:4px;margin-bottom:5px;font-size:11px;font-weight:bold;">
                <div style="display:flex;gap:5px;margin-bottom:5px;">
                    <input type="text" class="dmp-i-name" data-index="${index}" value="${item.name}" placeholder="Item Name" style="flex:1;background:#1e293b;color:#fff;border:1px solid #334155;padding:5px;border-radius:4px;">
                    <input type="text" class="dmp-i-price" data-index="${index}" value="${item.price}" placeholder="Price" style="width:60px;background:#1e293b;color:#fff;border:1px solid #334155;padding:5px;border-radius:4px;text-align:right;">
                </div>
                <input type="text" class="dmp-i-desc" data-index="${index}" value="${item.desc}" placeholder="Description" style="width:100%;background:#1e293b;color:#94a3b8;border:1px solid #334155;padding:5px;border-radius:4px;font-size:11px;">
            `;
            container.appendChild(div);
        });

        document.querySelectorAll('.dmp-i-cat').forEach(el => el.addEventListener('input', e => { state.items[e.target.dataset.index].category = e.target.value; renderPreview(); }));
        document.querySelectorAll('.dmp-i-name').forEach(el => el.addEventListener('input', e => { state.items[e.target.dataset.index].name = e.target.value; renderPreview(); }));
        document.querySelectorAll('.dmp-i-price').forEach(el => el.addEventListener('input', e => { state.items[e.target.dataset.index].price = e.target.value; renderPreview(); }));
        document.querySelectorAll('.dmp-i-desc').forEach(el => el.addEventListener('input', e => { state.items[e.target.dataset.index].desc = e.target.value; renderPreview(); }));
        document.querySelectorAll('.dmp-del-item').forEach(el => el.addEventListener('click', e => { state.items.splice(e.target.dataset.index, 1); renderItemsUI(); renderPreview(); }));
    }

    function setupListeners() {
        document.getElementById('inp-dmp-name').addEventListener('input', e => { state.restaurantName = e.target.value; renderPreview(); });
        document.getElementById('inp-dmp-subtitle').addEventListener('input', e => { state.subtitle = e.target.value; renderPreview(); });
        document.getElementById('inp-dmp-currency').addEventListener('input', e => { state.currency = e.target.value; renderPreview(); });
        document.getElementById('dmp-theme').addEventListener('change', e => { state.theme = e.target.value; renderPreview(); });
        document.getElementById('dmp-shape').addEventListener('change', e => { state.shape = e.target.value; renderPreview(); });
        
        document.getElementById('dmp-logo-file').addEventListener('change', e => {
            var file = e.target.files[0];
            if(file) {
                var r = new FileReader();
                r.onload = ev => { state.logo = ev.target.result; renderPreview(); };
                r.readAsDataURL(file);
            }
        });
        
        document.getElementById('dmp-add-item').addEventListener('click', () => {
            var lastCat = state.items.length > 0 ? state.items[state.items.length-1].category : 'New Category';
            state.items.push({ category: lastCat, name: 'New Item', desc: 'Delicious ingredients', price: '10' });
            renderItemsUI();
            renderPreview();
        });

        document.getElementById('dmp-btn-html').addEventListener('click', exportHTML);
    }

    function generateSiteHTML() {
        var css = `
            * { box-sizing: border-box; }
            body { margin:0; padding:0; min-height:100vh; font-family:'Playfair Display', serif; display:flex; justify-content:center; align-items:center; overflow-x:hidden; background:#0f172a; }
            
            /* Animations */
            @keyframes slideUp { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
            @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

            .menu-wrapper {
                width: 100%;
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                position: relative;
                transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                background-color: inherit;
            }

            /* Export Shapes (Mockups) */
            @media (min-width: 600px) {
                .shape-phone .menu-wrapper { max-width: 390px; min-height: 844px; margin: 40px auto; border-radius: 45px; box-shadow: 0 0 0 14px #000, 0 30px 60px rgba(0,0,0,0.5); overflow:hidden; }
                .shape-phone .menu-wrapper::after { content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 140px; height: 30px; background: #000; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; z-index: 100; }
                
                .shape-tablet .menu-wrapper { max-width: 800px; min-height: 1100px; margin: 40px auto; border-radius: 24px; box-shadow: 0 0 0 16px #111, 0 40px 80px rgba(0,0,0,0.6); overflow:hidden; }
                
                .shape-desktop .menu-wrapper { max-width: 1400px; min-height: 800px; margin: 40px auto; border-radius: 16px; box-shadow: 0 0 0 10px #222, 0 50px 100px rgba(0,0,0,0.8); overflow:hidden; display:flex; flex-direction:row; }
                .shape-desktop .cover-photo { width: 45%; height: 100%; position:sticky; top:0; }
                .shape-desktop .menu-content { width: 55%; padding:60px !important; overflow-y:auto; }

                .shape-full .menu-wrapper { max-width: 100%; margin: 0; background:transparent; box-shadow:none; }
                .shape-full .menu-content { max-width: 900px; margin: 0 auto; }
            }

            /* Themes */
            .theme-luxury-gold .menu-wrapper { background:#111; color:#d4af37; }
            .theme-luxury-gold .menu-content { background:#111; }
            .theme-luxury-gold .menu-header { border-bottom: 2px solid #d4af37; padding-bottom: 20px; }
            .theme-luxury-gold .item-name { color:#fff; }
            .theme-luxury-gold .item-desc { color:#888; }
            .theme-luxury-gold .item-dots { border-bottom: 1px dotted #555; }
            .theme-luxury-gold .category-title { color:#d4af37; }

            .theme-minimal-clean .menu-wrapper { background:#fff; color:#000; font-family:-apple-system, sans-serif; }
            .theme-minimal-clean .menu-content { background:#fff; }
            .theme-minimal-clean .menu-header { border-bottom: 1px solid #eaeaea; padding-bottom: 20px; }
            .theme-minimal-clean .item-name { color:#000; font-weight:bold; }
            .theme-minimal-clean .item-desc { color:#666; }
            .theme-minimal-clean .item-dots { border-bottom: 1px dotted #ccc; }
            .theme-minimal-clean .category-title { color:#000; letter-spacing:2px; text-transform:uppercase; border-bottom:2px solid #000; display:inline-block; margin-bottom:20px; }

            .theme-cafe-vibe .menu-wrapper { background:#fdfbf7; color:#3e2723; font-family:'Courier New', Courier, monospace; }
            .theme-cafe-vibe .menu-content { background:#fdfbf7; }
            .theme-cafe-vibe .menu-header { border-bottom: 2px dashed #8d6e63; padding-bottom: 20px; }
            .theme-cafe-vibe .item-name { color:#4e342e; font-weight:bold; }
            .theme-cafe-vibe .item-desc { color:#8d6e63; font-style:italic; }
            .theme-cafe-vibe .item-dots { border-bottom: 2px dotted #d7ccc8; }
            .theme-cafe-vibe .category-title { color:#3e2723; background:#efebe4; padding:5px 15px; border-radius:20px; display:inline-block; }

            .theme-neon-nights .menu-wrapper { background:#09090b; color:#ec4899; font-family:system-ui, sans-serif; }
            .theme-neon-nights .menu-content { background:#09090b; }
            .theme-neon-nights .menu-header { border-bottom: 1px solid rgba(236,72,153,0.3); padding-bottom: 20px; }
            .theme-neon-nights .restaurant-name { text-shadow:0 0 15px #ec4899; color:#fff; }
            .theme-neon-nights .item-name { color:#06b6d4; text-shadow:0 0 8px rgba(6,182,212,0.6); }
            .theme-neon-nights .item-desc { color:#a1a1aa; }
            .theme-neon-nights .item-dots { border-bottom: 1px dashed #3f3f46; }
            .theme-neon-nights .category-title { color:#ec4899; letter-spacing:3px; text-transform:uppercase; text-shadow:0 0 10px rgba(236,72,153,0.5); }
            .theme-neon-nights .item-price { color:#10b981; text-shadow:0 0 8px rgba(16,185,129,0.5); }

            .cover-photo { width:100%; height:250px; position:relative; overflow:hidden; flex-shrink:0; }
            .cover-img { width:100%; height:100%; object-fit:cover; animation: fadeIn 1s ease-out; }
            .cover-overlay { position:absolute; top:0; left:0; width:100%; height:100%; background:linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8)); }

            .menu-content { padding:30px 20px; width:100%; display:flex; flex-direction:column; overflow-y:auto; }
            .menu-header { text-align:center; margin-bottom:40px; animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
            .restaurant-name { font-size:42px; margin:0 0 10px; font-weight:bold; letter-spacing:1px; text-transform:uppercase; z-index:2; position:relative; }
            .subtitle { font-size:16px; margin:0; opacity:0.8; letter-spacing:2px; text-transform:uppercase; z-index:2; position:relative; }
            
            .category-section { margin-bottom:50px; animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
            .category-title { font-size:24px; margin:0 0 25px; text-align:center; }
            
            .menu-item { display:flex; flex-direction:column; margin-bottom:25px; transition:transform 0.2s; cursor:default; }
            .menu-item:hover { transform:translateX(5px); }
            .item-top { display:flex; align-items:baseline; width:100%; margin-bottom:5px; }
            .item-name { font-size:18px; margin:0; padding-right:10px; }
            .item-dots { flex-grow:1; margin:0 10px; }
            .item-price { font-size:18px; font-weight:bold; padding-left:10px; }
            .item-desc { font-size:14px; margin:0; line-height:1.4; width:85%; }

            /* Add animation delays to categories */
            .category-section:nth-child(1) { animation-delay: 0.1s; }
            .category-section:nth-child(2) { animation-delay: 0.2s; }
            .category-section:nth-child(3) { animation-delay: 0.3s; }
            .category-section:nth-child(4) { animation-delay: 0.4s; }
            .category-section:nth-child(5) { animation-delay: 0.5s; }
        `;

        // Group items by category
        var categories = {};
        state.items.forEach(item => {
            if(!categories[item.category]) categories[item.category] = [];
            categories[item.category].push(item);
        });

        var menuHTML = '';
        var catIndex = 1;
        for(var cat in categories) {
            menuHTML += `<div class="category-section" style="animation-delay:${catIndex * 0.1}s;">`;
            menuHTML += `<h2 class="category-title">${cat}</h2>`;
            categories[cat].forEach(item => {
                menuHTML += `
                    <div class="menu-item">
                        <div class="item-top">
                            <h3 class="item-name">${item.name}</h3>
                            <div class="item-dots"></div>
                            <div class="item-price">${item.price}${state.currency}</div>
                        </div>
                        <p class="item-desc">${item.desc}</p>
                    </div>
                `;
            });
            menuHTML += `</div>`;
            catIndex++;
        }

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${state.restaurantName} | Menu</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
    <style>${css}</style>
</head>
<body class="theme-${state.theme} shape-${state.shape}">
    <div class="menu-wrapper">
        ${state.logo ? `
        <div class="cover-photo">
            <img src="${state.logo}" class="cover-img" alt="Cover Photo">
            <div class="cover-overlay"></div>
        </div>` : ''}
        
        <div class="menu-content">
            <div class="menu-header">
                <h1 class="restaurant-name">${state.restaurantName}</h1>
                <p class="subtitle">${state.subtitle}</p>
            </div>
            <div class="menu-list">
                ${menuHTML}
            </div>
        </div>
    </div>
</body>
</html>`;
    }

    function renderPreview() {
        var iframe = document.getElementById('dmp-iframe');
        if(!iframe) return;
        iframe.srcdoc = generateSiteHTML();
    }

    function exportHTML() {
        var blob = new Blob([generateSiteHTML()], {type: 'text/html'});
        var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'digital-menu.html'; a.click();
    }
})();
