(function() {
'use strict';
var TX = {
  en: { tab: 'Spotlight', title: '🔦 Cursor Spotlight', sub: 'Interactive Mask Reveal', desc: "Creates a hidden layer that is only revealed around the user's mouse cursor, like a flashlight in the dark.", apply: '➕ Inject Spotlight', applied: '✅ Spotlight Injected!' },
  fr: { tab: 'Spotlight', title: '🔦 Cursor Spotlight', sub: 'Révélation par Masque', desc: "Crée une couche cachée qui n'est révélée qu'autour du curseur de la souris, comme une lampe de poche.", apply: '➕ Injecter Spotlight', applied: '✅ Spotlight Injecté!' }
};
function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var snippet = `<!-- SPOTLIGHT EFFECT START -->
<style>
.ia-spotlight-wrapper {
  position: relative;
  overflow: hidden;
  background: #0f172a;
  color: #fff;
  padding: 50px;
}
.ia-spotlight-layer {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(135deg, #3b82f6, #ec4899);
  color: #fff;
  padding: 50px;
  clip-path: circle(0px at center);
  pointer-events: none;
  z-index: 10;
}
</style>
<script>
  document.addEventListener('mousemove', e => {
    document.querySelectorAll('.ia-spotlight-wrapper').forEach(wrap => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const layer = wrap.querySelector('.ia-spotlight-layer');
      if(layer) layer.style.clipPath = \`circle(150px at \${x}px \${y}px)\`;
    });
  });
</script>
<div class="ia-spotlight-wrapper">
  <h1 style="font-size:3rem;margin:0;">Hover the dark!</h1>
  <p>Find the hidden colors underneath the surface...</p>
  <div class="ia-spotlight-layer">
    <h1 style="font-size:3rem;margin:0;color:#fff;">You found it!</h1>
    <p style="color:#fff;">This area is only visible under the flashlight.</p>
  </div>
</div>
<!-- SPOTLIGHT EFFECT END -->`;

function renderTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  
  var w = document.createElement('div');
  w.style.cssText = 'padding:15px;color:#fff;font-family:sans-serif;';
  w.innerHTML = '<h2 style="margin:0 0 5px;color:#fb7185;font-size:16px;">'+t('title')+'</h2><p style="font-size:11px;color:#94a3b8;margin:0 0 15px;">'+t('sub')+'</p><p style="font-size:12px;color:#cbd5e1;line-height:1.5;margin-bottom:20px;">'+t('desc')+'</p>';
  
  var btn = document.createElement('button');
  btn.textContent = t('apply');
  btn.style.cssText = 'width:100%;padding:10px;background:linear-gradient(90deg,#e11d48,#f43f5e);border:none;border-radius:8px;color:#fff;font-weight:bold;cursor:pointer;box-shadow:0 4px 15px rgba(244,63,94,0.3);';
  btn.onclick = function() {
    if(!window.editor) return;
    var code = window.editor.getValue();
    if(code.indexOf('ia-spotlight-layer') !== -1) { if(window.showToast) window.showToast('Already injected!'); return; }
    if(code.indexOf('</body>') !== -1) code = code.replace('</body>', snippet + '\\n</body>');
    else code += '\\n' + snippet;
    window.editor.setValue(code);
    if(window.runPreview) window.runPreview();
    if(window.showToast) window.showToast(t('applied'));
  };
  
  var demo = document.createElement('div');
  demo.style.cssText = 'margin-top:20px;padding:10px;background:rgba(255,255,255,0.05);border-radius:8px;font-size:11px;color:#94a3b8;';
  demo.innerHTML = '<b>Usage / Utilisation:</b><br><br>&lt;div class="ia-spotlight-wrapper"&gt;<br>&nbsp;&nbsp;&lt;h1&gt;Hidden World&lt;/h1&gt;<br>&nbsp;&nbsp;&lt;div class="ia-spotlight-layer"&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;h1&gt;Colorful Secret&lt;/h1&gt;<br>&nbsp;&nbsp;&lt;/div&gt;<br>&lt;/div&gt;';
  
  w.appendChild(btn);
  w.appendChild(demo);
  parent.appendChild(w);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(oAL) oAL();
    var el = document.getElementById('lbl-tab-cursorspot');
    if(el) el.textContent = t('tab');
    if(window.activeTab === 'cursorspot') renderTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab === 'cursorspot') {
      window.activeTab = 'cursorspot';
      document.querySelectorAll('.ltab').forEach(function(b){ b.classList.remove('active'); });
      var b = document.getElementById('tab-cursorspot');
      if(b) b.classList.add('active');
      renderTab();
      return;
    }
    if(oRT) oRT(tab);
  };
});
})();
