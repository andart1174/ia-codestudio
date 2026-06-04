/**
 * 📄 LinkedIn B2B Carousel + 🎟️ Event Ticket
 */
(function(){
'use strict';

/* LINKEDIN B2B CAROUSEL */
var LX={
  en:{tab:'LI Carousel',title:'📄 LinkedIn B2B Carousel',sub:'Generate 1080x1080 PDF-ready slide sequence',
      headline:'Main Title',hlP:'e.g. 3 Ways to Grow',subtext:'Slide Text',subP:'e.g. Stop doing X and start doing Y...',
      btn:'📄 Generate Slides',inject:'💉 Inject',copy:'📋 Copy HTML',color:'Brand Color'},
  fr:{tab:'Carrousel LI',title:'📄 Carrousel LinkedIn B2B',sub:'Séquence de slides 1080x1080 pour PDF LinkedIn',
      headline:'Titre Principal',hlP:'ex. 3 Façons de Grandir',subtext:'Texte Slide',subP:'ex. Arrêtez de faire X...',
      btn:'📄 Générer Slides',inject:'💉 Injecter',copy:'📋 Copier HTML',color:'Couleur Marque'}
};
function gl(){return window.lang||'en';}
function tl(k){return(LX[gl()]||LX.en)[k]||k;}
var sl={headline:'3 Ways to Grow Faster',subtext:'Stop chasing perfection.\\nStart chasing iteration.\\n\\nHere is exactly how I do it...',color:'#0284c7'};

function buildCarouselHTML(d){
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>LinkedIn Carousel</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box;}body{background:#e2e8f0;display:flex;gap:40px;padding:40px;min-height:100vh;font-family:Inter,sans-serif;align-items:flex-start;flex-wrap:wrap;}.slide{width:1080px;height:1080px;background:#fff;position:relative;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,0.1);display:flex;flex-direction:column;padding:80px;}.slide-bg{position:absolute;top:0;right:0;width:500px;height:1080px;background:'+d.color+';clip-path:polygon(20% 0,100% 0,100% 100%,0 100%);z-index:0;opacity:0.1;}.content{flex:1;z-index:1;display:flex;flex-direction:column;justify-content:center;}h1{font-size:90px;font-weight:900;line-height:1.1;color:#0f172a;letter-spacing:-2px;margin-bottom:40px;}p{font-size:45px;color:#334155;line-height:1.4;white-space:pre-line;}.footer{display:flex;justify-content:space-between;align-items:center;margin-top:auto;z-index:1;border-top:2px solid #e2e8f0;padding-top:40px;}.author{display:flex;align-items:center;gap:20px;}.avatar{width:80px;height:80px;border-radius:50%;background:'+d.color+';display:flex;align-items:center;justify-content:center;color:#fff;font-size:30px;font-weight:700;}.author-info div:first-child{font-size:28px;font-weight:700;color:#0f172a;}.author-info div:last-child{font-size:22px;color:#64748b;}.swipe{font-size:24px;font-weight:700;color:'+d.color+';display:flex;align-items:center;gap:10px;}.s2{background:'+d.color+';}.s2 h1, .s2 p, .s2 .author-info div{color:#fff;}.s2 .swipe{color:#fff;}.s2 .slide-bg{background:#000;opacity:0.2;}</style></head><body><div class="slide"><div class="slide-bg"></div><div class="content"><h1>'+d.headline+'</h1></div><div class="footer"><div class="author"><div class="avatar">J</div><div class="author-info"><div>John Doe</div><div>CEO & Founder</div></div></div><div class="swipe">SWIPE ➔</div></div></div><div class="slide s2"><div class="slide-bg"></div><div class="content"><p>'+d.subtext+'</p></div><div class="footer"><div class="author"><div class="avatar" style="background:#fff;color:'+d.color+'">J</div><div class="author-info"><div>John Doe</div><div>CEO & Founder</div></div></div><div class="swipe">END ➔</div></div></div><script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script><script>function dlImg(){var btn=document.getElementById("dl-btn");btn.style.display="none";html2canvas(document.body,{scale:1.5,useCORS:true,backgroundColor:"#e2e8f0"}).then(c=>{var a=document.createElement("a");a.download="LinkedIn_Carousel_HQ.png";a.href=c.toDataURL("image/png",1.0);a.click();btn.style.display="block";});}</script><button id="dl-btn" onclick="dlImg()" style="position:fixed;bottom:20px;right:20px;padding:12px 24px;background:#0284c7;color:#fff;border-radius:30px;cursor:pointer;font-weight:800;border:none;z-index:9999;box-shadow:0 10px 25px rgba(2,132,199,0.3);font-size:14px;">📸 Download HQ Photo</button></body></html>';
}

/* EVENT WEBINAR TICKET */
var TX={
  en:{tab:'Event Ticket',title:'🎟️ Event Ticket',sub:'Generate 3D VIP Webinar/Event Tickets',
      headline:'Event Name',hlP:'e.g. THE FUTURE OF AI',subtext:'Date & Time',subP:'e.g. OCT 24 • 10:00 AM EST',
      btn:'🎟️ Generate Ticket',inject:'💉 Inject',copy:'📋 Copy HTML'},
  fr:{tab:'Billet Événement',title:'🎟️ Billet Événement',sub:'Générez des billets VIP 3D pour Webinaire',
      headline:'Nom de l\'Événement',hlP:'ex. LE FUTUR DE L\'IA',subtext:'Date & Heure',subP:'ex. 24 OCT • 10h00',
      btn:'🎟️ Générer Billet',inject:'💉 Injecter',copy:'📋 Copier HTML'}
};
function gt(){return window.lang||'en';}
function tt(k){return(TX[gt()]||TX.en)[k]||k;}
var st={headline:'THE FUTURE OF AI',subtext:'OCT 24 • 10:00 AM EST',color:'#f97316'};

function buildTicketHTML(d){
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Event Ticket</title><link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;600;900&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box;}body{background:#000;display:flex;justify-content:center;align-items:center;min-height:100vh;font-family:Inter,sans-serif;}.ticket-wrap{filter:drop-shadow(0 30px 60px rgba(0,0,0,0.8));transform:rotate(-2deg);}.ticket{width:900px;height:350px;display:flex;border-radius:20px;overflow:hidden;position:relative;background:linear-gradient(135deg,#0f172a,#1e293b);}.cutout{position:absolute;top:-25px;right:225px;width:50px;height:50px;background:#000;border-radius:50%;z-index:10;}.cutout-b{top:auto;bottom:-25px;}.main{width:650px;padding:40px;position:relative;display:flex;flex-direction:column;justify-content:space-between;}.main::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,'+d.color+',transparent);opacity:0.2;}h1{font-family:Anton,sans-serif;font-size:60px;line-height:1;color:#fff;text-transform:uppercase;margin-bottom:10px;text-shadow:0 5px 15px rgba(0,0,0,0.5);}.date{color:'+d.color+';font-size:24px;font-weight:900;letter-spacing:2px;}.tag{background:'+d.color+';color:#000;display:inline-block;padding:5px 15px;border-radius:20px;font-weight:900;font-size:14px;text-transform:uppercase;margin-bottom:20px;}.admit{display:flex;align-items:center;gap:20px;color:#fff;}.admit-txt{font-size:14px;font-weight:600;letter-spacing:10px;text-transform:uppercase;opacity:0.5;}.divider{width:4px;background-image:linear-gradient(to bottom, rgba(255,255,255,0.2) 50%, transparent 50%);background-size:4px 20px;background-repeat:repeat-y;margin-left:auto;}.stub{width:250px;padding:40px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;background:'+d.color+';color:#000;}.barcode{width:100%;height:80px;background-image:repeating-linear-gradient(90deg, #000 0, #000 4px, transparent 4px, transparent 8px, #000 8px, #000 10px, transparent 10px, transparent 14px, #000 14px, #000 20px, transparent 20px, transparent 22px);margin-bottom:20px;}.stub-txt{font-weight:900;font-size:20px;letter-spacing:2px;}</style></head><body><div class="ticket-wrap"><div class="ticket"><div class="cutout"></div><div class="cutout cutout-b"></div><div class="main"><div style="position:relative;z-index:1"><div class="tag">VIP ACCESS</div><h1>'+d.headline+'</h1><div class="date">'+d.subtext+'</div></div><div class="admit"><div class="admit-txt">ADMIT ONE</div></div></div><div class="divider"></div><div class="stub"><div class="barcode"></div><div class="stub-txt">SCAN ME</div></div></div></div><script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script><script>function dlImg(){var btn=document.getElementById("dl-btn");btn.style.display="none";html2canvas(document.querySelector(".ticket-wrap"),{scale:3,useCORS:true,backgroundColor:"transparent"}).then(c=>{var a=document.createElement("a");a.download="Event_Ticket_HQ.png";a.href=c.toDataURL("image/png",1.0);a.click();btn.style.display="block";});}</script><button id="dl-btn" onclick="dlImg()" style="position:fixed;bottom:20px;right:20px;padding:12px 24px;background:#f97316;color:#fff;border-radius:30px;cursor:pointer;font-weight:800;border:none;z-index:9999;box-shadow:0 10px 25px rgba(249,115,22,0.3);font-size:14px;">📸 Download HQ Photo</button></body></html>';
}

function fi(k,lbl,ph,area,obj){var d=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;var i=area?document.createElement('textarea'):document.createElement('input');i.id=k;i.placeholder=ph;if(area){i.rows=3;i.style='resize:none;';}i.value=obj[k.split('-')[1]]||'';i.style=(i.style.cssText||'')+'width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(2,132,199,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){obj[k.split('-')[1]]=this.value;};d.appendChild(l);d.appendChild(i);return d;}

function renderLICarousel(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(2,132,199,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(2,132,199,0.1),rgba(14,165,233,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#0ea5e9;">'+tl('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tl('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  body.appendChild(fi('li-headline',tl('headline'),tl('hlP'),false,sl));
  body.appendChild(fi('li-subtext',tl('subtext'),tl('subP'),true,sl));

  var cx=document.createElement('div');cx.style='display:flex;align-items:center;gap:8px;';
  var cl=document.createElement('div');cl.style='font-size:9px;color:#94a3b8;font-weight:700;flex:1;';cl.textContent=tl('color');
  var ci=document.createElement('input');ci.type='color';ci.value=sl.color;ci.style='width:44px;height:30px;background:#0d1117;border:1px solid rgba(2,132,199,0.25);border-radius:6px;cursor:pointer;padding:2px;';ci.oninput=function(){sl.color=this.value;};
  cx.appendChild(cl);cx.appendChild(ci);body.appendChild(cx);

  var btn=document.createElement('button');btn.innerHTML=tl('btn');btn.style='width:100%;background:linear-gradient(135deg,#0369a1,#0284c7);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:4px;box-shadow:0 4px 15px rgba(2,132,199,0.3);';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=tl('inject');ib.style='flex:1;background:rgba(255,255,255,.1);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=tl('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  
  var html='';
  btn.onclick=function(){html=buildCarouselHTML(sl);ar.style.display='flex';res.innerHTML='<div style="background:rgba(2,132,199,0.08);border:1px solid rgba(2,132,199,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#38bdf8;">✅ Carousel Slides Ready!</div>';if(window.showToast)window.showToast('📄 Carousel generated!');};
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 HTML Copied!');});};
}

function renderTicket(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(249,115,22,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(249,115,22,0.1),rgba(251,146,60,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#f97316;">'+tt('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tt('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  body.appendChild(fi('tk-headline',tt('headline'),tt('hlP'),false,st));
  body.appendChild(fi('tk-subtext',tt('subtext'),tt('subP'),false,st));

  var cx=document.createElement('div');cx.style='display:flex;align-items:center;gap:8px;';
  var cl=document.createElement('div');cl.style='font-size:9px;color:#94a3b8;font-weight:700;flex:1;';cl.textContent=tl('color');
  var ci=document.createElement('input');ci.type='color';ci.value=st.color;ci.style='width:44px;height:30px;background:#0d1117;border:1px solid rgba(249,115,22,0.25);border-radius:6px;cursor:pointer;padding:2px;';ci.oninput=function(){st.color=this.value;};
  cx.appendChild(cl);cx.appendChild(ci);body.appendChild(cx);

  var btn=document.createElement('button');btn.innerHTML=tt('btn');btn.style='width:100%;background:linear-gradient(135deg,#c2410c,#f97316);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:4px;box-shadow:0 4px 15px rgba(249,115,22,0.3);';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=tt('inject');ib.style='flex:1;background:rgba(255,255,255,.1);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=tt('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  
  var html='';
  btn.onclick=function(){html=buildTicketHTML(st);ar.style.display='flex';res.innerHTML='<div style="background:rgba(249,115,22,0.08);border:1px solid rgba(249,115,22,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#fb923c;">✅ 3D Ticket Ready!</div>';if(window.showToast)window.showToast('🎟️ Ticket generated!');};
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 HTML Copied!');});};
}

document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;window.renderTab=function(tab){
    if(tab==='licarousel'){window.activeTab='licarousel';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b1=document.getElementById('tab-licarousel');if(b1)b1.classList.add('active');renderLICarousel();return;}
    if(tab==='webticket'){window.activeTab='webticket';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b2=document.getElementById('tab-webticket');if(b2)b2.classList.add('active');renderTicket();return;}
    if(typeof oRT==='function')oRT(tab);
  };
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var e1=document.getElementById('lbl-tab-licarousel');if(e1)e1.textContent=tl('tab');var e2=document.getElementById('lbl-tab-webticket');if(e2)e2.textContent=tt('tab');if(window.activeTab==='licarousel')renderLICarousel();if(window.activeTab==='webticket')renderTicket();};
});
})();
