// Tailwind CSS v3/v4 to Vanilla HTML/CSS Pro Transpiler

let outputMode = 'inline'; // 'inline' | 'style'

const defaultTailwindInput = `<div class="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl border border-slate-200 p-8">
  <div class="md:flex items-center gap-6">
    <div class="p-4">
      <div class="uppercase tracking-wide text-sm text-indigo-600 font-semibold">AI Technology</div>
      <a href="#" class="block mt-1 text-xl leading-tight font-bold text-slate-900 hover:underline">Finding the best WebGL tools for developers</a>
      <p class="mt-2 text-slate-500 leading-relaxed">IA Code Studio brings interactive graphics and clean vanilla CSS directly to your browser.</p>
      <button class="mt-4 px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-lg shadow hover:bg-indigo-700 cursor-pointer border-none">Learn More</button>
    </div>
  </div>
</div>`;

// Full Tailwind v3/v4 color palette (50-950)
const TW_PALETTE = {
  slate:   { 50:'#f8fafc',100:'#f1f5f9',200:'#e2e8f0',300:'#cbd5e1',400:'#94a3b8',500:'#64748b',600:'#475569',700:'#334155',800:'#1e293b',900:'#0f172a',950:'#020617' },
  gray:    { 50:'#f9fafb',100:'#f3f4f6',200:'#e5e7eb',300:'#d1d5db',400:'#9ca3af',500:'#6b7280',600:'#4b5563',700:'#374151',800:'#1f2937',900:'#111827',950:'#030712' },
  zinc:    { 50:'#fafafa',100:'#f4f4f5',200:'#e4e4e7',300:'#d4d4d8',400:'#a1a1aa',500:'#71717a',600:'#52525b',700:'#3f3f46',800:'#27272a',900:'#18181b',950:'#09090b' },
  neutral: { 50:'#fafafa',100:'#f5f5f5',200:'#e5e5e5',300:'#d4d4d4',400:'#a3a3a3',500:'#737373',600:'#525252',700:'#404040',800:'#262626',900:'#171717',950:'#0a0a0a' },
  red:     { 50:'#fef2f2',100:'#fee2e2',200:'#fecaca',300:'#fca5a5',400:'#f87171',500:'#ef4444',600:'#dc2626',700:'#b91c1c',800:'#991b1b',900:'#7f1d1d',950:'#450a0a' },
  orange:  { 50:'#fff7ed',100:'#ffedd5',200:'#fed7aa',300:'#fdba74',400:'#fb923c',500:'#f97316',600:'#ea580c',700:'#c2410c',800:'#9a3412',900:'#7c2d12',950:'#431407' },
  amber:   { 50:'#fffbeb',100:'#fef3c7',200:'#fde68a',300:'#fcd34d',400:'#fbbf24',500:'#f59e0b',600:'#d97706',700:'#b45309',800:'#92400e',900:'#78350f',950:'#451a03' },
  yellow:  { 50:'#fefce8',100:'#fef9c3',200:'#fef08a',300:'#fde047',400:'#facc15',500:'#eab308',600:'#ca8a04',700:'#a16207',800:'#854d0e',900:'#713f12',950:'#422006' },
  lime:    { 50:'#f7fee7',100:'#ecfccb',200:'#d9f99d',300:'#bef264',400:'#a3e635',500:'#84cc16',600:'#65a30d',700:'#4d7c0f',800:'#3f6212',900:'#365314',950:'#1a2e05' },
  green:   { 50:'#f0fdf4',100:'#dcfce7',200:'#bbf7d0',300:'#86efac',400:'#4ade80',500:'#22c55e',600:'#16a34a',700:'#15803d',800:'#166534',900:'#14532d',950:'#052e16' },
  emerald: { 50:'#ecfdf5',100:'#d1fae5',200:'#a7f3d0',300:'#6ee7b7',400:'#34d399',500:'#10b981',600:'#059669',700:'#047857',800:'#065f46',900:'#064e3b',950:'#022c22' },
  teal:    { 50:'#f0fdfa',100:'#ccfbf1',200:'#99f6e4',300:'#5eead4',400:'#2dd4bf',500:'#14b8a6',600:'#0d9488',700:'#0f766e',800:'#115e59',900:'#134e4a',950:'#042f2e' },
  cyan:    { 50:'#ecfeff',100:'#cffafe',200:'#a5f3fc',300:'#67e8f9',400:'#22d3ee',500:'#06b6d4',600:'#0891b2',700:'#0e7490',800:'#155e75',900:'#164e63',950:'#083344' },
  sky:     { 50:'#f0f9ff',100:'#e0f2fe',200:'#bae6fd',300:'#7dd3fc',400:'#38bdf8',500:'#0ea5e9',600:'#0284c7',700:'#0369a1',800:'#075985',900:'#0c4a6e',950:'#082f49' },
  blue:    { 50:'#eff6ff',100:'#dbeafe',200:'#bfdbfe',300:'#93c5fd',400:'#60a5fa',500:'#3b82f6',600:'#2563eb',700:'#1d4ed8',800:'#1e40af',900:'#1e3a8a',950:'#172554' },
  indigo:  { 50:'#eef2ff',100:'#e0e7ff',200:'#c7d2fe',300:'#a5b4fc',400:'#818cf8',500:'#6366f1',600:'#4f46e5',700:'#4338ca',800:'#3730a3',900:'#312e81',950:'#1e1b4b' },
  violet:  { 50:'#f5f3ff',100:'#ede9fe',200:'#ddd6fe',300:'#c4b5fd',400:'#a78bfa',500:'#8b5cf6',600:'#7c3aed',700:'#6d28d9',800:'#5b21b6',900:'#4c1d95',950:'#2e1065' },
  purple:  { 50:'#faf5ff',100:'#f3e8ff',200:'#e9d5ff',300:'#d8b4fe',400:'#c084fc',500:'#a855f7',600:'#9333ea',700:'#7e22ce',800:'#6b21a8',900:'#581c87',950:'#3b0764' },
  fuchsia: { 50:'#fdf4ff',100:'#fae8ff',200:'#f5d0fe',300:'#f0abfc',400:'#e879f9',500:'#d946ef',600:'#c026d3',700:'#a21caf',800:'#86198f',900:'#701a75',950:'#4a044e' },
  pink:    { 50:'#fdf2f8',100:'#fce7f3',200:'#fbcfe8',300:'#f9a8d4',400:'#f472b6',500:'#ec4899',600:'#db2777',700:'#be185d',800:'#9d174d',900:'#831843',950:'#500724' },
  rose:    { 50:'#fff1f2',100:'#ffe4e6',200:'#fecdd3',300:'#fda4af',400:'#fb7185',500:'#f43f5e',600:'#e11d48',700:'#be123c',800:'#9f1239',900:'#881337',950:'#4c0519' }
};

