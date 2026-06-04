/**
 * Backend & API Mock Studio v1.0 — EN/FR
 * Intercepts fetch requests to simulate a real backend environment
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: 'Backend', title: '🗄️ Backend Mock Studio', sub: 'Simulate APIs & Databases',
    addApi: '➕ Add API Endpoint', path: 'Endpoint Path (e.g. /api/users)',
    data: 'JSON Response Data', save: 'Save Endpoint',
    endpoints: 'Your Endpoints', empty: 'No API endpoints defined.',
    inject: '⚡ Inject Mock Server', injected: '✅ Mock Server Injected!',
    errJson: '❌ Invalid JSON data format!'
  },
  fr: {
    tab: 'Backend', title: '🗄️ Simulateur Backend', sub: 'Simulez APIs & Bases de données',
    addApi: '➕ Ajouter un Endpoint API', path: 'Chemin (ex: /api/users)',
    data: 'Données JSON', save: 'Sauvegarder l\'Endpoint',
    endpoints: 'Vos Endpoints', empty: 'Aucun endpoint défini.',
    inject: '⚡ Injecter le Serveur Mock', injected: '✅ Serveur Mock Injecté !',
    errJson: '❌ Format JSON invalide !'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var state = {
  endpoints: [
    { id: 1, path: '/api/users', data: '[\n  { "id": 1, "name": "John Doe", "role": "Admin" },\n  { "id": 2, "name": "Jane Smith", "role": "User" }\n]' },
    { id: 2, path: '/api/products', data: '[\n  { "id": 101, "title": "MacBook Pro", "price": 1999 },\n  { "id": 102, "title": "iPhone 15", "price": 999 }\n]' }
  ],
  editingId: null,
  formPath: '',
  formData: ''
};

function addEndpoint() {
  try {
    JSON.parse(state.formData); // validate json
  } catch(e) {
    alert(t('errJson')); return;
  }
  
  if(state.editingId) {
    var idx = state.endpoints.findIndex(function(e){ return e.id === state.editingId; });
    if(idx > -1) {
      state.endpoints[idx].path = state.formPath;
      state.endpoints[idx].data = state.formData;
    }
    state.editingId = null;
  } else {
    state.endpoints.push({ id: Date.now(), path: state.formPath || '/api/new', data: state.formData });
  }
  state.formPath = ''; state.formData = '';
  renderBackendTab();
}

function editEndpoint(id) {
  var ep = state.endpoints.find(function(e){ return e.id === id; });
  if(ep) {
    state.editingId = id;
    state.formPath = ep.path;
    state.formData = ep.data;
    renderBackendTab();
  }
}

function delEndpoint(id) {
  state.endpoints = state.endpoints.filter(function(e){ return e.id !== id; });
  renderBackendTab();
}

function injectMockServer() {
  if(!window.editor) return;
  var dict = {};
  state.endpoints.forEach(function(e) {
    try { dict[e.path] = JSON.parse(e.data); } catch(err){}
  });
  
  var script = '\n<!-- 🗄️ IA-PRO Backend Mock Server -->\n<script id="ia-mock-server">\n(function() {\n  var origFetch = window.fetch;\n  var mockDB = ' + JSON.stringify(dict, null, 2).replace(/\n/g, '\n  ') + ';\n  \n  window.fetch = function(url, options) {\n    if(mockDB[url]) {\n      console.log("%c[Mock API] %c" + url, "color:#10b981;font-weight:bold;", "color:#fff;");\n      return new Promise(function(resolve) {\n        setTimeout(function() {\n          resolve({\n            ok: true,\n            status: 200,\n            json: function() { return Promise.resolve(mockDB[url]); },\n            text: function() { return Promise.resolve(JSON.stringify(mockDB[url])); }\n          });\n        }, 400); // Simulate network delay\n      });\n    }\n    return origFetch.apply(this, arguments);\n  };\n})();\n</script>\n';

  var code = window.editor.getValue().replace(/<!-- 🗄️ IA-PRO Backend Mock Server -->[\s\S]*?<\/script>\n/g, '');
  code = code.includes('</head>') ? code.replace('</head>', script + '</head>') : script + code;
  
  window.editor.setValue(code);
  if(window.runPreview) window.runPreview();
  if(window.showToast) window.showToast(t('injected'));
}

function renderBackendTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(245,158,11,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#f59e0b;">' + t('title') + '</div><div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:15px;';

  // Builder Form
  var form = document.createElement('div');
  form.style = 'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;';
  
  var fTitle = document.createElement('div');
  fTitle.style = 'font-size:9px;font-weight:900;color:#f59e0b;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;';
  fTitle.textContent = state.editingId ? '✏️ Edit Endpoint' : t('addApi');
  form.appendChild(fTitle);

  var inpPath = document.createElement('input');
  inpPath.type = 'text'; inpPath.placeholder = t('path');
  inpPath.value = state.formPath;
  inpPath.style = 'width:100%;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:8px;color:#fff;font-size:11px;outline:none;margin-bottom:8px;box-sizing:border-box;font-family:monospace;';
  inpPath.oninput = function(){ state.formPath = inpPath.value; };
  form.appendChild(inpPath);

  var txtData = document.createElement('textarea');
  txtData.placeholder = t('data');
  txtData.value = state.formData;
  txtData.style = 'width:100%;height:100px;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:8px;color:#cbd5e1;font-size:11px;outline:none;margin-bottom:8px;box-sizing:border-box;font-family:monospace;resize:vertical;';
  txtData.oninput = function(){ state.formData = txtData.value; };
  form.appendChild(txtData);

  var bSave = document.createElement('button');
  bSave.textContent = t('save');
  bSave.style = 'width:100%;background:rgba(245,158,11,0.2);color:#fbbf24;border:1px solid rgba(245,158,11,0.4);border-radius:6px;padding:8px;font-weight:900;font-size:10px;cursor:pointer;';
  bSave.onclick = addEndpoint;
  form.appendChild(bSave);
  body.appendChild(form);

  // List Endpoints
  var lSec = document.createElement('div');
  lSec.innerHTML = '<div style="font-size:9px;font-weight:900;color:#94a3b8;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;">' + t('endpoints') + ' (' + state.endpoints.length + ')</div>';
  var list = document.createElement('div');
  list.style = 'display:flex;flex-direction:column;gap:8px;';
  
  if(state.endpoints.length === 0) {
    list.innerHTML = '<div style="font-size:10px;color:#64748b;font-style:italic;">' + t('empty') + '</div>';
  } else {
    state.endpoints.forEach(function(ep) {
      var item = document.createElement('div');
      item.style = 'background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:8px;padding:10px;';
      var tRow = document.createElement('div');
      tRow.style = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;';
      tRow.innerHTML = '<div style="font-size:11px;font-family:monospace;color:#10b981;font-weight:700;"><span style="color:#64748b;margin-right:4px;">GET</span>' + ep.path + '</div>';
      
      var act = document.createElement('div'); act.style='display:flex;gap:4px;';
      var bEd = document.createElement('button'); bEd.textContent = '✏️';
      bEd.style = 'background:transparent;border:none;cursor:pointer;font-size:10px;padding:2px;';
      bEd.onclick = function(){ editEndpoint(ep.id); };
      var bDel = document.createElement('button'); bDel.textContent = '❌';
      bDel.style = 'background:transparent;border:none;cursor:pointer;font-size:10px;padding:2px;';
      bDel.onclick = function(){ delEndpoint(ep.id); };
      act.appendChild(bEd); act.appendChild(bDel);
      tRow.appendChild(act); item.appendChild(tRow);

      var pCode = document.createElement('pre');
      pCode.style = 'background:rgba(0,0,0,0.4);border-radius:4px;padding:6px;font-size:9px;color:#cbd5e1;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;margin:0;font-family:monospace;';
      pCode.textContent = ep.data;
      item.appendChild(pCode);
      list.appendChild(item);
    });
  }
  lSec.appendChild(list);
  body.appendChild(lSec);

  var bInj = document.createElement('button');
  bInj.textContent = t('inject');
  bInj.style = 'width:100%;background:linear-gradient(135deg,#f59e0b,#d97706);border:none;border-radius:6px;padding:12px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;margin-top:auto;';
  bInj.onclick = injectMockServer;
  
  wrap.appendChild(body);
  wrap.appendChild(bInj); // push to bottom
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-mock');
    if(el) el.textContent = t('tab');
    if(window.activeTab==='mock') renderBackendTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='mock') {
      window.activeTab = 'mock';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn = document.getElementById('tab-mock');
      if(btn) btn.classList.add('active');
      renderBackendTab(); return;
    }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
