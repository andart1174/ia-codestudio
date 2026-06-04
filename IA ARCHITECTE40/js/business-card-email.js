/**
 * 📇 Digital Business Card + 🖋️ Email Signature Builder
 */
(function(){
'use strict';

/* DIGITAL BUSINESS CARD (vCard/Linktree) */
var CX={
  en:{tab:'Digital Card',title:'📇 Digital Business Card',sub:'Interactive mobile-first card with vCard functionality',
      name:'Name',nameP:'e.g. John Doe',role:'Job Title',roleP:'e.g. CEO & Founder',
      phone:'Phone Number',email:'Email Address',website:'Website URL',
      btn:'📇 Generate Digital Card',inject:'💉 Inject',copy:'📋 Copy HTML',color:'Brand Color'},
  fr:{tab:'Carte Digitale',title:'📇 Carte de Visite Digitale',sub:'Carte interactive mobile avec fonction vCard',
      name:'Nom',nameP:'ex. Jean Dupont',role:'Poste',roleP:'ex. PDG & Fondateur',
      phone:'Numéro de Téléphone',email:'Adresse Email',website:'URL Site Web',
      btn:'📇 Générer Carte',inject:'💉 Injecter',copy:'📋 Copier HTML',color:'Couleur Marque'}
};
function gc(){return window.lang||'en';}
function tc(k){return(CX[gc()]||CX.en)[k]||k;}
var sc={name:'John Doe',role:'CEO & Founder',phone:'+1 234 567 8900',email:'john@example.com',website:'https://example.com',color:'#3b82f6'};

function buildCardHTML(d){
  var vcard="BEGIN:VCARD\\nVERSION:3.0\\nN:"+d.name+";;;;\\nFN:"+d.name+"\\nTITLE:"+d.role+"\\nTEL;TYPE=WORK,VOICE:"+d.phone+"\\nEMAIL;TYPE=WORK:"+d.email+"\\nURL:"+d.website+"\\nEND:VCARD";
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>'+d.name+' - Business Card</title>'+
  '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">'+
  '<style>*{margin:0;padding:0;box-sizing:border-box;font-family:Inter,sans-serif;}body{background:#f1f5f9;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:20px;}.card{background:#fff;width:100%;max-width:380px;border-radius:24px;box-shadow:0 20px 40px rgba(0,0,0,0.1);overflow:hidden;position:relative;}.header{height:120px;background:linear-gradient(135deg,'+d.color+',#1e293b);}.profile{width:100px;height:100px;border-radius:50%;background:#e2e8f0;border:4px solid #fff;margin:-50px auto 16px auto;display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:700;color:'+d.color+';box-shadow:0 8px 16px rgba(0,0,0,0.1);}.info{text-align:center;padding:0 24px;}h1{font-size:24px;color:#0f172a;font-weight:700;margin-bottom:4px;}.role{font-size:15px;color:'+d.color+';font-weight:600;margin-bottom:24px;}.links{padding:0 24px 30px 24px;display:flex;flex-direction:column;gap:12px;}.btn{display:flex;align-items:center;justify-content:center;padding:14px;border-radius:12px;text-decoration:none;font-weight:600;font-size:15px;transition:0.2s;}.btn-p{background:'+d.color+';color:#fff;box-shadow:0 4px 12px '+d.color+'55;} .btn-p:hover{transform:translateY(-2px);box-shadow:0 8px 16px '+d.color+'88;}.btn-s{background:#f8fafc;color:#475569;border:1px solid #e2e8f0;} .btn-s:hover{background:#f1f5f9;}</style></head><body>'+
  '<div class="card"><div class="header"></div><div class="profile">'+d.name.charAt(0)+'</div><div class="info"><h1>'+d.name+'</h1><div class="role">'+d.role+'</div></div><div class="links"><a href="mailto:'+d.email+'" class="btn btn-s">📧 Email Me</a><a href="tel:'+d.phone+'" class="btn btn-s">📱 Call Me</a><a href="'+d.website+'" target="_blank" class="btn btn-s">🌐 Visit Website</a><a href="data:text/vcard;charset=utf-8,'+encodeURIComponent(vcard)+'" download="contact.vcf" class="btn btn-p">💾 Save to Contacts</a></div></div><script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script><script>function dlImg(){var btn=document.getElementById("dl-btn");btn.style.display="none";html2canvas(document.querySelector(".card"),{scale:3,useCORS:true,backgroundColor:"transparent"}).then(c=>{var a=document.createElement("a");a.download="Digital_Card_HQ.png";a.href=c.toDataURL("image/png",1.0);a.click();btn.style.display="block";});}</script><button id="dl-btn" onclick="dlImg()" style="position:fixed;bottom:20px;right:20px;padding:12px 24px;background:#0f172a;color:#fff;border-radius:30px;cursor:pointer;font-weight:800;border:none;z-index:9999;box-shadow:0 10px 25px rgba(0,0,0,0.3);font-size:14px;">📸 Download HQ Photo</button></body></html>';
}

/* EMAIL SIGNATURE BUILDER */
var EX={
  en:{tab:'Email Sig',title:'🖋️ Email Signature',sub:'Professional table-based HTML email signature',
      btn:'🖋️ Generate Signature',inject:'💉 Inject',copy:'📋 Copy HTML'},
  fr:{tab:'Sign. Email',title:'🖋️ Signature Email',sub:'Signature email pro basée sur des tableaux HTML',
      btn:'🖋️ Générer Signature',inject:'💉 Injecter',copy:'📋 Copier HTML'}
};
function ge(){return window.lang||'en';}
function te(k){return(EX[ge()]||EX.en)[k]||k;}
var se={name:'John Doe',role:'CEO & Founder',phone:'+1 234 567 8900',email:'john@example.com',website:'https://example.com',color:'#10b981'};

function buildSignatureHTML(d){
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Email Signature</title></head><body>'+
  '<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;font-size:14px;color:#334155;line-height:1.4;"><tr><td style="padding-right:20px;border-right:2px solid '+d.color+';"><div style="width:80px;height:80px;background-color:'+d.color+'22;border-radius:50%;text-align:center;line-height:80px;font-size:28px;color:'+d.color+';font-weight:bold;">'+d.name.charAt(0)+'</div></td><td style="padding-left:20px;"><div style="font-size:18px;font-weight:bold;color:#0f172a;margin-bottom:2px;">'+d.name+'</div><div style="font-size:14px;color:'+d.color+';margin-bottom:8px;">'+d.role+'</div><table cellpadding="0" cellspacing="0" border="0" style="font-size:13px;color:#64748b;"><tr><td style="padding-bottom:4px;"><strong>E:</strong> <a href="mailto:'+d.email+'" style="color:#64748b;text-decoration:none;">'+d.email+'</a></td></tr><tr><td style="padding-bottom:4px;"><strong>P:</strong> <a href="tel:'+d.phone+'" style="color:#64748b;text-decoration:none;">'+d.phone+'</a></td></tr><tr><td><strong>W:</strong> <a href="'+d.website+'" style="color:'+d.color+';text-decoration:none;">'+d.website.replace('https://','')+'</a></td></tr></table></td></tr></table><script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script><script>function dlImg(){var btn=document.getElementById("dl-btn");btn.style.display="none";html2canvas(document.querySelector("table"),{scale:4,useCORS:true,backgroundColor:"#ffffff"}).then(c=>{var a=document.createElement("a");a.download="Email_Signature_HQ.png";a.href=c.toDataURL("image/png",1.0);a.click();btn.style.display="block";});}</script><button id="dl-btn" onclick="dlImg()" style="position:fixed;bottom:20px;right:20px;padding:12px 24px;background:#10b981;color:#fff;border-radius:30px;cursor:pointer;font-weight:800;border:none;z-index:9999;box-shadow:0 10px 25px rgba(16,185,129,0.3);font-size:14px;font-family:sans-serif;">📸 Download HQ Photo</button></body></html>';
}

function fi(k,lbl,ph,obj){var d=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;var i=document.createElement('input');i.id=k;i.placeholder=ph;i.value=obj[k.split('-')[1]]||'';i.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(59,130,246,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){obj[k.split('-')[1]]=this.value;};d.appendChild(l);d.appendChild(i);return d;}

function renderDigiCard(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(59,130,246,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(59,130,246,0.1),rgba(147,197,253,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#60a5fa;">'+tc('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tc('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  var c1=document.createElement('div');c1.style='display:grid;grid-template-columns:1fr 1fr;gap:8px;';
  c1.appendChild(fi('dc-name',tc('name'),tc('nameP'),sc));c1.appendChild(fi('dc-role',tc('role'),tc('roleP'),sc));body.appendChild(c1);
  var c2=document.createElement('div');c2.style='display:grid;grid-template-columns:1fr 1fr;gap:8px;';
  c2.appendChild(fi('dc-phone',tc('phone'),'+1 234',sc));c2.appendChild(fi('dc-email',tc('email'),'a@b.com',sc));body.appendChild(c2);
  body.appendChild(fi('dc-website',tc('website'),'https://',sc));

  var cx=document.createElement('div');cx.style='display:flex;align-items:center;gap:8px;';
  var cl=document.createElement('div');cl.style='font-size:9px;color:#94a3b8;font-weight:700;flex:1;';cl.textContent=tc('color');
  var ci=document.createElement('input');ci.type='color';ci.value=sc.color;ci.style='width:44px;height:30px;background:#0d1117;border:1px solid rgba(59,130,246,0.25);border-radius:6px;cursor:pointer;padding:2px;';ci.oninput=function(){sc.color=this.value;};
  cx.appendChild(cl);cx.appendChild(ci);body.appendChild(cx);

  var btn=document.createElement('button');btn.innerHTML=tc('btn');btn.style='width:100%;background:linear-gradient(135deg,#1e3a8a,#3b82f6);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:4px;box-shadow:0 4px 15px rgba(59,130,246,0.3);';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=tc('inject');ib.style='flex:1;background:rgba(255,255,255,.1);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=tc('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  
  var html='';
  btn.onclick=function(){html=buildCardHTML(sc);ar.style.display='flex';res.innerHTML='<div style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#60a5fa;">✅ Business Card Ready (vCard included)!</div>';if(window.showToast)window.showToast('📇 Card generated!');};
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 HTML Copied!');});};
}

function renderEmailSig(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(16,185,129,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(52,211,153,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#10b981;">'+te('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+te('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  var c1=document.createElement('div');c1.style='display:grid;grid-template-columns:1fr 1fr;gap:8px;';
  c1.appendChild(fi('es-name',tc('name'),tc('nameP'),se));c1.appendChild(fi('es-role',tc('role'),tc('roleP'),se));body.appendChild(c1);
  var c2=document.createElement('div');c2.style='display:grid;grid-template-columns:1fr 1fr;gap:8px;';
  c2.appendChild(fi('es-phone',tc('phone'),'+1 234',se));c2.appendChild(fi('es-email',tc('email'),'a@b.com',se));body.appendChild(c2);
  body.appendChild(fi('es-website',tc('website'),'https://',se));

  var cx=document.createElement('div');cx.style='display:flex;align-items:center;gap:8px;';
  var cl=document.createElement('div');cl.style='font-size:9px;color:#94a3b8;font-weight:700;flex:1;';cl.textContent=tc('color');
  var ci=document.createElement('input');ci.type='color';ci.value=se.color;ci.style='width:44px;height:30px;background:#0d1117;border:1px solid rgba(16,185,129,0.25);border-radius:6px;cursor:pointer;padding:2px;';ci.oninput=function(){se.color=this.value;};
  cx.appendChild(cl);cx.appendChild(ci);body.appendChild(cx);

  var btn=document.createElement('button');btn.innerHTML=te('btn');btn.style='width:100%;background:linear-gradient(135deg,#064e3b,#10b981);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:4px;box-shadow:0 4px 15px rgba(16,185,129,0.3);';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=te('inject');ib.style='flex:1;background:rgba(255,255,255,.1);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=te('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  
  var html='';
  btn.onclick=function(){html=buildSignatureHTML(se);ar.style.display='flex';res.innerHTML='<div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#10b981;">✅ Signature Ready (Table HTML)!</div>';if(window.showToast)window.showToast('🖋️ Signature generated!');};
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 HTML Copied!');});};
}

document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;window.renderTab=function(tab){
    if(tab==='digicard'){window.activeTab='digicard';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b1=document.getElementById('tab-digicard');if(b1)b1.classList.add('active');renderDigiCard();return;}
    if(tab==='emailsig'){window.activeTab='emailsig';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b2=document.getElementById('tab-emailsig');if(b2)b2.classList.add('active');renderEmailSig();return;}
    if(typeof oRT==='function')oRT(tab);
  };
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var e1=document.getElementById('lbl-tab-digicard');if(e1)e1.textContent=tc('tab');var e2=document.getElementById('lbl-tab-emailsig');if(e2)e2.textContent=te('tab');if(window.activeTab==='digicard')renderDigiCard();if(window.activeTab==='emailsig')renderEmailSig();};
});
})();
