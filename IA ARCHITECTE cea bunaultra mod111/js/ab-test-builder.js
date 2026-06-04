/**
 * A/B Test Builder v1.0 — EN/FR
 */
(function(){
'use strict';
var TX={
  en:{tab:'A/B Test',title:'🎯 A/B Test Builder',sub:'Create 2 variants & generate test code',
      varA:'Variant A (Control):',varB:'Variant B (Test):',
      btnGen:'⚡ Generate A/B Code',btnCopy:'📋 Copy',btnInject:'💉 Inject into Editor',
      btnPreviewA:'👁 Preview A',btnPreviewB:'👁 Preview B',
      testName:'Test Name:',testNamePh:'button-color-test',split:'Traffic Split:',
      result:'A/B Test Code Generated:',tracking:'Tracking Events:',
      copied:'📋 Copied!',injected:'✅ A/B code injected!',
      tip:'Write two HTML variants. The code randomly shows one to each user and tracks which converts better.',
      presets:'Quick Presets:',
      presetNames:{cta:'CTA Button Color',hero:'Hero Headline',price:'Pricing Display',nav:'Navigation Layout'}},
  fr:{tab:'A/B Test',title:'🎯 Constructeur A/B Test',sub:'Créez 2 variantes & générez le code de test',
      varA:'Variante A (Contrôle) :',varB:'Variante B (Test) :',
      btnGen:'⚡ Générer le Code A/B',btnCopy:'📋 Copier',btnInject:'💉 Injecter',
      btnPreviewA:'👁 Aperçu A',btnPreviewB:'👁 Aperçu B',
      testName:'Nom du test :',testNamePh:'test-couleur-bouton',split:'Répartition trafic :',
      result:'Code A/B Test Généré :',tracking:'Événements de suivi :',
      copied:'📋 Copié !',injected:'✅ Code A/B injecté !',
      tip:'Écrivez deux variantes HTML. Le code affiche aléatoirement l\'une à chaque utilisateur et suit les conversions.',
      presets:'Présélections rapides :',
      presetNames:{cta:'Couleur Bouton CTA',hero:'Titre Hero',price:'Affichage Prix',nav:'Layout Navigation'}}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}
function tn(k){return((TX[gl()]||TX.en).presetNames||TX.en.presetNames)[k]||k;}

var PRESETS={
  cta:{a:'<button style="background:#3b82f6;color:#fff;padding:14px 32px;border:none;border-radius:8px;font-size:16px;font-weight:700;cursor:pointer;">Get Started →</button>',
       b:'<button style="background:#10b981;color:#fff;padding:14px 32px;border:none;border-radius:50px;font-size:16px;font-weight:700;cursor:pointer;">🚀 Start Free Today</button>'},
  hero:{a:'<h1 style="font-size:48px;font-weight:900;color:#1e293b;">Build faster with our platform</h1>',
        b:'<h1 style="font-size:48px;font-weight:900;background:linear-gradient(135deg,#3b82f6,#10b981);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">10x your productivity today</h1>'},
  price:{a:'<div style="font-size:32px;font-weight:900;color:#1e293b;">$29<span style="font-size:16px;">/month</span></div>',
         b:'<div style="font-size:16px;text-decoration:line-through;color:#94a3b8;">$49/month</div><div style="font-size:32px;font-weight:900;color:#ef4444;">$29<span style="font-size:16px;">/month</span> 🔥</div>'},
  nav:{a:'<nav style="display:flex;gap:20px;padding:16px 40px;background:#fff;border-bottom:1px solid #e2e8f0;"><a href="#">Home</a><a href="#">About</a><a href="#">Pricing</a><a href="#">Contact</a></nav>',
       b:'<nav style="display:flex;gap:8px;padding:12px 20px;background:#0f172a;"><a href="#" style="color:#fff;background:rgba(255,255,255,0.1);padding:8px 16px;border-radius:20px;text-decoration:none;">Home</a><a href="#" style="color:#94a3b8;padding:8px 16px;text-decoration:none;">About</a></nav>'}
};

var lastCode='';

function genABCode(name,varA,varB,split){
  var s=Math.min(100,Math.max(0,parseInt(split)||50));
  return '<!-- A/B Test: '+name+' -->\n' +
    '<div id="ab-'+name+'-container"></div>\n\n' +
    '<script>\n(function(){\n' +
    '  var VARIANT_A = `'+varA.replace(/`/g,'\\`')+'`;\n' +
    '  var VARIANT_B = `'+varB.replace(/`/g,'\\`')+'`;\n\n' +
    '  // Get or assign variant (persisted per user)\n' +
    '  var stored = localStorage.getItem("ab_'+name+'");\n' +
    '  var variant = stored || (Math.random() < '+s/100+' ? "A" : "B");\n' +
    '  if (!stored) localStorage.setItem("ab_'+name+'", variant);\n\n' +
    '  // Render variant\n' +
    '  var container = document.getElementById("ab-'+name+'-container");\n' +
    '  if (container) container.innerHTML = variant === "A" ? VARIANT_A : VARIANT_B;\n\n' +
    '  // Track exposure\n' +
    '  console.log("AB Test ['+name+'] — Variant:", variant);\n' +
    '  if (typeof gtag !== "undefined") gtag("event", "ab_exposure", { test_name: "'+name+'", variant: variant });\n\n' +
    '  // Track conversion — call window.abConvert("'+name+'") on your CTA\n' +
    '  window.abConvert = function(testName) {\n' +
    '    var v = localStorage.getItem("ab_" + testName);\n' +
    '    console.log("AB Conversion ["+testName+"] Variant:", v);\n' +
    '    if (typeof gtag !== "undefined") gtag("event", "ab_conversion", { test_name: testName, variant: v });\n' +
    '  };\n' +
    '})();\n<\/script>\n' +
    '<!-- End A/B Test: '+name+' -->';
}

function getVal(id){return((document.getElementById(id)||{}).value||'').trim();}

function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(244,63,94,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(244,63,94,0.1),rgba(168,85,247,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#fb7185;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;';

  var tip=document.createElement('div');tip.style='font-size:9.5px;color:#94a3b8;background:rgba(244,63,94,0.05);border:1px solid rgba(244,63,94,0.15);border-radius:6px;padding:7px 9px;line-height:1.4;';tip.textContent=t('tip');body.appendChild(tip);

  // Presets
  var plabel=document.createElement('div');plabel.style='font-size:10px;color:#64748b;font-weight:600;';plabel.textContent=t('presets');body.appendChild(plabel);
  var prow=document.createElement('div');prow.style='display:flex;flex-wrap:wrap;gap:4px;';
  Object.keys(PRESETS).forEach(function(k){
    var b=document.createElement('button');b.textContent=tn(k);
    b.style='font-size:9px;padding:3px 8px;border-radius:5px;border:1px solid rgba(244,63,94,0.3);background:rgba(244,63,94,0.1);color:#fb7185;cursor:pointer;';
    b.onclick=function(){
      var pa=document.getElementById('ab-var-a');if(pa)pa.value=PRESETS[k].a;
      var pb=document.getElementById('ab-var-b');if(pb)pb.value=PRESETS[k].b;
    };
    prow.appendChild(b);
  });
  body.appendChild(prow);

  // Test name + split
  var configRow=document.createElement('div');configRow.style='display:grid;grid-template-columns:1fr 1fr;gap:6px;';
  function mkF(lk,id,ph,val){
    var d=document.createElement('div');d.style='display:flex;flex-direction:column;gap:3px;';
    var l=document.createElement('div');l.style='font-size:10px;color:#64748b;font-weight:600;';l.textContent=t(lk);
    var i=document.createElement('input');i.type='text';i.id=id;i.placeholder=ph||'';i.value=val||'';
    i.style='background:#0f172a;color:#e2e8f0;border:1px solid rgba(244,63,94,0.2);padding:7px 8px;border-radius:7px;font-size:10px;outline:none;width:100%;box-sizing:border-box;';
    d.appendChild(l);d.appendChild(i);return d;
  }
  configRow.appendChild(mkF('testName','ab-name',t('testNamePh'),'btn-test'));
  configRow.appendChild(mkF('split','ab-split','50 (A) / 50 (B)','50'));
  body.appendChild(configRow);

  // Variants
  function mkTA(lk,id,ph,aColor){
    var d=document.createElement('div');d.style='display:flex;flex-direction:column;gap:3px;';
    var l=document.createElement('div');l.style='font-size:10px;color:'+aColor+';font-weight:700;';l.textContent=t(lk);
    var ta=document.createElement('textarea');ta.id=id;ta.placeholder=ph||'';ta.rows=3;
    ta.style='background:#0f172a;color:#e2e8f0;border:1px solid '+aColor+'44;padding:8px 10px;border-radius:8px;font-size:9px;outline:none;resize:vertical;width:100%;box-sizing:border-box;font-family:"JetBrains Mono",monospace;line-height:1.4;';
    d.appendChild(l);d.appendChild(ta);return d;
  }
  body.appendChild(mkTA('varA','ab-var-a','<button>Control</button>','#3b82f6'));
  body.appendChild(mkTA('varB','ab-var-b','<button>Variant</button>','#10b981'));

  // Preview buttons
  var pvRow=document.createElement('div');pvRow.style='display:flex;gap:6px;';
  [{lk:'btnPreviewA',id:'ab-var-a',c:'#3b82f6'},{lk:'btnPreviewB',id:'ab-var-b',c:'#10b981'}].forEach(function(p){
    var btn=document.createElement('button');btn.innerHTML=t(p.lk);
    btn.style='flex:1;background:'+p.c+'1a;color:'+p.c+';border:1px solid '+p.c+'44;padding:7px;border-radius:8px;font-size:9.5px;font-weight:700;cursor:pointer;';
    btn.onclick=(function(id){return function(){
      var code=(document.getElementById(id)||{}).value||'<div>Preview</div>';
      var full='<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{font-family:Inter,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#f8fafc;}</style></head><body>'+code+'</body></html>';
      if(window.editor){window.editor.setValue(full);if(window.runPreview)window.runPreview();}
    };})(p.id);
    pvRow.appendChild(btn);
  });
  body.appendChild(pvRow);

  var genBtn=document.createElement('button');genBtn.innerHTML=t('btnGen');
  genBtn.style='width:100%;background:linear-gradient(135deg,#9f1239,#e11d48);color:#fff;border:none;padding:11px;border-radius:10px;font-weight:900;font-size:12px;cursor:pointer;box-shadow:0 4px 20px rgba(225,29,72,0.35);';
  genBtn.onclick=function(){
    var name=getVal('ab-name')||'my-test';
    var varA=getVal('ab-var-a')||'<div>A</div>';
    var varB=getVal('ab-var-b')||'<div>B</div>';
    var split=getVal('ab-split')||'50';
    lastCode=genABCode(name,varA,varB,split);
    var out=document.getElementById('ab-output');if(out)out.style.display='flex';
    var pre=document.getElementById('ab-pre');if(pre)pre.textContent=lastCode;
  };
  body.appendChild(genBtn);

  var outSec=document.createElement('div');outSec.id='ab-output';outSec.style='display:'+(lastCode?'flex':'none')+';flex-direction:column;gap:6px;';
  var rLabel=document.createElement('div');rLabel.style='font-size:10px;color:#64748b;font-weight:600;';rLabel.textContent=t('result');outSec.appendChild(rLabel);
  var pre=document.createElement('pre');pre.id='ab-pre';
  pre.style='background:#0d1117;border:1px solid rgba(244,63,94,0.2);border-radius:8px;padding:10px;font-size:8.5px;color:#c9d1d9;overflow:auto;max-height:160px;white-space:pre-wrap;margin:0;font-family:"JetBrains Mono",monospace;line-height:1.4;';
  pre.textContent=lastCode;outSec.appendChild(pre);
  var aRow=document.createElement('div');aRow.style='display:flex;gap:6px;';
  var injBtn=document.createElement('button');injBtn.innerHTML=t('btnInject');
  injBtn.style='flex:1;background:rgba(16,185,129,0.12);color:#34d399;border:1px solid rgba(16,185,129,0.3);padding:8px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
  injBtn.onclick=function(){if(!window.editor||!lastCode)return;var code=window.editor.getValue();if(code.includes('</body>'))code=code.replace('</body>',lastCode+'\n</body>');else code+='\n'+lastCode;window.editor.setValue(code);if(window.runPreview)window.runPreview();if(window.showToast)window.showToast(t('injected'));};
  var cpBtn=document.createElement('button');cpBtn.innerHTML=t('btnCopy');
  cpBtn.style='background:rgba(244,63,94,0.12);color:#fb7185;border:1px solid rgba(244,63,94,0.3);padding:8px 10px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
  cpBtn.onclick=function(){if(lastCode)navigator.clipboard.writeText(lastCode).then(function(){if(window.showToast)window.showToast(t('copied'));});};
  aRow.appendChild(injBtn);aRow.appendChild(cpBtn);outSec.appendChild(aRow);
  body.appendChild(outSec);
  wrap.appendChild(body);parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-abtest');if(el)el.textContent=t('tab');if(window.activeTab==='abtest')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='abtest'){window.activeTab='abtest';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-abtest');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
