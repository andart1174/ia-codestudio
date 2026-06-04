/**
 * Holographic Parallax Maker v1.0 — EN/FR
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: 'Hologram 3D', title: '🃏 Holographic Parallax Maker', sub: 'Iridescent 3D Cards',
    desc: 'Turn flat elements into 3D physical objects! Click the button and all boxes/cards will automatically become 3D holograms.',
    inject: '⚡ Auto-Apply Hologram 3D',
    injected: '✅ Hologram Auto-Applied to cards and boxes!'
  },
  fr: {
    tab: 'Hologramme 3D', title: '🃏 Créateur Parallaxe Holographique', sub: 'Cartes 3D Irisées',
    desc: 'Transformez des éléments plats en objets 3D ! Cliquez sur le bouton et toutes vos boîtes/cartes deviendront des hologrammes 3D.',
    inject: '⚡ Auto-Appliquer Hologramme',
    injected: '✅ Hologramme appliqué automatiquement aux cartes !'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var HOLOGRAM_SCRIPT = `
<!-- 🃏 Hologram 3D Engine -->
<style id="ia-hologram-css">
.ia-hologram {
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.1s;
  overflow: hidden;
}
.ia-hologram::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.8) 35%, transparent 50%, rgba(139,92,246,0.5) 60%, transparent 80%);
  background-size: 300% 300%;
  background-position: 50% 50%;
  mix-blend-mode: color-dodge;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
  z-index: 99;
}
.ia-hologram:hover::before {
  opacity: 1;
}
</style>
<script id="ia-hologram-js">
document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.ia-hologram');
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Check if mouse is inside the card
      if(x > 0 && x < rect.width && y > 0 && y < rect.height) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -15; // Max 15 deg
        const rotateY = ((x - centerX) / centerX) * 15;
        
        card.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) scale3d(1.02, 1.02, 1.02)\`;
        
        const bgX = (x / rect.width) * 100;
        const bgY = (y / rect.height) * 100;
        card.style.setProperty('--bg-x', \`\${bgX}%\`);
        card.style.setProperty('--bg-y', \`\${bgY}%\`);
      }
    });
  });
  
  document.body.addEventListener('mouseout', (e) => {
    const cards = document.querySelectorAll('.ia-hologram');
    cards.forEach(card => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s ease-out';
    });
  });

  // Auto-Apply to common containers
  const targets = document.querySelectorAll('.card, .box, article, main > div, section > div, img');
  targets.forEach(el => el.classList.add('ia-hologram'));
});
</script>
`;

function injectHologram() {
  if(!window.editor) return;
  var code = window.editor.getValue();
  if(!code.includes('ia-hologram-css')) {
    code = code.includes('</body>') ? code.replace('</body>', HOLOGRAM_SCRIPT + '\\n</body>') : code + '\\n' + HOLOGRAM_SCRIPT;
    window.editor.setValue(code);
    if(window.runPreview) window.runPreview();
    if(window.showToast) window.showToast(t('injected'));
  } else {
    if(window.showToast) window.showToast('Already injected.');
  }
}

function renderHolographicTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(52,211,153,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#34d399;">' + t('title') + '</div><div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:15px;';

  var sec = document.createElement('div');
  sec.style = 'background:rgba(52,211,153,0.05);border:1px solid rgba(52,211,153,0.15);border-radius:8px;padding:12px;text-align:center;';
  
  var icon = document.createElement('div');
  icon.innerHTML = '🃏';
  icon.style = 'font-size:40px;margin-bottom:10px;animation: pulse 2s infinite;';
  sec.appendChild(icon);

  var desc = document.createElement('div');
  desc.style = 'font-size:11px;color:#94a3b8;margin-bottom:15px;line-height:1.5;';
  desc.textContent = t('desc');
  sec.appendChild(desc);

  var btn = document.createElement('button');
  btn.textContent = t('inject');
  btn.style = 'width:100%;background:linear-gradient(135deg,#10b981,#06b6d4);border:none;border-radius:6px;padding:10px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;';
  btn.onclick = injectHologram;
  sec.appendChild(btn);

  body.appendChild(sec);
  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-holographic');
    if(el) el.textContent = t('tab');
    if(window.activeTab==='holographic') renderHolographicTab();
  };

  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='holographic') {
      window.activeTab = 'holographic';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn = document.getElementById('tab-holographic');
      if(btn) btn.classList.add('active');
      renderHolographicTab();
      return;
    }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
