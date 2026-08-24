(function() {
    'use strict';

    var _prevRenderTab = window.renderTab;
    window.renderTab = function(tab) {
        if (tab === 'showroom-3d') {
            window.activeTab = tab;
            document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
            var btn = document.getElementById('tab-' + tab);
            if (btn) btn.classList.add('active');
            
            document.querySelectorAll('.center-panel, .right-panel, .workspace').forEach(el => el.style.display = 'none');
            var ws = document.getElementById('showroom-3d-workspace');
            if (ws) ws.style.display = 'flex';
            
            var c = document.getElementById('sr-center');
            var r = document.getElementById('sr-right');
            if(c) c.style.display = 'flex';
            if(r) r.style.display = 'block';
            
            buildUI();
            return;
        }
        if (_prevRenderTab) _prevRenderTab(tab);
    };

    var S = {
        shape: 'can',
        logoUrl: null,
        bgColor: '#0f172a',
        primaryColor: '#3b82f6',
        accentColor: '#8b5cf6',
        lightMood: 'studio',
        motion: 'rotateY',
        headline: 'GLOW SODA',
        subhead: 'Taste the Future. Zero Sugar.',
        textSize: 1,
        textColor: '#ffffff',
        textY: 0,
        
        // Three.js variables
        active: false,
        renderer: null,
        scene: null,
        camera: null,
        mesh: null,
        lights: [],
        canvas: null
    };

    function buildUI() {
        var r = document.getElementById('sr-right');
        var c = document.getElementById('sr-center');
        if(!r || !c) return;

        var fr = window.lang === 'fr';
        
        // Setup center panel canvas layout
        c.innerHTML = `
            <div id="sr-canvas-container" style="width:100%; height:100%; position:relative; display:flex; align-items:center; justify-content:center;">
                <canvas id="sr-three-canvas" style="width:100%; height:100%; display:block;"></canvas>
                <div id="sr-text-overlay" style="position:absolute; top:15%; left:0; width:100%; text-align:center; pointer-events:none; font-family:'Outfit',sans-serif; text-shadow:0 4px 12px rgba(0,0,0,0.6); transform:translateY(${S.textY}px);">
                    <h1 id="sr-over-head" style="margin:0 0 5px; font-weight:900; font-size:${3.5 * S.textSize}vw; color:${S.textColor}; text-transform:uppercase; letter-spacing:1.5px;">${S.headline}</h1>
                    <p id="sr-over-sub" style="margin:0; font-weight:300; font-size:${1.6 * S.textSize}vw; color:${S.accentColor};">${S.subhead}</p>
                </div>
            </div>
        `;

        // Right panel controls
        var labelShape = fr ? "Forme du Produit :" : "Product Shape:";
        var labelUpload = fr ? "Télécharger l'étiquette (Image) :" : "Upload Label Texture:";
        var labelColors = fr ? "Palette de Couleurs :" : "Color Scheme:";
        var labelBg = fr ? "Couleur de Fond :" : "Background Color:";
        var labelPrimary = fr ? "Couleur Principale :" : "Primary Color:";
        var labelAccent = fr ? "Couleur Lueur/Accent :" : "Accent Glow Color:";
        var labelLighting = fr ? "Style d'Éclairage :" : "Lighting Mood:";
        var labelMotion = fr ? "Animation 3D :" : "Product Animation:";
        var labelText = fr ? "Textes Superposés :" : "Headline Overlay:";
        var labelTitle = fr ? "Titre Principal :" : "Main Title:";
        var labelSub = fr ? "Sous-titre :" : "Sub-headline:";
        var labelSize = fr ? "Taille du Texte :" : "Text Scale:";
        var labelY = fr ? "Position Verticale (Y) :" : "Vertical Adjust (Y):";
        
        var optCan = fr ? "Canette de Soda" : "Soda Can";
        var optBox = fr ? "Boîte / Packaging" : "Product Box";
        var optCyl = fr ? "Cylindre / Bouteille" : "Cylinder / Bottle";
        var optSph = fr ? "Sphère Premium" : "Premium Sphere";
        
        var optStudio = fr ? "Studio (Neutre)" : "Studio (Neutral)";
        var optDramatic = fr ? "Dramatique (Contraste)" : "Dramatic (High Contrast)";
        var optNeon = fr ? "Nuits Néon (Rose/Cyan)" : "Neon Nights (Pink/Cyan)";
        
        var optRot = fr ? "Rotation Y Continue" : "Continuous Y Rotation";
        var optFloat = fr ? "Flottaison / Oscillation" : "Floating / Hover Tilt";
        var optPulse = fr ? "Pulsation Élastique" : "Elastic Pulsation";
        var optStatic = fr ? "Statique (Contrôle Souris)" : "Static (Mouse Tilt)";

        var btnExportHtml = fr ? "Exporter Showroom HTML" : "Export Showroom HTML";
        var btnCaptureImg = fr ? "Prendre une Photo (PNG)" : "Capture Screenshot (PNG)";

        r.innerHTML = `
            <div style="color:white;font-family:sans-serif;padding-bottom:20px;">
                <h2 style="margin:0 0 5px;color:#a855f7;font-size:18px;">🔮 3D Showroom</h2>
                <p style="margin:0 0 15px;font-size:11px;color:#94a3b8;">Interactive WebGL Ad Banners</p>
                
                <div style="display:flex;flex-direction:column;gap:12px;">
                    <div>
                        <label style="font-size:11px;color:#d8b4fe;display:block;margin-bottom:4px;">${labelShape}</label>
                        <select id="sr-shape" style="width:100%;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                            <option value="can">${optCan}</option>
                            <option value="box">${optBox}</option>
                            <option value="cylinder">${optCyl}</option>
                            <option value="sphere">${optSph}</option>
                        </select>
                    </div>
 
                    <div>
                        <label style="font-size:11px;color:#d8b4fe;display:block;margin-bottom:4px;">${labelUpload}</label>
                        <input type="file" id="sr-file" accept="image/*" style="width:100%;font-size:11px;color:#94a3b8;">
                    </div>
 
                    <hr style="border:0;border-top:1px solid #334155;margin:8px 0;">
 
                    <label style="font-size:11px;color:#fef08a;font-weight:bold;margin-bottom:-4px;">${labelColors}</label>
 
                    <div style="display:flex;gap:5px;">
                        <div style="flex:1;">
                            <span style="font-size:9px;color:#94a3b8;display:block;">${labelBg}</span>
                            <input type="color" id="sr-col-bg" value="${S.bgColor}" style="width:100%;height:30px;border:none;background:transparent;cursor:pointer;">
                        </div>
                        <div style="flex:1;">
                            <span style="font-size:9px;color:#94a3b8;display:block;">${labelPrimary}</span>
                            <input type="color" id="sr-col-pri" value="${S.primaryColor}" style="width:100%;height:30px;border:none;background:transparent;cursor:pointer;">
                        </div>
                        <div style="flex:1;">
                            <span style="font-size:9px;color:#94a3b8;display:block;">${labelAccent}</span>
                            <input type="color" id="sr-col-acc" value="${S.accentColor}" style="width:100%;height:30px;border:none;background:transparent;cursor:pointer;">
                        </div>
                    </div>
 
                    <div>
                        <label style="font-size:11px;color:#d8b4fe;display:block;margin-bottom:4px;">${labelLighting}</label>
                        <select id="sr-light" style="width:100%;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                            <option value="studio">${optStudio}</option>
                            <option value="dramatic">${optDramatic}</option>
                            <option value="neon">${optNeon}</option>
                        </select>
                    </div>
 
                    <div>
                        <label style="font-size:11px;color:#d8b4fe;display:block;margin-bottom:4px;">${labelMotion}</label>
                        <select id="sr-motion" style="width:100%;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                            <option value="rotateY">${optRot}</option>
                            <option value="float">${optFloat}</option>
                            <option value="pulse">${optPulse}</option>
                            <option value="static">${optStatic}</option>
                        </select>
                    </div>
 
                    <hr style="border:0;border-top:1px solid #334155;margin:8px 0;">
 
                    <label style="font-size:11px;color:#fef08a;font-weight:bold;margin-bottom:-4px;">${labelText}</label>
 
                    <div>
                        <label style="font-size:11px;color:#d8b4fe;display:block;margin-bottom:4px;">${labelTitle}</label>
                        <input type="text" id="sr-inp-head" value="${S.headline}" style="width:100%;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                    </div>
 
                    <div>
                        <label style="font-size:11px;color:#d8b4fe;display:block;margin-bottom:4px;">${labelSub}</label>
                        <input type="text" id="sr-inp-sub" value="${S.subhead}" style="width:100%;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                    </div>
 
                    <div style="display:flex;gap:10px;">
                        <div style="flex:1;">
                            <label style="font-size:11px;color:#d8b4fe;display:block;margin-bottom:4px;">${labelSize}</label>
                            <input type="range" id="sr-range-size" min="5" max="20" value="${S.textSize * 10}" style="width:100%;">
                        </div>
                        <div style="flex:1;">
                            <label style="font-size:11px;color:#d8b4fe;display:block;margin-bottom:4px;">${labelY}</label>
                            <input type="range" id="sr-range-y" min="-100" max="150" value="${S.textY}" style="width:100%;">
                        </div>
                    </div>
 
                    <hr style="border:0;border-top:1px solid #334155;margin:8px 0;">
 
                    <button id="sr-btn-html" style="width:100%;background:linear-gradient(135deg,#a855f7,#8b5cf6);color:#fff;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;box-shadow:0 4px 10px rgba(139,92,246,0.2);">🌐 ${btnExportHtml}</button>
                    <button id="sr-btn-png" style="width:100%;background:#334155;color:#fff;border:1px solid #475569;padding:10px;border-radius:6px;font-weight:bold;cursor:pointer;">📸 ${btnCaptureImg}</button>
                </div>
            </div>
        `;
 
        setupListeners();
        initWebGL();
    }
 
    function setupListeners() {
        document.getElementById('sr-shape').value = S.shape;
        document.getElementById('sr-shape').onchange = e => { S.shape = e.target.value; rebuildModel(); };
        
        document.getElementById('sr-light').value = S.lightMood;
        document.getElementById('sr-light').onchange = e => { S.lightMood = e.target.value; updateLights(); };
 
        document.getElementById('sr-motion').value = S.motion;
        document.getElementById('sr-motion').onchange = e => { S.motion = e.target.value; };
 
        document.getElementById('sr-col-bg').oninput = e => { S.bgColor = e.target.value; updateBg(); };
        document.getElementById('sr-col-pri').oninput = e => { S.primaryColor = e.target.value; rebuildModel(); };
        
        document.getElementById('sr-col-acc').oninput = e => {
            S.accentColor = e.target.value;
            document.getElementById('sr-over-sub').style.color = S.accentColor;
            rebuildModel();
        };
 
        // Text listener updates
        document.getElementById('sr-inp-head').oninput = e => {
            S.headline = e.target.value;
            document.getElementById('sr-over-head').textContent = S.headline;
        };
        document.getElementById('sr-inp-sub').oninput = e => {
            S.subhead = e.target.value;
            document.getElementById('sr-over-sub').textContent = S.subhead;
        };
        document.getElementById('sr-range-size').oninput = e => {
            S.textSize = parseFloat(e.target.value) / 10;
            document.getElementById('sr-over-head').style.fontSize = (3.5 * S.textSize) + 'vw';
            document.getElementById('sr-over-sub').style.fontSize = (1.6 * S.textSize) + 'vw';
        };
        document.getElementById('sr-range-y').oninput = e => {
            S.textY = parseInt(e.target.value, 10);
            document.getElementById('sr-text-overlay').style.transform = `translateY(${S.textY}px)`;
        };
 
        // Upload label
        document.getElementById('sr-file').onchange = e => {
            var f = e.target.files[0];
            if(f) {
                var rdr = new FileReader();
                rdr.onload = ev => { S.logoUrl = ev.target.result; loadTexture(); };
                rdr.readAsDataURL(f);
            }
        };
 
        document.getElementById('sr-btn-html').onclick = exportHTML;
        document.getElementById('sr-btn-png').onclick = capturePNG;
    }

    function initWebGL() {
        S.canvas = document.getElementById('sr-three-canvas');
        if(!S.canvas) return;

        var container = document.getElementById('sr-canvas-container');
        var w = container.clientWidth;
        var h = container.clientHeight;

        S.scene = new THREE.Scene();
        S.scene.background = new THREE.Color(S.bgColor);

        S.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
        S.camera.position.set(0, 0, 10);

        S.renderer = new THREE.WebGLRenderer({ canvas: S.canvas, antialias: true, preserveDrawingBuffer: true });
        S.renderer.setSize(w, h);
        S.renderer.setPixelRatio(window.devicePixelRatio || 1);

        updateLights();
        rebuildModel();

        S.active = true;
        animate();

        // Handle resize
        var resizeObserver = new ResizeObserver(() => {
            if(!S.active || !S.renderer) return;
            var w = container.clientWidth;
            var h = container.clientHeight;
            S.camera.aspect = w / h;
            S.camera.updateProjectionMatrix();
            S.renderer.setSize(w, h);
        });
        resizeObserver.observe(container);
    }

    function updateBg() {
        if(S.scene) S.scene.background = new THREE.Color(S.bgColor);
    }

    function updateLights() {
        if(!S.scene) return;
        S.lights.forEach(l => S.scene.remove(l));
        S.lights = [];

        var m = S.lightMood;
        var amb, dir1, dir2;

        if (m === 'studio') {
            amb = new THREE.AmbientLight(0xffffff, 0.7);
            dir1 = new THREE.DirectionalLight(0xffffff, 0.8); dir1.position.set(5, 8, 5);
            dir2 = new THREE.DirectionalLight(0xffffff, 0.3); dir2.position.set(-5, 4, -5);
        } else if (m === 'dramatic') {
            amb = new THREE.AmbientLight(0xffffff, 0.1);
            dir1 = new THREE.DirectionalLight(0xffffff, 2.0); dir1.position.set(0, 10, 2);
        } else if (m === 'neon') {
            amb = new THREE.AmbientLight(0x11052c, 0.3);
            dir1 = new THREE.DirectionalLight(0xff007f, 1.8); dir1.position.set(8, 2, 4); // Pink
            dir2 = new THREE.DirectionalLight(0x00f0ff, 1.8); dir2.position.set(-8, 2, 4); // Cyan
        }

        S.scene.add(amb); S.lights.push(amb);
        if(dir1) { S.scene.add(dir1); S.lights.push(dir1); }
        if(dir2) { S.scene.add(dir2); S.lights.push(dir2); }
    }

    function rebuildModel() {
        if(!S.scene) return;
        if(S.mesh) {
            S.scene.remove(S.mesh);
            S.mesh.geometry.dispose();
            S.mesh.material.dispose();
        }

        var geo;
        if (S.shape === 'can') geo = new THREE.CylinderGeometry(1.4, 1.4, 4.2, 32);
        else if (S.shape === 'box') geo = new THREE.BoxGeometry(2.4, 3.8, 1.6);
        else if (S.shape === 'cylinder') geo = new THREE.CylinderGeometry(1.0, 1.2, 4.6, 32);
        else geo = new THREE.SphereGeometry(1.8, 32, 32);

        var matOpts = { color: S.primaryColor, roughness: 0.15, metalness: 0.85 };
        var mat = new THREE.MeshStandardMaterial(matOpts);

        S.mesh = new THREE.Mesh(geo, mat);
        S.scene.add(S.mesh);

        loadTexture();
    }

    function loadTexture() {
        if(!S.logoUrl || !S.mesh) return;
        var loader = new THREE.TextureLoader();
        loader.load(S.logoUrl, function(tex) {
            if(S.shape === 'can' || S.shape === 'cylinder') {
                tex.wrapS = THREE.RepeatWrapping;
                tex.repeat.set(1, 1);
            }
            S.mesh.material.map = tex;
            S.mesh.material.color.set('#ffffff'); // reset color to show texture correctly
            S.mesh.material.needsUpdate = true;
        });
    }

    var clock = new THREE.Clock();
    function animate() {
        if(!S.active) return;
        requestAnimationFrame(animate);

        var delta = clock.getDelta();
        var time = clock.getElapsedTime();

        if (S.mesh) {
            if (S.motion === 'rotateY') {
                S.mesh.rotation.y += 0.8 * delta;
                S.mesh.position.set(0, 0, 0);
                S.mesh.scale.set(1, 1, 1);
            } else if (S.motion === 'float') {
                S.mesh.position.y = Math.sin(time * 2) * 0.25;
                S.mesh.rotation.y += 0.3 * delta;
                S.mesh.rotation.x = Math.sin(time) * 0.1;
                S.mesh.scale.set(1, 1, 1);
            } else if (S.motion === 'pulse') {
                var sc = 1.0 + Math.sin(time * 4.0) * 0.06;
                S.mesh.scale.set(sc, sc, sc);
                S.mesh.rotation.y += 0.4 * delta;
                S.mesh.position.set(0, 0, 0);
            } else if (S.motion === 'static') {
                S.mesh.position.set(0, 0, 0);
                S.mesh.scale.set(1, 1, 1);
            }
        }

        if(S.renderer && S.scene && S.camera) {
            S.renderer.render(S.scene, S.camera);
        }
    }

    function capturePNG() {
        if(!S.renderer) return;
        var a = document.createElement('a');
        a.href = S.canvas.toDataURL('image/png');
        a.download = '3d-showroom.png';
        a.click();
    }

    function exportHTML() {
        var cleanLogo = S.logoUrl ? S.logoUrl.replace(/[\r\n\s]+/g, "") : "";
        
        var lgtCode, geoCode, motCode, logoCode;
 
        if (S.lightMood === 'neon') {
            lgtCode = 'scene.add(new THREE.AmbientLight(0x11052c, 0.3)); var l1=new THREE.DirectionalLight(0xff007f, 1.8); l1.position.set(8, 2, 4); scene.add(l1); var l2=new THREE.DirectionalLight(0x00f0ff, 1.8); l2.position.set(-8, 2, 4); scene.add(l2);';
        } else if (S.lightMood === 'dramatic') {
            lgtCode = 'scene.add(new THREE.AmbientLight(0xffffff, 0.1)); var l1=new THREE.DirectionalLight(0xffffff, 2.0); l1.position.set(0, 10, 2); scene.add(l1);';
        } else {
            lgtCode = 'scene.add(new THREE.AmbientLight(0xffffff, 0.7)); var l1=new THREE.DirectionalLight(0xffffff, 0.8); l1.position.set(5, 8, 5); scene.add(l1); var l2=new THREE.DirectionalLight(0xffffff, 0.3); l2.position.set(-5, 4, -5); scene.add(l2);';
        }
 
        if (S.shape === 'can') geoCode = 'new THREE.CylinderGeometry(1.4, 1.4, 4.2, 32)';
        else if (S.shape === 'box') geoCode = 'new THREE.BoxGeometry(2.4, 3.8, 1.6)';
        else if (S.shape === 'cylinder') geoCode = 'new THREE.CylinderGeometry(1.0, 1.2, 4.6, 32)';
        else geoCode = 'new THREE.SphereGeometry(1.8, 32, 32)';
 
        if (S.motion === 'rotateY') {
            motCode = 'mesh.rotation.y += 0.012;';
        } else if (S.motion === 'float') {
            motCode = 'mesh.position.y = Math.sin(t * 2) * 0.25; mesh.rotation.y += 0.005; mesh.rotation.x = Math.sin(t) * 0.1;';
        } else if (S.motion === 'pulse') {
            motCode = 'var sc = 1.0 + Math.sin(t * 4.0) * 0.06; mesh.scale.set(sc, sc, sc); mesh.rotation.y += 0.006;';
        } else {
            motCode = 'mesh.rotation.y = mouseX * 2; mesh.rotation.x = mouseY * 2;';
        }
 
        logoCode = '';
        if (cleanLogo) {
            logoCode = 'var img = new Image(); img.onload = function() { var tex = new THREE.Texture(img); if(shape==="can"||shape==="cylinder"){ tex.wrapS=THREE.RepeatWrapping; } tex.needsUpdate=true; mesh.material.map=tex; mesh.material.color.set("#ffffff"); mesh.material.needsUpdate=true; }; img.onerror = function(e) { console.warn("Failed to load texture:", e); }; img.src="' + cleanLogo + '";';
        }
 
        var css = `
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { background: ${S.bgColor}; overflow: hidden; font-family: 'Inter', system-ui, sans-serif; height:100vh; display:flex; align-items:center; justify-content:center; }
            canvas { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 1; }
            #overlay { position: fixed; top: 15%; width: 100%; text-align: center; z-index: 100; pointer-events: none; text-shadow: 0 4px 12px rgba(0,0,0,0.6); transform: translateY(${S.textY}px); }
            h1 { font-size: 5.5vw; font-weight: 900; color: ${S.textColor}; text-transform: uppercase; margin-bottom: 5px; letter-spacing: 2px; }
            p { font-size: 2.2vw; color: ${S.accentColor}; font-weight: 300; }
        `;
 
        var inlineJS = `
            try {
                var scene = new THREE.Scene();
                scene.background = new THREE.Color("${S.bgColor}");
                var W = window.innerWidth, H = window.innerHeight;
                var camera = new THREE.PerspectiveCamera(45, W/H, 0.1, 100);
                camera.position.set(0, 0, 10);
                var renderer = new THREE.WebGLRenderer({ antialias: true });
                renderer.setSize(W, H);
                renderer.setPixelRatio(window.devicePixelRatio || 1);
                document.body.appendChild(renderer.domElement);
 
                window.addEventListener('resize', function() {
                    W = window.innerWidth; H = window.innerHeight;
                    camera.aspect = W/H; camera.updateProjectionMatrix();
                    renderer.setSize(W, H);
                });
 
                ${lgtCode}
 
                var shape = "${S.shape}";
                var mesh;
        `;
 
        inlineJS += `
                var geo = ${geoCode};
                var mat = new THREE.MeshStandardMaterial({ color: "${S.primaryColor}", roughness: 0.15, metalness: 0.85 });
                var mesh = new THREE.Mesh(geo, mat);
                scene.add(mesh);
 
                ${logoCode}
 
                var mouseX = 0, mouseY = 0;
                document.addEventListener('mousemove', function(e) {
                    mouseX = (e.clientX - W/2) / (W/2);
                    mouseY = (e.clientY - H/2) / (H/2);
                });
 
                var t = 0;
                function loop() {
                    requestAnimationFrame(loop);
                    t += 0.016;
                    ${motCode}
                    renderer.render(scene, camera);
                }
                loop();
            } catch (err) {
                console.error("3D Showroom initialization failed:", err);
                var fallback = document.createElement('div');
                fallback.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;background:${S.bgColor};display:flex;align-items:center;justify-content:center;z-index:999;";
                fallback.innerHTML = "<div style='color:white;font-family:sans-serif;text-align:center;padding:20px;'><h2 style='margin-bottom:10px;'>🔮 3D Experience Not Available</h2><p style='font-size:14px;color:#94a3b8;'>WebGL may be disabled, or Three.js was blocked.</p></div>";
                document.body.appendChild(fallback);
            }
        `;
 
        var html = '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>' + S.headline + '</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;900&display=swap" rel="stylesheet"><style>' + css + '</style></head><body>';
        html += '<div id="overlay"><h1>' + S.headline + '</h1><p>' + S.subhead + '</p></div>';
        html += '<div style="position:fixed;bottom:15px;right:15px;z-index:999;font-family:sans-serif;font-size:11px;opacity:0.8;"><a href="https://ia-codestudio.com" target="_blank" rel="noopener" style="color:white;text-decoration:none;background:rgba(0,0,0,0.6);padding:6px 12px;border-radius:20px;border:1px solid rgba(255,255,255,0.2);display:inline-flex;align-items:center;gap:5px;">⚡ 3D by <span style="color:#38bdf8;font-weight:bold;">IA Code Studio</span></a></div>';
        html += '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>';
        html += '<script>' + inlineJS + '</script></body></html>';
 
        var blob = new Blob([html], { type: 'text/html' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = '3d-showroom.html';
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 2000);
    }
})();
