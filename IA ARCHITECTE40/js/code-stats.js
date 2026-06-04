/**
 * Live Code Statistics v1.0 — EN/FR
 */
(function () {
'use strict';
var TX = {
  en: {
    tab: 'Code Stats', title: '📊 Code Statistics', sub: 'Live analysis of your code',
    desc: 'Real-time stats about your code structure. Updates every time you click Analyze.',
    analyze: '🔍 Analyze Code',
    htmlEls: 'HTML Elements', cssRules: 'CSS Rules', jsLines: 'JS Lines',
    colors: 'Unique Colors', nesting: 'Max Nesting', fileSize: 'File Size',
    divs: 'Total DIVs', imgs: 'Images', links: 'Links',
    score: 'Complexity Score', good: '✅ Clean', ok: '⚠️ Moderate', complex: '🔴 Complex'
  },
  fr: {
    tab: 'Stats Code', title: '📊 Statistiques du Code', sub: 'Analyse en direct de votre code',
    desc: 'Statistiques en temps reel sur la structure de votre code.',
    analyze: '🔍 Analyser le Code',
    htmlEls: 'Elements HTML', cssRules: 'Regles CSS', jsLines: 'Lignes JS',
    colors: 'Couleurs uniques', nesting: 'Imbrication max', fileSize: 'Taille du fichier',
    divs: 'Total DIVs', imgs: 'Images', links: 'Liens',
    score: 'Score de Complexite', good: '✅ Propre', ok: '⚠️ Modere', complex: '🔴 Complexe'
  }
};
function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

function analyzeCode(code) {
  var stats = {};
  /* File size */
  stats.fileSize = (new Blob([code]).size / 1024).toFixed(1) + ' KB';
  /* HTML elements — count all tags */
  stats.htmlEls = (code.match(/<[a-z][a-z0-9]*/gi) || []).length;
  stats.divs    = (code.match(/<div/gi) || []).length;
  stats.imgs    = (code.match(/<img/gi) || []).length;
  stats.links   = (code.match(/<a\s/gi) || []).length;
  /* CSS rules */
  var styleMatch = code.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
  var cssText = styleMatch.join('');
  stats.cssRules = (cssText.match(/\{/g) || []).length;
  /* Unique colors */
  var colorRx = /#([0-9a-fA-F]{3,6})|rgba?\([^)]+\)/g;
  var allColors = code.match(colorRx) || [];
  stats.colors = new Set(allColors.map(function(c){ return c.toLowerCase(); })).size;
  /* JS lines */
  var scriptMatch = code.match(/<script[^>]*>([\s\S]*?)<\/script>/gi) || [];
  var jsText = scriptMatch.join('\n');
  stats.jsLines = jsText.split('\n').filter(function(l){ return l.trim().length > 0; }).length;
  /* Max nesting depth */
  var maxDepth = 0, depth = 0;
  var tags = code.match(/<\/?[a-z][^>]*>/gi) || [];
  tags.forEach(function(tag){
    if (tag.match(/^<\//) || tag.match(/\/>$/)) { depth = Math.max(0, depth - 1); }
    else { depth++; maxDepth = Math.max(maxDepth, depth); }
  });
  stats.nesting = maxDepth;
  /* Complexity score 0-100 */
  var score = Math.min(100, Math.round(
    (stats.htmlEls / 5) + (stats.cssRules * 2) + (stats.jsLines / 3) + (stats.nesting * 3)
  ));
  stats.score = score;
  return stats;
}

function drawMiniBar(value, max, color) {
  var canvas = document.createElement('canvas');
  canvas.width = 80; canvas.height = 8;
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, 80, 8);
  ctx.fillStyle = color;
  var w = Math.max(4, Math.round((Math.min(value, max) / max) * 80));
  ctx.fillRect(0, 0, w, 8);
  canvas.style.cssText = 'border-radius:4px;display:block;';
  return canvas;
}

function renderResults(stats, resultsEl) {
  resultsEl.innerHTML = '';

  /* Score banner */
  var scoreColor = stats.score < 30 ? '#4ade80' : stats.score < 70 ? '#fbbf24' : '#f87171';
  var scoreLbl = stats.score < 30 ? t('good') : stats.score < 70 ? t('ok') : t('complex');
  var banner = document.createElement('div');
  banner.style.cssText = 'background:' + scoreColor + '15;border:1px solid ' + scoreColor + '44;border-radius:10px;padding:12px;text-align:center;margin-bottom:10px;';
  banner.innerHTML = '<div style="font-size:11px;color:#94a3b8;margin-bottom:4px;">' + t('score') + '</div>'
    + '<div style="font-size:28px;font-weight:900;color:' + scoreColor + ';">' + stats.score + '</div>'
    + '<div style="font-size:11px;color:' + scoreColor + ';margin-top:2px;">' + scoreLbl + '</div>';
  resultsEl.appendChild(banner);

  /* Stats rows */
  var ROWS = [
    [t('htmlEls'),  stats.htmlEls,  100,  '#38bdf8'],
    [t('divs'),     stats.divs,     50,   '#818cf8'],
    [t('cssRules'), stats.cssRules, 80,   '#f472b6'],
    [t('colors'),   stats.colors,   30,   '#fbbf24'],
    [t('jsLines'),  stats.jsLines,  200,  '#4ade80'],
    [t('nesting'),  stats.nesting,  15,   '#fb923c'],
    [t('imgs'),     stats.imgs,     20,   '#a78bfa'],
    [t('links'),    stats.links,    20,   '#34d399']
  ];

  var grid = document.createElement('div');
  grid.style.cssText = 'display:flex;flex-direction:column;gap:7px;';

  ROWS.forEach(function (row) {
    var item = document.createElement('div');
    item.style.cssText = 'background:#1e293b;border:1px solid #334155;border-radius:8px;padding:8px 10px;';

    var top = document.createElement('div');
    top.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;';
    var lbl = document.createElement('div');
    lbl.style.cssText = 'font-size:10px;color:#94a3b8;';
    lbl.textContent = row[0];
    var val = document.createElement('div');
    val.style.cssText = 'font-size:12px;font-weight:800;color:' + row[3] + ';';
    val.textContent = row[1];
    top.appendChild(lbl);
    top.appendChild(val);
    item.appendChild(top);
    item.appendChild(drawMiniBar(row[1], row[2], row[3]));
    grid.appendChild(item);
  });

  resultsEl.appendChild(grid);

  /* File size */
  var fsRow = document.createElement('div');
  fsRow.style.cssText = 'background:#1e293b;border:1px solid #334155;border-radius:8px;padding:8px 10px;display:flex;justify-content:space-between;align-items:center;margin-top:6px;';
  fsRow.innerHTML = '<span style="font-size:10px;color:#94a3b8;">' + t('fileSize') + '</span><span style="font-size:12px;font-weight:800;color:#e2e8f0;">' + stats.fileSize + '</span>';
  resultsEl.appendChild(fsRow);
}

function renderStatsTab() {
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
  var resultsEl = document.createElement('div');
  body.appendChild(resultsEl);
  var btn = document.createElement('button');
  btn.textContent = t('analyze');
  btn.style.cssText = 'width:100%;background:linear-gradient(135deg,#0284c7,#0ea5e9);border:none;border-radius:8px;padding:11px;color:#fff;font-weight:900;font-size:12px;cursor:pointer;margin-top:auto;';
  btn.onclick = function () {
    if (!window.editor) return;
    var stats = analyzeCode(window.editor.getValue());
    renderResults(stats, resultsEl);
  };
  body.appendChild(btn);
  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function () {
  var oAL = window.applyLang;
  window.applyLang = function () {
    if (typeof oAL === 'function') oAL();
    var el = document.getElementById('lbl-tab-codestats');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'codestats') renderStatsTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'codestats') {
      window.activeTab = 'codestats';
      document.querySelectorAll('.ltab').forEach(function (b) { b.classList.remove('active'); });
      var btn = document.getElementById('tab-codestats');
      if (btn) btn.classList.add('active');
      renderStatsTab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
