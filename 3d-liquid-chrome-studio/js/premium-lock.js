/**
 * IA CODE STUDIO — 3D Liquid Chrome Studio Premium Lock System
 * Protects 3D code copying, HTML widget exporting, GLB/3MF exports, and snapshots.
 * Strictly Bilingual: French (FR) & English (EN) only.
 */
(function () {
  'use strict';

  // Check if current user has an active premium subscription
  window.isUserPremium = function () {
    try {
      var session = localStorage.getItem('genius_session');
      if (!session) return false;

      var user = JSON.parse(session);
      var email = ((user && user.email) || '').toLowerCase().trim();

      // Admin bypass (Developer & Site Owner)
      if (email === 'andart1174@gmail.com') {
        return true;
      }

      // Check premium users registry in localStorage
      var premiumList = JSON.parse(localStorage.getItem('ia_premium_users') || '[]');
      var record = premiumList.find(function (p) {
        return ((p && p.email) || '').toLowerCase().trim() === email;
      });

      if (record) {
        var now = Date.now();
        var expiry = (record.addedAt || 0) + (record.days || 0) * 86400000;
        var daysLeft = Math.ceil((expiry - now) / 86400000);
        var isUnlimited = record.days === 9999 || record.unlimited === true;

        if (isUnlimited || daysLeft > 0) {
          return true;
        }
      }

      // Secondary plan flag fallback
      if (localStorage.getItem('user_plan') === 'premium' || localStorage.getItem('ia_pro_status') === 'active') {
        return true;
      }
    } catch (e) {
      console.warn('Error reading premium subscription state:', e);
    }

    return false;
  };

  // Luxury Modal Paywall matching IA Code Studio UI
  window.showPaywallModal = function (featureName) {
    var modal = document.getElementById('studio-paywall-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'studio-paywall-modal';
      modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);z-index:9999999;display:flex;align-items:center;justify-content:center;padding:20px;font-family:\'Outfit\',\'Inter\',system-ui,sans-serif;';

      modal.innerHTML = 
        '<div style="background:linear-gradient(145deg,#0f172a,#020617);border-radius:24px;border:1px solid rgba(245,158,11,0.35);width:100%;max-width:460px;padding:36px 32px;box-shadow:0 25px 60px -12px rgba(0,0,0,0.8),0 0 35px rgba(245,158,11,0.25);text-align:center;color:#fff;position:relative;animation:paywall-zoom 0.3s cubic-bezier(0.34,1.56,0.64,1);">' +
          '<style>' +
            '@keyframes paywall-zoom { from { transform: scale(0.92); opacity: 0; } to { transform: scale(1); opacity: 1; } }' +
            '.paywall-go-btn { background:linear-gradient(135deg,#f59e0b,#ec4899);color:#fff;border:none;padding:14px 28px;border-radius:14px;font-size:15px;font-weight:800;width:100%;cursor:pointer;box-shadow:0 8px 25px rgba(245,158,11,0.45);transition:all 0.3s;margin-top:22px;text-transform:uppercase;letter-spacing:0.5px;display:flex;align-items:center;justify-content:center;gap:8px;text-decoration:none;box-sizing:border-box; }' +
            '.paywall-go-btn:hover { transform:translateY(-2px);box-shadow:0 12px 30px rgba(245,158,11,0.65); }' +
            '.paywall-close-btn { background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#94a3b8;padding:12px 20px;border-radius:12px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.3s;margin-top:10px;width:100%; }' +
            '.paywall-close-btn:hover { background:rgba(255,255,255,0.12);color:#fff; }' +
            '.paywall-feature-tag { display:inline-block;padding:4px 12px;background:rgba(245,158,11,0.15);border:1px solid rgba(245,158,11,0.4);border-radius:20px;font-size:11px;font-weight:800;color:#f59e0b;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:12px; }' +
          '</style>' +
          '<div style="font-size:52px;margin-bottom:8px;filter:drop-shadow(0 0 15px rgba(245,158,11,0.5));">👑</div>' +
          '<div id="paywall-feature-tag" class="paywall-feature-tag">PRO ACCESS</div>' +
          '<h3 id="paywall-title" style="font-size:22px;font-weight:900;margin:0 0 12px;background:linear-gradient(90deg,#f59e0b,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:0.3px;">Fonctionnalité Premium</h3>' +
          '<p id="paywall-desc" style="color:#94a3b8;font-size:14px;line-height:1.6;margin:0 0 18px;">La copie de code Three.js, l\'exportation de widgets HTML 1:1, les modèles 3MF multi-couleurs, les fichiers 3D GLB et les captures HD 4K sont réservés aux membres premium de <strong>IA Code Studio</strong>.</p>' +
          '<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:12px 14px;font-size:12px;color:#cbd5e1;text-align:left;line-height:1.6;margin-bottom:16px;">' +
            '✨ <strong>Inclus avec Premium ($10/mois) :</strong><br>' +
            '• Exportation illimitée HTML autonome (zéro filigrane)<br>' +
            '• Fichiers d\'impression 3D 3MF & GLB multi-couleurs<br>' +
            '• Copie libre de code Three.js & widgets intégrables' +
          '</div>' +
          '<a class="paywall-go-btn" id="paywall-go-btn" href="https://buy.stripe.com/bJecN61Fk3staax7mGbfO03" target="_blank" rel="noopener">💎 DEVENIR PREMIUM (10$ / MOIS)</a>' +
          '<button class="paywall-close-btn" id="paywall-close-btn">Fermer</button>' +
        '</div>';

      document.body.appendChild(modal);

      document.getElementById('paywall-close-btn').onclick = function () {
        modal.style.display = 'none';
      };
      modal.onclick = function (e) {
        if (e.target === modal) modal.style.display = 'none';
      };
    }

    // Update Language Content dynamically
    var isFr = (window.currentLang === 'fr' || (typeof state !== 'undefined' && state && state.lang === 'fr') || (!window.currentLang && navigator.language && navigator.language.startsWith('fr')));
    var titleEl = document.getElementById('paywall-title');
    var descEl = document.getElementById('paywall-desc');
    var tagEl = document.getElementById('paywall-feature-tag');
    var goBtn = document.getElementById('paywall-go-btn');
    var closeBtn = document.getElementById('paywall-close-btn');

    if (isFr) {
      if (titleEl) titleEl.textContent = '👑 Fonctionnalité Premium';
      if (tagEl) tagEl.textContent = featureName ? ('ACCÈS PRO : ' + featureName) : 'ACCÈS PRO';
      if (descEl) descEl.innerHTML = 'La copie de code Three.js, l\'exportation de widgets HTML 1:1, les modèles 3MF multi-couleurs, les fichiers GLB et les captures HD 4K sont réservés aux membres premium de <strong>IA Code Studio</strong>.';
      if (goBtn) goBtn.innerHTML = '💎 DEVENIR PREMIUM (10$ / MOIS)';
      if (closeBtn) closeBtn.textContent = 'Fermer';
    } else {
      if (titleEl) titleEl.textContent = '👑 Premium Studio Feature';
      if (tagEl) tagEl.textContent = featureName ? ('PRO ACCESS: ' + featureName) : 'PRO ACCESS';
      if (descEl) descEl.innerHTML = 'Copying Three.js code, exporting 1:1 standalone HTML widgets, 3MF multi-color manufacturing models, GLB 3D files, and 4K HD snapshots are reserved for premium members of <strong>IA Code Studio</strong>.';
      if (goBtn) goBtn.innerHTML = '💎 UPGRADE TO PREMIUM ($10 / MONTH)';
      if (closeBtn) closeBtn.textContent = 'Close';
    }

    modal.style.display = 'flex';
  };

  // Apply visual lock badges on buttons when user is not premium
  window.applyPremiumLockUI = function () {
    var isPrem = window.isUserPremium();
    var lockedIds = [
      'btn-export-html',
      'btn-copy-code',
      'btn-export-glb',
      'btn-export-3mf',
      'btn-snapshot-2k',
      'btn-snapshot-4k',
      'btn-copy-embed'
    ];

    lockedIds.forEach(function (id) {
      var btn = document.getElementById(id);
      if (!btn) return;
      if (!isPrem) {
        if (!btn.getAttribute('data-original-title')) {
          btn.setAttribute('data-original-title', btn.getAttribute('title') || '');
        }
        btn.setAttribute('title', (window.currentLang === 'fr' ? 'Fonctionnalité Premium (Abonnement requis)' : 'Premium Feature (Subscription required)'));
        if (!btn.querySelector('.lock-pro-badge')) {
          var badge = document.createElement('span');
          badge.className = 'lock-pro-badge';
          badge.style.cssText = 'font-size:10px;margin-left:6px;background:rgba(245,158,11,0.2);color:#f59e0b;padding:2px 6px;border-radius:6px;border:1px solid rgba(245,158,11,0.4);font-weight:800;letter-spacing:0.4px;';
          badge.textContent = '🔒 PRO';
          btn.appendChild(badge);
        }
      } else {
        var existingBadge = btn.querySelector('.lock-pro-badge');
        if (existingBadge) existingBadge.remove();
        var origTitle = btn.getAttribute('data-original-title');
        if (origTitle) btn.setAttribute('title', origTitle);
      }
    });
  };

  // Prevent unauthorized transcription / clipboard copying from non-premium users
  document.addEventListener('copy', function (e) {
    if (!window.isUserPremium()) {
      var selection = window.getSelection().toString();
      // If copying Three.js or HTML code from modals or editor areas
      if (selection && (selection.includes('THREE.') || selection.includes('<script>') || selection.includes('new THREE') || selection.length > 120)) {
        e.preventDefault();
        window.showPaywallModal(window.currentLang === 'fr' ? 'Transcription & Copie' : 'Transcription & Copy');
      }
    }
  });

  // Re-evaluate lock badges on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.applyPremiumLockUI);
  } else {
    setTimeout(window.applyPremiumLockUI, 300);
  }
})();
