/**
 * Domain & Hosting Hub v1.0 — EN/FR — Non-destructive
 * Real Gist API integration, Deployment UI, QR Code Generator
 */
(function() {
'use strict';

var TX = {
  en: {
    tab: 'Hosting', title: '🌐 Domain & Hosting Hub', sub: 'Publish and share your project',
    provider: 'Select Provider',
    gistDesc: 'Share your code instantly as a public GitHub Gist.',
    netDesc: 'Deploy to Netlify via Drop or API.',
    verDesc: 'Deploy to Vercel via CLI or Git.',
    ghToken: 'GitHub Personal Access Token (Requires "gist" scope)',
    createGist: 'Create Public Gist',
    deployNet: 'Simulate Netlify Deploy',
    history: 'Deployment History',
    noHistory: 'No deployments yet.',
    status: 'Status',
    date: 'Date',
    link: 'Link',
    qr: 'QR Code',
    success: '✅ Deployment successful!',
    error: '❌ Error: ',
    deploying: '⏳ Deploying...',
    noCode: '⚠️ No code to deploy.',
    downloadHtml: '📦 Download HTML for Drop',
    openDrop: 'Open Netlify Drop'
  },
  fr: {
    tab: 'Hébergement', title: '🌐 Hub d\'Hébergement', sub: 'Publiez et partagez votre projet',
    provider: 'Fournisseur',
    gistDesc: 'Partagez votre code via un Gist GitHub public.',
    netDesc: 'Déployez sur Netlify via Drop ou API.',
    verDesc: 'Déployez sur Vercel via CLI ou Git.',
    ghToken: 'Token d\'accès GitHub (Nécessite le scope "gist")',
    createGist: 'Créer un Gist Public',
    deployNet: 'Simuler Déploiement Netlify',
    history: 'Historique des Déploiements',
    noHistory: 'Aucun déploiement.',
    status: 'Statut',
    date: 'Date',
    link: 'Lien',
    qr: 'Code QR',
    success: '✅ Déploiement réussi !',
    error: '❌ Erreur : ',
    deploying: '⏳ Déploiement en cours...',
    noCode: '⚠️ Aucun code à déployer.',
    downloadHtml: '📦 Télécharger HTML pour Drop',
    openDrop: 'Ouvrir Netlify Drop'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }
function getCode() { return window.editor ? window.editor.getValue() : ''; }

var state = {
  provider: 'gist', // 'gist', 'netlify', 'vercel'
  ghToken: localStorage.getItem('ia_gh_token') || '',
  history: JSON.parse(localStorage.getItem('ia_deploy_history') || '[]')
};

function saveHistory(item) {
  state.history.unshift(item);
  if (state.history.length > 20) state.history.pop();
  localStorage.setItem('ia_deploy_history', JSON.stringify(state.history));
}

// ── API Interactions ──────────────────────────────────────────────────
function createGist() {
  var code = getCode();
  if (!code) { if (window.showToast) window.showToast(t('noCode')); return; }
  if (!state.ghToken) { alert('GitHub Token required'); return; }
  
  localStorage.setItem('ia_gh_token', state.ghToken);
  
  var btn = document.getElementById('btn-deploy-gist');
  var origText = btn.textContent;
  btn.textContent = t('deploying');
  btn.disabled = true;

  fetch('https://api.github.com/gists', {
    method: 'POST',
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': 'token ' + state.ghToken
    },
    body: JSON.stringify({
      description: 'Created with IA Architecte Studio',
      public: true,
      files: { 'index.html': { content: code } }
    })
  })
  .then(function(res) { return res.json(); })
  .then(function(data) {
    btn.textContent = origText;
    btn.disabled = false;
    if (data.html_url) {
      if (window.showToast) window.showToast(t('success'));
      saveHistory({ type: 'Gist', url: data.html_url, date: new Date().toISOString() });
      renderHostTab();
    } else {
      alert(t('error') + (data.message || 'Unknown error'));
    }
  })
  .catch(function(err) {
    btn.textContent = origText;
    btn.disabled = false;
    alert(t('error') + err.message);
  });
}

function simulateNetlify() {
  var code = getCode();
  if (!code) { if (window.showToast) window.showToast(t('noCode')); return; }
  
  var btn = document.getElementById('btn-deploy-net');
  var origText = btn.textContent;
  btn.textContent = t('deploying');
  btn.disabled = true;

  // Simulate build process
  setTimeout(function() {
    btn.textContent = origText;
    btn.disabled = false;
    var fakeId = Math.random().toString(36).substr(2, 6);
    var fakeUrl = 'https://ia-pro-' + fakeId + '.netlify.app';
    if (window.showToast) window.showToast(t('success'));
    saveHistory({ type: 'Netlify', url: fakeUrl, date: new Date().toISOString() });
    renderHostTab();
  }, 2000);
}

function downloadForDrop() {
  var code = getCode();
  if (!code) return;
  var blob = new Blob([code], { type: 'text/html' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'index.html';
  a.click();
  URL.revokeObjectURL(url);
}

// ── UI Builders ───────────────────────────────────────────────────────
function makeQR(url) {
  var qr = document.createElement('img');
  qr.src = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent(url);
  qr.style = 'width:80px;height:80px;border-radius:8px;border:2px solid #fff;';
  return qr;
}

function renderHostTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';

  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  // Header
  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(249,115,22,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#fb923c;">' + t('title') + '</div><div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:10px 12px;display:flex;flex-direction:column;gap:15px;';

  // Provider Selection
  var provSec = document.createElement('div');
  var pLbl = document.createElement('div');
  pLbl.style = 'font-size:9px;font-weight:900;color:#64748b;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;';
  pLbl.textContent = t('provider');
  provSec.appendChild(pLbl);

  var pGrid = document.createElement('div');
  pGrid.style = 'display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;';
  
  var providers = [
    { id: 'gist', name: 'GitHub Gist', icon: '🐈‍⬛', color: '#6e5494' },
    { id: 'netlify', name: 'Netlify', icon: '💠', color: '#00c7b7' },
    { id: 'vercel', name: 'Vercel', icon: '▲', color: '#fff' }
  ];

  providers.forEach(function(p) {
    var btn = document.createElement('button');
    var isSel = state.provider === p.id;
    btn.style = 'background:' + (isSel ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)') + ';border:1px solid ' + (isSel ? p.color : 'rgba(255,255,255,0.1)') + ';border-radius:8px;padding:10px 5px;cursor:pointer;transition:0.2s;display:flex;flex-direction:column;align-items:center;gap:4px;';
    btn.innerHTML = '<div style="font-size:20px;color:' + p.color + ';">' + p.icon + '</div><div style="font-size:9px;font-weight:700;color:' + (isSel ? '#fff' : '#94a3b8') + ';">' + p.name + '</div>';
    btn.onclick = function() { state.provider = p.id; renderHostTab(); };
    pGrid.appendChild(btn);
  });
  provSec.appendChild(pGrid);
  body.appendChild(provSec);

  // Active Provider Panel
  var actPanel = document.createElement('div');
  actPanel.style = 'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:12px;';

  if (state.provider === 'gist') {
    actPanel.innerHTML = '<div style="font-size:11px;color:#cbd5e1;margin-bottom:12px;line-height:1.5;">' + t('gistDesc') + '</div>';
    var inpH = document.createElement('div');
    inpH.style = 'font-size:9px;color:#94a3b8;margin-bottom:4px;';
    inpH.textContent = t('ghToken');
    var inp = document.createElement('input');
    inp.type = 'password';
    inp.value = state.ghToken;
    inp.placeholder = 'ghp_xxxxxxxxxxxx';
    inp.style = 'width:100%;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:8px;color:#fff;font-size:11px;margin-bottom:12px;box-sizing:border-box;';
    inp.oninput = function() { state.ghToken = inp.value; };
    
    var btn = document.createElement('button');
    btn.id = 'btn-deploy-gist';
    btn.textContent = t('createGist');
    btn.style = 'width:100%;background:#238636;color:#fff;border:none;border-radius:6px;padding:10px;font-weight:700;font-size:11px;cursor:pointer;';
    btn.onclick = createGist;
    
    actPanel.appendChild(inpH);
    actPanel.appendChild(inp);
    actPanel.appendChild(btn);
  } 
  else if (state.provider === 'netlify') {
    actPanel.innerHTML = '<div style="font-size:11px;color:#cbd5e1;margin-bottom:12px;line-height:1.5;">' + t('netDesc') + '</div>';
    
    var btnDL = document.createElement('button');
    btnDL.textContent = t('downloadHtml');
    btnDL.style = 'width:100%;background:rgba(0,199,183,0.15);color:#00c7b7;border:1px solid rgba(0,199,183,0.3);border-radius:6px;padding:10px;font-weight:700;font-size:11px;cursor:pointer;margin-bottom:8px;';
    btnDL.onclick = downloadForDrop;

    var btnDrop = document.createElement('button');
    btnDrop.textContent = t('openDrop');
    btnDrop.style = 'width:100%;background:rgba(255,255,255,0.05);color:#fff;border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:10px;font-weight:700;font-size:11px;cursor:pointer;margin-bottom:12px;';
    btnDrop.onclick = function() { window.open('https://app.netlify.com/drop', '_blank'); };

    var hr = document.createElement('div');
    hr.style = 'height:1px;background:rgba(255,255,255,0.1);margin:10px 0;';

    var btnSim = document.createElement('button');
    btnSim.id = 'btn-deploy-net';
    btnSim.textContent = t('deployNet');
    btnSim.style = 'width:100%;background:#00c7b7;color:#fff;border:none;border-radius:6px;padding:10px;font-weight:700;font-size:11px;cursor:pointer;';
    btnSim.onclick = simulateNetlify;

    actPanel.appendChild(btnDL);
    actPanel.appendChild(btnDrop);
    actPanel.appendChild(hr);
    actPanel.appendChild(btnSim);
  }
  else if (state.provider === 'vercel') {
    actPanel.innerHTML = '<div style="font-size:11px;color:#cbd5e1;margin-bottom:12px;line-height:1.5;">' + t('verDesc') + '</div>';
    var btnV = document.createElement('button');
    btnV.textContent = t('deployVer');
    btnV.style = 'width:100%;background:#fff;color:#000;border:none;border-radius:6px;padding:10px;font-weight:700;font-size:11px;cursor:pointer;';
    btnV.onclick = function() { window.open('https://vercel.com/docs', '_blank'); };
    actPanel.appendChild(btnV);
  }

  body.appendChild(actPanel);

  // History Panel
  var hSec = document.createElement('div');
  var hLbl = document.createElement('div');
  hLbl.style = 'font-size:9px;font-weight:900;color:#64748b;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;';
  hLbl.textContent = t('history');
  hSec.appendChild(hLbl);

  var hList = document.createElement('div');
  hList.style = 'display:flex;flex-direction:column;gap:8px;';

  if (state.history.length === 0) {
    hList.innerHTML = '<div style="font-size:11px;color:#64748b;font-style:italic;text-align:center;padding:10px;">' + t('noHistory') + '</div>';
  } else {
    state.history.forEach(function(item) {
      var d = new Date(item.date);
      var ds = d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      var color = item.type === 'Gist' ? '#6e5494' : item.type === 'Netlify' ? '#00c7b7' : '#fff';

      var c = document.createElement('div');
      c.style = 'background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:10px;padding:10px;display:flex;gap:10px;align-items:center;';
      
      var qrBox = document.createElement('div');
      qrBox.appendChild(makeQR(item.url));
      
      var infoBox = document.createElement('div');
      infoBox.style = 'flex:1;overflow:hidden;';
      infoBox.innerHTML = 
        '<div style="font-size:10px;font-weight:900;color:' + color + ';margin-bottom:2px;">' + item.type + ' Deploy</div>' +
        '<div style="font-size:9px;color:#94a3b8;margin-bottom:6px;">' + ds + '</div>' +
        '<a href="' + item.url + '" target="_blank" style="font-size:10px;color:#60a5fa;text-decoration:none;word-break:break-all;line-height:1.4;">' + item.url + '</a>';

      c.appendChild(infoBox);
      c.appendChild(qrBox);
      hList.appendChild(c);
    });
  }

  hSec.appendChild(hList);
  body.appendChild(hSec);
  wrap.appendChild(body);
  parent.appendChild(wrap);
}

// ── Hook into tab system ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  var origApplyLang = window.applyLang;
  window.applyLang = function() {
    if (typeof origApplyLang === 'function') origApplyLang();
    var el = document.getElementById('lbl-tab-hosting');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'hosting') renderHostTab();
  };

  var origRenderTab = window.renderTab;
  window.renderTab = function(tab) {
    if (tab === 'hosting') {
      window.activeTab = 'hosting';
      document.querySelectorAll('.ltab').forEach(function(b) { b.classList.remove('active'); });
      var btn = document.getElementById('tab-hosting');
      if (btn) btn.classList.add('active');
      renderHostTab();
      return;
    }
    if (typeof origRenderTab === 'function') origRenderTab(tab);
  };
});

})();
