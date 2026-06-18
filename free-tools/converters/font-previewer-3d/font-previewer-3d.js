// 3D Google Fonts Previewer Script

const watermarkCode = `
  <!-- IA Code Studio Embed Watermark (Remove by upgrading to Premium) -->
  <div id="ia-code-watermark" style="position:fixed;bottom:15px;right:15px;z-index:999999;background:rgba(15,17,26,0.85);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(0,240,255,0.25);border-radius:30px;padding:8px 16px;box-shadow:0 4px 15px rgba(0,240,255,0.15);font-family:'Outfit',sans-serif;font-size:12px;font-weight:600;display:flex;align-items:center;gap:6px;cursor:pointer;transition:all 0.3s ease;user-select:none;" onclick="window.open('https://ia-codestudio.com','_blank')">
    <span style="color:#00f0ff;animation:pulse-glow 1.5s infinite alternate;">⚡</span>
    <span style="color:#fff;letter-spacing:0.5px;">3D Widget by <span style="background:linear-gradient(135deg,#00f0ff,#ff007f);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">IA Code Studio</span></span>
  </div>
  <style>
    @keyframes pulse-glow {
      0% { transform: scale(1); filter: drop-shadow(0 0 2px rgba(0,240,255,0.4)); }
      100% { transform: scale(1.1); filter: drop-shadow(0 0 8px rgba(0,240,255,0.8)); }
    }
    #ia-code-watermark:hover {
      transform: translateY(-2px);
      border-color: #00f0ff;
      box-shadow: 0 6px 20px rgba(0,240,255,0.3);
    }
  </style>
`;

// Font URL map (using jsdelivr CDN for perfect CORS access)
const fontUrls = {
  helvetiker: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/fonts/helvetiker_regular.typeface.json',
  gentilis: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/fonts/gentilis_regular.typeface.json',
  optimer: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/fonts/optimer_regular.typeface.json'
};

const fontCache = {};
let scene, camera, renderer, controls, textMesh;
let activeFontName = 'helvetiker';
const container = document.getElementById('preview-container-box');

// Setup Three.js Scene
function initScene() {
  const width = container.clientWidth || 400;
  const height = container.clientHeight || 280;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, 10);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxDistance = 25;
  controls.minDistance = 3;

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(5, 5, 10);
  scene.add(dirLight);

  const pointLight = new THREE.PointLight(0x00f0ff, 1, 30);
  pointLight.position.set(0, 0, 2);
  scene.add(pointLight);

  // Resize handler
  window.addEventListener('resize', () => {
    const w = container.clientWidth || 400;
    const h = container.clientHeight || 280;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  
  if (textMesh) {
    // Slow drift rotation
    textMesh.rotation.y = Math.sin(Date.now() * 0.0005) * 0.25;
  }

  controls.update();
  renderer.render(scene, camera);
}

// Load selected Font and build 3D mesh
function update3DText() {
  const textStr = document.getElementById('inp-text-3d').value || 'IA';
  const fontName = document.getElementById('inp-font-style').value;
  const depth = parseFloat(document.getElementById('inp-depth').value) / 10;
  const color = document.getElementById('inp-color-3d').value;
  const bevelEnabled = document.getElementById('chk-bevel').checked;
  const glowEnabled = document.getElementById('chk-glow').checked;

  document.getElementById('depth-val').textContent = depth.toFixed(1);

  // If font is cached, parse immediately
  if (fontCache[fontName]) {
    buildMesh(fontCache[fontName], textStr, depth, color, bevelEnabled, glowEnabled);
  } else {
    // Fetch typeface JSON
    fetch(fontUrls[fontName])
      .then(res => res.json())
      .then(data => {
        const loader = new THREE.FontLoader();
        const font = loader.parse(data);
        fontCache[fontName] = font;
        buildMesh(font, textStr, depth, color, bevelEnabled, glowEnabled);
      })
      .catch(err => console.error("Failed to load typeface json: ", err));
  }

  activeFontName = fontName;
}

function buildMesh(font, text, depth, color, bevel, glow) {
  if (textMesh) {
    scene.remove(textMesh);
  }

  const geometry = new THREE.TextGeometry(text, {
    font: font,
    size: 1.2,
    height: depth,
    curveSegments: 8,
    bevelEnabled: bevel,
    bevelThickness: 0.05,
    bevelSize: 0.03,
    bevelOffset: 0,
    bevelSegments: 4
  });

  // Center geometry
  geometry.computeBoundingBox();
  const centerOffset = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
  const centerOffsetY = -0.5 * (geometry.boundingBox.max.y - geometry.boundingBox.min.y);
  geometry.translate(centerOffset, centerOffsetY, 0);

  // Materials
  const frontMat = new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.2,
    metalness: 0.8
  });

  const sideMat = new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.5,
    metalness: 0.2
  });

  // Volumetric material parameters mapping
  if (glow) {
    frontMat.emissive = new THREE.Color(color);
    frontMat.emissiveIntensity = 0.55;
  }

  textMesh = new THREE.Mesh(geometry, [frontMat, sideMat]);
  scene.add(textMesh);

  // Update output textarea code block
  generateOutputCode(text, depth, color, bevel, glow);
}

