// ============================================================================
// 3D CREATIVE STUDIO v2.0 — CORE ENGINE, XSS-SAFE COMPILER & MODULAR BRIDGE
// ============================================================================

let currentLang = (function () {
  try {
    return localStorage.getItem('hub_lang') || 'fr';
  } catch (e) {
    return 'fr';
  }
})();
window.currentLang = currentLang;

const translations = {
  fr: {
    title_customizer: "Personnalisation",
    label_category: "Catégorie",
    label_component: "Modèle 3D",
    label_search: "Recherche rapide",
    search_placeholder: "🔍 Rechercher (ex: roue, tarif, bouton, piano)...",
    btn_gallery: "Galerie Visuelle (72+)",
    label_text: "Texte principal",
    label_card_name: "Nom & Prénom",
    label_card_role: "Profession / Rôle",
    label_card_contact: "Contact (Tel/Email)",
    label_gift_title: "Titre du cadeau",
    label_gift_code: "Code Promo",
    label_gift_value: "Valeur du cadeau",
    label_surprise_msg: "Message Secret",
    label_color_primary: "Couleur 3D 1",
    label_color_secondary: "Couleur 3D 2",
    label_density: "Densité des particules",
    label_sound_effects: "Activer les effets sonores SFX (Web Audio)",
    btn_copy: "Copier le Code",
    btn_download: "Télécharger HTML",
    btn_frameworks: "React / Vue / Web Component",
    btn_share_qr: "Partager URL & QR Code",
    btn_back: "Retour",
    title_preview: "Studio de Prévisualisation",
    success_copy: "Code copié dans le presse-papiers !",
    ai_title: "Assistant Style IA",
    ai_placeholder: "Ex: Tarifs SaaS or & cyan, Roata promo neon...",
    palettes_title: "Palettes Curées & Randomizer",
    btn_surprise: "🎲 Style Aléatoire",
    smart_list_title: "Éditeur Rapide d'Éléments",
    btn_add_item: "+ Ajouter",
    tuners_title: "Réglages 3D Globaux",
    label_scale: "Échelle Stage",
    label_speed: "Vitesse Anim",
    vault_title: "Coffre de Presets",
    vault_placeholder: "Nom du preset...",
    tab_preview: "👁️ Aperçu",
    tab_html: "HTML",
    tab_css: "CSS",
    tab_js: "JS",
    mob_cust: "Studio",
    mob_gallery: "Galerie",
    mob_preview: "Aperçu",
    mob_code: "Code",

    // Categories (20)
    cat_buttons: "Boutons Interactifs",
    cat_cards: "Cartes de Visite 3D",
    cat_gift: "Cartes Cadeaux 3D",
    cat_surprise: "Cartes Surprises 3D",
    cat_toggles: "Switchs & Toggles 3D",
    cat_parallax: "Cartes Parallaxe 3D",
    cat_cursors: "Curseurs Interactifs 3D",
    cat_typography: "Typographie 3D Premium",
    cat_background: "Arrière-plans Flottants",
    cat_badges: "Rubans de Coin / Insignes",
    cat_data_viz: "Visualisations de Données 3D",
    cat_audio_players: "Lecteurs Audio 3D",
    cat_loaders: "Écrans de Chargement 3D",
    cat_carousels: "Carrousels de Produits 3D",
    cat_menus: "Menus de Navigation 3D",
    cat_widgets: "Widgets Interactifs 3D",
    cat_sections: "Sections Complètes de Sites 3D",
    cat_ads_promo: "Publicité & Bannières 3D",
    cat_gamification: "Gamification & Récompenses 3D",
    cat_audio_fx: "Visualiseurs & Synthétiseurs Audio 3D",

    // Default Values
    def_btn: "CLIQUEZ 3D",
    def_name: "Jean Dupont",
    def_role: "Designer UI/UX",
    def_contact: "contact@ia-studio.com",
    def_gift_title: "CARTE CADEAU PREMIUM",
    def_gift_code: "CAD-SURPRISE-100",
    def_gift_value: "100€",
    def_surprise: "Félicitations ! Vous avez débloqué le bonus secret. 🎁"
  },
  en: {
    title_customizer: "Customizer",
    label_category: "Category",
    label_component: "3D Model",
    label_search: "Quick Search",
    search_placeholder: "🔍 Search (e.g. wheel, pricing, button, piano)...",
    btn_gallery: "Visual Gallery (72+)",
    label_text: "Primary Text",
    label_card_name: "Full Name",
    label_card_role: "Profession / Role",
    label_card_contact: "Contact (Phone/Email)",
    label_gift_title: "Gift Title",
    label_gift_code: "Promo Code",
    label_gift_value: "Gift Value",
    label_surprise_msg: "Secret Message",
    label_color_primary: "3D Color 1",
    label_color_secondary: "3D Color 2",
    label_density: "Particle Density",
    label_sound_effects: "Enable SFX audio cues (Web Audio)",
    btn_copy: "Copy Code",
    btn_download: "Download HTML",
    btn_frameworks: "React / Vue / Web Component",
    btn_share_qr: "Share URL & QR Code",
    btn_back: "Back",
    title_preview: "Preview Studio",
    success_copy: "Code copied to clipboard!",
    ai_title: "AI Style Stylist",
    ai_placeholder: "e.g. SaaS AI pricing gold & cyan, Neon promo wheel...",
    palettes_title: "Curated Palettes & Mix",
    btn_surprise: "🎲 Surprise Style",
    smart_list_title: "Smart Item List Builder",
    btn_add_item: "+ Add Item",
    tuners_title: "Global 3D Stage Tuners",
    label_scale: "Stage Scale",
    label_speed: "Anim Speed",
    vault_title: "Preset Vault",
    vault_placeholder: "Preset name...",
    tab_preview: "👁️ Preview",
    tab_html: "HTML",
    tab_css: "CSS",
    tab_js: "JS",
    mob_cust: "Customize",
    mob_gallery: "Gallery",
    mob_preview: "Preview",
    mob_code: "Code",

    // Categories (20)
    cat_buttons: "Interactive Buttons",
    cat_cards: "3D Business Cards",
    cat_gift: "3D Gift Cards",
    cat_surprise: "3D Surprise Cards",
    cat_toggles: "3D Switch & Toggles",
    cat_parallax: "3D Parallax Cards",
    cat_cursors: "3D Cursors FX",
    cat_typography: "3D Typography",
    cat_background: "3D Floating Backgrounds",
    cat_badges: "3D Corner Ribbons",
    cat_data_viz: "3D Data Visualizations",
    cat_audio_players: "3D Audio Players",
    cat_loaders: "3D Loading Spinners",
    cat_carousels: "3D Product Carousels",
    cat_menus: "3D Navigation Menus",
    cat_widgets: "3D Interactive Widgets",
    cat_sections: "Complete 3D Web Sections",
    cat_ads_promo: "3D Ads & Promo Banners",
    cat_gamification: "3D Gamification & Rewards",
    cat_audio_fx: "3D Audio Visualizers & Synths",

    // Default Values
    def_btn: "CLICK 3D",
    def_name: "John Doe",
    def_role: "UI/UX Designer",
    def_contact: "hello@ia-studio.com",
    def_gift_title: "PREMIUM GIFT CARD",
    def_gift_code: "SURPRISE-100-GIFT",
    def_gift_value: "$100",
    def_surprise: "Congratulations! You have unlocked the secret bonus. 🎁"
  }
};

