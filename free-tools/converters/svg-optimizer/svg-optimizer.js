// SVG Optimizer, XSS Sanitizer & React JSX Extractor Pro

const defaultSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <!-- Interactive Gear SVG Default -->
  <metadata>Created by Vector Editor v12.4</metadata>
  <circle cx="12.00000" cy="12.00000" r="3.00000"></circle>
  <path d="M19.4000 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
</svg>`;

let rawSvgContent = defaultSvg;
let lastOptimizedSvg = '';

function roundDecimals(str) {
  return String(str).replace(/(\d+)\.(\d{3,})/g, (_, a, b) => {
    const rounded = parseFloat(`${a}.${b}`).toFixed(2).replace(/\.?0+$/, '');
    return rounded;
  });
}

function optimizeSvgString(svgInput, opts) {
  const o = opts || {};
  // Always sanitize XSS payloads first!
  const safeInput = (window.HubUtils && window.HubUtils.sanitizeSvg)
    ? window.HubUtils.sanitizeSvg(svgInput)
    : svgInput;

  const parser = new DOMParser();
  const doc = parser.parseFromString(safeInput, 'image/svg+xml');
  const svgEl = doc.querySelector('svg');
  if (!svgEl) return null;

  // 1. Strip editor metadata / comments / sodipodi / inkscape nodes & attributes
  if (o.minify) {
    svgEl.querySelectorAll('metadata, title, desc').forEach(n => n.remove());
    const cleanTree = (el) => {
      if (el.tagName && /^(sodipodi|inkscape):/i.test(el.tagName)) {
        el.remove();
        return;
      }
      if (el.attributes) {
        Array.from(el.attributes).forEach(attr => {
          if (/^(xmlns:inkscape|xmlns:sodipodi|xmlns:dc|xmlns:cc|xmlns:rdf|inkscape:|sodipodi:|data-name)$/i.test(attr.name)) {
            el.removeAttribute(attr.name);
          }
        });
      }
      Array.from(el.children || []).forEach(cleanTree);
    };
    cleanTree(svgEl);
  }

  // 2. Responsive viewBox (no forced max-width: 200px!)
  if (o.responsive) {
    const w = svgEl.getAttribute('width');
    const h = svgEl.getAttribute('height');
    if (!svgEl.getAttribute('viewBox') && w && h) {
      const cw = parseFloat(w), ch = parseFloat(h);
      if (!isNaN(cw) && !isNaN(ch)) svgEl.setAttribute('viewBox', `0 0 ${cw} ${ch}`);
    }
    svgEl.removeAttribute('width');
    svgEl.removeAttribute('height');
  }

  // 3. Round numeric coordinates
  if (o.round) {
    const numAttrs = ['d', 'points', 'x', 'y', 'x1', 'y1', 'x2', 'y2', 'cx', 'cy', 'r', 'rx', 'ry', 'width', 'height'];
    const walkRound = (el) => {
      numAttrs.forEach(a => {
        if (el.hasAttribute && el.hasAttribute(a)) {
          el.setAttribute(a, roundDecimals(el.getAttribute(a)));
        }
      });
      Array.from(el.children || []).forEach(walkRound);
    };
    walkRound(svgEl);
  }

  // 4. Optional color override
  if (o.overrideColor && o.color) {
    const shapes = ['path', 'circle', 'rect', 'polygon', 'ellipse', 'line', 'polyline', 'text', 'svg'];
    const recolor = (el) => {
      if (shapes.includes((el.tagName || '').toLowerCase())) {
        const fill = el.getAttribute('fill');
        const stroke = el.getAttribute('stroke');
        const st = (el.getAttribute('style') || '').replace(/fill\s*:\s*[^;]+;?/gi, '').replace(/stroke\s*:\s*[^;]+;?/gi, '').trim();
        if (st) el.setAttribute('style', st); else el.removeAttribute('style');
        if (fill && fill !== 'none') el.setAttribute('fill', o.color);
        if (stroke && stroke !== 'none') el.setAttribute('stroke', o.color);
      }
      Array.from(el.children || []).forEach(recolor);
    };
    recolor(svgEl);
  }

  let out = new XMLSerializer().serializeToString(svgEl);
  if (o.minify) {
    out = out
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/>\s+</g, '><')
      .replace(/\r?\n|\r/g, '')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }
  return out;
}

function svgToReactJSX(svgStr) {
  const jsx = svgStr
    .replace(/\bclass=/g, 'className=')
    .replace(/\b([a-z]+)-([a-z]+)=/g, (full, a, b) => {
      if (a === 'data' || a === 'aria') return full;
      return `${a}${b.charAt(0).toUpperCase()}${b.slice(1)}=`;
    });
  return `export function CustomIcon(props) {\n  return (\n    ${jsx.replace('<svg', '<svg {...props}')}\n  );\n}`;
}

if (typeof window !== 'undefined') {
  window._svgOptimizer = { roundDecimals, svgToReactJSX };
}

function formatBytes(b) {
  return b >= 1024 ? `${(b / 1024).toFixed(2)} KB` : `${b} B`;
}

function processOptimization() {
  const opts = {
    responsive: document.getElementById('chk-responsive').checked,
    minify: document.getElementById('chk-minify').checked,
    round: document.getElementById('chk-round').checked,
    overrideColor: document.getElementById('chk-color-override').checked,
    color: document.getElementById('inp-svg-color').value
  };

  const optimized = optimizeSvgString(rawSvgContent, opts);
  const outEl = document.getElementById('output-code');
  const prevEl = document.getElementById('preview-container-box');
  if (!optimized) {
    outEl.value = 'Error: Invalid SVG markup.';
    prevEl.innerHTML = '';
    return;
  }

  lastOptimizedSvg = optimized;
  prevEl.innerHTML = optimized;
  const previewSvg = prevEl.querySelector('svg');
  if (previewSvg) {
    previewSvg.style.width = '180px';
    previewSvg.style.height = '180px';
  }

  // Raw SVG stays 100% pure (no HTML watermark injected into SVG XML!)
  outEl.value = optimized;

  const origBytes = new Blob([rawSvgContent]).size;
  const optBytes = new Blob([optimized]).size;
  const pct = origBytes > 0 ? Math.round(((origBytes - optBytes) / origBytes) * 100) : 0;
  document.getElementById('svg-size-before').textContent = formatBytes(origBytes);
  document.getElementById('svg-size-after').textContent = `${formatBytes(optBytes)} (${pct >= 0 ? '-' : '+'}${Math.abs(pct)}%)`;
}

function loadSvgFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    rawSvgContent = e.target.result;
    document.getElementById('inp-svg-raw').value = rawSvgContent;
    document.getElementById('drop-zone-text').textContent = file.name;
    processOptimization();
  };
  reader.readAsText(file);
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const rawTa = document.getElementById('inp-svg-raw');
    if (!rawTa) return;
    rawTa.value = defaultSvg;
    processOptimization();

    rawTa.addEventListener('input', () => {
      rawSvgContent = rawTa.value;
      processOptimization();
    });

    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    dropZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => loadSvgFile(e.target.files[0]));
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    dropZone.addEventListener('drop', (e) => { e.preventDefault(); dropZone.classList.remove('dragover'); loadSvgFile(e.dataTransfer.files[0]); });

    ['chk-responsive', 'chk-minify', 'chk-round', 'chk-color-override', 'inp-svg-color'].forEach(id => {
      document.getElementById(id).addEventListener('change', processOptimization);
    });
    document.getElementById('inp-svg-color').addEventListener('input', () => {
      document.getElementById('chk-color-override').checked = true;
      processOptimization();
    });

    document.getElementById('btn-copy-code').addEventListener('click', () => {
      if (window.HubUtils) window.HubUtils.copyText(lastOptimizedSvg, '📐 Optimized SVG copied!');
    });
    document.getElementById('btn-copy-jsx').addEventListener('click', () => {
      if (window.HubUtils && lastOptimizedSvg) window.HubUtils.copyText(svgToReactJSX(lastOptimizedSvg), '⚛️ React JSX component copied!');
    });
    document.getElementById('btn-copy-datauri').addEventListener('click', () => {
      if (window.HubUtils && lastOptimizedSvg) {
        const uri = `background-image: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(lastOptimizedSvg)}");`;
        window.HubUtils.copyText(uri, '🎨 CSS Data URI copied!');
      }
    });
    document.getElementById('btn-download-svg').addEventListener('click', () => {
      if (window.HubUtils && lastOptimizedSvg) window.HubUtils.safeDownloadText(lastOptimizedSvg, 'optimized.svg', 'image/svg+xml;charset=utf-8');
    });
  });
}
