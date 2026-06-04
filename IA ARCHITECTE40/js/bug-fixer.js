/**
 * AI Bug Fixer v1.0 — EN/FR
 * Pattern-based error analysis + fix suggestions
 */
(function(){
'use strict';
var TX={
  en:{tab:'Bug Fix',title:'🤖 AI Bug Fixer',sub:'Paste console error → get explanation & fix',
      paste:'Paste your error here...',code:'Paste your code (optional):',
      btnFix:'⚡ Analyze & Fix',btnCopy:'📋 Copy Fix',copied:'📋 Copied!',
      btnClear:'🗑 Clear',explanation:'🔍 Explanation:',fix:'✅ Fix:',
      cause:'📌 Cause:',prevention:'🛡 Prevention:',noMatch:'No pattern matched. Check syntax manually.',
      placeholder:'Example:\nTypeError: Cannot read properties of undefined (reading \'map\')\n    at App.js:42:15'},
  fr:{tab:'Bug Fix',title:'🤖 Correcteur de Bugs AI',sub:'Collez l\'erreur console → explication & correction',
      paste:'Collez votre erreur ici...',code:'Collez votre code (optionnel) :',
      btnFix:'⚡ Analyser & Corriger',btnCopy:'📋 Copier',copied:'📋 Copié !',
      btnClear:'🗑 Effacer',explanation:'🔍 Explication :',fix:'✅ Correction :',
      cause:'📌 Cause :',prevention:'🛡 Prévention :',noMatch:'Aucun pattern trouvé. Vérifiez la syntaxe manuellement.',
      placeholder:'Exemple:\nTypeError: Cannot read properties of undefined (reading \'map\')\n    at App.js:42:15'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var PATTERNS=[
  {
    match:/cannot read propert(?:y|ies) of (undefined|null)/i,
    type:'TypeError',color:'#ef4444',
    en:{
      explanation:'You are trying to access a property on a variable that is `undefined` or `null`. This usually happens when an API response hasn\'t loaded yet, or a function returns nothing.',
      cause:'Variable is `undefined` or `null` at the time of access.',
      fix:'Add a null check before accessing the property:\n\n// Before (broken):\nconst names = data.users.map(u => u.name);\n\n// After (fixed):\nconst names = data?.users?.map(u => u.name) ?? [];\n// OR\nif (data && data.users) {\n  const names = data.users.map(u => u.name);\n}',
      prevention:'Use optional chaining (?.) and nullish coalescing (??) operators.'
    },
    fr:{
      explanation:'Vous accédez à une propriété d\'une variable qui est `undefined` ou `null`. Cela arrive souvent quand une réponse API n\'est pas encore chargée.',
      cause:'La variable est `undefined` ou `null` au moment de l\'accès.',
      fix:'Ajoutez une vérification null avant d\'accéder à la propriété :\n\n// Avant (cassé) :\nconst noms = data.users.map(u => u.nom);\n\n// Après (corrigé) :\nconst noms = data?.users?.map(u => u.nom) ?? [];',
      prevention:'Utilisez le chaînage optionnel (?.) et l\'opérateur nullish (??).'
    }
  },
  {
    match:/(\w+) is not a function/i,
    type:'TypeError',color:'#ef4444',
    en:{
      explanation:'You are calling something as a function, but it is not a function — it might be undefined, null, a string, or an object.',
      cause:'The variable exists but is not callable. Often caused by a typo, wrong import, or the function not being defined yet.',
      fix:'// Check what the variable actually is:\nconsole.log(typeof myFunction); // should be "function"\n\n// Common fixes:\n// 1. Fix the import\nimport { myFunction } from \'./utils\'; // not default export!\n\n// 2. Check the object method exists\nif (typeof obj.method === \'function\') {\n  obj.method();\n}',
      prevention:'Always verify imports and check function signatures before calling.'
    },
    fr:{
      explanation:'Vous appelez quelque chose comme une fonction, mais ce n\'est pas une fonction — peut-être undefined, null, ou un objet.',
      cause:'Typo, import incorrect, ou la fonction n\'est pas encore définie.',
      fix:'// Vérifiez le type de la variable :\nconsole.log(typeof maFonction); // doit être "function"\n\n// Fix courant :\nimport { maFonction } from \'./utils\';',
      prevention:'Vérifiez toujours les imports et les signatures de fonctions.'
    }
  },
  {
    match:/unexpected token|syntaxerror/i,
    type:'SyntaxError',color:'#f97316',
    en:{
      explanation:'JavaScript found a character or token it did not expect. This is usually a typo in your code — a missing bracket, comma, or quote.',
      cause:'Typo: missing `}`, `)`, `,`, `:`, or mismatched quotes.',
      fix:'// Common syntax errors:\n\n// ❌ Missing closing bracket\nif (x > 0 {\n  console.log(x);\n}\n// ✅ Fixed\nif (x > 0) {\n  console.log(x);\n}\n\n// ❌ Trailing comma in object\nconst obj = { a: 1, b: 2, }; // OK in modern JS\n\n// ❌ Template literal wrong\nconst msg = `Hello ${name}`; // ✅ use backticks',
      prevention:'Use a linter (ESLint) and an editor with syntax highlighting.'
    },
    fr:{
      explanation:'JavaScript a trouvé un caractère inattendu. C\'est généralement une faute de frappe — accolade manquante, virgule, ou guillemet.',
      cause:'Faute de frappe : `}` manquant, `)`, `,`, `:`, ou guillemets mal assortis.',
      fix:'// Erreurs de syntaxe courantes :\n\n// ❌ Accolade manquante\nif (x > 0 {\n// ✅ Corrigé\nif (x > 0) {\n\n// ❌ Mauvais template literal\nconst msg = "Bonjour " + nom;\n// ✅ Mieux\nconst msg = `Bonjour ${nom}`;',
      prevention:'Utilisez ESLint et un éditeur avec coloration syntaxique.'
    }
  },
  {
    match:/cors|cross.?origin|access.control.allow/i,
    type:'CORS Error',color:'#8b5cf6',
    en:{
      explanation:'Your browser blocked a request because the server did not include the proper CORS headers. This is a server-side configuration issue — not a bug in your JavaScript.',
      cause:'The API/server you are calling does not allow requests from your origin (domain).',
      fix:'// Option 1: Add CORS headers on your server (Node.js/Express)\nconst cors = require(\'cors\');\napp.use(cors({ origin: \'https://your-site.com\' }));\n\n// Option 2: Use a proxy in development\n// vite.config.js\nserver: {\n  proxy: {\n    \'/api\': \'http://your-api.com\'\n  }\n}\n\n// Option 3: Use a CORS proxy (not for production)\nfetch(\'https://corsproxy.io/?\' + encodeURIComponent(apiUrl))',
      prevention:'Configure CORS properly on your backend. Never use a public proxy in production.'
    },
    fr:{
      explanation:'Votre navigateur a bloqué une requête car le serveur n\'incluait pas les headers CORS appropriés. C\'est un problème de configuration côté serveur.',
      cause:'L\'API que vous appelez n\'autorise pas les requêtes depuis votre origine.',
      fix:'// Express.js:\nconst cors = require(\'cors\');\napp.use(cors({ origin: \'https://votre-site.com\' }));\n\n// Proxy de développement (vite.config.js):\nserver: { proxy: { \'/api\': \'http://votre-api.com\' } }',
      prevention:'Configurez CORS correctement sur votre backend.'
    }
  },
  {
    match:/404|not found|failed to fetch|networkerror/i,
    type:'Network Error',color:'#06b6d4',
    en:{
      explanation:'The resource you are trying to reach does not exist or cannot be reached. Either the URL is wrong, the server is down, or there is a network issue.',
      cause:'Wrong URL, server is offline, or the endpoint was renamed/deleted.',
      fix:'// Debug steps:\n// 1. Check the URL\nconsole.log(\'Fetching:\', url); // verify the URL\n\n// 2. Add error handling\ntry {\n  const res = await fetch(url);\n  if (!res.ok) throw new Error(`HTTP ${res.status}`);\n  const data = await res.json();\n} catch (err) {\n  console.error(\'Fetch failed:\', err.message);\n}\n\n// 3. Check response status\nfetch(url).then(r => {\n  console.log(\'Status:\', r.status);\n  return r.json();\n})',
      prevention:'Always handle fetch errors. Check API documentation for correct endpoints.'
    },
    fr:{
      explanation:'La ressource que vous cherchez n\'existe pas ou est inaccessible. L\'URL est incorrecte, le serveur est hors ligne, ou l\'endpoint a changé.',
      cause:'URL incorrecte, serveur hors ligne, ou endpoint renommé.',
      fix:'// Debug :\nconsole.log(\'Récupération :\', url);\n\n// Gestion d\'erreur :\ntry {\n  const res = await fetch(url);\n  if (!res.ok) throw new Error(`HTTP ${res.status}`);\n  const data = await res.json();\n} catch (err) {\n  console.error(\'Échec fetch :\', err.message);\n}',
      prevention:'Gérez toujours les erreurs fetch. Vérifiez la documentation de l\'API.'
    }
  },
  {
    match:/referenceerror|is not defined/i,
    type:'ReferenceError',color:'#f59e0b',
    en:{
      explanation:'You are trying to use a variable or function that has not been declared in the current scope. This often happens with typos, missing imports, or using a variable before it is declared.',
      cause:'Variable/function not declared, out of scope, or import missing.',
      fix:'// ❌ Using before declaration\nconsole.log(myVar); // ReferenceError!\nlet myVar = 5;\n\n// ✅ Declare before use\nlet myVar = 5;\nconsole.log(myVar);\n\n// ❌ Missing import\nmyFunction(); // not imported!\n\n// ✅ Add the import\nimport { myFunction } from \'./utils\';\nmyFunction();',
      prevention:'Always declare variables at the top of their scope. Use ESLint to catch missing imports.'
    },
    fr:{
      explanation:'Vous utilisez une variable ou fonction qui n\'est pas déclarée dans le scope actuel. Souvent un typo, import manquant, ou utilisation avant déclaration.',
      cause:'Variable non déclarée, hors de scope, ou import manquant.',
      fix:'// ❌ Utilisation avant déclaration\nconsole.log(maVar); // ReferenceError!\nlet maVar = 5;\n\n// ✅ Déclarez avant utilisation\nlet maVar = 5;\nconsole.log(maVar);\n\n// ✅ Ajoutez l\'import\nimport { maFonction } from \'./utils\';',
      prevention:'Déclarez toujours les variables en haut de leur scope. Utilisez ESLint.'
    }
  },
  {
    match:/maximum call stack|infinite loop|too much recursion/i,
    type:'Stack Overflow',color:'#ec4899',
    en:{
      explanation:'A function is calling itself (or a chain of functions) infinitely, using up all available memory in the call stack.',
      cause:'Missing base case in recursion, or an event listener triggering itself.',
      fix:'// ❌ Infinite recursion\nfunction count(n) {\n  return count(n - 1); // no stopping condition!\n}\n\n// ✅ Add a base case\nfunction count(n) {\n  if (n <= 0) return 0; // base case\n  return count(n - 1);\n}\n\n// ❌ useEffect infinite loop (React)\nuseEffect(() => {\n  setData(newData); // triggers re-render → re-triggers effect!\n});\n\n// ✅ Add dependencies array\nuseEffect(() => {\n  setData(newData);\n}, []); // empty = run once',
      prevention:'Always add a base case to recursive functions. In React, always specify useEffect dependencies.'
    },
    fr:{
      explanation:'Une fonction s\'appelle elle-même à l\'infini, épuisant toute la mémoire disponible dans la pile d\'appels.',
      cause:'Récursion sans cas de base, ou un écouteur d\'événement qui se déclenche lui-même.',
      fix:'// ❌ Récursion infinie\nfunction compter(n) {\n  return compter(n - 1); // pas de condition d\'arrêt!\n}\n\n// ✅ Ajoutez un cas de base\nfunction compter(n) {\n  if (n <= 0) return 0;\n  return compter(n - 1);\n}',
      prevention:'Ajoutez toujours un cas de base aux fonctions récursives.'
    }
  },
  {
    match:/promise|async|await|unhandled rejection/i,
    type:'Async Error',color:'#34d399',
    en:{
      explanation:'An asynchronous operation (Promise) failed and the error was not caught. This is one of the most common sources of silent bugs in JavaScript.',
      cause:'Missing `await`, no `.catch()`, or not using try/catch with async/await.',
      fix:'// ❌ Promise not handled\nfetch(url).then(r => r.json()); // error ignored!\n\n// ✅ Handle with .catch()\nfetch(url)\n  .then(r => r.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err));\n\n// ✅ Handle with async/await\nasync function getData() {\n  try {\n    const res = await fetch(url);\n    const data = await res.json();\n    return data;\n  } catch (err) {\n    console.error(\'Error:\', err);\n  }\n}',
      prevention:'Always handle Promise errors with .catch() or try/catch. Enable unhandledRejection listener in Node.js.'
    },
    fr:{
      explanation:'Une opération asynchrone (Promise) a échoué et l\'erreur n\'a pas été capturée.',
      cause:'`await` manquant, pas de `.catch()`, ou pas de try/catch.',
      fix:'// ✅ Gestion avec async/await :\nasync function getData() {\n  try {\n    const res = await fetch(url);\n    const data = await res.json();\n    return data;\n  } catch (err) {\n    console.error(\'Erreur :\', err);\n  }\n}',
      prevention:'Gérez toujours les erreurs Promise avec .catch() ou try/catch.'
    }
  },
  {
    match:/module not found|cannot find module|failed to resolve/i,
    type:'Module Error',color:'#818cf8',
    en:{
      explanation:'Node.js or your bundler cannot find the module you are trying to import. The package might not be installed or the path is wrong.',
      cause:'Package not installed, wrong path, or missing file extension.',
      fix:'// 1. Install the missing package\nnpm install package-name\n// or\nyarn add package-name\n\n// 2. Check the import path\nimport { func } from \'./utils\'; // relative path\nimport { func } from \'utils\';   // node_modules\n\n// 3. Check file extension\nimport App from \'./App\';    // .js, .jsx, .ts\nimport data from \'./data.json\'; // need JSON plugin\n\n// 4. Clear cache\nnpm run dev -- --force',
      prevention:'Always run `npm install` after cloning. Double-check import paths.'
    },
    fr:{
      explanation:'Node.js ou votre bundler ne trouve pas le module que vous importez. Le package n\'est peut-être pas installé.',
      cause:'Package non installé, chemin incorrect, ou extension manquante.',
      fix:'// 1. Installez le package manquant\nnpm install nom-du-package\n\n// 2. Vérifiez le chemin d\'import\nimport { func } from \'./utils\';\n\n// 3. Videz le cache\nnpm run dev -- --force',
      prevention:'Exécutez toujours `npm install` après un clone. Vérifiez les chemins d\'import.'
    }
  }
];

function detectPattern(errorText){
  var text=errorText.toLowerCase();
  for(var i=0;i<PATTERNS.length;i++){
    if(PATTERNS[i].match.test(text))return PATTERNS[i];
  }
  return null;
}

var lastError='';var lastCode='';var lastFix='';

function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(239,68,68,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(239,68,68,0.1),rgba(245,158,11,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#f87171;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:7px;';

  var errLabel=document.createElement('div');errLabel.style='font-size:10px;color:#64748b;font-weight:600;';errLabel.textContent=t('paste');body.appendChild(errLabel);
  var errTa=document.createElement('textarea');errTa.id='bug-error-input';errTa.value=lastError;errTa.placeholder=t('placeholder');errTa.rows=5;
  errTa.style='background:#0d1117;color:#f87171;border:1px solid rgba(239,68,68,0.2);border-radius:8px;padding:9px;font-size:9px;font-family:"JetBrains Mono",monospace;outline:none;resize:vertical;width:100%;box-sizing:border-box;line-height:1.5;';
  errTa.oninput=function(){lastError=this.value;};body.appendChild(errTa);

  var codeLabel=document.createElement('div');codeLabel.style='font-size:10px;color:#64748b;font-weight:600;';codeLabel.textContent=t('code');body.appendChild(codeLabel);
  var codeTa=document.createElement('textarea');codeTa.id='bug-code-input';codeTa.value=lastCode;codeTa.placeholder='// Optional: paste your code here...';codeTa.rows=3;
  codeTa.style='background:#0d1117;color:#c9d1d9;border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:9px;font-size:9px;font-family:"JetBrains Mono",monospace;outline:none;resize:vertical;width:100%;box-sizing:border-box;line-height:1.5;';
  codeTa.oninput=function(){lastCode=this.value;};body.appendChild(codeTa);

  // Actions
  var actRow=document.createElement('div');actRow.style='display:flex;gap:6px;';
  var fixBtn=document.createElement('button');fixBtn.innerHTML=t('btnFix');fixBtn.style='flex:1;background:linear-gradient(135deg,#7f1d1d,#ef4444);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(239,68,68,0.3);';
  var clearBtn=document.createElement('button');clearBtn.innerHTML=t('btnClear');clearBtn.style='background:rgba(255,255,255,0.04);color:#64748b;border:1px solid rgba(255,255,255,0.07);padding:10px 12px;border-radius:8px;font-size:10px;cursor:pointer;';
  clearBtn.onclick=function(){lastError='';lastCode='';errTa.value='';codeTa.value='';resultsDiv.innerHTML='';};
  actRow.appendChild(fixBtn);actRow.appendChild(clearBtn);body.appendChild(actRow);

  var resultsDiv=document.createElement('div');body.appendChild(resultsDiv);
  wrap.appendChild(body);parent.appendChild(wrap);

  fixBtn.onclick=function(){
    var errorText=errTa.value.trim();if(!errorText)return;
    lastError=errorText;lastCode=codeTa.value;
    resultsDiv.innerHTML='';
    var pattern=detectPattern(errorText);
    var lang=gl();

    if(!pattern){
      var noMatch=document.createElement('div');noMatch.style='background:rgba(100,116,139,0.1);border:1px solid rgba(100,116,139,0.2);border-radius:8px;padding:12px;font-size:10px;color:#94a3b8;text-align:center;';
      noMatch.innerHTML='🔍 '+t('noMatch')+'<br><br><span style="font-size:9px;color:#64748b;">Try: securityheaders.com, Stack Overflow, or MDN docs</span>';
      resultsDiv.appendChild(noMatch);return;
    }

    var d=pattern[lang]||pattern.en;
    lastFix=d.fix;

    // Type badge
    var badge=document.createElement('div');badge.style='display:inline-block;background:'+pattern.color+'20;color:'+pattern.color+';border:1px solid '+pattern.color+'44;border-radius:5px;padding:3px 10px;font-size:10px;font-weight:700;margin-bottom:4px;';badge.textContent='⚠️ '+pattern.type;
    resultsDiv.appendChild(badge);

    function mkCard(label,content,isCode){
      var card=document.createElement('div');card.style='background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:10px;';
      var lbl=document.createElement('div');lbl.style='font-size:10px;font-weight:700;color:'+pattern.color+';margin-bottom:6px;';lbl.textContent=label;
      var txt=document.createElement(isCode?'pre':'p');txt.style='font-size:'+(isCode?'8.5':'10')+'px;color:'+(isCode?'#c9d1d9':'#94a3b8')+';margin:0;line-height:1.6;'+(isCode?'font-family:"JetBrains Mono",monospace;overflow-x:auto;white-space:pre;background:#0d1117;padding:8px;border-radius:5px;':'');txt.textContent=content;
      card.appendChild(lbl);card.appendChild(txt);return card;
    }

    resultsDiv.appendChild(mkCard(t('explanation'),d.explanation,false));
    resultsDiv.appendChild(mkCard(t('cause'),d.cause,false));
    resultsDiv.appendChild(mkCard(t('fix'),d.fix,true));
    resultsDiv.appendChild(mkCard(t('prevention'),d.prevention,false));

    // Copy fix button
    var cpBtn=document.createElement('button');cpBtn.innerHTML=t('btnCopy');cpBtn.style='width:100%;background:rgba(239,68,68,0.12);color:#f87171;border:1px solid rgba(239,68,68,0.25);padding:8px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
    cpBtn.onclick=function(){navigator.clipboard.writeText(lastFix).then(function(){if(window.showToast)window.showToast(t('copied'));});};
    resultsDiv.appendChild(cpBtn);

    // Inject to editor button
    if(window.editor){
      var injBtn=document.createElement('button');injBtn.innerHTML='💉 Inject Fix to Editor';injBtn.style='width:100%;background:rgba(99,102,241,0.12);color:#818cf8;border:1px solid rgba(99,102,241,0.25);padding:8px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;margin-top:4px;';
      injBtn.onclick=function(){window.editor.setValue('// 🤖 AI Bug Fixer — Suggested Fix\n// Error: '+pattern.type+'\n\n'+lastFix);};
      resultsDiv.appendChild(injBtn);
    }
  };
}

document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-bugfix');if(el)el.textContent=t('tab');if(window.activeTab==='bugfix')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='bugfix'){window.activeTab='bugfix';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-bugfix');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
