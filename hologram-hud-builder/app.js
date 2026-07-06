/* =============================================================
   SCI-FI HOLOGRAM HUD BUILDER - LOGIC & GRAPHICS
   ============================================================= */

// --- 1. GLOBAL STATE & CONFIG ---
let scene, camera, renderer, controls;
let activeColor = 'cyan';
let activeColorSecondary = 'cyan';
let rotationSpeed = 1.0;
let soundEnabled = true;
let voiceEnabled = true;
let currentLang = 'fr';
let explodedFactor = 0;
let activePreset = 'reactor';

// Speech Synthesis AI Telemetry
function speakAI(textFr, textEn) {
    if (!voiceEnabled || !window.speechSynthesis) return;
    try {
        window.speechSynthesis.cancel();
        const text = (currentLang === 'fr') ? textFr : textEn;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = (currentLang === 'fr') ? 'fr-FR' : 'en-US';
        utterance.pitch = 0.9;
        utterance.rate = 1.05;
        window.speechSynthesis.speak(utterance);
    } catch(e){}
}

let clockGroup, clockMesh, clockCanvas, clockCtx, clockTexture;
let clockVisible = true;
let clockExport = true;
let clockPosY = 4.5;
let clockPosX = 0.0;
let clockPosZ = 0.0;
let clockScale = 1.0;

let globeGroup, globeMesh;
let globeVisible = false;

let visualizerGroup, visBars = [];
let visVisible = true;

// --- PARTICLE NEBULA ---
let nebulaGroup = null;
let nebulaParticles = null;
let nebulaVisible = true;


const hologramTranslations = {
    fr: {
        btn_back: "Retour",
        label_preset: "Scénario:",
        sec_projection: "Paramètres de Projection",
        sec_clock: "Horloge 3D & Modules",
        label_primary_color: "Couleur Néon Principale",
        label_secondary_color: "Couleur d'Accent Secondaire",
        label_exploded: "Vue Éclatée 3D",
        label_speed: "Vitesse de Rotation",
        label_scanline: "Contraste des Lignes",
        label_glitch: "Fréquence du Glitch",
        label_clock_show: "Horloge Numérique 3D",
        label_clock_export: "Inclure l'Horloge à l'Exportation",
        label_globe_show: "Globe Terrestre 3D Wireframe",
        label_vis_show: "Égaliseur de Fréquence 3D",
        label_clock_y: "Hauteur Y Horloge",
        label_clock_x: "Décalage X Horloge",
        label_clock_scale: "Échelle Horloge",
        voice_on: "Voix: ON",
        voice_off: "Voix: OFF",
        audio_on: "Audio: ON",
        audio_off: "Audio: OFF",
        mic_on: "Mic: ON",
        mic_off: "Mic: OFF",
        scenarios: {
            reactor: "Scénario Réacteur Quantique Activé",
            navigation: "Scénario Navigation Spatiale Activé",
            vitals: "Scénario Signaux Vitaux Cybernétiques Activé",
            neural: "Scénario Réseau Neural IA Activé",
            brain: "Scénario Réseau Neural Cyberpunk Activé",
            radar: "Scénario Radar Tactique Spatial Activé",
            dna: "Scénario ADN Double Hélice Activé",
            mech: "Scénario Scanner Mecha X-Ray Activé"
        }
    },
    en: {
        btn_back: "Back",
        label_preset: "Scenario:",
        sec_projection: "Projection Settings",
        sec_clock: "3D Real-Time Clock & Modules",
        label_primary_color: "Primary Neon Color",
        label_secondary_color: "Secondary Accent Color",
        label_exploded: "3D Exploded View",
        label_speed: "Rotation Speed",
        label_scanline: "Scanline Contrast",
        label_glitch: "Glitch Frequency",
        label_clock_show: "Show 3D Digital Clock",
        label_clock_export: "Include Clock in Code Export",
        label_globe_show: "3D Wireframe World Globe",
        label_vis_show: "3D Live Frequency Equalizer",
        label_clock_y: "Clock Y Height",
        label_clock_x: "Clock X Offset",
        label_clock_scale: "Clock Scale",
        voice_on: "Voice: ON",
        voice_off: "Voice: OFF",
        audio_on: "Audio: ON",
        audio_off: "Audio: OFF",
        mic_on: "Mic: ON",
        mic_off: "Mic: OFF",
        scenarios: {
            reactor: "Quantum Core Scenario Online",
            navigation: "Deep Space Navigation Online",
            vitals: "Cybernetic Medical Vitals Online",
            neural: "AI Neural Network Online",
            brain: "Cyberpunk Neural Network Online",
            radar: "Spacecraft Tactical Radar Online",
            dna: "Quantum Double Helix Online",
            mech: "Mech X-Ray Scanner Online"
        }
    }
};

function applyHologramLang(lang) {
    currentLang = lang;
    const btnFr = document.getElementById('btn-lang-fr');
    const btnEn = document.getElementById('btn-lang-en');
    if (btnFr) {
        btnFr.style.background = lang === 'fr' ? 'var(--hud-accent)' : 'transparent';
        btnFr.style.color = lang === 'fr' ? '#000' : '#94a3b8';
    }
    if (btnEn) {
        btnEn.style.background = lang === 'en' ? 'var(--hud-accent)' : 'transparent';
        btnEn.style.color = lang === 'en' ? '#000' : '#94a3b8';
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (hologramTranslations[lang] && hologramTranslations[lang][key]) {
            el.textContent = hologramTranslations[lang][key];
        }
    });

    const vBtn = document.getElementById('txt-voice');
    if (vBtn) vBtn.textContent = voiceEnabled ? hologramTranslations[lang].voice_on : hologramTranslations[lang].voice_off;
    const aBtn = document.getElementById('txt-sound');
    if (aBtn) aBtn.textContent = soundEnabled ? hologramTranslations[lang].audio_on : hologramTranslations[lang].audio_off;
    const mBtn = document.getElementById('txt-mic');
    if (mBtn) mBtn.textContent = micEnabled ? hologramTranslations[lang].mic_on : hologramTranslations[lang].mic_off;
}

// Three.js groups to manage layers
let gridGroup, radarGroup, waveGroup, coreGroup;
let coreMesh, ring1, ring2, radarLine, waveLines = [];
let reticleMesh; // 3D laser target crosshair

// Raycaster & Mouse tracking
let raycaster, mouse;
let isTargetLocked = false;
let lastLockBeepTime = 0;

// Audio Reactivity (Microphone) variables
let micEnabled = false;
let micStream = null;
let micSource = null;
let analyserNode = null;
let freqData = null;

// Custom 3D Model Importer variables
let customModel = null;
let customModelName = '';
let customModelScale = 1.0;
let customModelY = 0.0;
let customModelOrbit = true;
let customModelMaterialMode = 'wireframe';
let customModelSliceY = 3.0;
let customModelSliceX = 3.0;
let customModelSliceZ = 3.0;
const localPlanes = [
    new THREE.Plane(new THREE.Vector3(0, -1, 0), 3.0),
    new THREE.Plane(new THREE.Vector3(-1, 0, 0), 3.0),
    new THREE.Plane(new THREE.Vector3(0, 0, -1), 3.0)
];
const annotations = [];
let uploadedModelBase64 = '';
let uploadedModelExtension = '';

// Scanner visual plane
let scanPlane = null;

const colorMap = {
    cyan: { hex: '#00f3ff', rgb: '0, 243, 255', three: 0x00f3ff },
    purple: { hex: '#bd00ff', rgb: '189, 0, 255', three: 0xbd00ff },
    emerald: { hex: '#00ff66', rgb: '0, 255, 102', three: 0x00ff66 },
    gold: { hex: '#ffd700', rgb: '255, 215, 0', three: 0xffd700 },
    orange: { hex: '#ff5e00', rgb: '255, 94, 0', three: 0xff5e00 }
};

// --- 2. WEB AUDIO SYNTHESIZER ---
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playSound(type) {
    if (!soundEnabled) return;
    initAudio();
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'hover') {
        // High-pitched short digital blip
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(1800, now + 0.05);
        gainNode.gain.setValueAtTime(0.02, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
    } else if (type === 'click') {
        // Low-frequency clicky hum
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.08);
        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
    } else if (type === 'sonar') {
        // Echoing sonar sweep
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.4);
        
        // Sonar volume envelope
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.linearRampToValueAtTime(0.05, now + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
        
        osc.start(now);
        osc.stop(now + 0.4);
    } else if (type === 'error') {
        // Warning alert sound
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.setValueAtTime(170, now + 0.08);
        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
    } else if (type === 'lock-alert') {
        // High frequency lock sound
        osc.type = 'square';
        osc.frequency.setValueAtTime(980, now);
        osc.frequency.setValueAtTime(880, now + 0.04);
        gainNode.gain.setValueAtTime(0.08, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
    }
}

// --- 3. DIAGNOSTICS LOGGING ---
function logTerminal(message) {
    const term = document.getElementById('terminal-diagnostics');
    if (!term) return;
    const line = document.createElement('div');
    const timestamp = new Date().toLocaleTimeString().split(' ')[0];
    line.innerHTML = `<span style="color: #888;">[${timestamp}]</span> ${message}`;
    term.appendChild(line);
    term.scrollTop = term.scrollHeight;
}

let telemetryTimeout = null;

function updateTelemetry() {
    if (telemetryTimeout) clearTimeout(telemetryTimeout);
    telemetryTimeout = setTimeout(runTelemetryCalculation, 50);
}

function runTelemetryCalculation() {
    const target = customModel ? customModel : coreMesh;
    if (!target) return;
    
    let totalTriangles = 0;
    let activeTriangles = 0;
    let volumeSum = 0;
    const centerOfMass = new THREE.Vector3();
    let keptVerticesCount = 0;
    
    target.updateMatrixWorld(true);
    
    target.traverse(c => {
        if (c.isMesh && !c.userData.isOutline) {
            const geom = c.geometry;
            if (!geom || !geom.attributes.position) return;
            
            const posAttr = geom.attributes.position;
            const indexAttr = geom.index;
            
            const indices = [];
            if (indexAttr) {
                for (let i = 0; i < indexAttr.count; i++) indices.push(indexAttr.getX(i));
            } else {
                for (let i = 0; i < posAttr.count; i++) indices.push(i);
            }
            
            totalTriangles += indices.length / 3;
            
            const v0 = new THREE.Vector3();
            const v1 = new THREE.Vector3();
            const v2 = new THREE.Vector3();
            
            for (let i = 0; i < indices.length; i += 3) {
                const idx0 = indices[i];
                const idx1 = indices[i+1];
                const idx2 = indices[i+2];
                
                v0.set(posAttr.getX(idx0), posAttr.getY(idx0), posAttr.getZ(idx0)).applyMatrix4(c.matrixWorld);
                v1.set(posAttr.getX(idx1), posAttr.getY(idx1), posAttr.getZ(idx1)).applyMatrix4(c.matrixWorld);
                v2.set(posAttr.getX(idx2), posAttr.getY(idx2), posAttr.getZ(idx2)).applyMatrix4(c.matrixWorld);
                
                let isClipped = false;
                if (customModelSliceY < 3.0) {
                    if (v0.y > customModelSliceY || v1.y > customModelSliceY || v2.y > customModelSliceY) isClipped = true;
                }
                if (customModelSliceX < 3.0) {
                    if (v0.x > customModelSliceX || v1.x > customModelSliceX || v2.x > customModelSliceX) isClipped = true;
                }
                if (customModelSliceZ < 3.0) {
                    if (v0.z > customModelSliceZ || v1.z > customModelSliceZ || v2.z > customModelSliceZ) isClipped = true;
                }
                
                if (!isClipped) {
                    activeTriangles++;
                    centerOfMass.add(v0).add(v1).add(v2);
                    keptVerticesCount += 3;
                    
                    const term = (v0.x * v1.y * v2.z + v1.x * v2.y * v0.z + v2.x * v0.y * v1.z 
                                - v2.x * v1.y * v0.z - v1.x * v0.y * v2.z - v0.x * v2.y * v1.z) / 6.0;
                    volumeSum += term;
                }
            }
        }
    });
    
    if (keptVerticesCount > 0) {
        centerOfMass.divideScalar(keptVerticesCount);
    }
    
    const displayVolume = Math.abs(volumeSum);
    
    animateCounter('telemetry-polygons', activeTriangles);
    animateCounter('telemetry-total-polygons', totalTriangles);
    
    const volEl = document.getElementById('telemetry-volume');
    if (volEl) volEl.innerText = displayVolume.toFixed(3) + " m³";
    
    const comEl = document.getElementById('telemetry-com');
    if (comEl) comEl.innerText = `[${centerOfMass.x.toFixed(2)}, ${centerOfMass.y.toFixed(2)}, ${centerOfMass.z.toFixed(2)}]`;
    
    const syEl = document.getElementById('telemetry-val-y');
    if (syEl) syEl.innerText = customModelSliceY < 3.0 ? customModelSliceY.toFixed(2) + "m" : "OFF";
    
    const sxEl = document.getElementById('telemetry-val-x');
    if (sxEl) sxEl.innerText = customModelSliceX < 3.0 ? customModelSliceX.toFixed(2) + "m" : "OFF";
    
    const szEl = document.getElementById('telemetry-val-z');
    if (szEl) szEl.innerText = customModelSliceZ < 3.0 ? customModelSliceZ.toFixed(2) + "m" : "OFF";
}

function animateCounter(id, targetVal) {
    const el = document.getElementById(id);
    if (!el) return;
    const startVal = parseInt(el.innerText.replace(/,/g, '')) || 0;
    if (startVal === targetVal) return;
    
    const duration = 200;
    const startTime = performance.now();
    
    function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentVal = Math.round(startVal + progress * (targetVal - startVal));
        el.innerText = currentVal.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    requestAnimationFrame(update);
}

// --- 4. THREE.JS HOLOGRAM ENGINE ---
function init3D() {
    const container = document.getElementById('stage-container');
    if (!container) return;

    // Scene setup
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030308, 0.005);

    // Camera setup
    camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 8, 18);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    const w = container.clientWidth || (window.innerWidth * 0.6);
    const h = container.clientHeight || (window.innerHeight * 0.7);
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.localClippingEnabled = true;
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.zIndex = '1';
    container.insertBefore(renderer.domElement, container.firstChild);

    // Controls setup with OrbitControls fallback safeguard
    try {
        if (typeof THREE.OrbitControls === 'function') {
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.maxPolarAngle = Math.PI / 2 + 0.1;
            controls.minDistance = 5;
            controls.maxDistance = 40;
        }
    } catch(err) {
        console.warn('OrbitControls fallback:', err);
    }

    // Groups
    gridGroup = new THREE.Group();
    radarGroup = new THREE.Group();
    waveGroup = new THREE.Group();
    coreGroup = new THREE.Group();

    scene.add(gridGroup);
    scene.add(radarGroup);
    scene.add(waveGroup);
    scene.add(coreGroup);

    // Raycast positioning
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2(-999, -999);

    // Initialise layers
    buildGrid();
    buildRadar();
    buildWaveforms();
    buildCore();
    buildReticle();
    build3DClock();
    build3DGlobe();
    build3DVisualizer();
    buildParticleNebula();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 20, 10);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x00f3ff, 2.0, 50);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // Handle resizing
    window.addEventListener('resize', onWindowResize);

    logTerminal('WebGL 3D Render Engine online.');
}

function init2DFallback(container) {
    is2DFallback = true;
    container.innerHTML = '';
    
    canvas2D = document.createElement('canvas');
    canvas2D.width = container.clientWidth || 800;
    canvas2D.height = container.clientHeight || 600;
    canvas2D.style.position = 'absolute';
    canvas2D.style.top = '0';
    canvas2D.style.left = '0';
    canvas2D.style.width = '100%';
    canvas2D.style.height = '100%';
    canvas2D.style.zIndex = '1';
    container.appendChild(canvas2D);
    
    ctx2D = canvas2D.getContext('2d');
    
    const overlaysHTML = `
        <div class="hologram-overlay"></div>
        <div class="hud-scaffolding">
            <div class="hud-corner top-left"></div>
            <div class="hud-corner top-right"></div>
            <div class="hud-corner bottom-left"></div>
            <div class="hud-corner bottom-right"></div>
            <div class="hud-coordinates">SYSTEM LNK: SECURE | SEC-COORD: 45.981A // 002.E</div>
            <div class="hud-status-indicator">
                <span class="pulse-dot"></span>
                <span id="system-status-text">PROJECTION STABLE</span>
            </div>
        </div>
        <div id="annotation-layer" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 5;">
            <svg id="annotation-svg" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; pointer-events: none;"></svg>
        </div>
        <div id="hud-telemetry-panel" class="hud-telemetry-overlay">
            <div class="telemetry-title"><i class="fa-solid fa-gauge-high"></i> CORE TELEMETRY</div>
            <div class="telemetry-row"><span>STATUS:</span> <span id="telemetry-status" class="status-active">READY</span></div>
            <div class="telemetry-row"><span>ACTIVE POLYGONS:</span> <span id="telemetry-polygons">64</span></div>
            <div class="telemetry-row"><span>TOTAL POLYGONS:</span> <span id="telemetry-total-polygons">64</span></div>
            <div class="telemetry-row"><span>EST. VOLUME:</span> <span id="telemetry-volume">38.958 m³</span></div>
            <div class="telemetry-row"><span>CENTER OF MASS:</span> <span id="telemetry-com">[0.00, 0.00, 0.00]</span></div>
            <div class="telemetry-row"><span>SLICE DEPTH Y:</span> <span id="telemetry-val-y">OFF</span></div>
            <div class="telemetry-row"><span>SLICE DEPTH X:</span> <span id="telemetry-val-x">OFF</span></div>
            <div class="telemetry-row"><span>SLICE DEPTH Z:</span> <span id="telemetry-val-z">OFF</span></div>
        </div>
    `;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = overlaysHTML;
    while (tempDiv.firstChild) {
        container.appendChild(tempDiv.firstChild);
    }
    
    animate2D();
}

function animate2D() {
    if (!is2DFallback || !ctx2D || !canvas2D) return;
    requestAnimationFrame(animate2D);
    
    angle2D += 0.015 * rotationSpeed;
    const w = canvas2D.width;
    const h = canvas2D.height;
    const cx = w / 2;
    const cy = h / 2;
    const colorHex = (colorMap[activeColor] && colorMap[activeColor].hex) ? colorMap[activeColor].hex : '#00f3ff';
    const secHex = (colorMap[activeColorSecondary] && colorMap[activeColorSecondary].hex) ? colorMap[activeColorSecondary].hex : colorHex;
    
    ctx2D.clearRect(0, 0, w, h);
    
    ctx2D.save();
    ctx2D.strokeStyle = colorHex;
    ctx2D.lineWidth = 1.5;
    ctx2D.globalAlpha = 0.4;
    
    for (let r of [80, 160, 240]) {
        ctx2D.beginPath();
        ctx2D.arc(cx, cy, r, 0, Math.PI * 2);
        ctx2D.stroke();
    }
    
    ctx2D.beginPath();
    ctx2D.moveTo(cx, cy);
    ctx2D.lineTo(cx + Math.cos(angle2D) * 240, cy + Math.sin(angle2D) * 240);
    ctx2D.stroke();
    
    ctx2D.globalAlpha = 0.85;
    ctx2D.shadowColor = colorHex;
    ctx2D.shadowBlur = 15;
    
    ctx2D.beginPath();
    const sides = activePreset === 'reactor' ? 6 : (activePreset === 'navigation' ? 4 : 8);
    const radius = 100;
    for (let i = 0; i < sides; i++) {
        const a = angle2D + (i / sides) * Math.PI * 2;
        const x = cx + Math.cos(a) * radius;
        const y = cy + Math.sin(a) * (radius * 0.6);
        if (i === 0) ctx2D.moveTo(x, y);
        else ctx2D.lineTo(x, y);
    }
    ctx2D.closePath();
    ctx2D.stroke();
    
    ctx2D.strokeStyle = secHex;
    ctx2D.shadowColor = secHex;
    ctx2D.beginPath();
    ctx2D.ellipse(cx, cy, 140, 60, -angle2D, 0, Math.PI * 2);
    ctx2D.stroke();

    if (clockVisible) {
        const now = new Date();
        const timeStr = now.toTimeString().split(' ')[0] + '.' + String(Math.floor(now.getMilliseconds()/10)).padStart(2,'0');
        ctx2D.font = '900 28px "Orbitron", sans-serif';
        ctx2D.fillStyle = colorHex;
        ctx2D.textAlign = 'center';
        ctx2D.fillText(timeStr, cx, cy - 140 + clockPosY * 10);
    }
    
    ctx2D.restore();
    logTerminal('Hologram coordinate layers built.');
}

