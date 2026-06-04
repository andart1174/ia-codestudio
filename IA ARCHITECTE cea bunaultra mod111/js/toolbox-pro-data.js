'use strict';
/* IA Architecte — Toolbox Pro Data (Categorized UI Components) */

const TOOLBOX_PRO_DATA = [
  {
    category: 'PORTFOLIO',
    items: [
      {
        icon: '💼', en: 'Project Card Pro', fr: 'Carte Projet Pro',
        code: `
<div class="p-card" style="background:#1a2234; border:1px solid rgba(255,255,255,.08); border-radius:16px; overflow:hidden; width:300px; transition:all .3s ease">
  <div style="height:160px; background:linear-gradient(135deg,#3b82f6,#8b5cf6)"></div>
  <div style="padding:24px">
    <h3 style="color:#fff; margin-bottom:8px; font-size:18px">Modern Dashboard UI</h3>
    <p style="color:#94a3b8; font-size:14px; line-height:1.6">A complete redesign of the analytics dashboard with dark mode support.</p>
    <div style="margin-top:20px; display:flex; gap:10px">
      <span style="font-size:11px; padding:4px 10px; background:rgba(59,130,246,.15); color:#3b82f6; border-radius:20px; font-weight:800; text-transform:uppercase">React</span>
      <span style="font-size:11px; padding:4px 10px; background:rgba(16,185,129,.15); color:#10b981; border-radius:20px; font-weight:800; text-transform:uppercase">TS</span>
    </div>
  </div>
</div>`
      }
    ]
  },
  {
    category: 'BLOG & ARTICLES',
    items: [
      {
        icon: '📄', en: 'Article Row', fr: 'Ligne Article',
        code: `
<div class="a-row" style="display:flex; gap:20px; padding:20px; border-bottom:1px solid rgba(255,255,255,.05); align-items:center; max-width:600px">
  <div style="width:120px; height:80px; background:#1e293b; border-radius:12px; flex-shrink:0; overflow:hidden">
    <div style="width:100%; height:100%; background:linear-gradient(45deg,#3b82f666,#8b5cf666)"></div>
  </div>
  <div style="flex:1">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px">
      <span style="font-size:10px; color:#3b82f6; font-weight:900; text-transform:uppercase; letter-spacing:1px">Design</span>
      <span style="font-size:10px; color:#64748b; font-weight:600">5 min read</span>
    </div>
    <h4 style="color:#f1f5f9; margin:0 0 6px 0; font-size:17px; font-weight:800">The future of AI in web development</h4>
    <p style="color:#94a3b8; font-size:13px; line-height:1.5; margin:0">Exploring how LLMs are changing the way we write code and build interfaces.</p>
  </div>
</div>`
      }
    ]
  },
  {
    category: 'SMART BLOCKS (LOGIC)',
    items: [
      {
        icon: '⚡', en: 'Smart Counter', fr: 'Compteur Logic',
        code: `
<div class="smart-box" style="padding:24px; background:rgba(59,130,246,.05); border:1px solid rgba(59,130,246,.2); border-radius:16px; display:flex; align-items:center; gap:24px; justify-content:center; width:fit-content">
  <button style="width:40px; height:40px; border-radius:12px; border:none; background:#3b82f6; color:#fff; cursor:pointer; font-size:20px; font-weight:900; box-shadow:0 10px 20px rgba(59,130,246,0.2)" 
          onclick="this.nextElementSibling.textContent++">
    +
  </button>
  <span style="font-size:32px; font-weight:900; color:#fff; min-width:40px; text-align:center; font-family:'JetBrains Mono',monospace">0</span>
  <button style="width:40px; height:40px; border-radius:12px; border:none; background:rgba(255,255,255,.12); color:#fff; cursor:pointer; font-size:20px; font-weight:900" 
          onclick="this.previousElementSibling.textContent--">
    -
  </button>
</div>`
      },
      {
        icon: '🔘', en: 'Toggle Logic', fr: 'Toggle Logic',
        code: `
<div class="toggle-card" style="padding:18px 24px; background:#1e293b; border-radius:16px; border:1px solid rgba(255,255,255,0.05); width:280px; display:flex; justify-content:space-between; align-items:center">
  <span style="color:#e2e8f0; font-weight:800; font-size:14px">Active Status</span>
  <label style="position:relative; display:inline-block; width:52px; height:28px">
    <input type="checkbox" style="opacity:0; width:0; height:0" 
           onchange="const s=this.nextElementSibling; const d=s.firstChild; const on=this.checked; s.style.background=on?'#10b981':'#475569'; d.style.transform=on?'translateX(24px)':'translateX(0)'">
    <div style="position:absolute; cursor:pointer; top:0; left:0; right:0; bottom:0; background:#475569; transition:.3s ease; border-radius:24px; padding:3px">
      <div style="width:22px; height:22px; background:#fff; border-radius:50%; transition:.3s ease; box-shadow:0 2px 5px rgba(0,0,0,0.2)"></div>
    </div>
  </label>
</div>`
      },
      {
        icon: '⚡', en: 'Live Search Logic', fr: 'Recherche Live',
        code: `
<div class="live-wrap" style="padding:24px; background:#111827; border-radius:20px; border:1px solid rgba(255,255,255,.1); width:320px">
  <div style="position:relative">
    <input type="text" placeholder="Search keywords..." 
           style="width:100%; padding:12px 16px 12px 40px; background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.12); border-radius:12px; color:#fff; outline:none; font-size:14px" 
           oninput="document.getElementById('live-out').textContent = this.value ? 'Results for: '+this.value : 'Awaiting input...'">
    <span style="position:absolute; left:14px; top:50%; transform:translateY(-50%); opacity:0.5">🔍</span>
  </div>
  <div id="live-out" style="margin-top:15px; color:#3b82f6; font-weight:800; font-size:13px; font-family:monospace; text-align:center">Awaiting input...</div>
</div>`
      }
    ]
  },
  {
    category: 'E-COMMERCE PRO',
    items: [
      {
        icon: '🛒', en: 'Cart Sidebar', fr: 'Panier Latéral',
        code: `
<div style="width:320px; background:#fff; height:100%; box-shadow:-10px 0 30px rgba(0,0,0,0.1); display:flex; flex-direction:column; color:#1e293b">
  <div style="padding:24px; border-bottom:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center">
    <h3 style="margin:0; font-weight:800">Your Cart</h3>
    <span style="font-size:12px; background:#3b82f6; color:#fff; padding:2px 8px; border-radius:10px; font-weight:800">3 ITEMS</span>
  </div>
  <div style="flex:1; padding:20px; display:flex; flex-direction:column; gap:15px">
    <div style="display:flex; gap:12px; align-items:center">
      <div style="width:50px; height:50px; background:#f8fafc; border-radius:8px"></div>
      <div style="flex:1"><div style="font-size:13px; font-weight:700">Air Max Pro</div><div style="font-size:11px; color:#64748b">$189.99</div></div>
      <div style="font-weight:800">×1</div>
    </div>
  </div>
  <div style="padding:24px; border-top:1px solid #f1f5f9; background:#f8fafc">
    <div style="display:flex; justify-content:space-between; margin-bottom:15px; font-weight:800"><span>Total</span><span>$189.99</span></div>
    <button style="width:100%; padding:14px; background:#0f172a; color:#fff; border:none; border-radius:12px; font-weight:800; cursor:pointer">CHECKOUT NOW</button>
  </div>
</div>`
      },
      {
        icon: '💳', en: 'Payment Card', fr: 'Carte Paiement',
        code: `
<div style="width:340px; height:200px; background:linear-gradient(135deg,#1e293b,#0f172a); border-radius:20px; padding:28px; position:relative; color:#fff; box-shadow:0 20px 40px rgba(0,0,0,0.3); overflow:hidden">
  <div style="position:absolute; top:-50px; right:-50px; width:150px; height:150px; background:rgba(59,130,246,0.1); border-radius:50%"></div>
  <div style="font-size:18px; font-weight:500; letter-spacing:2px; margin-bottom:40px">PREMIUM VISA</div>
  <div style="font-size:22px; font-family:monospace; word-spacing:10px; margin-bottom:20px">**** **** **** 8821</div>
  <div style="display:flex; justify-content:space-between; align-items:flex-end">
    <div><div style="font-size:9px; opacity:0.6; text-transform:uppercase">Card Holder</div><div style="font-size:14px; font-weight:700">SARAH JOHNSON</div></div>
    <div style="font-size:20px; font-weight:900; font-style:italic">VISA</div>
  </div>
</div>`
      }
    ]
  },
  {
    category: 'ADVANCED PRO UI',
    items: [
      {
        icon: '🗂️', en: 'Glass Tabs', fr: 'Onglets Verre',
        code: `
<div style="background:rgba(255,255,255,0.03); backdrop-filter:blur(10px); padding:6px; border-radius:14px; border:1px solid rgba(255,255,255,0.08); display:flex; gap:4px">
  <button style="flex:1; padding:10px 20px; background:#3b82f6; color:#fff; border:none; border-radius:10px; font-weight:700; cursor:pointer">Analytics</button>
  <button style="flex:1; padding:10px 20px; background:transparent; color:#94a3b8; border:none; border-radius:10px; font-weight:700; cursor:pointer">Insights</button>
  <button style="flex:1; padding:10px 20px; background:transparent; color:#94a3b8; border:none; border-radius:10px; font-weight:700; cursor:pointer">Settings</button>
</div>`
      },
      {
        icon: '🚨', en: 'Status Modal', fr: 'Popup Statut',
        code: `
<div style="width:380px; background:#111827; border:1px solid #374151; border-radius:24px; padding:32px; text-align:center; box-shadow:0 30px 60px rgba(0,0,0,0.5)">
  <div style="width:64px; height:64px; background:rgba(239,68,68,0.1); color:#ef4444; border-radius:50%; margin:0 auto 24px; display:flex; align-items:center; justify-content:center; font-size:30px">✕</div>
  <h3 style="color:#fff; font-size:22px; margin:0 0 12px 0; font-weight:800">Connection Failed</h3>
  <p style="color:#9ca3af; font-size:14px; line-height:1.6; margin:0 0 28px 0">We couldn't connect to the secure vault. Please check your credentials and try again.</p>
  <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px">
    <button style="padding:12px; background:#374151; color:#fff; border:none; border-radius:12px; font-weight:700; cursor:pointer">Cancel</button>
    <button style="padding:12px; background:#ef4444; color:#fff; border:none; border-radius:12px; font-weight:700; cursor:pointer">Retry</button>
  </div>
</div>`
      }
    ]
  },
  {
    category: 'AUTHENTICATION PRO',
    items: [
      {
        icon: '🔐', en: 'Glass Login', fr: 'Login Verre',
        code: `
<div style="width:360px; background:rgba(255,255,255,0.02); backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,0.1); border-radius:24px; padding:40px; box-shadow:0 25px 50px -12px rgba(0,0,0,0.5)">
  <h2 style="color:#fff; font-size:28px; font-weight:900; margin:0 0 8px 0; text-align:center">Welcome Back</h2>
  <p style="color:#94a3b8; font-size:14px; margin:0 0 32px 0; text-align:center">Enter your details to access your vault.</p>
  <div style="margin-bottom:20px">
    <label style="display:block; color:#cbd5e1; font-size:12px; font-weight:700; margin-bottom:8px; text-transform:uppercase">Email Address</label>
    <input type="email" placeholder="name@company.com" style="width:100%; padding:14px; background:rgba(0,0,0,0.2); border:1px solid rgba(255,255,255,0.1); border-radius:12px; color:#fff; outline:none">
  </div>
  <div style="margin-bottom:32px">
    <label style="display:block; color:#cbd5e1; font-size:12px; font-weight:700; margin-bottom:8px; text-transform:uppercase">Password</label>
    <input type="password" placeholder="••••••••" style="width:100%; padding:14px; background:rgba(0,0,0,0.2); border:1px solid rgba(255,255,255,0.1); border-radius:12px; color:#fff; outline:none">
  </div>
  <button style="width:100%; padding:16px; background:#fff; color:#000; border:none; border-radius:12px; font-weight:900; cursor:pointer; transition:0.3s ease">SIGN IN</button>
</div>`
      },
      {
        icon: '🔢', en: 'OTP Verification', fr: 'Vérification OTP',
        code: `
<div style="width:340px; background:#111827; border:1px solid #374151; border-radius:24px; padding:40px; text-align:center">
  <div style="font-size:40px; margin-bottom:20px">📱</div>
  <h3 style="color:#fff; font-size:22px; font-weight:800; margin:0 0 10px 0">Verify your device</h3>
  <p style="color:#9ca3af; font-size:14px; margin:0 0 32px 0">Enter the 4-digit code sent to your phone.</p>
  <div style="display:flex; gap:12px; justify-content:center; margin-bottom:32px">
    <input type="text" maxlength="1" style="width:50px; height:60px; background:#1f2937; border:1px solid #374151; border-radius:12px; color:#fff; font-size:24px; font-weight:900; text-align:center; outline:none">
    <input type="text" maxlength="1" style="width:50px; height:60px; background:#1f2937; border:1px solid #374151; border-radius:12px; color:#fff; font-size:24px; font-weight:900; text-align:center; outline:none">
    <input type="text" maxlength="1" style="width:50px; height:60px; background:#1f2937; border:1px solid #374151; border-radius:12px; color:#fff; font-size:24px; font-weight:900; text-align:center; outline:none">
    <input type="text" maxlength="1" style="width:50px; height:60px; background:#1f2937; border:1px solid #374151; border-radius:12px; color:#fff; font-size:24px; font-weight:900; text-align:center; outline:none">
  </div>
  <button style="width:100%; padding:14px; background:#3b82f6; color:#fff; border:none; border-radius:12px; font-weight:800; cursor:pointer">VERIFY CODE</button>
</div>`
      }
    ]
  },
  {
    category: 'DATA VISUALIZATION',
    items: [
      {
        icon: '📊', en: 'Donut Chart Pro', fr: 'Graphique Donut',
        code: `
<div style="width:280px; background:#1e293b; padding:24px; border-radius:20px; border:1px solid rgba(255,255,255,0.05)">
  <h4 style="color:#94a3b8; font-size:11px; font-weight:800; text-transform:uppercase; margin:0 0 20px 0; letter-spacing:1px">Market Share</h4>
  <div style="display:flex; align-items:center; gap:24px">
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(255,255,255,0.05)" stroke-width="12"/>
      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" stroke-width="12" stroke-dasharray="180 251" stroke-linecap="round"/>
      <text x="50" y="55" text-anchor="middle" fill="#fff" font-size="16" font-weight="900" style="font-family:sans-serif">72%</text>
    </svg>
    <div style="display:flex; flex-direction:column; gap:8px">
      <div style="display:flex; align-items:center; gap:8px; font-size:12px; color:#fff">
        <div style="width:8px; height:8px; background:#3b82f6; border-radius:2px"></div> Mobile
      </div>
      <div style="display:flex; align-items:center; gap:8px; font-size:12px; color:#94a3b8">
        <div style="width:8px; height:8px; background:rgba(255,255,255,0.1); border-radius:2px"></div> Desktop
      </div>
    </div>
  </div>
</div>`
      },
      {
        icon: '📈', en: 'Sparkline Stat', fr: 'Mini Graphique',
        code: `
<div style="width:220px; background:#111827; padding:20px; border-radius:16px; border:1px solid rgba(255,255,255,0.05)">
  <div style="color:#64748b; font-size:11px; font-weight:800; margin-bottom:4px uppercase">DAILY REVENUE</div>
  <div style="display:flex; justify-content:space-between; align-items:flex-end">
    <div style="font-size:24px; font-weight:900; color:#fff">$4,2k</div>
    <svg width="80" height="30" viewBox="0 0 80 30">
      <path d="M0 25 L10 20 L20 22 L30 10 L40 15 L50 5 L60 12 L70 2 L80 8" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round"/>
    </svg>
  </div>
  <div style="color:#10b981; font-size:11px; font-weight:700; margin-top:8px">▲ +14.2%</div>
</div>`
      }
    ]
  },
  {
    category: 'DASHBOARD STATS',
    items: [
      {
        icon: '📈', en: 'Stat Card', fr: 'Carte Stat',
        code: `
<div class="stat-card" style="background:#1e293b; padding:20px; border-radius:16px; border:1px solid rgba(255,255,255,.05); width:200px">
  <div style="color:#64748b; font-size:12px; font-weight:700; margin-bottom:10px; text-transform:uppercase">Active Users</div>
  <div style="display:flex; align-items:baseline; gap:8px">
    <div style="font-size:28px; font-weight:800; color:#fff">24.5k</div>
    <div style="font-size:12px; color:#10b981; font-weight:700">+12%</div>
  </div>
</div>`
      },
      {
        icon: '📊', en: 'Progress Bar Pro', fr: 'Barre Progrès Pro',
        code: `
<div class="prog-wrap" style="width:100%; max-width:400px">
  <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:12px; color:#94a3b8; font-weight:800; text-transform:uppercase">
    <span>Storage Used</span>
    <span>85%</span>
  </div>
  <div style="height:10px; background:rgba(255,255,255,.05); border-radius:10px; overflow:hidden; border:1px solid rgba(255,255,255,0.05)">
    <div style="width:85%; height:100%; background:linear-gradient(90deg,#3b82f6,#8b5cf6); border-radius:10px; box-shadow:0 0 15px rgba(59,130,246,0.5)"></div>
  </div>
</div>`
      }
    ]
  },
  {
    category: 'FEATURES & SERVICES',
    items: [
      {
        icon: '📋', en: 'Feature Grid (3)', fr: 'Grille Fonctions (3)',
        code: `<div class="grid-3" style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;padding:40px">
  <div style="text-align:center">
    <div style="font-size:32px;margin-bottom:15px">⚡</div>
    <h3 style="color:#fff;margin-bottom:10px">Fast Speed</h3>
    <p style="color:#64748b;font-size:14px">Optimized for high performance apps.</p>
  </div>
  <div style="text-align:center">
    <div style="font-size:32px;margin-bottom:15px">🔒</div>
    <h3 style="color:#fff;margin-bottom:10px">Securely Built</h3>
    <p style="color:#64748b;font-size:14px">Enterprise grade security standards.</p>
  </div>
  <div style="text-align:center">
    <div style="font-size:32px;margin-bottom:15px">🚀</div>
    <h3 style="color:#fff;margin-bottom:10px">Cloud Sync</h3>
    <p style="color:#64748b;font-size:14px">Real-time sync across all devices.</p>
  </div>
</div>`
      }
    ]
  },
  {
    category: 'GLASSMORPHISM (IDEA)',
    items: [
      {
        icon: '🧊', en: 'Glass Card', fr: 'Carte Glossy',
        code: `<div class="glass" style="background:rgba(255,255,255,.05);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.12);padding:30px;border-radius:24px;color:#fff;width:300px;box-shadow:0 8px 32px 0 rgba(0,0,0,.37)">
  <h2 style="margin-bottom:10px;font-weight:800">Glass UI</h2>
  <p style="opacity:.8;font-size:14px">The ultimate modern aesthetic. Smooth blur and subtle borders.</p>
</div>`
      }
    ]
  },
   {
    category: 'NEUMORPHISM (IDEA)',
    items: [
      {
        icon: '💿', en: 'Soft Button', fr: 'Bouton Soft',
        code: `<button style="background:#e0e0e0;padding:15px 40px;border:none;border-radius:15px;color:#444;font-weight:700;box-shadow:20px 20px 60px #bebebe,-20px -20px 60px #ffffff;cursor:pointer;transition:all .2s" onmousedown="this.style.boxShadow='inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff'" onmouseup="this.style.boxShadow='20px 20px 60px #bebebe,-20px -20px 60px #ffffff'">Soft Click</button>`
      }
    ]
  },
  {
    category: 'MESSAGING & SOCIAL',
    items: [
      {
        icon: '💬', en: 'Chat Bubbles', fr: 'Bulles de Chat',
        code: `
<div style="width:340px; display:flex; flex-direction:column; gap:16px; font-family:sans-serif">
  <div style="display:flex; gap:10px; align-self:flex-start">
    <div style="width:32px; height:32px; background:#3b82f6; border-radius:50%; flex-shrink:0"></div>
    <div style="background:#f1f5f9; color:#1e293b; padding:12px 16px; border-radius:18px 18px 18px 4px; font-size:13px; line-height:1.4">Hi! Can you help me with the new dashboard design?</div>
  </div>
  <div style="display:flex; gap:10px; align-self:flex-end">
    <div style="background:#3b82f6; color:#fff; padding:12px 16px; border-radius:18px 18px 4px 18px; font-size:13px; line-height:1.4">Sure thing! I've already prepared the draft.</div>
  </div>
</div>`
      },
      {
        icon: '💖', en: 'Social Post Bar', fr: 'Barre Post Social',
        code: `
<div style="display:flex; justify-content:space-between; align-items:center; width:300px; padding:12px 16px; background:#1e293b; border-radius:30px; border:1px solid rgba(255,255,255,0.05)">
  <div style="display:flex; gap:12px">
    <button style="background:none; border:none; color:#ef4444; cursor:pointer; font-size:18px">❤️</button>
    <button style="background:none; border:none; color:#94a3b8; cursor:pointer; font-size:18px">💬</button>
    <button style="background:none; border:none; color:#94a3b8; cursor:pointer; font-size:18px">🚀</button>
  </div>
  <button style="background:none; border:none; color:#3b82f6; cursor:pointer; font-size:18px">🔖</button>
</div>`
      }
    ]
  },
  {
    category: 'FORMS & INPUTS',
    items: [
      {
        icon: '📁', en: 'File Dropzone', fr: 'Zone de Dépôt',
        code: `
<div style="width:100%; max-width:400px; height:160px; border:2px dashed rgba(59,130,246,0.3); background:rgba(59,130,246,0.02); border-radius:16px; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; transition:0.3s ease" onmouseover="this.style.background='rgba(59,130,246,0.05)'; this.style.borderColor='#3b82f6'">
  <div style="font-size:32px; margin-bottom:12px">📤</div>
  <div style="font-weight:700; color:#fff; font-size:14px">Drop your files here</div>
  <div style="font-size:12px; color:#94a3b8; margin-top:4px">Support for PDF, PNG, JPG (Max 10MB)</div>
</div>`
      }
    ]
  },
  {
    category: 'TABLES & TASK LISTS',
    items: [
      {
        icon: '📋', en: 'Task Kanban Card', fr: 'Carte Kanban',
        code: `
<div style="width:280px; background:#1a1f2e; border-radius:12px; border:1px solid rgba(255,255,255,0.05); padding:16px; box-shadow:0 10px 20px rgba(0,0,0,0.2)">
  <div style="display:flex; justify-content:space-between; margin-bottom:12px">
    <span style="font-size:10px; background:rgba(16,185,129,0.1); color:#10b981; padding:2px 8px; border-radius:20px; font-weight:800">DEVELOPMENT</span>
    <span style="font-size:14px; cursor:pointer; opacity:0.5">•••</span>
  </div>
  <h4 style="color:#fff; font-size:15px; margin:0 0 8px 0; font-weight:700">Integrate Stripe API</h4>
  <p style="color:#64748b; font-size:12px; line-height:1.4; margin:0 0 16px 0">Set up webhook listeners and handle checkout session completion.</p>
  <div style="display:flex; justify-content:space-between; align-items:center; padding-top:12px; border-top:1px solid rgba(255,255,255,0.05)">
    <div style="display:flex; -webkit-mask-image: linear-gradient(to right, black 85%, transparent)">
      <div style="width:24px; height:24px; border-radius:50%; background:#3b82f6; border:2px solid #1a1f2e"></div>
      <div style="width:24px; height:24px; border-radius:50%; background:#ef4444; border:2px solid #1a1f2e; margin-left:-8px"></div>
    </div>
    <span style="font-size:11px; color:#94a3b8; font-weight:700">🗓️ Oct 12</span>
  </div>
</div>`
      }
    ]
  },
  {
    category: 'MARKETING PRO',
    items: [
      {
        icon: '💎', en: 'Pricing Card', fr: 'Carte Tarification',
        code: `
<div style="width:300px; background:#fff; border-radius:24px; padding:40px; box-shadow:0 20px 40px rgba(0,0,0,0.05); text-align:center; color:#1e293b">
  <div style="font-weight:800; font-size:12px; letter-spacing:1px; color:#3b82f6; margin-bottom:16px; text-transform:uppercase">Professional</div>
  <div style="font-size:48px; font-weight:900; margin-bottom:8px">$49<span style="font-size:16px; color:#64748b; font-weight:500">/mo</span></div>
  <div style="display:flex; flex-direction:column; gap:12px; margin:32px 0; text-align:left">
    <div style="font-size:14px">✅ Unlimited Projects</div>
    <div style="font-size:14px">✅ 100GB Cloud Storage</div>
    <div style="font-size:14px">✅ Priority Support</div>
  </div>
  <button style="width:100%; padding:16px; background:#0f172a; color:#fff; border:none; border-radius:12px; font-weight:800; cursor:pointer">GET STARTED</button>
</div>`
      },
      {
        icon: '📧', en: 'Newsletter Bar', fr: 'Barre Newsletter',
        code: `
<div style="background:#0f172a; padding:32px; border-radius:24px; color:#fff; display:flex; align-items:center; gap:24px; max-width:700px">
  <div style="flex:1">
    <h3 style="font-size:20px; font-weight:900; margin:0 0 4px 0">Stay in the loop</h3>
    <p style="color:#94a3b8; font-size:13px; margin:0">Get the latest updates and AI tools delivered weekly.</p>
  </div>
  <div style="display:flex; gap:8px">
    <input type="email" placeholder="Your email..." style="padding:12px 16px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:10px; color:#fff; outline:none">
    <button style="padding:12px 24px; background:#3b82f6; color:#fff; border:none; border-radius:10px; font-weight:800; cursor:pointer">JOIN</button>
  </div>
</div>`
      }
    ]
  },
  {
    category: 'FEATURES & SERVICES',
    items: [
      {
        icon: '📋', en: 'Feature Grid (3)', fr: 'Grille Fonctions (3)',
        code: `
<div class="grid-3" style="display:grid; grid-template-columns:repeat(3,1fr); gap:24px; padding:40px; background:#0f172a; border-radius:24px">
  <div style="text-align:center">
    <div style="font-size:32px; margin-bottom:16px">⚡</div>
    <h3 style="color:#fff; margin:0 0 10px 0; font-size:18px">Fast Speed</h3>
    <p style="color:#64748b; font-size:14px; line-height:1.6">Optimized for high performance applications.</p>
  </div>
  <div style="text-align:center">
    <div style="font-size:32px; margin-bottom:16px">🔒</div>
    <h3 style="color:#fff; margin:0 0 10px 0; font-size:18px">Secure Built</h3>
    <p style="color:#64748b; font-size:14px; line-height:1.6">Enterprise grade encryption standards.</p>
  </div>
  <div style="text-align:center">
    <div style="font-size:32px; margin-bottom:16px">🚀</div>
    <h3 style="color:#fff; margin:0 0 10px 0; font-size:18px">Cloud Sync</h3>
    <p style="color:#64748b; font-size:14px; line-height:1.6">Real-time sync across all your devices.</p>
  </div>
</div>`
      }
    ]
  },
  {
    category: 'AESTHETIC BLOCKS',
    items: [
      {
        icon: '🧊', en: 'Glass Card Pro', fr: 'Carte Verre Pro',
        code: `
<div class="glass" style="background:rgba(255,255,255,.03); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,.1); padding:32px; border-radius:24px; color:#fff; width:320px; box-shadow:0 8px 32px 0 rgba(0,0,0,0.3)">
  <h2 style="margin:0 0 10px 0; font-weight:900; font-size:24px">Glass UI</h2>
  <p style="opacity:.6; font-size:14px; line-height:1.6">The ultimate modern aesthetic. Smooth blurs and subtle adaptive borders.</p>
</div>`
      },
      {
        icon: '📀', en: 'Soft Neumorph UI', fr: 'Neumorph UI',
        code: `
<div style="background:#e0e0e0; padding:40px; border-radius:30px; display:flex; gap:20px">
  <button style="background:#e0e0e0; padding:15px 30px; border:none; border-radius:15px; color:#444; font-weight:800; box-shadow:10px 10px 20px #bebebe, -10px -10px 20px #ffffff; cursor:pointer; active:scale(0.95)">Primary</button>
  <button style="background:#e0e0e0; padding:15px 30px; border:none; border-radius:15px; color:#3b82f6; font-weight:800; box-shadow:inset 6px 6px 12px #bebebe, inset -6px -6px 12px #ffffff; cursor:pointer">Pressed</button>
</div>`
      },
      {
        icon: '✨', en: 'Typewriter Text', fr: 'Texte Typewriter',
        code: `
<div style="background:#111; padding:30px; border-radius:20px; border:1px solid #333">
  <h2 id="tw" style="color:#fff; font-family:'JetBrains Mono',monospace; border-right:3px solid #3b82f6; width:fit-content; white-space:nowrap; overflow:hidden; animation:typing 3.5s steps(30, end), blink .75s step-end infinite">Architecting the future...</h2>
</div>
<style>
@keyframes typing{from{width:0}to{width:100%}}
@keyframes blink{from,to{border-color:transparent}50%{border-color:#3b82f6}}
</style>`
      }
    ]
  },
  {
    category: 'INTERACTIVE LOGIC',
    items: [
      {
        icon: '🔍', en: 'Smart Search Bar', fr: 'Barre Recherche IA',
        code: `
<div style="position:relative; width:100%; max-width:400px; margin:20px 0;">
  <input type="search" placeholder="Search anything..." 
         style="width:100%; padding:14px 18px 14px 46px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:15px; color:#fff; outline:none; font-family:sans-serif; transition:0.3s">
  <span style="position:absolute; left:16px; top:50%; transform:translateY(-50%); font-size:18px; opacity:0.5">🔍</span>
  <style> input[type="search"]:focus { border-color: #3b82f6; background: rgba(59,130,246,0.05); box-shadow: 0 0 20px rgba(59,130,246,0.2); } </style>
</div>`
      },
      {
        icon: '🌓', en: 'Theme Switcher', fr: 'Sélecteur Thème',
        code: `
<button id="ia-theme-toggle" style="padding:12px 24px; background:rgba(59,130,246,0.1); color:#3b82f6; border:1px solid #3b82f6; border-radius:12px; font-weight:800; cursor:pointer; display:flex; align-items:center; gap:10px; transition:0.3s">
  <span>🌓</span> Toggle Mode
</button>`
      }
    ]
  }
];

window.TOOLBOX_PRO_DATA = TOOLBOX_PRO_DATA;
