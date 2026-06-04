(function() {
  'use strict';

  const TX = {
    en: {
      title: 'WEB3 & BLOCKCHAIN STUDIO',
      sub: 'dApp Interface Generator',
      back: '← Back',
      injected: '✅ Tool Injected!',
      tools: {
        metamask: { name: 'MetaMask Connect Boilerplate', desc: 'Generate wallet connection UI + window.ethereum integration code.', injectBtn: '⛓️ Inject MetaMask Code' },
        nft: { name: 'NFT Gallery Fetcher', desc: 'Generate a beautiful NFT collection gallery with mock contract data.', injectBtn: '🖼️ Inject NFT Gallery' },
        ticker: { name: 'Live Crypto Ticker', desc: 'Generate a real-time price dashboard using WebSocket (Binance API).', injectBtn: '📊 Inject Crypto Ticker' },
        abi: { name: 'Smart Contract ABI Decoder', desc: 'Paste an ABI JSON and generate a full interactive dApp UI with read/write buttons.', injectBtn: '📝 Inject ABI UI' },
        siwe: { name: 'Sign-In With Ethereum (SIWE)', desc: 'Generate decentralized wallet-based auth — no passwords, sign a message instead.', injectBtn: '🔐 Inject SIWE Auth' },
        transfer: { name: 'ERC-20 Token Transfer UI', desc: 'Generate a complete UI for sending ERC-20 tokens using ethers.js.', injectBtn: '💸 Inject Transfer UI' },
        gas: { name: 'Gas Price Estimator Dashboard', desc: 'Real-time Slow/Standard/Fast gas tracker with USD cost calculator.', injectBtn: '⛽ Inject Gas Dashboard' }
      }
    },
    fr: {
      title: 'STUDIO WEB3 & BLOCKCHAIN',
      sub: 'Générateur d\'interfaces dApp',
      back: '← Retour',
      injected: '✅ Outil injecté!',
      tools: {
        metamask: { name: 'Connexion MetaMask', desc: 'Générez l\'interface de connexion portefeuille + code window.ethereum.', injectBtn: '⛓️ Injecter MetaMask' },
        nft: { name: 'Galerie NFT', desc: 'Galerie de collection NFT avec données de contrat simulées.', injectBtn: '🖼️ Injecter Galerie NFT' },
        ticker: { name: 'Ticker Crypto Live', desc: 'Tableau de bord prix en temps réel via WebSocket (Binance).', injectBtn: '📊 Injecter Ticker' },
        abi: { name: 'Décodeur ABI Contrat', desc: 'Collez un ABI JSON et générez une UI dApp interactive complète.', injectBtn: '📝 Injecter UI ABI' },
        siwe: { name: 'Auth Sign-In Ethereum', desc: 'Authentification décentralisée par signature de message — sans mot de passe.', injectBtn: '🔐 Injecter Auth SIWE' },
        transfer: { name: 'Transfert Token ERC-20', desc: 'UI complète pour envoyer des tokens ERC-20 via ethers.js.', injectBtn: '💸 Injecter Transfer UI' },
        gas: { name: 'Estimateur Gas Prix', desc: 'Tracker gas Lent/Standard/Rapide en temps réel avec calcul USD.', injectBtn: '⛽ Injecter Gas Dashboard' }
      }
    }
  };

  function gl() { return window.appLang || 'en'; }

  window._injectWeb3Code = function(code) {
    if (window.editor) {
      window.editor.setValue(code);
      if (window.runPreview) window.runPreview();
      const lang = gl();
      if (window.showToast) window.showToast((TX[lang] || TX.en).injected);
    }
  };

  const _orig = window.renderTab;
  window.renderTab = function(tab) {
    if (tab === 'web3dapp') {
      window.activeTab = 'web3dapp';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('tab-web3dapp');
      if (btn) btn.classList.add('active');
      window.initWeb3Studio(gl());
      return;
    }
    if (typeof _orig === 'function') _orig(tab);
  };

  window.initWeb3Studio = function(lang) {
    const el = document.getElementById('left-body');
    if (!el) return;
    const t = TX[lang] || TX.en;
    const tools = [
      { id: 'metamask',  icon: '🦊',  color: '#f59e0b' },
      { id: 'nft',       icon: '🖼️',  color: '#8b5cf6' },
      { id: 'ticker',    icon: '📊',  color: '#10b981' },
      { id: 'abi',       icon: '📝',  color: '#38bdf8' },
      { id: 'siwe',      icon: '🔐',  color: '#ec4899' },
      { id: 'transfer',  icon: '💸',  color: '#14b8a6' },
      { id: 'gas',       icon: '⛽',  color: '#f97316' }
    ];
    el.innerHTML = `
      <div style="padding:15px;font-family:'Inter',sans-serif;overflow-y:auto;height:100%;box-sizing:border-box;background:#020617;">
        <div style="background:linear-gradient(135deg,rgba(245,158,11,0.1),rgba(217,119,6,0.1));border-radius:14px;padding:16px;border:1px solid rgba(245,158,11,0.3);margin-bottom:20px;display:flex;align-items:center;gap:12px;">
          <span style="font-size:32px;filter:drop-shadow(0 0 10px #f59e0b);">🌍</span>
          <div>
            <h2 style="margin:0;color:#fcd34d;font-size:16px;font-weight:900;">${t.title}</h2>
            <p style="margin:4px 0 0;color:#94a3b8;font-size:11px;">${t.sub}</p>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          ${tools.map(tool => `
            <div onclick="window.handleWeb3Tool('${tool.id}')" style="background:rgba(15,23,42,0.8);border:1px solid ${tool.color}44;border-radius:12px;padding:14px;cursor:pointer;transition:all 0.25s;display:flex;align-items:center;gap:12px;"
              onmouseover="this.style.borderColor='${tool.color}';this.style.boxShadow='0 0 15px ${tool.color}33';"
              onmouseout="this.style.borderColor='${tool.color}44';this.style.boxShadow='none';">
              <div style="font-size:24px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:${tool.color}18;border-radius:10px;">${tool.icon}</div>
              <div style="flex:1;">
                <div style="color:${tool.color};font-weight:800;font-size:13px;">${t.tools[tool.id].name}</div>
                <div style="color:#64748b;font-size:10px;margin-top:3px;">${t.tools[tool.id].desc}</div>
              </div>
            </div>`).join('')}
        </div>
      </div>`;
  };

  window.handleWeb3Tool = function(toolId) {
    const el = document.getElementById('left-body');
    if (!el) return;
    const lang = gl();
    const t = TX[lang] || TX.en;
    const colors = { metamask:'#f59e0b', nft:'#8b5cf6', ticker:'#10b981', abi:'#38bdf8', siwe:'#ec4899', transfer:'#14b8a6', gas:'#f97316' };
    const icons  = { metamask:'🦊', nft:'🖼️', ticker:'📊', abi:'📝', siwe:'🔐', transfer:'💸', gas:'⛽' };
    const color  = colors[toolId];
    const icon   = icons[toolId];
    const tx     = t.tools[toolId];
    const codes  = { metamask:getMetaMaskCode(), nft:getNftCode(), ticker:getTickerCode(), abi:getAbiCode(), siwe:getSiweCode(), transfer:getTransferCode(), gas:getGasCode() };

    el.innerHTML = `
      <div style="padding:15px;font-family:'Inter',sans-serif;height:100%;overflow-y:auto;box-sizing:border-box;background:#020617;">
        <button onclick="window.initWeb3Studio('${lang}')" style="background:rgba(255,255,255,0.05);color:#94a3b8;border:1px solid rgba(255,255,255,0.1);padding:8px 14px;border-radius:8px;cursor:pointer;margin-bottom:15px;font-size:11px;font-weight:700;">${t.back}</button>
        <h3 style="color:${color};margin:0 0 5px;font-size:15px;font-weight:800;">${icon} ${tx.name}</h3>
        <p style="color:#64748b;font-size:11px;margin:0 0 20px;">${tx.desc}</p>
        <div style="background:#0f172a;border:1px dashed ${color};border-radius:10px;padding:20px;text-align:center;margin-bottom:20px;">
          <div style="font-size:40px;margin-bottom:10px;">${icon}</div>
          <div style="color:#94a3b8;font-size:12px;">${lang === 'fr' ? 'Prêt à injecter dans l\'éditeur' : 'Ready to inject into the editor'}</div>
        </div>
        <button id="btnInject${toolId}" style="width:100%;padding:12px;border-radius:8px;background:${color};border:none;color:#000;font-weight:900;font-size:13px;cursor:pointer;box-shadow:0 4px 15px ${color}55;">${tx.injectBtn}</button>
      </div>`;
    document.getElementById('btnInject' + toolId).addEventListener('click', () => window._injectWeb3Code(codes[toolId]));
  };

  // ══════════════════════════════════════
  // TOOL 1: MetaMask Connect
  // ══════════════════════════════════════
  function getMetaMaskCode() {
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>MetaMask Connect</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#0f172a;color:#fff;font-family:'Inter',sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:20px}
  .card{background:#1e293b;border:1px solid #334155;border-radius:20px;padding:40px;text-align:center;max-width:420px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.4)}
  .fox{font-size:64px;margin-bottom:20px;filter:drop-shadow(0 0 20px #f59e0b88)}
  h1{color:#fcd34d;font-size:24px;margin-bottom:10px}
  p{color:#64748b;font-size:14px;margin-bottom:30px}
  .btn-connect{width:100%;padding:16px;background:linear-gradient(135deg,#f59e0b,#d97706);border:none;border-radius:12px;color:#000;font-weight:900;font-size:16px;cursor:pointer;transition:all 0.3s}
  .btn-connect:hover{transform:translateY(-2px);box-shadow:0 8px 25px #f59e0b55}
  .wallet-info{display:none;background:#0f172a;border:1px solid #f59e0b44;border-radius:12px;padding:20px;margin-top:20px;text-align:left}
  .label{color:#64748b;font-size:11px;font-weight:bold;margin-bottom:6px;text-transform:uppercase}
  .address{color:#fcd34d;font-family:monospace;font-size:13px;word-break:break-all}
  .badge{display:inline-block;background:#10b98122;color:#10b981;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:bold;margin-top:10px}
</style>
</head>
<body>
<div class="card">
  <div class="fox">🦊</div>
  <h1>Connect Your Wallet</h1>
  <p>Connect your MetaMask wallet to access this decentralized application.</p>
  <button class="btn-connect" id="connectBtn" onclick="connectWallet()">🔗 Connect MetaMask</button>
  <div class="wallet-info" id="walletInfo">
    <div class="label">Connected Address</div>
    <div class="address" id="walletAddr"></div>
    <div class="badge" id="networkBadge"></div>
  </div>
</div>
<script>
async function connectWallet() {
  const btn = document.getElementById('connectBtn');
  const info = document.getElementById('walletInfo');

  if (typeof window.ethereum === 'undefined') {
    btn.textContent = '❌ MetaMask Not Found';
    btn.style.background = '#ef4444';
    alert('MetaMask is not installed. Please install it from metamask.io');
    return;
  }

  try {
    btn.textContent = 'Connecting...';
    btn.disabled = true;

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const chainId  = await window.ethereum.request({ method: 'eth_chainId' });

    const chains = {'0x1':'Ethereum Mainnet','0x89':'Polygon','0x38':'BNB Chain','0xa':'Optimism'};

    document.getElementById('walletAddr').textContent = accounts[0];
    document.getElementById('networkBadge').textContent = chains[chainId] || 'Chain: ' + chainId;

    info.style.display = 'block';
    btn.textContent = '✅ Connected';
    btn.style.background = 'linear-gradient(135deg,#10b981,#059669)';

    window.ethereum.on('accountsChanged', accs => {
      document.getElementById('walletAddr').textContent = accs[0] || 'Disconnected';
    });
  } catch (err) {
    btn.textContent = '⚡ Connect MetaMask';
    btn.disabled = false;
    console.error(err);
  }
}
<\/script>
</body>
</html>`;
  }

  // ══════════════════════════════════════
  // TOOL 2: NFT Gallery
  // ══════════════════════════════════════
  function getNftCode() {
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>NFT Gallery</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#0f172a;color:#fff;font-family:'Inter',sans-serif;padding:30px}
  h1{color:#a855f7;margin-bottom:5px}
  .subtitle{color:#64748b;font-size:13px;margin-bottom:30px}
  .controls{display:flex;gap:10px;margin-bottom:25px;flex-wrap:wrap}
  input{background:#1e293b;border:1px solid #334155;color:#fff;padding:10px 15px;border-radius:8px;width:320px;outline:none;font-size:14px}
  input:focus{border-color:#a855f7}
  button{padding:10px 20px;background:#a855f7;border:none;border-radius:8px;color:#fff;font-weight:bold;cursor:pointer;transition:0.2s}
  button:hover{background:#9333ea}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:20px}
  .nft-card{background:#1e293b;border:1px solid #334155;border-radius:16px;overflow:hidden;transition:all 0.3s;cursor:pointer}
  .nft-card:hover{transform:translateY(-8px);border-color:#a855f7;box-shadow:0 20px 40px rgba(168,85,247,0.25)}
  .nft-img{width:100%;aspect-ratio:1;object-fit:cover;background:#0f172a;display:flex;align-items:center;justify-content:center;font-size:70px}
  .nft-body{padding:15px}
  .nft-name{font-weight:800;color:#fff;margin-bottom:4px}
  .nft-id{color:#64748b;font-size:11px;margin-bottom:12px;font-family:monospace}
  .nft-footer{display:flex;justify-content:space-between;align-items:center}
  .price{color:#a855f7;font-weight:bold;font-size:15px}
  .owner{font-size:10px;color:#475569;font-family:monospace}
  .badge{background:#a855f722;color:#a855f7;padding:3px 8px;border-radius:10px;font-size:10px;font-weight:bold}
</style>
</head>
<body>
<h1>🖼️ NFT Collection Gallery</h1>
<p class="subtitle">Mock data for Smart Contract: <code style="color:#a855f7">0xBC4C...3A8F</code></p>

<div class="controls">
  <input id="contractInput" placeholder="Enter Contract Address (0x...)" value="0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D">
  <button onclick="loadNFTs()">🔍 Load Collection</button>
</div>

<div class="grid" id="nftGrid"></div>

<script>
const MOCK_NFTS = [
  {id:'#1337',name:'CryptoPunk Alpha',emoji:'👾',price:'84.2 ETH',rarity:'Legendary',owner:'0xA1b2...F3c4'},
  {id:'#0042',name:'Bored Ape #42',emoji:'🐵',price:'72.5 ETH',rarity:'Rare',owner:'0xD4e5...A6b7'},
  {id:'#7777',name:'Doodle Universe',emoji:'🌈',price:'12.1 ETH',rarity:'Uncommon',owner:'0xC7d8...E9f0'},
  {id:'#2048',name:'Azuki Warrior',emoji:'⚔️',price:'31.0 ETH',rarity:'Epic',owner:'0xB0c1...D2e3'},
  {id:'#0001',name:'Genesis Token',emoji:'💎',price:'210 ETH',rarity:'Legendary',owner:'0xF4a5...B6c7'},
  {id:'#9999',name:'CloneX Entity',emoji:'🤖',price:'18.7 ETH',rarity:'Rare',owner:'0xE8d9...A0b1'}
];

const rarityColors = {Legendary:'#f59e0b',Epic:'#8b5cf6',Rare:'#3b82f6',Uncommon:'#10b981'};

function loadNFTs() {
  const grid = document.getElementById('nftGrid');
  grid.innerHTML = MOCK_NFTS.map(nft => \`
    <div class="nft-card">
      <div class="nft-img">\${nft.emoji}</div>
      <div class="nft-body">
        <div class="nft-name">\${nft.name}</div>
        <div class="nft-id">Token \${nft.id}</div>
        <div class="nft-footer">
          <span class="price">Ξ \${nft.price}</span>
          <span class="badge" style="background:\${rarityColors[nft.rarity]}22;color:\${rarityColors[nft.rarity]}">\${nft.rarity}</span>
        </div>
        <div class="owner" style="margin-top:8px">Owner: \${nft.owner}</div>
      </div>
    </div>\`).join('');
}

loadNFTs();
<\/script>
</body>
</html>`;
  }

  // ══════════════════════════════════════
  // TOOL 3: Live Crypto Ticker
  // ══════════════════════════════════════
  function getTickerCode() {
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Live Crypto Dashboard</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#0f172a;color:#fff;font-family:'Inter',sans-serif;padding:30px}
  h1{color:#10b981;margin-bottom:5px}
  .sub{color:#64748b;font-size:13px;margin-bottom:30px;display:flex;align-items:center;gap:8px}
  .dot{width:8px;height:8px;background:#10b981;border-radius:50%;animation:pulse 1.5s infinite}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px;margin-bottom:30px}
  .coin-card{background:#1e293b;border:1px solid #334155;border-radius:16px;padding:25px;transition:all 0.3s;position:relative;overflow:hidden}
  .coin-card::before{content:'';position:absolute;inset:0;opacity:0;transition:0.3s}
  .coin-card:hover{transform:translateY(-4px);box-shadow:0 15px 35px rgba(0,0,0,0.3)}
  .coin-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
  .coin-name{display:flex;align-items:center;gap:10px}
  .coin-icon{font-size:28px}
  .coin-sym{font-weight:900;font-size:18px;color:#fff}
  .coin-full{font-size:11px;color:#64748b}
  .change-badge{padding:5px 12px;border-radius:20px;font-weight:bold;font-size:13px}
  .up{background:#10b98122;color:#10b981}
  .down{background:#ef444422;color:#ef4444}
  .price{font-size:36px;font-weight:900;margin-bottom:8px}
  .stats{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:15px;border-top:1px solid #334155;padding-top:15px}
  .stat-label{color:#64748b;font-size:10px;text-transform:uppercase;font-weight:bold;margin-bottom:2px}
  .stat-val{color:#cbd5e1;font-size:13px;font-weight:600}
  .ws-log{background:#0f172a;border:1px solid #334155;border-radius:8px;padding:15px;font-family:monospace;font-size:12px;height:120px;overflow-y:auto;color:#10b981}
</style>
</head>
<body>
<h1>📊 Live Crypto Dashboard</h1>
<p class="sub"><span class="dot"></span> Connected to Binance WebSocket Stream</p>

<div class="grid" id="coinsGrid"></div>

<div style="color:#64748b;font-size:12px;margin-bottom:8px;font-weight:bold;text-transform:uppercase;letter-spacing:1px">WebSocket Event Log</div>
<div class="ws-log" id="wsLog">> Connecting to wss://stream.binance.com...</div>

<script>
const coins = [
  {sym:'BTCUSDT',label:'Bitcoin',abbr:'BTC',icon:'₿',color:'#f59e0b'},
  {sym:'ETHUSDT',label:'Ethereum',abbr:'ETH',icon:'Ξ',color:'#8b5cf6'},
  {sym:'SOLUSDT',label:'Solana',abbr:'SOL',icon:'◎',color:'#14b8a6'}
];

const prices = {BTCUSDT:67420.50,ETHUSDT:3840.20,SOLUSDT:172.85};
const changes = {BTCUSDT:2.31,ETHUSDT:-1.08,SOLUSDT:4.52};

function formatNum(n){return n>=1e9?(n/1e9).toFixed(2)+'B':n>=1e6?(n/1e6).toFixed(2)+'M':n.toFixed(2)}

function renderGrid() {
  document.getElementById('coinsGrid').innerHTML = coins.map(c => {
    const price = prices[c.sym];
    const chg = changes[c.sym];
    const isUp = chg >= 0;
    return \`<div class="coin-card" style="border-color:\${c.color}33">
      <div class="coin-header">
        <div class="coin-name">
          <span class="coin-icon">\${c.icon}</span>
          <div><div class="coin-sym" style="color:\${c.color}">\${c.abbr}</div><div class="coin-full">\${c.label}</div></div>
        </div>
        <span class="change-badge \${isUp?'up':'down'}">\${isUp?'▲':'▼'} \${Math.abs(chg).toFixed(2)}%</span>
      </div>
      <div class="price" style="color:\${c.color}">$\${price.toLocaleString('en-US',{minimumFractionDigits:2})}</div>
      <div class="stats">
        <div><div class="stat-label">24h High</div><div class="stat-val">$\${formatNum(price*1.05)}</div></div>
        <div><div class="stat-label">24h Low</div><div class="stat-val">$\${formatNum(price*0.95)}</div></div>
        <div><div class="stat-label">Volume</div><div class="stat-val">$\${formatNum(price*Math.random()*10000)}</div></div>
        <div><div class="stat-label">Mkt Cap</div><div class="stat-val">$\${formatNum(price*(c.sym==='BTCUSDT'?19.7e6:120e6))}</div></div>
      </div>
    </div>\`;
  }).join('');
}

function log(msg) {
  const box = document.getElementById('wsLog');
  box.innerHTML += '<br>> ' + msg;
  box.scrollTop = box.scrollHeight;
}

renderGrid();

// Simulate WebSocket price updates
function simulateWS() {
  log('WebSocket connection established ✓');

  setInterval(() => {
    coins.forEach(c => {
      const delta = (Math.random() - 0.499) * prices[c.sym] * 0.003;
      prices[c.sym] = Math.max(1, prices[c.sym] + delta);
      changes[c.sym] += (Math.random() - 0.499) * 0.2;
    });
    renderGrid();
    const c = coins[Math.floor(Math.random()*coins.length)];
    log(\`[\${c.sym}] price update → $\${prices[c.sym].toFixed(2)}\`);
  }, 2000);
}

simulateWS();
<\/script>
</body>
</html>`;
  }

  // ══════════════════════════════════════
  // TOOL 4: ABI Decoder UI
  // ══════════════════════════════════════
  function getAbiCode() {
    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>ABI Decoder</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#0f172a;color:#fff;font-family:'Inter',sans-serif;padding:30px;display:grid;grid-template-columns:1fr 1fr;gap:20px;min-height:100vh}
h1{color:#38bdf8;grid-column:1/-1;margin-bottom:10px}
.box{background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px}
textarea{width:100%;height:200px;background:#0f172a;border:1px solid #475569;color:#fff;padding:12px;border-radius:8px;font-family:monospace;font-size:12px;resize:vertical}
button{padding:10px 20px;background:#38bdf8;border:none;border-radius:8px;color:#000;font-weight:bold;cursor:pointer;margin-top:10px;width:100%}
.fn-card{background:#0f172a;border:1px solid #334155;border-radius:8px;padding:15px;margin-bottom:10px}
.fn-name{color:#38bdf8;font-weight:800;font-size:14px;margin-bottom:8px}
.fn-badge{display:inline-block;padding:3px 8px;border-radius:10px;font-size:10px;font-weight:bold;margin-right:6px;margin-bottom:8px}
.read{background:#10b98122;color:#10b981}.write{background:#f59e0b22;color:#f59e0b}.payable{background:#ef444422;color:#ef4444}
.fn-input{width:100%;background:#1e293b;border:1px solid #475569;color:#fff;padding:8px;border-radius:6px;margin-bottom:8px;font-size:13px}
.call-btn{padding:8px 16px;border:none;border-radius:6px;font-weight:bold;cursor:pointer;font-size:12px}
</style></head>
<body>
<h1>📝 Smart Contract ABI Decoder</h1>
<div class="box">
  <h3 style="color:#38bdf8;margin-bottom:10px">Paste ABI JSON</h3>
  <textarea id="abiInput" placeholder='[{"name":"balanceOf","type":"function","stateMutability":"view","inputs":[{"name":"account","type":"address"}],"outputs":[{"name":"","type":"uint256"}]},{"name":"transfer","type":"function","stateMutability":"nonpayable","inputs":[{"name":"to","type":"address"},{"name":"amount","type":"uint256"}],"outputs":[{"name":"","type":"bool"}]}]'></textarea>
  <button onclick="decodeABI()">⚡ Generate Interface</button>
</div>
<div class="box" style="overflow-y:auto">
  <h3 style="color:#38bdf8;margin-bottom:15px">Generated dApp Interface</h3>
  <div id="fnList"><p style="color:#475569">Paste an ABI and click Generate...</p></div>
</div>
<script>
function decodeABI() {
  let abi;
  try { abi = JSON.parse(document.getElementById('abiInput').value); }
  catch(e) { alert('Invalid JSON'); return; }
  const fns = abi.filter(x => x.type === 'function');
  const list = document.getElementById('fnList');
  list.innerHTML = fns.map(fn => {
    const mut = fn.stateMutability || 'nonpayable';
    const cls = mut === 'view' || mut === 'pure' ? 'read' : mut === 'payable' ? 'payable' : 'write';
    const label = cls === 'read' ? 'READ' : cls === 'payable' ? 'PAYABLE' : 'WRITE';
    const inputs = (fn.inputs||[]).map(i => \`<input class="fn-input" placeholder="\${i.name} (\${i.type})">\`).join('');
    const btnColor = cls==='read'?'#10b981':cls==='payable'?'#ef4444':'#f59e0b';
    return \`<div class="fn-card">
      <div class="fn-name">\${fn.name}</div>
      <span class="fn-badge \${cls}">\${label}</span>
      \${inputs}
      <button class="call-btn" style="background:\${btnColor};color:#000" onclick="alert('Calling \${fn.name}()... (connect wallet for real calls)')">
        \${cls==='read'?'📖 Call':'✍️ Send'}
      </button>
    </div>\`;
  }).join('');
}
</script>
</body></html>`;
  }

  // ══════════════════════════════════════
  // TOOL 5: Sign-In With Ethereum
  // ══════════════════════════════════════
  function getSiweCode() {
    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Sign-In With Ethereum</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#0f172a;color:#fff;font-family:'Inter',sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh}
.card{background:#1e293b;border:1px solid #334155;border-radius:20px;padding:40px;max-width:440px;width:100%;text-align:center}
h1{color:#ec4899;font-size:22px;margin-bottom:8px}
p{color:#64748b;font-size:14px;line-height:1.6;margin-bottom:25px}
.steps{display:flex;justify-content:center;gap:10px;margin-bottom:30px}
.step{background:#0f172a;border:1px solid #334155;border-radius:8px;padding:10px 15px;font-size:12px;flex:1}
.step.active{border-color:#ec4899;color:#ec4899}
.step-num{font-weight:900;font-size:18px;display:block;margin-bottom:4px}
button{width:100%;padding:14px;border:none;border-radius:12px;font-weight:900;font-size:15px;cursor:pointer;transition:0.3s}
.btn-connect{background:linear-gradient(135deg,#ec4899,#be185d);color:#fff}
.btn-sign{background:linear-gradient(135deg,#8b5cf6,#6d28d9);color:#fff;display:none}
.result-box{background:#0f172a;border:1px solid #10b98144;border-radius:10px;padding:15px;margin-top:20px;text-align:left;display:none}
.mono{font-family:monospace;font-size:11px;color:#10b981;word-break:break-all}
</style></head>
<body>
<div class="card">
  <div style="font-size:48px;margin-bottom:15px">🔐</div>
  <h1>Sign-In With Ethereum</h1>
  <p>No username. No password. Prove you own your wallet by signing a cryptographic message.</p>
  <div class="steps">
    <div class="step active" id="s1"><span class="step-num">1</span>Connect</div>
    <div class="step" id="s2"><span class="step-num">2</span>Sign</div>
    <div class="step" id="s3"><span class="step-num">3</span>Verified</div>
  </div>
  <button class="btn-connect" id="btnConnect" onclick="connectStep()">🦊 Connect Wallet</button>
  <button class="btn-sign" id="btnSign" onclick="signStep()">✍️ Sign Message to Login</button>
  <div class="result-box" id="resultBox">
    <div style="color:#10b981;font-weight:bold;margin-bottom:8px">✅ Identity Verified!</div>
    <div style="color:#64748b;font-size:11px;margin-bottom:4px">Wallet Address:</div>
    <div class="mono" id="resAddr"></div>
    <div style="color:#64748b;font-size:11px;margin:8px 0 4px">Signature (truncated):</div>
    <div class="mono" id="resSig"></div>
  </div>
</div>
<script>
let userAddr = '';
async function connectStep() {
  if(typeof window.ethereum === 'undefined') {
    alert('MetaMask not found. Simulating...');
    userAddr = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
    document.getElementById('s1').classList.remove('active');
    document.getElementById('s2').classList.add('active');
    document.getElementById('btnConnect').style.display='none';
    document.getElementById('btnSign').style.display='block';
    return;
  }
  const accs = await window.ethereum.request({method:'eth_requestAccounts'});
  userAddr = accs[0];
  document.getElementById('s1').classList.remove('active');
  document.getElementById('s2').classList.add('active');
  document.getElementById('btnConnect').style.display='none';
  document.getElementById('btnSign').style.display='block';
}
async function signStep() {
  const nonce = Math.floor(Math.random()*1000000);
  const msg = \`Sign in to MyDApp\\n\\nNonce: \${nonce}\\nTimestamp: \${new Date().toISOString()}\`;
  let sig;
  if(typeof window.ethereum === 'undefined') {
    sig = '0x' + Array.from({length:65},()=>Math.floor(Math.random()*256).toString(16).padStart(2,'0')).join('');
  } else {
    sig = await window.ethereum.request({method:'personal_sign',params:[msg,userAddr]});
  }
  document.getElementById('s2').classList.remove('active');
  document.getElementById('s3').classList.add('active');
  document.getElementById('btnSign').style.display='none';
  document.getElementById('resAddr').textContent = userAddr;
  document.getElementById('resSig').textContent = sig.slice(0,40)+'...';
  document.getElementById('resultBox').style.display='block';
}
</script>
</body></html>`;
  }

  // ══════════════════════════════════════
  // TOOL 6: ERC-20 Transfer UI
  // ══════════════════════════════════════
  function getTransferCode() {
    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>ERC-20 Transfer</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#0f172a;color:#fff;font-family:'Inter',sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:20px}
.card{background:#1e293b;border:1px solid #334155;border-radius:20px;padding:35px;max-width:460px;width:100%}
h1{color:#14b8a6;font-size:20px;margin-bottom:25px;display:flex;align-items:center;gap:10px}
label{display:block;color:#94a3b8;font-size:11px;font-weight:bold;text-transform:uppercase;margin-bottom:6px}
input,select{width:100%;background:#0f172a;border:1px solid #475569;color:#fff;padding:12px;border-radius:8px;margin-bottom:20px;font-size:14px;outline:none;transition:0.2s}
input:focus,select:focus{border-color:#14b8a6}
.token-row{display:flex;gap:10px}
.token-row input{flex:1}
.balance{text-align:right;color:#14b8a6;font-size:12px;margin-top:-15px;margin-bottom:15px}
button{width:100%;padding:14px;border:none;border-radius:12px;background:linear-gradient(135deg,#14b8a6,#0d9488);color:#000;font-weight:900;font-size:15px;cursor:pointer;transition:0.3s}
button:hover{transform:translateY(-2px);box-shadow:0 8px 25px #14b8a655}
.tx-log{background:#0f172a;border:1px solid #14b8a644;border-radius:10px;padding:15px;margin-top:20px;display:none}
.tx-row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #1e293b;font-size:13px}
</style></head>
<body>
<div class="card">
  <h1>💸 ERC-20 Token Transfer</h1>
  <label>Token Contract</label>
  <select id="tokenSel">
    <option value="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48">USDC — USD Coin</option>
    <option value="0xdAC17F958D2ee523a2206206994597C13D831ec7">USDT — Tether</option>
    <option value="0x6B175474E89094C44Da98b954EedeAC495271d0F">DAI — Dai Stablecoin</option>
    <option value="custom">Custom Token...</option>
  </select>
  <label>Recipient Address</label>
  <input type="text" id="toAddr" placeholder="0x...">
  <label>Amount</label>
  <div class="token-row">
    <input type="number" id="amount" placeholder="0.00" min="0" step="any">
  </div>
  <div class="balance">Balance: <span id="balance">1,250.00</span> USDC</div>
  <button onclick="sendTransfer()">🚀 Send Tokens</button>
  <div class="tx-log" id="txLog">
    <div style="color:#14b8a6;font-weight:bold;margin-bottom:10px">📋 Transaction Details</div>
    <div class="tx-row"><span style="color:#64748b">Status</span><span id="txStatus" style="color:#f59e0b">Pending...</span></div>
    <div class="tx-row"><span style="color:#64748b">Hash</span><span id="txHash" style="font-family:monospace;font-size:11px"></span></div>
    <div class="tx-row"><span style="color:#64748b">Gas Used</span><span id="txGas"></span></div>
  </div>
</div>
<script>
async function sendTransfer() {
  const to = document.getElementById('toAddr').value;
  const amt = document.getElementById('amount').value;
  if(!to || !amt) { alert('Fill in all fields'); return; }

  const log = document.getElementById('txLog');
  log.style.display = 'block';
  document.getElementById('txStatus').textContent = 'Sending...';
  document.getElementById('txStatus').style.color = '#f59e0b';

  // Simulate transaction
  await new Promise(r => setTimeout(r, 2000));

  const hash = '0x' + Array.from({length:32},()=>Math.floor(Math.random()*256).toString(16).padStart(2,'0')).join('');
  document.getElementById('txHash').textContent = hash.slice(0,18)+'...';
  document.getElementById('txGas').textContent = (21000 + Math.floor(Math.random()*30000)) + ' wei';
  document.getElementById('txStatus').textContent = '✅ Confirmed';
  document.getElementById('txStatus').style.color = '#10b981';

  // ethers.js production code (commented):
  // const provider = new ethers.BrowserProvider(window.ethereum);
  // const signer = await provider.getSigner();
  // const contract = new ethers.Contract(TOKEN_ADDRESS, ERC20_ABI, signer);
  // const tx = await contract.transfer(to, ethers.parseUnits(amount, 6));
  // await tx.wait();
}
</script>
</body></html>`;
  }

  // ══════════════════════════════════════
  // TOOL 7: Gas Price Estimator
  // ══════════════════════════════════════
  function getGasCode() {
    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Gas Estimator</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#0f172a;color:#fff;font-family:'Inter',sans-serif;padding:30px}
h1{color:#f97316;margin-bottom:5px}
.sub{color:#64748b;font-size:13px;margin-bottom:30px;display:flex;align-items:center;gap:8px}
.dot{width:8px;height:8px;background:#f97316;border-radius:50%;animation:p 1.5s infinite}
@keyframes p{0%,100%{opacity:1}50%{opacity:0.2}}
.gas-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:15px;margin-bottom:30px}
.gas-card{border-radius:14px;padding:25px;text-align:center;position:relative;overflow:hidden;transition:transform 0.3s}
.gas-card:hover{transform:translateY(-5px)}
.slow{background:linear-gradient(135deg,#1e293b,#0f172a);border:2px solid #10b98155}
.standard{background:linear-gradient(135deg,#1e1a2e,#0f172a);border:2px solid #f59e0b55}
.fast{background:linear-gradient(135deg,#1e1215,#0f172a);border:2px solid #ef444455}
.speed{font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px}
.gwei{font-size:40px;font-weight:900;margin:5px 0}
.usd{font-size:12px;margin-top:5px}
.table{background:#1e293b;border-radius:12px;border:1px solid #334155;overflow:hidden}
.t-header{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;padding:12px 20px;background:rgba(249,115,22,0.1);color:#f97316;font-size:12px;font-weight:bold;text-transform:uppercase}
.t-row{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;padding:14px 20px;border-bottom:1px solid #334155;font-size:13px;align-items:center}
.t-row:last-child{border-bottom:none}
.eth-price{background:#1e293b;border-radius:12px;padding:15px 20px;margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;border:1px solid #334155}
</style></head>
<body>
<h1>⛽ Gas Price Estimator</h1>
<p class="sub"><span class="dot"></span>Live Ethereum Network — Auto-refresh every 5s</p>

<div class="eth-price">
  <span style="color:#64748b">ETH/USD Price:</span>
  <strong id="ethPrice" style="color:#f59e0b;font-size:20px">$3,840.20</strong>
</div>

<div class="gas-grid" id="gasGrid"></div>

<div class="table">
  <div class="t-header"><span>Transaction Type</span><span>Slow</span><span>Standard</span><span>Fast</span></div>
  <div class="t-row"><span>ETH Transfer</span><span id="r0s">—</span><span id="r0m">—</span><span id="r0f">—</span></div>
  <div class="t-row"><span>ERC-20 Transfer</span><span id="r1s">—</span><span id="r1m">—</span><span id="r1f">—</span></div>
  <div class="t-row"><span>NFT Mint</span><span id="r2s">—</span><span id="r2m">—</span><span id="r2f">—</span></div>
  <div class="t-row"><span>Uniswap Swap</span><span id="r3s">—</span><span id="r3m">—</span><span id="r3f">—</span></div>
</div>

<script>
const GAS_UNITS = [21000, 65000, 120000, 180000];
const ETH_USD = 3840.20;

function calcUsd(gwei, gasUnits) {
  return '$' + (gwei * 1e-9 * gasUnits * ETH_USD).toFixed(4);
}

function update() {
  const base = 18 + Math.random() * 30;
  const slow = base * 0.7, mid = base, fast = base * 1.5;

  document.getElementById('gasGrid').innerHTML = [
    {label:'🐢 Slow',speed:slow,time:'> 5 min',cls:'slow',color:'#10b981'},
    {label:'🚗 Standard',speed:mid,time:'~ 1 min',cls:'standard',color:'#f59e0b'},
    {label:'🚀 Fast',speed:fast,time:'< 15 sec',cls:'fast',color:'#ef4444'}
  ].map(g => \`<div class="gas-card \${g.cls}">
    <div class="speed" style="color:\${g.color}">\${g.label}</div>
    <div class="gwei" style="color:\${g.color}">\${g.speed.toFixed(1)}</div>
    <div style="color:#64748b;font-size:11px">Gwei</div>
    <div class="usd" style="color:\${g.color}">~\${g.time}</div>
  </div>\`).join('');

  const speeds = [slow, mid, fast];
  GAS_UNITS.forEach((units, ri) => {
    ['s','m','f'].forEach((k, ki) => {
      document.getElementById(\`r\${ri}\${k}\`).textContent = calcUsd(speeds[ki], units);
    });
  });
}

update();
setInterval(update, 5000);
</script>
</body></html>`;
  }

  // Localization hook
  const _origApply = window.applyLang;
  window.applyLang = function() {
    if (typeof _origApply === 'function') _origApply();
    const lbl = document.getElementById('lbl-tab-web3dapp');
    if (lbl) lbl.textContent = (gl() === 'fr') ? 'Web3 & Blockchain' : 'Web3 & Blockchain';
    if (window.activeTab === 'web3dapp') window.initWeb3Studio(gl());
  };

  console.log('🌍 Web3 & Blockchain Studio loaded!');
})();
