'use strict';
/* IA Architecte — Code Studio Pro | EN/FR */

const LANG={en:{subtitle:'Professional Code Studio',tools:'Tools',preview:'Preview',tabAi:'AI',tabGuide:'Guide',tabSnip:'Snippets',tabTpl:'Templates',tabTools:'Tools',tabTPro:'Toolbox Pro',tabAPro:'Apps Pro',tabAppsUltra:'Apps Ultra',tabApps:'Apps',tabSites:'Sites',tabElite:'Elite',tabRealWorld:'RealWorld',tabModels:'Models',tabAudit:'Audit',tabAssets:'Assets',tabMedia:'Media',tabStyle:'Style Lab',tabTrans:'Transcode',tabGenius:'Genius',tabData:'Data Vault',tabSet:'Settings',tabGames:'Games Arcade',tabGamesPro:'Games Pro',hintAi:'Describe what you want to create.',hintSnip:'Click to insert at cursor.',hintTpl:'Click to load full template.',format:'Format',copy:'Copy',copied:'Copied!',save:'Save',load:'Load',export:'Export',exportAll:'Export All',deploy:'Deploy',run:'Run',autorun:'Auto-run',noIssues:'No issues',issues:'issue(s)',lines:'lines',chars:'chars',wordWrap:'Word Wrap',fontSize:'Font Size',theme:'Theme',dark:'Dark',light:'Light',hc:'HC Black',savedAt:'Saved',unsaved:'Unsaved',restore:'Restore Save',shortcuts:'Shortcuts',aiSend:'Send',explain:'Explain my code',fixErrors:'Fix errors',makeResponsive:'Make responsive',addAnimation:'Add animation',addDarkMode:'Dark mode',aiHow:'🤖 How does the AI work?',aiHowDesc:'Type what you want to create in English or French, then press ➤ or Enter. The AI generates HTML/CSS/JS components instantly.',aiExTags:['hero section','contact form','pricing table','navbar','dashboard','profile card','animated button','modal popup'],deployTitle:'🚀 Cloud Deployment',pubTitle:'Live Share',pubDesc:'Instant public URL via CodePen.',netTitle:'Professional Hosting',netDesc:'Prepare ZIP for Netlify Drop.',mobTitle:'Mobile Transformation',mobDesc:'Export as Installable App (Android/iOS).',mobileReady:'Mobile Build Ready! Check your downloads.',deployConn:'Connecting to Hub...',deployReady:'Cloud Sync Ready!',photoStudio:'Photo Studio',videoStudio:'Video Studio',importPhoto:'Import Photo',importVideo:'Importer Video',insertMedia:'Insert to Code',youtubeLink:'YouTube Link',rounded:'Rounded',shadow:'Shadow',grayscale:'Grayscale',sepia:'Sepia',autoplay:'Autoplay',loop:'Loop',muted:'Muted',processing:'Processing...',selectFirst:'Please select a file first.',dataVault:'Data Vault',genData:'Generate Data',dataType:'Data Type',entries:'Entries',inject:'Inject Data',magicBeautify:'Beautify',magicMobile:'Auto-Mobile',magicDark:'Dark Mode',magicSEO:'Smart SEO',magicLogic:'Magic Logic [PRO]',magicLogicDesc:'Auto-generate app logic',magicLab:'Style Lab',magicReal:'REAL MODE',magicExplain:'AI TUTOR',transStudio:'Transcode Studio',encode:'Encode',decode:'Decode',injectTrans:'Inject as Code',genSubtitle:'AI App Generator & Logic Wizard',genHint:'Exp: "Make a calculator with blue buttons"',genMarket:'Logic Marketplace',genPWA:'PWA Builder',genInject:'Inject Logic',dbExplorer:'Genius DB Explorer',refresh:'Refresh',exportData:'Export JSON',importData:'Import JSON',wipe:'Wipe Database',styleTuner:'Live Style Tuner',primary:'Primary Color',radius:'Border Radius',blur:'Glass Blur',resetStyles:'Reset Styles',globalize:'Globalize (EN/FR)',globalizeDone:'App translated successfully!',bizMarket:'Business Kits',loadGame:'Load Game',injectGame:'Inject Game',readmeTitle:'IA ARCHITECTE - PROJECT EXPORT',readmeApp:'This file is a standalone version of your application. You can open it directly in any browser.',readmeSource:'This folder contains the raw source code of your project. Use these files to continue development in professional editors like VS Code.',zipSuccess:'✓ ZIP (App+Code)!'},fr:{subtitle:'Studio Code Professionnel',tools:'Outils',preview:'Aperçu',tabAi:'IA',tabGuide:'Guide',tabSnip:'Extraits',tabTpl:'Modèles',tabTools:'Outils',tabTPro:'Toolbox Pro',tabAPro:'Apps Pro',tabAppsUltra:'Apps Ultra',tabApps:'Apps',tabSites:'Sites Web',tabElite:'Elite Apps',tabRealWorld:'RealWorld Pro',tabModels:'Modèles 3D',tabAudit:'Audit Pro',tabAssets:'Assets',tabMedia:'Média',tabStyle:'Style Pro',tabTrans:'Transcodage',tabGenius:'Génie AI',tabData:'Seuil de Données',tabSet:'Paramètres',tabGames:'Arcade Jeux',tabGamesPro:'Arcade Pro',hintAi:'Décrivez ce que vous voulez créer.',hintSnip:'Cliquez pour insérer au curseur.',hintTpl:'Cliquez pour charger le modèle.',format:'Formater',copy:'Copier',copied:'Copié!',save:'Sauver',load:'Charger',export:'Exporter',exportAll:'Tout Exporter',deploy:'Déployer',run:'Exécuter',autorun:'Auto-exec',noIssues:'Aucun problème',issues:'problème(s)',lines:'lignes',chars:'caractères',wordWrap:'Retour ligne',fontSize:'Taille police',theme:'Thème',dark:'Sombre',light:'Clair',hc:'HC Noir',savedAt:'Sauvé',unsaved:'Non sauvé',restore:'Restaurer',shortcuts:'Raccourcis',aiSend:'Envoyer',explain:'Expliquer mon code',fixErrors:'Corriger erreurs',makeResponsive:'Rendre responsive',addAnimation:'Ajouter animation',addDarkMode:'Mode sombre',aiHow:'🤖 Comment fonctionne l\'IA?',aiHowDesc:'Tapez ce que vous voulez créer en français ou anglais, puis cliquez sur ➤ ou Entrée. L\'IA génère des composants HTML/CSS/JS instantanément.',aiExTags:['section hero','formulaire contact','tableau de prix','barre navigation','tableau de bord','carte profil','bouton animé','modale popup'],deployTitle:'🚀 Déploiement Cloud',pubTitle:'Lien Public (Live)',pubDesc:'URL publique instantanée via CodePen.',netTitle:'Hébergement Pro',netDesc:'Préparer ZIP pour Netlify Drop.',mobTitle:'Transformation Mobile',mobDesc:'Exporter en App Installable (Android/iOS).',mobileReady:'Build Mobile Prêt ! Vidifiez vos téléchargements.',deployConn:'Connexion au Hub...',deployReady:'Synchronisation Cloud Prête!',photoStudio:'Studio Photo',videoStudio:'Studio Vidéo',importPhoto:'Importer Photo',importVideo:'Importer Vidéo',insertMedia:'Insérer au Code',youtubeLink:'Lien YouTube',rounded:'Arrondi',shadow:'Ombre',grayscale:'Gris',sepia:'Sépia',autoplay:'Lecture Auto',loop:'Boucle',muted:'Muet',processing:'Traitement...',selectFirst:'Veuillez d\'abord choisir un fichier.',dataVault:'Seuil de Données',genData:'Générer Données',dataType:'Type de Données',entries:'Entrées',inject:'Injecter Données',magicBeautify:'Embellir',magicMobile:'Auto-Mobile',magicDark:'Mode Sombre',magicSEO:'Smart SEO',magicLogic:'Logique Magique [PRO]',magicLogicDesc:'Auto-générer la logique',magicLab:'Lab Style',magicReal:'MODE RÉEL',magicExplain:'ASSISTANT AI',transStudio:'Studio Transcodage',encode:'Coder',decode:'Décoder',injectTrans:'Injecter le Code',genSubtitle:'Générateur d\'Applications AI & Magic Logic',genHint:'Ex: "Faire une calculatrice avec des boutons bleus"',genMarket:'Librarie de Logique',genPWA:'Créateur de PWA',genInject:'Injecter Logique',dbExplorer:'Explorateur GeniusDB',refresh:'Actualiser',exportData:'Exporter JSON',importData:'Importer JSON',wipe:'Vider la Base',styleTuner:'Éditeur de Style Live',primary:'Couleur Primaire',radius:'Rayon Bordure',blur:'Flou Verre',resetStyles:'Réinitialiser Style',globalize:'Globaliser (EN/FR)',globalizeDone:'Application traduite avec succès !',bizMarket:'Packs Business',loadGame:'Charger Jeu',injectGame:'Injecter Jeu',readmeTitle:'IA ARCHITECTE - EXPORTATION DE PROJET',readmeApp:'Ce fichier est une version autonome de votre application. Vous pouvez l\'ouvrir directement dans n\'importe quel navigateur.',readmeSource:'Ce dossier contient le code source brut de votre projet. Utilisez ces fichiers pour continuer le développement dans des éditeurs professionnels comme VS Code.',zipSuccess:'✓ ZIP (App+Code)!'}};

/* ── Core Utilities ──────────────────────────────── */
function insertAtCursor(text) {
  if(!window.editor) return;
  const selection = window.editor.getSelection();
  const range = new monaco.Range(selection.startLineNumber, selection.startColumn, selection.endLineNumber, selection.endColumn);
  window.editor.executeEdits('', [{ range: range, text: text, forceMoveMarkers: true }]);
  window.editor.pushUndoStop();
}
window.insertAtCursor = insertAtCursor;

function showToast(msg) {
  const tDiv = document.createElement('div');
  tDiv.style = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--accent);color:#fff;padding:12px 24px;border-radius:12px;z-index:99999;font-weight:700;box-shadow:0 10px 30px rgba(0,0,0,0.5);animation:slideUp 0.3s forwards;';
  tDiv.textContent = msg;
  document.body.appendChild(tDiv);
  setTimeout(() => { tDiv.style.animation = 'slideDown 0.3s forwards'; setTimeout(() => tDiv.remove(), 300); }, 3000);
}
window.showToast = showToast;

function smartInject(text, type) {
  const ed = window.editor || (typeof editor !== 'undefined' ? editor : null);
  if(!ed) return;
  const model = ed.getModel();
  const cur = model.getValue();
  
  if(type === 'logic') {
    const bodyIdx = cur.toLowerCase().indexOf('</body>');
    if(bodyIdx !== -1) {
      const pos = model.getPositionAt(bodyIdx);
      ed.executeEdits('smart-inject', [{
        range: new monaco.Range(pos.lineNumber, pos.column, pos.lineNumber, pos.column),
        text: text + '\n'
      }]);
    } else {
      const endPos = model.getFullModelRange().getEndPosition();
      ed.executeEdits('smart-inject', [{
        range: new monaco.Range(endPos.lineNumber, endPos.column, endPos.lineNumber, endPos.column),
        text: '\n' + text
      }]);
    }
  } else {
    insertAtCursor('\n' + text + '\n');
  }
  
  ed.pushUndoStop();
  if(window.runPreview) window.runPreview();
  else if(typeof runPreview !== 'undefined') runPreview();
}
window.smartInject = smartInject;


/**
 * 💉 INJECT FULL TEMPLATE (V3 — PROXY SANDBOX)
 * Best-in-class isolation: Keeps original game code UNTOUCHED.
 * Uses a "Virtual Document" proxy to redirect ID lookups to isolated elements.
 */