const STATIC_MAP = {
  'flex': 'display: flex;', 'inline-flex': 'display: inline-flex;', 'grid': 'display: grid;',
  'block': 'display: block;', 'inline-block': 'display: inline-block;', 'inline': 'display: inline;', 'hidden': 'display: none;',
  'flex-col': 'flex-direction: column;', 'flex-row': 'flex-direction: row;', 'flex-wrap': 'flex-wrap: wrap;', 'flex-1': 'flex: 1 1 0%;',
  'items-center': 'align-items: center;', 'items-start': 'align-items: flex-start;', 'items-end': 'align-items: flex-end;', 'items-stretch': 'align-items: stretch;',
  'justify-center': 'justify-content: center;', 'justify-between': 'justify-content: space-between;', 'justify-around': 'justify-content: space-around;',
  'justify-start': 'justify-content: flex-start;', 'justify-end': 'justify-content: flex-end;',
  'grow': 'flex-grow: 1;', 'shrink': 'flex-shrink: 1;', 'shrink-0': 'flex-shrink: 0;',
  'relative': 'position: relative;', 'absolute': 'position: absolute;', 'fixed': 'position: fixed;', 'sticky': 'position: sticky;', 'inset-0': 'inset: 0;',
  'text-center': 'text-align: center;', 'text-left': 'text-align: left;', 'text-right': 'text-align: right;',
  'font-thin': 'font-weight: 100;', 'font-light': 'font-weight: 300;', 'font-normal': 'font-weight: 400;',
  'font-medium': 'font-weight: 500;', 'font-semibold': 'font-weight: 600;', 'font-bold': 'font-weight: 700;', 'font-extrabold': 'font-weight: 800;', 'font-black': 'font-weight: 900;',
  'italic': 'font-style: italic;', 'uppercase': 'text-transform: uppercase;', 'lowercase': 'text-transform: lowercase;', 'capitalize': 'text-transform: capitalize;',
  'underline': 'text-decoration: underline;', 'no-underline': 'text-decoration: none;', 'line-through': 'text-decoration: line-through;',
  'tracking-tight': 'letter-spacing: -0.025em;', 'tracking-normal': 'letter-spacing: 0em;', 'tracking-wide': 'letter-spacing: 0.025em;', 'tracking-wider': 'letter-spacing: 0.05em;', 'tracking-widest': 'letter-spacing: 0.1em;',
  'leading-none': 'line-height: 1;', 'leading-tight': 'line-height: 1.25;', 'leading-snug': 'line-height: 1.375;', 'leading-normal': 'line-height: 1.5;', 'leading-relaxed': 'line-height: 1.625;', 'leading-loose': 'line-height: 2;',
  'w-full': 'width: 100%;', 'w-screen': 'width: 100vw;', 'w-fit': 'width: fit-content;', 'w-auto': 'width: auto;',
  'h-full': 'height: 100%;', 'h-screen': 'height: 100vh;', 'min-h-screen': 'min-height: 100vh;',
  'max-w-xs': 'max-width: 20rem;', 'max-w-sm': 'max-width: 24rem;', 'max-w-md': 'max-width: 28rem;', 'max-w-lg': 'max-width: 32rem;',
  'max-w-xl': 'max-width: 36rem;', 'max-w-2xl': 'max-width: 42rem;', 'max-w-3xl': 'max-width: 48rem;', 'max-w-4xl': 'max-width: 56rem;', 'max-w-5xl': 'max-width: 64rem;', 'max-w-full': 'max-width: 100%;',
  'shadow-sm': 'box-shadow: 0 1px 2px rgba(0,0,0,0.05);', 'shadow': 'box-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1);',
  'shadow-md': 'box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);', 'shadow-lg': 'box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1);',
  'shadow-xl': 'box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);', 'shadow-2xl': 'box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);',
  'border': 'border: 1px solid #e2e8f0;', 'border-2': 'border: 2px solid #e2e8f0;', 'border-none': 'border: none;', 'border-0': 'border: 0;',
  'overflow-hidden': 'overflow: hidden;', 'overflow-auto': 'overflow: auto;', 'overflow-x-auto': 'overflow-x: auto;',
  'pointer-events-none': 'pointer-events: none;', 'cursor-pointer': 'cursor: pointer;', 'select-none': 'user-select: none;',
  'transition': 'transition: all 0.2s ease;', 'transition-all': 'transition: all 0.2s ease;', 'transition-colors': 'transition: color 0.2s, background-color 0.2s, border-color 0.2s;',
  'bg-gradient-to-r': 'background-image: linear-gradient(to right, var(--tw-from, #6366f1), var(--tw-to, #06b6d4));',
  'bg-gradient-to-br': 'background-image: linear-gradient(to bottom right, var(--tw-from, #6366f1), var(--tw-to, #ec4899));'
};

