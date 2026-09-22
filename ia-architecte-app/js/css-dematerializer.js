/**
 * CSS Dematerializer v1.0 — EN/FR
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: 'Dematerialize', title: '🎭 Thanos Dematerializer', sub: 'Particle Disintegration Effect',
    desc: 'Injects a particle explosion effect. Click the button and ALL buttons and images on your page will instantly vaporize when clicked!',
    inject: '⚡ Auto-Apply Thanos Effect',
    injected: '✅ Thanos effect auto-applied to all buttons and images!'
  },
  fr: {
    tab: 'Désintégrer', title: '🎭 Désintégrateur Thanos', sub: 'Effet de Particules',
    desc: 'Injecte un effet d\'explosion. Cliquez sur le bouton et TOUS les boutons et images s\'évaporeront au clic !',
    inject: '⚡ Auto-Appliquer l\'Effet Thanos',
    injected: '✅ Effet Thanos appliqué automatiquement !'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var THANOS_SCRIPT = `
<!-- 🎭 Thanos Dematerializer Engine -->
<style id="ia-thanos-css">
.ia-particle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  animation: ia-explode 1s forwards cubic-bezier(0.2, 0.8, 0.2, 1);
}
@keyframes ia-explode {
  0% { transform: translate(0, 0) scale(1); opacity: 1; }
  100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
}
</style>
<script id="ia-thanos-js">
document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    if(e.target.closest('.ia-thanos')) {
      const btn = e.target.closest('.ia-thanos');
      const rect = btn.getBoundingClientRect();
      const style = window.getComputedStyle(btn);
      const bgColor = style.backgroundColor !== 'rgba(0, 0, 0, 0)' ? style.backgroundColor : '#8b5cf6';
      
      for(let i=0; i<50; i++) {
        const p = document.createElement('div');
        p.className = 'ia-particle';
        const size = Math.random() * 6 + 2;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.background = bgColor;
        p.style.left = (rect.left + Math.random() * rect.width) + 'px';
        p.style.top = (rect.top + Math.random() * rect.height) + 'px';
        
        const tx = (Math.random() - 0.5) * 200 + 'px';
        const ty = (Math.random() - 0.5) * 200 + 'px';
        p.style.setProperty('--tx', tx);
        p.style.setProperty('--ty', ty);
        
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 1000);
      }
      
      btn.style.transition = 'opacity 0.2s';
      btn.style.opacity = '0';
      setTimeout(() => btn.style.display = 'none', 200);
    }
  });

  // Auto-Apply to buttons and images
  document.querySelectorAll('button, a, img').forEach(el => el.classList.add('ia-thanos'));
});
</script>
`;

function injectThanos() {
  if(!window.editor) return;
  var code = window.editor.getValue();
  if(!code.includes('ia-thanos-css')) {
    code = code.includes('</body>') ? code.replace('</body>', THANOS_SCRIPT + '\\n</body>') : code + '\\n' + THANOS_SCRIPT;
    window.editor.setValue(code);
    if(window.runPreview) window.runPreview();
    if(window.showToast) window.showToast(t('injected'));
  } else {
    if(window.showToast) window.showToast('Already injected.');
  }
}

function renderThanosTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(216,180,254,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#d8b4fe;">' + t('title') + '</div><div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:15px;';

  var sec = document.createElement('div');
  sec.style = 'background:rgba(216,180,254,0.05);border:1px solid rgba(216,180,254,0.15);border-radius:8px;padding:12px;text-align:center;';
  
  var icon = document.createElement('div');
  icon.innerHTML = '🎭';
  icon.style = 'font-size:40px;margin-bottom:10px;animation: pulse 2s infinite;';
  sec.appendChild(icon);

  var desc = document.createElement('div');
  desc.style = 'font-size:11px;color:#94a3b8;margin-bottom:15px;line-height:1.5;';
  desc.textContent = t('desc');
  sec.appendChild(desc);

  var btn = document.createElement('button');
  btn.textContent = t('inject');
  btn.style = 'width:100%;background:linear-gradient(135deg,#d8b4fe,#ec4899);border:none;border-radius:6px;padding:10px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;';
  btn.onclick = injectThanos;
  sec.appendChild(btn);

  body.appendChild(sec);
  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-thanos');
    if(el) el.textContent = t('tab');
    if(window.activeTab==='thanos') renderThanosTab();
  };

  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='thanos') {
      window.activeTab = 'thanos';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn = document.getElementById('tab-thanos');
      if(btn) btn.classList.add('active');
      renderThanosTab();
      return;
    }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