// Studio global tuners state (driven by modules/creative-stage-tools.js)
const stageSettings = {
  scale: 1.0,
  speed: 1.0,
  backdrop: 'dark', // 'dark' | 'checker' | 'light' | 'mesh'
  viewport: 'desktop' // 'desktop' | 'tablet' | 'mobile'
};

// UI Cache elements
const els = {
  selectCategory: document.getElementById('select-category'),
  selectComponent: document.getElementById('select-component'),
  inputText: document.getElementById('input-text'),
  inputCardName: document.getElementById('input-card-name'),
  inputCardRole: document.getElementById('input-card-role'),
  inputCardContact: document.getElementById('input-card-contact'),
  inputGiftTitle: document.getElementById('input-gift-title'),
  inputGiftCode: document.getElementById('input-gift-code'),
  inputGiftValue: document.getElementById('input-gift-value'),
  inputSurpriseMsg: document.getElementById('input-surprise-message'),
  chkSound: document.getElementById('chk-sound'),
  colorPrimary: document.getElementById('color-primary'),
  colorSecondary: document.getElementById('color-secondary'),
  valColorPrimary: document.getElementById('val-color-primary'),
  valColorSecondary: document.getElementById('val-color-secondary'),
  groupSlider: document.getElementById('group-speed-density'),
  rangeDensity: document.getElementById('range-density'),
  valDensity: document.getElementById('val-density'),
  fieldDefaultText: document.getElementById('field-default-text'),
  fieldGroupBusiness: document.getElementById('field-group-business'),
  fieldGroupGift: document.getElementById('field-group-gift'),
  fieldGroupSurprise: document.getElementById('field-group-surprise'),
  btnCopy: document.getElementById('btn-copy-code'),
  btnDownload: document.getElementById('btn-download-html'),
  iframe: document.getElementById('preview-iframe'),
  btnFr: document.getElementById('btn-lang-fr'),
  btnEn: document.getElementById('btn-lang-en')
};

