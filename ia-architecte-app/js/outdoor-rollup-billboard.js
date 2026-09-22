/**
 * 🏷️ Roll-up Standee + 🛣️ Giant Billboard
 */
(function(){
'use strict';

/* ROLL-UP STANDEE */
var RX={
  en:{tab:'Roll-Up',title:'🏷️ Roll-up Standee',sub:'Generate 80x200cm Event Banners',
      headline:'Headline',hlP:'e.g. BIG SUMMER SALE',subtext:'Subtext',subP:'e.g. Up to 50% Off Everything',
      btn:'🏷️ Generate Roll-up',inject:'💉 Inject',copy:'📋 Copy HTML',color:'Brand Color'},
  fr:{tab:'Roll-Up',title:'🏷️ Roll-up Event',sub:'Générez des bannières 80x200cm',
      headline:'Titre',hlP:'ex. GRANDE VENTE D\'ÉTÉ',subtext:'Sous-titre',subP:'ex. Jusqu\'à 50% de réduction',
      btn:'🏷️ Générer Roll-up',inject:'💉 Injecter',copy:'📋 Copier HTML',color:'Couleur Marque'}
};
function gr(){return window.lang||'en';}
function tr(k){return(RX[gr()]||RX.en)[k]||k;}
var sr={headline:'BIG SUMMER SALE',subtext:'Up to 50% Off All Sneakers',color:'#10b981'};

function buildRollupHTML(d){
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Roll-Up Banner</title><link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;700&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box;}body{background:#e2e8f0;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:40px;}.standee-wrap{display:flex;flex-direction:column;align-items:center;filter:drop-shadow(0 30px 40px rgba(0,0,0,0.3));}.banner{width:400px;height:1000px;background:#fff;position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:center;text-align:center;}.banner::before{content:"";position:absolute;top:-20%;left:-50%;width:200%;height:60%;background:'+d.color+';transform:rotate(-10deg);z-index:0;}.content{position:relative;z-index:1;padding:60px 40px;width:100%;flex:1;display:flex;flex-direction:column;}h1{font-family:Anton,sans-serif;font-size:70px;line-height:1;color:#fff;text-transform:uppercase;margin-bottom:20px;text-shadow:0 10px 20px rgba(0,0,0,0.3);}p{font-family:Inter;font-size:24px;font-weight:700;color:#fff;background:#000;padding:10px 20px;display:inline-block;border-radius:30px;align-self:center;}.prod{font-size:180px;margin:auto 0;filter:drop-shadow(0 30px 30px rgba(0,0,0,0.5));animation:float 4s ease-in-out infinite;}@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}.footer{background:#0f172a;width:100%;padding:30px;color:#fff;font-family:Inter;font-weight:700;font-size:20px;z-index:1;}.base{width:420px;height:40px;background:linear-gradient(to bottom, #e2e8f0, #94a3b8);border-radius:10px 10px 0 0;position:relative;border:1px solid #cbd5e1;border-bottom:none;}.base::after{content:"";position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:200px;height:10px;background:#475569;border-radius:10px 10px 0 0;}</style></head><body><div class="standee-wrap"><div class="banner"><div class="content"><h1>'+d.headline+'</h1><p>'+d.subtext+'</p><div class="prod">👟</div></div><div class="footer">www.yourbrand.com</div></div><div class="base"></div></div><script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script><script>function dlImg(){var btn=document.getElementById("dl-btn");btn.style.display="none";html2canvas(document.body,{scale:2,useCORS:true,backgroundColor:"#e2e8f0"}).then(c=>{var a=document.createElement("a");a.download="Rollup_Standee_HQ.png";a.href=c.toDataURL("image/png",1.0);a.click();btn.style.display="block";});}</script><button id="dl-btn" onclick="dlImg()" style="position:fixed;bottom:20px;right:20px;padding:12px 24px;background:#10b981;color:#fff;border-radius:30px;cursor:pointer;font-weight:800;border:none;z-index:9999;box-shadow:0 10px 25px rgba(16,185,129,0.3);font-size:14px;">📸 Download HQ Photo</button></body></html>';
}

/* GIANT BILLBOARD */
var BX={
  en:{tab:'Billboard',title:'🛣️ Giant Billboard',sub:'Generate outdoor highway billboard mockups',
      headline:'Billboard Title',hlP:'e.g. THE ALL NEW SERIES',subtext:'Subtext',subP:'e.g. Coming this Fall.',
      btn:'🛣️ Generate Billboard',inject:'💉 Inject',copy:'📋 Copy HTML'},
  fr:{tab:'Panneau',title:'🛣️ Panneau Géant',sub:'Générez des maquettes de panneaux publicitaires',
      headline:'Titre Panneau',hlP:'ex. LA NOUVELLE SÉRIE',subtext:'Sous-titre',subP:'ex. Disponible cet automne.',
      btn:'🛣️ Générer Panneau',inject:'💉 Injecter',copy:'📋 Copier HTML'}
};
function gb(){return window.lang||'en';}
function tb(k){return(BX[gb()]||BX.en)[k]||k;}
var sb={headline:'THE ALL NEW SERIES',subtext:'OUT NOW IN STORES',color:'#eab308'};

function buildBillboardHTML(d){
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Giant Billboard</title><link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;800;900&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box;}body{background:linear-gradient(to bottom, #38bdf8, #e0f2fe);display:flex;justify-content:center;align-items:flex-end;min-height:100vh;padding-bottom:50px;overflow:hidden;}.billboard-wrap{display:flex;flex-direction:column;align-items:center;position:relative;z-index:1;}.frame{width:1200px;height:500px;background:#334155;padding:20px;border-radius:10px;box-shadow:0 50px 100px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.8);position:relative;}.frame::before{content:"";position:absolute;bottom:-40px;left:10%;width:80%;height:40px;background:#1e293b;clip-path:polygon(5% 0, 95% 0, 100% 100%, 0 100%);}.pole{width:80px;height:300px;background:linear-gradient(to right, #475569, #94a3b8, #475569);box-shadow:0 20px 50px rgba(0,0,0,0.5);}.canvas{width:100%;height:100%;background:linear-gradient(135deg,'+d.color+',#000);display:flex;align-items:center;padding:60px;position:relative;overflow:hidden;}.cloud{position:absolute;background:#fff;border-radius:50px;opacity:0.8;filter:blur(2px);z-index:0;}.c1{width:200px;height:60px;top:10%;left:5%;}.c2{width:300px;height:80px;top:20%;right:10%;opacity:0.5;}.text-col{width:60%;z-index:2;}h1{font-family:Anton,sans-serif;font-size:120px;line-height:0.9;color:#fff;text-transform:uppercase;text-shadow:10px 10px 0 #000;transform:rotate(-2deg);margin-bottom:20px;}p{font-family:Inter,sans-serif;font-size:36px;font-weight:900;color:#000;background:#fff;display:inline-block;padding:10px 30px;transform:rotate(-2deg);}.prod{position:absolute;right:10%;top:50%;transform:translateY(-50%);font-size:250px;filter:drop-shadow(-20px 20px 10px rgba(0,0,0,0.8));z-index:2;}</style></head><body><div class="cloud c1"></div><div class="cloud c2"></div><div class="billboard-wrap"><div class="frame"><div class="canvas"><div class="text-col"><h1>'+d.headline+'</h1><p>'+d.subtext+'</p></div><div class="prod">🎧</div></div></div><div class="pole"></div></div><script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script><script>function dlImg(){var btn=document.getElementById("dl-btn");btn.style.display="none";html2canvas(document.body,{scale:1.5,useCORS:true}).then(c=>{var a=document.createElement("a");a.download="Billboard_HQ.png";a.href=c.toDataURL("image/png",1.0);a.click();btn.style.display="block";});}</script><button id="dl-btn" onclick="dlImg()" style="position:fixed;bottom:20px;right:20px;padding:12px 24px;background:#eab308;color:#000;border-radius:30px;cursor:pointer;font-weight:800;border:none;z-index:9999;box-shadow:0 10px 25px rgba(234,179,8,0.4);font-size:14px;">📸 Download HQ Photo</button></body></html>';
}

function fi(k,lbl,ph,obj){var d=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;var i=document.createElement('input');i.id=k;i.placeholder=ph;i.value=obj[k.split('-')[1]]||'';i.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(16,185,129,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){obj[k.split('-')[1]]=this.value;};d.appendChild(l);d.appendChild(i);return d;}

function renderRollup(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(16,185,129,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(52,211,153,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#10b981;">'+tr('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tr('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  body.appendChild(fi('ru-headline',tr('headline'),tr('hlP'),sr));
  body.appendChild(fi('ru-subtext',tr('subtext'),tr('subP'),sr));

  var cx=document.createElement('div');cx.style='display:flex;align-items:center;gap:8px;';
  var cl=document.createElement('div');cl.style='font-size:9px;color:#94a3b8;font-weight:700;flex:1;';cl.textContent=tr('color');
  var ci=document.createElement('input');ci.type='color';ci.value=sr.color;ci.style='width:44px;height:30px;background:#0d1117;border:1px solid rgba(16,185,129,0.25);border-radius:6px;cursor:pointer;padding:2px;';ci.oninput=function(){sr.color=this.value;};
  cx.appendChild(cl);cx.appendChild(ci);body.appendChild(cx);

  var btn=document.createElement('button');btn.innerHTML=tr('btn');btn.style='width:100%;background:linear-gradient(135deg,#047857,#10b981);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:4px;box-shadow:0 4px 15px rgba(16,185,129,0.3);';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=tr('inject');ib.style='flex:1;background:rgba(255,255,255,.1);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=tr('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  
  var html='';
  btn.onclick=function(){html=buildRollupHTML(sr);ar.style.display='flex';res.innerHTML='<div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#34d399;">✅ Roll-up Ready!</div>';if(window.showToast)window.showToast('🏷️ Banner generated!');};
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 HTML Copied!');});};
}

function renderBillboard(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(234,179,8,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(234,179,8,0.1),rgba(250,204,21,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#eab308;">'+tb('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tb('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  var bi=function(k,lbl,ph,obj){var d=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;var i=document.createElement('input');i.id=k;i.placeholder=ph;i.value=obj[k.split('-')[1]]||'';i.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(234,179,8,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){obj[k.split('-')[1]]=this.value;};d.appendChild(l);d.appendChild(i);return d;};

  body.appendChild(bi('bb-headline',tb('headline'),tb('hlP'),sb));
  body.appendChild(bi('bb-subtext',tb('subtext'),tb('subP'),sb));

  var cx=document.createElement('div');cx.style='display:flex;align-items:center;gap:8px;';
  var cl=document.createElement('div');cl.style='font-size:9px;color:#94a3b8;font-weight:700;flex:1;';cl.textContent=tb('color');
  var ci=document.createElement('input');ci.type='color';ci.value=sb.color;ci.style='width:44px;height:30px;background:#0d1117;border:1px solid rgba(234,179,8,0.25);border-radius:6px;cursor:pointer;padding:2px;';ci.oninput=function(){sb.color=this.value;};
  cx.appendChild(cl);cx.appendChild(ci);body.appendChild(cx);

  var btn=document.createElement('button');btn.innerHTML=tb('btn');btn.style='width:100%;background:linear-gradient(135deg,#ca8a04,#eab308);color:#000;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:4px;box-shadow:0 4px 15px rgba(234,179,8,0.3);';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=tb('inject');ib.style='flex:1;background:rgba(255,255,255,.1);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=tb('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  
  var html='';
  btn.onclick=function(){html=buildBillboardHTML(sb);ar.style.display='flex';res.innerHTML='<div style="background:rgba(234,179,8,0.08);border:1px solid rgba(234,179,8,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#facc15;">✅ Billboard Ready!</div>';if(window.showToast)window.showToast('🛣️ Billboard generated!');};
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 HTML Copied!');});};
}

document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;window.renderTab=function(tab){
    if(tab==='rollup'){window.activeTab='rollup';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b1=document.getElementById('tab-rollup');if(b1)b1.classList.add('active');renderRollup();return;}
    if(tab==='billboard'){window.activeTab='billboard';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b2=document.getElementById('tab-billboard');if(b2)b2.classList.add('active');renderBillboard();return;}
    if(typeof oRT==='function')oRT(tab);
  };
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var e1=document.getElementById('lbl-tab-rollup');if(e1)e1.textContent=tr('tab');var e2=document.getElementById('lbl-tab-billboard');if(e2)e2.textContent=tb('tab');if(window.activeTab==='rollup')renderRollup();if(window.activeTab==='billboard')renderBillboard();};
});
})();
