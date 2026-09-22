/**
 * DevScore + SaaS Pricing Generator v1.0 — EN/FR
 */

/* ─── DEVSCORE ─── */
(function(){
'use strict';
var TX={
  en:{tab:'DevScore',title:'🏆 DevScore',sub:'Paste your code → get your developer score',
      input:'Paste your code:',btnScore:'🏆 Calculate Score',copied:'Copied!'},
  fr:{tab:'DevScore',title:'🏆 DevScore',sub:'Collez votre code → obtenez votre score développeur',
      input:'Collez votre code :',btnScore:'🏆 Calculer le Score',copied:'Copié !'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var BADGES=[
  {min:95,en:'🏆 Grand Master',fr:'🏆 Grand Maître',color:'#ffd700'},
  {min:85,en:'💎 Expert',fr:'💎 Expert',color:'#c084fc'},
  {min:75,en:'🚀 Senior Dev',fr:'🚀 Dev Senior',color:'#38bdf8'},
  {min:60,en:'⚡ Mid-Level Dev',fr:'⚡ Dev Intermédiaire',color:'#4ade80'},
  {min:40,en:'🌱 Junior Dev',fr:'🌱 Dev Junior',color:'#f59e0b'},
  {min:0, en:'👶 Beginner',fr:'👶 Débutant',color:'#94a3b8'}
];

function scoreCode(code){
  var lx=gl();var checks=[];var total=0;

  function chk(label,frLabel,points,test){
    var ok=test(code);if(ok)total+=points;
    checks.push({label:lx==='fr'?frLabel:label,points:points,ok:ok});
  }

  chk('Uses const/let (no var)','Utilise const/let (pas var)',10,function(c){return /\bconst\b|\blet\b/.test(c)&&!/\bvar\b/.test(c);});
  chk('Has functions/methods','A des fonctions/méthodes',10,function(c){return /(function\s+\w+|const\s+\w+\s*=.*=>|\w+\s*:\s*function)/.test(c);});
  chk('Has comments','A des commentaires',8,function(c){return /\/\/|\/\*|\*\s/.test(c);});
  chk('Uses async/await','Utilise async/await',10,function(c){return /\basync\b|\bawait\b/.test(c);});
  chk('Has error handling','Gestion d\'erreurs',10,function(c){return /try\s*\{|\.catch\(|catch\s*\(/.test(c);});
  chk('Clean naming (camelCase)','Nommage camelCase',8,function(c){return /\b[a-z][a-zA-Z0-9]{2,}\b/.test(c)&&!/\b[a-z]_[a-z]\b/.test(c);});
  chk('Modular code (import/export)','Code modulaire',10,function(c){return /\bimport\b|\bexport\b/.test(c);});
  chk('Array methods (.map/.filter)','Méthodes tableau',8,function(c){return /\.map\(|\.filter\(|\.reduce\(|\.forEach\(/.test(c);});
  chk('Destructuring used','Déstructuration utilisée',8,function(c){return /const\s*\{|const\s*\[|let\s*\{/.test(c);});
  chk('Template literals','Littéraux de gabarit',6,function(c){return /`[^`]*\$\{/.test(c);});
  chk('No console.log left','Pas de console.log',6,function(c){return !/console\.log/.test(c);});
  chk('Proper indentation','Indentation correcte',6,function(c){var lines=c.split('\n');var indented=lines.filter(function(l){return /^\s{2,}/.test(l);});return indented.length>lines.length*0.2;});

  var maxScore=checks.reduce(function(a,c){return a+c.points;},0);
  var pct=Math.round(total/maxScore*100);
  var badge=BADGES.find(function(b){return pct>=b.min;})||BADGES[BADGES.length-1];
  return{pct:pct,total:total,max:maxScore,checks:checks,badge:badge};
}

var lastCode='';
function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(251,191,36,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(251,191,36,0.1),rgba(245,158,11,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#fbbf24;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:7px;';
  var lbl=document.createElement('div');lbl.style='font-size:10px;color:#64748b;font-weight:600;';lbl.textContent=t('input');body.appendChild(lbl);
  var ta=document.createElement('textarea');ta.value=lastCode;ta.rows=6;ta.placeholder='// Paste your best code here...';
  ta.style='background:#0d1117;color:#c9d1d9;border:1px solid rgba(251,191,36,0.15);border-radius:8px;padding:9px;font-size:8.5px;font-family:"JetBrains Mono",monospace;outline:none;resize:vertical;width:100%;box-sizing:border-box;';
  ta.oninput=function(){lastCode=this.value;};body.appendChild(ta);
  if(window.editor){var gb=document.createElement('button');gb.innerHTML='📥 '+(gl()==='fr'?'Depuis l\'Éditeur':'From Editor');gb.style='width:100%;background:rgba(99,102,241,0.08);color:#818cf8;border:1px solid rgba(99,102,241,0.2);padding:6px;border-radius:7px;font-size:9px;cursor:pointer;';gb.onclick=function(){ta.value=window.editor.getValue();lastCode=ta.value;};body.appendChild(gb);}
  var btn=document.createElement('button');btn.innerHTML=t('btnScore');btn.style='width:100%;background:linear-gradient(135deg,#78350f,#f59e0b);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(245,158,11,0.3);';
  body.appendChild(btn);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);parent.appendChild(wrap);

  btn.onclick=function(){
    var code=ta.value.trim();if(!code)return;
    lastCode=code;res.innerHTML='';
    var r=scoreCode(code);

    // Badge + score
    var top=document.createElement('div');top.style='text-align:center;padding:12px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:10px;';
    top.innerHTML='<div style="font-size:32px;margin-bottom:4px;">'+(gl()==='fr'?r.badge.fr:r.badge.en)+'</div>'+
      '<div style="font-size:28px;font-weight:900;color:'+r.badge.color+';">'+r.pct+'<span style="font-size:14px;">/100</span></div>'+
      '<div style="height:8px;background:#1e293b;border-radius:4px;overflow:hidden;margin:8px 0;"><div style="height:100%;width:'+r.pct+'%;background:linear-gradient(90deg,'+r.badge.color+','+r.badge.color+'aa);border-radius:4px;transition:width 0.5s;"></div></div>';
    res.appendChild(top);

    // Checks list
    var list=document.createElement('div');list.style='display:flex;flex-direction:column;gap:4px;';
    r.checks.forEach(function(c){
      var row=document.createElement('div');row.style='display:flex;justify-content:space-between;align-items:center;padding:5px 9px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.04);border-radius:6px;';
      var left=document.createElement('span');left.style='font-size:9px;color:'+(c.ok?'#e2e8f0':'#475569')+';';left.textContent=(c.ok?'✅ ':'❌ ')+c.label;
      var pts=document.createElement('span');pts.style='font-size:8px;color:'+(c.ok?'#4ade80':'#475569')+';font-weight:700;';pts.textContent=(c.ok?'+':'')+c.points+'pts';
      row.appendChild(left);row.appendChild(pts);list.appendChild(row);
    });
    res.appendChild(list);

    // Share text
    var shareText='My DevScore: '+r.pct+'/100 '+( gl()==='fr'?r.badge.fr:r.badge.en)+' on IA Architecte Studio! 🏆';
    var cpBtn=document.createElement('button');cpBtn.innerHTML='📤 '+(gl()==='fr'?'Partager mon score':'Share my score');cpBtn.style='width:100%;background:rgba(251,191,36,0.1);color:#fbbf24;border:1px solid rgba(251,191,36,0.2);padding:8px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
    cpBtn.onclick=function(){navigator.clipboard.writeText(shareText).then(function(){if(window.showToast)window.showToast(t('copied'));});};res.appendChild(cpBtn);
  };
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-devscore');if(el)el.textContent=t('tab');if(window.activeTab==='devscore')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='devscore'){window.activeTab='devscore';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-devscore');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();

/* ─── SAAS PRICING GENERATOR ─── */
(function(){
'use strict';
var TX={
  en:{tab:'Pricing',title:'💰 SaaS Pricing Generator',sub:'Describe your product → psychology-based pricing page',
      product:'Product name:',desc:'What does it do? (one line):',audience:'Target audience:',
      price1:'Starter price ($/mo):',price2:'Pro price ($/mo):',price3:'Enterprise price ($/mo):',
      btnGen:'💰 Generate Pricing Page',btnCopy:'📋 Copy HTML',btnInject:'💉 Inject to Editor',copied:'Copied!'},
  fr:{tab:'Pricing',title:'💰 Générateur Pricing SaaS',sub:'Décrivez votre produit → page de prix psychologique',
      product:'Nom du produit :',desc:'Que fait-il ? (une ligne) :',audience:'Audience cible :',
      price1:'Prix Starter (€/mois) :',price2:'Prix Pro (€/mois) :',price3:'Prix Enterprise (€/mois) :',
      btnGen:'💰 Générer Page de Prix',btnCopy:'📋 Copier HTML',btnInject:'💉 Injecter dans Éditeur',copied:'Copié !'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

function genPricingHTML(product,desc,audience,p1,p2,p3){
  var curr=gl()==='fr'?'€':'$';
  var lx=gl();
  var labels=lx==='fr'?{starter:'Débutant',pro:'Professionnel',enterprise:'Entreprise',
    mostPop:'⭐ Le plus populaire',mo:'/mois',cta1:'Commencer gratuitement',cta2:'Démarrer avec Pro',cta3:'Contacter l\'équipe',
    inc:'Inclus :',feat:'Fonctionnalités',freeT:'Essai gratuit 14 jours',noCC:'Pas de carte bancaire requise',
    yearly:'Économisez 20% avec la facturation annuelle',toggle:'Annuel',toggle2:'Mensuel'}
    :{starter:'Starter',pro:'Professional',enterprise:'Enterprise',
    mostPop:'⭐ Most Popular',mo:'/mo',cta1:'Start for free',cta2:'Start with Pro',cta3:'Contact Sales',
    inc:'Includes:',feat:'Features',freeT:'14-day free trial',noCC:'No credit card required',
    yearly:'Save 20% with annual billing',toggle:'Annual',toggle2:'Monthly'};

  var f1=lx==='fr'?['3 projets','5 GB stockage','Support email','Mises à jour incluses','Accès API basique']
    :['3 projects','5 GB storage','Email support','Updates included','Basic API access'];
  var f2=lx==='fr'?['Projets illimités','50 GB stockage','Support prioritaire','Accès API complet','Analytiques avancées','Export CSV/PDF','Collaboration équipe']
    :['Unlimited projects','50 GB storage','Priority support','Full API access','Advanced analytics','CSV/PDF export','Team collaboration'];
  var f3=lx==='fr'?['Tout en Pro +','Stockage illimité','SLA 99.99%','Gestionnaire de compte dédié','SSO / SAML','Conformité SOC 2','Facturation personnalisée']
    :['Everything in Pro +','Unlimited storage','99.99% SLA','Dedicated account manager','SSO / SAML','SOC 2 compliance','Custom billing'];

  return`<!DOCTYPE html>
<html lang="${lx}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${product} — ${labels.feat}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0f172a;color:#e2e8f0;min-height:100vh;}
.pricing-section{max-width:1100px;margin:0 auto;padding:60px 20px;}
.pricing-header{text-align:center;margin-bottom:48px;}
.pricing-header h2{font-size:clamp(28px,5vw,48px);font-weight:900;background:linear-gradient(135deg,#38bdf8,#818cf8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:12px;}
.pricing-header p{font-size:18px;color:#94a3b8;max-width:500px;margin:0 auto 20px;}
.toggle-row{display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:8px;}
.toggle-btn{background:#1e293b;border:1px solid #334155;color:#94a3b8;padding:6px 18px;border-radius:20px;cursor:pointer;font-size:13px;}
.toggle-btn.active{background:#3b82f6;color:#fff;border-color:#3b82f6;}
.save-badge{background:linear-gradient(135deg,#10b981,#059669);color:#fff;font-size:11px;font-weight:700;padding:2px 8px;border-radius:10px;}
.plans-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;align-items:start;}
.plan-card{background:#1e293b;border:1px solid #334155;border-radius:16px;padding:32px 28px;position:relative;transition:transform 0.2s,box-shadow 0.2s;}
.plan-card:hover{transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,0.3);}
.plan-card.featured{border:2px solid #3b82f6;background:linear-gradient(135deg,#1e3a8a18,#1e293b);}
.popular-badge{position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#3b82f6,#6366f1);color:#fff;padding:4px 16px;border-radius:20px;font-size:11px;font-weight:700;white-space:nowrap;}
.plan-name{font-size:13px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;}
.plan-price{font-size:48px;font-weight:900;color:#f8fafc;line-height:1;margin-bottom:4px;}
.plan-price span{font-size:18px;color:#64748b;}
.plan-desc{font-size:13px;color:#64748b;margin-bottom:24px;line-height:1.5;}
.plan-cta{display:block;width:100%;padding:12px;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;text-align:center;text-decoration:none;transition:all 0.2s;border:none;}
.plan-cta.primary{background:linear-gradient(135deg,#3b82f6,#6366f1);color:#fff;box-shadow:0 4px 15px rgba(59,130,246,0.3);}
.plan-cta.secondary{background:transparent;color:#3b82f6;border:1px solid #3b82f6;}
.plan-cta.outline{background:transparent;color:#94a3b8;border:1px solid #334155;}
.plan-cta:hover{opacity:0.85;transform:translateY(-1px);}
.features-label{font-size:11px;color:#64748b;font-weight:600;margin:20px 0 10px;}
.feature-list{list-style:none;display:flex;flex-direction:column;gap:8px;}
.feature-list li{font-size:13px;color:#cbd5e1;display:flex;align-items:center;gap:8px;}
.feature-list li::before{content:'✓';color:#4ade80;font-weight:900;flex-shrink:0;}
.trial-note{text-align:center;margin-top:32px;font-size:13px;color:#475569;}
.trial-note strong{color:#94a3b8;}
@media(max-width:640px){.plans-grid{grid-template-columns:1fr;}.plan-card.featured{order:-1;}}
</style>
</head>
<body>
<section class="pricing-section">
  <div class="pricing-header">
    <h2>${product} ${labels.feat}</h2>
    <p>${desc} — ${lx==='fr'?'Pour':'For'} ${audience}</p>
    <div class="toggle-row">
      <button class="toggle-btn active" onclick="this.classList.add('active');this.nextElementSibling.classList.remove('active');">${labels.toggle2}</button>
      <button class="toggle-btn" onclick="this.classList.add('active');this.previousElementSibling.classList.remove('active');">${labels.toggle} <span class="save-badge">${labels.yearly.split(' ')[1]} 20%</span></button>
    </div>
  </div>
  <div class="plans-grid">
    <!-- Starter -->
    <div class="plan-card">
      <div class="plan-name">${labels.starter}</div>
      <div class="plan-price">${curr}${p1}<span>${labels.mo}</span></div>
      <div class="plan-desc">${lx==='fr'?'Parfait pour commencer':'Perfect to get started'}</div>
      <a href="#" class="plan-cta outline">${labels.cta1}</a>
      <div class="features-label">${labels.inc}</div>
      <ul class="feature-list">${f1.map(function(f){return'<li>'+f+'</li>';}).join('')}</ul>
    </div>
    <!-- Pro (featured) -->
    <div class="plan-card featured">
      <div class="popular-badge">${labels.mostPop}</div>
      <div class="plan-name">${labels.pro}</div>
      <div class="plan-price">${curr}${p2}<span>${labels.mo}</span></div>
      <div class="plan-desc">${lx==='fr'?'Pour les équipes en croissance':'For growing teams'}</div>
      <a href="#" class="plan-cta primary">${labels.cta2}</a>
      <div class="features-label">${labels.inc}</div>
      <ul class="feature-list">${f2.map(function(f){return'<li>'+f+'</li>';}).join('')}</ul>
    </div>
    <!-- Enterprise -->
    <div class="plan-card">
      <div class="plan-name">${labels.enterprise}</div>
      <div class="plan-price" style="font-size:32px;">${lx==='fr'?'Sur devis':'Custom'}</div>
      <div class="plan-desc">${lx==='fr'?'Pour les grandes organisations':'For large organizations'}</div>
      <a href="#" class="plan-cta secondary">${labels.cta3}</a>
      <div class="features-label">${labels.inc}</div>
      <ul class="feature-list">${f3.map(function(f){return'<li>'+f+'</li>';}).join('')}</ul>
    </div>
  </div>
  <p class="trial-note">✅ <strong>${labels.freeT}</strong> · ${labels.noCC}</p>
</section>
</body>
</html>`;
}

var state={product:'',desc:'',audience:'',p1:9,p2:29,p3:99};
function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(34,197,94,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(34,197,94,0.1),rgba(16,185,129,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#4ade80;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  function mkInp(label,key,type,ph){
    var w=document.createElement('div');w.style='display:flex;flex-direction:column;gap:2px;';
    var l=document.createElement('div');l.style='font-size:9px;color:#64748b;font-weight:600;';l.textContent=label;
    var i=document.createElement('input');i.type=type||'text';i.value=state[key];i.placeholder=ph||'';
    i.style='background:#0f172a;color:#e2e8f0;border:1px solid rgba(255,255,255,0.08);padding:6px 9px;border-radius:6px;font-size:10px;outline:none;';
    i.oninput=function(){state[key]=type==='number'?+this.value:this.value;};
    w.appendChild(l);w.appendChild(i);return w;
  }

  body.appendChild(mkInp(t('product'),'product','text',gl()==='fr'?'Ex: MonApp':'Ex: MyApp'));
  body.appendChild(mkInp(t('desc'),'desc','text',gl()==='fr'?'Gère vos projets...':'Manage your projects...'));
  body.appendChild(mkInp(t('audience'),'audience','text',gl()==='fr'?'Développeurs indépendants':'Indie developers'));
  var priceRow=document.createElement('div');priceRow.style='display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px;';
  priceRow.appendChild(mkInp(t('price1'),'p1','number'));
  priceRow.appendChild(mkInp(t('price2'),'p2','number'));
  priceRow.appendChild(mkInp(t('price3'),'p3','number'));
  body.appendChild(priceRow);

  var genBtn=document.createElement('button');genBtn.innerHTML=t('btnGen');
  genBtn.style='width:100%;background:linear-gradient(135deg,#064e3b,#10b981);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(16,185,129,0.3);';
  body.appendChild(genBtn);

  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);parent.appendChild(wrap);

  genBtn.onclick=function(){
    var name=state.product||'MyApp';
    var html=genPricingHTML(name,state.desc||'The best SaaS tool',state.audience||'developers',state.p1||9,state.p2||29,state.p3||99);
    res.innerHTML='';
    // Preview iframe
    var ifr=document.createElement('iframe');ifr.style='width:100%;height:200px;border:1px solid rgba(255,255,255,0.07);border-radius:8px;';
    res.appendChild(ifr);ifr.contentDocument.open();ifr.contentDocument.write(html);ifr.contentDocument.close();
    var actRow=document.createElement('div');actRow.style='display:flex;gap:5px;margin-top:5px;';
    var cpBtn=document.createElement('button');cpBtn.innerHTML=t('btnCopy');cpBtn.style='flex:1;background:rgba(16,185,129,0.1);color:#4ade80;border:1px solid rgba(16,185,129,0.2);padding:8px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
    cpBtn.onclick=function(){navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast(t('copied'));});};
    var injBtn=document.createElement('button');injBtn.innerHTML=t('btnInject');injBtn.style='flex:1;background:rgba(99,102,241,0.1);color:#818cf8;border:1px solid rgba(99,102,241,0.2);padding:8px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
    injBtn.onclick=function(){if(window.editor)window.editor.setValue(html);};
    actRow.appendChild(cpBtn);if(window.editor)actRow.appendChild(injBtn);res.appendChild(actRow);
  };
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-pricing');if(el)el.textContent=t('tab');if(window.activeTab==='pricing')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='pricing'){window.activeTab='pricing';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-pricing');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
