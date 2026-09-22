/**
 * 🗺️ User Journey Mapper — EN/FR
 */
(function(){
'use strict';
var TX={
  en:{tab:'Journey Map',title:'🗺️ User Journey Mapper',sub:'Visual representation of the user experience',
      s1:'Stage 1',s1P:'e.g. Discovery',a1:'Action 1',a1P:'e.g. Sees Facebook Ad',
      s2:'Stage 2',s2P:'e.g. Consideration',a2:'Action 2',a2P:'e.g. Visits landing page',
      s3:'Stage 3',s3P:'e.g. Conversion',a3:'Action 3',a3P:'e.g. Signs up for free trial',
      color:'Accent Color',btn:'🗺️ Generate Journey Map',inject:'💉 Inject',copy:'📋 Copy'},
  fr:{tab:'Journey Map',title:'🗺️ Carte Parcours Utilisateur',sub:'Représentation visuelle de l\'expérience utilisateur',
      s1:'Étape 1',s1P:'ex. Découverte',a1:'Action 1',a1P:'ex. Voit une pub Facebook',
      s2:'Étape 2',s2P:'ex. Considération',a2:'Action 2',a2P:'ex. Visite la landing page',
      s3:'Étape 3',s3P:'ex. Conversion',a3:'Action 3',a3P:'ex. S\'inscrit à l\'essai gratuit',
      color:'Couleur Accent',btn:'🗺️ Générer Carte',inject:'💉 Injecter',copy:'📋 Copier'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var st={s1:'Discovery',a1:'Sees ad on social media',s2:'Consideration',a2:'Reads reviews on website',s3:'Decision',a3:'Completes purchase checkout',color:'#f59e0b'};

function buildJourneyHTML(d){
  var steps=[{s:d.s1,a:d.a1},{s:d.s2,a:d.a2},{s:d.s3,a:d.a3}];
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>User Journey Map</title>'+
  '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">'+
  '<style>*{margin:0;padding:0;box-sizing:border-box;font-family:Inter,sans-serif;}'+
  'body{background:#050810;color:#e2e8f0;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:20px;}'+
  '.jw{max-width:900px;width:100%;}'+
  'h2{font-size:28px;font-weight:800;color:#fff;margin-bottom:40px;text-align:center;}'+
  '.j-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:30px;position:relative;}'+
  '.j-line{position:absolute;top:20px;left:50px;right:50px;height:2px;background:rgba(255,255,255,0.1);z-index:0;}'+
  '@media(max-width:768px){.j-line{display:none;}}'+
  '.j-step{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;text-align:center;animation:fadeInUp 0.6s ease forwards;opacity:0;transform:translateY(20px);}'+
  '.j-step:nth-child(2){animation-delay:0.2s;}'+
  '.j-step:nth-child(3){animation-delay:0.4s;}'+
  '@keyframes fadeInUp{to{opacity:1;transform:translateY(0);}}'+
  '.j-dot{width:40px;height:40px;border-radius:50%;background:#050810;border:3px solid '+d.color+';display:flex;justify-content:center;align-items:center;font-weight:800;color:'+d.color+';margin-bottom:20px;box-shadow:0 0 15px '+d.color+'44;transition:0.3s;}'+
  '.j-step:hover .j-dot{background:'+d.color+';color:#fff;box-shadow:0 0 25px '+d.color+'88;transform:scale(1.1);}'+
  '.j-title{font-size:18px;font-weight:700;color:#fff;margin-bottom:10px;}'+
  '.j-card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);padding:20px;border-radius:12px;width:100%;transition:0.3s;}'+
  '.j-step:hover .j-card{border-color:'+d.color+'88;background:rgba(255,255,255,0.05);transform:translateY(-5px);}'+
  '.j-act{font-size:14px;color:#cbd5e1;line-height:1.5;}</style></head><body>'+
  '<div class="jw"><h2>User Journey Map</h2><div class="j-grid"><div class="j-line"></div>'+
  steps.map(function(s,i){
    return '<div class="j-step"><div class="j-dot">'+(i+1)+'</div><div class="j-title">'+s.s+'</div><div class="j-card"><div class="j-act">'+s.a+'</div></div></div>';
  }).join('')+
  '</div></div></body></html>';
}

function render(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(245,158,11,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(245,158,11,0.1),rgba(251,191,36,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#fbbf24;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  function fi(k,lbl,ph,area){var d=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;var i=area?document.createElement('textarea'):document.createElement('input');i.id='jm-'+k;i.placeholder=ph;if(area){i.rows=2;i.style='resize:none;';}i.value=st[k]||'';i.style=(i.style.cssText||'')+'width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(245,158,11,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){st[k]=this.value;};d.appendChild(l);d.appendChild(i);return d;}
  
  var cr1=document.createElement('div');cr1.style='display:grid;grid-template-columns:1fr 2fr;gap:8px;';
  cr1.appendChild(fi('s1',t('s1'),t('s1P')));cr1.appendChild(fi('a1',t('a1'),t('a1P')));body.appendChild(cr1);
  var cr2=document.createElement('div');cr2.style='display:grid;grid-template-columns:1fr 2fr;gap:8px;';
  cr2.appendChild(fi('s2',t('s2'),t('s2P')));cr2.appendChild(fi('a2',t('a2'),t('a2P')));body.appendChild(cr2);
  var cr3=document.createElement('div');cr3.style='display:grid;grid-template-columns:1fr 2fr;gap:8px;';
  cr3.appendChild(fi('s3',t('s3'),t('s3P')));cr3.appendChild(fi('a3',t('a3'),t('a3P')));body.appendChild(cr3);

  var cx=document.createElement('div');cx.style='display:flex;align-items:center;gap:8px;';
  var cl=document.createElement('div');cl.style='font-size:9px;color:#94a3b8;font-weight:700;flex:1;';cl.textContent=t('color');
  var ci=document.createElement('input');ci.type='color';ci.id='jm-color';ci.value=st.color;ci.style='width:44px;height:30px;background:#0d1117;border:1px solid rgba(245,158,11,0.25);border-radius:6px;cursor:pointer;padding:2px;';ci.oninput=function(){st.color=this.value;};
  cx.appendChild(cl);cx.appendChild(ci);body.appendChild(cx);

  var btn=document.createElement('button');btn.innerHTML=t('btn');btn.style='width:100%;background:linear-gradient(135deg,#b45309,#f59e0b);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:4px;box-shadow:0 4px 15px rgba(245,158,11,0.3);';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=t('inject');ib.style='flex:1;background:linear-gradient(135deg,#064e3b,#10b981);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=t('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  
  var html='';
  btn.onclick=function(){['s1','a1','s2','a2','s3','a3','color'].forEach(function(k){var el=document.getElementById('jm-'+k);if(el)st[k]=el.value||st[k];});html=buildJourneyHTML(st);ar.style.display='flex';res.innerHTML='<div style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#fbbf24;">✅ Journey Map generated!</div>';if(window.showToast)window.showToast('🗺️ Map generated!');};
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 Copied!');});};
}
document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='journey'){window.activeTab='journey';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b=document.getElementById('tab-journey');if(b)b.classList.add('active');render();return;}if(typeof oRT==='function')oRT(tab);};
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-journey');if(el)el.textContent=t('tab');if(window.activeTab==='journey')render();};
});
})();