function onWindowResize() {
    const container = document.getElementById('stage-container');
    if (!container || !camera || !renderer) return;
    const w = container.clientWidth || (window.innerWidth * 0.6);
    const h = container.clientHeight || (window.innerHeight * 0.7);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
}

// --- 5. GEOMETRY BUILDERS ---
function buildGrid() {
    gridGroup.clear();
    const size = 30;
    const divisions = 30;
    const color = colorMap[activeColor].three;

    // Horizontal main grid plane
    const gridHelper = new THREE.GridHelper(size, divisions, color, color);
    gridHelper.position.y = -2;
    gridHelper.material.opacity = 0.5;
    gridHelper.material.transparent = true;
    gridGroup.add(gridHelper);

    // Outer boundary ring
    const ringGeo = new THREE.RingGeometry(14.8, 15, 64);
    const ringMat = new THREE.MeshBasicMaterial({
        color: color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = -1.99;
    gridGroup.add(ringMesh);
}

function buildRadar() {
    radarGroup.clear();
    const color = colorMap[activeColor].three;

    // radar sweep circular sector
    const radarGeo = new THREE.RingGeometry(0.5, 12, 64, 1, 0, Math.PI / 4);
    const radarMat = new THREE.MeshBasicMaterial({
        color: color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4
    });
    radarLine = new THREE.Mesh(radarGeo, radarMat);
    radarLine.rotation.x = Math.PI / 2;
    radarLine.position.y = -1.95;
    radarGroup.add(radarLine);

    // targeting reticle circles
    for (let r of [3, 6, 9]) {
        const ringGeo = new THREE.RingGeometry(r - 0.05, r + 0.05, 32);
        const ringMat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.5 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = -1.96;
        radarGroup.add(ring);
    }
}

function buildWaveforms() {
    waveGroup.clear();
    waveLines = [];
    const color = colorMap[activeColor].three;

    // Create 3 circular waveforms at different radii
    for (let rIdx = 0; rIdx < 3; rIdx++) {
        const radius = 4 + rIdx * 3;
        const points = [];
        const segments = 120;
        
        for (let i = 0; i <= segments; i++) {
            const theta = (i / segments) * Math.PI * 2;
            points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
        }

        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const mat = new THREE.LineBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.7 - (rIdx * 0.15)
        });
        const line = new THREE.Line(geo, mat);
        line.position.y = -1.5;
        waveGroup.add(line);
        waveLines.push({ mesh: line, radius: radius, rate: 2 + rIdx * 1.5 });
    }
}

function buildCore() {
    coreGroup.clear();
    ring1 = null;
    ring2 = null;
    coreMesh = null;

    const color = (colorMap[activeColor] && colorMap[activeColor].three) ? colorMap[activeColor].three : 0x00f3ff;
    const colorSec = (colorMap[activeColorSecondary] && colorMap[activeColorSecondary].three) ? colorMap[activeColorSecondary].three : color;
    const exp = explodedFactor || 0;

    // If a custom 3D model is loaded, display it inside coreGroup!
    if (customModel) {
        coreGroup.add(customModel);
        applyHologramMaterial();
        updateTelemetry();
        return;
    }

    if (activePreset === 'reactor') {
        // Inner Solid Glow
        const solidGeo = new THREE.IcosahedronGeometry(2.1, 1);
        const solidMat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.35, side: THREE.DoubleSide });
        const solidMesh = new THREE.Mesh(solidGeo, solidMat);
        coreGroup.add(solidMesh);

        // Outer Wireframe Cage
        const coreGeo = new THREE.IcosahedronGeometry(2.2, 1);
        const coreMat = new THREE.MeshBasicMaterial({ color: color, wireframe: true, transparent: true, opacity: 0.9 });
        coreMesh = new THREE.Mesh(coreGeo, coreMat);
        coreGroup.add(coreMesh);

        // Central Energy Core Orb
        const orbGeo = new THREE.SphereGeometry(0.8, 16, 16);
        const orbMat = new THREE.MeshBasicMaterial({ color: colorSec, transparent: true, opacity: 0.95 });
        const orbMesh = new THREE.Mesh(orbGeo, orbMat);
        coreGroup.add(orbMesh);

        // Rings
        const ringGeo1 = new THREE.RingGeometry(3.5 + exp, 3.8 + exp, 32);
        const ringMat1 = new THREE.MeshBasicMaterial({ color: colorSec, side: THREE.DoubleSide, transparent: true, opacity: 0.6, wireframe: true });
        ring1 = new THREE.Mesh(ringGeo1, ringMat1);
        ring1.rotation.x = Math.PI / 2;
        ring1.position.y = exp * 1.2;
        coreGroup.add(ring1);

        const ringGeo2 = new THREE.RingGeometry(4.4 + exp * 1.5, 4.7 + exp * 1.5, 32);
        const ringMat2 = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide, transparent: true, opacity: 0.4, wireframe: true });
        ring2 = new THREE.Mesh(ringGeo2, ringMat2);
        ring2.rotation.y = Math.PI / 2;
        ring2.position.y = -exp * 1.2;
        coreGroup.add(ring2);

    } else if (activePreset === 'navigation') {
        const solidGeo = new THREE.OctahedronGeometry(2.4, 0);
        const solidMat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.35, side: THREE.DoubleSide });
        const solidMesh = new THREE.Mesh(solidGeo, solidMat);
        coreGroup.add(solidMesh);

        const coreGeo = new THREE.OctahedronGeometry(2.5, 0);
        const coreMat = new THREE.MeshBasicMaterial({ color: color, wireframe: true, transparent: true, opacity: 0.9 });
        coreMesh = new THREE.Mesh(coreGeo, coreMat);
        coreGroup.add(coreMesh);

        const orbGeo = new THREE.OctahedronGeometry(0.8, 0);
        const orbMat = new THREE.MeshBasicMaterial({ color: colorSec, transparent: true, opacity: 0.95 });
        const orbMesh = new THREE.Mesh(orbGeo, orbMat);
        coreGroup.add(orbMesh);

        const ringGeo1 = new THREE.RingGeometry(3.5 + exp, 3.8 + exp, 32);
        const ringMat1 = new THREE.MeshBasicMaterial({ color: colorSec, side: THREE.DoubleSide, transparent: true, opacity: 0.6, wireframe: true });
        ring1 = new THREE.Mesh(ringGeo1, ringMat1);
        ring1.rotation.x = Math.PI / 2;
        ring1.position.y = exp * 1.2;
        coreGroup.add(ring1);

    } else if (activePreset === 'vitals') {
        const solidGeo = new THREE.TorusGeometry(1.8, 0.48, 16, 32);
        const solidMat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.35, side: THREE.DoubleSide });
        const solidMesh = new THREE.Mesh(solidGeo, solidMat);
        coreGroup.add(solidMesh);

        const coreGeo = new THREE.TorusGeometry(1.8, 0.5, 16, 32);
        const coreMat = new THREE.MeshBasicMaterial({ color: color, wireframe: true, transparent: true, opacity: 0.9 });
        coreMesh = new THREE.Mesh(coreGeo, coreMat);
        coreGroup.add(coreMesh);

        const orbGeo = new THREE.SphereGeometry(0.7, 16, 16);
        const orbMat = new THREE.MeshBasicMaterial({ color: colorSec, transparent: true, opacity: 0.95 });
        const orbMesh = new THREE.Mesh(orbGeo, orbMat);
        coreGroup.add(orbMesh);

        const ringGeo1 = new THREE.RingGeometry(3.5 + exp, 3.8 + exp, 32);
        const ringMat1 = new THREE.MeshBasicMaterial({ color: colorSec, side: THREE.DoubleSide, transparent: true, opacity: 0.6, wireframe: true });
        ring1 = new THREE.Mesh(ringGeo1, ringMat1);
        ring1.rotation.x = Math.PI / 2;
        ring1.position.y = exp * 1.2;
        coreGroup.add(ring1);

    } else if (activePreset === 'neural') {
        const solidGeo = new THREE.SphereGeometry(2.1, 16, 16);
        const solidMat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.35, side: THREE.DoubleSide });
        const solidMesh = new THREE.Mesh(solidGeo, solidMat);
        coreGroup.add(solidMesh);

        const coreGeo = new THREE.SphereGeometry(2.2, 16, 16);
        const coreMat = new THREE.MeshBasicMaterial({ color: color, wireframe: true, transparent: true, opacity: 0.9 });
        coreMesh = new THREE.Mesh(coreGeo, coreMat);
        coreGroup.add(coreMesh);

        const orbGeo = new THREE.IcosahedronGeometry(0.8, 1);
        const orbMat = new THREE.MeshBasicMaterial({ color: colorSec, transparent: true, opacity: 0.95 });
        const orbMesh = new THREE.Mesh(orbGeo, orbMat);
        coreGroup.add(orbMesh);

        const ringGeo1 = new THREE.RingGeometry(3.5 + exp, 3.8 + exp, 32);
        const ringMat1 = new THREE.MeshBasicMaterial({ color: colorSec, side: THREE.DoubleSide, transparent: true, opacity: 0.6, wireframe: true });
        ring1 = new THREE.Mesh(ringGeo1, ringMat1);
        ring1.rotation.x = Math.PI / 2;
        ring1.position.y = exp * 1.2;
        coreGroup.add(ring1);

    } else if (activePreset === 'brain') {
        const solidGeo = new THREE.SphereGeometry(2.4, 12, 12);
        const solidMat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.35, side: THREE.DoubleSide });
        const solidMesh = new THREE.Mesh(solidGeo, solidMat);
        coreGroup.add(solidMesh);

        const sphereGeo = new THREE.SphereGeometry(2.5, 12, 12);
        const coreMat = new THREE.MeshBasicMaterial({ color: color, wireframe: true, transparent: true, opacity: 0.85 });
        coreMesh = new THREE.Mesh(sphereGeo, coreMat);
        coreGroup.add(coreMesh);

        const nodesGroup = new THREE.Group();
        const nodeCount = 40;
        const nodeGeo = new THREE.SphereGeometry(0.18, 8, 8);
        const nodeMat = new THREE.MeshBasicMaterial({ color: colorSec });
        for (let i = 0; i < nodeCount; i++) {
            const node = new THREE.Mesh(nodeGeo, nodeMat);
            const radius = 2.8 + Math.random() * 0.8 + exp * 1.5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            node.position.set(
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.sin(phi) * Math.sin(theta),
                radius * Math.cos(phi)
            );
            nodesGroup.add(node);
        }
        nodesGroup.position.y = exp * 0.8;
        coreGroup.add(nodesGroup);

    } else if (activePreset === 'radar') {
        const solidGeo = new THREE.CylinderGeometry(3.4, 0.45, 0.8, 16, 1, false);
        const solidMat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.35, side: THREE.DoubleSide });
        const solidMesh = new THREE.Mesh(solidGeo, solidMat);
        solidMesh.rotation.x = Math.PI / 6;
        coreGroup.add(solidMesh);

        const dishGeo = new THREE.CylinderGeometry(3.5 + exp, 0.5, 0.8, 16, 1, true);
        const coreMat = new THREE.MeshBasicMaterial({ color: color, wireframe: true, transparent: true, opacity: 0.85 });
        coreMesh = new THREE.Mesh(dishGeo, coreMat);
        coreMesh.rotation.x = Math.PI / 6;
        coreGroup.add(coreMesh);

        const ringGeo1 = new THREE.RingGeometry(1.0 + exp, 4.0 + exp, 32);
        const ringMat1 = new THREE.MeshBasicMaterial({ color: colorSec, side: THREE.DoubleSide, transparent: true, opacity: 0.6, wireframe: true });
        ring1 = new THREE.Mesh(ringGeo1, ringMat1);
        ring1.rotation.x = Math.PI / 2;
        ring1.position.y = -1.5 - exp;
        coreGroup.add(ring1);

        const blipsGroup = new THREE.Group();
        for (let i = 0; i < 3; i++) {
            const blip = new THREE.Mesh(
                new THREE.SphereGeometry(0.3, 8, 8),
                new THREE.MeshBasicMaterial({ color: colorSec })
            );
            const angle = (i / 3) * Math.PI * 2;
            blip.position.set(Math.cos(angle) * (3 + exp), (i - 1) * 0.5, Math.sin(angle) * (3 + exp));
            blipsGroup.add(blip);
        }
        coreGroup.add(blipsGroup);

    } else if (activePreset === 'dna') {
        const solidGeo = new THREE.TorusKnotGeometry(1.58, 0.28, 64, 16, 2, 3);
        const solidMat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.35, side: THREE.DoubleSide });
        const solidMesh = new THREE.Mesh(solidGeo, solidMat);
        coreGroup.add(solidMesh);

        const coreGeo = new THREE.TorusKnotGeometry(1.6, 0.3, 64, 16, 2, 3);
        const coreMat = new THREE.MeshBasicMaterial({ color: color, wireframe: true, transparent: true, opacity: 0.85 });
        coreMesh = new THREE.Mesh(coreGeo, coreMat);
        coreGroup.add(coreMesh);

        const dnaGroup = new THREE.Group();
        const strandLength = 26;
        const sphereGeo = new THREE.SphereGeometry(0.16, 8, 8);
        const mat1 = new THREE.MeshBasicMaterial({ color: color });
        const mat2 = new THREE.MeshBasicMaterial({ color: colorSec });

        for (let i = 0; i < strandLength; i++) {
            const y = (i - strandLength / 2) * 0.25;
            const angle = i * 0.4;
            const radius = 2.4 + exp * 0.8;

            const x1 = Math.cos(angle) * radius;
            const z1 = Math.sin(angle) * radius;
            const p1 = new THREE.Mesh(sphereGeo, mat1);
            p1.position.set(x1, y, z1);
            dnaGroup.add(p1);

            const x2 = Math.cos(angle + Math.PI) * radius;
            const z2 = Math.sin(angle + Math.PI) * radius;
            const p2 = new THREE.Mesh(sphereGeo, mat2);
            p2.position.set(x2, y, z2);
            dnaGroup.add(p2);

            if (i % 2 === 0) {
                const lineGeo = new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(x1, y, z1),
                    new THREE.Vector3(x2, y, z2)
                ]);
                const line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: colorSec, transparent: true, opacity: 0.7 }));
                dnaGroup.add(line);
            }
        }
        coreGroup.add(dnaGroup);

    } else if (activePreset === 'mech') {
        const solidGeo = new THREE.DodecahedronGeometry(1.9, 1);
        const solidMat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.35, side: THREE.DoubleSide });
        const solidMesh = new THREE.Mesh(solidGeo, solidMat);
        coreGroup.add(solidMesh);

        const boxGeo = new THREE.DodecahedronGeometry(2.0, 1);
        const boxMat = new THREE.MeshBasicMaterial({ color: color, wireframe: true, transparent: true, opacity: 0.85 });
        coreMesh = new THREE.Mesh(boxGeo, boxMat);
        coreGroup.add(coreMesh);

        const armorGeo = new THREE.OctahedronGeometry(3.0 + exp, 0);
        const armorMat = new THREE.MeshBasicMaterial({ color: colorSec, wireframe: true, transparent: true, opacity: 0.6 });
        const armor = new THREE.Mesh(armorGeo, armorMat);
        armor.position.y = exp * 0.8;
        coreGroup.add(armor);

    } else if (activePreset === 'neuralpulse') {
        // === NEURAL PULSE NETWORK ===
        // Central glowing core
        const coreGeo = new THREE.IcosahedronGeometry(1.0, 2);
        const coreMat = new THREE.MeshBasicMaterial({ color: color, wireframe: true, transparent: true, opacity: 0.8 });
        coreMesh = new THREE.Mesh(coreGeo, coreMat);
        coreGroup.add(coreMesh);

        const innerGeo = new THREE.SphereGeometry(0.65, 16, 16);
        const innerMat = new THREE.MeshBasicMaterial({ color: colorSec, transparent: true, opacity: 0.9 });
        coreGroup.add(new THREE.Mesh(innerGeo, innerMat));

        // Create neural nodes at random positions on a sphere
        const neuralNetGroup = new THREE.Group();
        const nodeCount = 24;
        const nodePositions = [];
        const nodeGeo = new THREE.SphereGeometry(0.14, 8, 8);
        for (let i = 0; i < nodeCount; i++) {
            const nodeMat = new THREE.MeshBasicMaterial({ color: (i % 3 === 0) ? colorSec : color, transparent: true, opacity: 0.95 });
            const node = new THREE.Mesh(nodeGeo, nodeMat);
            const r = 2.8 + Math.random() * 1.4 + exp * 1.5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            node.position.set(
                r * Math.sin(phi) * Math.cos(theta),
                r * Math.sin(phi) * Math.sin(theta),
                r * Math.cos(phi)
            );
            // Store for synapse connections
            nodePositions.push(node.position.clone());
            node.userData.baseOpacity = 0.95;
            node.userData.pulseOffset = Math.random() * Math.PI * 2;
            neuralNetGroup.add(node);
        }

        // Draw synapse connections between nearby nodes
        for (let i = 0; i < nodeCount; i++) {
            for (let j = i + 1; j < nodeCount; j++) {
                const dist = nodePositions[i].distanceTo(nodePositions[j]);
                if (dist < 3.5) {
                    const lineGeo = new THREE.BufferGeometry().setFromPoints([
                        nodePositions[i], nodePositions[j]
                    ]);
                    const lineMat = new THREE.LineBasicMaterial({
                        color: color, transparent: true,
                        opacity: 0.3 - dist * 0.05
                    });
                    neuralNetGroup.add(new THREE.Line(lineGeo, lineMat));
                }
            }
        }

        // Orbital rings for scale
        const ringGeo1 = new THREE.RingGeometry(4.0 + exp, 4.2 + exp, 64);
        const ringMat1 = new THREE.MeshBasicMaterial({ color: colorSec, side: THREE.DoubleSide, transparent: true, opacity: 0.4 });
        ring1 = new THREE.Mesh(ringGeo1, ringMat1);
        ring1.rotation.x = Math.PI / 4;
        coreGroup.add(ring1);

        neuralNetGroup.userData.isNeuralNet = true;
        coreGroup.add(neuralNetGroup);

    } else {
        const solidGeo = new THREE.SphereGeometry(1.9, 16, 16);
        const solidMat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.35, side: THREE.DoubleSide });
        const solidMesh = new THREE.Mesh(solidGeo, solidMat);
        coreGroup.add(solidMesh);

        const coreGeo = new THREE.SphereGeometry(2, 16, 16);
        const coreMat = new THREE.MeshBasicMaterial({ color: color, wireframe: true, transparent: true, opacity: 0.85 });
        coreMesh = new THREE.Mesh(coreGeo, coreMat);
        coreGroup.add(coreMesh);
    }

    removeScanPlane();
    updateTelemetry();
}

