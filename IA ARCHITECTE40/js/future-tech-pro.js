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
  var f1 = makeField('bci-dev', t('bci_device'), 'Muse', dBci, 'device');
  var f2 = makeField('bci-met', t('bci_metric'), 'Alpha / Beta', dBci, 'metric');
  renderPanel('bcireader', 'bci_title', 'bci_sub', [f1, f2], 'bci_btn', function(){
    return `<!-- BCI WEB INTEGRATION: ${dBci.device} -->
<!-- Reads EEG Telemetry via Web Bluetooth API -->
<div style="background:#0f172a; padding:40px; text-align:center; color:#fff; border-radius:12px; font-family:sans-serif;">
  <h2 style="color:#38bdf8;">🧠 Neural Interface</h2>
  <p>Connecting to: ${dBci.device}</p>
  <p>Target Metric: <span style="color:#10b981;">${dBci.metric}</span></p>
  
  <button id="connectBCI" style="padding:15px 30px; font-size:18px; border:none; border-radius:8px; background:linear-gradient(90deg, #db2777, #ec4899); color:#fff; font-weight:900; cursor:pointer; box-shadow:0 0 20px rgba(236,72,153,0.4);">
    Connect Neural Device
  </button>
  
  <div id="bciStatus" style="margin-top:20px; font-size:14px; color:#94a3b8;">Status: Disconnected</div>
  
  <div style="margin-top:40px; width:100%; height:200px; background:#1e293b; border-radius:8px; position:relative; overflow:hidden;">
    <div id="brainWave" style="position:absolute; bottom:0; left:0; width:100%; height:10%; background:linear-gradient(0deg, #10b981, transparent); transition:height 0.2s ease;"></div>
  </div>
</div>

<script>
  document.getElementById('connectBCI').addEventListener('click', async () => {
    const statusEl = document.getElementById('bciStatus');
    const waveEl = document.getElementById('brainWave');
    
    try {
      statusEl.innerText = 'Status: Requesting Bluetooth Device...';
      
      // Simulating Web Bluetooth Connection (Requires HTTPS & User Gesture)
      // Actual code would use navigator.bluetooth.requestDevice({ filters: [{ services: ['...'] }] })
      
      setTimeout(() => {
        statusEl.innerText = 'Status: Connected! Reading ${dBci.metric}...';
        document.getElementById('connectBCI').style.background = '#10b981';
        document.getElementById('connectBCI').innerText = 'Device Active';
        
        // Simulating incoming EEG stream
        setInterval(() => {
          const fakeWave = Math.random() * 100;
          waveEl.style.height = fakeWave + '%';
        }, 150);
        
      }, 1500);
      
    } catch(err) {
      statusEl.innerText = 'Error: ' + err.message;
    }
  });
<\/script>`;
  });
}

// 2. Digital Twin Sync
var dDt = { model: 'Factory_Arm_01.gltf', ws: 'wss://iot.factory.local/stream' };
function renderDigitalTwin() {
  var f1 = makeField('dt-mod', t('dt_model'), 'URL to .gltf', dDt, 'model');
  var f2 = makeField('dt-ws', t('dt_ws'), 'wss://...', dDt, 'ws');
  renderPanel('digitaltwin', 'dt_title', 'dt_sub', [f1, f2], 'dt_btn', function(){
    return `<!-- DIGITAL TWIN SYNC -->
<!-- Mirrors real-world IoT device state via WebSocket to 3D Model -->
<div style="position:relative; width:100%; height:500px; background:#000; overflow:hidden; border-radius:12px; border:1px solid #334155;">
  <div style="position:absolute; top:15px; left:15px; z-index:10; background:rgba(15,23,42,0.8); padding:15px; border-radius:8px; color:#fff; font-family:monospace; border:1px solid #38bdf8;">
    <h3 style="margin:0 0 10px 0; color:#38bdf8;">🏭 Digital Twin</h3>
    <div style="font-size:12px; color:#94a3b8; margin-bottom:5px;">Asset: ${dDt.model}</div>
    <div style="font-size:12px; color:#94a3b8; margin-bottom:5px;">Data Link: ${dDt.ws}</div>
    <div id="wsStatus" style="font-size:12px; color:#facc15; margin-top:10px;">⬤ Connecting to stream...</div>
    <div id="sensorData" style="font-size:14px; color:#10b981; margin-top:5px; font-weight:bold;">Joint Angle: 0°</div>
  </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
<script>
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 500, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, 500);
  document.currentScript.previousElementSibling.appendChild(renderer.domElement);

  // Twin Representation
  const geometry = new THREE.BoxGeometry(1, 4, 1);
  const material = new THREE.MeshPhongMaterial({ color: 0x38bdf8, wireframe: true });
  const twinArm = new THREE.Mesh(geometry, material);
  scene.add(twinArm);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x404040));

  camera.position.z = 7;

  // Render loop
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  // Simulated IoT WebSocket Stream
  setTimeout(() => {
    document.getElementById('wsStatus').innerHTML = '<span style="color:#10b981;">⬤ Live Stream Active</span>';
    
    let angle = 0;
    setInterval(() => {
      // Simulate real-world sensor drift
      angle += (Math.random() - 0.4) * 0.1;
      twinArm.rotation.z = angle;
      document.getElementById('sensorData').innerText = 'Joint Angle: ' + (angle * (180/Math.PI)).toFixed(2) + '°';
    }, 100);
  }, 2000);
<\/script>`;
  });
}