function injectFullTemplate(gameCode) {
  if(!editor) return;
  const model = editor.getModel();
  const cur = model.getValue();
  const uid = 'ia' + Math.floor(Math.random() * 9999);

  // 1. Extract CSS
  const styleMatch = gameCode.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  let newStyle = styleMatch ? styleMatch[1].trim() : '';

  // 2. Extract Body (excluding scripts)
  let newBody = gameCode.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  newBody = newBody ? newBody[1] : '';
  newBody = newBody.replace(/<script[\s\S]*?<\/script>/gi, '').trim();

  // 3. Extract Scripts
  const scriptMatches = gameCode.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
  let scriptContent = scriptMatches ? scriptMatches.map(s => {
    return s.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');
  }).join('\n;\n') : '';

  // 🧪 [SANDBOXING V3.1] — Function Export logic
  // Find top-level functions to expose them to HTML onclick attributes
  const funcNames = [];
  const funcRegex = /function\s+([a-zA-Z0-9_$]+)\s*\(/g;
  let match;
  while ((match = funcRegex.exec(scriptContent)) !== null) {
    if(!funcNames.includes(match[1])) funcNames.push(match[1]);
  }
  const varFuncRegex = /(?:const|let|var)\s+([a-zA-Z0-9_$]+)\s*=\s*(?:function|\([^)]*\)\s*=>)/g;
  while ((match = varFuncRegex.exec(scriptContent)) !== null) {
    if(!funcNames.includes(match[1])) funcNames.push(match[1]);
  }

  // 🧪 [SANDBOXING V3.5] — HTML Attribute Prefixing (Robust version)
  // We use a specific replacement function to avoid quote duplication
  newBody = newBody.replace(/id=(['"])(.*?)\1/gi, (m, q, id) => `id="${uid}-${id}"`);
  newBody = newBody.replace(/for=(['"])(.*?)\1/gi, (m, q, id) => `for="${uid}-${id}"`);
  
  // Prefix function calls in on... attributes (ensuring we don't break the string)
  funcNames.forEach(fn => {
    const attrRegex = new RegExp(`on([a-z]+)=(['"])(.*?)(${fn})(\\s*\\()`, 'gi');
    newBody = newBody.replace(attrRegex, (m, ev, q, pre, name, post) => `on${ev}="${pre}window['${uid}_${name}']${post}"`);
  });

  // 🧪 [SANDBOXING V3.2] — CSS Sanitizer (Fixing layout conflicts)
  if(newStyle) {
    newStyle = newStyle
      .replace(/#([a-zA-Z0-9_-]+)(?=[^{}]*{)/g, `#${uid}-$1`) // Prefix IDs in selectors
      .replace(/([^\r\n,{}]+)(?=[^{}]*{)/g, (m) => {
        if(m.includes('@') || m.includes('from') || m.includes('to') || m.includes('%')) return m;
        let sel = m.trim().replace(/\s+/g, ' ');
        
        // Map body/html to container (REPLACE, don't just prefix)
        if(/\b(body|html)\b/gi.test(sel)) {
            return sel.replace(/\b(body|html)\b/gi, `#${uid}`) + '{ background: var(--ia-game-bg) !important; } ' + sel.replace(/\b(body|html)\b/gi, `#${uid}`);
        }
        return `#${uid} ` + sel;
      })
      // Strip layout-breaking constraints
      .replace(/height:\s*[0-9]+vh;?/gi, 'min-height:300px;')
      .replace(/display:\s*flex;?/gi, (match, offset, string) => {
        const block = string.slice(0, offset);
        if(block.includes(`#${uid} {`) || block.includes(`#${uid}{`)) return 'display:block;';
        return match;
      });
  }

  // 🧪 [SANDBOXING V3.3] — The PROXY ENGINE
  const wrappedBody = `
<!-- ── IA ARCADE GAME START [${uid}] ── -->
<div id="${uid}" class="ia-arcade-injected" 
     style="position:relative; margin:40px auto; border-top:1px solid rgba(255,255,255,0.08); background:var(--ia-game-bg, #0f172a); 
            min-height:400px; width:100%; max-width:1000px; display:block; overflow:visible; border-radius:16px; 
            box-shadow:0 20px 80px rgba(0,0,0,0.5); color:#fff; font-family:sans-serif;
            text-align:center; padding:30px 20px; clear:both;">
  
  <style>
    /* 🛸 Proxy Stage Scoping [${uid}] */
    #${uid} { --ia-game-bg: #0f172a; }
    #${uid} canvas { max-width: 100%; height: auto; display: block; border-radius: 12px; box-shadow: 0 15px 35px rgba(0,0,0,0.5); z-index: 10; margin: 20px auto; pointer-events: auto; }
    #${uid} .info, #${uid} .score-container, #${uid} .score-board, #${uid} h1, #${uid} .hud, #${uid} .score, #${uid} .hint { 
      position: relative !important; top: 0 !important; left: 0 !important; width:100% !important; text-align:center !important; 
      z-index: 20; color: #fff; display:flex !important; justify-content:center !important; margin: 10px 0 !important; transform:none !important;
    }
    #${uid} .game-over, #${uid} #msg { position: absolute !important; top:50%; left:50%; transform:translate(-50%, -50%) !important; z-index: 100 !important; border-radius: 16px; min-width:280px; }
    ${newStyle}
  </style>
  
  ${newBody}
  
  <script>
    (function(){
      const _realDoc = window.document;
      const _root = _realDoc.getElementById("${uid}");
      
      // 🛡️ [ARCADE PROXY V3.3] — Wait for DOM
      const initGame = () => {
          const document = {
            getElementById: (id) => _realDoc.getElementById("${uid}-" + id) || _realDoc.getElementById(id),
            querySelector: (s) => (s && s.startsWith('#')) ? (_realDoc.getElementById("${uid}-" + s.slice(1)) || _realDoc.querySelector(s)) : _root.querySelector(s),
            querySelectorAll: (s) => (s && s.startsWith('#')) ? _realDoc.querySelectorAll("#${uid}-" + s.slice(1)) : _root.querySelectorAll(s),
            createElement: (t) => _realDoc.createElement(t),
            get body() { return _root; },
            get documentElement() { return _root; },
            addEventListener: (...a) => _realDoc.addEventListener(...a),
            removeEventListener: (...a) => _realDoc.removeEventListener(...a)
          };
          
          const location = { reload: () => { if(window.parent && window.parent.runPreview) window.parent.runPreview(); else _realDoc.location.reload(); } };

          console.log('[ARCADE V3.5] Initializing game ${uid}');

          try {
              // 🧱 ORIGINAL GAME CODE (UNTOUCHED)
              ${scriptContent}
              // 🧱 END ORIGINAL GAME CODE

              // 💉 EXPORT FUNCTIONS & IDS
              [${funcNames.map(n => `'${n}'`).join(',')}].forEach(fn => {
                try { const v = eval(fn); if(typeof v === 'function') window['${uid}_' + fn] = v; } catch(e){}
              });
              
              _root.querySelectorAll('[id^="${uid}-"]').forEach(el => {
                const rawId = el.id.replace("${uid}-", "");
                window[rawId] = el;
              });
          } catch(e) { console.error("Arcade Init Error:", e); }
      };

      if (_root) setTimeout(initGame, 100);
      else _realDoc.addEventListener('DOMContentLoaded', initGame);
    })();
  <\/script>
</div>
<!-- ── IA ARCADE GAME END ── -->\n`;

  // 🧪 [SANDBOXING V3.5] — PRE-CLEANUP
  // Remove any previous arcade injections to prevent ID collisions and DOM bloat
  const cleanCode = cur.replace(/<!-- ── IA ARCADE GAME START [\s\S]*?<!-- ── IA ARCADE GAME END ── -->\n/g, '');
  if(cleanCode !== cur) {
    editor.setValue(cleanCode);
  }

  const edits = [];
  const updatedCur = editor.getValue();
  const bodyIdx = updatedCur.indexOf('</body>');
  if(bodyIdx !== -1) {
    const bPos = model.getPositionAt(bodyIdx);
    edits.push({
      range: new monaco.Range(bPos.lineNumber, bPos.column, bPos.lineNumber, bPos.column),
      text: wrappedBody
    });
  } else {
    const endPos = model.getFullModelRange().getEndPosition();
    edits.push({
      range: new monaco.Range(endPos.lineNumber, endPos.column, endPos.lineNumber, endPos.column),
      text: wrappedBody
    });
  }

  editor.executeEdits('inject-arcade', edits);
  editor.pushUndoStop();
  
  setTimeout(() => runPreview(), 300);
  showToast(window.lang === 'fr' ? '🎮 Jeu injecté (V3.5 Fix) !' : '🎮 Game injected (V3.5 Fix)!');
}


const DEFAULT_CODE=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>IA Architecte</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Inter',sans-serif;background:linear-gradient(135deg,#080c14,#0f1a30);color:#e2e8f0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:40px 20px}
    .card{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:48px 40px;max-width:520px;width:100%;text-align:center;backdrop-filter:blur(12px);box-shadow:0 25px 50px rgba(0,0,0,.4)}
    .icon{font-size:52px;margin-bottom:20px}
    h1{font-size:32px;font-weight:800;margin-bottom:12px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    p{color:#94a3b8;line-height:1.7;font-size:15px;margin-bottom:24px}
    .btn{display:inline-block;padding:13px 30px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#fff;border:none;border-radius:12px;font-weight:700;font-size:15px;cursor:pointer;transition:all .2s;box-shadow:0 8px 24px rgba(59,130,246,.35)}
    .btn:hover{transform:translateY(-2px);box-shadow:0 14px 32px rgba(59,130,246,.45)}
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">🏛️</div>
    <h1>IA Architecte</h1>
    <p>Bienvenue dans Code Studio Pro. Utilisez l'IA pour créer votre interface personnalisée.</p>
    <button class="btn" onclick="this.textContent='✓ Let\\'s Go!'">✨ Get Started</button>
  </div>
</body>
</html>`;

const SNIPPETS=[
  {icon:'🔵',en:'Button',fr:'Bouton',code:`
<button style="padding:11px 24px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#fff;border:none;border-radius:9px;font-weight:700;font-size:14px;cursor:pointer;box-shadow:0 6px 18px rgba(59,130,246,.35);transition:all .2s"
        onmouseover="this.style.transform='translateY(-2px)'"
        onmouseout="this.style.transform=''">
  Click Me
</button>`},
  {icon:'🃏',en:'Card',fr:'Carte',code:`
<div style="padding:28px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:18px;backdrop-filter:blur(12px);max-width:360px;box-shadow:0 12px 32px rgba(0,0,0,.3);">
  <h3 style="font-size:20px;font-weight:800;margin-bottom:8px;">Card Title</h3>
  <p style="color:#94a3b8;font-size:14px;line-height:1.7;margin-bottom:20px;">Your content here.</p>
  <button style="padding:9px 20px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#fff;border:none;border-radius:8px;font-weight:700;cursor:pointer;">Learn More</button>
</div>`},
  {icon:'↔️',en:'Flex Row',fr:'Ligne Flex',code:`
<div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap;">
  <div style="padding:12px 20px;background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.2);border-radius:9px;font-weight:600;">Item 1</div>
  <div style="padding:12px 20px;background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.2);border-radius:9px;font-weight:600;">Item 2</div>
  <div style="padding:12px 20px;background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.2);border-radius:9px;font-weight:600;">Item 3</div>
</div>`},
  {icon:'⊞',en:'Grid 3-col',fr:'Grille 3 col',code:`
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:14px;">
  <div style="padding:20px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;text-align:center;">Col 1</div>
  <div style="padding:20px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;text-align:center;">Col 2</div>
  <div style="padding:20px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;text-align:center;">Col 3</div>
</div>`},
  {icon:'⚠️',en:'Alert',fr:'Alerte',code:`
<div style="padding:13px 18px;background:rgba(16,185,129,.1);border:1px solid rgba(16,185,129,.22);border-radius:10px;color:#10b981;display:flex;align-items:center;gap:12px;font-size:14px;font-weight:600;">
  <span>✓</span><span>Operation completed successfully!</span>
  <button onclick="this.parentElement.remove()" style="margin-left:auto;background:none;border:none;color:#10b981;cursor:pointer;font-size:18px;">×</button>
</div>`},
  {icon:'✏️',en:'Input Field',fr:'Champ Saisie',code:`
<div style="display:flex;flex-direction:column;gap:6px;max-width:320px;">
  <label style="font-size:11px;font-weight:700;color:#7a8fa8;text-transform:uppercase;letter-spacing:.06em;">Label</label>
  <input type="text" placeholder="Type here..." style="padding:11px 14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:9px;color:#e2e8f0;font-size:14px;outline:none;transition:border .2s"
         onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='rgba(255,255,255,.12)'" />
</div>`},
  {icon:'📊',en:'Progress Bar',fr:'Barre Progrès',code:`
<div style="display:flex;flex-direction:column;gap:12px;max-width:400px;">
  <div>
    <div style="display:flex;justify-content:space-between;margin-bottom:5px;font-size:13px;"><span>HTML/CSS</span><span style="color:#3b82f6">85%</span></div>
    <div style="height:7px;background:rgba(255,255,255,.07);border-radius:99px;overflow:hidden">
      <div style="width:85%;height:100%;background:linear-gradient(90deg,#3b82f6,#8b5cf6);border-radius:99px;"></div>
    </div>
  </div>
  <div>
    <div style="display:flex;justify-content:space-between;margin-bottom:5px;font-size:13px;"><span>JavaScript</span><span style="color:#10b981">70%</span></div>
    <div style="height:7px;background:rgba(255,255,255,.07);border-radius:99px;overflow:hidden">
      <div style="width:70%;height:100%;background:linear-gradient(90deg,#10b981,#34d399);border-radius:99px;"></div>
    </div>
  </div>
</div>`},
  {icon:'🧭',en:'Navbar Pro',fr:'Menu Nav Pro',code:`
<nav style="display:flex;align-items:center;justify-content:space-between;padding:14px 28px;background:rgba(13,19,31,.95);border-bottom:1px solid rgba(255,255,255,.07);backdrop-filter:blur(14px);">
  <span style="font-weight:900;font-size:18px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">🏛️ Logo</span>
  <button style="padding:9px 20px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#fff;border:none;border-radius:9px;font-weight:700;cursor:pointer;">Get Started</button>
</nav>`},
  {icon:'📌',en:'Badges',fr:'Badges',code:`
<div style="display:flex;gap:8px;flex-wrap:wrap;">
  <span style="padding:4px 10px;background:rgba(59,130,246,.1);border:1px solid rgba(59,130,246,.2);color:#3b82f6;border-radius:20px;font-size:10px;font-weight:800;">NEW</span>
  <span style="padding:4px 10px;background:rgba(16,185,129,.1);border:1px solid rgba(16,185,129,.2);color:#10b981;border-radius:20px;font-size:10px;font-weight:800;">ACTIVE</span>
</div>`},
  {icon:'🪟',en:'Modal Overlay',fr:'Fenêtre Modale',code:`
<button onclick="document.getElementById('m1').style.display='flex'" style="padding:11px 24px;background:#3b82f6;color:#fff;border:none;border-radius:9px;font-weight:700;cursor:pointer;">Open Modal</button>
<div id="m1" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.75);backdrop-filter:blur(6px);align-items:center;justify-content:center;z-index:9999"
     onclick="if(event.target===this)this.style.display='none'">
  <div style="background:#0f1521;border:1px solid rgba(255,255,255,.1);border-radius:18px;padding:36px;max-width:420px;width:90%;box-shadow:0 30px 60px rgba(0,0,0,.6);">
    <h3 style="font-size:20px;font-weight:800;margin-bottom:10px;">Modal Title</h3>
    <p style="color:#94a3b8;font-size:14px;line-height:1.7;margin-bottom:24px;">Content goes here. Click outside to close.</p>
    <button onclick="document.getElementById('m1').style.display='none'"
            style="padding:9px 18px;background:#3b82f6;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:700">Confirm</button>
  </div>
</div>`},
  {icon:'🔍',en:'Search Glass',fr:'Recherche Verre',code:`
<div style="position:relative;max-width:400px;">
  <input type="text" placeholder="Search anything..."
         style="width:100%;padding:14px 20px 14px 45px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:15px;color:#fff;backdrop-filter:blur(10px);outline:none;">
  <span style="position:absolute;left:18px;top:50%;transform:translateY(-50%);opacity:0.5;">🔍</span>
</div>`},
  {icon:'🔘',en:'iOS Toggle',fr:'Interrupteur iOS',code:`
<label style="display:inline-flex;align-items:center;cursor:pointer;gap:12px;font-weight:600;">
  <div style="width:50px;height:26px;background:#333;border-radius:20px;position:relative;transition:0.3s;"
       onclick="const d=this.firstChild; const on=d.style.left==='26px'; d.style.left=on?'2px':'26px'; this.style.background=on?'#333':'#10b981';">
    <div style="width:22px;height:22px;background:#fff;border-radius:50%;position:absolute;top:2px;left:2px;transition:0.3s;"></div>
  </div>
  <span>Toggle Me</span>
</label>`},
  {icon:'🗂️',en:'Accordion',fr:'Accordéon',code:`
<div style="background:#0f172a;border:1px solid #1e293b;border-radius:12px;overflow:hidden;max-width:400px;">
  <div style="padding:15px;cursor:pointer;border-bottom:1px solid #1e293b;font-weight:700;display:flex;justify-content:space-between;"
       onclick="const c=this.nextElementSibling; c.style.display=c.style.display==='none'?'block':'none';">
    <span>What is Genius?</span><span>▼</span>
  </div>
  <div style="padding:15px;display:none;color:#94a3b8;font-size:14px;line-height:1.6;">
    The Genius Engine is our advanced AI logic layer for building professional apps instantly.
  </div>
</div>`},
  {icon:'🏷️',en:'Tooltip Pro',fr:'Info-bulle Pro',code:`
<div style="position:relative;display:inline-block;" onmouseover="this.lastChild.style.display='block'" onmouseout="this.lastChild.style.display='none'">
  <button style="padding:8px 15px;background:#1e293b;color:#fff;border:none;border-radius:8px;cursor:help;">Hover Help</button>
  <div style="display:none;position:absolute;bottom:125%;left:50%;transform:translateX(-50%);padding:8px 12px;background:#000;color:#fff;border-radius:6px;font-size:11px;white-space:nowrap;z-index:100;box-shadow:0 10px 20px rgba(0,0,0,0.5);">
    Need help with this? (Besoin d'aide?)
  </div>
</div>`},
  {icon:'🎚️',en:'Price Range',fr:'Curseur Prix',code:`
<div style="max-width:300px;">
  <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:12px;font-weight:800;">
    <span>Price Range</span><span style="color:#3b82f6">$<span id="price-val">500</span></span>
  </div>
  <input type="range" min="0" max="1000" value="500" style="width:100%;accent-color:#3b82f6;cursor:pointer;"
         oninput="document.getElementById('price-val').innerText=this.value">
</div>`},
  {icon:'📑',en:'Tabs Premium',fr:'Onglets Premium',code:`
<div style="max-width:500px;">
  <div style="display:flex;gap:5px;background:rgba(255,255,255,0.05);padding:5px;border-radius:12px;">
    <button style="flex:1;padding:10px;border:none;border-radius:8px;background:#3b82f6;color:#fff;font-weight:700;cursor:pointer;">Tab A</button>
    <button style="flex:1;padding:10px;border:none;border-radius:8px;background:transparent;color:#94a3b8;font-weight:700;cursor:pointer;" onclick="alert('Switching Tab...')">Tab B</button>
  </div>
</div>`},
  {icon:'🥖',en:'Breadcrumbs',fr:'Fil d\'Ariane',code:`
<div style="display:flex;gap:10px;align-items:center;font-size:13px;color:#64748b;font-weight:600;">
  <span style="cursor:pointer;color:#3b82f6;">Home</span><span>/</span>
  <span style="cursor:pointer;color:#3b82f6;">Projects</span><span>/</span>
  <span>Studio</span>
</div>`},
  {icon:'🔢',en:'Paginate Pro',fr:'Pagination Pro',code:`
<div style="display:flex;gap:8px;">
  <button style="width:36px;height:36px;border:1px solid #1e293b;background:#0f172a;color:#fff;border-radius:8px;cursor:pointer;">&laquo;</button>
  <button style="width:36px;height:36px;border:none;background:#3b82f6;color:#fff;border-radius:8px;font-weight:800;">1</button>
  <button style="width:36px;height:36px;border:1px solid #1e293b;background:#0f172a;color:#fff;border-radius:8px;cursor:pointer;">2</button>
  <button style="width:36px;height:36px;border:1px solid #1e293b;background:#0f172a;color:#fff;border-radius:8px;cursor:pointer;">&raquo;</button>
</div>`},
  {icon:'🛎️',en:'Toast Float',fr:'Notification Float',code:`
<div style="display:flex;align-items:center;gap:12px;padding:16px 20px;background:#10b981;color:#fff;border-radius:15px;box-shadow:0 15px 35px rgba(16,185,129,0.3);font-weight:700;animation:slideUp 0.3s forwards;">
  <span>🔔</span><span>Message sent successfully! (Envoyé!)</span>
</div>`},
  {icon:'🌀',en:'Glass Loader',fr:'Chargement Verre',code:`
<div style="display:flex;flex-direction:column;align-items:center;gap:15px;padding:30px;background:rgba(255,255,255,0.03);backdrop-filter:blur(10px);border-radius:20px;border:1px solid rgba(255,255,255,0.1);">
  <div style="width:40px;height:40px;border:4px solid rgba(59,130,246,0.1);border-top:4px solid #3b82f6;border-radius:50%;animation:spin 1s linear infinite;"></div>
  <span style="font-size:12px;font-weight:800;letter-spacing:1px;color:#3b82f6;">SYNCING DATA...</span>
</div>`},
  {icon:'💀',en:'Skeleton Line',fr:'Squelette',code:`
<div style="max-width:300px;display:flex;flex-direction:column;gap:10px;">
  <div style="width:100%;height:15px;background:rgba(255,255,255,0.05);border-radius:5px;overflow:hidden;position:relative;">
    <div style="position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent);animation:slideLeft 1.5s infinite;"></div>
  </div>
  <div style="width:60%;height:15px;background:rgba(255,255,255,0.05);border-radius:5px;overflow:hidden;position:relative;">
    <div style="position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent);animation:slideLeft 1.5s infinite;"></div>
  </div>
</div>`},
  {icon:'🛒',en:'Product Card',fr:'Carte Produit',code:`
<div style="max-width:280px;background:#0f172a;border:1px solid #1e293b;border-radius:18px;overflow:hidden;transition:0.3s;"
     onmouseover="this.style.borderColor='#3b82f6'" onmouseout="this.style.borderColor='#1e293b'">
  <div style="height:180px;background:#1e293b;display:flex;align-items:center;justify-content:center;font-size:50px;">🎒</div>
  <div style="padding:20px;">
    <div style="font-size:16px;font-weight:800;margin-bottom:5px;">Explorer Pack</div>
    <div style="color:#3b82f6;font-size:18px;font-weight:900;margin-bottom:15px;">$89.00</div>
    <button style="width:100%;padding:12px;background:#3b82f6;color:#fff;border:none;border-radius:10px;font-weight:800;cursor:pointer;">Add to Cart</button>
  </div>
</div>`},
  {icon:'💬',en:'Quote Pro',fr:'Témoignage Pro',code:`
<div style="padding:25px;background:rgba(59,130,246,0.05);border-left:4px solid #3b82f6;border-radius:0 15px 15px 0;max-width:500px;">
  <p style="font-style:italic;color:#e2e8f0;line-height:1.6;margin-bottom:15px;">"This IDE completely changed my workflow. The Genius Engine is truly state of the art."</p>
  <div style="display:flex;align-items:center;gap:12px;">
    <div style="width:40px;height:40px;background:#3b82f6;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;">JS</div>
    <div style="font-size:13px;font-weight:700;">John Smith <span style="color:#64748b;font-weight:400;display:block;">CEO, TechFlow</span></div>
  </div>
</div>`},
  {icon:'👤',en:'Bio Profil',fr:'Bio Profil',code:`
<div style="max-width:350px;text-align:center;padding:30px;background:#0f172a;border:1px solid #1e293b;border-radius:25px;">
  <div style="width:80px;height:80px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);border-radius:50%;margin:0 auto 15px;display:flex;align-items:center;justify-content:center;font-size:32px;">👨‍💻</div>
  <h3 style="margin-bottom:5px;">Alex Rivera</h3>
  <p style="font-size:13px;color:#94a3b8;margin-bottom:20px;">Full-stack Developer & UI Enthusiast. Loving IA Architecte!</p>
  <div style="display:flex;justify-content:center;gap:10px;">
    <button style="padding:8px 15px;background:#1e293b;border:none;border-radius:8px;color:#fff;font-size:11px;font-weight:700;cursor:pointer;">Follow</button>
    <button style="padding:8px 15px;background:transparent;border:1px solid #1e293b;border-radius:8px;color:#94a3b8;font-size:11px;font-weight:700;cursor:pointer;">Message</button>
  </div>
</div>`},
  {icon:'📈',en:'Stat Trend',fr:'Badge Stat',code:`
<div style="display:flex;align-items:center;gap:15px;padding:15px 20px;background:#0f172a;border-radius:15px;border:1px solid #1e293b;display:inline-flex;">
  <div style="width:40px;height:40px;background:rgba(16,185,129,0.1);color:#10b981;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;">&nearr;</div>
  <div>
    <div style="font-size:10px;color:#64748b;font-weight:800;text-transform:uppercase;">Monthly Sales</div>
    <div style="font-size:18px;font-weight:900;">$14,290 <span style="color:#10b981;font-size:12px;margin-left:5px;">+12%</span></div>
  </div>
</div>`},
  {icon:'📊',en:'SVG Bar Chart',fr:'Graphique Barres',code:`
<div style="background:#0f172a;padding:20px;border-radius:15px;border:1px solid #1e293b;max-width:250px;">
  <div style="display:flex;align-items:flex-end;gap:8px;height:60px;">
    <div style="flex:1;background:#3b82f6;height:40%;border-radius:4px 4px 0 0;"></div>
    <div style="flex:1;background:#3b82f6;height:70%;border-radius:4px 4px 0 0;"></div>
    <div style="flex:1;background:#3b82f6;height:100%;border-radius:4px 4px 0 0;"></div>
    <div style="flex:1;background:#3b82f6;height:60%;border-radius:4px 4px 0 0;"></div>
    <div style="flex:1;background:#3b82f6;height:85%;border-radius:4px 4px 0 0;"></div>
  </div>
  <div style="margin-top:10px;font-size:11px;font-weight:700;text-align:center;color:#64748b;">WEEKLY ACTIVITY</div>
</div>`},
  {icon:'🥧',en:'Pie Chart',fr:'Camembert',code:`
<div style="display:flex;align-items:center;gap:15px;padding:20px;background:#0f172a;border-radius:20px;border:1px solid #1e293b;">
  <div style="width:60px;height:60px;border-radius:50%;background:conic-gradient(#3b82f6 70%, #1e293b 0);"></div>
  <div>
    <div style="font-size:24px;font-weight:900;">70%</div>
    <div style="font-size:11px;color:#94a3b8;font-weight:600;">Server Load</div>
  </div>
</div>`},
  {icon:'💎',en:'Pricing Tier',fr:'Plan Tarif',code:`
<div style="max-width:300px;background:linear-gradient(135deg,#0f172a,#1e1b4b);border:2px solid #3b82f6;padding:40px 30px;border-radius:25px;text-align:center;box-shadow:0 20px 40px rgba(59,130,246,0.2);">
  <div style="font-size:12px;font-weight:900;color:#3b82f6;letter-spacing:2px;margin-bottom:10px;">PREMIUM</div>
  <div style="font-size:48px;font-weight:900;margin-bottom:20px;">$49<span style="font-size:16px;color:#64748b;">/mo</span></div>
  <button style="width:100%;padding:15px;background:#3b82f6;color:#fff;border:none;border-radius:12px;font-weight:900;cursor:pointer;box-shadow:0 8px 20px rgba(59,130,246,0.4);">UPGRADE NOW</button>
</div>`},
  {icon:'🎥',en:'Video Box',fr:'Boîte Vidéo',code:`
<div style="width:100%;max-width:500px;aspect-ratio:16/9;background:#000;border-radius:15px;overflow:hidden;position:relative;border:1px solid #1e293b;">
  <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.4);cursor:pointer;" onclick="alert('Play Video')">
    <div style="width:60px;height:60px;background:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;padding-left:5px;font-size:24px;color:#000;">▶</div>
  </div>
</div>`},
  {icon:'🖼️',en:'Hover Zoom',fr:'Zoom Image',code:`
<div style="width:300px;height:200px;border-radius:15px;overflow:hidden;position:relative;cursor:pointer;">
  <div style="width:100%;height:100%;background:url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500') center/cover;transition:0.5s;"
       onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"></div>
  <div style="position:absolute;bottom:0;left:0;right:0;padding:20px;background:linear-gradient(transparent, rgba(0,0,0,0.8));color:#fff;font-weight:800;">Abstract Art</div>
</div>`},
  {icon:'📍',en:'Contact Icon',fr:'Infos Contact',code:`
<div style="display:flex;flex-direction:column;gap:12px;">
  <div style="display:flex;align-items:center;gap:12px;font-size:14px;color:#94a3b8;"><span style="color:#3b82f6;">📍</span> Paris, France</div>
  <div style="display:flex;align-items:center;gap:12px;font-size:14px;color:#94a3b8;"><span style="color:#3b82f6;">✉️</span> hello@genius.com</div>
  <div style="display:flex;align-items:center;gap:12px;font-size:14px;color:#94a3b8;"><span style="color:#3b82f6;">📞</span> +33 1 23 45 67 89</div>
</div>`},
  {icon:'🦶',en:'Sticky Footer',fr:'Pied Page',code:`
<div style="position:sticky;bottom:20px;left:20px;right:20px;padding:15px 25px;background:rgba(15,23,42,0.9);backdrop-filter:blur(10px);border:1px solid #1e293b;border-radius:15px;display:flex;justify-content:space-between;align-items:center;z-index:900;">
  <span style="font-size:12px;color:#64748b;">&copy; 2026 Genius Engine Inc.</span>
  <div style="display:flex;gap:15px;font-size:12px;font-weight:700;"><span>Privacy</span><span>Terms</span></div>
</div>`},
  {icon:'🏢',en:'Sidebar Mini',fr:'Menu Latéral',code:`
<div style="width:60px;height:100%;min-height:300px;background:#0f172a;border-right:1px solid #1e293b;display:flex;flex-direction:column;align-items:center;padding:20px 0;gap:20px;">
  <div style="width:40px;height:40px;background:#3b82f6;border-radius:12px;"></div>
  <div style="opacity:0.3;font-size:20px;cursor:pointer;">📁</div>
  <div style="opacity:0.3;font-size:20px;cursor:pointer;">💬</div>
  <div style="opacity:0.3;font-size:20px;cursor:pointer;margin-top:auto;">⚙️</div>
</div>`},
  {icon:'🏗️',en:'Feature Info',fr:'Info Feature',code:`
<div style="max-width:400px;display:flex;gap:20px;">
  <div style="width:50px;height:50px;background:rgba(59,130,246,0.1);color:#3b82f6;border-radius:15px;display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0;">⚡</div>
  <div>
    <h4 style="margin-bottom:8px;">Lightning Fast</h4>
    <p style="font-size:14px;color:#94a3b8;line-height:1.6;">Our engine is optimized for extreme performance on any device.</p>
  </div>
</div>`},
  {icon:'📝',en:'Float Label',fr:'Saisie Pro',code:`
<div style="position:relative;margin-top:20px;max-width:320px;">
  <input type="text" placeholder=" " style="width:100%;padding:15px;background:transparent;border:1px solid #1e293b;border-radius:10px;color:#fff;outline:none;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#1e293b'">
  <label style="position:absolute;left:15px;top:15px;color:#64748b;pointer-events:none;transition:0.3s;font-size:14px;">Full Name</label>
  <style>input:focus~label, input:not(:placeholder-shown)~label { top:-10px; left:10px; font-size:11px; background:#080c14; padding:0 5px; color:#3b82f6; }</style>
</div>`}
];

// TEMPLATES are now loaded from js/templates-library.js

const TOOLS_GRADIENTS=[['#3b82f6','#8b5cf6'],['#10b981','#3b82f6'],['#ec4899','#f59e0b'],['#6366f1','#06b6d4'],['#ef4444','#f59e0b'],['#14b8a6','#8b5cf6']];
const TOOLS_FONTS=['Inter','Roboto','Poppins','Montserrat','Playfair Display','JetBrains Mono'];
const TOOLS_ANIMS=[['fadeIn','opacity:0→1'],['slideUp','translateY(20px)→0'],['pulse','scale 1→1.05'],['spin','rotate 0→360deg'],['bounce','translateY 0→-10px'],['glow','box-shadow pulse']];

let lastSaved=null, code=DEFAULT_CODE, lang='en'; const t=k=>(LANG[lang]||LANG.en)[k]||k;
let editor=null,autoRun=true,blueprintOn=false,inspectActive=false;
let fontSize=14,wordWrap='off',editorTheme='vs-dark',activeTab='ai';
let aiHistory=[{role:'bot',text:'👋 Hello! I\'m your AI assistant. Describe what you want to build and I\'ll generate the code for you.\n\n🇬🇧 **English** and 🇫🇷 **French** supported!'}];

const STYLE_LAB = {
  effects: [
    { icon: '🔮', name_en: 'Glassmorphism', name_fr: 'Glassmorphisme', code: `\n<style>\n  .glass {\n    backdrop-filter: blur(16px) saturate(180%);\n    background: rgba(17, 25, 40, 0.75);\n    border-radius: 12px;\n    border: 1px solid rgba(255, 255, 255, 0.125);\n  }\n</style>\n` },
    { icon: '🌟', name_en: 'Neon Glow', name_fr: 'Éclat Néon', code: `\n<style>\n  .neon {\n    color: #fff;\n    text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #bc13fe, 0 0 82px #bc13fe, 0 0 92px #bc13fe;\n  }\n</style>\n` },
    { icon: '🌑', name_en: 'Soft Shadow', name_fr: 'Ombre Douce', code: `\n<style>\n  .soft-shadow {\n    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);\n  }\n</style>\n` }
  ],
  palettes: [
    { icon: '🍎', name_en: 'Apple Minimal', name_fr: 'Apple Minimal', color1: '#f5f5f7', color2: '#1d1d1f' },
    { icon: '🌌', name_en: 'Cyberpunk', name_fr: 'Cyberpunk', color1: '#00ffeb', color2: '#ff007c' },
    { icon: '🏆', name_en: 'Luxury Gold', name_fr: 'Or Luxe', color1: '#d4af37', color2: '#1a1a1a' }
  ]
};

window.addEventListener('DOMContentLoaded',()=>{
  applyLang();
  wirePanels();
  wireLangBtns();
  wireTopbar();
  wirePremium();
  wirePreview();
  wireShortcuts();
  wireMagicButtons();
  renderTab(activeTab);
  document.querySelectorAll('.ltab').forEach(b=>b.addEventListener('click',()=>renderTab(b.dataset.tab)));

  require.config({paths:{vs:'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs'}});
  require(['vs/editor/editor.main'],()=>{
    editor=monaco.editor.create(document.getElementById('monaco-container'),{
      value:code,language:'html',theme:editorTheme,fontSize,wordWrap,
      minimap:{enabled:true,scale:1},automaticLayout:true,scrollBeyondLastLine:false,
      padding:{top:16,bottom:16},lineNumbers:'on',roundedSelection:true,
      cursorBlinking:'smooth',cursorSmoothCaretAnimation:'on',smoothScrolling:true,
      formatOnPaste:true,bracketPairColorization:{enabled:true},folding:true,
      scrollbar:{useShadows:false,verticalScrollbarSize:5,horizontalScrollbarSize:5}
    });
    editor.onDidChangeModelContent(()=>{
      code=editor.getValue();
      updateQuality();
      updateStats();
      if(activeTab === 'audit') renderTab('audit'); // Real-time Auditor Refresh
      if(autoRun)runPreview();
    });
    
    // 🔒 ANTI-THEFT PROTECTION: Global Copy Interceptor (Catches Ctrl+C, Ctrl+X AND Mouse Right-Click)
    ['copy', 'cut'].forEach(evt => {
       document.addEventListener(evt, (e) => {
          let selectedText = window.getSelection().toString();
          if(window.editor && window.editor.hasTextFocus()) {
             const selection = window.editor.getSelection();
             selectedText = window.editor.getModel().getValueInRange(selection);
          }
          
          if (!selectedText && window.editor) {
             selectedText = window.getSelection().toString() || '';
          }
          
          const lineCount = selectedText.split('\n').length;
          if (lineCount > 15) {
             e.preventDefault();
             e.stopPropagation();
             
             if (window.showStripeModal) {
                 window.showStripeModal('Export All', () => {
                     const btn = document.getElementById('btn-export-all');
                     if (btn) btn.click();
                 });
                 return;
             }
             
             const warningMsg = "/*\n 🔒 IA ARCHITECTE SECURITY 🔒\n Mass copying is disabled for security reasons.\n Please use the 'EXPORT ALL' button to run the application!\n \n 🔒 SÉCURITÉ IA ARCHITECTE 🔒\n La copie massive est désactivée par mesure de sécurité.\n Veuillez utiliser le bouton 'EXPORT ALL' pour exécuter l'application!\n*/";
             
             if (e.clipboardData) {
                e.clipboardData.setData('text/plain', warningMsg);
             } else {
                navigator.clipboard.writeText(warningMsg);
             }
             
             const copyBtn = document.getElementById('lbl-copy');
             if(copyBtn) {
                const orig = copyBtn.textContent;
                copyBtn.textContent = evt === 'cut' ? '🔒 LIMIT CUT' : '🔒 LIMIT COPY';
                copyBtn.style.color = '#ef4444';
                setTimeout(() => {
                   copyBtn.textContent = orig;
                   copyBtn.style.color = '';
                }, 2500);
             }
          }
       }, true); // True = Capture phase (runs before Monaco's internal copy handler)
    });

    window.editor = editor; // 🚀 Globalize for IA-PRO Features
    updateQuality();updateStats();runPreview();
  });

  window.addEventListener('message', e => {
    if(!e.data || e.data.type !== 'inspect') return;
    
    const { tag, classes, id, html, rect } = e.data;
    const ed = window.editor || editor;
    if(!ed) return;

    // 🔬 FUZZY MATCHER: Locating element in Monaco
    const fullCode = ed.getValue();
    const lines = fullCode.split('\n');
    let targetLine = -1;

    // Phase 1: Try exact ID match
    if (id && id.trim()) {
       targetLine = lines.findIndex(l => l.includes(`id="${id}"`) || l.includes(`id='${id}'`));
    }
    
    // Phase 2: Try semantic match (tag + classes)
    if (targetLine === -1) {
       const cleanTag = tag.toLowerCase();
       const classList = classes ? classes.split(' ').filter(c => c && !c.includes('ia-sentinel')) : [];
       
       targetLine = lines.findIndex(l => {
          const lLow = l.toLowerCase();
          if(!lLow.includes('<' + cleanTag)) return false;
          // Every class in the click data must be present in the line (simplified order check)
          return classList.every(c => lLow.includes(c));
       });
    }

    // Phase 3: Fallback to HTML snippet (Tag + Fragment)
    if (targetLine === -1 && html) {
       const snippet = html.substring(0, 40).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
       targetLine = lines.findIndex(l => l.includes(snippet));
    }

    if (targetLine !== -1) {
       const lineNo = targetLine + 1;
       ed.revealLineInCenter(lineNo);
       ed.setSelection({ startLineNumber: lineNo, startColumn: 1, endLineNumber: lineNo, endColumn: 1000 });
       ed.focus();

       // 🧠 GENIUS INTELLIGENCE: Get suggestions
       if (window.AIEngine && window.AIEngine.analyzeElement && rect) {
          const suggestion = window.AIEngine.analyzeElement(tag, classes, lang);
          showGeniusTooltip(suggestion, rect);
       }
    }
  });
});

function showGeniusTooltip(suggestion, rect) {
  // Remove existing
  const old = document.getElementById('ia-genius-tooltip');
  if(old) old.remove();

  const tooltip = document.createElement('div');
  tooltip.id = 'ia-genius-tooltip';
  tooltip.className = 'feature-pulse';
  const lang = window.APP_LANG || 'en';
  
  // Calculate Position relative to iframe
  const frame = document.getElementById('preview-iframe');
  const frameRect = frame.getBoundingClientRect();
  
  const top = frameRect.top + rect.top - 100;
  const left = frameRect.left + rect.left + (rect.width/2) - 150;

  tooltip.style = `
    position: fixed;
    top: ${Math.max(20, top)}px;
    left: ${Math.max(20, left)}px;
    width: 300px;
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(59, 130, 246, 0.4);
    border-radius: 16px;
    padding: 15px;
    z-index: 100000;
    box-shadow: 0 20px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(59, 130, 246, 0.1);
    color: #fff;
    font-family: 'Inter', sans-serif;
    pointer-events: auto;
  `;

  tooltip.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
       <div style="font-size:10px; font-weight:900; color:#3b82f6; text-transform:uppercase; letter-spacing:1px;">✨ IA-PRO Genius</div>
       <button onclick="this.parentElement.parentElement.remove()" style="background:none; border:none; color:#64748b; cursor:pointer; font-size:16px;">×</button>
    </div>
    <div style="font-size:13px; font-weight:700; margin-bottom:8px; line-height:1.4;">${suggestion.title}</div>
    <div style="font-size:11px; color:#94a3b8; line-height:1.5; margin-bottom:12px;">${suggestion.advice}</div>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
       <button id="ia-apply-opt" style="padding:8px; background:#3b82f6; border:none; border-radius:8px; color:#fff; font-size:10px; font-weight:800; cursor:pointer; transition:0.2s;">
          ${lang === 'fr' ? 'OPTIMISER' : 'OPTIMIZE'}
       </button>
       <button id="ia-open-anim" style="padding:8px; background:rgba(16, 185, 129, 0.1); border:1px solid #10b981; border-radius:8px; color:#10b981; font-size:10px; font-weight:800; cursor:pointer;">
          ${lang === 'fr' ? 'ANIMER' : 'ANIMATE'}
       </button>
    </div>
    <div id="ia-anim-menu" style="display:none; margin-top:10px; padding-top:10px; border-top:1px solid rgba(255,255,255,0.05); grid-template-columns:repeat(3, 1fr); gap:6px;">
       <button onclick="applyGeniusAnimation('reveal')" style="padding:6px; background:rgba(255,255,255,0.05); border:none; border-radius:6px; color:#fff; font-size:9px; cursor:pointer;">
          ${lang === 'fr' ? 'Apparition' : 'Reveal'}
       </button>
       <button onclick="applyGeniusAnimation('float')" style="padding:6px; background:rgba(255,255,255,0.05); border:none; border-radius:6px; color:#fff; font-size:9px; cursor:pointer;">
          ${lang === 'fr' ? 'Flottement' : 'Float'}
       </button>
       <button onclick="applyGeniusAnimation('pulse')" style="padding:6px; background:rgba(255,255,255,0.05); border:none; border-radius:6px; color:#fff; font-size:9px; cursor:pointer;">
          ${lang === 'fr' ? 'Pulser' : 'Pulse'}
       </button>
    </div>
  `;

  document.body.appendChild(tooltip);

  const applyBtn = tooltip.querySelector('#ia-apply-opt');
  applyBtn.onclick = () => {
     const ed = window.editor;
     if(ed && suggestion.code) {
        const lang = window.APP_LANG || 'en';
        const position = ed.getSelection().startLineNumber;
        const lineContent = ed.getModel().getLineContent(position);

        let newContent = lineContent;
        if(lineContent.includes('style="') || lineContent.includes("style='")) {
           // Insert into existing style
           newContent = lineContent.replace(/(style=["'])/, `$1${suggestion.code.split("'")[1]}; `);
        } else if(lineContent.includes('<')) {
           // Add new style attribute
           const tagMatch = lineContent.match(/<([a-z1-6]+)/i);
           if(tagMatch) newContent = lineContent.replace('<' + tagMatch[1], `<${tagMatch[1]} ${suggestion.code}`);
        }

        ed.executeEdits('genius-opt', [{ 
           range: { startLineNumber: position, startColumn: 1, endLineNumber: position, endColumn: lineContent.length + 1 }, 
           text: newContent 
        }]);

        showToast(lang === 'fr' ? '🚀 Élément optimisé !' : '🚀 Element optimized!');
        tooltip.remove();
        runPreview();
     }
  };

  const animBtn = tooltip.querySelector('#ia-open-anim');
  animBtn.onclick = (e) => {
     e.stopPropagation();
     const menu = tooltip.querySelector('#ia-anim-menu');
     const isHidden = menu.style.display === 'none' || !menu.style.display;
     menu.style.display = isHidden ? 'grid' : 'none';
     animBtn.style.background = isHidden ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)';
  };
}
window.showGeniusTooltip = showGeniusTooltip;

function applyGeniusAnimation(type) {
  const ed = window.editor;
  if(!ed || !window.AIEngine) return;
  const lang = window.APP_LANG || 'en';
  const anim = window.AIEngine.getAnimation(type);
  if(!anim) return;

  const position = ed.getSelection().startLineNumber;
  const model = ed.getModel();
  const lineContent = model.getLineContent(position);
  
  let newContent = lineContent;
  if(lineContent.includes('class="') || lineContent.includes("class='")) {
     // Check if already has this animation class to avoid duplicates
     if(!lineContent.includes(anim.class)) {
        newContent = lineContent.replace(/(class=["'])/, `$1${anim.class} `);
     }
  } else if(lineContent.includes('<')) {
     const tagMatch = lineContent.match(/<([a-z1-6]+)/i);
     if(tagMatch) {
        newContent = lineContent.replace('<' + tagMatch[1], `<${tagMatch[1]} class="${anim.class}"`);
     }
  }

  // If it's a reveal, we need to make it visible in the preview immediately for the user to see it
  if(type === 'reveal' && !newContent.includes('visible')) {
     newContent = newContent.replace(anim.class, anim.class + ' visible');
  }

  ed.executeEdits('genius-anim', [{ 
     range: { startLineNumber: position, startColumn: 1, endLineNumber: position, endColumn: lineContent.length + 1 }, 
     text: newContent 
  }]);

  showToast(lang === 'fr' ? `✨ Animation "${anim.title_fr}" appliquée !` : `✨ Animation "${anim.title_en}" applied!`);
  const tip = document.getElementById('ia-genius-tooltip');
  if(tip) tip.remove();
  runPreview();
}
window.applyGeniusAnimation = applyGeniusAnimation;

function runPreview(){
  console.log("⚡ Preview Refresh Triggered");
  const fr=document.getElementById('preview-iframe');if(!fr)return;
  const ed = window.editor || (typeof editor !== 'undefined' ? editor : null);
  let src = ed ? ed.getValue() : code;
  
  // 🔬 PROXY FIX: Bypass CDN blocking by using THREE from the parent window
  if(src.includes('THREE.')) {
    const proxyScript = `
      <script>
        (function waitThree(){
          if(!window.THREE && window.parent && window.parent.THREE) { 
            window.THREE = window.parent.THREE; 
            console.log("3D Proxy: THREE borrowed LOCALLY from IA Architecte");
          }
          if(!window.THREE) { setTimeout(waitThree, 50); }
        })();
      <\/script>`;
    src = src.replace('<head>', '<head>' + proxyScript);
  }

  // 🎭 [GENIUS ANIMATIONS v12.1] — Dynamic Motion Injection
  const geniusStyles = `
  <style id="ia-genius-styles">
    /* Floating Animation */
    .ia-float-pro { animation: iaFloat 3s ease-in-out infinite !important; }
    @keyframes iaFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
    
    /* Pulsing Animation */
    .ia-pulse-pro { animation: iaPulse 2s ease-in-out infinite !important; }
    @keyframes iaPulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.03); opacity: 0.9; } }
    
    /* Scroll Reveal Transition */
    .ia-reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
    .ia-reveal.visible { opacity: 1; transform: translateY(0); }
  </style>`;
  if(src.includes('</head>')) src = src.replace('</head>', geniusStyles + '</head>');
  else if(src.includes('<style>')) src = src.replace('<style>', geniusStyles + '<style>');
  else src = geniusStyles + src;

  /* 🔍 [CONTEXTUAL INSPECTOR v10.1] — Sentinel Bridge Injection */
  if (inspectActive) {
      const sentinel = `
      <style>
        .ia-sentinel-hover { outline: 2px solid #3b82f6 !important; outline-offset: -2px !important; cursor: crosshair !important; position: relative !important; }
        .ia-sentinel-hover::after { content: "🔍 Inspect"; position: absolute; top: 0; right: 0; background: #3b82f6; color: #fff; font-size: 10px; padding: 2px 6px; font-family: sans-serif; z-index: 10000; border-radius: 0 0 0 4px; pointer-events: none; }
      </style>
      <script>
        (function() {
          document.addEventListener('mouseover', (e) => {
            if(e.target === document.body || e.target === document.documentElement) return;
            e.target.classList.add('ia-sentinel-hover');
          });
          document.addEventListener('mouseout', (e) => {
            e.target.classList.remove('ia-sentinel-hover');
          });
          document.addEventListener('click', (e) => {
            if(e.target === document.body || e.target === document.documentElement) return;
            e.preventDefault();
            e.stopPropagation();
            
            const r = e.target.getBoundingClientRect();
            const data = {
              type: 'inspect',
              tag: e.target.tagName,
              id: e.target.id,
              classes: e.target.className,
              html: e.target.outerHTML.substring(0, 200),
              rect: { top: r.top, left: r.left, width: r.width, height: r.height }
            };
            window.parent.postMessage(data, '*');
          }, true);
        })();
      <\/script>`;
      if(src.includes('</head>')) src = src.replace('</head>', sentinel + '</head>');
      else src = sentinel + src;
  }

  if(blueprintOn)src=src.replace('</style>','*{background:#f8fafc!important;color:#475569!important;border:1px dashed #cbd5e1!important;box-shadow:none!important;}\nbody{background:#f1f5f9!important;}\n</style>');
  
  // 🐞 JUNIOR ASSISTANT: Inject Debugger Initialization
  if(src.includes('GeniusCore') && !src.includes('GeniusCore.Debugger.init()')) {
    const debugScript = `\n<script>document.addEventListener('DOMContentLoaded', () => { if(window.GeniusCore) window.GeniusCore.Debugger.init(); });<\/script>\n`;
    src = src.replace('</body>', debugScript + '</body>');
  }

  fr.srcdoc=src;
}
window.runPreview = runPreview;

function audit(c){
  let score=100;const issues=[];
  if(!c.includes('<!DOCTYPE')){issues.push('Missing <!DOCTYPE html>');score-=10;}
  if(!c.includes('<title')){issues.push('Missing <title>');score-=5;}
  if(!c.includes('viewport')){issues.push('Missing viewport meta');score-=8;}
  if(!c.includes('charset')){issues.push('Missing charset');score-=5;}
  return{score:Math.max(0,score),issues};
}

function updateQuality(){
  const{score,issues}=audit(code);
  const arc=document.getElementById('ring-arc'),num=document.getElementById('quality-score'),lbl=document.getElementById('issue-label'),ss=document.getElementById('status-score');
  const color=score>80?'#10b981':score>60?'#f59e0b':'#ef4444';
  if(arc){const c=2*Math.PI*15;arc.setAttribute('stroke-dasharray',`${(score/100)*c} ${c}`);arc.setAttribute('stroke',color);}
  if(num){num.textContent=score;num.style.color=color;}
  if(lbl)lbl.textContent=issues.length===0?t('noIssues'):`${issues.length} ${t('issues')}`;
  if(ss){ss.textContent=`Q: ${score}`;ss.className='status-score '+(score>80?'score-good':score>60?'score-warn':'score-bad');}
}

function updateStats(){
  const el=document.getElementById('editor-stats');if(!el)return;
  el.innerHTML=`<span><strong>${code.split('\n').length}</strong> ${t('lines')}</span><span><strong>${code.length}</strong> ${t('chars')}</span>`;
}

function wirePanels(){
  function updateEditorExpand(){
    const leftCollapsed=document.getElementById('left-panel').classList.contains('collapsed');
    const rightCollapsed=document.getElementById('right-panel').classList.contains('collapsed');
    const ed=document.querySelector('.editor-section');
    if(!ed)return;
    ed.classList.toggle('editor-expand-left',leftCollapsed);
    ed.classList.toggle('editor-expand-right',rightCollapsed);
  }
  document.getElementById('toggle-left').addEventListener('click',function(){
    const p=document.getElementById('left-panel');const c=p.classList.toggle('collapsed');this.classList.toggle('active',!c);
    updateEditorExpand();
  });
  document.getElementById('toggle-right').addEventListener('click',function(){
    const p=document.getElementById('right-panel');const c=p.classList.toggle('collapsed');this.classList.toggle('active',!c);
    updateEditorExpand();
  });
  document.getElementById('toggle-left').classList.add('active');
  document.getElementById('toggle-right').classList.add('active');
}

function wireLangBtns(){
  document.querySelectorAll('.lang-btn').forEach(btn=>btn.addEventListener('click',()=>{
    lang=btn.dataset.lang;
    document.querySelectorAll('.lang-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');applyLang();renderTab(activeTab);
  }));
}

function applyLang(){
  const s=(id,k)=>{const e=document.getElementById(id);if(e)e.textContent=t(k);};
  s('lbl-subtitle','subtitle');s('lbl-tools','tools');s('lbl-preview','preview');
  s('lbl-tab-ai','tabAi');s('lbl-tab-snip','tabSnip');s('lbl-tab-tpl','tabTpl');s('lbl-tab-tools','tabTools');s('lbl-tab-tpro','tabTPro');s('lbl-tab-apro','tabAPro');s('lbl-tab-appsultra','tabAppsUltra');s('lbl-tab-apps','tabApps');s('lbl-tab-sites','tabSites');s('lbl-tab-elite','tabElite');s('lbl-tab-realworld','tabRealWorld');s('lbl-tab-models','tabModels');s('lbl-tab-audit','tabAudit');s('lbl-tab-assets','tabAssets');s('lbl-tab-media','tabMedia');s('lbl-tab-data','tabData');s('lbl-tab-games','tabGames');s('lbl-tab-gamespro','tabGamesPro');s('lbl-tab-set','tabSet');
  s('lbl-format','format');s('lbl-copy','copy');s('lbl-save','save');s('lbl-export-all','exportAll');s('lbl-deploy','deploy');
  s('lbl-livepreview','preview');
  s('lbl-deploy-title','deployTitle');s('lbl-pub-title','pubTitle');s('lbl-pub-desc','pubDesc');s('lbl-net-title','netTitle');s('lbl-net-desc','netDesc');
  s('lbl-mob-title','mobTitle');s('lbl-mob-desc','mobDesc');
  const ss=document.getElementById('status-save');if(ss)ss.textContent=lastSaved?`${t('savedAt')} ${lastSaved.toLocaleTimeString()}`:t('unsaved');
  const map={
    'lbl-magic-beautify':t('magicBeautify'),'lbl-magic-mobile':t('magicMobile'),'lbl-magic-dark':t('magicDark'),'lbl-magic-seo':t('magicSEO'),'lbl-magic-lab':t('magicLab'),'lbl-magic-real':t('magicReal'),'lbl-magic-check':t('magicCheck'),'lbl-magic-explain':t('magicExplain'),
    'lbl-tab-trans':t('tabTrans'),'lbl-tab-genius':t('tabGenius')
  };
  Object.keys(map).forEach(id=>{
    const el=document.getElementById(id);
    if(el)el.textContent=map[id];
  });
}

/**
 * 🛠️ STANDALONE SANITIZER
 * Fixes 3D models and other local dependencies for exported files
 * by replacing IDE-specific paths with global CDN links.
 */
function sanitizeStandalone(html) {
  if (!html) return '';
  
  // 1. Replace local Three.js with CDN (Fixes Black Screen 3D Models)
  let clean = html.replace(/src=["']js\/three\.min\.js["']/gi, 'src="https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.min.js"');
  
  // 2. Remove IDE internal proxy scripts if present
  clean = clean.replace(/<script>\s*\(function waitThree\(\)[\s\S]*?<\/script>/gi, '');
  
  // 3. Remove Blueprint/Inspect data attributes
  clean = clean.replace(/ data-src-line="\d+"/gi, '');
  
  // 4. Inject a safety check for Three.js initialization
  if (clean.includes('THREE.')) {
    const safety = `\n<script>
    // IA Architecte Standalone 3D Safety
    window.addEventListener('load', () => {
      if (!window.THREE) console.error("Three.js failed to load. Check your internet connection.");
    });
    <\/script>\n`;
    clean = clean.replace('</body>', safety + '</body>');
  }

  return clean;
}

function wireTopbar(){
  document.getElementById('btn-format').addEventListener('click',()=>editor?.getAction('editor.action.formatDocument')?.run());
  const cb=document.getElementById('btn-copy');
  cb.addEventListener('click',()=> {
     const lineCount = code.split('\n').length;
     if (lineCount > 15) {
        if (window.showStripeModal) {
            window.showStripeModal('Export All', () => {
                const btn = document.getElementById('btn-export-all');
                if (btn) btn.click();
            });
            return;
        }
        const warningMsg = "/*\n 🔒 IA ARCHITECTE SECURITY 🔒\n Mass copying is disabled for security reasons.\n Please use the 'EXPORT ALL' button to run the application!\n \n 🔒 SÉCURITÉ IA ARCHITECTE 🔒\n La copie massive est désactivée par mesure de sécurité.\n Veuillez utiliser le bouton 'EXPORT ALL' pour exécuter l'application!\n*/";
        navigator.clipboard.writeText(warningMsg).then(()=>{
           if (document.getElementById('lbl-copy')) {
              document.getElementById('lbl-copy').textContent='🔒 LIMIT COPY';
              document.getElementById('lbl-copy').style.color='#ef4444';
              setTimeout(()=>{
                 document.getElementById('lbl-copy').textContent=t('copy');
                 document.getElementById('lbl-copy').style.color='';
              },2500);
           }
        });
     } else {
        navigator.clipboard.writeText(code).then(()=>{
           if (document.getElementById('lbl-copy')) {
              document.getElementById('lbl-copy').textContent=t('copied');
              setTimeout(()=>document.getElementById('lbl-copy').textContent=t('copy'),2000);
           }
        });
     }
  });
  document.getElementById('btn-save').addEventListener('click',()=>{
    localStorage.setItem('ia_arch_code',code);lastSaved=new Date();
    document.getElementById('status-save').textContent=`${t('savedAt')} ${lastSaved.toLocaleTimeString()}`;
  });
  document.getElementById('btn-export-html').addEventListener('click',(e)=>{
    if (window.showStripeModal && e.currentTarget.dataset.paid !== 'true') {
        window.showStripeModal('Export HTML', () => { document.getElementById('btn-export-html').dataset.paid = 'true'; document.getElementById('btn-export-html').click(); });
        return;
    }
    e.currentTarget.dataset.paid = '';
    if(!editor) return;
    const sanitized = sanitizeStandalone(editor.getValue());
    downloadFile(sanitized,`IA_Project_${Date.now()}.html`,'text/html');
  });
  document.getElementById('btn-export-css').addEventListener('click',(e)=>{
    if (window.showStripeModal && e.currentTarget.dataset.paid !== 'true') {
        window.showStripeModal('Export CSS', () => { document.getElementById('btn-export-css').dataset.paid = 'true'; document.getElementById('btn-export-css').click(); });
        return;
    }
    e.currentTarget.dataset.paid = '';
    if(!editor) return;
    const m=editor.getValue().match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
    const css=m?m.map(x=>x.replace(/<style[^>]*>|<\/style>/gi,'')).join('\n'):'/* No CSS found */';
    downloadFile(css,`IA_Styles_${Date.now()}.css`,'text/css');
  });
  document.getElementById('btn-export-js').addEventListener('click',(e)=>{
    if (window.showStripeModal && e.currentTarget.dataset.paid !== 'true') {
        window.showStripeModal('Export JS', () => { document.getElementById('btn-export-js').dataset.paid = 'true'; document.getElementById('btn-export-js').click(); });
        return;
    }
    e.currentTarget.dataset.paid = '';
    if(!editor) return;
    const m=editor.getValue().match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
    const js=m?m.map(x=>x.replace(/<script[^>]*>|<\/script>/gi,'')).join('\n'):'/* No JS found */';
    downloadFile(js,`IA_Script_${Date.now()}.js`,'application/javascript');
  });
  document.getElementById('btn-export-all').addEventListener('click',async(e)=>{
    if (window.showStripeModal && e.currentTarget.dataset.paid !== 'true') {
        window.showStripeModal('Export All', () => { document.getElementById('btn-export-all').dataset.paid = 'true'; document.getElementById('btn-export-all').click(); });
        return;
    }
    e.currentTarget.dataset.paid = '';
    const btn=document.getElementById('btn-export-all');
    const lbl=document.getElementById('lbl-export-all');
    const origText=lbl.textContent;
    lbl.textContent='⏳...';btn.disabled=true;
    try{
      if(!editor) return;
      const sanitized = sanitizeStandalone(editor.getValue());
      if(window.JSZip){
        const zip=new JSZip();
        
        // 1. Standalone Version (Bundled)
        zip.file('Standalone_App.html', sanitized);
        
        // 2. Source Code Version (Unbundled)
        const cssM = sanitized.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
        const cssContent = cssM.length ? cssM.map(x=>x.replace(/<style[^>]*>|<\/style>/gi,'')).join('\n') : '/* No CSS */';
        
        let bodyContent = sanitized.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, '');
        
        const jsM = sanitized.match(/<script[^>]*>([\s\S]*?)<\/script>/gi) || [];
        let jsContentArr = [];
        
        jsM.forEach(scriptTag => {
           // If it's an external script (has src), KEEP it in the HTML so the app doesn't break
           if(scriptTag.toLowerCase().includes('src=')) {
              // Do not remove from bodyContent
           } else {
              // Internal script: extract it and remove from HTML
              const innerJs = scriptTag.replace(/<script[^>]*>|<\/script>/gi, '');
              if(innerJs.trim()) jsContentArr.push(innerJs);
              bodyContent = bodyContent.replace(scriptTag, '');
           }
        });
        
        const jsContent = jsContentArr.length ? jsContentArr.join('\n') : '/* No JS */';
        
        // Preserve HTML if stripping was too aggressive
        if(bodyContent.trim().length < 5 && sanitized.length > 10) {
           bodyContent = sanitized; // Fallback to original
        }

        // Detect if it's already a full HTML document (Case-Insensitive)
        let sourceHtml = "";
        const lowerBody = bodyContent.toLowerCase();
        const headEndIdx = lowerBody.indexOf('</head>');
        
        if(headEndIdx !== -1) {
           const links = `\n  <link rel="stylesheet" href="style.css">\n  <script src="main.js" defer><\/script>\n`;
           // Insert links at the correct position (preserving original capitalization of </head>)
           const originalHeadEnd = bodyContent.substring(headEndIdx, headEndIdx + 7);
           sourceHtml = bodyContent.replace(originalHeadEnd, links + originalHeadEnd);
        } else {
           // It's a snippet, wrap in Boilerplate
           sourceHtml = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IA Architecte Project</title>
  <link rel="stylesheet" href="style.css">
  <script src="main.js" defer><\/script>
</head>
<body>
${bodyContent.trim()}
</body>
</html>`;
        }
        
        const sourceFolder = zip.folder('Source_Code');
        sourceFolder.file('index.html', sourceHtml);
        sourceFolder.file('style.css', cssContent);
        sourceFolder.file('main.js', jsContent);
        
        const readme = `=== IA ARCHITECTE STUDIO - EXPORT ===\n\n` +
          `[1] Standalone_App.html\n` +
          `- EN: ${t('readmeApp')}\n\n` +
          `[2] Source_Code Folder\n` +
          `- EN: ${t('readmeSource')}\n\n` +
          `IMPORTANT FOR BEGINNERS:\n` +
          `If you just double-click 'index.html', Windows will open it in your browser (Chrome/Edge) and it will look like the preview/website.\n` +
          `To see and edit the actual HTML source code, you must right-click 'index.html' -> select 'Open with' -> choose 'Notepad' or 'VS Code'.\n\n` +
          `=====================================`;
        zip.file('README.txt', readme);

        const blob=await zip.generateAsync({type:'blob'});
        const u=URL.createObjectURL(blob);
        const a=Object.assign(document.createElement('a'),{href:u,download:`IA_Project_${Date.now()}.zip`});
        document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(u);
        lbl.textContent=t('zipSuccess');
      } else {
        downloadFile(sanitized,`IA_Project_${Date.now()}.html`,'text/html');
        lbl.textContent='✓ HTML!';
      }
    }catch(e){console.error(e); lbl.textContent='✕ Err';}
    setTimeout(()=>{lbl.textContent=origText;btn.disabled=false;},2200);
  });
  document.getElementById('btn-undo').addEventListener('click',()=>editor?.trigger('keyboard','undo',{}));
  document.getElementById('btn-redo').addEventListener('click',()=>editor?.trigger('keyboard','redo',{}));
  document.getElementById('btn-shortcuts').addEventListener('click',()=>{
    renderShortcutsModal();document.getElementById('shortcuts-modal').style.display='flex';
  });
  document.getElementById('btn-deploy').addEventListener('click', (e) => {
    if (window.showStripeModal && e.currentTarget.dataset.paid !== 'true') {
        window.showStripeModal('Deploy App', () => { document.getElementById('btn-deploy').dataset.paid = 'true'; document.getElementById('btn-deploy').click(); });
        return;
    }
    e.currentTarget.dataset.paid = '';
    openDeployModal();
  });
  document.getElementById('btn-publish-live').addEventListener('click',publishLive);
  document.getElementById('btn-netlify-pack').addEventListener('click',()=>document.getElementById('btn-export-all').click());
  document.getElementById('btn-mobile-pack').addEventListener('click',buildMobileApp);
}

function wirePremium() {
  const btn = document.getElementById('btn-premium');
  const lbl = document.getElementById('lbl-premium');
  if(!btn) return;
  
  // --- PREMIUM CHECK SYSTEM (V2) ---
  let subStatus = null;
  
  // 1. Check legacy timestamp
  const subDate = localStorage.getItem('ia_premium_sub_date');
  if (subDate) {
    const daysPassed = Math.floor((Date.now() - parseInt(subDate)) / (1000 * 60 * 60 * 24));
    const daysLeft = 30 - daysPassed;
    if (daysLeft > 0) {
      subStatus = { type: 'legacy', days: daysLeft };
    } else {
      localStorage.removeItem('ia_premium_sub_date');
    }
  }

  // 2. Check Database list
  if (!subStatus) {
    try {
      const session = JSON.parse(localStorage.getItem('genius_session') || '{}');
      const premiumUsers = JSON.parse(localStorage.getItem('ia_premium_users') || '[]');
      const userEmail = session.email ? session.email.toLowerCase() : '';
      
      const record = premiumUsers.find(u => u.email.toLowerCase() === userEmail);
      if (record) {
        const expiry = (record.addedAt || 0) + (record.days || 0) * 86400000;
        if (record.days === 9999 || expiry > Date.now()) {
          subStatus = { 
            type: 'database', 
            days: record.days === 9999 ? '∞' : Math.ceil((expiry - Date.now()) / 86400000)
          };
        }
      }
    } catch(e) {}
  }

  if (subStatus) {
    btn.classList.add('active-sub');
    if (subStatus.type === 'legacy' || (subStatus.type === 'database' && subStatus.days !== '∞')) {
      const days = subStatus.days;
      lbl.textContent = lang === 'fr' ? `Premium Actif (${days} jours restants)` : `Premium Active (${days} days left)`;
    } else {
      lbl.textContent = lang === 'fr' ? `Premium Actif (Cloud)` : `Premium Active (Cloud)`;
    }
    return;
  }
  // ---------------------------------

  btn.addEventListener('click', () => {
    if (window.showStripeModal) {
       window.showStripeModal('Abonnement Premium / Premium Subs.', () => {
          // Success Callback after $30 payment
          setTimeout(() => {
              if (confirm("TEST MODE: Simulăm finalizarea plății pe Stripe? Apasă OK dacă ai 'plătit' pentru a porni abonamentul.")) {
                  localStorage.setItem('ia_premium_sub_date', Date.now().toString());
                  window.location.reload();
              }
          }, 500);
       }, true); // The 'true' flag will indicate it's a subscription request
    }
  });
}

function wirePreview(){
  const frame=document.getElementById('preview-iframe');
  const wrap=document.getElementById('preview-frame-wrap');
  const vpScaleInput = document.getElementById('scale-val');

  document.querySelectorAll('.vp-btn').forEach(btn=>{
    if(btn.id==='bp-btn'||btn.id==='inspect-btn')return;
    btn.addEventListener('click',()=>{
      const w=btn.dataset.w;
      document.querySelectorAll('.vp-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      
      if(wrap){
        wrap.style.width=w;
        wrap.style.height= (w === '100%') ? '100%' : (w === '390px' ? '844px' : '1080px');
        wrap.classList.remove('mobile-view', 'tablet-view');
        
        if(w==='390px') wrap.classList.add('mobile-view');
        if(w==='820px') wrap.classList.add('tablet-view');
        
        // Auto-scale logic for small screens
        if (w !== '100%') {
            const containerHeight = wrap.parentElement.offsetHeight - 50;
            const frameHeight = parseInt(wrap.style.height);
            if (frameHeight > containerHeight) {
                const scale = containerHeight / frameHeight;
                wrap.style.transform = `scale(${scale.toFixed(2)}) translateY(0)`;
                if(vpScaleInput) vpScaleInput.textContent = Math.round(scale * 100);
            } else {
                wrap.style.transform = 'scale(1)';
                if(vpScaleInput) vpScaleInput.textContent = '100';
            }
        } else {
            wrap.style.transform = 'scale(1)';
            if(vpScaleInput) vpScaleInput.textContent = '100';
        }
      }
    });
  });

  document.getElementById('bp-btn').addEventListener('click',function(){
    blueprintOn=!blueprintOn;this.classList.toggle('bp-active',blueprintOn);runPreview();
  });
  document.getElementById('inspect-btn').addEventListener('click',function(){
    inspectActive=!inspectActive;this.classList.toggle('active',inspectActive);runPreview();
  });
  document.getElementById('btn-run').addEventListener('click',runPreview);
  const autorun=document.getElementById('autorun-chk');if(autorun)autorun.addEventListener('change',function(){autoRun=this.checked;if(autoRun)runPreview();});
}

function wireShortcuts(){
  document.addEventListener('keydown',e=>{
    if((e.ctrlKey||e.metaKey)&&e.key==='s'){e.preventDefault();document.getElementById('btn-save').click();}
  });
}

function renderShortcutsModal(){
  const body=document.getElementById('shortcuts-body');if(!body)return;
  const shortcuts=[['Ctrl + S','Save code'],['Ctrl + Z','Undo'],['Ctrl + Y','Redo'],['Ctrl + F','Find in code'],['Alt + Shift + F','Format code'],['Ctrl + /','Toggle comment']];
  body.innerHTML=shortcuts.map(([k,d])=>`<div class="shortcut-item"><span>${d}</span><span class="shortcut-key">${k}</span></div>`).join('');
}

function renderTab(tab){
  activeTab=tab;
  document.querySelectorAll('.ltab').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));
  const body=document.getElementById('left-body');if(!body)return;body.innerHTML='';
  body.style.padding='10px';body.style.overflow='';body.style.height='';
  switch(tab){
    case 'ai': renderAI(body); break;
    case 'snippets': renderSnippets(body); break;
    case 'templates': renderTemplates(body); break;
    case 'tools': renderTools(body); break;
    case 'tpro': renderToolboxPro(body); break;
    case 'appspro': renderAppsPro(body); break;
    case 'appsultra': renderAppsUltra(body); break;
    case 'apps': renderApps(body); break;
    case 'sites': renderSites(body); break;
    case 'elite': renderEliteApps(body); break;
    case 'realworld': renderRealWorld(body); break;
    case 'models': renderModels(body); break;
    case 'guide': renderGuide(body); break;
    case 'audit': renderAudit(body); break;
    case 'assets': renderAssets(body); break;
    case 'media': renderMedia(body); break;
    case 'stylelab': renderStyleLab(body); break;
    case 'transcode': renderTranscode(body); break;
    case 'genius': renderGenius(body); break;
    case 'data': renderDataVault(body); break;
    case 'settings': renderSettings(body); break;
    case 'games': renderGames(body); break;
    case 'gamespro': renderGamesPro(body); break;
    case 'iapro': renderIAPro(body); break;
  }
}

function renderIAPro(body) {
  body.style.padding = '0';
  body.style.display = 'flex';
  body.style.flexDirection = 'column';
  body.style.height = '100%';
  body.style.background = 'var(--bg-panel)';

  // 1. Console Area
  const consoleArea = document.createElement('div');
  consoleArea.id = 'iapro-console';
  consoleArea.className = 'iapro-console';
  body.appendChild(consoleArea);

  // 2. Input Area
  const inputWrap = document.createElement('div');
  inputWrap.className = 'iapro-input-wrap';
  
  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'iapro-input';
  input.placeholder = lang === 'fr' ? 'Posez une question...' : 'Ask a question...';
  
  const sendBtn = document.createElement('button');
  sendBtn.innerHTML = '➤';
  sendBtn.className = 'iapro-send-btn';

  inputWrap.appendChild(input);
  inputWrap.appendChild(sendBtn);
  body.appendChild(inputWrap);

  const addMessage = (text, type = 'system', actions = []) => {
    const msg = document.createElement('div');
    msg.className = `iapro-msg msg-${type}`;
    
    const content = document.createElement('div');
    content.className = 'msg-content';
    content.innerHTML = text;
    msg.appendChild(content);

    if(actions && actions.length > 0) {
      const btnGrid = document.createElement('div');
      btnGrid.className = 'msg-actions-grid';
      btnGrid.style.display = 'flex';
      btnGrid.style.flexDirection = 'column';
      btnGrid.style.gap = '5px';
      btnGrid.style.marginTop = '10px';

      actions.forEach(action => {
        const actBtn = document.createElement('button');
        actBtn.className = 'msg-action-btn';
        actBtn.style.margin = '0'; // Override previous margin
        actBtn.textContent = lang === 'fr' ? `👉 ${action.fr}` : `👉 ${action.en}`;
        actBtn.onclick = () => {
          if(window.AIEngine) window.AIEngine.execute(action);
        };
        btnGrid.appendChild(actBtn);
      });
      msg.appendChild(btnGrid);
    }

    consoleArea.appendChild(msg);
    consoleArea.scrollTop = consoleArea.scrollHeight;
  };

  const handlePrompt = () => {
    const val = input.value.trim();
    if(!val) return;
    
    addMessage(val, 'user');
    input.value = '';

    const q = val.toLowerCase();

    // 1. Try Search FIRST (Prioritize internal models/assets)
    if(window.AIEngine && window.AIEngine.ask) {
      const response = window.AIEngine.ask(val, lang);
      if(response.found) {
        setTimeout(() => {
          addMessage(response.text, 'system', response.actions || []);
        }, 400);
        return;
      }
    }
    
    // 2. Fallback to Factory Line if it's a creation request
    const isAppRequest = q.includes('make') || q.includes('create') || q.includes('build') || q.includes('fă') || q.includes('creează') || q.includes('construi');
    
    if(isAppRequest && window.AIEngine) {
      setTimeout(() => {
        const msg = lang === 'fr' ? `D'accord, je vais fabriquer une application sur le thème "**${val}**". Démarrage de l'usine...` : `Alright, I will manufacture an app for "**${val}**". Starting the factory line...`;
        addMessage(msg, 'system');
        setTimeout(() => window.startManufacturing(val), 1500);
      }, 400);
      return;
    }

    // 3. Fallback to generic "Not found" response if search failed and not an app request
    if(window.AIEngine && window.AIEngine.ask) {
      const response = window.AIEngine.ask(val, lang); // Recalling as a catch-all
      setTimeout(() => {
        addMessage(response.text, 'system', response.actions || []);
      }, 400);
    }
  };


  input.onkeydown = (e) => { if(e.key === 'Enter') handlePrompt(); };
  sendBtn.onclick = handlePrompt;

  // WELCOME MESSAGE
  setTimeout(() => {
    const welcome = lang === 'fr' ? 
      "Bienvenue dans **IA-PRO Navigator**. Je connais toutes les fonctions de l'application. Que cherchez-vous ?" : 
      "Welcome to **IA-PRO Navigator**. I know every feature of the app. How can I help you today?";
    addMessage(welcome);
  }, 300);

  // 🏭 APP FACTORY (v9.0 - Smart Component Manufacturing)
  // 🏭 [MULTI-PAGE ARCHITECT v10.0] - Enhanced Factory Line
  window.startManufacturing = (theme) => {
    const parent = consoleArea;
    parent.innerHTML = '';
    parent.style.padding = '20px';
    parent.style.background = 'linear-gradient(180deg, #0a1120 0%, #05070a 100%)';

    const h = document.createElement('h2');
    h.style = 'font-size:18px; font-weight:900; margin-bottom:20px; color:#fff; display:flex; align-items:center; gap:10px;';
    h.innerHTML = `<span>🏭</span> ${lang === 'fr' ? 'Usine IA-PRO v10.0' : 'IA-PRO Factory v10.0'}`;
    parent.appendChild(h);

    const configBox = document.createElement('div');
    configBox.style = 'background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:15px; padding:20px; margin-bottom:20px;';
    
    // 1. Selector Mode
    const modeLabel = document.createElement('div');
    modeLabel.style = 'font-size:10px; color:#64748b; font-weight:800; text-transform:uppercase; margin-bottom:12px;';
    modeLabel.textContent = lang === 'fr' ? '1. Type de Projet' : '1. Project Type';
    configBox.appendChild(modeLabel);

    const modeGrid = document.createElement('div');
    modeGrid.style = 'display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:20px;';
    
    let isMulti = true;
    const btnApp = document.createElement('button');
    btnApp.className = 'iapro-design-btn';
    btnApp.innerHTML = `<span>📱</span> ${lang === 'fr' ? 'APP SIMPLE' : 'SIMPLE APP'}`;
    
    const btnSite = document.createElement('button');
    btnSite.className = 'iapro-design-btn selected';
    btnSite.innerHTML = `<span>🏗️</span> ${lang === 'fr' ? 'SITE WEB' : 'MULTI-PAGE'}`;

    btnApp.onclick = () => { isMulti = false; btnApp.classList.add('selected'); btnSite.classList.remove('selected'); };
    btnSite.onclick = () => { isMulti = true; btnSite.classList.add('selected'); btnApp.classList.remove('selected'); };

    modeGrid.appendChild(btnApp);
    modeGrid.appendChild(btnSite);
    configBox.appendChild(modeGrid);

    // 2. Page Selector
    const pageLabel = document.createElement('div');
    pageLabel.style = 'font-size:10px; color:#64748b; font-weight:800; text-transform:uppercase; margin-bottom:12px;';
    pageLabel.textContent = lang === 'fr' ? '2. Sélection des Pages' : '2. Page Selection';
    configBox.appendChild(pageLabel);

    const pages = ['Home', 'Services', 'About', 'Contact', 'Gallery'];
    const selectedPages = ['Home', 'Services', 'Contact'];
    
    const pageGrid = document.createElement('div');
    pageGrid.style = 'display:grid; grid-template-columns:repeat(auto-fill, minmax(80px, 1fr)); gap:6px;';
    
    pages.forEach(p => {
      const pBtn = document.createElement('button');
      pBtn.className = 'iapro-design-btn';
      pBtn.style.fontSize = '9px';
      pBtn.textContent = p;
      if(selectedPages.includes(p)) pBtn.classList.add('selected');
      
      pBtn.onclick = () => {
        if(selectedPages.includes(p)) {
          if(selectedPages.length > 1) {
            selectedPages.splice(selectedPages.indexOf(p), 1);
            pBtn.classList.remove('selected');
          }
        } else {
          selectedPages.push(p);
          pBtn.classList.add('selected');
        }
      };
      pageGrid.appendChild(pBtn);
    });
    configBox.appendChild(pageGrid);
    parent.appendChild(configBox);

    // Start Button
    const goBtn = document.createElement('button');
    goBtn.className = 'iapro-inject-btn';
    goBtn.style.padding = '18px';
    goBtn.innerHTML = `🚀 ${lang === 'fr' ? 'LANCER LA FABRICATION' : 'START MANUFACTURING'}`;
    parent.appendChild(goBtn);

    goBtn.onclick = () => {
       configBox.remove();
       goBtn.remove();
       runManufacturingLine(isMulti, selectedPages);
    };

    const runManufacturingLine = async (isMulti, pageList) => {
      const logBox = document.createElement('div');
      logBox.style = 'display:flex; flex-direction:column; gap:12px; margin-bottom:30px;';
      parent.appendChild(logBox);

      const addLog = (text, delay) => {
        return new Promise(resolve => {
          setTimeout(() => {
            const l = document.createElement('div');
            l.style = 'font-size:11px; color:#94a3b8; font-weight:600; display:flex; align-items:center; gap:8px;';
            l.className = 'feature-pulse';
            l.innerHTML = `<span>⚙️</span> ${text}`;
            logBox.appendChild(l);
            parent.scrollTop = parent.scrollHeight;
            resolve();
          }, delay);
        });
      };

      await addLog(lang === 'fr' ? 'Audit des blueprints IA...' : 'Auditing AI blueprints...', 600);
      
      if(isMulti) {
        for(const p of pageList) {
          const blueprint = window.AIEngine?.findPageBlueprint(p, theme);
          const bpName = blueprint ? blueprint.en : 'Standard';
          await addLog(lang === 'fr' ? `Architecture [${bpName}] pour: ${p}...` : `Matched [${bpName}] for: ${p}...`, 800);
        }
        await addLog(lang === 'fr' ? 'Injection du Virtual Router v10.0.1...' : 'Injecting Virtual Router v10.0.1...', 1000);
        await addLog(lang === 'fr' ? 'Synchronisation thématique...' : 'Thematic synchronization...', 800);
      } else {
        await addLog(lang === 'fr' ? 'Spécialisation de l\'UI monocouche...' : 'Single-layer UI specialization...', 1200);
        await addLog(lang === 'fr' ? 'Infusion de la passerelle Auth...' : 'Injecting Auth gateway...', 900);
      }
      
      await addLog(lang === 'fr' ? 'Finalisation du Pack Elite...' : 'Finalizing Elite Pack...', 800);

      const finalArea = document.createElement('div');
      finalArea.style = 'margin-top:20px; padding:20px; background:rgba(139,92,246,0.1); border:1px solid rgba(139,92,246,0.3); border-radius:15px; text-align:center;';
      
      const title = document.createElement('div');
      title.style = 'color:#fff; font-weight:900; font-size:14px; margin-bottom:5px;';
      title.textContent = theme.toUpperCase();
      
      const sub = document.createElement('div');
      sub.style = 'color:#8b5cf6; font-size:10px; font-weight:800; text-transform:uppercase; margin-bottom:15px;';
      sub.textContent = isMulti ? (lang === 'fr' ? 'SITE MULTI-PAGES PRÊT' : 'MULTI-PAGE SITE READY') : (lang === 'fr' ? 'APP PRÊTE' : 'APP READY');

      const deployBtn = document.createElement('button');
      deployBtn.className = 'iapro-inject-btn';
      deployBtn.innerHTML = `🧬 ${lang === 'fr' ? 'DÉPLOYER DANS STUDIO' : 'DEPLOY TO STUDIO'}`;
      deployBtn.onclick = () => {
        try {
          const factory = window.AIEngine || AIEngine;
          let code = '';
          
          if(isMulti) {
             code = factory.manufactureFullSite(theme, pageList, lang);
          } else {
             code = factory.manufactureApp(theme, lang);
          }
          
          const injector = window.smartInject || smartInject;
          if(injector) {
            injector(code, 'logic');
            const toast = window.showToast || showToast;
            if(toast) toast(lang === 'fr' ? '✅ Site déployé !' : '✅ Site deployed!');
          }
        } catch(e) {
          console.error("Manufacturing Error:", e);
          alert("Error: " + e.message);
        }
      };

      const backBtn = document.createElement('button');
      backBtn.style = 'background:none; border:none; color:var(--muted); cursor:pointer; font-size:11px; font-weight:700; margin-top:15px;';
      backBtn.textContent = lang === 'fr' ? '← Fermer' : '← Close';
      backBtn.onclick = () => renderIAPro(body);

      finalArea.appendChild(title);
      finalArea.appendChild(sub);
      finalArea.appendChild(deployBtn);
      parent.appendChild(finalArea);
      parent.appendChild(backBtn);
      parent.scrollTop = parent.scrollHeight;
    };
  };

  // 🧪 DESIGN LAB (v8.8 - Visual Prompting)
  window.openDesigner = () => {
    const parent = consoleArea;
    parent.innerHTML = '';
    parent.style.padding = '20px';
    parent.style.background = 'linear-gradient(180deg, #131b28 0%, #080c14 100%)';

    const h = document.createElement('h2');
    h.style = 'font-size:18px; font-weight:900; margin-bottom:20px; color:#fff; display:flex; align-items:center; gap:10px;';
    h.innerHTML = `<span>🧬</span> ${lang === 'fr' ? 'Lab de Design Pro' : 'Design Lab Pro'}`;
    parent.appendChild(h);

    const controls = document.createElement('div');
    controls.style = 'display:flex; flex-direction:column; gap:15px; margin-bottom:20px;';
    
    // 1. Select Type
    const typeGroup = document.createElement('div');
    const typeLbl = document.createElement('label'); 
    typeLbl.style = 'font-size:10px; text-transform:uppercase; font-weight:800; color:var(--muted); margin-bottom:5px; display:block;';
    typeLbl.textContent = lang === 'fr' ? '1. Choisir le composant' : '1. Choose Component';
    
    const typeGrid = document.createElement('div');
    typeGrid.style = 'display:grid; grid-template-columns:1fr 1fr; gap:6px;';
    
    const types = ['pricing', 'hero', 'contact', 'team'];
    const typeIcons = { pricing: '🏷️', hero: '🚀', contact: '📧', team: '👥' };
    let curType = 'pricing';

    types.forEach(t => {
       const b = document.createElement('button');
       b.className = 'iapro-design-btn';
       b.innerHTML = `<span>${typeIcons[t]}</span> ${t.toUpperCase()}`;
       b.onclick = () => { selectType(t, b); };
       if(t === curType) b.classList.add('selected');
       typeGrid.appendChild(b);
    });

    // 2. Select Style
    const styleGroup = document.createElement('div');
    const styleLbl = document.createElement('label');
    styleLbl.style = 'font-size:10px; text-transform:uppercase; font-weight:800; color:var(--muted); margin-bottom:5px; display:block;';
    styleLbl.textContent = lang === 'fr' ? '2. Style Visuel' : '2. Visual Style';
    
    const styleGrid = document.createElement('div');
    styleGrid.style = 'display:grid; grid-template-columns:1fr 1fr; gap:6px;';
    
    const styles = ['glass', 'minimal', 'sleek', 'cyber'];
    let curStyle = 'glass';
    
    styles.forEach(s => {
       const b = document.createElement('button');
       b.className = 'iapro-design-btn';
       b.textContent = s.toUpperCase();
       b.onclick = () => { selectStyle(s, b); };
       if(s === curStyle) b.classList.add('selected');
       styleGrid.appendChild(b);
    });

    // Preview
    const prevLbl = document.createElement('label');
    prevLbl.style = 'font-size:10px; text-transform:uppercase; font-weight:800; color:var(--muted); margin-bottom:5px; display:block;';
    prevLbl.textContent = lang === 'fr' ? 'Aperçu Direct' : 'Live Preview';
    
    const previewBox = document.createElement('div');
    previewBox.style = 'height:160px; border:1px solid var(--border); border-radius:12px; overflow:hidden; background:#000; position:relative;';
    
    const iframe = document.createElement('iframe');
    iframe.style = 'width:100%; height:100%; border:none;';
    previewBox.appendChild(iframe);

    const updatePreview = () => {
       if(!window.AIEngine) return;
       const code = window.AIEngine.getDesign(curType, curStyle, lang);
       iframe.srcdoc = `
         <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap">
         <style>body{margin:0; background:#000; display:flex; align-items:center; justify-content:center; min-height:100vh; zoom: 0.35;}</style>${code}`;
    };

    const selectType = (t, btn) => {
      curType = t;
      typeGrid.querySelectorAll('button').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      updatePreview();
    };
    const selectStyle = (s, btn) => {
      curStyle = s;
      styleGrid.querySelectorAll('button').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      updatePreview();
    };

    // Actions
    const injectBtn = document.createElement('button');
    injectBtn.className = 'iapro-inject-btn';
    injectBtn.innerHTML = `🧬 ${lang === 'fr' ? 'Injecter le Design' : 'Inject Design'}`;
    injectBtn.onclick = () => {
       if(!window.AIEngine) return;
       const res = window.AIEngine.getDesign(curType, curStyle, lang);
       if(window.smartInject) {
         window.smartInject(res, 'logic');
         showToast(lang === 'fr' ? 'Done! Design ajouté.' : 'Done! Design injected.');
       }
    };

    const backBtn = document.createElement('button');
    backBtn.style = 'background:none; border:none; color:var(--muted); cursor:pointer; font-size:11px; font-weight:700; align-self:flex-start; margin-top:10px;';
    backBtn.textContent = lang === 'fr' ? '← Retour au Navigator' : '← Back to Navigator';
    backBtn.onclick = () => renderIAPro(body);

    parent.appendChild(typeLbl);
    parent.appendChild(typeGrid);
    parent.appendChild(styleLbl);
    parent.appendChild(styleGrid);
    parent.appendChild(prevLbl);
    parent.appendChild(previewBox);
    parent.appendChild(injectBtn);
    parent.appendChild(backBtn);

    updatePreview();
  };
}




function renderGuide(body) {
  const h = document.createElement('div'); h.className = 'section-hdr'; h.textContent = t('tabGuide');
  body.appendChild(h);

  const intro = document.createElement('div');
  intro.style.cssText = 'padding:14px; margin-bottom:20px; background:linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1)); border:1px solid rgba(139,92,246,0.2); border-radius:15px; color:#e2e8f0; font-size:11px; line-height:1.6;';
  intro.innerHTML = lang === 'fr' 
    ? '<b>Bienvenue sur IA Architecte !</b><br>Ce guide complet expliquera comment exploiter toute la puissance du studio, de la génération IA basique à la logique métier avancée.' 
    : '<b>Welcome to IA Architecte!</b><br>This comprehensive guide will explain how to harness the full power of the studio, from basic AI generation to advanced business logic.';
  body.appendChild(intro);

  const guideItems = [
    {
      icon: '🚀',
      en: { t: '1. Quick Start & AI', d: 'Start by typing your idea in the top AI Assistant bar and pressing Enter, or pick a ready-to-use project from the Templates or Elite Apps tabs.' },
      fr: { t: '1. Démarrage Rapide', d: 'Commencez par taper votre idée dans la barre IA en haut et appuyez sur Entrée, ou choisissez un projet complet dans Modèles ou Elite Apps.' }
    },
    {
      icon: '🎨',
      en: { t: '2. Design & UI Elements', d: 'Enrich your page using the Tools, Snippets, and Toolbox Pro tabs. Click any component to instantly inject it into your code where your cursor is.' },
      fr: { t: '2. UI & Design', d: 'Enrichissez votre page via Outils, Snippets et Toolbox Pro. Cliquez sur un composant pour l\'injecter instantanément au niveau du curseur.' }
    },
    {
      icon: '🧠',
      en: { t: '3. Genius Magic Logic', d: 'Go to the Genius tab to transform static websites into working apps (Login, Databases, Ecommerce, Real Mode) automatically.' },
      fr: { t: '3. Logique Genius', d: 'Allez dans l\'onglet Genius pour transformer des sites statiques en applications fonctionnelles (Connexion, BDD, Ecommerce) automatiquement.' }
    },
    {
      icon: '🧬',
      en: { t: '4. 3D Models & Arcade', d: 'Make your app interactive! Inject immersive 3D Three.js Models or plug-and-play Arcade Games directly into your application containers.' },
      fr: { t: '4. Modèles 3D & Arcade', d: 'Rendez votre app interactive ! Injectez des modèles 3D Three.js immersifs ou des jeux Arcade directement dans votre code.' }
    },
    {
      icon: '🩺',
      en: { t: '5. Professional Code Audit', d: 'Check the Audit tab to verify your code health. It grades SEO, performance, and accessibility, providing Auto-Fix buttons for instant repairs.' },
      fr: { t: '5. Audit Professionnel', d: 'Vérifiez la santé globale du code via l\'onglet Audit. Il note le SEO, les performances et offre des réparations automatiques.' }
    },
    {
      icon: '📦',
      en: { t: '6. Export & Deploy', d: 'Use the bottom action bar to Export All as a ZIP, package an Installable Mobile App, deploy via Netlify, or Live-Share directly.' },
      fr: { t: '6. Exporter & Déployer', d: 'Utilisez la barre du bas pour Exporter en ZIP, générer une application Mobile, déployer via Netlify, ou partager en direct.' }
    }
  ];

  guideItems.forEach(item => {
    const card = document.createElement('div');
    card.style.cssText = 'padding:15px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:15px; margin-bottom:12px; display:flex; gap:12px; align-items:flex-start; transition:0.2s ease; cursor:default;';
    card.onmouseover = () => { card.style.background = 'rgba(255,255,255,0.06)'; card.style.transform = 'translateY(-2px)'; };
    card.onmouseout = () => { card.style.background = 'rgba(255,255,255,0.02)'; card.style.transform = 'translateY(0)'; };
    
    const content = lang === 'fr' ? item.fr : item.en;
    card.innerHTML = `
      <div style="font-size:20px; background:linear-gradient(135deg, #1e293b, #0f172a); width:45px; height:45px; border-radius:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0; border:1px solid rgba(255,255,255,0.05); box-shadow:0 5px 15px rgba(0,0,0,0.3);">${item.icon}</div>
      <div style="display:flex; flex-direction:column; gap:6px;">
        <div style="font-size:12px; font-weight:900; color:#fff; letter-spacing:0.5px;">${content.t.toUpperCase()}</div>
        <div style="font-size:10.5px; color:#94a3b8; line-height:1.5;">${content.d}</div>
      </div>
    `;
    body.appendChild(card);
  });

  const footer = document.createElement('div');
  footer.style.cssText = 'text-align:center; padding:20px; color:#64748b; font-size:10px; font-weight:600; opacity:0.6;';
  footer.textContent = '© 2026 IA ARCHITECTE STUDIO';
  body.appendChild(footer);
}

function renderGenius(body) {
  const lang = typeof window.lang !== 'undefined' ? window.lang : 'en';
  const isFr = lang === 'fr';

  const h = document.createElement('div');
  h.className = 'section-hdr';
  h.textContent = t('tabGenius') || 'GENIUS';
  body.appendChild(h);

  // --- 0. PRO LOGIC ARCHITECT [IA-PRO] ---
  const title = t('magicLogic') || 'Magic Logic [PRO]';
  const desc = isFr ? 'Transformez instantanément votre design en application vivante.' : 'Instantly transform your design into a living application.';
  
  const proCard = document.createElement('div');
  proCard.className = 'service-card';
  proCard.style.cssText = 'background:rgba(139,92,246,0.1); border:1px solid rgba(139,92,246,0.3); padding:15px; margin-bottom:20px;';
  proCard.innerHTML = `
    <div style="font-size:14px; font-weight:900; color:#fff; margin-bottom:5px;">⚡ ${title}</div>
    <div style="font-size:10px; color:#94a3b8; line-height:1.4; margin-bottom:12px;">${desc}</div>
  `;

  const runLogic = () => {
    try {
      const ed = window.editor || editor;
      if(!window.AIEngine || !ed) {
        console.error("Genius Error: Engine or Editor missing");
        return;
      }
      const code = ed.getValue();
      const res = window.AIEngine.architectLogic(code, lang);
      
      if(window.smartInject) window.smartInject(res, 'logic');
      else smartInject(res, 'logic');
      
      const confirmMsg = isFr ? '⚡ Logique activée ! Testez vos boutons.' : '⚡ Logic activated! Test your buttons.';
      if(window.showToast) window.showToast(confirmMsg);
      else showToast(confirmMsg);

      // Visual state feedback on the button itself
      if(magicBtn) {
        const lbl = magicBtn.querySelector('.lip-label');
        if(lbl) lbl.textContent = isFr ? '⚡ LOGIQUE ACTIVE' : '⚡ LOGIC ACTIVE';
        magicBtn.style.background = 'rgba(16, 185, 129, 0.2)';
        magicBtn.style.borderColor = '#10b981';
      }
    } catch (e) {
      console.error("Logic Architect Catch:", e);
    }
  };

  const magicBtn = mkBtn('✨', isFr ? 'ACTIVER LOGIQUE' : 'ACTIVATE LOGIC', false, runLogic);
  magicBtn.style.background = 'linear-gradient(90deg, #3b82f6, #8b5cf6)';
  magicBtn.style.color = '#fff';
  
  proCard.appendChild(magicBtn);
  body.appendChild(proCard);

  // --- 1. AI LOGIC WIZARD ---
  const inputWrap=document.createElement('div'); 
  inputWrap.style.cssText = 'background:rgba(59,130,246,0.05); border:1px solid rgba(59,130,246,0.1); border-radius:15px; padding:12px; margin-bottom:20px;';
  const inp=document.createElement('textarea'); inp.id='genius-prompt'; inp.placeholder=t('genHint'); inp.className = 'ai-input'; inp.style.height = '60px';
  const btn=document.createElement('button'); btn.className='ai-send'; btn.innerHTML='➤'; btn.style.height = '40px'; btn.style.marginTop = '8px';
  inputWrap.appendChild(inp); inputWrap.appendChild(btn); body.appendChild(inputWrap);

  // --- 3. BUSINESS KITS ---
  const bizH = document.createElement('div'); bizH.className='section-hdr'; bizH.style.marginTop='25px'; bizH.textContent=t('bizMarket');
  body.appendChild(bizH);
  const bizGrid = document.createElement('div'); bizGrid.style.cssText = 'display:grid; grid-template-columns:1fr; gap:10px; margin-bottom:25px;';
  if(window.AppGenius?.kits) {
    AppGenius.kits.forEach(k => {
      const card = mkBtn(k.icon, lang==='fr'?k.fr:k.en, false, () => smartInject(k.code, 'ui'));
      card.classList.add('service-card');
      bizGrid.appendChild(card);
    });
  }
  body.appendChild(bizGrid);

  // --- 4. LOGIC MARKETPLACE ---
  const libH = document.createElement('div'); libH.className='section-hdr'; libH.textContent=t('genMarket');
  body.appendChild(libH);
  const grid = document.createElement('div'); grid.style.cssText = 'display:grid; grid-template-columns:1fr; gap:10px; margin-bottom:20px;';
  if(window.AppGenius) {
    AppGenius.patterns.forEach(p => {
      const card = mkBtn(p.icon, lang==='fr'?p.fr:p.en, false, () => smartInject(p.code, 'logic'));
      card.classList.add('logic-card');
      grid.appendChild(card);
    });
  }
  body.appendChild(grid);

  // --- 5. GENIUS DB EXPLORER ---
  const dbH = document.createElement('div'); dbH.className='section-hdr'; dbH.style.marginTop='30px'; 
  dbH.style.display='flex'; dbH.style.justifyContent='space-between'; dbH.style.alignItems='center';
  dbH.innerHTML = `<span>${t('dbExplorer')}</span>`;
  const refBtn = document.createElement('button'); refBtn.className = 'sm-btn blue-btn'; refBtn.innerHTML = `🔄 ${t('refresh')}`;
  refBtn.style.padding = '4px 10px'; refBtn.style.fontSize = '9px';
  dbH.appendChild(refBtn); body.appendChild(dbH);

  const dbList = document.createElement('div'); dbList.id = 'genius-db-list';
  dbList.style.cssText = 'margin-top:15px; display:flex; flex-direction:column; gap:8px;';
  body.appendChild(dbList);

  const dbOps = document.createElement('div'); dbOps.style.cssText = 'display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:15px;';
  dbOps.appendChild(mkBtn('📥', t('exportData'), false, exportDB));
  dbOps.appendChild(mkBtn('📤', t('importData'), false, () => document.getElementById('db-import-file').click()));
  body.appendChild(dbOps);

  const wipeBtn = mkBtn('🗑️', t('wipe'), true, () => {
    if(confirm(lang==='fr'?'Vider la base ?':'Wipe database?')) {
      Object.keys(localStorage).filter(k => k.startsWith('genius_db_')).forEach(k => localStorage.removeItem(k));
      refreshDBExplorer();
    }
  });
  wipeBtn.style.marginTop = '8px'; body.appendChild(wipeBtn);

  const refreshDBExplorer = () => {
    dbList.innerHTML = '';
    const keys = Object.keys(localStorage).filter(k => k.startsWith('genius_db_'));
    if(!keys.length) { dbList.innerHTML = `<p style="text-align:center;font-size:10px;opacity:0.5;">(Empty)</p>`; return; }
    keys.forEach(k => {
      const row = document.createElement('div'); row.className = 'db-row';
      const count = JSON.parse(localStorage.getItem(k)).length || 0;
      row.innerHTML = `<span style="font-size:11px;">📂 ${k.replace('genius_db_','')} <span class="db-badge">${count}</span></span>`;
      const del = document.createElement('button'); del.innerHTML='×'; del.style.color='#ef4444'; del.style.background='none'; del.style.border='none'; del.style.cursor='pointer';
      del.onclick = () => { localStorage.removeItem(k); refreshDBExplorer(); };
      row.appendChild(del); dbList.appendChild(row);
    });
  };
  refBtn.onclick = refreshDBExplorer; refreshDBExplorer();

  btn.onclick = async () => {
    if(!inp.value) return; btn.innerHTML = '...';
    if(window.AIEngine) {
      smartInject(AIEngine.generate(inp.value), 'ui');
      smartInject(`\n<script>\n  // Logic for: ${inp.value}\n<\/script>\n`, 'logic');
    }
    btn.innerHTML = '➤'; inp.value = '';
  };
}

function exportDB() {
  const currentLang = typeof window.lang !== 'undefined' ? window.lang : 'en';
  const db = {};
  Object.keys(localStorage).filter(k => k.startsWith('genius_db_')).forEach(k => {
    db[k] = JSON.parse(localStorage.getItem(k));
  });
  const data = JSON.stringify(db, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = `GeniusDB_Backup_${Date.now()}.json`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  showToast(currentLang === 'fr' ? 'Base exportée !' : 'Database exported!');
}

function importDB(file) {
  if(!file) return;
  const currentLang = typeof window.lang !== 'undefined' ? window.lang : 'en';
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      Object.entries(data).forEach(([key, val]) => {
        if(key.startsWith('genius_db_')) {
          localStorage.setItem(key, JSON.stringify(val));
        }
      });
      showToast(currentLang === 'fr' ? 'Base importée !' : 'Database imported!');
      // Trigger a tab refresh if active
      if(typeof activeTab !== 'undefined' && activeTab === 'genius') renderTab('genius');
    } catch(err) { alert('Invalid JSON file.'); }
  };
  reader.readAsText(file);
}

function renderTranscode(body) {
  const h = document.createElement('div'); h.className = 'section-hdr'; h.textContent = t('transStudio');
  body.appendChild(h);

  const inp = document.createElement('textarea'); 
  inp.className = 'trans-area'; inp.placeholder = lang === 'fr' ? 'Texte sau Base64...' : 'Text sau Base64...';
  body.appendChild(inp);

  const btns = document.createElement('div'); btns.className = 'trans-btns';
  btns.style.gridTemplateColumns = '1fr 1fr 1fr'; // 3 columns for Base64, URL, HTML
  
  const bEnc = document.createElement('button'); bEnc.className = 'trans-btn btn-encode'; bEnc.textContent = 'B64 ↑'; bEnc.title = 'Base64 Encode';
  const bDec = document.createElement('button'); bDec.className = 'trans-btn btn-decode'; bDec.textContent = 'B64 ↓'; bDec.title = 'Base64 Decode';
  
  const bUrlEnc = document.createElement('button'); bUrlEnc.className = 'trans-btn btn-encode'; bUrlEnc.textContent = 'URL ↑'; bUrlEnc.title = 'URL Encode';
  const bUrlDec = document.createElement('button'); bUrlDec.className = 'trans-btn btn-decode'; bUrlDec.textContent = 'URL ↓'; bUrlDec.title = 'URL Decode';

  const bHtmlEnc = document.createElement('button'); bHtmlEnc.className = 'trans-btn btn-encode'; bHtmlEnc.textContent = 'HTML ↑'; bHtmlEnc.title = 'HTML Entity Encode';
  const bHtmlDec = document.createElement('button'); bHtmlDec.className = 'trans-btn btn-decode'; bHtmlDec.textContent = 'HTML ↓'; bHtmlDec.title = 'HTML Entity Decode';

  btns.appendChild(bEnc); btns.appendChild(bUrlEnc); btns.appendChild(bHtmlEnc);
  btns.appendChild(bDec); btns.appendChild(bUrlDec); btns.appendChild(bHtmlDec);
  body.appendChild(btns);

  const res = document.createElement('textarea'); 
  res.className = 'trans-area'; res.placeholder = 'Result...'; res.readOnly = true;
  body.appendChild(res);

  const bInj = mkBtn('⚡', t('injectTrans'), false, () => {
    if(res.value) insertAtCursor(res.value);
  });
  bInj.style.marginTop = '15px';
  body.appendChild(bInj);

  // Logic
  bEnc.onclick = () => { try { res.value = btoa(inp.value); } catch(e) { res.value = 'Error: Invalid characters'; }};
  bDec.onclick = () => { try { res.value = atob(inp.value); } catch(e) { res.value = 'Error: Invalid Base64'; }};
  
  bUrlEnc.onclick = () => { res.value = encodeURIComponent(inp.value); };
  bUrlDec.onclick = () => { try { res.value = decodeURIComponent(inp.value); } catch(e) { res.value = 'Error: Invalid URL encoding'; }};

  bHtmlEnc.onclick = () => {
    const d = document.createElement('div'); d.textContent = inp.value;
    res.value = d.innerHTML;
  };
  bHtmlDec.onclick = () => {
    const d = document.createElement('div'); d.innerHTML = inp.value;
    res.value = d.textContent;
  };
}

/* Pre-defined styles moved to refactored Style Lab at bottom */

function wireMagicButtons() {
  document.getElementById('mbtn-beautify')?.addEventListener('click', () => {
    if(!editor) return;
    let code = editor.getValue();
    editor.getAction('editor.action.formatDocument').run();
    if(window.AIEngine) {
      code = AIEngine.smartFix(code);
      editor.setValue(code);
    }
  });

  document.getElementById('mbtn-mobile')?.addEventListener('click', () => {
    if(!editor || !window.AIEngine) return;
    const res = AIEngine.applyResponsiveness(editor.getValue());
    editor.setValue(res);
  });

  document.getElementById('mbtn-dark')?.addEventListener('click', () => {
    if(!editor || !window.AIEngine) return;
    const dark = AIEngine.applyDarkMode(editor.getValue());
    editor.setValue(dark);
  });

  document.getElementById('mbtn-seo')?.addEventListener('click', () => {
    const seoMeta = `\n  <meta name="description" content="Professional website designed with IA Architecte.">\n  <meta property="og:title" content="My Premium Site">\n  <meta property="og:type" content="website">\n  <meta name="twitter:card" content="summary_large_image">\n`;
    let cur = editor.getValue();
    if(cur.includes('</head>')) {
      editor.setValue(cur.replace('</head>', seoMeta + '</head>'));
    } else {
      insertAtCursor(seoMeta);
    }
  });

  document.getElementById('mbtn-style-lab')?.addEventListener('click', () => {
    renderTab('stylelab');
  });

  document.getElementById('mbtn-real')?.addEventListener('click', () => {
    if(!editor || !window.AppGenius) return;
    try {
      const cur = editor.getValue();
      const res = AppGenius.functionalize(cur);
      if(res && res.success && res.code && res.code.trim().length > 0) {
        editor.setValue(res.code);
        runPreview();
        showToast(lang === 'fr' ? '🚀 Logique RÉELLE injectée ! Application fonctionnelle.' : '🚀 REAL Logic injected! Application is functional.');
      } else {
        showToast(lang === 'fr' ? 'ℹ️ Aucune zone interactive complexe détectée.' : 'ℹ️ No complex interactive zones detected.');
      }
    } catch(err) {
      console.error('RealMode Error:', err);
      showToast(lang === 'fr' ? '✕ Erreur de transformation.' : '✕ Transformation error.');
    }
  });

  document.getElementById('mbtn-explain')?.addEventListener('click', () => {
    if(!editor || !window.AIEngine) return;
    const code = editor.getValue();
    const res = AIEngine.autoExplain(code, lang);
    editor.setValue(res);
    
    // Show Visual Summary
    const summary = AIEngine.getAppSummary(res, lang);
    showTutorPopup(summary);
    
    showToast(lang === 'fr' ? '🎓 Analyse terminée !' : '🎓 Analysis complete!');
  });

  document.getElementById('mbtn-check-ready')?.addEventListener('click', () => {
    if(!editor || !window.AIEngine) return;
    const res = AIEngine.getFunctionalGuide(editor.getValue(), lang);
    showGuidePopup(res);
  });

  // Ensure label is translated even if LANG update failed
  const lblCheck = document.getElementById('lbl-magic-check');
  if(lblCheck) lblCheck.textContent = lang === 'fr' ? 'VÉRIFIER PRÊT' : 'CHECK READY';
}

function showGuidePopup(res) {
  const isFr = lang === 'fr';
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.style = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);backdrop-filter:blur(20px);z-index:10000;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.3s ease;';
  
  const card = document.createElement('div');
  card.style = 'background:linear-gradient(135deg, #0f172a, #1e293b);border:1px solid rgba(255,255,255,0.1);border-radius:32px;padding:40px;max-width:650px;width:95%;max-height:90vh;overflow-y:auto;box-shadow:0 40px 80px rgba(0,0,0,0.8);color:#fff;position:relative;';
  
  const title = document.createElement('h2');
  title.style = 'margin:0 0 30px 0;font-size:32px;font-weight:900;background:linear-gradient(135deg,#10b981,#3b82f6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;display:flex;align-items:center;gap:15px;';
  title.innerHTML = '✅ GENIUS GUIDE';

  const body = document.createElement('div');
  
  if (res.ready) {
    body.innerHTML = `
      <div style="text-align:center;padding:30px;">
        <div style="font-size:70px;margin-bottom:20px;">🚀</div>
        <div style="font-size:22px;font-weight:800;color:#10b981;margin-bottom:15px;">${res.msg}</div>
        <p style="color:#94a3b8;line-height:1.6;font-size:16px;">${isFr ? 'Félicitations ! Votre structure est valide. Vous pouvez maintenant injecter la logique réelle pour transformer ce design en une application vivante.' : 'Congratulations! Your structure is valid. You can now inject real logic to transform this design into a living application.'}</p>
        <div style="margin-top:30px;padding:20px;background:rgba(16,185,129,0.1);border-radius:20px;border:1px solid rgba(16,185,129,0.2);">
           <b style="color:#fff;display:block;margin-bottom:10px;">${isFr ? 'Étape Suivante :' : 'Next Step:'}</b>
           <p style="font-size:14px;color:#cbd5e1;">${isFr ? 'Cliquez sur 🚀 REAL MODE pour générer les scripts de connexion.' : 'Click on 🚀 REAL MODE to generate the connection scripts.'}</p>
        </div>
      </div>`;
  } else {
    body.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:25px;padding:12px 20px;background:rgba(59,130,246,0.1);border-radius:12px;border-left:4px solid #3b82f6;">
        <span style="font-size:20px;">ℹ️</span>
        <span style="font-weight:600;color:#e2e8f0;font-size:15px;">${isFr ? 'Actions Requises pour le MODE RÉEL' : 'Required Actions for REAL MODE'}</span>
      </div>
    `;
    
    res.advice.forEach(adv => {
      const section = document.createElement('div');
      section.style = 'background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:24px;margin-bottom:20px;transition:transform 0.2s;';
      section.onmouseover = () => section.style.transform = 'translateY(-2px)';
      section.onmouseout = () => section.style.transform = 'translateY(0)';
      
      const headerHtml = `
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">
          <div style="font-weight:800;color:#3b82f6;font-size:18px;">${adv.title}</div>
          <span style="font-size:10px;padding:4px 10px;background:rgba(59,130,246,0.1);color:#3b82f6;border-radius:20px;font-weight:900;text-transform:uppercase;">Genius Recommended</span>
        </div>
        <p style="font-size:14px;color:#94a3b8;margin-bottom:20px;line-height:1.6;">${adv.desc}</p>
      `;

      const codeContainer = document.createElement('div');
      codeContainer.style = 'position:relative;background:#000;border-radius:12px;border:1px solid #334155;overflow:hidden;';
      
      const toolbar = document.createElement('div');
      toolbar.style = 'display:flex;justify-content:space-between;align-items:center;padding:8px 15px;background:#0f172a;border-bottom:1px solid #1e293b;';
      toolbar.innerHTML = `<span style="font-size:10px;color:#64748b;font-weight:700;text-transform:uppercase;">Snippet Logic</span>`;
      
      const btnGrp = document.createElement('div');
      btnGrp.style = 'display:flex;gap:8px;';

      const copyBtn = document.createElement('button');
      copyBtn.innerHTML = isFr ? 'Copier' : 'Copy';
      copyBtn.style = 'background:#3b82f6;color:#fff;border:none;padding:5px 12px;border-radius:6px;font-size:11px;font-weight:800;cursor:pointer;transition:all 0.2s;';
      copyBtn.onclick = () => {
        navigator.clipboard.writeText(adv.code);
        copyBtn.textContent = isFr ? 'Copié !' : 'Copied!';
        copyBtn.style.background = '#10b981';
        setTimeout(() => { copyBtn.textContent = isFr ? 'Copier' : 'Copy'; copyBtn.style.background = '#3b82f6'; }, 2000);
      };

      const injectBtn = document.createElement('button');
      injectBtn.innerHTML = `🧬 ${isFr ? 'INJECTER' : 'INJECT'}`;
      injectBtn.style = 'background:linear-gradient(135deg,#8b5cf6,#d946ef);color:#fff;border:none;padding:5px 12px;border-radius:6px;font-size:11px;font-weight:800;cursor:pointer;transition:all 0.2s;';
      injectBtn.onclick = () => {
        smartInject(adv.code, adv.type);
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 300);
      };

      btnGrp.appendChild(copyBtn);
      btnGrp.appendChild(injectBtn);
      toolbar.appendChild(btnGrp);

      const codePre = document.createElement('pre');
      codePre.style = 'padding:15px;font-size:13px;color:#10b981;overflow-x:auto;margin:0;font-family:\'JetBrains Mono\', monospace;';
      codePre.textContent = adv.code;

      codeContainer.appendChild(toolbar);
      codeContainer.appendChild(codePre);

      section.innerHTML = headerHtml;
      section.appendChild(codeContainer);
      body.appendChild(section);
    });
  }

  const closeBtn = document.createElement('button');
  closeBtn.textContent = isFr ? 'Fermer le Guide' : 'Close Guide';
  closeBtn.style = 'width:100%;padding:18px;margin-top:20px;background:rgba(255,255,255,0.05);color:#fff;border:1px solid rgba(255,255,255,0.1);border-radius:15px;font-weight:800;cursor:pointer;transition:all 0.2s;';
  closeBtn.onmouseover = () => { closeBtn.style.background = 'rgba(255,255,255,0.1)'; closeBtn.style.borderColor = 'rgba(255,255,255,0.2)'; };
  closeBtn.onmouseout = () => { closeBtn.style.background = 'rgba(255,255,255,0.05)'; closeBtn.style.borderColor = 'rgba(255,255,255,0.1)'; };
  closeBtn.onclick = () => {
    overlay.style.opacity = '0';
    setTimeout(() => overlay.remove(), 300);
  };

  card.appendChild(title);
  card.appendChild(body);
  card.appendChild(closeBtn);
  overlay.appendChild(card);
  document.body.appendChild(overlay);
}

function showTutorPopup(markdown) {
  const overlay = document.createElement('div');
  overlay.style = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);backdrop-filter:blur(10px);z-index:10000;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.3s ease;';
  
  const card = document.createElement('div');
  card.style = 'background:var(--panel-bg, #0f172a);border:1px solid rgba(255,255,255,0.1);border-radius:24px;padding:32px;max-width:500px;width:90%;box-shadow:0 25px 50px rgba(0,0,0,0.5);color:#fff;position:relative;';
  
  const title = document.createElement('h2');
  title.style = 'margin:0 0 20px 0;font-size:24px;font-weight:900;background:linear-gradient(135deg,#3b82f6,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;display:flex;align-items:center;gap:12px;';
  title.innerHTML = '🎓 AI TUTOR ANALYSIS';
  
  const content = document.createElement('div');
  content.style = 'line-height:1.7;color:#cbd5e1;font-size:15px;margin-bottom:30px;';
  
  // Format Markdown to HTML for popup
  let html = markdown
    .replace(/### (.*)/g, '<div style="color:#fff;font-weight:800;margin-bottom:10px;font-size:16px;">$1</div>')
    .replace(/- (.*)/g, '<div style="margin-left:10px;margin-bottom:6px;display:flex;align-items:center;gap:8px;"><span style="color:#3b82f6">•</span> $1</div>')
    .replace(/\n\n/g, '<div style="margin-bottom:15px;"></div>');
  
  content.innerHTML = html;

  const btn = document.createElement('button');
  btn.textContent = lang === 'fr' ? 'Compris !' : 'Understood!';
  btn.style = 'width:100%;padding:14px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#fff;border:none;border-radius:12px;font-weight:800;cursor:pointer;';
  btn.onclick = () => overlay.remove();

  card.appendChild(title);
  card.appendChild(content);
  card.appendChild(btn);
  overlay.appendChild(card);
  document.body.appendChild(overlay);
}

function renderGames(body) {
  const games = window.GAMES_DATA || [];
  if(!games.length) {
    const p = document.createElement('p'); p.className = 'lpanel-hint'; p.textContent = 'No Games loaded.'; body.appendChild(p); return;
  }
  const hint = document.createElement('p'); hint.className = 'lpanel-hint';
  hint.textContent = lang === 'fr' ? `${games.length} jeux interactifs — choisis ton mode.` : `${games.length} interactive games — choose your mode.`;
  body.appendChild(hint);
  
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.gap = '10px';
  body.appendChild(container);
  
  // Update Subtitle to confirm V3.5 is active
  const sub = document.getElementById('lbl-subtitle');
  if(sub) sub.innerHTML = (window.lang === 'fr' ? 'Studio Pro' : 'Professional Studio') + ' <span style="background:#10b981;color:#fff;padding:2px 6px;border-radius:4px;font-size:9px;margin-left:8px;font-weight:900;box-shadow:0 4px 10px rgba(16,185,129,0.3)">V3.5 STABLE</span>';

  games.forEach((game, i) => {
    const card = document.createElement('div');
    card.className = 'lip-btn'; 
    card.style.cssText = 'display:flex; flex-direction:column; gap:8px; padding:12px; cursor:default; height:auto; background:rgba(59,130,246,0.1); border:1px solid rgba(59,130,246,0.2); border-radius:12px;';
    
    const title = lang === 'fr' ? game.fr : game.en;
    const desc = lang === 'fr' ? game.desc_fr : game.desc_en;
    
    card.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px; width:100%;">
        <span class="lip-icon" style="font-size:20px;">${game.icon}</span>
        <div class="lip-label" style="display:flex; flex-direction:column; gap:1px; flex:1;">
          <span style="font-size:11px; font-weight:700; color:#e2e8f0">${title}</span>
          <span style="font-size:9px; color:#94a3b8; font-weight:500; line-height:1.2;">${desc}</span>
        </div>
        <span style="font-size:8px; padding:2px 6px; border-radius:8px; background:rgba(16,185,129,0.15); color:#10b981; font-weight:800;">ARCADE</span>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; width:100%;">
        <button class="sm-btn blue-btn" id="load-${i}" style="padding:6px; font-size:9px; font-weight:900; letter-spacing:0.5px;">📥 ${t('loadGame').toUpperCase()}</button>
        <button class="sm-btn purple-btn" id="inject-${i}" style="padding:6px; font-size:9px; font-weight:900; letter-spacing:0.5px;">💉 ${t('injectGame').toUpperCase()}</button>
      </div>
    `;
    
    container.appendChild(card);
    
    card.querySelector(`#load-${i}`).onclick = (e) => {
      e.stopPropagation();
      if(confirm(lang==='fr'?'Charger ce jeu? (Ceci écrasera ton code actuel)':'Load this game? (This will overwrite your current code)')){
        if(editor) { editor.setValue(game.code); runPreview(); }
      }
    };
    card.querySelector(`#inject-${i}`).onclick = (e) => {
      e.stopPropagation();
      injectFullTemplate(game.code);
    };
  });
}

