/**
 * Micro-Physics Architect v1.0 — EN/FR
 * UI Physics and Micro-Interactions
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: 'Micro-Physics', title: '🧲 Micro-Physics Architect', sub: 'Award-Winning UI Feel',
    desc: 'Inject real physics and micro-interactions. Click a button below and it will automatically apply to the appropriate elements on your page!',
    magnetic: 'Magnetic Button', magneticDesc: 'Auto-applies to all buttons. They attract the cursor.',
    liquid: 'Liquid UI (Gooey)', liquidDesc: 'Auto-applies to the whole page, merging overlapping items.',
    spring: 'Spring Physics', springDesc: 'Auto-applies to buttons and images. Elastic bounce on hover.',
    inject: '⚡ Auto-Apply Physics',
    injected: '✅ Micro-Physics auto-applied!'
  },
  fr: {
    tab: 'Micro-Physique', title: '🧲 Arhitecte Micro-Physique', sub: 'Sensation UI Récompensée',
    desc: 'Injectez une vraie physique. Cliquez sur un bouton ci-dessous et l\'effet s\'appliquera automatiquement !',
    magnetic: 'Bouton Magnétique', magneticDesc: 'S\'applique aux boutons. Attire le curseur.',
    liquid: 'Interface Liquide', liquidDesc: 'S\'applique à la page. Fusionne les éléments.',
    spring: 'Physique Élastique', springDesc: 'S\'applique aux boutons/images. Rebond au survol.',
    inject: '⚡ Auto-Appliquer Physique',
    injected: '✅ Micro-Physique appliquée automatiquement !'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var MAGNETIC_SCRIPT = `
<!-- 🧲 Magnetic Button Physics -->
<script>
document.addEventListener('DOMContentLoaded', () => {
  const mBtns = document.querySelectorAll('.ia-magnetic');
  mBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const h = rect.width / 2;
      const x = e.clientX - rect.left - h;
      const y = e.clientY - rect.top - h;
      btn.style.transform = \`translate(\${x * 0.3}px, \${y * 0.3}px)\`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
      btn.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
    });
    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'none';
    });
  });

  // Auto-apply
  document.querySelectorAll('button, .btn, a').forEach(el => el.classList.add('ia-magnetic'));
});
</script>
`;

var LIQUID_SCRIPT = `
<!-- 💧 Liquid UI SVG Filter -->
<svg style="width:0;height:0;position:absolute;" aria-hidden="true" focusable="false">
  <defs>
    <filter id="ia-goo">
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
      <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
    </filter>
  </defs>
</svg>
<style>
.ia-liquid-container {
  filter: url('#ia-goo');
}
</style>
<script id="ia-liquid-js">
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('ia-liquid-container');
});
</script>
`;

var SPRING_SCRIPT = `
<!-- 🌀 Spring Physics -->
<style>
.ia-spring {
  transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.ia-spring:hover {
  transform: scale(1.1) translateY(-5px);
}
.ia-spring:active {
  transform: scale(0.95);
}
</style>
<script id="ia-spring-js">
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('button, .btn, img, .card').forEach(el => el.classList.add('ia-spring'));
});
</script>
`;

function injectScript(type) {
  if(!window.editor) return;
  var code = window.editor.getValue();
  var snippet = '';
  
  if(type === 'magnetic' && !code.includes('ia-magnetic')) snippet = Math.random() + '\\n' + MAGNETIC_SCRIPT;
  if(type === 'magnetic' && !code.includes('ia-magnetic')) snippet = MAGNETIC_SCRIPT; // fixed
  
  if(type === 'liquid' && !code.includes('ia-goo')) snippet = LIQUID_SCRIPT;
  if(type === 'spring' && !code.includes('ia-spring')) snippet = SPRING_SCRIPT;

  if(snippet) {
    code = code.includes('</body>') ? code.replace('</body>', snippet + '\\n</body>') : code + '\\n' + snippet;
    window.editor.setValue(code);
    if(window.runPreview) window.runPreview();
    if(window.showToast) window.showToast(t('injected'));
  } else {
    if(window.showToast) window.showToast('Already injected.');
  }
}

function renderMicrophysicsTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(236,72,153,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#f472b6;">' + t('title') + '</div><div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:15px;';

  var desc = document.createElement('div');
  desc.style = 'font-size:11px;color:#94a3b8;line-height:1.5;margin-bottom:5px;';
  desc.textContent = t('desc');
  body.appendChild(desc);

  function createCard(id, icon, titleKey, descKey) {
    var sec = document.createElement('div');
    sec.style = 'background:rgba(236,72,153,0.05);border:1px solid rgba(236,72,153,0.15);border-radius:8px;padding:12px;';
    
    var h = document.createElement('div');
    h.style = 'display:flex;align-items:center;gap:8px;margin-bottom:6px;';
    h.innerHTML = '<span style="font-size:16px;">' + icon + '</span><span style="font-size:12px;font-weight:bold;color:#fdf2f8;">' + t(titleKey) + '</span>';
    sec.appendChild(h);

    var d = document.createElement('div');
    d.style = 'font-size:10px;color:#94a3b8;margin-bottom:10px;';
    d.textContent = t(descKey);
    sec.appendChild(d);

    var btn = document.createElement('button');
    btn.textContent = t('inject');
    btn.style = 'width:100%;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:6px;padding:8px;color:#fff;font-weight:bold;font-size:10px;cursor:pointer;';
    btn.onclick = function() { injectScript(id); };
    sec.appendChild(btn);

    return sec;
  }

  body.appendChild(createCard('magnetic', '🧲', 'magnetic', 'magneticDesc'));
  body.appendChild(createCard('liquid', '💧', 'liquid', 'liquidDesc'));
  body.appendChild(createCard('spring', '🌀', 'spring', 'springDesc'));

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-microphysics');
    if(el) el.textContent = t('tab');
    if(window.activeTab==='microphysics') renderMicrophysicsTab();
  };

  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='microphysics') {
      window.activeTab = 'microphysics';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn = document.getElementById('tab-microphysics');
      if(btn) btn.classList.add('active');
      renderMicrophysicsTab();
      return;
    }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