// 3. QKD Crypto
var dQkd = { keysize: '256', noise: '5' };
function renderQKD() {
  var f1 = makeField('qkd-key', t('qkd_keysize'), '128 / 256', dQkd, 'keysize');
  var f2 = makeField('qkd-noi', t('qkd_noise'), '0-15%', dQkd, 'noise');
  renderPanel('qkdcrypto', 'qkd_title', 'qkd_sub', [f1, f2], 'qkd_btn', function(){
    return `<!-- QUANTUM KEY DISTRIBUTION (BB84 Protocol Sim) -->
<div style="background:#0f172a; padding:30px; color:#fff; font-family:monospace; border-radius:12px; border:1px solid #c084fc;">
  <h2 style="color:#c084fc;">🔐 QKD Link (BB84)</h2>
  <div style="display:flex; justify-content:space-between; margin-top:20px;">
    <div style="background:#1e293b; padding:15px; border-radius:8px; width:45%;">
      <h3 style="margin:0; color:#38bdf8;">Alice (Sender)</h3>
      <p style="font-size:12px; color:#94a3b8;">Preparing Qubits...</p>
      <div id="aliceStream" style="font-size:10px; word-wrap:break-word; color:#38bdf8;"></div>
    </div>
    
    <div style="background:#1e293b; padding:15px; border-radius:8px; width:45%;">
      <h3 style="margin:0; color:#10b981;">Bob (Receiver)</h3>
      <p style="font-size:12px; color:#94a3b8;">Measuring Qubits...</p>
      <div id="bobStream" style="font-size:10px; word-wrap:break-word; color:#10b981;"></div>
    </div>
  </div>
  
  <div style="margin-top:20px; text-align:center;">
    <button id="startQKD" style="padding:10px 20px; background:#c084fc; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">Initialize Quantum Channel</button>
  </div>
  
  <div style="margin-top:20px; background:#000; padding:15px; border-radius:6px;">
    <h4 style="margin:0; color:#fbbf24;">Shared Secure Key (Sifted):</h4>
    <div id="finalKey" style="font-size:14px; margin-top:10px; color:#facc15; word-wrap:break-word; min-height:40px;">[Awaiting transmission]</div>
    <div id="qkdStats" style="font-size:12px; color:#94a3b8; margin-top:10px;">Noise Tolerance: ${dQkd.noise}%</div>
  </div>
</div>

<script>
  document.getElementById('startQKD').addEventListener('click', () => {
    const keySize = ${dQkd.keysize};
    let aStream = '', bStream = '', sifted = '';
    
    document.getElementById('aliceStream').innerText = 'Generating...';
    document.getElementById('bobStream').innerText = 'Receiving...';
    
    setTimeout(() => {
      for(let i=0; i<keySize; i++) {
        const bitA = Math.random() > 0.5 ? '1' : '0';
        const basisA = Math.random() > 0.5 ? '+' : 'x';
        const basisB = Math.random() > 0.5 ? '+' : 'x';
        
        aStream += basisA === '+' ? (bitA==='1'?'↑':'→') : (bitA==='1'?'↗':'↘');
        
        // Simulating quantum measurement & noise
        let bitB = bitA;
        if(basisA !== basisB || Math.random() < (${dQkd.noise} / 100)) {
           bitB = Math.random() > 0.5 ? '1' : '0';
        }
        
        bStream += basisB === '+' ? (bitB==='1'?'↑':'→') : (bitB==='1'?'↗':'↘');
        
        // Sifting process
        if(basisA === basisB) {
           sifted += bitB;
        }
      }
      
      document.getElementById('aliceStream').innerText = aStream;
      document.getElementById('bobStream').innerText = bStream;
      document.getElementById('finalKey').innerText = sifted;
      document.getElementById('qkdStats').innerText = 'Raw Bits: ' + keySize + ' | Sifted Key Length: ' + sifted.length;
    }, 1000);
  });
<\/script>`;
  });
}

