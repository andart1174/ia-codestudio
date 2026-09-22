/**
 * 📅 Content Calendar + 🧾 Contract Builder — EN/FR
 */
(function(){
'use strict';
/* ── CONTENT CALENDAR ── */
var CC={
  en:{tab:'Calendar',title:'📅 Content Calendar',sub:'Plan social media content with auto-fill ideas',
      brand:'Brand/Topic',brandP:'e.g. SaaS startup',niche:'Niche',nicheP:'e.g. productivity',
      platforms:'Platforms',btn:'📅 Generate Week Plan',inject:'💉 Inject Calendar',copy:'📋 Copy',
      days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      types:['Post','Story','Reel','Thread','Newsletter'],
      bestTimes:{'LinkedIn':'8-10am','Instagram':'11am-1pm','Twitter':'12-3pm','TikTok':'6-9pm','Facebook':'1-4pm'}},
  fr:{tab:'Calendrier',title:'📅 Calendrier de Contenu',sub:'Planifiez votre contenu avec idées auto-générées',
      brand:'Marque/Sujet',brandP:'ex. Startup SaaS',niche:'Niche',nicheP:'ex. productivité',
      platforms:'Plateformes',btn:'📅 Générer le Plan Semaine',inject:'💉 Injecter Calendrier',copy:'📋 Copier',
      days:['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'],
      types:['Post','Story','Reel','Thread','Newsletter'],
      bestTimes:{'LinkedIn':'8h-10h','Instagram':'11h-13h','Twitter':'12h-15h','TikTok':'18h-21h','Facebook':'13h-16h'}}
};
var PLATFORMS=['LinkedIn','Instagram','Twitter','TikTok','Facebook'];
var IDEAS=[
  ['5 tips for {niche}','Behind the scenes of {brand}','Client success story','How we built {brand}','Common {niche} mistakes'],
  ['Day in the life at {brand}','Quick {niche} hack','User testimonial','Product demo clip','Fun fact about {niche}'],
  ['Thread: The future of {niche}','Poll: Your biggest {niche} challenge','Case study: +40% results','Free resource for {niche}','Weekly wrap-up']
];
function glCC(){return window.lang||'en';}
function tcc(k){return(CC[glCC()]||CC.en)[k]||k;}
var ccState={brand:'',niche:'',platforms:['LinkedIn','Instagram']};

function renderCalendar(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(249,115,22,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(249,115,22,0.1),rgba(234,179,8,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#fb923c;">'+tcc('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tcc('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:7px;';

  function fi(id,lbl,ph){var d=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;var i=document.createElement('input');i.id='cc-'+id;i.placeholder=ph;i.value=ccState[id]||'';i.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(249,115,22,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){ccState[id]=this.value;};d.appendChild(l);d.appendChild(i);return d;}
  body.appendChild(fi('brand',tcc('brand'),tcc('brandP')));
  body.appendChild(fi('niche',tcc('niche'),tcc('nicheP')));

  var platLbl=document.createElement('div');platLbl.style='font-size:9px;color:#94a3b8;font-weight:700;';platLbl.textContent=tcc('platforms');body.appendChild(platLbl);
  var platRow=document.createElement('div');platRow.style='display:flex;gap:4px;flex-wrap:wrap;';
  PLATFORMS.forEach(function(p){var b=document.createElement('button');b.textContent=p;b.dataset.p=p;var on=ccState.platforms.includes(p);b.style='padding:4px 9px;border-radius:20px;font-size:9px;font-weight:700;cursor:pointer;border:1px solid rgba(249,115,22,'+(on?'0.7)':'0.25)')+';background:rgba(249,115,22,'+(on?'0.2)':'0.05)')+';color:'+(on?'#fb923c':'#64748b')+';';b.onclick=function(){if(ccState.platforms.includes(p))ccState.platforms=ccState.platforms.filter(function(x){return x!==p;});else ccState.platforms.push(p);document.querySelectorAll('[data-p]').forEach(function(x){var on2=ccState.platforms.includes(x.dataset.p);x.style.borderColor='rgba(249,115,22,'+(on2?'0.7)':'0.25)');x.style.background='rgba(249,115,22,'+(on2?'0.2)':'0.05)');x.style.color=on2?'#fb923c':'#64748b';});};platRow.appendChild(b);});
  body.appendChild(platRow);

  var btn=document.createElement('button');btn.innerHTML=tcc('btn');btn.style='width:100%;background:linear-gradient(135deg,#7c2d12,#f97316);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;';body.appendChild(btn);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);parent.appendChild(wrap);
  var lastHTML='';

  btn.onclick=function(){
    var brand=document.getElementById('cc-brand').value||'YourBrand';
    var niche=document.getElementById('cc-niche').value||'your niche';
    var days=tcc('days');var types=tcc('types');
    var bestTimes=tcc('bestTimes');
    var colors=['#3b82f6','#ec4899','#1d9bf0','#ff0050','#1877f2'];
    var weekHTML='';
    days.forEach(function(day,di){
      var ideaSet=IDEAS[di%3];var ideaRaw=ideaSet[di%ideaSet.length];
      var idea=ideaRaw.replace(/{brand}/g,brand).replace(/{niche}/g,niche);
      var platIdx=di%ccState.platforms.length;var plat=ccState.platforms[platIdx]||'LinkedIn';
      var time=bestTimes[plat]||'9am';var type=types[di%types.length];
      var c=colors[platIdx%colors.length];
      weekHTML+='<div style="background:rgba(249,115,22,0.06);border:1px solid rgba(249,115,22,0.15);border-radius:8px;padding:8px;margin-bottom:5px;">'+
        '<div style="display:flex;justify-content:space-between;margin-bottom:4px;">'+
        '<div style="font-size:10px;font-weight:700;color:#fb923c;">'+day+'</div>'+
        '<div style="display:flex;gap:4px;"><span style="background:'+c+'22;color:'+c+';font-size:8px;font-weight:700;padding:2px 6px;border-radius:20px;">'+plat+'</span>'+
        '<span style="background:rgba(255,255,255,0.06);color:#64748b;font-size:8px;padding:2px 6px;border-radius:20px;">'+type+'</span></div></div>'+
        '<div style="font-size:10px;color:#e2e8f0;margin-bottom:3px;">'+idea+'</div>'+
        '<div style="font-size:8px;color:#64748b;">⏰ Best time: '+time+'</div></div>';
    });
    res.innerHTML='<div style="margin-top:6px;">'+weekHTML+'<button onclick="navigator.clipboard&&navigator.clipboard.writeText(this.previousElementSibling.innerText)" style="width:100%;background:rgba(249,115,22,0.1);color:#fb923c;border:1px solid rgba(249,115,22,0.25);padding:7px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;margin-top:4px;">📋 Copy Plan</button></div>';
    if(window.showToast)window.showToast('📅 Content calendar generated!');
  };
}

document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='contentcal'){window.activeTab='contentcal';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b=document.getElementById('tab-contentcal');if(b)b.classList.add('active');renderCalendar();return;}if(typeof oRT==='function')oRT(tab);};
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-contentcal');if(el)el.textContent=tcc('tab');if(window.activeTab==='contentcal')renderCalendar();};
});

