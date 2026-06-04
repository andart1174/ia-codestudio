/**
 * Spacing Audit v1.0 — Visual Box Model Inspector
 * Overlays margin / padding / border highlights on the live preview.
 * EN / FR only.
 */
(function () {
  'use strict';

  var TX = {
    en: {
      tab:      'Spacing Audit',
      title:    '📐 Spacing Audit',
      sub:      'Visual Box Model Inspector',
      desc:     'Highlights every element\'s padding (green), margin (orange) and border (blue) directly in the live preview — like DevTools, without leaving the editor.',
      activate: '🔍 Show Box Model',
      clear:    '✖ Clear Overlay',
      legend:   'Legend',
      padding:  'Padding',
      margin:   'Margin',
      border:   'Border',
      active:   '✅ Overlay active — hover elements in preview!',
      cleared:  '✖ Overlay removed.'
    },
    fr: {
      tab:      'Audit Espacements',
      title:    '📐 Audit Espacements',
      sub:      'Inspecteur Visuel Box Model',
      desc:     'Met en evidence le padding (vert), la marge (orange) et la bordure (bleu) de chaque element dans la previsualisation — comme DevTools sans quitter l editeur.',
      activate: '🔍 Afficher Box Model',
      clear:    '✖ Effacer',
      legend:   'Legende',
      padding:  'Padding',
      margin:   'Marge',
      border:   'Bordure',
      active:   '✅ Overlay actif — survolez les elements dans la previsualisation !',
      cleared:  '✖ Overlay supprime.'
    }
  };

  function gl() { return window.lang || 'en'; }
  function t(k) { return (TX[gl()] || TX.en)[k] || k; }

  var STYLE_ID = 'ia-spacing-audit-style';
  var isActive = false;

  var INJECT_CSS = [
    '<style id="' + STYLE_ID + '">',
    '/* IA Spacing Audit Overlay */',
    'body * { box-sizing: border-box !important; }',
    'body *:hover {',
    '  outline: 2px solid rgba(59,130,246,0.9) !important;',
    '  outline-offset: 0px !important;',
    '}',
    '.ia-box-tooltip {',
    '  position: fixed !important;',
    '  z-index: 999999 !important;',
    '  background: #0f172a !important;',
    '  color: #e2e8f0 !important;',
    '  font: 11px/1.5 monospace !important;',
    '  padding: 6px 10px !important;',
    '  border-radius: 6px !important;',
    '  border: 1px solid #334155 !important;',
    '  pointer-events: none !important;',
    '  white-space: pre !important;',
    '  box-shadow: 0 4px 12px rgba(0,0,0,0.4) !important;',
    '}',
    '</style>',
    '<script>',
    '(function(){',
    '  var tip = document.createElement("div");',
    '  tip.className = "ia-box-tooltip";',
    '  tip.style.display = "none";',
    '  document.body.appendChild(tip);',
    '  document.addEventListener("mouseover", function(e){',
    '    var el = e.target;',
    '    if(!el || el === document.body || el.classList.contains("ia-box-tooltip")) return;',
    '    var cs = window.getComputedStyle(el);',
    '    var rect = el.getBoundingClientRect();',
    '    tip.textContent =',
    '      el.tagName.toLowerCase() + (el.id ? "#"+el.id : "") + (el.className && typeof el.className === "string" ? "."+el.className.trim().split(" ")[0] : "") + "\\n" +',
    '      "W: " + Math.round(rect.width) + "px  H: " + Math.round(rect.height) + "px\\n" +',
    '      "Padding T/R/B/L: " + cs.paddingTop + " " + cs.paddingRight + " " + cs.paddingBottom + " " + cs.paddingLeft + "\\n" +',
    '      "Margin  T/R/B/L: " + cs.marginTop + " " + cs.marginRight + " " + cs.marginBottom + " " + cs.marginLeft + "\\n" +',
    '      "Border: " + cs.borderWidth + " " + cs.borderStyle;',
    '    tip.style.display = "block";',
    '  });',
    '  document.addEventListener("mousemove", function(e){',
    '    tip.style.left = (e.clientX + 14) + "px";',
    '    tip.style.top  = (e.clientY + 14) + "px";',
    '  });',
    '  document.addEventListener("mouseout", function(){',
    '    tip.style.display = "none";',
    '  });',
    '})();',
    '</script>'
  ].join('\n');

  function injectOverlay(statusEl) {
    if (!window.editor) return;
    var code = window.editor.getValue();

    if (code.indexOf(STYLE_ID) !== -1) {
      if (statusEl) statusEl.textContent = t('active');
      isActive = true;
      return;
    }

    if (code.indexOf('</body>') !== -1) {
      code = code.replace('</body>', '\n' + INJECT_CSS + '\n</body>');
    } else {
      code += '\n' + INJECT_CSS;
    }

    window.editor.setValue(code);
    if (window.runPreview) window.runPreview();
    isActive = true;
    if (statusEl) statusEl.textContent = t('active');
  }

  function clearOverlay(statusEl) {
    if (!window.editor) return;
    var code = window.editor.getValue();

    /* Remove everything between <style id="ia-spacing-audit-style"> and </style> + the <script> block */
    var startStyle = code.indexOf('<style id="' + STYLE_ID + '">');
    var endScript  = code.indexOf('</script>', startStyle);

    if (startStyle !== -1 && endScript !== -1) {
      code = code.slice(0, startStyle) + code.slice(endScript + 9);
      window.editor.setValue(code);
      if (window.runPreview) window.runPreview();
    }

    isActive = false;
    if (statusEl) statusEl.textContent = t('cleared');
  }

  /* ── Render Tab ── */
  function renderSpacingTab() {
    var parent = document.getElementById('left-body');
    if (!parent) return;
    parent.innerHTML = '';

    var wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

    /* Header */
    var hdr = document.createElement('div');
    hdr.style.cssText = 'padding:12px 14px 8px;border-bottom:1px solid rgba(59,130,246,0.25);flex-shrink:0;';
    hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#60a5fa;">' + t('title') + '</div>'
                  + '<div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
    wrap.appendChild(hdr);

    /* Body */
    var body = document.createElement('div');
    body.style.cssText = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:14px;';

    /* Description */
    var desc = document.createElement('div');
    desc.style.cssText = 'font-size:11px;color:#94a3b8;line-height:1.6;background:rgba(59,130,246,0.05);border:1px solid rgba(59,130,246,0.15);border-radius:8px;padding:10px;';
    desc.textContent = t('desc');
    body.appendChild(desc);

    /* Legend */
    var legend = document.createElement('div');
    legend.style.cssText = 'background:rgba(15,23,42,0.6);border:1px solid #1e293b;border-radius:8px;padding:10px;display:flex;flex-direction:column;gap:6px;';
    var legTitle = document.createElement('div');
    legTitle.style.cssText = 'font-size:10px;font-weight:700;color:#94a3b8;margin-bottom:2px;';
    legTitle.textContent = t('legend').toUpperCase();
    legend.appendChild(legTitle);

    function legRow(color, label) {
      var row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;gap:8px;';
      var dot = document.createElement('div');
      dot.style.cssText = 'width:14px;height:14px;border-radius:3px;background:' + color + ';flex-shrink:0;';
      var lbl = document.createElement('span');
      lbl.style.cssText = 'font-size:11px;color:#cbd5e1;';
      lbl.textContent = label;
      row.appendChild(dot);
      row.appendChild(lbl);
      return row;
    }
    legend.appendChild(legRow('rgba(34,197,94,0.6)',  t('padding') + ' — T/R/B/L'));
    legend.appendChild(legRow('rgba(249,115,22,0.6)', t('margin')  + ' — T/R/B/L'));
    legend.appendChild(legRow('rgba(59,130,246,0.9)', t('border')  + ' — hover outline'));
    body.appendChild(legend);

    /* Status */
    var statusEl = document.createElement('div');
    statusEl.style.cssText = 'font-size:11px;color:#fbbf24;min-height:18px;text-align:center;';
    body.appendChild(statusEl);

    /* Buttons */
    var btnRow = document.createElement('div');
    btnRow.style.cssText = 'display:flex;gap:8px;';

    var activateBtn = document.createElement('button');
    activateBtn.textContent = t('activate');
    activateBtn.style.cssText = 'flex:2;background:linear-gradient(135deg,#2563eb,#1d4ed8);border:none;border-radius:8px;padding:10px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;transition:opacity .2s;';
    activateBtn.onmouseenter = function () { activateBtn.style.opacity = '0.85'; };
    activateBtn.onmouseleave = function () { activateBtn.style.opacity = '1'; };
    activateBtn.onclick = function () { injectOverlay(statusEl); };
    btnRow.appendChild(activateBtn);

    var clearBtn = document.createElement('button');
    clearBtn.textContent = t('clear');
    clearBtn.style.cssText = 'flex:1;background:rgba(100,116,139,0.15);border:1px solid rgba(100,116,139,0.4);border-radius:8px;padding:10px;color:#94a3b8;font-weight:900;font-size:11px;cursor:pointer;transition:background .2s;';
    clearBtn.onmouseenter = function () { clearBtn.style.background = 'rgba(100,116,139,0.3)'; };
    clearBtn.onmouseleave = function () { clearBtn.style.background = 'rgba(100,116,139,0.15)'; };
    clearBtn.onclick = function () { clearOverlay(statusEl); };
    btnRow.appendChild(clearBtn);

    body.appendChild(btnRow);
    wrap.appendChild(body);
    parent.appendChild(wrap);
  }

  /* ── Hook into renderTab ── */
  document.addEventListener('DOMContentLoaded', function () {
    var oAL = window.applyLang;
    window.applyLang = function () {
      if (typeof oAL === 'function') oAL();
      var el = document.getElementById('lbl-tab-spacingaudit');
      if (el) el.textContent = t('tab');
      if (window.activeTab === 'spacingaudit') renderSpacingTab();
    };

    var oRT = window.renderTab;
    window.renderTab = function (tab) {
      if (tab === 'spacingaudit') {
        window.activeTab = 'spacingaudit';
        document.querySelectorAll('.ltab').forEach(function (b) { b.classList.remove('active'); });
        var btn = document.getElementById('tab-spacingaudit');
        if (btn) btn.classList.add('active');
        renderSpacingTab();
        return;
      }
      if (typeof oRT === 'function') oRT(tab);
    };
  });
})();
