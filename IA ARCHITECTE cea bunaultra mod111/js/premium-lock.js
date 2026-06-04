/**
 * IA ARCHITECTE STUDIO — Premium Lock System v1.0
 */
(function () {
  'use strict';

  // Check if a user has premium access
  window.isUserPremium = function () {
    // 1. Get current logged user
    var session = localStorage.getItem('genius_session');
    if (!session) return false;

    try {
      var user = JSON.parse(session);
      var email = user.email.toLowerCase();

      // Admin bypass
      if (email === 'andart1174@gmail.com') return true;

      // 2. Check in premium list
      var premiumList = JSON.parse(localStorage.getItem('ia_premium_users') || '[]');
      var record = premiumList.find(function (p) {
        return p.email.toLowerCase() === email;
      });

      if (record) {
        var now = Date.now();
        var expiry = (record.addedAt || 0) + (record.days || 0) * 86400000;
        var daysLeft = Math.ceil((expiry - now) / 86400000);
        var isUnlimited = record.days === 9999;

        if (isUnlimited || daysLeft > 0) {
          return true;
        }
      }
    } catch (e) {
      console.error("Error reading premium session:", e);
    }

    // 3. Fallback to legacy key
    var subDate = localStorage.getItem('ia_premium_sub_date');
    if (subDate) {
      var daysPassed = Math.floor((Date.now() - parseInt(subDate, 10)) / (1000 * 60 * 60 * 24));
      var left = 30 - daysPassed;
      if (left > 0) {
        return true;
      }
    }

    return false;
  };

  // Show a premium paywall modal
  window.showPaywallModal = function () {
    var modal = document.getElementById('studio-paywall-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'studio-paywall-modal';
      modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);backdrop-filter:blur(10px);z-index:1000000;display:flex;align-items:center;justify-content:center;padding:20px;font-family:\'Inter\',system-ui,-apple-system,sans-serif;';
      
      modal.innerHTML = 
        '<div style="background:linear-gradient(145deg,#0f172a,#020617);border-radius:20px;border:1px solid rgba(245,158,11,0.3);width:100%;max-width:450px;padding:35px 30px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.5),0 0 30px rgba(245,158,11,0.15);text-align:center;color:#fff;position:relative;animation:paywall-zoom 0.3s cubic-bezier(0.34,1.56,0.64,1);">' +
          '<style>' +
            '@keyframes paywall-zoom { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }' +
            '.paywall-go-btn { background:linear-gradient(135deg,#f59e0b,#d946ef);color:#fff;border:none;padding:14px 28px;border-radius:12px;font-size:16px;font-weight:800;width:100%;cursor:pointer;box-shadow:0 8px 20px rgba(245,158,11,0.3);transition:all 0.3s;margin-top:20px;text-transform:uppercase;letter-spacing:0.5px; }' +
            '.paywall-go-btn:hover { transform:translateY(-2px);box-shadow:0 12px 28px rgba(245,158,11,0.5); }' +
            '.paywall-close-btn { background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#94a3b8;padding:10px 20px;border-radius:10px;font-size:14px;cursor:pointer;transition:all 0.3s;margin-top:10px;width:100%; }' +
            '.paywall-close-btn:hover { background:rgba(255,255,255,0.1);color:#fff; }' +
          '</style>' +
          '<div style="font-size:50px;margin-bottom:15px;">💎</div>' +
          '<h3 id="paywall-title" style="font-size:24px;font-weight:800;margin:0 0 12px;background:linear-gradient(90deg,#f59e0b,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">🔒 Premium Feature</h3>' +
          '<p id="paywall-desc" style="color:#94a3b8;font-size:14px;line-height:1.6;margin:0 0 20px;">Copying, exporting code, and cloud deployment are reserved for premium members.</p>' +
          '<button class="paywall-go-btn" id="paywall-go-btn">Go Premium</button>' +
          '<button class="paywall-close-btn" id="paywall-close-btn">Close</button>' +
        '</div>';

      document.body.appendChild(modal);

      document.getElementById('paywall-go-btn').onclick = function () {
        window.open('https://buy.stripe.com/bJecN6bfUfbbaax36qbfO02', '_blank');
      };

      document.getElementById('paywall-close-btn').onclick = function () {
        modal.style.display = 'none';
      };
    }

    var lang = window.lang || 'fr';
    var titleEl = document.getElementById('paywall-title');
    var descEl = document.getElementById('paywall-desc');
    var goBtn = document.getElementById('paywall-go-btn');
    var closeBtn = document.getElementById('paywall-close-btn');

    if (lang === 'fr') {
      titleEl.textContent = '🔒 Fonctionnalité Premium';
      descEl.innerHTML = 'La copie, l\'exportation de code et le déploiement cloud sont réservés aux membres premium de <strong>IA Code Studio</strong>.';
      goBtn.textContent = '💎 Devenir Premium ($30/mois)';
      closeBtn.textContent = 'Fermer';
    } else {
      titleEl.textContent = '🔒 Premium Feature';
      descEl.innerHTML = 'Copying, exporting code, and cloud deployment are reserved for premium members of <strong>IA Code Studio</strong>.';
      goBtn.textContent = '💎 Go Premium ($30/month)';
      closeBtn.textContent = 'Close';
    }

    modal.style.display = 'flex';
  };
})();