/* ── CONTRACT BUILDER ── */
var CB={
  en:{tab:'Contract',title:'🧾 Contract Builder',sub:'Freelance contracts with Risk Score — EN/FR ready',
      client:'Client Name',clientP:'e.g. ACME Corp',service:'Service Type',serviceP:'e.g. Web Development',
      rate:'Rate',rateP:'e.g. $5000',payment:'Payment Terms',paymentP:'e.g. 50% upfront, 50% on delivery',
      revisions:'Revisions Included',revisionsP:'e.g. 3 rounds',deadline:'Deadline',deadlineP:'e.g. 30 days',
      ip:'IP Rights',ipP:'e.g. Full transfer upon final payment',
      btn:'🧾 Generate Contract',inject:'💉 Inject Contract',copy:'📋 Copy',risk:'Risk Score'},
  fr:{tab:'Contrat',title:'🧾 Générateur de Contrat',sub:'Contrats freelance avec Score de Risque',
      client:'Nom du Client',clientP:'ex. ACME Corp',service:'Type de Service',serviceP:'ex. Développement Web',
      rate:'Tarif',rateP:'ex. 5000€',payment:'Conditions de Paiement',paymentP:'ex. 50% à la commande, 50% à la livraison',
      revisions:'Révisions Incluses',revisionsP:'ex. 3 allers-retours',deadline:'Délai',deadlineP:'ex. 30 jours',
      ip:'Droits PI',ipP:'ex. Cession totale après paiement final',
      btn:'🧾 Générer le Contrat',inject:'💉 Injecter le Contrat',copy:'📋 Copier',risk:'Score de Risque'}
};
function glCB(){return window.lang||'en';}
function tcb(k){return(CB[glCB()]||CB.en)[k]||k;}