// 4. Non-Euclidean Engine
var dNe = { type: 'Hyperbolic', color: 'Purple' };
function renderNonEuclidean() {
  var f1 = makeField('ne-type', t('ne_type'), 'Hyperbolic / Torus', dNe, 'type');
  var f2 = makeField('ne-col', t('ne_color'), 'Purple / Red', dNe, 'color');
  renderPanel('noneuclidean', 'ne_title', 'ne_sub', [f1, f2], 'ne_btn', function(){
    // Use proper escaping for nested template literals by escaping the backticks
    return `<!-- NON-EUCLIDEAN SHADER ENGINE -->
<style>body { margin:0; overflow:hidden; background:#000; }<\/style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
<div style="position:absolute; top:20px; width:100%; text-align:center; color:white; font-family:sans-serif; pointer-events:none; z-index:100;">
  <h3>🌀 Non-Euclidean Space: ${dNe.type}</h3>
</div>
<script>
  // Raymarching Shader for Non-Euclidean / Fractal Geometry
  const fragmentShader = \`
    uniform float time;
    uniform vec2 resolution;
    
    #define MAX_STEPS 100
    #define MAX_DIST 100.0
    #define SURF_DIST 0.01

    mat2 rot(float a) {
        float s = sin(a), c = cos(a);
        return mat2(c, -s, s, c);
    }

    float getDist(vec3 p) {
        vec3 bp = p;
        for(int i=0; i<4; i++) {
            bp.xz = abs(bp.xz) - 1.0;
            bp.xz *= rot(time * 0.2);
            bp.xy *= rot(time * 0.1);
        }
        
        float d = length(bp) - 1.2;
        float planeDist = p.y + 2.0;
        return min(d, planeDist);
    }

    vec3 getNormal(vec3 p) {
        float d = getDist(p);
        vec2 e = vec2(0.01, 0);
        vec3 n = d - vec3(
            getDist(p - e.xyy),
            getDist(p - e.yxy),
            getDist(p - e.yyx)
        );
        return normalize(n);
    }

    void mainImage(out vec4 fragColor, in vec2 fragCoord) {
        vec2 uv = (fragCoord - 0.5 * resolution.xy) / resolution.y;
        
        vec3 ro = vec3(0, 0, -3); 
        vec3 rd = normalize(vec3(uv.x, uv.y, 1)); 
        
        rd.xz *= rot(time*0.1);
        ro.xz *= rot(time*0.1);

        float d0 = 0.0;
        
        for(int i = 0; i < MAX_STEPS; i++) {
            vec3 p = ro + rd * d0;
            float dS = getDist(p);
            d0 += dS;
            if(d0 > MAX_DIST || abs(dS) < SURF_DIST) break;
        }
        
        vec3 col = vec3(0.0);
        
        if(d0 < MAX_DIST) {
            vec3 p = ro + rd * d0;
            vec3 n = getNormal(p);
            vec3 lightDir = normalize(vec3(1, 2, -1));
            float dif = clamp(dot(n, lightDir), 0.0, 1.0);
            
            vec3 baseColor = vec3(0.6, 0.1, 0.8); 
            if ("${dNe.color.toLowerCase()}" == "red") baseColor = vec3(0.8, 0.1, 0.1);
            else if ("${dNe.color.toLowerCase()}" == "green") baseColor = vec3(0.1, 0.8, 0.2);
            else if ("${dNe.color.toLowerCase()}" == "blue") baseColor = vec3(0.1, 0.3, 0.9);
            
            col = baseColor * dif;
            
            float fog = 1.0 / (1.0 + d0 * d0 * 0.05);
            col *= fog;
        }
        
        fragColor = vec4(col, 1.0);
    }

    void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
    }
  \`;

  const vertexShader = \`
    void main() {
        gl_Position = vec4(position, 1.0);
    }
  \`;

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.currentScript.parentElement.appendChild(renderer.domElement);

  const geometry = new THREE.PlaneGeometry(2, 2);
  const uniforms = {
      time: { value: 0 },
      resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
  };
  
  const material = new THREE.ShaderMaterial({
      vertexShader, fragmentShader, uniforms
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  function animate() {
      requestAnimationFrame(animate);
      uniforms.time.value += 0.05;
      renderer.render(scene, camera);
  }
  animate();
<\/script>`;
  });
}

