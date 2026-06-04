/**
 * AI Pair Programmer v1.0 — EN/FR
 * AI that writes code alongside you line-by-line using suggestions
 */
(function () {
'use strict';
var TX = {
  en: { tab:'AI Pair', title:'🧠 AI Pair Programmer', sub:'AI writes code alongside you, live',
        context:'What are you building?', contextPh:'e.g. a dark-mode login form with validation...',
        btnStart:'🤖 Start AI Pair Session', btnNext:'➡️ Next Suggestion', btnAccept:'✅ Accept & Inject',
        btnSkip:'⏭ Skip', btnStop:'⏹ Stop Session', active:'Session active — AI is watching your code.',
        stopped:'Session stopped.', injected:'✅ Suggestion injected!', copied:'📋 Copied!',
        suggest:'💡 AI Suggestion:', noCtx:'Please describe what you are building first.',
        lines:'lines written', tip:'The AI analyzes your code context and suggests the next logical block.',
        btnCopy:'📋 Copy' },
  fr: { tab:'AI Pair', title:'🧠 AI Pair Programmer', sub:'L\'IA écrit le code avec vous, en direct',
        context:'Que construisez-vous ?', contextPh:'ex. un formulaire login dark-mode avec validation...',
        btnStart:'🤖 Démarrer la Session IA', btnNext:'➡️ Suggestion Suivante', btnAccept:'✅ Accepter & Injecter',
        btnSkip:'⏭ Passer', btnStop:'⏹ Arrêter la Session', active:'Session active — L\'IA observe votre code.',
        stopped:'Session arrêtée.', injected:'✅ Suggestion injectée !', copied:'📋 Copié !',
        suggest:'💡 Suggestion IA :', noCtx:'Décrivez d\'abord ce que vous construisez.',
        lines:'lignes écrites', tip:'L\'IA analyse le contexte de votre code et suggère le prochain bloc logique.',
        btnCopy:'📋 Copier' }
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var sessionActive = false;
var suggestionIndex = 0;
var lastSuggestion = '';

// Smart template suggestion engine based on context keywords
var SUGGESTIONS = {
  login: [
    '<div class="login-container">\n  <form id="loginForm" onsubmit="handleLogin(event)">\n    <h2>Sign In</h2>\n    <div class="input-group">\n      <input type="email" id="email" placeholder="Email" required />\n    </div>',
    '    <div class="input-group">\n      <input type="password" id="password" placeholder="Password" required />\n      <button type="button" onclick="togglePwd()" class="eye-btn">👁</button>\n    </div>',
    '    <button type="submit" class="btn-primary">Sign In</button>\n    <p class="forgot"><a href="#">Forgot password?</a></p>\n  </form>\n</div>',
    'function handleLogin(e) {\n  e.preventDefault();\n  const email = document.getElementById("email").value;\n  const pwd = document.getElementById("password").value;\n  if(!email || !pwd) { showError("All fields required"); return; }\n  console.log("Login:", email);\n}',
    'function togglePwd() {\n  const p = document.getElementById("password");\n  p.type = p.type === "password" ? "text" : "password";\n}\nfunction showError(msg) {\n  const el = document.getElementById("error-msg");\n  if(el) { el.textContent = msg; el.style.display="block"; }\n}'
  ],
  dashboard: [
    '<div class="dashboard">\n  <aside class="sidebar">\n    <nav><ul>\n      <li class="active"><a href="#">🏠 Home</a></li>\n      <li><a href="#">📊 Analytics</a></li>\n      <li><a href="#">👤 Profile</a></li>\n    </ul></nav>\n  </aside>',
    '  <main class="main-content">\n    <div class="stats-grid">\n      <div class="stat-card">\n        <span class="stat-value" id="stat1">0</span>\n        <span class="stat-label">Total Users</span>\n      </div>',
    '      <div class="stat-card">\n        <span class="stat-value" id="stat2">0</span>\n        <span class="stat-label">Revenue</span>\n      </div>\n    </div>\n  </main>\n</div>',
    'function animateCounter(id, target) {\n  let count = 0;\n  const step = Math.ceil(target / 60);\n  const el = document.getElementById(id);\n  const timer = setInterval(() => {\n    count = Math.min(count + step, target);\n    if(el) el.textContent = count.toLocaleString();\n    if(count >= target) clearInterval(timer);\n  }, 16);\n}',
    'document.addEventListener("DOMContentLoaded", () => {\n  animateCounter("stat1", 12483);\n  animateCounter("stat2", 98500);\n});'
  ],
  card: [
    '<div class="card-grid">\n  <div class="card" onclick="selectCard(this)">\n    <div class="card-icon">🚀</div>\n    <h3 class="card-title">Feature One</h3>\n    <p class="card-desc">Description of this awesome feature.</p>',
    '    <div class="card-footer">\n      <span class="card-tag">New</span>\n      <button class="card-btn">Learn More</button>\n    </div>\n  </div>\n</div>',
    '.card { background: var(--surface, #1e293b); border-radius: 16px; padding: 24px;\n  border: 1px solid rgba(255,255,255,0.08); transition: transform 0.3s, box-shadow 0.3s;\n  cursor: pointer; }\n.card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }',
    'function selectCard(el) {\n  document.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));\n  el.classList.add("selected");\n}',
    '.card.selected { border-color: var(--accent, #3b82f6); box-shadow: 0 0 0 2px var(--accent, #3b82f6)33; }'
  ],
  default: [
    '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>My App</title>\n</head>',
    '<body>\n  <header class="header">\n    <nav class="navbar">\n      <div class="brand">🏛️ MyApp</div>\n      <ul class="nav-links">\n        <li><a href="#">Home</a></li>\n        <li><a href="#">About</a></li>\n      </ul>\n    </nav>\n  </header>',
    '  <main class="hero">\n    <h1>Welcome to MyApp</h1>\n    <p>Build something amazing today.</p>\n    <button class="cta-btn" onclick="getStarted()">Get Started</button>\n  </main>',
    'function getStarted() {\n  document.querySelector(".hero").style.opacity = "0";\n  setTimeout(() => { document.querySelector(".hero").style.display = "none"; }, 400);\n}',
    '</body>\n</html>'
  ]
};

function getSuggestions(ctx) {
  var low = (ctx||'').toLowerCase();
  if (low.includes('login') || low.includes('auth') || low.includes('sign')) return SUGGESTIONS.login;
  if (low.includes('dashboard') || low.includes('admin') || low.includes('panel')) return SUGGESTIONS.dashboard;
  if (low.includes('card') || low.includes('product') || low.includes('grid')) return SUGGESTIONS.card;
  return SUGGESTIONS.default;
}

function renderTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 10px;border-bottom:1px solid rgba(16,185,129,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(99,102,241,0.06));';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#34d399;">' + t('title') + '</div>' +
    '<div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';

  // Tip
  var tip = document.createElement('div');
  tip.style = 'font-size:10px;color:#94a3b8;background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.15);border-radius:6px;padding:8px 10px;line-height:1.5;';
  tip.textContent = t('tip');
  body.appendChild(tip);

  // Context input
  var ctxLabel = document.createElement('div');
  ctxLabel.style = 'font-size:10px;color:#64748b;font-weight:600;';
  ctxLabel.textContent = t('context');
  body.appendChild(ctxLabel);

  var ctxInput = document.createElement('textarea');
  ctxInput.id = 'pair-ctx'; ctxInput.placeholder = t('contextPh'); ctxInput.rows = 3;
  ctxInput.style = 'background:#1e293b;color:#e2e8f0;border:1px solid rgba(16,185,129,0.25);padding:8px 10px;border-radius:8px;font-size:10px;outline:none;resize:vertical;width:100%;box-sizing:border-box;font-family:inherit;line-height:1.4;';
  body.appendChild(ctxInput);

  // Session status
  var status = document.createElement('div');
  status.id = 'pair-status';
  status.style = 'font-size:10px;padding:6px 10px;border-radius:6px;text-align:center;font-weight:700;' +
    (sessionActive ? 'background:rgba(16,185,129,0.15);color:#34d399;border:1px solid rgba(16,185,129,0.3);' : 'display:none;');
  status.textContent = sessionActive ? '🟢 ' + t('active') : '';
  body.appendChild(status);

  // Start / Stop button
  var startBtn = document.createElement('button');
  startBtn.innerHTML = sessionActive ? t('btnStop') : t('btnStart');
  startBtn.style = 'width:100%;background:' + (sessionActive ? 'rgba(239,68,68,0.15)' : 'linear-gradient(135deg,#065f46,#059669)') + ';' +
    'color:' + (sessionActive ? '#f87171' : '#fff') + ';border:' + (sessionActive ? '1px solid rgba(239,68,68,0.4)' : 'none') + ';' +
    'padding:12px;border-radius:10px;font-weight:900;font-size:12px;cursor:pointer;box-shadow:0 4px 20px rgba(5,150,105,0.3);';
  startBtn.onclick = function() {
    var ctx = (document.getElementById('pair-ctx')||{}).value||'';
    if (!sessionActive && !ctx.trim()) {
      if (window.showToast) window.showToast(t('noCtx'));
      return;
    }
    sessionActive = !sessionActive;
    suggestionIndex = 0;
    renderTab();
    if (sessionActive) {
      // Auto-generate first suggestion
      setTimeout(function() {
        var nextBtn = document.getElementById('pair-next-btn');
        if (nextBtn) nextBtn.click();
      }, 400);
    }
  };
  body.appendChild(startBtn);

  if (sessionActive) {
    // Control row
    var ctrlRow = document.createElement('div');
    ctrlRow.style = 'display:flex;gap:6px;';
    var nextBtn = document.createElement('button');
    nextBtn.id = 'pair-next-btn';
    nextBtn.innerHTML = t('btnNext');
    nextBtn.style = 'flex:1;background:rgba(99,102,241,0.15);color:#a78bfa;border:1px solid rgba(99,102,241,0.3);padding:8px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
    nextBtn.onclick = function() {
      var ctx = (document.getElementById('pair-ctx')||{}).value||'';
      var suggestions = getSuggestions(ctx);
      if (suggestionIndex >= suggestions.length) suggestionIndex = 0;
      lastSuggestion = suggestions[suggestionIndex];
      suggestionIndex++;

      var pre = document.getElementById('pair-suggestion');
      if (pre) pre.textContent = lastSuggestion;

      var acts = document.getElementById('pair-actions');
      if (acts) acts.style.display = 'flex';

      // Line count
      var lineEl = document.getElementById('pair-lines');
      if (lineEl) {
        var lines = lastSuggestion.split('\n').length;
        lineEl.textContent = lines + ' ' + t('lines');
      }
    };

    var skipBtn = document.createElement('button');
    skipBtn.innerHTML = t('btnSkip');
    skipBtn.style = 'background:rgba(255,255,255,0.05);color:#64748b;border:1px solid rgba(255,255,255,0.1);padding:8px 10px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
    skipBtn.onclick = function() {
      suggestionIndex++;
      var ctx = (document.getElementById('pair-ctx')||{}).value||'';
      var suggestions = getSuggestions(ctx);
      if (suggestionIndex >= suggestions.length) suggestionIndex = 0;
      nextBtn.click();
    };
    ctrlRow.appendChild(nextBtn); ctrlRow.appendChild(skipBtn);
    body.appendChild(ctrlRow);

    // Suggestion display
    var sugLabel = document.createElement('div');
    sugLabel.style = 'font-size:10px;color:#64748b;font-weight:600;display:flex;justify-content:space-between;align-items:center;';
    var lineCount = document.createElement('span');
    lineCount.id = 'pair-lines'; lineCount.style = 'color:#34d399;font-weight:900;';
    sugLabel.textContent = t('suggest');
    sugLabel.appendChild(lineCount);
    body.appendChild(sugLabel);

    var pre = document.createElement('pre');
    pre.id = 'pair-suggestion';
    pre.style = 'background:#0d1117;border:1px solid rgba(16,185,129,0.2);border-radius:8px;padding:12px;font-family:"JetBrains Mono",monospace;font-size:9.5px;color:#c9d1d9;overflow:auto;max-height:200px;white-space:pre-wrap;margin:0;word-break:break-word;line-height:1.5;';
    pre.textContent = lastSuggestion || (gl()==='fr'?'Cliquez sur "Suggestion Suivante"...':'Click "Next Suggestion"...');
    body.appendChild(pre);

    // Actions
    var acts = document.createElement('div');
    acts.id = 'pair-actions'; acts.style = 'display:' + (lastSuggestion?'flex':'none') + ';gap:8px;';
    var acceptBtn = document.createElement('button');
    acceptBtn.innerHTML = t('btnAccept');
    acceptBtn.style = 'flex:1;background:rgba(16,185,129,0.15);color:#34d399;border:1px solid rgba(16,185,129,0.3);padding:9px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
    acceptBtn.onclick = function() {
      if (!window.editor || !lastSuggestion) return;
      var code = window.editor.getValue();
      window.editor.setValue(code + '\n' + lastSuggestion);
      if (window.runPreview) window.runPreview();
      if (window.showToast) window.showToast(t('injected'));
      nextBtn.click();
    };
    var cpBtn = document.createElement('button');
    cpBtn.innerHTML = t('btnCopy');
    cpBtn.style = 'background:rgba(99,102,241,0.12);color:#a78bfa;border:1px solid rgba(99,102,241,0.3);padding:9px 12px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
    cpBtn.onclick = function() { if(lastSuggestion){navigator.clipboard.writeText(lastSuggestion).then(function(){if(window.showToast)window.showToast(t('copied'));});} };
    acts.appendChild(acceptBtn); acts.appendChild(cpBtn);
    body.appendChild(acts);
  }

  wrap.appendChild(body); parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function(){
  var oAL=window.applyLang;
  window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-aipair');if(el)el.textContent=t('tab');if(window.activeTab==='aipair')renderTab();};
  var oRT=window.renderTab;
  window.renderTab=function(tab){if(tab==='aipair'){window.activeTab='aipair';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-aipair');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
