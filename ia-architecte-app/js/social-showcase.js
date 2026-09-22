/**
 * Viral Social Showcase v1.0 — EN/FR
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: 'Viral Video', title: '📱 Viral Social Showcase', sub: 'TikTok / Reels Exporter',
    desc: 'Instantly wraps your app in a realistic 3D iPhone frame, adds a glowing background, and auto-scrolls your app so you can screen-record it for TikTok/Instagram.',
    start: '🎬 Start Showcase Mode',
    stop: '⏹️ Exit Showcase',
    active: 'Showcase Active! Screen-record the right panel now.'
  },
  fr: {
    tab: 'Vidéo Virale', title: '📱 Vitrine Sociale Virale', sub: 'Exportateur TikTok / Reels',
    desc: 'Enveloppe instantanément votre app dans un cadre iPhone 3D, ajoute un fond lumineux et fait défiler automatiquement votre app pour l\'enregistrer.',
    start: '🎬 Lancer le mode Vitrine',
    stop: '⏹️ Quitter la Vitrine',
    active: 'Vitrine active ! Enregistrez le panneau droit maintenant.'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var isShowcaseActive = false;

function toggleShowcase() {
  const iframe = document.getElementById('preview-iframe');
  if(!iframe) return;
  const container = document.getElementById('preview-frame-wrap');
  const viewport = container ? container.parentElement : null;
  if(!container || !viewport) return;

  if(!isShowcaseActive) {
    // Start Showcase
    isShowcaseActive = true;
    
    // Save original styles
    viewport.setAttribute('data-orig-style', viewport.getAttribute('style') || '');
    container.setAttribute('data-orig-style', container.getAttribute('style') || '');
    iframe.setAttribute('data-orig-style', iframe.getAttribute('style') || '');
    
    // Apply Showcase Styles to Viewport
    viewport.style.cssText = `
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #0f172a, #312e81, #831843);
      background-size: 400% 400%;
      animation: ia-bg-shift 10s ease infinite;
      overflow: hidden;
      perspective: 1200px;
    `;
    
    // Remove padding from frame-wrap
    container.style.cssText = `
      width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; transform-style: preserve-3d;
    `;
    
    if(!document.getElementById('ia-showcase-keyframes')) {
      const style = document.createElement('style');
      style.id = 'ia-showcase-keyframes';
      style.innerHTML = `
        @keyframes ia-bg-shift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes ia-phone-float { 0%,100%{transform: translateY(0) rotateX(10deg) rotateY(-5deg);} 50%{transform: translateY(-20px) rotateX(12deg) rotateY(-3deg);} }
      `;
      document.head.appendChild(style);
    }

    // Apply iPhone Styles to Iframe
    iframe.style.cssText = `
      width: 375px;
      height: 812px;
      border: 12px solid #000;
      border-radius: 40px;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.8), 0 0 0 2px #333;
      background: #fff;
      animation: ia-phone-float 6s ease-in-out infinite;
      transition: all 0.5s ease;
      position: relative;
    `;

    // Inject Auto-Scroll Script into Iframe
    try {
      const doc = iframe.contentWindow.document;
      const script = doc.createElement('script');
      script.id = 'ia-auto-scroll';
      script.innerHTML = `
        window.iaScrollInterval = setInterval(() => {
          window.scrollBy({ top: 2, behavior: 'smooth' });
          if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 50);
      `;
      doc.body.appendChild(script);
    } catch(e) {}

  } else {
    // Stop Showcase
    isShowcaseActive = false;
    viewport.style.cssText = viewport.getAttribute('data-orig-style') || '';
    container.style.cssText = container.getAttribute('data-orig-style') || '';
    iframe.style.cssText = iframe.getAttribute('data-orig-style') || '';
    
    try {
      const doc = iframe.contentWindow.document;
      const script = doc.getElementById('ia-auto-scroll');
      if(script) script.remove();
      iframe.contentWindow.clearInterval(iframe.contentWindow.iaScrollInterval);
    } catch(e) {}
  }
  
  renderShowcaseTab();
}

function renderShowcaseTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(244,63,94,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#f43f5e;">' + t('title') + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:15px;';

  var sec = document.createElement('div');
  sec.style = 'background:rgba(244,63,94,0.05);border:1px solid rgba(244,63,94,0.15);border-radius:8px;padding:12px;text-align:center;';
  
  var icon = document.createElement('div');
  icon.innerHTML = '📱';
  icon.style = 'font-size:40px;margin-bottom:10px;';
  if(isShowcaseActive) icon.style.animation = 'pulse 1s infinite';
  sec.appendChild(icon);

  var desc = document.createElement('div');
  desc.style = 'font-size:11px;color:#94a3b8;margin-bottom:15px;line-height:1.5;';
  desc.textContent = t('desc');
  sec.appendChild(desc);

  var btn = document.createElement('button');
  btn.textContent = isShowcaseActive ? t('stop') : t('start');
  btn.style = 'width:100%;background:linear-gradient(135deg,#f43f5e,#ec4899);border:none;border-radius:6px;padding:10px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;';
  btn.onclick = toggleShowcase;
  sec.appendChild(btn);

  if(isShowcaseActive) {
    var status = document.createElement('div');
    status.textContent = t('active');
    status.style = 'margin-top:15px;font-size:10px;color:#f43f5e;font-weight:bold;animation:pulse 2s infinite;';
    sec.appendChild(status);
  }

  body.appendChild(sec);
  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-socialshowcase');
    if(el) el.textContent = t('tab');
    if(window.activeTab==='socialshowcase') renderShowcaseTab();
  };

  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='socialshowcase') {
      window.activeTab = 'socialshowcase';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn = document.getElementById('tab-socialshowcase');
      if(btn) btn.classList.add('active');
      renderShowcaseTab();
      return;
    }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
