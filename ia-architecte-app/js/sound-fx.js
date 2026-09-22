/**
 * UI Sound FX v1.0 — EN/FR
 * Uses Web Audio API — no external files needed.
 */
(function () {
'use strict';
var TX = {
  en: {
    tab: 'Sound FX', title: '🎵 UI Sound FX', sub: 'Inject Web Audio sounds into your app',
    desc: 'Adds subtle UI sounds using Web Audio API. No external files — all synthesized in code!',
    inject: '➕ Inject Sounds', remove: '✖ Remove', injected: '✅ Sounds injected!', removed: '✖ Removed.',
    preview: '▶ Preview'
  },
  fr: {
    tab: 'Son FX', title: '🎵 Sons d Interface', sub: 'Injectez des sons Web Audio dans votre app',
    desc: 'Ajoute des sons subtils d interface en utilisant l API Web Audio. Aucun fichier externe !',
    inject: '➕ Injecter les Sons', remove: '✖ Supprimer', injected: '✅ Sons injectes !', removed: '✖ Supprimes.',
    preview: '▶ Apercu'
  }
};
function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var FX_LIST = [
  {
    id: 'click', icon: '🖱️', name: 'Button Click', desc: 'Soft click on button press',
    code: 'document.querySelectorAll("button,a,.btn").forEach(function(el){el.addEventListener("click",function(){var ac=new(window.AudioContext||window.webkitAudioContext)();var o=ac.createOscillator();var g=ac.createGain();o.connect(g);g.connect(ac.destination);o.type="sine";o.frequency.setValueAtTime(800,ac.currentTime);o.frequency.exponentialRampToValueAtTime(400,ac.currentTime+0.1);g.gain.setValueAtTime(0.3,ac.currentTime);g.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+0.1);o.start();o.stop(ac.currentTime+0.1);});});',
    preview: function() { var ac=new(window.AudioContext||window.webkitAudioContext)();var o=ac.createOscillator();var g=ac.createGain();o.connect(g);g.connect(ac.destination);o.type='sine';o.frequency.setValueAtTime(800,ac.currentTime);o.frequency.exponentialRampToValueAtTime(400,ac.currentTime+0.1);g.gain.setValueAtTime(0.3,ac.currentTime);g.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+0.1);o.start();o.stop(ac.currentTime+0.1); }
  },
  {
    id: 'success', icon: '✅', name: 'Success Chime', desc: 'Happy chime on form submit',
    code: 'document.querySelectorAll("form").forEach(function(f){f.addEventListener("submit",function(){var ac=new(window.AudioContext||window.webkitAudioContext)();[523,659,784].forEach(function(freq,i){var o=ac.createOscillator();var g=ac.createGain();o.connect(g);g.connect(ac.destination);o.type="sine";o.frequency.value=freq;g.gain.setValueAtTime(0.2,ac.currentTime+i*0.15);g.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+i*0.15+0.3);o.start(ac.currentTime+i*0.15);o.stop(ac.currentTime+i*0.15+0.3);});});});',
    preview: function() { var ac=new(window.AudioContext||window.webkitAudioContext)();[523,659,784].forEach(function(freq,i){var o=ac.createOscillator();var g=ac.createGain();o.connect(g);g.connect(ac.destination);o.type='sine';o.frequency.value=freq;g.gain.setValueAtTime(0.2,ac.currentTime+i*0.15);g.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+i*0.15+0.3);o.start(ac.currentTime+i*0.15);o.stop(ac.currentTime+i*0.15+0.3);}); }
  },
  {
    id: 'error', icon: '❌', name: 'Error Buzz', desc: 'Low buzz on validation error',
    code: 'document.querySelectorAll("input,textarea").forEach(function(el){el.addEventListener("invalid",function(){var ac=new(window.AudioContext||window.webkitAudioContext)();var o=ac.createOscillator();var g=ac.createGain();o.connect(g);g.connect(ac.destination);o.type="sawtooth";o.frequency.value=150;g.gain.setValueAtTime(0.3,ac.currentTime);g.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+0.3);o.start();o.stop(ac.currentTime+0.3);});});',
    preview: function() { var ac=new(window.AudioContext||window.webkitAudioContext)();var o=ac.createOscillator();var g=ac.createGain();o.connect(g);g.connect(ac.destination);o.type='sawtooth';o.frequency.value=150;g.gain.setValueAtTime(0.3,ac.currentTime);g.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+0.3);o.start();o.stop(ac.currentTime+0.3); }
  },
  {
    id: 'hover', icon: '🔔', name: 'Hover Tick', desc: 'Subtle tick on button hover',
    code: 'document.querySelectorAll("button,a,.btn").forEach(function(el){el.addEventListener("mouseenter",function(){var ac=new(window.AudioContext||window.webkitAudioContext)();var o=ac.createOscillator();var g=ac.createGain();o.connect(g);g.connect(ac.destination);o.type="sine";o.frequency.value=1200;g.gain.setValueAtTime(0.05,ac.currentTime);g.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+0.05);o.start();o.stop(ac.currentTime+0.05);});});',
    preview: function() { var ac=new(window.AudioContext||window.webkitAudioContext)();var o=ac.createOscillator();var g=ac.createGain();o.connect(g);g.connect(ac.destination);o.type='sine';o.frequency.value=1200;g.gain.setValueAtTime(0.05,ac.currentTime);g.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+0.05);o.start();o.stop(ac.currentTime+0.05); }
  },
  {
    id: 'notify', icon: '📬', name: 'Notification', desc: 'Two-tone notification sound',
    code: 'window.iaPlayNotify=function(){var ac=new(window.AudioContext||window.webkitAudioContext)();[880,1100].forEach(function(freq,i){var o=ac.createOscillator();var g=ac.createGain();o.connect(g);g.connect(ac.destination);o.type="sine";o.frequency.value=freq;g.gain.setValueAtTime(0.2,ac.currentTime+i*0.12);g.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+i*0.12+0.2);o.start(ac.currentTime+i*0.12);o.stop(ac.currentTime+i*0.12+0.2);});};',
    preview: function() { var ac=new(window.AudioContext||window.webkitAudioContext)();[880,1100].forEach(function(freq,i){var o=ac.createOscillator();var g=ac.createGain();o.connect(g);g.connect(ac.destination);o.type='sine';o.frequency.value=freq;g.gain.setValueAtTime(0.2,ac.currentTime+i*0.12);g.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+i*0.12+0.2);o.start(ac.currentTime+i*0.12);o.stop(ac.currentTime+i*0.12+0.2);}); }
  }
];

