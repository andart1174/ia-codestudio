/**
 * 📬 Newsletter Template Builder — EN/FR
 */
(function(){
'use strict';
var TX={
  en:{tab:'Newsletter',title:'📬 Newsletter Builder',sub:'Responsive HTML email templates for your audience',
      brand:'Brand',brandP:'e.g. UltraNews',subject:'Subject Line',subP:'e.g. Your Weekly Update',
      headline:'Headline',hlP:'e.g. What\'s new this week',content:'Content',contentP:'e.g. Here is a summary of our latest features...',
      cta:'Button Text',ctaP:'e.g. Read Full Update',color:'Brand Color',
      btn:'📬 Generate Email',inject:'💉 Inject',copy:'📋 Copy HTML',
      styles:['Modern Minimal','Dark Mode','Vibrant Splash']},
  fr:{tab:'Newsletter',title:'📬 Créateur Newsletter',sub:'Templates d\'emails HTML responsives pour votre audience',
      brand:'Marque',brandP:'ex. UltraNews',subject:'Sujet',subP:'ex. Votre Mise à Jour Hebdo',
      headline:'Titre Principal',hlP:'ex. Quoi de neuf cette semaine',content:'Contenu',contentP:'ex. Voici un résumé de nos nouvelles fonctionnalités...',
      cta:'Bouton CTA',ctaP:'ex. Lire la Suite',color:'Couleur Marque',
      btn:'📬 Générer Email',inject:'💉 Injecter',copy:'📋 Copier HTML',
      styles:['Moderne Minimaliste','Mode Sombre','Couleurs Vives']}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}
var st={brand:'UltraNews',subject:'Your Weekly Update',headline:'What\'s new this week',content:'Hey there,\n\nWe\'ve been working hard to bring you some amazing new features to boost your productivity. Here is a quick look at what\'s new:\n\n1. AI Assistant integration\n2. Real-time collaboration\n3. Dark mode everywhere\n\nLet us know what you think!',cta:'Explore Updates',color:'#ec4899',style:'dark'};

function buildEmailHTML(d){
  var bgMain, bgContent, textColor, textMuted, borderStr;
  if(d.style==='dark'){bgMain='#0f172a';bgContent='#1e293b';textColor='#f1f5f9';textMuted='#94a3b8';borderStr='1px solid #334155';}
  else if(d.style==='vibrant'){bgMain=d.color;bgContent='#ffffff';textColor='#1e293b';textMuted='#64748b';borderStr='none';}
  else{bgMain='#f8fafc';bgContent='#ffffff';textColor='#1e293b';textMuted='#64748b';borderStr='1px solid #e2e8f0';}

  var paragraphs=d.content.split('\n').filter(Boolean).map(function(p){return'<p style="margin:0 0 16px 0;font-size:16px;line-height:1.6;color:'+textColor+';">'+p+'</p>';}).join('');

  return '<!DOCTYPE html><html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>'+
  '<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="x-apple-disable-message-reformatting"><title>'+d.subject+'</title>'+
  '<style>table,td,div,h1,p{font-family:Arial,sans-serif;}@media screen and (max-width:600px){.email-container{width:100%!important;margin:auto!important;}.content-padding{padding:20px!important;}}</style>'+
  '</head><body style="margin:0;padding:0;word-spacing:normal;background-color:'+bgMain+';">'+
  '<div role="article" aria-roledescription="email" lang="en" style="text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:'+bgMain+';padding:40px 0;">'+
  '<table class="email-container" role="presentation" style="width:600px;margin:0 auto;border:none;border-spacing:0;background-color:'+bgContent+';border-radius:12px;overflow:hidden;'+(borderStr!=='none'?'border:'+borderStr+';':'box-shadow:0 10px 25px rgba(0,0,0,0.1);')+'">'+
  // Header
  '<tr><td style="padding:30px 40px;background-color:'+(d.style==='vibrant'?bgContent:d.color)+';text-align:center;">'+
  '<h1 style="margin:0;font-size:24px;color:'+(d.style==='vibrant'?d.color:'#ffffff')+';font-weight:bold;letter-spacing:-0.5px;">'+d.brand+'</h1>'+
  '</td></tr>'+
  // Body
  '<tr><td class="content-padding" style="padding:40px;">'+
  '<h2 style="margin:0 0 20px 0;font-size:22px;color:'+textColor+';font-weight:bold;">'+d.headline+'</h2>'+
  paragraphs+
  // CTA
  '<table role="presentation" style="margin:30px auto 10px auto;border:none;border-spacing:0;"><tr>'+
  '<td style="border-radius:6px;background-color:'+d.color+';text-align:center;">'+
  '<a href="#" style="background-color:'+d.color+';color:#ffffff;font-size:16px;font-weight:bold;text-decoration:none;padding:14px 30px;border-radius:6px;display:inline-block;border:1px solid '+d.color+';">'+d.cta+'</a>'+
  '</td></tr></table>'+
  '</td></tr>'+
  // Footer
  '<tr><td style="padding:30px 40px;background-color:'+(d.style==='dark'?'#0f172a':'#f1f5f9')+';text-align:center;">'+
  '<p style="margin:0 0 10px 0;font-size:14px;color:'+textMuted+';">'+d.brand+' © '+new Date().getFullYear()+' All rights reserved.</p>'+
  '<p style="margin:0;font-size:12px;color:'+textMuted+';"><a href="#" style="color:'+textMuted+';text-decoration:underline;">Unsubscribe</a> | <a href="#" style="color:'+textMuted+';text-decoration:underline;">View in browser</a></p>'+
  '</td></tr>'+
  '</table></div></body></html>';
}

function render(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(236,72,153,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(236,72,153,0.1),rgba(244,63,94,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#f472b6;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  function fi(k,lbl,ph,area){var d=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;var i=area?document.createElement('textarea'):document.createElement('input');i.id='nl-'+k;i.placeholder=ph;if(area){i.rows=5;i.style='resize:none;';}i.value=st[k]||'';i.style=(i.style.cssText||'')+'width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(236,72,153,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){st[k]=this.value;};d.appendChild(l);d.appendChild(i);return d;}
  
  var cr0=document.createElement('div');cr0.style='display:grid;grid-template-columns:1fr 1fr;gap:8px;';
  cr0.appendChild(fi('brand',t('brand'),t('brandP')));cr0.appendChild(fi('subject',t('subject'),t('subP')));body.appendChild(cr0);
  
  body.appendChild(fi('headline',t('headline'),t('hlP')));
  body.appendChild(fi('content',t('content'),t('contentP'),true));
  body.appendChild(fi('cta',t('cta'),t('ctaP')));
  
  var cx=document.createElement('div');cx.style='display:flex;align-items:center;gap:8px;';
  var cl=document.createElement('div');cl.style='font-size:9px;color:#94a3b8;font-weight:700;flex:1;';cl.textContent=t('color');
  var ci=document.createElement('input');ci.type='color';ci.id='nl-color';ci.value=st.color;ci.style='width:44px;height:30px;background:#0d1117;border:1px solid rgba(236,72,153,0.25);border-radius:6px;cursor:pointer;padding:2px;';ci.oninput=function(){st.color=this.value;};
  cx.appendChild(cl);cx.appendChild(ci);body.appendChild(cx);

  var sl=document.createElement('div');sl.style='font-size:9px;color:#94a3b8;font-weight:700;';sl.textContent='Style';body.appendChild(sl);
  var sr=document.createElement('div');sr.style='display:flex;gap:4px;flex-wrap:wrap;';
  var styls=[['minimal','⚪ Minimal'],['dark','🌑 Dark Mode'],['vibrant','🎨 Vibrant']];
  var sLabs=t('styles');
  styls.forEach(function(s,idx){var b=document.createElement('button');b.textContent=Array.isArray(sLabs)?sLabs[idx]:s[1];b.dataset.s=s[0];var on=st.style===s[0];b.style='padding:5px 10px;border-radius:20px;font-size:9px;font-weight:700;cursor:pointer;border:1px solid rgba(236,72,153,'+(on?'0.8':'0.25')+');background:rgba(236,72,153,'+(on?'0.2':'0.05')+');color:'+(on?'#f472b6':'#64748b')+';';b.onclick=function(){st.style=s[0];document.querySelectorAll('[data-s]').forEach(function(x){x.style.borderColor='rgba(236,72,153,0.25)';x.style.background='rgba(236,72,153,0.05)';x.style.color='#64748b';});this.style.borderColor='rgba(236,72,153,0.8)';this.style.background='rgba(236,72,153,0.2)';this.style.color='#f472b6';};sr.appendChild(b);});
  body.appendChild(sr);

  var btn=document.createElement('button');btn.innerHTML=t('btn');btn.style='width:100%;background:linear-gradient(135deg,#831843,#ec4899);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:4px;box-shadow:0 4px 15px rgba(236,72,153,0.3);';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=t('inject');ib.style='flex:1;background:linear-gradient(135deg,#064e3b,#10b981);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=t('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  
  var html='';
  btn.onclick=function(){['brand','subject','headline','content','cta','color'].forEach(function(k){var el=document.getElementById('nl-'+k);if(el)st[k]=el.value||st[k];});html=buildEmailHTML(st);ar.style.display='flex';res.innerHTML='<div style="background:rgba(236,72,153,0.08);border:1px solid rgba(236,72,153,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#f472b6;">✅ Email HTML ready for Mailchimp/SendGrid!</div>';if(window.showToast)window.showToast('📬 Newsletter generated!');};
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 HTML Copied!');});};
}
document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='newsletter'){window.activeTab='newsletter';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b=document.getElementById('tab-newsletter');if(b)b.classList.add('active');render();return;}if(typeof oRT==='function')oRT(tab);};
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-newsletter');if(el)el.textContent=t('tab');if(window.activeTab==='newsletter')render();};
});
})();
