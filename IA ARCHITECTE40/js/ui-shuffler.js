/**
 * UI Shuffler v1.0 — EN/FR
 * Generates random UI layouts for creative inspiration.
 */
(function () {
'use strict';
var TX = {
  en: {
    tab: 'UI Shuffler', title: '🔀 UI Shuffler', sub: 'Random UI inspiration generator',
    desc: 'Stuck on a blank page? Click Shuffle to generate a random, beautiful UI layout. Keep shuffling until you find one you love.',
    shuffle: '🎲 Shuffle!', use: '✅ Use This Layout',
    used: '✅ Layout loaded in editor!'
  },
  fr: {
    tab: 'UI Shuffler', title: '🔀 UI Shuffler', sub: 'Generateur d inspiration UI aleatoire',
    desc: 'Bloque sur une page blanche ? Cliquez sur Melanger pour generer une interface aleatoire et belle. Continuez jusqu a trouver celle que vous aimez.',
    shuffle: '🎲 Melanger !', use: '✅ Utiliser ce Layout',
    used: '✅ Layout charge dans l editeur !'
  }
};
function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var PALETTES = [
  { bg: '#0f172a', accent: '#3b82f6', text: '#f1f5f9', card: '#1e293b' },
  { bg: '#1c1917', accent: '#f97316', text: '#fef3c7', card: '#292524' },
  { bg: '#052e16', accent: '#22c55e', text: '#dcfce7', card: '#14532d' },
  { bg: '#1e1b4b', accent: '#818cf8', text: '#e0e7ff', card: '#312e81' },
  { bg: '#1c0a0a', accent: '#f43f5e', text: '#ffe4e6', card: '#3f0d0d' },
  { bg: '#0a0a0f', accent: '#00ffcc', text: '#ccffee', card: '#0d0d1a' },
  { bg: '#1a0a2e', accent: '#c084fc', text: '#f3e8ff', card: '#2d1b4e' },
  { bg: '#f8fafc', accent: '#0ea5e9', text: '#0f172a', card: '#ffffff' }
];

var HEROES = [
  function(p){ return '<section style="min-height:90vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:60px 5%;background:' + p.bg + ';"><h1 style="font-size:clamp(2.5rem,7vw,5rem);font-weight:900;color:' + p.text + ';margin-bottom:20px;line-height:1.1;">Build Something<br><span style="color:' + p.accent + ';">Amazing</span></h1><p style="font-size:1.2rem;color:' + p.text + ';opacity:.7;max-width:520px;margin-bottom:36px;line-height:1.7;">Create stunning experiences that your users will love. Start today.</p><a href="#" style="background:' + p.accent + ';color:' + p.bg + ';padding:16px 40px;border-radius:50px;text-decoration:none;font-weight:800;font-size:1rem;display:inline-block;">Get Started →</a></section>'; },
  function(p){ return '<section style="min-height:90vh;display:grid;grid-template-columns:1fr 1fr;align-items:center;padding:0 5%;gap:40px;background:' + p.bg + ';"><div><h1 style="font-size:clamp(2rem,5vw,4rem);font-weight:900;color:' + p.text + ';margin-bottom:16px;">Your Vision,<br>Our Code.</h1><p style="color:' + p.text + ';opacity:.7;margin-bottom:28px;line-height:1.7;font-size:1.05rem;">Professional solutions built for the modern web. Fast, beautiful, reliable.</p><a href="#" style="background:' + p.accent + ';color:' + p.bg + ';padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">Start Free Trial</a></div><div style="background:' + p.card + ';border-radius:20px;height:320px;display:flex;align-items:center;justify-content:center;font-size:4rem;border:1px solid ' + p.accent + '33;">✦</div></section>'; },
  function(p){ return '<section style="min-height:90vh;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;padding:80px 5%;background:linear-gradient(135deg,' + p.bg + ' 60%,' + p.accent + '22 100%);"><span style="color:' + p.accent + ';font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin-bottom:16px;display:block;">Welcome to the future</span><h1 style="font-size:clamp(2.5rem,6vw,5rem);font-weight:900;color:' + p.text + ';margin-bottom:20px;line-height:1.05;max-width:700px;">Next-Generation<br>Digital Experiences</h1><p style="color:' + p.text + ';opacity:.7;max-width:480px;line-height:1.7;margin-bottom:36px;">We craft pixel-perfect interfaces that drive growth and delight users worldwide.</p><div style="display:flex;gap:12px;"><a href="#" style="background:' + p.accent + ';color:' + p.bg + ';padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">Get Started</a><a href="#" style="border:1px solid ' + p.accent + '55;color:' + p.text + ';padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;opacity:.8;">Learn More</a></div></section>'; }
];

var SECTIONS = [
  function(p){ return '<section style="padding:80px 5%;background:' + p.card + ';"><h2 style="text-align:center;font-size:2rem;font-weight:900;color:' + p.text + ';margin-bottom:12px;">Our Services</h2><div style="width:48px;height:3px;background:' + p.accent + ';margin:0 auto 40px;border-radius:2px;"></div><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px;">' + ['⚡ Fast','🎨 Beautiful','🔒 Secure'].map(function(s){ return '<div style="background:' + p.bg + ';border:1px solid ' + p.accent + '22;border-radius:14px;padding:28px;"><div style="font-size:2rem;margin-bottom:12px;">' + s.split(' ')[0] + '</div><h3 style="color:' + p.accent + ';margin-bottom:8px;">' + s.split(' ')[1] + '</h3><p style="color:' + p.text + ';opacity:.6;font-size:.9rem;line-height:1.5;">World-class quality built for real users.</p></div>'; }).join('') + '</div></section>'; },
  function(p){ return '<section style="padding:80px 5%;background:' + p.bg + ';"><h2 style="text-align:center;font-size:2rem;font-weight:900;color:' + p.text + ';margin-bottom:40px;">Why Choose Us</h2><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;">' + [['🚀','Speed','Blazing fast load times'],['💎','Quality','Premium pixel-perfect design'],['🌍','Global','Serving users worldwide'],['🛡️','Secure','Enterprise-grade protection']].map(function(f){ return '<div style="text-align:center;padding:24px;border-radius:12px;background:' + p.card + ';border:1px solid ' + p.accent + '22;"><div style="font-size:2rem;margin-bottom:10px;">' + f[0] + '</div><h3 style="color:' + p.accent + ';margin-bottom:6px;font-size:1rem;">' + f[1] + '</h3><p style="color:' + p.text + ';opacity:.6;font-size:.85rem;">' + f[2] + '</p></div>'; }).join('') + '</div></section>'; }
];

var FOOTERS = [
  function(p){ return '<footer style="padding:40px 5%;background:' + p.card + ';text-align:center;border-top:1px solid ' + p.accent + '22;"><p style="color:' + p.text + ';opacity:.5;font-size:.85rem;">© 2025 MyApp — Built with IA Architecte</p></footer>'; }
];

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function generateLayout() {
  var p = pick(PALETTES);
  var hero = pick(HEROES)(p);
  var section = pick(SECTIONS)(p);
  var footer = pick(FOOTERS)(p);
  var nav = '<nav style="display:flex;justify-content:space-between;align-items:center;padding:18px 5%;position:sticky;top:0;background:' + p.bg + 'ee;backdrop-filter:blur(10px);border-bottom:1px solid ' + p.accent + '22;z-index:100;"><div style="font-weight:900;font-size:20px;color:' + p.accent + ';">Brand</div><div style="display:flex;gap:20px;"><a href="#" style="color:' + p.text + ';text-decoration:none;font-size:14px;opacity:.8;">Home</a><a href="#" style="color:' + p.text + ';text-decoration:none;font-size:14px;opacity:.8;">Services</a><a href="#" style="color:' + p.text + ';text-decoration:none;font-size:14px;opacity:.8;">Contact</a></div><a href="#" style="background:' + p.accent + ';color:' + p.bg + ';padding:8px 20px;border-radius:6px;text-decoration:none;font-weight:700;font-size:13px;">Start Free</a></nav>';

  return '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<title>My App</title>\n<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">\n<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Inter,sans-serif;background:' + p.bg + ';color:' + p.text + ';}a{transition:opacity .2s;}a:hover{opacity:.8;}</style>\n</head>\n<body>\n' + nav + '\n' + hero + '\n' + section + '\n' + footer + '\n</body>\n</html>';
}

var lastLayout = '';

function renderShufflerTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style.cssText = 'padding:12px 14px 8px;border-bottom:1px solid rgba(168,85,247,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#c084fc;">' + t('title') + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style.cssText = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';

  var desc = document.createElement('div');
  desc.style.cssText = 'font-size:10px;color:#94a3b8;line-height:1.5;';
  desc.textContent = t('desc');
  body.appendChild(desc);

  /* Mini preview iframe */
  var iframeWrap = document.createElement('div');
  iframeWrap.style.cssText = 'background:#1e293b;border:1px solid #334155;border-radius:10px;overflow:hidden;height:180px;position:relative;';
  var iframe = document.createElement('iframe');
  iframe.style.cssText = 'width:200%;height:200%;border:none;transform:scale(0.5);transform-origin:top left;';
  iframe.title = 'UI Preview';
  iframeWrap.appendChild(iframe);
  body.appendChild(iframeWrap);

  var statusEl = document.createElement('div');
  statusEl.style.cssText = 'font-size:11px;color:#4ade80;min-height:14px;text-align:center;';
  body.appendChild(statusEl);

  function doShuffle() {
    lastLayout = generateLayout();
    iframe.srcdoc = lastLayout;
    statusEl.textContent = '';
  }
  doShuffle();

  var btnRow = document.createElement('div');
  btnRow.style.cssText = 'display:flex;gap:8px;';

  var shuffleBtn = document.createElement('button');
  shuffleBtn.textContent = t('shuffle');
  shuffleBtn.style.cssText = 'flex:1;background:linear-gradient(135deg,#7c3aed,#db2777);border:none;border-radius:8px;padding:11px;color:#fff;font-weight:900;font-size:12px;cursor:pointer;transition:opacity .15s;';
  shuffleBtn.onmouseenter = function(){ shuffleBtn.style.opacity='0.85'; };
  shuffleBtn.onmouseleave = function(){ shuffleBtn.style.opacity='1'; };
  shuffleBtn.onclick = doShuffle;
  btnRow.appendChild(shuffleBtn);

  var useBtn = document.createElement('button');
  useBtn.textContent = t('use');
  useBtn.style.cssText = 'flex:1;background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.4);border-radius:8px;padding:11px;color:#34d399;font-weight:900;font-size:11px;cursor:pointer;';
  useBtn.onclick = function(){
    if (!lastLayout || !window.editor) return;
    window.editor.setValue(lastLayout);
    if (window.runPreview) window.runPreview();
    if (window.showToast) window.showToast(t('used'));
    statusEl.textContent = t('used');
  };
  btnRow.appendChild(useBtn);

  body.appendChild(btnRow);
  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function () {
  var oAL = window.applyLang;
  window.applyLang = function () {
    if (typeof oAL === 'function') oAL();
    var el = document.getElementById('lbl-tab-uishuffler');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'uishuffler') renderShufflerTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'uishuffler') {
      window.activeTab = 'uishuffler';
      document.querySelectorAll('.ltab').forEach(function (b) { b.classList.remove('active'); });
      var btn = document.getElementById('tab-uishuffler');
      if (btn) btn.classList.add('active');
      renderShufflerTab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