window.__CreativeStudioHooks = window.__CreativeStudioHooks || {};

// ----------------------------------------------------------------------------
// SECURITY HELPERS (XSS Prevention + Safe JS Interpolation + CSS Sanitizer)
// ----------------------------------------------------------------------------
function escapeHtml(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeJsStr(str) {
  return String(str == null ? '' : str)
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/'/g, "\\'")
    .replace(/\r/g, '')
    .replace(/\n/g, '\\n')
    .replace(/</g, '\\x3c')
    .replace(/>/g, '\\x3e');
}

function sanitizeInvalidCssVarHex(cssStr) {
  const pctMap = { '10': '6%', '15': '10%', '20': '13%', '25': '16%', '30': '19%', '40': '25%', '50': '31%', '60': '38%', '70': '44%', '80': '50%', '90': '56%' };
  return String(cssStr || '').replace(/var\((--c[a-zA-Z0-9_-]*)\)([0-9a-fA-F]{2})\b/g, (_, varName, hexAlpha) => {
    const pct = pctMap[hexAlpha] || Math.round((parseInt(hexAlpha, 16) / 255) * 100) + '%';
    return `color-mix(in srgb, var(${varName}) ${pct}, transparent)`;
  });
}

function safeDownloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    try { document.body.removeChild(link); } catch (e) {}
    try { URL.revokeObjectURL(url); } catch (e) {}
  }, 4000);
}

function showToast(msg, type = 'success') {
  let wrap = document.getElementById('studio-toast-wrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.id = 'studio-toast-wrap';
    wrap.className = 'studio-toast-wrap';
    document.body.appendChild(wrap);
  }
  const el = document.createElement('div');
  el.className = `studio-toast ${type}`;
  el.textContent = msg;
  wrap.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => { try { wrap.removeChild(el); } catch (e) {} }, 300);
  }, 2600);
}

// ----------------------------------------------------------------------------
// COMPONENT SELECTION & DYNAMIC FIELD MANAGEMENT
// ----------------------------------------------------------------------------
function updateComponentOptions() {
  if (!els.selectCategory || !els.selectComponent || !window.uiTemplates) return;
  const selectedCat = els.selectCategory.value;
  els.selectComponent.innerHTML = '';

  for (const [key, comp] of Object.entries(window.uiTemplates)) {
    if (comp.category === selectedCat) {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = (comp.name && (comp.name[currentLang] || comp.name.en || comp.name.fr)) || key;
      els.selectComponent.appendChild(option);
    }
  }
  handleComponentChange();
}

function selectComponentByKey(key) {
  const comp = window.uiTemplates && window.uiTemplates[key];
  if (!comp) return false;
  if (els.selectCategory && els.selectCategory.value !== comp.category) {
    els.selectCategory.value = comp.category;
    updateComponentOptions();
  }
  if (els.selectComponent) {
    els.selectComponent.value = key;
    handleComponentChange();
  }
  return true;
}

