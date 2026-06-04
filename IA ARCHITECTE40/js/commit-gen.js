/**
 * AI Commit Message Generator v1.0 — EN/FR
 * Paste code diff → get perfect git commit message
 */
(function(){
'use strict';
var TX={
  en:{tab:'Commit',title:'💬 AI Commit Message',sub:'Paste your code diff → perfect git commit',
      diff:'Paste git diff or describe changes:',type:'Commit type:',scope:'Scope (optional):',
      btnGen:'⚡ Generate Commit',btnCopy:'📋 Copy',copied:'Copied!',
      preview:'Generated commit message:',
      ph:'diff --git a/app.js b/app.js\n@@ -10,6 +10,8 @@\n+  const handleError = (err) => {\n+    console.error(err);\n+  };'},
  fr:{tab:'Commit',title:'💬 Message de Commit AI',sub:'Collez votre diff → message git parfait',
      diff:'Collez le diff ou décrivez les changements :',type:'Type de commit :',scope:'Scope (optionnel) :',
      btnGen:'⚡ Générer Commit',btnCopy:'📋 Copier',copied:'Copié !',
      preview:'Message de commit généré :',
      ph:'diff --git a/app.js b/app.js\n@@ -10,6 +10,8 @@\n+  const handleError = (err) => {\n+    console.error(err);\n+  };'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var TYPES=['feat','fix','docs','style','refactor','test','chore','perf','ci','build'];
var SCOPE_HINTS=['api','ui','auth','db','core','utils','styles','config','tests','deps'];

function analyzeChanges(diff){
  var d=diff.toLowerCase();var lx=gl();
  // Count additions/deletions
  var adds=(diff.match(/^\+(?!\+\+)/gm)||[]).length;
  var dels=(diff.match(/^-(?!--)/gm)||[]).length;
  // Detect files changed
  var files=(diff.match(/diff --git.*?(?=diff|$)/gs)||[diff]).map(function(f){var m=f.match(/diff --git a\/(\S+)/);return m?m[1]:'';}).filter(Boolean);
  // Detect type of change
  var type='chore';var action='';var details=[];
  if(/error|exception|catch|try|fix|bug|crash|undefined|null/i.test(diff)){type='fix';}
  else if(/test|spec|describe|it\(|expect|assert/i.test(diff)){type='test';}
  else if(/console\.log|debug|log\./i.test(diff)&&adds>dels){type='chore';action='remove debug logs';}
  else if(/style|css|class|color|margin|padding|font/i.test(diff)){type='style';}
  else if(/interface|type |class |function |const |export/i.test(diff)&&adds>10){type='feat';}
  else if(/\/\*\*|jsdoc|comment|@param|@returns|readme/i.test(diff)){type='docs';}
  else if(/refactor|rename|move|extract|clean|reorgan/i.test(diff)){type='refactor';}
  else if(/perf|optim|cache|memo|speed|fast|lazy/i.test(diff)){type='perf';}
  // Detect action words
  if(/add|create|implement|introduce/i.test(diff))action=lx==='fr'?'ajouter':'add';
  else if(/remove|delete|drop|clean/i.test(diff))action=lx==='fr'?'supprimer':'remove';
  else if(/update|upgrade|bump|change/i.test(diff))action=lx==='fr'?'mettre à jour':'update';
  else if(/fix|repair|resolve|correct/i.test(diff))action=lx==='fr'?'corriger':'fix';
  else if(/refactor|restructure/i.test(diff))action=lx==='fr'?'refactoriser':'refactor';
  else action=type==='feat'?(lx==='fr'?'implémenter':'implement'):(lx==='fr'?'modifier':'update');
  // Build commit details
  if(files.length)details.push((lx==='fr'?'Fichiers modifiés: ':'Files changed: ')+files.slice(0,3).join(', '));
  details.push((lx==='fr'?'Ajouts: ':'Additions: ')+adds+' | '+(lx==='fr'?'Suppressions: ':'Deletions: ')+dels);
  // Scope detection
  var scope='';
  if(/auth|login|user/i.test(diff))scope='auth';
  else if(/api|fetch|request|endpoint/i.test(diff))scope='api';
  else if(/style|css|ui|component/i.test(diff))scope='ui';
  else if(/db|database|model|schema/i.test(diff))scope='db';
  else if(/test|spec/i.test(diff))scope='tests';
  else if(files.length&&files[0])scope=files[0].split('/')[0].replace(/\.(js|ts|py|css|html)$/,'');
  return{type:type,action:action,scope:scope,files:files,adds:adds,dels:dels,details:details};
}

function buildMessages(diff,forcedType,forcedScope){
  var r=analyzeChanges(diff);var lx=gl();
  var type=forcedType||r.type;var scope=forcedScope||(r.scope?'('+r.scope+')':'');
  var prefix=type+(scope?'('+scope+')':'')+': ';
  // Generate 3 variants
  var msgs=[];
  // Variant 1: concise
  var subject=r.action+' '+(type==='fix'?(lx==='fr'?'le bug de gestion d\'erreurs':'error handling bug'):type==='feat'?(lx==='fr'?'nouvelle fonctionnalité':'new feature'):type==='docs'?(lx==='fr'?'la documentation':'documentation'):(lx==='fr'?'le code':'code'));
  msgs.push(prefix+subject+(r.files.length?'\n\n'+(lx==='fr'?'Modifié: ':'Changed: ')+r.files.slice(0,2).join(', '):''));
  // Variant 2: detailed
  var det=prefix+(lx==='fr'?'implémenter les modifications dans ':'implement changes in ')+(r.files[0]||'codebase');
  det+='\n\n'+(lx==='fr'?'Changements:':'Changes:')+'\n'+r.details.map(function(d){return'- '+d;}).join('\n');
  msgs.push(det);
  // Variant 3: conventional
  msgs.push(prefix+(r.adds>r.dels?(lx==='fr'?'étendre les fonctionnalités existantes':'extend existing functionality'):(lx==='fr'?'nettoyer et optimiser':'clean up and optimize'))+'\n\n'+(lx==='fr'?'Résumé des changements:':'Changes summary:')+'\n- +'+(r.adds)+' '+(lx==='fr'?'lignes ajoutées':'lines added')+'\n- -'+(r.dels)+' '+(lx==='fr'?'lignes supprimées':'lines removed'));
  return msgs;
}

var lastDiff='';var lastType='feat';var lastScope='';
function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(99,102,241,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(99,102,241,0.1),rgba(139,92,246,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#818cf8;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:7px;';

  var dl=document.createElement('div');dl.style='font-size:10px;color:#64748b;font-weight:600;';dl.textContent=t('diff');body.appendChild(dl);
  var ta=document.createElement('textarea');ta.value=lastDiff;ta.placeholder=t('ph');ta.rows=5;
  ta.style='background:#0d1117;color:#c9d1d9;border:1px solid rgba(99,102,241,0.2);border-radius:8px;padding:9px;font-size:8.5px;font-family:"JetBrains Mono",monospace;outline:none;resize:vertical;width:100%;box-sizing:border-box;line-height:1.5;';
  ta.oninput=function(){lastDiff=this.value;};body.appendChild(ta);

  var row=document.createElement('div');row.style='display:grid;grid-template-columns:1fr 1fr;gap:5px;';
  function mkSel(lbl,opts,cur,cb){var w=document.createElement('div');w.style='display:flex;flex-direction:column;gap:2px;';var l=document.createElement('div');l.style='font-size:9px;color:#64748b;font-weight:600;';l.textContent=lbl;var s=document.createElement('select');s.style='background:#0f172a;color:#e2e8f0;border:1px solid rgba(255,255,255,0.08);padding:5px;border-radius:6px;font-size:9px;outline:none;';opts.forEach(function(o){var op=document.createElement('option');op.value=o;op.textContent=o;if(o===cur)op.selected=true;s.appendChild(op);});s.onchange=function(){cb(this.value);};w.appendChild(l);w.appendChild(s);return w;}
  row.appendChild(mkSel(t('type'),TYPES,lastType,function(v){lastType=v;}));
  function mkInp(lbl,ph,cur,cb){var w=document.createElement('div');w.style='display:flex;flex-direction:column;gap:2px;';var l=document.createElement('div');l.style='font-size:9px;color:#64748b;font-weight:600;';l.textContent=lbl;var i=document.createElement('input');i.placeholder=ph;i.value=cur;i.style='background:#0f172a;color:#e2e8f0;border:1px solid rgba(255,255,255,0.08);padding:5px 8px;border-radius:6px;font-size:9px;outline:none;';i.oninput=function(){cb(this.value);};w.appendChild(l);w.appendChild(i);return w;}
  row.appendChild(mkInp(t('scope'),'api, ui, auth...',lastScope,function(v){lastScope=v;}));
  body.appendChild(row);

  var genBtn=document.createElement('button');genBtn.innerHTML=t('btnGen');
  genBtn.style='width:100%;background:linear-gradient(135deg,#312e81,#6366f1);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(99,102,241,0.3);';
  body.appendChild(genBtn);

  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);parent.appendChild(wrap);

  genBtn.onclick=function(){
    var diff=ta.value.trim();if(!diff)return;
    lastDiff=diff;res.innerHTML='';
    var msgs=buildMessages(diff,lastType,lastScope);
    var pvLabel=document.createElement('div');pvLabel.style='font-size:10px;color:#64748b;font-weight:600;';pvLabel.textContent=t('preview');res.appendChild(pvLabel);
    msgs.forEach(function(msg,i){
      var card=document.createElement('div');card.style='background:rgba(99,102,241,0.06);border:1px solid rgba(99,102,241,0.2);border-radius:8px;padding:10px;position:relative;';
      var badge=document.createElement('span');badge.style='font-size:8px;background:#312e81;color:#a5b4fc;padding:2px 7px;border-radius:3px;';badge.textContent='v'+(i+1);
      var pre=document.createElement('pre');pre.style='font-size:9px;font-family:"JetBrains Mono",monospace;color:#c9d1d9;margin:6px 0 0;white-space:pre-wrap;';pre.textContent=msg;
      var cp=document.createElement('button');cp.innerHTML='📋';cp.style='position:absolute;top:8px;right:8px;background:none;border:none;cursor:pointer;font-size:12px;';
      cp.onclick=function(){navigator.clipboard.writeText(msg).then(function(){if(window.showToast)window.showToast(t('copied'));});};
      card.appendChild(badge);card.appendChild(pre);card.appendChild(cp);res.appendChild(card);
    });
  };
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-commit');if(el)el.textContent=t('tab');if(window.activeTab==='commit')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='commit'){window.activeTab='commit';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-commit');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
