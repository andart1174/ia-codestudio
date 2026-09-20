// ══════════════════════════════════════════════════════════════════════════════
// IA ARCHITECTE STUDIO ULTRA — 6 GENIUS BREAKTHROUGH INNOVATIONS
// 1. UltraBeforeAfter       (modal-before-after)
// 2. UltraFintechCheckout   (modal-fintech-checkout)
// 3. UltraScarcityCountdown (modal-scarcity-countdown)
// 4. UltraVoiceAssistant    (modal-voice-assistant)
// 5. UltraRoiCalculator     (modal-roi-calculator)
// 6. UltraContextAdapter    (modal-context-adapter)
// ══════════════════════════════════════════════════════════════════════════════

(function() {
  'use strict';

  function _isFr() {
    return (typeof currentLang !== 'undefined' && currentLang === 'fr');
  }

  function _toast(msg, type) {
    if (typeof showToast === 'function') {
      showToast(msg);
    } else if (typeof window.showToast === 'function') {
      window.showToast(msg);
    } else {
      console.log('[Ultra Genius]', msg);
    }
  }

  function _sound(type) {
    if (typeof UltraSoundFX !== 'undefined' && UltraSoundFX.play) {
      try { UltraSoundFX.play(type); } catch(e){}
    }
  }

  function _confetti() {
    if (typeof UltraConfetti !== 'undefined' && UltraConfetti.fire) {
      try { UltraConfetti.fire(40); } catch(e){}
    }
  }

  function _injectCodeToActiveApp(snippet, markerRegex, label) {
    const isFr = _isFr();
    const targetApp = (typeof window !== 'undefined' && window.APP) || (typeof APP !== 'undefined' ? APP : null);

    if (targetApp && targetApp.html !== undefined) {
      if (markerRegex) {
        targetApp.html = targetApp.html.replace(markerRegex, '');
      }
      targetApp.html = targetApp.html.trim() + '\n\n' + snippet;

      if (targetApp.editor) {
        try {
          if (targetApp.currentTab === 'html' || !targetApp.currentTab) {
            targetApp.editor.setValue(targetApp.html);
          }
        } catch(e){}
      }

      if (typeof window.refreshPreview === 'function') {
        window.refreshPreview();
      } else if (typeof refreshPreview === 'function') {
        refreshPreview();
      }

      _sound('celebrate');
      _confetti();
      _toast(isFr ? ('✨ ' + label + ' injecté avec succès dans votre application !') : ('✨ ' + label + ' injected successfully into your application!'), 'success');
      return true;
    } else {
      _toast(isFr ? 'Aucune application active chargée.' : 'No active application loaded.', 'warning');
      return false;
    }
  }

  async function _copyCode(text, label) {
    if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Copy ' + (label || 'Code'))) return;
    const isFr = _isFr();
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      _sound('click');
      _toast(isFr ? ('📋 Code ' + label + ' copié dans le presse-papiers !') : ('📋 ' + label + ' code copied to clipboard!'), 'success');
    } catch(err) {
      _toast(isFr ? 'Erreur lors de la copie.' : 'Failed to copy code.', 'error');
    }
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // 1. ULTRA BEFORE / AFTER SPLIT COMPARISON LENS
  // ══════════════════════════════════════════════════════════════════════════════
  window.UltraBeforeAfter = {
    state: {
      splitPos: 50,
      preset: 'architecture',
      autoSweep: true,
      orientation: 'horizontal'
    },

    open: function() {
      const modal = document.getElementById('modal-before-after');
      if (modal) {
        modal.classList.add('show', 'active');
        this.updatePreview();
      }
    },

    close: function() {
      const modal = document.getElementById('modal-before-after');
      if (modal) modal.classList.remove('show', 'active');
    },

    setPos: function(val) {
      this.state.splitPos = Math.max(0, Math.min(100, parseInt(val, 10)));
      this.updatePreview();
    },

    setPreset: function(preset) {
      this.state.preset = preset;
      _sound('click');
      this.updatePreview();
    },

    toggleAutoSweep: function() {
      this.state.autoSweep = !this.state.autoSweep;
      _sound('click');
      this.updatePreview();
    },

    updatePreview: function() {
      const sliderEl = document.getElementById('ba-preview-slider');
      const posVal = document.getElementById('ba-pos-val');
      const sweepBadge = document.getElementById('ba-sweep-badge');
      const isFr = _isFr();

      if (posVal) posVal.textContent = this.state.splitPos + '%';
      if (sweepBadge) {
        sweepBadge.textContent = this.state.autoSweep ? 'ON' : 'OFF';
        sweepBadge.style.color = this.state.autoSweep ? '#10b981' : '#94a3b8';
      }

      if (sliderEl) {
        const p = this.state.splitPos;
        let beforeContent = '';
        let afterContent = '';

        if (this.state.preset === 'architecture') {
          beforeContent = '<div style="width:100%;height:100%;background:linear-gradient(135deg,#334155,#1e293b);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#94a3b8;padding:20px;text-align:center;">' +
            '<div style="font-size:3rem;margin-bottom:8px">🏚️</div>' +
            '<div style="font-weight:800;font-size:1.1rem;color:#f1f5f9">' + (isFr ? 'Ancien État (1985)' : 'Original Blueprint (1985)') + '</div>' +
            '<div style="font-size:0.8rem;color:#cbd5e1;margin-top:4px">' + (isFr ? 'Béton brut, isolation thermique D, simple vitrage' : 'Raw concrete, standard insulation, single glazing') + '</div>' +
          '</div>';

          afterContent = '<div style="width:100%;height:100%;background:linear-gradient(135deg,#0284c7,#0f172a);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;padding:20px;text-align:center;">' +
            '<div style="font-size:3rem;margin-bottom:8px">🏡</div>' +
            '<div style="font-weight:800;font-size:1.1rem;color:#38bdf8">' + (isFr ? 'Rénovation Ultra Moderne' : 'Ultra Luxury Renovation') + '</div>' +
            '<div style="font-size:0.8rem;color:#e2e8f0;margin-top:4px">' + (isFr ? 'Villas passives A+, baies vitrées solaires, domotique' : 'Passive solar villa A+, smart automation, floor-to-ceiling glass') + '</div>' +
          '</div>';
        } else if (this.state.preset === 'design') {
          beforeContent = '<div style="width:100%;height:100%;background:#ffffff;color:#0f172a;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;text-align:center;">' +
            '<div style="font-size:3rem;margin-bottom:8px">☀️</div>' +
            '<div style="font-weight:800;font-size:1.1rem;color:#0f172a">' + (isFr ? 'Thème Jour Minimaliste' : 'Light Clean Mode') + '</div>' +
            '<div style="font-size:0.8rem;color:#64748b;margin-top:4px">' + (isFr ? 'Contraste blanc éclatant & lisibilité maximale' : 'High-contrast clean surfaces & crisp typography') + '</div>' +
          '</div>';

          afterContent = '<div style="width:100%;height:100%;background:#090d16;color:#38bdf8;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;text-align:center;">' +
            '<div style="font-size:3rem;margin-bottom:8px">🌙</div>' +
            '<div style="font-weight:800;font-size:1.1rem;color:#38bdf8">' + (isFr ? 'Cyber Dark Mode' : 'Cyber Dark Glass') + '</div>' +
            '<div style="font-size:0.8rem;color:#94a3b8;margin-top:4px">' + (isFr ? 'Effet néon violet, reflets verre & confort visuel' : 'Deep OLED black, glowing neons & frosted glass') + '</div>' +
          '</div>';
        } else {
          beforeContent = '<div style="width:100%;height:100%;background:linear-gradient(135deg,#78716c,#44403c);filter:grayscale(80%);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#e7e5e4;padding:20px;text-align:center;">' +
            '<div style="font-size:3rem;margin-bottom:8px">📷</div>' +
            '<div style="font-weight:800;font-size:1.1rem">' + (isFr ? 'Photo Brute Non Retouchée' : 'Raw Sensor Capture') + '</div>' +
            '<div style="font-size:0.8rem;color:#d6d3d1;margin-top:4px">' + (isFr ? 'Sous-exposée, couleurs ternes, bruit ISO' : 'Flat profile, dull tones, standard dynamic range') + '</div>' +
          '</div>';

          afterContent = '<div style="width:100%;height:100%;background:linear-gradient(135deg,#f59e0b,#ef4444);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;padding:20px;text-align:center;">' +
            '<div style="font-size:3rem;margin-bottom:8px">✨</div>' +
            '<div style="font-weight:800;font-size:1.1rem;color:#fef08a">' + (isFr ? 'Étalonnage Cinématique HDR' : 'Cinematic HDR Grading') + '</div>' +
            '<div style="font-size:0.8rem;color:#fff;margin-top:4px">' + (isFr ? 'Couleurs saturées or & rouge, contraste profond' : 'Rich golden sunset, micro-contrast enhancement') + '</div>' +
          '</div>';
        }

        sliderEl.innerHTML =
          '<div style="position:relative;width:100%;height:220px;border-radius:12px;overflow:hidden;box-shadow:0 12px 30px rgba(0,0,0,0.5);user-select:none">' +
            '<div style="position:absolute;inset:0;width:100%;height:100%">' + afterContent + '</div>' +
            '<div style="position:absolute;inset:0;width:100%;height:100%;clip-path:polygon(0 0, ' + p + '% 0, ' + p + '% 100%, 0 100%)">' + beforeContent + '</div>' +
            '<div style="position:absolute;top:0;bottom:0;left:' + p + '%;width:4px;background:#fff;box-shadow:0 0 12px rgba(0,0,0,0.8);transform:translateX(-50%);pointer-events:none">' +
              '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:32px;height:32px;border-radius:50%;background:#0284c7;border:2px solid #fff;display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:900;box-shadow:0 4px 12px rgba(0,0,0,0.5)">◄►</div>' +
            '</div>' +
            '<span style="position:absolute;top:10px;left:10px;background:rgba(0,0,0,0.6);backdrop-filter:blur(6px);color:#fff;font-size:10px;font-weight:800;padding:3px 8px;border-radius:6px;border:1px solid rgba(255,255,255,0.2)">BEFORE</span>' +
            '<span style="position:absolute;top:10px;right:10px;background:rgba(0,0,0,0.6);backdrop-filter:blur(6px);color:#38bdf8;font-size:10px;font-weight:800;padding:3px 8px;border-radius:6px;border:1px solid rgba(56,189,248,0.3)">AFTER</span>' +
          '</div>';
      }
    },

    generateStandaloneSnippet: function() {
      const isFr = _isFr();
      const sweep = this.state.autoSweep;

      return '<!-- Ultra Before / After Comparison Lens -->\n' +
'<div id="ultra-before-after-wrap" style="max-width: 800px; margin: 30px auto; font-family: system-ui, -apple-system, sans-serif;">\n' +
'  <div id="ultra-ba-container" style="position: relative; width: 100%; height: 380px; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.15); cursor: ew-resize; user-select: none;">\n' +
'    <!-- After Layer (Base) -->\n' +
'    <div id="ultra-ba-after" style="position: absolute; inset: 0; width: 100%; height: 100%; background: linear-gradient(135deg, #0284c7, #0f172a); display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff; padding: 30px; text-align: center;">\n' +
'      <div style="font-size: 3.5rem; margin-bottom: 10px;">✨</div>\n' +
'      <div style="font-weight: 800; font-size: 1.4rem; color: #38bdf8;">' + (isFr ? 'Nouvelle Version Optimisée' : 'Modern Luxury Transformation') + '</div>\n' +
'      <div style="font-size: 0.9rem; color: #e2e8f0; max-width: 420px; margin-top: 6px;">' + (isFr ? 'Design moderne haute performance, finitions sur-mesure & domotique.' : 'High-performance architecture, smart home controls & premium finishes.') + '</div>\n' +
'    </div>\n' +
'    <!-- Before Layer (Clipped Overlay) -->\n' +
'    <div id="ultra-ba-before" style="position: absolute; inset: 0; width: 100%; height: 100%; background: linear-gradient(135deg, #334155, #1e293b); display: flex; flex-direction: column; align-items: center; justify-content: center; color: #94a3b8; padding: 30px; text-align: center; clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);">\n' +
'      <div style="font-size: 3.5rem; margin-bottom: 10px;">🏚️</div>\n' +
'      <div style="font-weight: 800; font-size: 1.4rem; color: #f1f5f9;">' + (isFr ? 'État d\'Origine' : 'Original Baseline Concept') + '</div>\n' +
'      <div style="font-size: 0.9rem; color: #cbd5e1; max-width: 420px; margin-top: 6px;">' + (isFr ? 'Structure vieillissante, déperdition énergétique, matériaux bruts.' : 'Legacy structural state, high thermal loss, conventional materials.') + '</div>\n' +
'    </div>\n' +
'    <!-- Central Divider Handle -->\n' +
'    <div id="ultra-ba-divider" style="position: absolute; top: 0; bottom: 0; left: 50%; width: 4px; background: #fff; box-shadow: 0 0 16px rgba(0,0,0,0.8); transform: translateX(-50%); pointer-events: none;">\n' +
'      <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 38px; height: 38px; border-radius: 50%; background: #0284c7; border: 3px solid #fff; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 13px; font-weight: 900; box-shadow: 0 4px 14px rgba(0,0,0,0.6);">◄►</div>\n' +
'    </div>\n' +
'    <!-- Labels -->\n' +
'    <span style="position: absolute; top: 16px; left: 16px; background: rgba(15,23,42,0.8); backdrop-filter: blur(8px); color: #fff; font-size: 11px; font-weight: 800; padding: 5px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2); letter-spacing: 0.5px;">BEFORE</span>\n' +
'    <span style="position: absolute; top: 16px; right: 16px; background: rgba(15,23,42,0.8); backdrop-filter: blur(8px); color: #38bdf8; font-size: 11px; font-weight: 800; padding: 5px 12px; border-radius: 8px; border: 1px solid rgba(56,189,248,0.3); letter-spacing: 0.5px;">AFTER</span>\n' +
'  </div>\n' +
'</div>\n\n' +
'<script>\n' +
'(function() {\n' +
'  var container = document.getElementById("ultra-ba-container");\n' +
'  var beforeLayer = document.getElementById("ultra-ba-before");\n' +
'  var divider = document.getElementById("ultra-ba-divider");\n' +
'  if (!container || !beforeLayer || !divider) return;\n\n' +
'  var isDown = false;\n' +
'  function setPosition(x) {\n' +
'    var rect = container.getBoundingClientRect();\n' +
'    var offset = Math.max(0, Math.min(x - rect.left, rect.width));\n' +
'    var pct = (offset / rect.width) * 100;\n' +
'    beforeLayer.style.clipPath = "polygon(0 0, " + pct + "% 0, " + pct + "% 100%, 0 100%)";\n' +
'    divider.style.left = pct + "%";\n' +
'  }\n\n' +
'  container.addEventListener("mousedown", function(e) { isDown = true; setPosition(e.clientX); });\n' +
'  window.addEventListener("mouseup", function() { isDown = false; });\n' +
'  window.addEventListener("mousemove", function(e) { if (isDown) setPosition(e.clientX); });\n\n' +
'  container.addEventListener("touchstart", function(e) { if (e.touches && e.touches[0]) setPosition(e.touches[0].clientX); });\n' +
'  container.addEventListener("touchmove", function(e) { if (e.touches && e.touches[0]) setPosition(e.touches[0].clientX); });\n\n' +
'  ' + (sweep ? ('var sweepStep = 0;\n' +
'  var sweepTimer = setInterval(function() {\n' +
'    sweepStep += 0.05;\n' +
'    var pos = 50 + Math.sin(sweepStep) * 22;\n' +
'    beforeLayer.style.clipPath = "polygon(0 0, " + pos + "% 0, " + pos + "% 100%, 0 100%)";\n' +
'    divider.style.left = pos + "%";\n' +
'    if (sweepStep > Math.PI * 2) { clearInterval(sweepTimer); setPosition(container.getBoundingClientRect().left + container.offsetWidth * 0.5); }\n' +
'  }, 30);\n' +
'  container.addEventListener("mousedown", function() { clearInterval(sweepTimer); });\n' +
'  container.addEventListener("touchstart", function() { clearInterval(sweepTimer); });') : '') + '\n' +
'})();\n' +
'</script>';
    },

    inject: function() {
      const snippet = this.generateStandaloneSnippet();
      _injectCodeToActiveApp(snippet, /<!-- Ultra Before \/ After Comparison Lens -->[\s\S]*?<\/script>/gi, 'Before/After Comparison Lens');
      this.close();
    },

    copy: function() {
      _copyCode(this.generateStandaloneSnippet(), 'Before/After Lens Snippet');
    }
  };

  // ══════════════════════════════════════════════════════════════════════════════
  // 2. ULTRA 3D FLIPPING CARD & MICRO-FINTECH CHECKOUT SIMULATOR
  // ══════════════════════════════════════════════════════════════════════════════
  window.UltraFintechCheckout = {
    state: {
      cardNum: '4532 8921 4829 1920',
      holder: 'ALEXANDRE DUPONT',
      expiry: '08/29',
      cvv: '842',
      isFlipped: false,
      discount: 0,
      total: 49.00,
      mode: 'floating'
    },

    open: function() {
      const modal = document.getElementById('modal-fintech-checkout');
      if (modal) {
        modal.classList.add('show', 'active');
        this.updateCardPreview();
      }
    },

    close: function() {
      const modal = document.getElementById('modal-fintech-checkout');
      if (modal) modal.classList.remove('show', 'active');
    },

    setMode: function(m) {
      this.state.mode = m;
      _sound('click');
      const btnFloat = document.getElementById('fc-mode-btn-float');
      const btnInline = document.getElementById('fc-mode-btn-inline');
      if (btnFloat && btnInline) {
        if (m === 'floating') {
          btnFloat.style.background = '#6366f1';
          btnFloat.style.color = '#fff';
          btnInline.style.background = 'rgba(255,255,255,0.06)';
          btnInline.style.color = '#94a3b8';
        } else {
          btnInline.style.background = '#6366f1';
          btnInline.style.color = '#fff';
          btnFloat.style.background = 'rgba(255,255,255,0.06)';
          btnFloat.style.color = '#94a3b8';
        }
      }
      const isFr = _isFr();
      _toast(isFr ? 
        (m === 'floating' ? 'Mode Widget Flottant Déplaçable activé.' : 'Mode Section Intégrée activé.') :
        (m === 'floating' ? 'Floating Draggable Widget mode active.' : 'Inline Page Section mode active.'),
        'info'
      );
    },

    handleTilt: function(e) {
      const card = document.getElementById('fc-3d-card');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rx = ((y - cy) / cy) * -16;
      const ry = ((x - cx) / cx) * 16;
      const flip = this.state.isFlipped ? 180 : 0;
      card.style.transform = 'perspective(1000px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + (flip + ry).toFixed(2) + 'deg) scale3d(1.03, 1.03, 1.03)';
    },

    resetTilt: function() {
      const card = document.getElementById('fc-3d-card');
      if (!card) return;
      const flip = this.state.isFlipped ? 180 : 0;
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(' + flip + 'deg) scale3d(1, 1, 1)';
    },

    flipCard: function(force) {
      this.state.isFlipped = (typeof force === 'boolean') ? force : !this.state.isFlipped;
      _sound('click');
      this.updateCardPreview();
    },

    applyPromo: function(code) {
      const isFr = _isFr();
      if ((code || '').toUpperCase().trim() === 'VIP25') {
        this.state.discount = 25;
        _sound('celebrate');
        _confetti();
        _toast(isFr ? '🎉 Code promo VIP25 appliqué : -25% !' : '🎉 Promo code VIP25 applied: 25% OFF!', 'success');
      } else {
        _sound('warn');
        _toast(isFr ? 'Code promo invalide. Essayez "VIP25"' : 'Invalid promo code. Try "VIP25"', 'warning');
      }
      this.updateCardPreview();
    },

    simulatePayment: function(type) {
      const isFr = _isFr();
      _sound('celebrate');
      _confetti();
      const finalPrice = (this.state.total * (1 - this.state.discount / 100)).toFixed(2);
      const msg = isFr ?
        ('✅ Paiement ' + (type || 'Card') + ' de ' + finalPrice + '€ validé avec succès ! Reçu émis.') :
        ('✅ Payment ' + (type || 'Card') + ' of $' + finalPrice + ' confirmed! Receipt issued.');
      _toast(msg, 'success');
    },

    updateCardPreview: function() {
      const cardEl = document.getElementById('fc-3d-card');
      const totalEl = document.getElementById('fc-total-val');
      const discountEl = document.getElementById('fc-discount-badge');

      if (totalEl) {
        const finalPrice = (this.state.total * (1 - this.state.discount / 100)).toFixed(2);
        totalEl.textContent = '$' + finalPrice;
      }
      if (discountEl) {
        discountEl.style.display = this.state.discount > 0 ? 'inline-block' : 'none';
        discountEl.textContent = '-' + this.state.discount + '%';
      }

      if (cardEl) {
        cardEl.style.transform = this.state.isFlipped ? 'perspective(1000px) rotateY(180deg)' : 'perspective(1000px) rotateY(0deg)';
      }
    },

    generateStandaloneSnippet: function() {
      const isFr = _isFr();
      const isFloating = this.state.mode !== 'inline';

      let markup = '<!-- Ultra 3D Flipping Card & Micro-Fintech Checkout -->\n';
      if (isFloating) {
        markup += '<div id="ultra-fintech-checkout-wrap" style="position:fixed;bottom:24px;right:24px;z-index:999990;width:420px;max-width:calc(100vw - 32px);background:#0f172a;border:1px solid rgba(255,255,255,0.18);border-radius:20px;box-shadow:0 20px 50px rgba(0,0,0,0.7);color:#fff;font-family:system-ui,-apple-system,sans-serif;overflow:hidden;transition:transform 0.25s ease,opacity 0.25s ease;">\n' +
        '  <!-- Draggable Header Handle -->\n' +
        '  <div id="ultra-fc-drag-handle" style="cursor:grab;user-select:none;padding:12px 18px;background:rgba(255,255,255,0.03);border-bottom:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:space-between;">\n' +
        '    <div style="display:flex;align-items:center;gap:8px;">\n' +
        '      <span style="color:#6366f1;font-size:16px;">⠿</span>\n' +
        '      <span style="font-weight:800;font-size:0.95rem;color:#fff;">💳 ' + (isFr ? 'Paiement Sécurisé' : 'Express Checkout') + '</span>\n' +
        '    </div>\n' +
        '    <div style="display:flex;align-items:center;gap:6px;">\n' +
        '      <button id="ultra-fc-min-btn" title="Minimize" style="background:rgba(255,255,255,0.08);border:none;color:#94a3b8;width:26px;height:26px;border-radius:6px;cursor:pointer;font-weight:900;display:flex;align-items:center;justify-content:center;">−</button>\n' +
        '      <button id="ultra-fc-close-btn" title="Close" style="background:rgba(255,255,255,0.08);border:none;color:#94a3b8;width:26px;height:26px;border-radius:6px;cursor:pointer;font-weight:900;display:flex;align-items:center;justify-content:center;">✕</button>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '  <div style="padding:18px 20px 22px;max-height:80vh;overflow-y:auto;">\n';
      } else {
        markup += '<div id="ultra-fintech-checkout-wrap" style="max-width:480px;margin:30px auto;background:#0f172a;border:1px solid rgba(255,255,255,0.18);border-radius:20px;padding:22px;box-shadow:0 20px 50px rgba(0,0,0,0.5);color:#fff;font-family:system-ui,-apple-system,sans-serif;">\n' +
        '  <div style="margin-bottom:18px;text-align:center;">\n' +
        '    <div style="font-size:1.2rem;font-weight:800;color:#fff;">💳 ' + (isFr ? 'Paiement Sécurisé' : 'Express Checkout') + '</div>\n' +
        '    <div style="font-size:0.75rem;color:#94a3b8;">' + (isFr ? 'Cryptage SSL 256-bit de niveau bancaire' : '256-Bit SSL Bank-Grade Encryption') + '</div>\n' +
        '  </div>\n';
      }

      markup += '    <!-- 3D Card Interactive Stage -->\n' +
      '    <div id="ultra-fc-card-stage" style="perspective:1000px;margin-bottom:16px;cursor:pointer;user-select:none;">\n' +
      '      <div id="ultra-fc-card" style="width:100%;height:195px;position:relative;transform-style:preserve-3d;transition:transform 0.5s cubic-bezier(0.4,0,0.2,1);border-radius:16px;">\n' +
      '        <!-- Front Side -->\n' +
      '        <div style="position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;background:linear-gradient(135deg,#38bdf8,#6366f1,#8b5cf6);border-radius:16px;padding:18px 20px;box-shadow:0 15px 35px rgba(99,102,241,0.35);display:flex;flex-direction:column;justify-content:space-between;border:1px solid rgba(255,255,255,0.25);">\n' +
      '          <div style="display:flex;justify-content:space-between;align-items:center;">\n' +
      '            <div style="width:40px;height:28px;border-radius:6px;background:linear-gradient(135deg,#fde047,#ca8a04);box-shadow:inset 0 1px 2px rgba(0,0,0,0.3);"></div>\n' +
      '            <div id="ultra-fc-brand" style="font-weight:900;font-size:1.2rem;letter-spacing:1px;color:#fff;">VISA</div>\n' +
      '          </div>\n' +
      '          <div id="ultra-fc-disp-num" style="font-family:monospace;font-size:1.2rem;font-weight:700;letter-spacing:2px;color:#fff;text-shadow:0 2px 4px rgba(0,0,0,0.3);">4532 •••• •••• 1920</div>\n' +
      '          <div style="display:flex;justify-content:space-between;align-items:flex-end;">\n' +
      '            <div>\n' +
      '              <div style="font-size:0.6rem;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:0.5px;">CARDHOLDER</div>\n' +
      '              <div id="ultra-fc-disp-name" style="font-weight:700;font-size:0.85rem;color:#fff;">ALEXANDRE DUPONT</div>\n' +
      '            </div>\n' +
      '            <div>\n' +
      '              <div style="font-size:0.6rem;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:0.5px;">EXPIRES</div>\n' +
      '              <div id="ultra-fc-disp-exp" style="font-weight:700;font-size:0.85rem;color:#fff;">08/29</div>\n' +
      '            </div>\n' +
      '          </div>\n' +
      '        </div>\n' +
      '        <!-- Back Side -->\n' +
      '        <div style="position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;transform:rotateY(180deg);background:linear-gradient(135deg,#1e1b4b,#312e81);border-radius:16px;padding:16px 0;box-shadow:0 15px 35px rgba(0,0,0,0.5);display:flex;flex-direction:column;justify-content:space-between;border:1px solid rgba(255,255,255,0.15);">\n' +
      '          <div style="background:#09090b;height:38px;width:100%;margin-top:6px;"></div>\n' +
      '          <div style="padding:0 20px;display:flex;justify-content:flex-end;align-items:center;">\n' +
      '            <div style="background:#fff;color:#000;font-family:monospace;font-weight:800;font-size:0.95rem;padding:3px 10px;border-radius:4px;letter-spacing:2px;" id="ultra-fc-disp-cvv">842</div>\n' +
      '          </div>\n' +
      '          <div style="font-size:0.65rem;color:#94a3b8;text-align:center;padding:0 20px;">' + (isFr ? 'Code de sécurité CVV 3 chiffres' : '3-Digit Security Verification Code') + '</div>\n' +
      '        </div>\n' +
      '      </div>\n' +
      '    </div>\n\n' +
      '    <!-- Flip & Tilt Control Bar -->\n' +
      '    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;font-size:0.75rem;">\n' +
      '      <span style="color:#94a3b8;">👆 ' + (isFr ? 'Cliquez sur la carte pour la retourner' : 'Click or hover card to tilt & flip') + '</span>\n' +
      '      <button id="ultra-fc-flip-btn" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);color:#38bdf8;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:0.75rem;font-weight:700;">🔄 ' + (isFr ? 'Retourner' : 'Flip Card') + '</button>\n' +
      '    </div>\n\n' +
      '    <!-- Inputs & Checkout Controls -->\n' +
      '    <div style="display:flex;flex-direction:column;gap:10px;">\n' +
      '      <div>\n' +
      '        <input type="text" id="ultra-fc-inp-num" placeholder="' + (isFr ? 'Numéro de carte' : 'Card Number') + '" value="4532 8921 4829 1920" maxlength="19" style="width:100%;box-sizing:border-box;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.15);border-radius:8px;padding:9px 12px;color:#fff;font-size:0.85rem;font-family:monospace;">\n' +
      '      </div>\n' +
      '      <div>\n' +
      '        <input type="text" id="ultra-fc-inp-name" placeholder="' + (isFr ? 'Nom du titulaire' : 'Cardholder Name') + '" value="ALEXANDRE DUPONT" style="width:100%;box-sizing:border-box;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.15);border-radius:8px;padding:9px 12px;color:#fff;font-size:0.85rem;">\n' +
      '      </div>\n' +
      '      <div style="display:flex;gap:8px;">\n' +
      '        <input type="text" id="ultra-fc-inp-exp" placeholder="MM/YY" value="08/29" maxlength="5" style="flex:1;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.15);border-radius:8px;padding:9px 12px;color:#fff;font-size:0.85rem;">\n' +
      '        <input type="text" id="ultra-fc-inp-cvv" placeholder="CVV" value="842" maxlength="4" style="flex:1;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.15);border-radius:8px;padding:9px 12px;color:#fff;font-size:0.85rem;">\n' +
      '      </div>\n' +
      '      <div style="display:flex;gap:8px;margin-top:2px;">\n' +
      '        <input type="text" id="ultra-fc-inp-promo" placeholder="' + (isFr ? 'Code promo (ex: VIP25)' : 'Promo code (try: VIP25)') + '" style="flex:1;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.15);border-radius:8px;padding:8px 12px;color:#fff;font-size:0.8rem;">\n' +
      '        <button id="ultra-fc-btn-promo" style="background:rgba(99,102,241,0.2);border:1px solid rgba(99,102,241,0.5);color:#a5b4fc;padding:8px 14px;border-radius:8px;font-size:0.8rem;font-weight:700;cursor:pointer;">' + (isFr ? 'Appliquer' : 'Apply') + '</button>\n' +
      '      </div>\n\n' +
      '      <!-- Express Apple Pay & Card Buttons -->\n' +
      '      <button id="ultra-fc-btn-apple" style="background:#fff;color:#000;border:none;border-radius:10px;padding:11px;font-size:0.9rem;font-weight:800;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;margin-top:6px;box-shadow:0 4px 12px rgba(0,0,0,0.2);">\n' +
      '         Pay With Apple Pay\n' +
      '      </button>\n' +
      '      <button id="ultra-fc-btn-submit" style="background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border:none;border-radius:10px;padding:12px;font-size:0.95rem;font-weight:800;cursor:pointer;box-shadow:0 6px 20px rgba(99,102,241,0.4);">\n' +
      '        ' + (isFr ? 'Payer' : 'Pay') + ' <span id="ultra-fc-total-btn">$49.00</span> ' + (isFr ? 'Maintenant' : 'Now') + '\n' +
      '      </button>\n' +
      '    </div>\n';

      if (isFloating) {
        markup += '  </div>\n</div>\n\n' +
        '<!-- Floating Dock Badge (Visible when minimized or closed) -->\n' +
        '<div id="ultra-fc-dock-badge" style="position:fixed;bottom:24px;right:24px;z-index:999980;display:none;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;padding:11px 20px;border-radius:30px;box-shadow:0 12px 30px rgba(99,102,241,0.55);cursor:pointer;font-family:system-ui,-apple-system,sans-serif;font-size:13px;font-weight:800;align-items:center;gap:10px;border:1px solid rgba(255,255,255,0.25);transition:transform 0.2s ease;">\n' +
        '  <span>💳 ' + (isFr ? 'Paiement Sécurisé' : 'Express Checkout') + '</span>\n' +
        '  <span id="ultra-fc-dock-price" style="background:rgba(0,0,0,0.25);padding:3px 10px;border-radius:12px;font-size:12px;">$49.00</span>\n' +
        '</div>\n\n';
      } else {
        markup += '</div>\n\n';
      }

      markup += '<script>\n' +
      '(function() {\n' +
      '  var isFr = ' + (isFr ? 'true' : 'false') + ';\n' +
      '  var wrap = document.getElementById("ultra-fintech-checkout-wrap");\n' +
      '  var dock = document.getElementById("ultra-fc-dock-badge");\n' +
      '  var card = document.getElementById("ultra-fc-card");\n' +
      '  var stage = document.getElementById("ultra-fc-card-stage");\n' +
      '  var dragHandle = document.getElementById("ultra-fc-drag-handle");\n' +
      '  var minBtn = document.getElementById("ultra-fc-min-btn");\n' +
      '  var closeBtn = document.getElementById("ultra-fc-close-btn");\n' +
      '  var flipBtn = document.getElementById("ultra-fc-flip-btn");\n' +
      '  var inpNum = document.getElementById("ultra-fc-inp-num");\n' +
      '  var inpName = document.getElementById("ultra-fc-inp-name");\n' +
      '  var inpExp = document.getElementById("ultra-fc-inp-exp");\n' +
      '  var inpCvv = document.getElementById("ultra-fc-inp-cvv");\n' +
      '  var inpPromo = document.getElementById("ultra-fc-inp-promo");\n' +
      '  var btnPromo = document.getElementById("ultra-fc-btn-promo");\n' +
      '  var btnApple = document.getElementById("ultra-fc-btn-apple");\n' +
      '  var btnSubmit = document.getElementById("ultra-fc-btn-submit");\n' +
      '  var totalBtn = document.getElementById("ultra-fc-total-btn");\n' +
      '  var dockPrice = document.getElementById("ultra-fc-dock-price");\n' +
      '  var dispNum = document.getElementById("ultra-fc-disp-num");\n' +
      '  var dispName = document.getElementById("ultra-fc-disp-name");\n' +
      '  var dispExp = document.getElementById("ultra-fc-disp-exp");\n' +
      '  var dispCvv = document.getElementById("ultra-fc-disp-cvv");\n' +
      '  var dispBrand = document.getElementById("ultra-fc-brand");\n' +
      '  var isCardFlipped = false;\n' +
      '  var basePrice = 49.00;\n' +
      '  var discount = 0;\n\n' +
      '  // 1. Interactive 3D Card Mouse Tilt & Parallax Physics\n' +
      '  if (stage && card) {\n' +
      '    function tiltCard(clientX, clientY) {\n' +
      '      var rect = card.getBoundingClientRect();\n' +
      '      var x = clientX - rect.left;\n' +
      '      var y = clientY - rect.top;\n' +
      '      var cx = rect.width / 2;\n' +
      '      var cy = rect.height / 2;\n' +
      '      var rx = ((y - cy) / cy) * -16;\n' +
      '      var ry = ((x - cx) / cx) * 16;\n' +
      '      var flipBase = isCardFlipped ? 180 : 0;\n' +
      '      card.style.transform = "perspective(1000px) rotateX(" + rx.toFixed(2) + "deg) rotateY(" + (flipBase + ry).toFixed(2) + "deg) scale3d(1.03,1.03,1.03)";\n' +
      '    }\n' +
      '    stage.addEventListener("mousemove", function(e) { tiltCard(e.clientX, e.clientY); });\n' +
      '    stage.addEventListener("mouseleave", function() {\n' +
      '      var flipBase = isCardFlipped ? 180 : 0;\n' +
      '      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(" + flipBase + "deg) scale3d(1,1,1)";\n' +
      '    });\n' +
      '    stage.addEventListener("touchmove", function(e) {\n' +
      '      if (e.touches && e.touches[0]) tiltCard(e.touches[0].clientX, e.touches[0].clientY);\n' +
      '    }, { passive: true });\n' +
      '    stage.addEventListener("touchend", function() {\n' +
      '      var flipBase = isCardFlipped ? 180 : 0;\n' +
      '      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(" + flipBase + "deg) scale3d(1,1,1)";\n' +
      '    });\n' +
      '    function doFlip() {\n' +
      '      isCardFlipped = !isCardFlipped;\n' +
      '      var flipBase = isCardFlipped ? 180 : 0;\n' +
      '      card.style.transition = "transform 0.6s cubic-bezier(0.4,0,0.2,1)";\n' +
      '      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(" + flipBase + "deg) scale3d(1,1,1)";\n' +
      '      setTimeout(function() { card.style.transition = ""; }, 600);\n' +
      '    }\n' +
      '    stage.addEventListener("click", doFlip);\n' +
      '    if (flipBtn) flipBtn.addEventListener("click", function(e) { e.stopPropagation(); doFlip(); });\n' +
      '  }\n\n' +
      '  // 2. Draggable Window Physics\n' +
      '  if (dragHandle && wrap) {\n' +
      '    var isDragging = false;\n' +
      '    var startX = 0, startY = 0;\n' +
      '    var origLeft = 0, origTop = 0;\n' +
      '    dragHandle.addEventListener("mousedown", function(e) {\n' +
      '      if (e.target.tagName === "BUTTON" || e.target.closest("button")) return;\n' +
      '      isDragging = true;\n' +
      '      startX = e.clientX;\n' +
      '      startY = e.clientY;\n' +
      '      var rect = wrap.getBoundingClientRect();\n' +
      '      origLeft = rect.left;\n' +
      '      origTop = rect.top;\n' +
      '      wrap.style.bottom = "auto";\n' +
      '      wrap.style.right = "auto";\n' +
      '      wrap.style.left = origLeft + "px";\n' +
      '      wrap.style.top = origTop + "px";\n' +
      '      dragHandle.style.cursor = "grabbing";\n' +
      '      e.preventDefault();\n' +
      '    });\n' +
      '    window.addEventListener("mousemove", function(e) {\n' +
      '      if (!isDragging) return;\n' +
      '      var dx = e.clientX - startX;\n' +
      '      var dy = e.clientY - startY;\n' +
      '      var newLeft = Math.max(10, Math.min(window.innerWidth - wrap.offsetWidth - 10, origLeft + dx));\n' +
      '      var newTop = Math.max(10, Math.min(window.innerHeight - wrap.offsetHeight - 10, origTop + dy));\n' +
      '      wrap.style.left = newLeft + "px";\n' +
      '      wrap.style.top = newTop + "px";\n' +
      '    });\n' +
      '    window.addEventListener("mouseup", function() {\n' +
      '      if (isDragging) { isDragging = false; dragHandle.style.cursor = "grab"; }\n' +
      '    });\n' +
      '    dragHandle.addEventListener("touchstart", function(e) {\n' +
      '      if (e.target.tagName === "BUTTON" || e.target.closest("button")) return;\n' +
      '      if (e.touches && e.touches[0]) {\n' +
      '        isDragging = true;\n' +
      '        startX = e.touches[0].clientX;\n' +
      '        startY = e.touches[0].clientY;\n' +
      '        var rect = wrap.getBoundingClientRect();\n' +
      '        origLeft = rect.left;\n' +
      '        origTop = rect.top;\n' +
      '        wrap.style.bottom = "auto";\n' +
      '        wrap.style.right = "auto";\n' +
      '        wrap.style.left = origLeft + "px";\n' +
      '        wrap.style.top = origTop + "px";\n' +
      '      }\n' +
      '    }, { passive: true });\n' +
      '    window.addEventListener("touchmove", function(e) {\n' +
      '      if (!isDragging || !e.touches || !e.touches[0]) return;\n' +
      '      var dx = e.touches[0].clientX - startX;\n' +
      '      var dy = e.touches[0].clientY - startY;\n' +
      '      var newLeft = Math.max(10, Math.min(window.innerWidth - wrap.offsetWidth - 10, origLeft + dx));\n' +
      '      var newTop = Math.max(10, Math.min(window.innerHeight - wrap.offsetHeight - 10, origTop + dy));\n' +
      '      wrap.style.left = newLeft + "px";\n' +
      '      wrap.style.top = newTop + "px";\n' +
      '    }, { passive: true });\n' +
      '    window.addEventListener("touchend", function() { isDragging = false; });\n' +
      '  }\n\n' +
      '  // 3. Minimize & Corner Docking\n' +
      '  function minimizeToDock() {\n' +
      '    if (wrap) wrap.style.display = "none";\n' +
      '    if (dock) dock.style.display = "flex";\n' +
      '  }\n' +
      '  function restoreFromDock() {\n' +
      '    if (dock) dock.style.display = "none";\n' +
      '    if (wrap) wrap.style.display = "block";\n' +
      '  }\n' +
      '  if (minBtn) minBtn.onclick = minimizeToDock;\n' +
      '  if (closeBtn) closeBtn.onclick = minimizeToDock;\n' +
      '  if (dock) dock.onclick = restoreFromDock;\n\n' +
      '  // 4. Live Reactive Input Formatting\n' +
      '  if (inpNum && dispNum) {\n' +
      '    inpNum.addEventListener("input", function() {\n' +
      '      var raw = inpNum.value.replace(/\\D/g, "").substring(0, 16);\n' +
      '      var formatted = raw.replace(/(\\d{4})(?=\\d)/g, "$1 ");\n' +
      '      inpNum.value = formatted;\n' +
      '      dispNum.textContent = formatted || "4532 •••• •••• 1920";\n' +
      '      if (dispBrand) {\n' +
      '        if (raw.startsWith("4")) dispBrand.textContent = "VISA";\n' +
      '        else if (raw.startsWith("5")) dispBrand.textContent = "MASTERCARD";\n' +
      '        else if (raw.startsWith("3")) dispBrand.textContent = "AMEX";\n' +
      '        else dispBrand.textContent = "CARD";\n' +
      '      }\n' +
      '    });\n' +
      '  }\n' +
      '  if (inpName && dispName) {\n' +
      '    inpName.addEventListener("input", function() {\n' +
      '      dispName.textContent = inpName.value.toUpperCase() || "ALEXANDRE DUPONT";\n' +
      '    });\n' +
      '  }\n' +
      '  if (inpExp && dispExp) {\n' +
      '    inpExp.addEventListener("input", function() {\n' +
      '      var raw = inpExp.value.replace(/\\D/g, "").substring(0, 4);\n' +
      '      if (raw.length >= 2) raw = raw.substring(0, 2) + "/" + raw.substring(2);\n' +
      '      inpExp.value = raw;\n' +
      '      dispExp.textContent = raw || "08/29";\n' +
      '    });\n' +
      '  }\n' +
      '  if (inpCvv && card && dispCvv) {\n' +
      '    inpCvv.addEventListener("focus", function() {\n' +
      '      isCardFlipped = true;\n' +
      '      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(180deg)";\n' +
      '    });\n' +
      '    inpCvv.addEventListener("blur", function() {\n' +
      '      isCardFlipped = false;\n' +
      '      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";\n' +
      '    });\n' +
      '    inpCvv.addEventListener("input", function() {\n' +
      '      dispCvv.textContent = inpCvv.value || "842";\n' +
      '    });\n' +
      '  }\n\n' +
      '  // 5. Promo Code & Express Checkout\n' +
      '  function updatePrice() {\n' +
      '    var p = (basePrice * (1 - discount / 100)).toFixed(2);\n' +
      '    if (totalBtn) totalBtn.textContent = "$" + p;\n' +
      '    if (dockPrice) dockPrice.textContent = "$" + p;\n' +
      '  }\n' +
      '  if (btnPromo && inpPromo) {\n' +
      '    btnPromo.onclick = function() {\n' +
      '      var code = (inpPromo.value || "").trim().toUpperCase();\n' +
      '      if (code === "VIP25") {\n' +
      '        discount = 25;\n' +
      '        updatePrice();\n' +
      '        alert(isFr ? "🎉 Code promo VIP25 appliqué : -25% !" : "🎉 Promo code VIP25 applied: 25% OFF!");\n' +
      '      } else {\n' +
      '        alert(isFr ? "Code promo invalide. Essayez VIP25" : "Invalid promo code. Try VIP25");\n' +
      '      }\n' +
      '    };\n' +
      '  }\n' +
      '  function handlePayment(method) {\n' +
      '    var p = (basePrice * (1 - discount / 100)).toFixed(2);\n' +
      '    alert(isFr ? \n' +
      '      ("✅ Paiement " + method + " de " + p + "€ validé avec succès ! Reçu émis.") : \n' +
      '      ("✅ " + method + " Payment of $" + p + " confirmed! Digital receipt sent.")\n' +
      '    );\n' +
      '    minimizeToDock();\n' +
      '  }\n' +
      '  if (btnApple) btnApple.onclick = function() { handlePayment("Apple Pay"); };\n' +
      '  if (btnSubmit) btnSubmit.onclick = function() { handlePayment("Card"); };\n' +
      '})();\n' +
      '</script>';

      return markup;
    },

    inject: function() {
      const snippet = this.generateStandaloneSnippet();
      _injectCodeToActiveApp(snippet, /<!-- Ultra 3D Flipping Card & Micro-Fintech Checkout -->[\s\S]*?<\/script>/gi, '3D Card & Fintech Checkout');
      this.close();
    },

    copy: function() {
      _copyCode(this.generateStandaloneSnippet(), 'Fintech Checkout Snippet');
    }
  };

  // ══════════════════════════════════════════════════════════════════════════════
  // 3. ULTRA DYNAMIC SCARCITY ENGINE & 3D FLIP-CLOCK URGENCY TICKER
  // ══════════════════════════════════════════════════════════════════════════════
  window.UltraScarcityCountdown = {
    state: {
      spots: 3,
      hours: 1,
      minutes: 42,
      seconds: 15,
      code: 'FLASH30',
      isActive: true
    },

    open: function() {
      const modal = document.getElementById('modal-scarcity-countdown');
      if (modal) {
        modal.classList.add('show', 'active');
        this.updateDisplay();
      }
    },

    close: function() {
      const modal = document.getElementById('modal-scarcity-countdown');
      if (modal) modal.classList.remove('show', 'active');
    },

    decrementSpot: function() {
      if (this.state.spots > 1) {
        this.state.spots--;
        _sound('click');
      } else {
        this.state.spots = 5;
      }
      this.updateDisplay();
    },

    updateDisplay: function() {
      const spotsEl = document.getElementById('sc-spots-num');
      const meterEl = document.getElementById('sc-meter-fill');
      if (spotsEl) spotsEl.textContent = this.state.spots;
      if (meterEl) meterEl.style.width = (this.state.spots * 20) + '%';
    },

    generateStandaloneSnippet: function() {
      const isFr = _isFr();
      return '<!-- Ultra Dynamic Scarcity Engine & 3D Flip-Clock Ticker -->\n' +
'<div id="ultra-scarcity-bar" style="position:fixed;bottom:0;left:0;width:100%;z-index:9999990;background:linear-gradient(90deg,#991b1b,#7f1d1d);color:#fff;padding:12px 20px;box-shadow:0 -4px 25px rgba(0,0,0,0.5);font-family:system-ui,-apple-system,sans-serif;font-size:13px;font-weight:600;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">\n' +
'  <div style="display:flex;align-items:center;gap:12px;">\n' +
'    <span style="font-size:1.4rem;">🔥</span>\n' +
'    <div>\n' +
'      <div style="font-weight:800;font-size:0.95rem;color:#fff;">' + (isFr ? 'Offre Flash Limitée : -30% Immédiat' : 'Limited-Time Flash Offer: 30% Off') + '</div>\n' +
'      <div style="color:#fecaca;font-size:0.75rem;">' + (isFr ? 'Plus que 3 places disponibles au tarif préférentiel !' : 'Only 3 spots remaining at promotional rate!') + '</div>\n' +
'    </div>\n' +
'  </div>\n\n' +
'  <!-- Flip-Clock Counters -->\n' +
'  <div style="display:flex;align-items:center;gap:6px;">\n' +
'    <div style="background:#0f172a;border:1px solid rgba(255,255,255,0.2);padding:6px 10px;border-radius:6px;font-family:monospace;font-size:1rem;font-weight:800;" id="ultra-sc-hrs">01</div>\n' +
'    <span>:</span>\n' +
'    <div style="background:#0f172a;border:1px solid rgba(255,255,255,0.2);padding:6px 10px;border-radius:6px;font-family:monospace;font-size:1rem;font-weight:800;" id="ultra-sc-min">42</div>\n' +
'    <span>:</span>\n' +
'    <div style="background:#0f172a;border:1px solid rgba(255,255,255,0.2);padding:6px 10px;border-radius:6px;font-family:monospace;font-size:1rem;font-weight:800;color:#fbbf24;" id="ultra-sc-sec">15</div>\n' +
'  </div>\n\n' +
'  <div style="display:flex;align-items:center;gap:10px;">\n' +
'    <button id="ultra-sc-copy-btn" style="background:#fff;color:#991b1b;border:none;padding:8px 16px;border-radius:8px;font-weight:800;font-size:0.8rem;cursor:pointer;">\n' +
'      ' + (isFr ? 'Copier le Code FLASH30' : 'Copy Code FLASH30') + '\n' +
'    </button>\n' +
'    <button onclick="document.getElementById(\'ultra-scarcity-bar\').style.display=\'none\'" style="background:none;border:none;color:#fff;font-size:16px;cursor:pointer;padding:2px 6px;">✕</button>\n' +
'  </div>\n' +
'</div>\n\n' +
'<script>\n' +
'(function() {\n' +
'  var h = 1, m = 42, s = 15;\n' +
'  var elH = document.getElementById("ultra-sc-hrs");\n' +
'  var elM = document.getElementById("ultra-sc-min");\n' +
'  var elS = document.getElementById("ultra-sc-sec");\n' +
'  var copyBtn = document.getElementById("ultra-sc-copy-btn");\n\n' +
'  setInterval(function() {\n' +
'    if (s > 0) s--;\n' +
'    else { s = 59; if (m > 0) m--; else { m = 59; if (h > 0) h--; } }\n' +
'    if (elH) elH.textContent = (h < 10 ? "0" + h : h);\n' +
'    if (elM) elM.textContent = (m < 10 ? "0" + m : m);\n' +
'    if (elS) elS.textContent = (s < 10 ? "0" + s : s);\n' +
'  }, 1000);\n\n' +
'  if (copyBtn) {\n' +
'    copyBtn.onclick = function() {\n' +
'      try { navigator.clipboard.writeText("FLASH30"); } catch(e){}\n' +
'      copyBtn.textContent = "✓ COPIED!";\n' +
'      setTimeout(function() { copyBtn.textContent = "' + (isFr ? 'Copier le Code FLASH30' : 'Copy Code FLASH30') + '"; }, 2000);\n' +
'    };\n' +
'  }\n' +
'})();\n' +
'</script>';
    },

    inject: function() {
      const snippet = this.generateStandaloneSnippet();
      _injectCodeToActiveApp(snippet, /<!-- Ultra Dynamic Scarcity Engine & 3D Flip-Clock Ticker -->[\s\S]*?<\/script>/gi, 'Scarcity Urgency Banner');
      this.close();
    },

    copy: function() {
      _copyCode(this.generateStandaloneSnippet(), 'Scarcity Ticker Snippet');
    }
  };

  // ══════════════════════════════════════════════════════════════════════════════
  // 4. ULTRA IN-APP AI VOICE NAVIGATION & SPEECH-TO-ACTION ASSISTANT
  // ══════════════════════════════════════════════════════════════════════════════
  window.UltraVoiceAssistant = {
    isListening: false,

    open: function() {
      const modal = document.getElementById('modal-voice-assistant');
      if (modal) {
        modal.classList.add('show', 'active');
      }
    },

    close: function() {
      const modal = document.getElementById('modal-voice-assistant');
      if (modal) modal.classList.remove('show', 'active');
    },

    testCommand: function(cmd) {
      const isFr = _isFr();
      _sound('click');
      let feedback = '';

      if (/dark|sombre/i.test(cmd)) {
        feedback = isFr ? 'Thème sombre activé !' : 'Switched to dark theme!';
      } else if (/scroll|bas|top/i.test(cmd)) {
        feedback = isFr ? 'Défilement de la page effectué.' : 'Scrolled page to target section.';
      } else {
        feedback = isFr ? ('Commande vocale exécutée : ' + cmd) : ('Executed voice action: ' + cmd);
      }

      if (typeof window.speechSynthesis !== 'undefined') {
        const u = new SpeechSynthesisUtterance(feedback);
        u.lang = isFr ? 'fr-FR' : 'en-US';
        window.speechSynthesis.speak(u);
      }

      _toast('🎙️ ' + feedback, 'info');
    },

    generateStandaloneSnippet: function() {
      const isFr = _isFr();
      return '<!-- Ultra In-App AI Voice Navigation Assistant -->\n' +
'<div id="ultra-voice-orb" style="position:fixed;bottom:24px;left:24px;z-index:9999990;width:54px;height:54px;border-radius:50%;background:linear-gradient(135deg,#38bdf8,#818cf8,#c084fc);box-shadow:0 0 25px rgba(56,189,248,0.5);display:flex;align-items:center;justify-content:center;cursor:pointer;user-select:none;transition:transform 0.2s ease;">\n' +
'  <span id="ultra-voice-icon" style="font-size:22px;color:#fff;">🎙️</span>\n' +
'</div>\n\n' +
'<script>\n' +
'(function() {\n' +
'  var orb = document.getElementById("ultra-voice-orb");\n' +
'  var isListening = false;\n' +
'  var isFr = (navigator.language || "").indexOf("fr") === 0;\n\n' +
'  function speak(text) {\n' +
'    if (window.speechSynthesis) {\n' +
'      var u = new SpeechSynthesisUtterance(text);\n' +
'      u.lang = isFr ? "fr-FR" : "en-US";\n' +
'      window.speechSynthesis.speak(u);\n' +
'    }\n' +
'  }\n\n' +
'  function handleCmd(txt) {\n' +
'    var lower = txt.toLowerCase();\n' +
'    if (lower.indexOf("top") !== -1 || lower.indexOf("haut") !== -1) {\n' +
'      window.scrollTo({ top: 0, behavior: "smooth" });\n' +
'      speak(isFr ? "Haut de page" : "Scrolled to top");\n' +
'    } else if (lower.indexOf("contact") !== -1 || lower.indexOf("pricing") !== -1) {\n' +
'      var el = document.querySelector("form, [id*=\'contact\'], [id*=\'pricing\']");\n' +
'      if (el) el.scrollIntoView({ behavior: "smooth" });\n' +
'      speak(isFr ? "Section affichée" : "Navigated to section");\n' +
'    } else {\n' +
'      speak(isFr ? "Commande reçue: " + txt : "Voice command: " + txt);\n' +
'    }\n' +
'  }\n\n' +
'  if (orb) {\n' +
'    orb.onclick = function() {\n' +
'      var SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;\n' +
'      if (!SpeechRec) {\n' +
'        var promptCmd = prompt(isFr ? "Entrez une commande vocale (ex: top, contact):" : "Enter voice command (e.g. top, contact):");\n' +
'        if (promptCmd) handleCmd(promptCmd);\n' +
'        return;\n' +
'      }\n' +
'      var rec = new SpeechRec();\n' +
'      rec.lang = isFr ? "fr-FR" : "en-US";\n' +
'      orb.style.boxShadow = "0 0 35px #ef4444";\n' +
'      rec.onresult = function(e) {\n' +
'        var res = e.results[0][0].transcript;\n' +
'        handleCmd(res);\n' +
'      };\n' +
'      rec.onend = function() { orb.style.boxShadow = "0 0 25px rgba(56,189,248,0.5)"; };\n' +
'      rec.start();\n' +
'    };\n' +
'  }\n' +
'})();\n' +
'</script>';
    },

    inject: function() {
      const snippet = this.generateStandaloneSnippet();
      _injectCodeToActiveApp(snippet, /<!-- Ultra In-App AI Voice Navigation Assistant -->[\s\S]*?<\/script>/gi, 'In-App Voice AI Assistant');
      this.close();
    },

    copy: function() {
      _copyCode(this.generateStandaloneSnippet(), 'Voice Assistant Snippet');
    }
  };

  // ══════════════════════════════════════════════════════════════════════════════
  // 5. ULTRA INTERACTIVE ROI / SAVINGS & DYNAMIC TIER CALCULATOR
  // ══════════════════════════════════════════════════════════════════════════════
  window.UltraRoiCalculator = {
    state: {
      users: 2500,
      avgTicket: 85,
      isAnnual: true
    },

    open: function() {
      const modal = document.getElementById('modal-roi-calculator');
      if (modal) {
        modal.classList.add('show', 'active');
        this.updateCalc();
      }
    },

    close: function() {
      const modal = document.getElementById('modal-roi-calculator');
      if (modal) modal.classList.remove('show', 'active');
    },

    setUsers: function(val) {
      this.state.users = parseInt(val, 10);
      this.updateCalc();
    },

    setAvgTicket: function(val) {
      this.state.avgTicket = parseInt(val, 10);
      this.updateCalc();
    },

    toggleBilling: function() {
      this.state.isAnnual = !this.state.isAnnual;
      _sound('click');
      this.updateCalc();
    },

    updateCalc: function() {
      const usersVal = document.getElementById('roi-users-val');
      const ticketVal = document.getElementById('roi-ticket-val');
      const revVal = document.getElementById('roi-revenue-val');
      const hoursVal = document.getElementById('roi-hours-val');
      const multVal = document.getElementById('roi-multiplier-val');

      if (usersVal) usersVal.textContent = this.state.users.toLocaleString();
      if (ticketVal) ticketVal.textContent = '$' + this.state.avgTicket;

      const monthlyRev = Math.round(this.state.users * (this.state.avgTicket * 0.08));
      const hoursSaved = Math.round(this.state.users * 0.024);
      const roiMult = ((monthlyRev / (this.state.isAnnual ? 79 : 99))).toFixed(1);

      if (revVal) revVal.textContent = '$' + monthlyRev.toLocaleString();
      if (hoursVal) hoursVal.textContent = hoursSaved + ' hrs';
      if (multVal) multVal.textContent = roiMult + 'x';
    },

    generateStandaloneSnippet: function() {
      const isFr = _isFr();
      return '<!-- Ultra Interactive ROI & Dynamic Tier Calculator -->\n' +
'<div id="ultra-roi-card" style="max-width:720px;margin:30px auto;background:#0f172a;border:1px solid rgba(255,255,255,0.15);border-radius:18px;padding:26px;color:#fff;font-family:system-ui,-apple-system,sans-serif;box-shadow:0 20px 50px rgba(0,0,0,0.6);">\n' +
'  <div style="text-align:center;margin-bottom:20px;">\n' +
'    <h3 style="font-size:1.4rem;font-weight:800;color:#fff;margin:0 0 6px 0;">' + (isFr ? '📊 Calculez Votre Retour Sur Investissement' : '📊 Interactive ROI & Savings Calculator') + '</h3>\n' +
'    <p style="color:#94a3b8;font-size:0.85rem;margin:0;">' + (isFr ? 'Déplacez les curseurs pour simuler vos gains mensuels immédiats.' : 'Drag sliders to estimate your exact revenue acceleration.') + '</p>\n' +
'  </div>\n\n' +
'  <div style="display:flex;flex-direction:column;gap:18px;margin-bottom:24px;">\n' +
'    <div>\n' +
'      <div style="display:flex;justify-content:space-between;font-size:0.85rem;margin-bottom:6px;">\n' +
'        <span style="color:#cbd5e1;">' + (isFr ? 'Utilisateurs / Transactions mensuelles' : 'Monthly Transactions / Users') + ':</span>\n' +
'        <strong id="ultra-roi-sl-users-val" style="color:#38bdf8;">2,500</strong>\n' +
'      </div>\n' +
'      <input type="range" id="ultra-roi-sl-users" min="500" max="25000" step="250" value="2500" style="width:100%;accent-color:#38bdf8;cursor:pointer;">\n' +
'    </div>\n' +
'    <div>\n' +
'      <div style="display:flex;justify-content:space-between;font-size:0.85rem;margin-bottom:6px;">\n' +
'        <span style="color:#cbd5e1;">' + (isFr ? 'Panier moyen / Valeur du lead' : 'Average Order / Lead Value') + ':</span>\n' +
'        <strong id="ultra-roi-sl-ticket-val" style="color:#38bdf8;">$85</strong>\n' +
'      </div>\n' +
'      <input type="range" id="ultra-roi-sl-ticket" min="10" max="500" step="5" value="85" style="width:100%;accent-color:#38bdf8;cursor:pointer;">\n' +
'    </div>\n' +
'  </div>\n\n' +
'  <!-- KPI Cards Grid -->\n' +
'  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;">\n' +
'    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;text-align:center;">\n' +
'      <div style="font-size:0.75rem;color:#94a3b8;text-transform:uppercase;">' + (isFr ? 'Revenu Additionnel / Mois' : 'Est. Monthly Gain') + '</div>\n' +
'      <div id="ultra-roi-kpi-rev" style="font-size:1.4rem;font-weight:900;color:#10b981;margin-top:4px;">$17,000</div>\n' +
'    </div>\n' +
'    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;text-align:center;">\n' +
'      <div style="font-size:0.75rem;color:#94a3b8;text-transform:uppercase;">' + (isFr ? 'Temps Économisé' : 'Hours Saved / Mo') + '</div>\n' +
'      <div id="ultra-roi-kpi-hours" style="font-size:1.4rem;font-weight:900;color:#38bdf8;margin-top:4px;">60 hrs</div>\n' +
'    </div>\n' +
'    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;text-align:center;">\n' +
'      <div style="font-size:0.75rem;color:#94a3b8;text-transform:uppercase;">' + (isFr ? 'Multiplicateur ROI' : 'ROI Multiplier') + '</div>\n' +
'      <div id="ultra-roi-kpi-mult" style="font-size:1.4rem;font-weight:900;color:#fbbf24;margin-top:4px;">5.2x</div>\n' +
'    </div>\n' +
'  </div>\n' +
'</div>\n\n' +
'<script>\n' +
'(function() {\n' +
'  var slU = document.getElementById("ultra-roi-sl-users");\n' +
'  var slT = document.getElementById("ultra-roi-sl-ticket");\n' +
'  var valU = document.getElementById("ultra-roi-sl-users-val");\n' +
'  var valT = document.getElementById("ultra-roi-sl-ticket-val");\n' +
'  var kpiRev = document.getElementById("ultra-roi-kpi-rev");\n' +
'  var kpiHrs = document.getElementById("ultra-roi-kpi-hours");\n' +
'  var kpiMult = document.getElementById("ultra-roi-kpi-mult");\n\n' +
'  function recalc() {\n' +
'    var u = parseInt(slU.value, 10);\n' +
'    var t = parseInt(slT.value, 10);\n' +
'    valU.textContent = u.toLocaleString();\n' +
'    valT.textContent = "$" + t;\n' +
'    var rev = Math.round(u * (t * 0.08));\n' +
'    var hrs = Math.round(u * 0.024);\n' +
'    var mult = (rev / 89).toFixed(1);\n' +
'    kpiRev.textContent = "$" + rev.toLocaleString();\n' +
'    kpiHrs.textContent = hrs + " hrs";\n' +
'    kpiMult.textContent = mult + "x";\n' +
'  }\n' +
'  if (slU) slU.oninput = recalc;\n' +
'  if (slT) slT.oninput = recalc;\n' +
'})();\n' +
'</script>';
    },

    inject: function() {
      const snippet = this.generateStandaloneSnippet();
      _injectCodeToActiveApp(snippet, /<!-- Ultra Interactive ROI & Dynamic Tier Calculator -->[\s\S]*?<\/script>/gi, 'Interactive ROI Calculator');
      this.close();
    },

    copy: function() {
      _copyCode(this.generateStandaloneSnippet(), 'ROI Calculator Snippet');
    }
  };

  // ══════════════════════════════════════════════════════════════════════════════
  // 6. ULTRA DYNAMIC ADAPTIVE EXPERIENCE & CONTEXT ENGINE
  // ══════════════════════════════════════════════════════════════════════════════
  window.UltraContextAdapter = {
    state: {
      simTime: 'auto',
      simDevice: 'desktop',
      isReturning: true
    },

    open: function() {
      const modal = document.getElementById('modal-context-adapter');
      if (modal) {
        modal.classList.add('show', 'active');
        this.updateContextPreview();
      }
    },

    close: function() {
      const modal = document.getElementById('modal-context-adapter');
      if (modal) modal.classList.remove('show', 'active');
    },

    setSimTime: function(t) {
      this.state.simTime = t;
      _sound('click');
      this.updateContextPreview();
    },

    updateContextPreview: function() {
      const greetingEl = document.getElementById('ca-greeting-text');
      const deviceEl = document.getElementById('ca-device-badge');
      const isFr = _isFr();
      const h = (this.state.simTime === 'morning') ? 9 : (this.state.simTime === 'night' ? 22 : new Date().getHours());

      let greet = '';
      if (h >= 5 && h < 12) {
        greet = isFr ? '☀️ Bonjour ! Commencez votre journée avec nos sélections exclusives.' : '☀️ Good morning! Kickstart your day with curated listings.';
      } else if (h >= 18 || h < 5) {
        greet = isFr ? '🌙 Bonsoir ! Explorez tranquillement vos projets immobiliers.' : '🌙 Good evening! Relax and explore your next home.';
      } else {
        greet = isFr ? '⚡ Bon après-midi ! Découvrez nos opportunités du jour.' : '⚡ Good afternoon! Discover high-yield opportunities.';
      }

      if (greetingEl) greetingEl.textContent = greet;
      if (deviceEl) deviceEl.textContent = this.state.simDevice.toUpperCase();
    },

    generateStandaloneSnippet: function() {
      const isFr = _isFr();
      return '<!-- Ultra Dynamic Adaptive Context Engine -->\n' +
'<div id="ultra-context-banner" style="max-width:800px;margin:20px auto;background:rgba(15,23,42,0.9);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.15);border-radius:14px;padding:14px 20px;display:flex;align-items:center;justify-content:space-between;color:#fff;font-family:system-ui,-apple-system,sans-serif;box-shadow:0 10px 25px rgba(0,0,0,0.4);">\n' +
'  <div style="display:flex;align-items:center;gap:12px;">\n' +
'    <span id="ultra-ctx-icon" style="font-size:1.6rem;">☀️</span>\n' +
'    <div>\n' +
'      <div id="ultra-ctx-title" style="font-weight:800;font-size:0.95rem;color:#fff;">' + (isFr ? 'Bonjour !' : 'Welcome!') + '</div>\n' +
'      <div id="ultra-ctx-sub" style="font-size:0.75rem;color:#94a3b8;">' + (isFr ? 'Offre personnalisée adaptée à votre visite.' : 'Dynamic session personalized for your local timezone.') + '</div>\n' +
'    </div>\n' +
'  </div>\n' +
'  <button onclick="document.getElementById(\'ultra-context-banner\').style.display=\'none\'" style="background:none;border:none;color:#94a3b8;font-size:16px;cursor:pointer;">✕</button>\n' +
'</div>\n\n' +
'<script>\n' +
'(function() {\n' +
'  var h = new Date().getHours();\n' +
'  var isFr = (navigator.language || "").indexOf("fr") === 0;\n' +
'  var icon = document.getElementById("ultra-ctx-icon");\n' +
'  var title = document.getElementById("ultra-ctx-title");\n' +
'  var sub = document.getElementById("ultra-ctx-sub");\n' +
'  var visits = parseInt(localStorage.getItem("ultra_visits_cnt") || "0", 10) + 1;\n' +
'  localStorage.setItem("ultra_visits_cnt", visits);\n\n' +
'  if (h >= 5 && h < 12) {\n' +
'    if (icon) icon.textContent = "☀️";\n' +
'    if (title) title.textContent = isFr ? "Bonjour !" : "Good Morning!";\n' +
'  } else if (h >= 18 || h < 5) {\n' +
'    if (icon) icon.textContent = "🌙";\n' +
'    if (title) title.textContent = isFr ? "Bonsoir !" : "Good Evening!";\n' +
'  } else {\n' +
'    if (icon) icon.textContent = "⚡";\n' +
'    if (title) title.textContent = isFr ? "Bon après-midi !" : "Good Afternoon!";\n' +
'  }\n\n' +
'  if (visits > 1 && sub) {\n' +
'    sub.textContent = isFr ? ("Ravi de vous revoir (Visite #" + visits + ") · Vos préférences sont sauvegardées.") : ("Welcome back (Visit #" + visits + ") · Your preferences are saved.");\n' +
'  }\n' +
'})();\n' +
'</script>';
    },

    inject: function() {
      const snippet = this.generateStandaloneSnippet();
      _injectCodeToActiveApp(snippet, /<!-- Ultra Dynamic Adaptive Context Engine -->[\s\S]*?<\/script>/gi, 'Adaptive Context Engine');
      this.close();
    },

    copy: function() {
      _copyCode(this.generateStandaloneSnippet(), 'Adaptive Context Snippet');
    }
  };

  console.log('✅ Ultra 6 Genius Innovations loaded: BeforeAfter, FintechCheckout, ScarcityCountdown, VoiceAssistant, RoiCalculator, ContextAdapter');
})();
