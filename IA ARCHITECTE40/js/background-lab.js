/**
 * Background Lab v1.1 — EN/FR
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: 'Backgrounds',
    title: '🌌 Background Lab',
    sub: 'Complex CSS Textures',
    desc: 'Replace boring solid colors with beautiful, math-generated CSS background patterns. Injects <style> targeting your body.',
    grid: '💠 Cyberpunk Grid',
    gridDesc: 'Neon blue grid on a dark background.',
    dot: '📄 Dotted Paper',
    dotDesc: 'Minimalist white paper with fine gray dots.',
    mesh: '🌈 Liquid Mesh',
    meshDesc: 'A smooth, multi-color abstract gradient blur.',
    inject: '➕ Apply Background',
    injected: '✅ Background applied to your page!'
  },
  fr: {
    tab: 'Fonds',
    title: '🌌 Labo de Fonds',
    sub: 'Textures CSS Complexes',
    desc: 'Remplacez les couleurs unies par de superbes motifs CSS. Injecte des regles CSS ciblant le body.',
    grid: '💠 Grille Cyberpunk',
    gridDesc: 'Motif de grille bleu neon sur fond sombre.',
    dot: '📄 Papier Pointille',
    dotDesc: 'Papier blanc minimaliste avec de fins points gris.',
    mesh: '🌈 Maille Liquide',
    meshDesc: 'Un degrade abstrait lisse et multicolore.',
    inject: '➕ Appliquer le Fond',
    injected: '✅ Fond applique a votre page !'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var BACKGROUNDS = {
  grid: [
    '<style>',
    'body {',
    '  background-color: #0f172a;',
    '  background-image:',
    '    linear-gradient(rgba(56,189,248,0.2) 1px, transparent 1px),',
    '    linear-gradient(90deg, rgba(56,189,248,0.2) 1px, transparent 1px);',
    '  background-size: 40px 40px;',
    '  color: #fff;',
    '}',
    '</style>'
  ].join('\n'),
  dot: [
    '<style>',
    'body {',
    '  background-color: #ffffff;',
    '  background-image: radial-gradient(#cbd5e1 1px, transparent 1px);',
    '  background-size: 20px 20px;',
    '  color: #0f172a;',
    '}',
    '</style>'
  ].join('\n'),
  mesh: [
    '<style>',
    'body {',
    '  background-color: #a78bfa;',
    '  background-image:',
    '    radial-gradient(at 0% 0%,   #38bdf8 0px, transparent 50%),',
    '    radial-gradient(at 100% 0%, #818cf8 0px, transparent 50%),',
    '    radial-gradient(at 100% 100%, #fb7185 0px, transparent 50%),',
    '    radial-gradient(at 0% 100%, #34d399 0px, transparent 50%);',
    '  min-height: 100vh;',
    '  color: #fff;',
    '}',
    '</style>'
  ].join('\n')
};

function injectBg(id) {
  if (!window.editor) return;
  var code = window.editor.getValue();
  var snippet = BACKGROUNDS[id];
  if (!snippet) return;

  if (code.indexOf('</body>') !== -1) {
    code = code.replace('</body>', '\n' + snippet + '\n</body>');
  } else {
    code += '\n' + snippet;
  }

  window.editor.setValue(code);
  if (window.runPreview) window.runPreview();
  if (window.showToast) window.showToast(t('injected'));
}

var PREVIEWS = {
  grid: 'background:#0f172a;background-image:linear-gradient(rgba(56,189,248,0.2) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,0.2) 1px,transparent 1px);background-size:20px 20px;',
  dot:  'background:#fff;background-image:radial-gradient(#cbd5e1 1px,transparent 1px);background-size:10px 10px;',
  mesh: 'background:#a78bfa;background-image:radial-gradient(at 0% 0%,#38bdf8 0px,transparent 50%),radial-gradient(at 100% 0%,#818cf8 0px,transparent 50%),radial-gradient(at 100% 100%,#fb7185 0px,transparent 50%),radial-gradient(at 0% 100%,#34d399 0px,transparent 50%);'
};

function renderBgTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';

  var wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style.cssText = 'padding:12px 14px 8px;border-bottom:1px solid rgba(139,92,246,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#c4b5fd;">' + t('title') + '</div>'
                + '<div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style.cssText = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:15px;';

  var desc = document.createElement('div');
  desc.style.cssText = 'font-size:11px;color:#94a3b8;line-height:1.5;';
  desc.textContent = t('desc');
  body.appendChild(desc);

  function createBlock(id, icon, titleKey, descKey) {
    var sec = document.createElement('div');
    sec.style.cssText = 'background:rgba(139,92,246,0.05);border:1px solid rgba(139,92,246,0.15);border-radius:8px;padding:12px;';

    var h = document.createElement('div');
    h.style.cssText = 'display:flex;align-items:center;gap:8px;margin-bottom:6px;';
    h.innerHTML = '<span style="font-size:18px;">' + icon + '</span>'
                + '<span style="font-size:12px;font-weight:bold;color:#c4b5fd;">' + t(titleKey) + '</span>';
    sec.appendChild(h);

    var preview = document.createElement('div');
    preview.style.cssText = 'height:45px;border-radius:6px;margin-bottom:8px;border:1px solid rgba(255,255,255,0.1);' + PREVIEWS[id];
    sec.appendChild(preview);

    var d = document.createElement('div');
    d.style.cssText = 'font-size:10px;color:#94a3b8;margin-bottom:10px;';
    d.textContent = t(descKey);
    sec.appendChild(d);

    var btn = document.createElement('button');
    btn.textContent = t('inject');
    btn.style.cssText = 'width:100%;background:rgba(139,92,246,0.2);border:1px solid rgba(139,92,246,0.4);border-radius:6px;padding:8px;color:#fff;font-weight:bold;font-size:10px;cursor:pointer;transition:all .2s;';
    btn.onmouseenter = function() { btn.style.background = 'rgba(139,92,246,0.4)'; };
    btn.onmouseleave = function() { btn.style.background = 'rgba(139,92,246,0.2)'; };
    btn.onclick = function() { injectBg(id); };
    sec.appendChild(btn);
    return sec;
  }

  body.appendChild(createBlock('grid', '💠', 'grid', 'gridDesc'));
  body.appendChild(createBlock('dot',  '📄', 'dot',  'dotDesc'));
  body.appendChild(createBlock('mesh', '🌈', 'mesh', 'meshDesc'));

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if (typeof oAL === 'function') oAL();
    var el = document.getElementById('lbl-tab-bglab');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'bglab') renderBgTab();
  };

  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if (tab === 'bglab') {
      window.activeTab = 'bglab';
      document.querySelectorAll('.ltab').forEach(function(b) { b.classList.remove('active'); });
      var btn = document.getElementById('tab-bglab');
      if (btn) btn.classList.add('active');
      renderBgTab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
