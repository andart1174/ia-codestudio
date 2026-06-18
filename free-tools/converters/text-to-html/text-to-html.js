// Text to Glassmorphic Card converter script

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

function generateCard(title, desc, btnText, color, blurVal, includeWatermark) {
  // Convert HEX to RGBA for transparent shadows
  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  const rgb = hexToRgb(color);

  const cardHtml = `<!-- Glassmorphic Card Embed -->
<div class="glass-card-wrapper">
  <div class="glass-card">
    <div class="glow-orb"></div>
    <div class="card-content">
      <h3 class="card-title">${title}</h3>
      <p class="card-desc">${desc}</p>
      <a href="#" class="card-action-btn">${btnText}</a>
    </div>
  </div>
</div>`;

  const cardCss = `<style>
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap');

  .glass-card-wrapper {
    position: relative;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Outfit', sans-serif;
  }

  .glass-card {
    position: relative;
    width: 320px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    padding: 35px 25px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(${blurVal}px);
    -webkit-backdrop-filter: blur(${blurVal}px);
    overflow: hidden;
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.3s ease;
  }

  .glass-card:hover {
    transform: translateY(-5px);
    border-color: rgba(${rgb}, 0.4);
    box-shadow: 0 12px 40px rgba(${rgb}, 0.15);
  }

  /* Interactive glow highlight in background */
  .glow-orb {
    position: absolute;
    top: -50px;
    left: -50px;
    width: 150px;
    height: 150px;
    background: radial-gradient(circle, rgba(${rgb}, 0.3) 0%, transparent 70%);
    border-radius: 50%;
    filter: blur(15px);
    pointer-events: none;
    z-index: 1;
    transition: all 0.5s ease;
  }

  .glass-card:hover .glow-orb {
    transform: translate(30px, 30px);
    background: radial-gradient(circle, rgba(${rgb}, 0.45) 0%, transparent 70%);
  }

  .card-content {
    position: relative;
    z-index: 2;
  }

  .card-title {
    color: #fff;
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 10px;
    letter-spacing: 0.5px;
  }

  .card-desc {
    color: #a0aec0;
    font-size: 0.9rem;
    line-height: 1.6;
    margin-bottom: 25px;
  }

  .card-action-btn {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #fff;
    font-weight: 600;
    font-size: 0.85rem;
    padding: 10px 20px;
    border-radius: 8px;
    transition: all 0.3s ease;
  }

  .card-action-btn:hover {
    background: #fff;
    color: #0b0c10;
    box-shadow: 0 0 15px rgba(${rgb}, 0.4);
  }
</style>`;

  const fullCode = `${cardHtml}

${cardCss}${includeWatermark ? '\n' + watermarkCode.trim() : ''}`;

  return { html: cardHtml, css: cardCss, full: fullCode };
}

function updateOutput() {
  const title = document.getElementById('inp-title').value;
  const desc = document.getElementById('inp-desc').value;
  const btn = document.getElementById('inp-btn').value;
  const color = document.getElementById('inp-color').value;
  const blurVal = document.getElementById('inp-blur').value;
  const includeWatermark = document.getElementById('chk-watermark').checked;

  document.getElementById('blur-val').textContent = `${blurVal}px`;

  const card = generateCard(title, desc, btn, color, blurVal, includeWatermark);

  // Update preview wrapper
  const container = document.getElementById('preview-container-box');
  container.innerHTML = card.html + card.css;

  // Add event listener to the live card button in preview to prevent link jumps
  const previewBtn = container.querySelector('.card-action-btn');
  if (previewBtn) {
    previewBtn.addEventListener('click', (e) => e.preventDefault());
  }

  // Update output textarea
  document.getElementById('output-code').value = card.full;
}

document.addEventListener('DOMContentLoaded', () => {
  // Bind UI inputs
  const inputs = ['inp-title', 'inp-desc', 'inp-btn', 'inp-color', 'inp-blur'];
  inputs.forEach(id => {
    document.getElementById(id).addEventListener('input', updateOutput);
  });

  document.getElementById('chk-watermark').addEventListener('change', updateOutput);

  // Initial draw
  updateOutput();

  // Watch for global language switches
  window.addEventListener('langChanged', () => {
    // If the input values are identical to the i18n template default values, we swap them to localized ones
    const activeLang = localStorage.getItem('hub_lang') || 'fr';
    
    // We update placeholders and titles
    document.getElementById('inp-title').value = translations[activeLang].t2g_preview_card_title || 'Mon Beau Projet 3D';
    document.getElementById('inp-desc').value = translations[activeLang].t2g_preview_card_desc || 'Créez de superbes interfaces en verre dépoli avec des reflets lumineux colorés.';
    document.getElementById('inp-btn').value = translations[activeLang].t2g_preview_card_btn || 'Découvrir →';
    
    updateOutput();
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

  // Download standalone HTML
  document.getElementById('btn-download-html').addEventListener('click', () => {
    const code = document.getElementById('output-code').value;
    const compiledCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Glassmorphic Card Widget — IA Code Studio</title>
  <style>
    body {
      background-color: #0b0c10;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
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
    link.setAttribute('download', 'glass-card-widget.html');
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
});
