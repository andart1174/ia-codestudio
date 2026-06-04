/**
 * Live Gradient Studio v1.0 — EN/FR
 */
(function(){
'use strict';
var TX={
  en:{tab:'Gradient',title:'🌈 Live Gradient Studio',sub:'Visual gradient editor with export',
      type:'Type:',angle:'Angle:',addStop:'+ Stop',btnCopy:'📋 Copy CSS',btnInject:'💉 Inject',
      btnSVG:'📄 SVG',presets:'Presets:',stops:'Color Stops:',copied:'📋 Copied!',injected:'✅ Injected!',
      types:{linear:'Linear',radial:'Radial',conic:'Conic',mesh:'Mesh (Aurora)'}},
  fr:{tab:'Gradient',title:'🌈 Studio Dégradé',sub:'Éditeur visuel avec export',
      type:'Type :',angle:'Angle :',addStop:'+ Stop',btnCopy:'📋 Copier CSS',btnInject:'💉 Injecter',
      btnSVG:'📄 SVG',presets:'Présélections :',stops:'Arrêts de couleur :',copied:'📋 Copié !',injected:'✅ Injecté !',
      types:{linear:'Linéaire',radial:'Radial',conic:'Conique',mesh:'Mesh (Aurora)'}}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}
function tt(k){return((TX[gl()]||TX.en).types||TX.en.types)[k]||k;}

var PRESETS={
  'Sunset':     {type:'linear',angle:135,stops:[{c:'#ff6b6b',p:0},{c:'#feca57',p:50},{c:'#ff9ff3',p:100}]},
  'Ocean':      {type:'linear',angle:180,stops:[{c:'#0c0f1a',p:0},{c:'#0ea5e9',p:50},{c:'#06b6d4',p:100}]},
  'Aurora':     {type:'mesh',angle:0,stops:[{c:'#6366f1',p:0},{c:'#8b5cf6',p:33},{c:'#06b6d4',p:66},{c:'#10b981',p:100}]},
  'Fire':       {type:'linear',angle:90,stops:[{c:'#1a0000',p:0},{c:'#dc2626',p:40},{c:'#f59e0b',p:80},{c:'#fef08a',p:100}]},
  'Radial Glow':{type:'radial',angle:0,stops:[{c:'#6366f1',p:0},{c:'#0f172a',p:100}]},
  'Conic Sweep':{type:'conic',angle:0,stops:[{c:'#f472b6',p:0},{c:'#818cf8',p:33},{c:'#34d399',p:66},{c:'#f472b6',p:100}]},
  'Minimal':    {type:'linear',angle:135,stops:[{c:'#0f172a',p:0},{c:'#1e293b',p:100}]},
  'Candy':      {type:'linear',angle:120,stops:[{c:'#f9a8d4',p:0},{c:'#c4b5fd',p:50},{c:'#93c5fd',p:100}]}
};

var state={type:'linear',angle:135,stops:[{c:'#6366f1',p:0},{c:'#8b5cf6',p:50},{c:'#06b6d4',p:100}]};

function buildGradient(){
  var ss=state.stops.slice().sort(function(a,b){return a.p-b.p;});
  var stopsStr=ss.map(function(s){return s.c+' '+s.p+'%';}).join(', ');
  if(state.type==='linear') return'linear-gradient('+state.angle+'deg, '+stopsStr+')';
  if(state.type==='radial') return'radial-gradient(circle at center, '+stopsStr+')';
  if(state.type==='conic') return'conic-gradient(from '+state.angle+'deg, '+stopsStr+')';
  if(state.type==='mesh'){
    // Simulate mesh with multiple radial gradients
    var layers=ss.map(function(s,i){
      var positions=['0% 0%','100% 0%','50% 100%','100% 100%','0% 100%'];
      return'radial-gradient(ellipse at '+positions[i%positions.length]+', '+s.c+'aa 0%, transparent 70%)';
    });
    return layers.join(', ');
  }
  return'linear-gradient('+state.angle+'deg, '+stopsStr+')';
}

function getCSS(){
  var g=buildGradient();
  return'.gradient-bg {\n  background: '+g+';\n  /* Fallback */\n  background-color: '+state.stops[0].c+';\n}';
}

function updatePreview(){
  var pv=document.getElementById('grad-preview');if(!pv)return;
  pv.style.background=buildGradient();
}

function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(99,102,241,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(99,102,241,0.15),rgba(6,182,212,0.08));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;background:linear-gradient(90deg,#818cf8,#34d399);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;';

  // Live preview
  var preview=document.createElement('div');preview.id='grad-preview';
  preview.style='width:100%;height:100px;border-radius:12px;background:'+buildGradient()+';box-shadow:0 8px 32px rgba(0,0,0,0.4);transition:background 0.3s;position:relative;overflow:hidden;';
  // Shimmer overlay
  preview.innerHTML='<div style="position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent);"></div>';
  body.appendChild(preview);

  // Copy of gradient string
  var gradStr=document.createElement('div');
  gradStr.style='font-size:8.5px;color:#64748b;background:#0d1117;border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:6px 8px;font-family:"JetBrains Mono",monospace;word-break:break-all;cursor:pointer;';
  gradStr.textContent=buildGradient();
  gradStr.onclick=function(){navigator.clipboard.writeText(this.textContent).then(function(){if(window.showToast)window.showToast('📋 Copied!');});};
  body.appendChild(gradStr);

  // Presets
  var plabel=document.createElement('div');plabel.style='font-size:10px;color:#64748b;font-weight:600;';plabel.textContent=t('presets');body.appendChild(plabel);
  var prow=document.createElement('div');prow.style='display:flex;flex-wrap:wrap;gap:4px;';
  Object.keys(PRESETS).forEach(function(k){
    var pr=PRESETS[k];
    var g=pr.stops.slice().sort(function(a,b){return a.p-b.p;}).map(function(s){return s.c+' '+s.p+'%';}).join(',');
    var b=document.createElement('button');b.textContent=k;
    b.style='font-size:9px;padding:4px 9px;border-radius:20px;border:none;cursor:pointer;background:linear-gradient(90deg,'+g+');color:#fff;font-weight:700;text-shadow:0 1px 2px rgba(0,0,0,0.5);';
    b.onclick=function(){state=JSON.parse(JSON.stringify(pr));renderTab();};
    prow.appendChild(b);
  });
  body.appendChild(prow);

  // Type + Angle
  var r1=document.createElement('div');r1.style='display:grid;grid-template-columns:1fr 1fr;gap:6px;';
  var typeDiv=document.createElement('div');typeDiv.style='display:flex;flex-direction:column;gap:2px;';
  var typeLabel=document.createElement('div');typeLabel.style='font-size:10px;color:#64748b;font-weight:600;';typeLabel.textContent=t('type');
  var typeSel=document.createElement('select');typeSel.style='background:#0f172a;color:#e2e8f0;border:1px solid rgba(99,102,241,0.25);padding:7px;border-radius:7px;font-size:10px;cursor:pointer;outline:none;';
  ['linear','radial','conic','mesh'].forEach(function(tp){var o=document.createElement('option');o.value=tp;o.textContent=tt(tp);o.selected=state.type===tp;typeSel.appendChild(o);});
  typeSel.onchange=function(){state.type=this.value;renderTab();};
  typeDiv.appendChild(typeLabel);typeDiv.appendChild(typeSel);r1.appendChild(typeDiv);

  var angleDiv=document.createElement('div');angleDiv.style='display:flex;flex-direction:column;gap:2px;';
  var angleLabel=document.createElement('div');angleLabel.style='font-size:10px;color:#64748b;font-weight:600;';angleLabel.textContent=t('angle')+' '+state.angle+'°';
  var angleSlider=document.createElement('input');angleSlider.type='range';angleSlider.min=0;angleSlider.max=360;angleSlider.value=state.angle;
  angleSlider.style='width:100%;accent-color:#6366f1;margin-top:4px;';
  angleSlider.oninput=function(){state.angle=parseInt(this.value);angleLabel.textContent=t('angle')+' '+state.angle+'°';updatePreview();var gs=document.getElementById('grad-str');if(gs)gs.textContent=buildGradient();};
  angleDiv.appendChild(angleLabel);angleDiv.appendChild(angleSlider);r1.appendChild(angleDiv);
  body.appendChild(r1);

  // Color stops
  var slabel=document.createElement('div');slabel.style='font-size:10px;color:#64748b;font-weight:600;';slabel.textContent=t('stops');body.appendChild(slabel);
  var stopsWrap=document.createElement('div');stopsWrap.style='display:flex;flex-direction:column;gap:5px;';
  state.stops.forEach(function(stop,i){
    var sr=document.createElement('div');sr.style='display:flex;align-items:center;gap:8px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:7px 10px;';
    var colorIn=document.createElement('input');colorIn.type='color';colorIn.value=stop.c;
    colorIn.style='width:30px;height:30px;border:none;border-radius:6px;cursor:pointer;background:transparent;padding:2px;';
    colorIn.oninput=(function(idx){return function(){state.stops[idx].c=this.value;updatePreview();var gs=document.getElementById('grad-str');if(gs)gs.textContent=buildGradient();};})(i);
    var posSlider=document.createElement('input');posSlider.type='range';posSlider.min=0;posSlider.max=100;posSlider.value=stop.p;
    posSlider.style='flex:1;accent-color:'+stop.c+';';
    posSlider.oninput=(function(idx){return function(){state.stops[idx].p=parseInt(this.value);posLabel.textContent=this.value+'%';updatePreview();var gs=document.getElementById('grad-str');if(gs)gs.textContent=buildGradient();};})(i);
    var posLabel=document.createElement('span');posLabel.style='font-size:9px;color:#94a3b8;width:28px;text-align:right;';posLabel.textContent=stop.p+'%';
    var delBtn=document.createElement('button');delBtn.textContent='✕';
    delBtn.style='background:transparent;color:#64748b;border:none;cursor:pointer;font-size:11px;padding:0 2px;';
    delBtn.onclick=(function(idx){return function(){if(state.stops.length>2){state.stops.splice(idx,1);renderTab();}};})(i);
    if(state.stops.length<=2)delBtn.style.display='none';
    sr.appendChild(colorIn);sr.appendChild(posSlider);sr.appendChild(posLabel);sr.appendChild(delBtn);
    stopsWrap.appendChild(sr);
  });
  body.appendChild(stopsWrap);

  var addBtn=document.createElement('button');addBtn.textContent=t('addStop');
  addBtn.style='width:100%;background:rgba(255,255,255,0.03);color:#64748b;border:1px dashed rgba(255,255,255,0.1);padding:7px;border-radius:8px;cursor:pointer;font-size:10px;';
  addBtn.onclick=function(){
    var lastP=state.stops.length?state.stops[state.stops.length-1].p:100;
    var newP=Math.min(100,lastP+Math.round((100-lastP)/2));
    state.stops.push({c:'#ffffff',p:newP});renderTab();
  };
  body.appendChild(addBtn);

  // Actions
  var actRow=document.createElement('div');actRow.style='display:flex;gap:6px;';
  var cpBtn=document.createElement('button');cpBtn.innerHTML=t('btnCopy');
  cpBtn.style='flex:1;background:rgba(99,102,241,0.15);color:#818cf8;border:1px solid rgba(99,102,241,0.3);padding:9px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
  cpBtn.onclick=function(){navigator.clipboard.writeText(getCSS()).then(function(){if(window.showToast)window.showToast(t('copied'));});};
  var injBtn=document.createElement('button');injBtn.innerHTML=t('btnInject');
  injBtn.style='flex:1;background:rgba(16,185,129,0.12);color:#34d399;border:1px solid rgba(16,185,129,0.3);padding:9px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
  injBtn.onclick=function(){
    if(!window.editor)return;
    var code=window.editor.getValue();
    var inject='<style>\nbody { background: '+buildGradient()+'; min-height:100vh; }\n</style>';
    if(code.includes('</head>'))code=code.replace('</head>',inject+'\n</head>');else code=inject+'\n'+code;
    window.editor.setValue(code);if(window.runPreview)window.runPreview();
    if(window.showToast)window.showToast(t('injected'));
  };
  var svgBtn=document.createElement('button');svgBtn.innerHTML=t('btnSVG');
  svgBtn.style='background:rgba(245,158,11,0.12);color:#fbbf24;border:1px solid rgba(245,158,11,0.3);padding:9px 10px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
  svgBtn.onclick=function(){
    var ss=state.stops.slice().sort(function(a,b){return a.p-b.p;});
    var svgContent='<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">'+
      ss.map(function(s){return'<stop offset="'+s.p+'%" stop-color="'+s.c+'"/>';}).join('')+
      '</linearGradient></defs><rect width="400" height="200" fill="url(#g)"/></svg>';
    navigator.clipboard.writeText(svgContent).then(function(){if(window.showToast)window.showToast('📄 SVG copied!');});
  };
  actRow.appendChild(cpBtn);actRow.appendChild(injBtn);actRow.appendChild(svgBtn);body.appendChild(actRow);
  wrap.appendChild(body);parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-gradient');if(el)el.textContent=t('tab');if(window.activeTab==='gradient')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='gradient'){window.activeTab='gradient';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-gradient');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
