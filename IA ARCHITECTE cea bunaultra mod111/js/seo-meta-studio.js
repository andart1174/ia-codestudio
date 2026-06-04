/**
 * SEO & Meta Studio v1.0 — EN/FR
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: 'SEO', title: '🔍 SEO & Meta Studio', sub: 'Visual Meta Tags Editor',
    pageTitle: 'Page Title', pageDesc: 'Description', imageUrl: 'Image URL',
    inject: '⚡ Inject Meta Tags', copyRobots: '📋 Copy robots.txt', copySitemap: '📋 Copy sitemap.xml',
    google: 'Google Preview', social: 'Social Preview (Facebook/X)',
    chars: 'chars', optimal: 'Optimal: 50-60', optimalDesc: 'Optimal: 150-160',
    injected: '✅ Meta tags injected!', copied: '✅ Copied to clipboard!'
  },
  fr: {
    tab: 'SEO', title: '🔍 SEO & Meta Studio', sub: 'Éditeur visuel de balises Meta',
    pageTitle: 'Titre de la page', pageDesc: 'Description', imageUrl: 'URL de l\'image',
    inject: '⚡ Injecter Balises Meta', copyRobots: '📋 Copier robots.txt', copySitemap: '📋 Copier sitemap.xml',
    google: 'Aperçu Google', social: 'Aperçu Social (Facebook/X)',
    chars: 'caractères', optimal: 'Optimal : 50-60', optimalDesc: 'Optimal : 150-160',
    injected: '✅ Balises Meta injectées !', copied: '✅ Copié dans le presse-papier !'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var state = {
  title: 'My Awesome Application',
  desc: 'Discover the future of web apps with our professional platform built for scale.',
  img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
  url: 'https://my-app.com'
};

function updatePreviews() {
  var gTitle = document.getElementById('seo-g-title');
  var gDesc = document.getElementById('seo-g-desc');
  var sTitle = document.getElementById('seo-s-title');
  var sDesc = document.getElementById('seo-s-desc');
  var sImg = document.getElementById('seo-s-img');
  var cTitle = document.getElementById('seo-c-title');
  var cDesc = document.getElementById('seo-c-desc');

  if(gTitle) gTitle.textContent = state.title || 'Untitled';
  if(gDesc) gDesc.textContent = state.desc || 'No description provided...';
  if(sTitle) sTitle.textContent = state.title || 'Untitled';
  if(sDesc) sDesc.textContent = state.desc || 'No description provided...';
  if(sImg) sImg.src = state.img || '';

  if(cTitle) {
    var tc = state.title.length;
    cTitle.textContent = tc + ' ' + t('chars');
    cTitle.style.color = (tc >= 50 && tc <= 60) ? '#10b981' : '#f59e0b';
  }
  if(cDesc) {
    var dc = state.desc.length;
    cDesc.textContent = dc + ' ' + t('chars');
    cDesc.style.color = (dc >= 140 && dc <= 160) ? '#10b981' : '#f59e0b';
  }
}

function injectMetaTags() {
  if (!window.editor) return;
  var code = window.editor.getValue();
  var metaBlock = '\n<!-- 🔍 SEO & Meta Studio -->\n<title>' + state.title + '</title>\n<meta name="description" content="' + state.desc + '">\n<meta property="og:title" content="' + state.title + '">\n<meta property="og:description" content="' + state.desc + '">\n<meta property="og:image" content="' + state.img + '">\n<meta property="og:url" content="' + state.url + '">\n<meta name="twitter:card" content="summary_large_image">';
  
  code = code.replace(/<title>[\s\S]*?<\/title>/gi, '');
  code = code.replace(/<meta name="description"[\s\S]*?>/gi, '');
  code = code.replace(/<meta property="og:[\s\S]*?>/gi, '');
  code = code.replace(/<meta name="twitter:[\s\S]*?>/gi, '');
  code = code.replace(/<!-- 🔍 SEO & Meta Studio -->/gi, '');

  if (code.includes('</head>')) {
    code = code.replace('</head>', metaBlock + '\n</head>');
  } else {
    code = metaBlock + '\n' + code;
  }
  window.editor.setValue(code);
  if(window.runPreview) window.runPreview();
  if(window.showToast) window.showToast(t('injected'));
}

function copyText(txt) {
  navigator.clipboard.writeText(txt);
  if(window.showToast) window.showToast(t('copied'));
}

function renderSEOTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  // Header
  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(16,185,129,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#10b981;">' + t('title') + '</div><div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:10px 12px;';

  // Form
  function makeInput(id, label, val, isArea, extra) {
    var d = document.createElement('div'); d.style = 'margin-bottom:10px;';
    d.innerHTML = '<div style="display:flex;justify-content:space-between;"><div style="font-size:10px;color:#64748b;margin-bottom:4px;">' + label + '</div><div style="font-size:9px;color:#94a3b8;" id="'+id+'-cnt"></div></div>';
    var el = document.createElement(isArea ? 'textarea' : 'input');
    el.value = val;
    el.style = 'width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:6px 8px;color:#fff;font-size:11px;outline:none;box-sizing:border-box;' + (isArea ? 'height:50px;resize:none;' : '');
    el.oninput = function() { state[id] = el.value; updatePreviews(); };
    d.appendChild(el);
    if(extra) {
      var ex = document.createElement('div');
      ex.style = 'font-size:9px;color:#64748b;margin-top:2px;';
      ex.textContent = extra;
      d.appendChild(ex);
    }
    return d;
  }

  body.appendChild(makeInput('title', t('pageTitle'), state.title, false, t('optimal')));
  body.appendChild(makeInput('desc', t('pageDesc'), state.desc, true, t('optimalDesc')));
  body.appendChild(makeInput('img', t('imageUrl'), state.img, false));

  // Previews
  var gPrev = document.createElement('div');
  gPrev.style = 'margin-top:15px;';
  gPrev.innerHTML = '<div style="font-size:9px;font-weight:900;color:#64748b;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;">' + t('google') + '</div>' +
    '<div style="background:#fff;border-radius:8px;padding:12px;font-family:arial,sans-serif;">' +
      '<div style="font-size:12px;color:#202124;margin-bottom:2px;display:flex;align-items:center;gap:6px;"><div style="width:16px;height:16px;background:#ddd;border-radius:50%;"></div> my-app.com</div>' +
      '<div id="seo-g-title" style="font-size:16px;color:#1a0dab;margin-bottom:2px;cursor:pointer;"></div>' +
      '<div id="seo-g-desc" style="font-size:12px;color:#4d5156;line-height:1.4;"></div>' +
    '</div>';
  body.appendChild(gPrev);

  var sPrev = document.createElement('div');
  sPrev.style = 'margin-top:15px;';
  sPrev.innerHTML = '<div style="font-size:9px;font-weight:900;color:#64748b;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;">' + t('social') + '</div>' +
    '<div style="background:#fff;border-radius:8px;overflow:hidden;border:1px solid #dadde1;font-family:helvetica,arial,sans-serif;">' +
      '<img id="seo-s-img" style="width:100%;height:140px;object-fit:cover;background:#eee;border-bottom:1px solid #dadde1;display:block;">' +
      '<div style="padding:10px 12px;background:#f2f3f5;">' +
        '<div style="font-size:10px;color:#606770;text-transform:uppercase;">my-app.com</div>' +
        '<div id="seo-s-title" style="font-size:14px;font-weight:700;color:#1d2129;margin:2px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"></div>' +
        '<div id="seo-s-desc" style="font-size:12px;color:#606770;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"></div>' +
      '</div>' +
    '</div>';
  body.appendChild(sPrev);

  // Extras
  var tools = document.createElement('div');
  tools.style = 'margin-top:15px;display:flex;gap:6px;';
  var rb = document.createElement('button'); rb.textContent = t('copyRobots');
  rb.style = 'flex:1;background:rgba(255,255,255,0.05);color:#94a3b8;border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:8px;font-size:9px;cursor:pointer;';
  rb.onclick = function() { copyText('User-agent: *\nAllow: /\nSitemap: https://my-app.com/sitemap.xml'); };
  
  var sm = document.createElement('button'); sm.textContent = t('copySitemap');
  sm.style = 'flex:1;background:rgba(255,255,255,0.05);color:#94a3b8;border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:8px;font-size:9px;cursor:pointer;';
  sm.onclick = function() { copyText('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://my-app.com/</loc><lastmod>'+new Date().toISOString().split('T')[0]+'</lastmod><priority>1.0</priority></url>\n</urlset>'); };
  
  tools.appendChild(rb); tools.appendChild(sm);
  body.appendChild(tools);

  wrap.appendChild(body);

  // Footer Button
  var ftr = document.createElement('div');
  ftr.style = 'padding:10px 12px;border-top:1px solid rgba(255,255,255,0.06);flex-shrink:0;';
  var inj = document.createElement('button');
  inj.textContent = t('inject');
  inj.style = 'width:100%;background:linear-gradient(135deg,#10b981,#059669);border:none;border-radius:8px;padding:10px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;';
  inj.onclick = injectMetaTags;
  ftr.appendChild(inj);
  wrap.appendChild(ftr);

  parent.appendChild(wrap);
  
  // Set IDs for counters to link them up
  document.getElementById('title-cnt').id = 'seo-c-title';
  document.getElementById('desc-cnt').id = 'seo-c-desc';
  
  updatePreviews();
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-seo');
    if(el) el.textContent = t('tab');
    if(window.activeTab==='seo') renderSEOTab();
  };

  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='seo') {
      window.activeTab = 'seo';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn = document.getElementById('tab-seo');
      if(btn) btn.classList.add('active');
      renderSEOTab();
      return;
    }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
