/**
 * i18n Center v1.0 — EN/FR
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: 'i18n', title: '🌍 i18n Center', sub: 'Translation & Localization Hub',
    extract: '🔍 Extract Texts', noTexts: 'No texts found.', generate: '⚡ Generate i18n.js Boilerplate',
    rtl: '🔄 Inject RTL (Arabic/Hebrew) Support',
    extracted: 'Extracted Texts:',
    info: 'Extracted texts will be wrapped in a dictionary.',
    injected: '✅ Code injected successfully!'
  },
  fr: {
    tab: 'i18n', title: '🌍 Centre i18n', sub: 'Hub de Traduction & Localisation',
    extract: '🔍 Extraire les textes', noTexts: 'Aucun texte trouvé.', generate: '⚡ Générer i18n.js (Boilerplate)',
    rtl: '🔄 Injecter support RTL (Arabe/Hébreu)',
    extracted: 'Textes extraits :',
    info: 'Les textes extraits seront placés dans un dictionnaire.',
    injected: '✅ Code injecté avec succès !'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var state = { texts: [] };

function extractTexts() {
  if(!window.editor) return;
  var code = window.editor.getValue();
  // Simple regex to extract texts between tags, ignoring scripts/styles
  var cleaned = code.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  var matches = cleaned.match(/>([^<]+)</g);
  var texts = [];
  if(matches) {
    matches.forEach(function(m) {
      var txt = m.replace(/[><]/g, '').trim();
      if(txt.length > 2 && !txt.includes('&') && !texts.includes(txt)) texts.push(txt);
    });
  }
  state.texts = texts;
  renderI18nTab();
}

function injectBoilerplate() {
  if(!window.editor) return;
  var dict = '{\n';
  state.texts.slice(0,10).forEach(function(txt, i) {
    dict += '    "key_' + i + '": "' + txt + '",\n';
  });
  dict += '    "welcome": "Welcome"\n  }';

  var script = '<script>\n// 🌍 IA-PRO i18n System\nwindow.i18n = {\n  lang: "en",\n  dict: {\n    en: ' + dict.replace(/\n/g, '\n    ') + ',\n    fr: {}\n  },\n  t: function(k) { return this.dict[this.lang][k] || k; },\n  setLang: function(l) { this.lang = l; document.documentElement.lang = l; document.querySelectorAll("[data-i18n]").forEach(function(el){ el.textContent = window.i18n.t(el.getAttribute("data-i18n")); }); }\n};\n</script>';
  
  var code = window.editor.getValue();
  code = code.includes('</body>') ? code.replace('</body>', script + '\n</body>') : code + '\n' + script;
  window.editor.setValue(code);
  if(window.runPreview) window.runPreview();
  if(window.showToast) window.showToast(t('injected'));
}

function injectRtl() {
  if(!window.editor) return;
  var css = '<style id="ia-rtl">\nhtml[dir="rtl"] { text-align: right; direction: rtl; }\nhtml[dir="rtl"] .flex { flex-direction: row-reverse; }\n</style>\n<script>\nfunction toggleRTL() {\n  var isRtl = document.documentElement.dir === "rtl";\n  document.documentElement.dir = isRtl ? "ltr" : "rtl";\n}\n</script>';
  var code = window.editor.getValue();
  code = code.includes('</head>') ? code.replace('</head>', css + '\n</head>') : css + '\n' + code;
  window.editor.setValue(code);
  if(window.runPreview) window.runPreview();
  if(window.showToast) window.showToast(t('injected'));
}

function renderI18nTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(20,184,166,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#14b8a6;">' + t('title') + '</div><div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:15px;';

  var btnExt = document.createElement('button');
  btnExt.textContent = t('extract');
  btnExt.style = 'width:100%;background:rgba(20,184,166,0.15);color:#14b8a6;border:1px solid rgba(20,184,166,0.3);border-radius:6px;padding:10px;font-weight:900;font-size:11px;cursor:pointer;';
  btnExt.onclick = extractTexts;
  body.appendChild(btnExt);

  var listSec = document.createElement('div');
  listSec.style = 'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:10px;';
  var listTitle = document.createElement('div');
  listTitle.style = 'font-size:9px;font-weight:900;color:#94a3b8;text-transform:uppercase;margin-bottom:8px;';
  listTitle.textContent = t('extracted') + ' (' + state.texts.length + ')';
  listSec.appendChild(listTitle);

  var list = document.createElement('div');
  list.style = 'max-height:150px;overflow-y:auto;font-size:10px;color:#cbd5e1;line-height:1.6;';
  if(state.texts.length === 0) list.innerHTML = '<i>' + t('noTexts') + '</i>';
  else {
    state.texts.slice(0,30).forEach(function(tx) {
      var d = document.createElement('div'); d.style = 'border-bottom:1px solid rgba(255,255,255,0.05);padding:3px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
      d.textContent = tx;
      list.appendChild(d);
    });
  }
  listSec.appendChild(list);
  body.appendChild(listSec);

  var btnGen = document.createElement('button');
  btnGen.textContent = t('generate');
  btnGen.style = 'width:100%;background:#0d9488;color:#fff;border:none;border-radius:6px;padding:10px;font-weight:900;font-size:11px;cursor:pointer;';
  btnGen.onclick = injectBoilerplate;
  body.appendChild(btnGen);

  var btnRtl = document.createElement('button');
  btnRtl.textContent = t('rtl');
  btnRtl.style = 'width:100%;background:rgba(255,255,255,0.05);color:#94a3b8;border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:10px;font-weight:700;font-size:11px;cursor:pointer;';
  btnRtl.onclick = injectRtl;
  body.appendChild(btnRtl);

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-i18n');
    if(el) el.textContent = t('tab');
    if(window.activeTab==='i18n') renderI18nTab();
  };

  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='i18n') {
      window.activeTab = 'i18n';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn = document.getElementById('tab-i18n');
      if(btn) btn.classList.add('active');
      renderI18nTab();
      return;
    }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
