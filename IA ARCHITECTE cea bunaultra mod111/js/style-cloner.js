(function() {
'use strict';
var t_sc = {
  en: { tab:'Style Clone', title:'🎭 Style Cloner', sub:'Paste any HTML → clone its visual style',
        paste: '📋 Paste HTML from any website here...',
        clone: '✨ Clone Style', apply: '⬇️ Apply to My Code', copy: '📋 Copy CSS',
        copied: '✅ Copied!', noHtml: 'No HTML detected. Paste the source code of any website.',
        done: 'Style cloned and applied!', extracted: 'Style extracted successfully!',
        preview: 'Extracted Style Preview:', vars: 'Generated CSS Variables:',
        howto: 'How to get a site\'s HTML: Open any website → Right-click → "View Page Source" → Copy all → Paste here'
      },
  fr: { tab:'Cloner Style', title:'🎭 Clonage de Style', sub:'Collez du HTML → clonez son style visuel',
        paste: '📋 Collez le HTML de n\'importe quel site ici...',
        clone: '✨ Cloner le Style', apply: '⬇️ Appliquer à Mon Code', copy: '📋 Copier CSS',
        copied: '✅ Copié!', noHtml: 'Pas de HTML détecté. Collez le code source d\'un site web.',
        done: 'Style cloné et appliqué !', extracted: 'Style extrait avec succès !',
        preview: 'Aperçu du Style Extrait :', vars: 'Variables CSS Générées :',
        howto: 'Comment obtenir le HTML : Ouvrez un site → Clic droit → "Afficher le code source" → Copier tout → Coller ici'
      }
};
function gl(){return window.lang||'en';}
function t(k){return t_sc[gl()][k]||k;}

var extractedStyle = null;

// ─── Extract style data from pasted HTML ──────────────────────────────
function extractStyleFromHTML(html) {
  var result = {
    colors: [],
    fonts: [],
    borderRadius: '8px',
    spacing: '16px',
    shadows: [],
    primaryColor: '#3b82f6',
    bgColor: '#ffffff',
    textColor: '#1e293b',
    accentColor: '#f59e0b',
    fontFamily: 'sans-serif',
    isDark: false
  };

  // Extract colors from inline styles and CSS
  var colorRx = /#([0-9a-fA-F]{3,6})\b|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|rgba\([^)]+\)/g;
  var colorMatches = html.match(colorRx) || [];
  var colorSet = {};
  colorMatches.forEach(function(c) {
    var hex = c.startsWith('#') ? c : rgbToHex(c);
    if (hex && hex.length === 7 && !isGray(hex)) {
      colorSet[hex.toLowerCase()] = (colorSet[hex.toLowerCase()]||0) + 1;
    }
  });
  // Sort by frequency
  result.colors = Object.keys(colorSet).sort(function(a,b){return colorSet[b]-colorSet[a];}).slice(0,8);
  if (result.colors.length > 0) result.primaryColor = result.colors[0];
  if (result.colors.length > 1) result.accentColor = result.colors[1];

  // Detect dark mode
  var darkBgRx = /background(?:-color)?\s*:\s*(#0[0-9a-f]{5}|#1[0-9a-f]{5}|#2[0-9a-f]{5}|rgb\(\s*[0-4]\d)/i;
  result.isDark = darkBgRx.test(html);
  result.bgColor = result.isDark ? '#0f172a' : '#ffffff';
  result.textColor = result.isDark ? '#e2e8f0' : '#1e293b';

  // Extract font families
  var fontRx = /font-family\s*:\s*([^;}"']+)/gi;
  var fm; var fonts = [];
  while ((fm = fontRx.exec(html)) !== null) {
    var f = fm[1].trim().replace(/['"]/g,'').split(',')[0].trim();
    if (f && f.length > 1 && f.toLowerCase() !== 'inherit' && fonts.indexOf(f) === -1) fonts.push(f);
  }
  result.fonts = fonts.slice(0,3);
  if (result.fonts.length > 0) result.fontFamily = result.fonts[0];

  // Extract border-radius
  var brRx = /border-radius\s*:\s*(\d+(?:\.\d+)?(?:px|rem|em))/i;
  var brM = html.match(brRx);
  if (brM) result.borderRadius = brM[1];

  // Extract box shadows
  var bsRx = /box-shadow\s*:\s*([^;}"']+)/gi;
  var bs;
  while ((bs = bsRx.exec(html)) !== null) {
    result.shadows.push(bs[1].trim());
  }

  return result;
}

function rgbToHex(rgb) {
  var m = rgb.match(/\d+/g);
  if (!m || m.length < 3) return null;
  return '#' + m.slice(0,3).map(function(v){return parseInt(v).toString(16).padStart(2,'0');}).join('');
}

function isGray(hex) {
  var r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
  var max=Math.max(r,g,b),min=Math.min(r,g,b);
  return max-min < 30 || (r>220&&g>220&&b>220) || (r<20&&g<20&&b<20);
}

function buildCSSVars(style) {
  var fontStack = style.fontFamily + ', ' + (style.fonts[1]||'sans-serif');
  return ':root {\n' +
    '  /* 🎭 Cloned Style — IA Architecte */\n' +
    '  --primary:     ' + style.primaryColor + ';\n' +
    '  --accent:      ' + style.accentColor + ';\n' +
    '  --bg:          ' + style.bgColor + ';\n' +
    '  --text:        ' + style.textColor + ';\n' +
    '  --radius:      ' + style.borderRadius + ';\n' +
    '  --font:        ' + fontStack + ';\n' +
    (style.colors[2]?'  --color-3:     ' + style.colors[2] + ';\n':'') +
    (style.colors[3]?'  --color-4:     ' + style.colors[3] + ';\n':'') +
    '}\n' +
    'body {\n' +
    '  background: var(--bg);\n' +
    '  color: var(--text);\n' +
    '  font-family: var(--font);\n' +
    '}\n' +
    'a, button { border-radius: var(--radius); }\n' +
    '.btn-primary { background: var(--primary); color: #fff; border: none; padding: 10px 20px; border-radius: var(--radius); cursor: pointer; }\n' +
    '.btn-accent  { background: var(--accent); color: #fff; border: none; padding: 10px 20px; border-radius: var(--radius); cursor: pointer; }' +
    (style.shadows.length > 0 ? '\n.card { box-shadow: ' + style.shadows[0] + '; }' : '');
}

function applyToEditor(cssVars) {
  if (!window.editor) return;
  var code = window.editor.getValue();
  var styleBlock = '<style id="ia-clone">\n' + cssVars + '\n</style>';
  code = code.replace(/<style id="ia-clone">[\s\S]*?<\/style>/gi, '');
  if (code.includes('</head>')) {
    code = code.replace('</head>', styleBlock + '\n</head>');
  } else {
    code = styleBlock + '\n' + code;
  }
  window.editor.setValue(code);
  if (window.runPreview) window.runPreview();
  if (window.showToast) window.showToast(t('done'));
  if (window.unlockAchievement) window.unlockAchievement('clone_style');
}

function renderStyleCloneTab() {
  var parent = document.getElementById('left-body'); if(!parent) return;
  parent.innerHTML = '';
  var isFr = gl()==='fr';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0f172a;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(168,85,247,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#d946ef;">' + t('title') + '</div>' +
    '<div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';

  // How-to hint
  var hint = document.createElement('div');
  hint.style = 'font-size:9px;color:#64748b;padding:8px;background:rgba(255,255,255,0.02);border-radius:6px;border:1px dashed #334155;line-height:1.5;';
  hint.textContent = '💡 ' + t('howto');
  body.appendChild(hint);

  // Textarea for HTML input
  var textarea = document.createElement('textarea');
  textarea.placeholder = t('paste');
  textarea.style = 'width:100%;height:100px;background:#1e293b;color:#94a3b8;border:1px solid #334155;border-radius:8px;padding:10px;font-size:10px;box-sizing:border-box;resize:none;font-family:monospace;';
  body.appendChild(textarea);

  // Clone button
  var cloneBtn = document.createElement('button');
  cloneBtn.innerHTML = t('clone');
  cloneBtn.style = 'width:100%;background:linear-gradient(90deg,#9333ea,#7c3aed);color:#fff;border:none;padding:11px;border-radius:8px;font-weight:900;font-size:11px;cursor:pointer;';
  cloneBtn.onclick = function() {
    var html = textarea.value.trim();
    if (!html || !html.includes('<')) {
      if (window.showToast) window.showToast(t('noHtml'));
      return;
    }
    extractedStyle = extractStyleFromHTML(html);
    if (window.showToast) window.showToast(t('extracted'));
    renderResult(body, extractedStyle);
  };
  body.appendChild(cloneBtn);

  // Show previous result
  if (extractedStyle) renderResult(body, extractedStyle);

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

function renderResult(body, style) {
  var old = document.getElementById('sc-result'); if(old) old.remove();
  var zone = document.createElement('div'); zone.id = 'sc-result';
  zone.style = 'display:flex;flex-direction:column;gap:8px;';

  // Color swatches
  var swLabel = document.createElement('div');
  swLabel.style = 'font-size:10px;color:#94a3b8;font-weight:bold;';
  swLabel.textContent = t('preview');
  zone.appendChild(swLabel);

  var swRow = document.createElement('div');
  swRow.style = 'display:flex;gap:4px;flex-wrap:wrap;';
  [style.primaryColor, style.accentColor].concat(style.colors.slice(2,6)).forEach(function(c) {
    var sw = document.createElement('div');
    sw.title = c;
    sw.style = 'width:28px;height:28px;border-radius:6px;background:' + c + ';border:1px solid rgba(255,255,255,0.15);cursor:pointer;';
    sw.onclick = function() { navigator.clipboard.writeText(c); if(window.showToast) window.showToast(c); };
    swRow.appendChild(sw);
  });
  zone.appendChild(swRow);

  // Font info
  if (style.fonts.length > 0) {
    var fontEl = document.createElement('div');
    fontEl.style = 'font-size:10px;color:#64748b;background:#1e293b;padding:6px 10px;border-radius:6px;border:1px solid #334155;';
    fontEl.innerHTML = '🔤 Fonts: <span style="color:#e2e8f0;font-weight:bold;">' + style.fonts.join(', ') + '</span>' +
      (style.isDark ? '  |  🌙 Dark mode' : '  |  ☀️ Light mode');
    zone.appendChild(fontEl);
  }

  // CSS vars
  var cssVars = buildCSSVars(style);
  var varsLabel = document.createElement('div');
  varsLabel.style = 'font-size:10px;color:#94a3b8;font-weight:bold;';
  varsLabel.textContent = t('vars');
  zone.appendChild(varsLabel);

  var pre = document.createElement('pre');
  pre.style = 'background:#000;color:#6ee7b7;padding:8px;border-radius:6px;font-size:9px;overflow-x:auto;white-space:pre-wrap;border:1px solid #334155;max-height:120px;';
  pre.textContent = cssVars;
  zone.appendChild(pre);

  var btnRow = document.createElement('div'); btnRow.style = 'display:flex;gap:6px;';

  var copyBtn = document.createElement('button');
  copyBtn.innerHTML = t('copy');
  copyBtn.style = 'flex:1;background:#334155;color:#e2e8f0;border:none;padding:8px;border-radius:6px;font-size:10px;cursor:pointer;';
  copyBtn.onclick = function() { navigator.clipboard.writeText(cssVars); copyBtn.textContent = t('copied'); setTimeout(function(){copyBtn.innerHTML=t('copy');},2000); };

  var applyBtn = document.createElement('button');
  applyBtn.innerHTML = t('apply');
  applyBtn.style = 'flex:1;background:#9333ea;color:#fff;border:none;padding:8px;border-radius:6px;font-size:10px;font-weight:bold;cursor:pointer;';
  applyBtn.onclick = function() { applyToEditor(cssVars); };

  btnRow.appendChild(copyBtn); btnRow.appendChild(applyBtn);
  zone.appendChild(btnRow);
  body.appendChild(zone);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL=window.applyLang;
  window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-styleclone');if(el)el.textContent=t('tab');if(window.activeTab==='styleclone')renderStyleCloneTab();};
  var oRT=window.renderTab;
  window.renderTab=function(tab){if(tab==='styleclone'){window.activeTab='styleclone';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var el=document.getElementById('tab-styleclone');if(el)el.classList.add('active');renderStyleCloneTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
