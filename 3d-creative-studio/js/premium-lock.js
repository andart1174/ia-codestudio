/**
 * IA CODE STUDIO — Unified Premium Lock System v2.0 (3D Creative Studio)
 * Unlocks via: ?pro_unlocked=true, ia_pro_unlocked, ia_pro_active, or valid genius_session + ia_premium_users.
 * Live 3D Studio, Search, Gallery, AI Stylist, Vault & Share QR are 100% Free.
 * Pro ($10/month) unlocks Code Copy, Standalone HTML, React/Vue/WebComponent & Split Export.
 */
(function () {
  'use strict';

  try {
    var qs = new URLSearchParams(window.location.search);
    if (qs.get('pro_unlocked') === 'true') {
      localStorage.setItem('ia_pro_unlocked', 'true');
      localStorage.setItem('ia_pro_active', 'true');
    }
  } catch (e) {}

  window.isUserPremium = function () {
    try {
      if (localStorage.getItem('ia_pro_unlocked') === 'true' || localStorage.getItem('ia_pro_active') === 'true') {
        return true;
      }
      var session = localStorage.getItem('genius_session');
      if (!session) return false;

      var user = JSON.parse(session);
      var email = (user.email || '').toLowerCase();
      if (user.isPro === true || user.is_pro === true) return true;

      var premiumList = JSON.parse(localStorage.getItem('ia_premium_users') || '[]');
      var record = premiumList.find(function (p) {
        return (p.email || '').toLowerCase() === email;
      });
      if (record) {
        var now = Date.now();
        var expiry = (record.addedAt || 0) + (record.days || 0) * 86400000;
        var daysLeft = Math.ceil((expiry - now) / 86400000);
        if (record.days === 9999 || daysLeft > 0) return true;
      }
    } catch (e) {
      console.error('Error reading premium session:', e);
    }
    return false;
  };

  window.showPaywallModal = function () {
    var modal = document.getElementById('studio-paywall-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'studio-paywall-modal';
      modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);z-index:1000000;display:flex;align-items:center;justify-content:center;padding:20px;font-family:\'Outfit\',\'Inter\',system-ui,sans-serif;';

      modal.innerHTML =
        '<div style="background:linear-gradient(145deg,#0f172a,#020617);border-radius:24px;border:1px solid rgba(245,158,11,0.35);width:100%;max-width:450px;padding:34px 28px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.75),0 0 32px rgba(245,158,11,0.22);text-align:center;color:#fff;position:relative;animation:paywall-zoom 0.28s cubic-bezier(0.34,1.56,0.64,1);">' +
          '<style>' +
            '@keyframes paywall-zoom { from { transform: scale(0.92); opacity: 0; } to { transform: scale(1); opacity: 1; } }' +
            '.paywall-go-btn { background:linear-gradient(135deg,#f59e0b,#ec4899);color:#fff;border:none;padding:14px 26px;border-radius:14px;font-size:15px;font-weight:800;width:100%;cursor:pointer;box-shadow:0 8px 25px rgba(245,158,11,0.4);transition:all 0.25s;margin-top:20px;text-transform:uppercase;letter-spacing:0.5px; }' +
            '.paywall-go-btn:hover { transform:translateY(-2px);box-shadow:0 12px 30px rgba(245,158,11,0.6); }' +
            '.paywall-close-btn { background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);color:#94a3b8;padding:11px 18px;border-radius:12px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.25s;margin-top:10px;width:100%; }' +
            '.paywall-close-btn:hover { background:rgba(255,255,255,0.12);color:#fff; }' +
          '</style>' +
          '<div style="font-size:46px;margin-bottom:10px;">💎</div>' +
          '<h3 id="paywall-title" style="font-size:21px;font-weight:800;margin:0 0 10px;background:linear-gradient(90deg,#f59e0b,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent;"></h3>' +
          '<p id="paywall-desc" style="color:#94a3b8;font-size:14px;line-height:1.6;margin:0 0 12px;"></p>' +
          '<div id="paywall-perks" style="text-align:left;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:10px 14px;font-size:12px;color:#cbd5e1;line-height:1.7;"></div>' +
          '<button class="paywall-go-btn" id="paywall-go-btn"></button>' +
          '<button class="paywall-close-btn" id="paywall-close-btn"></button>' +
        '</div>';

      document.body.appendChild(modal);

      modal.addEventListener('click', function (e) {
        if (e.target === modal) modal.style.display = 'none';
      });
      document.getElementById('paywall-go-btn').onclick = function () {
        window.open('https://buy.stripe.com/bJecN61Fk3staax7mGbfO03', '_blank', 'noopener');
      };
      document.getElementById('paywall-close-btn').onclick = function () {
        modal.style.display = 'none';
      };
    }

    var lang = window.currentLang || localStorage.getItem('hub_lang') || window.lang || 'en';
    var titleEl = document.getElementById('paywall-title');
    var descEl = document.getElementById('paywall-desc');
    var perksEl = document.getElementById('paywall-perks');
    var goBtn = document.getElementById('paywall-go-btn');
    var closeBtn = document.getElementById('paywall-close-btn');

    if (lang === 'fr') {
      titleEl.textContent = '🔒 Export Pro — IA Code Studio';
      descEl.innerHTML = 'La création live, les 72 modèles 3D, le Vault et le partage QR sont <strong>100% gratuits</strong>. Passez Pro pour exporter le code prêt pour production :';
      perksEl.innerHTML = '✅ Copie illimitée HTML / CSS / JS<br>✅ Export React JSX, Vue 3 SFC & Web Component<br>✅ Téléchargement HTML autonome & Pack séparé';
      goBtn.textContent = '💎 PASSER PRO ($10/MOIS)';
      closeBtn.textContent = 'Fermer';
    } else {
      titleEl.textContent = '🔒 Pro Export — IA Code Studio';
      descEl.innerHTML = 'Live 3D creation, all 72 components, Preset Vault & QR sharing are <strong>100% free</strong>. Unlock Pro to export production-ready code:';
      perksEl.innerHTML = '✅ Unlimited Copy HTML / CSS / JS<br>✅ Export React JSX, Vue 3 SFC & Web Component<br>✅ Standalone HTML & Split Code Bundle';
      goBtn.textContent = '💎 UNLOCK PRO ($10/MONTH)';
      closeBtn.textContent = 'Close';
    }

    modal.style.display = 'flex';
  };
})();
