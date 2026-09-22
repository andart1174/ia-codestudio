/**
 * 💥 Smart Popup + 🃏 3D Flip Card — EN/FR
 */
(function(){
'use strict';

/* SMART POPUP */
var PX={
  en:{tab:'Smart Popup',title:'💥 Smart Popup Generator',sub:'Exit Intent · Scroll · Delay · Persuasion Score',
      headline:'Headline',hl:'e.g. Wait! Before you go...',sub2:'Subtext',st:'e.g. Get 20% OFF your first order',
      cta:'CTA',ct:'e.g. Claim Discount',dismiss:'Dismiss text',dm:'e.g. No thanks',
      trigger:'Trigger',color:'Color',btn:'💥 Generate',inject:'💉 Inject',copy:'📋 Copy',
      triggers:['Exit Intent','Scroll 50%','After 5s','On Click']},
  fr:{tab:'Popup Intelligent',title:'💥 Générateur Popup',sub:'Exit Intent · Scroll · Délai · Score Persuasion',
      headline:'Titre',hl:'ex. Attendez! Avant de partir...',sub2:'Sous-titre',st:'ex. -20% sur votre 1ère commande',
      cta:'CTA',ct:'ex. Obtenir la Réduction',dismiss:'Fermer',dm:'ex. Non merci',
      trigger:'Déclencheur',color:'Couleur',btn:'💥 Générer',inject:'💉 Injecter',copy:'📋 Copier',
      triggers:['Exit Intent','Scroll 50%','Après 5s','Au Clic']}
};
function glP(){return window.lang||'en';}
function tp(k){return(PX[glP()]||PX.en)[k]||k;}
var sp={headline:'Wait! Before you go...',sub:'Get 20% OFF your first order — today only!',cta:'Claim My Discount',dismiss:'No thanks',color:'#8b5cf6',trigger:'exit'};

function persuasionScore(hl,sub,cta){
  var txt=(hl+' '+sub+' '+cta).toLowerCase();
  var words=['off','discount','free','today','only','wait','before','exclusive','limited','now','claim','get','save','bonus','gift','special','hurry','last'];
  return Math.min(words.filter(function(w){return txt.includes(w);}).length*8,100);
}

function buildPopup(d){
  var triggerCode='';
  if(d.trigger==='exit'){triggerCode='document.addEventListener("mouseleave",function(e){if(e.clientY<=0&&!shown){show();shown=true;}});';}
  else if(d.trigger==='scroll'){triggerCode='window.addEventListener("scroll",function(){if(!shown&&window.scrollY/document.body.scrollHeight>.5){show();shown=true;}});';}
  else if(d.trigger==='delay'){triggerCode='setTimeout(function(){if(!shown){show();shown=true;}},5000);';}
  else{triggerCode='document.body.addEventListener("click",function(){if(!shown){show();shown=true;}});';}
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Popup Demo</title>'+
  '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet">'+
  '<style>*{margin:0;padding:0;box-sizing:border-box;font-family:Inter,sans-serif}body{background:#0f172a;color:#e2e8f0;display:flex;align-items:center;justify-content:center;min-height:100vh;flex-direction:column;gap:20px}'+
  '.page-content{text-align:center;color:#334155;max-width:500px;padding:40px}'+
  '.overlay{position:fixed;inset:0;background:rgba(0,0,0,.75);backdrop-filter:blur(4px);z-index:100;display:none;align-items:center;justify-content:center;animation:fadeIn .3s ease}'+
  '.overlay.show{display:flex}.popup{background:#0f172a;border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:40px;max-width:420px;width:90%;text-align:center;position:relative;animation:slideUp .4s cubic-bezier(.2,1.2,.4,1)}'+
  '@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes slideUp{from{transform:translateY(30px);opacity:0}to{transform:none;opacity:1}}'+
  '.close{position:absolute;top:14px;right:16px;background:rgba(255,255,255,.08);border:none;color:#94a3b8;width:28px;height:28px;border-radius:50%;cursor:pointer;font-size:14px}'+
  '.icon{font-size:48px;margin-bottom:16px}.popup-hl{font-size:24px;font-weight:900;color:#fff;margin-bottom:10px}'+
  '.popup-sub{font-size:14px;color:#94a3b8;line-height:1.6;margin-bottom:24px}'+
  '.popup-cta{background:'+d.color+';color:#fff;border:none;padding:14px 32px;border-radius:50px;font-size:15px;font-weight:900;cursor:pointer;width:100%;margin-bottom:10px;box-shadow:0 4px 20px '+d.color+'55;transition:.2s}'+
  '.popup-cta:hover{transform:scale(1.02)}.dismiss{font-size:12px;color:#475569;cursor:pointer;background:none;border:none;text-decoration:underline}'+
  '.badge{display:inline-block;background:'+d.color+'22;color:'+d.color+';font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px;margin-bottom:14px;border:1px solid '+d.color+'44}'+
  '</style></head><body>'+
  '<div class="page-content"><p style="font-size:18px;color:#64748b;">Scroll or move mouse to top to trigger popup</p><p style="color:#475569;margin-top:10px;font-size:14px;">Trigger: <strong style="color:#e2e8f0;">'+d.trigger+'</strong></p></div>'+
  '<div class="overlay" id="ov"><div class="popup"><button class="close" onclick="hide()">✕</button><div class="icon">🎁</div><div class="badge">Limited Offer</div><div class="popup-hl">'+d.headline+'</div><div class="popup-sub">'+d.sub+'</div><button class="popup-cta" onclick="window.open(\'#\')">'+d.cta+'</button><button class="dismiss" onclick="hide()">'+d.dismiss+'</button></div></div>'+
  '<script>var shown=false;function show(){document.getElementById("ov").classList.add("show");}function hide(){document.getElementById("ov").classList.remove("show");}'+triggerCode+'<\/script></body></html>';
}

function renderPopup(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(239,68,68,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(239,68,68,0.1),rgba(251,146,60,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#f87171;">'+tp('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tp('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';
  function fi(k,lbl,ph){var d=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;var i=document.createElement('input');i.id='pop-'+k;i.placeholder=ph;i.value=sp[k]||'';i.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(239,68,68,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){sp[k]=this.value;};d.appendChild(l);d.appendChild(i);return d;}
  body.appendChild(fi('headline',tp('headline'),tp('hl')));
  body.appendChild(fi('sub',tp('sub2'),tp('st')));
  body.appendChild(fi('cta',tp('cta'),tp('ct')));
  body.appendChild(fi('dismiss',tp('dismiss'),tp('dm')));
  var cr=document.createElement('div');cr.style='display:grid;grid-template-columns:1fr 1fr;gap:8px;';
  var cd=document.createElement('div');var clb=document.createElement('div');clb.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';clb.textContent=tp('color');var ci=document.createElement('input');ci.type='color';ci.id='pop-color';ci.value=sp.color;ci.style='width:100%;height:34px;border:1px solid rgba(239,68,68,0.25);border-radius:6px;cursor:pointer;padding:2px;background:#0d1117;';ci.oninput=function(){sp.color=this.value;};cd.appendChild(clb);cd.appendChild(ci);cr.appendChild(cd);body.appendChild(cr);
  var tl=document.createElement('div');tl.style='font-size:9px;color:#94a3b8;font-weight:700;';tl.textContent=tp('trigger');body.appendChild(tl);
  var tr=document.createElement('div');tr.style='display:flex;gap:4px;flex-wrap:wrap;';
  [['exit','🖱️ Exit'],['scroll','📜 Scroll'],['delay','⏱ Delay'],['click','👆 Click']].forEach(function(g){var b=document.createElement('button');b.innerHTML=g[1];b.dataset.tr=g[0];var on=sp.trigger===g[0];b.style='padding:5px 10px;border-radius:20px;font-size:9px;font-weight:700;cursor:pointer;border:1px solid rgba(239,68,68,'+(on?'0.8':'0.25')+');background:rgba(239,68,68,'+(on?'0.2':'0.05')+');color:'+(on?'#f87171':'#64748b')+';';b.onclick=function(){sp.trigger=g[0];document.querySelectorAll('[data-tr]').forEach(function(x){x.style.borderColor='rgba(239,68,68,0.25)';x.style.background='rgba(239,68,68,0.05)';x.style.color='#64748b';});this.style.borderColor='rgba(239,68,68,0.8)';this.style.background='rgba(239,68,68,0.2)';this.style.color='#f87171';};tr.appendChild(b);});
  body.appendChild(tr);
  var btn=document.createElement('button');btn.innerHTML=tp('btn');btn.style='width:100%;background:linear-gradient(135deg,#7f1d1d,#ef4444);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:2px;';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=tp('inject');ib.style='flex:1;background:linear-gradient(135deg,#064e3b,#10b981);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=tp('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  var html='';
  btn.onclick=function(){['headline','sub','cta','dismiss','color'].forEach(function(k){var el=document.getElementById('pop-'+k);if(el)sp[k]=el.value||sp[k];});html=buildPopup(sp);var sc=persuasionScore(sp.headline,sp.sub,sp.cta);var sc2=sc>=70?'#22c55e':sc>=40?'#f59e0b':'#ef4444';ar.style.display='flex';res.innerHTML='<div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;">✅ Popup ready · Persuasion Score: <span style="color:'+sc2+';font-weight:700;">'+sc+'/100</span></div>';if(window.showToast)window.showToast('💥 Popup generated!');};
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 Copied!');});};
}

/* 3D FLIP CARD */
var FX={
  en:{tab:'3D Flip Card',title:'🃏 3D Flip Card Builder',sub:'Hover to flip — front offer, back details + CTA',
      front_title:'Front Title',ftp:'e.g. Special Offer',front_price:'Price/Badge',fpp:'e.g. $29/mo',front_desc:'Front Tagline',fdp:'e.g. Everything you need to grow',
      back_title:'Back Title',btp:'e.g. What you get:',back_features:'Features (one per line)',bfp:'✅ Feature 1\n✅ Feature 2\n✅ Feature 3',
      back_cta:'CTA Button',bcp:'e.g. Get Started Now',color:'Accent Color',
      btn:'🃏 Generate Card',inject:'💉 Inject',copy:'📋 Copy'},
  fr:{tab:'Carte 3D',title:'🃏 Créateur Carte 3D',sub:'Survol pour retourner — offre recto, détails verso',
      front_title:'Titre Recto',ftp:'ex. Offre Spéciale',front_price:'Prix/Badge',fpp:'ex. 29€/mois',front_desc:'Accroche',fdp:'ex. Tout ce qu\'il vous faut',
      back_title:'Titre Verso',btp:'ex. Ce que vous obtenez:',back_features:'Fonctionnalités (une par ligne)',bfp:'✅ Fonction 1\n✅ Fonction 2\n✅ Fonction 3',
      back_cta:'Bouton CTA',bcp:'ex. Commencer Maintenant',color:'Couleur',
      btn:'🃏 Générer la Carte',inject:'💉 Injecter',copy:'📋 Copier'}
};
function glF(){return window.lang||'en';}
function tf(k){return(FX[glF()]||FX.en)[k]||k;}
var fc={front_title:'Special Offer',front_price:'$29/mo',front_desc:'Everything you need to grow',back_title:'What you get:',back_features:'✅ Unlimited projects\n✅ AI-powered tools\n✅ Priority support\n✅ Analytics dashboard',back_cta:'Get Started Now',color:'#6366f1'};

function buildFlipCard(d){
  var feats=d.back_features.split('\n').filter(Boolean).map(function(f){return'<div style="font-size:13px;color:#e2e8f0;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.06);">'+f+'</div>';}).join('');
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Flip Card</title>'+
  '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet">'+
  '<style>*{margin:0;padding:0;box-sizing:border-box;font-family:Inter,sans-serif}body{background:#050810;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;gap:20px}'+
  '.hint{font-size:12px;color:#334155;}'+
  '.card-scene{width:320px;height:420px;perspective:1000px;}'+
  '.card{width:100%;height:100%;position:relative;transform-style:preserve-3d;transition:transform .7s cubic-bezier(.4,0,.2,1);cursor:pointer;}'+
  '.card:hover,.card.flipped{transform:rotateY(180deg);}'+
  '.face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:20px;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:32px;text-align:center;}'+
  '.front{background:linear-gradient(145deg,'+d.color+'33,'+d.color+'11);border:1px solid '+d.color+'44;box-shadow:0 20px 60px rgba(0,0,0,.5);}'+
  '.back{background:linear-gradient(145deg,#0f172a,#1e293b);border:1px solid rgba(255,255,255,.08);transform:rotateY(180deg);box-shadow:0 20px 60px rgba(0,0,0,.5);}'+
  '.icon{font-size:48px;margin-bottom:16px}.badge{background:'+d.color+';color:#fff;font-size:18px;font-weight:900;padding:8px 20px;border-radius:50px;margin:10px 0;display:inline-block;}'+
  '.front-title{font-size:24px;font-weight:900;color:#fff;margin-bottom:8px;}'+
  '.front-desc{font-size:13px;color:rgba(255,255,255,.6);margin-top:10px;}'+
  '.back-title{font-size:16px;font-weight:900;color:#fff;margin-bottom:14px;width:100%;text-align:left;}'+
  '.feats{width:100%;margin-bottom:16px;}'+
  '.cta{background:'+d.color+';color:#fff;border:none;padding:12px 28px;border-radius:50px;font-size:14px;font-weight:700;cursor:pointer;width:100%;transition:.2s;box-shadow:0 4px 15px '+d.color+'55;}'+
  '.cta:hover{transform:scale(1.03);}'+
  '</style></head><body>'+
  '<p class="hint">🖱️ Hover over the card to flip it</p>'+
  '<div class="card-scene" onclick="this.querySelector(\'.card\').classList.toggle(\'flipped\')">'+
  '<div class="card">'+
  '<div class="face front"><div class="icon">⭐</div><div class="front-title">'+d.front_title+'</div><div class="badge">'+d.front_price+'</div><div class="front-desc">'+d.front_desc+'</div></div>'+
  '<div class="face back"><div class="back-title">'+d.back_title+'</div><div class="feats">'+feats+'</div><button class="cta" onclick="event.stopPropagation();window.open(\'#\')">'+d.back_cta+'</button></div>'+
  '</div></div>'+
  '</body></html>';
}

function renderFlip(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(99,102,241,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(99,102,241,0.12),rgba(139,92,246,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#818cf8;">'+tf('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tf('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';
  function fi(k,lbl,ph,area){var d=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;var i=area?document.createElement('textarea'):document.createElement('input');i.id='fc-'+k;i.placeholder=ph;if(area){i.rows=4;i.style='resize:none;';}i.value=fc[k]||'';i.style=(i.style.cssText||'')+'width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(99,102,241,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){fc[k]=this.value;};d.appendChild(l);d.appendChild(i);return d;}
  body.appendChild(fi('front_title',tf('front_title'),tf('ftp')));
  body.appendChild(fi('front_price',tf('front_price'),tf('fpp')));
  body.appendChild(fi('front_desc',tf('front_desc'),tf('fdp')));
  body.appendChild(fi('back_title',tf('back_title'),tf('btp')));
  body.appendChild(fi('back_features',tf('back_features'),tf('bfp'),true));
  body.appendChild(fi('back_cta',tf('back_cta'),tf('bcp')));
  var cr=document.createElement('div');cr.style='display:flex;align-items:center;gap:8px;';var cl2=document.createElement('div');cl2.style='font-size:9px;color:#94a3b8;font-weight:700;flex:1;';cl2.textContent=tf('color');var ci2=document.createElement('input');ci2.type='color';ci2.id='fc-color';ci2.value=fc.color;ci2.style='width:44px;height:30px;background:#0d1117;border:1px solid rgba(99,102,241,0.25);border-radius:6px;cursor:pointer;padding:2px;';ci2.oninput=function(){fc.color=this.value;};cr.appendChild(cl2);cr.appendChild(ci2);body.appendChild(cr);
  var btn=document.createElement('button');btn.innerHTML=tf('btn');btn.style='width:100%;background:linear-gradient(135deg,#1e1b4b,#6366f1);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(99,102,241,0.35);';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=tf('inject');ib.style='flex:1;background:linear-gradient(135deg,#064e3b,#10b981);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=tf('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  var html='';
  btn.onclick=function(){Object.keys(fc).forEach(function(k){var el=document.getElementById('fc-'+k);if(el)fc[k]=el.value||fc[k];});fc.color=(document.getElementById('fc-color')||{}).value||fc.color;html=buildFlipCard(fc);ar.style.display='flex';res.innerHTML='<div style="background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#818cf8;">✅ 3D Flip Card ready — hover to flip!</div>';if(window.showToast)window.showToast('🃏 Flip Card generated!');};
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 Copied!');});};
}

document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;
  window.renderTab=function(tab){
    if(tab==='smartpopup'){window.activeTab='smartpopup';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b=document.getElementById('tab-smartpopup');if(b)b.classList.add('active');renderPopup();return;}
    if(tab==='flipcard'){window.activeTab='flipcard';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b2=document.getElementById('tab-flipcard');if(b2)b2.classList.add('active');renderFlip();return;}
    if(typeof oRT==='function')oRT(tab);
  };
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var e1=document.getElementById('lbl-tab-smartpopup');if(e1)e1.textContent=tp('tab');var e2=document.getElementById('lbl-tab-flipcard');if(e2)e2.textContent=tf('tab');if(window.activeTab==='smartpopup')renderPopup();if(window.activeTab==='flipcard')renderFlip();};
});
})();
