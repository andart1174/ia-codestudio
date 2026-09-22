/**
 * Landing Page Score v1.0 — EN/FR
 * Paste HTML → analyze CTA, hierarchy, conversion score
 */
(function(){
'use strict';
var TX={
  en:{tab:'LP Score',title:'🎯 Landing Page Score',sub:'Paste HTML → get conversion analysis',
      paste:'Paste your landing page HTML:',btnAnalyze:'⚡ Analyze Page',btnCopy:'📋 Copy Report',
      copied:'📋 Copied!',score:'Conversion Score:',
      categories:{cta:'CTA Clarity',hierarchy:'Visual Hierarchy',trust:'Trust Signals',performance:'Performance Hints',copy:'Copywriting',mobile:'Mobile Ready',seo:'SEO Basics'},
      tips:'💡 Recommendations:',placeholder:'<!DOCTYPE html>\n<html>\n<head><title>My Landing Page</title></head>\n<body>\n  <h1>Main Headline</h1>\n  <button>Get Started Free</button>\n</body>\n</html>'},
  fr:{tab:'LP Score',title:'🎯 Score Landing Page',sub:'Collez HTML → analyse de conversion',
      paste:'Collez le HTML de votre landing page :',btnAnalyze:'⚡ Analyser la Page',btnCopy:'📋 Copier Rapport',
      copied:'📋 Copié !',score:'Score de Conversion :',
      categories:{cta:'Clarté CTA',hierarchy:'Hiérarchie Visuelle',trust:'Signaux de Confiance',performance:'Hints Performance',copy:'Copywriting',mobile:'Mobile Ready',seo:'SEO Basics'},
      tips:'💡 Recommandations :',placeholder:'<!DOCTYPE html>\n<html>\n<head><title>Ma Landing Page</title></head>\n<body>\n  <h1>Titre Principal</h1>\n  <button>Commencer Gratuitement</button>\n</body>\n</html>'}
};
function gl(){return window.lang||'en';}
function t(k){var v=(TX[gl()]||TX.en)[k];return v||k;}
function tc(k){return((TX[gl()]||TX.en).categories||TX.en.categories)[k]||k;}

function analyzeHTML(html){
  var h=html.toLowerCase();
  var results=[];var totalScore=0;var maxScore=0;var tips=[];

  function check(category,checks){
    var catScore=0;var catMax=0;var catDetails=[];
    checks.forEach(function(c){
      catMax+=c.points;maxScore+=c.points;
      var found=c.test(h,html);
      if(found){catScore+=c.points;totalScore+=c.points;catDetails.push({text:c.label,ok:true});}
      else{catDetails.push({text:c.label,ok:false});if(c.tip)tips.push(c.tip);}
    });
    results.push({category:category,score:catScore,max:catMax,details:catDetails});
  }

  // CTA Clarity (20pts)
  check(tc('cta'),[
    {points:5,label:'Has a <button> or <a> element',test:function(h){return/<button|<a\s/.test(h);},tip:'Add a clear call-to-action button'},
    {points:5,label:'CTA contains action words',test:function(h){return/(get started|sign up|try free|buy now|subscribe|download|join|start|s\'inscrire|commencer|acheter|essayer|télécharger)/i.test(h);},tip:'Use action verbs on your CTA: "Get Started", "Try Free", "Download Now"'},
    {points:5,label:'Multiple CTAs present',test:function(h){var m=h.match(/<button/g);return m&&m.length>1;},tip:'Add at least 2 CTAs (top and bottom of page)'},
    {points:5,label:'CTA has contrast styling',test:function(h,raw){return/(background|background-color|btn|button)/i.test(raw)&&/color/i.test(raw);},tip:'Style your CTA with high contrast color to make it stand out'}
  ]);

  // Visual Hierarchy (20pts)
  check(tc('hierarchy'),[
    {points:5,label:'Has H1 heading',test:function(h){return/<h1/.test(h);},tip:'Add an H1 tag with your main value proposition'},
    {points:5,label:'Has H2 subheadings',test:function(h){return/<h2/.test(h);},tip:'Use H2 tags to organize sections and guide the reader'},
    {points:5,label:'Has hero section / banner',test:function(h){return/(hero|banner|header|jumbotron)/i.test(h);},tip:'Add a hero section with headline + CTA above the fold'},
    {points:5,label:'Has feature/benefit sections',test:function(h){return/(features|benefits|why|how it works|section|grid|card)/i.test(h);},tip:'Add a features or benefits section with icons/cards'}
  ]);

  // Trust Signals (20pts)
  check(tc('trust'),[
    {points:5,label:'Has testimonials / reviews',test:function(h){return/(testimonial|review|quote|said|stars|rating|témoignage|avis)/i.test(h);},tip:'Add customer testimonials or reviews to build trust'},
    {points:5,label:'Has social proof (numbers)',test:function(h){return/(\d+[\s,]*(?:users|customers|clients|downloads|members|entreprises)|trusted by)/i.test(h);},tip:'Show social proof: "10,000+ happy customers"'},
    {points:5,label:'Has guarantee / security badge',test:function(h){return/(guarantee|secure|ssl|privacy|money.back|garantie|sécurisé|remboursement)/i.test(h);},tip:'Add a money-back guarantee or security badge'},
    {points:5,label:'Has FAQ section',test:function(h){return/(faq|frequently asked|questions?)/i.test(h);},tip:'Add an FAQ section to address common objections'}
  ]);

  // Performance (15pts)
  check(tc('performance'),[
    {points:5,label:'Images have alt attributes',test:function(h){var imgs=h.match(/<img[^>]+>/g)||[];var alts=imgs.filter(function(i){return/alt=/i.test(i);});return imgs.length===0||alts.length===imgs.length;},tip:'Add alt="" attributes to all images for accessibility and SEO'},
    {points:5,label:'Has viewport meta tag',test:function(h){return/<meta[^>]+viewport/i.test(h);},tip:'Add <meta name="viewport" content="width=device-width, initial-scale=1">'},
    {points:5,label:'Has lazy loading on images',test:function(h){return/loading="lazy"/i.test(h);},tip:'Add loading="lazy" to images below the fold for faster page load'}
  ]);

  // Copywriting (15pts)
  check(tc('copy'),[
    {points:5,label:'Headline is benefit-focused',test:function(h,raw){var h1=raw.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);if(!h1)return false;var text=h1[1].replace(/<[^>]+>/g,'');return/(you|your|get|save|boost|grow|achieve|increase|reduce|free|instant|votre|vous|obtenez|économisez)/i.test(text);},tip:'Make your H1 benefit-focused: "Save 10 Hours Per Week" not "Our Software"'},
    {points:5,label:'Has value proposition',test:function(h){return/(value|benefit|save|grow|boost|simplify|automate|transform|valeur|bénéfice|économiser)/i.test(h);},tip:'Clearly state your value proposition in the first paragraph'},
    {points:5,label:'Has urgency / scarcity',test:function(h){return/(limited|today only|expires|hurry|now|last chance|spots left|limité|aujourd\'hui seulement|expire)/i.test(h);},tip:'Add urgency: "Limited spots available" or "Offer expires tonight"'}
  ]);

  // Mobile (5pts)
  check(tc('mobile'),[
    {points:3,label:'Has responsive meta viewport',test:function(h){return/width=device-width/i.test(h);},tip:'Add responsive meta viewport tag'},
    {points:2,label:'Has mobile CSS (media queries)',test:function(h){return/@media|max-width|min-width/i.test(h);},tip:'Add CSS media queries for mobile responsiveness'}
  ]);

  // SEO (5pts)
  check(tc('seo'),[
    {points:2,label:'Has title tag',test:function(h){return/<title>/i.test(h);},tip:'Add a descriptive <title> tag'},
    {points:2,label:'Has meta description',test:function(h){return/<meta[^>]+description/i.test(h);},tip:'Add <meta name="description" content="..."> for SEO'},
    {points:1,label:'Has OG tags',test:function(h){return/og:title|og:description/i.test(h);},tip:'Add Open Graph tags for better social media sharing'}
  ]);

  var pct=maxScore>0?Math.round(totalScore/maxScore*100):0;
  return{score:pct,total:totalScore,max:maxScore,results:results,tips:tips};
}

function getGrade(s){return s>=85?{g:'A+',c:'#22c55e'}:s>=70?{g:'B',c:'#84cc16'}:s>=55?{g:'C',c:'#f59e0b'}:s>=40?{g:'D',c:'#f97316'}:{g:'F',c:'#ef4444'};}

var lastHtml='';

function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(236,72,153,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(236,72,153,0.1),rgba(168,85,247,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#f472b6;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:7px;';

  var taLabel=document.createElement('div');taLabel.style='font-size:10px;color:#64748b;font-weight:600;';taLabel.textContent=t('paste');body.appendChild(taLabel);
  var ta=document.createElement('textarea');ta.value=lastHtml;ta.placeholder=t('placeholder');ta.rows=6;
  ta.style='background:#0d1117;color:#c9d1d9;border:1px solid rgba(236,72,153,0.15);border-radius:8px;padding:9px;font-size:8.5px;font-family:"JetBrains Mono",monospace;outline:none;resize:vertical;width:100%;box-sizing:border-box;line-height:1.4;';
  ta.oninput=function(){lastHtml=this.value;};body.appendChild(ta);

  var analyzeBtn=document.createElement('button');analyzeBtn.innerHTML=t('btnAnalyze');
  analyzeBtn.style='width:100%;background:linear-gradient(135deg,#831843,#ec4899);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(236,72,153,0.3);';
  body.appendChild(analyzeBtn);

  var resultsDiv=document.createElement('div');resultsDiv.style='display:flex;flex-direction:column;gap:6px;';body.appendChild(resultsDiv);
  wrap.appendChild(body);parent.appendChild(wrap);

  analyzeBtn.onclick=function(){
    var html=ta.value.trim();if(!html)return;
    lastHtml=html;resultsDiv.innerHTML='';
    var r=analyzeHTML(html);var grade=getGrade(r.score);

    // Score header
    var sb=document.createElement('div');sb.style='display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:12px;';
    var gd=document.createElement('div');gd.style='font-size:40px;font-weight:900;color:'+grade.c+';line-height:1;';gd.textContent=grade.g;
    var si=document.createElement('div');si.style='flex:1;';
    var bb=document.createElement('div');bb.style='height:7px;background:#1e293b;border-radius:4px;overflow:hidden;margin-bottom:4px;';
    var bf=document.createElement('div');bf.style='height:100%;width:'+r.score+'%;background:'+grade.c+';border-radius:4px;transition:width 0.5s;';bb.appendChild(bf);si.appendChild(bb);
    var st=document.createElement('div');st.style='font-size:11px;color:#94a3b8;';st.textContent=t('score')+' '+r.score+'%';si.appendChild(st);
    sb.appendChild(gd);sb.appendChild(si);resultsDiv.appendChild(sb);

    // Category breakdown
    r.results.forEach(function(cat){
      var pct2=cat.max>0?Math.round(cat.score/cat.max*100):0;
      var card=document.createElement('div');card.style='background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:8px;padding:8px 10px;';
      var topRow=document.createElement('div');topRow.style='display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;';
      var catName=document.createElement('span');catName.style='font-size:10px;font-weight:700;color:#e2e8f0;';catName.textContent=cat.category;
      var catPts=document.createElement('span');catPts.style='font-size:9px;color:'+grade.c+';font-weight:700;';catPts.textContent=cat.score+'/'+cat.max+' pts';
      topRow.appendChild(catName);topRow.appendChild(catPts);
      var catBar=document.createElement('div');catBar.style='height:4px;background:#1e293b;border-radius:2px;overflow:hidden;margin-bottom:5px;';
      var catFill=document.createElement('div');catFill.style='height:100%;width:'+pct2+'%;background:'+(pct2>=70?'#22c55e':pct2>=40?'#f59e0b':'#ef4444')+';border-radius:2px;';catBar.appendChild(catFill);
      var detailsRow=document.createElement('div');detailsRow.style='display:flex;flex-wrap:wrap;gap:3px;';
      cat.details.forEach(function(d){
        var chip=document.createElement('span');chip.style='font-size:8px;padding:2px 6px;border-radius:3px;background:'+(d.ok?'rgba(34,197,94,0.12)':'rgba(239,68,68,0.08)')+';color:'+(d.ok?'#4ade80':'#f87171')+';';
        chip.textContent=(d.ok?'✅ ':'❌ ')+d.text;detailsRow.appendChild(chip);
      });
      card.appendChild(topRow);card.appendChild(catBar);card.appendChild(detailsRow);resultsDiv.appendChild(card);
    });

    // Tips
    if(r.tips.length){
      var tipsCard=document.createElement('div');tipsCard.style='background:rgba(236,72,153,0.06);border:1px solid rgba(236,72,153,0.15);border-radius:8px;padding:10px;';
      var tipsLabel=document.createElement('div');tipsLabel.style='font-size:10px;font-weight:700;color:#f472b6;margin-bottom:6px;';tipsLabel.textContent=t('tips');tipsCard.appendChild(tipsLabel);
      r.tips.slice(0,5).forEach(function(tip){
        var p=document.createElement('div');p.style='font-size:9px;color:#94a3b8;padding:2px 0;';p.textContent='→ '+tip;tipsCard.appendChild(p);
      });
      resultsDiv.appendChild(tipsCard);
    }

    // Copy report
    var cpBtn=document.createElement('button');cpBtn.innerHTML=t('btnCopy');cpBtn.style='width:100%;background:rgba(236,72,153,0.1);color:#f472b6;border:1px solid rgba(236,72,153,0.2);padding:8px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
    cpBtn.onclick=function(){
      var rep='Landing Page Score: '+r.score+'% ('+grade.g+')\n\n';
      r.results.forEach(function(cat){rep+=cat.category+': '+cat.score+'/'+cat.max+'pts\n';cat.details.forEach(function(d){rep+='  '+(d.ok?'✅':'❌')+' '+d.text+'\n';});});
      rep+='\nRecommendations:\n'+r.tips.map(function(t){return'→ '+t;}).join('\n');
      navigator.clipboard.writeText(rep).then(function(){if(window.showToast)window.showToast(t('copied'));});
    };
    resultsDiv.appendChild(cpBtn);
  };
}

document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-lpscore');if(el)el.textContent=t('tab');if(window.activeTab==='lpscore')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='lpscore'){window.activeTab='lpscore';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-lpscore');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
