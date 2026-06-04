/**
 * Gradient Forge v1.0 — EN/FR
 */
(function () {
'use strict';
var TX = {
  en: {
    tab: 'Gradient Forge', title: '🎨 Gradient Forge', sub: 'Visual CSS gradient generator',
    desc: 'Build a custom gradient and inject it as the page background instantly.',
    color1: 'Color 1', color2: 'Color 2', color3: 'Color 3 (optional)',
    angle: 'Angle', type: 'Type', linear: 'Linear', radial: 'Radial',
    preview: 'Preview', inject: '➕ Inject as Background', injected: '✅ Gradient applied!'
  },
  fr: {
    tab: 'Forge Degrade', title: '🎨 Forge de Degrade', sub: 'Generateur visuel de degrade CSS',
    desc: 'Creez un degrade personnalise et injectez-le comme fond de page instantanement.',
    color1: 'Couleur 1', color2: 'Couleur 2', color3: 'Couleur 3 (optionnel)',
    angle: 'Angle', type: 'Type', linear: 'Lineaire', radial: 'Radial',
    preview: 'Apercu', inject: '➕ Injecter comme Fond', injected: '✅ Degrade applique !'
  }
};
function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var PRESETS = [
  { c1: '#3b82f6', c2: '#8b5cf6', c3: '', angle: 135, type: 'linear' },
  { c1: '#f97316', c2: '#ef4444', c3: '#fbbf24', angle: 90, type: 'linear' },
  { c1: '#22c55e', c2: '#0ea5e9', c3: '', angle: 120, type: 'linear' },
  { c1: '#ec4899', c2: '#8b5cf6', c3: '#06b6d4', angle: 45, type: 'linear' },
  { c1: '#1e293b', c2: '#3b82f6', c3: '', angle: 0, type: 'radial' }
];

function buildCSS(c1, c2, c3, angle, type) {
  var stops = c3 ? (c1 + ', ' + c3 + ', ' + c2) : (c1 + ', ' + c2);
  if (type === 'radial') {
    return 'radial-gradient(ellipse at center, ' + stops + ')';
  }
  return 'linear-gradient(' + angle + 'deg, ' + stops + ')';
}

function injectGradient(c1, c2, c3, angle, type, statusEl) {
  if (!window.editor) return;
  var css = buildCSS(c1, c2, c3, angle, type);
  var code = window.editor.getValue();
  var snippet = '<style id="ia-gradient">body { background: ' + css + ' !important; min-height: 100vh; }</style>';
  code = code.replace(/<style id="ia-gradient">[\s\S]*?<\/style>/g, '');
  if (code.indexOf('</head>') !== -1) {
    code = code.replace('</head>', snippet + '\n</head>');
  } else { code = snippet + '\n' + code; }
  window.editor.setValue(code);
  if (window.runPreview) window.runPreview();
  if (statusEl) statusEl.textContent = t('injected');
}

function renderGradientTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';
  var hdr = document.createElement('div');
  hdr.style.cssText = 'padding:12px 14px 8px;border-bottom:1px solid rgba(236,72,153,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#f472b6;">' + t('title') + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style.cssText = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';

  var desc = document.createElement('div');
  desc.style.cssText = 'font-size:10px;color:#94a3b8;line-height:1.5;';
  desc.textContent = t('desc');
  body.appendChild(desc);

  /* State */
  var state = { c1: '#3b82f6', c2: '#8b5cf6', c3: '', angle: 135, type: 'linear' };

  /* Preview box */
  var previewBox = document.createElement('div');
  previewBox.style.cssText = 'height:60px;border-radius:10px;border:1px solid #334155;transition:background .3s;';
  function updatePreview() {
    previewBox.style.background = buildCSS(state.c1, state.c2, state.c3, state.angle, state.type);
  }
  updatePreview();
  body.appendChild(previewBox);

  /* Type toggle */
  var typeRow = document.createElement('div');
  typeRow.style.cssText = 'display:flex;gap:8px;';
  ['linear', 'radial'].forEach(function (tp) {
    var btn = document.createElement('button');
    btn.textContent = tp === 'linear' ? t('linear') : t('radial');
    btn.style.cssText = 'flex:1;padding:7px;border-radius:6px;font-size:10px;font-weight:700;cursor:pointer;border:1px solid rgba(236,72,153,0.3);background:' + (state.type === tp ? 'rgba(236,72,153,0.3)' : 'rgba(236,72,153,0.05)') + ';color:#f472b6;';
    btn.onclick = function () {
      state.type = tp;
      typeRow.querySelectorAll('button').forEach(function (b) { b.style.background = 'rgba(236,72,153,0.05)'; });
      btn.style.background = 'rgba(236,72,153,0.3)';
      updatePreview();
    };
    typeRow.appendChild(btn);
  });
  body.appendChild(typeRow);

  /* Color pickers */
  function addColorRow(labelKey, stateKey) {
    var row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;gap:10px;';
    var lbl = document.createElement('label');
    lbl.style.cssText = 'font-size:10px;color:#94a3b8;flex:1;';
    lbl.textContent = t(labelKey);
    var picker = document.createElement('input');
    picker.type = 'color';
    picker.value = state[stateKey] || '#ffffff';
    picker.style.cssText = 'width:40px;height:30px;border:none;border-radius:6px;cursor:pointer;background:none;padding:0;';
    picker.oninput = function () { state[stateKey] = picker.value; updatePreview(); };
    row.appendChild(lbl);
    row.appendChild(picker);
    if (stateKey === 'c3') {
      var clr = document.createElement('button');
      clr.textContent = '✕';
      clr.style.cssText = 'background:none;border:none;color:#64748b;cursor:pointer;font-size:12px;';
      clr.onclick = function () { state.c3 = ''; updatePreview(); };
      row.appendChild(clr);
    }
    body.appendChild(row);
    return picker;
  }
  addColorRow('color1', 'c1');
  addColorRow('color2', 'c2');
  addColorRow('color3', 'c3');

  /* Angle slider (only for linear) */
  var angleRow = document.createElement('div');
  angleRow.style.cssText = 'display:flex;flex-direction:column;gap:4px;';
  var angleLbl = document.createElement('label');
  angleLbl.style.cssText = 'font-size:10px;color:#94a3b8;';
  var angleVal = document.createElement('span');
  angleVal.textContent = state.angle + '°';
  angleLbl.textContent = t('angle') + ': ';
  angleLbl.appendChild(angleVal);
  var angleSlider = document.createElement('input');
  angleSlider.type = 'range'; angleSlider.min = '0'; angleSlider.max = '360'; angleSlider.value = state.angle;
  angleSlider.style.cssText = 'width:100%;accent-color:#f472b6;';
  angleSlider.oninput = function () { state.angle = parseInt(angleSlider.value); angleVal.textContent = state.angle + '°'; updatePreview(); };
  angleRow.appendChild(angleLbl);
  angleRow.appendChild(angleSlider);
  body.appendChild(angleRow);

  /* Presets */
  var pLbl = document.createElement('div');
  pLbl.style.cssText = 'font-size:10px;color:#64748b;font-weight:700;';
  pLbl.textContent = 'PRESETS';
  body.appendChild(pLbl);
  var pRow = document.createElement('div');
  pRow.style.cssText = 'display:grid;grid-template-columns:repeat(5,1fr);gap:6px;';
  PRESETS.forEach(function (p) {
    var dot = document.createElement('div');
    dot.style.cssText = 'height:28px;border-radius:6px;cursor:pointer;background:' + buildCSS(p.c1, p.c2, p.c3, p.angle, p.type) + ';border:1px solid rgba(255,255,255,0.1);';
    dot.onclick = function () {
      state.c1 = p.c1; state.c2 = p.c2; state.c3 = p.c3;
      state.angle = p.angle; state.type = p.type;
      angleSlider.value = p.angle; angleVal.textContent = p.angle + '°';
      updatePreview();
    };
    pRow.appendChild(dot);
  });
  body.appendChild(pRow);

  /* Status + Inject */
  var statusEl = document.createElement('div');
  statusEl.style.cssText = 'font-size:11px;color:#4ade80;min-height:14px;text-align:center;';
  body.appendChild(statusEl);

  var injectBtn = document.createElement('button');
  injectBtn.textContent = t('inject');
  injectBtn.style.cssText = 'width:100%;background:linear-gradient(135deg,#db2777,#7c3aed);border:none;border-radius:8px;padding:11px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;';
  injectBtn.onclick = function () { injectGradient(state.c1, state.c2, state.c3, state.angle, state.type, statusEl); };
  body.appendChild(injectBtn);

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function () {
  var oAL = window.applyLang;
  window.applyLang = function () {
    if (typeof oAL === 'function') oAL();
    var el = document.getElementById('lbl-tab-gradientforge');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'gradientforge') renderGradientTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'gradientforge') {
      window.activeTab = 'gradientforge';
      document.querySelectorAll('.ltab').forEach(function (b) { b.classList.remove('active'); });
      var btn = document.getElementById('tab-gradientforge');
      if (btn) btn.classList.add('active');
      renderGradientTab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
