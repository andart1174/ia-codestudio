/**
 * 🤝 Proposal Builder — EN/FR
 */
(function(){
'use strict';
var TX={
  en:{tab:'Proposal',title:'🤝 Proposal Builder',sub:'Professional client proposals with pricing tables',
      client:'Client Name',clientP:'e.g. ACME Corp',project:'Project Type',projectP:'e.g. E-commerce Website',
      basic:'Basic Package ($)',basicP:'e.g. 2000',pro:'Pro Package ($)',proP:'e.g. 4000',
      enterprise:'Enterprise ($)',enterpriseP:'e.g. 8000',timeline:'Timeline',timelineP:'e.g. 4-6 weeks',
      about:'About Your Company',aboutP:'e.g. We are a full-stack agency with 5+ years experience...',
      btn:'🤝 Generate Proposal',inject:'💉 Inject',copy:'📋 Copy'},
  fr:{tab:'Proposition',title:'🤝 Générateur de Proposition',sub:'Propositions clients professionnelles avec grilles tarifaires',
      client:'Nom du Client',clientP:'ex. ACME Corp',project:'Type de Projet',projectP:'ex. Site E-commerce',
      basic:'Forfait Basique (€)',basicP:'ex. 2000',pro:'Forfait Pro (€)',proP:'ex. 4000',
      enterprise:'Entreprise (€)',enterpriseP:'ex. 8000',timeline:'Délai',timelineP:'ex. 4-6 semaines',
      about:'À propos de votre société',aboutP:'ex. Agence full-stack avec 5+ ans d\'expérience...',
      btn:'🤝 Générer la Proposition',inject:'💉 Injecter',copy:'📋 Copier'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

function buildHTML(d){
  var fr=gl()==='fr';
  var today=new Date().toLocaleDateString(fr?'fr-FR':'en-US');
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Proposal — '+(d.client||'Client')+'</title>'+
  '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">'+
  '<style>*{margin:0;padding:0;box-sizing:border-box;font-family:Inter,sans-serif}body{background:#050810;color:#e2e8f0;padding:40px;max-width:900px;margin:0 auto}'+
  'h1{font-size:36px;font-weight:900;background:linear-gradient(135deg,#6366f1,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:6px}'+
  '.sub{color:#64748b;margin-bottom:40px;font-size:14px}.section{margin-bottom:32px}'+
  '.sec-title{font-size:11px;font-weight:700;color:#475569;letter-spacing:2px;text-transform:uppercase;margin-bottom:14px;padding-bottom:8px;border-bottom:1px solid rgba(255,255,255,.06)}'+
  '.card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:24px}'+
  '.pricing{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}'+
  '.plan{border-radius:12px;padding:24px;border:1px solid rgba(255,255,255,.1);text-align:center}'+
  '.plan.pro{background:linear-gradient(135deg,rgba(99,102,241,.15),rgba(139,92,246,.1));border-color:rgba(139,92,246,.4)}'+
  '.plan-name{font-size:12px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px}'+
  '.plan-price{font-size:32px;font-weight:900;color:#fff;margin-bottom:4px}'+
  '.plan-badge{font-size:10px;color:#8b5cf6;margin-bottom:14px}.plan-feat{font-size:11px;color:#64748b;line-height:2}'+
  '.badge{background:rgba(139,92,246,.2);color:#a78bfa;font-size:10px;font-weight:700;padding:3px 10px;border-radius:20px;display:inline-block;margin-bottom:12px}'+
  '.sig{margin-top:40px;display:grid;grid-template-columns:1fr 1fr;gap:40px}'+
  '.sig-line{border-top:1px solid rgba(255,255,255,.15);padding-top:8px;font-size:12px;color:#475569}'+
  '@media print{body{background:#fff;color:#1e293b}h1{-webkit-text-fill-color:#1e293b}}</style></head><body>'+
  '<h1>'+(fr?'Proposition Commerciale':'Business Proposal')+'</h1>'+
  '<p class="sub">'+(fr?'Préparé pour':'Prepared for')+': <strong>'+(d.client||'Client')+'</strong> · '+today+'</p>'+
  '<div class="section"><div class="sec-title">'+(fr?'Résumé Exécutif':'Executive Summary')+'</div>'+
  '<div class="card"><p style="font-size:14px;color:#94a3b8;line-height:1.8;">'+(d.about||'We are experts in delivering high-quality digital solutions.')+
  '<br><br>'+(fr?'Nous proposons une solution pour':'We propose a solution for')+': <strong>'+(d.project||'your project')+'</strong>. '+
  (fr?'Délai estimé:':'Estimated timeline:')+' '+(d.timeline||'4-6 weeks')+'.</p></div></div>'+
  '<div class="section"><div class="sec-title">'+(fr?'Options Tarifaires':'Pricing Options')+'</div>'+
  '<div class="pricing">'+
  '<div class="plan"><div class="plan-name">'+(fr?'Basique':'Basic')+'</div><div class="plan-price">$'+(d.basic||'2,000')+'</div><div class="plan-badge">'+(fr?'Idéal pour démarrer':'Great to start')+'</div><div class="plan-feat">'+( fr?'✅ Pages essentielles<br>✅ Design responsive<br>✅ 2 révisions<br>⏱ 2-3 semaines':'✅ Core pages<br>✅ Responsive design<br>✅ 2 revisions<br>⏱ 2-3 weeks')+'</div></div>'+
  '<div class="plan pro"><div class="badge">⭐ '+(fr?'RECOMMANDÉ':'RECOMMENDED')+'</div><div class="plan-name">Pro</div><div class="plan-price">$'+(d.pro||'4,000')+'</div><div class="plan-badge">'+(fr?'Le meilleur rapport qualité-prix':'Best value')+'</div><div class="plan-feat">'+(fr?'✅ Tout Basique +<br>✅ CMS & Blog<br>✅ SEO optimisé<br>✅ 5 révisions<br>⏱ 4-5 semaines':'✅ All Basic +<br>✅ CMS & Blog<br>✅ SEO optimized<br>✅ 5 revisions<br>⏱ 4-5 weeks')+'</div></div>'+
  '<div class="plan"><div class="plan-name">Enterprise</div><div class="plan-price">$'+(d.enterprise||'8,000')+'</div><div class="plan-badge">'+(fr?'Solution complète':'Full solution')+'</div><div class="plan-feat">'+(fr?'✅ Tout Pro +<br>✅ E-commerce<br>✅ Intégrations API<br>✅ Support prioritaire<br>⏱ 6-8 semaines':'✅ All Pro +<br>✅ E-commerce<br>✅ API integrations<br>✅ Priority support<br>⏱ 6-8 weeks')+'</div></div>'+
  '</div></div>'+
  '<div class="section"><div class="sec-title">'+(fr?'Prochaines Étapes':'Next Steps')+'</div>'+
  '<div class="card"><p style="font-size:14px;color:#94a3b8;line-height:2;">'+
  '1. '+(fr?'Signez et retournez ce document':'Sign and return this document')+'<br>'+
  '2. '+(fr?'Versez l\'acompte initial (50%)':'Submit the initial deposit (50%)')+'<br>'+
  '3. '+(fr?'Réunion de lancement sous 48h':'Kickoff meeting within 48 hours')+'<br>'+
  '4. '+(fr?'Début du projet':'Project begins')+'</p></div></div>'+
  '<div class="sig"><div><div class="sig-line">'+(fr?'Signature du Prestataire':'Provider Signature')+'</div></div>'+
  '<div><div class="sig-line">'+(fr?'Signature du Client':'Client Signature')+'</div></div></div>'+
  '</body></html>';
}

function render(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(99,102,241,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(99,102,241,0.1),rgba(139,92,246,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#818cf8;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';
  var d={};
  [['client',t('client'),t('clientP')],['project',t('project'),t('projectP')],['basic',t('basic'),t('basicP')],['pro',t('pro'),t('proP')],['enterprise',t('enterprise'),t('enterpriseP')],['timeline',t('timeline'),t('timelineP')]].forEach(function(f){
    var row=document.createElement('div');
    var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=f[1];
    var i=document.createElement('input');i.id='pb-'+f[0];i.placeholder=f[2];
    i.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(99,102,241,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';
    i.oninput=function(){d[f[0]]=this.value;};row.appendChild(l);row.appendChild(i);body.appendChild(row);
  });
  var al=document.createElement('div');var ll=document.createElement('div');ll.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';ll.textContent=t('about');
  var ta=document.createElement('textarea');ta.id='pb-about';ta.placeholder=t('aboutP');ta.rows=3;
  ta.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(99,102,241,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;resize:none;';
  ta.oninput=function(){d.about=this.value;};al.appendChild(ll);al.appendChild(ta);body.appendChild(al);

  var btn=document.createElement('button');btn.innerHTML=t('btn');
  btn.style='width:100%;background:linear-gradient(135deg,#1e1b4b,#6366f1);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(99,102,241,0.35);';
  body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=t('inject');ib.style='flex:1;background:linear-gradient(135deg,#064e3b,#10b981);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=t('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);parent.appendChild(wrap);
  var html='';
  btn.onclick=function(){
    ['client','project','basic','pro','enterprise','timeline'].forEach(function(k){d[k]=(document.getElementById('pb-'+k)||{}).value||'';});
    d.about=ta.value;html=buildHTML(d);ar.style.display='flex';
    res.innerHTML='<div style="background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#818cf8;">✅ '+(gl()==='fr'?'Proposition générée — 3 packages':'Proposal generated — 3 packages')+'</div>';
    if(window.showToast)window.showToast('🤝 Proposal ready!');
  };
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 Copied!');});};
}

document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='proposal'){window.activeTab='proposal';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b=document.getElementById('tab-proposal');if(b)b.classList.add('active');render();return;}if(typeof oRT==='function')oRT(tab);};
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-proposal');if(el)el.textContent=t('tab');if(window.activeTab==='proposal')render();};
});
})();
