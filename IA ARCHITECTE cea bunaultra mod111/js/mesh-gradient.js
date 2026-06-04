/**
 * 🌈 Gradient Mesh Generator — EN/FR
 */
(function(){
'use strict';
var TX={
  en:{tab:'Mesh Gradient',title:'🌈 Gradient Mesh Generator',sub:'Apple-style mesh gradients — CSS + SVG export',
      cols:'Colors',points:'Mesh Points',noise:'Noise',blur:'Blur',btn:'🎲 Randomize',
      inject:'💉 Inject CSS',copy:'📋 Copy CSS',exportSVG:'📥 Copy SVG',animate:'Animate'},
  fr:{tab:'Dégradé Mesh',title:'🌈 Générateur Dégradé Mesh',sub:'Dégradés mesh style Apple — export CSS + SVG',
      cols:'Couleurs',points:'Points Mesh',noise:'Bruit',blur:'Flou',btn:'🎲 Aléatoire',
      inject:'💉 Injecter CSS',copy:'📋 Copier CSS',exportSVG:'📥 Copier SVG',animate:'Animé'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var PALETTES=[
  ['#ff6b6b','#feca57','#48dbfb','#ff9ff3'],
  ['#6c5ce7','#a29bfe','#fd79a8','#fdcb6e'],
  ['#00b894','#00cec9','#0984e3','#6c5ce7'],
  ['#e17055','#d63031','#e84393','#a29bfe'],
  ['#1e3c72','#2a5298','#36d1dc','#5b86e5'],
  ['#f7971e','#ffd200','#21d4fd','#b721ff'],
  ['#12c2e9','#f64f59','#c471ed','#12c2e9'],
  ['#43e97b','#38f9d7','#fa709a','#fee140']
];

var st={colors:['#6c5ce7','#a29bfe','#fd79a8','#fdcb6e'],points:6,blur:80,noise:20,animate:false};

function rndColor(){return'#'+Math.floor(Math.random()*0xffffff).toString(16).padStart(6,'0');}

function buildMeshCSS(d){
  var stops=d.colors.map(function(c,i){var x=Math.random()*100;var y=Math.random()*100;return'radial-gradient(ellipse at '+x.toFixed(0)+'% '+y.toFixed(0)+'%, '+c+'cc '+Math.floor(20+Math.random()*30)+'%, transparent 70%)';});
  var bg=stops.join(', ');
  var anim=d.animate?'@keyframes meshShift{0%,100%{background-position:0% 0%}25%{background-position:100% 0%}50%{background-position:100% 100%}75%{background-position:0% 100%}}\n.mesh-bg{animation:meshShift 8s ease infinite;background-size:400% 400%;}':'';
  return':root{\n  --mesh-bg: '+bg+';\n  --mesh-blur: '+d.blur+'px;\n}\n.mesh-bg{\n  background: '+bg+';\n  filter: blur(0);\n}\n.mesh-bg::before{\n  content:"";\n  position:absolute;\n  inset:-'+d.blur+'px;\n  background:inherit;\n  filter:blur('+d.blur+'px);\n  z-index:-1;\n}\n'+anim;
}

function buildSVG(d){
  var w=800,h=600;
  var stops=d.colors.map(function(c,i){
    var x=Math.floor(Math.random()*w);var y=Math.floor(Math.random()*h);var r=200+Math.floor(Math.random()*200);
    return'<radialGradient id="g'+i+'" cx="'+x+'" cy="'+y+'" r="'+r+'" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="'+c+'" stop-opacity="0.8"/><stop offset="100%" stop-color="'+c+'" stop-opacity="0"/></radialGradient>';
  }).join('');
  var rects=d.colors.map(function(_,i){return'<rect width="'+w+'" height="'+h+'" fill="url(#g'+i+')" />';}).join('');
  return'<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'"><defs>'+stops+'</defs><rect width="'+w+'" height="'+h+'" fill="'+d.colors[0]+'22"/><filter id="blur"><feGaussianBlur stdDeviation="'+Math.floor(d.blur/10)+'"/></filter><g filter="url(#blur)">'+rects+'</g></svg>';
}

function buildPreviewStyle(d){
  var stops=d.colors.map(function(c){var x=Math.random()*100;var y=Math.random()*100;return'radial-gradient(ellipse at '+x.toFixed(0)+'% '+y.toFixed(0)+'%, '+c+'bb '+(20+Math.floor(Math.random()*20))+'%, transparent 65%)';});
  return stops.join(', ');
}

function render(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(168,85,247,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(168,85,247,0.12),rgba(236,72,153,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#c084fc;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;';

  // Live preview canvas
  var pv=document.createElement('div');pv.id='mesh-pv';pv.style='width:100%;height:120px;border-radius:12px;transition:background .5s;border:1px solid rgba(255,255,255,0.06);';body.appendChild(pv);

  // Color pickers row
  var clbl=document.createElement('div');clbl.style='font-size:9px;color:#94a3b8;font-weight:700;';clbl.textContent=t('cols');body.appendChild(clbl);
  var cRow=document.createElement('div');cRow.style='display:flex;gap:6px;align-items:center;';
  var pickers=[];
  st.colors.forEach(function(c,i){
    var ci=document.createElement('input');ci.type='color';ci.value=c;ci.style='width:40px;height:36px;border:2px solid rgba(255,255,255,0.1);border-radius:8px;cursor:pointer;padding:1px;background:none;';
    ci.oninput=function(){st.colors[i]=this.value;updatePreview();};pickers.push(ci);cRow.appendChild(ci);
  });
  // Add randomize colors btn
  var addBtn=document.createElement('button');addBtn.textContent='🎲';addBtn.title='Random palette';
  addBtn.style='background:rgba(168,85,247,0.2);border:1px solid rgba(168,85,247,0.4);color:#c084fc;border-radius:8px;padding:6px 10px;font-size:14px;cursor:pointer;';
  addBtn.onclick=function(){var pal=PALETTES[Math.floor(Math.random()*PALETTES.length)];pal.forEach(function(c,i){st.colors[i]=c;pickers[i].value=c;});updatePreview();};
  cRow.appendChild(addBtn);body.appendChild(cRow);

  function sliderRow(key,lbl,min,max,unit){
    var d=document.createElement('div');
    var row=document.createElement('div');row.style='display:flex;justify-content:space-between;';
    var l=document.createElement('span');l.style='font-size:9px;color:#94a3b8;font-weight:700;';l.textContent=lbl;
    var v=document.createElement('span');v.id='mv-'+key;v.style='font-size:9px;color:#c084fc;font-weight:700;';v.textContent=st[key]+(unit||'');
    row.appendChild(l);row.appendChild(v);d.appendChild(row);
    var s=document.createElement('input');s.type='range';s.min=min;s.max=max;s.value=st[key];s.style='width:100%;accent-color:#a855f7;margin-top:3px;';
    s.oninput=function(){st[key]=parseInt(this.value);document.getElementById('mv-'+key).textContent=st[key]+(unit||'');updatePreview();};
    d.appendChild(s);return d;
  }
  body.appendChild(sliderRow('blur',t('blur'),0,120,'px'));
  body.appendChild(sliderRow('noise',t('noise'),0,50,''));

  // Animate toggle
  var animRow=document.createElement('div');animRow.style='display:flex;align-items:center;justify-content:space-between;';
  var al=document.createElement('div');al.style='font-size:9px;color:#94a3b8;font-weight:700;';al.textContent=t('animate');
  var ac=document.createElement('input');ac.type='checkbox';ac.checked=st.animate;ac.style='width:16px;height:16px;accent-color:#a855f7;cursor:pointer;';
  ac.onchange=function(){st.animate=this.checked;};
  animRow.appendChild(al);animRow.appendChild(ac);body.appendChild(animRow);

  // Palette presets
  var plbl=document.createElement('div');plbl.style='font-size:9px;color:#94a3b8;font-weight:700;';plbl.textContent='Presets';body.appendChild(plbl);
  var prow=document.createElement('div');prow.style='display:flex;gap:5px;flex-wrap:wrap;';
  PALETTES.forEach(function(pal){
    var pb=document.createElement('div');pb.style='width:32px;height:32px;border-radius:8px;cursor:pointer;border:2px solid rgba(255,255,255,0.08);overflow:hidden;';
    var stops=pal.map(function(c,i){return'radial-gradient(ellipse at '+(i%2===0?'30%':'70%')+' '+(i<2?'30%':'70%')+', '+c+'cc 20%, transparent 70%)';}).join(',');
    pb.style.background=stops;pb.title='Apply palette';
    pb.onclick=function(){pal.forEach(function(c,i){st.colors[i]=c;pickers[i].value=c;});updatePreview();};
    prow.appendChild(pb);
  });
  body.appendChild(prow);

  var genBtn=document.createElement('button');genBtn.innerHTML='🌈 Generate New Mesh';
  genBtn.style='width:100%;background:linear-gradient(135deg,#581c87,#a855f7);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(168,85,247,0.4);';
  body.appendChild(genBtn);

  var actRow=document.createElement('div');actRow.style='display:flex;gap:5px;';
  var ib=document.createElement('button');ib.innerHTML=t('inject');ib.style='flex:1;background:linear-gradient(135deg,#064e3b,#10b981);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=t('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var sv=document.createElement('button');sv.innerHTML=t('exportSVG');sv.style='flex:1;background:rgba(168,85,247,0.1);color:#c084fc;border:1px solid rgba(168,85,247,0.25);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  actRow.appendChild(ib);actRow.appendChild(cb);actRow.appendChild(sv);body.appendChild(actRow);
  wrap.appendChild(body);p.appendChild(wrap);

  function updatePreview(){
    var bg=buildPreviewStyle(st);
    var pvEl=document.getElementById('mesh-pv');if(pvEl)pvEl.style.background=bg;
  }
  updatePreview();

  genBtn.onclick=function(){st.colors.forEach(function(c,i){var nc=rndColor();st.colors[i]=nc;pickers[i].value=nc;});updatePreview();if(window.showToast)window.showToast('🌈 New mesh generated!');};
  ib.onclick=function(){
    var css=buildMeshCSS(st);
    var inj=window.injectCode||(window.parent&&window.parent.injectCode);
    if(typeof inj==='function'){var html='<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Mesh Gradient</title><style>*{margin:0;padding:0}body,html{height:100%;overflow:hidden}'+css+'.mesh-bg{position:fixed;inset:0;z-index:-1;}</style></head><body><div class="mesh-bg"></div></body></html>';inj(html);if(window.showToast)window.showToast('✅ Mesh injected!');}
  };
  cb.onclick=function(){var css=buildMeshCSS(st);if(navigator.clipboard)navigator.clipboard.writeText(css).then(function(){if(window.showToast)window.showToast('📋 CSS copied!');});};
  sv.onclick=function(){var svg=buildSVG(st);if(navigator.clipboard)navigator.clipboard.writeText(svg).then(function(){if(window.showToast)window.showToast('📥 SVG copied!');});};
}

document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='meshgrad'){window.activeTab='meshgrad';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b=document.getElementById('tab-meshgrad');if(b)b.classList.add('active');render();return;}if(typeof oRT==='function')oRT(tab);};
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-meshgrad');if(el)el.textContent=t('tab');if(window.activeTab==='meshgrad')render();};
});
})();
