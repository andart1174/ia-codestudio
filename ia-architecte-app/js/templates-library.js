'use strict';
/* IA Architecte — Templates Pro Library | 50+ Models */

window.TEMPLATES = [
  {icon:'🏠',en:'Global Landing',fr:'Accueil Global',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Modern Landing</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Inter',sans-serif;background:#080c14;color:#fff}
    .hero{height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;background:radial-gradient(circle at top,#1e293b,#080c14);padding:20px}
    h1{font-size:clamp(40px,8vw,80px);font-weight:900;margin-bottom:20px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    p{font-size:18px;color:#94a3b8;max-width:600px;line-height:1.6;margin-bottom:30px}
    .btn{padding:15px 35px;background:#3b82f6;color:#fff;border:none;border-radius:12px;font-weight:800;cursor:pointer;box-shadow:0 10px 25px rgba(59,130,246,0.4)}
  </style>
</head>
<body>
  <section class="hero">
    <div>
      <h1>Beyond Limits.</h1>
      <p>The next generation of web applications starts here. Join the revolution today.</p>
      <button class="btn">Get Started Now</button>
    </div>
  </section>
</body>
</html>`},
  {icon:'⚖️',en:'Law Firm',fr:'Cabinet Avocat',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Justice Pro</title>
  <style>
    body{font-family:'Playfair Display',serif;background:#f8f9fa;color:#1a1a1a;margin:0}
    .nav{padding:20px 40px;background:#fff;border-bottom:3px solid #c5a059;display:flex;justify-content:space-between;align-items:center}
    .hero{padding:100px 40px;background:#1a1a1a;color:#fff;text-align:center}
    .hero h1{font-size:48px;color:#c5a059}
    section{padding:60px 40px;max-width:1000px;margin:auto}
    h2{border-bottom:2px solid #c5a059;display:inline-block;padding-bottom:10px}
  </style>
</head>
<body>
  <nav class="nav">
    <b>JUSTICE & ASSOCIATES</b>
    <div>Home | Expertise | Contact</div>
  </nav>
  <header class="hero">
    <h1>Defending Your Rights</h1>
    <p>Professional Legal Consultation & Representation</p>
  </header>
  <section>
    <h2>Expertise</h2>
    <p>Specializing in Corporate Law, Family Law, and Intellectual Property.</p>
  </section>
</body>
</html>`},
  {icon:'🏗️',en:'Architecture',fr:'Architecture Pro',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Studio A</title>
  <style>
    body{font-family:'Montserrat',sans-serif;background:#fff;margin:0;color:#333}
    .hero{height:80vh;background:#eee;display:flex;align-items:center;padding:0 10%;position:relative}
    .hero h1{font-size:80px;font-weight:900;margin:0;letter-spacing:-2px;line-height:0.9}
    .hero-box{width:300px;height:400px;background:#333;margin-left:auto;color:#fff;padding:40px;display:flex;flex-direction:column;justify-content:flex-end}
    section{padding:80px 10%;display:grid;grid-template-columns:1fr 1fr;gap:40px}
    .img-p{background:#f0f0f0;height:400px;width:100%}
  </style>
</head>
<body>
  <div class="hero">
    <h1>MODERN<br/>FORMS.</h1>
    <div class="hero-box">
      <b>Project 2026</b>
      <p>Minimalist Residential Tower, Dubai</p>
    </div>
  </div>
  <section>
    <div class="img-p"></div>
    <div>
      <h2>Our Vision</h2>
      <p>Merging functionality with pure aesthetics to create timeless structures.</p>
    </div>
  </section>
</body>
</html>`},
  {icon:'🏥',en:'Medical Clinic',fr:'Clinique Médicale',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>HealthPoint</title>
  <style>
    body{font-family:system-ui;margin:0;color:#333}
    .top{background:#3b82f6;color:#fff;padding:10px 40px;font-size:13px}
    .nav{padding:20px 40px;display:flex;justify-content:space-between;border-bottom:1px solid #eee}
    .hero{padding:100px 40px;background:#f0f7ff;display:flex;align-items:center;gap:40px}
    .hero-text{flex:1}
    h1{font-size:42px;color:#1e3a8a}
    .btn{padding:15px 30px;background:#10b981;color:#fff;border:none;border-radius:30px;font-weight:bold;cursor:pointer}
    section{padding:60px 40px;display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
    .card{padding:30px;background:#fff;border-radius:15px;box-shadow:0 10px 30px rgba(0,0,0,0.05)}
  </style>
</head>
<body>
  <div class="top">Emergency Call: 0-800-HEALTH</div>
  <nav class="nav">
    <b>HEALTHPOINT</b>
    <div>Services | Doctors | Appointments</div>
  </nav>
  <div class="hero">
    <div class="hero-text">
      <h1>Advanced Care,<br/>Compassionate Heart.</h1>
      <p>World-class medical services for your family.</p>
      <button class="btn">Book Appointment</button>
    </div>
    <div style="flex:1;background:#fff;height:300px;border-radius:20px;"></div>
  </div>
  <section>
    <div class="card">
      <h3>General Medicine</h3>
      <p>Complete checkups and personalized care.</p>
    </div>
    <div class="card">
      <h3>Dentistry</h3>
      <p>Keep your smile bright and healthy.</p>
    </div>
    <div class="card">
      <h3>Cardiology</h3>
      <p>Specialized heart care and diagnostics.</p>
    </div>
  </section>
</body>
</html>`},
  {icon:'🍔',en:'Restaurant',fr:'Restaurant Gourmet',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>L'Elite</title>
  <style>
    body{font-family:'Playfair Display',serif;background:#0f1012;color:#fff;margin:0}
    .hero{height:100vh;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
    .hero h1{font-size:72px;margin:0;color:#c5a059}
    p{color:#94a3b8;font-size:18px}
    .menu{padding:80px 40px;max-width:800px;margin:auto}
    .item{display:flex;justify-content:space-between;border-bottom:1px solid #222;padding:15px 0}
    .price{color:#c5a059;font-weight:bold}
  </style>
</head>
<body>
  <section class="hero">
    <h1>L'ELITE</h1>
    <p>Gourmet Experience & Fine Dining</p>
    <button style="margin-top:20px;padding:15px 40px;background:none;border:1px solid #c5a059;color:#c5a059;font-size:16px;cursor:pointer;">BOOK A TABLE</button>
  </section>
  <section class="menu">
    <h2>Our Specialties</h2>
    <div class="item"><span>Truffle Linguine</span><span class="price">$38</span></div>
    <div class="item"><span>Wagyu Ribeye</span><span class="price">$95</span></div>
    <div class="item"><span>Saffron Risotto</span><span class="price">$32</span></div>
  </section>
</body>
</html>`},
  {icon:'🏋️',en:'Fitness Gym',fr:'Salle de Sport',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Power Gym</title>
  <style>
    body{font-family:'Oswald',sans-serif;background:#000;color:#fff;margin:0}
    .hero{height:100vh;background:#111;display:flex;flex-direction:column;justify-content:center;padding:0 10%}
    .hero h1{font-size:100px;font-weight:900;margin:0;color:#ff0000;font-style:italic}
    h2{font-size:40px;margin-bottom:30px}
    section{padding:80px 10%}
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px}
    .card{background:#222;padding:40px;border-top:5px solid #ff0000}
  </style>
</head>
<body>
  <div class="hero">
    <h1>NO EXCUSES.<br/>ONLY RESULTS.</h1>
    <button style="width:200px;margin-top:40px;padding:15px;background:#ff0000;color:#fff;border:none;font-weight:900;cursor:pointer;">JOIN THE CLAN</button>
  </div>
  <section>
    <h2>Membership Plans</h2>
    <div class="grid">
      <div class="card">
        <h3>Basic</h3>
        <p>Access to all machines</p>
        <b>$29/mo</b>
      </div>
      <div class="card">
        <h3>Pro</h3>
        <p>Machines + Classes</p>
        <b>$59/mo</b>
      </div>
      <div class="card">
        <h3>Elite</h3>
        <p>Full Access + PT</p>
        <b>$99/mo</b>
      </div>
    </div>
  </section>
</body>
</html>`},
  {icon:'👔',en:'SaaS Landing',fr:'Page SaaS',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>CloudFlow</title>
  <style>
    body{font-family:'Inter',sans-serif;margin:0;color:#333}
    .nav{display:flex;justify-content:space-between;padding:20px 60px;align-items:center}
    .hero{text-align:center;padding:120px 20px;background:linear-gradient(to bottom,#fff,#f8faff)}
    .hero h1{font-size:54px;margin-bottom:20px}
    .btn-p{padding:15px 35px;background:#2563eb;color:#fff;border:none;border-radius:8px;font-weight:700;cursor:pointer}
    section{padding:80px 60px;display:flex;gap:40px;align-items:center}
    img{background:#eee;border-radius:12px;flex:1;height:300px}
  </style>
</head>
<body>
  <nav class="nav">
    <b>CLOUDFLOW</b>
    <div>Features | Tracking | Pricing <button style="margin-left:20px;padding:10px 20px;border:1px solid #ddd;border-radius:5px;background:none;">Login</button></div>
  </nav>
  <div class="hero">
    <h1>Automate Your Workflow.<br/>Scale Your Business.</h1>
    <p>The all-in-one platform for modern teams to collaborate and deliver.</p>
    <button class="btn-p">Start Free Trial →</button>
  </div>
  <section>
    <div>
      <h2>Real-time Analytics</h2>
      <p>Track every move and optimize your strategy with our advanced dashboard.</p>
    </div>
    <img/>
  </section>
</body>
</html>`},
  {icon:'🏨',en:'Luxury Hotel',fr:'Hôtel de Luxe',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>The Grand</title>
  <style>
    body{font-family:'Lora',serif;margin:0;color:#444}
    .hero{height:100vh;background:#1a1a1a;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center}
    .hdr{position:absolute;top:0;width:100%;padding:40px 0;text-align:center;font-size:24px;letter-spacing:5px}
    h1{font-size:60px;font-weight:300;margin:20px 0}
    section{padding:100px 10%;display:grid;grid-template-columns:1fr 1fr;gap:80px}
    h2{font-size:40px;color:#94764b;margin-bottom:30px}
  </style>
</head>
<body>
  <div class="hero">
    <div class="hdr">THE GRAND OLYMPIA</div>
    <h1>Excellence Reimagined.</h1>
    <button style="padding:15px 40px;background:#94764b;color:#fff;border:none;cursor:pointer;font-size:14px;letter-spacing:2px;">BOOK YOUR STAY</button>
  </div>
  <section>
    <div>
      <h2>A Sanctuary of Peace</h2>
      <p>Experience the peak of luxury in the heart of the Swiss Alps.</p>
    </div>
    <div style="background:#eee;height:500px"></div>
  </section>
</body>
</html>`},
  {icon:'🏡',en:'Real Estate',fr:'Immobilier Pro',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>DreamHomes</title>
  <style>
    body{font-family:sans-serif;margin:0;color:#333}
    .nav{padding:25px 5%;background:#fff;display:flex;justify-content:space-between;align-items:center}
    .hero{height:70vh;background:#f5f5f5;display:flex;align-items:center;padding:0 5%}
    .search-bar{background:#fff;padding:40px;border-radius:15px;box-shadow:0 20px 50px rgba(0,0,0,0.1);display:flex;gap:15px;width:100%;max-width:800px}
    .search-bar input{flex:1;padding:15px;border:1px solid #ddd;border-radius:8px}
    .btn{background:#2563eb;color:#fff;padding:15px 40px;border:none;border-radius:8px;font-weight:bold;cursor:pointer}
    section{padding:60px 5%}
    .prop-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px}
  </style>
</head>
<body>
  <nav class="nav">
    <b>DREAMHOMES</b>
    <div>Buy | Sell | Rent | Agents</div>
  </nav>
  <div class="hero">
    <div class="search-bar">
      <input placeholder="Location...">
      <input placeholder="Property Type...">
      <button class="btn">SEARCH</button>
    </div>
  </div>
  <section>
    <h2>Featured Properties</h2>
    <div class="prop-grid">
      <div style="background:#eee;height:250px;border-radius:12px;display:flex;align-items:end;padding:20px"><b>Modern Mansion - $2.5M</b></div>
      <div style="background:#eee;height:250px;border-radius:12px;display:flex;align-items:end;padding:20px"><b>Urban Loft - $850K</b></div>
      <div style="background:#eee;height:250px;border-radius:12px;display:flex;align-items:end;padding:20px"><b>Beach Villa - $4.2M</b></div>
    </div>
  </section>
</body>
</html>`},
  {icon:'🚗',en:'Car Rental',fr:'Location Auto',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>AutoDrive</title>
  <style>
    body{font-family:system-ui;margin:0}
    .hero{height:60vh;background:#000;color:#fff;display:flex;align-items:center;padding:0 10%}
    .hero h1{font-size:64px;color:#facc15}
    section{padding:80px 10%}
    table{width:100%;border-collapse:collapse}
    th,td{padding:20px;border-bottom:1px solid #ddd;text-align:left}
    .btn{padding:10px 20px;background:#facc15;color:#000;border:none;border-radius:5px;font-weight:bold;cursor:pointer}
  </style>
</head>
<body>
  <div class="hero">
    <div>
      <h1>DRIVE THE<br/>EXPERIENCE.</h1>
      <p>Premium cars at affordable prices.</p>
    </div>
  </div>
  <section>
    <h2>Available Fleet</h2>
    <table>
      <tr><th>Model</th><th>Category</th><th>Per Day</th><th>Action</th></tr>
      <tr><td>Tesla Model S</td><td>Electric</td><td>$120</td><td><button class="btn">Rent</button></td></tr>
      <tr><td>BMW M4</td><td>Sport</td><td>$180</td><td><button class="btn">Rent</button></td></tr>
      <tr><td>Range Rover</td><td>SUV</td><td>$200</td><td><button class="btn">Rent</button></td></tr>
    </table>
  </section>
</body>
</html>`},
  {icon:'🍕',en:'Pizza Delivery',fr:'Pizza Livraison',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>HotSlices</title>
  <style>
    body{font-family:cursive;background:#fff5eb;color:#8B0000;margin:0}
    .nav{padding:15px;text-align:center;background:#8B0000;color:#fff;font-size:20px}
    .hero{padding:80px 20px;text-align:center}
    h1{font-size:50px}
    section{padding:40px;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:30px}
    .pizza-card{background:#fff;padding:20px;border-radius:20px;text-align:center;box-shadow:0 10px 20px rgba(0,0,0,0.05)}
    img{width:150px;height:150px;background:#eee;border-radius:50%;margin-bottom:15px}
  </style>
</head>
<body>
  <div class="nav">HOTSLICES PIZZA</div>
  <div class="hero">
    <h1>Fast. Hot. Delicious.</h1>
    <p>Ordered in 2 clicks. Delivered in 20 minutes.</p>
  </div>
  <section>
    <div class="pizza-card">
      <img/>
      <h3>Margherita</h3>
      <button style="padding:10px 20px;background:#FFD700;border:none;border-radius:30px;cursor:pointer;">ADD $12</button>
    </div>
    <div class="pizza-card">
      <img/>
      <h3>Pepperoni</h3>
      <button style="padding:10px 20px;background:#FFD700;border:none;border-radius:30px;cursor:pointer;">ADD $15</button>
    </div>
    <div class="pizza-card">
      <img/>
      <h3>BBQ Chicken</h3>
      <button style="padding:10px 20px;background:#FFD700;border:none;border-radius:30px;cursor:pointer;">ADD $17</button>
    </div>
  </section>
</body>
</html>`},
  {icon:'📷',en:'Photography',fr:'Portfolio Photo',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>FocusArt</title>
  <style>
    body{margin:0;background:#000;color:#fff;font-family:sans-serif}
    .nav{padding:30px;display:flex;justify-content:space-between}
    h1{font-size:120px;margin:0;opacity:0.1;position:fixed;width:100%;text-align:center;z-index:-1}
    .gallery{padding:100px 30px;display:grid;grid-template-columns:repeat(3,1fr);gap:15px}
    .img-box{background:#111;height:400px;transition:0.5s}
    .img-box:hover{transform:scale(0.95);opacity:0.8}
  </style>
</head>
<body>
  <h1>CAPTURED.</h1>
  <nav class="nav">
    <b>MARIUS PHOTO</b>
    <div>Work | About | Contact</div>
  </nav>
  <div class="gallery">
    <div class="img-box"></div>
    <div class="img-box"></div>
    <div class="img-box"></div>
    <div class="img-box"></div>
    <div class="img-box"></div>
    <div class="img-box"></div>
  </div>
</body>
</html>`},
  {icon:'🛒',en:'Fashion Store',fr:'Boutique Mode',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Aura Fashion</title>
  <style>
    body{font-family:serif;margin:0;background:#fff}
    .nav{padding:20px;display:flex;justify-content:center;gap:30px;border-bottom:1px solid #eee}
    .hero{height:70vh;background:#f9f9f9;display:flex;flex-direction:column;align-items:center;justify-content:center}
    h1{font-size:60px;letter-spacing:10px;margin-bottom:10px}
    section{padding:60px 40px;display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
    .card{text-align:center}
    .img{background:#eee;height:350px;width:100%;margin-bottom:15px}
  </style>
</head>
<body>
  <nav class="nav">NEW | WOMEN | MEN | ACCESSORIES | SALE</nav>
  <div class="hero">
    <b>FALL / WINTER 2026</b>
    <h1>AURA</h1>
    <button style="padding:15px 40px;background:#000;color:#fff;border:none;cursor:pointer">SHOP COLLECTION</button>
  </div>
  <section>
    <div class="card"><div class="img"></div><b>Silk Dress</b><p>$180</p></div>
    <div class="card"><div class="img"></div><b>Wool Coat</b><p>$350</p></div>
    <div class="card"><div class="img"></div><b>Leather Bag</b><p>$220</p></div>
    <div class="card"><div class="img"></div><b>Gold Earring</b><p>$95</p></div>
  </section>
</body>
</html>`},
  {icon:'🐶',en:'Pet Shop',fr:'Animalerie',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>PawPal</title>
  <style>
    body{font-family:system-ui;background:#fff7ed;margin:0}
    .nav{background:#fff;padding:20px 40px;display:flex;justify-content:space-between}
    .hero{padding:80px 40px;text-align:center}
    h1{color:#c2410c;font-size:54px}
    section{padding:40px;display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px}
    .card{background:#fff;padding:20px;border-radius:20px;text-align:center;border-bottom:5px solid #fb923c}
  </style>
</head>
<body>
  <nav class="nav">
    <b>PAWPAL</b>
    <div>Shop | Services | Adopt</div>
  </nav>
  <div class="hero">
    <h1>We Love Them<br/>As Much As You.</h1>
    <p>Premium food, toys, and grooming services for your best friends.</p>
  </div>
  <section>
    <div class="card"><h3>Dog Food</h3><p>Organic & Nutritious</p></div>
    <div class="card"><h3>Cat Toys</h3><p>Endless Fun</p></div>
    <div class="card"><h3>Accessories</h3><p>Stylish Collars</p></div>
  </section>
</body>
</html>`},
  {icon:'🧘',en:'Yoga Studio',fr:'Studio Yoga',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Zen Aura</title>
  <style>
    body{font-family:'Lora',serif;background:#fafaf8;margin:0;color:#3d3d3d}
    .hero{height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:20px}
    h1{font-size:60px;font-weight:300;margin-bottom:20px;opacity:0.8}
    .btn{padding:18px 45px;background:#84a59d;color:#fff;border:none;border-radius:40px;cursor:pointer;font-size:16px}
    section{padding:100px 40px;display:grid;grid-template-columns:1fr 1fr;gap:60px;max-width:1100px;margin:auto}
  </style>
</head>
<body>
  <div class="hero">
    <div>
      <h1>Find Your Inner<br/>Balance.</h1>
      <p>Join our sanctuary for mind and body wellness.</p>
      <button class="btn">Explore Classes</button>
    </div>
  </div>
  <section>
    <div>
      <h2>The Mindful Way</h2>
      <p>Our experienced instructors guide you through Vinyasa, Hatha, and Yin Yoga sessions tailored for all levels.</p>
    </div>
    <div style="background:#eee;height:400px;border-radius:6px"></div>
  </section>
</body>
</html>`},
  {icon:'₿',en:'Crypto Platform',fr:'Plateforme Crypto',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>BitX</title>
  <style>
    body{font-family:sans-serif;background:#050505;color:#fff;margin:0}
    .nav{padding:25px 50px;display:flex;justify-content:space-between;border-bottom:1px solid #1a1a1a}
    .hero{padding:120px 50px;text-align:center}
    h1{font-size:64px;background:linear-gradient(to right,#F7931A,#FFD700);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    .prices{padding:40px 50px;display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
    .p-card{background:#111;padding:20px;border-radius:12px;border:1px solid #222}
    span{color:#00ff00}
  </style>
</head>
<body>
  <nav class="nav">
    <b>BITX EXCHANGE</b>
    <div>Market | Wallet | Pro | Support</div>
  </nav>
  <div class="hero">
    <h1>Trade the Future<br/>Today.</h1>
    <p>Secure, fast, and transparent decentralized trading platform.</p>
  </div>
  <div class="prices">
    <div class="p-card">BTC <span>+4.2%</span><br/>$64,290</div>
    <div class="p-card">ETH <span>+2.8%</span><br/>$3,450</div>
    <div class="p-card">SOL <span>+1.5%</span><br/>$145</div>
    <div class="p-card">DOT <span>+0.9%</span><br/>$7.20</div>
  </div>
</body>
</html>`},
  {icon:'🎓',en:'Online Course',fr:'Cours en Ligne',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>EduGen</title>
  <style>
    body{font-family:Inter;margin:0;background:#fcfcfd}
    .hero{padding:100px 60px;background:#6366f1;color:#fff;display:flex;align-items:center;gap:60px}
    h1{font-size:48px}
    section{padding:80px 60px}
    .course-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:25px}
    .card{background:#fff;border:1px solid #eee;border-radius:15px;overflow:hidden}
    .img{height:160px;background:#eee;border-bottom:1px solid #ddd}
  </style>
</head>
<body>
  <div class="hero">
    <div>
      <h1>Learn New Skills.<br/>Anywhere. Anytime.</h1>
      <p>Over 1,000 professional courses taught by industry experts.</p>
      <button style="padding:15px 30px;background:#fff;color:#6366f1;border:none;border-radius:8px;font-weight:900;cursor:pointer;">Start Learning</button>
    </div>
  </div>
  <section>
    <h2>Best Selling Courses</h2>
    <div class="course-grid">
      <div class="card"><div class="img"></div><div style="padding:20px"><b>Full-Stack Master</b><br/><span>$49</span></div></div>
      <div class="card"><div class="img"></div><div style="padding:20px"><b>AI Engineer</b><br/><span>$79</span></div></div>
      <div class="card"><div class="img"></div><div style="padding:20px"><b>UI Design Pro</b><br/><span>$39</span></div></div>
    </div>
  </section>
</body>
</html>`},
  {icon:'🌍',en:'Travel Guide',fr:'Guide Voyage',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>ExploreWorld</title>
  <style>
    body{margin:0;font-family:system-ui}
    .hero{height:100vh;background:url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000') center/cover;display:flex;align-items:center;justify-content:center;color:#fff;text-shadow:0 5px 15px rgba(0,0,0,0.5)}
    .hero h1{font-size:84px;margin:0}
    section{padding:80px 5%}
    .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
    .dest{height:300px;background:#eee;border-radius:20px;display:flex;align-items:end;padding:25px;font-weight:900;color:#fff;background-size:cover}
  </style>
</head>
<body>
  <div class="hero"><h1>WANDERLUST.</h1></div>
  <section>
    <h2>Top Destinations</h2>
    <div class="grid">
      <div class="dest" style="background-image:url('https://images.unsplash.com/photo-1549144511-f099e773c147?w=300')">PARIS</div>
      <div class="dest" style="background-image:url('https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300')">TOKYO</div>
      <div class="dest" style="background-image:url('https://images.unsplash.com/photo-1541334460021-39512595e87a?w=300')">ROME</div>
      <div class="dest" style="background-image:url('https://images.unsplash.com/photo-1548013146-72479768bada?w=300')">AGRA</div>
    </div>
  </section>
</body>
</html>`},
  {icon:'☕',en:'Coffee Shop',fr:'Café & Bistro',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Morning Dew</title>
  <style>
    body{font-family:serif;background:#fffaf5;color:#4b3832;margin:0}
    .hero{height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
    h1{font-size:72px;margin:10px 0}
    section{padding:60px 40px;text-align:center}
    .menu-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:40px;max-width:900px;margin:auto}
  </style>
</head>
<body>
  <div class="hero">
    <b>COFFEE ROASTERS</b>
    <h1>MORNING DEW</h1>
    <p>Crafted with love since 1992</p>
  </div>
  <section>
    <h2>Daily Menu</h2>
    <div class="menu-grid">
      <div><h3>Cappuccino</h3><b>$4.50</b></div>
      <div><h3>Espresso</h3><b>$3.00</b></div>
      <div><h3>Cold Brew</h3><b>$5.00</b></div>
      <div><h3>Late</h3><b>$4.80</b></div>
    </div>
  </section>
</body>
</html>`},
  {icon:'🎮',en:'Gaming Portal',fr:'Portail Gaming',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Nexus Game</title>
  <style>
    body{background:#0a0a0a;color:#fff;font-family:sans-serif;margin:0}
    .nav{padding:20px;background:#000;border-bottom:2px solid #00ffcc}
    .hero{height:80vh;background-image:linear-gradient(to bottom,transparent,#0a0a0a),url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1000');background-size:cover;display:flex;align-items:flex-end;padding:80px 40px}
    h1{font-size:72px;color:#00ffcc;margin:0}
    section{padding:60px 40px}
    .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:20px}
    .game-card{background:#1a1a1a;padding:10px;border-radius:10px}
  </style>
</head>
<body>
  <nav class="nav">NEXUS GAME CENTER</nav>
  <div class="hero"><h1>VIRTUAL<br/>DOMINATION.</h1></div>
  <section>
    <h2>Trending Now</h2>
    <div class="grid">
      <div class="game-card">
        <div style="height:250px;background:#333;border-radius:8px;"></div>
        <b>CyberQuest 2077</b>
      </div>
      <div class="game-card">
        <div style="height:250px;background:#333;border-radius:8px;"></div>
        <b>Arena Elite</b>
      </div>
      <div class="game-card">
        <div style="height:250px;background:#333;border-radius:8px;"></div>
        <b>Space Drifters</b>
      </div>
    </div>
  </section>
</body>
</html>`},
  {icon:'🎨',en:'Art Gallery',fr:'Galerie d\'Art',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Vision Fine Art</title>
  <style>
    body{font-family:serif;background:#fff;margin:0}
    .hero{height:100vh;display:flex;align-items:center;padding:0 10%}
    h1{font-size:120px;font-style:italic;color:#eee;position:absolute;left:0;right:0;text-align:center;z-index:0;user-select:none}
    .box{background:#000;color:#fff;padding:60px;z-index:1;max-width:400px}
    section{padding:100px 10%;display:grid;grid-template-columns:repeat(2,1fr);gap:40px}
  </style>
</head>
<body>
  <h1>EXPRESSION.</h1>
  <div class="hero">
    <div class="box">
      <b>Current Exhibition</b>
      <h2>Minimalist Souls</h2>
      <p>Experience the latest works from emerging digital artists worldwide.</p>
    </div>
  </div>
  <section>
    <div style="background:#f5f5f5;height:500px"></div>
    <div style="background:#f5f5f5;height:500px"></div>
  </section>
</body>
</html>`},
  {icon:'🧼',en:'Cleaning Service',fr:'Service de Nettoyage',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>CleanPro</title>
  <style>
    body{font-family:sans-serif;margin:0}
    .hero{padding:100px 40px;background:#06b6d4;color:#fff;text-align:center}
    h1{font-size:48px}
    section{padding:60px 40px;max-width:1100px;margin:auto;display:grid;grid-template-columns:repeat(3,1fr);gap:30px}
    .card{text-align:center;padding:30px;border:1px solid #eee;border-radius:20px;transition:0.3s}
    .card:hover{border-color:#06b6d4;box-shadow:0 10px 30px rgba(0,0,0,0.05)}
  </style>
</head>
<body>
  <div class="hero">
    <h1>Quality Cleaning.<br/>Sparkling Home.</h1>
    <p>Professional home and office cleaning services you can trust.</p>
  </div>
  <section>
    <div class="card"><h3>House Cleaning</h3><p>Weekly or monthly deep clean.</p></div>
    <div class="card"><h3>Office Space</h3><p>Professional workspace maintenance.</p></div>
    <div class="card"><h3>Windows</h3><p>Crystal clear views for your home.</p></div>
  </section>
</body>
</html>`},
  {icon:'🚗',en:'Car Wash',fr:'Lavage Auto',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>AquaShine</title>
  <style>
    body{font-family:Inter;margin:0}
    .hero{height:60vh;background-image:linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('https://images.unsplash.com/photo-1520340356584-f9d27d75835e?w=1000');background-size:cover;display:flex;align-items:center;justify-content:center;color:#fff;text-align:center}
    h1{font-size:56px;color:#38bdf8}
    section{padding:80px 10%}
    .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
    .card{background:#f8fafc;padding:30px;border-radius:15px;text-align:center}
  </style>
</head>
<body>
  <div class="hero">
    <div>
      <h1>PRISTINE CARE.<br/>PREMIUM GLOSS.</h1>
      <button style="margin-top:20px;padding:15px 40px;background:#38bdf8;border:none;color:#fff;font-weight:900;border-radius:50px;cursor:pointer;">BOOK NOW</button>
    </div>
  </div>
  <section>
    <h2>Our Packages</h2>
    <div class="grid">
      <div class="card"><h3>Express</h3><b>$19</b></div>
      <div class="card"><h3>Deluxe</h3><b>$39</b></div>
      <div class="card"><h3>Supreme</h3><b>$59</b></div>
    </div>
  </section>
</body>
</html>`},
  {icon:'💍',en:'Jewelry Shop',fr:'Bijouterie',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Luminous</title>
  <style>
    body{font-family:'Montserrat',serif;background:#fff;margin:0;color:#222}
    .nav{padding:30px;text-align:center;font-size:24px;border-bottom:1px solid #eee}
    .hero{height:80vh;background:#faf6f2;display:flex;align-items:center;padding:0 10%}
    .hero h1{font-size:64px;font-style:italic;font-weight:200}
    section{padding:80px 10%;display:grid;grid-template-columns:repeat(3,1fr);gap:40px}
    .item{text-align:center}.img{height:300px;background:#eee;margin-bottom:15px}
  </style>
</head>
<body>
  <div class="nav">LUMINOUS GEMS</div>
  <div class="hero">
    <h1>Elegance Found<br/>In Every Detail.</h1>
  </div>
  <section>
    <div class="item"><div class="img"></div><b>Diamond Necklace</b><p>$1,450</p></div>
    <div class="item"><div class="img"></div><b>Gold Ring</b><p>$890</p></div>
    <div class="item"><div class="img"></div><b>Blue Sapphire</b><p>$2,100</p></div>
  </section>
</body>
</html>`},
  {icon:'🛡️',en:'Cyber Security',fr:'Cybersécurité',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Nexus Guard</title>
  <style>
    body{background:#000212;color:#fff;font-family:system-ui;margin:0}
    .hero{padding:120px 40px;text-align:center;background:radial-gradient(circle at center, #1a237e 0%, #000212 100%)}
    h1{font-size:64px;color:#4fc3f7}
    p{color:#90caf9;max-width:700px;margin:20px auto}
    section{padding:80px 40px;display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
    .box{background:rgba(255,255,255,0.03);padding:30px;border-radius:15px;border:1px solid rgba(79,195,247,0.1)}
  </style>
</head>
<body>
  <div class="hero">
    <h1>Zero Trust.<br/>Absolute Security.</h1>
    <p>Protecting global infrastructures from advanced persistent threats.</p>
  </div>
  <section>
    <div class="box">🛡️ Firewall</div>
    <div class="box">👁️ Monitoring</div>
    <div class="box">📜 Compliance</div>
    <div class="box">🌩️ Cloud Sec</div>
  </section>
</body>
</html>`},
  {icon:'🦷',en:'Dental Care',fr:'Cabinet Dentaire',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>BrightSmile</title>
  <style>
    body{font-family:Inter;margin:0;color:#334155}
    .hero{padding:100px 5%;background:#f1f5f9;display:flex;align-items:center;gap:40px}
    h1{font-size:48px;color:#0f172a}
    .btn{padding:12px 24px;background:#3b82f6;color:#fff;border-radius:8px;font-weight:700;border:none}
    section{padding:80px 5%}
    .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
  </style>
</head>
<body>
  <div class="hero">
    <div>
      <h1>Healthy Smile,<br/>Better Life.</h1>
      <p>Modern dentistry with a personal touch in the heart of the city.</p>
      <button class="btn">Book Visit</button>
    </div>
    <div style="flex:1;background:#fff;height:300px;border-radius:20px;"></div>
  </div>
  <section>
    <h2>Our Services</h2>
    <div class="grid">
      <div>🦷 General</div>
      <div>💎 Cosmetic</div>
      <div>⚙️ Implants</div>
    </div>
  </section>
</body>
</html>`},
  {icon:'🥐',en:'Artisan Bakery',fr:'Boulangerie',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Golden Crust</title>
  <style>
    body{font-family:serif;background:#fffaf0;color:#5d4037;margin:0}
    .hero{height:60vh;text-align:center;padding:100px 20px}
    h1{font-size:64px;margin:0}
    .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:15px;padding:40px}
    .box{height:250px;background:#eedcc8;border-radius:10px}
  </style>
</head>
<body>
  <div class="hero">
    <b>ESTABLISHED 1954</b>
    <h1>GOLDEN CRUST</h1>
    <p>Freshly baked every single morning.</p>
  </div>
  <div class="grid">
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
  </div>
</body>
</html>`},
  {icon:'🚀',en:'Tech Startup',fr:'Startup Tech',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Nova</title>
  <style>
    body{background:#020617;color:#fff;font-family:Inter;margin:0}
    .hero{padding:150px 20px;text-align:center}
    h1{font-size:72px;background:linear-gradient(to right,#38bdf8,#818cf8);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:30px;max-width:1000px;margin:auto}
    .card{background:#0f172a;padding:40px;border-radius:24px;border:1px solid #1e293b}
  </style>
</head>
<body>
  <div class="hero">
    <h1>Future Focused.</h1>
    <p>The next generation of cloud computing infrastructure.</p>
  </div>
  <div class="grid">
    <div class="card">10x Speed</div>
    <div class="card">Global CDN</div>
    <div class="card">Zero Latency</div>
  </div>
</body>
</html>`},
  {icon:'💍',en:'Wedding RSVP',fr:'Mariage RSVP',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>J & M Wedding</title>
  <style>
    body{font-family:Lora;background:#fdfaf9;color:#7c6a6a;margin:0;text-align:center}
    .hero{padding:120px 20px}
    h1{font-size:64px;font-family:cursive;color:#b08d8d}
    .form{max-width:400px;margin:auto;background:#fff;padding:40px;border-radius:15px;box-shadow:0 10px 30px rgba(0,0,0,0.05)}
    input{width:100%;padding:10px;margin:10px 0;border:1px solid #eee}
  </style>
</head>
<body>
  <div class="hero">
    <b>SAVE THE DATE</b>
    <h1>Julia & Mark</h1>
    <p>September 14, 2026 • Paris</p>
  </div>
  <div class="form">
    <h3>Are you coming?</h3>
    <input placeholder="Your Name">
    <button style="width:100%;padding:15px;background:#b08d8d;color:#fff;border:none;cursor:pointer">Count Me In!</button>
  </div>
</body>
</html>`},
  {icon:'🎹',en:'Music Artist',fr:'Artiste Musicien',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Luna Echo</title>
  <style>
    body{background:#000;color:#fff;font-family:sans-serif;margin:0}
    .hero{height:100vh;background:#111;display:flex;align-items:center;padding:0 5%}
    h1{font-size:120px;font-weight:900;letter-spacing:-5px}
    .sidebar{position:fixed;right:40px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:20px}
    .tour{padding:100px 5%}
    table{width:100%}
    .date{color:#ff0055}
  </style>
</head>
<body>
  <div class="hero">
    <h1>LUNA<br/>ECHO.</h1>
  </div>
  <div class="sidebar">
    <span>IG</span><span>TW</span><span>YT</span>
  </div>
  <div class="tour">
    <h2>World Tour 2026</h2>
    <table>
      <tr><td class="date">Oct 12</td><td>London, O2 Arena</td></tr>
      <tr><td class="date">Oct 15</td><td>Paris, ACCOR</td></tr>
      <tr><td class="date">Oct 20</td><td>Berlin, Mercedes</td></tr>
    </table>
  </div>
</body>
</html>`},
  {icon:'💈',en:'Barber Shop',fr:'Salon Barbier',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>The Blade</title>
  <style>
    body{font-family:Oswald;background:#1a1a1a;color:#fff;margin:0}
    .hero{height:70vh;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
    .hero h1{font-size:80px;color:#d4af37}
    section{padding:80px 20px;max-width:800px;margin:auto}
    .price{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px dashed #333}
  </style>
</head>
<body>
  <div class="hero">
    <b>PREMIUM GROOMING</b>
    <h1>THE BLADE</h1>
    <button style="margin-top:20px;padding:15px 40px;background:#d4af37;border:none;font-weight:900;cursor:pointer;">BOOK NOW</button>
  </div>
  <section>
    <h2>Services</h2>
    <div class="price"><span>Classic Cut</span><span>$35</span></div>
    <div class="price"><span>Beard Trim</span><span>$20</span></div>
    <div class="price"><span>Luxury Shave</span><span>$45</span></div>
  </section>
</body>
</html>`},
  {icon:'💻',en:'IT Consulting',fr:'Conseil IT',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>NetCore</title>
  <style>
    body{font-family:Inter;margin:0;color:#1e293b}
    .nav{padding:25px;display:flex;justify-content:space-between;background:#fff;border-bottom:1px solid #eee}
    .hero{padding:120px 40px;background:#f8fafc;text-align:center}
    h1{font-size:54px;color:#1e293b}
    section{padding:80px 40px;display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
  </style>
</head>
<body>
  <nav class="nav">
    <b>NETCORE</b>
    <div>Work | Cloud | Security | Contact</div>
  </nav>
  <div class="hero">
    <h1>Empowering Your<br/>Digital Strategy.</h1>
    <p>Expert consulting for enterprise-grade technology infrastructure.</p>
  </div>
  <section>
    <div style="padding:20px;background:#fff;border:1px solid #eee">Strategy</div>
    <div style="padding:20px;background:#fff;border:1px solid #eee">Cloud Migration</div>
    <div style="padding:20px;background:#fff;border:1px solid #eee">CyberSec</div>
    <div style="padding:20px;background:#fff;border:1px solid #eee">DevOps</div>
  </section>
</body>
</html>`},
  {icon:'👗',en:'Boutique Store',fr:'Boutique Luxe',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Serene Fashion</title>
  <style>
    body{font-family:serif;margin:0;background:#fffafc}
    .nav{padding:30px;text-align:center;font-size:28px}
    .hero{height:60vh;background:#eee;margin:0 40px;border-radius:20px;display:flex;align-items:center;justify-content:center}
    h1{font-size:60px;color:#a08484}
    section{padding:80px 40px;display:grid;grid-template-columns:repeat(5,1fr);gap:15px}
    .item{height:250px;background:#f0e8e8;border-radius:10px}
  </style>
</head>
<body>
  <div class="nav">SERENE</div>
  <div class="hero"><h1>Seasonal Grace.</h1></div>
  <section>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
  </section>
</body>
</html>`},
  {icon:'🍏',en:'Organic Market',fr:'Marché Bio',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>PureFood</title>
  <style>
    body{font-family:system-ui;margin:0;color:#166534}
    .hero{padding:100px 40px;background:#f0fdf4;text-align:center}
    h1{font-size:54px;color:#15803d}
    section{padding:60px 40px;display:grid;grid-template-columns:repeat(3,1fr);gap:30px}
    .card{background:#fff;padding:30px;border:1px solid #dcfce7;border-radius:20px}
  </style>
</head>
<body>
  <div class="hero">
    <h1>Fresh From The<br/>Local Farm.</h1>
    <p>100% Organic, Pesticide-free, and Sustainably Grown.</p>
  </div>
  <section>
    <div class="card">🥦 Vegetables</div>
    <div class="card">🍎 Fruits</div>
    <div class="card">🥚 Dairy</div>
  </section>
</body>
</html>`},
  {icon:'🏠',en:'Interior Design',fr:'Design Intérieur',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Vogue Living</title>
  <style>
    body{font-family:Montserrat;margin:0;background:#fff}
    .nav{padding:40px;display:flex;justify-content:space-between;font-weight:800}
    .hero{height:90vh;display:flex;padding:0 40px;gap:40px}
    .h-left{flex:1;display:flex;flex-direction:column;justify-content:center}
    h1{font-size:72px;line-height:1}
    .h-right{flex:1.5;background:#eee;border-radius:20px}
  </style>
</head>
<body>
  <nav class="nav">VL STUDIO<div>Portfolio | Services | Contact</div></nav>
  <div class="hero">
    <div class="h-left">
      <h1>LIVING<br/>BOLDLY.</h1>
      <p>Curated spaces for the modern individual.</p>
    </div>
    <div class="h-right"></div>
  </div>
</body>
</html>`},
  {icon:'🚗',en:'Auto Repair',fr:'Garage Auto',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>MechPro</title>
  <style>
    body{font-family:Inter;margin:0}
    .top{background:#ef4444;color:#fff;padding:10px;text-align:center}
    .hero{padding:100px 40px;background:#1e293b;color:#fff}
    .btn{padding:15px 30px;background:#ef4444;border:none;color:#fff;font-weight:900;cursor:pointer}
    section{padding:80px 40px;display:grid;grid-template-columns:repeat(3,1fr);gap:30px}
    .box{border:1px solid #eee;padding:30px;border-radius:10px}
  </style>
</head>
<body>
  <div class="top">Emergency Towing: 555-AUTO</div>
  <div class="hero">
    <h1>Expert Repairs.<br/>Honest Pricing.</h1>
    <p>Your trusted neighborhood mechanic for over 20 years.</p>
    <button class="btn">Get Quote</button>
  </div>
  <section>
    <div class="box">Engine Fix</div>
    <div class="box">Oil Change</div>
    <div class="box">Brakes</div>
  </section>
</body>
</html>`},
  {icon:'📚',en:'Library/Bookstore',fr:'Librairie Pro',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Literary Hub</title>
  <style>
    body{font-family:serif;background:#fffcf5;margin:0;color:#2c1810}
    .nav{padding:25px;background:#2c1810;color:#fff;display:flex;justify-content:space-between}
    .hero{padding:100px 40px;text-align:center}
    section{padding:60px 40px}
    .grid{display:grid;grid-template-columns:repeat(6,1fr);gap:20px}
    .book{height:250px;background:#d7ccc8;border-radius:4px;box-shadow:5px 5px 15px rgba(0,0,0,0.1)}
  </style>
</head>
<body>
  <nav class="nav">
    <b>THE HUB</b>
    <div>Catalog | Clubs | Events</div>
  </nav>
  <div class="hero">
    <h1>Lost in Pages.</h1>
    <p>Discover your next great adventure within our curated collection.</p>
  </div>
  <section>
    <h2>Staff Picks</h2>
    <div class="grid">
      <div class="book"></div>
      <div class="book"></div>
      <div class="book"></div>
      <div class="book"></div>
      <div class="book"></div>
      <div class="book"></div>
    </div>
  </section>
</body>
</html>`},
  {icon:'🎥',en:'Film Production',fr:'Production Film',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Apex Cinema</title>
  <style>
    body{background:#000;color:#fff;font-family:sans-serif;margin:0}
    .vid{height:80vh;background:#111;display:flex;align-items:center;justify-content:center;font-size:40px;font-weight:900;letter-spacing:10px}
    .cnt{padding:100px 50px}
    h1{font-size:64px;margin:0}
    .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;padding:50px 0}
    .work{height:350px;background:#222;border:1px solid #333}
  </style>
</head>
<body>
  <div class="vid">APEX MOTION</div>
  <div class="cnt">
    <h1>Visual Narratives.</h1>
    <div class="grid">
      <div class="work"></div>
      <div class="work"></div>
      <div class="work"></div>
    </div>
  </div>
</body>
</html>`},
  {icon:'🌿',en:'Garden Center',fr:'Jardinerie Pro',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>GreenLeaf</title>
  <style>
    body{font-family:Inter;margin:0;color:#134e4a}
    .hero{padding:120px 40px;background:#f0fdfa;display:flex;align-items:center;gap:60px}
    h1{font-size:54px;color:#0f766e}
    section{padding:80px 40px;display:grid;grid-template-columns:repeat(3,1fr);gap:30px}
    .p-card{background:#fff;padding:20px;border:1px solid #ccfbf1;border-radius:15px}
  </style>
</head>
<body>
  <div class="hero">
    <div>
      <h1>Grow Your Own<br/>Paradise.</h1>
      <button style="padding:15px 30px;background:#0d9488;color:#fff;border:none;border-radius:40px;cursor:pointer">Shop Plants</button>
    </div>
  </div>
  <section>
    <div class="p-card">Indoor Palms</div>
    <div class="p-card">Desert Succulents</div>
    <div class="p-card">Rare Flowers</div>
  </section>
</body>
</html>`},
  {icon:'🛁',en:'Luxury Spa',fr:'Spa & Détente',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Orchid Spa</title>
  <style>
    body{font-family:Lora;background:#fdfcfb;margin:0;color:#645c55}
    .hero{height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
    h1{font-size:72px;font-weight:100;color:#8d7b68}
    section{padding:100px 20px;max-width:900px;margin:auto}
    .service{display:flex;justify-content:space-between;padding:25px 0;border-bottom:1px solid #eee}
  </style>
</head>
<body>
  <div class="hero">
    <h1>ORCHID</h1>
    <p>Rejuvenation for Mind, Body, and Spirit.</p>
  </div>
  <section>
    <h2>Our Treatments</h2>
    <div class="service"><span>Stone Massage</span><span>$120</span></div>
    <div class="service"><span>Facial Glow</span><span>$85</span></div>
    <div class="service"><span>Aroma Therapy</span><span>$95</span></div>
  </section>
</body>
</html>`},
  {icon:'🏠',en:'Real Estate II',fr:'Immobilier Luxe',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Elite Homes</title>
  <style>
    body{font-family:Inter;margin:0}
    .nav{padding:20px 50px;background:#111;color:#fff;display:flex;justify-content:space-between}
    .hero{height:80vh;background-image:linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000');background-size:cover;display:flex;align-items:center;padding-left:50px}
    h1{font-size:64px;color:#fff}
    .filter{margin-top:20px;background:#fff;padding:20px;display:flex;gap:10px;width:fit-content;border-radius:8px}
  </style>
</head>
<body>
  <nav class="nav">
    <b>ELITE HOMES</b>
    <div>Listing | Sell | Agents</div>
  </nav>
  <div class="hero">
    <div>
      <h1>Find Your Signature<br/>Residence.</h1>
      <div class="filter">
        <input placeholder="City">
        <button style="background:#000;color:#fff;padding:10px 20px;border:none;">SEARCH</button>
      </div>
    </div>
  </div>
</body>
</html>`},
  {icon:'📅',en:'Event Agency',fr:'Agence Événement',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Vivid Events</title>
  <style>
    body{font-family:Inter;margin:0;background:#050505;color:#fff}
    .hero{padding:150px 20px;text-align:center}
    h1{font-size:84px;font-weight:900;text-transform:uppercase;color:#ff3e3e}
    section{padding:100px 5%}
    .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:15px}
    .box{height:400px;background:#111;position:relative;display:flex;align-items:end;padding:20px;font-size:24px;font-weight:700}
    .box::after{content:'';position:absolute;inset:0;background:linear-gradient(transparent,#ff3e3e);opacity:0.3}
  </style>
</head>
<body>
  <div class="hero"><h1>We Create<br/>Moments.</h1></div>
  <section>
    <h2>What we do</h2>
    <div class="grid">
      <div class="box">Weddings</div>
      <div class="box">Concerts</div>
      <div class="box">Corporate</div>
    </div>
  </section>
</body>
</html>`},
  {icon:'🔧',en:'Plumbing Pro',fr:'Plomberie',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>FastLeak</title>
  <style>
    body{font-family:system-ui;margin:0}
    .top{background:#2563eb;color:#fff;padding:10px;text-align:center;font-weight:900}
    .hero{padding:100px 40px;background:#eff6ff}
    .btn{padding:15px 40px;background:#2563eb;color:#fff;border:none;border-radius:8px;font-weight:900;font-size:20px;cursor:pointer}
    section{padding:60px 40px;display:grid;grid-template-columns:repeat(3,1fr);gap:30px}
    .card{background:#fff;padding:30px;border-radius:15px;box-shadow:0 10px 30px rgba(0,0,0,0.05)}
  </style>
</head>
<body>
  <div class="top">24/7 EMERGENCY REPAIR</div>
  <div class="hero">
    <h1>No Leak Too Big.<br/>No Job Too Small.</h1>
    <p>Professional plumbing services with instant arrival times.</p>
    <button class="btn">Call Now: 0-800-PLUMB</button>
  </div>
  <section>
    <div class="card">Pipe Repairs</div>
    <div class="card">Drain Cleaning</div>
    <div class="card">Water Heaters</div>
  </section>
</body>
</html>`},
  {icon:'🚚',en:'Logistics',fr:'Logistique Pro',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>GlobeMove</title>
  <style>
    body{font-family:Inter;margin:0}
    .nav{padding:20px 40px;display:flex;justify-content:space-between;background:#111;color:#fff}
    .hero{padding:120px 40px;background:#f4f4f5;display:flex;gap:50px}
    h1{font-size:54px;color:#18181b}
    section{padding:80px 40px}
    .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
    .box{background:#fff;padding:25px;border-radius:12px;border:1px solid #e4e4e7}
  </style>
</head>
<body>
  <nav class="nav">
    <b>GLOBEMOVE</b>
    <div>Shipping | Tracking | Logistics</div>
  </nav>
  <div class="hero">
    <div>
      <h1>Moving the World<br/>Forward.</h1>
      <p>Efficient, reliable, and global freight solutions for your business.</p>
    </div>
    <div style="flex:1;background:#fff;height:300px;border-radius:12px;"></div>
  </div>
  <section>
    <h2>Core Services</h2>
    <div class="grid">
      <div class="box">Air Freight</div>
      <div class="box">Sea Shipping</div>
      <div class="box">Land Transport</div>
      <div class="box">Warehousing</div>
    </div>
  </section>
</body>
</html>`},
  {icon:'📈',en:'Finance Firm',fr:'Cabinet Finance',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>CapitalPlus</title>
  <style>
    body{font-family:sans-serif;margin:0;color:#333}
    .hdr{padding:30px 10%;display:flex;justify-content:space-between;background:#fff;border-bottom:5px solid #064e3b}
    .hero{padding:120px 10%;background:#ecfdf5}
    h1{font-size:54px;color:#064e3b}
    section{padding:80px 10%}
    .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:40px}
    .card{padding:40px;background:#fff;border-radius:4px;box-shadow:0 10px 40px rgba(0,0,0,0.05)}
  </style>
</head>
<body>
  <div class="hdr">
    <b>CAPITALPLUS</b>
    <div>Consulting | Wealth | Assets</div>
  </div>
  <div class="hero">
    <h1>Grow Your Assets.<br/>Secure Your Future.</h1>
    <p>Bespoke wealth management for high net worth individuals.</p>
  </div>
  <section>
    <div class="grid">
      <div class="card">Investment Strategy</div>
      <div class="card">Tax Optimization</div>
      <div class="card">Estate Planning</div>
    </div>
  </section>
</body>
</html>`},
  {icon:'🔌',en:'Electrician',fr:'Électricien Pro',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>VoltWise</title>
  <style>
    body{font-family:system-ui;margin:0}
    .hero{padding:100px 40px;background:#fef9c3;color:#854d0e}
    h1{font-size:54px}
    section{padding:80px 40px;display:grid;grid-template-columns:repeat(3,1fr);gap:30px}
    .box{background:#fff;padding:30px;border-radius:20px;border-left:8px solid #eab308}
  </style>
</head>
<body>
  <div class="hero">
    <h1>Reliable Power.<br/>Safe Connections.</h1>
    <p>Residential and commercial electrical excellence.</p>
    <button style="padding:15px 40px;background:#eab308;color:#000;border:none;font-weight:900;cursor:pointer">24h Help</button>
  </div>
  <section>
    <div class="box">Rewiring</div>
    <div class="box">Lighting Installation</div>
    <div class="box">System Diagnostics</div>
  </section>
</body>
</html>`},
  {icon:'🏨',en:'Hotel Booking',fr:'Réservation Hôtel',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>StayLink</title>
  <style>
    body{font-family:Inter;margin:0}
    .hero{height:50vh;background:#3b82f6;display:flex;align-items:center;justify-content:center;color:#fff}
    h1{font-size:48px}
    section{padding:80px 5%}
    .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px}
    .card{height:350px;background:#f8fafc;border-radius:20px;overflow:hidden}
    .img{height:70%;background:#eee}
  </style>
</head>
<body>
  <div class="hero"><h1>Where to next?</h1></div>
  <section>
    <h2>Top Rated Stays</h2>
    <div class="grid">
      <div class="card">
        <div class="img"></div>
        <div style="padding:15px"><b>Alpine Lodge</b><br/>$140/night</div>
      </div>
      <div class="card">
        <div class="img"></div>
        <div style="padding:15px"><b>Beach Cabana</b><br/>$90/night</div>
      </div>
      <div class="card">
        <div class="img"></div>
        <div style="padding:15px"><b>City Loft</b><br/>$210/night</div>
      </div>
    </div>
  </section>
</body>
</html>`},
  {icon:'🛍️',en:'Grocery Mall',fr:'Supermarché',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>FreshChoice</title>
  <style>
    body{font-family:system-ui;margin:0}
    .nav{padding:20px 5%;background:#16a34a;color:#fff;display:flex;justify-content:space-between}
    .hero{padding:60px 40px;background:#f0fdf4;text-align:center}
    h1{font-size:42px}
    section{padding:40px 5%}
    .grid{display:grid;grid-template-columns:repeat(6,1fr);gap:15px}
    .cat{height:120px;background:#fff;border:1px solid #dcfce7;border-radius:15px;display:flex;align-items:center;justify-content:center;font-weight:700}
  </style>
</head>
<body>
  <nav class="nav"><b>FRESHCHOICE</b><div>App | Rewards | Deals</div></nav>
  <div class="hero"><h1>Daily Freshness<br/>Delivered to You.</h1></div>
  <section>
    <h2>Shop by Category</h2>
    <div class="grid">
      <div class="cat">🍎 Fruit</div>
      <div class="cat">🥛 Dairy</div>
      <div class="cat">🥩 Meat</div>
      <div class="cat">🍞 Bakery</div>
      <div class="cat">🥫 Pantry</div>
      <div class="cat">🍷 Drinks</div>
    </div>
  </section>
</body>
</html>`},
  {icon:'💅',en:'Beauty Salon',fr:'Salon Beauté',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Glow Studio</title>
  <style>
    body{font-family:Lora;background:#fffcfc;margin:0;color:#544141}
    .hero{padding:120px 20px;text-align:center}
    h1{font-size:64px;color:#db2777}
    section{padding:80px 40px;display:grid;grid-template-columns:repeat(3,1fr);gap:30px}
    .card{background:#fff;padding:30px;border-radius:25px;text-align:center;box-shadow:0 10px 40px rgba(219,39,119,0.05)}
  </style>
</head>
<body>
  <div class="hero">
    <h1>UNVEIL YOUR<br/>NATURAL BEAUTY.</h1>
    <button style="margin-top:20px;padding:15px 40px;background:#db2777;color:#fff;border:none;border-radius:50px;cursor:pointer">Book Session</button>
  </div>
  <section>
    <div class="card">Nail Art</div>
    <div class="card">Skin Therapy</div>
    <div class="card">Hair Styling</div>
  </section>
</body>
</html>`},
  {icon:'💻',en:'Developer Portfolio',fr:'Portfolio Développeur',code:`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>DevFolio</title>
  <style>
    body{background:#0a0a0a;color:#fff;font-family:sans-serif;margin:0}
    .intro{height:100vh;display:flex;flex-direction:column;justify-content:center;padding:0 10%}
    h1{font-size:120px;margin:0;letter-spacing:-4px}
    span{color:#3b82f6}
    section{padding:100px 10%}
    .proj{display:grid;grid-template-columns:1fr 1fr;gap:40px}
    .box{height:400px;background:#111;border:1px solid #222}
  </style>
</head>
<body>
  <div class="intro">
    <b>HELLO, I AM ALEX.</b>
    <h1>BUILDING<br/>THE <span>WEB</span>.</h1>
  </div>
  <section>
    <h2>Selected Work</h2>
    <div class="proj">
      <div class="box"></div>
      <div class="box"></div>
    </div>
  </section>
</body>
</html>`}
];
