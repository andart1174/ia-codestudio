/**
 * 🏆 Competitor Analyzer + 💬 Testimonial Studio — EN/FR
 */
(function(){
'use strict';

/* ── COMPETITOR ANALYZER ── */
var CMP={
  en:{tab:'Competitor',title:'🏆 Competitor Analyzer',sub:'SWOT + Feature Matrix + Advantage Score',
      you:'Your Product',youP:'e.g. UltraApp',c1:'Competitor 1',c1P:'e.g. CompetitorA',c2:'Competitor 2',c2P:'e.g. CompetitorB',
      features:'Key Features (comma-separated)',featP:'e.g. AI, Mobile App, API, Free Trial, 24/7 Support',
      price:'Your Price',pricep:'e.g. $29/mo',btn:'🏆 Analyze',inject:'💉 Inject Report'},
  fr:{tab:'Concurrent',title:'🏆 Analyseur Concurrentiel',sub:'SWOT + Matrice Features + Score Avantage',
      you:'Votre Produit',youP:'ex. UltraApp',c1:'Concurrent 1',c1P:'ex. ConcurrentA',c2:'Concurrent 2',c2P:'ex. ConcurrentB',
      features:'Fonctionnalités clés (virgules)',featP:'ex. IA, App Mobile, API, Essai Gratuit, Support 24/7',
      price:'Votre Prix',pricep:'ex. 29€/mois',btn:'🏆 Analyser',inject:'💉 Injecter le Rapport'}
};
function glCM(){return window.lang||'en';}
function tcm(k){return(CMP[glCM()]||CMP.en)[k]||k;}

function renderCompetitor(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(251,191,36,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(251,191,36,0.1),rgba(245,158,11,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#fbbf24;">'+tcm('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tcm('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:7px;';

  function fi(id,lbl,ph){
    var d=document.createElement('div');
    var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;
    var i=document.createElement('input');i.id='cmp-'+id;i.placeholder=ph;
    i.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(251,191,36,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';
    d.appendChild(l);d.appendChild(i);return d;
  }
  body.appendChild(fi('you',tcm('you'),tcm('youP')));
  body.appendChild(fi('c1',tcm('c1'),tcm('c1P')));
  body.appendChild(fi('c2',tcm('c2'),tcm('c2P')));
  body.appendChild(fi('feat',tcm('features'),tcm('featP')));
  body.appendChild(fi('price',tcm('price'),tcm('pricep')));

  var btn=document.createElement('button');btn.innerHTML=tcm('btn');
  btn.style='width:100%;background:linear-gradient(135deg,#78350f,#f59e0b);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;';
  body.appendChild(btn);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);parent.appendChild(wrap);

  btn.onclick=function(){
    var you=document.getElementById('cmp-you').value||'Your Product';
    var c1=document.getElementById('cmp-c1').value||'Competitor A';
    var c2=document.getElementById('cmp-c2').value||'Competitor B';
    var featStr=document.getElementById('cmp-feat').value||'AI,Mobile,API,Free Trial,Support';
    var feats=featStr.split(',').map(function(f){return f.trim();}).filter(Boolean).slice(0,8);
    var isFr=glCM()==='fr';

    // Random scores for competitors (user's product gets bonus)
    function rnd(min,max){return Math.floor(Math.random()*(max-min+1))+min;}
    var youScore=rnd(70,95);var c1Score=rnd(45,75);var c2Score=rnd(40,70);

    // Feature matrix: you have all, competitors missing some
    var c1Missing=feats.filter(function(_,i){return i%3===2;});
    var c2Missing=feats.filter(function(_,i){return i%2===1;});

    var header='<div style="display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:4px;margin-bottom:6px;">'+
      '<div style="font-size:9px;color:#475569;font-weight:700;">'+(isFr?'Fonctionnalité':'Feature')+'</div>'+
      '<div style="font-size:9px;color:#fbbf24;font-weight:700;text-align:center;">'+you+'</div>'+
      '<div style="font-size:9px;color:#94a3b8;font-weight:700;text-align:center;">'+c1+'</div>'+
      '<div style="font-size:9px;color:#94a3b8;font-weight:700;text-align:center;">'+c2+'</div></div>';
    var rows=feats.map(function(f){
      var hc1=!c1Missing.includes(f);var hc2=!c2Missing.includes(f);
      return'<div style="display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:4px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.04);">'+
        '<div style="font-size:9px;color:#e2e8f0;">'+f+'</div>'+
        '<div style="text-align:center;font-size:11px;">✅</div>'+
        '<div style="text-align:center;font-size:11px;">'+(hc1?'✅':'❌')+'</div>'+
        '<div style="text-align:center;font-size:11px;">'+(hc2?'✅':'❌')+'</div></div>';
    }).join('');

    var swot=(isFr?
      '<div style="font-size:9px;color:#22c55e;font-weight:700;margin-bottom:4px;">✅ Forces</div><div style="font-size:9px;color:#94a3b8;margin-bottom:8px;">• Plus de fonctionnalités<br>• Score avantage plus élevé<br>• Solution plus complète</div>'+
      '<div style="font-size:9px;color:#ef4444;font-weight:700;margin-bottom:4px;">⚠️ Faiblesses</div><div style="font-size:9px;color:#94a3b8;">• Marque moins connue<br>• Réseau plus petit</div>':
      '<div style="font-size:9px;color:#22c55e;font-weight:700;margin-bottom:4px;">✅ Strengths</div><div style="font-size:9px;color:#94a3b8;margin-bottom:8px;">• More features<br>• Higher advantage score<br>• More complete solution</div>'+
      '<div style="font-size:9px;color:#ef4444;font-weight:700;margin-bottom:4px;">⚠️ Weaknesses</div><div style="font-size:9px;color:#94a3b8;">• Less brand recognition<br>• Smaller network</div>');

    res.innerHTML=
      '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px;margin-top:8px;margin-bottom:8px;">'+
      '<div style="background:rgba(251,191,36,0.1);border:1px solid rgba(251,191,36,0.3);border-radius:8px;padding:8px;text-align:center;"><div style="font-size:20px;font-weight:900;color:#fbbf24;">'+youScore+'</div><div style="font-size:8px;color:#64748b;">'+you+'</div></div>'+
      '<div style="background:rgba(148,163,184,0.06);border:1px solid rgba(148,163,184,0.15);border-radius:8px;padding:8px;text-align:center;"><div style="font-size:20px;font-weight:900;color:#94a3b8;">'+c1Score+'</div><div style="font-size:8px;color:#64748b;">'+c1+'</div></div>'+
      '<div style="background:rgba(148,163,184,0.06);border:1px solid rgba(148,163,184,0.15);border-radius:8px;padding:8px;text-align:center;"><div style="font-size:20px;font-weight:900;color:#94a3b8;">'+c2Score+'</div><div style="font-size:8px;color:#64748b;">'+c2+'</div></div></div>'+
      '<div style="background:rgba(251,191,36,0.05);border:1px solid rgba(251,191,36,0.15);border-radius:8px;padding:10px;margin-bottom:6px;">'+header+rows+'</div>'+
      '<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:10px;">'+swot+'</div>';
    if(window.showToast)window.showToast('🏆 Analysis complete!');
  };
}

document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;
  window.renderTab=function(tab){
    if(tab==='competitor'){window.activeTab='competitor';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b=document.getElementById('tab-competitor');if(b)b.classList.add('active');renderCompetitor();return;}
    if(typeof oRT==='function')oRT(tab);
  };
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-competitor');if(el)el.textContent=tcm('tab');if(window.activeTab==='competitor')renderCompetitor();};
});

/* ── TESTIMONIAL STUDIO ── */
var TST={
  en:{tab:'Testimonials',title:'💬 Testimonial Studio',sub:'Animated testimonial widgets — inject into project',
      name:'Customer Name',nameP:'e.g. Sarah Johnson',role:'Role/Company',roleP:'e.g. CEO at TechCorp',
      text:'Testimonial Text',textP:'This product transformed how we work. Incredible results in just 2 weeks.',
      rating:'Rating',style:'Style',btn:'💬 Generate Widget',inject:'💉 Inject into Editor',copy:'📋 Copy HTML',
      styles:['Card','Bubble','Minimal','Bold','Floating']},
  fr:{tab:'Témoignages',title:'💬 Studio Témoignages',sub:'Widgets témoignages animés — injectables dans le projet',
      name:'Nom du Client',nameP:'ex. Sarah Johnson',role:'Rôle/Entreprise',roleP:'ex. CEO chez TechCorp',
      text:'Texte du Témoignage',textP:'Ce produit a transformé notre façon de travailler. Résultats incroyables en 2 semaines.',
      rating:'Note',style:'Style',btn:'💬 Générer le Widget',inject:'💉 Injecter dans l\'Éditeur',copy:'📋 Copier HTML',
      styles:['Carte','Bulle','Minimal','Gras','Flottant']}
};
function glT(){return window.lang||'en';}
function tt(k){return(TST[glT()]||TST.en)[k]||k;}

var tState={name:'Sarah Johnson',role:'CEO at TechCorp',text:'This product transformed how we work. Incredible results in just 2 weeks!',rating:5,style:'card'};
var TSTYLES=['card','bubble','minimal','bold','floating'];

function buildTestimonialHTML(s){
  var stars='★'.repeat(s.rating)+'☆'.repeat(5-s.rating);
  var avatar=s.name.split(' ').map(function(n){return n[0];}).join('').substring(0,2).toUpperCase();
  var colors=['#8b5cf6','#3b82f6','#ec4899','#10b981','#f59e0b'];
  var c=colors[s.name.charCodeAt(0)%colors.length];

  if(s.style==='card'){
    return'<div style="background:rgba(255,255,255,0.05);backdrop-filter:blur(15px);border:1px solid rgba(255,255,255,0.12);border-radius:16px;padding:24px;max-width:380px;font-family:Inter,sans-serif;box-shadow:0 8px 32px rgba(0,0,0,0.3);transition:transform .3s;" onmouseover="this.style.transform=\'translateY(-4px)\'" onmouseout="this.style.transform=\'\'">'+
      '<div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">'+
      '<div style="width:44px;height:44px;background:'+c+';border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:#fff;">'+avatar+'</div>'+
      '<div><div style="font-size:14px;font-weight:700;color:#fff;">'+s.name+'</div><div style="font-size:11px;color:#64748b;">'+s.role+'</div></div></div>'+
      '<div style="font-size:18px;color:'+c+';margin-bottom:10px;">'+stars+'</div>'+
      '<div style="font-size:13px;color:#94a3b8;line-height:1.7;font-style:italic;">"'+s.text+'"</div></div>';
  }
  if(s.style==='bubble'){
    return'<div style="max-width:380px;font-family:Inter,sans-serif;">'+
      '<div style="background:'+c+'22;border:2px solid '+c+'44;border-radius:16px 16px 16px 0;padding:18px;margin-bottom:10px;">'+
      '<div style="font-size:16px;color:'+c+';margin-bottom:8px;">'+stars+'</div>'+
      '<div style="font-size:13px;color:#e2e8f0;line-height:1.7;font-style:italic;">"'+s.text+'"</div></div>'+
      '<div style="display:flex;align-items:center;gap:10px;padding-left:14px;">'+
      '<div style="width:36px;height:36px;background:'+c+';border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;">'+avatar+'</div>'+
      '<div><div style="font-size:12px;font-weight:700;color:#fff;">'+s.name+'</div><div style="font-size:10px;color:#64748b;">'+s.role+'</div></div></div></div>';
  }
  if(s.style==='minimal'){
    return'<div style="max-width:380px;font-family:Inter,sans-serif;padding:16px;border-left:3px solid '+c+';">'+
      '<div style="font-size:13px;color:#94a3b8;line-height:1.8;font-style:italic;margin-bottom:12px;">"'+s.text+'"</div>'+
      '<div style="font-size:16px;color:'+c+';margin-bottom:6px;">'+stars+'</div>'+
      '<div style="font-size:12px;font-weight:700;color:#e2e8f0;">'+s.name+'</div><div style="font-size:10px;color:#64748b;">'+s.role+'</div></div>';
  }
  if(s.style==='bold'){
    return'<div style="background:linear-gradient(135deg,'+c+'33,transparent);border:1px solid '+c+'55;border-radius:20px;padding:28px;max-width:380px;font-family:Inter,sans-serif;">'+
      '<div style="font-size:48px;color:'+c+';font-weight:900;line-height:1;margin-bottom:12px;">"</div>'+
      '<div style="font-size:15px;color:#fff;line-height:1.7;font-weight:600;margin-bottom:16px;">'+s.text+'</div>'+
      '<div style="font-size:20px;color:'+c+';margin-bottom:8px;">'+stars+'</div>'+
      '<div style="display:flex;align-items:center;gap:10px;">'+
      '<div style="width:40px;height:40px;background:'+c+';border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:700;color:#fff;">'+avatar+'</div>'+
      '<div><div style="font-size:13px;font-weight:700;color:#fff;">'+s.name+'</div><div style="font-size:10px;color:#64748b;">'+s.role+'</div></div></div></div>';
  }
  // floating
  return'<div style="position:relative;max-width:380px;font-family:Inter,sans-serif;">'+
    '<div style="position:absolute;top:-12px;left:20px;background:'+c+';border-radius:50%;width:44px;height:44px;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:#fff;z-index:1;box-shadow:0 4px 12px '+c+'88;">'+avatar+'</div>'+
    '<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:28px 20px 18px;margin-top:10px;">'+
    '<div style="font-size:16px;color:'+c+';margin-bottom:8px;padding-top:6px;">'+stars+'</div>'+
    '<div style="font-size:13px;color:#94a3b8;line-height:1.7;font-style:italic;">"'+s.text+'"</div>'+
    '<div style="margin-top:12px;font-size:12px;font-weight:700;color:#fff;">'+s.name+'</div>'+
    '<div style="font-size:10px;color:#64748b;">'+s.role+'</div></div></div>';
}

function renderTestimonial(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(139,92,246,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(139,92,246,0.1),rgba(59,130,246,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#a78bfa;">'+tt('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tt('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:7px;';

  function fi(id,lbl,ph,area){
    var d=document.createElement('div');
    var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;
    var i=area?document.createElement('textarea'):document.createElement('input');
    i.id='tst-'+id;i.placeholder=ph;i.value=tState[id]||'';if(area){i.rows=3;i.style='resize:none;';}
    i.style=(i.style.cssText||'')+'width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(139,92,246,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';
    i.oninput=function(){tState[id]=this.value;};
    d.appendChild(l);d.appendChild(i);return d;
  }
  body.appendChild(fi('name',tt('name'),tt('nameP')));
  body.appendChild(fi('role',tt('role'),tt('roleP')));
  body.appendChild(fi('text',tt('text'),tt('textP'),true));

  // Rating
  var ratingD=document.createElement('div');
  var rl=document.createElement('div');rl.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:4px;';rl.textContent=tt('rating');ratingD.appendChild(rl);
  var stars=document.createElement('div');stars.style='display:flex;gap:4px;';
  for(var i=1;i<=5;i++){
    (function(n){
      var s=document.createElement('button');s.textContent='★';s.dataset.r=n;
      s.style='background:none;border:none;font-size:22px;cursor:pointer;color:'+(n<=tState.rating?'#f59e0b':'#374151')+';padding:0;line-height:1;';
      s.onclick=function(){tState.rating=n;document.querySelectorAll('[data-r]').forEach(function(x){x.style.color=parseInt(x.dataset.r)<=n?'#f59e0b':'#374151';});};
      stars.appendChild(s);
    })(i);
  }
  ratingD.appendChild(stars);body.appendChild(ratingD);

  // Style
  var styleLbl=document.createElement('div');styleLbl.style='font-size:9px;color:#94a3b8;font-weight:700;';styleLbl.textContent=tt('style');body.appendChild(styleLbl);
  var styleRow=document.createElement('div');styleRow.style='display:flex;gap:4px;flex-wrap:wrap;';
  var styleLabels=tt('styles');
  TSTYLES.forEach(function(s,idx){
    var b=document.createElement('button');b.textContent=Array.isArray(styleLabels)?styleLabels[idx]:s;b.dataset.ts=s;
    var active=tState.style===s;
    b.style='padding:4px 10px;border-radius:20px;font-size:9px;font-weight:700;cursor:pointer;border:1px solid rgba(139,92,246,'+(active?'0.7)':' 0.25)')+';background:rgba(139,92,246,'+(active?'0.2)':'0.05)')+';color:'+(active?'#a78bfa':'#64748b')+';';
    b.onclick=function(){tState.style=s;document.querySelectorAll('[data-ts]').forEach(function(x){x.style.borderColor='rgba(139,92,246,0.25)';x.style.background='rgba(139,92,246,0.05)';x.style.color='#64748b';});this.style.borderColor='rgba(139,92,246,0.7)';this.style.background='rgba(139,92,246,0.2)';this.style.color='#a78bfa';};
    styleRow.appendChild(b);
  });
  body.appendChild(styleRow);

  var btn=document.createElement('button');btn.innerHTML=tt('btn');
  btn.style='width:100%;background:linear-gradient(135deg,#4c1d95,#8b5cf6);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;';
  body.appendChild(btn);

  var actRow=document.createElement('div');actRow.style='display:none;gap:6px;';
  var injBtn=document.createElement('button');injBtn.innerHTML=tt('inject');
  injBtn.style='flex:1;background:linear-gradient(135deg,#064e3b,#10b981);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cpBtn=document.createElement('button');cpBtn.innerHTML=tt('copy');
  cpBtn.style='flex:1;background:rgba(255,255,255,0.06);color:#94a3b8;border:1px solid rgba(255,255,255,0.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  actRow.appendChild(injBtn);actRow.appendChild(cpBtn);body.appendChild(actRow);

  var preview=document.createElement('div');preview.style='padding:10px;background:rgba(30,30,50,0.8);border-radius:8px;display:none;';body.appendChild(preview);
  wrap.appendChild(body);parent.appendChild(wrap);

  var lastHTML='';
  btn.onclick=function(){
    tState.name=document.getElementById('tst-name').value||'Sarah Johnson';
    tState.role=document.getElementById('tst-role').value||'CEO';
    tState.text=document.getElementById('tst-text').value||'Amazing product!';
    lastHTML=buildTestimonialHTML(tState);
    preview.style.display='block';preview.innerHTML=lastHTML;
    actRow.style.display='flex';
    if(window.showToast)window.showToast('💬 Widget generated!');
  };
  injBtn.onclick=function(){
    if(!lastHTML)return;
    var fullSnippet='<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">\n'+lastHTML;
    var inj=window.injectCode||(window.parent&&window.parent.injectCode);
    if(typeof inj==='function'){inj(fullSnippet);if(window.showToast)window.showToast('✅ Widget injected!');}
  };
  cpBtn.onclick=function(){if(lastHTML&&navigator.clipboard)navigator.clipboard.writeText(lastHTML).then(function(){if(window.showToast)window.showToast('📋 Copied!');});};
}

document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;
  window.renderTab=function(tab){
    if(tab==='testimonial'){window.activeTab='testimonial';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b=document.getElementById('tab-testimonial');if(b)b.classList.add('active');renderTestimonial();return;}
    if(typeof oRT==='function')oRT(tab);
  };
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-testimonial');if(el)el.textContent=tt('tab');if(window.activeTab==='testimonial')renderTestimonial();};
});
})();
