// Audio Visualizer → 3D Generator v2.0 (Mic + Real Audio File MP3/WAV + Live EN/FR + Clean Lifecycle)
window.AudioVisualizer = (() => {
  'use strict';
  let _container, _panel, _audioFile = null, _audioB64 = '', _audioName = '', _micStream = null;
  const cfg = { bars: 32, barStyle: 'box', colorScheme: 'spectrum' };

  function isEN() { return (window.currentLang || 'en') !== 'fr'; }

  function stopMic() {
    if (_micStream) {
      try { _micStream.getTracks().forEach(t => t.stop()); } catch (e) {}
      _micStream = null;
    }
  }

  function closePanel() {
    if (_panel) _panel.style.display = 'none';
    stopMic();
  }

  function buildUI() {
    const en = isEN();
    if (!_panel) {
      _panel = document.createElement('div');
      _panel.id = 'av3d-panel';
      _panel.style.cssText = 'display:none;position:absolute;inset:0;background:#0d1225;z-index:45;padding:16px;font-family:Inter,sans-serif;color:#f1f5f9;overflow-y:auto;';
      _container.appendChild(_panel);
    }
    _panel.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:15px;border-bottom:1px solid #1e293b;padding-bottom:10px;">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:36px;height:36px;background:linear-gradient(135deg,#10b981,#34d399);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;">🎵</div>
          <div>
            <div style="font-size:14px;font-weight:700;">${en ? 'Audio Visualizer 3D' : 'Visualiseur Audio 3D'}</div>
            <div style="font-size:10px;color:#64748b;">${en ? 'Reactive 3D spectrum from Mic or MP3/WAV' : 'Spectre 3D réactif depuis Micro ou MP3/WAV'}</div>
          </div>
        </div>
        <button id="av3d-close" title="${en ? 'Close' : 'Fermer'}" style="background:rgba(255,255,255,0.06);border:1px solid #334155;border-radius:6px;color:#94a3b8;padding:4px 9px;cursor:pointer;font-size:12px;">✕</button>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;">
        <button id="av3d-mic" style="padding:12px;background:#1e293b;border:1px solid #334155;border-radius:10px;color:#fff;font-size:11px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:6px;transition:0.2s;">
          <span style="font-size:18px;">🎤</span>
          <span>${en ? 'Live Microphone' : 'Micro en direct'}</span>
        </button>
        <label id="av3d-file-btn" style="padding:12px;background:#1e293b;border:1px solid #334155;border-radius:10px;color:#fff;font-size:11px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:6px;position:relative;overflow:hidden;transition:0.2s;">
          <span style="font-size:18px;">📁</span>
          <span>${en ? 'Audio File (MP3/WAV)' : 'Fichier Audio (MP3/WAV)'}</span>
          <input type="file" id="av3d-file" accept="audio/*" style="position:absolute;inset:0;opacity:0;cursor:pointer;">
        </label>
      </div>
      <div id="av3d-status" style="font-size:10px;color:#94a3b8;text-align:center;margin-bottom:14px;">${_audioName ? ('🎵 ' + _audioName) : (_micStream ? (en ? '🟢 Microphone ready' : '🟢 Micro prêt') : (en ? 'Choose Microphone, load MP3/WAV, or use Demo Synth' : 'Choisissez Micro, MP3/WAV ou Synthé Démo'))}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:15px;">
        <div class="av3d-row"><span style="font-size:10px;color:#94a3b8;">${en ? 'Bars' : 'Barres'} <b id="av3d-bv">${cfg.bars}</b></span><input type="range" id="av3d-bars" min="16" max="128" step="16" value="${cfg.bars}" style="width:100%;accent-color:#10b981;"></div>
        <div class="av3d-row"><span style="font-size:10px;color:#94a3b8;">${en ? 'Style' : 'Style'}</span><select id="av3d-style" style="width:100%;padding:5px;background:#1e293b;border:1px solid #334155;border-radius:6px;color:#fff;font-size:10px;"><option value="box" ${cfg.barStyle==='box'?'selected':''}>Box</option><option value="cylinder" ${cfg.barStyle==='cylinder'?'selected':''}>Cylinder</option><option value="cone" ${cfg.barStyle==='cone'?'selected':''}>Cone</option></select></div>
        <div class="av3d-row" style="grid-column:span 2;"><span style="font-size:10px;color:#94a3b8;">${en ? 'Color Palette' : 'Palette'}</span><select id="av3d-colors" style="width:100%;padding:5px;background:#1e293b;border:1px solid #334155;border-radius:6px;color:#fff;font-size:10px;"><option value="spectrum" ${cfg.colorScheme==='spectrum'?'selected':''}>Spectrum</option><option value="fire" ${cfg.colorScheme==='fire'?'selected':''}>Fire</option><option value="ocean" ${cfg.colorScheme==='ocean'?'selected':''}>Ocean</option><option value="neon" ${cfg.colorScheme==='neon'?'selected':''}>Neon</option></select></div>
      </div>
      <button id="av3d-gen-btn" style="width:100%;padding:12px;background:linear-gradient(135deg,#10b981,#059669);border:none;border-radius:10px;color:#fff;font-size:12px;font-weight:700;cursor:pointer;box-shadow:0 4px 16px rgba(16,185,129,0.35);">⚡ ${en ? 'GENERATE 3D VISUALIZER' : 'GÉNÉRER LE VISUALISEUR 3D'}</button>
    `;
    _bindUI();
  }

  function _setStatus(txt, isErr = false) {
    const s = _panel && _panel.querySelector('#av3d-status');
    if (!s) return;
    s.textContent = txt;
    s.style.color = isErr ? '#ef4444' : '#34d399';
  }

  function _bindUI() {
    _panel.querySelector('#av3d-close').onclick = closePanel;
    const micBtn = _panel.querySelector('#av3d-mic');
    micBtn.onclick = () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        _setStatus(isEN() ? 'Microphone API unavailable (requires HTTPS)' : 'API Micro indisponible (HTTPS requis)', true);
        return;
      }
      navigator.mediaDevices.getUserMedia({ audio: true }).then(s => {
        stopMic();
        _micStream = s;
        _audioFile = null;
        _audioB64 = '';
        _audioName = '';
        micBtn.style.background = 'rgba(16,185,129,0.25)';
        micBtn.style.borderColor = '#10b981';
        _setStatus(isEN() ? '🟢 Microphone active' : '🟢 Microphone activé');
      }).catch(e => _setStatus(e.message || 'Mic denied', true));
    };

    _panel.querySelector('#av3d-file').onchange = e => {
      const f = e.target.files[0];
      if (!f) return;
      stopMic();
      _audioFile = f;
      _audioName = f.name;
      const fb = _panel.querySelector('#av3d-file-btn');
      fb.style.background = 'rgba(16,185,129,0.25)';
      fb.style.borderColor = '#10b981';
      _setStatus('⏳ ' + (isEN() ? 'Reading audio...' : 'Lecture audio...'));
      const reader = new FileReader();
      reader.onload = ev => {
        _audioB64 = ev.target.result || '';
        _setStatus('🎵 ' + f.name + ' (' + (f.size / 1048576).toFixed(2) + ' MB)');
      };
      reader.onerror = () => _setStatus(isEN() ? 'Error reading audio file' : 'Erreur lecture fichier', true);
      reader.readAsDataURL(f);
    };

    _panel.querySelector('#av3d-bars').oninput = e => {
      cfg.bars = +e.target.value;
      _panel.querySelector('#av3d-bv').textContent = e.target.value;
    };
    _panel.querySelector('#av3d-style').onchange = e => cfg.barStyle = e.target.value;
    _panel.querySelector('#av3d-colors').onchange = e => cfg.colorScheme = e.target.value;

    _panel.querySelector('#av3d-gen-btn').onclick = () => _generate();
  }

  function _generate() {
    const en = isEN();
    const B = cfg.bars, S = cfg.barStyle, C = cfg.colorScheme;
    const mode = _audioFile && _audioB64 ? 'file' : (_micStream ? 'mic' : 'demo');
    // Stop preview mic stream so the iframe can capture cleanly without resource leak
    stopMic();
    const safeB64 = mode === 'file' && _audioB64.length < 8_000_000 ? _audioB64 : '';
    const safeName = (_audioName || 'Audio Track').replace(/[<>"'`\\]/g, '');

    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>3D Audio Visualizer</title>
<style>*{margin:0;padding:0;box-sizing:border-box;}body{background:#050815;overflow:hidden;font-family:Inter,sans-serif;color:#f1f5f9;}
#ui{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:10;display:flex;gap:8px;align-items:center;background:rgba(13,18,37,0.88);border:1px solid rgba(16,185,129,0.35);padding:8px 14px;border-radius:999px;backdrop-filter:blur(10px);}
button,label.btn{padding:7px 14px;background:#10b981;border:none;border-radius:999px;color:#fff;font-weight:700;font-size:12px;cursor:pointer;display:inline-flex;align-items:center;gap:5px;}
button.alt,label.btn.alt{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);}
#status{font-size:11px;color:#94a3b8;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"><\/script>
</head><body>
<div id="ui">
  <button id="btn-play">▶ ${mode === 'file' ? (en ? 'Play Track' : 'Lire Piste') : mode === 'mic' ? (en ? 'Start Mic' : 'Démarrer Micro') : (en ? 'Demo Synth' : 'Synthé Démo')}</button>
  <button id="btn-mic" class="alt">🎤 Mic</button>
  <label class="btn alt" style="position:relative;">📁 MP3<input type="file" id="file-in" accept="audio/*" style="position:absolute;inset:0;opacity:0;cursor:pointer;"></label>
  <span id="status">${mode === 'file' ? safeName : (en ? 'Ready' : 'Prêt')}</span>
</div>
<script>(function(){
const BARS=${B}, STYLE='${S}', CS='${C}', MODE='${mode}';
const EMBEDDED_AUDIO=${JSON.stringify(safeB64)};
const scene=new THREE.Scene();scene.background=new THREE.Color(0x050815);scene.fog=new THREE.FogExp2(0x050815,0.008);
const camera=new THREE.PerspectiveCamera(58,innerWidth/innerHeight,0.1,1000);
camera.position.set(0,22,56);
const renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});
renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,2));
document.body.appendChild(renderer.domElement);
const controls=new THREE.OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;controls.autoRotate=true;controls.autoRotateSpeed=0.8;
scene.add(new THREE.GridHelper(90,30,0x10b981,0x0f172a));
const bars=[];const group=new THREE.Group();scene.add(group);
const radius=18;const barW=Math.max(0.45,38/BARS);
const cfn={
  spectrum:i=>new THREE.Color().setHSL((i/BARS)*0.78,1,0.52),
  fire:i=>new THREE.Color().setHSL((i/BARS)*0.14,1,0.5),
  ocean:i=>new THREE.Color().setHSL(0.52+(i/BARS)*0.14,0.95,0.52),
  neon:i=>i%2?new THREE.Color(0x22d3ee):new THREE.Color(0xe879f9)
};
const gc=cfn[CS]||cfn.spectrum;
for(let i=0;i<BARS;i++){
  let geo;
  if(STYLE==='cylinder') geo=new THREE.CylinderGeometry(barW*0.42,barW*0.42,1,12);
  else if(STYLE==='cone') geo=new THREE.ConeGeometry(barW*0.48,1,12);
  else geo=new THREE.BoxGeometry(barW*0.8,1,barW*0.8);
  const col=gc(i);
  const mat=new THREE.MeshStandardMaterial({color:col,emissive:col,emissiveIntensity:0.35,metalness:0.35,roughness:0.25});
  const mesh=new THREE.Mesh(geo,mat);
  const a=(i/BARS)*Math.PI*2;
  mesh.position.set(Math.cos(a)*radius,0.5,Math.sin(a)*radius);
  mesh.lookAt(0,0.5,0);
  group.add(mesh);bars.push(mesh);
}
scene.add(new THREE.AmbientLight(0xffffff,0.45));
const dl=new THREE.DirectionalLight(0xffffff,1.1);dl.position.set(20,50,30);scene.add(dl);
const pl=new THREE.PointLight(0x10b981,2,120);pl.position.set(0,15,0);scene.add(pl);

