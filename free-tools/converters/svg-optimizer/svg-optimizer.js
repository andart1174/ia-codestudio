// SVG Optimizer & Code Generator script

const watermarkCode = `
  <!-- IA Code Studio Embed Watermark (Remove by upgrading to Premium) -->
  <div id="ia-code-watermark" style="position:fixed;bottom:15px;right:15px;z-index:999999;background:rgba(15,17,26,0.85);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(0,240,255,0.25);border-radius:30px;padding:8px 16px;box-shadow:0 4px 15px rgba(0,240,255,0.15);font-family:'Outfit',sans-serif;font-size:12px;font-weight:600;display:flex;align-items:center;gap:6px;cursor:pointer;transition:all 0.3s ease;user-select:none;" onclick="window.open('https://ia-codestudio.com','_blank')">
    <span style="color:#00f0ff;animation:pulse-glow 1.5s infinite alternate;">⚡</span>
    <span style="color:#fff;letter-spacing:0.5px;">3D Widget by <span style="background:linear-gradient(135deg,#00f0ff,#ff007f);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">IA Code Studio</span></span>
  </div>
  <style>
    @keyframes pulse-glow {
      0% { transform: scale(1); filter: drop-shadow(0 0 2px rgba(0,240,255,0.4)); }
      100% { transform: scale(1.1); filter: drop-shadow(0 0 8px rgba(0,240,255,0.8)); }
    }
    #ia-code-watermark:hover {
      transform: translateY(-2px);
      border-color: #00f0ff;
      box-shadow: 0 6px 20px rgba(0,240,255,0.3);
    }
  </style>
`;

const defaultSvg = `<svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <!-- Interactive Gear SVG Default -->
  <circle cx="12" cy="12" r="3"></circle>
  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
</svg>`;

let rawSvgContent = defaultSvg;

function processOptimization() {
  const parser = new DOMParser();
  const doc = parser.parseFromString(rawSvgContent, 'image/svg+xml');
  const svgEl = doc.querySelector('svg');

  if (!svgEl) {
    document.getElementById('output-code').value = "Error: Invalid SVG code parsed.";
    return;
  }

  // 1. Make Responsive
  const makeResponsive = document.getElementById('chk-responsive').checked;
  if (makeResponsive) {
    let width = svgEl.getAttribute('width');
    let height = svgEl.getAttribute('height');
    let viewBox = svgEl.getAttribute('viewBox');

    if (!viewBox && width && height) {
      // Clean pixel units if present
      const cleanW = parseFloat(width);
      const cleanH = parseFloat(height);
      if (!isNaN(cleanW) && !isNaN(cleanH)) {
        svgEl.setAttribute('viewBox', `0 0 ${cleanW} ${cleanH}`);
      }
    }
    
    // Remove absolute width/height properties
    svgEl.removeAttribute('width');
    svgEl.removeAttribute('height');
    svgEl.setAttribute('style', 'width: 100%; height: 100%; max-width: 200px; max-height: 200px;');
  }

  // 2. Color override
  const overrideColor = document.getElementById('chk-color-override').checked;
  const targetColor = document.getElementById('inp-svg-color').value;
  if (overrideColor) {
    const recolorElement = (el) => {
      const fill = el.getAttribute('fill');
      const stroke = el.getAttribute('stroke');
      const style = el.getAttribute('style') || '';
      
      const tag = el.tagName.toLowerCase();
      const isShape = ['path', 'circle', 'rect', 'polygon', 'ellipse', 'line', 'polyline', 'text', 'svg'].includes(tag);
      
      if (isShape) {
        // Strip out existing color overrides from inline styles
        let newStyle = style
          .replace(/fill\s*:\s*[^;]+;?/g, '')
          .replace(/stroke\s*:\s*[^;]+;?/g, '')
          .trim();
        
        if (newStyle) {
          el.setAttribute('style', newStyle);
        } else {
          el.removeAttribute('style');
        }

        // Apply new fill color if not explicitly disabled
        if (fill !== 'none' && !style.includes('fill:none') && !style.includes('fill: none')) {
          el.setAttribute('fill', targetColor);
        }
        
        // Apply new stroke color if not explicitly disabled
        if (stroke && stroke !== 'none' && !style.includes('stroke:none') && !style.includes('stroke: none')) {
          el.setAttribute('stroke', targetColor);
        }
      }
      
      // Recurse children
      Array.from(el.children).forEach(recolorElement);
    };

    recolorElement(svgEl);
  }

  // Serialize back to string
  const serializer = new XMLSerializer();
  let optimized = serializer.serializeToString(svgEl);

  // 3. Minify
  const minify = document.getElementById('chk-minify').checked;
  if (minify) {
    optimized = optimized
      .replace(/<!--[\s\S]*?-->/g, '') // Remove XML comments
      .replace(/>\s+</g, '><') // Remove spaces between tags
      .replace(/\r?\n|\r/g, '') // Remove linebreaks
      .replace(/\s+/g, ' '); // Collapse spaces
  }

  // Update visual preview box
  const previewBox = document.getElementById('preview-container-box');
  previewBox.innerHTML = optimized;

  // Add watermark if checked
  const includeWatermark = document.getElementById('chk-watermark').checked;
  
  // Update output textarea
  const finalCodeOutput = `${optimized.trim()}${includeWatermark ? '\n' + watermarkCode.trim() : ''}`;
  document.getElementById('output-code').value = finalCodeOutput;
}

// Read and load SVG file
function loadSvgFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    rawSvgContent = e.target.result;
    document.getElementById('drop-zone-text').textContent = file.name;
    processOptimization();
  };
  reader.readAsText(file);
}

document.addEventListener('DOMContentLoaded', () => {
  // Setup default state
  processOptimization();

  // Drop zone events
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-input');

  dropZone.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (e) => {
    loadSvgFile(e.target.files[0]);
  });

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    loadSvgFile(e.dataTransfer.files[0]);
  });

  // Checkbox settings & color input events
  const interactiveElements = ['chk-responsive', 'chk-minify', 'chk-color-override', 'inp-svg-color', 'chk-watermark'];
  interactiveElements.forEach(id => {
    document.getElementById(id).addEventListener('change', processOptimization);
  });
  document.getElementById('inp-svg-color').addEventListener('input', () => {
    // Automatically turn on override checkbox when a color is picked
    document.getElementById('chk-color-override').checked = true;
    processOptimization();
  });

  // Watch for language switches
  window.addEventListener('langChanged', () => {
    processOptimization();
  });

  // Copy code action
  document.getElementById('btn-copy-code').addEventListener('click', () => {
    const code = document.getElementById('output-code').value;
    navigator.clipboard.writeText(code).then(() => {
      const activeLang = localStorage.getItem('hub_lang') || 'fr';
      const msg = translations[activeLang].success_copy || 'Code copié avec succès !';
      alert(msg);
    }).catch(err => {
      console.error('Failed to copy code: ', err);
    });
  });

  // Download standalone HTML action
  document.getElementById('btn-download-html').addEventListener('click', () => {
    const code = document.getElementById('output-code').value;
    const compiledCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Optimized SVG Widget — IA Code Studio</title>
  <style>
    body {
      background-color: #0b0c10;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
      padding: 20px;
    }
    .svg-container {
      width: 100%;
      max-width: 400px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  </style>
</head>
<body>
  <div class="svg-container">
    ${code.replace(/\n/g, '\n    ')}
  </div>
</body>
</html>`;
    const blob = new Blob([compiledCode], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'optimized-svg-widget.html');
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
});
