/**
 * Cyberpunk Neon Engine v1.0 — EN/FR
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: 'Cyber Neon', title: '🌌 Cyberpunk Neon Engine', sub: 'Flickering Glowing UI',
    desc: 'Instantly applies a dynamic, flickering neon glow to your buttons and titles, matched to their original colors.',
    inject: '⚡ Auto-Apply Cyber Neon',
    injected: '✅ Cyber Neon auto-applied to titles and buttons!'
  },
  fr: {
    tab: 'Néon Cyber', title: '🌌 Moteur Néon Cyberpunk', sub: 'Lueur UI Clignotante',
    desc: 'Applique instantanément une lueur néon dynamique et vacillante à vos boutons et titres, adaptée à leurs couleurs d\'origine.',
    inject: '⚡ Auto-Appliquer Néon Cyber',
    injected: '✅ Néon Cyber appliqué aux titres et boutons !'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var NEON_SCRIPT = `
<!-- 🌌 Cyberpunk Neon Engine -->
<style id="ia-neon-css">
@keyframes ia-neon-flicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    text-shadow: 0 0 5px var(--neon-color), 0 0 10px var(--neon-color), 0 0 20px var(--neon-color), 0 0 40px var(--neon-color);
    box-shadow: 0 0 5px var(--neon-color), inset 0 0 5px var(--neon-color), 0 0 20px var(--neon-color), inset 0 0 10px var(--neon-color);
  }
  20%, 24%, 55% {
    text-shadow: none;
    box-shadow: none;
  }
}

.ia-neon-text {
  color: #fff !important;
  animation: ia-neon-flicker 3s infinite alternate;
}

.ia-neon-box {
  background: transparent !important;
  border: 2px solid var(--neon-color) !important;
  color: #fff !important;
  animation: ia-neon-flicker 3s infinite alternate;
}
</style>
<script id="ia-neon-js">
document.addEventListener('DOMContentLoaded', () => {
  // Apply to Headings
  document.querySelectorAll('h1, h2, h3').forEach(el => {
    const style = window.getComputedStyle(el);
    let color = style.color !== 'rgba(0, 0, 0, 0)' && style.color !== 'rgb(0, 0, 0)' ? style.color : '#22d3ee';
    el.style.setProperty('--neon-color', color);
    el.classList.add('ia-neon-text');
  });

  // Apply to Buttons
  document.querySelectorAll('button, .btn, a').forEach(el => {
    const style = window.getComputedStyle(el);
    let color = style.backgroundColor !== 'rgba(0, 0, 0, 0)' ? style.backgroundColor : (style.color !== 'rgb(0, 0, 0)' ? style.color : '#ec4899');
    el.style.setProperty('--neon-color', color);
    el.classList.add('ia-neon-box');
  });
});
</script>
`;

function injectNeon() {
  if(!window.editor) return;
  var code = window.editor.getValue();
  if(!code.includes('ia-neon-css')) {
    code = code.includes('</body>') ? code.replace('</body>', NEON_SCRIPT + '\\n</body>') : code + '\\n' + NEON_SCRIPT;
    window.editor.setValue(code);
    if(window.runPreview) window.runPreview();
    if(window.showToast) window.showToast(t('injected'));
  } else {
    if(window.showToast) window.showToast('Already injected.');
  }
}

function renderNeonTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(34,211,238,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#22d3ee;">' + t('title') + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:15px;';

  var sec = document.createElement('div');
  sec.style = 'background:rgba(34,211,238,0.05);border:1px solid rgba(34,211,238,0.15);border-radius:8px;padding:12px;text-align:center;';
  
  var icon = document.createElement('div');
  icon.innerHTML = '🌌';
  icon.style = 'font-size:40px;margin-bottom:10px;animation: pulse 2s infinite;';
  sec.appendChild(icon);

  var desc = document.createElement('div');
  desc.style = 'font-size:11px;color:#94a3b8;margin-bottom:15px;line-height:1.5;';
  desc.textContent = t('desc');
  sec.appendChild(desc);

  var btn = document.createElement('button');
  btn.textContent = t('inject');
  btn.style = 'width:100%;background:linear-gradient(135deg,#06b6d4,#ec4899);border:none;border-radius:6px;padding:10px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;';
  btn.onclick = injectNeon;
  sec.appendChild(btn);

  body.appendChild(sec);
  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-cyberneon');
    if(el) el.textContent = t('tab');
    if(window.activeTab==='cyberneon') renderNeonTab();
  };

  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='cyberneon') {
      window.activeTab = 'cyberneon';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn = document.getElementById('tab-cyberneon');
      if(btn) btn.classList.add('active');
      renderNeonTab();
      return;
    }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
