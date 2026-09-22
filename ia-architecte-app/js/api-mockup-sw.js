/**
 * 🔌 REST API Client & Service Worker Mock v1.0
 * IA Architecte — Code Studio Pro | EN/FR Bilingual
 * Fully decoupled script using decorator pattern
 */
(function() {
'use strict';

const TX = {
  en: {
    tab: 'API Mock SW',
    title: '🔌 REST API Client & Service Worker Mock',
    sub: 'Mock APIs in preview iframe & generate server code',
    desc: 'Define mock endpoints below. When active, requests made using fetch() in the live preview matching these routes will be intercepted and resolved with your custom JSON payloads.',
    btnEnable: 'Mock SW Active',
    btnDisable: 'Mock SW Inactive',
    btnAdd: '➕ Add Endpoint',
    btnDelete: 'Delete',
    lblMethod: 'Method',
    lblPath: 'Path (e.g. /api/users)',
    lblStatus: 'Status Code',
    lblDelay: 'Delay (ms)',
    lblResponse: 'Response JSON Body',
    lblExpressTitle: '🚀 Express.js Server Code',
    lblExpressDesc: 'Instantly export these mock endpoints into a production-ready Express.js server.',
    btnCopyExpress: '📋 Copy Express Code',
    copied: 'Copied!',
    invalidJson: '❌ Invalid JSON body',
    routeAdded: 'Mock endpoint added!',
    routeDeleted: 'Endpoint deleted!',
    noRoutes: 'No endpoints registered. Add your first mock endpoint below!'
  },
  fr: {
    tab: 'API Mock SW',
    title: '🔌 Client REST API & Mock Service Worker',
    sub: 'Simulez des API dans la preview et générez le code serveur',
    desc: 'Définissez des points de terminaison fictifs. Une fois activé, les appels fetch() dans la prévisualisation correspondant à ces routes seront interceptés et résolus avec vos données JSON.',
    btnEnable: 'Mock SW Activé',
    btnDisable: 'Mock SW Désactivé',
    btnAdd: '➕ Ajouter Endpoint',
    btnDelete: 'Supprimer',
    lblMethod: 'Méthode',
    lblPath: 'Chemin (ex. /api/users)',
    lblStatus: 'Code Statut',
    lblDelay: 'Délai (ms)',
    lblResponse: 'Corps de Réponse JSON',
    lblExpressTitle: '🚀 Code Serveur Express.js',
    lblExpressDesc: 'Exportez instantanément ces endpoints vers un serveur Express.js prêt pour la production.',
    btnCopyExpress: '📋 Copier le Code Express',
    copied: 'Copié !',
    invalidJson: '❌ Format JSON invalide',
    routeAdded: 'Endpoint fictif ajouté !',
    routeDeleted: 'Endpoint supprimé !',
    noRoutes: 'Aucun endpoint enregistré. Ajoutez votre premier mock ci-dessous !'
  }
};

function gl() { return window.lang || 'en'; }
const t = k => (TX[gl()] || TX.en)[k] || k;

// Local state
let mockSwEnabled = true;
let routes = [
  {
    id: 'r1',
    method: 'GET',
    path: '/api/users',
    status: 200,
    delay: 500,
    response: [
      { id: 1, name: 'Alice Cooper', role: 'Administrator' },
      { id: 2, name: 'Bob Smith', role: 'Developer' }
    ]
  },
  {
    id: 'r2',
    method: 'POST',
    path: '/api/login',
    status: 200,
    delay: 800,
    response: { token: 'mock-jwt-token-xyz-12345', success: true }
  }
];

// Add Endpoint Form State
let formMethod = 'GET';
let formPath = '/api/data';
let formStatus = 200;
let formDelay = 300;
let formResponse = '{\n  "message": "Hello World",\n  "status": "success"\n}';

function saveRoute() {
  try {
    const parsed = JSON.parse(formResponse);
    routes.push({
      id: 'r_' + Date.now(),
      method: formMethod,
      path: formPath.startsWith('/') ? formPath : '/' + formPath,
      status: parseInt(formStatus) || 200,
      delay: parseInt(formDelay) || 0,
      response: parsed
    });
    if (window.showToast) window.showToast(t('routeAdded'));
    if (window.runPreview) window.runPreview();
    renderMockTab();
  } catch (e) {
    alert(t('invalidJson'));
  }
}

function deleteRoute(id) {
  routes = routes.filter(r => r.id !== id);
  if (window.showToast) window.showToast(t('routeDeleted'));
  if (window.runPreview) window.runPreview();
  renderMockTab();
}

function generateExpressCode() {
  let code = `const express = require('express');\n`;
  code += `const app = express();\n`;
  code += `const PORT = process.env.PORT || 3000;\n\n`;
  code += `app.use(express.json());\n`;
  code += `app.use((req, res, next) => {\n`;
  code += `  res.header('Access-Control-Allow-Origin', '*');\n`;
  code += `  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');\n`;
  code += `  next();\n`;
  code += `});\n\n`;

  routes.forEach(r => {
    code += `// Mock Endpoint ${r.method} ${r.path}\n`;
    code += `app.${r.method.toLowerCase()}('${r.path}', (req, res) => {\n`;
    if (r.delay > 0) {
      code += `  setTimeout(() => {\n`;
      code += `    res.status(${r.status}).json(${JSON.stringify(r.response, null, 2).replace(/\n/g, '\n    ')});\n`;
      code += `  }, ${r.delay});\n`;
    } else {
      code += `  res.status(${r.status}).json(${JSON.stringify(r.response, null, 2).replace(/\n/g, '\n  ')});\n`;
    }
    code += `});\n\n`;
  });

  code += `app.listen(PORT, () => {\n`;
  code += `  console.log(\`Mock API server is running on http://localhost:\${PORT}\`);\n`;
  code += `});\n`;

  return code;
}

function renderMockTab() {
  const parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';

  const wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1e;color:#e2e8f0;font-family:"Inter",sans-serif;';

  const hdr = document.createElement('div');
  hdr.style = 'padding:14px;border-bottom:1px solid rgba(99,102,241,0.25);flex-shrink:0;background:linear-gradient(135deg,rgba(99,102,241,0.1),rgba(16,185,129,0.05));';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#818cf8;">' + t('title') + '</div>' +
                  '<div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  const scrollContainer = document.createElement('div');
  scrollContainer.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:12px;scrollbar-width:thin;';

  const desc = document.createElement('div');
  desc.style = 'font-size:10.5px;color:#94a3b8;line-height:1.5;';
  desc.textContent = t('desc');
  scrollContainer.appendChild(desc);

  // Active switch
  const switchRow = document.createElement('div');
  switchRow.style = 'display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,0.03);padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.05);';
  
  const switchLbl = document.createElement('span');
  switchLbl.style = 'font-size:11px;font-weight:800;color:' + (mockSwEnabled ? '#10b981' : '#64748b') + ';';
  switchLbl.textContent = mockSwEnabled ? t('btnEnable') : t('btnDisable');
  
  const toggleBtn = document.createElement('label');
  toggleBtn.style = 'display:inline-flex;align-items:center;cursor:pointer;position:relative;width:40px;height:22px;';
  toggleBtn.innerHTML = `<input type="checkbox" ${mockSwEnabled ? 'checked' : ''} style="opacity:0;width:0;height:0;" />
    <span style="position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:${mockSwEnabled ? '#10b981' : '#334155'};transition:0.3s;border-radius:24px;"></span>
    <span style="position:absolute;content:'';height:16px;width:16px;left:3px;bottom:3px;background-color:white;transition:0.3s;border-radius:50%;transform:${mockSwEnabled ? 'translateX(18px)' : 'none'};"></span>`;
  toggleBtn.onclick = function(e) {
    e.preventDefault();
    mockSwEnabled = !mockSwEnabled;
    if (window.runPreview) window.runPreview();
    renderMockTab();
  };

  switchRow.appendChild(switchLbl);
  switchRow.appendChild(toggleBtn);
  scrollContainer.appendChild(switchRow);

  // Endpoint List
  const listHdr = document.createElement('div');
  listHdr.style = 'font-size:9.5px;font-weight:800;color:#64748b;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:3px;margin-top:4px;';
  listHdr.textContent = 'Endpoints';
  scrollContainer.appendChild(listHdr);

  if (routes.length === 0) {
    const emptyMsg = document.createElement('div');
    emptyMsg.style = 'font-size:11px;color:#64748b;text-align:center;padding:12px;font-style:italic;';
    emptyMsg.textContent = t('noRoutes');
    scrollContainer.appendChild(emptyMsg);
  } else {
    routes.forEach(r => {
      const card = document.createElement('div');
      card.style = 'background:#111528;border:1px solid rgba(99,102,241,0.15);border-radius:8px;padding:8px 10px;display:flex;flex-direction:column;gap:5px;';
      
      const cardHdr = document.createElement('div');
      cardHdr.style = 'display:flex;align-items:center;justify-content:space-between;';
      
      let mColor = '#10b981'; // GET
      if (r.method === 'POST') mColor = '#3b82f6';
      else if (r.method === 'PUT') mColor = '#f59e0b';
      else if (r.method === 'DELETE') mColor = '#ef4444';

      cardHdr.innerHTML = `<span style="font-family:monospace;font-size:10px;font-weight:900;background:${mColor}22;color:${mColor};padding:2px 6px;border-radius:4px;">${r.method}</span>` +
                          `<span style="font-family:monospace;font-size:10.5px;font-weight:700;color:#fff;margin-left:8px;flex:1;text-align:left;word-break:break-all;">${r.path}</span>`;
      
      const delBtn = document.createElement('button');
      delBtn.textContent = '✕';
      delBtn.style = 'background:none;border:none;color:#64748b;font-size:12px;cursor:pointer;padding:2px 6px;';
      delBtn.onclick = () => deleteRoute(r.id);
      cardHdr.appendChild(delBtn);
      
      const cardBody = document.createElement('div');
      cardBody.style = 'display:flex;justify-content:space-between;font-size:9px;color:#94a3b8;border-top:1px solid rgba(255,255,255,0.03);padding-top:4px;';
      cardBody.innerHTML = `<span>Status: <strong style="color:#34d399;">${r.status}</strong></span>` +
                           `<span>Delay: <strong>${r.delay}ms</strong></span>`;

      card.appendChild(cardHdr);
      card.appendChild(cardBody);
      scrollContainer.appendChild(card);
    });
  }

  // Add Route Section
  const formHdr = document.createElement('div');
  formHdr.style = 'font-size:9.5px;font-weight:800;color:#64748b;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:3px;margin-top:6px;';
  formHdr.textContent = 'Add Mock Endpoint';
  scrollContainer.appendChild(formHdr);

  const formWrap = document.createElement('div');
  formWrap.style = 'background:#131520;border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:8px;';

  // Row 1: Method & Path
  const row1 = document.createElement('div');
  row1.style = 'display:grid;grid-template-columns:80px 1fr;gap:6px;';
  
  const colMethod = document.createElement('div');
  colMethod.innerHTML = `<label style="font-size:8.5px;color:#64748b;font-weight:800;text-transform:uppercase;display:block;margin-bottom:3px;">${t('lblMethod')}</label>`;
  const selM = document.createElement('select');
  selM.style = 'width:100%;background:#090b11;border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:6px;padding:6px;font-size:10px;outline:none;';
  ['GET', 'POST', 'PUT', 'DELETE'].forEach(m => {
    const o = document.createElement('option');
    o.value = m; o.textContent = m;
    if (m === formMethod) o.selected = true;
    selM.appendChild(o);
  });
  selM.onchange = function() { formMethod = this.value; };
  colMethod.appendChild(selM);

  const colPath = document.createElement('div');
  colPath.innerHTML = `<label style="font-size:8.5px;color:#64748b;font-weight:800;text-transform:uppercase;display:block;margin-bottom:3px;">${t('lblPath')}</label>`;
  const inpP = document.createElement('input');
  inpP.type = 'text'; inpP.value = formPath;
  inpP.style = 'width:100%;background:#090b11;border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:6px;padding:6px;font-size:10px;outline:none;';
  inpP.oninput = function() { formPath = this.value; };
  colPath.appendChild(inpP);

  row1.appendChild(colMethod);
  row1.appendChild(colPath);
  formWrap.appendChild(row1);

  // Row 2: Status & Delay
  const row2 = document.createElement('div');
  row2.style = 'display:grid;grid-template-columns:1fr 1fr;gap:6px;';
  
  const colStatus = document.createElement('div');
  colStatus.innerHTML = `<label style="font-size:8.5px;color:#64748b;font-weight:800;text-transform:uppercase;display:block;margin-bottom:3px;">${t('lblStatus')}</label>`;
  const inpS = document.createElement('input');
  inpS.type = 'number'; inpS.value = formStatus;
  inpS.style = 'width:100%;background:#090b11;border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:6px;padding:6px;font-size:10px;outline:none;';
  inpS.oninput = function() { formStatus = parseInt(this.value) || 200; };
  colStatus.appendChild(inpS);

  const colDelay = document.createElement('div');
  colDelay.innerHTML = `<label style="font-size:8.5px;color:#64748b;font-weight:800;text-transform:uppercase;display:block;margin-bottom:3px;">${t('lblDelay')}</label>`;
  const inpD = document.createElement('input');
  inpD.type = 'number'; inpD.value = formDelay;
  inpD.style = 'width:100%;background:#090b11;border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:6px;padding:6px;font-size:10px;outline:none;';
  inpD.oninput = function() { formDelay = parseInt(this.value) || 0; };
  colDelay.appendChild(inpD);

  row2.appendChild(colStatus);
  row2.appendChild(colDelay);
  formWrap.appendChild(row2);

  // Response Body
  const colResp = document.createElement('div');
  colResp.innerHTML = `<label style="font-size:8.5px;color:#64748b;font-weight:800;text-transform:uppercase;display:block;margin-bottom:3px;">${t('lblResponse')}</label>`;
  const taResp = document.createElement('textarea');
  taResp.rows = 4; taResp.value = formResponse;
  taResp.style = 'width:100%;background:#090b11;border:1px solid rgba(255,255,255,0.1);color:#34d399;font-family:monospace;font-size:9.5px;border-radius:6px;padding:6px;outline:none;resize:vertical;';
  taResp.oninput = function() { formResponse = this.value; };
  colResp.appendChild(taResp);
  formWrap.appendChild(colResp);

  // Add button
  const addBtn = document.createElement('button');
  addBtn.textContent = t('btnAdd');
  addBtn.style = 'background:linear-gradient(90deg,#818cf8,#4f46e5);color:#fff;border:none;border-radius:6px;padding:8px;font-size:10px;font-weight:800;cursor:pointer;';
  addBtn.onclick = saveRoute;
  formWrap.appendChild(addBtn);

  scrollContainer.appendChild(formWrap);

  // Express generator
  const expHdr = document.createElement('div');
  expHdr.style = 'font-size:9.5px;font-weight:800;color:#64748b;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:3px;margin-top:8px;';
  expHdr.textContent = t('lblExpressTitle');
  scrollContainer.appendChild(expHdr);

  const expCard = document.createElement('div');
  expCard.style = 'background:#131524;border:1px solid rgba(129,140,248,0.2);border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:6px;';
  
  const expDesc = document.createElement('div');
  expDesc.style = 'font-size:9.5px;color:#94a3b8;line-height:1.4;';
  expDesc.textContent = t('lblExpressDesc');
  expCard.appendChild(expDesc);

  const expCode = document.createElement('textarea');
  expCode.rows = 6; expCode.readOnly = true; expCode.value = generateExpressCode();
  expCode.style = 'width:100%;background:#090b13;border:1px solid rgba(255,255,255,0.05);color:#818cf8;font-family:monospace;font-size:9px;border-radius:6px;padding:6px;outline:none;resize:vertical;';
  expCard.appendChild(expCode);

  const cpBtn = document.createElement('button');
  cpBtn.textContent = t('btnCopyExpress');
  cpBtn.style = 'background:rgba(129,140,248,0.1);color:#818cf8;border:1px solid rgba(129,140,248,0.3);border-radius:6px;padding:8px;font-size:9.5px;font-weight:800;cursor:pointer;';
  cpBtn.onclick = function() {
    navigator.clipboard.writeText(expCode.value).then(() => {
      if (window.showToast) window.showToast(t('copied'));
    });
  };
  expCard.appendChild(cpBtn);
  scrollContainer.appendChild(expCard);

  wrap.appendChild(scrollContainer);
  parent.appendChild(wrap);
}

// Intercepting fetch using dynamically decorated runPreview
function injectFetchInterceptor(htmlCode) {
  if (!mockSwEnabled || routes.length === 0) return htmlCode;

  const scriptTag = `
  <!-- API Client SW Interceptor Mock -->
  <script id="ia-api-mock-sw-script">
  (function() {
    const mockEndpoints = ${JSON.stringify(routes)};
    const originalFetch = window.fetch;
    
    window.fetch = function(input, init) {
      let url = typeof input === 'string' ? input : (input instanceof Request ? input.url : '');
      let path = url;
      try {
        const parsed = new URL(url, window.location.href);
        path = parsed.pathname;
      } catch(e) {}
      
      const matched = mockEndpoints.find(e => {
        const routePath = e.path.startsWith('/') ? e.path : '/' + e.path;
        const checkPath = path.startsWith('/') ? path : '/' + path;
        return (e.method.toUpperCase() === (init?.method || 'GET').toUpperCase()) && (routePath === checkPath);
      });
      
      if (matched) {
        console.log("🔌 [API Mock SW] Intercepted Request: " + matched.method + " " + matched.path);
        return new Promise((resolve) => {
          setTimeout(() => {
            const response = new Response(JSON.stringify(matched.response), {
              status: matched.status || 200,
              headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              }
            });
            resolve(response);
          }, matched.delay || 0);
        });
      }
      return originalFetch.apply(this, arguments);
    };
    console.log("🔌 [API Mock SW] Interceptor Initialized successfully. Intercepting requests.");
  })();
  <\/script>
  `;

  if (htmlCode.includes('</head>')) {
    return htmlCode.replace('</head>', scriptTag + '</head>');
  } else if (htmlCode.includes('<head>')) {
    return htmlCode.replace('<head>', '<head>' + scriptTag);
  } else {
    return scriptTag + htmlCode;
  }
}

// Hook tab triggers
document.addEventListener('DOMContentLoaded', function() {
  const oAL = window.applyLang;
  window.applyLang = function() {
    if (typeof oAL === 'function') oAL();
    const el = document.getElementById('lbl-tab-apiclientmock');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'apiclientmock') renderMockTab();
  };

  const oRT = window.renderTab;
  window.renderTab = function(tab) {
    if (tab === 'apiclientmock') {
      window.activeTab = 'apiclientmock';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('tab-apiclientmock');
      if (btn) btn.classList.add('active');
      renderMockTab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };

  // Decorating runPreview to inject our script dynamically
  const originalRunPreview = window.runPreview;
  window.runPreview = function() {
    const ed = window.editor;
    if (mockSwEnabled && ed && typeof originalRunPreview === 'function') {
      const originalGetValue = ed.getValue;
      ed.getValue = function() {
        let val = originalGetValue.apply(ed);
        val = injectFetchInterceptor(val);
        return val;
      };
      try {
        originalRunPreview();
      } finally {
        ed.getValue = originalGetValue;
      }
    } else {
      if (typeof originalRunPreview === 'function') {
        originalRunPreview();
      }
    }
  };
});
})();
