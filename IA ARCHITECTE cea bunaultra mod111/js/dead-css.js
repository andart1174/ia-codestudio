/**
 * Dead CSS Detector v1.0 — EN/FR
 */
(function () {
'use strict';
var TX = {
  en: {
    tab: 'Dead CSS', title: '🔍 Dead CSS Detector', sub: 'Find & remove unused CSS rules',
    desc: 'Scans your CSS selectors and checks if they match any HTML element. Unused rules = dead code.',
    scan: '🔍 Scan Dead CSS',
    removeAll: '🗑 Remove All Dead Rules',
    remove: '✕ Remove',
    noCode: '⚠️ No CSS found.',
    clean: '✅ All CSS rules are used!',
    found: ' dead rules found.',
    removed: '✅ Dead rules removed!',
    total: 'Total rules: ', dead: 'Dead rules: '
  },
  fr: {
    tab: 'CSS Mort', title: '🔍 Detecteur CSS Mort', sub: 'Trouvez et supprimez les regles CSS inutilisees',
    desc: 'Scanne vos selecteurs CSS et verifie s ils correspondent a un element HTML. Regles inutilisees = code mort.',
    scan: '🔍 Scanner le CSS Mort',
    removeAll: '🗑 Supprimer tout le CSS Mort',
    remove: '✕ Supprimer',
    noCode: '⚠️ Aucun CSS trouve.',
    clean: '✅ Toutes les regles CSS sont utilisees !',
    found: ' regles mortes trouvees.',
    removed: '✅ Regles mortes supprimees !',
    total: 'Total regles: ', dead: 'Regles mortes: '
  }
};
function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

function parseSelectors(cssText) {
  /* Extract all selectors (before {) */
  var results = [];
  var ruleRx = /([^{]+)\{[^}]*\}/g;
  var match;
  while ((match = ruleRx.exec(cssText)) !== null) {
    var selBlock = match[1].trim();
    /* Skip @rules */
    if (selBlock.startsWith('@')) continue;
    /* Handle comma-separated selectors */
    selBlock.split(',').forEach(function (sel) {
      sel = sel.trim();
      if (sel) results.push({ sel: sel, full: match[0] });
    });
  }
  return results;
}

function isSelectorUsed(sel, htmlText) {
  /* Skip pseudo-classes/elements, *, body, html, :root — always considered used */
  var base = sel.replace(/::?[a-z-]+(\([^)]*\))?/g, '').trim();
  if (!base || base === '*' || base === 'html' || base === 'body' || base === ':root') return true;
  if (base.startsWith('@') || base.startsWith('from') || base.startsWith('to') || /^\d/.test(base)) return true;

  /* Try to build a simple check */
  /* Class selector .foo */
  var classMatch = base.match(/\.([a-zA-Z0-9_-]+)/g);
  if (classMatch) {
    return classMatch.every(function (cls) {
      var className = cls.slice(1);
      return htmlText.indexOf('class="' + className + '"') !== -1 ||
             htmlText.indexOf('"' + className + ' ') !== -1 ||
             htmlText.indexOf(' ' + className + '"') !== -1 ||
             htmlText.indexOf(' ' + className + ' ') !== -1 ||
             new RegExp('class=["\'][^"\']*' + className).test(htmlText);
    });
  }
  /* ID selector #foo */
  var idMatch = base.match(/#([a-zA-Z0-9_-]+)/);
  if (idMatch) {
    return htmlText.indexOf('id="' + idMatch[1] + '"') !== -1 ||
           new RegExp('id=["\']' + idMatch[1]).test(htmlText);
  }
  /* Tag selector */
  var tagMatch = base.match(/^([a-zA-Z][a-zA-Z0-9]*)/);
  if (tagMatch) {
    return new RegExp('<' + tagMatch[1] + '[\\s>]', 'i').test(htmlText);
  }
  return true; /* unknown — assume used */
}

function scanDeadCSS(resultsEl, statusEl, removeAllBtn) {
  if (!window.editor) return;
  var code = window.editor.getValue();
  var styleMatch = code.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  if (!styleMatch) { statusEl.textContent = t('noCode'); return; }

  var cssText = styleMatch[1];
  /* Extract HTML (without style block) */
  var htmlText = code.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

  var all = parseSelectors(cssText);
  var dead = all.filter(function (item) { return !isSelectorUsed(item.sel, htmlText); });

  resultsEl.innerHTML = '';
  statusEl.textContent = t('total') + all.length + ' | ' + t('dead') + dead.length;

  if (!dead.length) {
    var ok = document.createElement('div');
    ok.style.cssText = 'color:#4ade80;font-size:11px;text-align:center;padding:16px;';
    ok.textContent = t('clean');
    resultsEl.appendChild(ok);
    removeAllBtn.style.display = 'none';
    return;
  }

  removeAllBtn.style.display = 'block';

  var title = document.createElement('div');
  title.style.cssText = 'font-size:10px;font-weight:700;color:#fbbf24;margin-bottom:8px;';
  title.textContent = dead.length + t('found');
  resultsEl.appendChild(title);

  dead.forEach(function (item) {
    var row = document.createElement('div');
    row.style.cssText = 'background:rgba(239,68,68,0.05);border:1px solid rgba(239,68,68,0.2);border-radius:7px;padding:7px 10px;margin-bottom:5px;display:flex;align-items:center;gap:8px;';
    var lbl = document.createElement('code');
    lbl.style.cssText = 'font-size:10px;color:#fca5a5;flex:1;word-break:break-all;font-family:monospace;';
    lbl.textContent = item.sel;
    var btn = document.createElement('button');
    btn.textContent = t('remove');
    btn.style.cssText = 'background:rgba(239,68,68,0.2);border:1px solid rgba(239,68,68,0.4);border-radius:5px;padding:3px 7px;color:#f87171;font-size:9px;font-weight:700;cursor:pointer;flex-shrink:0;';
    btn.onclick = (function (sel, el) {
      return function () {
        var cur = window.editor.getValue();
        var sm = cur.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
        if (!sm) return;
        var newCSS = sm[1];
        /* Remove the specific rule block */
        var escaped = sel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        newCSS = newCSS.replace(new RegExp('\\s*' + escaped + '\\s*\\{[^}]*\\}', 'g'), '');
        cur = cur.replace(sm[1], newCSS);
        window.editor.setValue(cur);
        if (window.runPreview) window.runPreview();
        el.style.opacity = '0.3';
        el.style.pointerEvents = 'none';
        btn.textContent = '✓';
      };
    })(item.sel, row);
    row.appendChild(lbl);
    row.appendChild(btn);
    resultsEl.appendChild(row);
  });
}

function renderDeadCSSTab() {
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
  body.style.cssText = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';
  var desc = document.createElement('div');
  desc.style.cssText = 'font-size:10px;color:#94a3b8;line-height:1.5;';
  desc.textContent = t('desc');
  body.appendChild(desc);
  var statusEl = document.createElement('div');
  statusEl.style.cssText = 'font-size:10px;color:#64748b;min-height:14px;';
  body.appendChild(statusEl);
  var resultsEl = document.createElement('div');
  body.appendChild(resultsEl);

  var removeAllBtn = document.createElement('button');
  removeAllBtn.textContent = t('removeAll');
  removeAllBtn.style.cssText = 'width:100%;background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.4);border-radius:8px;padding:9px;color:#f87171;font-weight:700;font-size:10px;cursor:pointer;display:none;';
  removeAllBtn.onclick = function () {
    if (!window.editor) return;
    var cur = window.editor.getValue();
    var sm = cur.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
    if (!sm) return;
    var cssText = sm[1];
    var htmlText = cur.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
    var all = parseSelectors(cssText);
    all.forEach(function (item) {
      if (!isSelectorUsed(item.sel, htmlText)) {
        var escaped = item.sel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        cssText = cssText.replace(new RegExp('\\s*' + escaped + '\\s*\\{[^}]*\\}', 'g'), '');
      }
    });
    cur = cur.replace(sm[1], cssText);
    window.editor.setValue(cur);
    if (window.runPreview) window.runPreview();
    resultsEl.innerHTML = '';
    statusEl.textContent = t('removed');
    removeAllBtn.style.display = 'none';
  };

  var scanBtn = document.createElement('button');
  scanBtn.textContent = t('scan');
  scanBtn.style.cssText = 'width:100%;background:linear-gradient(135deg,#dc2626,#b91c1c);border:none;border-radius:8px;padding:11px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;';
  scanBtn.onclick = function () { scanDeadCSS(resultsEl, statusEl, removeAllBtn); };

  body.appendChild(removeAllBtn);
  body.appendChild(scanBtn);
  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function () {
  var oAL = window.applyLang;
  window.applyLang = function () {
    if (typeof oAL === 'function') oAL();
    var el = document.getElementById('lbl-tab-deadcss');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'deadcss') renderDeadCSSTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'deadcss') {
      window.activeTab = 'deadcss';
      document.querySelectorAll('.ltab').forEach(function (b) { b.classList.remove('active'); });
      var btn = document.getElementById('tab-deadcss');
      if (btn) btn.classList.add('active');
      renderDeadCSSTab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