function resolveColor(token) {
  if (token === 'white') return '#ffffff';
  if (token === 'black') return '#000000';
  if (token === 'transparent') return 'transparent';
  const arb = token.match(/^\[(.+)\]$/);
  if (arb) return arb[1];
  const m = token.match(/^([a-z]+)-(\d{2,3})$/);
  if (m && TW_PALETTE[m[1]] && TW_PALETTE[m[1]][m[2]]) {
    return TW_PALETTE[m[1]][m[2]];
  }
  if (TW_PALETTE[token]) return TW_PALETTE[token][500];
  return null;
}

function parseSpacing(val) {
  if (val === 'auto') return 'auto';
  if (val === 'px') return '1px';
  const arb = val.match(/^\[(.+)\]$/);
  if (arb) return arb[1];
  const n = parseFloat(val);
  return isNaN(n) ? null : `${n * 0.25}rem`;
}

function parseUtility(cls) {
  if (STATIC_MAP[cls]) return STATIC_MAP[cls];

  // Arbitrary spacing / padding / margin / gap / w / h
  const sp = cls.match(/^(p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|gap-x|gap-y|w|h|top|right|bottom|left)-(.+)$/);
  if (sp) {
    const k = sp[1], v = parseSpacing(sp[2]);
    if (v) {
      if (k === 'p') return `padding: ${v};`;
      if (k === 'px') return `padding-left: ${v}; padding-right: ${v};`;
      if (k === 'py') return `padding-top: ${v}; padding-bottom: ${v};`;
      if (k === 'pt') return `padding-top: ${v};`;
      if (k === 'pb') return `padding-bottom: ${v};`;
      if (k === 'pl') return `padding-left: ${v};`;
      if (k === 'pr') return `padding-right: ${v};`;
      if (k === 'm') return `margin: ${v};`;
      if (k === 'mx') return `margin-left: ${v}; margin-right: ${v};`;
      if (k === 'my') return `margin-top: ${v}; margin-bottom: ${v};`;
      if (k === 'mt') return `margin-top: ${v};`;
      if (k === 'mb') return `margin-bottom: ${v};`;
      if (k === 'ml') return `margin-left: ${v};`;
      if (k === 'mr') return `margin-right: ${v};`;
      if (k === 'gap') return `gap: ${v};`;
      if (k === 'gap-x') return `column-gap: ${v};`;
      if (k === 'gap-y') return `row-gap: ${v};`;
      if (k === 'w') return `width: ${v};`;
      if (k === 'h') return `height: ${v};`;
      return `${k}: ${v};`;
    }
  }

  // Grid columns & span
  const gc = cls.match(/^grid-cols-(\d+)$/);
  if (gc) return `grid-template-columns: repeat(${gc[1]}, minmax(0, 1fr));`;
  const cs = cls.match(/^col-span-(\d+)$/);
  if (cs) return `grid-column: span ${cs[1]} / span ${cs[1]};`;

  // Opacity & Z-index
  const op = cls.match(/^opacity-(\d+)$/);
  if (op) return `opacity: ${parseInt(op[1], 10) / 100};`;
  const zi = cls.match(/^z-(\d+)$/);
  if (zi) return `z-index: ${zi[1]};`;

  // Text sizes
  const sizes = {
    'text-xs':'font-size: 0.75rem; line-height: 1rem;','text-sm':'font-size: 0.875rem; line-height: 1.25rem;',
    'text-base':'font-size: 1rem; line-height: 1.5rem;','text-lg':'font-size: 1.125rem; line-height: 1.75rem;',
    'text-xl':'font-size: 1.25rem; line-height: 1.75rem;','text-2xl':'font-size: 1.5rem; line-height: 2rem;',
    'text-3xl':'font-size: 1.875rem; line-height: 2.25rem;','text-4xl':'font-size: 2.25rem; line-height: 2.5rem;',
    'text-5xl':'font-size: 3rem; line-height: 1;'
  };
  if (sizes[cls]) return sizes[cls];

  // Border radius
  if (cls === 'rounded' || cls.startsWith('rounded-')) {
    const r = { 'rounded':'0.25rem','rounded-none':'0px','rounded-sm':'0.125rem','rounded-md':'0.375rem','rounded-lg':'0.5rem','rounded-xl':'0.75rem','rounded-2xl':'1rem','rounded-3xl':'1.5rem','rounded-full':'9999px' };
    if (r[cls]) return `border-radius: ${r[cls]};`;
  }

  // Colors: bg-*, text-*, border-*, from-*, to-*
  const colM = cls.match(/^(bg|text|border|from|to)-(.+)$/);
  if (colM) {
    const hex = resolveColor(colM[2]);
    if (hex) {
      if (colM[1] === 'bg') return `background-color: ${hex};`;
      if (colM[1] === 'text') return `color: ${hex};`;
      if (colM[1] === 'border') return `border-color: ${hex};`;
      if (colM[1] === 'from') return `--tw-from: ${hex};`;
      if (colM[1] === 'to') return `--tw-to: ${hex};`;
    }
  }
  return null;
}

