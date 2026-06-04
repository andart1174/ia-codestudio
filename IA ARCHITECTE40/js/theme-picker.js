/**
 * Theme Picker v2.0 — EN/FR
 */
(function () {
'use strict';

var TX = {
  en: {
    tab: 'Theme Picker',
    title: '🎨 Theme Picker',
    sub: 'Apply a full color theme instantly',
    desc: 'Click "Apply" under any theme. All colors update automatically — no hex codes needed!',
    apply: '✅ Apply Theme',
    applied: '✅ Applied: '
  },
  fr: {
    tab: 'Themes',
    title: '🎨 Themes de Couleurs',
    sub: 'Appliquez un theme complet instantanement',
    desc: 'Cliquez sur "Appliquer" sous un theme. Toutes les couleurs se mettent a jour automatiquement.',
    apply: '✅ Appliquer',
    applied: '✅ Applique: '
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var THEMES = [
  { name: 'Ocean Blue',   bg: '#0f172a', card: '#1e293b', accent: '#3b82f6', text: '#f1f5f9',  border: '#334155' },
  { name: 'Sunset',       bg: '#1c1917', card: '#292524', accent: '#f97316', text: '#fef3c7',  border: '#44403c' },
  { name: 'Forest Green', bg: '#052e16', card: '#14532d', accent: '#22c55e', text: '#dcfce7',  border: '#166534' },
  { name: 'Midnight',     bg: '#1e1b4b', card: '#312e81', accent: '#818cf8', text: '#e0e7ff',  border: '#4338ca' },
  { name: 'Rose Gold',    bg: '#1c0a0a', card: '#3f0d0d', accent: '#f43f5e', text: '#ffe4e6',  border: '#9f1239' },
  { name: 'Arctic White', bg: '#f8fafc', card: '#ffffff', accent: '#0ea5e9', text: '#0f172a',  border: '#e2e8f0' },
  { name: 'Cyberpunk',    bg: '#0a0a0f', card: '#0d0d1a', accent: '#00ffcc', text: '#ccffee',  border: '#003322' },
  { name: 'Velvet',       bg: '#1a0a2e', card: '#2d1b4e', accent: '#c084fc', text: '#f3e8ff',  border: '#4c1d95' }
];

function applyTheme(theme, statusEl) {
  if (!window.editor) return;
  var code = window.editor.getValue();

  var styleBlock = [
    '<style id="ia-theme">',
    ':root {',
    '  --ia-bg:     ' + theme.bg + ';',
    '  --ia-card:   ' + theme.card + ';',
    '  --ia-accent: ' + theme.accent + ';',
    '  --ia-text:   ' + theme.text + ';',
    '  --ia-border: ' + theme.border + ';',
    '}',
    'body { background: var(--ia-bg) !important; color: var(--ia-text) !important; font-family: Inter, sans-serif; }',
    'button, .btn { background: var(--ia-accent) !important; color: var(--ia-bg) !important; }',
    'h1, h2, h3, h4 { color: var(--ia-text) !important; }',
    'input, textarea, select { background: var(--ia-card) !important; color: var(--ia-text) !important; border: 1px solid var(--ia-border) !important; }',
    '</style>'
  ].join('\n');

  code = code.replace(/<style id="ia-theme">[\s\S]*?<\/style>/g, '');

  if (code.indexOf('</head>') !== -1) {
    code = code.replace('</head>', styleBlock + '\n</head>');
  } else {
    code = styleBlock + '\n' + code;
  }

  window.editor.setValue(code);
  if (window.runPreview) window.runPreview();
  if (statusEl) statusEl.textContent = t('applied') + theme.name;
}

function renderThemeTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';

  var wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  /* ── Header ── */
  var hdr = document.createElement('div');
  hdr.style.cssText = 'padding:12px 14px 8px;border-bottom:1px solid rgba(234,179,8,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#fbbf24;">' + t('title') + '</div>'
                + '<div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  /* ── Scrollable body ── */
  var body = document.createElement('div');
  body.style.cssText = 'flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:8px;';

  /* Desc */
  var desc = document.createElement('div');
  desc.style.cssText = 'font-size:10px;color:#94a3b8;line-height:1.5;padding:6px 0;';
  desc.textContent = t('desc');
  body.appendChild(desc);

  /* Status */
  var statusEl = document.createElement('div');
  statusEl.style.cssText = 'font-size:11px;color:#4ade80;min-height:14px;text-align:center;';
  body.appendChild(statusEl);

  /* ── Theme cards ── */
  THEMES.forEach(function (theme) {

    /* Outer wrapper - NOT overflow:hidden so button is always visible */
    var card = document.createElement('div');
    card.style.cssText = 'border:1px solid #334155;border-radius:10px;background:#1e293b;';

    /* Preview strip */
    var strip = document.createElement('div');
    strip.style.cssText = [
      'height:40px',
      'background:' + theme.bg,
      'border-radius:9px 9px 0 0',
      'display:flex',
      'align-items:center',
      'padding:0 10px',
      'gap:7px'
    ].join(';') + ';';

    var dot = document.createElement('span');
    dot.style.cssText = 'display:inline-block;width:18px;height:18px;border-radius:50%;background:' + theme.accent + ';flex-shrink:0;';

    var lbl = document.createElement('span');
    lbl.style.cssText = 'font-size:11px;font-weight:700;color:' + theme.text + ';flex:1;font-family:Inter,sans-serif;';
    lbl.textContent = theme.name;

    var swatches = [theme.accent, theme.bg, theme.text].map(function (c) {
      var s = document.createElement('span');
      s.style.cssText = 'display:inline-block;width:9px;height:9px;border-radius:50%;background:' + c + ';border:1px solid rgba(255,255,255,0.2);';
      return s;
    });

    strip.appendChild(dot);
    strip.appendChild(lbl);
    swatches.forEach(function (s) { strip.appendChild(s); });
    card.appendChild(strip);

    /* Apply button — solid, always visible */
    var btn = document.createElement('button');
    btn.textContent = t('apply');
    btn.style.cssText = [
      'display:block',
      'width:100%',
      'background:' + theme.accent,
      'color:' + (theme.name === 'Arctic White' ? '#0f172a' : '#ffffff'),
      'border:none',
      'border-radius:0 0 9px 9px',
      'padding:9px 12px',
      'font-size:11px',
      'font-weight:800',
      'cursor:pointer',
      'letter-spacing:0.2px',
      'font-family:Inter,sans-serif',
      'transition:opacity .15s'
    ].join(';') + ';';

    btn.onmouseenter = function () { btn.style.opacity = '0.8'; };
    btn.onmouseleave = function () { btn.style.opacity = '1'; };
    btn.onclick = function () { applyTheme(theme, statusEl); };

    card.appendChild(btn);
    body.appendChild(card);
  });

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function () {
  var oAL = window.applyLang;
  window.applyLang = function () {
    if (typeof oAL === 'function') oAL();
    var el = document.getElementById('lbl-tab-themepicker');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'themepicker') renderThemeTab();
  };

  var oRT = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'themepicker') {
      window.activeTab = 'themepicker';
      document.querySelectorAll('.ltab').forEach(function (b) { b.classList.remove('active'); });
      var btn = document.getElementById('tab-themepicker');
      if (btn) btn.classList.add('active');
      renderThemeTab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
