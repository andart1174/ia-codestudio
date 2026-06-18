// Live Sandbox Playground Script

let cmHtml, cmCss, cmJs;
let debounceTimeout;

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

// Initialize CodeMirror Editors with safe fallback for offline/blocked CDN environments
function initEditors() {
  if (typeof CodeMirror !== 'undefined') {
    cmHtml = CodeMirror.fromTextArea(document.getElementById('editor-html'), {
      mode: 'xml',
      htmlMode: true,
      theme: 'material-ocean',
      lineNumbers: true,
      lineWrapping: true,
      autoCloseTags: true
    });

    cmCss = CodeMirror.fromTextArea(document.getElementById('editor-css'), {
      mode: 'css',
      theme: 'material-ocean',
      lineNumbers: true,
      lineWrapping: true
    });

    cmJs = CodeMirror.fromTextArea(document.getElementById('editor-js'), {
      mode: 'javascript',
      theme: 'material-ocean',
      lineNumbers: true,
      lineWrapping: true
    });

    // Attach change listeners
    [cmHtml, cmCss, cmJs].forEach(editor => {
      editor.on('change', () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(updatePreview, 300);
      });
    });
  } else {
    // Fallback Mock Editor interface using raw textareas
    console.warn("CodeMirror failed to load. Running raw textarea fallback.");
    
    const createMockEditor = (id) => {
      const el = document.getElementById(id);
      return {
        getValue: () => el.value,
        setValue: (val) => { el.value = val; },
        on: (event, callback) => {
          if (event === 'change') {
            el.addEventListener('input', callback);
          }
        },
        refresh: () => {}
      };
    };

    cmHtml = createMockEditor('editor-html');
    cmCss = createMockEditor('editor-css');
    cmJs = createMockEditor('editor-js');

    // Attach raw change listeners
    [cmHtml, cmCss, cmJs].forEach(editor => {
      editor.on('change', () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(updatePreview, 300);
      });
    });
  }
}

// Update the live preview Iframe
function updatePreview() {
  const html = cmHtml.getValue();
  const css = cmCss.getValue();
  const js = cmJs.getValue();
  const includeWatermark = document.getElementById('chk-watermark').checked || !checkIsPremium();

  const iframe = document.getElementById('preview-iframe');

  const compiledContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    ${css}
  </style>
</head>
<body>
  ${html}
  ${includeWatermark ? watermarkCode : ''}
  <script>
    // Catch and isolate iframe execution errors
    window.addEventListener('error', function(e) {
      console.error("Iframe JS Error: " + e.message);
    });
    
    try {
      ${js}
    } catch(err) {
      console.error("Sandbox Execution Error: " + err.message);
    }
  </script>
</body>
</html>`;

  // Use srcdoc to bypass same-origin/CORS restrictions when loaded via file://
  iframe.srcdoc = compiledContent;
}

// Generate the fully compiled output string
function generateFullOutput() {
  const html = cmHtml.getValue();
  const css = cmCss.getValue();
  const js = cmJs.getValue();
  const includeWatermark = document.getElementById('chk-watermark').checked || !checkIsPremium();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WebGL Interactive Widget — IA Code Studio</title>
  <style>
    ${css.replace(/\n/g, '\n    ')}
  </style>
</head>
<body>
  ${html.replace(/\n/g, '\n  ')}
  ${includeWatermark ? watermarkCode.trim().replace(/\n/g, '\n  ') : ''}
  <script>
    ${js.replace(/\n/g, '\n    ')}
  </script>
</body>
</html>`;
}

// Load Preset Template
function loadPreset(presetName) {
  const preset = window.playgroundTemplates[presetName];
  if (!preset) return;

  cmHtml.setValue(preset.html);
  cmCss.setValue(preset.css);
  cmJs.setValue(preset.js);

  // Mark active preset button
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-preset') === presetName) {
      btn.classList.add('active');
    }
  });

  updatePreview();
}

document.addEventListener('DOMContentLoaded', () => {
  initEditors();
  
  // Load Default Preset (Cube 3D)
  loadPreset('cube');

  // Set up Tabs switching logic
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tab = e.target.getAttribute('data-tab');

      // Update button classes
      tabBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      // Update editor containers visibility
      document.querySelectorAll('.editor-tab-content').forEach(cont => {
        cont.classList.remove('active');
      });
      document.getElementById(`wrapper-${tab}`).classList.add('active');

      // CodeMirror bugfix: refresh layout when becoming visible
      if (tab === 'html') cmHtml.refresh();
      if (tab === 'css') cmCss.refresh();
      if (tab === 'js') cmJs.refresh();
    });
  });

  // Set up preset click handlers
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const preset = e.target.getAttribute('data-preset');
      loadPreset(preset);
    });
  });

  // Watermark checkbox change
  document.getElementById('chk-watermark').addEventListener('change', updatePreview);

  // Copy code action
  document.getElementById('btn-copy-code').addEventListener('click', () => {
    const code = generateFullOutput();
    navigator.clipboard.writeText(code).then(() => {
      // Show elegant toast or inline message
      const activeLang = localStorage.getItem('hub_lang') || 'fr';
      const msg = translations[activeLang].success_copy || 'Code copié avec succès !';
      alert(msg);
    }).catch(err => {
      console.error('Failed to copy code: ', err);
    });
  });

  // Download standalone HTML file action
  document.getElementById('btn-download-html').addEventListener('click', () => {
    const code = generateFullOutput();
    const blob = new Blob([code], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'playground-widget.html');
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
});
