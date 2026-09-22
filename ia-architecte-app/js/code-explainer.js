/**
 * Code Explainer v1.0 — EN/FR
 * Select any code block → AI explains in FR/EN
 */
(function(){
'use strict';
var TX={
  en:{tab:'Explain',title:'🔮 Code Explainer',sub:'Paste code → get plain-English explanation',
      paste:'Paste your code here:',btnExplain:'🔮 Explain Code',btnCopy:'📋 Copy',
      copied:'📋 Copied!',btnInject:'💉 Insert Comment to Editor',
      lang:'Explanation language:',detected:'Detected language:',
      overview:'📖 Overview:',breakdown:'🔬 Line-by-Line:',concepts:'💡 Key Concepts:',
      placeholder:'// Paste any code here...\nconst result = array\n  .filter(x => x > 0)\n  .map(x => x * 2)\n  .reduce((a, b) => a + b, 0);'},
  fr:{tab:'Explain',title:'🔮 Explicateur de Code',sub:'Collez du code → explication en français',
      paste:'Collez votre code ici :',btnExplain:'🔮 Expliquer le Code',btnCopy:'📋 Copier',
      copied:'📋 Copié !',btnInject:'💉 Insérer Commentaire dans l\'Éditeur',
      lang:'Langue d\'explication :',detected:'Langage détecté :',
      overview:'📖 Vue d\'ensemble :',breakdown:'🔬 Ligne par Ligne :',concepts:'💡 Concepts Clés :',
      placeholder:'// Collez n\'importe quel code ici...\nconst result = array\n  .filter(x => x > 0)\n  .map(x => x * 2)\n  .reduce((a, b) => a + b, 0);'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

// Language detection
function detectLang(code){
  if(/^\s*<(!DOCTYPE|html|head|body|div|span|p\b|script|link)/im.test(code))return'HTML';
  if(/^\s*(\.|#|@media|@keyframes|:root)[^{]*\{/m.test(code)||/[{;]\s*\n\s*(color|margin|padding|font|display|background):/m.test(code))return'CSS';
  if(/\bdef \w+\(|import \w+|print\(|elif |class \w+:|\.py/i.test(code))return'Python';
  if(/\bpackage main\b|\bfunc \w+\(|\bfmt\.Print/i.test(code))return'Go';
  if(/\bpublic class\b|\bSystem\.out\.print|\bvoid main\b/i.test(code))return'Java';
  if(/#include|std::|cout <<|cin >>|::\w+/i.test(code))return'C++';
  if(/\bSELECT\b|\bFROM\b|\bWHERE\b|\bJOIN\b/i.test(code))return'SQL';
  if(/\$\w+\s*=|echo\s+["']|function\s+\w+\s*\(\s*\$|->|\$this->/i.test(code))return'PHP';
  if(/\binterface\b|\btype\s+\w+\s*=|\w+:\s*\w+(\[\])?[;,]|\bReadonly</i.test(code))return'TypeScript';
  if(/\basync\b|\bawait\b|\b(const|let|var)\b|\b=>\b|\bfetch\(|\bconsole\./i.test(code))return'JavaScript';
  if(/\{[^}]*\}|"[^"]*":\s*[\[{"\d]/i.test(code)&&code.trim().startsWith('{'))return'JSON';
  return'Code';
}

// Concept database
var CONCEPTS={
  en:{
    'const':'`const` declares a variable that cannot be reassigned (but its contents can be mutated).',
    'let':'`let` declares a block-scoped variable that can be reassigned.',
    'var':'`var` declares a function-scoped variable (older style, prefer `const`/`let`).',
    '=>':'Arrow function `=>` is a shorthand for function expressions. `x => x*2` means "take x, return x*2".',
    'async':'`async` marks a function as asynchronous, meaning it returns a Promise.',
    'await':'`await` pauses execution until a Promise resolves. Must be inside an `async` function.',
    'fetch':'`fetch()` makes an HTTP request and returns a Promise.',
    'map':'`.map()` transforms each element of an array and returns a new array.',
    'filter':'`.filter()` keeps only elements that match a condition.',
    'reduce':'`.reduce()` combines all array elements into a single value.',
    'forEach':'`.forEach()` runs a function on each element (no return value).',
    'Promise':'A `Promise` represents a future value — it will either resolve (success) or reject (error).',
    'class':'`class` defines a blueprint for creating objects with shared properties and methods.',
    'import':'`import` brings in code from another module/file.',
    'export':'`export` makes code available for other modules to import.',
    'try':'`try/catch` handles errors gracefully — code in `try` runs, `catch` handles any errors.',
    'spread':'The spread operator `...` expands an array or object into individual elements.',
    'destructuring':'Destructuring `const { a, b } = obj` extracts values from objects/arrays into variables.'
  },
  fr:{
    'const':'`const` déclare une variable qui ne peut pas être réassignée (mais son contenu peut être modifié).',
    'let':'`let` déclare une variable à portée de bloc qui peut être réassignée.',
    'var':'`var` déclare une variable à portée de fonction (ancien style, préférez `const`/`let`).',
    '=>':'La fonction fléchée `=>` est un raccourci pour les expressions de fonction. `x => x*2` signifie "prendre x, retourner x*2".',
    'async':'`async` marque une fonction comme asynchrone, elle retourne une Promise.',
    'await':'`await` met en pause l\'exécution jusqu\'à ce qu\'une Promise se résolve. Doit être dans une fonction `async`.',
    'fetch':'`fetch()` fait une requête HTTP et retourne une Promise.',
    'map':'`.map()` transforme chaque élément d\'un tableau et retourne un nouveau tableau.',
    'filter':'`.filter()` garde uniquement les éléments qui correspondent à une condition.',
    'reduce':'`.reduce()` combine tous les éléments d\'un tableau en une seule valeur.',
    'forEach':'`.forEach()` exécute une fonction sur chaque élément (pas de valeur de retour).',
    'Promise':'Une `Promise` représente une valeur future — elle sera résolue (succès) ou rejetée (erreur).',
    'class':'`class` définit un modèle pour créer des objets avec des propriétés et méthodes partagées.',
    'import':'`import` importe du code depuis un autre module/fichier.',
    'export':'`export` rend le code disponible pour d\'autres modules à importer.',
    'try':'`try/catch` gère les erreurs — le code dans `try` s\'exécute, `catch` gère les erreurs.',
    'spread':'L\'opérateur de décomposition `...` étend un tableau ou objet en éléments individuels.',
    'destructuring':'La déstructuration `const { a, b } = obj` extrait des valeurs d\'objets/tableaux en variables.'
  }
};

function explainCode(code){
  var lang=detectLang(code);var lx=gl();var lines=code.split('\n');
  var lineExplanations=[];var foundConcepts=[];

  // Explain each non-empty line
  lines.forEach(function(line,i){
    var l=line.trim();if(!l||l.startsWith('//')||l.startsWith('#'))return;
    var exp='';
    if(/^import\s/.test(l))exp=lx==='fr'?'Importe des modules/fonctions depuis un autre fichier':'Imports modules/functions from another file';
    else if(/^export\s+default/.test(l))exp=lx==='fr'?'Exporte la valeur par défaut de ce module':'Exports the default value of this module';
    else if(/^export\s/.test(l))exp=lx==='fr'?'Exporte pour utilisation dans d\'autres fichiers':'Exports for use in other files';
    else if(/^const\s+\w+\s*=\s*async\s*\(/.test(l)||/^async\s+function/.test(l))exp=lx==='fr'?'Définit une fonction asynchrone (retourne une Promise)':'Defines an async function (returns a Promise)';
    else if(/^const\s+\w+\s*=/.test(l)&&/=>\s*\{?/.test(l))exp=lx==='fr'?'Définit une fonction fléchée (const)':'Defines an arrow function (const)';
    else if(/^(?:const|let|var)\s+\w+\s*=/.test(l))exp=lx==='fr'?'Déclare et initialise une variable':'Declares and initializes a variable';
    else if(/^function\s+\w+/.test(l))exp=lx==='fr'?'Définit une fonction nommée':'Defines a named function';
    else if(/^class\s+\w+/.test(l))exp=lx==='fr'?'Définit une classe (modèle d\'objet)':'Defines a class (object blueprint)';
    else if(/^\s*if\s*\(/.test(l))exp=lx==='fr'?'Condition : exécute le bloc si la condition est vraie':'Condition: executes the block if condition is true';
    else if(/^\s*for\s*\(/.test(l)||/\.forEach\(/.test(l))exp=lx==='fr'?'Boucle : répète des actions sur chaque élément':'Loop: repeats actions for each element';
    else if(/\.map\(/.test(l))exp=lx==='fr'?'Transforme chaque élément du tableau → nouveau tableau':'Transforms each array element → new array';
    else if(/\.filter\(/.test(l))exp=lx==='fr'?'Filtre les éléments selon une condition → nouveau tableau':'Filters elements by condition → new array';
    else if(/\.reduce\(/.test(l))exp=lx==='fr'?'Réduit le tableau à une valeur unique (somme, total, etc.)':'Reduces array to a single value (sum, total, etc.)';
    else if(/await\s+fetch\(/.test(l))exp=lx==='fr'?'Fait une requête HTTP et attend la réponse':'Makes an HTTP request and waits for the response';
    else if(/\.then\(/.test(l))exp=lx==='fr'?'Callback exécuté quand la Promise se résout':'Callback executed when the Promise resolves';
    else if(/\.catch\(/.test(l))exp=lx==='fr'?'Gère les erreurs de la Promise':'Handles Promise errors';
    else if(/return\s/.test(l))exp=lx==='fr'?'Retourne une valeur depuis la fonction':'Returns a value from the function';
    else if(/console\.log/.test(l))exp=lx==='fr'?'Affiche une valeur dans la console (débogage)':'Prints a value to the console (debugging)';
    if(exp)lineExplanations.push({line:i+1,code:line.length>50?line.substring(0,47)+'...':line,exp:exp});
  });

  // Detect key concepts — use includes() to avoid RegExp SyntaxErrors
  var concepts=CONCEPTS[lx]||CONCEPTS.en;
  var keywordChecks=[
    {kw:'const',       ck:'const'},
    {kw:'let ',        ck:'let'},
    {kw:'var ',        ck:'var'},
    {kw:'=>',          ck:'=>'},
    {kw:'async ',      ck:'async'},
    {kw:'await ',      ck:'await'},
    {kw:'fetch(',      ck:'fetch'},
    {kw:'.map(',       ck:'map'},
    {kw:'.filter(',    ck:'filter'},
    {kw:'.reduce(',    ck:'reduce'},
    {kw:'.forEach(',   ck:'forEach'},
    {kw:'Promise',     ck:'Promise'},
    {kw:'class ',      ck:'class'},
    {kw:'import ',     ck:'import'},
    {kw:'export ',     ck:'export'},
    {kw:'try {',       ck:'try'},
    {kw:'...',         ck:'spread'}
  ];
  keywordChecks.forEach(function(item){
    if(code.includes(item.kw)&&concepts[item.ck]){
      foundConcepts.push({term:item.ck,desc:concepts[item.ck]});
    }
  });
  // Deduplicate
  var seenConcepts={};foundConcepts=foundConcepts.filter(function(c){if(seenConcepts[c.term])return false;seenConcepts[c.term]=1;return true;});

  // Generate overview
  var overview='';
  if(lang==='SQL'){overview=lx==='fr'?'Ce code SQL interroge une base de données. Il sélectionne, filtre et/ou transforme des données.':'This SQL code queries a database. It selects, filters, and/or transforms data.';}
  else if(lang==='HTML'){overview=lx==='fr'?'Ce code HTML structure une page web avec des éléments sémantiques.':'This HTML code structures a web page with semantic elements.';}
  else if(lang==='CSS'){overview=lx==='fr'?'Ce code CSS définit le style visuel (couleurs, mise en page, animations) d\'une page web.':'This CSS code defines the visual style (colors, layout, animations) of a web page.';}
  else if(lang==='Python'){overview=lx==='fr'?'Ce code Python exécute des opérations. Python est apprécié pour sa lisibilité et sa polyvalence.':'This Python code performs operations. Python is valued for its readability and versatility.';}
  else{
    var hasAsync=/async|await|fetch|Promise|\.then/.test(code);
    var hasDOM=/document\.|querySelector|getElementById|addEventListener/.test(code);
    var hasClass=/class\s+\w+/.test(code);
    var hasArray=/\.map\(|\.filter\(|\.reduce\(/.test(code);
    var parts=[];
    if(hasAsync)parts.push(lx==='fr'?'opérations asynchrones':'async operations');
    if(hasDOM)parts.push(lx==='fr'?'manipulation du DOM':'DOM manipulation');
    if(hasClass)parts.push(lx==='fr'?'programmation orientée objet':'object-oriented programming');
    if(hasArray)parts.push(lx==='fr'?'transformation de tableaux':'array transformation');
    overview=lx==='fr'?'Ce code JavaScript implique '+(parts.length?parts.join(', '):'des opérations générales')+'.':'This JavaScript code involves '+(parts.length?parts.join(', '):'general operations')+'.';
  }

  return{lang:lang,overview:overview,lineExplanations:lineExplanations.slice(0,10),concepts:foundConcepts.slice(0,6)};
}

var lastCode='';var lastExpl='';

function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(168,85,247,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(168,85,247,0.1),rgba(99,102,241,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#c084fc;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:7px;';

  // Lang toggle
  var langRow=document.createElement('div');langRow.style='display:flex;align-items:center;gap:8px;';
  var langLabel=document.createElement('span');langLabel.style='font-size:9px;color:#64748b;';langLabel.textContent=t('lang');
  var enBtn=document.createElement('button');enBtn.textContent='🇬🇧 English';
  var frBtn=document.createElement('button');frBtn.textContent='🇫🇷 Français';
  [enBtn,frBtn].forEach(function(b,i){
    var isActive=(i===0&&gl()==='en')||(i===1&&gl()==='fr');
    b.style='font-size:9px;padding:4px 10px;border-radius:5px;cursor:pointer;border:1px solid '+(isActive?'rgba(192,132,252,0.5)':'rgba(255,255,255,0.07)')+';background:'+(isActive?'rgba(192,132,252,0.15)':'rgba(255,255,255,0.02)')+';color:'+(isActive?'#c084fc':'#64748b')+';';
    b.onclick=function(){window.lang=i===0?'en':'fr';renderTab();};
  });
  langRow.appendChild(langLabel);langRow.appendChild(enBtn);langRow.appendChild(frBtn);body.appendChild(langRow);

  var codeLabel=document.createElement('div');codeLabel.style='font-size:10px;color:#64748b;font-weight:600;';codeLabel.textContent=t('paste');body.appendChild(codeLabel);
  var codeTa=document.createElement('textarea');codeTa.value=lastCode;codeTa.placeholder=t('placeholder');codeTa.rows=7;
  codeTa.style='background:#0d1117;color:#c9d1d9;border:1px solid rgba(168,85,247,0.15);border-radius:8px;padding:9px;font-size:9px;font-family:"JetBrains Mono",monospace;outline:none;resize:vertical;width:100%;box-sizing:border-box;line-height:1.5;';
  codeTa.oninput=function(){lastCode=this.value;};body.appendChild(codeTa);

  // Grab from editor button
  if(window.editor){
    var grabBtn=document.createElement('button');grabBtn.innerHTML='📥 '+(gl()==='fr'?'Prendre depuis l\'Éditeur':'Grab from Editor');
    grabBtn.style='width:100%;background:rgba(99,102,241,0.08);color:#818cf8;border:1px solid rgba(99,102,241,0.2);padding:7px;border-radius:7px;font-size:10px;cursor:pointer;font-weight:600;';
    grabBtn.onclick=function(){var sel=window.editor.getModel().getValueInRange(window.editor.getSelection());codeTa.value=sel||window.editor.getValue();lastCode=codeTa.value;};
    body.appendChild(grabBtn);
  }

  var explainBtn=document.createElement('button');explainBtn.innerHTML=t('btnExplain');
  explainBtn.style='width:100%;background:linear-gradient(135deg,#4c1d95,#8b5cf6);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(168,85,247,0.3);';
  body.appendChild(explainBtn);

  var resultsDiv=document.createElement('div');resultsDiv.style='display:flex;flex-direction:column;gap:6px;';body.appendChild(resultsDiv);
  wrap.appendChild(body);parent.appendChild(wrap);

  explainBtn.onclick=function(){
    var code=codeTa.value.trim();if(!code)return;
    lastCode=code;resultsDiv.innerHTML='';
    var r=explainCode(code);

    // Detected lang badge
    var badge=document.createElement('div');badge.style='display:flex;align-items:center;gap:6px;background:rgba(168,85,247,0.1);border:1px solid rgba(168,85,247,0.25);border-radius:7px;padding:7px 10px;';
    badge.innerHTML='<span style="font-size:18px;">'+({'JavaScript':'⚡','TypeScript':'🔷','Python':'🐍','HTML':'🌐','CSS':'🎨','SQL':'🗃️','Java':'☕','PHP':'🐘','Go':'🐹','C++':'⚙️','JSON':'📋','Code':'📄'}[r.lang]||'📄')+'</span><div><div style="font-size:10px;font-weight:700;color:#c084fc;">'+t('detected')+' '+r.lang+'</div><div style="font-size:9px;color:#64748b;">'+code.split('\n').length+' lines analyzed</div></div>';
    resultsDiv.appendChild(badge);

    // Overview
    var ovCard=document.createElement('div');ovCard.style='background:rgba(168,85,247,0.06);border:1px solid rgba(168,85,247,0.15);border-radius:8px;padding:9px 10px;';
    ovCard.innerHTML='<div style="font-size:10px;font-weight:700;color:#c084fc;margin-bottom:4px;">'+t('overview')+'</div><div style="font-size:9.5px;color:#94a3b8;line-height:1.6;">'+r.overview+'</div>';
    resultsDiv.appendChild(ovCard);

    // Line breakdown
    if(r.lineExplanations.length){
      var lbCard=document.createElement('div');lbCard.style='background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:8px;padding:9px 10px;';
      var lbLabel=document.createElement('div');lbLabel.style='font-size:10px;font-weight:700;color:#c084fc;margin-bottom:6px;';lbLabel.textContent=t('breakdown');lbCard.appendChild(lbLabel);
      r.lineExplanations.forEach(function(le){
        var row=document.createElement('div');row.style='margin-bottom:6px;border-left:2px solid rgba(168,85,247,0.3);padding-left:8px;';
        row.innerHTML='<div style="font-size:8px;font-family:\'JetBrains Mono\',monospace;color:#818cf8;margin-bottom:1px;">L'+le.line+': '+le.code+'</div><div style="font-size:9px;color:#94a3b8;">'+le.exp+'</div>';
        lbCard.appendChild(row);
      });
      resultsDiv.appendChild(lbCard);
    }

    // Key concepts
    if(r.concepts.length){
      var cnCard=document.createElement('div');cnCard.style='background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:8px;padding:9px 10px;';
      var cnLabel=document.createElement('div');cnLabel.style='font-size:10px;font-weight:700;color:#c084fc;margin-bottom:6px;';cnLabel.textContent=t('concepts');cnCard.appendChild(cnLabel);
      r.concepts.forEach(function(c){
        var item=document.createElement('div');item.style='margin-bottom:5px;';
        item.innerHTML='<span style="font-size:9px;font-family:\'JetBrains Mono\',monospace;background:rgba(168,85,247,0.15);color:#c084fc;padding:1px 6px;border-radius:3px;">'+c.term+'</span><span style="font-size:9px;color:#94a3b8;margin-left:6px;">'+c.desc+'</span>';
        cnCard.appendChild(item);
      });
      resultsDiv.appendChild(cnCard);
    }

    // Build comment block for injection
    var commentLines=['/**',' * 🔮 Code Explainer — '+r.lang,' * ',' * '+r.overview];
    if(r.lineExplanations.length){commentLines.push(' * ');commentLines.push(' * Line-by-line:');r.lineExplanations.forEach(function(le){commentLines.push(' * L'+le.line+': '+le.exp);});}
    if(r.concepts.length){commentLines.push(' * ');commentLines.push(' * Key Concepts:');r.concepts.forEach(function(c){commentLines.push(' * '+c.term+': '+c.desc.substring(0,80));});}
    commentLines.push(' */');lastExpl=commentLines.join('\n')+'\n\n'+code;

    var actRow=document.createElement('div');actRow.style='display:flex;gap:5px;';
    var cpBtn=document.createElement('button');cpBtn.innerHTML=t('btnCopy');cpBtn.style='flex:1;background:rgba(168,85,247,0.1);color:#c084fc;border:1px solid rgba(168,85,247,0.2);padding:8px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
    cpBtn.onclick=function(){navigator.clipboard.writeText(lastExpl).then(function(){if(window.showToast)window.showToast(t('copied'));});};
    var injBtn=document.createElement('button');injBtn.innerHTML='💉 '+(gl()==='fr'?'Injecter':'Inject');injBtn.style='flex:1;background:rgba(99,102,241,0.12);color:#818cf8;border:1px solid rgba(99,102,241,0.25);padding:8px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
    injBtn.onclick=function(){if(window.editor)window.editor.setValue(lastExpl);};
    actRow.appendChild(cpBtn);if(window.editor)actRow.appendChild(injBtn);
    resultsDiv.appendChild(actRow);
  };
}

document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-codeexplain');if(el)el.textContent=t('tab');if(window.activeTab==='codeexplain')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='codeexplain'){window.activeTab='codeexplain';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-codeexplain');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
