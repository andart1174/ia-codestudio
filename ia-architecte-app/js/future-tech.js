/**
 * 🔮 FUTURE TECH LAB
 * Modules: Web3 Studio, Chrome Extension Gen, Web Scraper Bot, Canvas Game Engine, Cloud Architect
 */
(function(){
'use strict';

var LANG = {
  en: {
    w3_tab:'Web3 Studio', w3_title:'🌐 Web3 & dApp Studio', w3_sub:'Generate Smart Contracts (Solidity) & Web3 Connect UI',
    w3_contract:'Contract Name', w3_token:'Token Symbol (e.g. ETH)', w3_btn:'💎 Generate Web3 Code',
    
    ex_tab:'Ext Gen', ex_title:'🧩 Browser Ext. Builder', ex_sub:'Generate Manifest V3 & Background Scripts',
    ex_name:'Extension Name', ex_desc:'Description', ex_btn:'🧩 Generate Extension Code',
    
    sc_tab:'Scraper Bot', sc_title:'🤖 Web Scraper Bot', sc_sub:'Generate Puppeteer/Playwright Node.js scripts',
    sc_url:'Target URL', sc_selector:'CSS Selector to Extract', sc_btn:'🤖 Generate Scraper Script',
    
    gm_tab:'Canvas Game', gm_title:'🎮 Canvas Game Engine', gm_sub:'Generate HTML5 Mini-Games (Arcade/Platformer)',
    gm_type:'Game Type', gm_title_input:'Game Title', gm_btn:'🕹️ Generate Game Code',
    
    cl_tab:'Cloud Arch', cl_title:'☁️ Cloud Blueprint', cl_sub:'Generate Docker-Compose / Infrastructure Code',
    cl_svc:'Service Name', cl_db:'Database Type', cl_btn:'☁️ Generate Infra Code',

    nn_tab:'Neural Net', nn_title:'🧠 AI Model Trainer', nn_sub:'Generate TensorFlow.js / PyTorch Code',
    nn_layers:'Hidden Layers', nn_type:'Data Type', nn_btn:'🧠 Generate AI Code',

    qu_tab:'Quantum', qu_title:'🌌 Quantum Circuit', qu_sub:'Generate IBM Qiskit Python Scripts',
    qu_qubits:'Qubits Count', qu_ops:'Operation (e.g. Bell State)', qu_btn:'🌌 Generate Quantum Code',

    io_tab:'IoT & Robot', io_title:'🛸 IoT Firmware Gen', io_sub:'Generate C++ code for Arduino/ESP32',
    io_wifi:'WiFi SSID', io_sensor:'Sensor Type', io_btn:'🛸 Generate C++ Code',

    xr_tab:'Metaverse', xr_title:'🕶️ WebXR Metaverse', xr_sub:'Generate A-Frame VR/AR Scenes',
    xr_env:'Environment Preset', xr_model:'3D Model URL', xr_btn:'🕶️ Generate WebXR Code',

    zk_tab:'ZK Crypto', zk_title:'🔐 Zero-Knowledge Forge', zk_sub:'Generate Circom ZK-SNARKs proofs',
    zk_secret:'Secret Variable', zk_public:'Public Output', zk_btn:'🔐 Generate ZK Code',

    webrtc_tab:'WebRTC P2P', webrtc_title:'🌐 WebRTC P2P Engine', webrtc_sub:'Generate Serverless Video/Data Connection',
    webrtc_type:'Connection Type', webrtc_btn:'🌐 Generate WebRTC Code',

    geo_tab:'Geo-Mapping', geo_title:'🛰️ 3D Geo-Mapping', geo_sub:'Generate WebGL 3D Earth Globe',
    geo_coord:'GPS Coordinates (Lat, Lng)', geo_btn:'🛰️ Generate Globe Code',

    swarm_tab:'AI Swarm', swarm_title:'🤖 AI Agent Swarm', swarm_sub:'Generate Multi-Agent Framework (Node.js)',
    swarm_agents:'Number of Agents', swarm_btn:'🤖 Generate Swarm Code',

    bio_tab:'Biotech DNA', bio_title:'🧬 DNA Visualizer', bio_sub:'Generate Interactive DNA/Molecule Viewer',
    bio_seq:'DNA Sequence (A,T,C,G)', bio_btn:'🧬 Generate DNA Code',

    hud_tab:'Holo HUD', hud_title:'🕶️ Holographic HUD', hud_sub:'Generate Sci-Fi CSS3D Interfaces',
    hud_color:'Neon Glow Color', hud_btn:'🕶️ Generate HUD Code',

    inject: '💉 Inject Code', copy: '📋 Copy Code', generated: '✅ Code Generated Successfully!'
  },
  fr: {
    w3_tab:'Studio Web3', w3_title:'🌐 Studio Web3 & dApp', w3_sub:'Générer des Contrats (Solidity) & UI Web3',
    w3_contract:'Nom du Contrat', w3_token:'Symbole Token (ex. ETH)', w3_btn:'💎 Générer Code Web3',
    
    ex_tab:'Générateur Ext', ex_title:'🧩 Créateur d\'Extension', ex_sub:'Générer Manifest V3 & Background Scripts',
    ex_name:'Nom Extension', ex_desc:'Description', ex_btn:'🧩 Générer Code Extension',
    
    sc_tab:'Bot Scraper', sc_title:'🤖 Bot Web Scraper', sc_sub:'Générer scripts Node.js Puppeteer/Playwright',
    sc_url:'URL Cible', sc_selector:'Sélecteur CSS à Extraire', sc_btn:'🤖 Générer Script Scraper',
    
    gm_tab:'Jeu Canvas', gm_title:'🎮 Moteur Jeu Canvas', gm_sub:'Générer Mini-Jeux HTML5 (Arcade/Plateforme)',
    gm_type:'Type de Jeu', gm_title_input:'Titre du Jeu', gm_btn:'🕹️ Générer Code Jeu',
    
    cl_tab:'Arch Cloud', cl_title:'☁️ Blueprint Cloud', cl_sub:'Générer Docker-Compose / Code d\'Infrastructure',
    cl_svc:'Nom du Service', cl_db:'Type de Base de données', cl_btn:'☁️ Générer Code Infra',

    nn_tab:'Réseau Neuronal', nn_title:'🧠 Entraîneur IA', nn_sub:'Générer Code TensorFlow.js / PyTorch',
    nn_layers:'Couches Cachées', nn_type:'Type de Données', nn_btn:'🧠 Générer Code IA',

    qu_tab:'Quantique', qu_title:'🌌 Circuit Quantique', qu_sub:'Générer Scripts Python IBM Qiskit',
    qu_qubits:'Nombre de Qubits', qu_ops:'Opération', qu_btn:'🌌 Générer Code Quantique',

    io_tab:'IoT & Robot', io_title:'🛸 Générateur Firmware IoT', io_sub:'Générer code C++ pour Arduino/ESP32',
    io_wifi:'WiFi SSID', io_sensor:'Type de Capteur', io_btn:'🛸 Générer Code C++',

    xr_tab:'Métavers', xr_title:'🕶️ Métavers WebXR', xr_sub:'Générer Scènes VR/AR A-Frame',
    xr_env:'Environnement', xr_model:'URL Modèle 3D', xr_btn:'🕶️ Générer Code WebXR',

    zk_tab:'Crypto ZK', zk_title:'🔐 Forge Zero-Knowledge', zk_sub:'Générer preuves Circom ZK-SNARKs',
    zk_secret:'Variable Secrète', zk_public:'Sortie Publique', zk_btn:'🔐 Générer Code ZK',

    webrtc_tab:'WebRTC P2P', webrtc_title:'🌐 Moteur P2P WebRTC', webrtc_sub:'Générer Connexion Sans Serveur',
    webrtc_type:'Type de Connexion', webrtc_btn:'🌐 Générer Code WebRTC',

    geo_tab:'Geo-Map 3D', geo_title:'🛰️ Globe Terrestre 3D', geo_sub:'Générer Globe 3D WebGL',
    geo_coord:'Coordonnées GPS', geo_btn:'🛰️ Générer Code Globe',

    swarm_tab:'Essaim IA', swarm_title:'🤖 Essaim d\'Agents IA', swarm_sub:'Générer Framework Multi-Agent (Node)',
    swarm_agents:'Nombre d\'Agents', swarm_btn:'🤖 Générer Code Essaim',

    bio_tab:'Biotech ADN', bio_title:'🧬 Visualiseur d\'ADN', bio_sub:'Générer Visionneuse 3D de Molécules',
    bio_seq:'Séquence ADN (A,T,C,G)', bio_btn:'🧬 Générer Code ADN',

    hud_tab:'HUD Holo', hud_title:'🕶️ Interface Holographique', hud_sub:'Générer Interfaces Sci-Fi CSS3D',
    hud_color:'Couleur Néon', hud_btn:'🕶️ Générer Code HUD',

    inject: '💉 Injecter Code', copy: '📋 Copier Code', generated: '✅ Code Généré avec Succès!'
  }
};

function gl(){return window.lang||'en';}
function t(k){return (LANG[gl()]||LANG.en)[k]||k;}

function makeField(id, label, placeholder, valObj, key) {
  var d=document.createElement('div');
  var l=document.createElement('div');
  l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';
  l.textContent=label;
  var i=document.createElement('input');
  i.id=id; i.placeholder=placeholder; i.value=valObj[key]||'';
  i.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(139,92,246,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';
  i.oninput=function(){ valObj[key] = this.value; };
  d.appendChild(l); d.appendChild(i);
  return d;
}

function renderPanel(tabId, titleK, subK, fields, btnK, genFn) {
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(139,92,246,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(139,92,246,0.1),rgba(167,139,250,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#8b5cf6;">'+t(titleK)+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t(subK)+'</div>';
  wrap.appendChild(hdr);
  
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;';
  fields.forEach(function(f){ body.appendChild(f); });

  var btn=document.createElement('button');btn.innerHTML=t(btnK);
  btn.style='width:100%;background:linear-gradient(135deg,#6d28d9,#8b5cf6);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:6px;box-shadow:0 4px 15px rgba(139,92,246,0.3);';
  body.appendChild(btn);

  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=t('inject');ib.style='flex:1;background:rgba(255,255,255,.1);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=t('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);

  var generatedCode='';
  btn.onclick=function(){
    generatedCode = genFn();
    ar.style.display='flex';
    res.innerHTML='<div style="background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#a78bfa;">'+t('generated')+'</div>';
    if(window.showToast) window.showToast(t('generated'));
  };
  ib.onclick=function(){
    if(!generatedCode)return;
    var inj=window.injectCode||(window.parent&&window.parent.injectCode);
    if(typeof inj==='function'){
      inj(generatedCode);
      if(window.showToast) window.showToast('✅ Code Injected!');
    }
  };
  cb.onclick=function(){
    if(generatedCode&&navigator.clipboard) navigator.clipboard.writeText(generatedCode).then(function(){
      if(window.showToast) window.showToast('📋 Copied!');
    });
  };
}

/* 1. Web3 Studio */
var dW3 = { name: 'MyToken', symbol: 'MTK' };
function renderWeb3(){
  var f1 = makeField('w3-name', t('w3_contract'), 'MyToken', dW3, 'name');
  var f2 = makeField('w3-sym', t('w3_token'), 'MTK', dW3, 'symbol');
  renderPanel('web3studio', 'w3_title', 'w3_sub', [f1, f2], 'w3_btn', function(){
    return `<!-- WEB3 dApp: ${dW3.name} -->
<div style="font-family:sans-serif; text-align:center; padding:50px; background:#0f172a; color:white; border-radius:12px;">
  <h1 style="background:linear-gradient(90deg, #38bdf8, #818cf8); -webkit-background-clip:text; color:transparent;">${dW3.name} (${dW3.symbol}) Web3 Portal</h1>
  <p>Connect your MetaMask wallet to interact with the Smart Contract.</p>
  <button id="connectBtn" style="padding:12px 24px; font-size:16px; background:#8b5cf6; color:white; border:none; border-radius:8px; cursor:pointer; font-weight:bold; margin-top:20px;">🦊 Connect Wallet</button>
  <div id="walletStatus" style="margin-top:20px; font-size:14px; color:#94a3b8;">Not connected</div>
</div>

<!-- SMART CONTRACT (Solidity)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ${dW3.name} is ERC20, Ownable {
    constructor() ERC20("${dW3.name}", "${dW3.symbol}") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
-->

<script>
  document.getElementById('connectBtn').addEventListener('click', async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        document.getElementById('walletStatus').innerHTML = 'Connected: <span style="color:#34d399;">' + accounts[0] + '</span>';
        document.getElementById('connectBtn').innerText = 'Wallet Connected';
        document.getElementById('connectBtn').style.background = '#10b981';
      } catch (error) {
        document.getElementById('walletStatus').innerText = 'Error connecting: ' + error.message;
      }
    } else {
      document.getElementById('walletStatus').innerText = 'MetaMask is not installed!';
    }
  });
</script>`;
  });
}

/* 2. Extension Generator */
var dExt = { name: 'My Super Extension', desc: 'An awesome Chrome extension' };
function renderExtGen(){
  var f1 = makeField('ex-name', t('ex_name'), 'My Extension', dExt, 'name');
  var f2 = makeField('ex-desc', t('ex_desc'), 'Description', dExt, 'desc');
  renderPanel('extgen', 'ex_title', 'ex_sub', [f1, f2], 'ex_btn', function(){
    return `<!-- BROWSER EXTENSION GENERATOR (Manifest V3) -->
<!-- Save this block as manifest.json -->
<pre style="background:#1e1e1e; color:#d4d4d4; padding:20px; border-radius:8px; overflow:x-auto;">
{
  "manifest_version": 3,
  "name": "${dExt.name}",
  "version": "1.0.0",
  "description": "${dExt.desc}",
  "action": {
    "default_popup": "popup.html",
    "default_icon": "icon.png"
  },
  "background": {
    "service_worker": "background.js"
  },
  "permissions": [
    "storage",
    "activeTab",
    "scripting"
  ],
  "host_permissions": [
    "https://*/*"
  ]
}
</pre>

<!-- Save this block as popup.html -->
<div style="width:300px; height:400px; border:1px solid #333; padding:20px; background:#fff; font-family:sans-serif; border-radius:8px;">
  <h2 style="color:#0f172a;">${dExt.name}</h2>
  <p style="color:#475569; font-size:14px; margin-bottom:20px;">${dExt.desc}</p>
  <button style="width:100%; padding:10px; background:#2563eb; color:#fff; border:none; border-radius:6px; cursor:pointer;" onclick="alert('Action Triggered!')">Execute Action</button>
</div>

<!-- Save this block as background.js -->
<pre style="background:#1e1e1e; color:#d4d4d4; padding:20px; border-radius:8px; margin-top:20px; overflow:x-auto;">
// background.js
chrome.runtime.onInstalled.addListener(() => {
  console.log('${dExt.name} installed successfully.');
  chrome.storage.sync.set({ initialized: true });
});
</pre>`;
  });
}

/* 3. Scraper Bot */
var dScr = { url: 'https://example.com', selector: '.price-tag' };
function renderScraper(){
  var f1 = makeField('sc-url', t('sc_url'), 'https://...', dScr, 'url');
  var f2 = makeField('sc-sel', t('sc_selector'), '.class-name', dScr, 'selector');
  renderPanel('scraperbot', 'sc_title', 'sc_sub', [f1, f2], 'sc_btn', function(){
    return `<!-- NODE.JS PUPPETEER SCRAPER SCRIPT -->
<!-- Run: npm i puppeteer -->
<div style="background:#0d1117; color:#e6edf3; padding:20px; border-radius:8px; font-family:monospace; white-space:pre-wrap;">
const puppeteer = require('puppeteer');

(async () => {
  console.log('🤖 Starting Scraper Bot...');
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  const targetUrl = '${dScr.url}';
  const selector = '${dScr.selector}';

  console.log(\`Navigating to \${targetUrl}...\`);
  await page.goto(targetUrl, { waitUntil: 'networkidle2' });

  // Wait for the target element to appear
  await page.waitForSelector(selector).catch(e => console.log('Selector not found quickly.'));

  // Extract data
  const extractedData = await page.evaluate((sel) => {
    const elements = document.querySelectorAll(sel);
    const data = [];
    elements.forEach(el => data.push(el.innerText.trim()));
    return data;
  }, selector);

  console.log('✅ Extracted Data:');
  console.log(extractedData);

  // Save to JSON
  const fs = require('fs');
  fs.writeFileSync('scraped_data.json', JSON.stringify(extractedData, null, 2));
  console.log('📁 Data saved to scraped_data.json');

  await browser.close();
  console.log('🛑 Scraper finished.');
})();
</div>`;
  });
}

function getGameCode(type, title) {
  var t = type.toLowerCase();
  if (t.includes('snake')) {
    return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${title}</title>
<style>
  body { margin:0; padding:0; display:flex; justify-content:center; align-items:center; height:100vh; background:#1e293b; font-family:sans-serif;}
  canvas { background:#0f172a; border:4px solid #10b981; border-radius:8px; box-shadow:0 10px 30px rgba(0,0,0,0.5); }
  .ui { position:absolute; top:20px; color:white; font-size:24px; font-weight:bold; }
</style>
</head>
<body>
<div class="ui">${title} | Score: <span id="score">0</span></div>
<canvas id="gameCanvas" width="400" height="400"></canvas>
<script>
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  let grid = 20, count = 0, score = 0;
  let snake = { x: 160, y: 160, dx: grid, dy: 0, cells: [], maxCells: 4 };
  let apple = { x: 320, y: 320 };

  function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min)) + min; }

  function loop() {
    requestAnimationFrame(loop);
    if (++count < 6) return;
    count = 0;
    ctx.clearRect(0,0,canvas.width,canvas.height);

    snake.x += snake.dx; snake.y += snake.dy;
    if (snake.x < 0) snake.x = canvas.width - grid; else if (snake.x >= canvas.width) snake.x = 0;
    if (snake.y < 0) snake.y = canvas.height - grid; else if (snake.y >= canvas.height) snake.y = 0;

    snake.cells.unshift({x: snake.x, y: snake.y});
    if (snake.cells.length > snake.maxCells) snake.cells.pop();

    ctx.fillStyle = '#ef4444';
    ctx.fillRect(apple.x, apple.y, grid-1, grid-1);

    ctx.fillStyle = '#10b981';
    snake.cells.forEach(function(cell, index) {
      ctx.fillRect(cell.x, cell.y, grid-1, grid-1);
      if (cell.x === apple.x && cell.y === apple.y) {
        snake.maxCells++; score += 10;
        document.getElementById('score').innerText = score;
        apple.x = getRandomInt(0, 20) * grid; apple.y = getRandomInt(0, 20) * grid;
      }
      for (let i = index + 1; i < snake.cells.length; i++) {
        if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
          snake.x = 160; snake.y = 160; snake.cells = []; snake.maxCells = 4; snake.dx = grid; snake.dy = 0; score = 0;
          document.getElementById('score').innerText = score;
        }
      }
    });
  }
  document.addEventListener('keydown', function(e) {
    if (e.which === 37 && snake.dx === 0) { snake.dx = -grid; snake.dy = 0; }
    else if (e.which === 38 && snake.dy === 0) { snake.dy = -grid; snake.dx = 0; }
    else if (e.which === 39 && snake.dx === 0) { snake.dx = grid; snake.dy = 0; }
    else if (e.which === 40 && snake.dy === 0) { snake.dy = grid; snake.dx = 0; }
  });
  requestAnimationFrame(loop);
</script>
</body>
</html>`;
  }
  
  if (t.includes('pong')) {
    return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${title}</title>
<style>
  body { margin:0; padding:0; display:flex; justify-content:center; align-items:center; height:100vh; background:#1e293b; font-family:sans-serif;}
  canvas { background:#0f172a; border:4px solid #3b82f6; border-radius:8px; box-shadow:0 10px 30px rgba(0,0,0,0.5); }
  .ui { position:absolute; top:20px; color:white; font-size:24px; font-weight:bold; }
</style>
</head>
<body>
<div class="ui">${title} | <span id="score">0 - 0</span></div>
<canvas id="gameCanvas" width="800" height="500"></canvas>
<script>
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  
  const paddleWidth = 10, paddleHeight = 100;
  const player = { x: 20, y: canvas.height/2 - 50, w: paddleWidth, h: paddleHeight, dy: 0, score: 0 };
  const ai = { x: canvas.width - 30, y: canvas.height/2 - 50, w: paddleWidth, h: paddleHeight, dy: 4, score: 0 };
  const ball = { x: canvas.width/2, y: canvas.height/2, r: 8, dx: 5, dy: 5 };

  function drawRect(x, y, w, h, color) { ctx.fillStyle = color; ctx.fillRect(x, y, w, h); }
  function drawCircle(x, y, r, color) { ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.fill(); }
  function resetBall() { ball.x = canvas.width/2; ball.y = canvas.height/2; ball.dx *= -1; }

  function update() {
    player.y += player.dy;
    if (player.y < 0) player.y = 0;
    if (player.y + player.h > canvas.height) player.y = canvas.height - player.h;

    // AI logic
    if (ai.y + ai.h/2 < ball.y) ai.y += ai.dy; else ai.y -= ai.dy;
    if (ai.y < 0) ai.y = 0; if (ai.y + ai.h > canvas.height) ai.y = canvas.height - ai.h;

    ball.x += ball.dx; ball.y += ball.dy;
    if (ball.y - ball.r < 0 || ball.y + ball.r > canvas.height) ball.dy *= -1;

    let p = (ball.x < canvas.width/2) ? player : ai;
    if (ball.x - ball.r < p.x + p.w && ball.x + ball.r > p.x && ball.y > p.y && ball.y < p.y + p.h) {
      ball.dx *= -1.1; // speed up
    }

    if (ball.x - ball.r < 0) { ai.score++; document.getElementById('score').innerText = player.score + " - " + ai.score; resetBall(); }
    else if (ball.x + ball.r > canvas.width) { player.score++; document.getElementById('score').innerText = player.score + " - " + ai.score; resetBall(); }
  }

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawRect(player.x, player.y, player.w, player.h, '#fff');
    drawRect(ai.x, ai.y, ai.w, ai.h, '#fff');
    drawCircle(ball.x, ball.y, ball.r, '#3b82f6');
    for(let i=0; i<canvas.height; i+=30) drawRect(canvas.width/2 - 1, i, 2, 15, '#fff'); // net
  }

  function loop() { update(); draw(); requestAnimationFrame(loop); }

  window.addEventListener('keydown', e => { if(e.key === 'ArrowUp') player.dy = -8; else if(e.key === 'ArrowDown') player.dy = 8; });
  window.addEventListener('keyup', e => { player.dy = 0; });

  loop();
</script>
</body>
</html>`;
  }

  // Default: Platformer (Flappy)
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${title}</title>
<style>
  body { margin:0; padding:0; display:flex; justify-content:center; align-items:center; height:100vh; background:#1e293b; font-family:sans-serif;}
  canvas { background:#0f172a; border:4px solid #f472b6; border-radius:8px; box-shadow:0 10px 30px rgba(0,0,0,0.5); }
  .ui { position:absolute; top:20px; color:white; font-size:24px; font-weight:bold; }
</style>
</head>
<body>
<div class="ui">${title} | Score: <span id="score">0</span></div>
<canvas id="gameCanvas" width="800" height="600"></canvas>

<script>
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  let score = 0, frameCount = 0, isGameOver = false;

  const player = { x: 100, y: 300, width: 40, height: 40, dy: 0, gravity: 0.5, jumpPower: -10, color: '#f43f5e' };
  const obstacles = [];

  window.addEventListener('keydown', (e) => { if (e.code === 'Space') { player.dy = player.jumpPower; if(isGameOver) reset(); }});
  window.addEventListener('touchstart', (e) => { player.dy = player.jumpPower; if(isGameOver) reset(); });

  function reset() { player.y = 300; player.dy = 0; obstacles.length = 0; score = 0; frameCount = 0; isGameOver = false; document.getElementById('score').innerText = score; loop(); }

  function handleObstacles() {
    if (frameCount % 90 === 0) { let h = Math.random() * 200 + 50; obstacles.push({ x: canvas.width, y: canvas.height - h, width: 50, height: h }); }
    for (let i = 0; i < obstacles.length; i++) {
      let obs = obstacles[i]; obs.x -= 5;
      ctx.fillStyle = '#10b981'; ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
      if (player.x < obs.x + obs.width && player.x + player.width > obs.x && player.y < obs.y + obs.height && player.y + player.height > obs.y) isGameOver = true;
    }
    if (obstacles.length > 0 && obstacles[0].x < -50) { obstacles.shift(); score += 10; document.getElementById('score').innerText = score; }
  }

  function loop() {
    if (isGameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle = 'white'; ctx.font = '40px sans-serif'; ctx.fillText('GAME OVER', canvas.width/2 - 120, canvas.height/2);
      ctx.font = '20px sans-serif'; ctx.fillText('Press SPACE to Restart', canvas.width/2 - 110, canvas.height/2 + 40);
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.dy += player.gravity; player.y += player.dy;
    if (player.y + player.height > canvas.height) { player.y = canvas.height - player.height; player.dy = 0; }
    
    ctx.fillStyle = player.color; ctx.fillRect(player.x, player.y, player.width, player.height);
    handleObstacles();
    frameCount++; requestAnimationFrame(loop);
  }
  loop();
</script>
</body>
</html>`;
}

/* 4. Canvas Game Engine */
var dGm = { type: 'Platformer', title: 'My Awesome Game' };
function renderGame(){
  var f1 = makeField('gm-type', t('gm_type'), 'Platformer / Pong / Snake', dGm, 'type');
  var f2 = makeField('gm-title', t('gm_title_input'), 'My Game', dGm, 'title');
  renderPanel('gameengine', 'gm_title', 'gm_sub', [f1, f2], 'gm_btn', function(){
    return getGameCode(dGm.type, dGm.title);
  });
}

/* 5. Cloud Architect */
var dCl = { svc: 'api-service', db: 'PostgreSQL' };
function renderCloud(){
  var f1 = makeField('cl-svc', t('cl_svc'), 'backend-api', dCl, 'svc');
  var f2 = makeField('cl-db', t('cl_db'), 'PostgreSQL / Redis', dCl, 'db');
  renderPanel('cloudarch', 'cl_title', 'cl_sub', [f1, f2], 'cl_btn', function(){
    return `<!-- CLOUD INFRASTRUCTURE BLUEPRINT -->
<!-- Save as docker-compose.yml -->
<pre style="background:#1e1e1e; color:#d4d4d4; padding:20px; border-radius:8px; overflow:x-auto;">
version: '3.8'

services:
  # Load Balancer / Reverse Proxy
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - ${dCl.svc}
    networks:
      - app-network

  # Main Application Service
  ${dCl.svc}:
    build: .
    environment:
      - NODE_ENV=production
      - DB_HOST=${dCl.db.toLowerCase()}_db
    ports:
      - "3000:3000"
    depends_on:
      - ${dCl.db.toLowerCase()}_db
    networks:
      - app-network

  # Database Service
  ${dCl.db.toLowerCase()}_db:
    image: ${dCl.db.toLowerCase() === 'postgresql' ? 'postgres:14' : (dCl.db.toLowerCase() === 'mysql' ? 'mysql:8' : 'redis:alpine')}
    ${dCl.db.toLowerCase() === 'postgresql' ? `environment:
      - POSTGRES_USER=admin
      - POSTGRES_PASSWORD=secret
      - POSTGRES_DB=app_db` : ''}
    ports:
      - "${dCl.db.toLowerCase() === 'postgresql' ? '5432:5432' : '6379:6379'}"
    volumes:
      - db_data:/var/lib/${dCl.db.toLowerCase()}
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  db_data:
</pre>`;
  });
}

/* 6. Neural Net Builder */
var dNn = { layers: '3', type: 'Images (CNN)' };
function renderNeuralNet(){
  var f1 = makeField('nn-layers', t('nn_layers'), '3', dNn, 'layers');
  var f2 = makeField('nn-type', t('nn_type'), 'Images (CNN)', dNn, 'type');
  renderPanel('neuralnet', 'nn_title', 'nn_sub', [f1, f2], 'nn_btn', function(){
    return `<!-- TENSORFLOW.JS NEURAL NETWORK -->
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js"></script>
<div style="background:#1e293b; color:#fff; padding:30px; border-radius:12px; font-family:sans-serif; text-align:center;">
  <h2>🧠 AI Model Training Init</h2>
  <p>Layers: ${dNn.layers} | Data Type: ${dNn.type}</p>
  <button onclick="startTraining()" style="padding:10px 20px; background:#3b82f6; color:white; border:none; border-radius:8px; cursor:pointer; font-weight:bold;">Start Epochs</button>
  <div id="tf-status" style="margin-top:20px; color:#94a3b8; font-family:monospace;">Model Compiled. Ready to train.</div>
</div>

<script>
  async function startTraining() {
    const status = document.getElementById('tf-status');
    status.innerText = "Creating Model...";
    
    // Define a sequential model
    const model = tf.sequential();
    
    // Input layer
    model.add(tf.layers.dense({units: 64, inputShape: [10], activation: 'relu'}));
    
    // Add dynamic hidden layers
    for(let i = 0; i < ${parseInt(dNn.layers) || 1}; i++) {
        model.add(tf.layers.dense({units: 32, activation: 'relu'}));
    }
    
    // Output layer
    model.add(tf.layers.dense({units: 1, activation: 'linear'}));
    
    model.compile({optimizer: 'sgd', loss: 'meanSquaredError'});
    
    // Generate dummy data
    const xs = tf.randomNormal([100, 10]);
    const ys = tf.randomNormal([100, 1]);
    
    status.innerText = "Training Started... Check Console";
    
    await model.fit(xs, ys, {
      epochs: 10,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          status.innerText = 'Epoch: ' + epoch + ' | Loss: ' + logs.loss.toFixed(4);
          console.log('Epoch: ' + epoch + ' Loss: ' + logs.loss);
        }
      }
    });
    
    status.innerText = "✅ Training Complete!";
  }
</script>`;
  });
}

/* 7. Quantum Circuit */
var dQu = { qubits: '2', ops: 'Bell State (Hadamard + CNOT)' };
function renderQuantum(){
  var f1 = makeField('qu-qubits', t('qu_qubits'), '2', dQu, 'qubits');
  var f2 = makeField('qu-ops', t('qu_ops'), 'Bell State', dQu, 'ops');
  renderPanel('quantum', 'qu_title', 'qu_sub', [f1, f2], 'qu_btn', function(){
    return `<!-- IBM QISKIT QUANTUM SCRIPT (PYTHON) -->
<!-- Run in your local Python environment or IBM Quantum Cloud -->
<pre style="background:#0d1117; color:#58a6ff; padding:20px; border-radius:8px; overflow:x-auto; font-family:monospace;">
from qiskit import QuantumCircuit, transpile
from qiskit_aer import Aer
from qiskit.visualization import plot_histogram

print("🌌 Initializing Quantum Circuit with ${dQu.qubits} Qubits...")

# Create a Quantum Circuit
qc = QuantumCircuit(${dQu.qubits}, ${dQu.qubits})

# Apply Selected Operation: ${dQu.ops}
qc.h(0) # Apply Hadamard gate to Qubit 0 (Superposition)
if ${dQu.qubits} > 1:
    qc.cx(0, 1) # Apply CNOT gate (Entanglement)

# Measure all qubits
qc.measure(range(${dQu.qubits}), range(${dQu.qubits}))

print(qc.draw())

# Simulate the circuit
simulator = Aer.get_backend('qasm_simulator')
compiled_circuit = transpile(qc, simulator)
job = simulator.run(compiled_circuit, shots=1000)
result = job.result()
counts = result.get_counts(qc)

print("\\n✅ Measurement Results (1000 shots):")
print(counts)
</pre>`;
  });
}

/* 8. IoT Firmware */
var dIo = { wifi: 'MyWiFiNetwork', sensor: 'DHT11 Temperature' };
function renderIoT(){
  var f1 = makeField('io-wifi', t('io_wifi'), 'MyWiFiNetwork', dIo, 'wifi');
  var f2 = makeField('io-sensor', t('io_sensor'), 'DHT11 / PIR', dIo, 'sensor');
  renderPanel('iot', 'io_title', 'io_sub', [f1, f2], 'io_btn', function(){
    return `<!-- ESP32 / ARDUINO FIRMWARE (C++) -->
<pre style="background:#1e1e1e; color:#d4d4d4; padding:20px; border-radius:8px; overflow:x-auto; font-family:monospace;">
#include &lt;WiFi.h&gt;

const char* ssid = "${dIo.wifi}";
const char* password = "YOUR_WIFI_PASSWORD";

// Target Sensor: ${dIo.sensor}
#define SENSOR_PIN 4 

void setup() {
  Serial.begin(115200);
  pinMode(SENSOR_PIN, INPUT);
  
  Serial.println("\\n🛸 Initializing IoT Device...");
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("\\n✅ WiFi Connected!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  int sensorValue = analogRead(SENSOR_PIN);
  
  Serial.print("📡 Broadcasting [${dIo.sensor}] Data: ");
  Serial.println(sensorValue);
  
  // Example: Send HTTP Post or MQTT Message here
  
  delay(2000);
}
</pre>`;
  });
}

/* 9. WebXR Metaverse */
var dXr = { env: 'forest', model: 'sphere' };
function renderWebXR(){
  var f1 = makeField('xr-env', t('xr_env'), 'forest / starry / tron / volcano', dXr, 'env');
  var f2 = makeField('xr-model', t('xr_model'), 'box / sphere / torus OR .glb URL', dXr, 'model');
  renderPanel('webxr', 'xr_title', 'xr_sub', [f1, f2], 'xr_btn', function(){
    
    // Determine if it's a 3D model URL or a primitive shape
    var isModelUrl = dXr.model.includes('http') || dXr.model.includes('.glb') || dXr.model.includes('.gltf');
    var shape = dXr.model.trim().toLowerCase() || 'box';
    // Ensure valid primitive tag if not a url
    var objectTag = isModelUrl ? 
      '<a-gltf-model position="0 1 -4" src="'+dXr.model+'" scale="1 1 1" animation="property: rotation; to: 0 360 0; loop: true; dur: 10000; easing: linear;"></a-gltf-model>'
      :
      '<a-'+shape+' position="0 1.5 -4" radius="1.2" rotation="0 45 0" color="#8b5cf6" material="roughness: 0.2; metalness: 0.5" animation="property: rotation; to: 0 405 0; loop: true; dur: 5000; easing: linear;"></a-'+shape+'>';

    return `<!-- A-FRAME WEBXR SCENE -->
<html>
  <head>
    <script src="https://aframe.io/releases/1.4.2/aframe.min.js"></script>
    <script src="https://unpkg.com/aframe-environment-component@1.3.3/dist/aframe-environment-component.min.js"></script>
  </head>
  <body>
    <a-scene>
      <!-- Environment -->
      <a-entity environment="preset: ${dXr.env || 'default'}; skyType: atmosphere; lighting: point"></a-entity>
      
      <!-- Primary Object -->
      ${objectTag}
      
      <!-- Particle Effects around object -->
      <a-entity position="0 1 -4" particle-system="color: #EF0000,#44CC00"></a-entity>
      
      <!-- Hands for VR -->
      <a-entity id="leftHand" laser-controls="hand: left" raycaster="objects: .clickable; far: 5"></a-entity>
      <a-entity id="rightHand" laser-controls="hand: right" raycaster="objects: .clickable; far: 5"></a-entity>

      <!-- Camera -->
      <a-camera position="0 1.6 0">
        <a-cursor color="#f43f5e"></a-cursor>
      </a-camera>
    </a-scene>
  </body>
</html>`;
  });
}

/* 10. ZK Crypto Forge */
var dZk = { secret: 'user_password', pub: 'hash_output' };
function renderZK(){
  var f1 = makeField('zk-secret', t('zk_secret'), 'Secret Variable Name', dZk, 'secret');
  var f2 = makeField('zk-pub', t('zk_public'), 'Public Output Name', dZk, 'pub');
  renderPanel('zk', 'zk_title', 'zk_sub', [f1, f2], 'zk_btn', function(){
    return `<!-- CIRCOM ZERO-KNOWLEDGE PROOF CIRCUIT -->
<pre style="background:#1e293b; color:#a78bfa; padding:20px; border-radius:8px; overflow:x-auto; font-family:monospace;">
pragma circom 2.0.0;

include "node_modules/circomlib/circuits/poseidon.circom";

/*
  🔐 ZK Circuit: Prove knowledge of [${dZk.secret}] 
  without revealing it, verifying that it hashes to [${dZk.pub}].
*/
template ZKProofAuth() {
    // Private input (Known only to prover)
    signal input ${dZk.secret};
    
    // Public output
    signal output ${dZk.pub};

    // Instantiate Poseidon Hasher
    component hasher = Poseidon(1);
    hasher.inputs[0] <== ${dZk.secret};

    // Constraint: output must equal the hash of the secret
    ${dZk.pub} <== hasher.out;
    
    // Add dummy constraint for complexity demonstration
    signal square <== ${dZk.secret} * ${dZk.secret};
}

component main = ZKProofAuth();

/*
  NEXT STEPS:
  1. Compile: circom circuit.circom --r1cs --wasm --sym
  2. Generate Witness: node generate_witness.js circuit.wasm input.json witness.wtns
  3. Setup Groth16 Prover & Verifier keys using snarkjs
*/
</pre>`;
  });
}

/* 11. WebRTC P2P */
var dWrtc = { type: 'Video Call / Data Transfer' };
function renderWebRTC(){
  var f1 = makeField('wrtc-type', t('webrtc_type'), 'Video / Data', dWrtc, 'type');
  renderPanel('webrtc', 'webrtc_title', 'webrtc_sub', [f1], 'webrtc_btn', function(){
    return `<!-- SERVERLESS WEBRTC P2P ENGINE -->
<html>
<head>
  <style>
    body { background: #0f172a; color: white; font-family: sans-serif; text-align: center; }
    video { width: 45%; border: 3px solid #38bdf8; border-radius: 12px; background: #000; margin: 10px; }
    button { padding: 10px 20px; background: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
    textarea { width: 80%; height: 60px; background: #1e293b; color: #a78bfa; border: 1px solid #38bdf8; border-radius: 6px; padding: 10px; margin: 10px 0; }
  </style>
</head>
<body>
  <h2>🌐 WebRTC Peer-to-Peer (${dWrtc.type})</h2>
  <div style="display:flex; justify-content:center;">
    <video id="localVideo" autoplay playsinline muted></video>
    <video id="remoteVideo" autoplay playsinline></video>
  </div>
  <div>
    <button onclick="createOffer()">1. Create Offer</button>
    <button onclick="acceptOffer()">3. Accept Offer</button>
  </div>
  <p>SDP Token Data (Share this manually to connect without a server):</p>
  <textarea id="sdpData" placeholder="Paste SDP token here..."></textarea>

  <script>
    let localStream, peerConnection;
    const servers = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
    
    // Auto-start camera
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      document.getElementById('localVideo').srcObject = stream;
      localStream = stream;
    });

    async function initPC() {
      peerConnection = new RTCPeerConnection(servers);
      localStream.getTracks().forEach(t => peerConnection.addTrack(t, localStream));
      peerConnection.ontrack = (event) => {
        document.getElementById('remoteVideo').srcObject = event.streams[0];
      };
      peerConnection.onicecandidate = (event) => {
        // Wait until all ICE candidates are gathered
        if (event.candidate === null) {
          document.getElementById('sdpData').value = JSON.stringify(peerConnection.localDescription);
          if (peerConnection.localDescription.type === 'answer') {
            alert("Answer generated! Share this back to the caller.");
          }
        }
      };
    }

    async function createOffer() {
      document.getElementById('sdpData').value = "Gathering network data (ICE)... Please wait 2-3 seconds.";
      await initPC();
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      // ICE candidates will fire and update the textarea when complete
    }

    async function acceptOffer() {
      try {
        const offerStr = document.getElementById('sdpData').value;
        const offerData = JSON.parse(offerStr);
        
        if(!peerConnection) await initPC();
        
        if(offerData.type === 'offer') {
          document.getElementById('sdpData').value = "Connecting and gathering return data... Please wait 2-3 seconds.";
          await peerConnection.setRemoteDescription(new RTCSessionDescription(offerData));
          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);
          // ICE candidates will fire and update textarea with answer when complete
        } else if (offerData.type === 'answer') {
          await peerConnection.setRemoteDescription(new RTCSessionDescription(offerData));
          alert("Connected! Video should appear now.");
        }
      } catch(e) {
        alert("Error: Invalid Token Data. Make sure you copied the ENTIRE text.");
      }
    }
  </script>
</body>
</html>`;
  });
}

/* 12. 3D Geo-Mapping */
var dGeo = { coord: '48.8584, 2.2945' };
function renderGeoMap(){
  var f1 = makeField('geo-coord', t('geo_coord'), '48.8584, 2.2945 (Paris)', dGeo, 'coord');
  renderPanel('geomap', 'geo_title', 'geo_sub', [f1], 'geo_btn', function(){
    let coords = dGeo.coord.split(',');
    let lat = coords[0] ? coords[0].trim() : '48.8584';
    let lng = coords[1] ? coords[1].trim() : '2.2945';
    return `<!-- 3D EARTH GLOBE ENGINE (Three.js) -->
<html>
<head>
  <style> body { margin: 0; overflow: hidden; background: #000; } </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
</head>
<body>
  <div style="position:absolute; top:20px; left:20px; color:#fff; font-family:sans-serif; background:rgba(0,0,0,0.7); padding:15px; border-radius:8px; border:1px solid #38bdf8;">
    <h3>🛰️ Geo-Satellite Tracker</h3>
    <p>Target: Lat ${lat}, Lng ${lng}</p>
  </div>
  <script>
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Earth Sphere
    const geometry = new THREE.SphereGeometry(5, 64, 64);
    
    // High-res earth texture
    const textureLoader = new THREE.TextureLoader();
    const material = new THREE.MeshPhongMaterial({
      map: textureLoader.load('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg'),
      bumpMap: textureLoader.load('https://unpkg.com/three-globe/example/img/earth-topology.png'),
      bumpScale: 0.05
    });
    
    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    // Marker Function
    function addMarker(lat, lng, color) {
      const r = 5.05;
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);

      const markerGeo = new THREE.SphereGeometry(0.1, 16, 16);
      const markerMat = new THREE.MeshBasicMaterial({ color: color });
      const marker = new THREE.Mesh(markerGeo, markerMat);

      marker.position.x = -(r * Math.sin(phi) * Math.cos(theta));
      marker.position.z = (r * Math.sin(phi) * Math.sin(theta));
      marker.position.y = (r * Math.cos(phi));
      scene.add(marker);
      
      // Ping ring
      const ringGeo = new THREE.RingGeometry(0.12, 0.15, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide, transparent:true, opacity:0.8 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(marker.position);
      ring.lookAt(new THREE.Vector3(0,0,0));
      scene.add(ring);
    }

    addMarker(${lat}, ${lng}, 0xf43f5e);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1.2, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    camera.position.z = 12;

    function animate() {
      requestAnimationFrame(animate);
      earth.rotation.y += 0.001; // slow rotation
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  </script>
</body>
</html>`;
  });
}

/* 13. AI Agent Swarm */
var dSw = { agents: '3' };
function renderAiSwarm(){
  var f1 = makeField('sw-agents', t('swarm_agents'), '3', dSw, 'agents');
  renderPanel('aiswarm', 'swarm_title', 'swarm_sub', [f1], 'swarm_btn', function(){
    return `<!-- NODE.JS AI AGENT SWARM FRAMEWORK -->
<!-- Requires: npm install openai axios -->
<pre style="background:#1e1e1e; color:#d4d4d4; padding:20px; border-radius:8px; overflow:x-auto; font-family:monospace;">
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

console.log("🤖 Initializing AI Swarm with ${dSw.agents} Agents...");

class AIAgent {
  constructor(name, role) {
    this.name = name;
    this.role = role;
    this.memory = [];
  }

  async think(prompt, context) {
    console.log(\`[\\x1b[36m\${this.name}\\x1b[0m] Thinking about: \${prompt}\`);
    const messages = [
      { role: "system", content: \`You are \${this.name}, your role is \${this.role}. Respond intelligently.\` },
      ...this.memory,
      { role: "user", content: \`Context: \${context}\\nTask: \${prompt}\` }
    ];

    /* 
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: messages,
    });
    const response = completion.data.choices[0].message.content;
    */
    
    // Mock response for simulation
    const response = \`Based on my role as \${this.role}, I suggest we implement the solution carefully.\`;
    
    this.memory.push({ role: "assistant", content: response });
    return response;
  }
}

async function runSwarm() {
  const Manager = new AIAgent("Alice", "Project Manager");
  const Coder = new AIAgent("Bob", "Lead Developer");
  const Reviewer = new AIAgent("Charlie", "Security Auditor");

  let sharedContext = "Build a secure authentication system.";
  
  let req = await Manager.think("Outline the steps", sharedContext);
  console.log(\`\\nManager says: \${req}\\n\`);
  
  let code = await Coder.think("Write the auth code based on the outline", req);
  console.log(\`\\nCoder says: \${code}\\n\`);
  
  let review = await Reviewer.think("Audit the code for security flaws", code);
  console.log(\`\\nReviewer says: \${review}\\n\`);
  
  console.log("✅ Swarm Task Completed.");
}

runSwarm();
</pre>`;
  });
}

/* 14. Biotech DNA Visualizer */
var dBio = { seq: 'ATGCGATACGCTTACGATCGATCG' };
function renderBiotech(){
  var f1 = makeField('bio-seq', t('bio_seq'), 'ATGCGATACGCTTACGATCGATCG', dBio, 'seq');
  renderPanel('biotech', 'bio_title', 'bio_sub', [f1], 'bio_btn', function(){
    return `<!-- BIOINFORMATICS DNA VISUALIZER -->
<html>
<head>
  <style> body { margin:0; overflow:hidden; background:#0c0a15; } canvas { display:block; } </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
</head>
<body>
  <div style="position:absolute; top:20px; left:20px; color:#a78bfa; font-family:monospace; font-size:18px;">
    🧬 DNA Sequence: <br><span style="color:#38bdf8; word-break:break-all;">${dBio.seq}</span>
  </div>
  <script>
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#0c0a15', 0.05);
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // DNA Colors
    const colors = { 'A': 0xf43f5e, 'T': 0x3b82f6, 'C': 0x10b981, 'G': 0xf59e0b };
    const seq = "${dBio.seq}".toUpperCase();

    const group = new THREE.Group();
    
    for (let i = 0; i < seq.length; i++) {
      let base = seq[i];
      let color1 = colors[base] || 0xffffff;
      let color2 = base === 'A' ? colors['T'] : (base === 'T' ? colors['A'] : (base === 'C' ? colors['G'] : colors['C']));

      let y = i * 0.8 - (seq.length * 0.8 / 2);
      let angle = i * 0.5;

      let r = 2;
      let x1 = Math.cos(angle) * r;
      let z1 = Math.sin(angle) * r;
      let x2 = Math.cos(angle + Math.PI) * r;
      let z2 = Math.sin(angle + Math.PI) * r;

      // Spheres
      let geoSphere = new THREE.SphereGeometry(0.3, 16, 16);
      let m1 = new THREE.Mesh(geoSphere, new THREE.MeshPhongMaterial({color: color1}));
      m1.position.set(x1, y, z1);
      group.add(m1);

      let m2 = new THREE.Mesh(geoSphere, new THREE.MeshPhongMaterial({color: color2}));
      m2.position.set(x2, y, z2);
      group.add(m2);

      // Connection line
      let path = new THREE.LineCurve3(new THREE.Vector3(x1, y, z1), new THREE.Vector3(x2, y, z2));
      let geoTube = new THREE.TubeGeometry(path, 1, 0.05, 8, false);
      let matTube = new THREE.MeshPhongMaterial({color: 0x94a3b8});
      let connection = new THREE.Mesh(geoTube, matTube);
      group.add(connection);
    }

    scene.add(group);

    const light1 = new THREE.PointLight(0xffffff, 1);
    light1.position.set(10, 10, 10);
    scene.add(light1);
    
    const light2 = new THREE.PointLight(0x8b5cf6, 2);
    light2.position.set(-10, -10, -10);
    scene.add(light2);

    camera.position.z = 15;

    function animate() {
      requestAnimationFrame(animate);
      group.rotation.y += 0.01;
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  </script>
</body>
</html>`;
  });
}

/* 15. Holographic HUD */
var dHud = { color: '#00ffff' };
function renderHUD(){
  var f1 = makeField('hud-color', t('hud_color'), '#00ffff', dHud, 'color');
  renderPanel('hud', 'hud_title', 'hud_sub', [f1], 'hud_btn', function(){
    return `<!-- HOLOGRAPHIC SCI-FI HUD -->
<html>
<head>
  <style>
    body { margin: 0; background: #000; overflow: hidden; display: flex; justify-content: center; align-items: center; height: 100vh; font-family: 'Courier New', Courier, monospace; }
    
    .hud-container {
      position: relative;
      width: 800px;
      height: 600px;
      perspective: 1000px;
    }

    .holo-panel {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 2px solid ${dHud.color};
      box-shadow: 0 0 20px ${dHud.color}, inset 0 0 20px ${dHud.color};
      background: rgba(0, 255, 255, 0.05);
      transform: rotateX(15deg) rotateY(-10deg);
      border-radius: 20px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      padding: 30px;
      box-sizing: border-box;
      animation: float 4s infinite alternate ease-in-out;
    }

    .scanline {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 5px;
      background: ${dHud.color};
      opacity: 0.5;
      animation: scan 3s infinite linear;
      box-shadow: 0 0 10px ${dHud.color};
    }

    @keyframes scan {
      0% { top: -10%; }
      100% { top: 110%; }
    }

    @keyframes float {
      0% { transform: rotateX(15deg) rotateY(-10deg) translateY(0); }
      100% { transform: rotateX(15deg) rotateY(-10deg) translateY(-20px); }
    }

    .data-row { display: flex; justify-content: space-between; margin-bottom: 20px; color: ${dHud.color}; text-shadow: 0 0 5px ${dHud.color}; }
    .data-box { border: 1px solid ${dHud.color}; padding: 10px; width: 30%; text-align: center; background: rgba(0,0,0,0.5); }
    
    .circle-radar {
      position: absolute;
      bottom: 30px; left: 30px;
      width: 150px; height: 150px;
      border-radius: 50%;
      border: 2px dashed ${dHud.color};
      animation: spin 10s infinite linear;
    }

    @keyframes spin { 100% { transform: rotate(360deg); } }

    h1 { margin: 0 0 20px; font-size: 32px; color: ${dHud.color}; text-shadow: 0 0 10px ${dHud.color}; border-bottom: 1px solid ${dHud.color}; padding-bottom: 10px; }
  </style>
</head>
<body>
  <div class="hud-container">
    <div class="holo-panel">
      <div class="scanline"></div>
      <h1>SYSTEM ONLINE.</h1>
      <div class="data-row">
        <div class="data-box">CORE TEMP<br><br><span style="font-size:24px;">34.2°C</span></div>
        <div class="data-box">NETWORK<br><br><span style="font-size:24px;">SECURE</span></div>
        <div class="data-box">ENERGY<br><br><span style="font-size:24px;">98%</span></div>
      </div>
      <div class="data-row" style="margin-top:auto; justify-content:flex-end;">
        <p style="color:${dHud.color}; text-shadow:0 0 5px ${dHud.color};">>>> INITIALIZING PROTOCOLS...</p>
      </div>
      <div class="circle-radar"></div>
    </div>
  </div>
  <script>
    // Add interactivity
    document.addEventListener('mousemove', (e) => {
      const panel = document.querySelector('.holo-panel');
      const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
      panel.style.transform = \`rotateY(\${-10 + xAxis}deg) rotateX(\${15 + yAxis}deg)\`;
    });
  </script>
</body>
</html>`;
  });
}

// Hook into the tab system
document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;
  var fTechTabs = ['web3studio','extgen','scraperbot','gameengine','cloudarch', 'neuralnet', 'quantum', 'iot', 'webxr', 'zk', 'webrtc', 'geomap', 'aiswarm', 'biotech', 'hud'];
  
  window.renderTab = function(tab){
    if(fTechTabs.includes(tab)){
      window.activeTab=tab;
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var b1=document.getElementById('tab-'+tab);if(b1)b1.classList.add('active');
      
      if(tab==='web3studio') renderWeb3();
      else if(tab==='extgen') renderExtGen();
      else if(tab==='scraperbot') renderScraper();
      else if(tab==='gameengine') renderGame();
      else if(tab==='cloudarch') renderCloud();
      else if(tab==='neuralnet') renderNeuralNet();
      else if(tab==='quantum') renderQuantum();
      else if(tab==='iot') renderIoT();
      else if(tab==='webxr') renderWebXR();
      else if(tab==='zk') renderZK();
      else if(tab==='webrtc') renderWebRTC();
      else if(tab==='geomap') renderGeoMap();
      else if(tab==='aiswarm') renderAiSwarm();
      else if(tab==='biotech') renderBiotech();
      else if(tab==='hud') renderHUD();
      return;
    }
    if(typeof oRT==='function')oRT(tab);
  };
  
  var oAL=window.applyLang;
  window.applyLang = function(){
    if(typeof oAL==='function')oAL();
    var e1=document.getElementById('lbl-tab-web3studio');if(e1)e1.textContent=t('w3_tab');
    var e2=document.getElementById('lbl-tab-extgen');if(e2)e2.textContent=t('ex_tab');
    var e3=document.getElementById('lbl-tab-scraperbot');if(e3)e3.textContent=t('sc_tab');
    var e4=document.getElementById('lbl-tab-gameengine');if(e4)e4.textContent=t('gm_tab');
    var e5=document.getElementById('lbl-tab-cloudarch');if(e5)e5.textContent=t('cl_tab');
    var e6=document.getElementById('lbl-tab-neuralnet');if(e6)e6.textContent=t('nn_tab');
    var e7=document.getElementById('lbl-tab-quantum');if(e7)e7.textContent=t('qu_tab');
    var e8=document.getElementById('lbl-tab-iot');if(e8)e8.textContent=t('io_tab');
    var e9=document.getElementById('lbl-tab-webxr');if(e9)e9.textContent=t('xr_tab');
    var e10=document.getElementById('lbl-tab-zk');if(e10)e10.textContent=t('zk_tab');
    var e11=document.getElementById('lbl-tab-webrtc');if(e11)e11.textContent=t('webrtc_tab');
    var e12=document.getElementById('lbl-tab-geomap');if(e12)e12.textContent=t('geo_tab');
    var e13=document.getElementById('lbl-tab-aiswarm');if(e13)e13.textContent=t('swarm_tab');
    var e14=document.getElementById('lbl-tab-biotech');if(e14)e14.textContent=t('bio_tab');
    var e15=document.getElementById('lbl-tab-hud');if(e15)e15.textContent=t('hud_tab');
    
    if(fTechTabs.includes(window.activeTab)){
      window.renderTab(window.activeTab); // Re-render to apply language
    }
  };
});

})();