function handleComponentChange() {
  const activeKey = els.selectComponent?.value;
  if (!activeKey || !window.uiTemplates?.[activeKey]) return;

  const template = window.uiTemplates[activeKey];
  document.querySelectorAll('.dynamic-field').forEach(el => el.style.display = 'none');

  if (template.inputs && template.inputs.includes('text')) {
    if (els.fieldDefaultText) els.fieldDefaultText.style.display = 'flex';
    if (els.inputText) {
      if (template.defaultText) {
        els.inputText.value = template.defaultText[currentLang] || template.defaultText.en || template.defaultText.fr;
      } else {
        els.inputText.value = translations[currentLang].def_btn;
      }
    }
  }
  if (template.inputs && template.inputs.includes('name') && els.fieldGroupBusiness) {
    els.fieldGroupBusiness.style.display = 'block';
  }
  if (template.inputs && template.inputs.includes('gift_title') && els.fieldGroupGift) {
    els.fieldGroupGift.style.display = 'block';
  }
  if (template.inputs && template.inputs.includes('secret_message') && els.fieldGroupSurprise) {
    els.fieldGroupSurprise.style.display = 'flex';
  }

  if (els.groupSlider) {
    els.groupSlider.style.display = (template.inputs && template.inputs.includes('density')) ? 'flex' : 'none';
  }

  if (typeof window.__CreativeStudioHooks.onComponentChanged === 'function') {
    window.__CreativeStudioHooks.onComponentChanged(activeKey, template);
  }

  updatePreview();
}

function getRawInputParams(activeKey) {
  const template = window.uiTemplates?.[activeKey];
  if (!template) return [];
  const list = [];
  if (template.inputs) {
    template.inputs.forEach(inputName => {
      if (inputName === 'text') list.push(els.inputText?.value || '');
      if (inputName === 'name') {
        list.push(els.inputCardName?.value || '');
        list.push(els.inputCardRole?.value || '');
        list.push(els.inputCardContact?.value || '');
      }
      if (inputName === 'gift_title') {
        list.push(els.inputGiftTitle?.value || '');
        list.push(els.inputGiftCode?.value || '');
        list.push(els.inputGiftValue?.value || '');
      }
      if (inputName === 'secret_message') list.push(els.inputSurpriseMsg?.value || '');
    });
  }
  return list;
}

// Encapsulated Web Audio SFX engine (IIFE — zero global variable collisions!)
function getAudioSynthesizerScript() {
  if (!els.chkSound || !els.chkSound.checked) return '';
  return `(function () {
  var _sCtx = null;
  function _ensureCtx() {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!_sCtx) _sCtx = new AC();
    if (_sCtx.state === 'suspended') _sCtx.resume().catch(function () {});
    return _sCtx;
  }
  function _playSfx(type) {
    try {
      var ctx = _ensureCtx();
      if (!ctx) return;
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      var now = ctx.currentTime;
      if (type === 'hover') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(650, now);
        osc.frequency.exponentialRampToValueAtTime(1100, now + 0.07);
        gain.gain.setValueAtTime(0.018, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now); osc.stop(now + 0.085);
      } else {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(240, now);
        osc.frequency.exponentialRampToValueAtTime(90, now + 0.14);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now); osc.stop(now + 0.16);
      }
    } catch (e) {}
  }
  var sel = 'button, a, [role="button"], [id="sound-btn"], .gift-card-3d, .envelope-3d, .retro-card, .parallax-card, .holo-card, .credit-card-3d, .metal-card, .tab-item, .dock-item, .stack-item, .radial-item, .cal-day, .hotspot, .feat-card, .stat-box, .plan-card-3d, .step-card, .portal-card, .tarot-card-3d, .crystal-scene, .trophy-scene, .scroll-scene, .hg-scene, .sub-scene, .vinyl-deck, .knob-dial-3d, .spring-sw-box, .piano-key';
  document.querySelectorAll(sel).forEach(function (el) {
    el.addEventListener('mouseenter', function () { _playSfx('hover'); });
    el.addEventListener('click', function () { _playSfx('click'); });
  });
})();`;
}

// Lightweight Universal Touch-to-Mouse Adapter so 3D tilt/scratch/drag templates work on phones/tablets
function getTouchAdapterScript() {
  return `(function () {
  var lastTouchTarget = null;
  function dispatchMouse(name, touch) {
    var tgt = touch.target || document;
    var ev = new MouseEvent(name, {
      bubbles: true, cancelable: true, view: window,
      clientX: touch.clientX, clientY: touch.clientY,
      screenX: touch.screenX, screenY: touch.screenY
    });
    tgt.dispatchEvent(ev);
  }
  document.addEventListener('touchstart', function (e) {
    if (!e.touches || !e.touches[0]) return;
    lastTouchTarget = e.touches[0].target;
    dispatchMouse('mousedown', e.touches[0]);
  }, { passive: true });
  document.addEventListener('touchmove', function (e) {
    if (!e.touches || !e.touches[0]) return;
    dispatchMouse('mousemove', e.touches[0]);
  }, { passive: true });
  document.addEventListener('touchend', function (e) {
    var t = (e.changedTouches && e.changedTouches[0]) || { clientX: 0, clientY: 0, screenX: 0, screenY: 0, target: lastTouchTarget || document };
    dispatchMouse('mouseup', t);
    dispatchMouse('mouseleave', t);
  }, { passive: true });
})();`;
}

