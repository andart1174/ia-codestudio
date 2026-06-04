/**
 * Privacy & TOS Generator + Cookie Banner Generator — EN/FR
 */

/* ─── PRIVACY & TOS GENERATOR ─── */
(function(){
'use strict';
var TX={
  en:{tab:'Privacy',title:'📝 Privacy & TOS Generator',sub:'GDPR-compliant documents for your app',
    appName:'App name:',company:'Company name:',email:'Contact email:',website:'Website URL:',
    country:'Country/jurisdiction:',dataTypes:'Data collected (comma separated):',
    btnGen:'📝 Generate Documents',btnCopy:'📋 Copy',pp:'Privacy Policy',tos:'Terms of Service',copied:'Copied!'},
  fr:{tab:'Privacy',title:'📝 Générateur Privacy & CGU',sub:'Documents GDPR pour votre application',
    appName:'Nom de l\'app :',company:'Nom de l\'entreprise :',email:'Email de contact :',website:'URL du site :',
    country:'Pays/juridiction :',dataTypes:'Données collectées (séparées par virgule) :',
    btnGen:'📝 Générer les Documents',btnCopy:'📋 Copier',pp:'Politique de Confidentialité',tos:'Conditions Générales',copied:'Copié !'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}
var D={appName:'MyApp',company:'My Company',email:'contact@myapp.com',website:'https://myapp.com',country:'France',dataTypes:'email, name, IP address'};

function genPrivacy(){
  var d=new Date().toLocaleDateString();var lx=gl()==='fr';
  var n=D.appName,c=D.company,e=D.email,w=D.website,co=D.country,dt=D.dataTypes;
  if(lx)return'# Politique de Confidentialité — '+n+'\n\n**Dernière mise à jour :** '+d+'\n\n## 1. Introduction\n'+c+' (« nous ») s\'engage à protéger vos données personnelles. Cette politique explique comment nous collectons, utilisons et protégeons vos informations.\n\n## 2. Données Collectées\nNous collectons les données suivantes : '+dt+'.\n\n## 3. Finalité du Traitement\nVos données sont utilisées pour :\n- Fournir et améliorer nos services\n- Vous envoyer des communications (avec votre consentement)\n- Respecter nos obligations légales\n- Analyser l\'utilisation de '+n+'\n\n## 4. Base Légale (RGPD)\nConformément au RGPD, nous traitons vos données sur la base de :\n- Votre consentement explicite\n- L\'exécution d\'un contrat\n- Nos intérêts légitimes\n\n## 5. Conservation des Données\nVos données sont conservées pendant la durée nécessaire à la fourniture de nos services, et au maximum 3 ans après votre dernière interaction.\n\n## 6. Vos Droits\nVous disposez des droits suivants :\n- **Accès** à vos données personnelles\n- **Rectification** des données inexactes\n- **Suppression** (« droit à l\'oubli »)\n- **Opposition** au traitement\n- **Portabilité** de vos données\n\nPour exercer vos droits : **'+e+'**\n\n## 7. Cookies\nNous utilisons des cookies essentiels et, avec votre consentement, des cookies analytiques.\n\n## 8. Sécurité\nNous mettons en œuvre des mesures techniques appropriées pour protéger vos données.\n\n## 9. Contact\n'+c+' — '+w+'\nEmail DPO : '+e+'\nJuridiction : '+co;

  return'# Privacy Policy — '+n+'\n\n**Last updated:** '+d+'\n\n## 1. Introduction\n'+c+' ("we", "us") is committed to protecting your personal data. This policy explains how we collect, use and protect your information.\n\n## 2. Data We Collect\nWe collect the following data: '+dt+'.\n\n## 3. How We Use Your Data\nYour data is used to:\n- Provide and improve our services\n- Send you communications (with your consent)\n- Comply with legal obligations\n- Analyze usage of '+n+'\n\n## 4. Legal Basis (GDPR)\nWe process your data based on:\n- Your explicit consent\n- Performance of a contract\n- Our legitimate interests\n\n## 5. Data Retention\nWe retain your data for as long as necessary to provide services, and no longer than 3 years after your last interaction.\n\n## 6. Your Rights\nYou have the following rights:\n- **Access** to your personal data\n- **Rectification** of inaccurate data\n- **Erasure** ("right to be forgotten")\n- **Objection** to processing\n- **Portability** of your data\n\nTo exercise your rights contact: **'+e+'**\n\n## 7. Cookies\nWe use essential cookies and, with your consent, analytical cookies.\n\n## 8. Security\nWe implement appropriate technical measures to protect your data.\n\n## 9. Contact\n'+c+' — '+w+'\nEmail: '+e+'\nJurisdiction: '+co;
}
function genTOS(){
  var d=new Date().toLocaleDateString();var lx=gl()==='fr';
  var n=D.appName,c=D.company,e=D.email,w=D.website;
  if(lx)return'# Conditions Générales d\'Utilisation — '+n+'\n\n**Dernière mise à jour :** '+d+'\n\n## 1. Acceptation\nEn utilisant '+n+', vous acceptez les présentes CGU. Si vous n\'acceptez pas ces conditions, n\'utilisez pas le service.\n\n## 2. Description du Service\n'+n+' est un service fourni par '+c+'. Nous nous réservons le droit de modifier ou interrompre le service à tout moment.\n\n## 3. Compte Utilisateur\n- Vous êtes responsable de la confidentialité de vos identifiants\n- Vous devez notifier toute utilisation non autorisée à '+e+'\n- Vous devez avoir au moins 16 ans pour utiliser ce service\n\n## 4. Propriété Intellectuelle\nTout le contenu de '+n+' appartient à '+c+' ou à ses concédants. Toute reproduction sans autorisation est interdite.\n\n## 5. Comportement Utilisateur\nVous vous engagez à ne pas :\n- Utiliser le service à des fins illégales\n- Tenter d\'accéder à des systèmes non autorisés\n- Partager du contenu offensant ou trompeur\n\n## 6. Limitation de Responsabilité\n'+c+' ne peut être tenu responsable des dommages indirects, consécutifs ou punitifs résultant de l\'utilisation du service.\n\n## 7. Résiliation\nNous nous réservons le droit de résilier votre accès en cas de violation des présentes CGU.\n\n## 8. Droit Applicable\nCes CGU sont régies par le droit français. Tout litige sera soumis aux tribunaux compétents.\n\n## 9. Contact\n'+c+' — '+w+' — '+e;

  return'# Terms of Service — '+n+'\n\n**Last updated:** '+d+'\n\n## 1. Acceptance\nBy using '+n+', you agree to these Terms. If you do not agree, do not use the service.\n\n## 2. Service Description\n'+n+' is a service provided by '+c+'. We reserve the right to modify or discontinue the service at any time.\n\n## 3. User Account\n- You are responsible for keeping your credentials confidential\n- You must notify unauthorized use to '+e+'\n- You must be at least 16 years old to use this service\n\n## 4. Intellectual Property\nAll content in '+n+' belongs to '+c+' or its licensors. Reproduction without permission is prohibited.\n\n## 5. User Conduct\nYou agree not to:\n- Use the service for illegal purposes\n- Attempt to access unauthorized systems\n- Share offensive or misleading content\n\n## 6. Limitation of Liability\n'+c+' shall not be liable for indirect, consequential or punitive damages arising from use of the service.\n\n## 7. Termination\nWe reserve the right to terminate your access for violation of these Terms.\n\n## 8. Governing Law\nThese Terms are governed by applicable law. Disputes shall be submitted to competent courts.\n\n## 9. Contact\n'+c+' — '+w+' — '+e;
}

var activeDoc='pp';var ppText='';var tosText='';
function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(34,197,94,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(6,78,59,0.3),rgba(34,197,94,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#4ade80;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:5px;';

  function mkF(lbl,key,ph){var w=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#64748b;font-weight:600;margin-bottom:2px;';l.textContent=lbl;var i=document.createElement('input');i.type='text';i.value=D[key];i.placeholder=ph||'';i.style='width:100%;background:#0f172a;color:#e2e8f0;border:1px solid rgba(34,197,94,0.15);padding:6px 8px;border-radius:6px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){D[key]=this.value;};w.appendChild(l);w.appendChild(i);return w;}
  body.appendChild(mkF(t('appName'),'appName'));body.appendChild(mkF(t('company'),'company'));
  var r2=document.createElement('div');r2.style='display:grid;grid-template-columns:1fr 1fr;gap:5px;';r2.appendChild(mkF(t('email'),'email'));r2.appendChild(mkF(t('country'),'country'));body.appendChild(r2);
  body.appendChild(mkF(t('website'),'website'));body.appendChild(mkF(t('dataTypes'),'dataTypes'));

  var genBtn=document.createElement('button');genBtn.innerHTML=t('btnGen');genBtn.style='width:100%;background:linear-gradient(135deg,#064e3b,#10b981);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(16,185,129,0.3);';
  body.appendChild(genBtn);

  var tabs2=document.createElement('div');tabs2.style='display:flex;gap:5px;display:none;';tabs2.id='priv-tabs';
  var resArea=document.createElement('textarea');resArea.id='priv-result';resArea.style='background:#0d1117;color:#c9d1d9;border:1px solid rgba(34,197,94,0.15);border-radius:8px;padding:10px;font-size:10px;font-family:"JetBrains Mono",monospace;line-height:1.6;resize:vertical;height:180px;width:100%;box-sizing:border-box;display:none;';
  var cpBtn=document.createElement('button');cpBtn.innerHTML=t('btnCopy');cpBtn.style='width:100%;background:rgba(34,197,94,0.1);color:#4ade80;border:1px solid rgba(34,197,94,0.2);padding:8px;border-radius:7px;font-size:10px;font-weight:700;cursor:pointer;display:none;';cpBtn.id='priv-cp';
  body.appendChild(tabs2);body.appendChild(resArea);body.appendChild(cpBtn);
  wrap.appendChild(body);parent.appendChild(wrap);

  genBtn.onclick=function(){
    ppText=genPrivacy();tosText=genTOS();
    tabs2.style.display='flex';resArea.style.display='';cpBtn.style.display='';
    function mkTab(lbl,doc){var b=document.createElement('button');b.textContent=lbl;b.style='flex:1;padding:7px;border-radius:6px;font-size:10px;font-weight:700;cursor:pointer;border:1px solid rgba(34,197,94,0.3);'+(activeDoc===doc?'background:rgba(34,197,94,0.2);color:#4ade80;':'background:#0f172a;color:#64748b;');
      b.onclick=function(){activeDoc=doc;resArea.value=doc==='pp'?ppText:tosText;tabs2.innerHTML='';mkTab(t('pp'),'pp');mkTab(t('tos'),'tos');};tabs2.appendChild(b);}
    tabs2.innerHTML='';mkTab(t('pp'),'pp');mkTab(t('tos'),'tos');
    resArea.value=ppText;cpBtn.onclick=function(){navigator.clipboard.writeText(resArea.value).then(function(){if(window.showToast)window.showToast(t('copied'));});};
  };
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-privacy');if(el)el.textContent=t('tab');if(window.activeTab==='privacy')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='privacy'){window.activeTab='privacy';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-privacy');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();

/* ─── COOKIE BANNER GENERATOR ─── */
(function(){
'use strict';
var TX={
  en:{tab:'Cookies',title:'🍪 Cookie Banner Generator',sub:'GDPR cookie consent banner with inject',
    position:'Position:',posOpts:['bottom','top','modal'],
    theme:'Theme:',themeOpts:['dark','light','glass'],
    appName:'App name:',policyUrl:'Privacy policy URL:',
    btnGen:'🍪 Preview Banner',btnCopy:'📋 Copy HTML+JS',btnInject:'💉 Inject to Editor',copied:'Copied!'},
  fr:{tab:'Cookies',title:'🍪 Générateur Banner Cookies',sub:'Bannière de consentement RGPD avec injection',
    position:'Position :',posOpts:['bas','haut','modal'],
    theme:'Thème :',themeOpts:['sombre','clair','verre'],
    appName:'Nom de l\'app :',policyUrl:'URL politique de confidentialité :',
    btnGen:'🍪 Aperçu Bannière',btnCopy:'📋 Copier HTML+JS',btnInject:'💉 Injecter dans Éditeur',copied:'Copié !'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}
var D={pos:'bottom',theme:'dark',appName:'MyApp',policyUrl:'/privacy'};

function genBanner(){
  var lx=gl()==='fr';var n=D.appName;var pu=D.policyUrl;
  var THEMES={
    dark:'background:#1e293b;color:#e2e8f0;border:1px solid rgba(255,255,255,0.1);',
    light:'background:#ffffff;color:#1e293b;border:1px solid #e2e8f0;box-shadow:0 4px 20px rgba(0,0,0,0.1);',
    glass:'background:rgba(15,23,42,0.85);color:#e2e8f0;border:1px solid rgba(255,255,255,0.15);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);'
  };
  var btnStyle='border:none;padding:10px 20px;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;';
  var pos=D.pos==='bottom'?'bottom:0;left:0;right:0;':'top:0;left:0;right:0;';
  if(D.pos==='modal')pos='top:50%;left:50%;transform:translate(-50%,-50%);max-width:500px;width:90%;border-radius:16px!important;';
  var overlay=D.pos==='modal'?'<div id="cookie-overlay" style="position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9998;"></div>':'';
  var txt=lx?
    'Nous utilisons des cookies pour améliorer votre expérience. En continuant à naviguer, vous acceptez notre <a href="'+pu+'" style="color:#38bdf8;">politique de confidentialité</a>.':
    'We use cookies to enhance your experience. By continuing, you agree to our <a href="'+pu+'" style="color:#38bdf8;">privacy policy</a>.';
  return overlay+'<div id="cookie-banner" style="position:fixed;'+pos+'z-index:9999;padding:16px 24px;'+THEMES[D.theme]+'">'+
    '<div style="max-width:900px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;gap:12px;justify-content:space-between;">'+
    '<div style="flex:1;min-width:200px;font-size:13px;line-height:1.6;">'+
    '<strong style="display:block;margin-bottom:4px;">🍪 '+(lx?n+' utilise des cookies':n+' uses cookies')+'</strong>'+txt+'</div>'+
    '<div style="display:flex;gap:8px;flex-wrap:wrap;">'+
    '<button onclick="cookieConsent(\'decline\')" style="'+btnStyle+'background:#ef444420;color:#f87171;border:1px solid #ef444460;">'+(lx?'Refuser':'Decline')+'</button>'+
    '<button onclick="cookieConsent(\'essential\')" style="'+btnStyle+'background:#64748b20;color:#94a3b8;border:1px solid #64748b60;">'+(lx?'Essentiels seulement':'Essential only')+'</button>'+
    '<button onclick="cookieConsent(\'all\')" style="'+btnStyle+'background:linear-gradient(135deg,#3b82f6,#6366f1);color:#fff;">'+(lx?'Tout accepter':'Accept All')+'</button>'+
    '</div></div></div>'+
    '<script>'+
    'function cookieConsent(type){'+
    'localStorage.setItem("cookieConsent",type);'+
    'document.getElementById("cookie-banner").style.display="none";'+
    'var ov=document.getElementById("cookie-overlay");if(ov)ov.style.display="none";'+
    'if(type==="all"){console.log("Analytics enabled");}'+
    '}'+
    'if(localStorage.getItem("cookieConsent")){'+
    'document.getElementById("cookie-banner").style.display="none";'+
    'var ov=document.getElementById("cookie-overlay");if(ov)ov.style.display="none";'+
    '}<\/script>';
}

function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(234,179,8,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(120,53,15,0.2),rgba(234,179,8,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#facc15;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:6px;';

  function mkF(lbl,key){var w=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#64748b;font-weight:600;margin-bottom:2px;';l.textContent=lbl;var i=document.createElement('input');i.type='text';i.value=D[key];i.style='width:100%;background:#0f172a;color:#e2e8f0;border:1px solid rgba(234,179,8,0.15);padding:6px 8px;border-radius:6px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){D[key]=this.value;};w.appendChild(l);w.appendChild(i);return w;}
  function mkSel(lbl,key,opts,vals){var w=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#64748b;font-weight:600;margin-bottom:2px;';l.textContent=lbl;var s=document.createElement('select');s.style='width:100%;background:#0f172a;color:#e2e8f0;border:1px solid rgba(234,179,8,0.15);padding:6px;border-radius:6px;font-size:10px;outline:none;';opts.forEach(function(o,i){var op=document.createElement('option');op.value=vals?vals[i]:o;op.textContent=o;if(op.value===D[key])op.selected=true;s.appendChild(op);});s.onchange=function(){D[key]=this.value;};w.appendChild(l);w.appendChild(s);return w;}

  body.appendChild(mkF(t('appName'),'appName'));body.appendChild(mkF(t('policyUrl'),'policyUrl'));
  var r2=document.createElement('div');r2.style='display:grid;grid-template-columns:1fr 1fr;gap:5px;';
  r2.appendChild(mkSel(t('position'),'pos',['Bottom','Top','Modal'],['bottom','top','modal']));
  r2.appendChild(mkSel(t('theme'),'theme',['Dark','Light','Glass'],['dark','light','glass']));
  body.appendChild(r2);

  var genBtn=document.createElement('button');genBtn.innerHTML=t('btnGen');genBtn.style='width:100%;background:linear-gradient(135deg,#78350f,#eab308);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(234,179,8,0.3);';
  body.appendChild(genBtn);

  var ifr=document.createElement('iframe');ifr.style='width:100%;height:140px;border:1px solid rgba(255,255,255,0.07);border-radius:8px;background:#1e293b;display:none;';
  var actRow=document.createElement('div');actRow.style='display:flex;gap:5px;display:none;';actRow.id='ck-acts';
  var cpBtn=document.createElement('button');cpBtn.innerHTML=t('btnCopy');cpBtn.style='flex:1;background:rgba(234,179,8,0.1);color:#facc15;border:1px solid rgba(234,179,8,0.2);padding:8px;border-radius:7px;font-size:10px;font-weight:700;cursor:pointer;';
  var injBtn=document.createElement('button');injBtn.innerHTML=t('btnInject');injBtn.style='flex:1;background:rgba(99,102,241,0.1);color:#818cf8;border:1px solid rgba(99,102,241,0.2);padding:8px;border-radius:7px;font-size:10px;font-weight:700;cursor:pointer;';
  actRow.appendChild(cpBtn);if(window.editor)actRow.appendChild(injBtn);
  body.appendChild(ifr);body.appendChild(actRow);wrap.appendChild(body);parent.appendChild(wrap);

  genBtn.onclick=function(){
    var html=genBanner();ifr.style.display='';actRow.style.display='flex';
    var full='<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{margin:0;padding:20px;background:#0f172a;font-family:sans-serif;}</style></head><body>'+html+'</body></html>';
    ifr.contentDocument.open();ifr.contentDocument.write(full);ifr.contentDocument.close();
    cpBtn.onclick=function(){navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast(t('copied'));});};
    if(window.editor)injBtn.onclick=function(){
      var code=window.editor.getValue();
      var pos2=code.indexOf('</body>');
      if(pos2>-1)window.editor.setValue(code.slice(0,pos2)+'\n'+html+'\n</body>'+code.slice(pos2+7));
      else window.editor.setValue(code+'\n'+html);
    };
  };
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-cookies');if(el)el.textContent=t('tab');if(window.activeTab==='cookies')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='cookies'){window.activeTab='cookies';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-cookies');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