// --- 3D REAL-TIME DIGITAL CLOCK BUILDER ---
function drawClockCanvas() {
    if (!clockCtx || !clockCanvas) return;
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    const ms = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');
    const timeStr = `${hrs}:${mins}:${secs}.${ms}`;

    const mainHex = (colorMap[activeColor] && colorMap[activeColor].hex) ? colorMap[activeColor].hex : '#00f3ff';
    const secHex = (colorMap[activeColorSecondary] && colorMap[activeColorSecondary].hex) ? colorMap[activeColorSecondary].hex : mainHex;

    clockCtx.clearRect(0, 0, clockCanvas.width, clockCanvas.height);

    clockCtx.fillStyle = 'rgba(5, 10, 25, 0.85)';
    clockCtx.strokeStyle = mainHex;
    clockCtx.lineWidth = 3;
    clockCtx.beginPath();
    if (clockCtx.roundRect) {
        clockCtx.roundRect(10, 10, 492, 108, 14);
    } else {
        clockCtx.rect(10, 10, 492, 108);
    }
    clockCtx.fill();
    clockCtx.stroke();

    clockCtx.shadowColor = mainHex;
    clockCtx.shadowBlur = 12;

    clockCtx.font = '900 44px "Orbitron", sans-serif';
    clockCtx.fillStyle = mainHex;
    clockCtx.textAlign = 'center';
    clockCtx.textBaseline = 'middle';
    clockCtx.fillText(timeStr, clockCanvas.width / 2, clockCanvas.height / 2 - 6);

    clockCtx.font = '700 12px "Outfit", sans-serif';
    clockCtx.fillStyle = secHex;
    clockCtx.fillText("SYSTEM TIME // REAL-TIME TELEMETRY", clockCanvas.width / 2, clockCanvas.height - 24);

    if (clockTexture) clockTexture.needsUpdate = true;
}

// --- PARTICLE NEBULA BUILDER ---
function buildParticleNebula() {
    if (nebulaGroup) { scene.remove(nebulaGroup); nebulaGroup = null; nebulaParticles = null; }
    const particleCount = 1800;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const color = (colorMap[activeColor] && colorMap[activeColor].three) ? colorMap[activeColor].three : 0x00f3ff;
    const secColor = (colorMap[activeColorSecondary] && colorMap[activeColorSecondary].three) ? colorMap[activeColorSecondary].three : color;
    const c1 = new THREE.Color(color);
    const c2 = new THREE.Color(secColor);

    for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 5 + Math.random() * 7;
        positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
        const blend = Math.random();
        const blended = c1.clone().lerp(c2, blend);
        colors[i * 3]     = blended.r;
        colors[i * 3 + 1] = blended.g;
        colors[i * 3 + 2] = blended.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
        size: 0.085,
        vertexColors: true,
        transparent: true,
        opacity: 0.72,
        sizeAttenuation: true
    });

    nebulaParticles = new THREE.Points(geo, mat);
    nebulaGroup = new THREE.Group();
    nebulaGroup.add(nebulaParticles);
    nebulaGroup.visible = nebulaVisible;
    scene.add(nebulaGroup);
}

// --- TARGETING RETICLE BUILDER ---
function buildReticle() {
    if (reticleMesh) {
        scene.remove(reticleMesh);
        reticleMesh = null;
    }
    const color = (colorMap[activeColor] && colorMap[activeColor].three) ? colorMap[activeColor].three : 0x00f3ff;

    reticleGroup = new THREE.Group();

    const centerGeo = new THREE.RingGeometry(0.08, 0.22, 32);
    const centerMat = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide, transparent: true, opacity: 0.9 });
    reticleGroup.add(new THREE.Mesh(centerGeo, centerMat));

    for (let i = 0; i < 2; i++) {
        const rGeo = new THREE.RingGeometry(0.5 + i * 0.5, 0.55 + i * 0.5, 32);
        const rMat = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide, transparent: true, opacity: 0.5 - i * 0.2 });
        reticleGroup.add(new THREE.Mesh(rGeo, rMat));
    }

    reticleGroup.rotation.x = Math.PI / 2;
    reticleGroup.position.y = -1.98;

    reticleMesh = reticleGroup;
    scene.add(reticleMesh);
}

function build3DClock() {
    if (clockGroup) scene.remove(clockGroup);


    clockCanvas = document.createElement('canvas');
    clockCanvas.width = 512;
    clockCanvas.height = 128;
    clockCtx = clockCanvas.getContext('2d');

    clockTexture = new THREE.CanvasTexture(clockCanvas);
    clockTexture.minFilter = THREE.LinearFilter;
    clockTexture.magFilter = THREE.LinearFilter;

    drawClockCanvas();

    const clockGeo = new THREE.PlaneGeometry(6, 1.5);
    const clockMat = new THREE.MeshBasicMaterial({
        map: clockTexture,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false
    });
    clockMesh = new THREE.Mesh(clockGeo, clockMat);

    const mainColor = colorMap[activeColor] ? colorMap[activeColor].three : 0x00f3ff;
    const frameGeo = new THREE.PlaneGeometry(6.3, 1.8);
    const frameMat = new THREE.MeshBasicMaterial({
        color: mainColor,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    frameMesh.position.z = -0.05;

    clockGroup = new THREE.Group();
    clockGroup.add(clockMesh);
    clockGroup.add(frameMesh);
    clockGroup.position.set(clockPosX, clockPosY, clockPosZ);
    clockGroup.scale.set(clockScale, clockScale, clockScale);
    clockGroup.visible = clockVisible;
    scene.add(clockGroup);
}

function update3DClock() {
    if (!clockGroup) return;
    clockGroup.visible = clockVisible;
    if (!clockVisible) return;

    drawClockCanvas();

    clockGroup.position.set(clockPosX, clockPosY, clockPosZ);
    clockGroup.scale.set(clockScale, clockScale, clockScale);
}

// --- 3D WIREFRAME WORLD GLOBE ---
function build3DGlobe() {
    if (globeGroup) scene.remove(globeGroup);

    const mainColor = colorMap[activeColor].three;
    const sphereGeo = new THREE.SphereGeometry(7, 24, 24);
    const sphereMat = new THREE.MeshBasicMaterial({
        color: mainColor,
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });
    globeMesh = new THREE.Mesh(sphereGeo, sphereMat);

    globeGroup = new THREE.Group();
    globeGroup.add(globeMesh);
    globeGroup.visible = globeVisible;
    scene.add(globeGroup);
}

// --- 3D LIVE FREQUENCY EQUALIZER BARS ---
function build3DVisualizer() {
    if (visualizerGroup) scene.remove(visualizerGroup);
    visBars = [];

    const mainColor = colorMap[activeColor].three;
    const barCount = 16;
    visualizerGroup = new THREE.Group();

    for (let i = 0; i < barCount; i++) {
        const barGeo = new THREE.BoxGeometry(0.3, 1, 0.3);
        const barMat = new THREE.MeshBasicMaterial({
            color: mainColor,
            wireframe: true,
            transparent: true,
            opacity: 0.6
        });
        const bar = new THREE.Mesh(barGeo, barMat);
        const angle = (i / barCount) * Math.PI * 1.2 - Math.PI * 0.6;
        const radius = 6.5;
        bar.position.set(Math.sin(angle) * radius, -1.8, Math.cos(angle) * radius);
        visualizerGroup.add(bar);
        visBars.push(bar);
    }
    visualizerGroup.visible = visVisible;
    scene.add(visualizerGroup);
}

// --- 6. ANIMATION RENDER LOOP ---
let timeClock = 0;
function animate() {
    requestAnimationFrame(animate);

    // Calculate volume multiplier if microphone analyzer is online
    let volumeMultiplier = 1.0;
    let micBassFrequency = 0;
    
    if (micEnabled && analyserNode && freqData) {
        analyserNode.getByteFrequencyData(freqData);
        
        let sum = 0;
        for (let i = 0; i < freqData.length; i++) {
            sum += freqData[i];
        }
        const avg = sum / freqData.length; // 0 - 255
        volumeMultiplier = 1.0 + (avg / 128) * 1.5; // up to 2.5x volume scaling
        
        // Take average of lower frequency bins for rotational speed variations
        let bassSum = 0;
        for (let i = 0; i < 10; i++) {
            bassSum += freqData[i];
        }
        micBassFrequency = bassSum / 10;
    }

    // Dynamic rotation scale calculations
    const dynamicSpeed = rotationSpeed * volumeMultiplier * (1 + (micBassFrequency / 100));
    timeClock += 0.01 * dynamicSpeed;

    // 1. Rotate Concentric Rings & Core or Custom Model
    if (customModel) {
        if (customModelOrbit) {
            customModel.rotation.y += 0.005 * dynamicSpeed;
        } else {
            // keep it static
        }
        
        // Scale custom model dynamically
        const scalePulse = customModelScale * volumeMultiplier;
        customModel.scale.set(scalePulse, scalePulse, scalePulse);
        customModel.position.y = customModelY;
        
        // Animate custom scan laser plane
        if (scanPlane) {
            scanPlane.position.y = -2.5 + Math.sin(timeClock * 3.5) * 3.2;
        }

        // Color update for target locks
        customModel.traverse(child => {
            if (child.isMesh && child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(m => m.color.setHex(isTargetLocked ? 0xff3333 : colorMap[activeColor].three));
                } else if (child.material.color) {
                    child.material.color.setHex(isTargetLocked ? 0xff3333 : colorMap[activeColor].three);
                }
            } else if (child.isPoints && child.material) {
                child.material.color.setHex(isTargetLocked ? 0xff3333 : colorMap[activeColor].three);
            }
        });
    } 
    else if (coreMesh) {
        coreMesh.rotation.y += 0.005 * dynamicSpeed;
        coreMesh.rotation.x += 0.002 * dynamicSpeed;
        
        // Pulsate Core size based on time waves OR mic input
        const scaleVal = (1 + Math.sin(timeClock * 5) * 0.05) * volumeMultiplier;
        coreMesh.scale.set(scaleVal, scaleVal, scaleVal);
        
        // Target lock warning colors override
        const targetColorHex = isTargetLocked ? 0xff3333 : colorMap[activeColor].three;
        if (coreMesh && coreMesh.material && coreMesh.material.color) {
            coreMesh.material.color.setHex(targetColorHex);
        }
        if (ring1 && ring1.material && ring1.material.color) {
            ring1.material.color.setHex(targetColorHex);
        }
        if (ring2 && ring2.material && ring2.material.color) {
            ring2.material.color.setHex(targetColorHex);
        }
    }

    if (ring1) {
        ring1.rotation.z -= 0.01 * dynamicSpeed;
    }
    if (ring2) {
        ring2.rotation.x += 0.008 * dynamicSpeed;
    }

    // 2. Rotate Targeting Radar Sweep
    if (radarLine) {
        radarLine.rotation.z -= 0.02 * dynamicSpeed;
    }

    // 3. Pulse Waveform Monitor vertices (sync with mic frequencies if online)
    if (waveLines.length > 0) {
        waveLines.forEach((wl, wlIdx) => {
            const posAttr = wl.mesh.geometry.attributes.position;
            const segments = posAttr.count;
            
            // Extract a frequency slice for this waveform line
            let subArray = [];
            if (micEnabled && freqData) {
                const step = Math.floor(freqData.length / 3);
                subArray = freqData.slice(wlIdx * step, (wlIdx + 1) * step);
            }
            
            for (let i = 0; i < segments; i++) {
                const theta = (i / (segments - 1)) * Math.PI * 2;
                
                let displacement = 0.3 * Math.cos(timeClock * 2);
                if (micEnabled && subArray.length > 0) {
                    const binIdx = Math.floor((i / segments) * subArray.length);
                    displacement = (subArray[binIdx] / 255) * 1.5;
                }
                
                // Animate noise height on y axis
                const waveVal = Math.sin(theta * (micEnabled ? 16 : 8) + timeClock * wl.rate) * displacement;
                posAttr.setY(i, waveVal);
            }
            posAttr.needsUpdate = true;
        });
    }

    // 4. Update 3D Holographic Digital Clock & Globe
    update3DClock();
    if (globeMesh) globeMesh.rotation.y += 0.003 * dynamicSpeed;

    // 5. Animate 3D Frequency Visualizer Equalizer Bars
    if (visBars && visBars.length > 0 && visualizerGroup && visualizerGroup.visible) {
        visBars.forEach((bar, idx) => {
            let scaleH = 1.0;
            if (micEnabled && freqData) {
                const binIdx = Math.floor((idx / visBars.length) * (freqData.length / 2));
                scaleH = 1.0 + (freqData[binIdx] / 255) * 3.5;
            } else {
                scaleH = 1.0 + Math.sin(timeClock * 4 + idx * 0.5) * 1.2;
            }
            bar.scale.y = scaleH;
            bar.position.y = -1.8 + (scaleH * 0.5);
        });
    }

    // Controls update
    if (controls) controls.update();

    // Update annotations overlay lines
    updateAnnotations();

    // 6. Animate Particle Nebula
    if (nebulaParticles && nebulaGroup && nebulaGroup.visible) {
        nebulaParticles.rotation.y += 0.0012 * dynamicSpeed;
        nebulaParticles.rotation.x += 0.0005 * dynamicSpeed;
        // Pulsate opacity with mic
        nebulaParticles.material.opacity = 0.55 + Math.sin(timeClock * 1.5) * 0.15 + (volumeMultiplier - 1.0) * 0.2;
    }

    // 7. Animate Neural Pulse nodes if neuralpulse preset
    if (activePreset === 'neuralpulse') {
        coreGroup.children.forEach(child => {
            if (child.userData && child.userData.isNeuralNet) {
                child.children.forEach(node => {
                    if (node.isMesh && node.userData && node.userData.pulseOffset !== undefined) {
                        const pulse = 0.5 + 0.5 * Math.sin(timeClock * 3 + node.userData.pulseOffset);
                        if (node.material) node.material.opacity = 0.3 + pulse * 0.7;
                        const s = 1 + pulse * 0.4 * volumeMultiplier;
                        node.scale.set(s, s, s);
                    }
                });
                child.rotation.y += 0.004 * dynamicSpeed;
            }
        });
    }

    // Render pass
    if (renderer) renderer.render(scene, camera);
}


// --- 7. LIVE CODE GENERATOR & UI SYNCS ---
function updateCodeOutput() {
    const palette = colorMap[activeColor];
    const scanlineVal = document.getElementById('scanline-slider').value / 100;
    const glitchVal = document.getElementById('glitch-slider').value;
    const speedVal = document.getElementById('speed-slider').value;

    const output = `/* Generated Hologram CSS Variables */
:root {
  --hud-accent: ${palette.hex};
  --hud-glow: rgba(${palette.rgb}, 0.4);
  --hud-glow-dim: rgba(${palette.rgb}, 0.1);
  --scanline-opacity: ${scanlineVal};
  --glitch-frequency: ${(100 - glitchVal) / 100}s;
  --rotation-speed: ${speedVal}s;
}`;

    document.getElementById('code-output').textContent = output;
    
    // Apply styling tokens globally to live viewport
    document.documentElement.style.setProperty('--hud-accent', palette.hex);
    document.documentElement.style.setProperty('--hud-glow', `rgba(${palette.rgb}, 0.4)`);
    document.documentElement.style.setProperty('--hud-glow-dim', `rgba(${palette.rgb}, 0.1)`);
    document.documentElement.style.setProperty('--scanline-opacity', scanlineVal);
    document.documentElement.style.setProperty('--glitch-freq', `${(100 - glitchVal) / 100}s`);
    document.documentElement.style.setProperty('--rotation-speed', `${speedVal}s`);
}

// --- SHARE HUD URL CONFIG ---
function shareHUD() {
    if (typeof window.isUserPremium === 'function' && !window.isUserPremium()) {
        if (typeof window.showPaywallModal === 'function') {
            window.showPaywallModal();
            return;
        }
    }
    try {
        const scanlineVal = document.getElementById('scanline-slider').value;
        const glitchVal = document.getElementById('glitch-slider').value;
        const speedVal = document.getElementById('speed-slider').value;
        const cfg = {
            p: activePreset,
            c: activeColor,
            s: activeColorSecondary,
            sp: speedVal,
            sc: scanlineVal,
            g: glitchVal,
            cv: clockVisible ? 1 : 0,
            nv: nebulaVisible ? 1 : 0,
            l: currentLang
        };
        const encoded = btoa(JSON.stringify(cfg));
        const url = window.location.href.split('#')[0] + '#cfg=' + encoded;
        navigator.clipboard.writeText(url).then(() => {
            logTerminal('Share URL copied to clipboard!');
            playSound('confirm');
            // Visual feedback on the button
            const btn = document.getElementById('btn-share-hud');
            if (btn) {
                const orig = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-check"></i> COPIED!';
                btn.style.background = 'linear-gradient(135deg, #00ff88, #00cc66)';
                btn.style.color = '#000';
                setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; btn.style.color = ''; }, 2200);
            }
        }).catch(() => {
            prompt('Copy this URL to share your HUD:', url);
        });
    } catch(e) {
        console.warn('shareHUD error:', e);
    }
}

// --- LOAD HUD CONFIG FROM URL HASH ---
function loadHUDFromURL() {
    try {
        const hash = window.location.hash;
        if (!hash || !hash.includes('#cfg=')) return;
        const encoded = hash.split('#cfg=')[1];
        const cfg = JSON.parse(atob(encoded));

        // ✅ FIX: Always clear custom model so the preset geometry is shown
        customModel = null;
        customModelName = '';
        uploadedModelBase64 = '';
        uploadedModelExtension = '';
        removeScanPlane();

        if (cfg.p) {
            activePreset = cfg.p;
            const sel = document.getElementById('preset-select');
            if (sel) sel.value = cfg.p;
        }
        if (cfg.c) {
            activeColor = cfg.c;
            // Fix: use .color-btn (not .color-swatch)
            document.querySelectorAll('.color-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.color === cfg.c);
            });
        }
        if (cfg.s) {
            activeColorSecondary = cfg.s;
            document.querySelectorAll('.color-btn-sec').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.color === cfg.s);
            });
        }
        if (cfg.sp) {
            const sl = document.getElementById('speed-slider');
            if (sl) {
                sl.value = cfg.sp;
                rotationSpeed = parseFloat(cfg.sp);
                const lbl = document.getElementById('speed-value');
                if (lbl) lbl.innerText = `${cfg.sp}x`;
            }
        }
        if (cfg.sc) {
            const sl = document.getElementById('scanline-slider');
            if (sl) sl.value = cfg.sc;
        }
        if (cfg.g) {
            const sl = document.getElementById('glitch-slider');
            if (sl) sl.value = cfg.g;
        }
        if (cfg.cv !== undefined) {
            clockVisible = !!cfg.cv;
            if (clockGroup) clockGroup.visible = clockVisible;
        }
        if (cfg.nv !== undefined) {
            nebulaVisible = !!cfg.nv;
            const toggle = document.getElementById('toggle-nebula');
            if (toggle) toggle.checked = nebulaVisible;
        }
        if (cfg.l) {
            currentLang = cfg.l;
            applyHologramLang(currentLang);
        }

        // Rebuild the full scene with the decoded preset
        buildGrid();
        buildRadar();
        buildWaveforms();
        buildCore();
        buildReticle();
        buildParticleNebula();
        updateLayerVisibilities();
        updateCodeOutput();
        logTerminal('✅ HUD configuration restored from shared URL.');
        playSound('confirm');
    } catch(e) {
        console.warn('loadHUDFromURL error:', e);
        logTerminal('⚠️ Could not parse shared HUD URL config.');
    }
}

// Listen for hash changes (e.g. pasting URL in same tab)
window.addEventListener('hashchange', () => {
    if (window.location.hash.includes('#cfg=')) {
        loadHUDFromURL();
    }
});

