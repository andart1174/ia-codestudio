/**
 * Mock Data Injector v1.0 — EN/FR
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: 'Mock Data', title: '📝 Mock Data Injector', sub: 'Fake Content Generator',
    desc: 'Stop writing "Lorem Ipsum". Inject beautiful, realistic fake data (Users, Products) directly into your layout.',
    users: '👨‍💼 5 Fake Users', usersDesc: 'Injects 5 profile cards with avatars, names, and job titles.',
    products: '🛍️ 3 Fake Products', productsDesc: 'Injects 3 product cards with images, titles, and prices.',
    inject: '➕ Inject Data',
    injected: '✅ Mock data injected successfully!'
  },
  fr: {
    tab: 'Fausse Donnée', title: '📝 Injecteur Fausse Donnée', sub: 'Générateur de Contenu',
    desc: 'Arrêtez le "Lorem Ipsum". Injectez de belles fausses données réalistes (Utilisateurs, Produits) directement.',
    users: '👨‍💼 5 Utilisateurs', usersDesc: 'Injecte 5 cartes de profil avec avatars, noms et postes.',
    products: '🛍️ 3 Produits', productsDesc: 'Injecte 3 cartes produits avec images, titres et prix.',
    inject: '➕ Injecter',
    injected: '✅ Fausse donnée injectée avec succès !'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var MOCK_DATA = {
  users: `
<!-- 📝 Mock Users Data -->
<style>
.ia-mock-users { display:flex; gap:15px; flex-wrap:wrap; padding:20px; font-family:sans-serif; }
.ia-mock-user { background:#fff; border:1px solid #e2e8f0; border-radius:10px; padding:15px; width:200px; text-align:center; box-shadow:0 4px 6px rgba(0,0,0,0.05); }
.ia-mock-user img { width:80px; height:80px; border-radius:50%; margin-bottom:10px; object-fit:cover; }
.ia-mock-user h4 { margin:0 0 5px; color:#1e293b; font-size:16px; }
.ia-mock-user p { margin:0; color:#64748b; font-size:13px; }
</style>
<div class="ia-mock-users">
  <div class="ia-mock-user"><img src="https://i.pravatar.cc/150?u=1" alt="User"><h4>Alex Johnson</h4><p>Frontend Developer</p></div>
  <div class="ia-mock-user"><img src="https://i.pravatar.cc/150?u=2" alt="User"><h4>Sarah Williams</h4><p>UI/UX Designer</p></div>
  <div class="ia-mock-user"><img src="https://i.pravatar.cc/150?u=3" alt="User"><h4>Michael Brown</h4><p>Product Manager</p></div>
  <div class="ia-mock-user"><img src="https://i.pravatar.cc/150?u=4" alt="User"><h4>Emily Davis</h4><p>Data Scientist</p></div>
  <div class="ia-mock-user"><img src="https://i.pravatar.cc/150?u=5" alt="User"><h4>David Miller</h4><p>Backend Engineer</p></div>
</div>
`,
  products: `
<!-- 📝 Mock Products Data -->
<style>
.ia-mock-prods { display:flex; gap:20px; flex-wrap:wrap; padding:20px; font-family:sans-serif; }
.ia-mock-prod { background:#fff; border-radius:12px; overflow:hidden; width:250px; box-shadow:0 10px 15px -3px rgba(0,0,0,0.1); }
.ia-mock-prod img { width:100%; height:180px; object-fit:cover; }
.ia-mock-prod-body { padding:15px; }
.ia-mock-prod h4 { margin:0 0 10px; font-size:18px; color:#0f172a; }
.ia-mock-prod .price { font-size:20px; font-weight:bold; color:#10b981; margin-bottom:15px; }
.ia-mock-prod button { width:100%; background:#0f172a; color:#fff; border:none; padding:10px; border-radius:6px; cursor:pointer; font-weight:bold; }
</style>
<div class="ia-mock-prods">
  <div class="ia-mock-prod">
    <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80" alt="Headphones">
    <div class="ia-mock-prod-body"><h4>Premium Headphones</h4><div class="price">$299.99</div><button>Add to Cart</button></div>
  </div>
  <div class="ia-mock-prod">
    <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80" alt="Watch">
    <div class="ia-mock-prod-body"><h4>Smart Watch Series 7</h4><div class="price">$399.00</div><button>Add to Cart</button></div>
  </div>
  <div class="ia-mock-prod">
    <img src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80" alt="Camera">
    <div class="ia-mock-prod-body"><h4>DSLR Camera 4K</h4><div class="price">$899.50</div><button>Add to Cart</button></div>
  </div>
</div>
`
};

function injectMockData(id) {
  if(!window.editor) return;
  var code = window.editor.getValue();
  var snippet = MOCK_DATA[id];
  if(!snippet) return;

  if(code.includes('</body>')) {
    code = code.replace('</body>', snippet + '\\n</body>');
  } else {
    code += '\\n' + snippet;
  }
  
  window.editor.setValue(code);
  if(window.runPreview) window.runPreview();
  if(window.showToast) window.showToast(t('injected'));
}

function renderMockDataTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(16,185,129,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#34d399;">' + t('title') + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:15px;';

  var desc = document.createElement('div');
  desc.style = 'font-size:11px;color:#94a3b8;line-height:1.5;margin-bottom:5px;';
  desc.textContent = t('desc');
  body.appendChild(desc);

  function createBlock(id, icon, titleKey, descKey) {
    var sec = document.createElement('div');
    sec.style = 'background:rgba(16,185,129,0.05);border:1px solid rgba(16,185,129,0.15);border-radius:8px;padding:12px;';
    
    var h = document.createElement('div');
    h.style = 'display:flex;align-items:center;gap:8px;margin-bottom:6px;';
    h.innerHTML = '<span style="font-size:16px;">' + icon + '</span><span style="font-size:12px;font-weight:bold;color:#6ee7b7;">' + t(titleKey) + '</span>';
    sec.appendChild(h);

    var d = document.createElement('div');
    d.style = 'font-size:10px;color:#94a3b8;margin-bottom:10px;';
    d.textContent = t(descKey);
    sec.appendChild(d);

    var btn = document.createElement('button');
    btn.textContent = t('inject');
    btn.style = 'width:100%;background:rgba(16,185,129,0.2);border:1px solid rgba(16,185,129,0.4);border-radius:6px;padding:8px;color:#fff;font-weight:bold;font-size:10px;cursor:pointer;';
    btn.onclick = function() { injectMockData(id); };
    sec.appendChild(btn);

    return sec;
  }

  body.appendChild(createBlock('users', '👨‍💼', 'users', 'usersDesc'));
  body.appendChild(createBlock('products', '🛍️', 'products', 'productsDesc'));

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-mockdata');
    if(el) el.textContent = t('tab');
    if(window.activeTab==='mockdata') renderMockDataTab();
  };

  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='mockdata') {
      window.activeTab = 'mockdata';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn = document.getElementById('tab-mockdata');
      if(btn) btn.classList.add('active');
      renderMockDataTab();
      return;
    }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
