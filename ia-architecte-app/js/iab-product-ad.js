/**
 * 🏙️ IAB Banner Bundle + 📱 Product Frame Ad
 */
(function(){
'use strict';

/* IAB BANNER BUNDLE */
var IX={
  en:{tab:'IAB Banners',title:'🏙️ IAB Banner Bundle',sub:'Generate 4 Google Ads standard sizes instantly',
      headline:'Headline',hlP:'e.g. Up to 50% OFF',cta:'CTA Button',ctaP:'e.g. Shop Now',
      btn:'🏙️ Generate IAB Banners',inject:'💉 Inject',copy:'📋 Copy HTML',color:'Brand Color'},
  fr:{tab:'IAB Banners',title:'🏙️ Bannières IAB',sub:'Générez 4 tailles standards Google Ads instantanément',
      headline:'Gros Titre',hlP:'ex. Jusqu\'à -50%',cta:'Bouton CTA',ctaP:'ex. Acheter',
      btn:'🏙️ Générer Bannières',inject:'💉 Injecter',copy:'📋 Copier HTML',color:'Couleur Marque'}
};
function gi(){return window.lang||'en';}
function ti(k){return(IX[gi()]||IX.en)[k]||k;}
var si={headline:'Up to 50% OFF',cta:'Shop Now',color:'#2563eb'};

function buildIABHTML(d){
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>IAB Banners</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;800;900&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box;font-family:Inter,sans-serif;}body{background:#e2e8f0;padding:40px;display:flex;flex-wrap:wrap;gap:40px;justify-content:center;align-items:flex-start;min-height:100vh;}.banner{background:#fff;border:1px solid #cbd5e1;position:relative;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.1);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;}.banner::before{content:"";position:absolute;width:150%;height:150%;background:'+d.color+';top:-50%;left:-25%;transform:rotate(-15deg);z-index:0;}.b-300x250{width:300px;height:250px;} .b-300x250::before{top:-60%;}.b-728x90{width:728px;height:90px;flex-direction:row;justify-content:space-between;padding:0 40px;} .b-728x90::before{top:-200%;left:-50%;width:100%;height:400%;transform:rotate(15deg);}.b-160x600{width:160px;height:600px;} .b-160x600::before{top:-30%;}.b-300x600{width:300px;height:600px;} .b-300x600::before{top:-40%;}.content{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;width:100%;}.b-728x90 .content{flex-direction:row;justify-content:space-between;}h1{color:#fff;font-weight:900;text-transform:uppercase;line-height:1.1;text-shadow:0 4px 10px rgba(0,0,0,0.3);}.b-300x250 h1{font-size:36px;margin-bottom:20px;}.b-728x90 h1{font-size:32px;margin-bottom:0;}.b-160x600 h1{font-size:28px;margin-bottom:40px;}.b-300x600 h1{font-size:48px;margin-bottom:40px;}.cta{background:#0f172a;color:#fff;font-weight:800;text-transform:uppercase;border-radius:30px;box-shadow:0 10px 20px rgba(0,0,0,0.2);animation:bounce 2s infinite;}.b-300x250 .cta{padding:10px 24px;font-size:14px;margin-top:20px;}.b-728x90 .cta{padding:12px 30px;font-size:16px;}.b-160x600 .cta{padding:12px 20px;font-size:14px;margin-top:40px;}.b-300x600 .cta{padding:16px 40px;font-size:20px;margin-top:60px;}@keyframes bounce{0%,20%,50%,80%,100%{transform:translateY(0)}40%{transform:translateY(-10px)}60%{transform:translateY(-5px)}}</style></head><body><div class="banner b-300x250"><div class="content"><h1>'+d.headline+'</h1><div class="cta">'+d.cta+'</div></div></div><div class="banner b-728x90"><div class="content"><h1>'+d.headline+'</h1><div class="cta">'+d.cta+'</div></div></div><div class="banner b-160x600"><div class="content"><h1>'+d.headline.split(" ").join("<br>")+'</h1><div class="cta">'+d.cta+'</div></div></div><div class="banner b-300x600"><div class="content"><h1>'+d.headline.split(" ").join("<br>")+'</h1><div class="cta">'+d.cta+'</div></div></div><script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script><script>function dlImg(){var btn=document.getElementById("dl-btn");btn.style.display="none";html2canvas(document.body,{scale:2,useCORS:true,backgroundColor:"#e2e8f0"}).then(c=>{var a=document.createElement("a");a.download="IAB_Banners_HQ.png";a.href=c.toDataURL("image/png",1.0);a.click();btn.style.display="block";});}</script><button id="dl-btn" onclick="dlImg()" style="position:fixed;bottom:20px;right:20px;padding:12px 24px;background:#c084fc;color:#fff;border-radius:30px;cursor:pointer;font-weight:800;border:none;z-index:9999;box-shadow:0 10px 25px rgba(192,132,252,0.3);font-size:14px;">📸 Download HQ Photo</button></body></html>';
}

/* PRODUCT FRAME AD */
var PX={
  en:{tab:'Product Ad',title:'📱 Product Frame Ad',sub:'Square 1:1 Social Media App/Product Ad',
      btn:'📱 Generate Ad',inject:'💉 Inject',copy:'📋 Copy HTML'},
  fr:{tab:'Pub Produit',title:'📱 Pub Format Produit',sub:'Pub Carrée 1:1 pour Réseaux Sociaux',
      btn:'📱 Générer Pub',inject:'💉 Injecter',copy:'📋 Copier HTML'}
};
function gp(){return window.lang||'en';}
function tp(k){return(PX[gp()]||PX.en)[k]||k;}
var sp={headline:'DOWNLOAD NOW',cta:'GET APP',color:'#db2777'};

function buildProductHTML(d){
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Product Ad</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box;}body{background:#050810;display:flex;justify-content:center;align-items:center;min-height:100vh;font-family:Inter,sans-serif;}.ad-wrap{width:1080px;height:1080px;background:linear-gradient(135deg,'+d.color+',#0f172a);position:relative;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.5);display:flex;align-items:center;}.text-col{width:50%;padding:80px;z-index:2;color:#fff;}h1{font-size:80px;font-weight:900;line-height:1.1;margin-bottom:30px;text-transform:uppercase;letter-spacing:-2px;}.cta{background:#fff;color:#0f172a;display:inline-block;padding:24px 48px;border-radius:50px;font-size:24px;font-weight:800;text-transform:uppercase;}.device-col{width:50%;height:100%;position:relative;z-index:1;}.iphone{width:360px;height:720px;background:#000;border:12px solid #1e293b;border-radius:50px;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-10deg);box-shadow:30px 40px 80px rgba(0,0,0,0.6);overflow:hidden;}.iphone::before{content:"";position:absolute;top:0;left:50%;transform:translateX(-50%);width:160px;height:30px;background:#1e293b;border-bottom-left-radius:20px;border-bottom-right-radius:20px;z-index:10;}.screen{width:100%;height:100%;background:linear-gradient(45deg,#3b82f6,#ec4899);position:relative;}.screen::after{content:"Your App Here";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#fff;font-size:24px;font-weight:700;text-align:center;width:100%;}.blob{position:absolute;width:800px;height:800px;background:'+d.color+';filter:blur(100px);border-radius:50%;opacity:0.4;top:10%;right:-20%;z-index:0;}</style></head><body><div class="ad-wrap"><div class="blob"></div><div class="text-col"><h1>'+d.headline+'</h1><div class="cta">'+d.cta+'</div></div><div class="device-col"><div class="iphone"><div class="screen"></div></div></div></div><script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script><script>function dlImg(){var btn=document.getElementById("dl-btn");btn.style.display="none";html2canvas(document.querySelector(".ad-wrap"),{scale:2,useCORS:true,backgroundColor:"transparent"}).then(c=>{var a=document.createElement("a");a.download="Product_Ad_HQ.png";a.href=c.toDataURL("image/png",1.0);a.click();btn.style.display="block";});}</script><button id="dl-btn" onclick="dlImg()" style="position:fixed;bottom:20px;right:20px;padding:12px 24px;background:#ec4899;color:#fff;border-radius:30px;cursor:pointer;font-weight:800;border:none;z-index:9999;box-shadow:0 10px 25px rgba(236,72,153,0.3);font-size:14px;">📸 Download HQ Photo</button></body></html>';
}

function fi(k,lbl,ph,obj){var d=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;var i=document.createElement('input');i.id=k;i.placeholder=ph;i.value=obj[k.split('-')[1]]||'';i.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(168,85,247,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){obj[k.split('-')[1]]=this.value;};d.appendChild(l);d.appendChild(i);return d;}

function renderIABBanner(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(168,85,247,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(168,85,247,0.1),rgba(192,132,252,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#c084fc;">'+ti('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+ti('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  body.appendChild(fi('ib-headline',ti('headline'),ti('hlP'),si));
  body.appendChild(fi('ib-cta',ti('cta'),ti('ctaP'),si));

  var cx=document.createElement('div');cx.style='display:flex;align-items:center;gap:8px;';
  var cl=document.createElement('div');cl.style='font-size:9px;color:#94a3b8;font-weight:700;flex:1;';cl.textContent=ti('color');
  var ci=document.createElement('input');ci.type='color';ci.value=si.color;ci.style='width:44px;height:30px;background:#0d1117;border:1px solid rgba(168,85,247,0.25);border-radius:6px;cursor:pointer;padding:2px;';ci.oninput=function(){si.color=this.value;};
  cx.appendChild(cl);cx.appendChild(ci);body.appendChild(cx);

  var btn=document.createElement('button');btn.innerHTML=ti('btn');btn.style='width:100%;background:linear-gradient(135deg,#581c87,#9333ea);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:4px;box-shadow:0 4px 15px rgba(168,85,247,0.3);';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=ti('inject');ib.style='flex:1;background:rgba(255,255,255,.1);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=ti('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  
  var html='';
  btn.onclick=function(){html=buildIABHTML(si);ar.style.display='flex';res.innerHTML='<div style="background:rgba(168,85,247,0.08);border:1px solid rgba(168,85,247,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#c084fc;">✅ 4 IAB Display Banners Ready!</div>';if(window.showToast)window.showToast('🏙️ Banners generated!');};
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 HTML Copied!');});};
}

function renderProductAd(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(236,72,153,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(236,72,153,0.1),rgba(244,114,182,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#f472b6;">'+tp('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tp('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  body.appendChild(fi('pa-headline',ti('headline'),'NEW',sp));
  body.appendChild(fi('pa-cta',ti('cta'),'NOW',sp));

  var cx=document.createElement('div');cx.style='display:flex;align-items:center;gap:8px;';
  var cl=document.createElement('div');cl.style='font-size:9px;color:#94a3b8;font-weight:700;flex:1;';cl.textContent=ti('color');
  var ci=document.createElement('input');ci.type='color';ci.value=sp.color;ci.style='width:44px;height:30px;background:#0d1117;border:1px solid rgba(236,72,153,0.25);border-radius:6px;cursor:pointer;padding:2px;';ci.oninput=function(){sp.color=this.value;};
  cx.appendChild(cl);cx.appendChild(ci);body.appendChild(cx);

  var btn=document.createElement('button');btn.innerHTML=tp('btn');btn.style='width:100%;background:linear-gradient(135deg,#db2777,#ec4899);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:4px;box-shadow:0 4px 15px rgba(236,72,153,0.3);';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=tp('inject');ib.style='flex:1;background:rgba(255,255,255,.1);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=tp('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  
  var html='';
  btn.onclick=function(){html=buildProductHTML(sp);ar.style.display='flex';res.innerHTML='<div style="background:rgba(236,72,153,0.08);border:1px solid rgba(236,72,153,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#f472b6;">✅ 1080x1080 Product Frame Ad Ready!</div>';if(window.showToast)window.showToast('📱 Product Ad generated!');};
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 HTML Copied!');});};
}

document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;window.renderTab=function(tab){
    if(tab==='iabbanner'){window.activeTab='iabbanner';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b1=document.getElementById('tab-iabbanner');if(b1)b1.classList.add('active');renderIABBanner();return;}
    if(tab==='productad'){window.activeTab='productad';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b2=document.getElementById('tab-productad');if(b2)b2.classList.add('active');renderProductAd();return;}
    if(typeof oRT==='function')oRT(tab);
  };
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var e1=document.getElementById('lbl-tab-iabbanner');if(e1)e1.textContent=ti('tab');var e2=document.getElementById('lbl-tab-productad');if(e2)e2.textContent=tp('tab');if(window.activeTab==='iabbanner')renderIABBanner();if(window.activeTab==='productad')renderProductAd();};
});
})();