// --- 8. PRESET LIBRARY ---
function applyPreset(presetKey) {
    activePreset = presetKey;
    logTerminal(`Loading preset configuration: ${presetKey.toUpperCase()}...`);

    if (presetKey === 'reactor') {
        activeColor = 'cyan';
        activeColorSecondary = 'purple';
        rotationSpeed = 1.2;
        document.getElementById('speed-slider').value = 1.2;
        document.getElementById('layer-radar').checked = true;
        document.getElementById('layer-wave').checked = true;
        document.getElementById('layer-terminal').checked = true;
    } else if (presetKey === 'navigation') {
        activeColor = 'emerald';
        activeColorSecondary = 'cyan';
        rotationSpeed = 0.5;
        document.getElementById('speed-slider').value = 0.5;
        document.getElementById('layer-radar').checked = true;
        document.getElementById('layer-wave').checked = false;
        document.getElementById('layer-terminal').checked = true;
    } else if (presetKey === 'vitals') {
        activeColor = 'orange';
        activeColorSecondary = 'emerald';
        rotationSpeed = 1.8;
        document.getElementById('speed-slider').value = 1.8;
        document.getElementById('layer-radar').checked = false;
        document.getElementById('layer-wave').checked = true;
        document.getElementById('layer-terminal').checked = false;
    } else if (presetKey === 'neural') {
        activeColor = 'purple';
        activeColorSecondary = 'cyan';
        rotationSpeed = 0.8;
        document.getElementById('speed-slider').value = 0.8;
        document.getElementById('layer-radar').checked = false;
        document.getElementById('layer-wave').checked = true;
        document.getElementById('layer-terminal').checked = true;
    } else if (presetKey === 'brain') {
        activeColor = 'purple';
        activeColorSecondary = 'cyan';
        rotationSpeed = 0.8;
        document.getElementById('speed-slider').value = 0.8;
        document.getElementById('layer-radar').checked = false;
        document.getElementById('layer-wave').checked = true;
        document.getElementById('layer-terminal').checked = true;
    } else if (presetKey === 'radar') {
        activeColor = 'emerald';
        activeColorSecondary = 'orange';
        rotationSpeed = 0.5;
        document.getElementById('speed-slider').value = 0.5;
        document.getElementById('layer-radar').checked = true;
        document.getElementById('layer-wave').checked = false;
        document.getElementById('layer-terminal').checked = true;
    } else if (presetKey === 'dna') {
        activeColor = 'cyan';
        activeColorSecondary = 'gold';
        rotationSpeed = 1.0;
        document.getElementById('speed-slider').value = 1.0;
        document.getElementById('layer-radar').checked = false;
        document.getElementById('layer-wave').checked = true;
        document.getElementById('layer-terminal').checked = true;
    } else if (presetKey === 'mech') {
        activeColor = 'orange';
        activeColorSecondary = 'emerald';
        rotationSpeed = 1.5;
        document.getElementById('speed-slider').value = 1.5;
        document.getElementById('layer-radar').checked = true;
        document.getElementById('layer-wave').checked = true;
        document.getElementById('layer-terminal').checked = true;
    } else if (presetKey === 'neuralpulse') {
        activeColor = 'purple';
        activeColorSecondary = 'cyan';
        rotationSpeed = 0.6;
        document.getElementById('speed-slider').value = 0.6;
        document.getElementById('layer-radar').checked = false;
        document.getElementById('layer-wave').checked = false;
        document.getElementById('layer-terminal').checked = true;
    }

    if (hologramTranslations[currentLang] && hologramTranslations[currentLang].scenarios[presetKey]) {
        speakAI(hologramTranslations.fr.scenarios[presetKey], hologramTranslations.en.scenarios[presetKey]);
    }

    // Sync palettes active states
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.color === activeColor);
    });

    // Rebuild geometry
    buildGrid();
    buildRadar();
    buildWaveforms();
    buildCore();
    buildReticle();
    buildParticleNebula();
    
    // Trigger toggles visibility updates
    updateLayerVisibilities();
    
    // Update value labels
    document.getElementById('speed-value').innerText = `${rotationSpeed}x`;
    
    updateCodeOutput();
    playSound('sonar');
    logTerminal(`System sync completed. Target core set.`);
}

function updateLayerVisibilities() {
    gridGroup.visible = document.getElementById('layer-grid').checked;
    radarGroup.visible = document.getElementById('layer-radar').checked;
    waveGroup.visible = document.getElementById('layer-wave').checked;
    
    // Terminal diagnostics log container
    const logBox = document.getElementById('terminal-diagnostics').parentElement;
    if (logBox) {
        logBox.style.display = document.getElementById('layer-terminal').checked ? 'flex' : 'none';
    }

    // Quantum Bloom fog setting
    if (scene) {
        scene.fog = document.getElementById('layer-bloom').checked 
            ? new THREE.FogExp2(0x030308, 0.02) 
            : null;
    }
}

// --- 9. MICROPHONE CAPTURE STREAM ---
function toggleMic() {
    initAudio();
    
    if (micEnabled) {
        // Disconnect microphone stream
        if (micStream) {
            micStream.getTracks().forEach(track => track.stop());
        }
        micEnabled = false;
        document.getElementById('btn-mic-toggle').classList.remove('active');
        document.getElementById('btn-mic-toggle').innerHTML = `<i class="fa-solid fa-microphone-slash"></i> Mic: OFF`;
        logTerminal('Audio Reactivity pipeline offline.');
        playSound('click');
    } else {
        logTerminal('Requesting recording authorization...');
        
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then((stream) => {
                micStream = stream;
                
                if (audioCtx.state === 'suspended') {
                    audioCtx.resume();
                }
                
                analyserNode = audioCtx.createAnalyser();
                analyserNode.fftSize = 256;
                freqData = new Uint8Array(analyserNode.frequencyBinCount);
                
                micSource = audioCtx.createMediaStreamSource(stream);
                micSource.connect(analyserNode);
                
                micEnabled = true;
                document.getElementById('btn-mic-toggle').classList.add('active');
                document.getElementById('btn-mic-toggle').innerHTML = `<i class="fa-solid fa-microphone"></i> Mic: ON`;
                logTerminal('Audio Reactivity pipeline online.');
                playSound('sonar');
            })
            .catch((err) => {
                console.error('Audio capture denied/failed:', err);
                logTerminal('ERROR: Audio capture access denied.');
                playSound('error');
            });
    }
}

// --- 10. CURSOR RAYCASTER TRACKING & TARGET-LOCK ---
function onStageMouseMove(e) {
    const container = document.getElementById('stage-container');
    if (!container || !camera || !reticleMesh) return;
    
    const rect = container.getBoundingClientRect();
    
    // Map mouse position to NDC (-1 to 1)
    mouse.x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;
    
    // Project ray onto horizontal grid plane at y = -1.95
    raycaster.setFromCamera(mouse, camera);
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 1.95);
    const intersectPoint = new THREE.Vector3();
    
    if (raycaster.ray.intersectPlane(plane, intersectPoint)) {
        // Move 3D reticle mesh
        reticleMesh.position.x = intersectPoint.x;
        reticleMesh.position.z = intersectPoint.z;
        reticleMesh.visible = true;
        
        // Show 2D floating card and position it relative to mouse cursor
        const card = document.getElementById('hud-cursor-tracker');
        card.style.display = 'flex';
        card.style.left = `${e.clientX - rect.left}px`;
        card.style.top = `${e.clientY - rect.top}px`;
        
        // Update coordinate labels
        document.getElementById('track-lat').innerText = intersectPoint.x.toFixed(2);
        document.getElementById('track-lon').innerText = intersectPoint.z.toFixed(2);
        
        // altitude noise
        const altNoise = -1.95 + (Math.sin(Date.now() / 150) * 0.1);
        document.getElementById('track-alt').innerText = altNoise.toFixed(2);
        
        // Lock detection: check distance to core (0, -1.95, 0)
        const corePos = new THREE.Vector3(0, -1.95, 0);
        const dist = intersectPoint.distanceTo(corePos);
        
        if (dist < 2.8) {
            // Target locked!
            if (!isTargetLocked) {
                isTargetLocked = true;
                logTerminal('⚠️ WARNING: TARGET LOCKED ON CENTRAL CORE!');
            }
            card.classList.add('warning-lock');
            document.getElementById('track-status').innerText = '⚠️ TARGET LOCKED';
            
            // Limit beep frequency
            const now = Date.now();
            if (now - lastLockBeepTime > 300) {
                lastLockBeepTime = now;
                playSound('lock-alert');
            }
        } else {
            // Target scanning
            if (isTargetLocked) {
                isTargetLocked = false;
                logTerminal('Target lock released. Resuming scan.');
            }
            card.classList.remove('warning-lock');
            document.getElementById('track-status').innerText = 'STATUS: SCANNING';
        }
    }
}

function onStageMouseLeave() {
    const card = document.getElementById('hud-cursor-tracker');
    if (card) card.style.display = 'none';
    if (reticleMesh) reticleMesh.visible = false;
    
    if (isTargetLocked) {
        isTargetLocked = false;
        logTerminal('Target tracking terminated.');
    }
}

// --- 11. 3D MODEL LOADER & SHADER PARSERS ---
function handleFileSelect(file) {
    if (!file) return;
    
    const name = file.name;
    const ext = name.split('.').pop().toLowerCase();
    
    logTerminal(`Importing file: ${name.toUpperCase()}...`);
    
    // Store metadata for export packing
    uploadedModelExtension = ext;
    
    // Read raw data as base64 for html export bundling
    const r64 = new FileReader();
    r64.onload = (e64) => {
        uploadedModelBase64 = e64.target.result.split(',')[1];
    };
    r64.readAsDataURL(file);
    
    // Parse file locally depending on type (Anti-CORS ArrayBuffer reader)
    if (ext === 'glb' || ext === 'gltf') {
        const reader = new FileReader();
        reader.onload = (e) => {
            logTerminal('Parsing GLTF structures in RAM...');
            const loader = new THREE.GLTFLoader();
            loader.parse(e.target.result, '', (gltf) => {
                loadCustomModel(gltf.scene, name);
            }, (err) => {
                logTerminal('ERROR: Failed to load GLTF model.');
                playSound('error');
            });
        };
        reader.readAsArrayBuffer(file);
        const fileInput = document.getElementById('file-input');
        if (fileInput) fileInput.value = '';
    } 
    else if (ext === 'obj') {
        const reader = new FileReader();
        reader.onload = (e) => {
            logTerminal('Parsing OBJ meshes in RAM...');
            const loader = new THREE.OBJLoader();
            const obj = loader.parse(e.target.result);
            loadCustomModel(obj, name);
            const fileInput = document.getElementById('file-input');
            if (fileInput) fileInput.value = '';
        };
        reader.readAsText(file);
    } else {
        logTerminal('ERROR: Unsupported model extension.');
        playSound('error');
        const fileInput = document.getElementById('file-input');
        if (fileInput) fileInput.value = '';
    }
}

function loadCustomModel(object, name) {
    coreGroup.clear(); // Hide default preset geometries
    
    // Calculate polygons and vertices count
    let vertices = 0;
    let polygons = 0;
    
    object.traverse(child => {
        if (child.isMesh && child.geometry) {
            const pos = child.geometry.attributes.position;
            if (pos) vertices += pos.count;
            
            const index = child.geometry.index;
            if (index) polygons += index.count / 3;
            else if (pos) polygons += pos.count / 3;
        }
    });

    // Auto center object bounds
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);
    
    object.position.x = -center.x;
    object.position.y = -center.y;
    object.position.z = -center.z;
    
    // Wrap in rotating core parent group
    const wrapper = new THREE.Group();
    wrapper.add(object);
    
    // Autoscale object to fit viewport stage boundary nicely (max dimension = 5.0)
    const maxDimension = Math.max(size.x, size.y, size.z) || 1;
    const autoscaleFactor = 5.0 / maxDimension;
    object.scale.set(autoscaleFactor, autoscaleFactor, autoscaleFactor);
    
    coreGroup.add(wrapper);
    customModel = wrapper;
    customModelName = name;
    
    // Build custom visual representation shader
    applyHologramMaterial();
    buildScanPlane(size.x * autoscaleFactor);
    
    // Reset transform sliders UI
    document.getElementById('model-scale-slider').value = 1.0;
    customModelScale = 1.0;
    document.getElementById('model-y-slider').value = 0.0;
    customModelY = 0.0;
    document.getElementById('model-orbit').checked = true;
    customModelOrbit = true;

    // Reset slice sliders & annotations UI
    document.getElementById('model-slice-group').style.display = 'block';
    
    document.getElementById('model-slice-y').value = 3.0;
    document.getElementById('model-slice-y-val').innerText = 'OFF';
    customModelSliceY = 3.0;
    localPlanes[0].constant = 3.0;

    document.getElementById('model-slice-x').value = 3.0;
    document.getElementById('model-slice-x-val').innerText = 'OFF';
    customModelSliceX = 3.0;
    localPlanes[1].constant = 3.0;

    document.getElementById('model-slice-z').value = 3.0;
    document.getElementById('model-slice-z-val').innerText = 'OFF';
    customModelSliceZ = 3.0;
    localPlanes[2].constant = 3.0;

    document.getElementById('model-annotation-group').style.display = 'block';
    clearAnnotations();

    playSound('sonar');
    logTerminal(`Load Completed: ${name}`);
    logTerminal(`- Vertices count: ${vertices}`);
    logTerminal(`- Polygons count: ${polygons}`);
    logTerminal(`- Scale dimensions: ${size.x.toFixed(2)}x${size.y.toFixed(2)}x${size.z.toFixed(2)}m`);
    
    document.getElementById('system-status-text').innerText = 'CUSTOM MESH ACTIVE';
    updateTelemetry();
}

function applyHologramMaterial() {
    if (!customModel) return;
    
    const color = colorMap[activeColor].three;
    
    customModel.traverse(child => {
        // Skip helper outlines and points to prevent infinite traversal recursion!
        if (child.userData.isOutline || child.isPoints) return;
        
        if (child.isMesh) {
            // Clean up old point cloud meshes if they exist
            let pCloud = child.userData.pointsCloud;
            if (pCloud) pCloud.visible = (customModelMaterialMode === 'points');
            
            let outline = child.userData.wireframeOutline;
            if (outline) outline.visible = (customModelMaterialMode === 'solid');

            if (customModelMaterialMode === 'wireframe') {
                child.visible = true;
                child.material = new THREE.MeshBasicMaterial({
                    color: color,
                    wireframe: true,
                    transparent: true,
                    opacity: 0.5,
                    clippingPlanes: localPlanes,
                    clipShadows: true
                });
            } 
            else if (customModelMaterialMode === 'points') {
                child.visible = false; // Hide solid mesh
                
                // Build points mesh on-demand
                if (!pCloud) {
                    const ptsMat = new THREE.PointsMaterial({
                        color: color,
                        size: 0.12,
                        transparent: true,
                        opacity: 0.8,
                        clippingPlanes: localPlanes,
                        clipShadows: true
                    });
                    pCloud = new THREE.Points(child.geometry, ptsMat);
                    pCloud.scale.copy(child.scale);
                    pCloud.position.copy(child.position);
                    pCloud.rotation.copy(child.rotation);
                    pCloud.userData.isOutline = true;
                    child.parent.add(pCloud);
                    child.userData.pointsCloud = pCloud;
                }
                pCloud.visible = true;
                if (pCloud.material) pCloud.material.color.setHex(color);
            } 
            else if (customModelMaterialMode === 'solid') {
                child.visible = true;
                child.material = new THREE.MeshBasicMaterial({
                    color: color,
                    transparent: true,
                    opacity: 0.15,
                    side: THREE.DoubleSide,
                    clippingPlanes: localPlanes,
                    clipShadows: true
                });
                
                // Add wireframe outline wrapper helper
                if (!outline) {
                    outline = new THREE.Mesh(child.geometry, new THREE.MeshBasicMaterial({
                        color: color,
                        wireframe: true,
                        transparent: true,
                        opacity: 0.3,
                        clippingPlanes: localPlanes,
                        clipShadows: true
                    }));
                    outline.userData.isOutline = true;
                    child.add(outline);
                    child.userData.wireframeOutline = outline;
                }
                outline.visible = true;
                if (outline.material) outline.material.color.setHex(color);
                if (child.material.color) child.material.color.setHex(color);
            }
        }
    });
}

function buildScanPlane(width) {
    removeScanPlane();
    
    const color = colorMap[activeColor].three;
    const radius = Math.max(width * 0.6, 2.5);
    
    // Thin sweeping scanline laser ring
    const ringGeo = new THREE.RingGeometry(radius - 0.08, radius + 0.08, 32);
    const ringMat = new THREE.MeshBasicMaterial({
        color: color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
    });
    scanPlane = new THREE.Mesh(ringGeo, ringMat);
    scanPlane.rotation.x = Math.PI / 2;
    scanPlane.position.y = -2;
    scene.add(scanPlane);
}

function removeScanPlane() {
    if (scanPlane) {
        scene.remove(scanPlane);
        scanPlane = null;
    }
}

function addAnnotation(position, text, targetObject) {
    const id = 'anno-' + Date.now();
    const card = document.createElement('div');
    card.className = 'hud-label-card';
    card.id = id;
    card.innerHTML = `<span>${text.toUpperCase()}</span><span class="delete-label-btn" onclick="deleteAnnotation('${id}')">&times;</span>`;
    document.getElementById('annotation-layer').appendChild(card);
    
    const localPos = targetObject.worldToLocal(position.clone());
    
    annotations.push({
        id,
        localPos,
        object: targetObject,
        element: card
    });
    logTerminal(`Placed scan label: ${text.toUpperCase()}`);
}

window.deleteAnnotation = function(id) {
    const idx = annotations.findIndex(a => a.id === id);
    if (idx !== -1) {
        const anno = annotations[idx];
        if (anno.element && anno.element.parentNode) {
            anno.element.parentNode.removeChild(anno.element);
        }
        annotations.splice(idx, 1);
        logTerminal('Removed scan label.');
        playSound('click');
    }
};

function clearAnnotations() {
    annotations.forEach(anno => {
        if (anno.element && anno.element.parentNode) {
            anno.element.parentNode.removeChild(anno.element);
        }
    });
    annotations.length = 0;
    const svg = document.getElementById('annotation-svg');
    if (svg) svg.innerHTML = '';
}

function onStageDblClick(e) {
    if (!customModel && !coreMesh) return;
    
    const container = document.getElementById('stage-container');
    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
    const y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;
    
    const clickMouse = new THREE.Vector2(x, y);
    const clickRaycaster = new THREE.Raycaster();
    clickRaycaster.setFromCamera(clickMouse, camera);
    
    // Raycast directly against the hologram cores Group to avoid external object intersections
    const intersects = clickRaycaster.intersectObject(coreGroup, true);
    
    let hit = null;
    for (let i = 0; i < intersects.length; i++) {
        const obj = intersects[i].object;
        if (obj.userData.isOutline || obj.isPoints) continue;
        hit = intersects[i];
        break;
    }
    
    if (hit) {
        playSound('click');
        const text = prompt((currentLang === 'fr') ? "Entrez le nom du point de scan (ex: SENSOR 01):" : "Enter scan node label (e.g. SENSOR 01):", "TARGET NODE");
        if (text && text.trim() !== '') {
            addAnnotation(hit.point, text.trim(), hit.object);
        }
    }
}

