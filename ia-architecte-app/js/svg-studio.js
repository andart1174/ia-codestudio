(function() {
'use strict';
var t_svg = {
  en: { tab: 'SVG Studio', title: '✒️ AI SVG Generator', sub: 'Describe → Get a vector icon', gen: 'Generate SVG', placeholder: 'e.g. A red heart icon, a blue house, a green tree...', inject: 'Inject into Editor', copied: '✅ Copied!' },
  fr: { tab: 'Studio SVG', title: '✒️ Générateur SVG IA', sub: 'Décrivez → Obtenez une icône', gen: 'Générer SVG', placeholder: 'ex. Un cœur rouge, une maison bleue, un arbre vert...', inject: 'Injecter dans l\'Éditeur', copied: '✅ Copié!' }
};
function gl() { return window.lang || 'en'; }
function t(k) { return t_svg[gl()][k] || k; }

var SVG_LIBRARY = {
  heart:    '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 85 C50 85 10 55 10 30 C10 15 20 5 35 5 C43 5 50 12 50 12 C50 12 57 5 65 5 C80 5 90 15 90 30 C90 55 50 85 50 85Z" fill="{color}" stroke="{stroke}" stroke-width="2"/></svg>',
  house:    '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,5 5,45 15,45 15,95 40,95 40,65 60,65 60,95 85,95 85,45 95,45" fill="{color}" stroke="{stroke}" stroke-width="2"/></svg>',
  star:     '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="{color}" stroke="{stroke}" stroke-width="2"/></svg>',
  tree:     '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,5 15,50 30,50 20,70 38,70 35,95 65,95 62,70 80,70 70,50 85,50" fill="{color}" stroke="{stroke}" stroke-width="2"/></svg>',
  circle:   '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="44" fill="{color}" stroke="{stroke}" stroke-width="2"/></svg>',
  diamond:  '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,5 95,50 50,95 5,50" fill="{color}" stroke="{stroke}" stroke-width="2"/></svg>',
  lightning:'<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="55,5 25,55 50,55 45,95 75,45 50,45" fill="{color}" stroke="{stroke}" stroke-width="2"/></svg>',
  moon:     '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M60 10 A40 40 0 1 0 60 90 A30 30 0 1 1 60 10Z" fill="{color}" stroke="{stroke}" stroke-width="2"/></svg>',
  sun:      '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="22" fill="{color}"/><g stroke="{color}" stroke-width="4"><line x1="50" y1="5" x2="50" y2="18"/><line x1="50" y1="82" x2="50" y2="95"/><line x1="5" y1="50" x2="18" y2="50"/><line x1="82" y1="50" x2="95" y2="50"/><line x1="17" y1="17" x2="26" y2="26"/><line x1="74" y1="74" x2="83" y2="83"/><line x1="83" y1="17" x2="74" y2="26"/><line x1="26" y1="74" x2="17" y2="83"/></g></svg>',
  shield:   '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 5 L90 20 L90 50 C90 72 70 88 50 95 C30 88 10 72 10 50 L10 20 Z" fill="{color}" stroke="{stroke}" stroke-width="2"/></svg>',
  cloud:    '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="38" cy="60" rx="30" ry="22" fill="{color}"/><ellipse cx="62" cy="60" rx="25" ry="20" fill="{color}"/><ellipse cx="50" cy="45" rx="22" ry="20" fill="{color}"/><rect x="20" y="55" width="60" height="22" fill="{color}"/></svg>',
  arrow:    '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="10,35 60,35 60,15 90,50 60,85 60,65 10,65" fill="{color}" stroke="{stroke}" stroke-width="2"/></svg>',
  bell:     '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 5 C30 5 15 22 15 45 L15 70 L5 80 L95 80 L85 70 L85 45 C85 22 70 5 50 5Z" fill="{color}" stroke="{stroke}" stroke-width="2"/><ellipse cx="50" cy="87" rx="12" ry="8" fill="{color}"/></svg>',
  lock:     '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="45" width="60" height="50" rx="5" fill="{color}"/><path d="M30 45 L30 30 A20 20 0 0 1 70 30 L70 45" stroke="{color}" stroke-width="8" fill="none"/><circle cx="50" cy="68" r="8" fill="{stroke}"/></svg>',
  generic:  '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="80" height="80" rx="15" fill="{color}" stroke="{stroke}" stroke-width="2"/><text x="50" y="58" font-size="28" text-anchor="middle" fill="{stroke}" font-family="sans-serif">{label}</text></svg>'
};

var COLORS = {
  red: '#ef4444', blue: '#3b82f6', green: '#10b981', yellow: '#f59e0b',
  purple: '#8b5cf6', pink: '#ec4899', orange: '#f97316', teal: '#14b8a6',
  white: '#f8fafc', black: '#1e293b', gold: '#f59e0b', silver: '#94a3b8',
  rouge: '#ef4444', bleu: '#3b82f6', vert: '#10b981', jaune: '#f59e0b',
  violet: '#8b5cf6', rose: '#ec4899', orange2: '#f97316', blanc: '#f8fafc', noir: '#1e293b'
};

var SHAPES = {
  heart: ['heart','coeur','cœur','love','amour'], house: ['house','home','maison','building'],
  star: ['star','étoile','etoile'], tree: ['tree','arbre','forest','forêt'],
  circle: ['circle','cercle','ball','sphere','rond'], diamond: ['diamond','diamant','gem','gemme'],
  lightning: ['lightning','éclair','eclair','bolt','flash','energy'],
  moon: ['moon','lune','night','nuit'], sun: ['sun','soleil','day','jour'],
  shield: ['shield','bouclier','security','sécurité'], cloud: ['cloud','nuage','sky','ciel'],
  arrow: ['arrow','flèche','fleche','next'], bell: ['bell','cloche','alert','notification'],
  lock: ['lock','cadenas','secure','verrou','key','clé']
};

function detectShape(p) {
  var lower = p.toLowerCase();
  for (var shape in SHAPES) {
    var kws = SHAPES[shape];
    for (var i = 0; i < kws.length; i++) {
      if (lower.indexOf(kws[i]) !== -1) return shape;
    }
  }
  return 'generic';
}

function detectColor(p) {
  var lower = p.toLowerCase();
  for (var c in COLORS) {
    if (lower.indexOf(c) !== -1) return COLORS[c];
  }
  return '#3b82f6';
}

function buildSVG(prompt) {
  var shape = detectShape(prompt);
  var color = detectColor(prompt);
  var stroke = '#ffffff';
  var label = (prompt.substring(0, 2)).toUpperCase();
  var tpl = SVG_LIBRARY[shape] || SVG_LIBRARY.generic;
  return tpl.replace(/{color}/g, color).replace(/{stroke}/g, stroke).replace(/{label}/g, label);
}

var currentSVG = '';

function renderSVGTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0f172a;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(236,72,153,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#f472b6;">' + t('title') + '</div><div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';

  var inp = document.createElement('input');
  inp.id = 'svg-prompt';
  inp.placeholder = t('placeholder');
  inp.style = 'background:#1e293b;color:#e2e8f0;border:1px solid #334155;padding:10px;border-radius:8px;font-size:11px;outline:none;';

  var btn = document.createElement('button');
  btn.innerHTML = '🎨 ' + t('gen');
  btn.style = 'width:100%;background:linear-gradient(90deg,#db2777,#be185d);color:#fff;border:none;padding:10px;border-radius:8px;font-weight:bold;cursor:pointer;';

  btn.onclick = function() {
    var p = inp.value.trim();
    if (!p) { if(window.showToast) window.showToast(gl()==='fr'?'Veuillez entrer une description':'Please enter a description'); return; }
    currentSVG = buildSVG(p);
    renderPreview(body, currentSVG, p);
  };

  body.appendChild(inp);
  body.appendChild(btn);

  if (currentSVG) {
    renderPreview(body, currentSVG, '');
  }

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

function renderPreview(body, svgStr, prompt) {
  var old = document.getElementById('svg-result-zone');
  if (old) old.remove();
  
  var zone = document.createElement('div');
  zone.id = 'svg-result-zone';
  zone.style = 'display:flex;flex-direction:column;gap:8px;';

  var preview = document.createElement('div');
  preview.style = 'padding:20px;background:#1e293b;border-radius:10px;display:flex;justify-content:center;align-items:center;border:1px solid #334155;';
  var svgEl = document.createElement('div');
  svgEl.innerHTML = svgStr;
  svgEl.firstChild && (svgEl.firstChild.style.width = '120px');
  svgEl.firstChild && (svgEl.firstChild.style.height = '120px');
  preview.appendChild(svgEl);
  zone.appendChild(preview);

  var pre = document.createElement('pre');
  pre.style = 'background:#000;color:#94a3b8;padding:8px;border-radius:6px;font-size:9px;overflow-x:auto;white-space:pre-wrap;max-height:100px;border:1px solid #334155;';
  pre.textContent = svgStr;
  zone.appendChild(pre);

  var btnRow = document.createElement('div');
  btnRow.style = 'display:flex;gap:8px;';

  var btnCopy = document.createElement('button');
  btnCopy.textContent = '📋 Copy SVG';
  btnCopy.style = 'flex:1;background:#334155;color:#e2e8f0;border:none;padding:8px;border-radius:6px;font-size:11px;cursor:pointer;';
  btnCopy.onclick = function() {
    navigator.clipboard.writeText(svgStr);
    btnCopy.textContent = t('copied');
    setTimeout(function() { btnCopy.textContent = '📋 Copy SVG'; }, 2000);
  };

  var btnInj = document.createElement('button');
  btnInj.textContent = '⬇️ ' + t('inject');
  btnInj.style = 'flex:1;background:#10b981;color:#fff;border:none;padding:8px;border-radius:6px;font-size:11px;cursor:pointer;';
  btnInj.onclick = function() {
    if (window.editor) {
      var code = window.editor.getValue();
      if (code.includes('</body>')) {
        window.editor.setValue(code.replace('</body>', '\n' + svgStr + '\n</body>'));
      } else {
        window.editor.setValue(code + '\n' + svgStr);
      }
      if (window.runPreview) window.runPreview();
      if (window.showToast) window.showToast(gl()==='fr'?'SVG injecté!':'SVG injected!');
    }
  };

  btnRow.appendChild(btnCopy);
  btnRow.appendChild(btnInj);
  zone.appendChild(btnRow);

  body.appendChild(zone);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() { if(typeof oAL==='function') oAL(); var el = document.getElementById('lbl-tab-svgstudio'); if(el) el.textContent = t('tab'); if(window.activeTab==='svgstudio') renderSVGTab(); };
  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='svgstudio') { window.activeTab='svgstudio'; document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');}); var el=document.getElementById('tab-svgstudio'); if(el) el.classList.add('active'); renderSVGTab(); return; }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
