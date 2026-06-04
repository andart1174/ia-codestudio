/**
 * Font Explorer v1.0 — EN/FR
 */
(function () {
'use strict';
var TX = {
  en: { tab: 'Font Explorer', title: '🔤 Font Explorer', sub: 'Try 30 Google Fonts instantly',
    desc: 'Click any font to inject it into your app. Preview updates live.',
    injected: '✅ Font applied: ', remove: '✖ Remove Font', removed: '✖ Font removed.' },
  fr: { tab: 'Explorateur Polices', title: '🔤 Explorateur de Polices', sub: 'Testez 30 polices Google instantanement',
    desc: 'Cliquez sur une police pour l injecter dans votre app. Apercu mis a jour en direct.',
    injected: '✅ Police appliquee: ', remove: '✖ Supprimer', removed: '✖ Police supprimee.' }
};
function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var FONTS = [
  'Inter','Roboto','Open Sans','Lato','Montserrat','Oswald','Raleway','Poppins',
  'Nunito','Merriweather','Playfair Display','Space Grotesk','DM Sans','Outfit',
  'Syne','Lexend','Plus Jakarta Sans','Manrope','Figtree','Urbanist',
  'Source Code Pro','JetBrains Mono','Fira Code','IBM Plex Mono',
  'Pacifico','Lobster','Dancing Script','Righteous','Bebas Neue','Anton'
];

var PREVIEW = 'Aa Bb 123 — The quick brown fox';

function applyFont(font, statusEl) {
  if (!window.editor) return;
  var code = window.editor.getValue();
  var slug = font.replace(/ /g, '+');
  var linkTag = '<link id="ia-font" href="https://fonts.googleapis.com/css2?family=' + slug + ':wght@400;700;900&display=swap" rel="stylesheet">';
  var styleTag = '<style id="ia-font-css">body,*{font-family:"' + font + '",sans-serif!important;}</style>';
  code = code.replace(/<link id="ia-font"[^>]*>/g, '');
  code = code.replace(/<style id="ia-font-css">[\s\S]*?<\/style>/g, '');
  if (code.indexOf('<head>') !== -1) {
    code = code.replace('<head>', '<head>\n' + linkTag + '\n' + styleTag);
  } else { code = linkTag + '\n' + styleTag + '\n' + code; }
  window.editor.setValue(code);
  if (window.runPreview) window.runPreview();
  if (statusEl) statusEl.textContent = t('injected') + font;
}

function removeFont(statusEl) {
  if (!window.editor) return;
  var code = window.editor.getValue();
  code = code.replace(/<link id="ia-font"[^>]*>/g, '');
  code = code.replace(/<style id="ia-font-css">[\s\S]*?<\/style>/g, '');
  window.editor.setValue(code);
  if (window.runPreview) window.runPreview();
  if (statusEl) statusEl.textContent = t('removed');
}

function renderFontTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';
  var hdr = document.createElement('div');
  hdr.style.cssText = 'padding:12px 14px 8px;border-bottom:1px solid rgba(245,158,11,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#fbbf24;">' + t('title') + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);
  var body = document.createElement('div');
  body.style.cssText = 'flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:6px;';
  var desc = document.createElement('div');
  desc.style.cssText = 'font-size:10px;color:#94a3b8;line-height:1.4;margin-bottom:4px;';
  desc.textContent = t('desc');
  body.appendChild(desc);
  var statusEl = document.createElement('div');
  statusEl.style.cssText = 'font-size:11px;color:#4ade80;min-height:14px;text-align:center;';
  body.appendChild(statusEl);

  FONTS.forEach(function (font) {
    var card = document.createElement('div');
    card.style.cssText = 'background:#1e293b;border:1px solid #334155;border-radius:8px;padding:10px 12px;cursor:pointer;transition:border-color .15s;';
    card.onmouseenter = function () { card.style.borderColor = '#fbbf24'; };
    card.onmouseleave = function () { card.style.borderColor = '#334155'; };

    var name = document.createElement('div');
    name.style.cssText = 'font-size:10px;color:#fbbf24;font-weight:700;margin-bottom:4px;';
    name.textContent = font;
    card.appendChild(name);

    var preview = document.createElement('div');
    preview.style.cssText = 'font-size:13px;color:#e2e8f0;';
    preview.textContent = PREVIEW;
    card.appendChild(preview);

    card.onclick = function () { applyFont(font, statusEl); };
    body.appendChild(card);
  });

  var remBtn = document.createElement('button');
  remBtn.textContent = t('remove');
  remBtn.style.cssText = 'width:calc(100% - 20px);margin:0 10px 10px;background:rgba(100,116,139,0.15);border:1px solid rgba(100,116,139,0.3);border-radius:6px;padding:8px;color:#94a3b8;font-weight:700;font-size:10px;cursor:pointer;flex-shrink:0;';
  remBtn.onclick = function () { removeFont(statusEl); };

  wrap.appendChild(body);
  wrap.appendChild(remBtn);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function () {
  var oAL = window.applyLang;
  window.applyLang = function () {
    if (typeof oAL === 'function') oAL();
    var el = document.getElementById('lbl-tab-fontexplorer');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'fontexplorer') renderFontTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'fontexplorer') {
      window.activeTab = 'fontexplorer';
      document.querySelectorAll('.ltab').forEach(function (b) { b.classList.remove('active'); });
      var btn = document.getElementById('tab-fontexplorer');
      if (btn) btn.classList.add('active');
      renderFontTab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
