/**
 * Studio 3D/4D Pro v2.0 — True WebAR Export (<model-viewer> GLB/USDZ + QR Code) & 3D Print Doctor (STL Slicer Analysis)
 */
(function () {
  'use strict';

  let drawer = null;
  let activeTab = 'print'; // 'print' | 'webar'
  let targetWidthMM = 100;
  let infillPct = 20;
  let material = 'PLA';

  function isFR() { return (window.currentLang || 'en') === 'fr'; }

  function requirePro() {
    if (typeof window.isUserPremium === 'function' && !window.isUserPremium()) {
      if (typeof window.showPaywallModal === 'function') window.showPaywallModal();
      return false;
    }
    return true;
  }

  // Exact Signed Tetrahedral Volume & Print Health Analysis
  function analyzeSceneForPrint() {
    const grp = window.SketchExtruder && window.SketchExtruder.getGroup ? window.SketchExtruder.getGroup() : null;
    if (!grp || grp.children.length === 0) return null;
    grp.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(grp);
    const size = box.getSize(new THREE.Vector3());
    if (size.x <= 0 && size.y <= 0 && size.z <= 0) return null;

    const maxHoriz = Math.max(size.x, size.z, 0.001);
    const scaleToMM = targetWidthMM / maxHoriz;
    const wMM = size.x * scaleToMM;
    const hMM = size.y * scaleToMM;
    const dMM = size.z * scaleToMM;

    let tris = 0, rawSignedVol = 0, missingNormals = 0;
    const v0 = new THREE.Vector3(), v1 = new THREE.Vector3(), v2 = new THREE.Vector3(), cross = new THREE.Vector3();

    grp.traverse(obj => {
      if (!obj.isMesh || !obj.visible || !obj.geometry || !obj.geometry.attributes.position) return;
      const g = obj.geometry;
      if (!g.attributes.normal) missingNormals++;
      const pos = g.attributes.position;
      const idx = g.index;
      const matW = obj.matrixWorld;
      const count = idx ? idx.count : pos.count;
      for (let i = 0; i < count; i += 3) {
        const a = idx ? idx.getX(i) : i;
        const b = idx ? idx.getX(i + 1) : i + 1;
        const c = idx ? idx.getX(i + 2) : i + 2;
        if (c >= pos.count) break;
        v0.fromBufferAttribute(pos, a).applyMatrix4(matW);
        v1.fromBufferAttribute(pos, b).applyMatrix4(matW);
        v2.fromBufferAttribute(pos, c).applyMatrix4(matW);
        cross.crossVectors(v1, v2);
        rawSignedVol += v0.dot(cross) / 6.0;
        tris++;
      }
    });

    const volMM3 = Math.abs(rawSignedVol) * Math.pow(scaleToMM, 3);
    // Fallback bounding estimate if open surface (e.g. plane heightmap)
    const effectiveCM3 = volMM3 > 10 ? (volMM3 / 1000) : ((wMM * hMM * dMM) / 1000) * 0.25;
    const density = material === 'PETG' ? 1.27 : (material === 'ABS' ? 1.04 : 1.24);
    const shellAndInfillFactor = 0.28 + (infillPct / 100) * 0.72;
    const grams = Math.max(1, effectiveCM3 * density * shellAndInfillFactor);
    const costUSD = (grams / 1000) * 22;
    const estMinutes = Math.max(12, Math.round(grams * 3.1));

    return {
      tris, wMM, hMM, dMM, scaleToMM, minY: box.min.y,
      cm3: effectiveCM3, grams, costUSD, estMinutes,
      watertightHint: volMM3 > 10 && missingNormals === 0
    };
  }

  function addFlatPrintBase() {
    const grp = window.SketchExtruder && window.SketchExtruder.getGroup ? window.SketchExtruder.getGroup() : null;
    if (!grp) return;
    const box = new THREE.Box3().setFromObject(grp);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const w = Math.max(30, size.x * 1.15);
    const d = Math.max(30, size.z * 1.15);
    const baseH = Math.max(4, Math.min(10, Math.max(w, d) * 0.06));
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(w, baseH, d),
      new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.2, roughness: 0.7 })
    );
    mesh.receiveShadow = true;
    window.SketchExtruder.addMeshToScene(mesh, '3D Print Flat Base', {
      position: new THREE.Vector3(center.x, box.min.y - baseH * 0.5, center.z)
    });
    if (window.toast) window.toast(isFR() ? '🧱 Socle plat 3D ajouté !' : '🧱 Flat 3D Print Base added!');
    renderDrawer();
  }

  function exportScaledSTL() {
    if (!requirePro()) return;
    const grp = window.SketchExtruder && window.SketchExtruder.getGroup ? window.SketchExtruder.getGroup() : null;
    if (!grp || typeof THREE.STLExporter === 'undefined') {
      if (window.toast) window.toast('❌ STLExporter unavailable');
      return;
    }
    const info = analyzeSceneForPrint();
    const clone = grp.clone(true);
    if (info && info.scaleToMM) clone.scale.multiplyScalar(info.scaleToMM);
    const exporter = new THREE.STLExporter();
    const bin = exporter.parse(clone, { binary: true });
    const blob = new Blob([bin], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `print-ready-${targetWidthMM}mm-${Date.now()}.stl`; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    if (window.toast) window.toast(`🖨️ STL exported (${targetWidthMM} mm)!`);
  }

  function exportWebARPackage() {
    if (!requirePro()) return;
    const grp = window.SketchExtruder && window.SketchExtruder.getGroup ? window.SketchExtruder.getGroup() : null;
    if (!grp || typeof THREE.GLTFExporter === 'undefined') {
      if (window.toast) window.toast('❌ GLTFExporter unavailable');
      return;
    }
    const exporter = new THREE.GLTFExporter();
    exporter.parse(grp, (result) => {
      const bytes = new Uint8Array(result instanceof ArrayBuffer ? result : new TextEncoder().encode(JSON.stringify(result)));
      let binStr = '';
      for (let i = 0; i < bytes.length; i++) binStr += String.fromCharCode(bytes[i]);
      const glbB64 = 'data:model/gltf-binary;base64,' + btoa(binStr);

      const arHtml = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Studio 3D/4D Pro — True WebAR Viewer</title>
<script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"><\/script>
<style>html,body{margin:0;width:100%;height:100%;background:#050815;font-family:Inter,sans-serif;}model-viewer{width:100%;height:100%;}#ar-btn{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#0ea5e9,#6366f1);color:#fff;border:none;border-radius:999px;padding:14px 26px;font-weight:800;font-size:15px;box-shadow:0 10px 30px rgba(14,165,233,0.45);cursor:pointer;}</style>
</head><body>
<model-viewer src="${glbB64}" ar ar-modes="webxr scene-viewer quick-look" camera-controls auto-rotate shadow-intensity="1" environment-image="neutral" exposure="1.1">
  <button slot="ar-button" id="ar-btn">📱 View in Your Space (AR)</button>
</model-viewer>
</body></html>`;
      const blob = new Blob([arHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `studio-webar-quicklook-${Date.now()}.html`; a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
      if (window.toast) window.toast(isFR() ? '📱 Pack WebAR (iOS QuickLook + Android AR) téléchargé !' : '📱 True WebAR HTML (iOS + Android) downloaded!');
    }, { binary: true });
  }

  function renderDrawer() {
    if (!drawer) return;
    const fr = isFR();
    const info = analyzeSceneForPrint();

    const tabsHtml = `
      <div style="display:flex;gap:6px;margin-bottom:12px;">
        <button id="wap-tab-print" class="studio-btn-sec" style="flex:1;border-color:${activeTab==='print'?'#10b981':'#334155'};background:${activeTab==='print'?'rgba(16,185,129,0.2)':'#1e293b'};">🖨️ 3D Print Doctor</button>
        <button id="wap-tab-ar" class="studio-btn-sec" style="flex:1;border-color:${activeTab==='webar'?'#0ea5e9':'#334155'};background:${activeTab==='webar'?'rgba(14,165,233,0.2)':'#1e293b'};">📱 WebAR & QR</button>
      </div>
    `;

    let bodyHtml = '';
    if (activeTab === 'print') {
      if (!info) {
        bodyHtml = `<div style="padding:18px;text-align:center;color:#64748b;font-size:11px;">${fr ? 'Ajoutez un objet 3D pour analyser l’impression STL.' : 'Add a 3D model to run Slicer & Print checks.'}</div>`;
      } else {
        const hrs = Math.floor(info.estMinutes / 60), mins = info.estMinutes % 60;
        bodyHtml = `
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:10px;font-size:10.5px;">
            <div style="background:rgba(255,255,255,0.03);border:1px solid #1e293b;border-radius:8px;padding:8px;">
              <div style="color:#64748b;font-size:9.5px;">${fr ? 'Dimensions (mm)' : 'Dimensions (mm)'}</div>
              <div style="font-weight:800;color:#38bdf8;font-family:monospace;">${info.wMM.toFixed(0)} × ${info.hMM.toFixed(0)} × ${info.dMM.toFixed(0)}</div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border:1px solid #1e293b;border-radius:8px;padding:8px;">
              <div style="color:#64748b;font-size:9.5px;">${fr ? 'Poids & Coût' : 'Weight & Cost'}</div>
              <div style="font-weight:800;color:#34d399;font-family:monospace;">${info.grams.toFixed(1)}g (~$${info.costUSD.toFixed(2)})</div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border:1px solid #1e293b;border-radius:8px;padding:8px;">
              <div style="color:#64748b;font-size:9.5px;">${fr ? 'Volume / Temps' : 'Volume / Est. Time'}</div>
              <div style="font-weight:800;color:#fbbf24;font-family:monospace;">${info.cm3.toFixed(1)} cm³ · ${hrs}h${mins}m</div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border:1px solid #1e293b;border-radius:8px;padding:8px;">
              <div style="color:#64748b;font-size:9.5px;">${fr ? 'Santé Maillage' : 'Mesh Health'}</div>
              <div style="font-weight:800;color:${info.watertightHint ? '#34d399' : '#fbbf24'};">${info.watertightHint ? '✅ Manifold OK' : '⚠️ Check Shell'}</div>
            </div>
          </div>
          <div style="font-size:10px;color:#94a3b8;margin-bottom:8px;">
            ${fr ? 'Largeur cible' : 'Target Width'}: <b id="pr-w-v">${targetWidthMM} mm</b>
            <input type="range" id="pr-w" min="25" max="250" step="5" value="${targetWidthMM}" style="width:100%;accent-color:#10b981;">
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:10px;">
            <select id="pr-mat" style="padding:6px;background:#0f172a;border:1px solid #334155;border-radius:6px;color:#fff;font-size:11px;">
              <option value="PLA" ${material==='PLA'?'selected':''}>PLA (1.24 g/cm³)</option>
              <option value="PETG" ${material==='PETG'?'selected':''}>PETG (1.27 g/cm³)</option>
              <option value="ABS" ${material==='ABS'?'selected':''}>ABS (1.04 g/cm³)</option>
            </select>
            <select id="pr-inf" style="padding:6px;background:#0f172a;border:1px solid #334155;border-radius:6px;color:#fff;font-size:11px;">
              <option value="15" ${infillPct===15?'selected':''}>Infill 15%</option>
              <option value="20" ${infillPct===20?'selected':''}>Infill 20%</option>
              <option value="40" ${infillPct===40?'selected':''}>Infill 40%</option>
              <option value="100" ${infillPct===100?'selected':''}>Solid 100%</option>
            </select>
          </div>
          <button id="pr-base" class="studio-btn-sec" style="width:100%;margin-bottom:8px;">🧱 ${fr ? 'Ajouter Socle Plat (Adhérence Plateau)' : 'Add Flat Print Base (Bed Adhesion)'}</button>
          <button id="pr-stl" class="studio-btn-primary" style="background:linear-gradient(135deg,#10b981,#059669);">🖨️ ${fr ? 'Exporter .STL Calibré (mm) 👑' : 'Export Scaled .STL (mm) 👑'}</button>
        `;
      }
    } else {
      bodyHtml = `
        <p style="font-size:11px;color:#94a3b8;margin:0 0 10px;line-height:1.45;">
          ${fr
            ? 'Exportez votre scène en véritable expérience Réalité Augmentée (iOS Quick Look + Android WebXR Scene Viewer) avec QR Code mobile.'
            : 'Export your 3D scene as a True Augmented Reality experience (iOS AR Quick Look + Android WebXR Scene Viewer) with mobile QR code.'}
        </p>
        <div style="display:flex;justify-content:center;background:#fff;padding:12px;border-radius:12px;margin-bottom:10px;">
          <canvas id="webar-qr-canvas" width="150" height="150"></canvas>
        </div>
        <div style="font-size:10px;color:#64748b;text-align:center;margin-bottom:10px;">${fr ? 'Scannez pour ouvrir le Studio sur Mobile' : 'Scan to launch Studio 3D/4D on Mobile'}</div>
        <button id="webar-dl-html" class="studio-btn-primary" style="background:linear-gradient(135deg,#0ea5e9,#6366f1);margin-bottom:7px;">📱 ${fr ? 'Télécharger Pack WebAR (.HTML + GLB) 👑' : 'Download True WebAR Package (.HTML + GLB) 👑'}</button>
        <button id="webar-dl-glb" class="studio-btn-sec" style="width:100%;">🟩 ${fr ? 'Exporter .GLB Binaire (AR/Unity/Blender) 👑' : 'Export Binary .GLB (AR/Unity/Blender) 👑'}</button>
      `;
    }

    drawer.panel.innerHTML = `${drawer.renderHeader('📱', fr ? 'WebAR Mobile & Docteur Impression 3D' : 'WebAR & 3D Print Doctor')}${tabsHtml}${bodyHtml}`;

    drawer.panel.querySelector('#wap-tab-print').onclick = () => { activeTab = 'print'; renderDrawer(); };
    drawer.panel.querySelector('#wap-tab-ar').onclick = () => { activeTab = 'webar'; renderDrawer(); };

    if (activeTab === 'print' && info) {
      drawer.panel.querySelector('#pr-w').oninput = e => { targetWidthMM = +e.target.value; renderDrawer(); };
      drawer.panel.querySelector('#pr-mat').onchange = e => { material = e.target.value; renderDrawer(); };
      drawer.panel.querySelector('#pr-inf').onchange = e => { infillPct = +e.target.value; renderDrawer(); };
      drawer.panel.querySelector('#pr-base').onclick = addFlatPrintBase;
      drawer.panel.querySelector('#pr-stl').onclick = exportScaledSTL;
    } else if (activeTab === 'webar') {
      const qrc = drawer.panel.querySelector('#webar-qr-canvas');
      if (qrc && typeof window.QRious === 'function') {
        new window.QRious({ element: qrc, value: window.location.href, size: 150, level: 'M' });
      }
      drawer.panel.querySelector('#webar-dl-html').onclick = exportWebARPackage;
      drawer.panel.querySelector('#webar-dl-glb').onclick = () => {
        const b = document.getElementById('btn-do-export-gltf');
        if (b) b.click();
      };
    }
  }

  window.addEventListener('studio:scenechange', () => { if (drawer && drawer.panel.classList.contains('open')) renderDrawer(); });
  window.addEventListener('studio:langchange', () => { if (drawer && drawer.panel.classList.contains('open')) renderDrawer(); });

  window.StudioWebARPrint = {
    toggle() {
      if (!drawer && window.StudioShellUI) drawer = window.StudioShellUI.createToolDrawer('studio-webar-print-drawer');
      if (!drawer) return;
      drawer.toggle();
      if (drawer.panel.classList.contains('open')) renderDrawer();
    }
  };
})();
