/**
 * 💎 SaaS Pricing Page Builder — EN/FR
 */
(function(){
'use strict';
var TX={
  en:{tab:'Pricing Page',title:'💎 SaaS Pricing Builder',sub:'High-conversion pricing pages with monthly/yearly toggle',
      brand:'Brand',brandP:'e.g. UltraApp',currency:'Currency',curP:'e.g. $',
      p1n:'Plan 1 Name',p1p:'e.g. Starter',p1price:'Plan 1 Price',
      p2n:'Plan 2 Name',p2p:'e.g. Pro',p2price:'Plan 2 Price',
      p3n:'Plan 3 Name',p3p:'e.g. Enterprise',p3price:'Plan 3 Price',
      color:'Brand Color',btn:'💎 Generate Pricing',inject:'💉 Inject',copy:'📋 Copy'},
  fr:{tab:'Page Prix',title:'💎 Créateur Page Prix',sub:'Pages de prix haute conversion avec switch mensuel/annuel',
      brand:'Marque',brandP:'ex. UltraApp',currency:'Devise',curP:'ex. €',
      p1n:'Nom Forfait 1',p1p:'ex. Starter',p1price:'Prix 1',
      p2n:'Nom Forfait 2',p2p:'ex. Pro',p2price:'Prix 2',
      p3n:'Nom Forfait 3',p3p:'ex. Entreprise',p3price:'Prix 3',
      color:'Couleur Marque',btn:'💎 Générer Prix',inject:'💉 Injecter',copy:'📋 Copier'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}
var st={brand:'UltraApp',cur:'$',p1n:'Starter',p1pr:15,p2n:'Pro',p2pr:49,p3n:'Enterprise',p3pr:129,color:'#8b5cf6'};

function buildPricingHTML(d){
  var fr=gl()==='fr';
  var mo=fr?'/mois':'/mo';
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Pricing — '+d.brand+'</title>'+
  '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">'+
  '<style>*{margin:0;padding:0;box-sizing:border-box;font-family:Inter,sans-serif}'+
  'body{background:#050810;color:#e2e8f0;min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:80px 20px;}'+
  '.badge{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);padding:6px 16px;border-radius:50px;font-size:13px;color:'+d.color+';font-weight:600;margin-bottom:24px;display:inline-block;}'+
  'h1{font-size:clamp(36px,5vw,56px);font-weight:900;color:#fff;line-height:1.1;letter-spacing:-1px;margin-bottom:16px;text-align:center;}'+
  '.sub{font-size:18px;color:#94a3b8;margin-bottom:40px;text-align:center;max-width:500px;}'+
  '.toggle-wrap{display:flex;align-items:center;gap:12px;margin-bottom:60px;}'+
  '.tgl-lbl{font-size:15px;font-weight:600;color:#94a3b8;transition:.2s;} .tgl-lbl.active{color:#fff;}'+
  '.tgl-switch{width:56px;height:32px;background:rgba(255,255,255,.1);border-radius:30px;position:relative;cursor:pointer;transition:.3s;}'+
  '.tgl-knob{width:24px;height:24px;background:'+d.color+';border-radius:50%;position:absolute;top:4px;left:4px;transition:.3s;box-shadow:0 2px 10px rgba(0,0,0,.3);}'+
  '.tgl-switch.yr .tgl-knob{left:28px;}'+
  '.save-badge{background:rgba(34,197,94,.2);color:#4ade80;font-size:11px;font-weight:800;padding:3px 8px;border-radius:12px;position:absolute;top:-25px;right:-30px;}'+
  '.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;width:100%;max-width:1100px;}'+
  '.card{background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.08);border-radius:24px;padding:40px;display:flex;flex-direction:column;position:relative;transition:.3s;}'+
  '.card:hover{border-color:rgba(255,255,255,.2);transform:translateY(-5px);}'+
  '.card.pro{background:linear-gradient(180deg,rgba(139,92,246,.08),rgba(255,255,255,.02));border:1px solid '+d.color+';box-shadow:0 20px 40px '+d.color+'22;}'+
  '.pop-badge{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:linear-gradient(90deg,'+d.color+',#a855f7);color:#fff;font-size:12px;font-weight:800;padding:4px 16px;border-radius:20px;text-transform:uppercase;letter-spacing:1px;}'+
  '.plan-name{font-size:20px;font-weight:700;color:#fff;margin-bottom:8px;}'+
  '.plan-desc{font-size:14px;color:#64748b;margin-bottom:24px;}'+
  '.price-wrap{display:flex;align-items:flex-end;gap:4px;margin-bottom:32px;}'+
  '.currency{font-size:24px;font-weight:700;color:#fff;margin-bottom:4px;}'+
  '.price{font-size:56px;font-weight:900;color:#fff;line-height:1;letter-spacing:-2px;}'+
  '.period{font-size:15px;color:#64748b;margin-bottom:8px;}'+
  '.feats{list-style:none;margin-bottom:40px;flex:1;}'+
  '.feats li{font-size:15px;color:#cbd5e1;margin-bottom:16px;display:flex;align-items:center;gap:12px;}'+
  '.chk{color:'+d.color+';font-weight:900;}'+
  '.cta{background:rgba(255,255,255,.05);color:#fff;border:1px solid rgba(255,255,255,.1);padding:16px;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;transition:.2s;width:100%;}'+
  '.cta:hover{background:rgba(255,255,255,.1);}'+
  '.card.pro .cta{background:'+d.color+';border:none;box-shadow:0 8px 20px '+d.color+'55;} .card.pro .cta:hover{transform:translateY(-2px);box-shadow:0 12px 25px '+d.color+'88;}'+
  '</style></head><body>'+
  '<div class="badge">Pricing</div>'+
  '<h1>'+(fr?'Des prix simples et transparents':'Simple, transparent pricing')+'</h1>'+
  '<p class="sub">'+(fr?'Pas de frais cachés. Annulez quand vous voulez.':'No hidden fees. Cancel anytime.')+'</p>'+
  '<div class="toggle-wrap"><div class="tgl-lbl active" id="l-mo">'+(fr?'Mensuel':'Monthly')+'</div><div class="tgl-switch" id="ts" onclick="toggle()">'+(fr?'<div class="save-badge">2 MOIS GRATUITS</div>':'<div class="save-badge">2 MONTHS FREE</div>')+'<div class="tgl-knob"></div></div><div class="tgl-lbl" id="l-yr">'+(fr?'Annuel':'Yearly')+'</div></div>'+
  '<div class="grid">'+
  // Plan 1
  '<div class="card"><div class="plan-name">'+d.p1n+'</div><div class="plan-desc">'+(fr?'Parfait pour démarrer':'Perfect for getting started')+'</div><div class="price-wrap"><div class="currency">'+d.cur+'</div><div class="price" data-mo="'+d.p1pr+'" data-yr="'+Math.floor(d.p1pr*10)+'">'+d.p1pr+'</div><div class="period">'+mo+'</div></div><ul class="feats"><li><span class="chk">✓</span> 1 User</li><li><span class="chk">✓</span> Basic Features</li><li><span class="chk">✓</span> 5GB Storage</li><li><span class="chk">✓</span> Email Support</li></ul><button class="cta">'+(fr?'Commencer':'Get Started')+'</button></div>'+
  // Plan 2
  '<div class="card pro"><div class="pop-badge">'+(fr?'Recommandé':'Most Popular')+'</div><div class="plan-name">'+d.p2n+'</div><div class="plan-desc">'+(fr?'Pour les pros':'For growing teams')+'</div><div class="price-wrap"><div class="currency">'+d.cur+'</div><div class="price" data-mo="'+d.p2pr+'" data-yr="'+Math.floor(d.p2pr*10)+'">'+d.p2pr+'</div><div class="period">'+mo+'</div></div><ul class="feats"><li><span class="chk">✓</span> 5 Users</li><li><span class="chk">✓</span> Pro Features</li><li><span class="chk">✓</span> 50GB Storage</li><li><span class="chk">✓</span> Priority Support</li><li><span class="chk">✓</span> Advanced Analytics</li></ul><button class="cta">'+(fr?'Commencer':'Get Started')+'</button></div>'+
  // Plan 3
  '<div class="card"><div class="plan-name">'+d.p3n+'</div><div class="plan-desc">'+(fr?'Pour les entreprises':'For large organizations')+'</div><div class="price-wrap"><div class="currency">'+d.cur+'</div><div class="price" data-mo="'+d.p3pr+'" data-yr="'+Math.floor(d.p3pr*10)+'">'+d.p3pr+'</div><div class="period">'+mo+'</div></div><ul class="feats"><li><span class="chk">✓</span> Unlimited Users</li><li><span class="chk">✓</span> All Features</li><li><span class="chk">✓</span> 500GB Storage</li><li><span class="chk">✓</span> 24/7 Phone Support</li><li><span class="chk">✓</span> Custom Integrations</li></ul><button class="cta">'+(fr?'Contacter les ventes':'Contact Sales')+'</button></div>'+
  '</div>'+
  '<script>var yr=false;function toggle(){yr=!yr;document.getElementById("ts").className=yr?"tgl-switch yr":"tgl-switch";document.getElementById("l-mo").className=yr?"tgl-lbl":"tgl-lbl active";document.getElementById("l-yr").className=yr?"tgl-lbl active":"tgl-lbl";var prs=document.querySelectorAll(".price");prs.forEach(function(p){var t=yr?p.dataset.yr:p.dataset.mo;animateVal(p,parseInt(p.textContent),parseInt(t),300);});var per=document.querySelectorAll(".period");per.forEach(function(p){p.textContent=yr?"'+(fr?'/an':'/yr')+'":"'+mo+'";});}'+
  'function animateVal(obj,start,end,dur){var startTS=null;var step=function(ts){if(!startTS)startTS=ts;var prog=Math.min((ts-startTS)/dur,1);obj.textContent=Math.floor(prog*(end-start)+start);if(prog<1){window.requestAnimationFrame(step);}};window.requestAnimationFrame(step);}'+
  '<\/script></body></html>';
}

function render(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(139,92,246,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(139,92,246,0.1),rgba(168,85,247,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#a78bfa;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  function fi(k,lbl,ph){var d=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;var i=document.createElement('input');i.id='pp-'+k;i.placeholder=ph;i.value=st[k]||'';i.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(139,92,246,0.25);border-radius:6px;padding:6px 9px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){st[k]=this.value;};d.appendChild(l);d.appendChild(i);return d;}
  
  var cr0=document.createElement('div');cr0.style='display:grid;grid-template-columns:2fr 1fr;gap:8px;';
  cr0.appendChild(fi('brand',t('brand'),t('brandP')));cr0.appendChild(fi('cur',t('currency'),t('curP')));body.appendChild(cr0);

  var cr1=document.createElement('div');cr1.style='display:grid;grid-template-columns:2fr 1fr;gap:8px;';
  cr1.appendChild(fi('p1n',t('p1n'),t('p1p')));
  var d1=document.createElement('div');var l1=document.createElement('div');l1.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l1.textContent=t('p1price');var i1=document.createElement('input');i1.type='number';i1.id='pp-p1pr';i1.value=st.p1pr;i1.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(139,92,246,0.25);border-radius:6px;padding:6px 9px;font-size:10px;outline:none;box-sizing:border-box;';i1.oninput=function(){st.p1pr=parseInt(this.value)||0;};d1.appendChild(l1);d1.appendChild(i1);cr1.appendChild(d1);body.appendChild(cr1);

  var cr2=document.createElement('div');cr2.style='display:grid;grid-template-columns:2fr 1fr;gap:8px;';
  cr2.appendChild(fi('p2n',t('p2n'),t('p2p')));
  var d2=document.createElement('div');var l2=document.createElement('div');l2.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l2.textContent=t('p2price');var i2=document.createElement('input');i2.type='number';i2.id='pp-p2pr';i2.value=st.p2pr;i2.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(139,92,246,0.25);border-radius:6px;padding:6px 9px;font-size:10px;outline:none;box-sizing:border-box;';i2.oninput=function(){st.p2pr=parseInt(this.value)||0;};d2.appendChild(l2);d2.appendChild(i2);cr2.appendChild(d2);body.appendChild(cr2);

  var cr3=document.createElement('div');cr3.style='display:grid;grid-template-columns:2fr 1fr;gap:8px;';
  cr3.appendChild(fi('p3n',t('p3n'),t('p3p')));
  var d3=document.createElement('div');var l3=document.createElement('div');l3.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l3.textContent=t('p3price');var i3=document.createElement('input');i3.type='number';i3.id='pp-p3pr';i3.value=st.p3pr;i3.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(139,92,246,0.25);border-radius:6px;padding:6px 9px;font-size:10px;outline:none;box-sizing:border-box;';i3.oninput=function(){st.p3pr=parseInt(this.value)||0;};d3.appendChild(l3);d3.appendChild(i3);cr3.appendChild(d3);body.appendChild(cr3);

  var cx=document.createElement('div');cx.style='display:flex;align-items:center;gap:8px;';
  var cl=document.createElement('div');cl.style='font-size:9px;color:#94a3b8;font-weight:700;flex:1;';cl.textContent=t('color');
  var ci=document.createElement('input');ci.type='color';ci.id='pp-color';ci.value=st.color;ci.style='width:44px;height:30px;background:#0d1117;border:1px solid rgba(139,92,246,0.25);border-radius:6px;cursor:pointer;padding:2px;';ci.oninput=function(){st.color=this.value;};
  cx.appendChild(cl);cx.appendChild(ci);body.appendChild(cx);

  var btn=document.createElement('button');btn.innerHTML=t('btn');btn.style='width:100%;background:linear-gradient(135deg,#4c1d95,#8b5cf6);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:4px;box-shadow:0 4px 15px rgba(139,92,246,0.3);';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=t('inject');ib.style='flex:1;background:linear-gradient(135deg,#064e3b,#10b981);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=t('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  
  var html='';
  btn.onclick=function(){['brand','cur','p1n','p2n','p3n','color'].forEach(function(k){var el=document.getElementById('pp-'+k);if(el)st[k]=el.value||st[k];});['p1pr','p2pr','p3pr'].forEach(function(k){var el=document.getElementById('pp-'+k);if(el)st[k]=parseInt(el.value)||0;});html=buildPricingHTML(st);ar.style.display='flex';res.innerHTML='<div style="background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#a78bfa;">✅ SaaS Pricing Page generated!</div>';if(window.showToast)window.showToast('💎 Pricing Page ready!');};
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 Copied!');});};
}
document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='pricingpage'){window.activeTab='pricingpage';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b=document.getElementById('tab-pricingpage');if(b)b.classList.add('active');render();return;}if(typeof oRT==='function')oRT(tab);};
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-pricingpage');if(el)el.textContent=t('tab');if(window.activeTab==='pricingpage')render();};
});
})();