function renderGamesPro(body) {
  const games = window.GAMES_PRO_DATA || [];
  if(!games.length) {
    const p = document.createElement('p'); p.className = 'lpanel-hint'; p.textContent = 'No Games loaded.'; body.appendChild(p); return;
  }
  const hint = document.createElement('p'); hint.className = 'lpanel-hint';
  hint.textContent = lang === 'fr' ? `${games.length} jeux pro — exclusivité Arcade Pro.` : `${games.length} pro games — Arcade Pro exclusive.`;
  body.appendChild(hint);
  
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.gap = '10px';
  body.appendChild(container);
  
  const sub = document.getElementById('lbl-subtitle');
  if(sub) sub.innerHTML = (window.lang === 'fr' ? 'Studio Pro' : 'Professional Studio') + ' <span style="background:#8b5cf6;color:#fff;padding:2px 6px;border-radius:4px;font-size:9px;margin-left:8px;font-weight:900;box-shadow:0 4px 10px rgba(139,92,246,0.3)">ARCADE PRO V1.0</span>';

  games.forEach((game, i) => {
    const card = document.createElement('div');
    card.className = 'lip-btn'; 
    card.style.cssText = 'display:flex; flex-direction:column; gap:8px; padding:12px; cursor:default; height:auto; background:rgba(139,92,246,0.1); border:1px solid rgba(139,92,246,0.2); border-radius:12px;';
    
    const title = lang === 'fr' ? game.fr : game.en;
    const desc = lang === 'fr' ? game.desc_fr : game.desc_en;
    
    card.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px; width:100%;">
        <span class="lip-icon" style="font-size:20px;">${game.icon}</span>
        <div class="lip-label" style="display:flex; flex-direction:column; gap:1px; flex:1;">
          <span style="font-size:11px; font-weight:700; color:#e2e8f0">${title}</span>
          <span style="font-size:9px; color:#94a3b8; font-weight:500; line-height:1.2;">${desc}</span>
        </div>
        <span style="font-size:8px; padding:2px 6px; border-radius:8px; background:rgba(139,92,246,0.15); color:#8b5cf6; font-weight:800;">PRO</span>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; width:100%;">
        <button class="sm-btn blue-btn" id="load-pro-${i}" style="padding:6px; font-size:9px; font-weight:900; letter-spacing:0.5px; background:#3b82f6;">📥 ${t('loadGame').toUpperCase()}</button>
        <button class="sm-btn purple-btn" id="inject-pro-${i}" style="padding:6px; font-size:9px; font-weight:900; letter-spacing:0.5px; background:#8b5cf6;">💉 ${t('injectGame').toUpperCase()}</button>
      </div>
    `;
    
    container.appendChild(card);
    
    card.querySelector(`#load-pro-${i}`).onclick = (e) => {
      e.stopPropagation();
      if(confirm(lang==='fr'?'Charger ce jeu? (Ceci écrasera ton code actuel)':'Load this game? (This will overwrite your current code)')){
        if(editor) { editor.setValue(game.code); runPreview(); }
      }
    };
    card.querySelector(`#inject-pro-${i}`).onclick = (e) => {
      e.stopPropagation();
      injectFullTemplate(game.code);
    };
  });
}

