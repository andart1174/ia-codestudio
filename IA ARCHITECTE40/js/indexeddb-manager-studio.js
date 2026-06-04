(function () {
  'use strict';

  // ════════════════════════════════════════════════════════════
  // 🗄️ INDEXEDDB MANAGER STUDIO — Real Offline DB Code Generator
  // ════════════════════════════════════════════════════════════

  const STANDALONE_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IndexedDB Manager Pro</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #020617;
      --card-bg: #0f172a;
      --card-border: #1e293b;
      --accent: #10b981;
      --accent-hover: #059669;
      --text: #f8fafc;
      --text-muted: #94a3b8;
    }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      box-sizing: border-box;
    }
    .container {
      width: 100%;
      max-width: 900px;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    }
    h1 {
      margin: 0 0 4px 0;
      font-size: 22px;
      font-weight: 900;
      color: var(--accent);
      letter-spacing: -0.5px;
    }
    p.sub {
      margin: 0 0 24px 0;
      font-size: 13px;
      color: var(--text-muted);
    }
    .layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
    }
    @media (min-width: 768px) {
      .layout {
        grid-template-columns: 320px 1fr;
      }
    }
    .sidebar {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .main-panel {
      background: rgba(255,255,255,0.01);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 20px;
      display: flex;
      flex-direction: column;
    }
    .card {
      background: rgba(255,255,255,0.02);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 16px;
    }
    .card-title {
      font-size: 11px;
      font-weight: 700;
      color: var(--text-muted);
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    label {
      display: block;
      font-size: 11px;
      font-weight: 700;
      color: var(--text-muted);
      margin-bottom: 6px;
      text-transform: uppercase;
    }
    input[type="text"] {
      width: 100%;
      background: #1e293b;
      border: 1px solid #334155;
      color: #fff;
      padding: 10px;
      border-radius: 8px;
      box-sizing: border-box;
      outline: none;
      font-family: inherit;
      font-size: 13px;
      margin-bottom: 12px;
    }
    input[type="text"]:focus {
      border-color: var(--accent);
    }
    button.btn-primary {
      width: 100%;
      background: linear-gradient(90deg, var(--accent), #06b6d4);
      border: none;
      color: #fff;
      padding: 12px;
      border-radius: 8px;
      font-weight: 900;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.2s;
    }
    button.btn-primary:hover {
      transform: translateY(-1px);
    }
    .tabs {
      display: flex;
      gap: 8px;
      border-bottom: 1px solid var(--card-border);
      padding-bottom: 12px;
      margin-bottom: 20px;
    }
    .tab-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      padding: 6px 12px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      border-radius: 6px;
      transition: all 0.2s;
    }
    .tab-btn.active {
      background: rgba(16,185,129,0.1);
      color: var(--accent);
    }
    .tab-content {
      display: none;
    }
    .tab-content.active {
      display: block;
    }
    .store-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #1e293b;
      border: 1px solid #334155;
      padding: 6px 10px;
      border-radius: 6px;
      font-size: 12px;
      margin-right: 6px;
      margin-bottom: 6px;
    }
    .store-badge span.del {
      color: #ef4444;
      cursor: pointer;
      font-weight: 700;
    }
    textarea.code-output {
      width: 100%;
      height: 350px;
      background: #090d16;
      border: 1px solid var(--card-border);
      color: #a5b4fc;
      padding: 12px;
      border-radius: 8px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      resize: none;
      box-sizing: border-box;
      outline: none;
    }
    .records-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 14px;
      font-size: 12px;
    }
    .records-table th, .records-table td {
      border: 1px solid var(--card-border);
      padding: 10px;
      text-align: left;
    }
    .records-table th {
      background: #1e293b;
      color: var(--text-muted);
    }
    .records-table tr:hover {
      background: rgba(255,255,255,0.02);
    }
    .toast {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(16,185,129,0.9);
      color: #fff;
      padding: 10px 20px;
      border-radius: 30px;
      font-size: 12px;
      font-weight: 700;
      display: none;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      z-index: 100;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🗄️ INDEXEDDB MANAGER PRO</h1>
    <p class="sub">Build, Playground & Export Offline Database Boilerplates</p>

    <div class="layout">
      <!-- Sidebar / Constructor -->
      <div class="sidebar">
        <div class="card">
          <div class="card-title">1. Database Info</div>
          <label for="dbName">Database Name</label>
          <input type="text" id="dbName" value="MyOfflineAppDB">
        </div>

        <div class="card">
          <div class="card-title">2. Add Object Store</div>
          <label for="storeName">Store (Table) Name</label>
          <input type="text" id="storeName" placeholder="users">
          <label for="keyPath">Primary Key Field</label>
          <input type="text" id="keyPath" value="id">
          <label for="indexFields">Indexes (comma-separated)</label>
          <input type="text" id="indexFields" placeholder="name, email, date">
          <button class="btn-primary" id="addStoreBtn">➕ Add Store</button>
        </div>
      </div>

      <!-- Main Workspace -->
      <div class="main-panel">
        <div class="tabs">
          <button class="tab-btn active" data-tab="playground">🧪 DB Playground</button>
          <button class="tab-btn" data-tab="code">📄 Generated Code</button>
        </div>

        <!-- PLAYGROUND -->
        <div class="tab-content active" id="tab-playground">
          <div class="card-title">Active Database Schema</div>
          <div id="storesContainer" style="margin-bottom: 20px;">
            <p style="font-size: 12px; color: var(--text-muted);">No stores defined yet. Add one on the left!</p>
          </div>

          <div id="playgroundControls" style="display: none;">
            <div style="border-top: 1px solid var(--card-border); padding-top: 20px; display: grid; grid-template-columns: 1fr; gap: 20px;">
              <div>
                <div class="card-title">➕ Add Record Entry</div>
                <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--card-border); border-radius: 8px; padding: 14px;">
                  <label for="selectStore" style="margin-bottom: 8px;">Target Store</label>
                  <select id="selectStore" style="width:100%; background:#1e293b; border:1px solid #334155; color:#fff; padding:8px; border-radius:6px; outline:none; font-family:inherit; font-size:12px; margin-bottom:12px;"></select>
                  <div id="dynamicInputs"></div>
                  <button class="btn-primary" id="insertRecordBtn" style="margin-top: 8px;">⚡ Insert Record</button>
                </div>
              </div>

              <div>
                <div class="card-title" style="display: flex; justify-content: space-between; align-items: center;">
                  <span>📋 Live Entries in IndexedDB</span>
                  <button id="refreshBtn" style="background: transparent; border: 1px solid var(--accent); color: var(--accent); padding: 4px 8px; font-size: 10px; font-weight: 700; border-radius: 4px; cursor: pointer;">🔄 Refresh</button>
                </div>
                <div style="overflow-x: auto; background: rgba(0,0,0,0.2); border: 1px solid var(--card-border); border-radius: 8px;">
                  <table class="records-table">
                    <thead>
                      <tr id="tableHeader">
                        <th>Data</th>
                      </tr>
                    </thead>
                    <tbody id="tableBody">
                      <tr>
                        <td style="color: var(--text-muted); text-align: center;">No records found. Click Insert Record above!</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CODE GENERATOR -->
        <div class="tab-content" id="tab-code">
          <div class="card-title">Real Boilerplate JavaScript Output</div>
          <textarea class="code-output" id="codeTextarea" readonly></textarea>
          <div style="display: flex; gap: 10px; margin-top: 14px;">
            <button class="btn-primary" id="copyCodeBtn" style="flex: 1;">📋 Copy Code</button>
            <button class="btn-primary" id="downloadHtmlBtn" style="flex: 1; background: linear-gradient(90deg, #3b82f6, #1d4ed8);">⬇️ Download standalone.html</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="toast" id="toast"></div>

  <script>
    const dbNameInput = document.getElementById('dbName');
    const storeNameInput = document.getElementById('storeName');
    const keyPathInput = document.getElementById('keyPath');
    const indexFieldsInput = document.getElementById('indexFields');
    const addStoreBtn = document.getElementById('addStoreBtn');
    const storesContainer = document.getElementById('storesContainer');
    
    const playgroundControls = document.getElementById('playgroundControls');
    const selectStore = document.getElementById('selectStore');
    const dynamicInputs = document.getElementById('dynamicInputs');
    const insertRecordBtn = document.getElementById('insertRecordBtn');
    const tableHeader = document.getElementById('tableHeader');
    const tableBody = document.getElementById('tableBody');
    const refreshBtn = document.getElementById('refreshBtn');

    const codeTextarea = document.getElementById('codeTextarea');
    const copyCodeBtn = document.getElementById('copyCodeBtn');
    const downloadHtmlBtn = document.getElementById('downloadHtmlBtn');
    const toast = document.getElementById('toast');

    let stores = [];
    let dbInstance = null;

    // Tabs logic
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
      });
    });

    function showToast(msg) {
      toast.textContent = msg;
      toast.style.display = 'block';
      setTimeout(() => { toast.style.display = 'none'; }, 2000);
    }

    addStoreBtn.addEventListener('click', () => {
      const name = storeNameInput.value.trim().replace(/\\\\s+/g, '_');
      const keyPath = keyPathInput.value.trim() || 'id';
      const idxRaw = indexFieldsInput.value.trim();
      const indexes = idxRaw ? idxRaw.split(',').map(s => s.trim()).filter(Boolean) : [];
      
      if (!name) { showToast('Please enter a store name.'); return; }
      if (stores.find(s => s.name === name)) { showToast('Store already exists!'); return; }

      stores.push({ name, keyPath, indexes });
      storeNameInput.value = '';
      indexFieldsInput.value = '';
      
      renderSchema();
      updateGenerator();
      initPlaygroundDB();
      showToast('Store added successfully!');
    });

    function renderSchema() {
      storesContainer.innerHTML = '';
      if (stores.length === 0) {
        storesContainer.innerHTML = '<p style="font-size: 12px; color: var(--text-muted);">No stores defined yet. Add one on the left!</p>';
        playgroundControls.style.display = 'none';
        return;
      }
      
      stores.forEach((s, idx) => {
        const div = document.createElement('div');
        div.className = 'store-badge';
        div.innerHTML = '📦 <b>' + s.name + '</b> (' + s.keyPath + ') <span class="del" data-idx="' + idx + '">✗</span>';
        div.querySelector('.del').addEventListener('click', () => {
          stores.splice(idx, 1);
          renderSchema();
          updateGenerator();
          initPlaygroundDB();
        });
        storesContainer.appendChild(div);
      });

      // Update dropdown selection
      selectStore.innerHTML = '';
      stores.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.name;
        opt.textContent = s.name;
        selectStore.appendChild(opt);
      });

      playgroundControls.style.display = 'block';
      renderDynamicInputs();
    }

    selectStore.addEventListener('change', renderDynamicInputs);

    function renderDynamicInputs() {
      dynamicInputs.innerHTML = '';
      const activeStoreName = selectStore.value;
      const storeObj = stores.find(s => s.name === activeStoreName);
      if (!storeObj) return;

      // Primary Key input
      const divKey = document.createElement('div');
      divKey.style.marginBottom = '10px';
      divKey.innerHTML = '<label style="font-size:10px;color:var(--text-muted);">' + storeObj.keyPath + ' (Primary Key)</label>' +
                         '<input type="text" id="input_key" placeholder="Enter primary key value">';
      dynamicInputs.appendChild(divKey);

      // Indexes inputs
      storeObj.indexes.forEach(idx => {
        const divIdx = document.createElement('div');
        divIdx.style.marginBottom = '10px';
        divIdx.innerHTML = '<label style="font-size:10px;color:var(--text-muted);">' + idx + '</label>' +
                           '<input type="text" class="input_idx" data-field="' + idx + '" placeholder="Value for ' + idx + '">';
        dynamicInputs.appendChild(divIdx);
      });

      refreshPlaygroundTable();
    }

    function initPlaygroundDB() {
      if (dbInstance) {
        dbInstance.close();
        dbInstance = null;
      }
      
      if (stores.length === 0) return;

      const dbName = dbNameInput.value.trim() || 'MyOfflineAppDB';
      const request = indexedDB.open(dbName, Date.now()); // Date.now() ensures database upgrades schema immediately
      
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        stores.forEach(s => {
          if (!db.objectStoreNames.contains(s.name)) {
            const store = db.createObjectStore(s.name, { keyPath: s.keyPath });
            s.indexes.forEach(idx => store.createIndex(idx, idx, { unique: false }));
          }
        });
      };

      request.onsuccess = (e) => {
        dbInstance = e.target.result;
        refreshPlaygroundTable();
      };

      request.onerror = () => {
        showToast('Error opening IndexedDB!');
      };
    }

    insertRecordBtn.addEventListener('click', () => {
      if (!dbInstance) { showToast('DB not ready!'); return; }
      
      const activeStoreName = selectStore.value;
      const storeObj = stores.find(s => s.name === activeStoreName);
      if (!storeObj) return;

      const keyVal = document.getElementById('input_key').value.trim();
      if (!keyVal) { showToast('Primary key is required!'); return; }

      const record = {};
      record[storeObj.keyPath] = keyVal;

      document.querySelectorAll('.input_idx').forEach(input => {
        const field = input.dataset.field;
        record[field] = input.value.trim();
      });

      try {
        const tx = dbInstance.transaction(activeStoreName, 'readwrite');
        const store = tx.objectStore(activeStoreName);
        store.put(record);

        tx.oncomplete = () => {
          showToast('Record inserted successfully!');
          // Clear inputs
          document.getElementById('input_key').value = '';
          document.querySelectorAll('.input_idx').forEach(i => i.value = '');
          refreshPlaygroundTable();
        };

        tx.onerror = (e) => {
          showToast('Insert Error: ' + e.target.error.message);
        };
      } catch (err) {
        showToast('Transaction error: ' + err.message);
      }
    });

    refreshBtn.addEventListener('click', () => {
      refreshPlaygroundTable();
      showToast('Data refreshed!');
    });

    function refreshPlaygroundTable() {
      if (!dbInstance) return;
      const activeStoreName = selectStore.value;
      const storeObj = stores.find(s => s.name === activeStoreName);
      if (!storeObj) return;

      // Update table headers
      tableHeader.innerHTML = '';
      const thKey = document.createElement('th');
      thKey.textContent = storeObj.keyPath;
      tableHeader.appendChild(thKey);

      storeObj.indexes.forEach(idx => {
        const th = document.createElement('th');
        th.textContent = idx;
        tableHeader.appendChild(th);
      });

      const thActions = document.createElement('th');
      thActions.textContent = 'Actions';
      tableHeader.appendChild(thActions);

      // Query database
      try {
        const tx = dbInstance.transaction(activeStoreName, 'readonly');
        const store = tx.objectStore(activeStoreName);
        const req = store.getAll();

        req.onsuccess = () => {
          const results = req.result;
          tableBody.innerHTML = '';
          
          if (results.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="' + (storeObj.indexes.length + 2) + '" style="color:var(--text-muted);text-align:center;">No records found. Click Insert Record above!</td></tr>';
            return;
          }

          results.forEach(record => {
            const tr = document.createElement('tr');
            
            // Key cell
            const tdKey = document.createElement('td');
            tdKey.textContent = record[storeObj.keyPath];
            tr.appendChild(tdKey);

            // Index cells
            storeObj.indexes.forEach(idx => {
              const td = document.createElement('td');
              td.textContent = record[idx] || '';
              tr.appendChild(td);
            });

            // Action cell
            const tdDel = document.createElement('td');
            const delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';
            delBtn.style.cssText = 'background:#ef4444; border:none; color:#fff; padding:4px 8px; border-radius:4px; font-size:10px; font-weight:700; cursor:pointer;';
            delBtn.addEventListener('click', () => {
              const dTx = dbInstance.transaction(activeStoreName, 'readwrite');
              dTx.objectStore(activeStoreName).delete(record[storeObj.keyPath]);
              dTx.oncomplete = () => {
                showToast('Record deleted!');
                refreshPlaygroundTable();
              };
            });
            tdDel.appendChild(delBtn);
            tr.appendChild(tdDel);

            tableBody.appendChild(tr);
          });
        };
      } catch (err) {
        console.error(err);
      }
    }

    dbNameInput.addEventListener('change', () => {
      initPlaygroundDB();
      updateGenerator();
    });

    function updateGenerator() {
      const dbName = dbNameInput.value.trim() || 'MyOfflineAppDB';
      if (stores.length === 0) {
        codeTextarea.value = '// Add at least one object store on the left to generate the IndexedDB class.';
        return;
      }

      let storeSetup = '';
      let crudSetup = '';

      stores.forEach(s => {
        let idxSetup = '';
        s.indexes.forEach(idx => {
          idxSetup += "    store_" + s.name + ".createIndex('" + idx + "', '" + idx + "', { unique: false });\\\\n";
        });

        storeSetup += "  // Store: " + s.name + "\\\\n" +
                     "  if (!db.objectStoreNames.contains('" + s.name + "')) {\\\\n" +
                     "    const store_" + s.name + " = db.createObjectStore('" + s.name + "', { keyPath: '" + s.keyPath + "' });\\\\n" +
                     idxSetup +
                     "  }\\\\n\\\\n";

        crudSetup += "// ── CRUD for \\\\\\"" + s.name + "\\\\\\\" ─────────────────────────────────\\\\n" +
                    "function add_" + s.name + "(data) {\\\\n" +
                    "  const tx = dbInstance.transaction('" + s.name + "', 'readwrite');\\\\n" +
                    "  tx.objectStore('" + s.name + "').put(data);\\\\n" +
                    "  return new Promise((res, rej) => { tx.oncomplete = () => res(true); tx.onerror = rej; });\\\\n" +
                    "}\\\\n\\\\n" +
                    "function getAll_" + s.name + "() {\\\\n" +
                    "  return new Promise((res, rej) => {\\\\n" +
                    "    const tx = dbInstance.transaction('" + s.name + "', 'readonly');\\\\n" +
                    "    const req = tx.objectStore('" + s.name + "').getAll();\\\\n" +
                    "    req.onsuccess = () => res(req.result);\\\\n" +
                    "    req.onerror = rej;\\\\n" +
                    "  });\\\\n" +
                    "}\\\\n\\\\n" +
                    "function delete_" + s.name + "(id) {\\\\n" +
                    "  const tx = dbInstance.transaction('" + s.name + "', 'readwrite');\\\\n" +
                    "  tx.objectStore('" + s.name + "').delete(id);\\\\n" +
                    "  return new Promise((res, rej) => { tx.oncomplete = () => res(true); tx.onerror = rej; });\\\\n" +
                    "}\\\\n\\\\n";
      });

      const fullJs = "// ════════════════════════════════════════════\\\\n" +
                    "// 🗄️ IndexedDB — Generated by IA Architecte Studio\\\\n" +
                    "// Database: \\\\\\\"" + dbName + "\\\\\\\" | Version: 1\\\\n" +
                    "// ════════════════════════════════════════════\\\\n\\\\n" +
                    "let dbInstance = null;\\\\n\\\\n" +
                    "function openDB() {\\\\n" +
                    "  return new Promise((resolve, reject) => {\\\\n" +
                    "    const request = indexedDB.open('" + dbName + "', 1);\\\\n\\\\n" +
                    "    request.onupgradeneeded = (event) => {\\\\n" +
                    "      const db = event.target.result;\\\\n" +
                    storeSetup +
                    "    };\\\\n\\\\n" +
                    "    request.onsuccess = (event) => {\\\\n" +
                    "      dbInstance = event.target.result;\\\\n" +
                    "      console.log('✅ DB \\\\\\\"" + dbName + "\\\\\\\" opened successfully.');\\\\n" +
                    "      resolve(dbInstance);\\\\n" +
                    "    };\\\\n\\\\n" +
                    "    request.onerror = (event) => {\\\\n" +
                    "      console.error('❌ DB Error:', event.target.error);\\\\n" +
                    "      reject(event.target.error);\\\\n" +
                    "    };\\\\n" +
                    "  });\\\\n" +
                    "}\\\\n\\\\n" +
                    "// Initialize Database\\\\n" +
                    "openDB().then(() => { console.log('Database ready!'); });\\\\n\\\\n" +
                    crudSetup;

      codeTextarea.value = fullJs.replace(/\\\\n/g, '\\n');
    }

    copyCodeBtn.addEventListener('click', () => {
      const out = codeTextarea.value;
      if (!out || out.startsWith('// Add')) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(out).then(() => showToast('Copied to clipboard!'));
      } else {
        const ta = document.createElement('textarea');
        ta.value = out; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select(); document.execCommand('copy');
        document.body.removeChild(ta); showToast('Copied to clipboard!');
      }
    });

    downloadHtmlBtn.addEventListener('click', () => {
      const out = codeTextarea.value;
      if (!out || out.startsWith('// Add')) return;
      const htmlContent = '<!DOCTYPE html><html><head><title>IndexedDB Live App</title></head><body>' +
                          '<h1>IndexedDB is Active</h1><p>Open browser console (F12) to see database ready logs.</p>' +
                          '<script>\\\\n' + out + '\\\\n<\/' + 'script></body></html>';
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = Object.assign(document.createElement('a'), { href: url, download: 'indexeddb_app.html' });
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });

    // Default generator text
    updateGenerator();
  </script>
