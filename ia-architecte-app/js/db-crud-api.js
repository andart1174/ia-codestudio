/**
 * 💾 Visual CRUD Database & API Connector v1.0
 * IA Architecte — Code Studio Pro | EN/FR Bilingual
 * Fully decoupled script using decorator pattern
 */
(function() {
'use strict';

const TX = {
  en: {
    tab: 'Visual CRUD',
    title: '💾 Visual CRUD Database Builder',
    sub: 'Design tables visually and generate API connector code',
    desc: 'Visually model relational tables and output fully functional javascript database actions for your frontend.',
    btnNewTable: '➕ Create Table',
    btnNewCol: '➕ Add Column',
    btnInject: '💉 Inject Database Driver into Editor',
    btnLoadApp: '🚀 Load Database Admin panel in Monaco',
    lblTables: 'Database Schema',
    lblAdapter: 'Target Database Connector',
    lblColumns: 'Columns / Attributes',
    promptTableName: 'Enter table name (e.g., Tasks, Products):',
    promptColName: 'Enter column name (e.g., price, isCompleted):',
    lblColType: 'Select type for ',
    injected: '✅ Database driver code injected successfully!',
    emptySchema: '<i>Create a table above to start modeling.</i>',
    adapters: {
      local: 'LocalStorage API (Client-side)',
      idb: 'IndexedDB (Browser database)',
      supabase: 'Supabase SDK Client',
      firebase: 'Firebase Firestore SDK'
    }
  },
  fr: {
    tab: 'CRUD Visuel',
    title: '💾 Concepteur de Bases de Données & CRUD',
    sub: 'Concevez vos tables visuellement et générez les appels API',
    desc: 'Modélisez vos tables relationnelles et exportez du code d\'accès aux données fonctionnel pour votre frontend.',
    btnNewTable: '➕ Créer Table',
    btnNewCol: '➕ Ajouter Colonne',
    btnInject: '💉 Injecter le Driver DB dans l\'Éditeur',
    btnLoadApp: '🚀 Charger le Panel d\'Administration DB',
    lblTables: 'Schéma de Base de Données',
    lblAdapter: 'Connecteur de Base de Données Ciblé',
    lblColumns: 'Colonnes / Attributs',
    promptTableName: 'Nom de la table (ex: Tâches, Produits) :',
    promptColName: 'Nom de la colonne (ex: prix, termine) :',
    lblColType: 'Sélectionnez le type pour ',
    injected: '✅ Code driver de base de données injecté avec succès !',
    emptySchema: '<i>Créez une table ci-dessus pour commencer.</i>',
    adapters: {
      local: 'API LocalStorage (Client-side)',
      idb: 'IndexedDB (Navigateur local)',
      supabase: 'Client SDK Supabase',
      firebase: 'SDK Firestore Firebase'
    }
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

// DB Schema State
let schema = {
  "Tasks": [
    { name: "id", type: "number" },
    { name: "title", type: "string" },
    { name: "isCompleted", type: "boolean" }
  ]
};
let selectedAdapter = 'local';

function addTable() {
  const name = prompt(t('promptTableName'));
  if (!name) return;
  const clean = name.trim().replace(/[^a-zA-Z0-9]/g, '');
  if (clean.length < 2 || schema[clean]) {
     alert('Invalid or duplicate name');
     return;
  }
  schema[clean] = [{ name: "id", type: "number" }];
  renderDbTab();
}

function addColumn(tableName) {
  const colName = prompt(t('promptColName'));
  if (!colName) return;
  const clean = colName.trim().replace(/[^a-zA-Z0-9]/g, '');
  if (clean.length < 1 || schema[tableName].some(c => c.name === clean)) {
     alert('Invalid or duplicate column name');
     return;
  }
  
  const type = prompt(t('lblColType') + clean + ' (string, number, boolean, date):', 'string');
  const cleanType = ['string', 'number', 'boolean', 'date'].includes(type) ? type : 'string';
  
  schema[tableName].push({ name: clean, type: cleanType });
  renderDbTab();
}

function deleteTable(tableName) {
  if (confirm('Delete table ' + tableName + '?')) {
     delete schema[tableName];
     renderDbTab();
  }
}

// Generate code snippet based on active schema and selected adapter
function generateDriverCode() {
  let code = `/**\n * 💾 IA-PRO DATABASE DRIVER SERVICE\n * Target: ${t('adapters.' + selectedAdapter)}\n */\n\n`;
  
  if (selectedAdapter === 'local') {
    Object.keys(schema).forEach(table => {
      code += `// ── CRUD Methods for table: ${table} ──\n`;
      code += `window.${table}Service = {\n`;
      code += `  getAll: () => {\n`;
      code += `    return JSON.parse(localStorage.getItem("${table}") || "[]");\n`;
      code += `  },\n`;
      code += `  saveAll: (data) => {\n`;
      code += `    localStorage.setItem("${table}", JSON.stringify(data));\n`;
      code += `  },\n`;
      code += `  create: (item) => {\n`;
      code += `    const all = window.${table}Service.getAll();\n`;
      code += `    item.id = Date.now();\n`;
      code += `    all.push(item);\n`;
      code += `    window.${table}Service.saveAll(all);\n`;
      code += `    return item;\n`;
      code += `  },\n`;
      code += `  update: (id, data) => {\n`;
      code += `    let all = window.${table}Service.getAll();\n`;
      code += `    all = all.map(x => x.id === id ? { ...x, ...data, id } : x);\n`;
      code += `    window.${table}Service.saveAll(all);\n`;
      code += `  },\n`;
      code += `  delete: (id) => {\n`;
      code += `    let all = window.${table}Service.getAll();\n`;
      code += `    all = all.filter(x => x.id !== id);\n`;
      code += `    window.${table}Service.saveAll(all);\n`;
      code += `  }\n`;
      code += `};\n\n`;
    });
  } else if (selectedAdapter === 'idb') {
    code += `// IndexedDB setup & services\n`;
    code += `const dbName = "AppStudioDB";\n\n`;
    code += `function initDB() {\n`;
    code += `  return new Promise((resolve, reject) => {\n`;
    code += `    const req = indexedDB.open(dbName, 1);\n`;
    code += `    req.onupgradeneeded = (e) => {\n`;
    code += `      const db = e.target.result;\n`;
    Object.keys(schema).forEach(table => {
      code += `      if(!db.objectStoreNames.contains("${table}")) db.createObjectStore("${table}", { keyPath: "id", autoIncrement: true });\n`;
    });
    code += `    };\n`;
    code += `    req.onsuccess = (e) => resolve(e.target.result);\n`;
    code += `    req.onerror = (e) => reject(e.target.error);\n`;
    code += `  });\n`;
    code += `}\n\n`;
    
    Object.keys(schema).forEach(table => {
      code += `window.${table}Service = {\n`;
      code += `  getAll: async () => {\n`;
      code += `    const db = await initDB();\n`;
      code += `    return new Promise((resolve) => {\n`;
      code += `      const tx = db.transaction("${table}", "readonly");\n`;
      code += `      const store = tx.objectStore("${table}");\n`;
      code += `      const req = store.getAll();\n`;
      code += `      req.onsuccess = () => resolve(req.result);\n`;
      code += `    });\n`;
      code += `  },\n`;
      code += `  create: async (item) => {\n`;
      code += `    const db = await initDB();\n`;
      code += `    return new Promise((resolve) => {\n`;
      code += `      const tx = db.transaction("${table}", "readwrite");\n`;
      code += `      const store = tx.objectStore("${table}");\n`;
      code += `      const req = store.add(item);\n`;
      code += `      req.onsuccess = (e) => { item.id = e.target.result; resolve(item); };\n`;
      code += `    });\n`;
      code += `  },\n`;
      code += `  update: async (id, data) => {\n`;
      code += `    const db = await initDB();\n`;
      code += `    return new Promise((resolve) => {\n`;
      code += `      const tx = db.transaction("${table}", "readwrite");\n`;
      code += `      const store = tx.objectStore("${table}");\n`;
      code += `      store.put({ ...data, id });\n`;
      code += `      tx.oncomplete = () => resolve();\n`;
      code += `    });\n`;
      code += `  },\n`;
      code += `  delete: async (id) => {\n`;
      code += `    const db = await initDB();\n`;
      code += `    return new Promise((resolve) => {\n`;
      code += `      const tx = db.transaction("${table}", "readwrite");\n`;
      code += `      const store = tx.objectStore("${table}");\n`;
      code += `      store.delete(id);\n`;
      code += `      tx.oncomplete = () => resolve();\n`;
      code += `    });\n`;
      code += `  }\n`;
      code += `};\n\n`;
    });
  } else if (selectedAdapter === 'supabase') {
    code += `// Load Supabase Client SDK library first via script tag:\n`;
    code += `// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"><\\/script>\n\n`;
    code += `const supabaseUrl = "https://YOUR_PROJECT_REF.supabase.co";\n`;
    code += `const supabaseKey = "YOUR_ANON_KEY";\n`;
    code += `const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);\n\n`;
    
    Object.keys(schema).forEach(table => {
      code += `window.${table}Service = {\n`;
      code += `  getAll: async () => {\n`;
      code += `    const { data, error } = await supabase.from("${table}").select("*");\n`;
      code += `    return data || [];\n`;
      code += `  },\n`;
      code += `  create: async (item) => {\n`;
      code += `    const { data, error } = await supabase.from("${table}").insert([item]).select();\n`;
      code += `    return data ? data[0] : null;\n`;
      code += `  },\n`;
      code += `  update: async (id, data) => {\n`;
      code += `    await supabase.from("${table}").update(data).eq("id", id);\n`;
      code += `  },\n`;
      code += `  delete: async (id) => {\n`;
      code += `    await supabase.from("${table}").delete().eq("id", id);\n`;
      code += `  }\n`;
      code += `};\n\n`;
    });
  } else if (selectedAdapter === 'firebase') {
    code += `// Firebase v9 configurations\n`;
    code += `import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";\n`;
    code += `import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";\n\n`;
    code += `const firebaseConfig = { apiKey: "API_KEY", projectId: "PROJECT_ID" };\n`;
    code += `const app = initializeApp(firebaseConfig);\n`;
    code += `const db = getFirestore(app);\n\n`;
    
    Object.keys(schema).forEach(table => {
      code += `window.${table}Service = {\n`;
      code += `  getAll: async () => {\n`;
      code += `    const q = await getDocs(collection(db, "${table}"));\n`;
      code += `    const res = [];\n`;
      code += `    q.forEach(d => res.push({ ...d.data(), id: d.id }));\n`;
      code += `    return res;\n`;
      code += `  },\n`;
      code += `  create: async (item) => {\n`;
      code += `    const docRef = await addDoc(collection(db, "${table}"), item);\n`;
      code += `    item.id = docRef.id;\n`;
      code += `    return item;\n`;
      code += `  },\n`;
      code += `  update: async (id, data) => {\n`;
      code += `    await updateDoc(doc(db, "${table}", id), data);\n`;
      code += `  },\n`;
      code += `  delete: async (id) => {\n`;
      code += `    await deleteDoc(doc(db, "${table}", id));\n`;
      code += `  }\n`;
      code += `};\n\n`;
    });
  }
  return code;
}

function injectDriver() {
  if (!window.editor) {
     alert(t('noEditor'));
     return;
  }
  const currentCode = window.editor.getValue();
  const driver = `<script>\n${generateDriverCode()}\n</script>`;
  
  let newCode = currentCode;
  if (currentCode.includes('</body>')) {
     newCode = currentCode.replace('</body>', driver + '\n</body>');
  } else {
     newCode += '\n' + driver;
  }
  
  window.editor.setValue(newCode);
  if (window.runPreview) window.runPreview();
  if (window.showToast) window.showToast(t('injected'));
}

// 📦 Standalone Database Administration Dashboard page template
const STANDALONE_DASHBOARD_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Bilingual Database Admin Panel</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&display=swap" rel="stylesheet">
  <style>
    :root { --bg: #090f1d; --panel: #111827; --border: rgba(255,255,255,0.08); --primary: #34d399; }
    * { box-sizing: border-box; margin:0; padding:0; }
    body { background: var(--bg); color: #cbd5e1; font-family: 'Inter', sans-serif; display: flex; height: 100vh; overflow:hidden; }
    aside { width: 240px; background: var(--panel); border-right: 1px solid var(--border); padding: 25px 20px; display:flex; flex-direction:column; gap:15px; }
    h2 { font-size:15px; font-weight:900; color: var(--primary); text-transform:uppercase; margin-bottom:10px; }
    .nav-btn { display:block; padding:12px; background: rgba(255,255,255,0.02); border:1px solid var(--border); border-radius:8px; color:#fff; text-decoration:none; font-weight:700; cursor:pointer; font-size:12px; }
    .nav-btn.active { border-color: var(--primary); background: rgba(52,211,153,0.1); color: var(--primary); }
    main { flex:1; padding:40px; overflow-y:auto; }
    h1 { font-size:22px; font-weight:900; margin-bottom:20px; color:#fff; }
    .grid { display: grid; grid-template-columns: 2fr 1fr; gap:30px; }
    .card { background: var(--panel); border:1px solid var(--border); border-radius:16px; padding:20px; }
    table { width: 100%; border-collapse:collapse; font-size:12px; text-align:left; }
    th { padding:12px; background: rgba(255,255,255,0.03); border-bottom:1px solid var(--border); color:#64748b; font-weight:800; text-transform:uppercase; }
    td { padding:12px; border-bottom: 1px solid rgba(255,255,255,0.02); }
    .btn { padding:8px 16px; background: var(--primary); color:#000; border:none; border-radius:6px; font-weight:800; font-size:11px; cursor:pointer; }
    .btn-del { background: rgba(239,68,68,0.15); color:#f87171; border: 1px solid rgba(239,68,68,0.2); }
    input, select { width:100%; padding:10px; margin-bottom:10px; background:#1e293b; border:1px solid var(--border); border-radius:6px; color:#fff; font-size:12px; outline:none; }
    .lang-row { display:flex; gap:6px; margin-bottom:20px; }
    .lang-btn { padding:4px 8px; border:1px solid var(--border); color:#64748b; background:transparent; font-size:10px; border-radius:4px; cursor:pointer; }
    .lang-btn.active { color:#fff; border-color: var(--primary); background: rgba(52,211,153,0.1); }
  </style>
</head>
<body>

<aside>
  <div class="lang-row">
    <button class="lang-btn active" onclick="setLang('en')">EN</button>
    <button class="lang-btn" onclick="setLang('fr')">FR</button>
  </div>
  <h2 id="txt-aside">DB Schemes</h2>
  <div id="aside-list"></div>
</aside>

<main>
  <h1 id="txt-title">Database Administration</h1>
  <div class="grid">
    <div class="card">
      <h3 id="txt-records" style="margin-bottom:15px; font-size:14px;">Records</h3>
      <table id="tbl-data">
        <thead><tr id="tbl-headers"></tr></thead>
        <tbody id="tbl-body"></tbody>
      </table>
    </div>
    
    <div class="card">
      <h3 id="txt-insert" style="margin-bottom:15px; font-size:14px;">Insert Record</h3>
      <form id="frm-insert" onsubmit="saveRecord(event)">
        <div id="frm-fields"></div>
        <button type="submit" class="btn" id="btn-save">Add Entry</button>
      </form>
    </div>
  </div>
</main>

<script>
  let lang = 'en';
  let activeTable = '';
  
  // Hardcoded initial schema matching modeled data
  const schema = {
    "Tasks": [
      { name: "id", type: "number" },
      { name: "title", type: "string" },
      { name: "isCompleted", type: "boolean" }
    ]
  };

  const T = {
    en: { title: 'Database Administration', aside: 'DB Tables', records: 'Data Records', insert: 'Insert Entry', btnSave: 'Add Entry', delete: 'Delete' },
    fr: { title: 'Administration DB', aside: 'Tables DB', records: 'Enregistrements', insert: 'Insérer un Enregistrement', btnSave: 'Ajouter l\\'Entrée', delete: 'Supprimer' }
  };

  function setLang(l) {
    lang = l;
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById('txt-title').textContent = T[lang].title;
    document.getElementById('txt-aside').textContent = T[lang].aside;
    document.getElementById('txt-records').textContent = T[lang].records;
    document.getElementById('txt-insert').textContent = T[lang].insert;
    document.getElementById('btn-save').textContent = T[lang].btnSave;
    renderAside();
  }

  // Load database mock data in local storage
  function getTableData(t) {
    return JSON.parse(localStorage.getItem('DB_' + t) || '[]');
  }
  function saveTableData(t, data) {
    localStorage.setItem('DB_' + t, JSON.stringify(data));
  }

  function renderAside() {
    const list = document.getElementById('aside-list');
    list.innerHTML = '';
    Object.keys(schema).forEach(table => {
      const btn = document.createElement('button');
      btn.className = 'nav-btn' + (table === activeTable ? ' active' : '');
      btn.textContent = '📄 ' + table;
      btn.onclick = () => selectTable(table);
      list.appendChild(btn);
    });
  }

  function selectTable(table) {
    activeTable = table;
    renderAside();
    renderHeaders();
    renderBody();
    renderForm();
  }

  function renderHeaders() {
    const row = document.getElementById('tbl-headers');
    row.innerHTML = '';
    if(!activeTable) return;
    schema[activeTable].forEach(col => {
      row.innerHTML += '<th>' + col.name + '</th>';
    });
    row.innerHTML += '<th>Actions</th>';
  }

  function renderBody() {
    const tbody = document.getElementById('tbl-body');
    tbody.innerHTML = '';
    if(!activeTable) return;
    
    const items = getTableData(activeTable);
    items.forEach(item => {
      const row = document.createElement('tr');
      schema[activeTable].forEach(col => {
         row.innerHTML += '<td>' + (item[col.name] !== undefined ? item[col.name] : '') + '</td>';
      });
      
      const actions = document.createElement('td');
      const del = document.createElement('button');
      del.className = 'btn btn-del';
      del.textContent = T[lang].delete;
      del.onclick = () => {
        const filtered = getTableData(activeTable).filter(x => x.id !== item.id);
        saveTableData(activeTable, filtered);
        renderBody();
      };
      actions.appendChild(del);
      row.appendChild(actions);
      tbody.appendChild(row);
    });
  }

  function renderForm() {
    const div = document.getElementById('frm-fields');
    div.innerHTML = '';
    if(!activeTable) return;
    
    schema[activeTable].forEach(col => {
      if(col.name === 'id') return;
      
      const label = document.createElement('label');
      label.style = 'display:block; font-size:10px; margin-bottom:4px; font-weight:800;';
      label.textContent = col.name + ' (' + col.type + ')';
      div.appendChild(label);
      
      if(col.type === 'boolean') {
        const sel = document.createElement('select');
        sel.id = 'inp-' + col.name;
        sel.innerHTML = '<option value="true">True</option><option value="false">False</option>';
        div.appendChild(sel);
      } else {
        const inp = document.createElement('input');
        inp.id = 'inp-' + col.name;
        inp.type = col.type === 'number' ? 'number' : col.type === 'date' ? 'date' : 'text';
        div.appendChild(inp);
      }
    });
  }

  function saveRecord(e) {
    e.preventDefault();
    if(!activeTable) return;
    
    const newItem = { id: Date.now() };
    schema[activeTable].forEach(col => {
      if(col.name === 'id') return;
      const el = document.getElementById('inp-' + col.name);
      if(col.type === 'boolean') newItem[col.name] = el.value === 'true';
      else if(col.type === 'number') newItem[col.name] = Number(el.value);
      else newItem[col.name] = el.value;
    });

    const items = getTableData(activeTable);
    items.push(newItem);
    saveTableData(activeTable, items);
    
    renderBody();
    document.getElementById('frm-insert').reset();
  }

  // Set default selection
  selectTable(Object.keys(schema)[0]);
</script>
</body>
</html>`;

function injectStandaloneDashboard() {
  if (!window.editor) {
     alert(t('noEditor'));
     return;
  }
  // Inject exact schema details inside the standalone dashboard template
  const customSchema = JSON.stringify(schema, null, 2);
  const code = STANDALONE_DASHBOARD_TEMPLATE.replace('const schema = {', 'const schema = ' + customSchema + '; \/\/ ');
  
  window.editor.setValue(code);
  if (window.runPreview) window.runPreview();
  if (window.showToast) window.showToast(t('injected'));
}

function renderDbTab() {
  const parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  
  const wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0f172a;';

  const hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(16,185,129,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#34d399;">' + t('title') + '</div>' +
                  '<div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  const body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:12px;min-height:0;scrollbar-width:thin;';

  const desc = document.createElement('div');
  desc.style = 'font-size:10.5px;color:#94a3b8;line-height:1.5;';
  desc.textContent = t('desc');
  body.appendChild(desc);

  // Selector
  const selLabel = document.createElement('label');
  selLabel.style = 'font-size:9px;font-weight:800;color:#64748b;text-transform:uppercase;';
  selLabel.textContent = t('lblAdapter');
  body.appendChild(selLabel);
  
  const sel = document.createElement('select');
  sel.style = 'background:#1e293b;color:#e2e8f0;border:1px solid rgba(255,255,255,0.08);padding:8px;border-radius:6px;font-size:11px;outline:none;';
  Object.keys(t('adapters')).forEach(k => {
     const opt = document.createElement('option');
     opt.value = k; opt.textContent = t('adapters')[k];
     if (k === selectedAdapter) opt.selected = true;
     sel.appendChild(opt);
  });
  sel.onchange = function() { selectedAdapter = this.value; };
  body.appendChild(sel);

  // Schema editor header
  const schemaHdr = document.createElement('div');
  schemaHdr.style = 'display:flex;justify-content:space-between;align-items:center;margin-top:5px;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:4px;';
  schemaHdr.innerHTML = '<span style="font-size:9.5px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">' + t('lblTables') + '</span>';
  const addBtn = document.createElement('button');
  addBtn.textContent = t('btnNewTable');
  addBtn.style = 'background:rgba(16,185,129,0.15);color:#34d399;border:1px solid rgba(16,185,129,0.3);border-radius:6px;padding:3px 8px;font-size:9.5px;font-weight:700;cursor:pointer;';
  addBtn.onclick = addTable;
  schemaHdr.appendChild(addBtn);
  body.appendChild(schemaHdr);

  // Tables list
  const tList = document.createElement('div');
  tList.style = 'display:flex;flex-direction:column;gap:8px;';
  
  const keys = Object.keys(schema);
  if(keys.length === 0) {
     tList.innerHTML = `<div style="font-size:11px;color:#64748b;text-align:center;padding:10px 0;">${t('emptySchema')}</div>`;
  } else {
     keys.forEach(tableName => {
        const card = document.createElement('div');
        card.style = 'background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:10px;';
        
        const cardHdr = document.createElement('div');
        cardHdr.style = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;';
        cardHdr.innerHTML = `<span style="font-size:11.5px;font-weight:800;color:#e2e8f0;">📄 ${tableName}</span>`;
        
        const cardDel = document.createElement('span');
        cardDel.textContent = '✕';
        cardDel.style = 'font-size:10px;color:#f87171;font-weight:900;cursor:pointer;padding:2px 6px;';
        cardDel.onclick = () => deleteTable(tableName);
        cardHdr.appendChild(cardDel);
        card.appendChild(cardHdr);

        // Columns List
        const colList = document.createElement('div');
        colList.style = 'display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px;';
        schema[tableName].forEach(col => {
           const cNode = document.createElement('span');
           cNode.style = 'background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:4px;padding:2px 6px;font-size:9.5px;color:#94a3b8;';
           cNode.textContent = `${col.name}: ${col.type}`;
           colList.appendChild(cNode);
        });
        card.appendChild(colList);

        const addColBtn = document.createElement('button');
        addColBtn.textContent = t('btnNewCol');
        addColBtn.style = 'background:rgba(255,255,255,0.04);color:#94a3b8;border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:4px 8px;font-size:9.5px;cursor:pointer;width:100%;text-align:center;font-weight:700;';
        addColBtn.onclick = () => addColumn(tableName);
        card.appendChild(addColBtn);

        tList.appendChild(card);
     });
  }
  body.appendChild(tList);

  // Actions
  const actRow = document.createElement('div');
  actRow.style = 'display:flex;flex-direction:column;gap:6px;margin-top:5px;';
  
  const injBtn = document.createElement('button');
  injBtn.textContent = t('btnInject');
  injBtn.style = 'background:#10b981;color:#fff;border:none;border-radius:8px;padding:11px;font-weight:800;font-size:11px;cursor:pointer;box-shadow:0 4px 15px rgba(16,185,129,0.2);';
  injBtn.onclick = injectDriver;

  const appBtn = document.createElement('button');
  appBtn.textContent = t('btnLoadApp');
  appBtn.style = 'background:linear-gradient(135deg,#34d399,#6366f1);color:#fff;border:none;border-radius:8px;padding:11px;font-weight:800;font-size:11px;cursor:pointer;box-shadow:0 4px 15px rgba(52,211,153,0.2);';
  appBtn.onclick = injectStandaloneDashboard;

  actRow.appendChild(injBtn);
  actRow.appendChild(appBtn);
  body.appendChild(actRow);

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

// Hook tab triggers
document.addEventListener('DOMContentLoaded', function() {
  const oAL = window.applyLang;
  window.applyLang = function() {
    if (typeof oAL === 'function') oAL();
    const el = document.getElementById('lbl-tab-dbcrudapi');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'dbcrudapi') renderDbTab();
  };

  const oRT = window.renderTab;
  window.renderTab = function(tab) {
    if (tab === 'dbcrudapi') {
      window.activeTab = 'dbcrudapi';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('tab-dbcrudapi');
      if (btn) btn.classList.add('active');
      renderDbTab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