/* ── RealWorld Apps Tab ─────────────────────────── */
function renderAppsUltra(body) {
  const apps = window.APPS_ULTRA_DATA || [];
  if(!apps.length) {
    const p = document.createElement('p'); p.className = 'lpanel-hint'; p.textContent = 'No Ultra Apps loaded.'; body.appendChild(p); return;
  }
  const hint = document.createElement('p'); hint.className = 'lpanel-hint';
  hint.textContent = lang === 'fr' ? `${apps.length} utilitaires pro — exclusivité Apps Ultra.` : `${apps.length} utilities pro — Apps Ultra exclusive.`;
  body.appendChild(hint);
  
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.gap = '10px';
  body.appendChild(container);
  
  const sub = document.getElementById('lbl-subtitle');
  if(sub) sub.innerHTML = (window.lang === 'fr' ? 'Studio Pro' : 'Professional Studio') + ' <span style="background:#f59e0b;color:#fff;padding:2px 6px;border-radius:4px;font-size:9px;margin-left:8px;font-weight:900;box-shadow:0 4px 10px rgba(245,158,11,0.3)">APPS ULTRA V1.0</span>';

  apps.forEach((app, i) => {
    const card = document.createElement('div');
    card.className = 'lip-btn'; 
    card.style.cssText = 'display:flex; flex-direction:column; gap:8px; padding:12px; cursor:default; height:auto; background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.2); border-radius:12px;';
    
    const title = lang === 'fr' ? app.fr : app.en;
    const desc = lang === 'fr' ? app.desc_fr : app.desc_en;
    
    card.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px; width:100%;">
        <span class="lip-icon" style="font-size:20px;">${app.icon}</span>
        <div class="lip-label" style="display:flex; flex-direction:column; gap:1px; flex:1;">
          <span style="font-size:11px; font-weight:700; color:#e2e8f0">${title}</span>
          <span style="font-size:9px; color:#94a3b8; font-weight:500; line-height:1.2;">${desc}</span>
        </div>
        <span style="font-size:8px; padding:2px 6px; border-radius:8px; background:rgba(245,158,11,0.15); color:#f59e0b; font-weight:800;">ULTRA</span>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; width:100%;">
        <button class="sm-btn blue-btn" id="load-ultra-${i}" style="padding:6px; font-size:9px; font-weight:900; letter-spacing:0.5px; background:#3b82f6;">📥 LOAD</button>
        <button class="sm-btn purple-btn" id="inject-ultra-${i}" style="padding:6px; font-size:9px; font-weight:900; letter-spacing:0.5px; background:#f59e0b;">💉 INJECT</button>
      </div>
    `;
    
    container.appendChild(card);
    
    card.querySelector(`#load-ultra-${i}`).onclick = (e) => {
      e.stopPropagation();
      if(confirm(lang==='fr'?'Charger cette application ? (Ceci écrasera votre code actuel)':'Load this app? (This will overwrite your current code)')){
        if(editor) { editor.setValue(app.code); runPreview(); }
      }
    };
    card.querySelector(`#inject-ultra-${i}`).onclick = (e) => {
      e.stopPropagation();
      injectFullTemplate(app.code);
    };
  });
}

