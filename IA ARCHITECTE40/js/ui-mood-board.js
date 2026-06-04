/**
 * UI Mood Board v1.0 — EN/FR
 * Generates color palettes + typography based on mood/vibe
 */
(function () {
'use strict';
var TX = {
  en: { tab:'Mood Board', title:'🎨 UI Mood Board', sub:'Generate palettes & typography by mood',
        pickMood:'Choose a Mood:', custom:'✏️ Custom Mood:', customPh:'e.g. retro synthwave...',
        btnGen:'✨ Generate Mood Board', btnInject:'💉 Inject CSS Variables', btnCopy:'📋 Copy CSS',
        injected:'✅ CSS variables injected!', copied:'📋 Copied!', palette:'Color Palette',
        typography:'Typography', cssVars:'CSS Variables', preview:'Preview' },
  fr: { tab:'Mood Board', title:'🎨 UI Mood Board', sub:'Générez palettes & typographies par ambiance',
        pickMood:'Choisissez une Ambiance :', custom:'✏️ Ambiance Personnalisée :', customPh:'ex. rétro synthwave...',
        btnGen:'✨ Générer le Mood Board', btnInject:'💉 Injecter Variables CSS', btnCopy:'📋 Copier CSS',
        injected:'✅ Variables CSS injectées !', copied:'📋 Copié !', palette:'Palette de Couleurs',
        typography:'Typographie', cssVars:'Variables CSS', preview:'Aperçu' }
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var MOODS = {
  'Luxury Dark':    { colors:['#0a0a0f','#1a1a2e','#16213e','#c9a84c','#e8d5a3'], fonts:['Cormorant Garamond','Playfair Display'], accent:'#c9a84c', bg:'#0a0a0f', text:'#e8d5a3', tag:'luxury' },
  'Playful Kids':   { colors:['#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#ff6bd6'], fonts:['Nunito','Fredoka One'], accent:'#ff6b6b', bg:'#fff9f0', text:'#2d2d2d', tag:'kids' },
  'Tech Startup':   { colors:['#0f172a','#1e293b','#3b82f6','#06b6d4','#f0f9ff'], fonts:['Inter','JetBrains Mono'], accent:'#3b82f6', bg:'#0f172a', text:'#e2e8f0', tag:'tech' },
  'Organic Nature': { colors:['#1a2e1a','#2d5a27','#4a7c59','#8bc34a','#f5f0e8'], fonts:['Lora','Source Serif Pro'], accent:'#4a7c59', bg:'#f5f0e8', text:'#1a2e1a', tag:'nature' },
  'Cyber Neon':     { colors:['#0d0d1a','#12002b','#ff00ff','#00ffff','#ff006e'], fonts:['Orbitron','Share Tech Mono'], accent:'#ff00ff', bg:'#0d0d1a', text:'#00ffff', tag:'cyber' },
  'Minimal Zen':    { colors:['#fafafa','#f0ede8','#d4c5b0','#8c7b6b','#3d3530'], fonts:['DM Sans','DM Serif Display'], accent:'#8c7b6b', bg:'#fafafa', text:'#3d3530', tag:'zen' },
  'Ocean Breeze':   { colors:['#0c1e3e','#0e4d7b','#1e90ff','#87ceeb','#e0f7fa'], fonts:['Raleway','Open Sans'], accent:'#1e90ff', bg:'#0c1e3e', text:'#e0f7fa', tag:'ocean' },
  'Warm Retro':     { colors:['#2c1810','#8b4513','#d2691e','#f4a460','#fdf0d5'], fonts:['Bebas Neue','Merriweather'], accent:'#d2691e', bg:'#fdf0d5', text:'#2c1810', tag:'retro' },
  'Glassmorphism':  { colors:['#1a1a2e','#16213e','#ffffff22','#ffffff44','#a78bfa'], fonts:['Inter','Syne'], accent:'#a78bfa', bg:'linear-gradient(135deg,#1a1a2e,#16213e)', text:'#f1f5f9', tag:'glass' },
  'FinTech Pro':    { colors:['#0a0e1a','#0d2137','#00c896','#00a3ff','#e2e8f0'], fonts:['IBM Plex Sans','IBM Plex Mono'], accent:'#00c896', bg:'#0a0e1a', text:'#e2e8f0', tag:'fintech' }
};

var selectedMood = 'Tech Startup';
var lastCSS = '';

function buildCSS(mood, name) {
  var m = MOODS[mood] || MOODS['Tech Startup'];
  return ':root {\n' +
    '  /* UI Mood Board: ' + (name||mood) + ' */\n' +
    '  --mood-bg:        ' + m.bg + ';\n' +
    '  --mood-text:      ' + m.text + ';\n' +
    '  --mood-accent:    ' + m.accent + ';\n' +
    '  --mood-primary:   ' + m.colors[2] + ';\n' +
    '  --mood-secondary: ' + m.colors[3] + ';\n' +
    '  --mood-surface:   ' + m.colors[1] + ';\n' +
    '  --mood-font-head: \'' + m.fonts[0] + '\', sans-serif;\n' +
    '  --mood-font-body: \'' + (m.fonts[1]||m.fonts[0]) + '\', sans-serif;\n' +
    '  --mood-radius:    ' + (mood.includes('Playful')?'20px':mood.includes('Minimal')?'4px':'10px') + ';\n' +
    '  --mood-shadow:    0 4px 24px ' + m.accent + '33;\n' +
    '}\n' +
    'body { background: var(--mood-bg); color: var(--mood-text); font-family: var(--mood-font-body); }';
}

function renderTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 10px;border-bottom:1px solid rgba(168,85,247,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(168,85,247,0.1),rgba(236,72,153,0.06));';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#c084fc;">' + t('title') + '</div><div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';

  // Mood grid
  var mlabel = document.createElement('div');
  mlabel.style = 'font-size:10px;color:#64748b;font-weight:600;';
  mlabel.textContent = t('pickMood');
  body.appendChild(mlabel);

  var mgrid = document.createElement('div');
  mgrid.style = 'display:grid;grid-template-columns:1fr 1fr;gap:5px;';
  Object.keys(MOODS).forEach(function(name) {
    var m = MOODS[name];
    var btn = document.createElement('button');
    var isActive = selectedMood === name;
    btn.style = 'padding:7px 6px;border-radius:8px;font-size:9.5px;font-weight:700;cursor:pointer;text-align:left;' +
      'border:2px solid ' + (isActive ? m.accent : 'rgba(255,255,255,0.08)') + ';' +
      'background:' + (isActive ? m.accent+'22' : 'rgba(255,255,255,0.02)') + ';' +
      'color:' + (isActive ? m.accent : '#94a3b8') + ';transition:all 0.2s;';
    // Mini color strip
    var strip = m.colors.slice(0,4).map(function(c){return '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:'+c+';"></span>';}).join('');
    btn.innerHTML = '<div style="margin-bottom:3px;">' + name + '</div><div style="display:flex;gap:3px;">' + strip + '</div>';
    btn.onclick = function() { selectedMood = name; renderTab(); };
    mgrid.appendChild(btn);
  });
  body.appendChild(mgrid);

  // Custom mood input
  var clabel = document.createElement('div');
  clabel.style = 'font-size:10px;color:#64748b;font-weight:600;';
  clabel.textContent = t('custom');
  body.appendChild(clabel);
  var cinput = document.createElement('input');
  cinput.type='text'; cinput.id='mood-custom-input'; cinput.placeholder=t('customPh');
  cinput.style='background:#1e293b;color:#e2e8f0;border:1px solid rgba(168,85,247,0.25);padding:8px 10px;border-radius:8px;font-size:10px;outline:none;width:100%;box-sizing:border-box;';
  body.appendChild(cinput);

  // Generate button
  var genBtn = document.createElement('button');
  genBtn.innerHTML = t('btnGen');
  genBtn.style = 'width:100%;background:linear-gradient(135deg,#7c3aed,#db2777);color:#fff;border:none;padding:12px;border-radius:10px;font-weight:900;font-size:12px;cursor:pointer;box-shadow:0 4px 20px rgba(124,58,237,0.4);';
  genBtn.onmouseover = function(){this.style.transform='translateY(-1px)';}; genBtn.onmouseout = function(){this.style.transform='';};
  genBtn.onclick = function() {
    var custom = (document.getElementById('mood-custom-input')||{}).value||'';
    var mood = MOODS[selectedMood] || MOODS['Tech Startup'];
    lastCSS = buildCSS(selectedMood, custom||selectedMood);

    // Show palette
    var palEl = document.getElementById('mood-palette');
    if (palEl) {
      palEl.innerHTML = '';
      mood.colors.forEach(function(c) {
        var sw = document.createElement('div');
        sw.title = c;
        sw.style = 'flex:1;height:36px;border-radius:6px;background:'+c+';cursor:pointer;transition:transform 0.2s;';
        sw.onmouseover=function(){this.style.transform='scaleY(1.15)';};
        sw.onmouseout=function(){this.style.transform='';};
        sw.onclick=function(){navigator.clipboard&&navigator.clipboard.writeText(c);if(window.showToast)window.showToast(c);};
        palEl.appendChild(sw);
      });
    }

    // Typography preview
    var typEl = document.getElementById('mood-typo');
    if (typEl) {
      typEl.innerHTML = '<div style="font-family:\''+mood.fonts[0]+'\',serif;font-size:20px;font-weight:700;color:'+mood.accent+';margin-bottom:4px;">Aa '+mood.fonts[0]+'</div>' +
        '<div style="font-family:\''+(mood.fonts[1]||mood.fonts[0])+'\',sans-serif;font-size:12px;color:#94a3b8;">Body: '+(mood.fonts[1]||mood.fonts[0])+'</div>';
    }

    // CSS preview
    var cssEl = document.getElementById('mood-css-pre');
    if (cssEl) cssEl.textContent = lastCSS;

    var actEl = document.getElementById('mood-actions');
    if (actEl) actEl.style.display = 'flex';
  };
  body.appendChild(genBtn);

  // Palette display
  var palLabel = document.createElement('div');
  palLabel.style = 'font-size:10px;color:#64748b;font-weight:600;';
  palLabel.textContent = t('palette');
  body.appendChild(palLabel);
  var pal = document.createElement('div');
  pal.id = 'mood-palette'; pal.style = 'display:flex;gap:4px;height:36px;';
  MOODS[selectedMood].colors.forEach(function(c){var sw=document.createElement('div');sw.style='flex:1;border-radius:6px;background:'+c+';';pal.appendChild(sw);});
  body.appendChild(pal);

  // Typography
  var typoLabel = document.createElement('div');
  typoLabel.style = 'font-size:10px;color:#64748b;font-weight:600;';
  typoLabel.textContent = t('typography');
  body.appendChild(typoLabel);
  var typo = document.createElement('div');
  typo.id = 'mood-typo';
  typo.style = 'background:rgba(168,85,247,0.05);border:1px solid rgba(168,85,247,0.15);border-radius:8px;padding:10px;';
  typo.innerHTML = '<div style="font-size:11px;color:#94a3b8;">Click Generate to preview fonts</div>';
  body.appendChild(typo);

  // CSS output
  var cssLabel = document.createElement('div');
  cssLabel.style = 'font-size:10px;color:#64748b;font-weight:600;';
  cssLabel.textContent = t('cssVars');
  body.appendChild(cssLabel);
  var cssPre = document.createElement('pre');
  cssPre.id = 'mood-css-pre';
  cssPre.style = 'background:#0d1117;border:1px solid rgba(168,85,247,0.2);border-radius:8px;padding:10px;font-size:9px;color:#c9d1d9;overflow:auto;max-height:160px;white-space:pre-wrap;margin:0;';
  cssPre.textContent = lastCSS || '// Click Generate...';
  body.appendChild(cssPre);

  // Actions
  var act = document.createElement('div');
  act.id = 'mood-actions'; act.style = 'display:'+(lastCSS?'flex':'none')+';gap:8px;';
  var cpBtn = document.createElement('button');
  cpBtn.innerHTML = t('btnCopy');
  cpBtn.style = 'flex:1;background:rgba(168,85,247,0.12);color:#c084fc;border:1px solid rgba(168,85,247,0.3);padding:9px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
  cpBtn.onclick = function(){if(lastCSS){navigator.clipboard.writeText(lastCSS).then(function(){if(window.showToast)window.showToast(t('copied'));});}};
  var inBtn = document.createElement('button');
  inBtn.innerHTML = t('btnInject');
  inBtn.style = 'flex:1;background:rgba(16,185,129,0.12);color:#34d399;border:1px solid rgba(16,185,129,0.3);padding:9px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
  inBtn.onclick = function(){
    if(!window.editor||!lastCSS)return;
    var code=window.editor.getValue();
    var styleTag='<style>\n'+lastCSS+'\n</style>';
    if(code.includes('<head>'))code=code.replace('<head>','<head>\n'+styleTag);
    else if(code.includes('</head>'))code=code.replace('</head>',styleTag+'\n</head>');
    else code=styleTag+'\n'+code;
    window.editor.setValue(code);
    if(window.runPreview)window.runPreview();
    if(window.showToast)window.showToast(t('injected'));
  };
  act.appendChild(cpBtn); act.appendChild(inBtn);
  body.appendChild(act);
  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function(){
  var oAL=window.applyLang;
  window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-moodboard');if(el)el.textContent=t('tab');if(window.activeTab==='moodboard')renderTab();};
  var oRT=window.renderTab;
  window.renderTab=function(tab){if(tab==='moodboard'){window.activeTab='moodboard';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-moodboard');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