</body>
</html>`;

  const TX = {
    en: {
      title: 'INDEXEDDB MANAGER',
      sub: 'Real Offline Database Builder & Code Generator',
      dbName: 'Database Name',
      storeName: 'Store (Table) Name',
      keyPath: 'Primary Key Field',
      addIndex: '+ Add Index Field',
      addStore: '+ Add Store',
      stores: 'Defined Stores',
      generateCode: '⚡ Generate DB Code',
      copyCode: '📋 Copy Code',
      copySuccess: '✅ Code Copied!',
      testDb: '🧪 Test in Browser NOW',
      testSuccess: '✅ Database created in your browser\'s IndexedDB!',
      outputTitle: 'Generated JavaScript (100% Real & Working)',
      noStores: 'Add at least one store before generating.',
      injected: '✅ IndexedDB Manager loaded.',
      indexPlaceholder: 'e.g. email, name, date',
      remove: '✗',
      storeAdded: 'Store added!',
      inject: '💉 Inject to Editor',
      loadFullApp: '🚀 Load Full Standalone App',
      loadSuccess: '🚀 Standalone App loaded into editor!'
    },
    fr: {
      title: 'GESTIONNAIRE INDEXEDDB',
      sub: 'Constructeur de Base de Données Hors Ligne & Générateur de Code',
      dbName: 'Nom de la Base de Données',
      storeName: 'Nom du Store (Table)',
      keyPath: 'Champ Clé Primaire',
      addIndex: '+ Ajouter un Index',
      addStore: '+ Ajouter un Store',
      stores: 'Stores Définis',
      generateCode: '⚡ Générer le Code DB',
      copyCode: '📋 Copier le Code',
      copySuccess: '✅ Code Copié!',
      testDb: '🧪 Tester dans le Navigateur',
      testSuccess: '✅ Base de données créée dans l\'IndexedDB de votre navigateur!',
      outputTitle: 'JavaScript Généré (100% Réel & Fonctionnel)',
      noStores: 'Ajoutez au moins un store avant de générer.',
      injected: '✅ Gestionnaire IndexedDB chargé.',
      indexPlaceholder: 'ex: email, nom, date',
      remove: '✗',
      storeAdded: 'Store ajouté!',
      inject: '💉 Injecter dans l\'Éditeur',
      loadFullApp: '🚀 Charger l\'appli complète',
      loadSuccess: '🚀 Application complète chargée dans l\'éditeur!'
    }
  };

  function gl() { return window.appLang || 'en'; }

  const _orig = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'indexeddbmgr') {
      window.activeTab = 'indexeddbmgr';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('tab-indexeddbmgr');
      if (btn) btn.classList.add('active');
      initIndexedDBMgr(gl());
      return;
    }
    if (typeof _orig === 'function') _orig(tab);
  };

  function generateCode(dbName, version, stores) {
    const storeSetup = stores.map(s => {
      const indexes = s.indexes.map(idx =>
        `    store_${s.name}.createIndex('${idx}', '${idx}', { unique: false });`
      ).join('\n');
      return `
  // Store: ${s.name}
  if (!db.objectStoreNames.contains('${s.name}')) {
    const store_${s.name} = db.createObjectStore('${s.name}', { keyPath: '${s.keyPath}', autoIncrement: true });
${indexes}
  }`;
    }).join('\n');

    const crudFunctions = stores.map(s => `
