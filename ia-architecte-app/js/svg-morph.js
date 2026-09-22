(function() {
'use strict';
var TX = {
  en: { tab: 'SVG Morph', title: '🔀 SVG Shape Morphing', sub: 'Fluid Path Animation', desc: 'Allows smooth transformation between two different SVG shapes, like a Play button melting into a Pause button.', apply: '➕ Inject Morph Engine', applied: '✅ Morph Engine Injected!' },
  fr: { tab: 'SVG Morph', title: '🔀 Transformation SVG', sub: 'Animation de Chemin Fluide', desc: 'Permet une transformation fluide entre deux formes SVG différentes, comme un bouton Play qui fond en Pause.', apply: '➕ Injecter Moteur Morph', applied: '✅ Moteur Morph Injecté!' }
};
function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var snippet = `<!-- SVG MORPH ENGINE START -->
<style>
.ia-morph-btn {
  background: #a855f7; border: none; cursor: pointer; padding: 20px; border-radius: 50%;
  outline: none; box-shadow: 0 10px 20px rgba(168,85,247,0.3);
  position: absolute; top:50%; left:50%; transform:translate(-50%,-50%);
}
.ia-morph-path {
  transition: d 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
<button class="ia-morph-btn" onclick="toggleMorph(this)" 
  data-d1="M30 20 L70 50 L30 80 Z M30 20 L70 50 L30 80 Z" 
  data-d2="M20 20 L40 20 L40 80 L20 80 Z M60 20 L80 20 L80 80 L60 80 Z">
  <svg width="100" height="100" viewBox="0 0 100 100">
    <path class="ia-morph-path" d="M30 20 L70 50 L30 80 Z M30 20 L70 50 L30 80 Z" fill="white"/>
  </svg>
</button>
<script>
function toggleMorph(btn) {
  const path = btn.querySelector('.ia-morph-path');
  const d1 = btn.getAttribute('data-d1');
  const d2 = btn.getAttribute('data-d2');
  if(!path || !d1 || !d2) return;
  const current = path.getAttribute('d');
  path.setAttribute('d', current === d1 ? d2 : d1);
}
</script>
<!-- SVG MORPH ENGINE END -->`;

function renderTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  
  var w = document.createElement('div');
  w.style.cssText = 'padding:15px;color:#fff;font-family:sans-serif;';
  w.innerHTML = '<h2 style="margin:0 0 5px;color:#a855f7;font-size:16px;">'+t('title')+'</h2><p style="font-size:11px;color:#94a3b8;margin:0 0 15px;">'+t('sub')+'</p><p style="font-size:12px;color:#cbd5e1;line-height:1.5;margin-bottom:20px;">'+t('desc')+'</p>';
  
  var btn = document.createElement('button');
  btn.textContent = t('apply');
  btn.style.cssText = 'width:100%;padding:10px;background:linear-gradient(90deg,#9333ea,#a855f7);border:none;border-radius:8px;color:#fff;font-weight:bold;cursor:pointer;box-shadow:0 4px 15px rgba(168,85,247,0.3);';
  btn.onclick = function() {
    if(!window.editor) return;
    var code = window.editor.getValue();
    if(code.indexOf('ia-morph-btn') !== -1) { if(window.showToast) window.showToast('Already injected!'); return; }
    if(code.indexOf('</body>') !== -1) code = code.replace('</body>', snippet + '\\n</body>');
    else code += '\\n' + snippet;
    window.editor.setValue(code);
    if(window.runPreview) window.runPreview();
    if(window.showToast) window.showToast(t('applied'));
  };
  
  var demo = document.createElement('div');
  demo.style.cssText = 'margin-top:20px;padding:10px;background:rgba(255,255,255,0.05);border-radius:8px;font-size:11px;color:#94a3b8;word-break:break-all;';
  demo.innerHTML = '<b>Usage / Utilisation:</b><br><br>&lt;button class="ia-morph-btn" onclick="toggleMorph(this)" data-d1="M5 5 L15 10 L5 15 Z" data-d2="M5 5 L8 5 L8 15 L5 15 Z M12 5 L15 5 L15 15 L12 15 Z"&gt;<br>&nbsp;&nbsp;&lt;svg width="20" height="20" viewBox="0 0 20 20"&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;path class="ia-morph-path" d="M5 5 L15 10 L5 15 Z" fill="white"/&gt;<br>&nbsp;&nbsp;&lt;/svg&gt;<br>&lt;/button&gt;';
  
  w.appendChild(btn);
  w.appendChild(demo);
  parent.appendChild(w);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(oAL) oAL();
    var el = document.getElementById('lbl-tab-svgmorph');
    if(el) el.textContent = t('tab');
    if(window.activeTab === 'svgmorph') renderTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab === 'svgmorph') {
      window.activeTab = 'svgmorph';
      document.querySelectorAll('.ltab').forEach(function(b){ b.classList.remove('active'); });
      var b = document.getElementById('tab-svgmorph');
      if(b) b.classList.add('active');
      renderTab();
      return;
    }
    if(oRT) oRT(tab);
  };
});
})();
