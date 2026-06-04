(function() {
'use strict';
/* ═══════════════════════════════════════════════════
   i18n Translation Studio v1.0
   Detects text → translates → applies to code
   ═══════════════════════════════════════════════════ */
var t_i18n = {
  en: { tab: 'Translate', title: '🌍 i18n Translation Studio', sub: 'Translate your app to any language',
        extract: '🔍 Extract Text from Code', translate: '🌐 Translate All',
        apply: '⬇️ Apply to Code', copy: '📋 Copy', copied: '✅',
        targetLang: 'Translate to:', found: 'text elements found',
        noText: 'No translatable text found in code.',
        noCode: 'Write some HTML in the editor first.',
        done: 'Translations applied to code!',
        langs: { 
                 en:'🇬🇧 English', es:'🇪🇸 Spanish', fr:'🇫🇷 French', de:'🇩🇪 German', it:'🇮🇹 Italian', pt:'🇵🇹 Portuguese',
                 ro:'🇷🇴 Romanian', nl:'🇳🇱 Dutch', pl:'🇵🇱 Polish', ru:'🇷🇺 Russian',
                 ar:'🇸🇦 Arabic', zh:'🇨🇳 Chinese', ja:'🇯🇵 Japanese', ko:'🇰🇷 Korean',
                 hi:'🇮🇳 Hindi', tr:'🇹🇷 Turkish', vi:'🇻🇳 Vietnamese', th:'🇹🇭 Thai',
                 sv:'🇸🇪 Swedish', el:'🇬🇷 Greek', cs:'🇨🇿 Czech', hu:'🇭🇺 Hungarian', uk:'🇺🇦 Ukrainian'
               }
  },
  fr: { tab: 'Traduire', title: '🌍 Studio de Traduction', sub: 'Traduisez automatiquement via API',
        extract: '🔍 Extraire le Texte du Code', translate: '🌐 Traduire Auto',
        apply: '⬇️ Appliquer au Code', copy: '📋 Copier', copied: '✅',
        targetLang: 'Traduire en :', found: 'éléments trouvés',
        noText: 'Aucun texte traduisible dans le code.',
        noCode: 'Écrivez du HTML dans l\'éditeur d\'abord.',
        done: 'Traductions appliquées au code !',
        langs: { 
                 en:'🇬🇧 Anglais', es:'🇪🇸 Espagnol', fr:'🇫🇷 Français', de:'🇩🇪 Allemand', it:'🇮🇹 Italien', pt:'🇵🇹 Portugais',
                 ro:'🇷🇴 Roumain', nl:'🇳🇱 Néerlandais', pl:'🇵🇱 Polonais', ru:'🇷🇺 Russe',
                 ar:'🇸🇦 Arabe', zh:'🇨🇳 Chinois', ja:'🇯🇵 Japonais', ko:'🇰🇷 Coréen',
                 hi:'🇮🇳 Hindi', tr:'🇹🇷 Turc', vi:'🇻🇳 Vietnamien', th:'🇹🇭 Thaï',
                 sv:'🇸🇪 Suédois', el:'🇬🇷 Grec', cs:'🇨🇿 Tchèque', hu:'🇭🇺 Hongrois', uk:'🇺🇦 Ukrainien'
               }
  }
};
function gl() { return window.lang || 'en'; }
function t(k) { return t_i18n[gl()][k] || k; }

var extractedTexts = [];
var translatedTexts = [];
var selectedLang = 'es';

function extractTexts(code) {
  var results = [];
  var patterns = [
    /<(h[1-6]|p|button|a|li|th|td|label|span|div|strong|b|em|i)[^>]*>\s*([^<]{1,800}?)\s*<\/\1>/gi,
    /placeholder="([^"]{1,200})"/gi,
    /title="([^"]{1,200})"/gi
  ];
  var seen = new Set();
  patterns.forEach(function(rx) {
    var m;
    while ((m = rx.exec(code)) !== null) {
      var txt = (m[2] || m[1] || '').trim();
      if (txt && !seen.has(txt) && !/^\s*$/.test(txt) && !/^[<{#\[0-9]/.test(txt)) {
        seen.add(txt);
        results.push(txt);
      }
    }
  });
  return results;
}

async function translateTextAPI(txt, lang) {
  try {
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURIComponent(txt)}`);
    const data = await res.json();
    if(data && data[0] && data[0][0] && data[0][0][0]) {
      return data[0][0][0];
    }
  } catch(e) {
    console.error("Translation API error:", e);
  }
  return txt; // Keep original if fails
}

function renderI18nTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0f172a;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(99,102,241,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#a5b4fc;">' + t('title') + '</div>' +
                  '<div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';

  // Language selector
  var langRow = document.createElement('div');
  langRow.style = 'display:flex;flex-direction:column;gap:6px;';
  var langLabel = document.createElement('div');
  langLabel.style = 'font-size:10px;color:#64748b;';
  langLabel.textContent = t('targetLang');
  var langSel = document.createElement('select');
  langSel.style = 'background:#1e293b;color:#e2e8f0;border:1px solid #334155;padding:8px;border-radius:8px;font-size:11px;';
  var langs = t_i18n[gl()].langs;
  Object.keys(langs).forEach(function(code) {
    var opt = document.createElement('option');
    opt.value = code; opt.textContent = langs[code];
    if (code === selectedLang) opt.selected = true;
    langSel.appendChild(opt);
  });
  langSel.onchange = function() { selectedLang = this.value; };
  langRow.appendChild(langLabel); langRow.appendChild(langSel);
  body.appendChild(langRow);

  // Extract button
  var extractBtn = document.createElement('button');
  extractBtn.innerHTML = t('extract');
  extractBtn.style = 'width:100%;background:#4f46e5;color:#fff;border:none;padding:10px;border-radius:8px;font-weight:bold;font-size:11px;cursor:pointer;';
  extractBtn.onclick = function() {
    if (!window.editor) return;
    var code = window.editor.getValue();
    if (!code.trim()) { if(window.showToast) window.showToast(t('noCode')); return; }
    extractedTexts = extractTexts(code);
    translatedTexts = [];
    if (extractedTexts.length === 0) { if(window.showToast) window.showToast(t('noText')); return; }
    renderI18nTab();
  };
  body.appendChild(extractBtn);

  if (extractedTexts.length > 0) {
    var foundLabel = document.createElement('div');
    foundLabel.style = 'font-size:10px;color:#10b981;font-weight:bold;';
    foundLabel.textContent = '✅ ' + extractedTexts.length + ' ' + t('found');
    body.appendChild(foundLabel);

    // Translation table
    var tbl = document.createElement('div');
    tbl.style = 'display:flex;flex-direction:column;gap:4px;';

    var hRow = document.createElement('div');
    hRow.style = 'display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:9px;font-weight:bold;color:#64748b;padding:0 4px;';
    hRow.innerHTML = '<span>' + (gl()==='fr'?'Original':'Original') + '</span><span>' + (gl()==='fr'?'Traduit':'Translated') + '</span>';
    tbl.appendChild(hRow);

    extractedTexts.slice(0, 100).forEach(function(txt, idx) {
      var tr = translatedTexts[idx] || '';
      var row = document.createElement('div');
      row.style = 'display:grid;grid-template-columns:1fr 1fr;gap:6px;';
      
      var orig = document.createElement('div');
      orig.style = 'background:#1e293b;padding:6px 8px;border-radius:4px;font-size:11px;color:#94a3b8;border:1px solid #334155;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;';
      orig.title = txt; orig.textContent = txt;
      
      var trans = document.createElement('input');
      trans.type = 'text';
      trans.id = 'trans-in-' + idx;
      trans.style = 'background:#0f2535;padding:6px 8px;border-radius:4px;font-size:11px;color:#a5b4fc;border:1px solid #4f46e5;width:100%;box-sizing:border-box;outline:none;';
      trans.value = tr;
      trans.placeholder = gl()==='fr'?'Traduction...':'Translation...';
      trans.oninput = function() { translatedTexts[idx] = this.value; };
      
      row.appendChild(orig); row.appendChild(trans);
      tbl.appendChild(row);
    });
    body.appendChild(tbl);

    // Translate button
    var transBtn = document.createElement('button');
    transBtn.innerHTML = t('translate') + ' (' + (langs[selectedLang]||selectedLang) + ')';
    transBtn.style = 'width:100%;background:linear-gradient(90deg,#6366f1,#4f46e5);color:#fff;border:none;padding:12px;border-radius:8px;font-weight:bold;font-size:12px;cursor:pointer;margin-top:5px;box-shadow:0 4px 15px rgba(99,102,241,0.3);';
    transBtn.onclick = async function() {
      transBtn.innerHTML = '⏳ ' + (gl()==='fr'?'Traduction en cours...':'Translating...');
      transBtn.disabled = true;
      transBtn.style.opacity = '0.7';
      
      // Translate sequentially to avoid rate limiting
      for(let i=0; i<Math.min(extractedTexts.length, 100); i++) {
         let result = await translateTextAPI(extractedTexts[i], selectedLang);
         translatedTexts[i] = result;
         let inputField = document.getElementById('trans-in-' + i);
         if(inputField) inputField.value = result;
      }
      
      transBtn.innerHTML = t('translate') + ' (' + (langs[selectedLang]||selectedLang) + ')';
      transBtn.disabled = false;
      transBtn.style.opacity = '1';
      if(window.showToast) window.showToast(gl()==='fr'?'Traduction API terminée !':'API Translation done!');
    };
    body.appendChild(transBtn);

    var applyBtn = document.createElement('button');
    applyBtn.innerHTML = t('apply');
    applyBtn.style = 'width:100%;background:#10b981;color:#fff;border:none;padding:12px;border-radius:8px;font-weight:bold;font-size:12px;cursor:pointer;box-shadow:0 4px 15px rgba(16,185,129,0.3);';
    applyBtn.onclick = function() {
      if (!window.editor) return;
      var code = window.editor.getValue();
      extractedTexts.slice(0, 100).forEach(function(orig, i) {
        let currentTrans = document.getElementById('trans-in-' + i) ? document.getElementById('trans-in-' + i).value : translatedTexts[i];
        if (currentTrans && currentTrans !== orig) {
          code = code.split(orig).join(currentTrans);
        }
      });
      window.editor.setValue(code);
      if (window.runPreview) window.runPreview();
      if (window.showToast) window.showToast(t('done'));
    };
    body.appendChild(applyBtn);
  }

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() { if(typeof oAL==='function') oAL(); var el=document.getElementById('lbl-tab-i18n'); if(el) el.textContent=t('tab'); if(window.activeTab==='i18n') renderI18nTab(); };
  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='i18n'){window.activeTab='i18n';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var el=document.getElementById('tab-i18n');if(el)el.classList.add('active');renderI18nTab();return;}
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