function renderRealWorld(body){
  const apps=window.REALWORLD_APPS_DATA||[];
  if(!apps.length){
    const p=document.createElement('p');p.className='lpanel-hint';p.textContent='Loading RealWorld models...';body.appendChild(p);return;
  }
  const hint=document.createElement('p');hint.className='lpanel-hint';
  hint.textContent=lang==='fr'?`${apps.length} applications premium 100% fonctionnelles.`:`${apps.length} premium 100% functional applications.`;
  body.appendChild(hint);
  apps.forEach((app,i)=>{
    const btn=document.createElement('button');btn.className='lip-btn';
    const title=lang==='fr'?app.fr:app.en;
    const desc=lang==='fr'?(app.desc_fr||''):(app.desc_en||'');
    btn.innerHTML=`<span class="lip-icon">${app.icon}</span><span class="lip-label" style="display:flex;flex-direction:column;gap:1px"><span style="font-size:11px;font-weight:700;color:#e2e8f0">${title}</span><span style="font-size:9px;color:#94a3b8;font-weight:500">${desc}</span></span><span style="font-size:9px;padding:2px 7px;border-radius:10px;background:rgba(59,130,246,.15);color:var(--accent);font-weight:800;flex-shrink:0">ULTRA</span>`;
    btn.addEventListener('click',()=>{
      if(editor){editor.setValue(app.code);runPreview();}
    });
    body.appendChild(btn);
  });
}

