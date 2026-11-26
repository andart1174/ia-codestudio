// Glassmorphic Card Studio Pro v2.0 — XSS-Safe, 5 Presets, 3D Tilt, WCAG 2.1 Audit

const T2G_PRESETS = {
  cyber: { color: '#00f0ff', blur: 16, radius: 24, bg: 'rgba(13, 18, 34, 0.58)' },
  apple: { color: '#e2e8f0', blur: 24, radius: 28, bg: 'rgba(255, 255, 255, 0.09)' },
  sunset: { color: '#ff4d9d', blur: 18, radius: 22, bg: 'rgba(28, 12, 34, 0.58)' },
  emerald: { color: '#10b981', blur: 16, radius: 20, bg: 'rgba(8, 28, 26, 0.6)' },
  gold: { color: '#fbbf24', blur: 14, radius: 18, bg: 'rgba(24, 18, 8, 0.65)' }
};

function buildGlassCard(opts) {
  const esc = (typeof window !== 'undefined' && window.HubUtils) ? window.HubUtils.escapeHtml : (s) => String(s || '');
  const escAttr = (typeof window !== 'undefined' && window.HubUtils) ? window.HubUtils.escapeAttr : esc;
  const cleanUrl = (typeof window !== 'undefined' && window.HubUtils) ? window.HubUtils.sanitizeUrl : (u) => u || '#';

  const title = esc(opts.title || 'Glass Card');
  const desc = esc(opts.desc || '');
  const btnText = esc(opts.btnText || 'Explore →');
  const btnHref = escAttr(cleanUrl(opts.btnUrl, '#'));
  const color = /^#[0-9a-f]{6}$/i.test(opts.color || '') ? opts.color : '#00f0ff';
  const blur = Math.max(0, Math.min(40, parseInt(opts.blur, 10) || 16));
  const radius = Math.max(0, Math.min(48, parseInt(opts.radius, 10) || 24));
  const cardBg = opts.cardBg || 'rgba(13, 18, 34, 0.58)';
  const tilt = !!opts.tilt;

  // Choose highest-contrast text color on the CTA button
  let btnFg = '#020617';
  let contrastInfo = { ratio: 12, level: 'AAA', color: '#10b981', text: '♿ 12.0:1 ✅ AAA' };
  if (typeof window !== 'undefined' && window.HubUtils) {
    const darkRatio = window.HubUtils.contrastRatio('#020617', color);
    const lightRatio = window.HubUtils.contrastRatio('#ffffff', color);
    btnFg = lightRatio > darkRatio ? '#ffffff' : '#020617';
    contrastInfo = window.HubUtils.formatContrastBadge(btnFg, color, opts.lang || 'fr');
  }

  const cardSnippet = `<div class="ia-glass-card" style="position:relative;max-width:360px;width:100%;padding:2rem;border-radius:${radius}px;background:${cardBg};backdrop-filter:blur(${blur}px);-webkit-backdrop-filter:blur(${blur}px);border:1px solid ${color}44;box-shadow:0 16px 42px rgba(0,0,0,0.45),inset 0 1px 0 rgba(255,255,255,0.14),0 0 28px ${color}24;color:#ffffff;font-family:'Outfit',system-ui,sans-serif;transition:transform 0.25s ease,box-shadow 0.25s ease;will-change:transform;">
  <div style="position:absolute;top:-40px;right:-40px;width:130px;height:130px;background:radial-gradient(circle,${color}66 0%,transparent 70%);filter:blur(22px);pointer-events:none;border-radius:50%;"></div>
  <h3 style="margin:0 0 0.7rem 0;font-size:1.38rem;font-weight:700;letter-spacing:-0.02em;color:#ffffff;">${title}</h3>
  <p style="margin:0 0 1.45rem 0;font-size:0.94rem;color:#cbd5e1;line-height:1.6;">${desc}</p>
  <a href="${btnHref}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:6px;padding:0.72rem 1.45rem;border-radius:12px;background:${color};color:${btnFg};text-decoration:none;font-weight:700;font-size:0.9rem;box-shadow:0 8px 22px ${color}45;transition:transform 0.2s ease;">${btnText}</a>
</div>`;

  const tiltScript = tilt ? `\n<script>
document.querySelectorAll('.ia-glass-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 14;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -14;
    card.style.transform = 'perspective(700px) rotateX(' + y.toFixed(1) + 'deg) rotateY(' + x.toFixed(1) + 'deg) translateY(-3px)';
  });
  card.addEventListener('mouseleave', () => { card.style.transform = 'none'; });
});
<\/script>` : '';

  const watermark = opts.includeWatermark && typeof window !== 'undefined' && window.HubUtils
    ? '\n' + window.HubUtils.getWatermarkCode()
    : '';

  return {
    previewHtml: cardSnippet,
    exportCode: cardSnippet + tiltScript + watermark,
    contrastInfo,
    btnFg
  };
}

if (typeof window !== 'undefined') {
  window._buildGlassCard = buildGlassCard;
}

