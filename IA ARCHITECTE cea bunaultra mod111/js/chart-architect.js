/**
 * Chart Architect v1.0 — EN/FR
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: 'Charts', title: '📊 Chart Architect', sub: 'Data Visualization',
    desc: 'Inject beautiful, CSS/SVG only charts without heavy external libraries.',
    pie: '🍩 Donut Chart', pieDesc: 'A circular progress chart (75% completed).',
    bar: '📈 Bar Chart', barDesc: 'A clean 5-column bar chart for statistics.',
    inject: '➕ Inject Chart',
    injected: '✅ Chart injected successfully!'
  },
  fr: {
    tab: 'Graphiques', title: '📊 Architecte de Graphes', sub: 'Visualisation de Données',
    desc: 'Injectez de superbes graphiques CSS/SVG sans bibliothèques externes lourdes.',
    pie: '🍩 Graphique Anneau', pieDesc: 'Un graphique de progression circulaire (75%).',
    bar: '📈 Graphique à Barres', barDesc: 'Un graphique à 5 colonnes pour les statistiques.',
    inject: '➕ Injecter le Graphique',
    injected: '✅ Graphique injecté avec succès !'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var CHARTS = {
  pie: '\\n<!-- 📊 Donut Chart -->\\n' +
       '<div style="width:150px; height:150px; border-radius:50%; background:conic-gradient(#3b82f6 0% 75%, #e2e8f0 75% 100%); display:flex; align-items:center; justify-content:center; box-shadow:0 4px 6px rgba(0,0,0,0.1); margin: 20px auto;">\\n' +
       '  <div style="width:110px; height:110px; border-radius:50%; background:#ffffff; display:flex; flex-direction:column; align-items:center; justify-content:center; font-family:sans-serif;">\\n' +
       '    <strong style="font-size:24px; color:#0f172a;">75%</strong>\\n' +
       '    <span style="font-size:12px; color:#64748b;">Growth</span>\\n' +
       '  </div>\\n' +
       '</div>\\n',
  bar: '\\n<!-- 📊 Bar Chart -->\\n' +
       '<div style="width:300px; height:200px; border-left:2px solid #cbd5e1; border-bottom:2px solid #cbd5e1; display:flex; align-items:flex-end; gap:15px; padding:0 20px; margin: 20px auto; font-family:sans-serif;">\\n' +
       '  <div style="width:30px; height:40%; background:#3b82f6; border-radius:4px 4px 0 0; position:relative;"><span style="position:absolute; bottom:-25px; left:0; width:100%; text-align:center; font-size:12px; color:#64748b;">M</span></div>\\n' +
       '  <div style="width:30px; height:60%; background:#3b82f6; border-radius:4px 4px 0 0; position:relative;"><span style="position:absolute; bottom:-25px; left:0; width:100%; text-align:center; font-size:12px; color:#64748b;">T</span></div>\\n' +
       '  <div style="width:30px; height:30%; background:#3b82f6; border-radius:4px 4px 0 0; position:relative;"><span style="position:absolute; bottom:-25px; left:0; width:100%; text-align:center; font-size:12px; color:#64748b;">W</span></div>\\n' +
       '  <div style="width:30px; height:80%; background:#10b981; border-radius:4px 4px 0 0; position:relative;"><span style="position:absolute; bottom:-25px; left:0; width:100%; text-align:center; font-size:12px; color:#64748b;">T</span></div>\\n' +
       '  <div style="width:30px; height:50%; background:#3b82f6; border-radius:4px 4px 0 0; position:relative;"><span style="position:absolute; bottom:-25px; left:0; width:100%; text-align:center; font-size:12px; color:#64748b;">F</span></div>\\n' +
       '</div>\\n'
};

function injectChart(id) {
  if(!window.editor) return;
  var code = window.editor.getValue();
  var snippet = CHARTS[id];
  if(!snippet) return;

  if(code.includes('</body>')) {
    code = code.replace('</body>', snippet + '\\n</body>');
  } else {
    code += '\\n' + snippet;
  }
  
  window.editor.setValue(code);
  if(window.runPreview) window.runPreview();
  if(window.showToast) window.showToast(t('injected'));
}

function renderTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(14,165,233,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#7dd3fc;">' + t('title') + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:15px;';

  var desc = document.createElement('div');
  desc.style = 'font-size:11px;color:#94a3b8;line-height:1.5;margin-bottom:5px;';
  desc.textContent = t('desc');
  body.appendChild(desc);

  function createBlock(id, icon, titleKey, descKey) {
    var sec = document.createElement('div');
    sec.style = 'background:rgba(14,165,233,0.05);border:1px solid rgba(14,165,233,0.15);border-radius:8px;padding:12px;';
    var h = document.createElement('div');
    h.style = 'display:flex;align-items:center;gap:8px;margin-bottom:6px;';
    h.innerHTML = '<span style="font-size:16px;">' + icon + '</span><span style="font-size:12px;font-weight:bold;color:#7dd3fc;">' + t(titleKey) + '</span>';
    sec.appendChild(h);
    var d = document.createElement('div');
    d.style = 'font-size:10px;color:#94a3b8;margin-bottom:10px;';
    d.textContent = t(descKey);
    sec.appendChild(d);
    var btn = document.createElement('button');
    btn.textContent = t('inject');
    btn.style = 'width:100%;background:rgba(14,165,233,0.2);border:1px solid rgba(14,165,233,0.4);border-radius:6px;padding:8px;color:#fff;font-weight:bold;font-size:10px;cursor:pointer;';
    btn.onclick = function() { injectChart(id); };
    sec.appendChild(btn);
    return sec;
  }

  body.appendChild(createBlock('pie', '🍩', 'pie', 'pieDesc'));
  body.appendChild(createBlock('bar', '📈', 'bar', 'barDesc'));

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-chartarch');
    if(el) el.textContent = t('tab');
    if(window.activeTab==='chartarch') renderTab();
  };

  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='chartarch') {
      window.activeTab = 'chartarch';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn = document.getElementById('tab-chartarch');
      if(btn) btn.classList.add('active');
      renderTab();
      return;
    }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
