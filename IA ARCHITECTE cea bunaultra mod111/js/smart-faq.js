/**
 * 🧠 Smart FAQ Builder — EN/FR
 */
(function(){
'use strict';
var TX={
  en:{tab:'Smart FAQ',title:'🧠 Smart FAQ Builder',sub:'Animated & SEO-friendly FAQ accordions',
      q1:'Question 1',q1P:'e.g. What is your return policy?',a1:'Answer 1',a1P:'e.g. You can return within 30 days...',
      q2:'Question 2',q2P:'e.g. Do you offer support?',a2:'Answer 2',a2P:'e.g. Yes, 24/7 support is available.',
      q3:'Question 3',q3P:'e.g. Is there a free trial?',a3:'Answer 3',a3P:'e.g. We offer a 14-day free trial.',
      color:'Accent Color',btn:'🧠 Generate FAQ',inject:'💉 Inject',copy:'📋 Copy'},
  fr:{tab:'Smart FAQ',title:'🧠 Créateur Smart FAQ',sub:'Accordéons FAQ animés et optimisés SEO',
      q1:'Question 1',q1P:'ex. Quelle est la politique de retour?',a1:'Réponse 1',a1P:'ex. Vous pouvez retourner sous 30 jours...',
      q2:'Question 2',q2P:'ex. Offrez-vous du support?',a2:'Réponse 2',a2P:'ex. Oui, support 24/7 inclus.',
      q3:'Question 3',q3P:'ex. Y a-t-il un essai gratuit?',a3:'Réponse 3',a3P:'ex. Nous offrons 14 jours d\'essai gratuit.',
      color:'Couleur Accent',btn:'🧠 Générer FAQ',inject:'💉 Injecter',copy:'📋 Copier'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}
var st={q1:'What is your return policy?',a1:'You can return within 30 days.',q2:'Do you offer support?',a2:'Yes, 24/7 support.',q3:'Is there a free trial?',a3:'Yes, a 14-day free trial.',color:'#8b5cf6'};

function buildFAQHTML(d){
  var faqs=[{q:d.q1,a:d.a1},{q:d.q2,a:d.a2},{q:d.q3,a:d.a3}];
  var html='<!DOCTYPE html><html><head><meta charset="UTF-8"><title>FAQ</title>'+
  '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">'+
  '<style>*{margin:0;padding:0;box-sizing:border-box;font-family:Inter,sans-serif;}'+
  'body{background:#050810;color:#e2e8f0;display:flex;flex-direction:column;align-items:center;padding:60px 20px;min-height:100vh;}'+
  '.faq-wrap{width:100%;max-width:600px;}'+
  'h2{font-size:32px;font-weight:700;margin-bottom:30px;text-align:center;color:#fff;}'+
  '.faq-item{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);border-radius:12px;margin-bottom:12px;overflow:hidden;transition:0.3s;}'+
  '.faq-item.active{border-color:'+d.color+'88;box-shadow:0 10px 30px '+d.color+'22;}'+
  '.faq-q{padding:20px;display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:600;font-size:16px;color:#fff;}'+
  '.faq-q:hover{background:rgba(255,255,255,0.02);}'+
  '.icon{width:24px;height:24px;border-radius:50%;background:rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;font-size:18px;transition:0.3s;color:'+d.color+';flex-shrink:0;margin-left:16px;}'+
  '.faq-item.active .icon{transform:rotate(45deg);background:'+d.color+';color:#fff;}'+
  '.faq-a{padding:0 20px;max-height:0;opacity:0;overflow:hidden;transition:all 0.4s cubic-bezier(0, 1, 0, 1);color:#94a3b8;line-height:1.6;}'+
  '.faq-item.active .faq-a{padding:0 20px 20px 20px;max-height:500px;opacity:1;transition:all 0.4s cubic-bezier(1, 0, 1, 0);}</style></head><body>'+
  '<div class="faq-wrap" itemscope itemtype="https://schema.org/FAQPage"><h2>Frequently Asked Questions</h2>'+
  faqs.map(function(f,i){
    return '<div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">'+
    '<div class="faq-q" onclick="this.parentElement.classList.toggle(\'active\')"><span itemprop="name">'+f.q+'</span><div class="icon">+</div></div>'+
    '<div class="faq-a" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"><span itemprop="text">'+f.a+'</span></div></div>';
  }).join('')+
  '</div></body></html>';
  return html;
}

function render(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(139,92,246,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(139,92,246,0.1),rgba(168,85,247,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#a78bfa;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  function fi(k,lbl,ph,area){var d=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;var i=area?document.createElement('textarea'):document.createElement('input');i.id='fq-'+k;i.placeholder=ph;if(area){i.rows=2;i.style='resize:none;';}i.value=st[k]||'';i.style=(i.style.cssText||'')+'width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(139,92,246,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){st[k]=this.value;};d.appendChild(l);d.appendChild(i);return d;}
  
  body.appendChild(fi('q1',t('q1'),t('q1P')));body.appendChild(fi('a1',t('a1'),t('a1P'),true));
  body.appendChild(fi('q2',t('q2'),t('q2P')));body.appendChild(fi('a2',t('a2'),t('a2P'),true));
  body.appendChild(fi('q3',t('q3'),t('q3P')));body.appendChild(fi('a3',t('a3'),t('a3P'),true));
  
  var cx=document.createElement('div');cx.style='display:flex;align-items:center;gap:8px;';
  var cl=document.createElement('div');cl.style='font-size:9px;color:#94a3b8;font-weight:700;flex:1;';cl.textContent=t('color');
  var ci=document.createElement('input');ci.type='color';ci.id='fq-color';ci.value=st.color;ci.style='width:44px;height:30px;background:#0d1117;border:1px solid rgba(139,92,246,0.25);border-radius:6px;cursor:pointer;padding:2px;';ci.oninput=function(){st.color=this.value;};
  cx.appendChild(cl);cx.appendChild(ci);body.appendChild(cx);

  var btn=document.createElement('button');btn.innerHTML=t('btn');btn.style='width:100%;background:linear-gradient(135deg,#4c1d95,#8b5cf6);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:4px;box-shadow:0 4px 15px rgba(139,92,246,0.3);';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=t('inject');ib.style='flex:1;background:linear-gradient(135deg,#064e3b,#10b981);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=t('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  
  var html='';
  btn.onclick=function(){['q1','a1','q2','a2','q3','a3','color'].forEach(function(k){var el=document.getElementById('fq-'+k);if(el)st[k]=el.value||st[k];});html=buildFAQHTML(st);ar.style.display='flex';res.innerHTML='<div style="background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#a78bfa;">✅ FAQ ready (Schema markup included)!</div>';if(window.showToast)window.showToast('🧠 FAQ generated!');};
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 Copied!');});};
}
document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='smartfaq'){window.activeTab='smartfaq';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b=document.getElementById('tab-smartfaq');if(b)b.classList.add('active');render();return;}if(typeof oRT==='function')oRT(tab);};
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-smartfaq');if(el)el.textContent=t('tab');if(window.activeTab==='smartfaq')render();};
});
})();