// ── CRUD for "${s.name}" ─────────────────────────────────
function add_${s.name}(data) {
  const tx = dbInstance.transaction('${s.name}', 'readwrite');
  tx.objectStore('${s.name}').add(data);
  return new Promise((res, rej) => { tx.oncomplete = () => res(true); tx.onerror = rej; });
}

function getAll_${s.name}() {
  return new Promise((res, rej) => {
    const tx = dbInstance.transaction('${s.name}', 'readonly');
    const req = tx.objectStore('${s.name}').getAll();
    req.onsuccess = () => res(req.result);
    req.onerror = rej;
  });
}

function delete_${s.name}(id) {
  const tx = dbInstance.transaction('${s.name}', 'readwrite');
  tx.objectStore('${s.name}').delete(id);
  return new Promise((res, rej) => { tx.oncomplete = () => res(true); tx.onerror = rej; });
}`).join('\n');

    return `// ════════════════════════════════════════════
// 🗄️ IndexedDB — Generated by IA Architecte Studio
// Database: "${dbName}" | Version: ${version}
// ════════════════════════════════════════════

let dbInstance = null;

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('${dbName}', ${version});

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
${storeSetup}
    };

    request.onsuccess = (event) => {
      dbInstance = event.target.result;
      console.log('✅ DB "${dbName}" opened successfully.');
      resolve(dbInstance);
    };

    request.onerror = (event) => {
      console.error('❌ DB Error:', event.target.error);
      reject(event.target.error);
    };
  });
}

