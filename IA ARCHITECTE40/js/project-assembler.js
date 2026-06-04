/**
 * 📂 Multi-File Project Assembler v1.0
 * IA Architecte — Code Studio Pro | EN/FR Bilingual
 * Fully decoupled script using decorator pattern
 */
(function() {
'use strict';

const TX = {
  en: {
    tab: 'Multi-File',
    title: '📂 Multi-File Project Assembler',
    sub: 'Manage multiple files and folders, export structured ZIPs',
    desc: 'Assemble real modular apps. Switch files in the explorer tree to edit them in Monaco. Download the full project as a standalone ZIP archive.',
    btnNew: '📄 New File',
    btnDelete: '🗑️ Delete',
    btnExport: '📦 Export structured ZIP',
    lblTree: 'Project Workspace',
    lblBlueprints: 'Project Templates / Blueprints',
    promptName: 'Enter new file name (e.g. contact.html, style.css):',
    invalidName: '⚠️ Invalid file name or file already exists.',
    cantDelete: '⚠️ You cannot delete index.html (the main project entry).',
    confirmDelete: 'Are you sure you want to delete ',
    zipDone: '✅ ZIP folder compiled and downloaded successfully!',
    bps: {
      dash: '📊 Admin Dashboard & Auth (3 files)',
      dashDesc: 'Includes Login page, Dashboard panel, style and routing scripts.',
      portfolio: '💼 Multi-page Portfolio (4 files)',
      portfolioDesc: 'Home page, About, Contact, Styles and nav highlights.',
      checkout: '🛒 Landing & Checkout Cart (4 files)',
      checkoutDesc: 'Landing page, checkout form, price calculations and style.'
    }
  },
  fr: {
    tab: 'Multi-Fichiers',
    title: '📂 Assembleur de Projet Multi-Fichiers',
    sub: 'Gérez plusieurs fichiers et dossiers, exportez en archive ZIP',
    desc: 'Assemblez des applications modulaires réelles. Changez de fichier dans l\'arborescence pour l\'éditer dans Monaco. Téléchargez le projet complet au format ZIP.',
    btnNew: '📄 Nouveau Fichier',
    btnDelete: '🗑️ Supprimer',
    btnExport: '📦 Exporter le ZIP structuré',
    lblTree: 'Espace de Travail',
    lblBlueprints: 'Modèles / Blueprints de Projet',
    promptName: 'Entrez le nom du nouveau fichier (ex: contact.html, style.css) :',
    invalidName: '⚠️ Nom de fichier invalide ou déjà existant.',
    cantDelete: '⚠️ Vous ne pouvez pas supprimer index.html (l\'entrée principale).',
    confirmDelete: 'Êtes-vous sûr de vouloir supprimer ',
    zipDone: '✅ Archive ZIP compilée et téléchargée avec succès !',
    bps: {
      dash: '📊 Dashboard Admin & Auth (3 fichiers)',
      dashDesc: 'Comprend la page de connexion, le panneau admin, le style et les scripts de routage.',
      portfolio: '💼 Portfolio Multi-pages (4 fichiers)',
      portfolioDesc: 'Page d\'accueil, À propos, Contact, Styles et surbrillance nav.',
      checkout: '🛒 Landing & Panier de Caisse (4 fichiers)',
      checkoutDesc: 'Page de vente, formulaire de paiement, calculs de prix et style.'
    }
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

// Virtual File System (VFS) State
let vfs = {
  "index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Multi-File Studio</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav class="navbar">
    <a href="index.html" class="active">Home</a>
    <a href="about.html">About</a>
  </nav>
  <main class="container">
    <h1>Welcome to IA Architecte</h1>
    <p>This is index.html. Edit other files in the left workspace panel!</p>
    <button class="btn" onclick="sayHello()">Click Me</button>
  </main>
  <script src="app.js"></script>
</body>
</html>`,
  "style.css": `body {
  font-family: system-ui, sans-serif;
  background: #0f172a;
  color: #f1f5f9;
  margin: 0;
  padding: 0;
}
.navbar {
  display: flex;
  gap: 15px;
  background: #1e293b;
  padding: 15px 30px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.navbar a {
  color: #94a3b8;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
}
.navbar a.active {
  color: #38bdf8;
}
.container {
  padding: 40px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}
.btn {
  background: #38bdf8;
  color: #0f172a;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 15px;
}`,
  "app.js": `function sayHello() {
  alert("Hello from app.js!");
}`,
  "about.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>About Us</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav class="navbar">
    <a href="index.html">Home</a>
    <a href="about.html" class="active">About</a>
  </nav>
  <main class="container">
    <h1>About Our Project</h1>
    <p>This page was created dynamically inside the Multi-File Assembler tab.</p>
  </main>
</body>
</html>`
};

let activeFile = 'index.html';

// ── CRC32 & ZIP encoder helper to avoid external dependencies ──────────────
function crc32(buf) {
  let table = [];
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    table[i] = c;
  }
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}

function compileZip(files) {
  const encoder = new TextEncoder();
  let localHeaders = [];
  let centralDirs = [];
  let offset = 0;

  Object.keys(files).forEach(filename => {
    const data = encoder.encode(files[filename]);
    const size = data.length;
    const nameData = encoder.encode(filename);
    const nameLen = nameData.length;
    const crc = crc32(data);

    // Date/Time bytes (constant representation for simplicity: 2026-06-01 12:00:00)
    const time = 0x6000; 
    const date = 0x5CC1;

    // 1. Local File Header
    const lfHeader = new Uint8Array(30 + nameLen);
    const view = new DataView(lfHeader.buffer);
    view.setUint32(0, 0x04034b50, true); // Local file header signature
    view.setUint16(4, 10, true);         // Version needed to extract
    view.setUint16(6, 0, true);          // General purpose bit flag
    view.setUint16(8, 0, true);          // Compression method (0 = uncompressed)
    view.setUint16(10, time, true);      // Last mod file time
    view.setUint16(12, date, true);      // Last mod file date
    view.setUint32(14, crc, true);       // CRC-32
    view.setUint32(18, size, true);      // Compressed size
    view.setUint32(22, size, true);      // Uncompressed size
    view.setUint16(26, nameLen, true);   // File name length
    view.setUint16(28, 0, true);          // Extra field length
    lfHeader.set(nameData, 30);

    const fileBlock = new Uint8Array(lfHeader.length + size);
    fileBlock.set(lfHeader, 0);
    fileBlock.set(data, lfHeader.length);
    localHeaders.push(fileBlock);

    // 2. Central Directory Header
    const cdHeader = new Uint8Array(46 + nameLen);
    const cdView = new DataView(cdHeader.buffer);
    cdView.setUint32(0, 0x02014b50, true); // Central directory header signature
    cdView.setUint16(4, 20, true);         // Version made by
    cdView.setUint16(6, 10, true);         // Version needed to extract
    cdView.setUint16(8, 0, true);          // General purpose bit flag
    cdView.setUint16(10, 0, true);         // Compression method
    cdView.setUint16(12, time, true);      // Last mod file time
    cdView.setUint16(14, date, true);      // Last mod file date
    cdView.setUint32(16, crc, true);       // CRC-32
    cdView.setUint32(20, size, true);      // Compressed size
    cdView.setUint32(24, size, true);      // Uncompressed size
    cdView.setUint16(28, nameLen, true);   // File name length
    cdView.setUint16(30, 0, true);         // Extra field length
    cdView.setUint16(32, 0, true);         // File comment length
    cdView.setUint16(34, 0, true);         // Disk number start
    cdView.setUint16(36, 0, true);         // Internal file attributes
    cdView.setUint32(38, 0, true);         // External file attributes
    cdView.setUint32(42, offset, true);     // Local header offset
    cdHeader.set(nameData, 46);
    centralDirs.push(cdHeader);

    offset += fileBlock.length;
  });

  const localLen = localHeaders.reduce((sum, block) => sum + block.length, 0);
  const cdLen = centralDirs.reduce((sum, block) => sum + block.length, 0);

  // 3. End of Central Directory Record
  const eocd = new Uint8Array(22);
  const eocdView = new DataView(eocd.buffer);
  eocdView.setUint32(0, 0x06054b50, true); // EOCD signature
  eocdView.setUint16(4, 0, true);          // Number of this disk
  eocdView.setUint16(6, 0, true);          // Disk where central directory starts
  eocdView.setUint16(8, Object.keys(files).length, true); // Central directory records on this disk
  eocdView.setUint16(10, Object.keys(files).length, true); // Total central directory records
  eocdView.setUint32(12, cdLen, true);     // Size of central directory
  eocdView.setUint32(16, localLen, true);  // Offset of start of central directory
  eocdView.setUint16(20, 0, true);         // Comment length

  const zipData = new Uint8Array(localLen + cdLen + eocd.length);
  let curPos = 0;
  localHeaders.forEach(block => { zipData.set(block, curPos); curPos += block.length; });
  centralDirs.forEach(block => { zipData.set(block, curPos); curPos += block.length; });
  zipData.set(eocd, curPos);

  return zipData;
}

function triggerZipDownload() {
  // Sync current editor text before zipping
  if (window.editor) {
    vfs[activeFile] = window.editor.getValue();
  }
  const zipBuffer = compileZip(vfs);
  const blob = new Blob([zipBuffer], { type: 'application/zip' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ia-project-bundle.zip';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  if (window.showToast) window.showToast(t('zipDone'));
}

function selectFile(filename) {
  if (window.editor) {
    // Save current active buffer
    vfs[activeFile] = window.editor.getValue();
  }
  
  activeFile = filename;
  
  if (window.editor) {
    window.editor.setValue(vfs[filename]);
    // Try to update Monaco model syntax highlighting based on extension
    const ext = filename.split('.').pop();
    let mode = 'html';
    if (ext === 'css') mode = 'css';
    else if (ext === 'js') mode = 'javascript';
    
    const model = window.editor.getModel();
    if (model && window.monaco) {
       window.monaco.editor.setModelLanguage(model, mode);
    }
  }
  
  if (window.runPreview) window.runPreview();
  renderProjectTree();
}

function createNewFile() {
  const name = prompt(t('promptName'));
  if (!name) return;
  const clean = name.trim();
  if (clean.length < 3 || vfs[clean] || !/^[a-zA-Z0-9_\-\.]+$/.test(clean)) {
    alert(t('invalidName'));
    return;
  }
  
  vfs[clean] = `<!-- file: ${clean} -->\n`;
  selectFile(clean);
}

function deleteActiveFile() {
  if (activeFile === 'index.html') {
    alert(t('cantDelete'));
    return;
  }
  if (confirm(t('confirmDelete') + activeFile + '?')) {
    delete vfs[activeFile];
    selectFile('index.html');
  }
}

// Blueprints definitions
const BLUEPRINTS = {
  dash: {
    "index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"><title>Login — Admin Dashboard</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="auth-card">
    <h2>Secure Auth Portal</h2>
    <input type="text" id="user" placeholder="Username">
    <input type="password" id="pass" placeholder="Password">
    <button class="btn" onclick="handleLogin()">Login →</button>
  </div>
  <script src="router.js"></script>
</body>
</html>`,
    "dashboard.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"><title>Admin Portal</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div style="display:flex; height:100vh;">
    <aside class="sidebar">
      <h3>Admin Panel</h3>
      <a href="dashboard.html" class="active">📊 Overview</a>
      <a href="index.html">🚪 Log Out</a>
    </aside>
    <main style="flex:1; padding:30px;">
      <h2>Dashboard Overview</h2>
      <p>Welcome back! You are logged in.</p>
    </main>
  </div>
</body>
</html>`,
    "style.css": `body { font-family: system-ui, sans-serif; background: #0b0f19; color: #cbd5e1; margin:0; }
.auth-card { max-width: 360px; margin: 100px auto; background: #111827; border: 1px solid rgba(255,255,255,0.08); padding: 30px; border-radius: 16px; text-align:center; }
input { width: 100%; padding: 10px; margin-bottom: 12px; background: #1f2937; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color:#fff; outline:none; }
.btn { background: #6366f1; color: #fff; width:100%; border:none; padding:12px; border-radius:8px; font-weight:700; cursor:pointer; }
.sidebar { width: 220px; background: #111827; padding: 20px; border-right: 1px solid rgba(255,255,255,0.08); }
.sidebar a { display:block; color:#94a3b8; padding:10px; text-decoration:none; margin-bottom:5px; border-radius:6px; }
.sidebar a.active { background:#6366f1; color:#fff; }`,
    "router.js": `function handleLogin() {
  const u = document.getElementById("user").value;
  const p = document.getElementById("pass").value;
  if(u === "admin" && p === "admin") {
    window.location.href = "dashboard.html";
  } else {
    alert("Incorrect credentials! Try admin / admin");
  }
}`
  },
  portfolio: {
    "index.html": `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"><title>Home — My Portfolio</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav class="nav">
    <a href="index.html" class="active">Home</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
  </nav>
  <div class="hero">
    <h1>Creative Designer & Developer</h1>
    <p>Building gorgeous user interfaces for the modern web.</p>
  </div>
</body>
</html>`,
    "about.html": `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"><title>About Me</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav class="nav">
    <a href="index.html">Home</a>
    <a href="about.html" class="active">About</a>
    <a href="contact.html">Contact</a>
  </nav>
  <div class="container">
    <h2>About Me</h2>
    <p>Passionate about WebGL, 3D graphics and responsive CSS code.</p>
  </div>
</body>
</html>`,
    "contact.html": `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"><title>Contact Me</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav class="nav">
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="contact.html" class="active">Contact</a>
  </nav>
  <div class="container">
    <h2>Contact</h2>
    <input placeholder="Name"><br/><br/>
    <button class="btn">Send</button>
  </div>
</body>
</html>`,
    "style.css": `body { font-family: system-ui, sans-serif; background: #090d16; color: #e2e8f0; margin:0; }
.nav { display:flex; gap:15px; padding:20px; background: rgba(255,255,255,0.02); }
.nav a { color:#64748b; text-decoration:none; font-weight:700; }
.nav a.active { color:#ec4899; }
.hero { text-align:center; padding: 100px 20px; }
.container { padding: 40px; text-align:center; }
.btn { background:#ec4899; color:#fff; border:none; padding:10px 20px; border-radius:20px; cursor:pointer; }`
  },
  checkout: {
    "index.html": `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"><title>Product Page</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>SaaS Starter Plan</h1>
    <p class="price">$19 / month</p>
    <a href="checkout.html" class="btn">Go to Checkout →</a>
  </div>
</body>
</html>`,
    "checkout.html": `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"><title>Checkout</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h2>Complete Payment</h2>
    <div style="margin:20px 0;">Total Amount: <b>$19.00</b></div>
    <input placeholder="Card Number" type="text"><br/><br/>
    <button class="btn" onclick="pay()">Pay Now</button>
  </div>
  <script src="checkout.js"></script>
</body>
</html>`,
    "checkout.js": `function pay() {
  alert("Payment simulated successfully! Thank you.");
}`,
    "style.css": `body { font-family: system-ui; background:#fafafa; text-align:center; padding-top:80px; }
.container { max-width: 400px; margin: 0 auto; background:#fff; padding:30px; border-radius:12px; box-shadow:0 4px 10px rgba(0,0,0,0.05); }
.price { font-size: 28px; font-weight:bold; color:#10b981; margin:15px 0; }
.btn { display:inline-block; text-decoration:none; background:#10b981; color:#fff; border:none; padding:12px 24px; border-radius:6px; font-weight:700; cursor:pointer; }
input { padding: 10px; width: 100%; border:1px solid #ddd; border-radius:6px; }`
  }
};

function loadBlueprint(key) {
  if (confirm(t('confirmDelete') + 'your entire current files set?')) {
    vfs = Object.assign({}, BLUEPRINTS[key]);
    selectFile('index.html');
  }
}

function renderProjectTree() {
  const treeEl = document.getElementById('project-tree-list');
  if(!treeEl) return;
  treeEl.innerHTML = '';
  
  Object.keys(vfs).forEach(filename => {
    const isActive = filename === activeFile;
    const item = document.createElement('div');
    item.style = `display:flex; align-items:center; justify-content:space-between; padding:6px 10px;
      margin-bottom:4px; border-radius:6px; cursor:pointer; font-size:11.5px; font-family:'Inter', sans-serif;
      background: ${isActive ? 'linear-gradient(135deg,rgba(168,85,247,0.15),rgba(59,130,246,0.15))' : 'rgba(255,255,255,0.02)'};
      border: 1px solid ${isActive ? 'rgba(168,85,247,0.3)' : 'rgba(255,255,255,0.05)'};
      color: ${isActive ? '#e9d5ff' : '#cbd5e1'};`;
      
    const leftPart = document.createElement('div');
    leftPart.style = 'display:flex; align-items:center; gap:8px; overflow:hidden; white-space:nowrap; text-overflow:ellipsis;';
    const ext = filename.split('.').pop();
    const icon = ext === 'html' ? '📄' : ext === 'css' ? '🎨' : '⚡';
    leftPart.innerHTML = `<span style="font-size:12px;">${icon}</span><span style="overflow:hidden; text-overflow:ellipsis;">${filename}</span>`;
    item.appendChild(leftPart);
    
    item.onclick = function(e) {
      if(e.target.closest('.del-btn')) return;
      selectFile(filename);
    };

    if (filename !== 'index.html') {
      const del = document.createElement('span');
      del.className = 'del-btn';
      del.innerHTML = '✕';
      del.style = 'font-size:10px; color:#f87171; font-weight:800; cursor:pointer; padding:2px 6px; border-radius:4px; transition: background 0.2s;';
      del.onmouseover = function() { del.style.background = 'rgba(239,68,68,0.15)'; };
      del.onmouseout = function() { del.style.background = 'transparent'; };
      del.onclick = function() {
        if(confirm(t('confirmDelete') + filename + '?')) {
          delete vfs[filename];
          if(activeFile === filename) selectFile('index.html');
          else renderProjectTree();
        }
      };
      item.appendChild(del);
    }
    
    treeEl.appendChild(item);
  });
}

function renderAssemblerTab() {
  const parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';

  const wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0f172a;';

  const hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(168,85,247,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#c084fc;">' + t('title') + '</div>' +
                  '<div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  const body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:12px;min-height:0;scrollbar-width:thin;';

  // Description
  const dNode = document.createElement('div');
  dNode.style = 'font-size:10.5px;color:#94a3b8;line-height:1.5;';
  dNode.textContent = t('desc');
  body.appendChild(dNode);

  // File tree header & add button
  const treeHdr = document.createElement('div');
  treeHdr.style = 'display:flex;justify-content:space-between;align-items:center;margin-top:5px;';
  treeHdr.innerHTML = '<span style="font-size:9.5px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">' + t('lblTree') + '</span>';
  const newBtn = document.createElement('button');
  newBtn.textContent = t('btnNew');
  newBtn.style = 'background:rgba(168,85,247,0.15);color:#c084fc;border:1px solid rgba(168,85,247,0.3);border-radius:6px;padding:3px 8px;font-size:9.5px;font-weight:700;cursor:pointer;';
  newBtn.onclick = createNewFile;
  treeHdr.appendChild(newBtn);
  body.appendChild(treeHdr);

  // Tree container
  const treeList = document.createElement('div');
  treeList.id = 'project-tree-list';
  treeList.style = 'display:flex;flex-direction:column;gap:2px;max-height:160px;overflow-y:auto;scrollbar-width:thin;';
  body.appendChild(treeList);

  // ZIP download button
  const zipBtn = document.createElement('button');
  zipBtn.textContent = t('btnExport');
  zipBtn.style = 'background:linear-gradient(135deg, #a855f7, #6366f1);color:#fff;border:none;border-radius:8px;padding:11px;font-weight:900;font-size:11px;cursor:pointer;box-shadow:0 4px 15px rgba(168,85,247,0.25);';
  zipBtn.onclick = triggerZipDownload;
  body.appendChild(zipBtn);

  // Blueprints block
  const bpSection = document.createElement('div');
  bpSection.style = 'margin-top:10px;display:flex;flex-direction:column;gap:6px;';
  bpSection.innerHTML = '<div style="font-size:9.5px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:4px;">' + t('lblBlueprints') + '</div>';

  const listBps = [
    { id: 'dash', name: t('bps.dash'), desc: t('bps.dashDesc') },
    { id: 'portfolio', name: t('bps.portfolio'), desc: t('bps.portfolioDesc') },
    { id: 'checkout', name: t('bps.checkout'), desc: t('bps.checkoutDesc') }
  ];

  listBps.forEach(bp => {
     const card = document.createElement('div');
     card.style = 'background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:10px;cursor:pointer;transition:all 0.2s;';
     card.onmouseover = function() { card.style.borderColor = 'rgba(168,85,247,0.3)'; };
     card.onmouseout = function() { card.style.borderColor = 'rgba(255,255,255,0.06)'; };
     card.innerHTML = `<div style="font-size:11px;font-weight:800;color:#e2e8f0;margin-bottom:3px;">${bp.name}</div>` +
                      `<div style="font-size:9.5px;color:#64748b;line-height:1.3;">${bp.desc}</div>`;
     card.onclick = function() { loadBlueprint(bp.id); };
     bpSection.appendChild(card);
  });
  body.appendChild(bpSection);

  wrap.appendChild(body);
  parent.appendChild(wrap);

  renderProjectTree();
}

// Sync buffer on editor input (Auto-saving active tab file in Monaco)
setInterval(() => {
  if (window.activeTab === 'projectassembler' && window.editor) {
    vfs[activeFile] = window.editor.getValue();
  }
}, 1000);

// Hook tab triggers
document.addEventListener('DOMContentLoaded', function() {
  const oAL = window.applyLang;
  window.applyLang = function() {
    if (typeof oAL === 'function') oAL();
    const el = document.getElementById('lbl-tab-projectassembler');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'projectassembler') renderAssemblerTab();
  };

  const oRT = window.renderTab;
  window.renderTab = function(tab) {
    if (tab === 'projectassembler') {
      window.activeTab = 'projectassembler';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('tab-projectassembler');
      if (btn) btn.classList.add('active');
      renderAssemblerTab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
