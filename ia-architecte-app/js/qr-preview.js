/**
 * QR Preview v2.0 — EN/FR
 * Minifies HTML before encoding to fit within QR limits.
 */
(function () {
'use strict';
var TX = {
  en: {
    tab: 'QR Preview', title: '📱 QR Preview', sub: 'Scan to see your app on mobile',
    desc: 'Generates a QR code from your current code. Scan with your phone to preview on a real device.',
    generate: '📱 Generate QR Code',
    scan: 'Scan with your phone camera',
    tooLarge: '⚠️ Still too large after compression (' ,
    tooLargeB: ' chars). Simplify your HTML.',
    size: 'Compressed size: ',
    hint: 'HTML is auto-minified before encoding.',
    chars: ' chars'
  },
  fr: {
    tab: 'QR Preview', title: '📱 QR Preview', sub: 'Scannez pour voir l app sur mobile',
    desc: 'Genere un QR code depuis votre code. Scannez avec votre telephone pour previsualiser l app.',
    generate: '📱 Generer le QR Code',
    scan: 'Scannez avec l appareil photo',
    tooLarge: '⚠️ Toujours trop grand apres compression (',
    tooLargeB: ' car.). Simplifiez votre HTML.',
    size: 'Taille compressée: ',
    hint: 'Le HTML est auto-minifie avant encodage.',
    chars: ' car.'
  }
};
function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var QR_MAX = 2800;

/* ── Aggressive HTML minifier ── */
function minifyHTML(html) {
  return html
    /* Remove HTML comments */
    .replace(/<!--[\s\S]*?-->/g, '')
    /* Remove content inside <script> tags (keep tag but empty body) — too risky to keep */
    /* Collapse whitespace between tags */
    .replace(/>\s+</g, '><')
    /* Collapse multiple spaces/newlines inside tags */
    .replace(/\s{2,}/g, ' ')
    /* Remove spaces around = in attributes */
    .replace(/\s*=\s*/g, '=')
    /* Remove space before /> */
    .replace(/\s*\/>/g, '/>')
    /* Remove space after < */
    .replace(/<\s+/g, '<')
    /* Remove space before > */
    .replace(/\s+>/g, '>')
    /* Remove Google Fonts link (saves ~80 chars, replaces with system font) */
    .replace(/<link[^>]*fonts\.googleapis[^>]*>/gi, '')
    /* Replace font-family declarations */
    .replace(/font-family:[^;"}]+/gi, 'font-family:sans-serif')
    /* Trim leading/trailing whitespace */
    .trim();
}

/* ── QR generation using qrcodejs CDN ── */
var qrLoaded = false;
function loadQRLib(cb) {
  if (qrLoaded && window.QRCode) { cb(); return; }
  var s = document.createElement('script');
  s.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
  s.onload = function () { qrLoaded = true; cb(); };
  s.onerror = function () { cb(new Error('lib')); };
  document.head.appendChild(s);
}

function makeQR(container, text, statusEl, infoEl) {
  loadQRLib(function (err) {
    container.innerHTML = '';
    if (err || !window.QRCode) {
      /* Fallback: Google Charts API */
      var img = document.createElement('img');
      img.src = 'https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=' + encodeURIComponent(text) + '&choe=UTF-8';
      img.style.cssText = 'width:180px;height:180px;border-radius:8px;display:block;margin:0 auto;';
      img.onerror = function () {
        container.innerHTML = '<div style="color:#f87171;font-size:10px;text-align:center;padding:16px;">QR generation failed. Check your internet connection.</div>';
      };
      container.appendChild(img);
      return;
    }
    try {
      new window.QRCode(container, {
        text: text,
        width: 180,
        height: 180,
        colorDark: '#ffffff',
        colorLight: '#1e293b',
        correctLevel: window.QRCode.CorrectLevel.L
      });
    } catch (e) {
      if (statusEl) statusEl.textContent = 'QR error: ' + e.message;
    }
  });
}

function toBase64(str) {
  try {
    /* Handle UTF-8 correctly */
    return btoa(unescape(encodeURIComponent(str)));
  } catch (e) {
    return btoa(str);
  }
}

function generateQR(qrContainer, statusEl, infoEl) {
  if (!window.editor) return;
  var raw = window.editor.getValue();
  var mini = minifyHTML(raw);

  /* base64 is ~33% larger than source; much smaller than encodeURIComponent (~300% larger) */
  var b64 = toBase64(mini);
  var dataURI = 'data:text/html;base64,' + b64;
  var totalLen = dataURI.length;

  if (infoEl) infoEl.textContent = t('size') + totalLen + t('chars') + ' / max ' + QR_MAX;

  if (totalLen > QR_MAX) {
    if (statusEl) {
      statusEl.textContent = t('tooLarge') + totalLen + t('tooLargeB');
      statusEl.style.color = '#f87171';
    }
    return;
  }

  statusEl.textContent = '';
  statusEl.style.color = '#4ade80';
  makeQR(qrContainer, dataURI, statusEl, infoEl);
}

function renderQRTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  /* Header */
  var hdr = document.createElement('div');
  hdr.style.cssText = 'padding:12px 14px 8px;border-bottom:1px solid rgba(16,185,129,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#34d399;">' + t('title') + '</div>'
                + '<div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style.cssText = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;align-items:center;';

  var desc = document.createElement('div');
  desc.style.cssText = 'font-size:10px;color:#94a3b8;line-height:1.5;text-align:center;width:100%;';
  desc.textContent = t('desc');
  body.appendChild(desc);

  /* QR container */
  var qrContainer = document.createElement('div');
  qrContainer.style.cssText = 'background:#1e293b;border:1px solid #334155;border-radius:12px;padding:16px;width:100%;min-height:100px;display:flex;align-items:center;justify-content:center;';
  var placeholder = document.createElement('div');
  placeholder.style.cssText = 'color:#475569;font-size:11px;text-align:center;';
  placeholder.textContent = '📱 Click Generate to create QR';
  qrContainer.appendChild(placeholder);
  body.appendChild(qrContainer);

  /* Info row */
  var infoEl = document.createElement('div');
  infoEl.style.cssText = 'font-size:9px;color:#64748b;text-align:center;width:100%;';
  body.appendChild(infoEl);

  /* Status */
  var statusEl = document.createElement('div');
  statusEl.style.cssText = 'font-size:10px;min-height:14px;text-align:center;width:100%;word-break:break-word;';
  body.appendChild(statusEl);

  /* Scan label */
  var scanLbl = document.createElement('div');
  scanLbl.style.cssText = 'font-size:10px;color:#475569;text-align:center;';
  scanLbl.textContent = t('scan');
  body.appendChild(scanLbl);

  /* Hint */
  var hint = document.createElement('div');
  hint.style.cssText = 'font-size:9px;color:#334155;text-align:center;background:#0f172a;border-radius:6px;padding:5px 8px;width:100%;';
  hint.textContent = t('hint');
  body.appendChild(hint);

  /* Generate button */
  var genBtn = document.createElement('button');
  genBtn.textContent = t('generate');
  genBtn.style.cssText = 'width:100%;background:linear-gradient(135deg,#059669,#0284c7);border:none;border-radius:8px;padding:11px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;margin-top:auto;transition:opacity .2s;';
  genBtn.onmouseenter = function () { genBtn.style.opacity = '0.85'; };
  genBtn.onmouseleave = function () { genBtn.style.opacity = '1'; };
  genBtn.onclick = function () {
    qrContainer.innerHTML = '<div style="color:#94a3b8;font-size:10px;">Generating...</div>';
    setTimeout(function () { generateQR(qrContainer, statusEl, infoEl); }, 100);
  };
  body.appendChild(genBtn);

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function () {
  var oAL = window.applyLang;
  window.applyLang = function () {
    if (typeof oAL === 'function') oAL();
    var el = document.getElementById('lbl-tab-qrpreview');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'qrpreview') renderQRTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'qrpreview') {
      window.activeTab = 'qrpreview';
      document.querySelectorAll('.ltab').forEach(function (b) { b.classList.remove('active'); });
      var btn = document.getElementById('tab-qrpreview');
      if (btn) btn.classList.add('active');
      renderQRTab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
