/**
 * App Business Validator v1.0 — EN/FR
 * Describe app idea → market score, competition, monetization, risks
 */
(function(){
'use strict';
var TX={
  en:{tab:'Validate',title:'🧠 App Business Validator',sub:'Describe your app idea → get market analysis',
      idea:'Describe your app idea:',ph:'Example: A mobile app that helps people track their daily water intake with AI-powered reminders...',
      btnVal:'🧠 Validate Idea',market:'📈 Market Potential',competition:'⚔️ Competition Level',
      monetization:'💰 Monetization',risks:'⚠️ Risks',score:'Business Score:',btnCopy:'📋 Copy Report',
      copied:'Copied!',recommend:'🎯 Recommendations:'},
  fr:{tab:'Validate',title:'🧠 Validateur Business',sub:'Décrivez votre idée → analyse de marché',
      idea:'Décrivez votre idée :',ph:'Exemple: Une app mobile qui aide les gens à suivre leur consommation d\'eau quotidienne...',
      btnVal:'🧠 Valider l\'Idée',market:'📈 Potentiel de Marché',competition:'⚔️ Niveau de Concurrence',
      monetization:'💰 Monétisation',risks:'⚠️ Risques',score:'Score Business :',btnCopy:'📋 Copier',
      copied:'Copié !',recommend:'🎯 Recommandations :'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

// Pattern-based analysis engine
var KEYWORDS={
  saas:     ['subscription','saas','software','dashboard','crm','erp','tool','platform','manage','manage','automate','workflow','api'],
  ecommerce:['shop','store','sell','buy','product','marketplace','ecommerce','retail','order','cart','payment','checkout'],
  social:   ['social','community','chat','message','share','post','follow','like','network','friend','group','forum'],
  health:   ['health','fitness','workout','diet','nutrition','mental','therapy','medical','doctor','sleep','track','habit'],
  education:['learn','course','tutorial','quiz','study','school','teach','student','education','skill','certificate'],
  finance:  ['finance','money','invest','budget','crypto','payment','bank','saving','expense','tax','wallet'],
  ai:       ['ai','machine learning','neural','gpt','predict','recommend','analyze','smart','auto','intelligent'],
  mobile:   ['mobile','app','ios','android','phone','tablet'],
  b2b:      ['business','enterprise','company','team','corporate','client','agency','b2b','professional'],
  b2c:      ['consumer','user','people','personal','individual','everyone']
};

function detectCategories(text){
  var t=text.toLowerCase();var found=[];
  Object.keys(KEYWORDS).forEach(function(cat){if(KEYWORDS[cat].some(function(k){return t.includes(k);}))found.push(cat);});
  return found;
}

function analyze(idea){
  var cats=detectCategories(idea);var lx=gl();
  var marketScore=50,competitionScore=50,monoScore=60,riskScore=40;
  var monetization=[],risks=[],recommendations=[];

  // Adjust scores by category
  if(cats.includes('ai')){marketScore+=20;monoScore+=15;}
  if(cats.includes('saas')){marketScore+=15;monoScore+=20;competitionScore+=15;}
  if(cats.includes('b2b')){marketScore+=10;monoScore+=25;competitionScore-=10;}
  if(cats.includes('ecommerce')){competitionScore+=25;riskScore+=15;monoScore+=10;}
  if(cats.includes('social')){competitionScore+=30;riskScore+=20;marketScore+=10;}
  if(cats.includes('health')){marketScore+=20;riskScore+=15;}
  if(cats.includes('finance')){marketScore+=15;riskScore+=25;monoScore+=20;}
  if(cats.includes('education')){marketScore+=10;monoScore+=15;}
  if(cats.includes('mobile')){marketScore+=5;competitionScore+=10;}

  // Cap scores
  marketScore=Math.min(95,Math.max(20,marketScore));
  competitionScore=Math.min(95,Math.max(10,competitionScore));
  monoScore=Math.min(95,Math.max(20,monoScore));
  riskScore=Math.min(85,Math.max(10,riskScore));

  // Monetization suggestions
  if(cats.includes('saas')||cats.includes('b2b'))monetization.push(lx==='fr'?'Abonnement mensuel/annuel (SaaS) — $29-$299/mois':'Monthly/Annual SaaS subscription — $29-$299/mo');
  if(cats.includes('ecommerce'))monetization.push(lx==='fr'?'Commission sur ventes (5-15%)':'Transaction commission (5-15%)');
  if(cats.includes('education'))monetization.push(lx==='fr'?'Cours premium + certificats':'Premium courses + certificates');
  if(cats.includes('social'))monetization.push(lx==='fr'?'Freemium + publicités + fonctions premium':'Freemium + ads + premium features');
  if(cats.includes('health'))monetization.push(lx==='fr'?'Abonnement + coach personnel':'Subscription + personal coaching');
  if(cats.includes('finance'))monetization.push(lx==='fr'?'Frais de transaction + premium':'Transaction fees + premium plan');
  if(monetization.length===0)monetization.push(lx==='fr'?'Freemium + abonnement premium':'Freemium + premium subscription',lx==='fr'?'Publicités':'In-app advertising');

  // Risks
  if(competitionScore>70)risks.push(lx==='fr'?'Marché très compétitif — différenciation critique':'Highly competitive market — differentiation is critical');
  if(cats.includes('social'))risks.push(lx==='fr'?'Effet réseau difficile à construire':'Network effect hard to bootstrap');
  if(cats.includes('finance'))risks.push(lx==='fr'?'Conformité réglementaire (PCI-DSS, GDPR)':'Regulatory compliance (PCI-DSS, GDPR)');
  if(cats.includes('health'))risks.push(lx==='fr'?'Responsabilité médicale et conformité HIPAA':'Medical liability and HIPAA compliance');
  if(cats.includes('ai'))risks.push(lx==='fr'?'Coûts API AI élevés à grande échelle':'AI API costs at scale');
  if(risks.length===0)risks.push(lx==='fr'?'Adoption initiale et rétention utilisateurs':'Initial adoption and user retention');

  // Recommendations
  if(marketScore>70)recommendations.push(lx==='fr'?'✅ Forte opportunité — lancez un MVP rapidement':'✅ Strong opportunity — launch an MVP fast');
  if(competitionScore>75)recommendations.push(lx==='fr'?'🎯 Nichage essentiel — trouvez votre segment unique':'🎯 Niche down — find your unique segment');
  if(cats.includes('b2b'))recommendations.push(lx==='fr'?'🤝 Démarrez avec 3-5 clients pilotes':'🤝 Start with 3-5 pilot customers');
  if(cats.includes('ai'))recommendations.push(lx==='fr'?'🤖 Utilisez GPT-4o API pour réduire le temps de dev':'🤖 Use GPT-4o API to reduce dev time');
  recommendations.push(lx==='fr'?'📋 Validez avec 10 interviews utilisateurs avant de coder':'📋 Validate with 10 user interviews before coding');

  var businessScore=Math.round((marketScore*0.35)+(monoScore*0.35)+((100-competitionScore)*0.15)+((100-riskScore)*0.15));
  return{businessScore:businessScore,market:marketScore,competition:competitionScore,mono:monoScore,risk:riskScore,monetization:monetization,risks:risks,recommendations:recommendations,cats:cats};
}

function getColor(s){return s>=75?'#22c55e':s>=55?'#f59e0b':s>=35?'#f97316':'#ef4444';}
function getLabel(s){return s>=75?'A+':s>=55?'B':s>=35?'C':'D';}

var lastIdea='';var lastReport='';
function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(34,197,94,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(34,197,94,0.1),rgba(16,185,129,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#4ade80;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:7px;';

  var ideaLbl=document.createElement('div');ideaLbl.style='font-size:10px;color:#64748b;font-weight:600;';ideaLbl.textContent=t('idea');body.appendChild(ideaLbl);
  var ta=document.createElement('textarea');ta.value=lastIdea;ta.placeholder=t('ph');ta.rows=5;
  ta.style='background:#0d1117;color:#e2e8f0;border:1px solid rgba(34,197,94,0.2);border-radius:8px;padding:9px;font-size:10px;outline:none;resize:vertical;width:100%;box-sizing:border-box;line-height:1.5;';
  ta.oninput=function(){lastIdea=this.value;};body.appendChild(ta);

  var valBtn=document.createElement('button');valBtn.innerHTML=t('btnVal');
  valBtn.style='width:100%;background:linear-gradient(135deg,#064e3b,#10b981);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(16,185,129,0.3);';
  body.appendChild(valBtn);

  var resultsDiv=document.createElement('div');body.appendChild(resultsDiv);
  wrap.appendChild(body);parent.appendChild(wrap);

  valBtn.onclick=function(){
    var idea=ta.value.trim();if(!idea)return;
    lastIdea=idea;resultsDiv.innerHTML='';
    var r=analyze(idea);

    // Business Score
    var grade=getLabel(r.businessScore);var gc=getColor(r.businessScore);
    var sb=document.createElement('div');sb.style='display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:12px;';
    var gd=document.createElement('div');gd.style='font-size:40px;font-weight:900;color:'+gc+';line-height:1;';gd.textContent=grade;
    var si=document.createElement('div');si.style='flex:1;';
    var bb=document.createElement('div');bb.style='height:7px;background:#1e293b;border-radius:4px;overflow:hidden;margin-bottom:4px;';
    var bf=document.createElement('div');bf.style='height:100%;width:'+r.businessScore+'%;background:'+gc+';border-radius:4px;';bb.appendChild(bf);si.appendChild(bb);
    var st=document.createElement('div');st.style='font-size:11px;color:#94a3b8;';st.textContent=t('score')+' '+r.businessScore+'/100';si.appendChild(st);
    sb.appendChild(gd);sb.appendChild(si);resultsDiv.appendChild(sb);

    // 4 metrics
    var metrics=[
      {label:t('market'),val:r.market,inv:false},
      {label:t('competition'),val:r.competition,inv:true},
      {label:t('monetization'),val:r.mono,inv:false},
      {label:t('risks'),val:r.risk,inv:true}
    ];
    var mg=document.createElement('div');mg.style='display:grid;grid-template-columns:1fr 1fr;gap:5px;';
    metrics.forEach(function(m){
      var sc=m.inv?100-m.val:m.val;var c=getColor(sc);
      var card=document.createElement('div');card.style='background:'+c+'0d;border:1px solid '+c+'33;border-radius:7px;padding:7px;';
      var pct=document.createElement('div');pct.style='font-size:15px;font-weight:900;color:'+c+';';pct.textContent=m.val+'%';
      var lbl=document.createElement('div');lbl.style='font-size:8px;color:#94a3b8;margin-top:1px;';lbl.textContent=m.label;
      var barBg=document.createElement('div');barBg.style='height:3px;background:#1e293b;border-radius:2px;margin-top:4px;overflow:hidden;';
      var barFl=document.createElement('div');barFl.style='height:100%;width:'+m.val+'%;background:'+c+';border-radius:2px;';
      barBg.appendChild(barFl);card.appendChild(pct);card.appendChild(lbl);card.appendChild(barBg);mg.appendChild(card);
    });
    resultsDiv.appendChild(mg);

    function mkList(label,items,color){
      var card=document.createElement('div');card.style='background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:8px;padding:9px;';
      var lbl=document.createElement('div');lbl.style='font-size:10px;font-weight:700;color:'+color+';margin-bottom:5px;';lbl.textContent=label;card.appendChild(lbl);
      items.forEach(function(i){var p=document.createElement('div');p.style='font-size:9px;color:#94a3b8;padding:2px 0;';p.textContent='→ '+i;card.appendChild(p);});
      return card;
    }
    resultsDiv.appendChild(mkList(t('monetization'),r.monetization,'#4ade80'));
    resultsDiv.appendChild(mkList(t('risks'),r.risks,'#f87171'));
    resultsDiv.appendChild(mkList(t('recommend'),r.recommendations,'#60a5fa'));

    // Copy
    lastReport='Business Validator Report\n'+'='.repeat(30)+'\nIdea: '+idea+'\n\nBusiness Score: '+r.businessScore+'/100 ('+grade+')\nMarket: '+r.market+'% | Competition: '+r.competition+'% | Mono: '+r.mono+'% | Risk: '+r.risk+'%\n\nMonetization:\n'+r.monetization.map(function(x){return'• '+x;}).join('\n')+'\n\nRisks:\n'+r.risks.map(function(x){return'• '+x;}).join('\n')+'\n\nRecommendations:\n'+r.recommendations.join('\n');
    var cpBtn=document.createElement('button');cpBtn.innerHTML=t('btnCopy');cpBtn.style='width:100%;background:rgba(74,222,128,0.1);color:#4ade80;border:1px solid rgba(74,222,128,0.2);padding:8px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
    cpBtn.onclick=function(){navigator.clipboard.writeText(lastReport).then(function(){if(window.showToast)window.showToast(t('copied'));});};
    resultsDiv.appendChild(cpBtn);
  };
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-bizval');if(el)el.textContent=t('tab');if(window.activeTab==='bizval')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='bizval'){window.activeTab='bizval';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-bizval');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
