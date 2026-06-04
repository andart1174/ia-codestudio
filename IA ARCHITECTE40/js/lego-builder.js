/**
 * Component Forge (Lego Builder) v1.0 — EN/FR
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: 'Component Forge', title: '🧱 Component Forge', sub: 'Lego-Style Builder',
    desc: 'Stop writing boilerplate. Inject pre-built, fully responsive, professional UI components directly into your code with one click.',
    nav: 'Modern Navbar', navDesc: 'Responsive top navigation with logo and links.',
    hero: 'Hero Section', heroDesc: 'Main landing area with gradient text and CTA buttons.',
    cards: 'Pricing Cards', cardsDesc: 'Three elegant pricing tiers with hover effects.',
    footer: 'Dark Footer', footerDesc: 'Standard bottom footer with links and copyright.',
    inject: '➕ Insert Component',
    injected: '✅ Component inserted successfully!'
  },
  fr: {
    tab: 'Forge Composants', title: '🧱 Forge de Composants', sub: 'Constructeur style Lego',
    desc: 'Arrêtez d\'écrire du code répétitif. Injectez des composants UI professionnels et responsifs en un clic.',
    nav: 'Navbar Moderne', navDesc: 'Navigation haute avec logo et liens.',
    hero: 'Section Hero', heroDesc: 'Zone d\'accueil principale avec texte dégradé et boutons.',
    cards: 'Cartes de Prix', cardsDesc: 'Trois niveaux de prix élégants avec effets de survol.',
    footer: 'Footer Sombre', footerDesc: 'Pied de page standard avec liens et copyright.',
    inject: '➕ Insérer le Composant',
    injected: '✅ Composant inséré avec succès !'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var COMPONENTS = {
  nav: `
<!-- 🧱 Navbar Component -->
<nav style="display:flex; justify-content:space-between; align-items:center; padding:15px 30px; background:#1e293b; color:#fff; border-bottom:1px solid #334155;">
  <div style="font-size:20px; font-weight:bold; letter-spacing:1px; color:#38bdf8;">Brand.</div>
  <div style="display:flex; gap:20px;">
    <a href="#" style="color:#cbd5e1; text-decoration:none; font-size:14px;">Home</a>
    <a href="#" style="color:#cbd5e1; text-decoration:none; font-size:14px;">Features</a>
    <a href="#" style="color:#cbd5e1; text-decoration:none; font-size:14px;">Contact</a>
  </div>
  <button style="background:#38bdf8; color:#0f172a; border:none; padding:8px 16px; border-radius:6px; font-weight:bold; cursor:pointer;">Sign Up</button>
</nav>
`,
  hero: `
<!-- 🧱 Hero Section Component -->
<section style="padding:100px 20px; text-align:center; background:linear-gradient(180deg, #0f172a 0%, #1e293b 100%); color:#f8fafc;">
  <h1 style="font-size:48px; margin-bottom:20px; background:linear-gradient(90deg, #38bdf8, #818cf8); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">Build Faster, Build Better</h1>
  <p style="font-size:18px; color:#94a3b8; max-width:600px; margin:0 auto 40px; line-height:1.6;">Join thousands of developers building the future of the web with our revolutionary visual tools and AI-powered engine.</p>
  <div style="display:flex; justify-content:center; gap:15px;">
    <button style="background:#818cf8; color:#fff; border:none; padding:12px 24px; border-radius:8px; font-size:16px; font-weight:bold; cursor:pointer;">Get Started Free</button>
    <button style="background:transparent; color:#cbd5e1; border:1px solid #475569; padding:12px 24px; border-radius:8px; font-size:16px; font-weight:bold; cursor:pointer;">View Documentation</button>
  </div>
</section>
`,
  cards: `
<!-- 🧱 Pricing Cards Component -->
<style>
.ia-pricing-wrap { display:flex; gap:20px; justify-content:center; padding:50px 20px; background:#0f172a; flex-wrap:wrap; }
.ia-card { background:#1e293b; border:1px solid #334155; border-radius:12px; padding:30px; width:280px; text-align:center; color:#fff; transition:transform 0.3s; }
.ia-card:hover { transform:translateY(-10px); border-color:#38bdf8; }
.ia-card h3 { margin:0 0 15px; color:#94a3b8; }
.ia-card .price { font-size:36px; font-weight:bold; margin-bottom:20px; color:#f8fafc; }
.ia-card ul { list-style:none; padding:0; margin:0 0 30px; color:#cbd5e1; font-size:14px; line-height:2; }
.ia-card button { width:100%; background:#334155; color:#fff; border:none; padding:10px; border-radius:6px; cursor:pointer; font-weight:bold; }
.ia-card.featured { background:linear-gradient(180deg, #1e293b, #312e81); border-color:#818cf8; }
.ia-card.featured button { background:#818cf8; }
</style>
<div class="ia-pricing-wrap">
  <div class="ia-card">
    <h3>Starter</h3><div class="price">$9<span style="font-size:14px;color:#64748b;">/mo</span></div>
    <ul><li>1 Project</li><li>Basic Support</li><li>1GB Storage</li></ul>
    <button>Choose Starter</button>
  </div>
  <div class="ia-card featured">
    <h3 style="color:#a5b4fc;">Pro</h3><div class="price">$29<span style="font-size:14px;color:#64748b;">/mo</span></div>
    <ul><li>10 Projects</li><li>Priority Support</li><li>10GB Storage</li></ul>
    <button>Choose Pro</button>
  </div>
  <div class="ia-card">
    <h3>Enterprise</h3><div class="price">$99<span style="font-size:14px;color:#64748b;">/mo</span></div>
    <ul><li>Unlimited Projects</li><li>24/7 Support</li><li>Unlimited Storage</li></ul>
    <button>Choose Enterprise</button>
  </div>
</div>
`,
  footer: `
<!-- 🧱 Footer Component -->
<footer style="background:#020617; color:#64748b; padding:40px 20px; text-align:center; font-size:14px; border-top:1px solid #1e293b;">
  <div style="margin-bottom:20px; display:flex; justify-content:center; gap:20px;">
    <a href="#" style="color:#94a3b8; text-decoration:none;">Terms of Service</a>
    <a href="#" style="color:#94a3b8; text-decoration:none;">Privacy Policy</a>
    <a href="#" style="color:#94a3b8; text-decoration:none;">Contact Us</a>
  </div>
  <div>&copy; 2026 Your Company. All rights reserved.</div>
</footer>
`
};

function injectComponent(id) {
  if(!window.editor) return;
  var code = window.editor.getValue();
  var snippet = COMPONENTS[id];
  if(!snippet) return;

  // Insert before </body> if present, else append
  if(code.includes('</body>')) {
    code = code.replace('</body>', snippet + '\\n</body>');
  } else {
    code += '\\n' + snippet;
  }
  
  window.editor.setValue(code);
  if(window.runPreview) window.runPreview();
  if(window.showToast) window.showToast(t('injected'));
}

function renderLegoTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(59,130,246,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#60a5fa;">' + t('title') + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:15px;';

  var desc = document.createElement('div');
  desc.style = 'font-size:11px;color:#94a3b8;line-height:1.5;margin-bottom:5px;';
  desc.textContent = t('desc');
  body.appendChild(desc);

  function createBlock(id, icon, titleKey, descKey) {
    var sec = document.createElement('div');
    sec.style = 'background:rgba(59,130,246,0.05);border:1px solid rgba(59,130,246,0.15);border-radius:8px;padding:12px;';
    
    var h = document.createElement('div');
    h.style = 'display:flex;align-items:center;gap:8px;margin-bottom:6px;';
    h.innerHTML = '<span style="font-size:16px;">' + icon + '</span><span style="font-size:12px;font-weight:bold;color:#bfdbfe;">' + t(titleKey) + '</span>';
    sec.appendChild(h);

    var d = document.createElement('div');
    d.style = 'font-size:10px;color:#94a3b8;margin-bottom:10px;';
    d.textContent = t(descKey);
    sec.appendChild(d);

    var btn = document.createElement('button');
    btn.textContent = t('inject');
    btn.style = 'width:100%;background:rgba(59,130,246,0.2);border:1px solid rgba(59,130,246,0.4);border-radius:6px;padding:8px;color:#fff;font-weight:bold;font-size:10px;cursor:pointer;';
    btn.onclick = function() { injectComponent(id); };
    sec.appendChild(btn);

    return sec;
  }

  body.appendChild(createBlock('nav', '🧭', 'nav', 'navDesc'));
  body.appendChild(createBlock('hero', '🚀', 'hero', 'heroDesc'));
  body.appendChild(createBlock('cards', '💳', 'cards', 'cardsDesc'));
  body.appendChild(createBlock('footer', '🦶', 'footer', 'footerDesc'));

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-legobuilder');
    if(el) el.textContent = t('tab');
    if(window.activeTab==='legobuilder') renderLegoTab();
  };

  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='legobuilder') {
      window.activeTab = 'legobuilder';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn = document.getElementById('tab-legobuilder');
      if(btn) btn.classList.add('active');
      renderLegoTab();
      return;
    }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
