/**
 * Screenshot-to-Code v1.0 — EN/FR
 */
(function(){
'use strict';
var TX={
  en:{tab:'Img→Code',title:'📸 Screenshot-to-Code',sub:'Upload screenshot → get HTML/CSS',
      upload:'Drop image here or click to upload',analyzing:'🔍 Analyzing...',
      btnGen:'🪄 Generate Code',btnCopy:'📋 Copy',btnInject:'💉 Inject',
      palette:'Color Palette:',copied:'📋 Copied!',injected:'✅ Injected!',
      tip:'Detects colors, layout & generates matching HTML/CSS.'},
  fr:{tab:'Img→Code',title:'📸 Screenshot vers Code',sub:'Uploadez capture → obtenez HTML/CSS',
      upload:'Déposez image ou cliquez',analyzing:'🔍 Analyse...',
      btnGen:'🪄 Générer Code',btnCopy:'📋 Copier',btnInject:'💉 Injecter',
      palette:'Palette :',copied:'📋 Copié !',injected:'✅ Injecté !',
      tip:'Détecte couleurs, layout et génère le HTML/CSS correspondant.'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var lastCode='';var lastImg=null;var dominantColors=[];

function rgbToHex(r,g,b){return'#'+[r,g,b].map(function(v){return Math.round(v).toString(16).padStart(2,'0');}).join('');}

function analyzeImage(img){
  var cv=document.createElement('canvas');
  cv.width=Math.min(img.naturalWidth||300,300);cv.height=Math.min(img.naturalHeight||200,200);
  var ctx=cv.getContext('2d');ctx.drawImage(img,0,0,cv.width,cv.height);
  var data=ctx.getImageData(0,0,cv.width,cv.height).data;
  var colorMap={};var step=8;
  for(var i=0;i<data.length;i+=4*step){
    if(data[i+3]<128)continue;
    var r=Math.round(data[i]/32)*32,g=Math.round(data[i+1]/32)*32,b=Math.round(data[i+2]/32)*32;
    var key=r+','+g+','+b;colorMap[key]=(colorMap[key]||0)+1;
  }
  var sorted=Object.entries(colorMap).sort(function(a,b){return b[1]-a[1];});
  dominantColors=sorted.slice(0,6).map(function(e){var p=e[0].split(',');return rgbToHex(p[0],p[1],p[2]);});
  var totalBr=0;var cnt=0;
  for(var i=0;i<data.length;i+=4*step*4){totalBr+=(data[i]*.299+data[i+1]*.587+data[i+2]*.114);cnt++;}
  var isDark=(totalBr/cnt)<128;
  var ratio=(img.naturalWidth||300)/(img.naturalHeight||200);
  return{isDark:isDark,isWide:ratio>1.4};
}

function generateCode(a){
  var c=dominantColors;
  var bg=c[0]||'#0f172a',accent=c[1]||'#3b82f6',text=c[2]||(a.isDark?'#e2e8f0':'#1e293b'),sub=c[3]||'#64748b';
  var hero=a.isWide?
    '<section style="display:grid;grid-template-columns:1fr 1fr;gap:40px;padding:80px;align-items:center;">\n  <div>\n    <h1 style="font-size:48px;font-weight:900;color:'+text+';line-height:1.1;margin:0 0 20px;">Your Headline Here</h1>\n    <p style="font-size:18px;color:'+sub+';line-height:1.6;margin:0 0 32px;">Compelling description that converts visitors into customers.</p>\n    <button style="background:'+accent+';color:#fff;padding:16px 40px;border:none;border-radius:10px;font-size:16px;font-weight:700;cursor:pointer;">Get Started →</button>\n  </div>\n  <div style="background:'+accent+'22;border-radius:20px;height:320px;display:flex;align-items:center;justify-content:center;font-size:80px;">🎨</div>\n</section>':
    '<section style="padding:80px 40px;text-align:center;max-width:800px;margin:0 auto;">\n  <h1 style="font-size:40px;font-weight:900;color:'+text+';margin:0 0 20px;">Your Headline</h1>\n  <p style="font-size:17px;color:'+sub+';line-height:1.6;margin:0 0 32px;">Compelling description here.</p>\n  <button style="background:'+accent+';color:#fff;padding:14px 36px;border:none;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer;">Action</button>\n</section>';
  var cards='<section style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px;padding:40px 80px;">\n'+
    [['🚀','Feature One'],['⚡','Feature Two'],['🎨','Feature Three']].map(function(f){
      return'  <div style="background:'+bg+';border:1px solid '+accent+'33;border-radius:16px;padding:28px;">\n    <div style="font-size:36px;margin-bottom:14px;">'+f[0]+'</div>\n    <h3 style="font-size:18px;font-weight:700;color:'+text+';margin:0 0 10px;">'+f[1]+'</h3>\n    <p style="font-size:14px;color:'+sub+';margin:0;line-height:1.5;">Description of this feature.</p>\n  </div>';
    }).join('\n')+'\n</section>';
  return'<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<title>Generated Page</title>\n<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">\n<style>*{margin:0;padding:0;box-sizing:border-box;}body{background:'+bg+';font-family:Inter,sans-serif;color:'+text+';}</style>\n</head>\n<body>\n<header style="background:'+accent+';padding:16px 40px;display:flex;justify-content:space-between;align-items:center;">\n  <div style="font-size:20px;font-weight:900;color:#fff;">Brand</div>\n  <nav style="display:flex;gap:20px;"><a href="#" style="color:rgba(255,255,255,0.85);text-decoration:none;font-size:14px;">Home</a><a href="#" style="color:rgba(255,255,255,0.85);text-decoration:none;font-size:14px;">About</a><a href="#" style="color:rgba(255,255,255,0.85);text-decoration:none;font-size:14px;">Contact</a></nav>\n</header>\n'+hero+'\n'+cards+'\n</body>\n</html>';
}

function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(99,102,241,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(99,102,241,0.12),rgba(168,85,247,0.08));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#818cf8;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;';
  var tip=document.createElement('div');tip.style='font-size:9.5px;color:#94a3b8;background:rgba(99,102,241,0.06);border:1px solid rgba(99,102,241,0.15);border-radius:6px;padding:7px 9px;';tip.textContent='💡 '+t('tip');body.appendChild(tip);

  var dz=document.createElement('div');
  dz.style='border:2px dashed rgba(99,102,241,0.4);border-radius:12px;padding:24px;text-align:center;cursor:pointer;background:rgba(99,102,241,0.04);';
  dz.innerHTML='<div style="font-size:32px;margin-bottom:8px;">📸</div><div style="font-size:10px;color:#64748b;">'+t('upload')+'</div>';
  var fi=document.createElement('input');fi.type='file';fi.accept='image/*';fi.style='display:none;';dz.appendChild(fi);
  dz.onclick=function(e){if(e.target!==fi)fi.click();};
  dz.ondragover=function(e){e.preventDefault();this.style.borderColor='#6366f1';};
  dz.ondrop=function(e){e.preventDefault();var f=e.dataTransfer.files[0];if(f&&f.type.startsWith('image/'))processFile(f);};
  fi.onchange=function(){if(this.files[0])processFile(this.files[0]);};
  body.appendChild(dz);

  var genBtn=document.createElement('button');genBtn.innerHTML=t('btnGen');
  genBtn.style='width:100%;background:linear-gradient(135deg,#3730a3,#6366f1);color:#fff;border:none;padding:11px;border-radius:10px;font-weight:900;font-size:12px;cursor:pointer;display:'+(lastImg?'block':'none')+';';
  genBtn.onclick=function(){
    if(!lastImg)return;genBtn.innerHTML=t('analyzing');genBtn.disabled=true;
    var img=new Image();img.onload=function(){
      var a=analyzeImage(img);lastCode=generateCode(a);
      genBtn.innerHTML=t('btnGen');genBtn.disabled=false;
      var pr=document.getElementById('s2c-palette');
      if(pr){pr.innerHTML='';dominantColors.forEach(function(c){var s=document.createElement('div');s.style='width:22px;height:22px;border-radius:4px;background:'+c+';border:1px solid rgba(255,255,255,0.1);';s.title=c;pr.appendChild(s);});}
      var out=document.getElementById('s2c-output');if(out)out.style.display='flex';
      var pre=document.getElementById('s2c-pre');if(pre)pre.textContent=lastCode;
      if(window.showToast)window.showToast('✅ Code generated!');
    };img.src=lastImg;
  };

  function processFile(file){
    var reader=new FileReader();reader.onload=function(e){
      lastImg=e.target.result;
      var pv=document.getElementById('s2c-preview');
      if(!pv){pv=document.createElement('img');pv.id='s2c-preview';pv.style='width:100%;border-radius:8px;max-height:140px;object-fit:cover;border:1px solid rgba(255,255,255,0.1);';body.insertBefore(pv,genBtn);}
      pv.src=lastImg;genBtn.style.display='block';
    };reader.readAsDataURL(file);
  }
  if(lastImg){var pv=document.createElement('img');pv.id='s2c-preview';pv.style='width:100%;border-radius:8px;max-height:140px;object-fit:cover;border:1px solid rgba(255,255,255,0.1);';pv.src=lastImg;body.appendChild(pv);}
  body.appendChild(genBtn);

  var pl=document.createElement('div');pl.style='font-size:10px;color:#64748b;font-weight:600;';pl.textContent=t('palette');body.appendChild(pl);
  var pr=document.createElement('div');pr.id='s2c-palette';pr.style='display:flex;gap:5px;flex-wrap:wrap;min-height:22px;';
  dominantColors.forEach(function(c){var s=document.createElement('div');s.style='width:22px;height:22px;border-radius:4px;background:'+c+';border:1px solid rgba(255,255,255,0.1);';s.title=c;pr.appendChild(s);});
  body.appendChild(pr);

  var out=document.createElement('div');out.id='s2c-output';out.style='display:'+(lastCode?'flex':'none')+';flex-direction:column;gap:6px;';
  var pre=document.createElement('pre');pre.id='s2c-pre';pre.style='background:#0d1117;border:1px solid rgba(99,102,241,0.2);border-radius:8px;padding:10px;font-size:8px;color:#c9d1d9;overflow:auto;max-height:150px;white-space:pre-wrap;margin:0;font-family:"JetBrains Mono",monospace;line-height:1.4;word-break:break-word;';pre.textContent=lastCode;out.appendChild(pre);
  var ar=document.createElement('div');ar.style='display:flex;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=t('btnInject');ib.style='flex:1;background:rgba(16,185,129,0.12);color:#34d399;border:1px solid rgba(16,185,129,0.3);padding:8px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
  ib.onclick=function(){if(window.editor&&lastCode){window.editor.setValue(lastCode);if(window.runPreview)window.runPreview();}if(window.showToast)window.showToast(t('injected'));};
  var cb=document.createElement('button');cb.innerHTML=t('btnCopy');cb.style='background:rgba(99,102,241,0.12);color:#818cf8;border:1px solid rgba(99,102,241,0.3);padding:8px 10px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
  cb.onclick=function(){if(lastCode)navigator.clipboard.writeText(lastCode).then(function(){if(window.showToast)window.showToast(t('copied'));});};
  ar.appendChild(ib);ar.appendChild(cb);out.appendChild(ar);body.appendChild(out);
  wrap.appendChild(body);parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-s2c');if(el)el.textContent=t('tab');if(window.activeTab==='s2c')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='s2c'){window.activeTab='s2c';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-s2c');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
