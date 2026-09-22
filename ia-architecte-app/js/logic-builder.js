/**
 * Logic Node Builder v1.0 — EN/FR
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: 'Logic Forge', title: '⚙️ Logic Forge', sub: 'Pre-built JS Functions',
    desc: 'Inject real functional Javascript brains into your UI. Add the required classes to your HTML elements, and the injected code will make them work instantly.',
    cart: '🛒 Shopping Cart Logic', cartDesc: 'Adds items to a cart array and updates the .ia-cart-count element.',
    dark: '🌙 Dark Mode Toggle', darkDesc: 'Toggles a .dark-mode class on body and saves to localStorage.',
    search: '🔍 Live Search Filter', searchDesc: 'Filters .ia-search-item elements based on .ia-search-input text.',
    inject: '➕ Inject Logic Node',
    injected: '✅ JS Logic injected successfully! Check the script at the bottom of your code.'
  },
  fr: {
    tab: 'Forge Logique', title: '⚙️ Forge Logique', sub: 'Fonctions JS Pré-construites',
    desc: 'Injectez un vrai cerveau Javascript fonctionnel dans votre UI. Ajoutez les classes requises et le code fera le reste.',
    cart: '🛒 Logique Panier', cartDesc: 'Ajoute les articles et met à jour le compteur .ia-cart-count.',
    dark: '🌙 Bascule Mode Sombre', darkDesc: 'Bascule la classe .dark-mode sur le body et sauvegarde.',
    search: '🔍 Filtre de Recherche', searchDesc: 'Filtre les éléments .ia-search-item selon le texte .ia-search-input.',
    inject: '➕ Injecter le Nœud Logique',
    injected: '✅ Logique JS injectée avec succès !'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var LOGIC_NODES = {
  cart: `
<!-- ⚙️ Shopping Cart Logic -->
<script id="ia-logic-cart">
document.addEventListener('DOMContentLoaded', () => {
  let cart = [];
  const countEls = document.querySelectorAll('.ia-cart-count');
  
  document.querySelectorAll('.ia-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const itemName = e.target.getAttribute('data-name') || 'Item';
      const itemPrice = parseFloat(e.target.getAttribute('data-price') || 0);
      cart.push({ name: itemName, price: itemPrice });
      
      // Animate button
      const origText = btn.innerHTML;
      btn.innerHTML = '✓ Added';
      btn.style.transform = 'scale(1.05)';
      setTimeout(() => {
        btn.innerHTML = origText;
        btn.style.transform = 'scale(1)';
      }, 1000);
      
      // Update counts
      countEls.forEach(el => el.textContent = cart.length);
      console.log('Cart updated:', cart);
    });
  });
});
</script>
`,
  dark: `
<!-- ⚙️ Dark Mode Logic -->
<script id="ia-logic-dark">
document.addEventListener('DOMContentLoaded', () => {
  const isDark = localStorage.getItem('ia-dark-mode') === 'true';
  if(isDark) document.body.classList.add('dark-mode');
  
  document.querySelectorAll('.ia-theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const currentDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('ia-dark-mode', currentDark);
    });
  });
});
</script>
<style>
/* Add your dark mode variables here */
body.dark-mode { background-color: #121212; color: #ffffff; }
body.dark-mode .card { background-color: #1e1e1e; color: #ffffff; border-color: #333; }
</style>
`,
  search: `
<!-- ⚙️ Live Search Logic -->
<script id="ia-logic-search">
document.addEventListener('DOMContentLoaded', () => {
  const inputs = document.querySelectorAll('.ia-search-input');
  
  inputs.forEach(input => {
    input.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      document.querySelectorAll('.ia-search-item').forEach(item => {
        const text = item.textContent.toLowerCase();
        if(text.includes(term)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});
</script>
`
};

function injectLogic(id) {
  if(!window.editor) return;
  var code = window.editor.getValue();
  var snippet = LOGIC_NODES[id];
  if(!snippet) return;

  if(code.includes(snippet.split('\\n')[1])) { // rudimentary check if already injected
    if(window.showToast) window.showToast('Logic already injected!');
    return;
  }

  if(code.includes('</body>')) {
    code = code.replace('</body>', snippet + '\\n</body>');
  } else {
    code += '\\n' + snippet;
  }
  
  window.editor.setValue(code);
  if(window.runPreview) window.runPreview();
  if(window.showToast) window.showToast(t('injected'));
}

function renderLogicTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(168,85,247,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#c084fc;">' + t('title') + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:15px;';

  var desc = document.createElement('div');
  desc.style = 'font-size:11px;color:#94a3b8;line-height:1.5;margin-bottom:5px;';
  desc.textContent = t('desc');
  body.appendChild(desc);

  function createBlock(id, icon, titleKey, descKey) {
    var sec = document.createElement('div');
    sec.style = 'background:rgba(168,85,247,0.05);border:1px solid rgba(168,85,247,0.15);border-radius:8px;padding:12px;';
    
    var h = document.createElement('div');
    h.style = 'display:flex;align-items:center;gap:8px;margin-bottom:6px;';
    h.innerHTML = '<span style="font-size:16px;">' + icon + '</span><span style="font-size:12px;font-weight:bold;color:#e9d5ff;">' + t(titleKey) + '</span>';
    sec.appendChild(h);

    var d = document.createElement('div');
    d.style = 'font-size:10px;color:#94a3b8;margin-bottom:10px;line-height:1.4;';
    d.textContent = t(descKey);
    sec.appendChild(d);

    var btn = document.createElement('button');
    btn.textContent = t('inject');
    btn.style = 'width:100%;background:linear-gradient(135deg,#a855f7,#7e22ce);border:none;border-radius:6px;padding:8px;color:#fff;font-weight:bold;font-size:10px;cursor:pointer;';
    btn.onclick = function() { injectLogic(id); };
    sec.appendChild(btn);

    return sec;
  }

  body.appendChild(createBlock('cart', '🛒', 'cart', 'cartDesc'));
  body.appendChild(createBlock('dark', '🌙', 'dark', 'darkDesc'));
  body.appendChild(createBlock('search', '🔍', 'search', 'searchDesc'));

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-logicforge');
    if(el) el.textContent = t('tab');
    if(window.activeTab==='logicforge') renderLogicTab();
  };

  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='logicforge') {
      window.activeTab = 'logicforge';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn = document.getElementById('tab-logicforge');
      if(btn) btn.classList.add('active');
      renderLogicTab();
      return;
    }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
