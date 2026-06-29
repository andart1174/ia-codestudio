/**
 * Studio 3D/4D Pro — Production 3D Exporter Engine
 * Pure additive module for OBJ, STL, and GLTF exports.
 */

(function() {
  document.addEventListener('DOMContentLoaded', function() {
    initProFeatures();
  });

  function initProFeatures() {
    const btnExport3D = document.getElementById('btn-export-3d-modal');
    const modalExport3D = document.getElementById('modal-export-3d');

    if (btnExport3D && modalExport3D) {
      btnExport3D.addEventListener('click', function() {
        modalExport3D.classList.add('active');
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

    if (btnDoOBJ) btnDoOBJ.addEventListener('click', exportOBJFormat);
    if (btnDoSTL) btnDoSTL.addEventListener('click', exportSTLFormat);
    if (btnDoGLTF) btnDoGLTF.addEventListener('click', exportGLTFFormat);

    // Dynamic Language Synchronization
    window.applyProModalLang = function() {
      const lang = window.currentLang || (document.documentElement.lang || 'en').toLowerCase().startsWith('fr') ? 'fr' : 'en';
      document.querySelectorAll('.pro-lang-fr').forEach(el => el.style.display = lang === 'fr' ? '' : 'none');
      document.querySelectorAll('.pro-lang-en').forEach(el => el.style.display = lang === 'fr' ? 'none' : '');
    };

    document.querySelectorAll('.lang-btn').forEach(b => {
      b.addEventListener('click', function() {
        setTimeout(window.applyProModalLang, 100);
      });
    });
  }

  // Get clean active 3D meshes from SketchExtruder
  function getTarget3DGroup() {
    let sourceGroup = null;
    if (window.SketchExtruder && typeof window.SketchExtruder.getGroup === 'function') {
      sourceGroup = window.SketchExtruder.getGroup();
    }
    if (!sourceGroup && window.SketchExtruder && typeof window.SketchExtruder.getScene === 'function') {
      sourceGroup = window.SketchExtruder.getScene();
    }

    if (!sourceGroup || typeof THREE === 'undefined') return null;

    const cleanGroup = new THREE.Group();
    sourceGroup.traverse(function(child) {
      if (child.isMesh && child.geometry) {
        const isHelper = child.type.includes('Helper') || (child.material && child.material.wireframe && child.geometry.type === 'PlaneGeometry');
        if (!isHelper) {
          cleanGroup.add(child.clone());
        }
      }
    });

    return cleanGroup.children.length > 0 ? cleanGroup : sourceGroup;
  }

  // 1. Export OBJ
  function exportOBJFormat() {
    const target = getTarget3DGroup();
    if (!target) {
      showToast(window.currentLang === 'fr' ? '⚠️ Veuillez créer un modèle 3D d\'abord.' : '⚠️ Please create a 3D model first.', 'error');
      return;
    }

    if (typeof THREE !== 'undefined' && THREE.OBJExporter) {
      const exporter = new THREE.OBJExporter();
      const result = exporter.parse(target);
      downloadBlob(result, 'model-export-iacodestudio.obj', 'text/plain');
      showToast(window.currentLang === 'fr' ? '✅ Modèle 3D OBJ exporté avec succès !' : '✅ 3D OBJ Model exported successfully!');
    } else {
      showToast('⚠️ OBJ Exporter library loading...', 'error');
    }
  }

  // 2. Export STL (3D Printing)
  function exportSTLFormat() {
    const target = getTarget3DGroup();
    if (!target) {
      showToast(window.currentLang === 'fr' ? '⚠️ Veuillez créer un modèle 3D d\'abord.' : '⚠️ Please create a 3D model first.', 'error');
      return;
    }

    if (typeof THREE !== 'undefined' && THREE.STLExporter) {
      const exporter = new THREE.STLExporter();
      const result = exporter.parse(target, { binary: false });
      downloadBlob(result, 'model-3d-print-iacodestudio.stl', 'text/plain');
      showToast(window.currentLang === 'fr' ? '🖨️ Fichier STL pour Impression 3D exporté !' : '🖨️ 3D Printing STL file exported!');
    } else {
      showToast('⚠️ STL Exporter library loading...', 'error');
    }
  }

  // 3. Export GLTF / GLB
  function exportGLTFFormat() {
    const target = getTarget3DGroup();
    if (!target) {
      showToast(window.currentLang === 'fr' ? '⚠️ Veuillez créer un modèle 3D d\'abord.' : '⚠️ Please create a 3D model first.', 'error');
      return;
    }

    if (typeof THREE !== 'undefined' && THREE.GLTFExporter) {
      const exporter = new THREE.GLTFExporter();
      exporter.parse(target, function(gltf) {
        if (gltf instanceof ArrayBuffer) {
          downloadBlob(gltf, 'model-webgl-iacodestudio.glb', 'application/octet-stream');
        } else {
          downloadBlob(JSON.stringify(gltf, null, 2), 'model-webgl-iacodestudio.gltf', 'application/json');
        }
        showToast(window.currentLang === 'fr' ? '🟩 Modèle GLTF/GLB exporté avec succès !' : '🟩 GLTF/GLB Model exported successfully!');
      }, { binary: true });
    } else {
      showToast('⚠️ GLTF Exporter library loading...', 'error');
    }
  }

  function downloadBlob(content, filename, contentType) {
    const blob = content instanceof Blob ? content : new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function showToast(msg, type) {
    if (window.toast) {
      window.toast(msg, type);
    } else {
      alert(msg);
    }
  }

})();
