/**
 * Tooltip Builder v1.0 — EN/FR
 */
(function () {
'use strict';
var TX = {
  en: { tab: 'Tooltip Builder', title: '💬 Tooltip Builder', sub: 'Add elegant tooltips instantly',
    desc: 'Inject a CSS tooltip system into your app. Then add data-tip="text" to any element to show a tooltip on hover.',
    inject: '➕ Inject Tooltip System',
    remove: '✖ Remove',
    injected: '✅ Tooltips ready! Add data-tip="..." to any element.',
    removed: '✖ Tooltips removed.',
    howTitle: 'How to use:',
    howCode: '<button data-tip="Click me!">Button</button>',
    style: 'Tooltip Style:',
    dark: '🌑 Dark', light: '☀️ Light', accent: '💜 Accent', danger: '🔴 Danger'
  },
  fr: { tab: 'Bulles Info', title: '💬 Constructeur de Bulles', sub: 'Ajoutez des bulles d info elegantes',
    desc: 'Injectez un systeme de tooltips CSS dans votre app. Ajoutez ensuite data-tip="texte" sur n importe quel element.',
    inject: '➕ Injecter les Tooltips',
    remove: '✖ Supprimer',
    injected: '✅ Tooltips prets ! Ajoutez data-tip="..." sur tout element.',
    removed: '✖ Tooltips supprimes.',
    howTitle: 'Comment utiliser:',
    howCode: '<button data-tip="Cliquez!">Bouton</button>',
    style: 'Style de la bulle:',
    dark: '🌑 Sombre', light: '☀️ Clair', accent: '💜 Accent', danger: '🔴 Danger'
  }
};
function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var STYLES = {
  dark:   { bg: '#1e293b', text: '#f1f5f9', border: '#334155' },
  light:  { bg: '#ffffff', text: '#0f172a', border: '#e2e8f0' },
  accent: { bg: '#4f46e5', text: '#ffffff', border: '#4f46e5' },
  danger: { bg: '#dc2626', text: '#ffffff', border: '#dc2626' }
};

function buildCSS(style) {
  var s = STYLES[style] || STYLES.dark;
  return [
    '<style id="ia-tooltips">',
    '[data-tip]{position:relative;cursor:pointer;}',
    '[data-tip]::after{content:attr(data-tip);position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%);',
    'background:' + s.bg + ';color:' + s.text + ';border:1px solid ' + s.border + ';',
    'padding:5px 10px;border-radius:6px;font-size:12px;font-weight:600;white-space:nowrap;',
    'opacity:0;pointer-events:none;transition:opacity .2s;z-index:9999;font-family:Inter,sans-serif;}',
    '[data-tip]::before{content:"";position:absolute;bottom:calc(100% + 2px);left:50%;transform:translateX(-50%);',
    'border:5px solid transparent;border-top-color:' + s.bg + ';opacity:0;transition:opacity .2s;z-index:9999;}',
    '[data-tip]:hover::after,[data-tip]:hover::before{opacity:1;}',
    '</style>'
  ].join('\n');
}

function injectTooltips(style, statusEl) {
  if (!window.editor) return;
  var code = window.editor.getValue();
  code = code.replace(/<style id="ia-tooltips">[\s\S]*?<\/style>/g, '');
  var snippet = buildCSS(style);
  if (code.indexOf('</head>') !== -1) {
    code = code.replace('</head>', snippet + '\n</head>');
  } else { code = snippet + '\n' + code; }
  window.editor.setValue(code);
  if (window.runPreview) window.runPreview();
  if (statusEl) statusEl.textContent = t('injected');
}

function removeTooltips(statusEl) {
  if (!window.editor) return;
  var code = window.editor.getValue();
  code = code.replace(/<style id="ia-tooltips">[\s\S]*?<\/style>/g, '');
  window.editor.setValue(code);
  if (window.runPreview) window.runPreview();
  if (statusEl) statusEl.textContent = t('removed');
}

function renderTooltipTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';
  var hdr = document.createElement('div');
  hdr.style.cssText = 'padding:12px 14px 8px;border-bottom:1px solid rgba(99,102,241,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#818cf8;">' + t('title') + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);
  var body = document.createElement('div');
  body.style.cssText = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';

  var desc = document.createElement('div');
  desc.style.cssText = 'font-size:10px;color:#94a3b8;line-height:1.5;';
  desc.textContent = t('desc');
  body.appendChild(desc);

  /* Style picker */
  var styleLbl = document.createElement('div');
  styleLbl.style.cssText = 'font-size:10px;font-weight:700;color:#818cf8;';
  styleLbl.textContent = t('style');
  body.appendChild(styleLbl);

  var selectedStyle = 'dark';
  var styleRow = document.createElement('div');
  styleRow.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:6px;';
  ['dark','light','accent','danger'].forEach(function (st) {
    var btn = document.createElement('button');
    btn.textContent = t(st);
    btn.style.cssText = 'padding:7px 8px;border-radius:7px;font-size:10px;font-weight:700;cursor:pointer;border:1px solid rgba(99,102,241,' + (selectedStyle === st ? '0.6' : '0.2') + ');background:rgba(99,102,241,' + (selectedStyle === st ? '0.25' : '0.05') + ');color:#e2e8f0;';
    btn.onclick = function () {
      selectedStyle = st;
      styleRow.querySelectorAll('button').forEach(function (b) {
        b.style.background = 'rgba(99,102,241,0.05)';
        b.style.borderColor = 'rgba(99,102,241,0.2)';
      });
      btn.style.background = 'rgba(99,102,241,0.25)';
      btn.style.borderColor = 'rgba(99,102,241,0.6)';
    };
    styleRow.appendChild(btn);
  });
  body.appendChild(styleRow);

  /* How to use */
  var howBox = document.createElement('div');
  howBox.style.cssText = 'background:#0f172a;border:1px solid #1e293b;border-radius:8px;padding:10px;';
  var howLbl = document.createElement('div');
  howLbl.style.cssText = 'font-size:10px;color:#64748b;font-weight:700;margin-bottom:6px;';
  howLbl.textContent = t('howTitle');
  var howCode = document.createElement('code');
  howCode.style.cssText = 'font-size:10px;color:#4ade80;font-family:monospace;word-break:break-all;';
  howCode.textContent = t('howCode');
  howBox.appendChild(howLbl);
  howBox.appendChild(howCode);
  body.appendChild(howBox);

  var statusEl = document.createElement('div');
  statusEl.style.cssText = 'font-size:10px;color:#4ade80;min-height:14px;text-align:center;word-break:break-word;';
  body.appendChild(statusEl);

  var injectBtn = document.createElement('button');
  injectBtn.textContent = t('inject');
  injectBtn.style.cssText = 'width:100%;background:linear-gradient(135deg,#4f46e5,#7c3aed);border:none;border-radius:8px;padding:10px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;';
  injectBtn.onclick = function () { injectTooltips(selectedStyle, statusEl); };
  body.appendChild(injectBtn);

  var remBtn = document.createElement('button');
  remBtn.textContent = t('remove');
  remBtn.style.cssText = 'width:100%;background:rgba(100,116,139,0.15);border:1px solid rgba(100,116,139,0.3);border-radius:8px;padding:9px;color:#94a3b8;font-weight:700;font-size:10px;cursor:pointer;';
  remBtn.onclick = function () { removeTooltips(statusEl); };
  body.appendChild(remBtn);

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function () {
  var oAL = window.applyLang;
  window.applyLang = function () {
    if (typeof oAL === 'function') oAL();
    var el = document.getElementById('lbl-tab-tooltipbuilder');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'tooltipbuilder') renderTooltipTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'tooltipbuilder') {
      window.activeTab = 'tooltipbuilder';
      document.querySelectorAll('.ltab').forEach(function (b) { b.classList.remove('active'); });
      var btn = document.getElementById('tab-tooltipbuilder');
      if (btn) btn.classList.add('active');
      renderTooltipTab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
