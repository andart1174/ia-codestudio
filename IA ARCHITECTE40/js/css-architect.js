/**
 * CSS Architect Auto-Generator v1.0 — EN/FR
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: 'CSS Architect', title: '🎨 CSS Architect', sub: 'Design System Generator',
    desc: 'Scans your messy code, extracts all hardcoded colors, and automatically builds a professional CSS variables system (:root).',
    refactor: '⚡ Auto-Refactor Colors',
    done: '✅ CSS variables generated successfully!'
  },
  fr: {
    tab: 'Architecte CSS', title: '🎨 Architecte CSS', sub: 'Générateur de Système de Design',
    desc: 'Analyse votre code, extrait les couleurs écrites en dur et crée automatiquement un système professionnel de variables CSS (:root).',
    refactor: '⚡ Auto-Refactoriser les Couleurs',
    done: '✅ Variables CSS générées avec succès !'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

function autoRefactorCSS() {
  if(!window.editor) return;
  let code = window.editor.getValue();
  
  // Extract CSS block if any
  let styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let hasStyles = false;
  let uniqueColors = new Set();
  
  let match;
  while((match = styleRegex.exec(code)) !== null) {
    hasStyles = true;
    let cssContent = match[1];
    
    // Find hex colors
    let hexRegex = /#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})\b/g;
    let hexMatches = cssContent.match(hexRegex);
    if(hexMatches) hexMatches.forEach(c => uniqueColors.add(c.toLowerCase()));
    
    // Find rgb/rgba
    let rgbRegex = /rgba?\([\s\d.,]+\)/g;
    let rgbMatches = cssContent.match(rgbRegex);
    if(rgbMatches) rgbMatches.forEach(c => uniqueColors.add(c));
  }

  if(uniqueColors.size === 0) {
    if(window.showToast) window.showToast('No hardcoded colors found in <style>.');
    return;
  }

  // Generate :root
  let rootLines = [':root {'];
  let colorMap = {};
  let idx = 1;
  uniqueColors.forEach(c => {
    let varName = '--color-' + idx++;
    colorMap[c] = varName;
    rootLines.push('  ' + varName + ': ' + c + ';');
  });
  rootLines.push('}');
  
  let rootBlock = rootLines.join('\n');

  // Replace colors in styles
  let newCode = code.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, function(fullMatch, cssContent) {
    let newCss = cssContent;
    Object.keys(colorMap).forEach(col => {
      // Escape for regex
      let escapedCol = col.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      let regex = new RegExp(escapedCol + '(?![a-zA-Z0-9])', 'gi');
      newCss = newCss.replace(regex, 'var(' + colorMap[col] + ')');
    });
    
    // Insert :root at the top of the first style block
    if(fullMatch === code.match(/<style[^>]*>([\s\S]*?)<\/style>/i)[0]) {
       return '<style>\n' + rootBlock + '\n' + newCss + '</style>';
    }
    return '<style>' + newCss + '</style>';
  });

  window.editor.setValue(newCode);
  if(window.runPreview) window.runPreview();
  if(window.showToast) window.showToast(t('done'));
}

function renderCSSArchitectTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(245,158,11,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#fcd34d;">' + t('title') + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:15px;';

  var sec = document.createElement('div');
  sec.style = 'background:rgba(245,158,11,0.05);border:1px solid rgba(245,158,11,0.15);border-radius:8px;padding:12px;text-align:center;';
  
  var icon = document.createElement('div');
  icon.innerHTML = '🎨';
  icon.style = 'font-size:40px;margin-bottom:10px;';
  sec.appendChild(icon);

  var desc = document.createElement('div');
  desc.style = 'font-size:11px;color:#94a3b8;margin-bottom:15px;line-height:1.5;';
  desc.textContent = t('desc');
  sec.appendChild(desc);

  var btn = document.createElement('button');
  btn.textContent = t('refactor');
  btn.style = 'width:100%;background:linear-gradient(135deg,#f59e0b,#d97706);border:none;border-radius:6px;padding:10px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;';
  btn.onclick = autoRefactorCSS;
  sec.appendChild(btn);

  body.appendChild(sec);
  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-cssarchitect');
    if(el) el.textContent = t('tab');
    if(window.activeTab==='cssarchitect') renderCSSArchitectTab();
  };

  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='cssarchitect') {
      window.activeTab = 'cssarchitect';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn = document.getElementById('tab-cssarchitect');
      if(btn) btn.classList.add('active');
      renderCSSArchitectTab();
      return;
    }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
