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
    injectPremiumModal();
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
          const modal = document.getElementById('free-tools-premium-modal');
          if (modal) modal.style.display = 'flex';
        });
      }
    } else {
      wmCheckbox.checked = false; // default to unchecked for PRO members
    }
  }
});

const modalTranslations = {
  fr: {
    title: "Désactiver le branding ?",
    desc: "Passez à la version Premium de IA Code Studio pour exporter des codes 100% white-label sans filigrane.",
    cta: "Passer au Premium ⚡",
    cancel: "Garder le filigrane (Gratuit)"
  },
  en: {
    title: "Remove Branding?",
    desc: "Upgrade to IA Code Studio Premium to export 100% white-label widgets without watermark.",
    cta: "Go Premium ⚡",
    cancel: "Keep watermark (Free)"
  }
};

function injectPremiumModal() {
  if (document.getElementById('free-tools-premium-modal')) return;

  const activeLang = localStorage.getItem('hub_lang') || 'fr';
  const t = modalTranslations[activeLang] || modalTranslations.fr;

  const modalHtml = `
    <div id="free-tools-premium-modal" style="display:none; position:fixed; inset:0; background:rgba(3,7,18,0.9); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); z-index:999999; align-items:center; justify-content:center; padding: 20px;">
      <div style="background:rgba(15,23,42,0.85); border:1px solid rgba(255,255,255,0.08); border-radius:24px; padding:2.5rem 2rem; max-width:440px; width:100%; text-align:center; box-shadow:0 25px 50px -12px rgba(0,0,0,0.5); font-family:'Outfit', sans-serif; backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px); position:relative;">
        <div style="font-size:3.5rem; margin-bottom:1.2rem; filter:drop-shadow(0 0 15px rgba(6,182,212,0.4));">💎</div>
        <h3 style="color:#fff; font-size:1.6rem; margin-bottom:0.75rem; font-weight:700; font-family:'Space Grotesk', sans-serif;">${t.title}</h3>
        <p style="color:#94a3b8; font-size:0.95rem; line-height:1.6; margin-bottom:2rem; font-family:'Outfit', sans-serif;">${t.desc}</p>
        <div style="display:flex; flex-direction:column; gap:12px;">
          <a href="https://buy.stripe.com/bJecN61Fk3staax7mGbfO03" target="_blank" style="text-decoration:none; padding: 0.9rem 1.5rem; border-radius: 12px; font-weight: 700; width:100%; display:inline-block; background:linear-gradient(135deg, #00f0ff, #3b82f6); color:#fff; border:none; cursor:pointer; font-family:'Outfit', sans-serif; box-sizing:border-box; text-align:center; transition: all 0.3s ease;">${t.cta}</a>
          <button id="free-tools-modal-close" style="padding: 0.9rem 1.5rem; border-radius: 12px; font-weight: 600; width:100%; cursor:pointer; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; font-family:'Outfit', sans-serif; box-sizing:border-box; transition: all 0.3s ease;">${t.cancel}</button>
        </div>
      </div>
    </div>
  `;

  const div = document.createElement('div');
  div.innerHTML = modalHtml;
  document.body.appendChild(div.firstElementChild);

  document.getElementById('free-tools-modal-close').addEventListener('click', () => {
    document.getElementById('free-tools-premium-modal').style.display = 'none';
  });
}


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
