// Global script for IA Code Studio Free Tools Hub

let currentLang = 'fr';

// Apply translations dynamically using translations object from i18n.js
function applyTranslations(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      // Check if it's an input placeholder
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.setAttribute('placeholder', translations[lang][key]);
      } else {
        el.innerHTML = translations[lang][key];
      }
    }
  });

  // Keep switcher buttons synced
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.getElementById(`btn-lang-${lang}`);
  if (activeBtn) activeBtn.classList.add('active');
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('hub_lang', lang);
  applyTranslations(lang);
  
  // Custom event so that individual tools in iframes/pages can listen to lang changes
  const event = new CustomEvent('langChanged', { detail: { lang: lang } });
  window.dispatchEvent(event);
}

document.addEventListener('DOMContentLoaded', () => {
  // Determine starting language
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');
  let startLang = 'fr';

  if (urlLang && (urlLang === 'en' || urlLang === 'fr')) {
    startLang = urlLang;
    localStorage.setItem('hub_lang', urlLang);
  } else {
    const savedLang = localStorage.getItem('hub_lang');
    if (savedLang && (savedLang === 'en' || savedLang === 'fr')) {
      startLang = savedLang;
    }
  }

  setLanguage(startLang);

  // Set up click handlers for language switcher buttons
  const frBtn = document.getElementById('btn-lang-fr');
  const enBtn = document.getElementById('btn-lang-en');

  if (frBtn) {
    frBtn.addEventListener('click', () => setLanguage('fr'));
  }
  if (enBtn) {
    enBtn.addEventListener('click', () => setLanguage('en'));
  }

  // Interactive glow effect on cards (card-glow mouse tracking)
  const cards = document.querySelectorAll('.tool-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  });
});
