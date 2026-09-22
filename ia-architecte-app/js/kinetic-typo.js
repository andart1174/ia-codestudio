(function() {
'use strict';
var TX = {
  en: { tab: 'Kinetic Typo', title: '🔠 Kinetic Typography', sub: 'Modern Text Animations', desc: "Injects cinematic CSS text animations: Typewriter, Gradient Shift, and Mask Reveal. Ready for viral landing pages.", apply: '➕ Inject Typography', applied: '✅ Typography Injected!' },
  fr: { tab: 'Kinetic Typo', title: '🔠 Typographie Cinétique', sub: 'Animations de Texte Modernes', desc: "Injecte des animations de texte CSS cinématiques : Machine à écrire, Dégradé fluide et Révélation par masque.", apply: '➕ Injecter Typographie', applied: '✅ Typographie Injectée!' }
};
function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var snippet = `<!-- KINETIC TYPO ENGINE START -->
<style>
  /* 1. Typewriter */
  .ia-typewriter {
    overflow: hidden;
    white-space: nowrap;
    border-right: 2px solid #fff;
    width: 0;
    animation: ia-typing 3s steps(30, end) forwards, ia-blink 0.7s infinite;
  }
  @keyframes ia-typing { from { width: 0 } to { width: 100% } }
  @keyframes ia-blink { 50% { border-color: transparent } }

  /* 2. Gradient Shift */
  .ia-gradient-shift {
    background: linear-gradient(270deg, #ff1b6b, #45caff, #ff1b6b);
    background-size: 200% auto;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    animation: ia-grad-shift 3s linear infinite;
    display: inline-block;
  }
  @keyframes ia-grad-shift { to { background-position: 200% center; } }

  /* 3. Mask Reveal */
  .ia-mask-reveal-wrap {
    overflow: hidden;
    display: inline-block;
  }
  .ia-mask-reveal {
    display: inline-block;
    transform: translateY(100%);
    animation: ia-reveal-up 1s cubic-bezier(0.5, 0, 0, 1) forwards;
  }
  @keyframes ia-reveal-up { to { transform: translateY(0); } }
</style>
<div style="padding: 50px; background: #0f172a; min-height: 100vh; display:flex; flex-direction:column; gap:60px; align-items:center; justify-content:center; font-family:sans-serif;">
  
  <div>
    <h2 style="color:#94a3b8; font-size:14px; margin-bottom:10px;">1. Typewriter Effect</h2>
    <h1 class="ia-typewriter" style="color:white; font-size:3rem; margin:0;">Hello, World! I am typing...</h1>
  </div>

  <div>
    <h2 style="color:#94a3b8; font-size:14px; margin-bottom:10px;">2. Gradient Shift</h2>
    <h1 class="ia-gradient-shift" style="font-size:4rem; font-weight:900; margin:0;">SUPERCHARGED</h1>
  </div>

  <div>
    <h2 style="color:#94a3b8; font-size:14px; margin-bottom:10px;">3. Mask Reveal</h2>
    <h1 style="color:white; font-size:3rem; margin:0;">
      <span class="ia-mask-reveal-wrap"><span class="ia-mask-reveal" style="animation-delay: 0.2s">Design</span></span>
      <span class="ia-mask-reveal-wrap"><span class="ia-mask-reveal" style="animation-delay: 0.4s; color:#3b82f6;">Like</span></span>
      <span class="ia-mask-reveal-wrap"><span class="ia-mask-reveal" style="animation-delay: 0.6s">A Pro</span></span>
    </h1>
  </div>

</div>
<!-- KINETIC TYPO ENGINE END -->`;

function renderTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  
  var w = document.createElement('div');
  w.style.cssText = 'padding:15px;color:#fff;font-family:sans-serif;';
  w.innerHTML = '<h2 style="margin:0 0 5px;color:#f472b6;font-size:16px;">'+t('title')+'</h2><p style="font-size:11px;color:#94a3b8;margin:0 0 15px;">'+t('sub')+'</p><p style="font-size:12px;color:#cbd5e1;line-height:1.5;margin-bottom:20px;">'+t('desc')+'</p>';
  
  var btn = document.createElement('button');
  btn.textContent = t('apply');
  btn.style.cssText = 'width:100%;padding:10px;background:linear-gradient(90deg,#db2777,#f43f5e);border:none;border-radius:8px;color:#fff;font-weight:bold;cursor:pointer;box-shadow:0 4px 15px rgba(244,63,94,0.3);';
  btn.onclick = function() {
    if(!window.editor) return;
    var code = window.editor.getValue();
    if(code.indexOf('ia-gradient-shift') !== -1) { if(window.showToast) window.showToast('Already injected!'); return; }
    if(code.indexOf('</body>') !== -1) code = code.replace('</body>', snippet + '\\n</body>');
    else code += '\\n' + snippet;
    window.editor.setValue(code);
    if(window.runPreview) window.runPreview();
    if(window.showToast) window.showToast(t('applied'));
  };
  
  var demo = document.createElement('div');
  demo.style.cssText = 'margin-top:20px;padding:10px;background:rgba(255,255,255,0.05);border-radius:8px;font-size:11px;color:#94a3b8;word-break:break-all;';
  demo.innerHTML = '<b>Usage / Utilisation:</b><br><br>Classes:<br>• <span style="color:#60a5fa">ia-typewriter</span><br>• <span style="color:#60a5fa">ia-gradient-shift</span><br>• <span style="color:#60a5fa">ia-mask-reveal-wrap</span> (părinte)<br>• <span style="color:#60a5fa">ia-mask-reveal</span> (copil)';
  
  w.appendChild(btn);
  w.appendChild(demo);
  parent.appendChild(w);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(oAL) oAL();
    var el = document.getElementById('lbl-tab-kinetictypo');
    if(el) el.textContent = t('tab');
    if(window.activeTab === 'kinetictypo') renderTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab === 'kinetictypo') {
      window.activeTab = 'kinetictypo';
      document.querySelectorAll('.ltab').forEach(function(b){ b.classList.remove('active'); });
      var b = document.getElementById('tab-kinetictypo');
      if(b) b.classList.add('active');
      renderTab();
      return;
    }
    if(oRT) oRT(tab);
  };
});
})();
