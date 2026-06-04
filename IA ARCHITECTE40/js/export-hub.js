/**
 * One-Click Export Hub v1.0 — EN/FR
 */
(function () {
'use strict';
var TX = {
  en: {
    tab: 'Export Hub', title: '📤 Export Hub', sub: 'Export your code in 5 formats',
    desc: 'Download or copy your code in multiple formats instantly.',
    dlHTML: '⬇️ Download HTML', dlHTMLd: 'Save as index.html file',
    dlZIP: '📦 Download ZIP', dlZIPd: 'index.html + style.css + script.js split',
    copyCP: '🖊 Copy CodePen', copyCPd: 'Ready to paste in CodePen HTML panel',
    openTab: '🔗 Open in New Tab', openTabd: 'Preview your app in a full browser tab',
    copyAll: '📋 Copy Raw HTML', copyAlld: 'Copy entire code to clipboard',
    done: '✅ Done!', copied: '✅ Copied to clipboard!'
  },
  fr: {
    tab: 'Hub d Export', title: '📤 Hub d Export', sub: 'Exportez votre code en 5 formats',
    desc: 'Telechargez ou copiez votre code en plusieurs formats instantanement.',
    dlHTML: '⬇️ Telecharger HTML', dlHTMLd: 'Sauvegarder comme fichier index.html',
    dlZIP: '📦 Telecharger ZIP', dlZIPd: 'index.html + style.css + script.js separes',
    copyCP: '🖊 Copier CodePen', copyCPd: 'Pret a coller dans le panneau HTML de CodePen',
    openTab: '🔗 Ouvrir dans un onglet', openTabd: 'Previsualiser dans un onglet complet',
    copyAll: '📋 Copier le HTML brut', copyAlld: 'Copier tout le code dans le presse-papiers',
    done: '✅ Fait !', copied: '✅ Copie dans le presse-papiers !'
  }
};
function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

function getCode() { return window.editor ? window.editor.getValue() : ''; }

function downloadFile(name, content, mime) {
  var blob = new Blob([content], { type: mime || 'text/html' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  setTimeout(function() { URL.revokeObjectURL(a.href); document.body.removeChild(a); }, 1000);
}

function copyText(text) {
  var ta = document.createElement('textarea');
  ta.value = text; document.body.appendChild(ta); ta.select();
  document.execCommand('copy'); document.body.removeChild(ta);
}

/* Split HTML into HTML/CSS/JS parts */
function splitCode(code) {
  var cssMatch = code.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  var jsMatch  = code.match(/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/i);
  var css = cssMatch ? cssMatch[1].trim() : '';
  var js  = jsMatch  ? jsMatch[1].trim()  : '';
  var html = code
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '<!-- style.css linked here -->\n<link rel="stylesheet" href="style.css">')
    .replace(/<script(?![^>]*src)[^>]*>[\s\S]*?<\/script>/gi, '<script src="script.js"><\/script>');
  return { html: html, css: css, js: js };
}

/* Simple ZIP builder (store-only, no compression) — pure JS */
function buildZIP(files) {
  /* files = [{name, data(Uint8Array)}] */
  function strToBytes(str) {
    var bytes = new Uint8Array(str.length);
    for (var i = 0; i < str.length; i++) bytes[i] = str.charCodeAt(i) & 0xff;
    return bytes;
  }
  function crc32(data) {
    var table = [], c;
    for (var i = 0; i < 256; i++) {
      c = i;
      for (var j = 0; j < 8; j++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      table[i] = c;
    }
    var crc = 0xFFFFFFFF;
    for (var k = 0; k < data.length; k++) crc = table[(crc ^ data[k]) & 0xff] ^ (crc >>> 8);
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }
  function u16(n) { return [n & 0xff, (n >> 8) & 0xff]; }
  function u32(n) { return [n & 0xff, (n >> 8) & 0xff, (n >> 16) & 0xff, (n >> 24) & 0xff]; }

  var localHeaders = [], centralDirs = [], offset = 0;
  var date = [0x21, 0x59]; /* fixed date */
  var time = [0x00, 0x00];

  files.forEach(function(file) {
    var nameBytes = strToBytes(file.name);
    var data = file.data instanceof Uint8Array ? file.data : strToBytes(file.data);
    var crc = crc32(data);
    var size = data.length;

    /* Local file header */
    var lh = [0x50,0x4B,0x03,0x04, 0x14,0x00, 0x00,0x00, 0x00,0x00]
      .concat(time).concat(date)
      .concat(u32(crc)).concat(u32(size)).concat(u32(size))
      .concat(u16(nameBytes.length)).concat([0x00,0x00])
      .concat(Array.from(nameBytes));

    localHeaders.push({ header: lh, data: data, name: nameBytes, crc: crc, size: size, offset: offset });
    offset += lh.length + size;
  });

  localHeaders.forEach(function(f) {
    var cd = [0x50,0x4B,0x01,0x02, 0x14,0x00, 0x14,0x00, 0x00,0x00, 0x00,0x00]
      .concat(time).concat(date)
      .concat(u32(f.crc)).concat(u32(f.size)).concat(u32(f.size))
      .concat(u16(f.name.length)).concat([0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00])
      .concat(u32(f.offset))
      .concat(Array.from(f.name));
    centralDirs.push(cd);
  });

  var cdSize = centralDirs.reduce(function(a, d){ return a + d.length; }, 0);
  var eocd = [0x50,0x4B,0x05,0x06, 0x00,0x00, 0x00,0x00]
    .concat(u16(files.length)).concat(u16(files.length))
    .concat(u32(cdSize)).concat(u32(offset))
    .concat([0x00,0x00]);

  var parts = [];
  localHeaders.forEach(function(f){ parts.push(new Uint8Array(f.header)); parts.push(f.data); });
  centralDirs.forEach(function(cd){ parts.push(new Uint8Array(cd)); });
  parts.push(new Uint8Array(eocd));

  var total = parts.reduce(function(a,p){ return a + p.length; }, 0);
  var out = new Uint8Array(total), pos = 0;
  parts.forEach(function(p){ out.set(p, pos); pos += p.length; });
  return out;
}

function renderExportTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;

  // Verify premium membership
  const isPremium = window.AppAuth && window.AppAuth.currentUser && window.AppAuth.currentUser.membership === 'premium';
  if (!isPremium) {
     parent.innerHTML = '';
     var wrap = document.createElement('div');
     wrap.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;padding:24px;text-align:center;gap:15px;background:rgba(8,12,20,0.5);';
     wrap.innerHTML = `
       <div style="font-size:36px;animation:pulse 2s infinite;filter:drop-shadow(0 0 10px rgba(139,92,246,0.6));">👑</div>
       <h3 style="font-size:13px;color:#fff;font-weight:900;margin:0;">Export Hub Premium</h3>
       <p style="font-size:10px;color:#94a3b8;line-height:1.5;margin:0 0 4px;">
         ${gl() === 'fr' ? 'L\'accès à l\'Export Hub est réservé aux membres Premium. Veuillez passer à la version premium pour exporter votre travail.' : 'Access to the Export Hub is restricted to Premium members. Please upgrade to export your project source code.'}
       </p>
       <button onclick="const pw = document.getElementById('paywall-modal'); if(pw) pw.style.display='flex';" style="background:linear-gradient(135deg,#8b5cf6,#ec4899);color:#fff;border:none;padding:10px 20px;border-radius:20px;font-size:10px;font-weight:bold;cursor:pointer;box-shadow:0 4px 12px rgba(139,92,246,0.3);transition:all 0.2s;">
          Upgrade Now / Devino Premium
       </button>
     `;
     parent.appendChild(wrap);
     return;
  }

  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';
  var hdr = document.createElement('div');
  hdr.style.cssText = 'padding:12px 14px 8px;border-bottom:1px solid rgba(16,185,129,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#34d399;">' + t('title') + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);
  var body = document.createElement('div');
  body.style.cssText = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;';
  var desc = document.createElement('div');
  desc.style.cssText = 'font-size:10px;color:#94a3b8;line-height:1.5;';
  desc.textContent = t('desc');
  body.appendChild(desc);

  var statusEl = document.createElement('div');
  statusEl.style.cssText = 'font-size:11px;color:#4ade80;min-height:14px;text-align:center;';
  body.appendChild(statusEl);

  var EXPORTS = [
    {
      label: t('dlHTML'), desc: t('dlHTMLd'), icon: '⬇️',
      color: '#34d399', bg: 'rgba(16,185,129,0.15)', border: 'rgba(16,185,129,0.4)',
      action: function(){
        downloadFile('index.html', getCode(), 'text/html');
        statusEl.textContent = t('done');
      }
    },
    {
      label: t('dlZIP'), desc: t('dlZIPd'), icon: '📦',
      color: '#fbbf24', bg: 'rgba(251,191,36,0.15)', border: 'rgba(251,191,36,0.4)',
      action: function(){
        var parts = splitCode(getCode());
        var zip = buildZIP([
          { name: 'index.html', data: parts.html },
          { name: 'style.css',  data: parts.css  },
          { name: 'script.js',  data: parts.js   }
        ]);
        downloadFile('my-app.zip', zip, 'application/zip');
        statusEl.textContent = t('done');
      }
    },
    {
      label: t('openTab'), desc: t('openTabd'), icon: '🔗',
      color: '#38bdf8', bg: 'rgba(56,189,248,0.15)', border: 'rgba(56,189,248,0.4)',
      action: function(){
        var blob = new Blob([getCode()], { type: 'text/html' });
        var url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        statusEl.textContent = t('done');
      }
    },
    {
      label: t('copyCP'), desc: t('copyCPd'), icon: '🖊',
      color: '#a78bfa', bg: 'rgba(167,139,250,0.15)', border: 'rgba(167,139,250,0.4)',
      action: function(){
        /* CodePen only needs the body content for HTML panel */
        var code = getCode();
        var bodyMatch = code.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        var body2 = bodyMatch ? bodyMatch[1].trim() : code;
        copyText(body2);
        statusEl.textContent = t('copied');
      }
    },
    {
      label: t('copyAll'), desc: t('copyAlld'), icon: '📋',
      color: '#94a3b8', bg: 'rgba(148,163,184,0.15)', border: 'rgba(148,163,184,0.4)',
      action: function(){
        copyText(getCode());
        statusEl.textContent = t('copied');
      }
    }
  ];

  EXPORTS.forEach(function(ex) {
    var card = document.createElement('div');
    card.style.cssText = 'background:' + ex.bg + ';border:1px solid ' + ex.border + ';border-radius:10px;padding:11px 13px;cursor:pointer;transition:transform .1s;';
    card.onmouseenter = function(){ card.style.transform = 'translateY(-1px)'; };
    card.onmouseleave = function(){ card.style.transform = ''; };
    var top = document.createElement('div');
    top.style.cssText = 'display:flex;align-items:center;gap:8px;margin-bottom:4px;';
    var ico = document.createElement('span');
    ico.style.cssText = 'font-size:16px;';
    ico.textContent = ex.icon;
    var lbl = document.createElement('div');
    lbl.style.cssText = 'font-size:11px;font-weight:800;color:' + ex.color + ';';
    lbl.textContent = ex.label;
    top.appendChild(ico); top.appendChild(lbl);
    var ds = document.createElement('div');
    ds.style.cssText = 'font-size:9px;color:#64748b;margin-left:24px;';
    ds.textContent = ex.desc;
    card.appendChild(top); card.appendChild(ds);
    card.onclick = ex.action;
    body.appendChild(card);
  });

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function () {
  var oAL = window.applyLang;
  window.applyLang = function () {
    if (typeof oAL === 'function') oAL();
    var el = document.getElementById('lbl-tab-exporthub');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'exporthub') renderExportTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'exporthub') {
      window.activeTab = 'exporthub';
      document.querySelectorAll('.ltab').forEach(function (b) { b.classList.remove('active'); });
      var btn = document.getElementById('tab-exporthub');
      if (btn) btn.classList.add('active');
      renderExportTab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
