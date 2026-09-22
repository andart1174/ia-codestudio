/**
 * 📱 Stories Ad Builder — EN/FR
 */
(function(){
'use strict';
var TX={
  en:{tab:'Stories Ad',title:'📱 Stories Ad Builder',sub:'Instagram/TikTok style — swipe + progress bar',
      brand:'Brand',brandP:'e.g. UltraApp',color:'Brand Color',
      s1h:'Slide 1 — Headline',s1p:'e.g. Did you know...',s1t:'Slide 1 Text',s1tp:'e.g. 73% of people struggle with...',
      s2h:'Slide 2 — Problem',s2p:'e.g. The old way is broken',s2t:'Slide 2 Text',s2tp:'e.g. Wasting hours every day on...',
      s3h:'Slide 3 — Solution',s3p:'e.g. Meet UltraApp',s3t:'Slide 3 Text',s3tp:'e.g. The AI-powered tool that...',
      s4h:'Slide 4 — CTA',s4p:'e.g. Start Free Today!',cta:'CTA Button',ctaP:'e.g. Try for Free',
      btn:'📱 Generate Stories Ad',inject:'💉 Inject',copy:'📋 Copy'},
  fr:{tab:'Stories Ad',title:'📱 Créateur Stories Ad',sub:'Style Instagram/TikTok — swipe + barre de progression',
      brand:'Marque',brandP:'ex. UltraApp',color:'Couleur Marque',
      s1h:'Slide 1 — Titre',s1p:'ex. Saviez-vous que...',s1t:'Slide 1 Texte',s1tp:'ex. 73% des gens ont du mal avec...',
      s2h:'Slide 2 — Problème',s2p:'ex. L\'ancienne méthode est dépassée',s2t:'Slide 2 Texte',s2tp:'ex. Des heures perdues chaque jour...',
      s3h:'Slide 3 — Solution',s3p:'ex. Découvrez UltraApp',s3t:'Slide 3 Texte',s3tp:'ex. L\'outil IA qui...',
      s4h:'Slide 4 — CTA',s4p:'ex. Commencez Gratuitement!',cta:'Bouton CTA',ctaP:'ex. Essayer Gratuitement',
      btn:'📱 Générer Stories Ad',inject:'💉 Injecter',copy:'📋 Copier'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}
var st={brand:'UltraApp',color:'#ec4899',s1h:'Did you know?',s1t:'73% of teams waste hours on manual work every day.',s2h:'The Old Way Is Broken',s2t:'Spreadsheets, endless emails, and missed deadlines.',s3h:'Meet UltraApp',s3t:'AI-powered automation that saves 3 hours daily.',s4h:'Start Free Today!',cta:'Try for Free →'};

function buildHTML(d){
  var slides=[
    {emoji:'🤔',hl:d.s1h,txt:d.s1t,bg:'linear-gradient(160deg,#1e1b4b,#4c1d95)'},
    {emoji:'😤',hl:d.s2h,txt:d.s2t,bg:'linear-gradient(160deg,#1c1917,#7f1d1d)'},
    {emoji:'✨',hl:d.s3h,txt:d.s3t,bg:'linear-gradient(160deg,#064e3b,#14532d)'},
    {emoji:'🚀',hl:d.s4h,txt:d.cta,bg:'linear-gradient(160deg,'+d.color+'66,'+d.color+'99)',isCta:true}
  ];
  var n=slides.length;
  return'<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+d.brand+' Stories Ad</title>'+
  '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet">'+
  '<style>*{margin:0;padding:0;box-sizing:border-box;font-family:Inter,sans-serif;user-select:none}'+
  'body{background:#000;display:flex;align-items:center;justify-content:center;min-height:100vh;}'+
  '.story-wrap{position:relative;width:390px;height:692px;overflow:hidden;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.8);}'+
  '.slide{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:40px 30px;opacity:0;transform:translateX(100%);transition:transform .35s cubic-bezier(.4,0,.2,1),opacity .35s ease;}'+
  '.slide.active{opacity:1;transform:none;}'+
  '.slide.prev{transform:translateX(-100%);opacity:0;}'+
  '.emoji{font-size:64px;margin-bottom:20px;animation:popIn .4s cubic-bezier(.2,1.5,.5,1) forwards;}'+
  '@keyframes popIn{from{transform:scale(0) rotate(-20deg)}to{transform:scale(1) rotate(0)}}'+
  '.headline{font-size:28px;font-weight:900;color:#fff;margin-bottom:14px;line-height:1.2;}'+
  '.subtext{font-size:15px;color:rgba(255,255,255,.75);line-height:1.6;margin-bottom:24px;}'+
  '.cta-wrap{display:flex;flex-direction:column;gap:12px;width:100%;}'+
  '.cta-btn{background:'+d.color+';color:#fff;border:none;padding:16px 32px;border-radius:50px;font-size:16px;font-weight:900;cursor:pointer;box-shadow:0 4px 20px '+d.color+'77;}'+
  '.swipe-hint{font-size:11px;color:rgba(255,255,255,.4);}'+
  '.progress-bar{position:absolute;top:12px;left:12px;right:12px;display:flex;gap:4px;z-index:10;}'+
  '.prog-seg{flex:1;height:3px;background:rgba(255,255,255,.3);border-radius:2px;overflow:hidden;}'+
  '.prog-fill{height:100%;background:#fff;width:0%;transition:width linear;}'+
  '.tap-left{position:absolute;left:0;top:0;width:30%;height:100%;z-index:5;cursor:pointer;}'+
  '.tap-right{position:absolute;right:0;top:0;width:70%;height:100%;z-index:5;cursor:pointer;}'+
  '.brand-bar{position:absolute;top:28px;left:12px;right:12px;display:flex;align-items:center;gap:8px;z-index:10;}'+
  '.brand-avatar{width:28px;height:28px;background:'+d.color+';border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;}'+
  '.brand-name{font-size:11px;font-weight:700;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.5);}'+
  '</style></head><body>'+
  '<div class="story-wrap" id="sw">'+
  '<div class="progress-bar">'+slides.map(function(_,i){return'<div class="prog-seg"><div class="prog-fill" id="pf'+i+'" style="width:'+(i<0?'100%':'0%')+'"></div></div>';}).join('')+'</div>'+
  '<div class="brand-bar"><div class="brand-avatar">'+d.brand.substring(0,1).toUpperCase()+'</div><div class="brand-name">'+d.brand+'</div></div>'+
  slides.map(function(s,i){return'<div class="slide'+(i===0?' active':'')+'" id="sl'+i+'" style="background:'+s.bg+'"><div class="emoji">'+s.emoji+'</div><div class="headline">'+s.hl+'</div><div class="subtext">'+s.txt+'</div>'+(s.isCta?'<div class="cta-wrap"><button class="cta-btn" onclick="window.open(\'#\')">'+s.txt+'</button><div class="swipe-hint">↑ Swipe Up</div></div>':'')+' </div>';}).join('')+
  '<div class="tap-left" onclick="prev()"></div><div class="tap-right" onclick="next()"></div>'+
  '</div>'+
  '<script>var cur=0,tot='+n+',timer,dur=5000;'+
  'function goTo(n){if(n<0||n>=tot)return;document.getElementById("sl"+cur).className="slide prev";clearInterval(timer);document.getElementById("pf"+cur).style.transition="none";if(n>cur)document.getElementById("pf"+cur).style.width="100%";cur=n;var sl=document.getElementById("sl"+cur);sl.className="slide";setTimeout(function(){sl.className="slide active";},10);startTimer();}'+
  'function next(){if(cur<tot-1)goTo(cur+1);}function prev(){if(cur>0)goTo(cur-1);}'+
  'function startTimer(){clearInterval(timer);var pf=document.getElementById("pf"+cur);pf.style.transition="none";pf.style.width="0%";setTimeout(function(){pf.style.transition="width "+dur+"ms linear";pf.style.width="100%";},20);timer=setInterval(function(){next();},dur);}'+
  'startTimer();'+
  '<\/script></body></html>';
}

function render(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(236,72,153,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(236,72,153,0.12),rgba(168,85,247,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#f472b6;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:5px;';
  function fi(k,lbl,ph){var d=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;var i=document.createElement('input');i.id='sa-'+k;i.placeholder=ph;i.value=st[k]||'';i.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(236,72,153,0.25);border-radius:6px;padding:6px 9px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){st[k]=this.value;};d.appendChild(l);d.appendChild(i);return d;}
  body.appendChild(fi('brand',t('brand'),t('brandP')));
  var cr=document.createElement('div');cr.style='display:flex;align-items:center;gap:8px;';
  var cl=document.createElement('div');cl.style='font-size:9px;color:#94a3b8;font-weight:700;flex:1;';cl.textContent=t('color');var ci=document.createElement('input');ci.type='color';ci.id='sa-color';ci.value=st.color;ci.style='width:44px;height:30px;background:#0d1117;border:1px solid rgba(236,72,153,0.25);border-radius:6px;cursor:pointer;padding:2px;';ci.oninput=function(){st.color=this.value;};cr.appendChild(cl);cr.appendChild(ci);body.appendChild(cr);
  var keys=[['s1h',t('s1h'),t('s1p')],['s1t',t('s1t'),t('s1tp')],['s2h',t('s2h'),t('s2p')],['s2t',t('s2t'),t('s2tp')],['s3h',t('s3h'),t('s3p')],['s3t',t('s3t'),t('s3tp')],['s4h',t('s4h'),t('s4p')],['cta',t('cta'),t('ctaP')]];
  keys.forEach(function(k){body.appendChild(fi(k[0],k[1],k[2]));});
  var btn=document.createElement('button');btn.innerHTML=t('btn');btn.style='width:100%;background:linear-gradient(135deg,#831843,#ec4899);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:4px;';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=t('inject');ib.style='flex:1;background:linear-gradient(135deg,#064e3b,#10b981);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=t('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  var html='';
  btn.onclick=function(){['brand','color','s1h','s1t','s2h','s2t','s3h','s3t','s4h','cta'].forEach(function(k){var el=document.getElementById('sa-'+k);if(el)st[k]=el.value||st[k];});html=buildHTML(st);ar.style.display='flex';res.innerHTML='<div style="background:rgba(236,72,153,0.08);border:1px solid rgba(236,72,153,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#f472b6;">✅ Stories Ad — 4 slides, auto-play 5s each</div>';if(window.showToast)window.showToast('📱 Stories Ad generated!');};
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 Copied!');});};
}
document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='storiesad'){window.activeTab='storiesad';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b=document.getElementById('tab-storiesad');if(b)b.classList.add('active');render();return;}if(typeof oRT==='function')oRT(tab);};
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-storiesad');if(el)el.textContent=t('tab');if(window.activeTab==='storiesad')render();};
});
})();