function updateAnnotations() {
    const svg = document.getElementById('annotation-svg');
    if (!svg) return;
    svg.innerHTML = '';
    
    const container = document.getElementById('stage-container');
    if (!container) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    const tempV = new THREE.Vector3();
    
    annotations.forEach(anno => {
        if (!anno.object || !anno.object.parent) {
            anno.element.style.display = 'none';
            return;
        }
        
        tempV.copy(anno.localPos).applyMatrix4(anno.object.matrixWorld);
        tempV.project(camera);
        
        if (tempV.z > 1) {
            anno.element.style.display = 'none';
            return;
        }
        
        anno.element.style.display = 'flex';
        
        const x = (tempV.x * 0.5 + 0.5) * width;
        const y = (-tempV.y * 0.5 + 0.5) * height;
        
        const offsetX = 40;
        const offsetY = -30;
        
        anno.element.style.left = `${x + offsetX}px`;
        anno.element.style.top = `${y + offsetY}px`;
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x.toFixed(1));
        line.setAttribute('y1', y.toFixed(1));
        line.setAttribute('x2', (x + offsetX).toFixed(1));
        line.setAttribute('y2', (y + offsetY + 8).toFixed(1));
        line.setAttribute('stroke', colorMap[activeColor].hex);
        line.setAttribute('stroke-width', '1');
        line.setAttribute('stroke-opacity', '0.7');
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x.toFixed(1));
        circle.setAttribute('cy', y.toFixed(1));
        circle.setAttribute('r', '3');
        circle.setAttribute('fill', colorMap[activeColor].hex);
        
        svg.appendChild(line);
        svg.appendChild(circle);
    });
}

function getSliceSegments(geometry, worldMatrix, axis, sliceVal) {
    const posAttr = geometry.attributes.position;
    if (!posAttr) return [];
    
    const indexAttr = geometry.index;
    const indices = [];
    if (indexAttr) {
        for (let i = 0; i < indexAttr.count; i++) indices.push(indexAttr.getX(i));
    } else {
        for (let i = 0; i < posAttr.count; i++) indices.push(i);
    }
    
    const segments = [];
    const v0 = new THREE.Vector3();
    const v1 = new THREE.Vector3();
    const v2 = new THREE.Vector3();
    
    const p0 = new THREE.Vector3();
    const p1 = new THREE.Vector3();
    const p2 = new THREE.Vector3();
    
    for (let i = 0; i < indices.length; i += 3) {
        const idx0 = indices[i];
        const idx1 = indices[i+1];
        const idx2 = indices[i+2];
        
        p0.set(posAttr.getX(idx0), posAttr.getY(idx0), posAttr.getZ(idx0));
        p1.set(posAttr.getX(idx1), posAttr.getY(idx1), posAttr.getZ(idx1));
        p2.set(posAttr.getX(idx2), posAttr.getY(idx2), posAttr.getZ(idx2));
        
        v0.copy(p0).applyMatrix4(worldMatrix);
        v1.copy(p1).applyMatrix4(worldMatrix);
        v2.copy(p2).applyMatrix4(worldMatrix);
        
        const val0 = v0[axis];
        const val1 = v1[axis];
        const val2 = v2[axis];
        
        const intersects = [];
        const localIntersects = [];
        
        const checkEdge = (va, vb, pa, pb, valA, valB) => {
            if ((valA > sliceVal && valB <= sliceVal) || (valB > sliceVal && valA <= sliceVal)) {
                const t = (sliceVal - valA) / (valB - valA);
                const wIntersect = va.clone().lerp(vb, t);
                const lIntersect = pa.clone().lerp(pb, t);
                intersects.push(wIntersect);
                localIntersects.push(lIntersect);
            }
        };
        
        checkEdge(v0, v1, p0, p1, val0, val1);
        checkEdge(v1, v2, p1, p2, val1, val2);
        checkEdge(v2, v0, p2, p0, val2, val0);
        
        if (intersects.length >= 2) {
            segments.push({
                wA: intersects[0],
                wB: intersects[1],
                lA: localIntersects[0],
                lB: localIntersects[1]
            });
        }
    }
    return segments;
}

function groupSegmentsIntoLoops(segments) {
    const loops = [];
    const visited = new Set();
    const threshold = 0.005;
    
    for (let i = 0; i < segments.length; i++) {
        if (visited.has(i)) continue;
        
        const currentLoop = [segments[i]];
        visited.add(i);
        
        let foundNext = true;
        while (foundNext) {
            foundNext = false;
            const lastSeg = currentLoop[currentLoop.length - 1];
            const lastPt = lastSeg.wB;
            
            for (let j = 0; j < segments.length; j++) {
                if (visited.has(j)) continue;
                
                const nextSeg = segments[j];
                if (nextSeg.wA.distanceTo(lastPt) < threshold) {
                    currentLoop.push(nextSeg);
                    visited.add(j);
                    foundNext = true;
                    break;
                } else if (nextSeg.wB.distanceTo(lastPt) < threshold) {
                    currentLoop.push({
                        wA: nextSeg.wB,
                        wB: nextSeg.wA,
                        lA: nextSeg.lB,
                        lB: nextSeg.lA
                    });
                    visited.add(j);
                    foundNext = true;
                    break;
                }
            }
        }
        loops.push(currentLoop);
    }
    return loops;
}

function buildCapTriangles(loops, axis, hasNormals, hasColors) {
    const positions = [];
    const normals = [];
    const colors = [];
    
    const nx = axis === 'x' ? 1 : 0;
    const ny = axis === 'y' ? 1 : 0;
    const nz = axis === 'z' ? 1 : 0;
    
    loops.forEach(loop => {
        if (loop.length < 3) return;
        
        const localCenter = new THREE.Vector3();
        loop.forEach(seg => {
            localCenter.add(seg.lA);
        });
        localCenter.divideScalar(loop.length);
        
        loop.forEach(seg => {
            positions.push(localCenter.x, localCenter.y, localCenter.z);
            positions.push(seg.lA.x, seg.lA.y, seg.lA.z);
            positions.push(seg.lB.x, seg.lB.y, seg.lB.z);
            
            if (hasNormals) {
                for (let k = 0; k < 3; k++) {
                    normals.push(nx, ny, nz);
                }
            }
            if (hasColors) {
                for (let k = 0; k < 3; k++) {
                    colors.push(1, 1, 1);
                }
            }
        });
    });
    
    return { positions, normals, colors };
}

function getSlicedGeometry(geometry, worldMatrix) {
    const posAttr = geometry.attributes.position;
    if (!posAttr) return geometry;
    
    const indexAttr = geometry.index;
    const newPositions = [];
    const newNormals = [];
    const newColors = [];
    
    const indices = [];
    if (indexAttr) {
        for (let i = 0; i < indexAttr.count; i++) indices.push(indexAttr.getX(i));
    } else {
        for (let i = 0; i < posAttr.count; i++) indices.push(i);
    }
    
    const normAttr = geometry.attributes.normal;
    const colorAttr = geometry.attributes.color;
    
    const v0 = new THREE.Vector3();
    const v1 = new THREE.Vector3();
    const v2 = new THREE.Vector3();
    
    for (let i = 0; i < indices.length; i += 3) {
        const idx0 = indices[i];
        const idx1 = indices[i+1];
        const idx2 = indices[i+2];
        
        v0.set(posAttr.getX(idx0), posAttr.getY(idx0), posAttr.getZ(idx0)).applyMatrix4(worldMatrix);
        v1.set(posAttr.getX(idx1), posAttr.getY(idx1), posAttr.getZ(idx1)).applyMatrix4(worldMatrix);
        v2.set(posAttr.getX(idx2), posAttr.getY(idx2), posAttr.getZ(idx2)).applyMatrix4(worldMatrix);
        
        let isClipped = false;
        
        if (customModelSliceY < 3.0) {
            if (v0.y > customModelSliceY || v1.y > customModelSliceY || v2.y > customModelSliceY) isClipped = true;
        }
        if (customModelSliceX < 3.0) {
            if (v0.x > customModelSliceX || v1.x > customModelSliceX || v2.x > customModelSliceX) isClipped = true;
        }
        if (customModelSliceZ < 3.0) {
            if (v0.z > customModelSliceZ || v1.z > customModelSliceZ || v2.z > customModelSliceZ) isClipped = true;
        }
        
        if (!isClipped) {
            for (let idx of [idx0, idx1, idx2]) {
                newPositions.push(posAttr.getX(idx), posAttr.getY(idx), posAttr.getZ(idx));
                if (normAttr) {
                    newNormals.push(normAttr.getX(idx), normAttr.getY(idx), normAttr.getZ(idx));
                }
                if (colorAttr) {
                    newColors.push(colorAttr.getX(idx), colorAttr.getY(idx), colorAttr.getZ(idx));
                }
            }
        }
    }
    
    // Generate caps for active axes
    const axesToCheck = [];
    if (customModelSliceY < 3.0) axesToCheck.push({ name: 'y', val: customModelSliceY });
    if (customModelSliceX < 3.0) axesToCheck.push({ name: 'x', val: customModelSliceX });
    if (customModelSliceZ < 3.0) axesToCheck.push({ name: 'z', val: customModelSliceZ });
    
    axesToCheck.forEach(axisInfo => {
        const segments = getSliceSegments(geometry, worldMatrix, axisInfo.name, axisInfo.val);
        if (segments.length > 0) {
            const loops = groupSegmentsIntoLoops(segments);
            const caps = buildCapTriangles(loops, axisInfo.name, !!normAttr, !!colorAttr);
            newPositions.push(...caps.positions);
            if (normAttr) {
                newNormals.push(...caps.normals);
            }
            if (colorAttr) {
                newColors.push(...caps.colors);
            }
        }
    });
    
    const slicedGeo = new THREE.BufferGeometry();
    slicedGeo.setAttribute('position', new THREE.Float32BufferAttribute(newPositions, 3));
    if (normAttr && newNormals.length > 0) {
        slicedGeo.setAttribute('normal', new THREE.Float32BufferAttribute(newNormals, 3));
    }
    if (colorAttr && newColors.length > 0) {
        slicedGeo.setAttribute('color', new THREE.Float32BufferAttribute(newColors, 3));
    }
    return slicedGeo;
}

function createSlicedModelClone(target) {
    const clone = target.clone();
    target.updateMatrixWorld(true);
    
    const color = colorMap[activeColor].three;
    
    const meshes = [];
    target.traverse(c => {
        if (c.isMesh && !c.userData.isOutline) meshes.push(c);
    });
    
    let meshIdx = 0;
    clone.traverse(c => {
        if (c.isMesh && !c.userData.isOutline) {
            const originalMesh = meshes[meshIdx++];
            if (originalMesh) {
                c.geometry = getSlicedGeometry(originalMesh.geometry, originalMesh.matrixWorld);
                // Standardize material to always be a solid, double-sided Basic material for export
                c.material = new THREE.MeshBasicMaterial({
                    color: color,
                    side: THREE.DoubleSide,
                    wireframe: false
                });
            }
        }
    });
    
    // Physically remove unsliced helper outlines, points and grid lines from the cloned mesh hierarchy
    const toRemove = [];
    clone.traverse(c => {
        if (c.userData.isOutline || c.isPoints || c.constructor.name === 'LineSegments' || c.constructor.name === 'Line' || c.constructor.name === 'GridHelper') {
            toRemove.push(c);
        }
    });
    toRemove.forEach(c => {
        if (c.parent) {
            c.parent.remove(c);
        }
    });
    
    return clone;
}

function exportGLB() {
    if (typeof window.isUserPremium === 'function' && !window.isUserPremium()) {
        if (typeof window.showPaywallModal === 'function') {
            window.showPaywallModal();
            return;
        }
    }
    if (!customModel && !coreMesh) {
        logTerminal("ERROR: No 3D model loaded to export.");
        playSound('error');
        return;
    }
    const exporter = new THREE.GLTFExporter();
    const exportTarget = customModel ? customModel : coreMesh;
    const slicedClone = createSlicedModelClone(exportTarget);
    
    logTerminal("Generating sliced GLB package...");
    playSound('click');
    
    exporter.parse(slicedClone, function (result) {
        let blob;
        if (result instanceof ArrayBuffer) {
            blob = new Blob([result], { type: 'application/octet-stream' });
        } else {
            const output = JSON.stringify(result, null, 2);
            blob = new Blob([output], { type: 'text/plain' });
        }
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = (customModelName ? customModelName.split('.')[0] : 'core-reactor') + '-sliced.glb';
        link.click();
        logTerminal("3D Model exported successfully to GLB format.");
    }, function(error) {
        console.error(error);
        logTerminal("ERROR: Failed to export GLB.");
    }, { binary: true });
}

