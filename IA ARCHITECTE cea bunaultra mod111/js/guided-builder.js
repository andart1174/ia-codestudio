/**
 * App Wizard2 v1.0 — Step-by-Step App Builder — EN/FR
 */
(function () {
'use strict';
var TX = {
  en: {
    tab: 'Guided Builder', title: '🧭 Guided App Builder', sub: 'Build your app step by step',
    step: 'Step', of: 'of', next: 'Next →', back: '← Back', build: '🚀 Build My App!',
    done: '✅ App created! Check the editor.',
    q1: 'What is the name of your app?', q1h: 'e.g. My Portfolio, My Shop...',
    q2: 'What type of app?',
    q2a: '🖼️ Portfolio / Showcase', q2b: '🛍️ Online Shop',
    q2c: '📝 Blog / News', q2d: '📇 Business Card',
    q3: 'Choose your color theme:',
    q4: 'Which sections do you need?',
    q4a: '🏠 Hero Banner', q4b: '💼 Services', q4c: '📸 Gallery', q4d: '✉️ Contact Form',
    q5: 'A welcome message for visitors:', q5h: 'e.g. Welcome! I am a designer.'
  },
  fr: {
    tab: 'Constructeur Guide', title: '🧭 Constructeur Guide', sub: 'Construisez votre app etape par etape',
    step: 'Etape', of: 'sur', next: 'Suivant →', back: '← Retour', build: '🚀 Creer mon App !',
    done: '✅ App creee ! Verifiez l editeur.',
    q1: 'Quel est le nom de votre app ?', q1h: 'ex: Mon Portfolio, Ma Boutique...',
    q2: 'Quel type d app ?',
    q2a: '🖼️ Portfolio / Vitrine', q2b: '🛍️ Boutique en ligne',
    q2c: '📝 Blog / Actualites', q2d: '📇 Carte de visite',
    q3: 'Choisissez votre theme de couleurs :',
    q4: 'Quelles sections souhaitez-vous ?',
    q4a: '🏠 Hero / Accueil', q4b: '💼 Services', q4c: '📸 Galerie', q4d: '✉️ Formulaire Contact',
    q5: 'Un message de bienvenue :', q5h: 'ex: Bienvenue ! Je suis designer.'
  }
};
function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var THEMES = [
  { name: 'Ocean Blue',   bg: '#0f172a', accent: '#3b82f6', text: '#f1f5f9' },
  { name: 'Sunset',       bg: '#1c1917', accent: '#f97316', text: '#fef3c7' },
  { name: 'Forest',       bg: '#052e16', accent: '#22c55e', text: '#dcfce7' },
  { name: 'Midnight',     bg: '#1e1b4b', accent: '#818cf8', text: '#e0e7ff' },
  { name: 'Rose Gold',    bg: '#1c0a0a', accent: '#f43f5e', text: '#ffe4e6' },
  { name: 'Arctic',       bg: '#f8fafc', accent: '#0ea5e9', text: '#0f172a' }
];

var state = { step: 0, name: '', type: '', theme: 0, sections: [], message: '' };
var TOTAL = 5;

function buildApp() {
  var s = state;
  var th = THEMES[s.theme] || THEMES[0];
  var secs = '';
  if (s.sections.indexOf('hero') !== -1) {
    secs += '<section class="ia-hero"><h1>' + (s.name || 'My App') + '</h1><p>' + (s.message || 'Welcome!') + '</p><a href="#contact" class="ia-btn">Get Started</a></section>\n';
  }
  if (s.sections.indexOf('services') !== -1) {
    secs += '<section class="ia-section"><h2>Services</h2><div class="ia-grid"><div class="ia-card"><div class="ia-icon">⚡</div><h3>Fast</h3><p>Lightning fast performance.</p></div><div class="ia-card"><div class="ia-icon">🎨</div><h3>Beautiful</h3><p>Stunning design that converts.</p></div><div class="ia-card"><div class="ia-icon">🔒</div><h3>Secure</h3><p>Enterprise-grade security.</p></div></div></section>\n';
  }
  if (s.sections.indexOf('gallery') !== -1) {
    secs += '<section class="ia-section"><h2>Gallery</h2><div class="ia-gallery"><div class="ia-gitem">Project 1</div><div class="ia-gitem">Project 2</div><div class="ia-gitem">Project 3</div><div class="ia-gitem">Project 4</div></div></section>\n';
  }
  if (s.sections.indexOf('contact') !== -1) {
    secs += '<section class="ia-section" id="contact"><h2>Contact</h2><form class="ia-form" onsubmit="alert(\'Sent!\');return false;"><input type="text" placeholder="Your name"><input type="email" placeholder="Your email"><textarea placeholder="Message"></textarea><button type="submit">Send</button></form></section>\n';
  }
  if (!secs) secs = '<section class="ia-hero"><h1>' + (s.name || 'My App') + '</h1><p>' + (s.message || 'Welcome!') + '</p></section>\n';

  return '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<title>' + (s.name || 'My App') + '</title>\n<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">\n<style>\n*{margin:0;padding:0;box-sizing:border-box}\nbody{font-family:Inter,sans-serif;background:' + th.bg + ';color:' + th.text + ';}\nnav{display:flex;justify-content:space-between;align-items:center;padding:18px 5%;position:sticky;top:0;background:' + th.bg + 'dd;backdrop-filter:blur(10px);border-bottom:1px solid ' + th.accent + '33;z-index:100;}\n.ia-logo{font-weight:900;font-size:20px;color:' + th.accent + ';}\n.ia-hero{min-height:88vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:60px 5%;}\n.ia-hero h1{font-size:clamp(2rem,6vw,4.5rem);font-weight:900;line-height:1.1;margin-bottom:18px;}\n.ia-hero p{font-size:1.1rem;opacity:.75;max-width:540px;line-height:1.7;margin-bottom:32px;}\n.ia-btn{background:' + th.accent + ';color:' + th.bg + ';padding:14px 32px;border-radius:50px;text-decoration:none;font-weight:700;transition:transform .2s,box-shadow .2s;box-shadow:0 4px 20px ' + th.accent + '55;display:inline-block;}\n.ia-btn:hover{transform:translateY(-2px);}\n.ia-section{padding:70px 5%;}\n.ia-section h2{font-size:1.9rem;font-weight:900;text-align:center;margin-bottom:36px;}\n.ia-section h2::after{content:"";display:block;width:48px;height:3px;background:' + th.accent + ';margin:8px auto 0;border-radius:2px;}\n.ia-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;}\n.ia-card{background:' + th.accent + '11;border:1px solid ' + th.accent + '22;border-radius:14px;padding:24px;transition:transform .2s;}\n.ia-card:hover{transform:translateY(-4px);}\n.ia-icon{font-size:1.8rem;margin-bottom:10px;}\n.ia-card h3{color:' + th.accent + ';font-size:1rem;margin-bottom:6px;}\n.ia-card p{opacity:.7;font-size:.88rem;line-height:1.5;}\n.ia-gallery{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;}\n.ia-gitem{height:160px;border-radius:10px;background:' + th.accent + '22;display:flex;align-items:center;justify-content:center;font-weight:700;}\n.ia-form{max-width:520px;margin:0 auto;display:flex;flex-direction:column;gap:12px;}\n.ia-form input,.ia-form textarea{background:' + th.accent + '11;border:1px solid ' + th.accent + '33;border-radius:8px;padding:12px 16px;color:' + th.text + ';font-size:.9rem;outline:none;font-family:inherit;}\n.ia-form textarea{min-height:100px;resize:vertical;}\n.ia-form button{background:' + th.accent + ';color:' + th.bg + ';border:none;padding:12px;border-radius:8px;font-weight:700;font-size:1rem;cursor:pointer;}\nfooter{text-align:center;padding:24px;opacity:.45;font-size:.82rem;border-top:1px solid ' + th.accent + '22;}\n</style>\n</head>\n<body>\n<nav><div class="ia-logo">' + (s.name || 'App') + '</div></nav>\n' + secs + '<footer>© 2025 ' + (s.name || 'My App') + ' — Built with IA Architecte</footer>\n</body>\n</html>';
}

function renderWizard() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style.cssText = 'padding:12px 14px 8px;border-bottom:1px solid rgba(99,102,241,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#818cf8;">' + t('title') + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var progWrap = document.createElement('div');
  progWrap.style.cssText = 'padding:8px 14px 4px;flex-shrink:0;';
  var bar = document.createElement('div');
  bar.style.cssText = 'height:3px;background:#1e293b;border-radius:2px;overflow:hidden;';
  var fill = document.createElement('div');
  fill.style.cssText = 'height:100%;background:#818cf8;border-radius:2px;transition:width .35s;width:' + ((state.step / TOTAL) * 100) + '%;';
  bar.appendChild(fill);
  var pLbl = document.createElement('div');
  pLbl.style.cssText = 'font-size:10px;color:#64748b;margin-top:4px;';
  pLbl.textContent = t('step') + ' ' + (state.step + 1) + ' ' + t('of') + ' ' + TOTAL;
  progWrap.appendChild(bar);
  progWrap.appendChild(pLbl);
  wrap.appendChild(progWrap);

  var body = document.createElement('div');
  body.style.cssText = 'flex:1;overflow-y:auto;padding:12px 14px;display:flex;flex-direction:column;gap:10px;';

  function renderStep() {
    body.innerHTML = '';
    fill.style.width = ((state.step / TOTAL) * 100) + '%';
    pLbl.textContent = t('step') + ' ' + (state.step + 1) + ' ' + t('of') + ' ' + TOTAL;

    if (state.step === 0) {
      addLabel(t('q1'));
      var inp = addInput(t('q1h'), state.name);
      inp.oninput = function () { state.name = inp.value; };

    } else if (state.step === 1) {
      addLabel(t('q2'));
      [['portfolio', t('q2a')], ['shop', t('q2b')], ['blog', t('q2c')], ['card', t('q2d')]].forEach(function (item) {
        var btn = document.createElement('button');
        btn.textContent = item[1];
        var sel = state.type === item[0];
        btn.style.cssText = 'width:100%;text-align:left;background:' + (sel ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.05)') + ';border:1px solid rgba(99,102,241,' + (sel ? '0.6' : '0.2') + ');border-radius:8px;padding:10px 12px;color:#e2e8f0;font-size:11px;cursor:pointer;margin-bottom:6px;transition:all .15s;';
        btn.onclick = function () { state.type = item[0]; renderStep(); };
        body.appendChild(btn);
      });

    } else if (state.step === 2) {
      addLabel(t('q3'));
      var g = document.createElement('div');
      g.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:8px;';
      THEMES.forEach(function (th, i) {
        var c = document.createElement('div');
        c.style.cssText = 'border-radius:8px;overflow:hidden;cursor:pointer;border:2px solid ' + (state.theme === i ? '#818cf8' : 'transparent') + ';transition:border .15s;';
        c.innerHTML = '<div style="height:36px;background:' + th.bg + ';display:flex;align-items:center;justify-content:center;gap:5px;"><div style="width:14px;height:14px;border-radius:50%;background:' + th.accent + ';"></div><div style="width:8px;height:8px;border-radius:50%;background:' + th.text + ';opacity:.5;"></div></div><div style="background:#1e293b;padding:3px 6px;font-size:9px;color:#94a3b8;text-align:center;">' + th.name + '</div>';
        c.onclick = function () { state.theme = i; renderStep(); };
        g.appendChild(c);
      });
      body.appendChild(g);

    } else if (state.step === 3) {
      addLabel(t('q4'));
      [['hero', t('q4a')], ['services', t('q4b')], ['gallery', t('q4c')], ['contact', t('q4d')]].forEach(function (item) {
        var lbl = document.createElement('label');
        lbl.style.cssText = 'display:flex;align-items:center;gap:10px;background:rgba(99,102,241,0.05);border:1px solid rgba(99,102,241,0.15);border-radius:8px;padding:9px 12px;cursor:pointer;margin-bottom:6px;color:#e2e8f0;font-size:11px;';
        var chk = document.createElement('input');
        chk.type = 'checkbox';
        chk.checked = state.sections.indexOf(item[0]) !== -1;
        chk.style.cssText = 'accent-color:#818cf8;width:14px;height:14px;cursor:pointer;';
        chk.onchange = function () {
          var idx = state.sections.indexOf(item[0]);
          if (chk.checked && idx === -1) state.sections.push(item[0]);
          else if (!chk.checked && idx !== -1) state.sections.splice(idx, 1);
        };
        lbl.appendChild(chk);
        lbl.appendChild(document.createTextNode(item[1]));
        body.appendChild(lbl);
      });

    } else if (state.step === 4) {
      addLabel(t('q5'));
      var ta = document.createElement('textarea');
      ta.placeholder = t('q5h');
      ta.value = state.message;
      ta.style.cssText = 'width:100%;background:#1e293b;border:1px solid #334155;border-radius:8px;padding:10px 12px;color:#e2e8f0;font-size:12px;outline:none;min-height:80px;resize:vertical;font-family:inherit;';
      ta.oninput = function () { state.message = ta.value; };
      body.appendChild(ta);
    }

    var navRow = document.createElement('div');
    navRow.style.cssText = 'display:flex;gap:8px;margin-top:8px;';
    if (state.step > 0) {
      var bk = document.createElement('button');
      bk.textContent = t('back');
      bk.style.cssText = 'flex:1;background:rgba(100,116,139,0.15);border:1px solid rgba(100,116,139,0.3);border-radius:8px;padding:10px;color:#94a3b8;font-size:11px;font-weight:700;cursor:pointer;';
      bk.onclick = function () { state.step--; renderStep(); };
      navRow.appendChild(bk);
    }
    if (state.step < TOTAL - 1) {
      var nx = document.createElement('button');
      nx.textContent = t('next');
      nx.style.cssText = 'flex:2;background:linear-gradient(135deg,#4f46e5,#7c3aed);border:none;border-radius:8px;padding:10px;color:#fff;font-size:11px;font-weight:700;cursor:pointer;';
      nx.onclick = function () { state.step++; renderStep(); };
      navRow.appendChild(nx);
    } else {
      var bd = document.createElement('button');
      bd.textContent = t('build');
      bd.style.cssText = 'flex:2;background:linear-gradient(135deg,#059669,#0284c7);border:none;border-radius:8px;padding:10px;color:#fff;font-size:11px;font-weight:700;cursor:pointer;';
      bd.onclick = function () {
        bd.disabled = true;
        var code = buildApp();
        if (window.editor) window.editor.setValue(code);
        if (window.runPreview) window.runPreview();
        if (window.showToast) window.showToast(t('done'));
        state = { step: 0, name: '', type: '', theme: 0, sections: [], message: '' };
        renderStep();
      };
      navRow.appendChild(bd);
    }
    body.appendChild(navRow);
  }

  function addLabel(text) {
    var l = document.createElement('div');
    l.style.cssText = 'font-size:12px;font-weight:700;color:#818cf8;margin-bottom:4px;';
    l.textContent = text;
    body.appendChild(l);
  }
  function addInput(ph, val) {
    var inp = document.createElement('input');
    inp.type = 'text'; inp.placeholder = ph; inp.value = val || '';
    inp.style.cssText = 'width:100%;background:#1e293b;border:1px solid #334155;border-radius:8px;padding:10px 12px;color:#e2e8f0;font-size:12px;outline:none;';
    body.appendChild(inp);
    return inp;
  }

  renderStep();
  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function () {
  var oAL = window.applyLang;
  window.applyLang = function () {
    if (typeof oAL === 'function') oAL();
    var el = document.getElementById('lbl-tab-guidedbuilder');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'guidedbuilder') renderWizard();
  };
  var oRT = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'guidedbuilder') {
      window.activeTab = 'guidedbuilder';
      document.querySelectorAll('.ltab').forEach(function (b) { b.classList.remove('active'); });
      var btn = document.getElementById('tab-guidedbuilder');
      if (btn) btn.classList.add('active');
      renderWizard();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
