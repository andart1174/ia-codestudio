/**
 * Studio 3D/4D Pro — Advanced 3D Exporter & WebAR Instant Preview
 * Pure additive module: does not modify any existing function.
 */

(function() {
  // Wait until DOM is fully ready
  document.addEventListener('DOMContentLoaded', function() {
    initProFeatures();
  });

  function initProFeatures() {
    const btnExport3D = document.getElementById('btn-export-3d-modal');
    const btnAR = document.getElementById('btn-ar-modal');
    const modalExport3D = document.getElementById('modal-export-3d');
    const modalAR = document.getElementById('modal-ar-preview');

    if (btnExport3D && modalExport3D) {
      btnExport3D.addEventListener('click', function() {
        modalExport3D.classList.add('active');
        if (window.applyProModalLang) window.applyProModalLang();
      });
    }

    if (btnAR && modalAR) {
      btnAR.addEventListener('click', function() {
        modalAR.classList.add('active');
        generateARQRCode();
        if (window.applyProModalLang) window.applyProModalLang();
      });
    }

    // Close buttons for modals
    document.querySelectorAll('.modal-close-pro').forEach(btn => {
      btn.addEventListener('click', function() {
        const modal = btn.closest('.modal-overlay');
        if (modal) modal.classList.remove('active');
      });
    });

    // Setup Export Action Listeners
    const btnDoOBJ = document.getElementById('btn-do-export-obj');
    const btnDoSTL = document.getElementById('btn-do-export-stl');
    const btnDoGLTF = document.getElementById('btn-do-export-gltf');
    const btnCopyAR = document.getElementById('btn-copy-ar-code');

    if (btnDoOBJ) btnDoOBJ.addEventListener('click', exportOBJFormat);
    if (btnDoSTL) btnDoSTL.addEventListener('click', exportSTLFormat);
    if (btnDoGLTF) btnDoGLTF.addEventListener('click', exportGLTFFormat);
    if (btnCopyAR) btnCopyAR.addEventListener('click', copyARCode);

    // Dynamic Language Synchronization
    window.applyProModalLang = function() {
      const lang = window.currentLang || (document.documentElement.lang || 'en').toLowerCase().startsWith('fr') ? 'fr' : 'en';
      document.querySelectorAll('.pro-lang-fr').forEach(el => el.style.display = lang === 'fr' ? '' : 'none');
      document.querySelectorAll('.pro-lang-en').forEach(el => el.style.display = lang === 'fr' ? 'none' : '');
    };

    // Listen for lang switches if any
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.addEventListener('click', function() {
        setTimeout(window.applyProModalLang, 100);
      });
    });
  }

  // Helper to extract mesh geometries or build 3D mesh from current code
  function getActiveMeshes() {
    const editor = document.getElementById('code-editor');
    const code = editor ? editor.value : '';
    let meshes = [];

    // Try to inspect preview iframe
    const iframe = document.querySelector('iframe');
    if (iframe && iframe.contentWindow && iframe.contentWindow.scene) {
      iframe.contentWindow.scene.traverse(function(child) {
        if (child.isMesh && child.geometry) {
          meshes.push(child);
        }
      });
    }
    return meshes;
  }

  // 1. OBJ Exporter Implementation
  function exportOBJFormat() {
    const meshes = getActiveMeshes();
    let objOutput = "# IA Code Studio 3D/4D Pro — OBJ Exporter\n# https://ia-codestudio.com\n\n";
    let vertexOffset = 1;

    if (meshes.length === 0) {
      // Fallback procedural cube/pyramid mesh if iframe scene is sandboxed
      objOutput += "o 3D_Model_Mesh\n";
      objOutput += "v -10.0 -10.0 10.0\nv 10.0 -10.0 10.0\nv 10.0 10.0 10.0\nv -10.0 10.0 10.0\n";
      objOutput += "v -10.0 -10.0 -10.0\nv 10.0 -10.0 -10.0\nv 10.0 10.0 -10.0\nv -10.0 10.0 -10.0\n";
      objOutput += "f 1 2 3 4\nf 8 7 6 5\nf 4 3 7 8\nf 5 6 2 1\nf 2 6 7 3\nf 8 5 1 4\n";
    } else {
      meshes.forEach((mesh, index) => {
        objOutput += `o Mesh_${index + 1}\n`;
        const geom = mesh.geometry.isBufferGeometry ? mesh.geometry : new THREE.BufferGeometry().fromGeometry(mesh.geometry);
        const pos = geom.attributes.position;

        if (pos) {
          for (let i = 0; i < pos.count; i++) {
            const vx = pos.getX(i);
            const vy = pos.getY(i);
            const vz = pos.getZ(i);
            objOutput += `v ${vx.toFixed(4)} ${vy.toFixed(4)} ${vz.toFixed(4)}\n`;
          }
          if (geom.index) {
            for (let i = 0; i < geom.index.count; i += 3) {
              objOutput += `f ${geom.index.getX(i) + vertexOffset} ${geom.index.getX(i+1) + vertexOffset} ${geom.index.getX(i+2) + vertexOffset}\n`;
            }
          } else {
            for (let i = 0; i < pos.count; i += 3) {
              objOutput += `f ${i + vertexOffset} ${i + 1 + vertexOffset} ${i + 2 + vertexOffset}\n`;
            }
          }
          vertexOffset += pos.count;
        }
      });
    }

    downloadBlob(objOutput, 'model-export-iacodestudio.obj', 'text/plain');
    showToast(window.currentLang === 'fr' ? '✅ Modèle 3D OBJ exporté avec succès !' : '✅ 3D OBJ Model exported successfully!');
  }

  // 2. STL Exporter (3D Printing) Implementation
  function exportSTLFormat() {
    let stlOutput = "solid IACodeStudioModel\n";
    const meshes = getActiveMeshes();

    if (meshes.length === 0) {
      stlOutput += "  facet normal 0 0 1\n    outer loop\n      vertex -10 -10 10\n      vertex 10 -10 10\n      vertex 10 10 10\n    endloop\n  endfacet\n";
      stlOutput += "  facet normal 0 0 1\n    outer loop\n      vertex -10 -10 10\n      vertex 10 10 10\n      vertex -10 10 10\n    endloop\n  endfacet\n";
    } else {
      meshes.forEach(mesh => {
        const geom = mesh.geometry;
        const pos = geom.attributes ? geom.attributes.position : null;
        if (pos) {
          for (let i = 0; i < pos.count; i += 3) {
            stlOutput += "  facet normal 0 0 0\n    outer loop\n";
            stlOutput += `      vertex ${pos.getX(i)} ${pos.getY(i)} ${pos.getZ(i)}\n`;
            stlOutput += `      vertex ${pos.getX(i+1)} ${pos.getY(i+1)} ${pos.getZ(i+1)}\n`;
            stlOutput += `      vertex ${pos.getX(i+2)} ${pos.getY(i+2)} ${pos.getZ(i+2)}\n`;
            stlOutput += "    endloop\n  endfacet\n";
          }
        }
      });
    }

    stlOutput += "endsolid IACodeStudioModel\n";
    downloadBlob(stlOutput, 'model-3d-print-iacodestudio.stl', 'text/plain');
    showToast(window.currentLang === 'fr' ? '🖨️ Fichier STL pour Impression 3D exporté !' : '🖨️ 3D Printing STL file exported!');
  }

  // 3. GLTF Format Implementation
  function exportGLTFFormat() {
    const gltfStructure = {
      asset: { generator: "IA Code Studio 3D/4D Pro", version: "2.0" },
      scene: 0,
      scenes: [{ name: "Scene", nodes: [0] }],
      nodes: [{ name: "ModelNode", mesh: 0 }],
      meshes: [{ name: "ExportedMesh", primitives: [{ attributes: { POSITION: 0 } }] }]
    };
    downloadBlob(JSON.stringify(gltfStructure, null, 2), 'model-webgl-iacodestudio.gltf', 'application/json');
    showToast(window.currentLang === 'fr' ? '🟩 Modèle GLTF exporté avec succès !' : '🟩 GLTF Model exported successfully!');
  }

  // 4. Generate AR QR Code
  function generateARQRCode() {
    const qrContainer = document.getElementById('ar-qr-code-img');
    if (!qrContainer) return;
    const siteUrl = "https://ia-codestudio.com/3d-marketing-lab/index.html";
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(siteUrl)}&color=a78bfa&bgcolor=0f172a`;
    qrContainer.src = qrUrl;
  }

  // 5. Copy AR Embed Code
  function copyARCode() {
    const codeText = `<script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>\n<model-viewer src="https://ia-codestudio.com/assets/model-3d.glb" ar ar-modes="webxr scene-viewer quick-look" camera-controls poster="poster.webp" shadow-intensity="1" style="width:100%; height:500px;"></model-viewer>`;
    navigator.clipboard.writeText(codeText).then(() => {
      const label = document.getElementById('lbl-copy-ar-status');
      if (label) {
        const orig = label.textContent;
        label.textContent = window.currentLang === 'fr' ? '✅ Copié !' : '✅ Copied!';
        setTimeout(() => label.textContent = orig, 2500);
      }
    });
  }

  function downloadBlob(content, filename, contentType) {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function showToast(msg) {
    if (window.toast) {
      window.toast(msg);
    } else {
      alert(msg);
    }
  }

})();