function injectSound(fx, statusEl) {
  if (!window.editor) return;
  var code = window.editor.getValue();
  code = code.replace(new RegExp('<script id="ia-sfx-' + fx.id + '">[\\s\\S]*?<\\/script>', 'g'), '');
  var snippet = '<script id="ia-sfx-' + fx.id + '">(function(){' + fx.code + '})();<\/script>';
  if (code.indexOf('</body>') !== -1) code = code.replace('</body>', snippet + '\n</body>');
  else code += '\n' + snippet;
  window.editor.setValue(code);
  if (window.runPreview) window.runPreview();
  if (statusEl) statusEl.textContent = t('injected') + ' — ' + fx.name;
}

function removeSounds(statusEl) {
  if (!window.editor) return;
  var code = window.editor.getValue();
  FX_LIST.forEach(function(fx){
    code = code.replace(new RegExp('<script id="ia-sfx-' + fx.id + '">[\\s\\S]*?<\\/script>', 'g'), '');
  });
  window.editor.setValue(code);
  if (window.runPreview) window.runPreview();
  if (statusEl) statusEl.textContent = t('removed');
}

function renderSoundTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';
  var hdr = document.createElement('div');
  hdr.style.cssText = 'padding:12px 14px 8px;border-bottom:1px solid rgba(99,102,241,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#818cf8;">' + t('title') + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);
  var body = document.createElement('div');
  body.style.cssText = 'flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:7px;';
  var desc = document.createElement('div');
  desc.style.cssText = 'font-size:10px;color:#94a3b8;line-height:1.5;margin-bottom:2px;';
  desc.textContent = t('desc');
  body.appendChild(desc);
  var statusEl = document.createElement('div');
  statusEl.style.cssText = 'font-size:11px;color:#4ade80;min-height:14px;text-align:center;';
  body.appendChild(statusEl);

  FX_LIST.forEach(function(fx){
    var card = document.createElement('div');
    card.style.cssText = 'background:#1e293b;border:1px solid #334155;border-radius:8px;padding:9px 11px;display:flex;align-items:center;gap:10px;';
    var icon = document.createElement('div');
    icon.style.cssText = 'font-size:20px;flex-shrink:0;';
    icon.textContent = fx.icon;
    var info = document.createElement('div');
    info.style.cssText = 'flex:1;min-width:0;';
    var nm = document.createElement('div');
    nm.style.cssText = 'font-size:11px;font-weight:700;color:#818cf8;margin-bottom:2px;';
    nm.textContent = fx.name;
    var ds = document.createElement('div');
    ds.style.cssText = 'font-size:9px;color:#64748b;';
    ds.textContent = fx.desc;
    info.appendChild(nm); info.appendChild(ds);
    var btns = document.createElement('div');
    btns.style.cssText = 'display:flex;gap:5px;flex-shrink:0;';
    var prevBtn = document.createElement('button');
    prevBtn.textContent = t('preview');
    prevBtn.style.cssText = 'background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.3);border-radius:5px;padding:4px 7px;color:#818cf8;font-size:9px;font-weight:700;cursor:pointer;';
    prevBtn.onclick = fx.preview;
    var injBtn = document.createElement('button');
    injBtn.textContent = t('inject');
    injBtn.style.cssText = 'background:rgba(99,102,241,0.2);border:1px solid rgba(99,102,241,0.5);border-radius:5px;padding:4px 7px;color:#fff;font-size:9px;font-weight:700;cursor:pointer;';
    injBtn.onclick = (function(f){ return function(){ injectSound(f, statusEl); }; })(fx);
    btns.appendChild(prevBtn); btns.appendChild(injBtn);
    card.appendChild(icon); card.appendChild(info); card.appendChild(btns);
    body.appendChild(card);
  });

  var remBtn = document.createElement('button');
  remBtn.textContent = t('remove');
  remBtn.style.cssText = 'width:100%;background:rgba(100,116,139,0.15);border:1px solid rgba(100,116,139,0.3);border-radius:6px;padding:8px;color:#94a3b8;font-weight:700;font-size:10px;cursor:pointer;margin-top:4px;';
  remBtn.onclick = function(){ removeSounds(statusEl); };
  body.appendChild(remBtn);
  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function () {
  var oAL = window.applyLang;
  window.applyLang = function () {
    if (typeof oAL === 'function') oAL();
    var el = document.getElementById('lbl-tab-soundfx');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'soundfx') renderSoundTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'soundfx') {
      window.activeTab = 'soundfx';
      document.querySelectorAll('.ltab').forEach(function (b) { b.classList.remove('active'); });
      var btn = document.getElementById('tab-soundfx');
      if (btn) btn.classList.add('active');
      renderSoundTab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
