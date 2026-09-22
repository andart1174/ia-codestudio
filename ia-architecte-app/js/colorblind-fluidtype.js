/**
 * Color Blind Simulator + Fluid Typography Calc + DevScore v1.0 — EN/FR
 * Combined module for 3 tools
 */

/* ─── COLOR BLIND SIMULATOR ─── */
(function(){
'use strict';
var TX={
  en:{tab:'ColorBlind',title:'🎭 Color Blind Simulator',sub:'Paste CSS colors → preview in 4 vision types',
      input:'Enter CSS (colors, backgrounds):',btnSim:'👁️ Simulate',type:'Vision type:',
      ph:'background: #3b82f6;\ncolor: #ffffff;\nborder: 2px solid #ef4444;'},
  fr:{tab:'ColorBlind',title:'🎭 Simulateur Daltonisme',sub:'Entrez CSS → aperçu en 4 types de vision',
      input:'Entrez du CSS (couleurs, fonds) :',btnSim:'👁️ Simuler',type:'Type de vision :',
      ph:'background: #3b82f6;\ncolor: #ffffff;\nborder: 2px solid #ef4444;'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

// Color transformation matrices for different vision types
var VISION={
  'Normal':          [[1,0,0],[0,1,0],[0,0,1]],
  'Protanopia (Red-Blind)':    [[0.567,0.433,0],[0.558,0.442,0],[0,0.242,0.758]],
  'Deuteranopia (Green-Blind)':[[0.625,0.375,0],[0.7,0.3,0],[0,0.3,0.7]],
  'Tritanopia (Blue-Blind)':   [[0.95,0.05,0],[0,0.433,0.567],[0,0.475,0.525]],
  'Achromatopsia (B&W)':       [[0.299,0.587,0.114],[0.299,0.587,0.114],[0.299,0.587,0.114]]
};

function hexToRgb(h){h=h.replace('#','');if(h.length===3)h=h.split('').map(function(c){return c+c;}).join('');return[parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)];}
function rgbToHex(r,g,b){return'#'+[r,g,b].map(function(v){return Math.round(Math.min(255,Math.max(0,v))).toString(16).padStart(2,'0');}).join('');}
function applyMatrix(rgb,m){return[m[0][0]*rgb[0]+m[0][1]*rgb[1]+m[0][2]*rgb[2],m[1][0]*rgb[0]+m[1][1]*rgb[1]+m[1][2]*rgb[2],m[2][0]*rgb[0]+m[2][1]*rgb[1]+m[2][2]*rgb[2]];}

function transformCSS(css,matrix){
  return css.replace(/#([0-9a-fA-F]{3,6})\b/g,function(match,hex){
    var rgb=hexToRgb(hex.length===3?hex.split('').map(function(c){return c+c;}).join(''):hex);
    var tr=applyMatrix(rgb,matrix);return rgbToHex(tr[0],tr[1],tr[2]);
  }).replace(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/g,function(m,r,g,b){
    var tr=applyMatrix([+r,+g,+b],matrix);return'rgb('+Math.round(tr[0])+','+Math.round(tr[1])+','+Math.round(tr[2])+')';
  });
}

var lastCSS2='';var lastVision='Normal';
function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(168,85,247,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(168,85,247,0.1),rgba(236,72,153,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#c084fc;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:7px;';

  var lbl=document.createElement('div');lbl.style='font-size:10px;color:#64748b;font-weight:600;';lbl.textContent=t('input');body.appendChild(lbl);
  var ta=document.createElement('textarea');ta.value=lastCSS2;ta.placeholder=t('ph');ta.rows=4;
  ta.style='background:#0d1117;color:#c9d1d9;border:1px solid rgba(168,85,247,0.2);border-radius:8px;padding:9px;font-size:9px;font-family:"JetBrains Mono",monospace;outline:none;resize:vertical;width:100%;box-sizing:border-box;';
  ta.oninput=function(){lastCSS2=this.value;};body.appendChild(ta);

  var vlbl=document.createElement('div');vlbl.style='font-size:10px;color:#64748b;font-weight:600;';vlbl.textContent=t('type');body.appendChild(vlbl);
  var vSel=document.createElement('select');vSel.style='background:#0f172a;color:#e2e8f0;border:1px solid rgba(255,255,255,0.08);padding:6px;border-radius:7px;font-size:9px;outline:none;width:100%;';
  Object.keys(VISION).forEach(function(v){var op=document.createElement('option');op.value=v;op.textContent=v;if(v===lastVision)op.selected=true;vSel.appendChild(op);});
  vSel.onchange=function(){lastVision=this.value;};body.appendChild(vSel);

  var simBtn=document.createElement('button');simBtn.innerHTML=t('btnSim');
  simBtn.style='width:100%;background:linear-gradient(135deg,#5b21b6,#a855f7);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(168,85,247,0.3);';
  body.appendChild(simBtn);

  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);parent.appendChild(wrap);

  simBtn.onclick=function(){
    var css=ta.value.trim();if(!css)return;
    lastCSS2=css;res.innerHTML='';
    var matrix=VISION[lastVision]||VISION['Normal'];
    var transformed=transformCSS(css,matrix);

    // Show comparison
    var grid=document.createElement('div');grid.style='display:grid;grid-template-columns:1fr 1fr;gap:8px;';
    function mkPanel(title,content,color){
      var p=document.createElement('div');p.style='background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:8px;overflow:hidden;';
      var h=document.createElement('div');h.style='font-size:9px;font-weight:700;color:'+color+';padding:6px 8px;border-bottom:1px solid rgba(255,255,255,0.05);';h.textContent=title;
      var pre=document.createElement('pre');pre.style='font-size:8px;color:#94a3b8;padding:8px;margin:0;white-space:pre-wrap;font-family:"JetBrains Mono",monospace;max-height:120px;overflow-y:auto;';pre.textContent=content;
      p.appendChild(h);p.appendChild(pre);return p;
    }
    grid.appendChild(mkPanel('Original',css,'#c084fc'));
    grid.appendChild(mkPanel(lastVision,transformed,'#f472b6'));
    res.appendChild(grid);

    // Color swatches comparison
    var colors=css.match(/#[0-9a-fA-F]{3,6}/g)||[];
    if(colors.length){
      var swatchRow=document.createElement('div');swatchRow.style='display:flex;flex-wrap:wrap;gap:4px;margin-top:6px;';
      colors.slice(0,8).forEach(function(c){
        var origRgb=hexToRgb(c.replace('#','').length===3?c.replace('#','').split('').map(function(x){return x+x;}).join(''):c.replace('#',''));
        var trgb=applyMatrix(origRgb,matrix);var tHex=rgbToHex(trgb[0],trgb[1],trgb[2]);
        var pair=document.createElement('div');pair.style='display:flex;flex-direction:column;align-items:center;gap:2px;';
        var s1=document.createElement('div');s1.style='width:28px;height:18px;background:'+c+';border-radius:3px;border:1px solid rgba(255,255,255,0.1);';
        var s2=document.createElement('div');s2.style='width:28px;height:18px;background:'+tHex+';border-radius:3px;border:1px solid rgba(255,255,255,0.1);';
        var arrow=document.createElement('div');arrow.style='font-size:7px;color:#64748b;';arrow.textContent='↓';
        pair.appendChild(s1);pair.appendChild(arrow);pair.appendChild(s2);swatchRow.appendChild(pair);
      });
      var swatchCard=document.createElement('div');swatchCard.style='background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:8px;padding:8px;';
      var swatchLabel=document.createElement('div');swatchLabel.style='font-size:9px;color:#64748b;margin-bottom:5px;';swatchLabel.textContent='Color comparison (original → '+lastVision+'):';
      swatchCard.appendChild(swatchLabel);swatchCard.appendChild(swatchRow);res.appendChild(swatchCard);
    }

    var cpBtn=document.createElement('button');cpBtn.innerHTML='📋 '+(gl()==='fr'?'Copier CSS simulé':'Copy Simulated CSS');cpBtn.style='width:100%;background:rgba(168,85,247,0.1);color:#c084fc;border:1px solid rgba(168,85,247,0.2);padding:7px;border-radius:7px;font-size:10px;font-weight:700;cursor:pointer;margin-top:4px;';
    cpBtn.onclick=function(){navigator.clipboard.writeText(transformed).then(function(){if(window.showToast)window.showToast('Copied!');});};res.appendChild(cpBtn);
  };
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-colorblind');if(el)el.textContent=t('tab');if(window.activeTab==='colorblind')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='colorblind'){window.activeTab='colorblind';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-colorblind');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();

/* ─── FLUID TYPOGRAPHY CALCULATOR ─── */
(function(){
'use strict';
var TX={
  en:{tab:'FluidType',title:'📐 Fluid Typography Calc',sub:'Generate clamp() for perfect responsive text',
      minFont:'Min font (px):',maxFont:'Max font (px):',minVP:'Min viewport (px):',maxVP:'Max viewport (px):',
      btnGen:'⚡ Generate clamp()',btnCopy:'📋 Copy',copied:'Copied!',preview:'Preview:'},
  fr:{tab:'FluidType',title:'📐 Calculateur Typo Fluide',sub:'Générez des clamp() pour un texte responsive parfait',
      minFont:'Police min (px) :',maxFont:'Police max (px) :',minVP:'Viewport min (px) :',maxVP:'Viewport max (px) :',
      btnGen:'⚡ Générer clamp()',btnCopy:'📋 Copier',copied:'Copié !',preview:'Aperçu :'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

// Common type scales
var PRESETS=[
  {name:'Body text',     minF:14,maxF:18,minV:320,maxV:1280},
  {name:'H3 / Lead',    minF:18,maxF:24,minV:320,maxV:1280},
  {name:'H2',           minF:24,maxF:36,minV:320,maxV:1280},
  {name:'H1',           minF:32,maxF:56,minV:320,maxV:1280},
  {name:'Display / Hero',minF:48,maxF:96,minV:320,maxV:1280},
  {name:'Caption',      minF:10,maxF:13,minV:320,maxV:1280}
];

function calcClamp(minF,maxF,minV,maxV){
  var slope=(maxF-minF)/(maxV-minV);
  var intercept=minF-slope*minV;
  var slopeVW=(slope*100).toFixed(4);
  var intRem=(intercept/16).toFixed(4);
  var minRem=(minF/16).toFixed(4);var maxRem=(maxF/16).toFixed(4);
  return'clamp('+minRem+'rem, '+slopeVW+'vw + '+intRem+'rem, '+maxRem+'rem)';
}

function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(34,197,94,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(34,197,94,0.1),rgba(16,185,129,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#4ade80;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:7px;';

  function mkNum(label,val,cb){var w=document.createElement('div');w.style='display:flex;flex-direction:column;gap:2px;';var l=document.createElement('div');l.style='font-size:9px;color:#64748b;font-weight:600;';l.textContent=label;var i=document.createElement('input');i.type='number';i.value=val;i.style='background:#0f172a;color:#e2e8f0;border:1px solid rgba(255,255,255,0.08);padding:5px 8px;border-radius:6px;font-size:9px;outline:none;';i.oninput=function(){cb(+this.value);};w.appendChild(l);w.appendChild(i);return{wrap:w,inp:i};}

  var minF=16,maxF=32,minV=320,maxV=1280;
  var g=document.createElement('div');g.style='display:grid;grid-template-columns:1fr 1fr;gap:5px;';
  var mf=mkNum(t('minFont'),minF,function(v){minF=v;});var xf=mkNum(t('maxFont'),maxF,function(v){maxF=v;});
  var mv=mkNum(t('minVP'),minV,function(v){minV=v;});var xv=mkNum(t('maxVP'),maxV,function(v){maxV=v;});
  g.appendChild(mf.wrap);g.appendChild(xf.wrap);g.appendChild(mv.wrap);g.appendChild(xv.wrap);body.appendChild(g);

  // Presets
  var presLabel=document.createElement('div');presLabel.style='font-size:9px;color:#64748b;font-weight:600;';presLabel.textContent='Quick presets:';body.appendChild(presLabel);
  var presRow=document.createElement('div');presRow.style='display:flex;flex-wrap:wrap;gap:4px;';
  PRESETS.forEach(function(p){
    var pb=document.createElement('button');pb.textContent=p.name;pb.style='background:#1e293b;border:1px solid #334155;color:#94a3b8;padding:3px 8px;border-radius:12px;font-size:8px;cursor:pointer;';
    pb.onclick=function(){minF=p.minF;maxF=p.maxF;minV=p.minV;maxV=p.maxV;mf.inp.value=minF;xf.inp.value=maxF;mv.inp.value=minV;xv.inp.value=maxV;genBtn.click();};
    presRow.appendChild(pb);
  });
  body.appendChild(presRow);

  var genBtn=document.createElement('button');genBtn.innerHTML=t('btnGen');
  genBtn.style='width:100%;background:linear-gradient(135deg,#064e3b,#10b981);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(16,185,129,0.3);';
  body.appendChild(genBtn);

  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);parent.appendChild(wrap);

  genBtn.onclick=function(){
    res.innerHTML='';var clamp=calcClamp(minF,maxF,minV,maxV);
    var fullCSS='/* Fluid typography */\nfont-size: '+clamp+';\n\n/* All common sizes */\n'+PRESETS.map(function(p){return'/* '+p.name+' */\nfont-size: '+calcClamp(p.minF,p.maxF,p.minV,p.maxV)+';';}).join('\n\n');
    var mainCard=document.createElement('div');mainCard.style='background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.2);border-radius:8px;padding:10px;';
    var mainLabel=document.createElement('div');mainLabel.style='font-size:10px;font-weight:700;color:#4ade80;margin-bottom:6px;';mainLabel.textContent=t('preview');
    var mainPre=document.createElement('pre');mainPre.style='font-size:9px;font-family:"JetBrains Mono",monospace;color:#c9d1d9;margin:0;white-space:pre-wrap;';mainPre.textContent='font-size: '+clamp+';';
    // Live preview
    var pvDiv=document.createElement('div');pvDiv.style='margin-top:8px;padding:8px;background:#0d1117;border-radius:5px;font-size:'+clamp+';color:#e2e8f0;font-family:sans-serif;line-height:1.4;';pvDiv.textContent='The quick brown fox — resize to see fluid scaling';
    mainCard.appendChild(mainLabel);mainCard.appendChild(mainPre);mainCard.appendChild(pvDiv);res.appendChild(mainCard);

    // All sizes table
    var tbl=document.createElement('div');tbl.style='background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:8px;padding:8px;max-height:160px;overflow-y:auto;';
    var tblLabel=document.createElement('div');tblLabel.style='font-size:9px;color:#64748b;font-weight:600;margin-bottom:5px;';tblLabel.textContent='Complete type scale:';tbl.appendChild(tblLabel);
    PRESETS.forEach(function(p){
      var row2=document.createElement('div');row2.style='display:flex;justify-content:space-between;padding:3px 0;border-bottom:1px solid rgba(255,255,255,0.03);';
      var name=document.createElement('span');name.style='font-size:9px;color:#94a3b8;';name.textContent=p.name;
      var val=document.createElement('code');val.style='font-size:7.5px;color:#4ade80;font-family:"JetBrains Mono",monospace;';val.textContent=calcClamp(p.minF,p.maxF,p.minV,p.maxV);
      row2.appendChild(name);row2.appendChild(val);tbl.appendChild(row2);
    });
    res.appendChild(tbl);

    var cpBtn=document.createElement('button');cpBtn.innerHTML=t('btnCopy');cpBtn.style='width:100%;background:rgba(16,185,129,0.1);color:#4ade80;border:1px solid rgba(16,185,129,0.2);padding:8px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
    cpBtn.onclick=function(){navigator.clipboard.writeText(fullCSS).then(function(){if(window.showToast)window.showToast(t('copied'));});};res.appendChild(cpBtn);
  };
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-fluidtype');if(el)el.textContent=t('tab');if(window.activeTab==='fluidtype')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='fluidtype'){window.activeTab='fluidtype';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-fluidtype');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