function getStageOverrideCss(cPrim, cSec) {
  let bgRule = '';
  if (stageSettings.backdrop === 'checker') {
    bgRule = 'body { background-color: #0b1120 !important; background-image: linear-gradient(45deg, #1e293b 25%, transparent 25%), linear-gradient(-45deg, #1e293b 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1e293b 75%), linear-gradient(-45deg, transparent 75%, #1e293b 75%) !important; background-size: 24px 24px !important; background-position: 0 0, 0 12px, 12px -12px, -12px 0 !important; }';
  } else if (stageSettings.backdrop === 'light') {
    bgRule = 'body { background: radial-gradient(circle at center, #f1f5f9 0%, #cbd5e1 100%) !important; }';
  } else if (stageSettings.backdrop === 'mesh') {
    bgRule = `body { background: radial-gradient(circle at 20% 20%, color-mix(in srgb, ${cPrim} 25%, #030712), transparent 55%), radial-gradient(circle at 80% 80%, color-mix(in srgb, ${cSec} 25%, #030712), #030712) !important; }`;
  }

  const scaleVal = Number(stageSettings.scale || 1).toFixed(2);
  const scaleRule = scaleVal !== '1.00'
    ? `body > *:not(script):not(style) { zoom: ${scaleVal}; }`
    : '';

  const speedVal = Number(stageSettings.speed || 1);
  const speedRule = speedVal !== 1.0
    ? `* { animation-duration: calc(1s / ${speedVal}) !important; transition-duration: calc(0.28s / ${speedVal}) !important; }`
    : '';

  const responsiveCss = `
/* Studio v2.0 Responsive & Touch-Friendly Baseline */
* { box-sizing: border-box; }
@media (max-width: 640px) {
  body { min-height: 100vh; height: auto !important; padding: 14px !important; overflow-y: auto !important; }
  .menu-layout, .showcase-scene, .cal-scene, .hero-section { flex-direction: column !important; gap: 20px !important; width: 100% !important; max-width: 100% !important; padding: 12px !important; }
  .features-grid, .stats-grid, .pricing-grid-3d, .steps-grid, .logos-grid-3d { grid-template-columns: 1fr !important; gap: 14px !important; }
  .subscribe-form { flex-direction: column !important; }
  .cover-scene, .chart-scene, .tab-layout, .dock-layout, .toast-scene { width: 100% !important; max-width: 100% !important; }
  .tab-items-container { flex-wrap: wrap !important; justify-content: center !important; }
  .tab-item { padding: 8px 12px !important; font-size: 12px !important; }
  .glass-text, .chrome-txt, .neon-txt { font-size: clamp(28px, 10vw, 56px) !important; text-align: center !important; }
}`;
  return [responsiveCss, bgRule, scaleRule, speedRule].filter(Boolean).join('\n');
}

function compileParts(includeStudioOverrides = true) {
  const activeKey = els.selectComponent?.value;
  if (!activeKey || !window.uiTemplates?.[activeKey]) return null;

  const template = window.uiTemplates[activeKey];
  const rawParams = getRawInputParams(activeKey);
  const htmlSafeParams = rawParams.map(escapeHtml);
  const jsSafeParams = rawParams.map(escapeJsStr);

  const cPrim = els.colorPrimary?.value || '#00f0ff';
  const cSec = els.colorSecondary?.value || '#ff007f';
  const density = els.rangeDensity?.value || '5';

  const html = template.html(...htmlSafeParams, cPrim, cSec);
  const css = sanitizeInvalidCssVarHex(template.css(cPrim, cSec));
  const js = template.js(...jsSafeParams, cPrim, cSec, density);
  const audioScript = getAudioSynthesizerScript();
  const touchScript = getTouchAdapterScript();
  const stageCss = includeStudioOverrides ? getStageOverrideCss(cPrim, cSec) : getStageOverrideCss(cPrim, cSec).split('\n').slice(0, 12).join('\n');

  const fullCss = `${css.trim()}\n${stageCss.trim()}`;
  const fullJs = [js.trim(), audioScript.trim(), touchScript.trim()].filter(Boolean).join('\n\n');

  const fullHtml = `<!DOCTYPE html>
<html lang="${currentLang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>3D Creative Asset — ${(template.name?.[currentLang] || activeKey).replace(/</g, '')}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Space+Grotesk:wght@600;700;800&display=swap" rel="stylesheet">
  <style>
    ${fullCss.replace(/\n/g, '\n    ')}
  </style>
</head>
<body>
  ${html.trim().replace(/\n/g, '\n  ')}
  <script>
    ${fullJs.replace(/\n/g, '\n    ')}
  </script>
</body>
</html>`;

  return {
    key: activeKey,
    template,
    category: template.category,
    rawParams,
    cPrim,
    cSec,
    density,
    html: html.trim(),
    css: css.trim(),
    fullCss: fullCss.trim(),
    js: js.trim(),
    fullJs: fullJs.trim(),
    fullHtml
  };
}

