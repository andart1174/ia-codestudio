(function() {
'use strict';
var TX = {
  en: { tab: 'Scroll Reveal', title: '📜 Scroll Reveal Pro', sub: 'Intersection Observer FX', desc: "Injects a lightweight JavaScript engine that detects when elements scroll into view, triggering beautiful fade and slide animations.", apply: '➕ Inject Engine', applied: '✅ Scroll Engine Injected!' },
  fr: { tab: 'Scroll Reveal', title: '📜 Scroll Reveal Pro', sub: 'Effets Intersection Observer', desc: "Injecte un moteur JavaScript léger qui détecte quand les éléments apparaissent à l'écran, déclenchant de superbes animations.", apply: '➕ Injecter Moteur', applied: '✅ Moteur Scroll Injecté!' }
};
function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var snippet = `<!-- SCROLL REVEAL ENGINE START -->
<style>
  .ia-reveal-up { opacity: 0; transform: translateY(50px); transition: all 0.8s cubic-bezier(0.5, 0, 0, 1); }
  .ia-reveal-left { opacity: 0; transform: translateX(-50px); transition: all 0.8s cubic-bezier(0.5, 0, 0, 1); }
  .ia-reveal-right { opacity: 0; transform: translateX(50px); transition: all 0.8s cubic-bezier(0.5, 0, 0, 1); }
  .ia-reveal-zoom { opacity: 0; transform: scale(0.8); transition: all 0.8s cubic-bezier(0.5, 0, 0, 1); }
  
  .ia-reveal-visible { opacity: 1 !important; transform: translate(0, 0) scale(1) !important; }
</style>
<script>
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('ia-reveal-visible');
      }
    });
  }, { threshold: 0.1 });

  const targets = document.querySelectorAll('.ia-reveal-up, .ia-reveal-left, .ia-reveal-right, .ia-reveal-zoom');
  targets.forEach(t => observer.observe(t));
});
</script>
<div style="height: 100vh; background: #0f172a; color: white; display:flex; align-items:center; justify-content:center; flex-direction:column; text-align:center; padding: 20px;">
  <h1>Scroll Down 👇</h1>
  <p style="color:#94a3b8;">Scroll to see the magical reveals in action.</p>
</div>
<div style="padding: 100px 20px; background: #1e293b; overflow: hidden;">
  <div class="ia-reveal-left" style="background:#3b82f6; color:white; padding: 30px; border-radius: 12px; max-width: 400px; margin: 0 auto 40px;">
    <h2>Slide from Left</h2>
    <p>class="ia-reveal-left"</p>
  </div>
  <div class="ia-reveal-right" style="background:#ec4899; color:white; padding: 30px; border-radius: 12px; max-width: 400px; margin: 0 auto 40px; text-align: right;">
    <h2>Slide from Right</h2>
    <p>class="ia-reveal-right"</p>
  </div>
  <div class="ia-reveal-up" style="background:#10b981; color:white; padding: 30px; border-radius: 12px; max-width: 400px; margin: 0 auto 40px; text-align: center;">
    <h2>Fade Up</h2>
    <p>class="ia-reveal-up"</p>
  </div>
  <div class="ia-reveal-zoom" style="background:#8b5cf6; color:white; padding: 30px; border-radius: 12px; max-width: 400px; margin: 0 auto 40px; text-align: center;">
    <h2>Zoom In</h2>
    <p>class="ia-reveal-zoom"</p>
  </div>
</div>
<!-- SCROLL REVEAL ENGINE END -->`;

function renderTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  
  var w = document.createElement('div');
  w.style.cssText = 'padding:15px;color:#fff;font-family:sans-serif;';
  w.innerHTML = '<h2 style="margin:0 0 5px;color:#fcd34d;font-size:16px;">'+t('title')+'</h2><p style="font-size:11px;color:#94a3b8;margin:0 0 15px;">'+t('sub')+'</p><p style="font-size:12px;color:#cbd5e1;line-height:1.5;margin-bottom:20px;">'+t('desc')+'</p>';
  
  var btn = document.createElement('button');
  btn.textContent = t('apply');
  btn.style.cssText = 'width:100%;padding:10px;background:linear-gradient(90deg,#d97706,#f59e0b);border:none;border-radius:8px;color:#fff;font-weight:bold;cursor:pointer;box-shadow:0 4px 15px rgba(245,158,11,0.3);';
  btn.onclick = function() {
    if(!window.editor) return;
    var code = window.editor.getValue();
    if(code.indexOf('ia-reveal-visible') !== -1) { if(window.showToast) window.showToast('Already injected!'); return; }
    if(code.indexOf('</body>') !== -1) code = code.replace('</body>', snippet + '\\n</body>');
    else code += '\\n' + snippet;
    window.editor.setValue(code);
    if(window.runPreview) window.runPreview();
    if(window.showToast) window.showToast(t('applied'));
  };
  
  var demo = document.createElement('div');
  demo.style.cssText = 'margin-top:20px;padding:10px;background:rgba(255,255,255,0.05);border-radius:8px;font-size:11px;color:#94a3b8;word-break:break-all;';
  demo.innerHTML = '<b>Usage / Utilisation:</b><br><br>Adaugă clasele pe orice div:<br>• <span style="color:#60a5fa">ia-reveal-up</span><br>• <span style="color:#60a5fa">ia-reveal-left</span><br>• <span style="color:#60a5fa">ia-reveal-right</span><br>• <span style="color:#60a5fa">ia-reveal-zoom</span>';
  
  w.appendChild(btn);
  w.appendChild(demo);
  parent.appendChild(w);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(oAL) oAL();
    var el = document.getElementById('lbl-tab-scrollreveal');
    if(el) el.textContent = t('tab');
    if(window.activeTab === 'scrollreveal') renderTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab === 'scrollreveal') {
      window.activeTab = 'scrollreveal';
      document.querySelectorAll('.ltab').forEach(function(b){ b.classList.remove('active'); });
      var b = document.getElementById('tab-scrollreveal');
      if(b) b.classList.add('active');
      renderTab();
      return;
    }
    if(oRT) oRT(tab);
  };
});
})();
