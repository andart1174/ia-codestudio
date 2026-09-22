/**
 * 📱 App Store Mockup + ⏯️ YouTube Thumbnail
 */
(function(){
'use strict';

/* APP STORE MOCKUP */
var AX={
  en:{tab:'App Store Mockup',title:'📱 App Store Mockup',sub:'Generate 9:16 high-converting App Store frames',
      headline:'Headline',hlP:'e.g. Track Your Habits',subtext:'Subtext',subP:'e.g. Build routines that last a lifetime',
      btn:'📱 Generate Mockup',inject:'💉 Inject',copy:'📋 Copy HTML',color:'Brand Color'},
  fr:{tab:'Mockup App Store',title:'📱 Mockup App Store',sub:'Générez des écrans 9:16 pour App Store',
      headline:'Titre',hlP:'ex. Track Your Habits',subtext:'Sous-titre',subP:'ex. Créez des routines durables',
      btn:'📱 Générer Mockup',inject:'💉 Injecter',copy:'📋 Copier HTML',color:'Couleur Marque'}
};
function ga(){return window.lang||'en';}
function ta(k){return(AX[ga()]||AX.en)[k]||k;}
var sa={headline:'Track Your Habits',subtext:'Build routines that last a lifetime.',color:'#8b5cf6'};

function buildAppStoreHTML(d){
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>App Store Mockup</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@700;900&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box;}body{background:#000;display:flex;justify-content:center;align-items:center;min-height:100vh;font-family:Inter,sans-serif;}.frame{width:540px;height:960px;background:linear-gradient(180deg,'+d.color+',#0f172a);position:relative;overflow:hidden;box-shadow:0 30px 60px rgba(0,0,0,0.5);display:flex;flex-direction:column;align-items:center;padding-top:80px;}.text-box{text-align:center;color:#fff;z-index:2;padding:0 40px;}h1{font-size:54px;font-weight:900;line-height:1.1;margin-bottom:16px;text-transform:uppercase;letter-spacing:-1px;text-shadow:0 4px 20px rgba(0,0,0,0.3);}p{font-size:24px;font-weight:700;color:rgba(255,255,255,0.8);}.iphone{width:380px;height:780px;background:#000;border:14px solid #1e293b;border-radius:50px;position:absolute;bottom:-100px;box-shadow:0 20px 50px rgba(0,0,0,0.8);display:flex;justify-content:center;}.iphone::before{content:"";position:absolute;top:0;width:150px;height:30px;background:#1e293b;border-bottom-left-radius:20px;border-bottom-right-radius:20px;z-index:10;}.screen{width:100%;height:100%;background:#fff;border-radius:36px;overflow:hidden;position:relative;display:flex;flex-direction:column;}.app-hdr{height:120px;background:'+d.color+';padding:30px;color:#fff;}.app-bdy{flex:1;background:#f8fafc;padding:20px;display:flex;flex-direction:column;gap:15px;}.sk{height:60px;background:#e2e8f0;border-radius:12px;}</style></head><body><div class="frame"><div class="text-box"><h1>'+d.headline+'</h1><p>'+d.subtext+'</p></div><div class="iphone"><div class="screen"><div class="app-hdr"><h2>App UI</h2></div><div class="app-bdy"><div class="sk" style="width:100%"></div><div class="sk" style="width:80%"></div><div class="sk" style="width:90%"></div><div class="sk" style="height:120px"></div></div></div></div></div><script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script><script>function dlImg(){var btn=document.getElementById("dl-btn");btn.style.display="none";html2canvas(document.querySelector(".frame"),{scale:2,useCORS:true}).then(c=>{var a=document.createElement("a");a.download="AppStore_Mockup_HQ.png";a.href=c.toDataURL("image/png",1.0);a.click();btn.style.display="block";});}</script><button id="dl-btn" onclick="dlImg()" style="position:fixed;bottom:20px;right:20px;padding:12px 24px;background:#8b5cf6;color:#fff;border-radius:30px;cursor:pointer;font-weight:800;border:none;z-index:9999;box-shadow:0 10px 25px rgba(139,92,246,0.3);font-size:14px;">📸 Download HQ Photo</button></body></html>';
}

/* YOUTUBE THUMBNAIL */
var YX={
  en:{tab:'YT Thumb',title:'⏯️ YouTube Thumbnail',sub:'Generate 1280x720 viral video thumbnails',
      headline:'Headline',hlP:'e.g. I CODED FOR 24 HOURS',
      btn:'⏯️ Generate Thumbnail',inject:'💉 Inject',copy:'📋 Copy HTML'},
  fr:{tab:'Miniature YT',title:'⏯️ Miniature YouTube',sub:'Générez des miniatures 1280x720 virales',
      headline:'Titre',hlP:'ex. J\'AI CODÉ 24 HEURES',
      btn:'⏯️ Générer Miniature',inject:'💉 Injecter',copy:'📋 Copier HTML'}
};
function gy(){return window.lang||'en';}
function ty(k){return(YX[gy()]||YX.en)[k]||k;}
var sy={headline:'I CODED FOR 24 HOURS',color:'#ef4444'};

function buildYTHTML(d){
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>YouTube Thumbnail</title><link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box;}body{background:#111;display:flex;justify-content:center;align-items:center;min-height:100vh;}.thumb{width:1280px;height:720px;background:radial-gradient(circle at 70% 50%,#1e293b, '+d.color+');position:relative;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,0.8);display:flex;align-items:center;padding:80px;border:4px solid #000;}.text-col{width:60%;z-index:2;}h1{font-family:Anton,sans-serif;font-size:140px;line-height:1;color:#fff;text-transform:uppercase;text-shadow:8px 8px 0px #000, 0 20px 40px rgba(0,0,0,0.8);transform:rotate(-3deg);}.arrow{position:absolute;top:50%;right:30%;font-size:200px;filter:drop-shadow(10px 10px 0px #000);animation:point 1s infinite alternate;z-index:3;}@keyframes point{from{transform:translateX(0)}to{transform:translateX(-30px)}}.face-ph{position:absolute;bottom:-50px;right:-50px;width:600px;height:700px;background:#e2e8f0;border-radius:300px 300px 0 0;border:15px solid #fff;box-shadow:0 0 50px rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;font-family:Anton;font-size:60px;color:#94a3b8;transform:rotate(5deg);z-index:1;}.face-ph::after{content:"YOUR FACE HERE";text-align:center;line-height:1.2;}</style></head><body><div class="thumb"><div class="text-col"><h1>'+d.headline+'</h1></div><div class="arrow">😱</div><div class="face-ph"></div></div><script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script><script>function dlImg(){var btn=document.getElementById("dl-btn");btn.style.display="none";html2canvas(document.querySelector(".thumb"),{scale:1.5,useCORS:true}).then(c=>{var a=document.createElement("a");a.download="YouTube_Thumbnail_HQ.png";a.href=c.toDataURL("image/png",1.0);a.click();btn.style.display="block";});}</script><button id="dl-btn" onclick="dlImg()" style="position:fixed;bottom:20px;right:20px;padding:12px 24px;background:#ef4444;color:#fff;border-radius:30px;cursor:pointer;font-weight:800;border:none;z-index:9999;box-shadow:0 10px 25px rgba(239,68,68,0.3);font-size:14px;">📸 Download HQ Photo</button></body></html>';
}

function fi(k,lbl,ph,obj){var d=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;var i=document.createElement('input');i.id=k;i.placeholder=ph;i.value=obj[k.split('-')[1]]||'';i.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(139,92,246,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){obj[k.split('-')[1]]=this.value;};d.appendChild(l);d.appendChild(i);return d;}

function renderAppStore(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(139,92,246,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(139,92,246,0.1),rgba(167,139,250,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#8b5cf6;">'+ta('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+ta('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  body.appendChild(fi('as-headline',ta('headline'),ta('hlP'),sa));
  body.appendChild(fi('as-subtext',ta('subtext'),ta('subP'),sa));

  var cx=document.createElement('div');cx.style='display:flex;align-items:center;gap:8px;';
  var cl=document.createElement('div');cl.style='font-size:9px;color:#94a3b8;font-weight:700;flex:1;';cl.textContent=ta('color');
  var ci=document.createElement('input');ci.type='color';ci.value=sa.color;ci.style='width:44px;height:30px;background:#0d1117;border:1px solid rgba(139,92,246,0.25);border-radius:6px;cursor:pointer;padding:2px;';ci.oninput=function(){sa.color=this.value;};
  cx.appendChild(cl);cx.appendChild(ci);body.appendChild(cx);

  var btn=document.createElement('button');btn.innerHTML=ta('btn');btn.style='width:100%;background:linear-gradient(135deg,#6d28d9,#8b5cf6);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:4px;box-shadow:0 4px 15px rgba(139,92,246,0.3);';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=ta('inject');ib.style='flex:1;background:rgba(255,255,255,.1);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=ta('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  
  var html='';
  btn.onclick=function(){html=buildAppStoreHTML(sa);ar.style.display='flex';res.innerHTML='<div style="background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#a78bfa;">✅ Mockup Ready!</div>';if(window.showToast)window.showToast('📱 Mockup generated!');};
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 HTML Copied!');});};
}

function renderYTThumb(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(239,68,68,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(239,68,68,0.1),rgba(248,113,113,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#ef4444;">'+ty('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+ty('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  body.appendChild(fi('yt-headline',ty('headline'),ty('hlP'),sy));

  var cx=document.createElement('div');cx.style='display:flex;align-items:center;gap:8px;';
  var cl=document.createElement('div');cl.style='font-size:9px;color:#94a3b8;font-weight:700;flex:1;';cl.textContent=ta('color');
  var ci=document.createElement('input');ci.type='color';ci.value=sy.color;ci.style='width:44px;height:30px;background:#0d1117;border:1px solid rgba(239,68,68,0.25);border-radius:6px;cursor:pointer;padding:2px;';ci.oninput=function(){sy.color=this.value;};
  cx.appendChild(cl);cx.appendChild(ci);body.appendChild(cx);

  var btn=document.createElement('button');btn.innerHTML=ty('btn');btn.style='width:100%;background:linear-gradient(135deg,#b91c1c,#ef4444);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:4px;box-shadow:0 4px 15px rgba(239,68,68,0.3);';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=ty('inject');ib.style='flex:1;background:rgba(255,255,255,.1);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=ty('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  
  var html='';
  btn.onclick=function(){html=buildYTHTML(sy);ar.style.display='flex';res.innerHTML='<div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#f87171;">✅ 1280x720 Thumbnail Ready!</div>';if(window.showToast)window.showToast('⏯️ Thumbnail generated!');};
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 HTML Copied!');});};
}

document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;window.renderTab=function(tab){
    if(tab==='appstoremockup'){window.activeTab='appstoremockup';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b1=document.getElementById('tab-appstoremockup');if(b1)b1.classList.add('active');renderAppStore();return;}
    if(tab==='ythumb'){window.activeTab='ythumb';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b2=document.getElementById('tab-ythumb');if(b2)b2.classList.add('active');renderYTThumb();return;}
    if(typeof oRT==='function')oRT(tab);
  };
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var e1=document.getElementById('lbl-tab-appstoremockup');if(e1)e1.textContent=ta('tab');var e2=document.getElementById('lbl-tab-ythumb');if(e2)e2.textContent=ty('tab');if(window.activeTab==='appstoremockup')renderAppStore();if(window.activeTab==='ythumb')renderYTThumb();};
});
})();
