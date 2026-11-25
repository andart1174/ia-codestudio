// Video → 3D Hologram Generator v2.0 (All Shapes + All 6 Environments + Blob Preview + Close & i18n)
window.VideoTo3D = (() => {
    'use strict';
    let _container, _panel;
    let selectedVideo = null;
    let previewBlobUrl = null;
    let lastGeneratedCode = '';

    function isFR() { return (window.currentLang || 'en') === 'fr'; }

    function init(container, btn) {
        _container = container;
        buildUI();
        window.addEventListener('studio:langchange', () => {
            const wasOpen = _panel && _panel.style.display === 'flex';
            buildUI();
            if (wasOpen) _panel.style.display = 'flex';
        });
        if (btn) btn.addEventListener('click', togglePanel);
    }

    function togglePanel() {
        const visible = _panel.style.display === 'flex';
        document.querySelectorAll('[id$="-panel"]').forEach(p => p.style.display = 'none');
        _panel.style.display = visible ? 'none' : 'flex';
    }

    function buildUI() {
        const fr = isFR();
        if (!_panel) {
            _panel = document.createElement('div');
            _panel.id = 'v3d-panel';
            _panel.style.cssText = 'display:none;position:absolute;inset:0;background:#0d1225;z-index:45;padding:18px;flex-direction:column;font-family:Inter,sans-serif;color:#f1f5f9;overflow-y:auto;';
            _container.appendChild(_panel);
        }

        _panel.innerHTML = `
            <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:16px;border-bottom:1px solid #1e293b;padding-bottom:12px;">
                <div style="display:flex;align-items:center;gap:12px;">
                    <div style="width:38px;height:38px;background:linear-gradient(135deg,#f43f5e,#fb7185);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;">🎬</div>
                    <div>
                        <div style="font-size:15px;font-weight:700;">${fr ? 'Hologramme Vidéo 3D' : 'Video 3D Hologram'}</div>
                        <div style="font-size:10px;color:#64748b;">${fr ? 'Projeter vos vidéos sur 8 formes 3D + 6 environnements' : 'Project videos onto 8 3D shapes + 6 environments'}</div>
                    </div>
                </div>
                <button id="v3d-close" title="${fr ? 'Fermer' : 'Close'}" style="background:rgba(255,255,255,0.06);border:1px solid #334155;border-radius:6px;color:#94a3b8;padding:4px 9px;cursor:pointer;font-size:12px;">✕</button>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">
                <div style="grid-column: span 2; border:2px dashed rgba(244,63,94,0.35); border-radius:12px; padding:18px; text-align:center; cursor:pointer; background:rgba(244,63,94,0.03);" id="v3d-drop">
                    <span style="font-size:26px;display:block;margin-bottom:8px;">📤</span>
                    <span style="font-size:12px;color:#94a3b8;">${fr ? 'Déposez la vidéo (MP4/WebM) ou cliquez ici' : 'Drop video (MP4/WebM) or click here'}</span>
                    <input type="file" id="v3d-input" accept="video/*" style="display:none;">
                    <div id="v3d-filename" style="margin-top:8px;font-size:11px;color:#fb7185;font-weight:600;">${selectedVideo ? ('✅ ' + selectedVideo.name) : ''}</div>
                </div>

                <div>
                    <label style="font-size:10px;color:#94a3b8;font-weight:600;display:block;margin-bottom:5px;">${fr ? 'Forme 3D' : '3D Shape'}</label>
                    <select id="v3d-shape" style="width:100%;padding:8px;background:#1e293b;border:1px solid #334155;border-radius:8px;color:#fff;font-size:11px;">
                        <option value="plane">Plane</option>
                        <option value="curved">Curved Screen</option>
                        <option value="sphere">Sphere</option>
                        <option value="cube">Cube</option>
                        <option value="cylinder">Cylinder</option>
                        <option value="torus">Torus</option>
                        <option value="tunnel">Tunnel</option>
                        <option value="pyramid">Pyramid</option>
                    </select>
                </div>

                <div>
                    <label style="font-size:10px;color:#94a3b8;font-weight:600;display:block;margin-bottom:5px;">${fr ? 'Environnement' : 'Environment'}</label>
                    <select id="v3d-env" style="width:100%;padding:8px;background:#1e293b;border:1px solid #334155;border-radius:8px;color:#fff;font-size:11px;">
                        <option value="none">None</option>
                        <option value="cosmos">Cosmos</option>
                        <option value="cyberpunk">Cyberpunk Grid</option>
                        <option value="ocean">Underwater</option>
                        <option value="storm">Techno Storm</option>
                        <option value="snow">Cold Void</option>
                    </select>
                </div>

                <div style="grid-column: span 2; background:rgba(30,41,59,0.5); padding:12px; border-radius:10px;">
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
                        <span style="font-size:11px;font-weight:700;">Chroma Key (Green Screen)</span>
                        <input type="checkbox" id="v3d-chroma" style="accent-color:#f43f5e;">
                    </div>
                    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
                        <div>
                            <label style="font-size:9px;color:#94a3b8;">${fr ? 'Couleur' : 'Color'}</label>
                            <input type="color" id="v3d-chroma-color" value="#00ff00" style="width:100%;height:24px;border:none;background:none;cursor:pointer;">
                        </div>
                        <div>
                            <label style="font-size:9px;color:#94a3b8;">Simil.</label>
                            <input type="range" id="v3d-chroma-sim" min="0" max="1" step="0.01" value="0.15" style="width:100%;accent-color:#f43f5e;">
                        </div>
                        <div>
                            <label style="font-size:9px;color:#94a3b8;">Smooth</label>
                            <input type="range" id="v3d-chroma-smooth" min="0" max="0.5" step="0.01" value="0.08" style="width:100%;accent-color:#f43f5e;">
                        </div>
                    </div>
                </div>

                <div style="grid-column: span 2; display:flex; gap:15px;">
                    <label style="font-size:11px;display:flex;align-items:center;gap:8px;cursor:pointer;"><input type="checkbox" id="v3d-rotate" checked style="accent-color:#f43f5e;"> ${fr ? 'Rotation Auto' : 'Auto Rotate'}</label>
                </div>
            </div>

            <button id="v3d-generate" style="width:100%;padding:13px;background:linear-gradient(135deg,#f43f5e,#fb7185);border:none;border-radius:10px;color:#fff;font-size:12px;font-weight:700;cursor:pointer;box-shadow:0 4px 18px rgba(244,63,94,0.35);">🚀 ${fr ? "GÉNÉRER L'HOLOGRAMME" : 'GENERATE HOLOGRAM'}</button>
            <button id="v3d-btn-download" style="display:${lastGeneratedCode ? 'block' : 'none'};width:100%;margin-top:8px;padding:10px;background:rgba(244,63,94,0.12);border:1px solid rgba(244,63,94,0.35);border-radius:10px;color:#fb7185;font-size:11px;font-weight:600;cursor:pointer;">⬇️ ${fr ? 'Télécharger HTML' : 'Download HTML'}</button>
        `;

        bindEvents();
    }

    function bindEvents() {
        _panel.querySelector('#v3d-close').onclick = () => { _panel.style.display = 'none'; };
        const drop = _panel.querySelector('#v3d-drop');
        const input = _panel.querySelector('#v3d-input');

        drop.onclick = () => input.click();
        input.onchange = e => handleFile(e.target.files[0]);

        drop.addEventListener('dragover', e => { e.preventDefault(); drop.style.background = 'rgba(244,63,94,0.08)'; });
        drop.addEventListener('dragleave', () => { drop.style.background = 'rgba(244,63,94,0.03)'; });
        drop.addEventListener('drop', e => { e.preventDefault(); drop.style.background = 'rgba(244,63,94,0.03)'; handleFile(e.dataTransfer.files[0]); });

        _panel.querySelector('#v3d-generate').onclick = generateHologram;
        _panel.querySelector('#v3d-btn-download').onclick = downloadHologram;
    }

    function handleFile(file) {
        if (!file || !file.type.startsWith('video/')) return;
        selectedVideo = file;
        if (previewBlobUrl) { try { URL.revokeObjectURL(previewBlobUrl); } catch (e) {} }
        previewBlobUrl = URL.createObjectURL(file);
        const mb = (file.size / 1048576).toFixed(2);
        _panel.querySelector('#v3d-filename').textContent = `✅ ${file.name} (${mb} MB)`;
    }

    function downloadHologram() {
        if (typeof window.isUserPremium === 'function' && !window.isUserPremium()) {
            if (typeof window.showPaywallModal === 'function') window.showPaywallModal();
            return;
        }
        if (!lastGeneratedCode) return;
        const blob = new Blob([lastGeneratedCode], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'video-hologram-3d.html';
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    function buildHTML(videoSource, cfg, fr) {
        return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>3D Video Hologram</title>
<style>*{margin:0;padding:0;}body{background:#030712;overflow:hidden;font-family:Inter,sans-serif;}#overlay{position:fixed;inset:0;background:rgba(3,7,18,0.82);display:flex;align-items:center;justify-content:center;color:#fff;z-index:100;cursor:pointer;font-weight:700;letter-spacing:1px;backdrop-filter:blur(8px);}</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"><\/script>
</head><body>
<div id="overlay" onclick="startApp()">▶ ${fr ? 'CLIQUEZ POUR LANCER' : 'CLICK TO START'}</div>
<script>(function(){
let scene,camera,renderer,controls,video,texture,mesh,ringMat,envParticles=null,lightningLight=null;
function init(){
  scene=new THREE.Scene();scene.background=new THREE.Color(0x030712);
  camera=new THREE.PerspectiveCamera(65,innerWidth/innerHeight,0.1,3000);camera.position.set(0,30,320);
  renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});
  renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  document.body.appendChild(renderer.domElement);
  controls=new THREE.OrbitControls(camera,renderer.domElement);controls.enableDamping=true;
  video=document.createElement('video');video.src=${JSON.stringify(videoSource)};video.loop=true;video.playsInline=true;video.crossOrigin='anonymous';
  texture=new THREE.VideoTexture(video);
  let geo;const shp='${cfg.shape}';
  if(shp==='curved') geo=new THREE.CylinderGeometry(360,360,210,64,1,true,-Math.PI/4,Math.PI/2);
  else if(shp==='sphere') geo=new THREE.SphereGeometry(120,64,64);
  else if(shp==='cube') geo=new THREE.BoxGeometry(160,160,160);
  else if(shp==='cylinder') geo=new THREE.CylinderGeometry(85,85,200,48);
  else if(shp==='torus') geo=new THREE.TorusGeometry(105,34,24,100);
  else if(shp==='tunnel'){geo=new THREE.CylinderGeometry(180,180,900,36,1,true);geo.rotateX(Math.PI/2);}
  else if(shp==='pyramid') geo=new THREE.ConeGeometry(140,210,4);
  else geo=new THREE.PlaneGeometry(320,180);

  let mat;const uc=${cfg.chromaKey};
  if(uc){
    mat=new THREE.ShaderMaterial({
      transparent:true,side:THREE.DoubleSide,
      uniforms:{tex:{value:texture},keyColor:{value:new THREE.Color('${cfg.chromaColor}')},similarity:{value:${cfg.chromaSimilarity}},smoothness:{value:${cfg.chromaSmoothness}}},
      vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
      fragmentShader:'uniform sampler2D tex;uniform vec3 keyColor;uniform float similarity;uniform float smoothness;varying vec2 vUv;void main(){vec4 rgba=texture2D(tex,vUv);float d=distance(rgba.rgb,keyColor);float alpha=smoothstep(similarity,similarity+smoothness,d);gl_FragColor=vec4(rgba.rgb,alpha);}'
    });
  } else {
    mat=new THREE.MeshBasicMaterial({map:texture,side:THREE.DoubleSide});
  }
  mesh=new THREE.Mesh(geo,mat);scene.add(mesh);
  // Ambient reactive glow ring around hologram
  ringMat=new THREE.MeshBasicMaterial({color:0xf43f5e,transparent:true,opacity:0.45,side:THREE.DoubleSide});
  const ring=new THREE.Mesh(new THREE.RingGeometry(155,162,64),ringMat);ring.rotation.x=-Math.PI/2;ring.position.y=-110;scene.add(ring);

  scene.add(new THREE.AmbientLight(0xffffff,0.9));
  const env='${cfg.environment}';
  if(env!=='none'){
    const eg=new THREE.Group();scene.add(eg);
    const c=1800,pg=new THREE.BufferGeometry(),pp=new Float32Array(c*3);
    if(env==='cosmos'){
      for(let i=0;i<c*3;i++) pp[i]=(Math.random()-0.5)*2000;
      pg.setAttribute('position',new THREE.BufferAttribute(pp,3));
      envParticles=new THREE.Points(pg,new THREE.PointsMaterial({color:0xffffff,size:2.5}));eg.add(envParticles);
    } else if(env==='cyberpunk'){
      const g=new THREE.GridHelper(2000,60,0xec4899,0x312e81);g.position.y=-120;eg.add(g);
    } else if(env==='ocean'){
      scene.background=new THREE.Color(0x02182b);scene.fog=new THREE.FogExp2(0x02182b,0.0012);
      for(let i=0;i<c*3;i+=3){pp[i]=(Math.random()-0.5)*1400;pp[i+1]=(Math.random()-0.5)*900;pp[i+2]=(Math.random()-0.5)*1400;}
      pg.setAttribute('position',new THREE.BufferAttribute(pp,3));
      envParticles=new THREE.Points(pg,new THREE.PointsMaterial({color:0x38bdf8,size:4,transparent:true,opacity:0.65}));eg.add(envParticles);
    } else if(env==='storm'){
      scene.background=new THREE.Color(0x07051a);
      const g=new THREE.GridHelper(2000,45,0x38bdf8,0x1e1b4b);g.position.y=-120;eg.add(g);
      for(let i=0;i<c*3;i+=3){pp[i]=(Math.random()-0.5)*1600;pp[i+1]=(Math.random()-0.5)*1000;pp[i+2]=(Math.random()-0.5)*1600;}
      pg.setAttribute('position',new THREE.BufferAttribute(pp,3));
      envParticles=new THREE.Points(pg,new THREE.PointsMaterial({color:0x818cf8,size:3.2}));eg.add(envParticles);
      lightningLight=new THREE.AmbientLight(0x93c5fd,0.2);scene.add(lightningLight);
    } else if(env==='snow'){
      scene.background=new THREE.Color(0x0a1324);scene.fog=new THREE.FogExp2(0x0a1324,0.001);
      for(let i=0;i<c*3;i+=3){pp[i]=(Math.random()-0.5)*1600;pp[i+1]=(Math.random()-0.5)*1000;pp[i+2]=(Math.random()-0.5)*1600;}
      pg.setAttribute('position',new THREE.BufferAttribute(pp,3));
      envParticles=new THREE.Points(pg,new THREE.PointsMaterial({color:0xe2e8f0,size:4.2,transparent:true,opacity:0.8}));eg.add(envParticles);
    }
  }
  window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
  animate();
}
window.startApp=()=>{document.getElementById('overlay').style.display='none';video.play().catch(()=>{});};
function animate(){
  requestAnimationFrame(animate);controls.update();
  if(${cfg.autoRotate}) mesh.rotation.y+=0.005;
  if(envParticles){
    const env='${cfg.environment}';
    if(env==='ocean'||env==='snow'||env==='storm'){
      const arr=envParticles.geometry.attributes.position.array;
      const dir=env==='ocean'?1.2:(env==='snow'?-1.5:-8.0);
      for(let i=1;i<arr.length;i+=3){arr[i]+=dir;if(arr[i]>500)arr[i]=-500;if(arr[i]<-500)arr[i]=500;}
      envParticles.geometry.attributes.position.needsUpdate=true;
    } else { envParticles.rotation.y+=0.0007; }
  }
  if(lightningLight) lightningLight.intensity=Math.random()>0.985?3.0:0.2;
  renderer.render(scene,camera);
}
init();
}());<\/script></body></html>`;
    }

    async function generateHologram() {
        const fr = isFR();
        if (!selectedVideo) {
            if (window.toast) window.toast(fr ? '⚠️ Choisissez d’abord une vidéo' : '⚠️ Please select a video file first');
            return;
        }
        const btn = _panel.querySelector('#v3d-generate');
        btn.textContent = '⚡ ' + (fr ? 'TRAITEMENT...' : 'PROCESSING...');

        const currentConfig = {
            shape: _panel.querySelector('#v3d-shape').value,
            environment: _panel.querySelector('#v3d-env').value,
            chromaKey: _panel.querySelector('#v3d-chroma').checked,
            chromaColor: _panel.querySelector('#v3d-chroma-color').value,
            chromaSimilarity: parseFloat(_panel.querySelector('#v3d-chroma-sim').value) || 0.15,
            chromaSmoothness: parseFloat(_panel.querySelector('#v3d-chroma-smooth').value) || 0.08,
            autoRotate: _panel.querySelector('#v3d-rotate').checked
        };

        // Guard against browser textarea freeze for huge videos (>12 MB use Blob URL in live preview)
        const MAX_INLINE_BYTES = 12 * 1024 * 1024;
        const finish = (srcUrl, isBlob) => {
            const code = buildHTML(srcUrl, currentConfig, fr);
            lastGeneratedCode = code;
            const editor = document.getElementById('code-editor');
            if (editor) {
                if (window.pushUndo) window.pushUndo();
                editor.value = code;
                editor.dispatchEvent(new Event('input', { bubbles: true }));
                const dl = document.getElementById('v3d-btn-download');
                if (dl) dl.style.display = 'block';
                if (window.toggleMode) window.toggleMode('code');
                if (window.toast) {
                    window.toast(isBlob
                        ? (fr ? '✨ Aperçu Hologramme prêt (vidéo >12MB en mode Blob local)' : '✨ Hologram Preview ready (>12MB video uses fast local Blob)')
                        : (fr ? '✨ Hologramme 3D Généré !' : '✨ 3D Hologram Generated!'));
                }
            }
            btn.textContent = '🚀 ' + (fr ? "GÉNÉRER L'HOLOGRAMME" : 'GENERATE HOLOGRAM');
        };

        if (selectedVideo.size > MAX_INLINE_BYTES && previewBlobUrl) {
            finish(previewBlobUrl, true);
            return;
        }

        const reader = new FileReader();
        reader.onload = () => finish(reader.result, false);
        reader.onerror = () => {
            if (window.toast) window.toast(fr ? '❌ Erreur lecture vidéo' : '❌ Error reading video file');
            btn.textContent = '🚀 ' + (fr ? "GÉNÉRER L'HOLOGRAMME" : 'GENERATE HOLOGRAM');
        };
        reader.readAsDataURL(selectedVideo);
    }

    return { init, refreshLang: buildUI };
})();
