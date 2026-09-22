/**
 * Live API Tester v1.0 — EN/FR
 * Make real HTTP requests, visualize JSON, inject as mock data
 */
(function () {
  'use strict';

  var TX = {
    en: {
      tab: 'API Tester',
      title: '🧪 Live API Tester',
      sub: 'Test any REST API in real-time',
      urlLabel: 'API Endpoint URL:',
      urlPh: 'https://api.example.com/data',
      method: 'Method:',
      headers: 'Headers (JSON):',
      headPh: '{"Authorization": "Bearer token"}',
      body: 'Request Body (JSON):',
      bodyPh: '{"key": "value"}',
      btnSend: '🚀 Send Request',
      btnInject: '💉 Inject as Mock Data',
      btnCopy: '📋 Copy Response',
      sending: '⏳ Sending...',
      status: 'Status:',
      time: 'Time:',
      size: 'Size:',
      noUrl: '⚠️ Please enter a URL.',
      injected: '✅ Mock data injected into editor!',
      copied: '📋 Response copied!',
      error: '❌ Request failed:',
      presets: 'Quick Presets:',
      respLabel: 'Response:',
      tryIt: 'Try it!'
    },
    fr: {
      tab: 'API Tester',
      title: '🧪 Testeur API en Direct',
      sub: 'Testez n\'importe quelle API REST en temps réel',
      urlLabel: 'URL de l\'Endpoint API :',
      urlPh: 'https://api.example.com/data',
      method: 'Méthode :',
      headers: 'En-têtes (JSON) :',
      headPh: '{"Authorization": "Bearer token"}',
      body: 'Corps de la Requête (JSON) :',
      bodyPh: '{"clé": "valeur"}',
      btnSend: '🚀 Envoyer la Requête',
      btnInject: '💉 Injecter comme Mock Data',
      btnCopy: '📋 Copier la Réponse',
      sending: '⏳ Envoi en cours...',
      status: 'Statut :',
      time: 'Temps :',
      size: 'Taille :',
      noUrl: '⚠️ Veuillez entrer une URL.',
      injected: '✅ Mock data injectée dans l\'éditeur !',
      copied: '📋 Réponse copiée !',
      error: '❌ Requête échouée :',
      presets: 'Exemples rapides :',
      respLabel: 'Réponse :',
      tryIt: 'Essayer !'
    }
  };

  function gl() { return window.lang || 'en'; }
  function t(k) { return (TX[gl()] || TX.en)[k] || k; }

  var lastResponse = null;
  var currentMethod = 'GET';

  var PRESETS = [
    { name: 'JSONPlaceholder Posts', url: 'https://jsonplaceholder.typicode.com/posts?_limit=5', method: 'GET' },
    { name: 'JSONPlaceholder Users', url: 'https://jsonplaceholder.typicode.com/users?_limit=3', method: 'GET' },
    { name: 'Open Meteo Weather', url: 'https://api.open-meteo.com/v1/forecast?latitude=48.85&longitude=2.35&current_weather=true', method: 'GET' },
    { name: 'REST Countries France', url: 'https://restcountries.com/v3.1/name/france?fields=name,capital,population,flags', method: 'GET' },
    { name: 'GitHub Octocat', url: 'https://api.github.com/users/octocat', method: 'GET' },
    { name: 'Cat Facts', url: 'https://catfact.ninja/fact', method: 'GET' }
  ];

  function syntaxHighlight(json) {
    if (typeof json !== 'string') json = JSON.stringify(json, null, 2);
    return json
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (m) {
        var cls = 'color:#ce9178'; // string
        if (/^"/.test(m)) {
          if (/:$/.test(m)) cls = 'color:#9cdcfe'; // key
        } else if (/true|false/.test(m)) {
          cls = 'color:#569cd6'; // bool
        } else if (/null/.test(m)) {
          cls = 'color:#808080'; // null
        } else {
          cls = 'color:#b5cea8'; // number
        }
        return '<span style="' + cls + '">' + m + '</span>';
      });
  }

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    return (bytes / 1024).toFixed(1) + ' KB';
  }

  function getStatusColor(status) {
    if (status >= 200 && status < 300) return '#10b981';
    if (status >= 300 && status < 400) return '#f59e0b';
    if (status >= 400) return '#ef4444';
    return '#94a3b8';
  }

  async function doRequest(url, method, headers, body) {
    var opts = { method: method, headers: { 'Content-Type': 'application/json' } };
    try {
      var parsed = headers ? JSON.parse(headers) : {};
      Object.assign(opts.headers, parsed);
    } catch (e) {}
    if (method !== 'GET' && method !== 'HEAD' && body) {
      opts.body = body;
    }
    var t0 = Date.now();
    var resp = await fetch(url, opts);
    var elapsed = Date.now() - t0;
    var text = await resp.text();
    var json = null;
    try { json = JSON.parse(text); } catch (e) {}
    return { status: resp.status, statusText: resp.statusText, elapsed: elapsed, text: text, json: json };
  }

  function renderTab() {
    var parent = document.getElementById('left-body');
    if (!parent) return;
    parent.innerHTML = '';

    var wrap = document.createElement('div');
    wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';

    /* Header */
    var hdr = document.createElement('div');
    hdr.style = 'padding:12px 14px 10px;border-bottom:1px solid rgba(16,185,129,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(6,182,212,0.06));';
    hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#34d399;letter-spacing:0.5px;">' + t('title') + '</div>' +
      '<div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
    wrap.appendChild(hdr);

    var body = document.createElement('div');
    body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;';

    /* Presets */
    var presetsLabel = document.createElement('div');
    presetsLabel.style = 'font-size:10px;color:#64748b;font-weight:600;';
    presetsLabel.textContent = t('presets');
    body.appendChild(presetsLabel);

    var presetsGrid = document.createElement('div');
    presetsGrid.style = 'display:flex;flex-wrap:wrap;gap:5px;';
    PRESETS.forEach(function(p) {
      var chip = document.createElement('button');
      chip.textContent = p.name;
      chip.style = 'font-size:9px;padding:4px 8px;border-radius:20px;border:1px solid rgba(16,185,129,0.3);background:rgba(16,185,129,0.06);color:#34d399;cursor:pointer;white-space:nowrap;transition:all 0.2s;';
      chip.onmouseover = function() { this.style.background='rgba(16,185,129,0.2)'; };
      chip.onmouseout = function() { this.style.background='rgba(16,185,129,0.06)'; };
      chip.onclick = function() {
        var urlIn = document.getElementById('api-url-input');
        var methodSel = document.getElementById('api-method-sel');
        if (urlIn) urlIn.value = p.url;
        if (methodSel) { methodSel.value = p.method; currentMethod = p.method; }
      };
      presetsGrid.appendChild(chip);
    });
    body.appendChild(presetsGrid);

    /* Method + URL row */
    var rowLabel = document.createElement('div');
    rowLabel.style = 'font-size:10px;color:#64748b;font-weight:600;margin-top:4px;';
    rowLabel.textContent = t('urlLabel');
    body.appendChild(rowLabel);

    var urlRow = document.createElement('div');
    urlRow.style = 'display:flex;gap:6px;';

    var methodSel = document.createElement('select');
    methodSel.id = 'api-method-sel';
    methodSel.style = 'background:#1e293b;color:#e2e8f0;border:1px solid rgba(16,185,129,0.3);padding:8px 6px;border-radius:8px;font-size:10px;font-weight:700;width:80px;flex-shrink:0;cursor:pointer;';
    ['GET','POST','PUT','PATCH','DELETE'].forEach(function(m) {
      var opt = document.createElement('option');
      opt.value = m; opt.textContent = m;
      if (m === currentMethod) opt.selected = true;
      methodSel.appendChild(opt);
    });
    methodSel.onchange = function() { currentMethod = this.value; };

    var urlInput = document.createElement('input');
    urlInput.id = 'api-url-input';
    urlInput.type = 'text';
    urlInput.placeholder = t('urlPh');
    urlInput.style = 'flex:1;background:#1e293b;color:#e2e8f0;border:1px solid rgba(16,185,129,0.3);padding:8px 10px;border-radius:8px;font-size:10px;outline:none;font-family:monospace;';

    urlRow.appendChild(methodSel);
    urlRow.appendChild(urlInput);
    body.appendChild(urlRow);

    /* Headers */
    var headLabel = document.createElement('div');
    headLabel.style = 'font-size:10px;color:#64748b;font-weight:600;';
    headLabel.textContent = t('headers');
    body.appendChild(headLabel);

    var headInput = document.createElement('textarea');
    headInput.id = 'api-headers-input';
    headInput.placeholder = t('headPh');
    headInput.rows = 2;
    headInput.style = 'background:#1e293b;color:#e2e8f0;border:1px solid rgba(16,185,129,0.15);padding:8px 10px;border-radius:8px;font-size:10px;resize:vertical;outline:none;font-family:monospace;width:100%;box-sizing:border-box;';
    body.appendChild(headInput);

    /* Body */
    var bodyLabel = document.createElement('div');
    bodyLabel.style = 'font-size:10px;color:#64748b;font-weight:600;';
    bodyLabel.textContent = t('body');
    body.appendChild(bodyLabel);

    var bodyInput = document.createElement('textarea');
    bodyInput.id = 'api-body-input';
    bodyInput.placeholder = t('bodyPh');
    bodyInput.rows = 2;
    bodyInput.style = 'background:#1e293b;color:#e2e8f0;border:1px solid rgba(16,185,129,0.15);padding:8px 10px;border-radius:8px;font-size:10px;resize:vertical;outline:none;font-family:monospace;width:100%;box-sizing:border-box;';
    body.appendChild(bodyInput);

    /* Send button */
    var sendBtn = document.createElement('button');
    sendBtn.innerHTML = t('btnSend');
    sendBtn.style = 'width:100%;background:linear-gradient(135deg,#059669,#0891b2);color:#fff;border:none;padding:12px;border-radius:10px;font-weight:900;font-size:12px;cursor:pointer;box-shadow:0 4px 20px rgba(5,150,105,0.35);letter-spacing:0.5px;transition:all 0.2s;';
    sendBtn.onmouseover = function() { this.style.transform='translateY(-1px)'; this.style.boxShadow='0 6px 25px rgba(5,150,105,0.55)'; };
    sendBtn.onmouseout = function() { this.style.transform=''; this.style.boxShadow='0 4px 20px rgba(5,150,105,0.35)'; };

    sendBtn.onclick = async function() {
      var url = (document.getElementById('api-url-input') || {}).value || '';
      var headers = (document.getElementById('api-headers-input') || {}).value || '';
      var reqBody = (document.getElementById('api-body-input') || {}).value || '';

      if (!url.trim()) { if (window.showToast) window.showToast(t('noUrl')); return; }

      sendBtn.innerHTML = t('sending');
      sendBtn.disabled = true;

      var statusEl = document.getElementById('api-status-row');
      var preEl = document.getElementById('api-response-pre');
      var actRow = document.getElementById('api-act-row');

      try {
        var result = await doRequest(url, currentMethod, headers, reqBody);
        lastResponse = result;

        if (statusEl) {
          var sc = getStatusColor(result.status);
          statusEl.innerHTML = '<span style="color:' + sc + ';font-weight:900;font-size:11px;">' + result.status + ' ' + result.statusText + '</span>' +
            ' &nbsp; <span style="color:#64748b;font-size:9px;">' + t('time').replace(':','') + ': <b style="color:#94a3b8;">' + result.elapsed + 'ms</b></span>' +
            ' &nbsp; <span style="color:#64748b;font-size:9px;">' + t('size').replace(':','') + ': <b style="color:#94a3b8;">' + formatBytes(result.text.length) + '</b></span>';
          statusEl.style.display = 'flex';
        }

        if (preEl) {
          var display = result.json ? syntaxHighlight(result.json) : '<span style="color:#94a3b8;">' + result.text.replace(/</g,'&lt;') + '</span>';
          preEl.innerHTML = display;
        }

        if (actRow) actRow.style.display = 'flex';

      } catch (err) {
        if (preEl) preEl.innerHTML = '<span style="color:#ef4444;">' + t('error') + ' ' + err.message + '</span>';
        if (actRow) actRow.style.display = 'none';
      }

      sendBtn.innerHTML = t('btnSend');
      sendBtn.disabled = false;
    };
    body.appendChild(sendBtn);

    /* Status row */
    var statusRow = document.createElement('div');
    statusRow.id = 'api-status-row';
    statusRow.style = 'display:none;align-items:center;gap:8px;padding:6px 0;';
    body.appendChild(statusRow);

    /* Response label */
    var respLabel = document.createElement('div');
    respLabel.style = 'font-size:10px;color:#64748b;font-weight:600;';
    respLabel.textContent = t('respLabel');
    body.appendChild(respLabel);

    /* Response pre */
    var pre = document.createElement('pre');
    pre.id = 'api-response-pre';
    pre.style = 'background:#0d1117;border:1px solid rgba(16,185,129,0.2);border-radius:8px;padding:10px;font-family:"JetBrains Mono",monospace;font-size:9px;overflow:auto;max-height:200px;white-space:pre-wrap;word-break:break-word;line-height:1.5;margin:0;min-height:50px;color:#94a3b8;';
    pre.textContent = gl() === 'fr' ? '// La réponse s\'affichera ici...' : '// Response will appear here...';
    body.appendChild(pre);

    /* Action buttons */
    var actRow = document.createElement('div');
    actRow.id = 'api-act-row';
    actRow.style = 'display:none;gap:8px;';

    var copyBtn = document.createElement('button');
    copyBtn.innerHTML = t('btnCopy');
    copyBtn.style = 'flex:1;background:rgba(16,185,129,0.1);color:#34d399;border:1px solid rgba(16,185,129,0.3);padding:9px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
    copyBtn.onclick = function() {
      if (lastResponse && lastResponse.text) {
        navigator.clipboard.writeText(lastResponse.text).then(function() {
          if (window.showToast) window.showToast(t('copied'));
        });
      }
    };

    var injectBtn = document.createElement('button');
    injectBtn.innerHTML = t('btnInject');
    injectBtn.style = 'flex:1;background:rgba(6,182,212,0.1);color:#22d3ee;border:1px solid rgba(6,182,212,0.3);padding:9px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
    injectBtn.onclick = function() {
      if (!window.editor || !lastResponse) return;
      var code = window.editor.getValue();
      var varName = 'apiData';
      var dataStr = lastResponse.json
        ? 'const ' + varName + ' = ' + JSON.stringify(lastResponse.json, null, 2) + ';'
        : 'const ' + varName + ' = ' + JSON.stringify(lastResponse.text) + ';';

      var mockBlock = '\n<!-- Mock Data from Live API -->\n<script>\n' + dataStr + '\nconsole.log(\'' + varName + ':\', ' + varName + ');\n</script>\n';

      if (code.includes('</body>')) {
        code = code.replace('</body>', mockBlock + '</body>');
      } else {
        code += mockBlock;
      }
      window.editor.setValue(code);
      if (window.runPreview) window.runPreview();
      if (window.showToast) window.showToast(t('injected'));
    };

    actRow.appendChild(copyBtn);
    actRow.appendChild(injectBtn);
    body.appendChild(actRow);

    wrap.appendChild(body);
    parent.appendChild(wrap);
  }

  /* ── REGISTER ── */
  document.addEventListener('DOMContentLoaded', function () {
    var oAL = window.applyLang;
    window.applyLang = function () {
      if (typeof oAL === 'function') oAL();
      var el = document.getElementById('lbl-tab-apitester');
      if (el) el.textContent = t('tab');
      if (window.activeTab === 'apitester') renderTab();
    };

    var oRT = window.renderTab;
    window.renderTab = function (tab) {
      if (tab === 'apitester') {
        window.activeTab = 'apitester';
        document.querySelectorAll('.ltab').forEach(function (b) { b.classList.remove('active'); });
        var btn = document.getElementById('tab-apitester');
        if (btn) btn.classList.add('active');
        renderTab();
        return;
      }
      if (typeof oRT === 'function') oRT(tab);
    };
  });
})();
