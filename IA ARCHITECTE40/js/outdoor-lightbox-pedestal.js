/**
 * 🏬 Storefront Lightbox + 🧊 3D Pedestal
 */
(function(){
'use strict';

/* STOREFRONT LIGHTBOX */
var LX={
  en:{tab:'Lightbox',title:'🏬 Glowing Lightbox',sub:'Backlit mall storefront poster mockup',
      headline:'Brand Name',hlP:'e.g. LUXURY PERFUME',subtext:'Subtext',subP:'e.g. The new fragrance',
      btn:'🏬 Generate Lightbox',inject:'💉 Inject',copy:'📋 Copy HTML',color:'Brand Color'},
  fr:{tab:'Caisson',title:'🏬 Caisson Lumineux',sub:'Maquette de vitrine éclairée',
      headline:'Marque',hlP:'ex. PARFUM DE LUXE',subtext:'Sous-titre',subP:'ex. La nouvelle fragrance',
      btn:'🏬 Générer Caisson',inject:'💉 Injecter',copy:'📋 Copier HTML',color:'Couleur Marque'}
};
function gl(){return window.lang||'en';}
function tl(k){return(LX[gl()]||LX.en)[k]||k;}
var sl={headline:'LUXURY PERFUME',subtext:'THE NEW FRAGRANCE',color:'#c084fc'};

function buildLightboxHTML(d){
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Storefront Lightbox</title><link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Inter:wght@400&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box;}body{background:#0a0a0a;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:40px;overflow:hidden;}.wall{position:absolute;width:100%;height:100%;background:radial-gradient(circle at 50% 50%, #1a1a1a, #000);z-index:0;}.frame{width:600px;height:800px;background:#000;border:10px solid #262626;border-radius:10px;position:relative;z-index:1;padding:5px;box-shadow:0 30px 60px rgba(0,0,0,0.8);}.poster{width:100%;height:100%;background:linear-gradient(135deg,'+d.color+',#000);border-radius:5px;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px;box-shadow:inset 0 0 100px rgba(255,255,255,0.2), 0 0 50px '+d.color+'80;overflow:hidden;}.poster::before{content:"";position:absolute;top:0;left:-100%;width:50%;height:100%;background:linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);transform:skewX(-20deg);animation:shine 5s infinite;}@keyframes shine{0%{left:-100%}20%,100%{left:200%}}h1{font-family:Cinzel,serif;font-size:60px;color:#fff;text-shadow:0 0 20px rgba(255,255,255,0.5);margin-bottom:20px;letter-spacing:5px;}p{font-family:Inter,sans-serif;font-size:20px;color:#fff;letter-spacing:10px;text-transform:uppercase;opacity:0.8;}.prod{font-size:200px;margin-bottom:40px;filter:drop-shadow(0 20px 30px rgba(0,0,0,0.8));}</style></head><body><div class="wall"></div><div class="frame"><div class="poster"><div class="prod">🧴</div><h1>'+d.headline+'</h1><p>'+d.subtext+'</p></div></div><script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script><script>function dlImg(){var btn=document.getElementById("dl-btn");btn.style.display="none";html2canvas(document.body,{scale:2,useCORS:true,backgroundColor:"#0a0a0a"}).then(c=>{var a=document.createElement("a");a.download="Lightbox_HQ.png";a.href=c.toDataURL("image/png",1.0);a.click();btn.style.display="block";});}</script><button id="dl-btn" onclick="dlImg()" style="position:fixed;bottom:20px;right:20px;padding:12px 24px;background:#c084fc;color:#fff;border-radius:30px;cursor:pointer;font-weight:800;border:none;z-index:9999;box-shadow:0 10px 25px rgba(192,132,252,0.4);font-size:14px;">📸 Download HQ Photo</button></body></html>';
}

/* 3D PEDESTAL */
var PX={
  en:{tab:'Pedestal',title:'🧊 3D Pedestal Showcase',sub:'Apple-style premium floating product display',
      headline:'Product Name',hlP:'e.g. PRO HEADPHONES',subtext:'Subtext',subP:'e.g. Immerse yourself.',
      btn:'🧊 Generate 3D Showcase',inject:'💉 Inject',copy:'📋 Copy HTML'},
  fr:{tab:'Piédestal',title:'🧊 Présentoir 3D',sub:'Présentoir de produit flottant premium style Apple',
      headline:'Nom Produit',hlP:'ex. CASQUE PRO',subtext:'Sous-titre',subP:'ex. Immergez-vous.',
      btn:'🧊 Générer Présentoir',inject:'💉 Injecter',copy:'📋 Copier HTML'}
};
function gp(){return window.lang||'en';}
function tp(k){return(PX[gp()]||PX.en)[k]||k;}
var sp={headline:'PRO HEADPHONES',subtext:'Immerse yourself.',color:'#a8a29e'};

function buildPedestalHTML(d){
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>3D Pedestal</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;600&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box;}body{background:#f8fafc;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:40px;overflow:hidden;font-family:Inter,sans-serif;}.scene{width:1000px;height:800px;background:radial-gradient(circle at 50% 30%, #fff, #e2e8f0);position:relative;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding-bottom:150px;box-shadow:0 30px 60px rgba(0,0,0,0.05);}.pedestal{position:relative;width:400px;height:150px;}.ped-top{position:absolute;top:0;width:100%;height:100px;background:'+d.color+';border-radius:50%;z-index:2;box-shadow:inset 0 10px 20px rgba(255,255,255,0.5), inset 0 -5px 15px rgba(0,0,0,0.2);}.ped-body{position:absolute;top:50px;width:100%;height:100px;background:linear-gradient(to right, rgba(0,0,0,0.2), transparent, rgba(0,0,0,0.3));background-color:'+d.color+';border-bottom-left-radius:50% 50px;border-bottom-right-radius:50% 50px;z-index:1;box-shadow:0 30px 50px rgba(0,0,0,0.2);}.prod{position:absolute;bottom:200px;font-size:250px;z-index:3;filter:drop-shadow(0 40px 20px rgba(0,0,0,0.3));animation:levitate 4s ease-in-out infinite;}@keyframes levitate{0%,100%{transform:translateY(0)}50%{transform:translateY(-30px)}}.text-wrap{position:absolute;top:100px;text-align:center;z-index:4;}h1{font-weight:600;font-size:50px;color:#0f172a;letter-spacing:10px;text-transform:uppercase;}p{font-weight:300;font-size:24px;color:#64748b;margin-top:10px;}</style></head><body><div class="scene"><div class="text-wrap"><h1>'+d.headline+'</h1><p>'+d.subtext+'</p></div><div class="prod">🎧</div><div class="pedestal"><div class="ped-top"></div><div class="ped-body"></div></div></div><script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script><script>function dlImg(){var btn=document.getElementById("dl-btn");btn.style.display="none";html2canvas(document.querySelector(".scene"),{scale:1.5,useCORS:true}).then(c=>{var a=document.createElement("a");a.download="Pedestal_3D_HQ.png";a.href=c.toDataURL("image/png",1.0);a.click();btn.style.display="block";});}</script><button id="dl-btn" onclick="dlImg()" style="position:fixed;bottom:20px;right:20px;padding:12px 24px;background:#0f172a;color:#fff;border-radius:30px;cursor:pointer;font-weight:800;border:none;z-index:9999;box-shadow:0 10px 25px rgba(15,23,42,0.3);font-size:14px;">📸 Download HQ Photo</button></body></html>';
}

function fi(k,lbl,ph,obj){var d=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;var i=document.createElement('input');i.id=k;i.placeholder=ph;i.value=obj[k.split('-')[1]]||'';i.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(168,162,158,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){obj[k.split('-')[1]]=this.value;};d.appendChild(l);d.appendChild(i);return d;}

function renderLightbox(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(192,132,252,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(192,132,252,0.1),rgba(216,180,254,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#c084fc;">'+tl('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tl('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  var lbi=function(k,lbl,ph,obj){var d=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;var i=document.createElement('input');i.id=k;i.placeholder=ph;i.value=obj[k.split('-')[1]]||'';i.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(192,132,252,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){obj[k.split('-')[1]]=this.value;};d.appendChild(l);d.appendChild(i);return d;};

  body.appendChild(lbi('lb-headline',tl('headline'),tl('hlP'),sl));
  body.appendChild(lbi('lb-subtext',tl('subtext'),tl('subP'),sl));

  var cx=document.createElement('div');cx.style='display:flex;align-items:center;gap:8px;';
  var cl=document.createElement('div');cl.style='font-size:9px;color:#94a3b8;font-weight:700;flex:1;';cl.textContent=tl('color');
  var ci=document.createElement('input');ci.type='color';ci.value=sl.color;ci.style='width:44px;height:30px;background:#0d1117;border:1px solid rgba(192,132,252,0.25);border-radius:6px;cursor:pointer;padding:2px;';ci.oninput=function(){sl.color=this.value;};
  cx.appendChild(cl);cx.appendChild(ci);body.appendChild(cx);

  var btn=document.createElement('button');btn.innerHTML=tl('btn');btn.style='width:100%;background:linear-gradient(135deg,#9333ea,#c084fc);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:4px;box-shadow:0 4px 15px rgba(192,132,252,0.3);';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=tl('inject');ib.style='flex:1;background:rgba(255,255,255,.1);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=tl('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  
  var html='';
  btn.onclick=function(){html=buildLightboxHTML(sl);ar.style.display='flex';res.innerHTML='<div style="background:rgba(192,132,252,0.08);border:1px solid rgba(192,132,252,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#d8b4fe;">✅ Lightbox Ready!</div>';if(window.showToast)window.showToast('🏬 Lightbox generated!');};
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 HTML Copied!');});};
}

function renderPedestal(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(168,162,158,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(168,162,158,0.1),rgba(214,211,209,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#a8a29e;">'+tp('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tp('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  body.appendChild(fi('pd-headline',tp('headline'),tp('hlP'),sp));
  body.appendChild(fi('pd-subtext',tp('subtext'),tp('subP'),sp));

  var cx=document.createElement('div');cx.style='display:flex;align-items:center;gap:8px;';
  var cl=document.createElement('div');cl.style='font-size:9px;color:#94a3b8;font-weight:700;flex:1;';cl.textContent=tp('color');
  var ci=document.createElement('input');ci.type='color';ci.value=sp.color;ci.style='width:44px;height:30px;background:#0d1117;border:1px solid rgba(168,162,158,0.25);border-radius:6px;cursor:pointer;padding:2px;';ci.oninput=function(){sp.color=this.value;};
  cx.appendChild(cl);cx.appendChild(ci);body.appendChild(cx);

  var btn=document.createElement('button');btn.innerHTML=tp('btn');btn.style='width:100%;background:linear-gradient(135deg,#78716c,#a8a29e);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:4px;box-shadow:0 4px 15px rgba(168,162,158,0.3);';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=tp('inject');ib.style='flex:1;background:rgba(255,255,255,.1);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=tp('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  
  var html='';
  btn.onclick=function(){html=buildPedestalHTML(sp);ar.style.display='flex';res.innerHTML='<div style="background:rgba(168,162,158,0.08);border:1px solid rgba(168,162,158,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#d6d3d1;">✅ Pedestal Ready!</div>';if(window.showToast)window.showToast('🧊 3D Showcase generated!');};
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 HTML Copied!');});};
}

document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;window.renderTab=function(tab){
    if(tab==='lightbox'){window.activeTab='lightbox';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b1=document.getElementById('tab-lightbox');if(b1)b1.classList.add('active');renderLightbox();return;}
    if(tab==='pedestal'){window.activeTab='pedestal';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b2=document.getElementById('tab-pedestal');if(b2)b2.classList.add('active');renderPedestal();return;}
    if(typeof oRT==='function')oRT(tab);
  };
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var e1=document.getElementById('lbl-tab-lightbox');if(e1)e1.textContent=tl('tab');var e2=document.getElementById('lbl-tab-pedestal');if(e2)e2.textContent=tp('tab');if(window.activeTab==='lightbox')renderLightbox();if(window.activeTab==='pedestal')renderPedestal();};
});
})();
