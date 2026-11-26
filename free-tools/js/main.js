// Global script for IA Code Studio Free Tools Hub v2.0

let currentLang = 'fr';
const HUB_FAVS_KEY = 'free_tools_favs_v1';

const modalTranslations = {
  fr: {
    title: "Désactiver le branding ?",
    desc: "Passez à la version Premium de IA Code Studio pour exporter des widgets 100% white-label sans badge d'attribution.",
    cta: "Passer au Premium ⚡",
    cancel: "Garder le badge (Gratuit)"
  },
  en: {
    title: "Remove Branding?",
    desc: "Upgrade to IA Code Studio Premium to export 100% white-label widgets without the attribution badge.",
    cta: "Go Premium ⚡",
    cancel: "Keep badge (Free)"
  }
};

function checkIsPremium() {
  if (window.HubUtils && typeof window.HubUtils.checkIsPremium === 'function') {
    return window.HubUtils.checkIsPremium();
  }
  try {
    if (localStorage.getItem('ia_pro_unlocked') === 'true' || localStorage.getItem('ia_pro_active') === 'true') return true;
  } catch (e) {}
  return false;
}
window.checkIsPremium = checkIsPremium;

function applyTranslations(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.setAttribute('placeholder', translations[lang][key]);
      } else {
        el.textContent = translations[lang][key];
      }
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      el.setAttribute('placeholder', translations[lang][key]);
    }
  });

  // Translate bilingual FAQ blocks if present
  document.querySelectorAll('[data-fr][data-en]').forEach(el => {
    el.textContent = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-fr');
  });

  // Keep switcher buttons synced
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`btn-lang-${lang}`);
  if (activeBtn) activeBtn.classList.add('active');

  // Re-sync Pro badge & Premium Modal language
  syncWatermarkProLock();
  updatePremiumModalLanguage(lang);
}

function setLanguage(lang) {
  currentLang = (lang === 'en') ? 'en' : 'fr';
  try { localStorage.setItem('hub_lang', currentLang); } catch (e) {}
  applyTranslations(currentLang);
  window.dispatchEvent(new CustomEvent('langChanged', { detail: { lang: currentLang } }));
}

function updatePremiumModalLanguage(lang) {
  const modal = document.getElementById('free-tools-premium-modal');
  if (!modal) return;
  const t = modalTranslations[lang] || modalTranslations.fr;
  const titleEl = modal.querySelector('#ft-modal-title');
  const descEl = modal.querySelector('#ft-modal-desc');
  const ctaEl = modal.querySelector('#ft-modal-cta');
  const cancelEl = modal.querySelector('#free-tools-modal-close');
  if (titleEl) titleEl.textContent = t.title;
  if (descEl) descEl.textContent = t.desc;
  if (ctaEl) ctaEl.textContent = t.cta;
  if (cancelEl) cancelEl.textContent = t.cancel;
}

function injectPremiumModal() {
  if (document.getElementById('free-tools-premium-modal')) return;
  const t = modalTranslations[currentLang] || modalTranslations.fr;

  const modalHtml = `
    <div id="free-tools-premium-modal" style="display:none; position:fixed; inset:0; background:rgba(3,7,18,0.88); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); z-index:999999; align-items:center; justify-content:center; padding: 20px;">
      <div style="background:rgba(15,23,42,0.92); border:1px solid rgba(255,255,255,0.1); border-radius:24px; padding:2.5rem 2rem; max-width:440px; width:100%; text-align:center; box-shadow:0 25px 50px -12px rgba(0,0,0,0.6); font-family:'Outfit', sans-serif; position:relative;">
        <div style="font-size:3.2rem; margin-bottom:1rem; filter:drop-shadow(0 0 15px rgba(6,182,212,0.4));">💎</div>
        <h3 id="ft-modal-title" style="color:#fff; font-size:1.5rem; margin-bottom:0.75rem; font-weight:700; font-family:'Space Grotesk', sans-serif;">${t.title}</h3>
        <p id="ft-modal-desc" style="color:#94a3b8; font-size:0.95rem; line-height:1.6; margin-bottom:1.8rem;">${t.desc}</p>
        <div style="display:flex; flex-direction:column; gap:12px;">
          <a id="ft-modal-cta" href="https://buy.stripe.com/bJecN61Fk3staax7mGbfO03" target="_blank" rel="noopener noreferrer" style="text-decoration:none; padding: 0.9rem 1.5rem; border-radius: 12px; font-weight: 700; width:100%; display:inline-block; background:linear-gradient(135deg, #00f0ff, #3b82f6); color:#020617; border:none; cursor:pointer; box-sizing:border-box; text-align:center;">${t.cta}</a>
          <button id="free-tools-modal-close" type="button" style="padding: 0.9rem 1.5rem; border-radius: 12px; font-weight: 600; width:100%; cursor:pointer; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); color:#fff; box-sizing:border-box;">${t.cancel}</button>
        </div>
      </div>
    </div>
  `;

  const div = document.createElement('div');
  div.innerHTML = modalHtml;
  const overlay = div.firstElementChild;
  document.body.appendChild(overlay);

  const close = () => { overlay.style.display = 'none'; };
  document.getElementById('free-tools-modal-close').addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.style.display === 'flex') close(); });
}