function calcRisk(data){
  var score=0;var issues=[];
  if(!data.payment||data.payment.includes('100%')){score+=30;issues.push('No upfront payment — high non-payment risk');}
  if(!data.revisions||data.revisions===''){score+=15;issues.push('Unlimited revisions — scope creep risk');}
  if(!data.ip){score+=10;issues.push('IP rights unclear');}
  if(!data.deadline){score+=10;issues.push('No deadline defined — project may drag on');}
  return{score:Math.min(score,100),issues:issues};
}

function buildContractHTML(data){
  var isFr=glCB()==='fr';var today=new Date().toLocaleDateString(isFr?'fr-FR':'en-US');
  var freelancer=isFr?'[Votre Nom / Entreprise]':'[Your Name / Company]';
  var body=isFr?
    'CONTRAT DE PRESTATION DE SERVICES\n'+'='.repeat(40)+'\n\nDate: '+today+'\nPrestataire: '+freelancer+'\nClient: '+(data.client||'[Client]')+'\n\n1. OBJET DU CONTRAT\nLe Prestataire s\'engage à réaliser: '+(data.service||'[Service]')+'.\n\n2. TARIF ET PAIEMENT\nTarif convenu: '+(data.rate||'[Tarif]')+'\nConditions: '+(data.payment||'50% à la commande, 50% à la livraison')+'\n\n3. DÉLAI DE LIVRAISON\nDélai estimé: '+(data.deadline||'[Délai]')+'\n\n4. RÉVISIONS\nNombre de révisions incluses: '+(data.revisions||'3 allers-retours')+'\nRévisions supplémentaires facturées au tarif horaire.\n\n5. DROITS DE PROPRIÉTÉ INTELLECTUELLE\n'+(data.ip||'Cession totale des droits au Client après paiement intégral.')+'\n\n6. CONFIDENTIALITÉ\nChaque partie s\'engage à ne pas divulguer les informations confidentielles.\n\n7. RÉSILIATION\nChaque partie peut résilier avec 15 jours de préavis écrit.\n\nSignatures:\n\nPrestataire: ___________________  Date: ___________\nClient: ___________________  Date: ___________':
    'SERVICE AGREEMENT\n'+'='.repeat(40)+'\n\nDate: '+today+'\nService Provider: '+freelancer+'\nClient: '+(data.client||'[Client]')+'\n\n1. SCOPE OF WORK\nThe Provider agrees to deliver: '+(data.service||'[Service]')+'.\n\n2. FEES & PAYMENT\nAgreed fee: '+(data.rate||'[Rate]')+'\nPayment terms: '+(data.payment||'50% upfront, 50% on delivery')+'\n\n3. TIMELINE\nEstimated delivery: '+(data.deadline||'[Timeline]')+'\n\n4. REVISIONS\nRevisions included: '+(data.revisions||'3 rounds')+'\nAdditional revisions billed at hourly rate.\n\n5. INTELLECTUAL PROPERTY\n'+(data.ip||'Full IP transfer to Client upon final payment.')+'\n\n6. CONFIDENTIALITY\nBoth parties agree to keep all project information confidential.\n\n7. TERMINATION\nEither party may terminate with 15 days written notice.\n\nSignatures:\n\nProvider: ___________________  Date: ___________\nClient: ___________________  Date: ___________';
  return'<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Contract — '+( data.service||'Service')+'</title>'+
    '<style>body{font-family:Georgia,serif;max-width:750px;margin:40px auto;color:#1e293b;line-height:1.8;padding:0 20px;}h1{font-size:24px;border-bottom:3px solid #1e293b;padding-bottom:10px;}pre{white-space:pre-wrap;font-family:Georgia,serif;font-size:14px;}@media print{body{margin:0;}}</style>'+
    '</head><body><pre>'+body+'</pre></body></html>';
}

