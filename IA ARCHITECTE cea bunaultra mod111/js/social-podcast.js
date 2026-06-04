/**
 * ⭐ Social Proof Card + 🎙️ Podcast Cover Art
 */
(function(){
'use strict';

/* SOCIAL PROOF CARD */
var SX={
  en:{tab:'Social Proof',title:'⭐ Social Proof Card',sub:'Generate beautiful 3D/Glassmorphism review cards',
      headline:'User Name',hlP:'e.g. Sarah Jenkins',subtext:'Review Text',subP:'e.g. This product completely changed my workflow!',
      btn:'⭐ Generate Card',inject:'💉 Inject',copy:'📋 Copy HTML',color:'Brand Color'},
  fr:{tab:'Preuve Sociale',title:'⭐ Carte Avis Client',sub:'Générez de magnifiques cartes d\'avis 3D/Glassmorphism',
      headline:'Nom Client',hlP:'ex. Marie Dubois',subtext:'Texte',subP:'ex. Ce produit a changé ma vie !',
      btn:'⭐ Générer Carte',inject:'💉 Injecter',copy:'📋 Copier HTML',color:'Couleur Marque'}
};
function gs(){return window.lang||'en';}
function ts(k){return(SX[gs()]||SX.en)[k]||k;}
var ss={headline:'Sarah Jenkins',subtext:'"This product completely changed my workflow! I am saving 10 hours a week and my team loves it. Highly recommended!"',color:'#eab308'};

function buildSocialProofHTML(d){
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Social Proof</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box;}body{background:#0f172a;display:flex;justify-content:center;align-items:center;min-height:100vh;font-family:Inter,sans-serif;overflow:hidden;}.bg-blob{position:absolute;width:600px;height:600px;background:'+d.color+';border-radius:50%;filter:blur(120px);opacity:0.3;z-index:0;}.card{width:600px;background:rgba(255,255,255,0.05);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.1);border-radius:30px;padding:50px;position:relative;z-index:1;box-shadow:0 30px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1);}.stars{color:'+d.color+';font-size:32px;margin-bottom:20px;letter-spacing:5px;}p{font-size:26px;color:#f8fafc;line-height:1.5;font-weight:400;margin-bottom:40px;font-style:italic;}.user{display:flex;align-items:center;gap:20px;}.avatar{width:80px;height:80px;border-radius:50%;background:'+d.color+';display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:900;color:#000;}.name{font-size:24px;color:#fff;font-weight:700;}.verified{color:#94a3b8;font-size:16px;display:flex;align-items:center;gap:5px;margin-top:5px;}.icon-v{color:#10b981;}</style></head><body><div class="bg-blob"></div><div class="card"><div class="stars">★★★★★</div><p>'+d.subtext+'</p><div class="user"><div class="avatar">'+d.headline.charAt(0)+'</div><div><div class="name">'+d.headline+'</div><div class="verified"><span class="icon-v">✔</span> Verified Buyer</div></div></div></div><script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script><script>function dlImg(){var btn=document.getElementById("dl-btn");btn.style.display="none";html2canvas(document.body,{scale:3,useCORS:true,backgroundColor:"#0f172a"}).then(c=>{var a=document.createElement("a");a.download="Social_Proof_HQ.png";a.href=c.toDataURL("image/png",1.0);a.click();btn.style.display="block";});}</script><button id="dl-btn" onclick="dlImg()" style="position:fixed;bottom:20px;right:20px;padding:12px 24px;background:'+d.color+';color:#000;border-radius:30px;cursor:pointer;font-weight:800;border:none;z-index:9999;box-shadow:0 10px 25px rgba(0,0,0,0.5);font-size:14px;">📸 Download HQ Photo</button></body></html>';
}

/* PODCAST COVER ART */
var PX={
  en:{tab:'Podcast Art',title:'🎙️ Podcast Cover',sub:'1080x1080px square podcast cover art generator',
      headline:'Podcast Name',hlP:'e.g. THE DEVELOPER MINDSET',subtext:'Host Name',subP:'e.g. Hosted by John Doe',
      btn:'🎙️ Generate Cover',inject:'💉 Inject',copy:'📋 Copy HTML'},
  fr:{tab:'Cover Podcast',title:'🎙️ Cover de Podcast',sub:'Générateur de cover podcast carré 1080x1080px',
      headline:'Nom du Podcast',hlP:'ex. LE MINDSET DU DÉV',subtext:'Hôte',subP:'ex. Présenté par Jean',
      btn:'🎙️ Générer Cover',inject:'💉 Injecter',copy:'📋 Copier HTML'}
};
function gp(){return window.lang||'en';}
function tp(k){return(PX[gp()]||PX.en)[k]||k;}
var sp={headline:'THE DEVELOPER MINDSET',subtext:'HOSTED BY JOHN DOE',color:'#14b8a6'};

function buildPodcastHTML(d){
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Podcast Cover</title><link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;700&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box;}body{background:#000;display:flex;justify-content:center;align-items:center;min-height:100vh;}.cover{width:1080px;height:1080px;background:linear-gradient(45deg,#050810,'+d.color+');position:relative;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.8);display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:100px;border:20px solid #fff;}.ring{position:absolute;width:900px;height:900px;border:30px solid rgba(255,255,255,0.1);border-radius:50%;z-index:0;}.ring2{position:absolute;width:700px;height:700px;border:2px dashed rgba(255,255,255,0.3);border-radius:50%;z-index:0;animation:spin 60s linear infinite;}@keyframes spin{100%{transform:rotate(360deg)}}.content{z-index:1;}h1{font-family:Anton,sans-serif;font-size:150px;line-height:0.9;color:#fff;text-transform:uppercase;margin-bottom:40px;text-shadow:0 10px 30px rgba(0,0,0,0.5);}.host{font-family:Inter,sans-serif;font-size:36px;font-weight:700;color:#000;background:#fff;display:inline-block;padding:15px 40px;border-radius:50px;letter-spacing:2px;}.mic{font-size:120px;margin-bottom:30px;filter:drop-shadow(0 10px 20px rgba(0,0,0,0.5));}.tag{position:absolute;top:50px;left:50px;background:#000;color:#fff;font-family:Inter;font-weight:700;padding:10px 20px;font-size:24px;border-radius:10px;text-transform:uppercase;letter-spacing:2px;}</style></head><body><div class="cover"><div class="tag">NEW EPISODES</div><div class="ring"></div><div class="ring2"></div><div class="content"><div class="mic">🎙️</div><h1>'+d.headline+'</h1><div class="host">'+d.subtext+'</div></div></div><script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script><script>function dlImg(){var btn=document.getElementById("dl-btn");btn.style.display="none";html2canvas(document.querySelector(".cover"),{scale:2,useCORS:true}).then(c=>{var a=document.createElement("a");a.download="Podcast_Cover_HQ.png";a.href=c.toDataURL("image/png",1.0);a.click();btn.style.display="block";});}</script><button id="dl-btn" onclick="dlImg()" style="position:fixed;bottom:20px;right:20px;padding:12px 24px;background:#14b8a6;color:#fff;border-radius:30px;cursor:pointer;font-weight:800;border:none;z-index:9999;box-shadow:0 10px 25px rgba(20,184,166,0.3);font-size:14px;">📸 Download HQ Photo</button></body></html>';
}

function fi(k,lbl,ph,area,obj){var d=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;var i=area?document.createElement('textarea'):document.createElement('input');i.id=k;i.placeholder=ph;if(area){i.rows=3;i.style='resize:none;';}i.value=obj[k.split('-')[1]]||'';i.style=(i.style.cssText||'')+'width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(234,179,8,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){obj[k.split('-')[1]]=this.value;};d.appendChild(l);d.appendChild(i);return d;}

function renderSocialProof(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(234,179,8,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(234,179,8,0.1),rgba(250,204,21,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#eab308;">'+ts('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+ts('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  body.appendChild(fi('sp-headline',ts('headline'),ts('hlP'),false,ss));
  body.appendChild(fi('sp-subtext',ts('subtext'),ts('subP'),true,ss));

  var cx=document.createElement('div');cx.style='display:flex;align-items:center;gap:8px;';
  var cl=document.createElement('div');cl.style='font-size:9px;color:#94a3b8;font-weight:700;flex:1;';cl.textContent=ts('color');
  var ci=document.createElement('input');ci.type='color';ci.value=ss.color;ci.style='width:44px;height:30px;background:#0d1117;border:1px solid rgba(234,179,8,0.25);border-radius:6px;cursor:pointer;padding:2px;';ci.oninput=function(){ss.color=this.value;};
  cx.appendChild(cl);cx.appendChild(ci);body.appendChild(cx);

  var btn=document.createElement('button');btn.innerHTML=ts('btn');btn.style='width:100%;background:linear-gradient(135deg,#ca8a04,#eab308);color:#000;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:4px;box-shadow:0 4px 15px rgba(234,179,8,0.3);';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=ts('inject');ib.style='flex:1;background:rgba(255,255,255,.1);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=ts('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  
  var html='';
  btn.onclick=function(){html=buildSocialProofHTML(ss);ar.style.display='flex';res.innerHTML='<div style="background:rgba(234,179,8,0.08);border:1px solid rgba(234,179,8,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#facc15;">✅ Social Proof Card Ready!</div>';if(window.showToast)window.showToast('⭐ Card generated!');};
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 HTML Copied!');});};
}

function renderPodcast(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(20,184,166,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(20,184,166,0.1),rgba(45,212,191,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#14b8a6;">'+tp('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tp('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  body.appendChild(fi('pc-headline',tp('headline'),tp('hlP'),false,sp));
  body.appendChild(fi('pc-subtext',tp('subtext'),tp('subP'),false,sp));

  var cx=document.createElement('div');cx.style='display:flex;align-items:center;gap:8px;';
  var cl=document.createElement('div');cl.style='font-size:9px;color:#94a3b8;font-weight:700;flex:1;';cl.textContent=ts('color');
  var ci=document.createElement('input');ci.type='color';ci.value=sp.color;ci.style='width:44px;height:30px;background:#0d1117;border:1px solid rgba(20,184,166,0.25);border-radius:6px;cursor:pointer;padding:2px;';ci.oninput=function(){sp.color=this.value;};
  cx.appendChild(cl);cx.appendChild(ci);body.appendChild(cx);

  var btn=document.createElement('button');btn.innerHTML=tp('btn');btn.style='width:100%;background:linear-gradient(135deg,#0f766e,#14b8a6);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:4px;box-shadow:0 4px 15px rgba(20,184,166,0.3);';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=tp('inject');ib.style='flex:1;background:rgba(255,255,255,.1);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=tp('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  
  var html='';
  btn.onclick=function(){html=buildPodcastHTML(sp);ar.style.display='flex';res.innerHTML='<div style="background:rgba(20,184,166,0.08);border:1px solid rgba(20,184,166,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#2dd4bf;">✅ Podcast Cover Ready!</div>';if(window.showToast)window.showToast('🎙️ Cover generated!');};
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 HTML Copied!');});};
}

document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;window.renderTab=function(tab){
    if(tab==='socialproof'){window.activeTab='socialproof';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b1=document.getElementById('tab-socialproof');if(b1)b1.classList.add('active');renderSocialProof();return;}
    if(tab==='podcast'){window.activeTab='podcast';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b2=document.getElementById('tab-podcast');if(b2)b2.classList.add('active');renderPodcast();return;}
    if(typeof oRT==='function')oRT(tab);
  };
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var e1=document.getElementById('lbl-tab-socialproof');if(e1)e1.textContent=ts('tab');var e2=document.getElementById('lbl-tab-podcast');if(e2)e2.textContent=tp('tab');if(window.activeTab==='socialproof')renderSocialProof();if(window.activeTab==='podcast')renderPodcast();};
});
})();