function compileOutputCode() {
  const parts = compileParts(false);
  return parts ? parts.fullHtml : '';
}

function updatePreview() {
  const parts = compileParts(true);
  if (!parts) return;
  if (els.iframe) els.iframe.srcdoc = parts.fullHtml;

  if (typeof window.__CreativeStudioHooks.onPreviewUpdated === 'function') {
    window.__CreativeStudioHooks.onPreviewUpdated(parts);
  }
}

function applyTranslations(lang) {
  currentLang = (lang === 'en') ? 'en' : 'fr';
  window.currentLang = currentLang;
  try { localStorage.setItem('hub_lang', currentLang); } catch (e) {}

  if (els.btnFr) els.btnFr.classList.toggle('active', currentLang === 'fr');
  if (els.btnEn) els.btnEn.classList.toggle('active', currentLang === 'en');

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang] && translations[currentLang][key]) {
      el.textContent = translations[currentLang][key];
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[currentLang] && translations[currentLang][key]) {
      el.placeholder = translations[currentLang][key];
    }
  });

  const activeComp = els.selectComponent?.value;
  updateComponentOptions();
  if (activeComp && els.selectComponent) {
    els.selectComponent.value = activeComp;
    handleComponentChange();
  }

  if (typeof window.__CreativeStudioHooks.onLangChanged === 'function') {
    window.__CreativeStudioHooks.onLangChanged(currentLang);
  }
}

function init() {
  if (els.btnFr) els.btnFr.addEventListener('click', () => applyTranslations('fr'));
  if (els.btnEn) els.btnEn.addEventListener('click', () => applyTranslations('en'));

  if (els.colorPrimary) {
    els.colorPrimary.addEventListener('input', (e) => {
      if (els.valColorPrimary) els.valColorPrimary.textContent = e.target.value.toUpperCase();
      updatePreview();
    });
  }
  if (els.colorSecondary) {
    els.colorSecondary.addEventListener('input', (e) => {
      if (els.valColorSecondary) els.valColorSecondary.textContent = e.target.value.toUpperCase();
      updatePreview();
    });
  }

  if (els.rangeDensity) {
    els.rangeDensity.addEventListener('input', (e) => {
      if (els.valDensity) els.valDensity.textContent = e.target.value;
      updatePreview();
    });
  }

  if (els.selectCategory) els.selectCategory.addEventListener('change', updateComponentOptions);
  if (els.selectComponent) els.selectComponent.addEventListener('change', handleComponentChange);
  if (els.chkSound) els.chkSound.addEventListener('change', updatePreview);

  const inputs = [
    els.inputText, els.inputCardName, els.inputCardRole, els.inputCardContact,
    els.inputGiftTitle, els.inputGiftCode, els.inputGiftValue, els.inputSurpriseMsg
  ].filter(Boolean);
  inputs.forEach(input => input.addEventListener('input', updatePreview));

  // Pro Export: Copy Standalone HTML
  if (els.btnCopy) {
    els.btnCopy.addEventListener('click', () => {
      if (typeof window.isUserPremium === 'function' && !window.isUserPremium()) {
        if (typeof window.showPaywallModal === 'function') { window.showPaywallModal(); return; }
      }
      const code = compileOutputCode();
      navigator.clipboard.writeText(code).then(() => {
        showToast(translations[currentLang].success_copy, 'success');
      }).catch(err => {
        console.error(err);
        showToast('Copy failed — check browser permissions.', 'error');
      });
    });
  }

  // Pro Export: Download Standalone HTML
  if (els.btnDownload) {
    els.btnDownload.addEventListener('click', () => {
      if (typeof window.isUserPremium === 'function' && !window.isUserPremium()) {
        if (typeof window.showPaywallModal === 'function') { window.showPaywallModal(); return; }
      }
      const code = compileOutputCode();
      const blob = new Blob([code], { type: 'text/html;charset=utf-8;' });
      safeDownloadBlob(blob, `${els.selectComponent.value}-3d-creative-export.html`);
      showToast(`${els.selectComponent.value}.html downloaded!`, 'success');
    });
  }

  // Apply initial language from localStorage('hub_lang') consistently
  applyTranslations(currentLang);

  if (typeof window.__CreativeStudioHooks.onReady === 'function') {
    window.__CreativeStudioHooks.onReady();
  }
}

