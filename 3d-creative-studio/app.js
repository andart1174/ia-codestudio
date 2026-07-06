// 3D Creative Suite Core App Engine

let currentLang = 'fr';

const translations = {
  fr: {
    title_customizer: "Personnalisation",
    label_category: "Catégorie",
    label_component: "Modèle 3D",
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
    btn_back: "Retour",
    title_preview: "Studio de Prévisualisation",
    success_copy: "Code copié avec succès dans le presse-papiers !",
    
    // Categories
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
    btn_back: "Back",
    title_preview: "Preview Studio",
    success_copy: "Code successfully copied to clipboard!",

    // Categories
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

// UI Cache elements
const els = {
  selectCategory: document.getElementById('select-category'),
  selectComponent: document.getElementById('select-component'),
  
  // Custom Inputs
  inputText: document.getElementById('input-text'),
  inputCardName: document.getElementById('input-card-name'),
  inputCardRole: document.getElementById('input-card-role'),
  inputCardContact: document.getElementById('input-card-contact'),
  inputGiftTitle: document.getElementById('input-gift-title'),
  inputGiftCode: document.getElementById('input-gift-code'),
  inputGiftValue: document.getElementById('input-gift-value'),
  inputSurpriseMsg: document.getElementById('input-surprise-message'),
  chkSound: document.getElementById('chk-sound'),
  
  // Custom Pickers
  colorPrimary: document.getElementById('color-primary'),
  colorSecondary: document.getElementById('color-secondary'),
  valColorPrimary: document.getElementById('val-color-primary'),
  valColorSecondary: document.getElementById('val-color-secondary'),
  
  // Sliders
  groupSlider: document.getElementById('group-speed-density'),
  rangeDensity: document.getElementById('range-density'),
  valDensity: document.getElementById('val-density'),
  
  // Dynamic fields
  fieldDefaultText: document.getElementById('field-default-text'),
  fieldGroupBusiness: document.getElementById('field-group-business'),
  fieldGroupGift: document.getElementById('field-group-gift'),
  fieldGroupSurprise: document.getElementById('field-group-surprise'),

  // Actions
  btnCopy: document.getElementById('btn-copy-code'),
  btnDownload: document.getElementById('btn-download-html'),
  iframe: document.getElementById('preview-iframe'),
  btnFr: document.getElementById('btn-lang-fr'),
  btnEn: document.getElementById('btn-lang-en')
};

// Update component dropdown selection dynamically based on Category
function updateComponentOptions() {
  const selectedCat = els.selectCategory.value;
  els.selectComponent.innerHTML = ''; // reset

  for (const [key, comp] of Object.entries(window.uiTemplates)) {
    if (comp.category === selectedCat) {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = comp.name[currentLang];
      els.selectComponent.appendChild(option);
    }
  }

  // Trigger component fields refresh
  handleComponentChange();
}

// Manage dynamic form visibility depending on template attributes
function handleComponentChange() {
  const activeKey = els.selectComponent.value;
  if (!activeKey) return;

  const template = window.uiTemplates[activeKey];
  
  // Hide all dynamic inputs initially
  document.querySelectorAll('.dynamic-field').forEach(el => el.style.display = 'none');

  // Toggle controls depending on required inputs list
  if (template.inputs && template.inputs.includes("text")) {
    els.fieldDefaultText.style.display = 'flex';
    if (template.defaultText) {
      els.inputText.value = template.defaultText[currentLang];
    } else {
      els.inputText.value = translations[currentLang].def_btn;
    }
  }
  if (template.inputs && template.inputs.includes("name")) {
    els.fieldGroupBusiness.style.display = 'block';
  }
  if (template.inputs && template.inputs.includes("gift_title")) {
    els.fieldGroupGift.style.display = 'block';
  }
  if (template.inputs && template.inputs.includes("secret_message")) {
    els.fieldGroupSurprise.style.display = 'flex';
  }

  // Handle density slider visibility (Used by Particle sparks only)
  if (template.inputs && template.inputs.includes("density")) {
    els.groupSlider.style.display = 'flex';
  } else {
    els.groupSlider.style.display = 'none';
  }

  updatePreview();
}

// Fetch input values depending on active template requirements
function getActiveInputParams() {
  const activeKey = els.selectComponent.value;
  if (!activeKey) return [];
  const template = window.uiTemplates[activeKey];
  const list = [];

  if (template.inputs) {
    template.inputs.forEach(inputName => {
      if (inputName === "text") list.push(els.inputText.value);
      if (inputName === "name") {
        list.push(els.inputCardName.value);
        list.push(els.inputCardRole.value);
        list.push(els.inputCardContact.value);
      }
      if (inputName === "gift_title") {
        list.push(els.inputGiftTitle.value);
        list.push(els.inputGiftCode.value);
        list.push(els.inputGiftValue.value);
      }
      if (inputName === "secret_message") list.push(els.inputSurpriseMsg.value);
    });
  }

  return list;
}

// Synthesize SFX Web Audio API script block
function getAudioSynthesizerScript() {
  if (!els.chkSound.checked) return '';

  return `
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  function playSynth(type) {
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      if (type === 'hover') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(650, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1100, audioCtx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
        osc.start(); osc.stop(audioCtx.currentTime + 0.08);
      } else if (type === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(240, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(90, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
        osc.start(); osc.stop(audioCtx.currentTime + 0.15);
      }
    } catch(e){}
  }
  // Bind to any button, toggle, or container clicks/hovers
  document.querySelectorAll('button, [id="sound-btn"], .gift-card-3d, .envelope-3d, .retro-card, .parallax-card').forEach(el => {
    el.addEventListener('mouseenter', () => playSynth('hover'));
    el.addEventListener('click', () => playSynth('click'));
  });
  `;
}

// Compile complete code string
function compileOutputCode() {
  const activeKey = els.selectComponent.value;
  if (!activeKey) return '';

  const template = window.uiTemplates[activeKey];
  const params = getActiveInputParams();
  const cPrim = els.colorPrimary.value;
  const cSec = els.colorSecondary.value;
  const density = els.rangeDensity.value;

  const html = template.html(...params, cPrim, cSec);
  const css = template.css(cPrim, cSec);
  
  // Custom JS binding, adding density if slider was loaded
  const js = template.js(...params, cPrim, cSec, density);
  const audioScript = getAudioSynthesizerScript();

  return `<!DOCTYPE html>
<html lang="${currentLang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>3D Creative Asset — Custom Export</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet">
  <style>
    ${css.trim().replace(/\n/g, '\n    ')}
  </style>
</head>
<body>
  ${html.trim().replace(/\n/g, '\n  ')}
  <script>
    ${js.trim().replace(/\n/g, '\n    ')}
    ${audioScript.trim().replace(/\n/g, '\n    ')}
  </script>
</body>
</html>`;
}

// Update live preview in real-time
function updatePreview() {
  const code = compileOutputCode();
  els.iframe.srcdoc = code;
}

// Apply translation layout
function applyTranslations(lang) {
  currentLang = lang;
  
  // Toggle language button classes
  els.btnFr.classList.toggle('active', lang === 'fr');
  els.btnEn.classList.toggle('active', lang === 'en');

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  // Re-translate components in drop list while keeping selections intact
  const activeComp = els.selectComponent.value;
  updateComponentOptions();
  if (activeComp) {
    els.selectComponent.value = activeComp;
  }
}

// Initialize application variables & setups
function init() {
  els.btnFr.addEventListener('click', () => applyTranslations('fr'));
  els.btnEn.addEventListener('click', () => applyTranslations('en'));

  // Color Pickers logic
  els.colorPrimary.addEventListener('input', (e) => {
    els.valColorPrimary.textContent = e.target.value.toUpperCase();
    updatePreview();
  });
  els.colorSecondary.addEventListener('input', (e) => {
    els.valColorSecondary.textContent = e.target.value.toUpperCase();
    updatePreview();
  });

  // Density slider
  els.rangeDensity.addEventListener('input', (e) => {
    els.valDensity.textContent = e.target.value;
    updatePreview();
  });

  // Select dropdown triggers
  els.selectCategory.addEventListener('change', updateComponentOptions);
  els.selectComponent.addEventListener('change', handleComponentChange);
  els.chkSound.addEventListener('change', updatePreview);

  // Dynamic input triggers for all custom text fields
  const inputs = [
    els.inputText, els.inputCardName, els.inputCardRole, els.inputCardContact,
    els.inputGiftTitle, els.inputGiftCode, els.inputGiftValue, els.inputSurpriseMsg
  ];
  inputs.forEach(input => input.addEventListener('input', updatePreview));

  // Copy code action
  els.btnCopy.addEventListener('click', () => {
    if (typeof window.isUserPremium === 'function' && !window.isUserPremium()) {
      if (typeof window.showPaywallModal === 'function') {
        window.showPaywallModal();
        return;
      }
    }
    const code = compileOutputCode();
    navigator.clipboard.writeText(code).then(() => {
      alert(translations[currentLang].success_copy);
    }).catch(err => console.error(err));
  });

  // Download code action
  els.btnDownload.addEventListener('click', () => {
    if (typeof window.isUserPremium === 'function' && !window.isUserPremium()) {
      if (typeof window.showPaywallModal === 'function') {
        window.showPaywallModal();
        return;
      }
    }
    const code = compileOutputCode();
    const blob = new Blob([code], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${els.selectComponent.value}-3d-creative-export.html`);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });

  // Initial load
  updateComponentOptions();
}

document.addEventListener('DOMContentLoaded', init);
