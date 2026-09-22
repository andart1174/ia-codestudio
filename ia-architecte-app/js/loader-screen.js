/**
 * Loading Screen Wizard v1.0 — EN/FR
 */
(function () {
'use strict';
var TX = {
  en: {
    tab: 'Loading Screen', title: '⌛ Loading Screen', sub: 'Professional app loading screen',
    desc: 'Adds an animated loading screen that appears for 1.5s when your app opens, then disappears smoothly.',
    spinner: '⭕ Spinner', spinnerD: 'Classic animated ring spinner.',
    pulse: '💓 Pulse Logo', pulseD: 'Your app name pulses in the center.',
    bar: '📊 Progress Bar', barD: 'Futuristic loading bar fills the screen.',
    inject: '➕ Inject Loading Screen',
    remove: '✖ Remove',
    injected: '✅ Loading screen injected!',
    removed: '✖ Removed.'
  },
  fr: {
    tab: 'Ecran Chargement', title: '⌛ Ecran de Chargement', sub: 'Ecran de chargement professionnel',
    desc: 'Ajoute un ecran de chargement anime qui apparait 1.5s a l ouverture de votre app.',
    spinner: '⭕ Spinner', spinnerD: 'Anneau anime classique.',
    pulse: '💓 Logo Pulsant', pulseD: 'Le nom de votre app pulse au centre.',
    bar: '📊 Barre de Progression', barD: 'Une barre futuriste remplit l ecran.',
    inject: '➕ Injecter',
    remove: '✖ Supprimer',
    injected: '✅ Ecran de chargement injecte !',
    removed: '✖ Supprime.'
  }
};
function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var ID = 'ia-loader';

var PRESETS = {
  spinner: [
    '<style id="' + ID + '">',
    '#ia-loader-screen{position:fixed;inset:0;background:#0f172a;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:99999;transition:opacity 0.5s ease;}',
    '#ia-loader-screen.ia-fade{opacity:0;pointer-events:none;}',
    '.ia-spinner{width:48px;height:48px;border:4px solid rgba(59,130,246,0.2);border-top-color:#3b82f6;border-radius:50%;animation:ia-spin 0.8s linear infinite;}',
    '@keyframes ia-spin{to{transform:rotate(360deg)}}',
    '.ia-loader-text{color:#94a3b8;font-family:Inter,sans-serif;font-size:14px;margin-top:20px;letter-spacing:2px;}',
    '</style>',
    '<div id="ia-loader-screen"><div class="ia-spinner"></div><div class="ia-loader-text">Loading...</div></div>',
    '<script id="' + ID + '-js">',
    'setTimeout(function(){var s=document.getElementById("ia-loader-screen");if(s){s.classList.add("ia-fade");setTimeout(function(){s.remove();},500);}},1500);',
    '</script>'
  ].join('\n'),
  pulse: [
    '<style id="' + ID + '">',
    '#ia-loader-screen{position:fixed;inset:0;background:#0f172a;display:flex;align-items:center;justify-content:center;z-index:99999;transition:opacity 0.5s ease;}',
    '#ia-loader-screen.ia-fade{opacity:0;pointer-events:none;}',
    '.ia-pulse-logo{font-family:Inter,sans-serif;font-size:3rem;font-weight:900;color:#fff;animation:ia-pulse-anim 1s ease-in-out infinite;background:linear-gradient(135deg,#3b82f6,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}',
    '@keyframes ia-pulse-anim{0%,100%{transform:scale(1);}50%{transform:scale(1.08);}}',
    '</style>',
    '<div id="ia-loader-screen"><div class="ia-pulse-logo">APP</div></div>',
    '<script id="' + ID + '-js">',
    'setTimeout(function(){var s=document.getElementById("ia-loader-screen");if(s){s.classList.add("ia-fade");setTimeout(function(){s.remove();},500);}},1500);',
    '</script>'
  ].join('\n'),
  bar: [
    '<style id="' + ID + '">',
    '#ia-loader-screen{position:fixed;inset:0;background:#0a0f1e;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:99999;transition:opacity 0.5s ease;}',
    '#ia-loader-screen.ia-fade{opacity:0;pointer-events:none;}',
    '.ia-bar-wrap{width:280px;height:4px;background:rgba(255,255,255,0.1);border-radius:2px;overflow:hidden;}',
    '.ia-bar-fill{height:100%;background:linear-gradient(90deg,#3b82f6,#8b5cf6,#ec4899);border-radius:2px;animation:ia-bar-grow 1.4s ease-out forwards;}',
    '@keyframes ia-bar-grow{from{width:0%;}to{width:100%;}}',
    '.ia-bar-label{color:#475569;font-family:Inter,sans-serif;font-size:11px;letter-spacing:3px;margin-bottom:20px;}',
    '</style>',
    '<div id="ia-loader-screen"><div class="ia-bar-label">LOADING</div><div class="ia-bar-wrap"><div class="ia-bar-fill"></div></div></div>',
    '<script id="' + ID + '-js">',
    'setTimeout(function(){var s=document.getElementById("ia-loader-screen");if(s){s.classList.add("ia-fade");setTimeout(function(){s.remove();},500);}},1500);',
    '</script>'
  ].join('\n')
};

function removeLoader() {
  if (!window.editor) return;
  var code = window.editor.getValue();
  code = code.replace(/<style id="ia-loader">[\s\S]*?<\/style>/g, '');
  code = code.replace(/<div id="ia-loader-screen"[^>]*>[\s\S]*?<\/div>/g, '');
  code = code.replace(/<script id="ia-loader-js">[\s\S]*?<\/script>/g, '');
  window.editor.setValue(code);
  if (window.runPreview) window.runPreview();
}

function injectLoader(id, statusEl) {
  if (!window.editor) return;
  removeLoader();
  var code = window.editor.getValue();
  var snippet = PRESETS[id];
  if (code.indexOf('<body>') !== -1) {
    code = code.replace('<body>', '<body>\n' + snippet);
  } else if (code.indexOf('</body>') !== -1) {
    code = code.replace('</body>', snippet + '\n</body>');
  } else { code = snippet + '\n' + code; }
  window.editor.setValue(code);
  if (window.runPreview) window.runPreview();
  if (statusEl) statusEl.textContent = t('injected');
}

function renderLoaderTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';
  var hdr = document.createElement('div');
  hdr.style.cssText = 'padding:12px 14px 8px;border-bottom:1px solid rgba(251,191,36,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#fbbf24;">' + t('title') + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);
  var body = document.createElement('div');
  body.style.cssText = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';
  var desc = document.createElement('div');
  desc.style.cssText = 'font-size:10px;color:#94a3b8;line-height:1.5;';
  desc.textContent = t('desc');
  body.appendChild(desc);
  var statusEl = document.createElement('div');
  statusEl.style.cssText = 'font-size:11px;color:#4ade80;min-height:14px;text-align:center;';
  body.appendChild(statusEl);

  [['spinner','⭕','spinner','spinnerD'],['pulse','💓','pulse','pulseD'],['bar','📊','bar','barD']].forEach(function(item){
    var sec = document.createElement('div');
    sec.style.cssText = 'background:rgba(251,191,36,0.05);border:1px solid rgba(251,191,36,0.15);border-radius:8px;padding:10px;';
    var h = document.createElement('div');
    h.style.cssText = 'font-size:12px;font-weight:700;color:#fbbf24;margin-bottom:4px;';
    h.textContent = t(item[2]);
    sec.appendChild(h);
    var d = document.createElement('div');
    d.style.cssText = 'font-size:10px;color:#94a3b8;margin-bottom:8px;';
    d.textContent = t(item[3]);
    sec.appendChild(d);
    var btn = document.createElement('button');
    btn.textContent = t('inject');
    btn.style.cssText = 'width:100%;background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.4);border-radius:6px;padding:8px;color:#fff;font-weight:700;font-size:10px;cursor:pointer;';
    btn.onclick = (function(id){ return function(){ injectLoader(id, statusEl); }; })(item[0]);
    sec.appendChild(btn);
    body.appendChild(sec);
  });

  var remBtn = document.createElement('button');
  remBtn.textContent = t('remove');
  remBtn.style.cssText = 'width:100%;background:rgba(100,116,139,0.15);border:1px solid rgba(100,116,139,0.3);border-radius:6px;padding:8px;color:#94a3b8;font-weight:700;font-size:10px;cursor:pointer;';
  remBtn.onclick = function(){ removeLoader(); statusEl.textContent = t('removed'); };
  body.appendChild(remBtn);
  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function () {
  var oAL = window.applyLang;
  window.applyLang = function () {
    if (typeof oAL === 'function') oAL();
    var el = document.getElementById('lbl-tab-loaderscreen');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'loaderscreen') renderLoaderTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'loaderscreen') {
      window.activeTab = 'loaderscreen';
      document.querySelectorAll('.ltab').forEach(function (b) { b.classList.remove('active'); });
      var btn = document.getElementById('tab-loaderscreen');
      if (btn) btn.classList.add('active');
      renderLoaderTab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