// Public Modular Core Bridge for 3D Creative Studio v2.0 Extensions
window.__CreativeStudioCore = {
  els,
  translations,
  stageSettings,
  getLang: () => currentLang,
  setLang: applyTranslations,
  getState: () => ({
    cat: els.selectCategory?.value || 'buttons',
    comp: els.selectComponent?.value || 'liquid',
    cPrim: els.colorPrimary?.value || '#00f0ff',
    cSec: els.colorSecondary?.value || '#ff007f',
    density: els.rangeDensity?.value || '5',
    sound: !!els.chkSound?.checked,
    text: els.inputText?.value || '',
    name: els.inputCardName?.value || '',
    role: els.inputCardRole?.value || '',
    contact: els.inputCardContact?.value || '',
    giftTitle: els.inputGiftTitle?.value || '',
    giftCode: els.inputGiftCode?.value || '',
    giftValue: els.inputGiftValue?.value || '',
    surprise: els.inputSurpriseMsg?.value || '',
    scale: stageSettings.scale,
    speed: stageSettings.speed,
    backdrop: stageSettings.backdrop,
    viewport: stageSettings.viewport
  }),
  restoreState: (st) => {
    if (!st) return;
    if (st.cat && els.selectCategory) els.selectCategory.value = st.cat;
    updateComponentOptions();
    if (st.comp && window.uiTemplates?.[st.comp]) {
      selectComponentByKey(st.comp);
    }
    if (st.cPrim && els.colorPrimary) {
      els.colorPrimary.value = st.cPrim;
      if (els.valColorPrimary) els.valColorPrimary.textContent = st.cPrim.toUpperCase();
    }
    if (st.cSec && els.colorSecondary) {
      els.colorSecondary.value = st.cSec;
      if (els.valColorSecondary) els.valColorSecondary.textContent = st.cSec.toUpperCase();
    }
    if (st.density !== undefined && els.rangeDensity) {
      els.rangeDensity.value = st.density;
      if (els.valDensity) els.valDensity.textContent = st.density;
    }
    if (st.sound !== undefined && els.chkSound) els.chkSound.checked = !!st.sound;
    if (st.text !== undefined && els.inputText) els.inputText.value = st.text;
    if (st.name !== undefined && els.inputCardName) els.inputCardName.value = st.name;
    if (st.role !== undefined && els.inputCardRole) els.inputCardRole.value = st.role;
    if (st.contact !== undefined && els.inputCardContact) els.inputCardContact.value = st.contact;
    if (st.giftTitle !== undefined && els.inputGiftTitle) els.inputGiftTitle.value = st.giftTitle;
    if (st.giftCode !== undefined && els.inputGiftCode) els.inputGiftCode.value = st.giftCode;
    if (st.giftValue !== undefined && els.inputGiftValue) els.inputGiftValue.value = st.giftValue;
    if (st.surprise !== undefined && els.inputSurpriseMsg) els.inputSurpriseMsg.value = st.surprise;
    if (st.scale !== undefined) stageSettings.scale = parseFloat(st.scale) || 1.0;
    if (st.speed !== undefined) stageSettings.speed = parseFloat(st.speed) || 1.0;
    if (st.backdrop) stageSettings.backdrop = st.backdrop;
    if (st.viewport) stageSettings.viewport = st.viewport;
    updatePreview();
  },
  selectComponentByKey,
  updateComponentOptions,
  handleComponentChange,
  updatePreview,
  compileParts,
  compileOutputCode,
  safeDownloadBlob,
  showToast
};

document.addEventListener('DOMContentLoaded', init);
