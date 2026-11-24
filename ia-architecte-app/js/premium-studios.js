'use strict';

(function() {

// =======================
// DATA: UI Blocks
// =======================
const UI_BLOCKS = [
  {
    icon: '🪟', name: 'Glassmorphism Hero', desc: 'Modern hero section with glass UI.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Glassmorphism Hero</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; font-family:sans-serif; }
    body {
      min-height: 100vh;
      background: linear-gradient(135deg, #f43f5e, #8b5cf6, #3b82f6);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
    .glass-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 24px;
      padding: 60px;
      text-align: center;
      color: white;
      max-width: 600px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }
    h1 { font-size: 3rem; margin-bottom: 20px; }
    p { font-size: 1.2rem; margin-bottom: 30px; opacity: 0.9; line-height: 1.5; }
    button {
      padding: 15px 30px;
      border: none;
      border-radius: 30px;
      background: white;
      color: #8b5cf6;
      font-size: 1.1rem;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.2s;
    }
    button:hover { transform: scale(1.05); }
  </style>
</head>
<body>
  <div class="glass-card">
    <h1>Future is Here</h1>
    <p>Build stunning user interfaces instantly with perfectly generated glassmorphism components.</p>
    <button>Get Started</button>
  </div>
</body>
</html>`
  },
  {
    icon: '🏷️', name: 'Pricing Table', desc: 'Sleek, converting pricing cards.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pricing Table</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; font-family:sans-serif; }
    body { background: #f8fafc; display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; }
    .grid { display: flex; gap: 30px; }
    .card { background: white; padding: 40px; border-radius: 20px; width: 300px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); text-align: center; }
    .card.pro { border: 2px solid #3b82f6; transform: scale(1.05); position: relative; }
    .badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #3b82f6; color: white; padding: 5px 15px; border-radius: 20px; font-size: 0.8rem; font-weight: bold; }
    h3 { font-size: 1.5rem; color: #1e293b; margin-bottom: 10px; }
    .price { font-size: 3rem; font-weight: bold; color: #1e293b; margin-bottom: 30px; }
    .price span { font-size: 1rem; color: #64748b; }
    ul { list-style: none; margin-bottom: 30px; text-align: left; }
    li { margin-bottom: 15px; color: #475569; }
    button { padding: 12px; width: 100%; border-radius: 10px; border: none; font-weight: bold; cursor: pointer; }
    .btn-outline { background: #f1f5f9; color: #1e293b; }
    .btn-solid { background: #3b82f6; color: white; }
  </style>
</head>
<body>
  <div class="grid">
    <div class="card">
      <h3>Basic</h3>
      <div class="price">$9<span>/mo</span></div>
      <ul><li>✅ 1 Project</li><li>✅ Basic Support</li><li>❌ Custom Domain</li></ul>
      <button class="btn-outline">Choose Basic</button>
    </div>
    <div class="card pro">
      <div class="badge">MOST POPULAR</div>
      <h3>Pro</h3>
      <div class="price">$29<span>/mo</span></div>
      <ul><li>✅ Unlimited Projects</li><li>✅ Priority Support</li><li>✅ Custom Domain</li></ul>
      <button class="btn-solid">Choose Pro</button>
    </div>
  </div>
</body>
</html>`
  }
];

// =======================
// DATA: Motion FX
// =======================
const MOTION_FX = [
  {
    icon: '🧲', name: 'Magnetic Button', desc: 'Button that follows mouse cursor.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Magnetic Button</title>
  <style>
    body { background: #111; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
    .magnet {
      padding: 20px 40px;
      font-size: 1.2rem;
      background: #f43f5e;
      color: white;
      border: none;
      border-radius: 30px;
      cursor: pointer;
      font-weight: bold;
      transition: transform 0.1s ease-out;
      box-shadow: 0 10px 30px rgba(244,63,94,0.3);
    }
  </style>
</head>
<body>
  <button class="magnet" id="btn">Hover Me</button>

  <script>
    const btn = document.getElementById('btn');
    
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Move button slightly towards cursor
      btn.style.transform = 'translate(' + (x * 0.3) + 'px, ' + (y * 0.3) + 'px)';
    });
    
    btn.addEventListener('mouseleave', () => {
      // Reset position with a spring effect via CSS transition
      btn.style.transform = 'translate(0px, 0px)';
    });
  <\/script>
</body>
</html>`
  },
  {
    icon: '🌀', name: 'Hypnotic Loader', desc: 'CSS only advanced loading animation.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CSS Loader</title>
  <style>
    body { background: #0f172a; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
    .loader {
      width: 100px;
      height: 100px;
      border: 5px solid transparent;
      border-top-color: #3b82f6;
      border-bottom-color: #8b5cf6;
      border-radius: 50%;
      animation: spin 1.5s linear infinite;
      position: relative;
    }
    .loader::before {
      content: '';
      position: absolute;
      top: 10px; left: 10px; right: 10px; bottom: 10px;
      border: 5px solid transparent;
      border-left-color: #10b981;
      border-right-color: #f59e0b;
      border-radius: 50%;
      animation: spin-reverse 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes spin-reverse {
      0% { transform: rotate(360deg); }
      100% { transform: rotate(0deg); }
    }
  </style>
</head>
<body>
  <div class="loader"></div>
</body>
</html>`
  }
];

// =======================
// DATA: DataViz
// =======================
const DATA_VIZ = [
  {
    icon: '🥧', name: 'Canvas Pie Chart', desc: 'Pure JS Canvas Pie Chart with animations.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Canvas Pie</title>
  <style>
    body { background: #f8fafc; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: sans-serif; }
    .wrapper { background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); text-align: center; }
  </style>
</head>
<body>
  <div class="wrapper">
    <h2 style="margin-bottom:20px;color:#1e293b;">Market Share</h2>
    <canvas id="chart" width="300" height="300"></canvas>
  </div>

  <script>
    const ctx = document.getElementById('chart').getContext('2d');
    const data = [30, 50, 20];
    const colors = ['#f43f5e', '#3b82f6', '#10b981'];
    
    let total = data.reduce((a,b)=>a+b, 0);
    let startAngle = -0.5 * Math.PI;
    
    // Draw slices
    data.forEach((val, i) => {
      let sliceAngle = (val / total) * 2 * Math.PI;
      
      ctx.beginPath();
      ctx.moveTo(150, 150); // center
      ctx.arc(150, 150, 100, startAngle, startAngle + sliceAngle);
      ctx.fillStyle = colors[i];
      ctx.fill();
      
      startAngle += sliceAngle;
    });
    
    // Donut hole
    ctx.beginPath();
    ctx.arc(150, 150, 60, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
  <\/script>
</body>
</html>`
  }
];

// =======================
// DATA: Web3 Crypto
// =======================
const WEB3_UI = [
  {
    icon: '🦊', name: 'Wallet Connect', desc: 'Modern Web3 Wallet connection UI.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Web3 Connect</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: sans-serif; }
    body { background: #0f172a; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    .modal { background: #1e293b; width: 350px; border-radius: 24px; padding: 30px; box-shadow: 0 20px 50px rgba(0,0,0,0.5); border: 1px solid #334155; }
    h2 { color: white; text-align: center; margin-bottom: 20px; }
    .wallet-btn {
      display: flex; align-items: center; justify-content: space-between;
      width: 100%; padding: 15px 20px; margin-bottom: 15px;
      background: #0f172a; border: 1px solid #334155; border-radius: 16px;
      color: white; font-weight: bold; cursor: pointer; transition: 0.2s;
    }
    .wallet-btn:hover { border-color: #3b82f6; background: rgba(59,130,246,0.1); }
    .icon { font-size: 24px; }
  </style>
</head>
<body>
  <div class="modal">
    <h2>Connect Wallet</h2>
    <button class="wallet-btn" onclick="connect()">
      <span>MetaMask</span> <span class="icon">🦊</span>
    </button>
    <button class="wallet-btn" onclick="connect()">
      <span>Phantom</span> <span class="icon">👻</span>
    </button>
    <button class="wallet-btn" onclick="connect()">
      <span>WalletConnect</span> <span class="icon">🔗</span>
    </button>
    <p id="status" style="color:#10b981;text-align:center;margin-top:10px;font-size:14px;"></p>
  </div>
  
  <script>
    function connect() {
      const s = document.getElementById('status');
      s.innerText = 'Connecting...';
      s.style.color = '#f59e0b';
      
      setTimeout(() => {
        s.innerText = '✅ Wallet Connected (0x7A...3f1)';
        s.style.color = '#10b981';
      }, 1500);
    }
  <\/script>
</body>
</html>`
  },
  {
    icon: '🖼️', name: 'NFT Minting', desc: 'Animated NFT minting interface.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>NFT Mint</title>
  <style>
    body { background: #000; color: white; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: sans-serif; margin: 0; }
    .card { background: #111; padding: 20px; border-radius: 20px; border: 1px solid #333; text-align: center; width: 320px; box-shadow: 0 0 50px rgba(139,92,246,0.2); }
    .nft-art { width: 100%; height: 300px; border-radius: 12px; background: linear-gradient(45deg, #f43f5e, #8b5cf6, #3b82f6); animation: spin 5s infinite linear; margin-bottom: 20px; }
    @keyframes spin { 100% { filter: hue-rotate(360deg); } }
    h2 { margin: 0 0 10px; font-size: 24px; }
    .stats { display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 14px; color: #aaa; }
    .bar-bg { background: #333; height: 10px; border-radius: 5px; margin-bottom: 20px; overflow: hidden; }
    .bar-fill { background: #8b5cf6; height: 100%; width: 65%; }
    button { background: #8b5cf6; color: white; border: none; padding: 15px; border-radius: 10px; font-weight: bold; font-size: 16px; width: 100%; cursor: pointer; transition: 0.2s; }
    button:hover { background: #a78bfa; box-shadow: 0 0 20px #8b5cf6; }
  </style>
</head>
<body>
  <div class="card">
    <div class="nft-art"></div>
    <h2>Cosmic Genesis #402</h2>
    <div class="stats">
      <span>Price: 0.05 ETH</span>
      <span>Minted: 650/1000</span>
    </div>
    <div class="bar-bg"><div class="bar-fill"></div></div>
    <button onclick="mint(this)">Mint NFT</button>
  </div>
  <script>
    function mint(btn) {
      btn.innerText = 'Minting...';
      btn.style.opacity = '0.7';
      setTimeout(() => {
        btn.innerText = 'Successfully Minted!';
        btn.style.background = '#10b981';
      }, 2000);
    }
  <\/script>
</body>
</html>`
  },
  {
    icon: '💱', name: 'Token Swap UI', desc: 'Uniswap-style decentralized exchange widget.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Token Swap</title>
  <style>
    body { background: #1e1e24; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: sans-serif; margin: 0; }
    .swap-box { background: #2b2b36; padding: 20px; border-radius: 24px; width: 340px; box-shadow: 0 10px 40px rgba(0,0,0,0.5); border: 1px solid #3f3f4e; }
    .header { display: flex; justify-content: space-between; color: white; font-weight: bold; margin-bottom: 20px; font-size: 18px; }
    .input-group { background: #1e1e24; border-radius: 16px; padding: 15px; margin-bottom: 10px; border: 1px solid #3f3f4e; }
    .label { color: #8a8a9e; font-size: 12px; margin-bottom: 10px; display: flex; justify-content: space-between; }
    .row { display: flex; justify-content: space-between; align-items: center; }
    input { background: transparent; border: none; color: white; font-size: 24px; outline: none; width: 60%; }
    .token { background: #3f3f4e; color: white; padding: 5px 10px; border-radius: 20px; font-weight: bold; display: flex; align-items: center; gap: 5px; }
    .arrow { text-align: center; color: #8a8a9e; font-size: 20px; margin: -10px 0; z-index: 10; position: relative; }
    button { background: #ec4899; color: white; border: none; padding: 16px; border-radius: 16px; font-size: 18px; font-weight: bold; width: 100%; margin-top: 10px; cursor: pointer; transition: 0.2s; }
    button:hover { background: #f472b6; }
  </style>
</head>
<body>
  <div class="swap-box">
    <div class="header"><span>Swap</span><span>⚙️</span></div>
    <div class="input-group">
      <div class="label"><span>You pay</span><span>Balance: 1.45</span></div>
      <div class="row">
        <input type="number" value="0.5">
        <div class="token">💠 ETH</div>
      </div>
    </div>
    <div class="arrow">↓</div>
    <div class="input-group">
      <div class="label"><span>You receive</span><span>Balance: 0.00</span></div>
      <div class="row">
        <input type="number" value="1542.30" readonly>
        <div class="token">💵 USDT</div>
      </div>
    </div>
    <button onclick="swap(this)">Swap Tokens</button>
  </div>
  <script>
    function swap(btn) {
      btn.innerText = 'Confirming in Wallet...';
      setTimeout(() => {
        btn.innerText = 'Swap Successful ✅';
        btn.style.background = '#10b981';
      }, 2000);
    }
  <\/script>
</body>
</html>`
  },
  {
    icon: '⛽', name: 'Gas Tracker', desc: 'Ethereum network gas fee dashboard.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Gas Tracker</title>
  <style>
    body { background: #0f172a; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: sans-serif; margin: 0; }
    .dashboard { background: #1e293b; padding: 30px; border-radius: 20px; width: 350px; text-align: center; border: 1px solid #334155; }
    h2 { color: white; margin: 0 0 20px; }
    .gwei { font-size: 48px; color: #38bdf8; font-weight: bold; margin-bottom: 30px; text-shadow: 0 0 20px rgba(56,189,248,0.5); }
    .cards { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
    .card { background: #0f172a; padding: 15px 5px; border-radius: 12px; border: 1px solid #334155; }
    .type { color: #94a3b8; font-size: 12px; margin-bottom: 5px; text-transform: uppercase; }
    .val { color: white; font-size: 18px; font-weight: bold; }
    .val.slow { color: #10b981; } .val.avg { color: #f59e0b; } .val.fast { color: #ef4444; }
  </style>
</head>
<body>
  <div class="dashboard">
    <h2>⛽ Live ETH Gas</h2>
    <div class="gwei" id="main">24 Gwei</div>
    <div class="cards">
      <div class="card">
        <div class="type">Slow</div><div class="val slow" id="slow">22</div>
      </div>
      <div class="card">
        <div class="type">Normal</div><div class="val avg" id="avg">24</div>
      </div>
      <div class="card">
        <div class="type">Fast</div><div class="val fast" id="fast">28</div>
      </div>
    </div>
  </div>
  <script>
    setInterval(() => {
      const base = Math.floor(Math.random() * 20) + 15;
      document.getElementById('main').innerText = (base+2) + ' Gwei';
      document.getElementById('slow').innerText = base;
      document.getElementById('avg').innerText = base+2;
      document.getElementById('fast').innerText = base+6;
    }, 2000);
  <\/script>
</body>
</html>`
  },
  {
    icon: '📊', name: 'Crypto Portfolio', desc: 'Decentralized asset tracking UI.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Portfolio</title>
  <style>
    body { background: #111827; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: sans-serif; margin: 0; }
    .app { background: #1f2937; border-radius: 24px; padding: 30px; width: 320px; color: white; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
    .balance-title { color: #9ca3af; font-size: 14px; margin-bottom: 5px; text-align: center; }
    .balance { font-size: 40px; font-weight: bold; text-align: center; margin-bottom: 30px; }
    .asset { display: flex; align-items: center; justify-content: space-between; background: #374151; padding: 15px; border-radius: 16px; margin-bottom: 10px; }
    .asset-info { display: flex; align-items: center; gap: 10px; }
    .icon { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 20px; }
    .eth { background: #627eea; color: white; }
    .sol { background: #14f195; color: black; }
    .usdc { background: #2775ca; color: white; }
    .name { font-weight: bold; font-size: 16px; margin-bottom: 2px; }
    .amt { color: #9ca3af; font-size: 12px; }
    .value { font-weight: bold; text-align: right; }
    .change { font-size: 12px; color: #10b981; }
  </style>
</head>
<body>
  <div class="app">
    <div class="balance-title">Total Balance</div>
    <div class="balance">$12,450.80</div>
    
    <div class="asset">
      <div class="asset-info">
        <div class="icon eth">Ξ</div>
        <div><div class="name">Ethereum</div><div class="amt">2.5 ETH</div></div>
      </div>
      <div>
        <div class="value">$8,050.00</div><div class="change">+5.2%</div>
      </div>
    </div>
    
    <div class="asset">
      <div class="asset-info">
        <div class="icon sol">S</div>
        <div><div class="name">Solana</div><div class="amt">145 SOL</div></div>
      </div>
      <div>
        <div class="value">$3,400.80</div><div class="change">+12.4%</div>
      </div>
    </div>

    <div class="asset">
      <div class="asset-info">
        <div class="icon usdc">$</div>
        <div><div class="name">USDC</div><div class="amt">1000 USDC</div></div>
      </div>
      <div>
        <div class="value">$1,000.00</div><div class="change" style="color:#6b7280">0.0%</div>
      </div>
    </div>
  </div>
</body>
</html>`
  },
  {
    icon: '⚖️', name: 'DAO Voting', desc: 'Decentralized autonomous org voting UI.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>DAO Vote</title>
  <style>
    body { background: #0f172a; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: sans-serif; margin: 0; }
    .vote-card { background: #1e293b; border-radius: 20px; padding: 30px; width: 350px; border: 1px solid #334155; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .tag { background: rgba(59,130,246,0.2); color: #3b82f6; padding: 5px 10px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-bottom: 15px; display: inline-block; }
    h2 { color: white; font-size: 20px; margin: 0 0 10px; line-height: 1.4; }
    p { color: #94a3b8; font-size: 14px; margin: 0 0 30px; }
    .option { background: #0f172a; border: 1px solid #334155; border-radius: 12px; padding: 15px; margin-bottom: 10px; cursor: pointer; color: white; font-weight: bold; display: flex; justify-content: space-between; transition: 0.2s; }
    .option:hover { border-color: #3b82f6; }
    .bar { height: 4px; background: #3b82f6; border-radius: 2px; margin-top: 10px; width: 0%; transition: 1s; }
  </style>
</head>
<body>
  <div class="vote-card">
    <div class="tag">Active Proposal</div>
    <h2>SIP-42: Increase Staking Rewards by 5%</h2>
    <p>Voting ends in 2 days. 1 Token = 1 Vote.</p>
    
    <div class="option" onclick="vote(this, 75)">
      <div>👍 Approve</div> <span class="perc"></span>
      <div class="bar" style="display:none"></div>
    </div>
    
    <div class="option" onclick="vote(this, 25)">
      <div>👎 Reject</div> <span class="perc"></span>
      <div class="bar" style="display:none; background:#ef4444;"></div>
    </div>
  </div>
  <script>
    let voted = false;
    function vote(el, val) {
      if(voted) return; voted = true;
      el.style.borderColor = '#10b981';
      document.querySelectorAll('.option').forEach(opt => {
        opt.style.display = 'block';
        const bar = opt.querySelector('.bar');
        bar.style.display = 'block';
        setTimeout(() => {
          if(opt === el) bar.style.width = val + '%';
          else bar.style.width = (100-val) + '%';
          opt.querySelector('.perc').innerText = (opt === el ? val : 100-val) + '%';
        }, 100);
      });
    }
  <\/script>
</body>
</html>`
  }
];

const AI_LAB = [
  { 
    icon: '🎙️', name: 'Voice Assistant UI', desc: 'Pulsing AI voice wave animation.', 
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>AI Voice</title>
  <style>
    body { background: #0f172a; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: sans-serif; }
    .ai-box { text-align: center; }
    h2 { color: white; font-weight: 300; letter-spacing: 2px; margin-bottom: 40px; }
    .waves { display: flex; justify-content: center; align-items: center; gap: 8px; height: 100px; }
    .bar { width: 8px; border-radius: 4px; background: linear-gradient(180deg, #38bdf8, #818cf8, #c084fc); animation: pulse 1s ease-in-out infinite alternate; }
    .bar:nth-child(1) { height: 20px; animation-delay: 0.1s; }
    .bar:nth-child(2) { height: 50px; animation-delay: 0.3s; }
    .bar:nth-child(3) { height: 90px; animation-delay: 0.5s; }
    .bar:nth-child(4) { height: 40px; animation-delay: 0.2s; }
    .bar:nth-child(5) { height: 60px; animation-delay: 0.4s; }
    .bar:nth-child(6) { height: 30px; animation-delay: 0.1s; }
    @keyframes pulse { 0% { transform: scaleY(0.3); } 100% { transform: scaleY(1); } }
  </style>
</head>
<body>
  <div class="ai-box">
    <h2>LISTENING...</h2>
    <div class="waves">
      <div class="bar"></div><div class="bar"></div><div class="bar"></div>
      <div class="bar"></div><div class="bar"></div><div class="bar"></div>
    </div>
  </div>
</body>
</html>` 
  },
  { 
    icon: '💬', name: 'Neural Chat UI', desc: 'Modern GPT-style conversational interface.', 
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>AI Chat</title>
  <style>
    body { background: #343541; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: sans-serif; }
    .chat { width: 400px; height: 500px; background: #343541; border: 1px solid #565869; border-radius: 12px; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .msgs { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 15px; }
    .msg { display: flex; gap: 15px; color: #d1d5db; font-size: 15px; line-height: 1.5; }
    .msg.ai { background: #444654; padding: 15px; border-radius: 8px; margin: -15px -20px; padding: 20px; }
    .avatar { width: 30px; height: 30px; border-radius: 4px; display: flex; justify-content: center; align-items: center; font-size: 18px; flex-shrink: 0; }
    .user-av { background: #10a37f; color: white; }
    .ai-av { background: #facc15; }
    .input-area { padding: 20px; background: #343541; }
    .input-box { background: #40414f; border-radius: 8px; display: flex; padding: 12px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
    input { flex: 1; background: transparent; border: none; color: white; outline: none; font-size: 15px; }
    .type-indicator { display: flex; gap: 4px; margin-top: 10px; }
    .dot { width: 6px; height: 6px; background: #d1d5db; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out both; }
    .dot:nth-child(1) { animation-delay: -0.32s; }
    .dot:nth-child(2) { animation-delay: -0.16s; }
    @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
  </style>
</head>
<body>
  <div class="chat">
    <div class="msgs">
      <div class="msg">
        <div class="avatar user-av">U</div>
        <div>Can you write a viral React component?</div>
      </div>
      <div class="msg ai">
        <div class="avatar ai-av">🤖</div>
        <div>
          Absolutely! Here is a highly optimized, aesthetic React component...
          <div class="type-indicator"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>
        </div>
      </div>
    </div>
    <div class="input-area">
      <div class="input-box"><input type="text" placeholder="Send a message..."></div>
    </div>
  </div>
</body>
</html>` 
  },
  { 
    icon: '🎨', name: 'AI Image Generator', desc: 'Mockup of a diffusion image generation tool.', 
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>AI Image</title>
  <style>
    body { background: #18181b; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: sans-serif; }
    .generator { width: 360px; background: #27272a; border-radius: 16px; padding: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.4); border: 1px solid #3f3f46; }
    .prompt { background: #18181b; padding: 12px; border-radius: 8px; color: #a1a1aa; font-size: 13px; font-style: italic; margin-bottom: 20px; border: 1px solid #3f3f46; }
    .image-box { width: 100%; height: 260px; background: #18181b; border-radius: 12px; display: flex; justify-content: center; align-items: center; position: relative; overflow: hidden; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; width: 100%; height: 100%; opacity: 0.2; }
    .grid div { background: #3f3f46; }
    .loader { position: absolute; display: flex; flex-direction: column; align-items: center; }
    .spinner { width: 40px; height: 40px; border: 4px solid #3f3f46; border-top-color: #8b5cf6; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 10px; }
    .percent { color: #8b5cf6; font-weight: bold; font-size: 20px; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .btn { background: #8b5cf6; color: white; width: 100%; padding: 12px; border: none; border-radius: 8px; margin-top: 20px; font-weight: bold; cursor: pointer; }
  </style>
</head>
<body>
  <div class="generator">
    <div class="prompt">"A futuristic cyberpunk city with neon lights, unreal engine 5, 8k resolution --v 5.2"</div>
    <div class="image-box">
      <div class="grid"><div></div><div></div><div></div><div></div></div>
      <div class="loader">
        <div class="spinner"></div>
        <div class="percent" id="perc">0%</div>
      </div>
    </div>
    <button class="btn">Generating...</button>
  </div>
  <script>
    let p = 0;
    const interval = setInterval(() => {
      p += Math.floor(Math.random() * 10);
      if(p > 99) p = 99;
      document.getElementById('perc').innerText = p + '%';
    }, 300);
  <\/script>
</body>
</html>` 
  },
  { 
    icon: '👁️', name: 'Biometric Scanner', desc: 'Cyberpunk face scanning UI.', 
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Scanner</title>
  <style>
    body { background: #000; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: 'Courier New', monospace; }
    .scanner { width: 300px; height: 400px; border: 2px solid #0ea5e9; position: relative; overflow: hidden; background: url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop') center/cover; }
    .scanner::before { content:''; position:absolute; width:100%; height:100%; background: rgba(14,165,233,0.2); z-index:1; }
    .line { position: absolute; width: 100%; height: 2px; background: #0ea5e9; box-shadow: 0 0 10px #0ea5e9, 0 0 20px #0ea5e9; animation: scan 3s linear infinite; z-index: 2; }
    .box { position: absolute; border: 2px solid #38bdf8; width: 120px; height: 120px; top: 120px; left: 90px; z-index: 2; }
    .box::after, .box::before { content:''; position:absolute; width:10px; height:10px; }
    .box::before { top:-2px; left:-2px; border-top:2px solid #fff; border-left:2px solid #fff; }
    .box::after { bottom:-2px; right:-2px; border-bottom:2px solid #fff; border-right:2px solid #fff; }
    .data { position: absolute; bottom: 20px; left: 20px; color: #38bdf8; font-size: 14px; z-index: 3; text-shadow: 0 0 5px #0ea5e9; }
    @keyframes scan { 0% { top: 0; } 50% { top: 100%; } 100% { top: 0; } }
  </style>
</head>
<body>
  <div class="scanner">
    <div class="line"></div>
    <div class="box"></div>
    <div class="data">
      > MATCH FOUND<br>
      > ID: 409-B<br>
      > STATUS: ACTIVE
    </div>
  </div>
</body>
</html>` 
  },
  { 
    icon: '🧠', name: 'Neural Core', desc: 'Interactive Neural Network visualizer.', 
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Neural</title>
  <style>
    body { background: #000; margin: 0; overflow: hidden; }
    canvas { display: block; }
  </style>
</head>
<body>
  <canvas id="canvas"></canvas>
  <script>
    const cvs = document.getElementById('canvas');
    const ctx = cvs.getContext('2d');
    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight;

    let nodes = [];
    for(let i=0; i<80; i++) {
      nodes.push({
        x: Math.random() * cvs.width,
        y: Math.random() * cvs.height,
        vx: (Math.random()-0.5)*2,
        vy: (Math.random()-0.5)*2
      });
    }

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      for(let i=0; i<nodes.length; i++) {
        let n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if(n.x < 0 || n.x > cvs.width) n.vx *= -1;
        if(n.y < 0 || n.y > cvs.height) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI*2);
        ctx.fillStyle = '#10b981';
        ctx.fill();

        for(let j=i+1; j<nodes.length; j++) {
          let n2 = nodes[j];
          let dist = Math.hypot(n.x - n2.x, n.y - n2.y);
          if(dist < 100) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = \`rgba(16, 185, 129, \${1 - dist/100})\`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
  <\/script>
</body>
</html>` 
  }
];
const MOBILE_OS = [
  { 
    icon: '📱', name: 'iOS 17 Lock Screen', desc: 'iPhone replica with glassmorphism notifications.', 
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>iOS Lock Screen</title>
  <style>
    body { background: #1a1a1a; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    .phone { width: 320px; height: 650px; background: url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop') center/cover; border-radius: 40px; border: 10px solid #000; position: relative; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
    .notch { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 120px; height: 30px; background: #000; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; }
    .time { text-align: center; margin-top: 60px; color: white; font-weight: 200; }
    .time h1 { font-size: 70px; margin: 0; letter-spacing: -2px; text-shadow: 0 2px 10px rgba(0,0,0,0.2); }
    .time p { margin: 0; font-size: 16px; font-weight: 500; }
    .notifications { position: absolute; bottom: 50px; width: 100%; display: flex; flex-direction: column; align-items: center; gap: 10px; }
    .notif { width: 85%; background: rgba(255,255,255,0.2); backdrop-filter: blur(15px); padding: 15px; border-radius: 20px; color: white; animation: slideUp 0.5s ease-out; border: 1px solid rgba(255,255,255,0.1); }
    .notif h4 { margin: 0 0 5px; font-size: 14px; display: flex; justify-content: space-between; }
    .notif p { margin: 0; font-size: 14px; opacity: 0.9; }
    @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  </style>
</head>
<body>
  <div class="phone">
    <div class="notch"></div>
    <div class="time">
      <p>Wednesday, October 18</p>
      <h1>09:41</h1>
    </div>
    <div class="notifications">
      <div class="notif">
        <h4><span>💬 Messages</span> <span style="opacity:0.5">now</span></h4>
        <p>You: "This IDE is amazing! 🔥"</p>
      </div>
      <div class="notif" style="animation-delay: 0.2s">
        <h4><span>📸 Instagram</span> <span style="opacity:0.5">2m ago</span></h4>
        <p>Someone liked your reel.</p>
      </div>
    </div>
  </div>
</body>
</html>` 
  }
];
const FINTECH = [
  { 
    icon: '💳', name: '3D Platinum Card', desc: 'Hover to flip holographic bank card.', 
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>3D Card</title>
  <style>
    body { background: #0f172a; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: sans-serif; perspective: 1000px; }
    .card-container { width: 350px; height: 220px; position: relative; transition: transform 0.8s; transform-style: preserve-3d; cursor: pointer; }
    .card-container:hover { transform: rotateY(180deg); }
    .card-face { position: absolute; width: 100%; height: 100%; border-radius: 20px; backface-visibility: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5); padding: 25px; box-sizing: border-box; color: white; display: flex; flex-direction: column; justify-content: space-between; }
    .front { background: linear-gradient(135deg, #1e293b, #0f172a); border: 1px solid rgba(255,255,255,0.1); }
    .front::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%); border-radius: 20px; }
    .back { background: #0f172a; transform: rotateY(180deg); border: 1px solid rgba(255,255,255,0.1); padding: 0; }
    .chip { width: 50px; height: 35px; background: linear-gradient(135deg, #fbbf24, #d97706); border-radius: 8px; margin-bottom: 20px; position: relative; z-index: 2; }
    .number { font-size: 24px; letter-spacing: 4px; font-family: 'Courier New', monospace; text-shadow: 0 2px 4px rgba(0,0,0,0.5); z-index: 2; position: relative; }
    .details { display: flex; justify-content: space-between; z-index: 2; position: relative; text-transform: uppercase; letter-spacing: 1px; font-size: 14px; }
    .stripe { background: #000; height: 40px; width: 100%; margin-top: 30px; }
    .cvv { background: white; color: black; margin: 20px; padding: 10px; text-align: right; font-style: italic; font-weight: bold; }
  </style>
</head>
<body>
  <div class="card-container">
    <div class="card-face front">
      <div style="text-align:right; font-weight:bold; font-size:18px; z-index:2; position:relative;">PLATINUM</div>
      <div class="chip"></div>
      <div class="number">4000 1234 5678 9010</div>
      <div class="details">
        <span>Alexandru Dev</span>
        <span>12/28</span>
      </div>
    </div>
    <div class="card-face back">
      <div class="stripe"></div>
      <div class="cvv">123</div>
      <div style="padding: 20px; font-size:10px; color:#64748b; text-align:center;">This card is property of IA Architecte. Found cards must be returned to the nearest branch.</div>
    </div>
  </div>
</body>
</html>` 
  }
];


// =======================
// Core Engine
// =======================
let isPremiumTyping = false;
function injectPremiumCode(code, cinematic, statusEl) {
  if (!window.editor) return;
  
  if (!cinematic) {
    window.editor.setValue(code);
    if (window.runPreview) window.runPreview();
    if(statusEl) {
      statusEl.textContent = '✅ Injected!';
      setTimeout(() => statusEl.textContent = '', 2000);
    }
    return;
  }

  // Cinematic Typing
  if (isPremiumTyping) return;
  isPremiumTyping = true;
  var lines = code.split('\n');
  var currentCode = '';
  var index = 0;
  
  if(statusEl) statusEl.textContent = '🤖 AI is writing code...';
  
  function typeNextLine() {
    if (index < lines.length) {
      currentCode += lines[index] + (index === lines.length - 1 ? '' : '\n');
      window.editor.setValue(currentCode);
      
      try {
         var lineCount = window.editor.getModel().getLineCount();
         window.editor.revealLine(lineCount);
      } catch(e){}
      
      index++;
      var delay = 80;
      if (lines[index-1]) {
         if (lines[index-1].length > 40) delay = 150;
         if (lines[index-1].trim() === '') delay = 20;
      }
      
      setTimeout(typeNextLine, delay);
    } else {
      if (window.runPreview) window.runPreview();
      if(statusEl) {
        statusEl.textContent = '✅ Generated!';
        setTimeout(() => statusEl.textContent = '', 2000);
      }
      isPremiumTyping = false;
    }
  }
  
  typeNextLine();
}

function renderPremiumGenericTab(dataArray, title, subtitle, colorPrimary, colorSecondary) {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  
  var wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';
  
  var hdr = document.createElement('div');
  hdr.style.cssText = `padding:12px 14px 8px;border-bottom:1px solid rgba(${colorPrimary},0.25);flex-shrink:0;`;
  hdr.innerHTML = `<div style="font-size:15px;font-weight:900;color:rgb(${colorPrimary});">${title}</div><div style="font-size:11px;color:#94a3b8;margin-top:2px;line-height:1.4;">${subtitle}</div>`;
  wrap.appendChild(hdr);
  
  var body = document.createElement('div');
  body.style.cssText = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';
  
  var statusEl = document.createElement('div');
  statusEl.style.cssText = 'font-size:11px;color:#4ade80;min-height:14px;text-align:center;font-weight:bold;margin-bottom:5px;';
  body.appendChild(statusEl);

  dataArray.forEach(function (item) {
    var card = document.createElement('div');
    card.style.cssText = 'background:#1e293b;border:1px solid #334155;border-radius:12px;padding:15px;display:flex;align-items:center;gap:12px;transition:all 0.2s;';
    card.onmouseenter = function() { card.style.borderColor = `rgb(${colorPrimary})`; card.style.transform = 'translateY(-2px)'; };
    card.onmouseleave = function() { card.style.borderColor = '#334155'; card.style.transform = 'translateY(0)'; };

    var iconBox = document.createElement('div');
    iconBox.style.cssText = `font-size:24px;width:40px;height:40px;background:rgba(${colorPrimary},0.1);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;`;
    iconBox.textContent = item.icon;
    
    var info = document.createElement('div');
    info.style.cssText = 'flex:1;min-width:0;';
    info.innerHTML = `<div style="font-size:13px;font-weight:800;color:#e2e8f0;margin-bottom:4px;">${item.name}</div><div style="font-size:10px;color:#94a3b8;line-height:1.3;">${item.desc}</div>`;

    var actions = document.createElement('div');
    actions.style.cssText = 'display:flex;gap:5px;flex-shrink:0;';

    var btnType = document.createElement('button');
    btnType.innerHTML = '🎬';
    btnType.title = "Cinematic Generate";
    btnType.style.cssText = `background:linear-gradient(135deg,rgb(${colorSecondary}),rgb(${colorPrimary}));border:none;width:32px;height:32px;border-radius:6px;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;`;
    btnType.onclick = function() { injectPremiumCode(item.code, true, statusEl); };

    var btn = document.createElement('button');
    btn.textContent = '⚡';
    btn.title = "Instant Generate";
    btn.style.cssText = `background:linear-gradient(135deg,rgb(${colorPrimary}),rgb(${colorSecondary}));border:none;width:32px;height:32px;border-radius:6px;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;`;
    btn.onclick = function() { injectPremiumCode(item.code, false, statusEl); };

    actions.appendChild(btnType);
    actions.appendChild(btn);

    card.appendChild(iconBox);
    card.appendChild(info);
    card.appendChild(actions);
    body.appendChild(card);
  });

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function () {
  // Translate tabs
  const origApplyLang = window.applyLang;
  window.applyLang = function() {
    if (typeof origApplyLang === 'function') origApplyLang();
    // Labels are already set in HTML, just re-render active if needed
    if(window.activeTab === 'uiblocks') window.renderTab('uiblocks');
    if(window.activeTab === 'motionfx') window.renderTab('motionfx');
    if(window.activeTab === 'dataviz') window.renderTab('dataviz');
    if(window.activeTab === 'web3ui') window.renderTab('web3ui');
    if(window.activeTab === 'ailab') window.renderTab('ailab');
    if(window.activeTab === 'mobileos') window.renderTab('mobileos');
    if(window.activeTab === 'fintech') window.renderTab('fintech');
  };

  // Intercept renderTab
  const origRenderTab = window.renderTab;
  window.renderTab = function(tab) {
    const customTabs = ['uiblocks', 'motionfx', 'dataviz', 'web3ui', 'ailab', 'mobileos', 'fintech'];
    if (customTabs.includes(tab)) {
      window.activeTab = tab;
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const tBtn = document.getElementById('tab-' + tab);
      if (tBtn) tBtn.classList.add('active');
      
      const l = window.lang || 'en';
      
      if (tab === 'uiblocks') {
        renderPremiumGenericTab(UI_BLOCKS, '🧩 UI Blocks', 
          l==='fr' ? "Générez des composants d'interface modernes." : 'Generate modern UI components like Lego blocks.', 
          '129, 140, 248', '99, 102, 241'); // Indigo
      }
      if (tab === 'motionfx') {
        renderPremiumGenericTab(MOTION_FX, '🪄 Motion FX', 
          l==='fr' ? "Laboratoire d'animations CSS et JavaScript." : 'CSS & JavaScript animation laboratory.', 
          '244, 114, 182', '236, 72, 153'); // Pink
      }
      if (tab === 'dataviz') {
        renderPremiumGenericTab(DATA_VIZ, '📊 DataViz', 
          l==='fr' ? 'Générateur de graphiques HTML Canvas.' : 'HTML Canvas chart and dashboard generator.', 
          '56, 189, 248', '14, 165, 233'); // Sky
      }
      if (tab === 'web3ui') {
        renderPremiumGenericTab(WEB3_UI, '🧬 Web3 Crypto', 
          l==='fr' ? 'Interfaces décentralisées et Crypto.' : 'Decentralized interfaces and Crypto wallets.', 
          '251, 191, 36', '245, 158, 11'); // Amber
      }
      if (tab === 'ailab') {
        renderPremiumGenericTab(AI_LAB, '🤖 AI Lab', 
          l==='fr' ? "Interfaces d'Intelligence Artificielle." : 'Artificial Intelligence UI interfaces.', 
          '52, 211, 153', '16, 185, 129'); // Emerald
      }

      if (tab === 'mobileos') {
        renderPremiumGenericTab(MOBILE_OS, '📱 Mobile Clones', 
          l==='fr' ? "Répliques d'interfaces mobiles." : 'Mobile OS interface replicas.', 
          '56, 189, 248', '14, 165, 233'); // Sky
      }
      if (tab === 'fintech') {
        renderPremiumGenericTab(FINTECH, '💳 FinTech & Banking', 
          l==='fr' ? 'Applications financières et bancaires.' : 'Financial and banking applications.', 
          '251, 191, 36', '245, 158, 11'); // Amber
      }
      return;
    }
    
    if (typeof origRenderTab === 'function') origRenderTab(tab);
  };
});

})();
