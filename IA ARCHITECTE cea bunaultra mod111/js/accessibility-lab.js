/**
 * Accessibility Lab v1.0 — EN/FR
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: 'A11y', title: '🧪 Accessibility Lab', sub: 'WCAG checker & visual simulators',
    scan: '🔍 Scan Code', results: 'Scan Results', perfect: '✅ No major accessibility issues found!',
    filterLabel: 'Vision Simulator', fNone: 'Normal', fPro: 'Protanopia (No Red)', fDeu: 'Deuteranopia (No Green)', fTri: 'Tritanopia (No Blue)', fGray: 'Grayscale',
    errLang: 'Missing lang attribute on <html>',
    errAlt: 'Missing alt attribute on <img>',
    errForm: 'Input missing id or aria-label',
    errHead: 'Missing <h1> tag',
    info: 'Filter applies directly to Live Preview.'
  },
  fr: {
    tab: 'A11y', title: '🧪 Laboratoire Accessibilité', sub: 'Analyse WCAG & simulateurs',
    scan: '🔍 Analyser Code', results: 'Résultats', perfect: '✅ Aucun problème majeur d\'accessibilité !',
    filterLabel: 'Simulateur de Vision', fNone: 'Normal', fPro: 'Protanopie (Pas de Rouge)', fDeu: 'Deutéranopie (Pas de Vert)', fTri: 'Tritanopie (Pas de Bleu)', fGray: 'Nuances de Gris',
    errLang: 'Attribut lang manquant sur <html>',
    errAlt: 'Attribut alt manquant sur <img>',
    errForm: 'Input sans id ni aria-label',
    errHead: 'Balise <h1> manquante',
    info: 'Le filtre s\'applique au Live Preview.'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var state = { filter: 'none', issues: null };

function applyFilter() {
  var fr = document.getElementById('preview-frame');
  if(!fr) return;
  // Use SVG filters or CSS filters
  var css = '';
  if (state.filter === 'protanopia') css = 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="p"><feColorMatrix type="matrix" values="0.567,0.433,0,0,0 0.558,0.442,0,0,0 0,0.242,0.758,0,0 0,0,0,1,0"/></filter></svg>#p\')';
  else if (state.filter === 'deuteranopia') css = 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="d"><feColorMatrix type="matrix" values="0.625,0.375,0,0,0 0.7,0.3,0,0,0 0,0.3,0.7,0,0 0,0,0,1,0"/></filter></svg>#d\')';
  else if (state.filter === 'tritanopia') css = 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="t"><feColorMatrix type="matrix" values="0.95,0.05,0,0,0 0,0.433,0.567,0,0 0,0.475,0.525,0,0 0,0,0,1,0"/></filter></svg>#t\')';
  else if (state.filter === 'grayscale') css = 'grayscale(100%)';
  
  fr.style.filter = css;
}

function scanCode() {
  if(!window.editor) return;
  var code = window.editor.getValue().toLowerCase();
  var issues = [];
  
  if(code.includes('<html') && !code.includes('lang=')) issues.push(t('errLang'));
  if((code.match(/<img[^>]*>/g)||[]).some(function(i){return !i.includes('alt=');})) issues.push(t('errAlt'));
  if((code.match(/<input[^>]*>/g)||[]).some(function(i){return !i.includes('id=') && !i.includes('aria-label=') && !i.includes('type="submit"');})) issues.push(t('errForm'));
  if(code.includes('<body') && !code.includes('<h1')) issues.push(t('errHead'));
  
  state.issues = issues;
  renderA11yTab();
}

function renderA11yTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(236,72,153,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#f472b6;">' + t('title') + '</div><div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;';

  // Scanner
  var btn = document.createElement('button');
  btn.textContent = t('scan');
  btn.style = 'width:100%;background:linear-gradient(135deg,#ec4899,#db2777);border:none;border-radius:8px;padding:10px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;margin-bottom:15px;';
  btn.onclick = scanCode;
  body.appendChild(btn);

  // Results
  if(state.issues !== null) {
    var res = document.createElement('div');
    res.style = 'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;margin-bottom:20px;';
    var rHdr = document.createElement('div');
    rHdr.style = 'font-size:9px;font-weight:900;color:#64748b;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;';
    rHdr.textContent = t('results');
    res.appendChild(rHdr);

    if(state.issues.length === 0) {
      res.innerHTML += '<div style="font-size:11px;color:#10b981;font-weight:700;">' + t('perfect') + '</div>';
    } else {
      state.issues.forEach(function(iss) {
        var err = document.createElement('div');
        err.style = 'font-size:10px;color:#fca5a5;margin-bottom:6px;display:flex;gap:6px;align-items:center;';
        err.innerHTML = '<span style="color:#ef4444;font-size:12px;">✖</span> ' + iss;
        res.appendChild(err);
      });
    }
    body.appendChild(res);
  }

  // Vision Simulator
  var sim = document.createElement('div');
  sim.style = 'background:rgba(236,72,153,0.05);border:1px solid rgba(236,72,153,0.15);border-radius:8px;padding:12px;';
  var sHdr = document.createElement('div');
  sHdr.style = 'font-size:9px;font-weight:900;color:#f472b6;letter-spacing:1px;text-transform:uppercase;margin-bottom:10px;';
  sHdr.textContent = t('filterLabel');
  sim.appendChild(sHdr);

  var select = document.createElement('select');
  select.style = 'width:100%;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:8px;color:#fff;font-size:11px;outline:none;margin-bottom:8px;';
  var opts = [
    {v:'none', l:t('fNone')}, {v:'protanopia', l:t('fPro')}, 
    {v:'deuteranopia', l:t('fDeu')}, {v:'tritanopia', l:t('fTri')}, 
    {v:'grayscale', l:t('fGray')}
  ];
  opts.forEach(function(o) {
    var opt = document.createElement('option'); opt.value = o.v; opt.textContent = o.l;
    if(state.filter === o.v) opt.selected = true;
    select.appendChild(opt);
  });
  select.onchange = function() { state.filter = select.value; applyFilter(); };
  sim.appendChild(select);

  var info = document.createElement('div');
  info.style = 'font-size:9px;color:#94a3b8;font-style:italic;';
  info.textContent = t('info');
  sim.appendChild(info);

  body.appendChild(sim);
  wrap.appendChild(body);
  parent.appendChild(wrap);
  
  applyFilter(); // Ensure filter applies if switching tabs
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-a11y');
    if(el) el.textContent = t('tab');
    if(window.activeTab==='a11y') renderA11yTab();
  };

  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='a11y') {
      window.activeTab = 'a11y';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn = document.getElementById('tab-a11y');
      if(btn) btn.classList.add('active');
      renderA11yTab();
      return;
    }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
