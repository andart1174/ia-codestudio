(function() {
    'use strict';
    
    var _prevRenderTab = window.renderTab;
    window.renderTab = function(tab) {
        if (tab === 'biolink-hub') {
            window.activeTab = tab;
            document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
            var btn = document.getElementById('tab-' + tab);
            if (btn) btn.classList.add('active');
            
            document.querySelectorAll('.center-panel, .right-panel, .workspace').forEach(el => el.style.display = 'none');
            var ws = document.getElementById(tab + '-workspace');
            if (ws) ws.style.display = 'flex';
            
            var c = document.getElementById('bhp-center');
            var r = document.getElementById('bhp-right');
            if(c) c.style.display = 'flex';
            if(r) r.style.display = 'block';
            
            buildUI();
            return;
        }
        if (_prevRenderTab) _prevRenderTab(tab);
    };

    var state = {
        name: 'Jane Doe',
        bio: 'Digital Creator & Entrepreneur',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
        theme: 'midnight',
        shape: 'phone',
        links: [
            { text: 'Visit My Website', url: 'https://example.com', icon: '🌐' },
            { text: 'Follow on Instagram', url: 'https://instagram.com', icon: '📸' }
        ]
    };

    function buildUI() {
        var c = document.getElementById('bhp-center');
        var r = document.getElementById('bhp-right');
        if(!c || !r) return;

        c.innerHTML = `
            <div id="bhp-preview-wrapper" style="width:100%; height:100%; display:flex; justify-content:center; align-items:center; background:#0f172a; overflow-y:auto; padding:20px;">
                <iframe id="bhp-iframe" style="width:100%; height:100%; border:none; transition:all 0.4s cubic-bezier(0.16, 1, 0.3, 1);"></iframe>
            </div>
        `;

        r.innerHTML = `
            <div style="color:white;font-family:sans-serif;">
                <h2 style="margin:0 0 5px;color:#00ff96;font-size:18px;">🔗 BioLink Hub Pro</h2>
                <p style="margin:0 0 15px;font-size:11px;color:#94a3b8;">Create interactive Link-in-Bio pages</p>
                
                <label style="font-size:11px;color:#fef08a;">Export Shape / Format:</label>
                <select id="bhp-shape" style="width:100%;margin-bottom:10px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                    <option value="phone">📱 Phone / Téléphone</option>
                    <option value="tablet">💊 Tablet / Tablette</option>
                    <option value="desktop">🖥️ Desktop 4K / Écran 4K</option>
                    <option value="full">🌐 Full Page / Pleine Page</option>
                </select>

                <label style="font-size:11px;color:#fef08a;">Theme (Design):</label>
                <select id="bhp-theme" style="width:100%;margin-bottom:15px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                    <option value="midnight">Midnight (Dark & Neon)</option>
                    <option value="blossom">Blossom (Pink Gradient)</option>
                    <option value="ocean">Ocean Glass (Blue)</option>
                    <option value="brutal">Brutalist (Yellow/Black)</option>
                    <option value="cyber">Cyberpunk (Neon Hacker)</option>
                </select>

                <label style="font-size:11px;color:#fef08a;">Profile Picture:</label>
                <input type="file" id="bhp-avatar-file" accept="image/*" style="width:100%;font-size:11px;margin-bottom:15px;color:#94a3b8;">

                <div style="margin-bottom:10px;">
                    <label style="font-size:11px;color:#fef08a;">Name:</label>
                    <input type="text" id="inp-name" value="${state.name}" style="width:100%;margin-bottom:5px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                </div>
                
                <div style="margin-bottom:15px;">
                    <label style="font-size:11px;color:#fef08a;">Bio / Description:</label>
                    <input type="text" id="inp-bio" value="${state.bio}" style="width:100%;margin-bottom:5px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                </div>

                <hr style="border:0;border-top:1px solid #334155;margin:15px 0;">
                <label style="font-size:11px;color:#fef08a;margin-bottom:5px;display:block;">Links Configuration:</label>
                <div id="bhp-links-container"></div>
                <button id="bhp-add-link" style="width:100%;background:#334155;color:#fff;border:1px dashed #94a3b8;padding:8px;border-radius:4px;cursor:pointer;margin-bottom:15px;font-size:12px;transition:background 0.2s;">+ Add New Link</button>

                <button id="bhp-btn-html" style="width:100%;background:linear-gradient(135deg,#00ff96,#00b368);color:#000;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;margin-bottom:10px;box-shadow:0 4px 15px rgba(0,255,150,0.3);transition:transform 0.2s;">🚀 Export HTML</button>
            </div>
        `;

        setupListeners();
        renderLinksUI();
        renderPreview();
    }

    function renderLinksUI() {
        var container = document.getElementById('bhp-links-container');
        container.innerHTML = '';
        state.links.forEach((link, index) => {
            var div = document.createElement('div');
            div.style.cssText = 'background:#0f172a; padding:10px; border-radius:5px; margin-bottom:10px; border:1px solid #334155; position:relative;';
            div.innerHTML = `
                <button class="bhp-del-link" data-index="${index}" style="position:absolute;top:5px;right:5px;background:red;color:white;border:none;border-radius:3px;cursor:pointer;font-size:10px;padding:2px 5px;">X</button>
                <input type="text" class="bhp-l-icon" data-index="${index}" value="${link.icon}" placeholder="Icon (e.g. 🌐)" style="width:30px;background:#1e293b;color:#fff;border:1px solid #334155;padding:5px;border-radius:4px;margin-bottom:5px;">
                <input type="text" class="bhp-l-text" data-index="${index}" value="${link.text}" placeholder="Button Text" style="width:calc(100% - 45px);background:#1e293b;color:#fff;border:1px solid #334155;padding:5px;border-radius:4px;margin-bottom:5px;">
                <input type="text" class="bhp-l-url" data-index="${index}" value="${link.url}" placeholder="URL (https://...)" style="width:100%;background:#1e293b;color:#fff;border:1px solid #334155;padding:5px;border-radius:4px;">
            `;
            container.appendChild(div);
        });

        document.querySelectorAll('.bhp-l-text').forEach(el => el.addEventListener('input', e => { state.links[e.target.dataset.index].text = e.target.value; renderPreview(); }));
        document.querySelectorAll('.bhp-l-icon').forEach(el => el.addEventListener('input', e => { state.links[e.target.dataset.index].icon = e.target.value; renderPreview(); }));
        document.querySelectorAll('.bhp-l-url').forEach(el => el.addEventListener('input', e => { state.links[e.target.dataset.index].url = e.target.value; renderPreview(); }));
        document.querySelectorAll('.bhp-del-link').forEach(el => el.addEventListener('click', e => { state.links.splice(e.target.dataset.index, 1); renderLinksUI(); renderPreview(); }));
    }

    function setupListeners() {
        document.getElementById('inp-name').addEventListener('input', e => { state.name = e.target.value; renderPreview(); });
        document.getElementById('inp-bio').addEventListener('input', e => { state.bio = e.target.value; renderPreview(); });
        document.getElementById('bhp-theme').addEventListener('change', e => { state.theme = e.target.value; renderPreview(); });
        document.getElementById('bhp-shape').addEventListener('change', e => { state.shape = e.target.value; renderPreview(); });
        
        document.getElementById('bhp-add-link').addEventListener('click', () => {
            state.links.push({ text: 'New Button', url: 'https://', icon: '✨' });
            renderLinksUI();
            renderPreview();
        });

        document.getElementById('bhp-avatar-file').addEventListener('change', e => {
            var file = e.target.files[0];
            if(file) {
                var r = new FileReader();
                r.onload = ev => { state.avatar = ev.target.result; renderPreview(); };
                r.readAsDataURL(file);
            }
        });

        document.getElementById('bhp-btn-html').addEventListener('click', exportHTML);
    }

    function generateSiteHTML() {
        var css = `
            * { box-sizing: border-box; }
            body { margin:0; padding:0; min-height:100vh; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display:flex; justify-content:center; align-items:center; overflow-x:hidden; }
            
            /* Backgrounds */
            body.theme-midnight { background:#0f172a; }
            body.theme-blossom { background:linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%); }
            body.theme-ocean { background:url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80') center/cover fixed; }
            body.theme-ocean::before { content:''; position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,50,100,0.5); backdrop-filter:blur(8px); z-index:-1; }
            body.theme-brutal { background:#ffea00; }
            body.theme-cyber { background:#0a0a0a; background-image:radial-gradient(circle at 50% 50%, #1a0033 0%, #000 100%); }

            /* Animations */
            @keyframes slideIn { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
            @keyframes float { 0% { transform:translateY(0px); } 50% { transform:translateY(-10px); } 100% { transform:translateY(0px); } }
            @keyframes pulseGlow { 0% { box-shadow:0 0 10px rgba(0,255,204,0.3); } 50% { box-shadow:0 0 30px rgba(0,255,204,0.8); } 100% { box-shadow:0 0 10px rgba(0,255,204,0.3); } }

            .biolink-card {
                width: 100%;
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 50px 20px;
                position: relative;
                transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            }

            /* Export Shapes (Mockups) */
            @media (min-width: 600px) {
                .shape-phone .biolink-card { max-width: 380px; min-height: 820px; margin: 40px auto; border-radius: 45px; box-shadow: 0 0 0 14px #000, 0 30px 60px rgba(0,0,0,0.5); background:rgba(255,255,255,0.02); backdrop-filter:blur(10px); }
                .shape-phone .biolink-card::after { content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 140px; height: 30px; background: #000; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; z-index: 100; }
                
                .shape-tablet .biolink-card { max-width: 768px; min-height: 1024px; margin: 40px auto; border-radius: 24px; box-shadow: 0 0 0 16px #111, 0 40px 80px rgba(0,0,0,0.6); background:rgba(255,255,255,0.02); backdrop-filter:blur(5px); padding: 80px 40px; }
                
                .shape-desktop .biolink-card { max-width: 1100px; min-height: 650px; margin: 40px auto; border-radius: 16px; box-shadow: 0 0 0 10px #222, 0 50px 100px rgba(0,0,0,0.8); background:rgba(255,255,255,0.02); backdrop-filter:blur(5px); flex-direction: row; justify-content: center; gap: 80px; padding: 60px; }
                .shape-desktop .profile-section { max-width: 350px; text-align: center; }
                .shape-desktop .links-section { flex: 1; max-width: 500px; margin-top:0; }
                
                .shape-full .biolink-card { max-width: 650px; margin: 0 auto; background:transparent; box-shadow:none; }
            }

            .profile-section { display:flex; flex-direction:column; align-items:center; animation: slideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1); z-index:10; width:100%; }
            .links-section { width:100%; display:flex; flex-direction:column; gap:16px; margin-top:35px; z-index:10; }

            /* Avatar */
            .avatar { width:130px; height:130px; border-radius:50%; object-fit:cover; margin-bottom:20px; box-shadow:0 10px 25px rgba(0,0,0,0.2); animation: float 6s ease-in-out infinite; border: 4px solid transparent; }
            .theme-midnight .avatar { border-color:#334155; }
            .theme-blossom .avatar { border-color:#fff; }
            .theme-ocean .avatar { border-color:rgba(255,255,255,0.5); }
            .theme-brutal .avatar { border-radius:0; border:4px solid #000; box-shadow:8px 8px 0 #000; animation:none; }
            .theme-cyber .avatar { border-color:#00ffcc; box-shadow:0 0 20px #00ffcc; border-radius:30%; animation: pulseGlow 3s infinite; }

            /* Text */
            .name { font-size:28px; font-weight:800; margin:0 0 8px; text-align:center; display:flex; align-items:center; justify-content:center; gap:8px; }
            .bio { font-size:15px; opacity:0.9; text-align:center; margin:0 0 10px; line-height:1.6; font-weight:500; max-width:320px; }
            
            .theme-midnight .name, .theme-midnight .bio { color:#f8fafc; }
            .theme-blossom .name, .theme-blossom .bio { color:#111827; }
            .theme-ocean .name, .theme-ocean .bio { color:#fff; text-shadow:0 2px 4px rgba(0,0,0,0.5); }
            .theme-brutal .name, .theme-brutal .bio { color:#000; font-family:monospace; text-transform:uppercase; font-weight:900; }
            .theme-cyber .name { color:#fff; text-shadow:0 0 10px #ff00ff, 0 0 20px #ff00ff; }
            .theme-cyber .bio { color:#00ffcc; }

            /* Verified Badge */
            .verified { color:#3b82f6; font-size:22px; display:inline-flex; }
            .theme-brutal .verified { color:#000; }
            .theme-cyber .verified { color:#ff00ff; text-shadow:0 0 10px #ff00ff; }

            /* Links */
            .link-btn { display:flex; align-items:center; padding:16px 20px; text-decoration:none; border-radius:14px; transition:all 0.3s cubic-bezier(0.25,0.8,0.25,1); position:relative; overflow:hidden; animation: slideIn 0.8s both; }
            .link-icon { font-size:24px; margin-right:15px; display:flex; align-items:center; justify-content:center; width:40px; height:40px; border-radius:10px; }
            .link-text { flex:1; font-weight:700; font-size:16px; text-align:center; margin-right:55px; letter-spacing:0.5px; } 

            /* Themes for Links */
            .theme-midnight .link-btn { background:#1e293b; color:#fff; border:1px solid #334155; box-shadow:0 4px 6px rgba(0,0,0,0.3); }
            .theme-midnight .link-btn:hover { background:#334155; border-color:#00ff96; box-shadow:0 0 20px rgba(0,255,150,0.2); transform:translateY(-3px); }
            .theme-midnight .link-icon { background:rgba(255,255,255,0.05); }

            .theme-blossom .link-btn { background:rgba(255,255,255,0.6); backdrop-filter:blur(10px); color:#111827; border:1px solid rgba(255,255,255,0.8); box-shadow:0 10px 20px rgba(0,0,0,0.05); border-radius:30px; }
            .theme-blossom .link-btn:hover { background:#fff; transform:translateY(-4px); box-shadow:0 15px 30px rgba(251, 194, 235, 0.4); }
            
            .theme-ocean .link-btn { background:rgba(255,255,255,0.1); color:#fff; border:1px solid rgba(255,255,255,0.3); backdrop-filter:blur(10px); }
            .theme-ocean .link-btn:hover { background:rgba(255,255,255,0.2); transform:scale(1.03); box-shadow:0 10px 25px rgba(0,0,0,0.2); }

            .theme-brutal .link-btn { background:#fff; color:#000; border:4px solid #000; border-radius:0; box-shadow:6px 6px 0 #000; text-transform:uppercase; }
            .theme-brutal .link-btn:hover { transform:translate(2px,2px); box-shadow:4px 4px 0 #000; background:#000; color:#ffea00; }
            .theme-brutal .link-btn:hover .link-icon { filter:invert(1); }

            .theme-cyber .link-btn { background:transparent; color:#00ffcc; border:2px solid #00ffcc; border-radius:0; position:relative; text-transform:uppercase; box-shadow:inset 0 0 10px rgba(0,255,204,0.2), 0 0 10px rgba(0,255,204,0.2); }
            .theme-cyber .link-btn:hover { background:#00ffcc; color:#000; box-shadow:0 0 20px #00ffcc; }
            .theme-cyber .link-btn::before { content:''; position:absolute; top:0; left:-100%; width:100%; height:100%; background:linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent); transition:all 0.4s; }
            .theme-cyber .link-btn:hover::before { left:100%; }

            /* Particles for Background FX */
            .particles { position:fixed; top:0; left:0; width:100vw; height:100vh; pointer-events:none; z-index:0; overflow:hidden; }
            .particle { position:absolute; border-radius:50%; background:rgba(255,255,255,0.1); animation: float 10s infinite linear; }
            
            /* Add animation delays to links */
            ${state.links.map((_,i) => `.link-btn:nth-child(${i+1}) { animation-delay: ${0.2 + (i*0.1)}s; }`).join('\n')}
            
        `;

        var linksHTML = state.links.map(l => `
            <a href="${l.url}" target="_blank" class="link-btn">
                <span class="link-icon">${l.icon}</span>
                <span class="link-text">${l.text}</span>
            </a>
        `).join('');

        // Generate particles for cool themes
        var particlesHTML = '';
        if(state.theme === 'midnight' || state.theme === 'cyber' || state.theme === 'ocean') {
            for(let i=0; i<20; i++) {
                let size = Math.random() * 12 + 2;
                let left = Math.random() * 100;
                let top = Math.random() * 100;
                let delay = Math.random() * 5;
                let duration = Math.random() * 15 + 10;
                let color = state.theme === 'cyber' ? '#00ffcc' : 'rgba(255,255,255,0.15)';
                particlesHTML += `<div class="particle" style="width:${size}px; height:${size}px; left:${left}%; top:${top}%; background:${color}; animation-delay:${delay}s; animation-duration:${duration}s;"></div>`;
            }
        }

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${state.name} | Bio Hub</title>
    <style>${css}</style>
</head>
<body class="theme-${state.theme} shape-${state.shape}">
    <div class="particles">${particlesHTML}</div>
    <div class="biolink-card">
        <div class="profile-section">
            <img src="${state.avatar}" class="avatar" alt="Profile">
            <h1 class="name">${state.name} <span class="verified" title="Verified Creator">✔</span></h1>
            <p class="bio">${state.bio}</p>
        </div>
        <div class="links-section">
            ${linksHTML}
        </div>
    </div>
</body>
</html>`;
    }

    function renderPreview() {
        var iframe = document.getElementById('bhp-iframe');
        if(!iframe) return;
        iframe.srcdoc = generateSiteHTML();
    }

    function exportHTML() {
        var blob = new Blob([generateSiteHTML()], {type: 'text/html'});
        var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'biolink.html'; a.click();
    }
})();
