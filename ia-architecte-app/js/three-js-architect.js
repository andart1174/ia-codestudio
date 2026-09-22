/**
 * 3D WebGL / Three.js Architect v2.0 — EN/FR
 * Pro Immersive Studio with GLTF Models, Earth, and Galaxies
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: '3D WebGL', title: '🎲 3D Architect', sub: 'Three.js Immersive Studio',
    mode: 'Scene Type', modeBasic: 'Basic Geometry', modeEarth: 'Real Earth Globe',
    modeAstro: 'Real 3D Model (Astronaut)', modeGalaxy: 'Particle Galaxy',
    shape: 'Geometry Shape', color: 'Material Color',
    cam: 'Camera Distance', speed: 'Rotation Speed',
    inject: '⚡ Inject 3D Scene', injected: '✅ 3D Scene Injected!',
    info: 'Adds Three.js + OrbitControls for a fully interactive experience.'
  },
  fr: {
    tab: '3D WebGL', title: '🎲 Architecte 3D', sub: 'Studio Immersif Three.js',
    mode: 'Type de Scène', modeBasic: 'Géométrie de Base', modeEarth: 'Globe Terrestre Réel',
    modeAstro: 'Modèle 3D Réel (Astronaute)', modeGalaxy: 'Galaxie de Particules',
    shape: 'Forme Géométrique', color: 'Couleur du Matériau',
    cam: 'Distance Caméra', speed: 'Vitesse de Rotation',
    inject: '⚡ Injecter Scène 3D', injected: '✅ Scène 3D Injectée !',
    info: 'Ajoute Three.js + OrbitControls pour une expérience interactive.'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var state = {
  mode: 'basic', // basic, earth, astro, galaxy
  shape: 'TorusKnotGeometry',
  color: '#3b82f6',
  cameraZ: '5',
  speed: '0.01'
};

var GEOMETRIES = [
  'BoxGeometry', 'SphereGeometry', 'TorusGeometry', 'TorusKnotGeometry', 
  'ConeGeometry', 'CylinderGeometry', 'DodecahedronGeometry', 
  'IcosahedronGeometry', 'OctahedronGeometry', 'TetrahedronGeometry'
];

function getGeometryArgs(s) {
  if(s === 'BoxGeometry') return '2, 2, 2';
  if(s === 'SphereGeometry') return '1.5, 32, 32';
  if(s === 'TorusGeometry') return '1.2, 0.4, 16, 100';
  if(s === 'TorusKnotGeometry') return '1, 0.3, 100, 16';
  if(s === 'ConeGeometry') return '1, 2, 32';
  if(s === 'CylinderGeometry') return '1, 1, 2, 32';
  return '1.5';
}

function inject3D() {
  if(!window.editor) return;

  var deps = '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>\n' +
             '<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>';
  
  if (state.mode === 'astro') {
    deps += '\n<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js"></script>';
  }

  var css = '<style id="ia-3d-css">\n  #canvas-container { width: 100%; height: 500px; background: #020617; overflow: hidden; display: flex; align-items: center; justify-content: center; border-radius: 12px; box-shadow: inset 0 0 30px rgba(0,0,0,0.8); cursor: grab; }\n  #canvas-container:active { cursor: grabbing; }\n</style>';

  var coreLogic = '';
  
  if (state.mode === 'basic') {
    coreLogic = 
      '  var geometry = new THREE.' + state.shape + '(' + getGeometryArgs(state.shape) + ');\n' +
      '  var material = new THREE.MeshStandardMaterial({ color: "' + state.color + '", roughness: 0.2, metalness: 0.8 });\n' +
      '  var obj = new THREE.Mesh(geometry, material);\n' +
      '  scene.add(obj);\n' +
      '  var light = new THREE.PointLight(0xffffff, 1, 100); light.position.set(10, 10, 10); scene.add(light);\n' +
      '  scene.add(new THREE.AmbientLight(0x404040));\n' +
      '  function updateObj() { obj.rotation.x += ' + state.speed + '; obj.rotation.y += ' + state.speed + '; }\n';
  } 
  else if (state.mode === 'earth') {
    coreLogic = 
      '  var texLoader = new THREE.TextureLoader();\n' +
      '  var geometry = new THREE.SphereGeometry(2, 64, 64);\n' +
      '  var material = new THREE.MeshPhongMaterial({\n' +
      '    map: texLoader.load("https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"),\n' +
      '    bumpMap: texLoader.load("https://unpkg.com/three-globe/example/img/earth-topology.png"),\n' +
      '    bumpScale: 0.05,\n' +
      '    specularMap: texLoader.load("https://unpkg.com/three-globe/example/img/earth-water.png"),\n' +
      '    specular: new THREE.Color("grey")\n' +
      '  });\n' +
      '  var obj = new THREE.Mesh(geometry, material);\n' +
      '  scene.add(obj);\n' +
      '  var light = new THREE.DirectionalLight(0xffffff, 1); light.position.set(5, 3, 5); scene.add(light);\n' +
      '  scene.add(new THREE.AmbientLight(0x333333));\n' +
      '  function updateObj() { obj.rotation.y += ' + state.speed + '; }\n';
  }
  else if (state.mode === 'astro') {
    coreLogic = 
      '  var obj = new THREE.Group(); scene.add(obj);\n' +
      '  scene.add(new THREE.AmbientLight(0xffffff, 1));\n' +
      '  var dirLight = new THREE.DirectionalLight(0xffffff, 1); dirLight.position.set(5,10,7); scene.add(dirLight);\n' +
      '  var loader = new THREE.GLTFLoader();\n' +
      '  loader.load("https://modelviewer.dev/shared-assets/models/Astronaut.glb", function(gltf) {\n' +
      '    var model = gltf.scene; model.scale.set(0.5, 0.5, 0.5); model.position.y = -1;\n' +
      '    obj.add(model);\n' +
      '  });\n' +
      '  function updateObj() { obj.rotation.y += ' + state.speed + '; }\n';
  }
  else if (state.mode === 'galaxy') {
    coreLogic = 
      '  var geo = new THREE.BufferGeometry();\n' +
      '  var count = 5000; var pos = new Float32Array(count * 3);\n' +
      '  for(var i=0; i<count*3; i++) { pos[i] = (Math.random() - 0.5) * 15; }\n' +
      '  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));\n' +
      '  var mat = new THREE.PointsMaterial({ size: 0.05, color: "' + state.color + '", transparent: true, opacity: 0.8 });\n' +
      '  var obj = new THREE.Points(geo, mat);\n' +
      '  scene.add(obj);\n' +
      '  function updateObj() { obj.rotation.y += ' + state.speed + '; obj.rotation.x += ' + state.speed + ' / 2; }\n';
  }

  var boilerplate = '\n<!-- 🎲 3D WebGL Scene -->\n<div id="canvas-container"></div>\n<script id="ia-3d-script">\n' +
    'document.addEventListener("DOMContentLoaded", function() {\n' +
    '  var container = document.getElementById("canvas-container");\n' +
    '  if(!container) return;\n' +
    '  var scene = new THREE.Scene();\n' +
    '  var camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);\n' +
    '  var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });\n' +
    '  renderer.setSize(container.clientWidth, container.clientHeight);\n' +
    '  renderer.setPixelRatio(window.devicePixelRatio);\n' +
    '  container.appendChild(renderer.domElement);\n\n' +
    '  var controls = new THREE.OrbitControls(camera, renderer.domElement);\n' +
    '  controls.enableDamping = true; controls.dampingFactor = 0.05;\n\n' +
    coreLogic +
    '  camera.position.z = ' + state.cameraZ + ';\n\n' +
    '  function animate() {\n' +
    '    requestAnimationFrame(animate);\n' +
    '    updateObj();\n' +
    '    controls.update();\n' +
    '    renderer.render(scene, camera);\n' +
    '  }\n' +
    '  animate();\n\n' +
    '  window.addEventListener("resize", function() {\n' +
    '    camera.aspect = container.clientWidth / container.clientHeight;\n' +
    '    camera.updateProjectionMatrix();\n' +
    '    renderer.setSize(container.clientWidth, container.clientHeight);\n' +
    '  });\n' +
    '});\n' +
    '</script>\n';

  var code = window.editor.getValue();
  code = code.replace(/<!-- 🎲 3D WebGL Scene -->[\s\S]*?<\/script>\n/gi, '');
  code = code.replace(/<style id="ia-3d-css">[\s\S]*?<\/style>/gi, '');

  if(!code.includes('three.min.js')) {
    code = code.includes('</head>') ? code.replace('</head>', deps + '\n</head>') : deps + '\n' + code;
  }

  code = code.includes('</head>') ? code.replace('</head>', css + '\n</head>') : css + '\n' + code;
  code = code.includes('</body>') ? code.replace('</body>', boilerplate + '\n</body>') : code + '\n' + boilerplate;

  window.editor.setValue(code);
  if(window.runPreview) window.runPreview();
  if(window.showToast) window.showToast(t('injected'));
}

function render3DTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(14,165,233,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#0ea5e9;">' + t('title') + '</div><div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:15px;';

  var form = document.createElement('div');
  form.style = 'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;display:flex;flex-direction:column;gap:12px;';

  function makeLabel(txt) {
    var l = document.createElement('div'); l.style = 'font-size:9px;color:#94a3b8;margin-bottom:4px;'; l.textContent = txt; return l;
  }

  // Scene Mode
  var dMode = document.createElement('div');
  dMode.appendChild(makeLabel(t('mode')));
  var selMode = document.createElement('select');
  selMode.style = 'width:100%;background:rgba(14,165,233,0.1);border:1px solid rgba(14,165,233,0.3);border-radius:6px;padding:8px;color:#38bdf8;font-size:11px;font-weight:bold;outline:none;';
  [{v:'basic', l:t('modeBasic')}, {v:'earth', l:t('modeEarth')}, {v:'astro', l:t('modeAstro')}, {v:'galaxy', l:t('modeGalaxy')}].forEach(function(m) {
    var opt = document.createElement('option'); opt.value = m.v; opt.textContent = m.l;
    if(state.mode === m.v) opt.selected = true;
    selMode.appendChild(opt);
  });
  selMode.onchange = function(){ state.mode = selMode.value; render3DTab(); };
  dMode.appendChild(selMode);
  form.appendChild(dMode);

  // Shape Selector (only for basic)
  if (state.mode === 'basic') {
    var dShape = document.createElement('div');
    dShape.appendChild(makeLabel(t('shape')));
    var selShape = document.createElement('select');
    selShape.style = 'width:100%;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:8px;color:#fff;font-size:11px;outline:none;';
    GEOMETRIES.forEach(function(s) {
      var opt = document.createElement('option'); opt.value = s; opt.textContent = s.replace('Geometry','');
      if(state.shape === s) opt.selected = true;
      selShape.appendChild(opt);
    });
    selShape.onchange = function(){ state.shape = selShape.value; };
    dShape.appendChild(selShape);
    form.appendChild(dShape);
  }

  // Color (for basic & galaxy)
  if (state.mode === 'basic' || state.mode === 'galaxy') {
    var dCol = document.createElement('div');
    dCol.appendChild(makeLabel(t('color')));
    var inpCol = document.createElement('input'); inpCol.type = 'color'; inpCol.value = state.color;
    inpCol.style = 'width:100%;height:32px;background:none;border:1px solid rgba(255,255,255,0.1);border-radius:6px;cursor:pointer;padding:2px;';
    inpCol.oninput = function(){ state.color = inpCol.value; };
    dCol.appendChild(inpCol);
    form.appendChild(dCol);
  }

  // Camera Z
  var dCam = document.createElement('div');
  dCam.appendChild(makeLabel(t('cam')));
  var rngCam = document.createElement('input'); rngCam.type = 'range'; rngCam.min = '2'; rngCam.max = '20'; rngCam.step = '1'; rngCam.value = state.cameraZ;
  rngCam.style = 'width:100%;';
  rngCam.oninput = function(){ state.cameraZ = rngCam.value; };
  dCam.appendChild(rngCam);
  form.appendChild(dCam);

  // Speed
  var dSpd = document.createElement('div');
  dSpd.appendChild(makeLabel(t('speed')));
  var rngSpd = document.createElement('input'); rngSpd.type = 'range'; rngSpd.min = '0'; rngSpd.max = '0.1'; rngSpd.step = '0.005'; rngSpd.value = state.speed;
  rngSpd.style = 'width:100%;';
  rngSpd.oninput = function(){ state.speed = rngSpd.value; };
  dSpd.appendChild(rngSpd);
  form.appendChild(dSpd);

  body.appendChild(form);

  var info = document.createElement('div');
  info.style = 'font-size:10px;color:#64748b;line-height:1.4;font-style:italic;text-align:center;padding:0 10px;';
  info.textContent = t('info');
  body.appendChild(info);

  var bInj = document.createElement('button');
  bInj.textContent = t('inject');
  bInj.style = 'width:100%;background:linear-gradient(135deg,#0ea5e9,#0284c7);border:none;border-radius:6px;padding:12px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;margin-top:auto;';
  bInj.onclick = inject3D;
  
  wrap.appendChild(body);
  wrap.appendChild(bInj);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-3d');
    if(el) el.textContent = t('tab');
    if(window.activeTab==='3d') render3DTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='3d') {
      window.activeTab = '3d';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn = document.getElementById('tab-3d');
      if(btn) btn.classList.add('active');
      render3DTab(); return;
    }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
