/**
 * Paywall Studio v1.0 — EN/FR
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: 'Monetize', title: '💰 Paywall Studio', sub: 'Instant Monetization',
    desc: 'Block part of your page and inject a beautiful Premium Paywall overlay. Perfect for demonstrating VIP content or paid subscriptions.',
    inject: '🔒 Inject Paywall Overlay',
    injected: '✅ Paywall injected! Scroll down to see the premium block.'
  },
  fr: {
    tab: 'Monétiser', title: '💰 Studio Paywall', sub: 'Monétisation Instantanée',
    desc: 'Bloquez une partie de votre page et injectez un Paywall Premium. Parfait pour démontrer du contenu VIP ou des abonnements.',
    inject: '🔒 Injecter le Paywall',
    injected: '✅ Paywall injecté ! Faites défiler pour voir le bloc premium.'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var PAYWALL_SCRIPT = `
<!-- 💰 Premium Paywall Overlay -->
<style id="ia-paywall-css">
body {
  /* Prevent full scrolling if paywall is active */
  padding-bottom: 50vh;
}
.ia-paywall-overlay {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60vh;
  background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 30%, rgba(255,255,255,1) 100%);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 50px;
  z-index: 9999;
}
.ia-paywall-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);
  animation: ia-slide-up 0.5s ease-out;
}
@keyframes ia-slide-up {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.ia-paywall-card h3 {
  margin: 0 0 10px;
  color: #111827;
  font-size: 24px;
}
.ia-paywall-card p {
  color: #6b7280;
  margin: 0 0 20px;
  font-size: 15px;
  line-height: 1.5;
}
.ia-paywall-btn {
  background: #10b981;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 14px 24px;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(16,185,129,0.4);
  transition: transform 0.2s;
}
.ia-paywall-btn:hover {
  transform: translateY(-2px);
}
.ia-paywall-footer {
  margin-top: 15px;
  font-size: 12px;
  color: #9ca3af;
}
</style>

<div class="ia-paywall-overlay" id="ia-paywall">
  <div class="ia-paywall-card">
    <h3>💎 Premium Content</h3>
    <p>This section is for VIP members only. Upgrade your account to unlock full access to this article and all premium features.</p>
    <button class="ia-paywall-btn">Unlock for $5.00</button>
    <div class="ia-paywall-footer">Secure payment via Stripe</div>
  </div>
</div>
`;

function injectPaywall() {
  if(!window.editor) return;
  var code = window.editor.getValue();
  
  if(code.includes('ia-paywall-overlay')) {
    if(window.showToast) window.showToast('Paywall already injected!');
    return;
  }

  if(code.includes('</body>')) {
    code = code.replace('</body>', PAYWALL_SCRIPT + '\\n</body>');
  } else {
    code += '\\n' + PAYWALL_SCRIPT;
  }
  
  window.editor.setValue(code);
  if(window.runPreview) window.runPreview();
  if(window.showToast) window.showToast(t('injected'));
}

function renderPaywallTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(16,185,129,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#10b981;">' + t('title') + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:15px;';

  var sec = document.createElement('div');
  sec.style = 'background:rgba(16,185,129,0.05);border:1px solid rgba(16,185,129,0.15);border-radius:8px;padding:12px;text-align:center;';
  
  var icon = document.createElement('div');
  icon.innerHTML = '💰';
  icon.style = 'font-size:40px;margin-bottom:10px;animation: pulse 2s infinite;';
  sec.appendChild(icon);

  var desc = document.createElement('div');
  desc.style = 'font-size:11px;color:#94a3b8;margin-bottom:15px;line-height:1.5;';
  desc.textContent = t('desc');
  sec.appendChild(desc);

  var btn = document.createElement('button');
  btn.textContent = t('inject');
  btn.style = 'width:100%;background:linear-gradient(135deg,#10b981,#047857);border:none;border-radius:6px;padding:10px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;';
  btn.onclick = injectPaywall;
  sec.appendChild(btn);

  body.appendChild(sec);
  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-paywall');
    if(el) el.textContent = t('tab');
    if(window.activeTab==='paywall') renderPaywallTab();
  };

  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='paywall') {
      window.activeTab = 'paywall';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn = document.getElementById('tab-paywall');
      if(btn) btn.classList.add('active');
      renderPaywallTab();
      return;
    }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