// 5. DNA Storage Encoder
var dDna = { input: 'HELLO WORLD', format: 'String (UTF-8)' };
function renderDnaStorage() {
  var f1 = makeField('dna-in', t('dna_input'), 'Data', dDna, 'input');
  var f2 = makeField('dna-fmt', t('dna_format'), 'String/Binary', dDna, 'format');
  renderPanel('dnastorage', 'dna_title', 'dna_sub', [f1, f2], 'dna_btn', function(){
    return `<!-- DNA DATA STORAGE ENCODER -->
<div style="background:#020617; padding:30px; font-family:monospace; color:#34d399; border-radius:12px; border:1px solid #10b981;">
  <h2 style="color:#10b981;">🧬 Biological Data Encoder</h2>
  <div style="margin-bottom:20px;">
    <strong>Input:</strong> <span style="color:#e2e8f0;">${dDna.input}</span><br>
    <strong>Format:</strong> <span style="color:#94a3b8;">${dDna.format}</span>
  </div>
  
  <div style="background:#0f172a; padding:15px; border-radius:6px; margin-bottom:20px;">
    <h4 style="margin:0 0 10px 0; color:#cbd5e1;">Binary Stream:</h4>
    <div id="binaryOut" style="word-break:break-all; font-size:12px; color:#64748b;"></div>
  </div>

  <div style="background:#000; padding:20px; border-radius:6px; border-left:4px solid #10b981;">
    <h3 style="margin:0 0 10px 0; color:#34d399;">Nucleotide Sequence (ACGT):</h3>
    <div id="dnaOut" style="word-break:break-all; font-size:16px; letter-spacing:2px; font-weight:bold;"></div>
  </div>
  
  <button id="synthesizeBtn" style="margin-top:20px; padding:10px 20px; background:#10b981; color:#fff; border:none; border-radius:6px; font-weight:bold; cursor:pointer;">
    Begin Biological Synthesis
  </button>
</div>

<script>
  const input = "${dDna.input}";
  let binaryStr = '';
  
  // Convert string to binary
  for(let i=0; i<input.length; i++) {
    binaryStr += input[i].charCodeAt(0).toString(2).padStart(8, '0');
  }
  document.getElementById('binaryOut').innerText = binaryStr;
  
  // Encode Binary to DNA: 00=A, 01=C, 10=G, 11=T
  const dnaMap = {'00':'A', '01':'C', '10':'G', '11':'T'};
  let dnaStr = '';
  for(let i=0; i<binaryStr.length; i+=2) {
    const pair = binaryStr.substring(i, i+2);
    // Pad if necessary
    const safePair = pair.length === 1 ? pair + '0' : pair;
    dnaStr += dnaMap[safePair];
  }
  
  let i = 0;
  const target = document.getElementById('dnaOut');
  
  document.getElementById('synthesizeBtn').addEventListener('click', () => {
    target.innerText = '';
    i = 0;
    const interval = setInterval(() => {
      if(i < dnaStr.length) {
        target.innerText += dnaStr[i];
        i++;
      } else {
        clearInterval(interval);
      }
    }, 20);
  });
<\/script>`;
  });
}

