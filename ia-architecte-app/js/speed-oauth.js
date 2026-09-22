/**
 * ⚡ Speed Budget Calculator + 🔐 OAuth Flow Builder — EN/FR
 */
(function(){
'use strict';

/* SPEED BUDGET CALCULATOR */
var SX={
  en:{tab:'Speed Budget',title:'⚡ Speed Budget',sub:'Core Web Vitals performance budget calculator',
      target:'Target Load Time (s)',html:'HTML (KB)',css:'CSS (KB)',js:'JS (KB)',img:'Images (KB)',
      btn:'⚡ Calculate Budget',color:'Accent Color',inject:'💉 Inject',copy:'📋 Copy'},
  fr:{tab:'Budget Perf',title:'⚡ Budget Performance',sub:'Calculateur de budget Core Web Vitals',
      target:'Temps cible (s)',html:'HTML (Ko)',css:'CSS (Ko)',js:'JS (Ko)',img:'Images (Ko)',
      btn:'⚡ Calculer',color:'Couleur',inject:'💉 Injecter',copy:'📋 Copier'}
};
function gs(){return window.lang||'en';}
function ts(k){return(SX[gs()]||SX.en)[k]||k;}
var ss={target:2.5,html:50,css:100,js:350,img:800,color:'#facc15'};

function buildSpeedHTML(d){
  var fr=gs()==='fr';
  var total=d.html+d.css+d.js+d.img;
  var speed=(total/1000)/(1.5); // rough estimate on 3G/4G
  var status=speed<=d.target?'Pass':'Fail';
  var statusColor=status==='Pass'?'#22c55e':'#ef4444';
  
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Speed Budget</title>'+
  '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">'+
  '<style>*{margin:0;padding:0;box-sizing:border-box;font-family:Inter,sans-serif;}'+
  'body{background:#050810;color:#e2e8f0;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:20px;}'+
  '.bw{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.1);border-radius:24px;padding:40px;width:100%;max-width:500px;box-shadow:0 20px 60px rgba(0,0,0,0.3);}'+
  'h2{font-size:24px;font-weight:900;color:#fff;text-align:center;margin-bottom:8px;}'+
  '.sub{font-size:14px;color:#94a3b8;text-align:center;margin-bottom:40px;}'+
  '.chart{display:flex;height:24px;border-radius:12px;overflow:hidden;margin-bottom:30px;}'+
  '.bar{height:100%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:bold;color:#000; transition:width 1s ease;}'+
  '.stats{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:40px;}'+
  '.stat{background:rgba(255,255,255,0.03);padding:16px;border-radius:12px;border:1px solid rgba(255,255,255,0.05);}'+
  '.lbl{font-size:12px;color:#94a3b8;margin-bottom:4px;text-transform:uppercase;letter-spacing:1px;font-weight:700;}'+
  '.val{font-size:24px;font-weight:900;color:#fff;}'+
  '.res{text-align:center;padding:24px;border-radius:16px;background:'+statusColor+'22;border:1px solid '+statusColor+'55;}'+
  '.res-t{font-size:14px;color:#cbd5e1;margin-bottom:8px;}'+
  '.res-s{font-size:32px;font-weight:900;color:'+statusColor+';}</style></head><body>'+
  '<div class="bw"><h2>Performance Budget</h2><div class="sub">Core Web Vitals Assessment</div>'+
  '<div class="chart">'+
  '<div class="bar" style="width:'+((d.html/total)*100)+'%;background:#3b82f6;" title="HTML"></div>'+
  '<div class="bar" style="width:'+((d.css/total)*100)+'%;background:#ec4899;" title="CSS"></div>'+
  '<div class="bar" style="width:'+((d.js/total)*100)+'%;background:'+d.color+';" title="JS"></div>'+
  '<div class="bar" style="width:'+((d.img/total)*100)+'%;background:#10b981;" title="Images"></div>'+
  '</div>'+
  '<div class="stats">'+
  '<div class="stat"><div class="lbl">Total Size</div><div class="val">'+(total/1000).toFixed(2)+' MB</div></div>'+
  '<div class="stat"><div class="lbl">Est. Load Time</div><div class="val">'+speed.toFixed(1)+'s</div></div>'+
  '</div>'+
  '<div class="res"><div class="res-t">'+(fr?'Évaluation par rapport à l\'objectif de ':'Target Goal Assessment: ')+d.target+'s</div><div class="res-s">'+(status==='Pass'?(fr?'RÉUSSI':'PASSED'):(fr?'ÉCHOUÉ':'FAILED'))+'</div></div>'+
  '</div></body></html>';
}

function renderSpeed(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(250,204,21,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(250,204,21,0.1),rgba(253,224,71,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#facc15;">'+ts('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+ts('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  function fi(k,lbl,ph){var d=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;var i=document.createElement('input');i.type='number';i.step='0.1';i.id='sb-'+k;i.placeholder=ph;i.value=ss[k]||0;i.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(250,204,21,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){ss[k]=parseFloat(this.value)||0;};d.appendChild(l);d.appendChild(i);return d;}
  
  body.appendChild(fi('target',ts('target'),'2.5'));
  
  var c1=document.createElement('div');c1.style='display:grid;grid-template-columns:1fr 1fr;gap:8px;';
  c1.appendChild(fi('html',ts('html'),'50'));c1.appendChild(fi('css',ts('css'),'100'));body.appendChild(c1);
  
  var c2=document.createElement('div');c2.style='display:grid;grid-template-columns:1fr 1fr;gap:8px;';
  c2.appendChild(fi('js',ts('js'),'350'));c2.appendChild(fi('img',ts('img'),'800'));body.appendChild(c2);

  var cx=document.createElement('div');cx.style='display:flex;align-items:center;gap:8px;';
  var cl=document.createElement('div');cl.style='font-size:9px;color:#94a3b8;font-weight:700;flex:1;';cl.textContent=ts('color');
  var ci=document.createElement('input');ci.type='color';ci.id='sb-color';ci.value=ss.color;ci.style='width:44px;height:30px;background:#0d1117;border:1px solid rgba(250,204,21,0.25);border-radius:6px;cursor:pointer;padding:2px;';ci.oninput=function(){ss.color=this.value;};
  cx.appendChild(cl);cx.appendChild(ci);body.appendChild(cx);

  var btn=document.createElement('button');btn.innerHTML=ts('btn');btn.style='width:100%;background:linear-gradient(135deg,#ca8a04,#facc15);color:#000;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:4px;box-shadow:0 4px 15px rgba(250,204,21,0.3);';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=ts('inject');ib.style='flex:1;background:linear-gradient(135deg,#064e3b,#10b981);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=ts('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  
  var html='';
  btn.onclick=function(){['target','html','css','js','img'].forEach(function(k){var el=document.getElementById('sb-'+k);if(el)ss[k]=parseFloat(el.value)||0;});html=buildSpeedHTML(ss);ar.style.display='flex';res.innerHTML='<div style="background:rgba(250,204,21,0.08);border:1px solid rgba(250,204,21,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#facc15;">✅ Budget calculated!</div>';if(window.showToast)window.showToast('⚡ Budget calculated!');};
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 Copied!');});};
}

/* OAUTH FLOW BUILDER */
var OX={
  en:{tab:'OAuth Flow',title:'🔐 OAuth Flow Builder',sub:'Generate social login screens',
      brand:'Brand Name',brandP:'e.g. UltraApp',color:'Brand Color',
      btn:'🔐 Generate Login',inject:'💉 Inject',copy:'📋 Copy'},
  fr:{tab:'OAuth Flow',title:'🔐 Créateur Flux OAuth',sub:'Générez des écrans de connexion sociale',
      brand:'Marque',brandP:'ex. UltraApp',color:'Couleur Marque',
      btn:'🔐 Générer Login',inject:'💉 Injecter',copy:'📋 Copier'}
};
function go(){return window.lang||'en';}
function to(k){return(OX[go()]||OX.en)[k]||k;}
var so={brand:'UltraApp',color:'#3b82f6'};

function buildOAuthHTML(d){
  var fr=go()==='fr';
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Login - '+d.brand+'</title>'+
  '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">'+
  '<style>*{margin:0;padding:0;box-sizing:border-box;font-family:Inter,sans-serif;}'+
  'body{background:#f8fafc;display:flex;align-items:center;justify-content:center;min-height:100vh;}'+
  '.card{background:#fff;padding:40px;border-radius:24px;box-shadow:0 10px 40px rgba(0,0,0,0.05);width:100%;max-width:420px;text-align:center;}'+
  '.logo{width:48px;height:48px;background:'+d.color+';border-radius:12px;margin:0 auto 24px auto;}'+
  'h1{font-size:24px;font-weight:800;color:#0f172a;margin-bottom:8px;}'+
  'p{font-size:14px;color:#64748b;margin-bottom:32px;}'+
  '.btn{display:flex;align-items:center;justify-content:center;gap:12px;width:100%;padding:12px;border-radius:12px;font-size:14px;font-weight:600;cursor:pointer;transition:0.2s;margin-bottom:12px;text-decoration:none;}'+
  '.b-google{background:#fff;color:#334155;border:1px solid #e2e8f0;box-shadow:0 1px 3px rgba(0,0,0,0.05);}'+
  '.b-google:hover{background:#f8fafc;border-color:#cbd5e1;}'+
  '.b-github{background:#0f172a;color:#fff;border:none;}'+
  '.b-github:hover{background:#1e293b;}'+
  '.div-wrap{display:flex;align-items:center;margin:24px 0;}'+
  '.div-line{flex:1;height:1px;background:#e2e8f0;}'+
  '.div-txt{padding:0 16px;font-size:12px;color:#94a3b8;font-weight:500;}'+
  '.inp{width:100%;padding:12px 16px;border:1px solid #e2e8f0;border-radius:12px;font-size:14px;margin-bottom:16px;outline:none;transition:0.2s;}'+
  '.inp:focus{border-color:'+d.color+';box-shadow:0 0 0 3px '+d.color+'33;}'+
  '.b-submit{background:'+d.color+';color:#fff;border:none;}'+
  '.b-submit:hover{opacity:0.9;}'+
  '.foot{margin-top:24px;font-size:13px;color:#64748b;}'+
  '.foot a{color:'+d.color+';text-decoration:none;font-weight:600;}'+
  '</style></head><body>'+
  '<div class="card">'+
  '<div class="logo"></div>'+
  '<h1>'+(fr?'Bienvenue sur':'Welcome back to')+' '+d.brand+'</h1>'+
  '<p>'+(fr?'Connectez-vous pour continuer.':'Please enter your details to sign in.')+'</p>'+
  '<button class="btn b-google">'+
  '<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>'+
  (fr?'Continuer avec Google':'Continue with Google')+'</button>'+
  '<button class="btn b-github">'+
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>'+
  (fr?'Continuer avec GitHub':'Continue with GitHub')+'</button>'+
  '<div class="div-wrap"><div class="div-line"></div><div class="div-txt">'+(fr?'OU':'OR')+'</div><div class="div-line"></div></div>'+
  '<input type="email" class="inp" placeholder="Email address">'+
  '<button class="btn b-submit">'+(fr?'Continuer avec Email':'Continue with Email')+'</button>'+
  '<div class="foot">'+(fr?'Pas encore de compte?':'Don\'t have an account?')+' <a href="#">'+(fr?'S\'inscrire':'Sign up')+'</a></div>'+
  '</div></body></html>';
}

function renderOAuth(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(59,130,246,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(59,130,246,0.1),rgba(147,197,253,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#60a5fa;">'+to('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+to('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  function fi(k,lbl,ph){var d=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;var i=document.createElement('input');i.id='oa-'+k;i.placeholder=ph;i.value=so[k]||'';i.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(59,130,246,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){so[k]=this.value;};d.appendChild(l);d.appendChild(i);return d;}
  
  body.appendChild(fi('brand',to('brand'),to('brandP')));

  var cx=document.createElement('div');cx.style='display:flex;align-items:center;gap:8px;';
  var cl=document.createElement('div');cl.style='font-size:9px;color:#94a3b8;font-weight:700;flex:1;';cl.textContent=to('color');
  var ci=document.createElement('input');ci.type='color';ci.id='oa-color';ci.value=so.color;ci.style='width:44px;height:30px;background:#0d1117;border:1px solid rgba(59,130,246,0.25);border-radius:6px;cursor:pointer;padding:2px;';ci.oninput=function(){so.color=this.value;};
  cx.appendChild(cl);cx.appendChild(ci);body.appendChild(cx);

  var btn=document.createElement('button');btn.innerHTML=to('btn');btn.style='width:100%;background:linear-gradient(135deg,#1e3a8a,#3b82f6);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:4px;box-shadow:0 4px 15px rgba(59,130,246,0.3);';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=to('inject');ib.style='flex:1;background:linear-gradient(135deg,#064e3b,#10b981);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=to('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  
  var html='';
  btn.onclick=function(){so.brand=(document.getElementById('oa-brand')||{}).value||so.brand;html=buildOAuthHTML(so);ar.style.display='flex';res.innerHTML='<div style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#60a5fa;">✅ Login Screen generated!</div>';if(window.showToast)window.showToast('🔐 Screen generated!');};
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 Copied!');});};
}

document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;window.renderTab=function(tab){
    if(tab==='speedbudget'){window.activeTab='speedbudget';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var bs=document.getElementById('tab-speedbudget');if(bs)bs.classList.add('active');renderSpeed();return;}
    if(tab==='oauthflow'){window.activeTab='oauthflow';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var bo=document.getElementById('tab-oauthflow');if(bo)bo.classList.add('active');renderOAuth();return;}
    if(typeof oRT==='function')oRT(tab);
  };
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var e1=document.getElementById('lbl-tab-speedbudget');if(e1)e1.textContent=ts('tab');var e2=document.getElementById('lbl-tab-oauthflow');if(e2)e2.textContent=to('tab');if(window.activeTab==='speedbudget')renderSpeed();if(window.activeTab==='oauthflow')renderOAuth();};
});
})();