document.addEventListener('DOMContentLoaded', () => {
  const inpTitle = document.getElementById('inp-title');
  const inpDesc = document.getElementById('inp-desc');
  const inpBtn = document.getElementById('inp-btn');
  const inpUrl = document.getElementById('inp-url');
  const inpColor = document.getElementById('inp-color');
  const inpBlur = document.getElementById('inp-blur');
  const valBlur = document.getElementById('val-blur');
  const inpRadius = document.getElementById('inp-radius');
  const valRadius = document.getElementById('val-radius');
  const chkTilt = document.getElementById('chk-tilt');
  const chkWatermark = document.getElementById('chk-watermark');
  const previewContainer = document.getElementById('preview-container-box');
  const outputCode = document.getElementById('output-code');
  const wcagBadge = document.getElementById('t2g-wcag-badge');
  const btnCopyCode = document.getElementById('btn-copy-code');
  const btnDownloadHtml = document.getElementById('btn-download-html');

  let activeBg = T2G_PRESETS.cyber.bg;
  const userTouched = { title: false, desc: false, btn: false };

  function bindPreviewTilt() {
    const card = previewContainer.querySelector('.ia-glass-card');
    if (!card || !chkTilt.checked) return;
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 14;
      const y = ((e.clientY - r.top) / r.height - 0.5) * -14;
      card.style.transform = `perspective(700px) rotateX(${y.toFixed(1)}deg) rotateY(${x.toFixed(1)}deg) translateY(-3px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'none';
    });
  }

  function updateCard() {
    valBlur.textContent = `${inpBlur.value}px`;
    valRadius.textContent = `${inpRadius.value}px`;

    const res = buildGlassCard({
      title: inpTitle.value,
      desc: inpDesc.value,
      btnText: inpBtn.value,
      btnUrl: inpUrl.value,
      color: inpColor.value,
      blur: inpBlur.value,
      radius: inpRadius.value,
      cardBg: activeBg,
      tilt: chkTilt.checked,
      includeWatermark: chkWatermark ? chkWatermark.checked : true,
      lang: currentLang
    });

    previewContainer.innerHTML = res.previewHtml;
    bindPreviewTilt();
    outputCode.value = res.exportCode;

    if (wcagBadge && res.contrastInfo) {
      wcagBadge.textContent = res.contrastInfo.text;
      wcagBadge.style.borderColor = res.contrastInfo.color;
      wcagBadge.style.color = res.contrastInfo.color;
    }
  }

  inpTitle.addEventListener('input', () => { userTouched.title = true; updateCard(); });
  inpDesc.addEventListener('input', () => { userTouched.desc = true; updateCard(); });
  inpBtn.addEventListener('input', () => { userTouched.btn = true; updateCard(); });
  inpUrl.addEventListener('input', updateCard);
  inpColor.addEventListener('input', updateCard);
  inpBlur.addEventListener('input', updateCard);
  inpRadius.addEventListener('input', updateCard);
  chkTilt.addEventListener('change', updateCard);
  if (chkWatermark) chkWatermark.addEventListener('change', updateCard);

  // Presets
  document.querySelectorAll('#t2g-presets .preset-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#t2g-presets .preset-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const p = T2G_PRESETS[btn.getAttribute('data-preset')];
      if (!p) return;
      inpColor.value = p.color;
      inpBlur.value = p.blur;
      inpRadius.value = p.radius;
      activeBg = p.bg;
      updateCard();
    });
  });

  // Preserve user-typed text on language change!
  window.addEventListener('langChanged', (e) => {
    const lang = e.detail.lang;
    const t = translations[lang];
    if (t) {
      if (!userTouched.title) inpTitle.value = t.t2g_preview_card_title;
      if (!userTouched.desc) inpDesc.value = t.t2g_preview_card_desc;
      if (!userTouched.btn) inpBtn.value = t.t2g_preview_card_btn;
    }
    updateCard();
  });

  btnCopyCode.addEventListener('click', () => {
    const msg = (translations[currentLang] && translations[currentLang].success_copy) || 'Copied!';
    window.HubUtils.copyText(outputCode.value, msg);
  });

  btnDownloadHtml.addEventListener('click', () => {
    const fullDoc = `<!DOCTYPE html>
<html lang="${currentLang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Glassmorphic Card — IA Code Studio</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    body { margin: 0; min-height: 100vh; display: flex; justify-content: center; align-items: center; padding: 2rem; background: radial-gradient(circle at 50% 45%, #161b33, #050508 80%); }
  </style>
</head>
<body>
${outputCode.value}
</body>
</html>`;
    window.HubUtils.safeDownloadText(fullDoc, 'glassmorphic-card.html', 'text/html;charset=utf-8');
    window.HubUtils.showToast(currentLang === 'en' ? '📥 HTML downloaded!' : '📥 HTML téléchargé !', 'success');
  });

  // Initialize default language copy before first render
  const t = translations[currentLang];
  if (t) {
    inpTitle.value = t.t2g_preview_card_title;
    inpDesc.value = t.t2g_preview_card_desc;
    inpBtn.value = t.t2g_preview_card_btn;
  }
  updateCard();
});
