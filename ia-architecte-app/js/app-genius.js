'use strict';
/* IA Architecte — App Genius Engine | Logic & Functionality Library */

window.AppGenius = (() => {
  const LOGIC_PATTERNS = [
    {
      icon: '🔢',
      en: 'Counter Logic',
      fr: 'Logique de Compteur',
      desc_en: 'Add a stateful counter with increase/decrease functions.',
      desc_fr: 'Ajouter un compteur d\'état avec des fonctions +/-.',
      code: `
<script>
  // App Genius: Counter State
  let count = 0;
  function updateCounter() {
    const el = document.getElementById('app-counter');
    if(el) el.textContent = count;
  }
  function increment() { count++; updateCounter(); }
  function decrement() { count--; updateCounter(); }
</script>
<div style="text-align:center;padding:20px;background:rgba(255,255,255,0.05);border-radius:15px;margin:10px 0;">
  <h2 id="app-counter" style="font-size:48px;margin-bottom:10px;">0</h2>
  <button onclick="decrement()" style="padding:10px 20px;cursor:pointer;">-</button>
  <button onclick="increment()" style="padding:10px 20px;cursor:pointer;">+</button>
</div>
`
    },
    {
      icon: '💾',
      en: 'Local Storage Save',
      fr: 'Sauvegarde Locale',
      desc_en: 'Save user input to the browser permanently.',
      desc_fr: 'Sauvegarder la saisie utilisateur de façon permanente.',
      code: `
<script>
  // App Genius: Persistence Layer
  function saveToAppData(key, value) {
    localStorage.setItem('ia_arch_' + key, value);
    alert('Data saved! (Donnée sauvée!)');
  }
  function loadFromAppData(key) {
    return localStorage.getItem('ia_arch_' + key);
  }
</script>
`
    },
    {
      icon: '☁️',
      en: 'Crypto Price Tracker',
      fr: 'Suivi Prix Crypto',
      desc_en: 'Connect to a live API to show Bitcoin price.',
      desc_fr: 'Connexion API pour afficher le prix du Bitcoin.',
      code: `
<script>
  // App Genius: API Connector
  async function fetchCrypto() {
    try {
      const res = await fetch('https://api.coincap.io/v2/assets/bitcoin');
      const data = await res.json();
      document.getElementById('btc-price').textContent = '$' + parseFloat(data.data.priceUsd).toFixed(2);
    } catch(e) { console.error('API Error'); }
  }
  setInterval(fetchCrypto, 10000); // Update every 10s
</script>
<div style="padding:20px;background:#1a1a1a;border:1px solid #f7931a;border-radius:15px;color:#f7931a;text-align:center;">
  <div style="font-size:12px;font-weight:bold;margin-bottom:5px;">BITCOIN LIVE</div>
  <div id="btc-price" style="font-size:24px;font-weight:900;">Loading...</div>
</div>
`
    },
    {
      icon: '📝',
      en: 'Smart Todo List',
      fr: 'Liste de Tâches',
      desc_en: 'A functional task manager with delete action.',
      desc_fr: 'Gestionnaire de tâches avec action de suppression.',
      code: `
<script>
  // App Genius: Task Management
  function addTask() {
    const input = document.getElementById('todo-input');
    if(!input.value) return;
    const list = document.getElementById('todo-list');
    const li = document.createElement('li');
    li.innerHTML = '<span>' + input.value + '</span> <button onclick="this.parentElement.remove()" style="margin-left:10px;color:red;">×</button>';
    li.style.marginBottom = '5px';
    list.appendChild(li);
    input.value = '';
  }
</script>
<div style="padding:20px;background:rgba(255,255,255,0.03);border-radius:15px;">
  <input id="todo-input" type="text" placeholder="Add task..." style="padding:8px;border-radius:5px;border:1px solid #333;background:#000;color:#fff;">
  <button onclick="addTask()" style="padding:8px 15px;background:#3b82f6;color:#fff;border:none;border-radius:5px;cursor:pointer;">Add</button>
  <ul id="todo-list" style="margin-top:15px;list-style:none;padding:0;"></ul>
</div>
`
    },
    {
      icon: '🛡️',
      en: 'Real Login Auth',
      fr: 'Auth Connexion Réelle',
      desc_en: 'Inject real Authentication logic with GeniusAuth.',
      desc_fr: 'Injecter une logique d\'Authentication réelle.',
      code: `
<script>
  // Genius Engine: Real Auth Logic
  async function handleRealLogin(e) {
    e.preventDefault();
    const email = document.getElementById('auth-email').value;
    const pass = document.getElementById('auth-pass').value;
    if(window.GeniusCore?.Auth.login(email, pass)) {
      window.GeniusCore.UI.toast('Login Successful (Connexion Réussie!)');
      document.getElementById('auth-status').textContent = 'Welcome, ' + email;
    } else {
      alert('Invalid Credentials');
    }
  }
</script>
<div id="auth-status" style="padding:10px;text-align:center;color:#3b82f6;font-weight:bold;"></div>
<form onsubmit="handleRealLogin(event)" style="padding:20px;background:rgba(255,255,255,0.05);border-radius:15px;">
  <input id="auth-email" type="email" placeholder="Email" required style="width:100%;margin-bottom:10px;padding:10px;background:#111;border:1px solid #333;color:#fff;border-radius:5px;">
  <input id="auth-pass" type="password" placeholder="Password" required style="width:100%;margin-bottom:15px;padding:10px;background:#111;border:1px solid #333;color:#fff;border-radius:5px;">
  <button type="submit" style="width:100%;padding:12px;background:#3b82f6;color:#fff;border:none;border-radius:5px;cursor:pointer;font-weight:bold;">Log In (Connexion)</button>
</form>
`
    },
    {
      icon: '📊',
      en: 'Real CRUD Table',
      fr: 'Table CRUD Réelle',
      desc_en: 'A table connected to GeniusDB for persistence.',
      desc_fr: 'Un tableau connecté à GeniusDB pour persistance.',
      code: `
<script>
  // Genius Engine: Real DB Logic
  async function loadItems() {
    const list = await window.GeniusCore?.DB.load('my_items') || [];
    const tbody = document.getElementById('data-body');
    if(!tbody) return;
    tbody.innerHTML = list.map(item => '<tr><td style="padding:10px;border:1px solid #222;">' + item.name + '</td><td style="padding:10px;border:1px solid #222;"><button onclick="deleteItem(' + item.id + ')" style="color:red;background:none;border:none;cursor:pointer;">Delete</button></td></tr>').join('');
  }
  async function addItem() {
    const inp = document.getElementById('item-name');
    if(!inp.value) return;
    await window.GeniusCore?.DB.push('my_items', { name: inp.value });
    inp.value = ''; loadItems();
  }
  async function deleteItem(id) {
    if(!confirm('Delete item?')) return;
    await window.GeniusCore?.DB.remove('my_items', id);
    loadItems();
  }
  // Initialize
  setTimeout(loadItems, 500);
</script>
<div style="background:#0f172a;padding:25px;border-radius:20px;border:1px solid #1e293b;">
  <div style="display:flex;gap:10px;margin-bottom:20px;">
    <input id="item-name" placeholder="Item name..." style="flex:1;padding:10px;background:#000;border:1px solid #333;color:#fff;border-radius:8px;">
    <button onclick="addItem()" style="padding:10px 20px;background:#10b981;color:#fff;border:none;border-radius:8px;font-weight:900;cursor:pointer;">Add</button>
  </div>
  <table style="width:100%;border-collapse:collapse;color:#fff;">
    <thead style="background:#1e293b;"><tr><th style="padding:12px;text-align:left;">Name</th><th style="width:80px;padding:12px;">Action</th></tr></thead>
    <tbody id="data-body"></tbody>
  </table>
</div>
`
    }
  ];

  const BUSINESS_KITS = [
    {
      id: 'ecommerce',
      icon: '🛒',
      en: 'E-commerce Core',
      fr: 'Noyau E-commerce',
      desc_en: 'Shopping cart, product grid, and checkout logic.',
      desc_fr: 'Panier, grille de produits et logique de paiement.',
      code: `
<div id="shop-app" style="font-family:sans-serif;color:#fff;background:#0f172a;padding:20px;border-radius:20px;border:1px solid #1e293b;">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
    <h2 style="margin:0;">🚀 MiniShop</h2>
    <div onclick="toggleCart()" style="cursor:pointer;background:#3b82f6;padding:8px 15px;border-radius:10px;font-weight:bold;">
      🛒 Cart (<span id="cart-count">0</span>)
    </div>
  </div>
  
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;" id="product-list">
    <div style="background:#1e293b;padding:15px;border-radius:15px;text-align:center;">
      <div style="font-size:40px;">📱</div>
      <b style="display:block;margin:10px 0;">iPhone Pro</b>
      <button onclick="addToCart('iPhone Pro', 999)" style="width:100%;padding:8px;background:#10b981;border:none;border-radius:8px;color:#fff;font-weight:bold;cursor:pointer;">$999</button>
    </div>
    <div style="background:#1e293b;padding:15px;border-radius:15px;text-align:center;">
      <div style="font-size:40px;">💻</div>
      <b style="display:block;margin:10px 0;">MacBook Air</b>
      <button onclick="addToCart('MacBook Air', 1299)" style="width:100%;padding:8px;background:#10b981;border:none;border-radius:8px;color:#fff;font-weight:bold;cursor:pointer;">$1299</button>
    </div>
  </div>

  <div id="cart-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.85);backdrop-filter:blur(5px);padding:40px;z-index:9999;">
    <div style="background:#1e293b;max-width:400px;margin:auto;padding:25px;border-radius:20px;border:1px solid #334155;">
      <h3>Your Cart</h3>
      <div id="cart-items" style="margin:20px 0;max-height:200px;overflow:auto;"></div>
      <div style="font-weight:bold;font-size:18px;margin-bottom:20px;">Total: $<span id="cart-total">0</span></div>
      <button onclick="checkout()" style="width:100%;padding:14px;background:#3b82f6;color:#fff;border:none;border-radius:10px;font-weight:900;cursor:pointer;">CHECKOUT</button>
      <button onclick="toggleCart()" style="width:100%;margin-top:10px;background:none;color:#64748b;border:none;cursor:pointer;">Close</button>
    </div>
  </div>
</div>
<script>
  let cart = [];
  async function initShop() {
    cart = await window.GeniusCore?.DB.load('shop_cart') || [];
    updateCartUI();
  }
  function toggleCart() { const m = document.getElementById('cart-modal'); m.style.display = m.style.display==='none'?'flex':'none'; }
  async function addToCart(name, price) {
    cart.push({ id: Date.now(), name, price });
    await window.GeniusCore?.DB.save('shop_cart', cart);
    updateCartUI();
    window.GeniusCore?.UI.toast('Added to cart!');
  }
  function updateCartUI() {
    document.getElementById('cart-count').textContent = cart.length;
    document.getElementById('cart-total').textContent = cart.reduce((sum, i) => sum + i.price, 0);
    document.getElementById('cart-items').innerHTML = cart.map(i => {
      return '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #334155;"><span>' + i.name + '</span><b>$' + i.price + '</b></div>';
    }).join('');
  }
  function checkout() { alert('Order Placed!'); cart=[]; updateCartUI(); toggleCart(); }
  setTimeout(initShop, 500);
</script>
`
    },
    {
      id: 'blog',
      icon: '✍️',
      en: 'Blog Engine',
      fr: 'Moteur de Blog',
      desc_en: 'News list with search and dynamic storage.',
      desc_fr: 'Liste d\'actus avec recherche et stockage dynamique.',
      code: `
<div id="blog-app" style="font-family:sans-serif;color:#fff;background:#0f172a;padding:25px;border-radius:20px;border:1px solid #1e293b;">
  <h2>📰 Tech Insights</h2>
  <input type="text" id="blog-search" onkeyup="renderBlog()" placeholder="Search..." style="width:100%;padding:12px;background:#000;border:1px solid #334155;border-radius:10px;color:#fff;margin-bottom:20px;">
  <div id="blog-posts" style="display:flex;flex-direction:column;gap:15px;"></div>
</div>
<script>
  const POSTS = [
    { title: 'The Future of AI', desc: 'How neural networks are changing everything...', icon: '🤖' },
    { title: 'Web3 Design', desc: 'Glassmorphism and beyond in the decentralized web.', icon: '🌑' }
  ];
  function renderBlog() {
    const q = document.getElementById('blog-search').value.toLowerCase();
    document.getElementById('blog-posts').innerHTML = POSTS.filter(p => p.title.toLowerCase().includes(q)).map(p => {
       return '<div style="background:#1e293b;padding:15px;border-radius:12px;"><b>' + p.icon + ' ' + p.title + '</b><p style="font-size:13px;color:#94a3b8;margin-top:8px;">' + p.desc + '</p></div>';
    }).join('');
  }
  renderBlog();
</script>
`
    }
  ];

  const functionalize = (html) => {
    let output = html;
    if(!output.includes('genius-core.js')) {
      const s = '\n  <script src="js/genius-core.js"></script>\n';
      if(output.includes('</head>')) {
        output = output.replace('</head>', s + '</head>');
      } else if(output.includes('<body>')) {
        output = output.replace('<body>', '<body>' + s);
      } else {
        output = s + output;
      }
    }
    return { code: output, success: !!output };
  };

  return { patterns: LOGIC_PATTERNS, kits: BUSINESS_KITS, functionalize };
})();
window.AppGenius = AppGenius;