function generateOutputCode(text, depth, color, bevel, glow) {
  const includeWatermark = document.getElementById('chk-watermark').checked;
  const fontUrl = fontUrls[activeFontName];

  const html = `<!-- 3D Volumetric Text Widget -->
<div id="canvas-container-3d"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/FontLoader.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/geometries/TextGeometry.js"></script>`;

  const css = `<style>
  * { margin: 0; padding: 0; }
  body { background-color: #050508; overflow: hidden; height: 100vh; }
  #canvas-container-3d { width: 100vw; height: 100vh; }
</style>`;

  const js = `<script>
  const container = document.getElementById('canvas-container-3d');
  const scene = new THREE.Scene();
  
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 8);
  
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);
  
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  
  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(5, 5, 10);
  scene.add(dirLight);
  
  let textMesh;
  
  // Fetch and parse typeface JSON
  fetch('${fontUrl}')
    .then(res => res.json())
    .then(data => {
      const loader = new THREE.FontLoader();
      const font = loader.parse(data);
      
      const geometry = new THREE.TextGeometry('${text}', {
        font: font,
        size: 1.2,
        height: ${depth},
        curveSegments: 8,
        bevelEnabled: ${bevel},
        bevelThickness: 0.05,
        bevelSize: 0.03,
        bevelOffset: 0,
        bevelSegments: 4
      });
      
      geometry.computeBoundingBox();
      const offset = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
      const offsetY = -0.5 * (geometry.boundingBox.max.y - geometry.boundingBox.min.y);
      geometry.translate(offset, offsetY, 0);
      
      const frontMat = new THREE.MeshStandardMaterial({
        color: '${color}',
        roughness: 0.2,
        metalness: 0.8
        ${glow ? `, emissive: '${color}', emissiveIntensity: 0.55` : ''}
      });
      
      const sideMat = new THREE.MeshStandardMaterial({
        color: '${color}',
        roughness: 0.5,
        metalness: 0.2
      });
      
      textMesh = new THREE.Mesh(geometry, [frontMat, sideMat]);
      scene.add(textMesh);
    });
    
  function animate() {
    requestAnimationFrame(animate);
    if (textMesh) {
      textMesh.rotation.y = Math.sin(Date.now() * 0.0005) * 0.25;
    }
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
  
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
</script>`;

  const codeOutput = `${html}

${css}

${js}${includeWatermark ? '\n' + watermarkCode.trim() : ''}`;

  document.getElementById('output-code').value = codeOutput;
}

document.addEventListener('DOMContentLoaded', () => {
  initScene();
  update3DText();

  // Bind change/inputs
  const inputs = ['inp-text-3d', 'inp-font-style', 'inp-depth', 'inp-color-3d', 'chk-bevel', 'chk-glow', 'chk-watermark'];
  inputs.forEach(id => {
    document.getElementById(id).addEventListener('input', update3DText);
    document.getElementById(id).addEventListener('change', update3DText);
  });

  // Watch for language switches
  window.addEventListener('langChanged', () => {
    update3DText();
  });

  // Copy code action
  document.getElementById('btn-copy-code').addEventListener('click', () => {
    const code = document.getElementById('output-code').value;
    navigator.clipboard.writeText(code).then(() => {
      const activeLang = localStorage.getItem('hub_lang') || 'fr';
      const msg = translations[activeLang].success_copy || 'Code copié avec succès !';
      alert(msg);
    }).catch(err => {
      console.error('Failed to copy code: ', err);
    });
  });

  // Download standalone HTML action
  document.getElementById('btn-download-html').addEventListener('click', () => {
    const code = document.getElementById('output-code').value;
    const blob = new Blob([code], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'text-3d-widget.html');
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
});
