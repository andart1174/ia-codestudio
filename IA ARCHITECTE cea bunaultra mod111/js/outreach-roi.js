/**
 * 💌 Cold Outreach + 📊 ROI Calculator — EN/FR
 */
(function(){
'use strict';

/* ── COLD OUTREACH ── */
var COL={
  en:{tab:'Outreach',title:'💌 Cold Outreach Generator',sub:'Prospect emails with spam score + A/B variants',
      to:'Target Role/Company',toP:'e.g. SaaS Founder at TechCorp',pain:'Pain Point',painP:'e.g. Losing leads due to slow response',
      offer:'Your Offer',offerP:'e.g. AI chatbot that responds in <1 min',cta:'CTA',ctaP:'e.g. 15-min call this week?',
      btn:'✉️ Generate Emails',spamOk:'✅ Spam Score: Low','spamWarn':'⚠️ Spam Score: Medium',spamBad:'🚫 Spam Score: High',
      varA:'Variant A — Direct',varB:'Variant B — Story',copy:'📋 Copy',inject:'💉 Inject'},
  fr:{tab:'Outreach',title:'💌 Générateur Cold Outreach',sub:'Emails de prospection avec score spam + variantes A/B',
      to:'Rôle/Entreprise Cible',toP:'ex. Fondateur SaaS chez TechCorp',pain:'Point de Douleur',painP:'ex. Perd des leads à cause de réponses lentes',
      offer:'Votre Offre',offerP:'ex. Chatbot IA qui répond en <1 min',cta:'CTA',ctaP:'ex. Appel de 15 min cette semaine?',
      btn:'✉️ Générer les Emails',spamOk:'✅ Score Spam: Faible','spamWarn':'⚠️ Score Spam: Moyen',spamBad:'🚫 Score Spam: Élevé',
      varA:'Variante A — Direct',varB:'Variante B — Histoire',copy:'📋 Copier',inject:'💉 Injecter'}
};
function glC(){return window.lang||'en';}
function tc(k){return(COL[glC()]||COL.en)[k]||k;}

var SPAM_WORDS=['free','guaranteed','limited time','act now','click here','urgent','winner','prize','congratulations','no risk','100%','amazing deal','buy now','cash','discount','earn money','extra income','make money','offer expires','once in a lifetime','order now','special offer','this won\'t last'];

function spamScore(text){
  var t=text.toLowerCase();var hits=SPAM_WORDS.filter(function(w){return t.includes(w);});
  return{score:hits.length,words:hits};
}

function genEmails(to,pain,offer,cta){
  var isFr=glC()==='fr';
  var subA=isFr?'Question rapide sur '+to:'Quick question about '+to;
  var subB=isFr?'Comment nous avons résolu '+pain:'How we solved '+pain;
  var emailA=(isFr?'Bonjour,\n\nJe remarque que beaucoup de '+to+' font face à '+pain+'.\n\nNous aidons les entreprises avec '+offer+'.\n\n'+cta+'\n\nCordialement,\n[Votre Nom]':'Hi,\n\nI noticed that many '+to+' struggle with '+pain+'.\n\nWe help companies with '+offer+'.\n\n'+cta+'\n\nBest,\n[Your Name]');
  var emailB=(isFr?'Bonjour,\n\nIl y a 3 mois, l\'un de nos clients avait exactement votre problème: '+pain+'.\n\nAprès avoir utilisé '+offer+', ils ont augmenté leurs résultats de 40%.\n\nCela vous parle? '+cta+'\n\nCordialement,\n[Votre Nom]':'Hi,\n\n3 months ago, one of our clients had your exact problem: '+pain+'.\n\nAfter using '+offer+', they saw 40% better results.\n\nDoes this resonate? '+cta+'\n\nBest,\n[Your Name]');
  return{subA:subA,subB:subB,emailA:emailA,emailB:emailB};
}

function renderOutreach(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(236,72,153,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(236,72,153,0.1),rgba(168,85,247,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#f472b6;">'+tc('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tc('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:7px;';

  function fi(id,lbl,ph,area){
    var d=document.createElement('div');
    var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;
    var i=area?document.createElement('textarea'):document.createElement('input');
    i.id='co-'+id;i.placeholder=ph;if(area){i.rows=2;i.style='resize:none;';}
    i.style=(i.style.cssText||'')+'width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(236,72,153,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';
    d.appendChild(l);d.appendChild(i);return d;
  }
  body.appendChild(fi('to',tc('to'),tc('toP')));
  body.appendChild(fi('pain',tc('pain'),tc('painP'),true));
  body.appendChild(fi('offer',tc('offer'),tc('offerP'),true));
  body.appendChild(fi('cta',tc('cta'),tc('ctaP')));

  var btn=document.createElement('button');btn.innerHTML=tc('btn');
  btn.style='width:100%;background:linear-gradient(135deg,#831843,#ec4899);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;';
  body.appendChild(btn);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);parent.appendChild(wrap);

  btn.onclick=function(){
    var to=document.getElementById('co-to').value||'SaaS Founders';
    var pain=document.getElementById('co-pain').value||'slow lead response';
    var offer=document.getElementById('co-offer').value||'our AI solution';
    var cta=document.getElementById('co-cta').value||'15-min call?';
    var emails=genEmails(to,pain,offer,cta);
    var spA=spamScore(emails.emailA);var spB=spamScore(emails.emailB);
    function spLabel(n){return n===0?tc('spamOk'):n<=2?tc('spamWarn'):tc('spamBad');}
    function spColor(n){return n===0?'#22c55e':n<=2?'#f59e0b':'#ef4444';}
    function emailCard(subj,body,spN,varLabel){
      return'<div style="background:rgba(236,72,153,0.06);border:1px solid rgba(236,72,153,0.2);border-radius:8px;padding:10px;margin-bottom:6px;">'+
        '<div style="display:flex;justify-content:space-between;margin-bottom:6px;">'+
        '<div style="font-size:10px;font-weight:700;color:#f472b6;">'+varLabel+'</div>'+
        '<div style="font-size:9px;color:'+spColor(spN)+';">'+spLabel(spN)+'</div></div>'+
        '<div style="font-size:9px;color:#94a3b8;margin-bottom:4px;"><b style="color:#e2e8f0;">Subject:</b> '+subj+'</div>'+
        '<div style="font-size:9px;color:#94a3b8;white-space:pre-wrap;line-height:1.6;max-height:120px;overflow-y:auto;">'+body+'</div>'+
        '<button onclick="navigator.clipboard.writeText(\'Subject: '+subj.replace(/'/g,"\\'")+'\\n\\n'+body.replace(/'/g,"\\'").replace(/\n/g,'\\n')+'\')" style="width:100%;background:rgba(255,255,255,0.05);color:#94a3b8;border:1px solid rgba(255,255,255,0.1);padding:5px;border-radius:5px;font-size:9px;font-weight:700;cursor:pointer;margin-top:6px;">📋 Copy Email</button>'+
        '</div>';
    }
    res.innerHTML=emailCard(emails.subA,emails.emailA,spA.score,tc('varA'))+emailCard(emails.subB,emails.emailB,spB.score,tc('varB'));
    if(window.showToast)window.showToast('💌 Emails generated!');
  };
}

document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;
  window.renderTab=function(tab){
    if(tab==='outreach'){window.activeTab='outreach';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b=document.getElementById('tab-outreach');if(b)b.classList.add('active');renderOutreach();return;}
    if(typeof oRT==='function')oRT(tab);
  };
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-outreach');if(el)el.textContent=tc('tab');if(window.activeTab==='outreach')renderOutreach();};
});

/* ── ROI & BREAK-EVEN ── */
var ROI={
  en:{tab:'ROI Calc',title:'📊 ROI & Break-Even Calculator',sub:'MRR/ARR, ROI, Break-even for SaaS & business',
      inv:'Investment ($)',rev:'Monthly Revenue ($)',costs:'Monthly Costs ($)',months:'Period (months)',
      price:'Product Price ($)',cac:'Cust. Acq. Cost ($)',ltv:'Avg LTV ($)',btn:'📊 Calculate',
      roi:'ROI',breakeven:'Break-Even',mrr:'MRR',arr:'ARR',payback:'Payback Period',margin:'Profit Margin'},
  fr:{tab:'ROI Calc',title:'📊 Calculateur ROI & Seuil de Rentabilité',sub:'MRR/ARR, ROI, seuil rentabilité pour SaaS',
      inv:'Investissement (€)',rev:'Revenu Mensuel (€)',costs:'Coûts Mensuels (€)',months:'Période (mois)',
      price:'Prix Produit (€)',cac:'Coût Acq. Client (€)',ltv:'LTV Moy. (€)',btn:'📊 Calculer',
      roi:'ROI',breakeven:'Seuil Rentabilité',mrr:'MRR',arr:'ARR',payback:'Délai Remboursement',margin:'Marge Bénéficiaire'}
};
function glR(){return window.lang||'en';}
function tr(k){return(ROI[glR()]||ROI.en)[k]||k;}

function renderROI(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(99,102,241,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(99,102,241,0.1),rgba(59,130,246,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#818cf8;">'+tr('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tr('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  var fields=[['inv',tr('inv'),'50000'],['rev',tr('rev'),'8000'],['costs',tr('costs'),'5000'],['months',tr('months'),'12'],['price',tr('price'),'99'],['cac',tr('cac'),'200'],['ltv',tr('ltv'),'1200']];
  var vals={inv:50000,rev:8000,costs:5000,months:12,price:99,cac:200,ltv:1200};
  fields.forEach(function(f){
    var d=document.createElement('div');d.style='display:flex;align-items:center;gap:8px;';
    var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;flex:1;min-width:0;';l.textContent=f[1];
    var i=document.createElement('input');i.type='number';i.id='roi-'+f[0];i.value=f[2];
    i.style='width:80px;background:#0d1117;color:#e2e8f0;border:1px solid rgba(99,102,241,0.25);border-radius:6px;padding:5px 7px;font-size:10px;outline:none;text-align:right;';
    i.oninput=function(){vals[f[0]]=parseFloat(this.value)||0;};
    d.appendChild(l);d.appendChild(i);body.appendChild(d);
  });

  var btn=document.createElement('button');btn.innerHTML=tr('btn');
  btn.style='width:100%;background:linear-gradient(135deg,#1e1b4b,#6366f1);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:4px;';
  body.appendChild(btn);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);parent.appendChild(wrap);

  btn.onclick=function(){
    fields.forEach(function(f){vals[f[0]]=parseFloat(document.getElementById('roi-'+f[0]).value)||0;});
    var totalRev=vals.rev*vals.months;
    var totalCosts=vals.costs*vals.months+vals.inv;
    var roi=totalCosts>0?Math.round((totalRev-totalCosts)/totalCosts*100):0;
    var monthlyProfit=vals.rev-vals.costs;
    var breakeven=monthlyProfit>0?Math.ceil(vals.inv/monthlyProfit):Infinity;
    var mrr=vals.rev;var arr=mrr*12;
    var margin=vals.rev>0?Math.round((vals.rev-vals.costs)/vals.rev*100):0;
    var payback=vals.price>0&&vals.cac>0?Math.ceil(vals.cac/vals.price):0;
    function kpi(label,val,color,sub){
      return'<div style="background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.2);border-radius:8px;padding:10px;text-align:center;">'+
        '<div style="font-size:18px;font-weight:900;color:'+color+';">'+val+'</div>'+
        '<div style="font-size:9px;color:#64748b;margin-top:2px;">'+label+'</div>'+
        (sub?'<div style="font-size:8px;color:#475569;margin-top:1px;">'+sub+'</div>':'')+
        '</div>';
    }
    res.innerHTML='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px;">'+
      kpi(tr('roi'),(roi>=0?'+':'')+roi+'%',roi>=0?'#22c55e':'#ef4444','Total '+vals.months+' months')+
      kpi(tr('breakeven'),breakeven===Infinity?'Never':breakeven+' mo',breakeven<12?'#22c55e':breakeven<24?'#f59e0b':'#ef4444','')+
      kpi(tr('mrr'),'$'+mrr.toLocaleString(),'#818cf8','Monthly Recurring')+
      kpi(tr('arr'),'$'+arr.toLocaleString(),'#6366f1','Annual Recurring')+
      kpi(tr('margin'),margin+'%',margin>30?'#22c55e':margin>10?'#f59e0b':'#ef4444','Profit margin')+
      kpi(tr('payback'),payback+' mo',payback<6?'#22c55e':payback<12?'#f59e0b':'#ef4444','CAC recovery')+
      '</div>'+
      '<div style="background:rgba(99,102,241,0.05);border:1px solid rgba(99,102,241,0.15);border-radius:8px;padding:9px;margin-top:6px;font-size:9px;color:#818cf8;">'+
      '💡 LTV/CAC Ratio: '+(vals.cac>0?(vals.ltv/vals.cac).toFixed(1):'N/A')+' '+( vals.ltv/vals.cac>3?'✅ Healthy (>3)':'⚠️ Optimize acquisition costs')+
      '</div>';
    if(window.showToast)window.showToast('📊 ROI calculated!');
  };
}

document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;
  window.renderTab=function(tab){
    if(tab==='roicalc'){window.activeTab='roicalc';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b=document.getElementById('tab-roicalc');if(b)b.classList.add('active');renderROI();return;}
    if(typeof oRT==='function')oRT(tab);
  };
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-roicalc');if(el)el.textContent=tr('tab');if(window.activeTab==='roicalc')renderROI();};
});
})();
