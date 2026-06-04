/**
 * App Story Generator v1.0 — EN/FR
 * Generates pitch deck + App Store description from editor code
 */
(function(){
'use strict';
var TX={
  en:{tab:'App Story',title:'🎬 App Story Generator',sub:'Generate pitch deck & App Store assets',
      appName:'App Name:',appNamePh:'My Awesome App',tagline:'Tagline:',tagPh:'The future of productivity.',
      category:'Category:',btnGen:'🎬 Generate Story',btnExport:'📤 Export Pitch Deck',btnCopy:'📋 Copy',
      slide:'Slide',exported:'✅ Pitch deck exported!',copied:'📋 Copied!',
      cats:{productivity:'📈 Productivity',social:'💬 Social',health:'💪 Health & Fitness',
            finance:'💰 Finance',education:'📚 Education',entertainment:'🎮 Entertainment',tools:'🛠 Tools & Utilities'}},
  fr:{tab:'App Story',title:'🎬 Générateur App Story',sub:'Créez pitch deck & assets App Store',
      appName:'Nom de l\'App :',appNamePh:'Mon Super App',tagline:'Slogan :',tagPh:'L\'avenir de la productivité.',
      category:'Catégorie :',btnGen:'🎬 Générer Story',btnExport:'📤 Exporter Pitch Deck',btnCopy:'📋 Copier',
      slide:'Diapo',exported:'✅ Pitch deck exporté !',copied:'📋 Copié !',
      cats:{productivity:'📈 Productivité',social:'💬 Social',health:'💪 Santé & Sport',
            finance:'💰 Finance',education:'📚 Éducation',entertainment:'🎮 Divertissement',tools:'🛠 Outils'}}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}
function tc(k){return((TX[gl()]||TX.en).cats||TX.en.cats)[k]||k;}

var lastHTML='';

var SLIDE_TEMPLATES=[
  function(name,tag,cat,color){return{title:'🚀 '+name,body:'<h2 style="font-size:48px;font-weight:900;margin:0;">'+name+'</h2><p style="font-size:20px;opacity:0.8;margin-top:16px;">'+tag+'</p><div style="margin-top:24px;background:rgba(255,255,255,0.15);display:inline-block;padding:8px 24px;border-radius:20px;font-size:14px;">'+tc(cat)+'</div>',bg:'linear-gradient(135deg,'+color+','+color+'99)'};},
  function(name,tag,cat,color){return{title:'❓ The Problem',body:'<h2 style="font-size:36px;font-weight:900;">The Problem</h2><div style="display:flex;flex-direction:column;gap:16px;margin-top:24px;">'+['😤 Existing tools are complex','⏰ Wastes hours of time','💸 Expensive enterprise solutions'].map(function(p){return'<div style="display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.1);padding:12px 20px;border-radius:10px;font-size:16px;">'+p+'</div>';}).join('')+'</div>',bg:'linear-gradient(135deg,#1e293b,#0f172a)'};},
  function(name,tag,cat,color){return{title:'💡 The Solution',body:'<h2 style="font-size:36px;font-weight:900;">Our Solution</h2><p style="font-size:18px;margin:16px 0;opacity:0.85;">'+name+' solves this with a simple, elegant approach.</p>'+['✅ One-click setup','⚡ 10x faster than alternatives','🎯 Built for real users'].map(function(p){return'<div style="background:'+color+'33;border:1px solid '+color+'66;padding:10px 20px;border-radius:10px;margin-top:8px;font-size:15px;">'+p+'</div>';}).join(''),bg:'linear-gradient(135deg,#0c2340,#0f4c81)'};},
  function(name,tag,cat,color){return{title:'📊 Key Features',body:'<h2 style="font-size:36px;font-weight:900;">Key Features</h2><div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:24px;">'+['🚀 Lightning Fast','🔒 Secure by Default','📱 Mobile-First','🌍 Multi-Language','🤖 AI-Powered','💾 Auto-Save'].map(function(f){return'<div style="background:rgba(255,255,255,0.08);border-radius:12px;padding:16px;font-size:14px;font-weight:600;">'+f+'</div>';}).join('')+'</div>',bg:'linear-gradient(135deg,#1a1a2e,#16213e)'};},
  function(name,tag,cat,color){return{title:'💰 Business Model',body:'<h2 style="font-size:36px;font-weight:900;">Revenue Model</h2><div style="display:flex;gap:20px;margin-top:24px;justify-content:center;">'+[{p:'Free',pr:'$0',f:'5 projects'},{ p:'Pro',pr:'$9.99/mo',f:'Unlimited'},{ p:'Business',pr:'$49/mo',f:'Team + API'}].map(function(plan){return'<div style="background:rgba(255,255,255,0.1);border-radius:16px;padding:24px;text-align:center;flex:1;"><div style="font-size:16px;font-weight:700;">'+plan.p+'</div><div style="font-size:28px;font-weight:900;margin:8px 0;color:'+color+';">'+plan.pr+'</div><div style="font-size:12px;opacity:0.7;">'+plan.f+'</div></div>';}).join('')+'</div>',bg:'linear-gradient(135deg,#0a2e1a,#064e3b)'};},
  function(name,tag,cat,color){return{title:'📈 Traction',body:'<h2 style="font-size:36px;font-weight:900;">Why Now?</h2><div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:32px;">'+[{v:'$50B+',l:'Market Size'},{v:'12%',l:'YoY Growth'},{v:'10K+',l:'Waitlist'},{v:'95%',l:'User Satisfaction'}].map(function(s){return'<div style="text-align:center;"><div style="font-size:36px;font-weight:900;color:'+color+';">'+s.v+'</div><div style="font-size:13px;opacity:0.7;margin-top:4px;">'+s.l+'</div></div>';}).join('')+'</div>',bg:'linear-gradient(135deg,#1a0a2e,#2e0a4e)'};},
  function(name,tag,cat,color){return{title:'🎯 Call to Action',body:'<h2 style="font-size:42px;font-weight:900;">Join the Future</h2><p style="font-size:18px;opacity:0.8;margin:20px 0;">Be part of the '+name+' revolution.</p><div style="background:'+color+';color:#000;font-weight:900;font-size:18px;padding:16px 40px;border-radius:30px;display:inline-block;margin-top:16px;cursor:pointer;">🚀 Get Early Access</div><p style="margin-top:24px;font-size:14px;opacity:0.6;">Built with IA Architecte Studio</p>',bg:'linear-gradient(135deg,'+color+'44,'+color+'11)'};} 
];

var COLORS=['#3b82f6','#10b981','#f59e0b','#a78bfa','#ec4899','#06b6d4'];

function buildDeck(name,tag,cat){
  var color=COLORS[Math.floor(Math.random()*COLORS.length)];
  var slides=SLIDE_TEMPLATES.map(function(fn){return fn(name,tag,cat,color);});
  var slideHTML=slides.map(function(s,i){
    return '<section class="slide" id="slide-'+(i+1)+'" style="background:'+s.bg+';display:'+(i===0?'flex':'none')+';flex-direction:column;align-items:center;justify-content:center;text-align:center;min-height:100vh;padding:60px 40px;">\n' +
      '<div style="max-width:800px;width:100%;">'+s.body+'</div>\n' +
      '<div style="position:fixed;bottom:24px;right:24px;display:flex;gap:8px;">' +
      '<button onclick="prevSlide()" style="background:rgba(255,255,255,0.15);color:#fff;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;font-weight:700;">◀</button>' +
      '<span style="background:rgba(255,255,255,0.1);color:#fff;padding:10px 20px;border-radius:8px;font-size:13px;">'+(i+1)+'/'+slides.length+'</span>' +
      '<button onclick="nextSlide()" style="background:rgba(255,255,255,0.15);color:#fff;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;font-weight:700;">▶</button></div>\n' +
      '</section>';
  }).join('\n');

  return '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>'+name+' — Pitch Deck</title>\n' +
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">\n' +
    '<style>*{box-sizing:border-box;margin:0;padding:0;}body{font-family:Inter,sans-serif;color:#fff;overflow:hidden;}</style>\n' +
    '</head>\n<body>\n'+slideHTML+'\n' +
    '<script>var cur=1,total='+slides.length+';\n' +
    'function showSlide(n){document.querySelectorAll(".slide").forEach((s,i)=>s.style.display=i===n-1?"flex":"none");cur=n;}\n' +
    'function nextSlide(){if(cur<total)showSlide(cur+1);}\n' +
    'function prevSlide(){if(cur>1)showSlide(cur-1);}\n' +
    'document.addEventListener("keydown",e=>{if(e.key==="ArrowRight"||e.key===" ")nextSlide();if(e.key==="ArrowLeft")prevSlide();});\n' +
    '</scr'+'ipt>\n</body>\n</html>';
}

function renderTab(){
  var parent=document.getElementById('left-body');
  if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');
  wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';

  var hdr=document.createElement('div');
  hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(236,72,153,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(236,72,153,0.1),rgba(168,85,247,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#f472b6;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);

  var body=document.createElement('div');
  body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;';

  function mkInput(labelKey,id,ph){
    var d=document.createElement('div');
    d.style='display:flex;flex-direction:column;gap:4px;';
    var l=document.createElement('div');l.style='font-size:10px;color:#64748b;font-weight:600;';l.textContent=t(labelKey);
    var inp=document.createElement('input');inp.type='text';inp.id=id;inp.placeholder=ph;
    inp.style='background:#1e293b;color:#e2e8f0;border:1px solid rgba(236,72,153,0.2);padding:8px 10px;border-radius:8px;font-size:11px;outline:none;width:100%;box-sizing:border-box;';
    d.appendChild(l);d.appendChild(inp);return d;
  }

  body.appendChild(mkInput('appName','story-name',t('appNamePh')));
  body.appendChild(mkInput('tagline','story-tag',t('tagPh')));

  var catLabel=document.createElement('div');catLabel.style='font-size:10px;color:#64748b;font-weight:600;';catLabel.textContent=t('category');body.appendChild(catLabel);
  var catSel=document.createElement('select');catSel.id='story-cat';
  catSel.style='background:#1e293b;color:#e2e8f0;border:1px solid rgba(236,72,153,0.2);padding:8px;border-radius:8px;font-size:10px;width:100%;cursor:pointer;';
  Object.keys((TX.en.cats||{})).forEach(function(k){var o=document.createElement('option');o.value=k;o.textContent=tc(k);catSel.appendChild(o);});
  body.appendChild(catSel);

  // Slides preview
  var slideLabel=document.createElement('div');slideLabel.style='font-size:10px;color:#64748b;font-weight:600;';slideLabel.textContent=gl()==='fr'?'Diapositives incluses :':'Included Slides:';body.appendChild(slideLabel);
  var slidesPreview=document.createElement('div');slidesPreview.style='display:flex;flex-direction:column;gap:3px;';
  ['🚀 Hero Slide','❓ The Problem','💡 The Solution','📊 Key Features','💰 Business Model','📈 Traction','🎯 Call to Action'].forEach(function(s,i){
    var row=document.createElement('div');row.style='display:flex;align-items:center;gap:8px;padding:5px 8px;background:rgba(255,255,255,0.02);border-radius:6px;font-size:10px;color:#94a3b8;';
    row.innerHTML='<span style="color:#f472b6;font-weight:700;font-size:9px;">'+(i+1)+'</span>'+s;
    slidesPreview.appendChild(row);
  });
  body.appendChild(slidesPreview);

  var genBtn=document.createElement('button');
  genBtn.innerHTML=t('btnGen');
  genBtn.style='width:100%;background:linear-gradient(135deg,#be185d,#7c3aed);color:#fff;border:none;padding:12px;border-radius:10px;font-weight:900;font-size:12px;cursor:pointer;box-shadow:0 4px 20px rgba(190,24,93,0.35);margin-top:4px;';
  genBtn.onmouseover=function(){this.style.transform='translateY(-1px)';};genBtn.onmouseout=function(){this.style.transform='';};
  genBtn.onclick=function(){
    var name=(document.getElementById('story-name')||{}).value||'My App';
    var tag=(document.getElementById('story-tag')||{}).value||'The future is here.';
    var cat=(document.getElementById('story-cat')||{}).value||'tools';
    lastHTML=buildDeck(name,tag,cat);
    if(window.editor){window.editor.setValue(lastHTML);if(window.runPreview)window.runPreview();}
    var acts=document.getElementById('story-actions');if(acts)acts.style.display='flex';
    if(window.showToast)window.showToast(t('exported'));
  };
  body.appendChild(genBtn);

  var acts=document.createElement('div');acts.id='story-actions';acts.style='display:'+(lastHTML?'flex':'none')+';gap:8px;';
  var cpBtn=document.createElement('button');cpBtn.innerHTML=t('btnCopy');
  cpBtn.style='flex:1;background:rgba(236,72,153,0.12);color:#f472b6;border:1px solid rgba(236,72,153,0.3);padding:9px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
  cpBtn.onclick=function(){if(lastHTML)navigator.clipboard.writeText(lastHTML).then(function(){if(window.showToast)window.showToast(t('copied'));});};
  acts.appendChild(cpBtn);body.appendChild(acts);
  wrap.appendChild(body);parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-appstory');if(el)el.textContent=t('tab');if(window.activeTab==='appstory')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='appstory'){window.activeTab='appstory';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-appstory');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