function renderContract(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(74,222,128,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(74,222,128,0.1),rgba(16,185,129,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#4ade80;">'+tcb('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tcb('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';
  var data={};
  var fields=[['client',tcb('client'),tcb('clientP')],['service',tcb('service'),tcb('serviceP')],['rate',tcb('rate'),tcb('rateP')],['payment',tcb('payment'),tcb('paymentP')],['revisions',tcb('revisions'),tcb('revisionsP')],['deadline',tcb('deadline'),tcb('deadlineP')],['ip',tcb('ip'),tcb('ipP')]];
  fields.forEach(function(f){
    var d=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=f[1];
    var i=document.createElement('input');i.id='cb-'+f[0];i.placeholder=f[2];
    i.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(74,222,128,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';
    i.oninput=function(){data[f[0]]=this.value;};d.appendChild(l);d.appendChild(i);body.appendChild(d);
  });

  var btn=document.createElement('button');btn.innerHTML=tcb('btn');btn.style='width:100%;background:linear-gradient(135deg,#14532d,#22c55e);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;';body.appendChild(btn);
  var actRow=document.createElement('div');actRow.style='display:none;gap:6px;';
  var injBtn=document.createElement('button');injBtn.innerHTML=tcb('inject');injBtn.style='flex:1;background:linear-gradient(135deg,#1e1b4b,#6366f1);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cpBtn=document.createElement('button');cpBtn.innerHTML=tcb('copy');cpBtn.style='flex:1;background:rgba(255,255,255,0.06);color:#94a3b8;border:1px solid rgba(255,255,255,0.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  actRow.appendChild(injBtn);actRow.appendChild(cpBtn);body.appendChild(actRow);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);parent.appendChild(wrap);
  var lastHTML='';

  btn.onclick=function(){
    fields.forEach(function(f){data[f[0]]=(document.getElementById('cb-'+f[0])||{}).value||'';});
    var risk=calcRisk(data);lastHTML=buildContractHTML(data);actRow.style.display='flex';
    var rCol=risk.score<30?'#22c55e':risk.score<60?'#f59e0b':'#ef4444';
    res.innerHTML='<div style="background:rgba(74,222,128,0.06);border:1px solid rgba(74,222,128,0.2);border-radius:8px;padding:10px;margin-top:4px;">'+
      '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">'+
      '<div style="font-size:9px;color:#94a3b8;font-weight:700;">'+tcb('risk')+':</div>'+
      '<div style="flex:1;background:#1e293b;border-radius:4px;height:8px;overflow:hidden;"><div style="width:'+risk.score+'%;height:100%;background:'+rCol+';border-radius:4px;"></div></div>'+
      '<div style="font-size:11px;font-weight:700;color:'+rCol+';">'+risk.score+'/100</div></div>'+
      (risk.issues.length?risk.issues.map(function(i){return'<div style="font-size:9px;color:#f87171;padding:2px 0;">⚠️ '+i+'</div>';}).join(''):'<div style="font-size:9px;color:#4ade80;">✅ Contract looks solid!</div>')+
      '</div>';
    if(window.showToast)window.showToast('🧾 Contract generated!');
  };
  injBtn.onclick=function(){if(!lastHTML)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(lastHTML);if(window.showToast)window.showToast('✅ Contract injected!');}};
  cpBtn.onclick=function(){if(lastHTML&&navigator.clipboard)navigator.clipboard.writeText(lastHTML).then(function(){if(window.showToast)window.showToast('📋 Copied!');});};
}

document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='contract'){window.activeTab='contract';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b=document.getElementById('tab-contract');if(b)b.classList.add('active');renderContract();return;}if(typeof oRT==='function')oRT(tab);};
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-contract');if(el)el.textContent=tcb('tab');if(window.activeTab==='contract')renderContract();};
});
})();
