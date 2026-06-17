(function() {
    'use strict';
    var _prevRenderTab = window.renderTab;
    var S = {
        name: 'John Doe',
        title: 'Creative Director',
        contact: 'john@example.com | @johndoe',
        logoImg: null,
        bgColor: '#0f172a',
        textColor: '#ffffff',
        accentColor: '#ec4899'
    };

    window.renderTab = function(tab) {
        if (tab === 'ar-business-card') {
            window.activeTab = tab;
            document.querySelectorAll('.ltab').forEach(function(b) { b.classList.remove('active'); });
            var btn = document.getElementById('tab-' + tab);
            if (btn) btn.classList.add('active');

            document.querySelectorAll('.center-panel').forEach(function(p) { p.style.display = 'none'; });
            document.querySelectorAll('.right-panel').forEach(function(p) { p.style.display = 'none'; });
            document.querySelectorAll('.workspace').forEach(function(w) { w.style.display = 'none'; });

            var ws = document.getElementById(tab + '-workspace');
            if (ws) ws.style.display = 'flex';
            
            var c = document.getElementById('abc-center');
            var r = document.getElementById('abc-right');
            if(c) c.style.display = 'flex';
            if(r) r.style.display = 'block';

            buildUI();
            updatePreview();
            return;
        }
        if (_prevRenderTab) _prevRenderTab(tab);
    };

    function buildUI() {
        var r = document.getElementById('abc-right');
        if (!r) return;

        var fr = window.lang === 'fr';
        var labelName = fr ? "Nom :" : "Name:";
        var labelTitle = fr ? "Poste occupé :" : "Job Title:";
        var labelContact = fr ? "Contact / Lien :" : "Contact / Link:";
        var labelUpload = fr ? "Télécharger Logo / Avatar :" : "Upload Logo / Avatar:";
        var labelBg = fr ? "Arrière-plan :" : "Background:";
        var labelAccent = fr ? "Couleur d'accent :" : "Accent:";
        var labelUrl = fr ? "URL d'hébergement pour QR Code :" : "Hosted URL for QR Code:";
        var btnGetQr = fr ? "Obtenir QR" : "Get QR";
        var btnExport = fr ? "Exporter AR HTML" : "Export AR HTML";
        var labelScan = fr ? "Scannez avec un téléphone pour voir en RA." : "Scan this code with a phone to view in AR.";
        var labelGuide = fr ? "Hébergez cet HTML et associez le QR Code" : "Host this HTML and link to QR Code";

        var html = '<div style="color:white;font-family:sans-serif;">' +
            '<h2 style="margin:0 0 5px;color:#ec4899;font-size:18px;">🪞 AR Biz Card</h2>' +
            '<p style="margin:0 0 20px;font-size:11px;color:#94a3b8;">Holographic WebXR Profile</p>' +
            
            '<label style="font-size:11px;color:#fbcfe8;">' + labelName + '</label>' +
            '<input type="text" id="abc-name" value="'+S.name+'" style="width:100%;margin-bottom:10px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;font-weight:bold;">' +
            
            '<label style="font-size:11px;color:#fbcfe8;">' + labelTitle + '</label>' +
            '<input type="text" id="abc-title" value="'+S.title+'" style="width:100%;margin-bottom:10px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">' +
            
            '<label style="font-size:11px;color:#fbcfe8;">' + labelContact + '</label>' +
            '<input type="text" id="abc-contact" value="'+S.contact+'" style="width:100%;margin-bottom:15px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">' +
            
            '<label style="font-size:11px;color:#fbcfe8;">' + labelUpload + '</label>' +
            '<input type="file" id="abc-f" accept="image/*" style="width:100%;font-size:11px;margin-bottom:15px;color:#94a3b8;">' +
            
            '<div style="display:flex;gap:10px;margin-bottom:20px;">' +
            '<div style="flex:1"><label style="font-size:11px;color:#fbcfe8;">' + labelBg + '</label><br><input type="color" id="abc-bg" value="'+S.bgColor+'" style="width:100%;height:30px;border:none;background:transparent;cursor:pointer;"></div>' +
            '<div style="flex:1"><label style="font-size:11px;color:#fbcfe8;">' + labelAccent + '</label><br><input type="color" id="abc-ac" value="'+S.accentColor+'" style="width:100%;height:30px;border:none;background:transparent;cursor:pointer;"></div>' +
            '</div>' +
            
            '<label style="font-size:11px;color:#fbcfe8;">' + labelUrl + '</label>' +
            '<div style="display:flex;gap:5px;margin-bottom:15px;">' +
            '<input type="text" id="abc-url" placeholder="https://my-site.com/ar-card.html" style="flex:1;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">' +
            '<button id="abc-gen-qr" style="background:#334155;color:#fff;border:none;padding:8px;border-radius:4px;cursor:pointer;font-size:12px;">' + btnGetQr + '</button>' +
            '</div>' +
            
            '<div id="abc-qr-box" style="display:none;text-align:center;margin-bottom:15px;background:#000;padding:10px;border-radius:8px;">' +
            '<img id="abc-qr-img" src="" style="width:150px;height:150px;border-radius:4px;display:block;margin:0 auto 10px;">' +
            '<span style="font-size:10px;color:#94a3b8;">' + labelScan + '</span>' +
            '</div>' +
            
            '<button id="abc-exp-html" style="width:100%;background:linear-gradient(135deg,#ec4899,#f43f5e);color:#fff;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;">🌐 ' + btnExport + '</button>' +
            '<div id="abc-st" style="margin-top:15px;font-size:11px;text-align:center;color:#ec4899;">' + labelGuide + '</div>' +
            '</div>';

        r.innerHTML = html;
        
        document.getElementById('abc-name').oninput = function(e){ S.name = e.target.value; updatePreview(); };
        document.getElementById('abc-title').oninput = function(e){ S.title = e.target.value; updatePreview(); };
        document.getElementById('abc-contact').oninput = function(e){ S.contact = e.target.value; updatePreview(); };
        document.getElementById('abc-bg').oninput = function(e){ S.bgColor = e.target.value; updatePreview(); };
        document.getElementById('abc-ac').oninput = function(e){ S.accentColor = e.target.value; updatePreview(); };
        document.getElementById('abc-url').oninput = function(){ updatePreview(); };
        
        document.getElementById('abc-f').onchange = function(e) {
            var f = e.target.files[0];
            if(!f) return;
            var rdr = new FileReader();
            rdr.onload = function(ev) { S.logoImg = ev.target.result; updatePreview(); };
            rdr.readAsDataURL(f);
        };
        
        document.getElementById('abc-gen-qr').onclick = function() {
            var url = document.getElementById('abc-url').value.trim();
            if(!url) { alert(fr ? 'Veuillez saisir l\'URL où vous hébergez le fichier HTML.' : 'Please enter the URL where you hosted the exported HTML file.'); return; }
            var qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=' + encodeURIComponent(url);
            document.getElementById('abc-qr-img').src = qrUrl;
            document.getElementById('abc-qr-box').style.display = 'block';
        };
        
        document.getElementById('abc-exp-html').onclick = function() {
            var js = `
            var card = document.getElementById('card');
            
            // Mouse tracking for desktop
            document.addEventListener('mousemove', function(e) {
                var w = window.innerWidth, h = window.innerHeight;
                var rx = (e.clientY / h - 0.5) * 30; // -15 to 15 deg
                var ry = (e.clientX / w - 0.5) * -30;
                card.style.transform = 'rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
            });
            
            // Gyroscope tracking for mobile 3D tilt effect
            if (window.DeviceOrientationEvent) {
                if (typeof DeviceOrientationEvent.requestPermission === 'function') {
                    document.body.addEventListener('click', function() {
                        DeviceOrientationEvent.requestPermission()
                        .then(function(response) {
                            if (response == 'granted') {
                                window.addEventListener('deviceorientation', handleOrientation);
                            }
                        })
                        .catch(console.error);
                    }, { once: true });
                } else {
                    window.addEventListener('deviceorientation', handleOrientation);
                }
            }
            
            function handleOrientation(e) {
                if(e.gamma === null || e.beta === null) return;
                var ry = Math.min(Math.max(e.gamma, -45), 45) * 0.8;
                var rx = Math.min(Math.max(e.beta - 45, -45), 45) * -0.8;
                card.style.transform = 'rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
            }
            `;
            
            var css = `
            body { margin: 0; padding: 0; background: #0b0f19; height: 100vh; display: flex; align-items: center; justify-content: center; font-family: 'Inter', sans-serif; perspective: 1000px; overflow: hidden; }
            .scene { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at center, rgba(30,41,59,0.5) 0%, rgba(3,7,18,0.95) 100%); position: relative; z-index: 1; }
            .card { width: 320px; height: 485px; background: ${S.bgColor}; border-radius: 20px; padding: 40px 30px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; transform-style: preserve-3d; transition: transform 0.1s ease-out; box-shadow: 0 20px 50px rgba(0,0,0,0.8), 0 0 0 2px ${S.accentColor}44; }
            .card::before { content:''; position:absolute; top:0;left:0;right:0;bottom:0; border-radius: 20px; background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%); pointer-events: none; transform: translateZ(1px); }
            .logo { width: 100px; height: 100px; border-radius: 50px; background: #fff; margin-bottom: 20px; object-fit: cover; border: 4px solid ${S.accentColor}; box-shadow: 0 10px 20px rgba(0,0,0,0.5); transform: translateZ(40px); }
            .name { color: ${S.textColor}; font-size: 26px; font-weight: 900; margin: 0 0 8px; text-align: center; transform: translateZ(30px); text-shadow: 0 4px 10px rgba(0,0,0,0.5); }
            .title { color: ${S.accentColor}; font-size: 14px; font-weight: bold; margin: 0 0 20px; text-align: center; transform: translateZ(25px); text-transform: uppercase; letter-spacing: 2px; }
            .contact { color: ${S.textColor}; font-size: 13px; opacity: 0.8; text-align: center; transform: translateZ(20px); background: rgba(0,0,0,0.3); padding: 8px 16px; border-radius: 15px; margin-bottom: 20px; }
            .qr-container { display: flex; align-items: center; justify-content: center; padding: 6px; background: #fff; border-radius: 8px; box-shadow: 0 6px 15px rgba(0,0,0,0.4); transform: translateZ(35px); }
            .qr-img { width: 80px; height: 80px; display: block; }
            `;
            
            var imgHtml = S.logoImg ? '<img src="'+S.logoImg+'" class="logo">' : '<div class="logo" style="width:100px;height:100px;border-radius:50px;background:#334155;border:4px solid '+S.accentColor+';margin-bottom:20px;transform:translateZ(40px);box-shadow:0 10px 20px rgba(0,0,0,0.5);"></div>';
            
            var urlVal = document.getElementById('abc-url') ? document.getElementById('abc-url').value.trim() : '';
            var qrVal = urlVal || S.contact;
            var qrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent(qrVal);
            
            var html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>AR Business Card</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet"><style>'+css+'</style></head><body>';
            html += '<div class="scene"><div class="card" id="card">';
            html += imgHtml;
            html += '<h1 class="name">'+S.name+'</h1>';
            html += '<div class="title">'+S.title+'</div>';
            html += '<div class="contact">'+S.contact+'</div>';
            html += '<div class="qr-container"><img src="' + qrCodeUrl + '" class="qr-img"></div>';
            html += '</div></div>';
            html += '<scr'+'ipt>'+js+'<'+'/script></body></html>';
            
            var blob = new Blob([html], { type: 'text/html;charset=utf-8' });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a'); a.href = url; a.download = 'ar_business_card.html'; a.click();
            setTimeout(function() { URL.revokeObjectURL(url); }, 2000);
        };
    }

    function updatePreview() {
        var c = document.getElementById('abc-center');
        if (!c) return;
        c.style.perspective = '1000px';
        c.style.position = 'relative';
        c.style.background = 'radial-gradient(circle at center, rgba(30,41,59,0.5) 0%, rgba(3,7,18,0.95) 100%)';
        
        // Remove existing video webcam if any
        var oldVid = document.getElementById('abc-webcam');
        if (oldVid) {
            if (oldVid.srcObject) {
                var tracks = oldVid.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
            oldVid.remove();
        }
        
        var imgHtml = S.logoImg ? '<img src="'+S.logoImg+'" style="width:90px;height:90px;border-radius:45px;object-fit:cover;border:4px solid '+S.accentColor+';margin-bottom:15px;transform:translateZ(40px);box-shadow:0 10px 20px rgba(0,0,0,0.5);">' : '<div style="width:90px;height:90px;border-radius:45px;background:#334155;border:4px solid '+S.accentColor+';margin-bottom:15px;transform:translateZ(40px);box-shadow:0 10px 20px rgba(0,0,0,0.5);"></div>';
        
        var urlVal = document.getElementById('abc-url') ? document.getElementById('abc-url').value.trim() : '';
        var qrVal = urlVal || S.contact;
        var qrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent(qrVal);
        
        var cardHtml = '<div id="abc-card-preview" style="width:280px;height:440px;background:'+S.bgColor+';border-radius:20px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:25px 20px;box-sizing:border-box;transform-style:preserve-3d;transition:transform 0.1s;box-shadow:0 20px 40px rgba(0,0,0,0.8), 0 0 0 2px '+S.accentColor+'44;position:relative;z-index:1;">';
        
        cardHtml += '<div style="position:absolute;top:0;left:0;right:0;bottom:0;border-radius:20px;background:linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%);pointer-events:none;transform:translateZ(1px);"></div>';
        cardHtml += imgHtml;
        cardHtml += '<h1 style="color:'+S.textColor+';font-size:22px;font-weight:900;margin:0 0 8px;text-align:center;transform:translateZ(30px);text-shadow:0 4px 10px rgba(0,0,0,0.5);">'+S.name+'</h1>';
        cardHtml += '<div style="color:'+S.accentColor+';font-size:12px;font-weight:bold;margin:0 0 18px;text-align:center;transform:translateZ(25px);text-transform:uppercase;letter-spacing:1px;">'+S.title+'</div>';
        cardHtml += '<div style="color:'+S.textColor+';font-size:11px;opacity:0.8;text-align:center;transform:translateZ(20px);background:rgba(0,0,0,0.3);padding:6px 12px;border-radius:15px;margin-bottom:15px;word-break:break-all;max-width:100%;">'+S.contact+'</div>';
        cardHtml += '<div style="display:flex;align-items:center;justify-content:center;padding:5px;background:#fff;border-radius:6px;box-shadow:0 6px 12px rgba(0,0,0,0.4);transform:translateZ(35px);"><img src="' + qrCodeUrl + '" style="width:70px;height:70px;display:block;"></div>';
        cardHtml += '</div>';
        
        // Append card wrapper
        var wrapper = document.getElementById('abc-card-wrapper');
        if (wrapper) wrapper.remove();
        
        wrapper = document.createElement('div');
        wrapper.id = 'abc-card-wrapper';
        wrapper.style.cssText = 'position:relative;z-index:1;width:280px;height:440px;transform-style:preserve-3d;';
        wrapper.innerHTML = cardHtml;
        c.appendChild(wrapper);
        
        // Add hover effect
        var card = document.getElementById('abc-card-preview');
        c.onmousemove = function(e) {
            var rect = c.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var rx = (y / rect.height - 0.5) * 30; // -15 to 15
            var ry = (x / rect.width - 0.5) * -30;
            if(card) card.style.transform = 'rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
        };
        c.onmouseleave = function() {
            if(card) card.style.transform = 'rotateX(0deg) rotateY(0deg)';
        };
    }
})();
