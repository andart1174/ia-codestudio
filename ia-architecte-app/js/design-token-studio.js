/**
 * Design Token Studio v1.0 — EN/FR — Non-destructive
 */
(function() {
'use strict';
var TX={en:{tab:'Tokens',title:'🎨 Design Token Studio',sub:'Visual CSS variables — sync to editor',palette:'✨ Auto Palette',paletteGen:'Generate',inject:'⚡ Inject into Editor',exportCSS:'📋 Copy CSS',preview:'Live Preview',noEditor:'⚠️ Editor not ready.',injected:'✅ Tokens injected!',copied:'✅ CSS copied!',colors:'🎨 Colors',typo:'✏️ Typography',radii:'⬜ Radius',shadows:'🌑 Shadows'},fr:{tab:'Tokens',title:'🎨 Design Token Studio',sub:'Variables CSS visuelles — sync éditeur',palette:'✨ Palette Auto',paletteGen:'Générer',inject:'⚡ Injecter dans l\'Éditeur',exportCSS:'📋 Copier CSS',preview:'Aperçu live',noEditor:'⚠️ Éditeur non prêt.',injected:'✅ Tokens injectés !',copied:'✅ CSS copié !',colors:'🎨 Couleurs',typo:'✏️ Typographie',radii:'⬜ Rayon',shadows:'🌑 Ombres'}};
function gl(){return window.lang||'en';}
function t(k){return (TX[gl()]||TX.en)[k]||k;}

var S={primary:'#8b5cf6',accent:'#3b82f6',success:'#10b981',danger:'#ef4444',warning:'#f59e0b',bg:'#020617',surface:'#0f172a',text:'#e2e8f0',fontBody:'Inter, sans-serif',fontHead:'Inter, sans-serif',fontSize:'16px',lineHeight:'1.6',radSm:'6px',radMd:'12px',radLg:'20px',radFull:'9999px',shdSm:'0 1px 3px rgba(0,0,0,0.3)',shdMd:'0 8px 25px rgba(0,0,0,0.4)',shdLg:'0 20px 60px rgba(0,0,0,0.5)'};

function h2hsl(h){var r=parseInt(h.slice(1,3),16)/255,g=parseInt(h.slice(3,5),16)/255,b=parseInt(h.slice(5,7),16)/255,max=Math.max(r,g,b),min=Math.min(r,g,b),l=(max+min)/2,s=0,hh=0;if(max!==min){var d=max-min;s=l>0.5?d/(2-max-min):d/(max+min);switch(max){case r:hh=((g-b)/d+(g<b?6:0))/6;break;case g:hh=((b-r)/d+2)/6;break;default:hh=((r-g)/d+4)/6;}}return[Math.round(hh*360),Math.round(s*100),Math.round(l*100)];}
function hsl2h(h,s,l){s/=100;l/=100;var a=s*Math.min(l,1-l),f=function(n){var k=(n+h/30)%12,c=l-a*Math.max(Math.min(k-3,9-k,1),-1);return Math.round(255*c).toString(16).padStart(2,'0');};return'#'+f(0)+f(8)+f(4);}

function genPalette(hex){var hsl=h2hsl(hex);var h=hsl[0],s=hsl[1];S.primary=hex;S.accent=hsl2h((h+30)%360,s,55);S.bg=hsl2h(h,Math.min(s,35),5);S.surface=hsl2h(h,Math.min(s,25),10);}

function buildCSS(){return':root{\n  --primary:'+S.primary+';\n  --accent:'+S.accent+';\n  --success:'+S.success+';\n  --danger:'+S.danger+';\n  --warning:'+S.warning+';\n  --bg:'+S.bg+';\n  --surface:'+S.surface+';\n  --text:'+S.text+';\n  --font-body:'+S.fontBody+';\n  --font-heading:'+S.fontHead+';\n  --font-size:'+S.fontSize+';\n  --line-height:'+S.lineHeight+';\n  --radius-sm:'+S.radSm+';\n  --radius-md:'+S.radMd+';\n  --radius-lg:'+S.radLg+';\n  --radius-full:'+S.radFull+';\n  --shadow-sm:'+S.shdSm+';\n  --shadow-md:'+S.shdMd+';\n  --shadow-lg:'+S.shdLg+';\n}';}

function injectTokens(){if(!window.editor){if(window.showToast)window.showToast(t('noEditor'));return;}var css=buildCSS();var code=window.editor.getValue();code=code.replace(/<style id="ia-tokens">[\s\S]*?<\/style>/g,'');var block='\n<style id="ia-tokens">\n'+css+'\n</style>';code=code.includes('</head>')?code.replace('</head>',block+'\n</head>'):block+'\n'+code;window.editor.setValue(code);if(window.runPreview)window.runPreview();if(window.showToast)window.showToast(t('injected'));}

function copyCSS(){navigator.clipboard&&navigator.clipboard.writeText(buildCSS());if(window.showToast)window.showToast(t('copied'));}

function updatePreview(){var p=document.getElementById('dts-prev');if(!p)return;p.style.background=S.bg;p.style.color=S.text;var b=p.querySelector('.dts-b');if(b){b.style.background=S.primary;b.style.borderRadius=S.radMd;}var c=p.querySelector('.dts-c');if(c){c.style.background=S.surface;c.style.borderRadius=S.radLg;c.style.boxShadow=S.shdMd;}var a=p.querySelector('.dts-a');if(a)a.style.color=S.accent;}

function cr(label,key,isColor){
  var row=document.createElement('div');row.style='display:flex;align-items:center;gap:8px;margin-bottom:6px;';
  var lbl=document.createElement('span');lbl.style='font-size:11px;color:#94a3b8;flex:1;';lbl.textContent=label;
  if(isColor){
    var sw=document.createElement('input');sw.type='color';sw.value=S[key];sw.style='width:28px;height:28px;border:none;border-radius:6px;cursor:pointer;padding:0;';
    var val=document.createElement('span');val.style='font-size:10px;font-family:monospace;color:#64748b;min-width:60px;text-align:right;';val.textContent=S[key];
    sw.oninput=function(){S[key]=sw.value;val.textContent=sw.value;updatePreview();};
    row.appendChild(sw);row.appendChild(lbl);row.appendChild(val);
  } else {
    var inp=document.createElement('input');inp.type='text';inp.value=S[key];inp.style='background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:5px;padding:4px 7px;color:#fff;font-size:10px;outline:none;width:110px;flex-shrink:0;';
    inp.oninput=function(){S[key]=inp.value;updatePreview();};
    row.appendChild(lbl);row.appendChild(inp);
  }
  return row;
}

function sec(label,rows){var d=document.createElement('div');d.style='margin-bottom:12px;';var h=document.createElement('div');h.style='font-size:9px;font-weight:900;color:#64748b;letter-spacing:1px;text-transform:uppercase;margin-bottom:7px;';h.textContent=label;d.appendChild(h);rows.forEach(function(r){d.appendChild(r);});return d;}

function renderTokensTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr=document.createElement('div');hdr.style='padding:12px 14px 8px;border-bottom:1px solid rgba(139,92,246,0.25);flex-shrink:0;';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#a78bfa;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);

  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:10px 12px 14px;';

  // Preview
  var pSec=document.createElement('div');pSec.style='margin-bottom:12px;';
  var pLbl=document.createElement('div');pLbl.style='font-size:9px;font-weight:900;color:#64748b;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px;';pLbl.textContent=t('preview');
  var prev=document.createElement('div');prev.id='dts-prev';prev.style='border-radius:10px;padding:12px;border:1px solid rgba(255,255,255,0.08);transition:0.3s;background:'+S.bg+';color:'+S.text+';';
  prev.innerHTML='<div class="dts-a" style="font-size:11px;font-weight:700;margin-bottom:7px;color:'+S.accent+';">Brand Title</div><div class="dts-c" style="padding:10px;margin-bottom:7px;background:'+S.surface+';border-radius:'+S.radLg+';box-shadow:'+S.shdMd+';"><div style="font-size:10px;margin-bottom:6px;">Card preview</div><button class="dts-b" style="background:'+S.primary+';color:#fff;border:none;padding:5px 12px;border-radius:'+S.radMd+';font-size:10px;font-weight:700;cursor:pointer;">Button</button></div>';
  pSec.appendChild(pLbl);pSec.appendChild(prev);body.appendChild(pSec);

  // Palette generator
  var palBox=document.createElement('div');palBox.style='background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.2);border-radius:9px;padding:9px;margin-bottom:12px;display:flex;align-items:center;gap:7px;';
  palBox.innerHTML='<span style="font-size:10px;color:#a78bfa;font-weight:700;flex:1;">'+t('palette')+'</span>';
  var palInp=document.createElement('input');palInp.type='color';palInp.value=S.primary;palInp.style='width:30px;height:26px;border:none;border-radius:6px;cursor:pointer;padding:0;';
  var palBtn=document.createElement('button');palBtn.textContent=t('paletteGen');palBtn.style='background:linear-gradient(135deg,#8b5cf6,#6d28d9);border:none;border-radius:7px;padding:5px 10px;color:#fff;font-weight:900;font-size:10px;cursor:pointer;';
  palBtn.onclick=function(){genPalette(palInp.value);renderTokensTab();};
  palBox.appendChild(palInp);palBox.appendChild(palBtn);body.appendChild(palBox);

  // Colors
  body.appendChild(sec(t('colors'),[
    cr('Primary','primary',true),cr('Accent','accent',true),cr('Success','success',true),
    cr('Danger','danger',true),cr('Warning','warning',true),cr('Background','bg',true),
    cr('Surface','surface',true),cr('Text','text',true)
  ]));

  // Typography
  body.appendChild(sec(t('typo'),[
    cr('Body font','fontBody',false),cr('Heading font','fontHead',false),
    cr('Font size','fontSize',false),cr('Line height','lineHeight',false)
  ]));

  // Radius
  body.appendChild(sec(t('radii'),[
    cr('Small','radSm',false),cr('Medium','radMd',false),cr('Large','radLg',false),cr('Full','radFull',false)
  ]));

  // Shadows
  body.appendChild(sec(t('shadows'),[
    cr('Small','shdSm',false),cr('Medium','shdMd',false),cr('Large','shdLg',false)
  ]));

  wrap.appendChild(body);

  // Footer
  var ftr=document.createElement('div');ftr.style='padding:10px 12px;border-top:1px solid rgba(255,255,255,0.06);display:flex;gap:6px;flex-shrink:0;';
  var iBtn=document.createElement('button');iBtn.textContent=t('inject');iBtn.style='flex:1;background:linear-gradient(135deg,#8b5cf6,#6d28d9);border:none;border-radius:8px;padding:9px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;';iBtn.onclick=injectTokens;
  var cBtn=document.createElement('button');cBtn.textContent=t('exportCSS');cBtn.style='background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:9px 10px;color:#94a3b8;font-size:11px;cursor:pointer;font-weight:700;';cBtn.onclick=copyCSS;
  ftr.appendChild(iBtn);ftr.appendChild(cBtn);wrap.appendChild(ftr);
  parent.appendChild(wrap);
  updatePreview();
}

document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;
  window.applyLang=function(){if(typeof oAL==='function')oAL();var e=document.getElementById('lbl-tab-dtstudio');if(e)e.textContent=t('tab');if(window.activeTab==='dtstudio')renderTokensTab();};
  var oRT=window.renderTab;
  window.renderTab=function(tab){if(tab==='dtstudio'){window.activeTab='dtstudio';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b=document.getElementById('tab-dtstudio');if(b)b.classList.add('active');renderTokensTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
