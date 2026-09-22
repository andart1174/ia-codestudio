'use strict';
/* IA Architecte — Full Site Templates (10 Sites) */

const SITES_DATA = [

/* 1 ── NEXUS SHOP (E-COMMERCE) ─────────────────────── */
{icon:'🛒', en:'Nexus Shop', fr:'Nexus Boutique',
 desc_en:'Complete store with cart, products and checkout',
 desc_fr:'Boutique complète avec panier, produits et paiement',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Nexus Shop</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#f8fafc;color:#1e293b}
header{background:#fff;padding:15px 50px;display:flex;justify-content:space-between;align-items:center;box-shadow:0 2px 10px rgba(0,0,0,0.05);position:sticky;top:0;z-index:100}
.logo{font-size:24px;font-weight:900;color:#3b82f6}
nav ul{display:flex;gap:25px;list-style:none}
nav a{text-decoration:none;color:#64748b;font-weight:600;font-size:14px;transition:color .2s}
nav a:hover{color:#3b82f6}
.cart-btn{background:#f1f5f9;padding:8px 15px;border-radius:10px;cursor:pointer;font-weight:700;display:flex;align-items:center;gap:8px}
.hero{padding:80px 50px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#fff;text-align:center}
.hero h1{font-size:48px;font-weight:900;margin-bottom:15px}
.section-title{padding:40px 50px 20px;font-size:24px;font-weight:800}
.products{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:30px;padding:20px 50px 50px}
.product-card{background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 10px 20px rgba(0,0,0,0.05);transition:transform .3s}
.product-card:hover{transform:translateY(-5px)}
.p-img{height:200px;background:#e2e8f0;display:flex;align-items:center;justify-content:center;font-size:60px}
.p-info{padding:20px}
.p-cat{font-size:12px;color:#94a3b8;font-weight:700;text-transform:uppercase}
.p-name{font-size:18px;font-weight:800;margin:5px 0}
.p-price{font-size:20px;font-weight:900;color:#3b82f6}
.add-btn{width:100%;padding:12px;background:#1e293b;color:#fff;border:none;border-radius:10px;margin-top:15px;cursor:pointer;font-weight:700;transition:background .2s}
.add-btn:hover{background:#3b82f6}
footer{background:#1e293b;color:#fff;padding:50px;margin-top:50px;text-align:center}
</style></head><body>
<header>
  <div class="logo">NEXUS</div>
  <nav><ul><li><a href="#">Home</a></li><li><a href="#">Shop</a></li><li><a href="#">Categories</a></li><li><a href="#">Contact</a></li></ul></nav>
  <div class="cart-btn">🛒 <span id="cart-count">0</span></div>
</header>
<section class="hero">
  <h1>Premium Tech Store</h1>
  <p>Discover the latest gadgets and electronics with world-wide shipping.</p>
</section>
<h2 class="section-title">Featured Products</h2>
<div class="products" id="plist"></div>
<footer><p>&copy; 2024 Nexus Shop Premium. Built with IA Architecte.</p></footer>
<script>
const products=[{n:'Nexus Watch',p:299,c:'⌚',cat:'Wearables'},{n:'Pro Headphones',p:199,c:'🎧',cat:'Audio'},{n:'Smart Home Hub',p:149,c:'🏠',cat:'Home'},{n:'Wireless Mouse',p:79,c:'🖱️',cat:'Peripherals'},{n:'Solar Charger',p:59,c:'☀️',cat:'Energy'},{n:'VR Headset',p:499,c:'🥽',cat:'Gaming'}];
let count=0;
document.getElementById('plist').innerHTML=products.map(p=>\`<div class="product-card">
  <div class="p-img">\${p.c}</div>
  <div class="p-info">
    <div class="p-cat">\${p.cat}</div>
    <div class="p-name">\${p.n}</div>
    <div class="p-price">$\${p.p}</div>
    <button class="add-btn" onclick="add()">Add to Cart</button>
  </div>
</div>\`).join('');
function add(){count++;document.getElementById('cart-count').textContent=count;}
</script></body></html>`},

/* 2 ── LUMINA BLOG (MAGAZINE) ─────────────────────── */
{icon:'📰', en:'Lumina Blog', fr:'Lumina Blog',
 desc_en:'Modern magazine layout with article grid',
 desc_fr:'Mise en page magazine moderne avec grille d\'articles',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Lumina</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#fff;color:#1a202c}
header{padding:40px 20px;text-align:center;border-bottom:1px solid #edf2f7}
.brand{font-size:40px;font-weight:900;letter-spacing:-1px}
.nav{margin-top:20px;display:flex;justify-content:center;gap:20px;font-size:13px;font-weight:700;text-transform:uppercase;color:#718096}
.container{max-width:1100px;margin:0 auto;padding:40px 20px}
.featured-post{display:grid;grid-template-columns:1.5fr 1fr;gap:40px;margin-bottom:60px}
.f-img{height:400px;background:#f7fafc;border-radius:15px;display:flex;align-items:center;justify-content:center;font-size:100px}
.f-content{display:flex;flex-direction:column;justify-content:center}
.tag{color:#3b82f6;font-weight:800;font-size:12px;margin-bottom:10px}
.title{font-size:32px;font-weight:900;line-height:1.2;margin-bottom:15px}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:30px}
.grid-post img{width:100%;height:200px;background:#f7fafc;border-radius:10px;margin-bottom:15px;display:flex;align-items:center;justify-content:center;font-size:40px}
.grid-title{font-size:18px;font-weight:800;line-height:1.4}
footer{padding:60px;background:#1a202c;color:#fff;text-align:center}
</style></head><body>
<header><div class="brand">LUMINA</div><div class="nav"><span>Art</span><span>Design</span><span>Technology</span><span>Culture</span></div></header>
<div class="container">
  <div class="featured-post">
    <div class="f-img">🌊</div>
    <div class="f-content">
      <div class="tag">DESIGN • 5 MIN READ</div>
      <h2 class="title">The Future of Minimalist UI Design in 2024</h2>
      <p style="color:#718096;line-height:1.6">Exploring how simplicity is reshaping digital experiences across global markets...</p>
    </div>
  </div>
  <div class="grid">
    <div class="grid-post"><div class="f-img" style="height:180px">🎨</div><div class="tag">ART</div><h3 class="grid-title">Digital Art: From Pixels to Museums</h3></div>
    <div class="grid-post"><div class="f-img" style="height:180px">💻</div><div class="tag">TECH</div><h3 class="grid-title">How AI is Changing the Coding Landscape</h3></div>
    <div class="grid-post"><div class="f-img" style="height:180px">🌿</div><div class="tag">CULTURE</div><h3 class="grid-title">Exploring the Roots of Sustainable Living</h3></div>
  </div>
</div>
<footer><p>&copy; 2024 Lumina Magazine</p></footer>
</body></html>`},

/* 3 ── VANTAGE AGENCY (BUSINESS) ────────────────────── */
{icon:'🏢', en:'Vantage Agency', fr:'Vantage Agence',
 desc_en:'Professional business site with portfolio and services',
 desc_fr:'Site d\'entreprise pro avec portfolio et services',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Vantage</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
header{padding:20px 80px;display:flex;justify-content:space-between;align-items:center;background:#fff;box-shadow:0 2px 10px rgba(0,0,0,0.05)}
.logo{font-size:22px;font-weight:900;color:#000}
.hero{height:80vh;background:url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1401') center/cover;display:flex;align-items:center;justify-content:center;color:#fff;text-align:center;position:relative}
.hero::before{content:'';position:absolute;inset:0;background:rgba(0,0,0,0.5)}
.hero-box{position:relative;z-index:1;max-width:800px}
.hero h1{font-size:60px;font-weight:900;margin-bottom:20px}
.services{padding:100px 80px;display:grid;grid-template-columns:repeat(3,1fr);gap:40px}
.serv-card{padding:40px;background:#f8fafc;border-radius:20px;text-align:center;transition:all .3s}
.serv-card:hover{background:#000;color:#fff}
.serv-icon{font-size:40px;margin-bottom:20px}
.portfolio{padding:100px 80px;background:#000;color:#fff;text-align:center}
.port-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-top:50px}
.port-item{height:300px;background:#333;border-radius:15px;display:flex;align-items:center;justify-content:center;font-size:40px}
</style></head><body>
<header><div class="logo">VANTAGE.</div><nav style="display:flex;gap:30px;font-weight:700;font-size:14px"><span>SERVICES</span><span>WORK</span><span>ABOUT</span><span>CONTACT</span></nav></header>
<section class="hero"><div class="hero-box"><h1>Design that drives growth.</h1><p>We help world-class brands build digital products that matter.</p></div></section>
<section class="services">
  <div class="serv-card"><div class="serv-icon">🚀</div><h3>Strategy</h3><p>Helping you identify opportunities and scale your business with data-driven insights.</p></div>
  <div class="serv-card"><div class="serv-icon">🎨</div><h3>Design</h3><p>Creating beautiful, functional interfaces that people love to use every day.</p></div>
  <div class="serv-card"><div class="serv-icon">💻</div><h3>Development</h3><p>Engineering robust, scalable solutions using the latest modern technologies.</p></div>
</section>
<section class="portfolio"><h2>Our Latest Work</h2><div class="port-grid"><div class="port-item">📱</div><div class="port-item">💻</div><div class="port-item">🌐</div><div class="port-item">📸</div></div></section>
</body></html>`},

/* 4 ── FLASH GALLERY (PHOTOGRAPHY) ─────────────────── */
{icon:'📸', en:'Flash Gallery', fr:'Flash Galerie',
 desc_en:'Photographer portfolio with sleek image grids',
 desc_fr:'Portfolio photographe avec grilles d\'images élégantes',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Flash</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#000;color:#fff}
.sidebar{width:250px;height:100vh;position:fixed;padding:50px;border-right:1px solid #222}
.main{margin-left:250px;padding:2px}
.logo{font-size:24px;font-weight:900;margin-bottom:50px}
nav ul{list-style:none}
nav li{margin-bottom:20px;font-weight:500;color:#666;cursor:pointer;transition:color .2s}
nav li:hover,nav li.active{color:#fff}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(350px,1fr));gap:2px}
.item{aspect-ratio:3/4;background:#111;display:flex;align-items:center;justify-content:center;font-size:40px;cursor:pointer;position:relative;overflow:hidden}
.item:hover img{transform:scale(1.1)}
.item img{width:100%;height:100%;object-fit:cover;transition:transform .5s}
.ov{position:absolute;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s}
.item:hover .ov{opacity:1}
</style></head><body>
<div class="sidebar"><div class="logo">FLASH</div><nav><ul><li class="active">ARCHIVE</li><li>SERIES</li><li>COMMERCIAL</li><li>ABOUT</li><li>CONTACT</li></ul></nav></div>
<div class="main">
  <div class="grid">
    <div class="item">🖼️<div class="ov">PORTRAIT 01</div></div>
    <div class="item">🌄<div class="ov">LANDSCAPE 03</div></div>
    <div class="item">🌇<div class="ov">CITY 05</div></div>
    <div class="item">👤<div class="ov">STUDIO 02</div></div>
    <div class="item">🌿<div class="ov">NATURE 04</div></div>
    <div class="item">🏢<div class="ov">EXTERIOR 06</div></div>
  </div>
</div>
</body></html>`},

/* 5 ── VITALITY HEALTH (MEDICAL) ───────────────────── */
{icon:'⚕️', en:'Vitality Health', fr:'Vitality Santé',
 desc_en:'Health clinic template with booking form',
 desc_fr:'Modèle clinique médicale avec formulaire de rdv',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Vitality</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#f0f7ff;color:#1e3a8a}
header{background:#fff;padding:15px 50px;display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #e0f2fe}
.logo{font-size:24px;font-weight:900;color:#0ea5e9}
.book-btn{background:#0ea5e9;color:#fff;padding:10px 25px;border-radius:30px;font-weight:800;text-decoration:none}
.hero{padding:100px 50px;display:grid;grid-template-columns:1fr 1fr;gap:50px;align-items:center}
.h-text h1{font-size:48px;font-weight:900;margin-bottom:20px;line-height:1.1}
.h-form{background:#fff;padding:40px;border-radius:25px;box-shadow:0 20px 40px rgba(14,165,233,0.1)}
input,select{width:100%;padding:12px;margin-bottom:15px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px}
button.submit{width:100%;padding:15px;background:#0ea5e9;color:#fff;border:none;border-radius:10px;font-weight:800;cursor:pointer}
</style></head><body>
<header><div class="logo">VITALITY.</div><nav style="display:flex;gap:30px;font-weight:700"><span>Services</span><span>Doctors</span><span>Locations</span></nav><a href="#" class="book-btn">Book Now</a></header>
<section class="hero">
  <div class="h-text"><h1>Your health, our priority.</h1><p style="font-size:18px;margin-bottom:30px">Providing world-class medical care with a personal touch and advanced technology.</p>
    <div style="display:flex;gap:20px;margin-top:40px"><div style="font-weight:900">4.9/5 ★<br><small>Client Rating</small></div><div style="font-weight:900">20+ Yrs<br><small>Experience</small></div></div>
  </div>
  <div class="h-form">
    <h3>Book an Appointment</h3><br>
    <input type="text" placeholder="Full Name"/>
    <select><option>Select Department</option><option>Cardiology</option><option>Dentistry</option><option>Pediatrics</option></select>
    <input type="date"/>
    <button class="submit">Secure Appointment</button>
  </div>
</section>
</body></html>`},

/* 6 ── QUEST FORUM (Q&A) ───────────────────────────── */
{icon:'💬', en:'Quest Forum', fr:'Quest Forums',
 desc_en:'Online community forum with threads and replies',
 desc_fr:'Forum de discussion avec sujets et réponses',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Quest</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#f3f4f6;color:#1f2937}
header{background:#111827;color:#fff;padding:15px 40px;display:flex;justify-content:space-between;align-items:center}
.search{background:#374151;border-radius:10px;padding:8px 15px;width:300px}
.container{max-width:1000px;margin:40px auto;display:grid;grid-template-columns:1fr 300px;gap:30px}
.post-list{background:#fff;border-radius:15px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.05)}
.post{padding:20px;border-bottom:1px solid #f3f4f6;display:flex;gap:20px}
.vote{width:40px;display:flex;flex-direction:column;align-items:center;font-weight:900}
.p-title{font-size:18px;font-weight:800;margin-bottom:5px}
.p-info{font-size:12px;color:#6b7280}
.sidebar-box{background:#fff;padding:20px;border-radius:15px;box-shadow:0 2px 10px rgba(0,0,0,0.05)}
</style></head><body>
<header><div style="font-size:22px;font-weight:900">QUEST</div><div class="search">Search discussions...</div><div style="font-weight:700">LOGIN</div></header>
<div class="container">
  <div class="post-list">
    <div class="post"><div class="vote">🔼<br>142<br>🔽</div><div><div class="p-title">How to learn React in 2024?</div><div class="p-info">Posted by user123 — 2 hours ago in #Coding</div></div></div>
    <div class="post"><div class="vote">🔼<br>89<br>🔽</div><div><div class="p-title">The best coffee shops in Tokyo</div><div class="p-info">Posted by traveler99 — 4 hours ago in #Travel</div></div></div>
    <div class="post"><div class="vote">🔼<br>253<br>🔽</div><div><div class="p-title">What's your morning routine?</div><div class="p-info">Posted by lifestyle_pro — 8 hours ago in #Health</div></div></div>
  </div>
  <aside><div class="sidebar-box"><h3>Trending Topics</h3><br><ul style="list-style:none;font-size:14px;font-weight:700;display:flex;flex-direction:column;gap:10px;color:#3b82f6"><li>#ReactJS</li><li>#TokyoTravel</li><li>#FitnessTips</li><li>#AIRevolution</li></ul></div></aside>
</div>
</body></html>`},

/* 7 ── ESTATE PRO (REAL ESTATE) ──────────────────── */
{icon:'🏡', en:'Estate Pro', fr:'Estate Immo',
 desc_en:'Property listings with filters and map UI',
 desc_fr:'Annonces immobilières avec filtres et carte',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Estate Pro</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#f8fafc}
.top-nav{background:#fff;padding:20px 50px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #e2e8f0}
.filter-bar{padding:20px 50px;background:#fff;display:flex;gap:20px;border-bottom:1px solid #e2e8f0;overflow-x:auto}
.pill{background:#f1f5f9;padding:8px 20px;border-radius:20px;font-size:13px;font-weight:700;cursor:pointer;white-space:nowrap}
.pill.active{background:#1e293b;color:#fff}
.grid{padding:40px 50px;display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:30px}
.house{background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 10px 20px rgba(0,0,0,0.05)}
.h-img{height:220px;background:#cbd5e1;display:flex;align-items:center;justify-content:center;font-size:60px}
.h-info{padding:20px}
.h-price{font-size:24px;font-weight:900;margin-bottom:5px}
.h-loc{color:#64748b;font-size:14px;margin-bottom:15px}
.h-meta{display:flex;gap:15px;font-size:13px;font-weight:700;border-top:1px solid #f1f5f9;padding-top:15px;color:#475569}
</style></head><body>
<div class="top-nav"><div style="font-size:22px;font-weight:900">ESTATE.</div><div style="display:flex;gap:30px;font-weight:700;font-size:14px"><span>Rent</span><span>Buy</span><span>Sell</span><span>Agents</span></div><div style="font-weight:800;color:#3b82f6">Login</div></div>
<div class="filter-bar"><div class="pill active">Price: All</div><div class="pill">Type: Villa</div><div class="pill">Bedrooms: 3+</div><div class="pill">Bathrooms: 2+</div><div class="pill">Pet Friendly</div></div>
<div class="grid">
  <div class="house"><div class="h-img">🏠</div><div class="h-info"><div class="h-price">$450,000</div><div class="h-loc">📍 Los Angeles, CA</div><div class="h-meta"><span>🛏️ 3 Beds</span><span>🚿 2 Baths</span><span>📏 2400 sqft</span></div></div></div>
  <div class="house"><div class="h-img">🏙️</div><div class="h-info"><div class="h-price">$890,000</div><div class="h-loc">📍 Manhattan, NY</div><div class="h-meta"><span>🛏️ 2 Beds</span><span>🚿 2 Baths</span><span>📏 1200 sqft</span></div></div></div>
  <div class="house"><div class="h-img">🏡</div><div class="h-info"><div class="h-price">$320,000</div><div class="h-loc">📍 Austin, TX</div><div class="h-meta"><span>🛏️ 4 Beds</span><span>🚿 3 Baths</span><span>📏 3100 sqft</span></div></div></div>
</div>
</body></html>`},

/* 8 ── EDUFLOW (LMS) ───────────────────────────────── */
{icon:'🎓', en:'EduFlow LMS', fr:'EduFlow LMS',
 desc_en:'Learning management platform with course view',
 desc_fr:'Plateforme d\'apprentissage avec vue cours',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>EduFlow</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#f8fafc;display:flex;min-height:100vh}
.sidebar{width:280px;background:#fff;border-right:1px solid #e2e8f0;padding:30px}
.main{flex:1;padding:40px}
.logo{font-size:24px;font-weight:900;color:#6366f1;margin-bottom:40px}
.menu-item{padding:12px 15px;border-radius:10px;margin-bottom:5px;font-weight:700;color:#64748b;display:flex;align-items:center;gap:12px;cursor:pointer}
.menu-item.active{background:#6366f111;color:#6366f1}
.courses{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:25px;margin-top:30px}
.c-card{background:#fff;border-radius:20px;padding:25px;border:1px solid #e2e8f0;transition:all .3s}
.c-card:hover{transform:translateY(-4px);border-color:#6366f1}
.c-progress{height:6px;background:#eee;border-radius:3px;margin:20px 0;position:relative}
.c-fill{position:absolute;height:100%;border-radius:3px;background:#6366f1}
</style></head><body>
<div class="sidebar"><div class="logo">EDUFLOW</div><nav><div class="menu-item active">🏠 Dashboard</div><div class="menu-item">📚 My Courses</div><div class="menu-item">🏆 Certificates</div><div class="menu-item">⚙️ Settings</div></nav></div>
<div class="main"><h2>Welcome back, Student!</h2><p style="color:#64748b">Continue your learning journey where you left off.</p>
  <div class="courses">
    <div class="c-card"><div style="font-size:40px">💻</div><h3>Advanced React</h3><div class="c-progress"><div class="c-fill" style="width:65%"></div></div><div style="display:flex;justify-content:space-between;font-size:12px;font-weight:700"><span>Progress</span><span>65%</span></div></div>
    <div class="c-card"><div style="font-size:40px">🎨</div><h3>UI/UX Design</h3><div class="c-progress"><div class="c-fill" style="width:30%"></div></div><div style="display:flex;justify-content:space-between;font-size:12px;font-weight:700"><span>Progress</span><span>30%</span></div></div>
    <div class="c-card"><div style="font-size:40px">🐍</div><h3>Python Basics</h3><div class="c-progress"><div class="c-fill" style="width:90%"></div></div><div style="display:flex;justify-content:space-between;font-size:12px;font-weight:700"><span>Progress</span><span>90%</span></div></div>
  </div>
</div>
</body></html>`},

/* 9 ── SOCIAL WAVE (SAAS LANDING) ─────────────────── */
{icon:'🌊', en:'Social Wave', fr:'Social Wave',
 desc_en:'SaaS landing page with hero, pricing and features',
 desc_fr:'Page d\'accueil SaaS avec prix et fonctionnalités',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Social Wave</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#000;color:#fff}
.hero{height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:20px;background:radial-gradient(circle at center, #1a1a1a 0%, #000 100%)}
.hero h1{font-size:80px;font-weight:900;background:linear-gradient(to right, #fff, #666);-webkit-background-clip:text;-webkit-text-fill-color:transparent;line-height:1}
.btn{margin-top:40px;padding:18px 45px;background:#fff;color:#000;border-radius:50px;font-weight:900;text-decoration:none;font-size:18px}
.feat{padding:100px 50px;display:grid;grid-template-columns:repeat(3,1fr);gap:40px}
.f-box{padding:40px;background:#0a0a0a;border:1px solid #1a1a1a;border-radius:30px;transition:border .3s}
.f-box:hover{border-color:#333}
.price{padding:100px 50px;text-align:center}
.price-card{max-width:400px;margin:50px auto;background:#fff;color:#000;padding:50px;border-radius:40px}
</style></head><body>
<section class="hero"><h1>Grow your brand<br>faster than ever.</h1><p style="color:#666;font-size:20px;margin-top:20px">Automation for the modern social media manager.</p><a href="#" class="btn">Get Started for free</a></section>
<section class="feat">
  <div class="f-box"><h3>Auto Posts</h3><p style="color:#666;margin-top:15px">Schedule your content across everything with one click.</p></div>
  <div class="f-box"><h3>Smart Tech</h3><p style="color:#666;margin-top:15px">Let AI analyze your engagement and suggest the best times.</p></div>
  <div class="f-box"><h3>Real Data</h3><p style="color:#666;margin-top:15px">Comprehensive analytics that actually make sense.</p></div>
</section>
<section class="price">
  <h2>Transparent Pricing</h2>
  <div class="price-card"><h3>Pro Plan</h3><div style="font-size:60px;font-weight:900">$29<span style="font-size:20px;color:#999">/mo</span></div><p>Unlimited accounts, Premium analytics, 24/7 support.</p><br><a href="#" class="btn" style="background:#000;color:#fff;display:inline-block">Upgrade Now</a></div>
</section>
</body></html>`},

/* 10 ── AUTH CENTER (USER PORTAL) ──────────────────── */
{icon:'🔐', en:'Auth Center', fr:'Centre Auth',
 desc_en:'Complete registration and login portal with dashboard',
 desc_fr:'Portail d\'inscription et connexion complet',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Auth Center</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#f0f2f5;height:100vh;display:flex;align-items:center;justify-content:center}
.auth-card{background:#fff;padding:40px;border-radius:25px;width:100%;max-width:440px;box-shadow:0 15px 35px rgba(0,0,0,0.05)}
.tabs{display:flex;gap:20px;margin-bottom:30px;border-bottom:2px solid #eee}
.tab{padding:10px;font-weight:800;color:#999;cursor:pointer;position:relative}
.tab.active{color:#000}
.tab.active::after{content:'';position:absolute;bottom:-2px;left:0;right:0;height:2px;background:#000}
input{width:100%;padding:13px;margin-bottom:15px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;outline:none}
button{width:100%;padding:15px;background:#000;color:#fff;border:none;border-radius:10px;font-weight:800;cursor:pointer}
.social-login{display:flex;gap:10px;margin-top:20px}
.s-btn{flex:1;padding:10px;border:1px solid #eee;border-radius:10px;text-align:center;font-size:12px;font-weight:700}
</style></head><body>
<div class="auth-card">
  <div style="font-size:30px;text-align:center;margin-bottom:30px">🏛️</div>
  <div class="tabs"><div class="tab active">LOGIN</div><div class="tab">SIGN UP</div></div>
  <div id="login-form">
    <input type="email" placeholder="Email Address"/>
    <input type="password" placeholder="Password"/>
    <div style="text-align:right;font-size:12px;margin-bottom:15px;font-weight:700">Forgot Password?</div>
    <button>Continue →</button>
  </div>
  <div class="social-login"><div class="s-btn">Google</div><div class="s-btn">GitHub</div></div>
</div>
</body></html>`}

];

window.SITES_DATA = SITES_DATA;
