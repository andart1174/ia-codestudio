/**
 * Animation Forge v1.1 — EN/FR
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: 'Animations',
    title: '🎬 Animation Forge',
    sub: 'Cinematic CSS Keyframes',
    desc: 'Inject complex CSS animations. Add the generated class (e.g. class="ia-anim-float") to any element to animate it.',
    float: '🎈 Float',
    floatDesc: 'Smooth up and down floating animation.',
    pulse: '❤️ Heartbeat Pulse',
    pulseDesc: 'Rhythmic scaling, great for call-to-action buttons.',
    glitch: '⚡ Cyber Glitch',
    glitchDesc: 'Intense glitching effect for text or images.',
    inject: '➕ Inject Animation',
    injected: '✅ Injected! Add the class to your HTML elements.'
  },
  fr: {
    tab: 'Animations',
    title: '🎬 Forge Animations',
    sub: 'Keyframes CSS Cinematiques',
    desc: 'Injectez des animations complexes. Ajoutez la classe (ex: class="ia-anim-float") sur un element pour le faire bouger.',
    float: '🎈 Flottaison',
    floatDesc: 'Mouvement fluide de haut en bas.',
    pulse: '❤️ Pulsation',
    pulseDesc: 'Mise a l echelle rythmique, ideal pour les boutons.',
    glitch: '⚡ Glitch Cyber',
    glitchDesc: 'Effet de glitch intense pour texte ou images.',
    inject: '➕ Injecter Animation',
    injected: '✅ Injecte ! Ajoutez la classe a vos elements HTML.'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var ANIMS = {
  float: [
    '<style>',
    '.ia-anim-float { animation: ia-float 3s ease-in-out infinite; }',
    '@keyframes ia-float {',
    '  0%   { transform: translateY(0px); }',
    '  50%  { transform: translateY(-20px); }',
    '  100% { transform: translateY(0px); }',
    '}',
    '</style>'
  ].join('\n'),
  pulse: [
    '<style>',
    '.ia-anim-pulse { animation: ia-pulse 1.5s infinite; }',
    '@keyframes ia-pulse {',
    '  0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(220,38,38,0.7); }',
    '  70%  { transform: scale(1);    box-shadow: 0 0 0 15px rgba(220,38,38,0); }',
    '  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(220,38,38,0); }',
    '}',
    '</style>'
  ].join('\n'),
  glitch: [
    '<style>',
    '.ia-anim-glitch { animation: ia-glitch 1s linear infinite; position: relative; }',
    '@keyframes ia-glitch {',
    '  2%,  64% { transform: translate(2px,0)  skew(0deg); }',
    '  4%,  60% { transform: translate(-2px,0) skew(0deg); }',
    '  62%      { transform: translate(0,0)    skew(5deg); }',
    '}',
    '</style>'
  ].join('\n')
};

function injectAnim(id) {
  if (!window.editor) return;
  var code = window.editor.getValue();
  var snippet = ANIMS[id];
  if (!snippet) return;

  if (code.indexOf('ia-anim-' + id) !== -1) {
    if (window.showToast) window.showToast('Animation already injected!');
    return;
  }

  if (code.indexOf('</body>') !== -1) {
    code = code.replace('</body>', '\n' + snippet + '\n</body>');
  } else {
    code += '\n' + snippet;
  }

  window.editor.setValue(code);
  if (window.runPreview) window.runPreview();
  if (window.showToast) window.showToast(t('injected'));
}

function renderAnimTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';

  var wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style.cssText = 'padding:12px 14px 8px;border-bottom:1px solid rgba(249,115,22,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#fdba74;">' + t('title') + '</div>'
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
    sec.style.cssText = 'background:rgba(249,115,22,0.05);border:1px solid rgba(249,115,22,0.15);border-radius:8px;padding:12px;';

    var h = document.createElement('div');
    h.style.cssText = 'display:flex;align-items:center;gap:8px;margin-bottom:6px;';
    h.innerHTML = '<span style="font-size:18px;">' + icon + '</span>'
                + '<span style="font-size:12px;font-weight:bold;color:#fdba74;">' + t(titleKey) + '</span>';
    sec.appendChild(h);

    var d = document.createElement('div');
    d.style.cssText = 'font-size:10px;color:#94a3b8;margin-bottom:10px;';
    d.textContent = t(descKey);
    sec.appendChild(d);

    var clsBox = document.createElement('div');
    clsBox.style.cssText = 'background:#0f172a;border-radius:4px;padding:4px 8px;font-family:monospace;font-size:10px;color:#38bdf8;margin-bottom:8px;';
    clsBox.textContent = 'class="ia-anim-' + id + '"';
    sec.appendChild(clsBox);

    var btn = document.createElement('button');
    btn.textContent = t('inject');
    btn.style.cssText = 'width:100%;background:rgba(249,115,22,0.2);border:1px solid rgba(249,115,22,0.4);border-radius:6px;padding:8px;color:#fff;font-weight:bold;font-size:10px;cursor:pointer;transition:all .2s;';
    btn.onmouseenter = function() { btn.style.background = 'rgba(249,115,22,0.4)'; };
    btn.onmouseleave = function() { btn.style.background = 'rgba(249,115,22,0.2)'; };
    btn.onclick = function() { injectAnim(id); };
    sec.appendChild(btn);
    return sec;
  }

  body.appendChild(createBlock('float',  '🎈', 'float',  'floatDesc'));
  body.appendChild(createBlock('pulse',  '❤️',  'pulse',  'pulseDesc'));
  body.appendChild(createBlock('glitch', '⚡', 'glitch', 'glitchDesc'));

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if (typeof oAL === 'function') oAL();
    var el = document.getElementById('lbl-tab-animforge');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'animforge') renderAnimTab();
  };

  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if (tab === 'animforge') {
      window.activeTab = 'animforge';
      document.querySelectorAll('.ltab').forEach(function(b) { b.classList.remove('active'); });
      var btn = document.getElementById('tab-animforge');
      if (btn) btn.classList.add('active');
      renderAnimTab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