function syncWatermarkProLock() {
  const wmCheckbox = document.getElementById('chk-watermark');
  if (!wmCheckbox) return;
  injectPremiumModal();

  const label = wmCheckbox.closest('label');
  const isPro = checkIsPremium();

  if (!isPro) {
    wmCheckbox.checked = true;
    wmCheckbox.disabled = true;
    wmCheckbox.style.cursor = 'not-allowed';
    if (label) {
      label.style.cursor = 'pointer';
      let proBadge = label.querySelector('.hub-pro-lock-badge');
      if (!proBadge) {
        proBadge = document.createElement('span');
        proBadge.className = 'hub-pro-lock-badge';
        proBadge.style.cssText = 'color:#fbbf24;font-weight:700;margin-left:6px;font-size:0.8em;';
        proBadge.textContent = '🔒 PRO';
        label.appendChild(proBadge);
      }
      if (!label._proClickBound) {
        label._proClickBound = true;
        label.addEventListener('click', (e) => {
          if (!checkIsPremium()) {
            e.preventDefault();
            const modal = document.getElementById('free-tools-premium-modal');
            if (modal) modal.style.display = 'flex';
          }
        });
      }
    }
  } else {
    wmCheckbox.disabled = false;
    wmCheckbox.style.cursor = 'pointer';
    if (!wmCheckbox._proInitDone) {
      wmCheckbox.checked = false;
      wmCheckbox._proInitDone = true;
    }
    if (label) {
      const proBadge = label.querySelector('.hub-pro-lock-badge');
      if (proBadge) proBadge.remove();
    }
  }
}

function initHubSearchAndFilters() {
  const grid = document.getElementById('hub-tools-grid');
  if (!grid) return;

  const searchInput = document.getElementById('hub-search-input');
  const pills = document.querySelectorAll('.hub-cat-pill');
  const countEl = document.getElementById('hub-count-badge');
  let activeCat = 'all';
  let query = '';

  const getFavs = () => {
    try { return JSON.parse(localStorage.getItem(HUB_FAVS_KEY) || '[]'); } catch (e) { return []; }
  };
  const saveFavs = (arr) => {
    try { localStorage.setItem(HUB_FAVS_KEY, JSON.stringify(arr)); } catch (e) {}
  };

  function syncFavIcons() {
    const favs = getFavs();
    grid.querySelectorAll('.hub-fav-btn').forEach(btn => {
      const id = btn.getAttribute('data-fav');
      const active = favs.includes(id);
      btn.textContent = active ? '★' : '☆';
      btn.classList.toggle('is-fav', active);
    });
  }

  function applyFilter() {
    const favs = getFavs();
    const cards = grid.querySelectorAll('.tool-card');
    const q = query.trim().toLowerCase();
    let visible = 0;

    cards.forEach(card => {
      const id = card.getAttribute('data-tool') || '';
      const cat = card.getAttribute('data-cat') || '';
      const text = (card.textContent || '').toLowerCase() + ' ' + id;
      const matchQ = !q || text.includes(q);
      const matchCat = activeCat === 'all' ? true : activeCat === 'favorites' ? favs.includes(id) : cat === activeCat;
      const show = matchQ && matchCat;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    if (countEl) countEl.textContent = `${visible} / ${cards.length}`;
  }

  grid.addEventListener('click', (e) => {
    const favBtn = e.target.closest('.hub-fav-btn');
    if (!favBtn) return;
    e.preventDefault();
    e.stopPropagation();
    const id = favBtn.getAttribute('data-fav');
    const favs = getFavs();
    const idx = favs.indexOf(id);
    if (idx === -1) {
      favs.push(id);
      if (window.HubUtils) window.HubUtils.showToast(currentLang === 'en' ? '⭐ Added to favorites' : '⭐ Ajouté aux favoris', 'success');
    } else {
      favs.splice(idx, 1);
    }
    saveFavs(favs);
    syncFavIcons();
    if (activeCat === 'favorites') applyFilter();
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      query = e.target.value || '';
      applyFilter();
    });
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
      }
    });
  }

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCat = pill.getAttribute('data-cat') || 'all';
      applyFilter();
    });
  });

  syncFavIcons();
  applyFilter();
}

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');
  let startLang = 'fr';

  if (urlLang === 'en' || urlLang === 'fr') {
    startLang = urlLang;
    try { localStorage.setItem('hub_lang', urlLang); } catch (e) {}
  } else {
    const savedLang = localStorage.getItem('hub_lang');
    if (savedLang === 'en' || savedLang === 'fr') startLang = savedLang;
  }

  setLanguage(startLang);

  const frBtn = document.getElementById('btn-lang-fr');
  const enBtn = document.getElementById('btn-lang-en');
  if (frBtn) frBtn.addEventListener('click', () => setLanguage('fr'));
  if (enBtn) enBtn.addEventListener('click', () => setLanguage('en'));

  // Card hover radial glow
  document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--y', `${e.clientY - rect.top}px`);
    });
  });

  initHubSearchAndFilters();
  syncWatermarkProLock();
});
