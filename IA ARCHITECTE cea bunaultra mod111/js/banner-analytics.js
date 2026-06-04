/**
 * 🎁 Promo Banner Studio + 📊 Analytics Dashboard — EN/FR
 */
(function(){
'use strict';
/* ── PROMO BANNER ── */
var PB={
  en:{tab:'Promo Banner',title:'🎁 Promo Banner Studio',sub:'Animated banners with countdown + Urgency Score',
      headline:'Headline',headlineP:'e.g. 50% OFF Today Only!',sub2:'Subtext',sub2P:'e.g. Limited time offer — ends midnight',
      cta:'Button Text',ctaP:'e.g. Grab Deal Now',color:'Primary Color',style:'Style',
      countdown:'Add Countdown Timer',btn:'🎨 Generate Banner',inject:'💉 Inject',copy:'📋 Copy',
      urgency:'Urgency Score'},
  fr:{tab:'Bannière Promo',title:'🎁 Studio Bannière Promo',sub:'Bannières animées avec compte à rebours + Score Urgence',
      headline:'Titre',headlineP:'ex. -50% Aujourd\'hui Seulement!',sub2:'Sous-titre',sub2P:'ex. Offre limitée — expire à minuit',
      cta:'Bouton',ctaP:'ex. J\'en profite!',color:'Couleur Principale',style:'Style',
      countdown:'Compte à Rebours',btn:'🎨 Générer',inject:'💉 Injecter',copy:'📋 Copier',urgency:'Score Urgence'}
};
var STYLES2=['gradient','minimal','glassmorphism','neon','bold'];
function glP(){return window.lang||'en';}
function tp(k){return(PB[glP()]||PB.en)[k]||k;}
var pState={headline:'50% OFF Today Only!',sub:'Limited offer — ends midnight',cta:'Grab Deal Now',color:'#ef4444',style:'gradient',countdown:true};

function urgencyScore(headline,sub,cta){
  var txt=(headline+' '+sub+' '+cta).toLowerCase();
  var s=0;
  var triggers=['off','today','only','limited','ends','midnight','now','grab','hurry','last','exclusive','free','deal','save','discount','expires','hours','left'];
  triggers.forEach(function(w){if(txt.includes(w))s+=5;});
  return Math.min(s,100);
}

function buildBanner(d){
  var countdownCode=d.countdown?
    '<script>var dl=new Date();dl.setHours(23,59,59,0);function updateCt(){var now=new Date();var diff=Math.max(0,dl-now);var h=Math.floor(diff/3600000);var m=Math.floor((diff%3600000)/60000);var s=Math.floor((diff%60000)/1000);document.getElementById("ct").textContent=String(h).padStart(2,"0")+":"+String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");}setInterval(updateCt,1000);updateCt();<\/script>':'';
  var styles={
    gradient:'background:linear-gradient(135deg,'+d.color+','+d.color+'99);',
    minimal:'background:#0f172a;border:2px solid '+d.color+';',
    glassmorphism:'background:rgba(255,255,255,0.08);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.15);',
    neon:'background:#050810;border:2px solid '+d.color+';box-shadow:0 0 30px '+d.color+'66,inset 0 0 30px '+d.color+'11;',
    bold:'background:'+d.color+';'
  };
  var st=styles[d.style]||styles.gradient;
  return '<div style="'+st+'border-radius:16px;padding:32px;text-align:center;font-family:Inter,sans-serif;max-width:600px;margin:0 auto;">'+
    '<div style="font-size:32px;font-weight:900;color:#fff;margin-bottom:8px;letter-spacing:-0.5px;">'+d.headline+'</div>'+
    '<div style="font-size:14px;color:rgba(255,255,255,0.8);margin-bottom:16px;">'+d.sub+'</div>'+
    (d.countdown?'<div id="ct" style="font-size:28px;font-weight:900;color:#fff;background:rgba(0,0,0,0.3);border-radius:10px;padding:8px 20px;display:inline-block;letter-spacing:4px;margin-bottom:16px;font-family:monospace;">23:59:59</div><br>':'')+
    '<button style="background:#fff;color:'+d.color+';border:none;padding:14px 32px;border-radius:50px;font-size:15px;font-weight:900;cursor:pointer;transition:.2s;" onmouseover="this.style.transform=\'scale(1.05)\'" onmouseout="this.style.transform=\'\'">'+d.cta+'</button>'+
    '</div>'+countdownCode;
}

function renderPromo(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(239,68,68,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(239,68,68,0.1),rgba(251,146,60,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#f87171;">'+tp('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tp('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  function fi(id,lbl,ph){var d=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;var i=document.createElement('input');i.id='pb2-'+id;i.placeholder=ph;i.value=pState[id]||'';i.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(239,68,68,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){pState[id]=this.value;};d.appendChild(l);d.appendChild(i);return d;}
  body.appendChild(fi('headline',tp('headline'),tp('headlineP')));
  body.appendChild(fi('sub',tp('sub2'),tp('sub2P')));
  body.appendChild(fi('cta',tp('cta'),tp('ctaP')));

  var cr=document.createElement('div');cr.style='display:grid;grid-template-columns:1fr 1fr;gap:8px;';
  var cd=document.createElement('div');var cl=document.createElement('div');cl.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';cl.textContent=tp('color');var ci=document.createElement('input');ci.type='color';ci.id='pb2-color';ci.value=pState.color;ci.style='width:100%;height:34px;background:#0d1117;border:1px solid rgba(239,68,68,0.25);border-radius:6px;cursor:pointer;padding:2px;';ci.oninput=function(){pState.color=this.value;};cd.appendChild(cl);cd.appendChild(ci);
  var ctd=document.createElement('div');var ctl=document.createElement('div');ctl.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';ctl.textContent=tp('countdown');var ctc=document.createElement('input');ctc.type='checkbox';ctc.id='pb2-countdown';ctc.checked=pState.countdown;ctc.style='width:18px;height:18px;accent-color:#ef4444;margin-top:8px;cursor:pointer;';ctc.onchange=function(){pState.countdown=this.checked;};ctd.appendChild(ctl);ctd.appendChild(ctc);
  cr.appendChild(cd);cr.appendChild(ctd);body.appendChild(cr);

  var sl=document.createElement('div');sl.style='font-size:9px;color:#94a3b8;font-weight:700;';sl.textContent=tp('style');body.appendChild(sl);
  var sr=document.createElement('div');sr.style='display:flex;gap:4px;flex-wrap:wrap;';
  STYLES2.forEach(function(s){var b=document.createElement('button');b.textContent=s;b.dataset.s2=s;var on=pState.style===s;b.style='padding:4px 9px;border-radius:20px;font-size:9px;font-weight:700;cursor:pointer;border:1px solid rgba(239,68,68,'+(on?'0.7)':'0.25)')+';background:rgba(239,68,68,'+(on?'0.2)':'0.05)')+';color:'+(on?'#f87171':'#64748b')+';';b.onclick=function(){pState.style=s;document.querySelectorAll('[data-s2]').forEach(function(x){x.style.borderColor='rgba(239,68,68,0.25)';x.style.background='rgba(239,68,68,0.05)';x.style.color='#64748b';});this.style.borderColor='rgba(239,68,68,0.7)';this.style.background='rgba(239,68,68,0.2)';this.style.color='#f87171';};sr.appendChild(b);});
  body.appendChild(sr);

  var btn=document.createElement('button');btn.innerHTML=tp('btn');btn.style='width:100%;background:linear-gradient(135deg,#7f1d1d,#ef4444);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=tp('inject');ib.style='flex:1;background:linear-gradient(135deg,#064e3b,#10b981);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=tp('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var pv=document.createElement('div');pv.style='padding:10px;background:rgba(20,20,40,0.9);border-radius:8px;display:none;';body.appendChild(pv);
  wrap.appendChild(body);parent.appendChild(wrap);
  var html='';

  btn.onclick=function(){
    pState.headline=document.getElementById('pb2-headline').value||'50% OFF!';
    pState.sub=document.getElementById('pb2-sub').value||'Limited time';
    pState.cta=document.getElementById('pb2-cta').value||'Get Deal';
    pState.color=document.getElementById('pb2-color').value;
    pState.countdown=document.getElementById('pb2-countdown').checked;
    html=buildBanner(pState);
    var us=urgencyScore(pState.headline,pState.sub,pState.cta);
    var uc=us>=70?'#22c55e':us>=40?'#f59e0b':'#ef4444';
    pv.style.display='block';pv.innerHTML=html+'<div style="margin-top:8px;font-size:9px;font-weight:700;color:'+uc+';">'+tp('urgency')+': '+us+'/100</div>';
    ar.style.display='flex';if(window.showToast)window.showToast('🎁 Banner generated!');
  };
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){var full='<link href="https://fonts.googleapis.com/css2?family=Inter:wght@700;900&display=swap" rel="stylesheet">\n'+html;inj(full);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 Copied!');});};
}

document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='promobanner'){window.activeTab='promobanner';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b=document.getElementById('tab-promobanner');if(b)b.classList.add('active');renderPromo();return;}if(typeof oRT==='function')oRT(tab);};
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-promobanner');if(el)el.textContent=tp('tab');if(window.activeTab==='promobanner')renderPromo();};
});

/* ── ANALYTICS DASHBOARD ── */
var AD={
  en:{tab:'Analytics',title:'📊 Analytics Dashboard',sub:'Animated KPIs + Canvas charts — inject anywhere',
      users:'Monthly Users',revenue:'Revenue ($)',conversion:'Conversion %',churn:'Churn %',
      sessions:'Sessions',bounce:'Bounce Rate %',btn:'📊 Generate Dashboard',inject:'💉 Inject',copy:'📋 Copy'},
  fr:{tab:'Analytics',title:'📊 Dashboard Analytics',sub:'KPIs animés + graphiques Canvas — injectables partout',
      users:'Utilisateurs/mois',revenue:'Revenus (€)',conversion:'Taux Conversion %',churn:'Taux Churn %',
      sessions:'Sessions',bounce:'Taux de Rebond %',btn:'📊 Générer Dashboard',inject:'💉 Injecter',copy:'📋 Copier'}
};
function glA(){return window.lang||'en';}
function ta(k){return(AD[glA()]||AD.en)[k]||k;}
var aState={users:12500,revenue:48000,conversion:3.2,churn:2.1,sessions:35000,bounce:42};

function buildDashHTML(d){
  var fr=glA()==='fr';
  var kpis=[
    {label:ta('users'),value:d.users.toLocaleString(),icon:'👥',color:'#3b82f6',trend:'+12%'},
    {label:ta('revenue'),value:'$'+d.revenue.toLocaleString(),icon:'💰',color:'#22c55e',trend:'+18%'},
    {label:ta('conversion'),value:d.conversion+'%',icon:'🎯',color:'#8b5cf6',trend:'+0.4%'},
    {label:ta('churn'),value:d.churn+'%',icon:'📉',color:'#ef4444',trend:'-0.3%'},
    {label:ta('sessions'),value:d.sessions.toLocaleString(),icon:'📱',color:'#f59e0b',trend:'+8%'},
    {label:ta('bounce'),value:d.bounce+'%',icon:'🔄',color:'#06b6d4',trend:'-5%'}
  ];
  var kpiHTML=kpis.map(function(k){
    return'<div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:16px;">'+
      '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">'+
      '<div style="font-size:20px;">'+k.icon+'</div>'+
      '<div style="font-size:11px;font-weight:700;color:'+(k.trend.startsWith('+')?'#22c55e':'#ef4444')+';">'+k.trend+'</div></div>'+
      '<div style="font-size:22px;font-weight:900;color:'+k.color+';margin-bottom:3px;">'+k.value+'</div>'+
      '<div style="font-size:10px;color:#475569;">'+k.label+'</div></div>';
  }).join('');
  return'<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Analytics Dashboard</title>'+
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">'+
    '<style>*{margin:0;padding:0;box-sizing:border-box;font-family:Inter,sans-serif}body{background:#050810;color:#e2e8f0;padding:24px;min-height:100vh}'+
    'h1{font-size:24px;font-weight:900;margin-bottom:4px}'+
    '.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:20px}'+
    '.chart-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}'+
    '.card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:18px}'+
    '.card-title{font-size:11px;font-weight:700;color:#475569;letter-spacing:1px;text-transform:uppercase;margin-bottom:14px}'+
    '@keyframes countUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}'+
    '[data-kpi]{animation:countUp .6s ease forwards}'+
    '</style></head><body>'+
    '<div style="margin-bottom:20px;"><h1>📊 '+(fr?'Dashboard Analytics':'Analytics Dashboard')+'</h1>'+
    '<div style="font-size:12px;color:#475569;">'+(fr?'Dernière mise à jour':'Last updated')+': '+new Date().toLocaleString(fr?'fr-FR':'en-US')+'</div></div>'+
    '<div class="grid">'+kpiHTML+'</div>'+
    '<div class="chart-row">'+
    '<div class="card"><div class="card-title">'+(fr?'Revenus 6 mois':'6-Month Revenue')+'</div><canvas id="chart1" width="300" height="160"></canvas></div>'+
    '<div class="card"><div class="card-title">'+(fr?'Trafic par Source':'Traffic by Source')+'</div><canvas id="chart2" width="300" height="160"></canvas></div>'+
    '</div>'+
    '<script>'+
    '(function(){var c1=document.getElementById("chart1");var ctx=c1.getContext("2d");'+
    'var months=["Jan","Feb","Mar","Apr","May","Jun"];'+
    'var vals=['+Math.round(d.revenue*.6)+','+Math.round(d.revenue*.7)+','+Math.round(d.revenue*.75)+','+Math.round(d.revenue*.82)+','+Math.round(d.revenue*.9)+','+d.revenue+'];'+
    'var max=Math.max.apply(null,vals)*1.1;ctx.strokeStyle="rgba(255,255,255,.05)";'+
    'for(var i=0;i<5;i++){var y=140-i*28;ctx.beginPath();ctx.moveTo(30,y);ctx.lineTo(290,y);ctx.stroke();}'+
    'var grad=ctx.createLinearGradient(0,0,0,160);grad.addColorStop(0,"rgba(34,197,94,.4)");grad.addColorStop(1,"rgba(34,197,94,.02)");'+
    'ctx.beginPath();ctx.moveTo(30,140-vals[0]/max*120);'+
    'vals.forEach(function(v,i){ctx.lineTo(30+i*52,140-v/max*120);});'+
    'ctx.lineTo(30+5*52,140);ctx.lineTo(30,140);ctx.closePath();ctx.fillStyle=grad;ctx.fill();'+
    'ctx.strokeStyle="#22c55e";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(30,140-vals[0]/max*120);'+
    'vals.forEach(function(v,i){ctx.lineTo(30+i*52,140-v/max*120);});ctx.stroke();'+
    'months.forEach(function(m,i){ctx.fillStyle="#475569";ctx.font="10px Inter";ctx.textAlign="center";ctx.fillText(m,30+i*52,156);});'+
    'var c2=document.getElementById("chart2");var ctx2=c2.getContext("2d");'+
    'var sources=["Organic","Direct","Social","Referral","Paid"];var spcts=[38,22,18,12,10];'+
    'var colors2=["#3b82f6","#8b5cf6","#ec4899","#f59e0b","#22c55e"];'+
    'var total=spcts.reduce(function(a,b){return a+b;},0);var start=0;'+
    'spcts.forEach(function(p,i){var angle=p/total*2*Math.PI;ctx2.beginPath();ctx2.moveTo(120,80);ctx2.arc(120,80,65,start,start+angle);ctx2.closePath();ctx2.fillStyle=colors2[i];ctx2.fill();start+=angle;});'+
    'ctx2.beginPath();ctx2.arc(120,80,30,0,2*Math.PI);ctx2.fillStyle="#050810";ctx2.fill();'+
    'sources.forEach(function(s,i){ctx2.fillStyle=colors2[i];ctx2.fillRect(240,20+i*26,10,10);ctx2.fillStyle="#94a3b8";ctx2.font="10px Inter";ctx2.fillText(s+" "+spcts[i]+"%",255,30+i*26);});'+
    '})();'+
    '<\/script></body></html>';
}

function renderAnalytics(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(59,130,246,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(59,130,246,0.1),rgba(99,102,241,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#60a5fa;">'+ta('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+ta('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';
  var fields=[['users',ta('users'),'12500'],['revenue',ta('revenue'),'48000'],['conversion',ta('conversion'),'3.2'],['churn',ta('churn'),'2.1'],['sessions',ta('sessions'),'35000'],['bounce',ta('bounce'),'42']];
  fields.forEach(function(f){
    var row=document.createElement('div');row.style='display:flex;align-items:center;gap:8px;';
    var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;flex:1;';l.textContent=f[1];
    var i=document.createElement('input');i.type='number';i.id='ad-'+f[0];i.value=f[2];
    i.style='width:80px;background:#0d1117;color:#e2e8f0;border:1px solid rgba(59,130,246,0.25);border-radius:6px;padding:5px 7px;font-size:10px;outline:none;text-align:right;';
    i.oninput=function(){aState[f[0]]=parseFloat(this.value)||0;};
    row.appendChild(l);row.appendChild(i);body.appendChild(row);
  });
  var btn=document.createElement('button');btn.innerHTML=ta('btn');btn.style='width:100%;background:linear-gradient(135deg,#1e3a5f,#3b82f6);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:4px;';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=ta('inject');ib.style='flex:1;background:linear-gradient(135deg,#064e3b,#10b981);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=ta('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);parent.appendChild(wrap);
  var html='';

  btn.onclick=function(){
    fields.forEach(function(f){aState[f[0]]=parseFloat((document.getElementById('ad-'+f[0])||{}).value)||0;});
    html=buildDashHTML(aState);ar.style.display='flex';
    res.innerHTML='<div style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#60a5fa;">✅ Dashboard with 6 KPIs + 2 Canvas charts ready</div>';
    if(window.showToast)window.showToast('📊 Dashboard generated!');
  };
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 Copied!');});};
}

document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='analytics'){window.activeTab='analytics';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b=document.getElementById('tab-analytics');if(b)b.classList.add('active');renderAnalytics();return;}if(typeof oRT==='function')oRT(tab);};
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-analytics');if(el)el.textContent=ta('tab');if(window.activeTab==='analytics')renderAnalytics();};
});
})();
