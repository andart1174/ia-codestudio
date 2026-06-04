/**
 * Launch Readiness Checklist v1.0 — EN/FR
 */
(function () {
'use strict';
var TX = {
  en: {
    tab: 'Launch Check', title: '📋 Launch Readiness', sub: '10-point pre-launch checklist',
    desc: 'Run this checklist before showing your app to the world. Each item can be auto-fixed.',
    scan: '🔍 Run Checklist',
    ready: '🚀 Your app is launch-ready!',
    score: 'Launch Score',
    fix: '⚡ Fix',
    fixed: '✅'
  },
  fr: {
    tab: 'Controle Lancement', title: '📋 Controle Lancement', sub: 'Checklist pre-lancement en 10 points',
    desc: 'Executez cette checklist avant de presenter votre app au monde. Chaque point peut etre corrige automatiquement.',
    scan: '🔍 Lancer le Controle',
    ready: '🚀 Votre app est prete !',
    score: 'Score de Lancement',
    fix: '⚡ Corriger',
    fixed: '✅'
  }
};
function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var CHECKS = [
  {
    en: 'Has a page <title>',
    fr: 'Possede un <title>',
    test: function (c) { return c.indexOf('<title>') !== -1 && c.indexOf('</title>') !== -1; },
    fix: function (c) { return c.indexOf('</head>') !== -1 ? c.replace('</head>', '  <title>My App</title>\n</head>') : c; }
  },
  {
    en: 'Has <!DOCTYPE html>',
    fr: 'Possede <!DOCTYPE html>',
    test: function (c) { return c.toLowerCase().indexOf('<!doctype') !== -1; },
    fix: function (c) { return '<!DOCTYPE html>\n' + c; }
  },
  {
    en: 'Has viewport meta tag (mobile-ready)',
    fr: 'Balise viewport presente (compatible mobile)',
    test: function (c) { return c.indexOf('viewport') !== -1; },
    fix: function (c) { return c.indexOf('<head>') !== -1 ? c.replace('<head>', '<head>\n  <meta name="viewport" content="width=device-width, initial-scale=1">') : c; }
  },
  {
    en: 'Has charset UTF-8',
    fr: 'Charset UTF-8 present',
    test: function (c) { return c.indexOf('charset') !== -1; },
    fix: function (c) { return c.indexOf('<head>') !== -1 ? c.replace('<head>', '<head>\n  <meta charset="UTF-8">') : c; }
  },
  {
    en: 'Has at least one <h1> heading',
    fr: 'Possede au moins un titre <h1>',
    test: function (c) { return /<h1/i.test(c); },
    fix: null
  },
  {
    en: 'Has a call-to-action button',
    fr: 'Possede un bouton d appel a l action',
    test: function (c) { return /<button|<a[^>]*class[^>]*btn/i.test(c); },
    fix: null
  },
  {
    en: 'Images have alt attributes',
    fr: 'Les images ont des attributs alt',
    test: function (c) { return !/<img(?![^>]*alt=)[^>]*>/i.test(c); },
    fix: function (c) { return c.replace(/<img([^>]*)>/gi, function (m, a) { return a.indexOf('alt=') === -1 ? '<img' + a + ' alt="">' : m; }); }
  },
  {
    en: 'Has a meta description for SEO',
    fr: 'Possede une meta description pour le SEO',
    test: function (c) { return c.indexOf('meta name="description"') !== -1 || c.indexOf("meta name='description'") !== -1; },
    fix: function (c) { return c.indexOf('</head>') !== -1 ? c.replace('</head>', '  <meta name="description" content="My awesome app">\n</head>') : c; }
  },
  {
    en: 'CSS is present (app is styled)',
    fr: 'CSS present (app stylisee)',
    test: function (c) { return c.indexOf('<style>') !== -1 || c.indexOf('stylesheet') !== -1; },
    fix: null
  },
  {
    en: 'Page has visible body content',
    fr: 'La page a du contenu visible dans le body',
    test: function (c) {
      var m = c.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      return m && m[1].replace(/<[^>]+>/g, '').trim().length > 10;
    },
    fix: null
  }
];

function runChecklist(resultsEl, statusEl) {
  if (!window.editor) return;
  var code = window.editor.getValue();
  resultsEl.innerHTML = '';

  var passed = 0;
  CHECKS.forEach(function (ch, i) {
    var ok = ch.test(code);
    if (ok) passed++;

    var row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:flex-start;gap:8px;padding:8px 10px;border-radius:8px;margin-bottom:6px;background:' + (ok ? 'rgba(34,197,94,0.05)' : 'rgba(239,68,68,0.05)') + ';border:1px solid ' + (ok ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)') + ';';

    var icon = document.createElement('div');
    icon.style.cssText = 'font-size:14px;flex-shrink:0;margin-top:1px;';
    icon.textContent = ok ? '✅' : '❌';
    row.appendChild(icon);

    var info = document.createElement('div');
    info.style.cssText = 'flex:1;';
    var lbl = document.createElement('div');
    lbl.style.cssText = 'font-size:10px;color:' + (ok ? '#4ade80' : '#fca5a5') + ';line-height:1.4;';
    lbl.textContent = gl() === 'fr' ? ch.fr : ch.en;
    info.appendChild(lbl);

    if (!ok && ch.fix) {
      var fixBtn = document.createElement('button');
      fixBtn.textContent = t('fix');
      fixBtn.style.cssText = 'margin-top:5px;background:rgba(34,197,94,0.15);border:1px solid rgba(34,197,94,0.4);border-radius:5px;padding:3px 8px;color:#4ade80;font-size:9px;font-weight:700;cursor:pointer;';
      fixBtn.onclick = (function (check, iconEl, lblEl, btn) {
        return function () {
          var cur = window.editor.getValue();
          window.editor.setValue(check.fix(cur));
          if (window.runPreview) window.runPreview();
          iconEl.textContent = '✅';
          lblEl.style.color = '#4ade80';
          btn.textContent = t('fixed');
          btn.disabled = true;
          row.style.background = 'rgba(34,197,94,0.05)';
          row.style.borderColor = 'rgba(34,197,94,0.2)';
          passed++;
          var pct = Math.round((passed / CHECKS.length) * 100);
          statusEl.textContent = t('score') + ': ' + pct + '%';
        };
      })(ch, icon, lbl, fixBtn);
      info.appendChild(fixBtn);
    }

    row.appendChild(info);
    resultsEl.appendChild(row);
  });

  var pct = Math.round((passed / CHECKS.length) * 100);
  statusEl.textContent = passed === CHECKS.length ? t('ready') : t('score') + ': ' + pct + '%';
  statusEl.style.color = passed === CHECKS.length ? '#4ade80' : '#fbbf24';
}

function renderLaunchTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style.cssText = 'padding:12px 14px 8px;border-bottom:1px solid rgba(16,185,129,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#34d399;">' + t('title') + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style.cssText = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';

  var desc = document.createElement('div');
  desc.style.cssText = 'font-size:11px;color:#94a3b8;line-height:1.5;';
  desc.textContent = t('desc');
  body.appendChild(desc);

  var statusEl = document.createElement('div');
  statusEl.style.cssText = 'font-size:12px;font-weight:700;text-align:center;min-height:18px;';
  body.appendChild(statusEl);

  var resultsEl = document.createElement('div');
  body.appendChild(resultsEl);

  var scanBtn = document.createElement('button');
  scanBtn.textContent = t('scan');
  scanBtn.style.cssText = 'width:100%;background:linear-gradient(135deg,#059669,#047857);border:none;border-radius:8px;padding:11px;color:#fff;font-weight:900;font-size:12px;cursor:pointer;transition:opacity .2s;margin-top:auto;';
  scanBtn.onmouseenter = function () { scanBtn.style.opacity = '0.85'; };
  scanBtn.onmouseleave = function () { scanBtn.style.opacity = '1'; };
  scanBtn.onclick = function () { runChecklist(resultsEl, statusEl); };
  body.appendChild(scanBtn);

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function () {
  var oAL = window.applyLang;
  window.applyLang = function () {
    if (typeof oAL === 'function') oAL();
    var el = document.getElementById('lbl-tab-launchcheck');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'launchcheck') renderLaunchTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'launchcheck') {
      window.activeTab = 'launchcheck';
      document.querySelectorAll('.ltab').forEach(function (b) { b.classList.remove('active'); });
      var btn = document.getElementById('tab-launchcheck');
      if (btn) btn.classList.add('active');
      renderLaunchTab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
