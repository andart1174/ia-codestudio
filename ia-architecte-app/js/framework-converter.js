/**
 * Multi-Framework Converter v1.0 — EN/FR
 * Converts HTML/CSS/JS code to React, Vue, Svelte, Angular
 */
(function () {
  'use strict';

  var TX = {
    en: {
      tab: 'Convert',
      title: '🔄 Multi-Framework Converter',
      sub: 'Convert your code to any framework',
      desc: 'Transform your HTML/CSS/JS into a ready-to-use component for React, Vue 3, Svelte or Angular.',
      pickFrame: 'Target Framework:',
      btnConvert: '⚡ Convert Now',
      btnCopy: '📋 Copy Code',
      btnInject: '➕ Replace in Editor',
      converting: '⏳ Converting...',
      done: '✅ Code converted and injected!',
      copied: '📋 Code copied!',
      noCode: '⚠️ Write some HTML in the editor first.',
      previewLabel: 'Generated Component:',
      react: 'React (JSX)',
      vue: 'Vue 3 (SFC)',
      svelte: 'Svelte',
      angular: 'Angular',
      tip: '💡 Tip: The converter wraps your HTML into a component, converts class→className (React), and moves styles into the component.'
    },
    fr: {
      tab: 'Convertir',
      title: '🔄 Convertisseur Multi-Framework',
      sub: 'Convertissez votre code en n\'importe quel framework',
      desc: 'Transformez votre HTML/CSS/JS en composant prêt à l\'emploi pour React, Vue 3, Svelte ou Angular.',
      pickFrame: 'Framework cible :',
      btnConvert: '⚡ Convertir Maintenant',
      btnCopy: '📋 Copier le Code',
      btnInject: '➕ Remplacer dans l\'Éditeur',
      converting: '⏳ Conversion en cours...',
      done: '✅ Code converti et injecté !',
      copied: '📋 Code copié !',
      noCode: '⚠️ Écrivez du HTML dans l\'éditeur d\'abord.',
      previewLabel: 'Composant Généré :',
      react: 'React (JSX)',
      vue: 'Vue 3 (SFC)',
      svelte: 'Svelte',
      angular: 'Angular',
      tip: '💡 Astuce : Le convertisseur encapsule votre HTML dans un composant, convertit class→className (React) et déplace les styles dans le composant.'
    }
  };

  function gl() { return window.lang || 'en'; }
  function t(k) { return (TX[gl()] || TX.en)[k] || k; }

  var currentFramework = 'react';
  var lastConverted = '';
  var originalSource = '';  // Always convert from this, never from converted output

  // Detect if code is already a framework component (not plain HTML)
  function isFrameworkCode(code) {
    return /^\s*(import\s+React|import\s*\{|export\s+default\s+function|@Component|<template>|<script\s+setup)/m.test(code);
  }

  /* ── CONVERSION LOGIC ── */

  function extractParts(code) {
    // If code has a full HTML <body>, extract from it
    var htmlMatch = code.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    var html = htmlMatch ? htmlMatch[1].trim() : code.trim();

    var cssBlocks = [];
    // Only extract <style> tags that are plain HTML style tags (not framework)
    code.replace(/<style(?:\s+(?!scoped)[^>]*)?>((?:(?!<\/style>)[\s\S])*?)<\/style>/gi, function(_, css) {
      var c = css.trim();
      // Skip framework boilerplate
      if (c && !c.includes('import ') && !c.includes('export ')) cssBlocks.push(c);
    });

    var jsBlocks = [];
    // Only extract plain <script> blocks from HTML, skip framework imports
    code.replace(/<script(?!\s+setup)(?:\s+(?!src)[^>]*)?>((?:(?!<\/script>)[\s\S])*?)<\/script>/gi, function(_, js) {
      var j = js.trim();
      // Skip framework import boilerplate
      if (j && !j.includes('from \'react\'') && !j.includes('from "react"') &&
          !j.includes('from \'vue\'') && !j.includes('from "vue"') &&
          !j.includes('from \'svelte\'') && !j.includes('from \'@angular') &&
          !j.includes('src=')) {
        jsBlocks.push(j);
      }
    });

    // Remove style/script tags from html
    html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '').trim();
    html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '').trim();
    // Remove framework-specific wrappers if present
    html = html.replace(/^<template>([\s\S]*?)<\/template>$/i, '$1').trim();

    return {
      html: html || '<div class="app"><h1>Hello World</h1></div>',
      css: cssBlocks.join('\n\n') || '',
      js: jsBlocks.join('\n\n') || ''
    };
  }

  function htmlToJSX(html) {
    // NOTE: No lookbehind regex — not supported in all browsers
    return html
      .replace(/class=/g, 'className=')
      .replace(/for=/g, 'htmlFor=')
      .replace(/<(input|img|br|hr|link|meta)(\b[^>]*?)\/?>/gi, function(_, tag, attrs) {
        return '<' + tag + attrs.replace(/\/$/, '').trimRight() + ' />';
      })
      .replace(/style="([^"]*)"/g, function(_, s) {
        var obj = s.split(';').filter(Boolean).map(function(p) {
          var kv = p.split(':');
          if (kv.length < 2) return '';
          var key = kv[0].trim().replace(/-([a-z])/g, function(_, c) { return c.toUpperCase(); });
          var val = kv.slice(1).join(':').trim();
          return '"' + key + '": "' + val + '"';
        }).filter(Boolean).join(', ');
        return 'style={{' + obj + '}}';
      });
  }

  function toReact(parts) {
    var jsx = htmlToJSX(parts.html);
    var lines = jsx.split('\n').map(function(l) { return '      ' + l; }).join('\n');
    var cssSection = parts.css ? '\nconst styles = `\n' + parts.css + '\n`;\n' : '';
    var jsSection = parts.js ? '\n// Logic\n' + parts.js.replace(/document\.getElementById/g, '/* useRef: */ document.getElementById') + '\n' : '';
    return '// React Component — Generated by IA Architecte\nimport React, { useEffect, useRef } from \'react\';\n' +
      (parts.css ? 'import \'./App.css\';\n' : '') +
      '\nexport default function App() {\n' +
      (parts.js ? '  useEffect(() => {\n    // TODO: Move DOM logic to refs/state\n  }, []);\n\n' : '') +
      '  return (\n    <>\n' + lines + '\n    </>\n  );\n}\n' +
      cssSection + jsSection;
  }

  function toVue(parts) {
    var indent = parts.html.split('\n').map(function(l) { return '  ' + l; }).join('\n');
    return '<!-- Vue 3 SFC — Generated by IA Architecte -->\n<template>\n' + indent + '\n</template>\n\n' +
      '<script setup>\nimport { onMounted } from \'vue\';\n\nonMounted(() => {\n' +
      (parts.js ? parts.js.split('\n').map(function(l){return '  '+l;}).join('\n') : '  // TODO: Add logic here') +
      '\n});\n</script>\n\n' +
      (parts.css ? '<style scoped>\n' + parts.css + '\n</style>' : '');
  }

  function toSvelte(parts) {
    return '<!-- Svelte Component — Generated by IA Architecte -->\n<script>\n  import { onMount } from \'svelte\';\n\n  onMount(() => {\n' +
      (parts.js ? parts.js.split('\n').map(function(l){return '    '+l;}).join('\n') : '    // TODO: Add logic here') +
      '\n  });\n</script>\n\n' +
      parts.html + '\n\n' +
      (parts.css ? '<style>\n' + parts.css + '\n</style>' : '');
  }

  function toAngular(parts) {
    var selector = 'app-root';
    return '// Angular Component — Generated by IA Architecte\nimport { Component, OnInit } from \'@angular/core\';\n\n@Component({\n' +
      '  selector: \'' + selector + '\',\n' +
      '  template: `\n' + parts.html.split('\n').map(function(l){return '    '+l;}).join('\n') + '\n  `,' +
      (parts.css ? '\n  styles: [`\n' + parts.css + '\n  `],' : '') +
      '\n})\nexport class AppComponent implements OnInit {\n' +
      '  ngOnInit(): void {\n' +
      (parts.js ? parts.js.split('\n').map(function(l){return '    '+l;}).join('\n') : '    // TODO: Add logic here') +
      '\n  }\n}\n';
  }

  function convert(code, framework) {
    try {
      var parts = extractParts(code);
      switch (framework) {
        case 'react':   return toReact(parts);
        case 'vue':     return toVue(parts);
        case 'svelte':  return toSvelte(parts);
        case 'angular': return toAngular(parts);
        default:        return toReact(parts);
      }
    } catch(e) {
      return '// ⚠️ Conversion error: ' + e.message + '\n// Please check your input HTML.';
    }
  }

  // Frameworks that output non-HTML (cannot be auto-run in preview)
  var NON_HTML_FRAMEWORKS = ['vue', 'svelte', 'react', 'angular'];

  /* ── RENDER ── */

  function renderTab() {
    var parent = document.getElementById('left-body');
    if (!parent) return;
    parent.innerHTML = '';

    var wrap = document.createElement('div');
    wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';

    /* Header */
    var hdr = document.createElement('div');
    hdr.style = 'padding:12px 14px 10px;border-bottom:1px solid rgba(99,102,241,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(99,102,241,0.12),rgba(168,85,247,0.08));';
    hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#a78bfa;letter-spacing:0.5px;">' + t('title') + '</div>' +
      '<div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
    wrap.appendChild(hdr);

    var body = document.createElement('div');
    body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';

    /* Tip */
    var tip = document.createElement('div');
    tip.style = 'font-size:10px;color:#94a3b8;background:rgba(99,102,241,0.07);border:1px solid rgba(99,102,241,0.2);border-radius:6px;padding:8px 10px;line-height:1.5;';
    tip.textContent = t('tip');
    body.appendChild(tip);

    /* Framework selector */
    var fLabel = document.createElement('div');
    fLabel.style = 'font-size:10px;color:#64748b;font-weight:600;margin-top:2px;';
    fLabel.textContent = t('pickFrame');
    body.appendChild(fLabel);

    var frameworks = [
      { id: 'react',   label: '⚛️ ' + t('react'),   color: '#61dafb' },
      { id: 'vue',     label: '🟢 ' + t('vue'),     color: '#42b883' },
      { id: 'svelte',  label: '🔥 ' + t('svelte'),  color: '#ff3e00' },
      { id: 'angular', label: '🔴 ' + t('angular'), color: '#dd0031' }
    ];

    var fRow = document.createElement('div');
    fRow.style = 'display:grid;grid-template-columns:1fr 1fr;gap:6px;';

    frameworks.forEach(function(fw) {
      var btn = document.createElement('button');
      btn.id = 'fw-btn-' + fw.id;
      btn.textContent = fw.label;
      btn.style = 'padding:8px 6px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;border:2px solid ' +
        (currentFramework === fw.id ? fw.color : 'rgba(255,255,255,0.1)') + ';' +
        'background:' + (currentFramework === fw.id ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.03)') + ';' +
        'color:' + (currentFramework === fw.id ? fw.color : '#94a3b8') + ';transition:all 0.2s;';
      btn.onclick = function() {
        currentFramework = fw.id;
        renderTab();
      };
      fRow.appendChild(btn);
    });
    body.appendChild(fRow);

    /* Convert button */
    var convertBtn = document.createElement('button');
    convertBtn.innerHTML = t('btnConvert');
    convertBtn.style = 'width:100%;background:linear-gradient(135deg,#7c3aed,#4f46e5);color:#fff;border:none;padding:12px;border-radius:10px;font-weight:900;font-size:12px;cursor:pointer;box-shadow:0 4px 20px rgba(124,58,237,0.4);letter-spacing:0.5px;transition:all 0.2s;';
    convertBtn.onmouseover = function() { this.style.transform = 'translateY(-1px)'; this.style.boxShadow = '0 6px 25px rgba(124,58,237,0.6)'; };
    convertBtn.onmouseout = function() { this.style.transform = ''; this.style.boxShadow = '0 4px 20px rgba(124,58,237,0.4)'; };

    convertBtn.onclick = function() {
      if (!window.editor) return;
      var code = window.editor.getValue();
      if (!code.trim()) {
        if (window.showToast) window.showToast(t('noCode'));
        return;
      }
      convertBtn.innerHTML = t('converting');
      convertBtn.disabled = true;

      // Save original source ONLY if current editor code is plain HTML (not framework output)
      if (!isFrameworkCode(code)) {
        originalSource = code;
      } else if (!originalSource) {
        // No original saved yet — try to extract usable HTML from framework code
        originalSource = code;
      }

      setTimeout(function() {
        try {
          lastConverted = convert(originalSource, currentFramework);
        } catch(e) {
          lastConverted = '// ⚠️ Error: ' + e.message;
        }
        var pre = document.getElementById('fc-output');
        if (pre) { pre.textContent = lastConverted; }
        convertBtn.innerHTML = t('btnConvert');
        convertBtn.disabled = false;
        var actRow = document.getElementById('fc-actions');
        if (actRow) actRow.style.display = 'flex';
        // Show reset button
        var rst = document.getElementById('fc-reset');
        if (rst) rst.style.display = 'block';
      }, 50);
    };
    body.appendChild(convertBtn);

    /* Reset source button */
    var rstBtn = document.createElement('button');
    rstBtn.id = 'fc-reset';
    rstBtn.innerHTML = gl()==='fr' ? '🔄 Réinitialiser la Source HTML' : '🔄 Reset to Original HTML';
    rstBtn.style = 'width:100%;background:rgba(239,68,68,0.1);color:#f87171;border:1px solid rgba(239,68,68,0.3);padding:7px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;' + (originalSource ? '' : 'display:none;');
    rstBtn.onclick = function() {
      if (originalSource && window.editor) {
        var chk = document.getElementById('autorun-chk');
        if (chk) chk.checked = true;
        window.editor.setValue(originalSource);
        if (window.runPreview) window.runPreview();
        originalSource = '';
        lastConverted = '';
        renderTab();
      }
    };
    body.appendChild(rstBtn);

    /* Output label */
    var outLabel = document.createElement('div');
    outLabel.style = 'font-size:10px;color:#64748b;font-weight:600;';
    outLabel.textContent = t('previewLabel');
    body.appendChild(outLabel);

    /* Code output */
    var pre = document.createElement('pre');
    pre.id = 'fc-output';
    pre.style = 'background:#0d1117;border:1px solid rgba(99,102,241,0.25);border-radius:8px;padding:12px;font-family:"JetBrains Mono",monospace;font-size:9.5px;color:#c9d1d9;overflow:auto;max-height:280px;white-space:pre-wrap;word-break:break-word;line-height:1.5;margin:0;';
    pre.textContent = lastConverted || (gl() === 'fr' ? '// Cliquez sur "Convertir" pour générer le composant...' : '// Click "Convert Now" to generate the component...');
    body.appendChild(pre);

    /* Action buttons */
    var actRow = document.createElement('div');
    actRow.id = 'fc-actions';
    actRow.style = 'display:' + (lastConverted ? 'flex' : 'none') + ';gap:8px;';

    var copyBtn = document.createElement('button');
    copyBtn.innerHTML = t('btnCopy');
    copyBtn.style = 'flex:1;background:rgba(99,102,241,0.15);color:#a78bfa;border:1px solid rgba(99,102,241,0.4);padding:9px;border-radius:8px;font-size:11px;font-weight:700;cursor:pointer;';
    copyBtn.onclick = function() {
      if (lastConverted) {
        navigator.clipboard.writeText(lastConverted).then(function() {
          if (window.showToast) window.showToast(t('copied'));
        });
      }
    };

    var injectBtn = document.createElement('button');
    injectBtn.innerHTML = t('btnInject');
    injectBtn.style = 'flex:1;background:rgba(16,185,129,0.15);color:#34d399;border:1px solid rgba(16,185,129,0.4);padding:9px;border-radius:8px;font-size:11px;font-weight:700;cursor:pointer;';
    injectBtn.onclick = function() {
      if (window.editor && lastConverted) {
        // Disable auto-run for non-HTML frameworks to prevent preview crash
        var chk = document.getElementById('autorun-chk');
        var wasChecked = chk && chk.checked;
        if (chk && NON_HTML_FRAMEWORKS.indexOf(currentFramework) !== -1) chk.checked = false;
        window.editor.setValue(lastConverted);
        if (window.showToast) window.showToast(t('done'));
        // Re-enable autorun after a safe delay
        if (wasChecked) setTimeout(function() { if(chk) chk.checked = true; }, 800);
      }
    };

    actRow.appendChild(copyBtn);
    actRow.appendChild(injectBtn);
    body.appendChild(actRow);

    wrap.appendChild(body);
    parent.appendChild(wrap);
  }

  /* ── REGISTER ── */
  document.addEventListener('DOMContentLoaded', function () {
    var oAL = window.applyLang;
    window.applyLang = function () {
      if (typeof oAL === 'function') oAL();
      var el = document.getElementById('lbl-tab-fwconvert');
      if (el) el.textContent = t('tab');
      if (window.activeTab === 'fwconvert') renderTab();
    };

    var oRT = window.renderTab;
    window.renderTab = function (tab) {
      if (tab === 'fwconvert') {
        window.activeTab = 'fwconvert';
        document.querySelectorAll('.ltab').forEach(function (b) { b.classList.remove('active'); });
        var btn = document.getElementById('tab-fwconvert');
        if (btn) btn.classList.add('active');
        renderTab();
        return;
      }
      if (typeof oRT === 'function') oRT(tab);
    };
  });
})();
