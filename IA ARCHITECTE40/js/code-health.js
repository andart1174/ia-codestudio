(function() {
'use strict';
/* ═══════════════════════════════════════════════════
   Live Code Health Dashboard v1.0
   Floating panel with real-time code metrics
   ═══════════════════════════════════════════════════ */

var PANEL_OPEN = false;
var INTERVAL_ID = null;

function computeMetrics(code) {
  if (!code || !code.trim()) return null;
  var low = code.toLowerCase();
  var lines = code.split('\n').length;
  var chars = code.length;
  var tags  = (code.match(/<[a-z]/gi) || []).length;
  var scripts = (code.match(/<script/gi) || []).length;
  var styles = (code.match(/<style/gi) || []).length;
  var imgs   = (code.match(/<img/gi) || []).length;
  var links  = (code.match(/href=/gi) || []).length;
  var buttons = (code.match(/<button/gi) || []).length;
  var forms  = (code.match(/<form/gi) || []).length;
  var classes = (code.match(/class="/gi) || []).length;
  var ids    = (code.match(/ id="/gi) || []).length;
  var inlineStyles = (code.match(/ style="/gi) || []).length;

  // Estimate file size
  var kb = (chars / 1024).toFixed(1);

  // Estimate render time (rough)
  var renderMs = 50 + scripts * 30 + imgs * 20 + inlineStyles * 0.5;

  // Complexity score (0-100, lower = simpler)
  var complexity = Math.min(100, Math.round(tags * 0.5 + scripts * 10 + inlineStyles * 0.3));

  // Quality scores
  var hasTitle = low.includes('<title>');
  var hasMeta  = low.includes('meta name="description"');
  var hasLang  = low.includes('lang=');
  var hasViewport = low.includes('viewport');
  var hasAlt   = low.includes('alt=') || !low.includes('<img');
  var hasDoctype = low.includes('<!doctype');
  var hasFontLink = low.includes('fonts.google') || low.includes('font-family');
  var hasAnim  = low.includes('animation') || low.includes('@keyframes') || low.includes('transition');
  var isResp   = low.includes('responsive') || low.includes('@media') || low.includes('grid') || low.includes('flex');
  var hasDark  = low.includes('dark') || low.includes('#0f172a') || low.includes('#020617');

  var seo = Math.max(0, 100 - (!hasTitle?25:0) - (!hasMeta?20:0) - (!hasLang?15:0) - (!hasAlt?15:0) - (!hasViewport?15:0) - (!hasDoctype?10:0));
  var perf = Math.max(0, 100 - (scripts*12) - (imgs*8) - (renderMs > 200 ? 20 : 0) - (inlineStyles > 30 ? 15 : 0));
  var polish = Math.round((hasAnim?20:0)+(isResp?25:0)+(hasDark?15:0)+(hasFontLink?15:0)+(classes > 5 ? 15:0)+(buttons > 0 ? 10:0));

  // Detect project type
  var type = '🌐 Web Page';
  if (low.includes('three.js') || low.includes('scene')) type = '🎲 3D App';
  else if (low.includes('dashboard') || low.includes('analytics')) type = '📊 Dashboard';
  else if (low.includes('shop') || low.includes('cart')) type = '🛒 E-commerce';
  else if (low.includes('canvas')) type = '🎨 Canvas App';
  else if (low.includes('portfolio')) type = '🎭 Portfolio';
  else if (low.includes('blog')) type = '✍️ Blog';

  return { lines, chars, kb, tags, scripts, styles, imgs, links, buttons, forms, classes, ids,
           inlineStyles, renderMs: Math.round(renderMs), complexity, seo, perf, polish, type };
}

function getScoreColor(val) {
  if (val >= 80) return '#10b981';
  if (val >= 60) return '#f59e0b';
  return '#ef4444';
}

function renderBar(val, color) {
  return '<div style="background:#1e293b;border-radius:4px;height:6px;overflow:hidden;margin-top:3px;">' +
    '<div style="width:' + Math.min(100,val) + '%;height:100%;background:' + color + ';border-radius:4px;transition:width 0.5s;"></div></div>';
}

function updatePanel() {
  var panel = document.getElementById('chd-panel');
  if (!panel || !PANEL_OPEN) return;

  var code = window.editor ? window.editor.getValue() : '';
  var m = computeMetrics(code);

  var content = document.getElementById('chd-content');
  if (!content) return;

  if (!m) {
    content.innerHTML = '<div style="padding:15px;text-align:center;color:#475569;font-size:11px;">' +
      (window.lang==='fr'?'Écrivez du code pour voir les métriques':'Write code to see metrics') + '</div>';
    return;
  }

  var isFr = window.lang === 'fr';

  content.innerHTML =
    // Type badge
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">' +
      '<span style="font-size:11px;font-weight:bold;color:#e2e8f0;">' + m.type + '</span>' +
      '<span style="font-size:9px;background:#1e293b;padding:2px 8px;border-radius:10px;color:#64748b;">' + m.kb + ' KB</span>' +
    '</div>' +

    // Score bars
    '<div style="display:flex;flex-direction:column;gap:7px;margin-bottom:12px;">' +
      // SEO
      '<div><div style="display:flex;justify-content:space-between;font-size:9px;"><span style="color:#64748b;">SEO</span><span style="color:' + getScoreColor(m.seo) + ';font-weight:bold;">' + m.seo + '/100</span></div>' + renderBar(m.seo, getScoreColor(m.seo)) + '</div>' +
      // Perf
      '<div><div style="display:flex;justify-content:space-between;font-size:9px;"><span style="color:#64748b;">' + (isFr?'Performance':'Performance') + '</span><span style="color:' + getScoreColor(m.perf) + ';font-weight:bold;">' + m.perf + '/100</span></div>' + renderBar(m.perf, getScoreColor(m.perf)) + '</div>' +
      // Polish
      '<div><div style="display:flex;justify-content:space-between;font-size:9px;"><span style="color:#64748b;">Polish</span><span style="color:' + getScoreColor(m.polish) + ';font-weight:bold;">' + Math.min(100,m.polish) + '/100</span></div>' + renderBar(Math.min(100,m.polish), getScoreColor(m.polish)) + '</div>' +
    '</div>' +

    // Stats grid
    '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:10px;">' +
      statBox(m.lines, isFr?'Lignes':'Lines', '#60a5fa') +
      statBox(m.tags, 'Tags', '#a78bfa') +
      statBox(m.scripts, 'Scripts', '#f472b6') +
      statBox(m.imgs, 'Images', '#fb923c') +
      statBox(m.buttons, 'Buttons', '#34d399') +
      statBox(m.forms, 'Forms', '#fbbf24') +
    '</div>' +

    // Render estimate
    '<div style="background:#1e293b;border-radius:6px;padding:8px;border:1px solid #334155;font-size:9px;color:#64748b;">' +
      '<div style="display:flex;justify-content:space-between;margin-bottom:4px;">' +
        '<span>' + (isFr?'Temps de rendu estimé':'Est. render time') + '</span>' +
        '<span style="color:' + (m.renderMs < 150 ? '#10b981' : m.renderMs < 300 ? '#f59e0b' : '#ef4444') + ';font-weight:bold;">' + m.renderMs + 'ms</span>' +
      '</div>' +
      '<div style="display:flex;justify-content:space-between;">' +
        '<span>' + (isFr?'Complexité':'Complexity') + '</span>' +
        '<span style="color:' + getScoreColor(100-m.complexity) + ';font-weight:bold;">' + (m.complexity < 30 ? '✅ Simple' : m.complexity < 60 ? '🟡 Medium' : '🔴 Complex') + '</span>' +
      '</div>' +
    '</div>';
}

function statBox(val, label, color) {
  return '<div style="background:#1e293b;border-radius:6px;padding:6px;text-align:center;border:1px solid #334155;">' +
    '<div style="font-size:14px;font-weight:900;color:' + color + ';">' + val + '</div>' +
    '<div style="font-size:8px;color:#64748b;margin-top:1px;">' + label + '</div>' +
  '</div>';
}

function buildPanel() {
  if (document.getElementById('chd-panel')) return;

  // Toggle button in top toolbar or floating
  var toggleBtn = document.createElement('button');
  toggleBtn.id = 'chd-toggle';
  toggleBtn.title = 'Code Health Dashboard';
  toggleBtn.style = 'position:fixed;top:60px;right:10px;background:linear-gradient(135deg,#10b981,#059669);color:#fff;border:none;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:14px;z-index:99998;box-shadow:0 4px 12px rgba(16,185,129,0.4);display:flex;align-items:center;justify-content:center;transition:all 0.3s;';
  toggleBtn.textContent = '📊';
  toggleBtn.onmouseover = function(){this.style.transform='scale(1.1)';};
  toggleBtn.onmouseout  = function(){this.style.transform='scale(1)';};
  toggleBtn.onclick = togglePanel;

  // Panel
  var panel = document.createElement('div');
  panel.id = 'chd-panel';
  panel.style = 'position:fixed;top:105px;right:10px;width:220px;background:#0f172a;border:1px solid rgba(16,185,129,0.3);border-radius:12px;box-shadow:0 15px 40px rgba(0,0,0,0.5);z-index:99997;overflow:hidden;display:none;font-family:sans-serif;';

  var panelHdr = document.createElement('div');
  panelHdr.style = 'background:linear-gradient(90deg,#059669,#10b981);padding:10px 14px;display:flex;align-items:center;justify-content:space-between;';
  panelHdr.innerHTML = '<div style="display:flex;align-items:center;gap:6px;"><span style="font-size:14px;">📊</span><span style="font-size:11px;font-weight:900;color:#fff;">Code Health</span></div>' +
    '<div style="display:flex;align-items:center;gap:6px;">' +
    '<div id="chd-live" style="width:6px;height:6px;background:#fff;border-radius:50%;animation:pulse 2s infinite;"></div>' +
    '<span style="font-size:8px;color:rgba(255,255,255,0.7);">LIVE</span>' +
    '</div>';

  var content = document.createElement('div');
  content.id = 'chd-content';
  content.style = 'padding:12px;';

  panel.appendChild(panelHdr);
  panel.appendChild(content);

  document.body.appendChild(toggleBtn);
  document.body.appendChild(panel);

  // Add pulse animation
  var style = document.createElement('style');
  style.textContent = '@keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.3;}}';
  document.head.appendChild(style);
}

function togglePanel() {
  PANEL_OPEN = !PANEL_OPEN;
  var panel = document.getElementById('chd-panel');
  var btn = document.getElementById('chd-toggle');
  if (panel) panel.style.display = PANEL_OPEN ? 'block' : 'none';
  if (btn) {
    btn.style.background = PANEL_OPEN ? 'linear-gradient(135deg,#ef4444,#b91c1c)' : 'linear-gradient(135deg,#10b981,#059669)';
    btn.textContent = PANEL_OPEN ? '✕' : '📊';
  }
  if (PANEL_OPEN) {
    updatePanel();
    if (!INTERVAL_ID) INTERVAL_ID = setInterval(updatePanel, 2000);
  } else {
    if (INTERVAL_ID) { clearInterval(INTERVAL_ID); INTERVAL_ID = null; }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(buildPanel, 1000);
  // Auto-open after 3s on first load
  setTimeout(function() {
    if (!PANEL_OPEN && window.editor) togglePanel();
  }, 3000);
});
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(buildPanel, 1000);
}

window.CodeHealthDashboard = { toggle: togglePanel, update: updatePanel };
})();
