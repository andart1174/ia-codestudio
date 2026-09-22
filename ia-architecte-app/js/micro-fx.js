/**
 * Micro-Interactions Studio v1.0 — EN/FR
 */
(function () {
'use strict';
var TX = {
  en: {
    tab: 'Micro FX', title: '🎪 Micro-Interactions', sub: 'Inject stunning interactions',
    desc: 'Select a micro-interaction and inject it. Each works on all matching elements automatically.',
    inject: '➕ Inject', remove: '✖ Remove All', injected: '✅ Injected: ', removed: '✖ Removed.'
  },
  fr: {
    tab: 'Micro FX', title: '🎪 Micro-Interactions', sub: 'Injectez des interactions elegantes',
    desc: 'Selectionnez une micro-interaction et injectez-la. Chaque effet fonctionne automatiquement sur tous les elements correspondants.',
    inject: '➕ Injecter', remove: '✖ Supprimer tout', injected: '✅ Injecte: ', removed: '✖ Supprime.'
  }
};
function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var FX = [
  {
    id: 'ripple', icon: '💧', name: 'Button Ripple',
    desc: 'Click ripple effect on all buttons',
    css: '<style id="ia-fx-ripple">.ia-ripple{position:relative;overflow:hidden;}.ia-ripple-wave{position:absolute;border-radius:50%;background:rgba(255,255,255,0.4);transform:scale(0);animation:ia-ripple-anim .5s linear;pointer-events:none;}@keyframes ia-ripple-anim{to{transform:scale(4);opacity:0;}}</style>',
    js: '<script id="ia-fx-ripple-js">(function(){document.querySelectorAll("button,a,.btn").forEach(function(el){el.classList.add("ia-ripple");el.addEventListener("click",function(e){var r=document.createElement("span");var rect=el.getBoundingClientRect();var s=Math.max(rect.width,rect.height);r.className="ia-ripple-wave";r.style.cssText="width:"+s+"px;height:"+s+"px;left:"+(e.clientX-rect.left-s/2)+"px;top:"+(e.clientY-rect.top-s/2)+"px;";el.appendChild(r);setTimeout(function(){r.remove();},500);});});})();<\/script>'
  },
  {
    id: 'shake', icon: '💥', name: 'Form Shake Error',
    desc: 'Shake animation on invalid form fields',
    css: '<style id="ia-fx-shake">@keyframes ia-shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}.ia-shake{animation:ia-shake .4s ease;}</style>',
    js: '<script id="ia-fx-shake-js">(function(){document.querySelectorAll("form").forEach(function(f){f.addEventListener("submit",function(e){var valid=true;f.querySelectorAll("input,textarea").forEach(function(inp){if(!inp.value.trim()){inp.classList.remove("ia-shake");void inp.offsetWidth;inp.classList.add("ia-shake");valid=false;}});if(!valid)e.preventDefault();});});})();<\/script>'
  },
  {
    id: 'hover3d', icon: '🎴', name: 'Card 3D Hover',
    desc: 'Cards tilt in 3D on mouse hover',
    css: '<style id="ia-fx-hover3d">.ia-card-3d{transition:transform .15s ease,box-shadow .15s ease;transform-style:preserve-3d;will-change:transform;}</style>',
    js: '<script id="ia-fx-hover3d-js">(function(){document.querySelectorAll(".card,article,[class*=card]").forEach(function(el){el.classList.add("ia-card-3d");el.addEventListener("mousemove",function(e){var r=el.getBoundingClientRect();var x=(e.clientX-r.left)/r.width-0.5;var y=(e.clientY-r.top)/r.height-0.5;el.style.transform="perspective(600px) rotateY("+(x*18)+"deg) rotateX("+(-y*18)+"deg) scale(1.03)";el.style.boxShadow="0 20px 50px rgba(0,0,0,0.3)";});el.addEventListener("mouseleave",function(){el.style.transform="";el.style.boxShadow="";});});})();<\/script>'
  },
  {
    id: 'counter', icon: '🔢', name: 'Number Counter',
    desc: 'Numbers animate counting up on load',
    css: '<style id="ia-fx-counter"></style>',
    js: '<script id="ia-fx-counter-js">(function(){function animateNum(el,target,duration){var start=0,step=target/60;var t=setInterval(function(){start+=step;if(start>=target){el.textContent=target;clearInterval(t);}else{el.textContent=Math.floor(start);}},duration/60);}document.querySelectorAll("h1,h2,h3,strong,.number,.stat").forEach(function(el){var txt=el.textContent.trim();var num=parseInt(txt);if(!isNaN(num)&&num>10){animateNum(el,num,1200);}});})();<\/script>'
  },
  {
    id: 'glow', icon: '✨', name: 'Button Glow',
    desc: 'Glowing pulsing effect on all buttons',
    css: '<style id="ia-fx-glow">@keyframes ia-glow{0%,100%{box-shadow:0 0 5px currentColor}50%{box-shadow:0 0 20px currentColor,0 0 40px currentColor}}button,.btn,a[href]{animation:ia-glow 2s ease-in-out infinite;}</style>',
    js: '<script id="ia-fx-glow-js">/* glow effect is CSS-only */<\/script>'
  },
  {
    id: 'typewriter', icon: '⌨️', name: 'Typewriter Effect',
    desc: 'First h1 text types itself character by character',
    css: '<style id="ia-fx-typewriter">.ia-typewriter::after{content:"|";animation:ia-blink .7s step-end infinite;}@keyframes ia-blink{50%{opacity:0;}}</style>',
    js: '<script id="ia-fx-typewriter-js">(function(){var el=document.querySelector("h1");if(!el)return;var txt=el.textContent;el.textContent="";el.classList.add("ia-typewriter");var i=0;var iv=setInterval(function(){el.textContent=txt.slice(0,++i);if(i>=txt.length){el.classList.remove("ia-typewriter");clearInterval(iv);}},60);})();<\/script>'
  },
  {
    id: 'parallax', icon: '🌐', name: 'Mouse Parallax',
    desc: 'Hero sections move subtly with mouse',
    css: '<style id="ia-fx-parallax"></style>',
    js: '<script id="ia-fx-parallax-js">(function(){var hero=document.querySelector("section,.hero");if(!hero)return;document.addEventListener("mousemove",function(e){var x=(e.clientX/window.innerWidth-0.5)*20;var y=(e.clientY/window.innerHeight-0.5)*20;hero.style.backgroundPosition=(50+x*0.5)+"% "+(50+y*0.5)+"%";hero.style.transform="perspective(800px) rotateX("+(y*0.1)+"deg) rotateY("+(-x*0.1)+"deg)";});})();<\/script>'
  },
  {
    id: 'confetti', icon: '🎉', name: 'Confetti on Click',
    desc: 'Confetti burst on button click',
    css: '<style id="ia-fx-confetti">.ia-conf{position:fixed;pointer-events:none;z-index:99999;border-radius:2px;animation:ia-conf-fall 1s ease forwards;}@keyframes ia-conf-fall{to{transform:translateY(100vh) rotate(720deg);opacity:0;}}</style>',
    js: '<script id="ia-fx-confetti-js">(function(){var COLORS=["#3b82f6","#f97316","#22c55e","#f43f5e","#818cf8","#fbbf24"];function burst(x,y){for(var i=0;i<30;i++){var el=document.createElement("div");el.className="ia-conf";el.style.cssText="left:"+(x+Math.random()*80-40)+"px;top:"+(y-20)+"px;width:"+(6+Math.random()*8)+"px;height:"+(6+Math.random()*8)+"px;background:"+COLORS[Math.floor(Math.random()*COLORS.length)]+";animation-delay:"+(Math.random()*0.3)+"s;animation-duration:"+(0.8+Math.random()*0.6)+"s;";document.body.appendChild(el);setTimeout(function(){el.remove();},1500);}}document.querySelectorAll("button,.btn").forEach(function(btn){btn.addEventListener("click",function(e){burst(e.clientX,e.clientY);});});})();<\/script>'
  },
  {
    id: 'cursor', icon: '🖱️', name: 'Custom Cursor Trail',
    desc: 'Glowing cursor trail follows the mouse',
    css: '<style id="ia-fx-cursor">.ia-cursor-dot{position:fixed;pointer-events:none;width:8px;height:8px;border-radius:50%;background:#3b82f6;transform:translate(-50%,-50%);z-index:99999;transition:transform .1s;mix-blend-mode:screen;}.ia-cursor-ring{position:fixed;pointer-events:none;width:32px;height:32px;border-radius:50%;border:2px solid #3b82f666;transform:translate(-50%,-50%);z-index:99998;transition:left .1s ease,top .1s ease;}</style>',
    js: '<script id="ia-fx-cursor-js">(function(){var dot=document.createElement("div");dot.className="ia-cursor-dot";var ring=document.createElement("div");ring.className="ia-cursor-ring";document.body.appendChild(dot);document.body.appendChild(ring);document.addEventListener("mousemove",function(e){dot.style.left=e.clientX+"px";dot.style.top=e.clientY+"px";ring.style.left=e.clientX+"px";ring.style.top=e.clientY+"px";});})();<\/script>'
  },
  {
    id: 'scroll-progress', icon: '📜', name: 'Scroll Progress Bar',
    desc: 'Thin progress bar at top showing scroll position',
    css: '<style id="ia-fx-scrollprog">#ia-scroll-prog{position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#3b82f6,#8b5cf6,#ec4899);width:0%;z-index:99999;transition:width .1s;}</style>',
    js: '<script id="ia-fx-scrollprog-js">(function(){var bar=document.createElement("div");bar.id="ia-scroll-prog";document.body.appendChild(bar);window.addEventListener("scroll",function(){var pct=(document.documentElement.scrollTop/(document.documentElement.scrollHeight-window.innerHeight))*100;bar.style.width=pct+"%";});})();<\/script>'
  },
  {
    id: 'smooth-scroll', icon: '🌊', name: 'Smooth Scroll Links',
    desc: 'All anchor links scroll smoothly',
    css: '<style id="ia-fx-smooth">html{scroll-behavior:smooth!important;}</style>',
    js: '<script id="ia-fx-smooth-js">/* smooth scroll is CSS-only */<\/script>'
  }
];

function removeAllFX(statusEl) {
  if (!window.editor) return;
  var code = window.editor.getValue();
  FX.forEach(function (fx) {
    code = code.replace(new RegExp('<style id="ia-fx-' + fx.id + '">[\\s\\S]*?<\\/style>', 'g'), '');
    code = code.replace(new RegExp('<script id="ia-fx-' + fx.id + '-js">[\\s\\S]*?<\\/script>', 'g'), '');
  });
  window.editor.setValue(code);
  if (window.runPreview) window.runPreview();
  if (statusEl) statusEl.textContent = t('removed');
}

function injectFX(fx, statusEl) {
  if (!window.editor) return;
  var code = window.editor.getValue();
  /* Remove previous instance */
  code = code.replace(new RegExp('<style id="ia-fx-' + fx.id + '">[\\s\\S]*?<\\/style>', 'g'), '');
  code = code.replace(new RegExp('<script id="ia-fx-' + fx.id + '-js">[\\s\\S]*?<\\/script>', 'g'), '');
  /* Inject CSS in head */
  if (code.indexOf('</head>') !== -1) {
    code = code.replace('</head>', fx.css + '\n</head>');
  } else { code = fx.css + '\n' + code; }
  /* Inject JS before /body */
  if (code.indexOf('</body>') !== -1) {
    code = code.replace('</body>', fx.js + '\n</body>');
  } else { code += '\n' + fx.js; }
  window.editor.setValue(code);
  if (window.runPreview) window.runPreview();
  if (statusEl) statusEl.textContent = t('injected') + fx.name;
}

function renderMicroTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';
  var hdr = document.createElement('div');
  hdr.style.cssText = 'padding:12px 14px 8px;border-bottom:1px solid rgba(251,146,60,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#fb923c;">' + t('title') + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);
  var body = document.createElement('div');
  body.style.cssText = 'flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:7px;';

  var desc = document.createElement('div');
  desc.style.cssText = 'font-size:10px;color:#94a3b8;line-height:1.4;margin-bottom:4px;';
  desc.textContent = t('desc');
  body.appendChild(desc);

  var statusEl = document.createElement('div');
  statusEl.style.cssText = 'font-size:11px;color:#4ade80;min-height:14px;text-align:center;';
  body.appendChild(statusEl);

  FX.forEach(function (fx) {
    var card = document.createElement('div');
    card.style.cssText = 'background:#1e293b;border:1px solid #334155;border-radius:8px;padding:9px 11px;display:flex;align-items:center;gap:10px;transition:border-color .15s;';
    card.onmouseenter = function () { card.style.borderColor = '#fb923c'; };
    card.onmouseleave = function () { card.style.borderColor = '#334155'; };

    var iconEl = document.createElement('div');
    iconEl.style.cssText = 'font-size:20px;flex-shrink:0;';
    iconEl.textContent = fx.icon;

    var info = document.createElement('div');
    info.style.cssText = 'flex:1;min-width:0;';
    var nm = document.createElement('div');
    nm.style.cssText = 'font-size:11px;font-weight:700;color:#fb923c;margin-bottom:2px;';
    nm.textContent = fx.name;
    var ds = document.createElement('div');
    ds.style.cssText = 'font-size:9px;color:#64748b;line-height:1.3;';
    ds.textContent = fx.desc;
    info.appendChild(nm);
    info.appendChild(ds);

    var btn = document.createElement('button');
    btn.textContent = t('inject');
    btn.style.cssText = 'background:rgba(251,146,60,0.15);border:1px solid rgba(251,146,60,0.4);border-radius:6px;padding:5px 9px;color:#fb923c;font-size:9px;font-weight:700;cursor:pointer;flex-shrink:0;white-space:nowrap;';
    btn.onclick = (function (f) { return function () { injectFX(f, statusEl); }; })(fx);

    card.appendChild(iconEl);
    card.appendChild(info);
    card.appendChild(btn);
    body.appendChild(card);
  });

  var remBtn = document.createElement('button');
  remBtn.textContent = t('remove');
  remBtn.style.cssText = 'width:100%;background:rgba(100,116,139,0.15);border:1px solid rgba(100,116,139,0.3);border-radius:6px;padding:8px;color:#94a3b8;font-weight:700;font-size:10px;cursor:pointer;margin-top:4px;flex-shrink:0;';
  remBtn.onclick = function () { removeAllFX(statusEl); };
  body.appendChild(remBtn);

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function () {
  var oAL = window.applyLang;
  window.applyLang = function () {
    if (typeof oAL === 'function') oAL();
    var el = document.getElementById('lbl-tab-microfx');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'microfx') renderMicroTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'microfx') {
      window.activeTab = 'microfx';
      document.querySelectorAll('.ltab').forEach(function (b) { b.classList.remove('active'); });
      var btn = document.getElementById('tab-microfx');
      if (btn) btn.classList.add('active');
      renderMicroTab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
