// 3D WebGL PBR Text Maker Pro (v2.0) — VRAM-safe, JSON-safe export & Transparent PNG

const FONT_URLS = {
  helvetiker_bold: 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/fonts/helvetiker_bold.typeface.json',
  optimer_bold: 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/fonts/optimer_bold.typeface.json',
  gentilis_bold: 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/fonts/gentilis_bold.typeface.json',
  droid_sans_bold: 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/fonts/droid/droid_sans_bold.typeface.json',
  droid_serif_bold: 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/fonts/droid/droid_serif_bold.typeface.json'
};

function build3DExportHtml(opts) {
  const safeText = JSON.stringify(String(opts.text || 'IA CODE 3D')).replace(/</g, '\\u003c');
  const fontUrl = FONT_URLS[opts.fontKey] || FONT_URLS.helvetiker_bold;
  const depth = Number(opts.depth) || 8;
  const bevel = Number(opts.bevel) || 0;
  const color = /^#[0-9a-f]{6}$/i.test(opts.color || '') ? opts.color : '#00f0ff';
  const glow = /^#[0-9a-f]{6}$/i.test(opts.glow || '') ? opts.glow : '#8a2be2';
  const materialMode = opts.material || 'neon';
  const animMode = opts.anim || 'float';
  const watermark = opts.includeWatermark && typeof window !== 'undefined' && window.HubUtils
    ? '\n' + window.HubUtils.getWatermarkCode()
    : '';

  let matJs = '';
  if (materialMode === 'chrome') {
    matJs = `const mat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, emissive: '${glow}', emissiveIntensity: 0.14, roughness: 0.08, metalness: 0.98 });`;
  } else if (materialMode === 'gold') {
    matJs = `const mat = new THREE.MeshStandardMaterial({ color: 0xffd700, emissive: 0x5c3d00, emissiveIntensity: 0.25, roughness: 0.16, metalness: 0.94 });`;
  } else if (materialMode === 'wireframe') {
    matJs = `const mat = new THREE.MeshStandardMaterial({ color: '${color}', emissive: '${color}', emissiveIntensity: 0.9, wireframe: true });`;
  } else {
    matJs = `const mat = [
      new THREE.MeshStandardMaterial({ color: '${color}', emissive: '${glow}', emissiveIntensity: 0.45, roughness: 0.25, metalness: 0.78 }),
      new THREE.MeshStandardMaterial({ color: '${glow}', emissive: '${glow}', emissiveIntensity: 0.75, roughness: 0.15, metalness: 0.85 })
    ];`;
  }

  let animJs = 'mesh.position.y = Math.sin(t * 2) * 2.5; mesh.rotation.y = Math.sin(t) * 0.22;';
  if (animMode === 'spin') animJs = 'mesh.rotation.y = t * 0.85;';
  else if (animMode === 'pulse') animJs = 'const s = 1 + Math.sin(t * 3) * 0.06; mesh.scale.set(s, s, s); mesh.rotation.y = Math.sin(t * 1.2) * 0.14;';
  else if (animMode === 'tilt') animJs = 'mesh.rotation.x = Math.sin(t * 1.3) * 0.25; mesh.rotation.y = Math.cos(t * 1.1) * 0.35;';
  else if (animMode === 'static') animJs = '// Static frame';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>3D WebGL Typography — IA Code Studio</title>
  <style>
    body { margin: 0; overflow: hidden; background: radial-gradient(circle at 50% 45%, #11162c, #050508 80%); }
    canvas { display: block; }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"><\/script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/FontLoader.js"><\/script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/geometries/TextGeometry.js"><\/script>
</head>
<body>
  <div id="scene-3d" style="width:100vw;height:100vh;"></div>
  <script>
    const container = document.getElementById('scene-3d');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 8, 125);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.65));
    const keyLight = new THREE.PointLight(0xffffff, 1.8, 500); keyLight.position.set(40, 60, 120); scene.add(keyLight);
    const rimCyan = new THREE.PointLight(0x00f0ff, 2.2, 400); rimCyan.position.set(-70, 20, 60); scene.add(rimCyan);
    const rimPurple = new THREE.PointLight(0x8a2be2, 2.0, 400); rimPurple.position.set(70, -30, 50); scene.add(rimPurple);

    let mesh = null;
    new THREE.FontLoader().load('${fontUrl}', (font) => {
      const geo = new THREE.TextGeometry(${safeText}, {
        font: font, size: 15, height: ${depth}, curveSegments: 12,
        bevelEnabled: ${bevel > 0}, bevelThickness: ${bevel}, bevelSize: ${(bevel * 0.5).toFixed(2)}, bevelSegments: 4
      });
      geo.center();
      ${matJs}
      mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
    });

    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      if (mesh) { ${animJs} }
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  <\/script>${watermark}
</body>
</html>`;
}

if (typeof window !== 'undefined') {
  window._build3DExportHtml = build3DExportHtml;
}

document.addEventListener('DOMContentLoaded', () => {
  const inpText = document.getElementById('inp-text');
  const selFont = document.getElementById('sel-font');
  const selMaterial = document.getElementById('sel-material');
  const selAnim = document.getElementById('sel-anim');
  const inpDepth = document.getElementById('inp-depth');
  const valDepth = document.getElementById('val-depth');
  const inpBevel = document.getElementById('inp-bevel');
  const valBevel = document.getElementById('val-bevel');
  const inpColor = document.getElementById('inp-color');
  const inpGlow = document.getElementById('inp-glow');
  const chkWatermark = document.getElementById('chk-watermark');
  const outputCode = document.getElementById('output-code');
  const previewContainer = document.getElementById('preview-container-box');
  const statusPill = document.getElementById('f3d-status-pill');

  const btnCopyCode = document.getElementById('btn-copy-code');
  const btnExportPng = document.getElementById('btn-export-png');
  const btnDownloadHtml = document.getElementById('btn-download-html');

  const fontCache = {};
  let loadedFont = null;
  let scene, camera, renderer, controls, textMesh, clock;
  let animFrameId = null;

  function setStatus(text, isGood) {
    if (!statusPill) return;
    statusPill.textContent = text;
    statusPill.classList.toggle('good', !!isGood);
  }

  function disposeTextMesh() {
    if (!textMesh) return;
    if (scene) scene.remove(textMesh);
    if (textMesh.geometry && typeof textMesh.geometry.dispose === 'function') {
      textMesh.geometry.dispose();
    }
    if (Array.isArray(textMesh.material)) {
      textMesh.material.forEach(m => { if (m && typeof m.dispose === 'function') m.dispose(); });
    } else if (textMesh.material && typeof textMesh.material.dispose === 'function') {
      textMesh.material.dispose();
    }
    textMesh = null;
  }

  function createMaterial(mode, colorHex, glowHex) {
    if (mode === 'chrome') {
      return new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        emissive: new THREE.Color(glowHex),
        emissiveIntensity: 0.14,
        roughness: 0.08,
        metalness: 0.98
      });
    }
    if (mode === 'gold') {
      return new THREE.MeshStandardMaterial({
        color: 0xffd700,
        emissive: 0x5c3d00,
        emissiveIntensity: 0.25,
        roughness: 0.16,
        metalness: 0.94
      });
    }
    if (mode === 'wireframe') {
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color(colorHex),
        emissive: new THREE.Color(colorHex),
        emissiveIntensity: 0.9,
        wireframe: true
      });
    }
    return [
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(colorHex),
        emissive: new THREE.Color(glowHex),
        emissiveIntensity: 0.45,
        roughness: 0.25,
        metalness: 0.78
      }),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(glowHex),
        emissive: new THREE.Color(glowHex),
        emissiveIntensity: 0.75,
        roughness: 0.15,
        metalness: 0.85
      })
    ];
  }

  function refreshExportCode() {
    outputCode.value = build3DExportHtml({
      text: inpText.value || 'IA CODE 3D',
      fontKey: selFont.value,
      material: selMaterial.value,
      anim: selAnim.value,
      depth: parseFloat(inpDepth.value),
      bevel: parseFloat(inpBevel.value),
      color: inpColor.value,
      glow: inpGlow.value,
      includeWatermark: chkWatermark ? chkWatermark.checked : true
    });
  }

  function buildMesh() {
    refreshExportCode();
    if (!loadedFont || !scene || typeof THREE === 'undefined') return;

    disposeTextMesh();

    const text = (inpText.value || 'IA CODE 3D').trim() || ' ';
    const depth = parseFloat(inpDepth.value) || 8;
    const bevel = parseFloat(inpBevel.value) || 0;

    try {
      const geo = new THREE.TextGeometry(text, {
        font: loadedFont,
        size: 15,
        height: depth,
        curveSegments: 12,
        bevelEnabled: bevel > 0,
        bevelThickness: bevel,
        bevelSize: bevel * 0.5,
        bevelOffset: 0,
        bevelSegments: 4
      });
      geo.center();

      const mat = createMaterial(selMaterial.value, inpColor.value, inpGlow.value);
      textMesh = new THREE.Mesh(geo, mat);
      scene.add(textMesh);

      // Fit camera gracefully based on text width
      geo.computeBoundingBox();
      const width = geo.boundingBox ? (geo.boundingBox.max.x - geo.boundingBox.min.x) : 80;
      const targetZ = Math.max(95, Math.min(260, width * 1.18 + 30));
      if (camera) camera.position.z = targetZ;

      setStatus(`WebGL • ${text.length} chars`, true);
    } catch (err) {
      setStatus('Geometry Error', false);
    }
  }

  function loadFont(fontKey) {
    if (typeof THREE === 'undefined' || !THREE.FontLoader) {
      setStatus('Three.js CDN Offline', false);
      refreshExportCode();
      return;
    }
    if (fontCache[fontKey]) {
      loadedFont = fontCache[fontKey];
      buildMesh();
      return;
    }
    setStatus('Loading font...', false);
    const url = FONT_URLS[fontKey] || FONT_URLS.helvetiker_bold;
    const loader = new THREE.FontLoader();
    loader.load(
      url,
      (font) => {
        fontCache[fontKey] = font;
        loadedFont = font;
        buildMesh();
      },
      undefined,
      () => {
        setStatus('Font CDN unreachable', false);
        if (window.HubUtils) {
          window.HubUtils.showToast(currentLang === 'en' ? 'Could not load 3D font from CDN (check connection).' : 'Impossible de charger la police 3D depuis le CDN.', 'error');
        }
        refreshExportCode();
      }
    );
  }

  function initThree() {
    if (typeof THREE === 'undefined') {
      setStatus('WebGL / Three.js Offline', false);
      previewContainer.innerHTML = '<div style="color:#94a3b8;font-size:0.9rem;text-align:center;padding:1.5rem;">Three.js CDN unreachable in offline mode — HTML export still works.</div>';
      refreshExportCode();
      return;
    }

    try {
      const w = previewContainer.clientWidth || 500;
      const h = previewContainer.clientHeight || 330;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
      camera.position.set(0, 8, 125);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
      renderer.setClearColor(0x000000, 0);
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      previewContainer.innerHTML = '';
      previewContainer.appendChild(renderer.domElement);

      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.06;

      scene.add(new THREE.AmbientLight(0xffffff, 0.65));
      const keyLight = new THREE.PointLight(0xffffff, 1.8, 600);
      keyLight.position.set(40, 60, 120);
      scene.add(keyLight);

      const rimCyan = new THREE.PointLight(0x00f0ff, 2.2, 500);
      rimCyan.position.set(-70, 20, 60);
      scene.add(rimCyan);

      const rimPurple = new THREE.PointLight(0x8a2be2, 2.0, 500);
      rimPurple.position.set(70, -30, 50);
      scene.add(rimPurple);

      clock = new THREE.Clock();

      const animate = () => {
        animFrameId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        if (textMesh) {
          const mode = selAnim.value;
          if (mode === 'float') {
            textMesh.position.y = Math.sin(t * 2) * 2.5;
            textMesh.rotation.y = Math.sin(t) * 0.22;
            textMesh.rotation.x = 0;
            textMesh.scale.set(1, 1, 1);
          } else if (mode === 'spin') {
            textMesh.position.y = 0;
            textMesh.rotation.x = 0;
            textMesh.rotation.y = t * 0.85;
            textMesh.scale.set(1, 1, 1);
          } else if (mode === 'pulse') {
            const s = 1 + Math.sin(t * 3) * 0.06;
            textMesh.scale.set(s, s, s);
            textMesh.position.y = 0;
            textMesh.rotation.x = 0;
            textMesh.rotation.y = Math.sin(t * 1.2) * 0.14;
          } else if (mode === 'tilt') {
            textMesh.position.y = 0;
            textMesh.scale.set(1, 1, 1);
            textMesh.rotation.x = Math.sin(t * 1.3) * 0.25;
            textMesh.rotation.y = Math.cos(t * 1.1) * 0.35;
          } else {
            textMesh.position.y = 0;
            textMesh.scale.set(1, 1, 1);
          }
        }
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        if (!previewContainer || !camera || !renderer) return;
        const nw = previewContainer.clientWidth || 500;
        const nh = previewContainer.clientHeight || 330;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
      };
      window.addEventListener('resize', handleResize);
      if (typeof ResizeObserver !== 'undefined') {
        new ResizeObserver(handleResize).observe(previewContainer);
      }

      loadFont(selFont.value);
    } catch (err) {
      setStatus('WebGL unavailable', false);
      previewContainer.innerHTML = '<div style="color:#f87171;font-size:0.9rem;text-align:center;padding:1.5rem;">WebGL context could not be initialized on this device.</div>';
      refreshExportCode();
    }
  }

  // Event bindings
  inpText.addEventListener('input', buildMesh);
  selFont.addEventListener('change', () => loadFont(selFont.value));
  selMaterial.addEventListener('change', buildMesh);
  selAnim.addEventListener('change', refreshExportCode);
  inpDepth.addEventListener('input', () => { valDepth.textContent = inpDepth.value; buildMesh(); });
  inpBevel.addEventListener('input', () => { valBevel.textContent = parseFloat(inpBevel.value).toFixed(1); buildMesh(); });
  inpColor.addEventListener('input', buildMesh);
  inpGlow.addEventListener('input', buildMesh);
  if (chkWatermark) chkWatermark.addEventListener('change', refreshExportCode);

  btnCopyCode.addEventListener('click', () => {
    const msg = (translations[currentLang] && translations[currentLang].success_copy) || 'Copied!';
    window.HubUtils.copyText(outputCode.value, msg);
  });

  btnExportPng.addEventListener('click', () => {
    if (!renderer || !scene || !camera) {
      window.HubUtils.showToast(currentLang === 'en' ? 'WebGL renderer not ready.' : 'Moteur WebGL non prêt.', 'error');
      return;
    }
    renderer.setClearColor(0x000000, 0);
    renderer.render(scene, camera);
    renderer.domElement.toBlob((blob) => {
      if (!blob) return;
      const slug = (inpText.value || '3d-text').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || '3d-text';
      window.HubUtils.safeDownloadBlob(blob, `${slug}-3d.png`);
      window.HubUtils.showToast(currentLang === 'en' ? '🖼️ Transparent PNG downloaded!' : '🖼️ PNG transparent téléchargé !', 'success');
    }, 'image/png');
  });

  btnDownloadHtml.addEventListener('click', () => {
    window.HubUtils.safeDownloadText(outputCode.value, '3d-text-ia-studio.html', 'text/html;charset=utf-8');
    window.HubUtils.showToast(currentLang === 'en' ? '📥 HTML downloaded!' : '📥 HTML téléchargé !', 'success');
  });

  window.addEventListener('beforeunload', () => {
    if (animFrameId) cancelAnimationFrame(animFrameId);
    disposeTextMesh();
    if (renderer) renderer.dispose();
  });

  initThree();
});
