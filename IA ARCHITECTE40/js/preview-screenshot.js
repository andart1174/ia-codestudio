(function() {
'use strict';

var lastDataUrl = null;

function gl(){ return window.lang || 'en'; }

// ─── Load html2canvas from CDN ─────────────────────────────────────────
function loadH2C(cb) {
  if (window.html2canvas) { cb(null); return; }
  var s = document.createElement('script');
  s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
  s.onload = function() { cb(null); };
  s.onerror = function() { cb(new Error('Failed to load html2canvas')); };
  document.head.appendChild(s);
}

// ─── Capture the preview iframe ────────────────────────────────────────
function capturePreview(fullPage, onDone) {
  var isFr = gl() === 'fr';

  // Find the iframe
  var frame = document.getElementById('preview-iframe') ||
              document.getElementById('preview-frame') ||
              document.querySelector('iframe');

  if (!frame) {
    if (window.showToast) window.showToast(isFr ? 'Aperçu introuvable' : 'Preview not found. Run your code first.');
    return;
  }

  loadH2C(function(err) {
    if (err || !window.html2canvas) {
      // Fallback: export current editor code as downloadable HTML
      if (window.showToast) window.showToast(isFr ? 'html2canvas non disponible — export HTML' : 'html2canvas unavailable — exporting HTML instead');
      exportAsHTML();
      return;
    }

    try {
      var doc = frame.contentDocument || frame.contentWindow.document;
      if (!doc || !doc.body) {
        if (window.showToast) window.showToast(isFr ? 'Aperçu vide' : 'Preview is empty. Run your code first.');
        return;
      }

      var opts = {
        allowTaint: true,
        useCORS: true,
        backgroundColor: '#0f172a',
        scale: 1,
        logging: false
      };
      if (fullPage) {
        opts.height = doc.body.scrollHeight || doc.documentElement.scrollHeight;
        opts.windowHeight = opts.height;
      } else {
        opts.height = frame.clientHeight || 500;
      }
      opts.width = frame.clientWidth || 800;

      window.html2canvas(doc.body, opts).then(function(canvas) {
        lastDataUrl = canvas.toDataURL('image/png');
        if (window.showToast) window.showToast(isFr ? 'Capture prête !' : 'Screenshot ready!');
        onDone(lastDataUrl);
      }).catch(function(e) {
        if (window.showToast) window.showToast('Capture failed — ' + e.message);
      });

    } catch(e) {
      if (window.showToast) window.showToast('Access denied — try running code first. ' + e.message);
    }
  });
}

// ─── Fallback: export editor source as HTML ────────────────────────────
function exportAsHTML() {
  if (!window.editor) return;
  var code = window.editor.getValue();
  if (!code.trim()) { if(window.showToast) window.showToast('Editor is empty'); return; }
  var blob = new Blob([code], { type: 'text/html' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'preview-' + Date.now() + '.html';
  a.click();
  setTimeout(function(){ URL.revokeObjectURL(url); }, 5000);
  if (window.showToast) window.showToast(gl()==='fr' ? 'HTML exporté !' : 'HTML exported!');
}

// ─── Download PNG ──────────────────────────────────────────────────────
function downloadPNG(dataUrl) {
  var a = document.createElement('a');
  a.href = dataUrl;
  a.download = 'screenshot-' + Date.now() + '.png';
  a.click();
}

// ─── Copy to clipboard ─────────────────────────────────────────────────
function copyToClipboard(dataUrl) {
  if (!navigator.clipboard || !window.ClipboardItem) {
    if (window.showToast) window.showToast('Clipboard API not available');
    return;
  }
  fetch(dataUrl).then(function(r){ return r.blob(); }).then(function(blob) {
    navigator.clipboard.write([new ClipboardItem({'image/png': blob})]).then(function() {
      if (window.showToast) window.showToast(gl()==='fr' ? 'Image copiée !' : 'Image copied to clipboard!');
    });
  }).catch(function(e) {
    if (window.showToast) window.showToast('Copy failed: ' + e.message);
  });
}

// ─── Render tab ────────────────────────────────────────────────────────
function renderSSTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  var isFr = gl() === 'fr';

  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0f172a;';

  // Header
  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(16,185,129,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#34d399;">&#128247; ' + (isFr?'Capture d\'Écran':'Preview Screenshot') + '</div>' +
    '<div style="font-size:10px;color:#64748b;margin-top:2px;">' + (isFr?'Capturez votre aperçu en image':'Capture your preview as a PNG image') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';

  // Info hint
  var hint = document.createElement('div');
  hint.style = 'background:#1e293b;border-radius:8px;padding:10px 12px;border:1px dashed #334155;font-size:10px;color:#64748b;line-height:1.6;';
  hint.innerHTML = '&#128161; ' + (isFr
    ? 'Cliquez <b style="color:#e2e8f0;">Capturer</b> après avoir exécuté votre code. Nécessite Chrome/Edge.'
    : 'Click <b style="color:#e2e8f0;">Capture</b> after running your code. Works best in Chrome/Edge.');
  body.appendChild(hint);

  // Capture viewport button
  var capBtn = document.createElement('button');
  capBtn.innerHTML = '&#128247; ' + (isFr ? 'Capturer l\'Aperçu' : 'Capture Viewport');
  capBtn.style = 'width:100%;background:linear-gradient(90deg,#10b981,#059669);color:#fff;border:none;padding:12px;border-radius:8px;font-weight:900;font-size:11px;cursor:pointer;';
  capBtn.onclick = function() {
    capBtn.textContent = isFr ? '⏳ Capture...' : '⏳ Capturing...';
    capBtn.disabled = true;
    capturePreview(false, function(url) {
      capBtn.innerHTML = '&#128247; ' + (isFr?'Capturer l\'Aperçu':'Capture Viewport');
      capBtn.disabled = false;
      showPreviewArea(url);
    });
  };
  body.appendChild(capBtn);

  // Capture full page button
  var capFullBtn = document.createElement('button');
  capFullBtn.innerHTML = '&#128444;&#65039; ' + (isFr ? 'Capturer Page Entière' : 'Capture Full Page');
  capFullBtn.style = 'width:100%;background:none;border:1px solid #10b981;color:#34d399;padding:10px;border-radius:8px;font-size:11px;cursor:pointer;';
  capFullBtn.onclick = function() {
    capFullBtn.textContent = isFr ? '⏳ Capture...' : '⏳ Capturing...';
    capFullBtn.disabled = true;
    capturePreview(true, function(url) {
      capFullBtn.innerHTML = '&#128444;&#65039; ' + (isFr?'Capturer Page Entière':'Capture Full Page');
      capFullBtn.disabled = false;
      showPreviewArea(url);
    });
  };
  body.appendChild(capFullBtn);

  // Separator
  var sep = document.createElement('div');
  sep.style = 'border-top:1px solid #1e293b;';
  body.appendChild(sep);

  // Export HTML button (always works)
  var htmlBtn = document.createElement('button');
  htmlBtn.innerHTML = '&#128196; ' + (isFr ? 'Exporter HTML (toujours fonctionne)' : 'Export HTML (always works)');
  htmlBtn.style = 'width:100%;background:#1e293b;border:1px solid #334155;color:#94a3b8;padding:9px;border-radius:8px;font-size:10px;cursor:pointer;';
  htmlBtn.onclick = exportAsHTML;
  body.appendChild(htmlBtn);

  // Preview area (show last screenshot if exists)
  var previewArea = document.createElement('div');
  previewArea.id = 'ss-preview-area';
  body.appendChild(previewArea);

  if (lastDataUrl) showPreviewIn(previewArea, lastDataUrl);

  function showPreviewArea(url) {
    var zone = document.getElementById('ss-preview-area');
    if (!zone) return;
    showPreviewIn(zone, url);
  }

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

function showPreviewIn(zone, url) {
  zone.innerHTML = '';
  var isFr = gl() === 'fr';

  // Image thumbnail
  var img = document.createElement('img');
  img.src = url;
  img.style = 'width:100%;border-radius:8px;border:1px solid #334155;cursor:pointer;display:block;';
  img.title = isFr ? 'Cliquer pour agrandir' : 'Click to open full size';
  img.onclick = function() {
    var w = window.open('', '_blank');
    if (w) { w.document.write('<img src="' + url + '" style="max-width:100%">'); }
  };
  zone.appendChild(img);

  // Image info
  var metaEl = document.createElement('div');
  metaEl.style = 'font-size:9px;color:#64748b;text-align:center;margin-top:4px;';
  var tempImg = new Image();
  tempImg.onload = function() {
    metaEl.textContent = tempImg.naturalWidth + ' × ' + tempImg.naturalHeight + ' px';
  };
  tempImg.src = url;
  zone.appendChild(metaEl);

  // Action buttons
  var row = document.createElement('div');
  row.style = 'display:flex;gap:6px;';

  var dlBtn = document.createElement('button');
  dlBtn.innerHTML = '&#11015;&#65039; PNG';
  dlBtn.style = 'flex:1;background:#10b981;color:#fff;border:none;padding:9px;border-radius:6px;font-size:11px;cursor:pointer;font-weight:bold;';
  dlBtn.onclick = function() { downloadPNG(url); };

  var cpBtn = document.createElement('button');
  cpBtn.innerHTML = '&#128203;';
  cpBtn.title = isFr ? 'Copier dans le presse-papier' : 'Copy to clipboard';
  cpBtn.style = 'background:#1e293b;border:1px solid #334155;color:#e2e8f0;padding:9px 13px;border-radius:6px;font-size:13px;cursor:pointer;';
  cpBtn.onclick = function() { copyToClipboard(url); };

  var twBtn = document.createElement('button');
  twBtn.innerHTML = '&#120143;';
  twBtn.title = 'Share on Twitter/X';
  twBtn.style = 'background:#1d9bf0;border:none;color:#fff;padding:9px 13px;border-radius:6px;font-size:13px;cursor:pointer;';
  twBtn.onclick = function() {
    var txt = encodeURIComponent('Built with IA Architecte Studio! &#128640;\n#buildinpublic #webdev');
    window.open('https://twitter.com/intent/tweet?text=' + txt, '_blank');
  };

  row.appendChild(dlBtn);
  row.appendChild(cpBtn);
  row.appendChild(twBtn);
  zone.appendChild(row);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if (typeof oAL === 'function') oAL();
    if (window.activeTab === 'screenshot') renderSSTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if (tab === 'screenshot') {
      window.activeTab = 'screenshot';
      document.querySelectorAll('.ltab').forEach(function(b){ b.classList.remove('active'); });
      var el = document.getElementById('tab-screenshot');
      if (el) el.classList.add('active');
      renderSSTab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
