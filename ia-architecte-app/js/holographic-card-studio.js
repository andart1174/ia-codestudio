(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════
  // 🎴 HOLOGRAPHIC 3D CARD ENGINE — CSS Perspective + Light Glare
  // ═══════════════════════════════════════════════════════════

  const STANDALONE_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Holographic 3D Card Showcase</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #020617;
      --card-bg: #0b1329;
      --card-border: #1e293b;
      --accent: #f59e0b;
      --text: #f8fafc;
      --text-muted: #94a3b8;
    }
    * { box-sizing: border-box; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 40px 24px;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    h1 {
      font-size: 28px;
      font-weight: 900;
      background: linear-gradient(90deg, #f59e0b, #ec4899, #8b5cf6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0 0 8px;
      text-align: center;
    }
    p.sub { color: var(--text-muted); font-size: 14px; margin: 0 0 48px; text-align: center; }
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 40px;
      width: 100%;
      max-width: 960px;
      perspective: 1200px;
    }
    .holo-card {
      width: 100%;
      aspect-ratio: 0.65;
      border-radius: 20px;
      position: relative;
      cursor: pointer;
      transform-style: preserve-3d;
      transition: transform 0.1s ease;
      will-change: transform;
    }
    .holo-card-inner {
      width: 100%;
      height: 100%;
      border-radius: 20px;
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.15);
      box-shadow: 0 30px 80px -10px rgba(0,0,0,0.8);
    }
    .holo-bg {
      position: absolute; inset: 0;
      border-radius: 20px;
    }
    .holo-glare {
      position: absolute; inset: 0;
      border-radius: 20px;
      opacity: 0;
      transition: opacity 0.2s;
      pointer-events: none;
      mix-blend-mode: overlay;
    }
    .holo-shine {
      position: absolute; inset: 0;
      border-radius: 20px;
      background: linear-gradient(115deg,
        transparent 20%,
        rgba(255,255,255,0.05) 30%,
        rgba(255,255,255,0.15) 45%,
        rgba(255,255,255,0.05) 60%,
        transparent 70%);
      opacity: 0;
      transition: opacity 0.2s;
      pointer-events: none;
    }
    .holo-card:hover .holo-glare,
    .holo-card:hover .holo-shine { opacity: 1; }
    .holo-content {
      position: absolute; inset: 0;
      padding: 32px 28px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-radius: 20px;
    }
    .holo-chip {
      width: 48px; height: 36px;
      background: linear-gradient(135deg, #fbbf24, #f59e0b, #d97706);
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(245,158,11,0.4);
      display: flex; align-items: center; justify-content: center;
    }
    .holo-chip svg { width: 32px; opacity: 0.7; }
    .holo-number {
      font-family: 'JetBrains Mono', monospace;
      font-size: 16px;
      letter-spacing: 3px;
      color: rgba(255,255,255,0.9);
      text-shadow: 0 2px 8px rgba(0,0,0,0.5);
    }
    .holo-bottom { display: flex; flex-direction: column; gap: 8px; }
    .holo-name {
      font-size: 18px; font-weight: 900;
      color: #fff; text-shadow: 0 2px 12px rgba(0,0,0,0.6);
    }
    .holo-details {
      display: flex; justify-content: space-between; align-items: flex-end;
    }
    .holo-label { font-size: 9px; color: rgba(255,255,255,0.6); text-transform: uppercase; }
    .holo-value { font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.9); }
    .holo-logo { font-size: 28px; }
  </style>
