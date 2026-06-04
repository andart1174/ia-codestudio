/**
 * UX Heatmap Predictor v1.0 — EN/FR
 * Paste HTML → AI predicts where users will click/look
 */
(function(){
'use strict';
var TX={
  en:{tab:'Heatmap',title:'👁️ UX Heatmap Predictor',sub:'Paste HTML → predict user attention & clicks',
      input:'Paste your HTML:',btnPred:'👁️ Predict Heatmap',btnCopy:'📋 Copy Report',copied:'Copied!',
      attention:'👁 Attention Zones:',clicks:'🖱 Predicted Clicks:',issues:'⚠️ UX Issues:',tips:'💡 Improvements:',
      ph:'<header>\n  <nav>\n    <a href="/">Home</a>\n    <button class="cta">Get Started</button>\n  </nav>\n</header>\n<main>\n  <h1>Welcome to our platform</h1>\n  <p>Description text here</p>\n  <form><input type="email"><button>Subscribe</button></form>\n</main>'},
  fr:{tab:'Heatmap',title:'👁️ Prédicteur de Heatmap UX',sub:'Collez HTML → prédisez l\'attention utilisateur',
      input:'Collez votre HTML :',btnPred:'👁️ Prédire Heatmap',btnCopy:'📋 Copier Rapport',copied:'Copié !',
      attention:'👁 Zones d\'Attention :',clicks:'🖱 Clics Prédits :',issues:'⚠️ Problèmes UX :',tips:'💡 Améliorations :',
      ph:'<header>\n  <nav>\n    <a href="/">Accueil</a>\n    <button class="cta">Commencer</button>\n  </nav>\n</header>\n<main>\n  <h1>Bienvenue sur notre plateforme</h1>\n  <p>Texte de description ici</p>\n</main>'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

// UX heuristics engine
function predictHeatmap(html){
  var h=html.toLowerCase();var lx=gl();
  var attention=[];var clicks=[];var issues=[];var tips=[];
  var score=100;

  // ATTENTION zones — based on F-pattern and visual hierarchy research
  var elems=[
    {pattern:/<h1[^>]*>([\s\S]*?)<\/h1>/gi,      heat:'🔴 HIGH',   zone:lx==='fr'?'Titre H1 — Zone de focus principal (100% attention)':'H1 Heading — Primary focus zone (100% attention)',score:0},
    {pattern:/<nav[^>]*>/i,                        heat:'🔴 HIGH',   zone:lx==='fr'?'Navigation — Scanné en premier (F-pattern)':'Navigation bar — Scanned first (F-pattern)',score:0},
    {pattern:/hero|banner|jumbotron/i,             heat:'🔴 HIGH',   zone:lx==='fr'?'Section Hero — 80% des utilisateurs regardent ici':'Hero section — 80% of users look here',score:0},
    {pattern:/<button[^>]*class="[^"]*cta|btn-primary|btn-main/i, heat:'🔴 HIGH', zone:lx==='fr'?'Bouton CTA principal — Zone de conversion critique':'Primary CTA button — Critical conversion zone',score:0},
    {pattern:/<img[^>]*>/i,                        heat:'🟠 MEDIUM', zone:lx==='fr'?'Images — Attirent l\'œil (30-50% attention)':'Images — Eye-catching (30-50% attention)',score:0},
    {pattern:/<h2[^>]*>/i,                         heat:'🟠 MEDIUM', zone:lx==='fr'?'Sous-titres H2 — Points d\'ancrage visuels':'H2 Subheadings — Visual anchor points',score:0},
    {pattern:/<form[^>]*>/i,                       heat:'🟡 MEDIUM', zone:lx==='fr'?'Formulaire — Zone d\'engagement (40% attention)':'Form — Engagement zone (40% attention)',score:0},
    {pattern:/<footer[^>]*>/i,                     heat:'🟢 LOW',    zone:lx==='fr'?'Footer — Seulement 10% des utilisateurs arrivent ici':'Footer — Only 10% of users scroll here',score:0},
    {pattern:/<aside[^>]*>/i,                      heat:'🟢 LOW',    zone:lx==='fr'?'Sidebar — Zone ignorée sur mobile':'Sidebar — Ignored on mobile',score:0}
  ];
  elems.forEach(function(e){if(e.pattern.test(html)){attention.push({heat:e.heat,zone:e.zone});}});
  if(!attention.length)attention.push({heat:'⚪ UNKNOWN',zone:lx==='fr'?'Structure non reconnue — ajoutez des balises sémantiques':'Unknown structure — add semantic HTML tags'});

  // CLICK predictions
  var clickEls=[
    {p:/<button/gi,      icon:'🔵', desc:lx==='fr'?'Boutons — 85% des clics se font ici':'Buttons — 85% of clicks happen here'},
    {p:/<a\s/gi,         icon:'🔵', desc:lx==='fr'?'Liens — Zones de navigation principale':'Links — Primary navigation zones'},
    {p:/<input/gi,       icon:'🟣', desc:lx==='fr'?'Champs de saisie — Clics intentionnels':'Input fields — Intentional clicks'},
    {p:/<img[^>]*alt/gi, icon:'⚫', desc:lx==='fr'?'Images cliquables (si liées)':'Clickable images (if linked)'},
    {p:/logo|brand/gi,   icon:'🔵', desc:lx==='fr'?'Logo — 20% cliquent pour revenir à l\'accueil':'Logo — 20% click to go home'}
  ];
  clickEls.forEach(function(c){
    var matches=html.match(c.p);
    if(matches)clicks.push(c.icon+' '+c.desc+' (×'+matches.length+')');
  });
  if(!clicks.length)clicks.push(lx==='fr'?'Aucun élément cliquable détecté':'No clickable elements detected');

  // UX ISSUES detection
  var btns=html.match(/<button[^>]*>/gi)||[];
  var imgs=html.match(/<img[^>]*>/gi)||[];
  var h1s=html.match(/<h1/gi)||[];
  var forms=html.match(/<form/gi)||[];
  var inputs=html.match(/<input/gi)||[];

  if(h1s.length===0){issues.push(lx==='fr'?'❌ Pas de H1 — les utilisateurs ne savent pas où regarder':'❌ No H1 — users don\'t know where to look');score-=15;tips.push(lx==='fr'?'Ajoutez un H1 clair et accrocheur au-dessus du fold':'Add a clear H1 headline above the fold');}
  if(h1s.length>1){issues.push(lx==='fr'?'⚠️ Plusieurs H1 — confusion de hiérarchie':'⚠️ Multiple H1 tags — hierarchy confusion');score-=10;tips.push(lx==='fr'?'Gardez un seul H1 par page':'Keep only one H1 per page');}
  if(btns.length===0){issues.push(lx==='fr'?'❌ Pas de boutons CTA — aucune action possible':'❌ No CTA buttons — no action possible');score-=20;tips.push(lx==='fr'?'Ajoutez au moins un bouton d\'appel à l\'action clair':'Add at least one clear call-to-action button');}
  if(btns.length>5){issues.push(lx==='fr'?'⚠️ Trop de boutons ('+btns.length+') — paradoxe du choix':'⚠️ Too many buttons ('+btns.length+') — choice paralysis');score-=10;tips.push(lx==='fr'?'Réduisez à 1-2 CTA principaux':'Reduce to 1-2 primary CTAs');}
  var noAlt=imgs.filter(function(i){return!/alt=/.test(i);});
  if(noAlt.length){issues.push(lx==='fr'?'⚠️ '+noAlt.length+' image(s) sans alt — accessibilité réduite':'⚠️ '+noAlt.length+' image(s) missing alt — accessibility issue');score-=5;tips.push(lx==='fr'?'Ajoutez alt="" à toutes les images':'Add alt="" to all images');}
  if(forms.length&&!/<label/i.test(html)){issues.push(lx==='fr'?'⚠️ Formulaire sans labels — mauvaise UX':'⚠️ Form without labels — poor UX');score-=10;tips.push(lx==='fr'?'Ajoutez des <label> pour chaque champ':'Add <label> elements to each field');}
  if(!/<meta[^>]*viewport/i.test(html)){issues.push(lx==='fr'?'❌ Pas de meta viewport — mauvais sur mobile':'❌ No viewport meta — broken on mobile');score-=15;tips.push(lx==='fr'?'Ajoutez <meta name="viewport" content="width=device-width">':'Add responsive viewport meta tag');}
  if(!/<nav/i.test(html)&&html.length>500){issues.push(lx==='fr'?'⚠️ Pas de navigation — utilisateurs perdus':'⚠️ No navigation element found');score-=5;tips.push(lx==='fr'?'Ajoutez une balise <nav> pour la navigation principale':'Add a <nav> element for main navigation');}

  if(!issues.length)issues.push(lx==='fr'?'✅ Aucun problème UX critique détecté !':'✅ No critical UX issues detected!');
  if(!tips.length)tips.push(lx==='fr'?'Continuez à tester avec de vrais utilisateurs':'Keep testing with real users');

  score=Math.max(0,Math.min(100,score));
  return{attention:attention,clicks:clicks,issues:issues,tips:tips,score:score};
}

function getGrade(s){return s>=85?{g:'A+',c:'#22c55e'}:s>=70?{g:'B',c:'#84cc16'}:s>=55?{g:'C',c:'#f59e0b'}:s>=40?{g:'D',c:'#f97316'}:{g:'F',c:'#ef4444'};}

var lastHTML='';
function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(239,68,68,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(239,68,68,0.1),rgba(251,146,60,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#f87171;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:7px;';

  var lbl=document.createElement('div');lbl.style='font-size:10px;color:#64748b;font-weight:600;';lbl.textContent=t('input');body.appendChild(lbl);
  var ta=document.createElement('textarea');ta.value=lastHTML;ta.placeholder=t('ph');ta.rows=6;
  ta.style='background:#0d1117;color:#c9d1d9;border:1px solid rgba(239,68,68,0.15);border-radius:8px;padding:9px;font-size:8.5px;font-family:"JetBrains Mono",monospace;outline:none;resize:vertical;width:100%;box-sizing:border-box;line-height:1.4;';
  ta.oninput=function(){lastHTML=this.value;};body.appendChild(ta);

  if(window.editor){var gb=document.createElement('button');gb.innerHTML='📥 '+(gl()==='fr'?'Depuis l\'Éditeur':'From Editor');gb.style='width:100%;background:rgba(99,102,241,0.08);color:#818cf8;border:1px solid rgba(99,102,241,0.2);padding:6px;border-radius:7px;font-size:9px;cursor:pointer;';gb.onclick=function(){ta.value=window.editor.getValue().substring(0,3000);lastHTML=ta.value;};body.appendChild(gb);}

  var predBtn=document.createElement('button');predBtn.innerHTML=t('btnPred');
  predBtn.style='width:100%;background:linear-gradient(135deg,#7f1d1d,#ef4444);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(239,68,68,0.3);';
  body.appendChild(predBtn);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);parent.appendChild(wrap);

  predBtn.onclick=function(){
    var html=ta.value.trim();if(!html)return;
    lastHTML=html;res.innerHTML='';
    var r=predictHeatmap(html);var grade=getGrade(r.score);

    // Score card
    var sc=document.createElement('div');sc.style='display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:10px;';
    sc.innerHTML='<div style="font-size:36px;font-weight:900;color:'+grade.c+';">'+grade.g+'</div><div style="flex:1;"><div style="height:6px;background:#1e293b;border-radius:3px;overflow:hidden;margin-bottom:4px;"><div style="height:100%;width:'+r.score+'%;background:'+grade.c+';border-radius:3px;"></div></div><div style="font-size:10px;color:#94a3b8;">UX Score: '+r.score+'/100</div></div>';
    res.appendChild(sc);

    function mkSection(title,items,color){
      var card=document.createElement('div');card.style='background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:8px;padding:9px;';
      var h=document.createElement('div');h.style='font-size:10px;font-weight:700;color:'+color+';margin-bottom:6px;';h.textContent=title;card.appendChild(h);
      items.forEach(function(item){
        var p=document.createElement('div');p.style='font-size:9px;color:#94a3b8;padding:2px 0;line-height:1.5;';
        p.textContent=(typeof item==='object'?item.heat+' '+item.zone:item);card.appendChild(p);
      });
      return card;
    }
    res.appendChild(mkSection(t('attention'),r.attention,'#f87171'));
    res.appendChild(mkSection(t('clicks'),r.clicks.map(function(c){return c;}),'#60a5fa'));
    res.appendChild(mkSection(t('issues'),r.issues,'#fbbf24'));
    res.appendChild(mkSection(t('tips'),r.tips,'#4ade80'));

    var report='UX Heatmap Report\nScore: '+r.score+'/100 ('+grade.g+')\n\nAttention:\n'+r.attention.map(function(a){return'• '+a.heat+' '+a.zone;}).join('\n')+'\n\nClicks:\n'+r.clicks.join('\n')+'\n\nIssues:\n'+r.issues.join('\n')+'\n\nTips:\n'+r.tips.join('\n');
    var cp=document.createElement('button');cp.innerHTML=t('btnCopy');cp.style='width:100%;background:rgba(239,68,68,0.1);color:#f87171;border:1px solid rgba(239,68,68,0.2);padding:8px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
    cp.onclick=function(){navigator.clipboard.writeText(report).then(function(){if(window.showToast)window.showToast(t('copied'));});};res.appendChild(cp);
  };
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-heatmap');if(el)el.textContent=t('tab');if(window.activeTab==='heatmap')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='heatmap'){window.activeTab='heatmap';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-heatmap');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
