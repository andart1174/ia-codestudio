/**
 * 🖼️ Hero Section Builder — EN/FR
 */
(function(){
'use strict';
var TX={
  en:{tab:'Hero Builder',title:'🖼️ Hero Section Builder',sub:'High-conversion hero sections with animations',
      brand:'Brand Name',brandP:'e.g. UltraApp',headline:'Headline',headlineP:'e.g. Build faster, together',
      sub2:'Subtext',sub2P:'e.g. The modern way to manage projects.',cta1:'Primary CTA',cta1P:'e.g. Get Started Free',
      cta2:'Secondary CTA',cta2P:'e.g. Watch Demo',color:'Accent Color',style:'Style',
      btn:'🖼️ Generate Hero',inject:'💉 Inject',copy:'📋 Copy',
      styles:['Gradient Mesh','Dark Minimal','Floating Tech','Split Screen']},
  fr:{tab:'Hero Builder',title:'🖼️ Créateur Hero Section',sub:'Hero sections haute conversion avec animations',
      brand:'Nom de Marque',brandP:'ex. UltraApp',headline:'Titre',headlineP:'ex. Construisez plus vite, ensemble',
      sub2:'Sous-titre',sub2P:'ex. La méthode moderne pour gérer vos projets.',cta1:'CTA Principal',cta1P:'ex. Commencer Gratuitement',
      cta2:'CTA Secondaire',cta2P:'ex. Voir la Démo',color:'Couleur Accent',style:'Style',
      btn:'🖼️ Générer',inject:'💉 Injecter',copy:'📋 Copier',
      styles:['Gradient Mesh','Dark Minimal','Floating Tech','Split Screen']}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var st={brand:'UltraApp',headline:'Build faster, together',sub:'The modern way to manage your projects and scale your business without the chaos.',cta1:'Get Started Free',cta2:'Watch Demo',color:'#3b82f6',style:'gradient'};

function buildHeroHTML(d){
  var bg, extraCSS='', extraHTML='';
  
  if(d.style==='gradient'){
    bg='background:linear-gradient(135deg,#0f172a,#1e1b4b);';
    extraHTML='<div class="mesh" style="position:absolute;inset:0;background:radial-gradient(circle at 20% 30%,'+d.color+'44 0,transparent 50%),radial-gradient(circle at 80% 70%,rgba(139,92,246,0.3) 0,transparent 50%);filter:blur(60px);z-index:0;"></div>';
    extraCSS='.mesh{animation:pulse 8s ease-in-out infinite alternate;} @keyframes pulse{0%{opacity:.5;transform:scale(1)}100%{opacity:1;transform:scale(1.1)}}';
  }else if(d.style==='minimal'){
    bg='background:#050810;';
    extraHTML='<div style="position:absolute;inset:0;background:url(\'data:image/svg+xml;utf8,<svg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"2\" cy=\"2\" r=\"1\" fill=\"rgba(255,255,255,0.05)\"/></svg>\');z-index:0;"></div>';
  }else if(d.style==='floating'){
    bg='background:#0f172a;';
    extraHTML='<div class="floats" style="position:absolute;inset:0;z-index:0;overflow:hidden;"><div class="f1" style="background:linear-gradient(135deg,'+d.color+',#8b5cf6);"></div><div class="f2" style="background:linear-gradient(135deg,#10b981,#3b82f6);"></div></div>';
    extraCSS='.f1,.f2{position:absolute;width:200px;height:200px;border-radius:30%;filter:blur(40px);opacity:.4;} .f1{top:10%;left:15%;animation:float1 10s infinite;} .f2{bottom:10%;right:15%;animation:float2 12s infinite reverse;} @keyframes float1{0%,100%{transform:translate(0,0) rotate(0deg);}50%{transform:translate(50px,50px) rotate(180deg);}} @keyframes float2{0%,100%{transform:translate(0,0) rotate(0deg);}50%{transform:translate(-50px,-50px) rotate(180deg);}}';
  }else{ // split
    bg='background:linear-gradient(90deg,#0f172a 50%,'+d.color+'22 50%);';
  }

  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Hero — '+d.brand+'</title>'+
  '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap" rel="stylesheet">'+
  '<style>*{margin:0;padding:0;box-sizing:border-box;font-family:Inter,sans-serif}'+
  'body{'+bg+'color:#e2e8f0;min-height:100vh;display:flex;flex-direction:column;position:relative;}'+
  'nav{padding:24px 48px;display:flex;justify-content:space-between;align-items:center;position:relative;z-index:10;}'+
  '.logo{font-size:20px;font-weight:900;letter-spacing:-0.5px;color:#fff;display:flex;align-items:center;gap:8px;}'+
  '.logo-icon{width:28px;height:28px;background:'+d.color+';border-radius:8px;}'+
  '.nav-links{display:flex;gap:32px;} .nav-links a{color:#94a3b8;text-decoration:none;font-size:14px;font-weight:600;transition:.2s;} .nav-links a:hover{color:#fff;}'+
  '.hero{flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:0 24px;position:relative;z-index:10;}'+
  (d.style==='split'?'.hero{flex-direction:row;text-align:left;justify-content:space-between;padding:0 10%;} .hero-content{max-width:500px;} .hero-img{width:45%;height:400px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.1);border-radius:24px;backdrop-filter:blur(10px);box-shadow:0 24px 80px rgba(0,0,0,.4);animation:float 6s ease-in-out infinite;} @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}':'')+
  '.badge{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);padding:6px 16px;border-radius:50px;font-size:13px;color:'+d.color+';font-weight:600;margin-bottom:24px;display:inline-block;animation:fadeDown .8s ease forwards;}'+
  'h1{font-size:clamp(40px,6vw,72px);font-weight:900;color:#fff;line-height:1.1;letter-spacing:-2px;margin-bottom:24px;max-width:900px;animation:fadeUp .8s ease forwards;animation-delay:.1s;opacity:0;}'+
  'p{font-size:clamp(16px,2vw,20px);color:#94a3b8;line-height:1.6;margin-bottom:40px;max-width:600px;'+(d.style==='split'?'':'margin-left:auto;margin-right:auto;')+'animation:fadeUp .8s ease forwards;animation-delay:.2s;opacity:0;}'+
  '.btns{display:flex;gap:16px;'+(d.style==='split'?'':'justify-content:center;')+'animation:fadeUp .8s ease forwards;animation-delay:.3s;opacity:0;}'+
  '.btn-1{background:'+d.color+';color:#fff;border:none;padding:16px 32px;border-radius:50px;font-size:15px;font-weight:700;cursor:pointer;transition:.2s;box-shadow:0 8px 25px '+d.color+'55;}'+
  '.btn-1:hover{transform:translateY(-2px);box-shadow:0 12px 30px '+d.color+'88;}'+
  '.btn-2{background:rgba(255,255,255,.05);color:#fff;border:1px solid rgba(255,255,255,.1);padding:16px 32px;border-radius:50px;font-size:15px;font-weight:700;cursor:pointer;transition:.2s;}'+
  '.btn-2:hover{background:rgba(255,255,255,.1);}'+
  '@keyframes fadeDown{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:none}}'+
  '@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}}'+
  extraCSS+
  '@media (max-width:768px){.nav-links{display:none;}'+(d.style==='split'?'.hero{flex-direction:column;text-align:center;} .hero-content{margin-bottom:40px;} .btns{justify-content:center;} .hero-img{width:100%;}':'')+'}'+
  '</style></head><body>'+
  extraHTML+
  '<nav><div class="logo"><div class="logo-icon"></div>'+d.brand+'</div><div class="nav-links"><a href="#">Features</a><a href="#">Pricing</a><a href="#">About</a></div><button class="btn-2" style="padding:10px 24px;font-size:13px;">Login</button></nav>'+
  '<div class="hero"><div class="hero-content">'+
  '<div class="badge">🚀 Introducing '+d.brand+' 2.0</div>'+
  '<h1>'+d.headline+'</h1>'+
  '<p>'+d.sub+'</p>'+
  '<div class="btns"><button class="btn-1">'+d.cta1+'</button><button class="btn-2">'+d.cta2+'</button></div>'+
  '</div>'+(d.style==='split'?'<div class="hero-img"></div>':'')+'</div>'+
  '</body></html>';
}

function render(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(59,130,246,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(59,130,246,0.1),rgba(99,102,241,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#60a5fa;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  function fi(k,lbl,ph,area){var d=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;var i=area?document.createElement('textarea'):document.createElement('input');i.id='hb-'+k;i.placeholder=ph;if(area){i.rows=3;i.style='resize:none;';}i.value=st[k]||'';i.style=(i.style.cssText||'')+'width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(59,130,246,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){st[k]=this.value;};d.appendChild(l);d.appendChild(i);return d;}
  
  body.appendChild(fi('brand',t('brand'),t('brandP')));
  body.appendChild(fi('headline',t('headline'),t('headlineP')));
  body.appendChild(fi('sub',t('sub2'),t('sub2P'),true));
  
  var cr=document.createElement('div');cr.style='display:grid;grid-template-columns:1fr 1fr;gap:8px;';
  cr.appendChild(fi('cta1',t('cta1'),t('cta1P')));cr.appendChild(fi('cta2',t('cta2'),t('cta2P')));body.appendChild(cr);
  
  var cx=document.createElement('div');cx.style='display:flex;align-items:center;gap:8px;';
  var cl=document.createElement('div');cl.style='font-size:9px;color:#94a3b8;font-weight:700;flex:1;';cl.textContent=t('color');
  var ci=document.createElement('input');ci.type='color';ci.id='hb-color';ci.value=st.color;ci.style='width:44px;height:30px;background:#0d1117;border:1px solid rgba(59,130,246,0.25);border-radius:6px;cursor:pointer;padding:2px;';ci.oninput=function(){st.color=this.value;};
  cx.appendChild(cl);cx.appendChild(ci);body.appendChild(cx);
  
  var sl=document.createElement('div');sl.style='font-size:9px;color:#94a3b8;font-weight:700;';sl.textContent=t('style');body.appendChild(sl);
  var sr=document.createElement('div');sr.style='display:flex;gap:4px;flex-wrap:wrap;';
  var styls=[['gradient','🌈 Gradient Mesh'],['minimal','🌑 Dark Minimal'],['floating','✨ Floating Tech'],['split','🌗 Split Screen']];
  var sLabs=t('styles');
  styls.forEach(function(s,idx){var b=document.createElement('button');b.textContent=Array.isArray(sLabs)?sLabs[idx]:s[1];b.dataset.s=s[0];var on=st.style===s[0];b.style='padding:5px 10px;border-radius:20px;font-size:9px;font-weight:700;cursor:pointer;border:1px solid rgba(59,130,246,'+(on?'0.8':'0.25')+');background:rgba(59,130,246,'+(on?'0.2':'0.05')+');color:'+(on?'#60a5fa':'#64748b')+';';b.onclick=function(){st.style=s[0];document.querySelectorAll('[data-s]').forEach(function(x){x.style.borderColor='rgba(59,130,246,0.25)';x.style.background='rgba(59,130,246,0.05)';x.style.color='#64748b';});this.style.borderColor='rgba(59,130,246,0.8)';this.style.background='rgba(59,130,246,0.2)';this.style.color='#60a5fa';};sr.appendChild(b);});
  body.appendChild(sr);

  var btn=document.createElement('button');btn.innerHTML=t('btn');btn.style='width:100%;background:linear-gradient(135deg,#1e3a8a,#3b82f6);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:4px;box-shadow:0 4px 15px rgba(59,130,246,0.3);';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=t('inject');ib.style='flex:1;background:linear-gradient(135deg,#064e3b,#10b981);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=t('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  
  var html='';
  btn.onclick=function(){['brand','headline','sub','cta1','cta2','color'].forEach(function(k){var el=document.getElementById('hb-'+k);if(el)st[k]=el.value||st[k];});html=buildHeroHTML(st);ar.style.display='flex';res.innerHTML='<div style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#60a5fa;">✅ Hero section ready — Style: '+st.style+'</div>';if(window.showToast)window.showToast('🖼️ Hero generated!');};
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 Copied!');});};
}
document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='herobuilder'){window.activeTab='herobuilder';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b=document.getElementById('tab-herobuilder');if(b)b.classList.add('active');render();return;}if(typeof oRT==='function')oRT(tab);};
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-herobuilder');if(el)el.textContent=t('tab');if(window.activeTab==='herobuilder')render();};
});
})();
