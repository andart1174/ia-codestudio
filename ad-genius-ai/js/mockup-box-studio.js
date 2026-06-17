(function() {
    'use strict';
    
    var _prevRenderTab = window.renderTab;
    window.renderTab = function(tab) {
        if (tab === 'mockup-box') {
            window.activeTab = tab;
            document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
            var btn = document.getElementById('tab-' + tab);
            if (btn) btn.classList.add('active');
            
            document.querySelectorAll('.center-panel, .right-panel, .workspace').forEach(el => el.style.display = 'none');
            var ws = document.getElementById(tab + '-workspace');
            if (ws) ws.style.display = 'flex';
            
            var c = document.getElementById('mbs-center');
            var r = document.getElementById('mbs-right');
            if(c) c.style.display = 'flex';
            if(r) r.style.display = 'block';
            
            if(!window.mbsInitialized) {
                // Load Three.js if not present
                if(!window.THREE) {
                    var script = document.createElement('script');
                    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
                    script.onload = function() {
                        buildUI();
                        window.mbsInitialized = true;
                    };
                    document.head.appendChild(script);
                } else {
                    buildUI();
                    window.mbsInitialized = true;
                }
            } else {
                if(window.mbsRenderer) window.mbsRenderer.setSize(document.getElementById('mbs-center').clientWidth, document.getElementById('mbs-center').clientHeight);
            }
            return;
        }
        if (_prevRenderTab) _prevRenderTab(tab);
    };

    var state = {
        shape: 'box', // box, cylinder, sphere, pyramid, diamond, donut
        w: 3,
        h: 4,
        d: 1,
        color: '#ffffff',
        material: 'standard', // standard, chrome, glass, hologram
        bg: 'cosmos', // cosmos, ocean, storm, snow, rain, none
        anim: 'none', // none, levitate, pulse
        textures: {
            front: null,
            back: null,
            left: null,
            right: null,
            top: null,
            bottom: null
        }
    };

    var scene, camera, renderer, mesh, materials = [];
    var isDragging = false, prevMouseX, prevMouseY;
    var targetRotX = 0, targetRotY = 0;
    var currentAnimId;

    function buildUI() {
        var c = document.getElementById('mbs-center');
        var r = document.getElementById('mbs-right');
        if(!c || !r) return;

        c.innerHTML = `
            <div id="mbs-webgl-container" style="width:100%; height:100%; cursor:grab; position:relative; overflow:hidden;">
                <!-- Animated Background Layer -->
                <div id="mbs-bg-layer" style="position:absolute; inset:0; z-index:0; pointer-events:none;"></div>
            </div>
        `;

        r.innerHTML = `
            <div style="color:white;font-family:sans-serif;padding-bottom:50px;">
                <h2 style="margin:0 0 5px;color:#00ff96;font-size:18px;">✨ 3D Pro Studio</h2>
                <p style="margin:0 0 15px;font-size:11px;color:#94a3b8;">WebGL-powered objects & environments</p>

                <div style="background:#1e293b;padding:10px;border-radius:6px;margin-bottom:15px;">
                    <h3 style="margin:0 0 10px;font-size:13px;color:#fef08a;">1. 3D Shape & Material</h3>
                    <div style="display:flex;gap:10px;margin-bottom:10px;">
                        <select id="mbs-shape" style="flex:1;background:#0f172a;color:#fff;border:1px solid #334155;padding:6px;border-radius:4px;">
                            <option value="box">📦 Box / Cube</option>
                            <option value="cylinder">🥫 Cylinder</option>
                            <option value="sphere">🌍 Sphere</option>
                            <option value="pyramid">🔺 Pyramid</option>
                            <option value="diamond">💎 Diamond / Gem</option>
                            <option value="donut">🍩 Torus / Donut</option>
                        </select>
                        <select id="mbs-material" style="flex:1;background:#0f172a;color:#fff;border:1px solid #334155;padding:6px;border-radius:4px;">
                            <option value="standard">🎨 Standard Matte</option>
                            <option value="chrome">🛸 Liquid Chrome</option>
                            <option value="glass">🪞 Crystal Glass</option>
                            <option value="hologram">🌐 Cyber Hologram</option>
                        </select>
                    </div>

                    <div style="display:flex;gap:5px;margin-bottom:10px;">
                        <div style="flex:1;">
                            <label style="font-size:10px;color:#94a3b8;">Width (X)</label>
                            <input type="range" id="mbs-w" min="1" max="10" step="0.1" value="3" style="width:100%;">
                        </div>
                        <div style="flex:1;">
                            <label style="font-size:10px;color:#94a3b8;">Height (Y)</label>
                            <input type="range" id="mbs-h" min="1" max="10" step="0.1" value="4" style="width:100%;">
                        </div>
                        <div style="flex:1;" id="mbs-d-wrap">
                            <label style="font-size:10px;color:#94a3b8;">Depth (Z)</label>
                            <input type="range" id="mbs-d" min="1" max="10" step="0.1" value="1" style="width:100%;">
                        </div>
                    </div>
                </div>

                <div style="background:#1e293b;padding:10px;border-radius:6px;margin-bottom:15px;">
                    <h3 style="margin:0 0 10px;font-size:13px;color:#fef08a;">2. Textures (6 Faces)</h3>
                    <p style="font-size:10px;color:#94a3b8;margin:0 0 10px;">Upload up to 6 images to map onto the 3D faces.</p>
                    
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                        <div>
                            <label style="font-size:10px;color:#94a3b8;">1. Front</label>
                            <input type="file" id="mbs-tex-front" accept="image/*" style="width:100%;font-size:9px;color:#fff;">
                        </div>
                        <div>
                            <label style="font-size:10px;color:#94a3b8;">2. Back</label>
                            <input type="file" id="mbs-tex-back" accept="image/*" style="width:100%;font-size:9px;color:#fff;">
                        </div>
                        <div>
                            <label style="font-size:10px;color:#94a3b8;">3. Top</label>
                            <input type="file" id="mbs-tex-top" accept="image/*" style="width:100%;font-size:9px;color:#fff;">
                        </div>
                        <div>
                            <label style="font-size:10px;color:#94a3b8;">4. Bottom</label>
                            <input type="file" id="mbs-tex-bottom" accept="image/*" style="width:100%;font-size:9px;color:#fff;">
                        </div>
                        <div>
                            <label style="font-size:10px;color:#94a3b8;">5. Left</label>
                            <input type="file" id="mbs-tex-left" accept="image/*" style="width:100%;font-size:9px;color:#fff;">
                        </div>
                        <div>
                            <label style="font-size:10px;color:#94a3b8;">6. Right</label>
                            <input type="file" id="mbs-tex-right" accept="image/*" style="width:100%;font-size:9px;color:#fff;">
                        </div>
                    </div>
                    <button id="mbs-clear-tex" style="width:100%;background:none;border:1px solid #ef4444;color:#ef4444;padding:4px;border-radius:4px;font-size:10px;margin-top:10px;cursor:pointer;">Clear All Textures</button>
                </div>

                <div style="background:#1e293b;padding:10px;border-radius:6px;margin-bottom:15px;">
                    <h3 style="margin:0 0 10px;font-size:13px;color:#fef08a;">3. Magic Environment & FX</h3>
                    <div style="display:flex;gap:10px;">
                        <select id="mbs-bg" style="flex:1;background:#0f172a;color:#fff;border:1px solid #334155;padding:6px;border-radius:4px;">
                            <option value="none">None (Transparent)</option>
                            <option value="cosmos">🌌 Cosmos</option>
                            <option value="ocean">🌊 Deep Ocean</option>
                            <option value="storm">⚡ Storm</option>
                            <option value="snow">❄️ Snow</option>
                            <option value="rain">🌧️ Rain</option>
                        </select>
                        <select id="mbs-anim" style="flex:1;background:#0f172a;color:#fff;border:1px solid #334155;padding:6px;border-radius:4px;">
                            <option value="none">🛑 No Animation</option>
                            <option value="levitate">🛸 Levitation</option>
                            <option value="pulse">💗 Heartbeat Pulse</option>
                        </select>
                    </div>
                </div>

                <div style="display:flex;gap:10px;margin-top:20px;">
                    <button id="mbs-btn-png" style="flex:1;background:linear-gradient(135deg,#0ea5e9,#2563eb);color:#fff;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;box-shadow:0 4px 15px rgba(14,165,233,0.3);">📷 PNG</button>
                    <button id="mbs-btn-html" style="flex:2;background:linear-gradient(135deg,#00ff96,#00b368);color:#000;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;box-shadow:0 4px 15px rgba(0,255,150,0.3);">🌐 Export Magic HTML</button>
                </div>
            </div>
        `;

        initWebGL();
        setupListeners();
        updateBackground();
    }

    function initWebGL() {
        var container = document.getElementById('mbs-webgl-container');
        
        scene = new THREE.Scene();
        
        camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
        camera.position.z = 12;

        // alpha: true allows transparent PNG export
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.zIndex = '10';
        container.appendChild(renderer.domElement);
        window.mbsRenderer = renderer;

        // Lights
        var ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        var dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
        dirLight.position.set(5, 10, 7);
        scene.add(dirLight);
        var fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
        fillLight.position.set(-5, 0, -5);
        scene.add(fillLight);

        buildMesh();

        function animate() {
            currentAnimId = requestAnimationFrame(animate);
            if(mesh) {
                // Smooth rotation interpolation
                mesh.rotation.y += (targetRotY - mesh.rotation.y) * 0.1;
                mesh.rotation.x += (targetRotX - mesh.rotation.x) * 0.1;
                
                if(state.anim === 'levitate') {
                    mesh.position.y = Math.sin(Date.now() * 0.002) * 0.5;
                    mesh.scale.set(1,1,1);
                } else if(state.anim === 'pulse') {
                    mesh.position.y = 0;
                    var s = 1 + Math.sin(Date.now() * 0.005) * 0.1;
                    mesh.scale.set(s,s,s);
                } else {
                    mesh.position.y = 0;
                    mesh.scale.set(1,1,1);
                }
            }
            renderer.render(scene, camera);
        }
        animate();

        // Mouse Dragging for WebGL
        var isDown = false;
        container.addEventListener('mousedown', function(e) {
            isDown = true;
            prevMouseX = e.clientX;
            prevMouseY = e.clientY;
            container.style.cursor = 'grabbing';
        });
        window.addEventListener('mousemove', function(e) {
            if(!isDown) return;
            var dx = e.clientX - prevMouseX;
            var dy = e.clientY - prevMouseY;
            targetRotY += dx * 0.01;
            targetRotX += dy * 0.01;
            prevMouseX = e.clientX;
            prevMouseY = e.clientY;
        });
        window.addEventListener('mouseup', function() {
            isDown = false;
            container.style.cursor = 'grab';
        });
        
        window.addEventListener('resize', () => {
            if(window.activeTab !== 'mockup-box') return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    }

    function buildMesh() {
        if(mesh) scene.remove(mesh);

        var geometry;
        if(state.shape === 'box') {
            geometry = new THREE.BoxGeometry(state.w, state.h, state.d);
            document.getElementById('mbs-d-wrap').style.opacity = '1';
        } else if(state.shape === 'cylinder') {
            // Radius, height, radialSegments
            geometry = new THREE.CylinderGeometry(state.w/2, state.w/2, state.h, 32);
            document.getElementById('mbs-d-wrap').style.opacity = '0.3';
        } else if(state.shape === 'sphere') {
            geometry = new THREE.SphereGeometry(state.w/2, 32, 32);
            document.getElementById('mbs-d-wrap').style.opacity = '0.3';
            document.getElementById('mbs-h').parentElement.style.opacity = '0.3';
        } else if(state.shape === 'pyramid') {
            // Radius, height, radialSegments(4)
            geometry = new THREE.CylinderGeometry(0, state.w/2, state.h, 4);
            document.getElementById('mbs-d-wrap').style.opacity = '0.3';
        } else if(state.shape === 'diamond') {
            geometry = new THREE.DodecahedronGeometry(state.w/2);
            document.getElementById('mbs-d-wrap').style.opacity = '0.3';
            document.getElementById('mbs-h').parentElement.style.opacity = '0.3';
        } else if(state.shape === 'donut') {
            geometry = new THREE.TorusGeometry(state.w/2, state.h/4, 16, 50);
            document.getElementById('mbs-d-wrap').style.opacity = '0.3';
        }

        materials = [];
        var loader = new THREE.TextureLoader();

        // Helper to create material
        function getMat(texDataUrl) {
            var tex = texDataUrl ? loader.load(texDataUrl) : null;
            if(tex) tex.colorSpace = THREE.SRGBColorSpace; // or encoding = sRGBEncoding in older ThreeJS
            
            var c = tex ? 0xffffff : state.color;
            if(state.material === 'glass') {
                return new THREE.MeshPhysicalMaterial({ map: tex, transmission: 0.9, opacity: 1, metalness: 0, roughness: 0, ior: 1.5, thickness: 0.5, color: c });
            } else if(state.material === 'chrome') {
                return new THREE.MeshStandardMaterial({ map: tex, metalness: 1, roughness: 0.1, color: c });
            } else if(state.material === 'hologram') {
                return new THREE.MeshStandardMaterial({ wireframe: true, color: 0x00ffff, emissive: 0x00ffff, emissiveIntensity: 0.5 });
            } else {
                return new THREE.MeshStandardMaterial({ map: tex, roughness: 0.3, metalness: 0.1, color: c });
            }
        }

        if(state.shape === 'box') {
            // Box materials order: right, left, top, bottom, front, back
            materials.push(getMat(state.textures.right));
            materials.push(getMat(state.textures.left));
            materials.push(getMat(state.textures.top));
            materials.push(getMat(state.textures.bottom));
            materials.push(getMat(state.textures.front));
            materials.push(getMat(state.textures.back));
        } else {
            // Cylinder/Sphere/Pyramid usually take an array for groups or single material
            // If cylinder: [side, top, bottom]
            if(state.shape === 'cylinder' || state.shape === 'pyramid') {
                materials.push(getMat(state.textures.front)); // Side
                materials.push(getMat(state.textures.top)); // Top
                materials.push(getMat(state.textures.bottom)); // Bottom
            } else {
                materials = getMat(state.textures.front); // Sphere uses one wrap
            }
        }

        mesh = new THREE.Mesh(geometry, materials);
        // Retain rotation
        mesh.rotation.x = targetRotX;
        mesh.rotation.y = targetRotY;
        scene.add(mesh);
    }

    function setupListeners() {
        document.getElementById('mbs-shape').addEventListener('change', e => { state.shape = e.target.value; buildMesh(); });
        document.getElementById('mbs-material').addEventListener('change', e => { state.material = e.target.value; buildMesh(); });
        document.getElementById('mbs-anim').addEventListener('change', e => { state.anim = e.target.value; });
        document.getElementById('mbs-w').addEventListener('input', e => { state.w = parseFloat(e.target.value); buildMesh(); });
        document.getElementById('mbs-h').addEventListener('input', e => { state.h = parseFloat(e.target.value); buildMesh(); });
        document.getElementById('mbs-d').addEventListener('input', e => { state.d = parseFloat(e.target.value); buildMesh(); });

        var sides = ['front', 'back', 'top', 'bottom', 'left', 'right'];
        sides.forEach(s => {
            document.getElementById('mbs-tex-' + s).addEventListener('change', e => {
                var file = e.target.files[0];
                if(file) {
                    var r = new FileReader();
                    r.onload = ev => {
                        state.textures[s] = ev.target.result;
                        buildMesh();
                    };
                    r.readAsDataURL(file);
                }
            });
        });

        document.getElementById('mbs-clear-tex').addEventListener('click', () => {
            sides.forEach(s => state.textures[s] = null);
            document.querySelectorAll('input[type="file"][id^="mbs-tex"]').forEach(el => el.value = '');
            buildMesh();
        });

        document.getElementById('mbs-bg').addEventListener('change', e => { state.bg = e.target.value; updateBackground(); });

        document.getElementById('mbs-btn-png').addEventListener('click', exportPNG);
        document.getElementById('mbs-btn-html').addEventListener('click', exportHTML);
    }

    function updateBackground() {
        var bgLayer = document.getElementById('mbs-bg-layer');
        bgLayer.innerHTML = '';
        bgLayer.style.background = 'transparent';

        if(state.bg === 'cosmos') {
            bgLayer.style.background = '#000010';
            bgLayer.innerHTML = '<div style="position:absolute; inset:0; background:radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 1px, transparent 1px); background-size:50px 50px;"></div>';
            // Pure CSS stars would be complex here, so we simulate a basic one
        } else if(state.bg === 'ocean') {
            bgLayer.style.background = 'linear-gradient(to bottom, #0284c7, #082f49)';
        } else if(state.bg === 'storm') {
            bgLayer.style.background = '#1e293b';
            // Add a lightning flash animation via style
            bgLayer.innerHTML = `<style>
                @keyframes flash { 0%, 95%, 98% { opacity: 0; } 96%, 99% { opacity: 1; background: white; } }
                .lightning { position:absolute; inset:0; animation: flash 5s infinite; pointer-events:none; }
            </style><div class="lightning"></div>`;
        } else if(state.bg === 'snow') {
            bgLayer.style.background = '#0f172a';
            bgLayer.innerHTML = `<style>
                @keyframes fall { from { transform: translateY(-100px); } to { transform: translateY(100vh); } }
                .snow { position:absolute; top:-100px; color:#fff; font-size:20px; animation: fall linear infinite; opacity:0.6; }
            </style>
            ${Array(20).fill(0).map((_,i) => `<div class="snow" style="left:${Math.random()*100}%; animation-duration:${3+Math.random()*4}s; animation-delay:${Math.random()*2}s;">❄</div>`).join('')}
            `;
        } else if(state.bg === 'rain') {
            bgLayer.style.background = '#1e293b';
            bgLayer.innerHTML = `<style>
                @keyframes rainFall { from { transform: translateY(-100px) rotate(15deg); } to { transform: translateY(100vh) rotate(15deg); } }
                .rain { position:absolute; top:-100px; width:2px; height:20px; background:rgba(255,255,255,0.4); animation: rainFall linear infinite; }
            </style>
            ${Array(40).fill(0).map((_,i) => `<div class="rain" style="left:${Math.random()*100}%; animation-duration:${0.5+Math.random()}s; animation-delay:${Math.random()}s;"></div>`).join('')}
            `;
        }
    }

    function exportPNG() {
        if(!renderer) return;
        // Re-render once to ensure buffer is full
        renderer.render(scene, camera);
        var dataUrl = renderer.domElement.toDataURL('image/png', 1.0);
        var a = document.createElement('a');
        a.href = dataUrl;
        a.download = '3D_Model.png';
        a.click();
    }

    function exportHTML() {
        var bgHTML = document.getElementById('mbs-bg-layer').outerHTML;
        // Re-render
        renderer.render(scene, camera);
        
        // In standalone HTML, we could export the ThreeJS code, OR for maximum portability,
        // we can export a self-contained ThreeJS script!
        // To make it standalone, we will fetch the current ThreeJS logic and embed it.
        
        // Wait, writing a full WebGL engine into the HTML is huge, but we can just hotlink Three.js!
        
        var htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3D Pro Export</title>
    <style>
        body { margin: 0; overflow: hidden; background: #000; }
        #canvas-container { position: absolute; inset: 0; z-index: 10; cursor: grab; }
        #canvas-container:active { cursor: grabbing; }
        ${document.getElementById('mbs-bg-layer').innerHTML.includes('@keyframes') ? document.getElementById('mbs-bg-layer').querySelector('style').innerHTML : ''}
    </style>
</head>
<body>
    ${bgHTML}
    <div id="canvas-container"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script>
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 12;

        var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        document.getElementById('canvas-container').appendChild(renderer.domElement);

        var ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        var dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
        dirLight.position.set(5, 10, 7);
        scene.add(dirLight);

        // Geometries
        var shape = "${state.shape}";
        var w = ${state.w};
        var h = ${state.h};
        var d = ${state.d};
        
        var geometry;
        if(shape === 'box') geometry = new THREE.BoxGeometry(w, h, d);
        else if(shape === 'cylinder') geometry = new THREE.CylinderGeometry(w/2, w/2, h, 32);
        else if(shape === 'sphere') geometry = new THREE.SphereGeometry(w/2, 32, 32);
        else if(shape === 'pyramid') geometry = new THREE.CylinderGeometry(0, w/2, h, 4);
        else if(shape === 'diamond') geometry = new THREE.DodecahedronGeometry(w/2);
        else if(shape === 'donut') geometry = new THREE.TorusGeometry(w/2, h/4, 16, 50);

        // Textures
        var loader = new THREE.TextureLoader();
        var matType = "${state.material}";
        var colorHex = "${state.color}";
        function getMat(base64) {
            var tex = base64 ? loader.load(base64) : null;
            if(tex) tex.colorSpace = THREE.SRGBColorSpace;
            var c = tex ? 0xffffff : colorHex;
            
            if(matType === 'glass') return new THREE.MeshPhysicalMaterial({ map: tex, transmission: 0.9, opacity: 1, metalness: 0, roughness: 0, ior: 1.5, thickness: 0.5, color: c });
            else if(matType === 'chrome') return new THREE.MeshStandardMaterial({ map: tex, metalness: 1, roughness: 0.1, color: c });
            else if(matType === 'hologram') return new THREE.MeshStandardMaterial({ wireframe: true, color: 0x00ffff, emissive: 0x00ffff, emissiveIntensity: 0.5 });
            else return new THREE.MeshStandardMaterial({ map: tex, roughness: 0.3, metalness: 0.1, color: c });
        }

        var textures = {
            front: ${state.textures.front ? '`' + state.textures.front + '`' : 'null'},
            back: ${state.textures.back ? '`' + state.textures.back + '`' : 'null'},
            top: ${state.textures.top ? '`' + state.textures.top + '`' : 'null'},
            bottom: ${state.textures.bottom ? '`' + state.textures.bottom + '`' : 'null'},
            left: ${state.textures.left ? '`' + state.textures.left + '`' : 'null'},
            right: ${state.textures.right ? '`' + state.textures.right + '`' : 'null'}
        };

        var materials = [];
        if(shape === 'box') {
            materials.push(getMat(textures.right));
            materials.push(getMat(textures.left));
            materials.push(getMat(textures.top));
            materials.push(getMat(textures.bottom));
            materials.push(getMat(textures.front));
            materials.push(getMat(textures.back));
        } else if (shape === 'cylinder' || shape === 'pyramid') {
            materials.push(getMat(textures.front));
            materials.push(getMat(textures.top));
            materials.push(getMat(textures.bottom));
        } else {
            materials = getMat(textures.front);
        }

        var mesh = new THREE.Mesh(geometry, materials);
        scene.add(mesh);

        // Animation / Drag
        var targetRotX = ${targetRotX};
        var targetRotY = ${targetRotY};
        mesh.rotation.x = targetRotX;
        mesh.rotation.y = targetRotY;
        var animType = "${state.anim}";

        function animate() {
            requestAnimationFrame(animate);
            mesh.rotation.y += (targetRotY - mesh.rotation.y) * 0.1;
            mesh.rotation.x += (targetRotX - mesh.rotation.x) * 0.1;
            
            if(animType === 'levitate') {
                mesh.position.y = Math.sin(Date.now() * 0.002) * 0.5;
                mesh.scale.set(1,1,1);
            } else if(animType === 'pulse') {
                mesh.position.y = 0;
                var s = 1 + Math.sin(Date.now() * 0.005) * 0.1;
                mesh.scale.set(s,s,s);
            }
            
            // Auto rotation if no drag
            if(!isDown) {
                targetRotY += 0.005;
                targetRotX += 0.002;
            }

            renderer.render(scene, camera);
        }
        animate();

        var isDown = false, prevX, prevY;
        document.addEventListener('mousedown', e => { isDown = true; prevX = e.clientX; prevY = e.clientY; });
        document.addEventListener('mousemove', e => {
            if(!isDown) return;
            targetRotY += (e.clientX - prevX) * 0.01;
            targetRotX += (e.clientY - prevY) * 0.01;
            prevX = e.clientX; prevY = e.clientY;
        });
        document.addEventListener('mouseup', () => isDown = false);
        
        // Touch support
        document.addEventListener('touchstart', e => { isDown = true; prevX = e.touches[0].clientX; prevY = e.touches[0].clientY; });
        document.addEventListener('touchmove', e => {
            if(!isDown) return;
            targetRotY += (e.touches[0].clientX - prevX) * 0.01;
            targetRotX += (e.touches[0].clientY - prevY) * 0.01;
            prevX = e.touches[0].clientX; prevY = e.touches[0].clientY;
        });
        document.addEventListener('touchend', () => isDown = false);

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    </script>
</body>
</html>`;

        var blob = new Blob([htmlContent], { type: 'text/html' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'Magic_3D_Environment.html';
        a.click();
    }
})();
