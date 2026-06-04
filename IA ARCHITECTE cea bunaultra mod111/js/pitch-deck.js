/**
 * 🎯 Pitch Deck Builder v1.0 — EN/FR
 */
(function(){
'use strict';
var TX={
  en:{tab:'Pitch Deck',title:'🎯 Pitch Deck Builder',sub:'Generate a professional 10-slide investor pitch in seconds',
      name:'Startup Name',nameP:'e.g. UltraAI',tagline:'Tagline',taglineP:'e.g. AI for everyone',
      problem:'Problem',problemP:'What pain does it solve?',solution:'Solution',solutionP:'Your product/service',
      market:'Market Size',marketP:'e.g. $50B global market',traction:'Traction',tractionP:'e.g. 500 beta users, $10k MRR',
      team:'Team',teamP:'e.g. CEO: 10yr in SaaS, CTO: ex-Google',ask:'Funding Ask',askP:'e.g. $500k pre-seed',
      btn:'🚀 Generate Pitch Deck',inject:'💉 Inject into Editor',copy:'📋 Copy HTML',
      slides:['Problem','Solution','Market Opportunity','Product Demo','Business Model','Traction','Go-To-Market','Team','Competition','The Ask']},
  fr:{tab:'Pitch Deck',title:'🎯 Pitch Deck Builder',sub:'Créez un pitch deck investisseur professionnel en secondes',
      name:'Nom du Projet',nameP:'ex. UltraAI',tagline:'Accroche',taglineP:'ex. L\'IA pour tous',
      problem:'Problème',problemP:'Quelle douleur résolvez-vous?',solution:'Solution',solutionP:'Votre produit/service',
      market:'Taille du Marché',marketP:'ex. 50Mds$ marché mondial',traction:'Traction',tractionP:'ex. 500 bêta-testeurs, 10k$/mois',
      team:'Équipe',teamP:'ex. CEO: 10ans SaaS, CTO: ex-Google',ask:'Levée de Fonds',askP:'ex. 500k$ pré-seed',
      btn:'🚀 Générer le Pitch Deck',inject:'💉 Injecter dans l\'Éditeur',copy:'📋 Copier HTML',
      slides:['Problème','Solution','Opportunité de Marché','Démo Produit','Modèle Business','Traction','Go-To-Market','Équipe','Concurrence','La Demande']}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var state={name:'',tagline:'',problem:'',solution:'',market:'',traction:'',team:'',ask:'',html:''};

function inp(id,lbl,ph){
  var d=document.createElement('div');d.style='margin-bottom:8px;';
  var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;
  var i=document.createElement('input');i.id='pd-'+id;i.placeholder=ph;i.value=state[id]||'';
  i.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(139,92,246,0.3);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';
  i.oninput=function(){state[id]=this.value;};
  d.appendChild(l);d.appendChild(i);return d;
}

function buildHTML(){
  var tx=TX[gl()]||TX.en;
  var slides=[
    {icon:'🔥',title:tx.slides[0],content:state.problem||'Define the pain point your startup solves.'},
    {icon:'💡',title:tx.slides[1],content:state.solution||'Your product solves the problem by...'},
    {icon:'📊',title:tx.slides[2],content:'Total Addressable Market: '+( state.market||'$1B+')},
    {icon:'🖥️',title:tx.slides[3],content:'Key features: AI-powered dashboard · Mobile-first · API integrations'},
    {icon:'💰',title:tx.slides[4],content:'SaaS subscription $29-$299/mo · Transaction fees · Enterprise licensing'},
    {icon:'📈',title:tx.slides[5],content:state.traction||'Early traction metrics here'},
    {icon:'🗺️',title:tx.slides[6],content:'Phase 1: Product Hunt · Phase 2: SEO · Phase 3: B2B Sales'},
    {icon:'👥',title:tx.slides[7],content:state.team||'Founding team expertise'},
    {icon:'⚔️',title:tx.slides[8],content:'Competitive advantage: faster, cheaper, more accurate than alternatives'},
    {icon:'🚀',title:tx.slides[9],content:'Raising: '+(state.ask||'$500k')+' · Use: 60% product · 30% marketing · 10% ops'}
  ];
  var colors=['#ef4444','#8b5cf6','#3b82f6','#06b6d4','#10b981','#f59e0b','#ec4899','#6366f1','#f97316','#22c55e'];
  var slidesHTML=slides.map(function(s,i){
    return '<div class="slide" id="slide-'+i+'" style="display:'+(i===0?'flex':'none')+';flex-direction:column;justify-content:center;align-items:center;text-align:center;height:100%;padding:40px;background:radial-gradient(ellipse at center,'+colors[i]+'22 0%,transparent 70%);">'+
      '<div style="font-size:60px;margin-bottom:20px;">'+s.icon+'</div>'+
      '<div style="font-size:11px;font-weight:900;color:'+colors[i]+';letter-spacing:3px;text-transform:uppercase;margin-bottom:12px;">SLIDE '+(i+1)+' / '+slides.length+'</div>'+
      '<div style="font-size:32px;font-weight:900;color:#fff;margin-bottom:18px;">'+s.title+'</div>'+
      '<div style="font-size:14px;color:#94a3b8;max-width:600px;line-height:1.7;">'+s.content+'</div>'+
      '</div>';
  }).join('');

  return '<!DOCTYPE html><html lang="'+gl()+'"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+( state.name||'Pitch Deck')+'</title>'+
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet">'+
    '<style>*{margin:0;padding:0;box-sizing:border-box;font-family:Inter,sans-serif}body{background:#050810;color:#e2e8f0;height:100vh;overflow:hidden;display:flex;flex-direction:column}'+
    '.topbar{padding:14px 30px;background:rgba(0,0,0,.5);backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,.07);display:flex;justify-content:space-between;align-items:center;flex-shrink:0}'+
    '.brand{font-size:18px;font-weight:900;background:linear-gradient(135deg,#8b5cf6,#3b82f6);-webkit-background-clip:text;-webkit-text-fill-color:transparent}'+
    '.tagline-txt{font-size:11px;color:#64748b}.stage{flex:1;position:relative;overflow:hidden}'+
    '.nav-btn{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);color:#fff;padding:10px 24px;border-radius:8px;font-weight:700;font-size:13px;cursor:pointer;transition:.2s}'+
    '.nav-btn:hover{background:rgba(255,255,255,.15)}.dots{display:flex;gap:6px}'+
    '.dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.2);cursor:pointer;transition:.2s}'+
    '.dot.on{background:#8b5cf6;transform:scale(1.3)}'+
    '.bottombar{padding:12px 30px;background:rgba(0,0,0,.5);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.07);display:flex;justify-content:space-between;align-items:center;flex-shrink:0}'+
    '</style></head><body>'+
    '<div class="topbar"><div><div class="brand">'+( state.name||'Startup')+'</div><div class="tagline-txt">'+( state.tagline||'')+'</div></div>'+
    '<div class="dots" id="dots">'+slides.map(function(_,i){return'<div class="dot'+(i===0?' on':'')+'\" onclick="goTo('+i+')" title="Slide '+(i+1)+'"></div>';}).join('')+'</div></div>'+
    '<div class="stage" id="stage">'+slidesHTML+'</div>'+
    '<div class="bottombar">'+
    '<button class="nav-btn" onclick="prev()">← Prev</button>'+
    '<div style="font-size:11px;color:#475569;" id="counter">1 / '+slides.length+'</div>'+
    '<button class="nav-btn" onclick="next()">Next →</button>'+
    '</div>'+
    '<script>var cur=0,tot='+slides.length+';'+
    'function goTo(n){document.getElementById("slide-"+cur).style.display="none";'+
    'document.querySelectorAll(".dot")[cur].classList.remove("on");cur=n;'+
    'document.getElementById("slide-"+cur).style.display="flex";'+
    'document.querySelectorAll(".dot")[cur].classList.add("on");'+
    'document.getElementById("counter").textContent=(cur+1)+" / "+tot;}'+
    'function next(){goTo((cur+1)%tot);}function prev(){goTo((cur-1+tot)%tot);}'+
    'document.addEventListener("keydown",function(e){if(e.key==="ArrowRight"||e.key===" ")next();if(e.key==="ArrowLeft")prev();});'+
    '<\/script></body></html>';
}

function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(139,92,246,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(139,92,246,0.12),rgba(99,102,241,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#a78bfa;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:4px;';

  body.appendChild(inp('name',t('name'),t('nameP')));
  body.appendChild(inp('tagline',t('tagline'),t('taglineP')));
  body.appendChild(inp('problem',t('problem'),t('problemP')));
  body.appendChild(inp('solution',t('solution'),t('solutionP')));
  body.appendChild(inp('market',t('market'),t('marketP')));
  body.appendChild(inp('traction',t('traction'),t('tractionP')));
  body.appendChild(inp('team',t('team'),t('teamP')));
  body.appendChild(inp('ask',t('ask'),t('askP')));

  var genBtn=document.createElement('button');genBtn.innerHTML=t('btn');
  genBtn.style='width:100%;background:linear-gradient(135deg,#4c1d95,#8b5cf6);color:#fff;border:none;padding:11px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:6px;box-shadow:0 4px 15px rgba(139,92,246,0.4);';
  body.appendChild(genBtn);

  var actRow=document.createElement('div');actRow.style='display:flex;gap:6px;';actRow.style.display='none';
  var injBtn=document.createElement('button');injBtn.innerHTML=t('inject');
  injBtn.style='flex:1;background:linear-gradient(135deg,#064e3b,#10b981);color:#fff;border:none;padding:9px;border-radius:7px;font-size:10px;font-weight:700;cursor:pointer;';
  var cpBtn=document.createElement('button');cpBtn.innerHTML=t('copy');
  cpBtn.style='flex:1;background:rgba(255,255,255,0.06);color:#94a3b8;border:1px solid rgba(255,255,255,0.1);padding:9px;border-radius:7px;font-size:10px;font-weight:700;cursor:pointer;';
  actRow.appendChild(injBtn);actRow.appendChild(cpBtn);body.appendChild(actRow);

  var preview=document.createElement('div');
  preview.style='background:rgba(139,92,246,0.06);border:1px solid rgba(139,92,246,0.2);border-radius:8px;padding:10px;font-size:10px;color:#7c3aed;display:none;';
  body.appendChild(preview);

  wrap.appendChild(body);parent.appendChild(wrap);

  genBtn.onclick=function(){
    var html=buildHTML();state.html=html;
    preview.style.display='block';
    var tx=TX[gl()]||TX.en;
    preview.innerHTML='<div style="font-size:11px;font-weight:700;color:#a78bfa;margin-bottom:6px;">✅ '+(gl()==='fr'?'Pitch Deck Généré — 10 slides':'Pitch Deck Generated — 10 slides')+'</div>'+
      tx.slides.map(function(s,i){return'<div style="padding:3px 0;color:#64748b;font-size:9px;">Slide '+(i+1)+': '+s+'</div>';}).join('');
    actRow.style.display='flex';
    if(window.showToast)window.showToast(gl()==='fr'?'🎯 Pitch Deck généré!':'🎯 Pitch Deck generated!');
  };

  injBtn.onclick=function(){
    if(!state.html)return;
    var inj=window.injectCode||(window.parent&&window.parent.injectCode);
    if(typeof inj==='function'){inj(state.html);if(window.showToast)window.showToast('✅ Injected!');}
  };
  cpBtn.onclick=function(){
    if(state.html&&navigator.clipboard)navigator.clipboard.writeText(state.html).then(function(){if(window.showToast)window.showToast('📋 Copied!');});
  };
}

document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;
  window.renderTab=function(tab){
    if(tab==='pitchdeck'){window.activeTab='pitchdeck';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-pitchdeck');if(btn)btn.classList.add('active');renderTab();return;}
    if(typeof oRT==='function')oRT(tab);
  };
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-pitchdeck');if(el)el.textContent=t('tab');if(window.activeTab==='pitchdeck')renderTab();};
});
})();