function exportOBJ() {
    if (typeof window.isUserPremium === 'function' && !window.isUserPremium()) {
        if (typeof window.showPaywallModal === 'function') {
            window.showPaywallModal();
            return;
        }
    }
    if (!customModel && !coreMesh) {
        logTerminal("ERROR: No 3D model loaded to export.");
        playSound('error');
        return;
    }
    const exporter = new THREE.OBJExporter();
    const exportTarget = customModel ? customModel : coreMesh;
    const slicedClone = createSlicedModelClone(exportTarget);
    
    logTerminal("Generating sliced OBJ mesh...");
    playSound('click');
    
    const result = exporter.parse(slicedClone);
    const blob = new Blob([result], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = (customModelName ? customModelName.split('.')[0] : 'core-reactor') + '-sliced.obj';
    link.click();
    logTerminal("3D Model exported successfully to OBJ format.");
}

function exportSTL() {
    if (typeof window.isUserPremium === 'function' && !window.isUserPremium()) {
        if (typeof window.showPaywallModal === 'function') {
            window.showPaywallModal();
            return;
        }
    }
    if (!customModel && !coreMesh) {
        logTerminal("ERROR: No 3D model loaded to export.");
        playSound('error');
        return;
    }
    const exporter = new THREE.STLExporter();
    const exportTarget = customModel ? customModel : coreMesh;
    const slicedClone = createSlicedModelClone(exportTarget);
    
    logTerminal("Generating sliced STL triangulation...");
    playSound('click');
    
    const result = exporter.parse(slicedClone, { binary: true });
    const blob = new Blob([result], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = (customModelName ? customModelName.split('.')[0] : 'core-reactor') + '-sliced.stl';
    link.click();
    logTerminal("3D Model exported successfully to STL format.");
}

function exportBlueprintSVG() {
    if (typeof window.isUserPremium === 'function' && !window.isUserPremium()) {
        if (typeof window.showPaywallModal === 'function') {
            window.showPaywallModal();
            return;
        }
    }
    logTerminal('Generating blueprint vector file...');
    playSound('click');
    
    const width = 800;
    const height = 600;
    
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">\n`;
    svg += `  <rect width="100%" height="100%" fill="#050c1e" />\n`;
    
    // Grid Lines
    svg += `  <g stroke="#0c2046" stroke-width="0.5">\n`;
    for (let x = 0; x < width; x += 40) {
        svg += `    <line x1="${x}" y1="0" x2="${x}" y2="${height}" />\n`;
    }
    for (let y = 0; y < height; y += 40) {
        svg += `    <line x1="0" y1="${y}" x2="${width}" y2="${y}" />\n`;
    }
    svg += `  </g>\n`;
    
    // Project meshes
    svg += `  <g stroke="${colorMap[activeColor].hex}" stroke-width="0.75" stroke-opacity="0.8" fill="none">\n`;
    
    const tempV1 = new THREE.Vector3();
    const meshesToProject = [];
    
    if (customModel) {
        customModel.traverse(c => {
            if (c.isMesh && c.visible && !c.userData.isOutline) meshesToProject.push(c);
        });
    } else if (coreMesh && coreMesh.visible) {
        meshesToProject.push(coreMesh);
    }
    if (ring1 && ring1.visible) meshesToProject.push(ring1);
    if (ring2 && ring2.visible) meshesToProject.push(ring2);
    if (gridGroup && gridGroup.visible) {
        gridGroup.traverse(c => {
            if ((c.isMesh || c.isLine || c.isLineSegments) && c.visible) meshesToProject.push(c);
        });
    }
    if (radarGroup && radarGroup.visible) {
        radarGroup.traverse(c => {
            if ((c.isMesh || c.isLine || c.isLineSegments) && c.visible) meshesToProject.push(c);
        });
    }
    if (waveGroup && waveGroup.visible) {
        waveGroup.traverse(c => {
            if ((c.isMesh || c.isLine || c.isLineSegments) && c.visible) meshesToProject.push(c);
        });
    }
    
    meshesToProject.forEach(obj => {
        const geometry = obj.geometry;
        if (!geometry) return;
        
        obj.updateMatrixWorld(true);
        const posAttr = geometry.attributes.position;
        if (!posAttr) return;
        
        const indexAttr = geometry.index;
        let indices = [];
        if (indexAttr) {
            for (let i = 0; i < indexAttr.count; i++) indices.push(indexAttr.getX(i));
        } else {
            for (let i = 0; i < posAttr.count; i++) indices.push(i);
        }
        
        const projectedPoints = [];
        for (let i = 0; i < posAttr.count; i++) {
            tempV1.set(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
            tempV1.applyMatrix4(obj.matrixWorld);
            tempV1.project(camera);
            
            const x = (tempV1.x * 0.5 + 0.5) * width;
            const y = (-tempV1.y * 0.5 + 0.5) * height;
            projectedPoints.push({ x, y, z: tempV1.z });
        }
        
        if (obj.isLineSegments || obj.constructor.name === 'LineSegments' || obj.constructor.name === 'GridHelper') {
            for (let i = 0; i < indices.length; i += 2) {
                if (i + 1 >= indices.length) break;
                const p0 = projectedPoints[indices[i]];
                const p1 = projectedPoints[indices[i + 1]];
                if (!p0 || !p1 || p0.z > 1 || p1.z > 1) continue;
                svg += `    <line x1="${p0.x.toFixed(1)}" y1="${p0.y.toFixed(1)}" x2="${p1.x.toFixed(1)}" y2="${p1.y.toFixed(1)}" />\n`;
            }
        } 
        else if (obj.isLine || obj.constructor.name === 'Line') {
            for (let i = 0; i < indices.length - 1; i++) {
                const p0 = projectedPoints[indices[i]];
                const p1 = projectedPoints[indices[i + 1]];
                if (!p0 || !p1 || p0.z > 1 || p1.z > 1) continue;
                svg += `    <line x1="${p0.x.toFixed(1)}" y1="${p0.y.toFixed(1)}" x2="${p1.x.toFixed(1)}" y2="${p1.y.toFixed(1)}" />\n`;
            }
        } 
        else {
            const drawnEdges = new Set();
            for (let i = 0; i < indices.length; i += 3) {
                if (i + 2 >= indices.length) break;
                const i0 = indices[i];
                const i1 = indices[i + 1];
                const i2 = indices[i + 2];
                
                const p0 = projectedPoints[i0];
                const p1 = projectedPoints[i1];
                const p2 = projectedPoints[i2];
                
                if (!p0 || !p1 || !p2) continue;
                if (p0.z > 1 || p1.z > 1 || p2.z > 1) continue;
                
                const drawLine = (a, b, idxA, idxB) => {
                    const edgeKey = idxA < idxB ? `${idxA}-${idxB}` : `${idxB}-${idxA}`;
                    if (!drawnEdges.has(edgeKey)) {
                        drawnEdges.add(edgeKey);
                        svg += `    <line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}" />\n`;
                    }
                };
                
                drawLine(p0, p1, i0, i1);
                drawLine(p1, p2, i1, i2);
                drawLine(p2, p0, i2, i0);
            }
        }
    });
    
    svg += `  </g>\n`;
    
    // Details
    svg += `  <g font-family="Orbitron, monospace" font-size="9" fill="${colorMap[activeColor].hex}" fill-opacity="0.8">\n`;
    svg += `    <text x="25" y="40" font-size="12" font-weight="bold">QUANTUM BLUEPRINT DRAFT</text>\n`;
    svg += `    <text x="25" y="60">PROJECT TITLE: ${customModelName ? customModelName.toUpperCase() : 'REACTOR CORE PRESET'}</text>\n`;
    svg += `    <text x="25" y="75">COORD LINK: LAT: ${mouse.x.toFixed(3)} // LON: ${mouse.y.toFixed(3)}</text>\n`;
    svg += `    <text x="25" y="90">DRAFTING DATE: ${new Date().toLocaleDateString()}</text>\n`;
    
    svg += `    <rect x="${width - 220}" y="${height - 95}" width="200" height="75" fill="none" stroke="${colorMap[activeColor].hex}" stroke-opacity="0.4" stroke-width="1" />\n`;
    svg += `    <text x="${width - 210}" y="${height - 75}">MODEL SOURCE: LOCAL FILE</text>\n`;
    svg += `    <text x="${width - 210}" y="${height - 60}">RENDER PROCESS: VECTOR PROJECT</text>\n`;
    svg += `    <text x="${width - 210}" y="${height - 45}">STATUS: SYSTEM SECURE</text>\n`;
    svg += `    <text x="${width - 210}" y="${height - 30}">VER: 1.0.9-SYS</text>\n`;
    svg += `  </g>\n`;
    
    svg += `  <rect x="15" y="15" width="${width - 30}" height="${height - 30}" fill="none" stroke="${colorMap[activeColor].hex}" stroke-opacity="0.3" stroke-width="1" />\n`;
    svg += `</svg>`;
    
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `blueprint-${customModelName ? customModelName.split('.')[0] : 'core-reactor'}.svg`;
    link.click();
    logTerminal('Vector Blueprint SVG exported successfully.');
}

// --- 12. PRODUCTION HTML EXPORTER ---
function exportStandaloneHTML() {
    logTerminal('Packaging production assets...');
    playSound('click');

    try {
        const cssElement = document.getElementById('main-styles');
        if (!cssElement) {
            throw new Error('Main stylesheet element not found.');
        }
        const css = cssElement.textContent;
        const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🛸 Customized Sci-Fi Hologram HUD</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Outfit:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/OBJLoader.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
    <style>
        ${css}
        /* Override customized variables */
        :root {
          --hud-accent: ${colorMap[activeColor].hex};
          --hud-glow: rgba(${colorMap[activeColor].rgb}, 0.4);
          --hud-glow-dim: rgba(${colorMap[activeColor].rgb}, 0.1);
          --scanline-opacity: ${document.getElementById('scanline-slider').value / 100};
          --glitch-freq: ${(100 - document.getElementById('glitch-slider').value) / 100}s;
          --rotation-speed: ${document.getElementById('speed-slider').value}s;
        }
    </style>
</head>
<body class="theater-active">
    <div class="app-container">
        <header class="glass-panel header-panel" style="position: absolute; width: calc(100% - 30px); z-index: 10;">
            <div class="header-logo">
                <i class="fa-solid fa-satellite-dish pulse-icon"></i>
                <h1>QUANTUM <span class="accent-text">HUD PREVIEW</span></h1>
            </div>
            <div class="header-actions">
                <button id="btn-mic-toggle" class="btn-ctrl" style="pointer-events: auto;"><i class="fa-solid fa-microphone-slash"></i> Mic: OFF</button>
            </div>
        </header>

        <main class="workspace" style="margin: 0; padding: 0; height: 100vh;">
            <section class="stage-container" id="stage-container" style="flex-grow: 1; border-radius: 0; border: none;">
                <div class="hologram-overlay"></div>
                <div class="hud-scaffolding">
                    <div class="hud-corner top-left"></div>
                    <div class="hud-corner top-right"></div>
                    <div class="hud-corner bottom-left"></div>
                    <div class="hud-corner bottom-right"></div>
                    <div class="hud-coordinates">EXPORTED BUILD // PRESS [B] FOR BLUEPRINT SVG</div>
                </div>
                <div id="hud-cursor-tracker" class="hud-tracker-overlay" style="display: none;">
                    <div class="tracker-header" id="track-status">STATUS: SCANNING</div>
                    <div class="tracker-coordinate">LAT: <span id="track-lat">0.00</span></div>
                    <div class="tracker-coordinate">LON: <span id="track-lon">0.00</span></div>
                    <div class="tracker-coordinate">ALT: <span id="track-alt">0.00</span></div>
                </div>
                <!-- Annotation overlay layer -->
                <div id="annotation-layer" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 5;">
                    <svg id="annotation-svg" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; pointer-events: none;"></svg>
                </div>

                <!-- Live Telemetry Widget -->
                <div id="hud-telemetry-panel" class="hud-telemetry-overlay">
                    <div class="telemetry-title"><i class="fa-solid fa-gauge-high"></i> CORE TELEMETRY</div>
                    <div class="telemetry-row"><span>STATUS:</span> <span id="telemetry-status" class="status-active">READY</span></div>
                    <div class="telemetry-row"><span>ACTIVE POLYGONS:</span> <span id="telemetry-polygons">0</span></div>
                    <div class="telemetry-row"><span>TOTAL POLYGONS:</span> <span id="telemetry-total-polygons">0</span></div>
                    <div class="telemetry-row"><span>EST. VOLUME:</span> <span id="telemetry-volume">0.00 m³</span></div>
                    <div class="telemetry-row"><span>CENTER OF MASS:</span> <span id="telemetry-com">[0.00, 0.00, 0.00]</span></div>
                    <div class="telemetry-row"><span>SLICE DEPTH Y:</span> <span id="telemetry-val-y">OFF</span></div>
                    <div class="telemetry-row"><span>SLICE DEPTH X:</span> <span id="telemetry-val-x">OFF</span></div>
                    <div class="telemetry-row"><span>SLICE DEPTH Z:</span> <span id="telemetry-val-z">OFF</span></div>
                </div>
            </section>
        </main>
    </div>

    <script>
        // Inline JS Engine
        let scene, camera, renderer, controls;
        let activeColor = '${activeColor}';
        let activeColorSecondary = '${activeColorSecondary}';
        let rotationSpeed = ${rotationSpeed};
        let activePreset = '${activePreset}';
        let coreMesh, ring1, ring2, radarLine, waveLines = [];
        let gridGroup, radarGroup, waveGroup, coreGroup;
        let reticleMesh, raycaster, mouse;
        let isTargetLocked = false;
        let lastLockBeepTime = 0;
        let micEnabled = false, micStream = null, analyserNode = null, freqData = null;
        let audioCtx = null;

        // Clock state (exported from builder)
        let clockVisible = ${clockVisible};
        let clockPosY = ${clockPosY};
        let clockPosX = ${clockPosX};
        let clockPosZ = ${clockPosZ};
        let clockScale = ${clockScale};
        let clockGroup = null, clockMesh = null, clockCanvas = null, clockCtx = null, clockTexture = null;

        // Particle Nebula state (exported from builder)
        let nebulaVisible = ${nebulaVisible};
        let nebulaGroup = null, nebulaParticles = null;

        // Custom Model states
        let customModel = null;
        let customModelScale = ${customModelScale};
        let customModelY = ${customModelY};
        let customModelOrbit = ${customModelOrbit};
        let customModelMaterialMode = '${customModelMaterialMode}';
        let customModelSliceY = ${customModelSliceY};
        let customModelSliceX = ${customModelSliceX};
        let customModelSliceZ = ${customModelSliceZ};
        const localPlanes = [
            new THREE.Plane(new THREE.Vector3(0, -1, 0), ${customModelSliceY}),
            new THREE.Plane(new THREE.Vector3(-1, 0, 0), ${customModelSliceX}),
            new THREE.Plane(new THREE.Vector3(0, 0, -1), ${customModelSliceZ})
        ];
        const annotations = [];
        let scanPlane = null;

        // Embedded base64 asset bundling
        const embeddedModelBase64 = "${uploadedModelBase64}";
        const embeddedModelExtension = "${uploadedModelExtension}";

        const colorMap = {
            cyan: { hex: '#00f3ff', rgb: '0, 243, 255', three: 0x00f3ff },
            purple: { hex: '#bd00ff', rgb: '189, 0, 255', three: 0xbd00ff },
            emerald: { hex: '#00ff66', rgb: '0, 255, 102', three: 0x00ff66 },
            gold: { hex: '#ffd700', rgb: '255, 215, 0', three: 0xffd700 },
            orange: { hex: '#ff5e00', rgb: '255, 94, 0', three: 0xff5e00 }
        };

        const config = {
            grid: ${document.getElementById('layer-grid').checked},
            radar: ${document.getElementById('layer-radar').checked},
            wave: ${document.getElementById('layer-wave').checked},
            bloom: ${document.getElementById('layer-bloom').checked}
        };

        function base64ToArrayBuffer(base64) {
            var binary_string = window.atob(base64);
            var len = binary_string.length;
            var bytes = new Uint8Array(len);
            for (var i = 0; i < len; i++) {
                bytes[i] = binary_string.charCodeAt(i);
            }
            return bytes.buffer;
        }

        function init() {
            const container = document.getElementById('stage-container');
            scene = new THREE.Scene();
            if (config.bloom) scene.fog = new THREE.FogExp2(0x030308, 0.02);

            camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
            camera.position.set(0, 10, 18);

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.localClippingEnabled = true;
            container.appendChild(renderer.domElement);

            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;

            gridGroup = new THREE.Group();
            radarGroup = new THREE.Group();
            waveGroup = new THREE.Group();
            coreGroup = new THREE.Group();

            scene.add(gridGroup);
            scene.add(radarGroup);
            scene.add(waveGroup);
            scene.add(coreGroup);

            // Build 3D Clock if visible
            if (clockVisible) build3DClock();

            // Build Particle Nebula
            buildParticleNebula();

            // Raycaster
            raycaster = new THREE.Raycaster();
            mouse = new THREE.Vector2(-999, -999);

            // Rebuild elements
            const color = colorMap[activeColor].three;

            // Grid
            if (config.grid) {
                const gridHelper = new THREE.GridHelper(30, 30, color, color);
                gridHelper.position.y = -2;
                gridHelper.material.opacity = 0.25;
                gridHelper.material.transparent = true;
                gridGroup.add(gridHelper);
            }

            // Radar
            if (config.radar) {
                const radarGeo = new THREE.RingGeometry(0.5, 12, 64, 1, 0, Math.PI / 4);
                const radarMat = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide, transparent: true, opacity: 0.15 });
                radarLine = new THREE.Mesh(radarGeo, radarMat);
                radarLine.rotation.x = Math.PI / 2;
                radarLine.position.y = -1.95;
                radarGroup.add(radarLine);
            }

            // Wave
            if (config.wave) {
                for (let rIdx = 0; rIdx < 3; rIdx++) {
                    const radius = 4 + rIdx * 3;
                    const points = [];
                    for (let i = 0; i <= 120; i++) {
                        const theta = (i / 120) * Math.PI * 2;
                        points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
                    }
                    const geo = new THREE.BufferGeometry().setFromPoints(points);
                    const mat = new THREE.LineBasicMaterial({ color: color, transparent: true, opacity: 0.35 - (rIdx * 0.1) });
                    const line = new THREE.Line(geo, mat);
                    line.position.y = -1.5;
                    waveGroup.add(line);
                    waveLines.push({ mesh: line, radius: radius, rate: 2 + rIdx * 1.5 });
                }
            }

            // Parse embedded base64 model if it exists
            if (embeddedModelBase64 !== '') {
                try {
                    if (embeddedModelExtension === 'glb' || embeddedModelExtension === 'gltf') {
                        const loader = new THREE.GLTFLoader();
                        const buffer = base64ToArrayBuffer(embeddedModelBase64);
                        loader.parse(buffer, '', (gltf) => {
                            setupExportedModel(gltf.scene);
                        });
                    } else if (embeddedModelExtension === 'obj') {
                        const loader = new THREE.OBJLoader();
                        const text = window.atob(embeddedModelBase64);
                        const obj = loader.parse(text);
                        setupExportedModel(obj);
                    }
                } catch(e) {
                    console.error("Failed to parse embedded asset:", e);
                    loadDefaultCore();
                }
            } else {
                loadDefaultCore();
            }

            // Reticle Group
            const reticleGroup = new THREE.Group();
            const centerGeo = new THREE.SphereGeometry(0.1, 8, 8);
            const centerMat = new THREE.MeshBasicMaterial({ color: color });
            reticleGroup.add(new THREE.Mesh(centerGeo, centerMat));
            const ring1Geo = new THREE.RingGeometry(0.4, 0.45, 16);
            const ringMat = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
            const r1 = new THREE.Mesh(ring1Geo, ringMat);
            r1.rotation.x = Math.PI / 2;
            reticleGroup.add(r1);
            reticleMesh = reticleGroup;
            reticleMesh.position.y = -1.95;
            reticleMesh.visible = false;
            scene.add(reticleMesh);

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
            scene.add(ambientLight);

            window.addEventListener('resize', () => {
                camera.aspect = container.clientWidth / container.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(container.clientWidth, container.clientHeight);
            });

            // Listeners
            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                mouse.x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
                mouse.y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;
                
                raycaster.setFromCamera(mouse, camera);
                const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 1.95);
                const intersect = new THREE.Vector3();
                if (raycaster.ray.intersectPlane(plane, intersect)) {
                    reticleMesh.position.x = intersect.x;
                    reticleMesh.position.z = intersect.z;
                    reticleMesh.visible = true;
                    
                    const card = document.getElementById('hud-cursor-tracker');
                    card.style.display = 'flex';
                    card.style.left = (e.clientX - rect.left) + 'px';
                    card.style.top = (e.clientY - rect.top) + 'px';
                    
                    document.getElementById('track-lat').innerText = intersect.x.toFixed(2);
                    document.getElementById('track-lon').innerText = intersect.z.toFixed(2);
                    document.getElementById('track-alt').innerText = (-1.95 + Math.sin(Date.now() / 150) * 0.1).toFixed(2);
                    
                    const dist = intersect.distanceTo(new THREE.Vector3(0, -1.95, 0));
                    if (dist < 2.8) {
                        isTargetLocked = true;
                        card.classList.add('warning-lock');
                        document.getElementById('track-status').innerText = '⚠️ TARGET LOCKED';
                        const now = Date.now();
                        if (now - lastLockBeepTime > 300) {
                            lastLockBeepTime = now;
                            if (audioCtx) {
                                const osc = audioCtx.createOscillator();
                                const gain = audioCtx.createGain();
                                osc.connect(gain); gain.connect(audioCtx.destination);
                                osc.frequency.setValueAtTime(880, audioCtx.currentTime);
                                gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
                                gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.12);
                                osc.start(); osc.stop(audioCtx.currentTime + 0.12);
                            }
                        }
                    } else {
                        isTargetLocked = false;
                        card.classList.remove('warning-lock');
                        document.getElementById('track-status').innerText = 'STATUS: SCANNING';
                    }
                }
            });

            container.addEventListener('mouseleave', () => {
                document.getElementById('hud-cursor-tracker').style.display = 'none';
                reticleMesh.visible = false;
                isTargetLocked = false;
            });

            // Click stage to add annotations in standalone build
            container.addEventListener('dblclick', onStageDblClick);

            // Mic Toggle
            document.getElementById('btn-mic-toggle').addEventListener('click', () => {
                if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                if (micEnabled) {
                    if (micStream) micStream.getTracks().forEach(t => t.stop());
                    micEnabled = false;
                    document.getElementById('btn-mic-toggle').innerHTML = '<i class="fa-solid fa-microphone-slash"></i> Mic: OFF';
                } else {
                    navigator.mediaDevices.getUserMedia({ audio: true })
                        .then(stream => {
                            micStream = stream;
                            analyserNode = audioCtx.createAnalyser();
                            analyserNode.fftSize = 256;
                            freqData = new Uint8Array(analyserNode.frequencyBinCount);
                            const source = audioCtx.createMediaStreamSource(stream);
                            source.connect(analyserNode);
                            micEnabled = true;
                            document.getElementById('btn-mic-toggle').innerHTML = '<i class="fa-solid fa-microphone"></i> Mic: ON';
                        });
                }
            });

            // Hotkeys for exported page
            window.addEventListener('keydown', (e) => {
                if (e.key.toLowerCase() === 'b') {
                    exportBlueprintSVG();
                }
            });
            updateTelemetry();
        }

        function loadDefaultCore() {
            const color = colorMap[activeColor].three;
            const secColor = (colorMap[activeColorSecondary] && colorMap[activeColorSecondary].three) ? colorMap[activeColorSecondary].three : color;
            let coreGeo;
            if (activePreset === 'reactor') {
                coreGeo = new THREE.IcosahedronGeometry(2.2, 1);
            } else if (activePreset === 'navigation') {
                coreGeo = new THREE.OctahedronGeometry(2.5, 0);
            } else if (activePreset === 'vitals') {
                coreGeo = new THREE.TorusGeometry(1.5, 0.4, 16, 32);
            } else if (activePreset === 'radar') {
                coreGeo = new THREE.CylinderGeometry(0, 3, 0.3, 8);
            } else if (activePreset === 'dna') {
                coreGeo = new THREE.CapsuleGeometry(0.4, 3, 8, 16);
            } else if (activePreset === 'mech') {
                coreGeo = new THREE.BoxGeometry(2.5, 2.5, 2.5, 3, 3, 3);
            } else if (activePreset === 'brain' || activePreset === 'neural' || activePreset === 'neuralpulse') {
                coreGeo = new THREE.SphereGeometry(2.2, 20, 20);
            } else {
                coreGeo = new THREE.SphereGeometry(2, 16, 16);
            }

            const coreMat = new THREE.MeshBasicMaterial({ color: color, wireframe: true, transparent: true, opacity: 0.6 });
            coreMesh = new THREE.Mesh(coreGeo, coreMat);
            coreGroup.add(coreMesh);

            // Orbital ring 1
            const ringGeo1 = new THREE.RingGeometry(3.5, 3.8, 32);
            const ringMat1 = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide, transparent: true, opacity: 0.4, wireframe: true });
            ring1 = new THREE.Mesh(ringGeo1, ringMat1);
            ring1.rotation.x = Math.PI / 2;
            coreGroup.add(ring1);

            // Orbital ring 2 (secondary color, tilted)
            const ringGeo2 = new THREE.RingGeometry(3.0, 3.2, 32);
            const ringMat2 = new THREE.MeshBasicMaterial({ color: secColor, side: THREE.DoubleSide, transparent: true, opacity: 0.3 });
            ring2 = new THREE.Mesh(ringGeo2, ringMat2);
            ring2.rotation.x = Math.PI / 3;
            ring2.rotation.z = Math.PI / 5;
            coreGroup.add(ring2);
        }

        function setupExportedModel(object) {
            const box = new THREE.Box3().setFromObject(object);
            const size = new THREE.Vector3();
            box.getSize(size);
            const center = new THREE.Vector3();
            box.getCenter(center);
            object.position.x = -center.x;
            object.position.y = -center.y;
            object.position.z = -center.z;
            const maxDim = Math.max(size.x, size.y, size.z) || 1;
            const factor = 5.0 / maxDim;
            object.scale.set(factor, factor, factor);
            const wrapper = new THREE.Group();
            wrapper.add(object);
            coreGroup.add(wrapper);
            customModel = wrapper;
            
            const color = colorMap[activeColor].three;
            customModel.traverse(child => {
                if (child.userData.isOutline || child.isPoints) return;
                
                if (child.isMesh && child.geometry) {
                    if (!child.userData.originalPosition) {
                        child.userData.originalPosition = child.position.clone();
                    }
                    child.geometry.computeBoundingBox();
                    const localBox = child.geometry.boundingBox;
                    const localCenter = new THREE.Vector3();
                    if (localBox) {
                        localBox.getCenter(localCenter);
                    }
                    child.userData.directionVector = localCenter.clone().normalize();

                    if (customModelMaterialMode === 'wireframe') {
                        child.material = new THREE.MeshBasicMaterial({ color: color, wireframe: true, transparent: true, opacity: 0.5, clippingPlanes: localPlanes, clipShadows: true });
                    } else if (customModelMaterialMode === 'points') {
                        child.visible = false;
                        const pts = new THREE.Points(child.geometry, new THREE.PointsMaterial({ color: color, size: 0.12, transparent: true, opacity: 0.8, clippingPlanes: localPlanes, clipShadows: true }));
                        pts.scale.copy(child.scale); pts.position.copy(child.position); pts.rotation.copy(child.rotation);
                        pts.userData.isOutline = true;
                        child.parent.add(pts);
                        child.userData.pointsCloud = pts;
                    } else if (customModelMaterialMode === 'solid') {
                        child.material = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.15, side: THREE.DoubleSide, clippingPlanes: localPlanes, clipShadows: true });
                        const out = new THREE.Mesh(child.geometry, new THREE.MeshBasicMaterial({ color: color, wireframe: true, transparent: true, opacity: 0.3, clippingPlanes: localPlanes, clipShadows: true }));
                        out.userData.isOutline = true;
                        child.add(out);
                        child.userData.wireframeOutline = out;
                    }
                }
            });

            // scanPlane
            const ringGeo = new THREE.RingGeometry(size.x * factor * 0.6, size.x * factor * 0.6 + 0.1, 32);
            scanPlane = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide, transparent: true, opacity: 0.8 }));
            scanPlane.rotation.x = Math.PI / 2;
            scanPlane.position.y = -2;
            scene.add(scanPlane);
        }

        function addAnnotation(position, text, targetObject) {
            const id = 'anno-' + Date.now();
            const card = document.createElement('div');
            card.className = 'hud-label-card';
            card.id = id;
            card.innerHTML = '<span>' + text.toUpperCase() + '</span><span class="delete-label-btn" onclick="deleteAnnotation(\\'' + id + '\\')">&times;</span>';
            document.getElementById('annotation-layer').appendChild(card);
            
            const localPos = targetObject.worldToLocal(position.clone());
            annotations.push({
                id: id,
                localPos: localPos,
                object: targetObject,
                element: card
            });
        }

        window.deleteAnnotation = function(id) {
            const idx = annotations.findIndex(a => a.id === id);
            if (idx !== -1) {
                const anno = annotations[idx];
                if (anno.element && anno.element.parentNode) {
                    anno.element.parentNode.removeChild(anno.element);
                }
                annotations.splice(idx, 1);
            }
        };

        function onStageDblClick(e) {
            if (!customModel && !coreMesh) return;
            const container = document.getElementById('stage-container');
            const rect = container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
            const y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;
            
            const clickMouse = new THREE.Vector2(x, y);
            const clickRaycaster = new THREE.Raycaster();
            clickRaycaster.setFromCamera(clickMouse, camera);
            
            const intersects = clickRaycaster.intersectObject(coreGroup, true);
            let hit = null;
            for (let i = 0; i < intersects.length; i++) {
                const obj = intersects[i].object;
                if (obj.userData.isOutline || obj.isPoints) continue;
                hit = intersects[i];
                break;
            }
            if (hit) {
                const text = prompt((currentLang === 'fr') ? "Entrez le nom du point de scan (ex: SENSOR 01):" : "Enter scan node label (e.g. SENSOR 01):", "TARGET NODE");
                if (text && text.trim() !== '') {
                    addAnnotation(hit.point, text.trim(), hit.object);
                }
            }
        }

        function updateAnnotations() {
            const svg = document.getElementById('annotation-svg');
            if (!svg) return;
            svg.innerHTML = '';
            
            const container = document.getElementById('stage-container');
            if (!container) return;
            const width = container.clientWidth;
            const height = container.clientHeight;
            const tempV = new THREE.Vector3();
            
            annotations.forEach(anno => {
                if (!anno.object || !anno.object.parent) {
                    anno.element.style.display = 'none';
                    return;
                }
                tempV.copy(anno.localPos).applyMatrix4(anno.object.matrixWorld);
                tempV.project(camera);
                if (tempV.z > 1) {
                    anno.element.style.display = 'none';
                    return;
                }
                anno.element.style.display = 'flex';
                const x = (tempV.x * 0.5 + 0.5) * width;
                const y = (-tempV.y * 0.5 + 0.5) * height;
                const offsetX = 40;
                const offsetY = -30;
                anno.element.style.left = (x + offsetX) + 'px';
                anno.element.style.top = (y + offsetY) + 'px';
                
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', x.toFixed(1));
                line.setAttribute('y1', y.toFixed(1));
                line.setAttribute('x2', (x + offsetX).toFixed(1));
                line.setAttribute('y2', (y + offsetY + 8).toFixed(1));
                line.setAttribute('stroke', colorMap[activeColor].hex);
                line.setAttribute('stroke-width', '1');
                line.setAttribute('stroke-opacity', '0.7');
                
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', x.toFixed(1));
                circle.setAttribute('cy', y.toFixed(1));
                circle.setAttribute('r', '3');
                circle.setAttribute('fill', colorMap[activeColor].hex);
                
                svg.appendChild(line);
                svg.appendChild(circle);
            });
        }

        function exportBlueprintSVG() {
            console.log('Generating blueprint vector file...');
            const width = 800;
            const height = 600;
            
            let svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + width + ' ' + height + '" width="' + width + '" height="' + height + '">\\n';
            svg += '  <rect width="100%" height="100%" fill="#050c1e" />\\n';
            
            svg += '  <g stroke="#0c2046" stroke-width="0.5">\\n';
            for (let x = 0; x < width; x += 40) {
                svg += '    <line x1="' + x + '" y1="0" x2="' + x + '" y2="' + height + '" />\\n';
            }
            for (let y = 0; y < height; y += 40) {
                svg += '    <line x1="0" y1="' + y + '" x2="' + width + '" y2="' + y + '" />\\n';
            }
            svg += '  </g>\\n';
            
            svg += '  <g stroke="' + colorMap[activeColor].hex + '" stroke-width="0.75" stroke-opacity="0.8" fill="none">\\n';
            
            const tempV1 = new THREE.Vector3();
            const meshesToProject = [];
            
            if (customModel) {
                customModel.traverse(c => {
                    if (c.isMesh && c.visible && !c.userData.isOutline) meshesToProject.push(c);
                });
            } else if (coreMesh && coreMesh.visible) {
                meshesToProject.push(coreMesh);
            }
            if (ring1 && ring1.visible) meshesToProject.push(ring1);
            if (ring2 && ring2.visible) meshesToProject.push(ring2);
            if (gridGroup && gridGroup.visible) {
                gridGroup.traverse(c => {
                    if ((c.isMesh || c.isLine || c.isLineSegments) && c.visible) meshesToProject.push(c);
                });
            }
            if (radarGroup && radarGroup.visible) {
                radarGroup.traverse(c => {
                    if ((c.isMesh || c.isLine || c.isLineSegments) && c.visible) meshesToProject.push(c);
                });
            }
            if (waveGroup && waveGroup.visible) {
                waveGroup.traverse(c => {
                    if ((c.isMesh || c.isLine || c.isLineSegments) && c.visible) meshesToProject.push(c);
                });
            }
            
            meshesToProject.forEach(obj => {
                const geometry = obj.geometry;
                if (!geometry) return;
                
                obj.updateMatrixWorld(true);
                const posAttr = geometry.attributes.position;
                if (!posAttr) return;
                
                const indexAttr = geometry.index;
                let indices = [];
                if (indexAttr) {
                    for (let i = 0; i < indexAttr.count; i++) indices.push(indexAttr.getX(i));
                } else {
                    for (let i = 0; i < posAttr.count; i++) indices.push(i);
                }
                
                const projectedPoints = [];
                for (let i = 0; i < posAttr.count; i++) {
                    tempV1.set(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
                    tempV1.applyMatrix4(obj.matrixWorld);
                    tempV1.project(camera);
                    
                    const x = (tempV1.x * 0.5 + 0.5) * width;
                    const y = (-tempV1.y * 0.5 + 0.5) * height;
                    projectedPoints.push({ x, y, z: tempV1.z });
                }
                
                if (obj.isLineSegments || obj.constructor.name === 'LineSegments' || obj.constructor.name === 'GridHelper') {
                    for (let i = 0; i < indices.length; i += 2) {
                        if (i + 1 >= indices.length) break;
                        const p0 = projectedPoints[indices[i]];
                        const p1 = projectedPoints[indices[i + 1]];
                        if (!p0 || !p1 || p0.z > 1 || p1.z > 1) continue;
                        svg += '    <line x1="' + p0.x.toFixed(1) + '" y1="' + p0.y.toFixed(1) + '" x2="' + p1.x.toFixed(1) + '" y2="' + p1.y.toFixed(1) + '" />\\n';
                    }
                } 
                else if (obj.isLine || obj.constructor.name === 'Line') {
                    for (let i = 0; i < indices.length - 1; i++) {
                        const p0 = projectedPoints[indices[i]];
                        const p1 = projectedPoints[indices[i + 1]];
                        if (!p0 || !p1 || p0.z > 1 || p1.z > 1) continue;
                        svg += '    <line x1="' + p0.x.toFixed(1) + '" y1="' + p0.y.toFixed(1) + '" x2="' + p1.x.toFixed(1) + '" y2="' + p1.y.toFixed(1) + '" />\\n';
                    }
                } 
                else {
                    const drawnEdges = new Set();
                    for (let i = 0; i < indices.length; i += 3) {
                        if (i + 2 >= indices.length) break;
                        const i0 = indices[i];
                        const i1 = indices[i + 1];
                        const i2 = indices[i + 2];
                        
                        const p0 = projectedPoints[i0];
                        const p1 = projectedPoints[i1];
                        const p2 = projectedPoints[i2];
                        
                        if (!p0 || !p1 || !p2) continue;
                        if (p0.z > 1 || p1.z > 1 || p2.z > 1) continue;
                        
                        const drawLine = (a, b, idxA, idxB) => {
                            const edgeKey = idxA + '-' + idxB;
                            if (!drawnEdges.has(edgeKey)) {
                                drawnEdges.add(edgeKey);
                                svg += '    <line x1="' + a.x.toFixed(1) + '" y1="' + a.y.toFixed(1) + '" x2="' + b.x.toFixed(1) + '" y2="' + b.y.toFixed(1) + '" />\\n';
                            }
                        };
                        
                        drawLine(p0, p1, i0, i1);
                        drawLine(p1, p2, i1, i2);
                        drawLine(p2, p0, i2, i0);
                    }
                }
            });
            
            svg += '  </g>\\n';
            
            svg += '  <g font-family="Orbitron, monospace" font-size="9" fill="' + colorMap[activeColor].hex + '" fill-opacity="0.8">\\n';
            svg += '    <text x="25" y="40" font-size="12" font-weight="bold">QUANTUM BLUEPRINT DRAFT</text>\\n';
            svg += '    <text x="25" y="60">PROJECT TITLE: ' + (customModel ? "CUSTOM EXPORTED MESH" : "REACTOR CORE PRESET") + '</text>\\n';
            svg += '    <text x="25" y="75">COORD LINK: LAT: ' + mouse.x.toFixed(3) + ' // LON: ' + mouse.y.toFixed(3) + '</text>\\n';
            svg += '    <text x="25" y="90">DRAFTING DATE: ' + new Date().toLocaleDateString() + '</text>\\n';
            
            svg += '    <rect x="' + (width - 220) + '" y="' + (height - 95) + '" width="200" height="75" fill="none" stroke="' + colorMap[activeColor].hex + '" stroke-opacity="0.4" stroke-width="1" />\\n';
            svg += '    <text x="' + (width - 210) + '" y="' + (height - 75) + '">MODEL SOURCE: EMBEDDED DATA</text>\\n';
            svg += '    <text x="' + (width - 210) + '" y="' + (height - 60) + '">RENDER PROCESS: VECTOR PROJECT</text>\\n';
            svg += '    <text x="' + (width - 210) + '" y="' + (height - 45) + '">STATUS: SYSTEM SECURE</text>\\n';
            svg += '    <text x="' + (width - 210) + '" y="' + (height - 30) + '">VER: 1.0.9-SYS</text>\\n';
            svg += '  </g>\\n';
            
            svg += '  <rect x="15" y="15" width="' + (width - 30) + '" height="' + (height - 30) + '" fill="none" stroke="' + colorMap[activeColor].hex + '" stroke-opacity="0.3" stroke-width="1" />\\n';
            svg += '</svg>';
            
            const blob = new Blob([svg], { type: 'image/svg+xml' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'blueprint-export.svg';
            link.click();
        }

        // --- 3D CLOCK BUILDER (exported) ---
        function drawClockCanvas() {
            if (!clockCtx || !clockCanvas) return;
            const now = new Date();
            const hrs = String(now.getHours()).padStart(2, '0');
            const mins = String(now.getMinutes()).padStart(2, '0');
            const secs = String(now.getSeconds()).padStart(2, '0');
            const ms = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');
            const timeStr = hrs + ':' + mins + ':' + secs + '.' + ms;
            const mainHex = (colorMap[activeColor] && colorMap[activeColor].hex) ? colorMap[activeColor].hex : '#00f3ff';
            const secHex = (colorMap[activeColorSecondary] && colorMap[activeColorSecondary].hex) ? colorMap[activeColorSecondary].hex : mainHex;

            clockCtx.clearRect(0, 0, clockCanvas.width, clockCanvas.height);
            clockCtx.fillStyle = 'rgba(5, 10, 25, 0.85)';
            clockCtx.strokeStyle = mainHex;
            clockCtx.lineWidth = 3;
            clockCtx.beginPath();
            if (clockCtx.roundRect) {
                clockCtx.roundRect(10, 10, 492, 108, 14);
            } else {
                clockCtx.rect(10, 10, 492, 108);
            }
            clockCtx.fill();
            clockCtx.stroke();
            clockCtx.shadowColor = mainHex;
            clockCtx.shadowBlur = 12;
            clockCtx.font = '900 44px "Orbitron", sans-serif';
            clockCtx.fillStyle = mainHex;
            clockCtx.textAlign = 'center';
            clockCtx.textBaseline = 'middle';
            clockCtx.fillText(timeStr, clockCanvas.width / 2, clockCanvas.height / 2 - 6);
            clockCtx.font = '700 12px "Outfit", sans-serif';
            clockCtx.fillStyle = secHex;
            clockCtx.fillText('SYSTEM TIME // REAL-TIME TELEMETRY', clockCanvas.width / 2, clockCanvas.height - 24);
            if (clockTexture) clockTexture.needsUpdate = true;
        }

        function build3DClock() {
            if (clockGroup) scene.remove(clockGroup);
            clockCanvas = document.createElement('canvas');
            clockCanvas.width = 512;
            clockCanvas.height = 128;
            clockCtx = clockCanvas.getContext('2d');
            clockTexture = new THREE.CanvasTexture(clockCanvas);
            clockTexture.minFilter = THREE.LinearFilter;
            clockTexture.magFilter = THREE.LinearFilter;
            drawClockCanvas();
            const clockGeo = new THREE.PlaneGeometry(6, 1.5);
            const clockMat = new THREE.MeshBasicMaterial({ map: clockTexture, transparent: true, side: THREE.DoubleSide, depthWrite: false });
            clockMesh = new THREE.Mesh(clockGeo, clockMat);
            const mainColor = colorMap[activeColor] ? colorMap[activeColor].three : 0x00f3ff;
            const frameGeo = new THREE.PlaneGeometry(6.3, 1.8);
            const frameMat = new THREE.MeshBasicMaterial({ color: mainColor, wireframe: true, transparent: true, opacity: 0.3 });
            const frameMesh = new THREE.Mesh(frameGeo, frameMat);
            frameMesh.position.z = -0.05;
            clockGroup = new THREE.Group();
            clockGroup.add(clockMesh);
            clockGroup.add(frameMesh);
            clockGroup.position.set(clockPosX, clockPosY, clockPosZ);
            clockGroup.scale.set(clockScale, clockScale, clockScale);
            clockGroup.visible = clockVisible;
            scene.add(clockGroup);
        }

        function update3DClock() {
            if (!clockGroup) return;
            clockGroup.visible = clockVisible;
            if (!clockVisible) return;
            drawClockCanvas();
        }

        // --- PARTICLE NEBULA BUILDER (exported) ---
        function buildParticleNebula() {
            if (nebulaGroup) { scene.remove(nebulaGroup); nebulaGroup = null; nebulaParticles = null; }
            const particleCount = 1800;
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);
            const c1 = new THREE.Color(colorMap[activeColor] ? colorMap[activeColor].three : 0x00f3ff);
            const c2 = new THREE.Color(colorMap[activeColorSecondary] ? colorMap[activeColorSecondary].three : c1.getHex());
            for (let i = 0; i < particleCount; i++) {
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                const r = 5 + Math.random() * 7;
                positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
                positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
                positions[i * 3 + 2] = r * Math.cos(phi);
                const blend = Math.random();
                const blended = c1.clone().lerp(c2, blend);
                colors[i * 3] = blended.r; colors[i * 3 + 1] = blended.g; colors[i * 3 + 2] = blended.b;
            }
            const geo = new THREE.BufferGeometry();
            geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            const mat = new THREE.PointsMaterial({ size: 0.085, vertexColors: true, transparent: true, opacity: 0.72, sizeAttenuation: true });
            nebulaParticles = new THREE.Points(geo, mat);
            nebulaGroup = new THREE.Group();
            nebulaGroup.add(nebulaParticles);
            nebulaGroup.visible = nebulaVisible;
            scene.add(nebulaGroup);
        }

        let clock = 0;
        function animate() {
            requestAnimationFrame(animate);
            let vol = 1.0;
            let bass = 0;
            if (micEnabled && analyserNode && freqData) {
                analyserNode.getByteFrequencyData(freqData);
                let sum = 0;
                for(let i=0; i<freqData.length; i++) sum += freqData[i];
                vol = 1.0 + (sum / freqData.length / 128) * 1.5;
                let bassSum = 0; for(let i=0; i<10; i++) bassSum += freqData[i];
                bass = bassSum / 10;
            }
            const speed = rotationSpeed * vol * (1 + (bass / 100));
            clock += 0.01 * speed;
            
            if (customModel) {
                if (customModelOrbit) customModel.rotation.y += 0.005 * speed;
                customModel.scale.setScalar(customModelScale * vol);
                customModel.position.y = customModelY;
                if (scanPlane) scanPlane.position.y = -2.5 + Math.sin(clock * 3.5) * 3.2;
                customModel.traverse(c => {
                    if (c.isMesh && c.material) {
                        const col = isTargetLocked ? 0xff3333 : colorMap[activeColor].three;
                        if (c.material.color) c.material.color.setHex(col);
                    } else if (c.isPoints && c.material) {
                        c.material.color.setHex(isTargetLocked ? 0xff3333 : colorMap[activeColor].three);
                    }
                });
            } else if (coreMesh) {
                coreMesh.rotation.y += 0.005 * speed;
                coreMesh.rotation.x += 0.002 * speed;
                coreMesh.scale.setScalar((1 + Math.sin(clock * 5) * 0.05) * vol);
                if (coreMesh.material && coreMesh.material.color) coreMesh.material.color.setHex(isTargetLocked ? 0xff3333 : colorMap[activeColor].three);
            }
            if (ring1) {
                ring1.rotation.z -= 0.01 * speed;
                if (ring1.material && ring1.material.color) ring1.material.color.setHex(isTargetLocked ? 0xff3333 : colorMap[activeColor].three);
            }
            if (radarLine) radarLine.rotation.z -= 0.02 * speed;
            
            if (waveLines.length > 0) {
                waveLines.forEach((wl, wlIdx) => {
                    const posAttr = wl.mesh.geometry.attributes.position;
                    let sub = [];
                    if (micEnabled && freqData) {
                        const step = Math.floor(freqData.length/3);
                        sub = freqData.slice(wlIdx*step, (wlIdx+1)*step);
                    }
                    for (let i = 0; i < posAttr.count; i++) {
                        const theta = (i / (posAttr.count - 1)) * Math.PI * 2;
                        let displacement = 0.3 * Math.cos(clock * 2);
                        if (micEnabled && sub.length > 0) displacement = (sub[Math.floor((i/posAttr.count)*sub.length)] / 255) * 1.5;
                        posAttr.setY(i, Math.sin(theta * (micEnabled ? 16 : 8) + clock * wl.rate) * displacement);
                    }
                    posAttr.needsUpdate = true;
                });
            }
            controls.update();

            // Update 3D clock
            if (clockVisible) update3DClock();

            // Animate particle nebula
            if (nebulaGroup && nebulaVisible) {
                nebulaGroup.rotation.y += 0.0004;
                nebulaGroup.rotation.x += 0.0002;
                if (nebulaParticles && micEnabled && freqData) {
                    let avgVol = 0;
                    for (let i = 0; i < freqData.length; i++) avgVol += freqData[i];
                    avgVol /= freqData.length;
                    nebulaParticles.material.opacity = 0.4 + (avgVol / 255) * 0.6;
                }
            }

            updateAnnotations();
            renderer.render(scene, camera);
        }

        let telemetryTimeout = null;
        function updateTelemetry() {
            if (telemetryTimeout) clearTimeout(telemetryTimeout);
            telemetryTimeout = setTimeout(runTelemetryCalculation, 50);
        }

        function runTelemetryCalculation() {
            const target = customModel ? customModel : coreMesh;
            if (!target) return;
            
            let totalTriangles = 0;
            let activeTriangles = 0;
            let volumeSum = 0;
            const centerOfMass = new THREE.Vector3();
            let keptVerticesCount = 0;
            
            target.updateMatrixWorld(true);
            
            target.traverse(c => {
                if (c.isMesh && !c.userData.isOutline) {
                    const geom = c.geometry;
                    if (!geom || !geom.attributes.position) return;
                    
                    const posAttr = geom.attributes.position;
                    const indexAttr = geom.index;
                    
                    const indices = [];
                    if (indexAttr) {
                        for (let i = 0; i < indexAttr.count; i++) indices.push(indexAttr.getX(i));
                    } else {
                        for (let i = 0; i < posAttr.count; i++) indices.push(i);
                    }
                    
                    totalTriangles += indices.length / 3;
                    
                    const v0 = new THREE.Vector3();
                    const v1 = new THREE.Vector3();
                    const v2 = new THREE.Vector3();
                    
                    for (let i = 0; i < indices.length; i += 3) {
                        const idx0 = indices[i];
                        const idx1 = indices[i+1];
                        const idx2 = indices[i+2];
                        
                        v0.set(posAttr.getX(idx0), posAttr.getY(idx0), posAttr.getZ(idx0)).applyMatrix4(c.matrixWorld);
                        v1.set(posAttr.getX(idx1), posAttr.getY(idx1), posAttr.getZ(idx1)).applyMatrix4(c.matrixWorld);
                        v2.set(posAttr.getX(idx2), posAttr.getY(idx2), posAttr.getZ(idx2)).applyMatrix4(c.matrixWorld);
                        
                        let isClipped = false;
                        if (customModelSliceY < 3.0) {
                            if (v0.y > customModelSliceY || v1.y > customModelSliceY || v2.y > customModelSliceY) isClipped = true;
                        }
                        if (customModelSliceX < 3.0) {
                            if (v0.x > customModelSliceX || v1.x > customModelSliceX || v2.x > customModelSliceX) isClipped = true;
                        }
                        if (customModelSliceZ < 3.0) {
                            if (v0.z > customModelSliceZ || v1.z > customModelSliceZ || v2.z > customModelSliceZ) isClipped = true;
                        }
                        
                        if (!isClipped) {
                            activeTriangles++;
                            centerOfMass.add(v0).add(v1).add(v2);
                            keptVerticesCount += 3;
                            
                            const term = (v0.x * v1.y * v2.z + v1.x * v2.y * v0.z + v2.x * v0.y * v1.z 
                                        - v2.x * v1.y * v0.z - v1.x * v0.y * v2.z - v0.x * v2.y * v1.z) / 6.0;
                            volumeSum += term;
                        }
                    }
                }
            });
            
            if (keptVerticesCount > 0) {
                centerOfMass.divideScalar(keptVerticesCount);
            }
            
            const displayVolume = Math.abs(volumeSum);
            
            animateCounter('telemetry-polygons', activeTriangles);
            animateCounter('telemetry-total-polygons', totalTriangles);
            
            const volEl = document.getElementById('telemetry-volume');
            if (volEl) volEl.innerText = displayVolume.toFixed(3) + " m³";
            
            const comEl = document.getElementById('telemetry-com');
            if (comEl) comEl.innerText = '[' + centerOfMass.x.toFixed(2) + ', ' + centerOfMass.y.toFixed(2) + ', ' + centerOfMass.z.toFixed(2) + ']';
            
            const syEl = document.getElementById('telemetry-val-y');
            if (syEl) syEl.innerText = customModelSliceY < 3.0 ? customModelSliceY.toFixed(2) + "m" : "OFF";
            
            const sxEl = document.getElementById('telemetry-val-x');
            if (sxEl) sxEl.innerText = customModelSliceX < 3.0 ? customModelSliceX.toFixed(2) + "m" : "OFF";
            
            const szEl = document.getElementById('telemetry-val-z');
            if (szEl) szEl.innerText = customModelSliceZ < 3.0 ? customModelSliceZ.toFixed(2) + "m" : "OFF";
        }

        function animateCounter(id, targetVal) {
            const el = document.getElementById(id);
            if (!el) return;
            const startVal = parseInt(el.innerText.replace(/,/g, '')) || 0;
            if (startVal === targetVal) return;
            
            const duration = 200;
            const startTime = performance.now();
            
            function update(now) {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const currentVal = Math.round(startVal + progress * (targetVal - startVal));
                el.innerText = currentVal.toLocaleString();
                
                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }
            requestAnimationFrame(update);
        }

        window.onload = () => {
            init();
            animate();
        };
    </script>
</body>
</html>`;

        // Trigger file download
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `sci-fi-hologram-${activePreset}.html`;
        link.click();
        logTerminal('Exported standalone HTML build successfully.');
    } catch (err) {
        console.error('Error generating HTML package for export:', err);
        logTerminal('ERROR: Failed to bundle CSS file.');
        playSound('error');
    }
}

// --- 13. BIND DOM EVENT HANDLERS ---
function bindEvents() {
    // Presets dropdown
    document.getElementById('preset-select').addEventListener('change', (e) => {
        applyPreset(e.target.value);
    });

    // Color buttons
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            activeColor = btn.dataset.color;
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            logTerminal(`Primary color altered to ${activeColor.toUpperCase()}`);
            playSound('click');

            // Rebuild color dependent components
            buildGrid();
            buildRadar();
            buildWaveforms();
            
            if (customModel) {
                applyHologramMaterial();
                const box = new THREE.Box3().setFromObject(customModel);
                const size = new THREE.Vector3();
                box.getSize(size);
                buildScanPlane(size.x);
            } else {
                buildCore();
            }
            
            buildReticle();
            buildParticleNebula();
            updateCodeOutput();
        });
    });

    // Secondary color buttons
    document.querySelectorAll('.color-btn-sec').forEach(btn => {
        btn.addEventListener('click', (e) => {
            activeColorSecondary = btn.dataset.secColor;
            document.querySelectorAll('.color-btn-sec').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            logTerminal(`Secondary color altered to ${activeColorSecondary.toUpperCase()}`);
            playSound('click');
            buildCore();
            updateCodeOutput();
        });
    });

    // Voice AI Toggle
    const voiceBtn = document.getElementById('btn-voice-toggle');
    if (voiceBtn) {
        voiceBtn.addEventListener('click', () => {
            voiceEnabled = !voiceEnabled;
            voiceBtn.classList.toggle('active', voiceEnabled);
            const vTxt = document.getElementById('txt-voice');
            if (vTxt) vTxt.textContent = voiceEnabled ? hologramTranslations[currentLang].voice_on : hologramTranslations[currentLang].voice_off;
            playSound('click');
            if (voiceEnabled) speakAI("Voix IA Activée", "AI Voice Telemetry Activated");
        });
    }

    // Language Toggle FR / EN
    const btnFr = document.getElementById('btn-lang-fr');
    const btnEn = document.getElementById('btn-lang-en');
    if (btnFr) btnFr.addEventListener('click', () => applyHologramLang('fr'));
    if (btnEn) btnEn.addEventListener('click', () => applyHologramLang('en'));

    // 3D Exploded View Slider
    const expSlider = document.getElementById('exploded-slider');
    if (expSlider) {
        expSlider.addEventListener('input', (e) => {
            explodedFactor = parseFloat(e.target.value);
            const valEl = document.getElementById('exploded-value');
            if (valEl) valEl.innerText = explodedFactor > 0 ? `${explodedFactor.toFixed(1)}x` : "OFF";
            buildCore();
        });
    }

    // Sound toggle button
    document.getElementById('btn-sound-toggle').addEventListener('click', (e) => {
        soundEnabled = !soundEnabled;
        const btn = document.getElementById('btn-sound-toggle');
        btn.classList.toggle('active', soundEnabled);
        btn.innerHTML = soundEnabled 
            ? `<i class="fa-solid fa-volume-high"></i> Audio: ON` 
            : `<i class="fa-solid fa-volume-xmark"></i> Audio: OFF`;
        
        playSound('click');
        logTerminal(`Acoustic feedback toggled ${soundEnabled ? 'ON' : 'OFF'}`);
    });

    // Mic toggle button
    document.getElementById('btn-mic-toggle').addEventListener('click', toggleMic);

    // Theater/VJ mode toggle
    document.getElementById('btn-theater-mode').addEventListener('click', () => {
        document.body.classList.toggle('theater-active');
        const active = document.body.classList.contains('theater-active');
        const btn = document.getElementById('btn-theater-mode');
        btn.classList.toggle('active', active);
        btn.innerHTML = active 
            ? `<i class="fa-solid fa-compress"></i> Editor Mode` 
            : `<i class="fa-solid fa-expand"></i> VJ Mode`;
        
        playSound('sonar');
        logTerminal(`VJ Theater Mode ${active ? 'ENGAGED' : 'RELEASED'}`);
        setTimeout(onWindowResize, 200); // trigger scene resize after anim
    });

    // Main HUD Sliders
    const speedSlider = document.getElementById('speed-slider');
    speedSlider.addEventListener('input', (e) => {
        rotationSpeed = parseFloat(e.target.value);
        document.getElementById('speed-value').innerText = `${rotationSpeed}x`;
        updateCodeOutput();
    });
    speedSlider.addEventListener('change', () => playSound('click'));

    const scanSlider = document.getElementById('scanline-slider');
    scanSlider.addEventListener('input', (e) => {
        document.getElementById('scanline-value').innerText = `${e.target.value}%`;
        updateCodeOutput();
    });
    scanSlider.addEventListener('change', () => playSound('click'));

    const glitchSlider = document.getElementById('glitch-slider');
    glitchSlider.addEventListener('input', (e) => {
        document.getElementById('glitch-value').innerText = `${e.target.value}%`;
        updateCodeOutput();
    });
    glitchSlider.addEventListener('change', () => playSound('click'));

    // 3D Digital Clock & Modules Control Listeners
    const chkClock = document.getElementById('layer-clock');
    if (chkClock) chkClock.addEventListener('change', (e) => { clockVisible = e.target.checked; update3DClock(); playSound('click'); });

    const chkExpClock = document.getElementById('export-clock');
    if (chkExpClock) chkExpClock.addEventListener('change', (e) => { clockExport = e.target.checked; playSound('click'); });

    const chkGlobe = document.getElementById('layer-globe');
    if (chkGlobe) chkGlobe.addEventListener('change', (e) => { globeVisible = e.target.checked; if (globeGroup) globeGroup.visible = globeVisible; playSound('click'); });

    const chkVis = document.getElementById('layer-visualizer');
    if (chkVis) chkVis.addEventListener('change', (e) => { visVisible = e.target.checked; if (visualizerGroup) visualizerGroup.visible = visVisible; playSound('click'); });

    const slClockY = document.getElementById('clock-y-slider');
    if (slClockY) slClockY.addEventListener('input', (e) => { clockPosY = parseFloat(e.target.value); document.getElementById('clock-y-val').innerText = `${clockPosY.toFixed(1)}m`; update3DClock(); });

    const slClockX = document.getElementById('clock-x-slider');
    if (slClockX) slClockX.addEventListener('input', (e) => { clockPosX = parseFloat(e.target.value); document.getElementById('clock-x-val').innerText = `${clockPosX.toFixed(1)}m`; update3DClock(); });

    const slClockScale = document.getElementById('clock-scale-slider');
    if (slClockScale) slClockScale.addEventListener('input', (e) => { clockScale = parseFloat(e.target.value); document.getElementById('clock-scale-val').innerText = `${clockScale.toFixed(1)}x`; update3DClock(); });

    // Layer checkboxes toggles
    const checkIds = ['layer-grid', 'layer-radar', 'layer-wave', 'layer-terminal', 'layer-bloom'];
    checkIds.forEach(id => {
        document.getElementById(id).addEventListener('change', () => {
            updateLayerVisibilities();
            playSound('click');
            logTerminal(`Layer visibility toggled: ${id.toUpperCase().split('-')[1]}`);
        });
    });

    // --- Drag and Drop File Input Listeners ---
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    
    dropZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileSelect(e.target.files[0]);
        }
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    });

    // Custom Model Sliders Controls
    document.getElementById('material-mode').addEventListener('change', (e) => {
        customModelMaterialMode = e.target.value;
        if (customModel) {
            applyHologramMaterial();
            logTerminal(`Hologram visuals switched to ${customModelMaterialMode.toUpperCase()}`);
            playSound('click');
        }
    });

    const mScale = document.getElementById('model-scale-slider');
    mScale.addEventListener('input', (e) => {
        customModelScale = parseFloat(e.target.value);
        document.getElementById('model-scale-value').innerText = `${customModelScale.toFixed(1)}x`;
        updateTelemetry();
    });
    mScale.addEventListener('change', () => playSound('click'));

    const mHeightY = document.getElementById('model-y-slider');
    mHeightY.addEventListener('input', (e) => {
        customModelY = parseFloat(e.target.value);
        document.getElementById('model-y-value').innerText = `${customModelY.toFixed(1)}m`;
        updateTelemetry();
    });
    mHeightY.addEventListener('change', () => playSound('click'));

    document.getElementById('model-orbit').addEventListener('change', (e) => {
        customModelOrbit = e.target.checked;
        logTerminal(`Model auto-orbit toggled: ${customModelOrbit ? 'ENABLED' : 'DISABLED'}`);
        playSound('click');
    });

    // Model Slicing Sliders
    document.getElementById('model-slice-y').addEventListener('input', (e) => {
        customModelSliceY = parseFloat(e.target.value);
        document.getElementById('model-slice-y-val').innerText = customModelSliceY === 3.0 ? 'OFF' : `${customModelSliceY.toFixed(1)}m`;
        localPlanes[0].constant = customModelSliceY;
        updateTelemetry();
    });
    document.getElementById('model-slice-y').addEventListener('change', () => playSound('click'));

    document.getElementById('model-slice-x').addEventListener('input', (e) => {
        customModelSliceX = parseFloat(e.target.value);
        document.getElementById('model-slice-x-val').innerText = customModelSliceX === 3.0 ? 'OFF' : `${customModelSliceX.toFixed(1)}m`;
        localPlanes[1].constant = customModelSliceX;
        updateTelemetry();
    });
    document.getElementById('model-slice-x').addEventListener('change', () => playSound('click'));

    document.getElementById('model-slice-z').addEventListener('input', (e) => {
        customModelSliceZ = parseFloat(e.target.value);
        document.getElementById('model-slice-z-val').innerText = customModelSliceZ === 3.0 ? 'OFF' : `${customModelSliceZ.toFixed(1)}m`;
        localPlanes[2].constant = customModelSliceZ;
        updateTelemetry();
    });
    document.getElementById('model-slice-z').addEventListener('change', () => playSound('click'));

    // Clear Annotations Button
    document.getElementById('btn-clear-annotations').addEventListener('click', () => {
        clearAnnotations();
        logTerminal('All scan labels cleared.');
        playSound('sonar');
    });

    // Export Blueprint Button
    document.getElementById('btn-export-blueprint').addEventListener('click', exportBlueprintSVG);

    // 3D Model Exporters Buttons
    document.getElementById('btn-export-glb').addEventListener('click', exportGLB);
    document.getElementById('btn-export-obj').addEventListener('click', exportOBJ);
    document.getElementById('btn-export-stl').addEventListener('click', exportSTL);

    // Share HUD URL Config Button
    document.getElementById('btn-share-hud').addEventListener('click', shareHUD);

    // Particle Nebula Toggle
    document.getElementById('toggle-nebula').addEventListener('change', (e) => {
        nebulaVisible = e.target.checked;
        if (nebulaGroup) nebulaGroup.visible = nebulaVisible;
        logTerminal(nebulaVisible ? 'Particle nebula field activated.' : 'Particle nebula field deactivated.');
        playSound('hover');
    });



    // Reset Model to default shapes
    document.getElementById('btn-reset-model').addEventListener('click', () => {
        customModel = null;
        customModelName = '';
        uploadedModelBase64 = '';
        uploadedModelExtension = '';
        clearAnnotations();
        buildCore();
        playSound('sonar');
        logTerminal('Restored core shapes preset. Active model unloaded.');

        // Hide Slice & Annotation Groups
        document.getElementById('model-slice-group').style.display = 'none';
        document.getElementById('model-annotation-group').style.display = 'none';
        customModelSliceY = 3.0;
        customModelSliceX = 3.0;
        customModelSliceZ = 3.0;
        localPlanes[0].constant = 3.0;
        localPlanes[1].constant = 3.0;
        localPlanes[2].constant = 3.0;
        clearAnnotations();
    });

    // Stage Mouse/Click Interactions
    const stage = document.getElementById('stage-container');
    stage.addEventListener('mousemove', onStageMouseMove);
    stage.addEventListener('mouseleave', onStageMouseLeave);
    stage.addEventListener('dblclick', onStageDblClick);

    // Copy CSS Button
    document.getElementById('btn-copy-code').addEventListener('click', () => {
        if (typeof window.isUserPremium === 'function' && !window.isUserPremium()) {
            if (typeof window.showPaywallModal === 'function') {
                window.showPaywallModal();
                return;
            }
        }
        const codeText = document.getElementById('code-output').textContent;
        navigator.clipboard.writeText(codeText);
        playSound('sonar');
        logTerminal('CSS variables copied to system clipboard.');
        
        // Temp feedback message
        const btn = document.getElementById('btn-copy-code');
        const origText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        setTimeout(() => { btn.innerHTML = origText; }, 1500);
    });

    // Download/Export Button
    document.getElementById('btn-export-html').addEventListener('click', () => {
        if (typeof window.isUserPremium === 'function' && !window.isUserPremium()) {
            if (typeof window.showPaywallModal === 'function') {
                window.showPaywallModal();
                return;
            }
        }
        exportStandaloneHTML();
    });

    // Audio hover sounds for all buttons and sliders
    const interactiveElements = document.querySelectorAll('button, select, input[type="range"], input[type="checkbox"]');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => playSound('hover'));
    });
}

// --- 14. INITIALIZATION ON PAGE LOAD ---
window.onload = () => {
    init3D();
    animate();
    bindEvents();
    setTimeout(onWindowResize, 100);
    setTimeout(onWindowResize, 500);
    updateCodeOutput();
    loadHUDFromURL();
    logTerminal('Quantum HUD Builder online. Système en ligne.');
};
