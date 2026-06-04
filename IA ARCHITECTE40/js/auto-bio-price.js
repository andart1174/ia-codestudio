/**
 * 📝 Auto Bio Generator + 🔮 Price Predictor Widget — EN/FR
 */
(function(){
'use strict';

/* AUTO BIO GENERATOR */
var BX={
  en:{tab:'Auto Bio',title:'📝 Auto Bio Generator',sub:'Professional bios for LinkedIn/About pages',
      name:'Your Name',nameP:'e.g. John Doe',role:'Role/Title',roleP:'e.g. Full Stack Developer',
      exp:'Years of Exp',expP:'e.g. 5',skills:'Key Skills (comma separated)',skillsP:'e.g. React, Node.js, UI/UX',
      passion:'Passionate about',passionP:'e.g. building scalable web apps',
      btn:'📝 Generate Bios',inject:'💉 Inject',copy:'📋 Copy',tone:['Formal','Casual','Creative']},
  fr:{tab:'Auto Bio',title:'📝 Créateur Auto Bio',sub:'Bios professionnelles pour LinkedIn/À propos',
      name:'Votre Nom',nameP:'ex. Jean Dupont',role:'Rôle/Titre',roleP:'ex. Développeur Full Stack',
      exp:'Années d\'Exp.',expP:'ex. 5',skills:'Compétences clés (séparées par des virgules)',skillsP:'ex. React, Node.js, UI/UX',
      passion:'Passionné par',passionP:'ex. la création d\'applications web scalables',
      btn:'📝 Générer Bios',inject:'💉 Injecter',copy:'📋 Copier',tone:['Formel','Décontracté','Créatif']}
};
function gb(){return window.lang||'en';}
function tb(k){return(BX[gb()]||BX.en)[k]||k;}
var sb={name:'Alex Dev',role:'Frontend Developer',exp:5,skills:'JavaScript, React, CSS',passion:'crafting beautiful user interfaces'};

function buildBioHTML(d){
  var fr=gb()==='fr';
  var sk=d.skills.split(',').map(function(s){return s.trim();}).filter(Boolean);
  var skStr=sk.length>1?sk.slice(0,-1).join(', ')+' '+(fr?'et':'and')+' '+sk[sk.length-1]:sk.join('');
  
  var t1=fr?
    "Fort(e) de "+d.exp+" années d'expérience en tant que "+d.role+", je suis spécialisé(e) dans "+skStr+". Animé(e) par la passion de "+d.passion+", je m'efforce de fournir des résultats exceptionnels alliant expertise technique et vision stratégique.":
    "With "+d.exp+" years of experience as a "+d.role+", I specialize in "+skStr+". Driven by a passion for "+d.passion+", I consistently strive to deliver exceptional results that combine technical expertise with strategic vision.";
  
  var t2=fr?
    "Salut! Je suis "+d.name+", "+d.role+" avec "+d.exp+" ans de métier. Quand je ne jongle pas avec "+skStr+", on me trouve souvent en train de "+d.passion+". Toujours prêt(e) pour un nouveau défi!":
    "Hi there! I'm "+d.name+", a "+d.role+" with "+d.exp+" years in the game. When I'm not working with "+skStr+", you can usually find me "+d.passion+". Always up for a new challenge!";
    
  var t3=fr?
    "Inventeur de solutions numériques et "+d.role+" dans l'âme. J'ai passé les "+d.exp+" dernières années à maîtriser l'art de "+skStr+". Mon véritable moteur ? "+d.passion+". Construisons quelque chose d'incroyable.":
    "Digital problem solver and "+d.role+" at heart. I've spent the last "+d.exp+" years mastering the art of "+skStr+". My true fuel? "+d.passion+". Let's build something amazing.";

  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Bio for '+d.name+'</title>'+
  '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">'+
  '<style>*{margin:0;padding:0;box-sizing:border-box;font-family:Inter,sans-serif;}'+
  'body{background:#050810;color:#e2e8f0;padding:40px 20px;display:flex;flex-direction:column;align-items:center;min-height:100vh;}'+
  '.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;width:100%;max-width:1000px;}'+
  '.bio-card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:30px;transition:0.3s;position:relative;}'+
  '.bio-card:hover{background:rgba(255,255,255,0.05);transform:translateY(-5px);}'+
  '.tone-badge{position:absolute;top:-12px;left:20px;background:linear-gradient(135deg,#ec4899,#8b5cf6);color:#fff;font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px;text-transform:uppercase;}'+
  '.bio-text{font-size:15px;line-height:1.6;color:#cbd5e1;margin-bottom:20px;}'+
  '.copy-btn{background:rgba(255,255,255,0.1);color:#fff;border:none;padding:8px 16px;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;transition:0.2s;}'+
  '.copy-btn:hover{background:rgba(255,255,255,0.2);}</style></head><body>'+
  '<div class="grid">'+
  '<div class="bio-card"><div class="tone-badge">'+tb('tone')[0]+'</div><p class="bio-text" id="b1">'+t1+'</p><button class="copy-btn" onclick="navigator.clipboard.writeText(document.getElementById(\'b1\').innerText);this.innerText=\'Copied!\';setTimeout(()=>this.innerText=\'Copy\',2000)">Copy</button></div>'+
  '<div class="bio-card"><div class="tone-badge">'+tb('tone')[1]+'</div><p class="bio-text" id="b2">'+t2+'</p><button class="copy-btn" onclick="navigator.clipboard.writeText(document.getElementById(\'b2\').innerText);this.innerText=\'Copied!\';setTimeout(()=>this.innerText=\'Copy\',2000)">Copy</button></div>'+
  '<div class="bio-card"><div class="tone-badge">'+tb('tone')[2]+'</div><p class="bio-text" id="b3">'+t3+'</p><button class="copy-btn" onclick="navigator.clipboard.writeText(document.getElementById(\'b3\').innerText);this.innerText=\'Copied!\';setTimeout(()=>this.innerText=\'Copy\',2000)">Copy</button></div>'+
  '</div></body></html>';
}

function renderBio(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(236,72,153,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(236,72,153,0.1),rgba(139,92,246,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#f472b6;">'+tb('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tb('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  function fi(k,lbl,ph,area){var d=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;var i=area?document.createElement('textarea'):document.createElement('input');i.id='ab-'+k;i.placeholder=ph;if(area){i.rows=2;i.style='resize:none;';}i.value=sb[k]||'';i.style=(i.style.cssText||'')+'width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(236,72,153,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){sb[k]=this.value;};d.appendChild(l);d.appendChild(i);return d;}
  
  var cr=document.createElement('div');cr.style='display:grid;grid-template-columns:2fr 1fr;gap:8px;';
  cr.appendChild(fi('name',tb('name'),tb('nameP')));
  var de=document.createElement('div');var le=document.createElement('div');le.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';le.textContent=tb('exp');var ie=document.createElement('input');ie.type='number';ie.id='ab-exp';ie.value=sb.exp;ie.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(236,72,153,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';ie.oninput=function(){sb.exp=parseInt(this.value)||0;};de.appendChild(le);de.appendChild(ie);cr.appendChild(de);body.appendChild(cr);
  
  body.appendChild(fi('role',tb('role'),tb('roleP')));
  body.appendChild(fi('skills',tb('skills'),tb('skillsP')));
  body.appendChild(fi('passion',tb('passion'),tb('passionP'),true));

  var btn=document.createElement('button');btn.innerHTML=tb('btn');btn.style='width:100%;background:linear-gradient(135deg,#831843,#ec4899);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:4px;box-shadow:0 4px 15px rgba(236,72,153,0.3);';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=tb('inject');ib.style='flex:1;background:linear-gradient(135deg,#064e3b,#10b981);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=tb('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  
  var html='';
  btn.onclick=function(){['name','role','skills','passion'].forEach(function(k){var el=document.getElementById('ab-'+k);if(el)sb[k]=el.value||sb[k];});sb.exp=parseInt(document.getElementById('ab-exp').value)||0;html=buildBioHTML(sb);ar.style.display='flex';res.innerHTML='<div style="background:rgba(236,72,153,0.08);border:1px solid rgba(236,72,153,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#f472b6;">✅ 3 Bios generated (Formal, Casual, Creative)!</div>';if(window.showToast)window.showToast('📝 Bios generated!');};
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 Copied!');});};
}

/* PRICE PREDICTOR WIDGET */
var PX={
  en:{tab:'Predictor',title:'🔮 Price Predictor',sub:'Interactive estimate calculator widget',
      product:'Product/Service',prodP:'e.g. App Development',base:'Base Price ($)',bval:5000,
      btn:'🔮 Generate Widget',inject:'💉 Inject',copy:'📋 Copy'},
  fr:{tab:'Prédicteur',title:'🔮 Prédicteur de Prix',sub:'Widget calculateur d\'estimation interactif',
      product:'Produit/Service',prodP:'ex. Développement App',base:'Prix de base (€)',bval:5000,
      btn:'🔮 Générer Widget',inject:'💉 Injecter',copy:'📋 Copier'}
};
function gp(){return window.lang||'en';}
function tp(k){return(PX[gp()]||PX.en)[k]||k;}
var sp={product:'App Development',base:5000,color:'#10b981'};

function buildPredictorHTML(d){
  var fr=gp()==='fr';
  var cur=fr?'€':'$';
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Price Predictor</title>'+
  '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap" rel="stylesheet">'+
  '<style>*{margin:0;padding:0;box-sizing:border-box;font-family:Inter,sans-serif;}'+
  'body{background:#0f172a;color:#e2e8f0;display:flex;justify-content:center;align-items:center;min-height:100vh;}'+
  '.pw{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:30px;width:100%;max-width:450px;box-shadow:0 20px 50px rgba(0,0,0,0.3);}'+
  'h2{font-size:24px;font-weight:900;color:#fff;margin-bottom:6px;text-align:center;}'+
  '.sub{font-size:14px;color:#94a3b8;margin-bottom:30px;text-align:center;}'+
  '.item{margin-bottom:24px;}'+
  '.lbl{display:flex;justify-content:space-between;font-size:14px;font-weight:600;color:#cbd5e1;margin-bottom:12px;}'+
  '.val{color:'+d.color+';font-weight:800;}'+
  'input[type=range]{width:100%;accent-color:'+d.color+';cursor:pointer;}'+
  '.res-box{background:rgba(16,185,129,0.1);border:1px solid '+d.color+'44;border-radius:12px;padding:24px;text-align:center;margin-top:30px;}'+
  '.res-lbl{font-size:13px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;}'+
  '.res-price{font-size:42px;font-weight:900;color:'+d.color+';line-height:1;}'+
  '.cta{background:'+d.color+';color:#fff;border:none;width:100%;padding:14px;border-radius:8px;font-size:16px;font-weight:700;margin-top:20px;cursor:pointer;transition:0.2s;box-shadow:0 4px 15px '+d.color+'44;}'+
  '.cta:hover{transform:translateY(-2px);box-shadow:0 6px 20px '+d.color+'66;}'+
  '</style></head><body>'+
  '<div class="pw"><h2>'+(fr?'Estimateur de Prix':'Price Estimator')+'</h2><div class="sub">'+d.product+'</div>'+
  '<div class="item"><div class="lbl"><span>'+(fr?'Complexité':'Complexity')+'</span><span class="val" id="v1">Medium</span></div><input type="range" id="s1" min="1" max="3" value="2" oninput="calc()"></div>'+
  '<div class="item"><div class="lbl"><span>'+(fr?'Délai':'Timeline')+'</span><span class="val" id="v2">Normal</span></div><input type="range" id="s2" min="1" max="3" value="2" oninput="calc()"></div>'+
  '<div class="res-box"><div class="res-lbl">'+(fr?'Estimation Totale':'Estimated Total')+'</div><div class="res-price" id="total">'+cur+d.base+'</div></div>'+
  '<button class="cta">'+(fr?'Demander un Devis':'Request Quote')+'</button></div>'+
  '<script>'+
  'var base='+d.base+';var fr='+fr+';var cur="'+cur+'";'+
  'var cLbls=fr?["Simple","Moyen","Complexe"]:["Simple","Medium","Complex"];'+
  'var tLbls=fr?["Lent (Éco)","Normal","Rapide (Rush)"]:["Slow (Eco)","Normal","Fast (Rush)"];'+
  'function calc(){var c=parseInt(document.getElementById("s1").value);var t=parseInt(document.getElementById("s2").value);'+
  'document.getElementById("v1").textContent=cLbls[c-1];document.getElementById("v2").textContent=tLbls[t-1];'+
  'var cm=c===1?0.7:c===2?1:1.5;var tm=t===1?0.8:t===2?1:1.3;'+
  'var total=Math.round(base*cm*tm);'+
  'document.getElementById("total").textContent=cur+total.toLocaleString();}'+
  'calc();'+
  '<\/script></body></html>';
}

function renderPredictor(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(16,185,129,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(52,211,153,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#34d399;">'+tp('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tp('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  function fi(k,lbl,ph){var d=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;var i=document.createElement('input');i.id='pr-'+k;i.placeholder=ph;i.value=sp[k]||'';i.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(16,185,129,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){sp[k]=this.value;};d.appendChild(l);d.appendChild(i);return d;}
  
  body.appendChild(fi('product',tp('product'),tp('prodP')));
  var db=document.createElement('div');var lb=document.createElement('div');lb.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';lb.textContent=tp('base');var ib=document.createElement('input');ib.type='number';ib.id='pr-base';ib.value=sp.base;ib.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(16,185,129,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';ib.oninput=function(){sp.base=parseInt(this.value)||0;};db.appendChild(lb);db.appendChild(ib);body.appendChild(db);

  var cx=document.createElement('div');cx.style='display:flex;align-items:center;gap:8px;';
  var cl=document.createElement('div');cl.style='font-size:9px;color:#94a3b8;font-weight:700;flex:1;';cl.textContent='Color';
  var ci=document.createElement('input');ci.type='color';ci.id='pr-color';ci.value=sp.color;ci.style='width:44px;height:30px;background:#0d1117;border:1px solid rgba(16,185,129,0.25);border-radius:6px;cursor:pointer;padding:2px;';ci.oninput=function(){sp.color=this.value;};
  cx.appendChild(cl);cx.appendChild(ci);body.appendChild(cx);

  var btn=document.createElement('button');btn.innerHTML=tp('btn');btn.style='width:100%;background:linear-gradient(135deg,#064e3b,#10b981);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:4px;box-shadow:0 4px 15px rgba(16,185,129,0.3);';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib2=document.createElement('button');ib2.innerHTML=tp('inject');ib2.style='flex:1;background:linear-gradient(135deg,#064e3b,#10b981);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb2=document.createElement('button');cb2.innerHTML=tp('copy');cb2.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib2);ar.appendChild(cb2);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  
  var html='';
  btn.onclick=function(){sp.product=(document.getElementById('pr-product')||{}).value||sp.product;sp.base=parseInt((document.getElementById('pr-base')||{}).value)||sp.base;html=buildPredictorHTML(sp);ar.style.display='flex';res.innerHTML='<div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#34d399;">✅ Widget ready (JS dynamic calc included)!</div>';if(window.showToast)window.showToast('🔮 Predictor generated!');};
  ib2.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb2.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 Copied!');});};
}

document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;window.renderTab=function(tab){
    if(tab==='autobio'){window.activeTab='autobio';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b=document.getElementById('tab-autobio');if(b)b.classList.add('active');renderBio();return;}
    if(tab==='predictor'){window.activeTab='predictor';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b2=document.getElementById('tab-predictor');if(b2)b2.classList.add('active');renderPredictor();return;}
    if(typeof oRT==='function')oRT(tab);
  };
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var e1=document.getElementById('lbl-tab-autobio');if(e1)e1.textContent=tb('tab');var e2=document.getElementById('lbl-tab-predictor');if(e2)e2.textContent=tp('tab');if(window.activeTab==='autobio')renderBio();if(window.activeTab==='predictor')renderPredictor();};
});
})();