/* ── Apps Tab ────────────────────────────────────── */
function renderApps(body){
  const apps=window.APPS_DATA||[];
  if(!apps.length){
    const p=document.createElement('p');p.className='lpanel-hint';p.textContent='No apps loaded.';body.appendChild(p);return;
  }
  const hint=document.createElement('p');hint.className='lpanel-hint';
  hint.textContent=lang==='fr'?`${apps.length} applications complètes — cliquez pour charger dans l'éditeur.`:`${apps.length} full apps — click to load into the editor.`;
  body.appendChild(hint);
  apps.forEach((app,i)=>{
    const btn=document.createElement('button');btn.className='lip-btn';
    const title=lang==='fr'?app.fr:app.en;
    const desc=lang==='fr'?(app.desc_fr||''):( app.desc_en||'');
    btn.innerHTML=`<span class="lip-icon">${app.icon}</span><span class="lip-label" style="display:flex;flex-direction:column;gap:1px"><span style="font-size:11px;font-weight:700;color:#e2e8f0">${title}</span><span style="font-size:9px;color:#64748b;font-weight:500">${desc}</span></span><span style="font-size:9px;padding:2px 7px;border-radius:10px;background:rgba(59,130,246,.1);color:#3b82f6;font-weight:800;flex-shrink:0">#${i+1}</span>`;
    btn.title=`Load: ${title}`;
    btn.addEventListener('click',()=>{
      if(editor){editor.setValue(app.code);runPreview();}
    });
    body.appendChild(btn);
  });
}

/* ── Apps Pro Tab ────────────────────────────────── */
function renderAppsPro(body){
  const apps=window.APPS_PRO_DATA||[];
  if(!apps.length){
    const p=document.createElement('p');p.className='lpanel-hint';p.textContent='Loading Pro models...';body.appendChild(p);return;
  }
  const hint=document.createElement('p');hint.className='lpanel-hint';
  hint.textContent=lang==='fr'?`${apps.length} applications professionnelles — modèles exclusifs.`:`${apps.length} professional applications — exclusive models.`;
  body.appendChild(hint);
  apps.forEach((app,i)=>{
    const btn=document.createElement('button');btn.className='lip-btn';
    const title=lang==='fr'?app.fr:app.en;
    const desc=lang==='fr'?(app.desc_fr||''):(app.desc_en||'');
    btn.innerHTML=`<span class="lip-icon">${app.icon}</span><span class="lip-label" style="display:flex;flex-direction:column;gap:1px"><span style="font-size:11px;font-weight:700;color:#e2e8f0">${title}</span><span style="font-size:9px;color:#94a3b8;font-weight:500">${desc}</span></span><span style="font-size:9px;padding:2px 7px;border-radius:10px;background:rgba(167,139,250,.1);color:#a78bfa;font-weight:800;flex-shrink:0">PRO</span>`;
    btn.title=`Load: ${title}`;
    btn.addEventListener('click',()=>{
      if(editor){editor.setValue(app.code);runPreview();}
    });
    body.appendChild(btn);
  });
}

/* ── Sites Tab ────────────────────────────────────── */
function renderSites(body){
  const sites=window.SITES_DATA||[];
  if(!sites.length){
    const p=document.createElement('p');p.className='lpanel-hint';p.textContent='No site templates loaded.';body.appendChild(p);return;
  }
  const hint=document.createElement('p');hint.className='lpanel-hint';
  hint.textContent=lang==='fr'?`${sites.length} sites Web complets — prêts pour vos données.`:`${sites.length} full sites — ready for your data and content.`;
  body.appendChild(hint);
  sites.forEach((site,i)=>{
    const btn=document.createElement('button');btn.className='lip-btn';
    const title=lang==='fr'?site.fr:site.en;
    const desc=lang==='fr'?(site.desc_fr||''):(site.desc_en||'');
    btn.innerHTML=`<span class="lip-icon">${site.icon}</span><span class="lip-label" style="display:flex;flex-direction:column;gap:1px"><span style="font-size:11px;font-weight:700;color:#e2e8f0">${title}</span><span style="font-size:9px;color:#64748b;font-weight:500">${desc}</span></span><span style="font-size:9px;padding:2px 7px;border-radius:10px;background:rgba(8,185,129,.1);color:#10b981;font-weight:800;flex-shrink:0">S${i+1}</span>`;
    btn.title=`Load: ${title}`;
    btn.addEventListener('click',()=>{
      if(editor){editor.setValue(site.code);runPreview();}
    });
    body.appendChild(btn);
  });
}

/* ── AI Tab ──────────────────────────────────────── */
function renderAI(body){
  body.style.padding='0';body.style.overflow='hidden';body.style.height='100%';
  const wrap=document.createElement('div');wrap.className='ai-chat';wrap.style.height='100%';wrap.style.padding='10px';

  // Info box — how AI works
  const infoBox=document.createElement('div');infoBox.className='ai-info-box';
  const exTags=(LANG[lang]||LANG.en).aiExTags||[];
  infoBox.innerHTML=`<div class="ai-info-title">${t('aiHow')}</div><div class="ai-info-desc">${t('aiHowDesc')}</div><div class="ai-info-tags">${exTags.map(ex=>`<span class="ai-example-tag">${ex}</span>`).join('')}</div>`;
  infoBox.querySelectorAll('.ai-example-tag').forEach(tag=>{
    tag.addEventListener('click',()=>{
      const inp=document.getElementById('ai-input');if(inp){inp.value=tag.textContent;inp.focus();}
    });
  });
  wrap.appendChild(infoBox);

  const msgs=document.createElement('div');msgs.className='ai-messages';msgs.id='ai-msgs';
  aiHistory.forEach(m=>msgs.appendChild(makeMsg(m.role,m.text)));

  const inputArea=document.createElement('div');inputArea.className='ai-input-area';
  const quickBtns=document.createElement('div');quickBtns.className='ai-quick-btns';
  const quickList=[t('explain'),t('fixErrors'),t('makeResponsive'),t('addAnimation'),t('addDarkMode')];
  quickList.forEach(q=>{
    const b=document.createElement('button');b.className='ai-quick';b.textContent=q;
    b.addEventListener('click',()=>sendAI(q));quickBtns.appendChild(b);
  });

  const inputRow=document.createElement('div');inputRow.className='ai-input-row';
  const inp=document.createElement('textarea');inp.className='ai-input';inp.id='ai-input';
  inp.placeholder=t('hintAi');inp.rows=2;
  inp.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendAI(inp.value);}});
  const sendBtn=document.createElement('button');sendBtn.className='ai-send';sendBtn.textContent='➤';
  sendBtn.addEventListener('click',()=>sendAI(inp.value));
  inputRow.appendChild(inp);inputRow.appendChild(sendBtn);
  inputArea.appendChild(quickBtns);inputArea.appendChild(inputRow);
  wrap.appendChild(msgs);wrap.appendChild(inputArea);body.appendChild(wrap);
}

function makeMsg(role,text){
  const div=document.createElement('div');div.className='ai-msg '+role;
  const lbl=document.createElement('strong');lbl.textContent=role==='bot'?'🤖 IA Architecte':'👤 You';
  div.appendChild(lbl);
  const content=document.createElement('span');content.textContent=text;
  div.appendChild(content);
  return div;
}

function sendAI(prompt){
  if(!prompt.trim())return;
  const inp=document.getElementById('ai-input');if(inp)inp.value='';
  const msgs=document.getElementById('ai-msgs');if(!msgs)return;

  aiHistory.push({role:'user',text:prompt});
  msgs.appendChild(makeMsg('user',prompt));

  const typing=document.createElement('div');typing.className='ai-msg bot';
  typing.innerHTML='<div class="ai-typing"><span></span><span></span><span></span></div>';
  msgs.appendChild(typing);msgs.scrollTop=msgs.scrollHeight;

  setTimeout(()=>{
    msgs.removeChild(typing);
    const response=processAI(prompt);
    aiHistory.push({role:'bot',text:response.text});
    const msgEl=makeMsg('bot',response.text);
    if(response.code){
      const btn=document.createElement('button');btn.className='ai-code-btn';
      btn.innerHTML='⚡ '+( lang==='fr'?'Insérer le code':'Insert Code');
      btn.addEventListener('click',()=>{
        if(editor)editor.setValue(response.fullPage?response.code:code+'\n\n'+response.code);
        runPreview();
      });
      msgEl.appendChild(btn);
    }
    msgs.appendChild(msgEl);msgs.scrollTop=msgs.scrollHeight;
  },800+Math.random()*600);
}

function processAI(prompt){
  const p=prompt.toLowerCase();
  const isFr = (lang === 'fr');
  
  if(!window.AIEngine) return {text: "AI Engine Offline", code: null};

  // 1. Refactoring & Logic Fixes
  if(p.includes('fix')||p.includes('corriger')||p.includes('error')||p.includes('erreur')){
    const fixed = AIEngine.smartFix(code);
    return {
      text: isFr?'⚠️ J\'ai optimisé la structure de votre code.':'⚠️ I have optimized your code structure.',
      code: fixed, fullPage: true
    };
  }

  if(p.includes('responsive')||p.includes('mobile')||p.includes('adapté')){
    return {
      text: isFr?'📱 Version responsive générée.':'📱 Responsive version generated.',
      code: AIEngine.applyResponsiveness(code), fullPage: true
    };
  }

  // 2. Knowledge Hub Search (Navigator)
  const search = AIEngine.ask(prompt, lang);
  if(search.found) {
    const top = search.actions[0];
    if(top.type !== 'designer' && !p.includes('create') && !p.includes('faire') && !p.includes('génère')) {
      AIEngine.execute(top);
      return { text: search.text, code: null };
    }
  }

  // 3. Component Generation
  const intent = AIEngine.intentOf(prompt);
  const generatedCode = AIEngine.generate(prompt);
  const fullPageIntents = ['hero','dashboard','login','pricing','footer','portfolio','timeline'];
  
  if(intent === 'generic' && !p.includes('create') && !p.includes('faire') && !p.includes('gen') && !p.includes('met')) {
     return {
       text: isFr?`Je n'ai pas trouvé d'outil précis pour "${prompt}". Voulez-vous que je génère un composant ?` : `I didn't find a specific tool for "${prompt}". Would you like me to generate a component?`, 
       code: generatedCode, fullPage: false 
     };
  }

  return {
    text: isFr?`✅ Voici votre composant "${prompt}" sur mesure.`:`✅ Here is your custom "${prompt}" component.`,
    code: generatedCode, fullPage: fullPageIntents.includes(intent)
  };
}

/* ── Snippets Tab ────────────────────────────────── */
function renderSnippets(body){
  const hint=document.createElement('p');hint.className='lpanel-hint';hint.textContent=t('hintSnip');body.appendChild(hint);
  SNIPPETS.forEach(s=>{
    const btn=mkBtn(s.icon,lang==='fr'?s.fr:s.en,false,()=>{
      if(!editor)return;
      editor.executeEdits('',[{range:editor.getSelection(),text:'\n'+s.code+'\n',forceMoveMarkers:true}]);
      editor.focus();
    });body.appendChild(btn);
  });
}

/* ── Templates Tab ───────────────────────────────── */
function renderTemplates(body){
  const hint=document.createElement('p');hint.className='lpanel-hint';hint.textContent=t('hintTpl');body.appendChild(hint);
  TEMPLATES.forEach(tpl=>{
    const btn=mkBtn(tpl.icon,lang==='fr'?tpl.fr:tpl.en,false,()=>{if(editor)editor.setValue(tpl.code);});
    body.appendChild(btn);
  });
}

