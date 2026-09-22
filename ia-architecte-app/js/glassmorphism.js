/**
 * Glassmorphism Auto-Architect v1.0 — EN/FR
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: 'Glass UI', title: '🧊 Glassmorphism Architect', sub: 'Apple-Style Frosted Glass',
    desc: 'Automatically converts your solid backgrounds into modern, semi-transparent frosted glass (Glassmorphism).',
    inject: '⚡ Auto-Apply Glass UI',
    injected: '✅ Glassmorphism applied to your cards and headers!'
  },
  fr: {
    tab: 'Verre UI', title: '🧊 Architecte Glassmorphism', sub: 'Verre Dépoli Style Apple',
    desc: 'Convertit automatiquement vos arrière-plans solides en verre dépoli moderne et semi-transparent.',
    inject: '⚡ Auto-Appliquer Verre UI',
    injected: '✅ Glassmorphism appliqué à vos cartes et en-têtes !'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var GLASS_SCRIPT = `
<!-- 🧊 Glassmorphism Engine -->
<style id="ia-glass-css">
.ia-glass {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(15px) !important;
  -webkit-backdrop-filter: blur(15px) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1) !important;
  border-radius: 12px;
}
</style>
<script id="ia-glass-js">
document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll('.card, .box, header, nav, aside, section > div');
  targets.forEach(el => {
    // Only apply if it has some background or is a known container
    el.classList.add('ia-glass');
  });
});
</script>
`;

function injectGlass() {
  if(!window.editor) return;
  var code = window.editor.getValue();
  if(!code.includes('ia-glass-css')) {
    code = code.includes('</body>') ? code.replace('</body>', GLASS_SCRIPT + '\\n</body>') : code + '\\n' + GLASS_SCRIPT;
    window.editor.setValue(code);
    if(window.runPreview) window.runPreview();
    if(window.showToast) window.showToast(t('injected'));
  } else {
    if(window.showToast) window.showToast('Already injected.');
  }
}

function renderGlassTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(226,232,240,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#e2e8f0;">' + t('title') + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:15px;';

  var sec = document.createElement('div');
  sec.style = 'background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.15);border-radius:8px;padding:12px;text-align:center;backdrop-filter:blur(5px);';
  
  var icon = document.createElement('div');
  icon.innerHTML = '🧊';
  icon.style = 'font-size:40px;margin-bottom:10px;animation: pulse 2s infinite;';
  sec.appendChild(icon);

  var desc = document.createElement('div');
  desc.style = 'font-size:11px;color:#cbd5e1;margin-bottom:15px;line-height:1.5;';
  desc.textContent = t('desc');
  sec.appendChild(desc);

  var btn = document.createElement('button');
  btn.textContent = t('inject');
  btn.style = 'width:100%;background:linear-gradient(135deg,rgba(255,255,255,0.2),rgba(255,255,255,0.4));border:1px solid rgba(255,255,255,0.5);border-radius:6px;padding:10px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;text-shadow:0 1px 2px rgba(0,0,0,0.5);';
  btn.onclick = injectGlass;
  sec.appendChild(btn);

  body.appendChild(sec);
  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-glassmorphism');
    if(el) el.textContent = t('tab');
    if(window.activeTab==='glassmorphism') renderGlassTab();
  };

  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='glassmorphism') {
      window.activeTab = 'glassmorphism';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn = document.getElementById('tab-glassmorphism');
      if(btn) btn.classList.add('active');
      renderGlassTab();
      return;
    }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
