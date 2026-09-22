(function() {
'use strict';
/* ═══════════════════════════════════════════════════
   AI Color Palette Studio v1.0
   ═══════════════════════════════════════════════════ */
var t_cp = {
  en: { tab: 'Colors', title: '🎨 AI Color Palette Studio', sub: 'Generate harmonious palettes from a mood',
        gen: '✨ Generate Palette', apply: '⬇️ Apply to Code', copy: '📋 Copy CSS Vars',
        copied: '✅ Copied!', placeholder: 'e.g. cyberpunk neon, nordic minimal, warm sunset...',
        swatches: 'Your Palette:', cssVars: 'CSS Variables:', noCode: 'No code in editor.' },
  fr: { tab: 'Couleurs', title: '🎨 Studio Palette IA', sub: 'Générez des palettes harmonieuses',
        gen: '✨ Générer Palette', apply: '⬇️ Appliquer au Code', copy: '📋 Copier Vars CSS',
        copied: '✅ Copié!', placeholder: 'ex. cyberpunk néon, minimal nordique, coucher de soleil...',
        swatches: 'Votre Palette :', cssVars: 'Variables CSS :', noCode: 'Aucun code dans l\'éditeur.' }
};
function gl() { return window.lang || 'en'; }
function t(k) { return t_cp[gl()][k] || k; }

// Palette presets library
var PALETTES = {
  cyberpunk:   { primary:'#f0ff00', secondary:'#ff00c8', accent:'#00fff7', bg:'#0a0014', surface:'#1a0028', text:'#ffffff', muted:'#9d00ff', success:'#00ff88' },
  nordic:      { primary:'#5e81ac', secondary:'#81a1c1', accent:'#88c0d0', bg:'#2e3440', surface:'#3b4252', text:'#eceff4', muted:'#4c566a', success:'#a3be8c' },
  sunset:      { primary:'#ff6b6b', secondary:'#feca57', accent:'#ff9ff3', bg:'#1a1a2e', surface:'#16213e', text:'#eee', muted:'#a29bfe', success:'#55efc4' },
  ocean:       { primary:'#0ea5e9', secondary:'#38bdf8', accent:'#7dd3fc', bg:'#0c1a2e', surface:'#0f2540', text:'#f0f9ff', muted:'#475569', success:'#34d399' },
  forest:      { primary:'#10b981', secondary:'#059669', accent:'#6ee7b7', bg:'#052e16', surface:'#064e3b', text:'#ecfdf5', muted:'#374151', success:'#a7f3d0' },
  fire:        { primary:'#ef4444', secondary:'#f97316', accent:'#fbbf24', bg:'#1c0505', surface:'#2d0a0a', text:'#fff7ed', muted:'#6b7280', success:'#4ade80' },
  purple:      { primary:'#8b5cf6', secondary:'#a78bfa', accent:'#c4b5fd', bg:'#0f0a1e', surface:'#1e1035', text:'#ede9fe', muted:'#4c1d95', success:'#34d399' },
  rose:        { primary:'#ec4899', secondary:'#f472b6', accent:'#fbcfe8', bg:'#1a0010', surface:'#2d0020', text:'#fdf2f8', muted:'#831843', success:'#86efac' },
  mono:        { primary:'#ffffff', secondary:'#e2e8f0', accent:'#94a3b8', bg:'#020617', surface:'#0f172a', text:'#f8fafc', muted:'#334155', success:'#4ade80' },
  gold:        { primary:'#f59e0b', secondary:'#d97706', accent:'#fcd34d', bg:'#1c1004', surface:'#292010', text:'#fffbeb', muted:'#78350f', success:'#4ade80' },
  cherry:      { primary:'#e11d48', secondary:'#be123c', accent:'#fda4af', bg:'#1a0008', surface:'#2d0012', text:'#fff1f2', muted:'#9f1239', success:'#4ade80' },
  ice:         { primary:'#38bdf8', secondary:'#e0f2fe', accent:'#bae6fd', bg:'#0c1f2e', surface:'#0f3050', text:'#f0f9ff', muted:'#64748b', success:'#86efac' },
  neon:        { primary:'#00ff88', secondary:'#00e5ff', accent:'#ff00c8', bg:'#000000', surface:'#0d0d0d', text:'#ffffff', muted:'#1a1a1a', success:'#00ff88' },
  sand:        { primary:'#d4a373', secondary:'#ccd5ae', accent:'#e9edc9', bg:'#1a1207', surface:'#2d1e0f', text:'#fefae0', muted:'#606c38', success:'#52b788' },
  lavender:    { primary:'#818cf8', secondary:'#6366f1', accent:'#c7d2fe', bg:'#0e0820', surface:'#1a1040', text:'#eef2ff', muted:'#3730a3', success:'#34d399' }
};

var KEYWORD_MAP = {
  cyberpunk:['cyberpunk','cyber','neon','futurist','matrix','hack'], nordic:['nordic','norse','scandinavian','minimal','north','fjord'],
  sunset:['sunset','warm','evening','dusk','orange','pink sky'], ocean:['ocean','sea','water','marine','coastal','blue'],
  forest:['forest','nature','green','organic','eco','jungle'], fire:['fire','flame','hot','lava','energy','power'],
  purple:['purple','violet','galaxy','space','mystic','magic'], rose:['rose','pink','soft','feminine','blossom','flower'],
  mono:['mono','minimal','dark','noir','black','elegant'], gold:['gold','luxury','premium','royal','amber','rich'],
  cherry:['cherry','red','passion','bold','strong'], ice:['ice','winter','cold','arctic','frozen','cool'],
  neon:['neon','bright','vivid','glow','electric','rave'], sand:['sand','desert','earth','warm natural','boho','tan'],
  lavender:['lavender','soft purple','dreamy','pastel','calm']
};

var currentPalette = null;

function detectPalette(prompt) {
  var p = prompt.toLowerCase();
  var best = null; var bestScore = 0;
  Object.keys(KEYWORD_MAP).forEach(function(name) {
    KEYWORD_MAP[name].forEach(function(kw) {
      if (p.includes(kw) && kw.length > bestScore) { best = name; bestScore = kw.length; }
    });
  });
  if (!best) {
    // Random from all
    var keys = Object.keys(PALETTES);
    best = keys[Math.floor(Math.random() * keys.length)];
  }
  return { name: best, colors: PALETTES[best] };
}

function paletteToCSSVars(name, pal) {
  return ':root {\n' +
    '  /* 🎨 ' + name.toUpperCase() + ' Palette — IA Architecte */\n' +
    '  --primary:   ' + pal.primary   + ';\n' +
    '  --secondary: ' + pal.secondary + ';\n' +
    '  --accent:    ' + pal.accent    + ';\n' +
    '  --bg:        ' + pal.bg        + ';\n' +
    '  --surface:   ' + pal.surface   + ';\n' +
    '  --text:      ' + pal.text      + ';\n' +
    '  --muted:     ' + pal.muted     + ';\n' +
    '  --success:   ' + pal.success   + ';\n' +
    '}\nbody { background: var(--bg); color: var(--text); }';
}

function applyPaletteToCode(pal) {
  if (!window.editor) return;
  var code = window.editor.getValue();
  var cssBlock = '<style id="ia-palette">\n' + paletteToCSSVars(currentPalette.name, pal) + '\n</style>';
  // Remove old palette block
  code = code.replace(/<style id="ia-palette">[\s\S]*?<\/style>/gi, '');
  if (code.includes('</head>')) {
    code = code.replace('</head>', cssBlock + '\n</head>');
  } else if (code.includes('<body')) {
    code = code.replace('<body', cssBlock + '\n<body');
  } else {
    code = cssBlock + '\n' + code;
  }
  window.editor.setValue(code);
  if (window.runPreview) window.runPreview();
  if (window.showToast) window.showToast(gl()==='fr'?'Palette appliquée !':'Palette applied!');
}

function renderColorTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0f172a;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(245,158,11,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#fbbf24;">' + t('title') + '</div>' +
                  '<div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';

  // Input
  var inp = document.createElement('input');
  inp.id = 'cp-inp';
  inp.placeholder = t('placeholder');
  inp.style = 'width:100%;background:#1e293b;color:#e2e8f0;border:1px solid #334155;padding:9px;border-radius:8px;font-size:11px;box-sizing:border-box;';
  body.appendChild(inp);

  // Preset chips
  var chipWrap = document.createElement('div');
  chipWrap.style = 'display:flex;flex-wrap:wrap;gap:4px;';
  Object.keys(PALETTES).forEach(function(name) {
    var chip = document.createElement('div');
    var pal = PALETTES[name];
    chip.style = 'padding:3px 8px;border-radius:20px;font-size:9px;cursor:pointer;font-weight:bold;color:#fff;background:linear-gradient(90deg,' + pal.primary + ',' + pal.secondary + ');border:1px solid ' + pal.accent + '44;';
    chip.textContent = name;
    chip.onclick = function() {
      currentPalette = { name: name, colors: pal };
      renderSwatches(body, pal, name);
    };
    chipWrap.appendChild(chip);
  });
  body.appendChild(chipWrap);

  var genBtn = document.createElement('button');
  genBtn.innerHTML = t('gen');
  genBtn.style = 'width:100%;background:linear-gradient(90deg,#f59e0b,#d97706);color:#000;border:none;padding:10px;border-radius:8px;font-weight:900;font-size:11px;cursor:pointer;';
  genBtn.onclick = function() {
    var query = inp.value.trim() || 'random';
    var result = detectPalette(query);
    currentPalette = result;
    renderSwatches(body, result.colors, result.name);
  };
  body.appendChild(genBtn);

  // Show current palette if exists
  if (currentPalette) {
    renderSwatches(body, currentPalette.colors, currentPalette.name);
  }

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

function renderSwatches(body, pal, name) {
  var old = document.getElementById('cp-result');
  if (old) old.remove();

  var zone = document.createElement('div');
  zone.id = 'cp-result';
  zone.style = 'display:flex;flex-direction:column;gap:8px;';

  // Name + swatches
  var nameEl = document.createElement('div');
  nameEl.style = 'font-size:11px;font-weight:bold;color:#94a3b8;';
  nameEl.textContent = '🎨 ' + t('swatches') + ' ' + name.toUpperCase();
  zone.appendChild(nameEl);

  var swRow = document.createElement('div');
  swRow.style = 'display:grid;grid-template-columns:repeat(4,1fr);gap:4px;';
  Object.entries(pal).forEach(function(entry) {
    var k = entry[0]; var v = entry[1];
    var sw = document.createElement('div');
    sw.title = k + ': ' + v;
    sw.style = 'height:36px;border-radius:6px;background:' + v + ';cursor:pointer;position:relative;border:1px solid rgba(255,255,255,0.1);';
    var lbl = document.createElement('div');
    lbl.style = 'position:absolute;bottom:2px;left:0;right:0;font-size:7px;text-align:center;color:rgba(255,255,255,0.7);font-weight:bold;';
    lbl.textContent = k;
    sw.appendChild(lbl);
    sw.onclick = function() { navigator.clipboard.writeText(v); if(window.showToast) window.showToast(v + ' copied!'); };
    swRow.appendChild(sw);
  });
  zone.appendChild(swRow);

  // CSS vars preview
  var cssStr = paletteToCSSVars(name, pal);
  var pre = document.createElement('pre');
  pre.style = 'background:#000;color:#6ee7b7;padding:8px;border-radius:6px;font-size:9px;overflow-x:auto;white-space:pre-wrap;border:1px solid #334155;max-height:120px;';
  pre.textContent = cssStr;
  zone.appendChild(pre);

  // Action buttons
  var btnRow = document.createElement('div');
  btnRow.style = 'display:flex;gap:6px;';

  var copyBtn = document.createElement('button');
  copyBtn.innerHTML = t('copy');
  copyBtn.style = 'flex:1;background:#334155;color:#e2e8f0;border:none;padding:7px;border-radius:6px;font-size:10px;cursor:pointer;';
  copyBtn.onclick = function() { navigator.clipboard.writeText(cssStr); copyBtn.textContent = t('copied'); setTimeout(function(){copyBtn.innerHTML=t('copy');},2000); };

  var applyBtn = document.createElement('button');
  applyBtn.innerHTML = t('apply');
  applyBtn.style = 'flex:1;background:#f59e0b;color:#000;border:none;padding:7px;border-radius:6px;font-size:10px;font-weight:bold;cursor:pointer;';
  applyBtn.onclick = function() { applyPaletteToCode(pal); };

  btnRow.appendChild(copyBtn);
  btnRow.appendChild(applyBtn);
  zone.appendChild(btnRow);
  body.appendChild(zone);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() { if(typeof oAL==='function') oAL(); var el=document.getElementById('lbl-tab-colors'); if(el) el.textContent=t('tab'); if(window.activeTab==='colors') renderColorTab(); };
  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='colors'){window.activeTab='colors';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var el=document.getElementById('tab-colors');if(el)el.classList.add('active');renderColorTab();return;}
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