let actx=null,anl=null,data=null,srcNode=null,audioEl=null,micStream=null,demoMode=true;
const statusEl=document.getElementById('status');
function ensureCtx(){
  if(!actx){actx=new (window.AudioContext||window.webkitAudioContext)();anl=actx.createAnalyser();anl.fftSize=256;anl.smoothingTimeConstant=0.82;data=new Uint8Array(anl.frequencyBinCount);}
  if(actx.state==='suspended') actx.resume();
}
function stopCurrent(){
  if(audioEl){try{audioEl.pause();}catch(e){}}
  if(srcNode){try{srcNode.disconnect();}catch(e){}}
  if(micStream){micStream.getTracks().forEach(t=>t.stop());micStream=null;}
}
async function startMic(){
  stopCurrent();ensureCtx();demoMode=false;
  try{
    micStream=await navigator.mediaDevices.getUserMedia({audio:true});
    srcNode=actx.createMediaStreamSource(micStream);
    srcNode.connect(anl);
    statusEl.textContent='🔴 Mic Live';
  }catch(err){statusEl.textContent='Mic denied';demoMode=true;}
}
function playAudioUrl(url,label){
  stopCurrent();ensureCtx();demoMode=false;
  audioEl=new Audio(url);audioEl.crossOrigin='anonymous';audioEl.loop=true;
  srcNode=actx.createMediaElementSource(audioEl);
  srcNode.connect(anl);anl.connect(actx.destination);
  audioEl.play().then(()=>{statusEl.textContent='🎵 '+label;}).catch(e=>{statusEl.textContent='Click Play again';});
}
document.getElementById('btn-play').onclick=()=>{
  if(EMBEDDED_AUDIO){playAudioUrl(EMBEDDED_AUDIO,'${safeName}');}
  else if(MODE==='mic'){startMic();}
  else{demoMode=!demoMode;statusEl.textContent=demoMode?'✨ Demo Wave':'⏸ Paused';}
};
document.getElementById('btn-mic').onclick=startMic;
document.getElementById('file-in').onchange=e=>{
  const f=e.target.files[0];if(!f)return;
  playAudioUrl(URL.createObjectURL(f),f.name);
};
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
let t=0;
function animate(){
  requestAnimationFrame(animate);t+=0.035;controls.update();
  if(anl&&!demoMode){
    anl.getByteFrequencyData(data);
    for(let i=0;i<BARS;i++){
      const val=data[Math.floor((i/BARS)*data.length*0.75)]||0;
      const h=Math.max(0.6,(val/255)*26);
      bars[i].scale.y=h;bars[i].position.y=h/2;
      bars[i].material.emissiveIntensity=0.2+(val/255)*1.4;
    }
  }else if(demoMode){
    for(let i=0;i<BARS;i++){
      const wave=(Math.sin(t*2+i*0.35)*0.5+0.5)*0.65+(Math.cos(t*1.3-i*0.2)*0.5+0.5)*0.35;
      const h=1.2+wave*18;
      bars[i].scale.y=h;bars[i].position.y=h/2;
      bars[i].material.emissiveIntensity=0.25+wave*0.9;
    }
  }
  renderer.render(scene,camera);
}
animate();
}());<\/script></body></html>`;

    const ed = document.getElementById('code-editor');
    if (ed) {
      if (window.pushUndo) window.pushUndo();
      ed.value = html;
      ed.dispatchEvent(new Event('input', { bubbles: true }));
      if (window.toast) window.toast(en ? '✨ 3D Audio Visualizer generated!' : '✨ Visualiseur Audio 3D généré !');
    }
  }

  function init(container, btn) {
    _container = container;
    buildUI();
    window.addEventListener('studio:langchange', () => {
      const wasOpen = _panel && _panel.style.display === 'flex';
      buildUI();
      if (wasOpen) { _panel.style.display = 'flex'; _panel.style.flexDirection = 'column'; }
    });
    if (btn) btn.addEventListener('click', () => {
      const visible = _panel.style.display === 'flex';
      document.querySelectorAll('[id$="-panel"]').forEach(p => p.style.display = 'none');
      if (visible) {
        closePanel();
      } else {
        _panel.style.display = 'flex';
        _panel.style.flexDirection = 'column';
      }
    });
  }

  return { init, close: closePanel, refreshLang: buildUI };
})();
// Export alias so both window.AudioVisualizer and window.AudioVisualizer3D work seamlessly
window.AudioVisualizer3D = window.AudioVisualizer;
