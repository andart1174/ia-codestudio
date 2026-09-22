/**
 * 📄 Print Flyer Studio + 🌆 DOOH Simulator
 */
(function(){
'use strict';

/* PRINT FLYER STUDIO */
var FX={
  en:{tab:'Print Flyer',title:'📄 Print Flyer Studio',sub:'A4/Letter CSS @media print flyer generator',
      headline:'Headline',hlP:'e.g. GRAND OPENING',subtext:'Subtext',subP:'e.g. Join us this Saturday for a huge event!',
      details:'Details (Time/Location)',dtP:'e.g. 10 AM | Main Street',
      btn:'📄 Generate Flyer',inject:'💉 Inject',copy:'📋 Copy HTML',color:'Brand Color'},
  fr:{tab:'Flyer Print',title:'📄 Créateur Flyer A4',sub:'Générateur flyer CSS @media print A4/Lettre',
      headline:'Gros Titre',hlP:'ex. GRANDE OUVERTURE',subtext:'Sous-titre',subP:'ex. Rejoignez-nous ce samedi!',
      details:'Détails (Lieu/Heure)',dtP:'ex. 10h | Rue Principale',
      btn:'📄 Générer Flyer',inject:'💉 Injecter',copy:'📋 Copier HTML',color:'Couleur Marque'}
};
function gf(){return window.lang||'en';}
function tf(k){return(FX[gf()]||FX.en)[k]||k;}
var sf={headline:'GRAND OPENING',subtext:'Join us this Saturday for exclusive deals and a huge event.',details:'Saturday, 10:00 AM • 123 Main Street',color:'#dc2626'};

function buildFlyerHTML(d){
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Print Flyer</title><link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;600;800&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box;}body{background:#e2e8f0;display:flex;justify-content:center;padding:40px;font-family:Inter,sans-serif;}.flyer{width:210mm;height:297mm;background:#fff;position:relative;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.2);display:flex;flex-direction:column;align-items:center;}.header{width:100%;height:30%;background:'+d.color+';clip-path:polygon(0 0,100% 0,100% 80%,0 100%);display:flex;align-items:center;justify-content:center;padding:20px;}.logo-ph{width:100px;height:100px;border-radius:50%;background:#fff;border:5px solid '+d.color+';position:absolute;top:25%;margin-top:-50px;box-shadow:0 10px 20px rgba(0,0,0,0.2);display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:900;color:'+d.color+';}.content{flex:1;padding:80px 40px 40px 40px;text-align:center;width:100%;display:flex;flex-direction:column;align-items:center;}h1{font-family:Anton,sans-serif;font-size:80px;line-height:1;color:#0f172a;text-transform:uppercase;margin-bottom:20px;}p{font-size:24px;color:#475569;margin-bottom:auto;max-width:80%;}.details{background:#0f172a;color:#fff;width:100%;padding:30px;border-radius:20px;font-size:22px;font-weight:700;margin-bottom:40px;}.footer{width:100%;background:'+d.color+';padding:20px;text-align:center;color:#fff;font-size:18px;font-weight:600;}@media print{@page{size:A4;margin:0;}body{padding:0;background:#fff;}.flyer{box-shadow:none;width:100%;height:100%;}}</style></head><body><div class="flyer"><div class="header"></div><div class="logo-ph">LOGO</div><div class="content"><h1>'+d.headline+'</h1><p>'+d.subtext+'</p><div class="details">'+d.details+'</div></div><div class="footer">www.yourwebsite.com</div></div><script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script><script>function dlImg(){var btn=document.getElementById("dl-btn");btn.style.display="none";html2canvas(document.querySelector(".flyer"),{scale:3,useCORS:true,backgroundColor:"#ffffff"}).then(c=>{var a=document.createElement("a");a.download="Flyer_HQ.png";a.href=c.toDataURL("image/png",1.0);a.click();btn.style.display="block";});}</script><button id="dl-btn" onclick="dlImg()" style="position:fixed;bottom:20px;right:20px;padding:12px 24px;background:#ef4444;color:#fff;border-radius:30px;cursor:pointer;font-weight:800;border:none;z-index:9999;box-shadow:0 10px 25px rgba(239,68,68,0.3);font-size:14px;">📸 Download HQ Photo</button></body></html>';
}

/* DOOH SIMULATOR */
var DX={
  en:{tab:'DOOH Sim',title:'🌆 DOOH Simulator',sub:'Digital Out-Of-Home billboard ad generator',
      btn:'🌆 Simulate DOOH',inject:'💉 Inject',copy:'📋 Copy HTML'},
  fr:{tab:'DOOH Sim',title:'🌆 Simulateur DOOH',sub:'Générateur de pub pour panneaux d\'affichage numériques',
      btn:'🌆 Simuler DOOH',inject:'💉 Injecter',copy:'📋 Copier HTML'}
};
function gd(){return window.lang||'en';}
function td(k){return(DX[gd()]||DX.en)[k]||k;}
var sd={headline:'NEW ARRIVALS',subtext:'',details:'AVAILABLE NOW',color:'#eab308'};

function buildDOOHHTML(d){
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>DOOH Simulator</title><link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;600;900&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box;}body{background:#050810;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:20px;font-family:Inter,sans-serif;overflow:hidden;}.env{position:absolute;inset:0;background:radial-gradient(circle at 50% 50%,#1e293b 0%,#050810 100%);z-index:0;}.pole{position:absolute;bottom:0;width:40px;height:20vh;background:#334155;left:50%;transform:translateX(-50%);z-index:1;border-left:5px solid #475569;}.billboard{width:100%;max-width:1200px;aspect-ratio:16/9;background:#000;border:15px solid #1e293b;border-radius:8px;position:relative;z-index:2;box-shadow:0 30px 100px '+d.color+'44;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:5%;text-align:center;overflow:hidden;}.b-bg{position:absolute;inset:0;background:'+d.color+';opacity:0.2;animation:pulse 4s infinite alternate;}h1{font-family:Anton,sans-serif;font-size:clamp(60px,12vw,200px);line-height:0.9;color:#fff;text-transform:uppercase;z-index:3;text-shadow:0 10px 30px rgba(0,0,0,0.5);margin-bottom:2%;animation:popIn 0.8s cubic-bezier(0.175,0.885,0.32,1.275) forwards;}.b-sub{font-size:clamp(20px,4vw,60px);font-weight:900;background:'+d.color+';color:#000;padding:1% 3%;z-index:3;display:inline-block;animation:slideUp 0.8s ease forwards;animation-delay:0.3s;opacity:0;transform:translateY(50px);}@keyframes pulse{0%{opacity:0.1}100%{opacity:0.3}}@keyframes popIn{0%{opacity:0;transform:scale(0.8)}100%{opacity:1;transform:scale(1)}}@keyframes slideUp{to{opacity:1;transform:translateY(0)}}</style></head><body><div class="env"></div><div class="pole"></div><div class="billboard"><div class="b-bg"></div><h1>'+d.headline+'</h1><div class="b-sub">'+d.details+'</div></div><script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script><script>function dlImg(){var btn=document.getElementById("dl-btn");btn.style.display="none";html2canvas(document.querySelector(".billboard"),{scale:2,useCORS:true,backgroundColor:"#000"}).then(c=>{var a=document.createElement("a");a.download="DOOH_Billboard_HQ.png";a.href=c.toDataURL("image/png",1.0);a.click();btn.style.display="block";});}</script><button id="dl-btn" onclick="dlImg()" style="position:fixed;bottom:20px;right:20px;padding:12px 24px;background:#eab308;color:#000;border-radius:30px;cursor:pointer;font-weight:900;border:none;z-index:9999;box-shadow:0 10px 25px rgba(234,179,8,0.3);font-size:14px;">📸 Download HQ Photo</button></body></html>';
}

function fi(k,lbl,ph,area,obj){var d=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;var i=area?document.createElement('textarea'):document.createElement('input');i.id=k;i.placeholder=ph;if(area){i.rows=2;i.style='resize:none;';}i.value=obj[k.split('-')[1]]||'';i.style=(i.style.cssText||'')+'width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(220,38,38,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){obj[k.split('-')[1]]=this.value;};d.appendChild(l);d.appendChild(i);return d;}

function renderPrintFlyer(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(220,38,38,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(220,38,38,0.1),rgba(239,68,68,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#ef4444;">'+tf('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tf('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  body.appendChild(fi('pf-headline',tf('headline'),tf('hlP'),false,sf));
  body.appendChild(fi('pf-subtext',tf('subtext'),tf('subP'),true,sf));
  body.appendChild(fi('pf-details',tf('details'),tf('dtP'),false,sf));

  var cx=document.createElement('div');cx.style='display:flex;align-items:center;gap:8px;';
  var cl=document.createElement('div');cl.style='font-size:9px;color:#94a3b8;font-weight:700;flex:1;';cl.textContent=tf('color');
  var ci=document.createElement('input');ci.type='color';ci.value=sf.color;ci.style='width:44px;height:30px;background:#0d1117;border:1px solid rgba(220,38,38,0.25);border-radius:6px;cursor:pointer;padding:2px;';ci.oninput=function(){sf.color=this.value;};
  cx.appendChild(cl);cx.appendChild(ci);body.appendChild(cx);

  var btn=document.createElement('button');btn.innerHTML=tf('btn');btn.style='width:100%;background:linear-gradient(135deg,#991b1b,#ef4444);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:4px;box-shadow:0 4px 15px rgba(220,38,38,0.3);';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=tf('inject');ib.style='flex:1;background:rgba(255,255,255,.1);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=tf('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  
  var html='';
  btn.onclick=function(){html=buildFlyerHTML(sf);ar.style.display='flex';res.innerHTML='<div style="background:rgba(220,38,38,0.08);border:1px solid rgba(220,38,38,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#ef4444;">✅ A4 Flyer Ready! Export -> Print -> Save as PDF.</div>';if(window.showToast)window.showToast('📄 Flyer generated!');};
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 HTML Copied!');});};
}

function renderDoohSim(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(234,179,8,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(234,179,8,0.1),rgba(253,224,71,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#eab308;">'+td('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+td('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  body.appendChild(fi('dh-headline',tf('headline'),'NEW',false,sd));
  body.appendChild(fi('dh-details',tf('details'),'NOW',false,sd));

  var cx=document.createElement('div');cx.style='display:flex;align-items:center;gap:8px;';
  var cl=document.createElement('div');cl.style='font-size:9px;color:#94a3b8;font-weight:700;flex:1;';cl.textContent=tf('color');
  var ci=document.createElement('input');ci.type='color';ci.value=sd.color;ci.style='width:44px;height:30px;background:#0d1117;border:1px solid rgba(234,179,8,0.25);border-radius:6px;cursor:pointer;padding:2px;';ci.oninput=function(){sd.color=this.value;};
  cx.appendChild(cl);cx.appendChild(ci);body.appendChild(cx);

  var btn=document.createElement('button');btn.innerHTML=td('btn');btn.style='width:100%;background:linear-gradient(135deg,#ca8a04,#eab308);color:#000;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:4px;box-shadow:0 4px 15px rgba(234,179,8,0.3);';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=td('inject');ib.style='flex:1;background:rgba(255,255,255,.1);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=td('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  
  var html='';
  btn.onclick=function(){html=buildDOOHHTML(sd);ar.style.display='flex';res.innerHTML='<div style="background:rgba(234,179,8,0.08);border:1px solid rgba(234,179,8,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#facc15;">✅ DOOH Simulation Ready!</div>';if(window.showToast)window.showToast('🌆 DOOH generated!');};
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 HTML Copied!');});};
}

document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;window.renderTab=function(tab){
    if(tab==='printflyer'){window.activeTab='printflyer';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b1=document.getElementById('tab-printflyer');if(b1)b1.classList.add('active');renderPrintFlyer();return;}
    if(tab==='doohsim'){window.activeTab='doohsim';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b2=document.getElementById('tab-doohsim');if(b2)b2.classList.add('active');renderDoohSim();return;}
    if(typeof oRT==='function')oRT(tab);
  };
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var e1=document.getElementById('lbl-tab-printflyer');if(e1)e1.textContent=tf('tab');var e2=document.getElementById('lbl-tab-doohsim');if(e2)e2.textContent=td('tab');if(window.activeTab==='printflyer')renderPrintFlyer();if(window.activeTab==='doohsim')renderDoohSim();};
});
})();
