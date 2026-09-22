/**
 * Responsive Preview Matrix v1.0 — EN/FR
 * Shows preview of your app on 6 devices simultaneously
 */
(function () {
  'use strict';

  var TX = {
    en: {
      tab: 'Matrix',
      title: '📱 Responsive Preview Matrix',
      sub: 'Preview on 6 devices simultaneously',
      btnRefresh: '🔄 Refresh All',
      btnExport: '📸 Screenshot All',
      desc: 'See how your app looks across all major device sizes at once.',
      devices: 'Devices:',
      allDevices: 'All 6 Devices',
      refreshed: '✅ All previews refreshed!',
      noCode: '⚠️ Write HTML in the editor first.',
      screenshot: '📸 Use your browser\'s screenshot tool to capture.',
      openFull: '⛶ Open Full Matrix',
      closeFull: '✕ Close'
    },
    fr: {
      tab: 'Matrix',
      title: '📱 Matrix de Prévisualisation',
      sub: 'Prévisualisez sur 6 appareils simultanément',
      btnRefresh: '🔄 Actualiser Tout',
      btnExport: '📸 Capturer Tout',
      desc: 'Voyez votre app sur tous les appareils en même temps.',
      devices: 'Appareils :',
      allDevices: 'Les 6 Appareils',
      refreshed: '✅ Tous les aperçus actualisés !',
      noCode: '⚠️ Écrivez du HTML dans l\'éditeur d\'abord.',
      screenshot: '📸 Utilisez l\'outil de capture de votre navigateur.',
      openFull: '⛶ Ouvrir la Matrix Complète',
      closeFull: '✕ Fermer'
    }
  };

  function gl() { return window.lang || 'en'; }
  function t(k) { return (TX[gl()] || TX.en)[k] || k; }

  var DEVICES = [
    { id: 'iphone-se',    label: 'iPhone SE',      width: 375,  height: 667,  icon: '📱', color: '#6366f1' },
    { id: 'iphone-15',   label: 'iPhone 15 Pro',  width: 393,  height: 852,  icon: '📱', color: '#8b5cf6' },
    { id: 'pixel-7',     label: 'Pixel 7',         width: 412,  height: 915,  icon: '📱', color: '#06b6d4' },
    { id: 'ipad-air',    label: 'iPad Air',        width: 820,  height: 1180, icon: '📲', color: '#10b981' },
    { id: 'desktop-hd',  label: 'Desktop 1080p',  width: 1920, height: 1080, icon: '🖥️', color: '#f59e0b' },
    { id: 'desktop-4k',  label: '4K UHD',          width: 3840, height: 2160, icon: '🖥️', color: '#ef4444' }
  ];

  var matrixOverlay = null;

  function getCode() {
    if (!window.editor) return '';
    return window.editor.getValue();
  }

  function buildIframe(device, scale) {
    var iframe = document.createElement('iframe');
    iframe.style.cssText = [
      'width:' + device.width + 'px',
      'height:' + device.height + 'px',
      'border:none',
      'transform:scale(' + scale + ')',
      'transform-origin:top left',
      'background:#fff',
      'display:block',
      'pointer-events:none'
    ].join(';');
    iframe.sandbox = 'allow-scripts allow-same-origin allow-forms allow-modals allow-popups';
    return iframe;
  }

  function loadIframe(iframe, code) {
    var blob = new Blob([code], { type: 'text/html' });
    var url = URL.createObjectURL(blob);
    iframe.onload = function() { URL.revokeObjectURL(url); };
    iframe.src = url;
  }

  /* ── FULL MATRIX OVERLAY ── */
  function openMatrix() {
    var code = getCode();
    if (!code.trim()) { if (window.showToast) window.showToast(t('noCode')); return; }

    if (matrixOverlay) { matrixOverlay.remove(); matrixOverlay = null; }

    var overlay = document.createElement('div');
    overlay.id = 'rpm-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#080c14;z-index:99999;display:flex;flex-direction:column;overflow:hidden;font-family:Inter,sans-serif;';
    matrixOverlay = overlay;

    /* Top bar */
    var topBar = document.createElement('div');
    topBar.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:12px 20px;background:rgba(255,255,255,0.03);border-bottom:1px solid rgba(255,255,255,0.08);flex-shrink:0;';
    topBar.innerHTML = '<div style="display:flex;align-items:center;gap:12px;">' +
      '<span style="font-size:18px;font-weight:900;color:#fff;letter-spacing:0.5px;">📱 ' + t('title') + '</span>' +
      '<span style="font-size:11px;color:#64748b;border:1px solid rgba(255,255,255,0.1);padding:3px 10px;border-radius:20px;">' + t('sub') + '</span>' +
      '</div>' +
      '<div style="display:flex;gap:10px;align-items:center;">' +
      '<button id="rpm-refresh-all" style="padding:8px 16px;background:rgba(99,102,241,0.2);color:#a78bfa;border:1px solid rgba(99,102,241,0.4);border-radius:8px;font-size:11px;font-weight:700;cursor:pointer;">' + t('btnRefresh') + '</button>' +
      '<button id="rpm-close-btn" style="padding:8px 16px;background:rgba(239,68,68,0.15);color:#f87171;border:1px solid rgba(239,68,68,0.3);border-radius:8px;font-size:11px;font-weight:700;cursor:pointer;">' + t('closeFull') + '</button>' +
      '</div>';
    overlay.appendChild(topBar);

    /* Grid */
    var grid = document.createElement('div');
    grid.style.cssText = 'flex:1;overflow:auto;padding:20px;display:grid;grid-template-columns:repeat(3,1fr);gap:20px;align-items:start;';

    DEVICES.forEach(function(device) {
      /* Card */
      var card = document.createElement('div');
      card.style.cssText = 'background:#0d1117;border:1px solid rgba(255,255,255,0.07);border-radius:12px;overflow:hidden;display:flex;flex-direction:column;';

      /* Card header */
      var ch = document.createElement('div');
      ch.style.cssText = 'padding:10px 14px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.05);background:rgba(255,255,255,0.02);';
      ch.innerHTML = '<div style="display:flex;align-items:center;gap:8px;">' +
        '<span style="font-size:14px;">' + device.icon + '</span>' +
        '<span style="font-size:11px;font-weight:700;color:#e2e8f0;">' + device.label + '</span>' +
        '</div>' +
        '<span style="font-size:9px;color:#64748b;font-family:monospace;background:rgba(255,255,255,0.05);padding:3px 7px;border-radius:4px;">' + device.width + '×' + device.height + '</span>';

      /* Viewport wrapper */
      var vp = document.createElement('div');
      /* compute scale to fit ~340px container width */
      var containerW = 340;
      var scale = Math.min(containerW / device.width, 200 / device.height, 0.5);
      var scaledH = Math.round(device.height * scale);
      vp.style.cssText = 'overflow:hidden;position:relative;width:100%;height:' + (scaledH + 4) + 'px;background:#fff;';

      var iframe = buildIframe(device, scale);
      loadIframe(iframe, code);
      iframe.dataset.deviceId = device.id;

      vp.appendChild(iframe);
      card.appendChild(ch);
      card.appendChild(vp);

      /* Size badge */
      var badge = document.createElement('div');
      badge.style.cssText = 'padding:8px 14px;display:flex;gap:8px;align-items:center;';
      badge.innerHTML = '<div style="width:10px;height:10px;border-radius:50%;background:' + device.color + ';box-shadow:0 0 6px ' + device.color + ';flex-shrink:0;"></div>' +
        '<span style="font-size:9px;color:#64748b;">' + (device.width >= 1024 ? 'Desktop' : device.width >= 768 ? 'Tablet' : 'Mobile') + '</span>';
      card.appendChild(badge);

      grid.appendChild(card);
    });

    overlay.appendChild(grid);

    /* Close & Refresh handlers */
    overlay.querySelector('#rpm-close-btn').onclick = function() {
      overlay.remove(); matrixOverlay = null;
    };
    overlay.querySelector('#rpm-refresh-all').onclick = function() {
      var freshCode = getCode();
      overlay.querySelectorAll('iframe').forEach(function(fr) {
        loadIframe(fr, freshCode);
      });
      if (window.showToast) window.showToast(t('refreshed'));
    };

    document.body.appendChild(overlay);
  }

  /* ── MINI PANEL (left panel) ── */
  function renderTab() {
    var parent = document.getElementById('left-body');
    if (!parent) return;
    parent.innerHTML = '';

    var wrap = document.createElement('div');
    wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';

    /* Header */
    var hdr = document.createElement('div');
    hdr.style = 'padding:12px 14px 10px;border-bottom:1px solid rgba(59,130,246,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(59,130,246,0.1),rgba(99,102,241,0.06));';
    hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#60a5fa;letter-spacing:0.5px;">' + t('title') + '</div>' +
      '<div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
    wrap.appendChild(hdr);

    var body = document.createElement('div');
    body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';

    /* Description */
    var desc = document.createElement('div');
    desc.style = 'font-size:10px;color:#94a3b8;background:rgba(59,130,246,0.06);border:1px solid rgba(59,130,246,0.15);border-radius:6px;padding:8px 10px;line-height:1.5;';
    desc.textContent = t('desc');
    body.appendChild(desc);

    /* Device list */
    var devLabel = document.createElement('div');
    devLabel.style = 'font-size:10px;color:#64748b;font-weight:600;';
    devLabel.textContent = t('devices');
    body.appendChild(devLabel);

    var devList = document.createElement('div');
    devList.style = 'display:flex;flex-direction:column;gap:5px;';

    DEVICES.forEach(function(device) {
      var row = document.createElement('div');
      row.style = 'display:flex;align-items:center;justify-content:space-between;padding:7px 10px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:7px;';
      row.innerHTML = '<div style="display:flex;align-items:center;gap:8px;">' +
        '<span style="font-size:13px;">' + device.icon + '</span>' +
        '<div><div style="font-size:11px;font-weight:600;color:#e2e8f0;">' + device.label + '</div>' +
        '<div style="font-size:9px;color:#64748b;font-family:monospace;">' + device.width + '×' + device.height + '</div></div>' +
        '</div>' +
        '<div style="width:8px;height:8px;border-radius:50%;background:' + device.color + ';box-shadow:0 0 5px ' + device.color + ';"></div>';
      devList.appendChild(row);
    });
    body.appendChild(devList);

    /* Open Matrix button */
    var openBtn = document.createElement('button');
    openBtn.innerHTML = '⛶ ' + t('openFull');
    openBtn.style = 'width:100%;background:linear-gradient(135deg,#1d4ed8,#4f46e5);color:#fff;border:none;padding:14px;border-radius:10px;font-weight:900;font-size:12px;cursor:pointer;box-shadow:0 4px 20px rgba(29,78,216,0.4);letter-spacing:0.5px;transition:all 0.2s;margin-top:4px;';
    openBtn.onmouseover = function() { this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 30px rgba(29,78,216,0.6)'; };
    openBtn.onmouseout = function() { this.style.transform=''; this.style.boxShadow='0 4px 20px rgba(29,78,216,0.4)'; };
    openBtn.onclick = openMatrix;
    body.appendChild(openBtn);

    /* Mini preview grid 2×3 */
    var miniLabel = document.createElement('div');
    miniLabel.style = 'font-size:10px;color:#64748b;font-weight:600;margin-top:4px;';
    miniLabel.textContent = gl() === 'fr' ? 'Aperçu Rapide :' : 'Quick Preview:';
    body.appendChild(miniLabel);

    var miniGrid = document.createElement('div');
    miniGrid.style = 'display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;';

    DEVICES.forEach(function(device) {
      var cell = document.createElement('div');
      var scale = Math.min(80 / device.width, 100 / device.height);
      var h = Math.round(device.height * scale);
      cell.style = 'background:#0d1117;border:1px solid rgba(255,255,255,0.07);border-radius:6px;overflow:hidden;cursor:pointer;transition:border-color 0.2s;';
      cell.title = device.label + ' (' + device.width + '×' + device.height + ')';
      cell.onmouseover = function() { this.style.borderColor = device.color; };
      cell.onmouseout = function() { this.style.borderColor = 'rgba(255,255,255,0.07)'; };

      var labelDiv = document.createElement('div');
      labelDiv.style = 'padding:3px 4px;font-size:8px;color:#64748b;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;background:rgba(255,255,255,0.02);border-bottom:1px solid rgba(255,255,255,0.04);';
      labelDiv.textContent = device.icon + ' ' + device.label.split(' ')[0];

      var vpWrap = document.createElement('div');
      vpWrap.style = 'overflow:hidden;height:' + (h + 2) + 'px;position:relative;background:#fff;';

      var iframe = buildIframe(device, scale);
      var code = getCode();
      if (code.trim()) loadIframe(iframe, code);

      vpWrap.appendChild(iframe);
      cell.appendChild(labelDiv);
      cell.appendChild(vpWrap);
      cell.onclick = openMatrix;
      miniGrid.appendChild(cell);
    });
    body.appendChild(miniGrid);

    wrap.appendChild(body);
    parent.appendChild(wrap);
  }

  /* ── REGISTER ── */
  document.addEventListener('DOMContentLoaded', function () {
    var oAL = window.applyLang;
    window.applyLang = function () {
      if (typeof oAL === 'function') oAL();
      var el = document.getElementById('lbl-tab-respmatrix');
      if (el) el.textContent = t('tab');
      if (window.activeTab === 'respmatrix') renderTab();
    };

    var oRT = window.renderTab;
    window.renderTab = function (tab) {
      if (tab === 'respmatrix') {
        window.activeTab = 'respmatrix';
        document.querySelectorAll('.ltab').forEach(function (b) { b.classList.remove('active'); });
        var btn = document.getElementById('tab-respmatrix');
        if (btn) btn.classList.add('active');
        renderTab();
        return;
      }
      if (typeof oRT === 'function') oRT(tab);
    };
  });
})();
