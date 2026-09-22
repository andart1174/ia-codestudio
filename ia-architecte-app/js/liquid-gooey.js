(function() {
'use strict';
var TX = {
  en: { tab: 'Liquid UI', title: '💧 Liquid Gooey UI', sub: 'SVG Filter Physics', desc: 'Inject an invisible SVG filter that makes overlapping HTML elements stick and merge like liquid drops.', apply: '➕ Inject Gooey Engine', applied: '✅ Gooey Engine Injected!' },
  fr: { tab: 'Liquid UI', title: '💧 UI Liquide Gooey', sub: 'Physique de Filtre SVG', desc: 'Injectez un filtre SVG invisible qui fait fusionner les éléments HTML superposés comme des gouttes liquides.', apply: '➕ Injecter Moteur Gooey', applied: '✅ Moteur Gooey Injecté!' }
};
function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var snippet = `<!-- GOOEY ENGINE START -->
<style>
.ia-gooey-container {
  filter: url('#ia-gooey-filter');
  position: absolute; top:50%; left:50%; transform:translate(-50%,-50%);
  background: transparent;
  width: 200px; height: 100px;
}
.ia-gooey-element {
  background: #3b82f6;
  border-radius: 50%;
  position: absolute;
  top: 25px;
  width: 50px; height: 50px;
  animation: ia-gooey-anim 2s infinite alternate ease-in-out;
}
@keyframes ia-gooey-anim {
  0% { transform: translateX(0); }
  100% { transform: translateX(100px); }
}
</style>
<svg style="width:0;height:0;position:absolute;" aria-hidden="true" focusable="false">
  <filter id="ia-gooey-filter">
    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
    <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
  </filter>
</svg>
<div class="ia-gooey-container">
  <div class="ia-gooey-element" style="left:20px; animation-delay: 0s;"></div>
  <div class="ia-gooey-element" style="left:20px; animation-delay: -1s;"></div>
</div>
<!-- GOOEY ENGINE END -->`;

function renderTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  
  var w = document.createElement('div');
  w.style.cssText = 'padding:15px;color:#fff;font-family:sans-serif;';
  w.innerHTML = '<h2 style="margin:0 0 5px;color:#7dd3fc;font-size:16px;">'+t('title')+'</h2><p style="font-size:11px;color:#94a3b8;margin:0 0 15px;">'+t('sub')+'</p><p style="font-size:12px;color:#cbd5e1;line-height:1.5;margin-bottom:20px;">'+t('desc')+'</p>';
  
  var btn = document.createElement('button');
  btn.textContent = t('apply');
  btn.style.cssText = 'width:100%;padding:10px;background:linear-gradient(90deg,#0284c7,#0ea5e9);border:none;border-radius:8px;color:#fff;font-weight:bold;cursor:pointer;box-shadow:0 4px 15px rgba(14,165,233,0.3);';
  btn.onclick = function() {
    if(!window.editor) return;
    var code = window.editor.getValue();
    if(code.indexOf('ia-gooey-filter') !== -1) { if(window.showToast) window.showToast('Already injected!'); return; }
    if(code.indexOf('</body>') !== -1) code = code.replace('</body>', snippet + '\\n</body>');
    else code += '\\n' + snippet;
    window.editor.setValue(code);
    if(window.runPreview) window.runPreview();
    if(window.showToast) window.showToast(t('applied'));
  };
  
  var demo = document.createElement('div');
  demo.style.cssText = 'margin-top:20px;padding:10px;background:rgba(255,255,255,0.05);border-radius:8px;font-size:11px;color:#94a3b8;';
  demo.innerHTML = '<b>Usage / Utilisation:</b><br><br>&lt;div class="ia-gooey-container"&gt;<br>&nbsp;&nbsp;&lt;div class="ia-gooey-element" style="width:50px;height:50px;left:0;"&gt;&lt;/div&gt;<br>&nbsp;&nbsp;&lt;div class="ia-gooey-element" style="width:50px;height:50px;left:30px;"&gt;&lt;/div&gt;<br>&lt;/div&gt;';
  
  w.appendChild(btn);
  w.appendChild(demo);
  parent.appendChild(w);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(oAL) oAL();
    var el = document.getElementById('lbl-tab-liquidgooey');
    if(el) el.textContent = t('tab');
    if(window.activeTab === 'liquidgooey') renderTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab === 'liquidgooey') {
      window.activeTab = 'liquidgooey';
      document.querySelectorAll('.ltab').forEach(function(b){ b.classList.remove('active'); });
      var b = document.getElementById('tab-liquidgooey');
      if(b) b.classList.add('active');
      renderTab();
      return;
    }
    if(oRT) oRT(tab);
  };
});
})();
