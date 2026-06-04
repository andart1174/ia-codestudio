/**
 * Stack Builder v1.0 — EN/FR
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: 'Stack', title: '🏗️ Stack Builder', sub: 'Inject CDN dependencies',
    fw: 'Frameworks', css: 'Styling', util: 'Utilities',
    inject: '⚡ Inject Selected Stack', injected: '✅ Dependencies injected!'
  },
  fr: {
    tab: 'Stack', title: '🏗️ Constructeur Stack', sub: 'Injecter les dépendances CDN',
    fw: 'Frameworks', css: 'Styles', util: 'Utilitaires',
    inject: '⚡ Injecter la Stack', injected: '✅ Dépendances injectées !'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var LIBS = {
  Frameworks: {
    'Vue.js': '<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>',
    'React': '<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>\n<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>',
    'Alpine.js': '<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>',
    'HTMX': '<script src="https://unpkg.com/htmx.org@1.9.10"></script>'
  },
  Styling: {
    'TailwindCSS': '<script src="https://cdn.tailwindcss.com"></script>',
    'Bootstrap': '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">',
    'Animate.css': '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>'
  },
  Utilities: {
    'GSAP': '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>',
    'Axios': '<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>',
    'Chart.js': '<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>'
  }
};

var state = { selected: {} };

function injectStack() {
  if(!window.editor) return;
  var code = window.editor.getValue();
  var toInject = [];
  
  Object.keys(LIBS).forEach(function(cat) {
    Object.keys(LIBS[cat]).forEach(function(lib) {
      if(state.selected[lib] && !code.includes(lib.toLowerCase().replace('.js',''))) {
        toInject.push(LIBS[cat][lib]);
      }
    });
  });

  if(toInject.length > 0) {
    var injStr = '\n<!-- 🏗️ IA-PRO Stack Builder -->\n' + toInject.join('\n');
    code = code.includes('</head>') ? code.replace('</head>', injStr + '\n</head>') : injStr + '\n' + code;
    window.editor.setValue(code);
    if(window.runPreview) window.runPreview();
    if(window.showToast) window.showToast(t('injected'));
  }
}

function renderStackTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(56,189,248,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#38bdf8;">' + t('title') + '</div><div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:12px;';

  Object.keys(LIBS).forEach(function(cat) {
    var sec = document.createElement('div');
    sec.style = 'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:10px;';
    var sTitle = document.createElement('div');
    sTitle.style = 'font-size:9px;font-weight:900;color:#94a3b8;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;';
    sTitle.textContent = cat;
    sec.appendChild(sTitle);

    var grid = document.createElement('div');
    grid.style = 'display:flex;flex-wrap:wrap;gap:6px;';
    
    Object.keys(LIBS[cat]).forEach(function(lib) {
      var btn = document.createElement('button');
      var isSel = !!state.selected[lib];
      btn.textContent = lib;
      btn.style = 'background:'+(isSel?'#38bdf8':'rgba(255,255,255,0.05)')+';color:'+(isSel?'#000':'#cbd5e1')+';border:1px solid '+(isSel?'#38bdf8':'rgba(255,255,255,0.1)')+';border-radius:4px;padding:5px 8px;font-size:10px;font-weight:700;cursor:pointer;transition:0.2s;';
      btn.onclick = function() { state.selected[lib] = !state.selected[lib]; renderStackTab(); };
      grid.appendChild(btn);
    });
    sec.appendChild(grid);
    body.appendChild(sec);
  });

  var bInj = document.createElement('button'); bInj.textContent = t('inject');
  bInj.style='width:100%;background:linear-gradient(135deg,#38bdf8,#0284c7);border:none;border-radius:6px;padding:10px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;margin-top:10px;';
  bInj.onclick = injectStack;
  body.appendChild(bInj);

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-stack');
    if(el) el.textContent = t('tab');
    if(window.activeTab==='stack') renderStackTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='stack') {
      window.activeTab = 'stack';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn = document.getElementById('tab-stack');
      if(btn) btn.classList.add('active');
      renderStackTab(); return;
    }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
