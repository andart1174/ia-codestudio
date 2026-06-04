(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════
  // 🖼️ ASSET OPTIMIZER STUDIO — Real Canvas API Compression
  // ═══════════════════════════════════════════════════════════

  const STANDALONE_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Asset Optimizer Studio</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #020617;
      --card-bg: #0f172a;
      --card-border: #1e293b;
      --accent: #f59e0b;
      --accent-hover: #d97706;
      --text: #f8fafc;
      --text-muted: #94a3b8;
    }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      box-sizing: border-box;
    }
    .container {
      width: 100%;
      max-width: 600px;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    }
    h1 {
      margin: 0 0 8px 0;
      font-size: 22px;
      font-weight: 900;
      color: var(--accent);
      letter-spacing: -0.5px;
    }
    p.sub {
      margin: 0 0 24px 0;
      font-size: 13px;
      color: var(--text-muted);
    }
    .dropzone {
      position: relative;
      border: 2px dashed rgba(245,158,11,0.4);
      border-radius: 12px;
      padding: 40px 20px;
      text-align: center;
      cursor: pointer;
      background: rgba(245,158,11,0.02);
      transition: all 0.2s;
      margin-bottom: 20px;
    }
    .dropzone:hover {
      border-color: var(--accent);
      background: rgba(245,158,11,0.05);
    }
    .dropzone-icon {
      font-size: 48px;
      margin-bottom: 12px;
    }
    .dropzone-title {
      font-weight: 700;
      font-size: 14px;
      color: var(--accent);
      margin-bottom: 4px;
    }
    .dropzone-sub {
      font-size: 11px;
      color: var(--text-muted);
    }
    .settings {
      background: rgba(255,255,255,0.02);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 20px;
    }
    .setting-group {
      margin-bottom: 16px;
    }
    .setting-group:last-child {
      margin-bottom: 0;
    }
    label {
      display: block;
      font-size: 11px;
      font-weight: 700;
      color: var(--text-muted);
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    input[type="range"] {
      width: 100%;
      accent-color: var(--accent);
    }
    input[type="number"] {
      width: 100%;
      background: #1e293b;
      border: 1px solid #334155;
      color: #fff;
      padding: 10px;
      border-radius: 8px;
      box-sizing: border-box;
      outline: none;
      font-family: inherit;
      font-size: 13px;
    }
    button.btn-primary {
      width: 100%;
      background: linear-gradient(90deg, var(--accent), var(--accent-hover));
      border: none;
      color: #000;
      padding: 14px;
      border-radius: 8px;
      font-weight: 900;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.2s;
      box-shadow: 0 4px 15px rgba(245,158,11,0.2);
    }
    button.btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(245,158,11,0.3);
    }
    .stats-card {
      display: none;
      margin-top: 20px;
      background: rgba(255,255,255,0.02);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 16px;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;
      margin-bottom: 16px;
    }
    .stat-box {
      background: #1e293b;
      padding: 12px;
      border-radius: 8px;
      text-align: center;
    }
    .stat-label {
      font-size: 9px;
      color: var(--text-muted);
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .stat-val {
      font-size: 14px;
      font-weight: 900;
    }
    .stat-val.orig { color: #f87171; }
    .stat-val.opt { color: #34d399; }
    .stat-val.saved { color: #10b981; }
    .btn-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .btn-secondary {
      background: rgba(99,102,241,0.1);
      border: 1px solid rgba(99,102,241,0.4);
      color: #818cf8;
      padding: 10px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 11px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-secondary:hover { background: rgba(99,102,241,0.2); }
    .btn-success {
      background: rgba(16,185,129,0.1);
      border: 1px solid rgba(16,185,129,0.4);
      color: #34d399;
      padding: 10px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 11px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-success:hover { background: rgba(16,185,129,0.2); }
    .preview-wrap {
      display: none;
      margin-top: 20px;
      text-align: center;
    }
    .preview-wrap img {
      max-width: 100%;
      max-height: 250px;
      border-radius: 8px;
      border: 1px solid var(--card-border);
    }
    .output-wrap {
      display: none;
      margin-top: 20px;
      background: #000;
      border: 1px solid var(--card-border);
      border-radius: 12px;
      overflow: hidden;
    }
    .output-hdr {
      background: #1e293b;
      padding: 8px 12px;
      font-size: 11px;
      font-weight: 700;
      color: var(--accent);
    }
    textarea {
      width: 100%;
      height: 100px;
      background: transparent;
      border: none;
      color: #a5b4fc;
      padding: 12px;
      font-family: monospace;
      font-size: 11px;
      resize: none;
      box-sizing: border-box;
      outline: none;
    }
    .toast {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(16,185,129,0.9);
      color: #fff;
      padding: 10px 20px;
      border-radius: 30px;
      font-size: 12px;
      font-weight: 700;
      display: none;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      z-index: 100;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🖼️ ASSET OPTIMIZER</h1>
    <p class="sub">Real Image Compression & Base64 Encoder</p>

    <div style="position:relative; margin-bottom: 20px;">
      <div class="dropzone" id="dropzone" style="margin-bottom:0;">
        <div id="dropzone-content">
          <div class="dropzone-icon">📁</div>
          <div class="dropzone-title">Drop image here or click to browse</div>
          <div class="dropzone-sub">Supports: JPG, PNG, GIF, WebP, SVG</div>
        </div>
      </div>
      <input type="file" id="fileInput" accept="image/*" style="position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;cursor:pointer;z-index:10;">
    </div>

    <div class="settings">
      <div class="setting-group">
        <label>Quality: <span id="quality-val" style="color:var(--accent);">80%</span></label>
        <input type="range" id="quality" min="10" max="100" value="80">
      </div>
      <div class="setting-group">
        <label>Max Width (px):</label>
        <input type="number" id="maxWidth" value="1200" min="100" max="4096">
      </div>
    </div>

    <button class="btn-primary" id="compressBtn">⚡ Compress Image</button>

    <div class="stats-card" id="statsCard">
      <div class="stats-grid">
        <div class="stat-box">
          <div class="stat-label">Original</div>
          <div class="stat-val orig" id="origSize">—</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Optimized</div>
          <div class="stat-val opt" id="optSize">—</div>
        </div>
        <div class="stat-box" style="background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.2);">
          <div class="stat-label">Saved</div>
          <div class="stat-val saved" id="savedPct">—</div>
        </div>
      </div>
      <div class="btn-row">
        <button class="btn-secondary" id="copyBtn">📋 Copy Base64</button>
        <button class="btn-success" id="downloadBtn">⬇️ Download</button>
      </div>
    </div>

    <div class="preview-wrap" id="previewWrap">
      <img id="previewImg" alt="preview">
    </div>

    <div class="output-wrap" id="outputWrap">
      <div class="output-hdr">📄 Base64 Ready for HTML &lt;img&gt;</div>
      <textarea id="b64Output" readonly></textarea>
    </div>

    <canvas id="canvas" style="display:none;"></canvas>
  </div>

  <div class="toast" id="toast"></div>

  <script>
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('fileInput');
    const quality = document.getElementById('quality');
    const qualityVal = document.getElementById('quality-val');
    const maxWidth = document.getElementById('maxWidth');
    const compressBtn = document.getElementById('compressBtn');
    const statsCard = document.getElementById('statsCard');
    const origSize = document.getElementById('origSize');
    const optSize = document.getElementById('optSize');
    const savedPct = document.getElementById('savedPct');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const previewWrap = document.getElementById('previewWrap');
    const previewImg = document.getElementById('previewImg');
    const outputWrap = document.getElementById('outputWrap');
    const b64Output = document.getElementById('b64Output');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const toast = document.getElementById('toast');

    let originalFile = null;
    let b64Result = '';
    let optimizedBlob = null;

    quality.addEventListener('input', () => { qualityVal.textContent = quality.value + '%'; });
    fileInput.addEventListener('change', e => handleFile(e.target.files[0]));
    fileInput.addEventListener('dragover', e => { e.preventDefault(); dropzone.style.borderColor = 'var(--accent)'; });
    fileInput.addEventListener('dragleave', () => { dropzone.style.borderColor = 'rgba(245,158,11,0.4)'; });
    fileInput.addEventListener('drop', e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); });

    function showToast(msg) {
      toast.textContent = msg;
      toast.style.display = 'block';
      setTimeout(() => { toast.style.display = 'none'; }, 2000);
    }

    function formatBytes(bytes) {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / 1048576).toFixed(2) + ' MB';
    }

    function handleFile(file) {
      if (!file || !file.type.startsWith('image/')) return;
      originalFile = file;
      dropzone.style.borderColor = '#10b981';
      document.getElementById('dropzone-content').innerHTML = \\\`<div style="font-size:32px;">✅</div><div style="font-weight:700;font-size:13px;color:#34d399;margin-top:6px;">\\\${file.name}</div><div style="font-size:11px;color:#64748b;">\\\${formatBytes(file.size)}</div>\\\`;
    }

    compressBtn.addEventListener('click', () => {
      if (!originalFile) { showToast('Please select an image first.'); return; }
      compressBtn.textContent = '⚙️ Processing...';
      compressBtn.disabled = true;

      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          const q = parseInt(quality.value) / 100;
          const maxW = parseInt(maxWidth.value) || 1200;
          let w = img.width, h = img.height;
          if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
          canvas.width = w; canvas.height = h;
          ctx.drawImage(img, 0, 0, w, h);
          canvas.toBlob(blob => {
            optimizedBlob = blob;
            const reader2 = new FileReader();
            reader2.onload = (r2) => {
              b64Result = r2.result;
              const saved = Math.round((1 - blob.size / originalFile.size) * 100);
              origSize.textContent = formatBytes(originalFile.size);
              optSize.textContent = formatBytes(blob.size);
              savedPct.textContent = (saved > 0 ? '-' : '+') + Math.abs(saved) + '%';
              statsCard.style.display = 'block';
              previewImg.src = b64Result;
              previewWrap.style.display = 'block';
              b64Output.value = b64Result;
              outputWrap.style.display = 'block';
              compressBtn.textContent = '⚡ Compress Image';
              compressBtn.disabled = false;
            };
            reader2.readAsDataURL(blob);
          }, 'image/jpeg', q);
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(originalFile);
    });

    copyBtn.addEventListener('click', () => {
      if (!b64Result) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(b64Result).then(() => showToast('Copied to clipboard!'));
      } else {
        const ta = document.createElement('textarea');
        ta.value = b64Result; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select(); document.execCommand('copy');
        document.body.removeChild(ta); showToast('Copied to clipboard!');
      }
    });

    downloadBtn.addEventListener('click', () => {
      if (!optimizedBlob) return;
      const url = URL.createObjectURL(optimizedBlob);
      const a = Object.assign(document.createElement('a'), { href: url, download: 'optimized_' + (originalFile ? originalFile.name : 'image.jpg') });
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  </script>
</body>
</html>`;


  const TX = {
    en: {
      title: 'ASSET OPTIMIZER',
      sub: 'Real Image Compression & Base64 Encoder',
      drop: 'Drop image here or click to browse',
      dropSub: 'Supports: JPG, PNG, GIF, WebP, SVG',
      quality: 'Output Quality',
      maxWidth: 'Max Width (px)',
      original: 'ORIGINAL',
      optimized: 'OPTIMIZED',
      saved: 'SAVED',
      size: 'File Size',
      dims: 'Dimensions',
      format: 'Format',
      compress: '⚡ Compress Image',
      copyB64: '📋 Copy Base64',
      downloadOpt: '⬇ Download Optimized',
      base64Title: 'Base64 Output (Ready for HTML)',
      base64Sub: 'Paste directly into <img src="..."> in your project',
      copied: '✅ Copied to clipboard!',
      injected: '✅ Asset Optimizer loaded.',
      noImg: 'Please drop or select an image first.',
      processing: '⚙️ Processing...',
      inject: '💉 Inject <img> to Editor',
      injectSuccess: '✅ <img> injected into editor!',
      loadFullApp: '🚀 Load Full Standalone App',
      loadSuccess: '🚀 Standalone App loaded into editor!'
    },
    fr: {
      title: 'OPTIMISEUR D\'ASSETS',
      sub: 'Compression Réelle & Encodeur Base64',
      drop: 'Déposez une image ici ou cliquez pour parcourir',
      dropSub: 'Supporte: JPG, PNG, GIF, WebP, SVG',
      quality: 'Qualité de Sortie',
      maxWidth: 'Largeur Max (px)',
      original: 'ORIGINAL',
      optimized: 'OPTIMISÉ',
      saved: 'ÉCONOMISÉ',
      size: 'Taille du Fichier',
      dims: 'Dimensions',
      format: 'Format',
      compress: '⚡ Compresser l\'Image',
      copyB64: '📋 Copier Base64',
      downloadOpt: '⬇ Télécharger Optimisé',
      base64Title: 'Sortie Base64 (Prête pour HTML)',
      base64Sub: 'Collez directement dans <img src="..."> de votre projet',
      copied: '✅ Copié dans le presse-papiers!',
      injected: '✅ Optimiseur d\'Assets chargé.',
      noImg: 'Veuillez d\'abord déposer ou sélectionner une image.',
      processing: '⚙️ Traitement...',
      inject: '💉 Injecter <img> dans l\'Éditeur',
      injectSuccess: '✅ <img> injecté dans l\'éditeur!',
      loadFullApp: '🚀 Charger l\'appli complète',
      loadSuccess: '🚀 Application complète chargée dans l\'éditeur!'
    }
  };

  function gl() { return window.appLang || 'en'; }

  const _origRenderTab = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'assetoptimizer') {
      window.activeTab = 'assetoptimizer';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('tab-assetoptimizer');
      if (btn) btn.classList.add('active');
      initAssetOptimizer(gl());
      return;
    }
    if (typeof _origRenderTab === 'function') _origRenderTab(tab);
  };

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(2) + ' MB';
  }

  function initAssetOptimizer(lang) {
    const el = document.getElementById('left-body');
    if (!el) return;
    const T = TX[lang] || TX.en;

    el.innerHTML = `
      <div id="ao-root" style="padding:14px;font-family:'Inter',sans-serif;overflow-y:auto;height:100%;box-sizing:border-box;background:#020617;color:#f8fafc;">
        <!-- Header -->
        <div style="background:linear-gradient(135deg,rgba(245,158,11,0.15),rgba(251,146,60,0.1));border-radius:14px;padding:14px;border:1px solid rgba(245,158,11,0.35);margin-bottom:12px;display:flex;align-items:center;gap:12px;">
          <span style="font-size:28px;filter:drop-shadow(0 0 10px #f59e0b);">🖼️</span>
          <div>
            <h2 style="margin:0;color:#fbbf24;font-size:15px;font-weight:900;letter-spacing:0.4px;">${T.title}</h2>
            <p style="margin:3px 0 0;color:#94a3b8;font-size:10px;">${T.sub}</p>
          </div>
        </div>

        <!-- Load Full App Button -->
        <button id="ao-load-full-app" style="width:100%;background:linear-gradient(90deg,#fbbf24,#f59e0b);border:none;color:#000;padding:10px;border-radius:8px;font-weight:900;font-size:11px;cursor:pointer;margin-bottom:14px;box-shadow:0 0 15px rgba(245,158,11,0.25);transition:transform 0.1s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">${T.loadFullApp}</button>

        <!-- Drop Zone -->
        <div style="position:relative; margin-bottom:14px;">
          <div id="ao-dropzone" style="border:2px dashed rgba(245,158,11,0.4);border-radius:12px;padding:30px 14px;text-align:center;transition:all 0.2s;background:rgba(245,158,11,0.03);margin-bottom:0;">
            <div id="ao-dropzone-content">
              <div style="font-size:36px;margin-bottom:8px;">📁</div>
              <div style="font-weight:700;font-size:12px;color:#fbbf24;margin-bottom:4px;">${T.drop}</div>
              <div style="font-size:10px;color:#64748b;">${T.dropSub}</div>
            </div>
          </div>
          <input type="file" id="ao-file-input" accept="image/*" style="position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;cursor:pointer;z-index:10;">
        </div>

        <!-- Settings -->
        <div style="background:#0f172a;border:1px solid #1e293b;border-radius:12px;padding:14px;margin-bottom:14px;">
          <div style="margin-bottom:12px;">
            <label style="font-size:10px;font-weight:700;color:#94a3b8;display:block;margin-bottom:6px;">${T.quality}: <span id="ao-quality-val" style="color:#fbbf24;">80%</span></label>
            <input type="range" id="ao-quality" min="10" max="100" value="80" style="width:100%;accent-color:#f59e0b;">
          </div>
          <div>
            <label style="font-size:10px;font-weight:700;color:#94a3b8;display:block;margin-bottom:6px;">${T.maxWidth}:</label>
            <input type="number" id="ao-maxwidth" value="1920" min="100" max="4096" style="width:100%;background:#1e293b;border:1px solid #334155;color:#fff;padding:8px;border-radius:6px;box-sizing:border-box;font-family:'Inter';outline:none;font-size:12px;">
          </div>
        </div>

        <!-- Compress Button -->
        <button id="ao-compress-btn" style="width:100%;background:linear-gradient(90deg,#f59e0b,#d97706);border:none;color:#000;padding:12px;border-radius:8px;font-weight:900;font-size:12px;cursor:pointer;margin-bottom:14px;transition:transform 0.1s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">${T.compress}</button>

        <!-- Stats Grid -->
        <div id="ao-stats" style="display:none;background:#0f172a;border:1px solid #1e293b;border-radius:12px;padding:14px;margin-bottom:14px;">
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:12px;">
            <div style="background:#1e293b;padding:10px;border-radius:8px;text-align:center;">
              <div style="font-size:9px;color:#64748b;font-weight:700;text-transform:uppercase;margin-bottom:4px;">${T.original}</div>
              <div id="ao-orig-size" style="font-size:12px;color:#f87171;font-weight:900;">—</div>
            </div>
            <div style="background:#1e293b;padding:10px;border-radius:8px;text-align:center;">
              <div style="font-size:9px;color:#64748b;font-weight:700;text-transform:uppercase;margin-bottom:4px;">${T.optimized}</div>
              <div id="ao-opt-size" style="font-size:12px;color:#34d399;font-weight:900;">—</div>
            </div>
            <div style="background:rgba(16,185,129,0.1);padding:10px;border-radius:8px;text-align:center;border:1px solid rgba(16,185,129,0.3);">
              <div style="font-size:9px;color:#64748b;font-weight:700;text-transform:uppercase;margin-bottom:4px;">${T.saved}</div>
              <div id="ao-saved-pct" style="font-size:12px;color:#10b981;font-weight:900;">—</div>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">
            <button id="ao-copy-b64" style="background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.4);color:#818cf8;padding:10px;border-radius:8px;font-weight:700;font-size:10px;cursor:pointer;">${T.copyB64}</button>
            <button id="ao-download" style="background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.4);color:#34d399;padding:10px;border-radius:8px;font-weight:700;font-size:10px;cursor:pointer;">${T.downloadOpt}</button>
          </div>
          <button id="ao-inject" style="width:100%;background:rgba(236,72,153,0.15);border:1px solid rgba(236,72,153,0.45);color:#f472b6;padding:10px;border-radius:8px;font-weight:800;font-size:11px;cursor:pointer;">${T.inject}</button>
        </div>

        <!-- Preview Canvas -->
        <canvas id="ao-canvas" style="display:none;"></canvas>
        <div id="ao-preview-wrap" style="display:none;margin-bottom:14px;">
          <img id="ao-preview-img" style="width:100%;border-radius:10px;border:1px solid #1e293b;" alt="preview">
        </div>

        <!-- Base64 Output -->
        <div id="ao-b64-wrap" style="display:none;background:#0f172a;border:1px solid #1e293b;border-radius:12px;overflow:hidden;">
          <div style="background:#1e293b;padding:8px 12px;">
            <div style="font-size:10px;font-weight:700;color:#fbbf24;">📄 ${T.base64Title}</div>
            <div style="font-size:9px;color:#64748b;margin-top:2px;">${T.base64Sub}</div>
          </div>
          <textarea id="ao-b64-output" readonly style="width:100%;height:80px;background:#000;border:none;color:#a5b4fc;padding:10px;font-family:'JetBrains Mono',monospace;font-size:9px;resize:none;box-sizing:border-box;outline:none;"></textarea>
        </div>

        <div id="ao-toast" style="display:none;text-align:center;background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.4);border-radius:8px;padding:8px;margin-top:10px;color:#34d399;font-size:11px;font-weight:700;"></div>
      </div>
    `;

    const dropzone = document.getElementById('ao-dropzone');
    const fileInput = document.getElementById('ao-file-input');
    const qualitySlider = document.getElementById('ao-quality');
    const qualityVal = document.getElementById('ao-quality-val');
    const canvas = document.getElementById('ao-canvas');
    const ctx = canvas.getContext('2d');
    const toast = document.getElementById('ao-toast');

    let originalFile = null;
    let b64Result = '';
    let optimizedBlob = null;

    qualitySlider.addEventListener('input', () => { qualityVal.textContent = qualitySlider.value + '%'; });

    function showToastLocal(msg) {
      toast.textContent = msg;
      toast.style.display = 'block';
      setTimeout(() => { toast.style.display = 'none'; }, 2500);
    }

    function handleFile(file) {
      if (!file || !file.type.startsWith('image/')) return;
      originalFile = file;
      dropzone.style.borderColor = 'rgba(16,185,129,0.6)';
      document.getElementById('ao-dropzone-content').innerHTML = `<div style="font-size:28px;">✅</div><div style="font-weight:700;font-size:11px;color:#34d399;margin-top:6px;">${file.name}</div><div style="font-size:10px;color:#64748b;">${formatBytes(file.size)}</div>`;
    }

    fileInput.addEventListener('change', e => handleFile(e.target.files[0]));
    fileInput.addEventListener('dragover', e => { e.preventDefault(); dropzone.style.borderColor = '#f59e0b'; });
    fileInput.addEventListener('dragleave', () => { dropzone.style.borderColor = 'rgba(245,158,11,0.4)'; });
    fileInput.addEventListener('drop', e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); });

    document.getElementById('ao-compress-btn').addEventListener('click', () => {
      if (!originalFile) { showToastLocal(T.noImg); return; }
      const btn = document.getElementById('ao-compress-btn');
      btn.textContent = T.processing;
      btn.disabled = true;

      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          const quality = parseInt(qualitySlider.value) / 100;
          const maxW = parseInt(document.getElementById('ao-maxwidth').value) || 1920;
          let w = img.width, h = img.height;
          if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
          canvas.width = w; canvas.height = h;
          ctx.drawImage(img, 0, 0, w, h);
          canvas.toBlob(blob => {
            optimizedBlob = blob;
            const reader2 = new FileReader();
            reader2.onload = (r2) => {
              b64Result = r2.result;
              const savedPct = Math.round((1 - blob.size / originalFile.size) * 100);
              document.getElementById('ao-orig-size').textContent = formatBytes(originalFile.size);
              document.getElementById('ao-opt-size').textContent = formatBytes(blob.size);
              document.getElementById('ao-saved-pct').textContent = (savedPct > 0 ? '-' : '+') + Math.abs(savedPct) + '%';
              document.getElementById('ao-stats').style.display = 'block';
              document.getElementById('ao-preview-img').src = b64Result;
              document.getElementById('ao-preview-wrap').style.display = 'block';
              document.getElementById('ao-b64-output').value = b64Result;
              document.getElementById('ao-b64-wrap').style.display = 'block';
              btn.textContent = T.compress;
              btn.disabled = false;
            };
            reader2.readAsDataURL(blob);
          }, 'image/jpeg', quality);
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(originalFile);
    });

    function copyToClipboard(text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text);
      } else {
        return new Promise((resolve, reject) => {
          try {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            const ok = document.execCommand('copy');
            document.body.removeChild(ta);
            if (ok) resolve(); else reject(new Error('execCommand copy failed'));
          } catch (e) {
            reject(e);
          }
        });
      }
    }

    document.getElementById('ao-copy-b64').addEventListener('click', () => {
      if (!b64Result) return;
      copyToClipboard(b64Result).then(() => showToastLocal(T.copied));
    });

    document.getElementById('ao-download').addEventListener('click', () => {
      if (!optimizedBlob) return;
      const url = URL.createObjectURL(optimizedBlob);
      const a = Object.assign(document.createElement('a'), { href: url, download: 'optimized_' + (originalFile ? originalFile.name : 'image.jpg') });
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });

    document.getElementById('ao-inject').addEventListener('click', () => {
      if (!b64Result) return;
      const imgHtml = `<img src="${b64Result}" style="max-width:100%; border-radius:8px;" alt="Optimized Image">`;
      if (window.smartInject) {
        window.smartInject(imgHtml, 'ui');
        showToastLocal(T.injectSuccess);
      } else if (window.editor) {
        const cur = window.editor.getValue();
        const idx = cur.toLowerCase().indexOf('</body>');
        if (idx !== -1) {
          window.editor.setValue(cur.slice(0, idx) + '\n' + imgHtml + '\n' + cur.slice(idx));
        } else {
          window.editor.setValue(cur + '\n' + imgHtml);
        }
        if (window.runPreview) window.runPreview();
        showToastLocal(T.injectSuccess);
      }
    });

    document.getElementById('ao-load-full-app').addEventListener('click', () => {
      if (window.editor) {
        window.editor.setValue(STANDALONE_TEMPLATE);
        if (window.runPreview) window.runPreview();
        showToastLocal(T.loadSuccess);
      }
    });

    if (window.showToast) window.showToast(T.injected);
  }
})();
