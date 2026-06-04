/**
 * Icon Generator v1.0 — EN/FR
 * Generate favicon + icon set from emoji or text
 */
(function(){
'use strict';
var TX={
  en:{tab:'Icons',title:'🎨 Icon Generator',sub:'Generate favicon + icon set from emoji or text',
      input:'Emoji or Text:',inputPh:'🚀',bgColor:'Background:',textColor:'Text Color:',
      shape:'Shape:',rounded:'Rounded',circle:'Circle',square:'Square',
      btnGen:'⚡ Generate All Sizes',btnDownloadFav:'⬇ Download favicon.ico',
      btnCopyHtml:'📋 Copy HTML tags',btnDownloadAll:'⬇ Download All PNGs',
      sizes:'Generated Sizes:',preview:'Preview:',copied:'📋 Copied!',
      gradient:'Use Gradient',gradColor2:'Gradient 2nd color:',
      style:'Icon Style:',flat:'Flat',glass:'Glassmorphism',shadow:'Shadow'},
  fr:{tab:'Icons',title:'🎨 Générateur d\'Icônes',sub:'Générez favicon + set d\'icônes',
      input:'Emoji ou Texte :',inputPh:'🚀',bgColor:'Fond :',textColor:'Couleur Texte :',
      shape:'Forme :',rounded:'Arrondi',circle:'Cercle',square:'Carré',
      btnGen:'⚡ Générer Toutes Tailles',btnDownloadFav:'⬇ Télécharger favicon.ico',
      btnCopyHtml:'📋 Copier balises HTML',btnDownloadAll:'⬇ Télécharger PNGs',
      sizes:'Tailles Générées :',preview:'Aperçu :',copied:'📋 Copié !',
      gradient:'Utiliser Dégradé',gradColor2:'2ème couleur dégradé :',
      style:'Style :',flat:'Plat',glass:'Glassmorphisme',shadow:'Ombre'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var SIZES=[16,32,48,64,128,180,192,256,512];
var state={input:'🚀',bg:'#6366f1',textColor:'#ffffff',shape:'rounded',useGrad:true,grad2:'#8b5cf6',style:'flat'};
var canvases={};

function drawIcon(size){
  var cv=document.createElement('canvas');cv.width=size;cv.height=size;
  var ctx=cv.getContext('2d');var r=state.shape==='circle'?size/2:state.shape==='rounded'?size*0.22:0;
  // Background
  var grad;
  if(state.useGrad){grad=ctx.createLinearGradient(0,0,size,size);grad.addColorStop(0,state.bg);grad.addColorStop(1,state.grad2);ctx.fillStyle=grad;}
  else{ctx.fillStyle=state.bg;}
  ctx.beginPath();
  if(state.shape==='circle'){ctx.arc(size/2,size/2,size/2,0,Math.PI*2);}
  else if(state.shape==='rounded'){ctx.roundRect(0,0,size,size,[r]);}
  else{ctx.rect(0,0,size,size);}
  ctx.fill();
  // Glassmorphism overlay
  if(state.style==='glass'){var gOverlay=ctx.createLinearGradient(0,0,size,size/2);gOverlay.addColorStop(0,'rgba(255,255,255,0.3)');gOverlay.addColorStop(1,'rgba(255,255,255,0.05)');ctx.fillStyle=gOverlay;ctx.fill();}
  // Shadow inset
  if(state.style==='shadow'){ctx.shadowColor='rgba(0,0,0,0.4)';ctx.shadowBlur=size*0.15;ctx.shadowOffsetY=size*0.08;}
  // Text/Emoji
  var fontSize=size*0.55;
  ctx.font=fontSize+'px "Segoe UI Emoji",Apple Color Emoji,Arial,sans-serif';
  ctx.textAlign='center';ctx.textBaseline='middle';ctx.shadowColor='transparent';ctx.shadowBlur=0;
  // If text (not emoji), use textColor
  if(!/\p{Emoji}/u.test(state.input)){ctx.fillStyle=state.textColor;}
  ctx.fillText(state.input,size/2,size/2+(size*0.04));
  return cv;
}

function generateIcons(){
  SIZES.forEach(function(s){canvases[s]=drawIcon(s);});
  updatePreviews();
}

function updatePreviews(){
  var previewArea=document.getElementById('icon-preview-area');if(!previewArea)return;
  previewArea.innerHTML='';
  var smallSizes=[16,32,64,128,256,512];
  smallSizes.forEach(function(s){
    var wrapper=document.createElement('div');wrapper.style='display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;';
    var cv=canvases[s]||drawIcon(s);
    var display=document.createElement('canvas');display.width=s<=32?32:s<=64?48:s<=128?64:80;display.height=display.width;
    var dctx=display.getContext('2d');dctx.drawImage(cv,0,0,display.width,display.height);
    display.style='border-radius:6px;border:1px solid rgba(255,255,255,0.1);';
    display.title='Click to download '+s+'x'+s;
    display.onclick=(function(size,canvas){return function(){var a=document.createElement('a');a.download='icon-'+size+'x'+size+'.png';a.href=canvas.toDataURL('image/png');a.click();};})(s,canvases[s]||drawIcon(s));
    var label=document.createElement('div');label.style='font-size:8px;color:#64748b;';label.textContent=s+'px';
    wrapper.appendChild(display);wrapper.appendChild(label);previewArea.appendChild(wrapper);
  });
}

function getHtmlTags(){
  var lines=['<!-- Favicon & Icons -->',
    '<link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32.png">',
    '<link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16.png">',
    '<link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-180.png">',
    '<link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192.png">',
    '<link rel="icon" type="image/png" sizes="512x512" href="/icons/icon-512.png">',
    '<meta name="theme-color" content="'+state.bg+'">'];
  return lines.join('\n');
}

function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(245,158,11,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(245,158,11,0.1),rgba(251,191,36,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#fbbf24;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;';

  // Input
  var inputRow=document.createElement('div');inputRow.style='display:flex;gap:8px;align-items:flex-end;';
  var inpDiv=document.createElement('div');inpDiv.style='flex:1;display:flex;flex-direction:column;gap:3px;';
  var inpLabel=document.createElement('div');inpLabel.style='font-size:10px;color:#64748b;font-weight:600;';inpLabel.textContent=t('input');
  var inp=document.createElement('input');inp.type='text';inp.id='icon-input';inp.value=state.input;inp.placeholder=t('inputPh');inp.maxLength=3;
  inp.style='background:#0f172a;color:#fff;border:1px solid rgba(245,158,11,0.3);padding:10px;border-radius:8px;font-size:24px;text-align:center;outline:none;width:100%;box-sizing:border-box;';
  inp.oninput=function(){state.input=this.value||'?';};
  inpDiv.appendChild(inpLabel);inpDiv.appendChild(inp);inputRow.appendChild(inpDiv);
  body.appendChild(inputRow);

  // Color controls
  var colorRow=document.createElement('div');colorRow.style='display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;';
  function mkColor(lk,sid,val,onChange){
    var d=document.createElement('div');d.style='display:flex;flex-direction:column;gap:2px;';
    var l=document.createElement('div');l.style='font-size:9px;color:#64748b;font-weight:600;';l.textContent=t(lk);
    var i=document.createElement('input');i.type='color';i.id=sid;i.value=val;i.style='width:100%;height:32px;border-radius:6px;border:1px solid rgba(255,255,255,0.08);cursor:pointer;background:transparent;padding:2px;';
    i.oninput=function(){onChange(this.value);};d.appendChild(l);d.appendChild(i);return d;
  }
  colorRow.appendChild(mkColor('bgColor','icon-bg',state.bg,function(v){state.bg=v;}));
  colorRow.appendChild(mkColor('gradColor2','icon-grad2',state.grad2,function(v){state.grad2=v;}));
  colorRow.appendChild(mkColor('textColor','icon-textcolor',state.textColor,function(v){state.textColor=v;}));
  body.appendChild(colorRow);

  // Shape + Style
  var optRow=document.createElement('div');optRow.style='display:grid;grid-template-columns:1fr 1fr;gap:6px;';
  function mkGroup(lk,opts,curVal,onChange){
    var d=document.createElement('div');d.style='display:flex;flex-direction:column;gap:3px;';
    var l=document.createElement('div');l.style='font-size:9px;color:#64748b;font-weight:600;';l.textContent=t(lk);
    var r=document.createElement('div');r.style='display:flex;gap:3px;';
    opts.forEach(function(o){
      var b=document.createElement('button');b.textContent=t(o);var isA=curVal===o;
      b.style='flex:1;font-size:8.5px;padding:5px;border-radius:5px;cursor:pointer;border:1px solid '+(isA?'rgba(245,158,11,0.5)':'rgba(255,255,255,0.07)')+';background:'+(isA?'rgba(245,158,11,0.15)':'rgba(255,255,255,0.02)')+';color:'+(isA?'#fbbf24':'#64748b')+';';
      b.onclick=function(){onChange(o);renderTab();};r.appendChild(b);
    });
    d.appendChild(l);d.appendChild(r);return d;
  }
  optRow.appendChild(mkGroup('shape',['rounded','circle','square'],state.shape,function(v){state.shape=v;}));
  optRow.appendChild(mkGroup('style',['flat','glass','shadow'],state.style,function(v){state.style=v;}));
  body.appendChild(optRow);

  // Gradient toggle
  var gradRow=document.createElement('div');gradRow.style='display:flex;align-items:center;gap:8px;';
  var gradCheck=document.createElement('input');gradCheck.type='checkbox';gradCheck.checked=state.useGrad;gradCheck.id='icon-usegrad';gradCheck.style='accent-color:#fbbf24;cursor:pointer;';
  gradCheck.onchange=function(){state.useGrad=this.checked;};
  var gradLabel=document.createElement('label');gradLabel.htmlFor='icon-usegrad';gradLabel.style='font-size:10px;color:#94a3b8;cursor:pointer;';gradLabel.textContent=t('gradient');
  gradRow.appendChild(gradCheck);gradRow.appendChild(gradLabel);body.appendChild(gradRow);

  // Generate button
  var genBtn=document.createElement('button');genBtn.innerHTML=t('btnGen');
  genBtn.style='width:100%;background:linear-gradient(135deg,#92400e,#f59e0b);color:#fff;border:none;padding:11px;border-radius:10px;font-weight:900;font-size:12px;cursor:pointer;box-shadow:0 4px 20px rgba(245,158,11,0.3);';
  genBtn.onclick=function(){
    state.input=document.getElementById('icon-input').value||'?';
    state.bg=document.getElementById('icon-bg').value;
    state.grad2=document.getElementById('icon-grad2').value;
    state.textColor=document.getElementById('icon-textcolor').value;
    state.useGrad=document.getElementById('icon-usegrad').checked;
    generateIcons();
  };
  body.appendChild(genBtn);

  // Preview
  var pvLabel=document.createElement('div');pvLabel.style='font-size:10px;color:#64748b;font-weight:600;';pvLabel.textContent=t('sizes')+(gl()==='fr'?' (cliquez pour télécharger)':' (click to download)');body.appendChild(pvLabel);
  var pvArea=document.createElement('div');pvArea.id='icon-preview-area';
  pvArea.style='display:flex;flex-wrap:wrap;gap:8px;background:rgba(255,255,255,0.01);border:1px solid rgba(255,255,255,0.05);border-radius:10px;padding:10px;justify-content:center;';
  body.appendChild(pvArea);

  // Actions
  var actRow=document.createElement('div');actRow.style='display:flex;gap:6px;';
  var cpHtml=document.createElement('button');cpHtml.innerHTML=t('btnCopyHtml');
  cpHtml.style='flex:1;background:rgba(99,102,241,0.12);color:#818cf8;border:1px solid rgba(99,102,241,0.3);padding:8px;border-radius:8px;font-size:9px;font-weight:700;cursor:pointer;';
  cpHtml.onclick=function(){navigator.clipboard.writeText(getHtmlTags()).then(function(){if(window.showToast)window.showToast(t('copied'));});};
  var dlAll=document.createElement('button');dlAll.innerHTML=t('btnDownloadAll');
  dlAll.style='flex:1;background:rgba(245,158,11,0.12);color:#fbbf24;border:1px solid rgba(245,158,11,0.3);padding:8px;border-radius:8px;font-size:9px;font-weight:700;cursor:pointer;';
  dlAll.onclick=function(){
    SIZES.forEach(function(s){
      var cv=canvases[s]||drawIcon(s);
      setTimeout(function(){var a=document.createElement('a');a.download='icon-'+s+'x'+s+'.png';a.href=cv.toDataURL('image/png');a.click();},s/10);
    });
  };
  actRow.appendChild(cpHtml);actRow.appendChild(dlAll);body.appendChild(actRow);
  wrap.appendChild(body);parent.appendChild(wrap);
  // Auto generate
  generateIcons();
}

document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-icongen');if(el)el.textContent=t('tab');if(window.activeTab==='icongen')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='icongen'){window.activeTab='icongen';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-icongen');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
