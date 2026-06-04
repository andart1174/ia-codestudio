(function() {
'use strict';

/* ═══════════════════════════════════════════════════
   IA GUIDE BOT v2.0 — Smart bilingual in-app assistant
   Knows every module, visual onboarding tour, bilingual.
   ═══════════════════════════════════════════════════ */

var BOT_OPEN = false;
var CHAT_HISTORY = [];
var TOUR_ACTIVE = false;
var TOUR_STEP = 0;

var TOUR_STEPS_DATA = {
  en: [
    {
      title: "🚀 Welcome to IA Architecte!",
      desc: "This is your premium multi-studio development platform. Let's take a quick 1-minute visual tour to get you started!",
      target: null,
      pos: { left: "50%", top: "50%" }
    },
    {
      title: "📁 Sidebar Explorer",
      desc: "All 350+ premium modules are organized here inside categories. Click any category folder to expand and access its tools.",
      target: "#left-panel",
      arrow: "arrow-left",
      pos: { left: "280px", top: "25%" }
    },
    {
      title: "💻 Monaco Code Editor",
      desc: "This is where your source code lives. You can write code manually or watch the AI generate complete projects for you.",
      target: "#monaco-container",
      arrow: "arrow-left",
      pos: { left: "300px", top: "40%" }
    },
    {
      title: "⚡ Live Preview Panel",
      desc: "Your application runs live instantly in this right-hand frame. Changes update in real-time as you write code.",
      target: ".right-panel",
      arrow: "arrow-right",
      pos: { right: "320px", top: "30%" }
    },
    {
      title: "🤖 IA Guide Bot",
      desc: "I am always here to assist. Ask me anything like 'How to use Voxel Extruder' or browse categories anytime. Happy coding!",
      target: "#iagb-fab",
      arrow: "arrow-bottom",
      pos: { right: "30px", bottom: "90px" }
    }
  ],
  fr: [
    {
      title: "🚀 Bienvenue sur IA Architecte !",
      desc: "C'est votre plateforme premium de développement multi-studios. Faisons un rapide tour d'une minute pour commencer !",
      target: null,
      pos: { left: "50%", top: "50%" }
    },
    {
      title: "📁 Explorateur Latéral",
      desc: "Plus de 350 modules premium sont organisés ici par catégories. Cliquez sur un dossier pour le déplier et accéder aux outils.",
      target: "#left-panel",
      arrow: "arrow-left",
      pos: { left: "280px", top: "25%" }
    },
    {
      title: "💻 Éditeur de Code Monaco",
      desc: "C'est ici que vit votre code source. Écrivez du code manuellement ou laissez l'IA générer des projets complets.",
      target: "#monaco-container",
      arrow: "arrow-left",
      pos: { left: "300px", top: "40%" }
    },
    {
      title: "⚡ Aperçu Live Interactif",
      desc: "Votre application s'exécute en direct dans ce panneau de droite. Les changements se mettent à jour instantanément.",
      target: ".right-panel",
      arrow: "arrow-right",
      pos: { right: "320px", top: "30%" }
    },
    {
      title: "🤖 IA Guide Bot",
      desc: "Je suis toujours disponible en bas à droite. Demandez-moi comment utiliser un outil ou parcourez les rubriques à tout moment !",
      target: "#iagb-fab",
      arrow: "arrow-bottom",
      pos: { right: "30px", bottom: "90px" }
    }
  ]
};

// ─── Legacy Knowledge Base Fallback ─────────────────────────────────────────
var KB = {
  en: {
    greeting: "👋 Hi! I'm **IA Guide**, your studio assistant.\n\nI know **every tool** in this app — over 350 modules across all categories. Ask me anything like:\n- *\"What is the Asset Optimizer?\"*\n- *\"How do I use the Neural Network Sandbox?\"*\n- *\"Open Voxel Extruder\"*\n- *\"Start Guided Tour\"*\n\nOr click **All Modules** to browse by category!",
    unknown: "I'm not sure about that. Try asking about a specific module (e.g. \"Asset Optimizer\", \"Neural Sandbox\", \"Mesh Gradient\"), or type **help** to browse all categories.",
    help: "__CATEGORIES__",
    modules: {
      export: { open: null, text: "📦 **Exporting your app:**\n\n1. Click **Export All** in the top toolbar\n2. Your app is downloaded as a standalone HTML file\n3. Works offline, no server needed!\n\nOr use **Deploy** to get a shareable link." },
      shortcut: { open: null, text: "⌨️ **Keyboard Shortcuts:**\n\n`Ctrl+K` → Open Command Palette (search any tool)\n`Ctrl+S` → Save code\n`Ctrl+Z` → Undo\n`F5` → Run Preview\n\nThe Command Palette is the fastest way to navigate the studio!" }
    }
  },
  fr: {
    greeting: "👋 Bonjour ! Je suis **IA Guide**, votre assistant studio.\n\nJe connais **chaque outil** de cette application — plus de 350 modules. Posez-moi n'importe quelle question :\n- *\"Qu'est-ce que l'Asset Optimizer ?\"*\n- *\"Comment utiliser le Neural Network Sandbox ?\"*\n- *\"Ouvrir Extrudeur Voxel\"*\n- *\"Lancer la Visite Guidée\"*\n\nOu cliquez **Tous les modules** pour parcourir par catégorie !",
    unknown: "Je ne suis pas sûr de cela. Essayez de demander sur un module spécifique (ex : \"Asset Optimizer\", \"Neural Sandbox\", \"Mesh Gradient\"), ou tapez **aide** pour voir toutes les catégories.",
    help: "Voici tous les modules disponibles en tapant la catégorie ou en cliquant ci-dessous !",
    modules: {
      export: { open: null, text: "📦 **Exporter votre app :**\n\n1. Cliquez **Export All** dans la barre du haut\n2. Votre app est téléchargée en HTML autonome\n3. Fonctionne hors ligne, sans serveur !\n\nOu utilisez **Deploy** pour un lien partageable." },
      shortcut: { open: null, text: "⌨️ **Raccourcis clavier :**\n\n`Ctrl+K` → Ouvrir la Palette de Commandes\n`Ctrl+S` → Sauvegarder\n`Ctrl+Z` → Annuler\n`F5` → Lancer l'aperçu\n\nLa Palette de Commandes est la façon la plus rapide de naviguer !" }
    }
  }
};

function gl() { return window.lang || 'en'; }
function kb() { return KB[gl()] || KB.en; }

// ─── Intent Matching ───────────────────────────────────────────────────
function matchIntent(msg) {
  var m = msg.toLowerCase().trim();
  var k = kb();

  // Greetings
  if (m.match(/\b(hi|hello|bonjour|salut|hey|howdy)\b/)) return { type: 'text', data: k.greeting };
  // Help / categories
  if (m.match(/\b(help|aide|tools|outils|all|tous|list|liste|modules|what can)\b/)) return { type: 'categories' };
  // Onboarding Tour
  if (m.match(/\b(tour|visite|guide|onboarding|tutorial|tuto)\b/)) return { type: 'tour' };
  // Shortcuts
  if (m.match(/\b(shortcut|raccourci|ctrl|keyboard|clavier)\b/)) return { type: 'text', data: k.modules.shortcut.text };
  // Export
  if (m.match(/\b(export|download|deploy|share|partage|télécharge)\b/)) return { type: 'text', data: k.modules.export.text };

  // Search GK modules by keyword in the active language
  if (window.GK) {
    var langKey = gl();
    var gk = window.GK[langKey] || window.GK.en;
    if (gk) {
      var keys = Object.keys(gk);
      for (var i = 0; i < keys.length; i++) {
        var mod = gk[keys[i]];
        var nameWords = mod.name.toLowerCase().split(/\s+/);
        // Match exact key or any word in the module name
        var matched = nameWords.some(function(w) { return w.length > 2 && m.includes(w); });
        if (!matched) matched = m.includes(keys[i].toLowerCase());
        if (!matched) matched = m.includes(mod.name.toLowerCase());
        if (matched) return { type: 'gkmodule', key: keys[i] };
      }
    }
  }

  return null;
}

// ─── Render markdown-like text ─────────────────────────────────────────
function mdToHtml(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em style="color:#94a3b8;">$1</em>')
    .replace(/`(.*?)`/g, '<code style="background:#334155;padding:1px 5px;border-radius:3px;font-size:10px;color:#f472b6;">$1</code>')
    .replace(/\n/g, '<br>');
}

// ─── Add Message ───────────────────────────────────────────────────────
function addMessage(role, text, openTab) {
  CHAT_HISTORY.push({ role: role, text: text, openTab: openTab });
  refreshChat();
}

// ─── Refresh Chat UI ───────────────────────────────────────────────────
function refreshChat() {
  var chatBody = document.getElementById('iagb-body');
  if (!chatBody) return;
  chatBody.innerHTML = '';

  CHAT_HISTORY.forEach(function(msg) {
    if (msg.role === 'categories' && window.GK) {
      var catDiv = document.createElement('div');
      catDiv.style = 'display:flex;flex-direction:column;gap:6px;';
      var intro = document.createElement('div');
      intro.style = 'font-size:11px;color:#94a3b8;padding:4px 0;';
      intro.innerHTML = '🤖 <strong style="color:#c4b5fd;">IA Guide</strong> — ' + (gl()==='fr'?'Cliquez une catégorie :':'Click a category:');
      catDiv.appendChild(intro);
      var grid = document.createElement('div');
      grid.style = 'display:grid;grid-template-columns:1fr 1fr;gap:5px;';
      
      Object.keys(window.GK.categories).forEach(function(ck) {
        var cat = window.GK.categories[ck];
        var btn = document.createElement('button');
        btn.style = 'background:'+cat.color+'18;border:1px solid '+cat.color+'44;color:'+cat.color+';padding:6px 8px;border-radius:7px;font-size:9.5px;font-weight:700;cursor:pointer;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
        btn.textContent = cat.label;
        btn.onmouseover = function(){this.style.background=cat.color+'33';};
        btn.onmouseout  = function(){this.style.background=cat.color+'18';};
        btn.onclick = function(){showCategoryModules(ck);};
        grid.appendChild(btn);
      });
      catDiv.appendChild(grid);
      chatBody.appendChild(catDiv);
      return;
    }
    
    var row = document.createElement('div');
    row.style = 'display:flex;gap:8px;align-items:flex-start;' + (msg.role==='user'?'flex-direction:row-reverse;':'');

    var avatar = document.createElement('div');
    avatar.style = 'width:28px;height:28px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:13px;background:' +
      (msg.role==='user'?'linear-gradient(135deg,#3b82f6,#1d4ed8)':'linear-gradient(135deg,#8b5cf6,#6d28d9)') + ';';
    avatar.textContent = msg.role==='user'?'👤':'🤖';

    var bubble = document.createElement('div');
    bubble.style = 'max-width:82%;padding:9px 12px;border-radius:' +
      (msg.role==='user'?'12px 2px 12px 12px':'2px 12px 12px 12px') +
      ';font-size:11px;line-height:1.6;background:' +
      (msg.role==='user'?'#1d4ed8':'#1e293b') +
      ';color:#e2e8f0;border:1px solid ' +
      (msg.role==='user'?'#2563eb40':'#334155') + ';';
    bubble.innerHTML = mdToHtml(msg.text);

    if (msg.openTab) {
      var openBtn = document.createElement('button');
      openBtn.style = 'display:block;margin-top:8px;background:#7c3aed;color:#fff;border:none;padding:6px 12px;border-radius:6px;font-size:10px;cursor:pointer;font-weight:bold;';
      openBtn.textContent = (gl()==='fr'?'→ Ouvrir ':'→ Open ') + msg.openTab.toUpperCase();
      var tabId = msg.openTab;
      openBtn.onclick = function() {
        if (window.renderTab) window.renderTab(tabId);
        toggleBot(false);
      };
      bubble.appendChild(openBtn);
    }

    row.appendChild(avatar);
    row.appendChild(bubble);
    chatBody.appendChild(row);
  });
  chatBody.scrollTop = chatBody.scrollHeight;
}

// ─── Process User Input ────────────────────────────────────────────────
function processInput(val) {
  if (!val.trim()) return;
  addMessage('user', val);

  setTimeout(function() {
    var intent = matchIntent(val);
    if (!intent) { addMessage('bot', kb().unknown); return; }

    if (intent.type === 'categories') {
      showCategories();
    } else if (intent.type === 'tour') {
      toggleBot(false);
      startOnboardingTour();
    } else if (intent.type === 'gkmodule' && window.GK) {
      var langKey = gl();
      var gk = window.GK[langKey] || window.GK.en;
      var mod = gk[intent.key];
      if (mod) {
        var howLabel = langKey === 'fr' ? 'Comment utiliser :' : 'How to use:';
        var txt = mod.icon + ' **' + mod.name + '**\n\n' + mod.desc + '\n\n**' + howLabel + '**\n' + mod.how;
        addMessage('bot', txt, mod.tab);
      } else {
        addMessage('bot', kb().unknown);
      }
    } else {
      addMessage('bot', intent.data);
    }
  }, 400);
}

function showCategories() {
  CHAT_HISTORY.push({ role: 'categories' });
  refreshChat();
}

function showCategoryModules(catKey) {
  if (!window.GK) return;
  var cat = window.GK.categories[catKey];
  if (!cat) return;
  var mods = cat.modules;
  var langKey = gl();
  var gk = window.GK[langKey] || window.GK.en;
  var lines = [cat.label + ' — ' + (langKey==='fr'?'Modules disponibles :':'Available modules:') + '\n'];
  mods.forEach(function(k) {
    var m = gk[k];
    if (m) lines.push(m.icon+' **'+m.name+'** — '+m.desc);
  });
  lines.push('\n' + (langKey==='fr'?'Tapez le nom d\'un module pour l\'ouvrir.':'Type any module name to open it.'));
  addMessage('bot', lines.join('\n'));
}

// ─── Guided Onboarding Tour ────────────────────────────────────────────
function startOnboardingTour() {
  if (TOUR_ACTIVE) return;
  TOUR_ACTIVE = true;
  TOUR_STEP = 0;

  var backdrop = document.getElementById('ia-tour-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'ia-tour-backdrop';
    backdrop.className = 'ia-tour-backdrop';
    document.body.appendChild(backdrop);
  }

  var bubble = document.getElementById('tour-highlight-bubble');
  if (!bubble) {
    bubble = document.createElement('div');
    bubble.id = 'tour-highlight-bubble';
    bubble.className = 'tour-highlight-bubble';
    document.body.appendChild(bubble);
  }

  renderTourStep();
}

function renderTourStep() {
  var bubble = document.getElementById('tour-highlight-bubble');
  if (!bubble) return;

  // Remove previous highlights
  document.querySelectorAll('.feature-pulse').forEach(function(el) {
    el.classList.remove('feature-pulse');
  });

  var steps = TOUR_STEPS_DATA[gl()] || TOUR_STEPS_DATA.en;
  var step = steps[TOUR_STEP];

  // Set visual properties
  bubble.style.top = '';
  bubble.style.left = '';
  bubble.style.right = '';
  bubble.style.bottom = '';
  bubble.style.transform = '';

  if (step.target === null) {
    bubble.style.top = '50%';
    bubble.style.left = '50%';
    bubble.style.transform = 'translate(-50%, -50%)';
    bubble.className = 'tour-highlight-bubble visible';
  } else {
    if (step.pos.left) bubble.style.left = step.pos.left;
    if (step.pos.right) bubble.style.right = step.pos.right;
    if (step.pos.top) bubble.style.top = step.pos.top;
    if (step.pos.bottom) bubble.style.bottom = step.pos.bottom;
    bubble.className = 'tour-highlight-bubble visible ' + (step.arrow || '');

    var targetEl = document.querySelector(step.target);
    if (targetEl) {
      targetEl.classList.add('feature-pulse');
    }
  }

  var labelNext = gl() === 'fr' ? (TOUR_STEP === steps.length - 1 ? 'Terminer' : 'Suivant') : (TOUR_STEP === steps.length - 1 ? 'Finish' : 'Next');
  var labelSkip = gl() === 'fr' ? 'Passer' : 'Skip';

  bubble.innerHTML =
    '<h4>' + step.title + '</h4>' +
    '<p>' + step.desc + '</p>' +
    '<div class="tour-footer">' +
      '<span class="tour-steps">' + (TOUR_STEP + 1) + '/' + steps.length + '</span>' +
      '<div class="tour-btns">' +
        '<button class="tour-btn-skip" onclick="window.IAGuideBot.endTour()">' + labelSkip + '</button>' +
        '<button class="tour-btn-next" onclick="window.IAGuideBot.nextTour()">' + labelNext + '</button>' +
      '</div>' +
    '</div>';
}

// ─── Toggle Bot ────────────────────────────────────────────────────────
function toggleBot(forceState) {
  BOT_OPEN = (forceState !== undefined) ? forceState : !BOT_OPEN;
  var panel = document.getElementById('iagb-panel');
  var fab = document.getElementById('iagb-fab');
  if (panel) panel.style.display = BOT_OPEN ? 'flex' : 'none';
  if (fab) fab.style.background = BOT_OPEN ? 'linear-gradient(135deg,#ef4444,#b91c1c)' : 'linear-gradient(135deg,#8b5cf6,#6d28d9)';
  if (fab) fab.textContent = BOT_OPEN ? '✕' : '🤖';
  if (BOT_OPEN && CHAT_HISTORY.length === 0) {
    addMessage('bot', kb().greeting);
  }
  if (BOT_OPEN) {
    setTimeout(function() {
      var inp = document.getElementById('iagb-input');
      if (inp) inp.focus();
    }, 100);
  }
}

// ─── Build UI ──────────────────────────────────────────────────────────
function buildBot() {
  if (document.getElementById('iagb-fab')) return;

  // FAB Button
  var fab = document.createElement('button');
  fab.id = 'iagb-fab';
  fab.textContent = '🤖';
  fab.title = 'IA Guide Bot';
  fab.style = 'position:fixed;bottom:24px;right:24px;width:52px;height:52px;border-radius:50%;border:none;cursor:pointer;font-size:22px;background:linear-gradient(135deg,#8b5cf6,#6d28d9);color:#fff;box-shadow:0 8px 25px rgba(139,92,246,0.5);z-index:999998;transition:all 0.3s;display:flex;align-items:center;justify-content:center;';
  fab.onmouseover = function() { this.style.transform='scale(1.1)'; };
  fab.onmouseout  = function() { this.style.transform='scale(1)'; };
  fab.onclick = function() { toggleBot(); };

  // Chat Panel
  var panel = document.createElement('div');
  panel.id = 'iagb-panel';
  panel.style = 'position:fixed;bottom:85px;right:24px;width:320px;height:460px;background:#0f172a;border:1px solid rgba(139,92,246,0.4);border-radius:16px;display:none;flex-direction:column;box-shadow:0 25px 60px rgba(0,0,0,0.6);z-index:999997;overflow:hidden;font-family:sans-serif;';

  // Panel Header
  var panelHdr = document.createElement('div');
  panelHdr.style = 'background:linear-gradient(90deg,#8b5cf6,#6d28d9);padding:12px 16px;display:flex;align-items:center;gap:10px;flex-shrink:0;';
  panelHdr.innerHTML = '<div style="font-size:20px;">🤖</div>' +
    '<div><div style="font-size:13px;font-weight:900;color:#fff;">IA Guide Bot</div>' +
    '<div style="font-size:9px;color:#ddd8fe;">' + (gl()==='fr'?'Connaît chaque module du studio':'Knows every studio module') + '</div></div>' +
    '<div style="margin-left:auto;display:flex;gap:6px;">' +
    '<button id="iagb-clear-btn" style="background:rgba(255,255,255,0.1);border:none;color:#fff;padding:3px 7px;border-radius:4px;font-size:9px;cursor:pointer;">' + (gl()==='fr'?'Effacer':'Clear') + '</button>' +
    '</div>';
  
  panelHdr.querySelector('#iagb-clear-btn').onclick = function() {
    CHAT_HISTORY = [];
    refreshChat();
  };

  // Chat Body
  var chatBody = document.createElement('div');
  chatBody.id = 'iagb-body';
  chatBody.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';

  // Quick Actions
  var quickRow = document.createElement('div');
  quickRow.style = 'padding:8px 12px;border-top:1px solid #1e293b;display:flex;gap:6px;flex-wrap:wrap;flex-shrink:0;max-height:85px;overflow-y:auto;';
  
  var quickBtns = [
    { l: gl()==='fr'?'📋 Tous les modules':'📋 All Modules', v: 'help' },
    { l: gl()==='fr'?'🚀 Visite Guidée':'🚀 Guided Tour', v: 'tour' },
    { l: '⚡ IA ULTRA', v: 'ia ultra' },
    { l: '🎮 Voxel Extruder', v: 'voxel extruder' },
    { l: '💫 Premium Studios', v: 'premium studios' },
    { l: '🎹 Audio Synth', v: 'audio synthesizer' },
    { l: '🌈 Mesh Gradient', v: 'mesh gradient' },
    { l: '📦 Export', v: 'export' }
  ];
  
  quickBtns.forEach(function(b) {
    var qb = document.createElement('button');
    qb.textContent = b.l;
    qb.style = 'background:#1e293b;border:1px solid #334155;color:#94a3b8;padding:4px 9px;border-radius:20px;font-size:9px;cursor:pointer;white-space:nowrap;';
    qb.onmouseover = function(){this.style.borderColor='#8b5cf6';this.style.color='#c4b5fd';};
    qb.onmouseout  = function(){this.style.borderColor='#334155';this.style.color='#94a3b8';};
    qb.onclick = function() { processInput(b.v); };
    quickRow.appendChild(qb);
  });

  // Input Row
  var inputRow = document.createElement('div');
  inputRow.style = 'padding:10px 12px;border-top:1px solid #1e293b;display:flex;gap:8px;flex-shrink:0;';
  var inp = document.createElement('input');
  inp.id = 'iagb-input';
  inp.placeholder = gl()==='fr'?'Posez une question...':'Ask a question...';
  inp.style = 'flex:1;background:#1e293b;color:#e2e8f0;border:1px solid #334155;padding:8px 12px;border-radius:8px;font-size:11px;outline:none;';
  inp.onkeydown = function(e) { if(e.key==='Enter'){ processInput(this.value); this.value=''; } };

  var sendBtn = document.createElement('button');
  sendBtn.innerHTML = '➤';
  sendBtn.style = 'background:#8b5cf6;color:#fff;border:none;width:34px;border-radius:8px;cursor:pointer;font-size:14px;';
  sendBtn.onclick = function() { processInput(inp.value); inp.value=''; };

  inputRow.appendChild(inp);
  inputRow.appendChild(sendBtn);

  panel.appendChild(panelHdr);
  panel.appendChild(chatBody);
  panel.appendChild(quickRow);
  panel.appendChild(inputRow);

  document.body.appendChild(fab);
  document.body.appendChild(panel);

  // Hook translation buttons to refresh bot UI dynamically on language toggle
  var oAL = window.applyLang;
  window.applyLang = function() {
    if (typeof oAL === 'function') oAL();
    var inpField = document.getElementById('iagb-input');
    if (inpField) inpField.placeholder = gl()==='fr'?'Posez une question...':'Ask a question...';
    var clearBtn = document.getElementById('iagb-clear-btn');
    if (clearBtn) clearBtn.textContent = gl()==='fr'?'Effacer':'Clear';
    // Re-create quick buttons
    if (quickRow) {
      quickRow.innerHTML = '';
      var newQuick = [
        { l: gl()==='fr'?'📋 Tous les modules':'📋 All Modules', v: 'help' },
        { l: gl()==='fr'?'🚀 Visite Guidée':'🚀 Guided Tour', v: 'tour' },
        { l: '⚡ IA ULTRA', v: 'ia ultra' },
        { l: '🎮 Voxel Extruder', v: 'voxel extruder' },
        { l: '💫 Premium Studios', v: 'premium studios' },
        { l: '🎹 Audio Synth', v: 'audio synthesizer' },
        { l: '🌈 Mesh Gradient', v: 'mesh gradient' },
        { l: '📦 Export', v: 'export' }
      ];
      newQuick.forEach(function(b) {
        var qb = document.createElement('button');
        qb.textContent = b.l;
        qb.style = 'background:#1e293b;border:1px solid #334155;color:#94a3b8;padding:4px 9px;border-radius:20px;font-size:9px;cursor:pointer;white-space:nowrap;';
        qb.onmouseover = function(){this.style.borderColor='#8b5cf6';this.style.color='#c4b5fd';};
        qb.onmouseout  = function(){this.style.borderColor='#334155';this.style.color='#94a3b8';};
        qb.onclick = function() { processInput(b.v); };
        quickRow.appendChild(qb);
      });
    }
  };

  // Launch onboarding tour on first load (2 second delay)
  setTimeout(function() {
    if (!localStorage.getItem('ia_guide_onboarded')) {
      startOnboardingTour();
    }
  }, 2000);
}

// ─── Init ──────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(buildBot, 800);
});
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(buildBot, 800);
}

window.IAGuideBot = {
  toggle: toggleBot,
  ask: processInput,
  startTour: startOnboardingTour,
  nextTour: function() {
    var steps = TOUR_STEPS_DATA[gl()] || TOUR_STEPS_DATA.en;
    TOUR_STEP++;
    if (TOUR_STEP >= steps.length) {
      window.IAGuideBot.endTour();
    } else {
      renderTourStep();
    }
  },
  endTour: function() {
    TOUR_ACTIVE = false;
    localStorage.setItem('ia_guide_onboarded', 'true');
    var backdrop = document.getElementById('ia-tour-backdrop');
    var bubble = document.getElementById('tour-highlight-bubble');
    if (backdrop) backdrop.parentNode.removeChild(backdrop);
    if (bubble) bubble.parentNode.removeChild(bubble);
    document.querySelectorAll('.feature-pulse').forEach(function(el) {
      el.classList.remove('feature-pulse');
    });
    toggleBot(true);
  }
};
})();
