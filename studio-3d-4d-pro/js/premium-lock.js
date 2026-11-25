/**
 * IA Code Studio - Premium Freemium Paywall System v2.0 (Studio 3D/4D Pro)
 * Fixed i18n reactivity (window.currentLang), $10/month pricing, Pro 3D Export gating
 */

const STRIPE_CHECKOUT_URL = "https://buy.stripe.com/bJecN61Fk3staax7mGbfO03";
const ADMIN_HASH = "82f4e1c0"; // lightweight client-side check for studio owner session

function _quickHash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16);
}

// 1. Check user premium status
window.isUserPremium = function() {
  if (localStorage.getItem('ia_pro_unlocked') === 'true') return true;
  if (localStorage.getItem('ia_admin_mode') === 'true') return true;
  try {
    if (window.firebase && firebase.auth) {
      const user = firebase.auth().currentUser;
      if (user && user.email) {
        const em = user.email.toLowerCase().trim();
        if (_quickHash(em) === '82f4e1c0' || em === atob('YW5kYXJ0MTE3NEBnbWFpbC5jb20=')) {
          localStorage.setItem('ia_pro_unlocked', 'true');
          return true;
        }
      }
    }
  } catch (e) {}
  return false;
};

// Keep Firebase auth listener active
try {
  setTimeout(() => {
    if (window.firebase && firebase.auth) {
      firebase.auth().onAuthStateChanged(user => {
        if (user && user.email && user.email.toLowerCase().trim() === atob('YW5kYXJ0MTE3NEBnbWFpbC5jb20=')) {
          localStorage.setItem('ia_pro_unlocked', 'true');
        }
      });
    }
  }, 1500);
} catch (e) {}

// 2. Intercept Stripe Return URL (if ?pro_unlocked=true is in URL)
(function checkUrlUnlock() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('pro_unlocked') === 'true') {
      localStorage.setItem('ia_pro_unlocked', 'true');
      const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
      window.history.replaceState({ path: newUrl }, '', newUrl);
      setTimeout(() => {
        const isFr = ((window.currentLang || document.documentElement.lang || 'en').toLowerCase().startsWith('fr'));
        if (typeof window.toast === 'function') {
          window.toast(isFr ? '🎉 Accès IA Code Studio PRO activé !' : '🎉 IA Code Studio PRO unlocked!');
        }
      }, 600);
    }
  } catch (e) {}
})();

