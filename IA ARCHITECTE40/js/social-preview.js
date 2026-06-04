(function() {
'use strict';
var t_soc = {
  en: {
    title: '📱 Live Social Preview', sub: 'See how your app looks on social media',
    extract: '⬇️ Extract from Code', inject: '⬆️ Inject Meta into Code',
    twitter: '𝕏 Twitter / X', fb: '📘 Facebook', linkedin: '🔗 LinkedIn',
    ogImg: 'OG Image URL:', ogTitle: 'Title:', ogDesc: 'Description:',
    no_title: 'No <title> found', no_desc: 'No description found',
    done: 'Meta injected into code!', extracted: 'Meta extracted from code!'
  },
  fr: {
    title: '📱 Aperçu Social Live', sub: 'Voir comment votre app s\'affiche sur les réseaux',
    extract: '⬇️ Extraire du Code', inject: '⬆️ Injecter les Méta dans le Code',
    twitter: '𝕏 Twitter / X', fb: '📘 Facebook', linkedin: '🔗 LinkedIn',
    ogImg: 'URL Image OG :', ogTitle: 'Titre :', ogDesc: 'Description :',
    no_title: 'Aucun <title> trouvé', no_desc: 'Aucune description trouvée',
    done: 'Méta injectées dans le code !', extracted: 'Méta extraites du code !'
  }
};
function gl() { return window.lang || 'en'; }
function t(k) { return t_soc[gl()][k] || k; }

// Persistent state across renders
var meta = {
  title: 'My Awesome App',
  desc: 'Built with IA Architecte Studio. Fast, beautiful, and ready to launch.',
  img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
  url: 'ia-architecte.com'
};

function extractMetaFromCode() {
  if (!window.editor) return;
  var code = window.editor.getValue();
  var titleM = code.match(/<title>(.*?)<\/title>/i);
  var descM = code.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["']/i)
           || code.match(/<meta[^>]*content=["'](.*?)["'][^>]*name=["']description["']/i);
  var imgM  = code.match(/<meta[^>]*property=["']og:image["'][^>]*content=["'](.*?)["']/i)
           || code.match(/<meta[^>]*content=["'](.*?)["'][^>]*property=["']og:image["']/i);
  var urlM  = code.match(/<meta[^>]*property=["']og:url["'][^>]*content=["'](.*?)["']/i);

  if (titleM) meta.title = titleM[1].replace(/<[^>]+>/g,'').trim();
  else meta.title = t('no_title');

  if (descM) meta.desc = descM[1].trim();
  else {
    // Try to extract first <p> text as description fallback
    var pM = code.match(/<p[^>]*>(.*?)<\/p>/i);
    meta.desc = pM ? pM[1].replace(/<[^>]+>/g,'').trim() : t('no_desc');
  }

  if (imgM) meta.img = imgM[1].trim();
  if (urlM) meta.url = urlM[1].trim();

  // Don't toast if auto-extracting
  if (!window._isAutoExtract && window.showToast) window.showToast(t('extracted'));
  if (window.activeTab === 'social') updateCards();
}

function injectMetaToCode() {
  if (!window.editor) return;
  var code = window.editor.getValue();
  var metaBlock = '\n  <title>' + meta.title + '</title>\n' +
    '  <meta name="description" content="' + meta.desc + '">\n' +
    '  <meta property="og:title" content="' + meta.title + '">\n' +
    '  <meta property="og:description" content="' + meta.desc + '">\n' +
    '  <meta property="og:image" content="' + meta.img + '">\n' +
    '  <meta property="og:url" content="' + meta.url + '">\n' +
    '  <meta name="twitter:card" content="summary_large_image">\n' +
    '  <meta name="twitter:title" content="' + meta.title + '">\n' +
    '  <meta name="twitter:description" content="' + meta.desc + '">\n' +
    '  <meta name="twitter:image" content="' + meta.img + '">\n';

  // Remove old meta block if present
  code = code
    .replace(/<title>.*?<\/title>/gi, '')
    .replace(/<meta[^>]*name=["']description["'][^>]*>/gi, '')
    .replace(/<meta[^>]*property=["']og:[^"']*["'][^>]*>/gi, '')
    .replace(/<meta[^>]*name=["']twitter:[^"']*["'][^>]*>/gi, '');

  if (code.includes('</head>')) {
    code = code.replace('</head>', metaBlock + '</head>');
  } else if (code.includes('<head>')) {
    code = code.replace('<head>', '<head>' + metaBlock);
  } else {
    code = '<!DOCTYPE html>\n<html>\n<head>' + metaBlock + '</head>\n<body>\n' + code + '\n</body>\n</html>';
  }

  window.editor.setValue(code);
  if (window.runPreview) window.runPreview();
  if (window.showToast) window.showToast(t('done'));
}

function renderSocialTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0f172a;';

  // Header
  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(56,189,248,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#38bdf8;">' + t('title') + '</div><div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:12px;';

  // Action Buttons Row
  var btnRow = document.createElement('div');
  btnRow.style = 'display:flex;gap:8px;';

  var extractBtn = document.createElement('button');
  extractBtn.innerHTML = t('extract');
  extractBtn.style = 'flex:1;background:#10b981;color:#fff;border:none;padding:8px;border-radius:6px;font-size:10px;font-weight:bold;cursor:pointer;';
  extractBtn.onclick = extractMetaFromCode;

  var injectBtn = document.createElement('button');
  injectBtn.innerHTML = t('inject');
  injectBtn.style = 'flex:1;background:#3b82f6;color:#fff;border:none;padding:8px;border-radius:6px;font-size:10px;font-weight:bold;cursor:pointer;';
  injectBtn.onclick = injectMetaToCode;

  btnRow.appendChild(extractBtn);
  btnRow.appendChild(injectBtn);
  body.appendChild(btnRow);

  // Editable Meta Fields
  var fields = [
    { label: t('ogTitle'), key: 'title', type: 'input',    max: 70 },
    { label: t('ogDesc'),  key: 'desc',  type: 'textarea', max: 200 },
    { label: t('ogImg'),   key: 'img',   type: 'input',    max: null },
    { label: (gl()==='fr'?'URL de la page :':'Page URL:'), key: 'url', type: 'input', max: null }
  ];

  var formWrap = document.createElement('div');
  formWrap.style = 'background:#1e293b;border:1px solid #334155;border-radius:8px;padding:10px;display:flex;flex-direction:column;gap:8px;';

  fields.forEach(function(f) {
    var row = document.createElement('div');
    
    var headerRow = document.createElement('div');
    headerRow.style = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:3px;';
    
    var lbl = document.createElement('div');
    lbl.style = 'font-size:9px;color:#64748b;font-weight:bold;';
    lbl.textContent = f.label;
    
    var counter = document.createElement('div');
    counter.style = 'font-size:8px;color:#64748b;';
    
    headerRow.appendChild(lbl);
    if(f.max) headerRow.appendChild(counter);

    var el;
    if (f.type === 'textarea') {
      el = document.createElement('textarea');
      el.style = 'resize:none;height:45px;';
    } else {
      el = document.createElement('input');
    }
    el.value = meta[f.key];
    el.style += 'width:100%;background:#0f172a;color:#e2e8f0;border:1px solid #334155;padding:6px;border-radius:4px;font-size:10px;box-sizing:border-box;';
    
    var updateCounter = function() {
        if(!f.max) return;
        var len = el.value.length;
        counter.textContent = len + ' / ' + f.max;
        counter.style.color = len > f.max ? '#ef4444' : '#64748b';
        el.style.borderColor = len > f.max ? '#ef4444' : '#334155';
    };
    
    el.oninput = function() { meta[f.key] = this.value; updateCounter(); updateCards(); };
    updateCounter();

    row.appendChild(headerRow); row.appendChild(el);
    formWrap.appendChild(row);
  });
  body.appendChild(formWrap);

  // Preview Cards
  var cardsDiv = document.createElement('div');
  cardsDiv.id = 'soc-cards';
  cardsDiv.style = 'display:flex;flex-direction:column;gap:12px;';
  body.appendChild(cardsDiv);

  wrap.appendChild(body);
  parent.appendChild(wrap);
  renderCards();
}

function renderCards() {
  var cardsDiv = document.getElementById('soc-cards');
  if (!cardsDiv) return;
  cardsDiv.innerHTML = '';

  var imgFallback = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWUyOTNiIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSIjMzhiZGY4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';

  // Twitter / X Card
  var tw = document.createElement('div');
  tw.style = 'border:1px solid #2f3336;border-radius:12px;overflow:hidden;background:#15202b;font-family:-apple-system,sans-serif;';
  tw.innerHTML =
    '<div style="padding:8px 12px 6px;font-size:10px;color:#8899a6;display:flex;align-items:center;gap:5px;border-bottom:1px solid #1e2d3d;">' +
      '<span style="font-size:14px;font-weight:900;color:#e7e9ea;">𝕏</span>' +
      '<span>' + (gl()==='fr'?'Twitter / X — Carte de Lien':'Twitter / X — Link Card') + '</span>' +
    '</div>' +
    '<img src="' + (meta.img||imgFallback) + '" style="width:100%;height:130px;object-fit:cover;display:block;" onerror="this.src=\'' + imgFallback + '\'">' +
    '<div style="padding:10px 12px;">' +
      '<div style="font-size:9px;color:#8899a6;margin-bottom:3px;">' + meta.url + '</div>' +
      '<div style="font-size:13px;color:#e7e9ea;font-weight:700;margin-bottom:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + (meta.title||'No title') + '</div>' +
      '<div style="font-size:10px;color:#8899a6;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">' + (meta.desc||'') + '</div>' +
    '</div>';
  cardsDiv.appendChild(tw);

  // Facebook Card
  var fb = document.createElement('div');
  fb.style = 'border:1px solid #3a3b3c;border-radius:4px;overflow:hidden;font-family:Helvetica,sans-serif;background:#242526;';
  fb.innerHTML =
    '<div style="padding:7px 12px 5px;background:#3a3b3c;font-size:10px;color:#b0b3b8;border-bottom:1px solid #3a3b3c;display:flex;gap:5px;align-items:center;">' +
      '<span style="font-size:14px;">📘</span><span>Facebook — ' + (gl()==='fr'?'Aperçu de Lien':'Link Preview') + '</span>' +
    '</div>' +
    '<img src="' + (meta.img||imgFallback) + '" style="width:100%;height:130px;object-fit:cover;display:block;" onerror="this.src=\'' + imgFallback + '\'">' +
    '<div style="padding:10px 12px;background:#242526;">' +
      '<div style="font-size:9px;color:#b0b3b8;text-transform:uppercase;letter-spacing:0.5px;">' + meta.url + '</div>' +
      '<div style="font-size:13px;color:#e4e6eb;font-weight:700;margin:3px 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + (meta.title||'No title') + '</div>' +
      '<div style="font-size:11px;color:#b0b3b8;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + (meta.desc||'') + '</div>' +
    '</div>';
  cardsDiv.appendChild(fb);

  // LinkedIn Card
  var li = document.createElement('div');
  li.style = 'border:1px solid #434649;border-radius:2px;overflow:hidden;font-family:-apple-system,sans-serif;background:#1b1f23;';
  li.innerHTML =
    '<div style="padding:7px 12px 5px;background:#2d3237;font-size:10px;color:#a8a8a8;border-bottom:1px solid #434649;display:flex;gap:5px;align-items:center;">' +
      '<span style="font-size:14px;">🔗</span><span>LinkedIn — ' + (gl()==='fr'?'Aperçu Article':'Article Preview') + '</span>' +
    '</div>' +
    '<img src="' + (meta.img||imgFallback) + '" style="width:100%;height:130px;object-fit:cover;display:block;" onerror="this.src=\'' + imgFallback + '\'">' +
    '<div style="padding:10px 12px;">' +
      '<div style="font-size:13px;color:#e1e1e1;font-weight:600;margin-bottom:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + (meta.title||'No title') + '</div>' +
      '<div style="font-size:11px;color:#a8a8a8;margin-bottom:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + (meta.desc||'') + '</div>' +
      '<div style="font-size:9px;color:#0a66c2;font-weight:600;">' + meta.url + '</div>' +
    '</div>';
  cardsDiv.appendChild(li);

  // WhatsApp Card
  var wa = document.createElement('div');
  wa.style = 'border:1px solid #25d36633;border-radius:8px;overflow:hidden;font-family:-apple-system,sans-serif;background:#0d1f0d;';
  wa.innerHTML =
    '<div style="padding:7px 12px 5px;font-size:10px;color:#25d366;border-bottom:1px solid #25d36622;display:flex;gap:5px;align-items:center;">' +
      '<span style="font-size:14px;">💬</span><span>WhatsApp — ' + (gl()==='fr'?'Aperçu Lien':'Link Preview') + '</span>' +
    '</div>' +
    '<div style="display:flex;gap:8px;padding:10px;">' +
      '<img src="' + (meta.img||imgFallback) + '" style="width:60px;height:60px;object-fit:cover;border-radius:4px;flex-shrink:0;" onerror="this.src=\'' + imgFallback + '\'">' +
      '<div>' +
        '<div style="font-size:11px;color:#25d366;font-weight:700;">' + meta.url + '</div>' +
        '<div style="font-size:12px;color:#e2e8f0;font-weight:600;margin:2px 0;">' + (meta.title||'No title') + '</div>' +
        '<div style="font-size:10px;color:#94a3b8;">' + (meta.desc||'').substring(0,80) + '...</div>' +
      '</div>' +
    '</div>';
  cardsDiv.appendChild(wa);
}

function updateCards() {
  renderCards();
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-social');
    if(el) el.textContent = t('title').replace('📱 ','');
    if(window.activeTab==='social') renderSocialTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='social') {
      window.activeTab='social';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn=document.getElementById('tab-social'); if(btn) btn.classList.add('active');
      renderSocialTab(); return;
    }
    if(typeof oRT==='function') oRT(tab);
  };
  
  // Auto-sync when editor changes
  function hookSocialSync() {
      if(!window.editor || !window.editor.onDidChangeModelContent) { setTimeout(hookSocialSync, 2000); return; }
      window.editor.onDidChangeModelContent(function() {
          window._isAutoExtract = true;
          extractMetaFromCode();
          window._isAutoExtract = false;
      });
  }
  setTimeout(hookSocialSync, 3000);
});
})();