</head>
<body>
  <h1>🎴 Holographic 3D Card Showcase</h1>
  <p class="sub">Move your cursor over each card for a premium holographic parallax effect</p>

  <div class="cards-grid" id="cardsGrid"></div>

  <script>
    const CARD_CONFIGS = [
      {
        gradient: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #312e81 100%)',
        accent: '#8b5cf6',
        name: 'NEURAL STUDIO',
        number: '4721 •••• •••• 9182',
        expiry: '12/28',
        cardType: 'PREMIUM',
        emoji: '🧠',
        chipColor: 'linear-gradient(135deg,#a78bfa,#7c3aed)'
      },
      {
        gradient: 'linear-gradient(135deg, #020617 0%, #0c4a6e 50%, #0369a1 100%)',
        accent: '#06b6d4',
        name: 'CYBER OPS',
        number: '5534 •••• •••• 7731',
        expiry: '09/27',
        cardType: 'ELITE',
        emoji: '🚀',
        chipColor: 'linear-gradient(135deg,#22d3ee,#0891b2)'
      },
      {
        gradient: 'linear-gradient(135deg, #1a0a00 0%, #451a03 50%, #92400e 100%)',
        accent: '#f59e0b',
        name: 'GOLD INFINITY',
        number: '3782 •••• •••• 4150',
        expiry: '03/29',
        cardType: 'INFINITE',
        emoji: '✨',
        chipColor: 'linear-gradient(135deg,#fbbf24,#d97706)'
      }
    ];

    function buildCard(cfg) {
      const wrapper = document.createElement('div');
      wrapper.className = 'holo-card';

      wrapper.innerHTML = \`
        <div class="holo-card-inner">
          <div class="holo-bg" style="background:\${cfg.gradient};"></div>
          <div class="holo-glare" id="glare-\${Math.random().toString(36).slice(2)}"></div>
          <div class="holo-shine"></div>
          <div class="holo-content">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;">
              <div class="holo-chip" style="background:\${cfg.chipColor};">
                <svg viewBox="0 0 32 32" fill="none">
                  <rect x="8" y="8" width="16" height="16" rx="3" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"/>
                  <line x1="16" y1="8" x2="16" y2="24" stroke="rgba(255,255,255,0.4)" stroke-width="1"/>
                  <line x1="8" y1="16" x2="24" y2="16" stroke="rgba(255,255,255,0.4)" stroke-width="1"/>
                </svg>
              </div>
              <div style="text-align:right;">
                <div style="font-size:10px;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:1px;">\${cfg.cardType}</div>
                <div style="font-size:22px;">\${cfg.emoji}</div>
              </div>
            </div>

            <div class="holo-number">\${cfg.number}</div>

            <div class="holo-bottom">
              <div class="holo-name">\${cfg.name}</div>
              <div class="holo-details">
                <div>
                  <div class="holo-label">Valid Thru</div>
                  <div class="holo-value">\${cfg.expiry}</div>
                </div>
                <div style="font-size:36px;opacity:0.8;filter:drop-shadow(0 2px 8px \${cfg.accent});">💳</div>
              </div>
            </div>
          </div>
        </div>
      \`;

      // Holographic mouse tracking
      const card = wrapper;
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);

        const rotX = -dy * 16;
        const rotY = dx * 16;
        card.style.transform = \`rotateX(\${rotX}deg) rotateY(\${rotY}deg) scale3d(1.04,1.04,1.04)\`;

        // Update glare position
        const glareEl = card.querySelector('.holo-glare');
        const px = (e.clientX - rect.left) / rect.width * 100;
        const py = (e.clientY - rect.top) / rect.height * 100;
        glareEl.style.background = \`radial-gradient(circle at \${px}% \${py}%, rgba(255,255,255,0.25) 0%, transparent 60%)\`;
        glareEl.style.opacity = '1';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
        const glareEl = card.querySelector('.holo-glare');
        glareEl.style.opacity = '0';
      });

      return wrapper;
    }

    const grid = document.getElementById('cardsGrid');
    CARD_CONFIGS.forEach(cfg => grid.appendChild(buildCard(cfg)));
  </script>
</body>
</html>`;

  const TX = {
    en: {
      title: '🎴 HOLOGRAPHIC 3D CARD ENGINE',
      sub: 'CSS perspective parallax + dynamic light glare reflection engine',
      loadFullApp: '🚀 Load Full Standalone App',
      loadSuccess: '🚀 Holographic Card Engine loaded into editor!',
      configHdr: '⚙️ Card Configuration',
      cardName: 'Card Name / Title',
      cardNumber: 'Card Number Display',
      cardExpiry: 'Expiry Date',
      cardType: 'Badge Label',
      gradientHdr: '🎨 Gradient Preset',
      maxTiltLbl: 'Max 3D Tilt Angle',
      glareIntLbl: 'Glare Intensity',
      scaleHovLbl: 'Hover Scale',
      previewHdr: '👁️ Live Preview',
      exportHdr: '📦 Export Component',
      exportDesc: 'Copy the full standalone card with all 3D effects, zero dependencies.',
      exportBtn: '📋 Copy Holographic Card Code',
      copied: '📋 Card component copied to clipboard!',
      addCard: '➕ Add Card',
      clearCards: '🗑️ Reset Cards',
      gradCyber: 'Deep Space Neural',
      gradOcean: 'Abyss Ocean',
      gradGold: 'Infinity Gold',
      gradCrimson: 'Crimson Neon',
      gradForest: 'Emerald Matrix'
    },
    fr: {
      title: '🎴 MOTEUR DE CARTES 3D HOLOGRAPHIQUES',
      sub: 'Perspective CSS parallaxe + moteur de réflexion lumineuse dynamique',
      loadFullApp: '🚀 Charger l\'appli complète',
      loadSuccess: '🚀 Moteur de cartes holographiques chargé dans l\'éditeur !',
      configHdr: '⚙️ Configuration de la Carte',
      cardName: 'Nom / Titre de la Carte',
      cardNumber: 'Numéro de Carte',
      cardExpiry: 'Date d\'Expiration',
      cardType: 'Badge Étiquette',
      gradientHdr: '🎨 Dégradé Prédéfini',
      maxTiltLbl: 'Angle d\'Inclinaison 3D Max',
      glareIntLbl: 'Intensité de Réflexion',
      scaleHovLbl: 'Échelle au Survol',
      previewHdr: '👁️ Aperçu en Direct',
      exportHdr: '📦 Exporter le Composant',
      exportDesc: 'Copiez la carte holographique complète avec tous les effets 3D, sans dépendances.',
      exportBtn: '📋 Copier le Code de la Carte',
      copied: '📋 Composant carte copié dans le presse-papiers !',
      addCard: '➕ Ajouter une Carte',
      clearCards: '🗑️ Réinitialiser',
      gradCyber: 'Neural Espace Profond',
      gradOcean: 'Abîme Océanique',
      gradGold: 'Or Infini',
      gradCrimson: 'Néon Cramoisi',
      gradForest: 'Matrice Émeraude'
    }
  };

  const GRADIENTS = {
    cyber: { gradient: 'linear-gradient(135deg,#0f172a 0%,#1e1b4b 40%,#312e81 100%)', accent: '#8b5cf6', emoji: '🧠' },
    ocean: { gradient: 'linear-gradient(135deg,#020617 0%,#0c4a6e 50%,#0369a1 100%)', accent: '#06b6d4', emoji: '🌊' },
    gold: { gradient: 'linear-gradient(135deg,#1a0a00 0%,#451a03 50%,#92400e 100%)', accent: '#f59e0b', emoji: '✨' },
    crimson: { gradient: 'linear-gradient(135deg,#1a000a 0%,#4c0519 50%,#881337 100%)', accent: '#f43f5e', emoji: '🔥' },
    forest: { gradient: 'linear-gradient(135deg,#001a0a 0%,#052e16 50%,#14532d 100%)', accent: '#10b981', emoji: '🌿' }
  };

  function gl() { return window.appLang || 'en'; }

  const _origRenderTab = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'holographiccard') {
      window.activeTab = 'holographiccard';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('tab-holographiccard');
      if (btn) btn.classList.add('active');
      initHolographicCard(gl());
      return;
    }
    if (typeof _origRenderTab === 'function') _origRenderTab(tab);
  };

  function initHolographicCard(lang) {
    const el = document.getElementById('left-body');
    if (!el) return;
    const T = TX[lang] || TX.en;

    el.innerHTML = `
      <div id="holo-root" style="padding:14px;font-family:'Inter',sans-serif;overflow-y:auto;height:100%;box-sizing:border-box;background:#020617;color:#f8fafc;">

        <!-- Header -->
        <div style="background:linear-gradient(135deg,rgba(245,158,11,0.15),rgba(236,72,153,0.1));border-radius:14px;padding:14px;border:1px solid rgba(245,158,11,0.35);margin-bottom:12px;display:flex;align-items:center;gap:12px;">
          <span style="font-size:28px;filter:drop-shadow(0 0 10px #f59e0b);">🎴</span>
          <div>
            <h2 style="margin:0;color:#fbbf24;font-size:15px;font-weight:900;letter-spacing:0.4px;">${T.title}</h2>
            <p style="margin:3px 0 0;color:#94a3b8;font-size:10px;">${T.sub}</p>
          </div>
        </div>

        <button id="holo-load-full" style="width:100%;background:linear-gradient(90deg,#f59e0b,#ec4899);border:none;color:#000;padding:10px;border-radius:8px;font-weight:900;font-size:11px;cursor:pointer;margin-bottom:14px;box-shadow:0 0 15px rgba(245,158,11,0.25);transition:transform 0.1s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">${T.loadFullApp}</button>

        <!-- Live Card Preview -->
        <div id="holo-preview-area" style="background:#000;border:1px solid #1e293b;border-radius:12px;padding:20px;margin-bottom:14px;display:flex;justify-content:center;align-items:center;min-height:200px;perspective:1000px;">
          <div id="holo-live-card" style="width:200px;aspect-ratio:0.65;border-radius:16px;position:relative;cursor:pointer;transform-style:preserve-3d;transition:transform 0.1s;will-change:transform;">
            <div id="holo-card-inner" style="width:100%;height:100%;border-radius:16px;position:relative;overflow:hidden;border:1px solid rgba(255,255,255,0.15);box-shadow:0 20px 60px -10px rgba(0,0,0,0.9);">
              <div id="holo-bg" style="position:absolute;inset:0;background:linear-gradient(135deg,#0f172a 0%,#1e1b4b 40%,#312e81 100%);"></div>
              <div id="holo-glare" style="position:absolute;inset:0;opacity:0;transition:opacity 0.2s;pointer-events:none;mix-blend-mode:overlay;"></div>
              <div id="holo-shine" style="position:absolute;inset:0;background:linear-gradient(115deg,transparent 20%,rgba(255,255,255,0.05) 30%,rgba(255,255,255,0.15) 45%,rgba(255,255,255,0.05) 60%,transparent 70%);opacity:0;transition:opacity 0.2s;pointer-events:none;"></div>
              <div id="holo-content-layer" style="position:absolute;inset:0;padding:18px 16px;display:flex;flex-direction:column;justify-content:space-between;">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                  <div id="holo-chip-el" style="width:36px;height:28px;background:linear-gradient(135deg,#a78bfa,#7c3aed);border-radius:6px;"></div>
                  <div id="holo-badge" style="font-size:9px;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:1px;">PREMIUM</div>
                </div>
                <div id="holo-num-el" style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:2px;color:rgba(255,255,255,0.9);">4721 •••• •••• 9182</div>
                <div>
                  <div id="holo-name-el" style="font-size:13px;font-weight:900;color:#fff;margin-bottom:6px;">NEURAL STUDIO</div>
                  <div style="display:flex;justify-content:space-between;align-items:flex-end;">
                    <div>
                      <div style="font-size:7px;color:rgba(255,255,255,0.5);text-transform:uppercase;">Valid Thru</div>
                      <div id="holo-exp-el" style="font-size:11px;font-weight:700;color:rgba(255,255,255,0.9);">12/28</div>
                    </div>
                    <div style="font-size:24px;">💳</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Controls -->
        <div style="background:#0f172a;border:1px solid #1e293b;border-radius:12px;padding:14px;margin-bottom:12px;display:flex;flex-direction:column;gap:12px;">
          <h3 style="margin:0;font-size:11px;color:#fbbf24;text-transform:uppercase;">${T.configHdr}</h3>

          <div style="display:flex;flex-direction:column;gap:4px;">
            <label style="font-size:9px;color:#94a3b8;font-weight:700;">${T.cardName}</label>
            <input id="holo-name-inp" type="text" value="NEURAL STUDIO" style="background:#020617;border:1px solid #1e293b;color:#fff;font-size:11px;padding:7px 10px;border-radius:6px;outline:none;font-family:inherit;">
          </div>

          <div style="display:flex;flex-direction:column;gap:4px;">
            <label style="font-size:9px;color:#94a3b8;font-weight:700;">${T.cardNumber}</label>
            <input id="holo-num-inp" type="text" value="4721 •••• •••• 9182" style="background:#020617;border:1px solid #1e293b;color:#fff;font-size:11px;padding:7px 10px;border-radius:6px;outline:none;font-family:'JetBrains Mono',monospace;">
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <div style="display:flex;flex-direction:column;gap:4px;">
              <label style="font-size:9px;color:#94a3b8;font-weight:700;">${T.cardExpiry}</label>
              <input id="holo-exp-inp" type="text" value="12/28" style="background:#020617;border:1px solid #1e293b;color:#fff;font-size:11px;padding:7px 10px;border-radius:6px;outline:none;font-family:inherit;">
            </div>
            <div style="display:flex;flex-direction:column;gap:4px;">
              <label style="font-size:9px;color:#94a3b8;font-weight:700;">${T.cardType}</label>
              <input id="holo-badge-inp" type="text" value="PREMIUM" style="background:#020617;border:1px solid #1e293b;color:#fff;font-size:11px;padding:7px 10px;border-radius:6px;outline:none;font-family:inherit;">
            </div>
          </div>

          <div style="display:flex;flex-direction:column;gap:4px;">
            <label style="font-size:9px;color:#94a3b8;font-weight:700;">${T.gradientHdr}</label>
            <select id="holo-grad-sel" style="background:#020617;border:1px solid #1e293b;color:#fff;font-size:11px;padding:6px;border-radius:6px;outline:none;">
              <option value="cyber">${T.gradCyber}</option>
              <option value="ocean">${T.gradOcean}</option>
              <option value="gold">${T.gradGold}</option>
              <option value="crimson">${T.gradCrimson}</option>
              <option value="forest">${T.gradForest}</option>
            </select>
          </div>

          <!-- Sliders -->
          <div style="display:flex;flex-direction:column;gap:4px;">
            <div style="display:flex;justify-content:space-between;font-size:9px;color:#94a3b8;font-weight:700;">
              <span>${T.maxTiltLbl}</span><span id="holo-tilt-val">16°</span>
            </div>
            <input type="range" id="holo-tilt-sl" min="4" max="30" step="1" value="16" style="width:100%;height:4px;background:#334155;border-radius:2px;-webkit-appearance:none;cursor:pointer;">
          </div>

          <div style="display:flex;flex-direction:column;gap:4px;">
            <div style="display:flex;justify-content:space-between;font-size:9px;color:#94a3b8;font-weight:700;">
              <span>${T.glareIntLbl}</span><span id="holo-glare-val">0.25</span>
            </div>
            <input type="range" id="holo-glare-sl" min="0.05" max="0.6" step="0.05" value="0.25" style="width:100%;height:4px;background:#334155;border-radius:2px;-webkit-appearance:none;cursor:pointer;">
          </div>

          <div style="display:flex;flex-direction:column;gap:4px;">
            <div style="display:flex;justify-content:space-between;font-size:9px;color:#94a3b8;font-weight:700;">
              <span>${T.scaleHovLbl}</span><span id="holo-scale-val">1.04</span>
            </div>
            <input type="range" id="holo-scale-sl" min="1.00" max="1.12" step="0.01" value="1.04" style="width:100%;height:4px;background:#334155;border-radius:2px;-webkit-appearance:none;cursor:pointer;">
          </div>
        </div>

        <!-- Export -->
        <div style="background:#0f172a;border:1px solid #1e293b;border-radius:12px;padding:14px;">
          <h3 style="margin:0 0 4px;font-size:11px;color:#fbbf24;text-transform:uppercase;">${T.exportHdr}</h3>
          <p style="font-size:9px;color:#94a3b8;margin:0 0 10px;">${T.exportDesc}</p>
          <button id="holo-copy-code" style="width:100%;background:#1e293b;border:1px solid #334155;color:#fff;padding:8px;border-radius:6px;font-size:10px;font-weight:700;cursor:pointer;">${T.exportBtn}</button>
        </div>

        <div id="holo-toast" style="display:none;text-align:center;background:rgba(245,158,11,0.15);border:1px solid rgba(245,158,11,0.4);border-radius:8px;padding:8px;margin-top:10px;color:#fbbf24;font-size:11px;font-weight:700;"></div>
      </div>
    `;

    // Cache elements
    const card = document.getElementById('holo-live-card');
    const bg = document.getElementById('holo-bg');
    const glareEl = document.getElementById('holo-glare');
    const shineEl = document.getElementById('holo-shine');
    const nameEl = document.getElementById('holo-name-el');
    const numEl = document.getElementById('holo-num-el');
    const expEl = document.getElementById('holo-exp-el');
    const badgeEl = document.getElementById('holo-badge');
    const chipEl = document.getElementById('holo-chip-el');
    const nameInp = document.getElementById('holo-name-inp');
    const numInp = document.getElementById('holo-num-inp');
    const expInp = document.getElementById('holo-exp-inp');
    const badgeInp = document.getElementById('holo-badge-inp');
    const gradSel = document.getElementById('holo-grad-sel');
    const tiltSl = document.getElementById('holo-tilt-sl');
    const glareSl = document.getElementById('holo-glare-sl');
    const scaleSl = document.getElementById('holo-scale-sl');
    const tiltVal = document.getElementById('holo-tilt-val');
    const glareVal = document.getElementById('holo-glare-val');
    const scaleVal = document.getElementById('holo-scale-val');
    const copyBtn = document.getElementById('holo-copy-code');
    const toast = document.getElementById('holo-toast');

    let tiltMax = 16;
    let glareIntensity = 0.25;
    let hoverScale = 1.04;
    let currentGrad = GRADIENTS.cyber;

    function showToast(msg) {
      toast.textContent = msg;
      toast.style.display = 'block';
      setTimeout(() => { toast.style.display = 'none'; }, 2200);
    }

    function applyGradient(key) {
      currentGrad = GRADIENTS[key] || GRADIENTS.cyber;
      bg.style.background = currentGrad.gradient;
    }

    // Mouse 3D tracking on preview card
    const previewArea = document.getElementById('holo-preview-area');
    previewArea.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const rotX = -dy * tiltMax;
      const rotY = dx * tiltMax;
      card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${hoverScale},${hoverScale},${hoverScale})`;

      const px = (e.clientX - rect.left) / rect.width * 100;
      const py = (e.clientY - rect.top) / rect.height * 100;
      glareEl.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,${glareIntensity}) 0%, transparent 60%)`;
      glareEl.style.opacity = '1';
      shineEl.style.opacity = '1';
    });

    previewArea.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
      glareEl.style.opacity = '0';
      shineEl.style.opacity = '0';
    });

    // Input bindings
    nameInp.addEventListener('input', () => { nameEl.textContent = nameInp.value; });
    numInp.addEventListener('input', () => { numEl.textContent = numInp.value; });
    expInp.addEventListener('input', () => { expEl.textContent = expInp.value; });
    badgeInp.addEventListener('input', () => { badgeEl.textContent = badgeInp.value; });

    gradSel.addEventListener('change', () => applyGradient(gradSel.value));

    tiltSl.addEventListener('input', (e) => {
      tiltMax = parseInt(e.target.value);
      tiltVal.textContent = tiltMax + '°';
    });
    glareSl.addEventListener('input', (e) => {
      glareIntensity = parseFloat(e.target.value);
      glareVal.textContent = glareIntensity.toFixed(2);
    });
    scaleSl.addEventListener('input', (e) => {
      hoverScale = parseFloat(e.target.value);
      scaleVal.textContent = hoverScale.toFixed(2);
    });

    // Export component
    copyBtn.addEventListener('click', () => {
      const cardName = nameInp.value;
      const cardNum = numInp.value;
      const cardExp = expInp.value;
      const cardBadge = badgeInp.value;
      const gradKey = gradSel.value;
      const g = GRADIENTS[gradKey];

      const compCode = [
        '<!-- Holographic 3D Card Component — Zero Dependencies -->',
        '<div class="holo-wrap" style="perspective:1000px;display:inline-block;padding:20px;">',
        '  <div id="holoCard" style="width:280px;aspect-ratio:0.65;border-radius:20px;position:relative;cursor:pointer;transform-style:preserve-3d;transition:transform 0.08s ease;will-change:transform;">',
        '    <div style="width:100%;height:100%;border-radius:20px;position:relative;overflow:hidden;border:1px solid rgba(255,255,255,0.15);box-shadow:0 30px 80px -10px rgba(0,0,0,0.8);">',
        '      <div style="position:absolute;inset:0;background:' + g.gradient + ';border-radius:20px;"></div>',
        '      <div id="holoGlare" style="position:absolute;inset:0;opacity:0;transition:opacity 0.15s;pointer-events:none;mix-blend-mode:overlay;border-radius:20px;"></div>',
        '      <div style="position:absolute;inset:0;padding:28px 24px;display:flex;flex-direction:column;justify-content:space-between;">',
        '        <div style="display:flex;justify-content:space-between;align-items:flex-start;">',
        '          <div style="width:48px;height:36px;background:linear-gradient(135deg,#a78bfa,#7c3aed);border-radius:8px;"></div>',
        '          <div style="font-size:11px;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:1px;">' + cardBadge + '</div>',
        '        </div>',
        '        <div style="font-family:monospace;font-size:15px;letter-spacing:3px;color:rgba(255,255,255,0.9);">' + cardNum + '</div>',
        '        <div>',
        '          <div style="font-size:18px;font-weight:900;color:#fff;margin-bottom:8px;">' + cardName + '</div>',
        '          <div style="display:flex;justify-content:space-between;align-items:flex-end;">',
        '            <div>',
        '              <div style="font-size:9px;color:rgba(255,255,255,0.5);text-transform:uppercase;">Valid Thru</div>',
        '              <div style="font-size:14px;font-weight:700;color:rgba(255,255,255,0.9);">' + cardExp + '</div>',
        '            </div>',
        '            <div style="font-size:36px;opacity:0.8;">💳</div>',
        '          </div>',
        '        </div>',
        '      </div>',
        '    </div>',
        '  </div>',
        '</div>',
        '',
        '<' + 'script>',
        '(function() {',
        '  const card = document.getElementById("holoCard");',
        '  const glare = document.getElementById("holoGlare");',
        '  const tiltMax = ' + tiltMax + ';',
        '  const glareInt = ' + glareIntensity + ';',
        '  const hoverSc = ' + hoverScale + ';',
        '',
        '  card.addEventListener("mousemove", (e) => {',
        '    const rect = card.getBoundingClientRect();',
        '    const cx = rect.left + rect.width / 2;',
        '    const cy = rect.top + rect.height / 2;',
        '    const dx = (e.clientX - cx) / (rect.width / 2);',
        '    const dy = (e.clientY - cy) / (rect.height / 2);',
        '    card.style.transform = `rotateX(${-dy * tiltMax}deg) rotateY(${dx * tiltMax}deg) scale3d(${hoverSc},${hoverSc},${hoverSc})`;',
        '    const px = (e.clientX - rect.left) / rect.width * 100;',
        '    const py = (e.clientY - rect.top) / rect.height * 100;',
        '    glare.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,${glareInt}) 0%, transparent 60%)`;',
        '    glare.style.opacity = "1";',
        '  });',
        '  card.addEventListener("mouseleave", () => {',
        '    card.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";',
        '    glare.style.opacity = "0";',
        '  });',
        '})();',
        '</' + 'script>'
      ].join('\n');

      navigator.clipboard.writeText(compCode).then(() => {
        showToast(T.copied);
      }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = compCode; document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); document.body.removeChild(ta);
        showToast(T.copied);
      });
    });

    document.getElementById('holo-load-full').addEventListener('click', () => {
      if (window.editor) {
        window.editor.setValue(STANDALONE_TEMPLATE);
        if (window.runPreview) window.runPreview();
        showToast(T.loadSuccess);
      }
    });

    if (window.showToast) window.showToast('✅ Holographic Card Engine initialized.');
  }
})();
