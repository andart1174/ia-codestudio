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

  // Handle Watermark Locking logic globally
  const wmCheckbox = document.getElementById('chk-watermark');
  if (wmCheckbox) {
    if (!checkIsPremium()) {
      wmCheckbox.checked = true;
      wmCheckbox.disabled = true;
      wmCheckbox.style.cursor = 'not-allowed';
      
      const label = wmCheckbox.closest('label');
      if (label) {
        label.style.cursor = 'pointer';
        const badgeHTML = ' <span style="color:#ecc94b; font-weight:bold; margin-left:6px;">🔒 PRO</span>';
        const badgeSpan = label.querySelector('[data-i18n]');
        if (badgeSpan && !badgeSpan.innerHTML.includes('PRO')) {
          badgeSpan.innerHTML = badgeSpan.innerHTML + badgeHTML;
        } else if (!label.innerHTML.includes('PRO')) {
          label.innerHTML = label.innerHTML + badgeHTML;
        }
        
        label.addEventListener('click', (e) => {
          if (e.target !== wmCheckbox) {
            e.preventDefault();
          } else {
            e.preventDefault();
          }
          const activeLang = localStorage.getItem('hub_lang') || 'fr';
          const msg = activeLang === 'fr' 
            ? "Le retrait du filigrane est réservé aux membres Premium. Vous allez être redirigé vers la page de mise à niveau." 
            : "Watermark removal is a Premium feature. You will be redirected to the upgrade page.";
          alert(msg);
          window.open('https://buy.stripe.com/bJecN61Fk3staax7mGbfO03', '_blank');
        });
      }
    } else {
      wmCheckbox.checked = false; // default to unchecked for PRO members
    }
  }
});

// Global checkIsPremium function
function checkIsPremium() {
  try {
    const session = localStorage.getItem('genius_session');
    if (session) {
      const user = JSON.parse(session);
      const email = user.email.toLowerCase();
      const premiumList = JSON.parse(localStorage.getItem('ia_premium_users') || '[]');
      const record = premiumList.find(p => p.email.toLowerCase() === email);
      if (record) {
        const now = Date.now();
        const expiry = (record.addedAt || 0) + (record.days || 0) * 86400000;
        const daysLeft = Math.ceil((expiry - now) / 86400000);
        const isUnlimited = record.days === 9999;
        if (isUnlimited || daysLeft > 0) return true;
      }
    }
  } catch (e) {
    console.error(e);
  }
  try {
    const subDate = localStorage.getItem('ia_premium_sub_date');
    if (subDate) {
      const daysPassed = Math.floor((Date.now() - parseInt(subDate)) / (1000 * 60 * 60 * 24));
      const left = 30 - daysPassed;
      if (left > 0) return true;
    }
  } catch (e) {
    console.error(e);
  }
  return false;
}
