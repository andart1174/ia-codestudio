// Tailwind CSS to Vanilla HTML/CSS Converter script

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

const defaultTailwindInput = `<div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl border border-gray-200 p-8">
  <div class="md:flex">
    <div class="p-6">
      <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">AI Technology</div>
      <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Finding the best WebGL tools for developers</a>
      <p class="mt-2 text-gray-500">IA Code Studio is bringing state-of-the-art interactive graphics directly to the browser. Zero setup required.</p>
      <button class="mt-4 px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700">Learn More</button>
    </div>
  </div>
</div>`;

// Core Tailwind Utility classes mapping dictionary
const tailwindMap = {
  // Flexbox & Grid
  'flex': 'display: flex;',
  'inline-flex': 'display: inline-flex;',
  'grid': 'display: grid;',
  'flex-col': 'flex-direction: column;',
  'flex-row': 'flex-direction: row;',
  'items-center': 'align-items: center;',
  'items-start': 'align-items: flex-start;',
  'items-end': 'align-items: flex-end;',
  'justify-center': 'justify-content: center;',
  'justify-between': 'justify-content: space-between;',
  'justify-start': 'justify-content: flex-start;',
  'justify-end': 'justify-content: flex-end;',
  'grow': 'flex-grow: 1;',
  'shrink': 'flex-shrink: 1;',
  
  // Text alignment & font style
  'text-center': 'text-align: center;',
  'text-left': 'text-align: left;',
  'text-right': 'text-align: right;',
  'font-thin': 'font-weight: 100;',
  'font-light': 'font-weight: 300;',
  'font-normal': 'font-weight: 400;',
  'font-medium': 'font-weight: 500;',
  'font-semibold': 'font-weight: 600;',
  'font-bold': 'font-weight: 700;',
  'font-extrabold': 'font-weight: 800;',
  'italic': 'font-style: italic;',
  'uppercase': 'text-transform: uppercase;',
  'lowercase': 'text-transform: lowercase;',
  'capitalize': 'text-transform: capitalize;',
  
  // Standard sizes
  'w-full': 'width: 100%;',
  'w-screen': 'width: 100vw;',
  'h-full': 'height: 100%;',
  'h-screen': 'height: 100vh;',
  'block': 'display: block;',
  'inline': 'display: inline;',
  'hidden': 'display: none;',
  
  // Shadows & Borders
  'shadow-sm': 'box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);',
  'shadow': 'box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);',
  'shadow-md': 'box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);',
  'shadow-lg': 'box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);',
  'shadow-xl': 'box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);',
  'border': 'border: 1px solid #e5e7eb;',
  'border-none': 'border: none;',
  
  // Overflow
  'overflow-hidden': 'overflow: hidden;',
  'overflow-auto': 'overflow: auto;',
  
  // Cursor
  'pointer-events-none': 'pointer-events: none;',
  'cursor-pointer': 'cursor: pointer;'
};

