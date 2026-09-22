/**
 * 🎨 Brand Kit Generator v1.0 — EN/FR
 */
(function(){
'use strict';
var TX={
  en:{tab:'Brand Kit',title:'🎨 Brand Kit Generator',sub:'Complete brand identity in 30 seconds',
      name:'Brand Name',nameP:'e.g. UltraFlow',industry:'Industry',industryP:'e.g. Tech / Finance / Health',
      primary:'Primary Color',secondary:'Accent Color',style:'Brand Style',
      btn:'🎨 Generate Brand Kit',inject:'💉 Inject CSS Variables',copy:'📋 Copy Kit HTML',
      preview:'Preview',typography:'Typography',colors:'Color Palette',variables:'CSS Variables',card:'Business Card Preview'},
  fr:{tab:'Brand Kit',title:'🎨 Brand Kit Generator',sub:'Identité de marque complète en 30 secondes',
      name:'Nom de Marque',nameP:'ex. UltraFlow',industry:'Industrie',industryP:'ex. Tech / Finance / Santé',
      primary:'Couleur Principale',secondary:'Couleur Accent',style:'Style de Marque',
      btn:'🎨 Générer le Brand Kit',inject:'💉 Injecter les Variables CSS',copy:'📋 Copier le Kit HTML',
      preview:'Aperçu',typography:'Typographie',colors:'Palette de Couleurs',variables:'Variables CSS',card:'Carte de Visite'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var state={name:'',industry:'',primary:'#8b5cf6',secondary:'#3b82f6',style:'modern'};

function hslToHex(h,s,l){
  s/=100;l/=100;
  var a=s*Math.min(l,1-l);
  function f(n){var k=(n+h/30)%12;var c=l-a*Math.max(Math.min(k-3,9-k,1),-1);return Math.round(255*c).toString(16).padStart(2,'0');}
  return '#'+f(0)+f(8)+f(4);
}
function hexToHsl(hex){
  var r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255;
  var max=Math.max(r,g,b),min=Math.min(r,g,b),h,s,l=(max+min)/2;
  if(max===min){h=s=0;}else{var d=max-min;s=l>0.5?d/(2-max-min):d/(max+min);switch(max){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4;break;}h/=6;}
  return[Math.round(h*360),Math.round(s*100),Math.round(l*100)];
}
function generatePalette(primary){
  var hsl=hexToHsl(primary);
  var h=hsl[0],s=hsl[1];
  return{
    primary:primary,
    light:hslToHex(h,s,Math.min(90,hsl[2]+30)),
    dark:hslToHex(h,s,Math.max(10,hsl[2]-30)),
    complementary:hslToHex((h+180)%360,s,hsl[2]),
    triadic1:hslToHex((h+120)%360,s,hsl[2]),
    triadic2:hslToHex((h+240)%360,s,hsl[2]),
    neutral:'#1e293b',
    surface:'#0f172a',
    text:'#e2e8f0',
    muted:'#64748b'
  };
}
var FONTS={modern:['Inter','Outfit'],creative:['Poppins','DM Sans'],elegant:['Playfair Display','Lato'],bold:['Bebas Neue','Open Sans'],tech:['Space Grotesk','JetBrains Mono']};
var STYLES=['modern','creative','elegant','bold','tech'];

function buildKitHTML(palette,name,tagline,fonts){
  var cssVars='--brand-primary:'+palette.primary+';--brand-light:'+palette.light+';--brand-dark:'+palette.dark+';--brand-accent:'+palette.complementary+';--brand-neutral:'+palette.neutral+';--brand-surface:'+palette.surface+';--brand-text:'+palette.text+';--brand-muted:'+palette.muted+';--font-heading:\''+fonts[0]+'\',sans-serif;--font-body:\''+fonts[1]+'\',sans-serif;';
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>'+name+' Brand Kit</title>'+
    '<link href="https://fonts.googleapis.com/css2?family='+fonts[0].replace(' ','+')+':wght@400;700;900&family='+fonts[1].replace(' ','+')+':wght@400;600&display=swap" rel="stylesheet">'+
    '<style>:root{'+cssVars+'}*{margin:0;padding:0;box-sizing:border-box}body{background:#050810;color:#e2e8f0;font-family:var(--font-body);padding:30px;min-height:100vh}'+
    '.section{margin-bottom:30px}.sec-title{font-size:10px;font-weight:700;color:#475569;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px}'+
    '.card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:20px}'+
    '.logo-big{font-family:var(--font-heading);font-size:48px;font-weight:900;background:linear-gradient(135deg,var(--brand-primary),var(--brand-accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:6px}'+
    '.swatches{display:flex;gap:10px;flex-wrap:wrap}'+
    '.swatch{width:56px;height:56px;border-radius:10px;display:flex;align-items:flex-end;padding:4px;font-size:7px;font-weight:700;color:rgba(255,255,255,.8)}'+
    '.biz-card{background:linear-gradient(135deg,var(--brand-dark),var(--brand-surface));border:1px solid var(--brand-primary)44;border-radius:12px;padding:24px 28px;max-width:320px;position:relative;overflow:hidden}'+
    '.biz-card::before{content:"";position:absolute;top:-30px;right:-30px;width:100px;height:100px;background:var(--brand-primary);opacity:.15;border-radius:50%}'+
    '.biz-name{font-family:var(--font-heading);font-size:20px;font-weight:900;color:#fff;margin-bottom:2px}'+
    '.biz-role{font-size:11px;color:var(--brand-muted);margin-bottom:12px}'+
    '.biz-info{font-size:10px;color:var(--brand-text);opacity:.7;line-height:1.7}'+
    '.type-sample{font-family:var(--font-heading);font-size:28px;font-weight:900;color:#fff;margin-bottom:4px}'+
    '.type-body{font-family:var(--font-body);font-size:13px;color:#94a3b8;line-height:1.7}'+
    '.vars{font-family:monospace;font-size:10px;color:#4ade80;background:#0d1117;padding:14px;border-radius:8px;line-height:1.8;white-space:pre-wrap;border:1px solid rgba(74,222,128,.1)}'+
    '</style></head><body>'+
    '<div class="section"><div class="sec-title">Brand Identity</div><div class="card">'+
    '<div class="logo-big">'+name+'</div>'+
    '<div style="font-size:13px;color:#64748b;">'+tagline+'</div></div></div>'+
    '<div class="section"><div class="sec-title">Color Palette</div><div class="card"><div class="swatches">'+
    Object.entries(palette).map(function(e){return'<div><div class="swatch" style="background:'+e[1]+';"></div><div style="font-size:8px;color:#475569;text-align:center;margin-top:3px;">'+e[0]+'</div><div style="font-size:8px;color:#64748b;text-align:center;">'+e[1]+'</div></div>';}).join('')+'</div></div></div>'+
    '<div class="section"><div class="sec-title">Typography</div><div class="card">'+
    '<div class="type-sample">'+fonts[0]+' — Heading</div>'+
    '<div class="type-body">'+fonts[1]+' — Body text. The quick brown fox jumps over the lazy dog.</div></div></div>'+
    '<div class="section"><div class="sec-title">Business Card Preview</div><div class="biz-card">'+
    '<div class="biz-name">'+name+'</div><div class="biz-role">Founder & CEO</div>'+
    '<div class="biz-info">hello@'+name.toLowerCase().replace(/\s/g,'')+'.com<br>www.'+name.toLowerCase().replace(/\s/g,'')+'.com<br>+1 (555) 000-0000</div></div></div>'+
    '<div class="section"><div class="sec-title">CSS Variables</div>'+
    '<div class="vars">:root {\n  '+cssVars.split(';').filter(Boolean).join(';\n  ')+';\n}</div></div>'+
    '</body></html>';
}

function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(236,72,153,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(236,72,153,0.1),rgba(139,92,246,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#f472b6;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;';

  function row(id,label,ph,type){
    var d=document.createElement('div');
    var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=label;
    var i=document.createElement('input');i.id='bk-'+id;i.placeholder=ph||'';i.type=type||'text';
    if(type==='color'){i.value=state[id]||'#8b5cf6';}else{i.value=state[id]||'';}
    i.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(236,72,153,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;'+(type==='color'?'height:36px;cursor:pointer;padding:2px;':'');
    i.oninput=function(){state[id]=this.value;};
    d.appendChild(l);d.appendChild(i);return d;
  }

  body.appendChild(row('name',t('name'),t('nameP')));
  body.appendChild(row('industry',t('industry'),t('industryP')));

  // Color pickers row
  var cpRow=document.createElement('div');cpRow.style='display:grid;grid-template-columns:1fr 1fr;gap:8px;';
  cpRow.appendChild(row('primary',t('primary'),'',  'color'));
  cpRow.appendChild(row('secondary',t('secondary'),'','color'));
  body.appendChild(cpRow);

  // Style selector
  var styleLbl=document.createElement('div');styleLbl.style='font-size:9px;color:#94a3b8;font-weight:700;';styleLbl.textContent=t('style');body.appendChild(styleLbl);
  var styleRow=document.createElement('div');styleRow.style='display:flex;gap:4px;flex-wrap:wrap;';
  STYLES.forEach(function(s){
    var b=document.createElement('button');b.textContent=s;b.dataset.s=s;
    b.style='padding:4px 10px;border-radius:20px;font-size:9px;font-weight:700;cursor:pointer;border:1px solid rgba(236,72,153,'+(state.style===s?'0.8)':' 0.3)')+';background:rgba(236,72,153,'+(state.style===s?'0.2)':'0.05)')+';color:'+(state.style===s?'#f472b6':'#64748b')+';';
    b.onclick=function(){state.style=s;document.querySelectorAll('[data-s]').forEach(function(x){x.style.borderColor='rgba(236,72,153,0.3)';x.style.background='rgba(236,72,153,0.05)';x.style.color='#64748b';});this.style.borderColor='rgba(236,72,153,0.8)';this.style.background='rgba(236,72,153,0.2)';this.style.color='#f472b6';};
    styleRow.appendChild(b);
  });
  body.appendChild(styleRow);

  var genBtn=document.createElement('button');genBtn.innerHTML=t('btn');
  genBtn.style='width:100%;background:linear-gradient(135deg,#831843,#ec4899);color:#fff;border:none;padding:11px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(236,72,153,0.35);';
  body.appendChild(genBtn);

  var actRow=document.createElement('div');actRow.style='display:none;gap:6px;';
  var injBtn=document.createElement('button');injBtn.innerHTML=t('inject');
  injBtn.style='flex:1;background:linear-gradient(135deg,#064e3b,#10b981);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cpBtn=document.createElement('button');cpBtn.innerHTML=t('copy');
  cpBtn.style='flex:1;background:rgba(255,255,255,0.06);color:#94a3b8;border:1px solid rgba(255,255,255,0.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  actRow.appendChild(injBtn);actRow.appendChild(cpBtn);body.appendChild(actRow);

  var preview=document.createElement('div');preview.style='display:none;';body.appendChild(preview);
  wrap.appendChild(body);parent.appendChild(wrap);

  var kitHTML='';
  genBtn.onclick=function(){
    var name=document.getElementById('bk-name').value||'MyBrand';
    var industry=document.getElementById('bk-industry').value||'Tech';
    var primary=document.getElementById('bk-primary').value||'#8b5cf6';
    var fonts=FONTS[state.style]||FONTS.modern;
    var palette=generatePalette(primary);
    var tagline=industry+' · Innovation · Excellence';
    kitHTML=buildKitHTML(palette,name,tagline,fonts);
    actRow.style.display='flex';
    preview.style.display='block';
    preview.innerHTML='<div style="background:rgba(236,72,153,0.06);border:1px solid rgba(236,72,153,0.2);border-radius:8px;padding:10px;">'+
      '<div style="font-size:11px;font-weight:700;color:#f472b6;margin-bottom:8px;">✅ Brand Kit Ready</div>'+
      '<div style="display:flex;gap:6px;flex-wrap:wrap;">'+
      Object.values(generatePalette(primary)).map(function(c){return'<div style="width:28px;height:28px;background:'+c+';border-radius:6px;border:1px solid rgba(255,255,255,0.1);" title="'+c+'"></div>';}).join('')+
      '</div><div style="font-size:9px;color:#64748b;margin-top:6px;">Font: '+fonts[0]+' / '+fonts[1]+'</div></div>';
    if(window.showToast)window.showToast('🎨 Brand Kit generated!');
  };
  injBtn.onclick=function(){
    if(!kitHTML)return;
    var cssVars=':root{--brand-primary:'+document.getElementById('bk-primary').value+';--font-heading:\''+( FONTS[state.style]||FONTS.modern)[0]+'\',sans-serif;}';
    var inj=window.injectCode||(window.parent&&window.parent.injectCode);
    if(typeof inj==='function'){inj(kitHTML);if(window.showToast)window.showToast('✅ Brand Kit injected!');}
  };
  cpBtn.onclick=function(){if(kitHTML&&navigator.clipboard)navigator.clipboard.writeText(kitHTML).then(function(){if(window.showToast)window.showToast('📋 Copied!');});};
}

document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;
  window.renderTab=function(tab){
    if(tab==='brandkit'){window.activeTab='brandkit';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-brandkit');if(btn)btn.classList.add('active');renderTab();return;}
    if(typeof oRT==='function')oRT(tab);
  };
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-brandkit');if(el)el.textContent=t('tab');if(window.activeTab==='brandkit')renderTab();};
});
})();
