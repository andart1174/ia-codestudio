/**
 * Mockup Master Pro (Device 3D Scenes)
 */
(function() {
    'use strict';
    
    var _prevRenderTab = window.renderTab;
    var S = {
        active: false, scene: null, camera: null, renderer: null,
        wrapperGroup: null, deviceGroup: null, screenMesh: null,
        animId: null, mouseX: 0, mouseY: 0,
        isDragging: false, prevX: 0, prevY: 0, targetRotX: 0, targetRotY: 0,
        txtVal: '', txtFont: 'Arial, sans-serif', txtCol: '#ffffff',
        txtSize: 60, txtX: 0, txtY: 40,
        textCanvas: null, textCtx: null, textTex: null,
        
        deviceType: 'iphone', // iphone, macbook, ipad
        lightMood: 'dramatic', // dramatic, studio, neon
        motion: 'rotateY',
        screenshot: null,
        
        lights: [],
        clock: null
    };

    window.renderTab = function(tab) {
        if (tab === 'mockup-master') {
            window.activeTab = 'mockup-master';
            document.querySelectorAll('.ltab').forEach(function(b) { b.classList.remove('active'); });
            var btn = document.getElementById('tab-mockup-master');
            if (btn) btn.classList.add('active');

            var cp = document.querySelector('.center-panel'), rp = document.querySelector('.right-panel');
            if (cp) cp.style.display = 'none';
            if (rp) rp.style.display = 'none';

            document.querySelectorAll('[id$="-workspace"]').forEach(function(w) { w.style.display = 'none'; });
            var ws = document.getElementById('mockup-master-workspace');
            if (ws) ws.style.display = 'flex';

            buildUI();
            setTimeout(initThree, 100);
            return;
        }
        
        S.active = false;
        if (S.animId) cancelAnimationFrame(S.animId);
        if (_prevRenderTab) _prevRenderTab(tab);
    };

    function buildUI() {
        var r = document.getElementById('mm-right');
        if (!r) return;

        function sel(id, opts, val) {
            var o = Object.keys(opts).map(function(k) { return '<option value="'+k+'" '+(val===k?'selected':'')+'>'+opts[k]+'</option>'; }).join('');
            return '<select id="'+id+'" style="width:100%;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;font-size:12px;margin-bottom:10px;">'+o+'</select>';
        }

        var devOpts = { 'iphone': 'iPhone 15 Pro', 'macbook': 'MacBook Pro', 'ipad': 'iPad Pro' };
        var lgtOpts = { 'dramatic': 'Dramatic / Premium', 'studio': 'Bright Studio', 'neon': 'Neon Cyberpunk', 'dark': 'Dark Minimal' };
        var moOpts = { 'rotateY': 'Smooth Rotate Y', 'float': 'Floating', 'cinematic': 'Cinematic Camera', 'tilt': 'Mouse Parallax Tilt', 'static': 'Static' };

        var html = '<div style="color:white;font-family:sans-serif;">' +
            '<h2 style="margin:0 0 5px;color:#38bdf8;font-size:18px;">📱 Mockup Master Pro</h2>' +
            '<p style="margin:0 0 20px;font-size:11px;color:#94a3b8;">Create 3D Device Scenes for Ads</p>' +
            
            '<div style="background:rgba(255,255,255,0.03);border:1px solid #334155;border-radius:8px;padding:15px;margin-bottom:15px;">' +
            '<label style="font-size:11px;color:#7dd3fc;display:block;margin-bottom:5px;">Screenshot Image:</label>' +
            '<input type="file" id="mm-file" accept="image/png, image/jpeg" style="width:100%;font-size:11px;color:#94a3b8;margin-bottom:15px;">' +
            
            '<label style="font-size:11px;color:#7dd3fc;display:block;margin-bottom:5px;">Device Type:</label>' +
            sel('mm-dev', devOpts, S.deviceType) +
            
            '<label style="font-size:11px;color:#7dd3fc;display:block;margin-bottom:5px;">Lighting Mood:</label>' +
            sel('mm-lgt', lgtOpts, S.lightMood) +
            
            '<label style="font-size:11px;color:#7dd3fc;display:block;margin-bottom:5px;">Animation:</label>' +
            sel('mm-mo', moOpts, S.motion) +
            
            '<div style="margin-top:15px;border-top:1px solid #334155;padding-top:15px;">' +
            '<label style="font-size:11px;color:#fcd34d;display:block;margin-bottom:5px;">Ad Text (Overlay):</label>' +
            '<input type="text" id="mm-txt-val" placeholder="Type text here..." value="'+S.txtVal+'" style="width:100%;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;font-size:12px;margin-bottom:10px;">' +
            
            '<div style="display:flex;gap:10px;margin-bottom:10px;">' +
            '<select id="mm-txt-font" style="flex:1;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;font-size:12px;">' +
            '<option value="Arial, sans-serif">Modern Arial</option>' +
            '<option value="Impact, sans-serif">Bold Impact</option>' +
            '<option value="Georgia, serif">Elegant Georgia</option>' +
            '<option value="Courier New, monospace">Cyber Courier</option>' +
            '<option value="Comic Sans MS, cursive">Casual</option>' +
            '</select>' +
            '<input type="color" id="mm-txt-col" value="'+S.txtCol+'" style="width:40px;height:32px;border:none;background:none;cursor:pointer;">' +
            '</div>' +

            '<div style="display:flex;gap:5px;margin-bottom:5px;align-items:center;">' +
            '<span style="font-size:10px;color:#94a3b8;width:35px;">Size</span>' +
            '<input type="range" id="mm-txt-size" min="10" max="250" value="'+S.txtSize+'" style="flex:1;">' +
            '</div>' +
            '<div style="display:flex;gap:5px;margin-bottom:5px;align-items:center;">' +
            '<span style="font-size:10px;color:#94a3b8;width:35px;">Pos X</span>' +
            '<input type="range" id="mm-txt-x" min="-100" max="100" value="'+S.txtX+'" style="flex:1;">' +
            '</div>' +
            '<div style="display:flex;gap:5px;align-items:center;">' +
            '<span style="font-size:10px;color:#94a3b8;width:35px;">Pos Y</span>' +
            '<input type="range" id="mm-txt-y" min="-100" max="100" value="'+S.txtY+'" style="flex:1;">' +
            '</div>' +
            '</div>' +
            '</div>' +
            
            '<div style="display:flex;gap:10px;margin-top:20px;">' +
            '<button id="mm-exp-png" style="flex:1;background:#334155;color:#fff;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;font-size:12px;">📸 Photo</button>' +
            '<button id="mm-exp-vid" style="flex:1;background:linear-gradient(135deg,#0ea5e9,#3b82f6);color:#fff;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;font-size:12px;">🎥 Video (5s)</button>' +
            '</div>' +
            '<button id="mm-exp-html" style="width:100%;margin-top:10px;background:#f43f5e;color:#fff;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;font-size:12px;">🌐 Export HTML 3D</button>' +
            '<div id="mm-st" style="margin-top:15px;font-size:11px;text-align:center;color:#4ade80;">● Ready</div>' +
            '</div>';

        r.innerHTML = html;

        document.getElementById('mm-dev').onchange = function() { S.deviceType = this.value; rebuildDevice(); };
        document.getElementById('mm-lgt').onchange = function() { S.lightMood = this.value; updateLighting(); };
        document.getElementById('mm-mo').onchange = function() { S.motion = this.value; };
        
        document.getElementById('mm-file').onchange = function(e) {
            var file = e.target.files[0];
            if(!file) return;
            var rdr = new FileReader();
            rdr.onload = function(evt) { S.screenshot = evt.target.result; updateScreen(); };
            rdr.readAsDataURL(file);
        };
        
        document.getElementById('mm-txt-val').oninput = function() { S.txtVal = this.value; updateScreen(); };
        document.getElementById('mm-txt-font').onchange = function() { S.txtFont = this.value; updateScreen(); };
        document.getElementById('mm-txt-col').oninput = function() { S.txtCol = this.value; updateScreen(); };
        document.getElementById('mm-txt-size').oninput = function() { S.txtSize = parseInt(this.value); updateScreen(); };
        document.getElementById('mm-txt-x').oninput = function() { S.txtX = parseInt(this.value); updateScreen(); };
        document.getElementById('mm-txt-y').oninput = function() { S.txtY = parseInt(this.value); updateScreen(); };

        document.getElementById('mm-exp-png').onclick = expPng;
        document.getElementById('mm-exp-vid').onclick = expVid;
        document.getElementById('mm-exp-html').onclick = expHtml;
    }

    function initThree() {
        if (!window.THREE) return;
        if (S.active) return;
        S.active = true;

        var ct = document.getElementById('mm-center');
        if (!ct) return;
        ct.innerHTML = '';

        S.scene = new THREE.Scene();
        S.scene.background = new THREE.Color(0x0f172a); // dark slate

        S.camera = new THREE.PerspectiveCamera(40, ct.clientWidth / ct.clientHeight, 0.1, 100);
        S.camera.position.z = 12;

        S.renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
        S.renderer.setSize(ct.clientWidth, ct.clientHeight);
        S.renderer.shadowMap.enabled = true;
        S.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        S.renderer.outputEncoding = THREE.sRGBEncoding;
        ct.appendChild(S.renderer.domElement);

        S.clock = new THREE.Clock();

        S.wrapperGroup = new THREE.Group();
        S.scene.add(S.wrapperGroup);

        ct.onmousedown = function(e) { S.isDragging = true; S.prevX = e.clientX; S.prevY = e.clientY; };
        window.onmouseup = function() { S.isDragging = false; };
        ct.onmousemove = function(e) {
            S.mouseX = (e.clientX - ct.clientWidth/2) * 0.005;
            S.mouseY = (e.clientY - ct.clientHeight/2) * 0.005;
            if (S.isDragging) {
                S.targetRotY += (e.clientX - S.prevX) * 0.01;
                S.targetRotX += (e.clientY - S.prevY) * 0.01;
                S.prevX = e.clientX;
                S.prevY = e.clientY;
            }
        };
        ct.addEventListener('touchstart', function(e){ if(e.touches.length>0){ S.isDragging=true; S.prevX=e.touches[0].clientX; S.prevY=e.touches[0].clientY; }});
        window.addEventListener('touchend', function(){ S.isDragging=false; });
        ct.addEventListener('touchmove', function(e){
            if(S.isDragging && e.touches.length>0){
                S.targetRotY += (e.touches[0].clientX - S.prevX) * 0.01;
                S.targetRotX += (e.touches[0].clientY - S.prevY) * 0.01;
                S.prevX = e.touches[0].clientX;
                S.prevY = e.touches[0].clientY;
            }
        });

        updateLighting();
        rebuildDevice();

        function animate() {
            if (!S.active) return;
            S.animId = requestAnimationFrame(animate);
            var delta = S.clock.getDelta();
            var time = S.clock.getElapsedTime();

            if (S.wrapperGroup) {
                S.wrapperGroup.rotation.x += (S.targetRotX - S.wrapperGroup.rotation.x) * 0.1;
                S.wrapperGroup.rotation.y += (S.targetRotY - S.wrapperGroup.rotation.y) * 0.1;
            }

            if (S.deviceGroup) {
                if (S.motion === 'rotateY') {
                    S.deviceGroup.rotation.y += 0.5 * delta;
                    S.deviceGroup.rotation.x = 0;
                    S.deviceGroup.position.set(0, 0, 0);
                    S.camera.position.set(0, 0, 12);
                    S.camera.lookAt(0,0,0);
                } else if (S.motion === 'float') {
                    S.deviceGroup.position.y = Math.sin(time * 2) * 0.4;
                    S.deviceGroup.rotation.x = Math.sin(time) * 0.1;
                    S.deviceGroup.rotation.y += 0.2 * delta;
                    S.camera.position.set(0, 0, 12);
                    S.camera.lookAt(0,0,0);
                } else if (S.motion === 'cinematic') {
                    S.deviceGroup.rotation.y += 0.1 * delta;
                    S.deviceGroup.position.set(0, 0, 0);
                    S.camera.position.x = Math.sin(time * 0.3) * 6;
                    S.camera.position.z = Math.cos(time * 0.3) * 6 + 8;
                    S.camera.lookAt(0,0,0);
                } else if (S.motion === 'tilt') {
                    // Smooth mouse tilt
                    S.deviceGroup.rotation.y += (S.mouseX * 1.5 - S.deviceGroup.rotation.y) * 0.1;
                    S.deviceGroup.rotation.x += (S.mouseY * 1.5 - S.deviceGroup.rotation.x) * 0.1;
                    S.deviceGroup.position.set(0, 0, 0);
                    S.camera.position.set(0, 0, 12);
                    S.camera.lookAt(0,0,0);
                } else {
                    S.deviceGroup.rotation.set(0, 0, 0);
                    S.deviceGroup.position.set(0, 0, 0);
                    S.camera.position.set(0, 0, 12);
                    S.camera.lookAt(0,0,0);
                }
            }

            // Light tracking
            if (S.dirLight1 && S.dirLight1Base) {
                S.dirLight1.position.x = S.dirLight1Base.x + S.mouseX * 5;
                S.dirLight1.position.y = S.dirLight1Base.y - S.mouseY * 5;
            }

            S.renderer.render(S.scene, S.camera);
        }
        animate();

        window.addEventListener('resize', function() {
            if (!S.active || !S.camera || !S.renderer) return;
            var ct = document.getElementById('mm-center');
            S.camera.aspect = ct.clientWidth / ct.clientHeight;
            S.camera.updateProjectionMatrix();
            S.renderer.setSize(ct.clientWidth, ct.clientHeight);
        });
    }

    function updateScreen() {
        if (!S.screenMesh) return;
        
        var w = 2048;
        var mAspect = S.screenMesh.geometry.parameters.width / S.screenMesh.geometry.parameters.height;
        var h = Math.round(w / mAspect);
        
        if (!S.textCanvas) {
            S.textCanvas = document.createElement('canvas');
            S.textCtx = S.textCanvas.getContext('2d');
            S.textTex = new THREE.CanvasTexture(S.textCanvas);
            S.textTex.encoding = THREE.sRGBEncoding;
            S.textTex.anisotropy = S.renderer.capabilities.getMaxAnisotropy();
        }
        
        if (S.textCanvas.width !== w || S.textCanvas.height !== h) {
            S.textCanvas.width = w; S.textCanvas.height = h;
        }
        
        var ctx = S.textCtx;
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, w, h);
        
        function drawOverlay() {
            if (S.txtVal && S.txtVal.trim() !== '') {
                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                var fontSize = S.txtSize * 3; 
                ctx.font = 'bold ' + fontSize + 'px ' + S.txtFont;
                ctx.fillStyle = S.txtCol;
                var px = w/2 + (S.txtX / 100) * (w/2);
                var py = h/2 - (S.txtY / 100) * (h/2);
                ctx.shadowColor = 'rgba(0,0,0,0.8)';
                ctx.shadowBlur = 15; ctx.shadowOffsetX = 4; ctx.shadowOffsetY = 4;
                ctx.fillText(S.txtVal, px, py);
            }
            S.textTex.needsUpdate = true;
            S.screenMesh.material.map = S.textTex;
            S.screenMesh.material.color.set(0xffffff);
            S.screenMesh.material.needsUpdate = true;
        }

        if (S.screenshot) {
            var img = new Image();
            img.onload = function() {
                var imgAspect = img.width / img.height;
                var drawW = w, drawH = h, drawX = 0, drawY = 0;
                if (imgAspect > mAspect) { drawH = h; drawW = h * imgAspect; drawX = (w - drawW) / 2; }
                else { drawW = w; drawH = w / imgAspect; drawY = (h - drawH) / 2; }
                ctx.drawImage(img, drawX, drawY, drawW, drawH);
                drawOverlay();
            };
            img.src = S.screenshot;
        } else {
            drawOverlay();
        }
    }

    function createRoundedRect(w, h, r) {
        var s = new THREE.Shape();
        s.moveTo(-w/2 + r, -h/2);
        s.lineTo(w/2 - r, -h/2); s.quadraticCurveTo(w/2, -h/2, w/2, -h/2 + r);
        s.lineTo(w/2, h/2 - r);  s.quadraticCurveTo(w/2, h/2, w/2 - r, h/2);
        s.lineTo(-w/2 + r, h/2); s.quadraticCurveTo(-w/2, h/2, -w/2, h/2 - r);
        s.lineTo(-w/2, -h/2 + r);s.quadraticCurveTo(-w/2, -h/2, -w/2 + r, -h/2);
        return s;
    }

    function rebuildDevice() {
        if (S.deviceGroup) S.wrapperGroup.remove(S.deviceGroup);
        S.deviceGroup = new THREE.Group();

        var bodyMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.15, metalness: 0.9 });
        var screenMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
        S.screenMesh = null; // reset

        if (S.deviceType === 'iphone') {
            var s = createRoundedRect(3.5, 7.2, 0.4);
            var g = new THREE.ExtrudeGeometry(s, { depth: 0.3, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.05, bevelThickness: 0.05 });
            var m = new THREE.Mesh(g, bodyMat);
            m.castShadow = true; m.receiveShadow = true;
            m.position.z = -0.15;
            S.deviceGroup.add(m);

            // Screen
            var sG = new THREE.PlaneGeometry(3.2, 6.9);
            S.screenMesh = new THREE.Mesh(sG, screenMat);
            S.screenMesh.position.z = 0.21;
            S.deviceGroup.add(S.screenMesh);

        } else if (S.deviceType === 'macbook') {
            var baseS = createRoundedRect(8, 5.5, 0.2);
            var baseG = new THREE.ExtrudeGeometry(baseS, { depth: 0.2, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.02, bevelThickness: 0.02 });
            var baseM = new THREE.Mesh(baseG, bodyMat);
            baseM.rotation.x = Math.PI / 2;
            baseM.position.y = -2;
            baseM.castShadow = true;
            S.deviceGroup.add(baseM);

            // Keyboard Area
            var kbG = new THREE.PlaneGeometry(6.8, 3.0);
            var kbM = new THREE.MeshBasicMaterial({ color: 0x050505 });
            var kbMesh = new THREE.Mesh(kbG, kbM);
            kbMesh.rotation.x = -Math.PI / 2;
            kbMesh.position.set(0, -1.97, -0.8);
            S.deviceGroup.add(kbMesh);

            // Trackpad Area
            var tpG = new THREE.PlaneGeometry(2.5, 1.5);
            var tpMesh = new THREE.Mesh(tpG, kbM);
            tpMesh.rotation.x = -Math.PI / 2;
            tpMesh.position.set(0, -1.97, 1.8);
            S.deviceGroup.add(tpMesh);

            var lidGroup = new THREE.Group();
            lidGroup.position.y = -2;
            lidGroup.position.z = -2.75;
            
            var lidS = createRoundedRect(8, 5.5, 0.2);
            var lidG = new THREE.ExtrudeGeometry(lidS, { depth: 0.1, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.02, bevelThickness: 0.02 });
            var lidM = new THREE.Mesh(lidG, bodyMat);
            lidM.position.y = 2.75; // center lid above hinge
            lidM.castShadow = true;
            lidGroup.add(lidM);

            // Screen
            var sG = new THREE.PlaneGeometry(7.6, 5.0);
            S.screenMesh = new THREE.Mesh(sG, screenMat);
            S.screenMesh.position.y = 2.75;
            S.screenMesh.position.z = 0.125;
            lidGroup.add(S.screenMesh);

            lidGroup.rotation.x = -0.15; // slightly tilted back
            S.deviceGroup.add(lidGroup);
            S.deviceGroup.position.y = 0.5;

        } else if (S.deviceType === 'ipad') {
            var s = createRoundedRect(6, 8, 0.3);
            var g = new THREE.ExtrudeGeometry(s, { depth: 0.2, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.04, bevelThickness: 0.04 });
            var m = new THREE.Mesh(g, bodyMat);
            m.castShadow = true; m.receiveShadow = true;
            m.position.z = -0.1;
            S.deviceGroup.add(m);

            // Screen
            var sG = new THREE.PlaneGeometry(5.6, 7.6);
            S.screenMesh = new THREE.Mesh(sG, screenMat);
            S.screenMesh.position.z = 0.15;
            S.deviceGroup.add(S.screenMesh);
        }

        S.wrapperGroup.add(S.deviceGroup);
        updateScreen();
    }



    function updateLighting() {
        if (!S.scene) return;
        S.lights.forEach(function(l) { S.scene.remove(l); });
        S.lights = [];

        var m = S.lightMood;
        var amb, dir1, dir2, point;

        if (m === 'dramatic') {
            amb = new THREE.AmbientLight(0xffffff, 0.2);
            dir1 = new THREE.DirectionalLight(0xffffff, 2.0); dir1.position.set(5, 5, 5);
            dir2 = new THREE.DirectionalLight(0xaabbff, 1.0); dir2.position.set(-5, -5, -5);
            point = new THREE.PointLight(0xffffff, 1.5, 10); point.position.set(0, 5, 2);
        } else if (m === 'studio') {
            amb = new THREE.AmbientLight(0xffffff, 0.8);
            dir1 = new THREE.DirectionalLight(0xffffff, 1.0); dir1.position.set(0, 10, 10);
            dir2 = new THREE.DirectionalLight(0xffffff, 0.5); dir2.position.set(10, 0, -5);
        } else if (m === 'neon') {
            amb = new THREE.AmbientLight(0x220044, 0.4);
            dir1 = new THREE.DirectionalLight(0xff00ff, 2.5); dir1.position.set(5, 5, 5);
            dir2 = new THREE.DirectionalLight(0x00ffff, 2.5); dir2.position.set(-5, -5, 5);
        } else if (m === 'dark') {
            amb = new THREE.AmbientLight(0x111111, 0.5);
            dir1 = new THREE.DirectionalLight(0x333333, 1.0); dir1.position.set(0, 5, 5);
            // add intense rim light
            dir2 = new THREE.DirectionalLight(0xffffff, 5.0); dir2.position.set(-10, 10, -10);
        }

        S.scene.add(amb); S.lights.push(amb);
        if(dir1) { dir1.castShadow = true; S.scene.add(dir1); S.lights.push(dir1); S.dirLight1 = dir1; S.dirLight1Base = dir1.position.clone(); }
        if(dir2) { S.scene.add(dir2); S.lights.push(dir2); }
        if(point) { S.scene.add(point); S.lights.push(point); }
    }

    function setSt(msg) {
        var el = document.getElementById('mm-st');
        if (el) el.textContent = '● ' + msg;
    }

    function expPng() {
        if(!S.renderer) return;
        setSt('Capturing...');
        S.renderer.render(S.scene, S.camera);
        var a = document.createElement('a');
        a.href = S.renderer.domElement.toDataURL('image/png');
        a.download = 'mockup-master.png';
        a.click();
        setSt('✓ Image exported!');
    }

    function expVid() {
        if (!S.renderer) return;
        setSt('⏺ Recording (5s)...');
        var stream = S.renderer.domElement.captureStream(30);
        var rec = new MediaRecorder(stream, { mimeType: 'video/webm' });
        var ch = [];
        rec.ondataavailable = function(e) { if(e.data.size > 0) ch.push(e.data); };
        rec.onstop = function() {
            var url = URL.createObjectURL(new Blob(ch, { type: 'video/webm' }));
            var a = document.createElement('a');
            a.href = url; a.download = 'mockup-master.webm'; a.click();
            URL.revokeObjectURL(url);
            setSt('✓ Video exported!');
        };
        rec.start();
        setTimeout(function(){ rec.stop(); }, 5000);
    }

    function expHtml() {
        if (!S.scene) return;
        setSt('Generating HTML...');

        var devCode = '';
        if (S.deviceType === 'iphone') {
            devCode = `
            var s = createRoundedRect(3.5, 7.2, 0.4);
            var g = new THREE.ExtrudeGeometry(s, { depth: 0.3, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.05, bevelThickness: 0.05 });
            var m = new THREE.Mesh(g, bodyMat); m.castShadow = true; m.receiveShadow = true; m.position.z = -0.15;
            deviceGroup.add(m);
            var sG = new THREE.PlaneGeometry(3.2, 6.9);
            screenMesh = new THREE.Mesh(sG, screenMat); screenMesh.position.z = 0.21;
            deviceGroup.add(screenMesh);
            `;
        } else if (S.deviceType === 'macbook') {
            devCode = `
            var baseS = createRoundedRect(8, 5.5, 0.2);
            var baseG = new THREE.ExtrudeGeometry(baseS, { depth: 0.2, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.02, bevelThickness: 0.02 });
            var baseM = new THREE.Mesh(baseG, bodyMat); baseM.rotation.x = Math.PI / 2; baseM.position.y = -2; baseM.castShadow = true;
            deviceGroup.add(baseM);
            var kbG = new THREE.PlaneGeometry(6.8, 3.0); var kbM = new THREE.MeshBasicMaterial({ color: 0x050505 });
            var kbMesh = new THREE.Mesh(kbG, kbM); kbMesh.rotation.x = -Math.PI / 2; kbMesh.position.set(0, -1.97, -0.8); deviceGroup.add(kbMesh);
            var tpG = new THREE.PlaneGeometry(2.5, 1.5); var tpMesh = new THREE.Mesh(tpG, kbM); tpMesh.rotation.x = -Math.PI / 2; tpMesh.position.set(0, -1.97, 1.8); deviceGroup.add(tpMesh);
            var lidGroup = new THREE.Group(); lidGroup.position.set(0, -2, -2.75);
            var lidS = createRoundedRect(8, 5.5, 0.2);
            var lidG = new THREE.ExtrudeGeometry(lidS, { depth: 0.1, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.02, bevelThickness: 0.02 });
            var lidM = new THREE.Mesh(lidG, bodyMat); lidM.position.y = 2.75; lidM.castShadow = true; lidGroup.add(lidM);
            var sG = new THREE.PlaneGeometry(7.6, 5.0); screenMesh = new THREE.Mesh(sG, screenMat); screenMesh.position.set(0, 2.75, 0.125); lidGroup.add(screenMesh);
            lidGroup.rotation.x = -0.15; deviceGroup.add(lidGroup); deviceGroup.position.y = 0.5;
            `;
        } else if (S.deviceType === 'ipad') {
            devCode = `
            var s = createRoundedRect(6, 8, 0.3);
            var g = new THREE.ExtrudeGeometry(s, { depth: 0.2, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.04, bevelThickness: 0.04 });
            var m = new THREE.Mesh(g, bodyMat); m.castShadow = true; m.receiveShadow = true; m.position.z = -0.1; deviceGroup.add(m);
            var sG = new THREE.PlaneGeometry(5.6, 7.6); screenMesh = new THREE.Mesh(sG, screenMat); screenMesh.position.z = 0.15; deviceGroup.add(screenMesh);
            `;
        }

        var lgtCode = '';
        if (S.lightMood === 'dramatic') lgtCode = 'var l1=new THREE.DirectionalLight(0xffffff,2.0);l1.position.set(5,5,5);l1.castShadow=true;scene.add(l1);var l1bx=5,l1by=5;var l2=new THREE.DirectionalLight(0xaabbff,1.0);l2.position.set(-5,-5,-5);scene.add(l2);var l2bx=-5,l2by=-5;var point=new THREE.PointLight(0xffffff,1.5,10);point.position.set(0,5,2);scene.add(point);scene.add(new THREE.AmbientLight(0xffffff,0.2));';
        else if (S.lightMood === 'studio') lgtCode = 'var l1=new THREE.DirectionalLight(0xffffff,1.0);l1.position.set(0,10,10);l1.castShadow=true;scene.add(l1);var l1bx=0,l1by=10;var l2=new THREE.DirectionalLight(0xffffff,0.5);l2.position.set(10,0,-5);scene.add(l2);var l2bx=10,l2by=0;scene.add(new THREE.AmbientLight(0xffffff,0.8));';
        else if (S.lightMood === 'neon') lgtCode = 'var l1=new THREE.DirectionalLight(0xff00ff,2.5);l1.position.set(5,5,5);l1.castShadow=true;scene.add(l1);var l1bx=5,l1by=5;var l2=new THREE.DirectionalLight(0x00ffff,2.5);l2.position.set(-5,-5,5);scene.add(l2);var l2bx=-5,l2by=-5;scene.add(new THREE.AmbientLight(0x220044,0.4));';
        else if (S.lightMood === 'dark') lgtCode = 'var l1=new THREE.DirectionalLight(0x333333,1.0);l1.position.set(0,5,5);l1.castShadow=true;scene.add(l1);var l1bx=0,l1by=5;var l2=new THREE.DirectionalLight(0xffffff,5.0);l2.position.set(-10,10,-10);scene.add(l2);var l2bx=-10,l2by=10;scene.add(new THREE.AmbientLight(0x111111,0.5));';

        var motCode = '';
        if (S.motion === 'rotateY') motCode = 'deviceGroup.rotation.y += 0.008; deviceGroup.rotation.x = 0; deviceGroup.position.set(0,0,0); cam.position.set(0,0,12); cam.lookAt(0,0,0);';
        else if (S.motion === 'float') motCode = 'deviceGroup.position.y = Math.sin(t*2)*0.4; deviceGroup.rotation.x = Math.sin(t)*0.1; deviceGroup.rotation.y += 0.003; cam.position.set(0,0,12); cam.lookAt(0,0,0);';
        else if (S.motion === 'cinematic') motCode = 'deviceGroup.rotation.y += 0.002; deviceGroup.position.set(0,0,0); cam.position.x = Math.sin(t*0.3)*6; cam.position.z = Math.cos(t*0.3)*6+8; cam.lookAt(0,0,0);';
        else if (S.motion === 'tilt') motCode = 'deviceGroup.rotation.y += (mouseX*1.5 - deviceGroup.rotation.y)*0.1; deviceGroup.rotation.x += (mouseY*1.5 - deviceGroup.rotation.x)*0.1; deviceGroup.position.set(0,0,0); cam.position.set(0,0,12); cam.lookAt(0,0,0);';
        else motCode = 'deviceGroup.rotation.set(0,0,0); deviceGroup.position.set(0,0,0); cam.position.set(0,0,12); cam.lookAt(0,0,0);';

        var js = `
        var scene = new THREE.Scene(); scene.background = new THREE.Color(0x0f172a);
        var W = window.innerWidth, H = window.innerHeight;
        var cam = new THREE.PerspectiveCamera(40, W/H, 0.1, 100); cam.position.z = 12;
        var ren = new THREE.WebGLRenderer({antialias:true}); ren.setSize(W,H); ren.shadowMap.enabled=true; ren.outputEncoding=THREE.sRGBEncoding;
        document.body.appendChild(ren.domElement);
        window.addEventListener("resize",function(){
            W=window.innerWidth; H=window.innerHeight; 
            cam.aspect=W/H; cam.updateProjectionMatrix(); 
            ren.setSize(W,H);
        });
        
        function createRoundedRect(w,h,r){var s=new THREE.Shape();s.moveTo(-w/2+r,-h/2);s.lineTo(w/2-r,-h/2);s.quadraticCurveTo(w/2,-h/2,w/2,-h/2+r);s.lineTo(w/2,h/2-r);s.quadraticCurveTo(w/2,h/2,w/2-r,h/2);s.lineTo(-w/2+r,h/2);s.quadraticCurveTo(-w/2,h/2,-w/2,h/2-r);s.lineTo(-w/2,-h/2+r);s.quadraticCurveTo(-w/2,-h/2,-w/2+r,-h/2);return s;}
        
        var wrapperGroup = new THREE.Group(); scene.add(wrapperGroup);
        var deviceGroup = new THREE.Group(); wrapperGroup.add(deviceGroup);
        var bodyMat = new THREE.MeshStandardMaterial({color:0x111111,roughness:0.15,metalness:0.9});
        var screenMat = new THREE.MeshBasicMaterial({color:0x000000});
        var screenMesh = null;

        ${devCode}
        ${lgtCode}

        var textCanvas = document.createElement("canvas");
        var textCtx = textCanvas.getContext("2d");
        var textTex = new THREE.CanvasTexture(textCanvas);
        textTex.encoding = THREE.sRGBEncoding;
        textTex.anisotropy = ren.capabilities.getMaxAnisotropy();
        
        function updateScreenTex() {
            if(!screenMesh) return;
            var w = 2048;
            var mAspect = screenMesh.geometry.parameters.width / screenMesh.geometry.parameters.height;
            var h = Math.round(w / mAspect);
            textCanvas.width = w; textCanvas.height = h;
            textCtx.fillStyle = "#000000"; textCtx.fillRect(0,0,w,h);
            
            function drawOverlay() {
                if ("${S.txtVal}" !== "") {
                    textCtx.textAlign = "center"; textCtx.textBaseline = "middle";
                    var fontSize = ${S.txtSize} * 3;
                    textCtx.font = "bold " + fontSize + "px ${S.txtFont}";
                    textCtx.fillStyle = "${S.txtCol}";
                    var px = w/2 + (${S.txtX} / 100) * (w/2);
                    var py = h/2 - (${S.txtY} / 100) * (h/2);
                    textCtx.shadowColor = "rgba(0,0,0,0.8)";
                    textCtx.shadowBlur = 15; textCtx.shadowOffsetX = 4; textCtx.shadowOffsetY = 4;
                    textCtx.fillText("${S.txtVal}", px, py);
                }
                textTex.needsUpdate = true;
                screenMesh.material.map = textTex;
                screenMesh.material.color.set(0xffffff);
                screenMesh.material.needsUpdate = true;
            }

            if("${S.screenshot}" !== "null") {
                var img=new Image(); img.crossOrigin="anonymous";
                img.onload=function(){
                    var imgAspect = img.width / img.height;
                    var drawW = w, drawH = h, drawX = 0, drawY = 0;
                    if (imgAspect > mAspect) { drawH = h; drawW = h * imgAspect; drawX = (w - drawW) / 2; }
                    else { drawW = w; drawH = w / imgAspect; drawY = (h - drawH) / 2; }
                    textCtx.drawImage(img, drawX, drawY, drawW, drawH);
                    drawOverlay();
                };
                img.src="${S.screenshot}";
            } else {
                drawOverlay();
            }
        }
        updateScreenTex();

        var mouseX=0, mouseY=0;
        var isDragging=false, prevX=0, prevY=0, targetRotX=0, targetRotY=0;
        document.addEventListener("mousedown",function(e){isDragging=true;prevX=e.clientX;prevY=e.clientY;});
        document.addEventListener("mouseup",function(){isDragging=false;});
        document.addEventListener("mousemove",function(e){
            mouseX=(e.clientX-W/2)*0.005; mouseY=(e.clientY-H/2)*0.005;
            if(isDragging){ targetRotY+=(e.clientX-prevX)*0.01; targetRotX+=(e.clientY-prevY)*0.01; prevX=e.clientX; prevY=e.clientY; }
        });
        document.addEventListener('touchstart', function(e){ if(e.touches.length>0){ isDragging=true; prevX=e.touches[0].clientX; prevY=e.touches[0].clientY; }});
        document.addEventListener('touchend', function(){ isDragging=false; });
        document.addEventListener('touchmove', function(e){
            if(isDragging && e.touches.length>0){
                targetRotY += (e.touches[0].clientX - prevX) * 0.01;
                targetRotX += (e.touches[0].clientY - prevY) * 0.01;
                prevX = e.touches[0].clientX; prevY = e.touches[0].clientY;
            }
        });

        var t=0;
        function loop(){
            requestAnimationFrame(loop); t+=0.016;
            wrapperGroup.rotation.x += (targetRotX - wrapperGroup.rotation.x) * 0.1;
            wrapperGroup.rotation.y += (targetRotY - wrapperGroup.rotation.y) * 0.1;
            ${motCode}
            if(typeof l1!=="undefined"){l1.position.x=l1bx+mouseX*5;l1.position.y=l1by-mouseY*5;}
            if(typeof l2!=="undefined"){l2.position.x=l2bx-mouseX*5;l2.position.y=l2by+mouseY*5;}
            ren.render(scene,cam);
        }
        loop();
        `;

        var html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Mockup Master 3D</title><style>*{margin:0;padding:0;box-sizing:border-box;}body{background:#0f172a;overflow:hidden;}</style></head><body>';
        html += '<scr'+'ipt src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><'+'/script>';
        html += '<scr'+'ipt>'+js+'<'+'/script></body></html>';

        var blob = new Blob([html], { type: 'text/html' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url; a.download = 'mockup-master-scene.html'; a.click();
        setTimeout(function(){ URL.revokeObjectURL(url); }, 2000);
        setSt('✓ HTML Exported!');
    }
})();