function transpileTailwind(htmlString, mode) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  // Strip any raw <script> tags for preview safety
  doc.body.querySelectorAll('script').forEach(s => s.remove());

  let convertedCount = 0;
  let cssRules = [];
  let mdRules = [];
  let lgRules = [];
  let elCounter = 0;

  doc.body.querySelectorAll('*').forEach(el => {
    const classAttr = el.getAttribute('class');
    if (!classAttr) return;
    const classes = classAttr.trim().split(/\s+/).filter(Boolean);
    const baseStyles = [];
    const hoverStyles = [];
    const mdStyles = [];
    const lgStyles = [];

    classes.forEach(token => {
      if (token.startsWith('hover:')) {
        const s = parseUtility(token.slice(6));
        if (s) { hoverStyles.push(s); convertedCount++; }
      } else if (token.startsWith('md:')) {
        const s = parseUtility(token.slice(3));
        if (s) { mdStyles.push(s); convertedCount++; }
      } else if (token.startsWith('lg:')) {
        const s = parseUtility(token.slice(3));
        if (s) { lgStyles.push(s); convertedCount++; }
      } else {
        const s = parseUtility(token);
        if (s) { baseStyles.push(s); convertedCount++; }
      }
    });

    if (mode === 'style') {
      if (baseStyles.length || hoverStyles.length || mdStyles.length || lgStyles.length) {
        elCounter++;
        const clsName = `tw-el-${elCounter}`;
        el.setAttribute('class', clsName);
        if (baseStyles.length) cssRules.push(`.${clsName} { ${baseStyles.join(' ')} }`);
        if (hoverStyles.length) cssRules.push(`.${clsName}:hover { ${hoverStyles.join(' ')} }`);
        if (mdStyles.length) mdRules.push(`  .${clsName} { ${mdStyles.join(' ')} }`);
        if (lgStyles.length) lgRules.push(`  .${clsName} { ${lgStyles.join(' ')} }`);
      } else {
        el.removeAttribute('class');
      }
    } else {
      // Inline Email-Safe mode: apply base + desktop md fallbacks inline cleanly
      const combined = [...baseStyles, ...mdStyles];
      if (combined.length) {
        const existing = el.getAttribute('style') || '';
        el.setAttribute('style', (existing + ' ' + combined.join(' ')).trim());
      }
      el.removeAttribute('class');
    }
  });

  let styleBlock = '';
  if (mode === 'style') {
    let fullCss = cssRules.join('\n');
    if (mdRules.length) fullCss += `\n@media (min-width: 768px) {\n${mdRules.join('\n')}\n}`;
    if (lgRules.length) fullCss += `\n@media (min-width: 1024px) {\n${lgRules.join('\n')}\n}`;
    if (fullCss.trim()) styleBlock = `<style>\n${fullCss}\n</style>\n`;
  }

  return { html: styleBlock + doc.body.innerHTML.trim(), count: convertedCount };
}

