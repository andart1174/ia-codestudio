/**
 * Animation Studio v1.0 — EN/FR
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: 'Animate', title: '🎞️ Animation Studio', sub: 'Keyframes & Transition Builder',
    presets: 'CSS Animation Presets', speed: 'Speed (s)',
    ease: 'Easing', inject: '⚡ Inject CSS Animation',
    lottie: 'Lottie Animations', lottieDesc: 'Inject a high-quality Lottie JSON player.',
    injectLottie: '⚡ Add Lottie Player',
    scroll: 'Scroll Animations', scrollDesc: 'Inject IntersectionObserver logic to animate elements on scroll.',
    injectScroll: '⚡ Add Scroll Logic',
    injected: '✅ Code injected successfully!'
  },
  fr: {
    tab: 'Animer', title: '🎞️ Studio d\'Animation', sub: 'Générateur de Keyframes & Transitions',
    presets: 'Préréglages d\'Animation CSS', speed: 'Vitesse (s)',
    ease: 'Transition', inject: '⚡ Injecter Animation CSS',
    lottie: 'Animations Lottie', lottieDesc: 'Injectez un lecteur Lottie JSON haute qualité.',
    injectLottie: '⚡ Ajouter Lecteur Lottie',
    scroll: 'Animations au Scroll', scrollDesc: 'Injectez un IntersectionObserver pour animer au défilement.',
    injectScroll: '⚡ Ajouter Logique Scroll',
    injected: '✅ Code injecté avec succès !'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var state = { preset: 'fadeUp', speed: '0.6', ease: 'ease-out' };

var CSS_PRESETS = {
  fadeUp: '@keyframes iaFadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }\n.ia-animate { animation: iaFadeUp SPEEDs EASE forwards; }',
  pulse: '@keyframes iaPulse { 0% { transform:scale(1); } 50% { transform:scale(1.05); } 100% { transform:scale(1); } }\n.ia-animate { animation: iaPulse SPEEDs EASE infinite; }',
  bounce: '@keyframes iaBounce { 0%, 20%, 50%, 80%, 100% { transform:translateY(0); } 40% { transform:translateY(-30px); } 60% { transform:translateY(-15px); } }\n.ia-animate { animation: iaBounce SPEEDs EASE; }',
  spin: '@keyframes iaSpin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }\n.ia-animate { animation: iaSpin SPEEDs linear infinite; }'
};

function injectCss() {
  if(!window.editor) return;
  var css = CSS_PRESETS[state.preset].replace('SPEED', state.speed).replace('EASE', state.ease);
  var block = '\n<style id="ia-animation-studio">\n' + css + '\n</style>';
  var code = window.editor.getValue().replace(/<style id="ia-animation-studio">[\s\S]*?<\/style>/g, '');
  code = code.includes('</head>') ? code.replace('</head>', block + '\n</head>') : block + '\n' + code;
  window.editor.setValue(code);
  if(window.runPreview) window.runPreview();
  if(window.showToast) window.showToast(t('injected'));
}

function injectLottie() {
  if(!window.editor) return;
  var script = '<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>';
  var player = '\n<lottie-player src="https://assets2.lottiefiles.com/packages/lf20_j1adxtyb.json" background="transparent" speed="1" style="width: 300px; height: 300px; margin:auto;" loop autoplay></lottie-player>';
  var code = window.editor.getValue();
  if(!code.includes('lottie-player.js')) {
    code = code.includes('</head>') ? code.replace('</head>', script + '\n</head>') : script + '\n' + code;
  }
  code = code.includes('</body>') ? code.replace('</body>', player + '\n</body>') : code + '\n' + player;
  window.editor.setValue(code);
  if(window.runPreview) window.runPreview();
  if(window.showToast) window.showToast(t('injected'));
}

function injectScroll() {
  if(!window.editor) return;
  var script = '\n<style>.ia-scroll-item { opacity:0; transform:translateY(20px); transition:all 0.8s ease-out; } .ia-scroll-visible { opacity:1; transform:translateY(0); }</style>\n<script>\ndocument.addEventListener("DOMContentLoaded", function() {\n  var obs = new IntersectionObserver(function(entries) {\n    entries.forEach(function(e) { if(e.isIntersecting) e.target.classList.add("ia-scroll-visible"); });\n  }, { threshold: 0.1 });\n  document.querySelectorAll(".ia-scroll-item").forEach(function(el) { obs.observe(el); });\n});\n</script>';
  var code = window.editor.getValue().replace(/<style>\.ia-scroll-item[\s\S]*?<\/script>/g, '');
  code = code.includes('</body>') ? code.replace('</body>', script + '\n</body>') : code + '\n' + script;
  window.editor.setValue(code);
  if(window.runPreview) window.runPreview();
  if(window.showToast) window.showToast(t('injected'));
}

function renderAnimTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(139,92,246,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#a78bfa;">' + t('title') + '</div><div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:15px;';

  // CSS Presets
  var pSec = document.createElement('div');
  pSec.style = 'background:rgba(139,92,246,0.05);border:1px solid rgba(139,92,246,0.15);border-radius:8px;padding:12px;';
  pSec.innerHTML = '<div style="font-size:9px;font-weight:900;color:#a78bfa;letter-spacing:1px;text-transform:uppercase;margin-bottom:10px;">' + t('presets') + '</div>';
  
  var sel = document.createElement('select');
  sel.style = 'width:100%;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:8px;color:#fff;font-size:11px;outline:none;margin-bottom:8px;';
  [{v:'fadeUp',l:'Fade Up'},{v:'pulse',l:'Pulse'},{v:'bounce',l:'Bounce'},{v:'spin',l:'Spin'}].forEach(function(o){
    var opt=document.createElement('option'); opt.value=o.v; opt.textContent=o.l;
    if(state.preset===o.v) opt.selected=true; sel.appendChild(opt);
  });
  sel.onchange = function(){ state.preset=sel.value; };
  pSec.appendChild(sel);

  var row = document.createElement('div'); row.style = 'display:flex;gap:8px;margin-bottom:10px;';
  var spBox = document.createElement('div'); spBox.style='flex:1;';
  spBox.innerHTML='<div style="font-size:9px;color:#94a3b8;margin-bottom:4px;">'+t('speed')+'</div>';
  var spInp = document.createElement('input'); spInp.type='number'; spInp.step='0.1'; spInp.value=state.speed;
  spInp.style='width:100%;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:6px;color:#fff;font-size:11px;outline:none;box-sizing:border-box;';
  spInp.oninput=function(){ state.speed=spInp.value; };
  spBox.appendChild(spInp);

  var eaBox = document.createElement('div'); eaBox.style='flex:2;';
  eaBox.innerHTML='<div style="font-size:9px;color:#94a3b8;margin-bottom:4px;">'+t('ease')+'</div>';
  var eaSel = document.createElement('select');
  eaSel.style='width:100%;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:6px;color:#fff;font-size:11px;outline:none;box-sizing:border-box;';
  ['ease-in','ease-out','ease-in-out','linear','cubic-bezier(0.68,-0.55,0.27,1.55)'].forEach(function(e){
    var opt=document.createElement('option'); opt.value=e; opt.textContent=e;
    if(state.ease===e) opt.selected=true; eaSel.appendChild(opt);
  });
  eaSel.onchange=function(){ state.ease=eaSel.value; };
  eaBox.appendChild(eaSel);

  row.appendChild(spBox); row.appendChild(eaBox); pSec.appendChild(row);

  var btn = document.createElement('button'); btn.textContent=t('inject');
  btn.style='width:100%;background:linear-gradient(135deg,#8b5cf6,#6d28d9);border:none;border-radius:6px;padding:8px;color:#fff;font-weight:900;font-size:10px;cursor:pointer;';
  btn.onclick=injectCss; pSec.appendChild(btn);
  body.appendChild(pSec);

  // Lottie
  var lSec = document.createElement('div'); lSec.style='background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;';
  lSec.innerHTML = '<div style="font-size:9px;font-weight:900;color:#cbd5e1;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px;">' + t('lottie') + '</div><div style="font-size:10px;color:#94a3b8;margin-bottom:10px;line-height:1.4;">'+t('lottieDesc')+'</div>';
  var lBtn = document.createElement('button'); lBtn.textContent=t('injectLottie');
  lBtn.style='width:100%;background:rgba(255,255,255,0.1);color:#fff;border:1px solid rgba(255,255,255,0.2);border-radius:6px;padding:8px;font-weight:700;font-size:10px;cursor:pointer;';
  lBtn.onclick=injectLottie; lSec.appendChild(lBtn); body.appendChild(lSec);

  // Scroll Animations
  var sSec = document.createElement('div'); sSec.style='background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;';
  sSec.innerHTML = '<div style="font-size:9px;font-weight:900;color:#cbd5e1;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px;">' + t('scroll') + '</div><div style="font-size:10px;color:#94a3b8;margin-bottom:10px;line-height:1.4;">'+t('scrollDesc')+'</div>';
  var sBtn = document.createElement('button'); sBtn.textContent=t('injectScroll');
  sBtn.style='width:100%;background:rgba(255,255,255,0.1);color:#fff;border:1px solid rgba(255,255,255,0.2);border-radius:6px;padding:8px;font-weight:700;font-size:10px;cursor:pointer;';
  sBtn.onclick=injectScroll; sSec.appendChild(sBtn); body.appendChild(sSec);

  wrap.appendChild(body); parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-anim');
    if(el) el.textContent = t('tab');
    if(window.activeTab==='anim') renderAnimTab();
  };

  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='anim') {
      window.activeTab = 'anim';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn = document.getElementById('tab-anim');
      if(btn) btn.classList.add('active');
      renderAnimTab();
      return;
    }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
