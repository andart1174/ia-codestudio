/**
 * 📦 npm Library Explorer & CDN Explorer v1.0
 * IA Architecte — Code Studio Pro | EN/FR Bilingual
 * Fully decoupled script using decorator pattern
 */
(function() {
'use strict';

const TX = {
  en: {
    tab: 'npm Explorer',
    title: '📦 npm Library Explorer',
    sub: 'Live npm registry search & instant CDN injection',
    desc: 'Search the global npm registry in real-time. Inspect bundle sizes, resolve latest stable versions, and inject jsDelivr or unpkg script/link CDN tags directly into Monaco with one click.',
    searchPlaceholder: 'Search npm package (e.g. lodash, sweetalert2, custom-scrollbar)...',
    btnSearch: '🔍 Search',
    btnInjectJsDelivr: '💉 Inject jsDelivr',
    btnInjectUnpkg: '💉 Inject unpkg',
    btnCopy: '📋 Copy CDN Tag',
    injected: 'Package injected!',
    copied: 'CDN tag copied!',
    loading: 'Searching npm registry...',
    noResults: 'No packages found matching that query.',
    lblSize: 'Minified Size',
    lblVersion: 'Latest Version',
    lblDownloads: 'Weekly downloads'
  },
  fr: {
    tab: 'Explo npm',
    title: '📦 Explorateur de Bibliothèques npm',
    sub: 'Recherche npm en direct & injection CDN instantanée',
    desc: 'Recherchez des packages dans le registre npm en temps réel. Visualisez la taille du bundle, résolvez la dernière version stable et injectez le tag CDN jsDelivr ou unpkg directement dans Monaco en un clic.',
    searchPlaceholder: 'Chercher un package npm (ex. lodash, sweetalert2, Chart.js)...',
    btnSearch: '🔍 Rechercher',
    btnInjectJsDelivr: '💉 Injecter jsDelivr',
    btnInjectUnpkg: '💉 Injecter unpkg',
    btnCopy: '📋 Copier Tag CDN',
    injected: 'Package injecté !',
    copied: 'Tag CDN copié !',
    loading: 'Recherche dans le registre npm...',
    noResults: 'Aucun package trouvé.',
    lblSize: 'Taille Minifiée',
    lblVersion: 'Dernière Version',
    lblDownloads: 'Téléchargements/semaine'
  }
};

function gl() { return window.lang || 'en'; }
const t = k => (TX[gl()] || TX.en)[k] || k;

let searchResults = [];
let isSearching = false;
let searchQuery = '';

async function fetchNpmPackages(query) {
  if (!query.trim()) return [];
  isSearching = true;
  renderExplorerTab();

  try {
    const response = await fetch(`https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(query)}&size=10`);
    if (!response.ok) throw new Error('Registry query failed');
    const data = await response.json();
    
    // Process results and fetch bundle sizes in parallel where possible
    const results = await Promise.all((data.objects || []).map(async obj => {
      const pkg = obj.package;
      // Get weekly downloads from npm api
      let downloads = 'N/A';
      try {
        const dlRes = await fetch(`https://api.npmjs.org/downloads/point/last-week/${pkg.name}`);
        if (dlRes.ok) {
          const dlData = await dlRes.json();
          downloads = dlData.downloads ? dlData.downloads.toLocaleString() : 'N/A';
        }
      } catch(e) {}

      // Get size estimation or query bundlephobia
      let sizeStr = 'Estimating...';
      try {
        // We use a timeout to prevent blocking UI
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1800);
        const sizeRes = await fetch(`https://bundlephobia.com/api/size?package=${pkg.name}`, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (sizeRes.ok) {
          const sizeData = await sizeRes.json();
          const kb = (sizeData.size / 1024).toFixed(1);
          sizeStr = `${kb} KB`;
        } else {
          sizeStr = '~' + (obj.score.detail.popularity * 25 + 5).toFixed(0) + ' KB';
        }
      } catch(e) {
        sizeStr = 'N/A';
      }

      return {
        name: pkg.name,
        version: pkg.version,
        description: pkg.description,
        downloads: downloads,
        size: sizeStr,
        homepage: pkg.links.homepage || `https://www.npmjs.com/package/${pkg.name}`
      };
    }));

    searchResults = results;
  } catch (error) {
    console.error('NPM Search Error:', error);
    searchResults = [];
  } finally {
    isSearching = false;
    renderExplorerTab();
  }
}

function injectCdnTag(pkgName, version, provider, isCss = false) {
  const ed = window.editor;
  if (!ed) {
    alert(t('noHTML'));
    return;
  }

  let cdnUrl = '';
  if (provider === 'jsdelivr') {
    cdnUrl = isCss 
      ? `https://cdn.jsdelivr.net/npm/${pkgName}@${version}/dist/${pkgName}.min.css`
      : `https://cdn.jsdelivr.net/npm/${pkgName}@${version}`;
  } else {
    cdnUrl = isCss
      ? `https://unpkg.com/${pkgName}@${version}/dist/${pkgName}.min.css`
      : `https://unpkg.com/${pkgName}@${version}`;
  }

  const tag = isCss 
    ? `<link rel="stylesheet" href="${cdnUrl}">`
    : `<script src="${cdnUrl}"></script>`;

  let html = ed.getValue();
  if (html.includes(cdnUrl)) {
    if (window.showToast) window.showToast('Already injected!');
    return;
  }

  // Inject logic: CSS in head, JS before body closing tag or at the end
  if (isCss) {
    if (html.includes('</head>')) {
      html = html.replace('</head>', `  ${tag}\n</head>`);
    } else {
      html = tag + '\n' + html;
    }
  } else {
    if (html.includes('</body>')) {
      html = html.replace('</body>', `  ${tag}\n</body>`);
    } else {
      html = html + '\n' + tag;
    }
  }

  ed.setValue(html);
  if (window.showToast) window.showToast(`${t('injected')} (${pkgName})`);
  if (window.runPreview) window.runPreview();
}

function renderExplorerTab() {
  const parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';

  const wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0b0a12;color:#e2e8f0;font-family:"Inter",sans-serif;';

  const hdr = document.createElement('div');
  hdr.style = 'padding:14px;border-bottom:1px solid rgba(245,158,11,0.25);flex-shrink:0;background:linear-gradient(135deg,rgba(245,158,11,0.1),rgba(251,191,36,0.05));';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#facc15;">' + t('title') + '</div>' +
                  '<div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  const scrollContainer = document.createElement('div');
  scrollContainer.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:12px;scrollbar-width:thin;';

  const desc = document.createElement('div');
  desc.style = 'font-size:10.5px;color:#94a3b8;line-height:1.5;';
  desc.textContent = t('desc');
  scrollContainer.appendChild(desc);

  // Search Row
  const searchRow = document.createElement('div');
  searchRow.style = 'display:flex;gap:6px;';
  
  const searchInp = document.createElement('input');
  searchInp.type = 'text';
  searchInp.placeholder = t('searchPlaceholder');
  searchInp.value = searchQuery;
  searchInp.style = 'flex:1;background:#131220;border:1px solid rgba(245,158,11,0.2);color:#fff;border-radius:8px;padding:9px;font-size:10px;outline:none;';
  searchInp.oninput = function() { searchQuery = this.value; };
  searchInp.onkeydown = function(e) {
    if (e.key === 'Enter') {
      fetchNpmPackages(searchQuery);
    }
  };

  const searchBtn = document.createElement('button');
  searchBtn.textContent = t('btnSearch');
  searchBtn.style = 'background:rgba(245,158,11,0.15);color:#facc15;border:1px solid rgba(245,158,11,0.3);border-radius:8px;padding:9px 14px;font-weight:800;font-size:10.5px;cursor:pointer;';
  searchBtn.onclick = () => fetchNpmPackages(searchQuery);

  searchRow.appendChild(searchInp);
  searchRow.appendChild(searchBtn);
  scrollContainer.appendChild(searchRow);

  // Results Section
  if (isSearching) {
    const loadingCard = document.createElement('div');
    loadingCard.style = 'display:flex;flex-direction:column;align-items:center;gap:12px;padding:30px;';
    loadingCard.innerHTML = `<div style="width:30px;height:30px;border:3px solid rgba(250,204,21,0.1);border-top:3px solid #facc15;border-radius:50%;animation:spin 1s linear infinite;"></div>` +
                            `<span style="font-size:10.5px;color:#facc15;">${t('loading')}</span>`;
    scrollContainer.appendChild(loadingCard);
  } else if (searchResults.length === 0 && searchQuery) {
    const emptyCard = document.createElement('div');
    emptyCard.style = 'font-size:11px;color:#64748b;text-align:center;padding:20px;font-style:italic;';
    emptyCard.textContent = t('noResults');
    scrollContainer.appendChild(emptyCard);
  } else {
    searchResults.forEach(pkg => {
      const card = document.createElement('div');
      card.style = 'background:#13111c;border:1px solid rgba(250,204,21,0.15);border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:6px;';
      
      const cardHdr = document.createElement('div');
      cardHdr.style = 'display:flex;align-items:center;justify-content:space-between;';
      cardHdr.innerHTML = `<a href="${pkg.homepage}" target="_blank" style="font-size:12px;font-weight:900;color:#facc15;text-decoration:none;">${pkg.name}</a>` +
                          `<span style="font-family:monospace;font-size:9.5px;color:#94a3b8;">v${pkg.version}</span>`;
      card.appendChild(cardHdr);

      const cardDesc = document.createElement('div');
      cardDesc.style = 'font-size:10px;color:#cbd5e1;line-height:1.4;';
      cardDesc.textContent = pkg.description || 'No description provided.';
      card.appendChild(cardDesc);

      const cardStats = document.createElement('div');
      cardStats.style = 'display:flex;justify-content:space-between;font-size:9px;color:#64748b;border-top:1px solid rgba(255,255,255,0.03);padding-top:4px;';
      cardStats.innerHTML = `<span>Downloads: <strong style="color:#a78bfa;">${pkg.downloads}</strong></span>` +
                            `<span>Size: <strong style="color:#60a5fa;">${pkg.size}</strong></span>`;
      card.appendChild(cardStats);

      // Trigger buttons
      const btnGrid = document.createElement('div');
      btnGrid.style = 'display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-top:4px;';

      const jsDelivrBtn = document.createElement('button');
      jsDelivrBtn.textContent = 'jsDelivr';
      jsDelivrBtn.style = 'background:rgba(250,204,21,0.1);color:#facc15;border:1px solid rgba(250,204,21,0.3);border-radius:6px;padding:6px;font-size:9px;font-weight:800;cursor:pointer;';
      jsDelivrBtn.onclick = () => injectCdnTag(pkg.name, pkg.version, 'jsdelivr', pkg.name.endsWith('.css'));
      
      const unpkgBtn = document.createElement('button');
      unpkgBtn.textContent = 'unpkg';
      unpkgBtn.style = 'background:rgba(250,204,21,0.05);color:#cbd5e1;border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:6px;font-size:9px;font-weight:800;cursor:pointer;';
      unpkgBtn.onclick = () => injectCdnTag(pkg.name, pkg.version, 'unpkg', pkg.name.endsWith('.css'));

      btnGrid.appendChild(jsDelivrBtn);
      btnGrid.appendChild(unpkgBtn);
      card.appendChild(btnGrid);

      // Copy CDN Tag Button
      const cpBtn = document.createElement('button');
      cpBtn.textContent = t('btnCopy');
      cpBtn.style = 'background:rgba(255,255,255,0.02);color:#94a3b8;border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:6px;font-size:9px;font-weight:700;cursor:pointer;';
      cpBtn.onclick = function() {
        const cdnUrl = `https://cdn.jsdelivr.net/npm/${pkg.name}@${pkg.version}`;
        const tag = pkg.name.endsWith('.css') 
          ? `<link rel="stylesheet" href="${cdnUrl}/dist/${pkg.name}.min.css">`
          : `<script src="${cdnUrl}"></script>`;
        navigator.clipboard.writeText(tag).then(() => {
          if (window.showToast) window.showToast(t('copied'));
        });
      };
      card.appendChild(cpBtn);

      scrollContainer.appendChild(card);
    });
  }

  wrap.appendChild(scrollContainer);
  parent.appendChild(wrap);
}

// Hook tab triggers
document.addEventListener('DOMContentLoaded', function() {
  const oAL = window.applyLang;
  window.applyLang = function() {
    if (typeof oAL === 'function') oAL();
    const el = document.getElementById('lbl-tab-npmcdnexplorer');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'npmcdnexplorer') renderExplorerTab();
  };

  const oRT = window.renderTab;
  window.renderTab = function(tab) {
    if (tab === 'npmcdnexplorer') {
      window.activeTab = 'npmcdnexplorer';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('tab-npmcdnexplorer');
      if (btn) btn.classList.add('active');
      renderExplorerTab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
