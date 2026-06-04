/**
 * Breakpoint Tester v1.0 — EN/FR
 */
(function () {
'use strict';
var TX = {
  en: { tab: 'Breakpoints', title: '📏 Breakpoint Tester', sub: 'Test on 5 real screen sizes',
    desc: 'Resize the preview to real device widths instantly. No graphics, just pure pixel accuracy.',
    current: 'Current: ', px: 'px' },
  fr: { tab: 'Points de Rupture', title: '📏 Testeur de Points de Rupture', sub: 'Testez sur 5 tailles d ecran reelles',
    desc: 'Redimensionnez l apercu aux largeurs d appareils reels instantanement.',
    current: 'Actuel: ', px: 'px' }
};
function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var DEVICES = [
  { name: 'iPhone SE',  icon: '📱', width: 375,  color: '#f87171' },
  { name: 'iPhone 14',  icon: '📱', width: 390,  color: '#fb923c' },
  { name: 'iPad',       icon: '📟', width: 768,  color: '#fbbf24' },
  { name: 'Laptop',     icon: '💻', width: 1280, color: '#4ade80' },
  { name: '4K',         icon: '🖥️', width: 1920, color: '#38bdf8' }
];

function applyBreakpoint(width, currentEl) {
  var frame = document.getElementById('preview-iframe') || document.querySelector('#right-panel iframe');
  if (!frame) return;
  var container = frame.parentElement;
  if (!container) return;
  if (width === 0) {
    frame.style.width = '';
    frame.style.maxWidth = '';
    frame.style.margin = '';
    frame.style.transform = '';
    frame.style.transformOrigin = '';
  } else {
    frame.style.width = width + 'px';
    frame.style.maxWidth = width + 'px';
    frame.style.margin = '0 auto';
    frame.style.display = 'block';
  }
  if (currentEl) currentEl.textContent = t('current') + (width || 'auto') + (width ? t('px') : '');
}

function renderBreakpointTab() {
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

  var currentEl = document.createElement('div');
  currentEl.style.cssText = 'font-size:12px;font-weight:700;color:#38bdf8;text-align:center;padding:8px;background:rgba(56,189,248,0.05);border-radius:6px;';
  currentEl.textContent = t('current') + 'auto';
  body.appendChild(currentEl);

  /* Visual width bar */
  var barWrap = document.createElement('div');
  barWrap.style.cssText = 'position:relative;height:24px;background:#0f172a;border-radius:4px;overflow:hidden;border:1px solid #1e293b;';
  DEVICES.forEach(function (d) {
    var pct = Math.min((d.width / 1920) * 100, 100);
    var marker = document.createElement('div');
    marker.style.cssText = 'position:absolute;top:0;bottom:0;width:2px;background:' + d.color + ';opacity:0.5;left:' + pct + '%;';
    barWrap.appendChild(marker);
  });
  body.appendChild(barWrap);

  DEVICES.forEach(function (d) {
    var card = document.createElement('div');
    card.style.cssText = 'background:#1e293b;border:1px solid #334155;border-radius:10px;padding:12px;cursor:pointer;transition:border-color .15s,background .15s;display:flex;align-items:center;gap:12px;';
    card.onmouseenter = function () { card.style.borderColor = d.color; card.style.background = d.color + '11'; };
    card.onmouseleave = function () { card.style.borderColor = '#334155'; card.style.background = '#1e293b'; };

    var iconEl = document.createElement('div');
    iconEl.style.cssText = 'font-size:22px;flex-shrink:0;';
    iconEl.textContent = d.icon;
    card.appendChild(iconEl);

    var info = document.createElement('div');
    info.style.cssText = 'flex:1;';
    var nameEl = document.createElement('div');
    nameEl.style.cssText = 'font-size:12px;font-weight:700;color:' + d.color + ';';
    nameEl.textContent = d.name;
    var wEl = document.createElement('div');
    wEl.style.cssText = 'font-size:10px;color:#64748b;margin-top:2px;';
    wEl.textContent = d.width + 'px wide';
    info.appendChild(nameEl);
    info.appendChild(wEl);
    card.appendChild(info);

    /* Width bar mini indicator */
    var pct = Math.min((d.width / 1920) * 100, 100);
    var mini = document.createElement('div');
    mini.style.cssText = 'width:40px;height:20px;border:1px solid ' + d.color + '44;border-radius:3px;position:relative;overflow:hidden;flex-shrink:0;';
    var fill = document.createElement('div');
    fill.style.cssText = 'position:absolute;left:0;top:0;bottom:0;width:' + pct + '%;background:' + d.color + '33;';
    mini.appendChild(fill);
    card.appendChild(mini);

    card.onclick = function () { applyBreakpoint(d.width, currentEl); };
    body.appendChild(card);
  });

  var resetBtn = document.createElement('button');
  resetBtn.textContent = '↺ Reset to Full Width';
  resetBtn.style.cssText = 'width:100%;background:rgba(100,116,139,0.15);border:1px solid rgba(100,116,139,0.3);border-radius:8px;padding:9px;color:#94a3b8;font-weight:700;font-size:10px;cursor:pointer;margin-top:4px;';
  resetBtn.onclick = function () { applyBreakpoint(0, currentEl); };
  body.appendChild(resetBtn);

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function () {
  var oAL = window.applyLang;
  window.applyLang = function () {
    if (typeof oAL === 'function') oAL();
    var el = document.getElementById('lbl-tab-breakpoints');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'breakpoints') renderBreakpointTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'breakpoints') {
      window.activeTab = 'breakpoints';
      document.querySelectorAll('.ltab').forEach(function (b) { b.classList.remove('active'); });
      var btn = document.getElementById('tab-breakpoints');
      if (btn) btn.classList.add('active');
      renderBreakpointTab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
