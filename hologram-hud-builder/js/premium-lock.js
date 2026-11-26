/**
 * IA CODE STUDIO — Unified Premium Lock System v2.0 (Quantum 3D HUD Builder)
 * Synced across the entire site via ia_pro_unlocked + ?pro_unlocked=true ($10/month)
 */
(function () {
  'use strict';

  // Auto-unlock Stripe return (?pro_unlocked=true) and clean URL
  (function checkStripeProReturn() {
    try {
      var params = new URLSearchParams(window.location.search);
      if (params.get('pro_unlocked') === 'true') {
        localStorage.setItem('ia_pro_unlocked', 'true');
        localStorage.setItem('ia_pro_active', 'true');
        if (window.history && window.history.replaceState) {
          params.delete('pro_unlocked');
          var qs = params.toString();
          var cleanUrl = window.location.pathname + (qs ? '?' + qs : '') + window.location.hash;
          window.history.replaceState(null, '', cleanUrl);
        }
      }
    } catch (e) {}
  })();

  // Check if a user has premium access
  window.isUserPremium = function () {
    try {
      if (localStorage.getItem('ia_pro_unlocked') === 'true' || localStorage.getItem('ia_pro_active') === 'true') {
        return true;
      }

      var session = localStorage.getItem('genius_session');
      if (session) {
        var user = JSON.parse(session);
        if (user && (user.isAdmin === true || user.role === 'admin' || user.isPro === true)) {
          return true;
        }
        var email = (user && user.email ? user.email : '').toLowerCase().trim();
        var premiumList = JSON.parse(localStorage.getItem('ia_premium_users') || '[]');
        var record = premiumList.find(function (p) {
          return (p.email || '').toLowerCase().trim() === email;
        });

        if (record) {
          var now = Date.now();
          var expiry = (record.addedAt || 0) + (record.days || 0) * 86400000;
          var daysLeft = Math.ceil((expiry - now) / 86400000);
          var isUnlimited = record.days === 9999;
          if (isUnlimited || daysLeft > 0) return true;
        }
      }
    } catch (e) {
      console.warn('[Quantum HUD] Error reading premium session:', e);
    }
    return false;
  };

  // Show unified premium paywall modal ($10/month)
  window.showPaywallModal = function () {
    var modal = document.getElementById('studio-paywall-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'studio-paywall-modal';
      modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);z-index:1000000;display:flex;align-items:center;justify-content:center;padding:20px;font-family:\'Outfit\',\'Orbitron\',system-ui,sans-serif;';

      modal.innerHTML =
        '<div style="background:linear-gradient(145deg,#0f172a,#020617);border-radius:24px;border:1px solid rgba(245,158,11,0.35);width:100%;max-width:450px;padding:34px 28px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.75),0 0 32px rgba(245,158,11,0.2);text-align:center;color:#fff;position:relative;animation:paywall-zoom 0.28s cubic-bezier(0.34,1.56,0.64,1);">' +
          '<style>' +
            '@keyframes paywall-zoom { from { transform: scale(0.92); opacity: 0; } to { transform: scale(1); opacity: 1; } }' +
            '.paywall-go-btn { background:linear-gradient(135deg,#f59e0b,#d946ef);color:#fff;border:none;padding:14px 24px;border-radius:14px;font-size:15px;font-weight:800;width:100%;cursor:pointer;box-shadow:0 8px 25px rgba(245,158,11,0.4);transition:all 0.25s;margin-top:18px;text-transform:uppercase;letter-spacing:0.5px; }' +
            '.paywall-go-btn:hover { transform:translateY(-2px);box-shadow:0 12px 30px rgba(245,158,11,0.6); }' +
            '.paywall-close-btn { background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#94a3b8;padding:11px 20px;border-radius:12px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s;margin-top:10px;width:100%; }' +
            '.paywall-close-btn:hover { background:rgba(255,255,255,0.12);color:#fff; }' +
          '</style>' +
          '<div style="font-size:46px;margin-bottom:10px;">💎</div>' +
          '<h3 id="paywall-title" style="font-size:22px;font-weight:800;margin:0 0 12px;background:linear-gradient(90deg,#f59e0b,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">🔒 Premium Feature</h3>' +
          '<p id="paywall-desc" style="color:#94a3b8;font-size:14px;line-height:1.6;margin:0 0 18px;"></p>' +
          '<button class="paywall-go-btn" id="paywall-go-btn">💎 BECOME PREMIUM ($10/MONTH)</button>' +
          '<button class="paywall-close-btn" id="paywall-close-btn">Close</button>' +
        '</div>';

      document.body.appendChild(modal);

      document.getElementById('paywall-go-btn').onclick = function () {
        window.open('https://buy.stripe.com/bJecN61Fk3staax7mGbfO03', '_blank');
      };
      document.getElementById('paywall-close-btn').onclick = function () {
        modal.style.display = 'none';
      };
      modal.onclick = function (e) {
        if (e.target === modal) modal.style.display = 'none';
      };
    }

    var lang = window.currentLang || localStorage.getItem('hub_lang') || 'en';
    var titleEl = document.getElementById('paywall-title');
    var descEl = document.getElementById('paywall-desc');
    var goBtn = document.getElementById('paywall-go-btn');
    var closeBtn = document.getElementById('paywall-close-btn');

    if (lang === 'fr') {
      titleEl.textContent = '🔒 Fonctionnalité Premium';
      descEl.innerHTML = 'Les exportations (HTML, GLB/OBJ/STL, Blueprint SVG, PNG 4K, OBS/React/Vue, CSS et Studio Vidéo 9:16) sont incluses dans le plan Pro de <strong>IA Code Studio</strong>.';
      goBtn.textContent = '💎 DEVENIR PREMIUM ($10/MOIS)';
      closeBtn.textContent = 'Fermer';
    } else {
      titleEl.textContent = '🔒 Premium Feature';
      descEl.innerHTML = 'Production exports (Standalone HTML, GLB/OBJ/STL, Blueprint SVG, 4K Transparent PNG, OBS/React/Vue, CSS Copy &amp; 9:16 Video Studio) are unlocked with <strong>IA Code Studio Pro</strong>.';
      goBtn.textContent = '💎 BECOME PREMIUM ($10/MONTH)';
      closeBtn.textContent = 'Close';
    }

    modal.style.display = 'flex';
  };
})();