function processConversion() {
  const input = document.getElementById('inp-tailwind').value;
  const includeWatermark = document.getElementById('chk-watermark').checked || !checkIsPremium();
  if (!input.trim()) return;

  const res = transpileTailwind(input, outputMode);
  const pill = document.getElementById('tw-stats-pill');
  if (pill) pill.textContent = `✓ ${res.count} classes`;

  const wm = (window.HubUtils && window.HubUtils.getWatermarkCode) ? window.HubUtils.getWatermarkCode('Tailwind→CSS by IA Code Studio') : '';
  const iframe = document.getElementById('preview-iframe');
  iframe.srcdoc = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><style>body{font-family:Outfit,system-ui,sans-serif;margin:0;padding:24px;display:flex;justify-content:center;align-items:center;min-height:calc(100vh - 48px);background:#f8fafc;}</style></head><body>${res.html}${includeWatermark ? wm : ''}</body></html>`;

  document.getElementById('output-code').value = `${res.html}${includeWatermark ? '\n\n' + wm : ''}`;
}

if (typeof window !== 'undefined') {
  window._twTranspile = { parseUtility, transpileTailwind };
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const inp = document.getElementById('inp-tailwind');
    if (!inp) return;
    inp.value = defaultTailwindInput;

    let timer;
    inp.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(processConversion, 180);
    });
    document.getElementById('btn-convert').addEventListener('click', processConversion);
    document.getElementById('chk-watermark').addEventListener('change', processConversion);

    document.querySelectorAll('#tw-mode-toggle button').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#tw-mode-toggle button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        outputMode = btn.getAttribute('data-mode') || 'inline';
        processConversion();
      });
    });

    processConversion();
    window.addEventListener('langChanged', processConversion);

    document.getElementById('btn-copy-code').addEventListener('click', () => {
      const lang = localStorage.getItem('hub_lang') || 'fr';
      const msg = (translations[lang] && translations[lang].success_copy) || 'Copied!';
      if (window.HubUtils) window.HubUtils.copyText(document.getElementById('output-code').value, msg);
    });

    document.getElementById('btn-download-html').addEventListener('click', () => {
      const code = document.getElementById('output-code').value;
      const docHtml = `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width,initial-scale=1.0">\n  <title>Vanilla CSS Output — IA Code Studio</title>\n  <style>body{background:#f8fafc;font-family:system-ui,sans-serif;margin:0;padding:40px 20px;display:flex;justify-content:center;align-items:center;min-height:100vh;}</style>\n</head>\n<body>\n${code}\n</body>\n</html>`;
      if (window.HubUtils) window.HubUtils.safeDownloadText(docHtml, 'vanilla-tailwind-widget.html');
    });
  });
}
