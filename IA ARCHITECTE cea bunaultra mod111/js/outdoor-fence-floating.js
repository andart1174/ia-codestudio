/**
 * 🚧 Vinyl Fence Banner + 👟 Floating Product Web Banner
 */
(function(){
'use strict';

/* VINYL FENCE BANNER */
var FX={
  en:{tab:'Fence Banner',title:'🚧 Vinyl Fence Banner',sub:'Wide outdoor banner with metal grommets',
      headline:'Banner Text',hlP:'e.g. GRAND OPENING',subtext:'Subtext',subP:'e.g. Coming Soon This Summer',
      btn:'🚧 Generate Fence Banner',inject:'💉 Inject',copy:'📋 Copy HTML',color:'Brand Color'},
  fr:{tab:'Banderole',title:'🚧 Banderole Extérieure',sub:'Bannière large avec œillets métalliques',
      headline:'Texte',hlP:'ex. GRANDE OUVERTURE',subtext:'Sous-titre',subP:'ex. Prochainement cet été',
      btn:'🚧 Générer Banderole',inject:'💉 Injecter',copy:'📋 Copier HTML',color:'Couleur Marque'}
};
function gf(){return window.lang||'en';}
function tf(k){return(FX[gf()]||FX.en)[k]||k;}
var sf={headline:'GRAND OPENING',subtext:'COMING SOON THIS SUMMER',color:'#ef4444'};

function buildFenceHTML(d){
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Fence Banner</title><link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;900&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box;}body{background:#334155;background-image:radial-gradient(#475569 1px,transparent 1px);background-size:20px 20px;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:40px;overflow:hidden;}.banner{width:1200px;height:400px;background:'+d.color+';position:relative;box-shadow:0 30px 60px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.3);display:flex;justify-content:center;align-items:center;padding:40px;border-radius:5px;transform:rotate(1deg);}.grommet{position:absolute;width:24px;height:24px;background:#000;border:4px solid #cbd5e1;border-radius:50%;box-shadow:inset 0 2px 4px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.5);}.g-tl{top:20px;left:20px;}.g-tr{top:20px;right:20px;}.g-bl{bottom:20px;left:20px;}.g-br{bottom:20px;right:20px;}.g-tc{top:20px;left:50%;transform:translateX(-50%);}.g-bc{bottom:20px;left:50%;transform:translateX(-50%);}.zip-tie{position:absolute;width:4px;height:40px;background:#94a3b8;z-index:-1;box-shadow:2px 2px 5px rgba(0,0,0,0.5);}.z-tl{top:-20px;left:28px;transform:rotate(-30deg);}.z-tr{top:-20px;right:28px;transform:rotate(30deg);}.content{width:100%;height:100%;border:4px dashed rgba(255,255,255,0.3);display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;}h1{font-family:Anton,sans-serif;font-size:120px;line-height:1;color:#fff;text-transform:uppercase;text-shadow:0 10px 20px rgba(0,0,0,0.4);letter-spacing:5px;}p{font-family:Inter,sans-serif;font-size:32px;font-weight:900;color:#000;background:#fff;padding:10px 40px;margin-top:10px;text-transform:uppercase;box-shadow:0 10px 20px rgba(0,0,0,0.2);}</style></head><body><div class="banner"><div class="grommet g-tl"></div><div class="grommet g-tr"></div><div class="grommet g-bl"></div><div class="grommet g-br"></div><div class="grommet g-tc"></div><div class="grommet g-bc"></div><div class="zip-tie z-tl"></div><div class="zip-tie z-tr"></div><div class="content"><h1>'+d.headline+'</h1><p>'+d.subtext+'</p></div></div><script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script><script>function dlImg(){var btn=document.getElementById("dl-btn");btn.style.display="none";html2canvas(document.body,{scale:1.5,useCORS:true}).then(c=>{var a=document.createElement("a");a.download="Fence_Banner_HQ.png";a.href=c.toDataURL("image/png",1.0);a.click();btn.style.display="block";});}</script><button id="dl-btn" onclick="dlImg()" style="position:fixed;bottom:20px;right:20px;padding:12px 24px;background:#ef4444;color:#fff;border-radius:30px;cursor:pointer;font-weight:800;border:none;z-index:9999;box-shadow:0 10px 25px rgba(239,68,68,0.4);font-size:14px;">📸 Download HQ Photo</button></body></html>';
}

/* FLOATING PRODUCT */
var FLX={
  en:{tab:'Floating Prod',title:'👟 Floating Web Banner',sub:'E-commerce banner with floating product',
      headline:'Main Headline',hlP:'e.g. NEW ARRIVALS',subtext:'CTA Text',subP:'e.g. SHOP NOW',
      btn:'👟 Generate Web Banner',inject:'💉 Inject',copy:'📋 Copy HTML'},
  fr:{tab:'Produit Flottant',title:'👟 Bannière Web Flottante',sub:'Bannière e-commerce avec produit flottant',
      headline:'Titre Principal',hlP:'ex. NOUVEAUTÉS',subtext:'Texte Bouton',subP:'ex. ACHETER',
      btn:'👟 Générer Bannière Web',inject:'💉 Injecter',copy:'📋 Copier HTML'}
};
function gfl(){return window.lang||'en';}
function tfl(k){return(FLX[gfl()]||FLX.en)[k]||k;}
var sfl={headline:'NEW ARRIVALS',subtext:'SHOP NOW',color:'#3b82f6'};

function buildFloatingHTML(d){
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Floating Product</title><link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;800&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box;}body{background:#f1f5f9;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:40px;overflow:hidden;}.banner{width:1000px;height:500px;background:#fff;position:relative;overflow:hidden;box-shadow:0 30px 60px rgba(0,0,0,0.1);display:flex;border-radius:20px;}.bg-skew{position:absolute;top:0;right:0;width:60%;height:100%;background:'+d.color+';clip-path:polygon(20% 0, 100% 0, 100% 100%, 0% 100%);z-index:0;}.left{width:50%;padding:80px 60px;z-index:1;display:flex;flex-direction:column;justify-content:center;}h1{font-family:Anton,sans-serif;font-size:90px;line-height:0.9;color:#0f172a;text-transform:uppercase;margin-bottom:30px;letter-spacing:-1px;}p{font-family:Inter,sans-serif;font-size:24px;color:#64748b;margin-bottom:40px;}.cta{background:#0f172a;color:#fff;font-family:Inter,sans-serif;font-weight:800;font-size:18px;padding:15px 40px;border-radius:50px;display:inline-block;text-transform:uppercase;align-self:flex-start;}.right{width:50%;position:relative;z-index:1;display:flex;justify-content:center;align-items:center;}.prod{font-size:250px;filter:drop-shadow(-20px 20px 0px rgba(0,0,0,0.2));animation:float 3s ease-in-out infinite;}@keyframes float{0%,100%{transform:translateY(0) rotate(-10deg)}50%{transform:translateY(-20px) rotate(-5deg)}}</style></head><body><div class="banner"><div class="bg-skew"></div><div class="left"><h1>'+d.headline+'</h1><p>Discover the latest trends.</p><div class="cta">'+d.subtext+'</div></div><div class="right"><div class="prod">👟</div></div></div><script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script><script>function dlImg(){var btn=document.getElementById("dl-btn");btn.style.display="none";html2canvas(document.body,{scale:1.5,useCORS:true,backgroundColor:"transparent"}).then(c=>{var a=document.createElement("a");a.download="Web_Banner_HQ.png";a.href=c.toDataURL("image/png",1.0);a.click();btn.style.display="block";});}</script><button id="dl-btn" onclick="dlImg()" style="position:fixed;bottom:20px;right:20px;padding:12px 24px;background:#3b82f6;color:#fff;border-radius:30px;cursor:pointer;font-weight:800;border:none;z-index:9999;box-shadow:0 10px 25px rgba(59,130,246,0.4);font-size:14px;">📸 Download HQ Photo</button></body></html>';
}

function fi(k,lbl,ph,obj){var d=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;var i=document.createElement('input');i.id=k;i.placeholder=ph;i.value=obj[k.split('-')[1]]||'';i.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(239,68,68,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){obj[k.split('-')[1]]=this.value;};d.appendChild(l);d.appendChild(i);return d;}

function renderFenceBanner(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(239,68,68,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(239,68,68,0.1),rgba(248,113,113,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#ef4444;">'+tf('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tf('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  body.appendChild(fi('fb-headline',tf('headline'),tf('hlP'),sf));
  body.appendChild(fi('fb-subtext',tf('subtext'),tf('subP'),sf));

  var cx=document.createElement('div');cx.style='display:flex;align-items:center;gap:8px;';
  var cl=document.createElement('div');cl.style='font-size:9px;color:#94a3b8;font-weight:700;flex:1;';cl.textContent=tf('color');
  var ci=document.createElement('input');ci.type='color';ci.value=sf.color;ci.style='width:44px;height:30px;background:#0d1117;border:1px solid rgba(239,68,68,0.25);border-radius:6px;cursor:pointer;padding:2px;';ci.oninput=function(){sf.color=this.value;};
  cx.appendChild(cl);cx.appendChild(ci);body.appendChild(cx);

  var btn=document.createElement('button');btn.innerHTML=tf('btn');btn.style='width:100%;background:linear-gradient(135deg,#b91c1c,#ef4444);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:4px;box-shadow:0 4px 15px rgba(239,68,68,0.3);';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=tf('inject');ib.style='flex:1;background:rgba(255,255,255,.1);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=tf('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  
  var html='';
  btn.onclick=function(){html=buildFenceHTML(sf);ar.style.display='flex';res.innerHTML='<div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#f87171;">✅ Fence Banner Ready!</div>';if(window.showToast)window.showToast('🚧 Banner generated!');};
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 HTML Copied!');});};
}

function renderFloatingProd(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(59,130,246,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(59,130,246,0.1),rgba(96,165,250,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#3b82f6;">'+tfl('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tfl('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  var fli=function(k,lbl,ph,obj){var d=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;var i=document.createElement('input');i.id=k;i.placeholder=ph;i.value=obj[k.split('-')[1]]||'';i.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(59,130,246,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){obj[k.split('-')[1]]=this.value;};d.appendChild(l);d.appendChild(i);return d;};

  body.appendChild(fli('fl-headline',tfl('headline'),tfl('hlP'),sfl));
  body.appendChild(fli('fl-subtext',tfl('subtext'),tfl('subP'),sfl));

  var cx=document.createElement('div');cx.style='display:flex;align-items:center;gap:8px;';
  var cl=document.createElement('div');cl.style='font-size:9px;color:#94a3b8;font-weight:700;flex:1;';cl.textContent=tfl('color');
  var ci=document.createElement('input');ci.type='color';ci.value=sfl.color;ci.style='width:44px;height:30px;background:#0d1117;border:1px solid rgba(59,130,246,0.25);border-radius:6px;cursor:pointer;padding:2px;';ci.oninput=function(){sfl.color=this.value;};
  cx.appendChild(cl);cx.appendChild(ci);body.appendChild(cx);

  var btn=document.createElement('button');btn.innerHTML=tfl('btn');btn.style='width:100%;background:linear-gradient(135deg,#1d4ed8,#3b82f6);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:4px;box-shadow:0 4px 15px rgba(59,130,246,0.3);';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=tfl('inject');ib.style='flex:1;background:rgba(255,255,255,.1);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=tfl('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  
  var html='';
  btn.onclick=function(){html=buildFloatingHTML(sfl);ar.style.display='flex';res.innerHTML='<div style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#60a5fa;">✅ Web Banner Ready!</div>';if(window.showToast)window.showToast('👟 Banner generated!');};
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 HTML Copied!');});};
}

document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;window.renderTab=function(tab){
    if(tab==='fencebanner'){window.activeTab='fencebanner';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b1=document.getElementById('tab-fencebanner');if(b1)b1.classList.add('active');renderFenceBanner();return;}
    if(tab==='floatingprod'){window.activeTab='floatingprod';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b2=document.getElementById('tab-floatingprod');if(b2)b2.classList.add('active');renderFloatingProd();return;}
    if(typeof oRT==='function')oRT(tab);
  };
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var e1=document.getElementById('lbl-tab-fencebanner');if(e1)e1.textContent=tf('tab');var e2=document.getElementById('lbl-tab-floatingprod');if(e2)e2.textContent=tfl('tab');if(window.activeTab==='fencebanner')renderFenceBanner();if(window.activeTab==='floatingprod')renderFloatingProd();};
});
})();