// Initialize the database on page load
openDB().then(() => {
  console.log('Database ready!');
});
${crudFunctions}

// ── USAGE EXAMPLE ─────────────────────────────
// openDB().then(() => {
//   add_${stores[0] ? stores[0].name : 'myStore'}({ ${stores[0] ? stores[0].keyPath : 'id'}: 1, name: 'Test' });
//   getAll_${stores[0] ? stores[0].name : 'myStore'}().then(console.log);
// });`;
  }

  function initIndexedDBMgr(lang) {
    const el = document.getElementById('left-body');
    if (!el) return;
    const T = TX[lang] || TX.en;

    el.innerHTML = `
      <div style="padding:14px;font-family:'Inter',sans-serif;overflow-y:auto;height:100%;box-sizing:border-box;background:#020617;color:#f8fafc;">
        <!-- Header -->
        <div style="background:linear-gradient(135deg,rgba(16,185,129,0.15),rgba(6,182,212,0.1));border-radius:14px;padding:14px;border:1px solid rgba(16,185,129,0.35);margin-bottom:16px;display:flex;align-items:center;gap:12px;">
          <span style="font-size:28px;filter:drop-shadow(0 0 10px #10b981);">🗄️</span>
          <div>
            <h2 style="margin:0;color:#34d399;font-size:15px;font-weight:900;">${T.title}</h2>
            <p style="margin:3px 0 0;color:#94a3b8;font-size:10px;">${T.sub}</p>
          </div>
        </div>

        <!-- Load Full App Button -->
        <button id="idb-load-full-app" style="width:100%;background:linear-gradient(90deg,#10b981,#0891b2);border:none;color:#fff;padding:10px;border-radius:8px;font-weight:900;font-size:11px;cursor:pointer;margin-bottom:14px;box-shadow:0 0 15px rgba(16,185,129,0.25);transition:transform 0.1s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">${T.loadFullApp}</button>

        <!-- DB Config -->
        <div style="background:#0f172a;border:1px solid #1e293b;border-radius:12px;padding:14px;margin-bottom:12px;">
          <label style="font-size:10px;font-weight:700;color:#94a3b8;display:block;margin-bottom:5px;">${T.dbName}</label>
          <input type="text" id="idb-dbname" value="MyAppDatabase" style="width:100%;background:#1e293b;border:1px solid #334155;color:#fff;padding:9px;border-radius:6px;box-sizing:border-box;font-family:'Inter';outline:none;font-size:12px;margin-bottom:10px;">
        </div>

        <!-- Add Store Form -->
        <div style="background:#0f172a;border:1px solid #1e293b;border-radius:12px;padding:14px;margin-bottom:12px;">
          <label style="font-size:10px;font-weight:700;color:#94a3b8;display:block;margin-bottom:5px;">${T.storeName}</label>
          <input type="text" id="idb-storename" placeholder="users" style="width:100%;background:#1e293b;border:1px solid #334155;color:#fff;padding:9px;border-radius:6px;box-sizing:border-box;font-family:'Inter';outline:none;font-size:12px;margin-bottom:10px;">
          <label style="font-size:10px;font-weight:700;color:#94a3b8;display:block;margin-bottom:5px;">${T.keyPath}</label>
          <input type="text" id="idb-keypath" placeholder="id" value="id" style="width:100%;background:#1e293b;border:1px solid #334155;color:#fff;padding:9px;border-radius:6px;box-sizing:border-box;font-family:'Inter';outline:none;font-size:12px;margin-bottom:10px;">
          <label style="font-size:10px;font-weight:700;color:#94a3b8;display:block;margin-bottom:5px;">${T.addIndex} (comma-separated)</label>
          <input type="text" id="idb-indexes" placeholder="${T.indexPlaceholder}" style="width:100%;background:#1e293b;border:1px solid #334155;color:#fff;padding:9px;border-radius:6px;box-sizing:border-box;font-family:'Inter';outline:none;font-size:12px;margin-bottom:12px;">
          <button id="idb-add-store" style="width:100%;background:linear-gradient(90deg,rgba(16,185,129,0.8),rgba(6,182,212,0.8));border:none;color:#fff;padding:10px;border-radius:8px;font-weight:900;font-size:11px;cursor:pointer;">${T.addStore}</button>
        </div>

        <!-- Stores List -->
        <div id="idb-stores-list" style="margin-bottom:12px;"></div>

        <!-- Generate Button -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">
          <button id="idb-generate" style="background:linear-gradient(90deg,#10b981,#0891b2);border:none;color:#fff;padding:12px;border-radius:8px;font-weight:900;font-size:11px;cursor:pointer;">${T.generateCode}</button>
          <button id="idb-test" style="background:linear-gradient(90deg,rgba(245,158,11,0.8),rgba(251,146,60,0.8));border:none;color:#fff;padding:12px;border-radius:8px;font-weight:900;font-size:11px;cursor:pointer;">${T.testDb}</button>
        </div>

        <!-- Output -->
        <div id="idb-output-wrap" style="display:none;background:#0f172a;border:1px solid #1e293b;border-radius:12px;overflow:hidden;margin-bottom:10px;">
          <div style="background:#1e293b;padding:8px 12px;font-size:10px;font-weight:700;color:#34d399;">📄 ${T.outputTitle}</div>
          <textarea id="idb-output" readonly style="width:100%;height:200px;background:#000;border:none;color:#a5b4fc;padding:10px;font-family:'JetBrains Mono',monospace;font-size:9px;resize:none;box-sizing:border-box;outline:none;"></textarea>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <button id="idb-copy" style="display:none;background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.4);color:#818cf8;padding:10px;border-radius:8px;font-weight:700;font-size:10px;cursor:pointer;">${T.copyCode}</button>
          <button id="idb-inject" style="display:none;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.4);color:#34d399;padding:10px;border-radius:8px;font-weight:700;font-size:10px;cursor:pointer;">${T.inject}</button>
        </div>
        <div id="idb-toast" style="display:none;text-align:center;background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.4);border-radius:8px;padding:8px;margin-top:10px;color:#34d399;font-size:11px;font-weight:700;"></div>
      </div>
    `;

    const stores = [];
    const storeList = document.getElementById('idb-stores-list');
    const toast = document.getElementById('idb-toast');

    function showT(msg) { toast.textContent = msg; toast.style.display = 'block'; setTimeout(() => toast.style.display = 'none', 2500); }

    function renderStoreList() {
      storeList.innerHTML = '';
      if (stores.length === 0) return;
      const wrap = document.createElement('div');
      wrap.style.cssText = 'background:#0f172a;border:1px solid #1e293b;border-radius:12px;padding:12px;margin-bottom:12px;';
      wrap.innerHTML = `<div style="font-size:10px;font-weight:700;color:#64748b;margin-bottom:8px;text-transform:uppercase;">${T.stores}</div>`;
      stores.forEach((s, i) => {
        const item = document.createElement('div');
        item.style.cssText = 'background:#1e293b;border-radius:8px;padding:10px;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;';
        item.innerHTML = `
          <div>
            <div style="font-size:11px;font-weight:900;color:#34d399;">📦 ${s.name}</div>
            <div style="font-size:9px;color:#94a3b8;margin-top:2px;">Key: ${s.keyPath} ${s.indexes.length ? '| Indexes: ' + s.indexes.join(', ') : ''}</div>
          </div>
          <button data-idx="${i}" style="background:rgba(239,68,68,0.2);border:none;color:#ef4444;padding:5px 9px;border-radius:5px;cursor:pointer;font-weight:900;font-size:11px;">${T.remove}</button>
        `;
        item.querySelector('button').addEventListener('click', function () {
          stores.splice(parseInt(this.dataset.idx), 1);
          renderStoreList();
        });
        wrap.appendChild(item);
      });
      storeList.appendChild(wrap);
    }

    document.getElementById('idb-add-store').addEventListener('click', () => {
      const name = document.getElementById('idb-storename').value.trim().replace(/\\s+/g, '_');
      const keyPath = document.getElementById('idb-keypath').value.trim() || 'id';
      const idxRaw = document.getElementById('idb-indexes').value.trim();
      const indexes = idxRaw ? idxRaw.split(',').map(s => s.trim()).filter(Boolean) : [];
      if (!name) return;
      stores.push({ name, keyPath, indexes });
      document.getElementById('idb-storename').value = '';
      document.getElementById('idb-indexes').value = '';
      renderStoreList();
      showT(T.storeAdded);
    });

    document.getElementById('idb-generate').addEventListener('click', () => {
      if (stores.length === 0) { showT(T.noStores); return; }
      const dbName = document.getElementById('idb-dbname').value.trim() || 'MyDatabase';
      const code = generateCode(dbName, 1, stores);
      document.getElementById('idb-output').value = code;
      document.getElementById('idb-output-wrap').style.display = 'block';
      document.getElementById('idb-copy').style.display = 'block';
      document.getElementById('idb-inject').style.display = 'block';
    });

    document.getElementById('idb-test').addEventListener('click', () => {
      if (stores.length === 0) { showT(T.noStores); return; }
      const dbName = document.getElementById('idb-dbname').value.trim() || 'MyDatabase';
      const request = indexedDB.open(dbName, 1);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        stores.forEach(s => {
          if (!db.objectStoreNames.contains(s.name)) {
            const store = db.createObjectStore(s.name, { keyPath: s.keyPath, autoIncrement: true });
            s.indexes.forEach(idx => store.createIndex(idx, idx, { unique: false }));
          }
        });
      };
      request.onsuccess = () => { showT(T.testSuccess); request.result.close(); };
      request.onerror = () => { showT('❌ Error creating database!'); };
    });

    function copyToClipboard(text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text);
      } else {
        return new Promise((resolve, reject) => {
          try {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            const ok = document.execCommand('copy');
            document.body.removeChild(ta);
            if (ok) resolve(); else reject(new Error('execCommand copy failed'));
          } catch (e) {
            reject(e);
          }
        });
      }
    }

    document.getElementById('idb-copy').addEventListener('click', () => {
      const out = document.getElementById('idb-output').value;
      if (!out) return;
      copyToClipboard(out).then(() => showT(T.copySuccess));
    });

    document.getElementById('idb-inject').addEventListener('click', () => {
      const out = document.getElementById('idb-output').value;
      if (!out) return;
      const wrapped = `<script>\n${out}\n<\/script>`;
      const msg = lang === 'fr' ? '✅ Script injecté dans l\'éditeur !' : '✅ Script injected into editor!';
      
      if (window.smartInject) {
        window.smartInject(wrapped, 'logic');
        showT(msg);
      } else if (window.editor) {
        const cur = window.editor.getValue();
        const idx = cur.toLowerCase().indexOf('</body>');
        if (idx !== -1) {
          window.editor.setValue(cur.slice(0, idx) + '\n' + wrapped + '\n' + cur.slice(idx));
        } else {
          window.editor.setValue(cur + '\n' + wrapped);
        }
        if (window.runPreview) window.runPreview();
        showT(msg);
      }
    });

    document.getElementById('idb-load-full-app').addEventListener('click', () => {
      if (window.editor) {
        window.editor.setValue(STANDALONE_TEMPLATE);
        if (window.runPreview) window.runPreview();
        showT(T.loadSuccess);
      }
    });

    if (window.showToast) window.showToast(T.injected);
  }
})();
