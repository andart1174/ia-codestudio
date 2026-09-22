(function() {
'use strict';
/* ══════════════════════════════════════════════
   📐 Layout Ruler & Grid Overlay v1.0
   Toggle visual grid/rulers on the preview panel
   ══════════════════════════════════════════════ */
var GRID_ON = false;
var RULER_ON = false;
var COLS = 12;
var GAP = 16;
var COL_COLOR = 'rgba(59,130,246,0.12)';

var t_gr = {
  en:{ tab:'Grid', title:'📐 Layout Ruler & Grid', sub:'Visual guides for your preview',
       cols:'Columns:', gap:'Gap (px):', color:'Color:', toggleGrid:'🔲 Toggle Grid', toggleRuler:'📏 Toggle Ruler',
       overlay:'Grid Overlay', on:'ON', off:'OFF' },
  fr:{ tab:'Grille', title:'📐 Grille & Règles', sub:'Guides visuels pour votre aperçu',
       cols:'Colonnes :', gap:'Espacement (px) :', color:'Couleur :', toggleGrid:'🔲 Basculer Grille', toggleRuler:'📏 Basculer Règle',
       overlay:'Superposition Grille', on:'ON', off:'OFF' }
};
function gl(){return window.lang||'en';}
function t(k){return t_gr[gl()][k]||k;}

function getPreviewFrame() { return document.getElementById('preview-frame') || document.querySelector('iframe'); }

function injectGrid() {
  var frame = getPreviewFrame(); if(!frame) return;
  try {
    var doc = frame.contentDocument;
    if(!doc) return;
    var old = doc.getElementById('ia-grid-overlay'); if(old) old.remove();
    var oldR = doc.getElementById('ia-ruler-h'); if(oldR) oldR.remove();
    var oldRv = doc.getElementById('ia-ruler-v'); if(oldRv) oldRv.remove();

    if(GRID_ON) {
      var style = doc.createElement('style');
      style.id = 'ia-grid-overlay';
      style.textContent =
        'body::before{content:"";position:fixed;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:99999;background-image:repeating-linear-gradient(90deg,transparent 0,transparent calc((100% - '+((COLS-1)*GAP)+'px)/'+COLS+'),'+COL_COLOR+' calc((100% - '+((COLS-1)*GAP)+'px)/'+COLS+'),'+COL_COLOR+' calc((100% - '+((COLS-1)*GAP)+'px)/'+COLS+' + '+GAP+'px));background-size:100% 100%;}'  +
        'body::after{content:"";position:fixed;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:99998;background-image:linear-gradient(rgba(59,130,246,0.06) 1px,transparent 1px);background-size:100% 8px;}';
      doc.head.appendChild(style);
    }

    if(RULER_ON) {
      // Horizontal ruler
      var rh = doc.createElement('div');
      rh.id = 'ia-ruler-h';
      rh.style = 'position:fixed;top:0;left:0;right:0;height:20px;background:#1e293b;z-index:999999;display:flex;pointer-events:none;overflow:hidden;';
      for(var i=0;i<=2000;i+=10) {
        var tick = doc.createElement('div');
        tick.style = 'position:absolute;left:'+i+'px;width:1px;background:'+(i%100===0?'#60a5fa':'#334155')+';height:'+(i%100===0?'14px':i%50===0?'10px':'6px')+';bottom:0;';
        if(i%100===0) {
          var lbl = doc.createElement('span');
          lbl.style = 'position:absolute;left:'+(i+2)+'px;top:1px;font-size:7px;color:#64748b;font-family:monospace;pointer-events:none;';
          lbl.textContent = i;
          rh.appendChild(lbl);
        }
        rh.appendChild(tick);
      }
      doc.body.appendChild(rh);

      // Vertical ruler
      var rv = doc.createElement('div');
      rv.id = 'ia-ruler-v';
      rv.style = 'position:fixed;top:20px;left:0;width:20px;bottom:0;background:#1e293b;z-index:999999;pointer-events:none;overflow:hidden;';
      for(var j=0;j<=3000;j+=10) {
        var tickv = doc.createElement('div');
        tickv.style = 'position:absolute;top:'+j+'px;height:1px;background:'+(j%100===0?'#60a5fa':'#334155')+';width:'+(j%100===0?'14px':j%50===0?'10px':'6px')+';right:0;';
        if(j%100===0 && j>0) {
          var lblv = doc.createElement('span');
          lblv.style = 'position:absolute;top:'+j+'px;left:1px;font-size:6px;color:#64748b;font-family:monospace;writing-mode:vertical-rl;transform:rotate(180deg);pointer-events:none;';
          lblv.textContent = j;
          rv.appendChild(lblv);
        }
        rv.appendChild(tickv);
      }
      doc.body.appendChild(rv);
    }
  } catch(e){ console.warn('Grid inject error:',e); }
}

function removeGrid() {
  var frame = getPreviewFrame(); if(!frame) return;
  try {
    var doc = frame.contentDocument; if(!doc) return;
    ['ia-grid-overlay','ia-ruler-h','ia-ruler-v'].forEach(function(id){ var el=doc.getElementById(id); if(el)el.remove(); });
  } catch(e){}
}

function renderGridTab() {
  var parent = document.getElementById('left-body'); if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0f172a;';
  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(59,130,246,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#60a5fa;">' + t('title') + '</div><div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:12px;';

  // Grid toggle
  var gridRow = document.createElement('div');
  gridRow.style = 'display:flex;align-items:center;justify-content:space-between;background:#1e293b;padding:12px;border-radius:8px;border:1px solid #334155;';
  gridRow.innerHTML = '<div><div style="font-size:11px;font-weight:bold;color:#e2e8f0;">🔲 ' + t('overlay') + '</div><div style="font-size:9px;color:#64748b;">Column grid on preview</div></div>';
  var gridToggle = document.createElement('button');
  gridToggle.textContent = GRID_ON ? t('on') : t('off');
  gridToggle.style = 'padding:6px 14px;border-radius:6px;border:none;cursor:pointer;font-weight:bold;font-size:11px;background:' + (GRID_ON?'#3b82f6;color:#fff':'#334155;color:#64748b');
  gridToggle.onclick = function() { GRID_ON = !GRID_ON; GRID_ON ? injectGrid() : removeGrid(); renderGridTab(); };
  gridRow.appendChild(gridToggle);
  body.appendChild(gridRow);

  // Ruler toggle
  var rulerRow = document.createElement('div');
  rulerRow.style = 'display:flex;align-items:center;justify-content:space-between;background:#1e293b;padding:12px;border-radius:8px;border:1px solid #334155;';
  rulerRow.innerHTML = '<div><div style="font-size:11px;font-weight:bold;color:#e2e8f0;">📏 Rulers</div><div style="font-size:9px;color:#64748b;">Pixel rulers on edges</div></div>';
  var rulerToggle = document.createElement('button');
  rulerToggle.textContent = RULER_ON ? t('on') : t('off');
  rulerToggle.style = 'padding:6px 14px;border-radius:6px;border:none;cursor:pointer;font-weight:bold;font-size:11px;background:' + (RULER_ON?'#3b82f6;color:#fff':'#334155;color:#64748b');
  rulerToggle.onclick = function() { RULER_ON = !RULER_ON; injectGrid(); renderGridTab(); };
  rulerRow.appendChild(rulerToggle);
  body.appendChild(rulerRow);

  // Config
  var cfgCard = document.createElement('div');
  cfgCard.style = 'background:#1e293b;border-radius:8px;padding:12px;border:1px solid #334155;display:flex;flex-direction:column;gap:10px;';

  function addControl(labelKey, val, onchange, type) {
    var row = document.createElement('div');
    row.style = 'display:flex;justify-content:space-between;align-items:center;';
    var lbl = document.createElement('div');
    lbl.style = 'font-size:10px;color:#94a3b8;';
    lbl.textContent = t(labelKey);
    var inp = document.createElement('input');
    inp.type = type || 'number';
    inp.value = val;
    inp.style = 'background:#0f172a;color:#e2e8f0;border:1px solid #334155;padding:4px 8px;border-radius:4px;font-size:11px;width:70px;';
    inp.onchange = function() { onchange(this.value); if(GRID_ON||RULER_ON) injectGrid(); };
    row.appendChild(lbl); row.appendChild(inp);
    cfgCard.appendChild(row);
  }

  addControl('cols', COLS, function(v){ COLS = parseInt(v)||12; });
  addControl('gap', GAP, function(v){ GAP = parseInt(v)||16; });

  var colorRow = document.createElement('div');
  colorRow.style = 'display:flex;justify-content:space-between;align-items:center;';
  colorRow.innerHTML = '<div style="font-size:10px;color:#94a3b8;">' + t('color') + '</div>';
  var colorInp = document.createElement('input');
  colorInp.type = 'color'; colorInp.value = '#3b82f6';
  colorInp.style = 'border:none;background:none;cursor:pointer;width:36px;height:26px;';
  colorInp.oninput = function() { COL_COLOR = this.value + '20'; if(GRID_ON) injectGrid(); };
  colorRow.appendChild(colorInp); cfgCard.appendChild(colorRow);
  body.appendChild(cfgCard);

  // Re-inject button
  var reinjectBtn = document.createElement('button');
  reinjectBtn.textContent = '↺ Re-apply to Preview';
  reinjectBtn.style = 'width:100%;background:#1e293b;border:1px solid #334155;color:#64748b;padding:8px;border-radius:8px;font-size:10px;cursor:pointer;';
  reinjectBtn.onclick = function() { injectGrid(); if(window.showToast) window.showToast('Grid applied!'); };
  body.appendChild(reinjectBtn);

  wrap.appendChild(body); parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL=window.applyLang;
  window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-grid');if(el)el.textContent=t('tab');if(window.activeTab==='grid')renderGridTab();};
  var oRT=window.renderTab;
  window.renderTab=function(tab){if(tab==='grid'){window.activeTab='grid';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var el=document.getElementById('tab-grid');if(el)el.classList.add('active');renderGridTab();return;}if(typeof oRT==='function')oRT(tab);};
  // Re-inject on preview refresh
  var origRP = window.runPreview;
  window.runPreview = function() { if(typeof origRP==='function') origRP(); setTimeout(function(){ if(GRID_ON||RULER_ON) injectGrid(); }, 500); };
});
})();