// 6. Neuromorphic AI
var dSnn = { neurons: '1000', synapses: '0.05' };
function renderNeuromorphic() {
  var f1 = makeField('snn-neu', t('snn_neurons'), '1000', dSnn, 'neurons');
  var f2 = makeField('snn-syn', t('snn_synapses'), '0.01 - 0.1', dSnn, 'synapses');
  renderPanel('neuromorphic', 'snn_title', 'snn_sub', [f1, f2], 'snn_btn', function(){
    return `<!-- NEUROMORPHIC SPIKING NEURAL NETWORK (SNN) -->
<div style="background:#1e1b4b; padding:30px; border-radius:12px; border:1px solid #facc15; font-family:sans-serif; color:#fff;">
  <h2 style="color:#facc15; margin-top:0;">⚡ Neuromorphic Simulator</h2>
  <div style="font-size:12px; color:#94a3b8; margin-bottom:20px;">
    Neurons: ${dSnn.neurons} | Synaptic Density: ${(parseFloat(dSnn.synapses)*100).toFixed(1)}%
  </div>
  
  <canvas id="snnCanvas" width="500" height="300" style="background:#000; border-radius:8px; width:100%;"></canvas>
  
  <div style="display:flex; justify-content:space-between; margin-top:15px; font-family:monospace; font-size:12px;">
    <div>Global Spike Rate: <span id="spikeRate" style="color:#facc15;">0 Hz</span></div>
    <div>Energy Consumption: <span style="color:#4ade80;">Ultra-Low (picoJoules)</span></div>
  </div>
</div>

<script>
  const canvas = document.getElementById('snnCanvas');
  const ctx = canvas.getContext('2d');
  
  const N = Math.min(${dSnn.neurons}, 2000); // limit for visual perf
  const neurons = [];
  
  // Initialize Leaky Integrate-and-Fire Neurons
  for(let i=0; i<N; i++) {
    neurons.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      v: Math.random() * -65, // membrane potential
      firing: 0
    });
  }
  
  let spikeCount = 0;
  
  function step() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    spikeCount = 0;
    
    for(let i=0; i<N; i++) {
      let n = neurons[i];
      
      // Simulate input current & leakage
      n.v += Math.random() * 5 - 1.5; 
      
      if(n.firing > 0) n.firing--;
      
      // Action Potential (Spike)
      if(n.v > -40) { 
        n.v = -70; // Reset
        n.firing = 5;
        spikeCount++;
        
        // Synaptic transmission (visual only)
        if(Math.random() < 0.1) {
           const target = neurons[Math.floor(Math.random() * N)];
           ctx.beginPath();
           ctx.moveTo(n.x, n.y);
           ctx.lineTo(target.x, target.y);
           ctx.strokeStyle = 'rgba(250, 204, 21, 0.1)';
           ctx.stroke();
        }
      }
      
      // Draw neuron
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.firing > 0 ? 2 : 1, 0, Math.PI*2);
      ctx.fillStyle = n.firing > 0 ? '#facc15' : '#4f46e5';
      ctx.fill();
    }
    
    document.getElementById('spikeRate').innerText = (spikeCount * 60).toFixed(0) + ' Hz';
    requestAnimationFrame(step);
  }
  
  step();
<\/script>`;
  });
}

// ── FUTURE TECH PRO: Render Hook ────────────────────────────
(function hookProTabs(){
  var fTechProTabs = ['bcireader','digitaltwin','qkdcrypto','noneuclidean','dnastorage','neuromorphic'];

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
        console.log('[PRO] RENDER CALLED FOR:', tab, 'LEFT-BODY HTML LEN:', document.getElementById('left-body') ? document.getElementById('left-body').innerHTML.length : 'NULL');
    } catch(e) {
        console.error('[PRO] ERROR:', e);
    }
  }

  // Override global renderTab
  var originalRender = window.renderTab;
  console.log('[PRO] Overriding renderTab. originalRender=', !!originalRender);
  window.renderTab = function(tab) {
    console.log('[PRO] renderTab hook called with:', tab);
    if(fTechProTabs.includes(tab)) {
      activateProTab(tab);
    } else if(originalRender && originalRender !== window.renderTab) {
      originalRender(tab);
    }
  };

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
    if(fTechProTabs.includes(window.activeTab)){
      activateProTab(window.activeTab);
    }
  };

})();

})();
