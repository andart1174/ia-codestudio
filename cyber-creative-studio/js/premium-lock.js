/**
 * IA ARCHITECTE STUDIO ULTRA — Premium Lock & Paywall Protection System v2.0
 * Strict gating for Copy, Export, Video recording, and Photo/Screenshot capture.
 * Direct integration with Stripe Checkout ($10/month) and IA CodeStudio SSO.
 */
(function () {
  'use strict';

  // 1. Check if the active user has valid Premium status
  window.isUserPremium = function () {
    // Check manual override / developer toggle
    if (localStorage.getItem('ia_premium') === 'true') return true;

    // Check current logged user session
    var session = localStorage.getItem('genius_session');
    if (session) {
      try {
        var user = JSON.parse(session);
        var email = (user.email || '').toLowerCase().trim();

        // Administrator permanent lifetime bypass
        if (email === 'andart1174@gmail.com') return true;

        // Check in active premium subscriber list
        var premiumList = JSON.parse(localStorage.getItem('ia_premium_users') || '[]');
        var record = premiumList.find(function (p) {
          return (p.email || '').toLowerCase().trim() === email;
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
        console.error('Error parsing genius_session:', e);
      }
    }

    // Fallback: Check legacy subscription date
    var subDate = localStorage.getItem('ia_premium_sub_date');
    if (subDate) {
      var daysPassed = Math.floor((Date.now() - parseInt(subDate, 10)) / (1000 * 60 * 60 * 24));
      if (30 - daysPassed > 0) {
        return true;
      }
    }

    return false;
  };

  // Helper to determine current active UI language (en / fr only)
  function getActiveLang() {
    var lang = 'en';
    if (window.I18N && typeof window.I18N.currentLang === 'string') lang = window.I18N.currentLang;
    else if (localStorage.getItem('creative_studio_lang')) lang = localStorage.getItem('creative_studio_lang');
    else if (localStorage.getItem('ultra_lang')) lang = localStorage.getItem('ultra_lang');
    else if (typeof window.currentLang === 'string') lang = window.currentLang;
    else if (window.lang) lang = window.lang;
    return lang.toLowerCase().startsWith('fr') ? 'fr' : 'en';
  }

  // 2. Show the high-conversion Paywall Modal
  window.showPaywallModal = function (featureName, customDesc) {
    var lang = getActiveLang();
    var isFr = lang === 'fr';

    var modal = document.getElementById('studio-paywall-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'studio-paywall-modal';
      modal.style.cssText = 'position:fixed;inset:0;background:rgba(2,6,23,0.88);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);z-index:9999999;display:flex;align-items:center;justify-content:center;padding:16px;font-family:\'Inter\',system-ui,-apple-system,sans-serif;';

      modal.innerHTML =
        '<div style="background:linear-gradient(150deg,#0f172a 0%,#030712 100%);border-radius:24px;border:1px solid rgba(245,158,11,0.35);width:100%;max-width:520px;padding:36px 30px;box-shadow:0 30px 70px -15px rgba(0,0,0,0.8),0 0 40px rgba(245,158,11,0.18);text-align:center;color:#fff;position:relative;animation:paywall-enter 0.32s cubic-bezier(0.34,1.56,0.64,1);">' +
          '<style>' +
            '@keyframes paywall-enter { from { transform: scale(0.92); opacity: 0; } to { transform: scale(1); opacity: 1; } }' +
            '.paywall-glow-badge { display:inline-flex;align-items:center;gap:6px;padding:5px 14px;border-radius:20px;background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.4);color:#fbbf24;font-size:11px;font-weight:800;letter-spacing:1px;text-transform:uppercase;margin-bottom:14px; }' +
            '.paywall-perks-box { background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:14px 18px;margin:18px 0;text-align:left;font-size:13px;line-height:1.7;color:#cbd5e1; }' +
            '.paywall-perks-box div { display:flex;align-items:center;gap:8px; }' +
            '.paywall-perks-box span.check { color:#10b981;font-weight:bold; }' +
            '.paywall-go-btn { background:linear-gradient(135deg,#f59e0b 0%,#ec4899 50%,#8b5cf6 100%);color:#fff;border:none;padding:14px 24px;border-radius:14px;font-size:15px;font-weight:800;width:100%;cursor:pointer;box-shadow:0 8px 24px rgba(245,158,11,0.35);transition:all 0.25s;text-transform:uppercase;letter-spacing:0.6px;display:flex;align-items:center;justify-content:center;gap:10px; }' +
            '.paywall-go-btn:hover { transform:translateY(-2px);box-shadow:0 14px 34px rgba(245,158,11,0.5);filter:brightness(1.08); }' +
            '.paywall-close-btn { background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#94a3b8;padding:10px 20px;border-radius:12px;font-size:13px;cursor:pointer;transition:all 0.2s;margin-top:12px;width:100%;font-weight:600; }' +
            '.paywall-close-btn:hover { background:rgba(255,255,255,0.1);color:#fff; }' +
          '</style>' +
          '<div class="paywall-glow-badge">🔒 <span id="paywall-badge-txt">PREMIUM ONLY</span></div>' +
          '<h3 id="paywall-title" style="font-size:25px;font-weight:900;margin:0 0 10px;background:linear-gradient(90deg,#fbbf24,#ec4899,#c084fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:-0.5px;">Premium Feature</h3>' +
          '<p id="paywall-desc" style="color:#94a3b8;font-size:13.5px;line-height:1.55;margin:0 0 16px;">This professional action requires an active subscription.</p>' +
          '<div class="paywall-perks-box" id="paywall-perks">' +
          '</div>' +
          '<button class="paywall-go-btn" id="paywall-go-btn">💎 Upgrade to Premium ($10/mo)</button>' +
          '<button class="paywall-close-btn" id="paywall-close-btn">Close</button>' +
        '</div>';

      document.body.appendChild(modal);

      var btnPay = document.getElementById('paywall-go-btn');
      if (btnPay) {
        btnPay.onclick = function () {
          window.open('https://buy.stripe.com/bJecN61Fk3staax7mGbfO03', '_blank');
        };
      }

      var btnClose = document.getElementById('paywall-close-btn');
      if (btnClose) {
        btnClose.onclick = function () {
          modal.style.display = 'none';
        };
      }
    }

    var badgeEl = document.getElementById('paywall-badge-txt');
    var titleEl = document.getElementById('paywall-title');
    var descEl = document.getElementById('paywall-desc');
    var perksEl = document.getElementById('paywall-perks');
    var goBtn = document.getElementById('paywall-go-btn');
    var closeBtn = document.getElementById('paywall-close-btn');

    if (isFr) {
      if (badgeEl) badgeEl.textContent = 'ACCÈS PREMIUM REQUIS';
      if (titleEl) titleEl.textContent = featureName ? '🔒 ' + featureName : '🔒 Fonctionnalité Premium';
      if (descEl) descEl.textContent = customDesc || 'L\'exportation de vidéos 60 FPS, de morceaux WAV, les captures 4K et la copie du code sont réservés aux membres Premium de IA Code Studio.';
      if (perksEl) perksEl.innerHTML =
        '<div><span class="check">✓</span> Enregistrements vidéo HD 60 FPS avec voix robot IA (MP4 / WebM)</div>' +
        '<div><span class="check">✓</span> Export audio haute fidélité WAV de morceaux complets</div>' +
        '<div><span class="check">✓</span> Captures photo 4K Ultra-HD & instantanés de scènes</div>' +
        '<div><span class="check">✓</span> Exportation de fichiers 3D .HTML autonomes & Widgets Embed</div>' +
        '<div><span class="check">✓</span> Copie illimitée du code source sans aucune restriction</div>';
      if (goBtn) goBtn.innerHTML = '💎 Devenir Premium (10$/mois)';
      if (closeBtn) closeBtn.textContent = 'Fermer';
    } else {
      if (badgeEl) badgeEl.textContent = 'PREMIUM ACCESS REQUIRED';
      if (titleEl) titleEl.textContent = featureName ? '🔒 ' + featureName : '🔒 Premium Feature';
      if (descEl) descEl.textContent = customDesc || 'Exporting 60 FPS videos, WAV songs, 4K snapshots, and copying code are reserved for Premium members of IA Code Studio.';
      if (perksEl) perksEl.innerHTML =
        '<div><span class="check">✓</span> 60 FPS HD Video Screen Recordings with AI Robot Voice (MP4 / WebM)</div>' +
        '<div><span class="check">✓</span> High-Fidelity WAV Full Song Audio Exports</div>' +
        '<div><span class="check">✓</span> 4K Ultra-HD Photo Snapshots & Scene Renders</div>' +
        '<div><span class="check">✓</span> Standalone 3D .HTML file downloads & Embed Widgets</div>' +
        '<div><span class="check">✓</span> Unlimited source code copying without restrictions</div>';
      if (goBtn) goBtn.innerHTML = '💎 Upgrade to Premium ($10/month)';
      if (closeBtn) closeBtn.textContent = 'Close';
    }

    modal.style.display = 'flex';
  };

  // 3. Central guard function: gates any action function behind Premium status
  window.guardPremium = function (actionFn, featureName, customDesc) {
    if (window.isUserPremium()) {
      if (typeof actionFn === 'function') {
        return actionFn();
      }
      return true;
    }
    window.showPaywallModal(featureName, customDesc);
    return false;
  };

  // 4. Secure clipboard write helper
  window.secureCopyText = function (text, featureName) {
    return window.guardPremium(function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text);
      }
      return Promise.resolve();
    }, featureName || (getActiveLang() === 'fr' ? 'Copie du Code' : 'Copy Code'));
  };

  // 5. Intercept browser Ctrl+C and context copy on code editor & preview for non-premium users
  if (typeof document !== 'undefined') {
    document.addEventListener('copy', function (e) {
      if (!window.isUserPremium()) {
        var target = e.target;
        var isEditor = target && (
          target.closest('.code-panel') ||
          target.closest('#editor') ||
          target.closest('.CodeMirror') ||
          target.closest('#preview-frame') ||
          target.closest('.file-tabs') ||
          target.closest('pre') ||
          target.closest('code')
        );
        if (isEditor) {
          e.preventDefault();
          if (e.clipboardData) {
            e.clipboardData.clearData();
          }
          window.showPaywallModal(
            getActiveLang() === 'fr' ? 'Copie du Code Source' : 'Source Code Copy',
            getActiveLang() === 'fr' ? 'La copie du code source est réservée aux membres Premium.' : 'Copying source code is reserved for Premium subscribers.'
          );
        }
      }
    }, true);
  }

})();
