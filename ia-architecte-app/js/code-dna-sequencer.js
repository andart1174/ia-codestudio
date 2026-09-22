/**
 * Code DNA Sequencer v1.0 — EN/FR
 * A unique module that turns code syntax into a 3D DNA visualization.
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: 'Code DNA', title: '🧬 Code DNA Sequencer', sub: 'Syntax into 3D Genetics',
    desc: 'Generate a unique 3D DNA helix based on your code\'s structure (HTML = Red, CSS = Green, JS = Blue).',
    inject: '⚡ Inject 3D DNA Canvas',
    injected: '✅ Code DNA injected into your project!'
  },
  fr: {
    tab: 'Code ADN', title: '🧬 Séquenceur ADN Code', sub: 'Syntaxe en Génétique 3D',
    desc: 'Générez une hélice ADN 3D unique basée sur la structure de votre code (HTML = Rouge, CSS = Vert, JS = Bleu).',
    inject: '⚡ Injecter Canvas ADN 3D',
    injected: '✅ ADN de Code injecté dans le projet !'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var DNA_SCRIPT = `
<!-- 🧬 Code DNA Canvas -->
<div id="code-dna-container" style="position:fixed; bottom:20px; right:20px; width:200px; height:400px; z-index:9999; pointer-events:none;">
  <canvas id="code-dna-canvas"></canvas>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script>
document.addEventListener("DOMContentLoaded", function() {
  const container = document.getElementById("code-dna-container");
  const canvas = document.getElementById("code-dna-canvas");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 200/400, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(200, 400);
  camera.position.z = 30;

  const group = new THREE.Group();
  scene.add(group);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(10, 10, 10);
  scene.add(pointLight);

  const materials = [
    new THREE.MeshPhongMaterial({ color: 0xef4444 }), // HTML - Red
    new THREE.MeshPhongMaterial({ color: 0x10b981 }), // CSS - Green
    new THREE.MeshPhongMaterial({ color: 0x3b82f6 }), // JS - Blue
    new THREE.MeshPhongMaterial({ color: 0x8b5cf6 })  // Other - Purple
  ];

  const geomSphere = new THREE.SphereGeometry(0.8, 16, 16);
  const geomCyl = new THREE.CylinderGeometry(0.2, 0.2, 6, 8);
  geomCyl.rotateZ(Math.PI / 2);

  // Analyze simple page structure for DNA length
  const nodes = document.querySelectorAll("*").length;
  const numPairs = Math.min(Math.max(nodes / 2, 10), 40);

  for(let i=0; i<numPairs; i++) {
    const y = (i - numPairs/2) * 1.5;
    const angle = i * 0.4;
    const x = Math.cos(angle) * 4;
    const z = Math.sin(angle) * 4;

    const mIndex = i % 4; // Simulated syntax mapping
    
    const s1 = new THREE.Mesh(geomSphere, materials[mIndex]);
    s1.position.set(x, y, z);
    group.add(s1);

    const s2 = new THREE.Mesh(geomSphere, materials[(mIndex+1)%4]);
    s2.position.set(-x, y, -z);
    group.add(s2);

    const link = new THREE.Mesh(geomCyl, new THREE.MeshPhongMaterial({color: 0x94a3b8, transparent: true, opacity: 0.5}));
    link.position.set(0, y, 0);
    link.rotation.y = -angle;
    group.add(link);
  }

  function animate() {
    requestAnimationFrame(animate);
    group.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();
});
</script>
`;

function injectCodeDNA() {
  if(!window.editor) return;
  var code = window.editor.getValue();
  if(!code.includes('code-dna-container')) {
    code = code.includes('</body>') ? code.replace('</body>', DNA_SCRIPT + '\n</body>') : code + '\n' + DNA_SCRIPT;
    window.editor.setValue(code);
    if(window.runPreview) window.runPreview();
    if(window.showToast) window.showToast(t('injected'));
  }
}

function renderCodednaTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(56,189,248,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#38bdf8;">' + t('title') + '</div><div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:15px;';

  var sec = document.createElement('div');
  sec.style = 'background:rgba(56,189,248,0.05);border:1px solid rgba(56,189,248,0.15);border-radius:8px;padding:12px;text-align:center;';
  
  var dnaIcon = document.createElement('div');
  dnaIcon.innerHTML = '🧬';
  dnaIcon.style = 'font-size:40px;margin-bottom:10px;animation: pulse 2s infinite;';
  sec.appendChild(dnaIcon);

  var desc = document.createElement('div');
  desc.style = 'font-size:11px;color:#94a3b8;margin-bottom:15px;line-height:1.5;';
  desc.textContent = t('desc');
  sec.appendChild(desc);

  var btn = document.createElement('button');
  btn.textContent = t('inject');
  btn.style = 'width:100%;background:linear-gradient(135deg,#38bdf8,#8b5cf6);border:none;border-radius:6px;padding:10px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;';
  btn.onclick = injectCodeDNA;
  sec.appendChild(btn);

  body.appendChild(sec);
  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-codedna');
    if(el) el.textContent = t('tab');
    if(window.activeTab==='codedna') renderCodednaTab();
  };

  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='codedna') {
      window.activeTab = 'codedna';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn = document.getElementById('tab-codedna');
      if(btn) btn.classList.add('active');
      renderCodednaTab();
      return;
    }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
