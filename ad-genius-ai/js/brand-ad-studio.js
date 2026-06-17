/**
 * Brand Ad Studio V2
 * Ultimate 3D Product Advertisement Generator
 * EN/FR Only
 */
(function() {
    'use strict';

    var _prevRenderTab = window.renderTab;
    var S = {
        active: false,
        scene: null, camera: null, renderer: null,
        orthoScene: null, orthoCamera: null, textMesh: null, textTex: null, textCanvas: null,
        mesh: null,
        animId: null,
        
        // V2 State
        shape: 'can',
        color: '#f43f5e',
        bgColor: '#020617',
        logoUrl: null,
        
        headline: 'TASTE THE FEELING',
        subhead: 'Brand Ad Studio',
        headCol: '#ffffff',
        subCol: '#cccccc',
        
        textSize: 1.0,
        textX: 0, textY: 0,
        
        modelScale: 1.0,
        modelX: 0, modelY: 0,
        
        motion: 'rotateY',
        vfx: 'none',
        postFx: 'none',
        innerFx: 'none',
        materialType: 'standard',
        lightMood: 'studio',
        
        // VFX Systems
        vfxPoints: null,
        vfxLines: null,
        lights: [],
        
        // DOM
        canvas: null,
        ui: null
    };

    window.renderTab = function(tab) {
        if (tab === 'brand-ad') {
            window.activeTab = 'brand-ad';
            document.querySelectorAll('.ltab').forEach(function(b) { b.classList.remove('active'); });
            var btn = document.getElementById('tab-brand-ad');
            if (btn) btn.classList.add('active');

            var cp = document.querySelector('.center-panel'), rp = document.querySelector('.right-panel');
            if (cp) cp.style.display = 'none';
            if (rp) rp.style.display = 'none';

            document.querySelectorAll('[id$="-workspace"]').forEach(function(w) { w.style.display = 'none'; });
            var ws = document.getElementById('brand-ad-workspace');
            if (ws) ws.style.display = 'flex';

            buildUI();
            setTimeout(initThree, 100);
            return;
        }
        
        S.active = false;
        if (S.animId) cancelAnimationFrame(S.animId);
        var ws = document.getElementById('brand-ad-workspace');
        if (ws) ws.style.display = 'none';
        if (_prevRenderTab) _prevRenderTab(tab);
    };

    function buildUI() {
        var fr = window.lang === 'fr';
        var r = document.getElementById('ba-right');
        if (!r) return;

        function grp(title, inner) {
            return '<div style="background:rgba(255,255,255,0.02);border:1px solid #222;border-radius:8px;padding:12px;margin-bottom:15px;">' +
                   '<div style="font-size:12px;font-weight:bold;color:#fb7185;margin-bottom:10px;">' + title + '</div>' + inner + '</div>';
        }
        function sel(id, opts, val) {
            var o = Object.keys(opts).map(function(k) { return '<option value="'+k+'" '+(val===k?'selected':'')+'>'+opts[k]+'</option>'; }).join('');
            return '<select id="'+id+'" style="width:100%;background:#111;color:#fff;border:1px solid #333;padding:6px;border-radius:4px;font-size:11px;margin-bottom:10px;">'+o+'</select>';
        }
        function rng(id, lbl, min, max, step, val) {
            return '<div style="display:flex;align-items:center;margin-bottom:8px;gap:10px;"><label style="font-size:10px;width:30px;">'+lbl+'</label>' +
                   '<input type="range" id="'+id+'" min="'+min+'" max="'+max+'" step="'+step+'" value="'+val+'" style="flex:1;"></div>';
        }
        function col(id, lbl, val) {
            return '<div style="flex:1;"><label style="display:block;font-size:10px;margin-bottom:2px;">'+lbl+'</label><input type="color" id="'+id+'" value="'+val+'" style="width:100%;height:24px;border:none;background:transparent;cursor:pointer;"></div>';
        }

        var html = '<div style="color:white;font-family:sans-serif;">' +
            '<h2 style="margin:0 0 4px;color:#fb7185;font-size:18px;">🥤 Brand Ad Studio V2</h2>' +
            '<p style="margin:0 0 20px;font-size:11px;color:#94a3b8;">' + (fr ? 'Moteur Publicitaire Pro' : 'Pro Advertising Engine') + '</p>';

        // TYPOGRAPHY
        var tInner = 
            '<input type="text" id="ba-head" value="' + S.headline + '" placeholder="Headline" style="width:100%;background:#111;color:#fff;border:1px solid #333;padding:6px;border-radius:4px;font-size:11px;margin-bottom:6px;box-sizing:border-box;">' +
            '<input type="text" id="ba-sub" value="' + S.subhead + '" placeholder="Subheadline" style="width:100%;background:#111;color:#fff;border:1px solid #333;padding:6px;border-radius:4px;font-size:11px;margin-bottom:10px;box-sizing:border-box;">' +
            '<div style="display:flex;gap:10px;margin-bottom:10px;">' + col('ba-hc', 'Head', S.headCol) + col('ba-sc', 'Sub', S.subCol) + '</div>' +
            rng('ba-ts', fr?'Taille':'Size', 0.5, 2.5, 0.1, S.textSize) +
            rng('ba-tx', 'X', -500, 500, 10, S.textX) +
            rng('ba-ty', 'Y', -500, 500, 10, S.textY);
        html += grp('📝 TYPOGRAPHY', tInner);

        // 3D MODEL
        var mOpts = { 'can': fr?'Canette':'Can', 'box': fr?'Boîte':'Box', 'sphere': fr?'Sphère':'Sphere', 'cone': fr?'Cône':'Cone', 'torus': fr?'Anneau':'Ring', 'pyramid': fr?'Pyramide':'Pyramid', 'diamond': fr?'Diamant':'Diamond', 'infinity': fr?'Infini':'Infinity', 'capsule': fr?'Gélule':'Capsule', 'billboard': fr?'Panneau':'Billboard' };
        var mInner = 
            sel('ba-shape', mOpts, S.shape) +
            '<input type="file" id="ba-file" accept="image/png, image/jpeg" style="width:100%;font-size:10px;color:#94a3b8;margin-bottom:10px;">' +
            rng('ba-ms', fr?'Taille':'Size', 0.5, 3.0, 0.1, S.modelScale) +
            rng('ba-mx', 'X', -10, 10, 0.5, S.modelX) +
            rng('ba-my', 'Y', -10, 10, 0.5, S.modelY);
        html += grp('🧊 3D MODEL & LOGO', mInner);

        // ENVIRONMENT & FX
        var matOpts = { 'standard': 'Standard', 'gold': fr?'Or (Gold)':'Gold', 'glass': fr?'Verre (Glass)':'Glass', 'chrome': 'Chrome' };
        var lgtOpts = { 'studio': 'Studio', 'neon': 'Neon Cyberpunk', 'golden': 'Golden Hour', 'dramatic': 'Dramatic' };
        var vfxOpts = { 'none': 'None', 'cosmos': 'Cosmos', 'rain': fr?'Ploaie (Rain)':'Rain', 'snow': fr?'Ninsoare (Snow)':'Snow', 'water': fr?'Apă (Water)':'Underwater', 'storm': fr?'Furtună (Storm)':'Storm' };
        var pfxOpts = { 'none': 'None', 'bloom': fr?'Éclat (Bloom)':'Cinematic Bloom', 'glitch': fr?'Cyberpunk Glitch':'Cyberpunk Glitch', 'crt': fr?'Télé Vintage (CRT)':'Vintage CRT' };
        var inOpts = { 'none': 'None', 'bubbles': fr?'Bulles 3D (Parfum)':'3D Bubbles (Perfume)' };
        var moOpts = { 
            'rotateY': 'Rotate Y', 
            'rotateYInv': fr?'Rotation Y (Inverse)':'Rotate Y (Inverse)',
            'rotateX': 'Rotate X',
            'rotateZ': 'Rotate Z',
            'float': 'Float', 
            'cinematic': 'Cinematic', 
            'pulse': fr?'Pulsation':'Pulse',
            'bounce': fr?'Rebond':'Bounce',
            'spinCoin': fr?'Pièce Tournante':'Spinning Coin',
            'spiral': fr?'Spirale':'Spiral Flight',
            'zigzag': 'Zig-Zag',
            'dramaticZoom': fr?'Zoom Dramatique':'Dramatic Zoom',
            'heartbeat': fr?'Battement Cœur':'Heartbeat',
            'static': 'Static' 
        };
        
        var fxInner = 
            '<label style="font-size:10px;">Material:</label>' + sel('ba-mat', matOpts, S.materialType) +
            '<label style="font-size:10px;">Lighting:</label>' + sel('ba-light', lgtOpts, S.lightMood) +
            '<label style="font-size:10px;">Post-Processing FX:</label>' + sel('ba-pfx', pfxOpts, S.postFx) +
            '<label style="font-size:10px;">Inner Details:</label>' + sel('ba-infx', inOpts, S.innerFx) +
            '<label style="font-size:10px;">VFX Backdrop:</label>' + sel('ba-vfx', vfxOpts, S.vfx) +
            '<label style="font-size:10px;">Motion:</label>' + sel('ba-motion', moOpts, S.motion) +
            '<div style="display:flex;gap:10px;margin-top:10px;">' + col('ba-col', 'Base Color', S.color) + col('ba-bg', 'Backdrop', S.bgColor) + '</div>';
        html += grp('✨ ENVIRONMENT & FX', fxInner);

        // EXPORTS
        html += 
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:20px;">' +
            '<button id="ba-exp-png" style="background:#1e293b;color:#fff;border:1px solid #334155;padding:10px;border-radius:6px;font-weight:bold;cursor:pointer;font-size:11px;">📸 Photo</button>' +
            '<button id="ba-exp-vid" style="background:linear-gradient(135deg,#f43f5e,#fb7185);color:#fff;border:none;padding:10px;border-radius:6px;font-weight:bold;cursor:pointer;font-size:11px;">🎥 Video</button>' +
            '</div>' +
            '<button id="ba-exp-html" style="width:100%;margin-top:10px;background:#0ea5e9;color:#fff;border:none;padding:10px;border-radius:6px;font-weight:bold;cursor:pointer;font-size:11px;">🌐 Export HTML 3D</button>' +
            '<div id="ba-st" style="margin-top:15px;font-size:11px;text-align:center;color:#4ade80;">● ' + (fr ? 'Studio V2 prêt' : 'Studio V2 ready') + '</div>' +
            '</div>';

        r.innerHTML = html;

        // Binds
        function bindInp(id, key, fn) { document.getElementById(id).oninput = function() { S[key] = this.value; if(fn) fn(); }; }
        function bindNum(id, key, fn) { document.getElementById(id).oninput = function() { S[key] = parseFloat(this.value); if(fn) fn(); }; }
        function bindSel(id, key, fn) { document.getElementById(id).onchange = function() { S[key] = this.value; if(fn) fn(); }; }

        bindInp('ba-head', 'headline', renderText);
        bindInp('ba-sub', 'subhead', renderText);
        bindInp('ba-hc', 'headCol', renderText);
        bindInp('ba-sc', 'subCol', renderText);
        bindNum('ba-ts', 'textSize', renderText);
        bindNum('ba-tx', 'textX', renderText);
        bindNum('ba-ty', 'textY', renderText);

        bindSel('ba-shape', 'shape', rebuildMesh);
        bindSel('ba-mat', 'materialType', rebuildMesh);
        bindNum('ba-ms', 'modelScale', updateModelTransform);
        bindNum('ba-mx', 'modelX', updateModelTransform);
        bindNum('ba-my', 'modelY', updateModelTransform);

        bindSel('ba-light', 'lightMood', updateLighting);
        bindSel('ba-vfx', 'vfx', updateVFX);
        bindSel('ba-pfx', 'postFx', updatePostFx);
        bindSel('ba-infx', 'innerFx', rebuildMesh);
        bindSel('ba-motion', 'motion');

        bindInp('ba-col', 'color', rebuildMesh);
        bindInp('ba-bg', 'bgColor', updateBg);

        document.getElementById('ba-file').onchange = function(e) {
            var file = e.target.files[0];
            if(!file) return;
            var rdr = new FileReader();
            rdr.onload = function(evt) { S.logoUrl = evt.target.result; rebuildMesh(); };
            rdr.readAsDataURL(file);
        };

        document.getElementById('ba-exp-png').onclick = expPng;
        document.getElementById('ba-exp-vid').onclick = expVid;
        document.getElementById('ba-exp-html').onclick = expHtml;
    }

    function updateModelTransform() {
        if (!S.mesh) return;
        S.mesh.scale.set(S.modelScale, S.modelScale, S.modelScale);
        // Base position updated in animate loop, we use base coords
    }

    function updateBg() {
        if (S.scene) {
            S.scene.background.set(S.bgColor);
            if (S.scene.fog) S.scene.fog.color.set(S.bgColor);
        }
    }

    function initThree() {
        if (!window.THREE) { console.error('Three.js not loaded!'); return; }
        if (S.active) return;
        S.active = true;

        var ct = document.getElementById('ba-center');
        if (!ct) return;
        ct.innerHTML = '';
        ct.style.position = 'relative';
        
        S.mouseX = 0; S.mouseY = 0;
        ct.onmousemove = function(e) {
            S.mouseX = (e.clientX - ct.clientWidth/2) * 0.005;
            S.mouseY = (e.clientY - ct.clientHeight/2) * 0.005;
        };

        // Main Scene
        S.scene = new THREE.Scene();
        S.scene.background = new THREE.Color(S.bgColor);
        S.scene.fog = new THREE.Fog(S.bgColor, 10, 30);

        S.camera = new THREE.PerspectiveCamera(45, ct.clientWidth / ct.clientHeight, 0.1, 100);
        S.camera.position.z = 15;

        // Ortho Scene (Text)
        S.orthoScene = new THREE.Scene();
        S.orthoCamera = new THREE.OrthographicCamera(ct.clientWidth / -2, ct.clientWidth / 2, ct.clientHeight / 2, ct.clientHeight / -2, 1, 10);
        S.orthoCamera.position.z = 5;

        S.textCanvas = document.createElement('canvas');
        S.textCanvas.width = ct.clientWidth;
        S.textCanvas.height = ct.clientHeight;
        S.textTex = new THREE.CanvasTexture(S.textCanvas);
        S.textTex.minFilter = THREE.LinearFilter;
        
        var planeGeo = new THREE.PlaneGeometry(ct.clientWidth, ct.clientHeight);
        var planeMat = new THREE.MeshBasicMaterial({ map: S.textTex, transparent: true });
        S.textMesh = new THREE.Mesh(planeGeo, planeMat);
        S.textMesh.position.set(0, 0, 0);
        S.orthoScene.add(S.textMesh);

        // Renderer
        S.renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true, alpha: false });
        S.renderer.setSize(ct.clientWidth, ct.clientHeight);
        S.renderer.autoClear = false;
        S.renderer.shadowMap.enabled = true;
        S.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        S.canvas = S.renderer.domElement;
        ct.appendChild(S.canvas);

        updateLighting();
        updateVFX();
        updatePostFx();
        rebuildMesh();
        renderText();

        var clock = new THREE.Clock();
        function animate() {
            if (!S.active) return;
            S.animId = requestAnimationFrame(animate);
            var delta = clock.getDelta();
            var time = clock.getElapsedTime();

            if (S.mesh) {
                var mx = S.modelX;
                var my = S.modelY;
                var ms = S.modelScale;
                S.mesh.scale.set(ms, ms, ms);
                
                if (S.motion === 'rotateY') {
                    S.mesh.rotation.y += 0.5 * delta;
                    S.mesh.position.set(mx, my + Math.sin(time * 2) * 0.2, 0);
                    S.camera.position.set(0, 0, 15);
                } else if (S.motion === 'rotateYInv') {
                    S.mesh.rotation.y -= 0.5 * delta;
                    S.mesh.position.set(mx, my + Math.sin(time * 2) * 0.2, 0);
                    S.camera.position.set(0, 0, 15);
                } else if (S.motion === 'rotateX') {
                    S.mesh.rotation.x += 0.5 * delta;
                    S.mesh.position.set(mx, my, 0);
                    S.camera.position.set(0, 0, 15);
                } else if (S.motion === 'rotateZ') {
                    S.mesh.rotation.z += 0.5 * delta;
                    S.mesh.position.set(mx, my, 0);
                    S.camera.position.set(0, 0, 15);
                } else if (S.motion === 'float') {
                    S.mesh.position.set(mx, my + Math.sin(time * 1.5) * 0.5, 0);
                    S.mesh.rotation.x = Math.sin(time * 0.5) * 0.2;
                    S.mesh.rotation.y += 0.2 * delta;
                    S.camera.position.set(0, 0, 15);
                } else if (S.motion === 'cinematic') {
                    S.mesh.rotation.y += 0.1 * delta;
                    S.mesh.position.set(mx, my, 0);
                    S.camera.position.x = Math.sin(time * 0.3) * 8;
                    S.camera.position.z = Math.cos(time * 0.3) * 8 + 7;
                    S.camera.lookAt(mx,my,0);
                } else if (S.motion === 'pulse') {
                    S.mesh.rotation.y += 0.2 * delta;
                    S.mesh.position.set(mx, my, 0);
                    var scale = ms * (1 + Math.sin(time * 4) * 0.1);
                    S.mesh.scale.set(scale, scale, scale);
                    S.camera.position.set(0, 0, 15);
                } else if (S.motion === 'bounce') {
                    S.mesh.rotation.y += 0.5 * delta;
                    S.mesh.position.set(mx, my + Math.abs(Math.sin(time * 3)) * 1.5 - 0.75, 0);
                    S.camera.position.set(0, 0, 15);
                } else if (S.motion === 'spinCoin') {
                    S.mesh.rotation.y += 3.0 * delta;
                    S.mesh.rotation.x = Math.sin(time) * 0.2;
                    S.mesh.position.set(mx, my, 0);
                    S.camera.position.set(0, 0, 15);
                } else if (S.motion === 'spiral') {
                    S.mesh.rotation.y += 1.0 * delta;
                    S.mesh.rotation.x += 0.5 * delta;
                    S.mesh.position.set(mx + Math.sin(time)*2, my + Math.cos(time)*2, 0);
                    S.camera.position.set(0, 0, 15);
                } else if (S.motion === 'zigzag') {
                    S.mesh.rotation.y += 0.5 * delta;
                    S.mesh.position.set(mx + Math.sin(time * 5), my + Math.cos(time * 2.5), 0);
                    S.camera.position.set(0, 0, 15);
                } else if (S.motion === 'dramaticZoom') {
                    S.mesh.rotation.y += 0.2 * delta;
                    S.mesh.position.set(mx, my, 0);
                    S.camera.position.set(0, 0, 15 - Math.sin(time * 0.5) * 8);
                    S.camera.lookAt(mx,my,0);
                } else if (S.motion === 'heartbeat') {
                    S.mesh.rotation.y += 0.2 * delta;
                    S.mesh.position.set(mx, my, 0);
                    var beat = Math.pow(Math.sin(time * 4), 8) * 0.2;
                    var scale = ms * (1 + beat);
                    S.mesh.scale.set(scale, scale, scale);
                    S.camera.position.set(0, 0, 15);
                } else {
                    S.mesh.rotation.set(0, 0, 0);
                    S.mesh.position.set(mx, my, 0);
                    S.camera.position.set(0, 0, 15);
                    S.camera.lookAt(0,0,0);
                }
            }
            
            // Mouse Parallax for lights
            if (S.dirLight1 && S.dirLight1Base) {
                S.dirLight1.position.x = S.dirLight1Base.x + S.mouseX * 10;
                S.dirLight1.position.y = S.dirLight1Base.y - S.mouseY * 10;
            }
            if (S.dirLight2 && S.dirLight2Base) {
                S.dirLight2.position.x = S.dirLight2Base.x - S.mouseX * 5;
                S.dirLight2.position.y = S.dirLight2Base.y + S.mouseY * 5;
            }

            // Inner Bubbles
            if (S.innerParticles) {
                S.innerParticles.rotation.y += delta * 0.5;
                S.innerParticles.rotation.x += delta * 0.2;
                var positions = S.innerParticles.geometry.attributes.position.array;
                for(var i=1; i<positions.length; i+=3) {
                    positions[i] += delta * 0.5;
                    if(positions[i] > 1.5) positions[i] = -1.5;
                }
                S.innerParticles.geometry.attributes.position.needsUpdate = true;
            }

            // Animate VFX
            if (S.vfx === 'cosmos' && S.vfxPoints) {
                S.vfxPoints.rotation.y = time * 0.05;
                S.vfxPoints.rotation.z = time * 0.02;
            } else if (S.vfx === 'rain' && S.vfxLines) {
                var pos = S.vfxLines.geometry.attributes.position.array;
                for(var i=1; i<pos.length; i+=3) {
                    pos[i] -= 15 * delta;
                    if(pos[i] < -10) pos[i] = 10;
                }
                S.vfxLines.geometry.attributes.position.needsUpdate = true;
            } else if (S.vfx === 'snow' && S.vfxPoints) {
                var p = S.vfxPoints.geometry.attributes.position.array;
                for(var i=0; i<p.length; i+=3) {
                    p[i+1] -= 2 * delta; // y
                    p[i] += Math.sin(time + p[i+2]) * delta; // x sway
                    if(p[i+1] < -10) p[i+1] = 10;
                }
                S.vfxPoints.geometry.attributes.position.needsUpdate = true;
            } else if (S.vfx === 'water' && S.vfxPoints) {
                var p = S.vfxPoints.geometry.attributes.position.array;
                for(var i=0; i<p.length; i+=3) {
                    p[i+1] += 3 * delta; // y up
                    p[i] += Math.sin(time*2 + p[i+2]) * 0.05;
                    if(p[i+1] > 10) p[i+1] = -10;
                }
                S.vfxPoints.geometry.attributes.position.needsUpdate = true;
            } else if (S.vfx === 'storm') {
                if (S.vfxLines) {
                    var pos = S.vfxLines.geometry.attributes.position.array;
                    for(var i=1; i<pos.length; i+=3) { pos[i] -= 25 * delta; if(pos[i] < -10) pos[i] = 10; }
                    S.vfxLines.geometry.attributes.position.needsUpdate = true;
                }
                // Lightning flash
                if (S.lights[0] && Math.random() < 0.01) {
                    S.lights[0].intensity = 5.0;
                    setTimeout(function(){ if(S.lights[0]) S.lights[0].intensity = 0.6; }, 100);
                }
            }

            S.renderer.clear();
            S.renderer.render(S.scene, S.camera);
            S.renderer.clearDepth();
            S.renderer.render(S.orthoScene, S.orthoCamera);
        }
        animate();

        window.addEventListener('resize', onResize);
    }

    function updateLighting() {
        if (!S.scene) return;
        S.lights.forEach(function(l) { S.scene.remove(l); });
        S.lights = [];

        var m = S.lightMood;
        var amb, dir1, dir2;

        if (m === 'studio') {
            amb = new THREE.AmbientLight(0xffffff, 0.6);
            dir1 = new THREE.DirectionalLight(0xffffff, 1.2); dir1.position.set(5, 10, 7);
            dir2 = new THREE.DirectionalLight(0xffffff, 0.4); dir2.position.set(-5, 5, -5);
        } else if (m === 'neon') {
            amb = new THREE.AmbientLight(0x221144, 0.3);
            dir1 = new THREE.DirectionalLight(0xff00ff, 1.5); dir1.position.set(10, 5, 5); // Pink right
            dir2 = new THREE.DirectionalLight(0x00ffff, 1.5); dir2.position.set(-10, -5, 5); // Cyan left
        } else if (m === 'golden') {
            amb = new THREE.AmbientLight(0xffaa55, 0.4);
            dir1 = new THREE.DirectionalLight(0xff7700, 2.0); dir1.position.set(10, 2, 10);
            dir2 = new THREE.DirectionalLight(0x4444ff, 0.2); dir2.position.set(-10, 10, -10);
        } else if (m === 'dramatic') {
            amb = new THREE.AmbientLight(0xffffff, 0.05);
            dir1 = new THREE.DirectionalLight(0xffffff, 2.5); dir1.position.set(0, 15, 2);
        }

        S.scene.add(amb); S.lights.push(amb);
        if(dir1) { dir1.castShadow = true; S.scene.add(dir1); S.lights.push(dir1); S.dirLight1 = dir1; S.dirLight1Base = dir1.position.clone(); } else { S.dirLight1 = null; }
        if(dir2) { S.scene.add(dir2); S.lights.push(dir2); S.dirLight2 = dir2; S.dirLight2Base = dir2.position.clone(); } else { S.dirLight2 = null; }
    }

    function updateVFX() {
        if (!S.scene) return;
        if (S.vfxPoints) { S.scene.remove(S.vfxPoints); S.vfxPoints.geometry.dispose(); S.vfxPoints.material.dispose(); S.vfxPoints = null; }
        if (S.vfxLines) { S.scene.remove(S.vfxLines); S.vfxLines.geometry.dispose(); S.vfxLines.material.dispose(); S.vfxLines = null; }
        
        var v = S.vfx;
        var pCount = 500;
        
        if (v === 'cosmos' || v === 'snow' || v === 'water') {
            var geo = new THREE.BufferGeometry();
            var pos = new Float32Array(pCount * 3);
            for(var i=0; i<pCount*3; i++) pos[i] = (Math.random() - 0.5) * 30;
            geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
            var color = v==='water' ? 0xaaddff : 0xffffff;
            var size = v==='snow' ? 0.15 : (v==='cosmos' ? 0.05 : 0.2);
            var mat = new THREE.PointsMaterial({ size: size, color: color, transparent: true, opacity: 0.8 });
            S.vfxPoints = new THREE.Points(geo, mat);
            S.scene.add(S.vfxPoints);
            
            if(v==='water') S.scene.fog = new THREE.Fog(0x001133, 5, 20);
            else updateBg(); // reset fog
        } else if (v === 'rain' || v === 'storm') {
            var geo = new THREE.BufferGeometry();
            var pos = new Float32Array(pCount * 2 * 3); // line segments
            for(var i=0; i<pCount; i++) {
                var x = (Math.random() - 0.5) * 30;
                var y = (Math.random() - 0.5) * 30;
                var z = (Math.random() - 0.5) * 30;
                pos[i*6] = x; pos[i*6+1] = y; pos[i*6+2] = z;
                pos[i*6+3] = x; pos[i*6+4] = y - 1; pos[i*6+5] = z;
            }
            geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
            var mat = new THREE.LineBasicMaterial({ color: 0x88bbff, transparent: true, opacity: 0.6 });
            S.vfxLines = new THREE.LineSegments(geo, mat);
            S.scene.add(S.vfxLines);
            
            if(v==='storm') S.scene.fog = new THREE.FogExp2(0x222222, 0.05);
            else updateBg();
        } else {
            updateBg();
        }
    }

    function updatePostFx() {
        var ct = document.getElementById('ba-center');
        if (!ct) return;
        var existingOverlay = document.getElementById('crt-overlay');
        if (existingOverlay) existingOverlay.remove();
        
        if (S.postFx === 'crt') {
            var o = document.createElement('div');
            o.id = 'crt-overlay';
            o.style = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:50;' +
                      'background:linear-gradient(rgba(18,16,16,0) 50%,rgba(0,0,0,0.25) 50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06));' +
                      'background-size:100% 2px,3px 100%;box-shadow:inset 0 0 100px rgba(0,0,0,0.9);';
            ct.appendChild(o);
        }
        
        var sheet = document.getElementById('ba-fx-styles');
        if (!sheet) {
            sheet = document.createElement('style');
            sheet.id = 'ba-fx-styles';
            document.head.appendChild(sheet);
        }
        
        var anim = `@keyframes glitchFx { 0%, 90% { transform: translate(0); filter: hue-rotate(0deg); } 92% { transform: translate(-5px, 5px); filter: hue-rotate(90deg) contrast(1.5); } 94% { transform: translate(5px, -5px); filter: hue-rotate(-90deg) contrast(1.5); } 96% { transform: translate(-5px, -5px); filter: hue-rotate(90deg) contrast(1.5); } 98% { transform: translate(5px, 5px); filter: hue-rotate(-90deg) contrast(1.5); } 100% { transform: translate(0); filter: hue-rotate(0deg); } }`;
        
        if (S.postFx === 'bloom') {
            sheet.innerHTML = `#ba-center canvas { filter: saturate(1.3) contrast(1.2) brightness(1.1) drop-shadow(0 0 10px rgba(255,255,255,0.2)); transition: 0.3s; }`;
        } else if (S.postFx === 'glitch') {
            sheet.innerHTML = anim + ` #ba-center canvas { animation: glitchFx 2s linear infinite; }`;
        } else {
            sheet.innerHTML = ``;
        }
    }

    function onResize() {
        if (!S.active || !S.camera || !S.renderer) return;
        var ct = document.getElementById('ba-center');
        if (!ct) return;
        S.camera.aspect = ct.clientWidth / ct.clientHeight;
        S.camera.updateProjectionMatrix();
        
        S.orthoCamera.left = ct.clientWidth / -2;
        S.orthoCamera.right = ct.clientWidth / 2;
        S.orthoCamera.top = ct.clientHeight / 2;
        S.orthoCamera.bottom = ct.clientHeight / -2;
        S.orthoCamera.updateProjectionMatrix();
        
        S.textCanvas.width = ct.clientWidth;
        S.textCanvas.height = ct.clientHeight;
        
        if (S.textMesh) {
            S.textMesh.geometry.dispose();
            S.textMesh.geometry = new THREE.PlaneGeometry(ct.clientWidth, ct.clientHeight);
        }
        
        S.renderer.setSize(ct.clientWidth, ct.clientHeight);
        renderText();
    }

    function rebuildMesh() {
        if (S.mesh) {
            S.scene.remove(S.mesh);
            S.mesh.geometry.dispose();
            S.mesh.material.dispose();
        }

        var geo;
        if (S.shape === 'can') geo = new THREE.CylinderGeometry(1.5, 1.5, 4.5, 32);
        else if (S.shape === 'box') geo = new THREE.BoxGeometry(3, 4, 3);
        else if (S.shape === 'sphere') geo = new THREE.SphereGeometry(2, 32, 32);
        else if (S.shape === 'cone') geo = new THREE.ConeGeometry(2, 4, 32);
        else if (S.shape === 'torus') geo = new THREE.TorusGeometry(2, 0.6, 32, 64);
        else if (S.shape === 'pyramid') geo = new THREE.ConeGeometry(2.5, 4, 4);
        else if (S.shape === 'diamond') geo = new THREE.OctahedronGeometry(2);
        else if (S.shape === 'infinity') geo = new THREE.TorusKnotGeometry(1.5, 0.5, 100, 16);
        else if (S.shape === 'capsule') geo = new THREE.CapsuleGeometry(1.2, 2.5, 4, 16);
        else geo = new THREE.PlaneGeometry(5, 8);

        var matOpts = {};
        if (S.materialType === 'standard') matOpts = { color: S.color, roughness: 0.2, metalness: 0.8 };
        else if (S.materialType === 'gold') matOpts = { color: 0xffd700, roughness: 0.1, metalness: 1.0 };
        else if (S.materialType === 'glass') matOpts = { color: 0xffffff, roughness: 0.1, metalness: 0.1, transmission: 0.9, transparent: true, opacity: 1.0, ior: 1.5 };
        else if (S.materialType === 'chrome') matOpts = { color: 0xffffff, roughness: 0.0, metalness: 1.0 };

        var mat;
        if (S.materialType === 'glass') mat = new THREE.MeshPhysicalMaterial(matOpts);
        else mat = new THREE.MeshStandardMaterial(matOpts);

        S.mesh = new THREE.Mesh(geo, mat);
        S.mesh.castShadow = true;
        S.mesh.receiveShadow = true;
        
        if (S.innerFx === 'bubbles') {
            var bGeo = new THREE.BufferGeometry();
            var bPos = new Float32Array(600 * 3);
            for(var i=0; i<600*3; i++) bPos[i] = (Math.random() - 0.5) * 2;
            bGeo.setAttribute('position', new THREE.BufferAttribute(bPos, 3));
            var bMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05, transparent: true, opacity: 0.6 });
            S.innerParticles = new THREE.Points(bGeo, bMat);
            S.mesh.add(S.innerParticles);
        } else {
            S.innerParticles = null;
        }

        updateModelTransform();
        S.scene.add(S.mesh);

        loadTexture();
    }

    function loadTexture() {
        if (!S.logoUrl || !S.mesh) return;
        var loader = new THREE.TextureLoader();
        loader.load(S.logoUrl, function(tex) {
            if (S.shape === 'can' || S.shape === 'sphere') {
                tex.wrapS = THREE.RepeatWrapping;
                tex.wrapT = THREE.RepeatWrapping;
                tex.repeat.set(1, 1);
            }
            S.mesh.material.map = tex;
            if (S.materialType === 'standard') S.mesh.material.color.set('#ffffff'); // Reset only for standard
            S.mesh.material.needsUpdate = true;
        });
    }

    function renderText() {
        if (!S.textCanvas) return;
        var ctx = S.textCanvas.getContext('2d');
        var w = S.textCanvas.width;
        var h = S.textCanvas.height;
        ctx.clearRect(0, 0, w, h);
        
        ctx.textAlign = 'center';
        
        // Base coordinate is center (w/2, h/2). S.textX and S.textY are offsets.
        var baseX = w/2 + S.textX;
        var baseY = h * 0.15 + S.textY; // default near top
        
        ctx.fillStyle = S.headCol;
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetY = 5;
        var fontSize = Math.floor(w * 0.05 * S.textSize);
        ctx.font = '900 ' + fontSize + 'px sans-serif';
        ctx.fillText(S.headline.toUpperCase(), baseX, baseY);
        
        ctx.fillStyle = S.subCol;
        ctx.shadowBlur = 5;
        var subSize = Math.floor(w * 0.025 * S.textSize);
        ctx.font = '300 ' + subSize + 'px sans-serif';
        ctx.fillText(S.subhead, baseX, baseY + fontSize + 10);
        
        if (S.textTex) S.textTex.needsUpdate = true;
    }

    function setSt(msg, c) {
        var el = document.getElementById('ba-st');
        if (el) { el.textContent = '● ' + msg; el.style.color = c || '#4ade80'; }
    }

    function expPng() {
        var fr = window.lang === 'fr';
        setSt(fr ? 'Capture...' : 'Capturing...', '#fcd34d');
        if(!S.renderer) return;
        S.renderer.clear();
        S.renderer.render(S.scene, S.camera);
        S.renderer.clearDepth();
        S.renderer.render(S.orthoScene, S.orthoCamera);
        var a = document.createElement('a');
        a.href = S.canvas.toDataURL('image/png');
        a.download = 'brand-ad-v2.png';
        a.click();
        setSt(fr ? '✓ Image exportée!' : '✓ Image exported!', '#4ade80');
    }

    function expVid() {
        var fr = window.lang === 'fr';
        if (!S.canvas) return;
        setSt(fr ? '⏺ Enregistrement (5s)...' : '⏺ Recording (5s)...', '#f43f5e');
        
        var stream = S.canvas.captureStream(30);
        var rec = new MediaRecorder(stream, { mimeType: 'video/webm' });
        var ch = [];
        rec.ondataavailable = function(e) { if(e.data.size > 0) ch.push(e.data); };
        rec.onstop = function() {
            var url = URL.createObjectURL(new Blob(ch, { type: 'video/webm' }));
            var a = document.createElement('a');
            a.href = url; a.download = 'brand-ad-v2.webm'; a.click();
            URL.revokeObjectURL(url);
            setSt(fr ? '✓ Vidéo exportée!' : '✓ Video exported!', '#4ade80');
        };
        rec.start();
        setTimeout(function(){ rec.stop(); }, 5000);
    }

    function expHtml() {
        var fr = window.lang === 'fr';
        setSt(fr ? 'Génération HTML...' : 'Generating HTML...', '#0ea5e9');
        
        var cleanLogo = S.logoUrl ? S.logoUrl.replace(/[\r\n\s]+/g, "") : "";
        
        // Prepare all code fragments
        var lgtCode, geoCode, matCode, matClass, motCode, logoCode, fogCode;
        
        if(S.lightMood==='neon')
            lgtCode='scene.add(new THREE.AmbientLight(0x221144,0.3));var l1=new THREE.DirectionalLight(0xff00ff,1.5);l1.position.set(10,5,5);var l1bx=10,l1by=5;scene.add(l1);var l2=new THREE.DirectionalLight(0x00ffff,1.5);l2.position.set(-10,-5,5);var l2bx=-10,l2by=-5;scene.add(l2);';
        else if(S.lightMood==='golden')
            lgtCode='scene.add(new THREE.AmbientLight(0xffaa55,0.4));var l1=new THREE.DirectionalLight(0xff7700,2.0);l1.position.set(10,2,10);var l1bx=10,l1by=2;scene.add(l1);var l2=new THREE.DirectionalLight(0x4444ff,0.2);l2.position.set(-10,10,-10);var l2bx=-10,l2by=10;scene.add(l2);';
        else if(S.lightMood==='dramatic')
            lgtCode='scene.add(new THREE.AmbientLight(0xffffff,0.05));var l1=new THREE.DirectionalLight(0xffffff,2.5);l1.position.set(0,15,2);var l1bx=0,l1by=15;scene.add(l1);';
        else
            lgtCode='scene.add(new THREE.AmbientLight(0xffffff,0.8));var l1=new THREE.DirectionalLight(0xffffff,1.5);l1.position.set(5,10,7);var l1bx=5,l1by=10;scene.add(l1);var l2=new THREE.DirectionalLight(0xffffff,0.5);l2.position.set(-5,5,-5);var l2bx=-5,l2by=5;scene.add(l2);';
        
        if(S.shape==='can')         geoCode='new THREE.CylinderGeometry(1.5,1.5,4.5,32)';
        else if(S.shape==='sphere') geoCode='new THREE.SphereGeometry(2,32,32)';
        else if(S.shape==='box')    geoCode='new THREE.BoxGeometry(3,4,3)';
        else if(S.shape==='cone')   geoCode='new THREE.ConeGeometry(2,4,32)';
        else if(S.shape==='torus')  geoCode='new THREE.TorusGeometry(2,0.6,32,64)';
        else if(S.shape==='pyramid') geoCode='new THREE.ConeGeometry(2.5,4,4)';
        else if(S.shape==='diamond') geoCode='new THREE.OctahedronGeometry(2)';
        else if(S.shape==='infinity') geoCode='new THREE.TorusKnotGeometry(1.5,0.5,100,16)';
        else if(S.shape==='capsule') geoCode='new THREE.CapsuleGeometry(1.2,2.5,4,16)';
        else                        geoCode='new THREE.PlaneGeometry(5,8)';
        
        matClass='THREE.MeshStandardMaterial';
        if(S.materialType==='gold')        matCode='{color:0xffd700,roughness:0.1,metalness:1.0}';
        else if(S.materialType==='glass')  { matCode='{color:0xffffff,roughness:0.05,metalness:0.1,transmission:0.9,transparent:true}'; matClass='THREE.MeshPhysicalMaterial'; }
        else if(S.materialType==='chrome') matCode='{color:0xffffff,roughness:0.0,metalness:1.0}';
        else                               matCode='{color:"'+S.color+'",roughness:0.3,metalness:0.2}';
        
        if(S.motion==='rotateY')
            motCode='mesh.rotation.y+=0.01;mesh.position.set(mx,my+Math.sin(t*2)*0.2,0);cam.position.set(mouseX*2,-mouseY*2,15);cam.lookAt(mx,my,0);';
        else if(S.motion==='rotateYInv')
            motCode='mesh.rotation.y-=0.01;mesh.position.set(mx,my+Math.sin(t*2)*0.2,0);cam.position.set(mouseX*2,-mouseY*2,15);cam.lookAt(mx,my,0);';
        else if(S.motion==='rotateX')
            motCode='mesh.rotation.x+=0.01;mesh.position.set(mx,my,0);cam.position.set(mouseX*2,-mouseY*2,15);cam.lookAt(mx,my,0);';
        else if(S.motion==='rotateZ')
            motCode='mesh.rotation.z+=0.01;mesh.position.set(mx,my,0);cam.position.set(mouseX*2,-mouseY*2,15);cam.lookAt(mx,my,0);';
        else if(S.motion==='float')
            motCode='mesh.position.set(mx,my+Math.sin(t*1.5)*0.5,0);mesh.rotation.x=Math.sin(t*0.5)*0.2;mesh.rotation.y+=0.01;cam.position.set(mouseX*2,-mouseY*2,15);cam.lookAt(mx,my,0);';
        else if(S.motion==='cinematic')
            motCode='mesh.rotation.y+=0.005;mesh.position.set(mx,my,0);cam.position.x=Math.sin(t*0.3)*8;cam.position.z=Math.cos(t*0.3)*8+7;cam.lookAt(mx,my,0);';
        else if(S.motion==='pulse')
            motCode='mesh.rotation.y+=0.005;mesh.position.set(mx,my,0);var s=sc*(1+Math.sin(t*4)*0.1);mesh.scale.set(s,s,s);cam.position.set(mouseX*2,-mouseY*2,15);cam.lookAt(mx,my,0);';
        else if(S.motion==='bounce')
            motCode='mesh.rotation.y+=0.01;mesh.position.set(mx,my+Math.abs(Math.sin(t*3))*1.5-0.75,0);cam.position.set(mouseX*2,-mouseY*2,15);cam.lookAt(mx,my,0);';
        else if(S.motion==='spinCoin')
            motCode='mesh.rotation.y+=0.05;mesh.rotation.x=Math.sin(t)*0.2;mesh.position.set(mx,my,0);cam.position.set(mouseX*2,-mouseY*2,15);cam.lookAt(mx,my,0);';
        else if(S.motion==='spiral')
            motCode='mesh.rotation.y+=0.02;mesh.rotation.x+=0.01;mesh.position.set(mx+Math.sin(t)*2,my+Math.cos(t)*2,0);cam.position.set(mouseX*2,-mouseY*2,15);cam.lookAt(mx,my,0);';
        else if(S.motion==='zigzag')
            motCode='mesh.rotation.y+=0.01;mesh.position.set(mx+Math.sin(t*5),my+Math.cos(t*2.5),0);cam.position.set(mouseX*2,-mouseY*2,15);cam.lookAt(mx,my,0);';
        else if(S.motion==='dramaticZoom')
            motCode='mesh.rotation.y+=0.005;mesh.position.set(mx,my,0);cam.position.set(mouseX*2,-mouseY*2,15-Math.sin(t*0.5)*8);cam.lookAt(mx,my,0);';
        else if(S.motion==='heartbeat')
            motCode='mesh.rotation.y+=0.005;mesh.position.set(mx,my,0);var b=Math.pow(Math.sin(t*4),8)*0.2;var s=sc*(1+b);mesh.scale.set(s,s,s);cam.position.set(mouseX*2,-mouseY*2,15);cam.lookAt(mx,my,0);';
        else
            motCode='mesh.position.set(mx,my,0);cam.position.set(mouseX*2,-mouseY*2,15);cam.lookAt(0,0,0);';
        
        logoCode='';
        if(cleanLogo){
            var wC=(S.shape==='can'||S.shape==='sphere')?'tex.wrapS=tex.wrapT=THREE.RepeatWrapping;tex.repeat.set(1,1);':'';
            var rC=(S.materialType==='standard')?'mesh.material.color.set(0xffffff);':'';
            logoCode='var img=new Image();img.crossOrigin="anonymous";img.onload=function(){var tex=new THREE.Texture(img);'+wC+'tex.needsUpdate=true;mesh.material.map=tex;'+rC+'mesh.material.needsUpdate=true;};img.src="'+cleanLogo+'";';
        }
        
        fogCode='';
        if(S.vfx==='storm')      fogCode='scene.fog=new THREE.FogExp2(0x222222,0.02);';
        else if(S.vfx==='water') fogCode='scene.fog=new THREE.Fog(0x001133,5,20);';
        
        var vfxInitCode = '';
        var vfxLoopCode = '';
        if (S.vfx === 'cosmos' || S.vfx === 'snow' || S.vfx === 'water') {
            var color = S.vfx === 'water' ? '0xaaddff' : '0xffffff';
            var size = S.vfx === 'snow' ? '0.15' : (S.vfx === 'cosmos' ? '0.05' : '0.2');
            vfxInitCode = 'var vGeo=new THREE.BufferGeometry();var vPos=new Float32Array(1500);for(var i=0;i<1500;i++)vPos[i]=(Math.random()-0.5)*30;vGeo.setAttribute("position",new THREE.BufferAttribute(vPos,3));var vMat=new THREE.PointsMaterial({size:'+size+',color:'+color+',transparent:true,opacity:0.8});var vfxPoints=new THREE.Points(vGeo,vMat);scene.add(vfxPoints);';
            
            if (S.vfx === 'cosmos') {
                vfxLoopCode = 'if(typeof vfxPoints!=="undefined"){vfxPoints.rotation.y=t*0.05;vfxPoints.rotation.z=t*0.02;}';
            } else if (S.vfx === 'snow') {
                vfxLoopCode = 'if(typeof vfxPoints!=="undefined"){var p=vfxPoints.geometry.attributes.position.array;for(var i=1;i<p.length;i+=3){p[i]-=0.05;p[i-1]+=Math.sin(t+i)*0.01;if(p[i]<-15)p[i]=15;}vfxPoints.geometry.attributes.position.needsUpdate=true;}';
            } else if (S.vfx === 'water') {
                vfxLoopCode = 'if(typeof vfxPoints!=="undefined"){var p=vfxPoints.geometry.attributes.position.array;for(var i=1;i<p.length;i+=3){p[i]+=Math.sin(t+i)*0.005;p[i-1]+=Math.cos(t+i)*0.005;}vfxPoints.geometry.attributes.position.needsUpdate=true;}';
            }
        } else if (S.vfx === 'rain' || S.vfx === 'storm') {
            vfxInitCode = 'var vGeo=new THREE.BufferGeometry();var vPos=new Float32Array(3000);for(var i=0;i<500;i++){var x=(Math.random()-0.5)*30;var y=(Math.random()-0.5)*30;var z=(Math.random()-0.5)*30;vPos[i*6]=x;vPos[i*6+1]=y;vPos[i*6+2]=z;vPos[i*6+3]=x;vPos[i*6+4]=y-1;vPos[i*6+5]=z;}vGeo.setAttribute("position",new THREE.BufferAttribute(vPos,3));var vMat=new THREE.LineBasicMaterial({color:0x88bbff,transparent:true,opacity:0.6});var vfxLines=new THREE.LineSegments(vGeo,vMat);scene.add(vfxLines);';
            
            if (S.vfx === 'rain') {
                vfxLoopCode = 'if(typeof vfxLines!=="undefined"){var pos=vfxLines.geometry.attributes.position.array;for(var i=1;i<pos.length;i+=6){pos[i]-=0.3;pos[i+3]-=0.3;if(pos[i]<-15){var x=(Math.random()-0.5)*30;var z=(Math.random()-0.5)*30;pos[i-1]=x;pos[i]=15;pos[i+1]=z;pos[i+2]=x;pos[i+3]=14;pos[i+4]=z;}}vfxLines.geometry.attributes.position.needsUpdate=true;}';
            } else if (S.vfx === 'storm') {
                vfxLoopCode = 'if(typeof vfxLines!=="undefined"){var pos=vfxLines.geometry.attributes.position.array;for(var i=1;i<pos.length;i+=6){pos[i]-=0.5;pos[i+3]-=0.5;pos[i-1]-=0.1;pos[i+2]-=0.1;if(pos[i]<-15){var x=(Math.random()-0.5)*30+5;var z=(Math.random()-0.5)*30;pos[i-1]=x;pos[i]=15;pos[i+1]=z;pos[i+2]=x-0.5;pos[i+3]=14;pos[i+4]=z;}}vfxLines.geometry.attributes.position.needsUpdate=true;}';
            }
        }

        var innerCode = '';
        var innerLoopCode = '';
        if (S.innerFx === 'bubbles') {
            innerCode = 'var bGeo=new THREE.BufferGeometry();var bPos=new Float32Array(1800);for(var i=0;i<1800;i++)bPos[i]=(Math.random()-0.5)*2;bGeo.setAttribute("position",new THREE.BufferAttribute(bPos,3));var innerP=new THREE.Points(bGeo,new THREE.PointsMaterial({color:0xffffff,size:0.05,transparent:true,opacity:0.6}));mesh.add(innerP);';
            innerLoopCode = 'if(typeof innerP!=="undefined"){innerP.rotation.y+=0.008;innerP.rotation.x+=0.003;var pos=innerP.geometry.attributes.position.array;for(var i=1;i<pos.length;i+=3){pos[i]+=0.008;if(pos[i]>1.5)pos[i]=-1.5;}innerP.geometry.attributes.position.needsUpdate=true;}';
        }

        var postCSS = '';
        var crtDiv = '';
        if (S.postFx === 'bloom') postCSS = 'canvas { filter: saturate(1.3) contrast(1.2) brightness(1.1) drop-shadow(0 0 10px rgba(255,255,255,0.2)); }';
        else if (S.postFx === 'glitch') postCSS = '@keyframes glitchFx { 0%, 90% { transform: translate(0); filter: hue-rotate(0deg); } 92% { transform: translate(-5px, 5px); filter: hue-rotate(90deg) contrast(1.5); } 94% { transform: translate(5px, -5px); filter: hue-rotate(-90deg) contrast(1.5); } 96% { transform: translate(-5px, -5px); filter: hue-rotate(90deg) contrast(1.5); } 98% { transform: translate(5px, 5px); filter: hue-rotate(-90deg) contrast(1.5); } 100% { transform: translate(0); filter: hue-rotate(0deg); } } canvas { animation: glitchFx 2s linear infinite; }';
        else if (S.postFx === 'crt') crtDiv = '<div style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:50;background:linear-gradient(rgba(18,16,16,0) 50%,rgba(0,0,0,0.25) 50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06));background-size:100% 2px,3px 100%;box-shadow:inset 0 0 100px rgba(0,0,0,0.9);"></div>';
        
        var sc=parseFloat(S.modelScale)||1;
        var mx=parseFloat(S.modelX)||0, my=parseFloat(S.modelY)||0;
        var tx=parseFloat(S.textX)||0,  ty=parseFloat(S.textY)||0;
        var ts=parseFloat(S.textSize)||1;
        
        // Build the inline JS that will run in the exported page
        var inlineJS = [
            'var scene=new THREE.Scene();',
            'scene.background=new THREE.Color("'+S.bgColor+'");',
            fogCode,
            'var W=window.innerWidth||1280,H=window.innerHeight||720;',
            'var cam=new THREE.PerspectiveCamera(45,W/H,0.1,200);cam.position.set(0,0,15);',
            'var ren=new THREE.WebGLRenderer({antialias:true,alpha:false});',
            'ren.setPixelRatio(window.devicePixelRatio||1);ren.setSize(W,H);',
            'ren.shadowMap.enabled=true;document.body.appendChild(ren.domElement);',
            'window.addEventListener("resize",function(){W=window.innerWidth;H=window.innerHeight;cam.aspect=W/H;cam.updateProjectionMatrix();ren.setSize(W,H);});',
            lgtCode,
            'var geo='+geoCode+';',
            'var mat=new '+matClass+'('+matCode+');',
            'var mesh=new THREE.Mesh(geo,mat);',
            'mesh.scale.set('+sc+','+sc+','+sc+');mesh.position.set('+mx+','+my+',0);scene.add(mesh);',
            innerCode,
            vfxInitCode,
            'var mouseX=0,mouseY=0;',
            'document.addEventListener("mousemove",function(e){mouseX=(e.clientX-W/2)*0.005;mouseY=(e.clientY-H/2)*0.005;});',
            logoCode,
            'var t=0,mx0='+mx+',my0='+my+',sc='+sc+';',
            'function loop(){requestAnimationFrame(loop);t+=0.016;var mx=mx0,my=my0;',
            motCode,
            'if(typeof l1!=="undefined"){l1.position.x=l1bx+mouseX*10;l1.position.y=l1by-mouseY*10;}',
            'if(typeof l2!=="undefined"){l2.position.x=l2bx-mouseX*5;l2.position.y=l2by+mouseY*5;}',
            innerLoopCode,
            vfxLoopCode,
            'document.getElementById("adtxt").style.transform="translate("+('+tx+'-mouseX*20)+"px,"+('+ty+'-mouseY*20)+"px)";',
            'ren.render(scene,cam);}loop();'
        ].filter(Boolean).join('\n');
        
        // CSS styles
        var css=[
            '*{margin:0;padding:0;box-sizing:border-box;}',
            'body{background:'+S.bgColor+';overflow:hidden;font-family:Inter,system-ui,sans-serif;}',
            'canvas{position:fixed!important;top:0!important;left:0!important;z-index:1;}',
            postCSS,
            '#adtxt{position:fixed;top:10%;width:100%;text-align:center;z-index:100;pointer-events:none;transform:translate('+tx+'px,'+ty+'px);}',
            'h1{font-size:'+(5*ts)+'vw;font-weight:900;color:'+S.headCol+';text-transform:uppercase;text-shadow:0 5px 20px rgba(0,0,0,0.6);letter-spacing:0.05em;margin-bottom:0.3em;}',
            'p{font-size:'+(2*ts)+'vw;color:'+S.subCol+';font-weight:300;letter-spacing:0.1em;}'
        ].join('');
        
        // Build HTML using string parts — no </script> inside strings
        var p1 = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+S.headline+'</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;900&display=swap" rel="stylesheet"><style>'+css+'</style></head><body>';
        var p2 = crtDiv + '<div id="adtxt"><h1>'+S.headline+'</h1><p>'+S.subhead+'</p></div>';
        var p3 = '<scr'+'ipt src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><'+'/script>';
        var p4 = '<scr'+'ipt>try{'+inlineJS+'}catch(e){document.body.innerHTML+=\'<div style="position:fixed;top:0;left:0;z-index:9999;background:red;color:#fff;padding:20px;font-size:16px;">ERROR: \'+e.message+\'</div>\'}<'+ '/script>';
        var p5 = '</body></html>';
        
        var html = p1 + p2 + p3 + p4 + p5;
        
        var blob = new Blob([html], { type: 'text/html' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url; a.download = 'brand-ad-v2.html'; a.click();
        setTimeout(function(){ URL.revokeObjectURL(url); }, 2000);
        setSt(fr ? '✓ HTML généré!' : '✓ HTML Generated!', '#4ade80');
    }

})();