// Advanced parser for numerical values (padding, margins, sizes, colors)
function parseUtility(className) {
  if (tailwindMap[className]) {
    return tailwindMap[className];
  }

  // Padding
  if (className.startsWith('p-') || className.startsWith('px-') || className.startsWith('py-') || className.startsWith('pt-') || className.startsWith('pb-') || className.startsWith('pl-') || className.startsWith('pr-')) {
    const parts = className.split('-');
    const scale = parseFloat(parts[parts.length - 1]);
    if (isNaN(scale)) return null;
    const value = `${scale * 0.25}rem`;
    if (className.startsWith('p-')) return `padding: ${value};`;
    if (className.startsWith('px-')) return `padding-left: ${value}; padding-right: ${value};`;
    if (className.startsWith('py-')) return `padding-top: ${value}; padding-bottom: ${value};`;
    if (className.startsWith('pt-')) return `padding-top: ${value};`;
    if (className.startsWith('pb-')) return `padding-bottom: ${value};`;
    if (className.startsWith('pl-')) return `padding-left: ${value};`;
    if (className.startsWith('pr-')) return `padding-right: ${value};`;
  }

  // Margin
  if (className.startsWith('m-') || className.startsWith('mx-') || className.startsWith('my-') || className.startsWith('mt-') || className.startsWith('mb-') || className.startsWith('ml-') || className.startsWith('mr-')) {
    const parts = className.split('-');
    const valStr = parts[parts.length - 1];
    if (valStr === 'auto') {
      if (className.startsWith('mx-')) return 'margin-left: auto; margin-right: auto;';
      if (className.startsWith('my-')) return 'margin-top: auto; margin-bottom: auto;';
      return `margin: auto;`;
    }
    const scale = parseFloat(valStr);
    if (isNaN(scale)) return null;
    const value = `${scale * 0.25}rem`;
    if (className.startsWith('m-')) return `margin: ${value};`;
    if (className.startsWith('mx-')) return `margin-left: ${value}; margin-right: ${value};`;
    if (className.startsWith('my-')) return `margin-top: ${value}; margin-bottom: ${value};`;
    if (className.startsWith('mt-')) return `margin-top: ${value};`;
    if (className.startsWith('mb-')) return `margin-bottom: ${value};`;
    if (className.startsWith('ml-')) return `margin-left: ${value};`;
    if (className.startsWith('mr-')) return `margin-right: ${value};`;
  }

  // Text sizes
  if (className.startsWith('text-')) {
    const size = className.split('-')[1];
    const sizes = {
      'xs': 'font-size: 0.75rem; line-height: 1rem;',
      'sm': 'font-size: 0.875rem; line-height: 1.25rem;',
      'base': 'font-size: 1rem; line-height: 1.5rem;',
      'lg': 'font-size: 1.125rem; line-height: 1.75rem;',
      'xl': 'font-size: 1.25rem; line-height: 1.75rem;',
      '2xl': 'font-size: 1.5rem; line-height: 2rem;',
      '3xl': 'font-size: 1.875rem; line-height: 2.25rem;',
      '4xl': 'font-size: 2.25rem; line-height: 2.5rem;',
      '5xl': 'font-size: 3rem; line-height: 1;'
    };
    if (sizes[size]) return sizes[size];
  }

  // Rounded corners
  if (className.startsWith('rounded')) {
    const size = className.split('-')[1] || 'base';
    const radius = {
      'none': 'border-radius: 0px;',
      'sm': 'border-radius: 0.125rem;',
      'base': 'border-radius: 0.25rem;',
      'md': 'border-radius: 0.375rem;',
      'lg': 'border-radius: 0.5rem;',
      'xl': 'border-radius: 0.75rem;',
      '2xl': 'border-radius: 1rem;',
      '3xl': 'border-radius: 1.5rem;',
      'full': 'border-radius: 9999px;'
    };
    if (radius[size]) return radius[size];
  }

  // Common colors text and background (mapped roughly)
  if (className.startsWith('bg-') || className.startsWith('text-') || className.startsWith('border-')) {
    const parts = className.split('-');
    if (parts.length >= 2) {
      const type = parts[0];
      const color = parts[1];
      const shade = parts[2] || '';
      
      const colors = {
        'white': '#ffffff',
        'black': '#000000',
        'transparent': 'transparent',
        'gray': shade >= 500 ? '#4a5568' : '#e2e8f0',
        'red': '#e53e3e',
        'orange': '#dd6b20',
        'yellow': '#ecc94b',
        'green': '#38a169',
        'teal': '#319795',
        'blue': '#3182ce',
        'indigo': '#5a67d8',
        'purple': '#805ad5',
        'pink': '#d53f8c'
      };

      if (colors[color]) {
        const hex = colors[color];
        if (type === 'bg') return `background-color: ${hex};`;
        if (type === 'text') return `color: ${hex};`;
        if (type === 'border') return `border-color: ${hex};`;
      }
    }
  }

  return null;
}

// Convert HTML with Tailwind classes to HTML with inline vanilla styles
function transpileTailwind(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  
  // Recursively process all elements
  const allElements = doc.body.querySelectorAll('*');
  allElements.forEach(el => {
    const classAttr = el.getAttribute('class');
    if (classAttr) {
      const classes = classAttr.split(/\s+/);
      let inlineStyles = [];

      classes.forEach(cls => {
        const style = parseUtility(cls);
        if (style) {
          inlineStyles.push(style);
        }
      });

      if (inlineStyles.length > 0) {
        // Merge with existing style attribute if present
        const existingStyle = el.getAttribute('style') || '';
        const mergedStyle = (existingStyle + ' ' + inlineStyles.join(' ')).trim();
        el.setAttribute('style', mergedStyle);
      }

      // Remove class attribute to keep HTML clean
      el.removeAttribute('class');
    }
  });

  return doc.body.innerHTML;
}

function processConversion() {
  const input = document.getElementById('inp-tailwind').value;
  const includeWatermark = document.getElementById('chk-watermark').checked;
  
  if (!input.trim()) return;

  const convertedHtml = transpileTailwind(input);
  
  // Update Live Preview iframe
  const iframe = document.getElementById('preview-iframe');

  const fullContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Outfit', sans-serif;
      margin: 0;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 40px);
      background-color: #f7fafc;
    }
  </style>
</head>
<body>
  ${convertedHtml}
  ${includeWatermark ? watermarkCode : ''}
</body>
</html>`;

  iframe.srcdoc = fullContent;

  // Update Output Text Area
  const outputCode = `${convertedHtml.trim()}${includeWatermark ? '\n' + watermarkCode.trim() : ''}`;
  document.getElementById('output-code').value = outputCode;
}

document.addEventListener('DOMContentLoaded', () => {
  // Default values setup
  document.getElementById('inp-tailwind').value = defaultTailwindInput;

  document.getElementById('btn-convert').addEventListener('click', processConversion);
  document.getElementById('chk-watermark').addEventListener('change', processConversion);

  // Initial compile
  processConversion();

  // Watch for language switcher
  window.addEventListener('langChanged', () => {
    // Sync UI elements dynamically
    processConversion();
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
  <title>Converted Static Page — IA Code Studio</title>
  <style>
    body {
      background-color: #f7fafc;
      font-family: 'Segoe UI', system-ui, sans-serif;
      margin: 0;
      padding: 40px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
  </style>
</head>
<body>
  ${code.replace(/\n/g, '\n  ')}
</body>
</html>`;
    const blob = new Blob([compiledCode], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'vanilla-tailwind-widget.html');
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
});
