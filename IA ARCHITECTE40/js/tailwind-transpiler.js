/**
 * 🎨 Tailwind & CSS Transpiler v1.0
 * IA Architecte — Code Studio Pro | EN/FR Bilingual
 * Fully decoupled script using decorator pattern
 */
(function() {
'use strict';

const TX = {
  en: {
    tab: 'Tailwind CSS',
    title: '🎨 Tailwind & CSS Transpiler',
    sub: 'Convert HTML utility classes to native clean CSS',
    desc: 'Scan your HTML code for Tailwind CSS utility classes and transpile them into standard native CSS stylesheets, cleaning up your HTML markup.',
    btnScan: '🔍 Scan Monaco HTML',
    btnTranspile: '⚡ Transpile to Native CSS',
    btnClean: '🧹 Clean HTML Classes',
    lblDetected: 'Detected Utilities',
    lblCleanMode: 'Transpilation Mode',
    modeAtomic: 'Atomic CSS (Keep classes, add style tag)',
    modeSemantic: 'Semantic CSS (Group classes, replace with semantic names)',
    successTranspile: 'Tailwind classes transpiled successfully!',
    successClean: 'HTML cleaned! Utility classes moved to stylesheet.',
    noHTML: 'No HTML code found or Monaco editor not initialized.',
    noClasses: 'No Tailwind utility classes detected in the editor code.',
    classesFound: 'Tailwind classes detected!'
  },
  fr: {
    tab: 'Tailwind CSS',
    title: '🎨 Transpileur Tailwind & CSS',
    sub: 'Convertissez les classes Tailwind en CSS natif propre',
    desc: 'Analysez votre code HTML à la recherche de classes utilitaires Tailwind et transpilez-les en feuilles de style CSS natives standards.',
    btnScan: '🔍 Analyser le HTML Monaco',
    btnTranspile: '⚡ Transpiler en CSS natif',
    btnClean: '🧹 Nettoyer le HTML',
    lblDetected: 'Utilitaires Détectés',
    lblCleanMode: 'Mode de Transpilation',
    modeAtomic: 'CSS Atomique (Garder les classes, ajouter style)',
    modeSemantic: 'CSS Sémantique (Regrouper, remplacer par noms sémantiques)',
    successTranspile: 'Classes Tailwind transpiles avec succès !',
    successClean: 'HTML nettoyé ! Classes utilitaires déplacées vers la feuille de style.',
    noHTML: 'Aucun code HTML trouvé ou éditeur Monaco non initialisé.',
    noClasses: 'Aucune classe utilitaire Tailwind détectée dans l\'éditeur.',
    classesFound: 'Classes Tailwind détectées !'
  }
};

function gl() { return window.lang || 'en'; }
const t = k => (TX[gl()] || TX.en)[k] || k;

// Extensive dictionary of Tailwind to Native CSS rules
const TW_DICT = {
  // Layout & Display
  'flex': 'display: flex;',
  'grid': 'display: grid;',
  'block': 'display: block;',
  'inline-block': 'display: inline-block;',
  'inline': 'display: inline;',
  'hidden': 'display: none;',
  'flex-row': 'flex-direction: row;',
  'flex-col': 'flex-direction: column;',
  'flex-wrap': 'flex-wrap: wrap;',
  'flex-1': 'flex: 1 1 0%;',
  'flex-auto': 'flex: 1 1 auto;',
  'flex-initial': 'flex: 0 1 auto;',
  'flex-none': 'flex: none;',
  'items-center': 'align-items: center;',
  'items-start': 'align-items: flex-start;',
  'items-end': 'align-items: flex-end;',
  'items-stretch': 'align-items: stretch;',
  'justify-center': 'justify-content: center;',
  'justify-start': 'justify-content: flex-start;',
  'justify-end': 'justify-content: flex-end;',
  'justify-between': 'justify-content: space-between;',
  'justify-around': 'justify-content: space-around;',
  'justify-evenly': 'justify-content: space-evenly;',

  // Spacing (Atomic mappings)
  'p-0': 'padding: 0px;', 'p-1': 'padding: 4px;', 'p-2': 'padding: 8px;', 'p-3': 'padding: 12px;', 'p-4': 'padding: 16px;', 'p-5': 'padding: 20px;', 'p-6': 'padding: 24px;', 'p-8': 'padding: 32px;', 'p-10': 'padding: 40px;', 'p-12': 'padding: 48px;',
  'px-0': 'padding-left: 0px; padding-right: 0px;', 'px-1': 'padding-left: 4px; padding-right: 4px;', 'px-2': 'padding-left: 8px; padding-right: 8px;', 'px-3': 'padding-left: 12px; padding-right: 12px;', 'px-4': 'padding-left: 16px; padding-right: 16px;', 'px-5': 'padding-left: 20px; padding-right: 20px;', 'px-6': 'padding-left: 24px; padding-right: 24px;', 'px-8': 'padding-left: 32px; padding-right: 32px;',
  'py-0': 'padding-top: 0px; padding-bottom: 0px;', 'py-1': 'padding-top: 4px; padding-bottom: 4px;', 'py-2': 'padding-top: 8px; padding-bottom: 8px;', 'py-3': 'padding-top: 12px; padding-bottom: 12px;', 'py-4': 'padding-top: 16px; padding-bottom: 16px;', 'py-5': 'padding-top: 20px; padding-bottom: 20px;', 'py-6': 'padding-top: 24px; padding-bottom: 24px;', 'py-8': 'padding-top: 32px; padding-bottom: 32px;',
  'pt-1': 'padding-top: 4px;', 'pt-2': 'padding-top: 8px;', 'pt-3': 'padding-top: 12px;', 'pt-4': 'padding-top: 16px;', 'pt-6': 'padding-top: 24px;', 'pt-8': 'padding-top: 32px;',
  'pb-1': 'padding-bottom: 4px;', 'pb-2': 'padding-bottom: 8px;', 'pb-3': 'padding-bottom: 12px;', 'pb-4': 'padding-bottom: 16px;', 'pb-6': 'padding-bottom: 24px;', 'pb-8': 'padding-bottom: 32px;',
  'pl-1': 'padding-left: 4px;', 'pl-2': 'padding-left: 8px;', 'pl-3': 'padding-left: 12px;', 'pl-4': 'padding-left: 16px;', 'pl-6': 'padding-left: 24px;',
  'pr-1': 'padding-right: 4px;', 'pr-2': 'padding-right: 8px;', 'pr-3': 'padding-right: 12px;', 'pr-4': 'padding-right: 16px;', 'pr-6': 'padding-right: 24px;',

  'm-0': 'margin: 0px;', 'm-1': 'margin: 4px;', 'm-2': 'margin: 8px;', 'm-3': 'margin: 12px;', 'm-4': 'margin: 16px;', 'm-5': 'margin: 20px;', 'm-6': 'margin: 24px;', 'm-8': 'margin: 32px;', 'mx-auto': 'margin-left: auto; margin-right: auto;',
  'mx-0': 'margin-left: 0px; margin-right: 0px;', 'mx-1': 'margin-left: 4px; margin-right: 4px;', 'mx-2': 'margin-left: 8px; margin-right: 8px;', 'mx-3': 'margin-left: 12px; margin-right: 12px;', 'mx-4': 'margin-left: 16px; margin-right: 16px;', 'mx-6': 'margin-left: 24px; margin-right: 24px;',
  'my-0': 'margin-top: 0px; margin-bottom: 0px;', 'my-1': 'margin-top: 4px; margin-bottom: 4px;', 'my-2': 'margin-top: 8px; margin-bottom: 8px;', 'my-3': 'margin-top: 12px; margin-bottom: 12px;', 'my-4': 'margin-top: 16px; margin-bottom: 16px;', 'my-6': 'margin-top: 24px; margin-bottom: 24px;',
  'mt-1': 'margin-top: 4px;', 'mt-2': 'margin-top: 8px;', 'mt-3': 'margin-top: 12px;', 'mt-4': 'margin-top: 16px;', 'mt-6': 'margin-top: 24px;', 'mt-8': 'margin-top: 32px;',
  'mb-1': 'margin-bottom: 4px;', 'mb-2': 'margin-bottom: 8px;', 'mb-3': 'margin-bottom: 12px;', 'mb-4': 'margin-bottom: 16px;', 'mb-6': 'margin-bottom: 24px;', 'mb-8': 'margin-bottom: 32px;',

  // Gap
  'gap-0': 'gap: 0px;', 'gap-1': 'gap: 4px;', 'gap-2': 'gap: 8px;', 'gap-3': 'gap: 12px;', 'gap-4': 'gap: 16px;', 'gap-5': 'gap: 20px;', 'gap-6': 'gap: 24px;', 'gap-8': 'gap: 32px;', 'gap-10': 'gap: 40px;', 'gap-12': 'gap: 48px;',

  // Sizing
  'w-full': 'width: 100%;', 'w-screen': 'width: 100vw;', 'w-auto': 'width: auto;', 'w-min': 'width: min-content;', 'w-max': 'width: max-content;',
  'h-full': 'height: 100%;', 'h-screen': 'height: 100vh;', 'h-auto': 'height: auto;',
  'min-h-screen': 'min-height: 100vh;', 'max-w-xs': 'max-width: 320px;', 'max-w-sm': 'max-width: 384px;', 'max-w-md': 'max-width: 448px;', 'max-w-lg': 'max-width: 512px;', 'max-w-xl': 'max-width: 576px;', 'max-w-2xl': 'max-width: 672px;', 'max-w-3xl': 'max-width: 768px;', 'max-w-4xl': 'max-width: 896px;', 'max-w-5xl': 'max-width: 1024px;', 'max-w-6xl': 'max-width: 1152px;', 'max-w-7xl': 'max-width: 1280px;',

  // Typography
  'text-xs': 'font-size: 12px; line-height: 16px;',
  'text-sm': 'font-size: 14px; line-height: 20px;',
  'text-base': 'font-size: 16px; line-height: 24px;',
  'text-lg': 'font-size: 18px; line-height: 28px;',
  'text-xl': 'font-size: 20px; line-height: 28px;',
  'text-2xl': 'font-size: 24px; line-height: 32px;',
  'text-3xl': 'font-size: 30px; line-height: 36px;',
  'text-4xl': 'font-size: 36px; line-height: 40px;',
  'text-5xl': 'font-size: 48px; line-height: 1;',
  'font-thin': 'font-weight: 100;',
  'font-extralight': 'font-weight: 200;',
  'font-light': 'font-weight: 300;',
  'font-normal': 'font-weight: 400;',
  'font-medium': 'font-weight: 500;',
  'font-semibold': 'font-weight: 600;',
  'font-bold': 'font-weight: 700;',
  'font-extrabold': 'font-weight: 800;',
  'font-black': 'font-weight: 900;',
  'text-left': 'text-align: left;',
  'text-center': 'text-align: center;',
  'text-right': 'text-align: right;',
  'text-justify': 'text-align: justify;',
  'uppercase': 'text-transform: uppercase;',
  'lowercase': 'text-transform: lowercase;',
  'capitalize': 'text-transform: capitalize;',
  'normal-case': 'text-transform: none;',
  'underline': 'text-decoration: underline;',
  'line-through': 'text-decoration: line-through;',
  'no-underline': 'text-decoration: none;',

  // Background Colors (Standard & Curated Colors)
  'bg-white': 'background-color: #ffffff;',
  'bg-black': 'background-color: #000000;',
  'bg-transparent': 'background-color: transparent;',
  'bg-slate-50': 'background-color: #f8fafc;', 'bg-slate-100': 'background-color: #f1f5f9;', 'bg-slate-200': 'background-color: #e2e8f0;', 'bg-slate-500': 'background-color: #64748b;', 'bg-slate-800': 'background-color: #1e293b;', 'bg-slate-900': 'background-color: #0f172a;',
  'bg-gray-50': 'background-color: #f9fafb;', 'bg-gray-100': 'background-color: #f3f4f6;', 'bg-gray-200': 'background-color: #e5e7eb;', 'bg-gray-500': 'background-color: #9ca3af;', 'bg-gray-800': 'background-color: #1f2937;', 'bg-gray-900': 'background-color: #111827;',
  'bg-blue-50': 'background-color: #eff6ff;', 'bg-blue-100': 'background-color: #dbeafe;', 'bg-blue-500': 'background-color: #3b82f6;', 'bg-blue-600': 'background-color: #2563eb;', 'bg-blue-700': 'background-color: #1d4ed8;', 'bg-blue-900': 'background-color: #1e3a8a;',
  'bg-red-500': 'background-color: #ef4444;', 'bg-red-600': 'background-color: #dc2626;',
  'bg-green-500': 'background-color: #10b981;', 'bg-green-600': 'background-color: #059669;',
  'bg-yellow-500': 'background-color: #f59e0b;',
  'bg-indigo-500': 'background-color: #6366f1;', 'bg-indigo-600': 'background-color: #4f46e5;',
  'bg-purple-500': 'background-color: #a855f7;', 'bg-purple-600': 'background-color: #9333ea;',

  // Text Colors
  'text-white': 'color: #ffffff;',
  'text-black': 'color: #000000;',
  'text-slate-500': 'color: #64748b;', 'text-slate-400': 'color: #94a3b8;', 'text-slate-300': 'color: #cbd5e1;',
  'text-gray-500': 'color: #9ca3af;', 'text-gray-400': 'color: #cbd5e1;',
  'text-blue-500': 'color: #3b82f6;', 'text-blue-400': 'color: #60a5fa;',
  'text-red-500': 'color: #ef4444;',
  'text-green-500': 'color: #10b981;',
  'text-yellow-500': 'color: #f59e0b;',
  'text-indigo-500': 'color: #6366f1;',
  'text-purple-500': 'color: #a855f7;',

  // Borders
  'border': 'border-width: 1px; border-style: solid;',
  'border-0': 'border-width: 0px;',
  'border-2': 'border-width: 2px; border-style: solid;',
  'border-4': 'border-width: 4px; border-style: solid;',
  'border-slate-200': 'border-color: #e2e8f0;', 'border-slate-800': 'border-color: #1e293b;',
  'border-gray-200': 'border-color: #e5e7eb;', 'border-gray-700': 'border-color: #374151;',
  'border-blue-500': 'border-color: #3b82f6;',
  'border-transparent': 'border-color: transparent;',

  // Rounded Corners
  'rounded-none': 'border-radius: 0px;',
  'rounded-sm': 'border-radius: 2px;',
  'rounded': 'border-radius: 4px;',
  'rounded-md': 'border-radius: 6px;',
  'rounded-lg': 'border-radius: 8px;',
  'rounded-xl': 'border-radius: 12px;',
  'rounded-2xl': 'border-radius: 16px;',
  'rounded-3xl': 'border-radius: 24px;',
  'rounded-full': 'border-radius: 9999px;',

  // Effects & Position
  'shadow-sm': 'box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);',
  'shadow': 'box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);',
  'shadow-md': 'box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);',
  'shadow-lg': 'box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);',
  'shadow-xl': 'box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);',
  'shadow-none': 'box-shadow: none;',
  'relative': 'position: relative;',
  'absolute': 'position: absolute;',
  'fixed': 'position: fixed;',
  'sticky': 'position: sticky;',
  'top-0': 'top: 0px;', 'right-0': 'right: 0px;', 'bottom-0': 'bottom: 0px;', 'left-0': 'left: 0px;',
  'z-0': 'z-index: 0;', 'z-10': 'z-index: 10;', 'z-20': 'z-index: 20;', 'z-35': 'z-index: 35;', 'z-50': 'z-index: 50;',

  // Miscellaneous
  'overflow-hidden': 'overflow: hidden;',
  'overflow-auto': 'overflow: auto;',
  'cursor-pointer': 'cursor: pointer;',
  'cursor-not-allowed': 'cursor: not-allowed;',
  'transition': 'transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;',
  'duration-200': 'transition-duration: 200ms;',
  'duration-300': 'transition-duration: 300ms;',
  'ease-in-out': 'transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);',
  'opacity-0': 'opacity: 0;', 'opacity-50': 'opacity: 0.5;', 'opacity-100': 'opacity: 1;'
};

let detectedClasses = [];
let transpileMode = 'semantic'; // atomic or semantic

function scanHtml() {
  const ed = window.editor;
  if (!ed) return;
  const html = ed.getValue();
  
  // Extract all class="..." contents
  const regex = /class=["']([^"']+)["']/g;
  let match;
  const classesSet = new Set();
  
  while ((match = regex.exec(html)) !== null) {
    const list = match[1].split(/\s+/);
    list.forEach(cls => {
      if (cls && (TW_DICT[cls] || cls.includes('-['))) {
        classesSet.add(cls);
      }
    });
  }

  detectedClasses = Array.from(classesSet);
  renderTranspileTab();
  if (window.showToast) {
    window.showToast(`${detectedClasses.length} ${t('classesFound')}`);
  }
}

function parseArbitraryClass(cls) {
  const arb = cls.match(/^([\w-]+)-\[(.+)\]$/);
  if (arb) {
    const prop = arb[1];
    const val = arb[2];
    const propMap = {
      'w': 'width', 'h': 'height', 'max-w': 'max-width', 'min-w': 'min-width',
      'text': 'font-size', 'm': 'margin', 'p': 'padding', 'top': 'top',
      'left': 'left', 'right': 'right', 'bottom': 'bottom', 'z': 'z-index',
      'bg': 'background-color', 'border': 'border-color'
    };
    if (propMap[prop]) {
      return `${propMap[prop]}: ${val};`;
    }
  }
  return null;
}

function compileClassToCss(cls) {
  if (TW_DICT[cls]) return TW_DICT[cls];
  return parseArbitraryClass(cls);
}

function runTranspilation() {
  const ed = window.editor;
  if (!ed) {
    alert(t('noHTML'));
    return;
  }
  let html = ed.getValue();

  // Scan classes first
  scanHtml();
  if (detectedClasses.length === 0) {
    alert(t('noClasses'));
    return;
  }

  let stylesheet = '\n  /* 🎨 Transpiled Native CSS Stylesheet */\n';

  if (transpileMode === 'atomic') {
    // Mode Atomic: create rule for each utility class
    detectedClasses.forEach(cls => {
      const cssRules = compileClassToCss(cls);
      if (cssRules) {
        // Escape characters for valid CSS selector (e.g. w-1/2 -> w-1\/2, bg-blue-500 -> bg-blue-500)
        const escapedSelector = cls.replace(/([/:.[\]])/g, '\\$1');
        stylesheet += `  .${escapedSelector} { ${cssRules} }\n`;
      }
    });
  } else {
    // Mode Semantic: Group all classes per tag into a semantic selector, e.g. tw-style-1
    const classRegex = /class=["']([^"']+)["']/g;
    let match;
    let index = 1;
    const replacements = [];
    
    // Scan all tags and replace classes with custom classes
    let tempHtml = html;
    
    while ((match = classRegex.exec(html)) !== null) {
      const originalClassValue = match[1];
      const list = originalClassValue.split(/\s+/);
      const twList = list.filter(cls => TW_DICT[cls] || cls.includes('-['));
      const nonTwList = list.filter(cls => !TW_DICT[cls] && !cls.includes('-['));

      if (twList.length > 0) {
        const className = `tw-element-${index++}`;
        let elementStyles = '';
        
        twList.forEach(cls => {
          const rule = compileClassToCss(cls);
          if (rule) {
            elementStyles += `    ${rule}\n`;
          }
        });

        if (elementStyles) {
          stylesheet += `  .${className} {\n${elementStyles}  }\n`;
          const finalClasses = [...nonTwList, className].join(' ');
          
          // Add details for replacement chunk
          replacements.push({
            original: match[0],
            replacement: `class="${finalClasses}"`
          });
        }
      }
    }

    // Apply replacements on HTML
    replacements.forEach(r => {
      tempHtml = tempHtml.replace(r.original, r.replacement);
    });
    
    html = tempHtml;
  }

  stylesheet += '  ';

  // Inject stylesheet into HTML
  // Check if head style block already exists
  const styleBlockStart = '<style id="tailwind-transpiled">';
  const styleBlockEnd = '</style>';
  const finalStyleBlock = `${styleBlockStart}\n${stylesheet}${styleBlockEnd}`;

  if (html.includes(styleBlockStart)) {
    // Replace old transpiled style block
    const parts = html.split(styleBlockStart);
    const afterStart = parts[1];
    const innerParts = afterStart.split(styleBlockEnd);
    innerParts[0] = `\n${stylesheet}`;
    html = parts[0] + styleBlockStart + innerParts.join(styleBlockEnd);
  } else if (html.includes('</head>')) {
    html = html.replace('</head>', finalStyleBlock + '\n</head>');
  } else if (html.includes('<style>')) {
    html = html.replace('<style>', finalStyleBlock + '\n<style>');
  } else {
    html = finalStyleBlock + '\n' + html;
  }

  ed.setValue(html);
  if (window.showToast) window.showToast(t('successTranspile'));
  if (window.runPreview) window.runPreview();
  scanHtml();
}

function cleanHtmlClasses() {
  // Cleans all empty class fields or does final validation
  runTranspilation();
  if (window.showToast) window.showToast(t('successClean'));
}

function renderTranspileTab() {
  const parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';

  const wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;background:#090d16;color:#e2e8f0;font-family:"Inter",sans-serif;';

  const hdr = document.createElement('div');
  hdr.style = 'padding:14px;border-bottom:1px solid rgba(56,189,248,0.25);flex-shrink:0;background:linear-gradient(135deg,rgba(56,189,248,0.1),rgba(59,130,246,0.05));';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#0ea5e9;">' + t('title') + '</div>' +
                  '<div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  const scrollContainer = document.createElement('div');
  scrollContainer.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:12px;scrollbar-width:thin;';

  const desc = document.createElement('div');
  desc.style = 'font-size:10.5px;color:#94a3b8;line-height:1.5;';
  desc.textContent = t('desc');
  scrollContainer.appendChild(desc);

  // Scan Button
  const scanBtn = document.createElement('button');
  scanBtn.textContent = t('btnScan');
  scanBtn.style = 'background:rgba(56,189,248,0.12);color:#38bdf8;border:1px solid rgba(56,189,248,0.25);border-radius:8px;padding:9px;font-weight:800;font-size:10.5px;cursor:pointer;';
  scanBtn.onclick = scanHtml;
  scrollContainer.appendChild(scanBtn);

  // Stats
  const statBox = document.createElement('div');
  statBox.style = 'background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:8px;padding:10px;display:flex;justify-content:space-between;align-items:center;';
  statBox.innerHTML = `<span style="font-size:10.5px;color:#94a3b8;">${t('lblDetected')}:</span>` +
                      `<strong style="font-size:12px;color:#38bdf8;">${detectedClasses.length} classes</strong>`;
  scrollContainer.appendChild(statBox);

  // Detected pill list
  if (detectedClasses.length > 0) {
    const listWrap = document.createElement('div');
    listWrap.style = 'display:flex;flex-wrap:wrap;gap:4px;max-height:80px;overflow-y:auto;background:#020617;border-radius:8px;padding:6px;border:1px solid rgba(255,255,255,0.04);';
    detectedClasses.forEach(cls => {
      const pill = document.createElement('span');
      pill.textContent = cls;
      pill.style = 'font-family:monospace;font-size:8px;background:rgba(56,189,248,0.1);color:#7dd3fc;border:1px solid rgba(56,189,248,0.2);padding:2px 5px;border-radius:4px;';
      listWrap.appendChild(pill);
    });
    scrollContainer.appendChild(listWrap);
  }

  // Transpile mode settings
  const modeHdr = document.createElement('div');
  modeHdr.style = 'font-size:9.5px;font-weight:800;color:#64748b;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:3px;margin-top:4px;';
  modeHdr.textContent = t('lblCleanMode');
  scrollContainer.appendChild(modeHdr);

  const modeCard = document.createElement('div');
  modeCard.style = 'background:#111827;border:1px solid rgba(255,255,255,0.05);border-radius:8px;padding:8px;display:flex;flex-direction:column;gap:6px;';
  
  const m1 = document.createElement('label');
  m1.style = 'display:flex;align-items:center;gap:8px;font-size:10px;cursor:pointer;';
  m1.innerHTML = `<input type="radio" name="transpilemode" value="semantic" ${transpileMode === 'semantic' ? 'checked' : ''} /> <span>${t('modeSemantic')}</span>`;
  m1.querySelector('input').onchange = function() { transpileMode = this.value; };
  
  const m2 = document.createElement('label');
  m2.style = 'display:flex;align-items:center;gap:8px;font-size:10px;cursor:pointer;';
  m2.innerHTML = `<input type="radio" name="transpilemode" value="atomic" ${transpileMode === 'atomic' ? 'checked' : ''} /> <span>${t('modeAtomic')}</span>`;
  m2.querySelector('input').onchange = function() { transpileMode = this.value; };

  modeCard.appendChild(m1);
  modeCard.appendChild(m2);
  scrollContainer.appendChild(modeCard);

  // Big Action buttons
  const transBtn = document.createElement('button');
  transBtn.innerHTML = t('btnTranspile');
  transBtn.style = 'background:linear-gradient(90deg,#0284c7,#3b82f6);color:#fff;border:none;border-radius:8px;padding:11px;font-weight:800;font-size:11px;cursor:pointer;margin-top:4px;box-shadow:0 4px 15px rgba(59,130,246,0.3);';
  transBtn.onclick = runTranspilation;
  scrollContainer.appendChild(transBtn);

  const cleanBtn = document.createElement('button');
  cleanBtn.innerHTML = t('btnClean');
  cleanBtn.style = 'background:rgba(16,185,129,0.1);color:#10b981;border:1px solid rgba(16,185,129,0.3);border-radius:8px;padding:10px;font-weight:800;font-size:10.5px;cursor:pointer;';
  cleanBtn.onclick = cleanHtmlClasses;
  scrollContainer.appendChild(cleanBtn);

  wrap.appendChild(scrollContainer);
  parent.appendChild(wrap);
}

// Hook tab triggers
document.addEventListener('DOMContentLoaded', function() {
  const oAL = window.applyLang;
  window.applyLang = function() {
    if (typeof oAL === 'function') oAL();
    const el = document.getElementById('lbl-tab-tailwindtranspile');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'tailwindtranspile') renderTranspileTab();
  };

  const oRT = window.renderTab;
  window.renderTab = function(tab) {
    if (tab === 'tailwindtranspile') {
      window.activeTab = 'tailwindtranspile';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('tab-tailwindtranspile');
      if (btn) btn.classList.add('active');
      renderTranspileTab();
      scanHtml();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
