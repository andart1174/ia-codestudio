/**
 * Color Harmony Studio v1.0 — EN/FR
 */
(function () {
'use strict';
var TX = {
  en: {
    tab: 'Color Harmony', title: '🌈 Color Harmony', sub: 'Generate harmonic palettes from one color',
    desc: 'Pick a base color and get 8 harmonious color schemes instantly. Click any swatch to copy.',
    base: 'Base Color', generate: '🌈 Generate Palette',
    inject: '➕ Inject as CSS Vars', injected: '✅ CSS variables injected!',
    copied: '✓ Copied!',
    schemes: ['Complementary','Triadic','Analogous','Split-Comp','Monochrome Light','Monochrome Dark','Warm Tint','Cool Tint']
  },
  fr: {
    tab: 'Harmonie Couleurs', title: '🌈 Harmonie des Couleurs', sub: 'Generez des palettes harmonieuses',
    desc: 'Choisissez une couleur de base et obtenez 8 schemes harmonieux instantanement.',
    base: 'Couleur de base', generate: '🌈 Generer la Palette',
    inject: '➕ Injecter en Variables CSS', injected: '✅ Variables CSS injectees !',
    copied: '✓ Copie !',
    schemes: ['Complementaire','Triadique','Analogue','Split-Comp','Monochrome Clair','Monochrome Sombre','Teinte Chaude','Teinte Froide']
  }
};
function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

/* ── Color math ── */
function hexToHSL(hex) {
  var r = parseInt(hex.slice(1,3),16)/255, g = parseInt(hex.slice(3,5),16)/255, b = parseInt(hex.slice(5,7),16)/255;
  var max = Math.max(r,g,b), min = Math.min(r,g,b), h, s, l = (max+min)/2;
  if (max === min) { h = s = 0; }
  else {
    var d = max - min; s = l > 0.5 ? d/(2-max-min) : d/(max+min);
    switch(max){ case r: h=(g-b)/d+(g<b?6:0); break; case g: h=(b-r)/d+2; break; default: h=(r-g)/d+4; }
    h /= 6;
  }
  return [Math.round(h*360), Math.round(s*100), Math.round(l*100)];
}
function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s)); l = Math.max(0, Math.min(100, l));
  s /= 100; l /= 100;
  var c = (1 - Math.abs(2*l - 1)) * s, x = c * (1 - Math.abs((h/60) % 2 - 1)), m = l - c/2;
  var r=0,g=0,b=0;
  if(h<60){r=c;g=x;}else if(h<120){r=x;g=c;}else if(h<180){g=c;b=x;}
  else if(h<240){g=x;b=c;}else if(h<300){r=x;b=c;}else{r=c;b=x;}
  return '#' + [r+m,g+m,b+m].map(function(v){ return Math.round(v*255).toString(16).padStart(2,'0'); }).join('');
}

function generateHarmony(hex) {
  var hsl = hexToHSL(hex);
  var h = hsl[0], s = hsl[1], l = hsl[2];
  return [
    hslToHex((h+180)%360, s, l),         /* Complementary */
    hslToHex((h+120)%360, s, l),         /* Triadic 1 */
    hslToHex((h+30)%360, s, l),          /* Analogous */
    hslToHex((h+150)%360, s, l),         /* Split-comp */
    hslToHex(h, s, Math.min(90, l+25)),  /* Monochrome Light */
    hslToHex(h, s, Math.max(10, l-25)),  /* Monochrome Dark */
    hslToHex((h+15)%360, Math.min(100,s+10), l), /* Warm tint */
    hslToHex((h-15+360)%360, Math.max(0,s-10), l) /* Cool tint */
  ];
}

function copyToClipboard(text, el) {
  var ta = document.createElement('textarea');
  ta.value = text; document.body.appendChild(ta); ta.select();
  document.execCommand('copy'); document.body.removeChild(ta);
  var orig = el.textContent; el.textContent = t('copied');
  setTimeout(function(){ el.textContent = orig; }, 1000);
}

function renderHarmonyTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';
  var hdr = document.createElement('div');
  hdr.style.cssText = 'padding:12px 14px 8px;border-bottom:1px solid rgba(168,85,247,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#c084fc;">' + t('title') + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);
  var body = document.createElement('div');
  body.style.cssText = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';
  var desc = document.createElement('div');
  desc.style.cssText = 'font-size:10px;color:#94a3b8;line-height:1.5;';
  desc.textContent = t('desc');
  body.appendChild(desc);

  /* Base color picker */
  var pickerRow = document.createElement('div');
  pickerRow.style.cssText = 'display:flex;align-items:center;gap:10px;background:#1e293b;border:1px solid #334155;border-radius:8px;padding:10px;';
  var lbl = document.createElement('label');
  lbl.style.cssText = 'font-size:11px;color:#94a3b8;flex:1;';
  lbl.textContent = t('base');
  var picker = document.createElement('input');
  picker.type = 'color'; picker.value = '#3b82f6';
  picker.style.cssText = 'width:44px;height:32px;border:none;border-radius:6px;cursor:pointer;background:none;padding:0;';
  var hexLbl = document.createElement('span');
  hexLbl.style.cssText = 'font-size:11px;font-family:monospace;color:#e2e8f0;';
  hexLbl.textContent = '#3b82f6';
  picker.oninput = function(){ hexLbl.textContent = picker.value; };
  pickerRow.appendChild(lbl); pickerRow.appendChild(picker); pickerRow.appendChild(hexLbl);
  body.appendChild(pickerRow);

  var statusEl = document.createElement('div');
  statusEl.style.cssText = 'font-size:11px;color:#4ade80;min-height:14px;text-align:center;';
  body.appendChild(statusEl);

  var paletteEl = document.createElement('div');
  paletteEl.style.cssText = 'display:flex;flex-direction:column;gap:6px;';
  body.appendChild(paletteEl);

  var lastColors = [];

  function renderPalette(base) {
    var harmony = generateHarmony(base);
    lastColors = [base].concat(harmony);
    paletteEl.innerHTML = '';
    var schemeNames = t('schemes');

    /* Base color row */
    var baseRow = document.createElement('div');
    baseRow.style.cssText = 'display:flex;align-items:center;gap:8px;padding:6px 8px;background:#1e293b;border-radius:6px;';
    var baseSwatch = document.createElement('div');
    baseSwatch.style.cssText = 'width:32px;height:20px;border-radius:4px;background:' + base + ';flex-shrink:0;border:1px solid rgba(255,255,255,0.1);cursor:pointer;';
    var baseLbl = document.createElement('div');
    baseLbl.style.cssText = 'font-size:10px;color:#94a3b8;flex:1;';
    baseLbl.textContent = 'Base';
    var baseHex = document.createElement('code');
    baseHex.style.cssText = 'font-size:10px;color:#e2e8f0;font-family:monospace;cursor:pointer;';
    baseHex.textContent = base;
    baseHex.onclick = function(){ copyToClipboard(base, baseHex); };
    baseSwatch.onclick = function(){ copyToClipboard(base, baseHex); };
    baseRow.appendChild(baseSwatch); baseRow.appendChild(baseLbl); baseRow.appendChild(baseHex);
    paletteEl.appendChild(baseRow);

    harmony.forEach(function(col, i) {
      var row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;gap:8px;padding:6px 8px;background:#1e293b;border-radius:6px;';
      var swatch = document.createElement('div');
      swatch.style.cssText = 'width:32px;height:20px;border-radius:4px;background:' + col + ';flex-shrink:0;border:1px solid rgba(255,255,255,0.1);cursor:pointer;';
      var namEl = document.createElement('div');
      namEl.style.cssText = 'font-size:9px;color:#64748b;flex:1;';
      namEl.textContent = schemeNames[i] || ('Scheme ' + (i+1));
      var hexEl = document.createElement('code');
      hexEl.style.cssText = 'font-size:10px;color:#e2e8f0;font-family:monospace;cursor:pointer;';
      hexEl.textContent = col;
      hexEl.onclick = function(){ copyToClipboard(col, hexEl); };
      swatch.onclick = function(){ copyToClipboard(col, hexEl); };
      row.appendChild(swatch); row.appendChild(namEl); row.appendChild(hexEl);
      paletteEl.appendChild(row);
    });
  }

  var genBtn = document.createElement('button');
  genBtn.textContent = t('generate');
  genBtn.style.cssText = 'width:100%;background:linear-gradient(135deg,#7c3aed,#db2777);border:none;border-radius:8px;padding:10px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;';
  genBtn.onclick = function(){ renderPalette(picker.value); };
  body.appendChild(genBtn);

  var injectBtn = document.createElement('button');
  injectBtn.textContent = t('inject');
  injectBtn.style.cssText = 'width:100%;background:rgba(168,85,247,0.15);border:1px solid rgba(168,85,247,0.4);border-radius:8px;padding:9px;color:#c084fc;font-weight:700;font-size:10px;cursor:pointer;';
  injectBtn.onclick = function(){
    if (!lastColors.length || !window.editor) return;
    var names = ['--color-base','--color-comp','--color-triadic','--color-analogous','--color-split','--color-light','--color-dark','--color-warm','--color-cool'];
    var vars = lastColors.map(function(c,i){ return '  ' + (names[i]||('--color-'+i)) + ': ' + c + ';'; }).join('\n');
    var snippet = '<style id="ia-harmony">\n:root {\n' + vars + '\n}\n</style>';
    var code = window.editor.getValue();
    code = code.replace(/<style id="ia-harmony">[\s\S]*?<\/style>/g, '');
    if (code.indexOf('</head>') !== -1) code = code.replace('</head>', snippet + '\n</head>');
    else code = snippet + '\n' + code;
    window.editor.setValue(code);
    if (window.runPreview) window.runPreview();
    statusEl.textContent = t('injected');
  };
  body.appendChild(injectBtn);

  /* Generate on load */
  renderPalette(picker.value);
  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function () {
  var oAL = window.applyLang;
  window.applyLang = function () {
    if (typeof oAL === 'function') oAL();
    var el = document.getElementById('lbl-tab-colorharmony');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'colorharmony') renderHarmonyTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'colorharmony') {
      window.activeTab = 'colorharmony';
      document.querySelectorAll('.ltab').forEach(function (b) { b.classList.remove('active'); });
      var btn = document.getElementById('tab-colorharmony');
      if (btn) btn.classList.add('active');
      renderHarmonyTab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
