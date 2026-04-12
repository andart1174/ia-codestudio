'use strict';
/* IA Architecte — Apps Pro Library (50 Unique Professional Templates) */

const APPS_PRO_DATA = [
  /* --- 1: FINTECH / CRYPTO --- */
  {
    icon: '📊', en: 'Crypto Dash Pro', fr: 'Crypto Dash Pro',
    desc_en: 'Professional cryptocurrency tracking with live candlestick charts and wallet data.',
    desc_fr: 'Suivi pro de crypto avec graphiques en chandeliers și données de portefeuille.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Crypto Pro</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #0e1118; color: #e2e8f0; padding: 24px; }
        .grid { display: grid; grid-template-columns: 1fr 340px; gap: 24px; max-width: 1400px; margin: 0 auto; }
        .card { background: #1a1f2e; border: 1px solid rgba(255,255,255,.05); border-radius: 24px; padding: 32px; }
        .stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; }
        .stat-box { background: #111521; padding: 20px; border-radius: 16px; border: 1px solid rgba(255,255,255,.05); }
        .c-up { color: #10b981; }
        .c-down { color: #ef4444; }
        .chart-mock { height: 300px; background: linear-gradient(180deg, rgba(59,130,246,.1) 0%, transparent 100%); border-bottom: 2px solid #3b82f6; position: relative; margin: 40px 0; }
        .wallet-item { display: flex; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,.05); }
        .btn-trade { width: 100%; padding: 16px; background: #3b82f6; color: #fff; border: none; border-radius: 12px; font-weight: 800; cursor: pointer; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="grid">
        <div class="main-side">
            <div class="card">
                <h1 style="font-size: 24px; margin-bottom: 24px">BTC / USDT <span style="font-size: 14px; color: #94a3b8; font-weight: 400">Bitcoin</span></h1>
                <div class="stat-grid">
                    <div class="stat-box">
                        <div style="font-size: 12px; color: #94a3b8">Price</div>
                        <div style="font-size: 20px; font-weight: 900">$64,281.50</div>
                    </div>
                    <div class="stat-box">
                        <div style="font-size: 12px; color: #94a3b8">24h Change</div>
                        <div class="c-up" style="font-size: 20px; font-weight: 900">+4.2%</div>
                    </div>
                    <div class="stat-box">
                        <div style="font-size: 12px; color: #94a3b8">Volume</div>
                        <div style="font-size: 20px; font-weight: 900">1.2B</div>
                    </div>
                </div>
                <div class="chart-mock"></div>
            </div>
        </div>
        <div class="wallet-side">
            <div class="card">
                <h3>Your Assets</h3>
                <br>
                <div class="wallet-item">
                    <span>Bitcoin (BTC)</span>
                    <div style="text-align: right">
                        <div>0.42 BTC</div>
                        <div style="font-size: 12px; color: #94a3b8">$27k</div>
                    </div>
                </div>
                <div class="wallet-item">
                    <span>Ethereum (ETH)</span>
                    <div style="text-align: right">
                        <div>4.5 ETH</div>
                        <div style="font-size: 12px; color: #94a3b8">$14k</div>
                    </div>
                </div>
                <div class="wallet-item">
                    <span>Solana (SOL)</span>
                    <div style="text-align: right">
                        <div>120 SOL</div>
                        <div style="font-size: 12px; color: #94a3b8">$18k</div>
                    </div>
                </div>
                <button class="btn-trade">Quick Trade</button>
            </div>
        </div>
    </div>
</body>
</html>`
  },
  /* --- 2: INVOICING --- */
  {
    icon: '🏦', en: 'Invoicing Pro', fr: 'Invoicing Pro',
    desc_en: 'Create and manage professional invoices with PDF export and client tracking.',
    desc_fr: 'Créez și gérez des factures professionnelles avec export PDF.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Invoicing Pro</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #f1f5f9; padding: 40px; color: #1e293b; }
        .invoice-card { max-width: 900px; margin: 0 auto; background: #fff; border-radius: 2px; box-shadow: 0 10px 30px rgba(0,0,0,.05); padding: 80px; min-height: 1000px; position: relative; }
        .header { display: flex; justify-content: space-between; margin-bottom: 60px; }
        .logo { font-size: 32px; font-weight: 900; color: #0f172a; }
        .info-row { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 60px; }
        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; padding: 12px; background: #f8fafc; color: #64748b; font-size: 11px; text-transform: uppercase; }
        td { padding: 16px 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
        .total-box { margin-left: auto; width: 300px; margin-top: 40px; padding: 20px 0; }
        .tot-row { display: flex; justify-content: space-between; padding: 8px 0; }
        .btn-print { position: fixed; bottom: 40px; right: 40px; padding: 14px 28px; background: #0f172a; color: #fff; border-radius: 12px; font-weight: 700; cursor: pointer; }
    </style>
</head>
<body>
    <div class="invoice-card">
        <div class="header">
            <div class="logo">ArchStudio.</div>
            <div>
                <h2 style="text-align: right">INVOICE</h2>
                <p style="color: #64748b; text-align: right">#INV-2024-001</p>
            </div>
        </div>
        <div class="info-row">
            <div>
                <h4 style="font-size: 11px; color: #94a3b8; text-transform: uppercase">From</h4>
                <p>Andrei Architecte<br>123 Design Street<br>Paris, FR</p>
            </div>
            <div>
                <h4 style="font-size: 11px; color: #94a3b8; text-transform: uppercase">Bill To</h4>
                <p>AuraGen IDE Inc.<br>456 Tech Park<br>San Francisco, CA</p>
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Hours</th>
                    <th>Rate</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>E-commerce UI/UX Website Design</td>
                    <td>40</td>
                    <td>$100.00</td>
                    <td>$4,000.00</td>
                </tr>
                <tr>
                    <td>React Frontend Implementation</td>
                    <td>30</td>
                    <td>$120.00</td>
                    <td>$3,600.00</td>
                </tr>
                <tr>
                    <td>Backend API Integration</td>
                    <td>15</td>
                    <td>$150.00</td>
                    <td>$2,250.00</td>
                </tr>
            </tbody>
        </table>
        <div class="total-box">
            <div class="tot-row"><span>Subtotal</span><span>$9,850.00</span></div>
            <div class="tot-row"><span>Tax (20%)</span><span>$1,970.00</span></div>
            <div class="tot-row" style="font-weight: 900; font-size: 20px; border-top: 2px solid #000; margin-top: 10px; padding-top: 10px">
                <span>Total</span><span>$11,820.00</span>
            </div>
        </div>
    </div>
    <button class="btn-print" onclick="window.print()">Download PDF</button>
</body>
</html>`
  },
  /* --- 3: API CONSOLE --- */
  {
    icon: '🔌', en: 'API Console Pro', fr: 'Console API Pro',
    desc_en: 'Monitor endpoints, test requests and inspect server responses in real-time.',
    desc_fr: 'Monitorez les terminaux, testez les requêtes și inspectez les réponses.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>API Console</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'JetBrains Mono', monospace; }
        body { background: #0d0d0d; color: #00ff00; display: flex; height: 100vh; }
        .sidebar { width: 260px; background: #141414; border-right: 1px solid #222; padding: 20px; }
        .main { flex: 1; display: flex; flex-direction: column; }
        .req-bar { background: #1a1a1a; padding: 12px 20px; display: flex; gap: 10px; align-items: center; border-bottom: 1px solid #222; }
        .resp-area { flex: 1; padding: 30px; overflow-y: auto; background: #000; font-size: 13px; }
        .meth-badge { padding: 4px 8px; border-radius: 4px; background: #22c55e; color: #000; font-weight: 900; font-size: 11px; }
        .end-item { padding: 8px; border-radius: 6px; cursor: pointer; margin-bottom: 4px; }
        .end-item:hover { background: #222; }
        .inp { background: #000; border: 1px solid #333; color: #00ff00; padding: 8px 12px; border-radius: 6px; flex: 1; outline: none; }
    </style>
</head>
<body>
    <div class="sidebar">
        <h3>ENDPOINTS</h3>
        <br>
        <div class="end-item active"><span style="color: #22c55e">GET</span> /users</div>
        <div class="end-item"><span style="color: #22c55e">GET</span> /products</div>
        <div class="end-item"><span style="color: #eab308">POST</span> /login</div>
        <div class="end-item"><span style="color: #ef4444">DEL</span> /session</div>
    </div>
    <div class="main">
        <div class="req-bar">
            <span class="meth-badge">GET</span>
            <input class="inp" value="https://api.auragen.io/v1/users?limit=10">
            <button style="padding: 8px 20px; background: #22c55e; color: #000; border: none; border-radius: 6px; font-weight: 900; cursor: pointer">SEND</button>
        </div>
        <div class="resp-area">
            <div style="color: #666; margin-bottom: 20px">// Status: 200 OK | Time: 42ms | Size: 1.2KB</div>
            <pre>
{
  "status": "success",
  "data": {
    "users": [
      { "id": 1, "name": "Andrei M.", "role": "Architect" },
      { "id": 2, "name": "Sarah J.", "role": "DevOps" }
    ],
    "pagination": {
      "total": 240,
      "page": 1
    }
  }
}
            </pre>
        </div>
    </div>
</body>
</html>`
  },
  /* --- 4: SECURITY --- */
  {
    icon: '🔐', en: 'Security Vault', fr: 'Coffre Fort Securité',
    desc_en: 'Manage passwords, encrypted keys and digital identities with multi-factor UI.',
    desc_fr: 'Gérez vos mots de passe și clés chiffrées avec interface MFA.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Vault</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #09090b; color: #fafafa; display: flex; align-items: center; justify-content: center; height: 100vh; }
        .vault-card { width: 400px; background: #18181b; padding: 32px; border-radius: 24px; border: 1px solid #27272a; box-shadow: 0 0 50px rgba(0,0,0,0.5); }
        .input-group { margin-bottom: 20px; }
        label { font-size: 12px; color: #a1a1aa; margin-bottom: 8px; display: block; }
        input { width: 100%; padding: 12px; background: #09090b; border: 1px solid #27272a; border-radius: 10px; color: #fff; outline: none; }
        .btn-unlock { width: 100%; padding: 14px; background: #fff; color: #000; border-radius: 12px; font-weight: 800; border: none; cursor: pointer; margin-top: 10px; }
        .finger { width: 80px; height: 80px; background: #27272a; border-radius: 50%; margin: 0 auto 30px; display: flex; align-items: center; justify-content: center; font-size: 40px; cursor: pointer; }
    </style>
</head>
<body>
    <div class="vault-card">
        <div class="finger">🔘</div>
        <h2 style="text-align: center; margin-bottom: 30px">Security Vault</h2>
        <div class="input-group">
            <label>Master Password</label>
            <input type="password" placeholder="••••••••••••">
        </div>
        <div class="input-group">
            <label>Security Token</label>
            <input type="text" placeholder="000-000">
        </div>
        <button class="btn-unlock" onclick="this.textContent='✅ Access Granted'">Unlock Database</button>
    </div>
</body>
</html>`
  },
  /* --- 5: HEALTH --- */
  {
    icon: '🩺', en: 'Patient Portal', fr: 'Portail Patient',
    desc_en: 'Manage patient records, prescriptions and upcoming appointments in a clean medical interface.',
    desc_fr: 'Gérez dossiers patients, ordonnances și rendez-vous.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Patient Portal</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #f0f9ff; color: #0c4a6e; padding: 40px; }
        .grid { display: grid; grid-template-columns: 300px 1fr; gap: 30px; max-width: 1200px; margin: 0 auto; }
        .card { background: #fff; border-radius: 24px; padding: 32px; box-shadow: 0 10px 40px rgba(12,74,110,.05); }
        .prof-img { width: 120px; height: 120px; background: #bae6fd; border-radius: 50%; margin: 0 auto 20px; }
        .vitals { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 20px; }
        .v-box { background: #f0f9ff; padding: 16px; border-radius: 16px; text-align: center; }
        .appoint { background: #ecfdf5; padding: 20px; border-radius: 20px; border: 1px solid #10b981; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="grid">
        <aside class="side">
            <div class="card" style="text-align: center">
                <div class="prof-img"></div>
                <h3>John Doe</h3>
                <p style="color: #7dd3fc; font-size: 14px">ID: #PAT-88219</p>
                <div class="vitals">
                    <div class="v-box"><b>82</b><br><span style="font-size: 10px">BPM</span></div>
                    <div class="v-box"><b>120/80</b><br><span style="font-size: 10px">BP</span></div>
                </div>
            </div>
        </aside>
        <main class="main">
            <div class="card">
                <h2>Upcoming Appointments</h2>
                <div class="appoint">
                    <b>Dr. Sarah Smith</b><br>
                    Cardiology Checkup • Mon, 14 Aug at 10:00
                </div>
                <div class="appoint" style="background: #fefce8; border-color: #eab308">
                    <b>Dr. Phil Jackson</b><br>
                    General Consultation • Fri, 18 Aug at 15:30
                </div>
                <br>
                <h2>Recent Files</h2>
                <br>
                <div style="padding: 16px; background: #f8fafc; border-radius: 12px; margin-bottom: 10px">📄 Blood Test Results (Jul 2024)</div>
                <div style="padding: 16px; background: #f8fafc; border-radius: 12px">📄 X-Ray Scan - Left Knee (Jun 2024)</div>
            </div>
        </main>
    </div>
</body>
</html>`
  },
  /* --- 6: REAL ESTATE --- */
  {
    icon: '🏠', en: 'Real Estate Pro', fr: 'Immo Pro',
    desc_en: 'Property marketplace with map integration, advanced filters and high-res galleries.',
    desc_fr: 'Marché immobilier avec intégration de cartes și filtres.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Real Estate</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #fff; color: #0f172a; }
        .hero { height: 60vh; background: #e2e8f0; display: flex; align-items: center; justify-content: center; background-image: url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1470'); background-size: cover; color: #fff; text-align: center; }
        .search-box { background: #fff; padding: 24px; border-radius: 24px; box-shadow: 0 20px 50px rgba(0,0,0,.1); max-width: 800px; width: 90%; margin: -50px auto 0; display: flex; gap: 16px; }
        input { flex: 1; padding: 16px; border: 1px solid #e2e8f0; border-radius: 12px; outline: none; }
        .btn { padding: 16px 32px; background: #0f172a; color: #fff; border-radius: 12px; font-weight: 800; border: none; cursor: pointer; }
        .grid { padding: 80px 40px; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px; }
        .p-card { border-radius: 20px; overflow: hidden; transition: all .3s; }
        .p-card:hover { transform: translateY(-8px); }
        .p-img { height: 240px; background: #f1f5f9; }
        .p-info { padding: 20px; }
    </style>
</head>
<body>
    <div class="hero">
        <div>
            <h1 style="font-size: 60px; font-weight: 900">Find your dream home.</h1>
            <p>The most exclusive listings in Paris and London.</p>
        </div>
    </div>
    <div class="search-box">
        <input placeholder="Location...">
        <input placeholder="Property Type...">
        <button class="btn">Search</button>
    </div>
    <div class="grid">
        <div class="p-card">
            <div class="p-img" style="background-image: url('https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=600'); background-size: cover"></div>
            <div class="p-info">
                <h3>Modern Villa</h3>
                <p>Saint-Tropez, FR</p>
                <b style="font-size: 24px">$4,250,000</b>
            </div>
        </div>
        <div class="p-card">
            <div class="p-img" style="background-image: url('https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&w=600'); background-size: cover"></div>
            <div class="p-info">
                <h3>Penthouse Suite</h3>
                <p>London, UK</p>
                <b style="font-size: 24px">$8,400,000</b>
            </div>
        </div>
        <div class="p-card">
            <div class="p-img" style="background-image: url('https://images.unsplash.com/photo-1600607687940-47a04b629571?auto=format&fit=crop&w=600'); background-size: cover"></div>
            <div class="p-info">
                <h3>Historic Loft</h3>
                <p>Paris, FR</p>
                <b style="font-size: 24px">$2,100,000</b>
            </div>
        </div>
    </div>
</body>
</html>`
  },
  /* --- 7: LMS --- */
  {
    icon: '🎓', en: 'LMS Academy Hub', fr: 'Académie LMS Hub',
    desc_en: 'Advanced e-learning platform with course progress, video player and quiz engine.',
    desc_fr: 'Plateforme e-learning avec suivi de progrès și quiz.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>LMS Hub</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #f8fafc; display: flex; min-height: 100vh; }
        .sidebar { width: 280px; background: #fff; border-right: 1px solid #e2e8f0; padding: 30px; }
        .main { flex: 1; padding: 40px; }
        .course-hero { background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 40px; border-radius: 24px; color: #fff; margin-bottom: 30px; }
        .lesson-list { display: flex; flex-direction: column; gap: 10px; }
        .lesson-item { padding: 16px; background: #f1f5f9; border-radius: 12px; display: flex; justify-content: space-between; cursor: pointer; }
        .lesson-item.active { background: #3b82f6; color: #fff; }
    </style>
</head>
<body>
    <aside class="sidebar">
        <h2>Academy Hub</h2>
        <br>
        <div class="lesson-list">
            <h3>Your Lessons</h3>
            <br>
            <div class="lesson-item active"><span>01. Introduction</span><span>✓</span></div>
            <div class="lesson-item"><span>02. Advanced CSS Grid</span><span>🔒</span></div>
            <div class="lesson-item"><span>03. React State Mastery</span><span>🔒</span></div>
        </div>
    </aside>
    <main class="main">
        <div class="course-hero">
            <h1>React Mastery 2024</h1>
            <p>Master modern web development with our comprehensive guide.</p>
        </div>
        <div style="background: #fff; padding: 30px; border-radius: 24px">
            <h3>Course Description</h3>
            <p style="color: #64748b; line-height: 1.7; margin-top: 15px">Learn from industry experts how to build scalable applications using the latest technologies. This course covers everything from basic hooks to advanced SSR techniques.</p>
            <br>
            <button style="padding: 14px 28px; background: #3b82f6; color: #fff; border: none; border-radius: 12px; font-weight: 700">Start Learning Now</button>
        </div>
    </main>
</body>
</html>`
  },
  /* --- 8: LOGISTICS --- */
  {
    icon: '🚚', en: 'Logistic Hub Pro', fr: 'Logistique Hub Pro',
    desc_en: 'Fleet management dashboard with global shipment tracking and fuel analytics.',
    desc_fr: 'Gestion de flotte și suivi de livraison mondial.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Logistic Pro</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #0f172a; color: #fff; padding: 40px; }
        .hdr { display: flex; justify-content: space-between; margin-bottom: 40px; }
        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .card { background: #1e293b; padding: 30px; border-radius: 24px; }
        .map-mock { height: 300px; background: #334155; border-radius: 20px; margin-top: 20px; position: relative; overflow: hidden; }
        .pin { position: absolute; width: 12px; height: 12px; background: #ef4444; border-radius: 50%; box-shadow: 0 0 10px #ef4444; animation: pulse 2s infinite; }
        @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(3); opacity: 0; } }
    </style>
</head>
<body>
    <div class="hdr">
        <h1>🚚 Logistic Hub</h1>
        <div>Search Shipments...</div>
    </div>
    <div class="grid">
        <div class="card">
            <h3>Live Status</h3>
            <br>
            <ul>
                <li>#SHP-9921 - Paris -> Berlin (Delivered)</li>
                <li>#SHP-9922 - London -> Madrid (In Transit)</li>
                <li>#SHP-9923 - Rome -> Lyon (Delayed)</li>
            </ul>
        </div>
        <div class="card" style="grid-column: span 2">
            <h3>Fleet Geographic Monitor</h3>
            <div class="map-mock">
                <div class="pin" style="top: 40%; left: 45%"></div>
                <div class="pin" style="top: 30%; left: 55%"></div>
                <div class="pin" style="top: 60%; left: 40%"></div>
            </div>
        </div>
    </div>
</body>
</html>`
  },
  /* --- 9: MEAL PLANNER --- */
  {
    icon: '🍳', en: 'Meal Planner Pro', fr: 'Planificateur Meal Pro',
    desc_en: 'Personalized nutrition tracker with automated calorie counting and recipe suggestions.',
    desc_fr: 'Suivi nutritionnel și suggestions de repas personnalisées.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Meal Planner</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #fdf2f8; color: #831843; padding: 40px; }
        .card { max-width: 800px; margin: 0 auto; background: #fff; border-radius: 30px; padding: 40px; box-shadow: 0 20px 50px rgba(131,24,67,.05); }
        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 30px 0; }
        .day-box { background: #fdf2f8; padding: 20px; border-radius: 20px; text-align: center; }
        .btn { width: 100%; padding: 14px; background: #db2777; color: #fff; border-radius: 12px; font-weight: 700; border: none; cursor: pointer; }
    </style>
</head>
<body>
    <div class="card">
        <h1>🍳 Meal Planner</h1>
        <p>Your nutrition plan for this week.</p>
        <div class="grid">
            <div class="day-box"><b>Morning</b><br>Oatmeal & Berries</div>
            <div class="day-box"><b>Lunch</b><br>Quinoa Salad</div>
            <div class="day-box"><b>Dinner</b><br>Grilled Salmon</div>
        </div>
        <div style="background: #fef2f2; padding: 20px; border-radius: 20px; margin-bottom: 20px">
            <h3>Nutrients Target</h3>
            <br>
            <div style="height: 10px; background: #fee2e2; border-radius: 5px">
                <div style="width: 75%; height: 100%; background: #ef4444; border-radius: 5px"></div>
            </div>
            <p style="font-size: 12px; margin-top: 10px">1,650 / 2,200 kcal consumed today</p>
        </div>
        <button class="btn">Generate New Plan</button>
    </div>
</body>
</html>`
  },
  /* --- 10: JOB PORTAL --- */
  {
    icon: '👔', en: 'Job Portal Pro', fr: 'Portail Emploi Pro',
    desc_en: 'Advanced career marketplace with deep filtering, AI matches and resume builder.',
    desc_fr: 'Cherchez și postulez à des emplois pro avec assistante IA.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Job Portal</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #f1f5f9; padding: 40px; }
        .search-bar { background: #fff; padding: 20px; border-radius: 20px; display: flex; gap: 16px; margin-bottom: 40px; box-shadow: 0 10px 30px rgba(0,0,0,.05); }
        .job-card { background: #fff; padding: 24px; border-radius: 20px; border: 1px solid #e2e8f0; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; }
        .badge { background: #dcfce7; color: #166534; padding: 4px 10px; border-radius: 10px; font-size: 12px; font-weight: 900; }
    </style>
</head>
<body>
    <h1>👔 AuraJobs Pro</h1>
    <br>
    <div class="search-bar">
        <input placeholder="Job title..." style="flex: 1; border: none; outline: none">
        <input placeholder="Location..." style="width: 200px; border: none; outline: none">
        <button style="background: #0f172a; color: #fff; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 800">Search</button>
    </div>
    <div class="job-card">
        <div>
            <h3 style="margin-bottom: 5px">Senior Frontend Architect</h3>
            <p style="color: #64748b; font-size: 14px">Google Cloud • Zurich, CH • $180k - $220k</p>
        </div>
        <span class="badge">FULL-TIME</span>
    </div>
    <div class="job-card">
        <div>
            <h3 style="margin-bottom: 5px">UI/UX Product Designer</h3>
            <p style="color: #64748b; font-size: 14px">Stripe • Remote • $140k - $170k</p>
        </div>
        <span class="badge" style="background: #e0f2fe; color: #0369a1">HYBRID</span>
    </div>
</body>
</html>`
  },
  /* --- 11: PHOTO STUDIO --- */
  {
    icon: '📸', en: 'Photo Studio Pro', fr: 'Studio Photo Pro',
    desc_en: 'Elite photography portfolio with masonry grids, lightbox and client galleries.',
    desc_fr: 'Portefeuille photo élite avec grilles maçonnerie și lightbox.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Photo Studio</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #000; color: #fff; padding: 40px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
        .img-box { height: 300px; background: #111; border-radius: 12px; overflow: hidden; position: relative; transition: all 0.3s; }
        .img-box:hover { transform: scale(0.98); }
        .img-box img { width: 100%; height: 100%; object-fit: cover; opacity: 0.8; }
        .overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 20px; background: linear-gradient(transparent, rgba(0,0,0,0.8)); }
    </style>
</head>
<body>
    <h1 style="font-size: 40px; letter-spacing: -2px; margin-bottom: 40px">AURA.PHOTO</h1>
    <div class="grid">
        <div class="img-box">
            <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600">
            <div class="overlay">Urban Series 01</div>
        </div>
        <div class="img-box">
            <img src="https://images.unsplash.com/photo-1554080353-a576cf803bda?w=600">
            <div class="overlay">Nature Portraits</div>
        </div>
        <div class="img-box">
            <img src="https://images.unsplash.com/photo-1493770348161-369560ae357d?w=600">
            <div class="overlay">Fashion Editorial</div>
        </div>
    </div>
</body>
</html>`
  },
  /* --- 12: E-COMMERCE --- */
  {
    icon: '🛒', en: 'Storefront Elite', fr: 'Storefront Elite',
    desc_en: 'Premium e-commerce storefront for luxury goods with cart logic and checkout UI.',
    desc_fr: 'Boutique e-commerce premium pour produits de luxe.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Storefront</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #fff; color: #111; }
        .nav { padding: 20px 40px; display: flex; justify-content: space-between; border-bottom: 1px solid #f1f1f1; }
        .grid { padding: 40px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
        .product { text-align: center; }
        .p-img { height: 340px; background: #f9f9f9; margin-bottom: 15px; display: flex; align-items: center; justify-content: center; font-size: 80px; }
        .btn { padding: 12px 24px; border: 1px solid #111; background: none; cursor: pointer; font-weight: 700; transition: all 0.3s; }
        .btn:hover { background: #111; color: #fff; }
    </style>
</head>
<body>
    <nav class="nav">
        <b>LUXE.</b>
        <div>Shop | Collections | Search</div>
    </nav>
    <div class="grid">
        <div class="product">
            <div class="p-img">⌚</div>
            <h3>Grand Master Edition</h3>
            <p style="color: #666; margin: 10px 0">$12,400</p>
            <button class="btn">Add to Cart</button>
        </div>
        <div class="product">
            <div class="p-img">🕶️</div>
            <h3>Oceanic Shades</h3>
            <p style="color: #666; margin: 10px 0">$450</p>
            <button class="btn">Add to Cart</button>
        </div>
        <div class="product">
            <div class="p-img">👜</div>
            <h3>Classic Leather</h3>
            <p style="color: #666; margin: 10px 0">$2,800</p>
            <button class="btn">Add to Cart</button>
        </div>
    </div>
</body>
</html>`
  },
  /* --- 13: HOSPITALITY --- */
  {
    icon: '🏨', en: 'Hotel Booking Pro', fr: 'Reservation Hotel Pro',
    desc_en: 'Luxury hotel reservation system with availability calendar and amenity lists.',
    desc_fr: 'Système de réservation hotel de luxe avec calendrier.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Hotel Pro</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #f9fafb; color: #1f2937; }
        .hero { height: 400px; background: #111; color: #fff; display: flex; align-items: center; padding-left: 100px; background-image: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400'); background-size: cover; }
        .booking-bar { background: #fff; max-width: 1000px; margin: -40px auto 0; padding: 30px; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.05); display: flex; gap: 20px; position: relative; z-index: 10; }
        .card { background: #fff; padding: 30px; border-radius: 20px; margin: 40px auto; max-width: 1000px; }
    </style>
</head>
<body>
    <div class="hero">
        <div>
            <h1>Grand Oasis Resort</h1>
            <p>Experience the peak of Mediterranean luxury.</p>
        </div>
    </div>
    <div class="booking-bar">
        <div>Check In<br><input type="date" style="border: none; font-weight: 700"></div>
        <div>Check Out<br><input type="date" style="border: none; font-weight: 700"></div>
        <div>Guests<br><b>2 Adults, 1 Child</b></div>
        <button style="margin-left: auto; background: #111; color: #fff; padding: 15px 30px; border-radius: 10px; font-weight: 800; border: none; cursor: pointer">Check Availability</button>
    </div>
    <div class="card">
        <h2>Standard Suite</h2>
        <p style="margin-top: 10px; color: #6b7280; line-height: 1.7">Our standard suite offers ultimate comfort with a king-sized bed, high-speed Wi-Fi, and a panoramic view of the coastline. Perfect for couples or solo travelers seeking elegance.</p>
    </div>
</body>
</html>`
  },
  /* --- 14: METRICS --- */
  {
    icon: '📊', en: 'SaaS Metrics UI', fr: 'Metrics SaaS UI',
    desc_en: 'Real-time performance metrics for SaaS owners with active users and MRR charts.',
    desc_fr: 'Metrics de performance SaaS live avec graphiques MRR.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>SaaS Metrics</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #000; color: #fff; padding: 40px; }
        .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .card { background: #111; padding: 30px; border-radius: 24px; border: 1px solid #222; }
        .val { font-size: 32px; font-weight: 900; margin: 10px 0; }
        .lbl { font-size: 12px; color: #666; font-weight: 700; text-transform: uppercase; }
        .bar-chart { display: flex; align-items: flex-end; gap: 10px; height: 150px; margin-top: 30px; }
        .bar { flex: 1; background: #3b82f6; border-radius: 4px; }
    </style>
</head>
<body>
    <h1>SaaS Health Monitor</h1>
    <p style="color: #666">Performance Overview - Last 30 Days</p>
    <br>
    <div class="grid">
        <div class="card">
            <div class="lbl">Active MRR</div>
            <div class="val">$42,800</div>
            <div style="color: #10b981">+12%</div>
        </div>
        <div class="card">
            <div class="lbl">New Signups</div>
            <div class="val">1,204</div>
            <div style="color: #10b981">+5%</div>
        </div>
        <div class="card">
            <div class="lbl">Active Users</div>
            <div class="val">12,450</div>
            <div style="color: #10b981">+18%</div>
        </div>
        <div class="card">
            <div class="lbl">Churn Rate</div>
            <div class="val">2.4%</div>
            <div style="color: #ef4444">-1%</div>
        </div>
    </div>
    <div class="card" style="margin-top: 30px">
        <h3>Revenue Distribution</h3>
        <div class="bar-chart">
            <div class="bar" style="height: 40%"></div>
            <div class="bar" style="height: 60%"></div>
            <div class="bar" style="height: 80%"></div>
            <div class="bar" style="height: 50%"></div>
            <div class="bar" style="height: 90%"></div>
            <div class="bar" style="height: 70%"></div>
        </div>
    </div>
</body>
</html>`
  },
  /* --- 15: MINDMAP --- */
  {
    icon: '🧠', en: 'MindMap Creator', fr: 'MindMap Creator',
    desc_en: 'Visual thinking tool to organize complex ideas with nodes and connections.',
    desc_fr: 'Outil de pensée visuelle avec nœuds și connexions.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>MindMap</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #f8fafc; height: 100vh; overflow: hidden; }
        .canvas { width: 100%; height: 100%; position: relative; }
        .node { position: absolute; padding: 15px 25px; background: #fff; border: 2px solid #3b82f6; border-radius: 15px; box-shadow: 0 10px 20px rgba(0,0,0,0.05); font-weight: 700; }
        .line { position: absolute; height: 2px; background: #cbd5e1; transform-origin: 0 0; }
    </style>
</head>
<body>
    <div class="canvas">
        <div class="node" style="top: 50%; left: 50%; transform: translate(-50%,-50%); background: #3b82f6; color: #fff">MAIN IDEA</div>
        <div class="node" style="top: 30%; left: 40%">Research</div>
        <div class="node" style="top: 30%; left: 60%">Design</div>
        <div class="node" style="top: 70%; left: 50%">Execution</div>
    </div>
</body>
</html>`
  },
  /* --- 16: SOCIAL --- */
  {
    icon: '📱', en: 'Social App UI', fr: 'Social App UI',
    desc_en: 'High-fidelity social feed with stories, posts, and real-time interactions.',
    desc_fr: 'Flux social haute-fidélité avec stories și posts.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Social UI</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #fff; max-width: 500px; margin: 0 auto; border: 1px solid #f1f1f1; }
        .stories { padding: 20px; display: flex; gap: 15px; overflow-x: auto; border-bottom: 1px solid #f1f1f1; }
        .story { width: 70px; height: 70px; border-radius: 50%; background: linear-gradient(45deg, #f59e0b, #ef4444); padding: 3px; flex-shrink: 0; }
        .story-inner { width: 100%; height: 100%; border-radius: 50%; background: #eee; border: 3px solid #fff; }
        .post { padding: 20px; }
        .p-img { height: 400px; background: #eee; border-radius: 15px; margin: 15px 0; }
        .p-actions { display: flex; gap: 20px; font-size: 24px; margin-bottom: 10px; }
    </style>
</head>
<body>
    <h2 style="padding: 20px">SocialFeed.</h2>
    <div class="stories">
        <div class="story"><div class="story-inner"></div></div>
        <div class="story"><div class="story-inner"></div></div>
        <div class="story"><div class="story-inner"></div></div>
        <div class="story"><div class="story-inner"></div></div>
    </div>
    <div class="post">
        <b>@User_Arch</b>
        <div class="p-img"></div>
        <div class="p-actions">❤️ 💬 🚀</div>
        <div>
            <b>452 Likes</b><br>
            <span style="color: #666">Building something amazing with AuraGen!</span>
        </div>
    </div>
</body>
</html>`
  },
  /* --- 17: MIXOLOGY --- */
  {
    icon: '🍸', en: 'Mixology Hub Pro', fr: 'Mixologie Hub Pro',
    desc_en: 'Professional cocktail recipes with inventory tracking and bar setup guide.',
    desc_fr: 'Recettes cocktails pro și gestion d\'inventaire bar.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Mixology</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #000; color: #facc15; padding: 40px; }
        .card { background: #111; padding: 40px; border-radius: 30px; max-width: 600px; margin: 0 auto; border: 1px solid #333; }
        h1 { font-size: 42px; margin-bottom: 10px; }
        ul { list-style: none; margin-top: 20px; }
        li { padding: 10px 0; border-bottom: 1px solid #222; color: #fff; }
    </style>
</head>
<body>
    <div class="card">
        <h1>🍸 Old Fashioned</h1>
        <p style="color: #666">Classic Spirit-Forward Cocktail</p>
        <ul>
            <li>60ml Bourbon / Rye Whiskey</li>
            <li>1 Sugar Cube</li>
            <li>3 Dashes Angostura Bitters</li>
            <li>Orange Peel Garnish</li>
        </ul>
        <br>
        <button style="width: 100%; padding: 15px; background: #facc15; color: #000; border: none; border-radius: 10px; font-weight: 900; cursor: pointer">Add to Favorites</button>
    </div>
</body>
</html>`
  },
  /* --- 18: WORKOUT --- */
  {
    icon: '🏋️', en: 'Workout OS Pro', fr: 'Workout OS Pro',
    desc_en: 'Data-driven training system with body fat tracking and muscle group analytics.',
    desc_fr: 'Système entraînement avec analytics de groupes musculaires.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Workout OS</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #000; color: #fff; padding: 30px; }
        .today { background: linear-gradient(45deg, #22c55e, #3b82f6); padding: 40px; border-radius: 30px; margin-bottom: 30px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .card { background: #111; padding: 25px; border-radius: 20px; }
    </style>
</head>
<body>
    <h1>Workout OS.</h1>
    <br>
    <div class="today">
        <h2>Leg Day</h2>
        <p style="margin-top: 10px">Next session: Today at 18:00</p>
    </div>
    <div class="grid">
        <div class="card">
            <h3>Muscle Load</h3>
            <br>
            <div style="font-size: 24px; font-weight: 900">84%</div>
            <p style="color: #666">High exhaustion</p>
        </div>
        <div class="card">
            <h3>Daily Goal</h3>
            <br>
            <div style="font-size: 24px; font-weight: 900">450</div>
            <p style="color: #666">Kcal burned</p>
        </div>
    </div>
</body>
</html>`
  },
  /* --- 19: TRAVEL --- */
  {
    icon: '🏙️', en: 'City Guide Pro', fr: 'Guide Ville Pro',
    desc_en: 'Curated traveler guide with maps, food reviews and hidden spots discovery.',
    desc_fr: 'Guide voyageur avec cartes și découverte de lieux.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>City Guide</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #fff; color: #111; }
        .hdr { height: 250px; background: #eee; position: relative; display: flex; align-items: center; justify-content: center; background-image: url('https://images.unsplash.com/photo-1549144511-f099e773c147?w=1200'); background-size: cover; }
        .grid { padding: 40px; display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
        .item { padding: 20px; border-radius: 20px; background: #f9f9f9; border: 1px solid #f1f1f1; }
    </style>
</head>
<body>
    <div class="hdr">
        <h1 style="color: #fff; font-size: 60px; font-weight: 900">Paris.</h1>
    </div>
    <div class="grid">
        <div class="item">
            <h3>🍽️ Le Bistrot Pro</h3>
            <p style="color: #666">Fine dining experience.</p>
        </div>
        <div class="item">
            <h3>🏛️ Louvre Museum</h3>
            <p style="color: #666">Ancient art & history.</p>
        </div>
        <div class="item">
            <h3>🗼 Eiffel Tower</h3>
            <p style="color: #666">The iconic landmark.</p>
        </div>
    </div>
</body>
</html>`
  },
  /* --- 20: DESIGN SYSTEM --- */
  {
    icon: '🎨', en: 'Design Library', fr: 'Design Library',
    desc_en: 'Centralized UI/UX design components with CSS var tracking and token management.',
    desc_fr: 'Bibliothèque UI/UX avec gestion de tokens CSS.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Design System</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #f8fafc; padding: 40px; }
        .swatch { width: 100px; height: 100px; border-radius: 15px; margin-bottom: 10px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 30px; }
    </style>
</head>
<body>
    <h1>Standard Design System v2</h1>
    <br>
    <h3>Colors</h3>
    <br>
    <div class="grid">
        <div><div class="swatch" style="background: #3b82f6"></div><b>Primary</b></div>
        <div><div class="swatch" style="background: #10b981"></div><b>Success</b></div>
        <div><div class="swatch" style="background: #ef4444"></div><b>Danger</b></div>
        <div><div class="swatch" style="background: #000"></div><b>Dark</b></div>
    </div>
</body>
</html>`
  },
  /* --- 21: STREAMING --- */
  {
    icon: '🎥', en: 'Stream Engine Pro', fr: 'Moteur Stream Pro',
    desc_en: 'Netflix-style video streaming interface with hero trailers and category rows.',
    desc_fr: 'Interface de streaming vidéo style Netflix avec bandes-annonces.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Stream Engine</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #141414; color: #fff; overflow-x: hidden; }
        .hero { height: 70vh; background: #000; display: flex; align-items: center; padding: 0 60px; background-size: cover; background-position: center; background-image: linear-gradient(90deg, #141414, transparent), url('https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1400'); }
        .row { padding: 20px 60px; }
        .row-inner { display: flex; gap: 10px; overflow-x: auto; padding: 10px 0; }
        .card { width: 240px; height: 135px; background: #333; flex-shrink: 0; border-radius: 4px; transition: transform 0.3s; }
        .card:hover { transform: scale(1.1); z-index: 10; }
    </style>
</head>
<body>
    <div class="hero">
        <div>
            <h1 style="font-size: 60px; margin-bottom: 10px">The Last Voyage</h1>
            <p style="max-width: 500px; margin-bottom: 20px">A epic journey across the stars in search of a new home for humanity.</p>
            <button style="padding: 12px 30px; background: #fff; color: #000; border: none; border-radius: 4px; font-weight: 900; cursor: pointer">▶ Play</button>
        </div>
    </div>
    <div class="row">
        <h3>Trending Now</h3>
        <div class="row-inner">
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
        </div>
    </div>
    <div class="row">
        <h3>New Releases</h3>
        <div class="row-inner">
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
        </div>
    </div>
</body>
</html>`
  },
  /* --- 22: CLOUD DRIVE --- */
  {
    icon: '💾', en: 'Cloud Drive UI', fr: 'Cloud Drive UI',
    desc_en: 'Sleek file management system with folder navigation and upload progress.',
    desc_fr: 'Système de gestion de fichiers avec navigation și upload.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Cloud Drive</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #f8fafc; display: flex; height: 100vh; }
        .sidebar { width: 260px; padding: 30px; background: #fff; border-right: 1px solid #e2e8f0; }
        .main { flex: 1; padding: 40px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 20px; }
        .f-box { background: #fff; padding: 25px; border-radius: 16px; text-align: center; border: 1px solid #f1f5f9; cursor: pointer; }
        .f-box:hover { border-color: #3b82f6; }
    </style>
</head>
<body>
    <aside class="sidebar">
        <h2>Cloud.</h2>
        <br>
        <p style="color: #64748b; font-size: 12px">My Storage: 12GB / 50GB</p>
        <div style="height: 6px; background: #f1f5f9; border-radius: 3px; margin: 10px 0">
            <div style="width: 24%; height: 100%; background: #3b82f6; border-radius: 3px"></div>
        </div>
    </aside>
    <main class="main">
        <div style="display: flex; justify-content: space-between; margin-bottom: 30px">
            <h3>Recent Files</h3>
            <button style="background: #3b82f6; color: #fff; border: none; padding: 10px 20px; border-radius: 8px">Upload +</button>
        </div>
        <div class="grid">
            <div class="f-box">📁<br>Projects</div>
            <div class="f-box">📂<br>Media</div>
            <div class="f-box">📄<br>Invoice.pdf</div>
            <div class="f-box">🖼️<br>Hero.jpg</div>
        </div>
    </main>
</body>
</html>`
  },
  /* --- 23: MARKET WATCH --- */
  {
    icon: '📈', en: 'Market Watch Pro', fr: 'Market Watch Pro',
    desc_en: 'Global stock market dashboard with real-time tickers and portfolio news.',
    desc_fr: 'Tableau de bord bourse avec tickers live și news.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Market Watch</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #000; color: #fff; padding: 20px; }
        .ticker { background: #111; padding: 10px; overflow: hidden; white-space: nowrap; margin-bottom: 20px; border-radius: 10px; }
        .grid { display: grid; grid-template-columns: 1fr 300px; gap: 20px; }
        .card { background: #111; padding: 30px; border-radius: 24px; border: 1px solid #222; }
        table { width: 100%; text-align: left; border-collapse: collapse; }
        td, th { padding: 12px; border-bottom: 1px solid #222; }
    </style>
</head>
<body>
    <div class="ticker">
        <span style="color: #10b981">AAPL +1.2% | TSLA -2.4% | MSFT +0.8% | AMZN +1.5% | GOOG -0.2% | BTC $64.2k</span>
    </div>
    <div class="grid">
        <div>
            <div class="card">
                <h2>Market Overview</h2>
                <br>
                <table>
                    <thead>
                        <tr><th>Asset</th><th>Price</th><th>Change</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>S&P 500</td><td>5,123.00</td><td style="color: #10b981">+0.4%</td></tr>
                        <tr><td>NASDAQ</td><td>16,230.12</td><td style="color: #10b981">+1.1%</td></tr>
                        <tr><td>DOW JONES</td><td>38,450.00</td><td style="color: #ef4444">-0.2%</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card">
            <h3>Top News</h3>
            <br>
            <p style="font-size: 14px; color: #666">Fed announces interest rate decision...</p>
        </div>
    </div>
</body>
</html>`
  },
  /* --- 24: EVENT PASS --- */
  {
    icon: '🎟️', en: 'Event Pass UI', fr: 'Event Pass UI',
    desc_en: 'Ticket booking system with dynamic QR codes and seating selectors.',
    desc_fr: 'Système de réservation avec QR codes și selection de places.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Event Pass</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #f1f5f9; display: flex; align-items: center; justify-content: center; height: 100vh; }
        .ticket { width: 340px; background: #fff; border-radius: 30px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.1); }
        .img { height: 180px; background: #3b82f6; }
        .body { padding: 30px; text-align: center; }
        .qr { width: 120px; height: 120px; background: #eee; margin: 20px auto; border: 8px solid #fff; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
    </style>
</head>
<body>
    <div class="ticket">
        <div class="img"></div>
        <div class="body">
            <b>ADMISSION PASS</b>
            <h2>Summer Festival</h2>
            <p style="color: #666; font-size: 14px">Aug 24, 2024 • 19:00</p>
            <div class="qr"></div>
            <p style="font-size: 12px; color: #94a3b8">#EVT-88219-X01</p>
        </div>
    </div>
</body>
</html>`
  },
  /* --- 25: FLEET --- */
  {
    icon: '🚗', en: 'Fleet Track Pro', fr: 'Fleet Track Pro',
    desc_en: 'Enterprise vehicle monitoring with GPS logs, fuel usage and driver telemetry.',
    desc_fr: 'Suivi de véhicules GPS avec logs de carburant.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Fleet Tracker</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #f8fafc; padding: 30px; }
        .status-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 30px; }
        .card { background: #fff; padding: 25px; border-radius: 15px; border: 1px solid #e2e8f0; }
        .v-row { display: flex; justify-content: space-between; padding: 12px; background: #fff; margin-bottom: 10px; border-radius: 10px; border: 1px solid #f1f5f9; }
    </style>
</head>
<body>
    <h1>Fleet Manager</h1>
    <br>
    <div class="status-grid">
        <div class="card">Active: 124</div>
        <div class="card">Idle: 12</div>
        <div class="card">Maintenance: 4</div>
        <div class="card">Alerts: 1</div>
    </div>
    <div class="v-row">
        <span>🚚 Truck #102 - Paris Center</span>
        <b style="color: #10b981">MOVING</b>
    </div>
    <div class="v-row">
        <span>🚛 Truck #104 - Lyon Terminal</span>
        <b style="color: #ef4444">STALL</b>
    </div>
</body>
</html>`
  },
  /* --- 26: JOURNAL --- */
  {
    icon: '📝', en: 'Journal Pro', fr: 'Journal Pro',
    desc_en: 'Personal writing habitat with dark mode, habit streaks and export tools.',
    desc_fr: 'Journal d\'écriture personnel avec suivi d\'habitudes.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Journal</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #111; color: #eee; padding: 60px 20px; }
        .card { max-width: 600px; margin: 0 auto; }
        textarea { width: 100%; height: 300px; background: none; border: none; color: #fff; font-size: 18px; line-height: 1.6; outline: none; }
        .dot { width: 8px; height: 8px; background: #3b82f6; border-radius: 50%; display: inline-block; margin-right: 5px; }
    </style>
</head>
<body>
    <div class="card">
        <p style="color: #666; margin-bottom: 20px">Monday, August 12, 2024</p>
        <h1>Journaling...</h1>
        <br>
        <textarea placeholder="Write your thoughts here..."></textarea>
        <div style="margin-top: 40px; padding: 20px; background: #1a1a1a; border-radius: 15px">
            <b>Streak: 12 Days</b>
            <br>
            <div style="display: flex; gap: 5px; margin-top: 10px">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        </div>
    </div>
</body>
</html>`
  },
  /* --- 27: ARCHITECTURE --- */
  {
    icon: '🏛️', en: 'Arche Studio', fr: 'Arche Studio',
    desc_en: 'Minimalist architecture studio site with vertical scrolling and project focuses.',
    desc_fr: 'Site minimaliste agence architecture.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Arche</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #fff; color: #000; }
        .sect { height: 100vh; display: flex; align-items: center; padding: 0 100px; position: relative; border-bottom: 1px solid #f1f1f1; }
        .title { font-size: 120px; font-weight: 900; letter-spacing: -6px; line-height: 0.9; }
        .img { width: 400px; height: 500px; background: #eee; position: absolute; right: 100px; }
    </style>
</head>
<body>
    <div class="sect">
        <div class="title">BUREAU<br>DESIGN.</div>
        <div class="img"></div>
    </div>
    <div class="sect">
        <div class="title">URBAN<br>LIVING.</div>
        <div class="img"></div>
    </div>
</body>
</html>`
  },
  /* --- 28: AUTOMATION --- */
  {
    icon: '⚡', en: 'Automation Pro', fr: 'Automation Pro',
    desc_en: 'Workflow builder UI with visual node logic for connecting software tools.',
    desc_fr: 'Constructeur de workflow visuel avec noeuds logic.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Auto Pro</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #f1f5f9; padding: 40px; }
        .node { background: #fff; padding: 20px; border-radius: 15px; width: 250px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); margin-bottom: 20px; border: 1px solid #e2e8f0; position: relative; }
        .arrow { height: 40px; width: 2px; background: #cbd5e1; margin-left: 50px; }
    </style>
</head>
<body>
    <h2>Flow Builder</h2>
    <br>
    <div class="node">
        <b>TRIGER: New User Signup</b>
        <br>
        <span style="font-size: 12px; color: #666">App: Stripe</span>
    </div>
    <div class="arrow"></div>
    <div class="node">
        <b>ACTION: Send Welcome Email</b>
        <br>
        <span style="font-size: 12px; color: #666">App: Mailchimp</span>
    </div>
    <div class="arrow"></div>
    <div class="node">
        <b>ACTION: Alert Team</b>
        <br>
        <span style="font-size: 12px; color: #666">App: Slack</span>
    </div>
</body>
</html>`
  },
  /* --- 29: WINE --- */
  {
    icon: '🍷', en: 'Wine Cellar Master', fr: 'Maitre de Cave',
    desc_en: 'Private collection tracker with aging alerts and vintage valuation.',
    desc_fr: 'Suivi de collection de vin avec alertes de vieillissement.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Wine Cellar</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #2d0a0a; color: #fecaca; padding: 40px; }
        .card { background: #1a0505; padding: 30px; border-radius: 20px; border: 1px solid #450a0a; margin-bottom: 20px; }
    </style>
</head>
<body>
    <h1>🍷 Private Cellar</h1>
    <br>
    <div class="card">
        <h3>Château Margaux 2015</h3>
        <p style="color: #991b1b">Status: Aging • Optimal: 2030</p>
    </div>
    <div class="card">
        <h3>Domaine Leroy 2010</h3>
        <p style="color: #991b1b">Status: Ready • Value: $2,400</p>
    </div>
</body>
</html>`
  },
  /* --- 30: ZEN --- */
  {
    icon: '🧘', en: 'Zen Meditate', fr: 'Meditation Zen',
    desc_en: 'Calm breathing guide with high-quality ambient soundscapes.',
    desc_fr: 'Guide de respiration calme și paysages sonores.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Zen</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: radial-gradient(circle, #e0f2fe, #bae6fd); height: 100vh; display: flex; align-items: center; justify-content: center; }
        .circle { width: 200px; height: 200px; background: #fff; border-radius: 50%; animation: breathe 8s infinite ease-in-out; display: flex; align-items: center; justify-content: center; font-weight: 900; color: #0369a1; }
        @keyframes breathe { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.5); opacity: 1; } }
    </style>
</head>
<body>
    <div class="circle">BREATHE</div>
</body>
</html>`
  },
  /* --- 31: GAMING --- */
  {
    icon: '🎮', en: 'Game Lobby UI', fr: 'Lobby Jeu UI',
    desc_en: 'Modern gaming community dashboard with friend lists and achievements.',
    desc_fr: 'Tableau de bord communauté gaming avec liste d\'amis.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Game Lobby</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #0b0b0f; color: #fff; display: flex; height: 100vh; }
        .sidebar { width: 80px; background: #15151e; display: flex; flex-direction: column; align-items: center; padding: 20px 0; gap: 20px; }
        .main { flex: 1; padding: 40px; background: linear-gradient(135deg, #0b0b0f, #1a1a2e); }
        .card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; }
        .g-card { height: 280px; background: #15151e; border-radius: 15px; overflow: hidden; position: relative; border: 1px solid #222; }
        .g-img { height: 180px; background: #333; }
        .g-info { padding: 15px; }
    </style>
</head>
<body>
    <aside class="sidebar">
        <div style="width: 40px; height: 40px; background: #3b82f6; border-radius: 10px"></div>
        <div style="width: 40px; height: 40px; background: #222; border-radius: 10px"></div>
    </aside>
    <main class="main">
        <h1>Discovery Hub</h1>
        <br>
        <div class="card-grid">
            <div class="g-card">
                <div class="g-img"></div>
                <div class="g-info">
                    <b>Cyberpunk 2077</b>
                    <p style="font-size: 12px; color: #666; margin-top: 5px">RPG • CD Projekt Red</p>
                </div>
            </div>
            <div class="g-card">
                <div class="g-img"></div>
                <div class="g-info">
                    <b>Elden Ring</b>
                    <p style="font-size: 12px; color: #666; margin-top: 5px">Action • FromSoftware</p>
                </div>
            </div>
        </div>
    </main>
</body>
</html>`
  },
  /* --- 32: LEGAL HUB --- */
  {
    icon: '⚖️', en: 'Legal Case Hub', fr: 'Legal Case Hub',
    desc_en: 'Streamlined case management for law firms with document tracking.',
    desc_fr: 'Gestion de dossiers pour agences juridiques.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Legal Hub</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #f8fafc; padding: 40px; }
        .hdr { display: flex; justify-content: space-between; margin-bottom: 40px; }
        .card { background: #fff; padding: 30px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        table { width: 100%; border-collapse: collapse; }
        td, th { padding: 15px; text-align: left; border-bottom: 1px solid #f1f5f9; }
    </style>
</head>
<body>
    <div class="hdr">
        <h1>⚖️ Legal Hub</h1>
        <button style="padding: 12px 24px; background: #0f172a; color: #fff; border-radius: 10px; border: none">New Case</button>
    </div>
    <div class="card">
        <table>
            <thead>
                <tr><th>Case Name</th><th>Client</th><th>Status</th></tr>
            </thead>
            <tbody>
                <tr><td>#L-9921 - Property Dispute</td><td>M. Thompson</td><td><span style="color: #3b82f6">● ACTIVE</span></td></tr>
                <tr><td>#L-9922 - IP Infringement</td><td>Tech Corp</td><td><span style="color: #ef4444">● TRIAL</span></td></tr>
            </tbody>
        </table>
    </div>
</body>
</html>`
  },
  /* --- 33: LABORATORY --- */
  {
    icon: '🔬', en: 'Lab Records UI', fr: 'Lab Records UI',
    desc_en: 'Scientific research portal for documenting experiments.',
    desc_fr: 'Portail recherche scientifique pour expériences.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Lab</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #fff; color: #334155; padding: 40px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
        label { font-size: 12px; font-weight: 700; color: #94a3b8; }
        .inp { width: 100%; padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; margin-top: 5px; }
    </style>
</head>
<body>
    <h1>Scientific Journal</h1>
    <p>Experiment Log - Level 4 Security</p>
    <br>
    <div class="grid">
        <div>
            <label>Project Name</label>
            <input class="inp" value="Neural Interface Alpha">
        </div>
        <div>
            <label>Batch ID</label>
            <input class="inp" value="LAB-990-22">
        </div>
    </div>
    <br>
    <label>Observations</label>
    <textarea class="inp" style="height: 200px">Stable baseline recorded at 14:00. No signal degradation...</textarea>
</body>
</html>`
  },
  /* --- 34: BROADCAST --- */
  {
    icon: '📻', en: 'Radio Studio Pro', fr: 'Studio Radio Pro',
    desc_en: 'Live broadcast monitor for radio stations and professional podcasting.',
    desc_fr: 'Moniteur broadcast pour radio și podcast.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Radio</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #000; color: #ef4444; padding: 40px; }
        .meter { height: 20px; background: #111; border-radius: 10px; overflow: hidden; margin-bottom: 5px; }
        .fill { height: 100%; background: #ef4444; width: 80%; animation: vibrate 0.1s infinite; }
        @keyframes vibrate { 0% { width: 78%; } 100% { width: 82%; } }
    </style>
</head>
<body>
    <h1>ON AIR.</h1>
    <br>
    <div style="background: #111; padding: 40px; border-radius: 30px">
        <div class="meter"><div class="fill"></div></div>
        <div class="meter"><div class="fill" style="width: 60%; animation-delay: 0.05s"></div></div>
        <p style="color: #fff; margin-top: 20px; text-align: center">Mic 1 Active • Stream: Live</p>
    </div>
</body>
</html>`
  },
  /* --- 35: HORTICULTURE --- */
  {
    icon: '🪴', en: 'Plant Care Pro', fr: 'Soin Plantes Pro',
    desc_en: 'Detailed tracking for indoor plants with watering reminders.',
    desc_fr: 'Suivi détaillé pour plantes d\'intérieur.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Plant Care</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #f0fdf4; color: #166534; padding: 40px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; }
        .card { background: #fff; padding: 25px; border-radius: 25px; text-align: center; box-shadow: 0 10px 20px rgba(0,0,0,0.02); }
    </style>
</head>
<body>
    <h1>My Urban Jungle</h1>
    <br>
    <div class="grid">
        <div class="card">
            🌿
            <h3>Monstera</h3>
            <p style="color: #666">Water in 2 days</p>
        </div>
        <div class="card">
            🌵
            <h3>Cactus</h3>
            <p style="color: #666">Watered 1 week ago</p>
        </div>
    </div>
</body>
</html>`
  },
  /* --- 36: FINTECH ADVANCED --- */
  {
    icon: '🏦', en: 'Banking Next', fr: 'Banking Next',
    desc_en: 'Modern banking interface with transaction tagging.',
    desc_fr: 'Interface bancaire moderne avec gestion de cartes.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Banking</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #f8fafc; padding: 30px; }
        .card { width: 340px; height: 200px; background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 20px; padding: 30px; color: #fff; margin-bottom: 30px; position: relative; overflow: hidden; }
        .card::after { content: ''; position: absolute; top: -50%; right: -50%; width: 100%; height: 100%; background: rgba(255,255,255,0.05); border-radius: 50%; }
    </style>
</head>
<body>
    <h1>Wallet.</h1>
    <br>
    <div class="card">
        <div style="font-size: 12px; opacity: 0.8">Balance</div>
        <div style="font-size: 32px; font-weight: 900">$12,850.00</div>
        <div style="margin-top: 60px">**** **** **** 8821</div>
    </div>
    <h3>Recent Activity</h3>
    <br>
    <div style="padding: 15px; background: #fff; border-radius: 12px; margin-bottom: 10px; display: flex; justify-content: space-between">
        <span>Apple Subscription</span>
        <b>-$14.99</b>
    </div>
</body>
</html>`
  },
  /* --- 37: VOTING --- */
  {
    icon: '🗳️', en: 'Voting System', fr: 'Système Vote',
    desc_en: 'Secure digital voting platform with identity verification.',
    desc_fr: 'Plateforme de vote sécurisée avec verification.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Vote</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #f1f5f9; display: flex; align-items: center; justify-content: center; height: 100vh; }
        .card { width: 400px; background: #fff; padding: 40px; border-radius: 30px; text-align: center; }
    </style>
</head>
<body>
    <div class="card">
        <h2>AuraVote Pro</h2>
        <p style="margin: 10px 0; color: #666">Secure ID: #VOTE-8821</p>
        <br>
        <button style="width: 100%; padding: 15px; background: #3b82f6; color: #fff; border: none; border-radius: 12px; font-weight: 800; margin-bottom: 10px; cursor: pointer">Vote Candidate A</button>
        <button style="width: 100%; padding: 15px; background: #ef4444; color: #fff; border: none; border-radius: 12px; font-weight: 800; cursor: pointer">Vote Candidate B</button>
    </div>
</body>
</html>`
  },
  /* --- 38: LUXURY --- */
  {
    icon: '💎', en: 'Luxury Concierge', fr: 'Concierge Luxe',
    desc_en: 'Exclusive portal for luxury services and personal management.',
    desc_fr: 'Portail exclusif pour services de luxe.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Luxury</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #000; color: #fff; padding: 60px; text-align: center; }
        h1 { font-size: 60px; letter-spacing: 10px; font-weight: 200; margin-bottom: 40px; }
        nav { display: flex; justify-content: center; gap: 40px; font-size: 12px; font-weight: 800; text-transform: uppercase; color: #888; }
    </style>
</head>
<body>
    <h1 style="color: #c5a059">ORO.</h1>
    <nav><span>Travel</span> | <span>Dining</span> | <span>Security</span></nav>
    <br><br>
    <div style="max-width: 500px; margin: 0 auto; border: 1px solid #333; padding: 40px">
        <h2>Request Concierge</h2>
        <p style="color: #666; margin: 10px 0">Speak to your advisor 24/7</p>
        <br>
        <button style="padding: 15px 30px; background: #c5a059; color: #000; border: none; border-radius: 5px; font-weight: 900">START CHAT</button>
    </div>
</body>
</html>`
  },
  /* --- 39: TOOLING --- */
  {
    icon: '🛠️', en: 'SaaS Tooling', fr: 'Outils SaaS',
    desc_en: 'Internal administrative tools for managing SaaS customers.',
    desc_fr: 'Outils admin internes pour gestion SaaS.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Tools</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: monospace; }
        body { background: #f8fafc; padding: 30px; }
        .row { display: flex; justify-content: space-between; padding: 15px; background: #fff; border-bottom: 1px solid #f1f5f9; }
    </style>
</head>
<body>
    <h2>Admin Tool Kit</h2>
    <br>
    <div class="row">
        <span>Debug Mode</span>
        <input type="checkbox">
    </div>
    <div class="row">
        <span>Beta Features</span>
        <input type="checkbox" checked>
    </div>
    <div class="row">
        <span>Cache Flush</span>
        <button>RUN</button>
    </div>
</body>
</html>`
  },
  /* --- 40: NETWORK --- */
  {
    icon: '📡', en: 'Network Hub Pro', fr: 'Network Hub Pro',
    desc_en: 'Enterprise connectivity monitor with bandwidth usage and server health.',
    desc_fr: 'Moniteur de connexion și santé serveur enterprise.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Network</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #0f172a; color: #fff; padding: 40px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .bar { height: 40px; background: #1e293b; border-radius: 10px; overflow: hidden; }
        .fill { height: 100%; background: #3b82f6; width: 65%; }
    </style>
</head>
<body>
    <h1>Connectivity.</h1>
    <br>
    <div class="grid">
        <div style="background: #1e293b; padding: 30px; border-radius: 20px">
            <h3>Bandwidth</h3>
            <br>
            <div class="bar">
                <div class="fill"></div>
            </div>
            <p style="margin-top: 10px">840 Mbps / 1 Gbps</p>
        </div>
        <div style="background: #1e293b; padding: 30px; border-radius: 20px">
            <h3>Active Nodes</h3>
            <br>
            <div style="font-size: 40px; font-weight: 900">42 / 45</div>
            <p style="color: #10b981">98% Uptime</p>
        </div>
    </div>
</body>
</html>`
  },
  /* --- 41: ENTERTAINMENT --- */
  {
    icon: '🎭', en: 'Theater Pro', fr: 'Theater Pro',
    desc_en: 'Premium event booking for theaters and live performances with seating charts.',
    desc_fr: 'Réservation premium pour théâtres și spectacles.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Theater</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #050505; color: #fff; padding: 60px 40px; }
        .stage { width: 100%; height: 40px; background: #334155; margin-bottom: 60px; display: flex; align-items: center; justify-content: center; font-weight: 900; letter-spacing: 10px; }
        .seating { display: grid; grid-template-columns: repeat(10, 1fr); gap: 10px; max-width: 500px; margin: 0 auto; }
        .seat { height: 25px; background: #1e293b; border-radius: 4px; cursor: pointer; }
        .seat:hover { background: #3b82f6; }
        .seat.taken { background: #ef4444; cursor: not-allowed; }
    </style>
</head>
<body>
    <div class="stage">STAGE</div>
    <div class="seating">
        <div class="seat"></div><div class="seat taken"></div><div class="seat"></div><div class="seat"></div><div class="seat"></div>
        <div class="seat"></div><div class="seat taken"></div><div class="seat"></div><div class="seat"></div><div class="seat"></div>
        <div class="seat"></div><div class="seat"></div><div class="seat"></div><div class="seat"></div><div class="seat"></div>
    </div>
    <br><br>
    <div style="text-align: center">
        <button style="padding: 15px 40px; background: #fff; color: #000; border: none; border-radius: 10px; font-weight: 900">Book Seats</button>
    </div>
</body>
</html>`
  },
  /* --- 42: SERVICE --- */
  {
    icon: '🧹', en: 'Clean Service Pro', fr: 'Clean Service Pro',
    desc_en: 'Management platform for residential and commercial cleaning services.',
    desc_fr: 'Gestion de services de nettoyage pro.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Clean</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #f0f9ff; padding: 40px; }
        .card { background: #fff; padding: 30px; border-radius: 24px; border: 1px solid #bae6fd; display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
    </style>
</head>
<body>
    <h1>🧹 ShinePro Manager</h1>
    <br>
    <div class="card">
        <div>
            <b>Mrs. Higgins - Deep Clean</b>
            <p style="color: #666">Today at 10:00 - London SW1</p>
        </div>
        <button style="background: #0ea5e9; color: #fff; border: none; padding: 10px 20px; border-radius: 10px">Assign Crew</button>
    </div>
    <div class="card">
        <div>
            <b>John Smith - Weekly Maintenance</b>
            <p style="color: #666">Today at 14:30 - London E2</p>
        </div>
        <button style="background: #0ea5e9; color: #fff; border: none; padding: 10px 20px; border-radius: 10px">Assign Crew</button>
    </div>
</body>
</html>`
  },
  /* --- 43: STOCK --- */
  {
    icon: '📦', en: 'Inventory Lite', fr: 'Inventory Lite',
    desc_en: 'Simplified stock management for small shops and individual sellers.',
    desc_fr: 'Gestion de stock simplifiée pour commerces.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Stock</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #f8fafc; padding: 40px; }
        .item { background: #fff; padding: 20px; border-radius: 15px; margin-bottom: 10px; display: flex; justify-content: space-between; border: 1px solid #e2e8f0; }
    </style>
</head>
<body>
    <h1>📦 Stock Check</h1>
    <br>
    <div class="item"><span>Leather Wallet</span><b>45 units</b></div>
    <div class="item"><span>Canvas Bag</span><b style="color: #ef4444">12 units</b></div>
    <div class="item"><span>Keychain</span><b>152 units</b></div>
</body>
</html>`
  },
  /* --- 44: FOCUS --- */
  {
    icon: '⚡', en: 'Smart Timer', fr: 'Smart Timer',
    desc_en: 'Professional pomodoro timer with soundscapes and productivity streaks.',
    desc_fr: 'Timer pomodoro pro avec paysages sonores.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Timer</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #000; color: #fff; display: flex; align-items: center; justify-content: center; height: 100vh; }
        .timer { font-size: 120px; font-weight: 900; letter-spacing: -5px; }
    </style>
</head>
<body>
    <div style="text-align: center">
        <h3>DEEP WORK</h3>
        <div class="timer">25:00</div>
        <br>
        <button style="padding: 15px 40px; background: #3b82f6; color: #fff; border: none; border-radius: 50px; font-weight: 900">START</button>
    </div>
</body>
</html>`
  },
  /* --- 45: UTILITY --- */
  {
    icon: '🔗', en: 'Shortener Pro', fr: 'Raccourcisseur Pro',
    desc_en: 'Advanced URL shortening suite with click analytics and geo-tracking.',
    desc_fr: 'Suite d\'analytics și raccourcisseur d\'URL.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Link</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #f1f5f9; padding: 40px; }
        .box { background: #fff; padding: 40px; border-radius: 24px; max-width: 600px; margin: 0 auto; }
        input { width: 100%; padding: 15px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="box">
        <h1>🔗 Link Hub</h1>
        <input placeholder="Paste your long URL here...">
        <button style="width: 100%; padding: 15px; background: #000; color: #fff; border: none; border-radius: 12px; font-weight: 900">Shorten & Track</button>
    </div>
</body>
</html>`
  },
  /* --- 46: SECURITY --- */
  {
    icon: '🛡️', en: 'Audit Pro', fr: 'Audit Pro',
    desc_en: 'System security audit tool for tracking vulnerabilities and compliance.',
    desc_fr: 'Outil d\'audit de sécurité și conformité système.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Audit</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: monospace; }
        body { background: #000; color: #10b981; padding: 40px; }
        .line { margin-bottom: 10px; }
    </style>
</head>
<body>
    <h2>SYSTEM AUDIT // v4.2</h2>
    <br>
    <div class="line">SCANNING PORTS... [OK]</div>
    <div class="line">CHECKING SSL... [OK]</div>
    <div class="line" style="color: #ef4444">WARNING: Unsecured database endpoint detected.</div>
    <br>
    <button style="background: #10b981; padding: 10px 20px; border: none; font-weight: 900">FIX ALL</button>
</body>
</html>`
  },
  /* --- 47: NATURE --- */
  {
    icon: '🌋', en: 'Nature Explorer', fr: 'Nature Explorer',
    desc_en: 'Outdoor adventure portal with trail maps and difficulty ratings.',
    desc_fr: 'Portail aventure nature avec cartes de sentiers.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Nature</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #ecfdf5; color: #064e3b; padding: 40px; }
        .card { background: #fff; padding: 25px; border-radius: 20px; margin-bottom: 20px; }
    </style>
</head>
<body>
    <h1>Mountain Guide</h1>
    <br>
    <div class="card">
        <h3>Everest Base Camp</h3>
        <p>Difficulty: Expert • Duration: 12 Days</p>
    </div>
    <div class="card">
        <h3>Swiss Alps Circle</h3>
        <p>Difficulty: Moderate • Duration: 4 Days</p>
    </div>
</body>
</html>`
  },
  /* --- 48: SPACE --- */
  {
    icon: '🔭', en: 'Astro Hub', fr: 'Astro Hub',
    desc_en: 'Stargazing companion with celestial event calendars and telescope info.',
    desc_fr: 'Compagnon d\'astronomie și calendrier céleste.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Astro</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #020617; color: #fff; padding: 60px 40px; text-align: center; }
        .star { background: #fff; box-shadow: 0 0 10px #fff; width: 2px; height: 2px; border-radius: 50%; position: absolute; }
    </style>
</head>
<body>
    <div class="star" style="top: 20%; left: 30%"></div>
    <div class="star" style="top: 50%; left: 80%"></div>
    <h1>ASTRONOMY.</h1>
    <p style="color: #64748b; margin-top: 20px">Next Meteor Shower: August 14, 2024</p>
</body>
</html>`
  },
  /* --- 49: CRYPTO --- */
  {
    icon: '🪙', en: 'Token Launchpad', fr: 'Token Launchpad',
    desc_en: 'Platform for discovering and tracking new digital asset launches.',
    desc_fr: 'Plateforme de lancement d\'assets digitaux.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Launch</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #000; color: #fff; padding: 40px; }
        .card { background: #111; padding: 30px; border-radius: 24px; border: 1px solid #333; }
    </style>
</head>
<body>
    <h1>Upcoming Tokens</h1>
    <br>
    <div class="card">
        <h3>NEURAL TOKEN (NRT)</h3>
        <p>Price: $0.02 • Launch in: 4h 12m</p>
        <br>
        <button style="width: 100%; padding: 15px; background: #3b82f6; color: #fff; border: none; border-radius: 12px; font-weight: 900">WHITELIST ME</button>
    </div>
</body>
</html>`
  },
  /* --- 50: TRAVEL --- */
  {
    icon: '🧳', en: 'Travel Planner', fr: 'Planificateur Voyage',
    desc_en: 'Comprehensive trip building tool for complex international itineraries.',
    desc_fr: 'Outil de planification de voyages internationaux.',
    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <title>Travel</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { background: #f1f5f9; padding: 40px; }
        .step { background: #fff; padding: 25px; border-radius: 20px; margin-bottom: 20px; display: flex; gap: 20px; align-items: center; }
        .num { width: 40px; height: 40px; background: #000; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; }
    </style>
</head>
<body>
    <h1>Summer Eurotrip</h1>
    <br>
    <div class="step">
        <div class="num">1</div>
        <div>
            <b>Flight to Paris CDG</b>
            <br>
            August 10, 2024
        </div>
    </div>
    <div class="step">
        <div class="num">2</div>
        <div>
            <b>Train to Amsterdam Central</b>
            <br>
            August 15, 2024
        </div>
    </div>
    <div class="step">
        <div class="num">3</div>
        <div>
            <b>Flight back to JFK</b>
            <br>
            August 20, 2024
        </div>
    </div>
</body>
</html>`
  }
];

window.APPS_PRO_DATA = APPS_PRO_DATA;