// 3. Inject & Show the Paywall Modal
window.showPaywallModal = function() {
  const existing = document.getElementById('ia-paywall-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'ia-paywall-modal';
  modal.style.cssText = `
    position: fixed; inset: 0; z-index: 999999;
    background: rgba(5, 8, 22, 0.85); backdrop-filter: blur(12px);
    display: flex; align-items: center; justify-content: center;
    padding: 20px; font-family: 'Inter', system-ui, sans-serif;
    animation: iaFadeIn 0.25s ease-out;
  `;

  if (!document.getElementById('ia-paywall-styles')) {
    const style = document.createElement('style');
    style.id = 'ia-paywall-styles';
    style.innerHTML = `
      @keyframes iaFadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      #ia-paywall-card {
        background: linear-gradient(145deg, #0f172a, #1e1b4b);
        border: 1px solid rgba(139, 92, 246, 0.4);
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(139, 92, 246, 0.25);
        border-radius: 20px; max-width: 470px; width: 100%;
        padding: 32px 28px; text-align: center; color: #f8fafc;
        position: relative; overflow: hidden;
      }
      #ia-paywall-card::before {
        content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
        background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
      }
      .ia-pw-badge {
        display: inline-block; background: rgba(139, 92, 246, 0.2);
        border: 1px solid rgba(139, 92, 246, 0.5); color: #c4b5fd;
        padding: 4px 12px; border-radius: 20px; font-size: 11px;
        font-weight: 800; letter-spacing: 1px; margin-bottom: 14px;
      }
      .ia-pw-title { font-size: 23px; font-weight: 900; margin: 0 0 10px 0; color: #ffffff; }
      .ia-pw-desc { font-size: 13.5px; color: #cbd5e1; line-height: 1.55; margin: 0 0 18px 0; }
      .ia-pw-list {
        text-align: left; background: rgba(0,0,0,0.3); border-radius: 12px;
        padding: 14px 16px; margin-bottom: 20px; font-size: 12.5px; color: #e2e8f0;
        list-style: none; display: flex; flex-direction: column; gap: 8px;
      }
      .ia-pw-list li { display: flex; align-items: center; gap: 8px; }
      .ia-pw-price { font-size: 28px; font-weight: 900; color: #38bdf8; margin-bottom: 18px; }
      .ia-pw-price span { font-size: 14px; font-weight: 500; color: #94a3b8; }
      .ia-pw-btn-buy {
        display: block; width: 100%; padding: 14px; border-radius: 12px;
        background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
        color: #ffffff; font-weight: 800; font-size: 15px; text-decoration: none;
        border: none; cursor: pointer; box-shadow: 0 10px 25px rgba(139, 92, 246, 0.4);
        transition: transform 0.2s, box-shadow 0.2s; margin-bottom: 12px;
      }
      .ia-pw-btn-buy:hover { transform: translateY(-2px); box-shadow: 0 15px 30px rgba(139, 92, 246, 0.6); }
      .ia-pw-btn-close {
        background: transparent; border: none; color: #94a3b8; font-size: 13px;
        cursor: pointer; text-decoration: underline; padding: 6px;
      }
      .ia-pw-btn-close:hover { color: #ffffff; }
    `;
    document.head.appendChild(style);
  }

  const isFr = ((window.currentLang || window.lang || document.documentElement.lang || 'en').toLowerCase().startsWith('fr'));

  modal.innerHTML = `
    <div id="ia-paywall-card">
      <div class="ia-pw-badge">👑 IA CODE STUDIO PRO</div>
      <h2 class="ia-pw-title">${isFr ? "Débloquez l'Export Pro 3D/4D" : 'Unlock Pro 3D/4D Exports'}</h2>
      <p class="ia-pw-desc">
        ${isFr
          ? 'Testez librement le studio en aperçu gratuit. Passez au forfait PRO pour télécharger vos créations 3D/4D, fichiers HTML, packs ZIP, vidéos et modèles 3D universels.'
          : 'Explore the studio freely in live preview. Upgrade to PRO to export standalone HTML, ZIP packs, WebM/PNG captures, React/ESM code, and universal 3D models.'}
      </p>
      <ul class="ia-pw-list">
        <li>✅ ${isFr ? 'Export 3D Universel (.OBJ, .STL Impression 3D, .GLB/GLTF)' : 'Universal 3D Export (.OBJ, .STL 3D Print, .GLB/GLTF)'}</li>
        <li>✅ ${isFr ? 'Export Code HTML autonome, Pack ZIP, React / ESM & WebAR' : 'Standalone HTML, ZIP Packs, React / ESM & WebAR Export'}</li>
        <li>✅ ${isFr ? 'Capture 4K PNG, Vidéo WebM Turntable 360° & GitHub Gist' : '4K PNG, 360° Turntable WebM Video & GitHub Gist'}</li>
        <li>✅ ${isFr ? 'Accès illimité à tous les studios IA Code Studio' : 'Unlimited access across all IA Code Studio apps'}</li>
      </ul>
      <div class="ia-pw-price">$10 <span>${isFr ? '/ mois (sans engagement)' : '/ month (cancel anytime)'}</span></div>
      <a href="${STRIPE_CHECKOUT_URL}" target="_blank" rel="noopener noreferrer" class="ia-pw-btn-buy">
        ⚡ ${isFr ? 'Passer PRO maintenant' : 'Upgrade to PRO Now'}
      </a>
      <button class="ia-pw-btn-close" id="ia-pw-close-btn">
        ${isFr ? 'Continuer en mode Aperçu Gratuit' : 'Continue in Free Preview Mode'}
      </button>
    </div>
  `;

  document.body.appendChild(modal);
  document.getElementById('ia-pw-close-btn').onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
};
