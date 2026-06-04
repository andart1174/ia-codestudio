/**
 * Smart Refactor Advisor v1.0 — EN/FR
 */
(function () {
'use strict';
var TX = {
  en: {
    tab: 'Refactor', title: '⚡ Smart Refactor', sub: 'Detect anti-patterns in your code',
    desc: 'Analyzes your code for common bad practices and shows how to fix them.',
    scan: '⚡ Scan for Issues',
    fix: '⚙️ Auto-Fix', example: 'How to fix:',
    clean: '✅ No issues found! Your code is clean.',
    issues: ' issues found',
    fixed: '✅ Fixed!'
  },
  fr: {
    tab: 'Refactoriser', title: '⚡ Conseiller Refactor', sub: 'Detectez les anti-patterns dans votre code',
    desc: 'Analyse votre code pour les mauvaises pratiques et montre comment les corriger.',
    scan: '⚡ Scanner les Problemes',
    fix: '⚙️ Corriger Auto', example: 'Comment corriger:',
    clean: '✅ Aucun probleme ! Votre code est propre.',
    issues: ' problemes trouves',
    fixed: '✅ Corrige !'
  }
};
function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var CHECKS = [
  {
    id: 'inline-style',
    icon: '⚠️',
    color: '#fbbf24',
    title: 'Repeated inline styles',
    titleFR: 'Styles inline repetes',
    check: function(code) {
      var matches = code.match(/style="[^"]+"/g) || [];
      if (matches.length >= 4) return matches.length + ' inline style attributes found. Create CSS classes instead.';
      return null;
    },
    example: '.my-class { /* your styles */ }  →  <div class="my-class">',
    autofix: null
  },
  {
    id: 'no-alt',
    icon: '🖼️',
    color: '#f87171',
    title: 'Images missing alt text',
    titleFR: 'Images sans attribut alt',
    check: function(code) {
      var imgs = (code.match(/<img[^>]*>/gi) || []);
      var bad = imgs.filter(function(img){ return !/alt=/i.test(img); });
      if (bad.length) return bad.length + ' image(s) without alt="" (bad for SEO & accessibility)';
      return null;
    },
    example: '<img src="photo.jpg" alt="Description of image">',
    autofix: function(code) {
      return code.replace(/<img(?![^>]*alt=)([^>]*)>/gi, '<img$1 alt="">');
    }
  },
  {
    id: 'no-viewport',
    icon: '📱',
    color: '#fb923c',
    title: 'Missing viewport meta tag',
    titleFR: 'Balise viewport manquante',
    check: function(code) {
      if (!/<meta[^>]*viewport/i.test(code)) return 'No viewport meta tag — app won\'t work on mobile!';
      return null;
    },
    example: '<meta name="viewport" content="width=device-width, initial-scale=1">',
    autofix: function(code) {
      var tag = '<meta name="viewport" content="width=device-width, initial-scale=1">';
      if (code.indexOf('<head>') !== -1) return code.replace('<head>', '<head>\n' + tag);
      return code;
    }
  },
  {
    id: 'important',
    icon: '🔴',
    color: '#f87171',
    title: 'Excessive !important usage',
    titleFR: 'Utilisation excessive de !important',
    check: function(code) {
      var count = (code.match(/!important/gi) || []).length;
      if (count >= 5) return count + ' uses of !important — this makes CSS hard to maintain.';
      return null;
    },
    example: 'Use specificity instead: .parent .child { color: red; }',
    autofix: null
  },
  {
    id: 'empty-div',
    icon: '📦',
    color: '#a78bfa',
    title: 'Empty divs (no class or content)',
    titleFR: 'Divs vides sans classe',
    check: function(code) {
      var empty = (code.match(/<div>\s*<\/div>/gi) || []).length;
      if (empty >= 2) return empty + ' empty <div></div> found. Use semantic HTML instead.';
      return null;
    },
    example: 'Use <section>, <article>, <main>, <nav> for better semantics.',
    autofix: null
  },
  {
    id: 'no-lang',
    icon: '🌍',
    color: '#38bdf8',
    title: 'Missing lang attribute on <html>',
    titleFR: 'Attribut lang manquant sur <html>',
    check: function(code) {
      if (/<!DOCTYPE/i.test(code) && !/<html[^>]*lang=/i.test(code))
        return '<html> is missing lang attribute (needed for screen readers & SEO)';
      return null;
    },
    example: '<html lang="en">',
    autofix: function(code) {
      return code.replace(/<html(?![^>]*lang=)([^>]*)>/i, '<html lang="en"$1>');
    }
  },
  {
    id: 'inline-onclick',
    icon: '🖱️',
    color: '#34d399',
    title: 'Inline onclick handlers',
    titleFR: 'Gestionnaires onclick inline',
    check: function(code) {
      var count = (code.match(/onclick="[^"]+"/gi) || []).length;
      if (count >= 3) return count + ' inline onclick handlers. Move to addEventListener in JS.';
      return null;
    },
    example: 'el.addEventListener("click", function() { ... });',
    autofix: null
  },
  {
    id: 'no-charset',
    icon: '🔤',
    color: '#fbbf24',
    title: 'Missing charset declaration',
    titleFR: 'Declaration charset manquante',
    check: function(code) {
      if (/<!DOCTYPE/i.test(code) && !/<meta[^>]*charset/i.test(code))
        return 'No charset meta tag — text encoding may break in some browsers';
      return null;
    },
    example: '<meta charset="UTF-8">',
    autofix: function(code) {
      if (code.indexOf('<head>') !== -1)
        return code.replace('<head>', '<head>\n<meta charset="UTF-8">');
      return code;
    }
  }
];

function runScan(resultsEl, statusEl) {
  if (!window.editor) return;
  var code = window.editor.getValue();
  var found = [];
  CHECKS.forEach(function(check) {
    var msg = check.check(code);
    if (msg) found.push({ check: check, msg: msg });
  });

  resultsEl.innerHTML = '';
  if (!found.length) {
    statusEl.textContent = t('clean');
    return;
  }
  statusEl.textContent = found.length + t('issues');

  found.forEach(function(item) {
    var c = item.check;
    var card = document.createElement('div');
    card.style.cssText = 'background:#1e293b;border:1px solid ' + c.color + '33;border-left:3px solid ' + c.color + ';border-radius:8px;padding:10px;margin-bottom:7px;';

    var top = document.createElement('div');
    top.style.cssText = 'display:flex;align-items:flex-start;gap:6px;margin-bottom:6px;';
    var ico = document.createElement('span');
    ico.textContent = c.icon;
    var titleEl = document.createElement('div');
    titleEl.style.cssText = 'font-size:11px;font-weight:700;color:' + c.color + ';flex:1;';
    titleEl.textContent = gl() === 'fr' ? (c.titleFR || c.title) : c.title;
    top.appendChild(ico); top.appendChild(titleEl);
    card.appendChild(top);

    var msgEl = document.createElement('div');
    msgEl.style.cssText = 'font-size:10px;color:#94a3b8;margin-bottom:7px;line-height:1.4;';
    msgEl.textContent = item.msg;
    card.appendChild(msgEl);

    var exBox = document.createElement('div');
    exBox.style.cssText = 'background:#0f172a;border-radius:5px;padding:6px 8px;margin-bottom:7px;';
    var exLbl = document.createElement('div');
    exLbl.style.cssText = 'font-size:9px;color:#64748b;font-weight:700;margin-bottom:3px;';
    exLbl.textContent = t('example');
    var exCode = document.createElement('code');
    exCode.style.cssText = 'font-size:9px;color:#4ade80;font-family:monospace;white-space:pre-wrap;word-break:break-all;';
    exCode.textContent = c.example;
    exBox.appendChild(exLbl); exBox.appendChild(exCode);
    card.appendChild(exBox);

    if (c.autofix) {
      var fixBtn = document.createElement('button');
      fixBtn.textContent = t('fix');
      fixBtn.style.cssText = 'background:' + c.color + '22;border:1px solid ' + c.color + '55;border-radius:5px;padding:4px 10px;color:' + c.color + ';font-size:9px;font-weight:700;cursor:pointer;';
      fixBtn.onclick = function() {
        var cur = window.editor.getValue();
        var fixed = c.autofix(cur);
        window.editor.setValue(fixed);
        if (window.runPreview) window.runPreview();
        card.style.opacity = '0.4';
        card.style.pointerEvents = 'none';
        fixBtn.textContent = t('fixed');
      };
      card.appendChild(fixBtn);
    }
    resultsEl.appendChild(card);
  });
}

function renderRefactorTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';
  var hdr = document.createElement('div');
  hdr.style.cssText = 'padding:12px 14px 8px;border-bottom:1px solid rgba(251,191,36,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#fbbf24;">' + t('title') + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);
  var body = document.createElement('div');
  body.style.cssText = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;';
  var desc = document.createElement('div');
  desc.style.cssText = 'font-size:10px;color:#94a3b8;line-height:1.5;';
  desc.textContent = t('desc');
  body.appendChild(desc);
  var statusEl = document.createElement('div');
  statusEl.style.cssText = 'font-size:11px;color:#fbbf24;min-height:14px;text-align:center;font-weight:700;';
  body.appendChild(statusEl);
  var resultsEl = document.createElement('div');
  body.appendChild(resultsEl);
  var scanBtn = document.createElement('button');
  scanBtn.textContent = t('scan');
  scanBtn.style.cssText = 'width:100%;background:linear-gradient(135deg,#d97706,#b45309);border:none;border-radius:8px;padding:11px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;margin-top:4px;';
  scanBtn.onclick = function() { runScan(resultsEl, statusEl); };
  body.appendChild(scanBtn);
  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function () {
  var oAL = window.applyLang;
  window.applyLang = function () {
    if (typeof oAL === 'function') oAL();
    var el = document.getElementById('lbl-tab-refactor');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'refactor') renderRefactorTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'refactor') {
      window.activeTab = 'refactor';
      document.querySelectorAll('.ltab').forEach(function (b) { b.classList.remove('active'); });
      var btn = document.getElementById('tab-refactor');
      if (btn) btn.classList.add('active');
      renderRefactorTab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
