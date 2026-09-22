(function() {
'use strict';

/* ═══════════════════════════════════════════════════
   COMMAND PALETTE v1.0 — Ctrl+K universal launcher
   Fast navigation to any module or action.
   ═══════════════════════════════════════════════════ */

var CP_OPEN = false;

// ─── Command Registry ──────────────────────────────────────────────────
var COMMANDS = [
  // Modules — open tab
  { icon:'🎙️', en:'Voice AI — Dictate or type code', fr:'Voice AI — Dictez ou tapez du code', tags:'voice vocal mic microphone speak navbar nav hero', tab:'voice', cat:'module' },
  { icon:'🔗', en:'Node Logic — Visual logic builder', fr:'Logique Visuelle — Constructeur de blocs', tags:'node logic bloc javascript visual flow', tab:'nodelogic', cat:'module' },
  { icon:'🗃️', en:'DB Architect — Design database schema', fr:'Architecte BD — Conception de BDD', tags:'db database schema table backend api', tab:'dbarch', cat:'module' },
  { icon:'📚', en:'Auto-Docs — Generate README.md', fr:'Auto-Doc — Générer README.md', tags:'doc readme markdown documentation', tab:'autodocs', cat:'module' },
  { icon:'✒️', en:'SVG Studio — Generate vector icons', fr:'Studio SVG — Générer des icônes', tags:'svg vector icon icone shape', tab:'svgstudio', cat:'module' },
  { icon:'📱', en:'Social Preview — Twitter & Facebook', fr:'Aperçu Social — Twitter & Facebook', tags:'social twitter facebook linkedin og meta', tab:'social', cat:'module' },
  { icon:'🚀', en:'AI Promo Launch — Marketing posts', fr:'Lancement Promo IA — Posts marketing', tags:'promo launch marketing campaign tiktok email', tab:'promo', cat:'module' },
  { icon:'🛡️', en:'Code Audit — Security & SEO scan', fr:'Audit Code — Scanner sécurité & SEO', tags:'audit scan security seo performance fix', tab:'audit', cat:'module' },
  { icon:'⚡', en:'IA ULTRA — Full AI code generation', fr:'IA ULTRA — Génération IA complète', tags:'ultra generate full site landing page', tab:'iaultra', cat:'module' },
  { icon:'💎', en:'IA PRO — Professional templates', fr:'IA PRO — Templates professionnels', tags:'pro template professional manufacturing', tab:'iapro', cat:'module' },
  { icon:'⏱️', en:'1-Min App — Quick app builder', fr:'App 1-Min — Créateur rapide', tags:'onemin 1min quick fast app', tab:'onemin', cat:'module' },
  { icon:'🪄', en:'App Wizard — Guided app creation', fr:'Assistant App — Création guidée', tags:'wizard app creation guided', tab:'wizard', cat:'module' },
  { icon:'🕰️', en:'Time Machine — Version history', fr:'Machine à Remonter le Temps — Historique', tags:'time machine history version undo snapshot', tab:'tm', cat:'module' },
  { icon:'📷', en:'Vision — Screenshot to code', fr:'Vision — Capture d\'écran vers code', tags:'vision screenshot photo image to code', tab:'vision', cat:'module' },
  { icon:'🎨', en:'Style Lab — Design tokens & CSS vars', fr:'Style Lab — Tokens de design', tags:'style lab css design token color', tab:'stylelab', cat:'module' },
  { icon:'🎲', en:'3D WebGL — Three.js architect', fr:'3D WebGL — Architecte Three.js', tags:'3d webgl three threejs architect', tab:'3d', cat:'module' },
  { icon:'🎨', en:'Animation Studio — CSS animations', fr:'Studio Animation — Animations CSS', tags:'animation css keyframe transition', tab:'animation', cat:'module' },
  { icon:'🔠', en:'Transcode — Convert code formats', fr:'Transcode — Convertir les formats', tags:'transcode convert format json html css', tab:'transcode', cat:'module' },
  { icon:'🌐', en:'Domain Hub — Domain & hosting tools', fr:'Hub Domaine — Outils domaine & hébergement', tags:'domain hosting dns deploy website', tab:'domain', cat:'module' },
  { icon:'📊', en:'Architecture Visualizer — Flowchart', fr:'Visualiseur Architecture — Diagramme', tags:'architecture flowchart diagram structure', tab:'arch', cat:'module' },
  { icon:'🧑‍💻', en:'Code Collab — Live collaboration', fr:'Collab Code — Collaboration en direct', tags:'collab collaboration live share realtime', tab:'collab', cat:'module' },
  { icon:'📁', en:'Project Manager — Manage projects', fr:'Gestionnaire Projets — Gérer les projets', tags:'project manager save load', tab:'pm', cat:'module' },
  { icon:'🤖', en:'AI Chat Context — Smart AI assistant', fr:'Chat IA — Assistant IA contextuel', tags:'chat ai context smart assistant', tab:'chat', cat:'module' },

  // Actions — run function
  { icon:'✨', en:'Beautify Code — Auto format', fr:'Embellir le Code — Formater auto', tags:'beautify format pretty code', action:function(){ var b=document.getElementById('mbtn-beautify'); if(b) b.click(); }, cat:'action' },
  { icon:'📱', en:'Auto Mobile — Make responsive', fr:'Mobile Auto — Rendre responsive', tags:'mobile responsive auto', action:function(){ var b=document.getElementById('mbtn-mobile'); if(b) b.click(); }, cat:'action' },
  { icon:'🌙', en:'Dark Mode — Toggle dark theme', fr:'Mode Sombre — Activer le thème sombre', tags:'dark mode night theme', action:function(){ var b=document.getElementById('mbtn-darkmode')||document.getElementById('mbtn-dark'); if(b) b.click(); }, cat:'action' },
  { icon:'🔍', en:'Smart SEO — Inject meta tags', fr:'SEO Intelligent — Injecter balises meta', tags:'seo meta tags inject', action:function(){ var b=document.getElementById('mbtn-seo'); if(b) b.click(); }, cat:'action' },
  { icon:'📦', en:'Export All — Download app as HTML', fr:'Exporter Tout — Télécharger en HTML', tags:'export download html save', action:function(){ var b=document.getElementById('mbtn-export')||document.getElementById('btn-export-all'); if(b) b.click(); }, cat:'action' },
  { icon:'🚀', en:'Deploy — Get shareable link', fr:'Déployer — Obtenir un lien partageable', tags:'deploy share link publish', action:function(){ var b=document.getElementById('mbtn-deploy')||document.getElementById('btn-deploy'); if(b) b.click(); }, cat:'action' },
  { icon:'▶️', en:'Run Preview — Execute code', fr:'Lancer Aperçu — Exécuter le code', tags:'run preview execute refresh', action:function(){ if(window.runPreview) window.runPreview(); }, cat:'action' },
  { icon:'💾', en:'Save — Save current code', fr:'Sauvegarder — Sauvegarder le code', tags:'save code file', action:function(){ var b=document.getElementById('btn-save'); if(b) b.click(); }, cat:'action' },
  { icon:'🤖', en:'Open IA Guide Bot — AI assistant chat', fr:'Ouvrir IA Guide Bot — Chat assistant IA', tags:'bot guide help assistant chat', action:function(){ if(window.IAGuideBot) window.IAGuideBot.toggle(); }, cat:'action' },

  // EN/FR switch
  { icon:'🇬🇧', en:'Switch to English', fr:'Passer en Anglais', tags:'english langue language en switch', action:function(){ var b=document.querySelector('[data-lang="en"]')||document.getElementById('btn-lang-en'); if(b) b.click(); else { window.lang='en'; if(window.applyLang) window.applyLang(); } }, cat:'settings' },
  { icon:'🇫🇷', en:'Switch to French', fr:'Passer en Français', tags:'french francais fr langue switch', action:function(){ var b=document.querySelector('[data-lang="fr"]')||document.getElementById('btn-lang-fr'); if(b) b.click(); else { window.lang='fr'; if(window.applyLang) window.applyLang(); } }, cat:'settings' }
];

var CAT_COLORS = { module: '#8b5cf6', action: '#10b981', settings: '#f59e0b' };
var CAT_LABELS = { en: { module: 'Modules', action: 'Actions', settings: 'Settings' }, fr: { module: 'Modules', action: 'Actions', settings: 'Paramètres' } };

function gl() { return window.lang || 'en'; }

// ─── Filter Commands ───────────────────────────────────────────────────
function filterCommands(query) {
  if (!query.trim()) return COMMANDS.slice(0, 12);
  var q = query.toLowerCase();
  return COMMANDS.filter(function(cmd) {
    var label = gl()==='fr' ? cmd.fr : cmd.en;
    return label.toLowerCase().includes(q) || (cmd.tags && cmd.tags.includes(q.split(' ')[0]));
  }).slice(0, 12);
}

// ─── Execute Command ───────────────────────────────────────────────────
function executeCommand(cmd) {
  closePalette();
  if (cmd.tab && window.renderTab) {
    window.renderTab(cmd.tab);
  } else if (cmd.action) {
    setTimeout(cmd.action, 50);
  }
}

// ─── Render Results ────────────────────────────────────────────────────
var selectedIdx = 0;
function renderResults(query) {
  var list = document.getElementById('cp-list');
  if (!list) return;
  list.innerHTML = '';

  var results = filterCommands(query);
  if (results.length === 0) {
    list.innerHTML = '<div style="padding:20px;text-align:center;color:#475569;font-size:12px;">' + (gl()==='fr'?'Aucun résultat':'No results') + '</div>';
    return;
  }

  // Group by category
  var grouped = {};
  results.forEach(function(cmd) { if(!grouped[cmd.cat]) grouped[cmd.cat]=[]; grouped[cmd.cat].push(cmd); });
  var flatIdx = 0;

  Object.keys(grouped).forEach(function(cat) {
    // Category label
    var catLabel = document.createElement('div');
    catLabel.style = 'font-size:9px;font-weight:bold;color:' + CAT_COLORS[cat] + ';padding:8px 14px 4px;text-transform:uppercase;letter-spacing:1px;';
    catLabel.textContent = (CAT_LABELS[gl()] || CAT_LABELS.en)[cat] || cat;
    list.appendChild(catLabel);

    grouped[cat].forEach(function(cmd) {
      var idx = flatIdx++;
      var item = document.createElement('div');
      item.className = 'cp-item';
      item.dataset.idx = idx;
      item.style = 'padding:9px 14px;display:flex;align-items:center;gap:10px;cursor:pointer;border-radius:8px;margin:1px 6px;transition:background 0.1s;' +
        (idx===selectedIdx ? 'background:rgba(139,92,246,0.2);border:1px solid #8b5cf6;' : 'background:transparent;border:1px solid transparent;');

      var iconEl = document.createElement('span');
      iconEl.style = 'font-size:16px;flex-shrink:0;';
      iconEl.textContent = cmd.icon;

      var textEl = document.createElement('div');
      textEl.style = 'flex:1;';
      var mainText = document.createElement('div');
      mainText.style = 'font-size:12px;color:#e2e8f0;font-weight:500;';
      mainText.textContent = gl()==='fr' ? cmd.fr : cmd.en;
      var subText = document.createElement('div');
      subText.style = 'font-size:9px;color:#64748b;margin-top:1px;';
      subText.textContent = cmd.tab ? ('Tab: ' + cmd.tab) : 'Action';

      textEl.appendChild(mainText);
      textEl.appendChild(subText);

      var kbEl = document.createElement('div');
      kbEl.style = 'font-size:9px;color:#475569;background:#1e293b;padding:2px 6px;border-radius:4px;';
      kbEl.textContent = '↵';

      item.appendChild(iconEl);
      item.appendChild(textEl);
      item.appendChild(kbEl);

      item.onmouseover = function() { selectedIdx = parseInt(this.dataset.idx); renderResults(document.getElementById('cp-input').value); };
      item.onclick = function() { executeCommand(cmd); };

      list.appendChild(item);
    });
  });
}

// ─── Toggle Palette ────────────────────────────────────────────────────
function openPalette() {
  var overlay = document.getElementById('cp-overlay');
  if (!overlay) { buildPalette(); overlay = document.getElementById('cp-overlay'); }
  overlay.style.display = 'flex';
  CP_OPEN = true;
  selectedIdx = 0;
  var inp = document.getElementById('cp-input');
  if (inp) { inp.value = ''; inp.focus(); }
  renderResults('');
}

function closePalette() {
  var overlay = document.getElementById('cp-overlay');
  if (overlay) overlay.style.display = 'none';
  CP_OPEN = false;
}

// ─── Build Palette UI ──────────────────────────────────────────────────
function buildPalette() {
  if (document.getElementById('cp-overlay')) return;

  // Inject CSS
  var style = document.createElement('style');
  style.textContent = '#cp-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(6px);z-index:9999999;display:none;align-items:flex-start;justify-content:center;padding-top:80px;}' +
    '#cp-box{background:#0f172a;border:1px solid rgba(139,92,246,0.5);border-radius:14px;width:520px;max-width:95vw;box-shadow:0 30px 80px rgba(0,0,0,0.8);overflow:hidden;}' +
    '#cp-search{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid #1e293b;}' +
    '#cp-input{flex:1;background:transparent;border:none;outline:none;color:#e2e8f0;font-size:15px;font-family:sans-serif;}' +
    '#cp-input::placeholder{color:#475569;}' +
    '#cp-list{max-height:380px;overflow-y:auto;padding:6px 0;}' +
    '#cp-footer{padding:8px 14px;border-top:1px solid #1e293b;display:flex;gap:16px;font-size:9px;color:#475569;}';
  document.head.appendChild(style);

  var overlay = document.createElement('div');
  overlay.id = 'cp-overlay';
  overlay.onclick = function(e) { if(e.target===overlay) closePalette(); };

  var box = document.createElement('div');
  box.id = 'cp-box';

  // Search bar
  var search = document.createElement('div');
  search.id = 'cp-search';
  var searchIcon = document.createElement('span');
  searchIcon.style = 'font-size:16px;color:#64748b;';
  searchIcon.textContent = '🔍';
  var searchInp = document.createElement('input');
  searchInp.id = 'cp-input';
  searchInp.placeholder = gl()==='fr'?'Rechercher un module ou une action...':'Search for a module or action...';
  searchInp.oninput = function() { selectedIdx=0; renderResults(this.value); };
  searchInp.onkeydown = function(e) {
    var items = document.querySelectorAll('.cp-item');
    if (e.key==='ArrowDown') { selectedIdx=Math.min(selectedIdx+1,items.length-1); renderResults(this.value); e.preventDefault(); }
    if (e.key==='ArrowUp') { selectedIdx=Math.max(selectedIdx-1,0); renderResults(this.value); e.preventDefault(); }
    if (e.key==='Enter') {
      var results = filterCommands(this.value);
      var flat = [];
      var grouped = {};
      results.forEach(function(cmd){if(!grouped[cmd.cat])grouped[cmd.cat]=[];grouped[cmd.cat].push(cmd);});
      Object.keys(grouped).forEach(function(c){grouped[c].forEach(function(cmd){flat.push(cmd);});});
      if (flat[selectedIdx]) executeCommand(flat[selectedIdx]);
    }
    if (e.key==='Escape') closePalette();
  };
  var kbHint = document.createElement('span');
  kbHint.style = 'font-size:10px;color:#475569;background:#1e293b;padding:3px 7px;border-radius:4px;white-space:nowrap;';
  kbHint.textContent = 'ESC';
  search.appendChild(searchIcon);
  search.appendChild(searchInp);
  search.appendChild(kbHint);

  // List
  var list = document.createElement('div');
  list.id = 'cp-list';

  // Footer
  var footer = document.createElement('div');
  footer.id = 'cp-footer';
  footer.innerHTML = '<span>↑↓ Navigate</span><span>↵ Select</span><span>ESC Close</span><span>Ctrl+K Toggle</span>';

  box.appendChild(search);
  box.appendChild(list);
  box.appendChild(footer);
  overlay.appendChild(box);
  document.body.appendChild(overlay);
}

// ─── Keyboard Shortcut ─────────────────────────────────────────────────
document.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    if (CP_OPEN) { closePalette(); } else { openPalette(); }
  }
  if (e.key === 'Escape' && CP_OPEN) closePalette();
});

// ─── Init ──────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(buildPalette, 600);
});
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(buildPalette, 600);
}

window.CommandPalette = { open: openPalette, close: closePalette };
})();
