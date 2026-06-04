(function(){
'use strict';

var LANG = {
  en: {
    bci_tab:'BCI Reader', bci_title:'🧠 BCI Web Integration', bci_sub:'Generate Web Bluetooth EEG/Muse code',
    bci_device:'Device Type', bci_metric:'Target Metric (Focus/Relax)', bci_btn:'🧠 Generate BCI Code',

    dt_tab:'Digital Twin', dt_title:'🏭 Digital Twin Sync', dt_sub:'Generate Three.js + WebSocket IoT Sync',
    dt_model:'3D Asset URL / Shape', dt_ws:'WebSocket URL', dt_btn:'🏭 Generate Twin Code',

    qkd_tab:'QKD Crypto', qkd_title:'🔐 Quantum Cryptography', qkd_sub:'Generate BB84 Protocol Simulation',
    qkd_keysize:'Key Size (bits)', qkd_noise:'Channel Noise %', qkd_btn:'🔐 Generate QKD Code',

    ne_tab:'Non-Euclidean', ne_title:'🌀 Non-Euclidean Engine', ne_sub:'Generate Hyperbolic / Portal WebGL Shaders',
    ne_type:'World Type (Hyperbolic / Portal)', ne_color:'Primary Color', ne_btn:'🌀 Generate Shader Code',

    dna_tab:'DNA Storage', dna_title:'🧬 DNA Data Encoder', dna_sub:'Generate Digital to Biological ACGT translation',
    dna_input:'Sample Data String', dna_format:'Input Format', dna_btn:'🧬 Generate Encoder Code',

    snn_tab:'Neuromorphic', snn_title:'⚡ Neuromorphic AI', snn_sub:'Generate Spiking Neural Network (SNN) code',
    snn_neurons:'Neuron Count', snn_synapses:'Synapse Probability', snn_btn:'⚡ Generate SNN Code',

    sat_tab:'Satellite', sat_title:'🛰️ Satellite Mesh', sat_sub:'Generate Orbital Mesh Telemetry (Starlink)',
    sat_orbit:'Orbit Altitude (km)', sat_density:'Satellite Density', sat_btn:'🛰️ Generate Satellite Code',

    qc_tab:'Quantum Designer', qc_title:'⚛️ Quantum Circuit Designer', qc_sub:'Generate Quantum Logic Gates & Bloch Sphere',
    qc_qubits:'Qubit Count', qc_gates:'Primary Gates (H, X, CNOT)', qc_btn:'⚛️ Generate Circuit Code',

    fus_tab:'Fusion Lab', fus_title:'🧪 Fusion Plasma Lab', fus_sub:'Generate Tokamak Magnetic Containment code',
    fus_temp:'Target Temperature (MK)', fus_field:'Field Strength (Tesla)', fus_btn:'🧪 Generate Fusion Code',

    inject: '💉 Inject Code', copy: '📋 Copy Code', generated: '✅ Code Generated Successfully!'
  },
  fr: {
    bci_tab:'Lecteur BCI', bci_title:'🧠 Intégration Web BCI', bci_sub:'Générer code Web Bluetooth EEG/Muse',
    bci_device:'Type d\'Appareil', bci_metric:'Métrique (Focus/Relax)', bci_btn:'🧠 Générer Code BCI',

    dt_tab:'Jumeau Num.', dt_title:'🏭 Jumeau Numérique', dt_sub:'Générer Synchro IoT Three.js + WebSocket',
    dt_model:'URL Modèle 3D / Forme', dt_ws:'URL WebSocket', dt_btn:'🏭 Générer Code Jumeau',

    qkd_tab:'Crypto QKD', qkd_title:'🔐 Cryptographie Quantique', qkd_sub:'Générer Simulation Protocole BB84',
    qkd_keysize:'Taille Clé (bits)', qkd_noise:'Bruit Canal %', qkd_btn:'🔐 Générer Code QKD',

    ne_tab:'Non-Euclidien', ne_title:'🌀 Moteur Non-Euclidien', ne_sub:'Générer Shaders WebGL Hiperboliques',
    ne_type:'Type de Monde', ne_color:'Couleur Primaire', ne_btn:'🌀 Générer Code Shader',

    dna_tab:'Stockage ADN', dna_title:'🧬 Encodeur Données ADN', dna_sub:'Générer traduction digital vers biologique ACGT',
    dna_input:'Chaîne de Données', dna_format:'Format d\'Entrée', dna_btn:'🧬 Générer Encodeur',

    snn_tab:'Neuromorphique', snn_title:'⚡ IA Neuromorphique', snn_sub:'Générer code Réseau Neuronal à Impulsions (SNN)',
    snn_neurons:'Nombre de Neurones', snn_synapses:'Probabilité Synapse', snn_btn:'⚡ Générer Code SNN',

    sat_tab:'Satelitte', sat_title:'🛰️ Constellation Satellitaire', sat_sub:'Générer Télémétrie Mesh Orbitale (Starlink)',
    sat_orbit:'Altitude Orbitale (km)', sat_density:'Densité Satellites', sat_btn:'🛰️ Générer Code Satellite',

    qc_tab:'Designer Quantique', qc_title:'⚛️ Designer de Circuit Quantique', qc_sub:'Générer Portes Logiques Quantiques & Bloch Sphere',
    qc_qubits:'Nombre de Qubits', qc_gates:'Portes Primaires (H, X, CNOT)', qc_btn:'⚛️ Générer Code Circuit',

    fus_tab:'Labo Fusion', fus_title:'🧪 Labo Plasma de Fusion', fus_sub:'Générer code de Confinement Magnétique Tokamak',
    fus_temp:'Température Cible (MK)', fus_field:'Force du Champ (Tesla)', fus_btn:'🧪 Générer Code Fusion',

    inject: '💉 Injecter Code', copy: '📋 Copier Code', generated: '✅ Code Généré avec Succès!'
  }
};

function gl(){return window.lang||'en';}
function t(k){return (LANG[gl()]||LANG.en)[k]||k;}

function makeField(id, label, placeholder, valObj, key) {
  var d=document.createElement('div');
  var l=document.createElement('div');
  l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';
  l.textContent=label;
  var i=document.createElement('input');
  i.id=id; i.placeholder=placeholder; i.value=valObj[key]||'';
  i.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(236,72,153,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';
  i.oninput=function(){ valObj[key] = this.value; };
  d.appendChild(l); d.appendChild(i);
  return d;
}

function renderPanel(tabId, titleK, subK, fields, btnK, genFn) {
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(236,72,153,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(236,72,153,0.1),rgba(219,39,119,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#f472b6;">'+t(titleK)+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t(subK)+'</div>';
  wrap.appendChild(hdr);
  
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;';
  fields.forEach(function(f){ body.appendChild(f); });

  var btn=document.createElement('button');btn.innerHTML=t(btnK);
  btn.style='width:100%;background:linear-gradient(135deg,#db2777,#ec4899);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:6px;box-shadow:0 4px 15px rgba(236,72,153,0.3);';
  body.appendChild(btn);

  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=t('inject');ib.style='flex:1;background:rgba(255,255,255,.1);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=t('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);

  var generatedCode='';
  btn.onclick=function(){
    generatedCode = genFn();
    ar.style.display='flex';
    res.innerHTML='<div style="background:rgba(236,72,153,0.08);border:1px solid rgba(236,72,153,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#f472b6;">'+t('generated')+'</div>';
    if(window.showToast) window.showToast(t('generated'));
  };
  ib.onclick=function(){
    if(!generatedCode)return;
    var inj=window.injectCode||(window.parent&&window.parent.injectCode);
    if(typeof inj==='function'){
      inj(generatedCode);
      if(window.showToast) window.showToast('✅ Code Injected!');
    }
  };
  cb.onclick=function(){
    if(generatedCode&&navigator.clipboard) navigator.clipboard.writeText(generatedCode).then(function(){
      if(window.showToast) window.showToast('📋 Copied!');
    });
  };
}

// 1. BCI Web Integration
var dBci = { device: 'Muse Headband / OpenBCI', metric: 'Alpha Waves (Relaxation)' };
function renderBci() {
  var f1 = makeField('bci-dev', t('bci_device'), 'Muse 2 / OpenBCI Cyton', dBci, 'device');
  var f2 = makeField('bci-met', t('bci_metric'), 'Alpha (Relax) / Beta (Focus)', dBci, 'metric');
  renderPanel('bcireader', 'bci_title', 'bci_sub', [f1, f2], 'bci_btn', function(){
    return `<!-- 🧠 BCI NEURAL INTERFACE - ADVANCED SIMULATION -->
<div id="bci-hub" style="background:#020617; padding:25px; color:#f8fafc; border-radius:16px; font-family:'Segoe UI', sans-serif; border:1px solid #0ea5e9; box-shadow:0 0 40px rgba(14,165,233,0.1);">
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom:1px solid rgba(14,165,233,0.2); padding-bottom:15px;">
    <div>
      <h2 style="margin:0; font-size:20px; color:#0ea5e9; text-transform:uppercase; letter-spacing:1px;">Neural Link v4.0</h2>
      <div style="font-size:11px; color:#94a3b8;">Sourcing: ${dBci.device}</div>
    </div>
    <div id="bci-led" style="width:12px; height:12px; background:#ef4444; border-radius:50%; box-shadow:0 0 10px #ef4444;"></div>
  </div>

  <div style="display:grid; grid-template-columns:1fr 200px; gap:20px;">
    <div style="background:rgba(0,0,0,0.3); border-radius:12px; padding:15px; border:1px solid rgba(255,255,255,0.05);">
      <canvas id="eeg-waves" style="width:100%; height:150px;"></canvas>
      <div style="display:flex; justify-content:space-around; margin-top:10px; font-size:10px; color:#64748b;">
        <span>Alpha</span><span>Beta</span><span>Gamma</span><span>Delta</span>
      </div>
    </div>
    
    <div style="display:flex; flex-direction:column; gap:10px;">
      <div style="background:rgba(14,165,233,0.05); padding:12px; border-radius:10px; border:1px solid rgba(14,165,233,0.1);">
        <div style="font-size:10px; color:#0ea5e9; font-weight:800;">FOCUS SCORE</div>
        <div id="focus-val" style="font-size:32px; font-weight:900;">0%</div>
      </div>
      <button id="bci-sync" style="flex:1; background:#0ea5e9; color:#fff; border:none; border-radius:10px; font-weight:900; cursor:pointer; transition:0.3s; font-size:12px;">ESTABLISH LINK</button>
    </div>
  </div>

  <div id="log-feed" style="margin-top:15px; height:60px; overflow:hidden; font-family:monospace; font-size:9px; color:#34d399; background:#000; padding:8px; border-radius:6px; opacity:0.7;">
    > Initializing Neural Buffer...<br>> Waiting for Bluetooth handshake...
  </div>
</div>

<script>
  (function() {
    const canvas = document.getElementById('eeg-waves');
    const ctx = canvas.getContext('2d');
    const syncBtn = document.getElementById('bci-sync');
    const led = document.getElementById('bci-led');
    const log = document.getElementById('log-feed');
    const focusVal = document.getElementById('focus-val');
    
    let active = false;
    let offset = 0;

    syncBtn.onclick = () => {
      active = !active;
      syncBtn.innerText = active ? 'TERMINATE LINK' : 'ESTABLISH LINK';
      syncBtn.style.background = active ? '#ef4444' : '#0ea5e9';
      led.style.background = active ? '#10b981' : '#ef4444';
      led.style.boxShadow = active ? '0 0 15px #10b981' : '0 0 10px #ef4444';
      addLog(active ? 'Link Established. Streaming...' : 'Link Terminated.');
    };

    function addLog(msg) {
      log.innerHTML = '> ' + msg + '<br>' + log.innerHTML;
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if(!active) {
        requestAnimationFrame(draw);
        return;
      }
      
      offset += 0.1;
      const focus = 40 + Math.sin(offset) * 30 + Math.random() * 10;
      focusVal.innerText = Math.round(focus) + '%';
      
      // Draw 4 wave bands
      for(let b=0; b<4; b++) {
        ctx.beginPath();
        ctx.strokeStyle = ['#0ea5e9', '#8b5cf6', '#10b981', '#f43f5e'][b];
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.6;
        for(let x=0; x<canvas.width; x++) {
          const y = (canvas.height/2) + Math.sin(x*0.05 + offset * (b+1)) * (10 + b*5) + (Math.random()*2);
          if(x===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
        }
        ctx.stroke();
      }
      
      requestAnimationFrame(draw);
    }
    draw();
  })();
<\/script>`;
  });
}

// 2. Digital Twin Sync
var dDt = { model: 'Industrial_Robot_v2.gltf', ws: 'wss://production.edge.cloud' };
function renderDigitalTwin() {
  var f1 = makeField('dt-mod', t('dt_model'), 'Industrial_Robot_v2.gltf', dDt, 'model');
  var f2 = makeField('dt-ws', t('dt_ws'), 'wss://production.edge.cloud', dDt, 'ws');
  renderPanel('digitaltwin', 'dt_title', 'dt_sub', [f1, f2], 'dt_btn', function(){
    return `<!-- 🏭 INDUSTRIAL DIGITAL TWIN - V2.0 -->
<div style="position:relative; width:100%; height:550px; background:#000; overflow:hidden; border-radius:16px; border:1px solid #1e293b; font-family:monospace;">
  <!-- HUD OVERLAY -->
  <div style="position:absolute; top:20px; left:20px; z-index:10; background:rgba(2,6,23,0.9); padding:20px; border-radius:12px; color:#38bdf8; border:1px solid rgba(56,189,248,0.3); backdrop-filter:blur(10px); min-width:200px;">
    <div style="display:flex; align-items:center; gap:10px; margin-bottom:15px;">
      <div id="dt-status-dot" style="width:10px; height:10px; background:#f59e0b; border-radius:50%;"></div>
      <div style="font-weight:900; letter-spacing:1px;">CORE: SYNC_PENDING</div>
    </div>
    <div style="font-size:10px; color:#64748b; margin-bottom:15px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:10px;">
      TARGET: ${dDt.model}<br>LINK: ${dDt.ws}
    </div>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
      <div style="background:rgba(255,255,255,0.03); padding:8px; border-radius:6px;">
        <div style="font-size:9px; color:#64748b;">TEMP</div>
        <div id="dt-temp" style="font-size:14px; color:#fff;">--°C</div>
      </div>
      <div style="background:rgba(255,255,255,0.03); padding:8px; border-radius:6px;">
        <div style="font-size:9px; color:#64748b;">LOAD</div>
        <div id="dt-load" style="font-size:14px; color:#fff;">--%</div>
      </div>
    </div>
    <div id="dt-log" style="margin-top:15px; font-size:9px; color:#10b981; height:40px; overflow:hidden; opacity:0.6;">> HANDSHAKE...</div>
  </div>

  <div id="dt-container" style="width:100%; height:100%;"></div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
<script>
  (function() {
    const container = document.getElementById('dt-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / 550, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, 550);
    container.appendChild(renderer.domElement);

    // Advanced Lighting
    const p1 = new THREE.PointLight(0x38bdf8, 2, 10); p1.position.set(2, 2, 2); scene.add(p1);
    const p2 = new THREE.PointLight(0xf472b6, 1, 10); p2.position.set(-2, -2, 2); scene.add(p2);
    scene.add(new THREE.AmbientLight(0x1e293b));

    // Floor Grid (Techno style)
    const grid = new THREE.GridHelper(20, 40, 0x1e293b, 0x0f172a);
    scene.add(grid);

    // Assembly Group
    const group = new THREE.Group();
    const mainGeo = new THREE.CylinderGeometry(0.8, 1.2, 3, 6);
    const mainMat = new THREE.MeshPhongMaterial({ color: 0x0f172a, emissive: 0x38bdf8, emissiveIntensity: 0.2, flatShading: true });
    const robotBase = new THREE.Mesh(mainGeo, mainMat);
    group.add(robotBase);

    // Sensor Nodes
    for(let i=0; i<4; i++) {
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
      s.position.set(Math.cos(i)*1, 1.5, Math.sin(i)*1);
      group.add(s);
    }
    scene.add(group);

    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);

    function animate() {
      requestAnimationFrame(animate);
      group.rotation.y += 0.005;
      robotBase.position.y = Math.sin(Date.now()*0.002) * 0.1;
      
      // Update UI
      if(Math.random() > 0.95) {
        document.getElementById('dt-temp').innerText = (42 + Math.random()*5).toFixed(1) + '°C';
        document.getElementById('dt-load').innerText = (60 + Math.random()*20).toFixed(0) + '%';
        const log = document.getElementById('dt-log');
        log.innerHTML = '> PKT_RECV_' + Math.floor(Math.random()*1000) + '<br>' + log.innerHTML.substr(0, 50);
        document.getElementById('dt-status-dot').style.background = '#10b981';
      }
      
      renderer.render(scene, camera);
    }
    animate();
  })();
<\/script>`;
  });
}

// 3. QKD Crypto
var dQkd = { keysize: '256', noise: '5' };
function renderQKD() {
  var f1 = makeField('qkd-key', t('qkd_keysize'), '128 / 256 / 512', dQkd, 'keysize');
  var f2 = makeField('qkd-noi', t('qkd_noise'), '2% / 5% / 10%', dQkd, 'noise');
  renderPanel('qkdcrypto', 'qkd_title', 'qkd_sub', [f1, f2], 'qkd_btn', function(){
    return `<!-- 🔐 QUANTUM KEY DISTRIBUTION - HIGH FIDELITY SIMULATION -->
<div style="background:#020617; padding:25px; color:#f1f5f9; border-radius:16px; font-family:monospace; border:1px solid #c084fc; box-shadow:0 0 40px rgba(192,132,252,0.15);">
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom:1px solid rgba(192,132,252,0.3); padding-bottom:15px;">
    <h2 style="margin:0; font-size:18px; color:#c084fc; text-transform:uppercase; letter-spacing:2px;">BB84 Protocol Link</h2>
    <div style="font-size:10px; background:#c084fc33; color:#c084fc; padding:4px 10px; border-radius:20px; border:1px solid #c084fc;">SECURE CHANNEL</div>
  </div>

  <!-- QUANTUM CHANNEL VISUALIZER -->
  <div style="height:120px; background:#000; border-radius:12px; margin-bottom:20px; position:relative; overflow:hidden; border:1px solid rgba(192,132,252,0.2);">
    <div style="position:absolute; left:20px; top:50%; transform:translateY(-50%); text-align:center;">
      <div style="font-size:20px;">👩‍🔬</div><div style="font-size:8px; color:#c084fc;">ALICE</div>
    </div>
    <div style="position:absolute; right:20px; top:50%; transform:translateY(-50%); text-align:center;">
      <div style="font-size:20px;">👨‍🔬</div><div style="font-size:8px; color:#c084fc;">BOB</div>
    </div>
    <div id="photon-path" style="position:absolute; inset:0 60px; display:flex; align-items:center; justify-content:space-around;">
      <!-- Photons will animate here -->
    </div>
  </div>

  <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
    <div style="background:rgba(255,255,255,0.02); padding:12px; border-radius:10px; border:1px solid rgba(255,255,255,0.05);">
      <div style="font-size:9px; color:#64748b; margin-bottom:5px;">ALICE'S BASIS</div>
      <div id="alice-bits" style="font-size:10px; color:#38bdf8; word-break:break-all; line-height:1.2;"></div>
    </div>
    <div style="background:rgba(255,255,255,0.02); padding:12px; border-radius:10px; border:1px solid rgba(255,255,255,0.05);">
      <div style="font-size:9px; color:#64748b; margin-bottom:5px;">BOB'S BASIS</div>
      <div id="bob-bits" style="font-size:10px; color:#10b981; word-break:break-all; line-height:1.2;"></div>
    </div>
  </div>

  <div style="margin-top:15px; background:rgba(192,132,252,0.05); padding:15px; border-radius:10px; border:1px dashed rgba(192,132,252,0.3);">
    <div style="font-size:10px; color:#c084fc; margin-bottom:10px;">SIFTED SHARED KEY:</div>
    <div id="shared-key" style="font-size:14px; color:#facc15; font-weight:900; word-break:break-all; min-height:20px;">[LINK STANDBY]</div>
  </div>

  <button id="qkd-trigger" style="width:100%; margin-top:15px; background:linear-gradient(90deg, #9333ea, #c084fc); color:#fff; border:none; padding:12px; border-radius:8px; font-weight:900; cursor:pointer; transition:0.3s; letter-spacing:1px;">GENERATE QUANTUM KEY</button>
</div>

<script>
  (function() {
    const trigger = document.getElementById('qkd-trigger');
    const photonPath = document.getElementById('photon-path');
    const aliceBits = document.getElementById('alice-bits');
    const bobBits = document.getElementById('bob-bits');
    const sharedKey = document.getElementById('shared-key');
    
    const keyLen = parseInt('${dQkd.keysize}');
    const noise = parseFloat('${dQkd.noise}') / 100;

    trigger.onclick = () => {
      trigger.disabled = true;
      trigger.style.opacity = '0.5';
      aliceBits.innerText = '';
      bobBits.innerText = '';
      sharedKey.innerText = 'TRANSMITTING...';
      
      let alice = [], bob = [], sifted = [];
      
      let count = 0;
      const interval = setInterval(() => {
        if(count >= 20) { // Visual sample of 20 photons
          clearInterval(interval);
          finishQKD(alice, bob);
          return;
        }
        
        // Simulate one photon
        const bit = Math.random() > 0.5 ? 1 : 0;
        const basisA = Math.random() > 0.5 ? '+' : 'x';
        const basisB = Math.random() > 0.5 ? '+' : 'x';
        
        const photon = document.createElement('div');
        photon.style = "width:8px; height:8px; background:#fff; border-radius:50%; box-shadow:0 0 10px #fff; position:absolute; left:0; transition:left 0.8s linear, opacity 0.2s;";
        photon.innerText = basisA === '+' ? (bit?'↑':'→') : (bit?'↗':'↘');
        photon.style.fontSize = '12px';
        photon.style.lineHeight = '8px';
        photon.style.display = 'flex';
        photon.style.alignItems = 'center';
        photon.style.justifyContent = 'center';
        
        photonPath.appendChild(photon);
        setTimeout(() => { photon.style.left = '100%'; }, 50);
        setTimeout(() => { photon.style.opacity = '0'; setTimeout(() => photon.remove(), 200); }, 750);
        
        alice.push({ bit, basis: basisA });
        bob.push({ bit: (basisA===basisB && Math.random()>noise)?bit:(Math.random()>0.5?1:0), basis: basisB });
        
        aliceBits.innerText += basisA;
        bobBits.innerText += basisB;
        
        count++;
      }, 100);
    };

    function finishQKD(alice, bob) {
      let key = "";
      for(let i=0; i<alice.length; i++) {
        if(alice[i].basis === bob[i].basis) {
          key += alice[i].bit;
        }
      }
      // Fill the rest to simulate full keysize
      for(let i=0; i<keyLen/10; i++) key += Math.random() > 0.5 ? '1' : '0';
      
      sharedKey.innerText = key;
      trigger.disabled = false;
      trigger.style.opacity = '1';
    }
  })();
<\/script>`;
  });
}

// 4. Non-Euclidean Engine
var dNe = { type: 'Hyperbolic', color: 'Purple' };
function renderNonEuclidean() {
  var f1 = makeField('ne-type', t('ne_type'), 'Fractal Portal / Hyperbolic', dNe, 'type');
  var f2 = makeField('ne-col', t('ne_color'), '#8b5cf6 / #f43f5e', dNe, 'color');
  renderPanel('noneuclidean', 'ne_title', 'ne_sub', [f1, f2], 'ne_btn', function(){
    return `<!-- 🌀 NON-EUCLIDEAN SHADER ENGINE - V3.0 -->
<div id="ne-canvas-container" style="width:100%; height:550px; background:#000; overflow:hidden; border-radius:16px; position:relative; border:1px solid #8b5cf6; box-shadow:0 0 50px rgba(139,92,246,0.2);">
  <div style="position:absolute; bottom:20px; right:20px; background:rgba(0,0,0,0.8); padding:10px 15px; border-radius:8px; border:1px solid #8b5cf6; color:#8b5cf6; font-family:monospace; font-size:10px; z-index:10; backdrop-filter:blur(10px);">
    MODE: ${dNe.type.toUpperCase()}<br>FPS: <span id="ne-fps">60</span><br>GPU_LINK: ACTIVE
  </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
<script>
  (function() {
    const container = document.getElementById('ne-canvas-container');
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, 550);
    container.appendChild(renderer.domElement);

    const vertexShader = "void main() { gl_Position = vec4(position, 1.0); }";
    const fragmentShader = \`
      uniform float time;
      uniform vec2 resolution;
      uniform vec3 color;

      mat2 rot(float a) {
          float s = sin(a), c = cos(a);
          return mat2(c, -s, s, c);
      }

      float sdBox(vec3 p, vec3 b) {
          vec3 q = abs(p) - b;
          return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
      }

      float getDist(vec3 p) {
          p.z -= time * 0.5;
          p.xy *= rot(time * 0.2);
          
          vec3 p_orig = p;
          float d = 1000.0;
          
          for(int i=0; i<5; i++) {
              p = abs(p) - 1.2;
              p.xy *= rot(0.5);
              p.yz *= rot(0.3);
              d = min(d, sdBox(p, vec3(0.5)));
          }
          
          return d * 0.5;
      }

      void main() {
          vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / min(resolution.y, resolution.x);
          vec3 ro = vec3(0, 0, -3);
          vec3 rd = normalize(vec3(uv, 1));
          
          float d = 0.0;
          for(int i=0; i<80; i++) {
              vec3 p = ro + rd * d;
              float ds = getDist(p);
              d += ds;
              if(d > 20.0 || ds < SURF_DIST) break;
          }
          
          vec3 col = color * (1.0 - d / 15.0);
          col += vec3(0.1, 0.2, 0.4) * (d * 0.05);
          gl_FragColor = vec4(col, 1.0);
      }
    \`;

    const uniforms = {
      time: { value: 0 },
      resolution: { value: new THREE.Vector2(container.clientWidth, 550) },
      color: { value: new THREE.Color("${dNe.color || '#8b5cf6'}") }
    };

    const material = new THREE.ShaderMaterial({ 
      vertexShader, 
      fragmentShader: "precision highp float;\\n#define SURF_DIST 0.01\\n" + fragmentShader, 
      uniforms 
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    let lastTime = 0;
    function animate(now) {
      requestAnimationFrame(animate);
      uniforms.time.value = now * 0.001;
      
      const dt = now - lastTime;
      lastTime = now;
      if(Math.random() > 0.95) document.getElementById('ne-fps').innerText = Math.round(1000/dt);
      
      renderer.render(scene, camera);
    }
    animate(0);
  })();
<\/script>`;
  });
}

// 5. DNA Storage Encoder
var dDna = { input: 'HELLO WORLD', format: 'String (UTF-8)' };
function renderDnaStorage() {
  var f1 = makeField('dna-in', t('dna_input'), 'GENETIC_DATA_01', dDna, 'input');
  var f2 = makeField('dna-fmt', t('dna_format'), 'UTF-8 / Binary', dDna, 'format');
  renderPanel('dnastorage', 'dna_title', 'dna_sub', [f1, f2], 'dna_btn', function(){
    return `<!-- 🧬 DNA DATA STORAGE - BIOLOGICAL SYNTHESIS SIM -->
<div style="background:#020617; padding:25px; color:#10b981; border-radius:16px; font-family:monospace; border:1px solid #10b981; box-shadow:0 0 40px rgba(16,185,129,0.15); overflow:hidden;">
  <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(16,185,129,0.3); padding-bottom:15px; margin-bottom:20px;">
    <h2 style="margin:0; font-size:18px; color:#34d399; text-transform:uppercase; letter-spacing:2px;">Bio-Encoder v1.2</h2>
    <div style="font-size:10px; color:#10b981; opacity:0.7;">DNA_DENSITY: 215 PB/g</div>
  </div>

  <div style="display:grid; grid-template-columns:1fr 180px; gap:20px;">
    <div>
      <div style="background:rgba(0,0,0,0.3); padding:15px; border-radius:10px; border:1px solid rgba(16,185,129,0.1); margin-bottom:15px;">
        <div style="font-size:9px; color:#64748b; margin-bottom:5px;">BINARY STREAM:</div>
        <div id="dna-bin" style="font-size:10px; word-break:break-all; color:#94a3b8; height:40px; overflow:hidden;">01010101...</div>
      </div>
      <div style="background:#000; padding:15px; border-radius:10px; border-left:4px solid #10b981;">
        <div style="font-size:9px; color:#64748b; margin-bottom:5px;">NUCLEOTIDE SEQUENCE (ACGT):</div>
        <div id="dna-seq" style="font-size:16px; font-weight:900; color:#34d399; word-break:break-all; min-height:40px; letter-spacing:2px;">---</div>
      </div>
    </div>

    <!-- 3D DNA HELIX CSS ANIMATION -->
    <div style="height:150px; display:flex; align-items:center; justify-content:center; perspective:1000px;">
      <div id="helix" style="position:relative; width:40px; height:120px; transform-style:preserve-3d; animation:rotDNA 10s linear infinite;">
        <!-- Base pairs generated by JS -->
      </div>
    </div>
  </div>

  <button id="dna-trigger" style="width:100%; margin-top:20px; background:linear-gradient(90deg, #059669, #10b981); color:#fff; border:none; padding:12px; border-radius:8px; font-weight:900; cursor:pointer; transition:0.3s; letter-spacing:1px;">BEGIN SYNTHESIS</button>
</div>

<style>
  @keyframes rotDNA { from { transform: rotateY(0deg); } to { transform: rotateY(360deg); } }
  .base-pair { position:absolute; width:40px; height:2px; background:rgba(255,255,255,0.1); }
  .base-pair::before, .base-pair::after { content:''; position:absolute; width:6px; height:6px; border-radius:50%; top:-2px; }
  .base-pair::before { left:0; background:#34d399; box-shadow:0 0 10px #34d399; }
  .base-pair::after { right:0; background:#3b82f6; box-shadow:0 0 10px #3b82f6; }
</style>

<script>
  (function() {
    const helix = document.getElementById('helix');
    const bin = document.getElementById('dna-bin');
    const seq = document.getElementById('dna-seq');
    const trigger = document.getElementById('dna-trigger');

    // Init Helix
    for(let i=0; i<15; i++) {
      const bp = document.createElement('div');
      bp.className = 'base-pair';
      bp.style.top = (i * 8) + 'px';
      bp.style.transform = "rotateY(" + (i * 25) + "deg)";
      helix.appendChild(bp);
    }

    trigger.onclick = () => {
      const input = "${dDna.input}";
      let binary = "";
      for(let i=0; i<input.length; i++) binary += input.charCodeAt(0).toString(2).padStart(8, '0');
      
      bin.innerText = binary;
      seq.innerText = "";
      
      const dnaMap = {'00':'A', '01':'C', '10':'G', '11':'T'};
      let dnaStr = "";
      for(let i=0; i<binary.length; i+=2) dnaStr += dnaMap[binary.substr(i,2)] || 'A';
      
      let idx = 0;
      const it = setInterval(() => {
        if(idx >= dnaStr.length) { clearInterval(it); return; }
        seq.innerText += dnaStr[idx];
        idx++;
      }, 30);
    };
  })();
<\/script>`;
  });
}

var dDna = { data: 'GATTACA...', format: 'string' };
var dSnn = { neurons: 100, synapses: 0.15 };
var dSat = { orbit: 550, density: 120 };
var dQc  = { qubits: 5, gates: 'H,X,CNOT' };
var dFus = { temp: 150, field: 5.5 };

// 6. Neuromorphic AI
function renderNeuromorphic() {
  var f1 = makeField('snn-neu', t('snn_neurons'), '1000', dSnn, 'neurons');
  var f2 = makeField('snn-syn', t('snn_synapses'), '0.01 - 0.1', dSnn, 'synapses');
  renderPanel('neuromorphic', 'snn_title', 'snn_sub', [f1, f2], 'snn_btn', function(){
    return `<!-- ⚡ NEUROMORPHIC SPIKING NETWORK - V2.0 -->
<div style="background:#020617; padding:25px; color:#facc15; border-radius:16px; font-family:sans-serif; border:1px solid #facc15; box-shadow:0 0 40px rgba(250,204,21,0.15);">
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom:1px solid rgba(250,204,21,0.2); padding-bottom:15px;">
    <div>
      <h2 style="margin:0; font-size:18px; color:#facc15; text-transform:uppercase;">SNN Core Sim</h2>
      <div style="font-size:11px; color:#94a3b8;">Topology: Random Recurrent | Neurons: ${dSnn.neurons}</div>
    </div>
    <div style="text-align:right;">
      <div style="font-size:10px; color:#64748b;">POWER CONSUMPTION</div>
      <div style="font-size:14px; color:#4ade80; font-weight:900;">0.12 pJ / spike</div>
    </div>
  </div>

  <div style="position:relative; background:#000; border-radius:12px; border:1px solid rgba(250,204,21,0.1); overflow:hidden;">
    <canvas id="snn-canvas" width="600" height="250" style="width:100%; height:250px;"></canvas>
    <div style="position:absolute; top:15px; left:15px; background:rgba(0,0,0,0.7); padding:8px 12px; border-radius:6px; font-family:monospace; font-size:10px; border:1px solid rgba(250,204,21,0.2);">
      SPIKE RATE: <span id="spike-rate">0</span> Hz<br>
      ACTIVE_SYNAPSES: ${(parseFloat(dSnn.synapses)*100).toFixed(1)}%
    </div>
  </div>

  <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:10px; margin-top:20px;">
    <!-- SIMULATED CHIP DIAGNOSTIC -->
    <div style="background:rgba(255,255,255,0.03); padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.05); text-align:center;">
      <div style="font-size:8px; color:#64748b;">LATENCY</div><div style="font-size:12px; color:#facc15;">0.5ms</div>
    </div>
    <div style="background:rgba(255,255,255,0.03); padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.05); text-align:center;">
      <div style="font-size:8px; color:#64748b;">STDP</div><div style="font-size:12px; color:#4ade80;">ACTIVE</div>
    </div>
    <div style="background:rgba(255,255,255,0.03); padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.05); text-align:center;">
      <div style="font-size:8px; color:#64748b;">BUFFER</div><div style="font-size:12px; color:#facc15;">98%</div>
    </div>
    <button id="snn-run" style="background:#facc15; color:#000; border:none; border-radius:8px; font-weight:900; font-size:10px; cursor:pointer;">RUN COLD</button>
  </div>
</div>

<script>
  (function() {
    const canvas = document.getElementById('snn-canvas');
    const ctx = canvas.getContext('2d');
    const runBtn = document.getElementById('snn-run');
    const rateEl = document.getElementById('spike-rate');

    const N = Math.min(parseInt('${dSnn.neurons}'), 400);
    const neurons = [];
    for(let i=0; i<N; i++) {
      neurons.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        v: Math.random() * -65,
        f: 0
      });
    }

    let running = false;
    runBtn.onclick = () => {
      running = !running;
      runBtn.innerText = running ? 'HALT CORE' : 'RUN COLD';
      runBtn.style.background = running ? '#ef4444' : '#facc15';
      runBtn.style.color = running ? '#fff' : '#000';
    };

    function draw() {
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.fillRect(0,0,canvas.width, canvas.height);
      
      let spikes = 0;
      for(let i=0; i<N; i++) {
        let n = neurons[i];
        if(running) {
          n.v += Math.random() * 4 - 1.2;
          if(n.v > -40) {
            n.v = -70;
            n.f = 10;
            spikes++;
            
            // Draw random synapse fire
            if(Math.random() > 0.9) {
              const target = neurons[Math.floor(Math.random()*N)];
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(target.x, target.y);
              ctx.strokeStyle = 'rgba(250, 204, 21, 0.2)';
              ctx.stroke();
            }
          }
        }
        
        if(n.f > 0) n.f--;
        ctx.fillStyle = n.f > 0 ? '#facc15' : '#1e1b4b';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.f > 0 ? 3 : 1.5, 0, Math.PI*2);
        ctx.fill();
        if(n.f > 0) {
          ctx.shadowBlur = 10; ctx.shadowColor = '#facc15';
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }
      
      if(running) rateEl.innerText = (spikes * 60).toFixed(0);
      requestAnimationFrame(draw);
    }
    draw();
  })();
<\/script>`;
  });
}

// 7. Satellite Mesh Network
function renderSatelliteMesh() {
  var f1 = makeField('sat-orb', t('sat_orbit'), '550', dSat, 'orbit');
  var f2 = makeField('sat-den', t('sat_density'), '50 - 500', dSat, 'density');
  renderPanel('satmesh', 'sat_title', 'sat_sub', [f1, f2], 'sat_btn', function(){
    return `<!-- 🛰️ STARLINK MESH SIMULATOR - V3.0 -->
<div style="background:#020617; padding:25px; color:#38bdf8; border-radius:20px; font-family:'Inter',sans-serif; border:1px solid rgba(56,189,248,0.3); box-shadow:0 0 50px rgba(0,0,0,0.5);">
  <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px;">
    <div>
      <h2 style="margin:0; font-size:20px; font-weight:900; letter-spacing:-0.5px;">SAT-MESH CORE</h2>
      <div style="font-size:11px; color:#94a3b8; margin-top:4px;">Active Constellation: ${dSat.density} Satellites</div>
    </div>
    <div style="background:rgba(56,189,248,0.1); padding:8px 15px; border-radius:10px; text-align:right; border:1px solid rgba(56,189,248,0.2);">
      <div style="font-size:9px; color:#38bdf8; font-weight:800; text-transform:uppercase;">Network Latency</div>
      <div id="sat-latency" style="font-size:18px; font-weight:900; font-family:monospace;">24.5 ms</div>
    </div>
  </div>

  <div id="sat-canvas-wrap" style="height:350px; background:#000; border-radius:15px; overflow:hidden; position:relative; border:1px solid rgba(255,255,255,0.05);">
    <div id="sat-hud" style="position:absolute; top:15px; left:15px; pointer-events:none; z-index:10;">
       <div style="font-size:10px; color:#38bdf8; font-weight:800; margin-bottom:5px;">🛰️ TELEMETRY_STREAM</div>
       <div id="sat-info" style="font-size:9px; color:#94a3b8; font-family:monospace; line-height:1.4;"></div>
    </div>
    <canvas id="sat-canvas" style="width:100%; height:100%;"></canvas>
  </div>

  <div style="margin-top:20px; display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px;">
    <div style="background:rgba(255,255,255,0.02); padding:12px; border-radius:12px; border:1px solid rgba(255,255,255,0.05);">
      <div style="font-size:9px; color:#64748b; margin-bottom:4px;">ORBITAL VEL.</div>
      <div style="font-size:14px; font-weight:800; color:#fff;">7.67 km/s</div>
    </div>
    <div style="background:rgba(255,255,255,0.02); padding:12px; border-radius:12px; border:1px solid rgba(255,255,255,0.05);">
      <div style="font-size:9px; color:#64748b; margin-bottom:4px;">BEAM STRENGTH</div>
      <div style="font-size:14px; font-weight:800; color:#4ade80;">98.2%</div>
    </div>
    <div style="background:rgba(255,255,255,0.02); padding:12px; border-radius:12px; border:1px solid rgba(255,255,255,0.05);">
      <div style="font-size:9px; color:#64748b; margin-bottom:4px;">THROUGHPUT</div>
      <div style="font-size:14px; font-weight:800; color:#facc15;">1.4 Tbps</div>
    </div>
  </div>
</div>

<script>
(function(){
  const canvas = document.getElementById('sat-canvas');
  const ctx = canvas.getContext('2d');
  const info = document.getElementById('sat-info');
  const lat = document.getElementById('sat-latency');
  
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  
  const sats = [];
  const count = ${dSat.density};
  const orbit = ${dSat.orbit};
  
  for(let i=0; i<count; i++) {
    sats.push({
      angle: Math.random() * Math.PI * 2,
      v: 0.002 + Math.random() * 0.003,
      r: 80 + (orbit/20) + Math.random() * 5,
      offset: Math.random() * 40 - 20
    });
  }
  
  let frame = 0;
  function draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    
    const cx = canvas.width/2;
    const cy = canvas.height/2;
    
    // Draw Earth
    const grd = ctx.createRadialGradient(cx, cy, 20, cx, cy, 70);
    grd.addColorStop(0, '#0f172a');
    grd.addColorStop(0.5, '#1e293b');
    grd.addColorStop(1, '#020617');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(cx, cy, 70, 0, Math.PI*2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(56,189,248,0.2)';
    ctx.stroke();
    
    // Draw Sats & Mesh
    ctx.lineWidth = 0.5;
    sats.forEach((s, i) => {
      s.angle += s.v;
      const x = cx + Math.cos(s.angle) * s.r;
      const y = cy + Math.sin(s.angle) * s.r + s.offset * Math.cos(s.angle*0.5);
      
      // Connection lines
      sats.forEach((s2, j) => {
        if(i === j) return;
        const x2 = cx + Math.cos(s2.angle) * s2.r;
        const y2 = cy + Math.sin(s2.angle) * s2.r + s2.offset * Math.cos(s2.angle*0.5);
        const dist = Math.sqrt((x-x2)**2 + (y-y2)**2);
        if(dist < 40) {
          ctx.strokeStyle = 'rgba(56,189,248,' + (1 - dist/40) * 0.3 + ')';
          ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x2,y2); ctx.stroke();
        }
      });
      
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath(); ctx.arc(x,y, 1.2, 0, Math.PI*2); ctx.fill();
    });
    
    if(frame % 30 === 0) {
      info.innerHTML = "X: " + (Math.random()*100).toFixed(4) + " | Y: " + (Math.random()*100).toFixed(4) + "<br>" +
                      "SAT_ID: #" + (Math.random()*9000+1000).toFixed(0) + "<br>" +
                      "STATUS: NOMINAL<br>" +
                      "UPLINK: ACTIVE";
      lat.innerText = (20 + Math.random()*10).toFixed(1) + " ms";
    }
    
    frame++;
    requestAnimationFrame(draw);
  }
  draw();
})();
<\/script>`;
  });
}

// 8. Quantum Circuit Designer
function renderQuantumCircuit() {
  var f1 = makeField('qc-qu', t('qc_qubits'), '5', dQc, 'qubits');
  var f2 = makeField('qc-ga', t('qc_gates'), 'H, X, CNOT', dQc, 'gates');
  renderPanel('quantcircuit', 'qc_title', 'qc_sub', [f1, f2], 'qc_btn', function(){
    return `<!-- ⚛️ QUANTUM LOGIC DESIGNER - V2.5 -->
<div style="background:#0f172a; padding:25px; color:#c084fc; border-radius:20px; font-family:'JetBrains Mono',monospace; border:1px solid rgba(192,132,252,0.3); box-shadow:0 0 50px rgba(0,0,0,0.5);">
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:25px;">
    <h2 style="margin:0; font-size:18px; letter-spacing:1px;">QUANTUM_CIRCUIT_v2.5</h2>
    <div style="font-size:10px; color:#94a3b8; background:rgba(255,255,255,0.05); padding:5px 12px; border-radius:20px;">COHERENCE: 99.98%</div>
  </div>

  <div style="background:#020617; border-radius:15px; padding:20px; border:1px solid rgba(255,255,255,0.05); margin-bottom:20px;">
    <div id="qc-wire-container" style="display:flex; flex-direction:column; gap:25px;">
      <!-- Wires generated by JS -->
    </div>
  </div>

  <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
    <div style="background:rgba(192,132,252,0.05); border:1px solid rgba(192,132,252,0.2); border-radius:15px; padding:15px; text-align:center;">
       <div style="font-size:10px; color:#a855f7; margin-bottom:8px; font-weight:800;">BLOCH SPHERE (Q0)</div>
       <canvas id="bloch-canvas" width="150" height="150" style="margin:0 auto;"></canvas>
    </div>
    <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:15px; padding:15px;">
       <div style="font-size:10px; color:#64748b; margin-bottom:10px;">PROBABILITY_DENSITY</div>
       <div id="qc-prob" style="display:flex; flex-direction:column; gap:8px;"></div>
    </div>
  </div>
</div>

<script>
(function(){
  const wires = document.getElementById('qc-wire-container');
  const prob = document.getElementById('qc-prob');
  const count = ${dQc.qubits};
  const gatesStr = "${dQc.gates}";
  const gates = gatesStr.split(',').map(s => s.trim());
  
  for(let i=0; i<count; i++) {
    const w = document.createElement('div');
    w.style = "height:2px; background:rgba(255,255,255,0.1); position:relative; display:flex; align-items:center; padding:0 20px;";
    w.innerHTML = \`<span style="position:absolute; left:-10px; font-size:10px; color:#64748b">q\${i}</span>\`;
    
    // Add some random gates
    for(let g=0; g<3; g++) {
       const gate = gates[Math.floor(Math.random()*gates.length)];
       const gb = document.createElement('div');
       gb.style = "width:30px; height:30px; background:#c084fc; color:#000; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:14px; border-radius:4px; margin-left:30px; z-index:2; box-shadow:0 4px 10px rgba(192,132,252,0.4)";
       gb.innerText = gate;
       w.appendChild(gb);
    }
    wires.appendChild(w);
  }
  
  // Fake Probabilities
  for(let i=0; i<4; i++) {
    const p = Math.random();
    prob.innerHTML += \`
      <div style="font-size:9px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:3px;">
          <span>|0\${i}⟩</span> <span>\${(p*100).toFixed(1)}%</span>
        </div>
        <div style="height:4px; background:rgba(255,255,255,0.05); border-radius:2px; overflow:hidden;">
          <div style="height:100%; width:\${p*100}%; background:#c084fc;"></div>
        </div>
      </div>\`;
  }
  
  // Simple Bloch Sphere animation
  const canvas = document.getElementById('bloch-canvas');
  const ctx = canvas.getContext('2d');
  let angle = 0;
  function draw() {
    ctx.clearRect(0,0,150,150);
    ctx.strokeStyle = 'rgba(192,132,252,0.3)';
    ctx.lineWidth = 1;
    
    // Sphere outline
    ctx.beginPath(); ctx.arc(75,75,60,0,Math.PI*2); ctx.stroke();
    // Equator
    ctx.beginPath(); ctx.ellipse(75, 75, 60, 15, 0, 0, Math.PI*2); ctx.stroke();
    
    // State Vector
    const x = 75 + Math.cos(angle) * 50;
    const y = 75 + Math.sin(angle*0.5) * 50;
    ctx.strokeStyle = '#c084fc'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(75,75); ctx.lineTo(x,y); ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x,y,4,0,Math.PI*2); ctx.fill();
    
    angle += 0.02;
    requestAnimationFrame(draw);
  }
  draw();
})();
<\/script>`;
  });
}

// 9. Fusion Plasma Simulator
function renderFusionPlasma() {
  var f1 = makeField('fus-tem', t('fus_temp'), '150', dFus, 'temp');
  var f2 = makeField('fus-fie', t('fus_field'), '5.5', dFus, 'field');
  renderPanel('fusionplasma', 'fus_title', 'fus_sub', [f1, f2], 'fus_btn', function(){
    return `<!-- 🧪 TOKAMAK FUSION SIMULATOR - V1.1 -->
<div style="background:#0f172a; padding:25px; color:#f472b6; border-radius:20px; font-family:'Outfit',sans-serif; border:1px solid rgba(244,114,182,0.3); box-shadow:0 0 50px rgba(0,0,0,0.5);">
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
    <div>
      <h2 style="margin:0; font-size:22px; font-weight:900; background:linear-gradient(90deg, #f472b6, #fb7185); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">ITER_SIM_CORE</h2>
      <div style="font-size:11px; color:#94a3b8;">Target: ${dFus.temp} Million Kelvin | Field: ${dFus.field} Tesla</div>
    </div>
    <div id="fus-status" style="padding:6px 15px; border-radius:8px; background:rgba(74,222,128,0.1); color:#4ade80; font-size:11px; font-weight:900; border:1px solid rgba(74,222,128,0.2);">CONTAINMENT_OK</div>
  </div>

  <div id="fus-sim-wrap" style="height:300px; background:#000; border-radius:15px; overflow:hidden; position:relative; border:1px solid rgba(255,255,255,0.05); display:flex; align-items:center; justify-content:center;">
    <div style="position:absolute; inset:0; background:radial-gradient(circle, rgba(244,114,182,0.05) 0%, transparent 70%);"></div>
    <canvas id="fus-canvas" style="width:100%; height:100%;"></canvas>
    
    <div style="position:absolute; bottom:15px; right:15px; text-align:right;">
      <div style="font-size:9px; color:#64748b;">Q-FACTOR</div>
      <div id="fus-q" style="font-size:24px; font-weight:900; color:#fff;">10.4</div>
    </div>
  </div>

  <div style="margin-top:20px; background:rgba(0,0,0,0.3); border-radius:12px; padding:15px;">
    <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
      <span style="font-size:11px; font-weight:800;">PLASMA STABILITY</span>
      <span id="fus-stab" style="font-size:11px; color:#f472b6;">94%</span>
    </div>
    <div style="height:6px; background:rgba(255,255,255,0.05); border-radius:3px; overflow:hidden;">
      <div id="fus-bar" style="height:100%; width:94%; background:linear-gradient(90deg, #f472b6, #fb7185); transition:0.3s;"></div>
    </div>
  </div>
</div>

<script>
(function(){
  const canvas = document.getElementById('fus-canvas');
  const ctx = canvas.getContext('2d');
  const qEl = document.getElementById('fus-q');
  const stabEl = document.getElementById('fus-stab');
  const bar = document.getElementById('fus-bar');
  
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  
  let particles = [];
  for(let i=0; i<100; i++) {
    particles.push({
      a: Math.random() * Math.PI * 2,
      r: 60 + Math.random() * 20,
      v: 0.05 + Math.random() * 0.1,
      s: 1 + Math.random() * 2
    });
  }
  
  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    
    const cx = canvas.width/2;
    const cy = canvas.height/2;
    
    // Magnetic Fields
    ctx.strokeStyle = 'rgba(244,114,182,0.1)';
    ctx.lineWidth = 1;
    for(let i=0; i<5; i++) {
      ctx.beginPath();
      ctx.ellipse(cx, cy, 60 + i*15, 30 + i*8, 0, 0, Math.PI*2);
      ctx.stroke();
    }
    
    // Plasma Particles
    particles.forEach(p => {
      p.a += p.v;
      const x = cx + Math.cos(p.a) * (p.r + Math.sin(p.a*5)*5);
      const y = cy + Math.sin(p.a) * (p.r/2 + Math.cos(p.a*3)*5);
      
      ctx.fillStyle = '#f472b6';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#f472b6';
      ctx.beginPath();
      ctx.arc(x,y, p.s, 0, Math.PI*2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    
    if(Math.random() > 0.95) {
      const q = (10 + Math.random()).toFixed(1);
      qEl.innerText = q;
      const s = 90 + Math.random()*10;
      stabEl.innerText = s.toFixed(0) + "%";
      bar.style.width = s + "%";
    }
    
    requestAnimationFrame(draw);
  }
  draw();
})();
<\/script>`;
  });
}

// ── FUTURE TECH PRO: Render Hook ────────────────────────────
(function hookProTabs(){
  var fTechProTabs = ['bcireader','digitaltwin','qkdcrypto','noneuclidean','dnastorage','neuromorphic','satmesh','quantcircuit','fusionplasma'];

  function activateProTab(tab) {
    console.log('[PRO] ACTIVATE:', tab);
    window.activeTab = tab;
    document.querySelectorAll('.ltab').forEach(function(b){ b.classList.remove('active'); });
    var btn = document.querySelector('[data-tab="'+tab+'"]');
    if(btn) btn.classList.add('active');

    try {
        if(tab === 'bcireader')    renderBci();
        else if(tab === 'digitaltwin')  renderDigitalTwin();
        else if(tab === 'qkdcrypto')   renderQKD();
        else if(tab === 'noneuclidean') renderNonEuclidean();
        else if(tab === 'dnastorage')  renderDnaStorage();
        else if(tab === 'neuromorphic') renderNeuromorphic();
        else if(tab === 'satmesh')      renderSatelliteMesh();
        else if(tab === 'quantcircuit') renderQuantumCircuit();
        else if(tab === 'fusionplasma') renderFusionPlasma();
        console.log('[PRO] RENDER CALLED FOR:', tab, 'LEFT-BODY HTML LEN:', document.getElementById('left-body') ? document.getElementById('left-body').innerHTML.length : 'NULL');
    } catch(e) {
        console.error('[PRO] ERROR:', e);
    }
  }

  // EXPOSE GLOBALLY FOR CODE-STUDIO.JS
  window.renderBci = renderBci;
  window.renderDigitalTwin = renderDigitalTwin;
  window.renderQKD = renderQKD;
  window.renderNonEuclidean = renderNonEuclidean;
  window.renderDnaStorage = renderDnaStorage;
  window.renderNeuromorphic = renderNeuromorphic;
  window.renderSatelliteMesh = renderSatelliteMesh;
  window.renderQuantumCircuit = renderQuantumCircuit;
  window.renderFusionPlasma = renderFusionPlasma;

  // Apply translations correctly when language changes
  var oAL = window.applyLang;
  window.applyLang = function(){
    if(typeof oAL === 'function') oAL();
    var e1=document.getElementById('lbl-tab-bcireader'); if(e1)e1.textContent=t('bci_tab');
    var e2=document.getElementById('lbl-tab-digitaltwin'); if(e2)e2.textContent=t('dt_tab');
    var e3=document.getElementById('lbl-tab-qkdcrypto'); if(e3)e3.textContent=t('qkd_tab');
    var e4=document.getElementById('lbl-tab-noneuclidean'); if(e4)e4.textContent=t('ne_tab');
    var e5=document.getElementById('lbl-tab-dnastorage'); if(e5)e5.textContent=t('dna_tab');
    var e6=document.getElementById('lbl-tab-neuromorphic'); if(e6)e6.textContent=t('snn_tab');
    var e7=document.getElementById('lbl-tab-satmesh'); if(e7)e7.textContent=t('sat_tab');
    var e8=document.getElementById('lbl-tab-quantcircuit'); if(e8)e8.textContent=t('qc_tab');
    var e9=document.getElementById('lbl-tab-fusionplasma'); if(e9)e9.textContent=t('fus_tab');
    if(fTechProTabs.includes(window.activeTab)){
      activateProTab(window.activeTab);
    }
  };

  // Auto-hook click events for new tabs to this local handler
  document.querySelectorAll('.ltab').forEach(function(b){
    if(fTechProTabs.includes(b.dataset.tab)){
      b.onclick = function(e){
        e.preventDefault();
        activateProTab(this.dataset.tab);
      };
    }
  });

})();

})();
