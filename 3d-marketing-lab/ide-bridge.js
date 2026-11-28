/**
 * IA Code Studio — 3D Marketing Lab -> Studio Pro IDE & Global Brand Kit Bridge
 * Adds a sleek "💻 Edit Code in IDE" + "🎨 Brand Kit" pill inside every 3D Marketing Lab generator.
 */
(function () {
  'use strict';

  function isFr() {
    return (localStorage.getItem('hub_lang') || document.documentElement.lang || 'en') === 'fr';
  }

  function grabGeneratedCode() {
    const candidates = [
      document.getElementById('output-code'),
      document.getElementById('export-code'),
      document.getElementById('embed-code'),
      document.querySelector('textarea[readonly]'),
      document.querySelector('textarea')
    ];
    for (const el of candidates) {
      if (el && el.value && el.value.trim().length > 40) return el.value.trim();
    }
    // Fallback: trigger export button silently or capture current title/settings as clean embed starter
    const title = document.title || '3D Marketing Lab Widget';
    const canvas = document.querySelector('canvas');
    let previewImg = '';
    try { if (canvas) previewImg = canvas.toDataURL('image/png'); } catch (e) {}
    return `<!DOCTYPE html>
<html lang="${isFr() ? 'fr' : 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title.replace(/</g, '&lt;')}</title>
  <style>
    body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#030712;color:#fff;font-family:Inter,system-ui,sans-serif;padding:24px;box-sizing:border-box}
    .widget-box{max-width:780px;width:100%;background:rgba(15,23,42,.85);border:1px solid rgba(139,92,246,.35);border-radius:22px;padding:28px;text-align:center;box-shadow:0 24px 60px rgba(0,0,0,.5)}
    .widget-box img{max-width:100%;border-radius:14px;margin-bottom:18px;background:#020617}
    .cta{display:inline-block;margin-top:12px;padding:12px 26px;border-radius:12px;background:linear-gradient(135deg,#8b5cf6,#06b6d4);color:#fff;font-weight:800;text-decoration:none}
  </style>
</head>
<body>
  <section class="widget-box">
    ${previewImg ? '<img src="' + previewImg + '" alt="3D Visual">' : ''}
    <h1>${title.replace(/</g, '&lt;')}</h1>
    <p style="color:#94a3b8">Customize this 3D Marketing Lab widget freely inside IA Architecte Studio Pro.</p>
    <a href="https://ia-codestudio.com" class="cta">Explore Offer →</a>
  </section>
</body>
</html>`;
  }

  function applyGlobalBrandKit() {
    try {
      const raw = localStorage.getItem('ad_genius_brand_kit_v1');
      if (!raw) {
        alert(isFr()
          ? 'Configurez d’abord votre Brand Kit dans Ad-Genius AI Pro (🎨 Brand Kit) pour le synchroniser ici !'
          : 'Save your Global Brand Kit inside Ad-Genius AI Pro (🎨 Brand Kit) first to sync it here!');
        return;
      }
      const kit = JSON.parse(raw);
      const textInputs = document.querySelectorAll('input[type="text"]');
      if (textInputs.length && kit.name) {
        textInputs[0].value = kit.name;
        textInputs[0].dispatchEvent(new Event('input', { bubbles: true }));
      }
      const colorInputs = document.querySelectorAll('input[type="color"]');
      if (colorInputs[0] && kit.primary) {
        colorInputs[0].value = kit.primary;
        colorInputs[0].dispatchEvent(new Event('input', { bubbles: true }));
      }
      if (colorInputs[1] && kit.accent) {
        colorInputs[1].value = kit.accent;
        colorInputs[1].dispatchEvent(new Event('input', { bubbles: true }));
      }
    } catch (e) {}
  }

  function mountBridge() {
    const navLinks = document.querySelector('.navbar .nav-links');
    if (!navLinks || document.getElementById('lab-edit-ide-btn')) return;

    const brandBtn = document.createElement('button');
    brandBtn.type = 'button';
    brandBtn.id = 'lab-brand-sync-btn';
    brandBtn.textContent = isFr() ? '🎨 Brand Kit' : '🎨 Brand Kit';
    brandBtn.style.cssText = 'padding:7px 12px;border-radius:9px;border:1px solid rgba(245,158,11,0.4);background:rgba(245,158,11,0.14);color:#fde68a;font-size:0.78rem;font-weight:700;cursor:pointer;';
    brandBtn.onclick = applyGlobalBrandKit;

    const ideBtn = document.createElement('button');
    ideBtn.type = 'button';
    ideBtn.id = 'lab-edit-ide-btn';
    ideBtn.textContent = isFr() ? '💻 Éditer dans IDE' : '💻 Edit Code in IDE';
    ideBtn.style.cssText = 'padding:7px 13px;border-radius:9px;border:none;background:linear-gradient(135deg,#8b5cf6,#06b6d4);color:#fff;font-size:0.78rem;font-weight:800;cursor:pointer;box-shadow:0 4px 14px rgba(139,92,246,0.35);';
    ideBtn.onclick = () => {
      const code = grabGeneratedCode();
      try {
        localStorage.setItem('ia_forge_handoff', JSON.stringify({
          title: document.title || '3D Marketing Lab Widget',
          html: code,
          css: '',
          js: '',
          combinedHtml: code,
          ts: Date.now()
        }));
      } catch (e) {}
      window.location.href = '/ia-architecte-app/index.html?from=forge&lang=' + (isFr() ? 'fr' : 'en');
    };

    navLinks.insertBefore(ideBtn, navLinks.firstChild);
    navLinks.insertBefore(brandBtn, ideBtn);
  }

  document.addEventListener('DOMContentLoaded', mountBridge);
})();
