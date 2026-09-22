/**
 * IA ULTRA v5.0 — Phase 5 Addons
 * ──────────────────────────────────────────────────────
 *  🏛️  App Vault       — 10 Premium Pre-Built Apps
 *  🛠️  Power Tools     — 8 Pro Enhancement Tools
 *     PWA Booster | Auth Shield | Component Library
 *     Code Explainer | Multi-Page Builder | A/B Tester
 *     i18n Injector | Performance Optimizer
 * ──────────────────────────────────────────────────────
 * EN / FR — Non-destructive — No modifications to existing code
 */
(function (window) {

/* ══════════════════════════════════ TRANSLATIONS ══ */
var V5L = {
  en: {
    vault:'🏛️ App Vault', vaultSub:'10 Premium Pre-Built Apps — 1-Click Inject',
    tools:'🛠️ Power Tools', close:'✕ Close', inject:'⚡ Inject into Editor',
    prev:'👁 Preview', badge:'ULTRA VAULT', badgeTools:'POWER TOOLS',
    pwa:'📱 PWA Booster', auth:'🔐 Auth Shield', comp:'🧩 Components',
    explain:'💬 Explainer', multi:'🌐 Multi-Page', ab:'🧪 A/B Test',
    i18n:'🌍 i18n', perf:'⚡ Optimizer',
    pwaDesc:'Add Service Worker + Manifest to any app',
    authDesc:'Inject login/register system with sessions',
    compDesc:'Visual UI component library to insert',
    explainDesc:'Add inline comments to explain the code',
    multiDesc:'Generate a 4-page connected website',
    abDesc:'Generate 2 design variants side by side',
    i18nDesc:'Add EN/FR language switcher to any app',
    perfDesc:'Optimize loading, debounce, lazy images',
    pwaOk:'✅ PWA: Service Worker + Manifest injected!',
    authOk:'✅ Auth Shield: Login system injected!',
    explainOk:'✅ Code commented and explained!',
    abOk:'✅ A/B Variant generated!',
    i18nOk:'✅ i18n switcher injected!',
    perfOk:'✅ Performance optimizations applied!',
    noCode:'⚠️ No code in editor. Generate an app first!',
    search:'Search apps…',
    tags:{dash:'Dashboard',player:'Player',security:'Security',
          listing:'Listing',landing:'Landing',gallery:'Gallery',
          med:'Medical',edu:'Education',hotel:'Booking',
          music:'Music',news:'News',nft:'NFT',analytics:'Analytics'},
  },
  fr: {
    vault:'🏛️ App Vault', vaultSub:'10 Applications Premium — Injection 1 Clic',
    tools:'🛠️ Outils Pro', close:'✕ Fermer', inject:'⚡ Injecter dans l\'Éditeur',
    prev:'👁 Aperçu', badge:'ULTRA VAULT', badgeTools:'OUTILS PRO',
    pwa:'📱 PWA Booster', auth:'🔐 Auth Shield', comp:'🧩 Composants',
    explain:'💬 Explicateur', multi:'🌐 Multi-Pages', ab:'🧪 Test A/B',
    i18n:'🌍 i18n', perf:'⚡ Optimiseur',
    pwaDesc:'Ajouter Service Worker + Manifest à n\'importe quelle app',
    authDesc:'Injecter login/register avec sessions localStorage',
    compDesc:'Bibliothèque de composants UI visuels à insérer',
    explainDesc:'Ajouter des commentaires inline pour expliquer le code',
    multiDesc:'Générer un site 4 pages connectées',
    abDesc:'Générer 2 variantes de design côte à côte',
    i18nDesc:'Ajouter un sélecteur EN/FR à n\'importe quelle app',
    perfDesc:'Optimiser chargement, debounce, images lazy',
    pwaOk:'✅ PWA : Service Worker + Manifest injectés !',
    authOk:'✅ Auth Shield : Système login injecté !',
    explainOk:'✅ Code commenté et expliqué !',
    abOk:'✅ Variante A/B générée !',
    i18nOk:'✅ Sélecteur i18n injecté !',
    perfOk:'✅ Optimisations de performance appliquées !',
    noCode:'⚠️ Aucun code dans l\'éditeur. Générez d\'abord une app !',
    search:'Rechercher des apps…',
    tags:{dash:'Dashboard',player:'Lecteur',security:'Sécurité',
          listing:'Annonces',landing:'Landing',gallery:'Galerie',
          med:'Médical',edu:'Éducation',hotel:'Réservation',
          music:'Musique',news:'News',nft:'NFT',analytics:'Analytics'},
  }
};

/* ══════════════════════════════════ HELPERS ══ */

/**
 * injectCode — Sets editor value then auto-formats the HTML
 */
function injectCode(html) {
  if (!html) { showToastV5('⚠️ Nothing to inject'); return; }
  if (!window.editor) { showToastV5('⚠️ Editor not ready'); return; }
  window.editor.setValue(html);
  window.editor.pushUndoStop();
  // Auto-format with Monaco built-in HTML formatter
  setTimeout(function() {
    try {
      var action = window.editor.getAction('editor.action.formatDocument');
      if (action) {
        action.run().then(function() {
          if (typeof window.runPreview === 'function') window.runPreview();
        });
      } else {
        if (typeof window.runPreview === 'function') window.runPreview();
      }
    } catch (e) {
      if (typeof window.runPreview === 'function') window.runPreview();
    }
  }, 200);
}

/**
 * getCode — Gets current editor content
 */
function getCode() {
  return window.editor ? window.editor.getValue() : '';
}

/**
 * insertBeforeClose — Robustly inserts HTML before </head> or </body>
 * Handles: lowercase, uppercase, body with attributes, missing tags
 */
function insertBeforeClose(code, tag, insertion) {
  // Case-insensitive regex: matches </head>, </BODY>, etc.
  var rx = new RegExp('</' + tag + '\\s*>', 'i');
  if (rx.test(code)) {
    return code.replace(rx, function(m) { return '\n' + insertion + '\n' + m; });
  }
  // Tag not found — append at end
  return code + '\n' + insertion;
}

/**
 * insertAfterOpen — Robustly inserts HTML right after <body> (any attributes)
 */
function insertAfterOpen(code, insertion) {
  var rx = /<body[^>]*>/i;
  if (rx.test(code)) {
    return code.replace(rx, function(m) { return m + '\n' + insertion; });
  }
  // Not found — prepend to code
  return insertion + '\n' + code;
}

function showToastV5(msg) {
  if (window.showToast) { window.showToast(msg); return; }
  var el = document.createElement('div');
  el.style = 'position:fixed;top:20px;right:20px;background:#0d1117;border:1px solid rgba(139,92,246,.4);color:#fff;padding:13px 18px;border-radius:12px;font-weight:700;font-size:12px;z-index:99999;box-shadow:0 8px 25px rgba(0,0,0,.6);transition:.3s;font-family:Inter,sans-serif;';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(function() { el.style.opacity = '0'; setTimeout(function() { el.remove(); }, 300); }, 3000);
}

/* ══════════════════════════════════ APP BUILDERS ══ */
function buildMedical(isFr) {
  var t = function(e,f) { return isFr ? f : e; };
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>' + t('Medical Dashboard','Dashboard Médical') + '</title>' +
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">' +
    '<style>*{margin:0;padding:0;box-sizing:border-box;font-family:\'Inter\',sans-serif}body{display:flex;height:100vh;background:#060d18;color:#e2e8f0;overflow:hidden}' +
    '.sidebar{width:200px;background:#040a12;border-right:1px solid rgba(16,185,129,.12);display:flex;flex-direction:column;padding:18px 10px;gap:2px;flex-shrink:0}' +
    '.logo{color:#10b981;font-weight:900;font-size:14px;padding:8px 12px 18px;letter-spacing:1px}' +
    '.nav{padding:9px 12px;border-radius:7px;cursor:pointer;font-size:11.5px;color:#475569;display:flex;align-items:center;gap:9px;transition:.15s}' +
    '.nav:hover,.nav.on{background:rgba(16,185,129,.1);color:#10b981}' +
    '.main{flex:1;display:flex;flex-direction:column;overflow:hidden}' +
    '.kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}' +
    '.kpi{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:14px}' +
    '.kl{font-size:9px;font-weight:700;color:#475569;letter-spacing:1px;text-transform:uppercase}' +
    '.kv{font-size:22px;font-weight:900;color:#fff;margin:4px 0}.kd{font-size:10px}.up{color:#10b981}.dn{color:#ef4444}' +
    '.body{flex:1;padding:18px 20px;overflow-y:auto;display:flex;flex-direction:column;gap:14px}' +
    '.top{padding:14px 20px;border-bottom:1px solid rgba(255,255,255,.05);display:flex;justify-content:space-between;align-items:center;flex-shrink:0}' +
    '.card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:15px}' +
    '.row2{display:grid;grid-template-columns:2fr 1fr;gap:10px}' +
    '.ct{font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px}' +
    'table{width:100%;border-collapse:collapse}th{font-size:9px;font-weight:700;color:#475569;text-align:left;padding:7px 10px;border-bottom:1px solid rgba(255,255,255,.05);letter-spacing:1px}' +
    'td{font-size:11px;padding:8px 10px;border-bottom:1px solid rgba(255,255,255,.03);color:#e2e8f0}' +
    '</style></head><body>' +
    '<div class="sidebar"><div class="logo">⚕️ MediCore</div>' +
    '<div class="nav on">🏠 ' + t('Dashboard','Tableau de bord') + '</div>' +
    '<div class="nav">👤 ' + t('Patients','Patients') + '</div>' +
    '<div class="nav">📅 ' + t('Appointments','Rendez-vous') + '</div>' +
    '<div class="nav">💊 ' + t('Prescriptions','Ordonnances') + '</div>' +
    '</div>' +
    '<div class="main">' +
    '<div class="top"><div style="font-size:14px;font-weight:700;color:#fff">👋 ' + t('Good morning, Dr. Chen','Bonjour, Dr. Chen') + '</div></div>' +
    '<div class="body">' +
    '<div class="kpis">' +
    '<div class="kpi"><div class="kl">' + t('Patients','Patients') + '</div><div class="kv" id="k1">0</div><div class="kd up">↑ 12%</div></div>' +
    '<div class="kpi"><div class="kl">' + t('Today','Aujourd\'hui') + '</div><div class="kv" id="k2">0</div><div class="kd up">↑ 2</div></div>' +
    '<div class="kpi"><div class="kl">' + t('Recovery','Guérison') + '</div><div class="kv" id="k3">0%</div><div class="kd up">↑ 3%</div></div>' +
    '<div class="kpi"><div class="kl">' + t('Critical','Critiques') + '</div><div class="kv" id="k4">0</div><div class="kd dn">↑ 1</div></div>' +
    '</div>' +
    '<div class="card"><div class="ct">' + t('Patient Records','Dossiers Patients') + '</div>' +
    '<table><tr><th>ID</th><th>Patient</th><th>Age</th><th>' + t('Status','Statut') + '</th></tr>' +
    '<tr><td style="color:#475569">#P001</td><td><b>Marie Dubois</b></td><td>45</td><td><span style="background:rgba(16,185,129,.15);color:#10b981;padding:2px 8px;border-radius:50px;font-size:9px;font-weight:900">Stable</span></td></tr>' +
    '<tr><td style="color:#475569">#P002</td><td><b>Jean Martin</b></td><td>62</td><td><span style="background:rgba(59,130,246,.15);color:#3b82f6;padding:2px 8px;border-radius:50px;font-size:9px;font-weight:900">Recovering</span></td></tr>' +
    '<tr><td style="color:#475569">#P003</td><td><b>Sophie Chen</b></td><td>28</td><td><span style="background:rgba(245,158,11,.15);color:#f59e0b;padding:2px 8px;border-radius:50px;font-size:9px;font-weight:900">Monitoring</span></td></tr>' +
    '<tr><td style="color:#475569">#P004</td><td><b>Paul Leclerc</b></td><td>78</td><td><span style="background:rgba(239,68,68,.15);color:#ef4444;padding:2px 8px;border-radius:50px;font-size:9px;font-weight:900">Critical</span></td></tr>' +
    '</table></div>' +
    '</div></div>' +
    '<script>function cu(el,v,sfx){var n=0;var s=function(){n=Math.min(n+Math.max(1,Math.floor(v/25)),v);el.textContent=v>=1000?n.toLocaleString():n+sfx;if(n<v)requestAnimationFrame(s);};s();}' +
    'setTimeout(function(){cu(document.getElementById("k1"),1284,"");cu(document.getElementById("k2"),8,"");cu(document.getElementById("k3"),94,"%");cu(document.getElementById("k4"),3,"");},300);<\/script>' +
    '</body></html>';
}

function buildElearn(isFr) {
  var tl = function(e,f) { return isFr ? f : e; };
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>' + tl('E-Learning Platform','Plateforme E-Learning') + '</title>' +
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">' +
    '<style>*{margin:0;padding:0;box-sizing:border-box;font-family:\'Inter\',sans-serif}body{background:#0d0620;color:#e2e8f0;min-height:100vh}' +
    'nav{background:rgba(0,0,0,.5);backdrop-filter:blur(12px);border-bottom:1px solid rgba(139,92,246,.2);padding:12px 30px;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:10}' +
    '.logo{color:#a78bfa;font-weight:900;font-size:15px}.hero{padding:40px 30px 30px;text-align:center}' +
    '.ht{font-size:30px;font-weight:900;color:#fff;margin-bottom:10px}.hs{font-size:13px;color:#64748b;margin-bottom:25px}' +
    '.courses{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;padding:0 30px 30px}' +
    '.course{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;overflow:hidden;transition:.2s;cursor:pointer}' +
    '.course:hover{transform:translateY(-4px);border-color:rgba(139,92,246,.4)}' +
    '.thumb{height:110px;display:flex;align-items:center;justify-content:center;font-size:40px}' +
    '.ci{padding:14px}.ct{font-size:13px;font-weight:700;color:#e2e8f0;margin-bottom:5px}' +
    '.cs{font-size:11px;color:#64748b;margin-bottom:12px}' +
    '.prog-bar{background:rgba(255,255,255,.08);border-radius:50px;height:5px;margin-bottom:8px;overflow:hidden}' +
    '.prog-fill{height:100%;border-radius:50px;background:linear-gradient(90deg,#8b5cf6,#3b82f6)}' +
    '</style></head><body>' +
    '<nav><div class="logo">🎓 LearnUltra</div><div style="width:32px;height:32px;background:linear-gradient(135deg,#8b5cf6,#3b82f6);border-radius:50%"></div></nav>' +
    '<div class="hero"><div class="ht">' + tl('Learn Without Limits','Apprenez Sans Limites') + '</div>' +
    '<div class="hs">500+ ' + tl('courses · Expert instructors','cours · Formateurs experts') + '</div></div>' +
    '<div class="courses">' +
    '<div class="course"><div class="thumb" style="background:#1e1b4b">⚛️</div><div class="ci"><div class="ct">React 18 Mastery</div><div class="cs">' + tl('Advanced components','Composants avancés') + '</div><div class="prog-bar"><div class="prog-fill" style="width:72%"></div></div><div style="font-size:10px;color:#64748b">72% ' + tl('complete','complété') + '</div></div></div>' +
    '<div class="course"><div class="thumb" style="background:#0a1628">🤖</div><div class="ci"><div class="ct">AI with Python</div><div class="cs">' + tl('Machine Learning basics','Fondamentaux ML') + '</div><div class="prog-bar"><div class="prog-fill" style="width:45%"></div></div><div style="font-size:10px;color:#64748b">45% ' + tl('complete','complété') + '</div></div></div>' +
    '<div class="course"><div class="thumb" style="background:#1a0a2e">🎨</div><div class="ci"><div class="ct">UI/UX Design Pro</div><div class="cs">' + tl('Figma & prototyping','Figma et prototypage') + '</div><div class="prog-bar"><div class="prog-fill" style="width:88%"></div></div><div style="font-size:10px;color:#64748b">88% ' + tl('complete','complété') + '</div></div></div>' +
    '<div class="course"><div class="thumb" style="background:#030a1a">📊</div><div class="ci"><div class="ct">Data Science 360</div><div class="cs">' + tl('Analytics & visualization','Analytics et visualisation') + '</div><div class="prog-bar"><div class="prog-fill" style="width:30%"></div></div><div style="font-size:10px;color:#64748b">30% ' + tl('complete','complété') + '</div></div></div>' +
    '<div class="course"><div class="thumb" style="background:#0a0f1a">⚡</div><div class="ci"><div class="ct">Next.js Full Stack</div><div class="cs">' + tl('SSR, API routes','SSR, routes API') + '</div><div class="prog-bar"><div class="prog-fill" style="width:20%"></div></div><div style="font-size:10px;color:#64748b">20% ' + tl('complete','complété') + '</div></div></div>' +
    '<div class="course"><div class="thumb" style="background:#0a1205">🔐</div><div class="ci"><div class="ct">Cybersecurity Pro</div><div class="cs">' + tl('Ethical hacking','Hacking éthique') + '</div><div class="prog-bar"><div class="prog-fill" style="width:55%"></div></div><div style="font-size:10px;color:#64748b">55% ' + tl('complete','complété') + '</div></div></div>' +
    '</div></body></html>';
}

function buildHotel(isFr) {
  var t = function(e,f) { return isFr ? f : e; };
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>' + t('Hotel Booking','Réservation Hôtel') + '</title>' +
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">' +
    '<style>*{margin:0;padding:0;box-sizing:border-box;font-family:\'Inter\',sans-serif}body{background:#080b0e;color:#e2e8f0}' +
    '.hero{height:280px;background:linear-gradient(135deg,#1a1205,#0a0f1a);display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative}' +
    '.hero::before{content:\'\';position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(245,158,11,.15) 0%,transparent 70%)}' +
    '.ht{font-size:32px;font-weight:900;color:#fff;text-align:center;z-index:1;margin-bottom:8px}' +
    '.rooms{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:24px 30px}' +
    '.room{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;overflow:hidden;transition:.2s;cursor:pointer}' +
    '.room:hover{transform:translateY(-4px);border-color:rgba(245,158,11,.4)}' +
    '.room-img{height:130px;display:flex;align-items:center;justify-content:center;font-size:48px}' +
    '.ri{padding:14px}.rn{font-size:13px;font-weight:700;color:#fff;margin-bottom:5px}.rs{font-size:11px;color:#64748b;margin-bottom:10px}' +
    '.rp{font-size:18px;font-weight:900;color:#f59e0b}' +
    '.rbook{background:rgba(245,158,11,.12);border:1px solid rgba(245,158,11,.35);color:#f59e0b;padding:6px 14px;border-radius:6px;font-size:11px;font-weight:700;cursor:pointer}' +
    '</style></head><body>' +
    '<div class="hero"><div class="ht">🏨 ' + t('Find Your Perfect Stay','Trouvez Votre Séjour Idéal') + '</div>' +
    '<div style="font-size:13px;color:#94a3b8;z-index:1">500+ ' + t('luxury hotels','hôtels de luxe') + '</div></div>' +
    '<div style="padding:16px 30px 8px;font-size:16px;font-weight:900;color:#fff">⭐ ' + t('Featured Rooms','Chambres Vedettes') + '</div>' +
    '<div class="rooms">' +
    '<div class="room"><div class="room-img" style="background:#1a0f05">🛏️</div><div class="ri"><div class="rn">Suite Deluxe</div><div class="rs">' + t('King bed, city view','Lit king, vue ville') + '</div><div style="display:flex;justify-content:space-between;align-items:center"><div class="rp">€320<span style="font-size:10px;color:#64748b;font-weight:400">/' + t('night','nuit') + '</span></div><button class="rbook">' + t('Book','Réserver') + '</button></div></div></div>' +
    '<div class="room"><div class="room-img" style="background:#050a1a">🏊</div><div class="ri"><div class="rn">Ocean Suite</div><div class="rs">' + t('Ocean view, private pool','Vue océan, piscine privée') + '</div><div style="display:flex;justify-content:space-between;align-items:center"><div class="rp">€580<span style="font-size:10px;color:#64748b;font-weight:400">/' + t('night','nuit') + '</span></div><button class="rbook">' + t('Book','Réserver') + '</button></div></div></div>' +
    '<div class="room"><div class="room-img" style="background:#0a0a1a">🏙️</div><div class="ri"><div class="rn">Penthouse</div><div class="rs">' + t('Top floor, 360° panoramic','Dernier étage, panoramique 360°') + '</div><div style="display:flex;justify-content:space-between;align-items:center"><div class="rp">€890<span style="font-size:10px;color:#64748b;font-weight:400">/' + t('night','nuit') + '</span></div><button class="rbook">' + t('Book','Réserver') + '</button></div></div></div>' +
    '</div></body></html>';
}

function buildMusic(isFr) {
  var t = function(e,f) { return isFr ? f : e; };
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>' + t('Music Player Pro','Lecteur Musique Pro') + '</title>' +
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">' +
    '<style>*{margin:0;padding:0;box-sizing:border-box;font-family:\'Inter\',sans-serif}body{display:grid;grid-template-columns:240px 1fr;height:100vh;background:#030507;color:#e2e8f0;overflow:hidden}' +
    '.sidebar{background:#0a0a0f;border-right:1px solid rgba(255,255,255,.06);display:flex;flex-direction:column;padding:20px 12px}' +
    '.logo{font-weight:900;font-size:15px;background:linear-gradient(135deg,#ec4899,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;padding:8px 12px 20px}' +
    '.nl{padding:9px 12px;border-radius:7px;cursor:pointer;font-size:11.5px;color:#475569;margin-bottom:3px}' +
    '.nl:hover,.nl.on{background:rgba(236,72,153,.1);color:#ec4899}' +
    '.main{display:flex;flex-direction:column;overflow:hidden}' +
    '.now-section{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;background:linear-gradient(to bottom,#0d0618,#030507)}' +
    '.album{width:180px;height:180px;background:linear-gradient(135deg,#8b5cf6,#ec4899);border-radius:20px;display:flex;align-items:center;justify-content:center;font-size:64px;box-shadow:0 25px 50px rgba(139,92,246,.4);margin-bottom:22px}' +
    '.song-title{font-size:20px;font-weight:900;color:#fff;margin-bottom:5px}.song-artist{font-size:13px;color:#64748b;margin-bottom:20px}' +
    '.controls{display:flex;align-items:center;gap:16px;margin-bottom:20px}' +
    '.ctrl{background:rgba(255,255,255,.06);border:none;width:40px;height:40px;border-radius:50%;color:#fff;font-size:16px;cursor:pointer}' +
    '.play-btn{background:linear-gradient(135deg,#ec4899,#8b5cf6);border:none;width:54px;height:54px;border-radius:50%;color:#fff;font-size:22px;cursor:pointer;box-shadow:0 8px 20px rgba(236,72,153,.4)}' +
    '.prog-bg{background:rgba(255,255,255,.1);border-radius:50px;height:4px;width:100%;max-width:380px;cursor:pointer;margin-bottom:14px}' +
    '.prog-fill{background:linear-gradient(90deg,#ec4899,#8b5cf6);height:4px;border-radius:50px;width:34%}' +
    '.queue{background:#0a0a0f;border-top:1px solid rgba(255,255,255,.06);overflow-y:auto;max-height:200px}' +
    '.track{display:flex;align-items:center;gap:12px;padding:8px 18px;cursor:pointer;transition:.15s}' +
    '.track:hover{background:rgba(255,255,255,.04)}.tn{font-size:12px;font-weight:700;color:#e2e8f0}' +
    '</style></head><body>' +
    '<div class="sidebar"><div class="logo">🎵 SoundUltra</div>' +
    '<div class="nl on">🏠 ' + t('Home','Accueil') + '</div>' +
    '<div class="nl">🔍 ' + t('Search','Rechercher') + '</div>' +
    '<div class="nl">📚 ' + t('Library','Bibliothèque') + '</div>' +
    '<div class="nl">❤️ ' + t('Favorites','Favoris') + '</div></div>' +
    '<div class="main"><div class="now-section">' +
    '<div class="album">🎸</div>' +
    '<div class="song-title">Neon Dreams</div><div class="song-artist">The Ultra Band</div>' +
    '<div class="prog-bg"><div class="prog-fill"></div></div>' +
    '<div class="controls"><button class="ctrl">⏮</button><button class="play-btn" onclick="this.textContent=this.textContent===\'▶\'?\'⏸\':\'▶\'">▶</button><button class="ctrl">⏭</button></div>' +
    '</div>' +
    '<div class="queue"><div style="font-size:10px;font-weight:700;color:#475569;padding:10px 18px 5px">' + t('QUEUE','FILE') + '</div>' +
    '<div class="track"><div style="font-size:20px">🎸</div><div><div class="tn">Neon Dreams</div><div style="font-size:10px;color:#ec4899">The Ultra Band</div></div></div>' +
    '<div class="track"><div style="font-size:20px">🎹</div><div><div class="tn">Electric Soul</div><div style="font-size:10px;color:#475569">SynthWave X</div></div></div>' +
    '<div class="track"><div style="font-size:20px">🎺</div><div><div class="tn">Purple Rain</div><div style="font-size:10px;color:#475569">Violet Storm</div></div></div>' +
    '</div></div></body></html>';
}

function buildPassword(isFr) {
  var t = function(e,f) { return isFr ? f : e; };
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>' + t('Password Manager','Gestionnaire Mots de Passe') + '</title>' +
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">' +
    '<style>*{margin:0;padding:0;box-sizing:border-box;font-family:\'Inter\',sans-serif}body{background:#06080f;color:#e2e8f0;min-height:100vh}' +
    'header{background:rgba(0,0,0,.7);backdrop-filter:blur(15px);border-bottom:1px solid rgba(59,130,246,.2);padding:14px 28px;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:10}' +
    '.hbrand{font-weight:900;font-size:16px;color:#3b82f6}' +
    '.main{display:grid;grid-template-columns:1fr 340px;height:calc(100vh - 57px)}' +
    '.vault{padding:24px;overflow-y:auto}' +
    '.entry{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:13px 16px;display:flex;align-items:center;gap:14px;margin-bottom:8px;cursor:pointer;transition:.15s}' +
    '.entry:hover{background:rgba(59,130,246,.08);border-color:rgba(59,130,246,.25)}' +
    '.eicon{width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px}' +
    '.en{font-size:12px;font-weight:700;color:#e2e8f0}.eu{font-size:10px;color:#475569}' +
    '.gen-panel{background:#08101a;border-left:1px solid rgba(59,130,246,.15);padding:24px;display:flex;flex-direction:column;gap:16px}' +
    '.gen-output{background:rgba(255,255,255,.04);border:1px solid rgba(59,130,246,.2);border-radius:10px;padding:14px;font-family:monospace;font-size:13px;color:#60a5fa;letter-spacing:2px;min-height:50px;cursor:pointer}' +
    '.gen-btn{background:linear-gradient(135deg,#3b82f6,#1d4ed8);border:none;border-radius:10px;padding:12px;color:#fff;font-weight:900;font-size:12px;cursor:pointer}' +
    '</style></head><body>' +
    '<header><div class="hbrand">🔐 VaultUltra</div><div style="font-size:11px;color:#10b981;background:rgba(16,185,129,.1);padding:4px 12px;border-radius:50px;border:1px solid rgba(16,185,129,.25)">🟢 256-bit AES</div></header>' +
    '<div class="main"><div class="vault"><div style="font-size:16px;font-weight:900;color:#fff;margin-bottom:16px">🗄️ ' + t('Your Vault','Votre Coffre') + '</div>' +
    '<div class="entry"><div class="eicon" style="background:#1da1f222">🌐</div><div><div class="en">Twitter</div><div class="eu">jean@email.com</div></div><div style="margin-left:auto;font-size:10px;color:#3b82f6;font-family:monospace">●●●●●●●●</div></div>' +
    '<div class="entry"><div class="eicon" style="background:#ea433522">📧</div><div><div class="en">Gmail</div><div class="eu">jean.martin@gmail.com</div></div><div style="margin-left:auto;font-size:10px;color:#3b82f6;font-family:monospace">●●●●●●●●</div></div>' +
    '<div class="entry"><div class="eicon" style="background:#0077b522">💼</div><div><div class="en">LinkedIn</div><div class="eu">jean.martin</div></div><div style="margin-left:auto;font-size:10px;color:#3b82f6;font-family:monospace">●●●●●●●●</div></div>' +
    '<div class="entry"><div class="eicon" style="background:#ff990022">🛒</div><div><div class="en">Amazon</div><div class="eu">jean@email.com</div></div><div style="margin-left:auto;font-size:10px;color:#3b82f6;font-family:monospace">●●●●●●●●</div></div>' +
    '</div>' +
    '<div class="gen-panel"><div style="font-size:14px;font-weight:900;color:#3b82f6">⚙️ ' + t('Generator','Générateur') + '</div>' +
    '<div class="gen-output" id="gen-out" onclick="copyPw()">' + t('Click Generate','Cliquer Générer') + '</div>' +
    '<input type="range" min="8" max="32" value="18" style="width:100%;accent-color:#3b82f6" id="len-sl">' +
    '<button class="gen-btn" onclick="generate()">🎲 ' + t('Generate Password','Générer Mot de Passe') + '</button>' +
    '</div></div>' +
    '<script>var chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";var last="";function generate(){var len=parseInt(document.getElementById("len-sl").value);var pw="";for(var i=0;i<len;i++)pw+=chars[Math.floor(Math.random()*chars.length)];last=pw;document.getElementById("gen-out").textContent=pw;}function copyPw(){if(last)navigator.clipboard&&navigator.clipboard.writeText(last);}<\/script>' +
    '</body></html>';
}

function buildRealEstate(isFr) {
  var t = function(e,f) { return isFr ? f : e; };
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>' + t('Real Estate','Immobilier') + '</title>' +
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">' +
    '<style>*{margin:0;padding:0;box-sizing:border-box;font-family:\'Inter\',sans-serif}body{background:#060a10;color:#e2e8f0}' +
    'nav{background:rgba(0,0,0,.6);backdrop-filter:blur(15px);border-bottom:1px solid rgba(6,182,212,.15);padding:13px 28px;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:10}' +
    '.logo{font-weight:900;font-size:15px;color:#06b6d4}' +
    '.hero{background:linear-gradient(135deg,#040e18,#060a10);padding:40px 28px;display:flex;flex-direction:column;align-items:center;text-align:center}' +
    '.ht{font-size:28px;font-weight:900;color:#fff;margin-bottom:10px}' +
    '.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;padding:20px 28px}' +
    '.prop{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;overflow:hidden;transition:.2s;cursor:pointer}' +
    '.prop:hover{transform:translateY(-4px);border-color:rgba(6,182,212,.4)}' +
    '.pimg{height:140px;display:flex;align-items:center;justify-content:center;font-size:50px}' +
    '.pi{padding:14px}.pn{font-size:13px;font-weight:700;color:#fff;margin-bottom:3px}.pl{font-size:10px;color:#475569;margin-bottom:8px}' +
    '.pp{font-size:17px;font-weight:900;color:#06b6d4}' +
    '</style></head><body>' +
    '<nav><div class="logo">🏡 EstateUltra</div><div style="display:flex;gap:16px"><span style="font-size:12px;color:#06b6d4;cursor:pointer;font-weight:700">' + t('Rent','Louer') + '</span></div></nav>' +
    '<div class="hero"><div class="ht">🏠 ' + t('Find Your Dream Home','Trouvez Votre Maison Idéale') + '</div><div style="font-size:13px;color:#64748b">12,000+ ' + t('listings','annonces') + '</div></div>' +
    '<div class="grid">' +
    '<div class="prop"><div class="pimg" style="background:#0a1628">🏢</div><div class="pi"><div class="pn">Apt Champs-Élysées</div><div class="pl">📍 Paris 8ème · 75m²</div><div class="pp">€3,200/m</div></div></div>' +
    '<div class="prop"><div class="pimg" style="background:#0a1205">🏠</div><div class="pi"><div class="pn">Maison Montmartre</div><div class="pl">📍 Paris 18ème · 120m²</div><div class="pp">€580,000</div></div></div>' +
    '<div class="prop"><div class="pimg" style="background:#100a05">🏡</div><div class="pi"><div class="pn">Villa Côte d\'Azur</div><div class="pl">📍 Nice · 280m²</div><div class="pp">€1,250,000</div></div></div>' +
    '<div class="prop"><div class="pimg" style="background:#050a1a">🏢</div><div class="pi"><div class="pn">Studio Latin Quarter</div><div class="pl">📍 Paris 5ème · 35m²</div><div class="pp">€1,800/m</div></div></div>' +
    '</div></body></html>';
}

function buildAnalytics(isFr) {
  var t = function(e,f) { return isFr ? f : e; };
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>' + t('Analytics Pro','Analytics Pro') + '</title>' +
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">' +
    '<style>*{margin:0;padding:0;box-sizing:border-box;font-family:\'Inter\',sans-serif}body{display:flex;height:100vh;background:#030a1a;color:#e2e8f0;overflow:hidden}' +
    '.sidebar{width:200px;background:#020712;border-right:1px solid rgba(99,102,241,.12);padding:18px 10px;display:flex;flex-direction:column;gap:2px;flex-shrink:0}' +
    '.logo{color:#6366f1;font-weight:900;font-size:14px;padding:8px 12px 20px}' +
    '.nl{padding:9px 12px;border-radius:7px;cursor:pointer;font-size:11.5px;color:#475569;display:flex;align-items:center;gap:9px}' +
    '.nl.on{background:rgba(99,102,241,.1);color:#6366f1}' +
    '.main{flex:1;display:flex;flex-direction:column;overflow:hidden}' +
    '.topbar{padding:13px 20px;border-bottom:1px solid rgba(255,255,255,.05);display:flex;justify-content:space-between;align-items:center;flex-shrink:0}' +
    '.body{flex:1;padding:18px 20px;overflow-y:auto}' +
    '.kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px}' +
    '.kpi{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:14px}' +
    '.kl{font-size:9px;font-weight:700;color:#475569;letter-spacing:1px;margin-bottom:6px}' +
    '.kv{font-size:22px;font-weight:900;color:#fff}.kd{font-size:10px;margin-top:4px}.up{color:#10b981}.dn{color:#ef4444}' +
    '.card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:15px;margin-bottom:14px}' +
    '.ct{font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px}' +
    'canvas{width:100%!important;display:block}' +
    '</style></head><body>' +
    '<div class="sidebar"><div class="logo">📊 AnalyticsPro</div>' +
    '<div class="nl on">📊 ' + t('Overview','Vue d\'ensemble') + '</div>' +
    '<div class="nl">📈 ' + t('Revenue','Revenus') + '</div>' +
    '<div class="nl">👥 ' + t('Users','Utilisateurs') + '</div>' +
    '</div>' +
    '<div class="main"><div class="topbar"><div style="font-size:14px;font-weight:900;color:#fff">📊 ' + t('Analytics Dashboard','Tableau Analytics') + '</div></div>' +
    '<div class="body"><div class="kpis">' +
    '<div class="kpi"><div class="kl">' + t('Revenue','Revenus') + '</div><div class="kv" id="k1">€0</div><div class="kd up">↑ 23.5%</div></div>' +
    '<div class="kpi"><div class="kl">' + t('Users','Utilisateurs') + '</div><div class="kv" id="k2">0</div><div class="kd up">↑ 12.3%</div></div>' +
    '<div class="kpi"><div class="kl">' + t('Conversion','Conversion') + '</div><div class="kv" id="k3">0%</div><div class="kd dn">↓ 1.2%</div></div>' +
    '<div class="kpi"><div class="kl">' + t('Bounce','Rebond') + '</div><div class="kv" id="k4">0%</div><div class="kd up">↓ 5.8%</div></div>' +
    '</div>' +
    '<div class="card"><div class="ct">' + t('Revenue Over Time','Revenus dans le Temps') + '</div><canvas id="rev-chart" height="140"></canvas></div>' +
    '</div></div>' +
    '<script>' +
    'function cu(el,v,pre,suf){var n=0;var s=function(){n=Math.min(n+Math.max(1,Math.floor(v/25)),v);el.textContent=pre+n.toLocaleString()+suf;if(n<v)requestAnimationFrame(s);};s();}' +
    'setTimeout(function(){cu(document.getElementById("k1"),84320,"€","");cu(document.getElementById("k2"),24182,"","");cu(document.getElementById("k3"),57,"","%");cu(document.getElementById("k4"),38,"","%");},200);' +
    'var rc=document.getElementById("rev-chart");rc.width=rc.parentElement.clientWidth-30;' +
    'var rx=rc.getContext("2d");var rd=[18,22,19,28,25,32,29,38,35,42,39,48,45,52];' +
    'var rw=rc.width,rh=rc.height,rp=14;var rmax=Math.max.apply(null,rd)+5,rmin=0;' +
    'var rsy=function(v){return rh-rp-(v-rmin)/(rmax-rmin)*(rh-rp*2);};' +
    'var rsx=function(i){return rp+i*(rw-rp*2)/(rd.length-1);};' +
    'var rg=rx.createLinearGradient(0,0,0,rh);rg.addColorStop(0,"rgba(99,102,241,.4)");rg.addColorStop(1,"rgba(99,102,241,0)");' +
    'rx.beginPath();rx.moveTo(rsx(0),rsy(rd[0]));rd.forEach(function(v,i){rx.lineTo(rsx(i),rsy(v));});rx.lineTo(rsx(rd.length-1),rh-rp);rx.lineTo(rsx(0),rh-rp);rx.closePath();rx.fillStyle=rg;rx.fill();' +
    'rx.beginPath();rx.moveTo(rsx(0),rsy(rd[0]));rd.forEach(function(v,i){rx.lineTo(rsx(i),rsy(v));});rx.strokeStyle="#6366f1";rx.lineWidth=2;rx.lineJoin="round";rx.stroke();' +
    '<\/script></body></html>';
}

function buildNFT(isFr) {
  var t = function(e,f) { return isFr ? f : e; };
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>' + t('NFT Gallery','Galerie NFT') + '</title>' +
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">' +
    '<style>*{margin:0;padding:0;box-sizing:border-box;font-family:\'Inter\',sans-serif}body{background:#08080f;color:#e2e8f0;min-height:100vh}' +
    'nav{background:rgba(0,0,0,.7);backdrop-filter:blur(15px);border-bottom:1px solid rgba(232,121,249,.2);padding:12px 28px;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:10}' +
    '.logo{font-weight:900;font-size:15px;background:linear-gradient(135deg,#e879f9,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent}' +
    '.wallet{background:linear-gradient(135deg,#e879f9,#8b5cf6);border:none;border-radius:8px;padding:7px 16px;color:#fff;font-weight:700;font-size:12px;cursor:pointer}' +
    '.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:24px 28px}' +
    '.nft{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:16px;overflow:hidden;transition:.25s;cursor:pointer}' +
    '.nft:hover{transform:translateY(-6px);border-color:rgba(232,121,249,.4)}' +
    '.nimg{height:160px;display:flex;align-items:center;justify-content:center;font-size:58px}' +
    '.ni{padding:14px}.nn{font-size:13px;font-weight:700;color:#fff;margin-bottom:2px}.nc{font-size:10px;color:#475569;margin-bottom:10px}' +
    '.np{font-size:13px;font-weight:900;background:linear-gradient(135deg,#e879f9,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent}' +
    '.nbid{flex:1;background:linear-gradient(135deg,#e879f9,#8b5cf6);border:none;border-radius:7px;padding:7px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;margin-top:10px;width:100%}' +
    '</style></head><body>' +
    '<nav><div class="logo">🎨 NFTUltra</div><button class="wallet">🔗 ' + t('Connect Wallet','Connecter Wallet') + '</button></nav>' +
    '<div style="display:flex;gap:0;border-bottom:1px solid rgba(255,255,255,.05);background:rgba(0,0,0,.3)">' +
    '<div style="flex:1;text-align:center;padding:16px"><div style="font-size:20px;font-weight:900;color:#fff">48,293</div><div style="font-size:9px;color:#475569;font-weight:700">NFTs</div></div>' +
    '<div style="flex:1;text-align:center;padding:16px"><div style="font-size:20px;font-weight:900;color:#fff">€2.4M</div><div style="font-size:9px;color:#475569;font-weight:700">' + t('Volume 24h','Volume 24h') + '</div></div>' +
    '<div style="flex:1;text-align:center;padding:16px"><div style="font-size:20px;font-weight:900;color:#fff">89,234</div><div style="font-size:9px;color:#475569;font-weight:700">' + t('Sales','Ventes') + '</div></div>' +
    '</div>' +
    '<div class="grid">' +
    '<div class="nft"><div class="nimg" style="background:#1a0a2e">🌌</div><div class="ni"><div class="nn">Cosmic Dreams #42</div><div class="nc">' + t('Celestial Collection','Collection Céleste') + '</div><div class="np">2.4 ETH</div><button class="nbid">' + t('Place Bid','Enchérir') + '</button></div></div>' +
    '<div class="nft"><div class="nimg" style="background:#0a0a2e">🔮</div><div class="ni"><div class="nn">Crystal Mind #7</div><div class="nc">' + t('Digital Souls','Âmes Digitales') + '</div><div class="np">5.1 ETH</div><button class="nbid">' + t('Place Bid','Enchérir') + '</button></div></div>' +
    '<div class="nft"><div class="nimg" style="background:#0a1a0a">⚡</div><div class="ni"><div class="nn">Electric Storm #19</div><div class="nc">' + t('Power Series','Série Power') + '</div><div class="np">1.8 ETH</div><button class="nbid">' + t('Place Bid','Enchérir') + '</button></div></div>' +
    '</div></body></html>';
}

function buildNews(isFr) {
  var t = function(e,f) { return isFr ? f : e; };
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>' + t('News Magazine','Magazine News') + '</title>' +
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">' +
    '<style>*{margin:0;padding:0;box-sizing:border-box;font-family:\'Inter\',sans-serif}body{background:#0a0a0a;color:#e2e8f0;min-height:100vh}' +
    'nav{background:rgba(0,0,0,.8);border-bottom:1px solid rgba(255,255,255,.07);padding:12px 30px;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:10}' +
    '.logo{font-weight:900;font-size:16px;color:#ef4444}' +
    '.hero{display:grid;grid-template-columns:2fr 1fr;gap:0;border-bottom:1px solid rgba(255,255,255,.07);height:320px}' +
    '.hero-main{background:linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,.8)),linear-gradient(135deg,#1a0505,#0a0a0a);display:flex;flex-direction:column;justify-content:flex-end;padding:28px;cursor:pointer;border-right:1px solid rgba(255,255,255,.07)}' +
    '.hero-title{font-size:20px;font-weight:900;color:#fff;line-height:1.25;margin-bottom:8px}' +
    '.hero-cat{font-size:9px;font-weight:900;color:#ef4444;letter-spacing:2px;background:rgba(239,68,68,.15);padding:3px 10px;border-radius:4px;display:inline-block;margin-bottom:10px}' +
    '.hero-side{display:flex;flex-direction:column;overflow:hidden}' +
    '.side-article{flex:1;border-bottom:1px solid rgba(255,255,255,.07);padding:16px;cursor:pointer}' +
    '.section{padding:24px 30px}' +
    '.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}' +
    '.article{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:12px;overflow:hidden;cursor:pointer;transition:.2s}' +
    '.article:hover{transform:translateY(-3px);box-shadow:0 10px 25px rgba(0,0,0,.3)}' +
    '.a-thumb{height:100px;display:flex;align-items:center;justify-content:center;font-size:40px}' +
    '.a-body{padding:12px}.a-cat{font-size:9px;font-weight:900;color:#ef4444;margin-bottom:5px}' +
    '.a-title{font-size:12px;font-weight:700;color:#e2e8f0;line-height:1.4;margin-bottom:5px}.a-meta{font-size:9px;color:#64748b}' +
    '</style></head><body>' +
    '<nav><div class="logo">📰 UltraNews</div><input style="background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:6px;padding:6px 10px;color:#fff;font-size:11px;outline:none" placeholder="🔍 ' + t('Search…','Chercher…') + '"></nav>' +
    '<div class="hero"><div class="hero-main">' +
    '<div class="hero-cat">🔥 BREAKING</div>' +
    '<div class="hero-title">' + t('Google DeepMind Unveils Neural Architecture That Surpasses Human Reasoning','Google DeepMind Dévoile une Architecture IA qui Surpasse le Raisonnement Humain') + '</div>' +
    '<div style="font-size:10px;color:rgba(255,255,255,.5)">⏱ 2h · 🔥 48,293 ' + t('reads','lectures') + '</div></div>' +
    '<div class="hero-side">' +
    '<div class="side-article"><div style="font-size:9px;font-weight:900;color:#3b82f6;margin-bottom:5px">⚡ Tech</div><div style="font-size:12px;font-weight:700;color:#e2e8f0">' + t('Apple Announces M4 Ultra: 200% Faster','Apple Annonce la Puce M4 Ultra : 200% Plus Rapide') + '</div></div>' +
    '<div class="side-article"><div style="font-size:9px;font-weight:900;color:#10b981;margin-bottom:5px">💰 Finance</div><div style="font-size:12px;font-weight:700;color:#e2e8f0">' + t('Bitcoin Crosses $200k For The First Time','Bitcoin Franchit les $200k Pour la Première Fois') + '</div></div>' +
    '<div class="side-article"><div style="font-size:9px;font-weight:900;color:#f59e0b;margin-bottom:5px">🌍 Climate</div><div style="font-size:12px;font-weight:700;color:#e2e8f0">' + t('Scientists Discover Carbon Capture 10x More Efficient','Méthode de Capture Carbone 10x Plus Efficace') + '</div></div></div></div>' +
    '<div class="section"><div style="font-size:14px;font-weight:900;color:#fff;margin-bottom:18px">📈 ' + t('Trending','Tendances') + '</div><div class="grid">' +
    '<div class="article"><div class="a-thumb" style="background:#1a0a2e">🤖</div><div class="a-body"><div class="a-cat" style="color:#3b82f6">AI</div><div class="a-title">' + t('OpenAI GPT-5 Passes Bar Exam with 98%','OpenAI GPT-5 Réussit l\'Examen du Barreau avec 98%') + '</div><div class="a-meta">2h</div></div></div>' +
    '<div class="article"><div class="a-thumb" style="background:#0a1628">🚀</div><div class="a-body"><div class="a-cat" style="color:#6366f1">Space</div><div class="a-title">' + t('SpaceX Lands First Humans on Mars','SpaceX Pose les Premiers Humains sur Mars') + '</div><div class="a-meta">4h</div></div></div>' +
    '<div class="article"><div class="a-thumb" style="background:#0a1205">💊</div><div class="a-body"><div class="a-cat" style="color:#10b981">Health</div><div class="a-title">' + t('Gene Therapy Cures Type 1 Diabetes','Thérapie Génique Guérit le Diabète de Type 1') + '</div><div class="a-meta">6h</div></div></div>' +
    '</div></div></body></html>';
}

function buildSaaS(isFr) {
  var t = function(e,f) { return isFr ? f : e; };
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>' + t('SaaS Landing','Landing SaaS') + '</title>' +
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">' +
    '<style>*{margin:0;padding:0;box-sizing:border-box;font-family:\'Inter\',sans-serif}body{background:#020617;color:#e2e8f0;overflow-x:hidden}' +
    'canvas#particles{position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none}' +
    'nav{position:sticky;top:0;z-index:10;background:rgba(2,6,23,.8);backdrop-filter:blur(15px);border-bottom:1px solid rgba(255,255,255,.06);padding:14px 40px;display:flex;justify-content:space-between;align-items:center}' +
    '.logo{font-weight:900;font-size:16px;background:linear-gradient(135deg,#8b5cf6,#3b82f6);-webkit-background-clip:text;-webkit-text-fill-color:transparent}' +
    '.cta{background:linear-gradient(135deg,#8b5cf6,#3b82f6);border:none;border-radius:12px;padding:14px 32px;color:#fff;font-weight:900;font-size:14px;cursor:pointer;box-shadow:0 10px 30px rgba(139,92,246,.4)}' +
    '.hero{text-align:center;padding:100px 40px 80px;position:relative;z-index:1}' +
    '.hero-title{font-size:52px;font-weight:900;line-height:1.1;margin-bottom:16px}' +
    '.grad{background:linear-gradient(135deg,#8b5cf6,#3b82f6,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent}' +
    '.feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;padding:0 40px 80px;position:relative;z-index:1}' +
    '.feat{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:28px;transition:.2s}' +
    '.feat:hover{border-color:rgba(139,92,246,.3);transform:translateY(-3px)}' +
    '.price-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:900px;margin:0 auto;padding:0 40px 80px;position:relative;z-index:1}' +
    '.plan{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:28px}' +
    '.plan.pop{background:linear-gradient(135deg,rgba(139,92,246,.12),rgba(59,130,246,.06));border-color:rgba(139,92,246,.4);transform:scale(1.04)}' +
    '</style></head><body>' +
    '<canvas id="particles"></canvas>' +
    '<nav><div class="logo">⚡ UltraSaaS</div><button class="cta" style="padding:8px 18px;font-size:12px;margin:0">' + t('Get Started Free','Commencer Gratuitement') + '</button></nav>' +
    '<div class="hero">' +
    '<div style="display:inline-block;background:rgba(139,92,246,.15);border:1px solid rgba(139,92,246,.3);border-radius:50px;padding:6px 18px;font-size:11px;color:#a78bfa;font-weight:700;letter-spacing:1px;margin-bottom:24px">🚀 ' + t('Now in Public Beta','En Beta Publique') + '</div>' +
    '<div class="hero-title">' + t('Build Faster.<br>Ship Smarter.','Construisez Plus Vite.<br>Déployez Plus Intelligemment.') + '<br><span class="grad">' + t('Grow Beyond Limits.','Grandissez Sans Limites.') + '</span></div>' +
    '<div style="font-size:16px;color:#64748b;max-width:560px;margin:0 auto 34px;line-height:1.7">' + t('The all-in-one platform that combines AI, automation, and analytics.','La plateforme tout-en-un qui combine IA, automatisation et analytics.') + '</div>' +
    '<button class="cta">✨ ' + t('Start Free Trial','Commencer l\'Essai Gratuit') + '</button>' +
    '</div>' +
    '<div class="feat-grid">' +
    '<div class="feat"><div style="font-size:32px;margin-bottom:14px">⚡</div><div style="font-size:15px;font-weight:700;color:#fff;margin-bottom:8px">' + t('AI Automation','Automatisation IA') + '</div><div style="font-size:12px;color:#64748b;line-height:1.7">' + t('Automate repetitive tasks with AI-powered workflows','Automatisez les tâches répétitives avec des workflows IA') + '</div></div>' +
    '<div class="feat"><div style="font-size:32px;margin-bottom:14px">📊</div><div style="font-size:15px;font-weight:700;color:#fff;margin-bottom:8px">' + t('Real-time Analytics','Analytics Temps Réel') + '</div><div style="font-size:12px;color:#64748b;line-height:1.7">' + t('Monitor all your KPIs in a beautiful unified dashboard','Surveillez tous vos KPIs dans un dashboard unifié') + '</div></div>' +
    '<div class="feat"><div style="font-size:32px;margin-bottom:14px">🔐</div><div style="font-size:15px;font-weight:700;color:#fff;margin-bottom:8px">' + t('Enterprise Security','Sécurité Enterprise') + '</div><div style="font-size:12px;color:#64748b;line-height:1.7">' + t('SOC 2 Type II, GDPR compliant, end-to-end encrypted','SOC 2, conforme RGPD, chiffrement bout en bout') + '</div></div>' +
    '</div>' +
    '<script>var c=document.getElementById("particles"),x=c.getContext("2d");var W,H,pts=[];function resize(){W=c.width=window.innerWidth;H=c.height=window.innerHeight;pts=[];for(var i=0;i<80;i++)pts.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,s:Math.random()*1.5+.5,o:Math.random()*.5+.1});}resize();window.addEventListener("resize",resize);function draw(){x.clearRect(0,0,W,H);pts.forEach(function(p){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;x.beginPath();x.arc(p.x,p.y,p.s,0,Math.PI*2);x.fillStyle="rgba(139,92,246,"+p.o+")";x.fill();});requestAnimationFrame(draw);}draw();<\/script>' +
    '</body></html>';
}

/* ══════════════════════════════════ APP VAULT DATA ══ */
function getApps(isFr) {
  var T = isFr ? V5L.fr.tags : V5L.en.tags;
  return [
    { id:'medical', icon:'🏥', color:'#10b981', name: isFr?'Dashboard Médical':'Medical Dashboard', desc: isFr?'Gestion patients, graphiques vitaux':'Patient management, vitals chart', tags:[T.dash, T.med], build: buildMedical },
    { id:'elearn', icon:'🎓', color:'#8b5cf6', name: isFr?'Plateforme E-Learning':'E-Learning Platform', desc: isFr?'Cours vidéo, progression, quiz':'Video courses, progress bars, quiz', tags:[T.dash, T.edu], build: buildElearn },
    { id:'hotel', icon:'🏨', color:'#f59e0b', name: isFr?'Réservation Hôtel':'Hotel Booking', desc: isFr?'Galerie chambres, formulaire réservation':'Room gallery, booking form', tags:[T.hotel,'UX'], build: buildHotel },
    { id:'music', icon:'🎵', color:'#ec4899', name: isFr?'Lecteur Musique Pro':'Music Player Pro', desc: isFr?'Style Spotify, playlist, contrôles':'Spotify-style, playlist, controls', tags:[T.player, T.music], build: buildMusic },
    { id:'password', icon:'🔐', color:'#3b82f6', name: isFr?'Coffre-fort Mots de Passe':'Password Manager', desc: isFr?'Coffre sécurisé, générateur':'Secure vault, generator', tags:[T.security,'Privacy'], build: buildPassword },
    { id:'realestate', icon:'🏡', color:'#06b6d4', name: isFr?'Immobilier Premium':'Real Estate App', desc: isFr?'Annonces propriétés, filtres':'Property listings, filters', tags:[T.listing,'Search'], build: buildRealEstate },
    { id:'analytics', icon:'📊', color:'#6366f1', name: 'Analytics Dashboard Pro', desc: isFr?'KPIs, graphiques canvas, tableau':'KPI cards, canvas charts, table', tags:[T.dash, T.analytics], build: buildAnalytics },
    { id:'nft', icon:'🎨', color:'#e879f9', name: isFr?'Galerie NFT':'NFT Gallery', desc: isFr?'Grille masonry, enchères, wallet':'Masonry grid, bidding, wallet', tags:[T.gallery, T.nft], build: buildNFT },
    { id:'news', icon:'📰', color:'#ef4444', name: isFr?'Magazine News':'News Magazine', desc: isFr?'Layout éditorial, hero article':'Editorial layout, hero article', tags:[T.listing, T.news], build: buildNews },
    { id:'saas', icon:'🚀', color:'#7c3aed', name: isFr?'Landing SaaS Premium':'SaaS Landing Premium', desc: isFr?'Hero particules, features, pricing':'Particles hero, features, pricing', tags:[T.landing,'SaaS'], build: buildSaaS }
  ];
}

/* ══════════════════════════════════ POWER TOOLS LOGIC ══ */
var ToolsImpl = {
  pwa: function(isFr, tx) {
    var code = getCode(); if (!code.trim()) { showToastV5(tx.noCode); return; }
    var manifest = '<link rel="manifest" href="manifest.json"><meta name="theme-color" content="#8b5cf6"><meta name="mobile-web-app-capable" content="yes">';
    var sw = '<script>if(\'serviceWorker\'in navigator){navigator.serviceWorker.register(\'sw.js\').then(function(r){console.log(\'SW:\',r);});}<\/script>';
    var result = code.replace('</head>', manifest + '\n</head>').replace('</body>', sw + '\n</body>');
    injectCode(result); showToastV5(tx.pwaOk);
  },
  auth: function(isFr, tx) {
    var code = getCode(); if (!code.trim()) { showToastV5(tx.noCode); return; }
    var overlay = '<div id="auth-overlay" style="position:fixed;inset:0;background:rgba(0,0,0,.92);backdrop-filter:blur(20px);z-index:99999;display:flex;align-items:center;justify-content:center"><div style="background:#0d1117;border:1px solid rgba(139,92,246,.3);border-radius:20px;padding:36px;width:360px;font-family:Inter,sans-serif"><div style="font-size:20px;font-weight:900;color:#fff;margin-bottom:6px;text-align:center">🔐 ' + (isFr ? 'Connexion' : 'Login') + '</div><div style="margin-bottom:12px"><div style="font-size:10px;color:#64748b;font-weight:700;margin-bottom:5px">EMAIL</div><input id="auth-email" type="email" placeholder="user@email.com" style="width:100%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:10px 14px;color:#fff;font-size:13px;outline:none"></div><div style="margin-bottom:20px"><div style="font-size:10px;color:#64748b;font-weight:700;margin-bottom:5px">PASSWORD</div><input id="auth-pass" type="password" placeholder="••••••••" style="width:100%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:10px 14px;color:#fff;font-size:13px;outline:none"></div><button onclick="doLogin()" style="width:100%;background:linear-gradient(135deg,#8b5cf6,#3b82f6);border:none;border-radius:10px;padding:13px;color:#fff;font-weight:900;font-size:14px;cursor:pointer">✨ ' + (isFr ? 'Se connecter' : 'Login') + '</button><div style="text-align:center;margin-top:14px;font-size:11px;color:#475569">Demo: admin@demo.com / password</div></div></div>';
    var authJs = '<script>function doLogin(){var e=document.getElementById("auth-email").value,p=document.getElementById("auth-pass").value;if(e&&p){localStorage.setItem("ultra_auth",JSON.stringify({email:e,ts:Date.now()}));document.getElementById("auth-overlay").style.display="none";}else{alert("' + (isFr ? 'Remplissez tous les champs' : 'Fill all fields') + '");}}function checkAuth(){var a=JSON.parse(localStorage.getItem("ultra_auth")||"null");if(!a||Date.now()-a.ts>86400000){document.getElementById("auth-overlay").style.display="flex";}}checkAuth();<\/script>';
    var result = code.replace('<body>', '<body>' + overlay).replace('</body>', authJs + '\n</body>');
    injectCode(result); showToastV5(tx.authOk);
  },
  explain: function(isFr, tx) {
    var code = getCode(); if (!code.trim()) { showToastV5(tx.noCode); return; }
    var explained = code
      .replace(/document\.getElementById\(/g, (isFr ? '// Sélectionne l\'élément par son ID\n    document.getElementById(' : '// Selects element by ID\n    document.getElementById('))
      .replace(/addEventListener\(/g, (isFr ? '// Écoute un événement\n    addEventListener(' : '// Listens for an event\n    addEventListener('))
      .replace(/querySelector\(/g, (isFr ? '// Trouve le premier élément CSS\n    querySelector(' : '// Finds first CSS match\n    querySelector('));
    injectCode('<!-- AUTO-EXPLAINED BY IA ULTRA v5 -->\n' + explained); showToastV5(tx.explainOk);
  },
  ab: function(isFr, tx) {
    var code = getCode(); if (!code.trim()) { showToastV5(tx.noCode); return; }
    var varB = code.replace(/#8b5cf6/gi, '#f59e0b').replace(/#3b82f6/gi, '#ef4444').replace(/#10b981/gi, '#f97316').replace(/#a78bfa/gi, '#fde68a');
    var abCode = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>' + (isFr ? 'Test A/B' : 'A/B Test') + '</title><style>*{margin:0;padding:0;box-sizing:border-box}body{display:grid;grid-template-columns:1fr 1fr;height:100vh;background:#000}.panel{position:relative;overflow:hidden}.label{position:absolute;top:12px;left:50%;transform:translateX(-50%);z-index:100;background:rgba(0,0,0,.8);color:#fff;padding:5px 16px;border-radius:50px;font-size:11px;font-weight:900;letter-spacing:1px}iframe{width:100%;height:100%;border:none}</style></head><body><div class="panel"><div class="label">\uD83C\uDD70 VARIANT A</div><iframe id="fa" srcdoc=""></iframe></div><div class="panel"><div class="label" style="background:rgba(245,158,11,.8)">\uD83C\uDD71 VARIANT B</div><iframe id="fb" srcdoc=""></iframe></div><script>document.getElementById("fa").srcdoc=' + JSON.stringify(code) + ';document.getElementById("fb").srcdoc=' + JSON.stringify(varB) + ';<\/script></body></html>';
    injectCode(abCode); showToastV5(tx.abOk);
  },
  holo: function(isFr) {
    var code = getCode(); if (!code.trim()) { showToastV5(isFr?"Code vide":"No code"); return; }
    var holoCode = '\n<!-- HOLO-UI 3D -->\n<style>\n.holo-3d { transition: transform 0.1s ease-out; transform-style: preserve-3d; perspective: 1000px; }\n</style>\n<script>\n  document.addEventListener("mousemove", function(e) {\n    var xAxis = (window.innerWidth/2 - e.pageX)/25;\n    var yAxis = (window.innerHeight/2 - e.pageY)/25;\n    document.querySelectorAll("div, section, article, main").forEach(function(el) {\n      if(el.clientWidth > 150) { el.classList.add("holo-3d"); el.style.transform = "rotateY(" + xAxis + "deg) rotateX(" + yAxis + "deg)"; }\n    });\n  });\n<\/script>\n';
    var result = /<\/body>/i.test(code) ? code.replace(/<\/body>/i, holoCode + '</body>') : code + holoCode;
    injectCode(result); showToastV5(isFr ? "Holo-UI 3D Injecté!" : "Holo-UI 3D Injected!");
  },
  api: function(isFr) {
    var code = getCode(); if (!code.trim()) { showToastV5(isFr?"Code vide":"No code"); return; }
    var apiCode = '\n<!-- API MOCK SERVER -->\n<script>\n  const originalFetch = window.fetch;\n  window.fetch = async function(url, options) {\n    if(url.includes("/api/")) {\n      console.log("Mocking API:", url);\n      return new Response(JSON.stringify([{id:1, name:"Demo Data"}, {id:2, mock:true}]), { headers: { "Content-Type": "application/json" }});\n    }\n    return originalFetch(url, options);\n  };\n<\/script>\n';
    var result = /<\/body>/i.test(code) ? code.replace(/<\/body>/i, apiCode + '</body>') : code + apiCode;
    injectCode(result); showToastV5(isFr ? "Mock API Injecté!" : "Mock API Injected!");
  },
  gsap: function(isFr) {
    var code = getCode(); if (!code.trim()) { showToastV5(isFr?"Code vide":"No code"); return; }
    var gsapCode = '\n<!-- GSAP ANIMATIONS -->\n<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"><\/script>\n<script>\n  document.addEventListener("DOMContentLoaded", function() {\n    if(window.gsap) {\n      gsap.from("h1, h2, h3", {opacity: 0, y: -30, duration: 1, stagger: 0.2});\n      gsap.from("div, button, img", {opacity: 0, scale: 0.95, duration: 0.8, stagger: 0.1, delay: 0.5});\n    }\n  });\n<\/script>\n';
    var result = /<\/body>/i.test(code) ? code.replace(/<\/body>/i, gsapCode + '</body>') : code + gsapCode;
    injectCode(result); showToastV5(isFr ? "GSAP Injecté!" : "GSAP Injected!");
  },
  node: function(isFr) {
    var code = getCode(); if (!code.trim()) { showToastV5(isFr?"Code vide":"No code"); return; }
    var nodeCode = '\n<!-- NODE ENGINE: FETCH BOILERPLATE -->\n<script>\n  async function loadData() {\n    try {\n      const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=3");\n      const data = await res.json();\n      console.log("Node Engine fetched:", data);\n    } catch(err) { console.error(err); }\n  }\n  loadData();\n<\/script>\n';
    var result = /<\/body>/i.test(code) ? code.replace(/<\/body>/i, nodeCode + '</body>') : code + nodeCode;
    injectCode(result); showToastV5(isFr ? "Node Logic Injecté!" : "Node Logic Injected!");
  },
  canvas: function(isFr) {
    var code = getCode(); if (!code.trim()) { showToastV5(isFr?"Code vide":"No code"); return; }
    var canvasCode = '\n<!-- GEN CANVAS WRAPPER -->\n<style>body{overflow:hidden;}#gen-canvas-wrapper{width:100vw;height:100vh;transform-origin:0 0;transition:transform 0.1s;}</style>\n<script>\n  let scale=1; document.body.id="gen-canvas-wrapper";\n  window.addEventListener("wheel", function(e) { if(e.ctrlKey) { scale -= e.deltaY*0.01; document.body.style.transform="scale("+scale+")"; e.preventDefault(); } }, {passive: false});\n<\/script>\n';
    var result = /<\/body>/i.test(code) ? code.replace(/<\/body>/i, canvasCode + '\n</body>') : code + '\n' + canvasCode;
    injectCode(result); showToastV5(isFr ? "Canvas Wrapper Injecté!" : "Canvas Wrapper Injected!");
  },

  heatmap: function(isFr) {
    var code = getCode(); if (!code.trim()) { showToastV5(isFr?"Code vide":"No code"); return; }
    var heatmapCode = '\n<!-- EYETRACKING HEATMAP -->\n<style>\n.heat-dot { position:absolute; border-radius:50%; pointer-events:none; z-index:99999; mix-blend-mode:screen; filter:blur(25px); animation:pulse 2s infinite; }\n@keyframes pulse { 0% { opacity:0.6; transform:scale(1); } 50% { opacity:0.9; transform:scale(1.2); } 100% { opacity:0.6; transform:scale(1); } }\n</style>\n<script>\n  setTimeout(function() {\n    document.querySelectorAll("button, h1, h2, img, a").forEach(function(el) {\n      var rect = el.getBoundingClientRect();\n      if(rect.width===0) return;\n      var dot = document.createElement("div");\n      dot.className = "heat-dot";\n      var size = Math.max(80, Math.min(rect.width, rect.height) * 1.5);\n      dot.style.width = size + "px"; dot.style.height = size + "px";\n      dot.style.left = (rect.left + window.scrollX + rect.width/2 - size/2) + "px";\n      dot.style.top = (rect.top + window.scrollY + rect.height/2 - size/2) + "px";\n      dot.style.background = el.tagName === "BUTTON" ? "radial-gradient(circle, rgba(239,68,68,0.8) 20%, rgba(245,158,11,0.6) 80%, transparent 100%)" : "radial-gradient(circle, rgba(245,158,11,0.8) 20%, rgba(234,179,8,0.6) 80%, transparent 100%)";\n      document.body.appendChild(dot);\n    });\n  }, 500);\n<\/script>\n';
    var result = /<\/body>/i.test(code) ? code.replace(/<\/body>/i, heatmapCode + '\n</body>') : code + '\n' + heatmapCode;
    injectCode(result); showToastV5(isFr ? "Scanner Ocular Injecté!" : "Heatmap Scanner Injected!");
  },

  haptic: function(isFr) {
    var code = getCode(); if (!code.trim()) { showToastV5(isFr?"Code vide":"No code"); return; }
    var hapticCode = '\n<!-- MICRO-INTERACTIONS UI -->\n<script>\n  setTimeout(function() {\n    var A=null;\n    function playPop(hz,type){\n      if(!A) A=new (window.AudioContext||window.webkitAudioContext)();\n      if(A.state==="suspended")A.resume();\n      var o=A.createOscillator(),g=A.createGain();o.type=type;o.frequency.setValueAtTime(hz,A.currentTime);o.frequency.exponentialRampToValueAtTime(hz/2,A.currentTime+0.1);g.gain.setValueAtTime(0.2,A.currentTime);g.gain.exponentialRampToValueAtTime(0.01,A.currentTime+0.1);o.connect(g);g.connect(A.destination);o.start();o.stop(A.currentTime+0.1);\n    }\n    document.querySelectorAll("button, a").forEach(function(el){\n      el.addEventListener("mouseenter", function(){ playPop(600,"sine"); if(navigator.vibrate)navigator.vibrate(10); el.style.transform="scale(1.02)"; el.style.transition="transform 0.1s"; });\n      el.addEventListener("mouseleave", function(){ el.style.transform=""; });\n      el.addEventListener("click", function(){ playPop(300,"square"); if(navigator.vibrate)navigator.vibrate([20,30,20]); el.style.transform="scale(0.95)"; setTimeout(()=>el.style.transform="",100); });\n    });\n  }, 500);\n<\/script>\n';
    var result = /<\/body>/i.test(code) ? code.replace(/<\/body>/i, hapticCode + '\n</body>') : code + '\n' + hapticCode;
    injectCode(result); showToastV5(isFr ? "Haptics UI Injecté!" : "Haptics & Audio Injected!");
  },

  darkmode: function(isFr) {
    var code = getCode(); if (!code.trim()) { showToastV5(isFr?"Code vide":"No code"); return; }
    var dmCode = '\n<!-- AUTO DARK-MODE INJECTOR -->\n<style>\nhtml.dm-active { filter: invert(1) hue-rotate(180deg); background: #fff; }\nhtml.dm-active img, html.dm-active video, html.dm-active iframe { filter: invert(1) hue-rotate(180deg); }\n#dm-btn { position:fixed; bottom:20px; right:20px; z-index:99999; background:#1e293b; color:#fff; border:none; border-radius:50px; padding:12px 20px; font-weight:800; cursor:pointer; box-shadow:0 10px 20px rgba(0,0,0,0.3); font-family:sans-serif; }\n</style>\n<script>\n  setTimeout(function() {\n    if(document.getElementById("dm-btn")) return;\n    var dbtn=document.createElement("button"); dbtn.id="dm-btn"; dbtn.innerHTML="🌓 Toggle Dark";\n    dbtn.onclick=function(){ document.documentElement.classList.toggle("dm-active"); };\n    document.body.appendChild(dbtn);\n  }, 500);\n<\/script>\n';
    var result = /<\/body>/i.test(code) ? code.replace(/<\/body>/i, dmCode + '\n</body>') : code + '\n' + dmCode;
    injectCode(result); showToastV5(isFr ? "Inversor Temă Injecté!" : "Dark Mode Injector Added!");
  },

  localdb: function(isFr) {
    var code = getCode(); if (!code.trim()) { showToastV5(isFr?"Code vide":"No code"); return; }
    var dbCode = '\n<!-- LOCAL-DB PERSISTENCE -->\n<script>\n  setTimeout(function(){\n    if(document.getElementById("ldb-badge")) return;\n    var dbtn = document.createElement("div"); dbtn.id="ldb-badge"; dbtn.style="position:fixed;bottom:20px;left:20px;background:#10b981;color:#fff;padding:8px 15px;border-radius:20px;font-size:11px;font-weight:800;z-index:99999;font-family:sans-serif;"; dbtn.innerHTML="🗃️ LocalSync API Active"; document.body.appendChild(dbtn);\n    document.querySelectorAll("input, textarea").forEach(function(i){\n      var id = i.id || i.name || "input_" + Math.random().toString(36).substr(2,5);\n      i.setAttribute("data-sync-id", id);\n      if(localStorage.getItem("db_" + id)) i.value = localStorage.getItem("db_" + id);\n      i.addEventListener("input", function(e) { localStorage.setItem("db_" + id, e.target.value); });\n    });\n  }, 500);\n<\/script>\n';
    var result = /<\/body>/i.test(code) ? code.replace(/<\/body>/i, dbCode + '\n</body>') : code + '\n' + dbCode;
    injectCode(result); showToastV5(isFr ? "Local DB Injecté!" : "Offline Storage Synced!");
  },

  i18n: function(isFr, tx) {
    var code = getCode(); if (!code.trim()) { showToastV5(tx.noCode); return; }
    var switcher = '<div id="lang-sw" style="position:fixed;top:14px;right:14px;z-index:9999;display:flex;gap:3px;background:rgba(0,0,0,.6);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:3px;font-family:Inter,sans-serif"><button onclick="setLng(\'en\')" id="btn-en" style="background:rgba(139,92,246,.3);border:none;color:#fff;padding:4px 10px;border-radius:5px;font-size:11px;font-weight:700;cursor:pointer">EN</button><button onclick="setLng(\'fr\')" id="btn-fr" style="background:transparent;border:none;color:#94a3b8;padding:4px 10px;border-radius:5px;font-size:11px;cursor:pointer">FR</button></div>';
    var i18nJs = '<script>function setLng(l){document.getElementById("btn-en").style.background=l==="en"?"rgba(139,92,246,.3)":"transparent";document.getElementById("btn-fr").style.background=l==="fr"?"rgba(139,92,246,.3)":"transparent";localStorage.setItem("app_lang",l);}window.addEventListener("load",function(){var s=localStorage.getItem("app_lang");if(s)setLng(s);});<\/script>';
    var result = code.replace('<body>', '<body>' + switcher).replace('</body>', i18nJs + '\n</body>');
    injectCode(result); showToastV5(tx.i18nOk);
  },
  perf: function(isFr, tx) {
    var code = getCode(); if (!code.trim()) { showToastV5(tx.noCode); return; }
    var perfJs = '<script>document.querySelectorAll("img").forEach(function(img){if(!img.loading)img.loading="lazy";});document.querySelectorAll("input").forEach(function(i){var orig=i.oninput;var t;i.oninput=function(){clearTimeout(t);t=setTimeout(function(){if(orig)orig();},300);};});<\/script>';
    var result = code.replace('</body>', perfJs + '\n</body>');
    injectCode(result); showToastV5(tx.perfOk);
  }
};

/* ══════════════════════════════════ COMPONENT LIBRARY ══ */
var COMPONENTS = [
  { name:'Glass Card', emoji:'🪟', code:'<div style="background:rgba(255,255,255,0.05);backdrop-filter:blur(15px);border:1px solid rgba(255,255,255,0.12);border-radius:16px;padding:24px;color:#e2e8f0;box-shadow:0 8px 32px rgba(0,0,0,0.3);max-width:320px;font-family:Inter,sans-serif"><h3 style="margin:0 0 8px;font-size:18px;color:#fff">Glass Card</h3><p style="margin:0;font-size:13px;opacity:0.7;line-height:1.6">Premium glassmorphism card with blur effect.</p></div>' },
  { name:'Gradient Button', emoji:'✨', code:'<button style="background:linear-gradient(135deg,#8b5cf6,#3b82f6);border:none;border-radius:12px;padding:12px 28px;color:#fff;font-weight:700;font-size:14px;cursor:pointer;box-shadow:0 8px 20px rgba(139,92,246,0.4);font-family:Inter,sans-serif">✨ Click Me</button>' },
  { name:'Dark Nav', emoji:'🔗', code:'<nav style="background:rgba(0,0,0,0.6);backdrop-filter:blur(15px);border-bottom:1px solid rgba(255,255,255,0.08);padding:12px 28px;display:flex;justify-content:space-between;align-items:center;font-family:Inter,sans-serif"><div style="font-weight:900;font-size:16px;background:linear-gradient(135deg,#8b5cf6,#3b82f6);-webkit-background-clip:text;-webkit-text-fill-color:transparent">⚡ Brand</div><button style="background:linear-gradient(135deg,#8b5cf6,#3b82f6);border:none;border-radius:8px;padding:8px 18px;color:#fff;font-weight:700;font-size:12px;cursor:pointer">Get Started</button></nav>' },
  { name:'Stats Grid', emoji:'📊', code:'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;font-family:Inter,sans-serif"><div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:16px;text-align:center"><div style="font-size:22px;font-weight:900;color:#fff">1,284</div><div style="font-size:10px;color:#64748b;margin:3px 0">USERS</div><div style="font-size:11px;color:#10b981">↑ 12%</div></div><div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:16px;text-align:center"><div style="font-size:22px;font-weight:900;color:#fff">€48k</div><div style="font-size:10px;color:#64748b;margin:3px 0">REVENUE</div><div style="font-size:11px;color:#3b82f6">↑ 23%</div></div><div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:16px;text-align:center"><div style="font-size:22px;font-weight:900;color:#fff">94%</div><div style="font-size:10px;color:#64748b;margin:3px 0">UPTIME</div><div style="font-size:11px;color:#8b5cf6">↑ 0.5%</div></div><div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:16px;text-align:center"><div style="font-size:22px;font-weight:900;color:#fff">2.4s</div><div style="font-size:10px;color:#64748b;margin:3px 0">LOAD</div><div style="font-size:11px;color:#ec4899">↓ 0.3s</div></div></div>' },
  { name:'Progress Bar', emoji:'📈', code:'<div style="font-family:Inter,sans-serif;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:20px;max-width:360px"><div style="margin-bottom:14px"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:5px"><span style="color:#e2e8f0;font-weight:700">JavaScript</span><span style="color:#f59e0b;font-weight:700">85%</span></div><div style="background:rgba(255,255,255,0.06);border-radius:50px;height:6px"><div style="width:85%;height:100%;border-radius:50px;background:#f59e0b"></div></div></div><div style="margin-bottom:14px"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:5px"><span style="color:#e2e8f0;font-weight:700">React</span><span style="color:#61dafb;font-weight:700">78%</span></div><div style="background:rgba(255,255,255,0.06);border-radius:50px;height:6px"><div style="width:78%;height:100%;border-radius:50px;background:#61dafb"></div></div></div></div>' },
  { name:'Alert Toast', emoji:'🔔', code:'<div style="display:flex;flex-direction:column;gap:8px;font-family:Inter,sans-serif;max-width:340px"><div style="background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.35);border-radius:10px;padding:12px 16px;display:flex;align-items:flex-start;gap:10px"><span>✅</span><div><div style="font-size:12px;font-weight:700;color:#10b981">Success</div><div style="font-size:11px;color:#94a3b8;margin-top:2px">Operation completed successfully!</div></div></div><div style="background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.35);border-radius:10px;padding:12px 16px;display:flex;align-items:flex-start;gap:10px"><span>⚠️</span><div><div style="font-size:12px;font-weight:700;color:#f59e0b">Warning</div><div style="font-size:11px;color:#94a3b8;margin-top:2px">Please check your input values.</div></div></div></div>' },
  { name:'Pricing Card', emoji:'💳', code:'<div style="background:linear-gradient(135deg,rgba(139,92,246,0.12),rgba(59,130,246,0.06));border:1px solid rgba(139,92,246,0.35);border-radius:20px;padding:28px;width:240px;font-family:Inter,sans-serif"><div style="font-size:10px;font-weight:900;color:#a78bfa;letter-spacing:1px;margin-bottom:10px">⭐ POPULAR</div><div style="font-size:15px;font-weight:700;color:#fff">Pro Plan</div><div style="font-size:36px;font-weight:900;color:#fff;margin:10px 0">$29<span style="font-size:13px;color:#64748b;font-weight:400">/mo</span></div><div style="font-size:12px;color:#94a3b8;margin-bottom:7px">✅ Unlimited projects</div><div style="font-size:12px;color:#94a3b8;margin-bottom:7px">✅ 100GB storage</div><div style="font-size:12px;color:#94a3b8;margin-bottom:14px">✅ Priority support</div><button style="width:100%;background:linear-gradient(135deg,#8b5cf6,#3b82f6);border:none;border-radius:10px;padding:11px;color:#fff;font-weight:900;cursor:pointer;font-size:13px">Get Started</button></div>' },
  { name:'Dark Form', emoji:'📝', code:'<form style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:24px;max-width:360px;font-family:Inter,sans-serif" onsubmit="event.preventDefault()"><div style="font-size:15px;font-weight:900;color:#fff;margin-bottom:20px">📝 Contact Us</div><div style="margin-bottom:12px"><div style="font-size:10px;color:#64748b;font-weight:700;margin-bottom:5px">NAME</div><input type="text" placeholder="Jean Dupont" style="width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:10px 14px;color:#fff;font-size:13px;outline:none"></div><div style="margin-bottom:16px"><div style="font-size:10px;color:#64748b;font-weight:700;margin-bottom:5px">EMAIL</div><input type="email" placeholder="jean@email.com" style="width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:10px 14px;color:#fff;font-size:13px;outline:none"></div><button type="submit" style="width:100%;background:linear-gradient(135deg,#8b5cf6,#3b82f6);border:none;border-radius:10px;padding:12px;color:#fff;font-weight:900;font-size:14px;cursor:pointer">✉️ Send</button></form>' },
];

/* ══════════════════════════════════ MULTI PAGE BUILDER ══ */
function buildMultiPage(prompt, isFr) {
  var t = function(e, f) { return isFr ? f : e; };
  var brand = (prompt || 'My').split(' ').slice(0, 2).map(function(w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join('') + 'Pro';
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>' + brand + '</title>' +
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">' +
    '<style>*{margin:0;padding:0;box-sizing:border-box;font-family:\'Inter\',sans-serif}body{background:#020617;color:#e2e8f0}.page{display:none;min-height:100vh}.page.active{display:block}nav{position:sticky;top:0;z-index:100;background:rgba(2,6,23,.9);backdrop-filter:blur(15px);border-bottom:1px solid rgba(255,255,255,.07);padding:14px 40px;display:flex;justify-content:space-between;align-items:center}.logo{font-weight:900;font-size:16px;background:linear-gradient(135deg,#8b5cf6,#3b82f6);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.nl{font-size:13px;color:#64748b;cursor:pointer;padding:6px 14px;border-radius:8px;transition:.15s;border:none;background:transparent}.nl:hover,.nl.on{background:rgba(139,92,246,.15);color:#a78bfa}.section{padding:80px 40px}.sec-h{font-size:38px;font-weight:900;color:#fff;margin-bottom:14px}.grad{background:linear-gradient(135deg,#8b5cf6,#3b82f6,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.cta{display:inline-block;background:linear-gradient(135deg,#8b5cf6,#3b82f6);border:none;border-radius:12px;padding:14px 32px;color:#fff;font-weight:900;font-size:14px;cursor:pointer;margin-top:24px}.feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px}.feat{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:28px}.feat-i{font-size:32px;margin-bottom:14px}.feat-t{font-size:15px;font-weight:700;color:#fff;margin-bottom:8px}.feat-d{font-size:12px;color:#64748b;line-height:1.7}.inp{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:10px 14px;color:#fff;font-size:13px;outline:none;width:100%;margin-bottom:14px}footer{background:rgba(0,0,0,.5);border-top:1px solid rgba(255,255,255,.06);padding:30px 40px;text-align:center;font-size:11px;color:#475569}</style></head><body>' +
    '<nav><div class="logo">⚡ ' + brand + '</div><div style="display:flex;gap:4px">' +
    '<button class="nl on" onclick="goPage(\'home\',this)">🏠 ' + t('Home','Accueil') + '</button>' +
    '<button class="nl" onclick="goPage(\'about\',this)">👤 ' + t('About','À propos') + '</button>' +
    '<button class="nl" onclick="goPage(\'services\',this)">⚙️ ' + t('Services','Services') + '</button>' +
    '<button class="nl" onclick="goPage(\'contact\',this)">📧 ' + t('Contact','Contact') + '</button>' +
    '</div><button class="cta" style="padding:8px 18px;font-size:12px;margin:0">' + t('Get Started','Commencer') + '</button></nav>' +
    '<div class="page active" id="page-home"><div class="section" style="text-align:center;background:radial-gradient(ellipse at center,rgba(139,92,246,.15) 0%,transparent 60%)"><div class="sec-h" style="font-size:48px">' + t('Build Something','Créez Quelque Chose') + '<br><span class="grad">' + prompt + '</span></div><div style="font-size:16px;color:#64748b;max-width:560px;margin:0 auto 24px;line-height:1.7">' + t('The most powerful platform to launch your vision.','La plateforme la plus puissante pour lancer votre vision.') + '</div><button class="cta">✨ ' + t('Start Free Trial','Commencer l\'Essai Gratuit') + '</button></div><div class="section"><div class="feat-grid"><div class="feat"><div class="feat-i">⚡</div><div class="feat-t">' + t('Lightning Fast','Ultra Rapide') + '</div><div class="feat-d">' + t('Optimized for performance.','Optimisé pour la performance.') + '</div></div><div class="feat"><div class="feat-i">🔐</div><div class="feat-t">' + t('Secure','Sécurisé') + '</div><div class="feat-d">' + t('Enterprise-grade security.','Sécurité de niveau enterprise.') + '</div></div><div class="feat"><div class="feat-i">🤖</div><div class="feat-t">' + t('AI Powered','Propulsé IA') + '</div><div class="feat-d">' + t('Built-in AI assistant.','Assistant IA intégré.') + '</div></div></div></div></div>' +
    '<div class="page" id="page-about"><div class="section"><div class="sec-h">' + t('About','À Propos') + ' <span class="grad">' + brand + '</span></div><div style="font-size:13px;color:#64748b;line-height:1.8;max-width:600px">' + t('We are a team of passionate builders.','Nous sommes une équipe de bâtisseurs passionnés.') + '</div></div></div>' +
    '<div class="page" id="page-services"><div class="section"><div class="sec-h">' + t('Our Services','Nos Services') + '</div><div class="feat-grid"><div class="feat"><div class="feat-i">🎨</div><div class="feat-t">' + t('Design','Design') + '</div><div class="feat-d">' + t('Premium UI components.','Composants UI premium.') + '</div></div><div class="feat"><div class="feat-i">📱</div><div class="feat-t">' + t('Mobile','Mobile') + '</div><div class="feat-d">' + t('Native-like mobile.','Mobile natif.') + '</div></div><div class="feat"><div class="feat-i">📊</div><div class="feat-t">' + t('Analytics','Analytics') + '</div><div class="feat-d">' + t('Deep insights.','Insights poussés.') + '</div></div></div></div></div>' +
    '<div class="page" id="page-contact"><div class="section" style="max-width:640px"><div class="sec-h">' + t('Get in Touch','Prenons Contact') + '</div><form style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:28px;margin-top:30px" onsubmit="event.preventDefault();this.querySelector(\'button\').textContent=\'✅ ' + t('Sent!','Envoyé!') + '\'"><input class="inp" placeholder="' + t('Your name','Votre nom') + '" required><input class="inp" type="email" placeholder="' + t('Email','Email') + '" required><textarea class="inp" rows="4" placeholder="' + t('Message','Message') + '" style="resize:none" required></textarea><button type="submit" style="width:100%;background:linear-gradient(135deg,#8b5cf6,#3b82f6);border:none;border-radius:10px;padding:12px;color:#fff;font-weight:900;font-size:14px;cursor:pointer">✉️ ' + t('Send Message','Envoyer') + '</button></form></div></div>' +
    '<footer>© 2025 ' + brand + ' · Made with ❤️ by IA ULTRA v5</footer>' +
    '<script>function goPage(id,btn){document.querySelectorAll(".page").forEach(function(p){p.classList.remove("active");});document.querySelectorAll(".nl").forEach(function(b){b.classList.remove("on");});document.getElementById("page-"+id).classList.add("active");btn.classList.add("on");window.scrollTo(0,0);}<\/script></body></html>';
}

/* ══════════════════════════════════ CODE BENCHMARK ══ */
function analyzeBenchmark(code, isFr) {
  var lines = code.split('\n').length;
  var kb = (new Blob([code]).size / 1024).toFixed(1);

  var perfScore = 100;
  perfScore -= ((code.match(/<script(?![^>]*src)/gi)||[]).length) * 5;
  perfScore -= ((code.match(/<img(?![^>]*loading)/gi)||[]).length) * 3;
  perfScore -= ((code.match(/<script[^>]*src(?![^>]*(async|defer))/gi)||[]).length) * 8;
  perfScore = Math.max(10, Math.min(100, perfScore));

  var seoScore = 0;
  if (/<title>[^<]+<\/title>/i.test(code)) seoScore += 25;
  if (/<meta[^>]+name\s*=\s*["']description/i.test(code)) seoScore += 20;
  if (/<h1[^>]*>/i.test(code)) seoScore += 25;
  if (/<meta[^>]+viewport/i.test(code)) seoScore += 20;
  if (/alt\s*=/i.test(code)) seoScore += 10;

  var a11yScore = 0;
  if (/aria-/i.test(code)) a11yScore += 30;
  if (/<label[^>]*for=/i.test(code)) a11yScore += 25;
  if (/role=/i.test(code)) a11yScore += 25;
  if (/tabindex/i.test(code)) a11yScore += 20;

  var secScore = 100;
  if (/eval\s*\(/i.test(code)) secScore -= 40;
  if (/javascript\s*:/i.test(code)) secScore -= 30;
  if (/document\.write\s*\(/i.test(code)) secScore -= 20;
  if (/innerHTML\s*=/i.test(code)) secScore -= 10;
  secScore = Math.max(0, secScore);

  var kb_num = parseFloat(kb);
  var sizeScore = kb_num > 100 ? 30 : kb_num > 50 ? 55 : kb_num > 20 ? 75 : kb_num > 10 ? 88 : 100;

  var metrics = [
    { score: perfScore,  label: isFr ? 'Performance'  : 'Performance',  icon: '⚡', color: perfScore  >= 70 ? '#10b981' : perfScore  >= 40 ? '#f59e0b' : '#ef4444' },
    { score: seoScore,   label: 'SEO',                                   icon: '🔍', color: seoScore   >= 70 ? '#10b981' : seoScore   >= 40 ? '#f59e0b' : '#ef4444' },
    { score: a11yScore,  label: isFr ? 'Accessibilité' : 'Accessibility', icon: '♿', color: a11yScore  >= 70 ? '#10b981' : a11yScore  >= 40 ? '#f59e0b' : '#ef4444' },
    { score: secScore,   label: isFr ? 'Sécurité'      : 'Security',      icon: '🔐', color: secScore   >= 70 ? '#10b981' : secScore   >= 40 ? '#f59e0b' : '#ef4444' },
    { score: sizeScore,  label: isFr ? 'Légèreté'      : 'Weight',        icon: '📦', color: sizeScore  >= 70 ? '#10b981' : sizeScore  >= 40 ? '#f59e0b' : '#ef4444' }
  ];
  var global = Math.round((perfScore + seoScore + a11yScore + secScore + sizeScore) / 5);
  return { metrics: metrics, global: global, lines: lines, kb: kb };
}

function buildBenchmarkModal(container, isFr) {
  var noCodeMsg = isFr ? '⚠️ Aucun code dans l\'éditeur.' : '⚠️ No code in editor.';
  var modal = document.createElement('div');
  modal.id = 'v5-benchmark-modal';
  modal.style = 'position:absolute;inset:0;z-index:800;background:rgba(3,5,9,.97);backdrop-filter:blur(20px);display:none;flex-direction:column;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:16px 20px 12px;border-bottom:1px solid rgba(6,182,212,.2);display:flex;justify-content:space-between;align-items:center;flex-shrink:0;';
  hdr.innerHTML = '<div><div style="font-size:14px;font-weight:900;color:#06b6d4">⏱️ Code Benchmark</div><div style="font-size:10px;color:#64748b;margin-top:2px">' + (isFr ? 'Analyse qualité · 5 métriques professionnelles' : 'Quality analysis · 5 professional metrics') + '</div></div><button id="v5-bench-close" style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:#fff;border-radius:8px;padding:5px 14px;cursor:pointer;font-size:12px;">✕ ' + (isFr ? 'Fermer' : 'Close') + '</button>';
  modal.appendChild(hdr);

  var body = document.createElement('div');
  body.id = 'v5-bench-body';
  body.style = 'flex:1;overflow-y:auto;padding:20px;';
  body.innerHTML = '<div style="text-align:center;padding:50px 20px;color:#475569;"><div style="font-size:48px;margin-bottom:14px">⏱️</div><div style="font-size:12px;font-weight:700;color:#64748b;">' + (isFr ? 'Lancez l\'analyse pour voir les résultats.' : 'Run the analysis to see results.') + '</div></div>';
  modal.appendChild(body);

  var footer = document.createElement('div');
  footer.style = 'padding:14px 20px;border-top:1px solid rgba(255,255,255,.06);flex-shrink:0;';
  footer.innerHTML = '<button id="v5-bench-run" style="width:100%;background:linear-gradient(135deg,#06b6d4,#3b82f6);border:none;border-radius:10px;padding:12px;color:#fff;font-weight:900;font-size:13px;cursor:pointer;">⚡ ' + (isFr ? 'Lancer l\'Analyse' : 'Run Analysis') + '</button>';
  modal.appendChild(footer);

  hdr.querySelector('#v5-bench-close').onclick = function() { modal.style.display = 'none'; };

  setTimeout(function() {
    var runBtn = modal.querySelector('#v5-bench-run');
    if (!runBtn) return;
    runBtn.onclick = function() {
      var code = getCode();
      if (!code.trim()) { showToastV5(noCodeMsg); return; }
      runBtn.textContent = isFr ? '⏳ Analyse en cours...' : '⏳ Analyzing...';
      runBtn.disabled = true;
      setTimeout(function() {
        var r = analyzeBenchmark(code, isFr);
        var gc = r.global >= 70 ? '#10b981' : r.global >= 40 ? '#f59e0b' : '#ef4444';
        var gl = r.global >= 70 ? (isFr ? 'Excellent' : 'Excellent') : r.global >= 40 ? (isFr ? 'Correct' : 'Fair') : (isFr ? 'À améliorer' : 'Needs work');
        var html = '<div style="text-align:center;margin-bottom:22px;">';
        html += '<div style="display:inline-flex;align-items:center;justify-content:center;width:96px;height:96px;border-radius:50%;border:4px solid ' + gc + ';box-shadow:0 0 25px ' + gc + '44;margin-bottom:12px;">';
        html += '<div><div style="font-size:30px;font-weight:900;color:' + gc + ';">' + r.global + '</div><div style="font-size:9px;color:#64748b;font-weight:700;">/100</div></div></div>';
        html += '<div style="font-size:14px;font-weight:900;color:' + gc + ';">' + gl + '</div>';
        html += '<div style="font-size:10px;color:#475569;margin-top:5px;">' + r.lines + (isFr ? ' lignes · ' : ' lines · ') + r.kb + ' KB</div></div>';
        r.metrics.forEach(function(m) {
          html += '<div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:12px;margin-bottom:8px;">';
          html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:7px;">';
          html += '<div style="font-size:12px;font-weight:700;color:#e2e8f0;">' + m.icon + ' ' + m.label + '</div>';
          html += '<div style="font-size:13px;font-weight:900;color:' + m.color + ';">' + m.score + '/100</div></div>';
          html += '<div style="background:rgba(255,255,255,.07);border-radius:50px;height:6px;overflow:hidden;">';
          html += '<div style="width:' + m.score + '%;height:100%;border-radius:50px;background:' + m.color + ';transition:width 1.2s ease;"></div></div></div>';
        });
        html += '<div style="margin-top:16px;background:rgba(6,182,212,.06);border:1px solid rgba(6,182,212,.2);border-radius:10px;padding:13px;">';
        html += '<div style="font-size:10px;font-weight:900;color:#06b6d4;margin-bottom:8px;letter-spacing:1px;">💡 ' + (isFr ? 'CONSEILS' : 'TIPS') + '</div>';
        if (r.metrics[1].score < 60) html += '<div style="font-size:10px;color:#94a3b8;margin-bottom:4px;">• ' + (isFr ? 'Ajoutez une meta description pour le SEO' : 'Add a meta description for SEO') + '</div>';
        if (r.metrics[2].score < 60) html += '<div style="font-size:10px;color:#94a3b8;margin-bottom:4px;">• ' + (isFr ? 'Ajoutez des attributs aria- pour l\'accessibilité' : 'Add aria- attributes for accessibility') + '</div>';
        if (r.metrics[3].score < 80) html += '<div style="font-size:10px;color:#94a3b8;margin-bottom:4px;">• ' + (isFr ? 'Évitez eval() et document.write()' : 'Avoid eval() and document.write()') + '</div>';
        if (r.metrics[0].score < 70) html += '<div style="font-size:10px;color:#94a3b8;margin-bottom:4px;">• ' + (isFr ? 'Utilisez loading="lazy" sur les images' : 'Use loading="lazy" on images') + '</div>';
        html += '</div>';
        body.innerHTML = html;
        runBtn.textContent = isFr ? '🔄 Re-analyser' : '🔄 Re-analyze';
        runBtn.disabled = false;
      }, 1200);
    };
  }, 60);
  return modal;
}

/* ══════════════════════════════════ CODE CINEMATICS ══ */
function buildCinematicsModal(container, isFr) {
  var noCodeMsg = isFr ? '⚠️ Aucun code dans l\'éditeur.' : '⚠️ No code in editor.';
  var PACKS = [
    { id:'fluid',    icon:'🌊', color:'#06b6d4', name:'Fluid Entrance',  desc:isFr?'Éléments flottent depuis le bas':'Elements float from the bottom',   css:'@keyframes fluidIn{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}}body>*,section,article,main>div{animation:fluidIn 0.7s ease forwards;}' },
    { id:'pulse',    icon:'⚡', color:'#8b5cf6', name:'Power Pulse',     desc:isFr?'Pulsation néon sur les boutons':'Neon pulsation on buttons',          css:'@keyframes neonPulse{0%,100%{box-shadow:0 0 5px currentColor}50%{box-shadow:0 0 20px currentColor,0 0 40px currentColor}}button,.btn{animation:neonPulse 2s ease infinite;}' },
    { id:'vortex',   icon:'🌀', color:'#a78bfa', name:'Vortex Spin',     desc:isFr?'Rotation 3D pour les cards':'3D rotation on cards',                  css:'@keyframes vortexIn{from{transform:rotateY(-90deg) scale(0.5);opacity:0}to{transform:rotateY(0) scale(1);opacity:1}}.card,.panel,.box{animation:vortexIn 0.8s cubic-bezier(.175,.885,.32,1.275) forwards;}' },
    { id:'crystal',  icon:'💎', color:'#e879f9', name:'Crystal Reveal',  desc:isFr?'Apparition glassmorphism':'Glassmorphism appearance',                 css:'@keyframes crystalReveal{from{opacity:0;transform:scale(0.88)}to{opacity:1;transform:scale(1)}}nav,header,.card,section{animation:crystalReveal 0.6s ease forwards;}' },
    { id:'rocket',   icon:'🚀', color:'#f59e0b', name:'Rocket Launch',   desc:isFr?'Cards s\'envolent à l\'apparition':'Cards fly in on load',              css:'@keyframes rocketLaunch{from{transform:translateY(60px) scale(0.8);opacity:0}to{transform:none;opacity:1}}.card,.item,.block{animation:rocketLaunch 0.5s cubic-bezier(.175,.885,.32,1.275) both;}' },
    { id:'dramatic', icon:'🎭', color:'#10b981', name:'Dramatic Fade',   desc:isFr?'Fondu cinématique profond':'Deep cinematic fade-in',                  css:'@keyframes dramaticFade{from{opacity:0;filter:blur(10px)}to{opacity:1;filter:none}}body>*{animation:dramaticFade 1.2s ease forwards;}' },
    { id:'matrix',   icon:'🔮', color:'#34d399', name:'Matrix Rain',     desc:isFr?'Pluie de code en arrière-plan':'Code rain background effect',         css:'@keyframes matrixDrop{from{transform:translateY(-100vh);opacity:0.8}to{transform:translateY(100vh);opacity:0}}body::before{content:"01001010";position:fixed;top:0;left:8%;font:bold 12px monospace;color:rgba(16,185,129,0.12);animation:matrixDrop 4s linear infinite;z-index:0;pointer-events:none;}body::after{content:"11010110";position:fixed;top:0;left:65%;font:bold 12px monospace;color:rgba(59,130,246,0.1);animation:matrixDrop 5s linear 2s infinite;z-index:0;pointer-events:none;}' },
    { id:'aurora',   icon:'🌈', color:'#ec4899', name:'Aurora Flow',     desc:isFr?'Gradient animé en continu':'Continuously animated gradient',          css:'@keyframes auroraShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}body{background-size:400% 400%!important;animation:auroraShift 8s ease infinite!important;}' },
    { id:'sprint',   icon:'🏃', color:'#3b82f6', name:'Sprint Mode',     desc:isFr?'Transitions ultra-rapides 150ms':'Ultra-fast 150ms transitions',      css:'*{transition:all 0.15s cubic-bezier(0.4,0,0.2,1)!important;}@keyframes sprintIn{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:none}}[class]{animation:sprintIn 0.15s ease;}' },
    { id:'freeze',   icon:'🧊', color:'#a5f3fc', name:'Freeze Frame',    desc:isFr?'Dégel cinématique au chargement':'Cinematic unfreeze on load',       css:'@keyframes freezeIn{0%{filter:hue-rotate(180deg) saturate(0) brightness(2.5)}100%{filter:none}}body{animation:freezeIn 2.5s ease forwards;}' },
    { id:'stardust', icon:'💫', color:'#fbbf24', name:'Stardust',        desc:isFr?'Particules flottantes autour des boutons':'Star particles around buttons', css:'@keyframes starFloat{0%,100%{transform:translateY(0) rotate(0deg);opacity:0.9}50%{transform:translateY(-15px) rotate(180deg);opacity:1}}button{position:relative;overflow:visible!important;}button::after{content:"✦";position:absolute;top:-6px;right:-6px;font-size:11px;color:#fbbf24;animation:starFloat 2.5s ease infinite;pointer-events:none;}' },
    { id:'circus',   icon:'🎪', color:'#f97316', name:'Circus Pop',      desc:isFr?'Animations exubérantes et colorées':'Exuberant colorful pop animations',  css:'@keyframes circusPop{0%{transform:scale(0) rotate(-12deg)}70%{transform:scale(1.12) rotate(4deg)}100%{transform:scale(1) rotate(0deg)}}.card,.btn,button{animation:circusPop 0.5s cubic-bezier(.175,.885,.32,1.275) forwards;}' }
  ];

  var modal = document.createElement('div');
  modal.id = 'v5-cinema-modal';
  modal.style = 'position:absolute;inset:0;z-index:800;background:rgba(3,5,9,.97);backdrop-filter:blur(20px);display:none;flex-direction:column;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:16px 20px 12px;border-bottom:1px solid rgba(236,72,153,.2);display:flex;justify-content:space-between;align-items:center;flex-shrink:0;';
  hdr.innerHTML = '<div><div style="font-size:14px;font-weight:900;color:#ec4899">🎬 Code Cinematics</div><div style="font-size:10px;color:#64748b;margin-top:2px">' + (isFr ? '12 packs d\'animation premium · Injection 1 clic' : '12 premium animation packs · 1-Click inject') + '</div></div><button id="v5-cinema-close" style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:#fff;border-radius:8px;padding:5px 14px;cursor:pointer;font-size:12px;">✕ ' + (isFr ? 'Fermer' : 'Close') + '</button>';
  modal.appendChild(hdr);

  var grid = document.createElement('div');
  grid.style = 'flex:1;overflow-y:auto;padding:12px 14px;display:grid;grid-template-columns:1fr 1fr;gap:8px;align-content:start;';

  PACKS.forEach(function(pack) {
    var card = document.createElement('div');
    card.style = 'background:rgba(255,255,255,.03);border:1px solid ' + pack.color + '28;border-radius:10px;padding:12px;transition:.2s;';
    card.innerHTML = '<div style="font-size:24px;margin-bottom:6px">' + pack.icon + '</div>' +
      '<div style="font-size:11px;font-weight:700;color:#fff;margin-bottom:3px">' + pack.name + '</div>' +
      '<div style="font-size:9px;color:#64748b;line-height:1.4;margin-bottom:9px">' + pack.desc + '</div>' +
      '<button style="width:100%;background:' + pack.color + '22;border:1px solid ' + pack.color + '44;color:' + pack.color + ';border-radius:6px;padding:5px;font-weight:700;font-size:10px;cursor:pointer;">🎬 ' + (isFr ? 'Injecter' : 'Inject') + '</button>';
    card.onmouseover = function() { card.style.borderColor = pack.color + '66'; card.style.transform = 'translateY(-2px)'; };
    card.onmouseout  = function() { card.style.borderColor = pack.color + '28'; card.style.transform = ''; };
    (function(p) {
      card.querySelector('button').onclick = function(e) {
        e.stopPropagation();
        var code = getCode();
        if (!code.trim()) { showToastV5(noCodeMsg); return; }
        var result = insertBeforeClose(code, 'head', '<style>' + p.css + '</style>');
        injectCode(result);
        modal.style.display = 'none';
        showToastV5('🎬 ' + p.name + (isFr ? ' injecté !' : ' injected!'));
      };
    })(pack);
    grid.appendChild(card);
  });
  modal.appendChild(grid);
  hdr.querySelector('#v5-cinema-close').onclick = function() { modal.style.display = 'none'; };
  return modal;
}

/* ══════════════════════════════════ DNA REMIX ENGINE ══ */
function buildDNAModal(container, isFr) {
  var noCodeMsg = isFr ? '⚠️ Aucun code dans l\'éditeur.' : '⚠️ No code in editor.';
  var VARIANTS = [
    { id:'minimal', icon:'🎯', color:'#3b82f6', name: isFr ? 'Variant Minimal'  : 'Minimal Variant',
      desc: isFr ? 'Design épuré, espaces aérés, typographie pure' : 'Clean design, airy spacing, pure typography',
      css: 'body{background:#f8fafc!important;color:#0f172a!important;font-family:\'Inter\',sans-serif!important;}button,.btn{background:#3b82f6!important;color:#fff!important;border:none!important;border-radius:6px!important;}nav,header,.card{background:#fff!important;border:1px solid #e2e8f0!important;box-shadow:0 2px 8px rgba(0,0,0,.06)!important;border-radius:8px!important;}h1,h2,h3{color:#1e293b!important;}*{border-radius:6px;}' },
    { id:'bold',    icon:'🔥', color:'#ef4444', name: isFr ? 'Variant Bold'     : 'Bold Variant',
      desc: isFr ? 'Couleurs vibrantes, contraste fort, impact maximal' : 'Vibrant colors, high contrast, max impact',
      css: 'body{background:#0a0a0a!important;}button,.btn{background:linear-gradient(135deg,#ef4444,#f97316)!important;color:#fff!important;font-weight:900!important;text-transform:uppercase!important;letter-spacing:2px!important;border:none!important;border-radius:0!important;}h1{font-size:clamp(2rem,5vw,3.5rem)!important;font-weight:900!important;background:linear-gradient(135deg,#ef4444,#f97316);-webkit-background-clip:text;-webkit-text-fill-color:transparent!important;}nav,header,.card{background:#111!important;border:2px solid #ef4444!important;border-radius:0!important;}' },
    { id:'fluid',   icon:'🌊', color:'#8b5cf6', name: isFr ? 'Variant Fluid'    : 'Fluid Variant',
      desc: isFr ? 'Glassmorphism, gradients fluides, ultra-moderne' : 'Glassmorphism, fluid gradients, ultra-modern',
      css: 'body{background:linear-gradient(135deg,#0f0c29,#302b63,#24243e)!important;background-attachment:fixed!important;}button,.btn{background:linear-gradient(135deg,#8b5cf6,#ec4899)!important;border:none!important;border-radius:50px!important;box-shadow:0 10px 30px rgba(139,92,246,.4)!important;color:#fff!important;}nav,header,.card{background:rgba(255,255,255,.06)!important;backdrop-filter:blur(20px)!important;border:1px solid rgba(255,255,255,.12)!important;border-radius:20px!important;}h1,h2{background:linear-gradient(135deg,#8b5cf6,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent!important;}' }
  ];

  var modal = document.createElement('div');
  modal.id = 'v5-dna-modal';
  modal.style = 'position:absolute;inset:0;z-index:800;background:rgba(3,5,9,.97);backdrop-filter:blur(20px);display:none;flex-direction:column;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:16px 20px 12px;border-bottom:1px solid rgba(16,185,129,.2);display:flex;justify-content:space-between;align-items:center;flex-shrink:0;';
  hdr.innerHTML = '<div><div style="font-size:14px;font-weight:900;color:#10b981">🧬 DNA Remix Engine</div><div style="font-size:10px;color:#64748b;margin-top:2px">' + (isFr ? 'Remixez votre code en 3 variantes visuelles uniques' : 'Remix your code into 3 unique visual variants') + '</div></div><button id="v5-dna-close" style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:#fff;border-radius:8px;padding:5px 14px;cursor:pointer;font-size:12px;">✕ ' + (isFr ? 'Fermer' : 'Close') + '</button>';
  modal.appendChild(hdr);

  var body = document.createElement('div');
  body.id = 'v5-dna-body';
  body.style = 'flex:1;overflow-y:auto;padding:16px;';
  body.innerHTML = '<div style="text-align:center;padding:40px 20px;color:#475569;"><div style="font-size:44px;margin-bottom:12px">🧬</div><div style="font-size:12px;font-weight:700;color:#64748b;">' + (isFr ? 'Analysez votre code pour générer 3 variantes ADN.' : 'Analyze your code to generate 3 DNA variants.') + '</div></div>';
  modal.appendChild(body);

  var footer = document.createElement('div');
  footer.style = 'padding:14px 20px;border-top:1px solid rgba(255,255,255,.06);flex-shrink:0;';
  footer.innerHTML = '<button id="v5-dna-run" style="width:100%;background:linear-gradient(135deg,#10b981,#06b6d4);border:none;border-radius:10px;padding:12px;color:#fff;font-weight:900;font-size:13px;cursor:pointer;">🧬 ' + (isFr ? 'Analyser & Remixer' : 'Analyze & Remix') + '</button>';
  modal.appendChild(footer);

  hdr.querySelector('#v5-dna-close').onclick = function() { modal.style.display = 'none'; };

  setTimeout(function() {
    var runBtn = modal.querySelector('#v5-dna-run');
    if (!runBtn) return;
    runBtn.onclick = function() {
      var code = getCode();
      if (!code.trim()) { showToastV5(noCodeMsg); return; }
      runBtn.textContent = isFr ? '⏳ Analyse ADN...' : '⏳ DNA Analysis...';
      runBtn.disabled = true;
      setTimeout(function() {
        var bodyEl = modal.querySelector('#v5-dna-body');
        var html = '<div style="font-size:10px;font-weight:700;color:#10b981;margin-bottom:14px;letter-spacing:1px;">🧬 ' + (isFr ? '3 VARIANTES ADN GÉNÉRÉES' : '3 DNA VARIANTS GENERATED') + '</div>';
        VARIANTS.forEach(function(v) {
          html += '<div style="background:rgba(255,255,255,.03);border:1px solid ' + v.color + '28;border-radius:12px;padding:14px;margin-bottom:10px;">';
          html += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;"><div style="font-size:26px;">' + v.icon + '</div><div><div style="font-size:12px;font-weight:700;color:#fff;">' + v.name + '</div><div style="font-size:10px;color:#64748b;">' + v.desc + '</div></div></div>';
          html += '<button data-dna="' + v.id + '" style="width:100%;background:' + v.color + '18;border:1px solid ' + v.color + '44;color:' + v.color + ';border-radius:8px;padding:8px;font-weight:900;font-size:11px;cursor:pointer;">⚡ ' + (isFr ? 'Appliquer cette Variante' : 'Apply this Variant') + '</button></div>';
        });
        bodyEl.innerHTML = html;
        VARIANTS.forEach(function(v) {
          var btn = bodyEl.querySelector('[data-dna="' + v.id + '"]');
          if (!btn) return;
          (function(variant) {
            btn.onclick = function() {
              var mutated = insertBeforeClose(code, 'head', '<style>' + variant.css + '</style>');
              injectCode(mutated);
              modal.style.display = 'none';
              showToastV5('🧬 ' + variant.name + (isFr ? ' appliquée !' : ' applied!'));
            };
          })(v);
        });
        runBtn.textContent = isFr ? '🔄 Re-analyser' : '🔄 Re-analyze';
        runBtn.disabled = false;
      }, 1500);
    };
  }, 60);
  return modal;
}

/* ══════════════════════════════════ PERSONA BUILDER ══ */
function buildPersonaModal(container, isFr) {
  var PERSONAS = [
    { icon:'👔', color:'#3b82f6', name: isFr?'CEO / Startup':'CEO / Startup',
      desc: isFr?'Dashboard épuré, KPIs, dark corporate':'Clean dashboard, KPIs, corporate dark',
      prompt: isFr?'dashboard admin SaaS premium avec KPIs animés, graphiques revenus canvas, tableau utilisateurs et statistiques temps réel, design dark corporate ultra-professionnel glassmorphism':'premium SaaS admin dashboard with animated KPIs, canvas revenue charts, user management table and real-time statistics, ultra-professional dark corporate glassmorphism design' },
    { icon:'🎮', color:'#8b5cf6', name: 'Gamer / Esport',
      desc: isFr?'UI néon, animations agressives, cyberpunk':'Neon UI, aggressive animations, cyberpunk',
      prompt: isFr?'interface gaming esport avec tableau de classement des joueurs, statistiques de jeu en temps réel, effets néon animés et design cyberpunk sombre futuriste':'gaming esport interface with player leaderboard, real-time game statistics, animated neon effects and dark futuristic cyberpunk design' },
    { icon:'🏥', color:'#10b981', name: isFr?'Médecin':'Doctor',
      desc: isFr?'Interface médicale propre, verts, minimal':'Clean medical interface, greens, minimal',
      prompt: isFr?'dashboard médical professionnel avec liste de patients, statuts de santé colorés, agenda des rendez-vous et graphiques de suivi vital, design épuré vert et blanc':'professional medical dashboard with patient list, color-coded health statuses, appointment schedule and vital tracking charts, clean green and white design' },
    { icon:'🎨', color:'#ec4899', name: isFr?'Créatif / Artiste':'Creative / Artist',
      desc: isFr?'Portfolio aurora, typographie expressive':'Aurora portfolio, expressive typography',
      prompt: isFr?'portfolio créatif ultra-esthétique avec galerie de projets en grille masonry, hero animé avec gradient fluide, section biographie et formulaire de contact, design artistique avant-garde aurora':'ultra-aesthetic creative portfolio with masonry grid project gallery, fluid gradient animated hero, biography section and contact form, avant-garde aurora artistic design' },
    { icon:'🛒', color:'#f59e0b', name: isFr?'E-commerçant':'Merchant',
      desc: isFr?'Shop premium, CTA forts, conversions':'Premium shop, strong CTAs, conversions',
      prompt: isFr?'boutique e-commerce premium avec grille de produits, filtres par catégorie, panier interactif avec total animé, badges promotionnels et page de checkout élégante':'premium e-commerce store with product grid, category filters, interactive cart with animated total, promotional badges and elegant checkout page' },
    { icon:'👨‍🎓', color:'#6366f1', name: isFr?'Étudiant':'Student',
      desc: isFr?'Plateforme éducative, clair, organisé':'Educational platform, bright, organized',
      prompt: isFr?'plateforme e-learning avec liste de cours et barres de progression, calendrier d\'études mensuel, tracker d\'habitudes quotidiennes et section de notes rapides, design clair et motivant':'e-learning platform with course list and progress bars, monthly study calendar, daily habit tracker and quick notes section, bright and motivating design' }
  ];

  var modal = document.createElement('div');
  modal.id = 'v5-persona-modal';
  modal.style = 'position:absolute;inset:0;z-index:800;background:rgba(3,5,9,.97);backdrop-filter:blur(20px);display:none;flex-direction:column;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:16px 20px 12px;border-bottom:1px solid rgba(251,191,36,.2);display:flex;justify-content:space-between;align-items:center;flex-shrink:0;';
  hdr.innerHTML = '<div><div style="font-size:14px;font-weight:900;color:#fbbf24">🎭 Persona Builder</div><div style="font-size:10px;color:#64748b;margin-top:2px">' + (isFr ? 'Générez des apps adaptées à un profil utilisateur cible' : 'Generate apps tailored to a specific user persona') + '</div></div><button id="v5-persona-close" style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:#fff;border-radius:8px;padding:5px 14px;cursor:pointer;font-size:12px;">✕ ' + (isFr ? 'Fermer' : 'Close') + '</button>';
  modal.appendChild(hdr);

  var grid = document.createElement('div');
  grid.style = 'flex:1;overflow-y:auto;padding:12px 14px;display:grid;grid-template-columns:1fr 1fr;gap:8px;align-content:start;';

  PERSONAS.forEach(function(p) {
    var card = document.createElement('div');
    card.style = 'background:rgba(255,255,255,.03);border:1px solid ' + p.color + '28;border-radius:12px;padding:14px;transition:.2s;';
    card.innerHTML = '<div style="font-size:28px;margin-bottom:8px">' + p.icon + '</div>' +
      '<div style="font-size:12px;font-weight:700;color:#fff;margin-bottom:4px">' + p.name + '</div>' +
      '<div style="font-size:9px;color:#64748b;line-height:1.4;margin-bottom:10px">' + p.desc + '</div>' +
      '<button style="width:100%;background:linear-gradient(135deg,' + p.color + ',' + p.color + 'cc);border:none;border-radius:7px;padding:7px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;">🚀 ' + (isFr ? 'Générer' : 'Generate') + '</button>';
    card.onmouseover = function() { card.style.borderColor = p.color + '55'; card.style.transform = 'translateY(-2px)'; };
    card.onmouseout  = function() { card.style.borderColor = p.color + '28'; card.style.transform = ''; };
    (function(persona) {
      card.querySelector('button').onclick = function(e) {
        e.stopPropagation();
        var ultraInput = document.getElementById('ultra-input');
        if (ultraInput) {
          ultraInput.value = persona.prompt;
          ultraInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
          modal.style.display = 'none';
          showToastV5('🎭 ' + persona.name + (isFr ? ' — Génération lancée !' : ' — Generation started!'));
        } else {
          showToastV5('🎭 ' + persona.name + (isFr ? ' : collez ce prompt dans IA ULTRA' : ' : paste this prompt in IA ULTRA'));
          modal.style.display = 'none';
        }
      };
    })(p);
    grid.appendChild(card);
  });
  modal.appendChild(grid);
  hdr.querySelector('#v5-persona-close').onclick = function() { modal.style.display = 'none'; };
  return modal;
}

/* ══════════════════════════════════ PAGE ARCHITECT ══ */
function buildPageArchitectModal(container, isFr) {
  var BLOCKS = [
    { id:'nav',   icon:'🔗', color:'#8b5cf6', name: isFr?'Navigation Bar':'Navigation Bar', desc: isFr?'Barre nav sticky glassmorphism':'Sticky glassmorphism nav',
      build: function(f) { return '<nav style="position:sticky;top:0;z-index:100;background:rgba(2,6,23,.85);backdrop-filter:blur(15px);border-bottom:1px solid rgba(255,255,255,.07);padding:14px 40px;display:flex;justify-content:space-between;align-items:center;font-family:Inter,sans-serif"><div style="font-size:16px;font-weight:900;background:linear-gradient(135deg,#8b5cf6,#3b82f6);-webkit-background-clip:text;-webkit-text-fill-color:transparent">⚡ Brand</div><div style="display:flex;gap:20px"><span style="font-size:13px;color:#94a3b8;cursor:pointer">' + (f?'Accueil':'Home') + '</span><span style="font-size:13px;color:#94a3b8;cursor:pointer">' + (f?'À propos':'About') + '</span><span style="font-size:13px;color:#94a3b8;cursor:pointer">' + (f?'Services':'Services') + '</span></div><button style="background:linear-gradient(135deg,#8b5cf6,#3b82f6);border:none;border-radius:8px;padding:8px 18px;color:#fff;font-weight:700;font-size:12px;cursor:pointer">' + (f?'Commencer':'Get Started') + '</button></nav>'; } },
    { id:'hero',  icon:'🦸', color:'#6366f1', name: isFr?'Hero Section':'Hero Section',  desc: isFr?'Grande bannière + CTA':'Big banner + CTA',
      build: function(f) { return '<section style="min-height:80vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:80px 40px;background:radial-gradient(ellipse at center,rgba(139,92,246,.15) 0%,transparent 60%);font-family:Inter,sans-serif"><div style="display:inline-block;background:rgba(139,92,246,.15);border:1px solid rgba(139,92,246,.3);border-radius:50px;padding:6px 18px;font-size:11px;color:#a78bfa;font-weight:700;letter-spacing:1px;margin-bottom:24px">🚀 ' + (f?'Beta Publique':'Public Beta') + '</div><h1 style="font-size:52px;font-weight:900;line-height:1.1;margin-bottom:16px;color:#fff">' + (f?'Construisez Quelque':'Build Something') + '<br><span style="background:linear-gradient(135deg,#8b5cf6,#3b82f6,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent">' + (f?'Chose d\'Unique':'Truly Unique') + '</span></h1><p style="font-size:16px;color:#64748b;max-width:540px;margin:0 auto 34px;line-height:1.7">' + (f?'La plateforme tout-en-un pour lancer votre vision.':'The all-in-one platform to launch your vision.') + '</p><button style="background:linear-gradient(135deg,#8b5cf6,#3b82f6);border:none;border-radius:12px;padding:14px 36px;color:#fff;font-weight:900;font-size:14px;cursor:pointer;box-shadow:0 10px 30px rgba(139,92,246,.4)">✨ ' + (f?'Commencer':'Start Free') + '</button></section>'; } },
    { id:'feat',  icon:'⚡', color:'#3b82f6', name: isFr?'Features Grid':'Features Grid',   desc: isFr?'3 colonnes fonctionnalités':'3-column features',
      build: function(f) { var feats=[['⚡',f?'Ultra Rapide':'Ultra Fast',f?'Performances optimisées.':'Optimized performance.'],['🔐',f?'Sécurisé':'Secure',f?'Chiffrement enterprise.':'Enterprise encryption.'],['🤖',f?'IA Intégrée':'AI Powered',f?'Assistant IA natif.':'Built-in AI assistant.']]; return '<section style="padding:80px 40px;font-family:Inter,sans-serif"><h2 style="text-align:center;font-size:32px;font-weight:900;color:#fff;margin-bottom:50px">' + (f?'Fonctionnalités Clés':'Key Features') + '</h2><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px">' + feats.map(function(ft){return '<div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:28px;transition:.2s"><div style="font-size:32px;margin-bottom:14px">'+ft[0]+'</div><div style="font-size:15px;font-weight:700;color:#fff;margin-bottom:8px">'+ft[1]+'</div><div style="font-size:12px;color:#64748b;line-height:1.7">'+ft[2]+'</div></div>';}).join('') + '</div></section>'; } },
    { id:'stats', icon:'📊', color:'#10b981', name: isFr?'Stats Counter':'Stats Counter',    desc: isFr?'Compteurs chiffres clés':'Key number counters',
      build: function(f) { var st=[['10K+',f?'Utilisateurs':'Users'],['99.9%','Uptime'],['50ms',f?'Latence':'Latency'],['150+',f?'Pays':'Countries']]; return '<section style="padding:60px 40px;background:rgba(0,0,0,.3);font-family:Inter,sans-serif"><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:20px;text-align:center">'+st.map(function(s){return '<div><div style="font-size:36px;font-weight:900;color:#fff;margin-bottom:6px">'+s[0]+'</div><div style="font-size:11px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:1px">'+s[1]+'</div></div>';}).join('')+'</div></section>'; } },
    { id:'test',  icon:'💬', color:'#ec4899', name: isFr?'Témoignages':'Testimonials',      desc: isFr?'3 cartes avis clients':'3 review cards',
      build: function(f) { var ts=[['Marie D.','CEO @ TechCorp',f?'Incroyable ! Productivité multipliée par 3.':'Incredible! 3x productivity boost.'],['Jean M.','Dev Lead',f?'L\'IA intégrée est impressionnante.':'The built-in AI is impressive.'],['Sophie L.','Designer',f?'Le meilleur produit du marché.':'Best product on the market.']]; return '<section style="padding:80px 40px;font-family:Inter,sans-serif"><h2 style="text-align:center;font-size:28px;font-weight:900;color:#fff;margin-bottom:40px">' + (f?'Ce Que Disent Nos Clients':'What Our Customers Say') + '</h2><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">'+ts.map(function(t){return '<div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:24px"><div style="font-size:12px;color:#94a3b8;line-height:1.7;margin-bottom:16px">&ldquo;'+t[2]+'&rdquo;</div><div style="display:flex;align-items:center;gap:10px"><div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#8b5cf6,#ec4899);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:900;color:#fff">'+t[0][0]+'</div><div><div style="font-size:12px;font-weight:700;color:#fff">'+t[0]+'</div><div style="font-size:10px;color:#64748b">'+t[1]+'</div></div><div style="margin-left:auto;font-size:11px;color:#f59e0b">⭐⭐⭐⭐⭐</div></div></div>';}).join('')+'</div></section>'; } },
    { id:'price', icon:'💳', color:'#6366f1', name: isFr?'Pricing Table':'Pricing Table',    desc: isFr?'3 plans tarifaires':'3 pricing tiers',
      build: function(f) { return '<section style="padding:80px 40px;text-align:center;font-family:Inter,sans-serif"><h2 style="font-size:32px;font-weight:900;color:#fff;margin-bottom:50px">' + (f?'Choisissez Votre Plan':'Choose Your Plan') + '</h2><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:900px;margin:0 auto"><div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:28px"><div style="font-size:15px;font-weight:700;color:#fff;margin-bottom:10px">' + (f?'Gratuit':'Free') + '</div><div style="font-size:36px;font-weight:900;color:#fff;margin-bottom:20px">$0<span style="font-size:13px;color:#64748b;font-weight:400">/mo</span></div><div style="font-size:12px;color:#94a3b8;margin-bottom:7px">✅ 3 ' + (f?'projets':'projects') + '</div><div style="font-size:12px;color:#94a3b8;margin-bottom:7px">✅ 1GB ' + (f?'stockage':'storage') + '</div><button style="width:100%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:11px;color:#fff;font-weight:700;cursor:pointer;margin-top:14px">' + (f?'Commencer':'Get Started') + '</button></div><div style="background:linear-gradient(135deg,rgba(139,92,246,.12),rgba(59,130,246,.06));border:1px solid rgba(139,92,246,.4);border-radius:20px;padding:28px;transform:scale(1.04)"><div style="font-size:10px;font-weight:900;color:#a78bfa;letter-spacing:1px;margin-bottom:10px">⭐ ' + (f?'POPULAIRE':'POPULAR') + '</div><div style="font-size:15px;font-weight:700;color:#fff;margin-bottom:10px">Pro</div><div style="font-size:36px;font-weight:900;color:#fff;margin-bottom:20px">$29<span style="font-size:13px;color:#64748b;font-weight:400">/mo</span></div><div style="font-size:12px;color:#94a3b8;margin-bottom:7px">✅ ∞ ' + (f?'projets':'projects') + '</div><div style="font-size:12px;color:#94a3b8;margin-bottom:7px">✅ 100GB ' + (f?'stockage':'storage') + '</div><button style="width:100%;background:linear-gradient(135deg,#8b5cf6,#3b82f6);border:none;border-radius:10px;padding:11px;color:#fff;font-weight:900;cursor:pointer;margin-top:14px">' + (f?'Commencer':'Get Started') + '</button></div><div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:28px"><div style="font-size:15px;font-weight:700;color:#fff;margin-bottom:10px">Enterprise</div><div style="font-size:36px;font-weight:900;color:#fff;margin-bottom:20px">$99<span style="font-size:13px;color:#64748b;font-weight:400">/mo</span></div><div style="font-size:12px;color:#94a3b8;margin-bottom:7px">✅ ∞ ' + (f?'projets':'projects') + '</div><div style="font-size:12px;color:#94a3b8;margin-bottom:7px">✅ 1TB · SLA 24/7</div><button style="width:100%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:11px;color:#fff;font-weight:700;cursor:pointer;margin-top:14px">' + (f?'Contacter':'Contact Us') + '</button></div></div></section>'; } },
    { id:'faq',   icon:'❓', color:'#06b6d4', name: 'FAQ',                                   desc: isFr?'Accordion questions fréq.':'Accordion FAQ',
      build: function(f) { var qs=f?[['Comment commencer ?','Inscrivez-vous gratuitement et suivez notre guide de démarrage rapide en 5 minutes.'],['Y a-t-il une version gratuite ?','Oui ! Notre plan gratuit inclut 3 projets et 1GB de stockage sans carte bancaire.'],['Puis-je annuler à tout moment ?','Oui. Annulation en 1 clic, sans frais ni engagement minimum.'],['Le support est-il disponible ?','Notre équipe répond sous 24h. Support prioritaire pour les plans Pro et Enterprise.']]:[['How do I get started?','Sign up for free and follow our 5-minute quick-start guide.'],['Is there a free plan?','Yes! Our free plan includes 3 projects and 1GB storage with no credit card required.'],['Can I cancel anytime?','Yes. Cancel in 1 click, no fees or minimum commitment.'],['Is support available?','Our team responds within 24h. Priority support for Pro and Enterprise plans.']]; return '<section style="padding:80px 40px;max-width:720px;margin:0 auto;font-family:Inter,sans-serif"><h2 style="text-align:center;font-size:28px;font-weight:900;color:#fff;margin-bottom:40px">FAQ</h2>'+qs.map(function(q){return '<details style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:16px;margin-bottom:8px;cursor:pointer"><summary style="font-size:13px;font-weight:700;color:#e2e8f0;list-style:none;display:flex;justify-content:space-between;align-items:center">'+q[0]+' <span style="color:#8b5cf6;font-weight:900;">+</span></summary><p style="font-size:12px;color:#64748b;margin-top:10px;line-height:1.7">'+q[1]+'</p></details>';}).join('')+'</section>'; } },
    { id:'cta',   icon:'🎯', color:'#f59e0b', name: isFr?'Call to Action':'Call to Action',  desc: isFr?'Bannière finale d\'action':'Final action banner',
      build: function(f) { return '<section style="margin:40px;border-radius:24px;padding:70px 40px;text-align:center;background:linear-gradient(135deg,rgba(139,92,246,.2),rgba(59,130,246,.12));border:1px solid rgba(139,92,246,.3);font-family:Inter,sans-serif"><h2 style="font-size:36px;font-weight:900;color:#fff;margin-bottom:14px">' + (f?'Prêt à Commencer ?':'Ready to Start?') + '</h2><p style="font-size:15px;color:#94a3b8;max-width:480px;margin:0 auto 30px;line-height:1.7">' + (f?'Rejoignez 10 000+ équipes qui font confiance à notre plateforme.':'Join 10,000+ teams who trust our platform.') + '</p><button style="background:linear-gradient(135deg,#8b5cf6,#3b82f6);border:none;border-radius:14px;padding:16px 40px;color:#fff;font-weight:900;font-size:15px;cursor:pointer;box-shadow:0 15px 40px rgba(139,92,246,.4)">✨ ' + (f?'Commencer Maintenant':'Start Now — Free') + '</button></section>'; } },
    { id:'contact',icon:'📧', color:'#34d399', name: isFr?'Contact':'Contact Form',          desc: isFr?'Formulaire de contact':'Contact form',
      build: function(f) { return '<section style="padding:80px 40px;max-width:640px;margin:0 auto;font-family:Inter,sans-serif"><h2 style="font-size:28px;font-weight:900;color:#fff;margin-bottom:30px;text-align:center">' + (f?'Prenons Contact':'Get In Touch') + '</h2><form style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:28px" onsubmit="event.preventDefault();this.querySelector(\'button\').textContent=\'' + (f?'✅ Envoyé!':'✅ Sent!') + '\'"><input placeholder="' + (f?'Votre nom':'Your name') + '" style="width:100%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:10px 14px;color:#fff;font-size:13px;outline:none;margin-bottom:12px;box-sizing:border-box"><input type="email" placeholder="Email" style="width:100%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:10px 14px;color:#fff;font-size:13px;outline:none;margin-bottom:12px;box-sizing:border-box"><textarea rows="4" placeholder="' + (f?'Votre message':'Your message') + '" style="width:100%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:10px 14px;color:#fff;font-size:13px;outline:none;margin-bottom:16px;resize:none;box-sizing:border-box"></textarea><button type="submit" style="width:100%;background:linear-gradient(135deg,#8b5cf6,#3b82f6);border:none;border-radius:10px;padding:12px;color:#fff;font-weight:900;font-size:14px;cursor:pointer">✉️ ' + (f?'Envoyer':'Send Message') + '</button></form></section>'; } },
    { id:'footer', icon:'🔻', color:'#475569', name: 'Footer',                               desc: isFr?'Pied de page complet':'Full footer',
      build: function(f) { return '<footer style="background:rgba(0,0,0,.5);border-top:1px solid rgba(255,255,255,.06);padding:50px 40px 30px;font-family:Inter,sans-serif"><div style="display:flex;justify-content:space-between;gap:40px;flex-wrap:wrap;margin-bottom:40px"><div style="max-width:220px"><div style="font-size:18px;font-weight:900;background:linear-gradient(135deg,#8b5cf6,#3b82f6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:12px">⚡ Brand</div><p style="font-size:12px;color:#64748b;line-height:1.7">' + (f?'La plateforme tout-en-un pour builders modernes.':'The all-in-one platform for modern builders.') + '</p></div><div><div style="font-size:11px;font-weight:700;color:#fff;margin-bottom:12px;letter-spacing:1px">' + (f?'PRODUIT':'PRODUCT') + '</div><div style="font-size:12px;color:#64748b;margin-bottom:7px;cursor:pointer">' + (f?'Fonctionnalités':'Features') + '</div><div style="font-size:12px;color:#64748b;margin-bottom:7px;cursor:pointer">' + (f?'Tarifs':'Pricing') + '</div><div style="font-size:12px;color:#64748b;margin-bottom:7px;cursor:pointer">Changelog</div></div><div><div style="font-size:11px;font-weight:700;color:#fff;margin-bottom:12px;letter-spacing:1px">' + (f?'ENTREPRISE':'COMPANY') + '</div><div style="font-size:12px;color:#64748b;margin-bottom:7px;cursor:pointer">' + (f?'À propos':'About') + '</div><div style="font-size:12px;color:#64748b;margin-bottom:7px;cursor:pointer">Blog</div><div style="font-size:12px;color:#64748b;margin-bottom:7px;cursor:pointer">' + (f?'Carrières':'Careers') + '</div></div><div><div style="font-size:11px;font-weight:700;color:#fff;margin-bottom:12px;letter-spacing:1px">' + (f?'LÉGAL':'LEGAL') + '</div><div style="font-size:12px;color:#64748b;margin-bottom:7px;cursor:pointer">' + (f?'Confidentialité':'Privacy') + '</div><div style="font-size:12px;color:#64748b;margin-bottom:7px;cursor:pointer">CGU / Terms</div></div></div><div style="border-top:1px solid rgba(255,255,255,.06);padding-top:20px;font-size:11px;color:#475569;text-align:center">© 2025 Brand · Made with ❤️ by IA ULTRA</div></footer>'; } }
  ];

  var modal = document.createElement('div');
  modal.id = 'v5-pagearch-modal';
  modal.style = 'position:absolute;inset:0;z-index:800;background:rgba(3,5,9,.97);backdrop-filter:blur(20px);display:none;flex-direction:column;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:16px 20px 12px;border-bottom:1px solid rgba(139,92,246,.2);display:flex;justify-content:space-between;align-items:center;flex-shrink:0;';
  hdr.innerHTML = '<div><div style="font-size:14px;font-weight:900;color:#a78bfa">🗺️ ' + (isFr ? 'Architecte de Page' : 'Page Architect') + '</div><div style="font-size:10px;color:#64748b;margin-top:2px">' + (isFr ? 'Assemblez une page avec des blocs visuels' : 'Assemble a page with visual blocks') + '</div></div><button id="v5-pa-close" style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:#fff;border-radius:8px;padding:5px 14px;cursor:pointer;font-size:12px;">✕ ' + (isFr ? 'Fermer' : 'Close') + '</button>';
  modal.appendChild(hdr);

  var main = document.createElement('div');
  main.style = 'flex:1;display:grid;grid-template-columns:1fr 1fr;overflow:hidden;';

  var leftP = document.createElement('div');
  leftP.style = 'overflow-y:auto;padding:10px 12px;border-right:1px solid rgba(255,255,255,.06);';
  leftP.innerHTML = '<div style="font-size:9px;font-weight:700;color:#64748b;margin-bottom:8px;letter-spacing:1px;">' + (isFr ? '🧩 BLOCS DISPONIBLES' : '🧩 AVAILABLE BLOCKS') + '</div>';

  var rightP = document.createElement('div');
  rightP.style = 'overflow-y:auto;padding:10px 12px;display:flex;flex-direction:column;';
  rightP.innerHTML = '<div style="font-size:9px;font-weight:700;color:#64748b;margin-bottom:8px;letter-spacing:1px;">' + (isFr ? '📄 VOTRE PAGE' : '📄 YOUR PAGE') + '</div>';

  var sel = [];
  var selList = document.createElement('div');
  selList.style = 'flex:1;';

  var emptyEl = document.createElement('div');
  emptyEl.style = 'text-align:center;padding:30px 10px;color:#475569;font-size:10px;';
  emptyEl.textContent = isFr ? '← Cliquez des blocs à gauche' : '← Click blocks on the left';
  selList.appendChild(emptyEl);
  rightP.appendChild(selList);

  function renderSel() {
    var items = selList.querySelectorAll('.pa-bl');
    items.forEach(function(el) { el.remove(); });
    if (sel.length === 0) { emptyEl.style.display = ''; return; }
    emptyEl.style.display = 'none';
    sel.forEach(function(b, idx) {
      var item = document.createElement('div');
      item.className = 'pa-bl';
      item.style = 'background:rgba(255,255,255,.03);border:1px solid ' + b.color + '28;border-radius:7px;padding:7px 10px;margin-bottom:5px;display:flex;align-items:center;gap:7px;';
      item.innerHTML = '<span style="font-size:14px">' + b.icon + '</span><span style="font-size:10px;font-weight:700;color:#e2e8f0;flex:1">' + b.name + '</span><button data-ri="' + idx + '" style="background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.3);color:#ef4444;border-radius:4px;padding:2px 7px;font-size:9px;cursor:pointer;">✕</button>';
      item.querySelector('[data-ri]').onclick = function() { sel.splice(idx, 1); renderSel(); };
      selList.appendChild(item);
    });
  }

  BLOCKS.forEach(function(block) {
    var btn = document.createElement('button');
    btn.style = 'width:100%;background:rgba(255,255,255,.03);border:1px solid ' + block.color + '28;border-radius:8px;padding:8px 10px;margin-bottom:6px;display:flex;align-items:center;gap:8px;cursor:pointer;transition:.15s;text-align:left;';
    btn.innerHTML = '<span style="font-size:16px;">' + block.icon + '</span><div style="flex:1"><div style="font-size:10px;font-weight:700;color:#fff;">' + block.name + '</div><div style="font-size:9px;color:#64748b;">' + block.desc + '</div></div><span style="color:' + block.color + ';font-size:14px;font-weight:900;">+</span>';
    btn.onmouseover = function() { btn.style.borderColor = block.color + '66'; btn.style.background = 'rgba(255,255,255,.06)'; };
    btn.onmouseout  = function() { btn.style.borderColor = block.color + '28'; btn.style.background = 'rgba(255,255,255,.03)'; };
    (function(b) { btn.onclick = function() { sel.push(b); renderSel(); }; })(block);
    leftP.appendChild(btn);
  });

  main.appendChild(leftP);
  main.appendChild(rightP);
  modal.appendChild(main);

  var footer = document.createElement('div');
  footer.style = 'padding:12px 20px;border-top:1px solid rgba(255,255,255,.06);display:flex;gap:8px;flex-shrink:0;';
  footer.innerHTML = '<button id="v5-pa-clear" style="background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:#94a3b8;border-radius:8px;padding:9px 14px;font-size:11px;font-weight:700;cursor:pointer;">🗑️ ' + (isFr ? 'Vider' : 'Clear') + '</button><button id="v5-pa-build" style="flex:1;background:linear-gradient(135deg,#a78bfa,#8b5cf6);border:none;border-radius:9px;padding:10px;color:#fff;font-weight:900;font-size:12px;cursor:pointer;">🗺️ ' + (isFr ? 'Assembler la Page' : 'Assemble Page') + '</button>';
  modal.appendChild(footer);

  hdr.querySelector('#v5-pa-close').onclick = function() { modal.style.display = 'none'; };

  setTimeout(function() {
    var clearBtn = modal.querySelector('#v5-pa-clear');
    var buildBtn = modal.querySelector('#v5-pa-build');
    if (clearBtn) clearBtn.onclick = function() { sel = []; renderSel(); };
    if (buildBtn) buildBtn.onclick = function() {
      if (!sel.length) { showToastV5(isFr ? '⚠️ Ajoutez au moins un bloc !' : '⚠️ Add at least one block!'); return; }
      var bodyContent = sel.map(function(b) { return b.build(isFr); }).join('\n');
      var page = '<!DOCTYPE html><html lang="' + (isFr ? 'fr' : 'en') + '"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + (isFr ? 'Ma Page' : 'My Page') + '</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box;font-family:\'Inter\',sans-serif}body{background:#020617;color:#e2e8f0;overflow-x:hidden}</style></head><body>' + bodyContent + '</body></html>';
      injectCode(page);
      modal.style.display = 'none';
      showToastV5('🗺️ ' + sel.length + (isFr ? ' blocs assemblés !' : ' blocks assembled!'));
    };
  }, 60);
  return modal;
}

/* ══════════════════════════════════ IMAGE TO CODE ══ */
function buildImageToCodeModal(container, isFr) {
  var STYLES = [
    { icon:'🌑', name:'Dark Glass',  kw: isFr?'dark glassmorphism néon violet premium':'dark glassmorphism purple neon premium' },
    { icon:'☀️', name:'Light SaaS',  kw: isFr?'design clair minimal SaaS blanc et bleu':'clean minimal SaaS white and blue design' },
    { icon:'🔴', name:'Brutalist',   kw: isFr?'néo-brutaliste rouge et noir contraste extrême':'neo-brutalist red and black extreme contrast' },
    { icon:'🌈', name:'Aurora',      kw: isFr?'aurora gradient fluide violet rose dynamique':'fluid aurora gradient violet pink dynamic' },
    { icon:'🤖', name:'Cyberpunk',   kw: isFr?'cyberpunk rétro-futuriste cyan et magenta':'retro-futurist cyberpunk cyan and magenta' },
    { icon:'🍎', name:'iOS Style',   kw: isFr?'minimaliste style Apple iOS blanc épuré':'Apple iOS minimalist clean white design' }
  ];

  var modal = document.createElement('div');
  modal.id = 'v5-imgcode-modal';
  modal.style = 'position:absolute;inset:0;z-index:800;background:rgba(3,5,9,.97);backdrop-filter:blur(20px);display:none;flex-direction:column;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:16px 20px 12px;border-bottom:1px solid rgba(245,158,11,.2);display:flex;justify-content:space-between;align-items:center;flex-shrink:0;';
  hdr.innerHTML = '<div><div style="font-size:14px;font-weight:900;color:#f59e0b">📸 Image to Code</div><div style="font-size:10px;color:#64748b;margin-top:2px">' + (isFr ? 'Décrivez un design de référence → Obtenez le code' : 'Describe a reference design → Get the code') + '</div></div><button id="v5-ic-close" style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:#fff;border-radius:8px;padding:5px 14px;cursor:pointer;font-size:12px;">✕ ' + (isFr ? 'Fermer' : 'Close') + '</button>';
  modal.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:16px;';
  body.innerHTML =
    '<div style="font-size:9px;font-weight:700;color:#64748b;margin-bottom:5px;letter-spacing:1px">' + (isFr ? 'TYPE D\'APPLICATION' : 'APPLICATION TYPE') + '</div>' +
    '<input id="v5-ic-type" placeholder="' + (isFr ? 'Ex: Dashboard, E-commerce, Portfolio, Landing page...' : 'E.g.: Dashboard, E-commerce, Portfolio, Landing page...') + '" style="width:100%;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:9px 12px;color:#fff;font-size:12px;outline:none;box-sizing:border-box;margin-bottom:14px">' +
    '<div style="font-size:9px;font-weight:700;color:#64748b;margin-bottom:5px;letter-spacing:1px">' + (isFr ? 'STYLE VISUEL RAPIDE' : 'QUICK VISUAL STYLE') + '</div>' +
    '<div id="v5-ic-styles" style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:14px"></div>' +
    '<div style="font-size:9px;font-weight:700;color:#64748b;margin-bottom:5px;letter-spacing:1px">' + (isFr ? 'DESCRIPTION DU DESIGN' : 'DESIGN DESCRIPTION') + '</div>' +
    '<textarea id="v5-ic-desc" rows="4" placeholder="' + (isFr ? 'Décrivez les éléments: sidebar, cartes, graphiques, couleurs, layout...' : 'Describe the elements: sidebar, cards, charts, colors, layout...') + '" style="width:100%;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:9px 12px;color:#fff;font-size:12px;outline:none;resize:none;box-sizing:border-box;"></textarea>';
  modal.appendChild(body);

  var footer = document.createElement('div');
  footer.style = 'padding:14px 20px;border-top:1px solid rgba(255,255,255,.06);flex-shrink:0;';
  footer.innerHTML = '<button id="v5-ic-gen" style="width:100%;background:linear-gradient(135deg,#f59e0b,#ef4444);border:none;border-radius:10px;padding:12px;color:#fff;font-weight:900;font-size:13px;cursor:pointer;">📸 ' + (isFr ? 'Générer depuis ce Design' : 'Generate from this Design') + '</button>';
  modal.appendChild(footer);

  hdr.querySelector('#v5-ic-close').onclick = function() { modal.style.display = 'none'; };

  var selStyle = '';
  setTimeout(function() {
    var stylesGrid = modal.querySelector('#v5-ic-styles');
    if (stylesGrid) {
      STYLES.forEach(function(s) {
        var btn = document.createElement('button');
        btn.style = 'background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:7px;padding:8px 4px;cursor:pointer;transition:.15s;text-align:center;';
        btn.innerHTML = '<div style="font-size:18px;">' + s.icon + '</div><div style="font-size:9px;font-weight:700;color:#e2e8f0;">' + s.name + '</div>';
        (function(style, el) {
          btn.onclick = function() {
            stylesGrid.querySelectorAll('button').forEach(function(b) { b.style.background='rgba(255,255,255,.04)'; b.style.borderColor='rgba(255,255,255,.08)'; });
            selStyle = style.kw;
            el.style.background = 'rgba(245,158,11,.2)';
            el.style.borderColor = 'rgba(245,158,11,.5)';
            var descEl = modal.querySelector('#v5-ic-desc');
            if (descEl && !descEl.value.includes(style.kw)) {
              descEl.value = (descEl.value ? descEl.value + ' · ' : '') + style.kw;
            }
          };
          btn.onmouseover = function() { if (selStyle !== style.kw) { el.style.background='rgba(245,158,11,.1)'; } };
          btn.onmouseout  = function() { if (selStyle !== style.kw) { el.style.background='rgba(255,255,255,.04)'; } };
        })(s, btn);
        stylesGrid.appendChild(btn);
      });
    }
    var genBtn = modal.querySelector('#v5-ic-gen');
    if (genBtn) {
      genBtn.onclick = function() {
        var typeEl = modal.querySelector('#v5-ic-type');
        var descEl = modal.querySelector('#v5-ic-desc');
        var appType = typeEl ? typeEl.value.trim() : '';
        var desc    = descEl ? descEl.value.trim() : '';
        if (!appType && !desc) { showToastV5(isFr ? '⚠️ Décrivez au moins le type d\'app !' : '⚠️ Describe at least the app type!'); return; }
        var enriched = (appType ? appType + ' ' : '') + (desc ? desc + ' ' : '') + (isFr ? 'design premium professionnel ultra-moderne glassmorphism' : 'premium professional ultra-modern glassmorphism design');
        var ultraInput = document.getElementById('ultra-input');
        if (ultraInput) {
          ultraInput.value = enriched;
          ultraInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
          modal.style.display = 'none';
          showToastV5('📸 ' + (isFr ? 'Génération depuis votre design lancée !' : 'Generating from your design reference!'));
        }
      };
    }
  }, 60);
  return modal;
}

/* ══════════════════════════════════ BUILD VAULT MODAL ══ */
function buildVaultModal(container, isFr) {
  var tx = isFr ? V5L.fr : V5L.en;
  var apps = getApps(isFr);
  var modal = document.createElement('div');
  modal.id = 'v5-vault-modal';
  modal.style = 'position:absolute;inset:0;z-index:800;background:rgba(3,5,9,.97);backdrop-filter:blur(20px);display:none;flex-direction:column;';
  var hdr = document.createElement('div');
  hdr.style = 'padding:16px 20px 12px;border-bottom:1px solid rgba(251,191,36,.15);display:flex;justify-content:space-between;align-items:center;flex-shrink:0;';
  hdr.innerHTML = '<div><div style="font-size:14px;font-weight:900;color:#fbbf24;letter-spacing:1px">🏛️ ' + tx.vault + '</div><div style="font-size:10px;color:#64748b;margin-top:2px">' + tx.vaultSub + '</div></div><button id="v5-vault-close" style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:#fff;border-radius:8px;padding:5px 14px;cursor:pointer;font-size:12px;">✕ ' + tx.close + '</button>';
  modal.appendChild(hdr);
  var searchWrap = document.createElement('div');
  searchWrap.style = 'padding:10px 20px;flex-shrink:0;';
  searchWrap.innerHTML = '<input id="v5-vault-search" placeholder="🔍 ' + tx.search + '" style="width:100%;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:8px 14px;color:#fff;font-size:12px;outline:none;">';
  modal.appendChild(searchWrap);
  var grid = document.createElement('div');
  grid.id = 'v5-vault-grid';
  grid.style = 'flex:1;overflow-y:auto;padding:8px 14px 20px;display:grid;grid-template-columns:1fr 1fr;gap:10px;align-content:start;';
  apps.forEach(function(app) {
    var card = document.createElement('div');
    card.style = 'background:rgba(255,255,255,.03);border:1px solid ' + app.color + '28;border-radius:12px;padding:14px;cursor:pointer;transition:.2s;';
    card.dataset.name = app.name.toLowerCase();
    card.innerHTML = '<div style="font-size:26px;margin-bottom:8px">' + app.icon + '</div><div style="font-size:12px;font-weight:700;color:#fff;margin-bottom:4px">' + app.name + '</div><div style="font-size:10px;color:#64748b;line-height:1.4;margin-bottom:10px">' + app.desc + '</div><div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:10px">' + app.tags.map(function(tg) { return '<span style="font-size:9px;background:' + app.color + '18;color:' + app.color + ';padding:2px 7px;border-radius:4px;font-weight:700">' + tg + '</span>'; }).join('') + '</div><button style="width:100%;background:linear-gradient(135deg,' + app.color + ',' + app.color + 'cc);border:none;border-radius:7px;padding:7px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;">⚡ ' + tx.inject + '</button>';
    (function(appRef) {
      card.querySelector('button').onclick = function(e) {
        e.stopPropagation();
        injectCode(appRef.build(isFr));
        modal.style.display = 'none';
        showToastV5('✅ ' + appRef.name + ' ' + (isFr ? 'injectée !' : 'injected!'));
      };
    })(app);
    card.onmouseover = function() { card.style.borderColor = app.color + '55'; card.style.transform = 'translateY(-2px)'; };
    card.onmouseout = function() { card.style.borderColor = app.color + '28'; card.style.transform = ''; };
    grid.appendChild(card);
  });
  modal.appendChild(grid);
  hdr.querySelector('#v5-vault-close').onclick = function() { modal.style.display = 'none'; };
  var searchInput = searchWrap.querySelector('#v5-vault-search');
  searchInput.oninput = function() {
    var q = searchInput.value.toLowerCase();
    grid.querySelectorAll('div[data-name]').forEach(function(card) {
      card.style.display = card.dataset.name.includes(q) ? '' : 'none';
    });
  };
  return modal;
}

/* ══════════════════════════════════ BUILD TOOLS MODAL ══ */
function buildToolsModal(container, isFr) {
  var tx = isFr ? V5L.fr : V5L.en;
  var modal = document.createElement('div');
  modal.id = 'v5-tools-modal';
  modal.style = 'position:absolute;inset:0;z-index:800;background:rgba(3,5,9,.97);backdrop-filter:blur(20px);display:none;flex-direction:column;';
  var hdr = document.createElement('div');
  hdr.style = 'padding:16px 20px 12px;border-bottom:1px solid rgba(52,211,153,.15);display:flex;justify-content:space-between;align-items:center;flex-shrink:0;';
  hdr.innerHTML = '<div><div style="font-size:14px;font-weight:900;color:#34d399">🛠️ ' + tx.tools + '</div><div style="font-size:10px;color:#64748b;margin-top:2px">' + (isFr ? '8 outils professionnels' : '8 professional enhancement tools') + '</div></div><button id="v5-tools-close" style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:#fff;border-radius:8px;padding:5px 14px;cursor:pointer;font-size:12px">✕ ' + tx.close + '</button>';
  modal.appendChild(hdr);
  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:14px 16px;';
  // Multi-Page
  var mpRow = document.createElement('div');
  mpRow.style = 'background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:14px;margin-bottom:10px;';
  mpRow.innerHTML = '<div style="font-size:12px;font-weight:700;color:#fff;margin-bottom:6px">🌐 ' + tx.multi + '</div><div style="font-size:10px;color:#64748b;margin-bottom:10px">' + tx.multiDesc + '</div><div style="display:flex;gap:8px"><input id="v5-mp-input" placeholder="' + (isFr ? 'Ex: Agence digitale, Restaurant...' : 'E.g.: Digital agency, Restaurant...') + '" style="flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.09);border-radius:7px;padding:8px 12px;color:#fff;font-size:11px;outline:none"><button id="v5-mp-btn" style="background:linear-gradient(135deg,#6366f1,#4f46e5);border:none;border-radius:7px;padding:8px 14px;color:#fff;font-weight:700;font-size:11px;cursor:pointer">⚡ ' + (isFr ? 'Générer' : 'Generate') + '</button></div>';
  body.appendChild(mpRow);
  // Components
  var compSec = document.createElement('div');
  compSec.style = 'background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:14px;margin-bottom:10px;';
  compSec.innerHTML = '<div style="font-size:12px;font-weight:700;color:#fff;margin-bottom:6px">🧩 ' + tx.comp + '</div><div style="font-size:10px;color:#64748b;margin-bottom:10px">' + tx.compDesc + '</div><div style="display:flex;flex-wrap:wrap;gap:6px" id="v5-comp-list"></div>';
  body.appendChild(compSec);
  // Tools grid
  var toolsData = [
    { id:'pwa', icon:'📱', label:tx.pwa, desc:tx.pwaDesc, color:'#8b5cf6' },
    { id:'auth', icon:'🔐', label:tx.auth, desc:tx.authDesc, color:'#3b82f6' },
    { id:'explain', icon:'💬', label:tx.explain, desc:tx.explainDesc, color:'#10b981' },
    { id:'ab', icon:'🧪', label:tx.ab, desc:tx.abDesc, color:'#f59e0b' },
    { id:'i18n', icon:'🌍', label:tx.i18n, desc:tx.i18nDesc, color:'#06b6d4' },
    { id:'perf', icon:'⚡', label:tx.perf, desc:tx.perfDesc, color:'#ec4899' },
  ];
  var tGrid = document.createElement('div');
  tGrid.style = 'display:grid;grid-template-columns:1fr 1fr;gap:8px;';
  toolsData.forEach(function(tool) {
    var card = document.createElement('div');
    card.style = 'background:rgba(255,255,255,.03);border:1px solid ' + tool.color + '28;border-radius:10px;padding:12px;';
    card.innerHTML = '<div style="font-size:18px;margin-bottom:6px">' + tool.icon + '</div><div style="font-size:11px;font-weight:700;color:#fff;margin-bottom:4px">' + tool.label + '</div><div style="font-size:9px;color:#64748b;margin-bottom:9px;line-height:1.4">' + tool.desc + '</div><button style="width:100%;background:' + tool.color + '22;border:1px solid ' + tool.color + '44;color:' + tool.color + ';border-radius:6px;padding:5px;font-weight:700;font-size:10px;cursor:pointer">⚡ ' + (isFr ? 'Appliquer' : 'Apply') + '</button>';
    (function(toolRef) {
      card.querySelector('button').onclick = function() {
        if (ToolsImpl[toolRef.id]) ToolsImpl[toolRef.id](isFr, tx);
      };
    })(tool);
    tGrid.appendChild(card);
  });
  body.appendChild(tGrid);
  modal.appendChild(body);
  hdr.querySelector('#v5-tools-close').onclick = function() { modal.style.display = 'none'; };
  // Wire after append
  setTimeout(function() {
    var mpBtn = modal.querySelector('#v5-mp-btn');
    var mpInp = modal.querySelector('#v5-mp-input');
    if (mpBtn && mpInp) {
      mpBtn.onclick = function() {
        var val = mpInp.value.trim() || (isFr ? 'Mon projet' : 'My project');
        injectCode(buildMultiPage(val, isFr));
        modal.style.display = 'none';
        showToastV5('✅ ' + (isFr ? 'Site 4 pages généré !' : '4-page site generated!'));
      };
    }
    var compList = modal.querySelector('#v5-comp-list');
    if (compList) {
      COMPONENTS.forEach(function(comp) {
        var btn = document.createElement('button');
        btn.style = 'background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);color:#e2e8f0;border-radius:6px;padding:4px 9px;font-size:10px;cursor:pointer;transition:.15s;';
        btn.textContent = comp.emoji + ' ' + comp.name;
        btn.onmouseover = function() { btn.style.background = 'rgba(52,211,153,.12)'; btn.style.borderColor = '#34d399'; btn.style.color = '#34d399'; };
        btn.onmouseout = function() { btn.style.background = 'rgba(255,255,255,.04)'; btn.style.borderColor = 'rgba(255,255,255,.08)'; btn.style.color = '#e2e8f0'; };
        (function(compRef) {
          btn.onclick = function() {
            var cur = getCode();
            if (cur) {
              injectCode(cur.replace('</body>', compRef.code + '\n</body>'));
            } else {
              injectCode('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Component</title><style>body{background:#030509;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:20px}</style></head><body>' + compRef.code + '</body></html>');
            }
            showToastV5('✅ ' + compRef.name + ' ' + (isFr ? 'inséré !' : 'inserted!'));
          };
        })(comp);
        compList.appendChild(btn);
      });
    }
  }, 60);
  return modal;
}

/* ══════════════════════════════════ MAIN INJECTION ══ */
function addV5Panels(container) {
  if (!container || container.querySelector('#v5-toolbar')) return;
  var isFr = window.lang === 'fr';
  var tx = isFr ? V5L.fr : V5L.en;

  // Create dedicated full-width toolbar strip
  var toolbar = document.createElement('div');
  toolbar.id = 'v5-toolbar';
  toolbar.style = 'display:flex;gap:6px;padding:6px 14px;background:rgba(0,0,0,.5);border-bottom:1px solid rgba(139,92,246,.15);flex-shrink:0;z-index:10;position:relative;';

  var vaultBtn = document.createElement('button');
  vaultBtn.id = 'v5-vault-btn';
  vaultBtn.title = tx.vault;
  vaultBtn.innerHTML = '🏛️ <span style="font-size:10px;font-weight:700">App Vault</span>';
  vaultBtn.style = 'flex:1;background:rgba(251,191,36,.1);border:1px solid rgba(251,191,36,.4);color:#fbbf24;border-radius:8px;padding:6px 8px;cursor:pointer;font-size:13px;display:flex;align-items:center;justify-content:center;gap:5px;transition:.2s;font-family:Inter,sans-serif;';
  vaultBtn.onmouseover = function() { vaultBtn.style.background = 'rgba(251,191,36,.22)'; };
  vaultBtn.onmouseout = function() { vaultBtn.style.background = 'rgba(251,191,36,.1)'; };

  var toolsBtn = document.createElement('button');
  toolsBtn.id = 'v5-tools-btn';
  toolsBtn.title = tx.tools;
  toolsBtn.innerHTML = '🛠️ <span style="font-size:10px;font-weight:700">' + (isFr ? 'Outils Pro' : 'Power Tools') + '</span>';
  toolsBtn.style = 'flex:1;background:rgba(52,211,153,.1);border:1px solid rgba(52,211,153,.4);color:#34d399;border-radius:8px;padding:6px 8px;cursor:pointer;font-size:13px;display:flex;align-items:center;justify-content:center;gap:5px;transition:.2s;font-family:Inter,sans-serif;';
  toolsBtn.onmouseover = function() { toolsBtn.style.background = 'rgba(52,211,153,.22)'; };
  toolsBtn.onmouseout = function() { toolsBtn.style.background = 'rgba(52,211,153,.1)'; };

  toolbar.appendChild(vaultBtn);
  toolbar.appendChild(toolsBtn);

  var ultraBtn = document.createElement('button');
  ultraBtn.id = 'v5-ultra-btn';
  ultraBtn.title = 'Tools Ultra';
  ultraBtn.innerHTML = '⚡ <span style="font-size:10px;font-weight:700">Tools Ultra</span>';
  ultraBtn.style = 'flex:1;background:rgba(236,72,153,.1);border:1px solid rgba(236,72,153,.4);color:#ec4899;border-radius:8px;padding:6px 8px;cursor:pointer;font-size:13px;display:flex;align-items:center;justify-content:center;gap:5px;transition:.2s;font-family:Inter,sans-serif;';
  ultraBtn.onmouseover = function() { ultraBtn.style.background = 'rgba(236,72,153,.22)'; };
  ultraBtn.onmouseout = function() { ultraBtn.style.background = 'rgba(236,72,153,.1)'; };
  toolbar.appendChild(ultraBtn);

  // Insert right after the IA Ultra header
  var ultraStatus = container.querySelector('#ultra-status');
  var header = ultraStatus ? ultraStatus.closest('div') : null;
  while (header && header.parentNode !== container) { header = header.parentNode; }
  if (header && header.parentNode === container) {
    container.insertBefore(toolbar, header.nextSibling);
  } else {
    var ref = container.children[2] || container.firstChild;
    container.insertBefore(toolbar, ref || null);
  }

  // Build and attach modals
  var vaultModal = buildVaultModal(container, isFr);
  var toolsModal = buildToolsModal(container, isFr);
  container.appendChild(vaultModal);
  container.appendChild(toolsModal);

  // Build Tools Ultra Modal container
  var ultraToolsModal = document.createElement('div');
  ultraToolsModal.id = 'v5-ultra-tools-modal';
  ultraToolsModal.style = 'position:absolute;inset:0;z-index:900;background:rgba(3,5,9,.97);backdrop-filter:blur(20px);display:none;flex-direction:column;';
  var utHdr = document.createElement('div');
  utHdr.style = 'padding:16px 20px 12px;border-bottom:1px solid rgba(236,72,153,.2);display:flex;justify-content:space-between;align-items:center;flex-shrink:0;';
  utHdr.innerHTML = '<div><div style="font-size:14px;font-weight:900;color:#ec4899">⚡ Tools Ultra</div><div style="font-size:10px;color:#64748b;margin-top:2px">Advanced Functions</div></div><button id="v5-ut-close" style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:#fff;border-radius:8px;padding:5px 14px;cursor:pointer;font-size:12px;">✕ '+(isFr?'Fermer':'Close')+'</button>';
  ultraToolsModal.appendChild(utHdr);
  var utBody = document.createElement('div');
  utBody.style = 'flex:1;overflow-y:auto;padding:15px;display:flex;flex-direction:column;gap:15px;background:linear-gradient(180deg,rgba(236,72,153,0.03),transparent)';
  ultraToolsModal.appendChild(utBody);
  container.appendChild(ultraToolsModal);
  utHdr.querySelector('#v5-ut-close').onclick = function(){ ultraToolsModal.style.display='none'; };

  // ── TOOLBAR 2 — 6 nouvelles fonctions ──
  var toolbar2 = document.createElement('div');
  toolbar2.id = 'v5-toolbar2';
  toolbar2.style = 'display:flex;gap:4px;padding:5px 10px;background:rgba(0,0,0,.4);border-bottom:1px solid rgba(139,92,246,.1);flex-shrink:0;z-index:10;position:relative;flex-wrap:wrap;';

  function mkBtn2(id, icon, label, bg, border, color) {
    var b = document.createElement('button');
    b.id = id;
    b.innerHTML = icon + ' <span style="font-size:9px;font-weight:700">' + label + '</span>';
    b.style = 'flex:1;min-width:70px;background:' + bg + ';border:1px solid ' + border + ';color:' + color + ';border-radius:7px;padding:5px 3px;cursor:pointer;font-size:10px;display:flex;align-items:center;justify-content:center;gap:3px;transition:.2s;font-family:Inter,sans-serif;';
    b.onmouseover = function() { b.style.filter = 'brightness(1.5)'; };
    b.onmouseout  = function() { b.style.filter = ''; };
    return b;
  }
  var benchBtn   = mkBtn2('v5-bench-btn',   '⏱️', 'Benchmark',  'rgba(6,182,212,.08)',   'rgba(6,182,212,.35)',   '#06b6d4');
  var cinemaBtn  = mkBtn2('v5-cinema-btn',  '🎬', 'Cinematics', 'rgba(236,72,153,.08)',  'rgba(236,72,153,.35)',  '#ec4899');
  var dnaBtn     = mkBtn2('v5-dna-btn',     '🧬', 'DNA Remix',  'rgba(16,185,129,.08)',  'rgba(16,185,129,.35)',  '#10b981');
  var personaBtn = mkBtn2('v5-persona-btn', '🎭', 'Persona',    'rgba(251,191,36,.08)',  'rgba(251,191,36,.35)',  '#fbbf24');
  var paBtn      = mkBtn2('v5-pa-btn',      '🗺️', 'Page Arch',  'rgba(139,92,246,.08)',  'rgba(139,92,246,.35)',  '#a78bfa');
  var icBtn      = mkBtn2('v5-ic-btn',      '📸', 'Img→Code',   'rgba(245,158,11,.08)',  'rgba(245,158,11,.35)',  '#f59e0b');

  toolbar2.appendChild(benchBtn);
  toolbar2.appendChild(cinemaBtn);
  toolbar2.appendChild(dnaBtn);
  toolbar2.appendChild(personaBtn);
  toolbar2.appendChild(paBtn);
  toolbar2.appendChild(icBtn);

  // Insert toolbar2 into Ultra Tools Modal instead of container
  utBody.appendChild(toolbar2);

  // Build new modals
  var benchModal   = buildBenchmarkModal(container, isFr);
  var cinemaModal  = buildCinematicsModal(container, isFr);
  var dnaModal     = buildDNAModal(container, isFr);
  var personaModal = buildPersonaModal(container, isFr);
  var paModal      = buildPageArchitectModal(container, isFr);
  var icModal      = buildImageToCodeModal(container, isFr);

  // ── RESPONSIVE MATRIX MODAL BUILDER ──
  function buildResponsiveMatrixModal(c, fr) {
    var m = document.createElement('div');
    m.id = 'v5-rm-modal';
    m.style = 'position:absolute;inset:0;z-index:900;background:rgba(3,5,9,.97);backdrop-filter:blur(20px);display:none;flex-direction:column;';
    var h = document.createElement('div');
    h.style = 'padding:16px 20px 12px;border-bottom:1px solid rgba(16,185,129,.2);display:flex;justify-content:space-between;align-items:center;flex-shrink:0;';
    h.innerHTML = '<div><div style="font-size:14px;font-weight:900;color:#10b981">📱 Responsive Matrix</div><div style="font-size:10px;color:#64748b;margin-top:2px">Live Device Simulator</div></div><button id="v5-rm-close" style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:#fff;border-radius:8px;padding:5px 14px;cursor:pointer;font-size:12px;">✕ '+(fr?'Fermer':'Close')+'</button>';
    m.appendChild(h);

    var b = document.createElement('div');
    b.style = 'flex:1;padding:30px;display:flex;gap:40px;justify-content:flex-start;align-items:center;background:#cbd5e1;overflow-x:auto;';
    
    function mkDevice(label, w, ht, br, bw) {
      var d = document.createElement('div');
      d.style = 'flex-shrink:0;width:'+w+'px;height:'+ht+'px;background:#fff;border-radius:'+br+'px;border:'+bw+'px solid #1e293b;position:relative;box-shadow:0 25px 50px rgba(0,0,0,.15);overflow:hidden;display:flex;flex-direction:column;';
      var t = document.createElement('div');
      t.innerHTML = label;
      t.style = 'background:#1e293b;color:#f8fafc;font-size:10px;font-weight:800;text-align:center;padding:5px 0;flex-shrink:0;text-transform:uppercase;';
      d.appendChild(t);
      var ifr = document.createElement('iframe');
      ifr.style = 'flex:1;width:100%;border:none;background:#fff;';
      d.appendChild(ifr);
      return {div: d, ifr: ifr};
    }
    window.v5rmD1 = mkDevice('iPhone 15 Pro', 320, 650, 40, 14);
    window.v5rmD2 = mkDevice('iPad Pro', 500, 700, 30, 8);
    window.v5rmD3 = mkDevice('Desktop', 800, 500, 20, 8);

    b.appendChild(window.v5rmD1.div); b.appendChild(window.v5rmD2.div); b.appendChild(window.v5rmD3.div);
    m.appendChild(b);

    h.querySelector('#v5-rm-close').onclick = function() { m.style.display = 'none'; };
    return m;
  }
  var rmModal = buildResponsiveMatrixModal(container, isFr);

  container.appendChild(benchModal);
  container.appendChild(cinemaModal);
  container.appendChild(dnaModal);
  container.appendChild(personaModal);
  container.appendChild(paModal);
  container.appendChild(icModal);
  container.appendChild(rmModal);

  // ── TOOLBAR 3 — ACTIVE POWER TOOLS ──
  var toolbar3 = document.createElement('div');
  toolbar3.id = 'v5-toolbar3';
  toolbar3.style = 'display:flex;gap:4px;padding:5px 10px;background:rgba(0,0,0,.5);border-bottom:1px solid rgba(139,92,246,.1);flex-shrink:0;z-index:10;position:relative;flex-wrap:wrap;';

  var healthBtn = mkBtn2('v5-health-btn', '🩺', 'Health', 'rgba(239,68,68,.08)', 'rgba(239,68,68,.35)', '#ef4444');
  var rmBtn = mkBtn2('v5-rm-btn', '📱', 'Matrix', 'rgba(16,185,129,.08)', 'rgba(16,185,129,.35)', '#10b981');
  var apiBtn = mkBtn2('v5-api-btn', '🗄️', 'API', 'rgba(245,158,11,.08)', 'rgba(245,158,11,.35)', '#f59e0b');
  var gsapBtn = mkBtn2('v5-gsap-btn', '🎬', 'GSAP', 'rgba(236,72,153,.08)', 'rgba(236,72,153,.35)', '#ec4899');
  var holoBtn = mkBtn2('v5-holo-btn', '🧊', 'Holo-3D', 'rgba(59,130,246,.08)', 'rgba(59,130,246,.35)', '#3b82f6');
  var nodeBtn = mkBtn2('v5-node-btn', '🔀', 'Nodes', 'rgba(6,182,212,.08)', 'rgba(6,182,212,.35)', '#06b6d4');
  var canvasBtn = mkBtn2('v5-canvas-btn', '🌠', 'Canvas', 'rgba(139,92,246,.08)', 'rgba(139,92,246,.35)', '#8b5cf6');

  toolbar3.appendChild(healthBtn);
  toolbar3.appendChild(rmBtn);
  toolbar3.appendChild(apiBtn);
  toolbar3.appendChild(gsapBtn);
  toolbar3.appendChild(holoBtn);
  toolbar3.appendChild(nodeBtn);
  toolbar3.appendChild(canvasBtn);

  utBody.appendChild(toolbar3);

  // ── TOOLBAR 4 — HYPER TOOLS ──
  var toolbar4 = document.createElement('div');
  toolbar4.id = 'v5-toolbar4';
  toolbar4.style = 'display:flex;gap:4px;padding:5px 10px;background:rgba(0,0,0,.6);border-bottom:1px solid rgba(139,92,246,.1);flex-shrink:0;z-index:10;position:relative;flex-wrap:wrap;';

  var hmBtn = mkBtn2('v5-hm-btn', '👁️', 'Heatmap', 'rgba(239,68,68,.08)', 'rgba(239,68,68,.35)', '#ef4444');
  var hapBtn = mkBtn2('v5-hap-btn', '🎵', 'Haptic', 'rgba(16,185,129,.08)', 'rgba(16,185,129,.35)', '#10b981');
  var dmBtn = mkBtn2('v5-dm-btn', '🌗', 'Dark Mode', 'rgba(245,158,11,.08)', 'rgba(245,158,11,.35)', '#f59e0b');
  var ldbBtn = mkBtn2('v5-ldb-btn', '🗃️', 'LocalDB', 'rgba(59,130,246,.08)', 'rgba(59,130,246,.35)', '#3b82f6');

  toolbar4.appendChild(hmBtn);
  toolbar4.appendChild(hapBtn);
  toolbar4.appendChild(dmBtn);
  toolbar4.appendChild(ldbBtn);

  utBody.appendChild(toolbar4);

  // Unified close-all helper
  function closeAll() {
    var allModals = [vaultModal, toolsModal, ultraToolsModal, benchModal, cinemaModal, dnaModal, personaModal, paModal, icModal, rmModal];
    allModals.forEach(function(m) { if (m) m.style.display = 'none'; });
  }

  // Wire all 8 original buttons
  vaultBtn.onclick   = function() { closeAll(); vaultModal.style.display  = 'flex'; };
  toolsBtn.onclick   = function() { closeAll(); toolsModal.style.display  = 'flex'; };
  ultraBtn.onclick   = function() { closeAll(); ultraToolsModal.style.display = 'flex'; };
  benchBtn.onclick   = function() { closeAll(); benchModal.style.display  = 'flex'; };
  cinemaBtn.onclick  = function() { closeAll(); cinemaModal.style.display = 'flex'; };
  dnaBtn.onclick     = function() { closeAll(); dnaModal.style.display    = 'flex'; };
  personaBtn.onclick = function() { closeAll(); personaModal.style.display = 'flex'; };
  paBtn.onclick      = function() { closeAll(); paModal.style.display     = 'flex'; };
  icBtn.onclick      = function() { closeAll(); icModal.style.display     = 'flex'; };

  // Wire new Power Tools
  healthBtn.onclick = function() { closeAll(); benchModal.style.display = 'flex'; }; // Uses existing benchmark logic internally
  rmBtn.onclick = function() { 
    closeAll(); 
    rmModal.style.display = 'flex';
    var currentCode = getCode();
    window.v5rmD1.ifr.srcdoc = currentCode || '<h1>No Code</h1>';
    window.v5rmD2.ifr.srcdoc = currentCode || '<h1>No Code</h1>';
    window.v5rmD3.ifr.srcdoc = currentCode || '<h1>No Code</h1>';
  };
  apiBtn.onclick    = function() { ToolsImpl.api(isFr); closeAll(); };
  gsapBtn.onclick   = function() { ToolsImpl.gsap(isFr); closeAll(); };
  holoBtn.onclick   = function() { ToolsImpl.holo(isFr); closeAll(); };
  nodeBtn.onclick   = function() { ToolsImpl.node(isFr); closeAll(); };
  canvasBtn.onclick = function() { ToolsImpl.canvas(isFr); closeAll(); };

  hmBtn.onclick = function() { ToolsImpl.heatmap(isFr); closeAll(); };
  hapBtn.onclick = function() { ToolsImpl.haptic(isFr); closeAll(); };
  dmBtn.onclick = function() { ToolsImpl.darkmode(isFr); closeAll(); };
  ldbBtn.onclick = function() { ToolsImpl.localdb(isFr); closeAll(); };
}

/* ══════════════════════════════════ HOOK INIT ══ */
function hookUltraTab() {
  // PRIMARY: wrap window.renderIAUltra so injection fires after every tab switch
  function wrapRenderFn() {
    if (!window.renderIAUltra) { setTimeout(wrapRenderFn, 80); return; }
    var orig = window.renderIAUltra;
    window.renderIAUltra = function(container) {
      orig(container);
      setTimeout(function() { addV5Panels(container); }, 150);
    };
  }
  wrapRenderFn();

  // FALLBACK: poll every 700ms — catches cases where IA ULTRA is already displayed
  var pollCount = 0;
  var poll = setInterval(function() {
    pollCount++;
    if (pollCount > 60) { clearInterval(poll); return; }
    var body = document.getElementById('left-body');
    if (!body) return;
    if (body.querySelector('#ultra-status') && !body.querySelector('#v5-toolbar')) {
      clearInterval(poll);
      addV5Panels(body);
    }
  }, 700);
}

// Expose globally for emergency manual use
window.addV5Panels = addV5Panels;
window.buildMultiPage = buildMultiPage;
window.injectCode = injectCode;
window.getCode = getCode;

// Init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', hookUltraTab);
} else {
  hookUltraTab();
}

})(window);
