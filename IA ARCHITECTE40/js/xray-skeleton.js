/**
 * X-Ray Skeleton Generator v1.0 — EN/FR
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: 'Skeleton UI', title: '🦴 X-Ray Skeleton Auto-Generator', sub: 'Instant Loading States',
    desc: 'Automatically generate a YouTube/Facebook style loading skeleton screen. Click the button and it applies to the whole page instantly!',
    inject: '⚡ Auto-Apply Skeleton',
    injected: '✅ Skeleton Auto-Applied to the entire page!'
  },
  fr: {
    tab: 'Squelette UI', title: '🦴 Générateur de Squelette X-Ray', sub: 'États de Chargement Instantanés',
    desc: 'Générez automatiquement un écran de chargement (style YouTube/Facebook). Cliquez sur le bouton et la magie opère sur toute la page !',
    inject: '⚡ Auto-Appliquer Squelette',
    injected: '✅ Squelette appliqué automatiquement sur toute la page !'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var SKELETON_CSS = `
<!-- 🦴 Skeleton Loading UI -->
<style id="ia-skeleton-css">
@keyframes ia-skeleton-shine {
  to { background-position-x: -200%; }
}
.ia-skeleton-active {
  pointer-events: none !important;
  user-select: none !important;
}
.ia-skeleton-active h1, .ia-skeleton-active h2, .ia-skeleton-active h3, .ia-skeleton-active h4, .ia-skeleton-active h5, .ia-skeleton-active h6, 
.ia-skeleton-active p, .ia-skeleton-active span, .ia-skeleton-active a, .ia-skeleton-active button, 
.ia-skeleton-active label, .ia-skeleton-active li, .ia-skeleton-active input, .ia-skeleton-active textarea {
  color: transparent !important;
  border-color: transparent !important;
  box-shadow: none !important;
  background: #e2e8f0 !important;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%) !important;
  background-size: 200% 100% !important;
  animation: 1.5s ia-skeleton-shine linear infinite !important;
  border-radius: 6px !important;
}
.ia-skeleton-active img, .ia-skeleton-active svg {
  filter: grayscale(100%) contrast(0%) brightness(1.8) !important;
  animation: 1.5s ia-skeleton-shine linear infinite !important;
}
</style>
<script id="ia-skeleton-auto">
  document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("ia-skeleton-active");
  });
</script>
`;

function injectSkeleton() {
  if(!window.editor) return;
  var code = window.editor.getValue();
  if(!code.includes('ia-skeleton-css')) {
    code = code.includes('</head>') ? code.replace('</head>', SKELETON_CSS + '\\n</head>') : SKELETON_CSS + '\\n' + code;
    window.editor.setValue(code);
    if(window.runPreview) window.runPreview();
    if(window.showToast) window.showToast(t('injected'));
  } else {
    if(window.showToast) window.showToast('Already injected.');
  }
}

function renderSkeletonTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(148,163,184,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#cbd5e1;">' + t('title') + '</div><div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:15px;';

  var sec = document.createElement('div');
  sec.style = 'background:rgba(148,163,184,0.05);border:1px solid rgba(148,163,184,0.15);border-radius:8px;padding:12px;text-align:center;';
  
  var icon = document.createElement('div');
  icon.innerHTML = '🦴';
  icon.style = 'font-size:40px;margin-bottom:10px;animation: pulse 2s infinite;';
  sec.appendChild(icon);

  var desc = document.createElement('div');
  desc.style = 'font-size:11px;color:#94a3b8;margin-bottom:15px;line-height:1.5;';
  desc.textContent = t('desc');
  sec.appendChild(desc);

  var btn = document.createElement('button');
  btn.textContent = t('inject');
  btn.style = 'width:100%;background:linear-gradient(135deg,#94a3b8,#64748b);border:none;border-radius:6px;padding:10px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;';
  btn.onclick = injectSkeleton;
  sec.appendChild(btn);

  body.appendChild(sec);
  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-skeleton');
    if(el) el.textContent = t('tab');
    if(window.activeTab==='skeleton') renderSkeletonTab();
  };

  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='skeleton') {
      window.activeTab = 'skeleton';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn = document.getElementById('tab-skeleton');
      if(btn) btn.classList.add('active');
      renderSkeletonTab();
      return;
    }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
