/**
 * AI Code Review v1.0 — EN/FR
 * Analyzes code like a senior dev: bugs, performance, accessibility, best practices
 */
(function(){
'use strict';
var TX={
  en:{tab:'Code Review',title:'🤖 AI Code Review',sub:'Senior dev feedback on your code',
      btnReview:'🔍 Start Review',reviewing:'⏳ Analyzing...',noCode:'Write some code first.',
      issues:'Issues Found:',score:'Quality Score',pass:'✅ Passed:',tip:'Review Tip:',
      categories:{bugs:'🐛 Bugs & Errors',perf:'⚡ Performance',a11y:'♿ Accessibility',
                  security:'🔒 Security',style:'🎨 Code Style',seo:'🔍 SEO'},
      severity:{critical:'CRITICAL',warning:'WARNING',info:'INFO'},
      btnFix:'Quick Fix',fixed:'✅ Fix applied!',noIssues:'🎉 No issues found in this category!'},
  fr:{tab:'Code Review',title:'🤖 AI Code Review',sub:'Feedback de dev senior sur votre code',
      btnReview:'🔍 Lancer la Review',reviewing:'⏳ Analyse en cours...',noCode:'Écrivez du code d\'abord.',
      issues:'Problèmes Trouvés :',score:'Score Qualité',pass:'✅ Validé :',tip:'Conseil Review :',
      categories:{bugs:'🐛 Bugs & Erreurs',perf:'⚡ Performance',a11y:'♿ Accessibilité',
                  security:'🔒 Sécurité',style:'🎨 Style de Code',seo:'🔍 SEO'},
      severity:{critical:'CRITIQUE',warning:'AVERTISSEMENT',info:'INFO'},
      btnFix:'Correction Rapide',fixed:'✅ Correction appliquée !',noIssues:'🎉 Aucun problème dans cette catégorie !'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}
function tc(k){return((TX[gl()]||TX.en).categories||TX.en.categories)[k]||k;}
function ts(k){return((TX[gl()]||TX.en).severity||TX.en.severity)[k]||k;}

var RULES=[
  // Bugs
  {cat:'bugs',sev:'critical',msg:function(l){return'Missing semicolons detected (line ~'+l+')';},frmsg:function(l){return'Point-virgule manquant (ligne ~'+l+')';},
   detect:function(c){var m=c.match(/^(?!.*\/\/).*(?:var|let|const|return)[^;{}\n]+\n/m);return m?c.split('\n').indexOf(m[0].split('\n')[0])+1:null;},
   fix:null},
  {cat:'bugs',sev:'warning',msg:'console.log() calls left in production code',frmsg:'Appels console.log() laissés dans le code de production',
   detect:function(c){return c.includes('console.log(')?true:null;},
   fix:function(c){return c.replace(/\s*console\.log\([^)]*\);?\n?/g,'');}},
  {cat:'bugs',sev:'warning',msg:'innerHTML used — risk of XSS injection',frmsg:'innerHTML utilisé — risque d\'injection XSS',
   detect:function(c){return c.includes('.innerHTML=')?true:null;},fix:null},
  {cat:'bugs',sev:'info',msg:'var used — consider let/const for block scoping',frmsg:'var utilisé — préférez let/const pour la portée de bloc',
   detect:function(c){return/\bvar\s+/.test(c)?true:null;},
   fix:function(c){return c.replace(/\bvar\b/g,'let');}},
  // Performance
  {cat:'perf',sev:'warning',msg:'document.querySelector inside loop — cache the reference',frmsg:'document.querySelector dans une boucle — mettez en cache la référence',
   detect:function(c){return/for.*\n.*querySelector|querySelector.*\n.*for/.test(c)?true:null;},fix:null},
  {cat:'perf',sev:'info',msg:'No loading="lazy" on images — add for better performance',frmsg:'Pas de loading="lazy" sur les images — ajoutez pour de meilleures performances',
   detect:function(c){return /<img(?![^>]*loading)[^>]*>/i.test(c)?true:null;},
   fix:function(c){return c.replace(/<img(?![^>]*loading)([^>]*)>/gi,'<img loading="lazy"$1>');}},
  {cat:'perf',sev:'info',msg:'Inline styles detected — move to CSS classes for performance',frmsg:'Styles inline détectés — déplacez vers des classes CSS',
   detect:function(c){return(c.match(/style="[^"]+"/g)||[]).length>3?true:null;},fix:null},
  // Accessibility
  {cat:'a11y',sev:'critical',msg:'Images missing alt attribute — required for screen readers',frmsg:'Images sans attribut alt — requis pour les lecteurs d\'écran',
   detect:function(c){return/<img(?![^>]*alt)[^>]*>/i.test(c)?true:null;},
   fix:function(c){return c.replace(/<img(?![^>]*alt)([^>]*)>/gi,'<img alt="Image"$1>');}},
  {cat:'a11y',sev:'warning',msg:'Buttons without type attribute — use type="button"',frmsg:'Boutons sans attribut type — utilisez type="button"',
   detect:function(c){return/<button(?![^>]*type)[^>]*>/i.test(c)?true:null;},
   fix:function(c){return c.replace(/<button(?![^>]*type)([^>]*)>/gi,'<button type="button"$1>');}},
  {cat:'a11y',sev:'info',msg:'No lang attribute on <html> element',frmsg:'Pas d\'attribut lang sur l\'élément <html>',
   detect:function(c){return/<html(?![^>]*lang)[^>]*>/i.test(c)?true:null;},
   fix:function(c){return c.replace(/<html>/i,'<html lang="en">');}},
  // Security
  {cat:'security',sev:'critical',msg:'eval() detected — severe security risk, avoid always',frmsg:'eval() détecté — risque de sécurité grave, évitez toujours',
   detect:function(c){return/\beval\s*\(/.test(c)?true:null;},fix:null},
  {cat:'security',sev:'warning',msg:'Hardcoded API key or token detected in code',frmsg:'Clé API ou token codé en dur détecté dans le code',
   detect:function(c){return/api[_-]?key\s*[:=]\s*["'][a-zA-Z0-9]{10,}/i.test(c)?true:null;},fix:null},
  // Style
  {cat:'style',sev:'info',msg:'Inconsistent indentation detected (mix of tabs and spaces)',frmsg:'Indentation incohérente (mélange de tabulations et espaces)',
   detect:function(c){return(/^\t/m.test(c)&&/^  /m.test(c))?true:null;},fix:null},
  {cat:'style',sev:'info',msg:'Missing DOCTYPE declaration',frmsg:'Déclaration DOCTYPE manquante',
   detect:function(c){return c.includes('<html')&&!c.includes('<!DOCTYPE')?true:null;},
   fix:function(c){return'<!DOCTYPE html>\n'+c;}},
  // SEO
  {cat:'seo',sev:'warning',msg:'Missing <meta description> tag',frmsg:'Balise <meta description> manquante',
   detect:function(c){return c.includes('<head>')&&!c.includes('name="description"')?true:null;},
   fix:function(c){return c.replace('</head>','<meta name="description" content="Description of this page.">\n</head>');}},
  {cat:'seo',sev:'info',msg:'No <h1> tag found — required for SEO',frmsg:'Pas de balise <h1> trouvée — requise pour le SEO',
   detect:function(c){return/<body[^>]*>/.test(c)&&!/<h1[^>]*>/.test(c)?true:null;},fix:null},
  {cat:'seo',sev:'info',msg:'Missing <title> tag',frmsg:'Balise <title> manquante',
   detect:function(c){return c.includes('<head>')&&!c.includes('<title>')?true:null;},
   fix:function(c){return c.replace('</head>','<title>My App</title>\n</head>');}}
];

var TIPS=[
  'Use CSS custom properties (variables) for consistent theming across your app.',
  'Prefer fetch() with async/await for cleaner asynchronous code.',
  'Add keyboard navigation support for all interactive elements.',
  'Use semantic HTML elements like <nav>, <main>, <article> for better SEO.',
  'Implement error boundaries around async operations.'
];

var lastIssues=[];
var activeCategory='all';

function analyzeCode(code){
  var issues=[];
  RULES.forEach(function(rule){
    var hit=rule.detect(code);
    if(hit!==null&&hit!==false){
      issues.push({cat:rule.cat,sev:rule.sev,
        msg:gl()==='fr'&&rule.frmsg?rule.frmsg:(typeof rule.msg==='function'?rule.msg(hit):rule.msg),
        fix:rule.fix||null});
    }
  });
  return issues;
}

function calcScore(issues){
  var score=100;
  issues.forEach(function(i){score-=i.sev==='critical'?15:i.sev==='warning'?7:3;});
  return Math.max(0,score);
}

function scoreColor(s){return s>=80?'#10b981':s>=60?'#f59e0b':'#ef4444';}

function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(99,102,241,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(99,102,241,0.1),rgba(168,85,247,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#818cf8;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;';

  var reviewBtn=document.createElement('button');reviewBtn.innerHTML=t('btnReview');
  reviewBtn.style='width:100%;background:linear-gradient(135deg,#3730a3,#6366f1);color:#fff;border:none;padding:12px;border-radius:10px;font-weight:900;font-size:12px;cursor:pointer;box-shadow:0 4px 20px rgba(99,102,241,0.35);';
  reviewBtn.onmouseover=function(){this.style.transform='translateY(-1px)';};reviewBtn.onmouseout=function(){this.style.transform='';};
  reviewBtn.onclick=function(){
    var code=window.editor?window.editor.getValue():'';
    if(!code.trim()){if(window.showToast)window.showToast(t('noCode'));return;}
    reviewBtn.innerHTML=t('reviewing');reviewBtn.disabled=true;
    setTimeout(function(){
      lastIssues=analyzeCode(code);activeCategory='all';renderTab();
    },700);
  };
  body.appendChild(reviewBtn);

  if(lastIssues.length>0||lastIssues._ran){
    var code=window.editor?window.editor.getValue():'';
    var score=calcScore(lastIssues);
    var sc=scoreColor(score);

    // Score circle
    var scoreEl=document.createElement('div');
    scoreEl.style='display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:12px;';
    scoreEl.innerHTML='<div style="width:52px;height:52px;border-radius:50%;background:conic-gradient('+sc+' '+(score*3.6)+'deg,#1e293b 0deg);display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
      '<div style="width:40px;height:40px;border-radius:50%;background:#0c0f1a;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:900;color:'+sc+';">'+score+'</div></div>' +
      '<div><div style="font-size:12px;font-weight:700;color:'+sc+';">'+t('score')+': '+score+'/100</div>' +
      '<div style="font-size:10px;color:#64748b;margin-top:2px;">'+lastIssues.length+' '+t('issues')+'</div></div>';
    body.appendChild(scoreEl);

    // Category filter tabs
    var cats=['all','bugs','perf','a11y','security','style','seo'];
    var catRow=document.createElement('div');catRow.style='display:flex;flex-wrap:wrap;gap:4px;';
    cats.forEach(function(c){
      var cnt=c==='all'?lastIssues.length:lastIssues.filter(function(i){return i.cat===c;}).length;
      var isA=activeCategory===c;
      var btn=document.createElement('button');
      btn.textContent=(c==='all'?'All ('+cnt+')':(tc(c)||c)+(cnt?' ('+cnt+')':''));
      btn.style='font-size:8.5px;padding:4px 7px;border-radius:20px;cursor:pointer;font-weight:700;' +
        'border:1px solid '+(isA?'#6366f1':'rgba(255,255,255,0.08)')+';' +
        'background:'+(isA?'rgba(99,102,241,0.2)':'rgba(255,255,255,0.02)')+';' +
        'color:'+(isA?'#818cf8':'#64748b')+';';
      btn.onclick=function(){activeCategory=c;renderTab();};
      catRow.appendChild(btn);
    });
    body.appendChild(catRow);

    // Issues list
    var filtered=activeCategory==='all'?lastIssues:lastIssues.filter(function(i){return i.cat===activeCategory;});
    if(!filtered.length){
      var none=document.createElement('div');none.style='text-align:center;padding:16px;font-size:11px;color:#10b981;';none.textContent=t('noIssues');body.appendChild(none);
    } else {
      filtered.forEach(function(issue){
        var sevColor=issue.sev==='critical'?'#ef4444':issue.sev==='warning'?'#f59e0b':'#94a3b8';
        var card=document.createElement('div');
        card.style='background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-left:3px solid '+sevColor+';border-radius:8px;padding:9px 10px;';
        card.innerHTML='<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">' +
          '<span style="font-size:8px;font-weight:900;color:'+sevColor+';background:'+sevColor+'22;padding:2px 6px;border-radius:10px;">'+ts(issue.sev)+'</span>' +
          '<span style="font-size:9px;color:#64748b;">'+tc(issue.cat)+'</span></div>' +
          '<div style="font-size:10px;color:#e2e8f0;line-height:1.4;">'+issue.msg+'</div>';
        if(issue.fix){
          var fixBtn=document.createElement('button');fixBtn.innerHTML='🔧 '+t('btnFix');
          fixBtn.style='margin-top:6px;background:rgba(16,185,129,0.12);color:#34d399;border:1px solid rgba(16,185,129,0.3);padding:5px 10px;border-radius:6px;font-size:9px;font-weight:700;cursor:pointer;';
          fixBtn.onclick=(function(fix){return function(){
            if(!window.editor)return;
            var fixed=fix(window.editor.getValue());
            window.editor.setValue(fixed);if(window.runPreview)window.runPreview();
            if(window.showToast)window.showToast(t('fixed'));
            lastIssues=analyzeCode(fixed);renderTab();
          };})(issue.fix);
          card.appendChild(fixBtn);
        }
        body.appendChild(card);
      });
    }

    // Random tip
    var tipEl=document.createElement('div');tipEl.style='font-size:10px;color:#94a3b8;background:rgba(99,102,241,0.06);border:1px solid rgba(99,102,241,0.15);border-radius:8px;padding:8px 10px;line-height:1.5;';
    tipEl.textContent=t('tip')+' '+TIPS[Math.floor(Math.random()*TIPS.length)];
    body.appendChild(tipEl);
  }

  wrap.appendChild(body);parent.appendChild(wrap);
}
lastIssues._ran=false;

document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-codereview');if(el)el.textContent=t('tab');if(window.activeTab==='codereview')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='codereview'){window.activeTab='codereview';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-codereview');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
