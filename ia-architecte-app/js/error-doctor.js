/**
 * Error Doctor v1.0 — EN/FR
 */
(function () {
'use strict';
var TX = {
  en: {
    tab: 'Error Doctor', title: '🐛 Error Doctor', sub: 'Diagnose & fix your code',
    desc: 'Scans your code for common errors and explains them in plain English with one-click fixes.',
    scan: '🩺 Diagnose Code',
    noErrors: '✅ No errors found! Your code looks good.',
    fixing: '🔧 Fixing...',
    fixed: '✅ Fixed!',
    errors: 'Issues found:'
  },
  fr: {
    tab: 'Docteur Erreurs', title: '🐛 Docteur Erreurs', sub: 'Diagnostiquez et corrigez votre code',
    desc: 'Scanne votre code pour les erreurs courantes et les explique en langage simple avec des corrections en un clic.',
    scan: '🩺 Diagnostiquer',
    noErrors: '✅ Aucune erreur ! Votre code est bon.',
    fixing: '🔧 Correction...',
    fixed: '✅ Corrige !',
    errors: 'Problemes trouves :'
  }
};
function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var CHECKS = [
  {
    id: 'no-doctype',
    en: 'Missing <!DOCTYPE html> declaration. Browsers need this to render correctly.',
    fr: 'Declaration <!DOCTYPE html> manquante. Les navigateurs en ont besoin.',
    test: function (c) { return c.toLowerCase().indexOf('<!doctype') === -1; },
    fix: function (c) { return '<!DOCTYPE html>\n' + c; }
  },
  {
    id: 'no-viewport',
    en: 'Missing viewport meta tag. Your app will look broken on mobile phones.',
    fr: 'Balise meta viewport manquante. Votre app sera cassee sur mobile.',
    test: function (c) { return c.indexOf('viewport') === -1; },
    fix: function (c) {
      var tag = '<meta name="viewport" content="width=device-width, initial-scale=1">';
      if (c.indexOf('<head>') !== -1) return c.replace('<head>', '<head>\n  ' + tag);
      return c;
    }
  },
  {
    id: 'no-charset',
    en: 'Missing charset meta tag. Special characters (accents, emojis) may display incorrectly.',
    fr: 'Balise meta charset manquante. Les caracteres speciaux peuvent s afficher incorrectement.',
    test: function (c) { return c.indexOf('charset') === -1; },
    fix: function (c) {
      if (c.indexOf('<head>') !== -1) return c.replace('<head>', '<head>\n  <meta charset="UTF-8">');
      return c;
    }
  },
  {
    id: 'empty-alt',
    en: 'Images without alt="" attribute found. This breaks accessibility for blind users.',
    fr: 'Images sans attribut alt="" trouvees. Cela nuit a l accessibilite.',
    test: function (c) { return /<img(?![^>]*alt=)[^>]*>/i.test(c); },
    fix: function (c) { return c.replace(/<img([^>]*)>/gi, function (m, attrs) { if (attrs.indexOf('alt=') === -1) return '<img' + attrs + ' alt="">'; return m; }); }
  },
  {
    id: 'inline-style-overflow',
    en: 'More than 10 inline style="" attributes found. Consider using a <style> block instead.',
    fr: 'Plus de 10 attributs style="" en ligne trouves. Utilisez un bloc <style> a la place.',
    test: function (c) { return (c.match(/style="/g) || []).length > 10; },
    fix: null
  },
  {
    id: 'no-title',
    en: 'Missing <title> tag. Your app has no name in browser tabs or search results.',
    fr: 'Balise <title> manquante. Votre app n a pas de nom dans les onglets du navigateur.',
    test: function (c) { return c.indexOf('<title>') === -1; },
    fix: function (c) {
      if (c.indexOf('<head>') !== -1) return c.replace('</head>', '  <title>My App</title>\n</head>');
      return c;
    }
  }
];

function scanCode(resultsEl) {
  if (!window.editor) return;
  var code = window.editor.getValue();
  resultsEl.innerHTML = '';

  var found = CHECKS.filter(function (ch) { return ch.test(code); });

  if (!found.length) {
    resultsEl.innerHTML = '<div style="color:#4ade80;font-size:11px;text-align:center;padding:16px;">' + t('noErrors') + '</div>';
    return;
  }

  var title = document.createElement('div');
  title.style.cssText = 'font-size:10px;font-weight:700;color:#fbbf24;margin-bottom:8px;';
  title.textContent = t('errors') + ' ' + found.length;
  resultsEl.appendChild(title);

  found.forEach(function (ch) {
    var card = document.createElement('div');
    card.style.cssText = 'background:rgba(239,68,68,0.05);border:1px solid rgba(239,68,68,0.2);border-radius:8px;padding:10px;margin-bottom:8px;';

    var msg = document.createElement('div');
    msg.style.cssText = 'font-size:10px;color:#fca5a5;line-height:1.5;margin-bottom:8px;';
    msg.textContent = gl() === 'fr' ? ch.fr : ch.en;
    card.appendChild(msg);

    if (ch.fix) {
      var fixBtn = document.createElement('button');
      fixBtn.textContent = '🔧 Auto-Fix';
      fixBtn.style.cssText = 'background:rgba(34,197,94,0.15);border:1px solid rgba(34,197,94,0.4);border-radius:6px;padding:5px 10px;color:#4ade80;font-size:10px;font-weight:700;cursor:pointer;';
      fixBtn.onclick = function () {
        fixBtn.textContent = t('fixing');
        var current = window.editor.getValue();
        window.editor.setValue(ch.fix(current));
        if (window.runPreview) window.runPreview();
        fixBtn.textContent = t('fixed');
        fixBtn.disabled = true;
        card.style.borderColor = 'rgba(34,197,94,0.3)';
        msg.style.color = '#4ade80';
      };
      card.appendChild(fixBtn);
    } else {
      var hint = document.createElement('div');
      hint.style.cssText = 'font-size:9px;color:#64748b;font-style:italic;';
      hint.textContent = 'Manual fix recommended.';
      card.appendChild(hint);
    }
    resultsEl.appendChild(card);
  });
}

function renderDoctorTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';
  var hdr = document.createElement('div');
  hdr.style.cssText = 'padding:12px 14px 8px;border-bottom:1px solid rgba(239,68,68,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#f87171;">' + t('title') + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);
  var body = document.createElement('div');
  body.style.cssText = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:12px;';
  var desc = document.createElement('div');
  desc.style.cssText = 'font-size:11px;color:#94a3b8;line-height:1.5;background:rgba(239,68,68,0.05);border:1px solid rgba(239,68,68,0.15);border-radius:8px;padding:10px;';
  desc.textContent = t('desc');
  body.appendChild(desc);
  var resultsEl = document.createElement('div');
  body.appendChild(resultsEl);
  var scanBtn = document.createElement('button');
  scanBtn.textContent = t('scan');
  scanBtn.style.cssText = 'width:100%;background:linear-gradient(135deg,#dc2626,#b91c1c);border:none;border-radius:8px;padding:11px;color:#fff;font-weight:900;font-size:12px;cursor:pointer;transition:opacity .2s;';
  scanBtn.onclick = function () { scanCode(resultsEl); };
  body.appendChild(scanBtn);
  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function () {
  var oAL = window.applyLang;
  window.applyLang = function () {
    if (typeof oAL === 'function') oAL();
    var el = document.getElementById('lbl-tab-errordoctor');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'errordoctor') renderDoctorTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'errordoctor') {
      window.activeTab = 'errordoctor';
      document.querySelectorAll('.ltab').forEach(function (b) { b.classList.remove('active'); });
      var btn = document.getElementById('tab-errordoctor');
      if (btn) btn.classList.add('active');
      renderDoctorTab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
