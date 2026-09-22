/**
 * Scroll Animation Injector v1.0 — EN/FR
 */
(function () {
'use strict';
var TX = {
  en: {
    tab: 'Scroll FX', title: '🌊 Scroll Animations', sub: 'Elements appear as you scroll',
    desc: 'Injects scroll-triggered animations on all sections. Elements fade/slide in when visible.',
    fadeUp: '⬆️ Fade Up', fadeUpD: 'Elements rise and fade in from below.',
    fadeIn: '✨ Fade In', fadeInD: 'Elements gently appear from transparent.',
    slideLeft: '⬅️ Slide Left', slideLeftD: 'Elements slide in from the right.',
    inject: '➕ Inject Animation',
    remove: '✖ Remove',
    injected: '✅ Scroll animations injected!',
    removed: '✖ Animations removed.'
  },
  fr: {
    tab: 'Scroll FX', title: '🌊 Animations au Scroll', sub: 'Elements apparaissent au defilement',
    desc: 'Injecte des animations declenchees au scroll sur toutes les sections.',
    fadeUp: '⬆️ Fade Up', fadeUpD: 'Les elements montent et apparaissent.',
    fadeIn: '✨ Fade In', fadeInD: 'Les elements apparaissent en fondu.',
    slideLeft: '⬅️ Slide Left', slideLeftD: 'Les elements glissent depuis la droite.',
    inject: '➕ Injecter',
    remove: '✖ Supprimer',
    injected: '✅ Animations injectees !',
    removed: '✖ Animations supprimees.'
  }
};
function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var STYLE_ID = 'ia-scroll-fx';

var PRESETS = {
  fadeUp: [
    '<style id="' + STYLE_ID + '">',
    '.ia-reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease, transform 0.7s ease; }',
    '.ia-reveal.ia-visible { opacity: 1; transform: translateY(0); }',
    '</style>',
    '<script id="' + STYLE_ID + '-js">',
    '(function(){',
    '  var els = document.querySelectorAll("section, .card, article, .hero, h2, .grid > *");',
    '  els.forEach(function(el){ el.classList.add("ia-reveal"); });',
    '  var obs = new IntersectionObserver(function(entries){',
    '    entries.forEach(function(e){ if(e.isIntersecting) e.target.classList.add("ia-visible"); });',
    '  }, { threshold: 0.15 });',
    '  els.forEach(function(el){ obs.observe(el); });',
    '})();',
    '</script>'
  ].join('\n'),
  fadeIn: [
    '<style id="' + STYLE_ID + '">',
    '.ia-reveal { opacity: 0; transition: opacity 0.9s ease; }',
    '.ia-reveal.ia-visible { opacity: 1; }',
    '</style>',
    '<script id="' + STYLE_ID + '-js">',
    '(function(){',
    '  var els = document.querySelectorAll("section, .card, article, h2, h3, p, img");',
    '  els.forEach(function(el){ el.classList.add("ia-reveal"); });',
    '  var obs = new IntersectionObserver(function(entries){',
    '    entries.forEach(function(e){ if(e.isIntersecting) e.target.classList.add("ia-visible"); });',
    '  }, { threshold: 0.1 });',
    '  els.forEach(function(el){ obs.observe(el); });',
    '})();',
    '</script>'
  ].join('\n'),
  slideLeft: [
    '<style id="' + STYLE_ID + '">',
    '.ia-reveal { opacity: 0; transform: translateX(60px); transition: opacity 0.6s ease, transform 0.6s ease; }',
    '.ia-reveal.ia-visible { opacity: 1; transform: translateX(0); }',
    '</style>',
    '<script id="' + STYLE_ID + '-js">',
    '(function(){',
    '  var els = document.querySelectorAll("section, .card, article, .hero, h2");',
    '  els.forEach(function(el){ el.classList.add("ia-reveal"); });',
    '  var obs = new IntersectionObserver(function(entries){',
    '    entries.forEach(function(e){ if(e.isIntersecting) e.target.classList.add("ia-visible"); });',
    '  }, { threshold: 0.15 });',
    '  els.forEach(function(el){ obs.observe(el); });',
    '})();',
    '</script>'
  ].join('\n')
};

function removeScrollFX() {
  if (!window.editor) return;
  var code = window.editor.getValue();
  code = code.replace(/<style id="ia-scroll-fx">[\s\S]*?<\/style>/g, '');
  code = code.replace(/<script id="ia-scroll-fx-js">[\s\S]*?<\/script>/g, '');
  window.editor.setValue(code);
  if (window.runPreview) window.runPreview();
}

function injectScrollFX(id, statusEl) {
  if (!window.editor) return;
  removeScrollFX();
  var code = window.editor.getValue();
  var snippet = PRESETS[id];
  if (code.indexOf('</body>') !== -1) {
    code = code.replace('</body>', '\n' + snippet + '\n</body>');
  } else { code += '\n' + snippet; }
  window.editor.setValue(code);
  if (window.runPreview) window.runPreview();
  if (statusEl) statusEl.textContent = t('injected');
}

function renderScrollTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';
  var hdr = document.createElement('div');
  hdr.style.cssText = 'padding:12px 14px 8px;border-bottom:1px solid rgba(56,189,248,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#38bdf8;">' + t('title') + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);
  var body = document.createElement('div');
  body.style.cssText = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';
  var desc = document.createElement('div');
  desc.style.cssText = 'font-size:10px;color:#94a3b8;line-height:1.5;';
  desc.textContent = t('desc');
  body.appendChild(desc);
  var statusEl = document.createElement('div');
  statusEl.style.cssText = 'font-size:11px;color:#4ade80;min-height:14px;text-align:center;';
  body.appendChild(statusEl);

  [['fadeUp','⬆️','fadeUp','fadeUpD'],['fadeIn','✨','fadeIn','fadeInD'],['slideLeft','⬅️','slideLeft','slideLeftD']].forEach(function(item){
    var sec = document.createElement('div');
    sec.style.cssText = 'background:rgba(56,189,248,0.05);border:1px solid rgba(56,189,248,0.15);border-radius:8px;padding:10px;';
    var h = document.createElement('div');
    h.style.cssText = 'font-size:12px;font-weight:700;color:#38bdf8;margin-bottom:4px;';
    h.textContent = t(item[2]);
    sec.appendChild(h);
    var d = document.createElement('div');
    d.style.cssText = 'font-size:10px;color:#94a3b8;margin-bottom:8px;';
    d.textContent = t(item[3]);
    sec.appendChild(d);
    var btn = document.createElement('button');
    btn.textContent = t('inject');
    btn.style.cssText = 'width:100%;background:rgba(56,189,248,0.2);border:1px solid rgba(56,189,248,0.4);border-radius:6px;padding:8px;color:#fff;font-weight:700;font-size:10px;cursor:pointer;';
    btn.onclick = (function(id){ return function(){ injectScrollFX(id, statusEl); }; })(item[0]);
    sec.appendChild(btn);
    body.appendChild(sec);
  });

  var remBtn = document.createElement('button');
  remBtn.textContent = t('remove');
  remBtn.style.cssText = 'width:100%;background:rgba(100,116,139,0.15);border:1px solid rgba(100,116,139,0.3);border-radius:6px;padding:8px;color:#94a3b8;font-weight:700;font-size:10px;cursor:pointer;';
  remBtn.onclick = function(){ removeScrollFX(); statusEl.textContent = t('removed'); };
  body.appendChild(remBtn);
  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function () {
  var oAL = window.applyLang;
  window.applyLang = function () {
    if (typeof oAL === 'function') oAL();
    var el = document.getElementById('lbl-tab-scrollfx');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'scrollfx') renderScrollTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'scrollfx') {
      window.activeTab = 'scrollfx';
      document.querySelectorAll('.ltab').forEach(function (b) { b.classList.remove('active'); });
      var btn = document.getElementById('tab-scrollfx');
      if (btn) btn.classList.add('active');
      renderScrollTab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