/* ── Tools Tab ───────────────────────────────────── */
function renderTools(body){
  // --- 1. SEARCH BAR ---
  const sWrap = document.createElement('div');
  sWrap.style.cssText = 'position:sticky; top:0; background:var(--panel-bg); z-index:10; padding-bottom:15px; margin-bottom:10px; border-bottom:1px solid rgba(255,255,255,0.05);';
  const sInp = document.createElement('input');
  sInp.className = 'ai-input';
  sInp.placeholder = lang === 'fr' ? '🔍 Rechercher un outil...' : '🔍 Search tools...';
  sInp.oninput = () => {
    const q = sInp.value.toLowerCase();
    body.querySelectorAll('.tool-card, .lip-btn, .section-hdr, .service-card').forEach(c => {
      const txt = c.textContent.toLowerCase();
      c.style.display = txt.includes(q) ? '' : 'none';
    });
  };
  sWrap.appendChild(sInp);
  body.appendChild(sWrap);

  const mkH = (txt) => { const h = document.createElement('div'); h.className = 'section-hdr'; h.textContent = txt; body.appendChild(h); return h; };

  // --- 2. LAYOUT & STRUCTURE ---
  mkH(lang==='fr'?'📐 Mise en Page & Structure':'📐 Layout & Structure');
  
  // Flexbox Visualizer
  const flexCard = mkCard(lang==='fr'?'Générateur Flexbox':'Flexbox Visualizer');
  flexCard.innerHTML += `<div style="display:flex; gap:5px; margin-bottom:10px; flex-wrap:wrap;">
    <button class="sm-btn blue-btn" onclick="const c='display:flex; justify-content:center; align-items:center;'; if(window.editor) window.editor.executeEdits('',[{range:window.editor.getSelection(),text:c,forceMoveMarkers:true}])">Center</button>
    <button class="sm-btn blue-btn" onclick="const c='display:flex; justify-content:space-between; align-items:center;'; if(window.editor) window.editor.executeEdits('',[{range:window.editor.getSelection(),text:c,forceMoveMarkers:true}])">Between</button>
    <button class="sm-btn blue-btn" onclick="const c='display:flex; flex-direction:column; gap:15px;'; if(window.editor) window.editor.executeEdits('',[{range:window.editor.getSelection(),text:c,forceMoveMarkers:true}])">Column</button>
  </div>`;
  body.appendChild(flexCard);

  // Grid Generator
  const gridCard = mkCard(lang==='fr'?'Grilles Interactives':'Interactive Grids');
  gridCard.appendChild(mkBtn('⊞', lang==='fr'?'Grille 2 Cols':'2 Col Grid', false, () => insertAtCursor('\n<div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">\n  <div>Column 1</div>\n  <div>Column 2</div>\n</div>\n')));
  gridCard.appendChild(mkBtn('⊟', lang==='fr'?'Grille 3 Cols':'3 Col Grid', false, () => insertAtCursor('\n<div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:20px;">\n  <div>1</div>\n  <div>2</div>\n  <div>3</div>\n</div>\n')));
  body.appendChild(gridCard);

  // --- 3. EXISTING TOOLS (Refactored) ---
  mkH(lang==='fr'?'🎨 Design & Esthétique':'🎨 Design & Aesthetics');
  // Gradients
  const gCard=mkCard(lang==='fr'?'🌈 Générateur de Dégradés':'🌈 Gradient Builder');
  const gPrev=document.createElement('div');gPrev.className='gradient-preview';
  gPrev.style.background=`linear-gradient(135deg,${TOOLS_GRADIENTS[0][0]},${TOOLS_GRADIENTS[0][1]})`;
  const gBtns=document.createElement('div');gBtns.className='gradient-btns';
  TOOLS_GRADIENTS.forEach(([c1,c2])=>{
    const b=document.createElement('button');b.className='grad-btn';
    b.style.cssText=`background:linear-gradient(135deg,${c1},${c2});width:28px;height:28px;border-radius:6px;`;
    b.title=`${c1} → ${c2}`;
    b.addEventListener('click',()=>{
      gPrev.style.background=`linear-gradient(135deg,${c1},${c2})`;
      if(editor){editor.executeEdits('',[{range:editor.getSelection(),text:`background: linear-gradient(135deg, ${c1}, ${c2})`,forceMoveMarkers:true}]);}
    });
    gBtns.appendChild(b);
  });
  gCard.appendChild(gPrev);gCard.appendChild(gBtns);body.appendChild(gCard);

  // Fonts
  const fCard=mkCard(lang==='fr'?'🔤 Polices Google Fonts':'🔤 Google Fonts');
  const fPrev=document.createElement('div');fPrev.className='font-preview';fPrev.textContent='IA Architecte Pro';
  const fSel=document.createElement('select');fSel.className='cust-select';
  TOOLS_FONTS.forEach(f=>{const o=document.createElement('option');o.value=f;o.textContent=f;fSel.appendChild(o);});
  fSel.addEventListener('change',()=>{
    fPrev.style.fontFamily=fSel.value;
    const link=`<link href="https://fonts.googleapis.com/css2?family=${fSel.value.replace(/ /g,'+')}&display=swap" rel="stylesheet"/>`;
    if(editor)editor.executeEdits('',[{range:editor.getSelection(),text:link,forceMoveMarkers:true}]);
  });
  fCard.appendChild(fSel);fCard.appendChild(fPrev);body.appendChild(fCard);

  // Animations
  const aCard=mkCard(lang==='fr'?'✨ Animations CSS':'✨ CSS Animations');
  const aGrid=document.createElement('div');aGrid.className='anim-grid';
  const animCSS={
    fadeIn:'@keyframes fadeIn{from{opacity:0}to{opacity:1}}',
    slideUp:'@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}',
    pulse:'@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}',
    spin:'@keyframes spin{to{transform:rotate(360deg)}}',
    bounce:'@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}',
    glow:'@keyframes glow{0%,100%{box-shadow:0 0 5px #3b82f6}50%{box-shadow:0 0 20px #3b82f6,0 0 40px #3b82f6}}'
  };
  TOOLS_ANIMS.forEach(([name,desc])=>{
    const b=document.createElement('button');b.className='anim-btn';b.title=desc;
    b.textContent=name;
    b.addEventListener('click',()=>{
      const css=`<style>\n${animCSS[name]}\n.my-element{animation:${name} 1s ease infinite;}\n</style>`;
      if(editor)editor.executeEdits('',[{range:editor.getSelection(),text:css,forceMoveMarkers:true}]);
    });
    aGrid.appendChild(b);
  });
  aCard.appendChild(aGrid);body.appendChild(aCard);

  // Transforms
  const trHdr=document.createElement('div');trHdr.className='section-hdr';trHdr.textContent=lang==='fr'?'🎨 Transformations de style':'🎨 Style Transforms';
  body.appendChild(trHdr);
  [['🌙',lang==='fr'?'Mode Sombre':'Dark Mode',c=>c.replace(/background:\s*#(?:fff|ffffff)/gi,'background:#080c14').replace(/color:\s*#(?:000|111|222|333)/gi,'color:#e2e8f0')],
   ['🔮',lang==='fr'?'Glassmorphisme':'Glassmorphism',c=>c.replace(/<style>/i,'<style>\n.card,div:not(body){backdrop-filter:blur(12px);background:rgba(255,255,255,0.05)!important;border:1px solid rgba(255,255,255,0.1)!important;}\n')],
   ['⭕',lang==='fr'?'Arrondi':'Rounded',c=>c.replace(/border-radius:\s*\d+px/g,'border-radius:18px')],
   ['🌈',lang==='fr'?'Fond Dégradé':'Gradient BG',c=>c.replace(/(background(?:-color)?:\s*)#080c14/g,'$1linear-gradient(135deg,#080c14,#0f1a30)')],
  ].forEach(([icon,label,fn])=>{
    body.appendChild(mkBtn(icon,label,false,()=>{const nc=fn(code);if(editor)editor.setValue(nc);}));
  });

  // NEW TOOLS
  const pCard=mkCard(lang==='fr'?'🧩 Placeholders Images':'🧩 Image Placeholders');
  pCard.innerHTML+=`<input type="text" id="p-dim" class="cust-select" placeholder="Width x Height (eg. 800x600)" style="margin-bottom:8px">`;
  pCard.appendChild(mkBtn('🖼️',lang==='fr'?'Générer Image':'Generate Image',false,()=>{
    const d=document.getElementById('p-dim').value||'800x400';
    const tag=`<img src="https://placehold.jp/24/3b82f6/ffffff/${d}.png?text=IA%20Architecte" alt="Placeholder" style="width:100%;max-width:100%;border-radius:12px;">`;
    if(editor)editor.executeEdits('',[{range:editor.getSelection(),text:tag,forceMoveMarkers:true}]);
  }));
  body.appendChild(pCard);

  const cCard=mkCard(lang==='fr'?'🎨 Labo Couleurs':'🎨 Color Lab');
  cCard.innerHTML+=`<input type="color" id="c-pick" style="width:100%;height:40px;border-radius:8px;border:none;background:none;cursor:pointer">`;
  cCard.appendChild(mkBtn('📋',lang==='fr'?'Copier HEX':'Copy HEX',false,()=>{
    const c=document.getElementById('c-pick').value;
    if(editor)editor.executeEdits('',[{range:editor.getSelection(),text:c,forceMoveMarkers:true}]);
  }));
  body.appendChild(cCard);

  const shadowCard = mkCard(lang === 'fr' ? '🌑 Ombre Portée Pro' : '🌑 Box Shadow Pro');
  shadowCard.innerHTML += `<div style="display:flex; flex-direction:column; gap:8px; margin-bottom:12px;">
    <input type="range" id="sh-blur" min="0" max="100" value="30" style="width:100%;" oninput="const b=this.value+'px'; document.getElementById('sh-prev').style.boxShadow='0 10px '+b+' rgba(0,0,0,0.3)';">
    <div id="sh-prev" style="height:40px; background:rgba(59,130,246,0.1); border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:800;">PREVIEW</div>
  </div>`;
  shadowCard.appendChild(mkBtn('📋', lang === 'fr' ? 'Injecter Ombre' : 'Inject Shadow', false, () => {
    const b = document.getElementById('sh-blur').value;
    insertAtCursor(`box-shadow: 0 10px ${b}px rgba(0,0,0,0.3);`);
  }));
  body.appendChild(shadowCard);

  // Neumorphism Lab
  const neuCard = mkCard(lang === 'fr' ? '☁️ Labo Neumorphisme' : '☁️ Neumorphism Lab');
  neuCard.appendChild(mkBtn('✨', lang === 'fr' ? 'Générer Soft UI' : 'Generate Soft UI', false, () => {
    insertAtCursor(`background: #e0e0e0; border-radius: 50px; box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;`);
  }));
  body.appendChild(neuCard);

  // --- 4. CODE UTILITIES ---
  mkH(lang === 'fr' ? '🛠️ Utilitaires de Code' : '🛠️ Code Utilities');

  // JSON Formatter
  const jsonCard = mkCard(lang === 'fr' ? '📦 Formateur JSON' : '📦 JSON Formatter');
  jsonCard.appendChild(mkBtn('✨', lang === 'fr' ? 'Embellir JSON' : 'Beautify JSON', false, () => {
    try {
      const cur = editor.getValue();
      const obj = JSON.parse(cur);
      editor.setValue(JSON.stringify(obj, null, 2));
    } catch (e) { showToast('Invalid JSON'); }
  }));
  body.appendChild(jsonCard);

  // Unit Converter (PX to REM)
  const unitCard = mkCard(lang === 'fr' ? '📏 Convertisseur PX/REM' : '📏 PX to REM Converter');
  unitCard.innerHTML += `<div style="display:flex; gap:8px; margin-bottom:10px;">
    <input type="number" id="px-val" placeholder="PX" style="width:100%; padding:8px; border-radius:8px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff;">
    <div id="rem-res" style="padding:8px; font-weight:800; color:#3b82f6;">0rem</div>
  </div>`;
  unitCard.querySelector('#px-val').oninput = (e) => {
    const rem = e.target.value / 16;
    document.getElementById('rem-res').textContent = rem.toFixed(3) + 'rem';
  };
  unitCard.appendChild(mkBtn('⚡', lang === 'fr' ? 'Injecter REM' : 'Inject REM', false, () => {
    insertAtCursor(document.getElementById('rem-res').textContent);
  }));
  body.appendChild(unitCard);

  // Lorem Ipsum Pro
  const loremCard = mkCard(lang === 'fr' ? '📝 Lorem Ipsum Pro' : '📝 Lorem Ipsum Pro');
  loremCard.appendChild(mkBtn('📄', lang === 'fr' ? 'Court' : 'Short', false, () => insertAtCursor('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')));
  loremCard.appendChild(mkBtn('📜', lang === 'fr' ? 'Paragraphe' : 'Paragraph', false, () => insertAtCursor('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.')));
  body.appendChild(loremCard);

  // HTML Entity Picker
  const entCard = mkCard(lang === 'fr' ? '🔣 Symboles HTML' : '🔣 HTML Symbols');
  const entGrid = document.createElement('div'); entGrid.style.cssText = 'display:grid; grid-template-columns:repeat(5,1fr); gap:5px;';
  ['&copy;', '&reg;', '&trade;', '&bull;', '&rarr;', '&larr;', '&uarr;', '&darr;', '&times;', '&check;'].forEach(ent => {
    const eb = document.createElement('button'); eb.className = 'anim-btn'; eb.innerHTML = ent; eb.style.padding = '8px';
    eb.onclick = () => insertAtCursor(ent);
    entGrid.appendChild(eb);
  });
  entCard.appendChild(entGrid);
  body.appendChild(entCard);

  // --- 5. CONTENT & MEDIA ---
  mkH(lang === 'fr' ? '🖼️ Contenu & Média' : '🖼️ Content & Media');

  // SVG Patterns
  const patCard = mkCard(lang === 'fr' ? '🏁 Motifs SVG' : '🏁 SVG Patterns');
  patCard.appendChild(mkBtn('🔳', lang === 'fr' ? 'Quadrillage' : 'Grid Pattern', false, () => {
    insertAtCursor(`\n<div style="background-image: radial-gradient(#3b82f6 0.5px, transparent 0.5px); background-size: 20px 20px; width:100%; height:200px; border-radius:15px;"></div>\n`);
  }));
  patCard.appendChild(mkBtn('🌊', lang === 'fr' ? 'Vagues' : 'Waves Pattern', false, () => {
    insertAtCursor(`\n<div style="background: linear-gradient(135deg, #3b82f6 25%, transparent 25%) -10px 0, linear-gradient(225deg, #3b82f6 25%, transparent 25%) -10px 0, linear-gradient(45deg, #3b82f6 25%, transparent 25%), linear-gradient(315deg, #3b82f6 25%, #0f172a 25%); background-size: 20px 20px; width:100%; height:200px; border-radius:15px;"></div>\n`);
  }));
  body.appendChild(patCard);

  // Avatar Placeholder
  const avaCard = mkCard(lang === 'fr' ? '👤 Avatars Aléatoires' : '👤 Random Avatars');
  avaCard.appendChild(mkBtn('🎭', lang === 'fr' ? 'Injecter Avatar' : 'Inject Avatar', false, () => {
    const id = Math.floor(Math.random() * 100);
    insertAtCursor(`<img src="https://i.pravatar.cc/150?u=${id}" alt="Avatar" style="width:60px; height:60px; border-radius:50%; border:2px solid #3b82f6;">`);
  }));
  body.appendChild(avaCard);

  body.appendChild(mkBtn('↩',t('restore'),true,()=>{const s=localStorage.getItem('ia_arch_code');if(s&&editor)editor.setValue(s);}));
}


/* ── Toolbox Pro Tab ────────────────────────────── */
function renderToolboxPro(body){
  const data = window.TOOLBOX_PRO_DATA || [];
  if(!data.length){
    const p=document.createElement('p');p.className='lpanel-hint';p.textContent='Loading Pro Toolbox...';body.appendChild(p);return;
  }
  
  const hint=document.createElement('p');hint.className='lpanel-hint';
  hint.textContent=lang==='fr'?'Composants premium pour vos architectures web. Cliquez pour insérer.':'Premium components for your web architectures. Click to insert.';
  body.appendChild(hint);

  data.forEach(cat=>{
    const hdr=document.createElement('div');hdr.className='lpanel-group-hdr';
    hdr.textContent=cat.category;
    body.appendChild(hdr);

    cat.items.forEach(item=>{
      const label=lang==='fr'?item.fr:item.en;
      const btn=mkBtn(item.icon,label,false,()=>{
        if(!editor)return;
        editor.executeEdits('',[{range:editor.getSelection(),text:'\n'+item.code+'\n',forceMoveMarkers:true}]);
        editor.focus();
      });
      body.appendChild(btn);
    });
  });
}

/* ── Settings Tab ────────────────────────────────── */
function renderSettings(body){
  const fsGrp=mkCard(`${t('fontSize')}: <strong id="fs-val">${fontSize}px</strong>`);
  fsGrp.querySelector('.tool-label').innerHTML=`${t('fontSize')}: <strong id="fs-val">${fontSize}px</strong>`;
  const rr=document.createElement('div');rr.className='range-row';
  const fd=document.createElement('button');fd.className='sm-btn';fd.textContent='−';
  const fi=document.createElement('button');fi.className='sm-btn';fi.textContent='+';
  const rt=document.createElement('div');rt.className='range-track';
  const rf=document.createElement('div');rf.className='range-fill';rf.id='fs-fill';rf.style.width=((fontSize-10)/14)*100+'%';
  rt.appendChild(rf);rr.appendChild(fd);rr.appendChild(rt);rr.appendChild(fi);fsGrp.appendChild(rr);body.appendChild(fsGrp);
  fd.addEventListener('click',()=>{fontSize=Math.max(10,fontSize-1);editor?.updateOptions({fontSize});document.getElementById('fs-val').textContent=fontSize+'px';rf.style.width=((fontSize-10)/14)*100+'%';});
  fi.addEventListener('click',()=>{fontSize=Math.min(24,fontSize+1);editor?.updateOptions({fontSize});document.getElementById('fs-val').textContent=fontSize+'px';rf.style.width=((fontSize-10)/14)*100+'%';});

  const wwGrp=mkCard(t('wordWrap'));
  const rrr=document.createElement('div');rrr.className='radio-row';
  ['on','off'].forEach(v=>{const b=document.createElement('button');b.className='radio-btn'+(wordWrap===v?' active':'');b.dataset.ww=v;b.textContent=v==='on'?(lang==='fr'?'Actif':'On'):(lang==='fr'?'Inactif':'Off');b.addEventListener('click',()=>{wordWrap=v;editor?.updateOptions({wordWrap});rrr.querySelectorAll('.radio-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');});rrr.appendChild(b);});
  wwGrp.appendChild(rrr);body.appendChild(wwGrp);

  const thGrp=mkCard(t('theme'));
  const sel=document.createElement('select');sel.className='cust-select';
  [['vs-dark',t('dark')],['vs',t('light')],['hc-black',t('hc')]].forEach(([v,l])=>{const o=document.createElement('option');o.value=v;o.textContent=l;o.selected=v===editorTheme;sel.appendChild(o);});
  sel.addEventListener('change',()=>{editorTheme=sel.value;if(window.monaco)monaco.editor.setTheme(editorTheme);});
  thGrp.appendChild(sel);body.appendChild(thGrp);

  const stGrp=mkCard('Stats');
  const sr=document.createElement('div');sr.className='stats-row';
  sr.innerHTML=`<span><strong>${code.split('\n').length}</strong> ${t('lines')}</span><span><strong>${code.length}</strong> ${t('chars')}</span>`;
  stGrp.appendChild(sr);body.appendChild(stGrp);

  const{issues}=audit(code);
  if(issues.length){
    const iBox=document.createElement('div');iBox.className='issue-box';
    iBox.innerHTML=`<div class="issue-hdr">⚠ ${issues.length} ${t('issues')}</div>`+issues.map(i=>`<div class="issue-item">• ${i}</div>`).join('');
    body.appendChild(iBox);
  }
}

function mkCard(labelHTML){
  const d=document.createElement('div');d.className='tool-card';
  const l=document.createElement('div');l.className='tool-label';l.innerHTML=labelHTML;
  d.appendChild(l);return d;
}

function mkBtn(icon,label,danger,onClick){
  const b=document.createElement('button');b.className='lip-btn'+(danger?' lip-danger':'');
  b.innerHTML=`<span class="lip-icon">${icon}</span><span class="lip-label">${label}</span><span class="lip-arrow">›</span>`;
  b.addEventListener('click',onClick);return b;
}

function renderEliteApps(body){
  const apps=window.PRO_APPS_DATA||[];
  if(!apps.length){
    const p=document.createElement('p');p.className='lpanel-hint';p.textContent='No Elite apps loaded.';body.appendChild(p);return;
  }
  const hint=document.createElement('p');hint.className='lpanel-hint';
  hint.textContent=lang==='fr'?`${apps.length} applications Elite complexes — prêtes pour la production.`:`${apps.length} complex Elite apps — production-ready templates.`;
  body.appendChild(hint);
  apps.forEach((app,i)=>{
    const btn=document.createElement('button');btn.className='lip-btn';
    const title=lang==='fr'?app.fr:app.en;
    const desc=lang==='fr'?(app.desc_fr||''):(app.desc_en||'');
    btn.innerHTML=`<span class="lip-icon">${app.icon}</span><span class="lip-label" style="display:flex;flex-direction:column;gap:1px"><span style="font-size:11px;font-weight:700;color:#e2e8f0">${title}</span><span style="font-size:9px;color:#cbd5e1;font-weight:500">${desc}</span></span><span style="font-size:9px;padding:2px 7px;border-radius:10px;background:rgba(239,68,68,.1);color:#ef4444;font-weight:800;flex-shrink:0">PRO</span>`;
    btn.addEventListener('click',()=>{if(editor){editor.setValue(app.code);runPreview();}});
    body.appendChild(btn);
  });
}

function downloadFile(content,name,type){
  const b=new Blob([content],{type});const u=URL.createObjectURL(b);
  const a=Object.assign(document.createElement('a'),{href:u,download:name});
  document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(u);
}

function renderModels(body){
  const models=window.MODELS_DATA||[];
  if(!models.length){
    const p=document.createElement('p');p.className='lpanel-hint';p.textContent='No 3D Models loaded.';body.appendChild(p);return;
  }
  const hint=document.createElement('p');hint.className='lpanel-hint';
  hint.textContent=lang==='fr'?`${models.length} modèles 3D "4D" avec Three.js — Choisissez une action.`:`${models.length} 3D "4D" models with Three.js — Choose an action.`;
  body.appendChild(hint);

  models.forEach((mod,i)=>{
    const card=document.createElement('div');card.className='lip-btn';
    card.style.flexDirection='column'; card.style.alignItems='stretch'; card.style.padding='12px';card.style.gap='8px';card.style.cursor='default';
    
    const title=lang==='fr'?mod.fr:mod.en;
    const desc=lang==='fr'?(mod.desc_fr||''):(mod.desc_en||'');

    card.innerHTML=`
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:5px;">
        <span class="lip-icon" style="font-size:20px;">${mod.icon}</span>
        <div style="display:flex;flex-direction:column;gap:1px;flex:1">
          <span style="font-size:11px;font-weight:700;color:#e2e8f0">${title}</span>
          <span style="font-size:9px;color:#cbd5e1;font-weight:500;line-height:1.2">${desc}</span>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
        <button class="sm-btn blue-btn" id="mod-load-${i}" title="Load as full project" style="font-size:9px;padding:6px;font-weight:800">📂 ${lang==='fr'?'CHARGER':'LOAD'}</button>
        <button class="sm-btn green-btn" id="mod-inject-${i}" title="Inject into current" style="font-size:9px;padding:6px;font-weight:800">🧬 ${lang==='fr'?'INJECTER':'INJECT'}</button>
      </div>
    `;

    body.appendChild(card);

    // Event Listeners
    card.querySelector(`#mod-load-${i}`).addEventListener('click',()=>{
       if(editor){editor.setValue(mod.code);runPreview();showToast(title+' (Full) Loaded');}
    });

    card.querySelector(`#mod-inject-${i}`).addEventListener('click',()=>{
       if(editor){
         const cleanCode=smartExtractModelCode(mod.code);
         insertAtCursor('\n'+cleanCode+'\n');
         runPreview();
         showToast(title+' Injected');
       }
    });
  });
}

function renderAudit(body){
  const h=document.createElement('div'); h.className='section-hdr'; h.textContent=lang==='fr'?'Audit Professionnel':'Professional Audit';
  body.appendChild(h);

  if(!window.AIEngine) return;
  const scores = window.AIEngine.getCodeScore(code);
  const healthTips = window.AIEngine.checkCodeHealth(code, lang);

  const scoreGrid = document.createElement('div');
  scoreGrid.style.cssText = 'display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:20px;';
  
  const mkScore = (label, val, clr) => `
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.05); padding:15px; border-radius:15px; text-align:center;">
        <div style="font-size:9px; color:#64748b; text-transform:uppercase; margin-bottom:5px;">${label}</div>
        <div style="font-size:20px; font-weight:900; color:${clr}">${val}%</div>
        <div style="height:3px; background:rgba(255,255,255,0.05); border-radius:10px; margin-top:8px; overflow:hidden;">
            <div style="width:${val}%; height:100%; background:${clr}"></div>
        </div>
    </div>
  `;

  scoreGrid.innerHTML = 
    mkScore('SEO', scores.seo, '#3b82f6') +
    mkScore('Performance', scores.perf, '#f59e0b') +
    mkScore('Accessibility', scores.a11y, '#10b981') +
    mkScore('Best Practices', 95, '#8b5cf6');
  
  body.appendChild(scoreGrid);

  const tipsH = document.createElement('div'); tipsH.className='section-hdr'; tipsH.textContent=lang==='fr'?'Suggestions IA':'AI Suggestions';
  body.appendChild(tipsH);

  const tipsList = document.createElement('div');
  tipsList.style.cssText = 'display:flex; flex-direction:column; gap:8px;';
  
  if(healthTips.length === 0) {
    tipsList.innerHTML = `<div style="padding:15px; background:rgba(16,185,129,0.05); border:1px solid rgba(16,185,129,0.2); border-radius:12px; color:#10b981; font-size:11px;">
        ✨ <b>Perfect Health!</b> Your code follows all professional standards.
    </div>`;
  } else {
    healthTips.forEach(tip => {
        const item = document.createElement('div');
        item.style.cssText = 'padding:12px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:10px; margin-bottom:8px;';
        
        const content = document.createElement('div');
        content.innerHTML = `
            <div style="font-weight:700; font-size:11px; color:#fca5a5; margin-bottom:4px">⚠ ${tip.issue}</div>
            <div style="font-size:10px; color:#94a3b8; line-height:1.4; margin-bottom:8px">${tip.suggestion}</div>
        `;
        item.appendChild(content);

        if (tip.fixId) {
            const fixBtn = document.createElement('button');
            fixBtn.innerHTML = `✨ ${lang === 'fr' ? 'AUTO-CORRECTION' : 'AUTO-FIX'}`;
            fixBtn.style.cssText = 'width:100%; padding:6px; background:linear-gradient(90deg, #3b82f633, #8b5cf633); border:1px solid #3b82f655; border-radius:6px; color:#fff; font-size:9px; font-weight:800; cursor:pointer; transition:0.2s; letter-spacing:0.5px;';
            fixBtn.onmouseover = () => fixBtn.style.background = 'linear-gradient(90deg, #3b82f666, #8b5cf666)';
            fixBtn.onmouseout = () => fixBtn.style.background = 'linear-gradient(90deg, #3b82f633, #8b5cf633)';
            
            fixBtn.onclick = () => {
                if(!window.AIEngine || !editor) return;
                const newCode = window.AIEngine.applyAutoFix(editor.getValue(), tip.fixId, lang);
                editor.setValue(newCode);
                if(window.showToast) window.showToast(lang === 'fr' ? '✅ Corrigé avec succès !' : '✅ Successfully fixed!');
                // Auto-refresh stats and panel
                updateQuality();
                renderTab('audit');
            };
            item.appendChild(fixBtn);
        }

        tipsList.appendChild(item);
    });
  }
  body.appendChild(tipsList);
}

function renderAssets(body) {
  const h = document.createElement('div'); h.className = 'section-hdr'; h.textContent = lang === 'fr' ? 'Banque D\'Assets' : 'Asset Bank';
  body.appendChild(h);

  const categories = [
    {
      title: lang === 'fr' ? '🌟 Essentiels' : '🌟 Essentials',
      icons: [
        { n: 'Home', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' },
        { n: 'User', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' },
        { n: 'Settings', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1-2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>' },
        { n: 'Search', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>' },
        { n: 'Heart', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>' },
        { n: 'Bell', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>' },
        { n: 'Mail', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>' },
        { n: 'Calendar', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>' },
      ]
    },
    {
      title: lang === 'fr' ? '⚡ Actions' : '⚡ Actions',
      icons: [
        { n: 'Plus', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>' },
        { n: 'Trash', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>' },
        { n: 'Edit', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>' },
        { n: 'Download', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>' },
        { n: 'Share', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>' },
        { n: 'Check', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>' },
        { n: 'X', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>' },
        { n: 'Eye', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>' },
      ]
    },
    {
      title: lang === 'fr' ? '📱 Social & Brand' : '📱 Social & Brand',
      icons: [
        { n: 'Facebook', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>' },
        { n: 'Twitter', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>' },
        { n: 'Instagram', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>' },
        { n: 'Github', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-4.51-2-7-2"/></svg>' },
        { n: 'Linkedin', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>' },
        { n: 'Youtube', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.42 5.58a2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.42-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>' },
        { n: 'Apple', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.94c1.88 0 3.05-1.07 4.64-1.07 1.51 0 2.45.99 4.39.99 1.41 0 2.97-1.14 2.97-4.14 0-4.66-2.61-7.16-5.83-7.16-1.57 0-2.85 1.05-4.17 1.05-1.32 0-2.64-1.05-4.17-1.05-3.3 0-6.17 3.32-6.17 7.74 0 2.94 1.34 5.37 3.65 5.37 1.25 0 2.14-.99 3.42-.99 1.13 0 1.83 1.07 3.67 1.07Zm.43-14.8c1.39-.1 2.87-1.12 3.49-2.2 1-1.63.17-3.41-.17-3.94-1.52.07-3.13 1.1-3.79 2.22-1 1.63-.16 3.41.47 3.92Z"/></svg>' },
        { n: 'Google', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' },
      ]
    },
    {
      title: lang === 'fr' ? '📊 Média & Data' : '📊 Media & Data',
      icons: [
        { n: 'Camera', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>' },
        { n: 'Video', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>' },
        { n: 'Music', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>' },
        { n: 'Mic', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>' },
        { n: 'Database', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>' },
        { n: 'BarChart', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>' },
        { n: 'PieChart', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>' },
        { n: 'LineChart', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3Z"/><path d="m13 13 9 9"/></svg>' },
      ]
    },
    {
      title: lang === 'fr' ? '🏗️ Business' : '🏗️ Business',
      icons: [
        { n: 'Briefcase', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>' },
        { n: 'ShoppingBag', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>' },
        { n: 'CreditCard', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>' },
        { n: 'Dollar', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>' },
        { n: 'TrendingUp', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>' },
        { n: 'Globe', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' },
        { n: 'Truck', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="10" x="2" y="6" rx="2"/><path d="M16 8h2.08a2 2 0 0 1 1.52.7l2.12 2.47a2 2 0 0 1 .48 1.3V19"/><circle cx="7" cy="19" r="2"/><circle cx="17" cy="19" r="2"/></svg>' },
        { n: 'Layers', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polygon points="2 17 12 22 22 17"/><polygon points="2 12 12 17 22 12"/></svg>' },
      ]
    },
    {
      title: lang === 'fr' ? '⬅️ Navigation' : '⬅️ Navigation',
      icons: [
        { n: 'ArrowUp', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>' },
        { n: 'ArrowDown', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 12-7 7-7-7"/><path d="M12 5v14"/></svg>' },
        { n: 'ArrowLeft', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>' },
        { n: 'ArrowRight', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 5 7 7-7 7"/><path d="M5 12h14"/></svg>' },
        { n: 'ChevronUp', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>' },
        { n: 'ChevronDown', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>' },
        { n: 'Menu', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="18" y2="18"/></svg>' },
        { n: 'Filter', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>' },
      ]
    },
    {
      title: lang === 'fr' ? '🧱 Formats & Shapes' : '🧱 Formats & Shapes',
      icons: [
        { n: 'Circle', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>' },
        { n: 'Square', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>' },
        { n: 'Triangle', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20h18L12 4Z"/></svg>' },
        { n: 'Pentagon', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 10 7.5-3.8 11.5H5.8L2 9.5Z"/></svg>' },
        { n: 'Layout', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg>' },
        { n: 'Grid', s: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="3" x2="21" y1="15" y2="15"/><line x1="9" x2="9" y1="3" y2="21"/><line x1="15" x2="15" y1="3" y2="21"/></svg>' },
        { n: 'Separator', s: '<span style="display:block;height:2px;background:rgba(255,255,255,0.1);width:100%;"></span>' },
        { n: 'Glow', s: '<div style="width:24px;height:24px;border-radius:50%;background:radial-gradient(circle, #3b82f6 0%, transparent 70%);opacity:0.6;"></div>' },
      ]
    }
  ];

  categories.forEach(cat => {
    const card = mkCard(cat.title);
    const grid = document.createElement('div');
    grid.style.cssText = 'display:grid; grid-template-columns:repeat(4, 1fr); gap:10px; margin-top:5px;';

    cat.icons.forEach(icon => {
      const b = document.createElement('button');
      b.className = 'anim-btn';
      b.innerHTML = icon.s;
      b.style.cssText = 'padding:12px; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.03); border-radius:10px; transition:all 0.2s;';
      b.title = icon.n;
      b.addEventListener('mouseover', () => b.style.background = 'rgba(255,255,255,0.08)');
      b.addEventListener('mouseout', () => b.style.background = 'rgba(255,255,255,0.03)');
      b.addEventListener('click', () => {
        if (editor) editor.executeEdits('', [{ range: editor.getSelection(), text: icon.s, forceMoveMarkers: true }]);
        showToast(icon.n + ' Injected');
      });
      grid.appendChild(b);
    });

    card.appendChild(grid);
    body.appendChild(card);
  });
}

/* ── Live Style Tuner (Refactored) ───────────────── */
function renderStyleLab(body) {
  const h = document.createElement('div'); h.className = 'section-hdr'; h.textContent = t('styleTuner');
  body.appendChild(h);

  // --- 1. LIVE TUNER ---
  const tunerWrap = document.createElement('div'); tunerWrap.style.cssText = 'display:flex; flex-direction:column; gap:15px;';

  const mkTuner = (label, varName, min, max, unit='') => {
    const card = mkCard(label);
    const row = document.createElement('div'); row.style.cssText = 'display:flex; align-items:center; gap:10px;';
    const slider = document.createElement('input');
    slider.type = 'range'; slider.min = min; slider.max = max; slider.style.flex = '1'; slider.style.accentColor = 'var(--accent, #3b82f6)';
    slider.oninput = () => { applyVisualStyle(varName, slider.value + unit); };
    row.appendChild(slider); tunerWrap.appendChild(card); card.appendChild(row);
  };

  const mkColorTuner = (label, varName) => {
    const card = mkCard(label);
    const pick = document.createElement('input');
    pick.type = 'color'; pick.style.width = '100%'; pick.style.height = '30px'; pick.style.border='none'; pick.style.cursor='pointer';
    pick.oninput = () => { applyVisualStyle(varName, pick.value); };
    card.appendChild(pick); tunerWrap.appendChild(card);
  };

  mkColorTuner(t('primary'), '--genius-primary');
  mkTuner(t('radius'), '--genius-radius', 0, 50, 'px');
  mkTuner(t('blur'), '--genius-blur', 0, 20, 'px');
  body.appendChild(tunerWrap);

  const resetBtn = mkBtn('🔄', t('resetStyles'), true, resetVisualStyles);
  resetBtn.style.marginTop = '15px';
  resetBtn.style.marginBottom = '25px';
  body.appendChild(resetBtn);

  // --- 2. STYLE PRESETS ---
  const presH = document.createElement('div'); presH.className = 'section-hdr'; presH.textContent = lang==='fr'?'🎨 Préréglages':'🎨 Style Presets';
  body.appendChild(presH);
  
  const effCard = mkCard(lang === 'fr' ? '✨ Effets' : '✨ Effects');
  STYLE_LAB.effects.forEach(eff => {
    const label = lang === 'fr' ? eff.name_fr : eff.name_en;
    effCard.appendChild(mkBtn(eff.icon, label, false, () => insertAtCursor(eff.code)));
  });
  body.appendChild(effCard);
}

/* ── Deployment Logic ────────────────────────────── */
function openDeployModal() {
  const modal = document.getElementById('deploy-modal');
  const hud = modal.querySelector('.deploy-hud');
  const opts = document.getElementById('deploy-options');
  const status = document.getElementById('deploy-status');
  
  modal.style.display = 'flex';
  hud.style.display = 'flex';
  opts.style.display = 'none';
  
  const steps = [
    { t: lang === 'fr' ? '🔍 Audit de la Structure...' : '🔍 Auditing Structure...', d: 800 },
    { t: lang === 'fr' ? '🧬 Bundling de la Logique...' : '🧬 Bundling Logic...', d: 1000 },
    { t: lang === 'fr' ? '🏗️ Génération des Assets...' : '🏗️ Generating Assets...', d: 1200 },
    { t: lang === 'fr' ? '🛡️ Encryption de la Passerelle...' : '🛡️ Encrypting Gateway...', d: 900 }
  ];

  let currentStep = 0;
  const runSequence = () => {
    if(currentStep < steps.length) {
      status.textContent = steps[currentStep].t;
      setTimeout(() => {
        currentStep++;
        runSequence();
      }, steps[currentStep].d);
    } else {
      status.textContent = lang === 'fr' ? '✅ PRÊT POUR DÉPLOIEMENT' : '✅ READY FOR DEPLOYMENT';
      setTimeout(() => {
        hud.style.display = 'none';
        opts.style.display = 'grid';
        // Add Elite Bundle Button if not exists
        if(!document.getElementById('btn-elite-pack')) {
          const eliteBtn = document.createElement('button');
          eliteBtn.id = 'btn-elite-pack';
          eliteBtn.className = 'sm-btn gold-btn';
          eliteBtn.style.gridColumn = '1 / -1';
          eliteBtn.style.marginTop = '10px';
          eliteBtn.style.padding = '15px';
          eliteBtn.innerHTML = `💎 ${lang === 'fr' ? 'PACK ÉLITE (BUNDLE UNIQUE)' : 'ELITE BUNDLE (SINGLE FILE)'}`;
          eliteBtn.onclick = buildEliteBundle;
          opts.appendChild(eliteBtn);
        }
      }, 800);
    }
  };

  runSequence();
}

function publishLive() {
  const sanitized = sanitizeStandalone(code);
  const cssM = sanitized.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
  const css = cssM ? cssM.map(x => x.replace(/<style[^>]*>|<\/style>/gi, '')).join('\n') : '';
  const jsM = sanitized.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
  const js = jsM ? jsM.map(x => x.replace(/<script[^>]*>|<\/script>/gi, '')).join('\n') : '';
  
  // Strip tags from main HTML for CodePen JSON
  let html = sanitized
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');

  const data = {
    title: "IA Architecte — Live Project",
    description: "Generated by AuraGen Studio",
    html: html,
    css: css,
    js: js,
  };

  const json = JSON.stringify(data).replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://codepen.io/pen/define/';
  form.target = '_blank';
  
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = 'data';
  input.value = json;
  
  form.appendChild(input);
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
  
  document.getElementById('deploy-modal').style.display = 'none';
}

async function buildMobileApp() {
  const btn = document.getElementById('btn-mobile-pack');
  const lbl = document.getElementById('lbl-mob-title');
  const origText = lbl.textContent;
  lbl.textContent = '⏳ ...';
  
  try {
    if(!window.JSZip) throw new Error('JSZip missing');
    const sanitized = sanitizeStandalone(code);
    const zip = new JSZip();
    
    // 1. Extract Project Info
    const titleMatch = sanitized.match(/<title>(.*?)<\/title>/i);
    const appName = titleMatch ? titleMatch[1] : 'AuraGen App';
    
    // 2. Prepare PWA Manifest
    const manifest = {
      "short_name": appName,
      "name": appName,
      "icons": [
        {
          "src": "https://cdn-icons-png.flaticon.com/512/2592/2592317.png",
          "type": "image/png",
          "sizes": "512x512",
          "purpose": "any maskable"
        }
      ],
      "start_url": ".",
      "background_color": "#080c14",
      "display": "standalone",
      "scope": "/",
      "theme_color": "#3b82f6",
      "description": "Professional Web Application generated by AuraGen AI Architecte."
    };
    
    // 3. Prepare Service Worker
    const swCode = `const CACHE_NAME = 'auragen-app-v1';
const assets = ['./', './index.html', './style.css', './script.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});`;

    // 4. Inject PWA logic into HTML
    let mobileCode = sanitized;
    
    // Add Meta Tags
    const pwaMeta = `\n  <meta name="apple-mobile-web-app-capable" content="yes">\n  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">\n  <meta name="theme-color" content="#3b82f6">\n  <link rel="manifest" href="manifest.json">\n  <link rel="apple-touch-icon" href="https://cdn-icons-png.flaticon.com/512/2592/2592317.png">`;
    if(mobileCode.includes('</head>')) {
      mobileCode = mobileCode.replace('</head>', pwaMeta + '\n</head>');
    }
    
    // Add Service Worker Registration
    const swRegScript = `\n  <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').then(reg => console.log('SW Registered'), err => console.log('SW Failed', err));
      });
    }
  <\/script>\n`;
    if(mobileCode.includes('</body>')) {
      mobileCode = mobileCode.replace('</body>', swRegScript + '</body>');
    }

    // 5. Build ZIP
    const cssM = sanitized.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
    const css = cssM ? cssM.map(x => x.replace(/<style[^>]*>|<\/style>/gi, '')).join('\n') : '';
    const jsM = sanitized.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
    const js = jsM ? jsM.map(x => x.replace(/<script[^>]*>|<\/script>/gi, '')).join('\n') : '';

    zip.file('index.html', mobileCode);
    zip.file('style.css', css);
    zip.file('script.js', js);
    zip.file('manifest.json', JSON.stringify(manifest, null, 2));
    zip.file('sw.js', swCode);

    const blob = await zip.generateAsync({type:'blob'});
    const u = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement('a'), {href:u, download:`Mobile_App_${Date.now()}.zip`});
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(u);

    // 6. Success Feedback
    lbl.textContent = '✓ Build Ready!';
    alert(t('mobileReady') + '\n\nAndroid: Chrome -> Install App\niOS: Safari -> Share -> Add to Home Screen');
    
  } catch(e) {
    lbl.textContent = '✕ Error';
    console.error(e);
  }
  
  setTimeout(() => { lbl.textContent = origText; }, 3000);
  document.getElementById('deploy-modal').style.display = 'none';
}

async function buildEliteBundle() {
  const btn = document.getElementById('btn-elite-pack');
  const origHTML = btn.innerHTML;
  btn.innerHTML = '🕒 PACKAGING...';
  
  try {
    if(!window.JSZip) throw new Error('JSZip missing');
    const ed = window.editor || editor;
    const code = ed.getValue();
    
    // 1. Package with AI Engine
    const pack = window.AIEngine.packageElite(code, "Elite Project", lang);
    const zip = new JSZip();
    
    // 2. Add files
    zip.file('index.html', pack.html);
    zip.file('manifest.json', pack.manifest);
    zip.file('README.txt', `IA-PRO ELITE BUNDLE\n====================\n\nYour application "${pack.filename}" is ready for hosting.\n\nInstructions:\n1. Upload index.html and manifest.json to any static host (Netlify, Vercel, or even your own server).\n2. Your app is PWA-ready and includes a custom splash screen.\n\nGenerated with IA-PRO Genius Engine.`);

    const blob = await zip.generateAsync({type:'blob'});
    const u = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement('a'), {
      href: u, 
      download: `ELITE_APP_${Date.now()}.zip`
    });
    document.body.appendChild(a); a.click(); document.body.removeChild(a); 
    
    btn.innerHTML = '✅ BUNDLE READY!';
    setTimeout(() => { 
        btn.innerHTML = origHTML; 
        document.getElementById('deploy-modal').style.display = 'none';
    }, 2000);

  } catch(e) {
    btn.innerHTML = '✕ FAILED';
    console.error("Elite Packing Error:", e);
    setTimeout(() => { btn.innerHTML = origHTML; }, 3000);
  }
}

function insertAtCursor(text) {
  if(!editor) return;
  const model = editor.getModel();
  const selectionArr = editor.getSelections() || [];
  
  const edits = selectionArr.map(selection => ({
    range: selection,
    text: text,
    forceMoveMarkers: true
  }));
  
  model.pushEditOperations(selectionArr, edits, () => null);
  editor.pushUndoStop();
  editor.focus();
}

/** 🧬 REVOLUTIONARY: Sandbox Injection (Stable & Bulletproof) */
function smartExtractModelCode(html) {
  const modelId = "mod-3d-" + Math.random().toString(36).substring(2, 9);
  
  // 1. Extract CSS (Remove body-level constraints)
  const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  let style = styleMatch ? styleMatch[1].replace(/body\s*{[^}]*}/gi, '') : '';
  
  // 2. Extract Scripts (CDN links)
  const scriptSrcs = html.match(/<script\s+src=['"][^'"]+['"]><\/script>/gi) || [];
  
  // 3. Extract Logic (The core Three.js code)
  const logicMatch = html.match(/<script>(?!src)([\s\S]*?)<\/script>/i);
  let logic = logicMatch ? logicMatch[1] : '';

  // 4. Create the Widget Wrapper
  let result = `\n<!-- 🧬 3D COMPONENT: ${modelId} -->\n`;
  result += `<div id="${modelId}" class="injected-3d-widget" style="width:100%; height:450px; position:relative; overflow:hidden; border-radius:15px; margin:25px 0; background:#080c14; border:1px solid rgba(255,255,255,0.06); box-shadow:0 20px 40px rgba(0,0,0,0.3);">\n`;
  result += `</div>\n`;

  // 📝 STYLING: Scoped to the widget
  result += `<style>\n  #${modelId} canvas { position: absolute !important; top:0; left:0; width:100% !important; height:100% !important; border-radius:15px; }\n  ${style}\n</style>\n`;

  // 📦 DEPENDENCIES
  scriptSrcs.forEach(s => result += s + "\n");

  // ⚡ LOGIC: Safely redirected and polled for Three.js readiness
  result += `<script>(function(){ 
    const container = document.getElementById("${modelId}");
    if(!container) return;

    function run3D() {
      try {
        // Redirection variables for the sandbox
        let code = \`${logic.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;

        // Apply Redirections via replacement
        code = code.replace(/document\\.body\\.appendChild/g, 'container.appendChild');
        code = code.replace(/window\\.innerWidth/g, 'container.offsetWidth');
        code = code.replace(/window\\.innerHeight/g, 'container.offsetHeight');
        code = code.replace(/window\\.onresize\\s*=\\s*\\(\\)\\s*=>/g, 'const resizer = () =>');

        // Execute in a controlled sandbox
        const executor = new Function('container', 'THREE', code);
        executor(container, window.THREE);

      } catch(err) { console.error('3D Widget Runtime Error [${modelId}]:', err); }
    }

    // 🔥 SMART POLLING: Wait for THREE.js and DOM container dimensions
    let attempts = 0;
    const bootCheck = setInterval(() => {
      attempts++;
      if (window.THREE && container.offsetWidth > 0) {
        clearInterval(bootCheck);
        run3D();
      } else if (attempts > 50) { // Timeout after 5s
        clearInterval(bootCheck);
        console.warn('3D Widget Timeout: Three.js or Container Width missing');
      }
    }, 100);
  })();<\/script>\n`;

  return result;
}

/* ── Media Vault Tab ─────────────────────────────── */
const QUICK_MEDIA = {
  photos: [
    { name: 'Architecture 1', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', icon: '🏙️' },
    { name: 'Nature Forest', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80', icon: '🌲' },
    { name: 'Tech Setup', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80', icon: '💻' },
    { name: 'Modern House', url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80', icon: '🏠' },
    { name: 'Luxury Interior', url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', icon: '🛋️' }
  ],
  videos: [
    { name: 'Particles', url: 'https://cdn.pixabay.com/vimeo/328221651/particles-23158.mp4?width=1280&hash=d3780373c0519ed002b545f479a0b120c159846b', icon: '✨' },
    { name: 'Clouds', url: 'https://cdn.pixabay.com/vimeo/146053361/cloud-1087.mp4?width=1280&hash=8de0990760459c086435bd2826a7ee0212f458e0', icon: '☁️' },
    { name: 'Coding', url: 'https://cdn.pixabay.com/vimeo/341641031/code-23743.mp4?width=1280&hash=365ef60ed3fc411130ea51717865c692994e43e2', icon: '⌨️' }
  ]
};

function renderMedia(body) {
  const h = document.createElement('div'); h.className = 'section-hdr'; h.textContent = t('tabMedia');
  body.appendChild(h);

  // --- 1. MEDIA STUDIO (UNSPLASH & FONTS) ---
  if(window.MediaStudio) {
    const studioWrap = document.createElement('div');
    studioWrap.innerHTML = window.MediaStudio.renderMediaTab();
    body.appendChild(studioWrap);
  }

  // --- 2. QUICK ASSETS GALLERY ---
  const qH = document.createElement('div'); qH.className = 'section-hdr'; qH.style.marginTop = '25px'; qH.textContent = lang === 'fr' ? '🌟 Lib Rapide' : '🌟 Fast Library';
  body.appendChild(qH);

  const qGrid = document.createElement('div');
  qGrid.style.cssText = 'display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:10px;';
  
  [...QUICK_MEDIA.photos, ...QUICK_MEDIA.videos].forEach(item => {
    const b = document.createElement('button');
    b.className = 'anim-btn';
    b.style.cssText = 'background:#0f172a; border:1px solid rgba(255,255,255,0.05); padding:10px; border-radius:10px; font-size:20px; position:relative;';
    b.innerHTML = item.icon;
    b.onclick = () => {
      const tag = item.url.includes('.mp4') 
        ? `\n<video src="${item.url}" muted loop autoplay style="width:100%; border-radius:15px; box-shadow:0 10px 30px rgba(0,0,0,0.3)"></video>\n`
        : `\n<img src="${item.url}" style="width:100%; border-radius:155px; box-shadow:0 10px 35px rgba(0,0,0,0.2)" alt="${item.name}">\n`;
      insertAtCursor(tag);
      if(window.showToast) window.showToast('✅ Generic Asset Injected');
    };
    qGrid.appendChild(b);
  });
  body.appendChild(qGrid);

  // --- 3. PHOTO STUDIO ---
  const pCard = mkCard(t('photoStudio'));
  const pInput = document.createElement('input'); pInput.type = 'file'; pInput.accept = 'image/*'; pInput.style.display = 'none';
  pCard.appendChild(pInput);
  pCard.appendChild(mkBtn('📷', t('importPhoto'), false, () => pInput.click()));

  const pOpts = document.createElement('div'); pOpts.className = 'media-opts';
  pOpts.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px;';
  
  const pConfigs = [
    { id: 'm-round', lbl: t('rounded'), style: 'border-radius:20px;' },
    { id: 'm-shadow', lbl: t('shadow'), style: 'box-shadow:0 15px 35px rgba(0,0,0,0.3);' },
    { id: 'm-gray', lbl: t('grayscale'), style: 'filter:grayscale(1);' },
    { id: 'm-sepia', lbl: t('sepia'), style: 'filter:sepia(1);' }
  ];

  pConfigs.forEach(c => {
    const l = document.createElement('label'); l.style.cssText = 'display:flex;align-items:center;gap:6px;font-size:11px;color:#94a3b8;cursor:pointer';
    l.innerHTML = `<input type="checkbox" id="${c.id}"> ${c.lbl}`;
    pOpts.appendChild(l);
  });
  pCard.appendChild(pOpts);

  pCard.appendChild(mkBtn('⚡', t('insertMedia'), false, function() {
    const file = pInput.files[0];
    if(!file) { alert(t('selectFirst')); return; }
    const btn = this; const origHtml = btn.innerHTML;
    btn.innerHTML = `<span class="lip-icon">⏳</span><span class="lip-label">${t('processing')}</span>`;
    btn.disabled = true;
    const reader = new FileReader();
    reader.onload = (e) => {
      let styles = 'width:100%;max-width:100%;transition:all 0.3s;';
      pConfigs.forEach(c => { if(document.getElementById(c.id).checked) styles += c.style; });
      insertAtCursor(`\n<img src="${e.target.result}" style="${styles}" alt="Imported Photo">\n`);
      btn.innerHTML = `<span class="lip-icon">✓</span><span class="lip-label">${t('copied')}</span>`;
      setTimeout(() => { btn.innerHTML = origHtml; btn.disabled = false; }, 2000);
    };
    reader.readAsDataURL(file);
  }));
  body.appendChild(pCard);

  // --- 4. VIDEO STUDIO ---
  const vCard = mkCard(t('videoStudio'));
  const vInput = document.createElement('input'); vInput.type = 'file'; vInput.accept = 'video/*'; vInput.style.display = 'none';
  vCard.appendChild(vInput);

  const ytInp = document.createElement('input'); ytInp.type = 'text'; ytInp.placeholder = t('youtubeLink') + '...';
  ytInp.className = 'cust-select'; ytInp.style.marginBottom = '10px';
  vCard.appendChild(ytInp);

  vCard.appendChild(mkBtn('🎬', t('importVideo'), false, () => vInput.click()));

  const vOpts = document.createElement('div'); vOpts.className = 'media-opts';
  vOpts.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px;';
  
  const vConfigs = [
    { id: 'v-auto', lbl: t('autoplay'), attr: 'autoplay' },
    { id: 'v-loop', lbl: t('loop'), attr: 'loop' },
    { id: 'v-mute', lbl: t('muted'), attr: 'muted' }
  ];

  vConfigs.forEach(c => {
    const l = document.createElement('label'); l.style.cssText = 'display:flex;align-items:center;gap:6px;font-size:11px;color:#94a3b8;cursor:pointer';
    l.innerHTML = `<input type="checkbox" id="${c.id}"> ${c.lbl}`;
    vOpts.appendChild(l);
  });
  vCard.appendChild(vOpts);

  vCard.appendChild(mkBtn('⚡', t('insertMedia'), false, function() {
    const ytUrl = ytInp.value.trim();
    if(ytUrl) {
      const vidId = ytUrl.split('v=')[1]?.split('&')[0] || ytUrl.split('be/')[1] || ytUrl.split('/').pop();
      insertAtCursor(`\n<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:15px;box-shadow:0 10px 30px rgba(0,0,0,0.3)">\n  <iframe src="https://www.youtube.com/embed/${vidId}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0" allowfullscreen></iframe>\n</div>\n`);
      return;
    }
    const file = vInput.files[0];
    if(!file) { alert(t('selectFirst')); return; }
    const btn = this; const origHtml = btn.innerHTML;
    btn.innerHTML = `<span class="lip-icon">⏳</span><span class="lip-label">${t('processing')}</span>`;
    btn.disabled = true;
    const reader = new FileReader();
    reader.onload = (e) => {
      let attrs = 'controls style="width:100%;border-radius:15px;box-shadow:0 10px 30px rgba(0,0,0,0.3);"';
      vConfigs.forEach(c => { if(document.getElementById(c.id).checked) attrs += ' ' + c.attr; });
      insertAtCursor(`\n<video src="${e.target.result}" ${attrs}></video>\n`);
      btn.innerHTML = `<span class="lip-icon">✓</span><span class="lip-label">${t('copied')}</span>`;
      setTimeout(() => { btn.innerHTML = origHtml; btn.disabled = false; }, 2000);
    };
    reader.readAsDataURL(file);
  }));
  body.appendChild(vCard);
}

/* ── Data Vault Tab ──────────────────────────────── */
const MOCK_TEMPLATES = {
  products: {
    label: 'Products', labelFr: 'Produits', icon: '🛍️',
    generate: (n) => Array.from({ length: n }, (_, i) => ({
      id: i + 1,
      name: ['Smart Watch Pro', 'Wireless Earbuds', 'Laptop Stand', 'Mechanical Keyboard', 'USB-C Hub', 'Webcam 4K', 'Desk Lamp LED', 'Mouse Pad XL'][i % 8],
      price: (29 + i * 17).toFixed(2),
      category: ['Electronics', 'Audio', 'Accessories', 'Peripherals'][i % 4],
      image: `https://images.unsplash.com/photo-${['1523275335684-37898b6baf30','1572635196237-14b3f281503f','1593642632559-0c6d3fc62b89'][i % 5]}?w=400&q=80`,
    })),
    codeTemplate: (data) => `window.products = ${JSON.stringify(data, null, 2)};`
  },
  users: {
    label: 'Users', labelFr: 'Utilisateurs', icon: '👥',
    generate: (n) => Array.from({ length: n }, (_, i) => ({
      id: i + 1,
      name: ['Alice Martin', 'Bob Chen', 'Claire Dubois', 'David Kim', 'Emma Wilson', 'Grace Lee'][i % 6],
      email: ['alice', 'bob', 'claire', 'david', 'emma', 'grace'][i % 6] + '@example.com',
      role: ['Admin', 'Editor', 'Viewer'][i % 3],
      avatar: `https://images.unsplash.com/photo-${['1494790108377-be9c29b29330','1506794778202-cad84cf45f1d','1544005313-94ddf0286df2'][i % 3]}?w=100&q=80`,
    })),
    codeTemplate: (data) => `window.users = ${JSON.stringify(data, null, 2)};`
  },
  articles: {
    label: 'Articles', labelFr: 'Articles', icon: '📝',
    generate: (n) => Array.from({ length: n }, (_, i) => ({
      id: i + 1,
      title: ['Future of AI', 'Building Scale', 'Design Systems 2026', 'React Tips', 'CSS Grid mastery', 'Web3 News'][i % 6],
      author: ['Alice Martin', 'Bob Chen'][i % 2],
      date: `April ${i + 1}, 2026`,
      category: ['Tech', 'Design', 'Dev'][i % 3],
    })),
    codeTemplate: (data) => `window.articles = ${JSON.stringify(data, null, 2)};`
  },
  orders: {
    label: 'Orders', labelFr: 'Commandes', icon: '📦',
    generate: (n) => Array.from({ length: n }, (_, i) => ({
      id: `ORD-${1000 + i}`,
      customer: ['Alice M.', 'Bob C.', 'Claire D.'][i % 3],
      amount: `$${(49.99 + i * 23.5).toFixed(2)}`,
      status: ['Delivered', 'Processing', 'Cancelled'][i % 3],
      date: `2026-04-${String(i + 1).padStart(2, '0')}`,
    })),
    codeTemplate: (data) => `window.orders = ${JSON.stringify(data, null, 2)};`
  },
  employees: {
    label: 'Employees', labelFr: 'Employés', icon: '🧑‍💼',
    generate: (n) => Array.from({ length: n }, (_, i) => ({
      id: i + 1,
      name: ['James Smith', 'Maria Garcia', 'Liam Johnson'][i % 3],
      dept: ['Eng.', 'Mark.', 'Design'][i % 3],
      salary: `$${(65000 + i * 8500).toLocaleString()}`,
    })),
    codeTemplate: (data) => `window.employees = ${JSON.stringify(data, null, 2)};`
  },
  movies: {
    label: 'Movies', labelFr: 'Films', icon: '🎬',
    generate: (n) => Array.from({ length: n }, (_, i) => ({
      id: i + 1,
      title: ['Interstellar', 'The Matrix', 'Inception', 'Dune Part II'][i % 4],
      director: ['Christopher Nolan', 'Denis Villeneuve'][i % 2],
      year: 2015 + i,
      language: ['English', 'French'][i % 2],
    })),
    codeTemplate: (data) => `window.movies = ${JSON.stringify(data, null, 2)};`
  },
  recipes: {
    label: 'Recipes', labelFr: 'Recettes', icon: '🍽️',
    generate: (n) => Array.from({ length: n }, (_, i) => ({
      id: i + 1,
      name: ['Pasta', 'Chicken Curry', 'Sushi', 'Beef Stew'][i % 4],
      cuisine: ['Italian', 'Indian', 'Japanese', 'French'][i % 4],
      prepTime: `${10 + i * 5} min`,
      servings: 2 + (i % 4),
    })),
    codeTemplate: (data) => `window.recipes = ${JSON.stringify(data, null, 2)};`
  },
  crypto: {
    label: 'Crypto', labelFr: 'Crypto', icon: '₿',
    generate: (n) => Array.from({ length: n }, (_, i) => ({
      rank: i + 1,
      name: ['Bitcoin', 'Ethereum', 'Solana', 'Cardano', 'BNB', 'XRP'][i % 6],
      symbol: ['BTC', 'ETH', 'SOL', 'ADA', 'BNB', 'XRP'][i % 6],
      price: `$${(67000 / (1 + i * 1.8)).toFixed(2)}`,
      change: `${i % 2 === 0 ? '+' : '-'}${(1.2 + i * 0.7).toFixed(2)}%`,
    })),
    codeTemplate: (data) => `window.crypto = ${JSON.stringify(data, null, 2)};`
  },
  weather: {
    label: 'Weather', labelFr: 'Météo', icon: '🌤️',
    generate: (n) => Array.from({ length: n }, (_, i) => ({
      city: ['Paris', 'New York', 'Tokyo', 'London', 'Dubai'][i % 5],
      temp: 10 + (i * 4) % 30,
      condition: ['Sunny', 'Cloudy', 'Rainy'][i % 3],
      humidity: `${40 + (i * 7) % 50}%`,
    })),
    codeTemplate: (data) => `window.weather = ${JSON.stringify(data, null, 2)};`
  },
  tasks: {
    label: 'Tasks / Kanban', labelFr: 'Tâches / Kanban', icon: '✅',
    generate: (n) => Array.from({ length: n }, (_, i) => ({
      id: i + 1,
      title: ['Design page', 'Fix bug', 'Update docs'][i % 3],
      status: ['Todo', 'In Progress', 'Done'][i % 3],
      priority: ['Low', 'Med', 'High'][i % 3],
      assignee: ['Alice', 'Bob'][i % 2],
    })),
    codeTemplate: (data) => `window.tasks = ${JSON.stringify(data, null, 2)};`
  },
  courses: {
    label: 'Courses', labelFr: 'Cours', icon: '🎓',
    generate: (n) => Array.from({ length: n }, (_, i) => ({
      id: i + 1,
      title: ['React Mastery', 'Node FullStack', 'AWS Arch'][i % 3],
      price: `$${[29, 49, 79, 99][i % 4]}`,
      students: `${(1.2 + i * 0.8).toFixed(1)}k`,
    })),
    codeTemplate: (data) => `window.courses = ${JSON.stringify(data, null, 2)};`
  },
  restaurants: {
    label: 'Restaurants', labelFr: 'Restaurants', icon: '🍕',
    generate: (n) => Array.from({ length: n }, (_, i) => ({
      id: i + 1,
      name: ['The Golden Fork', 'Sakura Garden', 'Urban Grill'][i % 3],
      cuisine: ['American', 'Japanese', 'Fusion'][i % 3],
      rating: (3.8 + (i % 5) * 0.3).toFixed(1),
      isOpen: i % 4 !== 3,
    })),
    codeTemplate: (data) => `window.restaurants = ${JSON.stringify(data, null, 2)};`
  },
  events: {
    label: 'Events', labelFr: 'Événements', icon: '📅',
    generate: (n) => Array.from({ length: n }, (_, i) => ({
      id: i + 1,
      title: ['React World', 'Design Conf 2026', 'AI Summit'][i % 3],
      date: `2026-0${4 + (i % 6)}-${String(i + 1).padStart(2, '0')}`,
      seats: 50 + i * 25,
      type: ['Conf', 'Webinar', 'Meetup'][i % 3],
    })),
    codeTemplate: (data) => `window.events = ${JSON.stringify(data, null, 2)};`
  },
  countries: {
    label: 'Countries', labelFr: 'Pays', icon: '🌍',
    generate: (n) => Array.from({ length: n }, (_, i) => ({
      id: i + 1,
      name: ['France', 'USA', 'Japan', 'Germany', 'Brazil'][i % 5],
      capital: ['Paris', 'DC', 'Tokyo', 'Berlin', 'Brasília'][i % 5],
      population: `${(67 + i * 130).toFixed(0)}M`,
      currency: ['EUR', 'USD', 'JPY'][i % 3],
    })),
    codeTemplate: (data) => `window.countries = ${JSON.stringify(data, null, 2)};`
  },
  realestate: {
    label: 'Real Estate', labelFr: 'Immobilier', icon: '🏠',
    generate: (n) => Array.from({ length: n }, (_, i) => ({
      id: i + 1,
      title: ['Modern Penthouse', 'Cozy Studio', 'Family Villa'][i % 3],
      price: `$${(250 + i * 175).toFixed(0)}k`,
      beds: 1 + (i % 5),
      area: `${60 + i * 35}m²`,
      status: ['For Sale', 'For Rent'][i % 2],
    })),
    codeTemplate: (data) => `window.properties = ${JSON.stringify(data, null, 2)};`
  }
};

function renderDataVault(body) {
  const h = document.createElement('div'); h.className = 'section-hdr'; h.textContent = t('tabData');
  body.appendChild(h);

  const card = mkCard(t('dataVault'));
  let selectedType = 'products';
  let currentGeneratedCode = '';

  const lblType = document.createElement('label'); lblType.style.cssText = 'font-size:10px;color:#94a3b8;margin-bottom:12px;display:block;text-transform:uppercase;letter-spacing:0.05em';
  lblType.textContent = t('dataType');
  card.appendChild(lblType);

  // 2-Column Grid with safe right padding for Windows
  const grid = document.createElement('div'); 
  grid.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;max-height:220px;overflow-y:auto;overflow-x:hidden;padding-right:25px;scrollbar-width:thin;';

  Object.entries(MOCK_TEMPLATES).forEach(([key, tpl]) => {
    const b = document.createElement('button');
    b.className = 'cust-select';
    b.style.cssText = 'margin:0;padding:12px 6px;font-size:11px;display:flex;flex-direction:column;align-items:center;gap:6px;justify-content:center;height:auto;min-height:70px;text-align:center;line-height:1.1;border:1px solid rgba(255,255,255,0.06);border-radius:12px;background:rgba(255,255,255,0.02);transition:all 0.25s;';
    
    const labelText = lang === 'fr' ? tpl.labelFr : tpl.label;
    b.innerHTML = `<span style="font-size:20px;display:block;margin-bottom:2px">${tpl.icon}</span> <span style="display:block;width:100%;font-weight:700">${labelText}</span>`;
    
    const updateBtn = (k) => {
      grid.querySelectorAll('button').forEach(btn => {
        btn.style.borderColor = 'rgba(255,255,255,0.06)';
        btn.style.background = 'rgba(255,255,255,0.02)';
        btn.style.color = '#94a3b8';
      });
      b.style.borderColor = 'var(--accent)';
      b.style.background = 'rgba(59, 130, 246, 0.12)';
      b.style.color = '#fff';
      selectedType = k;
    };

    b.onclick = () => updateBtn(key);
    if(key === selectedType) updateBtn(key);
    grid.appendChild(b);
  });
  card.appendChild(grid);

  // Entries Slider
  const lblCount = document.createElement('label'); lblCount.style.cssText = 'font-size:11px;color:#94a3b8;margin-bottom:8px;display:flex;justify-content:space-between';
  lblCount.innerHTML = `<span>${t('entries')}</span> <b id="data-count-val" style="color:var(--accent)">5</b>`;
  card.appendChild(lblCount);

  const slide = document.createElement('input'); slide.type = 'range'; slide.min = '2'; slide.max = '15'; slide.value = '5';
  slide.style.cssText = 'width:100%;margin-bottom:20px;accent-color:var(--accent);cursor:pointer';
  slide.oninput = () => document.getElementById('data-count-val').textContent = slide.value;
  card.appendChild(slide);

  // STEP 1: Generate (BLUE 🔵)
  const btnGen = mkBtn('✨', lang==='fr'?'Générer Aperçu':'Generate Preview', false, function() {
    const tpl = MOCK_TEMPLATES[selectedType];
    const data = tpl.generate(parseInt(slide.value));
    currentGeneratedCode = `\n// --- Mock Data: ${tpl.label} ---\n${tpl.codeTemplate(data)}\n`;
    
    const pre = document.getElementById('mock-preview-box');
    pre.textContent = currentGeneratedCode.substring(0, 300) + (currentGeneratedCode.length > 300 ? '...' : '');
    pre.style.display = 'block';
    
    const injectBtn = document.getElementById('btn-inject-mock');
    injectBtn.disabled = false;
    injectBtn.style.opacity = '1';
    injectBtn.style.pointerEvents = 'all';
  });
  btnGen.classList.add('blue-btn');
  btnGen.style.marginBottom = '12px';
  card.appendChild(btnGen);

  // Preview Block
  const preview = document.createElement('pre');
  preview.id = 'mock-preview-box';
  preview.style.cssText = 'background:#080c14;padding:12px;border-radius:10px;font-size:10px;color:#7dd3fc;margin-bottom:15px;display:none;max-height:100px;overflow:auto;border:1px solid rgba(59,130,246,0.15);white-space:pre-wrap;font-family:var(--mono);';
  card.appendChild(preview);

  // STEP 2: Inject (GREEN 🟢)
  const btnInject = mkBtn('🧪', t('inject'), false, function() {
    if(!currentGeneratedCode || !editor) return;
    try {
      editor.focus();
      const model = editor.getModel();
      const pos = editor.getPosition() || { lineNumber: model.getLineCount() + 1, column: 1 };
      
      const tpl = MOCK_TEMPLATES[selectedType];
      const varName = selectedType;
      
      // Inject FULL VISIBLE COMPONENT
      const fullComponent = `
<!-- --- COMPONENT: ${tpl.label} (IA Architecte) --- -->
<div id="grid-${varName}" class="grid">
  <!-- Data Grid will be rendered here -->
</div>

<script>
  (function() {
    // 1. Data Source
    ${currentGeneratedCode.trim()}

    // 2. Rendering Function (Visible & Editable)
    function renderDisplay() {
      const container = document.getElementById('grid-${varName}');
      if(!container) return;
      
      const data = window.${varName};
      if(!data || !Array.isArray(data)) return;

      container.innerHTML = data.map(item => \`
        <div class="grid-post" style="background:#fff; border-radius:15px; overflow:hidden; border:1px solid rgba(0,0,0,0.05); margin-bottom:15px; box-shadow:0 10px 20px rgba(0,0,0,0.03); transition:transform 0.3s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
          <div style="background:#f8fafc; height:200px; display:flex; align-items:center; justify-content:center; font-size:60px">\${item.icon || '📦'}</div>
          <div style="padding:20px;">
            <div style="color:var(--accent, #3b82f6); font-weight:800; font-size:12px; text-transform:uppercase; margin-bottom:10px">\${item.category || item.status || 'INFO'}</div>
            <h3 style="font-size:18px; font-weight:900; margin:0 0 10px 0; color:#1e293b">\${item.title || item.name || 'Title Item'}</h3>
            <div style="font-size:13px; color:#64748b;">
              \${item.author ? 'By ' + item.author + ' • ' : ''} \${item.date || ''} 
              \${item.price ? '<b style="color:#10b981">' + item.price + '</b>' : ''}
              \${item.students ? ' • ' + item.students + ' Students' : ''}
            </div>
          </div>
        </div>
      \`).join('');
    }

    // 3. Auto-load
    window.addEventListener('load', renderDisplay);
    renderDisplay(); // Run immediately for editor preview
  })();
<\/script>
<!-- --- END COMPONENT --- -->
`;

      model.pushEditOperations(
        [],
        [{ range: new monaco.Range(pos.lineNumber, pos.column, pos.lineNumber, pos.column), text: fullComponent, forceMoveMarkers: true }],
        () => null
      );
      
      editor.pushUndoStop();
      editor.revealLineInCenter(pos.lineNumber);
      
      const lbl = this.querySelector('.lip-label');
      const origText = lbl.textContent;
      lbl.textContent = t('copied');
      this.style.background = 'rgba(16, 185, 129, 0.2)';
      setTimeout(() => { lbl.textContent = origText; this.style.background = 'rgba(16, 185, 129, 0.05)'; }, 2000);
    } catch(e) { console.error('Inject Error:', e); }
  });
  btnInject.id = 'btn-inject-mock';
  btnInject.classList.add('green-btn');
  btnInject.disabled = true;
  btnInject.style.opacity = '0.4';
  btnInject.style.pointerEvents = 'none';
  card.appendChild(btnInject);

  body.appendChild(card);
}

/* ── Genius Pro Support Functions ────────────────── */
function applyVisualStyle(varName, value) {
  if(!editor) return;
  let code = editor.getValue();
  let styleBlock = `<style id="genius-styles">\n  :root {\n    --genius-primary: #3b82f6;\n    --genius-radius: 12px;\n    --genius-blur: 10px;\n  }\n</style>`;
  
  if(!code.includes('id="genius-styles"')) {
    if(code.includes('</head>')) code = code.replace('</head>', styleBlock + '\n</head>');
    else code = styleBlock + '\n' + code;
  }
  
  // Regex to update the variable
  const reg = new RegExp(`${varName}:\\s*[^;]+;`, 'g');
  code = code.replace(reg, `${varName}: ${value};`);
  
  editor.setValue(code);
  runPreview();
}

function resetVisualStyles() {
  if(!editor) return;
  let code = editor.getValue();
  code = code.replace(/<style id="genius-styles">[\s\S]*?<\/style>/g, '');
  editor.setValue(code);
  runPreview();
  showToast(lang==='fr'?'Styles réinitialisés.':'Styles reset.');
}

