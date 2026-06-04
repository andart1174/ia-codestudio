/**
 * Invoice Generator + Freelance Rate Calculator — EN/FR
 */

/* ─── INVOICE GENERATOR ─── */
(function(){
'use strict';
var TX={
  en:{tab:'Invoice',title:'📋 Invoice Generator',sub:'Professional HTML invoices for freelancers',
    from:'From:',to:'Bill To:',num:'Invoice #:',date:'Date:',due:'Due Date:',
    item:'Description',qty:'Qty',rate:'Rate',total:'Total',addRow:'+ Add Item',
    currency:'Currency:',notes:'Notes:',tax:'Tax %:',
    btnGen:'📋 Generate Invoice',btnCopy:'📋 Copy HTML',btnInject:'💉 To Editor',
    subtotal:'Subtotal:',taxLine:'Tax:',totalLine:'TOTAL DUE:'},
  fr:{tab:'Facture',title:'📋 Générateur de Factures',sub:'Factures HTML professionnelles pour freelancers',
    from:'De :',to:'Facturer à :',num:'Facture N° :',date:'Date :',due:'Échéance :',
    item:'Description',qty:'Qté',rate:'Tarif',total:'Total',addRow:'+ Ajouter ligne',
    currency:'Devise :',notes:'Notes :',tax:'TVA % :',
    btnGen:'📋 Générer Facture',btnCopy:'📋 Copier HTML',btnInject:'💉 Vers Éditeur',
    subtotal:'Sous-total :',taxLine:'TVA :',totalLine:'TOTAL DÛ :'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var state={
  from:'John Dev\njohn@dev.com\n+1 555 0100',
  to:'Client Corp\nclient@corp.com',
  num:'001',date:new Date().toISOString().split('T')[0],due:'',
  currency:'$',tax:0,notes:'',
  items:[{desc:'Web Development',qty:1,rate:1500},{desc:'Design',qty:2,rate:200}]
};

function calcTotals(){
  var sub=state.items.reduce(function(a,r){return a+(+r.qty)*(+r.rate);},0);
  var taxAmt=sub*(+state.tax/100);
  return{sub:sub,tax:taxAmt,total:sub+taxAmt};
}

function genHTML(){
  var t2=calcTotals();var c=state.currency;
  var rows=state.items.map(function(r){
    return'<tr><td style="padding:10px;border-bottom:1px solid #f1f5f9;">'+r.desc+'</td>'+
      '<td style="padding:10px;border-bottom:1px solid #f1f5f9;text-align:center;">'+r.qty+'</td>'+
      '<td style="padding:10px;border-bottom:1px solid #f1f5f9;text-align:right;">'+c+(+r.rate).toFixed(2)+'</td>'+
      '<td style="padding:10px;border-bottom:1px solid #f1f5f9;text-align:right;font-weight:600;">'+c+((+r.qty)*(+r.rate)).toFixed(2)+'</td></tr>';
  }).join('');
  var lx=gl()==='fr';
  return'<!DOCTYPE html><html lang="'+(lx?'fr':'en')+'"><head><meta charset="UTF-8">'+
    '<title>Invoice '+state.num+'</title>'+
    '<style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#f8fafc;color:#1e293b;padding:40px;}'+
    '.invoice{max-width:800px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 30px rgba(0,0,0,0.08);}'+
    '.inv-header{background:linear-gradient(135deg,#1e3a8a,#3b82f6);color:#fff;padding:40px;}'+
    '.inv-header h1{font-size:32px;font-weight:900;letter-spacing:-1px;margin-bottom:4px;}'+
    '.inv-header p{opacity:0.75;font-size:14px;}'+
    '.inv-meta{display:grid;grid-template-columns:1fr 1fr;gap:30px;padding:30px 40px;border-bottom:1px solid #f1f5f9;}'+
    '.meta-block h3{font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#94a3b8;margin-bottom:8px;}'+
    '.meta-block p{font-size:14px;line-height:1.7;color:#334155;white-space:pre-line;}'+
    '.inv-details{display:flex;justify-content:space-between;padding:20px 40px;background:#f8fafc;border-bottom:1px solid #e2e8f0;}'+
    '.detail-item{font-size:13px;color:#64748b;} .detail-item strong{color:#1e293b;display:block;font-size:15px;}'+
    'table{width:100%;border-collapse:collapse;} thead{background:#f8fafc;}'+
    'th{padding:12px 10px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;}'+
    'th:last-child,th:nth-child(3),th:nth-child(2){text-align:right;} th:nth-child(2){text-align:center;}'+
    '.table-wrap{padding:0 40px;}'+
    '.totals{padding:20px 40px;display:flex;flex-direction:column;align-items:flex-end;gap:6px;border-top:2px solid #e2e8f0;}'+
    '.tot-row{display:flex;gap:30px;font-size:14px;color:#64748b;} .tot-row.grand{font-size:18px;font-weight:900;color:#1e293b;border-top:2px solid #1e293b;padding-top:8px;margin-top:4px;}'+
    '.notes-sec{padding:20px 40px 30px;font-size:13px;color:#64748b;border-top:1px solid #f1f5f9;}'+
    '.inv-footer{background:#1e293b;color:#94a3b8;text-align:center;padding:16px;font-size:12px;}'+
    '@media print{body{padding:0;background:#fff;}.invoice{box-shadow:none;border-radius:0;}}</style></head><body>'+
    '<div class="invoice">'+
    '<div class="inv-header"><h1>'+(lx?'FACTURE':'INVOICE')+' #'+state.num+'</h1><p>'+(lx?'Générée avec IA Architecte Studio':'Generated with IA Architecte Studio')+'</p></div>'+
    '<div class="inv-meta">'+
    '<div class="meta-block"><h3>'+(lx?'De la':'From')+'</h3><p>'+state.from+'</p></div>'+
    '<div class="meta-block"><h3>'+(lx?'Facturer à':'Bill To')+'</h3><p>'+state.to+'</p></div>'+
    '</div>'+
    '<div class="inv-details">'+
    '<div class="detail-item"><strong>#'+state.num+'</strong>'+(lx?'N° Facture':'Invoice No.')+'</div>'+
    '<div class="detail-item"><strong>'+state.date+'</strong>'+(lx?'Date':'Date')+'</div>'+
    (state.due?'<div class="detail-item"><strong>'+state.due+'</strong>'+(lx?'Échéance':'Due')+'</div>':'')+'</div>'+
    '<div class="table-wrap"><table><thead><tr>'+
    '<th>'+(lx?'Description':'Description')+'</th><th>'+(lx?'Qté':'Qty')+'</th><th>'+c+(lx?' Tarif':' Rate')+'</th><th>'+(lx?'Total':'Total')+'</th></tr></thead><tbody>'+rows+'</tbody></table></div>'+
    '<div class="totals">'+
    '<div class="tot-row"><span>'+(lx?'Sous-total :':'Subtotal:')+'</span><span>'+c+t2.sub.toFixed(2)+'</span></div>'+
    (state.tax?'<div class="tot-row"><span>TVA '+state.tax+'% :</span><span>'+c+t2.tax.toFixed(2)+'</span></div>':'')+
    '<div class="tot-row grand"><span>'+(lx?'TOTAL DÛ :':'TOTAL DUE:')+'</span><span>'+c+t2.total.toFixed(2)+'</span></div></div>'+
    (state.notes?'<div class="notes-sec"><strong>'+(lx?'Notes :':'Notes:')+'</strong><br>'+state.notes+'</div>':'')+
    '<div class="inv-footer">'+(lx?'Merci pour votre confiance !':'Thank you for your business!')+'</div></div></body></html>';
}

function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(59,130,246,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(30,58,138,0.3),rgba(59,130,246,0.1));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#60a5fa;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:6px;';

  function field(lbl,key,multi){
    var w=document.createElement('div');
    var l=document.createElement('div');l.style='font-size:9px;color:#64748b;font-weight:600;margin-bottom:2px;';l.textContent=lbl;
    var el=document.createElement(multi?'textarea':'input');if(!multi)el.type='text';
    el.value=state[key];if(multi)el.rows=2;
    el.style='width:100%;background:#0f172a;color:#e2e8f0;border:1px solid rgba(59,130,246,0.2);padding:6px 8px;border-radius:6px;font-size:10px;outline:none;box-sizing:border-box;resize:vertical;';
    el.oninput=function(){state[key]=this.value;updateTotal();};
    w.appendChild(l);w.appendChild(el);return w;
  }
  body.appendChild(field(t('from'),'from',true));
  body.appendChild(field(t('to'),'to',true));
  var row2=document.createElement('div');row2.style='display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px;';
  row2.appendChild(field(t('num'),'num'));row2.appendChild(field(t('date'),'date'));row2.appendChild(field(t('due'),'due'));
  body.appendChild(row2);
  var row3=document.createElement('div');row3.style='display:grid;grid-template-columns:1fr 1fr;gap:5px;';
  var cRow=document.createElement('div');var cl=document.createElement('div');cl.style='font-size:9px;color:#64748b;font-weight:600;margin-bottom:2px;';cl.textContent=t('currency');
  var cSel=document.createElement('select');cSel.style='width:100%;background:#0f172a;color:#e2e8f0;border:1px solid rgba(59,130,246,0.2);padding:6px;border-radius:6px;font-size:10px;outline:none;';
  ['$','€','£','CHF','CAD','AUD'].forEach(function(c){var op=document.createElement('option');op.value=c;op.textContent=c;if(c===state.currency)op.selected=true;cSel.appendChild(op);});
  cSel.onchange=function(){state.currency=this.value;updateTotal();};cRow.appendChild(cl);cRow.appendChild(cSel);
  row3.appendChild(cRow);row3.appendChild(field(t('tax'),'tax'));body.appendChild(row3);

  // Items table
  var itemsLabel=document.createElement('div');itemsLabel.style='font-size:9px;color:#64748b;font-weight:600;';itemsLabel.textContent=t('item')+' / '+t('qty')+' / '+t('rate');body.appendChild(itemsLabel);
  var itemsWrap=document.createElement('div');itemsWrap.id='inv-items';itemsWrap.style='display:flex;flex-direction:column;gap:4px;';
  function renderItems(){
    itemsWrap.innerHTML='';
    state.items.forEach(function(item,i){
      var row=document.createElement('div');row.style='display:grid;grid-template-columns:1fr 40px 60px 20px;gap:3px;align-items:center;';
      function mkI(key,ph){var inp=document.createElement('input');inp.type=key==='qty'||key==='rate'?'number':'text';inp.value=item[key];inp.placeholder=ph;
        inp.style='background:#0f172a;color:#e2e8f0;border:1px solid rgba(59,130,246,0.15);padding:5px 6px;border-radius:5px;font-size:9px;outline:none;width:100%;';
        inp.oninput=function(){state.items[i][key]=this.value;updateTotal();};return inp;}
      var del=document.createElement('button');del.textContent='×';del.style='background:#ef444420;border:1px solid #ef4444;color:#ef4444;border-radius:4px;cursor:pointer;font-size:11px;font-weight:900;padding:4px;';
      del.onclick=function(){state.items.splice(i,1);renderItems();updateTotal();};
      row.appendChild(mkI('desc','Description'));row.appendChild(mkI('qty','1'));row.appendChild(mkI('rate','0'));row.appendChild(del);
      itemsWrap.appendChild(row);
    });
  }
  renderItems();body.appendChild(itemsWrap);
  var addBtn=document.createElement('button');addBtn.textContent=t('addRow');addBtn.style='background:rgba(59,130,246,0.1);color:#60a5fa;border:1px solid rgba(59,130,246,0.3);padding:6px;border-radius:6px;font-size:10px;cursor:pointer;';
  addBtn.onclick=function(){state.items.push({desc:'',qty:1,rate:0});renderItems();updateTotal();};body.appendChild(addBtn);

  body.appendChild(field(t('notes'),'notes',true));

  // Total display
  var totDiv=document.createElement('div');totDiv.id='inv-total';totDiv.style='background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.2);border-radius:8px;padding:10px;font-size:11px;color:#e2e8f0;';
  body.appendChild(totDiv);
  function updateTotal(){var t2=calcTotals();var c=state.currency;
    totDiv.innerHTML='<div style="display:flex;justify-content:space-between;"><span style="color:#64748b;">'+t('subtotal')+'</span><span>'+c+t2.sub.toFixed(2)+'</span></div>'+
      (state.tax?'<div style="display:flex;justify-content:space-between;"><span style="color:#64748b;">'+t('taxLine')+'</span><span>'+c+t2.tax.toFixed(2)+'</span></div>':'')+
      '<div style="display:flex;justify-content:space-between;font-size:14px;font-weight:900;color:#60a5fa;border-top:1px solid rgba(59,130,246,0.2);margin-top:6px;padding-top:6px;"><span>'+t('totalLine')+'</span><span>'+c+t2.total.toFixed(2)+'</span></div>';}
  updateTotal();

  var genBtn=document.createElement('button');genBtn.innerHTML=t('btnGen');genBtn.style='width:100%;background:linear-gradient(135deg,#1e3a8a,#3b82f6);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(59,130,246,0.3);';
  body.appendChild(genBtn);
  var actRow=document.createElement('div');actRow.style='display:flex;gap:5px;display:none;';actRow.id='inv-actions';
  var cpBtn=document.createElement('button');cpBtn.innerHTML=t('btnCopy');cpBtn.style='flex:1;background:rgba(59,130,246,0.1);color:#60a5fa;border:1px solid rgba(59,130,246,0.2);padding:8px;border-radius:7px;font-size:10px;font-weight:700;cursor:pointer;';
  var injBtn=document.createElement('button');injBtn.innerHTML=t('btnInject');injBtn.style='flex:1;background:rgba(99,102,241,0.1);color:#818cf8;border:1px solid rgba(99,102,241,0.2);padding:8px;border-radius:7px;font-size:10px;font-weight:700;cursor:pointer;';
  var ifr=document.createElement('iframe');ifr.id='inv-preview';ifr.style='width:100%;height:250px;border:1px solid rgba(255,255,255,0.07);border-radius:8px;display:none;';
  actRow.appendChild(cpBtn);if(window.editor)actRow.appendChild(injBtn);body.appendChild(actRow);body.appendChild(ifr);
  wrap.appendChild(body);parent.appendChild(wrap);

  genBtn.onclick=function(){
    var html=genHTML();
    ifr.style.display='';actRow.style.display='flex';
    ifr.contentDocument.open();ifr.contentDocument.write(html);ifr.contentDocument.close();
    cpBtn.onclick=function(){navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('Copied!');});};
    if(window.editor)injBtn.onclick=function(){window.editor.setValue(html);};
  };
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-invoice');if(el)el.textContent=t('tab');if(window.activeTab==='invoice')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='invoice'){window.activeTab='invoice';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-invoice');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();

/* ─── FREELANCE RATE CALCULATOR ─── */
(function(){
'use strict';
var TX={
  en:{tab:'Rate Calc',title:'💼 Freelance Rate Calculator',sub:'Calculate your ideal hourly rate',
    rent:'Monthly rent/housing ($):',food:'Food & groceries ($/mo):',transport:'Transport ($/mo):',
    internet:'Internet & subscriptions ($/mo):',health:'Health insurance ($/mo):',
    other:'Other expenses ($/mo):',savings:'Desired savings ($/mo):',
    profit:'Profit margin (%):',tax:'Tax rate (%):',hours:'Billable hours/week:',
    vacation:'Vacation weeks/year:',btnCalc:'💼 Calculate My Rate',
    resultMin:'Minimum hourly rate:',resultRec:'Recommended rate:',resultDay:'Day rate (8h):',
    resultMonth:'Monthly revenue target:',tip:'💡 Tip:'},
  fr:{tab:'Tarif',title:'💼 Calculateur de Tarif',sub:'Calculez votre tarif horaire idéal',
    rent:'Loyer/logement (€/mois) :',food:'Alimentation (€/mois) :',transport:'Transport (€/mois) :',
    internet:'Internet & abonnements (€/mois) :',health:'Assurance santé (€/mois) :',
    other:'Autres dépenses (€/mois) :',savings:'Épargne souhaitée (€/mois) :',
    profit:'Marge bénéficiaire (%) :',tax:'Taux d\'imposition (%) :',hours:'Heures facturables/semaine :',
    vacation:'Semaines de congé/an :',btnCalc:'💼 Calculer Mon Tarif',
    resultMin:'Tarif horaire minimum :',resultRec:'Tarif recommandé :',resultDay:'Tarif journalier (8h) :',
    resultMonth:'Objectif mensuel :',tip:'💡 Conseil :'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var D={rent:1200,food:400,transport:150,internet:80,health:200,other:200,savings:500,profit:30,tax:25,hours:30,vacation:4};

function calc(){
  var monthExp=D.rent+D.food+D.transport+D.internet+D.health+D.other+D.savings;
  var workWeeks=52-D.vacation;
  var annualExp=monthExp*12;
  var withTax=annualExp/(1-D.tax/100);
  var withProfit=withTax/(1-D.profit/100);
  var annualHours=D.hours*workWeeks;
  var minRate=annualExp/annualHours;
  var recRate=withProfit/annualHours;
  return{min:minRate,rec:recRate,day:recRate*8,monthly:withProfit/12,exp:monthExp};
}

function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(251,191,36,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(120,53,15,0.3),rgba(251,191,36,0.08));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#fbbf24;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:5px;';

  var resDiv=document.createElement('div');resDiv.id='rate-result';

  function mkN(lbl,key,step){
    var w=document.createElement('div');w.style='display:flex;justify-content:space-between;align-items:center;gap:6px;';
    var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;flex:1;';l.textContent=lbl;
    var inp=document.createElement('input');inp.type='number';inp.value=D[key];inp.step=step||1;
    inp.style='width:80px;background:#0f172a;color:#fbbf24;border:1px solid rgba(251,191,36,0.2);padding:5px 8px;border-radius:6px;font-size:10px;text-align:right;outline:none;';
    inp.oninput=function(){D[key]=+this.value;updateRes();};
    w.appendChild(l);w.appendChild(inp);return w;
  }

  var sections=[
    {label:gl()==='fr'?'💸 Dépenses mensuelles':'💸 Monthly Expenses',keys:['rent','food','transport','internet','health','other','savings']},
    {label:gl()==='fr'?'⚙️ Paramètres':'⚙️ Business Settings',keys:['profit','tax','hours','vacation']}
  ];

  sections.forEach(function(sec){
    var sl=document.createElement('div');sl.style='font-size:10px;color:#64748b;font-weight:700;padding:4px 0 2px;border-bottom:1px solid rgba(255,255,255,0.05);margin-top:4px;';sl.textContent=sec.label;body.appendChild(sl);
    sec.keys.forEach(function(k){body.appendChild(mkN(t(k),k));});
  });

  var btn=document.createElement('button');btn.innerHTML=t('btnCalc');btn.style='width:100%;background:linear-gradient(135deg,#78350f,#f59e0b);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(245,158,11,0.3);margin-top:4px;';
  body.appendChild(btn);body.appendChild(resDiv);wrap.appendChild(body);parent.appendChild(wrap);

  function updateRes(){
    var r=calc();var sym=gl()==='fr'?'€':'$';
    resDiv.innerHTML='<div style="background:rgba(251,191,36,0.08);border:1px solid rgba(251,191,36,0.25);border-radius:10px;padding:12px;margin-top:6px;display:flex;flex-direction:column;gap:7px;">'+
      mkRow(t('resultMin'),sym+r.min.toFixed(0)+'/hr','#94a3b8')+
      mkRow(t('resultRec'),'<span style="font-size:22px;font-weight:900;color:#fbbf24;">'+sym+r.rec.toFixed(0)+'/hr</span>','')+
      mkRow(t('resultDay'),sym+r.day.toFixed(0),'#4ade80')+
      mkRow(t('resultMonth'),sym+r.monthly.toFixed(0),'#60a5fa')+
      '<div style="font-size:9px;color:#64748b;border-top:1px solid rgba(255,255,255,0.05);padding-top:6px;">'+t('tip')+' '+(gl()==='fr'?
        'Facturez au moins '+sym+Math.ceil(r.rec/5)*5+'/h pour être rentable après impôts et congés.':
        'Bill at least '+sym+Math.ceil(r.rec/5)*5+'/h to be profitable after taxes and vacation.'
      )+'</div></div>';
  }
  function mkRow(lbl,val,c){return'<div style="display:flex;justify-content:space-between;align-items:center;"><span style="font-size:10px;color:#64748b;">'+lbl+'</span><span style="font-size:13px;font-weight:700;color:'+(c||'#e2e8f0')+';">'+val+'</span></div>';}
  btn.onclick=updateRes;
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-ratecalc');if(el)el.textContent=t('tab');if(window.activeTab==='ratecalc')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='ratecalc'){window.activeTab='ratecalc';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-ratecalc');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
