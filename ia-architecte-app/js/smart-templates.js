/**
 * Smart Template Engine v1.0 — EN/FR
 */
(function () {
'use strict';
var TX = {
  en: {
    tab: 'Templates', title: '🤖 Smart Templates', sub: 'Generate complete multi-section sites',
    desc: 'Fill in your details and generate a fully functional, professional multi-section website.',
    generate: '⚡ Generate Site',
    type: 'Site Type',
    name: 'Brand Name',
    theme: 'Primary Color',
    injected: '✅ Site generated!',
    types: {
      portfolio: 'Personal Portfolio',
      saas: 'SaaS / App Landing',
      restaurant: 'Restaurant / Cafe',
      agency: 'Digital Agency'
    }
  },
  fr: {
    tab: 'Modeles', title: '🤖 Modeles Intelligents', sub: 'Generez des sites multi-sections',
    desc: 'Remplissez vos details et generez un site web professionnel complet.',
    generate: '⚡ Generer le Site',
    type: 'Type de Site',
    name: 'Nom de Marque',
    theme: 'Couleur Primaire',
    injected: '✅ Site genere !',
    types: {
      portfolio: 'Portfolio Personnel',
      saas: 'SaaS / Landing App',
      restaurant: 'Restaurant / Cafe',
      agency: 'Agence Digitale'
    }
  }
};
function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }
function tt(k) { return ((TX[gl()] || TX.en).types || TX.en.types)[k] || k; }

function genPortfolio(name, color) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${name} - Portfolio</title>
<style>
  :root { --p: ${color}; --bg: #0f172a; --txt: #f8fafc; }
  body { margin: 0; font-family: 'Inter', sans-serif; background: var(--bg); color: var(--txt); }
  nav { padding: 20px 50px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); }
  .logo { font-size: 1.5rem; font-weight: 900; color: var(--p); }
  .links a { color: var(--txt); text-decoration: none; margin-left: 20px; font-weight: bold; }
  .hero { height: 80vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 0 20px; }
  .hero h1 { font-size: 4rem; margin: 0; }
  .hero h1 span { color: var(--p); }
  .hero p { font-size: 1.2rem; color: #94a3b8; max-width: 600px; }
  .btn { padding: 15px 30px; background: var(--p); color: #fff; text-decoration: none; border-radius: 30px; font-weight: bold; margin-top: 20px; transition: transform 0.2s; display: inline-block; }
  .btn:hover { transform: scale(1.05); }
  .section { padding: 80px 50px; }
  .section-title { font-size: 2.5rem; text-align: center; margin-bottom: 50px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
  .card { background: #1e293b; padding: 30px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.05); transition: transform 0.3s; }
  .card:hover { transform: translateY(-10px); border-color: var(--p); }
  .card h3 { color: var(--p); margin-top: 0; }
  footer { text-align: center; padding: 30px; border-top: 1px solid rgba(255,255,255,0.1); color: #64748b; }
</style>
</head>
<body>
  <nav>
    <div class="logo">${name}</div>
    <div class="links"><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></div>
  </nav>
  
  <section class="hero">
    <h1>Hi, I'm <span>${name}</span></h1>
    <p>A passionate developer and designer building beautiful, functional, and modern web experiences.</p>
    <a href="#contact" class="btn">Let's Talk</a>
  </section>

  <section id="work" class="section">
    <h2 class="section-title">Selected Work</h2>
    <div class="grid">
      <div class="card"><h3>Project Alpha</h3><p>A full-stack e-commerce platform built with modern technologies.</p></div>
      <div class="card"><h3>Project Beta</h3><p>An AI-powered dashboard for data analytics and visualization.</p></div>
      <div class="card"><h3>Project Gamma</h3><p>A sleek mobile-first landing page with high conversion rates.</p></div>
    </div>
  </section>

  <footer>
    © ${new Date().getFullYear()} ${name}. All rights reserved.
  </footer>
</body>
</html>`;
}

function genSaaS(name, color) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${name} - The Ultimate SaaS</title>
<style>
  :root { --p: ${color}; --bg: #ffffff; --txt: #0f172a; }
  body { margin: 0; font-family: 'Inter', sans-serif; background: var(--bg); color: var(--txt); }
  nav { padding: 20px 50px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
  .logo { font-size: 1.5rem; font-weight: 900; color: var(--p); }
  .btn-sm { padding: 10px 20px; background: var(--p); color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold; }
  .hero { padding: 100px 20px; text-align: center; background: linear-gradient(to bottom, rgba(0,0,0,0.02), rgba(0,0,0,0)); }
  .hero h1 { font-size: 3.5rem; max-width: 800px; margin: 0 auto; line-height: 1.2; }
  .hero p { font-size: 1.2rem; color: #64748b; max-width: 600px; margin: 20px auto 40px; }
  .btn { padding: 15px 40px; background: var(--p); color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 1.1rem; }
  .features { padding: 80px 50px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; text-align: center; }
  .icon { font-size: 3rem; margin-bottom: 20px; }
  .pricing { padding: 80px 50px; background: #f8fafc; text-align: center; }
  .price-card { background: #fff; padding: 40px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); display: inline-block; min-width: 300px; border-top: 5px solid var(--p); }
  .price { font-size: 3rem; font-weight: 900; margin: 20px 0; }
  ul { list-style: none; padding: 0; text-align: left; line-height: 2; margin-bottom: 30px; }
  li::before { content: "✓ "; color: var(--p); font-weight: bold; }
</style>
</head>
<body>
  <nav>
    <div class="logo">${name}</div>
    <a href="#" class="btn-sm">Start Free Trial</a>
  </nav>
  
  <header class="hero">
    <h1>Supercharge your workflow with ${name}</h1>
    <p>The all-in-one platform designed to help teams work faster, smarter, and more efficiently.</p>
    <a href="#" class="btn">Get Started Now</a>
  </header>

  <section class="features">
    <div><div class="icon">🚀</div><h3>Lightning Fast</h3><p>Optimized for speed and performance.</p></div>
    <div><div class="icon">🔒</div><h3>Secure by Design</h3><p>Enterprise-grade security built-in.</p></div>
    <div><div class="icon">⚡</div><h3>Automated</h3><p>Save hours with smart automations.</p></div>
  </section>

  <section class="pricing">
    <h2>Simple, transparent pricing</h2>
    <div class="price-card">
      <h3>Pro Plan</h3>
      <div class="price">$29<span style="font-size:1rem;color:#64748b">/mo</span></div>
      <ul><li>Unlimited Projects</li><li>24/7 Support</li><li>Advanced Analytics</li></ul>
      <a href="#" class="btn" style="display:block">Subscribe</a>
    </div>
  </section>
</body>
</html>`;
}

function renderTemplatesTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  
  var wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';
  
  var hdr = document.createElement('div');
  hdr.style.cssText = 'padding:12px 14px 8px;border-bottom:1px solid rgba(59,130,246,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#3b82f6;">' + t('title') + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);
  
  var body = document.createElement('div');
  body.style.cssText = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:12px;';
  
  var desc = document.createElement('div');
  desc.style.cssText = 'font-size:10px;color:#94a3b8;line-height:1.5;';
  desc.textContent = t('desc');
  body.appendChild(desc);

  var typeLbl = document.createElement('label');
  typeLbl.style.cssText = 'font-size:11px;font-weight:bold;color:#e2e8f0;';
  typeLbl.textContent = t('type');
  var typeSel = document.createElement('select');
  typeSel.style.cssText = 'padding:10px;background:#1e293b;border:1px solid #334155;border-radius:6px;color:#fff;font-family:inherit;font-size:12px;';
  typeSel.innerHTML = '<option value="portfolio">' + tt('portfolio') + '</option><option value="saas">' + tt('saas') + '</option>';
  
  var nameLbl = document.createElement('label');
  nameLbl.style.cssText = 'font-size:11px;font-weight:bold;color:#e2e8f0;';
  nameLbl.textContent = t('name');
  var nameInp = document.createElement('input');
  nameInp.type = 'text';
  nameInp.value = 'MyBrand';
  nameInp.style.cssText = 'padding:10px;background:#1e293b;border:1px solid #334155;border-radius:6px;color:#fff;font-family:inherit;font-size:12px;';

  var colorLbl = document.createElement('label');
  colorLbl.style.cssText = 'font-size:11px;font-weight:bold;color:#e2e8f0;';
  colorLbl.textContent = t('theme');
  var colorInp = document.createElement('input');
  colorInp.type = 'color';
  colorInp.value = '#3b82f6';
  colorInp.style.cssText = 'width:100%;height:40px;border:none;border-radius:6px;cursor:pointer;background:none;padding:0;';

  var statusEl = document.createElement('div');
  statusEl.style.cssText = 'font-size:11px;color:#4ade80;text-align:center;font-weight:bold;min-height:14px;';

  var btn = document.createElement('button');
  btn.textContent = t('generate');
  btn.style.cssText = 'width:100%;background:linear-gradient(135deg,#3b82f6,#2563eb);border:none;border-radius:8px;padding:12px;color:#fff;font-weight:900;font-size:12px;cursor:pointer;margin-top:10px;';
  btn.onclick = function() {
    if(!window.editor) return;
    var name = nameInp.value.trim() || 'MyBrand';
    var col = colorInp.value;
    var code = typeSel.value === 'portfolio' ? genPortfolio(name, col) : genSaaS(name, col);
    
    window.editor.setValue(code);
    if(window.runPreview) window.runPreview();
    
    statusEl.textContent = t('injected');
    setTimeout(function(){ statusEl.textContent = ''; }, 2000);
  };

  body.appendChild(typeLbl); body.appendChild(typeSel);
  body.appendChild(nameLbl); body.appendChild(nameInp);
  body.appendChild(colorLbl); body.appendChild(colorInp);
  body.appendChild(statusEl);
  body.appendChild(btn);

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function () {
  var oAL = window.applyLang;
  window.applyLang = function () {
    if (typeof oAL === 'function') oAL();
    var el = document.getElementById('lbl-tab-templates');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'templates') renderTemplatesTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'templates') {
      window.activeTab = 'templates';
      document.querySelectorAll('.ltab').forEach(function (b) { b.classList.remove('active'); });
      var btn = document.getElementById('tab-templates');
      if (btn) btn.classList.add('active');
      renderTemplatesTab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
