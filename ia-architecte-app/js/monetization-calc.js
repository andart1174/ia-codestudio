/**
 * App Monetization Calculator v1.0 — EN/FR
 * Calculates revenue potential: MAU, conversion, pricing models
 */
(function () {
'use strict';
var TX = {
  en: { tab:'Monetize Calc', title:'📱 Monetization Calculator', sub:'Estimate your app revenue potential',
        mau:'Monthly Active Users (MAU)', conv:'Conversion Rate (%)', price:'Price / User ($)',
        model:'Revenue Model', models:{sub:'💳 Subscription',iap:'🛍️ In-App Purchase',ads:'📢 Ads (CPM)',freemium:'🔓 Freemium',b2b:'🏢 B2B SaaS'},
        cpm:'CPM Rate ($)', arpu:'ARPU ($)', churn:'Monthly Churn (%)', btnCalc:'🚀 Calculate Revenue',
        monthly:'Monthly Revenue', annual:'Annual Revenue', arpu_out:'ARPU', ltv:'Customer LTV',
        breakeven:'Break-Even Users', projection:'12-Month Projection', tip:'💡 Click bars to see details.' },
  fr: { tab:'Calc. Revenus', title:'📱 Calculateur de Monétisation', sub:'Estimez le potentiel de revenus de votre app',
        mau:'Utilisateurs Actifs Mensuels (MAU)', conv:'Taux de Conversion (%)', price:'Prix / Utilisateur ($)',
        model:'Modèle de Revenus', models:{sub:'💳 Abonnement',iap:'🛍️ Achat In-App',ads:'📢 Publicités (CPM)',freemium:'🔓 Freemium',b2b:'🏢 B2B SaaS'},
        cpm:'Taux CPM ($)', arpu:'ARPU ($)', churn:'Churn Mensuel (%)', btnCalc:'🚀 Calculer les Revenus',
        monthly:'Revenus Mensuels', annual:'Revenus Annuels', arpu_out:'ARPU', ltv:'LTV Client',
        breakeven:'Utilisateurs Break-Even', projection:'Projection 12 Mois', tip:'💡 Cliquez sur les barres pour les détails.' }
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}
function tm(k){return((TX[gl()]||TX.en).models||TX.en.models)[k]||k;}
function fmt(n){if(n>=1e6)return'$'+(n/1e6).toFixed(2)+'M';if(n>=1e3)return'$'+(n/1e3).toFixed(1)+'K';return'$'+n.toFixed(2);}

var currentModel='sub';

function calcRevenue(mau,conv,price,cpm,churn,model){
  var paying=mau*(conv/100);
  var monthly=0,arpu=0,ltv=0;
  if(model==='sub'){monthly=paying*price;arpu=price;ltv=churn>0?price/(churn/100):price*24;}
  else if(model==='iap'){monthly=paying*price*1.8;arpu=price*1.8;ltv=price*3.5;}
  else if(model==='ads'){monthly=(mau/1000)*cpm*30;arpu=monthly/mau;ltv=arpu*12;}
  else if(model==='freemium'){monthly=paying*price+(mau*0.002*cpm);arpu=monthly/mau;ltv=price*18;}
  else if(model==='b2b'){monthly=paying*price*12;arpu=price*12;ltv=arpu*3;}
  return{monthly:monthly,annual:monthly*12,arpu:arpu,ltv:ltv,paying:Math.round(paying),breakeven:Math.ceil(50/price)};
}

function renderTab(){
  var parent=document.getElementById('left-body');
  if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');
  wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';

  var hdr=document.createElement('div');
  hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(245,158,11,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(245,158,11,0.1),rgba(16,185,129,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#fbbf24;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);

  var body=document.createElement('div');
  body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;';

  function mkField(labelKey,id,val,min,max,step){
    var row=document.createElement('div');
    row.style='display:flex;flex-direction:column;gap:3px;';
    var lbl=document.createElement('div');
    lbl.style='font-size:10px;color:#64748b;font-weight:600;display:flex;justify-content:space-between;';
    var valSpan=document.createElement('span');
    valSpan.id=id+'-val';valSpan.style='color:#fbbf24;font-weight:900;';valSpan.textContent=val;
    lbl.textContent=t(labelKey);lbl.appendChild(valSpan);
    var inp=document.createElement('input');
    inp.type='range';inp.id=id;inp.min=min;inp.max=max;inp.step=step||1;inp.value=val;
    inp.style='width:100%;accent-color:#f59e0b;cursor:pointer;';
    inp.oninput=function(){valSpan.textContent=this.value;};
    row.appendChild(lbl);row.appendChild(inp);
    return row;
  }

  body.appendChild(mkField('mau','mc-mau',50000,100,10000000,100));
  body.appendChild(mkField('conv','mc-conv',3,0.1,30,0.1));
  body.appendChild(mkField('price','mc-price',9.99,0.99,999,0.01));
  body.appendChild(mkField('churn','mc-churn',5,0.1,50,0.1));

  // Model selector
  var mlbl=document.createElement('div');
  mlbl.style='font-size:10px;color:#64748b;font-weight:600;';
  mlbl.textContent=t('model');
  body.appendChild(mlbl);

  var models=[{id:'sub',c:'#6366f1'},{id:'iap',c:'#ec4899'},{id:'ads',c:'#f59e0b'},{id:'freemium',c:'#10b981'},{id:'b2b',c:'#3b82f6'}];
  var mgrid=document.createElement('div');
  mgrid.style='display:grid;grid-template-columns:1fr 1fr;gap:5px;';
  models.forEach(function(m){
    var btn=document.createElement('button');
    var isA=currentModel===m.id;
    btn.textContent=tm(m.id);
    btn.style='padding:7px;border-radius:8px;font-size:9.5px;font-weight:700;cursor:pointer;' +
      'border:2px solid '+(isA?m.c:'rgba(255,255,255,0.08)')+';' +
      'background:'+(isA?m.c+'22':'rgba(255,255,255,0.02)')+';' +
      'color:'+(isA?m.c:'#94a3b8')+';';
    btn.onclick=function(){currentModel=m.id;renderTab();};
    mgrid.appendChild(btn);
  });
  body.appendChild(mgrid);

  // CPM field (ads only)
  if(currentModel==='ads'){body.appendChild(mkField('cpm','mc-cpm',3.5,0.5,50,0.5));}

  // Calculate button
  var calcBtn=document.createElement('button');
  calcBtn.innerHTML=t('btnCalc');
  calcBtn.style='width:100%;background:linear-gradient(135deg,#d97706,#f59e0b);color:#000;border:none;padding:12px;border-radius:10px;font-weight:900;font-size:12px;cursor:pointer;box-shadow:0 4px 20px rgba(245,158,11,0.4);';
  calcBtn.onmouseover=function(){this.style.transform='translateY(-1px)';};calcBtn.onmouseout=function(){this.style.transform='';};
  calcBtn.onclick=function(){
    var mau=parseFloat((document.getElementById('mc-mau')||{}).value||50000);
    var conv=parseFloat((document.getElementById('mc-conv')||{}).value||3);
    var price=parseFloat((document.getElementById('mc-price')||{}).value||9.99);
    var churn=parseFloat((document.getElementById('mc-churn')||{}).value||5);
    var cpm=parseFloat((document.getElementById('mc-cpm')||{}).value||3.5);
    var res=calcRevenue(mau,conv,price,cpm,churn,currentModel);

    var ro=document.getElementById('mc-results');
    if(!ro)return;
    ro.style.display='flex';

    var cards=[
      {label:t('monthly'),val:fmt(res.monthly),color:'#10b981'},
      {label:t('annual'),val:fmt(res.annual),color:'#3b82f6'},
      {label:t('arpu_out'),val:fmt(res.arpu)+'/mo',color:'#f59e0b'},
      {label:t('ltv'),val:fmt(res.ltv),color:'#a78bfa'}
    ];
    var cr=document.getElementById('mc-cards');
    if(cr){
      cr.innerHTML='';
      cards.forEach(function(c){
        var card=document.createElement('div');
        card.style='background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:10px;text-align:center;border-top:3px solid '+c.color+';';
        card.innerHTML='<div style="font-size:9px;color:#64748b;margin-bottom:4px;">'+c.label+'</div><div style="font-size:15px;font-weight:900;color:'+c.color+';">'+c.val+'</div>';
        cr.appendChild(card);
      });
    }

    // 12-month bar chart
    var barEl=document.getElementById('mc-bars');
    if(barEl){
      barEl.innerHTML='<div style="font-size:10px;color:#64748b;font-weight:600;margin-bottom:6px;">'+t('projection')+'</div>';
      var max12=res.monthly*14;
      for(var i=1;i<=12;i++){
        var growth=res.monthly*Math.pow(1.05,i-1);
        var pct=Math.round((growth/max12)*100);
        var bar=document.createElement('div');
        bar.style='display:flex;align-items:center;gap:6px;margin-bottom:3px;';
        bar.innerHTML='<div style="font-size:8px;color:#64748b;width:18px;text-align:right;">M'+i+'</div>' +
          '<div style="flex:1;background:rgba(255,255,255,0.05);border-radius:3px;height:10px;">' +
          '<div style="width:'+pct+'%;height:100%;border-radius:3px;background:linear-gradient(90deg,#f59e0b,#10b981);"></div></div>' +
          '<div style="font-size:8px;color:#fbbf24;width:48px;">'+fmt(growth)+'</div>';
        barEl.appendChild(bar);
      }
    }
  };
  body.appendChild(calcBtn);

  // Results area
  var results=document.createElement('div');
  results.id='mc-results';results.style='display:none;flex-direction:column;gap:8px;';
  var cards=document.createElement('div');
  cards.id='mc-cards';cards.style='display:grid;grid-template-columns:1fr 1fr;gap:6px;';
  var bars=document.createElement('div');
  bars.id='mc-bars';bars.style='background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:10px;';
  results.appendChild(cards);results.appendChild(bars);
  body.appendChild(results);

  wrap.appendChild(body);parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function(){
  var oAL=window.applyLang;
  window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-monetizecalc');if(el)el.textContent=t('tab');if(window.activeTab==='monetizecalc')renderTab();};
  var oRT=window.renderTab;
  window.renderTab=function(tab){if(tab==='monetizecalc'){window.activeTab='monetizecalc';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-monetizecalc');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
