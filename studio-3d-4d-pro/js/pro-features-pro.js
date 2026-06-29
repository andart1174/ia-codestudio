/**
 * Studio 3D/4D Pro — Production 3D Exporter & Dynamic WebAR Engine v3
 */

(function() {
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
        prepareAndGenerateAR();
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
    const btnCopyARLink = document.getElementById('btn-copy-ar-link');
    const btnCopyAREmbed = document.getElementById('btn-copy-ar-embed');

    if (btnDoOBJ) btnDoOBJ.addEventListener('click', exportOBJFormat);
    if (btnDoSTL) btnDoSTL.addEventListener('click', exportSTLFormat);
    if (btnDoGLTF) btnDoGLTF.addEventListener('click', exportGLTFFormat);
    if (btnCopyARLink) btnCopyARLink.addEventListener('click', copyARLink);
    if (btnCopyAREmbed) btnCopyAREmbed.addEventListener('click', copyAREmbed);

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

  // Prepare active scene data & generate QR code pointing to exact custom model
  function prepareAndGenerateAR() {
    const target = getTarget3DGroup();
    let objData = "";
    let colorHex = "#00ffcc"; // Default custom cyan color from user screenshot
    let ptsData = "";
    let depth = 30;

    let modFormat = "hero-forge";

    // Get active model properties if available
    if (window.SketchExtruder && typeof window.SketchExtruder.getActiveModel === 'function') {
      const act = window.SketchExtruder.getActiveModel();
      if (act) {
        if (act.format) modFormat = act.format;
        if (act.colorHex) colorHex = act.colorHex;
        if (act.depth) depth = act.depth;
        if (act.points && Array.isArray(act.points)) {
          // Compact 2D contour points: x,y|x,y|x,y
          ptsData = act.points.map(p => `${Math.round(p.x)},${Math.round(p.y)}`).join('|');
        }
      }
    }

    if (target && typeof THREE !== 'undefined' && THREE.OBJExporter) {
      const exporter = new THREE.OBJExporter();
      objData = exporter.parse(target);
    }

    // Save to localStorage for same-device direct URL preview
    try {
      if (objData) localStorage.setItem('ia_ar_obj_data', objData);
      localStorage.setItem('ia_ar_color', colorHex);
      localStorage.setItem('ia_ar_mod', modFormat);
      if (ptsData) localStorage.setItem('ia_ar_pts', ptsData);
      localStorage.setItem('ia_ar_depth', depth);
    } catch(e){}

    // Build URL for QR code and sharing
    let arViewerUrl = "https://ia-codestudio.com/studio-3d-4d-pro/ar-viewer.html";
    let urlParams = `?mod=${encodeURIComponent(modFormat)}&c=${encodeURIComponent(colorHex)}&d=${depth}`;
    if (ptsData) {
      urlParams += `&p=${encodeURIComponent(ptsData)}`;
    }
    
    const fullArUrl = arViewerUrl + urlParams;
    window.currentCustomARUrl = fullArUrl;

    // Update code boxes & QR code
    const qrContainer = document.getElementById('ar-qr-code-img');
    if (qrContainer) {
      qrContainer.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(fullArUrl)}&color=8b5cf6&bgcolor=ffffff`;
    }

    const linkCodeEl = document.querySelector('#modal-ar-preview code');
    if (linkCodeEl) {
      linkCodeEl.textContent = fullArUrl;
    }
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

  // Copy Direct AR Link
  function copyARLink() {
    const directUrl = window.currentCustomARUrl || "https://ia-codestudio.com/studio-3d-4d-pro/ar-viewer.html";
    navigator.clipboard.writeText(directUrl).then(() => {
      const label = document.getElementById('lbl-copy-link-status');
      if (label) {
        const orig = label.textContent;
        label.textContent = window.currentLang === 'fr' ? '✅ Copié !' : '✅ Copied!';
        setTimeout(() => label.textContent = orig, 2500);
      }
      showToast(window.currentLang === 'fr' ? '🔗 Lien direct de la scène 3D copié !' : '🔗 Direct 3D scene link copied!');
    });
  }

  // Copy HTML Embed Code
  function copyAREmbed() {
    const directUrl = window.currentCustomARUrl || "https://ia-codestudio.com/studio-3d-4d-pro/ar-viewer.html";
    const embedCode = `<iframe src="${directUrl}" width="100%" height="550px" frameborder="0" allow="ar; camera; gyroscope; accelerometer" allowfullscreen style="border-radius:18px; box-shadow:0 12px 35px rgba(0,0,0,0.35); border:1px solid rgba(139,92,246,0.3);"></iframe>`;
    navigator.clipboard.writeText(embedCode).then(() => {
      const label = document.getElementById('lbl-copy-embed-status');
      if (label) {
        const orig = label.textContent;
        label.textContent = window.currentLang === 'fr' ? '✅ Copié !' : '✅ Copied!';
        setTimeout(() => label.textContent = orig, 2500);
      }
      showToast(window.currentLang === 'fr' ? '💻 Code HTML Embed copié ! À coller dans l\'éditeur HTML de votre site.' : '💻 HTML Embed code copied! Paste into your site HTML editor.');
    });
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
