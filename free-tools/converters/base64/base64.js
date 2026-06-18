// Base64 Converter script

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

let currentMode = 'text'; // 'text' or 'file'
let fileBase64 = '';
let fileName = '';
let fileType = '';

// Safe UTF-8 Base64 Encoding
function safeBtoa(str) {
  try {
    return btoa(unescape(encodeURIComponent(str)));
  } catch (err) {
    return btoa(str);
  }
}

// Safe UTF-8 Base64 Decoding
function safeAtob(str) {
  // Strip spaces/newlines
  const cleanStr = str.replace(/\s+/g, '');
  try {
    return decodeURIComponent(escape(atob(cleanStr)));
  } catch (err) {
    return atob(cleanStr);
  }
}

function handleTextEncode() {
  currentMode = 'text';
  const input = document.getElementById('inp-text').value;
  if (!input) return;

  const encoded = safeBtoa(input);
  
  // Update preview (text view)
  const previewBox = document.getElementById('preview-container-box');
  previewBox.innerHTML = `<div style="color:#88ff88; font-family:monospace; font-size:0.9rem; text-align:left; width:100%; white-space:pre-wrap; overflow-y:auto; max-height:100%; padding:0.5rem;">${encoded}</div>`;

  updateOutputCode(encoded);
}

function handleTextDecode() {
  currentMode = 'text';
  const input = document.getElementById('inp-text').value;
  if (!input) return;

  try {
    const decoded = safeAtob(input);
    const previewBox = document.getElementById('preview-container-box');
    previewBox.innerHTML = `<div style="color:#ffffff; font-family:sans-serif; font-size:0.95rem; text-align:left; width:100%; white-space:pre-wrap; overflow-y:auto; max-height:100%; padding:0.5rem;">${decoded}</div>`;
    
    updateOutputCode(decoded);
  } catch (err) {
    alert("Error: String is not a valid Base64 encoded string.");
  }
}

function handleFileConversion(file) {
  if (!file) return;
  currentMode = 'file';
  fileName = file.name;
  fileType = file.type;

  const reader = new FileReader();
  reader.onload = (e) => {
    fileBase64 = e.target.result; // Full Data URL
    
    // Update dropzone label
    document.getElementById('drop-zone-text').textContent = fileName;
    
    // Update preview container
    const previewBox = document.getElementById('preview-container-box');
    if (fileType.startsWith('image/')) {
      previewBox.innerHTML = `<img src="${fileBase64}" alt="${fileName}">`;
    } else {
      previewBox.innerHTML = `<div style="text-align:center;">
        <span style="font-size:3.5rem;">📄</span>
        <div style="color:#fff; font-weight:600; margin-top:0.5rem;">${fileName}</div>
        <div style="color:var(--text-muted); font-size:0.8rem; margin-top:0.2rem;">${fileType || 'Unknown format'} (${(file.size / 1024).toFixed(1)} KB)</div>
      </div>`;
    }

    updateOutputCode(fileBase64);
  };
  reader.readAsDataURL(file);
}

function updateOutputCode(payload) {
  const includeWatermark = document.getElementById('chk-watermark').checked || !checkIsPremium();
  let finalCode = payload;

  if (currentMode === 'text') {
    finalCode = payload;
  } else {
    // If it's a file (like an image), we generate a copy-paste HTML Tag preset
    if (fileType.startsWith('image/')) {
      finalCode = `<!-- Embedded Base64 Image Widget -->
<img src="${payload}" alt="${fileName}" style="max-width:100%; height:auto; border-radius:8px;">`;
    } else {
      finalCode = `<!-- Data URI Base64 Output -->
${payload}`;
    }
  }

  const finalOutput = `${finalCode}${includeWatermark ? '\n' + watermarkCode.trim() : ''}`;
  document.getElementById('output-code').value = finalOutput;
}

document.addEventListener('DOMContentLoaded', () => {
  // Bind buttons
  document.getElementById('btn-encode').addEventListener('click', handleTextEncode);
  document.getElementById('btn-decode').addEventListener('click', handleTextDecode);
  document.getElementById('chk-watermark').addEventListener('change', () => {
    const code = document.getElementById('output-code').value;
    if (code) {
      // Re-trigger update based on current state
      if (currentMode === 'text') {
        const input = document.getElementById('inp-text').value;
        if (input) {
          // Check if encoded or decoded was last
          const isEncoded = document.getElementById('preview-container-box').textContent === safeBtoa(input);
          updateOutputCode(isEncoded ? safeBtoa(input) : safeAtob(input));
        }
      } else {
        updateOutputCode(fileBase64);
      }
    }
  });

  // Drag and drop zone file handling
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-input');

  dropZone.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (e) => {
    handleFileConversion(e.target.files[0]);
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
    handleFileConversion(e.dataTransfer.files[0]);
  });

  // Copy code action
  document.getElementById('btn-copy-code').addEventListener('click', () => {
    const code = document.getElementById('output-code').value;
    if (!code) return;
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
    if (!code) return;
    
    let compiled = '';
    if (currentMode === 'text') {
      compiled = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Base64 Output — IA Code Studio</title>
</head>
<body style="background:#0b0c10; color:#fff; font-family:sans-serif; padding:40px; word-break:break-all;">
  <h2>Base64 Payload:</h2>
  <pre style="white-space:pre-wrap; background:#111218; padding:20px; border-radius:8px; border:1px solid #222; color:#00f0ff;">${code}</pre>
</body>
</html>`;
    } else {
      compiled = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Embedded Base64 File — IA Code Studio</title>
</head>
<body style="background:#0b0c10; display:flex; justify-content:center; align-items:center; height:100vh; margin:0;">
  ${code}
</body>
</html>`;
    }

    const blob = new Blob([compiled], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'base64-widget.html');
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
});
