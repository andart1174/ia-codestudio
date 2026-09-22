/**
 * Email Template Studio v1.0 — EN/FR
 */
(function(){
'use strict';
var TX={
  en:{tab:'Email Studio',title:'📧 Email Template Studio',sub:'Build email-safe HTML newsletters',
      subject:'Subject Line:',subjectPh:'🚀 Your subject here',preheader:'Preheader:',preheaderPh:'Short preview text...',
      accentColor:'Accent:',bgColor:'Background:',textColor:'Text:',
      preset:'Template:',templates:{welcome:'👋 Welcome',promo:'🎁 Promo',newsletter:'📰 Newsletter',transact:'🧾 Transactional'},
      appName:'Brand Name:',appNamePh:'MyBrand',headline:'Headline:',headlinePh:'Welcome to the future!',
      body:'Body Text:',bodyPh:'Write your email content here...',ctaText:'CTA Button:',ctaPh:'Get Started',ctaUrl:'CTA Link:',ctaUrlPh:'https://myapp.com',
      btnGen:'✉️ Generate Email HTML',btnCopy:'📋 Copy',btnInject:'💉 Preview in Editor',
      generated:'✅ Email generated!',copied:'📋 Copied!'},
  fr:{tab:'Email Studio',title:'📧 Studio Email',sub:'Créez des newsletters HTML compatibles email',
      subject:'Sujet :',subjectPh:'🚀 Votre sujet ici',preheader:'Préen-tête :',preheaderPh:'Texte de prévisualisation...',
      accentColor:'Accent :',bgColor:'Fond :',textColor:'Texte :',
      preset:'Modèle :',templates:{welcome:'👋 Bienvenue',promo:'🎁 Promo',newsletter:'📰 Newsletter',transact:'🧾 Transaction'},
      appName:'Nom de marque :',appNamePh:'MaMarque',headline:'Titre :',headlinePh:'Bienvenue dans le futur !',
      body:'Corps du texte :',bodyPh:'Écrivez le contenu de votre email...',ctaText:'Bouton CTA :',ctaPh:'Commencer',ctaUrl:'Lien CTA :',ctaUrlPh:'https://monapp.com',
      btnGen:'✉️ Générer l\'Email HTML',btnCopy:'📋 Copier',btnInject:'💉 Prévisualiser',
      generated:'✅ Email généré !',copied:'📋 Copié !'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}
function tt(k){return((TX[gl()]||TX.en).templates||TX.en.templates)[k]||k;}

var PRESETS={
  welcome:{headline:gl()==='fr'?'Bienvenue !':'Welcome aboard!',body:gl()==='fr'?'Nous sommes ravis de vous accueillir.':'We\'re thrilled to have you join us. Get started by exploring everything we have to offer.',cta:gl()==='fr'?'Découvrir':'Explore Now'},
  promo:{headline:gl()==='fr'?'Offre Spéciale 🎁':'Special Offer Just for You 🎁',body:gl()==='fr'?'Profitez de -40% sur tout pendant 48h seulement !':'Get 40% off everything for the next 48 hours only. Use code SAVE40 at checkout.',cta:gl()==='fr'?'Acheter maintenant':'Shop Now'},
  newsletter:{headline:gl()==='fr'?'La Newsletter du mois':'Your Monthly Update',body:gl()==='fr'?'Voici les dernières nouvelles de notre communauté.':'Here\'s what\'s been happening in our community this month. New features, updates and more.',cta:gl()==='fr'?'Lire plus':'Read More'},
  transact:{headline:gl()==='fr'?'Votre commande est confirmée ✅':'Your order is confirmed ✅',body:gl()==='fr'?'Merci pour votre achat. Votre commande est en cours de traitement.':'Thank you for your purchase! Your order is being processed and will be shipped within 1-2 business days.',cta:gl()==='fr'?'Suivre commande':'Track Order'}
};

var lastHTML='';
var selectedPreset='welcome';

function buildEmail(cfg){
  var accent=cfg.accent||'#3b82f6';
  var bg=cfg.bg||'#f8fafc';
  var txtColor=cfg.txt||'#1e293b';
  return '<!DOCTYPE html>\n<html lang="'+(gl()==='fr'?'fr':'en')+'">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>'+cfg.subject+'</title>\n<!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->\n<style>\n  body, table, td, p, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }\n  table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }\n  img { -ms-interpolation-mode: bicubic; }\n  body { margin: 0; padding: 0; background: '+bg+'; font-family: Arial, Helvetica, sans-serif; }\n  @media screen and (max-width: 600px) { .container { width: 100% !important; } .mobile-hide { display: none !important; } }\n</style>\n</head>\n<body>\n\n<!-- Preheader (hidden) -->\n<div style="display:none;font-size:1px;color:'+bg+';line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">'+cfg.preheader+'</div>\n\n<!-- Email wrapper -->\n<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:'+bg+';padding:40px 0;">\n  <tr><td align="center">\n\n  <!-- Container -->\n  <table class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">\n\n    <!-- Header -->\n    <tr><td style="background:'+accent+';padding:32px 40px;text-align:center;">\n      <p style="margin:0;font-size:22px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">'+cfg.brand+'</p>\n    </td></tr>\n\n    <!-- Hero -->\n    <tr><td style="padding:48px 40px 32px;text-align:center;">\n      <h1 style="margin:0 0 20px;font-size:32px;font-weight:900;color:'+txtColor+';line-height:1.2;">'+cfg.headline+'</h1>\n      <p style="margin:0 0 32px;font-size:16px;line-height:1.6;color:#64748b;">'+cfg.body+'</p>\n      <!-- CTA Button -->\n      <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">\n        <tr><td style="border-radius:10px;background:'+accent+';"><a href="'+cfg.ctaUrl+'" style="display:inline-block;padding:16px 40px;font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:10px;">'+cfg.ctaText+'</a></td></tr>\n      </table>\n    </td></tr>\n\n    <!-- Divider -->\n    <tr><td style="padding:0 40px;"><div style="height:1px;background:#e2e8f0;"></div></td></tr>\n\n    <!-- Footer -->\n    <tr><td style="padding:32px 40px;text-align:center;">\n      <p style="margin:0 0 8px;font-size:13px;color:#94a3b8;">You received this because you signed up at '+cfg.brand+'.</p>\n      <p style="margin:0;font-size:12px;color:#cbd5e1;"><a href="#" style="color:#94a3b8;">Unsubscribe</a> · <a href="#" style="color:#94a3b8;">Privacy Policy</a></p>\n    </td></tr>\n\n  </table>\n  </td></tr>\n</table>\n\n</body>\n</html>';
}

function getVal(id){return((document.getElementById(id)||{}).value||'').trim();}

function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(236,72,153,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(236,72,153,0.1),rgba(168,85,247,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#f472b6;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;';

  // Templates
  var tLabel=document.createElement('div');tLabel.style='font-size:10px;color:#64748b;font-weight:600;';tLabel.textContent=t('preset');body.appendChild(tLabel);
  var tRow=document.createElement('div');tRow.style='display:flex;flex-wrap:wrap;gap:4px;';
  ['welcome','promo','newsletter','transact'].forEach(function(k){
    var b=document.createElement('button');b.textContent=tt(k);
    var isA=selectedPreset===k;
    b.style='font-size:9px;padding:4px 8px;border-radius:5px;border:1px solid rgba(236,72,153,'+(isA?'0.5)':'0.2)')+';background:rgba(236,72,153,'+(isA?'0.2)':'0.05)')+';color:'+(isA?'#f472b6':'#64748b')+';cursor:pointer;';
    b.onclick=function(){
      selectedPreset=k;
      var pr=PRESETS[k];
      var hEl=document.getElementById('email-headline');if(hEl)hEl.value=pr.headline;
      var bEl=document.getElementById('email-body');if(bEl)bEl.value=pr.body;
      var cEl=document.getElementById('email-cta');if(cEl)cEl.value=pr.cta;
      renderTab();
    };
    tRow.appendChild(b);
  });
  body.appendChild(tRow);

  var pr=PRESETS[selectedPreset]||PRESETS.welcome;
  function mkF(lk,id,ph,val,type){
    var d=document.createElement('div');d.style='display:flex;flex-direction:column;gap:3px;';
    var l=document.createElement('div');l.style='font-size:10px;color:#64748b;font-weight:600;';l.textContent=t(lk);
    var inp=document.createElement(type==='textarea'?'textarea':'input');
    if(type!=='textarea')inp.type=type||'text';
    inp.id=id;inp.placeholder=ph||'';inp.value=val||'';
    inp.style='background:#0f172a;color:#e2e8f0;border:1px solid rgba(236,72,153,0.2);padding:8px;border-radius:8px;font-size:10px;outline:none;width:100%;box-sizing:border-box;font-family:inherit;';
    if(type==='textarea'){inp.rows=3;inp.style+='resize:vertical;line-height:1.4;';}
    d.appendChild(l);d.appendChild(inp);return d;
  }
  body.appendChild(mkF('appName','email-brand',t('appNamePh'),'MyBrand'));
  body.appendChild(mkF('subject','email-subject',t('subjectPh'),'🚀 Welcome!'));
  body.appendChild(mkF('headline','email-headline',t('headlinePh'),pr.headline));
  body.appendChild(mkF('body','email-body',t('bodyPh'),pr.body,'textarea'));
  body.appendChild(mkF('ctaText','email-cta',t('ctaPh'),pr.cta));
  body.appendChild(mkF('ctaUrl','email-ctaurl',t('ctaUrlPh'),'https://myapp.com'));

  var colorRow=document.createElement('div');colorRow.style='display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px;';
  [{lk:'accentColor',id:'email-accent',def:'#3b82f6'},{lk:'bgColor',id:'email-bg',def:'#f8fafc'},{lk:'textColor',id:'email-txt',def:'#1e293b'}].forEach(function(c){
    var d=document.createElement('div');d.style='display:flex;flex-direction:column;gap:2px;';
    var l=document.createElement('div');l.style='font-size:9px;color:#64748b;font-weight:600;';l.textContent=t(c.lk);
    var i=document.createElement('input');i.type='color';i.id=c.id;i.value=c.def;
    i.style='width:100%;height:32px;border-radius:6px;border:1px solid rgba(255,255,255,0.1);cursor:pointer;background:transparent;padding:2px;';
    d.appendChild(l);d.appendChild(i);colorRow.appendChild(d);
  });
  body.appendChild(colorRow);

  var genBtn=document.createElement('button');genBtn.innerHTML=t('btnGen');
  genBtn.style='width:100%;background:linear-gradient(135deg,#9d174d,#ec4899);color:#fff;border:none;padding:11px;border-radius:10px;font-weight:900;font-size:12px;cursor:pointer;box-shadow:0 4px 20px rgba(236,72,153,0.35);';
  genBtn.onclick=function(){
    var cfg={brand:getVal('email-brand')||'MyBrand',subject:getVal('email-subject')||'Hello',
      preheader:getVal('email-subject')||'',headline:getVal('email-headline')||'Hello!',
      body:getVal('email-body')||'',ctaText:getVal('email-cta')||'Click Here',
      ctaUrl:getVal('email-ctaurl')||'https://myapp.com',
      accent:getVal('email-accent')||'#3b82f6',bg:getVal('email-bg')||'#f8fafc',txt:getVal('email-txt')||'#1e293b'};
    lastHTML=buildEmail(cfg);
    var out=document.getElementById('email-out');if(out)out.style.display='flex';
    var pre=document.getElementById('email-pre');if(pre)pre.textContent=lastHTML;
    if(window.showToast)window.showToast(t('generated'));
  };
  body.appendChild(genBtn);

  var outSec=document.createElement('div');outSec.id='email-out';outSec.style='display:'+(lastHTML?'flex':'none')+';flex-direction:column;gap:6px;';
  var pre=document.createElement('pre');pre.id='email-pre';
  pre.style='background:#0d1117;border:1px solid rgba(236,72,153,0.2);border-radius:8px;padding:10px;font-size:8px;color:#c9d1d9;overflow:auto;max-height:160px;white-space:pre-wrap;margin:0;font-family:"JetBrains Mono",monospace;line-height:1.4;word-break:break-word;';
  pre.textContent=lastHTML;outSec.appendChild(pre);
  var aRow=document.createElement('div');aRow.style='display:flex;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=t('btnInject');
  ib.style='flex:1;background:rgba(16,185,129,0.12);color:#34d399;border:1px solid rgba(16,185,129,0.3);padding:8px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
  ib.onclick=function(){if(window.editor&&lastHTML){window.editor.setValue(lastHTML);if(window.runPreview)window.runPreview();}};
  var cb=document.createElement('button');cb.innerHTML=t('btnCopy');
  cb.style='background:rgba(236,72,153,0.12);color:#f472b6;border:1px solid rgba(236,72,153,0.3);padding:8px 10px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
  cb.onclick=function(){if(lastHTML)navigator.clipboard.writeText(lastHTML).then(function(){if(window.showToast)window.showToast(t('copied'));});};
  aRow.appendChild(ib);aRow.appendChild(cb);outSec.appendChild(aRow);
  body.appendChild(outSec);
  wrap.appendChild(body);parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-emailstudio');if(el)el.textContent=t('tab');if(window.activeTab==='emailstudio')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='emailstudio'){window.activeTab='emailstudio';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-emailstudio');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
