(function() {
    'use strict';
    
    var _prevRenderTab = window.renderTab;
    window.renderTab = function(tab) {
        if (tab === 'smart-vcard') {
            window.activeTab = tab;
            document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
            var btn = document.getElementById('tab-' + tab);
            if (btn) btn.classList.add('active');
            
            document.querySelectorAll('.center-panel, .right-panel, .workspace').forEach(el => el.style.display = 'none');
            var ws = document.getElementById(tab + '-workspace');
            if (ws) ws.style.display = 'flex';
            
            var c = document.getElementById('svc-center');
            var r = document.getElementById('svc-right');
            if(c) c.style.display = 'flex';
            if(r) r.style.display = 'block';
            
            buildUI();
            return;
        }
        if (_prevRenderTab) _prevRenderTab(tab);
    };

    var state = {
        name: 'John Smith',
        title: 'Chief Executive Officer',
        company: 'TechCorp Solutions',
        phone: '+1 234 567 8900',
        email: 'john.smith@techcorp.com',
        website: 'www.techcorp.com',
        address: '123 Innovation Drive, NY',
        linkedin: 'linkedin.com/in/johnsmith',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&h=150&q=80',
        theme: 'premium-dark',
        language: 'en'
    };

    var i18n = {
        en: {
            save: "💾 Save to Contacts",
            phone: "Phone",
            email: "Email",
            website: "Website",
            address: "Address",
            linkedin: "LinkedIn",
            scan: "Scan to visit"
        },
        fr: {
            save: "💾 Enregistrer le contact",
            phone: "Téléphone",
            email: "Email",
            website: "Site Web",
            address: "Adresse",
            linkedin: "LinkedIn",
            scan: "Scanner pour visiter"
        }
    };

    function buildUI() {
        var c = document.getElementById('svc-center');
        var r = document.getElementById('svc-right');
        if(!c || !r) return;

        c.innerHTML = `
            <div id="svc-preview-wrapper" style="width:375px; height:812px; border-radius:40px; box-shadow:0 0 0 10px #000, 0 20px 50px rgba(0,0,0,0.5); overflow:hidden; position:relative; background:#1e293b;">
                <!-- Phone Notch -->
                <div style="position:absolute; top:0; left:50%; transform:translateX(-50%); width:150px; height:30px; background:#000; border-bottom-left-radius:20px; border-bottom-right-radius:20px; z-index:100;"></div>
                
                <iframe id="svc-iframe" style="width:100%; height:100%; border:none;"></iframe>
            </div>
        `;

        r.innerHTML = `
            <div style="color:white;font-family:sans-serif;">
                <h2 style="margin:0 0 5px;color:#0096ff;font-size:18px;">📇 Smart vCard 3.0</h2>
                <p style="margin:0 0 15px;font-size:11px;color:#94a3b8;">NFC-ready Digital Business Card</p>
                
                <label style="font-size:11px;color:#fef08a;">Language / Langue:</label>
                <select id="svc-language" style="width:100%;margin-bottom:15px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                </select>

                <label style="font-size:11px;color:#fef08a;">Theme (Design):</label>
                <select id="svc-theme" style="width:100%;margin-bottom:15px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                    <option value="premium-dark">Premium Dark (Corporate)</option>
                    <option value="minimal-light">Minimalist Light (Clean)</option>
                    <option value="holographic">Holographic (Creative)</option>
                </select>

                <label style="font-size:11px;color:#fef08a;">Profile Picture:</label>
                <input type="file" id="svc-avatar-file" accept="image/*" style="width:100%;font-size:11px;margin-bottom:15px;color:#94a3b8;">

                <div style="margin-bottom:10px;">
                    <label style="font-size:11px;color:#fef08a;">Full Name:</label>
                    <input type="text" id="inp-svc-name" value="${state.name}" style="width:100%;margin-bottom:5px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                </div>
                
                <div style="margin-bottom:10px;">
                    <label style="font-size:11px;color:#fef08a;">Job Title:</label>
                    <input type="text" id="inp-svc-title" value="${state.title}" style="width:100%;margin-bottom:5px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                </div>

                <div style="margin-bottom:10px;">
                    <label style="font-size:11px;color:#fef08a;">Company:</label>
                    <input type="text" id="inp-svc-company" value="${state.company}" style="width:100%;margin-bottom:5px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                </div>

                <div style="margin-bottom:10px;">
                    <label style="font-size:11px;color:#fef08a;">Phone Number:</label>
                    <input type="text" id="inp-svc-phone" value="${state.phone}" style="width:100%;margin-bottom:5px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                </div>

                <div style="margin-bottom:10px;">
                    <label style="font-size:11px;color:#fef08a;">Email Address:</label>
                    <input type="text" id="inp-svc-email" value="${state.email}" style="width:100%;margin-bottom:5px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                </div>

                <div style="margin-bottom:10px;">
                    <label style="font-size:11px;color:#fef08a;">Website URL:</label>
                    <input type="text" id="inp-svc-website" value="${state.website}" style="width:100%;margin-bottom:5px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                </div>

                <div style="margin-bottom:10px;">
                    <label style="font-size:11px;color:#fef08a;">Location / Address:</label>
                    <input type="text" id="inp-svc-address" value="${state.address}" style="width:100%;margin-bottom:5px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                </div>

                <div style="margin-bottom:15px;">
                    <label style="font-size:11px;color:#fef08a;">LinkedIn Profile:</label>
                    <input type="text" id="inp-svc-linkedin" value="${state.linkedin}" style="width:100%;margin-bottom:5px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                </div>

                <button id="svc-btn-html" style="width:100%;background:linear-gradient(135deg,#0096ff,#0064ff);color:#fff;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;margin-bottom:10px;">🌐 Export vCard HTML</button>
            </div>
        `;

        setupListeners();
        renderPreview();
    }

    function setupListeners() {
        ['name', 'title', 'company', 'phone', 'email', 'website', 'address', 'linkedin'].forEach(f => {
            document.getElementById('inp-svc-'+f).addEventListener('input', e => { state[f] = e.target.value; renderPreview(); });
        });
        document.getElementById('svc-theme').addEventListener('change', e => { state.theme = e.target.value; renderPreview(); });
        document.getElementById('svc-language').addEventListener('change', e => { state.language = e.target.value; renderPreview(); });
        
        document.getElementById('svc-avatar-file').addEventListener('change', e => {
            var file = e.target.files[0];
            if(file) {
                var r = new FileReader();
                r.onload = ev => { state.avatar = ev.target.result; renderPreview(); };
                r.readAsDataURL(file);
            }
        });

        document.getElementById('svc-btn-html').addEventListener('click', exportHTML);
    }

    function generateVCardData() {
        return `BEGIN:VCARD
VERSION:3.0
FN:${state.name}
TITLE:${state.title}
ORG:${state.company}
TEL;TYPE=CELL:${state.phone}
EMAIL;TYPE=WORK:${state.email}
URL:${state.website}
URL;TYPE=LinkedIn:https://${state.linkedin}
ADR;TYPE=WORK:;;${state.address};;;;
END:VCARD`;
    }

    function generateSiteHTML(forExport = false) {
        var vcardData = encodeURIComponent(generateVCardData());
        var vcardLink = forExport ? `data:text/vcard;charset=utf-8,${vcardData}` : '#';
        var t = i18n[state.language];

        var css = `
            * { box-sizing: border-box; }
            body { margin:0; padding:0; min-height:100vh; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; display:flex; flex-direction:column; align-items:center; overflow-x:hidden; }
            
            /* Animations */
            @keyframes slideUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-item { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
            .delay-1 { animation-delay: 0.1s; }
            .delay-2 { animation-delay: 0.2s; }
            .delay-3 { animation-delay: 0.3s; }
            .delay-4 { animation-delay: 0.4s; }

            .theme-premium-dark { background:#111827; color:#fff; }
            .theme-premium-dark .card-container { background:#1f2937; border:1px solid #374151; box-shadow:0 20px 25px -5px rgba(0,0,0,0.5); }
            .theme-premium-dark .btn-save { background:linear-gradient(135deg, #3b82f6, #2563eb); color:#fff; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4); }
            .theme-premium-dark .info-item { border-bottom:1px solid #374151; }

            .theme-minimal-light { background:#f3f4f6; color:#111827; }
            .theme-minimal-light .card-container { background:#fff; box-shadow:0 20px 25px -5px rgba(0,0,0,0.1); border:1px solid #e5e7eb;}
            .theme-minimal-light .btn-save { background:linear-gradient(135deg, #111827, #374151); color:#fff; box-shadow: 0 4px 15px rgba(17, 24, 39, 0.2); }
            .theme-minimal-light .info-item { border-bottom:1px solid #e5e7eb; }

            .theme-holographic { background:linear-gradient(135deg, #0f172a, #312e81); color:#fff; }
            .theme-holographic .card-container { background:rgba(255,255,255,0.1); backdrop-filter:blur(15px); border:1px solid rgba(255,255,255,0.2); box-shadow:0 8px 32px rgba(0,0,0,0.3); }
            .theme-holographic .btn-save { background:linear-gradient(90deg, #ff00cc, #3333ff); color:#fff; border:none; box-shadow: 0 4px 20px rgba(255, 0, 204, 0.4); }
            .theme-holographic .info-item { border-bottom:1px solid rgba(255,255,255,0.1); }

            .card-container { width:100%; max-width:400px; border-radius:24px; padding:30px 20px 80px 20px; margin-top:40px; display:flex; flex-direction:column; align-items:center; position:relative; }
            
            .avatar { width:110px; height:110px; border-radius:50%; object-fit:cover; margin-top:-80px; border:4px solid transparent; box-shadow:0 10px 25px rgba(0,0,0,0.3); background-clip:padding-box; transition: transform 0.3s ease; }
            .avatar:hover { transform: scale(1.05); }
            .theme-premium-dark .avatar { border-color:#1f2937; }
            .theme-minimal-light .avatar { border-color:#fff; }
            .theme-holographic .avatar { border-color:transparent; background-image:linear-gradient(135deg, #ff00cc, #3333ff); padding:4px; }

            .name { font-size:26px; font-weight:800; margin:15px 0 5px; text-align:center; letter-spacing:-0.5px; }
            .title { font-size:15px; font-weight:600; color:#8b5cf6; margin:0 0 5px; text-align:center; }
            .company { font-size:13px; opacity:0.7; margin:0 0 25px; text-align:center; text-transform:uppercase; letter-spacing:1.5px; font-weight:500; }
            
            .btn-save { display:block; width:100%; padding:16px; border-radius:14px; font-weight:bold; font-size:16px; text-align:center; text-decoration:none; margin-bottom:30px; transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1); cursor:pointer; }
            .btn-save:hover { transform:translateY(-2px); filter:brightness(1.1); }
            .btn-save:active { transform:translateY(1px); }

            .info-list { width:100%; display:flex; flex-direction:column; gap:5px; }
            .info-item { display:flex; padding:16px 12px; align-items:center; text-decoration:none; color:inherit; border-radius:12px; transition:background 0.2s; }
            .info-item:hover { background:rgba(139, 92, 246, 0.1); }
            .info-icon { font-size:22px; margin-right:15px; width:35px; height:35px; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.05); border-radius:10px; }
            .theme-minimal-light .info-icon { background:rgba(0,0,0,0.04); }
            .info-content { display:flex; flex-direction:column; flex:1; }
            .info-label { font-size:11px; opacity:0.6; margin-bottom:4px; text-transform:uppercase; font-weight:600; letter-spacing:0.5px; }
            .info-value { font-size:15px; font-weight:500; word-break:break-word; }
            .info-arrow { opacity:0.3; font-size:14px; transition:transform 0.2s; }
            .info-item:hover .info-arrow { transform:translateX(3px); opacity:0.8; }
            
            .qr-section { margin-top:35px; text-align:center; padding:25px; background:#fff; border-radius:20px; box-shadow:0 10px 30px rgba(0,0,0,0.1); width:100%; }
            .qr-section img { display:block; margin:0 auto; width:140px; height:140px; border-radius:10px; }
            .qr-text { color:#1f2937; font-size:13px; margin-top:15px; font-weight:700; text-transform:uppercase; letter-spacing:1px; }

            /* Floating Share Button */
            .fab-share { position:absolute; top:20px; right:20px; width:50px; height:50px; border-radius:50%; background:linear-gradient(135deg, #10b981, #059669); color:white; display:flex; align-items:center; justify-content:center; font-size:22px; box-shadow:0 10px 25px rgba(16, 185, 129, 0.4); cursor:pointer; transition:transform 0.3s; z-index:100; border:none; outline:none; }
            .fab-share:hover { transform:scale(1.1) rotate(5deg); }
        `;

        var qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(state.website);

        return `<!DOCTYPE html>
<html lang="${state.language}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>${state.name} | Digital vCard</title>
    <style>${css}</style>
</head>
<body class="theme-${state.theme}">
    <div class="card-container animate-item">
        <img src="${state.avatar}" class="avatar" alt="Profile">
        <h1 class="name">${state.name}</h1>
        <div class="title">${state.title}</div>
        <div class="company">${state.company}</div>
        
        <a href="${vcardLink}" ${forExport ? 'download="contact.vcf"' : ''} class="btn-save animate-item delay-1">
            ${t.save}
        </a>

        <div class="info-list">
            <a href="tel:${state.phone}" class="info-item animate-item delay-2">
                <div class="info-icon">📞</div>
                <div class="info-content">
                    <span class="info-label">${t.phone}</span>
                    <span class="info-value">${state.phone}</span>
                </div>
                <div class="info-arrow">→</div>
            </a>
            <a href="mailto:${state.email}" class="info-item animate-item delay-2">
                <div class="info-icon">✉️</div>
                <div class="info-content">
                    <span class="info-label">${t.email}</span>
                    <span class="info-value">${state.email}</span>
                </div>
                <div class="info-arrow">→</div>
            </a>
            <a href="https://${state.website}" target="_blank" class="info-item animate-item delay-3">
                <div class="info-icon">🌐</div>
                <div class="info-content">
                    <span class="info-label">${t.website}</span>
                    <span class="info-value">${state.website}</span>
                </div>
                <div class="info-arrow">→</div>
            </a>
            ${state.address ? `
            <a href="https://maps.google.com/?q=${encodeURIComponent(state.address)}" target="_blank" class="info-item animate-item delay-3">
                <div class="info-icon">📍</div>
                <div class="info-content">
                    <span class="info-label">${t.address}</span>
                    <span class="info-value">${state.address}</span>
                </div>
                <div class="info-arrow">→</div>
            </a>` : ''}
            ${state.linkedin ? `
            <a href="https://${state.linkedin}" target="_blank" class="info-item animate-item delay-3">
                <div class="info-icon">💼</div>
                <div class="info-content">
                    <span class="info-label">${t.linkedin}</span>
                    <span class="info-value">${state.linkedin}</span>
                </div>
                <div class="info-arrow">→</div>
            </a>` : ''}
        </div>
        
        <div class="qr-section animate-item delay-4">
            <img src="${qrUrl}" alt="QR Code">
            <div class="qr-text">${t.scan}</div>
        </div>

        <div style="text-align:center;margin-top:14px;margin-bottom:8px;font-size:11px;opacity:0.75;" class="animate-item delay-4">
            <a href="https://ia-codestudio.com" target="_blank" rel="noopener" style="color:inherit;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">⚡ Powered by <strong>IA Code Studio</strong></a>
        </div>

        <!-- Smart Web Share API functionality -->
        <button class="fab-share animate-item delay-4" onclick="shareCard()" title="Share">🚀</button>
    </div>

    <script>
        function shareCard() {
            if (navigator.share) {
                navigator.share({
                    title: '${state.name} - ${state.title}',
                    text: 'Here is my digital business card!',
                    url: window.location.href
                }).catch(console.error);
            } else {
                alert('Web Share API not supported in this browser. You can copy the URL instead.');
            }
        }
    </script>
</body>
</html>`;
    }

    function renderPreview() {
        var iframe = document.getElementById('svc-iframe');
        if(!iframe) return;
        iframe.srcdoc = generateSiteHTML(false);
    }

    function exportHTML() {
        var blob = new Blob([generateSiteHTML(true)], {type: 'text/html'});
        var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'vcard.html'; a.click();
    }
})();
