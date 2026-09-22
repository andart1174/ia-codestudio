/**
 * 📈 Sales Funnel Builder v1.0 — EN/FR
 */
(function(){
'use strict';
var TX={
  en:{tab:'Funnel',title:'📈 Sales Funnel Builder',sub:'Revenue projection + Funnel Leak Detector',
      traffic:'Monthly Traffic',trafficP:'e.g. 10000',c1:'Landing → Lead %',c2:'Lead → Trial %',c3:'Trial → Paid %',c4:'Paid → Retained %',
      aov:'Avg Order Value ($)',aovP:'e.g. 49',btn:'📊 Analyze Funnel',inject:'💉 Inject Funnel Page',copy:'📋 Copy HTML',
      stages:['Visitors','Leads','Trials','Customers','Retained'],
      leaks:'🔍 Funnel Leak Detector',bottleneck:'⚠️ Biggest Bottleneck',revenue:'💰 Revenue Projection',fix:'💡 Fix Recommendation'},
  fr:{tab:'Funnel',title:'📈 Sales Funnel Builder',sub:'Projection revenus + Détecteur de fuites',
      traffic:'Trafic Mensuel',trafficP:'ex. 10000',c1:'Landing → Lead %',c2:'Lead → Essai %',c3:'Essai → Payant %',c4:'Payant → Fidélisé %',
      aov:'Valeur Commande Moy. (€)',aovP:'ex. 49',btn:'📊 Analyser le Funnel',inject:'💉 Injecter la Page Funnel',copy:'📋 Copier HTML',
      stages:['Visiteurs','Leads','Essais','Clients','Fidélisés'],
      leaks:'🔍 Détecteur de Fuites',bottleneck:'⚠️ Goulot d\'Étranglement',revenue:'💰 Projection Revenus',fix:'💡 Recommandation'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var state={traffic:10000,c1:20,c2:30,c3:15,c4:70,aov:49};

function calcFunnel(s){
  var v=s.traffic;
  var leads=Math.round(v*s.c1/100);
  var trials=Math.round(leads*s.c2/100);
  var customers=Math.round(trials*s.c3/100);
  var retained=Math.round(customers*s.c4/100);
  var mrr=customers*s.aov;
  var arr=mrr*12;
  var drops=[v-leads,leads-trials,trials-customers,customers-retained];
  var dropPcts=[100-s.c1,100-s.c2,100-s.c3,100-s.c4];
  var worstIdx=dropPcts.indexOf(Math.max.apply(null,dropPcts));
  return{stages:[v,leads,trials,customers,retained],mrr:mrr,arr:arr,drops:drops,dropPcts:dropPcts,worstIdx:worstIdx};
}

var FIXES={
  en:['Improve headline & hero CTA — aim for 30%+ conversion','Add social proof, free trial, remove credit card barrier','Improve onboarding UX — add progress bar & email sequence','Add loyalty rewards, annual plan discount, personal check-ins'],
  fr:['Améliorez le titre et le CTA — visez 30%+ de conversion','Ajoutez preuve sociale, essai gratuit, sans carte bancaire','Améliorez l\'onboarding — barre de progression & séquence email','Récompenses fidélité, remise plan annuel, contacts personnels']
};

function buildFunnelHTML(s,r){
  var tx=TX[gl()]||TX.en;
  var stages=tx.stages;
  var colors=['#3b82f6','#8b5cf6','#ec4899','#f59e0b','#22c55e'];
  var maxV=r.stages[0];
  var barsHTML=stages.map(function(name,i){
    var val=r.stages[i];var pct=Math.round(val/maxV*100);var c=colors[i];
    return '<div style="margin-bottom:16px;">'+
      '<div style="display:flex;justify-content:space-between;margin-bottom:5px;">'+
      '<span style="font-size:12px;font-weight:700;color:#e2e8f0;">'+name+'</span>'+
      '<span style="font-size:12px;font-weight:900;color:'+c+';">'+val.toLocaleString()+'</span></div>'+
      '<div style="background:rgba(255,255,255,.06);border-radius:50px;height:12px;overflow:hidden;">'+
      '<div style="width:'+pct+'%;height:100%;background:'+c+';border-radius:50px;transition:width 1s ease;"></div></div>'+
      '<div style="font-size:10px;color:#475569;margin-top:3px;">'+pct+'% of total traffic</div></div>';
  }).join('');

  var leaksHTML=r.dropPcts.map(function(pct,i){
    var c=pct>70?'#ef4444':pct>50?'#f59e0b':'#22c55e';var arrow=i<stages.length-1?'↓ '+r.drops[i].toLocaleString()+' lost':'';
    return'<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.04);font-size:11px;">'+
      '<span style="color:#94a3b8;">'+stages[i]+' → '+(stages[i+1]||'?')+'</span>'+
      '<span style="color:'+c+';font-weight:700;">'+pct+'% drop</span>'+
      '<span style="color:#475569;">'+arrow+'</span></div>';
  }).join('');

  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Sales Funnel</title>'+
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet">'+
    '<style>*{margin:0;padding:0;box-sizing:border-box;font-family:Inter,sans-serif}body{background:#050810;color:#e2e8f0;padding:30px;min-height:100vh}'+
    '.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:900px;margin:0 auto}'+
    '.card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:20px}'+
    '.title{font-size:10px;font-weight:700;color:#475569;letter-spacing:2px;text-transform:uppercase;margin-bottom:14px}'+
    '.kpi{text-align:center;padding:16px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px}'+
    '.kv{font-size:28px;font-weight:900;color:#22c55e;margin-bottom:3px}.kl{font-size:10px;color:#64748b}'+
    '</style></head><body>'+
    '<div style="max-width:900px;margin:0 auto 24px;"><div style="font-size:28px;font-weight:900;color:#fff;margin-bottom:4px;">📈 Sales Funnel</div>'+
    '<div style="font-size:13px;color:#64748b;">Revenue analysis & optimization</div></div>'+
    '<div class="grid">'+
    '<div class="card"><div class="title">Funnel Stages</div>'+barsHTML+'</div>'+
    '<div style="display:flex;flex-direction:column;gap:16px;">'+
    '<div class="card"><div class="title">💰 Revenue</div>'+
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">'+
    '<div class="kpi"><div class="kv">$'+r.mrr.toLocaleString()+'</div><div class="kl">MRR</div></div>'+
    '<div class="kpi"><div class="kv">$'+r.arr.toLocaleString()+'</div><div class="kl">ARR</div></div></div></div>'+
    '<div class="card"><div class="title">🔍 Leak Analysis</div>'+leaksHTML+'</div>'+
    '<div class="card" style="border-color:rgba(239,68,68,.3);background:rgba(239,68,68,.04);">'+
    '<div class="title" style="color:#ef4444;">⚠️ Biggest Bottleneck</div>'+
    '<div style="font-size:13px;color:#fca5a5;margin-bottom:8px;">Stage '+(r.worstIdx+1)+': '+stages[r.worstIdx]+' → '+(stages[r.worstIdx+1]||'?')+'</div>'+
    '<div style="font-size:11px;color:#64748b;">'+(FIXES[gl()]||FIXES.en)[r.worstIdx]+'</div></div>'+
    '</div></div>'+
    '</body></html>';
}

function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(34,197,94,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(34,197,94,0.1),rgba(16,185,129,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#4ade80;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  function numRow(id,label,ph,min,max){
    var d=document.createElement('div');
    var row=document.createElement('div');row.style='display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;';
    var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;';l.textContent=label;
    var vd=document.createElement('div');vd.id='fv-'+id;vd.style='font-size:11px;font-weight:900;color:#4ade80;';vd.textContent=state[id]+(max===100?'%':'');
    row.appendChild(l);row.appendChild(vd);d.appendChild(row);
    var inp=document.createElement('input');inp.type='range';inp.min=min||1;inp.max=max||100;inp.value=state[id];
    inp.style='width:100%;accent-color:#22c55e;';
    inp.oninput=function(){state[id]=parseInt(this.value);vd.textContent=state[id]+(max===100?'%':'');};
    d.appendChild(inp);return d;
  }
  function numInput(id,label,ph){
    var d=document.createElement('div');
    var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=label;
    var inp=document.createElement('input');inp.type='number';inp.placeholder=ph;inp.value=state[id];
    inp.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(34,197,94,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';
    inp.oninput=function(){state[id]=parseFloat(this.value)||0;};
    d.appendChild(l);d.appendChild(inp);return d;
  }

  body.appendChild(numInput('traffic',t('traffic'),t('trafficP')));
  body.appendChild(numRow('c1',t('c1'),'',1,100));
  body.appendChild(numRow('c2',t('c2'),'',1,100));
  body.appendChild(numRow('c3',t('c3'),'',1,100));
  body.appendChild(numRow('c4',t('c4'),'',1,100));
  body.appendChild(numInput('aov',t('aov'),t('aovP')));

  var btn=document.createElement('button');btn.innerHTML=t('btn');
  btn.style='width:100%;background:linear-gradient(135deg,#14532d,#22c55e);color:#fff;border:none;padding:11px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(34,197,94,0.35);';
  body.appendChild(btn);

  var actRow=document.createElement('div');actRow.style='display:none;gap:6px;';
  var injBtn=document.createElement('button');injBtn.innerHTML=t('inject');
  injBtn.style='flex:1;background:linear-gradient(135deg,#1e3a5f,#3b82f6);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cpBtn=document.createElement('button');cpBtn.innerHTML=t('copy');
  cpBtn.style='flex:1;background:rgba(255,255,255,0.06);color:#94a3b8;border:1px solid rgba(255,255,255,0.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  actRow.appendChild(injBtn);actRow.appendChild(cpBtn);body.appendChild(actRow);

  var results=document.createElement('div');body.appendChild(results);
  wrap.appendChild(body);parent.appendChild(wrap);

  var lastHTML='';
  btn.onclick=function(){
    state.traffic=parseInt(document.querySelector('input[type="number"]').value)||10000;
    var r=calcFunnel(state);
    var tx=TX[gl()]||TX.en;
    lastHTML=buildFunnelHTML(state,r);
    actRow.style.display='flex';

    var stageColors=['#3b82f6','#8b5cf6','#ec4899','#f59e0b','#22c55e'];
    var bottleneckFix=(FIXES[gl()]||FIXES.en)[r.worstIdx];
    results.innerHTML='<div style="display:flex;flex-direction:column;gap:6px;margin-top:4px;">'+
      // Mini bars
      '<div style="background:rgba(34,197,94,0.06);border:1px solid rgba(34,197,94,0.2);border-radius:8px;padding:10px;">'+
      r.stages.map(function(v,i){var p=Math.round(v/r.stages[0]*100);var c=stageColors[i];
        return'<div style="margin-bottom:5px;"><div style="display:flex;justify-content:space-between;font-size:9px;margin-bottom:2px;"><span style="color:#94a3b8;">'+tx.stages[i]+'</span><span style="color:'+c+';font-weight:700;">'+v.toLocaleString()+'</span></div>'+
        '<div style="background:rgba(255,255,255,.06);border-radius:4px;height:6px;overflow:hidden;"><div style="width:'+p+'%;height:100%;background:'+c+';border-radius:4px;"></div></div></div>';
      }).join('')+'</div>'+
      // KPIs
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;">'+
      '<div style="background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.25);border-radius:8px;padding:10px;text-align:center;"><div style="font-size:16px;font-weight:900;color:#22c55e;">$'+r.mrr.toLocaleString()+'</div><div style="font-size:8px;color:#64748b;">MRR</div></div>'+
      '<div style="background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.25);border-radius:8px;padding:10px;text-align:center;"><div style="font-size:16px;font-weight:900;color:#4ade80;">$'+r.arr.toLocaleString()+'</div><div style="font-size:8px;color:#64748b;">ARR</div></div></div>'+
      // Bottleneck
      '<div style="background:rgba(239,68,68,0.06);border:1px solid rgba(239,68,68,0.25);border-radius:8px;padding:9px;">'+
      '<div style="font-size:9px;font-weight:700;color:#ef4444;margin-bottom:4px;">⚠️ Biggest Bottleneck: '+tx.stages[r.worstIdx]+' ('+r.dropPcts[r.worstIdx]+'% drop)</div>'+
      '<div style="font-size:9px;color:#94a3b8;">💡 '+bottleneckFix+'</div></div>'+
      '</div>';
    if(window.showToast)window.showToast('📈 Funnel analyzed!');
  };
  injBtn.onclick=function(){if(!lastHTML)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(lastHTML);if(window.showToast)window.showToast('✅ Funnel page injected!');}};
  cpBtn.onclick=function(){if(lastHTML&&navigator.clipboard)navigator.clipboard.writeText(lastHTML).then(function(){if(window.showToast)window.showToast('📋 Copied!');});};
}

document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;
  window.renderTab=function(tab){
    if(tab==='funnel'){window.activeTab='funnel';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-funnel');if(btn)btn.classList.add('active');renderTab();return;}
    if(typeof oRT==='function')oRT(tab);
  };
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-funnel');if(el)el.textContent=t('tab');if(window.activeTab==='funnel')renderTab();};
});
})();
